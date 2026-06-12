import type { Key } from '@v-c/util/dist/type'
import type { ExtractPropTypes, PropType } from 'vue'
import type { ProHelpDataSource } from './HelpProvide'
import { useProConfig } from '@antdv-next1/pro-provider'
import { useDebounceFn, useEffect } from '@antdv-next1/pro-utils'
import { classNames } from '@v-c/util'
import { computed, defineComponent, Fragment, ref, shallowRef } from 'vue'
import AsyncContentPanel from './AsyncContentPanel'
import { useProHelpContext } from './HelpProvide'
import RenderContentPanel from './RenderContentPanel'

export function proHelpContentPanelProps() {
  return {
    /**
     * 控制当前选中的帮助文档
     */
    selectedKey: {
      type: String as PropType<string>,
      default: undefined,
    },
    class: {
      type: String as PropType<string>,
      default: undefined,
    },
    parentItem: {
      type: Object as PropType<ProHelpDataSource>,
      default: undefined,
    },
    onScroll: {
      type: Function as PropType<(key?: string) => void>,
      default: undefined,
    },
  }
}

export type ProHelpContentPanelProps = Partial<ExtractPropTypes<ReturnType<typeof proHelpContentPanelProps>>>

/**
 * 控制具体的帮助文档显示组件
 * selectedKey 来展示对应的内容。它会根据不同的item.valueType值来展示不同的内容，包括标题、图片、超链接等。
 */
const ProHelpContentPanel = defineComponent({
  name: 'ProHelpContentPanel',
  inheritAttrs: false,
  props: proHelpContentPanelProps(),
  setup(props) {
    const proHelpContextProvide = useProHelpContext()
    const proConfig = useProConfig()
    // 记录每个面板的滚动高度
    const scrollHeightMap = ref<Map<Key, HTMLDivElement>>(new Map())

    const divRef = shallowRef<HTMLDivElement | null>(null)
    const renderItem = (item?: ProHelpDataSource<any>['children'][number]) => {
      if (item?.asyncLoad) {
        return (
          <div class={classNames(props.class, proConfig.value.hashId)} id={item.title}>
            <AsyncContentPanel
              key={item?.key}
              item={item!}
              onInit={(ref) => {
                if (!scrollHeightMap.value)
                  return
                scrollHeightMap.value.set(item.key, ref)
              }}
            />
          </div>
        )
      }
      return (
        <div class={classNames(props.class, proConfig.value.hashId)} id={item?.title}>
          <RenderContentPanel
            onInit={(ref) => {
              if (!scrollHeightMap.value)
                return
              scrollHeightMap.value.set(item?.key!, ref)
            }}
            dataSourceChildren={item?.children || []}
          />
        </div>
      )
    }

    useEffect(() => {
      if (!props.selectedKey || !props.parentItem?.infiniteScrollFull)
        return
      const div = scrollHeightMap.value.get(props.selectedKey)

      if (div?.offsetTop && divRef.value) {
        if (
          Math.abs(divRef.value!.scrollTop - div?.offsetTop + 40)
          > div?.clientHeight
        ) {
          divRef.value!.scrollTop = div?.offsetTop - 40
        }
      }
    }, [() => props.selectedKey])

    /**
     * debounce（防抖）处理滚动事件，并根据滚动位置来实现找到当前列表的 key
     */
    const onScrollEvent = useDebounceFn(async (e: Event) => {
      const dom = e?.target as HTMLDivElement

      // 根据滚动位置来找到当前列表的 key
      const list = Array.from(scrollHeightMap.value.entries()).find(
        ([, value]) => {
          if (dom?.scrollTop < value.offsetTop) {
            return true
          }
          return false
        },
      )

      if (!list) {
        return
      }

      // 如果获取的 key 和当前 key 不同丢弃掉
      if (list.at(0) !== props.selectedKey) {
      // 如果不同，则触发 onScroll 事件
        props.onScroll?.(list.at(0) as string | undefined)
      }
    }, 200)

    /**
     * 当 parentItem 组件中的 infiniteScrollFull 属性变化时
     * 如果该属性为真值，则开始监听滚动事件；
     * 如果为假值，则停止监听滚动事件并取消防抖处理。
     * 在监听滚动事件时，可以实现分页（瀑布流）效果。同时，该代码还会根据 selectedKey 的变化来触发跳转
     */
    useEffect(() => {
      if (!props.parentItem?.infiniteScrollFull)
        return
      onScrollEvent.cancel()
      divRef.value?.addEventListener('scroll', onScrollEvent.run, false)
      return () => {
        onScrollEvent.cancel()
        divRef.value?.removeEventListener('scroll', onScrollEvent.run, false)
      }
    }, [() => props.parentItem?.infiniteScrollFull, () => props.selectedKey])

    /**
     * 生成一个  Map  能根据 key 找到所有的 index
     */
    const dataSourceMap = computed(() => {
      const map = new Map<
        string,
        ProHelpDataSource<any>['children'][number] & {
          parentKey?: Key
        }
      >()
      proHelpContextProvide.value.dataSource.forEach((page) => {
        page.children.forEach((item) => {
          map.set(item.key || item.title, { ...item, parentKey: page.key })
        })
      })
      return map
    })
    return () => {
      const { selectedKey, parentItem, class: className } = props
      if (parentItem && parentItem.infiniteScrollFull) {
        return (
          <div
            ref={divRef}
            class={classNames(`${className}-infinite-scroll`, proConfig.value.hashId)}
            style={{
              overflow: 'auto',
            }}
          >
            {parentItem.children?.map((item) => {
              return (
                <Fragment key={item.key}>{renderItem(item)}</Fragment>
              )
            })}
          </div>
        )
      }
      return renderItem(dataSourceMap.value.get(selectedKey!))
    }
  },
})

export default ProHelpContentPanel

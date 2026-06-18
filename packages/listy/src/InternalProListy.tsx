import type { CustomSlotsType, Key, VueNode } from '@v-c/util/dist/type'
import type { SpinProps } from 'antdv-next'
import type { SetupContext } from 'vue'
import type { ListyProps } from './components/Listy/interface'
import type { ProListyProps } from './typing'
import { classNames } from '@v-c/util'
import { useConfig } from 'antdv-next/dist/config-provider/context'
import { useSize } from 'antdv-next/dist/config-provider/hooks/useSize'
import { computed, defineComponent, toRef } from 'vue'
import Listy from './components/Listy'
import { useProListyContextProvider } from './context'
import { useStyle } from './style'

const InternalProListy = defineComponent(
  <T extends Record<string, any>, K extends Key>(props: ProListyProps<T, K>, {
    slots,
    expose,
  }: SetupContext<
    {},
    CustomSlotsType<{
      groupRender?: ProListyProps<T, K>['groupRender']
      itemRender?: ProListyProps<T, K>['itemRender']
      default?: () => VueNode
    }>
  >) => {
    const config = useConfig()
    const prefixCls = computed(() => props.prefixCls || config.value.getPrefixCls('pro'))
    const baseClassName = computed(() => {
      return `${prefixCls.value}-listy`
    })
    const { wrapSSR, hashId } = useStyle(baseClassName)
    useProListyContextProvider({
      grid: toRef(() => props.grid),
      itemLayout: toRef(() => props.itemLayout),
    })
    const mergedSize = useSize(toRef(() => props.size))
    const size = computed(() => {
      let sizeCls = ''
      switch (mergedSize.value) {
        case 'large':
          sizeCls = 'lg'
          break
        case 'small':
          sizeCls = 'sm'
          break
        default:
          break
      }
      return sizeCls
    })
    // const isSomethingAfterLastItem = !!(loadMore || pagination || footer);
    expose({
      scrollToTop: () => {},
      scrollToEnd: () => {},
    })
    const group = computed(() => {
      const { group, groupBy } = props
      if (slots.groupRender || groupBy) {
        return {
          key: groupBy || group?.key,
          title: slots.groupRender || group?.title,
        } as ListyProps<T, K>['group']
      }
      return group as ListyProps<T, K>['group']
    })
    return () => {
      const { split = true, itemLayout, grid, loading = false } = props
      let loadingProp = loading as boolean | SpinProps
      if (typeof loadingProp === 'boolean') {
        loadingProp = {
          spinning: loadingProp,
        }
      }
      const isLoading = !!loadingProp?.spinning

      return wrapSSR(
        <Listy
          {...props}
          group={group.value}
          class={classNames(baseClassName.value, hashId.value, {
            [`${baseClassName.value}-vertical`]: itemLayout === 'vertical',
            [`${baseClassName.value}-${size.value}`]: size.value,
            [`${baseClassName.value}-split`]: split,
            // [`${baseClassName.value}-bordered`]: bordered,
            [`${baseClassName.value}-loading`]: isLoading,
            [`${baseClassName.value}-grid`]: !!grid,
            // [`${baseClassName.value}-something-after-last-item`]: isSomethingAfterLastItem,
            [`${baseClassName.value}-rtl`]: config.value.direction === 'rtl',
          })}
          prefixCls={baseClassName.value}
          v-slots={slots}
        />,
      )
    }
  },
  {
    name: 'InternalProListy',
    inheritAttrs: false,
    props: [
      'group',
      'height',
      'groupBy',
      'class',
      'classes',
      'variant',
      'emptyRender',
      'footer',
      'grid',
      'groupRender',
      'header',
      'itemLayout',
      'loading',
      'pagination',
      'size',
      'split',
      'style',
      'styles',
      'itemHeight',
      'itemRender',
      'items',
      'onEndReached',
      'prefixCls',
      'rowKey',
      'sticky',
      'virtual',
    ],
  },
)

export default InternalProListy

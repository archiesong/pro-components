import type { CustomSlotsType, Key, VueNode } from '@v-c/util/dist/type'
import type { SetupContext } from 'vue'
import type { ListyProps, ListyRef, ListyScrollToConfig } from './interface'
import { defineComponent, shallowRef } from 'vue'
import RawList from './RawList'
import VirtualList from './VirtualList'

const Listy = defineComponent(<T, K extends Key>(props: ListyProps<T, K>, {
  slots,
  expose,
  attrs,
}: SetupContext<
  {},
  CustomSlotsType<{
    default?: () => VueNode
  }>
>) => {
  const listyRef = shallowRef<ListyRef | null>(null)
  expose({
    scrollTo: (config?: ListyScrollToConfig) => listyRef.value?.scrollTo(config),
  })
  return () => {
    // ============================== Props ==============================
    const { items, virtual = false, prefixCls = 'vc-listy', ...restProps } = props

    // =============================== Data ===============================
    const data = items || []

    // ============================== Render ===============================
    const listProps = {
      ...restProps,
      data,
      prefixCls,
    }
    return virtual ? (
      <VirtualList {...attrs} ref={listyRef} {...listProps} v-slots={slots} />
    ) : (
      <RawList {...attrs} ref={listyRef} {...listProps} v-slots={slots} />
    )
  }
}, {
  name: 'Listy',
  inheritAttrs: false,
  props: ['group', 'height', 'component', 'itemHeight', 'itemRender', 'items', 'onScroll', 'prefixCls', 'rowKey', 'sticky', 'virtual'],
})

export type { ListyProps, ListyRef }

export default Listy

import type { CustomSlotsType, Key, VueNode } from '@v-c/util/dist/type'
import type { SetupContext } from 'vue'
import type { ListyProps, ListyRef } from './interface'
import { defineComponent } from 'vue'
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
  expose({})
  return () => {
    // ============================== Props ==============================
    const { items = [], virtual = false, prefixCls = 'vc-listy', ...restProps } = props
    const listProps = {
      ...restProps,
      data: items,
      prefixCls,
    }
    return virtual ? (
      <VirtualList {...attrs} {...listProps} v-slots={slots} />
    ) : (
      <RawList {...attrs} {...listProps} v-slots={slots} />
    )
  }
}, {
  name: 'Listy',
  inheritAttrs: false,
  props: ['group', 'height', 'itemHeight', 'itemRender', 'items', 'onScroll', 'prefixCls', 'rowKey', 'sticky', 'virtual'],
})

export type { ListyProps, ListyRef }

export default Listy

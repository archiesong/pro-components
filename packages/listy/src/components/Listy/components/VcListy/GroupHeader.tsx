import type { VueNode } from '@v-c/util'
import type { CustomSlotsType, Key } from '@v-c/util/dist/type'
import type { SetupContext } from 'vue'
import type { Group } from './hooks/useGroupSegments'
import { classNames } from '@v-c/util'
import { defineComponent } from 'vue'

export interface GroupHeaderProps<T, K extends Key = Key> {
  group?: Group<T, K>
  groupKey?: K
  groupItems?: T[]
  prefixCls?: string
  fixed?: boolean
  sticky?: boolean
}

const GroupHeader = defineComponent(<T, K extends Key = Key>(props: GroupHeaderProps<T, K>, {
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
    const { group, groupKey, groupItems, prefixCls, fixed, sticky } = props
    return (
      <div
        {...attrs}
        class={classNames(`${prefixCls}-group-header`, {
          [`${prefixCls}-group-header-sticky`]: sticky,
          [`${prefixCls}-group-header-fixed`]: fixed,
        })}
      >
        {group?.title({ name: groupKey!, items: groupItems! })}
      </div>
    )
  }
}, {
  name: 'GroupHeader',
  inheritAttrs: false,
  props: ['fixed', 'group', 'groupItems', 'groupKey', 'prefixCls', 'sticky'],
})

export default GroupHeader

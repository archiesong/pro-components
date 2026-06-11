import type { CustomSlotsType, VueNode } from '@v-c/util/dist/type'
import type { CSSProperties, FunctionalComponent, VNode } from 'vue'
import { Badge } from 'antdv-next'
import { defineComponent } from 'vue'

export interface FieldStatusProps {
  class?: string
  style?: CSSProperties
}

/** 快捷操作，用于快速的展示一个状态 */
export const StatusComponents: {
  Success: FunctionalComponent<FieldStatusProps>
  Error: FunctionalComponent<FieldStatusProps>
  Processing: FunctionalComponent<FieldStatusProps>
  Default: FunctionalComponent<FieldStatusProps>
  Warning: FunctionalComponent<FieldStatusProps>
  success: FunctionalComponent<FieldStatusProps>
  error: FunctionalComponent<FieldStatusProps>
  processing: FunctionalComponent<FieldStatusProps>
  default: FunctionalComponent<FieldStatusProps>
  warning: FunctionalComponent<FieldStatusProps>

} = {
  Success: (props, { slots }) => <Badge {...props} status="success" text={slots.default?.() as unknown as VNode} />,
  Error: (props, { slots }) => <Badge {...props} status="error" text={slots.default?.() as unknown as VNode} />,
  Default: (props, { slots }) => <Badge {...props} status="default" text={slots.default?.() as unknown as VNode} />,
  Processing: (props, { slots }) => <Badge {...props} status="processing" text={slots.default?.() as unknown as VNode} />,
  Warning: (props, { slots }) => <Badge {...props} status="warning" text={slots.default?.() as unknown as VNode} />,
  success: (props, { slots }) => <Badge {...props} status="success" text={slots.default?.() as unknown as VNode} />,
  error: (props, { slots }) => <Badge {...props} status="error" text={slots.default?.() as unknown as VNode} />,
  default: (props, { slots }) => <Badge {...props} status="default" text={slots.default?.() as unknown as VNode} />,
  processing: (props, { slots }) => <Badge {...props} status="processing" text={slots.default?.() as unknown as VNode} />,
  warning: (props, { slots }) => <Badge {...props}status="warning" text={slots.default?.() as unknown as VNode} />,
}

const FieldStatus = defineComponent<FieldStatusProps & { color: string }, {}, string, CustomSlotsType<{
  default?: () => VueNode
}>>((props, { slots }) => {
  return () => <Badge color={props.color} text={slots.default?.() as unknown as VNode} />
}, {
  name: 'FieldStatus',
  inheritAttrs: false,
})

export default FieldStatus

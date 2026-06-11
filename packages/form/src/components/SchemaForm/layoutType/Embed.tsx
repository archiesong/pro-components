import type { CustomSlotsType } from '@v-c/util/dist/type'
import type { VNode } from 'vue'
import { defineComponent } from 'vue'

const Embed = defineComponent<{
  [key: string]: any
}, {}, string, CustomSlotsType<{
  default?: () => VNode[]
}>>((_, { slots }) => {
  return () => slots.default?.()
}, {
  name: 'Embed',
  inheritAttrs: false,
})

export default Embed

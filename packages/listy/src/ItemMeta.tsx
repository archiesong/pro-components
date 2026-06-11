import type { VueNode } from '@v-c/util'
import type { CustomSlotsType } from '@v-c/util/dist/type'
import { defineComponent } from 'vue'

export const listyItemMetaProps = () => ({})

export interface ProListyItemMetaProps {

}

const ProListyItemMeta = defineComponent<ProListyItemMetaProps, {}, string, CustomSlotsType<{
  default?: () => VueNode
}>>(
  (props) => {
    console.log(props)
    return () => {
      return null
    }
  },
  {
    name: 'ProListyItemMeta',
    inheritAttrs: false,
  },
)

export default ProListyItemMeta

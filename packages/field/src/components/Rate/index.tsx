import type { CustomSlotsType, VueNode } from '@v-c/util/dist/type'
import type { RateProps } from 'antdv-next'
import type { ProFieldFC } from '../../typing'
import { Rate } from 'antdv-next'
import { defineComponent } from 'vue'

export type FieldRateProps = ProFieldFC<{
  text: number
}, RateProps>

const FieldRate = defineComponent<FieldRateProps, {}, string, CustomSlotsType<{
  default?: () => VueNode
}>>(
  (props) => {
    return () => {
      const { text, mode, render, formItemRender, fieldProps } = props
      if (mode === 'read') {
        const dom = (
          <Rate
            allowHalf
            disabled
            {...fieldProps}
            value={text}
          />
        )

        if (render) {
          return <>{render(text, { mode, ...fieldProps }, <>{dom}</>)}</>
        }
        return dom
      }
      if (mode === 'edit' || mode === 'update') {
        const dom = (
          <Rate
            allowHalf
            {...fieldProps}
          />
        )
        if (formItemRender) {
          return <>{formItemRender(text, { mode, ...fieldProps }, dom)}</>
        }
        return dom
      }
      return null
    }
  },
  {
    name: 'FieldRate',
    inheritAttrs: false,
  },
)

export default FieldRate

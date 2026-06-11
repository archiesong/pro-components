import type { CustomSlotsType, VueNode } from '@v-c/util/dist/type'
import type { ProFieldFC } from '../../typing'
import { unit } from '@antdv-next/cssinjs'
import { Slider } from 'antdv-next'
import { defineComponent } from 'vue'

export type FieldSliderProps = ProFieldFC<{
  text: string
}>
const FieldSlider = defineComponent<FieldSliderProps, {}, string, CustomSlotsType<{
  default?: () => VueNode
}>>(
  (props) => {
    return () => {
      const { text, mode, render, formItemRender, fieldProps } = props
      if (mode === 'read') {
        const dom = text
        if (render) {
          return <>{render(text, { mode, ...fieldProps }, <>{dom}</>)}</>
        }
        return <>{dom}</>
      }
      if (mode === 'edit' || mode === 'update') {
        const dom = (
          <Slider
            {...fieldProps}
            style={{
              minWidth: unit(120),
              ...fieldProps?.style,
            }}
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
    name: 'FieldSlider',
    inheritAttrs: false,
  },
)

export default FieldSlider

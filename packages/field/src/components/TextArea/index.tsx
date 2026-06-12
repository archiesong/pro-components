import type { ProFieldFCRenderProps } from '@antdv-next1/pro-provider'
import type { VueNode } from '@v-c/util'
import type { CustomSlotsType } from '@v-c/util/dist/type'
import type { TextAreaProps, TextAreaRef } from 'antdv-next'
import type { ComputedRef } from 'vue'
import type { ProFieldFC } from '../../typing'
import { useIntl } from '@antdv-next1/pro-provider'
import { omit } from '@v-c/util'
import { TextArea } from 'antdv-next'
import { computed, defineComponent, shallowRef } from 'vue'
import FieldTextAreaReadonly from './readonly'

export type FieldTextAreaProps = ProFieldFC<{
  text?: VueNode
}, TextAreaProps>

export type FieldTextAreaExpose = Omit<TextAreaRef, 'nativeElement' | 'resizableTextArea'> & {
  nativeElement: ComputedRef<TextAreaRef['nativeElement']>
  resizableTextArea: ComputedRef<TextAreaRef['resizableTextArea']>
}

const FieldTextArea = defineComponent<FieldTextAreaProps, {}, string, CustomSlotsType<{
  default?: () => VueNode
}>>(
  (props, { expose }) => {
    const textAreaRef = shallowRef<TextAreaRef | null>(null)
    const intl = useIntl()
    expose({
      focus: () => textAreaRef.value?.focus(),
      blur: () => textAreaRef.value?.blur(),
      resizableTextArea: computed(() => textAreaRef.value?.resizableTextArea),
      nativeElement: computed(() => textAreaRef.value?.nativeElement),
    } as FieldTextAreaExpose)
    return () => {
      const { text, mode, render, formItemRender, fieldProps } = props
      const placeholder = intl.value.getMessage({
        id: 'tableForm.inputPlaceholder',
        defaultMessage: '请输入',
      })
      if (mode === 'read') {
        const dom = <FieldTextAreaReadonly {...props} />
        if (render) {
          return (
            <>
              {
                render(
                  text,
                  { mode, ...omit(fieldProps || {}, ['showCount']) } as ProFieldFCRenderProps<TextAreaProps>,
                  dom,
                )
              }
            </>
          )
        }
        return dom
      }
      if (mode === 'edit' || mode === 'update') {
        const dom = (
          <TextArea
            ref={textAreaRef}
            rows={3}
            onKeydown={(e) => {
              if (e.key === 'Enter')
                e.stopPropagation()
            }}
            placeholder={placeholder}
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
    name: 'FieldTextArea',
    inheritAttrs: false,
  },
)

export default FieldTextArea

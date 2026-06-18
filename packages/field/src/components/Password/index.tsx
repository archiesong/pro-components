import type { VueNode } from '@v-c/util'
import type { InputFocusOptions } from '@v-c/util/dist/Dom/focus'
import type { CustomSlotsType } from '@v-c/util/dist/type'
import type { InputRef } from 'antdv-next'
import type { PasswordProps } from 'antdv-next/dist/input/Password'
import type { ComputedRef } from 'vue'
import type { ProFieldFC } from '../../typing'
import { useIntl } from '@antdv-next1/pro-provider'
import { EyeInvisibleOutlined, EyeOutlined } from '@antdv-next/icons'
import { useMergedState } from '@v-c/util'
import { InputPassword, Space } from 'antdv-next'
import { computed, defineComponent, shallowRef } from 'vue'

export type FieldPasswordProps = ProFieldFC<{
  text?: VueNode
  open?: boolean
  'onUpdate:open'?: (open: boolean) => void
  placeholder?: string
  onOpenChange?: (open: boolean) => void
}, PasswordProps>

export type FieldPasswordExpose = Omit<InputRef, 'input' | 'nativeElement' | 'setSelectionRange' | 'select'> & {
  input: ComputedRef<InputRef['input']>
}

const FieldPassword = defineComponent<FieldPasswordProps, {}, string, CustomSlotsType<{
  default?: () => VueNode
}>>(
  (props, { expose }) => {
    const intl = useIntl()
    const passwordRef = shallowRef<InputRef | null>(null)
    const [open, setOpen] = useMergedState(() => props.open || false, {
      value: computed(() => props.open!),
      onChange: props.onOpenChange,
    })
    expose({
      input: computed(() => passwordRef.value?.input),
      blur: () => passwordRef.value?.blur(),
      focus: (options?: InputFocusOptions) => passwordRef.value?.focus(options),
    } as FieldPasswordExpose)
    return () => {
      const { text, mode, render, formItemRender, placeholder: propsPlaceholder, open: propsOpen, 'onUpdate:open': onUpdateOpen, fieldProps, onOpenChange, ...rest } = props
      if (mode === 'read') {
        let dom = <>-</>
        if (text) {
          dom = (
            <Space>
              <span>{open.value ? text : '********'}</span>
              <a onClick={() => setOpen(!open.value)}>
                {open.value ? <EyeOutlined /> : <EyeInvisibleOutlined />}
              </a>
            </Space>
          )
        }
        if (render) {
          return <>{render(text, { mode, ...rest, fieldProps }, dom)}</>
        }
        return dom
      }
      if (mode === 'edit' || mode === 'update') {
        const placeholder = propsPlaceholder
          || intl.value.getMessage({
            id: 'tableForm.inputPlaceholder',
            defaultMessage: '请输入',
          })
        const dom = (
          <InputPassword
            ref={passwordRef}
            placeholder={placeholder}
            {...fieldProps}
          />
        )
        if (formItemRender) {
          return <>{formItemRender(text, { mode, ...rest, fieldProps, placeholder }, dom)}</>
        }
        return dom
      }
      return null
    }
  },
  {
    name: 'FieldPassword',
    inheritAttrs: false,
  },
)

export default FieldPassword

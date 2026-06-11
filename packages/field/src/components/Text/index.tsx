import type { InputFocusOptions } from '@v-c/util/dist/Dom/focus'
import type { CustomSlotsType, VueNode } from '@v-c/util/dist/type'
import type { InputProps, InputRef } from 'antdv-next'
import type { ComputedRef } from 'vue'
import type { ProFieldFC } from '../../typing'
import { useIntl } from '@antdv-next/pro-provider'
import { useEffect } from '@antdv-next/pro-utils'
import { Input } from 'antdv-next'
import { computed, defineComponent, shallowRef } from 'vue'

export type FieldTextProps = ProFieldFC<{
  text?: VueNode
  emptyText?: VueNode
  placeholder?: string
}, InputProps & { id?: string, class?: string }>

export type FieldTextExpose = Omit<InputRef, 'input' | 'nativeElement'> & {
  input: ComputedRef<InputRef['input']>
  nativeElement: ComputedRef<InputRef['nativeElement']>
}

const FieldText = defineComponent<FieldTextProps, {}, string, CustomSlotsType<{
  default?: () => VueNode
}>>(
  (props, { expose }) => {
    const inputRef = shallowRef<InputRef | null>(null)
    const intl = useIntl()
    useEffect(() => {
      if (props.fieldProps?.autoFocus) {
        // 使用 queueMicrotask 延迟 focus 调用，避免在渲染期间触发 flushSync
        queueMicrotask(() => {
          inputRef.value?.focus()
        })
      }
    }, [() => props.fieldProps?.autoFocus])
    expose({
      focus: (options?: InputFocusOptions) => inputRef.value?.focus(options),
      blur: () => inputRef.value?.blur(),
      setSelectionRange: (start: number, end: number, direction?: 'forward' | 'backward' | 'none') => inputRef.value?.setSelectionRange(start, end, direction),
      select: () => inputRef.value?.select(),
      input: computed(() => inputRef.value?.input),
      nativeElement: computed(() => inputRef.value?.nativeElement),
    } as FieldTextExpose)
    return () => {
      const { mode, emptyText = '-', formItemRender, placeholder: propsPlaceholder, render, text, fieldProps, ...rest } = props
      const { prefix = '', suffix = '' } = fieldProps || {}
      if (mode === 'read') {
        const dom = (
          <>
            {prefix}
            {text ?? emptyText}
            {suffix}
          </>
        )
        if (render) {
          return <>{ render(text, { mode, ...rest, fieldProps }, dom) ?? emptyText}</>
        }
        return dom
      }
      if (mode === 'edit' || mode === 'update') {
        const placeholder = propsPlaceholder || intl.value.getMessage({ id: 'tableForm.inputPlaceholder', defaultMessage: '请输入' })
        const { autoFocus, ...restFieldProps } = fieldProps!
        const dom = (
          <Input
            ref={inputRef}
            placeholder={placeholder}
            allowClear
            {...restFieldProps}
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
    name: 'FieldText',
    inheritAttrs: false,
  },
)

export default FieldText

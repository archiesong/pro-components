import type { CustomSlotsType, VueNode } from '@v-c/util/dist/type'
import type { InputProps, TextAreaProps } from 'antdv-next'
import type { CSSProperties, HTMLAttributes } from 'vue'
import type { ProFieldFC } from '../../typing'
import { unit } from '@antdv-next/cssinjs'
import { proTheme } from '@antdv-next/pro-provider'
import { Input, TextArea } from 'antdv-next'
import { defineComponent } from 'vue'

export type FieldCodeProps = ProFieldFC<{
  text: string
  language?: 'json' | 'text'
}, InputProps & { style?: CSSProperties } | TextAreaProps & { style?: CSSProperties } | HTMLAttributes>

function languageFormat(text: string | Record<string, any>, language: string) {
  if (typeof text !== 'string') {
    return text
  }
  try {
    if (language === 'json') {
      return JSON.stringify(JSON.parse(text), null, 2)
    }
  }
  catch (error) {
    // console.log(error)
  }
  return text
}

const FieldCode = defineComponent<FieldCodeProps, {}, string, CustomSlotsType<{
  default?: () => VueNode
}>>(
  (props) => {
    const { token } = proTheme.useToken()
    return () => {
      const { mode, text, render, language = 'text', formItemRender, plain, fieldProps, ...rest } = props
      const code = languageFormat(text!, language)
      if (mode === 'read') {
        const dom = (
          <pre
            {...fieldProps as HTMLAttributes}
            style={{
              padding: unit(16),
              overflow: 'auto',
              fontSize: '85%',
              lineHeight: 1.45,
              color: token.value.colorTextSecondary,
              fontFamily: token.value.fontFamilyCode,
              backgroundColor: 'rgba(150, 150, 150, 0.1)',
              borderRadius: unit(3),
              width: 'min-content',
              ...(fieldProps as HTMLAttributes)?.style as CSSProperties,
            }}
          >
            <code>{code}</code>
          </pre>
        )
        if (render) {
          return <>{render(code, { mode, ...rest, fieldProps }, dom)}</>
        }
        return dom
      }
      if (mode === 'edit' || mode === 'update') {
        (fieldProps as TextAreaProps | InputProps)!.value = code
        let dom = <TextArea rows={5} {...fieldProps as TextAreaProps} />
        if (plain) {
          dom = <Input {...fieldProps as InputProps} />
        }
        if (formItemRender) {
          return <>{formItemRender(code, { mode, fieldProps, ...rest }, dom) ?? null}</>
        }
        return dom
      }
      return null
    }
  },
  {
    name: 'FieldCode',
    inheritAttrs: false,
  },
)

export default FieldCode

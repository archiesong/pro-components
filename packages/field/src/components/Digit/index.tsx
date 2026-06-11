import type { CustomSlotsType, VueNode } from '@v-c/util/dist/type'
import type { InputNumberProps } from 'antdv-next'
import type { ProFieldFC } from '../../typing'
import { useIntl } from '@antdv-next/pro-provider'
import { isNil } from '@antdv-next/pro-utils'
import { omit } from '@v-c/util'
import { InputNumber } from 'antdv-next'
import { defineComponent } from 'vue'

export type FieldDigitProps = ProFieldFC<{
  text: number
  placeholder?: string
}, InputNumberProps & {
  intlProps: Intl.NumberFormatOptions
}>

/**
 * 判断字符串是否为空或仅包含空白字符
 * @param {string} str - 要检查的字符串
 * @returns {boolean} - 如果为空或仅包含空白字符返回 true，否则返回 false
 */
function isEmptyOrWhitespace(str?: string): boolean {
  return isNil(str) || str === '' || str?.trim() === ''
}
const FieldDigit = defineComponent<FieldDigitProps, {}, string, CustomSlotsType<{
  default?: () => VueNode
}>>(
  (props) => {
    const intl = useIntl()
    const proxyChange = (value: number | string | null) => {
      let val = value ?? undefined

      if (!props.fieldProps?.stringMode && typeof val === 'string') {
        // 处理无效输入，如 '22.22.22'
        const numVal = Number(val)
        if (Number.isNaN(numVal)) {
          // 如果转换失败，尝试提取第一个有效的数字
          const match = val.match(/^(\d+(?:\.\d+)?)/)
          if (match) {
            val = Number(match[1])
          }
          else {
            val = undefined
          }
        }
        else {
          val = numVal
        }
      }
      if (
        typeof val === 'number'
        && !isNil(val)
        && !isNil(props.fieldProps?.precision)
      ) {
        val = Number(val.toFixed(props.fieldProps.precision))
      }
      return val
    }
    return () => {
      const { text, mode: type, render, placeholder: propsPlaceholder, formItemRender, ...rest } = props
      if (type === 'read') {
        let fractionDigits = {} as Record<string, any>
        if (rest.fieldProps?.precision) {
          fractionDigits = {
            minimumFractionDigits: Number(rest.fieldProps.precision),
            maximumFractionDigits: Number(rest.fieldProps.precision),
          }
        }
        const digit = new Intl.NumberFormat(undefined, {
          ...fractionDigits,
          ...(rest.fieldProps?.intlProps || {}),
        }).format(Number(text) as number)

        // 如果是 string 模式，什么都不要处理了
        const dom = !rest.fieldProps?.stringMode ? (
          <span>{rest.fieldProps?.formatter?.(digit, { userTyping: false, input: '' }) || digit}</span>
        ) : (
          <span>{text}</span>
        )

        if (render) {
          return <>{render(text, { mode: type, ...rest }, dom)}</>
        }
        return dom
      }
      if (type === 'edit' || type === 'update') {
        const placeholder
          = propsPlaceholder || intl.value.getMessage({
            id: 'tableForm.inputPlaceholder',
            defaultMessage: '请输入',
          })
        const dom = (
          <InputNumber
            min={0}
            placeholder={placeholder}
            {...omit(rest.fieldProps!, ['onChange', 'onBlur'])}
            onChange={e => rest.fieldProps?.onChange?.(proxyChange(e))}
            onBlur={(e) => {
              const value = (e.target as HTMLInputElement)?.value
              if (isEmptyOrWhitespace(value)) {
                rest.fieldProps?.onBlur?.(e)
                return
              }
              const processedValue = proxyChange(value)
              // 更新输入框的值
              if (e.target && typeof processedValue === 'number') {
                (e.target as HTMLInputElement).value = processedValue.toString()
                // 触发 onChange 事件以更新表单值
                rest.fieldProps?.onChange?.(processedValue)
              }
              rest.fieldProps?.onBlur?.(e)
            }}
          />
        )
        if (formItemRender) {
          return <>{formItemRender(text, { mode: type, ...rest, placeholder }, dom)}</>
        }
        return dom
      }
      return null
    }
  },
  {
    name: 'FieldDigit',
    inheritAttrs: false,
  },
)
export default FieldDigit

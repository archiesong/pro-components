import type { IntlType } from '@antdv-next1/pro-provider'
import type { CustomSlotsType, VueNode } from '@v-c/util/dist/type'
import type { InputNumberProps } from 'antdv-next'
import type { ProFieldFC } from '../../typing'
import { useIntl } from '@antdv-next1/pro-provider'
import { InputNumber } from 'antdv-next'
import { defineComponent } from 'vue'

/**
 * 格式化秒
 * @param result
 * @param intl
 */
export function formatSecond(result: number, intl: IntlType) {
  let newResult = result
  let formatText
  let past = false
  if (newResult < 0) {
    newResult = -newResult
    past = true
  }
  const d = Math.floor(newResult / (3600 * 24))
  const h = Math.floor((newResult / 3600) % 24)
  const m = Math.floor((newResult / 60) % 60)
  const s = Math.floor(newResult % 60)
  formatText = `${s}${intl.getMessage({ id: 'time.seconds', defaultMessage: '秒' })}`
  if (m > 0) {
    formatText = `${m}${intl.getMessage({ id: 'time.minutes', defaultMessage: '分钟' })}${formatText}`
  }
  if (h > 0) {
    formatText = `${h}${intl.getMessage({ id: 'time.hours', defaultMessage: '小时' })}${formatText}`
  }
  if (d > 0) {
    formatText = `${d}${intl.getMessage({ id: 'time.days', defaultMessage: '天' })}${formatText}`
  }
  if (past) {
    formatText += intl.getMessage({ id: 'time.ago', defaultMessage: '前' })
  }
  return formatText
}

export type FieldSecondProps = ProFieldFC<{
  text: number
  placeholder?: string
}, InputNumberProps>

const FieldSecond = defineComponent<FieldSecondProps, {}, string, CustomSlotsType<{
  default?: () => VueNode
}>>(
  (props) => {
    const intl = useIntl()
    return () => {
      const { text, mode: type, render, formItemRender, fieldProps, placeholder: propsPlaceholder, ...rest } = props
      if (type === 'read') {
        const secondText = formatSecond(Number(text) as number, intl.value)
        const dom = <span>{secondText}</span>
        if (render) {
          return <>{render(text, { mode: type, ...rest, fieldProps }, dom)}</>
        }
        return dom
      }
      if (type === 'edit' || type === 'update') {
        const placeholder = propsPlaceholder || intl.value.getMessage({ id: 'tableForm.inputPlaceholder', defaultMessage: '请输入' })
        const dom = (
          <InputNumber
            min={0}
            style={{
              width: '100%',
            }}
            defaultValue={text}
            placeholder={placeholder}
            {...fieldProps}
          />
        )
        if (formItemRender) {
          return <>{formItemRender(text, { mode: type, ...rest, fieldProps, placeholder }, dom)}</>
        }
        return dom
      }
      return null
    }
  },
  {
    name: 'FieldSecond',
    inheritAttrs: false,
  },
)

export default FieldSecond

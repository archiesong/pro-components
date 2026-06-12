import type { CustomSlotsType, VueNode } from '@v-c/util/dist/type'
import type { DatePickerProps } from 'antdv-next'

import type { ProFieldFC } from '../../typing'
import { useIntl } from '@antdv-next1/pro-provider'
import { parseValueToDay } from '@antdv-next1/pro-utils'
import { DatePicker, Tooltip } from 'antdv-next'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { defineComponent } from 'vue'

dayjs.extend(relativeTime)

export type FieldFromNowProps = ProFieldFC<{
  text: string
  format?: string
  variant?: 'outlined' | 'borderless' | 'filled' | 'underlined'
}, DatePickerProps>

const FieldFromNow = defineComponent<FieldFromNowProps, {}, string, CustomSlotsType<{
  default?: () => VueNode
}>>(
  (prpos) => {
    const intl = useIntl()
    return () => {
      const { text, mode, variant, render, formItemRender, format, ...rest } = prpos
      if (mode === 'read') {
        const dom = (
          <Tooltip title={dayjs(text).format(format || 'YYYY-MM-DD HH:mm:ss')}>
            {dayjs(text).fromNow()}
          </Tooltip>
        )
        if (render) {
          return <>{render(text, { mode, ...rest }, <>{dom}</>)}</>
        }
        return <>{dom}</>
      }
      if (mode === 'edit' || mode === 'update') {
        const placeholder = intl.value.getMessage({
          id: 'tableForm.selectPlaceholder',
          defaultMessage: '请选择',
        })
        const momentValue = parseValueToDay(rest.fieldProps?.value!) as dayjs.Dayjs
        const dom = (
          <DatePicker
            placeholder={placeholder}
            showTime
            variant={variant ?? rest.fieldProps?.variant ?? 'outlined'}
            {...rest.fieldProps}
            value={momentValue}
          />
        )
        if (formItemRender) {
          return <>{formItemRender(text, { mode, ...rest, placeholder }, dom)}</>
        }
        return dom
      }
      return null
    }
  },
  {
    name: 'FieldFromNow',
    inheritAttrs: false,
  },
)

export default FieldFromNow

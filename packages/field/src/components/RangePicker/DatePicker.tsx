import type { CustomSlotsType, VueNode } from '@v-c/util/dist/type'
import type { RangePickerProps } from 'antdv-next'
import type { ProFieldFC, ProFieldLightProps } from '../../typing'
import { useIntl } from '@antdv-next/pro-provider'
import { FieldLabel, parseValueToDay, useState } from '@antdv-next/pro-utils'
import { DateRangePicker, Space } from 'antdv-next'
import dayjs from 'dayjs'
import { defineComponent } from 'vue'

export type FieldDateRangePickerProps = ProFieldFC<{
  text: string[]
  format?: string
  variant?: 'outlined' | 'borderless' | 'filled' | 'underlined'
  showTime?: boolean
  separator?: string
  picker?: 'time' | 'date' | 'week' | 'month' | 'quarter' | 'year'
} & ProFieldLightProps, RangePickerProps>

const FieldDateRangePicker = defineComponent<FieldDateRangePickerProps, {}, string, CustomSlotsType<{
  default?: () => VueNode
}>>(
  (props, { slots }) => {
    const intl = useIntl()
    const [open, setOpen] = useState<boolean>(false)
    const genFormatText = (formatValue: dayjs.Dayjs) => {
      if (typeof props.fieldProps?.format === 'function') {
        return props.fieldProps?.format?.(formatValue)
      }
      return props.fieldProps?.format || props.format || 'YYYY-MM-DD'
    }

    return () => {
      const {
        text,
        mode,
        light,
        label,
        format = 'YYYY-MM-DD',
        render,
        picker,
        formItemRender,
        showTime,
        separator = '~',
        lightLabel,
        variant: propsVariant,
        fieldProps,
        ...rest
      } = props
      const [startText, endText] = Array.isArray(text) ? text : []

      const parsedStartText: string = startText
        ? dayjs(startText).format(genFormatText(dayjs(startText)) as string)
        : ''
      const parsedEndText: string = endText
        ? dayjs(endText).format(genFormatText(dayjs(endText)) as string)
        : ''
      if (mode === 'read') {
        const dom = (
          <Space align="center" wrap>
            <div>{parsedStartText || '-'}</div>
            {' '}
            {separator}
            {' '}
            <div>{parsedEndText || '-'}</div>
          </Space>
        )
        if (render) {
          return <>{render(text, { mode, ...rest, fieldProps }, <span>{dom}</span>)}</>
        }
        return dom
      }
      if (mode === 'edit' || mode === 'update') {
        const dayValue = parseValueToDay(fieldProps?.value as string[]) as [dayjs.Dayjs, dayjs.Dayjs]
        const placeholder = fieldProps?.placeholder! || [
          intl.value.getMessage({
            id: 'tableForm.selectPlaceholder',
            defaultMessage: '请选择',
          }),
          intl.value.getMessage({
            id: 'tableForm.selectPlaceholder',
            defaultMessage: '请选择',
          }),
        ]
        let dom = (
          <DateRangePicker
            format={format}
            showTime={showTime}
            placeholder={
              placeholder
            }
            {...fieldProps}
            value={dayValue}
            v-slots={slots}
          />
        )
        if (light) {
          dom = (
            <FieldLabel
              label={label}
              onClick={() => {
                fieldProps?.onOpenChange?.(true)
                setOpen(true)
              }}
              style={
                dayValue
                  ? {
                      paddingInlineEnd: 0,
                    }
                  : undefined
              }
              disabled={Array.isArray(fieldProps?.disabled) ? fieldProps.disabled[0] : fieldProps?.disabled}
              value={
                dayValue || open.value ? (
                  <DateRangePicker
                    picker={picker}
                    showTime={showTime}
                    format={format}
                    {...fieldProps}
                    placeholder={placeholder}
                    value={dayValue}
                    onOpenChange={(isOpen) => {
                      if (dayValue)
                        setOpen(isOpen)
                      fieldProps?.onOpenChange?.(isOpen)
                    }}
                    onChange={(dates, dateStrings) => {
                      fieldProps?.onChange?.(dates, dateStrings)
                      if (!dates) {
                        setOpen(false)
                      }
                    }}
                  />
                ) : null
              }
              allowClear={false}
              variant={propsVariant}
              ref={lightLabel}
              downIcon={dayValue || open.value ? false : undefined}
            />
          )
        }

        if (formItemRender) {
          return <>{formItemRender(text, { mode, ...rest, fieldProps }, dom)}</>
        }
        return dom
      }
      return null
    }
  },
  {
    name: 'FieldDateRangePicker',
    inheritAttrs: false,
  },
)

export default FieldDateRangePicker

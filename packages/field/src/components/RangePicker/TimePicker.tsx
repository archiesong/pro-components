import type { CustomSlotsType, VueNode } from '@v-c/util/dist/type'
import type { TimeRangePickerProps } from 'antdv-next'
import type { ProFieldFC, ProFieldLightProps } from '../../typing'
import { useIntl } from '@antdv-next/pro-provider'
import { FieldLabel, parseValueToDay, useState } from '@antdv-next/pro-utils'
import { Space, TimeRangePicker } from 'antdv-next'
import dayjs from 'dayjs'
import { defineComponent } from 'vue'

export type FieldTimeRangePickerProps = ProFieldFC<{
  text: string[] | number[]
  format?: string
  separator?: string
  variant?: 'outlined' | 'borderless' | 'filled' | 'underlined'
} & ProFieldLightProps, TimeRangePickerProps>

const FieldTimeRangePicker = defineComponent<FieldTimeRangePickerProps, {}, string, CustomSlotsType<{
  default?: () => VueNode
}>>(
  (props) => {
    const intl = useIntl()
    const [open, setOpen] = useState<boolean>(false)
    return () => {
      const {
        text,
        light,
        label,
        mode,
        lightLabel,
        format,
        render,
        variant,
        separator = '~',
        formItemRender,
        fieldProps,
        ...rest
      } = props
      const finalFormat = fieldProps?.format || format || 'HH:mm:ss'
      const [startText, endText] = Array.isArray(text) ? text : []
      const startTextIsNumberOrMoment = dayjs.isDayjs(startText) || typeof startText === 'number'
      const endTextIsNumberOrMoment = dayjs.isDayjs(endText) || typeof endText === 'number'

      const parsedStartText: string = startText
        ? dayjs(startText, startTextIsNumberOrMoment ? undefined : finalFormat as string).format(finalFormat as string)
        : ''
      const parsedEndText: string = endText
        ? dayjs(endText, endTextIsNumberOrMoment ? undefined : finalFormat as string).format(finalFormat as string)
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
          return <>{ render(text, { mode, ...rest, fieldProps }, <span>{dom}</span>)}</>
        }
        return dom
      }
      if (mode === 'edit' || mode === 'update') {
        const dayValue = parseValueToDay(fieldProps?.value as string[], finalFormat as string) as [dayjs.Dayjs, dayjs.Dayjs]
        let dom = (
          <TimeRangePicker
            format={format}
            variant={variant}
            {...fieldProps}
            value={dayValue}
          />
        )
        if (light) {
          const {
            disabled,
            placeholder = [
              intl.value.getMessage({
                id: 'tableForm.selectPlaceholder',
                defaultMessage: '请选择',
              })!,
              intl.value.getMessage({
                id: 'tableForm.selectPlaceholder',
                defaultMessage: '请选择',
              })!,
            ],
          } = fieldProps!
          dom = (
            <FieldLabel
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
              label={label}
              disabled={Array.isArray(disabled) ? disabled[0] : disabled}
              variant={variant}
              placeholder={placeholder}
              value={
                dayValue || open.value ? (
                  <TimeRangePicker
                    variant={variant ?? fieldProps?.variant}
                    format={format}
                    {...fieldProps}
                    placeholder={placeholder}
                    value={dayValue}
                    onOpenChange={(isOpen) => {
                      setOpen(isOpen)
                      fieldProps?.onOpenChange?.(isOpen)
                    }}
                    open={open.value}
                  />
                ) : null
              }
              downIcon={dayValue || open.value ? false : undefined}
              allowClear={false}
              ref={lightLabel}
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
    name: 'FieldTimeRangePicker',
    inheritAttrs: false,
  },
)

export default FieldTimeRangePicker

import type { CustomSlotsType, VueNode } from '@v-c/util/dist/type'
import type { TimePickerProps } from 'antdv-next'
import type { ProFieldFC, ProFieldLightProps } from '../../typing'
import { useIntl } from '@antdv-next1/pro-provider'
import { FieldLabel, parseValueToDay, useState } from '@antdv-next1/pro-utils'
import { TimePicker } from 'antdv-next'
import dayjs from 'dayjs'
import { defineComponent } from 'vue'

export type FieldTimePickerProps = ProFieldFC<{
  text: string | number
  format?: string
  variant?: 'outlined' | 'borderless' | 'filled' | 'underlined'
} & ProFieldLightProps, TimePickerProps>

const FieldTimePicker = defineComponent<FieldTimePickerProps, {}, string, CustomSlotsType<{
  default?: () => VueNode
}>>(
  (props) => {
    const [open, setOpen] = useState<boolean>(false)
    const intl = useIntl()
    return () => {
      const {
        text,
        mode,
        light,
        label,
        format = 'HH:mm:ss',
        render,
        variant,
        formItemRender,
        fieldProps,
        lightLabel,
        ...rest
      } = props
      const finalFormat = fieldProps?.format || format
      const isNumberOrMoment = dayjs.isDayjs(text) || typeof text === 'number'
      if (mode === 'read') {
        const dom = (
          <span>
            {text
              ? dayjs(text, isNumberOrMoment ? undefined : finalFormat as string).format(finalFormat as string)
              : '-'}
          </span>
        )
        if (render) {
          return <>{ render(text, { mode, ...rest, fieldProps }, <span>{dom}</span>)}</>
        }
        return dom
      }
      if (mode === 'edit' || mode === 'update') {
        const { disabled, value } = fieldProps!
        const dayValue = parseValueToDay(value, finalFormat as string) as dayjs.Dayjs
        const placeholder = fieldProps?.placeholder
          ?? intl.value.getMessage({
            id: 'tableForm.selectPlaceholder',
            defaultMessage: '请选择',
          })
        let dom = (
          <TimePicker
            format={format}
            {...fieldProps}
            value={dayValue}
          />
        )

        if (light) {
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
              disabled={disabled}
              variant={variant ?? fieldProps?.variant}
              value={
                dayValue || open.value ? (
                  <TimePicker
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
          return <>{formItemRender(text, { mode, ...rest, fieldProps, placeholder }, dom)}</>
        }
        return dom
      }
      return null
    }
  },
  {
    name: 'FieldTimePicker',
    inheritAttrs: false,

  },
)

export default FieldTimePicker

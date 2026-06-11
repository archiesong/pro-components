import type { RangePickerProps } from 'antdv-next'
import type { ProFormFieldItemProps } from '../../typing'
import { FieldDateRangePicker } from '@antdv-next/pro-field'
import ProConfigProvider from '@antdv-next/pro-provider'
import { dateArrayFormatter } from '@antdv-next/pro-utils'
import { defineComponent } from 'vue'
import { useFieldContextInject } from '../../FieldContext'
import ProFormField from '../Field'

const valueType = 'dateMonthRange' as const

export type ProFormDateMonthRangePickerProps = ProFormFieldItemProps<RangePickerProps>

const ProFormDateMonthRangePicker = defineComponent<ProFormDateMonthRangePickerProps>(
  (props, { attrs, expose }) => {
    const { getPopupContainer } = useFieldContextInject()
    expose({})
    return () => {
      const { fieldProps, proFieldProps, ...rest } = props
      return (
        <ProConfigProvider
          valueTypeMap={{
            [valueType]: {
              render: (text, restProps) => (
                <FieldDateRangePicker {...restProps} text={text} />
              ),
              formItemRender: (text, restProps) => (
                <FieldDateRangePicker {...restProps} text={text} />
              ),
            },
          }}
        >
          <ProFormField
            {...attrs}
            {...rest}
            fieldProps={{
              getPopupContainer: getPopupContainer?.value,
              ...fieldProps,
            }}
            valueType={valueType}
            proFieldProps={proFieldProps}
            fieldConfig={
              rest.fieldConfig || {
                valueType,
                customLightMode: true,
                lightFilterLabelFormatter: value =>
                  dateArrayFormatter(value, fieldProps?.format || 'YYYY-MM'),
              } as const
            }
          />
        </ProConfigProvider>
      )
    }
  },
  {
    name: 'ProFormDateMonthRangePicker',
    inheritAttrs: false,
  },
)

export default ProFormDateMonthRangePicker

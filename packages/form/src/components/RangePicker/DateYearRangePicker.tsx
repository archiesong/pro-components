import type { RangePickerProps } from 'antdv-next'
import type { ProFormFieldItemProps } from '../../typing'
import { FieldDateRangePicker } from '@antdv-next/pro-field'
import ProConfigProvider from '@antdv-next/pro-provider'
import { dateArrayFormatter } from '@antdv-next/pro-utils'
import { defineComponent } from 'vue'
import { useFieldContextInject } from '../../FieldContext'
import ProFormField from '../Field'

const valueType = 'dateYearRange' as const

export type ProFormDateYearRangePickerProps = ProFormFieldItemProps<RangePickerProps>

const ProFormDateYearRangePicker = defineComponent<ProFormDateYearRangePickerProps>(
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
                  dateArrayFormatter(value, fieldProps?.format || 'YYYY'),
              } as const
            }
          />
        </ProConfigProvider>
      )
    }
  },
  {
    name: 'ProFormDateYearRangePicker',
    inheritAttrs: false,
  },
)

export default ProFormDateYearRangePicker

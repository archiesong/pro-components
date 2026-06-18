import type { CustomSlotsType, VueNode } from '@v-c/util/dist/type'
import type { SwitchProps } from 'antdv-next'
import type { CheckedValueType } from 'antdv-next/dist/switch/index'
import type { ProFieldFC } from '../../typing'
import { useIntl } from '@antdv-next1/pro-provider'
import { FieldLabel } from '@antdv-next1/pro-utils'
import { unit } from '@antdv-next/cssinjs'
import { Switch } from 'antdv-next'
import { computed, defineComponent } from 'vue'

export type FieldSwitchProps = ProFieldFC<{
  text: boolean
  variant?: 'outlined' | 'borderless' | 'filled'
}, SwitchProps & {
  'onUpdate:checked'?: (checked: CheckedValueType) => void
  'onUpdate:value'?: (checked: CheckedValueType) => void
}>

const FieldSwitch = defineComponent<FieldSwitchProps, {}, string, CustomSlotsType<{
  default?: () => VueNode
}>>(
  (props, { attrs }) => {
    const intl = useIntl()
    const dom = computed(() => {
      if (props.text === undefined || props.text === null || `${props.text}`.length < 1)
        return '-'
      return props.text
        ? (props.fieldProps?.checkedChildren
          ?? intl.value.getMessage({ id: 'switch.open', defaultMessage: '打开' }))
        : (props.fieldProps?.unCheckedChildren
          ?? intl.value.getMessage({ id: 'switch.close', defaultMessage: '关闭' }))
    })

    return () => {
      const { text, mode, render, variant, light, label, formItemRender, fieldProps, ...rest } = props
      if (mode === 'read') {
        if (render) {
          return <>{render(text, { mode, ...rest, fieldProps }, <>{dom.value}</>)}</>
        }
        return <>{dom.value ?? '-'}</>
      }
      if (mode === 'edit' || mode === 'update') {
        const { 'onUpdate:value': onUpdateValue, 'onUpdate:checked': onUpdateChecked, value, checked, ...restFieldProps } = fieldProps!
        const dom = (
          <Switch
            {...attrs}
            size={light ? 'small' : undefined}
            {...restFieldProps}
            onUpdate:checked={(checked) => {
              onUpdateChecked?.(checked)
              onUpdateValue?.(checked)
            }}
            checked={checked ?? value}
          />
        )
        if (light) {
          const { disabled } = fieldProps!
          return (
            <FieldLabel
              label={label}
              disabled={disabled}
              variant={variant}
              downIcon={false}
              value={(
                <div
                  style={{
                    paddingLeft: unit(8),
                  }}
                >
                  {dom}
                </div>
              )}
              allowClear={false}
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
    name: 'FieldSwitch',
    inheritAttrs: false,
  },
)

export default FieldSwitch

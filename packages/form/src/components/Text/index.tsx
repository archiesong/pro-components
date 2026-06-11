import type { CustomSlotsType, VueNode } from '@v-c/util/dist/type'
import type { InputProps } from 'antdv-next'
import type { ProFormFieldItemProps } from '../../typing'
import { defineComponent } from 'vue'
import ProFormField from '../Field'
import ProFormPassword from '../Password'

const valueType = 'text' as const

export type ProFormTextProps = ProFormFieldItemProps<InputProps> & InputProps

const _ProFormText = defineComponent<ProFormTextProps, {}, string, CustomSlotsType<{
  default?: () => VueNode
}>>(
  (props, { slots, attrs }) => {
    return () => {
      const { fieldProps, fieldConfig, proFieldProps, ...rest } = props
      return (
        <ProFormField
          {...attrs}
          {...rest}
          valueType={valueType}
          fieldProps={fieldProps}
          fieldConfig={
            fieldConfig
            || ({
              valueType,
            } as const)
          }
          proFieldProps={proFieldProps}
          v-slots={slots}
        />
      )
    }
  },
  {
    name: 'ProFormText',
    inheritAttrs: false,
  },
)

const ProFormText = _ProFormText as typeof _ProFormText & {
  __PRO_FORM_COMPONENT?: boolean
  Password?: typeof ProFormPassword
}
// 标记是否是 ProForm 的组件
ProFormText.__PRO_FORM_COMPONENT = true

ProFormText.Password = ProFormPassword
export default ProFormText

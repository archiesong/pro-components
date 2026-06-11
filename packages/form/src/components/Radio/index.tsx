import type { CustomSlotsType, VueNode } from '@v-c/util/dist/type'
import type { RadioProps } from 'antdv-next'
import type { ProFormFieldItemProps } from '../../typing'
import { Radio, RadioButton } from 'antdv-next'
import { defineComponent } from 'vue'
import { createField } from '../../BaseForm/createField'
import ProFormRadioGroup from './group'

export type ProFormRadioProps = ProFormFieldItemProps<RadioProps>

const BaseProFormRadio = defineComponent<ProFormRadioProps, {}, string, CustomSlotsType<{
  default?: () => VueNode
}>>((props, { slots, attrs })=>{
  return () => {
      const { fieldProps } = props
      return <Radio {...attrs} {...fieldProps} v-slots={slots} />
    }
},{
  name: 'BaseProFormRadio',
  inheritAttrs: false,
})

const ProFormRadio = createField<
  ProFormRadioProps,
  {
    Group: typeof ProFormRadioGroup
    Button: typeof RadioButton
    __PRO_FORM_COMPONENT: boolean
  }
>(BaseProFormRadio, {
  valuePropName: 'checked',
  ignoreWidth: true,
})

ProFormRadio.inheritAttrs = false
ProFormRadio.displayName = 'ProFormRadio'
ProFormRadio.Group = ProFormRadioGroup
ProFormRadio.Button = RadioButton

// 标记是否是 ProForm 的组件
ProFormRadio.__PRO_FORM_COMPONENT = true

export default ProFormRadio

import type { CustomSlotsType, VueNode } from '@v-c/util/dist/type'
import type { CheckboxProps } from 'antdv-next'
import type { ProFormFieldItemProps } from '../../typing'
import { Checkbox } from 'antdv-next'
import { defineComponent } from 'vue'
import { createField } from '../../BaseForm/createField'
import ProFormCheckboxGroup from './group'

export type ProFormCheckboxProps = ProFormFieldItemProps<CheckboxProps>

const BaseProFormCheckbox = defineComponent<ProFormCheckboxProps, {}, string, CustomSlotsType<{
  default?: () => VueNode
}>>(
  (props, { slots, attrs }) => {
    return () => {
      const { fieldProps } = props
      return <Checkbox {...attrs} {...fieldProps} v-slots={slots} />
    }
  },
  {
    name: 'BaseProFormCheckbox',
    inheritAttrs: false,
  },
)

const ProFormCheckbox = createField<
  ProFormCheckboxProps,
  {
    Group: typeof ProFormCheckboxGroup
  }
>(BaseProFormCheckbox, {
  valuePropName: 'checked',
})

ProFormCheckbox.inheritAttrs = false
ProFormCheckbox.displayName = 'ProFormCheckbox'
ProFormCheckbox.Group = ProFormCheckboxGroup
export default ProFormCheckbox

import { reactive } from 'vue'

const antdvFormItemPropsList = [
  'colon',
  'dependencies',
  'extra',
  'getValueFromEvent',
  'getValueProps',
  'hasFeedback',
  'help',
  'htmlFor',
  'initialValue',
  'noStyle',
  'label',
  'labelAlign',
  'labelCol',
  'name',
  'preserve',
  'normalize',
  'required',
  'rules',
  'trigger',
  'validateFirst',
  'validateStatus',
  'validateTrigger',
  'valuePropName',
  'wrapperCol',
  'hidden',
  'validateDebounce',
  // 我自定义的
  'addonBefore',
  'addonAfter',
  'addonWarpStyle',
] as const

export function pickProFormItemProps<T extends Record<string, any>>(props: T) {
  const attrs = reactive({} as Record<(typeof antdvFormItemPropsList)[number], any>)
  antdvFormItemPropsList.forEach((key) => {
    if (props[key] !== undefined) {
      attrs[key] = props[key]
    }
  })
  return attrs
}

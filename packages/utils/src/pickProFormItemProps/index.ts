import type { ComputedRef } from 'vue';
import { reactive } from 'vue';
const antdvFormItemPropsList = [
  // https://www.antdv.com/components/form-cn#form-item
  'autoLink',
  'colon',
  'extra',
  'hasFeedback',
  'help',
  'htmlFor',
  'label',
  'labelAlign',
  'labelCol',
  'name',
  'required',
  'rules',
  'validateFirst',
  'validateStatus',
  'validateTrigger',
  'wrapperCol',
  // 我自定义的
  'addonBefore',
  'addonAfter',
  'addonWarpStyle',
] as const;

const pickProFormItemProps = <T extends Record<(typeof antdvFormItemPropsList)[number], any>>(
  props: ComputedRef<T>
) => {
  const attrs = reactive({} as Record<(typeof antdvFormItemPropsList)[number], any>);
  antdvFormItemPropsList.forEach((key) => {
    if (props.value[key] !== undefined) {
      attrs[key] = props.value[key];
    }
  });
  return attrs;
};
export default pickProFormItemProps;

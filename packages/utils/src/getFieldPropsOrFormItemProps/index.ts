import type { FormInstance } from 'ant-design-vue';
import runFunction from '../runFunction';

/**
 * 因为 fieldProps 支持了 function 所以新增了这个方法
 *
 * @param fieldProps
 * @param form
 */
const getFieldPropsOrFormItemProps = <T, K>(
  fieldProps: T,
  form?: FormInstance | null,
  extraProps?: K
): T => {
  if (form === undefined) {
    return fieldProps;
  }
  return runFunction(fieldProps, form, extraProps);
};
export default getFieldPropsOrFormItemProps;

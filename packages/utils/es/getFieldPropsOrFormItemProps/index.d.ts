import { FormInstance } from 'ant-design-vue';
/**
 * 因为 fieldProps 支持了 function 所以新增了这个方法
 *
 * @param fieldProps
 * @param form
 */
declare const getFieldPropsOrFormItemProps: <T, K>(fieldProps: T, form?: FormInstance | null, extraProps?: K) => T;
export default getFieldPropsOrFormItemProps;

import type { DefineComponent, PropType, FunctionalComponent } from 'vue';
import type {
  ExtendsProps,
  FormModeType,
  ProFormFieldItemProps,
  ProFormItemCreateConfig,
} from '../typing';
import type { ProFieldValueType } from '@ant-design-vue/pro-utils';
import { defineComponent, computed } from 'vue';
import { ProFormItem } from '../components';
import { useGridHelpers } from '../helpers';
import { useFieldContextInject } from '../FieldContext';
import { omit, omitUndefined } from '@ant-design-vue/pro-utils';

// const WIDTH_SIZE_ENUM = {
//   // 适用于短数字，短文本或者选项
//   xs: 104,
//   s: 216,
//   // 适用于较短字段录入、如姓名、电话、ID 等。
//   sm: 216,
//   m: 328,
//   // 标准宽度，适用于大部分字段长度。
//   md: 328,
//   l: 440,
//   // 适用于较长字段录入，如长网址、标签组、文件路径等。
//   lg: 440,
//   // 适用于长文本录入，如长链接、描述、备注等，通常搭配自适应多行输入框或定高文本域使用。
//   xl: 552,
// };
// const ignoreWidthValueType = ['switch', 'radioButton', 'radio', 'rate'];

/**
 * 这个方法的主要作用是帮助 Field 增加 FormItem 同时也会处理 lightFilter
 *
 * @param Field
 * @param config
 */
export function createField<P extends ProFormFieldItemProps = any>(
  Field: DefineComponent<P, any, any>,
  config?: ProFormItemCreateConfig
) {
  const FieldWithContext = defineComponent({
    name: 'FieldWithContext',
    inheritAttrs: false,
    props: {
      fieldProps: {
        type: Object as PropType<ProFormFieldItemProps['fieldProps']>,
        default: undefined,
      },
      ignoreFormItem: {
        type: Boolean as PropType<ProFormFieldItemProps['ignoreFormItem']>,
        default: undefined,
      },
      filedConfig: {
        type: Object as PropType<ProFormFieldItemProps['filedConfig']>,
        default: undefined,
      },
      label: {
        type: [Object, String] as PropType<ProFormFieldItemProps['label']>,
        default: undefined,
      },
      tooltip: {
        type: String as PropType<ProFormFieldItemProps['tooltip']>,
        default: undefined,
      },
      placeholder: {
        type: String as PropType<ProFormFieldItemProps['placeholder']>,
        default: undefined,
      },
      width: {
        type: [String, Number] as PropType<ProFormFieldItemProps['width']>,
        default: undefined,
      },
      bordered: {
        type: Boolean as PropType<ProFormFieldItemProps['bordered']>,
        default: undefined,
      },
      messageVariables: {
        type: Object as PropType<ProFormFieldItemProps['messageVariables']>,
        default: undefined,
      },
      convertValue: {
        type: Function as PropType<ProFormFieldItemProps['convertValue']>,
        default: undefined,
      },
      readonly: {
        type: Boolean as PropType<ProFormFieldItemProps['readonly']>,
        default: undefined,
      },
      allowClear: {
        type: Boolean as PropType<ProFormFieldItemProps['allowClear']>,
        default: undefined,
      },
      colSize: {
        type: Number as PropType<ProFormFieldItemProps['colSize']>,
        default: undefined,
      },
      formItemProps: {
        type: Object as PropType<ProFormFieldItemProps['formItemProps']>,
        default: undefined,
      },
      name: {
        type: [String, Number, Array] as PropType<ProFormFieldItemProps['name']>,
        default: undefined,
      },
      proFieldProps: {
        type: Object as PropType<ProFormFieldItemProps['proFieldProps']>,
        default: undefined,
      },
      proFormFieldKey: {
        type: String as PropType<ProFormFieldItemProps['proFormFieldKey']>,
        default: undefined,
      },
      params: {
        type: [Object, Function] as PropType<ProFormFieldItemProps['params']>,
        default: undefined,
      },
      mode: {
        type: String as PropType<FormModeType>,
        default: undefined,
      },
      valueType: {
        type: String as PropType<ProFieldValueType>,
        default: undefined,
      },
      value: {
        type: [String, Object] as PropType<any>,
        default: undefined,
      },
      disabled: {
        type: Boolean as PropType<boolean>,
        default: undefined,
      },
    },
    setup(props, { attrs }) {
      /**
       * 从 context 中拿到的值
       */
      const contextValue = useFieldContextInject();
      const filedConfigs = computed(() => ({ ...props.filedConfig, ...config }));
      // const restFiledConfigs = computed(() =>
      //   omit(filedConfigs.value, [
      //     'valueType',
      //     'customLightMode',
      //     'lightFilterLabelFormatter',
      //     'ignoreWidth',
      //     'defaultProps',
      //   ])
      // );
      const mergeProps = computed(() => ({
        ...filedConfigs.value.defaultProps,
        ...props,
        ...attrs,
      }));
      const restProps = computed<any>(() =>
        omit(mergeProps.value, [
          'label',
          'tooltip',
          'placeholder',
          'width',
          'bordered',
          'messageVariables',
          'ignoreFormItem',
          'convertValue',
          'readonly',
          'allowClear',
          'colSize',
          'filedConfig',
          'proFieldProps',
        ])
      );
      // const valueType = computed(() => filedConfigs.value.valueType || restProps.value.valueType);
      // 有些 valueType 不需要宽度
      // const isIgnoreWidth = computed(
      //   () => filedConfigs.value.ignoreWidth || ignoreWidthValueType.includes(valueType.value!)
      // );
      const fieldProps = computed(() => ({
        ...(mergeProps.value.ignoreFormItem ? omitUndefined({ value: restProps.value.value }) : {}),
        placeholder: mergeProps.value.placeholder,
        disabled: props.disabled,
        ...contextValue.fieldProps,
        ...restProps.value.fieldProps,
      }));
      // restFormItemProps is user props pass to Form.Item
      // const restFormItemProps = pickProFormItemProps(restProps);
      // const formItemProps = computed(() => ({
      //   ...contextValue.formItemProps,
      //   ...restFormItemProps,
      //   ...restProps.value.formItemProps,
      // }));
      // const otherProps = computed(() => ({
      //   ...mergeProps.value.messageVariables,
      //   ...restFiledConfigs.value,
      //   ...formItemProps.value,
      // }));
      // console.log(restProps, props, attrs, 'restProps');
      // const proFieldKey = computed(() => {
      //   let name = otherProps?.name;
      //   if (Array.isArray(name)) name = name.join('_');
      //   if (Array.isArray(prefixName) && name) name = `${prefixName.join('.')}.${name}`;
      //   const key = name && `form-${contextValue.formKey ?? ''}-field-${name}`;
      //   return key;
      // });
      const { ColWrapper } = useGridHelpers({});
      const onChange = () => {};
      return () => {
        const {
          label,
          tooltip,
          placeholder,
          width,
          bordered,
          messageVariables,
          ignoreFormItem,
          convertValue,
          readonly,
          allowClear,
          colSize,
          filedConfig,
          proFieldProps,
          ...rest
        } = { ...filedConfigs.value.defaultProps, ...attrs, ...props };
        return (
          <ColWrapper>
            <ProFormItem>
              <Field
                {...rest}
                key={props.proFormFieldKey || props.name}
                fieldProps={{
                  onChange,
                  allowClear,
                  ...fieldProps.value,
                }}
                proFieldProps={omitUndefined({
                  ...contextValue.proFieldProps,
                  mode: rest.mode,
                  readonly: mergeProps.value.readonly,
                  params: rest.params,
                  // proFieldKey: proFieldKey,
                })}
              />
            </ProFormItem>
          </ColWrapper>
        );
      };
    },
  });

  const DependencyWrapper: FunctionalComponent<P & ExtendsProps> = (props) => (
    <FieldWithContext {...props} />
  );
  return DependencyWrapper;
}

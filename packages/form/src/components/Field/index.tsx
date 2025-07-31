import type { PropType } from 'vue';
import type { ProFormFieldItemProps } from '../../typing';
import type { ProFieldTextType, ProSchema } from '@ant-design-vue/pro-utils';
import { defineComponent } from 'vue';
import ProField from '@ant-design-vue/pro-field';
import { runFunction } from '@ant-design-vue/pro-utils';
import { useEditOrReadOnlyContextInject } from '../../BaseForm/EditOrReadOnlyContext';
import { createField } from '../../BaseForm/createField';

export type ProFormFieldProps<T = any, FiledProps = Record<string, any>> = ProSchema<
  T,
  ProFormFieldItemProps<FiledProps> & {
    mode?: 'edit' | 'read' | 'update';
    record: T;
    text?: ProFieldTextType;
  },
  any,
  any
>;
export const BaseProFormField = defineComponent({
  name: 'BaseProFormField',
  inheritAttrs: false,
  props: {
    mode: {
      type: String as PropType<ProFormFieldProps['mode']>,
      default: undefined,
    },
    text: {
      type: [String, Number, Object] as PropType<ProFormFieldProps['text']>,
      default: undefined,
    },
    ignoreFormItem: {
      type: Boolean as PropType<ProFormFieldProps['ignoreFormItem']>,
      default: undefined,
    },
    fieldProps: {
      type: Object as PropType<ProFormFieldProps['fieldProps']>,
      default: undefined,
    },
    labelCol: {
      type: Object as PropType<ProFormFieldProps['labelCol']>,
      default: undefined,
    },
    label: {
      type: [Object, String, Function] as PropType<ProFormFieldProps['label']>,
      default: undefined,
    },
    name: {
      type: [String, Number, Array] as PropType<ProFormFieldProps['name']>,
      default: undefined,
    },
    customRender: {
      type: Function as PropType<ProFormFieldProps['customRender']>,
      default: undefined,
    },
    renderFormItem: {
      type: Function as PropType<ProFormFieldProps['renderFormItem']>,
      default: undefined,
    },
    valueType: {
      type: String as PropType<ProFormFieldProps['valueType']>,
      default: undefined,
    },
    valueEnum: {
      type: [Object, Function] as PropType<ProFormFieldProps['valueEnum']>,
      default: undefined,
    },
    proFieldProps: {
      type: Object as PropType<ProFormFieldProps['proFieldProps']>,
      default: undefined,
    },
  },
  setup(props) {
    const modeContext = useEditOrReadOnlyContextInject();

    return () => {
      const {
        fieldProps,
        customRender,
        valueType,
        renderFormItem,
        valueEnum,
        proFieldProps,
        ...restProps
      } = props;
      return (
        <ProField
          {...restProps}
          {...proFieldProps}
          // text={fieldProps?.[valuePropName]}
          // customRender={customRender}
          // renderFormItem={renderFormItem}
          valueType={(valueType as 'text') || 'text'}
          valueEnum={runFunction(valueEnum)}
          mode={proFieldProps?.mode || modeContext.mode || 'edit'}
        />
      );
    };
  },
});
const ProFormField = createField(BaseProFormField);

export default ProFormField;

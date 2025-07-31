import type { PropType } from 'vue';
import type { VueNode } from 'ant-design-vue/es/_util/type';
import type { ProFieldFC } from '../../typing';
import { defineComponent, ref } from 'vue';
import { useIntl } from '@ant-design-vue/pro-provider';
import { Input } from 'ant-design-vue';
import { useEffect } from '@ant-design-vue/pro-utils';

export const fieldTextProps = () => ({
  mode: {
    type: String as PropType<ProFieldFC['mode']>,
    default: undefined,
  },
  text: {
    type: String as PropType<string>,
    default: undefined,
  },
  emptyText: {
    type: [String, Function, Object] as PropType<VueNode>,
    default: '-',
  },
  fieldProps: {
    type: Object as PropType<ProFieldFC['fieldProps']>,
    default: undefined,
  },
  customRender: {
    type: Function as PropType<ProFieldFC['customRender']>,
    default: undefined,
  },
  renderFormItem: {
    type: Function as PropType<ProFieldFC['renderFormItem']>,
    default: undefined,
  },
});

const FieldText = defineComponent({
  name: 'FieldText',
  inheritAttrs: false,
  props: fieldTextProps(),
  setup(props) {
    const inputRef = ref();
    const intl = useIntl();
    useEffect(() => {
      if (props.fieldProps?.autoFocus) {
        inputRef.value?.focus();
      }
    }, [() => props.fieldProps?.autoFocus]);

    return () => {
      const { mode, emptyText = '-', renderFormItem, customRender, text, fieldProps } = props;
      const { prefix = '', suffix = '' } = fieldProps || {};
      if (mode === 'read') {
        const dom = (
          <>
            {prefix}
            {text ?? emptyText}
            {suffix}
          </>
        );
        if (customRender) {
          return customRender(text, { mode, ...fieldProps }, dom) ?? emptyText;
        }
        return dom;
      }
      if (mode === 'edit' || mode === 'update') {
        const dom = (
          <Input
            ref={inputRef}
            placeholder={intl.value.getMessage({
              id: 'tableForm.inputPlaceholder',
              defaultMessage: '请输入',
            })}
            allowClear
            {...fieldProps}
          />
        );
        if (renderFormItem) {
          return renderFormItem(text, { mode, ...fieldProps }, dom);
        }
        return dom;
      }
      return null;
    };
  },
});

export default FieldText;

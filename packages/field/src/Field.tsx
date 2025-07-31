import type { DefineComponent, PropType, App, Plugin, ExtractPropTypes } from 'vue';
import type {
  ProFieldRequestData,
  ProFieldTextType,
  ProFieldValueObjectType,
  ProFieldValueType,
} from '@ant-design-vue/pro-utils';
import type { ProFieldFCRenderProps, ProRenderFieldPropsType } from '@ant-design-vue/pro-provider';
import type { VueNode } from 'ant-design-vue/es/_util/type';
import { cloneVNode, defineComponent, isVNode } from 'vue';
import { omitUndefined, pickProProps } from '@ant-design-vue/pro-utils';
import { useProConfigContextInject } from '@ant-design-vue/pro-provider';
import FieldText from './components/Text';
import FieldDatePicker from './components/DatePicker';
import FieldIndexColumn from './components/IndexColumn';
import FieldSelect from './components/Select';
import FieldHOC from './FieldHOC';

type RenderProps = Omit<ProFieldFCRenderProps, 'text' | 'placeholder'> &
  ProRenderFieldPropsType & {
    /** 从服务器读取选项 */
    request?: ProFieldRequestData;
    emptyText?: VueNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;

    /**
     * @deprecated use onOpenChange replace
     */
    onVisible?: (visible: boolean) => void;
    /**
     * @deprecated use open replace
     */
    visible?: boolean;
    [key: string]: any;
  };

export const proFieldProps = () => ({
  text: {
    type: [String, Object, Number, Array] as PropType<ProFieldTextType>,
    default: undefined,
  },
  valueType: {
    type: [String, Object] as PropType<ProFieldValueType | ProFieldValueObjectType>,
    default: undefined,
  },
  mode: {
    type: String as PropType<RenderProps['mode']>,
    default: undefined,
  },
  onChange: {
    type: Function as PropType<RenderProps['onChange']>,
    default: undefined,
  },
  renderFormItem: {
    type: Function as PropType<RenderProps['renderFormItem']>,
    default: undefined,
  },
  value: {
    type: String as PropType<RenderProps['value']>,
    default: undefined,
  },
  readonly: {
    type: Boolean as PropType<RenderProps['readonly']>,
    default: undefined,
  },
  fieldProps: {
    type: Object as PropType<RenderProps['fieldProps']>,
    default: undefined,
  },
  placeholder: {
    type: String as PropType<string>,
    default: undefined,
  },
  valueEnum: {
    type: Object as PropType<RenderProps['valueEnum']>,
    default: undefined,
  },
});

export type ProFieldProps = Partial<ExtractPropTypes<ReturnType<typeof proFieldProps>>>;

/**
 * 根据不同的类型来转化数值
 *
 * @param dataValue
 * @param valueType
 */
const defaultRenderText = (
  dataValue: ProFieldTextType,
  valueType: ProFieldValueType | ProFieldValueObjectType,
  props: RenderProps,
  valueTypeMap: Record<string, ProRenderFieldPropsType>
) => {
  const { mode = 'read', emptyText = '-' } = props;
  if (emptyText !== false && mode === 'read' && valueType !== 'option' && valueType !== 'switch') {
    if (typeof dataValue !== 'boolean' && typeof dataValue !== 'number' && !dataValue) {
      const { fieldProps, render } = props;
      if (render) {
        return render(dataValue, { mode, ...fieldProps }, <>{emptyText}</>);
      }
      return <>{emptyText}</>;
    }
  }
  delete props.emptyText;
  const customValueTypeConfig = valueTypeMap && valueTypeMap[valueType as string];
  if (customValueTypeConfig) {
    if (mode === 'read') {
      // return customValueTypeConfig.render?.(
      //   dataValue,
      //   {
      //     text: dataValue as React.ReactNode,
      //     ...props,
      //     mode: mode || 'read',
      //   },
      //   <>{dataValue as any}</>,
      // );
    }
  }

  /** 如果是日期的值 */
  if (valueType === 'date') {
    return (
      <FieldHOC isLight={props.light}>
        <FieldDatePicker {...props} text={dataValue as string} format="YYYY-MM-DD" />
      </FieldHOC>
    );
  }
  /** 如果是序号带背景的值 */
  if (valueType === 'indexBorder') {
    return <FieldIndexColumn border>{(dataValue as number) + 1}</FieldIndexColumn>;
  }

  /**如果是选择的值 */
  if (valueType === 'select' || (valueType === 'text' && (props.valueEnum || props.request))) {
    return (
      <FieldHOC isLight={props.light}>
        <FieldSelect text={dataValue as string} {...props} />
      </FieldHOC>
    );
  }
  if (valueType === 'switch') {
    return '1';
  }
  return <FieldText text={dataValue as string} {...props} />;
};

const ProField = defineComponent({
  name: 'ProField',
  inheritAttrs: false,
  props: proFieldProps(),
  setup(props) {
    const proProvide = useProConfigContextInject();
    const onChangeCallBack = (...restParams: any[]) => {
      props.fieldProps?.onChange?.(...restParams);
      props.onChange?.(...restParams);
    };
    return () => {
      const {
        text,
        valueType = 'text',
        mode = 'read',
        onChange,
        renderFormItem,
        value,
        readonly,
        fieldProps: restFieldProps,
        ...rest
      } = props;
      const fieldProps = (value !== undefined || restFieldProps) && {
        value,
        // fieldProps 优先级更高，在类似 LightFilter 场景下需要覆盖默认的 value 和 onChange
        ...omitUndefined(restFieldProps),
        onChange: onChangeCallBack,
      };
      return defaultRenderText(
        mode === 'edit' ? (fieldProps?.value ?? text ?? '') : (text ?? fieldProps?.value ?? ''),
        valueType || 'text',
        omitUndefined({
          ...rest,
          mode: readonly ? 'read' : mode,
          renderFormItem: renderFormItem
            ? (curText: any, props: ProFieldFCRenderProps, dom: VueNode) => {
                const { placeholder: _placeholder, ...restProps } = props;
                const newDom = renderFormItem(curText, restProps, dom);
                // renderFormItem 之后的dom可能没有props，这里会帮忙注入一下
                if (isVNode(newDom))
                  return cloneVNode(newDom, {
                    ...fieldProps,
                    ...(newDom.props || {}),
                  });
                return newDom;
              }
            : undefined,
          placeholder: renderFormItem ? undefined : (rest?.placeholder ?? fieldProps?.placeholder),
          fieldProps: pickProProps(
            omitUndefined({
              ...fieldProps,
              placeholder: renderFormItem
                ? undefined
                : (rest?.placeholder ?? fieldProps?.placeholder),
            })
          ),
        }),
        proProvide.value.valueTypeMap || {}
      );
    };
  },
});

ProField.install = (app: App) => {
  app.component(ProField.name as string, ProField);
  return app;
};

export default ProField as DefineComponent<ProFieldProps> & Plugin;

import type { PropType, ExtractPropTypes } from 'vue';
import type { Rule } from 'ant-design-vue/es/form';
import type { ProCoreActionType, ProSchemaComponentTypes } from '@ant-design-vue/pro-utils';
import type { ProFormColumnsType, ItemType, ProFormPropsType } from './typing';
import type { VueNode } from 'ant-design-vue/es/_util/type';
import type { ProFormInstance } from '../../BaseForm';
import { defineComponent, ref, reactive } from 'vue';
import { Form } from 'ant-design-vue';
import { formProps } from 'ant-design-vue/es/form';
import { LabelIconTip, omitUndefined, runFunction, omit } from '@ant-design-vue/pro-utils';
import QueryFilter from '../../layouts/QueryFilter';
import ProForm from '../../layouts/ProForm';
import { renderValueType } from './valueType';
import { commonFormProps } from '../../BaseForm';

const formLayoutType = (name: string) => {
  const componentList = {
    QueryFilter,
    Form: ProForm,
  };
  return componentList[name as keyof typeof componentList];
};

export const schemaFormProps = () => ({
  ...omit(formProps(), ['onFinish']),
  ...commonFormProps(),
  title: {
    type: [String, Function] as PropType<
      VueNode | ((schema: ProFormColumnsType, type: 'form', dom: VueNode) => VueNode)
    >,
    default: undefined,
  },
  type: {
    type: String as PropType<ProSchemaComponentTypes>,
    default: undefined,
  },
  open: {
    type: Boolean as PropType<boolean>,
    default: undefined,
  },
  action: {
    type: Object as PropType<ProCoreActionType>,
    default: undefined,
  },
  description: {
    type: String as PropType<VueNode>,
    default: undefined,
  },
  columns: {
    type: Array as PropType<ProFormPropsType<Record<string, any>>['columns']>,
    default: undefined,
  },
  layoutType: {
    type: String as PropType<ProFormPropsType<Record<string, any>>['layoutType']>,
    default: 'Form',
  },
});

export type SchemaFormProps = Partial<ExtractPropTypes<ReturnType<typeof schemaFormProps>>>;

/**
 * 此组件可以根据 Json Schema 来生成相应的表单,大部分配置与 antd 的 table 列配置相同
 *
 */
const SchemaForm = defineComponent({
  name: 'SchemaForm',
  inheritAttrs: false,
  props: schemaFormProps(),
  setup(props, { expose }) {
    const formRef = ref<ProFormInstance>();
    const formModel = reactive(props.model || {});
    const formRules: Record<string, Rule[]> = props.rules || {};

    if (props.model && props.rules) {
      const { resetFields, validate, validateField, clearValidate, validateInfos } = Form.useForm(
        props.model,
        props.rules
      );
      console.log(resetFields, validate, validateField, clearValidate, validateInfos);
    }
    /**
     * 生成子项，方便被 table 接入
     *
     * @param items
     */
    const genItems = (items: ProFormColumnsType[]) => {
      const itemsDoms = items
        .filter((originItem) => !(originItem.hideInForm && props.type === 'form'))
        .sort((a, b) => {
          if (b.order || a.order) {
            return (b.order || 0) - (a.order || 0);
          }
          return (b.index || 0) - (a.index || 0);
        })
        .map((originItem, index) => {
          const title = runFunction(
            originItem.title,
            originItem,
            'form',
            <LabelIconTip label={originItem.title as string} tooltip={originItem.tooltip} />
          );
          const item = omitUndefined({
            title,
            label: title,
            name: originItem.name,
            valueType: runFunction(originItem.valueType, {}),
            key: originItem.key || originItem.dataIndex || index,
            columns: originItem.columns,
            valueEnum: originItem.valueEnum,
            dataIndex: originItem.dataIndex || originItem.key,
            initialValue: originItem.initialValue,
            width: originItem.width,
            index: originItem.index,
            readonly: originItem.readonly,
            colSize: originItem.colSize,
            colProps: originItem.colProps,
            rowProps: originItem.rowProps,
            tooltip: originItem.tooltip,
            proFieldProps: originItem.proFieldProps,
            ignoreFormItem: originItem.ignoreFormItem,
            getFieldProps: originItem.fieldProps
              ? () => runFunction(originItem.fieldProps, formRef.value, originItem)
              : undefined,
            getFormItemProps: originItem.formItemProps
              ? () => runFunction(originItem.formItemProps, formRef.value, originItem)
              : undefined,
            customRender: originItem.customRender,
            renderFormItem: originItem.renderFormItem,
            renderText: originItem.renderText,
            request: originItem.request,
            params: originItem.params,
            transform: originItem.transform,
            convertValue: originItem.convertValue,
            debounceTime: originItem.debounceTime,
            defaultKeyWords: originItem.defaultKeyWords,
          }) as ItemType;
          // console.log(originItem, 'originItem');
          // console.log(item.getFormItemProps?.(), 'item');
          return renderValueType(item, {
            action: props.action,
            type: props.type,
            originItem,
            formRef,
            formModel,
            formRules,
            genItems,
          });
        })
        .filter((field) => Boolean(field));
      return itemsDoms;
    };
    expose({});
    const FormRenderComponent = formLayoutType(props.layoutType || 'Form');
    return () => {
      const { columns, ...restProps } = props;
      console.log(formModel, 'formModel');
      return (
        <FormRenderComponent
          {...restProps}
          ref={formRef}
          onInit={(_, initForm) => {
            formRef.value = initForm;
            restProps.onInit?.(_, initForm);
          }}
        >
          {genItems(columns!)}
        </FormRenderComponent>
      );
    };
  },
});
export * from './typing';
export default SchemaForm;

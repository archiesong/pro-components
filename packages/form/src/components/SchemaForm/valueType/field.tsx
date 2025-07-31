import type { ProSchemaRenderValueTypeFunction } from '../typing';
import type { ProFormFieldProps } from '../../Field';
import { omit, omitUndefined } from '@ant-design-vue/pro-utils';
import ProFormField from '../../Field';

const field: ProSchemaRenderValueTypeFunction = (
  item,
  { action, formRef, formModel, formRules, type, originItem }
) => {
  console.log(item, 'field');
  if (item.dataIndex) {
    formModel[item.dataIndex as string] = item.initialValue;
  }
  //
  /** 公用的 类型 props */
  const formFieldProps = {
    ...omit(item, ['dataIndex', 'width', 'customRender', 'renderFormItem', 'renderText', 'title']),
    name: item.name || item.key || item.dataIndex,
    width: item.width as 'md',
    customRender: item.customRender
      ? ({ text, record, index }) =>
          item.customRender?.(
            {
              text,
              record,
              index,
              column: {
                type,
                ...item,
                key: item.key?.toString(),
                formItemProps: item.getFormItemProps?.(),
                fieldProps: item.getFieldProps?.(),
              },
            },
            action
          )
      : undefined,
  } as Omit<ProFormFieldProps, 'fieldProps' | 'formItemProps'>;

  const defaultRender = () => {
    const { key, ...rest } = formFieldProps;
    return <ProFormField key={key} {...rest} ignoreFormItem={true} />;
  };
  const renderFormItem = item?.renderFormItem
    ? (_: any, config: any) => {
        const renderConfig = omitUndefined({ ...config, onChange: undefined });
        return item?.renderFormItem?.(
          {
            type,
            ...item,
            key: item.key?.toString(),
            formItemProps: item.getFormItemProps?.(),
            fieldProps: item.getFieldProps?.(),
            originProps: originItem,
          },
          {
            ...renderConfig,
            defaultRender,
            type,
          },
          formRef.value!
        );
      }
    : undefined;
  const getField = () => {
    if (item?.renderFormItem) {
      const dom = renderFormItem?.(null, {});
      if (!dom || item.ignoreFormItem) return dom;
    }
    console.log(formModel, 'formFieldProps');
    return (
      <ProFormField
        {...formFieldProps}
        key={[item.key, item.index || 0].join('-')}
        renderFormItem={renderFormItem}
      />
    );
  };
  return getField();
};
export default field;

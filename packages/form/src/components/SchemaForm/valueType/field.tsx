import type { Key, ProFieldValueObjectType, ProFieldValueType } from '@antdv-next/pro-utils'
import type { ProFormFieldProps } from '../../Field'
import type { ItemType, ProFormRenderValueTypeHelpers } from '../typing'
import { omitUndefined } from '@antdv-next/pro-utils'
import { omit } from '@v-c/util'
import ProFormDependency from '../../Dependency'
import ProFormField from '../../Field'

function field<T extends Record<string, any>, ValueType extends (ProFieldValueType | ProFieldValueObjectType)>(item: ItemType<T, ValueType>, { action, formRef, type, originItem }: ProFormRenderValueTypeHelpers<T, ValueType>) {
  /** 公用的 类型 props */
  const formFieldProps = {
    ...omit(item, ['dataIndex', 'width', 'render', 'formItemRender', 'renderText', 'title']),
    name: item.name || item.key || item.dataIndex,
    width: item.width as 'md',
    render: item.render ? (dom, entity, index) => item.render?.(
      dom,
      entity as T,
      index,
      action,
      {
        type,
        ...item,
        key: item.key?.toString(),
        formItemProps: item.getFormItemProps?.(),
        fieldProps: item.getFieldProps?.(),
      },
    ) : undefined,
  } as Omit<ProFormFieldProps, 'fieldProps' | 'formItemProps'>
  const defaultRender = () => <ProFormField {...formFieldProps} ignoreFormItem={true} />

  const formItemRender = item?.formItemRender
    ? (_: any, config: any) => {
        const renderConfig = omitUndefined({ ...config, onChange: undefined })
        return item?.formItemRender?.(
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
          formRef.value!,
        )
      }
    : undefined
  const getField = () => {
    if (item?.formItemRender) {
      const dom = formItemRender?.(null, {})
      if (!dom || item.ignoreFormItem)
        return dom
    }
    return (
      <ProFormField
        {...formFieldProps}
        key={[item.key, item.index || 0].join('-')}
        formItemRender={formItemRender}
      />
    )
  }
  if (item.dependencies) {
    return (
      <ProFormDependency
        name={item.dependencies || []}
        key={item.key as Key}
        v-slots={{
          default: getField,
        }}
      />
    )
  }
  return getField()
}
export default field

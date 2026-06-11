import type { ProFieldValueObjectType, ProFieldValueType } from '@antdv-next/pro-utils'
import type { ItemType, ProFormColumnsType, ProFormRenderValueTypeHelpers } from '../typing'
import ProFormFieldSet from '../../FieldSet'

function formSet<T extends Record<string, any>, ValueType extends (ProFieldValueType | ProFieldValueObjectType)>(item: ItemType<T, ValueType>, { genItems }: ProFormRenderValueTypeHelpers<T, ValueType>) {
  if (item.valueType === 'formSet' && item.dataIndex) {
    if (!item.columns || !Array.isArray(item.columns))
      return null
    return (
      <ProFormFieldSet
        {...item.getFormItemProps?.()}
        key={item.key}
        initialValue={item.initialValue}
        name={item.dataIndex}
        label={item.label}
        colProps={item.colProps}
        rowProps={item.rowProps}
        {...item.getFieldProps?.()}
        v-slots={
          {
            default: () => genItems(item.columns! as ProFormColumnsType<T, ValueType>[]),
          }
        }
      />
    )
  }
  return true
}
export default formSet

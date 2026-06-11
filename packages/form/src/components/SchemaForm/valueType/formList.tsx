import type { ProFieldValueObjectType, ProFieldValueType } from '@antdv-next/pro-utils'
import type { ItemType, ProFormColumnsType, ProFormRenderValueTypeHelpers } from '../typing'
import ProFormList from '../../List'

function formList<T extends Record<string, any>, ValueType extends (ProFieldValueType | ProFieldValueObjectType)>(item: ItemType<T, ValueType>, { genItems }: ProFormRenderValueTypeHelpers<T, ValueType>) {
  if (item.valueType === 'formList' && item.dataIndex) {
    if (!item.columns || !Array.isArray(item.columns))
      return null
    return (
      <ProFormList
        {...item.getFormItemProps?.()}
        key={item.key}
        name={item.dataIndex}
        label={item.label}
        initialValue={item.initialValue}
        colProps={item.colProps}
        rowProps={item.rowProps}
        {...item.getFieldProps?.()}
        v-slots={{
          default: () => genItems(item.columns! as ProFormColumnsType<T, ValueType>[]),
        }}
      />
    )
  }

  return true
}
export default formList

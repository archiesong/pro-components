import type { ProFieldValueObjectType, ProFieldValueType } from '@antdv-next/pro-utils'
import type { ItemType, ProFormRenderValueTypeHelpers } from '../typing'
import ProFormGroup from '../../Group'

function group<T extends Record<string, any>, ValueType extends (ProFieldValueType | ProFieldValueObjectType)>(item: ItemType<T, ValueType>, { genItems }: ProFormRenderValueTypeHelpers<T, ValueType>) {
  if (item.valueType === 'group') {
    if (!item.columns || !Array.isArray(item.columns))
      return null
    const columns = item.columns
    return (
      <ProFormGroup
        key={item.key}
        title={item.title}
        colProps={item.colProps}
        rowProps={item.rowProps}
        {...item.getFieldProps?.()}
        v-slots={
          {
            default: () => genItems(columns),
          }
        }
      />
    )
  }

  return true
}
export default group

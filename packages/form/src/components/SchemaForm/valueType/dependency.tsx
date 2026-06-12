import type { ProFieldValueObjectType, ProFieldValueType } from '@antdv-next1/pro-utils'
import type { ItemType, ProFormRenderValueTypeHelpers } from '../typing'
import { noteOnce } from '@v-c/util/dist/warning'
import ProFormDependency from '../../Dependency'

function dependency<T extends Record<string, any>, ValueType extends (ProFieldValueType | ProFieldValueObjectType)>(item: ItemType<T, ValueType>, helpers: ProFormRenderValueTypeHelpers<T, ValueType>) {
  /** ProFormDependency */
  if (item?.valueType === 'dependency') {
    const fieldProps = item.getFieldProps?.()
    noteOnce(
      Array.isArray(item.name ?? fieldProps?.name),
      'SchemaForm: fieldProps.name should be NamePath[] when valueType is "dependency"',
    )
    noteOnce(
      typeof item.columns === 'function',
      'SchemaForm: columns should be a function when valueType is "dependency"',
    )
    if (!Array.isArray(item.name ?? fieldProps?.name))
      return null
    return (
      <ProFormDependency
        name={item.name}
        {...fieldProps}
        key={item.key}
        v-slots={{
          default: (opitons: { values: Record<string, any> }) => {
            if (!item.columns || typeof item.columns !== 'function')
              return null
            return helpers.genItems(item.columns(opitons.values))
          },
        }}
      />
    )
  }
  return true
}

export default dependency

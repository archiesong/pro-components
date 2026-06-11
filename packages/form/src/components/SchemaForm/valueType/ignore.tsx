import type { ProFieldValueObjectType, ProFieldValueType } from '@antdv-next/pro-utils'
import type { ItemType } from '../typing'

function ignore<T extends Record<string, any>, ValueType extends (ProFieldValueType | ProFieldValueObjectType)>(item: ItemType<T, ValueType>) {
  // 几种特殊的 value 不处理
  if (
    item.valueType
    && typeof item.valueType === 'string'
    && ['index', 'indexBorder', 'option'].includes(item?.valueType)
  ) {
    return null
  }
  return true
}
export default ignore

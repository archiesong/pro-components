import type { ProFieldValueObjectType, ProFieldValueType } from '@antdv-next1/pro-utils'
import type { ItemType } from '../typing'
import { Divider } from 'antdv-next'

function divider<T extends Record<string, any>, ValueType extends (ProFieldValueType | ProFieldValueObjectType)>(item: ItemType<T, ValueType>) {
  /** 分割线 */
  if (item.valueType === 'divider') {
    return <Divider {...item.getFieldProps?.()} key={item.key} />
  }

  return true
}
export default divider

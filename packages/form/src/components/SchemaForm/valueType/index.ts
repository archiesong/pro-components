import type { ProFieldValueObjectType, ProFieldValueType } from '@antdv-next/pro-utils'
import type { ItemType, ProFormRenderValueTypeHelpers } from '../typing'
import dependency from './dependency'
import divider from './divider'
import field from './field'
import formList from './formList'
import formSet from './formSet'
import group from './group'
import ignore from './ignore'
// 按照数组顺序执行
const tasks = [
  ignore,
  group,
  formList,
  formSet,
  divider,
  dependency,
] as const

export function renderValueType<T extends Record<string, any>, ValueType extends (ProFieldValueType | ProFieldValueObjectType)>(item: ItemType<T, ValueType>, helpers: ProFormRenderValueTypeHelpers<T, ValueType>) {
  for (let cur = 0; cur < tasks.length; cur++) {
    const task = tasks[cur]
    const dom = task?.(item, helpers)
    if (dom === true)
      continue
    if (dom === undefined)
      continue
    return dom
  }
  // 最后执行
  return field(item, helpers)
}

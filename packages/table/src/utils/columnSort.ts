import type { ColumnsState } from '../Store/Provide'
import type { ProColumns } from '../typing'

export function columnSort<T, ValueType>(columnsMap?: Record<string, ColumnsState>) {
  return (a: ProColumns<T, ValueType>, b: ProColumns<T, ValueType>) => {
    const { fixed: aFixed, index: aIndex } = a
    const { fixed: bFixed, index: bIndex } = b
    if ((aFixed === 'start' && bFixed !== 'start') || (bFixed === 'end' && aFixed !== 'end')) {
      return -2
    }
    if ((bFixed === 'start' && aFixed !== 'start') || (aFixed === 'end' && bFixed !== 'end')) {
      return 2
    }
    // 如果没有index，在 dataIndex 或者 key 不存在的时候他会报错
    const aKey = a.key || `${aIndex}`
    const bKey = b.key || `${bIndex}`
    if (columnsMap) {
      if (columnsMap[aKey]?.order || columnsMap[bKey]?.order) {
        return (columnsMap[aKey]?.order || 0) - (columnsMap[bKey]?.order || 0)
      }
    }

    return (a.index || 0) - (b.index || 0)
  }
}

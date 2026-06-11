import type { ComputedRef } from 'vue'
import type { Group, Key } from '../interface'
import type { GroupSegment } from './useGroupSegments'
import { computed } from 'vue'

export type Row<T, K extends Key = Key> = { type: 'header', groupKey: K } | { type: 'item', item: T, index: number }

export interface FlattenRowsResult<T, K extends Key = Key> {
  rows: Row<T, K>[]
  headerRows: { groupKey: K, rowIndex: number }[]
  groupKeyToSeg: Map<K, { startIndex: number, endIndex: number }>
}

export function useFlattenRows<T, K extends Key = Key>(items: ComputedRef<T[]>, group: ComputedRef<Group<T, K> | undefined>, segments: ComputedRef<GroupSegment<K>[]>): ComputedRef<FlattenRowsResult<T, K>> {
  return computed(() => {
    const flatRows: Row<T, K>[] = []
    const headerRows: { groupKey: K, rowIndex: number }[] = []
    const groupKeyToSeg = new Map<K, { startIndex: number, endIndex: number }>()
    if (!group || !segments.value.length) {
      for (let i = 0; i < items.value.length; i += 1) {
        flatRows.push({ type: 'item', item: items.value[i]!, index: i })
      }
      return { rows: flatRows, headerRows, groupKeyToSeg }
    }
    for (let s = 0; s < segments.value.length; s += 1) {
      const seg = segments.value[s]
      groupKeyToSeg.set(seg!.key, {
        startIndex: seg!.startIndex,
        endIndex: seg!.endIndex,
      })

      headerRows.push({ groupKey: seg!.key, rowIndex: flatRows.length })
      flatRows.push({ type: 'header', groupKey: seg!.key })

      for (let i = seg!.startIndex; i <= seg!.endIndex; i += 1) {
        flatRows.push({ type: 'item', item: items.value[i]!, index: i })
      }
    }

    return { rows: flatRows, headerRows, groupKeyToSeg }
  })
}

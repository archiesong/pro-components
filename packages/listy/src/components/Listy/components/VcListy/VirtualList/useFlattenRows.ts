import type { Key } from '@v-c/util/dist/type'
import type { ComputedRef } from 'vue'
import type { Group, GroupSegmentItem } from '../hooks/useGroupSegments'
import { computed } from 'vue'

export type Row<T, K extends Key = Key> = { type: 'header', groupKey: K } | { type: 'item', item: T, index: number }

export interface FlattenRowsResult<T, K extends Key = Key> {
  rows: Row<T, K>[]
  headerRows: { groupKey: K, rowIndex: number }[]
  groupKeyToItems: Map<K, T[]>
}
// { startIndex: number, endIndex: number }

export function useFlattenRows<T, K extends Key = Key>(data: T[], groupData: ComputedRef<Map<K, GroupSegmentItem<T>[]>>, group?: Group<T, K>): ComputedRef<FlattenRowsResult<T, K>> {
  return computed(() => {
    // ============================== Init ================================
    const flatRows: Row<T, K>[] = []
    const headerRows: { groupKey: K, rowIndex: number }[] = []
    const groupKeyToItems = new Map<K, T[]>()

    // ============================ No Group ==============================
    if (!group) {
      data.forEach((item, index) => {
        flatRows.push({ type: 'item', item, index })
      })

      return { rows: flatRows, headerRows, groupKeyToItems }
    }

    // ============================= Flatten ==============================
    groupData.value.forEach((groupItems, groupKey) => {
      groupKeyToItems.set(
        groupKey,
        groupItems.map(({ item }) => item),
      )

      headerRows.push({ groupKey, rowIndex: flatRows.length })
      flatRows.push({ type: 'header', groupKey })

      groupItems.forEach(({ item, index }) => {
        flatRows.push({ type: 'item', item, index })
      })
    })

    // ============================== Return ==============================
    return { rows: flatRows, headerRows, groupKeyToItems }
  })
}

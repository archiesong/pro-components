import type { ComputedRef } from 'vue'
import type { Group, Key } from '../interface'
import { computed } from 'vue'

export interface GroupSegment<K extends Key> {
  key: K
  startIndex: number
  endIndex: number
}

/**
 * segments representing consecutive runs of items that share the same group key.
 */
export function useGroupSegments<T, K extends Key = Key>(items: ComputedRef<T[]>, group: ComputedRef<Group<T, K> | undefined>): ComputedRef<GroupSegment<K>[]> {
  return computed(() => {
    if (!group?.value || !items.value?.length) {
      return []
    }
    const segments: GroupSegment<K>[] = []
    let currentKey: K | null = null
    let currentStart = -1
    const getGroupKey = (item: T): K => (typeof group.value?.key === 'function' ? group.value.key(item) : group.value?.key!)

    for (let i = 0; i < items.value.length; i += 1) {
      const gk = getGroupKey(items.value[i]!)
      if (currentKey === null) {
        currentKey = gk
        currentStart = i
      }
      else if (gk !== currentKey) {
        segments.push({
          key: currentKey,
          startIndex: currentStart,
          endIndex: i - 1,
        })
        currentKey = gk
        currentStart = i
      }
    }
    if (currentKey !== null) {
      segments.push({
        key: currentKey,
        startIndex: currentStart,
        endIndex: items.value.length - 1,
      })
    }

    return segments
  })
}

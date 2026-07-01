import type { ListRef } from '@v-c/virtual-list'
import type { ExtraRenderInfo } from '@v-c/virtual-list/dist/interface.js'
import type { VNode } from 'vue'
import type { Group, Key } from '../interface'
import GroupHeader from '../GroupHeader'

interface HeaderRow<K extends Key> { groupKey: K, rowIndex: number }

// ============================== Utils ===============================
// `headerRows` is sorted by rowIndex. Find the last header not after `start`.
function findActiveHeaderIndex<K extends Key>(
  headerRows: HeaderRow<K>[],
  start: number,
) {
  let left = 0
  let right = headerRows.length - 1
  let activeIndex = 0

  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    if (headerRows[mid]!.rowIndex <= start) {
      activeIndex = mid
      left = mid + 1
    }
    else {
      right = mid - 1
    }
  }

  return activeIndex
}

export interface StickyHeaderParams<T, K extends Key = Key> {
  enabled: boolean
  group: Group<T, K> | undefined
  headerRows: { groupKey: K, rowIndex: number }[]
  groupKeyToItems: Map<K, T[]>
  listRef: ListRef | null
  prefixCls?: string
}
function getHolderScrollTop(options: {
  prefixCls?: string
  listRef: ListRef | null
}) {
  const holder = options.listRef?.nativeElement?.querySelector?.(`.${options.prefixCls}-holder`)
  if (holder) {
    return holder.scrollTop
  }
  const infoScrollTop = options.listRef?.getScrollInfo().y
  return infoScrollTop
}
export function useStickyGroupHeader<T, K extends Key = Key>(params: StickyHeaderParams<T, K>) {
  return (info: ExtraRenderInfo): VNode => {
    // ============================== Props ==============================
    const {
      enabled,
      group,
      headerRows,
      groupKeyToItems,
      prefixCls,
      listRef,
    } = params
    const scrollTop = getHolderScrollTop({
      listRef,
      prefixCls,
    })
    const { getSize, offsetY, start, virtual } = info

    if (!enabled || !group || !headerRows.length || !virtual) {
      return null as unknown as VNode
    }

    // The sticky header is the latest group header before the visible range.
    const activeHeaderIdx = findActiveHeaderIndex(headerRows, start)
    const currHeader = headerRows[activeHeaderIdx]

    const groupItems = groupKeyToItems.get(currHeader?.groupKey!) || []
    const currentSize = getSize(currHeader?.groupKey!)
    const headerHeight = currentSize.bottom - currentSize.top

    // Convert the virtual list scroll position into the overlay top offset.
    const fixedTop = (scrollTop || 0) - offsetY

    // Let the next group header push the current fixed header away.
    const nextHeader = headerRows[activeHeaderIdx + 1]
    const nextTop = nextHeader
      ? getSize(nextHeader.groupKey).top - headerHeight - offsetY
      : fixedTop
    const top = Math.min(fixedTop, nextTop)
    // Render a cloned header above the virtual list items.
    return (
      <GroupHeader
        fixed
        group={group}
        groupKey={currHeader?.groupKey}
        groupItems={groupItems}
        prefixCls={prefixCls}
        style={{ top: `${top}px` }}
      />
    )
  }
}

import type { VueNode } from '@v-c/util'
import type { DefineSetupFnComponent } from 'vue'

export interface Group<T, K extends Key = Key> {
  key: ((item: T) => K)
  title: (options: { name: K, items: T[] }) => VueNode
}
export type RowKey<T> = keyof T | ((item: T) => Key)

export type ScrollAlign = 'top' | 'bottom' | 'auto'

export interface GroupScrollToConfig {
  groupKey: Key
  align?: ScrollAlign
  offset?: ScrollOffset
}

export type GetSize = (startKey: Key, endKey?: Key) => {
  top: number
  bottom: number
}

export interface ScrollOffsetInfo {
  /**
   * Get item size range by key.
   * 通过 key 获取元素在虚拟列表中的尺寸范围。
   */
  getSize: GetSize
}

export type ScrollOffset = number | ((info: ScrollOffsetInfo) => number)

export interface KeyScrollToConfig {
  key: Key
  align?: ScrollAlign
  offset?: ScrollOffset
}

export interface PositionScrollToConfig {
  left?: number
  top?: number
}

export type ListyScrollToConfig
  = | number
    | null
    | KeyScrollToConfig
    | PositionScrollToConfig
    | GroupScrollToConfig

export interface ListyRef {
  scrollTo: (config?: ListyScrollToConfig) => void
}

export interface PositionScrollToConfig {
  left?: number
  top?: number
}

export interface ListComponentProps<T, K extends Key = Key> {
  data?: T[]
  sticky?: boolean
  itemHeight?: number
  height?: number
  group?: Group<T, K>
  prefixCls?: string
  component?: DefineSetupFnComponent<any> | string
  rowKey?: RowKey<T>
  onScroll?: (e: Event) => void
  itemRender?: (item: T, index: number) => VueNode
}

export type ListyProps<T, K extends Key = Key> = Omit<ListComponentProps<T, K>, 'data'> & {
  items?: T[]
  virtual?: boolean
}

export type Key = string | number

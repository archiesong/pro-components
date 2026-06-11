import type { ScrollTo } from '@v-c/virtual-list'
import type { GetKey } from '@v-c/virtual-list/dist/interface.js'
import type { SemanticClassNamesType, SemanticStylesType } from 'antdv-next/dist/_util/hooks/index'
import type { VueNode } from 'antdv-next/dist/_util/type'
import type { CSSProperties } from 'vue'

export interface Group<T, K extends Key = Key> {
  key: ((item: T) => K) | K
  title: (options: { name: K, items: T[] }) => VueNode
}
export type RowKey<T> = keyof T | ((item: T) => Key)

export type ScrollAlign = 'top' | 'bottom' | 'auto'

export interface ListyExpose {
  scrollTo: (config?: ListyScrollToConfig) => void
}

export type ListyScrollToConfig
  = | Parameters<ScrollTo>[0]
    | {
      groupKey: string
      align?: ScrollAlign
      offset?: number
    }

export interface ListyProps<T, K extends Key = Key> {
  styles?: ListyStylesType
  classes?: ListyClassNamesType
  items: T[]
  sticky?: boolean
  itemHeight?: number
  height?: number
  group?: Group<T, K>
  virtual?: boolean
  prefixCls?: string
  class?: string
  style?: CSSProperties
  rowKey: RowKey<T>
  onEndReached?: () => void
  itemRender?: (options: { item: T, index: number }) => VueNode
}

export type { GetKey, VueNode }

export type ListySemanticName = keyof ListySemanticClassNames & keyof ListySemanticStyles
export type Key = string | number
export interface ListySemanticClassNames {
  root?: string
  container?: string
  arrow?: string
}

export interface ListySemanticStyles {
  root?: CSSProperties
  container?: CSSProperties
  arrow?: CSSProperties
}
export type ListyClassNamesType = SemanticClassNamesType<ListyProps<Record<string, any>, Key>, ListySemanticClassNames>

export type ListyStylesType = SemanticStylesType<ListyProps<Record<string, any>, Key>, ListySemanticStyles>

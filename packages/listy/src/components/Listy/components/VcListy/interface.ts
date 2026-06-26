import type { VueNode } from '@v-c/util'
import type { AnyObject } from '@v-c/util/dist/type'
import type { ScrollConfig } from '@v-c/virtual-list'
import type { GetKey } from '@v-c/virtual-list/dist/interface.js'
import type { CSSProperties } from 'vue'

type EmptyObject = Record<never, never>
type Resolvable<T, P extends AnyObject> = T | ((info: {
  props: P
}) => T)
type SemanticClassNamesType<Props extends AnyObject, SemanticClassNames extends { [K in keyof SemanticClassNames]?: string }, NestedStructure extends EmptyObject = EmptyObject> = Resolvable<Readonly<SemanticClassNames>, Props> & NestedStructure
type SemanticStylesType<Props extends AnyObject, SemanticStyles extends { [K in keyof SemanticStyles]?: CSSProperties }, NestedStructure extends EmptyObject = EmptyObject> = Resolvable<Readonly<SemanticStyles>, Props> & NestedStructure

// type Breakpoint = 'xxxl' | 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs'

export interface Group<T, K extends Key = Key> {
  key: ((item: T) => K)
  title: (options: { name: K, items: T[] }) => VueNode
}
// type Gutter = number | undefined | Partial<Record<Breakpoint, number>>
export type RowKey<T> = keyof T | ((item: T) => Key)

export type ScrollAlign = 'top' | 'bottom' | 'auto'

export interface ListyRef {
  scrollTo: (config?: number | ScrollConfig & { groupKey?: Key } | null) => void
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
  rowKey?: RowKey<T>
  onScroll?: (e: Event) => void
  itemRender?: (item: T, index: number) => VueNode
}

export interface ListyProps<T, K extends Key = Key>/* @vue-ignore */ extends Omit<ListComponentProps<T, K>, 'data'> {
  // styles?: ListyStylesType
  // classes?: ListyClassNamesType
  items?: T[]
  virtual?: boolean
  // onEndReached?: () => void
}

export type { GetKey }

export interface ListySemanticClassNames {
  root?: string
  container?: string
  arrow?: string
}

export type ListySemanticName = keyof ListySemanticClassNames & keyof ListySemanticStyles
export type Key = string | number

export interface ListySemanticStyles {
  root?: CSSProperties
  container?: CSSProperties
  arrow?: CSSProperties
}
export type ListyClassNamesType = SemanticClassNamesType<ListyProps<Record<string, any>, Key>, ListySemanticClassNames>

export type ListyStylesType = SemanticStylesType<ListyProps<Record<string, any>, Key>, ListySemanticStyles>

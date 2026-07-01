import type { Key, VueNode } from '@v-c/util/dist/type'
import type { PaginationConfig, RowProps, SizeType, SpinProps } from 'antdv-next'
import type { Breakpoint } from 'antdv-next/dist/_util/responsiveObserver'
import type { ListyRef, ListyProps as VcListyProps } from './components/VcListy'

export type ColumnCount = number

export type ColumnType = 'gutter' | 'column' | 'span' | Breakpoint

export type ListyItemLayout = 'horizontal' | 'vertical'

export interface ListyGridType {
  gutter?: RowProps['gutter']
  column?: ColumnCount
  xs?: ColumnCount
  sm?: ColumnCount
  md?: ColumnCount
  lg?: ColumnCount
  xl?: ColumnCount
  xxl?: ColumnCount
  xxxl?: ColumnCount
}
export interface ListyLocale {
  emptyText: VueNode
}
export type ListyProps<T, K extends Key = Key> = VcListyProps<T, K> & {
  split?: boolean
  size?: SizeType
  id?: string
  rootClass?: string
  variant?: 'borderless' | 'outlined'
  bordered?: boolean
  loading?: boolean | SpinProps
  loadMore?: VueNode
  pagination?: false | PaginationConfig
  grid?: ListyGridType
  itemLayout?: ListyItemLayout
  locale?: ListyLocale
}

export type { ListyRef }

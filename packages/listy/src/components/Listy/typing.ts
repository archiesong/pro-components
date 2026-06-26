import type { Key } from '@v-c/util/dist/type'
import type { RowProps, SizeType, SpinProps, TablePaginationConfig } from 'antdv-next'
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

export interface ListyProps<T, K extends Key = Key> extends VcListyProps<T, K> {
  split?: boolean
  size?: SizeType
  id?: string
  rootClass?: string
  variant?: 'borderless' | 'outlined'
  bordered?: boolean
  loading?: boolean | SpinProps
  pagination?: false | TablePaginationConfig
  grid?: ListyGridType
  itemLayout?: ListyItemLayout
}

export type { ListyRef }

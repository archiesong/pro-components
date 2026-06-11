import type { Key, VueNode } from '@v-c/util/dist/type'
import type { PaginationConfig, RowProps, SpinProps } from 'antdv-next'
import type { Group, ListyProps } from './components/Listy/interface'

export type ColumnCount = number

export type ColumnType = 'gutter' | 'column' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'

export interface ProListyGridType {
  gutter?: RowProps['gutter']
  column?: ColumnCount
  xs?: ColumnCount
  sm?: ColumnCount
  md?: ColumnCount
  lg?: ColumnCount
  xl?: ColumnCount
  xxl?: ColumnCount
}
export type ListySize = 'small' | 'default' | 'large'

export type ListyItemLayout = 'horizontal' | 'vertical'
// export type RowKey<T> = keyof T | ((item: T) => Key)
//
export interface ProListyProps<T, K extends Key = Key> extends ListyProps<T, K> {
  split?: boolean
  loading?: boolean & SpinProps
  variant?: 'outlined' | 'borderless' | 'filled'
  groupBy?: Group<T, K>['key']
  grid?: ProListyGridType
  size?: ListySize
  itemLayout?: ListyItemLayout
  groupRender?: Group<T, K>['title']
  header?: VueNode
  footer?: VueNode
  emptyRender?: () => VueNode
  pagination?: false | PaginationConfig
}

export interface ListyEmits {}

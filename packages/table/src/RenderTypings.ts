import type { IntlType } from '@antdv-next1/pro-provider'
import type { Key, WithFalse } from '@antdv-next1/pro-utils'
import type { VueNode } from '@v-c/util'
import type { ToolBarProps } from './components/ToolBar'
import type { ActionType, ProTableProps } from './typing'

export type ErrorBoundaryRender = WithFalse<(options: { error: Error, info: string }) => VueNode>

// export type tableViewRender = (props: TableProps<any>, defaultDom: VueNode) => VueNode;

export type TableAlertRender<T> = WithFalse<
  (props: {
    intl: IntlType
    selectedRowKeys: (number | string | Key)[]
    selectedRows: T[]
    onCleanSelected: () => void
  }) => VueNode
>

export type TableRender<T, U, K> = WithFalse<
  (
    props: ProTableProps<T, U, K>,
    defaultDom: VueNode,
    /** 各个区域的 dom */
    domList: {
      toolbar?: VueNode
      alert?: VueNode
      table?: VueNode
    },
  ) => VueNode
>

export type SearchFormRender<T, U, K> = (props: ProTableProps<T, U, K>, defaultDom: VueNode) => VueNode

export type OptionsRender<T, U> = (props: ToolBarProps<T, U>, defaultDom: VueNode[]) => VueNode[]

export type TableExtraRender<T, U, K> = (props: ProTableProps<T, U, K>, dataSource: any[]) => VueNode

export type ToolBarRender<T> = (
  action: ActionType<any, T> | undefined,
  rows: {
    selectedRowKeys?: Key[]
    selectedRows: (T | undefined)[]
  },
) => VueNode[]

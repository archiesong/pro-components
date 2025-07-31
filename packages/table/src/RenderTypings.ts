import type { Key, VueNode } from 'ant-design-vue/es/_util/type';
import type { WithFalse } from './typing';
import type { ProTableProps } from './proTableProps';
import type { IntlType } from '@ant-design-vue/pro-provider';
import { ToolBarProps } from './components/ToolBar';

export type ErrorBoundaryRender = WithFalse<(error: Error, info: string) => VueNode>;

export type TableRender = WithFalse<
  (
    props: ProTableProps,
    defaultDom: VueNode,
    /** 各个区域的 dom */
    domList: {
      toolbar: VueNode | undefined;
      alert: VueNode | undefined;
      table: VueNode | undefined;
    }
  ) => VueNode
>;

export type AlertRender = WithFalse<
  (props: {
    intl: IntlType;
    selectedRowKeys: (number | string | Key)[];
    selectedRows: any[];
    onCleanSelected: () => void;
  }) => VueNode
>;

export type SearchFormRender = (props: ProTableProps, defaultDom: VueNode) => VueNode;

export type OptionsRender = (props: ToolBarProps, defaultDom: VueNode[]) => VueNode[];

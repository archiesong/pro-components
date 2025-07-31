import { ExtractPropTypes, PropType } from 'vue';
import { TableProps } from 'ant-design-vue';
import { SortOrder } from 'ant-design-vue/es/table/interface';
import { ProSchemaComponentTypes, RowEditableConfig } from '@ant-design-vue/pro-utils';
import { ProColumns, RequestData, WithFalse } from './typing';
import { ErrorBoundaryRender } from './RenderTypings';
import { OptionConfig } from './components/ToolBar';
import { SearchConfig } from './components/Form/FormRender';
export declare const proTableProps: () => {
    /**
     * @description 列配置能力，支持一个数组
     */
    columns: {
        type: PropType<ProColumns<Record<string, any>, "text">[]>;
        default: undefined;
    };
    /**
     * request 的参数，修改之后会触发更新
     *
     * @example pathname 修改重新触发 request
     * params={{ pathName }}
     */
    params: {
        type: PropType<Record<string, any>>;
        default: undefined;
    };
    /** @description 一个获得 dataSource 的方法 */
    request: {
        type: PropType<(params: Record<string, any> & {
            pageSize?: number;
            current?: number;
            keyword?: string;
        }, sort: Record<string, SortOrder>, filter: Record<string, (string | number)[] | null>) => Promise<Partial<RequestData<any>>>>;
        default: undefined;
    };
    /**
     * @description 编辑行相关的配置
     *
     * @example 支持多行编辑
     * editable={{type:"multiple"}}
     *
     * @example 保存的时候请求后端
     * editable={{ onSave:async (rows)=>{ await save(rows) } }}
     */
    editable: {
        type: PropType<RowEditableConfig<any>>;
        default: undefined;
    };
    /** @description 操作栏配置 */
    options: {
        type: PropType<WithFalse<OptionConfig>>;
        default: undefined;
    };
    /**@description 支持 ProTable 的类型 */
    type: {
        type: PropType<ProSchemaComponentTypes>;
        default: undefined;
    };
    /**
     * @type SearchConfig
     * @description 是否显示搜索表单
     */
    search: {
        type: PropType<WithFalse<SearchConfig>>;
        default: undefined;
    };
    /** @description 是否手动触发请求 */
    manualRequest: {
        type: PropType<boolean>;
        default: undefined;
    };
    /** @description 选择项配置 */
    rowSelection: {
        type: PropType<WithFalse<TableProps<any>["rowSelection"] & {
            alwaysShowAlert?: boolean;
        }>>;
    };
    /**
     *@description 错误边界自定义
     */
    errorBoundaryRender: {
        type: PropType<ErrorBoundaryRender>;
        default: undefined;
    };
    title: {
        type: PropType<import('ant-design-vue/es/vc-table/interface').PanelRender<any>>;
        default: import('ant-design-vue/es/vc-table/interface').PanelRender<any>;
    };
    sortDirections: {
        type: PropType<SortOrder[]>;
        default: SortOrder[];
    };
    showSorterTooltip: {
        type: PropType<boolean | Partial<ExtractPropTypes<{
            title: import('vue-types').VueTypeValidableDef<any>;
            trigger: PropType<import('ant-design-vue/es/tooltip/abstractTooltipProps').TriggerType | import('ant-design-vue/es/tooltip/abstractTooltipProps').TriggerType[]>;
            open: {
                type: BooleanConstructor;
                default: any;
            };
            visible: {
                type: BooleanConstructor;
                default: any;
            };
            placement: PropType<import('ant-design-vue/es/tooltip').TooltipPlacement>;
            color: PropType<import('ant-design-vue/es/_util/type').LiteralUnion<import('ant-design-vue/es/_util/colors').PresetColorType>>;
            transitionName: StringConstructor;
            overlayStyle: {
                type: PropType<import('vue').CSSProperties>;
                default: import('vue').CSSProperties;
            };
            overlayInnerStyle: {
                type: PropType<import('vue').CSSProperties>;
                default: import('vue').CSSProperties;
            };
            overlayClassName: StringConstructor;
            openClassName: StringConstructor;
            prefixCls: StringConstructor;
            mouseEnterDelay: NumberConstructor;
            mouseLeaveDelay: NumberConstructor;
            getPopupContainer: PropType<(triggerNode: HTMLElement) => HTMLElement>;
            arrowPointAtCenter: {
                type: BooleanConstructor;
                default: any;
            };
            arrow: {
                type: PropType<boolean | {
                    pointAtCenter?: boolean;
                }>;
                default: boolean | {
                    pointAtCenter?: boolean;
                };
            };
            autoAdjustOverflow: {
                type: PropType<boolean | import('ant-design-vue/es/tooltip').AdjustOverflow>;
                default: boolean | import('ant-design-vue/es/tooltip').AdjustOverflow;
            };
            destroyTooltipOnHide: {
                type: BooleanConstructor;
                default: any;
            };
            align: {
                type: PropType<import('ant-design-vue/es/vc-trigger/interface').AlignType>;
                default: import('ant-design-vue/es/vc-trigger/interface').AlignType;
            };
            builtinPlacements: {
                type: PropType<import('ant-design-vue/es/vc-trigger/interface').BuildInPlacements>;
                default: import('ant-design-vue/es/vc-trigger/interface').BuildInPlacements;
            };
            children: ArrayConstructor;
            onVisibleChange: PropType<(vis: boolean) => void>;
            'onUpdate:visible': PropType<(vis: boolean) => void>;
            onOpenChange: PropType<(vis: boolean) => void>;
            'onUpdate:open': PropType<(vis: boolean) => void>;
        }>>>;
        default: boolean | Partial<ExtractPropTypes<{
            title: import('vue-types').VueTypeValidableDef<any>;
            trigger: PropType<import('ant-design-vue/es/tooltip/abstractTooltipProps').TriggerType | import('ant-design-vue/es/tooltip/abstractTooltipProps').TriggerType[]>;
            open: {
                type: BooleanConstructor;
                default: any;
            };
            visible: {
                type: BooleanConstructor;
                default: any;
            };
            placement: PropType<import('ant-design-vue/es/tooltip').TooltipPlacement>;
            color: PropType<import('ant-design-vue/es/_util/type').LiteralUnion<import('ant-design-vue/es/_util/colors').PresetColorType>>;
            transitionName: StringConstructor;
            overlayStyle: {
                type: PropType<import('vue').CSSProperties>;
                default: import('vue').CSSProperties;
            };
            overlayInnerStyle: {
                type: PropType<import('vue').CSSProperties>;
                default: import('vue').CSSProperties;
            };
            overlayClassName: StringConstructor;
            openClassName: StringConstructor;
            prefixCls: StringConstructor;
            mouseEnterDelay: NumberConstructor;
            mouseLeaveDelay: NumberConstructor;
            getPopupContainer: PropType<(triggerNode: HTMLElement) => HTMLElement>;
            arrowPointAtCenter: {
                type: BooleanConstructor;
                default: any;
            };
            arrow: {
                type: PropType<boolean | {
                    pointAtCenter?: boolean;
                }>;
                default: boolean | {
                    pointAtCenter?: boolean;
                };
            };
            autoAdjustOverflow: {
                type: PropType<boolean | import('ant-design-vue/es/tooltip').AdjustOverflow>;
                default: boolean | import('ant-design-vue/es/tooltip').AdjustOverflow;
            };
            destroyTooltipOnHide: {
                type: BooleanConstructor;
                default: any;
            };
            align: {
                type: PropType<import('ant-design-vue/es/vc-trigger/interface').AlignType>;
                default: import('ant-design-vue/es/vc-trigger/interface').AlignType;
            };
            builtinPlacements: {
                type: PropType<import('ant-design-vue/es/vc-trigger/interface').BuildInPlacements>;
                default: import('ant-design-vue/es/vc-trigger/interface').BuildInPlacements;
            };
            children: ArrayConstructor;
            onVisibleChange: PropType<(vis: boolean) => void>;
            'onUpdate:visible': PropType<(vis: boolean) => void>;
            onOpenChange: PropType<(vis: boolean) => void>;
            'onUpdate:open': PropType<(vis: boolean) => void>;
        }>>;
    };
    prefixCls: {
        type: PropType<string>;
        default: string;
    };
    rowKey: {
        type: PropType<string | import('ant-design-vue/es/vc-table/interface').GetRowKey<any>>;
        default: string | import('ant-design-vue/es/vc-table/interface').GetRowKey<any>;
    };
    tableLayout: {
        type: PropType<import('ant-design-vue/es/vc-table/interface').TableLayout>;
        default: import('ant-design-vue/es/vc-table/interface').TableLayout;
    };
    rowClassName: {
        type: PropType<string | import('ant-design-vue/es/vc-table/interface').RowClassName<any>>;
        default: string | import('ant-design-vue/es/vc-table/interface').RowClassName<any>;
    };
    footer: {
        type: PropType<import('ant-design-vue/es/vc-table/interface').PanelRender<any>>;
        default: import('ant-design-vue/es/vc-table/interface').PanelRender<any>;
    };
    id: {
        type: PropType<string>;
        default: string;
    };
    showHeader: {
        type: BooleanConstructor;
        default: boolean;
    };
    components: {
        type: PropType<import('ant-design-vue/es/vc-table/interface').TableComponents<any>>;
        default: import('ant-design-vue/es/vc-table/interface').TableComponents<any>;
    };
    customRow: {
        type: PropType<import('ant-design-vue/es/vc-table/interface').GetComponentProps<any>>;
        default: import('ant-design-vue/es/vc-table/interface').GetComponentProps<any>;
    };
    customHeaderRow: {
        type: PropType<import('ant-design-vue/es/vc-table/interface').GetComponentProps<import('ant-design-vue/es/vc-table/interface').ColumnType<any>[]>>;
        default: import('ant-design-vue/es/vc-table/interface').GetComponentProps<import('ant-design-vue/es/vc-table/interface').ColumnType<any>[]>;
    };
    direction: {
        type: PropType<"rtl" | "ltr">;
        default: "rtl" | "ltr";
    };
    expandFixed: {
        type: PropType<boolean | "left" | "right">;
        default: boolean | "left" | "right";
    };
    expandColumnWidth: NumberConstructor;
    expandedRowKeys: {
        type: PropType<import('ant-design-vue/es/vc-table/interface').Key[]>;
        default: import('ant-design-vue/es/vc-table/interface').Key[];
    };
    defaultExpandedRowKeys: {
        type: PropType<import('ant-design-vue/es/vc-table/interface').Key[]>;
        default: import('ant-design-vue/es/vc-table/interface').Key[];
    };
    expandedRowRender: {
        type: PropType<import('ant-design-vue/es/vc-table/interface').ExpandedRowRender<any>>;
        default: import('ant-design-vue/es/vc-table/interface').ExpandedRowRender<any>;
    };
    expandRowByClick: {
        type: BooleanConstructor;
        default: boolean;
    };
    expandIcon: {
        type: PropType<import('ant-design-vue/es/vc-table/interface').RenderExpandIcon<any>>;
        default: import('ant-design-vue/es/vc-table/interface').RenderExpandIcon<any>;
    };
    onExpand: {
        type: PropType<(expanded: boolean, record: any) => void>;
        default: (expanded: boolean, record: any) => void;
    };
    onExpandedRowsChange: {
        type: PropType<(expandedKeys: import('ant-design-vue/es/vc-table/interface').Key[]) => void>;
        default: (expandedKeys: import('ant-design-vue/es/vc-table/interface').Key[]) => void;
    };
    'onUpdate:expandedRowKeys': {
        type: PropType<(expandedKeys: import('ant-design-vue/es/vc-table/interface').Key[]) => void>;
        default: (expandedKeys: import('ant-design-vue/es/vc-table/interface').Key[]) => void;
    };
    defaultExpandAllRows: {
        type: BooleanConstructor;
        default: boolean;
    };
    indentSize: NumberConstructor;
    expandIconColumnIndex: NumberConstructor;
    showExpandColumn: {
        type: BooleanConstructor;
        default: boolean;
    };
    expandedRowClassName: {
        type: PropType<import('ant-design-vue/es/vc-table/interface').RowClassName<any>>;
        default: import('ant-design-vue/es/vc-table/interface').RowClassName<any>;
    };
    childrenColumnName: {
        type: PropType<string>;
        default: string;
    };
    rowExpandable: {
        type: PropType<(record: any) => boolean>;
        default: (record: any) => boolean;
    };
    sticky: {
        type: PropType<boolean | import('ant-design-vue/es/vc-table/interface').TableSticky>;
        default: boolean | import('ant-design-vue/es/vc-table/interface').TableSticky;
    };
    dropdownPrefixCls: StringConstructor;
    dataSource: {
        type: PropType<any[]>;
        default: any[];
    };
    pagination: {
        type: PropType<false | import('ant-design-vue').TablePaginationConfig>;
        default: false | import('ant-design-vue').TablePaginationConfig;
    };
    loading: {
        type: PropType<boolean | Partial<ExtractPropTypes<{
            prefixCls: StringConstructor;
            spinning: {
                type: BooleanConstructor;
                default: any;
            };
            size: PropType<import('ant-design-vue/es/spin/Spin').SpinSize>;
            wrapperClassName: StringConstructor;
            tip: import('vue-types').VueTypeValidableDef<any>;
            delay: NumberConstructor;
            indicator: import('vue-types').VueTypeValidableDef<any>;
        }>>>;
        default: boolean | Partial<ExtractPropTypes<{
            prefixCls: StringConstructor;
            spinning: {
                type: BooleanConstructor;
                default: any;
            };
            size: PropType<import('ant-design-vue/es/spin/Spin').SpinSize>;
            wrapperClassName: StringConstructor;
            tip: import('vue-types').VueTypeValidableDef<any>;
            delay: NumberConstructor;
            indicator: import('vue-types').VueTypeValidableDef<any>;
        }>>;
    };
    size: {
        type: PropType<import('ant-design-vue/es/button').ButtonSize>;
        default: import('ant-design-vue/es/button').ButtonSize;
    };
    bordered: {
        type: BooleanConstructor;
        default: boolean;
    };
    locale: {
        type: PropType<import('ant-design-vue/es/table/interface').TableLocale>;
        default: import('ant-design-vue/es/table/interface').TableLocale;
    };
    onChange: {
        type: PropType<(pagination: import('ant-design-vue').TablePaginationConfig, filters: Record<string, import('ant-design-vue/es/table/interface').FilterValue | null>, sorter: import('ant-design-vue/es/table/interface').SorterResult | import('ant-design-vue/es/table/interface').SorterResult[], extra: import('ant-design-vue/es/table/interface').TableCurrentDataSource) => void>;
        default: (pagination: import('ant-design-vue').TablePaginationConfig, filters: Record<string, import('ant-design-vue/es/table/interface').FilterValue | null>, sorter: import('ant-design-vue/es/table/interface').SorterResult | import('ant-design-vue/es/table/interface').SorterResult[], extra: import('ant-design-vue/es/table/interface').TableCurrentDataSource) => void;
    };
    onResizeColumn: {
        type: PropType<(w: number, col: import('ant-design-vue').TableColumnType) => void>;
        default: (w: number, col: import('ant-design-vue').TableColumnType) => void;
    };
    getPopupContainer: {
        type: PropType<import('ant-design-vue/es/table/interface').GetPopupContainer>;
        default: import('ant-design-vue/es/table/interface').GetPopupContainer;
    };
    scroll: {
        type: PropType<{
            x?: string | number | true;
            y?: string | number;
        } & {
            scrollToFirstRowOnChange?: boolean;
        }>;
        default: {
            x?: string | number | true;
            y?: string | number;
        } & {
            scrollToFirstRowOnChange?: boolean;
        };
    };
    transformCellText: {
        type: PropType<import('ant-design-vue/es/vc-table/interface').TransformCellText<any>>;
        default: import('ant-design-vue/es/vc-table/interface').TransformCellText<any>;
    };
};
/** ProTable 的类型定义 继承自 antd 的 Table */
export type ProTableProps = Partial<ExtractPropTypes<ReturnType<typeof proTableProps>>>;

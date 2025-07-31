declare const TableRender: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    columns: {
        type: import('vue').PropType<import('./typing').ProColumns<Record<string, any>, "text">[]>;
        default: undefined;
    };
    params: {
        type: import('vue').PropType<Record<string, any>>;
        default: undefined;
    };
    request: {
        type: import('vue').PropType<(params: Record<string, any> & {
            pageSize?: number;
            current?: number;
            keyword?: string;
        }, sort: Record<string, import('ant-design-vue/lib/table/interface').SortOrder>, filter: Record<string, (string | number)[] | null>) => Promise<Partial<import('./typing').RequestData<any>>>>;
        default: undefined;
    };
    editable: {
        type: import('vue').PropType<import('@ant-design-vue/pro-utils').RowEditableConfig<any>>;
        default: undefined;
    };
    options: {
        type: import('vue').PropType<import('./typing').WithFalse<import('./components/ToolBar').OptionConfig>>;
        default: undefined;
    };
    type: {
        type: import('vue').PropType<import('@ant-design-vue/pro-utils').ProSchemaComponentTypes>;
        default: undefined;
    };
    search: {
        type: import('vue').PropType<import('./typing').WithFalse<import('./components/Form/FormRender').SearchConfig>>;
        default: undefined;
    };
    manualRequest: {
        type: import('vue').PropType<boolean>;
        default: undefined;
    };
    rowSelection: {
        type: import('vue').PropType<import('./typing').WithFalse<import('ant-design-vue').TableProps<any>["rowSelection"] & {
            alwaysShowAlert?: boolean;
        }>>;
    };
    errorBoundaryRender: {
        type: import('vue').PropType<import('./RenderTypings').ErrorBoundaryRender>;
        default: undefined;
    };
    title: {
        type: import('vue').PropType<import('ant-design-vue/lib/vc-table/interface').PanelRender<any>>;
        default: import('ant-design-vue/lib/vc-table/interface').PanelRender<any>;
    };
    sortDirections: {
        type: import('vue').PropType<import('ant-design-vue/lib/table/interface').SortOrder[]>;
        default: import('ant-design-vue/lib/table/interface').SortOrder[];
    };
    showSorterTooltip: {
        type: import('vue').PropType<boolean | Partial<import('vue').ExtractPropTypes<{
            title: import('vue-types').VueTypeValidableDef<any>;
            trigger: import('vue').PropType<import('ant-design-vue/lib/tooltip/abstractTooltipProps').TriggerType | import('ant-design-vue/lib/tooltip/abstractTooltipProps').TriggerType[]>;
            open: {
                type: BooleanConstructor;
                default: any;
            };
            visible: {
                type: BooleanConstructor;
                default: any;
            };
            placement: import('vue').PropType<import('ant-design-vue/lib/tooltip').TooltipPlacement>;
            color: import('vue').PropType<import('ant-design-vue/lib/_util/type').LiteralUnion<import('ant-design-vue/lib/_util/colors').PresetColorType>>;
            transitionName: StringConstructor;
            overlayStyle: {
                type: import('vue').PropType<import('vue').CSSProperties>;
                default: import('vue').CSSProperties;
            };
            overlayInnerStyle: {
                type: import('vue').PropType<import('vue').CSSProperties>;
                default: import('vue').CSSProperties;
            };
            overlayClassName: StringConstructor;
            openClassName: StringConstructor;
            prefixCls: StringConstructor;
            mouseEnterDelay: NumberConstructor;
            mouseLeaveDelay: NumberConstructor;
            getPopupContainer: import('vue').PropType<(triggerNode: HTMLElement) => HTMLElement>;
            arrowPointAtCenter: {
                type: BooleanConstructor;
                default: any;
            };
            arrow: {
                type: import('vue').PropType<boolean | {
                    pointAtCenter?: boolean;
                }>;
                default: boolean | {
                    pointAtCenter?: boolean;
                };
            };
            autoAdjustOverflow: {
                type: import('vue').PropType<boolean | import('ant-design-vue/lib/tooltip').AdjustOverflow>;
                default: boolean | import('ant-design-vue/lib/tooltip').AdjustOverflow;
            };
            destroyTooltipOnHide: {
                type: BooleanConstructor;
                default: any;
            };
            align: {
                type: import('vue').PropType<import('ant-design-vue/lib/vc-trigger/interface').AlignType>;
                default: import('ant-design-vue/lib/vc-trigger/interface').AlignType;
            };
            builtinPlacements: {
                type: import('vue').PropType<import('ant-design-vue/lib/vc-trigger/interface').BuildInPlacements>;
                default: import('ant-design-vue/lib/vc-trigger/interface').BuildInPlacements;
            };
            children: ArrayConstructor;
            onVisibleChange: import('vue').PropType<(vis: boolean) => void>;
            "onUpdate:visible": import('vue').PropType<(vis: boolean) => void>;
            onOpenChange: import('vue').PropType<(vis: boolean) => void>;
            "onUpdate:open": import('vue').PropType<(vis: boolean) => void>;
        }>>>;
        default: boolean | Partial<import('vue').ExtractPropTypes<{
            title: import('vue-types').VueTypeValidableDef<any>;
            trigger: import('vue').PropType<import('ant-design-vue/lib/tooltip/abstractTooltipProps').TriggerType | import('ant-design-vue/lib/tooltip/abstractTooltipProps').TriggerType[]>;
            open: {
                type: BooleanConstructor;
                default: any;
            };
            visible: {
                type: BooleanConstructor;
                default: any;
            };
            placement: import('vue').PropType<import('ant-design-vue/lib/tooltip').TooltipPlacement>;
            color: import('vue').PropType<import('ant-design-vue/lib/_util/type').LiteralUnion<import('ant-design-vue/lib/_util/colors').PresetColorType>>;
            transitionName: StringConstructor;
            overlayStyle: {
                type: import('vue').PropType<import('vue').CSSProperties>;
                default: import('vue').CSSProperties;
            };
            overlayInnerStyle: {
                type: import('vue').PropType<import('vue').CSSProperties>;
                default: import('vue').CSSProperties;
            };
            overlayClassName: StringConstructor;
            openClassName: StringConstructor;
            prefixCls: StringConstructor;
            mouseEnterDelay: NumberConstructor;
            mouseLeaveDelay: NumberConstructor;
            getPopupContainer: import('vue').PropType<(triggerNode: HTMLElement) => HTMLElement>;
            arrowPointAtCenter: {
                type: BooleanConstructor;
                default: any;
            };
            arrow: {
                type: import('vue').PropType<boolean | {
                    pointAtCenter?: boolean;
                }>;
                default: boolean | {
                    pointAtCenter?: boolean;
                };
            };
            autoAdjustOverflow: {
                type: import('vue').PropType<boolean | import('ant-design-vue/lib/tooltip').AdjustOverflow>;
                default: boolean | import('ant-design-vue/lib/tooltip').AdjustOverflow;
            };
            destroyTooltipOnHide: {
                type: BooleanConstructor;
                default: any;
            };
            align: {
                type: import('vue').PropType<import('ant-design-vue/lib/vc-trigger/interface').AlignType>;
                default: import('ant-design-vue/lib/vc-trigger/interface').AlignType;
            };
            builtinPlacements: {
                type: import('vue').PropType<import('ant-design-vue/lib/vc-trigger/interface').BuildInPlacements>;
                default: import('ant-design-vue/lib/vc-trigger/interface').BuildInPlacements;
            };
            children: ArrayConstructor;
            onVisibleChange: import('vue').PropType<(vis: boolean) => void>;
            "onUpdate:visible": import('vue').PropType<(vis: boolean) => void>;
            onOpenChange: import('vue').PropType<(vis: boolean) => void>;
            "onUpdate:open": import('vue').PropType<(vis: boolean) => void>;
        }>>;
    };
    prefixCls: {
        type: import('vue').PropType<string>;
        default: string;
    };
    rowKey: {
        type: import('vue').PropType<string | import('ant-design-vue/lib/vc-table/interface').GetRowKey<any>>;
        default: string | import('ant-design-vue/lib/vc-table/interface').GetRowKey<any>;
    };
    tableLayout: {
        type: import('vue').PropType<import('ant-design-vue/lib/vc-table/interface').TableLayout>;
        default: import('ant-design-vue/lib/vc-table/interface').TableLayout;
    };
    rowClassName: {
        type: import('vue').PropType<string | import('ant-design-vue/lib/vc-table/interface').RowClassName<any>>;
        default: string | import('ant-design-vue/lib/vc-table/interface').RowClassName<any>;
    };
    footer: {
        type: import('vue').PropType<import('ant-design-vue/lib/vc-table/interface').PanelRender<any>>;
        default: import('ant-design-vue/lib/vc-table/interface').PanelRender<any>;
    };
    id: {
        type: import('vue').PropType<string>;
        default: string;
    };
    showHeader: {
        type: BooleanConstructor;
        default: boolean;
    };
    components: {
        type: import('vue').PropType<import('ant-design-vue/lib/vc-table/interface').TableComponents<any>>;
        default: import('ant-design-vue/lib/vc-table/interface').TableComponents<any>;
    };
    customRow: {
        type: import('vue').PropType<import('ant-design-vue/lib/vc-table/interface').GetComponentProps<any>>;
        default: import('ant-design-vue/lib/vc-table/interface').GetComponentProps<any>;
    };
    customHeaderRow: {
        type: import('vue').PropType<import('ant-design-vue/lib/vc-table/interface').GetComponentProps<import('ant-design-vue/lib/vc-table/interface').ColumnType<any>[]>>;
        default: import('ant-design-vue/lib/vc-table/interface').GetComponentProps<import('ant-design-vue/lib/vc-table/interface').ColumnType<any>[]>;
    };
    direction: {
        type: import('vue').PropType<"rtl" | "ltr">;
        default: "rtl" | "ltr";
    };
    expandFixed: {
        type: import('vue').PropType<boolean | "left" | "right">;
        default: boolean | "left" | "right";
    };
    expandColumnWidth: NumberConstructor;
    expandedRowKeys: {
        type: import('vue').PropType<import('ant-design-vue/lib/vc-table/interface').Key[]>;
        default: import('ant-design-vue/lib/vc-table/interface').Key[];
    };
    defaultExpandedRowKeys: {
        type: import('vue').PropType<import('ant-design-vue/lib/vc-table/interface').Key[]>;
        default: import('ant-design-vue/lib/vc-table/interface').Key[];
    };
    expandedRowRender: {
        type: import('vue').PropType<import('ant-design-vue/lib/vc-table/interface').ExpandedRowRender<any>>;
        default: import('ant-design-vue/lib/vc-table/interface').ExpandedRowRender<any>;
    };
    expandRowByClick: {
        type: BooleanConstructor;
        default: boolean;
    };
    expandIcon: {
        type: import('vue').PropType<import('ant-design-vue/lib/vc-table/interface').RenderExpandIcon<any>>;
        default: import('ant-design-vue/lib/vc-table/interface').RenderExpandIcon<any>;
    };
    onExpand: {
        type: import('vue').PropType<(expanded: boolean, record: any) => void>;
        default: (expanded: boolean, record: any) => void;
    };
    onExpandedRowsChange: {
        type: import('vue').PropType<(expandedKeys: import('ant-design-vue/lib/vc-table/interface').Key[]) => void>;
        default: (expandedKeys: import('ant-design-vue/lib/vc-table/interface').Key[]) => void;
    };
    'onUpdate:expandedRowKeys': {
        type: import('vue').PropType<(expandedKeys: import('ant-design-vue/lib/vc-table/interface').Key[]) => void>;
        default: (expandedKeys: import('ant-design-vue/lib/vc-table/interface').Key[]) => void;
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
        type: import('vue').PropType<import('ant-design-vue/lib/vc-table/interface').RowClassName<any>>;
        default: import('ant-design-vue/lib/vc-table/interface').RowClassName<any>;
    };
    childrenColumnName: {
        type: import('vue').PropType<string>;
        default: string;
    };
    rowExpandable: {
        type: import('vue').PropType<(record: any) => boolean>;
        default: (record: any) => boolean;
    };
    sticky: {
        type: import('vue').PropType<boolean | import('ant-design-vue/lib/vc-table/interface').TableSticky>;
        default: boolean | import('ant-design-vue/lib/vc-table/interface').TableSticky;
    };
    dropdownPrefixCls: StringConstructor;
    dataSource: {
        type: import('vue').PropType<any[]>;
        default: any[];
    };
    pagination: {
        type: import('vue').PropType<false | import('ant-design-vue').TablePaginationConfig>;
        default: false | import('ant-design-vue').TablePaginationConfig;
    };
    loading: {
        type: import('vue').PropType<boolean | Partial<import('vue').ExtractPropTypes<{
            prefixCls: StringConstructor;
            spinning: {
                type: BooleanConstructor;
                default: any;
            };
            size: import('vue').PropType<import('ant-design-vue/lib/spin/Spin').SpinSize>;
            wrapperClassName: StringConstructor;
            tip: import('vue-types').VueTypeValidableDef<any>;
            delay: NumberConstructor;
            indicator: import('vue-types').VueTypeValidableDef<any>;
        }>>>;
        default: boolean | Partial<import('vue').ExtractPropTypes<{
            prefixCls: StringConstructor;
            spinning: {
                type: BooleanConstructor;
                default: any;
            };
            size: import('vue').PropType<import('ant-design-vue/lib/spin/Spin').SpinSize>;
            wrapperClassName: StringConstructor;
            tip: import('vue-types').VueTypeValidableDef<any>;
            delay: NumberConstructor;
            indicator: import('vue-types').VueTypeValidableDef<any>;
        }>>;
    };
    size: {
        type: import('vue').PropType<import('ant-design-vue/lib/button').ButtonSize>;
        default: import('ant-design-vue/lib/button').ButtonSize;
    };
    bordered: {
        type: BooleanConstructor;
        default: boolean;
    };
    locale: {
        type: import('vue').PropType<import('ant-design-vue/lib/table/interface').TableLocale>;
        default: import('ant-design-vue/lib/table/interface').TableLocale;
    };
    onChange: {
        type: import('vue').PropType<(pagination: import('ant-design-vue').TablePaginationConfig, filters: Record<string, import('ant-design-vue/lib/table/interface').FilterValue | null>, sorter: import('ant-design-vue/lib/table/interface').SorterResult | import('ant-design-vue/lib/table/interface').SorterResult[], extra: import('ant-design-vue/lib/table/interface').TableCurrentDataSource) => void>;
        default: (pagination: import('ant-design-vue').TablePaginationConfig, filters: Record<string, import('ant-design-vue/lib/table/interface').FilterValue | null>, sorter: import('ant-design-vue/lib/table/interface').SorterResult | import('ant-design-vue/lib/table/interface').SorterResult[], extra: import('ant-design-vue/lib/table/interface').TableCurrentDataSource) => void;
    };
    onResizeColumn: {
        type: import('vue').PropType<(w: number, col: import('ant-design-vue').TableColumnType) => void>;
        default: (w: number, col: import('ant-design-vue').TableColumnType) => void;
    };
    getPopupContainer: {
        type: import('vue').PropType<import('ant-design-vue/lib/table/interface').GetPopupContainer>;
        default: import('ant-design-vue/lib/table/interface').GetPopupContainer;
    };
    scroll: {
        type: import('vue').PropType<{
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
        type: import('vue').PropType<import('ant-design-vue/lib/vc-table/interface').TransformCellText<any>>;
        default: import('ant-design-vue/lib/vc-table/interface').TransformCellText<any>;
    };
}>, () => import('ant-design-vue/lib/_util/type').VueNode, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    columns: {
        type: import('vue').PropType<import('./typing').ProColumns<Record<string, any>, "text">[]>;
        default: undefined;
    };
    params: {
        type: import('vue').PropType<Record<string, any>>;
        default: undefined;
    };
    request: {
        type: import('vue').PropType<(params: Record<string, any> & {
            pageSize?: number;
            current?: number;
            keyword?: string;
        }, sort: Record<string, import('ant-design-vue/lib/table/interface').SortOrder>, filter: Record<string, (string | number)[] | null>) => Promise<Partial<import('./typing').RequestData<any>>>>;
        default: undefined;
    };
    editable: {
        type: import('vue').PropType<import('@ant-design-vue/pro-utils').RowEditableConfig<any>>;
        default: undefined;
    };
    options: {
        type: import('vue').PropType<import('./typing').WithFalse<import('./components/ToolBar').OptionConfig>>;
        default: undefined;
    };
    type: {
        type: import('vue').PropType<import('@ant-design-vue/pro-utils').ProSchemaComponentTypes>;
        default: undefined;
    };
    search: {
        type: import('vue').PropType<import('./typing').WithFalse<import('./components/Form/FormRender').SearchConfig>>;
        default: undefined;
    };
    manualRequest: {
        type: import('vue').PropType<boolean>;
        default: undefined;
    };
    rowSelection: {
        type: import('vue').PropType<import('./typing').WithFalse<import('ant-design-vue').TableProps<any>["rowSelection"] & {
            alwaysShowAlert?: boolean;
        }>>;
    };
    errorBoundaryRender: {
        type: import('vue').PropType<import('./RenderTypings').ErrorBoundaryRender>;
        default: undefined;
    };
    title: {
        type: import('vue').PropType<import('ant-design-vue/lib/vc-table/interface').PanelRender<any>>;
        default: import('ant-design-vue/lib/vc-table/interface').PanelRender<any>;
    };
    sortDirections: {
        type: import('vue').PropType<import('ant-design-vue/lib/table/interface').SortOrder[]>;
        default: import('ant-design-vue/lib/table/interface').SortOrder[];
    };
    showSorterTooltip: {
        type: import('vue').PropType<boolean | Partial<import('vue').ExtractPropTypes<{
            title: import('vue-types').VueTypeValidableDef<any>;
            trigger: import('vue').PropType<import('ant-design-vue/lib/tooltip/abstractTooltipProps').TriggerType | import('ant-design-vue/lib/tooltip/abstractTooltipProps').TriggerType[]>;
            open: {
                type: BooleanConstructor;
                default: any;
            };
            visible: {
                type: BooleanConstructor;
                default: any;
            };
            placement: import('vue').PropType<import('ant-design-vue/lib/tooltip').TooltipPlacement>;
            color: import('vue').PropType<import('ant-design-vue/lib/_util/type').LiteralUnion<import('ant-design-vue/lib/_util/colors').PresetColorType>>;
            transitionName: StringConstructor;
            overlayStyle: {
                type: import('vue').PropType<import('vue').CSSProperties>;
                default: import('vue').CSSProperties;
            };
            overlayInnerStyle: {
                type: import('vue').PropType<import('vue').CSSProperties>;
                default: import('vue').CSSProperties;
            };
            overlayClassName: StringConstructor;
            openClassName: StringConstructor;
            prefixCls: StringConstructor;
            mouseEnterDelay: NumberConstructor;
            mouseLeaveDelay: NumberConstructor;
            getPopupContainer: import('vue').PropType<(triggerNode: HTMLElement) => HTMLElement>;
            arrowPointAtCenter: {
                type: BooleanConstructor;
                default: any;
            };
            arrow: {
                type: import('vue').PropType<boolean | {
                    pointAtCenter?: boolean;
                }>;
                default: boolean | {
                    pointAtCenter?: boolean;
                };
            };
            autoAdjustOverflow: {
                type: import('vue').PropType<boolean | import('ant-design-vue/lib/tooltip').AdjustOverflow>;
                default: boolean | import('ant-design-vue/lib/tooltip').AdjustOverflow;
            };
            destroyTooltipOnHide: {
                type: BooleanConstructor;
                default: any;
            };
            align: {
                type: import('vue').PropType<import('ant-design-vue/lib/vc-trigger/interface').AlignType>;
                default: import('ant-design-vue/lib/vc-trigger/interface').AlignType;
            };
            builtinPlacements: {
                type: import('vue').PropType<import('ant-design-vue/lib/vc-trigger/interface').BuildInPlacements>;
                default: import('ant-design-vue/lib/vc-trigger/interface').BuildInPlacements;
            };
            children: ArrayConstructor;
            onVisibleChange: import('vue').PropType<(vis: boolean) => void>;
            "onUpdate:visible": import('vue').PropType<(vis: boolean) => void>;
            onOpenChange: import('vue').PropType<(vis: boolean) => void>;
            "onUpdate:open": import('vue').PropType<(vis: boolean) => void>;
        }>>>;
        default: boolean | Partial<import('vue').ExtractPropTypes<{
            title: import('vue-types').VueTypeValidableDef<any>;
            trigger: import('vue').PropType<import('ant-design-vue/lib/tooltip/abstractTooltipProps').TriggerType | import('ant-design-vue/lib/tooltip/abstractTooltipProps').TriggerType[]>;
            open: {
                type: BooleanConstructor;
                default: any;
            };
            visible: {
                type: BooleanConstructor;
                default: any;
            };
            placement: import('vue').PropType<import('ant-design-vue/lib/tooltip').TooltipPlacement>;
            color: import('vue').PropType<import('ant-design-vue/lib/_util/type').LiteralUnion<import('ant-design-vue/lib/_util/colors').PresetColorType>>;
            transitionName: StringConstructor;
            overlayStyle: {
                type: import('vue').PropType<import('vue').CSSProperties>;
                default: import('vue').CSSProperties;
            };
            overlayInnerStyle: {
                type: import('vue').PropType<import('vue').CSSProperties>;
                default: import('vue').CSSProperties;
            };
            overlayClassName: StringConstructor;
            openClassName: StringConstructor;
            prefixCls: StringConstructor;
            mouseEnterDelay: NumberConstructor;
            mouseLeaveDelay: NumberConstructor;
            getPopupContainer: import('vue').PropType<(triggerNode: HTMLElement) => HTMLElement>;
            arrowPointAtCenter: {
                type: BooleanConstructor;
                default: any;
            };
            arrow: {
                type: import('vue').PropType<boolean | {
                    pointAtCenter?: boolean;
                }>;
                default: boolean | {
                    pointAtCenter?: boolean;
                };
            };
            autoAdjustOverflow: {
                type: import('vue').PropType<boolean | import('ant-design-vue/lib/tooltip').AdjustOverflow>;
                default: boolean | import('ant-design-vue/lib/tooltip').AdjustOverflow;
            };
            destroyTooltipOnHide: {
                type: BooleanConstructor;
                default: any;
            };
            align: {
                type: import('vue').PropType<import('ant-design-vue/lib/vc-trigger/interface').AlignType>;
                default: import('ant-design-vue/lib/vc-trigger/interface').AlignType;
            };
            builtinPlacements: {
                type: import('vue').PropType<import('ant-design-vue/lib/vc-trigger/interface').BuildInPlacements>;
                default: import('ant-design-vue/lib/vc-trigger/interface').BuildInPlacements;
            };
            children: ArrayConstructor;
            onVisibleChange: import('vue').PropType<(vis: boolean) => void>;
            "onUpdate:visible": import('vue').PropType<(vis: boolean) => void>;
            onOpenChange: import('vue').PropType<(vis: boolean) => void>;
            "onUpdate:open": import('vue').PropType<(vis: boolean) => void>;
        }>>;
    };
    prefixCls: {
        type: import('vue').PropType<string>;
        default: string;
    };
    rowKey: {
        type: import('vue').PropType<string | import('ant-design-vue/lib/vc-table/interface').GetRowKey<any>>;
        default: string | import('ant-design-vue/lib/vc-table/interface').GetRowKey<any>;
    };
    tableLayout: {
        type: import('vue').PropType<import('ant-design-vue/lib/vc-table/interface').TableLayout>;
        default: import('ant-design-vue/lib/vc-table/interface').TableLayout;
    };
    rowClassName: {
        type: import('vue').PropType<string | import('ant-design-vue/lib/vc-table/interface').RowClassName<any>>;
        default: string | import('ant-design-vue/lib/vc-table/interface').RowClassName<any>;
    };
    footer: {
        type: import('vue').PropType<import('ant-design-vue/lib/vc-table/interface').PanelRender<any>>;
        default: import('ant-design-vue/lib/vc-table/interface').PanelRender<any>;
    };
    id: {
        type: import('vue').PropType<string>;
        default: string;
    };
    showHeader: {
        type: BooleanConstructor;
        default: boolean;
    };
    components: {
        type: import('vue').PropType<import('ant-design-vue/lib/vc-table/interface').TableComponents<any>>;
        default: import('ant-design-vue/lib/vc-table/interface').TableComponents<any>;
    };
    customRow: {
        type: import('vue').PropType<import('ant-design-vue/lib/vc-table/interface').GetComponentProps<any>>;
        default: import('ant-design-vue/lib/vc-table/interface').GetComponentProps<any>;
    };
    customHeaderRow: {
        type: import('vue').PropType<import('ant-design-vue/lib/vc-table/interface').GetComponentProps<import('ant-design-vue/lib/vc-table/interface').ColumnType<any>[]>>;
        default: import('ant-design-vue/lib/vc-table/interface').GetComponentProps<import('ant-design-vue/lib/vc-table/interface').ColumnType<any>[]>;
    };
    direction: {
        type: import('vue').PropType<"rtl" | "ltr">;
        default: "rtl" | "ltr";
    };
    expandFixed: {
        type: import('vue').PropType<boolean | "left" | "right">;
        default: boolean | "left" | "right";
    };
    expandColumnWidth: NumberConstructor;
    expandedRowKeys: {
        type: import('vue').PropType<import('ant-design-vue/lib/vc-table/interface').Key[]>;
        default: import('ant-design-vue/lib/vc-table/interface').Key[];
    };
    defaultExpandedRowKeys: {
        type: import('vue').PropType<import('ant-design-vue/lib/vc-table/interface').Key[]>;
        default: import('ant-design-vue/lib/vc-table/interface').Key[];
    };
    expandedRowRender: {
        type: import('vue').PropType<import('ant-design-vue/lib/vc-table/interface').ExpandedRowRender<any>>;
        default: import('ant-design-vue/lib/vc-table/interface').ExpandedRowRender<any>;
    };
    expandRowByClick: {
        type: BooleanConstructor;
        default: boolean;
    };
    expandIcon: {
        type: import('vue').PropType<import('ant-design-vue/lib/vc-table/interface').RenderExpandIcon<any>>;
        default: import('ant-design-vue/lib/vc-table/interface').RenderExpandIcon<any>;
    };
    onExpand: {
        type: import('vue').PropType<(expanded: boolean, record: any) => void>;
        default: (expanded: boolean, record: any) => void;
    };
    onExpandedRowsChange: {
        type: import('vue').PropType<(expandedKeys: import('ant-design-vue/lib/vc-table/interface').Key[]) => void>;
        default: (expandedKeys: import('ant-design-vue/lib/vc-table/interface').Key[]) => void;
    };
    'onUpdate:expandedRowKeys': {
        type: import('vue').PropType<(expandedKeys: import('ant-design-vue/lib/vc-table/interface').Key[]) => void>;
        default: (expandedKeys: import('ant-design-vue/lib/vc-table/interface').Key[]) => void;
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
        type: import('vue').PropType<import('ant-design-vue/lib/vc-table/interface').RowClassName<any>>;
        default: import('ant-design-vue/lib/vc-table/interface').RowClassName<any>;
    };
    childrenColumnName: {
        type: import('vue').PropType<string>;
        default: string;
    };
    rowExpandable: {
        type: import('vue').PropType<(record: any) => boolean>;
        default: (record: any) => boolean;
    };
    sticky: {
        type: import('vue').PropType<boolean | import('ant-design-vue/lib/vc-table/interface').TableSticky>;
        default: boolean | import('ant-design-vue/lib/vc-table/interface').TableSticky;
    };
    dropdownPrefixCls: StringConstructor;
    dataSource: {
        type: import('vue').PropType<any[]>;
        default: any[];
    };
    pagination: {
        type: import('vue').PropType<false | import('ant-design-vue').TablePaginationConfig>;
        default: false | import('ant-design-vue').TablePaginationConfig;
    };
    loading: {
        type: import('vue').PropType<boolean | Partial<import('vue').ExtractPropTypes<{
            prefixCls: StringConstructor;
            spinning: {
                type: BooleanConstructor;
                default: any;
            };
            size: import('vue').PropType<import('ant-design-vue/lib/spin/Spin').SpinSize>;
            wrapperClassName: StringConstructor;
            tip: import('vue-types').VueTypeValidableDef<any>;
            delay: NumberConstructor;
            indicator: import('vue-types').VueTypeValidableDef<any>;
        }>>>;
        default: boolean | Partial<import('vue').ExtractPropTypes<{
            prefixCls: StringConstructor;
            spinning: {
                type: BooleanConstructor;
                default: any;
            };
            size: import('vue').PropType<import('ant-design-vue/lib/spin/Spin').SpinSize>;
            wrapperClassName: StringConstructor;
            tip: import('vue-types').VueTypeValidableDef<any>;
            delay: NumberConstructor;
            indicator: import('vue-types').VueTypeValidableDef<any>;
        }>>;
    };
    size: {
        type: import('vue').PropType<import('ant-design-vue/lib/button').ButtonSize>;
        default: import('ant-design-vue/lib/button').ButtonSize;
    };
    bordered: {
        type: BooleanConstructor;
        default: boolean;
    };
    locale: {
        type: import('vue').PropType<import('ant-design-vue/lib/table/interface').TableLocale>;
        default: import('ant-design-vue/lib/table/interface').TableLocale;
    };
    onChange: {
        type: import('vue').PropType<(pagination: import('ant-design-vue').TablePaginationConfig, filters: Record<string, import('ant-design-vue/lib/table/interface').FilterValue | null>, sorter: import('ant-design-vue/lib/table/interface').SorterResult | import('ant-design-vue/lib/table/interface').SorterResult[], extra: import('ant-design-vue/lib/table/interface').TableCurrentDataSource) => void>;
        default: (pagination: import('ant-design-vue').TablePaginationConfig, filters: Record<string, import('ant-design-vue/lib/table/interface').FilterValue | null>, sorter: import('ant-design-vue/lib/table/interface').SorterResult | import('ant-design-vue/lib/table/interface').SorterResult[], extra: import('ant-design-vue/lib/table/interface').TableCurrentDataSource) => void;
    };
    onResizeColumn: {
        type: import('vue').PropType<(w: number, col: import('ant-design-vue').TableColumnType) => void>;
        default: (w: number, col: import('ant-design-vue').TableColumnType) => void;
    };
    getPopupContainer: {
        type: import('vue').PropType<import('ant-design-vue/lib/table/interface').GetPopupContainer>;
        default: import('ant-design-vue/lib/table/interface').GetPopupContainer;
    };
    scroll: {
        type: import('vue').PropType<{
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
        type: import('vue').PropType<import('ant-design-vue/lib/vc-table/interface').TransformCellText<any>>;
        default: import('ant-design-vue/lib/vc-table/interface').TransformCellText<any>;
    };
}>> & Readonly<{}>, {
    title: import('ant-design-vue/lib/vc-table/interface').PanelRender<any>;
    sortDirections: import('ant-design-vue/lib/table/interface').SortOrder[];
    showSorterTooltip: boolean | Partial<import('vue').ExtractPropTypes<{
        title: import('vue-types').VueTypeValidableDef<any>;
        trigger: import('vue').PropType<import('ant-design-vue/lib/tooltip/abstractTooltipProps').TriggerType | import('ant-design-vue/lib/tooltip/abstractTooltipProps').TriggerType[]>;
        open: {
            type: BooleanConstructor;
            default: any;
        };
        visible: {
            type: BooleanConstructor;
            default: any;
        };
        placement: import('vue').PropType<import('ant-design-vue/lib/tooltip').TooltipPlacement>;
        color: import('vue').PropType<import('ant-design-vue/lib/_util/type').LiteralUnion<import('ant-design-vue/lib/_util/colors').PresetColorType>>;
        transitionName: StringConstructor;
        overlayStyle: {
            type: import('vue').PropType<import('vue').CSSProperties>;
            default: import('vue').CSSProperties;
        };
        overlayInnerStyle: {
            type: import('vue').PropType<import('vue').CSSProperties>;
            default: import('vue').CSSProperties;
        };
        overlayClassName: StringConstructor;
        openClassName: StringConstructor;
        prefixCls: StringConstructor;
        mouseEnterDelay: NumberConstructor;
        mouseLeaveDelay: NumberConstructor;
        getPopupContainer: import('vue').PropType<(triggerNode: HTMLElement) => HTMLElement>;
        arrowPointAtCenter: {
            type: BooleanConstructor;
            default: any;
        };
        arrow: {
            type: import('vue').PropType<boolean | {
                pointAtCenter?: boolean;
            }>;
            default: boolean | {
                pointAtCenter?: boolean;
            };
        };
        autoAdjustOverflow: {
            type: import('vue').PropType<boolean | import('ant-design-vue/lib/tooltip').AdjustOverflow>;
            default: boolean | import('ant-design-vue/lib/tooltip').AdjustOverflow;
        };
        destroyTooltipOnHide: {
            type: BooleanConstructor;
            default: any;
        };
        align: {
            type: import('vue').PropType<import('ant-design-vue/lib/vc-trigger/interface').AlignType>;
            default: import('ant-design-vue/lib/vc-trigger/interface').AlignType;
        };
        builtinPlacements: {
            type: import('vue').PropType<import('ant-design-vue/lib/vc-trigger/interface').BuildInPlacements>;
            default: import('ant-design-vue/lib/vc-trigger/interface').BuildInPlacements;
        };
        children: ArrayConstructor;
        onVisibleChange: import('vue').PropType<(vis: boolean) => void>;
        'onUpdate:visible': import('vue').PropType<(vis: boolean) => void>;
        onOpenChange: import('vue').PropType<(vis: boolean) => void>;
        'onUpdate:open': import('vue').PropType<(vis: boolean) => void>;
    }>>;
    columns: import('./typing').ProColumns<Record<string, any>, "text">[];
    prefixCls: string;
    rowKey: string | import('ant-design-vue/lib/vc-table/interface').GetRowKey<any>;
    tableLayout: import('ant-design-vue/lib/vc-table/interface').TableLayout;
    rowClassName: string | import('ant-design-vue/lib/vc-table/interface').RowClassName<any>;
    footer: import('ant-design-vue/lib/vc-table/interface').PanelRender<any>;
    id: string;
    showHeader: boolean;
    components: import('ant-design-vue/lib/vc-table/interface').TableComponents<any>;
    customRow: import('ant-design-vue/lib/vc-table/interface').GetComponentProps<any>;
    customHeaderRow: import('ant-design-vue/lib/vc-table/interface').GetComponentProps<import('ant-design-vue/lib/vc-table/interface').ColumnType<any>[]>;
    direction: "rtl" | "ltr";
    expandFixed: boolean | "left" | "right";
    expandedRowKeys: import('ant-design-vue/lib/vc-table/interface').Key[];
    defaultExpandedRowKeys: import('ant-design-vue/lib/vc-table/interface').Key[];
    expandedRowRender: import('ant-design-vue/lib/vc-table/interface').ExpandedRowRender<any>;
    expandRowByClick: boolean;
    expandIcon: import('ant-design-vue/lib/vc-table/interface').RenderExpandIcon<any>;
    onExpand: (expanded: boolean, record: any) => void;
    onExpandedRowsChange: (expandedKeys: import('ant-design-vue/lib/vc-table/interface').Key[]) => void;
    'onUpdate:expandedRowKeys': (expandedKeys: import('ant-design-vue/lib/vc-table/interface').Key[]) => void;
    defaultExpandAllRows: boolean;
    showExpandColumn: boolean;
    expandedRowClassName: import('ant-design-vue/lib/vc-table/interface').RowClassName<any>;
    childrenColumnName: string;
    rowExpandable: (record: any) => boolean;
    sticky: boolean | import('ant-design-vue/lib/vc-table/interface').TableSticky;
    dataSource: any[];
    pagination: false | import('ant-design-vue').TablePaginationConfig;
    loading: boolean | Partial<import('vue').ExtractPropTypes<{
        prefixCls: StringConstructor;
        spinning: {
            type: BooleanConstructor;
            default: any;
        };
        size: import('vue').PropType<import('ant-design-vue/lib/spin/Spin').SpinSize>;
        wrapperClassName: StringConstructor;
        tip: import('vue-types').VueTypeValidableDef<any>;
        delay: NumberConstructor;
        indicator: import('vue-types').VueTypeValidableDef<any>;
    }>>;
    size: import('ant-design-vue/lib/button').ButtonSize;
    bordered: boolean;
    locale: import('ant-design-vue/lib/table/interface').TableLocale;
    onChange: (pagination: import('ant-design-vue').TablePaginationConfig, filters: Record<string, import('ant-design-vue/lib/table/interface').FilterValue | null>, sorter: import('ant-design-vue/lib/table/interface').SorterResult | import('ant-design-vue/lib/table/interface').SorterResult[], extra: import('ant-design-vue/lib/table/interface').TableCurrentDataSource) => void;
    onResizeColumn: (w: number, col: import('ant-design-vue').TableColumnType) => void;
    getPopupContainer: import('ant-design-vue/lib/table/interface').GetPopupContainer;
    scroll: {
        x?: string | number | true;
        y?: string | number;
    } & {
        scrollToFirstRowOnChange?: boolean;
    };
    transformCellText: import('ant-design-vue/lib/vc-table/interface').TransformCellText<any>;
    params: Record<string, any>;
    request: (params: Record<string, any> & {
        pageSize?: number;
        current?: number;
        keyword?: string;
    }, sort: Record<string, import('ant-design-vue/lib/table/interface').SortOrder>, filter: Record<string, (string | number)[] | null>) => Promise<Partial<import('./typing').RequestData<any>>>;
    editable: import('@ant-design-vue/pro-utils').RowEditableConfig<any>;
    options: import('./typing').WithFalse<import('./components/ToolBar').OptionConfig>;
    type: import('@ant-design-vue/pro-utils').ProSchemaComponentTypes;
    search: import('./typing').WithFalse<import('./components/Form/FormRender').SearchConfig>;
    manualRequest: boolean;
    errorBoundaryRender: import('./RenderTypings').ErrorBoundaryRender;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default TableRender;

import { PropType } from 'vue';
import { VueNode } from 'ant-design-vue/lib/_util/type';
import { RequestOptionsType } from '@ant-design-vue/pro-utils';
import { LabeledValue } from 'ant-design-vue/lib/select';
export type KeyLabel = Partial<LabeledValue> & RequestOptionsType;
/** 用户扩展数据后的值类型 */
export type DataValueType<T> = KeyLabel & T;
/** 可能单选，可能多选 */
export type DataValuesType<T> = DataValueType<T> | DataValueType<T>[];
export declare const searchSelectProps: () => {
    /** 防抖动时间 默认10 单位ms */
    debounceTime: {
        type: PropType<number>;
        default: undefined;
    };
    /** 自定义搜索方法, 返回搜索结果的 Promise */
    request: {
        type: PropType<(params: {
            query: string;
        }) => Promise<DataValueType<Record<string, any>>[]>>;
        default: undefined;
    };
    /** 自定义选项渲染 */
    optionItemRender: {
        type: PropType<(item: DataValueType<Record<string, any>>) => VueNode>;
        default: undefined;
    };
    /** 指定组件中的值 */
    value: {
        type: PropType<KeyLabel | KeyLabel[]>;
        default: undefined;
    };
    /** 指定默认选中的条目 */
    defaultValue: {
        type: PropType<KeyLabel | KeyLabel[]>;
        default: undefined;
    };
    options: {
        type: PropType<RequestOptionsType[]>;
        default: undefined;
    };
    /**
     * 是否在输入框聚焦时触发搜索
     *
     * @default false
     */
    searchOnFocus: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 选择完一个之后是否清空搜索项重新搜索
     *
     * @default false
     */
    resetAfterSelect: {
        type: PropType<boolean>;
        default: boolean;
    };
    /** 刷新数据 */
    fetchData: {
        type: PropType<(keyWord?: string) => void>;
        default: undefined;
    };
    /** 清空数据 */
    resetData: {
        type: PropType<() => void>;
        default: undefined;
    };
    /**
     * 当搜索关键词发生变化时是否请求远程数据
     *
     * @default true
     */
    fetchDataOnSearch: {
        type: PropType<boolean>;
        default: boolean;
    };
    /** 默认搜索关键词 */
    defaultSearchValue: {
        type: PropType<string>;
        default: undefined;
    };
    /**
     * 在选择时保留选项的原始标签文本
     * 当设置为 true 时，选中后回填的内容将使用选项的原始 label，而不是经过 optionItemRender 处理后的内容
     * @default false
     */
    preserveOriginalLabel: {
        type: PropType<boolean>;
        default: boolean;
    };
    size: {
        type: import('vue').PropType<import('ant-design-vue/lib/button').ButtonSize>;
        default: import('ant-design-vue/lib/button').ButtonSize;
    };
    onChange: import('vue').PropType<(value: import('ant-design-vue/lib/select').SelectValue, option: import('ant-design-vue/lib/select').DefaultOptionType | import('ant-design-vue/lib/select').DefaultOptionType[]) => void>;
    prefixCls: StringConstructor;
    disabled: {
        type: BooleanConstructor;
        default: any;
    };
    onFocus: {
        type: import('vue').PropType<(e: FocusEvent) => void>;
    };
    onBlur: {
        type: import('vue').PropType<(e: FocusEvent) => void>;
    };
    onKeydown: import('vue').PropType<(e: KeyboardEvent) => void>;
    onKeyup: import('vue').PropType<(e: KeyboardEvent) => void>;
    onClick: import('vue').PropType<(e: MouseEvent) => void>;
    onMousedown: import('vue').PropType<(e: MouseEvent) => void>;
    onMouseenter: import('vue').PropType<(e: MouseEvent) => void>;
    onMouseleave: import('vue').PropType<(e: MouseEvent) => void>;
    onSelect: import('vue').PropType<import('ant-design-vue/lib/vc-select/Select').SelectHandler<(string | number) | LabeledValue, import('ant-design-vue/lib/select').DefaultOptionType>>;
    children: import('vue').PropType<import('ant-design-vue/lib/_util/type').VueNode[]>;
    open: {
        type: BooleanConstructor;
        default: any;
    };
    id: StringConstructor;
    mode: {
        type: import('vue').PropType<"multiple" | "tags" | "SECRET_COMBOBOX_MODE_DO_NOT_USE">;
        default: "multiple" | "tags" | "SECRET_COMBOBOX_MODE_DO_NOT_USE";
    };
    placeholder: import('vue-types').VueTypeValidableDef<any>;
    listHeight: NumberConstructor;
    direction: {
        type: import('vue').PropType<"rtl" | "ltr">;
    };
    animation: StringConstructor;
    virtual: {
        type: BooleanConstructor;
        default: any;
    };
    dropdownMatchSelectWidth: {
        type: import('vue').PropType<number | boolean>;
        default: any;
    };
    getPopupContainer: {
        type: import('vue').PropType<import('ant-design-vue/lib/vc-select/BaseSelect').RenderDOMFunc>;
    };
    autofocus: BooleanConstructor;
    loading: {
        type: BooleanConstructor;
        default: any;
    };
    bordered: {
        type: BooleanConstructor;
        default: boolean;
    };
    'onUpdate:value': {
        type: import('vue').PropType<(val: import('ant-design-vue/lib/select').SelectValue) => void>;
        default: (val: import('ant-design-vue/lib/select').SelectValue) => void;
    };
    status: {
        type: import('vue').PropType<"" | "error" | "warning">;
        default: "" | "error" | "warning";
    };
    clearIcon: import('vue-types').VueTypeValidableDef<any>;
    allowClear: {
        type: BooleanConstructor;
        default: any;
    };
    tabindex: NumberConstructor;
    dropdownClassName: StringConstructor;
    dropdownAlign: import('vue').PropType<import('ant-design-vue/lib/vc-trigger/interface').AlignType>;
    transitionName: StringConstructor;
    defaultOpen: {
        type: BooleanConstructor;
        default: any;
    };
    suffixIcon: import('vue-types').VueTypeValidableDef<any>;
    notFoundContent: import('vue-types').VueTypeValidableDef<any>;
    itemIcon: import('vue-types').VueTypeValidableDef<any>;
    choiceTransitionName: {
        type: import('vue').PropType<"">;
        default: "";
    };
    popupClassName: StringConstructor;
    placement: {
        type: import('vue').PropType<"bottomLeft" | "bottomRight" | "topLeft" | "topRight">;
        default: "bottomLeft" | "bottomRight" | "topLeft" | "topRight";
    };
    showAction: {
        type: import('vue').PropType<("click" | "focus")[]>;
    };
    onDeselect: import('vue').PropType<import('ant-design-vue/lib/vc-select/Select').SelectHandler<(string | number) | LabeledValue, import('ant-design-vue/lib/select').DefaultOptionType>>;
    onSearch: import('vue').PropType<(value: string) => void>;
    fieldNames: import('vue').PropType<import('ant-design-vue/lib/vc-select/Select').FieldNames>;
    dropdownStyle: {
        type: import('vue').PropType<import('vue').CSSProperties>;
    };
    dropdownRender: {
        type: import('vue').PropType<import('ant-design-vue/lib/vc-select/BaseSelect').DropdownRender>;
    };
    showSearch: {
        type: BooleanConstructor;
        default: any;
    };
    searchValue: StringConstructor;
    onInputKeyDown: import('vue').PropType<(e: KeyboardEvent) => void>;
    removeIcon: import('vue-types').VueTypeValidableDef<any>;
    maxTagCount: {
        type: import('vue').PropType<number | "responsive">;
    };
    maxTagTextLength: NumberConstructor;
    maxTagPlaceholder: import('vue-types').VueTypeValidableDef<any>;
    tokenSeparators: {
        type: import('vue').PropType<string[]>;
    };
    tagRender: {
        type: import('vue').PropType<(props: import('ant-design-vue/lib/vc-select/BaseSelect').CustomTagProps) => any>;
    };
    optionLabelRender: {
        type: import('vue').PropType<(option: Record<string, any>) => any>;
    };
    onClear: import('vue').PropType<() => void>;
    onDropdownVisibleChange: {
        type: import('vue').PropType<(open: boolean) => void>;
    };
    showArrow: {
        type: BooleanConstructor;
        default: any;
    };
    onPopupScroll: import('vue').PropType<(e: UIEvent) => void>;
    menuItemSelectedIcon: import('vue-types').VueTypeValidableDef<any>;
    listItemHeight: NumberConstructor;
    inputValue: StringConstructor;
    autoClearSearchValue: {
        type: BooleanConstructor;
        default: any;
    };
    filterOption: {
        type: import('vue').PropType<boolean | import('ant-design-vue/lib/vc-select/Select').FilterFunc<import('ant-design-vue/lib/select').DefaultOptionType>>;
        default: any;
    };
    filterSort: import('vue').PropType<(optionA: import('ant-design-vue/lib/select').DefaultOptionType, optionB: import('ant-design-vue/lib/select').DefaultOptionType) => number>;
    optionFilterProp: StringConstructor;
    optionLabelProp: StringConstructor;
    defaultActiveFirstOption: {
        type: BooleanConstructor;
        default: any;
    };
    labelInValue: {
        type: BooleanConstructor;
        default: any;
    };
};
declare const SearchSelect: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    /** 防抖动时间 默认10 单位ms */
    debounceTime: {
        type: PropType<number>;
        default: undefined;
    };
    /** 自定义搜索方法, 返回搜索结果的 Promise */
    request: {
        type: PropType<(params: {
            query: string;
        }) => Promise<DataValueType<Record<string, any>>[]>>;
        default: undefined;
    };
    /** 自定义选项渲染 */
    optionItemRender: {
        type: PropType<(item: DataValueType<Record<string, any>>) => VueNode>;
        default: undefined;
    };
    /** 指定组件中的值 */
    value: {
        type: PropType<KeyLabel | KeyLabel[]>;
        default: undefined;
    };
    /** 指定默认选中的条目 */
    defaultValue: {
        type: PropType<KeyLabel | KeyLabel[]>;
        default: undefined;
    };
    options: {
        type: PropType<RequestOptionsType[]>;
        default: undefined;
    };
    /**
     * 是否在输入框聚焦时触发搜索
     *
     * @default false
     */
    searchOnFocus: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 选择完一个之后是否清空搜索项重新搜索
     *
     * @default false
     */
    resetAfterSelect: {
        type: PropType<boolean>;
        default: boolean;
    };
    /** 刷新数据 */
    fetchData: {
        type: PropType<(keyWord?: string) => void>;
        default: undefined;
    };
    /** 清空数据 */
    resetData: {
        type: PropType<() => void>;
        default: undefined;
    };
    /**
     * 当搜索关键词发生变化时是否请求远程数据
     *
     * @default true
     */
    fetchDataOnSearch: {
        type: PropType<boolean>;
        default: boolean;
    };
    /** 默认搜索关键词 */
    defaultSearchValue: {
        type: PropType<string>;
        default: undefined;
    };
    /**
     * 在选择时保留选项的原始标签文本
     * 当设置为 true 时，选中后回填的内容将使用选项的原始 label，而不是经过 optionItemRender 处理后的内容
     * @default false
     */
    preserveOriginalLabel: {
        type: PropType<boolean>;
        default: boolean;
    };
    size: {
        type: import('vue').PropType<import('ant-design-vue/lib/button').ButtonSize>;
        default: import('ant-design-vue/lib/button').ButtonSize;
    };
    onChange: import('vue').PropType<(value: import('ant-design-vue/lib/select').SelectValue, option: import('ant-design-vue/lib/select').DefaultOptionType | import('ant-design-vue/lib/select').DefaultOptionType[]) => void>;
    prefixCls: StringConstructor;
    disabled: {
        type: BooleanConstructor;
        default: any;
    };
    onFocus: {
        type: import('vue').PropType<(e: FocusEvent) => void>;
    };
    onBlur: {
        type: import('vue').PropType<(e: FocusEvent) => void>;
    };
    onKeydown: import('vue').PropType<(e: KeyboardEvent) => void>;
    onKeyup: import('vue').PropType<(e: KeyboardEvent) => void>;
    onClick: import('vue').PropType<(e: MouseEvent) => void>;
    onMousedown: import('vue').PropType<(e: MouseEvent) => void>;
    onMouseenter: import('vue').PropType<(e: MouseEvent) => void>;
    onMouseleave: import('vue').PropType<(e: MouseEvent) => void>;
    onSelect: import('vue').PropType<import('ant-design-vue/lib/vc-select/Select').SelectHandler<(string | number) | LabeledValue, import('ant-design-vue/lib/select').DefaultOptionType>>;
    children: import('vue').PropType<import('ant-design-vue/lib/_util/type').VueNode[]>;
    open: {
        type: BooleanConstructor;
        default: any;
    };
    id: StringConstructor;
    mode: {
        type: import('vue').PropType<"multiple" | "tags" | "SECRET_COMBOBOX_MODE_DO_NOT_USE">;
        default: "multiple" | "tags" | "SECRET_COMBOBOX_MODE_DO_NOT_USE";
    };
    placeholder: import('vue-types').VueTypeValidableDef<any>;
    listHeight: NumberConstructor;
    direction: {
        type: import('vue').PropType<"rtl" | "ltr">;
    };
    animation: StringConstructor;
    virtual: {
        type: BooleanConstructor;
        default: any;
    };
    dropdownMatchSelectWidth: {
        type: import('vue').PropType<number | boolean>;
        default: any;
    };
    getPopupContainer: {
        type: import('vue').PropType<import('ant-design-vue/lib/vc-select/BaseSelect').RenderDOMFunc>;
    };
    autofocus: BooleanConstructor;
    loading: {
        type: BooleanConstructor;
        default: any;
    };
    bordered: {
        type: BooleanConstructor;
        default: boolean;
    };
    'onUpdate:value': {
        type: import('vue').PropType<(val: import('ant-design-vue/lib/select').SelectValue) => void>;
        default: (val: import('ant-design-vue/lib/select').SelectValue) => void;
    };
    status: {
        type: import('vue').PropType<"" | "error" | "warning">;
        default: "" | "error" | "warning";
    };
    clearIcon: import('vue-types').VueTypeValidableDef<any>;
    allowClear: {
        type: BooleanConstructor;
        default: any;
    };
    tabindex: NumberConstructor;
    dropdownClassName: StringConstructor;
    dropdownAlign: import('vue').PropType<import('ant-design-vue/lib/vc-trigger/interface').AlignType>;
    transitionName: StringConstructor;
    defaultOpen: {
        type: BooleanConstructor;
        default: any;
    };
    suffixIcon: import('vue-types').VueTypeValidableDef<any>;
    notFoundContent: import('vue-types').VueTypeValidableDef<any>;
    itemIcon: import('vue-types').VueTypeValidableDef<any>;
    choiceTransitionName: {
        type: import('vue').PropType<"">;
        default: "";
    };
    popupClassName: StringConstructor;
    placement: {
        type: import('vue').PropType<"bottomLeft" | "bottomRight" | "topLeft" | "topRight">;
        default: "bottomLeft" | "bottomRight" | "topLeft" | "topRight";
    };
    showAction: {
        type: import('vue').PropType<("click" | "focus")[]>;
    };
    onDeselect: import('vue').PropType<import('ant-design-vue/lib/vc-select/Select').SelectHandler<(string | number) | LabeledValue, import('ant-design-vue/lib/select').DefaultOptionType>>;
    onSearch: import('vue').PropType<(value: string) => void>;
    fieldNames: import('vue').PropType<import('ant-design-vue/lib/vc-select/Select').FieldNames>;
    dropdownStyle: {
        type: import('vue').PropType<import('vue').CSSProperties>;
    };
    dropdownRender: {
        type: import('vue').PropType<import('ant-design-vue/lib/vc-select/BaseSelect').DropdownRender>;
    };
    showSearch: {
        type: BooleanConstructor;
        default: any;
    };
    searchValue: StringConstructor;
    onInputKeyDown: import('vue').PropType<(e: KeyboardEvent) => void>;
    removeIcon: import('vue-types').VueTypeValidableDef<any>;
    maxTagCount: {
        type: import('vue').PropType<number | "responsive">;
    };
    maxTagTextLength: NumberConstructor;
    maxTagPlaceholder: import('vue-types').VueTypeValidableDef<any>;
    tokenSeparators: {
        type: import('vue').PropType<string[]>;
    };
    tagRender: {
        type: import('vue').PropType<(props: import('ant-design-vue/lib/vc-select/BaseSelect').CustomTagProps) => any>;
    };
    optionLabelRender: {
        type: import('vue').PropType<(option: Record<string, any>) => any>;
    };
    onClear: import('vue').PropType<() => void>;
    onDropdownVisibleChange: {
        type: import('vue').PropType<(open: boolean) => void>;
    };
    showArrow: {
        type: BooleanConstructor;
        default: any;
    };
    onPopupScroll: import('vue').PropType<(e: UIEvent) => void>;
    menuItemSelectedIcon: import('vue-types').VueTypeValidableDef<any>;
    listItemHeight: NumberConstructor;
    inputValue: StringConstructor;
    autoClearSearchValue: {
        type: BooleanConstructor;
        default: any;
    };
    filterOption: {
        type: import('vue').PropType<boolean | import('ant-design-vue/lib/vc-select/Select').FilterFunc<import('ant-design-vue/lib/select').DefaultOptionType>>;
        default: any;
    };
    filterSort: import('vue').PropType<(optionA: import('ant-design-vue/lib/select').DefaultOptionType, optionB: import('ant-design-vue/lib/select').DefaultOptionType) => number>;
    optionFilterProp: StringConstructor;
    optionLabelProp: StringConstructor;
    defaultActiveFirstOption: {
        type: BooleanConstructor;
        default: any;
    };
    labelInValue: {
        type: BooleanConstructor;
        default: any;
    };
}>, () => import("vue/jsx-runtime").JSX.Element, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    /** 防抖动时间 默认10 单位ms */
    debounceTime: {
        type: PropType<number>;
        default: undefined;
    };
    /** 自定义搜索方法, 返回搜索结果的 Promise */
    request: {
        type: PropType<(params: {
            query: string;
        }) => Promise<DataValueType<Record<string, any>>[]>>;
        default: undefined;
    };
    /** 自定义选项渲染 */
    optionItemRender: {
        type: PropType<(item: DataValueType<Record<string, any>>) => VueNode>;
        default: undefined;
    };
    /** 指定组件中的值 */
    value: {
        type: PropType<KeyLabel | KeyLabel[]>;
        default: undefined;
    };
    /** 指定默认选中的条目 */
    defaultValue: {
        type: PropType<KeyLabel | KeyLabel[]>;
        default: undefined;
    };
    options: {
        type: PropType<RequestOptionsType[]>;
        default: undefined;
    };
    /**
     * 是否在输入框聚焦时触发搜索
     *
     * @default false
     */
    searchOnFocus: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 选择完一个之后是否清空搜索项重新搜索
     *
     * @default false
     */
    resetAfterSelect: {
        type: PropType<boolean>;
        default: boolean;
    };
    /** 刷新数据 */
    fetchData: {
        type: PropType<(keyWord?: string) => void>;
        default: undefined;
    };
    /** 清空数据 */
    resetData: {
        type: PropType<() => void>;
        default: undefined;
    };
    /**
     * 当搜索关键词发生变化时是否请求远程数据
     *
     * @default true
     */
    fetchDataOnSearch: {
        type: PropType<boolean>;
        default: boolean;
    };
    /** 默认搜索关键词 */
    defaultSearchValue: {
        type: PropType<string>;
        default: undefined;
    };
    /**
     * 在选择时保留选项的原始标签文本
     * 当设置为 true 时，选中后回填的内容将使用选项的原始 label，而不是经过 optionItemRender 处理后的内容
     * @default false
     */
    preserveOriginalLabel: {
        type: PropType<boolean>;
        default: boolean;
    };
    size: {
        type: import('vue').PropType<import('ant-design-vue/lib/button').ButtonSize>;
        default: import('ant-design-vue/lib/button').ButtonSize;
    };
    onChange: import('vue').PropType<(value: import('ant-design-vue/lib/select').SelectValue, option: import('ant-design-vue/lib/select').DefaultOptionType | import('ant-design-vue/lib/select').DefaultOptionType[]) => void>;
    prefixCls: StringConstructor;
    disabled: {
        type: BooleanConstructor;
        default: any;
    };
    onFocus: {
        type: import('vue').PropType<(e: FocusEvent) => void>;
    };
    onBlur: {
        type: import('vue').PropType<(e: FocusEvent) => void>;
    };
    onKeydown: import('vue').PropType<(e: KeyboardEvent) => void>;
    onKeyup: import('vue').PropType<(e: KeyboardEvent) => void>;
    onClick: import('vue').PropType<(e: MouseEvent) => void>;
    onMousedown: import('vue').PropType<(e: MouseEvent) => void>;
    onMouseenter: import('vue').PropType<(e: MouseEvent) => void>;
    onMouseleave: import('vue').PropType<(e: MouseEvent) => void>;
    onSelect: import('vue').PropType<import('ant-design-vue/lib/vc-select/Select').SelectHandler<(string | number) | LabeledValue, import('ant-design-vue/lib/select').DefaultOptionType>>;
    children: import('vue').PropType<import('ant-design-vue/lib/_util/type').VueNode[]>;
    open: {
        type: BooleanConstructor;
        default: any;
    };
    id: StringConstructor;
    mode: {
        type: import('vue').PropType<"multiple" | "tags" | "SECRET_COMBOBOX_MODE_DO_NOT_USE">;
        default: "multiple" | "tags" | "SECRET_COMBOBOX_MODE_DO_NOT_USE";
    };
    placeholder: import('vue-types').VueTypeValidableDef<any>;
    listHeight: NumberConstructor;
    direction: {
        type: import('vue').PropType<"rtl" | "ltr">;
    };
    animation: StringConstructor;
    virtual: {
        type: BooleanConstructor;
        default: any;
    };
    dropdownMatchSelectWidth: {
        type: import('vue').PropType<number | boolean>;
        default: any;
    };
    getPopupContainer: {
        type: import('vue').PropType<import('ant-design-vue/lib/vc-select/BaseSelect').RenderDOMFunc>;
    };
    autofocus: BooleanConstructor;
    loading: {
        type: BooleanConstructor;
        default: any;
    };
    bordered: {
        type: BooleanConstructor;
        default: boolean;
    };
    'onUpdate:value': {
        type: import('vue').PropType<(val: import('ant-design-vue/lib/select').SelectValue) => void>;
        default: (val: import('ant-design-vue/lib/select').SelectValue) => void;
    };
    status: {
        type: import('vue').PropType<"" | "error" | "warning">;
        default: "" | "error" | "warning";
    };
    clearIcon: import('vue-types').VueTypeValidableDef<any>;
    allowClear: {
        type: BooleanConstructor;
        default: any;
    };
    tabindex: NumberConstructor;
    dropdownClassName: StringConstructor;
    dropdownAlign: import('vue').PropType<import('ant-design-vue/lib/vc-trigger/interface').AlignType>;
    transitionName: StringConstructor;
    defaultOpen: {
        type: BooleanConstructor;
        default: any;
    };
    suffixIcon: import('vue-types').VueTypeValidableDef<any>;
    notFoundContent: import('vue-types').VueTypeValidableDef<any>;
    itemIcon: import('vue-types').VueTypeValidableDef<any>;
    choiceTransitionName: {
        type: import('vue').PropType<"">;
        default: "";
    };
    popupClassName: StringConstructor;
    placement: {
        type: import('vue').PropType<"bottomLeft" | "bottomRight" | "topLeft" | "topRight">;
        default: "bottomLeft" | "bottomRight" | "topLeft" | "topRight";
    };
    showAction: {
        type: import('vue').PropType<("click" | "focus")[]>;
    };
    onDeselect: import('vue').PropType<import('ant-design-vue/lib/vc-select/Select').SelectHandler<(string | number) | LabeledValue, import('ant-design-vue/lib/select').DefaultOptionType>>;
    onSearch: import('vue').PropType<(value: string) => void>;
    fieldNames: import('vue').PropType<import('ant-design-vue/lib/vc-select/Select').FieldNames>;
    dropdownStyle: {
        type: import('vue').PropType<import('vue').CSSProperties>;
    };
    dropdownRender: {
        type: import('vue').PropType<import('ant-design-vue/lib/vc-select/BaseSelect').DropdownRender>;
    };
    showSearch: {
        type: BooleanConstructor;
        default: any;
    };
    searchValue: StringConstructor;
    onInputKeyDown: import('vue').PropType<(e: KeyboardEvent) => void>;
    removeIcon: import('vue-types').VueTypeValidableDef<any>;
    maxTagCount: {
        type: import('vue').PropType<number | "responsive">;
    };
    maxTagTextLength: NumberConstructor;
    maxTagPlaceholder: import('vue-types').VueTypeValidableDef<any>;
    tokenSeparators: {
        type: import('vue').PropType<string[]>;
    };
    tagRender: {
        type: import('vue').PropType<(props: import('ant-design-vue/lib/vc-select/BaseSelect').CustomTagProps) => any>;
    };
    optionLabelRender: {
        type: import('vue').PropType<(option: Record<string, any>) => any>;
    };
    onClear: import('vue').PropType<() => void>;
    onDropdownVisibleChange: {
        type: import('vue').PropType<(open: boolean) => void>;
    };
    showArrow: {
        type: BooleanConstructor;
        default: any;
    };
    onPopupScroll: import('vue').PropType<(e: UIEvent) => void>;
    menuItemSelectedIcon: import('vue-types').VueTypeValidableDef<any>;
    listItemHeight: NumberConstructor;
    inputValue: StringConstructor;
    autoClearSearchValue: {
        type: BooleanConstructor;
        default: any;
    };
    filterOption: {
        type: import('vue').PropType<boolean | import('ant-design-vue/lib/vc-select/Select').FilterFunc<import('ant-design-vue/lib/select').DefaultOptionType>>;
        default: any;
    };
    filterSort: import('vue').PropType<(optionA: import('ant-design-vue/lib/select').DefaultOptionType, optionB: import('ant-design-vue/lib/select').DefaultOptionType) => number>;
    optionFilterProp: StringConstructor;
    optionLabelProp: StringConstructor;
    defaultActiveFirstOption: {
        type: BooleanConstructor;
        default: any;
    };
    labelInValue: {
        type: BooleanConstructor;
        default: any;
    };
}>> & Readonly<{}>, {
    size: import('ant-design-vue/lib/button').ButtonSize;
    value: KeyLabel | KeyLabel[];
    defaultValue: KeyLabel | KeyLabel[];
    disabled: boolean;
    open: boolean;
    mode: "multiple" | "tags" | "SECRET_COMBOBOX_MODE_DO_NOT_USE";
    virtual: boolean;
    dropdownMatchSelectWidth: number | boolean;
    autofocus: boolean;
    loading: boolean;
    bordered: boolean;
    'onUpdate:value': (val: import('ant-design-vue/lib/select').SelectValue) => void;
    status: "" | "error" | "warning";
    allowClear: boolean;
    defaultOpen: boolean;
    choiceTransitionName: "";
    placement: "bottomLeft" | "bottomRight" | "topLeft" | "topRight";
    options: RequestOptionsType[];
    showSearch: boolean;
    showArrow: boolean;
    autoClearSearchValue: boolean;
    filterOption: boolean | import('ant-design-vue/lib/vc-select/Select').FilterFunc<import('ant-design-vue/lib/select').DefaultOptionType>;
    defaultActiveFirstOption: boolean;
    labelInValue: boolean;
    debounceTime: number;
    request: (params: {
        query: string;
    }) => Promise<DataValueType<Record<string, any>>[]>;
    optionItemRender: (item: DataValueType<Record<string, any>>) => VueNode;
    searchOnFocus: boolean;
    resetAfterSelect: boolean;
    fetchData: (keyWord?: string) => void;
    resetData: () => void;
    fetchDataOnSearch: boolean;
    defaultSearchValue: string;
    preserveOriginalLabel: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default SearchSelect;

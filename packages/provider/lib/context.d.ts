import { InjectionKey, Ref } from 'vue';
import { VueNode } from 'ant-design-vue/lib/_util/type';
import { Theme } from 'ant-design-vue/lib/_util/cssinjs';
import { IntlType } from './intl';
import { ProAliasToken } from './useStyle';
/**
 * 用于配置 ValueEnum 的通用配置
 */
export type ProSchemaValueEnumType = {
    /** @name 演示的文案 */
    text: VueNode;
    /** @name 预定的颜色 */
    status?: string;
    /** @name 自定义的颜色 */
    color?: string;
    /** @name 是否禁用 */
    disabled?: boolean;
};
/**
 * 支持 Map 和 Object
 *
 * @name ValueEnum 的类型
 */
type ProSchemaValueEnumMap = Map<string | number | boolean, ProSchemaValueEnumType | VueNode>;
/**
 * 支持 Map 和 Object
 */
type ProSchemaValueEnumObj = Record<string, ProSchemaValueEnumType | VueNode>;
export type ProFieldFCMode = 'read' | 'edit' | 'update';
/**
 * BaseProFieldFC 的类型设置
 */
export type BaseProFieldFC = {
    /** 值的类型 */
    text: VueNode;
    /** 放置到组件上 props */
    fieldProps?: any;
    /**
     * 组件的渲染模式类型
     * @option read 渲染只读模式
     * @option edit 渲染编辑模式
     * */
    mode: ProFieldFCMode;
    /**
     * 简约模式
     */
    plain?: boolean;
    /** 轻量模式 */
    light?: boolean;
    /** Label */
    label?: VueNode;
    /** 映射值的类型 */
    valueEnum?: ProSchemaValueEnumObj | ProSchemaValueEnumMap;
};
/** Render 第二个参数，里面包含了一些常用的参数 */
export type ProFieldFCRenderProps = {
    mode?: ProFieldFCMode;
    readonly?: boolean;
    placeholder?: string | string[];
    value?: any;
    onChange?: (...rest: any[]) => void;
} & BaseProFieldFC;
export type ProRenderFieldPropsType = {
    /**
     * 自定义只读模式的渲染器
     * @params props 关于dom的配置
     * @params dom 默认的 dom
     * @return 返回一个用于读的 dom
     */
    customRender?: ((text: any, props: Omit<ProFieldFCRenderProps, 'value' | 'onChange'>, dom: VueNode) => VueNode) | undefined;
    /**
     * 一个自定义的编辑渲染器。
     * @params text 默认的值类型
     * @params props 关于dom的配置
     * @params dom 默认的 dom
     * @return 返回一个用于编辑的dom
     */
    renderFormItem?: ((text: any, props: ProFieldFCRenderProps, dom: VueNode) => VueNode) | undefined;
};
/**
 * 自带的token 配置
 */
export type ConfigContextPropsType = {
    intl?: IntlType;
    valueTypeMap?: Record<string, ProRenderFieldPropsType>;
    token: ProAliasToken;
    hashId?: string;
    hashed?: boolean;
    dark?: boolean;
    compact?: boolean;
    theme?: Theme<any, any>;
};
export declare const proConfigProviderKey: InjectionKey<Ref<ConfigContextPropsType>>;
/**
 * Provide the ProConfig context to child components.
 * @param props - The context value (should be a Ref for reactivity)
 */
export declare const useProConfigContextProvider: (props: Ref<ConfigContextPropsType>) => void;
/**
 * Inject the ProConfig context. If not found, use the default value.
 * @returns The context value (as a Ref)
 */
export declare const useProConfigContextInject: () => Ref<{
    intl?: {
        locale: string;
        getMessage: (message: {
            id: string;
            defaultMessage?: string;
        }) => string | undefined;
    } | undefined;
    valueTypeMap?: Record<string, ProRenderFieldPropsType> | undefined;
    token: {
        colorFillContentHover: string;
        colorFillAlter: string;
        colorFillContent: string;
        colorBgContainerDisabled: string;
        colorBgTextHover: string;
        colorBgTextActive: string;
        colorBorderBg: string;
        colorSplit: string;
        colorTextPlaceholder: string;
        colorTextDisabled: string;
        colorTextHeading: string;
        colorTextLabel: string;
        colorTextDescription: string;
        colorTextLightSolid: string;
        colorIcon: string;
        colorIconHover: string;
        colorLink: string;
        colorLinkHover: string;
        colorLinkActive: string;
        colorHighlight: string;
        controlOutline: string;
        colorWarningOutline: string;
        colorErrorOutline: string;
        fontSizeIcon: number;
        fontWeightStrong: number;
        controlOutlineWidth: number;
        controlItemBgHover: string;
        controlItemBgActive: string;
        controlItemBgActiveHover: string;
        controlInteractiveSize: number;
        controlItemBgActiveDisabled: string;
        paddingXXS: number;
        paddingXS: number;
        paddingSM: number;
        padding: number;
        paddingMD: number;
        paddingLG: number;
        paddingXL: number;
        paddingContentHorizontalLG: number;
        paddingContentHorizontal: number;
        paddingContentHorizontalSM: number;
        paddingContentVerticalLG: number;
        paddingContentVertical: number;
        paddingContentVerticalSM: number;
        marginXXS: number;
        marginXS: number;
        marginSM: number;
        margin: number;
        marginMD: number;
        marginLG: number;
        marginXL: number;
        marginXXL: number;
        opacityLoading: number;
        boxShadow: string;
        boxShadowSecondary: string;
        boxShadowTertiary: string;
        linkDecoration: import('vue').CSSProperties["textDecoration"];
        linkHoverDecoration: import('vue').CSSProperties["textDecoration"];
        linkFocusDecoration: import('vue').CSSProperties["textDecoration"];
        controlPaddingHorizontal: number;
        controlPaddingHorizontalSM: number;
        screenXS: number;
        screenXSMin: number;
        screenXSMax: number;
        screenSM: number;
        screenSMMin: number;
        screenSMMax: number;
        screenMD: number;
        screenMDMin: number;
        screenMDMax: number;
        screenLG: number;
        screenLGMin: number;
        screenLGMax: number;
        screenXL: number;
        screenXLMin: number;
        screenXLMax: number;
        screenXXL: number;
        screenXXLMin: number;
        screenXXLMax: number;
        screenXXXL: number;
        screenXXXLMin: number;
        controlTmpOutline: string;
        colorPrimary: string;
        colorSuccess: string;
        colorWarning: string;
        colorError: string;
        colorInfo: string;
        colorTextBase: string;
        colorBgBase: string;
        fontFamily: string;
        fontSize: number;
        lineWidth: number;
        lineType: string;
        borderRadius: number;
        sizeUnit: number;
        sizeStep: number;
        sizePopupArrow: number;
        controlHeight: number;
        zIndexBase: number;
        zIndexPopupBase: number;
        opacityImage: number;
        motionUnit: number;
        motionBase: number;
        motionEaseOutCirc: string;
        motionEaseInOutCirc: string;
        motionEaseInOut: string;
        motionEaseOutBack: string;
        motionEaseInBack: string;
        motionEaseInQuint: string;
        motionEaseOutQuint: string;
        motionEaseOut: string;
        wireframe: boolean;
        blue: string;
        purple: string;
        cyan: string;
        green: string;
        magenta: string;
        pink: string;
        red: string;
        orange: string;
        yellow: string;
        volcano: string;
        geekblue: string;
        lime: string;
        gold: string;
        "blue-1": string;
        "blue-4": string;
        "blue-8": string;
        "blue-2": string;
        "blue-3": string;
        "blue-5": string;
        "blue-6": string;
        "blue-7": string;
        "blue-9": string;
        "blue-10": string;
        "purple-1": string;
        "purple-4": string;
        "purple-8": string;
        "purple-2": string;
        "purple-3": string;
        "purple-5": string;
        "purple-6": string;
        "purple-7": string;
        "purple-9": string;
        "purple-10": string;
        "cyan-1": string;
        "cyan-4": string;
        "cyan-8": string;
        "cyan-2": string;
        "cyan-3": string;
        "cyan-5": string;
        "cyan-6": string;
        "cyan-7": string;
        "cyan-9": string;
        "cyan-10": string;
        "green-1": string;
        "green-4": string;
        "green-8": string;
        "green-2": string;
        "green-3": string;
        "green-5": string;
        "green-6": string;
        "green-7": string;
        "green-9": string;
        "green-10": string;
        "magenta-1": string;
        "magenta-4": string;
        "magenta-8": string;
        "magenta-2": string;
        "magenta-3": string;
        "magenta-5": string;
        "magenta-6": string;
        "magenta-7": string;
        "magenta-9": string;
        "magenta-10": string;
        "pink-1": string;
        "pink-4": string;
        "pink-8": string;
        "pink-2": string;
        "pink-3": string;
        "pink-5": string;
        "pink-6": string;
        "pink-7": string;
        "pink-9": string;
        "pink-10": string;
        "red-1": string;
        "red-4": string;
        "red-8": string;
        "red-2": string;
        "red-3": string;
        "red-5": string;
        "red-6": string;
        "red-7": string;
        "red-9": string;
        "red-10": string;
        "orange-1": string;
        "orange-4": string;
        "orange-8": string;
        "orange-2": string;
        "orange-3": string;
        "orange-5": string;
        "orange-6": string;
        "orange-7": string;
        "orange-9": string;
        "orange-10": string;
        "yellow-1": string;
        "yellow-4": string;
        "yellow-8": string;
        "yellow-2": string;
        "yellow-3": string;
        "yellow-5": string;
        "yellow-6": string;
        "yellow-7": string;
        "yellow-9": string;
        "yellow-10": string;
        "volcano-1": string;
        "volcano-4": string;
        "volcano-8": string;
        "volcano-2": string;
        "volcano-3": string;
        "volcano-5": string;
        "volcano-6": string;
        "volcano-7": string;
        "volcano-9": string;
        "volcano-10": string;
        "geekblue-1": string;
        "geekblue-4": string;
        "geekblue-8": string;
        "geekblue-2": string;
        "geekblue-3": string;
        "geekblue-5": string;
        "geekblue-6": string;
        "geekblue-7": string;
        "geekblue-9": string;
        "geekblue-10": string;
        "lime-1": string;
        "lime-4": string;
        "lime-8": string;
        "lime-2": string;
        "lime-3": string;
        "lime-5": string;
        "lime-6": string;
        "lime-7": string;
        "lime-9": string;
        "lime-10": string;
        "gold-1": string;
        "gold-4": string;
        "gold-8": string;
        "gold-2": string;
        "gold-3": string;
        "gold-5": string;
        "gold-6": string;
        "gold-7": string;
        "gold-9": string;
        "gold-10": string;
        colorWhite: string;
        colorBgMask: string;
        colorText: string;
        colorTextSecondary: string;
        colorTextTertiary: string;
        colorTextQuaternary: string;
        colorBorder: string;
        colorBorderSecondary: string;
        colorFill: string;
        colorFillSecondary: string;
        colorFillTertiary: string;
        colorFillQuaternary: string;
        colorBgLayout: string;
        colorBgContainer: string;
        colorBgElevated: string;
        colorBgSpotlight: string;
        colorPrimaryBg: string;
        colorPrimaryBgHover: string;
        colorPrimaryBorder: string;
        colorPrimaryBorderHover: string;
        colorPrimaryHover: string;
        colorPrimaryActive: string;
        colorPrimaryTextHover: string;
        colorPrimaryText: string;
        colorPrimaryTextActive: string;
        colorSuccessBg: string;
        colorSuccessBgHover: string;
        colorSuccessBorder: string;
        colorSuccessBorderHover: string;
        colorSuccessHover: string;
        colorSuccessActive: string;
        colorSuccessTextHover: string;
        colorSuccessText: string;
        colorSuccessTextActive: string;
        colorWarningBg: string;
        colorWarningBgHover: string;
        colorWarningBorder: string;
        colorWarningBorderHover: string;
        colorWarningHover: string;
        colorWarningActive: string;
        colorWarningTextHover: string;
        colorWarningText: string;
        colorWarningTextActive: string;
        colorErrorBg: string;
        colorErrorBgHover: string;
        colorErrorBorder: string;
        colorErrorBorderHover: string;
        colorErrorHover: string;
        colorErrorActive: string;
        colorErrorTextHover: string;
        colorErrorText: string;
        colorErrorTextActive: string;
        colorInfoBg: string;
        colorInfoBgHover: string;
        colorInfoBorder: string;
        colorInfoBorderHover: string;
        colorInfoHover: string;
        colorInfoActive: string;
        colorInfoTextHover: string;
        colorInfoText: string;
        colorInfoTextActive: string;
        sizeXXL: number;
        sizeXL: number;
        sizeLG: number;
        sizeMD: number;
        sizeMS: number;
        size: number;
        sizeSM: number;
        sizeXS: number;
        sizeXXS: number;
        controlHeightXS: number;
        controlHeightSM: number;
        controlHeightLG: number;
        lineWidthBold: number;
        borderRadiusXS: number;
        borderRadiusSM: number;
        borderRadiusLG: number;
        borderRadiusOuter: number;
        fontSizeSM: number;
        fontSizeLG: number;
        fontSizeXL: number;
        fontSizeHeading1: number;
        fontSizeHeading2: number;
        fontSizeHeading3: number;
        fontSizeHeading4: number;
        fontSizeHeading5: number;
        lineHeight: number;
        lineHeightLG: number;
        lineHeightSM: number;
        lineHeightHeading1: number;
        lineHeightHeading2: number;
        lineHeightHeading3: number;
        lineHeightHeading4: number;
        lineHeightHeading5: number;
        motionDurationFast: string;
        motionDurationMid: string;
        motionDurationSlow: string;
        Affix?: {} | undefined;
        Alert?: import('ant-design-vue/lib/alert/style').ComponentToken | undefined;
        Anchor?: import('ant-design-vue/lib/anchor/style').ComponentToken | undefined;
        Avatar?: {
            containerSize: number;
            containerSizeLG: number;
            containerSizeSM: number;
            textFontSize: number;
            textFontSizeLG: number;
            textFontSizeSM: number;
            groupSpace: number;
            groupOverlapping: number;
            groupBorderColor: string;
        } | undefined;
        Badge?: {} | undefined;
        Button?: import('ant-design-vue/lib/button/style').ComponentToken | undefined;
        Breadcrumb?: {} | undefined;
        Card?: import('ant-design-vue/lib/card/style').ComponentToken | undefined;
        Carousel?: {
            dotWidth: number;
            dotHeight: number;
            dotWidthActive: number;
        } | undefined;
        Cascader?: {
            controlWidth: number;
            controlItemWidth: number;
            dropdownHeight: number;
        } | undefined;
        Checkbox?: import('ant-design-vue/lib/checkbox/style').ComponentToken | undefined;
        Collapse?: import('ant-design-vue/lib/collapse/style').ComponentToken | undefined;
        Comment?: {} | undefined;
        DatePicker?: {
            presetsWidth: number;
            presetsMaxWidth: number;
            zIndexPopup: number;
        } | undefined;
        Descriptions?: {} | undefined;
        Divider?: {
            sizePaddingEdgeHorizontal: number;
        } | undefined;
        Drawer?: {
            zIndexPopup: number;
        } | undefined;
        Dropdown?: {
            zIndexPopup: number;
        } | undefined;
        Empty?: import('ant-design-vue/lib/empty/style').ComponentToken | undefined;
        FloatButton?: {
            zIndexPopup: number;
        } | undefined;
        Form?: {} | undefined;
        Grid?: {} | undefined;
        Image?: {
            zIndexPopup: number;
            previewOperationSize: number;
            previewOperationColor: string;
            previewOperationColorDisabled: string;
        } | undefined;
        Input?: {} | undefined;
        InputNumber?: {
            controlWidth: number;
            handleWidth: number;
            handleFontSize: number;
            handleVisible: "auto" | true;
        } | undefined;
        Layout?: {
            colorBgHeader: string;
            colorBgBody: string;
            colorBgTrigger: string;
        } | undefined;
        List?: {
            contentWidth: number;
        } | undefined;
        Mentions?: {
            zIndexPopup: number;
            dropdownHeight: number;
            controlItemWidth: number;
        } | undefined;
        Notification?: {
            zIndexPopup: number;
            width: number;
        } | undefined;
        PageHeader?: {} | undefined;
        Pagination?: {} | undefined;
        Popover?: {
            zIndexPopup: number;
            width: number;
        } | undefined;
        Popconfirm?: {
            zIndexPopup: number;
        } | undefined;
        Rate?: import('ant-design-vue/lib/rate/style').ComponentToken | undefined;
        Radio?: import('ant-design-vue/lib/radio/style').ComponentToken | undefined;
        Result?: {
            imageWidth: number;
            imageHeight: number;
        } | undefined;
        Segmented?: import('ant-design-vue/lib/segmented/style').ComponentToken | undefined;
        Select?: {
            zIndexPopup: number;
        } | undefined;
        Skeleton?: {
            color: string;
            colorGradientEnd: string;
        } | undefined;
        Slider?: {
            controlSize: number;
            railSize: number;
            handleSize: number;
            handleSizeHover: number;
            handleLineWidth: number;
            handleLineWidthHover: number;
            dotSize: number;
        } | undefined;
        Spin?: {
            contentHeight: number;
        } | undefined;
        Statistic?: {} | undefined;
        Switch?: {} | undefined;
        Tag?: import('ant-design-vue/lib/tag/style').ComponentToken | undefined;
        Tree?: {} | undefined;
        TreeSelect?: {} | undefined;
        Typography?: {
            sizeMarginHeadingVerticalStart: number | string;
            sizeMarginHeadingVerticalEnd: number | string;
        } | undefined;
        Timeline?: import('ant-design-vue/lib/timeline/style').ComponentToken | undefined;
        Transfer?: {
            listWidth: number;
            listWidthLG: number;
            listHeight: number;
        } | undefined;
        Tabs?: {
            zIndexPopup: number;
        } | undefined;
        Calendar?: {
            yearControlWidth: number;
            monthControlWidth: number;
            miniContentHeight: number;
        } | undefined;
        Steps?: {
            descriptionWidth: number;
        } | undefined;
        Menu?: {
            dropdownWidth: number;
            zIndexPopup: number;
            colorGroupTitle: string;
            radiusItem: number;
            radiusSubMenuItem: number;
            colorItemText: string;
            colorItemTextHover: string;
            colorItemTextHoverHorizontal: string;
            colorItemTextSelected: string;
            colorItemTextSelectedHorizontal: string;
            colorItemTextDisabled: string;
            colorDangerItemText: string;
            colorDangerItemTextHover: string;
            colorDangerItemTextSelected: string;
            colorDangerItemBgActive: string;
            colorDangerItemBgSelected: string;
            colorItemBg: string;
            colorItemBgHover: string;
            colorSubItemBg: string;
            colorItemBgActive: string;
            colorItemBgSelected: string;
            colorItemBgSelectedHorizontal: string;
            colorActiveBarWidth: number;
            colorActiveBarHeight: number;
            colorActiveBarBorderSize: number;
            itemMarginInline: number;
        } | undefined;
        Modal?: import('ant-design-vue/lib/modal/style').ComponentToken | undefined;
        Message?: {
            height: number;
            zIndexPopup: number;
        } | undefined;
        Upload?: import('ant-design-vue/lib/upload/style').ComponentToken | undefined;
        Tooltip?: {
            zIndexPopup: number;
            colorBgDefault: string;
        } | undefined;
        Table?: import('ant-design-vue/lib/table/style').ComponentToken | undefined;
        Space?: import('ant-design-vue/lib/space/style').ComponentToken | undefined;
        Progress?: import('ant-design-vue/lib/progress/style').ComponentToken | undefined;
        Tour?: import('ant-design-vue/lib/tour/style').ComponentToken | undefined;
        QRCode?: import('ant-design-vue/lib/qrcode/style').ComponentToken | undefined;
        App?: import('ant-design-vue/lib/app/style').ComponentToken | undefined;
        Flex?: import('ant-design-vue/lib/flex/style').ComponentToken | undefined;
        Wave?: import('ant-design-vue/lib/_util/wave/style').ComponentToken | undefined;
        layout?: {
            hashId?: string | undefined;
            colorPrimary?: string | undefined;
            colorBgAppListIconHover?: string | undefined;
            colorTextAppListIconHover?: string | undefined;
            colorTextAppListIcon?: string | undefined;
            bgLayout?: string | undefined;
            header?: {
                colorBgHeader?: string | undefined;
                colorHeaderTitle?: string | undefined;
                colorBgMenuItemHover?: string | undefined;
                colorBgMenuItemSelected?: string | undefined;
                colorBgMenuItemSelectedHorizontal?: string | undefined;
                colorTextMenuSelected?: string | undefined;
                colorTextMenuActive?: string | undefined;
                colorTextMenu?: string | undefined;
                colorTextMenuSecondary?: string | undefined;
                colorBgRightActionsItemHover?: string | undefined;
                colorTextRightActionsItem?: string | undefined;
                heightLayoutHeader?: number | undefined;
            } | undefined;
            sider?: {
                colorMenuBackground?: string | undefined;
                colorSubMenuBackground?: string | undefined;
                menuHeight?: number | undefined;
                colorBgMenuItemCollapsedElevated?: string | undefined;
                colorMenuItemDivider?: string | undefined;
                colorBgMenuItemHover?: string | undefined;
                colorBgMenuItemActive?: string | undefined;
                colorBgMenuItemSelectedHorizontal?: string | undefined;
                colorBgMenuItemSelected?: string | undefined;
                colorTextMenuActiveBarWidth?: number | undefined;
                colorTextMenuActiveBarHeight?: number | undefined;
                colorTextMenuActiveBarBorderSize?: number | undefined;
                colorTextMenuSelected?: string | undefined;
                colorTextMenuItemHover?: string | undefined;
                colorTextMenuActive?: string | undefined;
                colorTextMenu?: string | undefined;
                colorTextMenuSecondary?: string | undefined;
                colorTextMenuTitle?: string | undefined;
                colorTextSubMenuSelected?: string | undefined;
            } | undefined;
            pageContainer?: {
                colorBgPageContainer?: string | undefined;
                paddingInlinePageContainerContent?: number | undefined;
                paddingBlockPageContainerContent?: number | undefined;
                colorBgPageContainerFixed?: string | undefined;
            } | undefined;
        } | undefined;
        themeId: number;
        proComponentsCls: string;
        antCls: string;
        iconCls?: string | undefined;
    };
    hashId?: string | undefined;
    hashed?: boolean | undefined;
    dark?: boolean | undefined;
    compact?: boolean | undefined;
    theme?: {
        readonly id: number;
        getDerivativeToken: (token: any) => any;
    } | undefined;
}, ConfigContextPropsType | {
    intl?: {
        locale: string;
        getMessage: (message: {
            id: string;
            defaultMessage?: string;
        }) => string | undefined;
    } | undefined;
    valueTypeMap?: Record<string, ProRenderFieldPropsType> | undefined;
    token: {
        colorFillContentHover: string;
        colorFillAlter: string;
        colorFillContent: string;
        colorBgContainerDisabled: string;
        colorBgTextHover: string;
        colorBgTextActive: string;
        colorBorderBg: string;
        colorSplit: string;
        colorTextPlaceholder: string;
        colorTextDisabled: string;
        colorTextHeading: string;
        colorTextLabel: string;
        colorTextDescription: string;
        colorTextLightSolid: string;
        colorIcon: string;
        colorIconHover: string;
        colorLink: string;
        colorLinkHover: string;
        colorLinkActive: string;
        colorHighlight: string;
        controlOutline: string;
        colorWarningOutline: string;
        colorErrorOutline: string;
        fontSizeIcon: number;
        fontWeightStrong: number;
        controlOutlineWidth: number;
        controlItemBgHover: string;
        controlItemBgActive: string;
        controlItemBgActiveHover: string;
        controlInteractiveSize: number;
        controlItemBgActiveDisabled: string;
        paddingXXS: number;
        paddingXS: number;
        paddingSM: number;
        padding: number;
        paddingMD: number;
        paddingLG: number;
        paddingXL: number;
        paddingContentHorizontalLG: number;
        paddingContentHorizontal: number;
        paddingContentHorizontalSM: number;
        paddingContentVerticalLG: number;
        paddingContentVertical: number;
        paddingContentVerticalSM: number;
        marginXXS: number;
        marginXS: number;
        marginSM: number;
        margin: number;
        marginMD: number;
        marginLG: number;
        marginXL: number;
        marginXXL: number;
        opacityLoading: number;
        boxShadow: string;
        boxShadowSecondary: string;
        boxShadowTertiary: string;
        linkDecoration: import('vue').CSSProperties["textDecoration"];
        linkHoverDecoration: import('vue').CSSProperties["textDecoration"];
        linkFocusDecoration: import('vue').CSSProperties["textDecoration"];
        controlPaddingHorizontal: number;
        controlPaddingHorizontalSM: number;
        screenXS: number;
        screenXSMin: number;
        screenXSMax: number;
        screenSM: number;
        screenSMMin: number;
        screenSMMax: number;
        screenMD: number;
        screenMDMin: number;
        screenMDMax: number;
        screenLG: number;
        screenLGMin: number;
        screenLGMax: number;
        screenXL: number;
        screenXLMin: number;
        screenXLMax: number;
        screenXXL: number;
        screenXXLMin: number;
        screenXXLMax: number;
        screenXXXL: number;
        screenXXXLMin: number;
        controlTmpOutline: string;
        colorPrimary: string;
        colorSuccess: string;
        colorWarning: string;
        colorError: string;
        colorInfo: string;
        colorTextBase: string;
        colorBgBase: string;
        fontFamily: string;
        fontSize: number;
        lineWidth: number;
        lineType: string;
        borderRadius: number;
        sizeUnit: number;
        sizeStep: number;
        sizePopupArrow: number;
        controlHeight: number;
        zIndexBase: number;
        zIndexPopupBase: number;
        opacityImage: number;
        motionUnit: number;
        motionBase: number;
        motionEaseOutCirc: string;
        motionEaseInOutCirc: string;
        motionEaseInOut: string;
        motionEaseOutBack: string;
        motionEaseInBack: string;
        motionEaseInQuint: string;
        motionEaseOutQuint: string;
        motionEaseOut: string;
        wireframe: boolean;
        blue: string;
        purple: string;
        cyan: string;
        green: string;
        magenta: string;
        pink: string;
        red: string;
        orange: string;
        yellow: string;
        volcano: string;
        geekblue: string;
        lime: string;
        gold: string;
        "blue-1": string;
        "blue-4": string;
        "blue-8": string;
        "blue-2": string;
        "blue-3": string;
        "blue-5": string;
        "blue-6": string;
        "blue-7": string;
        "blue-9": string;
        "blue-10": string;
        "purple-1": string;
        "purple-4": string;
        "purple-8": string;
        "purple-2": string;
        "purple-3": string;
        "purple-5": string;
        "purple-6": string;
        "purple-7": string;
        "purple-9": string;
        "purple-10": string;
        "cyan-1": string;
        "cyan-4": string;
        "cyan-8": string;
        "cyan-2": string;
        "cyan-3": string;
        "cyan-5": string;
        "cyan-6": string;
        "cyan-7": string;
        "cyan-9": string;
        "cyan-10": string;
        "green-1": string;
        "green-4": string;
        "green-8": string;
        "green-2": string;
        "green-3": string;
        "green-5": string;
        "green-6": string;
        "green-7": string;
        "green-9": string;
        "green-10": string;
        "magenta-1": string;
        "magenta-4": string;
        "magenta-8": string;
        "magenta-2": string;
        "magenta-3": string;
        "magenta-5": string;
        "magenta-6": string;
        "magenta-7": string;
        "magenta-9": string;
        "magenta-10": string;
        "pink-1": string;
        "pink-4": string;
        "pink-8": string;
        "pink-2": string;
        "pink-3": string;
        "pink-5": string;
        "pink-6": string;
        "pink-7": string;
        "pink-9": string;
        "pink-10": string;
        "red-1": string;
        "red-4": string;
        "red-8": string;
        "red-2": string;
        "red-3": string;
        "red-5": string;
        "red-6": string;
        "red-7": string;
        "red-9": string;
        "red-10": string;
        "orange-1": string;
        "orange-4": string;
        "orange-8": string;
        "orange-2": string;
        "orange-3": string;
        "orange-5": string;
        "orange-6": string;
        "orange-7": string;
        "orange-9": string;
        "orange-10": string;
        "yellow-1": string;
        "yellow-4": string;
        "yellow-8": string;
        "yellow-2": string;
        "yellow-3": string;
        "yellow-5": string;
        "yellow-6": string;
        "yellow-7": string;
        "yellow-9": string;
        "yellow-10": string;
        "volcano-1": string;
        "volcano-4": string;
        "volcano-8": string;
        "volcano-2": string;
        "volcano-3": string;
        "volcano-5": string;
        "volcano-6": string;
        "volcano-7": string;
        "volcano-9": string;
        "volcano-10": string;
        "geekblue-1": string;
        "geekblue-4": string;
        "geekblue-8": string;
        "geekblue-2": string;
        "geekblue-3": string;
        "geekblue-5": string;
        "geekblue-6": string;
        "geekblue-7": string;
        "geekblue-9": string;
        "geekblue-10": string;
        "lime-1": string;
        "lime-4": string;
        "lime-8": string;
        "lime-2": string;
        "lime-3": string;
        "lime-5": string;
        "lime-6": string;
        "lime-7": string;
        "lime-9": string;
        "lime-10": string;
        "gold-1": string;
        "gold-4": string;
        "gold-8": string;
        "gold-2": string;
        "gold-3": string;
        "gold-5": string;
        "gold-6": string;
        "gold-7": string;
        "gold-9": string;
        "gold-10": string;
        colorWhite: string;
        colorBgMask: string;
        colorText: string;
        colorTextSecondary: string;
        colorTextTertiary: string;
        colorTextQuaternary: string;
        colorBorder: string;
        colorBorderSecondary: string;
        colorFill: string;
        colorFillSecondary: string;
        colorFillTertiary: string;
        colorFillQuaternary: string;
        colorBgLayout: string;
        colorBgContainer: string;
        colorBgElevated: string;
        colorBgSpotlight: string;
        colorPrimaryBg: string;
        colorPrimaryBgHover: string;
        colorPrimaryBorder: string;
        colorPrimaryBorderHover: string;
        colorPrimaryHover: string;
        colorPrimaryActive: string;
        colorPrimaryTextHover: string;
        colorPrimaryText: string;
        colorPrimaryTextActive: string;
        colorSuccessBg: string;
        colorSuccessBgHover: string;
        colorSuccessBorder: string;
        colorSuccessBorderHover: string;
        colorSuccessHover: string;
        colorSuccessActive: string;
        colorSuccessTextHover: string;
        colorSuccessText: string;
        colorSuccessTextActive: string;
        colorWarningBg: string;
        colorWarningBgHover: string;
        colorWarningBorder: string;
        colorWarningBorderHover: string;
        colorWarningHover: string;
        colorWarningActive: string;
        colorWarningTextHover: string;
        colorWarningText: string;
        colorWarningTextActive: string;
        colorErrorBg: string;
        colorErrorBgHover: string;
        colorErrorBorder: string;
        colorErrorBorderHover: string;
        colorErrorHover: string;
        colorErrorActive: string;
        colorErrorTextHover: string;
        colorErrorText: string;
        colorErrorTextActive: string;
        colorInfoBg: string;
        colorInfoBgHover: string;
        colorInfoBorder: string;
        colorInfoBorderHover: string;
        colorInfoHover: string;
        colorInfoActive: string;
        colorInfoTextHover: string;
        colorInfoText: string;
        colorInfoTextActive: string;
        sizeXXL: number;
        sizeXL: number;
        sizeLG: number;
        sizeMD: number;
        sizeMS: number;
        size: number;
        sizeSM: number;
        sizeXS: number;
        sizeXXS: number;
        controlHeightXS: number;
        controlHeightSM: number;
        controlHeightLG: number;
        lineWidthBold: number;
        borderRadiusXS: number;
        borderRadiusSM: number;
        borderRadiusLG: number;
        borderRadiusOuter: number;
        fontSizeSM: number;
        fontSizeLG: number;
        fontSizeXL: number;
        fontSizeHeading1: number;
        fontSizeHeading2: number;
        fontSizeHeading3: number;
        fontSizeHeading4: number;
        fontSizeHeading5: number;
        lineHeight: number;
        lineHeightLG: number;
        lineHeightSM: number;
        lineHeightHeading1: number;
        lineHeightHeading2: number;
        lineHeightHeading3: number;
        lineHeightHeading4: number;
        lineHeightHeading5: number;
        motionDurationFast: string;
        motionDurationMid: string;
        motionDurationSlow: string;
        Affix?: {} | undefined;
        Alert?: import('ant-design-vue/lib/alert/style').ComponentToken | undefined;
        Anchor?: import('ant-design-vue/lib/anchor/style').ComponentToken | undefined;
        Avatar?: {
            containerSize: number;
            containerSizeLG: number;
            containerSizeSM: number;
            textFontSize: number;
            textFontSizeLG: number;
            textFontSizeSM: number;
            groupSpace: number;
            groupOverlapping: number;
            groupBorderColor: string;
        } | undefined;
        Badge?: {} | undefined;
        Button?: import('ant-design-vue/lib/button/style').ComponentToken | undefined;
        Breadcrumb?: {} | undefined;
        Card?: import('ant-design-vue/lib/card/style').ComponentToken | undefined;
        Carousel?: {
            dotWidth: number;
            dotHeight: number;
            dotWidthActive: number;
        } | undefined;
        Cascader?: {
            controlWidth: number;
            controlItemWidth: number;
            dropdownHeight: number;
        } | undefined;
        Checkbox?: import('ant-design-vue/lib/checkbox/style').ComponentToken | undefined;
        Collapse?: import('ant-design-vue/lib/collapse/style').ComponentToken | undefined;
        Comment?: {} | undefined;
        DatePicker?: {
            presetsWidth: number;
            presetsMaxWidth: number;
            zIndexPopup: number;
        } | undefined;
        Descriptions?: {} | undefined;
        Divider?: {
            sizePaddingEdgeHorizontal: number;
        } | undefined;
        Drawer?: {
            zIndexPopup: number;
        } | undefined;
        Dropdown?: {
            zIndexPopup: number;
        } | undefined;
        Empty?: import('ant-design-vue/lib/empty/style').ComponentToken | undefined;
        FloatButton?: {
            zIndexPopup: number;
        } | undefined;
        Form?: {} | undefined;
        Grid?: {} | undefined;
        Image?: {
            zIndexPopup: number;
            previewOperationSize: number;
            previewOperationColor: string;
            previewOperationColorDisabled: string;
        } | undefined;
        Input?: {} | undefined;
        InputNumber?: {
            controlWidth: number;
            handleWidth: number;
            handleFontSize: number;
            handleVisible: "auto" | true;
        } | undefined;
        Layout?: {
            colorBgHeader: string;
            colorBgBody: string;
            colorBgTrigger: string;
        } | undefined;
        List?: {
            contentWidth: number;
        } | undefined;
        Mentions?: {
            zIndexPopup: number;
            dropdownHeight: number;
            controlItemWidth: number;
        } | undefined;
        Notification?: {
            zIndexPopup: number;
            width: number;
        } | undefined;
        PageHeader?: {} | undefined;
        Pagination?: {} | undefined;
        Popover?: {
            zIndexPopup: number;
            width: number;
        } | undefined;
        Popconfirm?: {
            zIndexPopup: number;
        } | undefined;
        Rate?: import('ant-design-vue/lib/rate/style').ComponentToken | undefined;
        Radio?: import('ant-design-vue/lib/radio/style').ComponentToken | undefined;
        Result?: {
            imageWidth: number;
            imageHeight: number;
        } | undefined;
        Segmented?: import('ant-design-vue/lib/segmented/style').ComponentToken | undefined;
        Select?: {
            zIndexPopup: number;
        } | undefined;
        Skeleton?: {
            color: string;
            colorGradientEnd: string;
        } | undefined;
        Slider?: {
            controlSize: number;
            railSize: number;
            handleSize: number;
            handleSizeHover: number;
            handleLineWidth: number;
            handleLineWidthHover: number;
            dotSize: number;
        } | undefined;
        Spin?: {
            contentHeight: number;
        } | undefined;
        Statistic?: {} | undefined;
        Switch?: {} | undefined;
        Tag?: import('ant-design-vue/lib/tag/style').ComponentToken | undefined;
        Tree?: {} | undefined;
        TreeSelect?: {} | undefined;
        Typography?: {
            sizeMarginHeadingVerticalStart: number | string;
            sizeMarginHeadingVerticalEnd: number | string;
        } | undefined;
        Timeline?: import('ant-design-vue/lib/timeline/style').ComponentToken | undefined;
        Transfer?: {
            listWidth: number;
            listWidthLG: number;
            listHeight: number;
        } | undefined;
        Tabs?: {
            zIndexPopup: number;
        } | undefined;
        Calendar?: {
            yearControlWidth: number;
            monthControlWidth: number;
            miniContentHeight: number;
        } | undefined;
        Steps?: {
            descriptionWidth: number;
        } | undefined;
        Menu?: {
            dropdownWidth: number;
            zIndexPopup: number;
            colorGroupTitle: string;
            radiusItem: number;
            radiusSubMenuItem: number;
            colorItemText: string;
            colorItemTextHover: string;
            colorItemTextHoverHorizontal: string;
            colorItemTextSelected: string;
            colorItemTextSelectedHorizontal: string;
            colorItemTextDisabled: string;
            colorDangerItemText: string;
            colorDangerItemTextHover: string;
            colorDangerItemTextSelected: string;
            colorDangerItemBgActive: string;
            colorDangerItemBgSelected: string;
            colorItemBg: string;
            colorItemBgHover: string;
            colorSubItemBg: string;
            colorItemBgActive: string;
            colorItemBgSelected: string;
            colorItemBgSelectedHorizontal: string;
            colorActiveBarWidth: number;
            colorActiveBarHeight: number;
            colorActiveBarBorderSize: number;
            itemMarginInline: number;
        } | undefined;
        Modal?: import('ant-design-vue/lib/modal/style').ComponentToken | undefined;
        Message?: {
            height: number;
            zIndexPopup: number;
        } | undefined;
        Upload?: import('ant-design-vue/lib/upload/style').ComponentToken | undefined;
        Tooltip?: {
            zIndexPopup: number;
            colorBgDefault: string;
        } | undefined;
        Table?: import('ant-design-vue/lib/table/style').ComponentToken | undefined;
        Space?: import('ant-design-vue/lib/space/style').ComponentToken | undefined;
        Progress?: import('ant-design-vue/lib/progress/style').ComponentToken | undefined;
        Tour?: import('ant-design-vue/lib/tour/style').ComponentToken | undefined;
        QRCode?: import('ant-design-vue/lib/qrcode/style').ComponentToken | undefined;
        App?: import('ant-design-vue/lib/app/style').ComponentToken | undefined;
        Flex?: import('ant-design-vue/lib/flex/style').ComponentToken | undefined;
        Wave?: import('ant-design-vue/lib/_util/wave/style').ComponentToken | undefined;
        layout?: {
            hashId?: string | undefined;
            colorPrimary?: string | undefined;
            colorBgAppListIconHover?: string | undefined;
            colorTextAppListIconHover?: string | undefined;
            colorTextAppListIcon?: string | undefined;
            bgLayout?: string | undefined;
            header?: {
                colorBgHeader?: string | undefined;
                colorHeaderTitle?: string | undefined;
                colorBgMenuItemHover?: string | undefined;
                colorBgMenuItemSelected?: string | undefined;
                colorBgMenuItemSelectedHorizontal?: string | undefined;
                colorTextMenuSelected?: string | undefined;
                colorTextMenuActive?: string | undefined;
                colorTextMenu?: string | undefined;
                colorTextMenuSecondary?: string | undefined;
                colorBgRightActionsItemHover?: string | undefined;
                colorTextRightActionsItem?: string | undefined;
                heightLayoutHeader?: number | undefined;
            } | undefined;
            sider?: {
                colorMenuBackground?: string | undefined;
                colorSubMenuBackground?: string | undefined;
                menuHeight?: number | undefined;
                colorBgMenuItemCollapsedElevated?: string | undefined;
                colorMenuItemDivider?: string | undefined;
                colorBgMenuItemHover?: string | undefined;
                colorBgMenuItemActive?: string | undefined;
                colorBgMenuItemSelectedHorizontal?: string | undefined;
                colorBgMenuItemSelected?: string | undefined;
                colorTextMenuActiveBarWidth?: number | undefined;
                colorTextMenuActiveBarHeight?: number | undefined;
                colorTextMenuActiveBarBorderSize?: number | undefined;
                colorTextMenuSelected?: string | undefined;
                colorTextMenuItemHover?: string | undefined;
                colorTextMenuActive?: string | undefined;
                colorTextMenu?: string | undefined;
                colorTextMenuSecondary?: string | undefined;
                colorTextMenuTitle?: string | undefined;
                colorTextSubMenuSelected?: string | undefined;
            } | undefined;
            pageContainer?: {
                colorBgPageContainer?: string | undefined;
                paddingInlinePageContainerContent?: number | undefined;
                paddingBlockPageContainerContent?: number | undefined;
                colorBgPageContainerFixed?: string | undefined;
            } | undefined;
        } | undefined;
        themeId: number;
        proComponentsCls: string;
        antCls: string;
        iconCls?: string | undefined;
    };
    hashId?: string | undefined;
    hashed?: boolean | undefined;
    dark?: boolean | undefined;
    compact?: boolean | undefined;
    theme?: {
        readonly id: number;
        getDerivativeToken: (token: any) => any;
    } | undefined;
}>;
export {};

import { ExtractPropTypes, PropType } from 'vue';
import { HeaderRender, HeaderTitleRender } from '../../RenderTypings';
import { GenerateStyle } from '@ant-design-vue/pro-provider';
export declare const headerViewProps: () => {
    isMobile: PropType<boolean>;
    collapsedWidth: PropType<number>;
    headerRender: {
        type: PropType<HeaderRender>;
        default: undefined;
    };
    siderWidth: PropType<number>;
    hasSiderMenu: {
        type: PropType<boolean>;
        default: undefined;
    };
    headerTitleRender: {
        type: PropType<HeaderTitleRender>;
        default: undefined;
    };
    collapsed: PropType<boolean>;
    onCollapse: {
        type: PropType<(collapsed: boolean) => void>;
        default: undefined;
    };
    logo: {
        type: PropType<import('ant-design-vue/es/_util/type').VueNode>;
        default: undefined;
    };
    menuRender: {
        type: PropType<import('../../RenderTypings').MenuRender>;
        default: undefined;
    };
    menuProps: {
        type: PropType<import('ant-design-vue').MenuProps>;
        default: undefined;
    };
    prefixCls: PropType<string>;
    appList: PropType<import('../AppsLogoComponents/typing').AppListProps>;
    itemClick: PropType<(item: import('../AppsLogoComponents/typing').AppItemProps, popoverRef: import('vue').Ref<HTMLSpanElement | null>) => void>;
    menuData: PropType<import('../..').MenuDataItem[]>;
    onMenuHeaderClick: {
        type: PropType<(e: import('vue').Events["onClick"]) => void>;
        default: undefined;
    };
    menuHeaderRender: {
        type: PropType<import('../../RenderTypings').MenuHeaderRender>;
        default: undefined;
    };
    token: PropType<import('@ant-design-vue/pro-provider').ProTokenType["layout"]>;
    headerContentRender: {
        type: PropType<import('../../RenderTypings').HeaderContentRender>;
        default: undefined;
    };
    actionsRender: {
        type: PropType<import('../../RenderTypings').ActionsRender>;
        default: undefined;
    };
    avatarProps: {
        type: PropType<import('../GlobalHeader/ActionsContent').AvatarPropsType>;
        default: undefined;
    };
    formatMessage: PropType<(message: import('../../typing').MessageDescriptor) => string>;
    appListRender: PropType<import('../../RenderTypings').AppListRender>;
    navTheme: {
        type: PropType<import('../../defaultSettings').PureSettings["navTheme"]>;
        default: "light" | "dark" | "realDark" | undefined;
    };
    layout: {
        type: PropType<import('../../defaultSettings').PureSettings["layout"]>;
        default: "top" | "left" | "side" | "mix" | undefined;
    };
    contentWidth: {
        type: PropType<import('../../defaultSettings').PureSettings["contentWidth"]>;
        default: import('../../defaultSettings').ContentWidth | undefined;
    };
    fixedHeader: {
        type: PropType<import('../../defaultSettings').PureSettings["fixedHeader"]>;
        default: boolean | undefined;
    };
    fixedSiderbar: {
        type: PropType<import('../../defaultSettings').PureSettings["fixedSiderbar"]>;
        default: boolean | undefined;
    };
    compact: {
        type: PropType<import('../../defaultSettings').PureSettings["compact"]>;
        default: boolean | undefined;
    };
    menu: {
        type: PropType<import('../../defaultSettings').PureSettings["menu"]>;
        default: () => {
            locale?: boolean;
            hideMenuWhenCollapsed?: boolean;
            collapsedShowTitle?: boolean;
            collapsedShowGroupTitle?: boolean;
            defaultOpenAll?: boolean;
            ignoreFlatMenu?: boolean;
            type?: "sub" | "group";
            autoClose?: false;
        } | undefined;
    };
    title: {
        type: PropType<import('../../defaultSettings').PureSettings["title"]>;
        default: string | false | undefined;
    };
    iconfontUrl: {
        type: PropType<import('../../defaultSettings').PureSettings["iconfontUrl"]>;
        default: string | undefined;
    };
    colorPrimary: {
        type: PropType<import('../../defaultSettings').PureSettings["colorPrimary"]>;
        default: string | undefined;
    };
    colorWeak: {
        type: PropType<import('../../defaultSettings').PureSettings["colorWeak"]>;
        default: boolean | undefined;
    };
    splitMenus: {
        type: PropType<import('../../defaultSettings').PureSettings["splitMenus"]>;
        default: boolean | undefined;
    };
    suppressSiderWhenMenuEmpty: {
        type: PropType<import('../../defaultSettings').PureSettings["suppressSiderWhenMenuEmpty"]>;
        default: boolean | undefined;
    };
    siderMenuType: {
        type: PropType<import('../../defaultSettings').PureSettings["siderMenuType"]>;
        default: "sub" | "group" | undefined;
    };
};
export type HeaderViewProps = Partial<ExtractPropTypes<ReturnType<typeof headerViewProps>>>;
declare const HeaderView: import('vue').DefineComponent<ExtractPropTypes<{
    matchMenuKeys: PropType<string[]>;
    originCollapsed: {
        type: PropType<boolean>;
        default: undefined;
    };
    menuRenderType: PropType<"header" | "sider">;
    stylish: PropType<GenerateStyle<import('../SiderMenu/style/stylish').SiderMenuToken>>;
    isMobile: PropType<boolean>;
    collapsedWidth: PropType<number>;
    headerRender: {
        type: PropType<HeaderRender>;
        default: undefined;
    };
    siderWidth: PropType<number>;
    hasSiderMenu: {
        type: PropType<boolean>;
        default: undefined;
    };
    headerTitleRender: {
        type: PropType<HeaderTitleRender>;
        default: undefined;
    };
    collapsed: PropType<boolean>;
    onCollapse: {
        type: PropType<(collapsed: boolean) => void>;
        default: undefined;
    };
    logo: {
        type: PropType<import('ant-design-vue/es/_util/type').VueNode>;
        default: undefined;
    };
    menuRender: {
        type: PropType<import('../../RenderTypings').MenuRender>;
        default: undefined;
    };
    menuProps: {
        type: PropType<import('ant-design-vue').MenuProps>;
        default: undefined;
    };
    prefixCls: PropType<string>;
    appList: PropType<import('../AppsLogoComponents/typing').AppListProps>;
    itemClick: PropType<(item: import('../AppsLogoComponents/typing').AppItemProps, popoverRef: import('vue').Ref<HTMLSpanElement | null>) => void>;
    menuData: PropType<import('../..').MenuDataItem[]>;
    onMenuHeaderClick: {
        type: PropType<(e: import('vue').Events["onClick"]) => void>;
        default: undefined;
    };
    menuHeaderRender: {
        type: PropType<import('../../RenderTypings').MenuHeaderRender>;
        default: undefined;
    };
    token: PropType<import('@ant-design-vue/pro-provider').ProTokenType["layout"]>;
    headerContentRender: {
        type: PropType<import('../../RenderTypings').HeaderContentRender>;
        default: undefined;
    };
    actionsRender: {
        type: PropType<import('../../RenderTypings').ActionsRender>;
        default: undefined;
    };
    avatarProps: {
        type: PropType<import('../GlobalHeader/ActionsContent').AvatarPropsType>;
        default: undefined;
    };
    formatMessage: PropType<(message: import('../../typing').MessageDescriptor) => string>;
    appListRender: PropType<import('../../RenderTypings').AppListRender>;
    navTheme: {
        type: PropType<import('../../defaultSettings').PureSettings["navTheme"]>;
        default: "light" | "dark" | "realDark" | undefined;
    };
    layout: {
        type: PropType<import('../../defaultSettings').PureSettings["layout"]>;
        default: "top" | "left" | "side" | "mix" | undefined;
    };
    contentWidth: {
        type: PropType<import('../../defaultSettings').PureSettings["contentWidth"]>;
        default: import('../../defaultSettings').ContentWidth | undefined;
    };
    fixedHeader: {
        type: PropType<import('../../defaultSettings').PureSettings["fixedHeader"]>;
        default: boolean | undefined;
    };
    fixedSiderbar: {
        type: PropType<import('../../defaultSettings').PureSettings["fixedSiderbar"]>;
        default: boolean | undefined;
    };
    compact: {
        type: PropType<import('../../defaultSettings').PureSettings["compact"]>;
        default: boolean | undefined;
    };
    menu: {
        type: PropType<import('../../defaultSettings').PureSettings["menu"]>;
        default: () => {
            locale?: boolean;
            hideMenuWhenCollapsed?: boolean;
            collapsedShowTitle?: boolean;
            collapsedShowGroupTitle?: boolean;
            defaultOpenAll?: boolean;
            ignoreFlatMenu?: boolean;
            type?: "sub" | "group";
            autoClose?: false;
        } | undefined;
    };
    title: {
        type: PropType<import('../../defaultSettings').PureSettings["title"]>;
        default: string | false | undefined;
    };
    iconfontUrl: {
        type: PropType<import('../../defaultSettings').PureSettings["iconfontUrl"]>;
        default: string | undefined;
    };
    colorPrimary: {
        type: PropType<import('../../defaultSettings').PureSettings["colorPrimary"]>;
        default: string | undefined;
    };
    colorWeak: {
        type: PropType<import('../../defaultSettings').PureSettings["colorWeak"]>;
        default: boolean | undefined;
    };
    splitMenus: {
        type: PropType<import('../../defaultSettings').PureSettings["splitMenus"]>;
        default: boolean | undefined;
    };
    suppressSiderWhenMenuEmpty: {
        type: PropType<import('../../defaultSettings').PureSettings["suppressSiderWhenMenuEmpty"]>;
        default: boolean | undefined;
    };
    siderMenuType: {
        type: PropType<import('../../defaultSettings').PureSettings["siderMenuType"]>;
        default: "sub" | "group" | undefined;
    };
}>, () => import('ant-design-vue/es/_util/type').VueNode, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<ExtractPropTypes<{
    matchMenuKeys: PropType<string[]>;
    originCollapsed: {
        type: PropType<boolean>;
        default: undefined;
    };
    menuRenderType: PropType<"header" | "sider">;
    stylish: PropType<GenerateStyle<import('../SiderMenu/style/stylish').SiderMenuToken>>;
    isMobile: PropType<boolean>;
    collapsedWidth: PropType<number>;
    headerRender: {
        type: PropType<HeaderRender>;
        default: undefined;
    };
    siderWidth: PropType<number>;
    hasSiderMenu: {
        type: PropType<boolean>;
        default: undefined;
    };
    headerTitleRender: {
        type: PropType<HeaderTitleRender>;
        default: undefined;
    };
    collapsed: PropType<boolean>;
    onCollapse: {
        type: PropType<(collapsed: boolean) => void>;
        default: undefined;
    };
    logo: {
        type: PropType<import('ant-design-vue/es/_util/type').VueNode>;
        default: undefined;
    };
    menuRender: {
        type: PropType<import('../../RenderTypings').MenuRender>;
        default: undefined;
    };
    menuProps: {
        type: PropType<import('ant-design-vue').MenuProps>;
        default: undefined;
    };
    prefixCls: PropType<string>;
    appList: PropType<import('../AppsLogoComponents/typing').AppListProps>;
    itemClick: PropType<(item: import('../AppsLogoComponents/typing').AppItemProps, popoverRef: import('vue').Ref<HTMLSpanElement | null>) => void>;
    menuData: PropType<import('../..').MenuDataItem[]>;
    onMenuHeaderClick: {
        type: PropType<(e: import('vue').Events["onClick"]) => void>;
        default: undefined;
    };
    menuHeaderRender: {
        type: PropType<import('../../RenderTypings').MenuHeaderRender>;
        default: undefined;
    };
    token: PropType<import('@ant-design-vue/pro-provider').ProTokenType["layout"]>;
    headerContentRender: {
        type: PropType<import('../../RenderTypings').HeaderContentRender>;
        default: undefined;
    };
    actionsRender: {
        type: PropType<import('../../RenderTypings').ActionsRender>;
        default: undefined;
    };
    avatarProps: {
        type: PropType<import('../GlobalHeader/ActionsContent').AvatarPropsType>;
        default: undefined;
    };
    formatMessage: PropType<(message: import('../../typing').MessageDescriptor) => string>;
    appListRender: PropType<import('../../RenderTypings').AppListRender>;
    navTheme: {
        type: PropType<import('../../defaultSettings').PureSettings["navTheme"]>;
        default: "light" | "dark" | "realDark" | undefined;
    };
    layout: {
        type: PropType<import('../../defaultSettings').PureSettings["layout"]>;
        default: "top" | "left" | "side" | "mix" | undefined;
    };
    contentWidth: {
        type: PropType<import('../../defaultSettings').PureSettings["contentWidth"]>;
        default: import('../../defaultSettings').ContentWidth | undefined;
    };
    fixedHeader: {
        type: PropType<import('../../defaultSettings').PureSettings["fixedHeader"]>;
        default: boolean | undefined;
    };
    fixedSiderbar: {
        type: PropType<import('../../defaultSettings').PureSettings["fixedSiderbar"]>;
        default: boolean | undefined;
    };
    compact: {
        type: PropType<import('../../defaultSettings').PureSettings["compact"]>;
        default: boolean | undefined;
    };
    menu: {
        type: PropType<import('../../defaultSettings').PureSettings["menu"]>;
        default: () => {
            locale?: boolean;
            hideMenuWhenCollapsed?: boolean;
            collapsedShowTitle?: boolean;
            collapsedShowGroupTitle?: boolean;
            defaultOpenAll?: boolean;
            ignoreFlatMenu?: boolean;
            type?: "sub" | "group";
            autoClose?: false;
        } | undefined;
    };
    title: {
        type: PropType<import('../../defaultSettings').PureSettings["title"]>;
        default: string | false | undefined;
    };
    iconfontUrl: {
        type: PropType<import('../../defaultSettings').PureSettings["iconfontUrl"]>;
        default: string | undefined;
    };
    colorPrimary: {
        type: PropType<import('../../defaultSettings').PureSettings["colorPrimary"]>;
        default: string | undefined;
    };
    colorWeak: {
        type: PropType<import('../../defaultSettings').PureSettings["colorWeak"]>;
        default: boolean | undefined;
    };
    splitMenus: {
        type: PropType<import('../../defaultSettings').PureSettings["splitMenus"]>;
        default: boolean | undefined;
    };
    suppressSiderWhenMenuEmpty: {
        type: PropType<import('../../defaultSettings').PureSettings["suppressSiderWhenMenuEmpty"]>;
        default: boolean | undefined;
    };
    siderMenuType: {
        type: PropType<import('../../defaultSettings').PureSettings["siderMenuType"]>;
        default: "sub" | "group" | undefined;
    };
}>> & Readonly<{}>, {
    layout: "top" | "left" | "side" | "mix" | undefined;
    compact: boolean | undefined;
    colorPrimary: string | undefined;
    contentWidth: import('../../defaultSettings').ContentWidth | undefined;
    title: string | false | undefined;
    menu: {
        locale?: boolean;
        hideMenuWhenCollapsed?: boolean;
        collapsedShowTitle?: boolean;
        collapsedShowGroupTitle?: boolean;
        defaultOpenAll?: boolean;
        ignoreFlatMenu?: boolean;
        type?: "sub" | "group";
        autoClose?: false;
    } | undefined;
    navTheme: "light" | "dark" | "realDark" | undefined;
    fixedHeader: boolean | undefined;
    fixedSiderbar: boolean | undefined;
    iconfontUrl: string | undefined;
    colorWeak: boolean | undefined;
    splitMenus: boolean | undefined;
    suppressSiderWhenMenuEmpty: boolean | undefined;
    siderMenuType: "sub" | "group" | undefined;
    onCollapse: (collapsed: boolean) => void;
    menuProps: Partial<ExtractPropTypes<{
        id: StringConstructor;
        prefixCls: StringConstructor;
        items: PropType<import('ant-design-vue').ItemType[]>;
        disabled: BooleanConstructor;
        inlineCollapsed: BooleanConstructor;
        disabledOverflow: BooleanConstructor;
        forceSubMenuRender: BooleanConstructor;
        openKeys: PropType<import('ant-design-vue/es/_util/type').Key[]>;
        selectedKeys: PropType<import('ant-design-vue/es/_util/type').Key[]>;
        activeKey: StringConstructor;
        selectable: {
            type: BooleanConstructor;
            default: boolean;
        };
        multiple: {
            type: BooleanConstructor;
            default: boolean;
        };
        tabindex: {
            type: (StringConstructor | NumberConstructor)[];
        };
        motion: PropType<import('ant-design-vue/es/_util/transition').CSSMotionProps>;
        role: StringConstructor;
        theme: {
            type: PropType<import('ant-design-vue').MenuTheme>;
            default: string;
        };
        mode: {
            type: PropType<import('ant-design-vue').MenuMode>;
            default: string;
        };
        inlineIndent: {
            type: NumberConstructor;
            default: number;
        };
        subMenuOpenDelay: {
            type: NumberConstructor;
            default: number;
        };
        subMenuCloseDelay: {
            type: NumberConstructor;
            default: number;
        };
        builtinPlacements: {
            type: PropType<import('ant-design-vue/es/menu/src/interface').BuiltinPlacements>;
        };
        triggerSubMenuAction: {
            type: PropType<import('ant-design-vue/es/menu/src/interface').TriggerSubMenuAction>;
            default: string;
        };
        getPopupContainer: PropType<(node: HTMLElement) => HTMLElement>;
        expandIcon: PropType<(p?: {
            [key: string]: any;
            isOpen: boolean;
        }) => any>;
        onOpenChange: PropType<(keys: import('ant-design-vue/es/_util/type').Key[]) => void>;
        onSelect: PropType<import('ant-design-vue/es/menu/src/interface').SelectEventHandler>;
        onDeselect: PropType<import('ant-design-vue/es/menu/src/interface').SelectEventHandler>;
        onClick: PropType<import('ant-design-vue/es/menu/src/interface').MenuClickEventHandler>;
        onFocus: PropType<import('ant-design-vue/es/_util/EventInterface').FocusEventHandler>;
        onBlur: PropType<import('ant-design-vue/es/_util/EventInterface').FocusEventHandler>;
        onMousedown: PropType<import('ant-design-vue/es/_util/EventInterface').MouseEventHandler>;
        'onUpdate:openKeys': PropType<(keys: import('ant-design-vue/es/_util/type').Key[]) => void>;
        'onUpdate:selectedKeys': PropType<(keys: import('ant-design-vue/es/_util/type').Key[]) => void>;
        'onUpdate:activeKey': PropType<(key: import('ant-design-vue/es/_util/type').Key) => void>;
    }>>;
    originCollapsed: boolean;
    logo: import('ant-design-vue/es/_util/type').VueNode;
    menuHeaderRender: import('../../RenderTypings').MenuHeaderRender;
    avatarProps: import('../GlobalHeader/ActionsContent').AvatarPropsType;
    actionsRender: import('../../RenderTypings').ActionsRender;
    onMenuHeaderClick: (e: import('vue').Events["onClick"]) => void;
    headerRender: HeaderRender;
    headerTitleRender: HeaderTitleRender;
    hasSiderMenu: boolean;
    menuRender: import('../../RenderTypings').MenuRender;
    headerContentRender: import('../../RenderTypings').HeaderContentRender;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default HeaderView;

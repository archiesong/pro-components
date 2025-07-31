import { ExtractPropTypes, CSSProperties } from 'vue';
export declare const topNavHeaderProps: () => {
    matchMenuKeys: import('vue').PropType<string[]>;
    originCollapsed: {
        type: import('vue').PropType<boolean>;
        default: undefined;
    };
    menuRenderType: import('vue').PropType<"header" | "sider">;
    stylish: import('vue').PropType<import('@ant-design-vue/pro-provider').GenerateStyle<import('../SiderMenu/style/stylish').SiderMenuToken>>;
    collapsed: import('vue').PropType<boolean>;
    onCollapse: {
        type: import('vue').PropType<(collapsed: boolean) => void>;
        default: undefined;
    };
    isMobile: {
        type: import('vue').PropType<boolean>;
        default: undefined;
    };
    logo: {
        type: import('vue').PropType<import('ant-design-vue/lib/_util/type').VueNode>;
        default: undefined;
    };
    menuRender: {
        type: import('vue').PropType<import('../../RenderTypings').MenuRender>;
        default: undefined;
    };
    menuProps: {
        type: import('vue').PropType<import('ant-design-vue').MenuProps>;
        default: undefined;
    };
    prefixCls: import('vue').PropType<string>;
    appList: import('vue').PropType<import('../AppsLogoComponents/typing').AppListProps>;
    itemClick: import('vue').PropType<(item: import('../AppsLogoComponents/typing').AppItemProps, popoverRef: import('vue').Ref<HTMLSpanElement | null>) => void>;
    menuData: import('vue').PropType<import('../..').MenuDataItem[]>;
    onMenuHeaderClick: {
        type: import('vue').PropType<(e: import('vue').Events["onClick"]) => void>;
        default: undefined;
    };
    menuHeaderRender: {
        type: import('vue').PropType<import('../../RenderTypings').MenuHeaderRender>;
        default: undefined;
    };
    token: import('vue').PropType<import('@ant-design-vue/pro-provider').ProTokenType["layout"]>;
    headerContentRender: {
        type: import('vue').PropType<import('../../RenderTypings').HeaderContentRender>;
        default: undefined;
    };
    actionsRender: {
        type: import('vue').PropType<import('../../RenderTypings').ActionsRender>;
        default: undefined;
    };
    avatarProps: {
        type: import('vue').PropType<import('../GlobalHeader/ActionsContent').AvatarPropsType>;
        default: undefined;
    };
    formatMessage: import('vue').PropType<(message: import('../../typing').MessageDescriptor) => string>;
    appListRender: import('vue').PropType<import('../../RenderTypings').AppListRender>;
    navTheme: {
        type: import('vue').PropType<import('../../defaultSettings').PureSettings["navTheme"]>;
        default: "light" | "dark" | "realDark" | undefined;
    };
    layout: {
        type: import('vue').PropType<import('../../defaultSettings').PureSettings["layout"]>;
        default: "top" | "left" | "side" | "mix" | undefined;
    };
    contentWidth: {
        type: import('vue').PropType<import('../../defaultSettings').PureSettings["contentWidth"]>;
        default: import('../../defaultSettings').ContentWidth | undefined;
    };
    fixedHeader: {
        type: import('vue').PropType<import('../../defaultSettings').PureSettings["fixedHeader"]>;
        default: boolean | undefined;
    };
    fixedSiderbar: {
        type: import('vue').PropType<import('../../defaultSettings').PureSettings["fixedSiderbar"]>;
        default: boolean | undefined;
    };
    compact: {
        type: import('vue').PropType<import('../../defaultSettings').PureSettings["compact"]>;
        default: boolean | undefined;
    };
    menu: {
        type: import('vue').PropType<import('../../defaultSettings').PureSettings["menu"]>;
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
        type: import('vue').PropType<import('../../defaultSettings').PureSettings["title"]>;
        default: string | false | undefined;
    };
    iconfontUrl: {
        type: import('vue').PropType<import('../../defaultSettings').PureSettings["iconfontUrl"]>;
        default: string | undefined;
    };
    colorPrimary: {
        type: import('vue').PropType<import('../../defaultSettings').PureSettings["colorPrimary"]>;
        default: string | undefined;
    };
    colorWeak: {
        type: import('vue').PropType<import('../../defaultSettings').PureSettings["colorWeak"]>;
        default: boolean | undefined;
    };
    splitMenus: {
        type: import('vue').PropType<import('../../defaultSettings').PureSettings["splitMenus"]>;
        default: boolean | undefined;
    };
    suppressSiderWhenMenuEmpty: {
        type: import('vue').PropType<import('../../defaultSettings').PureSettings["suppressSiderWhenMenuEmpty"]>;
        default: boolean | undefined;
    };
    siderMenuType: {
        type: import('vue').PropType<import('../../defaultSettings').PureSettings["siderMenuType"]>;
        default: "sub" | "group" | undefined;
    };
    collapsedWidth: import('vue').PropType<number>;
    links: {
        type: import('vue').PropType<import('../../typing').WithFalse<{
            icon?: import('vue').VNode;
            title?: string;
            label?: import('vue').VNode;
        }[] | import('ant-design-vue/lib/_util/type').VueNode[]>>;
        default: undefined;
    };
    siderWidth: import('vue').PropType<number>;
    menuContentRender: {
        type: import('vue').PropType<import('../../RenderTypings').MenuContentRender>;
        default: undefined;
    };
    menuFooterRender: {
        type: import('vue').PropType<import('../../RenderTypings').MenuFooterRender>;
        default: undefined;
    };
    collapsedButtonRender: {
        type: import('vue').PropType<import('../../RenderTypings').CollapsedButtonRender>;
        default: undefined;
    };
    siderProps: import('vue').PropType<import('ant-design-vue').SiderProps>;
    breakpoint: {
        type: import('vue').PropType<import('../../typing').WithFalse<import('ant-design-vue/lib/_util/responsiveObserve').Breakpoint>>;
        default: string;
    };
    hide: {
        type: import('vue').PropType<boolean>;
        default: undefined;
    };
    menuExtraRender: {
        type: import('vue').PropType<import('../../RenderTypings').MenuExtraRender>;
        default: undefined;
    };
    logoStyle: {
        type: import('vue').PropType<CSSProperties>;
        default: undefined;
    };
    headerRender: {
        type: import('vue').PropType<import('../../RenderTypings').HeaderRender>;
        default: undefined;
    };
    defaultCollapsed: {
        type: import('vue').PropType<boolean>;
        default: undefined;
    };
    onOpenChange: {
        type: import('vue').PropType<(openKeys?: import('../../typing').WithFalse<import('ant-design-vue/lib/_util/type').Key[]>) => void>;
        default: undefined;
    };
    location: {
        type: import('vue').PropType<{
            pathname: string;
        }>;
        default: undefined;
    };
    openKeys: {
        type: import('vue').PropType<import('../../typing').WithFalse<import('ant-design-vue/lib/_util/type').Key[]>>;
        default: undefined;
    };
    mode: {
        type: import('vue').PropType<import('ant-design-vue').MenuMode>;
        default: undefined;
    };
    menuItemRender: {
        type: import('vue').PropType<import('../../RenderTypings').MenuItemRender>;
        default: undefined;
    };
    subMenuItemRender: {
        type: import('vue').PropType<import('../../RenderTypings').SubMenuItemRender>;
        default: undefined;
    };
    iconPrefixes: import('vue').PropType<string>;
    postMenuData: {
        type: import('vue').PropType<(menusData?: import('../..').MenuDataItem[]) => import('../..').MenuDataItem[]>;
        default: undefined;
    };
    onSelect: import('vue').PropType<(selectedKeys: import('ant-design-vue/lib/_util/type').Key[]) => void>;
    id: StringConstructor;
    items: import('vue').PropType<import('ant-design-vue').ItemType[]>;
    disabled: BooleanConstructor;
    inlineCollapsed: BooleanConstructor;
    disabledOverflow: BooleanConstructor;
    forceSubMenuRender: BooleanConstructor;
    selectedKeys: import('vue').PropType<import('ant-design-vue/lib/_util/type').Key[]>;
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
    motion: import('vue').PropType<import('ant-design-vue/lib/_util/transition').CSSMotionProps>;
    role: StringConstructor;
    theme: {
        type: import('vue').PropType<import('ant-design-vue').MenuTheme>;
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
        type: import('vue').PropType<import('ant-design-vue/lib/menu/src/interface').BuiltinPlacements>;
    };
    triggerSubMenuAction: {
        type: import('vue').PropType<import('ant-design-vue/lib/menu/src/interface').TriggerSubMenuAction>;
        default: string;
    };
    getPopupContainer: import('vue').PropType<(node: HTMLElement) => HTMLElement>;
    expandIcon: import('vue').PropType<(p?: {
        [key: string]: any;
        isOpen: boolean;
    }) => any>;
    onDeselect: import('vue').PropType<import('ant-design-vue/lib/menu/src/interface').SelectEventHandler>;
    onClick: import('vue').PropType<import('ant-design-vue/lib/menu/src/interface').MenuClickEventHandler>;
    onFocus: import('vue').PropType<import('ant-design-vue/lib/_util/EventInterface').FocusEventHandler>;
    onBlur: import('vue').PropType<import('ant-design-vue/lib/_util/EventInterface').FocusEventHandler>;
    onMousedown: import('vue').PropType<import('ant-design-vue/lib/_util/EventInterface').MouseEventHandler>;
    'onUpdate:openKeys': import('vue').PropType<(keys: import('ant-design-vue/lib/_util/type').Key[]) => void>;
    'onUpdate:selectedKeys': import('vue').PropType<(keys: import('ant-design-vue/lib/_util/type').Key[]) => void>;
    'onUpdate:activeKey': import('vue').PropType<(key: import('ant-design-vue/lib/_util/type').Key) => void>;
};
export type TopNavHeaderProps = Partial<ExtractPropTypes<ReturnType<typeof topNavHeaderProps>>>;
declare const TopNavHeader: import('vue').DefineComponent<ExtractPropTypes<{
    matchMenuKeys: import('vue').PropType<string[]>;
    originCollapsed: {
        type: import('vue').PropType<boolean>;
        default: undefined;
    };
    menuRenderType: import('vue').PropType<"header" | "sider">;
    stylish: import('vue').PropType<import('@ant-design-vue/pro-provider').GenerateStyle<import('../SiderMenu/style/stylish').SiderMenuToken>>;
    collapsed: import('vue').PropType<boolean>;
    onCollapse: {
        type: import('vue').PropType<(collapsed: boolean) => void>;
        default: undefined;
    };
    isMobile: {
        type: import('vue').PropType<boolean>;
        default: undefined;
    };
    logo: {
        type: import('vue').PropType<import('ant-design-vue/lib/_util/type').VueNode>;
        default: undefined;
    };
    menuRender: {
        type: import('vue').PropType<import('../../RenderTypings').MenuRender>;
        default: undefined;
    };
    menuProps: {
        type: import('vue').PropType<import('ant-design-vue').MenuProps>;
        default: undefined;
    };
    prefixCls: import('vue').PropType<string>;
    appList: import('vue').PropType<import('../AppsLogoComponents/typing').AppListProps>;
    itemClick: import('vue').PropType<(item: import('../AppsLogoComponents/typing').AppItemProps, popoverRef: import('vue').Ref<HTMLSpanElement | null>) => void>;
    menuData: import('vue').PropType<import('../..').MenuDataItem[]>;
    onMenuHeaderClick: {
        type: import('vue').PropType<(e: import('vue').Events["onClick"]) => void>;
        default: undefined;
    };
    menuHeaderRender: {
        type: import('vue').PropType<import('../../RenderTypings').MenuHeaderRender>;
        default: undefined;
    };
    token: import('vue').PropType<import('@ant-design-vue/pro-provider').ProTokenType["layout"]>;
    headerContentRender: {
        type: import('vue').PropType<import('../../RenderTypings').HeaderContentRender>;
        default: undefined;
    };
    actionsRender: {
        type: import('vue').PropType<import('../../RenderTypings').ActionsRender>;
        default: undefined;
    };
    avatarProps: {
        type: import('vue').PropType<import('../GlobalHeader/ActionsContent').AvatarPropsType>;
        default: undefined;
    };
    formatMessage: import('vue').PropType<(message: import('../../typing').MessageDescriptor) => string>;
    appListRender: import('vue').PropType<import('../../RenderTypings').AppListRender>;
    navTheme: {
        type: import('vue').PropType<import('../../defaultSettings').PureSettings["navTheme"]>;
        default: "light" | "dark" | "realDark" | undefined;
    };
    layout: {
        type: import('vue').PropType<import('../../defaultSettings').PureSettings["layout"]>;
        default: "top" | "left" | "side" | "mix" | undefined;
    };
    contentWidth: {
        type: import('vue').PropType<import('../../defaultSettings').PureSettings["contentWidth"]>;
        default: import('../../defaultSettings').ContentWidth | undefined;
    };
    fixedHeader: {
        type: import('vue').PropType<import('../../defaultSettings').PureSettings["fixedHeader"]>;
        default: boolean | undefined;
    };
    fixedSiderbar: {
        type: import('vue').PropType<import('../../defaultSettings').PureSettings["fixedSiderbar"]>;
        default: boolean | undefined;
    };
    compact: {
        type: import('vue').PropType<import('../../defaultSettings').PureSettings["compact"]>;
        default: boolean | undefined;
    };
    menu: {
        type: import('vue').PropType<import('../../defaultSettings').PureSettings["menu"]>;
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
        type: import('vue').PropType<import('../../defaultSettings').PureSettings["title"]>;
        default: string | false | undefined;
    };
    iconfontUrl: {
        type: import('vue').PropType<import('../../defaultSettings').PureSettings["iconfontUrl"]>;
        default: string | undefined;
    };
    colorPrimary: {
        type: import('vue').PropType<import('../../defaultSettings').PureSettings["colorPrimary"]>;
        default: string | undefined;
    };
    colorWeak: {
        type: import('vue').PropType<import('../../defaultSettings').PureSettings["colorWeak"]>;
        default: boolean | undefined;
    };
    splitMenus: {
        type: import('vue').PropType<import('../../defaultSettings').PureSettings["splitMenus"]>;
        default: boolean | undefined;
    };
    suppressSiderWhenMenuEmpty: {
        type: import('vue').PropType<import('../../defaultSettings').PureSettings["suppressSiderWhenMenuEmpty"]>;
        default: boolean | undefined;
    };
    siderMenuType: {
        type: import('vue').PropType<import('../../defaultSettings').PureSettings["siderMenuType"]>;
        default: "sub" | "group" | undefined;
    };
    collapsedWidth: import('vue').PropType<number>;
    links: {
        type: import('vue').PropType<import('../../typing').WithFalse<{
            icon?: import('vue').VNode;
            title?: string;
            label?: import('vue').VNode;
        }[] | import('ant-design-vue/lib/_util/type').VueNode[]>>;
        default: undefined;
    };
    siderWidth: import('vue').PropType<number>;
    menuContentRender: {
        type: import('vue').PropType<import('../../RenderTypings').MenuContentRender>;
        default: undefined;
    };
    menuFooterRender: {
        type: import('vue').PropType<import('../../RenderTypings').MenuFooterRender>;
        default: undefined;
    };
    collapsedButtonRender: {
        type: import('vue').PropType<import('../../RenderTypings').CollapsedButtonRender>;
        default: undefined;
    };
    siderProps: import('vue').PropType<import('ant-design-vue').SiderProps>;
    breakpoint: {
        type: import('vue').PropType<import('../../typing').WithFalse<import('ant-design-vue/lib/_util/responsiveObserve').Breakpoint>>;
        default: string;
    };
    hide: {
        type: import('vue').PropType<boolean>;
        default: undefined;
    };
    menuExtraRender: {
        type: import('vue').PropType<import('../../RenderTypings').MenuExtraRender>;
        default: undefined;
    };
    logoStyle: {
        type: import('vue').PropType<CSSProperties>;
        default: undefined;
    };
    headerRender: {
        type: import('vue').PropType<import('../../RenderTypings').HeaderRender>;
        default: undefined;
    };
    defaultCollapsed: {
        type: import('vue').PropType<boolean>;
        default: undefined;
    };
    onOpenChange: {
        type: import('vue').PropType<(openKeys?: import('../../typing').WithFalse<import('ant-design-vue/lib/_util/type').Key[]>) => void>;
        default: undefined;
    };
    location: {
        type: import('vue').PropType<{
            pathname: string;
        }>;
        default: undefined;
    };
    openKeys: {
        type: import('vue').PropType<import('../../typing').WithFalse<import('ant-design-vue/lib/_util/type').Key[]>>;
        default: undefined;
    };
    mode: {
        type: import('vue').PropType<import('ant-design-vue').MenuMode>;
        default: undefined;
    };
    menuItemRender: {
        type: import('vue').PropType<import('../../RenderTypings').MenuItemRender>;
        default: undefined;
    };
    subMenuItemRender: {
        type: import('vue').PropType<import('../../RenderTypings').SubMenuItemRender>;
        default: undefined;
    };
    iconPrefixes: import('vue').PropType<string>;
    postMenuData: {
        type: import('vue').PropType<(menusData?: import('../..').MenuDataItem[]) => import('../..').MenuDataItem[]>;
        default: undefined;
    };
    onSelect: import('vue').PropType<(selectedKeys: import('ant-design-vue/lib/_util/type').Key[]) => void>;
    id: StringConstructor;
    items: import('vue').PropType<import('ant-design-vue').ItemType[]>;
    disabled: BooleanConstructor;
    inlineCollapsed: BooleanConstructor;
    disabledOverflow: BooleanConstructor;
    forceSubMenuRender: BooleanConstructor;
    selectedKeys: import('vue').PropType<import('ant-design-vue/lib/_util/type').Key[]>;
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
    motion: import('vue').PropType<import('ant-design-vue/lib/_util/transition').CSSMotionProps>;
    role: StringConstructor;
    theme: {
        type: import('vue').PropType<import('ant-design-vue').MenuTheme>;
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
        type: import('vue').PropType<import('ant-design-vue/lib/menu/src/interface').BuiltinPlacements>;
    };
    triggerSubMenuAction: {
        type: import('vue').PropType<import('ant-design-vue/lib/menu/src/interface').TriggerSubMenuAction>;
        default: string;
    };
    getPopupContainer: import('vue').PropType<(node: HTMLElement) => HTMLElement>;
    expandIcon: import('vue').PropType<(p?: {
        [key: string]: any;
        isOpen: boolean;
    }) => any>;
    onDeselect: import('vue').PropType<import('ant-design-vue/lib/menu/src/interface').SelectEventHandler>;
    onClick: import('vue').PropType<import('ant-design-vue/lib/menu/src/interface').MenuClickEventHandler>;
    onFocus: import('vue').PropType<import('ant-design-vue/lib/_util/EventInterface').FocusEventHandler>;
    onBlur: import('vue').PropType<import('ant-design-vue/lib/_util/EventInterface').FocusEventHandler>;
    onMousedown: import('vue').PropType<import('ant-design-vue/lib/_util/EventInterface').MouseEventHandler>;
    'onUpdate:openKeys': import('vue').PropType<(keys: import('ant-design-vue/lib/_util/type').Key[]) => void>;
    'onUpdate:selectedKeys': import('vue').PropType<(keys: import('ant-design-vue/lib/_util/type').Key[]) => void>;
    'onUpdate:activeKey': import('vue').PropType<(key: import('ant-design-vue/lib/_util/type').Key) => void>;
}>, () => import('ant-design-vue/lib/_util/type').VueNode, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<ExtractPropTypes<{
    matchMenuKeys: import('vue').PropType<string[]>;
    originCollapsed: {
        type: import('vue').PropType<boolean>;
        default: undefined;
    };
    menuRenderType: import('vue').PropType<"header" | "sider">;
    stylish: import('vue').PropType<import('@ant-design-vue/pro-provider').GenerateStyle<import('../SiderMenu/style/stylish').SiderMenuToken>>;
    collapsed: import('vue').PropType<boolean>;
    onCollapse: {
        type: import('vue').PropType<(collapsed: boolean) => void>;
        default: undefined;
    };
    isMobile: {
        type: import('vue').PropType<boolean>;
        default: undefined;
    };
    logo: {
        type: import('vue').PropType<import('ant-design-vue/lib/_util/type').VueNode>;
        default: undefined;
    };
    menuRender: {
        type: import('vue').PropType<import('../../RenderTypings').MenuRender>;
        default: undefined;
    };
    menuProps: {
        type: import('vue').PropType<import('ant-design-vue').MenuProps>;
        default: undefined;
    };
    prefixCls: import('vue').PropType<string>;
    appList: import('vue').PropType<import('../AppsLogoComponents/typing').AppListProps>;
    itemClick: import('vue').PropType<(item: import('../AppsLogoComponents/typing').AppItemProps, popoverRef: import('vue').Ref<HTMLSpanElement | null>) => void>;
    menuData: import('vue').PropType<import('../..').MenuDataItem[]>;
    onMenuHeaderClick: {
        type: import('vue').PropType<(e: import('vue').Events["onClick"]) => void>;
        default: undefined;
    };
    menuHeaderRender: {
        type: import('vue').PropType<import('../../RenderTypings').MenuHeaderRender>;
        default: undefined;
    };
    token: import('vue').PropType<import('@ant-design-vue/pro-provider').ProTokenType["layout"]>;
    headerContentRender: {
        type: import('vue').PropType<import('../../RenderTypings').HeaderContentRender>;
        default: undefined;
    };
    actionsRender: {
        type: import('vue').PropType<import('../../RenderTypings').ActionsRender>;
        default: undefined;
    };
    avatarProps: {
        type: import('vue').PropType<import('../GlobalHeader/ActionsContent').AvatarPropsType>;
        default: undefined;
    };
    formatMessage: import('vue').PropType<(message: import('../../typing').MessageDescriptor) => string>;
    appListRender: import('vue').PropType<import('../../RenderTypings').AppListRender>;
    navTheme: {
        type: import('vue').PropType<import('../../defaultSettings').PureSettings["navTheme"]>;
        default: "light" | "dark" | "realDark" | undefined;
    };
    layout: {
        type: import('vue').PropType<import('../../defaultSettings').PureSettings["layout"]>;
        default: "top" | "left" | "side" | "mix" | undefined;
    };
    contentWidth: {
        type: import('vue').PropType<import('../../defaultSettings').PureSettings["contentWidth"]>;
        default: import('../../defaultSettings').ContentWidth | undefined;
    };
    fixedHeader: {
        type: import('vue').PropType<import('../../defaultSettings').PureSettings["fixedHeader"]>;
        default: boolean | undefined;
    };
    fixedSiderbar: {
        type: import('vue').PropType<import('../../defaultSettings').PureSettings["fixedSiderbar"]>;
        default: boolean | undefined;
    };
    compact: {
        type: import('vue').PropType<import('../../defaultSettings').PureSettings["compact"]>;
        default: boolean | undefined;
    };
    menu: {
        type: import('vue').PropType<import('../../defaultSettings').PureSettings["menu"]>;
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
        type: import('vue').PropType<import('../../defaultSettings').PureSettings["title"]>;
        default: string | false | undefined;
    };
    iconfontUrl: {
        type: import('vue').PropType<import('../../defaultSettings').PureSettings["iconfontUrl"]>;
        default: string | undefined;
    };
    colorPrimary: {
        type: import('vue').PropType<import('../../defaultSettings').PureSettings["colorPrimary"]>;
        default: string | undefined;
    };
    colorWeak: {
        type: import('vue').PropType<import('../../defaultSettings').PureSettings["colorWeak"]>;
        default: boolean | undefined;
    };
    splitMenus: {
        type: import('vue').PropType<import('../../defaultSettings').PureSettings["splitMenus"]>;
        default: boolean | undefined;
    };
    suppressSiderWhenMenuEmpty: {
        type: import('vue').PropType<import('../../defaultSettings').PureSettings["suppressSiderWhenMenuEmpty"]>;
        default: boolean | undefined;
    };
    siderMenuType: {
        type: import('vue').PropType<import('../../defaultSettings').PureSettings["siderMenuType"]>;
        default: "sub" | "group" | undefined;
    };
    collapsedWidth: import('vue').PropType<number>;
    links: {
        type: import('vue').PropType<import('../../typing').WithFalse<{
            icon?: import('vue').VNode;
            title?: string;
            label?: import('vue').VNode;
        }[] | import('ant-design-vue/lib/_util/type').VueNode[]>>;
        default: undefined;
    };
    siderWidth: import('vue').PropType<number>;
    menuContentRender: {
        type: import('vue').PropType<import('../../RenderTypings').MenuContentRender>;
        default: undefined;
    };
    menuFooterRender: {
        type: import('vue').PropType<import('../../RenderTypings').MenuFooterRender>;
        default: undefined;
    };
    collapsedButtonRender: {
        type: import('vue').PropType<import('../../RenderTypings').CollapsedButtonRender>;
        default: undefined;
    };
    siderProps: import('vue').PropType<import('ant-design-vue').SiderProps>;
    breakpoint: {
        type: import('vue').PropType<import('../../typing').WithFalse<import('ant-design-vue/lib/_util/responsiveObserve').Breakpoint>>;
        default: string;
    };
    hide: {
        type: import('vue').PropType<boolean>;
        default: undefined;
    };
    menuExtraRender: {
        type: import('vue').PropType<import('../../RenderTypings').MenuExtraRender>;
        default: undefined;
    };
    logoStyle: {
        type: import('vue').PropType<CSSProperties>;
        default: undefined;
    };
    headerRender: {
        type: import('vue').PropType<import('../../RenderTypings').HeaderRender>;
        default: undefined;
    };
    defaultCollapsed: {
        type: import('vue').PropType<boolean>;
        default: undefined;
    };
    onOpenChange: {
        type: import('vue').PropType<(openKeys?: import('../../typing').WithFalse<import('ant-design-vue/lib/_util/type').Key[]>) => void>;
        default: undefined;
    };
    location: {
        type: import('vue').PropType<{
            pathname: string;
        }>;
        default: undefined;
    };
    openKeys: {
        type: import('vue').PropType<import('../../typing').WithFalse<import('ant-design-vue/lib/_util/type').Key[]>>;
        default: undefined;
    };
    mode: {
        type: import('vue').PropType<import('ant-design-vue').MenuMode>;
        default: undefined;
    };
    menuItemRender: {
        type: import('vue').PropType<import('../../RenderTypings').MenuItemRender>;
        default: undefined;
    };
    subMenuItemRender: {
        type: import('vue').PropType<import('../../RenderTypings').SubMenuItemRender>;
        default: undefined;
    };
    iconPrefixes: import('vue').PropType<string>;
    postMenuData: {
        type: import('vue').PropType<(menusData?: import('../..').MenuDataItem[]) => import('../..').MenuDataItem[]>;
        default: undefined;
    };
    onSelect: import('vue').PropType<(selectedKeys: import('ant-design-vue/lib/_util/type').Key[]) => void>;
    id: StringConstructor;
    items: import('vue').PropType<import('ant-design-vue').ItemType[]>;
    disabled: BooleanConstructor;
    inlineCollapsed: BooleanConstructor;
    disabledOverflow: BooleanConstructor;
    forceSubMenuRender: BooleanConstructor;
    selectedKeys: import('vue').PropType<import('ant-design-vue/lib/_util/type').Key[]>;
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
    motion: import('vue').PropType<import('ant-design-vue/lib/_util/transition').CSSMotionProps>;
    role: StringConstructor;
    theme: {
        type: import('vue').PropType<import('ant-design-vue').MenuTheme>;
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
        type: import('vue').PropType<import('ant-design-vue/lib/menu/src/interface').BuiltinPlacements>;
    };
    triggerSubMenuAction: {
        type: import('vue').PropType<import('ant-design-vue/lib/menu/src/interface').TriggerSubMenuAction>;
        default: string;
    };
    getPopupContainer: import('vue').PropType<(node: HTMLElement) => HTMLElement>;
    expandIcon: import('vue').PropType<(p?: {
        [key: string]: any;
        isOpen: boolean;
    }) => any>;
    onDeselect: import('vue').PropType<import('ant-design-vue/lib/menu/src/interface').SelectEventHandler>;
    onClick: import('vue').PropType<import('ant-design-vue/lib/menu/src/interface').MenuClickEventHandler>;
    onFocus: import('vue').PropType<import('ant-design-vue/lib/_util/EventInterface').FocusEventHandler>;
    onBlur: import('vue').PropType<import('ant-design-vue/lib/_util/EventInterface').FocusEventHandler>;
    onMousedown: import('vue').PropType<import('ant-design-vue/lib/_util/EventInterface').MouseEventHandler>;
    'onUpdate:openKeys': import('vue').PropType<(keys: import('ant-design-vue/lib/_util/type').Key[]) => void>;
    'onUpdate:selectedKeys': import('vue').PropType<(keys: import('ant-design-vue/lib/_util/type').Key[]) => void>;
    'onUpdate:activeKey': import('vue').PropType<(key: import('ant-design-vue/lib/_util/type').Key) => void>;
}>> & Readonly<{}>, {
    multiple: boolean;
    layout: "top" | "left" | "side" | "mix" | undefined;
    disabled: boolean;
    mode: import('ant-design-vue').MenuMode;
    compact: boolean | undefined;
    theme: import('ant-design-vue').MenuTheme;
    colorPrimary: string | undefined;
    contentWidth: import('../../defaultSettings').ContentWidth | undefined;
    onOpenChange: (openKeys?: import('../../typing').WithFalse<import('ant-design-vue/lib/_util/type').Key[]>) => void;
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
    links: import('../../typing').WithFalse<import('ant-design-vue/lib/_util/type').VueNode[] | {
        icon?: import('vue').VNode;
        title?: string;
        label?: import('vue').VNode;
    }[]>;
    navTheme: "light" | "dark" | "realDark" | undefined;
    fixedHeader: boolean | undefined;
    fixedSiderbar: boolean | undefined;
    iconfontUrl: string | undefined;
    colorWeak: boolean | undefined;
    splitMenus: boolean | undefined;
    suppressSiderWhenMenuEmpty: boolean | undefined;
    siderMenuType: "sub" | "group" | undefined;
    inlineCollapsed: boolean;
    disabledOverflow: boolean;
    forceSubMenuRender: boolean;
    openKeys: import('../../typing').WithFalse<import('ant-design-vue/lib/_util/type').Key[]>;
    selectable: boolean;
    inlineIndent: number;
    subMenuOpenDelay: number;
    subMenuCloseDelay: number;
    triggerSubMenuAction: import('ant-design-vue/lib/menu/src/interface').TriggerSubMenuAction;
    defaultCollapsed: boolean;
    isMobile: boolean;
    location: {
        pathname: string;
    };
    onCollapse: (collapsed: boolean) => void;
    menuProps: Partial<ExtractPropTypes<{
        id: StringConstructor;
        prefixCls: StringConstructor;
        items: import('vue').PropType<import('ant-design-vue').ItemType[]>;
        disabled: BooleanConstructor;
        inlineCollapsed: BooleanConstructor;
        disabledOverflow: BooleanConstructor;
        forceSubMenuRender: BooleanConstructor;
        openKeys: import('vue').PropType<import('ant-design-vue/lib/_util/type').Key[]>;
        selectedKeys: import('vue').PropType<import('ant-design-vue/lib/_util/type').Key[]>;
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
        motion: import('vue').PropType<import('ant-design-vue/lib/_util/transition').CSSMotionProps>;
        role: StringConstructor;
        theme: {
            type: import('vue').PropType<import('ant-design-vue').MenuTheme>;
            default: string;
        };
        mode: {
            type: import('vue').PropType<import('ant-design-vue').MenuMode>;
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
            type: import('vue').PropType<import('ant-design-vue/lib/menu/src/interface').BuiltinPlacements>;
        };
        triggerSubMenuAction: {
            type: import('vue').PropType<import('ant-design-vue/lib/menu/src/interface').TriggerSubMenuAction>;
            default: string;
        };
        getPopupContainer: import('vue').PropType<(node: HTMLElement) => HTMLElement>;
        expandIcon: import('vue').PropType<(p?: {
            [key: string]: any;
            isOpen: boolean;
        }) => any>;
        onOpenChange: import('vue').PropType<(keys: import('ant-design-vue/lib/_util/type').Key[]) => void>;
        onSelect: import('vue').PropType<import('ant-design-vue/lib/menu/src/interface').SelectEventHandler>;
        onDeselect: import('vue').PropType<import('ant-design-vue/lib/menu/src/interface').SelectEventHandler>;
        onClick: import('vue').PropType<import('ant-design-vue/lib/menu/src/interface').MenuClickEventHandler>;
        onFocus: import('vue').PropType<import('ant-design-vue/lib/_util/EventInterface').FocusEventHandler>;
        onBlur: import('vue').PropType<import('ant-design-vue/lib/_util/EventInterface').FocusEventHandler>;
        onMousedown: import('vue').PropType<import('ant-design-vue/lib/_util/EventInterface').MouseEventHandler>;
        'onUpdate:openKeys': import('vue').PropType<(keys: import('ant-design-vue/lib/_util/type').Key[]) => void>;
        'onUpdate:selectedKeys': import('vue').PropType<(keys: import('ant-design-vue/lib/_util/type').Key[]) => void>;
        'onUpdate:activeKey': import('vue').PropType<(key: import('ant-design-vue/lib/_util/type').Key) => void>;
    }>>;
    menuItemRender: import('../../RenderTypings').MenuItemRender;
    subMenuItemRender: import('../../RenderTypings').SubMenuItemRender;
    postMenuData: (menusData?: import('../..').MenuDataItem[]) => import('../..').MenuDataItem[];
    originCollapsed: boolean;
    logo: import('ant-design-vue/lib/_util/type').VueNode;
    breakpoint: import('../../typing').WithFalse<import('ant-design-vue/lib/_util/responsiveObserve').Breakpoint>;
    menuHeaderRender: import('../../RenderTypings').MenuHeaderRender;
    menuContentRender: import('../../RenderTypings').MenuContentRender;
    menuFooterRender: import('../../RenderTypings').MenuFooterRender;
    collapsedButtonRender: import('../../RenderTypings').CollapsedButtonRender;
    hide: boolean;
    avatarProps: import('../GlobalHeader/ActionsContent').AvatarPropsType;
    actionsRender: import('../../RenderTypings').ActionsRender;
    menuExtraRender: import('../../RenderTypings').MenuExtraRender;
    onMenuHeaderClick: (e: import('vue').Events["onClick"]) => void;
    logoStyle: CSSProperties;
    headerRender: import('../../RenderTypings').HeaderRender;
    menuRender: import('../../RenderTypings').MenuRender;
    headerContentRender: import('../../RenderTypings').HeaderContentRender;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default TopNavHeader;

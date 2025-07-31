import { CSSProperties, PropType } from 'vue';
import { ProTokenType } from '@ant-design-vue/pro-provider';
export declare const siderMenuWrapperProps: () => {
    token: PropType<ProTokenType["layout"]>;
    getContainer: PropType<string | HTMLElement>;
    matchMenuKeys: PropType<string[]>;
    originCollapsed: {
        type: PropType<boolean>;
        default: undefined;
    };
    menuRenderType: PropType<"header" | "sider">;
    stylish: PropType<import('@ant-design-vue/pro-provider').GenerateStyle<import('./style/stylish').SiderMenuToken>>;
    prefixCls: PropType<string>;
    collapsedWidth: PropType<number>;
    logo: {
        type: PropType<import('ant-design-vue/es/_util/type').VueNode>;
        default: undefined;
    };
    appList: PropType<import('../AppsLogoComponents/typing').AppListProps>;
    appListRender: PropType<import('../../RenderTypings').AppListRender>;
    itemClick: PropType<(item: import('../AppsLogoComponents/typing').AppItemProps, popoverRef: import('vue').Ref<HTMLSpanElement | null>) => void>;
    links: {
        type: PropType<import('../../typing').WithFalse<{
            icon?: import('vue').VNode;
            title?: string;
            label?: import('vue').VNode;
        }[] | import('ant-design-vue/es/_util/type').VueNode[]>>;
        default: undefined;
    };
    siderWidth: PropType<number>;
    menuHeaderRender: {
        type: PropType<import('../../RenderTypings').MenuHeaderRender>;
        default: undefined;
    };
    menuContentRender: {
        type: PropType<import('../../RenderTypings').MenuContentRender>;
        default: undefined;
    };
    menuFooterRender: {
        type: PropType<import('../../RenderTypings').MenuFooterRender>;
        default: undefined;
    };
    collapsedButtonRender: {
        type: PropType<import('../../RenderTypings').CollapsedButtonRender>;
        default: undefined;
    };
    siderProps: PropType<import('ant-design-vue').SiderProps>;
    breakpoint: {
        type: PropType<import('../../typing').WithFalse<import('ant-design-vue/es/_util/responsiveObserve').Breakpoint>>;
        default: string;
    };
    hide: {
        type: PropType<boolean>;
        default: undefined;
    };
    avatarProps: {
        type: PropType<false | (Partial<import('vue').ExtractPropTypes<{
            prefixCls: StringConstructor;
            shape: {
                type: PropType<"circle" | "square">;
                default: string;
            };
            size: {
                type: PropType<import('ant-design-vue/es/avatar').AvatarSize>;
                default: () => import('ant-design-vue/es/avatar').AvatarSize;
            };
            src: StringConstructor;
            srcset: StringConstructor;
            icon: import('vue-types').VueTypeValidableDef<any>;
            alt: StringConstructor;
            gap: NumberConstructor;
            draggable: {
                type: BooleanConstructor;
                default: any;
            };
            crossOrigin: PropType<"" | "anonymous" | "use-credentials">;
            loadError: {
                type: PropType<() => boolean>;
            };
        }>> & {
            title?: import('ant-design-vue/es/_util/type').VueNode;
            render?: (avatarProps: import('ant-design-vue').AvatarProps, defaultDom: import('ant-design-vue/es/_util/type').VueNode, props: import('./SiderMenu').SiderMenuProps) => import('ant-design-vue/es/_util/type').VueNode;
        })>;
        default: undefined;
    };
    actionsRender: {
        type: PropType<import('../../RenderTypings').ActionsRender>;
        default: undefined;
    };
    menuExtraRender: {
        type: PropType<import('../../RenderTypings').MenuExtraRender>;
        default: undefined;
    };
    onMenuHeaderClick: {
        type: PropType<(e: import('vue').Events["onClick"]) => void>;
        default: undefined;
    };
    logoStyle: {
        type: PropType<CSSProperties>;
        default: undefined;
    };
    headerRender: {
        type: PropType<import('../../RenderTypings').HeaderRender>;
        default: undefined;
    };
    defaultCollapsed: {
        type: PropType<boolean>;
        default: undefined;
    };
    collapsed: {
        type: PropType<boolean>;
        default: undefined;
    };
    isMobile: {
        type: PropType<boolean>;
        default: undefined;
    };
    onOpenChange: {
        type: PropType<(openKeys?: import('../../typing').WithFalse<import('ant-design-vue/es/_util/type').Key[]>) => void>;
        default: undefined;
    };
    location: {
        type: PropType<{
            pathname: string;
        }>;
        default: undefined;
    };
    menuData: PropType<import('../..').MenuDataItem[]>;
    onCollapse: PropType<(collapsed: boolean) => void>;
    openKeys: {
        type: PropType<import('../../typing').WithFalse<import('ant-design-vue/es/_util/type').Key[]>>;
        default: undefined;
    };
    mode: {
        type: PropType<import('ant-design-vue').MenuMode>;
        default: undefined;
    };
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
    menuProps: {
        type: PropType<import('ant-design-vue').MenuProps>;
        default: undefined;
    };
    menuItemRender: {
        type: PropType<import('../../RenderTypings').MenuItemRender>;
        default: undefined;
    };
    subMenuItemRender: {
        type: PropType<import('../../RenderTypings').SubMenuItemRender>;
        default: undefined;
    };
    iconPrefixes: PropType<string>;
    formatMessage: PropType<(message: import('../../typing').MessageDescriptor) => string>;
    postMenuData: {
        type: PropType<(menusData?: import('../..').MenuDataItem[]) => import('../..').MenuDataItem[]>;
        default: undefined;
    };
    onSelect: PropType<(selectedKeys: import('ant-design-vue/es/_util/type').Key[]) => void>;
    id: StringConstructor;
    items: PropType<import('ant-design-vue').ItemType[]>;
    disabled: BooleanConstructor;
    inlineCollapsed: BooleanConstructor;
    disabledOverflow: BooleanConstructor;
    forceSubMenuRender: BooleanConstructor;
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
    onDeselect: PropType<import('ant-design-vue/es/menu/src/interface').SelectEventHandler>;
    onClick: PropType<import('ant-design-vue/es/menu/src/interface').MenuClickEventHandler>;
    onFocus: PropType<import('ant-design-vue/es/_util/EventInterface').FocusEventHandler>;
    onBlur: PropType<import('ant-design-vue/es/_util/EventInterface').FocusEventHandler>;
    onMousedown: PropType<import('ant-design-vue/es/_util/EventInterface').MouseEventHandler>;
    'onUpdate:openKeys': PropType<(keys: import('ant-design-vue/es/_util/type').Key[]) => void>;
    'onUpdate:selectedKeys': PropType<(keys: import('ant-design-vue/es/_util/type').Key[]) => void>;
    'onUpdate:activeKey': PropType<(key: import('ant-design-vue/es/_util/type').Key) => void>;
};
export type SiderMenuWrapperProps = Partial<ReturnType<typeof siderMenuWrapperProps>>;
declare const SiderMenuWrapper: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    token: PropType<ProTokenType["layout"]>;
    getContainer: PropType<string | HTMLElement>;
    matchMenuKeys: PropType<string[]>;
    originCollapsed: {
        type: PropType<boolean>;
        default: undefined;
    };
    menuRenderType: PropType<"header" | "sider">;
    stylish: PropType<import('@ant-design-vue/pro-provider').GenerateStyle<import('./style/stylish').SiderMenuToken>>;
    prefixCls: PropType<string>;
    collapsedWidth: PropType<number>;
    logo: {
        type: PropType<import('ant-design-vue/es/_util/type').VueNode>;
        default: undefined;
    };
    appList: PropType<import('../AppsLogoComponents/typing').AppListProps>;
    appListRender: PropType<import('../../RenderTypings').AppListRender>;
    itemClick: PropType<(item: import('../AppsLogoComponents/typing').AppItemProps, popoverRef: import('vue').Ref<HTMLSpanElement | null>) => void>;
    links: {
        type: PropType<import('../../typing').WithFalse<{
            icon?: import('vue').VNode;
            title?: string;
            label?: import('vue').VNode;
        }[] | import('ant-design-vue/es/_util/type').VueNode[]>>;
        default: undefined;
    };
    siderWidth: PropType<number>;
    menuHeaderRender: {
        type: PropType<import('../../RenderTypings').MenuHeaderRender>;
        default: undefined;
    };
    menuContentRender: {
        type: PropType<import('../../RenderTypings').MenuContentRender>;
        default: undefined;
    };
    menuFooterRender: {
        type: PropType<import('../../RenderTypings').MenuFooterRender>;
        default: undefined;
    };
    collapsedButtonRender: {
        type: PropType<import('../../RenderTypings').CollapsedButtonRender>;
        default: undefined;
    };
    siderProps: PropType<import('ant-design-vue').SiderProps>;
    breakpoint: {
        type: PropType<import('../../typing').WithFalse<import('ant-design-vue/es/_util/responsiveObserve').Breakpoint>>;
        default: string;
    };
    hide: {
        type: PropType<boolean>;
        default: undefined;
    };
    avatarProps: {
        type: PropType<false | (Partial<import('vue').ExtractPropTypes<{
            prefixCls: StringConstructor;
            shape: {
                type: PropType<"circle" | "square">;
                default: string;
            };
            size: {
                type: PropType<import('ant-design-vue/es/avatar').AvatarSize>;
                default: () => import('ant-design-vue/es/avatar').AvatarSize;
            };
            src: StringConstructor;
            srcset: StringConstructor;
            icon: import('vue-types').VueTypeValidableDef<any>;
            alt: StringConstructor;
            gap: NumberConstructor;
            draggable: {
                type: BooleanConstructor;
                default: any;
            };
            crossOrigin: PropType<"" | "anonymous" | "use-credentials">;
            loadError: {
                type: PropType<() => boolean>;
            };
        }>> & {
            title?: import('ant-design-vue/es/_util/type').VueNode;
            render?: (avatarProps: import('ant-design-vue').AvatarProps, defaultDom: import('ant-design-vue/es/_util/type').VueNode, props: import('./SiderMenu').SiderMenuProps) => import('ant-design-vue/es/_util/type').VueNode;
        })>;
        default: undefined;
    };
    actionsRender: {
        type: PropType<import('../../RenderTypings').ActionsRender>;
        default: undefined;
    };
    menuExtraRender: {
        type: PropType<import('../../RenderTypings').MenuExtraRender>;
        default: undefined;
    };
    onMenuHeaderClick: {
        type: PropType<(e: import('vue').Events["onClick"]) => void>;
        default: undefined;
    };
    logoStyle: {
        type: PropType<CSSProperties>;
        default: undefined;
    };
    headerRender: {
        type: PropType<import('../../RenderTypings').HeaderRender>;
        default: undefined;
    };
    defaultCollapsed: {
        type: PropType<boolean>;
        default: undefined;
    };
    collapsed: {
        type: PropType<boolean>;
        default: undefined;
    };
    isMobile: {
        type: PropType<boolean>;
        default: undefined;
    };
    onOpenChange: {
        type: PropType<(openKeys?: import('../../typing').WithFalse<import('ant-design-vue/es/_util/type').Key[]>) => void>;
        default: undefined;
    };
    location: {
        type: PropType<{
            pathname: string;
        }>;
        default: undefined;
    };
    menuData: PropType<import('../..').MenuDataItem[]>;
    onCollapse: PropType<(collapsed: boolean) => void>;
    openKeys: {
        type: PropType<import('../../typing').WithFalse<import('ant-design-vue/es/_util/type').Key[]>>;
        default: undefined;
    };
    mode: {
        type: PropType<import('ant-design-vue').MenuMode>;
        default: undefined;
    };
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
    menuProps: {
        type: PropType<import('ant-design-vue').MenuProps>;
        default: undefined;
    };
    menuItemRender: {
        type: PropType<import('../../RenderTypings').MenuItemRender>;
        default: undefined;
    };
    subMenuItemRender: {
        type: PropType<import('../../RenderTypings').SubMenuItemRender>;
        default: undefined;
    };
    iconPrefixes: PropType<string>;
    formatMessage: PropType<(message: import('../../typing').MessageDescriptor) => string>;
    postMenuData: {
        type: PropType<(menusData?: import('../..').MenuDataItem[]) => import('../..').MenuDataItem[]>;
        default: undefined;
    };
    onSelect: PropType<(selectedKeys: import('ant-design-vue/es/_util/type').Key[]) => void>;
    id: StringConstructor;
    items: PropType<import('ant-design-vue').ItemType[]>;
    disabled: BooleanConstructor;
    inlineCollapsed: BooleanConstructor;
    disabledOverflow: BooleanConstructor;
    forceSubMenuRender: BooleanConstructor;
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
    onDeselect: PropType<import('ant-design-vue/es/menu/src/interface').SelectEventHandler>;
    onClick: PropType<import('ant-design-vue/es/menu/src/interface').MenuClickEventHandler>;
    onFocus: PropType<import('ant-design-vue/es/_util/EventInterface').FocusEventHandler>;
    onBlur: PropType<import('ant-design-vue/es/_util/EventInterface').FocusEventHandler>;
    onMousedown: PropType<import('ant-design-vue/es/_util/EventInterface').MouseEventHandler>;
    'onUpdate:openKeys': PropType<(keys: import('ant-design-vue/es/_util/type').Key[]) => void>;
    'onUpdate:selectedKeys': PropType<(keys: import('ant-design-vue/es/_util/type').Key[]) => void>;
    'onUpdate:activeKey': PropType<(key: import('ant-design-vue/es/_util/type').Key) => void>;
}>, () => import('ant-design-vue/es/_util/type').VueNode, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    token: PropType<ProTokenType["layout"]>;
    getContainer: PropType<string | HTMLElement>;
    matchMenuKeys: PropType<string[]>;
    originCollapsed: {
        type: PropType<boolean>;
        default: undefined;
    };
    menuRenderType: PropType<"header" | "sider">;
    stylish: PropType<import('@ant-design-vue/pro-provider').GenerateStyle<import('./style/stylish').SiderMenuToken>>;
    prefixCls: PropType<string>;
    collapsedWidth: PropType<number>;
    logo: {
        type: PropType<import('ant-design-vue/es/_util/type').VueNode>;
        default: undefined;
    };
    appList: PropType<import('../AppsLogoComponents/typing').AppListProps>;
    appListRender: PropType<import('../../RenderTypings').AppListRender>;
    itemClick: PropType<(item: import('../AppsLogoComponents/typing').AppItemProps, popoverRef: import('vue').Ref<HTMLSpanElement | null>) => void>;
    links: {
        type: PropType<import('../../typing').WithFalse<{
            icon?: import('vue').VNode;
            title?: string;
            label?: import('vue').VNode;
        }[] | import('ant-design-vue/es/_util/type').VueNode[]>>;
        default: undefined;
    };
    siderWidth: PropType<number>;
    menuHeaderRender: {
        type: PropType<import('../../RenderTypings').MenuHeaderRender>;
        default: undefined;
    };
    menuContentRender: {
        type: PropType<import('../../RenderTypings').MenuContentRender>;
        default: undefined;
    };
    menuFooterRender: {
        type: PropType<import('../../RenderTypings').MenuFooterRender>;
        default: undefined;
    };
    collapsedButtonRender: {
        type: PropType<import('../../RenderTypings').CollapsedButtonRender>;
        default: undefined;
    };
    siderProps: PropType<import('ant-design-vue').SiderProps>;
    breakpoint: {
        type: PropType<import('../../typing').WithFalse<import('ant-design-vue/es/_util/responsiveObserve').Breakpoint>>;
        default: string;
    };
    hide: {
        type: PropType<boolean>;
        default: undefined;
    };
    avatarProps: {
        type: PropType<false | (Partial<import('vue').ExtractPropTypes<{
            prefixCls: StringConstructor;
            shape: {
                type: PropType<"circle" | "square">;
                default: string;
            };
            size: {
                type: PropType<import('ant-design-vue/es/avatar').AvatarSize>;
                default: () => import('ant-design-vue/es/avatar').AvatarSize;
            };
            src: StringConstructor;
            srcset: StringConstructor;
            icon: import('vue-types').VueTypeValidableDef<any>;
            alt: StringConstructor;
            gap: NumberConstructor;
            draggable: {
                type: BooleanConstructor;
                default: any;
            };
            crossOrigin: PropType<"" | "anonymous" | "use-credentials">;
            loadError: {
                type: PropType<() => boolean>;
            };
        }>> & {
            title?: import('ant-design-vue/es/_util/type').VueNode;
            render?: (avatarProps: import('ant-design-vue').AvatarProps, defaultDom: import('ant-design-vue/es/_util/type').VueNode, props: import('./SiderMenu').SiderMenuProps) => import('ant-design-vue/es/_util/type').VueNode;
        })>;
        default: undefined;
    };
    actionsRender: {
        type: PropType<import('../../RenderTypings').ActionsRender>;
        default: undefined;
    };
    menuExtraRender: {
        type: PropType<import('../../RenderTypings').MenuExtraRender>;
        default: undefined;
    };
    onMenuHeaderClick: {
        type: PropType<(e: import('vue').Events["onClick"]) => void>;
        default: undefined;
    };
    logoStyle: {
        type: PropType<CSSProperties>;
        default: undefined;
    };
    headerRender: {
        type: PropType<import('../../RenderTypings').HeaderRender>;
        default: undefined;
    };
    defaultCollapsed: {
        type: PropType<boolean>;
        default: undefined;
    };
    collapsed: {
        type: PropType<boolean>;
        default: undefined;
    };
    isMobile: {
        type: PropType<boolean>;
        default: undefined;
    };
    onOpenChange: {
        type: PropType<(openKeys?: import('../../typing').WithFalse<import('ant-design-vue/es/_util/type').Key[]>) => void>;
        default: undefined;
    };
    location: {
        type: PropType<{
            pathname: string;
        }>;
        default: undefined;
    };
    menuData: PropType<import('../..').MenuDataItem[]>;
    onCollapse: PropType<(collapsed: boolean) => void>;
    openKeys: {
        type: PropType<import('../../typing').WithFalse<import('ant-design-vue/es/_util/type').Key[]>>;
        default: undefined;
    };
    mode: {
        type: PropType<import('ant-design-vue').MenuMode>;
        default: undefined;
    };
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
    menuProps: {
        type: PropType<import('ant-design-vue').MenuProps>;
        default: undefined;
    };
    menuItemRender: {
        type: PropType<import('../../RenderTypings').MenuItemRender>;
        default: undefined;
    };
    subMenuItemRender: {
        type: PropType<import('../../RenderTypings').SubMenuItemRender>;
        default: undefined;
    };
    iconPrefixes: PropType<string>;
    formatMessage: PropType<(message: import('../../typing').MessageDescriptor) => string>;
    postMenuData: {
        type: PropType<(menusData?: import('../..').MenuDataItem[]) => import('../..').MenuDataItem[]>;
        default: undefined;
    };
    onSelect: PropType<(selectedKeys: import('ant-design-vue/es/_util/type').Key[]) => void>;
    id: StringConstructor;
    items: PropType<import('ant-design-vue').ItemType[]>;
    disabled: BooleanConstructor;
    inlineCollapsed: BooleanConstructor;
    disabledOverflow: BooleanConstructor;
    forceSubMenuRender: BooleanConstructor;
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
    onDeselect: PropType<import('ant-design-vue/es/menu/src/interface').SelectEventHandler>;
    onClick: PropType<import('ant-design-vue/es/menu/src/interface').MenuClickEventHandler>;
    onFocus: PropType<import('ant-design-vue/es/_util/EventInterface').FocusEventHandler>;
    onBlur: PropType<import('ant-design-vue/es/_util/EventInterface').FocusEventHandler>;
    onMousedown: PropType<import('ant-design-vue/es/_util/EventInterface').MouseEventHandler>;
    'onUpdate:openKeys': PropType<(keys: import('ant-design-vue/es/_util/type').Key[]) => void>;
    'onUpdate:selectedKeys': PropType<(keys: import('ant-design-vue/es/_util/type').Key[]) => void>;
    'onUpdate:activeKey': PropType<(key: import('ant-design-vue/es/_util/type').Key) => void>;
}>> & Readonly<{}>, {
    multiple: boolean;
    layout: "top" | "left" | "side" | "mix" | undefined;
    disabled: boolean;
    mode: import('ant-design-vue').MenuMode;
    theme: import('ant-design-vue').MenuTheme;
    colorPrimary: string | undefined;
    contentWidth: import('../../defaultSettings').ContentWidth | undefined;
    onOpenChange: (openKeys?: import('../../typing').WithFalse<import('ant-design-vue/es/_util/type').Key[]>) => void;
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
    links: import('../../typing').WithFalse<import('ant-design-vue/es/_util/type').VueNode[] | {
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
    openKeys: import('../../typing').WithFalse<import('ant-design-vue/es/_util/type').Key[]>;
    selectable: boolean;
    inlineIndent: number;
    subMenuOpenDelay: number;
    subMenuCloseDelay: number;
    triggerSubMenuAction: import('ant-design-vue/es/menu/src/interface').TriggerSubMenuAction;
    defaultCollapsed: boolean;
    collapsed: boolean;
    isMobile: boolean;
    location: {
        pathname: string;
    };
    menuProps: Partial<import('vue').ExtractPropTypes<{
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
    menuItemRender: import('../../RenderTypings').MenuItemRender;
    subMenuItemRender: import('../../RenderTypings').SubMenuItemRender;
    postMenuData: (menusData?: import('../..').MenuDataItem[]) => import('../..').MenuDataItem[];
    originCollapsed: boolean;
    logo: import('ant-design-vue/es/_util/type').VueNode;
    breakpoint: import('../../typing').WithFalse<import('ant-design-vue/es/_util/responsiveObserve').Breakpoint>;
    menuHeaderRender: import('../../RenderTypings').MenuHeaderRender;
    menuContentRender: import('../../RenderTypings').MenuContentRender;
    menuFooterRender: import('../../RenderTypings').MenuFooterRender;
    collapsedButtonRender: import('../../RenderTypings').CollapsedButtonRender;
    hide: boolean;
    avatarProps: false | (Partial<import('vue').ExtractPropTypes<{
        prefixCls: StringConstructor;
        shape: {
            type: PropType<"circle" | "square">;
            default: string;
        };
        size: {
            type: PropType<import('ant-design-vue/es/avatar').AvatarSize>;
            default: () => import('ant-design-vue/es/avatar').AvatarSize;
        };
        src: StringConstructor;
        srcset: StringConstructor;
        icon: import('vue-types').VueTypeValidableDef<any>;
        alt: StringConstructor;
        gap: NumberConstructor;
        draggable: {
            type: BooleanConstructor;
            default: any;
        };
        crossOrigin: PropType<"" | "anonymous" | "use-credentials">;
        loadError: {
            type: PropType<() => boolean>;
        };
    }>> & {
        title?: import('ant-design-vue/es/_util/type').VueNode;
        render?: (avatarProps: import('ant-design-vue').AvatarProps, defaultDom: import('ant-design-vue/es/_util/type').VueNode, props: import('./SiderMenu').SiderMenuProps) => import('ant-design-vue/es/_util/type').VueNode;
    });
    actionsRender: import('../../RenderTypings').ActionsRender;
    menuExtraRender: import('../../RenderTypings').MenuExtraRender;
    onMenuHeaderClick: (e: import('vue').Events["onClick"]) => void;
    logoStyle: CSSProperties;
    headerRender: import('../../RenderTypings').HeaderRender;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default SiderMenuWrapper;

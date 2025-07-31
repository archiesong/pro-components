declare const LeftMenuLayout: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    compact: {
        type: import('vue').PropType<import('./defaultSettings').PureSettings["compact"]>;
        default: undefined;
    };
    routes: {
        type: import('vue').PropType<import('./typing').MenuDataItem[]>;
        default: undefined;
    };
    location: {
        type: import('vue').PropType<{
            pathname: string;
        }>;
        default: undefined;
    };
    stylish: import('vue').PropType<{
        header?: import('@ant-design-vue/pro-provider').GenerateStyle<import('./components/SiderMenu/style').SiderMenuToken>;
        sider?: import('@ant-design-vue/pro-provider').GenerateStyle<import('./components/SiderMenu/style').SiderMenuToken>;
    }>;
    bgLayoutImgList: {
        type: import('vue').PropType<{
            src?: string;
            width?: string;
            height?: string;
            left?: number;
            top?: number;
            bottom?: number;
            right?: number;
        }[]>;
        default: undefined;
    };
    isChildrenLayout: {
        type: BooleanConstructor;
        default: undefined;
    };
    token: import('vue').PropType<import('@ant-design-vue/pro-provider').ProTokenType["layout"]>;
    pure: {
        type: import('vue').PropType<boolean>;
        default: undefined;
    };
    disableMobile: {
        type: import('vue').PropType<boolean>;
        default: undefined;
    };
    contentStyle: {
        type: import('vue').PropType<import('vue').CSSProperties>;
        default: undefined;
    };
    tagsViewRender: {
        type: import('vue').PropType<import('./RenderTypings').TagsViewRender>;
        default: undefined;
    };
    footerRender: {
        type: import('vue').PropType<import('./RenderTypings').FooterRender>;
        default: undefined;
    };
    breadcrumbRender: {
        type: import('vue').PropType<import('./RenderTypings').BreadcrumbRender>;
        default: undefined;
    };
    pageTitleRender: {
        type: import('vue').PropType<import('./RenderTypings').PageTitleRender>;
        default: undefined;
    };
    breadcrumbProps: {
        type: import('vue').PropType<Omit<import('ant-design-vue').BreadcrumbProps, "itemRender"> & import('./proLayoutProps').LayoutBreadcrumbProps>;
        default: undefined;
    };
    loading: {
        type: BooleanConstructor;
        default: undefined;
    };
    itemRender: import('vue').PropType<import('ant-design-vue').BreadcrumbProps["itemRender"]>;
    formatMessage: import('vue').PropType<(message: import('./typing').MessageDescriptor) => string>;
    menuDataRender: import('vue').PropType<import('./RenderTypings').MenuDataRender>;
    errorBoundaryRender: {
        type: import('vue').PropType<import('./RenderTypings').ErrorBoundaryRender>;
        default: undefined;
    };
    waterMarkProps: {
        type: import('vue').PropType<import('ant-design-vue').WatermarkProps>;
        default: undefined;
    };
    prefixCls: import('vue').PropType<string>;
    collapsedWidth: import('vue').PropType<number>;
    logo: {
        type: import('vue').PropType<import('ant-design-vue/es/_util/type').VueNode>;
        default: undefined;
    };
    appList: import('vue').PropType<import('./components/AppsLogoComponents/typing').AppListProps>;
    appListRender: import('vue').PropType<import('./RenderTypings').AppListRender>;
    itemClick: import('vue').PropType<(item: import('./components/AppsLogoComponents/typing').AppItemProps, popoverRef: import('vue').Ref<HTMLSpanElement | null>) => void>;
    links: {
        type: import('vue').PropType<import('./typing').WithFalse<{
            icon?: import('vue').VNode;
            title?: string;
            label?: import('vue').VNode;
        }[] | import('ant-design-vue/es/_util/type').VueNode[]>>;
        default: undefined;
    };
    siderWidth: import('vue').PropType<number>;
    menuHeaderRender: {
        type: import('vue').PropType<import('./RenderTypings').MenuHeaderRender>;
        default: undefined;
    };
    menuContentRender: {
        type: import('vue').PropType<import('./RenderTypings').MenuContentRender>;
        default: undefined;
    };
    menuFooterRender: {
        type: import('vue').PropType<import('./RenderTypings').MenuFooterRender>;
        default: undefined;
    };
    collapsedButtonRender: {
        type: import('vue').PropType<import('./RenderTypings').CollapsedButtonRender>;
        default: undefined;
    };
    siderProps: import('vue').PropType<import('ant-design-vue').SiderProps>;
    breakpoint: {
        type: import('vue').PropType<import('./typing').WithFalse<import('ant-design-vue/es/_util/responsiveObserve').Breakpoint>>;
        default: string;
    };
    hide: {
        type: import('vue').PropType<boolean>;
        default: undefined;
    };
    avatarProps: {
        type: import('vue').PropType<false | (Partial<import('vue').ExtractPropTypes<{
            prefixCls: StringConstructor;
            shape: {
                type: import('vue').PropType<"circle" | "square">;
                default: string;
            };
            size: {
                type: import('vue').PropType<import('ant-design-vue/es/avatar').AvatarSize>;
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
            crossOrigin: import('vue').PropType<"" | "anonymous" | "use-credentials">;
            loadError: {
                type: import('vue').PropType<() => boolean>;
            };
        }>> & {
            title?: import('ant-design-vue/es/_util/type').VueNode;
            render?: (avatarProps: import('ant-design-vue').AvatarProps, defaultDom: import('ant-design-vue/es/_util/type').VueNode, props: import('./components/SiderMenu/SiderMenu').SiderMenuProps) => import('ant-design-vue/es/_util/type').VueNode;
        })>;
        default: undefined;
    };
    actionsRender: {
        type: import('vue').PropType<import('./RenderTypings').ActionsRender>;
        default: undefined;
    };
    menuExtraRender: {
        type: import('vue').PropType<import('./RenderTypings').MenuExtraRender>;
        default: undefined;
    };
    onMenuHeaderClick: {
        type: import('vue').PropType<(e: import('vue').Events["onClick"]) => void>;
        default: undefined;
    };
    logoStyle: {
        type: import('vue').PropType<import('vue').CSSProperties>;
        default: undefined;
    };
    headerRender: {
        type: import('vue').PropType<import('./RenderTypings').HeaderRender>;
        default: undefined;
    };
    defaultCollapsed: {
        type: import('vue').PropType<boolean>;
        default: undefined;
    };
    collapsed: {
        type: import('vue').PropType<boolean>;
        default: undefined;
    };
    isMobile: {
        type: import('vue').PropType<boolean>;
        default: undefined;
    };
    onOpenChange: {
        type: import('vue').PropType<(openKeys?: import('./typing').WithFalse<import('ant-design-vue/es/_util/type').Key[]>) => void>;
        default: undefined;
    };
    menuData: import('vue').PropType<import('./typing').MenuDataItem[]>;
    onCollapse: import('vue').PropType<(collapsed: boolean) => void>;
    openKeys: {
        type: import('vue').PropType<import('./typing').WithFalse<import('ant-design-vue/es/_util/type').Key[]>>;
        default: undefined;
    };
    mode: {
        type: import('vue').PropType<import('ant-design-vue').MenuMode>;
        default: undefined;
    };
    navTheme: {
        type: import('vue').PropType<import('./defaultSettings').PureSettings["navTheme"]>;
        default: "light" | "dark" | "realDark" | undefined;
    };
    layout: {
        type: import('vue').PropType<import('./defaultSettings').PureSettings["layout"]>;
        default: "top" | "left" | "side" | "mix" | undefined;
    };
    contentWidth: {
        type: import('vue').PropType<import('./defaultSettings').PureSettings["contentWidth"]>;
        default: import('./defaultSettings').ContentWidth | undefined;
    };
    fixedHeader: {
        type: import('vue').PropType<import('./defaultSettings').PureSettings["fixedHeader"]>;
        default: boolean | undefined;
    };
    fixedSiderbar: {
        type: import('vue').PropType<import('./defaultSettings').PureSettings["fixedSiderbar"]>;
        default: boolean | undefined;
    };
    menu: {
        type: import('vue').PropType<import('./defaultSettings').PureSettings["menu"]>;
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
        type: import('vue').PropType<import('./defaultSettings').PureSettings["title"]>;
        default: string | false | undefined;
    };
    iconfontUrl: {
        type: import('vue').PropType<import('./defaultSettings').PureSettings["iconfontUrl"]>;
        default: string | undefined;
    };
    colorPrimary: {
        type: import('vue').PropType<import('./defaultSettings').PureSettings["colorPrimary"]>;
        default: string | undefined;
    };
    colorWeak: {
        type: import('vue').PropType<import('./defaultSettings').PureSettings["colorWeak"]>;
        default: boolean | undefined;
    };
    splitMenus: {
        type: import('vue').PropType<import('./defaultSettings').PureSettings["splitMenus"]>;
        default: boolean | undefined;
    };
    suppressSiderWhenMenuEmpty: {
        type: import('vue').PropType<import('./defaultSettings').PureSettings["suppressSiderWhenMenuEmpty"]>;
        default: boolean | undefined;
    };
    siderMenuType: {
        type: import('vue').PropType<import('./defaultSettings').PureSettings["siderMenuType"]>;
        default: "sub" | "group" | undefined;
    };
    menuProps: {
        type: import('vue').PropType<import('ant-design-vue').MenuProps>;
        default: undefined;
    };
    menuItemRender: {
        type: import('vue').PropType<import('./RenderTypings').MenuItemRender>;
        default: undefined;
    };
    subMenuItemRender: {
        type: import('vue').PropType<import('./RenderTypings').SubMenuItemRender>;
        default: undefined;
    };
    iconPrefixes: import('vue').PropType<string>;
    postMenuData: {
        type: import('vue').PropType<(menusData?: import('./typing').MenuDataItem[]) => import('./typing').MenuDataItem[]>;
        default: undefined;
    };
    onSelect: import('vue').PropType<(selectedKeys: import('ant-design-vue/es/_util/type').Key[]) => void>;
    id: StringConstructor;
    items: import('vue').PropType<import('ant-design-vue').ItemType[]>;
    disabled: BooleanConstructor;
    inlineCollapsed: BooleanConstructor;
    disabledOverflow: BooleanConstructor;
    forceSubMenuRender: BooleanConstructor;
    selectedKeys: import('vue').PropType<import('ant-design-vue/es/_util/type').Key[]>;
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
    motion: import('vue').PropType<import('ant-design-vue/es/_util/transition').CSSMotionProps>;
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
        type: import('vue').PropType<import('ant-design-vue/es/menu/src/interface').BuiltinPlacements>;
    };
    triggerSubMenuAction: {
        type: import('vue').PropType<import('ant-design-vue/es/menu/src/interface').TriggerSubMenuAction>;
        default: string;
    };
    getPopupContainer: import('vue').PropType<(node: HTMLElement) => HTMLElement>;
    expandIcon: import('vue').PropType<(p?: {
        [key: string]: any;
        isOpen: boolean;
    }) => any>;
    onDeselect: import('vue').PropType<import('ant-design-vue/es/menu/src/interface').SelectEventHandler>;
    onClick: import('vue').PropType<import('ant-design-vue/es/menu/src/interface').MenuClickEventHandler>;
    onFocus: import('vue').PropType<import('ant-design-vue/es/_util/EventInterface').FocusEventHandler>;
    onBlur: import('vue').PropType<import('ant-design-vue/es/_util/EventInterface').FocusEventHandler>;
    onMousedown: import('vue').PropType<import('ant-design-vue/es/_util/EventInterface').MouseEventHandler>;
    'onUpdate:openKeys': import('vue').PropType<(keys: import('ant-design-vue/es/_util/type').Key[]) => void>;
    'onUpdate:selectedKeys': import('vue').PropType<(keys: import('ant-design-vue/es/_util/type').Key[]) => void>;
    'onUpdate:activeKey': import('vue').PropType<(key: import('ant-design-vue/es/_util/type').Key) => void>;
    hasSiderMenu: {
        type: import('vue').PropType<boolean>;
        default: undefined;
    };
    headerTitleRender: {
        type: import('vue').PropType<import('./RenderTypings').HeaderTitleRender>;
        default: undefined;
    };
    menuRender: {
        type: import('vue').PropType<import('./RenderTypings').MenuRender>;
        default: undefined;
    };
    headerContentRender: {
        type: import('vue').PropType<import('./RenderTypings').HeaderContentRender>;
        default: undefined;
    };
}>, () => import("vue/jsx-runtime").JSX.Element, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    compact: {
        type: import('vue').PropType<import('./defaultSettings').PureSettings["compact"]>;
        default: undefined;
    };
    routes: {
        type: import('vue').PropType<import('./typing').MenuDataItem[]>;
        default: undefined;
    };
    location: {
        type: import('vue').PropType<{
            pathname: string;
        }>;
        default: undefined;
    };
    stylish: import('vue').PropType<{
        header?: import('@ant-design-vue/pro-provider').GenerateStyle<import('./components/SiderMenu/style').SiderMenuToken>;
        sider?: import('@ant-design-vue/pro-provider').GenerateStyle<import('./components/SiderMenu/style').SiderMenuToken>;
    }>;
    bgLayoutImgList: {
        type: import('vue').PropType<{
            src?: string;
            width?: string;
            height?: string;
            left?: number;
            top?: number;
            bottom?: number;
            right?: number;
        }[]>;
        default: undefined;
    };
    isChildrenLayout: {
        type: BooleanConstructor;
        default: undefined;
    };
    token: import('vue').PropType<import('@ant-design-vue/pro-provider').ProTokenType["layout"]>;
    pure: {
        type: import('vue').PropType<boolean>;
        default: undefined;
    };
    disableMobile: {
        type: import('vue').PropType<boolean>;
        default: undefined;
    };
    contentStyle: {
        type: import('vue').PropType<import('vue').CSSProperties>;
        default: undefined;
    };
    tagsViewRender: {
        type: import('vue').PropType<import('./RenderTypings').TagsViewRender>;
        default: undefined;
    };
    footerRender: {
        type: import('vue').PropType<import('./RenderTypings').FooterRender>;
        default: undefined;
    };
    breadcrumbRender: {
        type: import('vue').PropType<import('./RenderTypings').BreadcrumbRender>;
        default: undefined;
    };
    pageTitleRender: {
        type: import('vue').PropType<import('./RenderTypings').PageTitleRender>;
        default: undefined;
    };
    breadcrumbProps: {
        type: import('vue').PropType<Omit<import('ant-design-vue').BreadcrumbProps, "itemRender"> & import('./proLayoutProps').LayoutBreadcrumbProps>;
        default: undefined;
    };
    loading: {
        type: BooleanConstructor;
        default: undefined;
    };
    itemRender: import('vue').PropType<import('ant-design-vue').BreadcrumbProps["itemRender"]>;
    formatMessage: import('vue').PropType<(message: import('./typing').MessageDescriptor) => string>;
    menuDataRender: import('vue').PropType<import('./RenderTypings').MenuDataRender>;
    errorBoundaryRender: {
        type: import('vue').PropType<import('./RenderTypings').ErrorBoundaryRender>;
        default: undefined;
    };
    waterMarkProps: {
        type: import('vue').PropType<import('ant-design-vue').WatermarkProps>;
        default: undefined;
    };
    prefixCls: import('vue').PropType<string>;
    collapsedWidth: import('vue').PropType<number>;
    logo: {
        type: import('vue').PropType<import('ant-design-vue/es/_util/type').VueNode>;
        default: undefined;
    };
    appList: import('vue').PropType<import('./components/AppsLogoComponents/typing').AppListProps>;
    appListRender: import('vue').PropType<import('./RenderTypings').AppListRender>;
    itemClick: import('vue').PropType<(item: import('./components/AppsLogoComponents/typing').AppItemProps, popoverRef: import('vue').Ref<HTMLSpanElement | null>) => void>;
    links: {
        type: import('vue').PropType<import('./typing').WithFalse<{
            icon?: import('vue').VNode;
            title?: string;
            label?: import('vue').VNode;
        }[] | import('ant-design-vue/es/_util/type').VueNode[]>>;
        default: undefined;
    };
    siderWidth: import('vue').PropType<number>;
    menuHeaderRender: {
        type: import('vue').PropType<import('./RenderTypings').MenuHeaderRender>;
        default: undefined;
    };
    menuContentRender: {
        type: import('vue').PropType<import('./RenderTypings').MenuContentRender>;
        default: undefined;
    };
    menuFooterRender: {
        type: import('vue').PropType<import('./RenderTypings').MenuFooterRender>;
        default: undefined;
    };
    collapsedButtonRender: {
        type: import('vue').PropType<import('./RenderTypings').CollapsedButtonRender>;
        default: undefined;
    };
    siderProps: import('vue').PropType<import('ant-design-vue').SiderProps>;
    breakpoint: {
        type: import('vue').PropType<import('./typing').WithFalse<import('ant-design-vue/es/_util/responsiveObserve').Breakpoint>>;
        default: string;
    };
    hide: {
        type: import('vue').PropType<boolean>;
        default: undefined;
    };
    avatarProps: {
        type: import('vue').PropType<false | (Partial<import('vue').ExtractPropTypes<{
            prefixCls: StringConstructor;
            shape: {
                type: import('vue').PropType<"circle" | "square">;
                default: string;
            };
            size: {
                type: import('vue').PropType<import('ant-design-vue/es/avatar').AvatarSize>;
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
            crossOrigin: import('vue').PropType<"" | "anonymous" | "use-credentials">;
            loadError: {
                type: import('vue').PropType<() => boolean>;
            };
        }>> & {
            title?: import('ant-design-vue/es/_util/type').VueNode;
            render?: (avatarProps: import('ant-design-vue').AvatarProps, defaultDom: import('ant-design-vue/es/_util/type').VueNode, props: import('./components/SiderMenu/SiderMenu').SiderMenuProps) => import('ant-design-vue/es/_util/type').VueNode;
        })>;
        default: undefined;
    };
    actionsRender: {
        type: import('vue').PropType<import('./RenderTypings').ActionsRender>;
        default: undefined;
    };
    menuExtraRender: {
        type: import('vue').PropType<import('./RenderTypings').MenuExtraRender>;
        default: undefined;
    };
    onMenuHeaderClick: {
        type: import('vue').PropType<(e: import('vue').Events["onClick"]) => void>;
        default: undefined;
    };
    logoStyle: {
        type: import('vue').PropType<import('vue').CSSProperties>;
        default: undefined;
    };
    headerRender: {
        type: import('vue').PropType<import('./RenderTypings').HeaderRender>;
        default: undefined;
    };
    defaultCollapsed: {
        type: import('vue').PropType<boolean>;
        default: undefined;
    };
    collapsed: {
        type: import('vue').PropType<boolean>;
        default: undefined;
    };
    isMobile: {
        type: import('vue').PropType<boolean>;
        default: undefined;
    };
    onOpenChange: {
        type: import('vue').PropType<(openKeys?: import('./typing').WithFalse<import('ant-design-vue/es/_util/type').Key[]>) => void>;
        default: undefined;
    };
    menuData: import('vue').PropType<import('./typing').MenuDataItem[]>;
    onCollapse: import('vue').PropType<(collapsed: boolean) => void>;
    openKeys: {
        type: import('vue').PropType<import('./typing').WithFalse<import('ant-design-vue/es/_util/type').Key[]>>;
        default: undefined;
    };
    mode: {
        type: import('vue').PropType<import('ant-design-vue').MenuMode>;
        default: undefined;
    };
    navTheme: {
        type: import('vue').PropType<import('./defaultSettings').PureSettings["navTheme"]>;
        default: "light" | "dark" | "realDark" | undefined;
    };
    layout: {
        type: import('vue').PropType<import('./defaultSettings').PureSettings["layout"]>;
        default: "top" | "left" | "side" | "mix" | undefined;
    };
    contentWidth: {
        type: import('vue').PropType<import('./defaultSettings').PureSettings["contentWidth"]>;
        default: import('./defaultSettings').ContentWidth | undefined;
    };
    fixedHeader: {
        type: import('vue').PropType<import('./defaultSettings').PureSettings["fixedHeader"]>;
        default: boolean | undefined;
    };
    fixedSiderbar: {
        type: import('vue').PropType<import('./defaultSettings').PureSettings["fixedSiderbar"]>;
        default: boolean | undefined;
    };
    menu: {
        type: import('vue').PropType<import('./defaultSettings').PureSettings["menu"]>;
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
        type: import('vue').PropType<import('./defaultSettings').PureSettings["title"]>;
        default: string | false | undefined;
    };
    iconfontUrl: {
        type: import('vue').PropType<import('./defaultSettings').PureSettings["iconfontUrl"]>;
        default: string | undefined;
    };
    colorPrimary: {
        type: import('vue').PropType<import('./defaultSettings').PureSettings["colorPrimary"]>;
        default: string | undefined;
    };
    colorWeak: {
        type: import('vue').PropType<import('./defaultSettings').PureSettings["colorWeak"]>;
        default: boolean | undefined;
    };
    splitMenus: {
        type: import('vue').PropType<import('./defaultSettings').PureSettings["splitMenus"]>;
        default: boolean | undefined;
    };
    suppressSiderWhenMenuEmpty: {
        type: import('vue').PropType<import('./defaultSettings').PureSettings["suppressSiderWhenMenuEmpty"]>;
        default: boolean | undefined;
    };
    siderMenuType: {
        type: import('vue').PropType<import('./defaultSettings').PureSettings["siderMenuType"]>;
        default: "sub" | "group" | undefined;
    };
    menuProps: {
        type: import('vue').PropType<import('ant-design-vue').MenuProps>;
        default: undefined;
    };
    menuItemRender: {
        type: import('vue').PropType<import('./RenderTypings').MenuItemRender>;
        default: undefined;
    };
    subMenuItemRender: {
        type: import('vue').PropType<import('./RenderTypings').SubMenuItemRender>;
        default: undefined;
    };
    iconPrefixes: import('vue').PropType<string>;
    postMenuData: {
        type: import('vue').PropType<(menusData?: import('./typing').MenuDataItem[]) => import('./typing').MenuDataItem[]>;
        default: undefined;
    };
    onSelect: import('vue').PropType<(selectedKeys: import('ant-design-vue/es/_util/type').Key[]) => void>;
    id: StringConstructor;
    items: import('vue').PropType<import('ant-design-vue').ItemType[]>;
    disabled: BooleanConstructor;
    inlineCollapsed: BooleanConstructor;
    disabledOverflow: BooleanConstructor;
    forceSubMenuRender: BooleanConstructor;
    selectedKeys: import('vue').PropType<import('ant-design-vue/es/_util/type').Key[]>;
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
    motion: import('vue').PropType<import('ant-design-vue/es/_util/transition').CSSMotionProps>;
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
        type: import('vue').PropType<import('ant-design-vue/es/menu/src/interface').BuiltinPlacements>;
    };
    triggerSubMenuAction: {
        type: import('vue').PropType<import('ant-design-vue/es/menu/src/interface').TriggerSubMenuAction>;
        default: string;
    };
    getPopupContainer: import('vue').PropType<(node: HTMLElement) => HTMLElement>;
    expandIcon: import('vue').PropType<(p?: {
        [key: string]: any;
        isOpen: boolean;
    }) => any>;
    onDeselect: import('vue').PropType<import('ant-design-vue/es/menu/src/interface').SelectEventHandler>;
    onClick: import('vue').PropType<import('ant-design-vue/es/menu/src/interface').MenuClickEventHandler>;
    onFocus: import('vue').PropType<import('ant-design-vue/es/_util/EventInterface').FocusEventHandler>;
    onBlur: import('vue').PropType<import('ant-design-vue/es/_util/EventInterface').FocusEventHandler>;
    onMousedown: import('vue').PropType<import('ant-design-vue/es/_util/EventInterface').MouseEventHandler>;
    'onUpdate:openKeys': import('vue').PropType<(keys: import('ant-design-vue/es/_util/type').Key[]) => void>;
    'onUpdate:selectedKeys': import('vue').PropType<(keys: import('ant-design-vue/es/_util/type').Key[]) => void>;
    'onUpdate:activeKey': import('vue').PropType<(key: import('ant-design-vue/es/_util/type').Key) => void>;
    hasSiderMenu: {
        type: import('vue').PropType<boolean>;
        default: undefined;
    };
    headerTitleRender: {
        type: import('vue').PropType<import('./RenderTypings').HeaderTitleRender>;
        default: undefined;
    };
    menuRender: {
        type: import('vue').PropType<import('./RenderTypings').MenuRender>;
        default: undefined;
    };
    headerContentRender: {
        type: import('vue').PropType<import('./RenderTypings').HeaderContentRender>;
        default: undefined;
    };
}>> & Readonly<{}>, {
    multiple: boolean;
    layout: "top" | "left" | "side" | "mix" | undefined;
    disabled: boolean;
    mode: import('ant-design-vue').MenuMode;
    compact: boolean | undefined;
    theme: import('ant-design-vue').MenuTheme;
    colorPrimary: string | undefined;
    contentWidth: import('./defaultSettings').ContentWidth | undefined;
    loading: boolean;
    onOpenChange: (openKeys?: import('./typing').WithFalse<import('ant-design-vue/es/_util/type').Key[]>) => void;
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
    links: import('./typing').WithFalse<import('ant-design-vue/es/_util/type').VueNode[] | {
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
    openKeys: import('./typing').WithFalse<import('ant-design-vue/es/_util/type').Key[]>;
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
        items: import('vue').PropType<import('ant-design-vue').ItemType[]>;
        disabled: BooleanConstructor;
        inlineCollapsed: BooleanConstructor;
        disabledOverflow: BooleanConstructor;
        forceSubMenuRender: BooleanConstructor;
        openKeys: import('vue').PropType<import('ant-design-vue/es/_util/type').Key[]>;
        selectedKeys: import('vue').PropType<import('ant-design-vue/es/_util/type').Key[]>;
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
        motion: import('vue').PropType<import('ant-design-vue/es/_util/transition').CSSMotionProps>;
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
            type: import('vue').PropType<import('ant-design-vue/es/menu/src/interface').BuiltinPlacements>;
        };
        triggerSubMenuAction: {
            type: import('vue').PropType<import('ant-design-vue/es/menu/src/interface').TriggerSubMenuAction>;
            default: string;
        };
        getPopupContainer: import('vue').PropType<(node: HTMLElement) => HTMLElement>;
        expandIcon: import('vue').PropType<(p?: {
            [key: string]: any;
            isOpen: boolean;
        }) => any>;
        onOpenChange: import('vue').PropType<(keys: import('ant-design-vue/es/_util/type').Key[]) => void>;
        onSelect: import('vue').PropType<import('ant-design-vue/es/menu/src/interface').SelectEventHandler>;
        onDeselect: import('vue').PropType<import('ant-design-vue/es/menu/src/interface').SelectEventHandler>;
        onClick: import('vue').PropType<import('ant-design-vue/es/menu/src/interface').MenuClickEventHandler>;
        onFocus: import('vue').PropType<import('ant-design-vue/es/_util/EventInterface').FocusEventHandler>;
        onBlur: import('vue').PropType<import('ant-design-vue/es/_util/EventInterface').FocusEventHandler>;
        onMousedown: import('vue').PropType<import('ant-design-vue/es/_util/EventInterface').MouseEventHandler>;
        'onUpdate:openKeys': import('vue').PropType<(keys: import('ant-design-vue/es/_util/type').Key[]) => void>;
        'onUpdate:selectedKeys': import('vue').PropType<(keys: import('ant-design-vue/es/_util/type').Key[]) => void>;
        'onUpdate:activeKey': import('vue').PropType<(key: import('ant-design-vue/es/_util/type').Key) => void>;
    }>>;
    menuItemRender: import('./RenderTypings').MenuItemRender;
    subMenuItemRender: import('./RenderTypings').SubMenuItemRender;
    postMenuData: (menusData?: import('./typing').MenuDataItem[]) => import('./typing').MenuDataItem[];
    logo: import('ant-design-vue/es/_util/type').VueNode;
    breakpoint: import('./typing').WithFalse<import('ant-design-vue/es/_util/responsiveObserve').Breakpoint>;
    menuHeaderRender: import('./RenderTypings').MenuHeaderRender;
    menuContentRender: import('./RenderTypings').MenuContentRender;
    menuFooterRender: import('./RenderTypings').MenuFooterRender;
    collapsedButtonRender: import('./RenderTypings').CollapsedButtonRender;
    hide: boolean;
    avatarProps: false | (Partial<import('vue').ExtractPropTypes<{
        prefixCls: StringConstructor;
        shape: {
            type: import('vue').PropType<"circle" | "square">;
            default: string;
        };
        size: {
            type: import('vue').PropType<import('ant-design-vue/es/avatar').AvatarSize>;
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
        crossOrigin: import('vue').PropType<"" | "anonymous" | "use-credentials">;
        loadError: {
            type: import('vue').PropType<() => boolean>;
        };
    }>> & {
        title?: import('ant-design-vue/es/_util/type').VueNode;
        render?: (avatarProps: import('ant-design-vue').AvatarProps, defaultDom: import('ant-design-vue/es/_util/type').VueNode, props: import('./components/SiderMenu/SiderMenu').SiderMenuProps) => import('ant-design-vue/es/_util/type').VueNode;
    });
    actionsRender: import('./RenderTypings').ActionsRender;
    menuExtraRender: import('./RenderTypings').MenuExtraRender;
    onMenuHeaderClick: (e: import('vue').Events["onClick"]) => void;
    logoStyle: import('vue').CSSProperties;
    headerRender: import('./RenderTypings').HeaderRender;
    headerTitleRender: import('./RenderTypings').HeaderTitleRender;
    hasSiderMenu: boolean;
    menuRender: import('./RenderTypings').MenuRender;
    headerContentRender: import('./RenderTypings').HeaderContentRender;
    routes: import('./typing').MenuDataItem[];
    bgLayoutImgList: {
        src?: string;
        width?: string;
        height?: string;
        left?: number;
        top?: number;
        bottom?: number;
        right?: number;
    }[];
    isChildrenLayout: boolean;
    pure: boolean;
    disableMobile: boolean;
    contentStyle: import('vue').CSSProperties;
    tagsViewRender: import('./RenderTypings').TagsViewRender;
    footerRender: import('./RenderTypings').FooterRender;
    breadcrumbRender: import('./RenderTypings').BreadcrumbRender;
    pageTitleRender: import('./RenderTypings').PageTitleRender;
    breadcrumbProps: Omit<Partial<import('vue').ExtractPropTypes<{
        prefixCls: StringConstructor;
        routes: {
            type: import('vue').PropType<import('ant-design-vue/es/breadcrumb/Breadcrumb').Route[]>;
        };
        params: import('vue-types').VueTypeValidableDef<any>;
        separator: import('vue-types').VueTypeValidableDef<any>;
        itemRender: {
            type: import('vue').PropType<(opt: {
                route: import('ant-design-vue/es/breadcrumb/Breadcrumb').Route;
                params: unknown;
                routes: import('ant-design-vue/es/breadcrumb/Breadcrumb').Route[];
                paths: string[];
            }) => import('ant-design-vue/es/_util/type').VueNode>;
        };
    }>>, "itemRender"> & import('./proLayoutProps').LayoutBreadcrumbProps<import('ant-design-vue/es/_util/type').AnyObject>;
    errorBoundaryRender: import('./RenderTypings').ErrorBoundaryRender;
    waterMarkProps: Partial<import('vue').ExtractPropTypes<{
        zIndex: NumberConstructor;
        rotate: NumberConstructor;
        width: NumberConstructor;
        height: NumberConstructor;
        image: StringConstructor;
        content: {
            type: import('vue').PropType<string | string[]>;
            default: string | string[];
        };
        font: {
            type: import('vue').PropType<import('ant-design-vue/es/watermark').WatermarkFontType>;
            default: import('ant-design-vue/es/watermark').WatermarkFontType;
        };
        rootClassName: StringConstructor;
        gap: {
            type: import('vue').PropType<[number, number]>;
            default: [number, number];
        };
        offset: {
            type: import('vue').PropType<[number, number]>;
            default: [number, number];
        };
    }>>;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default LeftMenuLayout;

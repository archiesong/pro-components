import { ExtractPropTypes, PropType } from 'vue';
import { ItemType, MenuMode, MenuProps } from 'ant-design-vue';
import { Key, VueNode } from 'ant-design-vue/es/_util/type';
import { MenuDataItem, MessageDescriptor, WithFalse } from '../../typing';
import { PureSettings } from '../../defaultSettings';
import { MenuItemRender, SubMenuItemRender } from '../../RenderTypings';
import { GenerateStyle } from '@ant-design-vue/pro-provider';
import { SiderMenuToken } from './style/stylish';
export declare const baseMenuProps: () => {
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
        type: PropType<(openKeys?: WithFalse<Key[]>) => void>;
        default: undefined;
    };
    /**
     * @name 当前应用会话的位置信息。如果你的应用创建了自定义的 history，则需要显示指定 location 属性
     */
    location: {
        type: PropType<{
            pathname: string;
        }>;
        default: undefined;
    };
    menuData: PropType<MenuDataItem[]>;
    onCollapse: PropType<(collapsed: boolean) => void>;
    openKeys: {
        type: PropType<WithFalse<Key[]>>;
        default: undefined;
    };
    mode: {
        type: PropType<MenuMode>;
        default: undefined;
    };
    navTheme: {
        type: PropType<PureSettings["navTheme"]>;
        default: "light" | "dark" | "realDark" | undefined;
    };
    layout: {
        type: PropType<PureSettings["layout"]>;
        default: "top" | "left" | "side" | "mix" | undefined;
    };
    contentWidth: {
        type: PropType<PureSettings["contentWidth"]>;
        default: import('../../defaultSettings').ContentWidth | undefined;
    };
    fixedHeader: {
        type: PropType<PureSettings["fixedHeader"]>;
        default: boolean | undefined;
    };
    fixedSiderbar: {
        type: PropType<PureSettings["fixedSiderbar"]>;
        default: boolean | undefined;
    };
    menu: {
        type: PropType<PureSettings["menu"]>;
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
        type: PropType<PureSettings["title"]>;
        default: string | false | undefined;
    };
    iconfontUrl: {
        type: PropType<PureSettings["iconfontUrl"]>;
        default: string | undefined;
    };
    colorPrimary: {
        type: PropType<PureSettings["colorPrimary"]>;
        default: string | undefined;
    };
    colorWeak: {
        type: PropType<PureSettings["colorWeak"]>;
        default: boolean | undefined;
    };
    splitMenus: {
        type: PropType<PureSettings["splitMenus"]>;
        default: boolean | undefined;
    };
    suppressSiderWhenMenuEmpty: {
        type: PropType<PureSettings["suppressSiderWhenMenuEmpty"]>;
        default: boolean | undefined;
    };
    siderMenuType: {
        type: PropType<PureSettings["siderMenuType"]>;
        default: "sub" | "group" | undefined;
    };
    /**
     * @name 要给菜单的props, 参考ant-menu的属性
     */
    menuProps: {
        type: PropType<MenuProps>;
        default: undefined;
    };
    /**
     * @name 处理菜单的 props，可以复写菜单的点击功能，一般结合 VueRouter 框架使用
     * @see 非子级的菜单要使用 subMenuItemRender 来处理
     *
     * @example 使用 a 标签 menuItemRender={(item, defaultDom) => { return <a onClick={()=> router.push(item.path) }>{defaultDom}</a> }}
     * @example 使用 Link 标签 menuItemRender={(item, defaultDom) => { return <RouterLink to={item.path}>{defaultDom}</RouterLink> }}
     */
    menuItemRender: {
        type: PropType<MenuItemRender>;
        default: undefined;
    };
    /**
     * @name 处理父级菜单的 props，可以复写菜单的点击功能，一般用于埋点
     * @see 子级的菜单要使用 menuItemRender 来处理
     *
     * @example 使用 a 标签跳转到特殊的地址 subMenuItemRender={(item, defaultDom) => { return <a onClick={()=> router.push(item.path) }>{defaultDom}</a> }}
     * @example 增加埋点 subMenuItemRender={(item, defaultDom) => { return <a onClick={()=> log.click(item.name) }>{defaultDom}</a> }}
     */
    subMenuItemRender: {
        type: PropType<SubMenuItemRender>;
        default: undefined;
    };
    iconPrefixes: PropType<string>;
    formatMessage: PropType<(message: MessageDescriptor) => string>;
    /**
     * @name 处理 menuData 的方法，与 menuDataRender 不同，postMenuData处理完成后会直接渲染，不再进行国际化和拼接处理
     *
     * @example 增加菜单图标 postMenuData={(menuData) => { return menuData.map(item => { return { ...item, icon: <Icon type={item.icon} /> } }) }}
     */
    postMenuData: {
        type: PropType<(menusData?: MenuDataItem[]) => MenuDataItem[]>;
        default: undefined;
    };
    onSelect: PropType<(selectedKeys: Key[]) => void>;
    id: StringConstructor;
    prefixCls: StringConstructor;
    items: PropType<ItemType[]>;
    disabled: BooleanConstructor;
    inlineCollapsed: BooleanConstructor;
    disabledOverflow: BooleanConstructor;
    forceSubMenuRender: BooleanConstructor;
    selectedKeys: PropType<Key[]>;
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
    'onUpdate:openKeys': PropType<(keys: Key[]) => void>;
    'onUpdate:selectedKeys': PropType<(keys: Key[]) => void>;
    'onUpdate:activeKey': PropType<(key: Key) => void>;
};
export type BaseMenuProps = Partial<ExtractPropTypes<ReturnType<typeof baseMenuProps>>>;
declare const BaseMenu: import('vue').DefineComponent<ExtractPropTypes<{
    matchMenuKeys: {
        type: PropType<string[]>;
        default: () => never[];
    };
    originCollapsed: {
        type: PropType<boolean>;
        default: undefined;
    };
    menuRenderType: {
        type: PropType<"header" | "sider">;
        default: string;
    };
    stylish: {
        type: PropType<GenerateStyle<SiderMenuToken>>;
        default: () => {};
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
        type: PropType<(openKeys?: WithFalse<Key[]>) => void>;
        default: undefined;
    };
    /**
     * @name 当前应用会话的位置信息。如果你的应用创建了自定义的 history，则需要显示指定 location 属性
     */
    location: {
        type: PropType<{
            pathname: string;
        }>;
        default: undefined;
    };
    menuData: PropType<MenuDataItem[]>;
    onCollapse: PropType<(collapsed: boolean) => void>;
    openKeys: {
        type: PropType<WithFalse<Key[]>>;
        default: undefined;
    };
    mode: {
        type: PropType<MenuMode>;
        default: undefined;
    };
    navTheme: {
        type: PropType<PureSettings["navTheme"]>;
        default: "light" | "dark" | "realDark" | undefined;
    };
    layout: {
        type: PropType<PureSettings["layout"]>;
        default: "top" | "left" | "side" | "mix" | undefined;
    };
    contentWidth: {
        type: PropType<PureSettings["contentWidth"]>;
        default: import('../../defaultSettings').ContentWidth | undefined;
    };
    fixedHeader: {
        type: PropType<PureSettings["fixedHeader"]>;
        default: boolean | undefined;
    };
    fixedSiderbar: {
        type: PropType<PureSettings["fixedSiderbar"]>;
        default: boolean | undefined;
    };
    menu: {
        type: PropType<PureSettings["menu"]>;
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
        type: PropType<PureSettings["title"]>;
        default: string | false | undefined;
    };
    iconfontUrl: {
        type: PropType<PureSettings["iconfontUrl"]>;
        default: string | undefined;
    };
    colorPrimary: {
        type: PropType<PureSettings["colorPrimary"]>;
        default: string | undefined;
    };
    colorWeak: {
        type: PropType<PureSettings["colorWeak"]>;
        default: boolean | undefined;
    };
    splitMenus: {
        type: PropType<PureSettings["splitMenus"]>;
        default: boolean | undefined;
    };
    suppressSiderWhenMenuEmpty: {
        type: PropType<PureSettings["suppressSiderWhenMenuEmpty"]>;
        default: boolean | undefined;
    };
    siderMenuType: {
        type: PropType<PureSettings["siderMenuType"]>;
        default: "sub" | "group" | undefined;
    };
    /**
     * @name 要给菜单的props, 参考ant-menu的属性
     */
    menuProps: {
        type: PropType<MenuProps>;
        default: undefined;
    };
    /**
     * @name 处理菜单的 props，可以复写菜单的点击功能，一般结合 VueRouter 框架使用
     * @see 非子级的菜单要使用 subMenuItemRender 来处理
     *
     * @example 使用 a 标签 menuItemRender={(item, defaultDom) => { return <a onClick={()=> router.push(item.path) }>{defaultDom}</a> }}
     * @example 使用 Link 标签 menuItemRender={(item, defaultDom) => { return <RouterLink to={item.path}>{defaultDom}</RouterLink> }}
     */
    menuItemRender: {
        type: PropType<MenuItemRender>;
        default: undefined;
    };
    /**
     * @name 处理父级菜单的 props，可以复写菜单的点击功能，一般用于埋点
     * @see 子级的菜单要使用 menuItemRender 来处理
     *
     * @example 使用 a 标签跳转到特殊的地址 subMenuItemRender={(item, defaultDom) => { return <a onClick={()=> router.push(item.path) }>{defaultDom}</a> }}
     * @example 增加埋点 subMenuItemRender={(item, defaultDom) => { return <a onClick={()=> log.click(item.name) }>{defaultDom}</a> }}
     */
    subMenuItemRender: {
        type: PropType<SubMenuItemRender>;
        default: undefined;
    };
    iconPrefixes: PropType<string>;
    formatMessage: PropType<(message: MessageDescriptor) => string>;
    /**
     * @name 处理 menuData 的方法，与 menuDataRender 不同，postMenuData处理完成后会直接渲染，不再进行国际化和拼接处理
     *
     * @example 增加菜单图标 postMenuData={(menuData) => { return menuData.map(item => { return { ...item, icon: <Icon type={item.icon} /> } }) }}
     */
    postMenuData: {
        type: PropType<(menusData?: MenuDataItem[]) => MenuDataItem[]>;
        default: undefined;
    };
    onSelect: PropType<(selectedKeys: Key[]) => void>;
    id: StringConstructor;
    prefixCls: StringConstructor;
    items: PropType<ItemType[]>;
    disabled: BooleanConstructor;
    inlineCollapsed: BooleanConstructor;
    disabledOverflow: BooleanConstructor;
    forceSubMenuRender: BooleanConstructor;
    selectedKeys: PropType<Key[]>;
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
    'onUpdate:openKeys': PropType<(keys: Key[]) => void>;
    'onUpdate:selectedKeys': PropType<(keys: Key[]) => void>;
    'onUpdate:activeKey': PropType<(key: Key) => void>;
}>, () => VueNode, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<ExtractPropTypes<{
    matchMenuKeys: {
        type: PropType<string[]>;
        default: () => never[];
    };
    originCollapsed: {
        type: PropType<boolean>;
        default: undefined;
    };
    menuRenderType: {
        type: PropType<"header" | "sider">;
        default: string;
    };
    stylish: {
        type: PropType<GenerateStyle<SiderMenuToken>>;
        default: () => {};
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
        type: PropType<(openKeys?: WithFalse<Key[]>) => void>;
        default: undefined;
    };
    /**
     * @name 当前应用会话的位置信息。如果你的应用创建了自定义的 history，则需要显示指定 location 属性
     */
    location: {
        type: PropType<{
            pathname: string;
        }>;
        default: undefined;
    };
    menuData: PropType<MenuDataItem[]>;
    onCollapse: PropType<(collapsed: boolean) => void>;
    openKeys: {
        type: PropType<WithFalse<Key[]>>;
        default: undefined;
    };
    mode: {
        type: PropType<MenuMode>;
        default: undefined;
    };
    navTheme: {
        type: PropType<PureSettings["navTheme"]>;
        default: "light" | "dark" | "realDark" | undefined;
    };
    layout: {
        type: PropType<PureSettings["layout"]>;
        default: "top" | "left" | "side" | "mix" | undefined;
    };
    contentWidth: {
        type: PropType<PureSettings["contentWidth"]>;
        default: import('../../defaultSettings').ContentWidth | undefined;
    };
    fixedHeader: {
        type: PropType<PureSettings["fixedHeader"]>;
        default: boolean | undefined;
    };
    fixedSiderbar: {
        type: PropType<PureSettings["fixedSiderbar"]>;
        default: boolean | undefined;
    };
    menu: {
        type: PropType<PureSettings["menu"]>;
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
        type: PropType<PureSettings["title"]>;
        default: string | false | undefined;
    };
    iconfontUrl: {
        type: PropType<PureSettings["iconfontUrl"]>;
        default: string | undefined;
    };
    colorPrimary: {
        type: PropType<PureSettings["colorPrimary"]>;
        default: string | undefined;
    };
    colorWeak: {
        type: PropType<PureSettings["colorWeak"]>;
        default: boolean | undefined;
    };
    splitMenus: {
        type: PropType<PureSettings["splitMenus"]>;
        default: boolean | undefined;
    };
    suppressSiderWhenMenuEmpty: {
        type: PropType<PureSettings["suppressSiderWhenMenuEmpty"]>;
        default: boolean | undefined;
    };
    siderMenuType: {
        type: PropType<PureSettings["siderMenuType"]>;
        default: "sub" | "group" | undefined;
    };
    /**
     * @name 要给菜单的props, 参考ant-menu的属性
     */
    menuProps: {
        type: PropType<MenuProps>;
        default: undefined;
    };
    /**
     * @name 处理菜单的 props，可以复写菜单的点击功能，一般结合 VueRouter 框架使用
     * @see 非子级的菜单要使用 subMenuItemRender 来处理
     *
     * @example 使用 a 标签 menuItemRender={(item, defaultDom) => { return <a onClick={()=> router.push(item.path) }>{defaultDom}</a> }}
     * @example 使用 Link 标签 menuItemRender={(item, defaultDom) => { return <RouterLink to={item.path}>{defaultDom}</RouterLink> }}
     */
    menuItemRender: {
        type: PropType<MenuItemRender>;
        default: undefined;
    };
    /**
     * @name 处理父级菜单的 props，可以复写菜单的点击功能，一般用于埋点
     * @see 子级的菜单要使用 menuItemRender 来处理
     *
     * @example 使用 a 标签跳转到特殊的地址 subMenuItemRender={(item, defaultDom) => { return <a onClick={()=> router.push(item.path) }>{defaultDom}</a> }}
     * @example 增加埋点 subMenuItemRender={(item, defaultDom) => { return <a onClick={()=> log.click(item.name) }>{defaultDom}</a> }}
     */
    subMenuItemRender: {
        type: PropType<SubMenuItemRender>;
        default: undefined;
    };
    iconPrefixes: PropType<string>;
    formatMessage: PropType<(message: MessageDescriptor) => string>;
    /**
     * @name 处理 menuData 的方法，与 menuDataRender 不同，postMenuData处理完成后会直接渲染，不再进行国际化和拼接处理
     *
     * @example 增加菜单图标 postMenuData={(menuData) => { return menuData.map(item => { return { ...item, icon: <Icon type={item.icon} /> } }) }}
     */
    postMenuData: {
        type: PropType<(menusData?: MenuDataItem[]) => MenuDataItem[]>;
        default: undefined;
    };
    onSelect: PropType<(selectedKeys: Key[]) => void>;
    id: StringConstructor;
    prefixCls: StringConstructor;
    items: PropType<ItemType[]>;
    disabled: BooleanConstructor;
    inlineCollapsed: BooleanConstructor;
    disabledOverflow: BooleanConstructor;
    forceSubMenuRender: BooleanConstructor;
    selectedKeys: PropType<Key[]>;
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
    'onUpdate:openKeys': PropType<(keys: Key[]) => void>;
    'onUpdate:selectedKeys': PropType<(keys: Key[]) => void>;
    'onUpdate:activeKey': PropType<(key: Key) => void>;
}>> & Readonly<{}>, {
    multiple: boolean;
    layout: "top" | "left" | "side" | "mix" | undefined;
    disabled: boolean;
    mode: MenuMode;
    theme: import('ant-design-vue').MenuTheme;
    colorPrimary: string | undefined;
    contentWidth: import('../../defaultSettings').ContentWidth | undefined;
    onOpenChange: (openKeys?: WithFalse<Key[]>) => void;
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
    stylish: GenerateStyle<SiderMenuToken>;
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
    openKeys: WithFalse<Key[]>;
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
    menuProps: Partial<ExtractPropTypes<{
        id: StringConstructor;
        prefixCls: StringConstructor;
        items: PropType<ItemType[]>;
        disabled: BooleanConstructor;
        inlineCollapsed: BooleanConstructor;
        disabledOverflow: BooleanConstructor;
        forceSubMenuRender: BooleanConstructor;
        openKeys: PropType<Key[]>;
        selectedKeys: PropType<Key[]>;
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
            type: PropType<MenuMode>;
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
        onOpenChange: PropType<(keys: Key[]) => void>;
        onSelect: PropType<import('ant-design-vue/es/menu/src/interface').SelectEventHandler>;
        onDeselect: PropType<import('ant-design-vue/es/menu/src/interface').SelectEventHandler>;
        onClick: PropType<import('ant-design-vue/es/menu/src/interface').MenuClickEventHandler>;
        onFocus: PropType<import('ant-design-vue/es/_util/EventInterface').FocusEventHandler>;
        onBlur: PropType<import('ant-design-vue/es/_util/EventInterface').FocusEventHandler>;
        onMousedown: PropType<import('ant-design-vue/es/_util/EventInterface').MouseEventHandler>;
        'onUpdate:openKeys': PropType<(keys: Key[]) => void>;
        'onUpdate:selectedKeys': PropType<(keys: Key[]) => void>;
        'onUpdate:activeKey': PropType<(key: Key) => void>;
    }>>;
    menuItemRender: MenuItemRender;
    subMenuItemRender: SubMenuItemRender;
    postMenuData: (menusData?: MenuDataItem[]) => MenuDataItem[];
    matchMenuKeys: string[];
    originCollapsed: boolean;
    menuRenderType: "header" | "sider";
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default BaseMenu;

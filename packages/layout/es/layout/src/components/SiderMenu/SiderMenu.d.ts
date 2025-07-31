import { CSSProperties, Events, ExtractPropTypes, PropType, Ref, VNode } from 'vue';
import { AvatarProps, ItemType, MenuTheme, SiderProps } from 'ant-design-vue';
import { VueNode } from 'ant-design-vue/es/_util/type';
import { GenerateStyle } from '@ant-design-vue/pro-provider';
import { ActionsRender, AppListRender, CollapsedButtonRender, HeaderRender, MenuContentRender, MenuExtraRender, MenuFooterRender, MenuHeaderRender } from '../../RenderTypings';
import { SiderMenuToken } from './style/stylish';
import { WithFalse } from '../../typing';
import { AppItemProps, AppListProps } from '../AppsLogoComponents/typing';
import { Breakpoint } from 'ant-design-vue/es/_util/responsiveObserve';
type AvatarPropsType = WithFalse<AvatarProps & {
    title?: VueNode;
    render?: (avatarProps: AvatarProps, defaultDom: VueNode, props: SiderMenuProps) => VueNode;
}>;
export declare const siderMenuProps: () => {
    prefixCls: PropType<string>;
    collapsedWidth: PropType<number>;
    /** 品牌logo的标识 */
    logo: {
        type: PropType<VueNode>;
        default: undefined;
    };
    /** 相关品牌的列表 */
    appList: PropType<AppListProps>;
    /** 相关品牌的列表自定义渲染 */
    appListRender: PropType<AppListRender>;
    /** 相关品牌的列表项 点击事件，当事件存在时，appList 内配置的 url 不在自动跳转 */
    itemClick: PropType<(item: AppItemProps, popoverRef: Ref<HTMLSpanElement | null>) => void>;
    /**
     * @name 侧边菜单底部的一些快捷链接
     *
     * @example links={[<a href="ant.design"> 访问官网 </a>,<a href="help.ant.design"> 帮助 </a>]}
     */
    links: {
        type: PropType<WithFalse<{
            icon?: VNode;
            title?: string;
            label?: VNode;
        }[] | VueNode[]>>;
        default: undefined;
    };
    /** 菜单的宽度 */
    siderWidth: PropType<number>;
    /**
     * @name  菜单 logo 和 title 区域的渲染
     *
     * @example 不要logo : menuHeaderRender={(logo,title)=> title}
     * @example 不要title : menuHeaderRender={(logo,title)=> logo}
     * @example 展开的时候显示title,收起显示 logo： menuHeaderRender={(logo,title,props)=> props.collapsed ? logo : title}
     * @example 不要这个区域了 : menuHeaderRender={false}
     */
    menuHeaderRender: {
        type: PropType<MenuHeaderRender>;
        default: undefined;
    };
    /**
     * @name  侧边菜单，菜单区域的处理,可以单独处理菜单的dom
     *
     * @example 增加菜单区域的背景颜色 menuContentRender={(props,defaultDom)=><div style={{backgroundColor:"red"}}>{defaultDom}</div>}
     * @example 某些情况下不显示菜单 menuContentRender={(props)=> return <div>不显示菜单</div>}
     */
    menuContentRender: {
        type: PropType<MenuContentRender>;
        default: undefined;
    };
    /**
     * @name 侧边菜单底部的配置，可以增加一些底部操作
     *
     * @example 底部增加超链接 menuFooterRender={()=><a href="https://pro.ant.design">pro.ant.design</a>}
     * @example 根据收起展开配置不同的 dom  menuFooterRender={()=>collapsed? null :<a href="https://pro.ant.design">pro.ant.design</a>}
     */
    menuFooterRender: {
        type: PropType<MenuFooterRender>;
        default: undefined;
    };
    /**
     * @name 自定义展开收起按钮的渲染
     *
     * @example 使用文字渲染 collapsedButtonRender={(collapsed)=>collapsed?"展开":"收起"})}
     * @example 使用icon渲染 collapsedButtonRender={(collapsed)=>collapsed?<MenuUnfoldOutlined />:<MenuFoldOutlined />}
     * @example 不渲染按钮 collapsedButtonRender={false}
     */
    collapsedButtonRender: {
        type: PropType<CollapsedButtonRender>;
        default: undefined;
    };
    siderProps: PropType<SiderProps>;
    /**
     * @name 菜单是否收起的断点，设置成false 可以禁用
     *
     * @example 禁用断点  breakpoint={false}
     * @example 最小的屏幕再收起 breakpoint={"xs"}
     */
    breakpoint: {
        type: PropType<WithFalse<Breakpoint>>;
        default: string;
    };
    hide: {
        type: PropType<boolean>;
        default: undefined;
    };
    /** 头像的设置 */
    avatarProps: {
        type: PropType<AvatarPropsType>;
        default: undefined;
    };
    /**
     * @name Layout的操作功能列表，不同的 layout 会放到不同的位置
     */
    actionsRender: {
        type: PropType<ActionsRender>;
        default: undefined;
    };
    /**
     * @name 侧边菜单 title 和 logo 下面区域的渲染，一般会增加个搜索框
     *
     * @example  增加一个搜索框 menuExtraRender={()=>(<Search placeholder="请输入" />)}
     * @example  根据收起展开配置不同的 dom： menuExtraRender={()=>collapsed? null : <Search placeholder="请输入" />}
     */
    menuExtraRender: {
        type: PropType<MenuExtraRender>;
        default: undefined;
    };
    /**
     * @name 菜单顶部logo 和 title 区域的点击事件
     *
     * @example 点击跳转到首页 onMenuHeaderClick={()=>{ router.push('/') }}
     */
    onMenuHeaderClick: {
        type: PropType<(e: Events["onClick"]) => void>;
        default: undefined;
    };
    /**
     * @name 侧边菜单的logo的样式，可以调整下大小
     *
     * @example 设置logo的大小为 42px logoStyle={{width: '42px', height: '42px'}}
     */
    logoStyle: {
        type: PropType<CSSProperties>;
        default: undefined;
    };
    headerRender: {
        type: PropType<HeaderRender>;
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
        type: PropType<(openKeys?: WithFalse<import('ant-design-vue/es/_util/type').Key[]>) => void>;
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
        type: PropType<WithFalse<import('ant-design-vue/es/_util/type').Key[]>>;
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
    items: PropType<ItemType[]>;
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
        type: PropType<MenuTheme>;
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
export declare const privateSiderMenuProps: () => {
    matchMenuKeys: PropType<string[]>;
    originCollapsed: {
        type: PropType<boolean>;
        default: undefined;
    };
    menuRenderType: PropType<"header" | "sider">;
    stylish: PropType<GenerateStyle<SiderMenuToken>>;
};
export type SiderMenuProps = Partial<ExtractPropTypes<ReturnType<typeof siderMenuProps>>>;
export type PrivateSiderMenuProps = Partial<ExtractPropTypes<ReturnType<typeof privateSiderMenuProps>>>;
export type HeaderRenderKey = 'menuHeaderRender' | 'headerTitleRender';
/**
 * 渲染 title 和 logo
 *
 * @param props
 * @param renderKey
 * @returns
 */
export declare const renderLogoAndTitle: (props: SiderMenuProps, renderKey?: HeaderRenderKey) => VueNode;
/**
 *  默认渲染菜单折叠切换按钮
 * @param collapsed
 * @param tabIndex
 * @returns
 */
declare const SiderMenu: import('vue').DefineComponent<ExtractPropTypes<{
    matchMenuKeys: PropType<string[]>;
    originCollapsed: {
        type: PropType<boolean>;
        default: undefined;
    };
    menuRenderType: PropType<"header" | "sider">;
    stylish: PropType<GenerateStyle<SiderMenuToken>>;
    prefixCls: PropType<string>;
    collapsedWidth: PropType<number>;
    /** 品牌logo的标识 */
    logo: {
        type: PropType<VueNode>;
        default: undefined;
    };
    /** 相关品牌的列表 */
    appList: PropType<AppListProps>;
    /** 相关品牌的列表自定义渲染 */
    appListRender: PropType<AppListRender>;
    /** 相关品牌的列表项 点击事件，当事件存在时，appList 内配置的 url 不在自动跳转 */
    itemClick: PropType<(item: AppItemProps, popoverRef: Ref<HTMLSpanElement | null>) => void>;
    /**
     * @name 侧边菜单底部的一些快捷链接
     *
     * @example links={[<a href="ant.design"> 访问官网 </a>,<a href="help.ant.design"> 帮助 </a>]}
     */
    links: {
        type: PropType<WithFalse<{
            icon?: VNode;
            title?: string;
            label?: VNode;
        }[] | VueNode[]>>;
        default: undefined;
    };
    /** 菜单的宽度 */
    siderWidth: PropType<number>;
    /**
     * @name  菜单 logo 和 title 区域的渲染
     *
     * @example 不要logo : menuHeaderRender={(logo,title)=> title}
     * @example 不要title : menuHeaderRender={(logo,title)=> logo}
     * @example 展开的时候显示title,收起显示 logo： menuHeaderRender={(logo,title,props)=> props.collapsed ? logo : title}
     * @example 不要这个区域了 : menuHeaderRender={false}
     */
    menuHeaderRender: {
        type: PropType<MenuHeaderRender>;
        default: undefined;
    };
    /**
     * @name  侧边菜单，菜单区域的处理,可以单独处理菜单的dom
     *
     * @example 增加菜单区域的背景颜色 menuContentRender={(props,defaultDom)=><div style={{backgroundColor:"red"}}>{defaultDom}</div>}
     * @example 某些情况下不显示菜单 menuContentRender={(props)=> return <div>不显示菜单</div>}
     */
    menuContentRender: {
        type: PropType<MenuContentRender>;
        default: undefined;
    };
    /**
     * @name 侧边菜单底部的配置，可以增加一些底部操作
     *
     * @example 底部增加超链接 menuFooterRender={()=><a href="https://pro.ant.design">pro.ant.design</a>}
     * @example 根据收起展开配置不同的 dom  menuFooterRender={()=>collapsed? null :<a href="https://pro.ant.design">pro.ant.design</a>}
     */
    menuFooterRender: {
        type: PropType<MenuFooterRender>;
        default: undefined;
    };
    /**
     * @name 自定义展开收起按钮的渲染
     *
     * @example 使用文字渲染 collapsedButtonRender={(collapsed)=>collapsed?"展开":"收起"})}
     * @example 使用icon渲染 collapsedButtonRender={(collapsed)=>collapsed?<MenuUnfoldOutlined />:<MenuFoldOutlined />}
     * @example 不渲染按钮 collapsedButtonRender={false}
     */
    collapsedButtonRender: {
        type: PropType<CollapsedButtonRender>;
        default: undefined;
    };
    siderProps: PropType<SiderProps>;
    /**
     * @name 菜单是否收起的断点，设置成false 可以禁用
     *
     * @example 禁用断点  breakpoint={false}
     * @example 最小的屏幕再收起 breakpoint={"xs"}
     */
    breakpoint: {
        type: PropType<WithFalse<Breakpoint>>;
        default: string;
    };
    hide: {
        type: PropType<boolean>;
        default: undefined;
    };
    /** 头像的设置 */
    avatarProps: {
        type: PropType<AvatarPropsType>;
        default: undefined;
    };
    /**
     * @name Layout的操作功能列表，不同的 layout 会放到不同的位置
     */
    actionsRender: {
        type: PropType<ActionsRender>;
        default: undefined;
    };
    /**
     * @name 侧边菜单 title 和 logo 下面区域的渲染，一般会增加个搜索框
     *
     * @example  增加一个搜索框 menuExtraRender={()=>(<Search placeholder="请输入" />)}
     * @example  根据收起展开配置不同的 dom： menuExtraRender={()=>collapsed? null : <Search placeholder="请输入" />}
     */
    menuExtraRender: {
        type: PropType<MenuExtraRender>;
        default: undefined;
    };
    /**
     * @name 菜单顶部logo 和 title 区域的点击事件
     *
     * @example 点击跳转到首页 onMenuHeaderClick={()=>{ router.push('/') }}
     */
    onMenuHeaderClick: {
        type: PropType<(e: Events["onClick"]) => void>;
        default: undefined;
    };
    /**
     * @name 侧边菜单的logo的样式，可以调整下大小
     *
     * @example 设置logo的大小为 42px logoStyle={{width: '42px', height: '42px'}}
     */
    logoStyle: {
        type: PropType<CSSProperties>;
        default: undefined;
    };
    headerRender: {
        type: PropType<HeaderRender>;
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
        type: PropType<(openKeys?: WithFalse<import('ant-design-vue/es/_util/type').Key[]>) => void>;
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
        type: PropType<WithFalse<import('ant-design-vue/es/_util/type').Key[]>>;
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
    items: PropType<ItemType[]>;
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
        type: PropType<MenuTheme>;
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
}>, () => VueNode, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<ExtractPropTypes<{
    matchMenuKeys: PropType<string[]>;
    originCollapsed: {
        type: PropType<boolean>;
        default: undefined;
    };
    menuRenderType: PropType<"header" | "sider">;
    stylish: PropType<GenerateStyle<SiderMenuToken>>;
    prefixCls: PropType<string>;
    collapsedWidth: PropType<number>;
    /** 品牌logo的标识 */
    logo: {
        type: PropType<VueNode>;
        default: undefined;
    };
    /** 相关品牌的列表 */
    appList: PropType<AppListProps>;
    /** 相关品牌的列表自定义渲染 */
    appListRender: PropType<AppListRender>;
    /** 相关品牌的列表项 点击事件，当事件存在时，appList 内配置的 url 不在自动跳转 */
    itemClick: PropType<(item: AppItemProps, popoverRef: Ref<HTMLSpanElement | null>) => void>;
    /**
     * @name 侧边菜单底部的一些快捷链接
     *
     * @example links={[<a href="ant.design"> 访问官网 </a>,<a href="help.ant.design"> 帮助 </a>]}
     */
    links: {
        type: PropType<WithFalse<{
            icon?: VNode;
            title?: string;
            label?: VNode;
        }[] | VueNode[]>>;
        default: undefined;
    };
    /** 菜单的宽度 */
    siderWidth: PropType<number>;
    /**
     * @name  菜单 logo 和 title 区域的渲染
     *
     * @example 不要logo : menuHeaderRender={(logo,title)=> title}
     * @example 不要title : menuHeaderRender={(logo,title)=> logo}
     * @example 展开的时候显示title,收起显示 logo： menuHeaderRender={(logo,title,props)=> props.collapsed ? logo : title}
     * @example 不要这个区域了 : menuHeaderRender={false}
     */
    menuHeaderRender: {
        type: PropType<MenuHeaderRender>;
        default: undefined;
    };
    /**
     * @name  侧边菜单，菜单区域的处理,可以单独处理菜单的dom
     *
     * @example 增加菜单区域的背景颜色 menuContentRender={(props,defaultDom)=><div style={{backgroundColor:"red"}}>{defaultDom}</div>}
     * @example 某些情况下不显示菜单 menuContentRender={(props)=> return <div>不显示菜单</div>}
     */
    menuContentRender: {
        type: PropType<MenuContentRender>;
        default: undefined;
    };
    /**
     * @name 侧边菜单底部的配置，可以增加一些底部操作
     *
     * @example 底部增加超链接 menuFooterRender={()=><a href="https://pro.ant.design">pro.ant.design</a>}
     * @example 根据收起展开配置不同的 dom  menuFooterRender={()=>collapsed? null :<a href="https://pro.ant.design">pro.ant.design</a>}
     */
    menuFooterRender: {
        type: PropType<MenuFooterRender>;
        default: undefined;
    };
    /**
     * @name 自定义展开收起按钮的渲染
     *
     * @example 使用文字渲染 collapsedButtonRender={(collapsed)=>collapsed?"展开":"收起"})}
     * @example 使用icon渲染 collapsedButtonRender={(collapsed)=>collapsed?<MenuUnfoldOutlined />:<MenuFoldOutlined />}
     * @example 不渲染按钮 collapsedButtonRender={false}
     */
    collapsedButtonRender: {
        type: PropType<CollapsedButtonRender>;
        default: undefined;
    };
    siderProps: PropType<SiderProps>;
    /**
     * @name 菜单是否收起的断点，设置成false 可以禁用
     *
     * @example 禁用断点  breakpoint={false}
     * @example 最小的屏幕再收起 breakpoint={"xs"}
     */
    breakpoint: {
        type: PropType<WithFalse<Breakpoint>>;
        default: string;
    };
    hide: {
        type: PropType<boolean>;
        default: undefined;
    };
    /** 头像的设置 */
    avatarProps: {
        type: PropType<AvatarPropsType>;
        default: undefined;
    };
    /**
     * @name Layout的操作功能列表，不同的 layout 会放到不同的位置
     */
    actionsRender: {
        type: PropType<ActionsRender>;
        default: undefined;
    };
    /**
     * @name 侧边菜单 title 和 logo 下面区域的渲染，一般会增加个搜索框
     *
     * @example  增加一个搜索框 menuExtraRender={()=>(<Search placeholder="请输入" />)}
     * @example  根据收起展开配置不同的 dom： menuExtraRender={()=>collapsed? null : <Search placeholder="请输入" />}
     */
    menuExtraRender: {
        type: PropType<MenuExtraRender>;
        default: undefined;
    };
    /**
     * @name 菜单顶部logo 和 title 区域的点击事件
     *
     * @example 点击跳转到首页 onMenuHeaderClick={()=>{ router.push('/') }}
     */
    onMenuHeaderClick: {
        type: PropType<(e: Events["onClick"]) => void>;
        default: undefined;
    };
    /**
     * @name 侧边菜单的logo的样式，可以调整下大小
     *
     * @example 设置logo的大小为 42px logoStyle={{width: '42px', height: '42px'}}
     */
    logoStyle: {
        type: PropType<CSSProperties>;
        default: undefined;
    };
    headerRender: {
        type: PropType<HeaderRender>;
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
        type: PropType<(openKeys?: WithFalse<import('ant-design-vue/es/_util/type').Key[]>) => void>;
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
        type: PropType<WithFalse<import('ant-design-vue/es/_util/type').Key[]>>;
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
    items: PropType<ItemType[]>;
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
        type: PropType<MenuTheme>;
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
    theme: MenuTheme;
    colorPrimary: string | undefined;
    contentWidth: import('../../defaultSettings').ContentWidth | undefined;
    onOpenChange: (openKeys?: WithFalse<import('ant-design-vue/es/_util/type').Key[]>) => void;
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
    links: WithFalse<VueNode[] | {
        icon?: VNode;
        title?: string;
        label?: VNode;
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
    openKeys: WithFalse<import('ant-design-vue/es/_util/type').Key[]>;
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
            type: PropType<MenuTheme>;
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
    logo: VueNode;
    breakpoint: WithFalse<Breakpoint>;
    menuHeaderRender: MenuHeaderRender;
    menuContentRender: MenuContentRender;
    menuFooterRender: MenuFooterRender;
    collapsedButtonRender: CollapsedButtonRender;
    hide: boolean;
    avatarProps: AvatarPropsType;
    actionsRender: ActionsRender;
    menuExtraRender: MenuExtraRender;
    onMenuHeaderClick: (e: Events["onClick"]) => void;
    logoStyle: CSSProperties;
    headerRender: HeaderRender;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default SiderMenu;

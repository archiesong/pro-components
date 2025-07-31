import { CSSProperties, ExtractPropTypes, PropType } from 'vue';
import { AnyObject, VueNode } from 'ant-design-vue/lib/_util/type';
import { Route } from 'ant-design-vue/lib/breadcrumb/Breadcrumb';
import { BreadcrumbProps as AntdBreadcrumbProps, WatermarkProps } from 'ant-design-vue';
import { PureSettings } from './defaultSettings';
import { MenuDataItem, MessageDescriptor } from './typing';
import { GenerateStyle, ProTokenType } from '@ant-design-vue/pro-provider';
import { SiderMenuToken } from './components/SiderMenu/style';
import { BreadcrumbRender, ErrorBoundaryRender, FooterRender, MenuDataRender, PageTitleRender, TagsViewRender } from './RenderTypings';
export type LayoutBreadcrumbProps<T extends AnyObject = AnyObject> = {
    minLength?: number;
    itemRender?: (opt: {
        route: Route;
        params: T;
        routes: Route[];
        paths: Route[];
    }) => VueNode;
};
export declare const proLayoutProps: () => {
    compact: {
        type: PropType<PureSettings["compact"]>;
        default: undefined;
    };
    routes: {
        type: PropType<MenuDataItem[]>;
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
    stylish: PropType<{
        header?: GenerateStyle<SiderMenuToken>;
        sider?: GenerateStyle<SiderMenuToken>;
    }>;
    /**
     * @name Layout 的品牌配置，表现为一张背景图片
     */
    bgLayoutImgList: {
        type: PropType<{
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
    token: PropType<ProTokenType["layout"]>;
    /**
     * @name 简约模式，设置了之后不渲染的任何 layout 的东西，但是会有 context，可以获取到当前菜单。
     *
     * @example pure={true}
     */
    pure: {
        type: PropType<boolean>;
        default: undefined;
    };
    disableMobile: {
        type: PropType<boolean>;
        default: undefined;
    };
    /**
     * content 的样式
     *
     * @example 背景颜色为红色 contentStyle={{ backgroundColor: 'red '}}
     */
    contentStyle: {
        type: PropType<CSSProperties>;
        default: undefined;
    };
    /**
     * @name 多标签配置
     */
    tagsViewRender: {
        type: PropType<TagsViewRender>;
        default: undefined;
    };
    /**
     * @name 页脚的配置
     *
     * @example 不展示dom footerRender={false}
     * @example 使用 layout 的  DefaultFooter   footerRender={() => (<DefaultFooter copyright="这是一条测试文案"/>}
     */
    footerRender: {
        type: PropType<FooterRender>;
        default: undefined;
    };
    /**
     * @name 设置 PageHeader 的面包屑，只能处理数据
     *
     * @example 手动设置 breadcrumbRender={(routers = []) => [ { path: '/', breadcrumbName: '主页'} ]
     * @example 增加一项 breadcrumbRender={(routers = []) => { return [{ path: '/', breadcrumbName: '主页'} ,...routers ]}
     * @example 删除首页 breadcrumbRender={(routers = []) => { return routers.filter(item => item.path !== '/')}
     * @example 不显示面包屑 breadcrumbRender={false}
     */
    breadcrumbRender: {
        type: PropType<BreadcrumbRender>;
        default: undefined;
    };
    /**
     * @name 设置页面的标题
     *
     * @example 根据页面的路由设置标题 pageTitleRender={(props) => { return props.location.pathname }}
     * @example 不显示标题 pageTitleRender={false}
     * @example 根据默认的标题设置 pageTitleRender={(props,defaultPageTitle) => { return defaultPageTitle + '这是一个测试标题' }}
     * @example 根据 info 来自己组合标题 pageTitleRender={(props,defaultPageTitle,info) => { return info.title + "-" + info.pageName }
     */
    pageTitleRender: {
        type: PropType<PageTitleRender>;
        default: undefined;
    };
    /**
     * @name PageHeader 的 BreadcrumbProps 配置，会透传下去
     * */
    breadcrumbProps: {
        type: PropType<Omit<AntdBreadcrumbProps, "itemRender"> & LayoutBreadcrumbProps>;
        default: undefined;
    };
    /**
     * @name layout 的 loading 效果，设置完成之后只展示一个 loading
     *
     * @example loading={true}
     */
    loading: {
        type: BooleanConstructor;
        default: undefined;
    };
    itemRender: PropType<AntdBreadcrumbProps["itemRender"]>;
    formatMessage: PropType<(message: MessageDescriptor) => string>;
    /**
     * @name menuData 的自定义render方法
     */
    menuDataRender: PropType<MenuDataRender>;
    /**
     * @name 错误处理组件
     *
     * @example errorBoundaryRender={MyErrorBoundary}
     */
    errorBoundaryRender: {
        type: PropType<ErrorBoundaryRender>;
        default: undefined;
    };
    /** @name 水印的相关配置 */
    waterMarkProps: {
        type: PropType<WatermarkProps>;
        default: undefined;
    };
    prefixCls: PropType<string>;
    collapsedWidth: PropType<number>;
    logo: {
        type: PropType<VueNode>;
        default: undefined;
    };
    appList: PropType<import('./components/AppsLogoComponents/typing').AppListProps>;
    appListRender: PropType<import('./RenderTypings').AppListRender>;
    itemClick: PropType<(item: import('./components/AppsLogoComponents/typing').AppItemProps, popoverRef: import('vue').Ref<HTMLSpanElement | null>) => void>;
    links: {
        type: PropType<import('./typing').WithFalse<{
            icon?: import('vue').VNode;
            title?: string;
            label?: import('vue').VNode;
        }[] | VueNode[]>>;
        default: undefined;
    };
    siderWidth: PropType<number>;
    menuHeaderRender: {
        type: PropType<import('./RenderTypings').MenuHeaderRender>;
        default: undefined;
    };
    menuContentRender: {
        type: PropType<import('./RenderTypings').MenuContentRender>;
        default: undefined;
    };
    menuFooterRender: {
        type: PropType<import('./RenderTypings').MenuFooterRender>;
        default: undefined;
    };
    collapsedButtonRender: {
        type: PropType<import('./RenderTypings').CollapsedButtonRender>;
        default: undefined;
    };
    siderProps: PropType<import('ant-design-vue').SiderProps>;
    breakpoint: {
        type: PropType<import('./typing').WithFalse<import('ant-design-vue/lib/_util/responsiveObserve').Breakpoint>>;
        default: string;
    };
    hide: {
        type: PropType<boolean>;
        default: undefined;
    };
    avatarProps: {
        type: PropType<false | (Partial<ExtractPropTypes<{
            prefixCls: StringConstructor;
            shape: {
                type: PropType<"circle" | "square">;
                default: string;
            };
            size: {
                type: PropType<import('ant-design-vue/lib/avatar').AvatarSize>;
                default: () => import('ant-design-vue/lib/avatar').AvatarSize;
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
            title?: VueNode;
            render?: (avatarProps: import('ant-design-vue').AvatarProps, defaultDom: VueNode, props: import('./components/SiderMenu/SiderMenu').SiderMenuProps) => VueNode;
        })>;
        default: undefined;
    };
    actionsRender: {
        type: PropType<import('./RenderTypings').ActionsRender>;
        default: undefined;
    };
    menuExtraRender: {
        type: PropType<import('./RenderTypings').MenuExtraRender>;
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
        type: PropType<import('./RenderTypings').HeaderRender>;
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
        type: PropType<(openKeys?: import('./typing').WithFalse<import('ant-design-vue/lib/_util/type').Key[]>) => void>;
        default: undefined;
    };
    menuData: PropType<MenuDataItem[]>;
    onCollapse: PropType<(collapsed: boolean) => void>;
    openKeys: {
        type: PropType<import('./typing').WithFalse<import('ant-design-vue/lib/_util/type').Key[]>>;
        default: undefined;
    };
    mode: {
        type: PropType<import('ant-design-vue').MenuMode>;
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
        default: import('./defaultSettings').ContentWidth | undefined;
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
    menuProps: {
        type: PropType<import('ant-design-vue').MenuProps>;
        default: undefined;
    };
    menuItemRender: {
        type: PropType<import('./RenderTypings').MenuItemRender>;
        default: undefined;
    };
    subMenuItemRender: {
        type: PropType<import('./RenderTypings').SubMenuItemRender>;
        default: undefined;
    };
    iconPrefixes: PropType<string>;
    postMenuData: {
        type: PropType<(menusData?: MenuDataItem[]) => MenuDataItem[]>;
        default: undefined;
    };
    onSelect: PropType<(selectedKeys: import('ant-design-vue/lib/_util/type').Key[]) => void>;
    id: StringConstructor;
    items: PropType<import('ant-design-vue').ItemType[]>;
    disabled: BooleanConstructor;
    inlineCollapsed: BooleanConstructor;
    disabledOverflow: BooleanConstructor;
    forceSubMenuRender: BooleanConstructor;
    selectedKeys: PropType<import('ant-design-vue/lib/_util/type').Key[]>;
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
    motion: PropType<import('ant-design-vue/lib/_util/transition').CSSMotionProps>;
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
        type: PropType<import('ant-design-vue/lib/menu/src/interface').BuiltinPlacements>;
    };
    triggerSubMenuAction: {
        type: PropType<import('ant-design-vue/lib/menu/src/interface').TriggerSubMenuAction>;
        default: string;
    };
    getPopupContainer: PropType<(node: HTMLElement) => HTMLElement>;
    expandIcon: PropType<(p?: {
        [key: string]: any;
        isOpen: boolean;
    }) => any>;
    onDeselect: PropType<import('ant-design-vue/lib/menu/src/interface').SelectEventHandler>;
    onClick: PropType<import('ant-design-vue/lib/menu/src/interface').MenuClickEventHandler>;
    onFocus: PropType<import('ant-design-vue/lib/_util/EventInterface').FocusEventHandler>;
    onBlur: PropType<import('ant-design-vue/lib/_util/EventInterface').FocusEventHandler>;
    onMousedown: PropType<import('ant-design-vue/lib/_util/EventInterface').MouseEventHandler>;
    'onUpdate:openKeys': PropType<(keys: import('ant-design-vue/lib/_util/type').Key[]) => void>;
    'onUpdate:selectedKeys': PropType<(keys: import('ant-design-vue/lib/_util/type').Key[]) => void>;
    'onUpdate:activeKey': PropType<(key: import('ant-design-vue/lib/_util/type').Key) => void>;
    hasSiderMenu: {
        type: PropType<boolean>;
        default: undefined;
    };
    headerTitleRender: {
        type: PropType<import('./RenderTypings').HeaderTitleRender>;
        default: undefined;
    };
    menuRender: {
        type: PropType<import('./RenderTypings').MenuRender>;
        default: undefined;
    };
    headerContentRender: {
        type: PropType<import('./RenderTypings').HeaderContentRender>;
        default: undefined;
    };
};
export type ProLayoutProps = Partial<ExtractPropTypes<ReturnType<typeof proLayoutProps>>>;

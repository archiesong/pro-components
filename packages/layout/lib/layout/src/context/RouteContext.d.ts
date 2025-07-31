import { Ref, InjectionKey } from 'vue';
import { BreadcrumbProps, WatermarkProps } from 'ant-design-vue';
import { PureSettings } from '../defaultSettings';
import { MenuDataItem } from '../typing';
import { BreadcrumbListReturn } from '../utils/getBreadcrumbProps';
import { LayoutBreadcrumbProps } from '../proLayoutProps';
export type RouteContextType = {
    breadcrumb?: BreadcrumbListReturn;
    menuData?: MenuDataItem[];
    isMobile?: boolean;
    prefixCls?: string;
    collapsed?: boolean;
    hasSiderMenu?: boolean;
    hasHeader?: boolean;
    siderWidth?: number;
    isChildrenLayout?: boolean;
    hasFooterToolbar?: boolean;
    hasFooter?: boolean;
    hasPageContainer?: number;
    setHasFooterToolbar?: (val: boolean) => void;
    setHasPageContainer?: (val: number) => void;
    pageTitleInfo?: {
        title: string;
        id: string;
        pageName: string;
    };
    matchMenus?: MenuDataItem[];
    matchMenuKeys?: string[];
    currentMenu?: PureSettings & MenuDataItem;
    /** PageHeader 的 BreadcrumbProps 配置，会透传下去 */
    breadcrumbProps?: Omit<BreadcrumbProps, 'itemRender'> & LayoutBreadcrumbProps;
    waterMarkProps?: WatermarkProps;
} & PureSettings;
export declare const routeContextKey: InjectionKey<Ref<RouteContextType>>;
export declare const useRouteContextProvider: (props: Ref<RouteContextType>) => void;
export declare const useRouteContextInject: () => Ref<{
    breadcrumb?: {
        routes?: {
            path: string;
            breadcrumbName: string;
            children?: {
                path: string;
                breadcrumbName: string;
            }[] | undefined;
        }[] | undefined;
        itemRender?: ((opt: {
            route: import('ant-design-vue/lib/breadcrumb/Breadcrumb').Route;
            params: unknown;
            routes: import('ant-design-vue/lib/breadcrumb/Breadcrumb').Route[];
            paths: string[];
        }) => import('ant-design-vue/lib/_util/type').VueNode) | undefined;
    } | undefined;
    menuData?: {
        [x: string]: any;
        children?: any[] | undefined;
        name?: (string | symbol) | undefined;
        meta?: {
            [x: string]: any;
            hideChildrenInMenu?: boolean | undefined;
            hideInMenu?: boolean | undefined;
            icon?: (string | number | boolean | void | import('vue').VNode<import('vue').RendererNode, import('vue').RendererElement, {
                [key: string]: any;
            }> | null | undefined) | import('vue').VNode<import('vue').RendererNode, import('vue').RendererElement, {
                [key: string]: any;
            }> | (string | number | boolean | void | import('vue').VNode<import('vue').RendererNode, import('vue').RendererElement, {
                [key: string]: any;
            }> | null | undefined)[];
            title?: string | undefined;
            locale?: (string | false) | undefined;
            flatMenu?: boolean | undefined;
            target?: import('../typing').TargetType;
            tooltip?: string | undefined;
            disabled?: boolean | undefined;
            disabledTooltip?: boolean | undefined;
        } | undefined;
        key?: string | undefined;
        path: string;
    }[] | undefined;
    isMobile?: boolean | undefined;
    prefixCls?: string | undefined;
    collapsed?: boolean | undefined;
    hasSiderMenu?: boolean | undefined;
    hasHeader?: boolean | undefined;
    siderWidth?: number | undefined;
    isChildrenLayout?: boolean | undefined;
    hasFooterToolbar?: boolean | undefined;
    hasFooter?: boolean | undefined;
    hasPageContainer?: number | undefined;
    setHasFooterToolbar?: ((val: boolean) => void) | undefined;
    setHasPageContainer?: ((val: number) => void) | undefined;
    pageTitleInfo?: {
        title: string;
        id: string;
        pageName: string;
    } | undefined;
    matchMenus?: {
        [x: string]: any;
        children?: any[] | undefined;
        name?: (string | symbol) | undefined;
        meta?: {
            [x: string]: any;
            hideChildrenInMenu?: boolean | undefined;
            hideInMenu?: boolean | undefined;
            icon?: (string | number | boolean | void | import('vue').VNode<import('vue').RendererNode, import('vue').RendererElement, {
                [key: string]: any;
            }> | null | undefined) | import('vue').VNode<import('vue').RendererNode, import('vue').RendererElement, {
                [key: string]: any;
            }> | (string | number | boolean | void | import('vue').VNode<import('vue').RendererNode, import('vue').RendererElement, {
                [key: string]: any;
            }> | null | undefined)[];
            title?: string | undefined;
            locale?: (string | false) | undefined;
            flatMenu?: boolean | undefined;
            target?: import('../typing').TargetType;
            tooltip?: string | undefined;
            disabled?: boolean | undefined;
            disabledTooltip?: boolean | undefined;
        } | undefined;
        key?: string | undefined;
        path: string;
    }[] | undefined;
    matchMenuKeys?: string[] | undefined;
    currentMenu?: {
        [x: string]: any;
        navTheme?: ("realDark" | "light" | "dark") | undefined;
        layout?: ("side" | "top" | "mix" | "left") | undefined;
        contentWidth?: import('../defaultSettings').ContentWidth | undefined;
        compact?: boolean | undefined;
        fixedHeader?: boolean | undefined;
        fixedSiderbar?: boolean | undefined;
        menu?: {
            locale?: boolean | undefined;
            hideMenuWhenCollapsed?: boolean | undefined;
            collapsedShowTitle?: boolean | undefined;
            collapsedShowGroupTitle?: boolean | undefined;
            defaultOpenAll?: boolean | undefined;
            ignoreFlatMenu?: boolean | undefined;
            type?: ("sub" | "group") | undefined;
            autoClose?: false | undefined;
        } | undefined;
        title?: (string | false) | undefined;
        iconfontUrl?: string | undefined;
        colorPrimary?: string | undefined;
        colorWeak?: boolean | undefined;
        splitMenus?: boolean | undefined;
        suppressSiderWhenMenuEmpty?: boolean | undefined;
        siderMenuType?: ("sub" | "group") | undefined;
        children?: {
            [x: string]: any;
            children?: any[] | undefined;
            name?: (string | symbol) | undefined;
            meta?: {
                [x: string]: any;
                hideChildrenInMenu?: boolean | undefined;
                hideInMenu?: boolean | undefined;
                icon?: (string | number | boolean | void | import('vue').VNode<import('vue').RendererNode, import('vue').RendererElement, {
                    [key: string]: any;
                }> | null | undefined) | import('vue').VNode<import('vue').RendererNode, import('vue').RendererElement, {
                    [key: string]: any;
                }> | (string | number | boolean | void | import('vue').VNode<import('vue').RendererNode, import('vue').RendererElement, {
                    [key: string]: any;
                }> | null | undefined)[];
                title?: string | undefined;
                locale?: (string | false) | undefined;
                flatMenu?: boolean | undefined;
                target?: import('../typing').TargetType;
                tooltip?: string | undefined;
                disabled?: boolean | undefined;
                disabledTooltip?: boolean | undefined;
            } | undefined;
            key?: string | undefined;
            path: string;
        }[] | undefined;
        name?: (string | symbol) | undefined;
        meta?: {
            [x: string]: any;
            hideChildrenInMenu?: boolean | undefined;
            hideInMenu?: boolean | undefined;
            icon?: (string | number | boolean | void | import('vue').VNode<import('vue').RendererNode, import('vue').RendererElement, {
                [key: string]: any;
            }> | null | undefined) | import('vue').VNode<import('vue').RendererNode, import('vue').RendererElement, {
                [key: string]: any;
            }> | (string | number | boolean | void | import('vue').VNode<import('vue').RendererNode, import('vue').RendererElement, {
                [key: string]: any;
            }> | null | undefined)[];
            title?: string | undefined;
            locale?: (string | false) | undefined;
            flatMenu?: boolean | undefined;
            target?: import('../typing').TargetType;
            tooltip?: string | undefined;
            disabled?: boolean | undefined;
            disabledTooltip?: boolean | undefined;
        } | undefined;
        key?: string | undefined;
        path: string;
    } | undefined;
    breadcrumbProps?: {
        prefixCls?: string | undefined;
        separator?: any;
        routes?: {
            path: string;
            breadcrumbName: string;
            children?: {
                path: string;
                breadcrumbName: string;
            }[] | undefined;
        }[] | undefined;
        params?: any;
        minLength?: number | undefined;
        itemRender?: ((opt: {
            route: import('ant-design-vue/lib/breadcrumb/Breadcrumb').Route;
            params: import('ant-design-vue/lib/_util/type').AnyObject;
            routes: import('ant-design-vue/lib/breadcrumb/Breadcrumb').Route[];
            paths: import('ant-design-vue/lib/breadcrumb/Breadcrumb').Route[];
        }) => import('ant-design-vue/lib/_util/type').VueNode) | undefined;
    } | undefined;
    waterMarkProps?: {
        offset?: [number, number] | undefined;
        content?: string | string[] | undefined;
        font?: {
            color?: string | undefined;
            fontSize?: (number | string) | undefined;
            fontWeight?: ("normal" | "light" | "weight" | number) | undefined;
            fontStyle?: ("none" | "normal" | "italic" | "oblique") | undefined;
            fontFamily?: string | undefined;
        } | undefined;
        gap?: [number, number] | undefined;
        width?: number | undefined;
        height?: number | undefined;
        rotate?: number | undefined;
        zIndex?: number | undefined;
        image?: string | undefined;
        rootClassName?: string | undefined;
    } | undefined;
    navTheme?: ("realDark" | "light" | "dark") | undefined;
    layout?: ("side" | "top" | "mix" | "left") | undefined;
    contentWidth?: import('../defaultSettings').ContentWidth | undefined;
    compact?: boolean | undefined;
    fixedHeader?: boolean | undefined;
    fixedSiderbar?: boolean | undefined;
    menu?: {
        locale?: boolean | undefined;
        hideMenuWhenCollapsed?: boolean | undefined;
        collapsedShowTitle?: boolean | undefined;
        collapsedShowGroupTitle?: boolean | undefined;
        defaultOpenAll?: boolean | undefined;
        ignoreFlatMenu?: boolean | undefined;
        type?: ("sub" | "group") | undefined;
        autoClose?: false | undefined;
    } | undefined;
    title?: (string | false) | undefined;
    iconfontUrl?: string | undefined;
    colorPrimary?: string | undefined;
    colorWeak?: boolean | undefined;
    splitMenus?: boolean | undefined;
    suppressSiderWhenMenuEmpty?: boolean | undefined;
    siderMenuType?: ("sub" | "group") | undefined;
}, RouteContextType | {
    breadcrumb?: {
        routes?: {
            path: string;
            breadcrumbName: string;
            children?: {
                path: string;
                breadcrumbName: string;
            }[] | undefined;
        }[] | undefined;
        itemRender?: ((opt: {
            route: import('ant-design-vue/lib/breadcrumb/Breadcrumb').Route;
            params: unknown;
            routes: import('ant-design-vue/lib/breadcrumb/Breadcrumb').Route[];
            paths: string[];
        }) => import('ant-design-vue/lib/_util/type').VueNode) | undefined;
    } | undefined;
    menuData?: {
        [x: string]: any;
        children?: any[] | undefined;
        name?: (string | symbol) | undefined;
        meta?: {
            [x: string]: any;
            hideChildrenInMenu?: boolean | undefined;
            hideInMenu?: boolean | undefined;
            icon?: (string | number | boolean | void | import('vue').VNode<import('vue').RendererNode, import('vue').RendererElement, {
                [key: string]: any;
            }> | null | undefined) | import('vue').VNode<import('vue').RendererNode, import('vue').RendererElement, {
                [key: string]: any;
            }> | (string | number | boolean | void | import('vue').VNode<import('vue').RendererNode, import('vue').RendererElement, {
                [key: string]: any;
            }> | null | undefined)[];
            title?: string | undefined;
            locale?: (string | false) | undefined;
            flatMenu?: boolean | undefined;
            target?: import('../typing').TargetType;
            tooltip?: string | undefined;
            disabled?: boolean | undefined;
            disabledTooltip?: boolean | undefined;
        } | undefined;
        key?: string | undefined;
        path: string;
    }[] | undefined;
    isMobile?: boolean | undefined;
    prefixCls?: string | undefined;
    collapsed?: boolean | undefined;
    hasSiderMenu?: boolean | undefined;
    hasHeader?: boolean | undefined;
    siderWidth?: number | undefined;
    isChildrenLayout?: boolean | undefined;
    hasFooterToolbar?: boolean | undefined;
    hasFooter?: boolean | undefined;
    hasPageContainer?: number | undefined;
    setHasFooterToolbar?: ((val: boolean) => void) | undefined;
    setHasPageContainer?: ((val: number) => void) | undefined;
    pageTitleInfo?: {
        title: string;
        id: string;
        pageName: string;
    } | undefined;
    matchMenus?: {
        [x: string]: any;
        children?: any[] | undefined;
        name?: (string | symbol) | undefined;
        meta?: {
            [x: string]: any;
            hideChildrenInMenu?: boolean | undefined;
            hideInMenu?: boolean | undefined;
            icon?: (string | number | boolean | void | import('vue').VNode<import('vue').RendererNode, import('vue').RendererElement, {
                [key: string]: any;
            }> | null | undefined) | import('vue').VNode<import('vue').RendererNode, import('vue').RendererElement, {
                [key: string]: any;
            }> | (string | number | boolean | void | import('vue').VNode<import('vue').RendererNode, import('vue').RendererElement, {
                [key: string]: any;
            }> | null | undefined)[];
            title?: string | undefined;
            locale?: (string | false) | undefined;
            flatMenu?: boolean | undefined;
            target?: import('../typing').TargetType;
            tooltip?: string | undefined;
            disabled?: boolean | undefined;
            disabledTooltip?: boolean | undefined;
        } | undefined;
        key?: string | undefined;
        path: string;
    }[] | undefined;
    matchMenuKeys?: string[] | undefined;
    currentMenu?: {
        [x: string]: any;
        navTheme?: ("realDark" | "light" | "dark") | undefined;
        layout?: ("side" | "top" | "mix" | "left") | undefined;
        contentWidth?: import('../defaultSettings').ContentWidth | undefined;
        compact?: boolean | undefined;
        fixedHeader?: boolean | undefined;
        fixedSiderbar?: boolean | undefined;
        menu?: {
            locale?: boolean | undefined;
            hideMenuWhenCollapsed?: boolean | undefined;
            collapsedShowTitle?: boolean | undefined;
            collapsedShowGroupTitle?: boolean | undefined;
            defaultOpenAll?: boolean | undefined;
            ignoreFlatMenu?: boolean | undefined;
            type?: ("sub" | "group") | undefined;
            autoClose?: false | undefined;
        } | undefined;
        title?: (string | false) | undefined;
        iconfontUrl?: string | undefined;
        colorPrimary?: string | undefined;
        colorWeak?: boolean | undefined;
        splitMenus?: boolean | undefined;
        suppressSiderWhenMenuEmpty?: boolean | undefined;
        siderMenuType?: ("sub" | "group") | undefined;
        children?: {
            [x: string]: any;
            children?: any[] | undefined;
            name?: (string | symbol) | undefined;
            meta?: {
                [x: string]: any;
                hideChildrenInMenu?: boolean | undefined;
                hideInMenu?: boolean | undefined;
                icon?: (string | number | boolean | void | import('vue').VNode<import('vue').RendererNode, import('vue').RendererElement, {
                    [key: string]: any;
                }> | null | undefined) | import('vue').VNode<import('vue').RendererNode, import('vue').RendererElement, {
                    [key: string]: any;
                }> | (string | number | boolean | void | import('vue').VNode<import('vue').RendererNode, import('vue').RendererElement, {
                    [key: string]: any;
                }> | null | undefined)[];
                title?: string | undefined;
                locale?: (string | false) | undefined;
                flatMenu?: boolean | undefined;
                target?: import('../typing').TargetType;
                tooltip?: string | undefined;
                disabled?: boolean | undefined;
                disabledTooltip?: boolean | undefined;
            } | undefined;
            key?: string | undefined;
            path: string;
        }[] | undefined;
        name?: (string | symbol) | undefined;
        meta?: {
            [x: string]: any;
            hideChildrenInMenu?: boolean | undefined;
            hideInMenu?: boolean | undefined;
            icon?: (string | number | boolean | void | import('vue').VNode<import('vue').RendererNode, import('vue').RendererElement, {
                [key: string]: any;
            }> | null | undefined) | import('vue').VNode<import('vue').RendererNode, import('vue').RendererElement, {
                [key: string]: any;
            }> | (string | number | boolean | void | import('vue').VNode<import('vue').RendererNode, import('vue').RendererElement, {
                [key: string]: any;
            }> | null | undefined)[];
            title?: string | undefined;
            locale?: (string | false) | undefined;
            flatMenu?: boolean | undefined;
            target?: import('../typing').TargetType;
            tooltip?: string | undefined;
            disabled?: boolean | undefined;
            disabledTooltip?: boolean | undefined;
        } | undefined;
        key?: string | undefined;
        path: string;
    } | undefined;
    breadcrumbProps?: {
        prefixCls?: string | undefined;
        separator?: any;
        routes?: {
            path: string;
            breadcrumbName: string;
            children?: {
                path: string;
                breadcrumbName: string;
            }[] | undefined;
        }[] | undefined;
        params?: any;
        minLength?: number | undefined;
        itemRender?: ((opt: {
            route: import('ant-design-vue/lib/breadcrumb/Breadcrumb').Route;
            params: import('ant-design-vue/lib/_util/type').AnyObject;
            routes: import('ant-design-vue/lib/breadcrumb/Breadcrumb').Route[];
            paths: import('ant-design-vue/lib/breadcrumb/Breadcrumb').Route[];
        }) => import('ant-design-vue/lib/_util/type').VueNode) | undefined;
    } | undefined;
    waterMarkProps?: {
        offset?: [number, number] | undefined;
        content?: string | string[] | undefined;
        font?: {
            color?: string | undefined;
            fontSize?: (number | string) | undefined;
            fontWeight?: ("normal" | "light" | "weight" | number) | undefined;
            fontStyle?: ("none" | "normal" | "italic" | "oblique") | undefined;
            fontFamily?: string | undefined;
        } | undefined;
        gap?: [number, number] | undefined;
        width?: number | undefined;
        height?: number | undefined;
        rotate?: number | undefined;
        zIndex?: number | undefined;
        image?: string | undefined;
        rootClassName?: string | undefined;
    } | undefined;
    navTheme?: ("realDark" | "light" | "dark") | undefined;
    layout?: ("side" | "top" | "mix" | "left") | undefined;
    contentWidth?: import('../defaultSettings').ContentWidth | undefined;
    compact?: boolean | undefined;
    fixedHeader?: boolean | undefined;
    fixedSiderbar?: boolean | undefined;
    menu?: {
        locale?: boolean | undefined;
        hideMenuWhenCollapsed?: boolean | undefined;
        collapsedShowTitle?: boolean | undefined;
        collapsedShowGroupTitle?: boolean | undefined;
        defaultOpenAll?: boolean | undefined;
        ignoreFlatMenu?: boolean | undefined;
        type?: ("sub" | "group") | undefined;
        autoClose?: false | undefined;
    } | undefined;
    title?: (string | false) | undefined;
    iconfontUrl?: string | undefined;
    colorPrimary?: string | undefined;
    colorWeak?: boolean | undefined;
    splitMenus?: boolean | undefined;
    suppressSiderWhenMenuEmpty?: boolean | undefined;
    siderMenuType?: ("sub" | "group") | undefined;
}>;

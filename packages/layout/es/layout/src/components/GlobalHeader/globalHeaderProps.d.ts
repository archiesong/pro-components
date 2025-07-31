import { Events, ExtractPropTypes, PropType, Ref } from 'vue';
import { MenuDataItem, MessageDescriptor, VueNode } from '../../typing';
import { ActionsRender, AppListRender, HeaderContentRender, MenuHeaderRender, MenuRender } from '../../RenderTypings';
import { MenuProps } from 'ant-design-vue';
import { ProTokenType } from '@ant-design-vue/pro-provider';
import { AppItemProps, AppListProps } from '../AppsLogoComponents/typing';
import { AvatarPropsType } from './ActionsContent';
import { PureSettings } from '../../defaultSettings';
export declare const globalHeaderProps: () => {
    collapsed: PropType<boolean>;
    onCollapse: {
        type: PropType<(collapsed: boolean) => void>;
        default: undefined;
    };
    isMobile: {
        type: PropType<boolean>;
        default: undefined;
    };
    /** 品牌logo的标识 */
    logo: {
        type: PropType<VueNode>;
        default: undefined;
    };
    /**
     * @name 虽然叫menuRender，但是其实是整个 SiderMenu 面板的渲染函数
     *
     * @example 收起时完成不展示菜单 menuRender={(props,defaultDom)=> props.collapsed ? null : defaultDom}
     * @example 不展示菜单 menuRender={false}
     */
    menuRender: {
        type: PropType<MenuRender>;
        default: undefined;
    };
    /**
     * @name 要给菜单的props, 参考ant-menu的属性
     */
    menuProps: {
        type: PropType<MenuProps>;
        default: undefined;
    };
    prefixCls: PropType<string>;
    /** 相关品牌的列表 */
    appList: PropType<AppListProps>;
    /** 相关品牌的列表项 点击事件，当事件存在时，appList 内配置的 url 不在自动跳转 */
    itemClick: PropType<(item: AppItemProps, popoverRef: Ref<HTMLSpanElement | null>) => void>;
    menuData: PropType<MenuDataItem[]>;
    /**
     * @name 菜单顶部logo 和 title 区域的点击事件
     *
     * @example 点击跳转到首页 onMenuHeaderClick={()=>{ router.push('/') }}
     */
    onMenuHeaderClick: {
        type: PropType<(e: Events["onClick"]) => void>;
        default: undefined;
    };
    menuHeaderRender: {
        type: PropType<MenuHeaderRender>;
        default: undefined;
    };
    token: PropType<ProTokenType["layout"]>;
    /**
     * @name 顶部区域的渲染，包含内部的 menu
     *
     * @example headerContentRender={(props) => <div>管理控制台 </div>}
     */
    headerContentRender: {
        type: PropType<HeaderContentRender>;
        default: undefined;
    };
    /**
     * @name Layout的操作功能列表，不同的 layout 会放到不同的位置
     */
    actionsRender: {
        type: PropType<ActionsRender>;
        default: undefined;
    };
    /** 头像的设置 */
    avatarProps: {
        type: PropType<AvatarPropsType>;
        default: undefined;
    };
    formatMessage: PropType<(message: MessageDescriptor) => string>;
    /** 相关品牌的列表自定义渲染 */
    appListRender: PropType<AppListRender>;
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
    compact: {
        type: PropType<PureSettings["compact"]>;
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
};
export type GlobalHeaderProps = Partial<ExtractPropTypes<typeof globalHeaderProps>>;

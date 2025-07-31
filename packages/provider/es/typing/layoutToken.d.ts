import { GlobalToken } from 'ant-design-vue/es/theme';
export type BaseLayoutDesignToken = {
    hashId: string;
    colorPrimary: string;
    /**
     * 跨站点应用的图标hover颜色
     */
    colorBgAppListIconHover: string;
    /**
     * 跨站点应用的图标hover颜色
     */
    colorTextAppListIconHover: string;
    /**
     * 跨站点应用的图标hover颜色
     */
    colorTextAppListIcon: string;
    /**
     * layout 的背景颜色
     */
    bgLayout: string;
    /**
     * header 的 token 设置
     */
    header: {
        colorBgHeader: string;
        colorHeaderTitle: string;
        colorBgMenuItemHover: string;
        colorBgMenuItemSelected: string;
        colorBgMenuItemSelectedHorizontal: string;
        colorTextMenuSelected: string;
        colorTextMenuActive: string;
        colorTextMenu: string;
        colorTextMenuSecondary: string;
        colorBgRightActionsItemHover: string;
        colorTextRightActionsItem: string;
        heightLayoutHeader: number;
    };
    /**
     * 侧边side的 token 配置
     */
    sider: {
        colorMenuBackground: string;
        colorSubMenuBackground: string;
        menuHeight: number;
        colorBgMenuItemCollapsedElevated: string;
        colorMenuItemDivider: string;
        colorBgMenuItemHover: string;
        colorBgMenuItemActive: string;
        colorBgMenuItemSelectedHorizontal: string;
        colorBgMenuItemSelected: string;
        colorTextMenuActiveBarWidth: number;
        colorTextMenuActiveBarHeight: number;
        colorTextMenuActiveBarBorderSize: number;
        colorTextMenuSelected: string;
        colorTextMenuItemHover: string;
        colorTextMenuActive: string;
        colorTextMenu: string;
        colorTextMenuSecondary: string;
        /**
         * menu 顶部 title 的字体颜色
         */
        colorTextMenuTitle: string;
        colorTextSubMenuSelected: string;
    };
    /**
     * 页面容器 的 token 配置
     */
    pageContainer: {
        /**
         * pageContainer 的背景颜色
         */
        colorBgPageContainer: string;
        /**
         * pageContainer 自带的 padding inline
         */
        paddingInlinePageContainerContent: number;
        /**
         * pageContainer 自带的 padding block
         */
        paddingBlockPageContainerContent: number;
        /**
         * pageContainer 被固定时的背景颜色
         */
        colorBgPageContainerFixed: string;
    };
};
export type DeepPartial<T> = T extends object ? {
    [P in keyof T]?: DeepPartial<T[P]>;
} : T;
export type LayoutDesignToken = BaseLayoutDesignToken;
export declare const getLayoutDesignToken: (baseDesignTokens: DeepPartial<LayoutDesignToken>, antdToken: GlobalToken) => LayoutDesignToken;
export type ProTokenType = {
    layout?: DeepPartial<LayoutDesignToken>;
};

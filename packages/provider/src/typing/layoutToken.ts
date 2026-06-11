import type { GlobalToken } from 'antdv-next'
import { setAlpha } from '../useStyle'

export interface BaseLayoutDesignToken {
  hashId: string
  colorPrimary: string
  /**
   * @name colorBgAppListIconHover  跨站点应用的图标hover颜色
   */
  colorBgAppListIconHover: string
  /**
   * @name colorTextAppListIconHover  跨站点应用的图标hover颜色
   */
  colorTextAppListIconHover: string
  /**
   * @name colorTextAppListIcon 跨站点应用的图标hover颜色
   */
  colorTextAppListIcon: string
  /**
   * @name bgLayout  layout 的背景颜色
   */
  bgLayout: string
  /**
   * @name header 的 token 设置
   */
  header: {
    colorBgHeader: string
    colorHeaderTitle: string
    colorBgMenuItemHover: string
    colorBgMenuItemSelected: string
    colorBgMenuItemSelectedHorizontal: string
    colorTextMenuSelected: string
    colorTextMenuActive: string
    colorTextMenu: string
    colorTextMenuSecondary: string
    colorBgRightActionsItemHover: string
    colorTextRightActionsItem: string
    heightLayoutHeader: number
  }
  /**
   * @name sider 侧边side的 token 配置
   */
  sider: {
    /**
     * @name colorMenuBackground  menu 的背景颜色
     */
    colorMenuBackground: string
    /**
     * @name colorSubMenuBackground submenu 的背景颜色
     */
    colorSubMenuBackground: string
    /**
     * @name menuHeight menu 的高度
     */
    menuHeight?: number
    /**
     * @name colorBgMenuItemCollapsedElevated  收起 menuItem 的弹出菜单背景颜色
     */
    colorBgMenuItemCollapsedElevated: string
    colorMenuItemDivider: string
    colorBgMenuItemHover: string // 鼠标悬浮态
    colorBgMenuItemActive: string // 激活态
    colorBgMenuItemSelectedHorizontal: string
    colorBgMenuItemSelected: string
    colorTextMenuActiveBarWidth: number
    colorTextMenuActiveBarHeight: number
    colorTextMenuActiveBarBorderSize: number
    colorTextMenuSelected: string
    colorTextMenuItemHover: string
    colorTextMenuActive: string
    colorTextMenu: string
    colorTextMenuSecondary: string
    /**
     * menu 顶部 title 的字体颜色
     */
    colorTextMenuTitle: string
    colorTextSubMenuSelected: string
  }
  /**
   * @name pageContainer 页面容器 的 token 配置
   */
  pageContainer: {
    /**
     * pageContainer 的背景颜色
     */
    colorBgPageContainer: string
    /**
     * pageContainer 自带的 padding inline
     */
    paddingInlinePageContainerContent: number
    /**
     * pageContainer 自带的 padding block
     */
    paddingBlockPageContainerContent: number
    /**
     * pageContainer 被固定时的背景颜色
     */
    colorBgPageContainerFixed: string
  }
}
export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T

export type LayoutDesignToken = BaseLayoutDesignToken

export const getLayoutDesignToken: (
  baseDesignTokens: DeepPartial<LayoutDesignToken>,
  antdToken: GlobalToken,
) => LayoutDesignToken = (designTokens, antdToken) => {
  const finalDesignTokens = { ...designTokens }
  return {
    bgLayout: `linear-gradient(${antdToken.colorBgContainer}, ${antdToken.colorBgLayout} 28%)`,
    colorTextAppListIcon: antdToken.colorTextSecondary,
    colorBgAppListIconHover: setAlpha(antdToken.colorTextBase, 0.04),
    colorTextAppListIconHover: antdToken.colorTextBase,
    ...finalDesignTokens,
    header: {
      colorBgHeader: antdToken.colorBgContainer,
      colorHeaderTitle: antdToken.colorText,
      colorBgMenuItemSelected: antdToken.controlItemBgActive,
      colorBgMenuItemHover: antdToken.colorBgTextHover,
      colorBgMenuItemSelectedHorizontal: 'transparent',
      colorTextMenu: antdToken.colorText,
      colorTextMenuActive: antdToken.colorPrimary,
      colorTextMenuSelected: antdToken.colorPrimary,
      colorBgRightActionsItemHover: setAlpha(antdToken.colorTextBase, 0.03),
      colorTextRightActionsItem: antdToken.colorTextTertiary,
      heightLayoutHeader: 56,
      colorTextMenuSecondary: antdToken.colorTextTertiary,
      ...finalDesignTokens.header,
    } as LayoutDesignToken['header'],
    sider: {
      colorMenuBackground: antdToken.colorBgContainer,
      colorSubMenuBackground: antdToken.colorFillAlter,
      colorMenuItemDivider: setAlpha(antdToken.colorTextBase, 0.06),
      colorBgMenuItemHover: antdToken.colorBgTextHover,
      colorBgMenuItemActive: antdToken.colorFillContent,
      colorBgMenuItemSelected: antdToken.controlItemBgActive,
      colorBgMenuItemSelectedHorizontal: 'transparent',
      colorTextMenuActiveBarWidth: 0,
      colorTextMenuActiveBarHeight: 2,
      colorTextMenuActiveBarBorderSize: antdToken.lineWidth,
      colorTextMenuItemHover: antdToken.colorText,
      colorTextMenuSelected: antdToken.colorPrimary,
      colorTextMenuActive: antdToken.colorText,
      colorTextMenu: antdToken.colorText,
      colorTextMenuSecondary: antdToken.colorTextTertiary,
      colorTextMenuTitle: antdToken.colorText,
      colorTextSubMenuSelected: setAlpha(antdToken.colorTextBase, 0.95),
      ...finalDesignTokens.sider,
    },
    pageContainer: {
      colorBgPageContainer: 'transparent',
      paddingInlinePageContainerContent:
        finalDesignTokens.pageContainer?.paddingInlinePageContainerContent || 40,
      paddingBlockPageContainerContent:
        finalDesignTokens.pageContainer?.paddingBlockPageContainerContent || 32,
      colorBgPageContainerFixed: antdToken.colorBgElevated,
      ...finalDesignTokens.pageContainer,
    },
  } as LayoutDesignToken
}

export interface ProTokenType {
  layout?: DeepPartial<LayoutDesignToken>
}

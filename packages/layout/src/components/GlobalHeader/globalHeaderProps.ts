import type { ProTokenType } from '@antdv-next1/pro-provider'
import type { MenuProps } from 'antdv-next'
import type { VueNode } from 'antdv-next/dist/_util/type'
import type { CSSProperties, Events, ExtractPropTypes, PropType, ShallowRef } from 'vue'
import type { PureSettings } from '../../defaultSettings'
import type { ActionsRender, AppListRender, HeaderContentRender, HeaderTitleRender, MenuHeaderRender, MenuRender } from '../../RenderTypings'
import type { MenuDataItem, MessageDescriptor, WithFalse } from '../../typing'
import type { AppItemProps, AppListProps } from '../AppsLogoComponents/typing'
import type { AvatarPropsType } from './ActionsContent'
import defaultSettings from '../../defaultSettings'

export function globalHeaderProps() {
  return {
    collapsed: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
    class: {
      type: String as PropType<string>,
      default: undefined,
    },
    style: {
      type: [Object, String] as PropType<CSSProperties>,
      default: undefined,
    },
    onCollapse: {
      type: Function as PropType<(collapsed: boolean) => void>,
      default: undefined,
    },
    isMobile: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
    /** 品牌logo的标识 */
    logo: {
      type: [String, Function, Array, Boolean, Number, Object] as PropType<VueNode>,
      default: undefined,
    },
    /**
     * @name menuRender 虽然叫menuRender，但是其实是整个 SiderMenu 面板的渲染函数
     *
     * @example 收起时完成不展示菜单 menuRender={(props,defaultDom)=> props.collapsed ? null : defaultDom}
     * @example 不展示菜单 menuRender={false}
     */
    menuRender: {
      type: [Boolean, Function] as PropType<WithFalse<MenuRender>>,
      default: undefined,
    },
    /**
     * @name menuProps 要给菜单的props, 参考ant-menu的属性
     */
    menuProps: {
      type: Object as PropType<MenuProps>,
      default: undefined,
    },
    prefixCls: {
      type: String as PropType<string>,
      default: undefined,
    },
    /** 相关品牌的列表 */
    appList: {
      type: Array as PropType<AppListProps>,
      default: undefined,
    },
    /** 相关品牌的列表项 点击事件，当事件存在时，appList 内配置的 url 不在自动跳转 */
    itemClick: {
      type: Function as PropType<(item: AppItemProps, popoverRef: ShallowRef<HTMLSpanElement | null>) => void>,
      default: undefined,
    },
    menuData: {
      type: Array as PropType<MenuDataItem[]>,
      default: undefined,
    },
    /**
     * @name onMenuHeaderClick 菜单顶部logo 和 title 区域的点击事件
     *
     * @example 点击跳转到首页 onMenuHeaderClick={()=>{ router.push('/') }}
     */
    onMenuHeaderClick: {
      type: Function as PropType<(e: Events['onClick']) => void>,
      default: undefined,
    },
    menuHeaderRender: {
      type: [Boolean, Function] as PropType<WithFalse<MenuHeaderRender>>,
      default: undefined,
    },
    headerTitleRender: {
      type: [Function, Boolean] as PropType<WithFalse<HeaderTitleRender>>,
      default: undefined,
    },
    token: {
      type: Object as PropType<ProTokenType['layout']>,
      default: undefined,
    },
    /**
     * @name headerContentRender 顶部区域的渲染，包含内部的 menu
     *
     * @example headerContentRender={(props) => <div>管理控制台 </div>}
     */
    headerContentRender: {
      type: [Function, Boolean] as PropType<WithFalse<HeaderContentRender>>,
      default: undefined,
    },
    /**
     * @name actionsRender Layout的操作功能列表，不同的 layout 会放到不同的位置
     */
    actionsRender: {
      type: [Function, Boolean] as PropType<WithFalse<ActionsRender>>,
      default: undefined,
    },
    /** 头像的设置 */
    avatarProps: {
      type: [Object, Boolean] as PropType<AvatarPropsType>,
      default: undefined,
    },
    formatMessage: {
      type: Function as PropType<(message: MessageDescriptor) => string | undefined>,
      default: undefined,
    },
    /** 相关品牌的列表自定义渲染 */
    appListRender: {
      type: [Function, Boolean] as PropType<WithFalse<AppListRender>>,
      default: undefined,
    },
    navTheme: {
      type: String as PropType<PureSettings['navTheme']>,
      default: defaultSettings.navTheme,
    },
    layout: {
      type: String as PropType<PureSettings['layout']>,
      default: defaultSettings.layout,
    },
    contentWidth: {
      type: String as PropType<PureSettings['contentWidth']>,
      default: defaultSettings.contentWidth,
    },
    fixedHeader: {
      type: Boolean as PropType<PureSettings['fixedHeader']>,
      default: defaultSettings.fixedHeader,
    },
    fixedSiderbar: {
      type: Boolean as PropType<PureSettings['fixedSiderbar']>,
      default: defaultSettings.fixedSiderbar,
    },
    compact: {
      type: Boolean as PropType<PureSettings['compact']>,
      default: defaultSettings.compact,
    },
    menu: {
      type: Object as PropType<PureSettings['menu']>,
      default: () => defaultSettings.menu,
    },
    title: {
      type: [String, Boolean] as PropType<PureSettings['title']>,
      default: defaultSettings.title,
    },
    iconfontUrl: {
      type: String as PropType<PureSettings['iconfontUrl']>,
      default: defaultSettings.iconfontUrl,
    },
    colorPrimary: {
      type: String as PropType<PureSettings['colorPrimary']>,
      default: defaultSettings.colorPrimary,
    },
    colorWeak: {
      type: Boolean as PropType<PureSettings['colorWeak']>,
      default: defaultSettings.colorWeak,
    },
    splitMenus: {
      type: Boolean as PropType<PureSettings['splitMenus']>,
      default: defaultSettings.splitMenus,
    },
    suppressSiderWhenMenuEmpty: {
      type: Boolean as PropType<PureSettings['suppressSiderWhenMenuEmpty']>,
      default: defaultSettings.suppressSiderWhenMenuEmpty,
    },
    siderMenuType: {
      type: String as PropType<PureSettings['siderMenuType']>,
      default: defaultSettings.siderMenuType,
    },
  }
}

export type GlobalHeaderProps = Partial<ExtractPropTypes<typeof globalHeaderProps>>

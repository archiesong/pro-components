import type { Events, ExtractPropTypes, PropType, Ref } from 'vue';
import type { MenuDataItem, MessageDescriptor, VueNode } from '../../typing';
import type {
  ActionsRender,
  AppListRender,
  HeaderContentRender,
  MenuHeaderRender,
  MenuRender,
} from '../../RenderTypings';
import type { MenuProps } from 'ant-design-vue';
import type { ProTokenType } from '@ant-design-vue/pro-provider';
import type { AppItemProps, AppListProps } from '../AppsLogoComponents/typing';
import type { AvatarPropsType } from './ActionsContent';
import defaultSettings, { PureSettings } from '../../defaultSettings';

export const globalHeaderProps = () => ({
  collapsed: Boolean as PropType<boolean>,
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
   * @name 虽然叫menuRender，但是其实是整个 SiderMenu 面板的渲染函数
   *
   * @example 收起时完成不展示菜单 menuRender={(props,defaultDom)=> props.collapsed ? null : defaultDom}
   * @example 不展示菜单 menuRender={false}
   */
  menuRender: {
    type: [Boolean, Function] as PropType<MenuRender>,
    default: undefined,
  },
  /**
   * @name 要给菜单的props, 参考ant-menu的属性
   */
  menuProps: {
    type: Object as PropType<MenuProps>,
    default: undefined,
  },
  prefixCls: String as PropType<string>,
  /** 相关品牌的列表 */
  appList: Array as PropType<AppListProps>,
  /** 相关品牌的列表项 点击事件，当事件存在时，appList 内配置的 url 不在自动跳转 */
  itemClick: Function as PropType<
    (item: AppItemProps, popoverRef: Ref<HTMLSpanElement | null>) => void
  >,
  menuData: Array as PropType<MenuDataItem[]>,
  /**
   * @name 菜单顶部logo 和 title 区域的点击事件
   *
   * @example 点击跳转到首页 onMenuHeaderClick={()=>{ router.push('/') }}
   */
  onMenuHeaderClick: {
    type: Function as PropType<(e: Events['onClick']) => void>,
    default: undefined,
  },
  menuHeaderRender: {
    type: [Boolean, Object, Function] as PropType<MenuHeaderRender>,
    default: undefined,
  },
  token: Object as PropType<ProTokenType['layout']>,
  /**
   * @name 顶部区域的渲染，包含内部的 menu
   *
   * @example headerContentRender={(props) => <div>管理控制台 </div>}
   */
  headerContentRender: {
    type: [Function, Boolean, Object] as PropType<HeaderContentRender>,
    default: undefined,
  },
  /**
   * @name Layout的操作功能列表，不同的 layout 会放到不同的位置
   */
  actionsRender: {
    type: [Function, Object, Boolean] as PropType<ActionsRender>,
    default: undefined,
  },
  /** 头像的设置 */
  avatarProps: {
    type: [Object, Boolean] as PropType<AvatarPropsType>,
    default: undefined,
  },
  formatMessage: Function as PropType<(message: MessageDescriptor) => string>,
  /** 相关品牌的列表自定义渲染 */
  appListRender: [Function, Object, Boolean] as PropType<AppListRender>,
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
});

export type GlobalHeaderProps = Partial<ExtractPropTypes<typeof globalHeaderProps>>;

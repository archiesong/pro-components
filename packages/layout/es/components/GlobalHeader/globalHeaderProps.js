import e from "../../defaultSettings.js";
const o = () => ({
  collapsed: Boolean,
  onCollapse: {
    type: Function,
    default: void 0
  },
  isMobile: {
    type: Boolean,
    default: void 0
  },
  /** 品牌logo的标识 */
  logo: {
    type: [String, Function, Array, Boolean, Number, Object],
    default: void 0
  },
  /**
   * @name 虽然叫menuRender，但是其实是整个 SiderMenu 面板的渲染函数
   *
   * @example 收起时完成不展示菜单 menuRender={(props,defaultDom)=> props.collapsed ? null : defaultDom}
   * @example 不展示菜单 menuRender={false}
   */
  menuRender: {
    type: [Boolean, Function],
    default: void 0
  },
  /**
   * @name 要给菜单的props, 参考ant-menu的属性
   */
  menuProps: {
    type: Object,
    default: void 0
  },
  prefixCls: String,
  /** 相关品牌的列表 */
  appList: Array,
  /** 相关品牌的列表项 点击事件，当事件存在时，appList 内配置的 url 不在自动跳转 */
  itemClick: Function,
  menuData: Array,
  /**
   * @name 菜单顶部logo 和 title 区域的点击事件
   *
   * @example 点击跳转到首页 onMenuHeaderClick={()=>{ router.push('/') }}
   */
  onMenuHeaderClick: {
    type: Function,
    default: void 0
  },
  menuHeaderRender: {
    type: [Boolean, Object, Function],
    default: void 0
  },
  token: Object,
  /**
   * @name 顶部区域的渲染，包含内部的 menu
   *
   * @example headerContentRender={(props) => <div>管理控制台 </div>}
   */
  headerContentRender: {
    type: [Function, Boolean, Object],
    default: void 0
  },
  /**
   * @name Layout的操作功能列表，不同的 layout 会放到不同的位置
   */
  actionsRender: {
    type: [Function, Object, Boolean],
    default: void 0
  },
  /** 头像的设置 */
  avatarProps: {
    type: [Object, Boolean],
    default: void 0
  },
  formatMessage: Function,
  /** 相关品牌的列表自定义渲染 */
  appListRender: [Function, Object, Boolean],
  navTheme: {
    type: String,
    default: e.navTheme
  },
  layout: {
    type: String,
    default: e.layout
  },
  contentWidth: {
    type: String,
    default: e.contentWidth
  },
  fixedHeader: {
    type: Boolean,
    default: e.fixedHeader
  },
  fixedSiderbar: {
    type: Boolean,
    default: e.fixedSiderbar
  },
  compact: {
    type: Boolean,
    default: e.compact
  },
  menu: {
    type: Object,
    default: () => e.menu
  },
  title: {
    type: [String, Boolean],
    default: e.title
  },
  iconfontUrl: {
    type: String,
    default: e.iconfontUrl
  },
  colorPrimary: {
    type: String,
    default: e.colorPrimary
  },
  colorWeak: {
    type: Boolean,
    default: e.colorWeak
  },
  splitMenus: {
    type: Boolean,
    default: e.splitMenus
  },
  suppressSiderWhenMenuEmpty: {
    type: Boolean,
    default: e.suppressSiderWhenMenuEmpty
  },
  siderMenuType: {
    type: String,
    default: e.siderMenuType
  }
});
export {
  o as globalHeaderProps
};

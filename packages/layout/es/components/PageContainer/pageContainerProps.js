import { pageHeaderProps as e } from "ant-design-vue/es/page-header";
const o = () => ({
  ...e(),
  avatar: {
    type: Object,
    default: void 0
  },
  /**
   * @name tabs 的列表
   */
  tabList: {
    type: Array,
    default: void 0
  },
  /**
   * @name  tabActiveKey 当前选中 tab 的 key
   */
  tabActiveKey: String,
  /**
   * @name  tab 修改时触发
   */
  onTabChange: Function,
  /**
   * @name tab 上右边额外的区域
   */
  tabBarExtraContent: {
    type: [Object, String, Function],
    default: void 0
  },
  /** @name tabs 的其他配置 */
  tabProps: {
    type: Object,
    default: void 0
  },
  /** @name fixedHeader 固定 PageHeader 到页面顶部 */
  fixedHeader: {
    type: Boolean,
    default: void 0
  },
  title: {
    type: [Boolean, Object, String, Function, Array, Number],
    default: void 0
  },
  breadcrumb: {
    type: Object,
    default: void 0
  },
  content: {
    type: [Object, String, Boolean, Function],
    default: void 0
  },
  footer: {
    type: Array,
    default: void 0
  },
  extraContent: {
    type: [Object, String, Boolean, Function],
    default: void 0
  },
  /**
   * @name token 自定义的 token
   */
  token: {
    type: Object,
    default: void 0
  },
  /**
   * 与 Ant Design Vue 完全相同
   *
   * @name PageHeader 的配置
   */
  header: {
    type: Object,
    default: void 0
  },
  /**
   * @name pageHeaderRender 自定义 pageHeader
   */
  pageHeaderRender: {
    type: [Object, Function, Boolean],
    default: void 0
  },
  /**
   * 与 Ant Design Vue 完全相同
   * @name affixProps 固钉的配置
   */
  affixProps: {
    type: Object,
    default: void 0
  },
  /**
   * 只加载内容区域
   *
   * @name loading 是否加载
   */
  loading: {
    type: [Object, Function, Boolean],
    default: void 0
  },
  /**
   * 自定义 breadcrumb,
   * @name breadcrumbRender 返回false不展示
   */
  breadcrumbRender: {
    type: [Object, Function, Boolean],
    default: void 0
  },
  /**
   * @name WaterMarkProps 水印的配置
   */
  waterMarkProps: {
    type: Object,
    default: void 0
  },
  stylish: {
    type: Object,
    default: void 0
  },
  footerStylish: {
    type: Object,
    default: void 0
  },
  footerToolBarProps: {
    type: Object,
    default: void 0
  }
});
export {
  o as pageContainerProps
};

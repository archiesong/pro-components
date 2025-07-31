import { headerViewProps as e } from "./components/Header/index.js";
import { siderMenuProps as t } from "./components/SiderMenu/SiderMenu.js";
const d = () => ({
  ...e(),
  ...t(),
  compact: {
    type: Boolean,
    default: void 0
  },
  routes: {
    type: Array,
    default: void 0
  },
  /**
   * @name 当前应用会话的位置信息。如果你的应用创建了自定义的 history，则需要显示指定 location 属性
   */
  location: {
    type: Object,
    default: void 0
  },
  stylish: Object,
  /**
   * @name Layout 的品牌配置，表现为一张背景图片
   */
  bgLayoutImgList: {
    type: Array,
    default: void 0
  },
  isChildrenLayout: {
    type: Boolean,
    default: void 0
  },
  token: Object,
  /**
   * @name 简约模式，设置了之后不渲染的任何 layout 的东西，但是会有 context，可以获取到当前菜单。
   *
   * @example pure={true}
   */
  pure: {
    type: Boolean,
    default: void 0
  },
  disableMobile: {
    type: Boolean,
    default: void 0
  },
  /**
   * content 的样式
   *
   * @example 背景颜色为红色 contentStyle={{ backgroundColor: 'red '}}
   */
  contentStyle: {
    type: Object,
    default: void 0
  },
  /**
   * @name 多标签配置
   */
  tagsViewRender: {
    type: [Object, Function, Boolean],
    default: void 0
  },
  /**
   * @name 页脚的配置
   *
   * @example 不展示dom footerRender={false}
   * @example 使用 layout 的  DefaultFooter   footerRender={() => (<DefaultFooter copyright="这是一条测试文案"/>}
   */
  footerRender: {
    type: [Object, Function, Boolean],
    default: void 0
  },
  /**
   * @name 设置 PageHeader 的面包屑，只能处理数据
   *
   * @example 手动设置 breadcrumbRender={(routers = []) => [ { path: '/', breadcrumbName: '主页'} ]
   * @example 增加一项 breadcrumbRender={(routers = []) => { return [{ path: '/', breadcrumbName: '主页'} ,...routers ]}
   * @example 删除首页 breadcrumbRender={(routers = []) => { return routers.filter(item => item.path !== '/')}
   * @example 不显示面包屑 breadcrumbRender={false}
   */
  breadcrumbRender: {
    type: [Object, Function, Boolean],
    default: void 0
  },
  /**
   * @name 设置页面的标题
   *
   * @example 根据页面的路由设置标题 pageTitleRender={(props) => { return props.location.pathname }}
   * @example 不显示标题 pageTitleRender={false}
   * @example 根据默认的标题设置 pageTitleRender={(props,defaultPageTitle) => { return defaultPageTitle + '这是一个测试标题' }}
   * @example 根据 info 来自己组合标题 pageTitleRender={(props,defaultPageTitle,info) => { return info.title + "-" + info.pageName }
   */
  pageTitleRender: {
    type: [Object, Function, Boolean],
    default: void 0
  },
  /**
   * @name PageHeader 的 BreadcrumbProps 配置，会透传下去
   * */
  breadcrumbProps: {
    type: Object,
    default: void 0
  },
  /**
   * @name layout 的 loading 效果，设置完成之后只展示一个 loading
   *
   * @example loading={true}
   */
  loading: {
    type: Boolean,
    default: void 0
  },
  itemRender: Function,
  formatMessage: Function,
  /**
   * @name menuData 的自定义render方法
   */
  menuDataRender: Function,
  /**
   * @name 错误处理组件
   *
   * @example errorBoundaryRender={MyErrorBoundary}
   */
  errorBoundaryRender: {
    type: [Object, Function, Boolean],
    default: void 0
  },
  /** @name 水印的相关配置 */
  waterMarkProps: {
    type: Object,
    default: void 0
  }
});
export {
  d as proLayoutProps
};

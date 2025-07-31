import type { CSSProperties, ExtractPropTypes, PropType } from 'vue';
import type { AnyObject } from 'ant-design-vue/es/_util/type';
import type { Route } from 'ant-design-vue/es/breadcrumb/Breadcrumb';
import type { BreadcrumbProps as AntdBreadcrumbProps, WatermarkProps } from 'ant-design-vue';
import type { VueNode } from 'ant-design-vue/es/_util/type';
import type { PureSettings } from './defaultSettings';
import type { MenuDataItem, MessageDescriptor } from './typing';
import type { GenerateStyle, ProTokenType } from '@ant-design-vue/pro-provider';
import type { SiderMenuToken } from './components/SiderMenu/style';
import type {
  BreadcrumbRender,
  ErrorBoundaryRender,
  FooterRender,
  MenuDataRender,
  PageTitleRender,
  TagsViewRender,
} from './RenderTypings';
import { headerViewProps } from './components/Header';
import { siderMenuProps } from './components/SiderMenu/SiderMenu';
export type LayoutBreadcrumbProps<T extends AnyObject = AnyObject> = {
  minLength?: number;
  itemRender?: (opt: { route: Route; params: T; routes: Route[]; paths: Route[] }) => VueNode;
};
export const proLayoutProps = () => ({
  ...headerViewProps(),
  ...siderMenuProps(),
  compact: {
    type: Boolean as PropType<PureSettings['compact']>,
    default: undefined,
  },
  routes: {
    type: Array as PropType<MenuDataItem[]>,
    default: undefined,
  },
  /**
   * @name 当前应用会话的位置信息。如果你的应用创建了自定义的 history，则需要显示指定 location 属性
   */
  location: {
    type: Object as PropType<{
      pathname: string;
    }>,
    default: undefined,
  },
  stylish: Object as PropType<{
    header?: GenerateStyle<SiderMenuToken>;
    sider?: GenerateStyle<SiderMenuToken>;
  }>,
  /**
   * @name Layout 的品牌配置，表现为一张背景图片
   */
  bgLayoutImgList: {
    type: Array as PropType<
      {
        src?: string;
        width?: string;
        height?: string;
        left?: number;
        top?: number;
        bottom?: number;
        right?: number;
      }[]
    >,
    default: undefined,
  },
  isChildrenLayout: {
    type: Boolean,
    default: undefined,
  },
  token: Object as PropType<ProTokenType['layout']>,
  /**
   * @name 简约模式，设置了之后不渲染的任何 layout 的东西，但是会有 context，可以获取到当前菜单。
   *
   * @example pure={true}
   */
  pure: {
    type: Boolean as PropType<boolean>,
    default: undefined,
  },
  disableMobile: {
    type: Boolean as PropType<boolean>,
    default: undefined,
  },
  /**
   * content 的样式
   *
   * @example 背景颜色为红色 contentStyle={{ backgroundColor: 'red '}}
   */
  contentStyle: {
    type: Object as PropType<CSSProperties>,
    default: undefined,
  },
  /**
   * @name 多标签配置
   */
  tagsViewRender: {
    type: [Object, Function, Boolean] as PropType<TagsViewRender>,
    default: undefined,
  },
  /**
   * @name 页脚的配置
   *
   * @example 不展示dom footerRender={false}
   * @example 使用 layout 的  DefaultFooter   footerRender={() => (<DefaultFooter copyright="这是一条测试文案"/>}
   */
  footerRender: {
    type: [Object, Function, Boolean] as PropType<FooterRender>,
    default: undefined,
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
    type: [Object, Function, Boolean] as PropType<BreadcrumbRender>,
    default: undefined,
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
    type: [Object, Function, Boolean] as PropType<PageTitleRender>,
    default: undefined,
  },
  /**
   * @name PageHeader 的 BreadcrumbProps 配置，会透传下去
   * */
  breadcrumbProps: {
    type: Object as PropType<Omit<AntdBreadcrumbProps, 'itemRender'> & LayoutBreadcrumbProps>,
    default: undefined,
  },
  /**
   * @name layout 的 loading 效果，设置完成之后只展示一个 loading
   *
   * @example loading={true}
   */
  loading: {
    type: Boolean,
    default: undefined,
  },
  itemRender: Function as PropType<AntdBreadcrumbProps['itemRender']>,
  formatMessage: Function as PropType<(message: MessageDescriptor) => string>,
  /**
   * @name menuData 的自定义render方法
   */
  menuDataRender: Function as PropType<MenuDataRender>,
  /**
   * @name 错误处理组件
   *
   * @example errorBoundaryRender={MyErrorBoundary}
   */
  errorBoundaryRender: {
    type: [Object, Function, Boolean] as PropType<ErrorBoundaryRender>,
    default: undefined,
  },
  /** @name 水印的相关配置 */
  waterMarkProps: {
    type: Object as PropType<WatermarkProps>,
    default: undefined,
  },
});
export type ProLayoutProps = Partial<ExtractPropTypes<ReturnType<typeof proLayoutProps>>>;

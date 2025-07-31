import type { ExtractPropTypes, PropType } from 'vue';
import type {
  SpinProps,
  PageHeaderProps,
  AffixProps,
  TabPaneProps,
  AvatarProps,
  TabsProps,
  WatermarkProps,
  BreadcrumbProps,
} from 'ant-design-vue';
import type { GenerateStyle } from '@ant-design-vue/pro-provider';
import type { VueNode, WithFalse } from '../../typing';
import type { PageContainerToken, pageContainerToken } from './style';
import type { FooterToolbarProps } from '../FooterToolbar';
import type { BreadcrumbRender, PageHeaderRender } from '../../RenderTypings';
import { pageHeaderProps } from 'ant-design-vue/es/page-header';

export const pageContainerProps = () => ({
  ...pageHeaderProps(),
  avatar: {
    type: Object as PropType<AvatarProps>,
    default: undefined,
  },
  /**
   * @name tabs 的列表
   */
  tabList: {
    type: Array as PropType<(TabPaneProps & { key?: PropertyKey })[]>,
    default: undefined,
  },
  /**
   * @name  tabActiveKey 当前选中 tab 的 key
   */
  tabActiveKey: String as PropType<TabsProps['activeKey']>,
  /**
   * @name  tab 修改时触发
   */
  onTabChange: Function as PropType<TabsProps['onChange']>,
  /**
   * @name tab 上右边额外的区域
   */
  tabBarExtraContent: {
    type: [Object, String, Function] as PropType<TabsProps['tabBarExtraContent']>,
    default: undefined,
  },
  /** @name tabs 的其他配置 */
  tabProps: {
    type: Object as PropType<TabsProps>,
    default: undefined,
  },
  /** @name fixedHeader 固定 PageHeader 到页面顶部 */
  fixedHeader: {
    type: Boolean,
    default: undefined,
  },
  title: {
    type: [Boolean, Object, String, Function, Array, Number] as PropType<false | VueNode>,
    default: undefined,
  },
  breadcrumb: {
    type: Object as PropType<BreadcrumbProps>,
    default: undefined,
  },
  content: {
    type: [Object, String, Boolean, Function] as PropType<WithFalse<VueNode>>,
    default: undefined,
  },
  footer: {
    type: Array as PropType<VueNode[]>,
    default: undefined,
  },
  extraContent: {
    type: [Object, String, Boolean, Function] as PropType<WithFalse<VueNode>>,
    default: undefined,
  },
  /**
   * @name token 自定义的 token
   */
  token: {
    type: Object as PropType<pageContainerToken>,
    default: undefined,
  },
  /**
   * 与 Ant Design Vue 完全相同
   *
   * @name PageHeader 的配置
   */
  header: {
    type: Object as PropType<PageHeaderProps>,
    default: undefined,
  },
  /**
   * @name pageHeaderRender 自定义 pageHeader
   */
  pageHeaderRender: {
    type: [Object, Function, Boolean] as PropType<PageHeaderRender>,
    default: undefined,
  },
  /**
   * 与 Ant Design Vue 完全相同
   * @name affixProps 固钉的配置
   */
  affixProps: {
    type: Object as PropType<AffixProps>,
    default: undefined,
  },
  /**
   * 只加载内容区域
   *
   * @name loading 是否加载
   */
  loading: {
    type: [Object, Function, Boolean] as PropType<boolean | SpinProps | VueNode>,
    default: undefined,
  },
  /**
   * 自定义 breadcrumb,
   * @name breadcrumbRender 返回false不展示
   */
  breadcrumbRender: {
    type: [Object, Function, Boolean] as PropType<BreadcrumbRender>,
    default: undefined,
  },
  /**
   * @name WaterMarkProps 水印的配置
   */
  waterMarkProps: {
    type: Object as PropType<WatermarkProps>,
    default: undefined,
  },
  stylish: {
    type: Object as PropType<GenerateStyle<PageContainerToken>>,
    default: undefined,
  },
  footerStylish: {
    type: Object as PropType<GenerateStyle<PageContainerToken>>,
    default: undefined,
  },
  footerToolBarProps: {
    type: Object as PropType<FooterToolbarProps>,
    default: undefined,
  },
});
export type PageContainerProps = Partial<ExtractPropTypes<ReturnType<typeof pageContainerProps>>>;

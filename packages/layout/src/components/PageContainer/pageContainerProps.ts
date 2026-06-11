import type { GenerateStyle } from '@antdv-next/pro-provider'
import type { AffixProps, AvatarProps, BreadcrumbProps, SpinProps, TabsProps, WatermarkProps } from 'antdv-next'
import type { ExtractPropTypes, PropType } from 'vue'
import type { PageHeaderRender } from '../../RenderTypings'
import type { VueNode, WithFalse } from '../../typing'
import type { FooterToolbarProps } from '../FooterToolbar'
import type { PageHeaderProps } from '../PageHeader'
import type { PageContainerToken, pageContainerToken } from './style'
import { omit } from '@v-c/util'
import { pageHeaderProps } from '../PageHeader'

export function pageContainerProps() {
  return {
    ...omit(pageHeaderProps(), ['title', 'footer', 'breadcrumb', 'breadcrumbRender']),
    avatar: {
      type: Object as PropType<AvatarProps>,
      default: undefined,
    },
    /**
     * @name tabList tabs 的列表
     */
    tabList: {
      type: Array as PropType<TabsProps['items']>,
      default: undefined,
    },
    /**
     * @name  tabActiveKey 当前选中 tab 的 key
     */
    tabActiveKey: {
      type: String as PropType<TabsProps['activeKey']>,
      default: undefined,
    },
    /**
     * @name  tab 修改时触发
     */
    onTabChange: {
      type: Function as PropType<TabsProps['onChange']>,
      default: undefined,
    },
    /**
     * @name tab 上右边额外的区域
     */
    tabBarExtraContent: {
      type: [Object, String] as PropType<VueNode | { left?: VueNode, right?: VueNode }>,
      default: undefined,
    },
    /** @name tabProps tabs 的其他配置 */
    tabProps: {
      type: Object as PropType<TabsProps>,
      default: undefined,
    },
    /** @name fixedHeader 固定 PageHeader 到页面顶部 */
    fixedHeader: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
    title: {
      type: [Boolean, String, Object, Function] as PropType<WithFalse<VueNode | (() => VueNode)>>,
      default: undefined,
    },
    breadcrumb: {
      type: Object as PropType<BreadcrumbProps>,
      default: undefined,
    },
    /**
     * 自定义 breadcrumb,
     * @name breadcrumbRender 返回false不展示
     */
    breadcrumbRender: {
      type: [Boolean, Function] as PropType<WithFalse<PageHeaderProps['breadcrumbRender']>>,
      default: undefined,
    },
    content: {
      type: [Object, String, Boolean, Function] as PropType<WithFalse<VueNode>>,
      default: undefined,
    },
    footer: {
      type: [Array, String, Object, Function] as PropType<VueNode | (() => VueNode)>,
      default: undefined,
    },
    extraContent: {
      type: [Object, String, Boolean, Function] as PropType<WithFalse<VueNode | (() => VueNode)>>,
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
     * 与 Ant Design 完全相同
     *
     * @name PageHeader 的配置
     */
    header: {
      type: Object as PropType<PageHeaderProps & { children?: VueNode }>,
      default: undefined,
    },
    /**
     * @name pageHeaderRender 自定义 pageHeader
     */
    pageHeaderRender: {
      type: [Function, Boolean] as PropType<WithFalse<PageHeaderRender>>,
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
      type: [Object, Function, Boolean] as PropType<SpinProps | VueNode | (() => VueNode)>,
      default: undefined,
    },
    /**
     * @name waterMarkProps 水印的配置
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
  }
}
export type PageContainerProps = Partial<ExtractPropTypes<ReturnType<typeof pageContainerProps>>>

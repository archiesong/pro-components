import type { GenerateStyle, ProTokenType } from '@antdv-next/pro-provider'
// import type {  } from '@antdv-next/pro-utils'
import type { BreadcrumbProps, WatermarkProps } from 'antdv-next'
import type { AnyObject, VueNode } from 'antdv-next/dist/_util/type'
import type { ItemType } from 'antdv-next/dist/breadcrumb/Breadcrumb'
import type { CSSProperties, ExtractPropTypes, PropType } from 'vue'
import type { SiderMenuToken } from './components/SiderMenu/style'
import type { PureSettings } from './defaultSettings'
import type { GetPageTitleProps } from './getPageTitle'
import type { ErrorBoundaryRender, FooterRender, TagsViewRender } from './RenderTypings'
import type { MenuDataItem, MessageDescriptor, RouterTypes, WithFalse } from './typing'
import { headerViewProps } from './components/Header'
import { siderMenuProps } from './components/SiderMenu/siderMenuProps'

type LayoutItemType = ItemType & { linkPath?: string, component?: string }

export interface LayoutBreadcrumbProps<T extends AnyObject = AnyObject> {
  minLength?: number
  itemRender?: (route: LayoutItemType, params: T, routes: LayoutItemType[], paths: string[]) => VueNode
}

export function proLayoutProps() {
  return {
    ...siderMenuProps(),
    ...headerViewProps(),
    /**
     * @name location 当前应用会话的位置信息。如果你的应用创建了自定义的 history，则需要显示指定 location 属性
     */
    location: {
      type: Object as PropType<RouterTypes['location']>,
      default: undefined,
    },
    route: {
      type: Object as PropType<RouterTypes['route']>,
      default: undefined,
    },
    token: {
      type: Object as PropType<ProTokenType['layout']>,
      default: undefined,
    },
    stylish: {
      type: Object as PropType<{
        header?: GenerateStyle<SiderMenuToken>
        sider?: GenerateStyle<SiderMenuToken>
      }>,
      default: undefined,
    },
    /**
     * @name Layout 的品牌配置，表现为一张背景图片
     */
    bgLayoutImgList: {
      type: Array as PropType<
        {
          src?: string
          width?: string
          height?: string
          left?: number
          top?: number
          bottom?: number
          right?: number
        }[]
      >,
      default: undefined,
    },
    /**
     * @name layout 的简约模式，设置了之后不渲染的任何 layout 的东西，但是会有 context，可以获取到当前菜单。
     *
     * @example pure={true}
     */
    pure: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
    /**
     * @name logo 的配置，可以配置url，React 组件 和 false
     *
     * @example 设置 logo 为网络地址  logo="https://avatars1.githubusercontent.com/u/8186664?s=460&v=4"
     * @example 设置 logo 为组件  logo={<img src="https://avatars1.githubusercontent.com/u/8186664?s=460&v=4"/>}
     * @example 设置 logo 为 false 不显示 logo  logo={false}
     * @example 设置 logo 为 方法  logo={()=> <img src="https://avatars1.githubusercontent.com/u/8186664?s=460&v=4"/> }
     */
    logo: {
      type: [Object, Boolean, Function, String] as PropType<VueNode | WithFalse<VueNode>>,
      default: undefined,
    },
    compact: {
      type: Boolean as PropType<PureSettings['compact']>,
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
    isChildrenLayout: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
    disableMobile: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
    /**
     * @name contentStyle  content 的样式
     *
     * @example 背景颜色为红色 contentStyle={{ backgroundColor: 'red '}}
     */
    contentStyle: {
      type: Object as PropType<CSSProperties>,
      default: undefined,
    },
    /**
     * @name tagsViewRender 多标签渲染配置
     */
    tagsViewRender: {
      type: [Object, Function, Boolean] as PropType<WithFalse<TagsViewRender>>,
      default: undefined,
    },
    /**
     * @name footerRender 页脚的配置
     *
     * @example 不展示dom footerRender={false}
     * @example 使用 layout 的  DefaultFooter   footerRender={() => (<DefaultFooter copyright="这是一条测试文案"/>}
     */
    footerRender: {
      type: [Function, Boolean] as PropType<WithFalse<FooterRender>>,
      default: undefined,
    },
    /**
     * @name breadcrumbRender 设置 PageHeader 的面包屑，只能处理数据
     *
     * @example 手动设置 breadcrumbRender={(routes = []) => [ { path: '/', breadcrumbName: '主页'} ]
     * @example 增加一项 breadcrumbRender={(routes = []) => { return [{ path: '/', breadcrumbName: '主页'} ,...routers ]}
     * @example 删除首页 breadcrumbRender={(routes = []) => { return routes.filter(item => item.path !== '/')}
     * @example 不显示面包屑 breadcrumbRender={false}
     */
    breadcrumbRender: {
      type: [Function, Boolean] as PropType<WithFalse<(items: BreadcrumbProps['items']) => BreadcrumbProps['items']>>,
      default: undefined,
    },
    /**
     * @name pageTitleRender 设置页面的标题
     *
     * @example 根据页面的路由设置标题 pageTitleRender={(props) => { return props.location.pathname }}
     * @example 不显示标题 pageTitleRender={false}
     * @example 根据默认的标题设置 pageTitleRender={(props,defaultPageTitle) => { return defaultPageTitle + '这是一个测试标题' }}
     * @example 根据 info 来自己组合标题 pageTitleRender={(props,defaultPageTitle,info) => { return info.title + "-" + info.pageName }
     */
    pageTitleRender: {
      type: [Function, Boolean] as PropType<
        WithFalse<
          (options: {
            props: GetPageTitleProps
            defaultPageTitle?: string
            info?: {
            // 页面标题
              title: string
              // locale 的 title
              id: string
              // 页面标题不带默认的 title
              pageName: string
            }
          }) => string | undefined
        >
      >,
      default: undefined,
    },
    /**
     * @name breadcrumbProps PageHeader 的 BreadcrumbProps 配置，会透传下去
     */
    breadcrumbProps: {
      type: Object as PropType<Omit<BreadcrumbProps, 'itemRender'> & LayoutBreadcrumbProps>,
      default: undefined,
    },
    /**
     * @name layout 的 loading 效果，设置完成之后只展示一个 loading
     *
     * @example loading={true}
     */
    loading: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
    /**
     * @name 是否收起 layout 是严格受控的，可以 设置为 true，一直收起
     *
     * @example collapsed={true}
     */
    collapsed: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
    /**
     * @name 收起和展开的时候触发事件
     *
     * @example onCollapse=(collapsed)=>{ setCollapsed(collapsed) };
     */
    onCollapse: {
      type: Function as PropType<(collapsed: boolean) => void>,
      default: undefined,
    },
    itemRender: {
      type: Function as PropType<BreadcrumbProps['itemRender']>,
      default: undefined,
    },
    formatMessage: {
      type: Function as PropType<(message: MessageDescriptor) => string | undefined>,
      default: undefined,
    },
    /**
     * @name menuData 的自定义render方法
     */
    menuDataRender: {
      type: Function as PropType<(options: { menuData: MenuDataItem[] }) => MenuDataItem[]>,
      default: undefined,
    },
    /**
     * @name errorBoundaryRender 错误处理组件
     *
     * @example errorBoundaryRender={MyErrorBoundary}
     */
    errorBoundaryRender: {
      type: [Function, Boolean] as PropType<WithFalse<ErrorBoundaryRender>>,
      default: undefined,
    },
    /** @name layout 的 水印的相关配置 */
    waterMarkProps: {
      type: Object as PropType<WatermarkProps>,
      default: undefined,
    },
  }
}

export type ProLayoutProps = Partial<ExtractPropTypes<ReturnType<typeof proLayoutProps>>>

import type { GenerateStyle } from '@antdv-next1/pro-provider'
import type { VueNode } from '@antdv-next1/pro-utils'
import type { Breakpoint } from 'antdv-next/dist/_util/responsiveObserver'
import type { SiderProps } from 'antdv-next/dist/layout/index'
import type { CSSProperties, Events, ExtractPropTypes, PropType, ShallowRef, VNode } from 'vue'
import type {
  ActionsRender,
  AppListRender,
  CollapsedButtonRender,
  HeaderRender,
  MenuContentRender,
  MenuExtraRender,
  MenuFooterRender,
  MenuHeaderRender,
} from '../../RenderTypings'
import type { WithFalse } from '../../typing'
import type { AppItemProps, AppListProps } from '../AppsLogoComponents/typing'
import type { AvatarPropsType } from '../GlobalHeader/ActionsContent'
import type { SiderMenuToken } from './style'
import { baseMenuProps } from './BaseMenu'

export function siderMenuProps() {
  return {
    ...baseMenuProps(),
    collapsedWidth: {
      type: Number as PropType<number>,
      default: undefined,
    },
    theme: {
      type: String as PropType<SiderProps['theme']>,
      default: undefined,
    },
    /** 品牌logo的标识 */
    logo: {
      type: [String, Function, Array, Boolean, Number, Object] as PropType<VueNode>,
      default: undefined,
    },
    /** 相关品牌的列表 */
    appList: {
      type: Array as PropType<AppListProps>,
      default: undefined,
    },
    /** 相关品牌的列表自定义渲染 */
    appListRender: {
      type: [Function, Boolean] as PropType<WithFalse<AppListRender>>,
      default: undefined,
    },
    /** 相关品牌的列表项 点击事件，当事件存在时，appList 内配置的 url 不在自动跳转 */
    itemClick: {
      type: Function as PropType<(item: AppItemProps, popoverRef: ShallowRef<HTMLSpanElement | null>) => void>,
      default: undefined,
    },
    /**
     * @name links 侧边菜单底部的一些快捷链接
     *
     * @example links={[<a href="ant.design"> 访问官网 </a>,<a href="help.ant.design"> 帮助 </a>]}
     */
    links: {
      type: [Array, Boolean] as PropType<
        WithFalse<
          | {
            icon?: VNode
            title?: string
            label?: VNode
          }[]
          | VueNode[]
        >
      >,
      default: undefined,
    },
    /** 菜单的宽度 */
    siderWidth: {
      type: Number as PropType<number>,
      default: undefined,
    },
    /**
     * @name menuHeaderRender  菜单 logo 和 title 区域的渲染
     *
     * @example 不要logo : menuHeaderRender={(logo,title)=> title}
     * @example 不要title : menuHeaderRender={(logo,title)=> logo}
     * @example 展开的时候显示title,收起显示 logo： menuHeaderRender={(logo,title,props)=> props.collapsed ? logo : title}
     * @example 不要这个区域了 : menuHeaderRender={false}
     */
    menuHeaderRender: {
      type: [Boolean, Function] as PropType<WithFalse<MenuHeaderRender>>,
      default: undefined,
    },
    /**
     * @name  侧边菜单，菜单区域的处理,可以单独处理菜单的dom
     *
     * @example 增加菜单区域的背景颜色 menuContentRender={(props,defaultDom)=><div style.ts={{backgroundColor:"red"}}>{defaultDom}</div>}
     * @example 某些情况下不显示菜单 menuContentRender={(props)=> return <div>不显示菜单</div>}
     */
    menuContentRender: {
      type: [Function, Boolean] as PropType<WithFalse<MenuContentRender>>,
      default: undefined,
    },
    /**
     * @name menuFooterRender 侧边菜单底部的配置，可以增加一些底部操作
     *
     * @example 底部增加超链接 menuFooterRender={()=><a href="https://pro.ant.design">pro.ant.design</a>}
     * @example 根据收起展开配置不同的 dom  menuFooterRender={()=>collapsed? null :<a href="https://pro.ant.design">pro.ant.design</a>}
     */
    menuFooterRender: {
      type: [Function, Boolean] as PropType<WithFalse<MenuFooterRender>>,
      default: undefined,
    },
    /**
     * @name collapsedButtonRender 自定义展开收起按钮的渲染
     *
     * @example 使用文字渲染 collapsedButtonRender={(collapsed)=>collapsed?"展开":"收起"})}
     * @example 使用icon渲染 collapsedButtonRender={(collapsed)=>collapsed?<MenuUnfoldOutlined />:<MenuFoldOutlined />}
     * @example 不渲染按钮 collapsedButtonRender={false}
     */
    collapsedButtonRender: {
      type: [Function, Boolean] as PropType<WithFalse<CollapsedButtonRender>>,
      default: undefined,
    },
    siderProps: {
      type: Object as PropType<SiderProps>,
      default: undefined,
    },
    /**
     * @name breakpoint 菜单是否收起的断点，设置成false 可以禁用
     *
     * @example 禁用断点  breakpoint={false}
     * @example 最小的屏幕再收起 breakpoint={"xs"}
     */
    breakpoint: {
      type: [String, Boolean] as PropType<WithFalse<Breakpoint>>,
      default: 'lg',
    },
    /** 头像的设置 */
    avatarProps: {
      type: [Object, Boolean] as PropType<AvatarPropsType>,
      default: undefined,
    },
    /**
     * @name actionsRender Layout的操作功能列表，不同的 layout 会放到不同的位置
     */
    actionsRender: {
      type: [Function, Boolean] as PropType<WithFalse<ActionsRender>>,
      default: undefined,
    },
    /**
     * @name menuExtraRender 侧边菜单 title 和 logo 下面区域的渲染，一般会增加个搜索框
     *
     * @example  增加一个搜索框 menuExtraRender={()=>(<Search placeholder="请输入" />)}
     * @example  根据收起展开配置不同的 dom： menuExtraRender={()=>collapsed? null : <Search placeholder="请输入" />}
     */
    menuExtraRender: {
      type: [Function, Boolean] as PropType<WithFalse<MenuExtraRender>>,
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
    /**
     * @name logoStyle 侧边菜单的logo的样式，可以调整下大小
     *
     * @example 设置logo的大小为 42px logoStyle={{width: '42px', height: '42px'}}
     */
    logoStyle: {
      type: [Object, String] as PropType<CSSProperties>,
      default: undefined,
    },
    headerRender: {
      type: [Function, Boolean] as PropType<WithFalse<HeaderRender>>,
      default: undefined,
    },
  }
}
export type SiderMenuProps = Partial<ExtractPropTypes<ReturnType<typeof siderMenuProps>>>

export function privateSiderMenuProps() {
  return {
    matchMenuKeys: Array as PropType<string[]>,
    originCollapsed: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
    menuRenderType: String as PropType<'header' | 'sider'>,
    stylish: Object as PropType<GenerateStyle<SiderMenuToken>>,
  }
}

export type PrivateSiderMenuProps = Partial<ExtractPropTypes<ReturnType<typeof privateSiderMenuProps>>>

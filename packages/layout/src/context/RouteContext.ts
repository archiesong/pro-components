import type { BreadcrumbProps, WatermarkProps } from 'antdv-next'
import type { InjectionKey, Ref } from 'vue'
import type { PureSettings } from '../defaultSettings'
import type { LayoutBreadcrumbProps } from '../proLayoutProps'
import type { MenuDataItem } from '../typing'
import type { BreadcrumbListReturn } from '../utils/getBreadcrumbProps'
import { inject, provide, ref } from 'vue'

export type RouteContextType = {
  breadcrumb?: BreadcrumbListReturn
  menuData?: MenuDataItem[]
  isMobile?: boolean
  prefixCls?: string
  collapsed?: boolean
  siderWidth?: number
  isChildrenLayout?: boolean
  hasSiderMenu?: boolean
  hasHeader?: boolean
  hasFooter?: boolean
  hasFooterToolbar?: boolean
  setHasFooterToolbar?: (val: boolean) => void
  hasPageContainer?: number
  setHasPageContainer?: (val: number) => void
  pageTitleInfo?: {
    title: string
    id: string
    pageName: string
  }
  matchMenus?: MenuDataItem[]
  matchMenuKeys?: string[]
  currentMenu?: PureSettings & MenuDataItem
  /** PageHeader 的 BreadcrumbProps 配置，会透传下去 */
  breadcrumbProps?: Omit<BreadcrumbProps, 'itemRender'> & LayoutBreadcrumbProps
  waterMarkProps?: WatermarkProps
} & PureSettings

export const routeContextKey: InjectionKey<Ref<RouteContextType>> = Symbol('routeContext')

export function useRouteContextProvider(props: Ref<RouteContextType>) {
  return provide(routeContextKey, props)
}

export const useRouteContext = () => inject<Ref<RouteContextType>>(routeContextKey, ref({} as RouteContextType))

import type { Ref, InjectionKey } from 'vue';
import type { BreadcrumbProps, WatermarkProps } from 'ant-design-vue';
import type { PureSettings } from '../defaultSettings';
import type { MenuDataItem } from '../typing';
import type { BreadcrumbListReturn } from '../utils/getBreadcrumbProps';
import type { LayoutBreadcrumbProps } from '../proLayoutProps';
import { provide, inject, ref } from 'vue';

export type RouteContextType = {
  breadcrumb?: BreadcrumbListReturn;
  menuData?: MenuDataItem[];
  isMobile?: boolean;
  prefixCls?: string;
  collapsed?: boolean;
  hasSiderMenu?: boolean;
  hasHeader?: boolean;
  siderWidth?: number;
  isChildrenLayout?: boolean;
  hasFooterToolbar?: boolean;
  hasFooter?: boolean;
  hasPageContainer?: number;
  setHasFooterToolbar?: (val: boolean) => void;
  setHasPageContainer?: (val: number) => void;
  pageTitleInfo?: {
    title: string;
    id: string;
    pageName: string;
  };
  matchMenus?: MenuDataItem[];
  matchMenuKeys?: string[];
  currentMenu?: PureSettings & MenuDataItem;
  /** PageHeader 的 BreadcrumbProps 配置，会透传下去 */
  breadcrumbProps?: Omit<BreadcrumbProps, 'itemRender'> & LayoutBreadcrumbProps;
  waterMarkProps?: WatermarkProps;
} & PureSettings;

export const routeContextKey: InjectionKey<Ref<RouteContextType>> = Symbol('routeContext');

export const useRouteContextProvider = (props: Ref<RouteContextType>) =>
  provide(routeContextKey, props);

export const useRouteContextInject = () => inject(routeContextKey, ref({} as RouteContextType));

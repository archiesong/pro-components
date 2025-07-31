import type { VueNode } from 'ant-design-vue/es/_util/type';
import type { SiderMenuProps, PrivateSiderMenuProps } from './components/SiderMenu/SiderMenu';
import type { HeaderViewProps } from './components/Header';
import type { BreadcrumbProps } from 'ant-design-vue';
import type { MenuDataItem, WithFalse } from './typing';
import type { AppListProps } from './components/AppsLogoComponents/typing';
import type { BaseMenuProps } from './components/SiderMenu/BaseMenu';
import type { GetPageTitleProps } from './getPageTitle';
import type { ProLayoutProps } from './proLayoutProps';
import type { FooterToolbarProps } from './components/FooterToolbar';
import type { RouteContextType } from './context/RouteContext';
import type { PageContainerProps } from './components/PageContainer/pageContainerProps';

export type MenuHeaderRender = WithFalse<
  (logo: VueNode, title: VueNode, props?: SiderMenuProps) => VueNode
>;

export type HeaderContentRender = WithFalse<
  (
    props: HeaderViewProps | (PrivateSiderMenuProps & SiderMenuProps),
    defaultDom: VueNode
  ) => VueNode
>;

export type MenuDataRender = (menuData: MenuDataItem[]) => MenuDataItem[];

export type MenuRender = WithFalse<(props: HeaderViewProps, defaultDom: VueNode) => VueNode>;

export type MenuItemRender = WithFalse<
  (
    item: MenuDataItem & {
      isUrl: boolean;
      onClick: () => void;
    },
    defaultDom: VueNode,
    menuProps: BaseMenuProps & Partial<PrivateSiderMenuProps>
  ) => VueNode
>;

export type MenuContentRender = WithFalse<(props: SiderMenuProps, defaultDom: VueNode) => VueNode>;

export type MenuFooterRender = WithFalse<(props?: SiderMenuProps) => VueNode>;

export type MenuExtraRender = WithFalse<(props: SiderMenuProps) => VueNode>;

export type SubMenuItemRender = WithFalse<
  (item: MenuDataItem, defaultDom: VueNode, menuProps: BaseMenuProps) => VueNode
>;

export type ErrorBoundaryRender = WithFalse<(error: Error, info: string) => VueNode>;

export type HeaderRender = WithFalse<(props: HeaderViewProps, defaultDom: VueNode) => VueNode>;

export type AppListRender = WithFalse<(props: AppListProps, defaultDom: VueNode) => VueNode>;

export type FooterRender = WithFalse<
  (
    props: ProLayoutProps & {
      hasSiderMenu?: boolean;
    },
    defaultDom: VueNode
  ) => VueNode
>;
export type BreadcrumbRender = WithFalse<
  (routes: BreadcrumbProps['routes']) => BreadcrumbProps['routes']
>;
export type PageTitleRender = WithFalse<
  (
    props: GetPageTitleProps,
    defaultPageTitle?: string,
    info?: {
      // 页面标题
      title: string;
      // locale 的 title
      id: string;
      // 页面标题不带默认的 title
      pageName: string;
    }
  ) => string
>;
export type ActionsRender = WithFalse<
  (props: HeaderViewProps | (PrivateSiderMenuProps & SiderMenuProps)) => VueNode | VueNode[]
>;

export type CollapsedButtonRender = WithFalse<(collapsed?: boolean, dom?: VueNode) => VueNode>;

export type FooterToolbarContentRender = WithFalse<
  (props: FooterToolbarProps & RouteContextType & { leftWidth?: string }, dom: VueNode) => VueNode
>;

export type PageHeaderRender = WithFalse<(props?: PageContainerProps) => VueNode>;

export type HeaderTitleRender = WithFalse<
  (logo: VueNode, title: VueNode, props: HeaderViewProps) => VueNode
>;

export type TagsViewRender = WithFalse<(props: ProLayoutProps) => VueNode>;

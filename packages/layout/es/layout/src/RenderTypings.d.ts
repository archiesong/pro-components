import { VueNode } from 'ant-design-vue/es/_util/type';
import { SiderMenuProps, PrivateSiderMenuProps } from './components/SiderMenu/SiderMenu';
import { HeaderViewProps } from './components/Header';
import { BreadcrumbProps } from 'ant-design-vue';
import { MenuDataItem, WithFalse } from './typing';
import { AppListProps } from './components/AppsLogoComponents/typing';
import { BaseMenuProps } from './components/SiderMenu/BaseMenu';
import { GetPageTitleProps } from './getPageTitle';
import { ProLayoutProps } from './proLayoutProps';
import { FooterToolbarProps } from './components/FooterToolbar';
import { RouteContextType } from './context/RouteContext';
import { PageContainerProps } from './components/PageContainer/pageContainerProps';
export type MenuHeaderRender = WithFalse<(logo: VueNode, title: VueNode, props?: SiderMenuProps) => VueNode>;
export type HeaderContentRender = WithFalse<(props: HeaderViewProps | (PrivateSiderMenuProps & SiderMenuProps), defaultDom: VueNode) => VueNode>;
export type MenuDataRender = (menuData: MenuDataItem[]) => MenuDataItem[];
export type MenuRender = WithFalse<(props: HeaderViewProps, defaultDom: VueNode) => VueNode>;
export type MenuItemRender = WithFalse<(item: MenuDataItem & {
    isUrl: boolean;
    onClick: () => void;
}, defaultDom: VueNode, menuProps: BaseMenuProps & Partial<PrivateSiderMenuProps>) => VueNode>;
export type MenuContentRender = WithFalse<(props: SiderMenuProps, defaultDom: VueNode) => VueNode>;
export type MenuFooterRender = WithFalse<(props?: SiderMenuProps) => VueNode>;
export type MenuExtraRender = WithFalse<(props: SiderMenuProps) => VueNode>;
export type SubMenuItemRender = WithFalse<(item: MenuDataItem, defaultDom: VueNode, menuProps: BaseMenuProps) => VueNode>;
export type ErrorBoundaryRender = WithFalse<(error: Error, info: string) => VueNode>;
export type HeaderRender = WithFalse<(props: HeaderViewProps, defaultDom: VueNode) => VueNode>;
export type AppListRender = WithFalse<(props: AppListProps, defaultDom: VueNode) => VueNode>;
export type FooterRender = WithFalse<(props: ProLayoutProps & {
    hasSiderMenu?: boolean;
}, defaultDom: VueNode) => VueNode>;
export type BreadcrumbRender = WithFalse<(routes: BreadcrumbProps['routes']) => BreadcrumbProps['routes']>;
export type PageTitleRender = WithFalse<(props: GetPageTitleProps, defaultPageTitle?: string, info?: {
    title: string;
    id: string;
    pageName: string;
}) => string>;
export type ActionsRender = WithFalse<(props: HeaderViewProps | (PrivateSiderMenuProps & SiderMenuProps)) => VueNode | VueNode[]>;
export type CollapsedButtonRender = WithFalse<(collapsed?: boolean, dom?: VueNode) => VueNode>;
export type FooterToolbarContentRender = WithFalse<(props: FooterToolbarProps & RouteContextType & {
    leftWidth?: string;
}, dom: VueNode) => VueNode>;
export type PageHeaderRender = WithFalse<(props?: PageContainerProps) => VueNode>;
export type HeaderTitleRender = WithFalse<(logo: VueNode, title: VueNode, props: HeaderViewProps) => VueNode>;
export type TagsViewRender = WithFalse<(props: ProLayoutProps) => VueNode>;

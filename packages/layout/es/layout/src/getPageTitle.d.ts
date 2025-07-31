import { PureSettings } from './defaultSettings';
import { MenuDataItem } from './typing';
type BreadcrumbItem = Omit<MenuDataItem, 'children' | 'routes'> & {
    children?: BreadcrumbItem;
};
export declare const matchParamsPath: (path: string, breadcrumb?: Record<string, BreadcrumbItem>, breadcrumbMap?: Map<string, BreadcrumbItem>) => BreadcrumbItem;
export type GetPageTitleProps = {
    pathname?: string;
    breadcrumb?: Record<string, BreadcrumbItem>;
    breadcrumbMap?: Map<string, BreadcrumbItem>;
    menu?: PureSettings['menu'];
    title?: PureSettings['title'];
    pageName?: string;
    formatMessage?: (data: {
        id: string;
        defaultMessage?: string;
    }) => string;
};
/**
 * 获取关于 pageTitle 的所有信息方便包装
 *
 * @param props
 * @param ignoreTitle
 */
export declare const getPageTitleInfo: (props: GetPageTitleProps, ignoreTitle?: boolean) => {
    title: string;
    id: string;
    pageName: string;
};
export declare const getPageTitle: (props: GetPageTitleProps, ignoreTitle?: boolean) => string;
export {};

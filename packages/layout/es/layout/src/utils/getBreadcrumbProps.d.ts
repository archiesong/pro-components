import { BreadcrumbProps as AntdBreadcrumbProps } from 'ant-design-vue';
import { PureSettings } from '../defaultSettings';
import { ProLayoutProps } from '../proLayoutProps';
import { default as H } from 'history';
import { MenuDataItem, MessageDescriptor, WithFalse } from '../typing';
export declare function urlToList(url?: string): string[];
export declare const getVersion: () => string;
export type BreadcrumbProLayoutProps = {
    home?: string;
    location?: H.Location | {
        pathname?: string;
    };
    menu?: PureSettings['menu'];
    breadcrumbMap?: Map<string, MenuDataItem>;
    formatMessage?: (message: MessageDescriptor) => string;
    breadcrumbRender?: WithFalse<(routes: AntdBreadcrumbProps['routes']) => AntdBreadcrumbProps['routes']>;
    itemRender?: AntdBreadcrumbProps['itemRender'];
};
export declare const getBreadcrumb: (breadcrumbMap: Map<string, MenuDataItem>, url: string) => MenuDataItem;
export declare const getBreadcrumbFromProps: (props: BreadcrumbProLayoutProps) => {
    location: BreadcrumbProLayoutProps["location"];
    breadcrumbMap: BreadcrumbProLayoutProps["breadcrumbMap"];
};
export type BreadcrumbListReturn = Pick<AntdBreadcrumbProps, Extract<keyof AntdBreadcrumbProps, 'routes' | 'itemRender'>>;
/** 将参数转化为面包屑 Convert parameters into breadcrumbs */
export declare const genBreadcrumbProps: (props: BreadcrumbProLayoutProps) => AntdBreadcrumbProps["routes"];
export declare const getBreadcrumbProps: (props: Omit<BreadcrumbProLayoutProps, "breadcrumbRender"> & {
    breadcrumbRender?: WithFalse<(routes: AntdBreadcrumbProps["routes"]) => AntdBreadcrumbProps["routes"]>;
}, layoutProps: ProLayoutProps) => BreadcrumbListReturn;

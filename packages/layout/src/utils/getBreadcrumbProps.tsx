import type { BreadcrumbProps as AntdBreadcrumbProps } from 'ant-design-vue';
import type { PureSettings } from '../defaultSettings';
import type { ProLayoutProps } from '../proLayoutProps';
import type H from 'history';
import type { Route } from 'ant-design-vue/es/breadcrumb/Breadcrumb';
import type { MenuDataItem, MessageDescriptor, WithFalse } from '../typing';
import { h, resolveComponent } from 'vue';
import { version } from 'ant-design-vue';
import { match } from 'path-to-regexp';
export function urlToList(url?: string): string[] {
  if (!url || url === '/') {
    return ['/'];
  }
  const urlList = url.split('/').filter((i) => i);
  return ['/'].concat(urlList.map((_, index) => `/${urlList.slice(0, index + 1).join('/')}`));
}
export const getVersion = () => {
  if (typeof process === 'undefined') return version;
  return process?.env?.ANTD_VERSION || version;
};


export type BreadcrumbProLayoutProps = {
  home?: string;
  location?:
    | H.Location
    | {
        pathname?: string;
      };
  menu?: PureSettings['menu'];
  breadcrumbMap?: Map<string, MenuDataItem>;
  formatMessage?: (message: MessageDescriptor) => string;
  breadcrumbRender?: WithFalse<
    (routes: AntdBreadcrumbProps['routes']) => AntdBreadcrumbProps['routes']
  >;
  itemRender?: AntdBreadcrumbProps['itemRender'];
};

// 渲染 Breadcrumb 子节点
// Render the Breadcrumb child node
const defaultItemRender: AntdBreadcrumbProps['itemRender'] = ({ route,routes }) => {
  const { breadcrumbName, path } = route;
  const last = routes.findIndex((i) => i.path === route.path) === routes.length - 1;
  return last ? (
    <span>{breadcrumbName}</span>
  ) : (
    h(resolveComponent('RouterLink'), { to: path }, () => breadcrumbName)
  );
};

const renderItemLocal = ({ meta }: MenuDataItem, props: BreadcrumbProLayoutProps): string => {
  const { formatMessage, menu } = props;
  if (meta?.locale && formatMessage && menu?.locale !== false) {
    return formatMessage({ id: meta.locale, defaultMessage: meta.title });
  }
  return meta?.title as string;
};

export const getBreadcrumb = (
  breadcrumbMap: Map<string, MenuDataItem>,
  url: string
): MenuDataItem => {
  let breadcrumbItem = breadcrumbMap.get(url);
  if (!breadcrumbItem) {
    // Find the first matching path in the order defined by route config
    // 按照 route config 定义的顺序找到第一个匹配的路径
    const keys: string[] = Array.from(breadcrumbMap.keys()) || [];
    const targetPath = keys.find((path) =>{
      try {
        if (path?.startsWith('http')) return false;
        return match(path.replace('?', ''))(url);
      } catch (error) {
        console.log('path', path, error);
        return false;
      }
    }
    );
    if (targetPath) breadcrumbItem = breadcrumbMap.get(targetPath);
  }
  return breadcrumbItem || { path: '' };
};

export const getBreadcrumbFromProps = (
  props: BreadcrumbProLayoutProps
): {
  location: BreadcrumbProLayoutProps['location'];
  breadcrumbMap: BreadcrumbProLayoutProps['breadcrumbMap'];
} => {
  const { location, breadcrumbMap } = props;
  return {
    location,
    breadcrumbMap,
  };
};

const conversionFromRoute = (
  location: BreadcrumbProLayoutProps['location'],
  breadcrumbMap: Map<string, MenuDataItem>,
  props: BreadcrumbProLayoutProps
): AntdBreadcrumbProps['routes'] => {
  const pathSnippets = urlToList(location?.pathname);
  let baseUrl = ''
  if(window.location.pathname.endsWith(location?.pathname || '')) {
    baseUrl = window.location.pathname.replace(location?.pathname || '', '')
  }
  const extraBreadcrumbItems: AntdBreadcrumbProps['routes'] = pathSnippets
    .map((url) => {
      const currentBreadcrumb = getBreadcrumb(breadcrumbMap, url);

      const breadcrumbName = renderItemLocal(currentBreadcrumb, props);
      const { meta } = currentBreadcrumb;
      return breadcrumbName && !meta?.hideInBreadcrumb
        ? {
          path: baseUrl + url,
          breadcrumbName,
        }
        : { path: '', breadcrumbName };
    })
    .filter((item) => item && item.path);
  return extraBreadcrumbItems;
};
export type BreadcrumbListReturn = Pick<
  AntdBreadcrumbProps,
  Extract<keyof AntdBreadcrumbProps, 'routes' | 'itemRender'>
>;

/** 将参数转化为面包屑 Convert parameters into breadcrumbs */
export const genBreadcrumbProps = (
  props: BreadcrumbProLayoutProps
): AntdBreadcrumbProps['routes'] => {
  const { location, breadcrumbMap } = getBreadcrumbFromProps(props);
  // 根据 route 生成 面包屑
  // Generate breadcrumbs based on route
  if (location && location.pathname && breadcrumbMap) {
    return conversionFromRoute(location, breadcrumbMap, props);
  }
  return [];
};

// 声明一个导出函数，接收两个参数：BreadcrumbProps和ProLayoutProps，返回一个BreadcrumbListReturn类型的对象
export const getBreadcrumbProps = (
  // BreadcrumbProps类型的props
  props: Omit<BreadcrumbProLayoutProps, 'breadcrumbRender'> & {
    breadcrumbRender?: WithFalse<
      (routes: AntdBreadcrumbProps['routes']) => AntdBreadcrumbProps['routes']
    >;
  },
  layoutProps: ProLayoutProps // ProLayoutProps类型的layoutProps
): BreadcrumbListReturn => {
  // 解构赋值获取props中的breadcrumbRender和props中的itemRender，如果props中没有itemRender则使用默认的defaultItemRender函数
  const { breadcrumbRender, itemRender: propsItemRender } = props;
  // 解构赋值获取layoutPros.breadcrumbProps.minLenght的值，如果没有设置，则默认为2
  const { minLength = 2 } = layoutProps.breadcrumbProps || {};
  // 生成面包屑的路由数组，该数组中包含菜单项和面包屑项
  const routesArray = genBreadcrumbProps(props);
  // 如果props中有itemRender，则使用props中的itemRender，否则使用默认函数defaultItemRender
  const itemRender: AntdBreadcrumbProps['itemRender'] = ({ route, ...rest }) => {
    const renderFunction = propsItemRender || defaultItemRender;
    return renderFunction?.({
      route,
      ...rest,
    });
  };
  let routes = routesArray as Route[] | undefined;

  // 如果面包屑渲染函数breadcrumbRender存在，则使用其渲染数组routes
  if (breadcrumbRender) {
    routes = breadcrumbRender(routes || []) || undefined;
  }
  // 如果routes（渲染后的数组）的长度小于minLength或者breadcrumbRender为false，则routes为undefined
  if ((routes && routes.length < minLength) || breadcrumbRender === false) {
    routes = undefined;
  }

  return {
    routes,
    itemRender,
  };
};

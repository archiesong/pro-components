import { pathToRegexp } from 'path-to-regexp';
import type { PureSettings } from './defaultSettings';
import type { MenuDataItem, MetaRecord } from './typing';

type BreadcrumbItem = Omit<MenuDataItem, 'children' | 'routes'> & {
  children?: BreadcrumbItem;
};

export const matchParamsPath = (
  path: string,
  breadcrumb?: Record<string, BreadcrumbItem>,
  breadcrumbMap?: Map<string, BreadcrumbItem>
): BreadcrumbItem => {
  // Internal logic use breadcrumbMap to ensure the order
  // 内部逻辑使用 breadcrumbMap 来确保查询顺序
  if (breadcrumbMap) {
    const pathKey = [...breadcrumbMap.keys()].find((key) => pathToRegexp(key).regexp.test(path));
    if (pathKey) {
      return breadcrumbMap.get(pathKey) as BreadcrumbItem;
    }
  }

  // External uses use breadcrumb
  // 外部用户使用 breadcrumb 参数
  if (breadcrumb) {
    const pathKey = Object.keys(breadcrumb).find((key) => pathToRegexp(key).regexp.test(path));
    if (pathKey) {
      return breadcrumb[pathKey];
    }
  }
  return {
    path: '',
  };
};

export type GetPageTitleProps = {
  pathname?: string;
  breadcrumb?: Record<string, BreadcrumbItem>;
  breadcrumbMap?: Map<string, BreadcrumbItem>;
  menu?: PureSettings['menu'];
  title?: PureSettings['title'];
  pageName?: string;
  formatMessage?: (data: { id: string; defaultMessage?: string }) => string;
};

/**
 * 获取关于 pageTitle 的所有信息方便包装
 *
 * @param props
 * @param ignoreTitle
 */
export const getPageTitleInfo = (
  props: GetPageTitleProps,
  ignoreTitle?: boolean
): {
  // 页面标题
  title: string;
  // locale 的 title
  id: string;
  // 页面标题不带默认的 title
  pageName: string;
} => {
  const {
    pathname = '/',
    breadcrumb,
    breadcrumbMap,
    formatMessage,
    title,
    menu = {
      locale: false,
    },
  } = props;
  const pageTitle = ignoreTitle ? '' : title || '';
  const currRouterData = matchParamsPath(pathname, breadcrumb, breadcrumbMap) as BreadcrumbItem;
  if (!currRouterData || !(currRouterData.meta as MetaRecord)) {
    return {
      title: pageTitle,
      id: '',
      pageName: pageTitle,
    };
  }
  let pageName = (currRouterData.meta as MetaRecord).title;

  if (menu.locale !== false && (currRouterData.meta as MetaRecord).locale && formatMessage) {
    pageName = formatMessage({
      id: (currRouterData.meta as MetaRecord).locale || '',
      defaultMessage: (currRouterData.meta as MetaRecord).title,
    });
  }

  if (!pageName) {
    return {
      title: pageTitle,
      id: (currRouterData.meta as MetaRecord).locale || '',
      pageName: pageTitle,
    };
  }
  if (ignoreTitle || !title) {
    return {
      title: pageName,
      id: (currRouterData.meta as MetaRecord).locale || '',
      pageName,
    };
  }

  return {
    title: `${pageName} - ${title}`,
    id: (currRouterData.meta as MetaRecord).locale || '',
    pageName,
  };
};

export const getPageTitle = (props: GetPageTitleProps, ignoreTitle?: boolean) => {
  const { title } = getPageTitleInfo(props, ignoreTitle);
  return title;
};

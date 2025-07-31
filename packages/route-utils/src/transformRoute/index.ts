import sha265 from '../sha265';
import type { MessageDescriptor, MenuDataItem } from '../typing';
import { pathToRegexp } from '../path-to-regexp';
interface FormatterProps {
  data: MenuDataItem[];
  locale?: boolean;
  formatMessage?: (data: { id: string; defaultMessage?: string }) => string;
  parentTitle?: string;
  [key: string]: any;
}
export function stripQueryStringAndHashFromPath(url: string) {
  return url.split('?')[0].split('#')[0];
}
export const isUrl = (path: string): boolean => {
  if (!path.startsWith('http')) {
    return false;
  }
  try {
    const url = new URL(path);
    return !!url;
  } catch (error) {
    return false;
  }
};

export const getKeyByPath = (item: MenuDataItem) => {
  const { path } = item;
  if (!path || path === '/') {
    // 如果还是没有，用对象的hash 生成一个
    try {
      return `/${sha265(JSON.stringify(item))}`;
    } catch (error) {
      console.log(error);
      // do something
    }
  }

  return path ? stripQueryStringAndHashFromPath(path) : path;
};

/**
 * 如果不是 / 开头的和父节点做一下合并
 * 如果是 / 开头的不作任何处理
 * 如果是 url 也直接返回
 * @param path
 * @param parentPath
 */
const mergePath = (path = '', parentPath = '/') => {
  if ((path || parentPath).startsWith('/')) {
    return path;
  }

  if (isUrl(path)) {
    return path;
  }
  return `/${parentPath}/${path}`.replace(/\/\//g, '/').replace(/\/\//g, '/');
};
/**
 * 获取locale，增加了一个功能，如果 locale = false，将不使用国际化
 * @param item
 * @param parentTitle
 */
const getItemLocaleName = (item: MenuDataItem, parentTitle: string): string | false => {
  const { meta } = item;
  // 如果配置了 locale 并且 locale 为 false或 ""
  if (('locale' in meta! && meta?.locale === false) || !meta?.title) {
    return false;
  }
  return item.meta?.locale || `${parentTitle}.${meta?.title.toString().toLowerCase()}`;
};
const notNullArray = (value: any) => Array.isArray(value) && value.length > 0;

/**
 *
 * @param props
 * @param parent
 */
const formatter = (
  props: FormatterProps,
  parent: Partial<MenuDataItem> = { path: '/' }
): MenuDataItem[] => {
  const { data, formatMessage, parentTitle, locale: menuLocale } = props;
  if (!data || !Array.isArray(data)) {
    return [];
  }
  return data
    .filter((item) => {
      if (!item) return false;
      if (notNullArray(item.children)) return true;
      if (item.path) return true;
      // 重定向
      if (item.redirect) return false;
      return false;
    })
    .map((item = { path: '/' }) => {
      const routerChildren = item.children || [];
      const path = mergePath(item.path, parent ? parent.path : '/');
      const { title } = item.meta!;
      const locale = getItemLocaleName(item, parentTitle || 'menu');

      // if enableMenuLocale use item.meta.title,
      // close menu international
      const localeTitle =
        locale !== false && menuLocale !== false && formatMessage && locale
          ? formatMessage({ id: locale, defaultMessage: title })
          : title;

      const { children, meta, redirect, ...restParent } = parent;

      let finallyItem: MenuDataItem = {
        ...restParent,
        ...item,
        meta: {
          ...item.meta,
          pro_layout_parentKeys: [],
          locale,
        },
        key: item.key || getKeyByPath({ ...item, path }),
        path,
      };
      if (meta) {
        const { flatMenu, pro_layout_parentKeys = [], icon, ...restParentMeta } = meta;
        const item_pro_layout_parentKeys = new Set([
          ...pro_layout_parentKeys,
          ...(item.meta?.parentKeys || []),
        ]);
        if (parent.key) {
          item_pro_layout_parentKeys.add(parent.key);
        }
        finallyItem = {
          ...restParent,
          ...item,
          meta: {
            ...restParentMeta,
            ...item.meta,
            pro_layout_parentKeys: Array.from(item_pro_layout_parentKeys).filter(
              (key) => key && key !== '/'
            ),
            locale,
          },
          key: item.key || getKeyByPath({ ...item, path }),
          path,
        };
      }

      if (finallyItem.meta) {
        if (localeTitle) {
          finallyItem.meta.title = localeTitle;
        } else {
          delete finallyItem.meta.title;
        }
      }

      if (notNullArray(routerChildren)) {
        const formatterChildren = formatter(
          {
            ...props,
            data: routerChildren,
            parentTitle: locale || '',
          },
          finallyItem
        );
        if (notNullArray(formatterChildren)) {
          finallyItem.children = formatterChildren;
        }
      }
      return bigfishConversions(finallyItem, props);
    })
    .flat(1);
};
// 重要的转换
const bigfishConversions = (route: MenuDataItem, props: FormatterProps) => {
  const childrenList = route.children || [];
  const result = {
    ...route,
  } as MenuDataItem;
  if (childrenList && childrenList.length) {
    /** 在菜单中隐藏子项 */
    if (result.meta?.hideChildren) {
      delete result.children;
      return result;
    }
    // 需要重新进行一次
    const finalChildren = formatter(
      {
        ...props,
        data: childrenList,
      },
      route
    );
    /** 在菜单中只隐藏此项，子项往上提，仍旧展示 */
    if (result.meta?.flatMenu) {
      return finalChildren;
    }
  }
  return result;
};

/**
 * 删除 hideInMenu 和 title 不存在的
 */
const filterMenuData = (menuData: MenuDataItem[] = []): MenuDataItem[] => {
  return menuData
    .filter(
      (item: MenuDataItem) =>
        (item && item.meta && item.meta.title && !item.meta.hideInMenu) ||
        notNullArray(item.children)
    )
    .map((item: MenuDataItem) => {
      const newItem = { ...item };
      const routerChildren = newItem.children || [];
      if (
        notNullArray(routerChildren) &&
        newItem.meta &&
        !newItem.meta.hideChildrenInMenu &&
        routerChildren.some((child: MenuDataItem) => child && child.meta && !!child.meta.title)
      ) {
        const newChildren = filterMenuData(routerChildren);
        if (newChildren.length)
          return {
            ...newItem,
            children: newChildren,
          };
      }
      return { ...item };
    })
    .filter((item) => item);
};

/**
 * support pathToRegexp get string
 */
class RouteListMap<V> extends Map<string, V> {
  get(pathname: string) {
    let routeValue;
    try {
      for (const [key, value] of this.entries()) {
        const path = stripQueryStringAndHashFromPath(key);
        if (!isUrl(key as string) && pathToRegexp(path, []).test(pathname)) {
          routeValue = value;
          break;
        }
      }
    } catch (error) {
      routeValue = undefined;
    }

    return routeValue;
  }
}

/**
 * 获取面包屑映射
 * @param MenuDataItem[] menuData 菜单配置
 */
const getBreadcrumbNameMap = (menuData: MenuDataItem[]): RouteListMap<MenuDataItem> => {
  // Map is used to ensure the order of keys
  const routerMap = new RouteListMap<MenuDataItem>();
  const flattenMenuData = (data: MenuDataItem[], parent?: MenuDataItem) => {
    data.forEach((menuItem) => {
      const routerChildren = menuItem.children || [];
      if (notNullArray(routerChildren)) {
        flattenMenuData(routerChildren, menuItem);
      }
      // Reduce memory usage
      const path = mergePath(menuItem.path, parent ? parent.path : '/');
      if (!isUrl(path)) {
        routerMap.set(stripQueryStringAndHashFromPath(path), menuItem);
      }
    });
  };
  flattenMenuData(menuData);
  return routerMap;
};

/**
 * @param routeList 路由配置
 * @param locale 是否使用国际化
 * @param formatMessage 国际化的程序
 * @returns { breadcrumb, menuData}
 */
const transformRoute = (
  routeList: MenuDataItem[],
  locale?: boolean,
  formatMessage?: (message: MessageDescriptor) => string
): {
  breadcrumb: Map<string, MenuDataItem>;
  menuData: MenuDataItem[];
} => {
  const originalMenuData = formatter({
    data: routeList,
    formatMessage,
    locale,
  });
  const menuData = filterMenuData(originalMenuData);
  const breadcrumb = getBreadcrumbNameMap(originalMenuData);

  return { breadcrumb, menuData };
};

export default transformRoute;

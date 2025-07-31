import type { MenuDataItem, MessageDescriptor } from '../typing';
import { transformRoute } from '@ant-design-vue/route-utils';

function fromEntries(iterable: Map<string, MenuDataItem>) {
  return [...iterable].reduce((obj: Record<string, MenuDataItem>, [key, val]) => {
    obj[key] = val;
    return obj;
  }, {});
}
const getMenuData = (
  routes: MenuDataItem[],
  menu?: { locale?: boolean },
  formatMessage?: (message: MessageDescriptor) => string,
  menuDataRender?: (menuData: MenuDataItem[]) => MenuDataItem[]
) => {
  const childrenRoute = routes.find((route) => route.path === '/');
  const { menuData, breadcrumb } = transformRoute(
    childrenRoute?.children || [],
    menu?.locale || false,
    formatMessage
  );
  if (!breadcrumb.get(childrenRoute?.path || '/')) {
    breadcrumb.set(childrenRoute?.path || '/', {
      key: childrenRoute?.path || '/',
      ...(childrenRoute || {}),
      meta: {
        ...(childrenRoute?.meta || {}),
        locale: childrenRoute?.meta?.locale || `menu.${childrenRoute?.meta?.title}`,
      },
    } as MenuDataItem);
  }
  if (!menuDataRender) {
    return {
      breadcrumb: fromEntries(breadcrumb),
      breadcrumbMap: breadcrumb,
      menuData,
    };
  }
  return getMenuData(menuDataRender(menuData), menu, formatMessage, undefined);
};
export default getMenuData;

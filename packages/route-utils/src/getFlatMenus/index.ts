import type { MenuDataItem } from '../typing';
import { stripQueryStringAndHashFromPath } from '../transformRoute';

/**
 * 获取打平的 menuData
 * 以 path 为 key
 * @param menuData
 */
const getFlatMenus = (menuData: MenuDataItem[] = []): Record<string, MenuDataItem> => {
  let menus: Record<string, MenuDataItem> = {};
  menuData.forEach((mapItem) => {
    const item = { ...mapItem };
    if (!item || !item.key) {
      return;
    }
    const routerChildren = item.children || [];
    menus[stripQueryStringAndHashFromPath(item.path || item.key || '/')] = {
      ...item,
    };
    menus[item.key || item.path || '/'] = { ...item };

    if (routerChildren.length) {
      menus = { ...menus, ...getFlatMenus(routerChildren) };
    }
  });
  return menus;
};
export default getFlatMenus;

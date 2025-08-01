import type { MenuDataItem } from '../typing';
import { pathToRegexp } from '../path-to-regexp';
import getFlatMenu from '../getFlatMenus';
import { stripQueryStringAndHashFromPath, isUrl } from '../transformRoute';

export const getMenuMatches = (
  flatMenuKeys: string[] = [],
  path: string,
  exact?: boolean
): string[] | undefined =>
  flatMenuKeys
    .filter((item) => {
      if (item === '/' && path === '/') {
        return true;
      }
      if (item !== '/' && item !== '/*' && item && !isUrl(item)) {
        const pathKey = stripQueryStringAndHashFromPath(item);
        try {
          // exact
          if (exact) {
            if (pathToRegexp(`${pathKey}`).test(path)) {
              return true;
            }
          }
          // /a
          if (pathToRegexp(`${pathKey}`, []).test(path)) {
            return true;
          }
          // /a/b/b
          if (pathToRegexp(`${pathKey}/(.*)`).test(path)) {
            return true;
          }
        } catch (error) {
          console.log(error, path);
        }
      }
      return false;
    })
    .sort((a, b) => {
      // 如果完全匹配放到最后面
      if (a === path) {
        return 10;
      }
      if (b === path) {
        return -10;
      }
      return a.substring(1).split('/').length - b.substring(1).split('/').length;
    });
/**
 * 获取当前的选中菜单列表
 * @param pathname
 * @param menuData
 * @param fullKeys
 * @param exact
 * @returns MenuDataItem[]
 */
const getMatchMenu = (
  pathname: string,
  menuData: MenuDataItem[],
  /**
   * 要不要展示全部的 key
   */
  fullKeys?: boolean,
  exact?: boolean
): MenuDataItem[] => {
  const flatMenus = getFlatMenu(menuData);
  const flatMenuKeys = Object.keys(flatMenus);
  let menuPathKeys = getMenuMatches(flatMenuKeys, pathname || '/', exact);

  if (!menuPathKeys || menuPathKeys.length < 1) {
    return [];
  }
  if (!fullKeys) {
    menuPathKeys = [menuPathKeys[menuPathKeys.length - 1]];
  }
  return menuPathKeys
    .map((menuPathKey) => {
      const menuItem = flatMenus[menuPathKey] || {
        meta: {
          pro_layout_parentKeys: '',
        },
        key: '',
      };

      // 去重
      const map = new Map<string, boolean>();
      const parentItems = (menuItem.meta?.pro_layout_parentKeys || [])
        .map((key: string) => {
          if (map.has(key)) {
            return null;
          }
          map.set(key, true);
          return flatMenus[key];
        })
        .filter((item) => item) as MenuDataItem[];

      if (menuItem.key) {
        parentItems.push(menuItem);
      }

      return parentItems;
    })
    .flat(1);
};
export default getMatchMenu;

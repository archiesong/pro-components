import type { MenuDataItem } from '../typing';

export const getOpenKeysFromMenuData = (menuData?: MenuDataItem[]) => {
  return (menuData || []).reduce((pre, item) => {
    if (item.key) {
      pre.push(item.key);
    }
    if (item.children) {
      const newArray = pre.concat(getOpenKeysFromMenuData(item.children) || []) as string[];
      return [...newArray];
    }
    return pre;
  }, [] as string[]);
};

export const themeConfig = {
  techBlue: '#1677FF',
  daybreak: '#1890FF',
  dust: '#F5222D',
  volcano: '#FA541C',
  sunset: '#FAAD14',
  cyan: '#13C2C2',
  green: '#52C41A',
  geekblue: '#2F54EB',
  purple: '#722ED1',
};
/**
 * Daybreak-> #1890ff
 *
 * @param val
 */
export function genStringToTheme(val?: keyof typeof themeConfig): string {
  return val && themeConfig[val as 'techBlue'] ? themeConfig[val as 'techBlue'] : val || '';
}

export const clearMenuItem = (menusData: MenuDataItem[]): MenuDataItem[] =>
  menusData
    .map((item) => {
      const children: MenuDataItem[] = item.children || [];
      const finalItem = { ...item };
      if (!finalItem.meta?.title || finalItem.meta?.hideInMenu) {
        return null;
      }
      if (finalItem && finalItem?.children) {
        if (
          !finalItem.meta?.hideChildrenInMenu &&
          children.some((child) => child.meta?.title && !child.meta?.hideInMenu)
        ) {
          return {
            ...item,
            children: clearMenuItem(children),
          };
        }
        // children 为空就直接删掉
        Reflect.deleteProperty(finalItem, 'children');
      }
      return finalItem;
    })
    .filter((item) => item) as MenuDataItem[];

/**
 * Creates an object composed of the picked object properties.
 * @param obj The source object
 * @param paths The property paths to pick
 */
export function pick<T, K extends keyof T>(obj: T, paths: K[]): Pick<T, K> {
  return {
    ...paths.reduce((mem, key) => ({ ...mem, [key]: obj[key] }), {}),
  } as Pick<T, K>;
}

import { MenuDataItem } from '../typing';
export declare const getOpenKeysFromMenuData: (menuData?: MenuDataItem[]) => string[];
export declare const themeConfig: {
    techBlue: string;
    daybreak: string;
    dust: string;
    volcano: string;
    sunset: string;
    cyan: string;
    green: string;
    geekblue: string;
    purple: string;
};
/**
 * Daybreak-> #1890ff
 *
 * @param val
 */
export declare function genStringToTheme(val?: keyof typeof themeConfig): string;
export declare const clearMenuItem: (menusData: MenuDataItem[]) => MenuDataItem[];
/**
 * Creates an object composed of the picked object properties.
 * @param obj The source object
 * @param paths The property paths to pick
 */
export declare function pick<T, K extends keyof T>(obj: T, paths: K[]): Pick<T, K>;

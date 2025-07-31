import { MenuDataItem, MessageDescriptor } from '../typing';
declare const getMenuData: (routes: MenuDataItem[], menu?: {
    locale?: boolean;
}, formatMessage?: (message: MessageDescriptor) => string, menuDataRender?: (menuData: MenuDataItem[]) => MenuDataItem[]) => {
    breadcrumb: Record<string, MenuDataItem>;
    breadcrumbMap: Map<string, import('@ant-design-vue/route-utils').MenuDataItem>;
    menuData: import('@ant-design-vue/route-utils').MenuDataItem[];
};
export default getMenuData;

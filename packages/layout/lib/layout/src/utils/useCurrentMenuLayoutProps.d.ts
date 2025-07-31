import { Ref } from 'vue';
import { ProSettings } from '../defaultSettings';
import { MenuDataItem } from '../typing';
declare const useCurrentMenuLayoutProps: (currentMenu: Ref<MenuDataItem & {
    meta: Pick<MenuDataItem, "meta"> & ProSettings;
}>) => Ref<Pick<ProSettings, "layout" | "navTheme" | "fixedSiderbar" | "menuHeaderRender" | "headerRender" | "menuRender" | "footerRender">, Pick<ProSettings, "layout" | "navTheme" | "fixedSiderbar" | "menuHeaderRender" | "headerRender" | "menuRender" | "footerRender">>;
export default useCurrentMenuLayoutProps;

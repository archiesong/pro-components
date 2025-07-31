import type { Ref } from 'vue';
import type { ProSettings } from '../defaultSettings';
import type { MenuDataItem } from '../typing';
import { omitUndefined, useEffect, useState } from '@ant-design-vue/pro-utils';
const useCurrentMenuLayoutProps = (
  currentMenu: Ref<
    MenuDataItem & {
      meta: Pick<MenuDataItem, 'meta'> & ProSettings;
    }
  >
) => {
  const [currentMenuLayoutProps, setCurrentMenuLayoutProps] = useState<
    Pick<
      ProSettings,
      | 'layout'
      | 'navTheme'
      | 'menuRender'
      | 'footerRender'
      | 'fixedSiderbar'
      | 'headerRender'
      | 'menuHeaderRender'
    >
  >({});
  useEffect(() => {
    setCurrentMenuLayoutProps(
      omitUndefined({
        layout:
          typeof (currentMenu.value.meta || {}).layout !== 'object'
            ? (currentMenu.value.meta || {}).layout
            : undefined,
        navTheme: (currentMenu.value.meta || {}).navTheme,
        menuRender: (currentMenu.value.meta || {}).menuRender,
        footerRender: (currentMenu.value.meta || {}).footerRender,
        menuHeaderRender: (currentMenu.value.meta || {}).menuHeaderRender,
        headerRender: (currentMenu.value.meta || {}).headerRender,
        fixedSiderbar: (currentMenu.value.meta || {}).fixedSiderbar,
      })
    );
  }, [
    () => (currentMenu.value.meta || {}).layout,
    () => (currentMenu.value.meta || {}).navTheme,
    () => (currentMenu.value.meta || {}).menuRender,
    () => (currentMenu.value.meta || {}).footerRender,
    () => (currentMenu.value.meta || {}).menuHeaderRender,
    () => (currentMenu.value.meta || {}).headerRender,
    () => (currentMenu.value.meta || {}).fixedSiderbar,
  ]);
  return currentMenuLayoutProps;
};

export default useCurrentMenuLayoutProps;

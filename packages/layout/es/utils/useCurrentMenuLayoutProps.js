import { useState as m, useEffect as t, omitUndefined as o } from "@ant-design-vue/pro-utils";
const v = (e) => {
  const [a, d] = m({});
  return t(() => {
    d(
      o({
        layout: typeof (e.value.meta || {}).layout != "object" ? (e.value.meta || {}).layout : void 0,
        navTheme: (e.value.meta || {}).navTheme,
        menuRender: (e.value.meta || {}).menuRender,
        footerRender: (e.value.meta || {}).footerRender,
        menuHeaderRender: (e.value.meta || {}).menuHeaderRender,
        headerRender: (e.value.meta || {}).headerRender,
        fixedSiderbar: (e.value.meta || {}).fixedSiderbar
      })
    );
  }, [
    () => (e.value.meta || {}).layout,
    () => (e.value.meta || {}).navTheme,
    () => (e.value.meta || {}).menuRender,
    () => (e.value.meta || {}).footerRender,
    () => (e.value.meta || {}).menuHeaderRender,
    () => (e.value.meta || {}).headerRender,
    () => (e.value.meta || {}).fixedSiderbar
  ]), a;
};
export {
  v as default
};

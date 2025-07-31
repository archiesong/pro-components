import { useStyle as t } from "@ant-design-vue/pro-provider";
function c(r, {
  stylish: e,
  proLayoutCollapsedWidth: u
}) {
  return t("ProLayoutSiderMenuStylish", (o) => {
    const n = {
      ...o,
      componentCls: `.${r.value}`,
      proLayoutCollapsedWidth: u
    };
    return e ? [
      {
        [`${o.proComponentsCls}-basicLayout`]: {
          [`${n.componentCls}`]: e == null ? void 0 : e(n)
        }
      }
    ] : [];
  });
}
export {
  c as useStylish
};

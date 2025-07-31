import { useStyle as t } from "@ant-design-vue/pro-provider";
function c(n, {
  stylish: o
}) {
  return t("ProLayoutFooterToolbarStylish", (u) => {
    var r;
    const e = {
      ...u,
      componentCls: `.${n.value}`
    };
    return o != null && o.value ? [
      {
        [`${e.componentCls}`]: (r = o.value) == null ? void 0 : r.call(o, e)
      }
    ] : [];
  });
}
export {
  c as useStylish
};

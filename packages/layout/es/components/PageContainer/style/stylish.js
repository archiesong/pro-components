import { useStyle as a } from "@ant-design-vue/pro-provider";
function c(r, {
  stylish: e
}) {
  return a("ProLayoutPageContainerStylish", (u) => {
    var o;
    const n = {
      ...u,
      componentCls: `.${r.value}`
    };
    return e != null && e.value ? [
      {
        [`div${n.componentCls}`]: (o = e.value) == null ? void 0 : o.call(e, n)
      }
    ] : [];
  });
}
export {
  c as useStylish
};

import { useStyle as p } from "@ant-design-vue/pro-provider";
function c(n, {
  stylish: o,
  proLayoutCollapsedWidth: a
}) {
  return p("ProLayoutHeaderStylish", (e) => {
    var u;
    const r = {
      ...e,
      componentCls: `.${n.value}`,
      proLayoutCollapsedWidth: a.value
    };
    return o != null && o.value ? [
      {
        [`div${e.proComponentsCls}-basicLayout`]: {
          [`${r.componentCls}`]: (u = o.value) == null ? void 0 : u.call(o, r)
        }
      }
    ] : [];
  });
}
export {
  c as useStylish
};

import { useStyle as o } from "@ant-design-vue/pro-provider";
const r = (t) => ({
  [t.componentCls]: {
    width: "100%",
    "&-wide": {
      maxWidth: 1152,
      margin: "0 auto"
    }
  }
});
function i(t) {
  return o("ProLayoutGridContent", (e) => {
    const n = {
      ...e,
      componentCls: `.${t.value}`
    };
    return [r(n)];
  });
}
export {
  i as useStyle
};

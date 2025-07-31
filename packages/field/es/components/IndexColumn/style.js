import { useStyle as t } from "@ant-design-vue/pro-provider";
const l = (e) => ({
  [e.componentCls]: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 18,
    height: 18,
    "&-border": {
      color: "#fff",
      fontSize: 12,
      lineHeight: "12px",
      backgroundColor: "#314659",
      borderRadius: 9,
      "&.top-three": {
        backgroundColor: "#979797"
      }
    }
  }
});
function i(e) {
  return t("FieldIndexColumn", (n) => {
    const o = {
      ...n,
      componentCls: `.${e.value}`
    };
    return [l(o)];
  });
}
export {
  l as genFieldIndexColumnStyle,
  i as useStyle
};

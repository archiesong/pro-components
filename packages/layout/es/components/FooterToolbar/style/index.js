import { useStyle as r } from "@ant-design-vue/pro-provider";
const t = (o) => ({
  [o.componentCls]: {
    position: "fixed",
    insetInlineEnd: 0,
    bottom: 0,
    zIndex: 8,
    display: "flex",
    alignItems: "center",
    width: "100%",
    paddingInline: 24,
    paddingBlock: 0,
    boxSizing: "border-box",
    lineHeight: "44px",
    backgroundColor: o.colorBgElevated,
    borderBlockStart: `1px solid ${o.colorSplit}`,
    boxShadow: o.boxShadowSecondary,
    transition: "width 0.2s",
    "&-left": {
      flex: 1
    },
    "&-right": {
      "> *": {
        marginInlineEnd: 8,
        "&:last-child": {
          marginBlock: 0,
          marginInline: 0
        }
      }
    }
  }
});
function i(o) {
  return r("ProLayoutFooterToolbar", (n) => {
    const e = {
      ...n,
      componentCls: `.${o.value}`
    };
    return [t(e)];
  });
}
export {
  i as useStyle
};

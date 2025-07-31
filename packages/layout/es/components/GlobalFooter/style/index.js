import { useStyle as n } from "@ant-design-vue/pro-provider";
const e = (o) => ({
  [o.componentCls]: {
    marginBlock: 0,
    marginBlockStart: 48,
    marginBlockEnd: 24,
    marginInline: 0,
    paddingBlock: 0,
    paddingInline: 16,
    textAlign: "center",
    "&-list": {
      marginBlockEnd: 8,
      color: o.colorTextSecondary,
      "&-link": {
        color: o.colorTextSecondary,
        textDecoration: o.linkDecoration
      },
      "*:not(:last-child)": {
        marginInlineEnd: 8
      },
      "&:hover": {
        color: o.colorPrimary
      }
    },
    "&-copyright": { fontSize: "14px", color: o.colorText }
  }
});
function c(o) {
  return n("ProLayoutGlobalFooter", (r) => {
    const l = {
      ...r,
      componentCls: `.${o.value}`
    };
    return [e(l)];
  });
}
export {
  c as useStyle
};

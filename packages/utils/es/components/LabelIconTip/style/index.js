import { useStyle as r } from "@ant-design-vue/pro-provider";
const t = (e) => ({
  [e.componentCls]: {
    display: "inline-flex",
    alignItems: "center",
    maxWidth: "100%",
    "&-icon": {
      display: "block",
      marginInlineStart: "4px",
      cursor: "pointer",
      "&:hover": {
        color: e.colorPrimary
      }
    },
    "&-title": { display: "inline-flex", flex: "1" },
    "&-subtitle ": {
      marginInlineStart: 8,
      color: e.colorTextSecondary,
      fontWeight: "normal",
      fontSize: e.fontSize,
      whiteSpace: "nowrap"
    },
    "&-title-ellipsis": {
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      wordBreak: "keep-all"
    }
  }
});
function i(e) {
  return r("LabelIconTip", (l) => {
    const o = {
      ...l,
      componentCls: `.${e.value}`
    };
    return [t(o)];
  });
}
export {
  i as useStyle
};

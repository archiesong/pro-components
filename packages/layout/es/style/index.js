import { useStyle as p } from "@ant-design-vue/pro-provider";
const d = (n) => {
  var t, e, o, i, a, l, r;
  return {
    [n.componentCls]: {
      [`&${n.antCls}-layout`]: {
        display: "flex",
        width: "100%",
        height: "100%",
        minHeight: "100vh"
      },
      [`${n.componentCls}-content`]: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        backgroundColor: ((e = (t = n.layout) == null ? void 0 : t.pageContainer) == null ? void 0 : e.colorBgPageContainer) || "transparent",
        position: "relative",
        paddingBlock: (i = (o = n.layout) == null ? void 0 : o.pageContainer) == null ? void 0 : i.paddingBlockPageContainerContent,
        paddingInline: (l = (a = n.layout) == null ? void 0 : a.pageContainer) == null ? void 0 : l.paddingInlinePageContainerContent,
        "&-has-page-container": {
          padding: 0
        }
      },
      [`${n.componentCls}-container`]: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        minWidth: 0,
        minHeight: 0,
        backgroundColor: "transparent"
      },
      [`${n.componentCls}-wrap`]: {
        display: "flex",
        flexDirection: "column",
        width: "100%"
      },
      [`${n.componentCls}-bg-list`]: {
        pointerEvents: "none",
        position: "fixed",
        overflow: "hidden",
        insetBlockStart: 0,
        insetInlineStart: 0,
        zIndex: 0,
        height: "100%",
        width: "100%",
        background: (r = n == null ? void 0 : n.layout) == null ? void 0 : r.bgLayout
      }
    }
  };
};
function c(n) {
  return p("ProLayout", (t) => {
    const e = {
      ...t,
      componentCls: `.${n.value}`
    };
    return [d(e)];
  });
}
export {
  c as useStyle
};

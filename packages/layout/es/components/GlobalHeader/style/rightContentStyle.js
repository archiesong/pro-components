import { useStyle as h } from "@ant-design-vue/pro-provider";
const u = (r) => {
  var o, e, a, t, i, n, l, s, d, c, g, p;
  return {
    [`${r.proComponentsCls}-layout-header`]: {
      [`${r.proComponentsCls}-top-nav-header,${r.proComponentsCls}-global-header`]: {
        "&-dark": {
          [r.componentCls]: {
            "&-header-actions": {
              "&-item": {
                color: "rgba(255,255,255,0.65)",
                "> *": {
                  color: "rgba(255,255,255,0.65)",
                  "&:hover": {
                    color: "rgba(255,255,255, 1)"
                  }
                }
              },
              "&-avatar": {
                color: "rgba(255,255,255,0.65)",
                "> span": {
                  color: "rgba(255,255,255,0.65)",
                  "&:hover": {
                    color: "rgba(255,255,255, 1)",
                    backgroundColor: "rgba(255,255,255, 0.03)"
                  }
                }
              }
            }
          }
        }
      }
    },
    [`${r.proComponentsCls}-layout-header`]: {
      [`${r.proComponentsCls}-top-nav-header`]: {
        "&-actions": {
          "&-avatar": {
            paddingInlineEnd: r.padding
          }
        }
      },
      [`${r.proComponentsCls}-top-nav-header,${r.proComponentsCls}-global-header`]: {
        "&-dark": {
          [r.componentCls]: {
            "&-actions": {
              "&-item": {
                color: "rgba(255,255,255,0.65)",
                "> *": {
                  color: "rgba(255,255,255,0.65)",
                  "&:hover": {
                    color: "rgba(255,255,255, 1)"
                  }
                }
              },
              "&-avatar": {
                color: "rgba(255,255,255,0.65)",
                "> span": {
                  color: "rgba(255,255,255,0.65)"
                }
              }
            }
          }
        }
      }
    },
    [r.componentCls]: {
      "&-actions": {
        display: "flex",
        height: "100%",
        alignItems: "center",
        "&-item": {
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          paddingBlock: 0,
          paddingInline: 2,
          height: "inherit",
          lineHeight: "inherit",
          color: (e = (o = r.layout) == null ? void 0 : o.header) == null ? void 0 : e.colorTextRightActionsItem,
          fontSize: "16px",
          cursor: "pointer",
          borderRadius: r.borderRadius,
          "> *": {
            paddingInline: 6,
            paddingBlock: 6,
            borderRadius: r.borderRadius,
            height: "inherit",
            color: (t = (a = r.layout) == null ? void 0 : a.header) == null ? void 0 : t.colorTextRightActionsItem,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            lineHeight: "100%",
            "&:hover": {
              backgroundColor: (n = (i = r.layout) == null ? void 0 : i.header) == null ? void 0 : n.colorBgRightActionsItemHover
            }
          }
        },
        "&-avatar": {
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          height: "inherit",
          lineHeight: "inherit",
          paddingInlineStart: r.padding,
          cursor: "pointer",
          color: (s = (l = r.layout) == null ? void 0 : l.header) == null ? void 0 : s.colorTextRightActionsItem,
          "> span": {
            height: "inherit",
            color: (c = (d = r.layout) == null ? void 0 : d.header) == null ? void 0 : c.colorTextRightActionsItem,
            paddingInline: 8,
            paddingBlock: 8,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            lineHeight: "100%",
            borderRadius: r.borderRadius,
            "&:hover": {
              backgroundColor: (p = (g = r.layout) == null ? void 0 : g.header) == null ? void 0 : p.colorBgRightActionsItemHover
            }
          }
        }
      }
    }
  };
};
function C(r) {
  return h("ProLayoutRightContent", (o) => {
    const e = {
      ...o,
      componentCls: `.${r.value}`
    };
    return [u(e)];
  });
}
export {
  C as useStyle
};

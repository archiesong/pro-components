import { Keyframes as h } from "ant-design-vue";
import { useStyle as x } from "@ant-design-vue/pro-provider";
const b = new h("antBadgeLoadingCircle", {
  "0%": { display: "none", opacity: 0, overflow: "hidden" },
  "80%": {
    overflow: "hidden"
  },
  "100%": {
    display: "unset",
    opacity: 1
  }
}), y = (e) => {
  var n, o, i, a, r, t, l, s, d, c, g, u, p, m;
  return {
    [e.componentCls]: {
      [`&${e.antCls}-layout-sider`]: {
        zIndex: 10,
        [`&${e.componentCls}-light`]: {
          boxShadow: "2px 0 8px rgba(29, 35, 41, .05)",
          [`&${e.componentCls}-mix`]: {
            zIndex: 9
          },
          [`& ${e.antCls}-layout-sider-children`]: {
            "& ::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(0,0,0,.12)",
              borderRadius: 3,
              boxShadow: "inset 0 0 5px rgba(0,21,41,.05)"
            },
            "& ::-webkit-scrollbar-track": {
              backgroundColor: "rgba(0,0,0,.06)",
              borderRadius: 3,
              boxShadow: "inset 0 0 5px rgba(0,21,41,.05)"
            }
          }
        },
        [`&${e.componentCls}-dark`]: {
          [`${e.componentCls}-logo`]: {
            color: "rgba(255,255,255,0.85)",
            "> a": {
              "> h1": {
                color: "rgba(255,255,255,0.85)"
              }
            }
          },
          [`${e.componentCls}-actions`]: {
            color: "rgba(255,255,255,0.85)"
          }
        }
      },
      [`& ${e.antCls}-layout-sider-children`]: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
        "& ::-webkit-scrollbar": {
          width: 6,
          height: 6
        },
        "& ::-webkit-scrollbar-thumb": {
          backgroundColor: "rgba(255,255,255,0.2)",
          borderRadius: 3,
          boxShadow: "inset 0 0 5px rgba(255,255,255,.05)"
        },
        "& ::-webkit-scrollbar-track": {
          backgroundColor: "rgba(255,255,255,0.15)",
          borderRadius: 3,
          boxShadow: "inset 0 0 5px rgba(37,37,37,.05)"
        },
        [`${e.componentCls}-collapsed-button`]: {
          [`& ${e.antCls}-menu-light`]: {
            borderInlineEnd: "none"
          }
        }
      },
      "&-logo": {
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingInline: 8,
        paddingBlock: 16,
        color: (o = (n = e.layout) == null ? void 0 : n.sider) == null ? void 0 : o.colorTextMenu,
        cursor: "pointer",
        "> a": {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 32,
          fontSize: 32,
          "> img": {
            display: "inline-block",
            height: 32,
            verticalAlign: "middle",
            transition: "height 0.2s"
          },
          "> svg": {
            fontSize: 32
          },
          "> img + h1, > svg+ h1": {
            marginInlineStart: 10
          },
          "> h1": {
            display: "inline-block",
            height: 32,
            marginBlock: 0,
            marginInlineEnd: 0,
            color: (a = (i = e.layout) == null ? void 0 : i.sider) == null ? void 0 : a.colorTextMenuTitle,
            animationName: b,
            animationDuration: ".4s",
            animationTimingFunction: "ease",
            fontWeight: 600,
            fontSize: 18,
            lineHeight: "32px",
            verticalAlign: "middle"
          }
        },
        "&-collapsed": {
          flexDirection: "column-reverse",
          margin: 0,
          padding: 12,
          [`${e.proComponentsCls}-layout-apps-icon`]: {
            marginBlockEnd: 8,
            fontSize: 16,
            transition: "font-size 0.2s ease-in-out,color 0.2s ease-in-out"
          }
        }
      },
      "&-actions": {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBlock: 4,
        marginInline: 0,
        color: (t = (r = e.layout) == null ? void 0 : r.sider) == null ? void 0 : t.colorTextMenu,
        "&-collapsed": {
          flexDirection: "column-reverse",
          paddingBlock: 0,
          paddingInline: 8,
          fontSize: 16,
          transition: "font-size 0.3s ease-in-out"
        },
        "&-list": {
          color: (s = (l = e.layout) == null ? void 0 : l.sider) == null ? void 0 : s.colorTextMenuSecondary,
          "&-collapsed": {
            marginBlockEnd: 8,
            animationName: "none"
          },
          "&-item": {
            paddingInline: 6,
            paddingBlock: 6,
            lineHeight: "16px",
            fontSize: 16,
            cursor: "pointer",
            borderRadius: e.borderRadius,
            "&:hover": {
              background: e.colorBgTextHover
            }
          }
        },
        "&-avatar": {
          fontSize: 14,
          paddingInline: 8,
          paddingBlock: 8,
          display: "flex",
          alignItems: "center",
          gap: 8,
          borderRadius: e.borderRadius,
          "& *": {
            cursor: "pointer"
          },
          "&:hover": {
            background: e.colorBgTextHover
          }
        }
      },
      "&-extra": {
        marginBlockEnd: 16,
        marginBlock: 0,
        marginInline: 16,
        "&-no-logo": {
          marginBlockStart: 16
        }
      },
      "&-links": {
        width: "100%"
      },
      "&-footer": {
        color: (c = (d = e.layout) == null ? void 0 : d.sider) == null ? void 0 : c.colorTextMenuSecondary,
        paddingBlockEnd: 16,
        fontSize: e.fontSize,
        animationName: b,
        animationDuration: ".3s",
        animationTimingFunction: "ease"
      },
      [`&&-mix${e.antCls}-layout-sider`]: {
        insetBlockStart: `${((u = (g = e.layout) == null ? void 0 : g.header) == null ? void 0 : u.heightLayoutHeader) || 56}px`
      }
    },
    [`${e.componentCls}${e.componentCls}-fixed`]: {
      position: "fixed",
      insetBlockStart: 0,
      insetInlineStart: 0,
      zIndex: 99,
      height: "100%",
      "&-mix": {
        height: `calc(100% - ${((m = (p = e.layout) == null ? void 0 : p.header) == null ? void 0 : m.heightLayoutHeader) || 56}px)`
      }
    }
  };
};
function C(e, {
  proLayoutCollapsedWidth: n
}) {
  return x("ProLayoutSiderMenu", (o) => {
    const i = {
      ...o,
      componentCls: `.${e.value}`
    };
    return [y(i)];
  });
}
export {
  b as proLayoutTitleHide,
  C as useStyle
};

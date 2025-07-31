import { useStyle as i } from "@ant-design-vue/pro-provider";
import { genAppsLogoComponentsDefaultListStyle as p } from "./default.js";
import { genAppsLogoComponentsSimpleListStyle as a } from "./simple.js";
const c = (o) => {
  var r, e, t, n, l;
  return {
    [`${o.antCls}-layout-sider, ${o.proComponentsCls}-top-nav-header, ${o.proComponentsCls}-global-header`]: {
      "&-dark": {
        [o.componentCls]: {
          "&-icon": {
            color: "rgba(255, 255, 255, 0.85)",
            "&:hover": {
              color: "rgba(255, 255, 255, 1)",
              backgroundColor: "rgba(255,255,255, 0.05)"
            },
            "&-active": {
              color: "rgba(255, 255, 255, 1)",
              backgroundColor: "rgba(255,255,255, 0.05)"
            }
          },
          "&-item-title": {
            color: "rgba(255, 255, 255, 0.88)"
          }
        }
      }
    },
    [o.componentCls]: {
      "&-wrapper": {},
      "&-icon": {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        paddingInline: 4,
        paddingBlock: 0,
        fontSize: 14,
        lineHeight: "14px",
        height: 28,
        width: 28,
        cursor: "pointer",
        color: (r = o.layout) == null ? void 0 : r.colorTextAppListIcon,
        borderRadius: o.borderRadius,
        boxSizing: "border-box",
        "&:hover": {
          color: (e = o.layout) == null ? void 0 : e.colorTextAppListIconHover,
          backgroundColor: (t = o.layout) == null ? void 0 : t.colorBgAppListIconHover
        },
        "&-active": {
          color: (n = o.layout) == null ? void 0 : n.colorTextAppListIconHover,
          backgroundColor: (l = o.layout) == null ? void 0 : l.colorBgAppListIconHover
        }
      },
      "&-item-title": {
        marginInlineStart: "16px",
        marginInlineEnd: "8px",
        marginBlockStart: 0,
        marginBlockEnd: "12px",
        fontWeight: 600,
        color: "rgba(0, 0, 0, 0.88)",
        fontSize: 16,
        opacity: 0.85,
        lineHeight: 1.5,
        "&:first-child": {
          marginBlockStart: 12
        }
      },
      "&-popover": {
        [`${o.antCls}-popover-arrow`]: {
          display: "none"
        }
      },
      "&-simple": a(o),
      "&-default": p(o)
    }
  };
};
function m(o) {
  return i("AppsLogoComponents", (r) => {
    const e = {
      ...r,
      componentCls: `.${o.value}`
    };
    return [c(e)];
  });
}
export {
  m as useStyle
};

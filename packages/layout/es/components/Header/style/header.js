import { useStyle as l } from "@ant-design-vue/pro-provider";
const n = (e) => {
  var a, t, r, i;
  return {
    [`${e.componentCls}`]: {
      [`&${e.antCls}-layout-header`]: {
        height: ((t = (a = e == null ? void 0 : e.layout) == null ? void 0 : a.header) == null ? void 0 : t.heightLayoutHeader) || 56,
        lineHeight: `${((i = (r = e == null ? void 0 : e.layout) == null ? void 0 : r.header) == null ? void 0 : i.heightLayoutHeader) || 56}px`,
        zIndex: 9,
        paddingBlock: 0,
        paddingInline: 0,
        transition: "width .2s"
      },
      [`&-fixed${e.antCls}-layout-header`]: {
        position: "fixed",
        insetBlockStart: 0,
        insetInlineEnd: 0
      },
      "&-actions": {
        display: "flex",
        alignItems: "center",
        fontSize: 16,
        cursor: "pointer",
        "& &-item": {
          paddingBlock: 0,
          paddingInline: 8,
          "&:hover": {
            color: e.colorText
          }
        }
      }
    },
    "&-mix": {
      [`${e.componentCls}`]: {
        [`&${e.antCls}-layout-header`]: {
          zIndex: 99
        }
      }
    }
  };
};
function d(e) {
  return l("ProLayoutHeader", (a) => {
    const t = {
      ...a,
      componentCls: `.${e.value}`
    };
    return [n(t)];
  });
}
export {
  d as useStyle
};

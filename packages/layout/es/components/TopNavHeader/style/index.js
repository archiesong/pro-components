import { useStyle as t } from "@ant-design-vue/pro-provider";
const r = (i) => {
  var e, n, l, o;
  return {
    [i.componentCls]: {
      position: "relative",
      width: "100%",
      height: "100%",
      "&-light": {
        backgroundColor: ((n = (e = i.layout) == null ? void 0 : e.header) == null ? void 0 : n.colorBgHeader) || i.colorBgContainer,
        boxShadow: "0 1px 4px rgba(0, 21, 41, 0.12)"
      },
      "&-dark": {
        backgroundColor: "inherit",
        [`${i.componentCls}-logo`]: {
          "> *:first-child > h1": {
            color: "rgba(255,255,255,0.85)"
          }
        }
      },
      ".anticon": {
        color: "inherit"
      },
      "&-main": {
        display: "flex",
        height: "100%",
        paddingInlineStart: 16,
        "&-left": {
          display: "flex",
          alignItems: "center",
          [`${i.proComponentsCls}-layout-apps-icon`]: {
            marginInlineEnd: 16
          }
        }
      },
      "&-wide": {
        maxWidth: 1152,
        margin: "0 auto"
      },
      "&-logo": {
        position: "relative",
        display: "flex",
        height: "100%",
        alignItems: "center",
        overflow: "hidden",
        "> *:first-child": {
          display: "flex",
          alignItems: "center",
          minHeight: 32,
          fontSize: 32
        },
        "> *:first-child > img": {
          display: "inline-block",
          height: 32,
          verticalAlign: "middle"
        },
        "> *:first-child > h1": {
          display: "inline-block",
          marginBlock: 0,
          marginInline: 0,
          lineHeight: "24px",
          marginInlineStart: 12,
          fontWeight: 600,
          fontSize: 16,
          color: (o = (l = i.layout) == null ? void 0 : l.header) == null ? void 0 : o.colorHeaderTitle,
          verticalAlign: "top"
        }
      },
      "&-menu": {
        minWidth: 0,
        paddingInlineStart: 60
      }
    }
  };
};
function d(i) {
  return t("ProLayoutTopNavHeader", (e) => {
    const n = {
      ...e,
      componentCls: `.${i.value}`
    };
    return [r(n)];
  });
}
export {
  d as useStyle
};

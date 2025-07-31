import { useStyle as C } from "@ant-design-vue/pro-provider";
const [g, p, u, c] = [576, 768, 992, 1200].map((a) => `@media (max-width: ${a}px)`), s = (a) => {
  var i, n, e, t, r, o, l, d;
  return {
    // [`${token.proComponentsCls}-basicLayout-realDark`]: {
    //   [token.componentCls]: {
    //     '&-wrap': {
    //       backgroundColor: '#242525',
    //     },
    //   },
    // },
    [a.componentCls]: {
      position: "relative",
      "&-wrap": {
        backgroundColor: a.colorBgContainer,
        "&-page-header": {
          [`&-wide${a.antCls}-page-header`]: {
            maxWidth: 1152,
            margin: "0 auto"
          }
        }
      },
      "&-children-content": {
        paddingBlockStart: (n = (i = a.layout) == null ? void 0 : i.pageContainer) == null ? void 0 : n.paddingBlockPageContainerContent,
        paddingBlockEnd: (t = (e = a.layout) == null ? void 0 : e.pageContainer) == null ? void 0 : t.paddingBlockPageContainerContent,
        paddingInline: (o = (r = a.layout) == null ? void 0 : r.pageContainer) == null ? void 0 : o.paddingInlinePageContainerContent
      },
      "&-affix": {
        [`${a.antCls}-affix`]: {
          [`${a.componentCls}-warp`]: {
            backgroundColor: (d = (l = a.layout) == null ? void 0 : l.pageContainer) == null ? void 0 : d.colorBgPageContainerFixed,
            transition: "background-color 0.3s",
            boxShadow: "0 2px 8px #f0f1f2"
          }
        }
      },
      "&-detail": {
        display: "flex",
        [g]: {
          display: "block"
        }
      },
      "&-main": {
        width: "100%"
      },
      "&-row": {
        display: "flex",
        width: "100%",
        [p]: {
          display: "block"
        }
      },
      "&-content": {
        flex: "auto",
        width: "100%"
      },
      "&-extraContent": {
        flex: "0 1 auto",
        minWidth: 242,
        marginInlineStart: 88,
        textAlign: "end",
        [c]: {
          marginInlineStart: 44
        },
        [u]: {
          marginInlineStart: 20
        },
        [p]: {
          marginInlineStart: 0,
          textAlign: "start"
        },
        [g]: {
          marginInlineStart: 0
        }
      }
    }
  };
};
function x(a, i) {
  return C("ProLayoutPageContainer", (n) => {
    var t;
    const e = {
      ...n,
      componentCls: `.${a.value}`,
      layout: {
        ...n == null ? void 0 : n.layout,
        pageContainer: {
          ...(t = n == null ? void 0 : n.layout) == null ? void 0 : t.pageContainer,
          ...i.value
        }
      }
    };
    return [s(e)];
  });
}
export {
  x as useStyle
};

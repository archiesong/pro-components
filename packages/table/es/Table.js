import { defineComponent as s, computed as S, Fragment as y, createVNode as o } from "vue";
import { ConfigProvider as C, TableSummary as b } from "ant-design-vue";
import g from "@ant-design-vue/pro-provider";
import { useTableContextProvider as P, useContainer as R } from "./Store/Provide.js";
import { proTableProps as w } from "./proTableProps.js";
import { useMountMergeState as l, useMemo as T, getSlot as h, ErrorBoundary as v } from "@ant-design-vue/pro-utils";
import B from "./utils/genProColumnToColumn.js";
import u from "./TableRender.js";
const r = /* @__PURE__ */ s({
  name: "ProTable",
  inheritAttrs: !1,
  props: w(),
  setup(e, {
    slots: m
  }) {
    var n;
    P(R(e));
    const [a, d] = l(e.rowSelection ? ((n = e.rowSelection) == null ? void 0 : n.defaultSelectedRowKeys) || [] : void 0, {
      value: S(() => e.rowSelection ? e.rowSelection.selectedRowKeys : void 0)
    });
    console.log(a, d);
    const [K, M] = l(() => {
      if (!(e.manualRequest || e.search !== !1))
        return {};
    }), i = T(() => B({
      columns: e.columns
    }), [() => e.columns]);
    return console.log(i, "tableColumn"), () => {
      const c = h(m, e, "errorBoundaryRender"), f = e.errorBoundaryRender === !1 ? y : c || v;
      return o(g, null, {
        default: () => [o(f, null, {
          default: () => {
            var t;
            return [!e.options || !((t = e.options) != null && t.fullScreen) ? o(u, e, null) : o(C, {
              getPopupContainer: () => document.body
            }, {
              default: () => [o(u, e, null)]
            })];
          }
        })]
      });
    };
  }
});
r.Summary = b;
r.install = (e) => (e.component(r.name, r), e);
export {
  r as default
};

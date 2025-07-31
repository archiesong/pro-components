import { defineComponent as n, computed as r, createVNode as p } from "vue";
import { useStyle as m } from "./style/index.js";
import { useConfigContextInject as i } from "ant-design-vue/es/config-provider/context";
import { proTableProps as f } from "./proTableProps.js";
import { classNames as u } from "@ant-design-vue/pro-utils";
const v = /* @__PURE__ */ n({
  name: "TableRender",
  inheritAttrs: !1,
  props: f(),
  setup(o) {
    const {
      getPrefixCls: t
    } = i(), s = r(() => o.prefixCls ?? t("pro")), e = r(() => `${s.value}-table`), {
      wrapSSR: a,
      hashId: l
    } = m(e);
    return () => a(p("div", {
      class: u(e.value, l.value)
    }, null));
  }
});
export {
  v as default
};

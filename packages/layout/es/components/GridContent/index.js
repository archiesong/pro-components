import { defineComponent as C, computed as e, createVNode as u } from "vue";
import { useRouteContextInject as v } from "../../context/RouteContext.js";
import { classNames as l } from "@ant-design-vue/pro-utils";
import { useStyle as x } from "./style/index.js";
import { useConfigContextInject as h } from "ant-design-vue/es/config-provider/context";
const g = () => ({
  contentWidth: {
    type: String,
    default: void 0
  },
  prefixCls: {
    type: String,
    default: void 0
  }
}), $ = /* @__PURE__ */ C({
  name: "GridContent",
  inheritAttrs: !1,
  props: g(),
  setup(o, {
    slots: t,
    attrs: i
  }) {
    const r = v(), {
      getPrefixCls: c
    } = h(), a = e(() => o.prefixCls || c("pro")), f = e(() => o.contentWidth || r.value.contentWidth), n = e(() => `${a.value}-grid-content`), {
      wrapSSR: p,
      hashId: s
    } = x(n), m = e(() => f.value === "Fixed" && r.value.layout === "top");
    return () => {
      var d;
      return p(u("div", {
        class: l(n.value, s.value, i.class, {
          [`${n.value}-wide`]: m.value
        }),
        style: i.style
      }, [u("div", {
        class: l(`${a.value}-grid-content-children`, s.value)
      }, [(d = t.default) == null ? void 0 : d.call(t)])]));
    };
  }
});
export {
  $ as default,
  g as gridContentProps
};

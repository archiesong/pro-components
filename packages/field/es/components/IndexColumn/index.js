import { defineComponent as i, computed as t, createVNode as c } from "vue";
import { useStyle as l } from "./style.js";
import { useConfigContextInject as C } from "ant-design-vue/es/config-provider/context";
import { classNames as s } from "@ant-design-vue/pro-utils";
const I = /* @__PURE__ */ i({
  name: "IndexColumn",
  inheritAttrs: !1,
  props: {
    border: {
      type: Boolean,
      default: !1
    }
  },
  setup(a, {
    slots: e
  }) {
    const {
      getPrefixCls: u
    } = C(), d = t(() => u("pro")), r = t(() => `${d.value}field-index-column`), {
      wrapSSR: m,
      hashId: f
    } = l(r);
    return () => {
      var n, o;
      const [{
        children: p
      }] = (n = e.default) == null ? void 0 : n.call(e);
      return m(c("div", {
        class: s(r.value, f.value, {
          [`${r.value}-border`]: a.border,
          "top-three": Number(p) > 3
        })
      }, [(o = e.default) == null ? void 0 : o.call(e)]));
    };
  }
});
export {
  I as default
};

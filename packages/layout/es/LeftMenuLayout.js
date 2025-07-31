import { defineComponent as t, createVNode as e, createTextVNode as o } from "vue";
import { proLayoutProps as r } from "./proLayoutProps.js";
const f = /* @__PURE__ */ t({
  name: "LeftMenuLayout",
  inheritAttrs: !1,
  props: r(),
  setup(n, {
    slots: u,
    attrs: a
  }) {
    return () => e("div", null, [o("LeftMenuLayout")]);
  }
});
export {
  f as default
};

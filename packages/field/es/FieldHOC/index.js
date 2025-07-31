import { defineComponent as p, ref as b, createVNode as h, cloneVNode as L } from "vue";
import { useState as m } from "@ant-design-vue/pro-utils";
const w = /* @__PURE__ */ p({
  name: "FieldHOC",
  inheritAttrs: !1,
  props: {
    isLight: {
      type: Boolean,
      default: !1
    }
  },
  setup(u, {
    slots: a
  }) {
    const [f, r] = m(!1), t = b(), d = (e) => {
      var o, i, l;
      const n = (i = (o = t.value) == null ? void 0 : o.labelRef.value) == null ? void 0 : i.contains(e.target), g = (l = t.value) == null ? void 0 : l.clearRef.value.contains(e.target);
      return n && !g;
    }, c = (e) => {
      d(e) && r(!0);
    }, s = () => r(!1);
    return () => {
      var e, n;
      return u.isLight ? h("div", {
        onMousedown: c,
        onMouseup: s
      }, [L((e = a.default) == null ? void 0 : e.call(a), {
        labelTrigger: f,
        lightLabel: t.value
      })]) : (n = a.default) == null ? void 0 : n.call(a);
    };
  }
});
export {
  w as default
};

import { defineComponent as n, createVNode as p } from "vue";
import { Card as d } from "ant-design-vue";
import { cardProps as m } from "ant-design-vue/es/card/Card";
const f = () => ({
  ...m()
}), o = /* @__PURE__ */ n({
  name: "ProCard",
  inheritAttrs: !1,
  props: f(),
  setup(r, {
    slots: e,
    attrs: a
  }) {
    return () => p(d, {
      class: a.class
    }, {
      default: () => {
        var t;
        return [(t = e.default) == null ? void 0 : t.call(e)];
      }
    });
  }
});
o.install = (r) => (r.component(o.name, o), r);
export {
  o as default,
  f as proCardProps
};

import { defineComponent as n, createVNode as o, Fragment as r, createTextVNode as a } from "vue";
import { useEffect as m } from "@ant-design-vue/pro-utils";
const u = /* @__PURE__ */ n({
  name: "BaseForm",
  inheritAttrs: !1,
  props: {
    onInit: {
      type: Function,
      default: void 0
    }
  },
  setup(e) {
    return m(() => {
      var t;
      console.log("BaseForm"), (t = e.onInit) == null || t.call(e, {}, {});
    }, []), () => o(r, null, [a("sad")]);
  }
});
export {
  u as BaseForm
};

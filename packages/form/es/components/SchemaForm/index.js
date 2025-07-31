import { defineComponent as p, createVNode as u } from "vue";
import d from "../../layouts/QueryFilter/index.js";
import f from "../../layouts/ProForm/index.js";
const i = {
  QueryFilter: d,
  Form: f
}, l = /* @__PURE__ */ p({
  name: "BetaSchemaForm",
  inheritAttrs: !1,
  props: {
    onInit: {
      type: Function,
      default: void 0
    },
    layoutType: {
      type: String,
      default: void 0
    },
    type: {
      type: String,
      default: void 0
    }
  },
  setup(n, {
    slots: t
  }) {
    return () => {
      const {
        layoutType: r = "Form",
        onInit: o
      } = n, m = i[r];
      return u(m, {
        onInit: (e, a) => {
          console.log("FormRenderComponents"), o == null || o(e, a);
        }
      }, {
        default: () => {
          var e;
          return [(e = t.default) == null ? void 0 : e.call(t)];
        }
      });
    };
  }
});
export {
  l as default
};

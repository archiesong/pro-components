import { defineComponent as e, createVNode as n, Fragment as t } from "vue";
import { formProps as m } from "ant-design-vue/es/form";
import { omit as p } from "@ant-design-vue/pro-utils";
const i = () => ({
  ...p(m(), ["onFinish"]),
  onInit: {
    type: Function,
    default: void 0
  }
}), F = /* @__PURE__ */ e({
  name: "ProForm",
  inheritAttrs: !1,
  props: i(),
  setup(f, {
    slots: r
  }) {
    return () => {
      var o;
      return n(t, null, [(o = r.default) == null ? void 0 : o.call(r)]);
    };
  }
});
export {
  F as default,
  i as proFormProps
};

import { defineComponent as p, ref as c, createVNode as l, Fragment as F, mergeProps as x } from "vue";
import { useIntl as g } from "@ant-design-vue/pro-provider";
import { Input as y } from "ant-design-vue";
import { useEffect as P } from "@ant-design-vue/pro-utils";
const T = () => ({
  mode: {
    type: String,
    default: void 0
  },
  text: {
    type: String,
    default: void 0
  },
  emptyText: {
    type: [String, Function, Object],
    default: "-"
  },
  fieldProps: {
    type: Object,
    default: void 0
  },
  customRender: {
    type: Function,
    default: void 0
  },
  renderFormItem: {
    type: Function,
    default: void 0
  }
}), S = /* @__PURE__ */ p({
  name: "FieldText",
  inheritAttrs: !1,
  props: T(),
  setup(o) {
    const d = c(), s = g();
    return P(() => {
      var e, t;
      (e = o.fieldProps) != null && e.autoFocus && ((t = d.value) == null || t.focus());
    }, [() => {
      var e;
      return (e = o.fieldProps) == null ? void 0 : e.autoFocus;
    }]), () => {
      const {
        mode: e,
        emptyText: t = "-",
        renderFormItem: f,
        customRender: i,
        text: u,
        fieldProps: r
      } = o, {
        prefix: a = "",
        suffix: m = ""
      } = r || {};
      if (e === "read") {
        const n = l(F, null, [a, u ?? t, m]);
        return i ? i(u, {
          mode: e,
          ...r
        }, n) ?? t : n;
      }
      if (e === "edit" || e === "update") {
        const n = l(y, x({
          ref: d,
          placeholder: s.value.getMessage({
            id: "tableForm.inputPlaceholder",
            defaultMessage: "请输入"
          }),
          allowClear: !0
        }, r), null);
        return f ? f(u, {
          mode: e,
          ...r
        }, n) : n;
      }
      return null;
    };
  }
});
export {
  S as default,
  T as fieldTextProps
};

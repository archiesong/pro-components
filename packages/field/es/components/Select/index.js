import { defineComponent as h, ref as i, createVNode as c, Fragment as b, mergeProps as F } from "vue";
import { objectToMap as f, useEffect as y, proFieldParsingText as S } from "@ant-design-vue/pro-utils";
import x from "./SearchSelect/index.js";
import { useIntl as P } from "@ant-design-vue/pro-provider";
const C = (n) => {
  const r = [], o = f(n);
  return o.forEach((u, l) => {
    const e = o.get(l) || o.get(`${l}`);
    if (e) {
      if (typeof e == "object" && (e != null && e.text)) {
        r.push({
          text: e == null ? void 0 : e.text,
          value: l,
          label: e == null ? void 0 : e.text,
          disabled: e.disabled
        });
        return;
      }
      r.push({
        text: e,
        value: l
      });
    }
  }), r;
}, E = () => ({
  // ...pick(selectProps(), [])
  mode: {
    type: String,
    default: void 0
  },
  text: {
    type: String,
    default: void 0
  },
  label: {
    type: [String, Function, Object],
    default: void 0
  },
  /** 值的枚举，如果存在枚举，Search 中会生成 select */
  valueEnum: {
    type: Object,
    default: void 0
  },
  fieldProps: {
    type: Object,
    default: void 0
  },
  light: {
    type: Boolean,
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
}), j = (n) => [], I = /* @__PURE__ */ h({
  name: "FieldSelect",
  inheritAttrs: !1,
  props: E(),
  setup(n) {
    const r = i(), o = i(""), u = P();
    y(() => {
      var t;
      o.value = (t = n.fieldProps) == null ? void 0 : t.searchValue;
    }, [() => {
      var t;
      return (t = n.fieldProps) == null ? void 0 : t.searchValue;
    }]);
    const [l, e, D, R] = j();
    return () => {
      const {
        mode: t,
        customRender: a,
        label: p,
        light: V,
        valueEnum: m,
        fieldProps: s,
        ...g
      } = n;
      if (t === "read") {
        const d = c(b, null, [S(g.text, f(m))]);
        return a ? a(d, {
          mode: t,
          ...s
        }, d) ?? null : d;
      }
      return t === "edit" || t === "update" ? c(x, F({
        key: "SearchSelect",
        ref: r,
        allowClear: !0,
        placeholder: u.value.getMessage({
          id: "tableForm.selectPlaceholder",
          defaultMessage: "请选择"
        }),
        label: p
      }, s, {
        options: e
      }), null) : null;
    };
  }
});
export {
  I as default,
  E as fieldSelectProps,
  C as proFieldParsingValueEnumToArray
};

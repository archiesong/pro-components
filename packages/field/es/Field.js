import { defineComponent as j, isVNode as I, cloneVNode as O, createVNode as l, Fragment as s, mergeProps as a } from "vue";
import { omitUndefined as h, pickProProps as D } from "@ant-design-vue/pro-utils";
import { useProConfigContextInject as N } from "@ant-design-vue/pro-provider";
import Y from "./components/Text/index.js";
import k from "./components/DatePicker/index.js";
import v from "./components/IndexColumn/index.js";
import w from "./components/Select/index.js";
import y from "./FieldHOC/index.js";
const B = () => ({
  text: {
    type: [String, Object, Number, Array],
    default: void 0
  },
  valueType: {
    type: [String, Object],
    default: void 0
  },
  mode: {
    type: String,
    default: void 0
  },
  onChange: {
    type: Function,
    default: void 0
  },
  renderFormItem: {
    type: Function,
    default: void 0
  },
  value: {
    type: String,
    default: void 0
  },
  readonly: {
    type: Boolean,
    default: void 0
  },
  fieldProps: {
    type: Object,
    default: void 0
  },
  placeholder: {
    type: String,
    default: void 0
  },
  valueEnum: {
    type: Object,
    default: void 0
  }
}), A = (e, r, n, i) => {
  const {
    mode: d = "read",
    emptyText: o = "-"
  } = n;
  if (o !== !1 && d === "read" && r !== "option" && r !== "switch" && typeof e != "boolean" && typeof e != "number" && !e) {
    const {
      fieldProps: m,
      render: u
    } = n;
    return u ? u(e, {
      mode: d,
      ...m
    }, l(s, null, [o])) : l(s, null, [o]);
  }
  return delete n.emptyText, i && i[r], r === "date" ? l(y, {
    isLight: n.light
  }, {
    default: () => [l(k, a(n, {
      text: e,
      format: "YYYY-MM-DD"
    }), null)]
  }) : r === "indexBorder" ? l(v, {
    border: !0
  }, {
    default: () => [e + 1]
  }) : r === "select" || r === "text" && (n.valueEnum || n.request) ? l(y, {
    isLight: n.light
  }, {
    default: () => [l(w, a({
      text: e
    }, n), null)]
  }) : r === "switch" ? "1" : l(Y, a({
    text: e
  }, n), null);
}, g = /* @__PURE__ */ j({
  name: "ProField",
  inheritAttrs: !1,
  props: B(),
  setup(e) {
    const r = N(), n = (...i) => {
      var d, o, m;
      (o = (d = e.fieldProps) == null ? void 0 : d.onChange) == null || o.call(d, ...i), (m = e.onChange) == null || m.call(e, ...i);
    };
    return () => {
      const {
        text: i,
        valueType: d = "text",
        mode: o = "read",
        onChange: m,
        renderFormItem: u,
        value: x,
        readonly: C,
        fieldProps: F,
        ...f
      } = e, t = (x !== void 0 || F) && {
        value: x,
        // fieldProps 优先级更高，在类似 LightFilter 场景下需要覆盖默认的 value 和 onChange
        ...h(F),
        onChange: n
      };
      return A(o === "edit" ? (t == null ? void 0 : t.value) ?? i ?? "" : i ?? (t == null ? void 0 : t.value) ?? "", d || "text", h({
        ...f,
        mode: C ? "read" : o,
        renderFormItem: u ? (p, b, P) => {
          const {
            placeholder: E,
            ...S
          } = b, c = u(p, S, P);
          return I(c) ? O(c, {
            ...t,
            ...c.props || {}
          }) : c;
        } : void 0,
        placeholder: u ? void 0 : (f == null ? void 0 : f.placeholder) ?? (t == null ? void 0 : t.placeholder),
        fieldProps: D(h({
          ...t,
          placeholder: u ? void 0 : (f == null ? void 0 : f.placeholder) ?? (t == null ? void 0 : t.placeholder)
        }))
      }), r.value.valueTypeMap || {});
    };
  }
});
g.install = (e) => (e.component(g.name, g), e);
export {
  g as default,
  B as proFieldProps
};

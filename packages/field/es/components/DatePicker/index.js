import { defineComponent as k, createVNode as i, Fragment as p, mergeProps as D } from "vue";
import { DatePicker as F } from "ant-design-vue";
import o from "dayjs";
import P from "dayjs/plugin/weekOfYear";
import { useIntl as b } from "@ant-design-vue/pro-provider";
import { parseValueToDay as Y } from "@ant-design-vue/pro-utils";
o.extend(P);
const w = (t, e) => t ? typeof e == "function" ? e(o(t)) : o(t).format((Array.isArray(e) ? e[0] : e) || "YYYY-MM-DD") : "-", B = /* @__PURE__ */ k({
  name: "FieldDatePicker",
  inheritAttrs: !1,
  props: {
    mode: {
      type: String,
      default: void 0
    },
    text: {
      type: [String, Object, Number],
      default: void 0
    },
    customRender: {
      type: Function,
      default: void 0
    },
    renderFormItem: {
      type: Function,
      default: void 0
    },
    fieldProps: {
      type: Object,
      default: void 0
    },
    format: {
      type: String,
      default: void 0
    },
    light: {
      type: Boolean,
      default: void 0
    },
    picker: {
      type: String,
      default: void 0
    },
    showTime: {
      type: Boolean,
      default: void 0
    },
    plain: {
      type: Boolean,
      default: void 0
    }
  },
  setup(t) {
    const e = b();
    return () => {
      const {
        mode: n,
        text: l,
        customRender: u,
        plain: a,
        picker: m,
        showTime: s,
        light: c,
        fieldProps: d,
        format: f
      } = t;
      if (n === "read") {
        const r = w(l, d.format || f);
        return u ? u(l, {
          mode: n,
          ...d
        }, i(p, null, [r])) : i(p, null, [r]);
      }
      if (n === "edit" || n === "update") {
        let r;
        const {
          value: y,
          placeholder: g = e.value.getMessage({
            id: "tableForm.selectPlaceholder",
            defaultMessage: "请选择"
          })
        } = d, h = Y(y);
        return c ? "light" : (r = i(F, D({
          picker: m,
          showTime: s,
          format: f,
          bordered: a === void 0 ? !0 : !a,
          placeholder: g
        }, d, {
          value: h
        }), null), r);
      }
      return null;
    };
  }
});
export {
  B as default
};

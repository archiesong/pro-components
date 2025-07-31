import { defineComponent as g, ref as c, onErrorCaptured as E, createVNode as t, Fragment as f, createTextVNode as S, isVNode as F } from "vue";
import { Result as h, TypographyText as y } from "ant-design-vue";
function m(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !F(e);
}
const C = /* @__PURE__ */ g({
  name: "ErrorBoundary",
  inheritAttrs: !1,
  props: {
    fallback: {
      type: [Function, Object],
      default: void 0
    },
    onError: {
      type: Function,
      default: void 0
    }
  },
  emits: ["errorCaptured"],
  setup(e, {
    slots: i,
    emit: x
  }) {
    const v = c(!1), d = c(), n = c();
    return E((l, u, r) => {
      var a;
      return v.value = !0, d.value = r, n.value = l, (a = e.onError) == null || a.call(e, l), x("errorCaptured", {
        error: l,
        vm: u,
        info: r
      }), !1;
    }), () => {
      var u, r;
      let l;
      return t(f, null, [v.value ? t(f, null, [e.fallback ? t(f, null, [typeof e.fallback == "function" ? (u = e.fallback) == null ? void 0 : u.call(e, n.value, d.value) : e.fallback]) : t(h, {
        status: "error",
        title: "Something went wrong.",
        style: {
          zIndex: 1
        }
      }, {
        default: () => {
          var a;
          return [t("div", {
            style: {
              display: "flex",
              flexDirection: "column",
              gap: "12px"
            }
          }, [t(y, null, {
            default: () => [d.value, S("："), t(y, null, m(l = n.value.toString()) ? l : {
              default: () => [l]
            })]
          }), t("div", {
            style: {
              display: "flex",
              flexDirection: "column"
            }
          }, [((a = n.value.stack.replace(n.value.toString(), "")) == null ? void 0 : a.split(`
`).map((o, b) => t("div", {
            key: o + b,
            style: {
              textAlign: "left",
              fontSize: 10
            }
          }, [t(y, {
            type: "secondary"
          }, m(o) ? o : {
            default: () => [o]
          })]))) ?? null])])];
        }
      })]) : t(f, null, [(r = i.default) == null ? void 0 : r.call(i)])]);
    };
  }
});
export {
  C as default
};

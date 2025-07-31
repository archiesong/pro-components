import { defineComponent as j, computed as i, watch as V, isRef as O, createVNode as _ } from "vue";
import { cssinjs as B, ConfigProvider as D } from "ant-design-vue";
import { getLayoutDesignToken as U } from "./typing/layoutToken.js";
import { useConfigContextInject as b } from "ant-design-vue/es/config-provider/context";
import s from "ant-design-vue/es/_util/hooks/useMemo";
import { useProConfigContextInject as L, useProConfigContextProvider as S } from "./context.js";
import $ from "dayjs";
import "dayjs/locale/zh-cn";
import { proTheme as K } from "./useStyle/index.js";
import { findIntlKeyByAntdLocaleKey as w, intlMap as E, zhCNIntl as z } from "./intl.js";
import { merge as A } from "./utils/merge.js";
import { defaultToken as H } from "./useStyle/token.js";
import R from "./CacheClean.js";
const q = {}, {
  useCacheToken: F
} = B, p = () => {
  var e, l;
  return !(typeof process < "u" && (((e = process.env.NODE_ENV) == null ? void 0 : e.toUpperCase()) === "TEST" || ((l = process.env.NODE_ENV) == null ? void 0 : l.toUpperCase()) === "DEV") || typeof q < "u" && ("production".toUpperCase() === "TEST" || "production".toUpperCase() === "DEV"));
}, G = () => ({
  autoClearCache: Boolean,
  dark: {
    type: Boolean,
    default: void 0
  },
  compact: {
    type: Boolean,
    default: void 0
  },
  token: Object,
  prefixCls: String,
  valueTypeMap: Object,
  hashed: {
    type: Boolean,
    default: void 0
  }
}), re = /* @__PURE__ */ j({
  name: "ConfigProviderContainer",
  props: G(),
  setup(e, {
    slots: l
  }) {
    var T, P;
    const {
      locale: a,
      getPrefixCls: h,
      ...d
    } = b(), n = (P = (T = K).useToken) == null ? void 0 : P.call(T), o = L(), c = i(() => e.prefixCls ? `.${e.prefixCls}` : `.${h()}-pro`), k = i(() => "." + h()), I = i(() => `${c.value}`), g = s(() => U(e.token || {}, n.token.value || H), [() => e.token, () => n.token.value]), C = s(() => {
      var r, x;
      const t = (r = a == null ? void 0 : a.value) == null ? void 0 : r.locale, u = w(t), v = t && ((x = o.value.intl) == null ? void 0 : x.locale) === "default" ? E[u] : o.value.intl || E[u];
      return {
        ...o.value,
        dark: e.dark ?? o.value.dark,
        compact: e.compact ?? o.value.compact,
        token: A(o.value.token, n.token.value, {
          proComponentsCls: c.value,
          antCls: k.value,
          themeId: n.theme.value.id,
          layout: g.value
        }),
        intl: v || z
      };
    }, [() => a == null ? void 0 : a.value, () => o.value, () => e.dark, () => e.compact, () => n.token.value, () => n.theme.value.id, () => c.value, () => k.value, () => g.value]), y = i(() => {
      var t;
      return {
        ...((t = C.value) == null ? void 0 : t.token) || {},
        proComponentsCls: c.value
      };
    }), m = F(n.theme, i(() => [n.token.value, y.value ?? {}]), i(() => ({
      salt: I.value,
      override: y.value
    }))), f = s(() => e.hashed === !1 || o.value.hashed === !1 ? "" : p() ? m.value[1] : "", [() => m.value[1], () => o.value.hashed, () => e.hashed]), M = s(() => ({
      ...C.value,
      valueTypeMap: e.valueTypeMap || o.value.valueTypeMap,
      token: m.value[0],
      theme: n.theme.value,
      hashed: e.hashed,
      hashId: f.value
    }), [() => C.value, () => e.valueTypeMap, () => m.value[0], () => n.theme.value, () => e.hashed, () => f.value]);
    V(() => a == null ? void 0 : a.value.locale, () => {
      var t;
      $.locale((t = a == null ? void 0 : a.value) == null ? void 0 : t.locale);
    }, {
      immediate: !0
    });
    const N = s(() => {
      var t;
      return {
        ...(t = d.theme) == null ? void 0 : t.value,
        hashed: e.hashed !== !1 && o.value.hashed !== !1 && p(),
        hashId: f.value
      };
    }, [() => {
      var t;
      return (t = d.theme) == null ? void 0 : t.value;
    }, () => f.value, () => e.hashed, () => o.value.hashed, () => p()]);
    return S(M), () => {
      const t = {
        ...Object.keys(d).reduce((u, v) => {
          const r = d[v];
          return O(r) ? u[v] = r.value : u[v] = r, u;
        }, {}),
        theme: N.value,
        prefixCls: h()
      };
      return _(D, t, {
        default: () => {
          var u;
          return [e.autoClearCache && _(R, null, null), (u = l.default) == null ? void 0 : u.call(l)];
        }
      });
    };
  }
});
export {
  re as default,
  p as isNeedOpenHash,
  G as proConfigProviderProps
};

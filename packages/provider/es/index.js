import { defineComponent as A, isRef as C, createVNode as I, computed as c } from "vue";
import { ConfigProvider as P } from "ant-design-vue";
import { useConfigContextInject as g } from "ant-design-vue/es/config-provider/context";
import k from "ant-design-vue/es/locale/zh_CN";
import { proTheme as o } from "./useStyle/index.js";
import { lighten as b, resetComponent as G, setAlpha as L, useStyle as V, useToken as w } from "./useStyle/index.js";
import { useProConfigContextInject as h } from "./context.js";
import { zhCNIntl as s, intlMap as B, findIntlKeyByAntdLocaleKey as R } from "./intl.js";
import { arEGIntl as J, caESIntl as W, createIntl as Y, deDEIntl as _, enGBIntl as q, enUSIntl as Q, esESIntl as X, faIRIntl as Z, frFRIntl as $, hrHRIntl as tt, idIDIntl as et, intlMapKeys as rt, itITIntl as ot, jaJPIntl as nt, koKRIntl as lt, mnMNIntl as it, msMYIntl as at, plPLIntl as ft, ptBRIntl as mt, ruRUIntl as ct, srRSIntl as st, thTHIntl as ut, trTRIntl as dt, viVNIntl as pt, zhTWIntl as It } from "./intl.js";
import x, { proConfigProviderProps as y } from "./ConfigProviderContainer.js";
import { isNeedOpenHash as ht } from "./ConfigProviderContainer.js";
const N = (e) => {
  const l = {};
  if (Object.keys(e || {}).forEach((i) => {
    e[i] !== void 0 && (l[i] = e[i]);
  }), !(Object.keys(l).length < 1))
    return l;
}, u = /* @__PURE__ */ A({
  name: "ProConfigProvider",
  inheritAttrs: !1,
  props: y(),
  setup(e, {
    slots: l
  }) {
    const {
      locale: i,
      theme: a,
      ...d
    } = g(), p = h(), v = () => {
      var f;
      const r = (f = a == null ? void 0 : a.value) == null ? void 0 : f.algorithm, n = e.dark ?? p.value.dark, t = e.compact ?? p.value.compact;
      if (r)
        if (Array.isArray(r)) {
          if (n && !t)
            return [...r || [], o.darkAlgorithm].filter(Boolean);
          if (!n && t)
            return [...r || [], o.compactAlgorithm].filter(Boolean);
          if (n && t)
            return [...r || [], o.darkAlgorithm, o.compactAlgorithm].filter(Boolean);
        } else {
          if (n && !t)
            return [r, o.darkAlgorithm].filter(Boolean);
          if (!n && t)
            return [r, o.compactAlgorithm].filter(Boolean);
          if (n && t)
            return [r, o.darkAlgorithm, o.compactAlgorithm].filter(Boolean);
        }
      else {
        if (n && !t)
          return [o.darkAlgorithm];
        if (!n && t)
          return [o.compactAlgorithm];
        if (n && t)
          return [o.darkAlgorithm, o.compactAlgorithm];
      }
      return r;
    };
    return () => {
      const r = Object.keys(d).reduce((t, f) => {
        const m = d[f];
        return C(m) ? t[f] = m.value : t[f] = m, t;
      }, {}), n = {
        ...r,
        theme: N({
          ...a == null ? void 0 : a.value,
          algorithm: v()
        }),
        locale: (i == null ? void 0 : i.value) || k,
        prefixCls: r.getPrefixCls()
      };
      return I(P, n, {
        default: () => [I(x, e, {
          default: () => {
            var t;
            return [(t = l.default) == null ? void 0 : t.call(l)];
          }
        })]
      });
    };
  }
});
function D() {
  var i, a;
  const {
    locale: e
  } = g(), l = h();
  return ((i = l.value.intl) == null ? void 0 : i.locale) !== "default" ? c(() => l.value.intl || s) : (a = e == null ? void 0 : e.value) != null && a.locale ? c(() => B[R(e.value.locale)] || s) : c(() => s);
}
u.install = (e) => (e.component(u.name, u), e);
export {
  J as arEGIntl,
  W as caESIntl,
  Y as createIntl,
  _ as deDEIntl,
  u as default,
  q as enGBIntl,
  Q as enUSIntl,
  X as esESIntl,
  Z as faIRIntl,
  R as findIntlKeyByAntdLocaleKey,
  $ as frFRIntl,
  tt as hrHRIntl,
  et as idIDIntl,
  B as intlMap,
  rt as intlMapKeys,
  ht as isNeedOpenHash,
  ot as itITIntl,
  nt as jaJPIntl,
  lt as koKRIntl,
  b as lighten,
  it as mnMNIntl,
  at as msMYIntl,
  ft as plPLIntl,
  o as proTheme,
  mt as ptBRIntl,
  G as resetComponent,
  ct as ruRUIntl,
  L as setAlpha,
  st as srRSIntl,
  ut as thTHIntl,
  dt as trTRIntl,
  D as useIntl,
  h as useProConfigContextInject,
  V as useStyle,
  w as useToken,
  pt as viVNIntl,
  s as zhCNIntl,
  It as zhTWIntl
};

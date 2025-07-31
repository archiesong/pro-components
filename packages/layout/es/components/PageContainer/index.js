import { defineComponent as I, onMounted as N, onUnmounted as O, computed as k, isVNode as W, createVNode as r, Fragment as P, mergeProps as y, createTextVNode as G } from "vue";
import { useConfigContextInject as K } from "ant-design-vue/es/config-provider/context";
import { Watermark as U, Affix as _, PageHeader as q, Tabs as D } from "ant-design-vue";
import { useMemo as F, classNames as i } from "@ant-design-vue/pro-utils";
import { useProConfigContextInject as z } from "@ant-design-vue/pro-provider";
import { useRouteContextInject as E } from "../../context/RouteContext.js";
import J from "../GridContent/index.js";
import Q from "../FooterToolbar/index.js";
import { useStylish as X } from "./style/stylish.js";
import { useStyle as Y } from "./style/index.js";
import Z from "../PageLoading/index.js";
import { pageContainerProps as L } from "./pageContainerProps.js";
function V(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !W(e);
}
const ee = (e) => typeof e == "object" ? e : {
  spinning: e
}, ae = ({
  tabList: e,
  tabActiveKey: u,
  onTabChange: o,
  hashId: a,
  tabBarExtraContent: m,
  tabProps: R,
  prefixedClassName: c
}) => Array.isArray(e) || m ? r(D, y(R, {
  class: i(`${c}-tabs`, a),
  activeKey: u,
  onChange: (t) => {
    o && o(t);
  },
  tabBarExtraContent: m
}), {
  default: () => [e == null ? void 0 : e.map((t, $) => r(D.TabPane, y({
    key: t.key || $,
    tab: t.tab
  }, t), null))]
}) : null, re = (e, u, o, a) => !e && !u ? null : r("div", {
  class: i(`${o}-detail`, a)
}, [r("div", {
  class: i(`${o}-main `, a)
}, [r("div", {
  class: i(`${o}-row`, a)
}, [e && r("div", {
  class: i(`${o}-content`, a)
}, [e]), u && r("div", {
  class: i(`${o}-extraContent`, a)
}, [u])])])]), te = (e, u) => {
  var w, b, S;
  const {
    title: o,
    content: a,
    pageHeaderRender: m,
    header: R,
    prefixedClassName: c,
    extraContent: t,
    prefixCls: $,
    hashId: d,
    value: v,
    breadcrumbRender: h,
    ...x
  } = e, l = () => {
    if (h)
      return h;
  };
  if (m === !1)
    return null;
  if (m)
    return r(P, null, [G(" "), m({
      ...e,
      ...v
    })]);
  let n = o;
  !o && o !== !1 && (n = v.title);
  const {
    contentWidth: s,
    layout: M,
    ...p
  } = v, C = {
    ...R,
    ...x,
    ...p,
    title: n,
    footer: ae({
      ...x,
      hashId: d,
      prefixedClassName: c
    })
  }, {
    breadcrumb: f
  } = C, H = (!f || !(f != null && f.itemRender) && !((w = f == null ? void 0 : f.routes) != null && w.length)) && !h;
  if (["title", "subTitle", "extra", "tags", "footer", "avatar", "backIcon"].every((T) => !C[T]) && H && !a && !t)
    return null;
  const g = (b = u.defalut) == null ? void 0 : b.call(u);
  return r(q, y(C, {
    class: i(`${c}-wrap-page-header`, d, {
      [`${c}-wrap-page-header-wide`]: s === "Fixed" && M === "top"
    }),
    breadcrumb: h === !1 ? void 0 : {
      ...v.breadcrumbProps,
      ...C.breadcrumb,
      itemRender: l() || ((S = v.breadcrumbProps) == null ? void 0 : S.itemRender) || C.breadcrumb.itemRender
    },
    prefixCls: $
  }), {
    default: () => [g || re(a, t, c, d)]
  });
}, j = /* @__PURE__ */ I({
  name: "PageContainer",
  inheritAttrs: !1,
  props: L(),
  setup(e, {
    attrs: u,
    slots: o
  }) {
    const a = E();
    N(() => {
      var l, n;
      (n = (l = a.value) == null ? void 0 : l.setHasPageContainer) == null || n.call(l, (a.value.hasPageContainer || 0) + 1);
    }), O(() => {
      var l, n, s;
      !a.value || !((l = a.value) != null && l.setHasPageContainer) || (s = (n = a.value) == null ? void 0 : n.setHasPageContainer) == null || s.call(n, (a.value.hasPageContainer || 0) - 1);
    });
    const m = z(), {
      getPrefixCls: R
    } = K(), c = k(() => e.prefixCls || R("pro")), t = k(() => `${c.value}-page-container`), {
      wrapSSR: $,
      hashId: d
    } = Y(t, k(() => e.token)), v = X(k(() => `${t.value}.${t.value}-stylish`), {
      stylish: k(() => e.stylish)
    }), h = F(() => {
      var l, n;
      return e.breadcrumbRender == !1 ? !1 : e.breadcrumbRender || ((n = (l = e == null ? void 0 : e.header) == null ? void 0 : l.breadcrumb) == null ? void 0 : n.itemRender);
    }, [() => e.breadcrumbRender, () => {
      var l, n;
      return (n = (l = e == null ? void 0 : e.header) == null ? void 0 : l.breadcrumb) == null ? void 0 : n.itemRender;
    }]), x = F(() => {
      if (W(e.loading || !1))
        return e.loading || !1;
      if (typeof (e.loading || !1) == "boolean" && !e.loading)
        return null;
      const l = ee(e.loading || !1);
      return l.spinning ? r(Z, l, null) : null;
    }, [() => e.loading || !1]);
    return () => {
      var T, A, B;
      const {
        loading: l,
        footer: n,
        affixProps: s,
        token: M,
        fixedHeader: p,
        breadcrumbRender: C,
        footerToolBarProps: f,
        ...H
      } = e, g = te({
        ...H,
        breadcrumbRender: h.value,
        ghost: !0,
        hashId: d.value,
        prefixCls: void 0,
        prefixedClassName: t.value,
        value: {
          title: a.value.title,
          breadcrumb: a.value.breadcrumb,
          breadcrumbProps: a.value.breadcrumbProps,
          contentWidth: a.value.contentWidth,
          layout: a.value.layout
        }
      }, o), w = r(P, null, [o.default ? r(P, null, [r("div", {
        class: i(`${t.value}-children-content`, d.value, {
          [`${t.value}-children-content-no-header`]: !g
        })
      }, [(T = o.default) == null ? void 0 : T.call(o)])]) : null]), b = r(P, null, [e.waterMarkProps || a.value.waterMarkProps ? r(U, {
        ...a.value.waterMarkProps,
        ...e.waterMarkProps
      }, {
        default: () => [x.value || w]
      }) : r(P, null, [x.value || w])]), S = i(t.value, d.value, u.class, {
        [`${t.value}-with-footer`]: n,
        [`${t.value}-with-affix`]: p && g,
        [`${t.value}-stylish`]: !!H.stylish
      });
      return $(v.wrapSSR(r(P, null, [r("div", y(u, {
        class: S
      }), [p && g ? (
        // 在 hasHeader 且 fixedHeader 的情况下，才需要设置高度
        r(_, y(s, {
          offsetTop: a.value.hasHeader && a.value.fixedHeader ? (B = (A = m.value.token.layout) == null ? void 0 : A.header) == null ? void 0 : B.heightLayoutHeader : 1,
          target: s == null ? void 0 : s.target,
          class: i(`${t.value}-affix`, d.value)
        }), {
          default: () => [r("div", {
            class: i(`${t.value}-wrap`, d.value)
          }, [g])]
        })
      ) : r("div", {
        class: i(`${t.value}-wrap`, d.value)
      }, [g]), b && r(J, null, V(b) ? b : {
        default: () => [b]
      })]), n && r(Q, y(f, {
        stylish: H.footerStylish,
        prefixCls: c.value
      }), V(n) ? n : {
        default: () => [n]
      })])));
    };
  }
});
j.install = (e) => (e.component(j.name, j), e);
export {
  j as default
};

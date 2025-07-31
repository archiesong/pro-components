import { defineComponent as Ue, computed as n, toRef as Xe, createVNode as u, Fragment as Ye, mergeProps as V } from "vue";
import { Layout as ze, ConfigProvider as Ze } from "ant-design-vue";
import _e from "ant-design-vue/es/_util/warning";
import { useMemo as f, useCallback as pe, useBreakpoint as et, useMountMergeState as tt, omit as at, useState as Ve, useDocumentTitle as lt, classNames as ot } from "@ant-design-vue/pro-utils";
import { useProConfigContextInject as nt, setAlpha as ut, isNeedOpenHash as rt } from "@ant-design-vue/pro-provider";
import { useStyle as it } from "./style/index.js";
import { gLocaleObject as ct } from "./locales/index.js";
import dt from "./utils/getMenuData.js";
import { getMatchMenu as mt } from "@ant-design-vue/route-utils";
import vt from "./components/Header/index.js";
import st from "./components/Footer/index.js";
import { useConfigContextInject as ft } from "ant-design-vue/es/config-provider/context";
import gt from "./utils/useCurrentMenuLayoutProps.js";
import { clearMenuItem as ht } from "./utils/index.js";
import Fe from "./components/SiderMenu/index.js";
import yt from "./WrapContent.js";
import { proLayoutProps as Mt } from "./proLayoutProps.js";
import { useRouteContextInject as kt, useRouteContextProvider as bt } from "./context/RouteContext.js";
import Bt from "./components/PageLoading/index.js";
import { getPageTitleInfo as Ne } from "./getPageTitle.js";
import { getBreadcrumbProps as xt } from "./utils/getBreadcrumbProps.js";
const It = (e, l) => {
  var o;
  return e.headerRender === !1 || e.pure ? null : u(vt, V({
    matchMenuKeys: l
  }, e, {
    stylish: (o = e.stylish) == null ? void 0 : o.header
  }), null);
}, Tt = (e, l) => {
  const {
    pageTitleRender: o
  } = l, c = Ne(e);
  if (o === !1)
    return {
      title: l.title || "",
      id: "",
      pageName: ""
    };
  if (o) {
    const r = o(e, c.title, c);
    if (typeof r == "string")
      return Ne({
        ...c,
        title: r
      });
    _e(typeof r == "string", "pro-layout: ", "renderPageTitle return value should be a string");
  }
  return c;
}, St = (e, l, o, c) => e ? l ? c : o : 0, Ct = (e, l) => {
  var b, d, v, B;
  const {
    layout: o,
    isMobile: c,
    selectedKeys: r,
    openKeys: $,
    splitMenus: i,
    suppressSiderWhenMenuEmpty: F,
    menuRender: S
  } = e;
  if (e.menuRender === !1 || e.pure)
    return null;
  let {
    menuData: t
  } = e;
  if (i && ($ !== !1 || o === "mix") && !c) {
    const [C] = r || l;
    C ? t = ((d = (b = e.menuData) == null ? void 0 : b.find((z) => z.key === C)) == null ? void 0 : d.children) || [] : t = [];
  }
  const g = ht(t || []);
  if (g && (g == null ? void 0 : g.length) < 1 && (i || F))
    return null;
  if (o === "top" && !c)
    return u(Fe, V(e, {
      matchMenuKeys: l,
      hide: !0,
      stylish: (v = e.stylish) == null ? void 0 : v.sider
    }), null);
  const w = u(Fe, V(e, {
    matchMenuKeys: l,
    menuData: g,
    stylish: (B = e.stylish) == null ? void 0 : B.sider
  }), null);
  return S ? S(e, w) : w;
}, Lt = (e) => e.tagsViewRender === !1 || e.pure ? null : e.tagsViewRender ? e.tagsViewRender(e) : null, Pt = (e) => e.footerRender === !1 || e.pure ? null : e.footerRender ? e.footerRender({
  ...e
}, u(st, null, null)) : null, Yt = /* @__PURE__ */ Ue({
  name: "BasicLayout",
  inheritAttrs: !1,
  props: Mt(),
  setup(e, {
    slots: l,
    attrs: o
  }) {
    const {
      getPrefixCls: c,
      locale: r
    } = ft(), $ = n(() => e.prefixCls ?? c("pro")), i = n(() => `${$.value}-basicLayout`), {
      wrapSSR: F,
      hashId: S
    } = it(i), t = nt(), g = f(() => e.siderWidth || 256, [() => e.layout, () => e.siderWidth]), w = f(() => e.collapsedWidth || 64, [() => e.collapsedWidth]), b = pe(({
      id: a,
      defaultMessage: s,
      ...k
    }) => {
      if (e.formatMessage)
        return e.formatMessage({
          id: a,
          defaultMessage: s,
          ...k
        });
      const h = ct(r == null ? void 0 : r.value.locale);
      return h[a] ? h[a] : s;
    }, [() => e.formatMessage, () => r == null ? void 0 : r.value]), d = f(() => dt(e.routes || [], e.menu, b.value, e.menuDataRender), [() => b.value, () => e.menu, () => e.menuDataRender, () => e.routes]), v = f(() => {
      var a;
      return mt(((a = e.location) == null ? void 0 : a.pathname) || "/", d.value.menuData || [], !0);
    }, [() => (e.location || {}).pathname, () => d.value.menuData]), B = f(() => Array.from(new Set(v.value.map((a) => a.key || a.path || ""))), [() => v.value]), C = f(() => v.value[v.value.length - 1] || {}, [() => v.value]), z = gt(C), x = et(), m = f(() => (x.value === "sm" || x.value === "xs") && !e.disableMobile, [() => x.value, () => e.disableMobile]), je = n(() => e.layout !== "top" && !m.value), [I, K] = tt(() => e.defaultCollapsed !== void 0 ? e.defaultCollapsed : m.value ? !0 : x.value === "md", {
      value: e.collapsed === void 0 ? void 0 : Xe(e, "collapsed"),
      onChange: e.onCollapse
    }), G = n(() => St(!!je.value, I.value, g.value, w.value)), M = n(() => {
      var a;
      return at({
        ...e,
        prefixCls: $.value,
        siderWidth: g.value,
        ...z.value,
        formatMessage: b.value,
        breadcrumb: d.value.breadcrumb,
        menu: {
          ...e.menu,
          type: e.siderMenuType || ((a = e.menu) == null ? void 0 : a.type)
        }
      }, ["breadcrumbRender"]);
    }), Ke = kt(), Ge = n(() => xt({
      ...M.value,
      breadcrumbRender: e.breadcrumbRender,
      breadcrumbMap: d.value.breadcrumbMap
    }, e)), O = n(() => e.isChildrenLayout !== void 0 ? e.isChildrenLayout : Ke.value.isChildrenLayout), [E, Oe] = Ve(!1), [q, Ee] = Ve(0), N = n(() => {
      var a;
      return Tt({
        ...M.value,
        pathname: ((a = e.location || {}) == null ? void 0 : a.pathname) || "/",
        breadcrumbMap: d.value.breadcrumbMap
      }, e);
    }), J = f(() => e.bgLayoutImgList && e.bgLayoutImgList.length > 0 ? e.bgLayoutImgList.map(({
      src: a,
      ...s
    }, k) => u("img", {
      key: k,
      src: a,
      alt: "",
      style: {
        position: "absolute",
        ...Object.entries(s).reduce((h, [T, y]) => ({
          ...h,
          [T]: typeof y == "number" ? `${y}px` : y
        }), {})
      }
    }, null)) : null, [() => e.bgLayoutImgList]), j = n(() => Ct({
      ...M.value,
      menuData: d.value.menuData,
      onCollapse: K,
      isMobile: m.value,
      collapsed: I.value
    }, B.value)), Q = n(() => It({
      ...M.value,
      hasSiderMenu: !!j.value,
      menuData: d.value.menuData,
      isMobile: m.value,
      collapsed: I.value,
      onCollapse: K
    }, B.value)), qe = n(() => Lt({
      ...M.value,
      siderWidth: G.value,
      isMobile: m.value,
      collapsed: I.value
    })), U = n(() => Pt({
      ...M.value,
      isMobile: m.value,
      collapsed: I.value
    })), Je = n(() => ({
      ...M.value,
      breadcrumb: Ge.value,
      menuData: d.value.menuData,
      isMobile: m.value,
      collapsed: I.value,
      title: N.value.pageName,
      pageTitleInfo: N.value,
      hasSiderMenu: !!j.value,
      isChildrenLayout: !0,
      siderWidth: G.value,
      matchMenus: v.value,
      matchMenuKeys: B.value,
      currentMenu: C.value,
      hasFooter: !!U.value,
      hasFooterToolbar: E.value,
      hasPageContainer: q.value,
      setHasFooterToolbar: Oe,
      setHasPageContainer: Ee
    }));
    bt(Je), lt(N, n(() => e.title || !1));
    const Qe = f(() => {
      var a, s, k, h, T, y, L, P, H, R, D, A, W, X, Y, Z, _, p, ee, te, ae, le, oe, ne, ue, re, ie, ce, de, me, ve, se, fe, ge, he, ye, Me, ke, be, Be, xe, Ie, Te, Se, Ce, Le, Pe, He, Re, De, Ae, We, $e, we;
      return e.navTheme === "realDark" && e.layout !== "mix" || e.navTheme === "dark" && e.layout !== "mix" || e.layout === "mix" && m.value && e.navTheme === "realDark" || e.layout === "mix" && m.value && e.navTheme === "dark" ? {
        colorItemBg: ((s = (a = e.token) == null ? void 0 : a.sider) == null ? void 0 : s.colorMenuBackground) || "#001529",
        colorSubItemBg: ((h = (k = e.token) == null ? void 0 : k.sider) == null ? void 0 : h.colorSubMenuBackground) || "#000c17",
        radiusItem: t.value.token.borderRadiusLG,
        colorItemBgSelected: ((y = (T = e.token) == null ? void 0 : T.sider) == null ? void 0 : y.colorBgMenuItemSelected) || ((L = t.value.token) == null ? void 0 : L.colorPrimary),
        colorItemBgHover: ((H = (P = e.token) == null ? void 0 : P.sider) == null ? void 0 : H.colorBgMenuItemHover) || "transparent",
        colorItemBgActive: ((D = (R = e.token) == null ? void 0 : R.sider) == null ? void 0 : D.colorBgMenuItemActive) || "transparent",
        colorItemBgSelectedHorizontal: ((W = (A = e.token) == null ? void 0 : A.sider) == null ? void 0 : W.colorBgMenuItemSelectedHorizontal) || t.value.token.colorPrimary,
        colorActiveBarWidth: ((Y = (X = e.token) == null ? void 0 : X.sider) == null ? void 0 : Y.colorTextMenuActiveBarWidth) || 0,
        colorActiveBarHeight: ((_ = (Z = e.token) == null ? void 0 : Z.sider) == null ? void 0 : _.colorTextMenuActiveBarHeight) || 0,
        colorActiveBarBorderSize: ((ee = (p = e.token) == null ? void 0 : p.sider) == null ? void 0 : ee.colorTextMenuActiveBarBorderSize) || 0,
        colorItemText: ((ae = (te = e.token) == null ? void 0 : te.sider) == null ? void 0 : ae.colorTextMenu) || ut((le = t.value.token) == null ? void 0 : le.colorTextLightSolid, 0.65),
        colorItemTextHover: ((ne = (oe = e.token) == null ? void 0 : oe.sider) == null ? void 0 : ne.colorTextMenuItemHover) || t.value.token.colorTextLightSolid,
        // 悬浮态
        colorItemTextSelected: ((re = (ue = e.token) == null ? void 0 : ue.sider) == null ? void 0 : re.colorTextMenuSelected) || t.value.token.colorTextLightSolid
      } : {
        colorItemBg: ((ce = (ie = t.value.token.layout) == null ? void 0 : ie.sider) == null ? void 0 : ce.colorMenuBackground) || "transparent",
        colorSubItemBg: ((me = (de = t.value.token.layout) == null ? void 0 : de.sider) == null ? void 0 : me.colorSubMenuBackground) || "transparent",
        radiusItem: t.value.token.borderRadiusLG,
        colorItemBgSelected: ((se = (ve = t.value.token.layout) == null ? void 0 : ve.sider) == null ? void 0 : se.colorBgMenuItemSelected) || ((fe = t.value.token) == null ? void 0 : fe.controlItemBgActive),
        colorItemBgHover: ((he = (ge = t.value.token.layout) == null ? void 0 : ge.sider) == null ? void 0 : he.colorBgMenuItemHover) || ((ye = t.value.token) == null ? void 0 : ye.colorBgTextHover),
        colorItemBgActive: ((ke = (Me = t.value.token.layout) == null ? void 0 : Me.sider) == null ? void 0 : ke.colorBgMenuItemActive) || ((be = t.value.token) == null ? void 0 : be.colorFillContent),
        colorItemBgSelectedHorizontal: ((xe = (Be = t.value.token.layout) == null ? void 0 : Be.sider) == null ? void 0 : xe.colorBgMenuItemSelectedHorizontal) || "transparent",
        colorActiveBarWidth: ((Te = (Ie = t.value.token.layout) == null ? void 0 : Ie.sider) == null ? void 0 : Te.colorTextMenuActiveBarWidth) || 0,
        colorActiveBarHeight: ((Ce = (Se = t.value.token.layout) == null ? void 0 : Se.sider) == null ? void 0 : Ce.colorTextMenuActiveBarHeight) || t.value.token.lineWidthBold,
        colorActiveBarBorderSize: ((Pe = (Le = t.value.token.layout) == null ? void 0 : Le.sider) == null ? void 0 : Pe.colorTextMenuActiveBarBorderSize) || t.value.token.lineWidth,
        colorItemText: ((Re = (He = t.value.token.layout) == null ? void 0 : He.sider) == null ? void 0 : Re.colorTextMenu) || ((De = t.value.token) == null ? void 0 : De.colorText),
        colorItemTextHover: ((We = (Ae = t.value.token.layout) == null ? void 0 : Ae.sider) == null ? void 0 : We.colorTextMenuItemHover) || t.value.token.colorText,
        // 悬浮态
        colorItemTextSelected: ((we = ($e = t.value.token.layout) == null ? void 0 : $e.sider) == null ? void 0 : we.colorTextMenuSelected) || t.value.token.colorPrimary
      };
    }, [() => e.navTheme, () => m.value, () => e.layout, () => e.token, () => t.value.token]);
    return () => {
      var L;
      const {
        fixedSiderbar: a,
        contentStyle: s,
        navTheme: k,
        layout: h,
        ...T
      } = {
        ...e,
        ...z.value
      }, y = ot(o.class, S.value, i.value, {
        [`screen-${x.value}`]: x.value,
        [`${i.value}-is-children`]: O.value,
        [`${i.value}-fix-siderbar`]: a,
        [`${i.value}-realDark`]: e.navTheme === "realDark",
        [`${i.value}-${e.layout}`]: e.layout
      });
      return F(u(Ye, null, [e.pure ? (L = l.default) == null ? void 0 : L.call(l) : u(ze, {
        class: y,
        style: o.style
      }, {
        default: () => {
          var P, H, R;
          return [J.value && u("div", {
            class: `${i.value}-bg-list ${S.value}`
          }, [J.value]), u(Ze, {
            theme: {
              hashed: rt(),
              token: {
                controlHeightLG: ((H = (P = t.value.token.layout) == null ? void 0 : P.sider) == null ? void 0 : H.menuHeight) || ((R = t.value.token) == null ? void 0 : R.controlHeightLG)
              },
              components: {
                Menu: Qe.value
              }
            }
          }, {
            default: () => [j.value]
          }), u(ze, null, {
            default: () => {
              var D, A;
              return [Q.value, qe.value, u(yt, V(T, {
                hasPageContainer: q.value,
                isChildrenLayout: O.value,
                hasHeader: !!Q.value,
                prefixCls: i.value,
                style: s
              }), {
                default: () => {
                  var W;
                  return [e.loading ? u(Bt, null, null) : (W = l.default) == null ? void 0 : W.call(l)];
                }
              }), U.value, E.value && u("div", {
                class: `${i.value}-has-footer`,
                style: {
                  height: "44px",
                  marginBlockStart: `${(A = (D = t.value.token.layout) == null ? void 0 : D.pageContainer) == null ? void 0 : A.paddingBlockPageContainerContent}px`
                }
              }, null)];
            }
          })];
        }
      })]));
    };
  }
});
export {
  Yt as default
};

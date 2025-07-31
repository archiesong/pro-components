import { defineComponent as S, isRef as q, createVNode as d, mergeProps as m } from "vue";
import { ConfigProvider as z } from "ant-design-vue";
import G from "@ant-design-vue/pro-provider";
import { useConfigContextInject as J } from "ant-design-vue/es/config-provider/context";
import K from "./BasicLayout.js";
import { getSlot as r, isBrowser as Q } from "@ant-design-vue/pro-utils";
import { Logo as U } from "./assert/Logo.js";
import { proLayoutProps as W } from "./proLayoutProps.js";
import X from "./LeftMenuLayout.js";
const u = /* @__PURE__ */ S({
  name: "ProLayout",
  inheritAttrs: !1,
  props: W(),
  emits: ["update:collapsed", "collapse"],
  setup(e, {
    slots: n,
    attrs: g,
    emit: i
  }) {
    const R = J();
    return () => {
      var C;
      const {
        colorPrimary: f,
        navTheme: l,
        prefixCls: P
      } = e, o = Object.keys(R).reduce((t, a) => {
        const c = R[a];
        return q(c) ? t[a] = c.value : t[a] = c, t;
      }, {}), h = l !== void 0 ? {
        dark: l === "realDark"
      } : {}, L = e.compact !== void 0 ? {
        compact: e.compact
      } : {}, y = r(n, e, "footerRender"), x = r(n, e, "breadcrumbRender"), b = r(n, e, "pageTitleRender"), k = r(n, e, "actionsRender"), B = r(n, e, "collapsedButtonRender"), I = r(n, e, "appListRender"), T = r(n, e, "headerRender"), v = r(n, e, "headerTitleRender"), w = r(n, e, "headerContentRender"), M = r(n, e, "menuRender"), V = r(n, e, "menuItemRender"), j = r(n, e, "subMenuItemRender"), E = r(n, e, "menuHeaderRender"), F = r(n, e, "menuContentRender"), H = r(n, e, "menuExtraRender"), A = r(n, e, "menuFooterRender"), D = r(n, e, "tagsViewRender"), N = r(n, e, "errorBoundaryRender"), O = e.layout === "left" ? X : K;
      return d(z, m(o, {
        prefixCls: o.getPrefixCls(),
        theme: f ? {
          ...o.theme,
          token: {
            ...(C = o.theme) == null ? void 0 : C.token,
            colorPrimary: f
          }
        } : void 0
      }), {
        default: () => [d(G, m({
          autoClearCache: !0
        }, h, L, {
          token: e.token,
          prefixCls: P
        }), {
          default: () => [d(O, m({
            ...e,
            pageTitleRender: b,
            footerRender: y,
            breadcrumbRender: x,
            errorBoundaryRender: N,
            collapsedButtonRender: B,
            appListRender: I,
            actionsRender: k,
            menuItemRender: V,
            menuRender: M,
            menuExtraRender: H,
            menuHeaderRender: E,
            menuContentRender: F,
            menuFooterRender: A,
            tagsViewRender: D,
            subMenuItemRender: j,
            headerRender: T,
            headerContentRender: w,
            headerTitleRender: v
          }, g, {
            logo: e.logo || d(U, null, null),
            location: Q() ? e.location || {
              pathname: location.pathname || "/"
            } : void 0,
            onCollapse: (t) => {
              i("update:collapsed", t), i("collapse", t);
            }
          }), {
            default: () => {
              var t;
              return [(t = n.default) == null ? void 0 : t.call(n)];
            }
          })]
        })]
      });
    };
  }
});
u.install = (e) => (e.component(u.name, u), e);
export {
  u as default
};

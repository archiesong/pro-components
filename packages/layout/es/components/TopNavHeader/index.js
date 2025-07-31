import { defineComponent as me, computed as ae, createVNode as a, mergeProps as re } from "vue";
import { ConfigProvider as ie } from "ant-design-vue";
import { useMemo as ne, classNames as n } from "@ant-design-vue/pro-utils";
import { privateSiderMenuProps as ve, siderMenuProps as he, renderLogoAndTitle as ke } from "../SiderMenu/SiderMenu.js";
import { useConfigContextInject as se } from "ant-design-vue/es/config-provider/context";
import Te from "../SiderMenu/BaseMenu.js";
import xe from "../GlobalHeader/ActionsContent.js";
import { useStyle as fe } from "./style/index.js";
import ye from "../AppsLogoComponents/index.js";
import { globalHeaderProps as ge } from "../GlobalHeader/globalHeaderProps.js";
import { useProConfigContextInject as Ie, setAlpha as He, isNeedOpenHash as Me } from "@ant-design-vue/pro-provider";
const Se = () => ({
  ...he(),
  ...ge(),
  ...ve()
}), je = /* @__PURE__ */ me({
  name: "TopNavHeader",
  inheritAttrs: !1,
  props: Se(),
  setup(e, {
    attrs: v
  }) {
    const {
      getPrefixCls: ue
    } = se(), o = Ie(), t = ae(() => `${e.prefixCls || ue("pro")}-top-nav-header`), {
      wrapSSR: ce,
      hashId: r
    } = fe(t), h = ae(() => {
      let l;
      return e.menuHeaderRender !== void 0 ? l = "menuHeaderRender" : (e.layout === "mix" || e.layout === "top") && (l = "headerTitleRender"), ke({
        ...e,
        collapsed: !1
      }, l);
    }), k = ne(() => {
      var l, u, c, d, m, i, s, T, x, f, y, g, I, H, M, S, B, C, P, R, A, z, $, L, D, N, b, j, w, G, K, F, O, V, W, q, E, J, Q, U, X, Y, Z, _, p, ee, oe, te, le;
      return e.navTheme === "realDark" && e.layout !== "mix" || e.navTheme === "dark" && e.layout !== "side" || e.layout === "mix" && e.splitMenus && e.navTheme === "realDark" || e.layout === "mix" && e.splitMenus && e.navTheme === "dark" ? {
        colorItemBg: ((u = (l = e.token) == null ? void 0 : l.header) == null ? void 0 : u.colorBgHeader) || "#001529",
        radiusItem: o.value.token.borderRadiusLG,
        colorItemBgSelected: ((d = (c = e.token) == null ? void 0 : c.header) == null ? void 0 : d.colorBgMenuItemSelected) || ((m = o.value.token) == null ? void 0 : m.colorPrimary),
        colorItemBgHover: ((s = (i = e.token) == null ? void 0 : i.header) == null ? void 0 : s.colorBgMenuItemHover) || "transparent",
        colorItemBgSelectedHorizontal: ((x = (T = e.token) == null ? void 0 : T.header) == null ? void 0 : x.colorBgMenuItemSelectedHorizontal) || o.value.token.colorPrimary,
        colorItemText: ((y = (f = e.token) == null ? void 0 : f.header) == null ? void 0 : y.colorTextMenu) || He((g = o.value.token) == null ? void 0 : g.colorTextLightSolid, 0.65),
        colorItemTextHoverHorizontal: ((H = (I = e.token) == null ? void 0 : I.header) == null ? void 0 : H.colorTextMenuActive) || ((M = o.value.token) == null ? void 0 : M.colorText),
        colorItemTextSelectedHorizontal: ((B = (S = e.token) == null ? void 0 : S.header) == null ? void 0 : B.colorTextMenuSelected) || ((C = o.value.token) == null ? void 0 : C.colorTextLightSolid),
        colorItemTextHover: ((R = (P = o.value.token.layout) == null ? void 0 : P.header) == null ? void 0 : R.colorTextMenuActive) || ((A = o.value.token) == null ? void 0 : A.colorText),
        colorItemTextSelected: (($ = (z = e.token) == null ? void 0 : z.header) == null ? void 0 : $.colorTextMenuSelected) || ((L = o.value.token) == null ? void 0 : L.colorTextLightSolid)
      } : {
        colorItemBg: ((N = (D = o.value.token.layout) == null ? void 0 : D.header) == null ? void 0 : N.colorBgHeader) || "transparent",
        radiusItem: o.value.token.borderRadiusLG,
        colorItemBgSelected: ((j = (b = o.value.token.layout) == null ? void 0 : b.header) == null ? void 0 : j.colorBgMenuItemSelected) || ((w = o.value.token) == null ? void 0 : w.controlItemBgActive),
        colorItemBgHover: ((K = (G = o.value.token.layout) == null ? void 0 : G.header) == null ? void 0 : K.colorBgMenuItemHover) || ((F = o.value.token) == null ? void 0 : F.colorBgTextHover),
        colorItemBgSelectedHorizontal: ((V = (O = o.value.token.layout) == null ? void 0 : O.header) == null ? void 0 : V.colorBgMenuItemSelectedHorizontal) || "transparent",
        colorItemText: ((q = (W = o.value.token.layout) == null ? void 0 : W.header) == null ? void 0 : q.colorTextMenu) || ((E = o.value.token) == null ? void 0 : E.colorText),
        colorItemTextHoverHorizontal: ((Q = (J = o.value.token.layout) == null ? void 0 : J.header) == null ? void 0 : Q.colorTextMenuActive) || ((U = o.value.token) == null ? void 0 : U.colorPrimary),
        colorItemTextSelectedHorizontal: ((Y = (X = o.value.token.layout) == null ? void 0 : X.header) == null ? void 0 : Y.colorTextMenuSelected) || ((Z = o.value.token) == null ? void 0 : Z.colorPrimary),
        colorItemTextHover: ((p = (_ = o.value.token.layout) == null ? void 0 : _.header) == null ? void 0 : p.colorTextMenuActive) || ((ee = o.value.token) == null ? void 0 : ee.colorPrimary),
        colorItemTextSelected: ((te = (oe = o.value.token.layout) == null ? void 0 : oe.header) == null ? void 0 : te.colorTextMenuSelected) || ((le = o.value.token) == null ? void 0 : le.colorPrimary)
      };
    }, [() => e.navTheme, () => e.splitMenus, () => e.layout, () => e.token, () => o.value.token]), de = ne(() => {
      const l = a(ie, {
        theme: {
          hashed: Me(),
          components: {
            Menu: k.value
          }
        }
      }, {
        default: () => [a(Te, re(e, {
          class: n(`${t.value}-base-menu`, r.value),
          theme: e.navTheme !== "realDark" ? e.navTheme : "dark",
          collapsed: !1,
          menuRenderType: "header",
          mode: "horizontal"
        }), null)]
      });
      return e.headerContentRender ? e.headerContentRender(e, l) : l;
    }, [() => e.matchMenuKeys, () => e.navTheme, () => e.layout, () => k.value, () => e.headerContentRender, () => t.value, () => r.value]);
    return () => {
      const {
        contentWidth: l,
        layout: u,
        actionsRender: c,
        onMenuHeaderClick: d,
        navTheme: m,
        avatarProps: i
      } = e;
      return ce(a("div", {
        class: n(t.value, r.value, v.class, {
          [`${t.value}-${m}`]: !0
        }),
        style: v.style
      }, [a("div", {
        class: n(`${t.value}-main`, r.value, {
          [`${t.value}-wide`]: l === "Fixed" && u === "top"
        })
      }, [h.value && a("div", {
        class: n(`${t.value}-main-left`, r.value),
        onClick: d
      }, [a(ye, e, null), a("div", {
        class: n(`${t.value}-logo`, r.value),
        key: "logo",
        id: "logo"
      }, [h.value])]), a("div", {
        style: {
          flex: 1
        },
        class: n(`${t.value}-menu`, r.value)
      }, [de.value]), (c || i) && a(xe, re(e, {
        prefixCls: t.value
      }), null)])]));
    };
  }
});
export {
  je as default,
  Se as topNavHeaderProps
};

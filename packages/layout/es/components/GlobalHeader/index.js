import { defineComponent as A, computed as H, createVNode as o, mergeProps as v, Fragment as L } from "vue";
import { privateSiderMenuProps as T, renderLogoAndTitle as R } from "../SiderMenu/SiderMenu.js";
import { useConfigContextInject as j } from "ant-design-vue/es/config-provider/context";
import { useStyle as G } from "./style/index.js";
import { classNames as d } from "@ant-design-vue/pro-utils";
import { clearMenuItem as w } from "../../utils/index.js";
import { useProConfigContextInject as z } from "@ant-design-vue/pro-provider";
import F from "../CollapsedIcon/index.js";
import V from "../AppsLogoComponents/index.js";
import { globalHeaderProps as X } from "./globalHeaderProps.js";
import q from "./ActionsContent.js";
import B from "../TopNavHeader/index.js";
import { defaultRenderLogo as E } from "../AppsLogoComponents/DefaultContent.js";
const J = (e, n, i) => e === !1 ? null : e ? e(n, null, i) : n, ne = /* @__PURE__ */ A({
  name: "GlobalHeader",
  inheritAttrs: !1,
  props: {
    ...X(),
    ...T()
  },
  setup(e, {
    slots: n,
    attrs: i
  }) {
    const {
      getPrefixCls: g,
      direction: s
    } = j(), C = z(), l = H(() => `${e.prefixCls || g("pro")}-global-header`), {
      wrapSSR: x,
      hashId: u
    } = G(l);
    return () => {
      var p;
      const {
        navTheme: t,
        layout: a,
        isMobile: r,
        onCollapse: m,
        menuHeaderRender: h,
        actionsRender: k,
        avatarProps: $,
        onMenuHeaderClick: b,
        logo: M,
        menuData: D,
        splitMenus: I,
        collapsed: c
      } = e;
      if (a === "mix" && !r && I) {
        const S = (D || []).map((N) => ({
          ...N,
          children: void 0
        })), y = w(S);
        return o(B, v(e, {
          mode: "horizontal",
          splitMenus: !1,
          menuData: y
        }), null);
      }
      const f = d(`${l.value}-logo`, u.value, {
        [`${l.value}-logo-rtl`]: (s == null ? void 0 : s.value) === "rtl",
        [`${l.value}-logo-mix`]: a === "mix",
        [`${l.value}-logo-mobile`]: r
      }), P = o("span", {
        class: f,
        key: "logo"
      }, [o("a", null, [E(M)])]);
      return x(o("div", {
        class: d(i.class, l.value, u.value, {
          [`${l.value}-light`]: t === "light" || a === "side" && t !== "realDark" || r,
          [`${l.value}-dark`]: t === "dark" && a !== "side" && !r,
          [`${l.value}-realDark`]: t === "realDark" && a !== "mix"
        })
      }, [r && J(h, P, e), a === "mix" && !r && o(L, null, [o(V, e, null), o("div", {
        class: f,
        onClick: b
      }, [R({
        ...e,
        collapsed: !1
      }, "headerTitleRender")])]), r || a === "side" ? o("span", {
        class: d(`${l.value}-collapsed-button`, u.value),
        style: {
          marginInlineStart: `${C.value.token.marginXS}px`
        },
        onClick: () => m == null ? void 0 : m(!c)
      }, [o(F, {
        collapsed: c,
        tabIndex: "-1"
      }, null)]) : null, o("div", {
        style: {
          flex: 1
        }
      }, [(p = n.default) == null ? void 0 : p.call(n)]), (k || $) && o(q, v(e, {
        prefixCls: l.value
      }), null)]));
    };
  }
});
export {
  ne as default
};

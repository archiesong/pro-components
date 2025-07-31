import { defineComponent as j, computed as d, createVNode as s, Fragment as m, mergeProps as D, Teleport as M, createTextVNode as R } from "vue";
import { useMemo as C, useEffect as N, classNames as v, omit as P, isBrowser as B } from "@ant-design-vue/pro-utils";
import { useStyle as H } from "./style/index.js";
import { useStylish as I } from "./style/stylish.js";
import { useRouteContextInject as O } from "../../context/RouteContext.js";
import { useConfigContextInject as W } from "ant-design-vue/es/config-provider/context";
const V = () => ({
  extra: {
    type: Object,
    default: void 0
  },
  footerToolbarContentRender: {
    type: [Function, Boolean, Object],
    default: void 0
  },
  prefixCls: {
    type: String,
    default: void 0
  },
  stylish: {
    type: Object,
    default: void 0
  },
  portalDom: {
    type: Boolean,
    default: void 0
  }
}), G = /* @__PURE__ */ j({
  name: "FooterToolbar",
  inheritAttrs: !1,
  props: V(),
  setup(a, {
    slots: f,
    attrs: p
  }) {
    const {
      getPrefixCls: S,
      getTargetContainer: n
    } = W(), w = d(() => a.prefixCls || S("pro")), l = d(() => `${w.value}-footer-bar`), {
      wrapSSR: F,
      hashId: c
    } = H(l), e = O(), y = C(() => {
      const {
        hasSiderMenu: t,
        isMobile: o,
        siderWidth: r
      } = e.value;
      if (t)
        return r ? o ? "100%" : `calc(100% - ${r}px)` : "100%";
    }, [() => e.value.collapsed, () => e.value.hasSiderMenu, () => e.value.isMobile, () => e.value.siderWidth]), h = C(() => {
      var t;
      return typeof window > "u" || typeof document > "u" ? null : ((t = n == null ? void 0 : n.value) == null ? void 0 : t.call(n)) || document.body;
    }, []), T = I(d(() => `${l.value}.${l.value}-stylish`), {
      stylish: d(() => a.stylish)
    });
    return N(() => {
      var t, o, r;
      return !e.value || !((t = e.value) != null && t.setHasFooterToolbar) ? () => {
      } : ((r = (o = e.value) == null ? void 0 : o.setHasFooterToolbar) == null || r.call(o, !0), () => {
        var u, i;
        (i = (u = e.value) == null ? void 0 : u.setHasFooterToolbar) == null || i.call(u, !1);
      });
    }, []), () => {
      var x;
      const {
        extra: t,
        footerToolbarContentRender: o,
        portalDom: r = !0,
        ...u
      } = a, i = s(m, null, [s("div", {
        class: v(`${l.value}-left`, c.value)
      }, [t]), s("div", {
        class: v(`${l.value}-right`, c.value)
      }, [(x = f.default) == null ? void 0 : x.call(f)])]), b = s("div", D({
        class: v(p.class, c.value, l.value, {
          [`${l.value}-stylish`]: !!a.stylish
        }),
        style: {
          width: y.value,
          ...p.style
        }
      }, P(u, ["prefixCls"])), [o ? o({
        ...a,
        ...e.value,
        leftWidth: y.value
      }, i) : i]), $ = !B() || !r || !h.value ? s(m, null, [b]) : s(M, {
        to: h.value
      }, {
        default: () => [b, R(" ")]
      });
      return T.wrapSSR(F(s(m, {
        key: l.value
      }, [$])));
    };
  }
});
export {
  G as default,
  V as footerToolbarProps
};

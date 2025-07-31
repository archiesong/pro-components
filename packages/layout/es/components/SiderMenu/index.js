import { defineComponent as M, computed as g, createVNode as o, mergeProps as m } from "vue";
import { Drawer as v } from "ant-design-vue";
import { useConfigContextInject as b } from "ant-design-vue/es/config-provider/context";
import f, { privateSiderMenuProps as k, siderMenuProps as y } from "./SiderMenu.js";
import { useProConfigContextInject as x } from "@ant-design-vue/pro-provider";
import { useEffect as S, useMemo as w, classNames as r } from "@ant-design-vue/pro-utils";
import { useStyle as P } from "./style/index.js";
const T = () => ({
  ...y(),
  ...k(),
  token: Object,
  getContainer: [String, Object]
}), $ = /* @__PURE__ */ M({
  name: "SiderMenuWrapper",
  inheritAttrs: !1,
  props: T(),
  setup(e, {
    attrs: a
  }) {
    const u = x(), {
      direction: t
    } = b(), i = g(() => `${e.prefixCls}-sider`);
    S(() => {
      var l;
      e.isMobile === !0 && ((l = e.onCollapse) == null || l.call(e, !0));
    }, [() => e.isMobile]);
    const {
      wrapSSR: h,
      hashId: n
    } = P(i, {
      proLayoutCollapsedWidth: 64
    }), C = w(() => {
      var l, d, s, c;
      return e.navTheme === "realDark" && e.layout !== "mix" || e.navTheme === "dark" && e.layout !== "mix" || e.layout === "mix" && e.isMobile && e.navTheme === "realDark" || e.layout === "mix" && e.isMobile && e.navTheme === "dark" ? ((d = (l = e.token) == null ? void 0 : l.sider) == null ? void 0 : d.colorMenuBackground) || "#001529" : ((c = (s = u.value.token.layout) == null ? void 0 : s.sider) == null ? void 0 : c.colorMenuBackground) || "transparent";
    }, [() => e.navTheme, () => e.isMobile, () => e.layout, () => e.token, () => u.value.token]);
    return () => e.hide ? null : h(e.isMobile ? o(v, {
      placement: (t == null ? void 0 : t.value) === "rtl" ? "right" : "left",
      class: r(`${e.prefixCls}-drawer-sider`, a.class, n.value),
      open: !e.collapsed,
      style: {
        padding: 0,
        height: "100vh",
        ...a.style
      },
      onClose: () => {
        var l;
        return (l = e.onCollapse) == null ? void 0 : l.call(e, !0);
      },
      closable: !1,
      getContainer: e.getContainer,
      maskClosable: !0,
      width: e.siderWidth,
      bodyStyle: {
        height: "100vh",
        padding: 0,
        display: "flex",
        flexDirection: "row",
        backgroundColor: C.value
      }
    }, {
      default: () => [o(f, m(e, {
        isMobile: !0,
        class: r(i.value, a.class, n.value),
        collapsed: e.isMobile ? !1 : e.collapsed,
        splitMenus: !1,
        originCollapsed: e.collapsed
      }), null)]
    }) : o(f, m(e, {
      class: r(i.value, a.class, n.value),
      originCollapsed: e.collapsed
    }), null));
  }
});
export {
  $ as default,
  T as siderMenuWrapperProps
};

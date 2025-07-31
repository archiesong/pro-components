var Q = Object.defineProperty;
var X = (e, t, n) => t in e ? Q(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var O = (e, t, n) => X(e, typeof t != "symbol" ? t + "" : t, n);
import { defineComponent as Y, computed as Z, toRef as x, createVNode as w, mergeProps as _, resolveComponent as H, h as p, Fragment as ee, isVNode as te } from "vue";
import { Menu as ne } from "ant-design-vue";
import { menuProps as le } from "ant-design-vue/es/menu/src/Menu";
import r from "../../defaultSettings.js";
import { useMountMergeState as U, useEffect as j, useMemo as ae, isBrowser as se, classNames as K, isUrl as G, isImg as oe } from "@ant-design-vue/pro-utils";
import { createFromIconfontCN as V } from "@ant-design/icons-vue";
import { useStyle as ie } from "./style/menu.js";
import { getOpenKeysFromMenuData as W } from "../../utils/index.js";
const ue = () => ({
  ...le(),
  defaultCollapsed: {
    type: Boolean,
    default: void 0
  },
  collapsed: {
    type: Boolean,
    default: void 0
  },
  isMobile: {
    type: Boolean,
    default: void 0
  },
  onOpenChange: {
    type: Function,
    default: void 0
  },
  /**
   * @name 当前应用会话的位置信息。如果你的应用创建了自定义的 history，则需要显示指定 location 属性
   */
  location: {
    type: Object,
    default: void 0
  },
  menuData: Array,
  onCollapse: Function,
  openKeys: {
    type: [Boolean, Array],
    default: void 0
  },
  mode: {
    type: String,
    default: void 0
  },
  navTheme: {
    type: String,
    default: r.navTheme
  },
  layout: {
    type: String,
    default: r.layout
  },
  contentWidth: {
    type: String,
    default: r.contentWidth
  },
  fixedHeader: {
    type: Boolean,
    default: r.fixedHeader
  },
  fixedSiderbar: {
    type: Boolean,
    default: r.fixedSiderbar
  },
  menu: {
    type: Object,
    default: () => r.menu
  },
  title: {
    type: [String, Boolean],
    default: r.title
  },
  iconfontUrl: {
    type: String,
    default: r.iconfontUrl
  },
  colorPrimary: {
    type: String,
    default: r.colorPrimary
  },
  colorWeak: {
    type: Boolean,
    default: r.colorWeak
  },
  splitMenus: {
    type: Boolean,
    default: r.splitMenus
  },
  suppressSiderWhenMenuEmpty: {
    type: Boolean,
    default: r.suppressSiderWhenMenuEmpty
  },
  siderMenuType: {
    type: String,
    default: r.siderMenuType
  },
  /**
   * @name 要给菜单的props, 参考ant-menu的属性
   */
  menuProps: {
    type: Object,
    default: void 0
  },
  /**
   * @name 处理菜单的 props，可以复写菜单的点击功能，一般结合 VueRouter 框架使用
   * @see 非子级的菜单要使用 subMenuItemRender 来处理
   *
   * @example 使用 a 标签 menuItemRender={(item, defaultDom) => { return <a onClick={()=> router.push(item.path) }>{defaultDom}</a> }}
   * @example 使用 Link 标签 menuItemRender={(item, defaultDom) => { return <RouterLink to={item.path}>{defaultDom}</RouterLink> }}
   */
  menuItemRender: {
    type: [Object, Function, Boolean],
    default: void 0
  },
  /**
   * @name 处理父级菜单的 props，可以复写菜单的点击功能，一般用于埋点
   * @see 子级的菜单要使用 menuItemRender 来处理
   *
   * @example 使用 a 标签跳转到特殊的地址 subMenuItemRender={(item, defaultDom) => { return <a onClick={()=> router.push(item.path) }>{defaultDom}</a> }}
   * @example 增加埋点 subMenuItemRender={(item, defaultDom) => { return <a onClick={()=> log.click(item.name) }>{defaultDom}</a> }}
   */
  subMenuItemRender: {
    type: [Object, Function, Boolean],
    default: void 0
  },
  iconPrefixes: String,
  formatMessage: Function,
  /**
   * @name 处理 menuData 的方法，与 menuDataRender 不同，postMenuData处理完成后会直接渲染，不再进行国际化和拼接处理
   *
   * @example 增加菜单图标 postMenuData={(menuData) => { return menuData.map(item => { return { ...item, icon: <Icon type={item.icon} /> } }) }}
   */
  postMenuData: {
    type: Function,
    default: void 0
  },
  onSelect: Function
});
let q = V({
  scriptUrl: r.iconfontUrl
});
const L = (e, t = "icon-", n) => {
  if (!e)
    return null;
  if (typeof e == "string" && e !== "") {
    if (G(e) || oe(e))
      return w("img", {
        width: 16,
        key: e,
        src: e,
        alt: "icon",
        class: n
      }, null);
    if (e.startsWith(t))
      return w(q, {
        type: e
      }, null);
    const o = H(e);
    return typeof o == "function" && p(o);
  }
  return te(e) ? e : typeof e == "function" ? p(e) : e;
}, E = (e) => e && typeof e == "string" ? e.substring(0, 1).toUpperCase() : null;
class re {
  constructor(t) {
    O(this, "getNavMenuItems", (t = [], n, o) => t.map((a) => this.getSubMenuOrItem(a, n, o)).filter((a) => a).flat(1));
    /** Get SubMenu or Item */
    O(this, "getSubMenuOrItem", (t, n, o) => {
      var u, c, I, h, b;
      const {
        baseClassName: a,
        collapsed: i,
        menu: s,
        subMenuItemRender: f,
        iconPrefixes: T,
        layout: S
      } = this.props, d = (s == null ? void 0 : s.type) === "group" && S !== "top", g = this.getIntlTitle(t), M = t == null ? void 0 : t.children, l = d && n === 0 ? "group" : void 0;
      if (Array.isArray(M) && M.length > 0) {
        const $ = n === 0 || d && n === 1, C = $ ? L((u = t.meta) == null ? void 0 : u.icon, T, `${a}-icon ${(c = this.props) == null ? void 0 : c.hashId}`) : null, v = i && $ ? E(g) : null, y = !d || d && i || !l ? g : p("div", {
          class: K(`${a}-item-title`, (I = this.props) == null ? void 0 : I.hashId, {
            [`${a}-item-title-collapsed`]: i,
            [`${a}-item-title-collapsed-level-${o}`]: i,
            [`${a}-group-item-title`]: l === "group",
            [`${a}-item-collapsed-show-title`]: (s == null ? void 0 : s.collapsedShowTitle) && i
          })
        }, [p("span", {
          class: K(`${a}-item-icon`, (h = this.props) == null ? void 0 : h.hashId)
        }, !C && v ? v : [C]), p("span", {
          class: K(`${a}-item-text`, (b = this.props) == null ? void 0 : b.hashId)
        }, g)]), m = f ? f({
          ...t,
          isUrl: !1
        }, y, this.props) : y;
        if (d && n === 0 && i && !s.collapsedShowGroupTitle)
          return this.getNavMenuItems(M, n + 1, n);
        const B = this.getNavMenuItems(M, n + 1, d && n === 0 && i ? n : n + 1);
        return [{
          type: l,
          key: t.key || t.path,
          ...d && l === "group" ? {} : {
            icon: () => C || v
          },
          label: m,
          onClick: d ? void 0 : t.onTitleClick,
          children: B
        }, d && n === 0 ? {
          type: "divider",
          class: `${a}-divider`,
          key: (t.key || t.path) + "-group-divider"
        } : void 0].filter(Boolean);
      }
      return {
        class: `${a}-menu-item`,
        disabled: t.disabled,
        key: t.key || t.path,
        onClick: t.onTitleClick,
        ...this.getMenuItem(t, n, o)
      };
    });
    /**
     *
     * @memberof SiderMenu
     */
    O(this, "getMenuItem", (t, n, o) => {
      var A, F, N, R, D;
      const {
        menuItemRender: a,
        iconPrefixes: i,
        baseClassName: s,
        menu: f,
        layout: T,
        collapsed: S,
        location: d = {
          pathname: "/"
        },
        onCollapse: g,
        isMobile: M,
        menuProps: l
      } = this.props, u = this.getIntlTitle(t), c = this.conversionPath(t.path || "/"), I = (f == null ? void 0 : f.type) === "group" && T !== "top", h = n === 0 || I && n === 1, b = h ? L((A = t.meta) == null ? void 0 : A.icon, i, `${s}-icon ${(F = this.props) == null ? void 0 : F.hashId}`) : null, $ = S && h ? E(u) : null, C = G(c), y = {
        ...t.meta
      }.target || null, m = y && "a" || this.RouterLink, B = C || y ? {
        href: t.path,
        target: y
      } : {}, z = {
        to: {
          name: t.name,
          ...t.meta
        }
      };
      let P = p(ee, null, [p("span", {
        class: K(`${s}-item-text`, (N = this.props) == null ? void 0 : N.hashId)
      }, u)]);
      if ((typeof m != "string" && m.name === "RouterLink" || typeof m == "string" && m === "a") && !(l != null && l.onSelect) && (P = p(m, {
        ...B,
        ...m === "a" ? {} : z,
        key: c,
        class: K(`${s}-item-title`, (R = this.props) == null ? void 0 : R.hashId, {
          [`${s}-item-title-collapsed`]: S,
          [`${s}-item-title-collapsed-level-${o}`]: S,
          [`${s}-item-collapsed-show-title`]: (f == null ? void 0 : f.collapsedShowTitle) && S
        })
      }, typeof m == "string" && m === "a" ? p("span", {
        class: K(`${s}-item-text`, (D = this.props) == null ? void 0 : D.hashId)
      }, u) : () => {
        var k;
        return p("span", {
          class: K(`${s}-item-text`, (k = this.props) == null ? void 0 : k.hashId)
        }, u);
      })), a) {
        const k = {
          ...t,
          isUrl: C,
          itemPath: c,
          isMobile: M,
          replace: c === d.pathname,
          onClick: () => g && g(!0),
          children: void 0
        }, J = a(k, P, this.props);
        return {
          icon: () => b || $,
          label: J
        };
      }
      return {
        icon: () => b || $,
        label: P
      };
    });
    O(this, "getIntlTitle", ({
      meta: t
    }) => {
      const {
        menu: n,
        formatMessage: o
      } = this.props, {
        title: a,
        locale: i
      } = t;
      return i && (n == null ? void 0 : n.locale) !== !1 ? o == null ? void 0 : o({
        id: i,
        defaultMessage: a
      }) : a;
    });
    O(this, "conversionPath", (t) => t && t.startsWith("http") ? t : `/${t || ""}`.replace(/\/+/g, "/"));
    this.props = t, this.RouterLink = H("RouterLink");
  }
}
const de = (e, {
  layout: t,
  collapsed: n
}) => {
  let o = {};
  return e && !n && ["side", "mix"].includes(t || "mix") && (o = {
    openKeys: e
  }), o;
}, Se = /* @__PURE__ */ Y({
  name: "BaseMenu",
  inheritAttrs: !1,
  props: {
    ...ue(),
    matchMenuKeys: {
      type: Array,
      default: () => []
    },
    originCollapsed: {
      type: Boolean,
      default: void 0
    },
    menuRenderType: {
      type: String,
      default: "sider"
    },
    stylish: {
      type: Object,
      default: () => ({})
    }
  },
  setup(e, {
    attrs: t
  }) {
    var M;
    const n = Z(() => `${e.prefixCls}-base-menu-${e.mode}`), [o, a] = U((M = e.menu) == null ? void 0 : M.defaultOpenAll, {
      value: x(e.menu, "defaultOpenAll")
    }), [i, s] = U(() => {
      var l;
      return (l = e.menu) != null && l.defaultOpenAll ? W(e.menuData) || [] : e.openKeys === !1 ? !1 : [];
    }, {
      value: x(e, "openKeys"),
      onChange: e.onOpenChange
    }), [f, T] = U([], {
      value: x(e, "selectedKeys"),
      onChange: e.onSelect ? (l) => {
        var u;
        e.onSelect && l && (e.isMobile && ((u = e.onCollapse) == null || u.call(e, !0)), e.onSelect(l));
      } : e.isMobile ? () => {
        var l;
        return (l = e.onCollapse) == null ? void 0 : l.call(e, !0);
      } : void 0
    });
    j(() => {
      var l;
      (l = e.menu) != null && l.defaultOpenAll || e.openKeys === !1 || e.matchMenuKeys && (s(e.matchMenuKeys), T(e.matchMenuKeys));
    }, [() => {
      var l;
      return (l = e.matchMenuKeys) == null ? void 0 : l.join("-");
    }]), j(() => {
      var l, u, c, I;
      if (e.matchMenuKeys && ((l = e.matchMenuKeys) == null ? void 0 : l.join("-")) !== (f.value || []).join("-") && T(e.matchMenuKeys), !o.value && e.openKeys !== !1 && ((u = e.matchMenuKeys) == null ? void 0 : u.join("-")) !== (i.value || []).join("-")) {
        let h = e.matchMenuKeys;
        ((c = e.menu) == null ? void 0 : c.autoClose) === !1 && (h = Array.from(/* @__PURE__ */ new Set([...e.matchMenuKeys, ...i.value || []]))), s(h);
      } else (I = e.menu) != null && I.ignoreFlatMenu && o.value ? s(W(e.menuData)) : a(!1);
    }, [() => {
      var l;
      return (l = e.matchMenuKeys) == null ? void 0 : l.join("-");
    }]), j(() => {
      e.iconfontUrl && (q = V({
        scriptUrl: e.iconfontUrl
      }));
    }, [() => e.iconfontUrl]);
    const S = ae(() => de(i.value, e), [() => i.value && i.value.join(","), () => e.layout, () => e.collapsed]), {
      wrapSSR: d,
      hashId: g
    } = ie(n, e.mode);
    return () => {
      const {
        mode: l,
        location: u,
        collapsed: c,
        theme: I,
        postMenuData: h,
        menuData: b,
        menuProps: $,
        menuRenderType: C
      } = e, v = new re({
        ...e,
        menuRenderType: C,
        location: se() ? u || {
          pathname: window.location.pathname || "/"
        } : void 0,
        baseClassName: n.value,
        hashId: g.value
      }), y = h ? h(b) : b;
      return !y || y && y.length < 1 ? null : d(w(ne, _(S.value, $, {
        key: "Menu",
        mode: l,
        theme: I,
        inlineIndent: 16,
        selectedKeys: f.value,
        items: v.getNavMenuItems(y, 0, 0),
        class: K(t.class, g.value, n.value, {
          [`${n.value}-collapsed`]: c
        }),
        onOpenChange: (m) => {
          c || s(m);
        }
      }), null));
    };
  }
});
export {
  ue as baseMenuProps,
  Se as default
};

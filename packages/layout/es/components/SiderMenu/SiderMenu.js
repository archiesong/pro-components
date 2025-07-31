import { defineComponent as te, createVNode as n, computed as P, mergeProps as F, Fragment as O, createTextVNode as ie, isVNode as U } from "vue";
import { Avatar as ue, Space as oe, Menu as E, Layout as de } from "ant-design-vue";
import { useProConfigContextInject as se } from "@ant-design-vue/pro-provider";
import ce, { baseMenuProps as re } from "./BaseMenu.js";
import ve from "../AppsLogoComponents/index.js";
import { useMemo as f, classNames as i } from "@ant-design-vue/pro-utils";
import _ from "../CollapsedIcon/index.js";
import { useStylish as me } from "./style/stylish.js";
import { defaultRenderLogo as he } from "../AppsLogoComponents/DefaultContent.js";
function fe(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !U(e);
}
const {
  Sider: ye
} = de, be = () => ({
  ...re(),
  prefixCls: String,
  collapsedWidth: Number,
  /** 品牌logo的标识 */
  logo: {
    type: [String, Function, Array, Boolean, Number, Object],
    default: void 0
  },
  /** 相关品牌的列表 */
  appList: Array,
  /** 相关品牌的列表自定义渲染 */
  appListRender: [Function, Object, Boolean],
  /** 相关品牌的列表项 点击事件，当事件存在时，appList 内配置的 url 不在自动跳转 */
  itemClick: Function,
  /**
   * @name 侧边菜单底部的一些快捷链接
   *
   * @example links={[<a href="ant.design"> 访问官网 </a>,<a href="help.ant.design"> 帮助 </a>]}
   */
  links: {
    type: [Array, Boolean],
    default: void 0
  },
  /** 菜单的宽度 */
  siderWidth: Number,
  /**
   * @name  菜单 logo 和 title 区域的渲染
   *
   * @example 不要logo : menuHeaderRender={(logo,title)=> title}
   * @example 不要title : menuHeaderRender={(logo,title)=> logo}
   * @example 展开的时候显示title,收起显示 logo： menuHeaderRender={(logo,title,props)=> props.collapsed ? logo : title}
   * @example 不要这个区域了 : menuHeaderRender={false}
   */
  menuHeaderRender: {
    type: [Boolean, Object, Function],
    default: void 0
  },
  /**
   * @name  侧边菜单，菜单区域的处理,可以单独处理菜单的dom
   *
   * @example 增加菜单区域的背景颜色 menuContentRender={(props,defaultDom)=><div style={{backgroundColor:"red"}}>{defaultDom}</div>}
   * @example 某些情况下不显示菜单 menuContentRender={(props)=> return <div>不显示菜单</div>}
   */
  menuContentRender: {
    type: [Function, Object, Boolean],
    default: void 0
  },
  /**
   * @name 侧边菜单底部的配置，可以增加一些底部操作
   *
   * @example 底部增加超链接 menuFooterRender={()=><a href="https://pro.ant.design">pro.ant.design</a>}
   * @example 根据收起展开配置不同的 dom  menuFooterRender={()=>collapsed? null :<a href="https://pro.ant.design">pro.ant.design</a>}
   */
  menuFooterRender: {
    type: [Function, Object, Boolean],
    default: void 0
  },
  /**
   * @name 自定义展开收起按钮的渲染
   *
   * @example 使用文字渲染 collapsedButtonRender={(collapsed)=>collapsed?"展开":"收起"})}
   * @example 使用icon渲染 collapsedButtonRender={(collapsed)=>collapsed?<MenuUnfoldOutlined />:<MenuFoldOutlined />}
   * @example 不渲染按钮 collapsedButtonRender={false}
   */
  collapsedButtonRender: {
    type: [Function, Object, Boolean],
    default: void 0
  },
  siderProps: Object,
  /**
   * @name 菜单是否收起的断点，设置成false 可以禁用
   *
   * @example 禁用断点  breakpoint={false}
   * @example 最小的屏幕再收起 breakpoint={"xs"}
   */
  breakpoint: {
    type: [String, Boolean],
    default: "lg"
  },
  hide: {
    type: Boolean,
    default: void 0
  },
  /** 头像的设置 */
  avatarProps: {
    type: [Object, Boolean],
    default: void 0
  },
  /**
   * @name Layout的操作功能列表，不同的 layout 会放到不同的位置
   */
  actionsRender: {
    type: [Function, Object, Boolean],
    default: void 0
  },
  /**
   * @name 侧边菜单 title 和 logo 下面区域的渲染，一般会增加个搜索框
   *
   * @example  增加一个搜索框 menuExtraRender={()=>(<Search placeholder="请输入" />)}
   * @example  根据收起展开配置不同的 dom： menuExtraRender={()=>collapsed? null : <Search placeholder="请输入" />}
   */
  menuExtraRender: {
    type: [Function, Object, Boolean],
    default: void 0
  },
  /**
   * @name 菜单顶部logo 和 title 区域的点击事件
   *
   * @example 点击跳转到首页 onMenuHeaderClick={()=>{ router.push('/') }}
   */
  onMenuHeaderClick: {
    type: Function,
    default: void 0
  },
  /**
   * @name 侧边菜单的logo的样式，可以调整下大小
   *
   * @example 设置logo的大小为 42px logoStyle={{width: '42px', height: '42px'}}
   */
  logoStyle: {
    type: [Object, String],
    default: void 0
  },
  headerRender: {
    type: [Function, Boolean],
    default: void 0
  }
}), $e = () => ({
  matchMenuKeys: Array,
  originCollapsed: {
    type: Boolean,
    default: void 0
  },
  menuRenderType: String,
  stylish: Object
}), ge = (e, b = "menuHeaderRender") => {
  const {
    logo: a,
    title: l,
    layout: k
  } = e, h = e[b];
  if (h === !1)
    return null;
  const y = he(a), v = n("h1", null, [l ?? "Ant Design Vue Pro"]);
  return h ? h(y, e.collapsed ? null : v, e) : k === "mix" && b === "menuHeaderRender" && !e.isMobile ? !1 : e.collapsed ? n("a", {
    key: "title"
  }, [y]) : n("a", {
    key: "title"
  }, [y, v]);
}, De = /* @__PURE__ */ te({
  name: "SiderMenu",
  inheritAttrs: !1,
  props: {
    ...be(),
    ...$e()
  },
  setup(e, {
    attrs: b
  }) {
    const a = se(), l = P(() => `${e.prefixCls}-sider`), k = P(() => `${l.value}.${l.value}-stylish`), h = f(() => {
      var t;
      return (t = e == null ? void 0 : e.menu) != null && t.hideMenuWhenCollapsed && e.collapsed ? `${l.value}-hide-menu-collapsed` : null;
    }, [() => l.value, () => e.collapsed, () => {
      var t;
      return (t = e == null ? void 0 : e.menu) == null ? void 0 : t.hideMenuWhenCollapsed;
    }]), y = f(() => e.isMobile ? !1 : e.layout !== "mix", [() => e.isMobile, () => e.layout]), v = P(() => e.collapsedWidth || 64), X = f(() => n(ve, {
      onItemClick: e.itemClick,
      appListRender: e.appListRender,
      appList: e.appList,
      prefixCls: e.prefixCls
    }, null), [() => e.appList, () => e.layout, () => e.appListRender, () => e.prefixCls]), Y = me(k, {
      stylish: e.stylish,
      proLayoutCollapsedWidth: v.value
    }), R = f(() => {
      if (!e.avatarProps) return null;
      const {
        title: t,
        render: d,
        ...u
      } = e.avatarProps, s = n("div", {
        class: `${l.value}-actions-avatar ${a.value.hashId}`
      }, [u != null && u.src || u != null && u.srcset || u.icon ? n(ue, F({
        size: 28
      }, u), null) : null, e.avatarProps.title && !e.collapsed && n("span", null, [t])]);
      return d ? d(e.avatarProps, s, e) : s;
    }, [() => e.avatarProps, () => l.value, () => e.collapsed]), I = f(() => {
      var d;
      let t;
      return e.actionsRender ? n(oe, {
        align: "center",
        size: 4,
        direction: e.collapsed ? "vertical" : "horizontal",
        class: i([`${l.value}-actions-list`, e.collapsed && `${l.value}-actions-list-collapsed`, a.value.hashId])
      }, fe(t = [(d = e.actionsRender) == null ? void 0 : d.call(e, e)].flat(1).map((u, s) => n("div", {
        key: s,
        class: i(`${l.value}-actions-list-item`, a.value.hashId)
      }, [u]))) ? t : {
        default: () => [t]
      }) : null;
    }, [() => e.actionsRender, () => l.value, () => e.collapsed]), q = f(() => !R.value && !I.value ? null : n("div", {
      class: i(`${l.value}-actions`, a.value.hashId, e.collapsed && `${l.value}-actions-collapsed`)
    }, [R.value, I.value]), [() => I.value, () => R.value, () => l.value, () => e.collapsed, () => a.value.hashId]), g = f(() => e.layout === "mix" && !e.isMobile ? "light" : e.navTheme === "realDark" ? "dark" : e.navTheme, [() => e.navTheme, () => e.isMobile, () => e.layout]), A = f(() => {
      if (e.collapsedButtonRender === !1) return null;
      const t = {
        class: `${l.value}-collapsed-button-menu-icon`,
        key: "collapsed-button-icon",
        title: "",
        label: n(O, null, [ie("​")]),
        icon: n(_, {
          collapsed: e.collapsed
        }, null)
      };
      return e.collapsedButtonRender ? e.collapsedButtonRender(e.collapsed, n(_, {
        collapsed: e.collapsed
      }, null)) : n(E, {
        inlineIndent: 16,
        class: i(`${l.value}-collapsed-button-menu`, a.value.hashId),
        selectedKeys: [],
        openKeys: [],
        theme: g.value,
        mode: "inline",
        onClick: () => {
          var d;
          return (d = e.onCollapse) == null ? void 0 : d.call(e, !e.collapsed);
        },
        items: [t]
      }, null);
    }, [() => e.collapsedButtonRender, () => e.isMobile, () => e.layout, () => e.originCollapsed, () => l.value, () => e.collapsed, () => g.value, () => e.onCollapse]);
    return () => {
      const {
        breakpoint: t = "lg",
        stylish: d,
        navTheme: u,
        layout: s,
        siderProps: G,
        collapsed: c,
        siderWidth: $,
        onMenuHeaderClick: J,
        links: L,
        fixedSiderbar: B,
        logoStyle: Q,
        menuExtraRender: W,
        menuFooterRender: C,
        menuContentRender: M,
        isMobile: m,
        onCollapse: S
      } = e, Z = i(b.class, a.value.hashId, {
        [`${l.value}-fixed`]: B,
        [`${l.value}-fixed-mix`]: s === "mix" && !m && B,
        [`${l.value}-collapsed`]: c,
        [`${l.value}-${s}`]: s && !m,
        [`${l.value}-${s === "mix" && !m ? "light" : u}`]: !0,
        [`${l.value}-mix`]: s === "mix" && !m,
        [`${l.value}-stylish`]: !!d
      }), j = ge(e), N = W && W(e), w = C && (C == null ? void 0 : C(e)), T = M !== !1 && n(ce, F(e, {
        key: `base-menu-${c && !m ? "vertical" : "inline"}`,
        mode: c && !m ? "vertical" : "inline",
        theme: g.value,
        class: i(`${l.value}-menu`, a.value.hashId)
      }), null), p = M ? M(e, T) : T, ee = (L || []).map((o, le) => {
        var K, V, z;
        const r = {
          class: `${l.value}-link`,
          key: le
        };
        if (U(o) && Array.isArray(o.children) && o.children.length > 0)
          if (((K = o.children) == null ? void 0 : K.length) >= 2)
            r.title = o.children[1].children[0].children, r.label = o.children[1], r.icon = o.children[0];
          else {
            const D = o.children[0].children, ne = D.substring(1), ae = n("span", {
              class: `${(V = a.value.token) == null ? void 0 : V.antCls}icon ${(z = a.value.token) == null ? void 0 : z.antCls}-menu-item-icon`
            }, [D.trim().charAt(0).toUpperCase()]);
            r.title = D, r.icon = ae, r.label = ne;
          }
        else {
          const x = o;
          r.label = x.label, r.title = x.title, r.icon = x.icon;
        }
        return r;
      }), H = n(O, null, [j && n("div", {
        class: i(`${l.value}-logo`, a.value.hashId, {
          [`${l.value}-logo-collapsed`]: c
        }),
        onClick: y ? J : void 0,
        id: "logo",
        style: Q
      }, [j, !m && X.value]), N && n("div", {
        class: i([`${l.value}-extra`, !j && `${l.value}-extra-no-logo`, a.value.hashId])
      }, [N]), n("div", {
        style: {
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden"
        }
      }, [p]), L ? n("div", {
        class: i(`${l.value}-links`, a.value.hashId)
      }, [n(E, {
        inlineIndent: 16,
        class: i(`${l.value}-link-menu`, a.value.hashId),
        selectedKeys: [],
        openKeys: [],
        theme: e.theme,
        mode: "inline",
        items: ee
      }, null)]) : null, y.value && e.headerRender === !1 && q.value, w && n("div", {
        class: i([`${l.value}-footer`, a.value.hashId, {
          [`${l.value}-footer-collapsed`]: c
        }])
      }, [w])]);
      return Y.wrapSSR(n(O, null, [B && !m && !h.value && n("div", {
        style: {
          width: `${c ? v.value : $}px`,
          overflow: "hidden",
          flex: `0 0 ${c ? v.value : $}px`,
          maxWidth: `${c ? v.value : $}px`,
          minWidth: `${c ? v.value : $}px`,
          transition: "all 0.2s ease 0s"
        }
      }, null), n(ye, F({
        class: i(Z, a.value.hashId, h.value),
        style: b.style,
        collapsed: c,
        collapsedWidth: v.value,
        collapsible: !0,
        trigger: null,
        breakpoint: t === !1 ? void 0 : t,
        theme: g.value,
        onCollapse: (o) => {
          m || S == null || S(o);
        },
        width: $
      }, G), {
        default: () => [h.value ? n("div", {
          class: i(`${l.value}-hide-when-collapsed`, a.value.hashId),
          style: {
            height: "100%",
            width: "100%",
            opacity: h.value ? 0 : 1
          }
        }, [H]) : H, A.value ? n("div", {
          class: i(`${l.value}-collapsed-button`, a.value.hashId)
        }, [A.value]) : null]
      })]));
    };
  }
});
export {
  De as default,
  $e as privateSiderMenuProps,
  ge as renderLogoAndTitle,
  be as siderMenuProps
};

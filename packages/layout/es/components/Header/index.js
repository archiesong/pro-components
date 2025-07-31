import { defineComponent as x, computed as n, createVNode as o, mergeProps as f, Fragment as S, isVNode as M } from "vue";
import { Layout as $ } from "ant-design-vue";
import N from "../GlobalHeader/index.js";
import { useStyle as w } from "./style/header.js";
import { useStylish as D } from "./style/stylish.js";
import { useProConfigContextInject as P } from "@ant-design-vue/pro-provider";
import { privateSiderMenuProps as W } from "../SiderMenu/SiderMenu.js";
import { useCallback as j, classNames as V } from "@ant-design-vue/pro-utils";
import { clearMenuItem as k } from "../../utils/index.js";
import B from "../TopNavHeader/index.js";
import { globalHeaderProps as F } from "../GlobalHeader/globalHeaderProps.js";
function L(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !M(e);
}
const {
  Header: y
} = $, T = () => ({
  ...F(),
  isMobile: Boolean,
  collapsedWidth: Number,
  headerRender: {
    type: [Function, Boolean],
    default: void 0
  },
  siderWidth: Number,
  hasSiderMenu: {
    type: Boolean,
    default: void 0
  },
  headerTitleRender: {
    type: [Function, Boolean, Object],
    default: void 0
  }
}), U = /* @__PURE__ */ x({
  name: "HeaderView",
  inheritAttrs: !1,
  props: {
    ...T(),
    ...W()
  },
  setup(e, {
    attrs: d
  }) {
    const r = P(), t = n(() => `${e.prefixCls}-layout-header`), i = n(() => e.fixedHeader || e.layout === "mix"), {
      wrapSSR: v,
      hashId: b
    } = w(t), u = n(() => e.collapsedWidth || 64), C = n(() => e.layout === "top"), R = D(n(() => `${t.value}.${t.value}-stylish`), {
      proLayoutCollapsedWidth: u,
      stylish: n(() => e.stylish)
    }), H = j(() => {
      const a = k(e.menuData || []);
      let l = o(N, f(e, {
        menuData: a
      }), {
        default: () => [e.headerContentRender && e.headerContentRender(e, null)]
      });
      return C.value && !e.isMobile && (l = o(B, f(e, {
        mode: "horizontal",
        onCollapse: e.onCollapse,
        menuData: a
      }), null)), e.headerRender && typeof e.headerRender == "function" ? e.headerRender(e, l) : l;
    }, [() => e.headerContentRender, () => e.headerRender, () => e.navTheme, () => e.isMobile, () => e.menuData, () => e.layout, () => e.onCollapse]);
    return () => {
      var s, h, m, c;
      let a;
      const {
        layout: l,
        headerRender: g
      } = e;
      return l === "side" && g === !1 ? null : R.wrapSSR(v(o(S, null, [i.value && o(y, {
        style: {
          ...d.style,
          height: `${((h = (s = r.value.token.layout) == null ? void 0 : s.header) == null ? void 0 : h.heightLayoutHeader) || 56}px`,
          lineHeight: `${((c = (m = r.value.token.layout) == null ? void 0 : m.header) == null ? void 0 : c.heightLayoutHeader) || 56}px`,
          backgroundColor: "transparent"
        }
      }, null), o(y, {
        class: V(d.class, b.value, t.value, {
          [`${t.value}-fixed`]: i.value,
          [`${t.value}-stylish`]: !!e.stylish
        }),
        style: {
          ...d.style,
          width: !i.value || l !== "side" || e.isMobile ? "100%" : `calc(100% - ${e.collapsed ? u.value : e.siderWidth}px)`
        }
      }, L(a = H.value()) ? a : {
        default: () => [a]
      })])));
    };
  }
});
export {
  U as default,
  T as headerViewProps
};

import { defineComponent as g, ref as v, computed as f, createVNode as n } from "vue";
import { Popover as h } from "ant-design-vue";
import { useStyle as k } from "./style/index.js";
import { useState as I, useMemo as R, classNames as i } from "@ant-design-vue/pro-utils";
import { AppsLogo as S } from "./AppsLogo.js";
import $ from "./SimpleContent.js";
import N from "./DefaultContent.js";
import { defaultRenderLogo as V } from "./DefaultContent.js";
const b = () => ({
  prefixCls: String,
  /** 相关品牌的列表 */
  appList: Array,
  appListRender: [Function, Boolean],
  /** 相关品牌的列表项 点击事件，当事件存在时，appList 内配置的 url 不在自动跳转 */
  onItemClick: Function
}), O = /* @__PURE__ */ g({
  name: "AppsLogoComponents",
  inheritAttrs: !1,
  props: b(),
  setup(e) {
    const u = v(null), m = v(null), o = f(() => `${e.prefixCls}-layout-apps`), {
      wrapSSR: C,
      hashId: a
    } = k(o), [r, d] = I(!1), c = (l) => {
      var t;
      (t = e.onItemClick) == null || t.call(e, l, m);
    }, p = R(() => {
      var t;
      return ((t = e.appList) == null ? void 0 : t.some((s) => !(s != null && s.desc))) ? n($, {
        hashId: a.value,
        appList: e.appList,
        itemClick: e.onItemClick ? c : void 0,
        baseClassName: `${o.value}-simple`
      }, null) : n(N, {
        hashId: a.value,
        appList: e.appList,
        itemClick: e.onItemClick ? c : void 0,
        baseClassName: `${o.value}-default`
      }, null);
    }, [() => e.appList, () => o.value, () => a.value]), L = f(() => e.appListRender ? e.appListRender((e == null ? void 0 : e.appList) || [], p.value) : p.value);
    return () => {
      const {
        appList: l
      } = e;
      return l != null && l.length ? C(n("div", {
        ref: u,
        class: i(o.value, a.value),
        onClick: (t) => t.stopPropagation()
      }, [n(h, {
        placement: "bottomRight",
        trigger: ["click"],
        open: r.value,
        onOpenChange: (t) => d(t),
        overlayClassName: i(`${o.value}-popover`, a.value),
        content: L.value,
        getPopupContainer: () => u.value || document.body
      }, {
        default: () => [n("div", {
          ref: m,
          onClick: (t) => t.stopPropagation(),
          class: i(`${o.value}-wrapper`)
        }, [n("span", {
          class: i(`${o.value}-icon`, a.value, {
            [`${o.value}-icon-active`]: r.value
          })
        }, [n(S, null, null)])])]
      })])) : null;
    };
  }
});
export {
  b as appsLogoComponentsProps,
  O as default,
  V as defaultRenderLogo
};

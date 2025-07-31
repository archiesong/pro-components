import { defineComponent as p, computed as y, createVNode as o } from "vue";
import { useConfigContextInject as d } from "ant-design-vue/es/config-provider/context";
import { classNames as s } from "@ant-design-vue/pro-utils";
import { useStyle as v } from "./style/index.js";
const m = () => ({
  links: {
    type: [Boolean, Array],
    default: void 0
  },
  copyright: {
    type: [Object, Boolean],
    default: void 0
  },
  style: {
    type: Object,
    default: void 0
  },
  prefixCls: {
    type: String,
    default: void 0
  },
  class: {
    type: String,
    default: void 0
  }
}), A = /* @__PURE__ */ p({
  name: "GlobalFooter",
  inheritAttrs: !1,
  props: m(),
  setup(i) {
    const {
      getPrefixCls: n
    } = d(), t = y(() => n(i.prefixCls || "pro-global-footer")), {
      wrapSSR: f,
      hashId: a
    } = v(t);
    return () => {
      const {
        links: e,
        copyright: r,
        class: u,
        style: c
      } = i;
      return (e == null || e === !1 || Array.isArray(e) && e.length === 0) && (r == null || r === !1) ? null : f(o("div", {
        class: s(t.value, a.value, u),
        style: c
      }, [e && Array.isArray(e) && e.length > 0 && o("div", {
        class: s(`${t.value}-list`, a.value)
      }, [e == null ? void 0 : e.map((l) => o("a", {
        class: s(`${t.value}-list-link`, a.value),
        key: l.key,
        title: l.key,
        target: l.blankTarget ? "_blank" : "_self",
        href: l.href,
        rel: "noreferrer"
      }, [l.title]))]), r && o("div", {
        class: s(`${t.value}-copyright`, a.value)
      }, [r])]));
    };
  }
});
export {
  A as default,
  m as globalFooterProps
};

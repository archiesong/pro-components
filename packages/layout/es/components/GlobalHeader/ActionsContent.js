import { defineComponent as S, computed as $, createVNode as t, Fragment as x, mergeProps as z, isVNode as g } from "vue";
import { Avatar as P } from "ant-design-vue";
import b from "ant-design-vue/es/vc-resize-observer";
import { useStyle as A } from "./style/rightContentStyle.js";
import { useState as j, useMemo as F, useDebounceFn as I, classNames as s } from "@ant-design-vue/pro-utils";
import { useConfigContextInject as k } from "ant-design-vue/es/config-provider/context";
const w = /* @__PURE__ */ S({
  name: "ActionsContent",
  inheritAttrs: !1,
  props: {
    prefixCls: {
      type: String,
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
    }
  },
  setup(a) {
    const {
      getPrefixCls: y
    } = k(), n = $(() => a.prefixCls || `${y()}-pro-global-header`), {
      wrapSSR: v,
      hashId: l
    } = A(n), [d, C] = j("auto"), u = F(() => {
      if (!a.avatarProps) return null;
      const {
        title: r,
        render: o,
        ...e
      } = a.avatarProps, c = t(x, null, [e != null && e.src || e != null && e.srcset || e.icon ? t(P, z(e, {
        size: 28,
        key: "avatar"
      }), null) : null, r && t("span", {
        key: "name",
        style: {
          marginInlineStart: "8px"
        }
      }, [r])]);
      return o ? o(a.avatarProps, t("span", null, [c]), a) : t("span", null, [c]);
    }, [() => a.avatarProps]), p = I(async (r) => C(r), 160);
    return () => {
      const r = a.actionsRender || u.value ? (o) => {
        var c, f;
        const e = a.actionsRender && ((c = a.actionsRender) == null ? void 0 : c.call(a, o));
        if (!e && !u.value) return null;
        if (!Array.isArray(e)) {
          let i = !1;
          return g(e) && (i = !!((f = e == null ? void 0 : e.props) != null && f["aria-hidden"])), v(t("div", {
            class: s(`${n.value}-actions`, l.value)
          }, [t("div", {
            class: s(`${n.value}-actions-item`, l.value, {
              [`${n.value}-actions-hover`]: !i
            })
          }, [e]), u.value && t("div", {
            class: s(`${n.value}-actions-avatar`, l.value)
          }, [u.value])]));
        }
        return v(t("div", {
          class: s(`${n.value}-actions`, l.value)
        }, [e.filter(Boolean).map((i, R) => {
          var h;
          let m = !1;
          return g(i) && (m = !!((h = i == null ? void 0 : i.props) != null && h["aria-hidden"])), t("div", {
            key: R,
            class: s(`${n.value}-actions-item`, l.value, {
              [`${n.value}-actions-hover`]: !m
            })
          }, [i]);
        }), u.value && t("div", {
          class: s(`${n.value}-actions-avatar`, l.value)
        }, [u.value])]));
      } : void 0;
      return t("div", {
        class: s(`${n.value}-right-content`, l.value),
        style: {
          minWidth: d.value,
          height: "100%"
        }
      }, [t(b, {
        onResize: ({
          width: o
        }) => {
          p.run(o);
        }
      }, {
        default: () => [r && t("div", {
          style: {
            display: "flex",
            alignItems: "center",
            height: "100%",
            justifyContent: "flex-end"
          }
        }, [r({
          ...a,
          // 测试专用
          rightContentSize: d.value
        })])]
      })]);
    };
  }
});
export {
  w as default
};

import { defineComponent as m, computed as v, createVNode as e, Fragment as b, isVNode as g } from "vue";
import { Tooltip as y } from "ant-design-vue";
import { InfoCircleOutlined as C } from "@ant-design/icons-vue";
import { useConfigContextInject as S } from "ant-design-vue/es/config-provider/context";
import { useStyle as j } from "./style/index.js";
import s from "../../classNames/index.js";
const x = /* @__PURE__ */ m({
  name: "LabelIconTip",
  inheritAttrs: !1,
  props: {
    label: {
      type: [String, Object],
      default: void 0
    },
    subTitle: {
      type: [String, Object],
      default: void 0
    },
    tooltip: {
      type: [String, Object],
      default: void 0
    },
    ellipsis: {
      type: [Boolean, Object],
      default: void 0
    }
  },
  setup(r) {
    const {
      getPrefixCls: p
    } = S(), t = v(() => p("pro-core-label-tip")), {
      wrapSSR: c,
      hashId: n
    } = j(t);
    return () => {
      const {
        tooltip: o,
        subTitle: a,
        label: u,
        ellipsis: d
      } = r;
      if (!o && !a)
        return e(b, null, [u]);
      const i = typeof o == "string" || g(o) ? {
        title: o
      } : o, f = (i == null ? void 0 : i.icon) || e(C, null, null);
      return c(e("div", {
        class: s(t.value, n.value),
        onMousedown: (l) => l.stopPropagation(),
        onMouseleave: (l) => l.stopPropagation(),
        onMousemove: (l) => l.stopPropagation()
      }, [e("div", {
        class: s(`${t.value}-title`, n.value, {
          [`${t.value}-title-ellipsis`]: d
        })
      }, [u]), a && e("div", {
        class: s(`${t.value}-subtitle`, n.value)
      }, [a]), o && e(y, i, {
        default: () => [e("span", {
          class: s(`${t.value}-icon`, n.value)
        }, [f])]
      })]));
    };
  }
});
export {
  x as default
};

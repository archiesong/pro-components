import { defineComponent as l, createVNode as a } from "vue";
import { Layout as c } from "ant-design-vue";
import { useProConfigContextInject as s } from "@ant-design-vue/pro-provider";
import { classNames as p, ErrorBoundary as y } from "@ant-design-vue/pro-utils";
const {
  Content: f
} = c, C = () => ({
  hasPageContainer: {
    type: Number,
    default: void 0
  },
  isChildrenLayout: {
    type: Boolean,
    default: void 0
  },
  prefixCls: String,
  location: {
    type: Object,
    default: void 0
  },
  contentHeight: {
    type: [Number, String],
    default: void 0
  },
  errorBoundaryRender: {
    type: [Object, Function, Boolean],
    default: void 0
  },
  hasHeader: {
    type: Boolean,
    default: void 0
  }
}), B = /* @__PURE__ */ l({
  name: "WrapContent",
  inheritAttrs: !1,
  props: C(),
  setup(e, {
    slots: n,
    attrs: o
  }) {
    const u = s(), i = (r) => {
      console.log(r.error);
    };
    return () => {
      const {
        errorBoundaryRender: r
      } = e, d = p(`${e.prefixCls}-content`, u.value.hashId, {
        [`${e.prefixCls}-has-header`]: e.hasHeader,
        [`${e.prefixCls}-content-has-page-container`]: (e.hasPageContainer || 0) > 0
      });
      return r === !1 ? a(f, {
        class: d,
        style: o.style
      }, {
        default: () => {
          var t;
          return [(t = n.default) == null ? void 0 : t.call(n)];
        }
      }) : a(y, {
        fallback: r,
        onError: i
      }, {
        default: () => [a(f, {
          class: d,
          style: o.style
        }, {
          default: () => {
            var t;
            return [(t = n.default) == null ? void 0 : t.call(n)];
          }
        })]
      });
    };
  }
});
export {
  B as default,
  C as wrapContentProps
};

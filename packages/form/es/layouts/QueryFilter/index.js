import { defineComponent as u, createVNode as i } from "vue";
import l from "ant-design-vue/es/vc-resize-observer";
import { useMountMergeState as m, isBrowser as p } from "@ant-design-vue/pro-utils";
import { BaseForm as a } from "../../BaseForm/BaseForm.js";
var o;
const h = p() ? (o = document == null ? void 0 : document.body) == null ? void 0 : o.clientWidth : 1024, b = /* @__PURE__ */ u({
  name: "QueryFilter",
  inheritAttrs: !1,
  props: {
    onInit: {
      type: Function,
      default: void 0
    }
  },
  setup(n, {
    attrs: t
  }) {
    const [d, s] = m(() => {
      var e, r;
      return typeof ((e = t.style) == null ? void 0 : e.width) == "number" ? (r = t.style) == null ? void 0 : r.width : h;
    });
    return () => i(l, {
      key: "resize-observer",
      onResize: (e) => {
        d.value !== e.width && e.width > 17 && s(e.width);
      }
    }, {
      default: () => [i(a, n, null)]
    });
  }
});
export {
  b as default
};

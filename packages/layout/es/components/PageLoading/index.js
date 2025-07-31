import { createVNode as e, mergeProps as a } from "vue";
import { Spin as i } from "ant-design-vue";
const r = ({
  isLoading: o,
  pastDelay: n,
  timedOut: d,
  error: l,
  retry: s,
  ...t
}) => e("div", {
  style: {
    paddingBlockStart: "100px",
    textAlign: "center"
  }
}, [e(i, a({
  size: "large"
}, t), null)]);
r.displayName = "PageLoading";
r.inheritAttrs = !1;
export {
  r as default
};

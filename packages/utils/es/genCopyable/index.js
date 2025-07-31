import { createVNode as a } from "vue";
import { Typography as p } from "ant-design-vue";
const u = (l) => {
  var s;
  return !!((s = l == null ? void 0 : l.valueType) != null && s.toString().startsWith("date") || (l == null ? void 0 : l.valueType) === "select" || l != null && l.valueEnum);
}, f = (l) => {
  var s;
  return ((s = l.ellipsis) == null ? void 0 : s.showTitle) === !1 ? !1 : l.ellipsis;
}, y = (l, s, r) => {
  if (s.copyable || s.ellipsis) {
    const o = s.copyable && r ? {
      text: r,
      tooltip: !1
    } : void 0, e = u(s), n = f(s) && r ? {
      tooltip: (
        // 支持一下 tooltip 的关闭
        (s == null ? void 0 : s.tooltip) !== !1 && e ? l : r
      )
    } : !1;
    return a(p.Text, {
      copyable: o,
      ellipsis: n,
      content: l
    }, null);
  }
  return l;
};
export {
  y as default
};

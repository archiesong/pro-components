import { createVNode as c } from "vue";
import f from "ant-design-vue/es/_util/copy-to-clipboard";
const m = ({
  text: r,
  onCopy: p,
  options: i
}, {
  slots: o
}) => {
  var a;
  return c("span", {
    onClick: (e) => {
      e.preventDefault(), e.stopPropagation();
      const t = f(r, i);
      p && p(r, t);
    }
  }, [(a = o.default) == null ? void 0 : a.call(o)]);
};
export {
  m as default
};

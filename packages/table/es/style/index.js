import { cssinjs as o } from "ant-design-vue";
import { useStyle as n } from "@ant-design-vue/pro-provider";
const { Keyframes: s } = o;
new s("turn", {
  "0%": { transform: "rotate(0deg)" },
  "25%": { transform: "rotate(90deg)" },
  "50%": { transform: "rotate(180deg)" },
  "75%": { transform: "rotate(270deg)" },
  "100%": { transform: "rotate(360deg)" }
});
const a = (t) => ({
  [t.componentCls]: {
    zIndex: 1
  }
});
function u(t) {
  return n("ProTable", (e) => {
    const r = {
      ...e,
      componentCls: `.${t.value}`
    };
    return [a(r)];
  });
}
export {
  a as genProListStyle,
  u as useStyle
};

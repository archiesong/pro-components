import { computed as r } from "vue";
import { theme as i, useStyleRegister as p } from "ant-design-vue";
import { TinyColor as a } from "@ctrl/tinycolor";
import { useProConfigContextInject as f } from "../context.js";
import * as h from "./token.js";
import { useConfigContextInject as g } from "ant-design-vue/es/config-provider/context";
const k = (e, t) => new a(e).setAlpha(t).toRgbString(), b = (e, t) => new a(e).lighten(t).toHexString(), C = () => typeof i > "u" || !i ? h : i, d = C(), S = d.useToken, P = (e) => ({
  boxSizing: "border-box",
  margin: 0,
  padding: 0,
  color: e.colorText,
  fontSize: e.fontSize,
  lineHeight: e.lineHeight,
  listStyle: "none",
  fontFamily: e.fontFamily
});
function w(e, t) {
  const n = f(), { token: m } = S(), { getPrefixCls: s, iconPrefixCls: c } = g(), l = r(() => {
    let o = n.value.token;
    return o.layout || (o = { ...m.value }), o.proComponentsCls = o.proComponentsCls ?? `.${s("pro")}`, o.antCls = `.${s()}`, o.iconCls = o.iconCls ?? `.${c.value}`, o;
  }), u = r(() => ({
    theme: n.value.theme,
    token: l.value,
    path: [e],
    hashId: n.value.hashId
  }));
  return {
    wrapSSR: p(u, () => t(l.value)),
    hashId: r(() => n.value.hashId)
  };
}
export {
  b as lighten,
  d as proTheme,
  P as resetComponent,
  k as setAlpha,
  w as useStyle,
  S as useToken
};

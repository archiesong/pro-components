import { inject as t, ref as r, provide as n } from "vue";
import { zhCNIntl as f } from "./intl.js";
import { defaultToken as i, emptyTheme as a } from "./useStyle/token.js";
const o = Symbol("proConfigProvider"), l = {
  intl: {
    ...f,
    locale: "default"
  },
  theme: a,
  valueTypeMap: {},
  hashed: !0,
  dark: !1,
  compact: !1,
  token: i
}, d = (e) => n(o, e), s = () => t(o, r(l));
export {
  o as proConfigProviderKey,
  s as useProConfigContextInject,
  d as useProConfigContextProvider
};

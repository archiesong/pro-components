import e from "./en_US.js";
import n from "./it_IT.js";
import a from "./ko_KR.js";
import c from "./zh_CN.js";
import i from "./zh_TW.js";
import { isBrowser as l } from "@ant-design-vue/pro-utils";
const t = {
  zh_CN: c,
  zh_TW: i,
  en_US: e,
  it_IT: n,
  ko_KR: a
}, m = {
  en: "en_US",
  "zh-cn": "zh_CN",
  "zh-tw": "zh_TW",
  it: "it_IT",
  ko: "ko_KR"
}, _ = (o) => l() ? o && m[o] || window.g_locale || navigator.language : "zh-CN", f = (o) => {
  const r = _(o);
  return t[r] || t.zh_CN;
};
export {
  f as gLocaleObject,
  _ as getLanguage
};

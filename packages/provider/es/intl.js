import i from "./locale/ar_EG.js";
import l from "./locale/ca_ES.js";
import p from "./locale/de_DE.js";
import I from "./locale/en_GB.js";
import f from "./locale/en_US.js";
import R from "./locale/es_ES.js";
import a from "./locale/fa_IR.js";
import _ from "./locale/fr_FR.js";
import h from "./locale/hr_HR.js";
import E from "./locale/id_ID.js";
import S from "./locale/it_IT.js";
import T from "./locale/ja_JP.js";
import N from "./locale/ko_KR.js";
import d from "./locale/mn_MN.js";
import L from "./locale/ms_MY.js";
import M from "./locale/pl_PL.js";
import z from "./locale/pt_BR.js";
import B from "./locale/ru_RU.js";
import C from "./locale/sr_RS.js";
import K from "./locale/th_TH.js";
import D from "./locale/tr_TR.js";
import G from "./locale/vi_VN.js";
import H from "./locale/zh_CN.js";
import P from "./locale/zh_TW.js";
const U = (r, n, o) => {
  const m = n.replace(/\[(\d+)\]/g, ".$1").split(".");
  let s = r, e = o;
  for (const c of m)
    if (e = Object(s)[c], s = Object(s)[c], e === void 0)
      return o;
  return e;
}, t = (r, n) => ({
  getMessage: ({ id: o, defaultMessage: m }) => U(n, o, m) || m,
  locale: r
}), j = t("mn_MN", d), u = t("ar_EG", i), y = t("zh_CN", H), k = t("en_US", f), v = t("en_GB", I), g = t("vi_VN", G), w = t("it_IT", S), F = t("ja_JP", T), J = t("es_ES", R), W = t("ca_ES", l), Y = t("ru_RU", B), b = t("sr_RS", C), O = t("ms_MY", L), V = t("zh_TW", P), x = t("fr_FR", _), A = t("pt_BR", z), $ = t("ko_KR", N), q = t("id_ID", E), Q = t("de_DE", p), X = t("fa_IR", a), Z = t("tr_TR", D), tt = t("pl_PL", M), ot = t("hr_HR", h), rt = t("th_TH", K), nt = {
  "mn-MN": j,
  "ar-EG": u,
  "zh-CN": y,
  "en-US": k,
  "en-GB": v,
  "vi-VN": g,
  "it-IT": w,
  "ja-JP": F,
  "es-ES": J,
  "ca-ES": W,
  "ru-RU": Y,
  "sr-RS": b,
  "ms-MY": O,
  "zh-TW": V,
  "fr-FR": x,
  "pt-BR": A,
  "ko-KR": $,
  "id-ID": q,
  "de-DE": Q,
  "fa-IR": X,
  "tr-TR": Z,
  "pl-PL": tt,
  "hr-HR": ot,
  "th-TH": rt
}, mt = Object.keys(nt), Gt = (r) => {
  const n = (r || "zh-CN").toLocaleLowerCase();
  return mt.find((o) => o.toLocaleLowerCase().includes(n));
};
export {
  u as arEGIntl,
  W as caESIntl,
  t as createIntl,
  Q as deDEIntl,
  v as enGBIntl,
  k as enUSIntl,
  J as esESIntl,
  X as faIRIntl,
  Gt as findIntlKeyByAntdLocaleKey,
  x as frFRIntl,
  ot as hrHRIntl,
  q as idIDIntl,
  nt as intlMap,
  mt as intlMapKeys,
  w as itITIntl,
  F as jaJPIntl,
  $ as koKRIntl,
  j as mnMNIntl,
  O as msMYIntl,
  tt as plPLIntl,
  A as ptBRIntl,
  Y as ruRUIntl,
  b as srRSIntl,
  rt as thTHIntl,
  Z as trTRIntl,
  g as viVNIntl,
  y as zhCNIntl,
  V as zhTWIntl
};

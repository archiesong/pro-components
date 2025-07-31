import c from "dayjs";
import d from "dayjs/plugin/quarterOfYear";
import u from "ant-design-vue/es/vc-util/get";
import b from "../isNil/index.js";
c.extend(d);
const A = {
  time: "HH:mm:ss",
  timeRange: "HH:mm:ss",
  date: "YYYY-MM-DD",
  dateWeek: "YYYY-wo",
  dateMonth: "YYYY-MM",
  dateQuarter: "YYYY-[Q]Q",
  dateYear: "YYYY",
  dateRange: "YYYY-MM-DD",
  dateTime: "YYYY-MM-DD HH:mm:ss",
  dateTimeRange: "YYYY-MM-DD HH:mm:ss"
};
function O(t) {
  return Object.prototype.toString.call(t) === "[object Object]";
}
function h(t) {
  if (O(t) === !1) return !1;
  const r = t.constructor;
  if (r === void 0) return !0;
  const n = r.prototype;
  return !(O(n) === !1 || Object.prototype.hasOwnProperty.call(n, "isPrototypeOf") === !1);
}
const M = (t) => !!(t != null && t._isAMomentObject), y = (t, r, n) => {
  if (!r)
    return t;
  if (c.isDayjs(t) || M(t)) {
    if (r === "number")
      return t.valueOf();
    if (r === "string")
      return t.format(A[n] || "YYYY-MM-DD HH:mm:ss");
    if (typeof r == "string" && r !== "string")
      return t.format(r);
    if (typeof r == "function")
      return r(t, n);
  }
  return t;
}, H = (t, r, n, m, j) => {
  const i = {};
  return typeof window > "u" || typeof t != "object" || b(t) || t instanceof Blob || Array.isArray(t) ? t : (Object.keys(t).forEach((o) => {
    const D = j ? [j, o].flat(1) : [o], f = u(n, D) || "text";
    let e = "text", p;
    typeof f == "string" ? e = f : (e = f.valueType, p = f.dateFormat);
    const s = t[o];
    if (!(b(s) && m)) {
      if (h(s) && // 不是数组
      !Array.isArray(s) && // 不是 dayjs
      !c.isDayjs(s) && // 不是 moment
      !M(s)) {
        i[o] = H(
          s,
          r,
          n,
          m,
          D
        );
        return;
      }
      if (Array.isArray(s)) {
        i[o] = s.map((Y, g) => c.isDayjs(Y) || M(Y) ? y(
          Y,
          p || r,
          e
        ) : H(
          Y,
          r,
          n,
          m,
          [o, `${g}`].flat(1)
        ));
        return;
      }
      i[o] = y(
        s,
        p || r,
        e
      );
    }
  }), i);
};
export {
  y as convertMoment,
  A as dateFormatterMap,
  H as default,
  h as isPlainObject
};

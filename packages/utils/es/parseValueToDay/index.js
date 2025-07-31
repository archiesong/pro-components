import t from "dayjs";
import m from "dayjs/plugin/customParseFormat";
import n from "../isNil/index.js";
t.extend(m);
const i = (r) => !!(r != null && r._isAMomentObject), f = (r, o) => n(r) || t.isDayjs(r) || i(r) ? i(r) ? t(r) : r : Array.isArray(r) ? r.map((s) => f(s, o)) : typeof r == "number" ? t(r) : t(r, o);
export {
  f as default
};

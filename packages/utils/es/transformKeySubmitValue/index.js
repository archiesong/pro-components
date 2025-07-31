import { isVNode as S } from "vue";
import { merge as B } from "lodash-es";
import M from "ant-design-vue/es/vc-util/get";
import h from "ant-design-vue/es/vc-util/set";
import P from "../isNil/index.js";
import N from "../merge/index.js";
function T(r) {
  return typeof r != "object" ? !1 : r === null ? !0 : !(S(r) || r.constructor === RegExp || r instanceof Map || r instanceof Set || r instanceof HTMLElement || r instanceof Blob || r instanceof File || Array.isArray(r));
}
const C = (r, k, R = !0) => {
  const E = Object.keys(k).reduce(
    (e, u) => {
      const d = k[u];
      return P(d) || (e[u] = d), e;
    },
    {}
  );
  if (Object.keys(E).length < 1 || typeof window > "u" || typeof r != "object" || P(r) || r instanceof Blob)
    return r;
  let s = Array.isArray(r) ? [] : {};
  const j = (e, u) => {
    let o = Array.isArray(e) ? [] : {};
    return e == null || e === void 0 ? o : (Object.keys(e).forEach((n) => {
      const b = (f, c) => (Array.isArray(f) && f.forEach(
        (i, l) => {
          if (!i) return;
          const A = c == null ? void 0 : c[l];
          typeof i == "function" && (c[l] = i(c, n, e)), typeof i == "object" && !Array.isArray(i) && Object.keys(i).forEach((t) => {
            const g = A == null ? void 0 : A[t];
            if (typeof i[t] == "function" && g) {
              const O = i[t](A[t], n, e);
              A[t] = typeof O == "object" ? O[t] : O;
            } else typeof i[t] == "object" && Array.isArray(i[t]) && g && b(i[t], g);
          }), typeof i == "object" && Array.isArray(i) && A && b(i, A);
        }
      ), n), a = u ? [u, n].flat(1) : [n].flat(1), p = e[n], y = M(E, a), w = () => {
        let f, c, i = !1;
        if (typeof y == "function") {
          c = y == null ? void 0 : y(p, n, e);
          const l = typeof c;
          l !== "object" && l !== "undefined" ? (f = n, i = !0) : f = c;
        } else
          f = b(y, p);
        if (Array.isArray(f)) {
          o = h(o, f, p);
          return;
        }
        typeof f == "object" && !Array.isArray(s) ? s = B(s, f) : typeof f == "object" && Array.isArray(s) ? o = { ...o, ...f } : (f !== null || f !== void 0) && (o = h(
          o,
          [f],
          i ? c : p
        ));
      };
      if (y && typeof y == "function" && w(), !(typeof window > "u")) {
        if (T(p)) {
          const f = j(p, a);
          if (Object.keys(f).length < 1)
            return;
          o = h(o, [n], f);
          return;
        }
        w();
      }
    }), R ? o : e);
  };
  return s = Array.isArray(r) && Array.isArray(s) ? [...j(r)] : N({}, j(r), s), s;
};
export {
  C as default,
  T as isPlainObj
};

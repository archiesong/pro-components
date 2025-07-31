import { ref as c, unref as g, watchEffect as h, watch as d, toRaw as i } from "vue";
function C(t, e) {
  const { defaultValue: f, value: u = c() } = e || {};
  let l = typeof t == "function" ? t() : t;
  u.value !== void 0 && (l = g(u)), f !== void 0 && (l = typeof f == "function" ? f() : f);
  const r = c(l), v = c(l);
  h(() => {
    let a = u.value !== void 0 ? u.value : r.value;
    e != null && e.postState && (a = e.postState(a)), v.value = a;
  });
  function n(a) {
    const s = v.value;
    r.value = a, i(v.value) !== a && (e != null && e.onChange) && e.onChange(a, s);
  }
  return d(u, () => {
    r.value = u.value;
  }), [v, n];
}
export {
  C as default
};

import { ref as e } from "vue";
function f(n) {
  const r = typeof n == "function" ? n() : n, o = e(r);
  function i(t) {
    o.value = t;
  }
  return [o, i];
}
export {
  f as default
};

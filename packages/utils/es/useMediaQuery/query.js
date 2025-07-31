import i from "../useLayoutEffect/index.js";
import c from "../useState/index.js";
function u(e) {
  const t = typeof window > "u", [a, o] = c(
    () => t ? !1 : window.matchMedia(e).matches
  );
  return i(() => {
    if (t)
      return;
    const n = window.matchMedia(e), s = (r) => o(r.matches);
    return n.addEventListener("change", s), () => n.removeEventListener("change", s);
  }, [() => e]), a;
}
export {
  u as default
};

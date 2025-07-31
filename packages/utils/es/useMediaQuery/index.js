import a from "./query.js";
import h from "../useEffect/index.js";
import c from "../useState/index.js";
const t = {
  xs: {
    maxWidth: 575,
    matchMedia: "(max-width: 575px)"
  },
  sm: {
    minWidth: 576,
    maxWidth: 767,
    matchMedia: "(min-width: 576px) and (max-width: 767px)"
  },
  md: {
    minWidth: 768,
    maxWidth: 991,
    matchMedia: "(min-width: 768px) and (max-width: 991px)"
  },
  lg: {
    minWidth: 992,
    maxWidth: 1199,
    matchMedia: "(min-width: 992px) and (max-width: 1199px)"
  },
  xl: {
    minWidth: 1200,
    maxWidth: 1599,
    matchMedia: "(min-width: 1200px) and (max-width: 1599px)"
  },
  xxl: {
    minWidth: 1600,
    matchMedia: "(min-width: 1600px)"
  }
}, x = () => {
  let i = "md";
  return typeof window > "u" || (i = Object.keys(t).find((d) => {
    const { matchMedia: m } = t[d];
    return !!window.matchMedia(m).matches;
  })), i;
}, p = () => {
  const i = a(t.md.matchMedia), n = a(t.lg.matchMedia), d = a(t.xxl.matchMedia), m = a(t.xl.matchMedia), s = a(t.sm.matchMedia), r = a(t.xs.matchMedia), [u, e] = c(x());
  return h(() => {
    if (process.env.NODE_ENV === "TEST") {
      e(process.env.USE_MEDIA || "md");
      return;
    }
    if (d.value) {
      e("xxl");
      return;
    }
    if (m.value) {
      e("xl");
      return;
    }
    if (n.value) {
      e("lg");
      return;
    }
    if (i.value) {
      e("md");
      return;
    }
    if (s.value) {
      e("sm");
      return;
    }
    if (r.value) {
      e("xs");
      return;
    }
    e("md");
  }, [
    () => i.value,
    () => n.value,
    () => d.value,
    () => m.value,
    () => s.value,
    () => r.value
  ]), u;
};
export {
  t as MediaQueryEnum,
  p as default,
  x as getScreenClassName
};

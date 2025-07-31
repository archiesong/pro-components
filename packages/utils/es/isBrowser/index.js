const e = typeof process < "u" && process.versions != null && process.versions.node != null, n = () => typeof process < "u" && process.env.NODE_ENV === "TEST" ? !0 : typeof window < "u" && typeof window.document < "u" && typeof window.matchMedia < "u" && !e;
export {
  n as default
};

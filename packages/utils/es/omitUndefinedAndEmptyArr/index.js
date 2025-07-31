const i = (r) => {
  const n = {};
  return Object.keys(r || {}).forEach((t) => {
    var e;
    Array.isArray(r[t]) && ((e = r[t]) == null ? void 0 : e.length) === 0 || r[t] !== void 0 && (n[t] = r[t]);
  }), n;
};
export {
  i as default
};

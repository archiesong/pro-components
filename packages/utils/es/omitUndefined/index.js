const i = (e) => {
  const t = {};
  if (Object.keys(e || {}).forEach((n) => {
    e[n] !== void 0 && (t[n] = e[n]);
  }), !(Object.keys(t).length < 1))
    return t;
};
export {
  i as default
};

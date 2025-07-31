const y = (...t) => {
  const e = {}, l = t.length;
  let o, r = 0;
  for (; r < l; r += 1)
    for (o in t[r])
      Object.prototype.hasOwnProperty.call(t[r], o) && (typeof e[o] == "object" && typeof t[r][o] == "object" && e[o] !== void 0 && e[o] !== null && !Array.isArray(e[o]) && !Array.isArray(t[r][o]) ? e[o] = {
        ...e[o],
        ...t[r][o]
      } : e[o] = t[r][o]);
  return e;
};
export {
  y as default
};

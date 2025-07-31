const r = (t) => t !== null && typeof t == "object", c = Array.isArray, f = (t) => typeof t == "string", l = (...t) => {
  const n = [];
  for (let i = 0; i < t.length; i++) {
    const s = t[i];
    if (s) {
      if (f(s))
        n.push(s);
      else if (c(s))
        for (let e = 0; e < s.length; e++) {
          const o = l(s[e]);
          o && n.push(o);
        }
      else if (r(s))
        for (const e in s)
          s[e] && n.push(e);
    }
  }
  return n.join(" ");
};
export {
  l as default
};

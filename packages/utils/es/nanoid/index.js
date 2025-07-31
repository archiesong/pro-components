let r = 0;
const e = (o = 21) => {
  if (typeof window > "u" || !window.crypto) return (r += 1).toFixed(0);
  let t = "";
  const i = crypto.getRandomValues(new Uint8Array(o));
  for (; o--; ) {
    const n = 63 & i[o];
    t += n < 36 ? n.toString(36) : n < 62 ? (n - 26).toString(36).toUpperCase() : n < 63 ? "_" : "-";
  }
  return t;
}, d = () => typeof window > "u" ? e() : window.crypto && window.crypto.randomUUID && typeof crypto.randomUUID == "function" ? crypto.randomUUID() : e();
export {
  d as default
};

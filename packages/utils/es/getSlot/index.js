const n = (t, f, e = "default") => {
  var a;
  return f[e] === !1 ? !1 : f[e] || ((a = t[e]) == null ? void 0 : a.call(t));
}, u = (t, f, e = "default") => f[e] === !1 ? !1 : f[e] || t[e];
export {
  u as getSlot,
  n as getSlotVNode
};

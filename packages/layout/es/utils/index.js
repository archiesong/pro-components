const a = (r) => (r || []).reduce((n, t) => (t.key && n.push(t.key), t.children ? [...n.concat(a(t.children) || [])] : n), []), h = {
  techBlue: "#1677FF",
  daybreak: "#1890FF",
  dust: "#F5222D",
  volcano: "#FA541C",
  sunset: "#FAAD14",
  cyan: "#13C2C2",
  green: "#52C41A",
  geekblue: "#2F54EB",
  purple: "#722ED1"
};
function F(r) {
  return r && h[r] ? h[r] : r || "";
}
const s = (r) => r.map((n) => {
  var c, u, o;
  const t = n.children || [], e = { ...n };
  if (!((c = e.meta) != null && c.title) || (u = e.meta) != null && u.hideInMenu)
    return null;
  if (e && (e != null && e.children)) {
    if (!((o = e.meta) != null && o.hideChildrenInMenu) && t.some((i) => {
      var l, d;
      return ((l = i.meta) == null ? void 0 : l.title) && !((d = i.meta) != null && d.hideInMenu);
    }))
      return {
        ...n,
        children: s(t)
      };
    Reflect.deleteProperty(e, "children");
  }
  return e;
}).filter((n) => n);
export {
  s as clearMenuItem,
  F as genStringToTheme,
  a as getOpenKeysFromMenuData,
  h as themeConfig
};

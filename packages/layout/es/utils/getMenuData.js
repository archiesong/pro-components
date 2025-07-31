import { transformRoute as v } from "@ant-design-vue/route-utils";
function x(m) {
  return [...m].reduce((t, [f, r]) => (t[f] = r, t), {});
}
const y = (m, t, f, r) => {
  var b, g;
  const a = m.find((k) => k.path === "/"), { menuData: s, breadcrumb: p } = v(
    (a == null ? void 0 : a.children) || [],
    (t == null ? void 0 : t.locale) || !1,
    f
  );
  return p.get((a == null ? void 0 : a.path) || "/") || p.set((a == null ? void 0 : a.path) || "/", {
    key: (a == null ? void 0 : a.path) || "/",
    ...a || {},
    meta: {
      ...(a == null ? void 0 : a.meta) || {},
      locale: ((b = a == null ? void 0 : a.meta) == null ? void 0 : b.locale) || `menu.${(g = a == null ? void 0 : a.meta) == null ? void 0 : g.title}`
    }
  }), r ? y(r(s), t, f, void 0) : {
    breadcrumb: x(p),
    breadcrumbMap: p,
    menuData: s
  };
};
export {
  y as default
};

import { createVNode as f, h as i, resolveComponent as p } from "vue";
import "ant-design-vue";
import { match as l } from "path-to-regexp";
function h(e) {
  if (!e || e === "/")
    return ["/"];
  const t = e.split("/").filter((r) => r);
  return ["/"].concat(t.map((r, n) => `/${t.slice(0, n + 1).join("/")}`));
}
const b = ({
  route: e,
  routes: t
}) => {
  const {
    breadcrumbName: r,
    path: n
  } = e;
  return t.findIndex((s) => s.path === e.path) === t.length - 1 ? f("span", null, [r]) : i(p("RouterLink"), {
    to: n
  }, () => r);
}, g = ({
  meta: e
}, t) => {
  const {
    formatMessage: r,
    menu: n
  } = t;
  return e != null && e.locale && r && (n == null ? void 0 : n.locale) !== !1 ? r({
    id: e.locale,
    defaultMessage: e.title
  }) : e == null ? void 0 : e.title;
}, B = (e, t) => {
  let r = e.get(t);
  if (!r) {
    const o = (Array.from(e.keys()) || []).find((s) => {
      try {
        return s != null && s.startsWith("http") ? !1 : l(s.replace("?", ""))(t);
      } catch (c) {
        return console.log("path", s, c), !1;
      }
    });
    o && (r = e.get(o));
  }
  return r || {
    path: ""
  };
}, I = (e) => {
  const {
    location: t,
    breadcrumbMap: r
  } = e;
  return {
    location: t,
    breadcrumbMap: r
  };
}, R = (e, t, r) => {
  const n = h(e == null ? void 0 : e.pathname);
  let o = "";
  return window.location.pathname.endsWith((e == null ? void 0 : e.pathname) || "") && (o = window.location.pathname.replace((e == null ? void 0 : e.pathname) || "", "")), n.map((c) => {
    const a = B(t, c), u = g(a, r), {
      meta: d
    } = a;
    return u && !(d != null && d.hideInBreadcrumb) ? {
      path: o + c,
      breadcrumbName: u
    } : {
      path: "",
      breadcrumbName: u
    };
  }).filter((c) => c && c.path);
}, y = (e) => {
  const {
    location: t,
    breadcrumbMap: r
  } = I(e);
  return t && t.pathname && r ? R(t, r, e) : [];
}, w = (e, t) => {
  const {
    breadcrumbRender: r,
    itemRender: n
  } = e, {
    minLength: o = 2
  } = t.breadcrumbProps || {}, s = y(e), c = ({
    route: u,
    ...d
  }) => {
    const m = n || b;
    return m == null ? void 0 : m({
      route: u,
      ...d
    });
  };
  let a = s;
  return r && (a = r(a || []) || void 0), (a && a.length < o || r === !1) && (a = void 0), {
    routes: a,
    itemRender: c
  };
};
export {
  y as genBreadcrumbProps,
  B as getBreadcrumb,
  I as getBreadcrumbFromProps,
  w as getBreadcrumbProps,
  h as urlToList
};

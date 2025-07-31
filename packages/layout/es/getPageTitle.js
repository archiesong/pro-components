import { pathToRegexp as m } from "path-to-regexp";
const g = (r, l, i) => {
  if (i) {
    const t = [...i.keys()].find((o) => m(o).regexp.test(r));
    if (t)
      return i.get(t);
  }
  if (l) {
    const t = Object.keys(l).find((o) => m(o).regexp.test(r));
    if (t)
      return l[t];
  }
  return {
    path: ""
  };
}, u = (r, l) => {
  const {
    pathname: i = "/",
    breadcrumb: t,
    breadcrumbMap: o,
    formatMessage: f,
    title: s,
    menu: c = {
      locale: !1
    }
  } = r, n = l ? "" : s || "", e = g(i, t, o);
  if (!e || !e.meta)
    return {
      title: n,
      id: "",
      pageName: n
    };
  let a = e.meta.title;
  return c.locale !== !1 && e.meta.locale && f && (a = f({
    id: e.meta.locale || "",
    defaultMessage: e.meta.title
  })), a ? s ? {
    title: `${a} - ${s}`,
    id: e.meta.locale || "",
    pageName: a
  } : {
    title: a,
    id: e.meta.locale || "",
    pageName: a
  } : {
    title: n,
    id: e.meta.locale || "",
    pageName: n
  };
};
export {
  u as getPageTitleInfo,
  g as matchParamsPath
};

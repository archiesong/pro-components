import { inject as o, provide as n, ref as r } from "vue";
const t = Symbol("routeContext"), c = (e) => n(t, e), s = () => o(t, r({}));
export {
  t as routeContextKey,
  s as useRouteContextInject,
  c as useRouteContextProvider
};

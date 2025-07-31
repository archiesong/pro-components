import { createVNode as r } from "vue";
import { classNames as u } from "@ant-design-vue/pro-utils";
const f = (n) => typeof n == "string" ? r("img", {
  width: "auto",
  height: 22,
  src: n,
  alt: "logo"
}, null) : typeof n == "function" ? n() : n, d = ({
  baseClassName: n,
  hashId: e,
  itemClick: l,
  appList: o
}) => r("div", {
  class: u(`${n}-content`, e)
}, [r("ul", {
  class: u(`${n}-content-list`, e)
}, [o == null ? void 0 : o.map((t, c) => {
  var i;
  return (i = t == null ? void 0 : t.children) != null && i.length ? r("div", {
    key: c,
    class: u(`${n}-content-list-item-group`, e)
  }, [r("div", {
    class: u(`${n}-content-list-item-group-title`, e)
  }, [t.title]), r(d, {
    hashId: e,
    itemClick: l,
    appList: t == null ? void 0 : t.children,
    baseClassName: n
  }, null)]) : r("li", {
    key: c,
    class: u(`${n}-content-list-item`, e)
  }, [r("a", {
    href: l ? void 0 : t.url,
    onClick: () => l == null ? void 0 : l(t),
    target: t.target,
    rel: "noreferrer"
  }, [f(t.icon), r("div", null, [r("div", null, [t.title]), t.desc ? r("span", null, [t.desc]) : null])])]);
})])]);
export {
  d as default,
  f as defaultRenderLogo
};

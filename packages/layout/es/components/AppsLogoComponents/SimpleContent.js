import { createVNode as n } from "vue";
import { classNames as u, isUrl as o } from "@ant-design-vue/pro-utils";
const s = (t, e) => {
  if (t && typeof t == "string" && o(t))
    return n("img", {
      src: t,
      alt: "logo"
    }, null);
  if (typeof t == "function")
    return t();
  if (t && typeof t == "string")
    return n("div", {
      id: "avatarLogo"
    }, [t]);
  if (!t && e && typeof e == "string") {
    const i = e.substring(0, 1);
    return n("div", {
      id: "avatarLogo"
    }, [i]);
  }
  return t;
}, v = ({
  baseClassName: t,
  hashId: e,
  itemClick: i,
  appList: c
}) => n("div", {
  class: u(`${t}-content`, e)
}, [n("ul", {
  class: u(`${t}-content-list`, e)
}, [c == null ? void 0 : c.map((r, f) => {
  var l;
  return (l = r == null ? void 0 : r.children) != null && l.length ? n("div", {
    key: f,
    class: u(`${t}-content-list-item-group`, e)
  }, [n("div", {
    class: u(`${t}-content-list-item-group-title`, e)
  }, [r.title]), n(v, {
    hashId: e,
    itemClick: i,
    appList: r == null ? void 0 : r.children,
    baseClassName: t
  }, null)]) : n("li", {
    key: f,
    class: u(`${t}-content-list-item`, e)
  }, [n("a", {
    href: i ? "javascript:void(0);" : r.url,
    onClick: () => i == null ? void 0 : i(r),
    target: r.target,
    rel: "noreferrer"
  }, [s(r.icon, r.title), n("div", null, [n("div", null, [r.title])])])]);
})])]);
export {
  v as default
};

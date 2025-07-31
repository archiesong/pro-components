import { createVNode as d, cloneVNode as S, isVNode as w } from "vue";
import z from "../../defaultSettings.js";
import { List as b, Select as p, Switch as n, Tooltip as O } from "ant-design-vue";
import { gLocaleObject as j } from "../../locales/index.js";
import { classNames as r } from "@ant-design-vue/pro-utils";
function f(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !w(e);
}
const M = (e) => ({
  id: l
}) => j(e == null ? void 0 : e.value.locale)[l], k = (e) => {
  const l = S(e.action, {
    disabled: e.disabled
  });
  return d(O, {
    title: e.disabled ? e.disabledReason : "",
    placement: "left"
  }, {
    default: () => [d(b.Item, {
      actions: [l]
    }, {
      default: () => [d("span", {
        style: {
          opacity: e.disabled ? 0.5 : 1
        }
      }, [e.title])]
    })]
  });
}, N = ({
  settings: e = {},
  prefixCls: l,
  formatMessage: t,
  changeSetting: a,
  hashId: u
}) => {
  let o, c;
  const {
    compact: m,
    contentWidth: h,
    splitMenus: x,
    fixedHeader: g,
    layout: s,
    fixedSiderbar: y
  } = e || z;
  return d(b, {
    class: r(`${l}-list`, u),
    split: !1,
    renderItem: ({
      item: i
    }) => k(i),
    dataSource: [{
      title: t({
        id: "app.setting.content-width",
        defaultMessage: "内容区域宽度"
      }),
      action: d(p, {
        value: h || "Fixed",
        size: "small",
        class: r("content-width", u),
        onSelect: (i) => a("contentWidth", i),
        style: {
          width: 80
        }
      }, {
        default: () => [s !== "top" ? null : d(p.Option, {
          value: "Fixed"
        }, f(o = t({
          id: "app.setting.content-width.fixed",
          defaultMessage: "固定"
        })) ? o : {
          default: () => [o]
        }), d(p.Option, {
          value: "Fluid"
        }, f(c = t({
          id: "app.setting.content-width.fluid",
          defaultMessage: "流式"
        })) ? c : {
          default: () => [c]
        })]
      })
    }, {
      title: t({
        id: "app.setting.theme.mode.compact",
        defaultMessage: "紧凑模式"
      }),
      action: d(n, {
        size: "small",
        class: "compact-mode",
        checked: !!m,
        onChange: (i) => a("compact", i)
      }, null)
    }, {
      title: t({
        id: "app.setting.fixedheader",
        defaultMessage: "固定头部"
      }),
      disabled: s === "mix",
      disabledReason: t({
        id: "app.setting.fixedheader.hint",
        defaultMessage: "混合模式必须开启固定 Header"
      }),
      action: d(n, {
        size: "small",
        class: "fixed-header",
        checked: !!g,
        onChange: (i) => a("fixedHeader", i)
      }, null)
    }, {
      title: t({
        id: "app.setting.fixedsidebar",
        defaultMessage: "固定侧边菜单"
      }),
      disabled: s === "top",
      disabledReason: t({
        id: "app.setting.fixedsidebar.hint",
        defaultMessage: "侧边菜单布局时可配置"
      }),
      action: d(n, {
        size: "small",
        class: "fix-sidebar",
        checked: !!y,
        onChange: (i) => a("fixedSiderbar", i)
      }, null)
    }, {
      title: t({
        id: "app.setting.splitMenus"
      }),
      disabled: s !== "mix",
      disabledReason: t({
        id: "app.setting.layout.mix.hint",
        defaultMessage: "将菜单分割成Header和Side"
      }),
      action: d(n, {
        size: "small",
        checked: !!x,
        class: "split-menus",
        onChange: (i) => a("splitMenus", i)
      }, null)
    }]
  }, null);
};
export {
  N as LayoutSetting,
  M as getFormatMessage,
  k as renderLayoutSettingItem
};

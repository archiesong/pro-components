import { createVNode as r, mergeProps as i } from "vue";
import { Tooltip as k } from "ant-design-vue";
import { CheckOutlined as C } from "@ant-design/icons-vue";
import { classNames as u } from "@ant-design-vue/pro-utils";
const g = ({
  color: t,
  check: e,
  ...n
}) => r("div", i(n, {
  style: {
    backgroundColor: t
  }
}), [e ? r(C, null, null) : ""]), o = ({
  value: t,
  colorList: e,
  onChange: n,
  prefixCls: s,
  formatMessage: f,
  hashId: a
}) => {
  if (!e || (e == null ? void 0 : e.length) < 1)
    return null;
  const l = `${s}-theme-color`;
  return r("div", {
    class: u(`${l}`, a)
  }, [e == null ? void 0 : e.map(({
    key: p,
    color: m,
    title: d
  }) => p ? r(k, {
    key: m,
    title: d ?? f({
      id: `app.setting.themecolor.${p}`
    })
  }, {
    default: () => [r(g, {
      class: u(`${l}-block`, a),
      color: m,
      check: (t.startsWith("#") ? t.toUpperCase() : t) === m,
      onClick: () => n && n(m)
    }, null)]
  }) : null)]);
};
export {
  o as default
};

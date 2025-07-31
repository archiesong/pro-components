import { createVNode as n } from "vue";
import { List as m, Switch as u } from "ant-design-vue";
import { renderLayoutSettingItem as c } from "./LayoutChange.js";
import { classNames as a } from "@ant-design-vue/pro-utils";
const S = ({
  settings: t = {},
  prefixCls: i,
  changeSetting: o,
  formatMessage: l,
  hashId: r
}) => {
  const s = ["header", "footer", "menu", "menuHeader"];
  return n(m, {
    split: !1,
    class: a(`${i}-list`, r),
    renderItem: ({
      item: e
    }) => c(e),
    dataSource: s.map((e) => ({
      title: l({
        id: `app.setting.regionalsettings.${e}`
      }),
      action: n(u, {
        size: "small",
        class: a(`regional-${e}`, r),
        checked: (t[`${e}Render`] || t[`${e}Render`]) === void 0,
        onChange: (d) => o(`${e}Render`, d === !0 ? void 0 : !1)
      }, null)
    }))
  }, null);
};
export {
  S as default
};

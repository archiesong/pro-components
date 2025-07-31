import { createVNode as l } from "vue";
import { MenuUnfoldOutlined as n, MenuFoldOutlined as t } from "@ant-design/icons-vue";
const i = ({
  collapsed: o,
  tabIndex: e
}) => o ? l(n, {
  tabindex: e
}, null) : l(t, {
  tabindex: e
}, null);
export {
  i as default
};

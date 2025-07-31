import { createVNode as o, Fragment as n, createTextVNode as s } from "vue";
import { Layout as i } from "ant-design-vue";
import { CopyrightOutlined as m } from "@ant-design/icons-vue";
import u from "../GlobalFooter/index.js";
const {
  Footer: d
} = i, F = ({
  class: t,
  style: l,
  links: r,
  prefixCls: a,
  copyright: e
}) => o(d, {
  class: t,
  style: {
    padding: 0,
    zIndex: 7,
    ...l
  }
}, {
  default: () => [o(u, {
    links: r,
    prefixCls: a,
    copyright: e !== !1 && o(n, null, [o(m, null, null), s(" "), e])
  }, null)]
});
export {
  F as default
};

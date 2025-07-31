import { createVNode as c } from "vue";
import { Tooltip as t } from "ant-design-vue";
import { CheckOutlined as i } from "@ant-design/icons-vue";
import { classNames as s } from "@ant-design-vue/pro-utils";
const h = (l) => {
  const a = `${l.prefixCls}-block-checkbox`;
  return c("div", {
    class: s(a, l.hashId)
  }, [(l.list || []).map((e) => c(t, {
    title: e.title,
    key: e.key
  }, {
    default: () => [c("div", {
      class: s(l.hashId, `${a}-item`, `${a}-item-${e.key}`, `${a}-${l.configType}-item`),
      onClick: () => {
        var n;
        return (n = l.onChange) == null ? void 0 : n.call(l, e.key);
      }
    }, [e.key === "left" && c("div", {
      class: `${a}-item-left-inner ${l.hashId}`
    }, null), c(i, {
      class: `${a}-selectIcon ${l.hashId}`,
      style: {
        display: l.value === e.key ? "block" : "none"
      }
    }, null), e != null && e.icon ? c("div", {
      class: `${a}-icon ${l.hashId}`
    }, [e.icon]) : null])]
  }))]);
};
h.inheritAttrs = !1;
export {
  h as default
};

import { useStyle as s } from "@ant-design-vue/pro-provider";
const o = (n, e) => ({
  [`${n.componentCls}${n.antCls}-menu`]: {
    [`${n.antCls}-menu-item-group`]: {
      "&-title": {
        paddingInlineStart: 8,
        [`${n.iconCls}`]: {
          marginInlineEnd: 10
        }
      }
    }
  },
  [`${n.proComponentsCls}-drawer-sider`]: {
    [`${n.componentCls}${n.proComponentsCls}-sider-menu${n.antCls}-menu-light${n.antCls}-menu-root`]: {
      borderInlineEnd: "none"
    }
  },
  ...e.includes("horizontal") ? {
    [`${n.componentCls}${n.antCls}-menu-light`]: {
      borderBlockEnd: "none"
    }
  } : {
    [`${n.componentCls}${n.proComponentsCls}-sider-menu${n.antCls}-menu-light${n.antCls}-menu-root`]: {
      borderInlineEnd: "none"
    }
  }
});
function i(n, e) {
  return s(
    "ProLayoutBaseMenu" + (e || "inline").charAt(0).toUpperCase() + (e || "inline").slice(1),
    (l) => {
      const r = {
        ...l,
        componentCls: `.${n.value}`
      };
      return [o(r, e || "inline")];
    }
  );
}
export {
  i as useStyle
};

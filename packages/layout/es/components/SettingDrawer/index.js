import { defineComponent as F, ref as M, computed as C, createVNode as e, isVNode as D } from "vue";
import { Drawer as A, message as b, Divider as y, List as O, Switch as N, Alert as $, Button as P } from "ant-design-vue";
import { SettingOutlined as j, CloseOutlined as L, NotificationOutlined as E, CopyOutlined as W } from "@ant-design/icons-vue";
import { useStyle as z } from "./style/index.js";
import { getFormatMessage as H, LayoutSetting as U, renderLayoutSettingItem as J } from "./LayoutChange.js";
import k from "./BlockCheckbox.js";
import R from "./ThemeColor.js";
import { GroupIcon as V } from "./icon/group.js";
import { SubIcon as _ } from "./icon/sub.js";
import q from "./RegionalChange.js";
import { genStringToTheme as G } from "../../utils/index.js";
import { useConfigContextInject as K } from "ant-design-vue/es/config-provider/context";
import Q from "../../defaultSettings.js";
import { useMountMergeState as I, classNames as m, CopyToClipboard as X, omit as Y } from "@ant-design-vue/pro-utils";
function Z(t) {
  return typeof t == "function" || Object.prototype.toString.call(t) === "[object Object]" && !D(t);
}
const ee = () => ({
  settings: Object,
  prefixCls: {
    type: String,
    default: void 0
  },
  collapsed: {
    type: Boolean,
    default: void 0
  },
  colorList: {
    type: [Array, Boolean],
    default: void 0
  },
  hideHintAlert: {
    type: Boolean,
    default: void 0
  },
  hideCopyButton: {
    type: Boolean,
    default: void 0
  },
  onSettingChange: {
    type: Function,
    default: void 0
  },
  onCollapse: {
    type: Function,
    default: void 0
  },
  "onUpdate:collapsed": {
    type: Function,
    default: void 0
  }
}), p = ({
  hashId: t,
  prefixCls: h,
  title: v
}, {
  slots: f
}) => {
  var a;
  return e("div", {
    style: {
      marginBlockEnd: "12px"
    }
  }, [e("h3", {
    class: `${h}-body-title ${t}`
  }, [v]), (a = f.default) == null ? void 0 : a.call(f)]);
}, te = (t) => JSON.stringify(Y({
  ...t,
  colorPrimary: t.colorPrimary
}, ["colorWeak"]), null, 2), me = /* @__PURE__ */ F({
  name: "SettingDrawer",
  inheritAttrs: !1,
  props: ee(),
  setup(t) {
    const {
      getPrefixCls: h,
      locale: v
    } = K(), f = M(), a = C(() => `${t.prefixCls || h("pro")}-setting-drawer`), l = H(v), {
      wrapSSR: w,
      hashId: i
    } = z(a), [c, x] = I(!1, {
      value: t.collapsed === void 0 ? void 0 : M(t.collapsed),
      onChange: (o) => {
        var s, n;
        return ((s = t["onUpdate:collapsed"]) == null ? void 0 : s.call(t, o)) && ((n = t.onCollapse) == null ? void 0 : n.call(t, o));
      }
    }), T = C(() => {
      var o;
      return m(a.value, i.value, {
        [`${a.value}-collapsed`]: !c.value,
        [`${a.value}-realDark`]: ((o = t.settings) == null ? void 0 : o.navTheme) === "realDark"
      });
    }), [u, B] = I(Q, {
      value: t.settings === void 0 ? void 0 : C(() => t.settings || {}),
      onChange: t.onSettingChange
    }), g = (o, s) => {
      const n = {};
      if (n[o] = s, o === "layout" && (n.contentWidth = s === "top" ? "Fixed" : "Fluid", ["mix", "side"].includes(s) || (n.siderMenuType = "sub")), o === "layout" && s !== "mix" && (n.splitMenus = !1), o === "layout" && s === "mix" && (n.fixedHeader = !0), o === "layout" && s === "left" && (n.fixSiderbar = !0, n.fixedHeader = !0), o === "colorWeak") {
        const r = document.querySelector("body");
        if (!r) return;
        s ? (r.dataset.prosettingdrawer = r.style.filter, r.style.filter = "invert(80%)") : (r.style.filter = r.dataset.prosettingdrawer || "none", delete r.dataset.prosettingdrawer);
      }
      delete n.menu, delete n.title, delete n.iconfontUrl, delete n.logo, delete n.pwa, B({
        ...u.value,
        ...n
      });
    };
    return () => {
      let o;
      const {
        // navTheme,
        colorList: s = [{
          key: "techBlue",
          color: "#1677FF"
        }, {
          key: "daybreak",
          color: "#1890FF"
        }, {
          key: "dust",
          color: "#F5222D"
        }, {
          key: "volcano",
          color: "#FA541C"
        }, {
          key: "sunset",
          color: "#FAAD14"
        }, {
          key: "cyan",
          color: "#13C2C2"
        }, {
          key: "green",
          color: "#52C41A"
        }, {
          key: "geekblue",
          color: "#2F54EB"
        }, {
          key: "purple",
          color: "#722ED1"
        }],
        // transitionList = [
        //   {
        //     value: 'null',
        //     label: formatMessage({
        //       id: 'app.setting.transitionName.empty',
        //       defaultMessage: 'Null',
        //     }),
        //   },
        //   {
        //     value: `${getPrefixCls('pro')}-slide-fadein-up`,
        //     label: formatMessage({
        //       id: 'app.setting.transitionName.slide.up',
        //       defaultMessage: 'Slide Up',
        //     }),
        //   },
        //   {
        //     value: `${getPrefixCls('pro')}-slide-fadein-right`,
        //     label: formatMessage({
        //       id: 'app.setting.transitionName.slide.right',
        //       defaultMessage: 'Slide Right',
        //     }),
        //   },
        //   {
        //     value: `${getPrefixCls('pro')}-zoom-fadein`,
        //     label: formatMessage({
        //       id: 'app.setting.transitionName.fade.in',
        //       defaultMessage: 'Fade In',
        //     }),
        //   },
        //   {
        //     value: `${getPrefixCls('pro')}-fadein`,
        //     label: formatMessage({
        //       id: 'app.setting.transitionName.zoom',
        //       defaultMessage: 'Zoom',
        //     }),
        //   },
        // ],
        hideCopyButton: n,
        hideHintAlert: r
      } = t;
      return w(e(A, {
        open: c.value,
        closable: !1,
        width: 300,
        rootClassName: T.value,
        onClose: () => x(!1),
        placement: "right",
        handle: e("div", {
          class: m(`${a.value}-handle`, i.value),
          onClick: () => x(!c.value)
        }, [c.value ? e(L, {
          style: {
            color: "rgb(255,255,255)",
            fontSize: "20px"
          }
        }, null) : e(j, {
          spin: !0,
          style: {
            color: "rgb(255,255,255)",
            fontSize: "20px"
          }
        }, null)])
      }, {
        default: () => [e("div", {
          class: m(`${a.value}-content`, i.value)
        }, [e(p, {
          prefixCls: a.value,
          hashId: i.value,
          title: l({
            id: "app.setting.pagestyle",
            defaultMessage: "整体风格设置"
          })
        }, {
          default: () => [e(k, {
            hashId: i.value,
            prefixCls: a.value,
            list: [{
              key: "light",
              title: l({
                id: "app.setting.pagestyle.light",
                defaultMessage: "亮色菜单风格"
              })
            }, {
              key: "dark",
              title: l({
                id: "app.setting.pagestyle.dark",
                defaultMessage: "暗色菜单风格"
              })
            }, {
              key: "realDark",
              title: l({
                id: "app.setting.pagestyle.realdark",
                defaultMessage: "暗色风格"
              })
            }],
            configType: "theme",
            key: "navTheme",
            value: u.value.navTheme,
            onChange: (d) => g("navTheme", d)
          }, null)]
        }), s !== !1 && e(p, {
          hashId: i.value,
          title: l({
            id: "app.setting.themecolor",
            defaultMessage: "主题色"
          }),
          prefixCls: a.value
        }, {
          default: () => [e(R, {
            hashId: i.value,
            prefixCls: a.value,
            colorList: s,
            formatMessage: l,
            value: G(u.value.colorPrimary),
            onChange: async (d) => {
              var S;
              d !== u.value.colorPrimary && (f.value = b.loading(l({
                id: "app.setting.loading",
                defaultMessage: "正在加载主题"
              }), 0)), g("colorPrimary", d), f.value && ((S = f.value) == null || S.call(f));
            }
          }, null)]
        }), e(y, null, null), e(p, {
          hashId: i.value,
          title: l({
            id: "app.setting.navigationmode",
            defaultMessage: "导航模式"
          }),
          prefixCls: a.value
        }, {
          default: () => [e(k, {
            prefixCls: a.value,
            value: u.value.layout,
            key: "layout",
            hashId: i.value,
            configType: "layout",
            list: [{
              key: "side",
              title: l({
                id: "app.setting.sidemenu",
                defaultMessage: "侧边菜单布局"
              })
            }, {
              key: "top",
              title: l({
                id: "app.setting.topmenu",
                defaultMessage: "顶部菜单布局"
              })
            }, {
              key: "mix",
              title: l({
                id: "app.setting.mixmenu",
                defaultMessage: "混合菜单布局"
              })
            }, {
              key: "left",
              title: l({
                id: "app.setting.leftmenu",
                defaultMessage: "左侧混合布局"
              })
            }],
            onChange: (d) => g("layout", d)
          }, null)]
        }), u.value.layout === "side" || u.value.layout === "mix" ? e(p, {
          hashId: i.value,
          prefixCls: a.value,
          title: l({
            id: "app.setting.sidermenutype",
            defaultMessage: "侧边菜单类型"
          })
        }, {
          default: () => [e(k, {
            prefixCls: a.value,
            value: u.value.siderMenuType,
            key: "siderMenuType",
            hashId: i.value,
            configType: "siderMenuType",
            list: [{
              key: "sub",
              icon: e(_, null, null),
              title: l({
                id: "app.setting.sidermenutype-sub",
                defaultMessage: "经典模式"
              })
            }, {
              key: "group",
              icon: e(V, null, null),
              title: l({
                id: "app.setting.sidermenutype-group",
                defaultMessage: "分组模式"
              })
            }],
            onChange: (d) => g("siderMenuType", d)
          }, null)]
        }) : null, e(U, {
          prefixCls: a.value,
          hashId: i.value,
          formatMessage: l,
          settings: {
            ...u.value
          },
          changeSetting: g
        }, null), e(y, null, null), e(p, {
          hashId: i.value,
          prefixCls: a.value,
          title: l({
            id: "app.setting.regionalsettings",
            defaultMessage: "内容区域"
          })
        }, {
          default: () => [e(q, {
            hashId: i.value,
            prefixCls: a.value,
            formatMessage: l,
            settings: {
              ...u.value
            },
            changeSetting: g
          }, null)]
        }), e(y, null, null), e(p, {
          hashId: i.value,
          prefixCls: a.value,
          title: l({
            id: "app.setting.othersettings",
            defaultMessage: "其他设置"
          })
        }, {
          default: () => [e(O, {
            class: m(`${a.value}-list`, i.value),
            split: !1,
            size: "small",
            renderItem: ({
              item: d
            }) => J(d),
            dataSource: [
              // transitionList !== false && {
              //   title: formatMessage({
              //     id: 'app.setting.transitionName',
              //     defaultMessage: '路由动画',
              //   }),
              //   action: (
              //     <Select
              //       size="small"
              //       value={transitionName}
              //       onSelect={(value: any) => changeSetting('transitionName', value)}
              //       style={{ width: '110px' }}
              //       options={transitionList}
              //     />
              //   ),
              // },
              // {
              //   title: formatMessage({
              //     id: 'app.setting.multitab',
              //     defaultMessage: '多标签',
              //   }),
              //   action: (
              //     <Switch
              //       size="small"
              //       checked={!!multiTab}
              //       onChange={(checked) => {
              //         changeSetting('multiTab', checked as boolean);
              //       }}
              //     />
              //   ),
              // },
              // {
              //   title: formatMessage({
              //     id: 'app.setting.multitabFixed',
              //     defaultMessage: '固定多标签',
              //   }),
              //   disabled: !(multiTab && fixedHeader),
              //   disabledReason: formatMessage({
              //     id: 'app.setting.multitab.fixed.hit',
              //     defaultMessage: '固定多标签需要先开启多标签并且固定 Header',
              //   }),
              //   action: (
              //     <Switch
              //       size="small"
              //       checked={!!multiTabFixed}
              //       onChange={(checked) => {
              //         changeSetting('multiTabFixed', checked as boolean);
              //       }}
              //     />
              //   ),
              // },
              {
                title: l({
                  id: "app.setting.weakmode",
                  defaultMessage: "色弱模式"
                }),
                action: e(N, {
                  size: "small",
                  class: "color-weak",
                  checked: !!u.value.colorWeak,
                  onChange: (d) => {
                    g("colorWeak", d);
                  }
                }, null)
              }
            ]
          }, null)]
        }), r && n ? null : e(y, null, null), r ? null : e($, {
          type: "warning",
          message: l({
            id: "app.setting.production.hint",
            defaultMessage: "配置栏只在开发环境用于预览，生产环境不会展现，请拷贝后手动修改配置文件"
          }),
          icon: e(E, null, null),
          showIcon: !0,
          style: {
            marginBlockEnd: "16px"
          }
        }, null), n ? null : e(X, {
          text: te(u.value),
          onCopy: () => b.success(l({
            id: "app.setting.copyinfo",
            defaultMessage: "拷贝成功，请到 src/defaultSettings.js 中替换默认配置"
          }))
        }, {
          default: () => [e(P, {
            block: !0,
            icon: e(W, null, null),
            style: {
              marginBlockEnd: "24px"
            }
          }, Z(o = l({
            id: "app.setting.copy"
          })) ? o : {
            default: () => [o]
          })]
        })])]
      }));
    };
  }
});
export {
  me as default,
  ee as settingDrawerProps
};

import { defineComponent as e, createVNode as t } from "vue";
import { Select as n } from "ant-design-vue";
import { selectProps as a } from "ant-design-vue/es/select";
import { omit as r } from "@ant-design-vue/pro-utils";
const u = () => ({
  ...r(a(), ["options"]),
  /** 防抖动时间 默认10 单位ms */
  debounceTime: {
    type: Number,
    default: void 0
  },
  /** 自定义搜索方法, 返回搜索结果的 Promise */
  request: {
    type: Function,
    default: void 0
  },
  /** 自定义选项渲染 */
  optionItemRender: {
    type: Function,
    default: void 0
  },
  /** 指定组件中的值 */
  value: {
    type: [String, Object, Array],
    default: void 0
  },
  /** 指定默认选中的条目 */
  defaultValue: {
    type: [String, Object, Array],
    default: void 0
  },
  options: {
    type: Array,
    default: void 0
  },
  /**
   * 是否在输入框聚焦时触发搜索
   *
   * @default false
   */
  searchOnFocus: {
    type: Boolean,
    default: !1
  },
  /**
   * 选择完一个之后是否清空搜索项重新搜索
   *
   * @default false
   */
  resetAfterSelect: {
    type: Boolean,
    default: !1
  },
  /** 刷新数据 */
  fetchData: {
    type: Function,
    default: void 0
  },
  /** 清空数据 */
  resetData: {
    type: Function,
    default: void 0
  },
  /**
   * 当搜索关键词发生变化时是否请求远程数据
   *
   * @default true
   */
  fetchDataOnSearch: {
    type: Boolean,
    default: !0
  },
  /** 默认搜索关键词 */
  defaultSearchValue: {
    type: String,
    default: void 0
  },
  /**
   * 在选择时保留选项的原始标签文本
   * 当设置为 true 时，选中后回填的内容将使用选项的原始 label，而不是经过 optionItemRender 处理后的内容
   * @default false
   */
  preserveOriginalLabel: {
    type: Boolean,
    default: !1
  }
}), p = /* @__PURE__ */ e({
  name: "SearchSelect",
  inheritAttrs: !1,
  props: u(),
  setup(l) {
    return () => t(n, null, null);
  }
});
export {
  p as default,
  u as searchSelectProps
};

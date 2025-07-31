import type { PropType } from 'vue';
import type { VueNode } from 'ant-design-vue/es/_util/type';
import type { RequestOptionsType } from '@ant-design-vue/pro-utils';
import { defineComponent } from 'vue';
import { Select } from 'ant-design-vue';
import { LabeledValue, selectProps } from 'ant-design-vue/es/select';
import { omit } from '@ant-design-vue/pro-utils';

// 支持 key, value, label，兼容 UserSearch 中只填写了 key 的情况。
export type KeyLabel = Partial<LabeledValue> & RequestOptionsType;

/** 用户扩展数据后的值类型 */
export type DataValueType<T> = KeyLabel & T;

/** 可能单选，可能多选 */
export type DataValuesType<T> = DataValueType<T> | DataValueType<T>[];

export const searchSelectProps = () => ({
  ...omit(selectProps(), ['options']),
  /** 防抖动时间 默认10 单位ms */
  debounceTime: {
    type: Number as PropType<number>,
    default: undefined,
  },
  /** 自定义搜索方法, 返回搜索结果的 Promise */
  request: {
    type: Function as PropType<
      (params: { query: string }) => Promise<DataValueType<Record<string, any>>[]>
    >,
    default: undefined,
  },
  /** 自定义选项渲染 */
  optionItemRender: {
    type: Function as PropType<(item: DataValueType<Record<string, any>>) => VueNode>,
    default: undefined,
  },
  /** 指定组件中的值 */
  value: {
    type: [String, Object, Array] as PropType<KeyLabel | KeyLabel[]>,
    default: undefined,
  },
  /** 指定默认选中的条目 */
  defaultValue: {
    type: [String, Object, Array] as PropType<KeyLabel | KeyLabel[]>,
    default: undefined,
  },
  options: {
    type: Array as PropType<RequestOptionsType[]>,
    default: undefined,
  },
  /**
   * 是否在输入框聚焦时触发搜索
   *
   * @default false
   */
  searchOnFocus: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  /**
   * 选择完一个之后是否清空搜索项重新搜索
   *
   * @default false
   */
  resetAfterSelect: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  /** 刷新数据 */
  fetchData: {
    type: Function as PropType<(keyWord?: string) => void>,
    default: undefined,
  },
  /** 清空数据 */
  resetData: {
    type: Function as PropType<() => void>,
    default: undefined,
  },
  /**
   * 当搜索关键词发生变化时是否请求远程数据
   *
   * @default true
   */
  fetchDataOnSearch: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  /** 默认搜索关键词 */
  defaultSearchValue: {
    type: String as PropType<string>,
    default: undefined,
  },
  /**
   * 在选择时保留选项的原始标签文本
   * 当设置为 true 时，选中后回填的内容将使用选项的原始 label，而不是经过 optionItemRender 处理后的内容
   * @default false
   */
  preserveOriginalLabel: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
});

const SearchSelect = defineComponent({
  name: 'SearchSelect',
  inheritAttrs: false,
  props: searchSelectProps(),
  setup(props) {
    return () => {
      return <Select />;
    };
  },
});

export default SearchSelect;

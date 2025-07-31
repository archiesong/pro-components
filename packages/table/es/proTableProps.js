import { tableProps as e } from "ant-design-vue/es/table";
import { omit as o } from "@ant-design-vue/pro-utils";
const l = () => ({
  ...o(e(), ["columns", "rowSelection"]),
  /**
   * @description 列配置能力，支持一个数组
   */
  columns: {
    type: Array,
    default: void 0
  },
  /**
   * request 的参数，修改之后会触发更新
   *
   * @example pathname 修改重新触发 request
   * params={{ pathName }}
   */
  params: {
    type: Object,
    default: void 0
  },
  /** @description 一个获得 dataSource 的方法 */
  request: {
    type: Function,
    default: void 0
  },
  /**
   * @description 编辑行相关的配置
   *
   * @example 支持多行编辑
   * editable={{type:"multiple"}}
   *
   * @example 保存的时候请求后端
   * editable={{ onSave:async (rows)=>{ await save(rows) } }}
   */
  editable: {
    type: Object,
    default: void 0
  },
  /** @description 操作栏配置 */
  options: {
    type: [Object, Boolean],
    default: void 0
  },
  /**@description 支持 ProTable 的类型 */
  type: {
    type: String,
    default: void 0
  },
  /**
   * @type SearchConfig
   * @description 是否显示搜索表单
   */
  search: {
    type: [Object, Boolean],
    default: void 0
  },
  /** @description 是否手动触发请求 */
  manualRequest: {
    type: Boolean,
    default: void 0
  },
  /** @description 选择项配置 */
  rowSelection: {
    type: [Object, Boolean]
  },
  /**
   *@description 错误边界自定义
   */
  errorBoundaryRender: {
    type: [Object, Function, Boolean],
    default: void 0
  }
});
export {
  l as proTableProps
};

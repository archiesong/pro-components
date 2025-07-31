import type { ExtractPropTypes, PropType } from 'vue';
import type { SpinProps, TableProps } from 'ant-design-vue';
import type { FilterValue, SortOrder } from 'ant-design-vue/es/table/interface';
import type { NamePath } from 'ant-design-vue/es/form/interface';
import type { Key, VueNode } from 'ant-design-vue/es/_util/type';
import type dayjs from 'dayjs';
import type { ProFormInstance, ProFormProps, QueryFilterProps } from '@ant-design-vue/pro-form';
import type { DensitySize } from './components/ToolBar/DensityIcon';
import type {
  LabelTooltipType,
  ProSchemaComponentTypes,
  RowEditableConfig,
} from '@ant-design-vue/pro-utils';
import type { ProCardProps } from '@ant-design-vue/pro-card';
import type { ProFieldEmptyText } from '@ant-design-vue/pro-field';
import type { Bordered, ColumnStateType, ProColumns, RequestData, WithFalse } from './typing';
import type {
  AlertRender,
  ErrorBoundaryRender,
  SearchFormRender,
  TableRender,
} from './RenderTypings';
import type { OptionConfig, ToolBarProps } from './components/ToolBar';
import type { ListToolBarProps } from './components/ListToolBar';
import type { SearchConfig } from './components/Form/FormRender';
import { tableProps } from 'ant-design-vue/es/table';
import { omit } from '@ant-design-vue/pro-utils';

export const proTableProps = () => ({
  ...omit(tableProps(), ['columns', 'rowSelection']),
  /**
   * @name 列配置能力，支持一个数组
   */
  columns: {
    type: Array as PropType<ProColumns[]>,
    default: undefined,
  },
  /**
   * request 的参数，修改之后会触发更新
   *
   * @example pathname 修改重新触发 request
   * params={{ pathName }}
   */
  params: {
    type: Object as PropType<Record<string, any>>,
    default: undefined,
  },
  /** @name 列状态的配置，可以用来操作列功能 */
  columnsState: {
    type: Object as PropType<ColumnStateType>,
    default: undefined,
  },
  /** @name 空值时显示 */
  columnEmptyText: {
    type: String as PropType<ProFieldEmptyText>,
    default: '-',
  },
  /** @name 查询表单和 Table 的卡片 border 配置 */
  cardBordered: {
    type: [Boolean, Object] as PropType<Bordered>,
    default: undefined,
  },
  /**
   * @name 操作自带的 form
   */
  formRef: {
    type: Object as PropType<ProFormInstance>,
    default: undefined,
  },
  'onUpdate:formRef': {
    type: Function as PropType<(formRef: ProFormInstance) => void>,
    default: undefined,
  },
  /**
   * 基本配置与 antd Form 相同, 但是劫持了 form onFinish 的配置
   *
   * @name type="form" 和 搜索表单 的 Form 配置
   */
  form: {
    type: Object as PropType<Omit<ProFormProps & QueryFilterProps, 'form'>>,
    default: undefined,
  },
  /**
   * 暂时只支持 dayjs - string 会格式化为 YYYY-DD-MM - number 代表时间戳
   *
   * @name 如何格式化日期
   */
  dateFormatter: {
    type: [Boolean, String, Object, Function] as PropType<
      WithFalse<
        | (string & Record<string, any>)
        | 'string'
        | 'number'
        | ((value: dayjs.Dayjs, valueType: string) => Key)
      >
    >,
    default: undefined,
  },
  /**
   * @name 渲染 table 视图，用于定制 ProList，不推荐直接使用
   */
  tableViewRender: {
    type: [Object, Function] as PropType<(props: TableProps<any>, defaultDom: VueNode) => VueNode>,
    default: undefined,
  },
  /** @name 一个获得 dataSource 的方法 */
  request: {
    type: Function as PropType<
      (
        params: Record<string, any> & {
          pageSize?: number;
          current?: number;
          keyword?: string;
        },
        sort: Record<string, SortOrder>,
        filter: Record<string, FilterValue | null>
      ) => Promise<Partial<RequestData<any>>>
    >,
    default: undefined,
  },
  /** @name 默认的数据 */
  defaultData: {
    type: Array as PropType<any[]>,
    default: undefined,
  },
  /**
   * @name, 可编辑表格的name,通过这个name 可以直接与 form通信，无需嵌套
   */
  name: {
    type: [String, Number, Array] as PropType<NamePath>,
    default: undefined,
  },
  /**
   * @name table 外面卡片的设置
   */
  cardProps: {
    type: [Object, Boolean] as PropType<WithFalse<ProCardProps>>,
    default: undefined,
  },
  /** @name 左上角的 title */
  headerTitle: {
    type: [String, Object, Function, Number, Boolean] as PropType<VueNode>,
    default: undefined,
  },
  /** @name 标题旁边的 tooltip */
  tooltip: {
    type: [String, Object] as PropType<string | LabelTooltipType>,
    default: undefined,
  },
  /**
   * @name 渲染操作栏
   */
  toolBarRender: {
    type: [Boolean, Function] as PropType<WithFalse<ToolBarProps['toolBarRender']>>,
    default: undefined,
  },
  optionsRender: {
    type: [Boolean, Function] as PropType<ToolBarProps['optionsRender']>,
    default: undefined,
  },
  /**
   * @name 渲染 table
   */
  tableRender: {
    type: [Object, Function, Boolean] as PropType<TableRender>,
    default: undefined,
  },
  /**
   * @name 编辑行相关的配置
   *
   * @example 支持多行编辑
   * editable={{type:"multiple"}}
   *
   * @example 保存的时候请求后端
   * editable={{ onSave:async (rows)=>{ await save(rows) } }}
   */
  editable: {
    type: Object as PropType<RowEditableConfig<any>>,
    default: undefined,
  },
  /** @name 操作栏配置 */
  options: {
    type: [Object, Boolean] as PropType<WithFalse<OptionConfig>>,
    default: undefined,
  },
  onSizeChange: {
    type: Function as PropType<(size: DensitySize) => void>,
    default: undefined,
  },
  /**
   * @name ListToolBar 的属性
   */
  toolbar: {
    type: Object as PropType<ListToolBarProps>,
    default: undefined,
  },
  /**@name 支持 ProTable 的类型 */
  type: {
    type: String as PropType<ProSchemaComponentTypes>,
    default: 'table',
  },
  /**
   * 只在request 存在的时候生效，可编辑表格也不会生效
   *
   * @default false
   * @name 窗口聚焦时自动重新请求
   */
  revalidateOnFocus: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  /** @name 对数据进行一些处理 */
  postData: {
    type: Object as PropType<any>,
    default: undefined,
  },
  /**
   * @type SearchConfig
   * @name 是否显示搜索表单
   */
  search: {
    type: [Object, Boolean] as PropType<WithFalse<SearchConfig>>,
    default: undefined,
  },
  /** @name 是否手动触发请求 */
  manualRequest: {
    type: Boolean as PropType<boolean>,
    default: undefined,
  },
  /**
   * @name 可编辑表格修改数据的改变
   */
  onDataSourceChange: {
    type: Function as PropType<(dataSource: any[]) => void>,
    default: undefined,
  },

  /**
   * @name 数据加载完成后触发
   */
  onLoad: {
    type: Function as PropType<(dataSource: any[]) => void>,
    default: undefined,
  },
  /**
   * @name loading 被修改时触发，一般是网络请求导致的
   */
  onLoadingChange: {
    type: Function as PropType<(loading: boolean | SpinProps | undefined) => void>,
    default: undefined,
  },
  /**
   * @name 数据加载失败时触发
   */
  onRequestError: {
    type: Function as PropType<(e: Error) => void>,
    default: undefined,
  },
  /** @name 去抖时间 */
  debounceTime: {
    type: Number as PropType<number>,
    default: undefined,
  },
  /**
   * 是否轮询 ProTable 它不会自动提交表单，如果你想自动提交表单的功能，需要在 onValueChange 中调用 formRef.current?.submit()
   * @property {number} polling 表示轮询的时间间隔，0 表示关闭轮询，大于 0 表示开启轮询，最小的轮询时间为 2000ms
   * @param dataSource 返回当前的表单数据，你可以用它判断要不要打开轮询
   */
  polling: {
    type: [Number, Function] as PropType<number | ((dataSource: any[]) => number)>,
    default: undefined,
  },
  /** @name 格式化搜索表单提交数据 */
  beforeSearchSubmit: {
    type: Function as PropType<(params: Partial<Record<string, any>>) => any>,
    default: undefined,
  },
  /**
   * 设置或者返回false 即可关闭
   *
   * @name 自定义 table 的 alert
   */
  tableAlertRender: {
    type: [Boolean, Function] as PropType<AlertRender>,
    default: undefined,
  },

  /**
   * @name 渲染搜索表单
   */
  searchFormRender: {
    type: Function as PropType<SearchFormRender>,
    default: undefined,
  },
  /**
   * 设置或者返回false 即可关闭
   *
   * @name 自定义 table 的 alert 的操作
   */
  tableAlertOptionRender: {
    type: [Boolean, Function] as PropType<AlertRender>,
    default: undefined,
  },
  /** @name 选择项配置 */
  rowSelection: {
    type: [Object, Boolean] as PropType<
      WithFalse<
        TableProps<any>['rowSelection'] & {
          alwaysShowAlert?: boolean;
        }
      >
    >,
  },
  /**
   *@name 错误边界自定义
   */
  errorBoundaryRender: {
    type: [Object, Function, Boolean] as PropType<ErrorBoundaryRender>,
    default: undefined,
  },
});

/** ProTable 的类型定义 继承自 antd 的 Table */
export type ProTableProps = Partial<ExtractPropTypes<ReturnType<typeof proTableProps>>>;

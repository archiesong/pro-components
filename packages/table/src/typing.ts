import type { ComputedRef, Ref, UnwrapRef } from 'vue';
import type { SpinProps } from 'ant-design-vue';
import type { ColumnType, CompareFn, ColumnFilterItem } from 'ant-design-vue/es/table/interface';
import type {
  ProCoreActionType,
  ProSchema,
  ProSchemaComponentTypes,
  SearchTransformKeyFn,
} from '@ant-design-vue/pro-utils';
import type { ColumnsState } from './Store/Provide';
import type { InputProps } from 'ant-design-vue/es/input';
import type { VueNode } from 'ant-design-vue/es/_util/type';

export type SearchProps = InputProps & {
  inputPrefixCls?: string;
  enterButton?: VueNode;
};
export type PageInfo = {
  pageSize: number;
  total: number;
  current: number;
};

export type RequestData<T> = {
  data: T[] | undefined;
  success?: boolean;
  total?: number;
} & Record<string, any>;

export type UseFetchDataAction<T = any> = {
  dataSource: Ref<T[] | undefined>;
  setDataSource: (dataSource: T[] | undefined) => void;
  loading: Ref<boolean | SpinProps | undefined>;
  pageInfo: Ref<PageInfo>;
  reload: () => Promise<void>;
  fullScreen?: () => void;
  reset: () => void;
  pollingLoading: Ref<boolean>;
  setPageInfo: (pageInfo: Partial<PageInfo>) => void;
};

export type ExtraProColumnType<T> = Omit<
  ColumnType<T>,
  'customRender' | 'children' | 'title' | 'filters' | 'onFilter' | 'sorter'
> & {
  sorter?:
    | string
    | boolean
    | CompareFn<T>
    | {
        compare?: CompareFn<T>;
        /** Config multiple sorter order priority */
        multiple?: number;
      };
};

export type ProColumnType<T = unknown, ValueType = 'text'> = ProSchema<
  T,
  ExtraProColumnType<T> & {
    children?: ProColumns<T>[];

    index?: number;

    /**
     * 每个表单占据的格子大小
     *
     * @param 总宽度 = span* colSize
     * @param 默认为 1
     */
    colSize?: number;

    /** @name 是否缩略 */
    ellipsis?: ColumnType<T>['ellipsis'];

    /** @name 是否拷贝 */
    copyable?: boolean;

    /** 在查询表单中隐藏 */
    search?: WithFalse<{
      /**
       * Transform: (value: any) => ({ startTime: value[0], endTime: value[1] }),
       *
       * @name 转化值的key, 一般用于事件区间的转化
       */
      transform: SearchTransformKeyFn;
    }>;

    /** @name 在 table 中隐藏 */
    hideInTable?: boolean;

    /** @name 在新建表单中删除 */
    hideInForm?: boolean;

    /** @name 不在配置工具中显示 */
    hideInSetting?: boolean;

    /** @name 表头的筛选菜单项 */
    filters?: boolean | ColumnFilterItem[];

    /** @name 筛选的函数，设置为 false 会关闭自带的本地筛选 */
    onFilter?: boolean | ColumnType<T>['onFilter'];

    /** @name Form 的排序 */
    order?: number;

    /** @name 只读 */
    readonly?: boolean;

    /** @name 列设置的 disabled */
    disable?:
      | boolean
      | {
          checkbox: boolean;
        };
  },
  ProSchemaComponentTypes,
  ValueType,
  {
    lightProps?: any;
  }
>;

export type ProColumns<T = any, ValueType = 'text'> = ProColumnType<T, ValueType>;

export type BorderedType = 'search' | 'table';

export type Bordered =
  | boolean
  | {
      search?: boolean;
      table?: boolean;
    };

export type ColumnStateType = {
  /**
   * 持久化的类型，支持 localStorage 和 sessionStorage
   *
   * @param localStorage 设置在关闭浏览器后也是存在的
   * @param sessionStorage 关闭浏览器后会丢失
   */
  persistenceType?: 'localStorage' | 'sessionStorage';
  /** 持久化的key，用于存储到 storage 中 */
  persistenceKey?: string;
  /** ColumnsState 的值，columnsStateMap将会废弃 */
  defaultValue?: Record<string, ColumnsState>;
  /** ColumnsState 的值，columnsStateMap将会废弃 */
  value?: Record<string, ColumnsState>;
  onChange?: (map: Record<string, ColumnsState> | undefined) => void;
};

export type ActionType = ProCoreActionType & {
  fullScreen?: () => void;
  setPageInfo?: (page: Partial<PageInfo>) => void;
};

export type WithFalse<T> = T | false;

/**
 * 用于定义 useFetch 的参数类型
 */
export type UseFetchProps = {
  /**
   * 数据源
   * @type {any}
   */
  dataSource?: any;
  /**
   * 是否处于加载状态
   * @type {UseFetchDataAction['loading']}
   */
  loading: UnwrapRef<UseFetchDataAction['loading']>;

  /**
   * 加载状态改变时的回调函数
   * @type {(loading: UseFetchDataAction['loading']) => void}
   */
  onLoadingChange?: (loading: UnwrapRef<UseFetchDataAction['loading']>) => void;

  /**
   * 数据加载完成后的回调函数
   * @type {(dataSource: any[], extra: any) => void}
   */
  onLoad?: (dataSource: any[], extra: any) => void;

  /**
   * 数据源变化时的回调函数
   * @type {(dataSource?: any) => void}
   */
  onDataSourceChange?: (dataSource?: any) => void;

  /**
   * 请求时附带的数据
   * @type {any}
   */
  postData: (dataSource: any[]) => any[];
  /**
   * 分页信息
   * @type {{
   *   current?: number;
   *   pageSize?: number;
   *   defaultPageSize?: number;
   * } | false}
   */
  pageInfo: ComputedRef<
    WithFalse<{
      current?: number;
      pageSize?: number;
      defaultPageSize?: number;
    }>
  >;

  /**
   * 分页信息变化时的回调函数
   * @type {(pageInfo: PageInfo) => void}
   */
  onPageInfoChange?: (pageInfo: PageInfo) => void;

  /**
   * 请求相关的副作用
   * @type {any[]}
   */
  effects?: any[];
  /**
   * 请求出错时的回调函数
   * @type {(e: Error) => void}
   */
  onRequestError?: (e: Error) => void;

  /**
   * 是否手动触发请求
   * @type {boolean}
   */
  manual: ComputedRef<boolean>;

  /**
   * 请求防抖时间
   * @type {number}
   */
  debounceTime?: number;

  /**
   * 数据源轮询间隔时间或轮询触发条件
   * @type {number | ((dataSource: any[]) => number)}
   */
  polling?: number | ((dataSource: any[]) => number);

  /**
   * 是否在页面获得焦点时重新验证数据
   * @type {Boolean}
   */
  revalidateOnFocus?: boolean;
};

export type OptionSearchProps = SearchProps & {
  /** 如果 onSearch 返回一个false，直接拦截请求 */
  onSearch?: (keyword: string) => Promise<boolean | undefined> | boolean | undefined;
};

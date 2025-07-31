import type { ComputedRef, UnwrapRef } from 'vue';
import type { SortOrder } from 'ant-design-vue/es/table/interface';
import type {
  ActionType,
  Bordered,
  BorderedType,
  ProColumns,
  ProColumnType,
  UseFetchDataAction,
} from '../typing';
import type { TablePaginationConfig } from 'ant-design-vue';
import type { IntlType } from '@ant-design-vue/pro-provider';
import type { UseEditableUtilType } from '@ant-design-vue/pro-utils';

/**
 * 合并用户 props 和 预设的 props
 *
 * @param pagination
 * @param pageInfo
 * @param intl
 */
export function mergePagination<T>(
  pagination: TablePaginationConfig | boolean | undefined,
  pageInfo: UnwrapRef<UseFetchDataAction<T>['pageInfo']> & {
    setPageInfo: any;
  },
  intl: ComputedRef<IntlType>
): TablePaginationConfig | false | undefined {
  if (pagination === false) {
    return false;
  }
  const { total, current, pageSize, setPageInfo } = pageInfo;
  const defaultPagination: TablePaginationConfig = typeof pagination === 'object' ? pagination : {};

  return {
    showTotal: (all, range) =>
      `${intl.value.getMessage({ id: 'pagination.total.range', defaultMessage: '第' })} ${range[0]}-${range[1]} ${intl.value.getMessage(
        {
          id: 'pagination.total.total',
          defaultMessage: '条/总共',
        }
      )} ${all} ${intl.value.getMessage({ id: 'pagination.total.item', defaultMessage: '条' })}`,
    total,
    ...(defaultPagination as TablePaginationConfig),
    current: pagination !== true && pagination ? (pagination.current ?? current) : current,
    pageSize: pagination !== true && pagination ? (pagination.pageSize ?? pageSize) : pageSize,
    onChange: (page: number, newPageSize?: number) => {
      const { onChange } = pagination as TablePaginationConfig;
      onChange?.(page, newPageSize || 20);
      // pageSize 改变之后就没必要切换页码
      if (newPageSize !== pageSize || current !== page) {
        setPageInfo({ pageSize: newPageSize, current: page });
      }
    },
  };
}

type PostDataType<T> = (data: T) => T;

/**
 * 一个转化的 pipeline 列表
 *
 * @param data
 * @param pipeline
 */
export function postDataPipeline<T>(data: T, pipeline: PostDataType<T>[]) {
  if (pipeline.filter((item) => item).length < 1) {
    return data;
  }
  return pipeline.reduce((pre, postData) => {
    return postData(pre);
  }, data);
}

export const isBordered = (borderType: BorderedType, border?: Bordered) => {
  if (border === undefined) {
    return false;
  }
  if (typeof border === 'boolean') {
    return border;
  }
  return border[borderType];
};

/**
 * 获取用户的 action 信息
 *
 */
export const useActionType = (
  action: UseFetchDataAction,
  props: {
    fullScreen: () => void;
    onCleanSelected: () => void;
    resetAll: () => void;
    editableUtils: UseEditableUtilType;
  }
): ActionType => {
  return {
    ...props.editableUtils,
    pageInfo: action.pageInfo,
    reload: async (resetPageIndex?: boolean) => {
      // 如果为 true，回到第一页
      if (resetPageIndex) {
        await action.setPageInfo({
          current: 1,
        });
      }
      await action?.reload();
    },
    reloadAndRest: async () => {
      // reload 之后大概率会切换数据，清空一下选择。
      props.onCleanSelected();
      await action.setPageInfo({
        current: 1,
      });
      await action?.reload();
    },
    reset: async () => {
      await props.resetAll();
      await action?.reset?.();
      await action?.reload();
    },
    fullScreen: () => props.fullScreen(),
    clearSelected: () => props.onCleanSelected(),
    setPageInfo: (rest) => action.setPageInfo(rest),
  };
};

/**
 * 将 ProTable - column - dataIndex 转为字符串形式
 *
 * @param dataIndex Column 中的 dataIndex
 */
const parseDataIndex = (dataIndex: ProColumnType['dataIndex']) => {
  if (Array.isArray(dataIndex)) {
    return dataIndex.join(',');
  }
  return dataIndex?.toString();
};

/**
 * 从 ProColumns 数组中取出默认的排序和筛选数据
 *
 * @param columns ProColumns
 */
export const parseDefaultColumnConfig = <T, Value>(columns: ProColumns<T, Value>[]) => {
  const filter: Record<string, (string | number)[] | null> = {} as Record<string, any>;
  const sort: Record<string, SortOrder> = {} as Record<string, any>;
  columns.forEach((column) => {
    // 转换 dataIndex
    const dataIndex = parseDataIndex(column.dataIndex);
    if (!dataIndex) {
      return;
    }
    // 当 column 启用 filters 功能时，取出默认的筛选值
    if (column.filters) {
      const defaultFilteredValue = column.defaultFilteredValue as (string | number)[];
      if (defaultFilteredValue === undefined) {
        filter[dataIndex] = null;
      } else {
        filter[dataIndex] = column.defaultFilteredValue as (string | number)[];
      }
    }
    // 当 column 启用 sorter 功能时，取出默认的排序值
    if (column.sorter && column.defaultSortOrder) {
      sort[dataIndex] = column.defaultSortOrder!;
    }
  });
  return { sort, filter };
};

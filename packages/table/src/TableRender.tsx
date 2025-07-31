import type { PropType, VNode } from 'vue';
import type { UseEditableUtilType } from '@ant-design-vue/pro-utils';
import type {
  ColumnGroupType,
  ColumnsType,
  FilterValue,
  GetRowKey,
  SorterResult,
  SortOrder,
  TableCurrentDataSource,
  TablePaginationConfig,
} from 'ant-design-vue/es/table/interface';
import type { ProColumns, UseFetchDataAction } from './typing';
import { defineComponent } from 'vue';
import { Table, ConfigProvider } from 'ant-design-vue';
import ProCard from '@ant-design-vue/pro-card';
import ProForm, { useGridContextProvider } from '@ant-design-vue/pro-form';
import { proTableProps } from './proTableProps';
import {
  classNames,
  omit,
  useMemo,
  recordKeyToString,
  editableRowByKey,
  omitUndefined,
} from '@ant-design-vue/pro-utils';
import { useTableContextInject } from './Store/Provide';
import { genColumnKey } from './utils/genProColumnToColumn';

const TableRender = defineComponent({
  name: 'TableRender',
  inheritAttrs: false,
  props: {
    ...omit(proTableProps(), ['request', 'errorBoundaryRender']),
    editableUtils: {
      type: Object as PropType<UseEditableUtilType>,
      default: undefined,
    },
    toolbarDom: {
      type: Object as PropType<VNode>,
      default: undefined,
    },
    hideToolbar: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
    alertDom: {
      type: Object as PropType<VNode>,
      default: undefined,
    },
    searchNode: {
      type: Object as PropType<VNode>,
      default: undefined,
    },
    action: {
      type: Object as PropType<UseFetchDataAction<any>>,
      default: undefined,
    },
    getRowKey: {
      type: Function as PropType<GetRowKey<any>>,
      default: undefined,
    },
    tableColumn: {
      type: Array as PropType<ProColumns<any, 'text'>[]>,
      default: undefined,
    },
    isLightFilter: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    onFilterChange: {
      type: Function as PropType<(filter: Record<string, FilterValue | null>) => void>,
      default: undefined,
    },
    onSortChange: {
      type: Function as PropType<(sort: Record<string, SortOrder>) => void>,
      default: undefined,
    },
  },
  setup(props, { attrs, slots }) {
    const counter = useTableContextInject();
    //     /** 需要遍历一下，不然不支持嵌套表格 */
    const columns = useMemo(() => {
      const loopFilter = (column?: ProColumns<any, 'text'>[]): ColumnsType => {
        return column
          ?.map((item) => {
            // 删掉不应该显示的
            const columnKey = genColumnKey(item.key, item.index);
            const config = counter.columnsMap.value?.[columnKey];
            if (config && config.show === false) {
              return false;
            }
            if (item.children) {
              return {
                ...item,
                children: loopFilter(item.children),
              };
            }
            return item;
          })
          .filter(Boolean) as ColumnsType;
      };
      return loopFilter(props.tableColumn);
    }, [() => counter.columnsMap, () => props.tableColumn]);
    /** 如果所有列中的 filters = true | undefined 说明是用的是本地筛选 任何一列配置 filters=false，就能绕过这个判断 */
    const useLocaleFilter = useMemo(() => {
      const _columns: ColumnsType = [];
      // 平铺所有columns, 用于判断是用的是本地筛选
      const loopColumns = (data: ColumnsType) => {
        for (let i = 0; i < data.length; i++) {
          const _curItem = data[i];
          if ((_curItem as unknown as ColumnGroupType<any>).children) {
            loopColumns((_curItem as unknown as ColumnGroupType<any>).children);
          } else {
            _columns.push(_curItem);
          }
        }
      };
      loopColumns(columns.value);
      return _columns?.every((column) => {
        return (
          (!!column.filters && !!column.onFilter) ||
          (column.filters === undefined && column.onFilter === undefined)
        );
      });
    }, [() => columns.value]);
    useGridContextProvider({
      grid: false,
      colProps: undefined,
      rowProps: undefined,
    });
    return () => {
      const {
        rowKey,
        type,
        action,
        columnEmptyText,
        tableViewRender,
        toolBarRender,
        search,
        headerTitle,
        rowSelection,
        editable,
        editableUtils,
        isLightFilter,
        polling,
        params,
        options,
        postData,
        revalidateOnFocus,
        columnsState,
        debounceTime,
        defaultData,
        manualRequest,
        onDataSourceChange,
        onLoad,
        onLoadingChange,
        onRequestError,
        name,
        size,
        cardProps,
        searchNode,
        tableRender,
        toolbarDom,
        getRowKey,
        pagination,
        alertDom,
        ...rest
      } = props;
      /**
       * 如果是分页的新增，总是加到最后一行
       *
       * @returns
       */
      const editableDataSource = (dataSource: any[]) => {
        const { options: newLineOptions, defaultValue: row } =
          editableUtils?.newLineRecord.value || {};
        const isNewLineRecordAtTop = newLineOptions?.position === 'top';
        if (newLineOptions?.parentKey) {
          const actionProps = {
            data: dataSource,
            getRowKey: getRowKey!,
            row: {
              ...row,
              map_row_parentKey: recordKeyToString(newLineOptions.parentKey)?.toString(),
            },
            key: newLineOptions?.recordKey || '',
            childrenColumnName: props.childrenColumnName || 'children',
          };

          return editableRowByKey(actionProps, isNewLineRecordAtTop ? 'top' : 'update');
        }

        if (isNewLineRecordAtTop) {
          return [row, ...(action?.dataSource.value || [])];
        }
        // 如果有分页的功能，我们加到这一页的末尾
        if (pagination && pagination?.current && pagination?.pageSize) {
          const newDataSource = [...(action?.dataSource.value || [])];
          if (pagination?.pageSize > newDataSource.length) {
            newDataSource.push(row);
            return newDataSource;
          }
          newDataSource.splice(pagination?.current * pagination?.pageSize - 1, 0, row);
          return newDataSource;
        }

        return [...(action?.dataSource.value || []), row];
      };
      const getTableProps = () => {
        return {
          ...rest,
          size,
          rowSelection: rowSelection === false ? undefined : rowSelection,
          columns: columns.value,
          dataSource: editableUtils?.newLineRecord.value
            ? editableDataSource(action?.dataSource.value || [])
            : action?.dataSource.value,
          loading: action?.loading.value,
          pagination,
          onChange: (
            changePagination: TablePaginationConfig,
            filters: Record<string, FilterValue | null>,
            sorter: SorterResult | SorterResult[],
            extra: TableCurrentDataSource
          ) => {
            rest.onChange?.(changePagination, filters, sorter, extra);
            if (!useLocaleFilter) {
              props.onFilterChange?.(omitUndefined(filters));
            }

            // 制造筛选的数据
            // 制造一个排序的数据
            if (Array.isArray(sorter)) {
              const data = sorter.reduce(
                (pre, value) =>
                  ({
                    ...pre,
                    [`${value.field}`]: value.order,
                  }) as Record<string, SortOrder>,
                {} as Record<string, SortOrder>
              );
              props.onSortChange?.(omitUndefined(data));
            } else {
              const sorterOfColumn = sorter.column?.sorter;
              const isSortByField = sorterOfColumn?.toString() === sorterOfColumn;
              props.onSortChange?.(
                omitUndefined({
                  [`${isSortByField ? sorterOfColumn : sorter.field}`]: sorter.order,
                })
              );
            }
          },
        };
      };
      /**
       * 是否需要 card 来包裹
       */
      const notNeedCardDom = search === false && !headerTitle && toolBarRender === false;

      /** 默认的 table dom，如果是编辑模式，外面还要包个 form */
      const baseTableDom = <Table {...getTableProps()} rowKey={rowKey} v-slots={slots} />;

      /** 自定义的 render */
      const tableDom = tableViewRender ? tableViewRender({}, baseTableDom) : baseTableDom;
      const tableContentDom =
        !editable && name ? (
          <>
            {toolbarDom}
            {alertDom}
            <ProForm>{tableDom}</ProForm>
          </>
        ) : (
          <>
            {toolbarDom}
            {alertDom}
            {tableDom}
          </>
        );

      /** Table 区域的 dom，为了方便 render */
      const tableAreaDom =
        cardProps === false || notNeedCardDom === true || !!name ? (
          tableContentDom
        ) : (
          <ProCard>{tableContentDom}</ProCard>
        );
      const renderTable = () => {
        if (tableRender) {
          return tableRender(props, tableAreaDom, {
            toolbar: toolbarDom || undefined,
            alert: alertDom || undefined,
            table: tableDom || undefined,
          });
        }
        return tableAreaDom;
      };
      const proTableDom = (
        <div class={classNames(attrs.class)} ref={counter.rootDomRef}>
          {isLightFilter ? null : searchNode}
          {type !== 'form' && renderTable()}
        </div>
      );
      // 如果不需要的全屏，ConfigProvider 没有意义
      if (!options || !options?.fullScreen) {
        return proTableDom;
      }
      return (
        <ConfigProvider getPopupContainer={() => counter.rootDomRef.value || document.body}>
          {proTableDom}
        </ConfigProvider>
      );
    };
  },
});

export default TableRender;

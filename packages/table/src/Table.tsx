import type { TablePaginationConfig } from 'ant-design-vue';
import type { FilterValue, SortOrder, TableRowSelection } from 'ant-design-vue/es/table/interface';
import type { ActionType, RequestData, PageInfo, OptionSearchProps } from './typing';
import { computed, defineComponent, ref } from 'vue';
import { useConfigContextInject } from 'ant-design-vue/es/config-provider/context';
import { useTableContextInject } from './Store/Provide';
import { proTableProps } from './proTableProps';
import {
  useEffect,
  useMemo,
  useMountMergeState,
  stringify,
  useEditableArray,
  useCallback,
  classNames,
} from '@ant-design-vue/pro-utils';
import TableRender from './TableRender';
import { proTheme, useIntl } from '@ant-design-vue/pro-provider';
import { parseDefaultColumnConfig, mergePagination, useActionType } from './utils';
import useFetchData from './useFetchData';
import { useStyle } from './style';
import genProColumnToColumn, { genColumnKey } from './utils/genProColumnToColumn';
import { columnSort } from './utils/columnSort';
import Alert from './components/Alert';
import FormSearch from './components/Form';
import Toolbar from './components/ToolBar';
const ProTable = defineComponent({
  name: 'ProTable',
  inheritAttrs: false,
  props: proTableProps(),
  setup(props, { attrs }) {
    const { getPrefixCls } = useConfigContextInject();
    const prefixCls = computed(() => props.prefixCls ?? getPrefixCls('pro'));
    const proTableClassName = computed(() => `${props.prefixCls || prefixCls.value}-table`);
    const intl = useIntl();

    /** 通用的来操作子节点的工具类 */
    const actionRef = ref<ActionType>();
    const { wrapSSR, hashId } = useStyle(proTableClassName);
    const counter = useTableContextInject();

    /** 单选多选的相关逻辑 */
    const [selectedRowKeys, setSelectedRowKeys] = useMountMergeState(
      props.rowSelection ? props.rowSelection?.defaultSelectedRowKeys || [] : undefined,
      {
        value: computed(() =>
          props.rowSelection ? props.rowSelection.selectedRowKeys : undefined
        ),
      }
    );

    // ============================ Render ============================
    const { token } = proTheme.useToken();

    const [formSearch, setFormSearch] = useMountMergeState<Record<string, any> | undefined>(() => {
      // 如果手动模式，或者 search 不存在的时候设置为 undefined
      // undefined 就不会触发首次加载
      if (props.manualRequest || props.search !== false) {
        return undefined;
      }
      return {};
    });

    const [proFilter, setProFilter] = useMountMergeState<Record<string, FilterValue | null>>({});

    const [proSort, setProSort] = useMountMergeState<Record<string, SortOrder>>({});

    /** 设置默认排序和筛选值 */
    useEffect(() => {
      const { sort, filter } = parseDefaultColumnConfig(props.columns || []);
      setProFilter(filter);
      setProSort(sort);
    }, [() => props.columns]);

    /** 需要初始化 不然默认可能报错 这里取了 defaultCurrent 和 current 为了保证不会重复刷新 */
    const fetchPagination = useMemo(
      () =>
        typeof props.pagination === 'object'
          ? (props.pagination as TablePaginationConfig)
          : { defaultPageSize: 20, pageSize: 20, current: 1 },
      [() => props.pagination]
    );
    // ============================ useFetchData ============================
    const fetchData = useMemo(() => {
      if (!props.request) return undefined;
      return async (pageParams?: Record<string, any>) => {
        const actionParams = {
          ...(pageParams || {}),
          ...formSearch.value,
          ...props.params,
        };
        delete (actionParams as any)._timestamp;
        const response = await props.request?.(actionParams, proSort.value, proFilter.value);
        return response as RequestData<any>;
      };
    }, [
      () => formSearch.value,
      () => props.params,
      () => proFilter.value,
      () => proSort.value,
      () => props.request,
    ]);
    const action = useFetchData(fetchData.value, props.defaultData, {
      pageInfo: computed(() => (props.pagination === false ? false : fetchPagination.value)),
      loading: props.loading,
      dataSource: props.dataSource,
      onDataSourceChange: props.onDataSourceChange,
      onLoad: props.onLoad,
      onLoadingChange: props.onLoadingChange,
      onRequestError: props.onRequestError,
      postData: props.postData,
      revalidateOnFocus: props.revalidateOnFocus,
      manual: computed(() => formSearch.value === undefined),
      polling: props.polling,
      effects: [
        () => stringify(props.params),
        () => stringify(formSearch.value),
        () => stringify(proFilter.value),
        () => stringify(proSort.value),
      ],
      debounceTime: props.debounceTime,
      onPageInfoChange: (pageInfo) => {
        if (!props.pagination || !fetchData.value) return;
        // 总是触发一下 onChange 和  onShowSizeChange
        // 目前只有 List 和 Table 支持分页, List 有分页的时候打断 Table 的分页
        props.pagination?.onChange?.(pageInfo.current, pageInfo.pageSize);
        props.pagination?.onShowSizeChange?.(pageInfo.current, pageInfo.pageSize);
      },
    });
    /** SelectedRowKeys受控处理selectRows */
    const preserveRecords = ref(new Map<any, any>());

    // ============================ RowKey ============================
    const getRowKey = useMemo(() => {
      if (typeof props.rowKey === 'function') {
        return props.rowKey;
      }
      return (record: Record<string, any>, index?: number) => {
        if (index === -1) {
          return record[props.rowKey as string];
        }
        // 如果 props 中有name 的话，用index 来做行号，这样方便转化为 index
        if (props.name) {
          return index?.toString();
        }
        return record[props.rowKey as string] ?? index?.toString();
      };
    }, [() => props.name, () => props.rowKey]);

    useMemo(() => {
      if (action.dataSource.value?.length) {
        const keys = action.dataSource.value.map((data) => {
          const dataRowKey = getRowKey.value(data, -1);
          preserveRecords.value.set(dataRowKey, data);
          return dataRowKey;
        });
        return keys;
      }
      return [];
    }, [() => action.dataSource.value, () => getRowKey.value]);

    /** 页面编辑的计算 */
    const pagination = useMemo(() => {
      const newPropsPagination = props.pagination === false ? false : { ...props.pagination };
      const pageConfig = {
        ...action.pageInfo.value,
        setPageInfo: ({ pageSize, current }: PageInfo) => {
          const { pageInfo } = action;
          // pageSize 发生改变，并且你不是在第一页，切回到第一页
          // 这样可以防止出现 跳转到一个空的数据页的问题
          if (pageSize === pageInfo.value.pageSize || pageInfo.value.current === 1) {
            action.setPageInfo({ pageSize, current });
            return;
          }
          // 通过request的时候清空数据，然后刷新不然可能会导致 pageSize 没有数据多
          if (props.request) action.setDataSource([]);
          action.setPageInfo({
            pageSize,
            // 目前只有 List 和 Table 支持分页, List 有分页的时候 还是使用之前的当前页码
            current: props.type === 'list' ? current : 1,
          });
        },
      };
      if (props.request && newPropsPagination) {
        delete newPropsPagination.onChange;
        delete newPropsPagination.onShowSizeChange;
      }
      return mergePagination<any>(newPropsPagination, pageConfig, intl);
    }, [() => props.pagination, () => action.pageInfo.value, () => intl.value]);

    /** 清空所有的选中项 */
    const onCleanSelected = useCallback(() => {
      if (props.rowSelection && props.rowSelection.onChange) {
        props.rowSelection.onChange([], []);
      }
      setSelectedRowKeys([]);
    }, [() => props.rowSelection, () => setSelectedRowKeys]);

    counter.propsRef.value = props;

    // 设置 name 到 store 中，里面用了 ref ，所以不用担心直接 set
    counter.setPrefixName(props.name);
    /** 可编辑行的相关配置 */
    const editableUtils = useEditableArray({
      ...props.editable,
      tableName: props.name,
      getRowKey,
      childrenColumnName: props?.childrenColumnName || 'children',
      dataSource: computed(() => action?.dataSource.value || []),
      setDataSource: (data) => {
        props.editable?.onValuesChange?.(undefined as any, data);
        action?.setDataSource(data);
      },
    });
    // ---------- 列计算相关 start  -----------------
    const tableColumn = useMemo(
      () =>
        genProColumnToColumn({
          columns: props.columns!,
          counter,
          columnEmptyText: props.columnEmptyText || '-',
          type: props.type,
          marginSM: token.value.marginSM,
          editableUtils: editableUtils!,
          rowKey: props.rowKey,
          childrenColumnName: props.childrenColumnName,
        }).sort(columnSort(counter.columnsMap.value!)),
      [
        () => props.columns,
        () => counter?.columnsMap.value,
        () => props.columnEmptyText,
        () => props.type,
        () => editableUtils?.editableKeys.value && editableUtils.editableKeys.value.join(','),
      ]
    );

    useEffect(() => {
      if (tableColumn.value && tableColumn.value.length > 0) {
        // 重新生成key的字符串用于排序
        const columnKeys = tableColumn.value.map((item) => genColumnKey(item.key, item.index));
        counter.setSortKeyColumns(columnKeys);
      }
    }, [() => tableColumn.value]);
    /** 绑定 action */
    actionRef.value = useActionType(action, {
      fullScreen: () => {
        if (!counter.rootDomRef?.value || !document.fullscreenEnabled) {
          return;
        }
        if (document.fullscreenElement) {
          document.exitFullscreen();
        } else {
          counter.rootDomRef?.value.requestFullscreen();
        }
      },
      onCleanSelected: () => {
        // 清空选中行
        onCleanSelected.value();
      },
      resetAll: () => {
        // 清空选中行
        onCleanSelected.value();
        // 清空筛选
        setProFilter({});
        // 清空排序
        setProSort({});
        // 清空 toolbar 搜索
        counter.setKeyWords(undefined);
        // 重置页码
        action.setPageInfo({
          current: 1,
        });
        // 重置表单
        // formRef?.current?.resetFields();
        setFormSearch({});
      },
      editableUtils,
    });
    /** 同步 action */
    counter.setAction(actionRef.value);

    const selectedRows = useMemo(
      () => selectedRowKeys.value?.map((key) => preserveRecords.value?.get(key)),
      [() => action.dataSource.value, () => selectedRowKeys.value]
    );
    const onFormSearchSubmit = (values: any): any => {
      // 判断search.onSearch返回值决定是否更新formSearch
      if (props.options && props.options.search) {
        const { name = 'keyword' } = props.options.search === true ? {} : props.options.search;
        /** 如果传入的 onSearch 返回值为 false，则不要把options.search.name对应的值set到formSearch */
        const success = (props.options.search as OptionSearchProps)?.onSearch?.(
          counter.keyWords.value!
        ) as unknown as boolean;
        if (success !== false) {
          setFormSearch({
            ...values,
            [name]: counter.keyWords.value,
          });
          return;
        }
      }
      setFormSearch(values);
    };

    const loading = useMemo(() => {
      if (typeof action.loading.value === 'object') {
        return action.loading.value.spinning || false;
      }
      return action.loading.value;
    }, [() => action.loading.value]);

    const searchNode = useMemo(() => {
      const node =
        props.search === false && props.type !== 'form' ? null : (
          <FormSearch
            pagination={pagination.value}
            onFormSearchSubmit={onFormSearchSubmit}
            action={actionRef.value}
            columns={props.columns}
            loading={!!loading.value}
            manualRequest={props.manualRequest}
            search={props.search}
            form={props.form}
            formRef={props.formRef}
            setFormRef={(formRef) => props['onUpdate:formRef']?.(formRef)}
            type={props.type || 'table'}
            cardBordered={props.cardBordered}
            dateFormatter={props.dateFormatter}
          />
        );

      if (props.searchFormRender && node) {
        return <>{props.searchFormRender(props, node)}</>;
      } else {
        return node;
      }
    }, [
      () => props.formRef,
      () => loading.value,
      () => props.manualRequest,
      () => pagination.value,
      () => props.columns,
      () => props.search,
      () => props.searchFormRender,
      () => props.type,
    ]);
    /** 是不是 LightFilter, LightFilter 有一些特殊的处理 */
    const isLightFilter = useMemo(
      () => props.search !== false && props.search?.filterType === 'light',
      [() => props.search]
    );
    const hideToolbar = useMemo(
      () =>
        props.options === false &&
        !props.headerTitle &&
        !props.toolBarRender &&
        !props.toolbar &&
        !isLightFilter,
      [
        () => props.options,
        () => props.headerTitle,
        () => props.toolBarRender,
        () => props.toolbar,
        () => isLightFilter.value,
      ]
    );
    return () => {
      const {
        name: isEditorTable,
        search,
        tableAlertRender,
        toolBarRender,
        headerTitle,
        toolbar,
        tooltip,
        ...rest
      } = props;
      /** 行选择相关的问题 */
      const rowSelection: TableRowSelection = {
        selectedRowKeys: selectedRowKeys.value,
        ...props.rowSelection,
        onChange: (keys, rows) => {
          if (props.rowSelection && props.rowSelection.onChange) {
            props.rowSelection.onChange(keys, rows);
          }
          setSelectedRowKeys(keys);
        },
      };

      /** 内置的工具栏 */
      const toolbarDom =
        toolBarRender === false ? null : (
          <Toolbar
            headerTitle={headerTitle}
            hideToolbar={hideToolbar.value}
            selectedRows={selectedRows.value}
            selectedRowKeys={selectedRowKeys.value!}
            columns={tableColumn.value}
            tooltip={tooltip}
            toolbar={toolbar}
            onFormSearchSubmit={(newValues) =>
              setFormSearch({
                ...formSearch.value,
                ...newValues,
              })
            }
            searchNode={isLightFilter.value ? searchNode.value : null}
            options={props.options}
            optionsRender={props.optionsRender}
            action={actionRef.value}
            toolBarRender={toolBarRender}
          />
        );
      /** 内置的多选操作栏 */
      const alertDom =
        props.rowSelection !== false ? (
          <Alert
            selectedRowKeys={selectedRowKeys.value}
            selectedRows={selectedRows.value}
            onCleanSelected={onCleanSelected.value}
            alertOptionRender={rest.tableAlertOptionRender}
            alertInfoRender={tableAlertRender}
            alwaysShowAlert={props.rowSelection?.alwaysShowAlert}
          />
        ) : null;
      return wrapSSR(
        <TableRender
          {...props}
          name={isEditorTable}
          class={classNames(proTableClassName.value, attrs.class, hashId.value)}
          size={counter.tableSize.value}
          onSizeChange={counter.setTableSize}
          pagination={pagination.value}
          searchNode={searchNode.value!}
          rowSelection={props.rowSelection !== false ? rowSelection : undefined}
          tableColumn={tableColumn.value}
          isLightFilter={isLightFilter.value}
          action={action}
          alertDom={alertDom!}
          toolbarDom={toolbarDom!}
          hideToolbar={hideToolbar.value}
          onSortChange={(sortConfig) => {
            if (proSort.value === sortConfig) return;
            setProSort(sortConfig ?? {});
          }}
          onFilterChange={(filterConfig) => {
            if (filterConfig === proFilter.value) return;
            setProFilter(filterConfig);
          }}
          editableUtils={editableUtils}
          getRowKey={getRowKey.value}
        />
      );
    };
  },
});
export default ProTable;

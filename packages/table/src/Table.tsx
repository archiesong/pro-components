import type { ParamsType } from '@antdv-next1/pro-provider'
import type { ProFieldValueObjectType, ProFieldValueType } from '@antdv-next1/pro-utils'
import type { CustomSlotsType, VueNode } from '@v-c/util/dist/type'
import type { App, Plugin, SetupContext } from 'vue'
import type { ProTableInstance, ProTableProps } from './typing'
import { ValueTypeToComponent } from '@antdv-next1/pro-field'
import { ProConfigProvider, useProConfig } from '@antdv-next1/pro-provider'
import { ErrorBoundary, transformBooleanProps } from '@antdv-next1/pro-utils'
import { TableSummary } from 'antdv-next'
import { defineComponent, Fragment, shallowRef } from 'vue'
import InternalProTable from './InternalTable'
import { useContainer, useTableContextProvider } from './Store/Provide'
import { useProTableInstanceExpose } from './utils'

const _ProTable = defineComponent(<
  DataType extends Record<string, any>,
  Params extends ParamsType = ParamsType,
  ValueType extends (ProFieldValueType | ProFieldValueObjectType) = 'text',
>(props: ProTableProps<DataType, Params, ValueType>,
  { slots, expose }: SetupContext<{}, CustomSlotsType<{
    default?: () => VueNode
  }>>,
) => {
  const proConfig = useProConfig()
  const container = useContainer(props)
  const tableRef = shallowRef<ProTableInstance<DataType> | null>(null)
  const booleanProps = transformBooleanProps(['manualRequest', 'showSorterTooltip', 'showHeader', 'rowHoverable', 'revalidateOnFocus', 'loading', 'virtual', 'sticky', 'tailor', 'bordered', 'cardBordered', 'ghost'], props)
  useTableContextProvider(container)
  expose(useProTableInstanceExpose(tableRef))
  return () => {
    const { errorBoundaryRender } = props
    const ErrorComponent = errorBoundaryRender === false ? Fragment : ErrorBoundary
    return (
      <ProConfigProvider
        valueTypeMap={{ ...proConfig.value.valueTypeMap, ...ValueTypeToComponent }}
        needDeps
      >
        <ErrorComponent>
          <InternalProTable
            ref={tableRef}
            {...props}
            {...booleanProps}
            manualRequest={typeof props.manualRequest === 'string' ? true : props.manualRequest}
            bordered={typeof props.bordered === 'string' ? true : props.bordered}
            cardBordered={typeof props.cardBordered === 'string' ? true : props.cardBordered}
            ghost={typeof props.ghost === 'string' ? true : props.ghost}
            v-slots={slots}
          />
        </ErrorComponent>
      </ProConfigProvider>
    )
  }
}, {
  name: 'ProTable',
  inheritAttrs: false,
  props: ['tableAlertRender', 'tableAlertOptionRender', 'beforeSearchSubmit', 'columnEmptyText', 'editable', 'options', 'tooltip', 'search', 'headerTitle', 'tableStyle', 'toolBarRender', 'optionsRender', 'columnsState', 'onSizeChange', 'toolbar', 'bodyCell', 'bordered', 'caption', 'cardBordered', 'cardProps', 'childrenColumnName', 'classes', 'columns', 'components', 'dataSource', 'dateFormatter', 'debounceTime', 'defaultData', 'defaultExpandAllRows', 'defaultExpandedRowKeys', 'direction', 'dropdownPrefixCls', 'expandIcon', 'expandIconColumnIndex', 'expandRowByClick', 'expandable', 'expandedRowClassName', 'expandedRowKeys', 'expandedRowRender', 'footer', 'form', 'getContainerWidth', 'getPopupContainer', 'ghost', 'headerCell', 'id', 'indentSize', 'loading', 'locale', 'manualRequest', 'measureRowRender', 'name', 'onDataSourceChange', 'onExpand', 'onExpandedRowsChange', 'onHeaderRow', 'onLoad', 'onLoadingChange', 'onRequestError', 'onReset', 'onRow', 'onSubmit', 'pagination', 'params', 'polling', 'postData', 'prefixCls', 'request', 'revalidateOnFocus', 'rootClass', 'rowClassName', 'rowHoverable', 'rowKey', 'rowSelection', 'scroll', 'searchFormRender', 'showHeader', 'showSorterTooltip', 'size', 'sortDirections', 'sticky', 'styles', 'summary', 'tableClass', 'tableExtraRender', 'tableLayout', 'tableRender', 'tableViewRender', 'tailor', 'title', 'type', 'virtual'],
})

const ProTable = _ProTable as typeof _ProTable & Plugin & {
  Summary?: typeof TableSummary
}

ProTable.Summary = TableSummary

ProTable.install = (app: App) => {
  app.component(ProTable.Summary.name as string, TableSummary)
  app.component(ProTable.name as string, ProTable)
  return app
}

export default ProTable

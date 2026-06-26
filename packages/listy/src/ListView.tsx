import type { CheckGroupValueType, ProCheckCardProps } from '@antdv-next1/pro-card'
import type { AnyObject, CustomSlotsType, Key, VueNode } from '@v-c/util/dist/type'
import type { TableColumnType, TableProps, TableRowSelection } from 'antdv-next'
import type { GetRowKey, TableLocale, TablePaginationConfig } from 'antdv-next/dist/table/interface'
import type { SetupContext } from 'vue'
import type { ProListyItemProps } from './Item'
import type { AntdListyProps } from './typing'
import { ProCard } from '@antdv-next1/pro-card'

import { useState } from '@antdv-next1/pro-utils'
import { get } from '@v-c/util'
import useLazyKVMap from 'antdv-next/dist/table/hooks/useLazyKVMap'
import usePagination from 'antdv-next/dist/table/hooks/usePagination'
import useSelection from 'antdv-next/dist/table/hooks/useSelection'
import { computed, defineComponent, isVNode } from 'vue'
import Listy from './components/Listy'
import ProListyItem from './Item'

export type ListViewProps<RecordType extends Record<string, any>> = Omit<AntdListyProps<RecordType>, 'renderItem'> & Pick<
  TableProps<RecordType>,
    'columns' | 'expandable' | 'pagination' | 'onRow'
> & {
  rowHoverable?: boolean
  locale?: Pick<TableLocale, 'emptyText'>
  rowKey?: string | keyof RecordType | GetRowKey<RecordType>
  rowSelection?: TableRowSelection<RecordType>
  variant?: 'outlined' | 'borderless' | 'filled'
  prefixCls?: string
  action?: {
    isEditable?: (row: RecordType & {
      index: number
    }) => {
      recordKey: string
      isEditable: boolean
      preIsEditable: boolean
    } | undefined
  }
  dataSource?: RecordType[]

  rowClassName?: string | ((item: RecordType, index: number) => string)
  itemCardProps?: ProCheckCardProps
  itemRender?: (item: RecordType, index: number, dom: VueNode) => VueNode
  pagination?: TablePaginationConfig | false
}

const PRO_LIST_KEYS = [
  'title',
  'subTitle',
  'avatar',
  'description',
  'extra',
  'aside',
  'content',
  'actions',
  'type',
] as const

const PRO_LIST_KEYS_MAP = new Set<string>(PRO_LIST_KEYS)

const ListView = defineComponent(<RecordType extends AnyObject>(props: ListViewProps<RecordType>, {
  slots,
  attrs,
  expose,
}: SetupContext<
  {},
  CustomSlotsType<{
    itemRender?: ListViewProps<RecordType>['itemRender']
    default?: () => VueNode
  }>
>) => {
  const getRowKey = computed<
    GetRowKey<RecordType>
  >((): GetRowKey<RecordType> => {
    if (typeof props.rowKey === 'function') {
      return props.rowKey
    }
    return (record: RecordType, index?: number) =>
      record[props.rowKey as string] || index
  })

  const [getRecordByKey] = useLazyKVMap(props.dataSource || [], 'children', getRowKey)

  // 合并分页配置，兼容 antd 的分页
  const [mergedPagination] = usePagination(
    (props.dataSource || []).length,
    () => {},
    props.pagination,
  )

  /** 根据分页来返回不同的数据，模拟 table */
  const pageData = computed(() => {
    if (
      props.pagination === false
      || !mergedPagination.value.pageSize
      || (props.dataSource || []).length < mergedPagination.value.total!
    ) {
      return props.dataSource
    }
    const { current = 1, pageSize = 10 } = mergedPagination.value

    return (props.dataSource || []).slice((current - 1) * pageSize, current * pageSize)
  })

  /** 提供和 table 一样的 rowSelection 配置 */
  const [selectItemRender, selectedKeySet] = useSelection(
    {
      getRowKey,
      getRecordByKey,
      prefixCls: props.prefixCls,
      data: props.dataSource as RecordType[],
      pageData,
      expandType: 'row',
      childrenColumnName: 'children',
      locale: {},
    } as any,
    props.rowSelection,
  )

  /** 展开收起功能区域 star */
  const [innerExpandedKeys, setInnerExpandedKeys] = useState<Key[]>(
    () => {
      // 提供和 Table 一样的 expand 支持
      const {
        defaultExpandedRowKeys,
        defaultExpandAllRows = true,
      } = props.expandable || {}
      if (defaultExpandedRowKeys) {
        return defaultExpandedRowKeys as Key[]
      }
      if (defaultExpandAllRows !== false) {
        return (props.dataSource || []).map(getRowKey.value)
      }
      return []
    },
  )
  const mergedExpandedKeys = computed(
    () => {
      // 提供和 Table 一样的 expand 支持
      const {
        expandedRowKeys,
      } = props.expandable || {}

      return new Set(expandedRowKeys || innerExpandedKeys.value || [])
    },
  )
  // TriggerEventHandler<RecordType>
  const onTriggerExpand = (record: RecordType) => {
    // 提供和 Table 一样的 expand 支持
    const {
      onExpand,
      onExpandedRowsChange,
    } = props.expandable || {}
    const key = getRowKey.value(record, (props.dataSource || []).indexOf(record))
    const hasKey = mergedExpandedKeys.value.has(key)
    const nextKeys = new Set(mergedExpandedKeys.value)
    if (hasKey) {
      nextKeys.delete(key)
    }
    else {
      nextKeys.add(key)
    }
    const newExpandedKeys = [...nextKeys]

    setInnerExpandedKeys(newExpandedKeys)
    onExpand?.(!hasKey, record)
    onExpandedRowsChange?.(newExpandedKeys)
  }

  expose({})
  return () => {
    const {
      columns,
      rowKey,
      action,
      itemRender,
      itemCardProps,
      variant = 'borderless',
      expandable: expandableConfig,
      rowSelection,
      pagination = false, // List 的 pagination 默认是 false
      prefixCls,
      rowHoverable,
      rowClassName,
      grid,
      ...rest
    } = props
    // 提供和 Table 一样的 expand 支持
    const {
      rowExpandable,
    } = expandableConfig || {}
    /** 这个是 选择框的 render 方法 为了兼容 antd 的 table,用了同样的渲染逻辑 所以看起来有点奇怪 */
    const selectItemDom = selectItemRender([])[0]
    return (
      <ProCard
        type="inner"
        variant={variant === 'borderless' ? 'borderless' : 'outlined'}
        styles={{
          body: {
            padding: 0,
          },
        }}
      >
        <Listy
          {...rest}
          {...attrs}
          items={pageData.value}
          variant="borderless"
          pagination={
            pagination
            && (mergedPagination.value as ListViewProps<RecordType>['pagination'])
          }
          itemRender={(item, index) => {
            const listyItemProps = {
              class: typeof rowClassName === 'function'
                ? rowClassName(item, index)
                : rowClassName,
            } as Partial<ProListyItemProps<RecordType>>;

            (columns as (TableColumnType<RecordType> & {
              listSlot: | 'title'
                | 'subTitle'
                | 'avatar'
                | 'description'
                | 'content'
                | 'actions'
                | 'aside'
                | 'type'
                | (string & {})
            })[])?.forEach((column) => {
              const { listSlot } = column
              if (!PRO_LIST_KEYS_MAP.has(listSlot!)) {
                return
              }

              const dataIndex = (column.dataIndex
                || listSlot
                || column.key)

              const rawData = Array.isArray(dataIndex)
                ? get(item, dataIndex as string[])
                : item[dataIndex as string]

              // 调用Protable的列配置渲染数据
              let data = column.render
                ? column.render(rawData, item, index)
                : rawData

              // 是否是一个VNode
              if (column.listSlot === 'actions' && !Array.isArray(data)) {
                data = [data]
              }
              // aside 是 extra 的新名称，映射到 Item 的 extra 属性
              const propKey
                = column.listSlot === 'aside' ? 'extra' : column.listSlot
              if (data !== '-')
                listyItemProps[propKey as keyof typeof listyItemProps] = data
            })

            const checkboxDom = selectItemDom?.render?.(
              item,
              item,
              index,
            )
            const { isEditable, recordKey } = action?.isEditable?.({ ...item, index }) || {}
            const itemKey = getRowKey.value(item, index)
            const isChecked = selectedKeySet.value.has(itemKey)
            const cardProps = grid
              ? {
                  ...itemCardProps,
                  ...grid,
                  checked: isChecked,
                  onChange: isVNode(checkboxDom)
                    ? (changeChecked: CheckGroupValueType) =>
                        (
                          checkboxDom?.props
                        )?.onChange({
                          nativeEvent: {},
                          target: { checked: changeChecked },
                          changeChecked,
                        })
                    : undefined,
                }
              : undefined
            const defaultDom = (
              <ProListyItem
                key={recordKey}
                cardProps={cardProps}
                {...listyItemProps}
                recordKey={recordKey}
                isEditable={isEditable || false}
                expandable={expandableConfig}
                expand={mergedExpandedKeys.value.has(itemKey)}
                onExpand={() => onTriggerExpand(item)}
                index={index}
                record={item}
                rowHoverable={rowHoverable}
                rowSupportExpand={!rowExpandable || rowExpandable(item)}
                selected={selectedKeySet.value.has(itemKey)}
                checkbox={checkboxDom}
              />
            )
            const renderedContent = itemRender
              ? itemRender(item, index, defaultDom)
              : defaultDom
            return renderedContent
          }}
          v-slots={slots}
        />
      </ProCard>
    )
  }
}, {
  name: 'ListView',
  inheritAttrs: false,
  props: ['columns', 'action', 'expandable', 'grid', 'group', 'height', 'itemCardProps', 'itemHeight', 'itemRender', 'onScroll', 'pagination', 'rowHoverable', 'loading', 'dataSource', 'prefixCls', 'rowClassName', 'rowKey', 'rowSelection', 'split', 'sticky', 'variant', 'expandable', 'virtual'],
})

export default ListView

import type { ProFieldValueObjectType, ProFieldValueType } from '@antdv-next/pro-utils'
import type { CustomSlotsType, Key, VueNode } from '@v-c/util/dist/type'
import type { DataNode } from 'antdv-next/dist/tree/index'
import type { SetupContext } from 'vue'
import type { ColumnsState } from '../../Store/Provide'
import type { ProColumns } from '../../typing'
import { unit } from '@antdv-next/cssinjs'
import { useProConfig } from '@antdv-next/pro-provider'
import { runFunction } from '@antdv-next/pro-utils'
import { classNames, omit } from '@v-c/util'
import { Tree, TypographyText } from 'antdv-next'
import { computed, defineComponent } from 'vue'
import { useTableContextInject } from '../../Store/Provide'
import { genColumnKey } from '../../utils/genProColumnsToColumns'
import CheckboxListItem from './CheckboxListItem'

export interface CheckboxListProps<T, ValueType> {
  title?: string
  list?: ProColumns<T, ValueType>[]
  draggable?: boolean
  checkable?: boolean
  showListItemOption?: boolean
  showTitle?: boolean
  listsHeight?: number
}

const CheckboxList = defineComponent(<T extends Record<string, any>, ValueType extends (ProFieldValueType | ProFieldValueObjectType)>(props: CheckboxListProps<T, ValueType>, { attrs }: SetupContext<{}, CustomSlotsType<{
  default?: () => VueNode
}>>) => {
  const proProvide = useProConfig()
  const { columnsMap, sortKeyColumns, setColumnsMap, setSortKeyColumns }
    = useTableContextInject()
  const show = computed(() => props.list && props.list.length > 0)

  const treeDataConfig = computed(() => {
    if (!show.value)
      return {}
    const checkedKeys: string[] = []
    const treeMap = new Map<string | number, DataNode & { parentKey?: string }>()

    const loopData = (
      data: ProColumns<T, ValueType>[],
      parentConfig?: ColumnsState & {
        columnKey: string
      },
    ): DataNode[] =>
      data.map(({ key, dataIndex, children, title, ...rest }) => {
        const columnKey = genColumnKey(
          key,
          [parentConfig?.columnKey, rest.index].filter(Boolean).join('-'),
        )
        const config = columnsMap?.value?.[columnKey || 'null'] || { show: true }
        if (config.show !== false && !children) {
          checkedKeys.push(columnKey)
        }
        const item: DataNode = {
          key: columnKey,
          ...omit(rest, ['className']),
          title: title as VueNode,
          selectable: false,
          disabled: config.disable === true,
          disableCheckbox:
              typeof config.disable === 'boolean' ? config.disable : config.disable?.checkbox,
          isLeaf: parentConfig ? true : undefined,
        }

        if (children) {
          item.children = loopData(children, {
            ...config,
            columnKey,
          })
          // 如果children 已经全部是show了，把自己也设置为show
          if (
            item.children?.every(childrenItem =>
              checkedKeys?.includes(childrenItem.key as string),
            )
          ) {
            checkedKeys.push(columnKey)
          }
        }
        treeMap.set(key!, { ...item, parentKey: parentConfig?.columnKey })
        return item
      })
    return { list: loopData(props.list!), keys: checkedKeys, map: treeMap }
  })

  /** 移动到指定的位置 */
  const move = (id: Key, targetId: Key, dropPosition: number) => {
    const newMap = { ...columnsMap?.value }
    const newColumns = [...(sortKeyColumns?.value || [])]

    const findIndex = newColumns.findIndex(columnKey => columnKey === id)

    const targetIndex = newColumns.findIndex(columnKey => columnKey === targetId)
    const isDownWard = dropPosition >= findIndex
    if (findIndex < 0)
      return
    const targetItem = newColumns[findIndex]
    newColumns.splice(findIndex, 1)
    if (dropPosition === 0) {
      newColumns.unshift(targetItem!)
    }
    else {
      newColumns.splice(isDownWard ? targetIndex : targetIndex + 1, 0, targetItem!)
    }
    // 重新生成排序数组
    newColumns.forEach((key, order) => {
      newMap[key] = { ...(newMap[key] || {}), order }
    })
    // 更新数组
    setColumnsMap?.(newMap)
    setSortKeyColumns?.(newColumns)
  }

  return () => {
    const {
      showTitle = true,
      title,
      draggable,
      listsHeight = 280,
      showListItemOption,
      checkable,
    } = props
    if (!show.value) {
      return null
    }
    console.log(treeDataConfig.value.list, 'treeDataConfig')
    const listDom = (
      <Tree
        itemHeight={24}
        draggable={
          draggable
          && !!treeDataConfig.value.list?.length
          && treeDataConfig.value.list?.length > 1
        }
        checkable={checkable}
        onDrop={(info) => {
          const dropKey = info.node.key
          const dragKey = info.dragNode?.key
          const { dropPosition, dropToGap } = info
          const position = dropPosition === -1 || !dropToGap ? dropPosition + 1 : dropPosition
          move(dragKey!, dropKey, position)
        }}
        blockNode
        height={listsHeight}
        onCheck={(_, e) => {
          const newColumnMap = { ...columnsMap?.value }
          const loopSetShow = (key: string | number) => {
            const newSetting = { ...newColumnMap[key] }
            newSetting.show = e.checked
            // 如果含有子节点，也要选中
            if (treeDataConfig.value.map?.get(key)?.children) {
              treeDataConfig.value.map
                .get(key)
                ?.children
                ?.forEach(item => loopSetShow(item.key as string))
            }
            newColumnMap[key] = newSetting
          }
          loopSetShow(e.node.key)
          setColumnsMap?.({ ...newColumnMap })
        }}
        checkedKeys={treeDataConfig.value.keys}
        showLine={false}
        titleRender={(_node) => {
          const node = { ..._node, children: undefined } as typeof _node & {
            title?: VueNode | ((data: DataNode) => VueNode)
          }
          if (!node.title)
            return null
          const normalizedTitle = runFunction(node.title, node)

          const wrappedTitle = (
            <TypographyText
              style={{ width: unit(80) }}
              ellipsis={{ tooltip: normalizedTitle }}
            >
              {normalizedTitle}
            </TypographyText>
          )
          return (
            <CheckboxListItem
              class={attrs.class}
              {...omit(node, ['key'])}
              showListItemOption={showListItemOption}
              title={wrappedTitle}
              columnKey={node.key}
            />
          )
        }}
        treeData={treeDataConfig.value.list?.map(
          ({ disabled /* 不透传 disabled，使子节点禁用时也可以拖动调整顺序 */, ...config }) =>
            config,
        )}
      />
    )
    return (
      <>
        {showTitle && (
          <span class={classNames(`${attrs.class}-list-title`, proProvide.value.hashId)}>
            {title}
          </span>
        )}
        {listDom}
      </>
    )
  }
}, {
  name: 'CheckboxList',
  inheritAttrs: false,
  props: ['checkable', 'draggable', 'list', 'listsHeight', 'showListItemOption', 'showTitle', 'title'],
})

export default CheckboxList

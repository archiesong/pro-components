import type { CustomSlotsType, Key, VueNode } from '@v-c/util/dist/type'
import type { ListRef } from '@v-c/virtual-list'
import type { CSSProperties, SetupContext } from 'vue'
import type { Row } from './hooks/useFlattenRows'
import type { ListyExpose, ListyProps } from './interface'
import { classNames } from '@v-c/util'
import List from '@v-c/virtual-list'
import { computed, defineComponent, shallowRef } from 'vue'
import { useFlattenRows } from './hooks/useFlattenRows'
import { useGroupSegments } from './hooks/useGroupSegments'
import { useOnEndReached } from './hooks/useOnEndReached'
import { useStickyGroupHeader } from './hooks/useStickyGroupHeader'
import { isGroupScrollConfig } from './util'

const Listy = defineComponent(
  <T extends Record<string, any>, K extends Key>(
    props: ListyProps<T, K>,
    {
      slots,
      expose,
    }: SetupContext<
      {},
      CustomSlotsType<{
        itemRender?: () => VueNode
        default?: () => VueNode
      }>
    >,
  ) => {
    const listRef = shallowRef<ListRef | null>(null)
    const containerRef = shallowRef<HTMLDivElement | null>(null)

    const data = computed(() => props.items || [])
    const group = computed(() => props.group)
    const groupSegments = useGroupSegments<T, K>(data, group)
    // =================================== Keys ===================================
    const getKey = (row: Row<T, K>): Key => {
      const { rowKey } = props
      if (row.type === 'header') {
        return row.groupKey
      }

      if (typeof rowKey === 'function') {
        return rowKey(row.item)
      }
      return row.item?.[rowKey as string]
    }

    // ======================= Flatten rows (header + item) =======================
    const flattenRows = useFlattenRows<T, K>(data, group, groupSegments)
    // Pre-compute each group's items to simplify header rendering
    const groupKeyToItems = computed(() => {
      const map = new Map<K, T[]>()
      if (!group.value) {
        return map
      }
      flattenRows.value.groupKeyToSeg.forEach(({ startIndex, endIndex }, key) => {
        map.set(key, data.value.slice(startIndex, endIndex + 1))
      })
      return map
    })

    // Sticky header overlay via Portal (anchored on header rows)
    const params = computed(() => {
      const { sticky = false, prefixCls } = props
      return {
        enabled: !!((sticky !== undefined || sticky) && group.value),
        group: group.value,
        headerRows: flattenRows.value.headerRows,
        groupKeyToItems: groupKeyToItems.value,
        containerRef,
        listRef,
        prefixCls,
      }
    })
    const handleOnScroll = useOnEndReached({
      enabled: !!props.onEndReached,
      onEndReached: props.onEndReached,
    })
    const extraRender = useStickyGroupHeader<T, K>(params)
    const renderHeaderRow = (groupKey: K) => {
      const { prefixCls = 'vc-listy', sticky, virtual = true } = props
      const groupItems = groupKeyToItems.value.get(groupKey) || []
      return (
        <div
          class={classNames(`${prefixCls}-group-header`, {
            [`${prefixCls}-group-header-sticky`]: (sticky !== undefined || sticky) && !virtual,
          })}
        >
          {group.value?.title({ name: groupKey, items: groupItems })}
        </div>
      )
    }

    expose({
      scrollTo: (config) => {
        if (isGroupScrollConfig(config)) {
          const { groupKey, align, offset } = config
          listRef.value?.scrollTo({
            key: groupKey,
            align,
            offset,
          })
          return
        }
        listRef.value?.scrollTo(config)
      },
    } as ListyExpose)
    return () => {
      const { virtual = true, itemHeight = 47, height, itemRender = slots.itemRender, class: className, style } = props
      return (
        <div ref={containerRef} class={className} style={style}>
          {virtual
            ? (
                <List
                  ref={listRef}
                  virtual={virtual}
                  data={flattenRows.value.rows}
                  fullHeight={false}
                  itemHeight={itemHeight}
                  itemKey={getKey}
                  height={height}
                  extraRender={extraRender}
                  onScroll={handleOnScroll}
                  v-slots={{
                    default: (row: { index: number, offsetX: number, style: CSSProperties, item: Row<T, K> }) => {
                      return row.item.type === 'header' ? renderHeaderRow(row.item.groupKey) : itemRender?.(row.item)
                    },
                  }}
                />
              )
            : (
                flattenRows.value.rows.map(row => row.type === 'item' && itemRender?.({ item: row.item, index: row.index }))
              )}
        </div>
      )
    }
  },
  {
    name: 'Listy',
    inheritAttrs: false,
    props: ['class', 'style', 'group', 'height', 'itemHeight', 'itemRender', 'items', 'onEndReached', 'prefixCls', 'rowKey', 'sticky', 'virtual'],
  },
)

export default Listy

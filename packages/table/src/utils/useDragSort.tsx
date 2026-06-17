import type { DragEndEvent } from '@dnd-kit/dom'
import type { TableComponents } from '@v-c/table/dist/interface.js'
import type { VueNode } from '@v-c/util'
import type { GlobalToken } from 'antdv-next'
import type { ComputedRef, FunctionalComponent, InjectionKey, PropType, Ref } from 'vue'
import { FastColor } from '@ant-design/fast-color'
import { childrenToArray, isSpecialNode, useEffect } from '@antdv-next1/pro-utils'
import { RestrictToVerticalAxis } from '@dnd-kit/abstract/modifiers'
import { PointerSensor } from '@dnd-kit/dom'
import { arrayMove } from '@dnd-kit/helpers'
import { DragDropProvider } from '@dnd-kit/vue'
import { isSortable, isSortableOperation, useSortable } from '@dnd-kit/vue/sortable'
import {
  cloneVNode,
  computed,
  defineComponent,
  inject,
  isVNode,
  onBeforeUpdate,
  provide,
  reactive,
  ref,
} from 'vue'

const sortableItemValueContextKey: InjectionKey<{ handle: VueNode }> = Symbol(
  'sortableItemValueContext',
)
// props: { handle: VueNode }
//  provide(sortableItemValueContextKey, props);
const SortableItemContextValue = {
  Provider: defineComponent({
    name: 'Provider',
    inheritAttrs: false,
    props: {
      value: {
        type: Object as PropType<{
          handle?: VueNode
        }>,
        default: undefined,
      },
    },
    setup(props, { slots }) {
      provide(sortableItemValueContextKey, { handle: props.value?.handle })
      return () => slots.default?.()
    },
  }),
}

/**
 * 拖拽排序表格的行，
 * 如果有 DragHandle 回给 dragSortKey 所在的行注入 provide 和 handle
 * 如果没有整个行都支持拖拽
 * @param props
 */
function SortableRow(props: any, { slots }: any) {
  const { dragHandle: DragHandle, sortable, token, dragSortKey, handleRef, ...rest } = props
  if (dragSortKey) {
    const doms: VueNode[] = []
    childrenToArray(slots.default?.()).forEach((child, index) => {
      if (isVNode(child) && !isSpecialNode(child)) {
        if (child.props?.column?.key === dragSortKey) {
          doms.push(
            <SortableItemContextValue.Provider
              key={child.key || index}
              value={{
                handle: (
                  <DragHandle
                    ref={handleRef}
                    rowData={child?.props?.record}
                    index={child?.props?.index}
                  />
                ),
              }}
            >
              {/* {child} */}
              {cloneVNode(child, {
                ...child.props,
                sortable,
                token,
                // style: {
                //   ...child.props?.style,
                //   background: sortable?.isDragging?.value ? '#f1f5f9' : undefined,
                // },
                // class: `${child.props?.class} ${sortable?.isDragging?.value ? 'ant-table-row-hover' : ''}`,
              })}
            </SortableItemContextValue.Provider>,
          )
          return
        }
      }
      doms.push(
        cloneVNode(child, {
          ...child.props,
          sortable,
          token,
          // style: {
          //   ...child.props?.style,
          //   background: sortable?.isDragging?.value ? '#f1f5f9' : undefined,
          // },
        }),
      )
    })
    //  data-shadow={sortable.isDragging.value ? 'dragging' : undefined}
    return <tr {...rest}>{doms}</tr>
  }
  // data-shadow={sortable.isDragging.value ? 'dragging' : undefined}
  // {
  //             ...child.props?.class,
  //             // ...(sortable?.isDragging?.value
  //             //   ? { [`${child.props?.class.split(' ')[0]}-row-hover`]: true }
  //             //   : {}),
  //           }
  return <tr {...rest}>{slots.default?.()}</tr>
}

export interface UseDragSortOptions<T = any> {
  dataSource?: ComputedRef<T[]>
  onDragSortEnd?: (
    beforeIndex?: number | string,
    afterIndex?: number | string,
    newDataSource?: T[],
  ) => Promise<void> | void
  token: ComputedRef<GlobalToken> | Ref<GlobalToken>
  dragSortKey?: Ref<string | undefined>
  components?: Ref<TableComponents<T> | undefined>
  rowKey: Ref<any>
  dragHandle: FunctionalComponent<any>
}
function SortContainer(props: any, { slots }: any) {
  const { ref: $ref, ...rest } = props
  return (
    <tbody {...rest} ref={$ref}>
      {slots.default?.()}
    </tbody>
  )
}
/**
 * 拖拽排序表格的 cell，用与判断要不要展示 handle
 */
function SortableItemCell(props: any, { slots }: any) {
  const { dragSortKey, sortable, token, ...rest } = props
  const bg = new FastColor(token.colorFillAlter).onBackground(token.colorBgContainer).toHexString()
  //   .onBackground(colorBgContainer)
  //   .toHexString();
  const { handle } = inject(sortableItemValueContextKey, { handle: null })
  // class={`${rest.class} ${sortable?.isDragging?.value ? `${rest.class.split(' ')[0]}-row-hover` : ''}`}
  if (handle) {
    return (
      <td
        {...rest}
        // class={`${rest.class} ${sortable?.isDragging?.value ? `${rest.class.split(' ')[0]}-row-hover` : ''}`}
        style={{ ...rest.style, background: sortable?.isDragging?.value ? bg : undefined }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {handle}
          {slots.default?.()}
        </div>
      </td>
    )
  }
  // class={`${rest.class} ${sortable?.isDragging?.value ? `${rest.class.split(' ')[0]}-row-hover` : ''}`}
  // ${sortable?.isDragging?.value ? `${rest.class}-row-hover` : ''}
  return (
    <td
      {...rest}
      //  class={`${rest.class} ${sortable?.isDragging?.value ? `${rest.class.split(' ')[0]}-row-hover` : ''}`}
      style={{ ...rest.style, background: sortable?.isDragging?.value ? bg : undefined }}
    >
      {slots.default?.()}
    </td>
  )
}
export function useDragSort(props: UseDragSortOptions) {
  const components = reactive<TableComponents<any>>(props.components?.value || {})
  const itemRefs = ref<(HTMLElement | null)[]>([])
  const handleRefs = ref<(HTMLElement | null)[]>([])
  const element = ref<HTMLElement | null>(null)
  onBeforeUpdate(() => {
    itemRefs.value = []
    handleRefs.value = []
    element.value = null
  })
  const setHandleRef = (el: HTMLElement | null) => {
    if (el) {
      handleRefs.value.push(el)
    }
  }
  const setItemRef = (el: HTMLElement | null) => {
    if (el) {
      itemRefs.value.push(el)
    }
  }

  const DraggableContainer = (p: any, ctx: any) => SortContainer({ ...p, ref: element }, ctx)
  const DraggableBodyRow = (p: any, ctx: any) => {
    const index = props.dataSource?.value
      .findIndex((item: any) => item[props.rowKey.value ?? 'index'] === p['data-row-key'])
      ?.toString()
    const sortable = useSortable({
      id: computed(() => index!),
      index: computed(() => Number(index)!),
      type: 'row',
      accept: 'row',
      element: itemRefs.value[index as unknown as number],
      handle: handleRefs.value[index as unknown as number],
      // modifiers: [RestrictToVerticalAxis],
    })

    return SortableRow(
      {
        id: index,
        dragSortKey: props.dragSortKey?.value,
        dragHandle: props.dragHandle,
        key: index,
        ref: setItemRef,
        token: props.token.value,
        handleRef: setHandleRef,
        sortable,
        ...p,
      },
      ctx,
    )
  }

  useEffect(() => {
    if (props.dragSortKey?.value) {
      components.body = {
        ...(props.components?.value?.body || {}),
        wrapper:
          ((props.components?.value?.body as { wrapper: any }) || {}).wrapper || DraggableContainer,
        row: ((props.components?.value?.body as { row: any }) || {}).row || DraggableBodyRow,
        cell: ((props.components?.value?.body as { cell: any }) || {}).cell || SortableItemCell,
      }
    }
  }, [props.dragSortKey])
  const handleDragEnd = (event: DragEndEvent) => {
    if (event.canceled)
      return
    if (isSortableOperation(event.operation)) {
      const { source } = event.operation
      if (isSortable(source)) {
        const { initialIndex, index } = source
        if (initialIndex !== index) {
          const newData = arrayMove(props.dataSource?.value || [], initialIndex, index)
          props.onDragSortEnd?.(initialIndex, index, newData || [])
        }
      }
    }
  }

  const DndContext: FunctionalComponent<any> = (_, { slots }) => {
    const props = {
      onDragEnd: handleDragEnd,
      sensors: [PointerSensor],
      modifiers: [RestrictToVerticalAxis],
    }
    return <DragDropProvider {...props} v-slots={slots} />
  }
  return {
    DndContext,
    components,
  }
}

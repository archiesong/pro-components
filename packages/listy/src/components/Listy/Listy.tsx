import type { CustomSlotsType, Key, VueNode } from '@v-c/util/dist/type'
import type { PaginationConfig, SpinProps } from 'antdv-next'
import type { Breakpoint } from 'antdv-next/dist/_util/responsiveObserver'
import type { SetupContext, VNode } from 'vue'
import type { ListyProps } from './typing'
import { clsx } from '@v-c/util'
import { Row, Spin } from 'antdv-next'
import { responsiveArray } from 'antdv-next/dist/_util/responsiveObserver'
import useCSSVarCls from 'antdv-next/dist/config-provider/hooks/useCSSVarCls'
import useVariant from 'antdv-next/dist/form/hooks/useVariant'
import useBreakpoint from 'antdv-next/dist/grid/hooks/useBreakpoint'
import { cloneVNode, Comment, computed, defineComponent, Fragment, isVNode, shallowRef, Text, toRef } from 'vue'
import VcListy from './components/VcListy'
import { useListyContextProvider } from './context'
import Item from './Item'
import { useStyle } from './style'
import { useComponentBaseConfig } from './util'

export function isPlainObject<T extends object = object>(val: any): val is T {
  return val !== null && typeof val === 'object'
}
type Merge<T extends readonly Record<string, any>[]>
  = T extends readonly [infer F extends object, ...infer R extends object[]]
    ? Omit<F, keyof Merge<R>> & Merge<R>
    : {}
function mergeProps<T extends Record<string, any>[]>(...items: T): Merge<T> {
  const ret = {} as Merge<T>
  items.forEach((item) => {
    if (item) {
      Object.keys(item).forEach((key) => {
        if (item[key] !== undefined)
          ret[key as keyof typeof ret] = item[key]
      })
    }
  })
  return ret as unknown as Merge<T>
}

const _Listy = defineComponent(<T, K extends Key = Key>(props: ListyProps<T, K>, {
  slots,
  attrs,
  expose,
}: SetupContext<
  {},
  CustomSlotsType<{
    default?: () => VueNode
  }>
>) => {
  const {
    getPrefixCls,
    direction,
    class: contextClassName,
    style: contextStyle,
  } = useComponentBaseConfig('listy', props)

  const prefixCls = computed(() => getPrefixCls('listy', props.prefixCls))
  const rootCls = useCSSVarCls(prefixCls)
  const [hashId, cssVarCls] = useStyle(prefixCls, rootCls)

  const spinProps = computed<SpinProps | undefined>(() => {
    if (typeof props.loading === 'boolean') {
      return { spinning: props.loading }
    }
    if (typeof props.loading === 'object' && props.loading !== null) {
      return { spinning: true, ...props.loading }
    }
    return undefined
  })
  const paginationObj = isPlainObject(props.pagination) ? props.pagination : {}
  const paginationCurrent = shallowRef(paginationObj.defaultCurrent || 1)
  const paginationSize = shallowRef(paginationObj.defaultPageSize || 10)

  useListyContextProvider({
    grid: toRef(() => props.grid),
    itemLayout: toRef(() => props.itemLayout),
  })
  // const onPaginationChange = () => {

  // }
  // const onPaginationShowSizeChange = () => {

  // }
  const needResponsive = computed(() => Object.keys(props.grid || {}).some(key =>
    responsiveArray.includes(key as Breakpoint),
  ))
  const [variant] = useVariant('listy' as any, toRef(() => props.variant), toRef(() => props.bordered))
  const screens = useBreakpoint(needResponsive)
  const currentBreakpoint = computed(() => {
    for (let i = 0; i < responsiveArray.length; i += 1) {
      const breakpoint = responsiveArray[i]
      if (screens.value![breakpoint!]) {
        return breakpoint
      }
    }
    return undefined
  })
  const colStyle = computed(() => {
    if (!props.grid) {
      return undefined
    }
    const columnCount
      = currentBreakpoint.value && props.grid[currentBreakpoint.value] ? props.grid[currentBreakpoint.value] : props.grid.column
    if (columnCount) {
      return {
        width: `${100 / columnCount}%`,
        maxWidth: `${100 / columnCount}%`,
      }
    }
  })
  expose({})
  return () => {
    const { loading, split = true, grid, items = [], variant: customVariant, rootClass, itemLayout, virtual = false, size, itemRender, pagination, ...rest } = props
    const defaultPaginationProps: PaginationConfig = {
      current: 1,
      total: 0,
      position: 'bottom',
    }
    const paginationProps = mergeProps(
      defaultPaginationProps,
      {
        total: items?.length,
        current: paginationCurrent.value,
        pageSize: paginationSize.value,
      },
      pagination || {},
    )
    const { total = 0, pageSize = 0, current = 1 } = paginationProps
    const largestPage = Math.ceil(total / pageSize)

    paginationProps.current = Math.min(current, largestPage)

    // const paginationContent = pagination && (
    //   <div class={classNames(`${prefixCls.value}-pagination`)}>
    //     <Pagination
    //       align="end"
    //       {...paginationProps}
    //       onChange={onPaginationChange}
    //       onShowSizeChange={onPaginationShowSizeChange}
    //     />
    //   </div>
    // )
    // console.log(currentBreakpoint, paginationContent, virtual, 'currentBreakpoint')
    // let splitItems = [...(items || [])]
    // if (pagination) {
    //   if (items.length > (paginationProps.current - 1) * pageSize) {
    //     splitItems = [...items].splice(
    //       (current - 1) * pageSize,
    //       pageSize,
    //     )
    //   }
    // }
    // let childrenContent = !!spinProps.value?.spinning && <div style={{ minHeight: '53px' }} />
    // if (splitItems.length > 0) {
    //   const items = splitItems.map(renderInternalItem)
    //   console.log(items, 'items')
    //   childrenContent =
    // }
    //

    return (
      <div
        class={clsx(prefixCls.value, {
          [`${prefixCls.value}-split`]: split,
          [`${prefixCls.value}-vertical`]: itemLayout === 'vertical',
          [`${prefixCls.value}-rtl`]: direction.value === 'rtl',
          [`${prefixCls.value}-bordered`]: variant.value !== 'borderless',
        }, contextClassName?.value, attrs.class, rootClass, hashId.value, cssVarCls.value)}
        style={[
          contextStyle?.value,
          attrs.style,
        ]}
      >
        <Spin spinning={false} {...spinProps.value}>
          { grid ? (
            <Row
              class={clsx(`${prefixCls.value}-items`, `${prefixCls.value}-container`, hashId.value)}
              gutter={grid.gutter}
            >
              <VcListy
                {...rest}
                prefixCls={`${prefixCls.value}-items`}
                itemRender={(item, index) => {
                  const itemDom = itemRender?.(item, index) as VNode
                  if (isVNode(itemDom) && itemDom.type !== Fragment && itemDom.type !== Comment && itemDom.type !== Text) {
                    return cloneVNode(itemDom, {
                      ...itemDom.props,
                      colStyle: colStyle.value,
                    })
                  }
                  return itemDom
                }}
                items={items}
                v-slots={slots}
              />
            </Row>
          ) : (
            <>
              { virtual ? (
                <div class={clsx(`${prefixCls.value}-items`, `${prefixCls.value}-container`, hashId.value)}>
                  <VcListy
                    {...rest}
                    virtual={virtual}
                    itemRender={itemRender}
                    prefixCls={`${prefixCls.value}-items`}
                    items={items}
                    v-slots={slots}
                  />

                </div>
              ) : (
                <VcListy
                  {...rest}
                  class={clsx(`${prefixCls.value}-container`, hashId.value)}
                  itemRender={itemRender}
                  prefixCls={`${prefixCls.value}-items`}
                  items={items}
                  v-slots={slots}
                />
              )}
            </>
          )}
        </Spin>
      </div>
    )
  }
}, {
  name: 'AListy',
  inheritAttrs: false,
  props: ['group', 'split', 'loading', 'grid', 'id', 'itemLayout', 'onScroll', 'pagination', 'size', 'height', 'itemHeight', 'itemRender', 'bordered', 'rootClass', 'variant', 'items', 'onScroll', 'prefixCls', 'rowKey', 'sticky', 'virtual'],
})

const Listy = _Listy as typeof _Listy & {
  Item: typeof Item
}

Listy.Item = Item

export default Listy

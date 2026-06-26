import type { VueNode } from '@antdv-next1/pro-utils'
import type { ColProps, RowProps } from 'antdv-next'
import type { ComputedRef, FunctionalComponent, InjectionKey, ToRefs, VNode } from 'vue'
import type { ProFormGridConfig } from '../typing'
import { childrenToArray } from '@antdv-next1/pro-utils'
import { Col, Row } from 'antdv-next'
import { computed, inject, provide, ref } from 'vue'

interface CommonProps {
  wrapper?: ((dom?: VueNode) => VueNode)
}

interface ColWrapperProps /* @vue-ignore */ extends ColProps, CommonProps {
  variant?: string
  fieldProps?: Record<string, any>
}

export interface GridHelpers {
  RowWrapper: FunctionalComponent<RowProps & CommonProps, {}, {
    default?: () => VueNode
  }>
  ColWrapper: FunctionalComponent<ColWrapperProps, {}, {
    default?: () => VueNode
  }>
  grid: ComputedRef<boolean>
}

export const gridContextKey: InjectionKey<ComputedRef<ProFormGridConfig>> = Symbol('gridContext')
export function useGridContextProvider(props: ComputedRef<ProFormGridConfig>) {
  return provide(gridContextKey, props)
}

const defaultGridContext = ref<ProFormGridConfig>({
  grid: false,
  colProps: undefined,
  rowProps: undefined,
})

export const useGridContextInject = () => inject(gridContextKey, defaultGridContext)

export const gridHelpers: (config: ToRefs<ProFormGridConfig & CommonProps>) => GridHelpers = ({
  grid,
  rowProps,
  colProps,
}) => {
  const RowWrapper: FunctionalComponent<RowProps & CommonProps, {}, {
    default?: () => VueNode
  }> = (props, { slots }) => {
    const { wrapper, ...restProps } = props || {}
    if (!grid?.value) {
      return wrapper ? wrapper(childrenToArray(slots.default?.() as VNode[], true)) : slots.default?.()
    }
    return <Row gutter={8} {...rowProps?.value} {...restProps} v-slots={slots} />
  }
  RowWrapper.displayName = 'RowWrapper'
  RowWrapper.inheritAttrs = false
  const ColWrapper: FunctionalComponent<ColProps & CommonProps & {
    variant?: string
    fieldProps?: Record<string, any>
  }, {}, {
    default?: () => VueNode
  }> = (props, { slots }) => {
    const { wrapper, variant, fieldProps, ...rest } = props || {}
    const originColProps = { ...colProps?.value, ...rest }
    /**
     * `xs` takes precedence over `span`
     * avoid `span` doesn't work
     */
    if (typeof originColProps.span === 'undefined' && typeof originColProps.xs === 'undefined') {
      originColProps.xs = 24
    }

    // LightFilter clone 传入的 variant/fieldProps 需透传给 ProFormItem，否则 lightProps 无 variant
    // const childrenWithProps =
    //   (variant !== undefined || fieldProps !== undefined) &&
    //   React.Children.count(children) === 1 &&
    //   React.isValidElement(children)
    //     ? React.cloneElement(children as React.ReactElement<any>, {
    //         ...(variant !== undefined && { variant }),
    //         ...(fieldProps && {
    //           fieldProps: {
    //             ...(children as React.ReactElement<any>)?.props?.fieldProps,
    //             ...fieldProps,
    //           },
    //         }),
    //       })
    //     : children;
    if (!grid?.value) {
      // const WrapperNode = typeof wrapper === 'function' ? wrapper() : wrapper
      // return WrapperNode && isVNode(WrapperNode)
      //   ? h(WrapperNode, null, slots.default)//   : slots.default?.()
      return wrapper ? wrapper(childrenToArray(slots.default?.() as VNode[], true)) : slots.default?.()
    }
    return <Col {...originColProps} v-slots={slots} />
  }
  ColWrapper.displayName = 'ColWrapper'
  ColWrapper.inheritAttrs = false
  return {
    grid: computed(() => !!grid?.value),
    RowWrapper,
    ColWrapper,
  }
}

export function useGridHelpers(props?: (ProFormGridConfig & CommonProps)) {
  const config = computed(() => {
    if (typeof props === 'object') {
      return props
    }
    return {
      grid: props,
    }
  })

  const gridContextProvide = useGridContextInject()
  const grid = computed(() => !!(gridContextProvide.value.grid || config.value.grid))
  const rowProps = computed(() => config.value?.rowProps)
  const colProps = computed(() => config.value?.colProps || gridContextProvide.value.colProps)
  const wrapper = computed(() => config.value?.wrapper)
  return gridHelpers({
    grid,
    rowProps,
    colProps,
    wrapper,
  })
}

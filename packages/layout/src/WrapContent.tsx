import type { CSSProperties, ExtractPropTypes, PropType } from 'vue'
import type { ErrorBoundaryRender, SlotsRenderType } from './RenderTypings'
import type { CustomSlotsType, VueNode, WithFalse } from './typing'
import { useProConfig } from '@antdv-next1/pro-provider'
import { ErrorBoundary } from '@antdv-next1/pro-utils'
import { classNames } from '@v-c/util'
import { LayoutContent } from 'antdv-next'
import { defineComponent } from 'vue'
import { useProLayoutRender } from './utils/useProLayoutRender'

export function wrapContentProps() {
  return {
    style: {
      type: [Object, String] as PropType<CSSProperties>,
      default: undefined,
    },
    hasPageContainer: {
      type: Number as PropType<number>,
      default: undefined,
    },
    isChildrenLayout: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
    prefixCls: {
      type: String as PropType<string>,
      default: undefined,
    },
    location: {
      type: Object as PropType<{ path?: string }>,
      default: undefined,
    },
    contentHeight: {
      type: [Number, String] as PropType<number | string>,
      default: undefined,
    },
    errorBoundaryRender: {
      type: [Function, Boolean] as PropType<WithFalse<ErrorBoundaryRender>>,
      default: undefined,
    },
    hasHeader: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
  }
}

export type WrapContentProps = ExtractPropTypes<ReturnType<typeof wrapContentProps>>

const WrapContent = defineComponent({
  name: 'WrapContent',
  props: wrapContentProps(),
  inheritAttrs: false,
  slots: Object as CustomSlotsType<
    Pick<SlotsRenderType, 'errorBoundaryRender'> & {
      default?: () => VueNode[]
    }
  >,
  setup(props, { slots }) {
    const proProvide = useProConfig()
    const proLayoutRender = useProLayoutRender(slots, props)
    return () => {
      const { prefixCls, hasHeader, hasPageContainer, style } = props
      const { errorBoundaryRender } = proLayoutRender.value
      const contentClassName = classNames(`${prefixCls}-content`, proProvide.value.hashId, {
        [`${prefixCls}-has-header`]: hasHeader,
        [`${prefixCls}-content-has-page-container`]: (hasPageContainer || 0) > 0,
      })
      return errorBoundaryRender === false
        ? (
            <LayoutContent class={contentClassName} style={style}>
              {slots.default?.()}
            </LayoutContent>
          )
        : (
            <ErrorBoundary
              fallback={errorBoundaryRender}
              onError={(error) => {
                console.log(error)
              }}
            >
              <LayoutContent class={contentClassName} style={style}>
                {slots.default?.()}
              </LayoutContent>
            </ErrorBoundary>
          )
    }
  },
})
export default WrapContent

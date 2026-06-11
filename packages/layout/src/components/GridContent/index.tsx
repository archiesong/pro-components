import type { VueNode } from '@antdv-next/pro-utils'
import type { CSSProperties, ExtractPropTypes, PropType, SlotsType } from 'vue'
import type { PureSettings } from '../../defaultSettings'
import { classNames } from '@v-c/util'
import { useConfig } from 'antdv-next/dist/config-provider/context'
import { computed, defineComponent } from 'vue'
import { useRouteContext } from '../../context/RouteContext'
import { useStyle } from './style'

export function gridContentProps() {
  return {
    class: {
      type: String as PropType<string>,
      default: undefined,
    },
    style: {
      type: [Object, String] as PropType<CSSProperties | string>,
      default: undefined,
    },
    prefixCls: {
      type: String as PropType<string>,
      default: undefined,
    },
    contentWidth: {
      type: String as PropType<PureSettings['contentWidth']>,
      default: undefined,
    },
  }
}
export type GridContentProps = ExtractPropTypes<ReturnType<typeof gridContentProps>>

/**
 * This component can support contentWidth so you don't need to calculate the width
 * contentWidth=Fixed, width will is 1200
 */
const GridContent = defineComponent({
  name: 'GridContent',
  inheritAttrs: false,
  props: gridContentProps(),
  slots: Object as SlotsType<{
    default: () => VueNode
  }>,
  setup(props, { slots }) {
    const routeContext = useRouteContext()
    const config = useConfig()
    const prefixCls = computed(() => props.prefixCls || config.value.getPrefixCls('pro'))
    const contentWidth = computed(() => props.contentWidth || routeContext.value.contentWidth)
    const baseClassName = computed(() => `${prefixCls.value}-grid-content`)
    const { wrapSSR, hashId } = useStyle(baseClassName)
    const isWide = computed(() => contentWidth.value === 'Fixed' && routeContext.value.layout === 'top')
    return () => {
      const { class: className, style } = props
      return wrapSSR(
        <div
          class={classNames(baseClassName.value, hashId.value, className, {
            [`${baseClassName.value}-wide`]: isWide.value,
          })}
          style={style}
        >
          <div class={classNames(`${prefixCls.value}-grid-content-children`, hashId.value)}>{slots.default?.()}</div>
        </div>,
      )
    }
  },
})
export default GridContent

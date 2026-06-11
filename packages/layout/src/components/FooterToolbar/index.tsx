import type { GenerateStyle } from '@antdv-next/pro-provider'
import type { VueNode } from '@antdv-next/pro-utils'
import type { CSSProperties, ExtractPropTypes, PropType, SlotsType, VNode } from 'vue'
import type { FooterToolbarContentRender, SlotsRenderType } from '../../RenderTypings'
import type { stylishToken } from './style/stylish'
import { getSlot, isBrowser, useEffect } from '@antdv-next/pro-utils'
import { classNames } from '@v-c/util'
import { useConfig } from 'antdv-next/dist/config-provider/context'
import { computed, defineComponent, Fragment, Teleport } from 'vue'
import { useRouteContext } from '../../context/RouteContext'
import { useStyle } from './style'
import { useStylish } from './style/stylish'

export function footerToolbarProps() {
  return {
    class: {
      type: String as PropType<string>,
      default: undefined,
    },
    style: {
      type: [Object, String] as PropType<CSSProperties>,
      default: undefined,
    },
    extra: {
      type: Object as PropType<VNode>,
      default: undefined,
    },
    footerToolbarContentRender: {
      type: [Function, Boolean] as PropType<FooterToolbarContentRender>,
      default: undefined,
    },
    prefixCls: {
      type: String as PropType<string>,
      default: undefined,
    },
    stylish: {
      type: Object as PropType<GenerateStyle<stylishToken>>,
      default: undefined,
    },
    portalDom: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
  }
}

export type FooterToolbarProps = Partial<ExtractPropTypes<ReturnType<typeof footerToolbarProps>>>

const FooterToolbar = defineComponent({
  name: 'FooterToolbar',
  inheritAttrs: false,
  props: footerToolbarProps(),
  slots: Object as SlotsType<Pick<SlotsRenderType, 'footerToolbarContentRender'> & {
    default: () => VueNode[]
  }>,
  setup(props, { slots }) {
    const config = useConfig()
    const prefixCls = computed(() => props.prefixCls || config.value.getPrefixCls('pro'))
    const baseClassName = computed(() => `${prefixCls.value}-footer-bar`)
    const routeContext = useRouteContext()
    const { wrapSSR, hashId } = useStyle(baseClassName)
    const width = computed(() => {
      const { hasSiderMenu, isMobile, siderWidth } = routeContext.value
      if (!hasSiderMenu) {
        return undefined
      }
      // 0 or undefined
      if (!siderWidth) {
        return '100%'
      }
      return isMobile ? '100%' : `calc(100% - ${siderWidth}px)`
    })
    const containerDom = computed(() => {
      if (typeof window === 'undefined' || typeof document === 'undefined')
        return null
      // 只读取一次就行了，不然总是的渲染
      return config.value.getTargetContainer?.() || document.body
    })
    const stylish = useStylish(
      computed(() => `${baseClassName.value}.${baseClassName.value}-stylish`),
      {
        stylish: computed(() => props.stylish as GenerateStyle<stylishToken>),
      },
    )

    /** 告诉 props 是否存在 footerBar */
    useEffect(() => {
      if (!routeContext.value || !routeContext.value?.setHasFooterToolbar) {
        return () => {}
      }
      routeContext.value?.setHasFooterToolbar?.(true)
      return () => {
        routeContext.value?.setHasFooterToolbar?.(false)
      }
    }, [])

    return () => {
      const { extra, class: className, style, portalDom = true } = props
      const footerToolbarContentRender = getSlot(slots, props, 'footerToolbarContentRender')
      const dom = (
        <>
          <div class={classNames(`${baseClassName.value}-left`, hashId.value)}>{extra}</div>
          <div class={classNames(`${baseClassName.value}-right`, hashId.value)}>{slots.default?.()}</div>
        </>
      )
      const renderDom = (
        <div
          class={classNames(className, hashId.value, baseClassName.value, {
            [`${baseClassName.value}-stylish`]: !!props.stylish,
          })}
          style={{ width: width.value, ...style }}
        >
          {footerToolbarContentRender
            ? footerToolbarContentRender({
                props: {
                  ...props,
                  ...routeContext.value,
                  leftWidth: width.value,
                },
                dom,
              })
            : dom}
        </div>
      )
      return stylish.wrapSSR(
        wrapSSR(
          <Fragment key={baseClassName.value}>
            {!isBrowser() || !portalDom || !containerDom.value
              ? <>{renderDom}</>
              : (
                  <Teleport to={containerDom.value}>
                    {renderDom}
                    {' '}
                  </Teleport>
                )}
          </Fragment>,
        ),
      )
    }
  },
})
export default FooterToolbar

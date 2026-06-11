import type { CSSProperties, ExtractPropTypes, PropType, VNode } from 'vue'
import { classNames } from '@v-c/util'
import { useConfig } from 'antdv-next/dist/config-provider/context'
import { computed, defineComponent } from 'vue'
import { useStyle } from './style'

export function globalFooterProps() {
  return {
    links: {
      type: [Boolean, Array] as PropType<
        | boolean
        | {
          key?: string
          title: VNode
          href: string
          blankTarget?: boolean
        }[]
      >,
      default: undefined,
    },
    copyright: {
      type: [Object, Boolean] as PropType<VNode | boolean>,
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
    class: {
      type: String as PropType<string>,
      default: undefined,
    },
  }
}

export type GlobalFooterProps = Partial<ExtractPropTypes<ReturnType<typeof globalFooterProps>>>

const GlobalFooter = defineComponent({
  name: 'GlobalFooter',
  inheritAttrs: false,
  props: globalFooterProps(),
  setup(props) {
    const config = useConfig()
    const baseClassName = computed(() => config.value.getPrefixCls(props.prefixCls || 'pro-global-footer'))
    const { wrapSSR, hashId } = useStyle(baseClassName)
    return () => {
      const { links, copyright, class: className, style } = props
      if ((links == null || links === false || (Array.isArray(links) && links.length === 0)) && (copyright == null || copyright === false)) {
        return null
      }
      return wrapSSR(
        <div class={classNames(baseClassName.value, hashId.value, className)} style={style}>
          {links && Array.isArray(links) && links.length > 0 && (
            <div class={classNames(`${baseClassName.value}-list`, hashId.value)}>
              {links?.map(link => (
                <a
                  class={classNames(`${baseClassName.value}-list-link`, hashId.value)}
                  key={link.key}
                  title={link.key}
                  target={link.blankTarget ? '_blank' : '_self'}
                  href={link.href}
                  rel="noreferrer"
                >
                  {link.title}
                </a>
              ))}
            </div>
          )}
          {copyright && <div class={classNames(`${baseClassName.value}-copyright`, hashId.value)}>{copyright}</div>}
        </div>,
      )
    }
  },
})
export default GlobalFooter

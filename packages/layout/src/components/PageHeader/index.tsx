import type { MouseEventHandler } from '@v-c/util/dist/EventInterface'
import type { AvatarProps, BreadcrumbProps, TagProps } from 'antdv-next'
import type { DirectionType } from 'antdv-next/dist/config-provider/context'
import type { CSSProperties, ExtractPropTypes, PropType, SlotsType, VNode } from 'vue'
import type { BreadcrumbRender } from '../../RenderTypings'
import type { VueNode } from '../../typing'
import { ArrowLeftOutlined, ArrowRightOutlined } from '@antdv-next/icons'
import ResizeObserver from '@v-c/resize-observer'
import { classNames } from '@v-c/util'
import { Avatar, Breadcrumb, Space } from 'antdv-next'
import { useConfig } from 'antdv-next/dist/config-provider/context'
import { computed, defineComponent, onBeforeUnmount, shallowRef } from 'vue'
import { useStyle } from './style'

export function pageHeaderProps() {
  return {
    prefixCls: {
      type: String as PropType<string>,
      default: undefined,
    },
    class: {
      type: String as PropType<string>,
      default: undefined,
    },
    style: {
      type: [Object, String] as PropType<CSSProperties | string>,
      default: undefined,
    },
    ghost: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
    breadcrumbRender: {
      type: Function as PropType<BreadcrumbRender>,
      default: undefined,
    },
    avatar: {
      type: Object as PropType<AvatarProps & { class?: string }>,
      default: undefined,
    },
    backIcon: {
      type: [String, Object, Function, Array] as PropType<VueNode | (() => VueNode)>,
      default: undefined,
    },
    breadcrumb: {
      type: Object as PropType<Partial<BreadcrumbProps>>,
      default: undefined,
    },
    extra: {
      type: [String, Object, Array, Function] as PropType<VueNode | (() => VueNode)>,
      default: undefined,
    },
    footer: {
      type: [String, Object, Function, Array] as PropType<VueNode | (() => VueNode)>,
      default: undefined,
    },
    subTitle: {
      type: [String, Object, Function, Array] as PropType<VueNode | (() => VueNode)>,
      default: undefined,
    },
    tags: {
      type: [String, Object, Array, Function] as PropType<VueNode | VNode<TagProps> | (() => VueNode)>,
      default: undefined,
    },
    title: {
      type: [String, Object, Function, Array] as PropType<VueNode | (() => VueNode)>,
      default: undefined,
    },
    onBack: {
      type: Function as PropType<MouseEventHandler>,
      default: undefined,
    },
  }
}

export type PageHeaderProps = Partial<ExtractPropTypes<ReturnType<typeof pageHeaderProps>>>

function useDestroyed() {
  const destroyed = shallowRef(false)
  onBeforeUnmount(() => {
    destroyed.value = true
  })

  return destroyed
}

function renderBreadcrumb(breadcrumb: BreadcrumbProps & { class: string }, prefixCls: string) {
  if (!breadcrumb.items?.length)
    return null
  return <Breadcrumb {...breadcrumb} class={classNames(`${prefixCls}-breadcrumb`, breadcrumb.class)} />
}

function getBackIcon(props: PageHeaderProps, direction: DirectionType = 'ltr') {
  if (props.backIcon !== undefined) {
    return props.backIcon
  }
  return direction === 'rtl' ? <ArrowRightOutlined /> : <ArrowLeftOutlined />
}
function renderBack(prefixCls: string, hashId: string, backIcon?: VueNode, onBack?: MouseEventHandler) {
  if (!backIcon || !onBack) {
    return null
  }
  return (
    <div class={classNames(`${prefixCls}-back`, hashId)}>
      <div role="button" onClick={e => onBack?.(e)} class={classNames(`${prefixCls}-back-button`, hashId)} aria-label="back">
        {backIcon}
      </div>
    </div>
  )
}
function renderTitle(prefixCls: string, props: PageHeaderProps, direction: DirectionType = 'ltr', hashId: string) {
  const { title, avatar, subTitle, tags, extra, onBack } = props
  const headingPrefixCls = `${prefixCls}-heading`
  const hasHeading = title || subTitle || tags || extra
  // If there is nothing, return a null
  if (!hasHeading) {
    return null
  }
  const backIcon = getBackIcon(props, direction)
  const backIconDom = renderBack(prefixCls, hashId, backIcon, onBack)
  const hasTitle = backIconDom || avatar || hasHeading
  return (
    <div class={classNames(headingPrefixCls, hashId)}>
      {hasTitle && (
        <div class={classNames(`${headingPrefixCls}-left`, hashId)}>
          {backIconDom}
          {avatar && <Avatar {...avatar} class={classNames(`${headingPrefixCls}-avatar`, hashId, avatar.class)} />}
          {title && (
            <span class={classNames(`${headingPrefixCls}-title`, hashId)} title={typeof title === 'string' ? title : undefined}>
              {title}
            </span>
          )}
          {subTitle && (
            <span class={classNames(`${headingPrefixCls}-sub-title`, hashId)} title={typeof subTitle === 'string' ? subTitle : undefined}>
              {subTitle}
            </span>
          )}
          {tags && <span class={classNames(`${headingPrefixCls}-tags `, hashId)}>{tags}</span>}
        </div>
      )}
      {extra && (
        <span class={classNames(`${headingPrefixCls}-extra`, hashId)}>
          <Space>{extra}</Space>
        </span>
      )}
    </div>
  )
}
function renderChildren(prefixCls: string, children: VueNode | VueNode[], hashId: string) {
  return <div class={classNames(`${prefixCls}-content`, hashId)}>{children}</div>
}

function renderFooter(prefixCls: string, footer: VueNode | VueNode[], hashId: string) {
  if (footer) {
    return <div class={classNames(`${prefixCls}-footer`, hashId)}>{footer}</div>
  }
  return null
}

const PageHeader = defineComponent({
  name: 'PageHeader',
  inheritAttrs: false,
  props: pageHeaderProps(),
  slots: Object as SlotsType<{
    extra?: () => VueNode
    footer?: () => VueNode
    subTitle?: () => VueNode
    title?: () => VueNode
    tags?: () => VueNode
    backIcon?: () => VueNode
    default?: () => VueNode
    breadcrumbRender?: BreadcrumbRender
  }>,
  setup(props, { slots }) {
    const config = useConfig()
    const prefixCls = computed(() => props.prefixCls || config.value.getPrefixCls('pro'))
    const baseClassName = computed(() => `${prefixCls.value}-page-header`)
    const { wrapSSR, hashId } = useStyle(baseClassName)
    const compact = shallowRef(false)
    const isDestroyed = useDestroyed()

    const onResize = ({ width }: { width: number }) => {
      if (!isDestroyed.value) {
        compact.value = width < 768
      }
    }
    const getDefaultBreadcrumbDom = () => {
      const { breadcrumb } = props

      if ((breadcrumb as BreadcrumbProps)?.items) {
        return renderBreadcrumb(breadcrumb as BreadcrumbProps & { class: string }, baseClassName.value)
      }
      return null
    }

    return () => {
      const { style, class: propsClassName, breadcrumb, breadcrumbRender = slots.breadcrumbRender, ghost, footer } = props
      const isBreadcrumbComponent = breadcrumb && 'props' in breadcrumb
      const defaultBreadcrumbDom = getDefaultBreadcrumbDom()
      // support breadcrumbRender function
      const breadcrumbRenderDomFromProps = breadcrumbRender?.({ ...props, prefixCls: baseClassName.value }, defaultBreadcrumbDom) ?? defaultBreadcrumbDom
      const breadcrumbDom = isBreadcrumbComponent ? breadcrumb : breadcrumbRenderDomFromProps
      const className = classNames(
        baseClassName.value,
        {
          [`${baseClassName.value}-has-breadcrumb`]: !!breadcrumbDom,
          [`${baseClassName.value}-has-footer`]: !!footer,
          [`${baseClassName.value}-ghost`]: ghost,
          [`${baseClassName.value}-rtl`]: config.value.direction === 'rtl',
          [`${baseClassName.value}-compact`]: compact.value,
        },
        propsClassName,
        hashId.value,
      )
      const title = renderTitle(
        baseClassName.value,
        {
          ...props,
          title: slots.title?.() || props.title,
          subTitle: slots.subTitle?.() || props.subTitle,
          extra: slots.extra?.() || props.extra,
          tags: slots.tags?.() || props.tags,
          backIcon: slots.backIcon?.() || props.backIcon,
        },
        config.value.direction,
        hashId.value,
      )
      const childDom = slots.default?.() && renderChildren(baseClassName.value, slots.default?.(), hashId.value)
      const footerDom = renderFooter(baseClassName.value, slots.footer?.() || footer, hashId.value)
      if (!breadcrumbDom && !title && !footerDom && !childDom) {
        return <div class={classNames(hashId, [`${baseClassName.value}-no-children`])} />
      }
      return wrapSSR(
        <ResizeObserver onResize={onResize}>
          <div class={className} style={style}>
            {breadcrumbDom}
            {title}
            {childDom}
            {footerDom}
          </div>
        </ResizeObserver>,
      )
    }
  },
})
export default PageHeader

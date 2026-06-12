import type { GenerateStyle } from '@antdv-next1/pro-provider'
import type { BreadcrumbProps, SpinProps } from 'antdv-next'
import type { VueNode } from 'antdv-next/dist/_util/type'
import type { SlotsType } from 'vue'
import type { BreadcrumbRender, PageHeaderRender } from '../../RenderTypings'
import type { PageHeaderProps } from '../PageHeader'
import type { PageContainerProps } from './pageContainerProps'
import type { stylishToken } from './style/stylish'
import { useProConfig } from '@antdv-next1/pro-provider'
import { useEffect } from '@antdv-next1/pro-utils'
import { classNames } from '@v-c/util'
import { Affix, Tabs, Watermark } from 'antdv-next'
import { useConfig } from 'antdv-next/dist/config-provider/context'
import { computed, defineComponent, isVNode } from 'vue'
import { useRouteContext } from '../../context/RouteContext'
import FooterToolbar from '../FooterToolbar'
import GridContent from '../GridContent'
import PageHeader from '../PageHeader'
import PageLoading from '../PageLoading'
import { pageContainerProps } from './pageContainerProps'
import { useStyle } from './style'
import { useStylish } from './style/stylish'

function genLoading(spinProps: boolean | SpinProps | null) {
  if (typeof spinProps === 'object') {
    return spinProps
  }
  return { spinning: spinProps }
}

/**
 * Render Footer tabList In order to be compatible with the old version of the PageHeader basically
 * all the functions are implemented.
 */
function renderFooter({
  tabList,
  tabActiveKey,
  onTabChange,
  hashId,
  tabBarExtraContent,
  tabProps,
  prefixedClassName,
}: Omit<
  PageContainerProps & {
    prefixedClassName: string
    hashId: string
  },
  'title'
>) {
  if (Array.isArray(tabList) || tabBarExtraContent) {
    return (
      <Tabs
        {...tabProps}
        class={classNames(`${prefixedClassName}-tabs`, hashId)}
        activeKey={tabActiveKey}
        tabBarExtraContent={tabBarExtraContent}
        onChange={(key) => {
          if (onTabChange) {
            onTabChange(key)
          }
        }}
        styles={tabProps?.styles || (!tabList?.filter(item => item.content).length
          ? {
              header: {
                marginBlockEnd: 0,
              },
            }
          : {})}
        items={tabList?.map((item, index) => ({
          ...item,
          key: item.key?.toString() || index?.toString(),
        }))}
      />
    )
  }
  return null
}
function renderPageHeader(content: VueNode, extraContent: VueNode, prefixedClassName: string, hashId: string) {
  if (!content && !extraContent) {
    return null
  }
  return (
    <div class={classNames(`${prefixedClassName}-detail`, hashId)}>
      <div class={classNames(`${prefixedClassName}-main `, hashId)}>
        <div class={classNames(`${prefixedClassName}-row`, hashId)}>
          {content && <div class={classNames(`${prefixedClassName}-content`, hashId)}>{content}</div>}
          {extraContent && <div class={classNames(`${prefixedClassName}-extraContent`, hashId)}>{extraContent}</div>}
        </div>
      </div>
    </div>
  )
}

const PageContainerBase = defineComponent({
  name: 'PageContainerBase',
  inheritAttrs: false,
  props: pageContainerProps(),
  slots: Object as SlotsType<{
    default?: VueNode
    footer?: VueNode
    extra?: VueNode
    title?: VueNode
    tags?: VueNode
    backIcon?: VueNode
    content?: VueNode
    subTitle?: VueNode
    extraContent?: VueNode
    tabBarExtraContent?: VueNode
    pageHeaderRender?: PageHeaderRender
    breadcrumbRender?: BreadcrumbRender
  }>,
  setup(props, { slots }) {
    const routeContext = useRouteContext()
    const proProvide = useProConfig()
    const config = useConfig()
    const prefixCls = computed(() => props.prefixCls || config.value.getPrefixCls('pro'))
    const baseClassName = computed(() => `${prefixCls.value}-page-container`)
    const { wrapSSR, hashId } = useStyle(
      baseClassName,
      computed(() => props.token),
    )
    /** 告诉 props 是否存在 footerBar */
    useEffect(() => {
      if (!routeContext.value || !routeContext.value?.setHasPageContainer) {
        return () => {}
      }
      routeContext.value?.setHasPageContainer?.((routeContext.value.hasPageContainer || 0) + 1)
      return () => {
        routeContext.value?.setHasPageContainer?.((routeContext.value.hasPageContainer || 0) - 1)
      }
    }, [])

    const stylish = useStylish(
      computed(() => `${baseClassName.value}.${baseClassName.value}-stylish`),
      {
        stylish: computed(() => props.stylish as GenerateStyle<stylishToken>),
      },
    )
    const memoBreadcrumbRender = computed(() => {
      const { header, breadcrumbRender = slots.breadcrumbRender } = props
      if (breadcrumbRender === false)
        return false
      return breadcrumbRender || header?.breadcrumbRender
    })

    const loadingDom = computed(() => {
      const { loading = false } = props
      // 当loading时一个合法的VNode时，说明用户使用了自定义loading,直接返回改自定义loading
      if (isVNode(loading)) {
        return loading
      }
      // 当传递过来的是布尔值，并且为false时，说明不需要显示loading,返回null
      if (typeof loading === 'boolean' && !loading) {
        return null
      }
      // 如非上述两种情况，那么要么用户传了一个true,要么用户传了loading配置，使用genLoading生成loading配置后返回PageLoading
      const spinProps = genLoading(loading as SpinProps | boolean)
      // 如果传的是loading配置，但spinning传的是false，也不需要显示loading
      return spinProps?.spinning ? <PageLoading {...spinProps} /> : null
    })

    const pageHeaderDom = computed(() => {
      const {
        loading,
        footer,
        affixProps,
        pageHeaderRender,
        class: className,
        style,
        token: propsToken,
        fixedHeader,
        breadcrumbRender = memoBreadcrumbRender.value,
        footerToolBarProps,
        ...restProps
      } = props
      if (pageHeaderRender === false)
        return null
      if (pageHeaderRender) {
        return pageHeaderRender({
          ...restProps,
          title: routeContext.value.title,
          breadcrumb: routeContext.value.breadcrumb,
        })
      }

      let pageHeaderTitle = restProps.title

      if (!restProps.title && restProps.title !== false) {
        pageHeaderTitle = routeContext.value.title
      }
      const pageHeaderProps: PageHeaderProps = {
        ...routeContext.value,
        ...restProps,
        breadcrumb: routeContext.value.breadcrumb || restProps.breadcrumb,
        title: pageHeaderTitle,
        footer: renderFooter({
          ...restProps,
          hashId: hashId.value,
          breadcrumbRender,
          prefixedClassName: baseClassName.value,
        }),
        ...restProps.header,
      }
      const { breadcrumb } = pageHeaderProps as {
        breadcrumb: BreadcrumbProps
      }

      const noHasBreadCrumb = (!breadcrumb || (!breadcrumb?.itemRender && !breadcrumb?.items?.length)) && !breadcrumbRender
      if (
        ['title', 'subTitle', 'extra', 'tags', 'footer', 'avatar', 'backIcon'].every(item => !pageHeaderProps[item as 'backIcon'])
        && noHasBreadCrumb
        && !restProps.content
        && !restProps.extraContent
      ) {
        return null
      }
      const children = restProps.header?.children || renderPageHeader(restProps.content, restProps.extraContent, baseClassName.value, hashId.value)
      return (
        <PageHeader
          {...pageHeaderProps}
          class={classNames(`${baseClassName.value}-wrap-page-header`, hashId.value, {
            [`${baseClassName.value}-wrap-page-header-wide`]: routeContext.value.contentWidth === 'Fixed' && routeContext.value.layout === 'top',
          })}
          breadcrumb={
            breadcrumbRender === false
              ? undefined
              : {
                  ...pageHeaderProps.breadcrumb,
                  ...routeContext.value.breadcrumbProps,
                }
          }
          breadcrumbRender={!breadcrumbRender ? undefined : breadcrumbRender}
          v-slots={children ? { default: () => children } : {}}
        />
      )
    })

    const contentDom = computed(() => {
      return slots.default?.()
        ? (
            <div
              class={classNames(`${baseClassName.value}-children-content`, hashId.value, {
                [`${baseClassName.value}-children-content-no-header`]: !pageHeaderDom.value,
              })}
            >
              {slots.default?.()}
            </div>
          )
        : null
    })
    const renderContentDom = computed(() => {
      const { waterMarkProps } = props
      // 只要loadingDom非空我们就渲染loadingDom,否则渲染内容
      const dom = loadingDom.value || contentDom.value
      return waterMarkProps || routeContext.value.waterMarkProps
        ? (
            <Watermark
              {...{
                ...routeContext.value.waterMarkProps,
                ...props.waterMarkProps,
              }}
            >
              {dom}
            </Watermark>
          )
        : (
            dom
          )
    })
    return () => {
      const { loading, footer, affixProps, class: className, token: propsToken, fixedHeader, breadcrumbRender, footerToolBarProps, ...restProps } = props

      const containerClassName = classNames(baseClassName.value, hashId.value, className, {
        [`${baseClassName.value}-with-footer`]: footer,
        [`${baseClassName.value}-with-affix`]: fixedHeader && pageHeaderDom.value,
        [`${baseClassName.value}-stylish`]: !!restProps.stylish,
      })
      return wrapSSR(
        stylish.wrapSSR(
          <>
            <div class={containerClassName}>
              {fixedHeader && pageHeaderDom.value ? (
                // 在 hasHeader 且 fixedHeader 的情况下，才需要设置高度
                <Affix
                  {...affixProps}
                  offsetTop={routeContext.value.hasHeader && routeContext.value.fixedHeader ? proProvide.value.token.layout?.header?.heightLayoutHeader : 1}
                  class={classNames(`${baseClassName.value}-affix`, hashId.value)}
                >
                  <div class={classNames(`${baseClassName.value}-wrap`, hashId.value)}>{pageHeaderDom.value}</div>
                </Affix>
              ) : (
                <div class={classNames(`${baseClassName.value}-wrap`, hashId.value)}>{pageHeaderDom.value}</div>
              )}
              {renderContentDom.value && <GridContent>{renderContentDom.value}</GridContent>}
            </div>
            {footer && (
              <FooterToolbar {...footerToolBarProps} stylish={restProps.footerStylish} prefixCls={prefixCls.value}>
                {footer}
              </FooterToolbar>
            )}
          </>,
        ),
      )
    }
  },
})

export default PageContainerBase

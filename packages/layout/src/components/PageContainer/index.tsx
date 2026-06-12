import type { CustomSlotsType } from '@v-c/util/dist/type'
import type { App, Plugin } from 'vue'
import type { BreadcrumbRender, PageHeaderRender } from '../../RenderTypings'
import type { VueNode } from '../../typing'
import type { PageContainerProps } from './PageContainerBase'
import ProConfigProvider from '@antdv-next1/pro-provider'
import { getSlot } from '@antdv-next1/pro-utils'
import { defineComponent } from 'vue'
import PageContainerBase from './PageContainerBase'

const _PageContainer = defineComponent<PageContainerProps, {}, string, CustomSlotsType<{
  default?: () => VueNode
  footer?: () => VueNode
  extra?: () => VueNode
  title?: () => VueNode
  backIcon?: () => VueNode
  tags?: () => VueNode
  content?: () => VueNode
  subTitle?: () => VueNode
  extraContent?: () => VueNode
  tabBarExtraContent?: () => VueNode
  pageHeaderRender?: PageHeaderRender
  breadcrumbRender?: BreadcrumbRender
}>>((props, { slots, attrs }) => {
  return () => {
    const { footer, tabBarExtraContent, extraContent = slots.extraContent, extra, tags, title = slots.title, content = slots.content, subTitle, backIcon } = props
    const pageHeaderRender = getSlot(slots, props, 'pageHeaderRender')
    // const title = getSlot(slots, props, 'title')
    // const content = getSlot(slots, props, 'content')
    // const extraContent = getSlot(slots, props, 'extraContent')
    const breadcrumbRender = getSlot(slots, props, 'breadcrumbRender')
    return (
      <ProConfigProvider needDeps>
        <PageContainerBase
          {...attrs}
          {...props}
          pageHeaderRender={pageHeaderRender}
          title={title}
          subTitle={slots.subTitle?.() || subTitle}
          content={content}
          extraContent={extraContent}
          tabBarExtraContent={slots.tabBarExtraContent?.() || tabBarExtraContent}
          extra={slots.extra?.() || extra}
          footer={slots.footer?.() || footer}
          tags={slots.tags?.() || tags}
          backIcon={slots.backIcon?.() || backIcon}
          breadcrumbRender={breadcrumbRender}
          v-slots={slots}
        />
      </ProConfigProvider>
    )
  }
}, {
  name: 'PageContainer',
  inheritAttrs: false,
})

const PageContainer = _PageContainer as typeof _PageContainer & Plugin

PageContainer.install = (app: App) => {
  app.component(PageContainer.name!, PageContainer)
  return app
}

export type { PageContainerProps }
export default PageContainer

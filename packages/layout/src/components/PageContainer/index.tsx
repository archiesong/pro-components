import type { App, Plugin, SlotsType } from 'vue'
import type { BreadcrumbRender, PageHeaderRender } from '../../RenderTypings'
import type { VueNode } from '../../typing'
import ProConfigProvider from '@antdv-next/pro-provider'
import { getSlot } from '@antdv-next/pro-utils'
import { defineComponent } from 'vue'
import PageContainerBase from './PageContainerBase'
import { pageContainerProps } from './pageContainerProps'

const PageContainer = defineComponent({
  name: 'PageContainer',
  inheritAttrs: false,
  props: pageContainerProps(),
  slots: Object as SlotsType<{
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
  }>,
  setup(props, { slots, attrs }) {
    return () => {
      const { footer, tabBarExtraContent, extra, tags, subTitle, backIcon } = props
      const pageHeaderRender = getSlot(slots, props, 'pageHeaderRender')
      const title = getSlot(slots, props, 'title')
      const content = getSlot(slots, props, 'content')
      const extraContent = getSlot(slots, props, 'extraContent')
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
  },
})

PageContainer.install = (app: App) => {
  app.component(PageContainer.name!, PageContainer)
  return app
}
export default PageContainer as typeof PageContainer & Plugin

---
category: Components
subtitle: 页容器
type: 布局
cols: 3
title: PageContainer
---

PageContainer 是为了减少繁杂的面包屑配置和标题，很多页面都需要面包屑和标题的配置。当然也可以关掉自动生成的，而使用自己的配置。

PageContainer 封装了 antd 的 PageHeader 组件，增加了 tabList 和 content。 根据当前的路由填入 title 和 breadcrumb。它依赖 Layout 的 route 属性。当然你可以传入参数来覆写默认值。 PageContainer 支持 Tabs 和 PageHeader 的所有属性。

为了方便进行表单等操作我们增加了一个 footer 属性，可以获得一个一直悬浮在底部的操作栏。如果觉得不方便也可以直接使用 FooterToolbar 来承载操作，两者表现基本相同，但是 FooterToolbar 拥有更多自定义的配置。

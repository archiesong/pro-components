---
category: Components
subtitle: 高级布局
type: 布局
cols: 3
title: ProLayout
---

ProLayout 可以提供一个标准又不失灵活的中后台标准布局，同时提供一键切换布局形态、自动生成菜单等功能。与 PageContainer 配合使用可以自动生成面包屑、页面标题，并且提供低成本方案接入页脚工具栏。


## 何时使用

页面中需要承载内容时，可以使用 ProLayout 来减少布局成本。


## API

### ProLayout

> 所有以 `Render` 为后缀的方法都可以通过传入 `false` 来使其不渲染

| 参数   | 说明                        | 类型                        | 默认值               |
| ----- | --------------------------- | --------------------------- | -------------------- |
| title | layout 的左上角的 title       | `VueNode`                   | `Ant Design Vue Pro` |
| logo  | layout 的左上角 logo 的 url   | `VueNode` \| `()=> VueNode` | -                    |
| pure  | 是否删除掉所有的自带界面        |  `boolean`                  | -                    |
| loading  | layout 的加载态        |  `boolean`                  | -                    |
| location  | 当前应用会话的位置信息 |  `{ pathname: string }`     | `isBrowser() ? { pathname: (location.pathname || '/') } : undefined `|
| appList  | 跨站点导航列表 |`{ icon, title, desc, url, target, children }[]`| - |
| layout   | layout 的菜单模式，side：右侧导航，top：顶部导航， mix：混合导航， left：左侧混合导航 | `side` \| `top` \| `mix` \| `left` | `side` |
---
category: Components
group: Layout
title: ProLayout
cover: https://gw.alipayobjects.com/zos/antfincdn/4n5H%24UX%24j/bianzu%2525204.svg
coverDark: https://gw.alipayobjects.com/zos/antfincdn/4n5H%24UX%24j/bianzu%2525204.svg
---

ProLayout 可以提供一个标准又不失灵活的中后台标准布局，同时提供一键切换布局形态、自动生成菜单等功能。与 PageContainer 配合使用可以自动生成面包屑、页面标题，并且提供低成本方案接入页脚工具栏。

## 何时使用 {#when-to-use}

页面中需要承载内容时，可以使用 ProLayout 来减少布局成本。

## 代码演示 {#examples}

<demo-group>
  <demo src="./demo/basic.vue" iframe="360">基础使用</demo>
  <demo src="./demo/help.vue" iframe="360">高级帮助</demo>
</demo-group>

## API

### ProLayout {#prolayout}

> 所有以 `Render` 为后缀的方法都可以通过传入 `false` 来使其不渲染。

| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| offsetTop | 距离窗口顶部达到指定偏移量后触发 | number | 0 | - |
| offsetBottom | 距离窗口底部达到指定偏移量后触发 | number | - | - |
| target | 设置 `Affix` 需要监听其滚动事件的元素，值为一个返回对应 DOM 元素的函数 | () =&gt; Window \| HTMLElement \| null | () =&gt; window | - |

### menu {#menu}

menu 中支持了部分常用的 menu 配置，可以帮助我们更好的管理 menu

| 事件名 | 说明 | 类型 | 版本 |
| ----- | --- | --- | --- |
| change | 固定状态改变时触发的回调函数 | (affixed?: boolean) =&gt; void | - |


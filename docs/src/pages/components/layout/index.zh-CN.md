---
category: Components
group: 布局
title: ProLayout
subtitle: 高级布局
cover: https://gw.alipayobjects.com/zos/antfincdn/4n5H%24UX%24j/bianzu%2525204.svg
coverDark: https://gw.alipayobjects.com/zos/antfincdn/4n5H%24UX%24j/bianzu%2525204.svg
---

ProLayout 可以提供一个标准又不失灵活的中后台标准布局，同时提供一键切换布局形态、自动生成菜单等功能。 与 PageContainer 配合使用可以自动生成面包屑、页面标题，并且提供低成本方案接入页脚工具栏。

## 何时使用 {#when-to-use}

页面中需要承载内容时，可以使用 ProLayout 来减少布局成本。

## 代码演示 {#examples}

<demo-group>
  <demo src="./demo/basic.vue" iframe="550">基础使用</demo>
  <demo src="./demo/help.vue" iframe="360">高级帮助</demo>
</demo-group>

## API

### ProLayout {#prolayout}

> 所有以 `Render` 为后缀的方法都可以通过传入 `false` 来使其不渲染。

| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| title | layout 的左上角的 title | `VueNode` | `Antdv Next Pro` | - |
| logo | layout 的左上角 logo 的配置，可以配置url，Vue 组件 和 false | `VueNode \| WithFalse<()=>VueNode>` | - | - |
| pure | 简约模式，设置了之后不渲染的任何 layout 的东西，但是会有 context，可以获取到当前菜单 | `boolean` | - | - |
| loading | layout 的加载态，设置完成之后只展示一个 loading | `boolean` | - | - |
| location | 当前应用会话的位置信息。如果你的应用创建了自定义的 history，则需要显示指定 location 属性 | `RouterTypes['location']` | `isBrowser ? window.location : undefined` | - |
| appList | 跨站点导航列表 | `AppListProps` | - | - |
| appListRender | 自定义跨站点导航列表的 render 方法 | `(props: AppListProps, defaultDom: VueNode) => VueNode` | - | - |
| menuHeaderRender | 渲染 logo 和 title, 优先级比 `headerTitleRender` 更高 | `WithFalse<(logo: VueNode, title: VueNode, props?: SiderMenuProps) => VueNode>` \| slot | - | - |

### menu {#menu}

menu 中支持了部分常用的 menu 配置，可以帮助我们更好的管理 menu

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| ----- | --- | --- | --- | --- |
| autoClose | 选中菜单是否自动关闭菜单 | `boolean` | `true` | - |
| defaultOpenAll | 默认打开所有的菜单项，要注意只有 layout 挂载之前生效，异步加载菜单是不支持的 | `boolean` | `false` | - |
| ignoreFlatMenu | 是否忽略手动折叠过的菜单状态，结合 `defaultOpenAll` 可实现折叠按钮切换后，同样可以展开所有子菜单 | `boolean` | `false` | - |

### SettingDrawer {#settingdrawer}

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| ----- | --- | --- | --- | --- |
| collapse | 控制 SettingDrawer 的收起和展开 | `boolean` | - | - |

### 事件 {#events}

| 事件 | 说明 | 类型 | 版本 |
| ----- | --- | --- | --- |
| menuHeaderClick | menu 菜单的头部点击事件 | `(e: MouseEvent) => void` | - |
| collapse | 收起和展开的时候触发事件 | `(collapsed: boolean) => void` | - |

## 类型 {#types}

## 主题变量（Design Token）{#theme-variables}

Token 是一种设计系统的基本元素，可以使用 Token 来快速地修改组件库的基础样式。Layout 中可以通过 token 属性来配置这些颜色。

<ComponentTokenTable component="ProLayout"></ComponentTokenTable>

## FAQ {#faq}

### 自定义布局 {#custom-layout}

ProLayout 提供了一些 api 来删除用户不需要的区域。在 SettingDrawer 中也提供了一些配置来进行设置。

![setting-drawer-render](https://gw.alipayobjects.com/zos/antfincdn/mCXDkK2pJ0/60298863-F5A5-4af2-923A-13EF912DB0E1.png)

- `headerRender` 可以自定义顶栏
- `footerRender` 可以自定义页脚
- `menuRender` 可以自定义菜单区域
- `menuHeaderRender` 自定义的菜单头区域
- `menuExtraRender` 可以为菜单增加一个额外内容，在菜单头和菜单之间

> 在 layout 中所有的 xxxRender 都可以传入 false，来关闭渲染。

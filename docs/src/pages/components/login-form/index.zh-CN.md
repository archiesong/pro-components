---
category: Components
title: LoginForm/Page
subtitle: 登录表单
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*YSm4RI3iOJ8AAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*03dxS64LxeQAAAAAAAAAAAAADrJ8AQ/original
group:
  title: 数据录入
  order: 1
---
 一个包含登录表单（LoginForm）/ 页面级别登录表单（LoginFormPage）组件

## 何时使用 {#when-to-use}

 LoginForm 和 LoginFormPage 是 ProForm 的变体，两者是为了适应常见的登录表单布局来专门实现，适用于各类登录场景，降低布局的压力。

## 代码演示 {#examples}

<demo-group>
  <demo src="./demo/login-form.vue" iframe="550">登录表单</demo>
  <demo src="./demo/login-form-page.vue" iframe="750">页面级别的登录表单</demo>
</demo-group>

## API

### LoginForm

#### 属性 {#login-form-props}

| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| logo | logo 的配置，支持 VueNode 和 string | `VueNode` \| `url` | --- | --- |
| title | 标题，可以配置为空 | `VueNode` | --- | --- |
| subTitle | 二级标题，可以配置为空 | `VueNode` | --- | --- |
| actions | 自定义额外的登录功能 | `VueNode` | --- | --- |
| message | form 顶部的一个提示配置，可以配置一些错误的提示信息 | `VueNode` | --- | --- |

#### 事件 {#login-form-events}

| 事件名 | 说明 | 类型 | 版本 |
| --- | --- | --- | --- |

#### 方法 {#login-form-methods}

| 方法 | 说明 | 类型 | 版本 |
| --- | --- | --- | --- |

### LoginFormPage

#### 属性 {#login-form-page-props}

| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| logo | logo 的配置，支持 VueNode 和 string | `VueNode` \| `url` | --- | --- |
| title | 标题，可以配置为空 | `VueNode` | --- | --- |
| subTitle | 二级标题，可以配置为空 | `VueNode` | --- | --- |
| actions | 自定义额外的登录功能 | `VueNode` | --- | --- |
| message | form 顶部的一个提示配置，可以配置一些错误的提示信息 | `VueNode` | --- | --- |
| backgroundImageUrl | 整个区域的背景图片配置，手机端不会展示 | `url` | --- | --- |
| activityConfig | 活动的配置，包含 title，subTitle，action，分别代表标题，次标题和行动按钮，也可配置 style 来控制区域的样式 | `{title?: VueNode,subTitle:VueNode ,action:VueNode,style: CSSProperties}` | --- | --- |

#### 事件 {#login-form-page-props-events}

| 事件名 | 说明 | 类型 | 版本 |
| --- | --- | --- | --- |

#### 方法 {#login-form-page-props-methods}

| 方法 | 说明 | 类型 | 版本 |
| --- | --- | --- | --- |

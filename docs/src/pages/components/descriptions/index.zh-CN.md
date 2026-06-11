---
category: Components
title: ProDescriptions
subtitle: 描述列表
description:
group: 数据展示
---

高级描述列表组件，提供一个更加方便快速的方案来构建描述列表。

## 何时使用 {#when-to-use}

高级描述列表组件，提供一个更加方便快速的方案来构建描述列表。

ProDescriptions 的诞生是为了解决项目中需要写很多 Descriptions 的样板代码的问题，所以在其中封装了很多常用的逻辑。在 React 中写一个 Descriptions 免不了需要定义一些雷同的属性。所以 ProDescriptions 默认封装了请求网络，columns 列展示的逻辑。

比如 ProDescriptions 封装了请求网络的行为，ProDescriptions 会将 props.params 中的数据默认带入到请求中，如果接口恰好与我们的定义相同，实现一个查询会非常简单。

## 代码演示 {#examples}

<demo-group>
    <demo src="./demo/basic.vue">基础使用</demo>
</demo-group>

## API

### 属性 {#props}


| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |


### 事件 {#events}

| 事件名 | 说明 | 类型 | 版本 |
| ----- | --- | --- | --- |

### 方法 {#methods}

| 方法 | 说明 | 类型 | 版本 |
| --- | --- | --- | --- |

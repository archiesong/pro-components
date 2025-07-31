---
category: Components
subtitle: JSON 表单
type: 数据录入
cols: 3
title: Schema Form
---

SchemaForm 是根据 JSON Schema 来生成表单的工具。SchemaForm 会根据 valueType 来映射成不同的[表单项](/components/schema)

> Tips： 如您遇到卡顿问题或有更高的性能要求可[参考示例](/components/schema-form#高性能代码示例)使用


## API

SchemaForm 提供了与 [ProForm](/components/form/#proform) 相同的 API，并且增加了部分 API，以下的 SchemaForm 新增的 API。

| 参数   | 说明                        | 类型                        | 默认值               |
| ----- | --------------------------- | --------------------------- | -------------------- |
| layoutType | 使用的表单布局模式      | `ProFormLayoutType`                   | `Form` |
---
title: 快速上手
---

ProComponents of Vue 致力于提供给程序员**愉悦**的开发体验。

> 在开始之前，推荐先学习 [Vue](https://vuejs.dev)，并正确安装和配置了 [Node.js](https://nodejs.org/) v20 或以上。官方指南假设你已了解关于 HTML、CSS 和 JavaScript 的中级知识，并且已经完全掌握了 Vue 全家桶的正确开发方式。如果你刚开始学习前端或者 Vue，将 UI 框架作为你的第一步可能不是最好的主意。

---


### 1. 使用组件

直接用下面的代码替换 `App.vue` 的内容，用 Sfc 的方式直接使用 `antdv-next` 组件。

```vue
<script setup lang="ts">
<script setup lang="ts">
import { ProForm, ProFormText } from '@antdv-next1/pro-form'

function handleSubmit(values: Record<string, any>) {
  console.log(values)
}
</script>

<template>
  <ProForm @finish="handleSubmit">
    <ProFormText name="name" label="Name" :rules="[{ required: true }]" />
    <ProFormText name="email" label="Email" />
  </ProForm>
</template>
```


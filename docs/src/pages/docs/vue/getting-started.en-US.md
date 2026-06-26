---
title: Getting Started
---

ProComponents of Vue is dedicated to providing a **good development experience** for programmers.

> Before starting, it is recommended to learn [Vue](https://vuejs.dev) first, and correctly install and configure [Node.js](https://nodejs.org/) v20 or above. The official guide assumes that you have intermediate knowledge about HTML, CSS, and JavaScript, and have fully mastered the correct development approach with the Vue ecosystem. If you are just starting to learn front-end or Vue, it may not be the best idea to use the UI framework as your first step.

---


### 1. Use a Component

Replace the contents of `App.vue` with the following code. As you can see, you can directly use `antdv-next` components with the SFC approach.

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


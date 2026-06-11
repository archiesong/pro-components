<docs lang="zh-CN">
`ProCheckCard.Group` 内嵌 `ProCheckCard` 并与 `Grid` 组件一起使用，可以实现更灵活的布局。
</docs>

<docs lang="en-US">
`ProCheckCard.Group` 内嵌 `ProCheckCard` 并与 `Grid` 组件一起使用，可以实现更灵活的布局。
</docs>

<script setup lang="ts">
import { ProCheckCard, ProCheckCardGroup } from '@antdv-next/pro-card'
</script>

<template>
  <ProCheckCardGroup :style="{ width: '100%' }" size="small">
    <a-row>
      <a-col :span="8">
        <ProCheckCard title="Card A" description="This is the description" value="A" />
      </a-col>
      <a-col :span="8">
        <ProCheckCard title="Card B" description="This is the description" value="B" />
      </a-col>
      <a-col :span="8">
        <ProCheckCard title="Card C" description="This is the description" value="C" />
      </a-col>
    </a-row>
  </ProCheckCardGroup>
</template>

<style scoped></style>

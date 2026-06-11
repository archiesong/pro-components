<docs lang="zh-CN">
配置 `size` 尺寸大小，当前可选 `large`，`default`，`small`，不同尺寸仅宽度不同。
</docs>

<docs lang="en-US">
配置 `size` 尺寸大小，当前可选 `large`，`default`，`small`，不同尺寸仅宽度不同。
</docs>

<script setup lang="ts">
import { ProCheckCard } from '@antdv-next/pro-card'
import { ref } from 'vue'

const size = ref<'default' | 'large' | 'small'>('default')
</script>

<template>
  <div style="margin-block-end: 16px">
    <a-radio-group v-model:value="size">
      <a-radio-button value="large">
        Large
      </a-radio-button>
      <a-radio-button value="default">
        Default
      </a-radio-button>
      <a-radio-button value="small">
        Small
      </a-radio-button>
    </a-radio-group>
  </div>
  <ProCheckCard title="Card title" description="This is the description" :size="size" />
</template>

<style  scoped></style>

<docs lang="zh-CN">
通过 Segmented 分段选择器切换 `itemLayout`、`variant`、`split` 属性。
</docs>

<docs lang="en-US">
通过 Segmented 分段选择器切换 `itemLayout`、`variant`、`split` 属性。
</docs>

<script setup lang="ts">
import { ProListy } from '@antdv-next1/pro-listy'
import { Button } from 'antdv-next'
import { h, ref } from 'vue'

interface ProjectItem {
  title: string
  avatar: string
  description: string
  progress: number
  status: string
}

const dataSource: ProjectItem[] = [
  {
    title: '智慧零售平台',
    avatar:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    description: '面向线下门店的数字化经营解决方案',
    progress: 85,
    status: '开发中',
  },
  {
    title: 'Ant Design Pro',
    avatar:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    description: '开箱即用的中台前端解决方案',
    progress: 100,
    status: '已上线',
  },
  {
    title: '云原生微服务框架',
    avatar:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    description: '基于 K8s 的微服务开发与治理框架',
    progress: 92,
    status: '测试中',
  },
  {
    title: '数据可视化引擎',
    avatar:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    description: '企业级数据看板与图表分析工具',
    progress: 60,
    status: '开发中',
  },
]
const variant = ref<'outlined' | 'borderless' | 'filled'>('borderless')
const itemLayout = ref<'horizontal' | 'vertical'>('horizontal')
const split = ref(true)
</script>

<template>
  <div class="p-6">
    <a-space :style="{ marginBlockEnd: '16px', width: '100%', padding: '16px', border: '1px solid #f0f0f0', borderRadius: '8px' }" :size="12" orientation="vertical">
      <a-space>
        <span>itemLayout 列表项方向：</span>
        <a-segmented
          v-model:value="itemLayout"
          :options="[
            { label: '水平 horizontal', value: 'horizontal' },
            { label: '垂直 vertical', value: 'vertical' },
          ]"
        />
      </a-space>
      <a-space>
        <span>variant 外观变体：</span>
        <a-segmented
          v-model:value="variant"
          :options="[
            { label: '线框 outlined', value: 'outlined' },
            { label: '填充 filled', value: 'filled' },
            { label: '无边框 borderless', value: 'borderless' },
          ]"
        />
      </a-space>
      <a-space>
        <span>split 分割线：</span>
        <a-segmented
          :value="split ? 'true' : 'false'"
          :options="[
            { label: '有分割线', value: 'true' },
            { label: '无分割线', value: 'false' },
          ]"
          @change="(v) => split = v === 'true'"
        />
      </a-space>
    </a-space>
    <ProListy
      header-title="项目列表枚举切换"
      :item-layout="itemLayout"
      :variant="variant"
      :split="split"
      :items="dataSource"
      row-key="title"
      :tool-bar-render="() => [
        h(Button, { key: 'new', type: 'primary' }, () => '新建项目'),
      ]"
    />
  </div>
</template>

<style scoped></style>

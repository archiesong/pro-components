<docs lang="zh-CN">
通过 Segmented 分段选择器一键切换 `size`、`variant`、`layout`、`type`、`direction`、`split`、`collapsible` 七个枚举属性。
</docs>

<docs lang="en-US">
通过 Segmented 分段选择器一键切换 `size`、`variant`、`layout`、`type`、`direction`、`split`、`collapsible` 七个枚举属性。
</docs>

<script setup lang="ts">
import { ProCard } from '@antdv-next/pro-card'
import { theme } from 'antdv-next'
import { ref } from 'vue'

const { token } = theme.useToken()
const size = ref<'medium' | 'small'>('medium')
const variant = ref<'outlined' | 'borderless'>('outlined')
const layout = ref<'default' | 'center'>('default')
const type = ref<'default' | 'inner'>('default')
const direction = ref<'row' | 'column'>('row')
const split = ref<'vertical' | 'horizontal' | undefined>(
  undefined,
)
const collapsible = ref<'icon' | 'header' | false>(
  false,
)
</script>

<template>
  <div class="p-6">
    <ProCard
      variant="outlined"
      :style="{ marginBlockEnd: '16px' }"
    >
      <a-space orientation="vertical" :size="12" :style="{ width: '100%' }">
        <a-space>
          <span>size 尺寸：</span>
          <a-segmented
            v-model:value="size"
            :options="[
              { label: '默认 default', value: 'medium' },
              { label: '紧凑 small', value: 'small' },
            ]"
          />
        </a-space>
        <a-space>
          <span>variant 外观：</span>
          <a-segmented
            v-model:value="variant"
            :options="[
              { label: '线框 outlined', value: 'outlined' },
              { label: '无边框 borderless', value: 'borderless' },
            ]"
          />
        </a-space>
        <a-space>
          <span>layout 内容布局：</span>
          <a-segmented
            v-model:value="layout"
            :options="[
              { label: '默认 default', value: 'default' },
              { label: '居中 center', value: 'center' },
            ]"
          />
        </a-space>
        <a-space>
          <span>type 卡片类型：</span>
          <a-segmented
            v-model:value="type"
            :options="[
              { label: '默认 default', value: 'default' },
              { label: '内嵌 inner', value: 'inner' },
            ]"
          />
        </a-space>
        <a-space>
          <span>direction 子卡片方向：</span>
          <a-segmented
            v-model:value="direction"
            :options="[
              { label: '水平 row', value: 'row' },
              { label: '垂直 column', value: 'column' },
            ]"
          />
        </a-space>
        <a-space>
          <span>split 分割线：</span>
          <a-segmented
            :value="split ?? 'none'"
            :options="[
              { label: '无', value: 'none' },
              { label: '垂直 vertical', value: 'vertical' },
              { label: '水平 horizontal', value: 'horizontal' },
            ]"
            @change="(v) => split = (v === 'none' ? undefined : v as 'vertical' | 'horizontal')"
          />
        </a-space>
        <a-space>
          <span>collapsible 折叠方式：</span>
          <a-segmented
            :value="collapsible === false ? 'false' : collapsible"
            :options="[
              { label: '不可折叠', value: 'false' },
              { label: '图标触发 icon', value: 'icon' },
              { label: '标题触发 header', value: 'header' },
            ]"
            @change="(v) => collapsible = (v === 'false' ? false : v as 'header' | 'icon')"
          />
        </a-space>
      </a-space>
    </ProCard>
    <ProCard
      title="用户认证服务"
      extra="v2.3.1"
      tooltip="管理用户认证与授权的核心服务"
      :size="size"
      :variant="variant"
      :layout="layout"
      :type="type === 'default' ? undefined : type"
      :direction="direction"
      :split="split"
      :collapsible="collapsible || undefined"
      :default-collapsed="false"
    >
      <ProCard title="基本信息" :col-lg="12">
        <div>实例数量：3</div>
        <div>CPU 占用：45%</div>
        <div>内存占用：1.2 GB</div>
      </ProCard>
      <ProCard title="运行状态" :col-lg="12">
        <div>日均请求：120 万</div>
        <div>平均延迟：18ms</div>
        <div>成功率：99.98%</div>
      </ProCard>
    </ProCard>
    <div
      :style="{
        marginBlockStart: 12,
        padding: 12,
        background: token.colorBgTextHover,
        borderRadius: token.borderRadius,
        fontSize: 13,
        color: token.colorTextSecondary,
      }"
    >
      当前配置：size=<b>{{ size }}</b>、variant=<b>{{ variant }}</b>、layout=
      <b>{{ layout }}</b>、type=<b>{{ type }}</b>、direction=<b>{{ direction }}</b>、
      split=<b>{{ String(split ?? '无') }}</b>、collapsible=
      <b>{{ String(collapsible) }}</b>
    </div>
  </div>
</template>

<style scoped></style>

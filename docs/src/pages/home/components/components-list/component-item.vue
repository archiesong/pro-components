<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useLocale } from '@/composables/use-locale'
import { useAppStore } from '@/stores/app.ts'

const props = defineProps<{
  title: string
  type: 'new' | 'update'
  index: number
}>()

const { t } = useLocale()

const appStore = useAppStore()
const { darkMode } = storeToRefs(appStore)

const tagColor = computed(() => props.type === 'new' ? 'processing' : 'warning')
const tagText = computed(() => props.type === 'new' ? t('homePage.componentItem.new') : t('homePage.componentItem.update'))

const circleStyle = computed(() => ({
  insetInlineEnd: `${(props.index % 2) * -20 - 20}px`,
  bottom: `${(props.index % 3) * -40 - 20}px`,
}))
</script>

<template>
  <div
    class="antdv-components-list-card"
    :class="{ 'antdv-components-list-card-dark': darkMode }"
  >
    <!-- Decorator -->
    <div
      class="antdv-components-list-card-circle"
      :style="circleStyle"
    />

    <!-- Title -->
    <a-flex align="center" gap="small">
      <a-typography-title :level="4" style="font-weight: normal; margin: 0;">
        {{ title }}
      </a-typography-title>
      <a-tag :color="tagColor">
        {{ tagText }}
      </a-tag>
    </a-flex>

    <!-- Node Content -->
    <div class="antdv-components-list-card-node-wrap">
      <slot />
    </div>
  </div>
</template>

<style>
.antdv-components-list-card {
  border-radius: var(--ant-border-radius);
  border: 1px solid transparent;
  background-color: #f5f8ff;
  padding: var(--ant-padding-xl);
  flex: none;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.antdv-components-list-card > * {
  flex: none;
}

.antdv-components-list-card-dark {
  border-color: var(--ant-color-border);
  background-color: var(--ant-color-bg-container);
}

.antdv-components-list-card-circle {
  position: absolute;
  width: 120px;
  height: 120px;
  background: #1677ff;
  border-radius: 50%;
  filter: blur(40px);
  opacity: 0.1;
}

.antdv-components-list-card-node-wrap {
  margin-top: var(--ant-padding-lg);
  flex: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

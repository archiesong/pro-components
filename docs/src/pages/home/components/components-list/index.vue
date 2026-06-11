<script setup lang="ts">
import {
  CustomerServiceOutlined,
  QuestionCircleOutlined,
  SyncOutlined,
} from '@antdv-next/icons'
import { Card, DatePicker, FloatButton, Masonry, Splitter, SplitterPanel, Tour } from 'antdv-next'
import dayjs from 'dayjs'
import { storeToRefs } from 'pinia'
import { computed, h } from 'vue'
import { useLocale } from '@/composables/use-locale'
import { useAppStore } from '@/stores/app.ts'
import ComponentItem from './component-item.vue'

const { _InternalPanelDoNotUseOrYouWillBeFired: DatePickerPanel } = DatePicker as any
const { _InternalPanelDoNotUseOrYouWillBeFired: TourPanel } = Tour as any
const { _InternalPanelDoNotUseOrYouWillBeFired: FloatButtonPanel } = FloatButton as any

const { t } = useLocale()

const appStore = useAppStore()
const { darkMode } = storeToRefs(appStore)

const datePickerPresets = computed(() => [
  { label: t('homePage.componentsList.yesterday'), value: dayjs().add(-1, 'd') },
  { label: t('homePage.componentsList.lastWeek'), value: dayjs().add(-7, 'd') },
  { label: t('homePage.componentsList.lastMonth'), value: dayjs().add(-1, 'month') },
  { label: t('homePage.componentsList.lastYear'), value: dayjs().add(-1, 'year') },
])

const floatButtonItems = computed(() => [
  { icon: () => h(QuestionCircleOutlined) },
  { icon: () => h(CustomerServiceOutlined) },
  { icon: () => h(SyncOutlined) },
])

const masonryItems = [
  { key: '1', data: 80 },
  { key: '2', data: 60 },
  { key: '3', data: 40 },
  { key: '4', data: 120 },
  { key: '5', data: 90 },
  { key: '6', data: 40 },
  { key: '7', data: 60 },
  { key: '8', data: 70 },
  { key: '9', data: 120 },
]

const splitterBackground = computed(() => darkMode.value ? '#1f1f1f' : '#ffffff')
</script>

<template>
  <a-flex justify="center" class="antdv-components-list">
    <a-flex align="stretch" gap="large">
      <!-- DatePicker -->
      <ComponentItem title="DatePicker" type="new" :index="0">
        <DatePickerPanel
          :value="dayjs('2025-11-22 00:00:00')"
          :show-today="false"
          :presets="datePickerPresets"
        />
      </ComponentItem>

      <!-- Tour -->
      <ComponentItem title="Tour" type="new" :index="1">
        <TourPanel
          title="Antdv Next"
          :description="t('homePage.componentsList.tour')"
          :style="{ width: '350px' }"
          :current="3"
          :total="9"
        />
      </ComponentItem>

      <!-- FloatButton -->
      <ComponentItem title="FloatButton" type="new" :index="2">
        <a-flex align="center" gap="large">
          <FloatButtonPanel
            shape="square"
            :items="floatButtonItems"
          />
          <FloatButtonPanel back-top />
          <FloatButtonPanel
            :items="floatButtonItems"
          />
        </a-flex>
      </ComponentItem>

      <!-- Splitter -->
      <ComponentItem title="Splitter" type="new" :index="3">
        <Splitter
          orientation="vertical"
          :style="{
            height: '320px',
            width: '200px',
            background: splitterBackground,
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          }"
        >
          <SplitterPanel default-size="40%" min="20%" max="70%">
            <a-flex justify="center" align="center" style="height: 100%;">
              <a-typography-title type="secondary" :level="5" style="white-space: nowrap;">
                First
              </a-typography-title>
            </a-flex>
          </SplitterPanel>

          <SplitterPanel>
            <a-flex justify="center" align="center" style="height: 100%;">
              <a-typography-title type="secondary" :level="5" style="white-space: nowrap;">
                Second
              </a-typography-title>
            </a-flex>
          </SplitterPanel>
        </Splitter>
      </ComponentItem>

      <!-- Masonry -->
      <ComponentItem title="Masonry" type="new" :index="4">
        <Masonry
          :columns="2"
          :gutter="8"
          :style="{ width: '300px', height: '320px' }"
          :items="masonryItems"
        >
          <template #itemRender="{ data, index }">
            <Card size="small" :style="{ height: `${data}px` }">
              {{ index + 1 }}
            </Card>
          </template>
        </Masonry>
      </ComponentItem>
    </a-flex>
  </a-flex>
</template>

<style>
.antdv-components-list {
  width: 100%;
  overflow: hidden;
}
</style>

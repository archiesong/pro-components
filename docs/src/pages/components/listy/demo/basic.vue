<docs lang="zh-CN">
典型的页面布局。
</docs>

<docs lang="en-US">
Classic page layouts.
</docs>

<script setup lang="ts">
import { ProListy, ProListyItem } from '@antdv-next1/pro-listy'
import { ref, shallowRef } from 'vue'

interface User {
  id: string
  name: string
  group: string
}

const items = shallowRef<User[]>([])
const loading = ref(false)
const hasMore = ref(true)
// const listRef = useTemplateRef('listRef')
const TOTAL_ITEMS = 120
function generateUsers(count: number, start = 0) {
  return Array.from({ length: count }, (_, i) => ({
    id: `user-${start + i}`,
    name: `User Name ${start + i}`,
    group: `Group ${Math.floor((start + i) / 30)}`,
  }))
}
function loadData() {
  if (loading.value || !hasMore.value)
    return
  loading.value = true
  setTimeout(() => {
    const currentLength = items.value.length
    const newData = generateUsers(30, currentLength)
    items.value = items.value.concat(newData)
    if (items.value.length + newData.length >= TOTAL_ITEMS) {
      hasMore.value = false
    }
    loading.value = false
  }, 800)
}
loadData()
function handleScrollToTop() {
  // return listRef.value?.scrollToTop({ behavior: 'smooth' })
}
function handleScrollToEnd() {
  // return listRef.value?.scrollToEnd({ behavior: 'smooth' })
}
</script>

<template>
  <div :style="{ padding: '24px', maxWidth: '700px', margin: 'auto' }">
    <a-space :style="{ marginBottom: '16px' }">
      <a-button type="primary" @click="handleScrollToTop">
        Scroll to Top
      </a-button>
      <a-button type="primary" @click="handleScrollToEnd">
        Scroll to End
      </a-button>
    </a-space>
    <ProListy
      :items="items"
      :height="300"
      row-key="id"
      sticky
      :group="{
        key: (item) => item.group,
        title: ({ name }) => name,
      }"
      @end-reached="loadData"
    >
      <!-- group-by="group" -->

      <!--  -->
      <template #itemRender="{ item, index }">
        <ProListyItem :key="item.id || index">
          {{ item.name }}
        </ProListyItem>
      </template>
      <!-- <template #groupRender="{ name }">
        <a-divider
          orientation="horizontal"
          :style="{ margin: 0, padding: '8px 16px', background: '#f9f9f9' }"
        >
          {{ name }}
        </a-divider>
      </template> -->
      <!-- <template #footer>
        <div v-if="loading" :style="{ padding: '20px', textAlign: 'center' }">
          <a-spin />
        </div>
        <div v-else-if="!hasMore" :style="{ padding: '20px', textAlign: 'center', color: '#aaa' }">
          — No more data —
        </div>
        <div v-else :style="{ padding: '20px', textAlign: 'center' }">
          <a-button @click="loadData">
            Load More
          </a-button>
        </div>
      </template>
      <template #emptyRender>
        <a-empty description="No data available" />
      </template> -->
    </ProListy>
  </div>
</template>

<style scoped></style>

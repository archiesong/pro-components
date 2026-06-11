<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useCopyCode } from '@/components/code-demo/copy-code'
import BaseConfig from './layouts/base/index.vue'

const route = useRoute()
useCopyCode()
</script>

<template>
  <BaseConfig v-if="!route.path.startsWith('/~demos')">
    <router-view />
  </BaseConfig>
  <router-view v-else />
</template>

<style>
#app {
  width: 100%;
  height: 100%;
}
</style>

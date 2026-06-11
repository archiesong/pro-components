<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  src?: string | null
  isLight?: boolean
}>()

const currentSrc = computed(() => props.src)
</script>

<template>
  <Transition name="antdv-theme-background-image-fade" mode="out-in">
    <picture v-if="currentSrc" :key="currentSrc" class="antdv-theme-background-picture">
      <img
        draggable="false"
        class="antdv-theme-background-image"
        :src="currentSrc"
        alt="bg"
      >
    </picture>
  </Transition>
</template>

<style>
.antdv-theme-background-picture {
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
}

.antdv-theme-background-image {
  transition: all var(--ant-motion-duration-slow);
  position: absolute;
  inset-inline-start: 0;
  top: 0;
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: right top;
  z-index: -1;
}

.antdv-theme-background-image-fade-enter-active,
.antdv-theme-background-image-fade-leave-active {
  transition: opacity 0.5s ease;
}

.antdv-theme-background-image-fade-enter-from,
.antdv-theme-background-image-fade-leave-to {
  opacity: 0;
}
</style>

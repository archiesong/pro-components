<script setup lang="ts">
import type { TiltOptions } from 'vanilla-tilt'
import { onMounted, onUnmounted, ref } from 'vue'

interface Props {
  options?: TiltOptions
}

const props = withDefaults(defineProps<Props>(), {
  options: () => ({}),
})

// https://micku7zu.github.io/vanilla-tilt.js/index.html
const defaultTiltOptions: TiltOptions = {
  'scale': 1.02,
  'max': 8,
  'speed': 1500,
  'glare': true,
  'max-glare': 0.8,
}

const tiltRef = ref<HTMLElement | null>(null)
let vanillaTiltInstance: any = null

onMounted(async () => {
  if (tiltRef.value) {
    // 动态导入 vanilla-tilt
    const VanillaTilt = await import('vanilla-tilt').then(m => m.default)
    VanillaTilt.init(tiltRef.value, {
      ...defaultTiltOptions,
      ...props.options,
    })
    vanillaTiltInstance = tiltRef.value
  }
})

onUnmounted(() => {
  if (vanillaTiltInstance && vanillaTiltInstance.vanillaTilt) {
    vanillaTiltInstance.vanillaTilt.destroy()
  }
})
</script>

<template>
  <div ref="tiltRef">
    <slot />
  </div>
</template>

<style scoped>

</style>

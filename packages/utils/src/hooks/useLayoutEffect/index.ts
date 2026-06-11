import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

type CleanupFunction = () => void

type EffectCallback = () => void | CleanupFunction

export function useLayoutEffect(effect: EffectCallback, dependencies?: readonly unknown[]) {
  const cleanupRef = ref<CleanupFunction | void>()

  const executeEffect = () => {
    // 判断下一次执行副作用前还有没有清理函数没有执行
    if (cleanupRef.value) {
      cleanupRef.value()
    }
    // 执行副作用，并赋值清理函数
    cleanupRef.value = effect()
  }
  onMounted(() => {
    executeEffect()
  })

  if (dependencies && dependencies.length > 0) {
    watch(dependencies, executeEffect, { flush: 'post', deep: false })
  }

  onBeforeUnmount(() => {
    if (cleanupRef.value) {
      cleanupRef.value()
    }
  })
}

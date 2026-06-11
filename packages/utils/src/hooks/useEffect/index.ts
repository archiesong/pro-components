import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

type CleanupFunction = () => void

export type EffectCallback = () => void | CleanupFunction

export function useEffect(effect: EffectCallback, dependencies?: readonly unknown[]): void {
  const cleanupRef = ref<CleanupFunction | void>()
  const executeEffect = async () => {
    // 判断下一次执行副作用前还有没有清理函数没有执行
    if (cleanupRef.value) {
      cleanupRef.value()
    }
    // 2. 等待 DOM 渲染完成（异步）
    await nextTick()

    // 执行副作用，并赋值清理函数
    cleanupRef.value = effect()
  }
  // 组件挂载的时候执行一次副作用
  onMounted(executeEffect)
  // 判断有没有传依赖项，有的话就watch监听
  if (dependencies && dependencies.length > 0) {
    watch(dependencies, executeEffect)
  }
  // 组件销毁的使用如果有清理函数就执行清理函数
  onBeforeUnmount(() => {
    if (cleanupRef.value) {
      cleanupRef.value()
    }
  })
}

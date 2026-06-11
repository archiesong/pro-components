import { onUnmounted, ref } from 'vue'
/**
 * 一个去抖的 hook，传入一个 function，返回一个去抖后的 function
 * @param fn
 * @param wait
 */
export function useDebounceFn<T extends any[], U = any>(fn: (...args: T) => Promise<any>, wait?: number) {
  const timer = ref<NodeJS.Timeout | null>(null)

  const cancel = () => {
    if (timer.value !== null) {
      clearTimeout(timer.value)
      timer.value = null
    }
  }

  const run = async (...args: T): Promise<U | undefined> => {
    if (wait === 0 || wait === undefined) {
      return fn(...args)
    }
    cancel()
    return new Promise<U>((resolve) => {
      timer.value = setTimeout(async () => {
        resolve(await fn(...args))
      }, wait)
    })
  }

  onUnmounted(() => {
    cancel()
  })

  return {
    run,
    cancel,
  }
}

import type { Ref } from 'vue'
import { ref } from 'vue'
import { useEffect } from '../useEffect'
import { useState } from '../useState'

/**
 * 一个去抖的setState 减少更新的频率
 * @param value
 * @param delay
 * @param deps
 */
export function useDebounceValue<T>(value: T, delay: number = 100, deps?: readonly unknown[]): Ref<T> {
  const [debouncedValue, setDebouncedValue] = useState(value)
  const valueRef = ref(value)

  useEffect(
    () => {
      const handler = setTimeout(() => setDebouncedValue(valueRef.value), delay)

      return () => clearTimeout(handler)
    },
    deps ? [() => delay, ...deps] : undefined,
  )

  return debouncedValue
}

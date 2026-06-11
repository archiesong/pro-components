import type { Ref } from 'vue'
import { ref, watch } from 'vue'

export function usePrevious<T>(state: Ref<T>): Ref<T | undefined> {
  const previous = ref<T>()
  watch(
    state,
    (_, oldValue) => {
      previous.value = oldValue
    },
    { immediate: false },
  )
  return previous
}

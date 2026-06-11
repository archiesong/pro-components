import { ref } from 'vue'

export function useRefFunction<T extends (...args: any) => any>(reFunction: T) {
  const refValue = ref<any>(null)
  refValue.value = reFunction
  return (...rest: Parameters<T>): ReturnType<T> => {
    return refValue.value?.(...(rest as any))
  }
}

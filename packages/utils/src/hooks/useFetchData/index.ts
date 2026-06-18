import type { Ref } from 'vue'
import type { Key } from '../../typing'
import useSWRV from 'swrv'
import { ref, shallowRef } from 'vue'
import { stringify } from '../../stringify'
import { useState } from '../useState'

let testId = 0

export type ProRequestData<T, U = Record<string, any>> = (params: U, props: any) => Promise<T>

export function useFetchData<T, U = Record<string, any>>(props: {
  proFieldKey?: Ref<Key>
  params: Ref<U | undefined>
  request?: ProRequestData<T, U>
}): [Ref<T | undefined>, Ref<boolean>] {
  const abortRef = shallowRef<AbortController | null>(null)
  /** Key 是用来缓存请求的，如果不在是有问题 */
  const [cacheKey] = useState(() => {
    if (props.proFieldKey?.value) {
      return props.proFieldKey.value.toString()
    }
    testId += 1
    return testId.toString()
  })

  const fetchData = async () => {
    abortRef.value?.abort()
    const abort = new AbortController()
    abortRef.value = abort
    try {
      if (!props.request) {
        return undefined
      }
      return await props.request(props.params?.value as U, abort.signal)
    }
    catch (error: any) {
      if (error.name === 'AbortError') {
        return undefined
      }
      throw error
    }
  }
  const { data, isValidating } = useSWRV(
    () => props.request ? `${cacheKey.value}-${stringify(props.params?.value)}` : null,
    fetchData,
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    },
  )
  // 如果没有请求，返回 [undefined, false]
  if (!props.request) {
    return [ref(undefined), ref(false)]
  }
  return [data, isValidating]
}

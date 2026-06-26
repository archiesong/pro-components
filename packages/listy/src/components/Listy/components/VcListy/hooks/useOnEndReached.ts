import { shallowRef } from 'vue'

interface UseOnEndReachedParams {
  enabled: boolean
  onEndReached?: () => void
}

export function useOnEndReached(params: UseOnEndReachedParams) {
  const { enabled, onEndReached } = params
  const lastTriggeredScrollHeightRef = shallowRef<number | null>(null)

  const onScroll = (e: Event) => {
    if (!enabled) {
      lastTriggeredScrollHeightRef.value = null
      return
    }
    const target = e.currentTarget as HTMLElement
    const { scrollTop, clientHeight, scrollHeight } = target
    const distanceToBottom = scrollHeight - (scrollTop + clientHeight)

    if (distanceToBottom <= 0) {
      if (lastTriggeredScrollHeightRef.value !== scrollHeight) {
        onEndReached?.()
        lastTriggeredScrollHeightRef.value = scrollHeight
      }
    }
  }

  return onScroll
}

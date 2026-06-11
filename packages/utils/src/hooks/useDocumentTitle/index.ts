import type { ComputedRef } from 'vue'
import { computed } from 'vue'
import { isBrowser } from '../../isBrowser'
import { useEffect } from '../useEffect'

export function useDocumentTitle(titleInfo: ComputedRef<{
  title: string
  id: string
  pageName?: string
}>, appDefaultTitle: ComputedRef<string | false>) {
  const titleText = computed(() =>
    typeof titleInfo.value.pageName === 'string' ? titleInfo.value.title : appDefaultTitle.value,
  )
  useEffect(() => {
    if (isBrowser() && titleText.value) {
      document.title = titleText.value
    }
  }, [() => titleInfo.value.title, () => titleText.value])
}

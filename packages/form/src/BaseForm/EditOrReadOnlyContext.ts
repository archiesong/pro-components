import type { ProFieldFCMode } from '@antdv-next1/pro-provider'
import type { ComputedRef, InjectionKey } from 'vue'
import { computed, inject, provide } from 'vue'

export const editOrReadOnlyContextKey: InjectionKey<{
  mode: ComputedRef<ProFieldFCMode>
}> = Symbol('editOrReadOnlyContext')

export function useEditOrReadOnlyContextProvider(props: {
  mode: ComputedRef<'edit' | 'read' | 'update'>
}) {
  return provide(editOrReadOnlyContextKey, props)
}

export function useEditOrReadOnlyContextInject() {
  return inject(editOrReadOnlyContextKey, {
    mode: computed(() => 'edit' as ProFieldFCMode),
  })
}

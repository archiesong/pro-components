import type { VueNode } from '@antdv-next1/pro-utils'
import type { NamePath } from 'antdv-next/dist/form/types'
import type { ComputedRef, InjectionKey } from 'vue'
import { computed, inject, provide } from 'vue'

export const formItemContextKey: InjectionKey<
  ComputedRef<{
    name?: NamePath
    label?: VueNode
  }>
> = Symbol('formItemContext')

export function useFormItemContextProvider(props: ComputedRef<{
  name?: NamePath
  label?: VueNode
}>) {
  return provide(formItemContextKey, props)
}

export function useFormItemContextInject() {
  return inject(
    formItemContextKey,
    computed(
      () =>
        ({}) as {
          name?: NamePath
          label?: VueNode
        },
    ),
  )
}

import type { InjectionKey } from 'vue'
import type { InternalNamePath } from './interface'
import { inject, provide } from 'vue'

export interface ListContextProps {
  getKey: (namePath: InternalNamePath) => [InternalNamePath[number], InternalNamePath]
}

export const formListContextKey: InjectionKey<
  ListContextProps
> = Symbol('formListContext')

export function useFormListContextProvider(props:
ListContextProps) {
  return provide(formListContextKey, props)
}

export function useFormListContextInject() {
  return inject(
    formListContextKey,
    null as unknown as ListContextProps,
  )
}

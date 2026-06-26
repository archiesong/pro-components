import type { FormInstance } from 'antdv-next'
import type { ComputedRef, InjectionKey } from 'vue'
import type { InternalNamePath } from './interface'
import { inject, provide } from 'vue'

export interface FieldContextProps /* @vue-ignore */ extends FormInstance {
  prefixName?: ComputedRef<InternalNamePath>
  el?: HTMLFormElement
  initialValue: any[]
}

export const formFieldContextKey: InjectionKey<
  FieldContextProps
> = Symbol('formFieldContext')

export function useFormFieldContextProvider(props:
FieldContextProps) {
  return provide(formFieldContextKey, props)
}

export function useFormFieldContextInject() {
  return inject(
    formFieldContextKey,
    ({}) as FieldContextProps,
  )
}

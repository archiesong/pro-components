import type { FormListFieldData } from '@antdv-next/pro-utils'
import type { NamePath } from 'antdv-next/dist/form/types'
import type { InjectionKey, ToRefs } from 'vue'
import { inject, provide } from 'vue'

export type FormListContextProps
  = | (FormListFieldData & {
    listName?: NamePath<string | number | boolean>
  })
  | Record<string, any>

export const formListContextKey: InjectionKey<ToRefs<FormListContextProps>>
  = Symbol('formListContext')

export function useFormListContextProvider(props: ToRefs<FormListContextProps>) {
  return provide(formListContextKey, props)
}

export function useFormListContextInject() {
  return inject(formListContextKey, {} as ToRefs<FormListContextProps>)
}

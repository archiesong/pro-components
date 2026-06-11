import type { InjectionKey, ShallowRef } from 'vue'
import type { ActionType } from '../../typing'
import { inject, provide, shallowRef } from 'vue'

export const editableTableActionContextKey
  = Symbol('editableTableActionContext')

export function useEditableTableActionContextProvider<T extends Record<string, any> = Record<string, any>, U = Record<string, any>>(props: ShallowRef<ActionType<T, U> | undefined>) {
  return provide(editableTableActionContextKey as InjectionKey<ShallowRef<ActionType<T, U> | undefined>>, props)
}

export function useEditableTableActionContextInject<T extends Record<string, any> = Record<string, any>, U = Record<string, any>>() {
  return inject(editableTableActionContextKey as InjectionKey<ShallowRef<ActionType<T, U> | undefined>>, shallowRef(undefined))
}

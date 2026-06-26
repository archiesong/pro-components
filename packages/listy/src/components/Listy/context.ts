import type { InjectionKey, ToRefs } from 'vue'
import type { ListyGridType, ListyItemLayout } from './typing'
import { inject, provide } from 'vue'

export interface ListyContextConsumerProps {
  grid?: ListyGridType
  itemLayout?: ListyItemLayout
}

export const ListyContextKey: InjectionKey<ToRefs<ListyContextConsumerProps>> = Symbol('ListyContextKey')

export function useListyContextProvider(value: ToRefs<ListyContextConsumerProps>) {
  provide(ListyContextKey, value)
}
export function useListyContext() {
  return inject(ListyContextKey, {} as ToRefs<ListyContextConsumerProps>)
}

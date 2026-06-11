import type { InjectionKey, ToRefs } from 'vue'
import type { ProListyGridType } from './typing'
import { inject, provide } from 'vue'

export interface ProListyContextConsumerProps {
  grid?: ProListyGridType
  itemLayout?: string
}

export const ProListyContextKey: InjectionKey<ToRefs<ProListyContextConsumerProps>> = Symbol('ProListyContextKey')

export function useProListyContextProvider(value: ToRefs<ProListyContextConsumerProps>) {
  provide(ProListyContextKey, value)
}
export function useProListyContext() {
  return inject(ProListyContextKey, {} as ToRefs<ProListyContextConsumerProps>)
}

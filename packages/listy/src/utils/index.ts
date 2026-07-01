import type { ShallowRef } from 'vue'
import type { ProListyInstance } from '../typing'
import { useProTableInstanceExpose } from '@antdv-next1/pro-table'

export function useProListyInstanceExpose<T extends Record<string, any>>(listyRef: ShallowRef<ProListyInstance<T> | null>) {
  return {
    ...useProTableInstanceExpose(listyRef),
  }
}

import type { Slots } from 'vue'
import type { VueNode } from '../typing'

export function getSlotVNode<T>(slots: Slots, props: Record<string, unknown>, prop = 'default'): T | false {
  if (props[prop] === false) {
    return false
  }
  return (props[prop] || slots[prop]?.()) as T
}

export function getSlot<T extends Record<string, any>, K extends keyof T>(slots: T, props: Partial<Record<K, T[K] | VueNode>>, prop: K): T[K] | false | undefined {
  if (props[prop] === false) {
    return false
  }
  return (props[prop] || slots[prop]) as T[K] | undefined
}

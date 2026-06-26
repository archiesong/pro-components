import type { VueNode } from '@v-c/util'
import type { VNode } from 'vue'
import { h } from 'vue'

export function transformVueNodeType(vueNode: VueNode | (() => VueNode[])) {
  if (vueNode) {
    if (typeof vueNode === 'function') {
      return h(vueNode)
    }
    if (typeof vueNode === 'string' || typeof vueNode === 'boolean' || typeof vueNode === 'number') {
      return vueNode
    }
    if (Array.isArray(vueNode)) {
      return vueNode.filter(node => node).map((node): VNode | string | number | boolean | undefined | (VNode | string | number | boolean | undefined)[] => {
        return transformVueNodeType(node) as VNode | string | number | boolean | undefined
      }).filter(Boolean)
    }
    return h(vueNode)
  }
  return undefined
}

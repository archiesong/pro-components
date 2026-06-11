import type { VNode } from 'vue'
import { flattenChildren as childrenToArray } from '@v-c/util/dist/props-util'
import { Comment, Fragment, Text } from 'vue'

function isSpecialNode(node: VNode): boolean {
  return node.type === Fragment || node.type === Comment || node.type === Text
}

export { childrenToArray, isSpecialNode }

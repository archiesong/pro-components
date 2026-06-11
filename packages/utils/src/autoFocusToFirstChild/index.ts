import type { VNode } from 'vue'
import { cloneVNode, Fragment, isVNode, Text } from 'vue'
// import { normalizeProps } from '../normalizeProps'
/**
 * 将 autoFocus 应用到第一个子节点；若首个子节点是 Fragment，则递归应用到其第一个子节点，
 * 避免向 Fragment 传入非法 props。
 */
export function autoFocusToFirstChild(
  nodes?: VNode[],
  autoFocus?: boolean,
): VNode[] {
  return (nodes || [])?.map((node, i) => {
    if (!autoFocus || !isVNode(node))
      return node
    if (node.type === Fragment || node.type === Comment || node.type === Text) {
      if (Array.isArray(node.children)) {
        return autoFocusToFirstChild(node.children as VNode<any, any, { autoFocus?: boolean }>[], autoFocus)
      }
      else {
        return node
      }
    }
    // node.props = normalizeProps(node.props || {})
    return i === 0 ? cloneVNode(node, {
      ...node.props,
      autoFocus,
    }) : node
  }) as VNode[]
}

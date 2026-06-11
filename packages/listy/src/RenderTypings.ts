import type { VueNode } from '@v-c/util'

export type ItemRender<T> = (options: { item: T, index: number }) => VueNode

import type { VueNode } from 'antdv-next/dist/_util/type'

export interface AppItemProps {
  title: VueNode
  desc?: VueNode
  icon?: VueNode
  url?: string
  target?: string
  children?: Omit<AppItemProps, 'children'>[]
}

export type AppListProps = AppItemProps[]

import type { FunctionalComponent } from 'vue'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@antdv-next/icons'

const CollapsedIcon: FunctionalComponent<{
  collapsed: boolean
  tabIndex?: number
}> = ({ collapsed, tabIndex }) =>
  collapsed ? <MenuUnfoldOutlined tabIndex={tabIndex} /> : <MenuFoldOutlined tabIndex={tabIndex} />

export default CollapsedIcon

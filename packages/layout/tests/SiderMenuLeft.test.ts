import type { MenuDataItem } from '../src/typing'
import { describe, expect, it } from 'vitest'
import { defineComponent, isVNode } from 'vue'
import {
  getLeftMenuItemTitle,
  getLeftMenuSelectedItem,
  getLeftSiderWidth,
  renderLeftMenuIcon,
} from '../src/components/SiderMenu/leftMenu'

describe('left layout menu selection', () => {
  const menuData: MenuDataItem[] = [
    {
      path: '/dashboard',
      key: 'dashboard',
      meta: { title: '分析页' },
      children: [
        {
          path: '/dashboard/workbench',
          key: 'workbench',
          meta: { title: '工作台' },
        },
      ],
    },
    {
      path: '/system',
      key: 'system',
      meta: { title: '系统管理' },
      children: [
        {
          path: '/system/user',
          key: 'user',
          meta: { title: '用户管理' },
        },
      ],
    },
  ]

  it('selects the top-level menu that owns the matched child key', () => {
    expect(getLeftMenuSelectedItem(menuData, ['dashboard', 'workbench'])?.key).toBe('dashboard')
    expect(getLeftMenuSelectedItem(menuData, ['system', 'user'])?.key).toBe('system')
  })

  it('prefers the active top-level menu key over route matched keys', () => {
    expect(getLeftMenuSelectedItem(menuData, ['dashboard', 'workbench'], 'system')?.key).toBe('system')
  })

  it('falls back to the first top-level menu when no matched key exists', () => {
    expect(getLeftMenuSelectedItem(menuData, [])?.key).toBe('dashboard')
  })

  it('calculates left sider width from sub menu visibility and pin state', () => {
    expect(getLeftSiderWidth({ hasSubMenu: false, subMenuFixed: true, subMenuCollapsed: false })).toBe(80)
    expect(getLeftSiderWidth({ hasSubMenu: true, subMenuFixed: true, subMenuCollapsed: false })).toBe(320)
    expect(getLeftSiderWidth({ hasSubMenu: true, subMenuFixed: true, subMenuCollapsed: true })).toBe(144)
    expect(getLeftSiderWidth({ hasSubMenu: true, subMenuFixed: false, subMenuCollapsed: false })).toBe(80)
  })

  it('falls back to a stable string title when route meta title is absent', () => {
    expect(getLeftMenuItemTitle({ path: '/dashboard', name: 'Dashboard' })).toBe('Dashboard')
    expect(getLeftMenuItemTitle({ path: '/system', name: { label: '系统' } })).toBe('/system')
  })

  it('renders Vue component icons as vnode instead of object text', () => {
    const Icon = defineComponent(() => () => 'icon')

    expect(isVNode(renderLeftMenuIcon(Icon))).toBe(true)
  })
})

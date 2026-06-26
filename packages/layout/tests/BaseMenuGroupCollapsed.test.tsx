import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { defineComponent, h, ref } from 'vue'
import BaseMenu from '../src/components/SiderMenu/BaseMenu'

const capturedMenuItems = vi.hoisted(() => ({
  value: [] as Array<{ key?: string, type?: string }>,
}))

vi.mock('../src/components/SiderMenu/style/menu', () => ({
  useStyle: () => ({
    hashId: ref('base-menu-test-hash'),
    wrapSSR: (node: unknown) => node,
  }),
}))

vi.mock('antdv-next', () => {
  const Menu = defineComponent({
    props: ['items'],
    setup(props) {
      return () => {
        capturedMenuItems.value = props.items || []
        return h('ul')
      }
    },
  })
  const Skeleton = defineComponent(() => () => h('div', { class: 'mock-skeleton' }))

  return {
    Menu,
    Skeleton,
    theme: {
      getDesignToken: () => ({}),
    },
  }
})

describe('BaseMenu collapsed group rendering', () => {
  it('ignores legacy collapsedShowGroupTitle and flattens collapsed group menus', () => {
    mount(BaseMenu, {
      global: {
        components: {
          RouterLink: defineComponent((_, { slots }) => () => h('a', slots.default?.())),
        },
      },
      props: {
        prefixCls: 'ant-pro',
        mode: 'inline',
        layout: 'side',
        collapsed: true,
        menu: {
          type: 'group',
          collapsedShowGroupTitle: true,
        },
        menuData: [
          {
            path: '/system',
            key: 'system',
            meta: { title: 'System' },
            children: [
              {
                path: '/system/user',
                key: 'user',
                meta: { title: 'User' },
              },
            ],
          },
        ],
      },
    })

    expect(capturedMenuItems.value.map(item => item.key)).toEqual(['user'])
    expect(capturedMenuItems.value.some(item => item.type === 'group')).toBe(false)
    expect(capturedMenuItems.value.some(item => item.type === 'divider')).toBe(false)
  })
})

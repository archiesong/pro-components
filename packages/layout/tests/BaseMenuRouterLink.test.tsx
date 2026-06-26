import type { App } from 'vue'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { defineComponent, h, ref } from 'vue'
import BaseMenu from '../src/components/SiderMenu/BaseMenu'

const renderedLabels = vi.hoisted(() => ({
  value: [] as string[],
}))
const capturedItems = vi.hoisted(() => ({
  value: [] as Array<{ onClick?: () => void, label?: unknown }>,
}))
const capturedRouterLinkTo = vi.hoisted(() => ({
  value: [] as unknown[],
}))

vi.mock('../src/components/SiderMenu/style/menu', () => ({
  useStyle: () => ({
    hashId: ref('base-menu-router-link-test-hash'),
    wrapSSR: (node: unknown) => node,
  }),
}))

vi.mock('antdv-next', () => {
  const Menu = defineComponent({
    props: ['items'],
    setup(props) {
      return () => {
        capturedItems.value = props.items || []
        return h(
          'ul',
          (props.items || []).map((item: any) => h('li', { key: item.key }, [typeof item.label === 'function' ? item.label() : item.label])),
        )
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

const ThrowingRouterLink = defineComponent({
  name: 'RouterLink',
  setup() {
    throw new Error('RouterLink should not render when menuItemRender is provided')
  },
})

const CapturingRouterLink = defineComponent({
  name: 'RouterLink',
  props: ['to'],
  setup(props, { slots }) {
    capturedRouterLinkTo.value.push(props.to)
    return () => h('a', { class: 'mock-router-link' }, slots.default?.())
  },
})

function createRouterPlugin(matched: boolean) {
  return {
    install(app: App) {
      app.config.globalProperties.$router = {
        resolve: vi.fn(() => ({
          matched: matched ? [{}] : [],
        })),
      }
    },
  }
}

describe('BaseMenu custom menu item rendering', () => {
  beforeEach(() => {
    renderedLabels.value = []
    capturedItems.value = []
    capturedRouterLinkTo.value = []
  })

  it('does not render RouterLink when menu item handles title click internally', () => {
    const onTitleClick = vi.fn()

    mount(BaseMenu, {
      global: {
        components: {
          RouterLink: ThrowingRouterLink,
        },
      },
      props: {
        prefixCls: 'ant-pro',
        mode: 'horizontal',
        layout: 'mix',
        collapsed: false,
        menuData: [
          {
            path: '/dashboard',
            key: '/dashboard',
            name: 'Dashboard',
            onTitleClick,
            meta: {
              title: '仪表盘',
              locale: 'menu.仪表盘',
            },
          },
        ],
      },
    })

    capturedItems.value[0]?.onClick?.()
    expect(onTitleClick).toHaveBeenCalledTimes(1)
  })

  it('does not render default RouterLink when menuItemRender is provided', () => {
    mount(BaseMenu, {
      global: {
        components: {
          RouterLink: ThrowingRouterLink,
        },
      },
      props: {
        prefixCls: 'ant-pro',
        mode: 'horizontal',
        layout: 'mix',
        collapsed: false,
        menuItemRender: ({ item, dom }) => {
          renderedLabels.value.push(item.itemPath)
          return h('button', { class: 'custom-menu-item' }, [dom])
        },
        menuData: [
          {
            path: '/dashboard',
            key: '/dashboard',
            name: 'Dashboard',
            meta: {
              title: '仪表盘',
              locale: 'menu.仪表盘',
            },
          },
        ],
      },
    })

    expect(renderedLabels.value).toEqual(['/dashboard'])
  })

  it('does not render RouterLink when router cannot resolve the menu path', () => {
    mount(BaseMenu, {
      global: {
        components: {
          RouterLink: ThrowingRouterLink,
        },
        plugins: [createRouterPlugin(false)],
      },
      props: {
        prefixCls: 'ant-pro',
        mode: 'inline',
        layout: 'side',
        collapsed: false,
        menuData: [
          {
            path: '/unregistered',
            key: '/unregistered',
            name: 'Unregistered',
            meta: {
              title: '未注册菜单',
            },
          },
        ],
      },
    })

    expect(capturedItems.value).toHaveLength(1)
  })

  it('renders RouterLink with normalized path when router can resolve the menu path', () => {
    mount(BaseMenu, {
      global: {
        components: {
          RouterLink: CapturingRouterLink,
        },
        plugins: [createRouterPlugin(true)],
      },
      props: {
        prefixCls: 'ant-pro',
        mode: 'inline',
        layout: 'side',
        collapsed: false,
        menuData: [
          {
            path: 'dashboard',
            key: 'dashboard',
            name: 'Dashboard',
            meta: {
              title: '仪表盘',
            },
          },
        ],
      },
    })

    expect(capturedRouterLinkTo.value).toEqual(['/dashboard'])
  })

  it('renders anchor for external or target menu items', () => {
    const wrapper = mount(BaseMenu, {
      global: {
        components: {
          RouterLink: ThrowingRouterLink,
        },
      },
      props: {
        prefixCls: 'ant-pro',
        mode: 'inline',
        layout: 'side',
        collapsed: false,
        menuData: [
          {
            path: 'https://example.com',
            key: 'external',
            meta: {
              title: '外部链接',
              target: '_blank',
            },
          },
        ],
      },
    })

    const link = wrapper.find('a')
    expect(link.attributes('href')).toBe('https://example.com')
    expect(link.attributes('target')).toBe('_blank')
  })
})

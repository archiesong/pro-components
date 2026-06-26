import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { defineComponent, h, ref } from 'vue'
import SiderMenu from '../src/components/SiderMenu/SiderMenu'

vi.mock('../src/components/SiderMenu/style/stylish', async () => {
  return {
    useStylish: () => ({
      wrapSSR: (node: any) => node,
    }),
  }
})

vi.mock('../src/components/SiderMenu/style/menu', async () => {
  return {
    useStyle: () => ({
      hashId: ref('layout-test-hash'),
      wrapSSR: (node: any) => node,
    }),
  }
})

vi.mock('antdv-next', async () => {
  const LayoutSider = defineComponent({
    props: ['theme', 'width'],
    setup(_, { slots, attrs }) {
      return () => h('aside', { ...attrs, 'data-theme': _.theme }, slots.default?.())
    },
  })
  const Menu = defineComponent({
    props: ['items', 'theme', 'mode'],
    setup(props, { attrs }) {
      return () =>
        h(
          'ul',
          { ...attrs, 'data-theme': props.theme, 'data-mode': props.mode },
          (props.items || []).map((item: any) =>
            h('li', { class: 'ant-menu-item', key: item.key }, [
              typeof item.icon === 'function' ? item.icon() : item.icon,
              item.label,
            ]),
          ),
        )
    },
  })
  const Space = defineComponent((_, { slots, attrs }) => () => h('div', attrs, slots.default?.()))
  const Avatar = defineComponent((_, { attrs }) => () => h('span', attrs))

  return {
    Avatar,
    LayoutSider,
    Menu,
    Space,
    theme: {
      getDesignToken: () => ({
        colorPrimary: '#1677ff',
      }),
    },
  }
})

const baseProps = {
  prefixCls: 'ant-pro',
  layout: 'left' as const,
  isMobile: false,
  siderWidth: 80,
  menuData: [
    {
      path: '/dashboard',
      key: 'dashboard',
      meta: { title: '仪表盘' },
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
  ],
}

describe('SiderMenu left layout rendering', () => {
  it('does not render secondary menu when selected primary menu has no children', () => {
    const wrapper = mount(SiderMenu, {
      props: {
        ...baseProps,
        matchMenuKeys: ['dashboard'],
      },
    })

    expect(wrapper.find('.ant-pro-sider-left-sub').exists()).toBe(false)
  })

  it('uses menuItemRender for leaf primary menu items', async () => {
    const onClick = vi.fn()
    const wrapper = mount(SiderMenu, {
      props: {
        ...baseProps,
        matchMenuKeys: ['dashboard'],
        menuItemRender: ({ dom }) => h('div', { class: 'custom-leaf-link', onClick }, [dom]),
      },
    })

    await wrapper.find('.custom-leaf-link').trigger('click')

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('does not collapse secondary menu when secondary menu is unfixed', () => {
    const wrapper = mount(SiderMenu, {
      props: {
        ...baseProps,
        matchMenuKeys: ['system', 'user'],
        leftSubMenuCollapsed: true,
        leftSubMenuFixed: false,
      },
    })

    expect(wrapper.find('.ant-pro-sider-left-sub').exists()).toBe(true)
    expect(wrapper.find('.ant-pro-sider-left-layout-sub-collapsed').exists()).toBe(false)
    expect(wrapper.find('.ant-pro-sider-left-layout-sub-unfixed').exists()).toBe(true)
    expect(wrapper.find('.ant-pro-sider-left-title').exists()).toBe(true)
    expect(wrapper.find('.ant-pro-sider-left-sub-menu').attributes('data-mode')).toBe('inline')
    expect(wrapper.find('[aria-label="展开二级菜单"]').exists()).toBe(false)
    expect(wrapper.find('[aria-label="折叠二级菜单"]').exists()).toBe(false)
    expect(wrapper.find('[aria-label="固定二级菜单"]').exists()).toBe(true)
    expect(wrapper.find('[aria-label="取消固定二级菜单"]').exists()).toBe(false)
  })

  it('hides secondary pin action when fixed secondary menu is collapsed', () => {
    const wrapper = mount(SiderMenu, {
      props: {
        ...baseProps,
        matchMenuKeys: ['system', 'user'],
        leftSubMenuCollapsed: true,
        leftSubMenuFixed: true,
      },
    })

    expect(wrapper.find('.ant-pro-sider-left-layout-sub-collapsed').exists()).toBe(true)
    expect(wrapper.find('.ant-pro-sider-left-title').exists()).toBe(false)
    expect(wrapper.find('[aria-label="展开二级菜单"]').exists()).toBe(true)
    expect(wrapper.find('[aria-label="固定二级菜单"]').exists()).toBe(false)
    expect(wrapper.find('[aria-label="取消固定二级菜单"]').exists()).toBe(false)
  })

  it('renders secondary collapse and pin actions when fixed secondary menu is expanded', () => {
    const wrapper = mount(SiderMenu, {
      props: {
        ...baseProps,
        matchMenuKeys: ['system', 'user'],
        leftSubMenuCollapsed: false,
        leftSubMenuFixed: true,
      },
    })

    expect(wrapper.find('[aria-label="折叠二级菜单"]').exists()).toBe(true)
    expect(wrapper.find('[aria-label="取消固定二级菜单"]').exists()).toBe(true)
    expect(wrapper.find('.ant-pro-sider-left-title').exists()).toBe(true)
  })

  it('uses dark primary rail and light secondary menu for dark menu theme', () => {
    const wrapper = mount(SiderMenu, {
      props: {
        ...baseProps,
        navTheme: 'dark',
        matchMenuKeys: ['system', 'user'],
      },
    })

    expect(wrapper.find('aside').attributes('data-theme')).toBe('dark')
    expect(wrapper.find('aside').classes()).toContain('ant-pro-sider-dark')
    expect(wrapper.find('.ant-pro-sider-left-sub-menu').attributes('data-theme')).toBe('light')
  })

  it('uses light primary rail and light secondary menu for light menu theme', () => {
    const wrapper = mount(SiderMenu, {
      props: {
        ...baseProps,
        navTheme: 'light',
        matchMenuKeys: ['system', 'user'],
      },
    })

    expect(wrapper.find('aside').attributes('data-theme')).toBe('light')
    expect(wrapper.find('aside').classes()).toContain('ant-pro-sider-light')
    expect(wrapper.find('.ant-pro-sider-left-sub-menu').attributes('data-theme')).toBe('light')
  })
})

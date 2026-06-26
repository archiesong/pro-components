import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { defineComponent, h, ref } from 'vue'
import Header from '../src/components/Header'

vi.mock('@antdv-next1/pro-provider', () => ({
  useProConfig: () => ref({
    token: {
      layout: {
        header: {
          heightLayoutHeader: 56,
        },
      },
    },
  }),
}))

vi.mock('../src/components/Header/style/header', () => ({
  useStyle: () => ({
    hashId: ref('layout-header-test-hash'),
    wrapSSR: (node: any) => node,
  }),
}))

vi.mock('../src/components/Header/style/stylish', () => ({
  useStylish: () => ({
    wrapSSR: (node: any) => node,
  }),
}))

vi.mock('../src/components/GlobalHeader', () => ({
  default: defineComponent((_, { attrs }) => () => h('div', { class: 'mock-global-header', ...attrs })),
}))

vi.mock('../src/components/TopNavHeader', () => ({
  default: defineComponent(() => () => h('div', { class: 'mock-top-nav-header' })),
}))

vi.mock('antdv-next', () => ({
  LayoutHeader: defineComponent((_, { attrs, slots }) => () => h('header', attrs, slots.default?.())),
}))

describe('Header left layout rendering', () => {
  it('renders a header for desktop left layout', () => {
    const wrapper = mount(Header, {
      props: {
        prefixCls: 'ant-pro',
        layout: 'left',
        isMobile: false,
        hasSiderMenu: true,
        siderWidth: 320,
      },
    })

    expect(wrapper.find('.ant-pro-layout-header').exists()).toBe(true)
    expect(wrapper.find('.mock-global-header').exists()).toBe(true)
  })

  it('uses left fixed header width instead of default sider width', () => {
    const wrapper = mount(Header, {
      props: {
        prefixCls: 'ant-pro',
        layout: 'left',
        fixedHeader: true,
        isMobile: false,
        hasSiderMenu: true,
        siderWidth: 256,
        fixedHeaderSiderWidth: 80,
      },
    })

    expect(wrapper.find('.ant-pro-layout-header').attributes('style')).toContain('width: calc(100% - 80px)')
  })
})

import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { defineComponent, h, ref } from 'vue'
import LeftLayout from '../src/layouts/LeftLayout'

vi.mock('@antdv-next1/pro-provider', () => ({
  useProConfig: () => ref({
    token: {
      layout: {
        pageContainer: {
          paddingBlockPageContainerContent: 24,
        },
      },
    },
  }),
}))

vi.mock('../src/style', () => ({
  useStyle: () => ({
    hashId: ref('layout-test-hash'),
    wrapSSR: (node: any) => node,
  }),
}))

vi.mock('antdv-next/dist/config-provider/context', () => ({
  useConfig: () => ref({
    getPrefixCls: (suffix?: string) => suffix ? `ant-${suffix}` : 'ant',
    getPopupContainer: undefined,
  }),
}))

vi.mock('@antdv-next1/pro-utils', async () => {
  const actual = await vi.importActual<any>('@antdv-next1/pro-utils')
  return {
    ...actual,
    useBreakpoint: () => ref('lg'),
    useDocumentTitle: vi.fn(),
  }
})

vi.mock('../src/components/Header', () => ({
  default: defineComponent((_, { attrs }) => () =>
    h('div', {
      class: 'mock-layout-header',
      'data-collapsed': String(attrs.collapsed),
      'data-sider-width': String(attrs.siderWidth),
      'data-fixed-header-sider-width': String(attrs.fixedHeaderSiderWidth),
    })),
}))

vi.mock('../src/components/SiderMenu', () => ({
  default: defineComponent((_, { attrs }) => () =>
    h('aside', {
      class: 'mock-layout-sider',
      'data-sider-width': String(attrs.siderWidth),
    })),
}))

vi.mock('../src/WrapContent', () => ({
  default: defineComponent((_, { slots, attrs }) => () => h('main', attrs, slots.default?.())),
}))

vi.mock('../src/components/Footer', () => ({
  default: defineComponent(() => () => h('footer', { class: 'mock-footer' })),
}))

vi.mock('../src/components/PageLoading', () => ({
  default: defineComponent(() => () => h('div', { class: 'mock-page-loading' })),
}))

vi.mock('antdv-next', () => {
  const PassThrough = defineComponent((_, { slots, attrs }) => () => h('div', attrs, slots.default?.()))
  return {
    ConfigProvider: PassThrough,
    Layout: PassThrough,
  }
})

describe('LeftLayout header width', () => {
  it('passes computed left sider width to fixed header', () => {
    const wrapper = mount(LeftLayout, {
      props: {
        prefixCls: 'ant-pro',
        layout: 'left',
        fixedHeader: true,
        location: {
          path: '/system/user',
        },
        route: {
          children: [
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
        },
      },
    })

    expect(wrapper.find('.mock-layout-sider').attributes('data-sider-width')).toBe('320')
    expect(wrapper.find('.mock-layout-header').attributes('data-sider-width')).toBe('320')
    expect(wrapper.find('.mock-layout-header').attributes('data-fixed-header-sider-width')).toBe('320')
    expect(wrapper.find('.mock-layout-header').attributes('data-collapsed')).toBe('false')
  })
})

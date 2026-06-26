import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { defineComponent, h, ref } from 'vue'
import GlobalHeader from '../src/components/GlobalHeader'

const capturedStyles = vi.hoisted(() => ({
  value: [] as unknown[],
}))

const capturedTopNavProps = vi.hoisted(() => ({
  value: {} as Record<string, any>,
}))

vi.mock('@antdv-next1/pro-provider', () => ({
  useProConfig: () => ref({
    hashId: 'global-header-test-hash',
    token: {
      marginXS: 8,
    },
  }),
  useStyle: (_name: string, styleFn: (token: Record<string, any>) => unknown) => {
    capturedStyles.value.push(styleFn({
      antCls: '.ant',
      colorBgContainer: '#fff',
      colorTextHeading: '#111',
      proComponentsCls: '.ant-pro',
      layout: {
        header: {
          heightLayoutHeader: 56,
        },
      },
    }))
    return {
      hashId: ref('global-header-test-hash'),
      wrapSSR: (node: unknown) => node,
    }
  },
}))

vi.mock('@antdv-next1/pro-utils', () => ({
  getSlot: (slots: Record<string, (() => unknown) | undefined>, props: Record<string, unknown>, name: string) => slots[name] || props[name],
}))

vi.mock('antdv-next/dist/config-provider/context', () => ({
  useConfig: () => ref({
    direction: 'ltr',
    getPrefixCls: (suffix?: string) => suffix ? `ant-${suffix}` : 'ant',
  }),
}))

vi.mock('../src/components/AppsLogoComponents', () => ({
  default: defineComponent(() => () => h('span', { class: 'mock-apps-logo' })),
  defaultRenderLogo: () => h('span', { class: 'mock-logo' }),
}))

vi.mock('../src/components/CollapsedIcon', () => ({
  default: defineComponent(() => () => h('span', { class: 'mock-collapsed-icon' })),
}))

vi.mock('../src/components/GlobalHeader/ActionsContent', () => ({
  default: defineComponent(() => () => h('div', { class: 'mock-actions-content' })),
}))

vi.mock('../src/components/SiderMenu/SiderMenu', () => ({
  renderLogoAndTitle: (props: { title?: string }) => h('a', [h('span', { class: 'mock-logo' }), h('h1', props.title || 'Antdv Next Pro')]),
}))

vi.mock('../src/components/TopNavHeader', () => ({
  default: defineComponent((props: Record<string, any>, { attrs }) => {
    return () => {
      capturedTopNavProps.value = {
        ...attrs,
        ...props,
      }
      return h('nav', { class: 'mock-top-nav-header' })
    }
  }),
}))

describe('GlobalHeader mix layout', () => {
  beforeEach(() => {
    capturedStyles.value = []
    capturedTopNavProps.value = {}
  })

  it('uses light title color for dark mix header', () => {
    mount(GlobalHeader, {
      props: {
        prefixCls: 'ant-pro',
        layout: 'mix',
        navTheme: 'dark',
        title: 'Antdv Next Pro',
        isMobile: false,
      },
    })

    expect(JSON.stringify(capturedStyles.value)).toContain('rgba(255,255,255,0.85)')
  })

  it('renders only first-level items and selects first-level key when splitMenus is enabled', () => {
    mount(GlobalHeader, {
      props: {
        prefixCls: 'ant-pro',
        layout: 'mix',
        navTheme: 'dark',
        splitMenus: true,
        isMobile: false,
        selectedKeys: ['user'],
        matchMenuKeys: ['system', 'user'],
        menuData: [
          {
            key: 'system',
            path: '/system',
            meta: { title: 'System' },
            children: [
              {
                key: 'user',
                path: '/system/user',
                meta: { title: 'User' },
              },
            ],
          },
        ],
      },
    })

    expect(capturedTopNavProps.value.menuData).toEqual([
      expect.objectContaining({
        key: 'system',
        path: '/system',
        meta: { title: 'System' },
        children: undefined,
        onTitleClick: expect.any(Function),
      }),
    ])
    expect(capturedTopNavProps.value.selectedKeys).toEqual(['system'])
    expect(capturedTopNavProps.value.splitMenus).toBe(false)
  })
})

import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { defineComponent, h, nextTick, ref } from 'vue'
import BasicLayout from '../src/BasicLayout'

const capturedSiderMenuData = vi.hoisted(() => ({
  value: [] as Array<{ key?: string, path?: string }>,
}))
const capturedHeaderProps = vi.hoisted(() => ({
  value: {} as Record<string, any>,
}))

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

vi.mock('@antdv-next1/pro-utils', async () => {
  const vue = await import('vue')

  return {
    stringify: JSON.stringify,
    isBrowser: () => true,
    omitUndefined: (record: Record<string, unknown>) => Object.fromEntries(Object.entries(record).filter(([, value]) => value !== undefined)),
    getSlot: (slots: Record<string, (() => unknown) | undefined>, props: Record<string, unknown>, name: string) => slots[name] || props[name],
    useBreakpoint: () => vue.ref('lg'),
    useDocumentTitle: () => undefined,
    useEffect: (effect: () => void) => vue.watchEffect(effect),
    useMountMergeState: (defaultValue: unknown | (() => unknown), options: { value?: unknown, onChange?: (value: unknown) => void } = {}) => {
      const state = vue.ref(typeof defaultValue === 'function' ? defaultValue() : defaultValue)
      vue.watchEffect(() => {
        const value = vue.unref(options.value)
        if (value !== undefined) {
          state.value = value
        }
      })
      const setState = (value: unknown) => {
        state.value = value
        options.onChange?.(value)
      }
      return [state, setState]
    },
    useState: (defaultValue: unknown | (() => unknown)) => {
      const state = vue.ref(typeof defaultValue === 'function' ? defaultValue() : defaultValue)
      return [state, (value: unknown) => {
        state.value = value
      }]
    },
  }
})

vi.mock('antdv-next/dist/config-provider/context', () => ({
  useConfig: () => ref({
    getPrefixCls: (suffix?: string) => suffix ? `ant-${suffix}` : 'ant',
    getPopupContainer: undefined,
  }),
}))

vi.mock('antdv-next', () => ({
  ConfigProvider: defineComponent((_, { slots }) => () => h('div', { class: 'mock-config-provider' }, slots.default?.())),
  Layout: defineComponent((_, { attrs, slots }) => () => h('section', attrs, slots.default?.())),
}))

vi.mock('../src/style', () => ({
  useStyle: () => ({
    hashId: ref('basic-layout-mix-test-hash'),
    wrapSSR: (node: unknown) => node,
  }),
}))

vi.mock('../src/components/Header', () => ({
  default: defineComponent((_, { attrs }) => {
    return () => {
      capturedHeaderProps.value = attrs
      return h('header', { class: 'mock-header' })
    }
  }),
}))

vi.mock('../src/components/SiderMenu', () => ({
  default: defineComponent((props: { menuData?: Array<{ key?: string, path?: string }> }) => {
    return () => {
      capturedSiderMenuData.value = props.menuData || []
      return h('aside', { class: 'mock-sider-menu' })
    }
  }),
}))

vi.mock('../src/components/Footer', () => ({
  default: defineComponent(() => () => h('footer', { class: 'mock-footer' })),
}))

vi.mock('../src/components/PageLoading', () => ({
  default: defineComponent(() => () => h('div', { class: 'mock-page-loading' })),
}))

vi.mock('../src/WrapContent', () => ({
  default: defineComponent((_, { slots }) => () => h('main', { class: 'mock-wrap-content' }, slots.default?.())),
}))

describe('BasicLayout mix splitMenus', () => {
  it('uses the matched first-level menu to render the split side menu when selectedKeys is controlled by a child key', () => {
    mount(BasicLayout, {
      props: {
        prefixCls: 'ant-pro',
        layout: 'mix',
        splitMenus: true,
        selectedKeys: ['user'],
        location: {
          path: '/system/user',
        },
        route: {
          children: [
            {
              path: '/dashboard',
              key: 'dashboard',
              meta: { title: 'Dashboard' },
            },
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
      },
    })

    expect(capturedSiderMenuData.value.map(item => item.key || item.path)).toEqual(['user'])
  })

  it('switches split side menu by top first-level menu without route navigation', async () => {
    mount(BasicLayout, {
      props: {
        prefixCls: 'ant-pro',
        layout: 'mix',
        splitMenus: true,
        location: {
          path: '/system/user',
        },
        route: {
          children: [
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
            {
              path: '/reports',
              key: 'reports',
              meta: { title: 'Reports' },
              children: [
                {
                  path: '/reports/summary',
                  key: 'summary',
                  meta: { title: 'Summary' },
                },
              ],
            },
          ],
        },
      },
    })

    expect(capturedSiderMenuData.value.map(item => item.key || item.path)).toEqual(['user'])

    capturedHeaderProps.value.onSplitMenuActiveKeyChange?.('reports')
    await nextTick()

    expect(capturedSiderMenuData.value.map(item => item.key || item.path)).toEqual(['summary'])
  })
})

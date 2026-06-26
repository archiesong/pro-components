import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { defineComponent, h, nextTick, reactive, ref } from 'vue'
import BasicLayout from '../src/BasicLayout'
import { useRouteContext } from '../src/context/RouteContext'
import LeftLayout from '../src/layouts/LeftLayout'

const routeState = reactive({
  path: '/dashboard',
})

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
    hashId: ref('basic-layout-test-hash'),
    wrapSSR: (node: unknown) => node,
  }),
}))

vi.mock('../src/components/Header', () => ({
  default: defineComponent(() => () => h('header', { class: 'mock-header' })),
}))

vi.mock('../src/components/SiderMenu', () => ({
  default: defineComponent((props: { menu?: { loading?: boolean } }) => () => h('aside', {
    class: 'mock-sider-menu',
    'data-menu-loading': String(props.menu?.loading),
  })),
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

const RouteContextSnapshot = defineComponent(() => {
  const routeContext = useRouteContext()
  return () => h('div', {
    class: 'route-context-snapshot',
    'data-current-path': routeContext.value.currentMenu?.path,
    'data-title': routeContext.value.title,
  })
})

const route = {
  path: '/',
  children: [
    {
      path: '/dashboard',
      meta: {
        title: 'Dashboard',
      },
    },
    {
      path: '/settings',
      meta: {
        title: 'Settings',
      },
    },
  ],
}

function mountLayout(LayoutComponent: typeof BasicLayout, props: Record<string, unknown>) {
  return mount(LayoutComponent, {
    props,
    global: {
      mocks: {
        $route: routeState,
      },
      config: {
        globalProperties: {
          $route: routeState,
        },
      },
    },
    slots: {
      default: () => h(RouteContextSnapshot),
    },
  })
}

describe.each([
  ['BasicLayout', BasicLayout],
  ['LeftLayout', LeftLayout],
])('%s menu source', (_, LayoutComponent) => {
  it('does not request menu data inside layout', async () => {
    const request = vi.fn().mockResolvedValue([
      {
        path: '/remote',
        meta: {
          title: 'Remote',
        },
      },
    ])

    mountLayout(LayoutComponent, {
      route,
      menu: {
        request,
      },
    })

    await nextTick()

    expect(request).not.toHaveBeenCalled()
  })

  it('uses app $route when location is not provided', async () => {
    routeState.path = '/settings'

    const wrapper = mountLayout(LayoutComponent, {
      route,
    })

    await nextTick()

    expect(wrapper.find('.route-context-snapshot').attributes('data-current-path')).toBe('/settings')
    expect(wrapper.find('.route-context-snapshot').attributes('data-title')).toBe('Settings')
  })

  it('keeps explicit location as an override for non-router usage', async () => {
    routeState.path = '/settings'

    const wrapper = mountLayout(LayoutComponent, {
      route,
      location: {
        path: '/dashboard',
      },
    })

    await nextTick()

    expect(wrapper.find('.route-context-snapshot').attributes('data-current-path')).toBe('/dashboard')
    expect(wrapper.find('.route-context-snapshot').attributes('data-title')).toBe('Dashboard')
  })
})

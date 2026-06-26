import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { defineComponent, h, ref } from 'vue'
import SettingDrawer from '../src/components/SettingDrawer'

vi.mock('antdv-next/dist/config-provider/context', async () => {
  return {
    useConfig: () => ref({
      direction: 'ltr',
      getPrefixCls: (suffix?: string) => suffix ? `ant-${suffix}` : 'ant',
    }),
  }
})

vi.mock('../src/components/SettingDrawer/style', async () => {
  return {
    useStyle: () => ({
      hashId: ref('layout-test-hash'),
      wrapSSR: (node: any) => node,
    }),
  }
})

vi.mock('@antdv-next1/pro-listy', async () => {
  const ProListy = defineComponent({
    props: ['dataSource', 'itemRender'],
    setup(props) {
      return () => h('div', { class: 'mock-pro-listy' }, (props.dataSource || []).map((item: any) => props.itemRender?.(item) || null))
    },
  })
  const ProListyItem = defineComponent((_, { slots }) => () => h('div', { class: 'mock-pro-listy-item' }, slots.default?.()))
  return { default: ProListy, ProListy, ProListyItem }
})

vi.mock('@antdv-next1/pro-utils', async () => {
  const actual = await vi.importActual<any>('@antdv-next1/pro-utils')
  return {
    ...actual,
    CopyToClipboard: defineComponent((_, { slots }) => () => slots.default?.()),
  }
})

vi.mock('antdv-next', async () => {
  const PassThrough = defineComponent((_, { slots, attrs }) => () => h('div', attrs, slots.default?.()))
  const Drawer = defineComponent({
    props: ['drawerRender'],
    setup(props, { slots }) {
      return () => {
        const dom = h('div', { class: 'mock-drawer' }, slots.default?.())
        return props.drawerRender ? props.drawerRender(dom) : dom
      }
    },
  })
  const Button = defineComponent((_, { slots, attrs }) => () => h('button', attrs, slots.default?.()))
  const Switch = defineComponent({
    props: ['checked'],
    emits: ['update:checked', 'change'],
    setup(props, { emit }) {
      return () => h('button', {
        class: 'mock-switch',
        onClick: () => {
          emit('update:checked', !props.checked)
          emit('change', !props.checked)
        },
      })
    },
  })
  const message = {
    useMessage: () => [
      {
        info: vi.fn(),
        loading: vi.fn(() => vi.fn()),
      },
      () => null,
    ],
  }

  return {
    Alert: PassThrough,
    Button,
    ConfigProvider: PassThrough,
    Divider: PassThrough,
    Drawer,
    Select: PassThrough,
    Switch,
    Tooltip: PassThrough,
    message,
    theme: {
      getDesignToken: () => ({
        colorPrimary: '#1677ff',
      }),
      useToken: () => ({
        token: ref({
          colorPrimary: '#1677ff',
        }),
        hashId: ref('layout-test-ant-hash'),
      }),
    },
  }
})

describe('SettingDrawer layout switch', () => {
  afterEach(() => {
    document.body.innerHTML = ''
    vi.clearAllMocks()
  })

  it('emits fixed left layout settings when selecting left layout', async () => {
    const onSettingChange = vi.fn()
    const wrapper = mount(SettingDrawer, {
      props: {
        settings: {
          layout: 'side',
          fixedHeader: false,
          fixedSiderbar: false,
          siderMenuType: 'group',
          splitMenus: true,
        },
        onSettingChange,
      },
    })

    await wrapper.find('.ant-pro-setting-drawer-block-checkbox-item-left').trigger('click')

    expect(onSettingChange).toHaveBeenCalled()
    const nextSettings = onSettingChange.mock.calls.at(-1)?.[0]
    expect(nextSettings).toMatchObject({
      layout: 'left',
      contentWidth: 'Fluid',
      fixedHeader: false,
      fixedSiderbar: true,
      siderMenuType: 'group',
      splitMenus: false,
    })
    expect(nextSettings).not.toHaveProperty('fixSiderbar')
  })
})

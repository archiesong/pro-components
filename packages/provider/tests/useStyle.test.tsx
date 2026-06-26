import { StyleProvider } from '@antdv-next/cssinjs'
import { mount } from '@vue/test-utils'
import { ConfigProvider as AntdConfigProvider } from 'antdv-next'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { computed, defineComponent, nextTick } from 'vue'
import { useProConfigProvider } from '../src/context'
import { useStyle } from '../src/useStyle'

const mockedAntd = vi.hoisted(() => ({
  lightToken: {
    colorText: 'rgb(0, 0, 0)',
    colorBgBase: 'rgb(255, 255, 255)',
    fontSize: 14,
    lineHeight: 1.5715,
    motionDurationSlow: '0.3s',
    colorLink: '#1677ff',
    colorLinkHover: '#69b1ff',
    colorLinkActive: '#0958d9',
  },
  darkToken: {
    colorText: 'rgb(255, 255, 255)',
    colorBgBase: 'rgb(0, 0, 0)',
    fontSize: 14,
    lineHeight: 1.5715,
    motionDurationSlow: '0.3s',
    colorLink: '#1677ff',
    colorLinkHover: '#69b1ff',
    colorLinkActive: '#0958d9',
  },
  token: undefined as undefined | { value: Record<string, any> },
  theme: undefined as undefined | { value: { id: number } },
  hashId: undefined as undefined | { value: string },
}))

vi.mock('antdv-next', async () => {
  const { computed, defineComponent, inject, provide, ref } = await import('vue')

  mockedAntd.token = ref({ ...mockedAntd.lightToken })
  mockedAntd.theme = ref({ id: 1 })
  mockedAntd.hashId = ref('provider-style-reuse-hash')
  const tokenContextKey = Symbol('mockedAntdTokenContext')

  const getDefaultTokenContext = () => ({
    token: mockedAntd.token!,
    theme: mockedAntd.theme!,
    hashId: mockedAntd.hashId!,
  })

  return {
    ConfigProvider: defineComponent(
      (props: { theme?: { token?: Record<string, any>, hashId?: string, id?: number } }, { slots }) => {
        const parent = inject(tokenContextKey, getDefaultTokenContext())
        const provided = {
          token: computed(() => ({
            ...parent.token.value,
            ...(props.theme?.token || {}),
          })),
          theme: computed(() => ({
            id: props.theme?.id ?? parent.theme.value.id,
          })),
          hashId: computed(() => props.theme?.hashId ?? parent.hashId.value),
        }
        provide(tokenContextKey, provided)
        return () => slots.default?.()
      },
      {
        props: ['theme'],
      },
    ),
    theme: {
      getDesignToken: () => ({ ...mockedAntd.lightToken }),
      useToken: () => inject(tokenContextKey, getDefaultTokenContext()),
    },
  }
})

vi.mock('antdv-next/dist/config-provider/context', async () => {
  const { ref } = await import('vue')

  return {
    useConfig: () => ref({
      csp: undefined,
      iconPrefixCls: 'anticon',
      getPrefixCls: (suffix?: string) => suffix ? `ant-${suffix}` : 'ant',
    }),
  }
})

const StyledComponent = defineComponent(() => {
  const { hashId } = useStyle('provider-style-reuse-test', token => ({
    '.provider-style-reuse-test': {
      color: token.colorText,
      background: token.colorBgBase,
    },
  }))

  return () => <div class={['provider-style-reuse-test', hashId.value]}>content</div>
})

const SameNameFirst = defineComponent(() => {
  useStyle('provider-same-name-test', token => ({
    '.provider-same-name-first': {
      color: token.colorText,
    },
  }))

  return () => <div class="provider-same-name-first">first</div>
})

const SameNameSecond = defineComponent(() => {
  useStyle('provider-same-name-test', token => ({
    '.provider-same-name-second': {
      background: token.colorBgBase,
    },
  }))

  return () => <div class="provider-same-name-second">second</div>
})

const UnitlessComponent = defineComponent(() => {
  useStyle('provider-unitless-test', token => ({
    '.provider-unitless-test': {
      zIndex: token.calc!('zIndex').add(1).equal(),
    },
  }), {
    unitless: {
      zIndex: true,
    },
  })

  return () => <div class="provider-unitless-test">unitless</div>
})

const ProHashScope = defineComponent((_, { slots }) => {
  useProConfigProvider(computed(() => ({
    hashed: true,
    hashId: 'parent-pro-hash',
    token: {},
  }) as any))

  return () => slots.default?.()
})

const ScopedTokenComponent = defineComponent(() => {
  const { hashId } = useStyle('provider-nested-token-test', token => ({
    '.provider-nested-token-test': {
      color: token.colorText,
    },
  }))

  return () => <div class={['provider-nested-token-test', hashId.value]}>nested</div>
})

function findRegisteredStyle(name: string) {
  return Array.from(document.querySelectorAll<HTMLStyleElement>('style[data-cache-path]'))
    .find(style => style.getAttribute('data-cache-path')?.includes(name))
}

describe('useStyle', () => {
  const wrappers: Array<{ unmount: () => void }> = []

  afterEach(() => {
    wrappers.splice(0).forEach(wrapper => wrapper.unmount())
    document.head.innerHTML = ''
    document.body.innerHTML = ''
    mockedAntd.token!.value = { ...mockedAntd.lightToken }
    mockedAntd.theme!.value = { id: 1 }
    mockedAntd.hashId!.value = 'provider-style-reuse-hash'
  })

  it('updates the registered style element when dark mode changes', async () => {
    wrappers.push(mount(StyledComponent))

    await nextTick()
    await nextTick()

    const lightStyle = findRegisteredStyle('provider-style-reuse-test')
    expect(lightStyle).toBeTruthy()
    const lightStyleText = lightStyle!.innerHTML
    expect(lightStyleText).toContain('provider-style-reuse-hash')

    mockedAntd.token!.value = { ...mockedAntd.darkToken }
    mockedAntd.theme!.value = { id: 2 }
    await nextTick()
    await nextTick()

    const darkStyle = findRegisteredStyle('provider-style-reuse-test')
    expect(darkStyle).toBe(lightStyle)
    expect(darkStyle!.innerHTML).not.toBe(lightStyleText)
    expect(darkStyle!.innerHTML).toContain('provider-style-reuse-hash')
  })

  it('returns the current antd hash id when no ProConfigProvider is mounted', async () => {
    const wrapper = mount(StyledComponent)
    wrappers.push(wrapper)

    await nextTick()

    expect(wrapper.find('.provider-style-reuse-test').classes()).toContain('provider-style-reuse-hash')
  })

  it('keeps active same-name registrations in one style element instead of overwriting them', async () => {
    wrappers.push(mount(() => (
      <>
        <SameNameFirst />
        <SameNameSecond />
      </>
    )))

    await nextTick()
    await nextTick()

    const style = findRegisteredStyle('provider-same-name-test')
    expect(style).toBeTruthy()
    expect(style!.innerHTML).toContain('provider-same-name-first')
    expect(style!.innerHTML).toContain('provider-same-name-second')
  })

  it('cleans styles from independent StyleProvider containers independently', async () => {
    const firstContainer = document.createElement('div')
    const secondContainer = document.createElement('div')
    document.body.append(firstContainer, secondContainer)

    const firstWrapper = mount(() => (
      <StyleProvider container={firstContainer}>
        <StyledComponent />
      </StyleProvider>
    ))
    const secondWrapper = mount(() => (
      <StyleProvider container={secondContainer}>
        <StyledComponent />
      </StyleProvider>
    ))
    wrappers.push(secondWrapper)

    await nextTick()
    await nextTick()

    expect(firstContainer.querySelectorAll('style[data-cache-path]').length).toBe(1)
    expect(secondContainer.querySelectorAll('style[data-cache-path]').length).toBe(1)

    firstWrapper.unmount()
    await nextTick()

    expect(firstContainer.querySelectorAll('style[data-cache-path]').length).toBe(0)
    expect(secondContainer.querySelectorAll('style[data-cache-path]').length).toBe(1)
  })

  it('honors unitless calc options without adding px', async () => {
    wrappers.push(mount(UnitlessComponent))

    await nextTick()
    await nextTick()

    const style = findRegisteredStyle('provider-unitless-test')
    expect(style).toBeTruthy()
    expect(style!.innerHTML).toContain('z-index:calc(zIndex + 1);')
    expect(style!.innerHTML).not.toContain('1px')
  })

  it('scopes nested AntdConfigProvider token styles to the nested hash id', async () => {
    wrappers.push(mount(() => (
      <AntdConfigProvider theme={{
        token: mockedAntd.lightToken,
        hashId: 'parent-pro-hash',
        id: 1,
      }}
      >
        <ProHashScope>
          <ScopedTokenComponent />
          <AntdConfigProvider theme={{
            token: mockedAntd.darkToken,
            hashId: 'child-ant-hash',
            id: 2,
          }}
          >
            <ScopedTokenComponent />
          </AntdConfigProvider>
        </ProHashScope>
      </AntdConfigProvider>
    )))

    await nextTick()
    await nextTick()

    const style = findRegisteredStyle('provider-nested-token-test')
    expect(style).toBeTruthy()
    expect(style!.innerHTML).toContain('parent-pro-hash')
    expect(style!.innerHTML).toContain('child-ant-hash')
    expect(style!.innerHTML).not.toContain('parent-pro-hash).provider-nested-token-test{color:rgb(255, 255, 255)')
  })
})

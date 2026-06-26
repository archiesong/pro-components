import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { defineComponent, h } from 'vue'
import ProLayout from '../src/ProLayout'

vi.mock('antdv-next', async () => {
  const ConfigProvider = defineComponent((_, { slots }) => () => h('div', { class: 'mock-ant-config-provider' }, slots.default?.()))

  return {
    ConfigProvider,
  }
})

vi.mock('@antdv-next1/pro-provider', async () => {
  const ProConfigProvider = defineComponent((_, { slots }) => () => h('div', { class: 'mock-pro-config-provider' }, slots.default?.()))

  return {
    ProConfigProvider,
  }
})

vi.mock('../src/BasicLayout', async () => {
  return {
    default: defineComponent((_, { attrs, slots }) => () => h('div', { class: 'mock-basic-layout', 'data-layout': attrs.layout as string }, slots.default?.())),
  }
})

vi.mock('../src/layouts/LeftLayout', async () => {
  return {
    default: defineComponent((_, { attrs, slots }) => () => h('div', { class: 'mock-left-layout', 'data-layout': attrs.layout as string }, slots.default?.())),
  }
})

describe('ProLayout layout switch', () => {
  it('uses LeftLayout only for left layout', () => {
    const wrapper = mount(ProLayout, {
      props: {
        layout: 'left',
      },
    })

    expect(wrapper.find('.mock-left-layout').exists()).toBe(true)
    expect(wrapper.find('.mock-left-layout').attributes('data-layout')).toBe('left')
    expect(wrapper.find('.mock-basic-layout').exists()).toBe(false)
  })

  it('keeps side layout on BasicLayout', () => {
    const wrapper = mount(ProLayout, {
      props: {
        layout: 'side',
      },
    })

    expect(wrapper.find('.mock-basic-layout').exists()).toBe(true)
    expect(wrapper.find('.mock-basic-layout').attributes('data-layout')).toBe('side')
    expect(wrapper.find('.mock-left-layout').exists()).toBe(false)
  })
})

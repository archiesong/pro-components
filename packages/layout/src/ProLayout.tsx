import type { App, Plugin } from 'vue'
import type { SlotsRenderType } from './RenderTypings'
import type { CustomSlotsType, VueNode } from './typing'
import { ProConfigProvider } from '@antdv-next1/pro-provider'
import { ConfigProvider as AntdConfigProvider } from 'antdv-next'
import { computed, defineComponent } from 'vue'
import { Logo } from './assert/Logo'
import BasicLayout from './BasicLayout'
import { proLayoutProps } from './proLayoutProps'
import { useProLayoutRender } from './utils/useProLayoutRender'

const ProLayout = defineComponent({
  name: 'ProLayout',
  inheritAttrs: false,
  props: proLayoutProps(),
  slots: Object as CustomSlotsType<
    SlotsRenderType & {
      default?: () => VueNode[]
    }
  >,
  setup(props, { slots, expose }) {
    const themeProps = computed(() => ({
      ...(props.navTheme !== undefined && { dark: props.navTheme === 'realDark' }),
      ...(props.compact !== undefined && { compact: props.compact }),
    }))
    const proLayoutRender = useProLayoutRender(slots, props)
    expose({})
    return () => {
      const { colorPrimary, prefixCls, token, logo } = props
      return (
        <AntdConfigProvider
          theme={
            colorPrimary
              ? {
                  token: {
                    colorPrimary,
                  },
                }
              : undefined
          }
        >
          <ProConfigProvider {...themeProps.value} token={token} prefixCls={prefixCls}>
            <BasicLayout {...props} {...proLayoutRender.value} logo={logo || <Logo />} v-slots={slots} />
          </ProConfigProvider>
        </AntdConfigProvider>
      )
    }
  },
})
ProLayout.install = (app: App) => {
  app.component(ProLayout.name!, ProLayout)
  return app
}

export default ProLayout as typeof ProLayout & Plugin

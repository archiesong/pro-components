import type { ProTokenType } from '@antdv-next1/pro-provider'
import type { CSSProperties, PropType } from 'vue'
import { useProConfig } from '@antdv-next1/pro-provider'
import { useEffect } from '@antdv-next1/pro-utils'
import { classNames } from '@v-c/util'
import { Drawer } from 'antdv-next'
import { useConfig } from 'antdv-next/dist/config-provider/context'
import { computed, defineComponent } from 'vue'
import SiderMenu from './SiderMenu'
import { privateSiderMenuProps, siderMenuProps } from './siderMenuProps.ts'
import { useStyle } from './style'

export function siderMenuWrapperProps() {
  return {
    ...siderMenuProps(),
    ...privateSiderMenuProps(),
    token: Object as PropType<ProTokenType['layout']>,
    getContainer: [String, Object] as PropType<string | HTMLElement>,
    hide: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
  }
}

export type SiderMenuWrapperProps = Partial<ReturnType<typeof siderMenuWrapperProps>>

const SiderMenuWrapper = defineComponent({
  name: 'SiderMenuWrapper',
  inheritAttrs: false,
  props: siderMenuWrapperProps(),
  setup(props) {
    const proProvide = useProConfig()
    const config = useConfig()
    const baseClassName = computed(() => `${props.prefixCls}-sider`)

    useEffect(() => {
      if (props.isMobile === true) {
        props.onCollapse?.(true)
      }
    }, [() => props.isMobile])

    const { wrapSSR, hashId } = useStyle(baseClassName, {
      proLayoutCollapsedWidth: 64,
    })

    const drawerMenuBackground = computed(() => {
      if (
        (props.navTheme === 'realDark' && props.layout !== 'mix')
        || (props.navTheme === 'dark' && props.layout !== 'mix')
        || (props.layout === 'mix' && props.isMobile && props.navTheme === 'realDark')
        || (props.layout === 'mix' && props.isMobile && props.navTheme === 'dark')
      ) {
        return props.token?.sider?.colorMenuBackground || '#001529'
      }
      return proProvide.value.token.layout?.sider?.colorMenuBackground || 'transparent'
    })

    return () => {
      const { class: className, style, prefixCls, collapsed, siderWidth, isMobile, onCollapse, getContainer } = props
      const { direction } = config.value
      if (props.hide) {
        return null
      }
      return wrapSSR(
        props.isMobile
          ? (
              <Drawer
                placement={direction === 'rtl' ? 'right' : 'left'}
                class={classNames(`${prefixCls}-drawer-sider`, className, hashId.value)}
                open={!collapsed}
                style={{
                  padding: 0,
                  height: '100vh',
                  ...(style as CSSProperties),
                }}
                onClose={() => onCollapse?.(true)}
                closable={false}
                getContainer={getContainer}
                mask={{
                  closable: true,
                }}
                width={siderWidth}
                styles={{
                  body: {
                    height: '100vh',
                    padding: 0,
                    display: 'flex',
                    flexDirection: 'row',
                    backgroundColor: drawerMenuBackground.value,
                  },
                }}
              >
                <SiderMenu
                  {...props}
                  isMobile={true}
                  class={classNames(baseClassName.value, className, hashId.value)}
                  collapsed={isMobile ? false : collapsed}
                  splitMenus={false}
                  originCollapsed={collapsed}
                />
              </Drawer>
            )
          : (
              <SiderMenu {...props} class={classNames(baseClassName.value, className, hashId.value)} originCollapsed={collapsed} />
            ),
      )
    }
  },
})

export default SiderMenuWrapper

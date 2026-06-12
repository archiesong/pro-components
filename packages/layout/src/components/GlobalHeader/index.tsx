import type { VueNode } from 'antdv-next/dist/_util/type'
import type { SlotsType } from 'vue'
import type { SlotsRenderType } from '../../RenderTypings'
import type { SiderMenuProps } from '../SiderMenu/siderMenuProps'
import { useProConfig } from '@antdv-next1/pro-provider'
import { getSlot } from '@antdv-next1/pro-utils'
import { classNames } from '@v-c/util'
import { useConfig } from 'antdv-next/dist/config-provider/context'
import { computed, defineComponent } from 'vue'
import { clearMenuItem } from '../../utils'
import AppsLogoComponents, { defaultRenderLogo } from '../AppsLogoComponents'
import CollapsedIcon from '../CollapsedIcon'
import { renderLogoAndTitle } from '../SiderMenu/SiderMenu'
import { privateSiderMenuProps } from '../SiderMenu/siderMenuProps'
import TopNavHeader from '../TopNavHeader'
import ActionsContent from './ActionsContent'
import { globalHeaderProps } from './globalHeaderProps'
import { useStyle } from './style'

function renderLogo(menuHeaderRender: SiderMenuProps['menuHeaderRender'], logoDom: VueNode, props: SiderMenuProps) {
  if (menuHeaderRender === false) {
    return null
  }
  if (menuHeaderRender) {
    return menuHeaderRender({ logo: logoDom, title: null, props })
  }
  return logoDom
}

const GlobalHeader = defineComponent({
  name: 'GlobalHeader',
  inheritAttrs: false,
  props: {
    ...globalHeaderProps(),
    ...privateSiderMenuProps(),
  },
  slots: Object as SlotsType<
    Pick<SlotsRenderType, 'actionsRender' | 'menuHeaderRender' | 'headerTitleRender' | 'menuRender' | 'appListRender'> & {
      default: () => VueNode[]
    }
  >,
  setup(props, { slots }) {
    const config = useConfig()
    const proProvide = useProConfig()
    const baseClassName = computed(() => `${props.prefixCls || config.value.getPrefixCls('pro')}-global-header`)
    const { wrapSSR, hashId } = useStyle(baseClassName)
    return () => {
      const { navTheme, layout, isMobile, class: className, onCollapse, avatarProps, onMenuHeaderClick, logo, menuData = [], splitMenus, collapsed } = props
      const menuHeaderRender = getSlot(slots, props, 'menuHeaderRender')
      const actionsRender = getSlot(slots, props, 'actionsRender')
      const headerTitleRender = getSlot(slots, props, 'headerTitleRender')
      const menuRender = getSlot(slots, props, 'menuRender')
      const appListRender = getSlot(slots, props, 'appListRender')

      if (layout === 'mix' && !isMobile && splitMenus) {
        const noChildrenMenuData = menuData.map(item => ({
          ...item,
          children: undefined,
        }))
        const clearMenuData = clearMenuItem(noChildrenMenuData)
        return (
          <TopNavHeader
            {...props}
            menuHeaderRender={menuHeaderRender}
            actionsRender={actionsRender}
            headerTitleRender={headerTitleRender}
            menuRender={menuRender}
            appListRender={appListRender}
            mode="horizontal"
            splitMenus={false}
            menuData={clearMenuData}
          />
        )
      }

      const logoClassNames = classNames(`${baseClassName.value}-logo`, hashId.value, {
        [`${baseClassName.value}-logo-rtl`]: config.value.direction === 'rtl',
        [`${baseClassName.value}-logo-mix`]: layout === 'mix',
        [`${baseClassName.value}-logo-mobile`]: isMobile,
      })
      const logoDom = (
        <span class={logoClassNames} key="logo">
          <a>{defaultRenderLogo(logo)}</a>
        </span>
      )

      return wrapSSR(
        <div
          class={classNames(className, baseClassName.value, hashId.value, {
            [`${baseClassName.value}-light`]: navTheme === 'light' || (layout === 'side' && navTheme !== 'realDark') || isMobile,
            [`${baseClassName.value}-dark`]: navTheme === 'dark' && layout !== 'side' && !isMobile,
            [`${baseClassName.value}-realDark`]: navTheme === 'realDark' && layout !== 'mix',
          })}
        >
          {isMobile && renderLogo(menuHeaderRender, logoDom, props)}
          {layout === 'mix' && !isMobile && menuHeaderRender !== false && (
            <>
              <AppsLogoComponents {...props} appListRender={appListRender} />
              <div class={logoClassNames} onClick={onMenuHeaderClick}>
                {renderLogoAndTitle({ ...props, headerTitleRender, menuHeaderRender, collapsed: false }, 'headerTitleRender')}
              </div>
            </>
          )}
          {(isMobile || layout === 'side') && menuRender !== false
            ? (
                <span
                  class={classNames(`${baseClassName.value}-collapsed-button`, hashId.value)}
                  style={{
                    marginInlineStart: `${proProvide.value.token.marginXS}px`,
                  }}
                  onClick={() => {
                    onCollapse?.(!collapsed)
                  }}
                >
                  <CollapsedIcon collapsed={collapsed!} tabIndex={-1} />
                </span>
              )
            : null}

          <div style={{ flex: 1 }}>{slots.default?.()}</div>
          {(actionsRender || avatarProps) && <ActionsContent {...props} actionsRender={actionsRender} prefixCls={baseClassName.value} />}
        </div>,
      )
    }
  },
})

export default GlobalHeader

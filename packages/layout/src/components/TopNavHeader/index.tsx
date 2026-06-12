import type { CustomSlotsType } from '@v-c/util/dist/type'
import type { SlotsRenderType } from '../../RenderTypings'
import type { VueNode } from '../../typing'
import type { GlobalHeaderProps } from '../GlobalHeader'
import type { HeaderRenderKey, PrivateSiderMenuProps, SiderMenuProps } from '../SiderMenu/SiderMenu'
// import { isNeedOpenHash, useProConfig } from '@antdv-next1/pro-provider'
import { getSlot } from '@antdv-next1/pro-utils'
import { classNames } from '@v-c/util'
import { ConfigProvider } from 'antdv-next'
import { useConfig } from 'antdv-next/dist/config-provider/context'
import { computed, defineComponent } from 'vue'
import AppsLogoComponents from '../AppsLogoComponents'
import ActionsContent from '../GlobalHeader/ActionsContent'
import BaseMenu from '../SiderMenu/BaseMenu'
import { renderLogoAndTitle } from '../SiderMenu/SiderMenu'
import { useStyle } from './style'

export type TopNavHeaderProps = PrivateSiderMenuProps & SiderMenuProps & GlobalHeaderProps

const TopNavHeader = defineComponent<TopNavHeaderProps, {}, string, CustomSlotsType<
  Pick<
    SlotsRenderType,
    | 'headerRender'
    | 'menuRender'
    | 'menuHeaderRender'
    | 'actionsRender'
    | 'appListRender'
    | 'menuItemRender'
    | 'headerTitleRender'
    | 'subMenuItemRender'
    | 'headerContentRender'
  > & {
    default: () => VueNode[]
  }
>>((props, { slots, attrs }) => {
  const config = useConfig()
  // const proProvide = useProConfig()
  const prefixCls = computed(() => `${props.prefixCls || config.value.getPrefixCls('pro')}-top-nav-header`)

  const { wrapSSR, hashId } = useStyle(prefixCls)

  const headerDom = computed(() => {
    let renderKey: HeaderRenderKey | undefined
    const menuHeaderRender = getSlot(slots, props, 'menuHeaderRender')
    const headerTitleRender = getSlot(slots, props, 'headerTitleRender')
    if (menuHeaderRender !== undefined) {
      renderKey = 'menuHeaderRender'
    }
    else if (props.layout === 'mix' || props.layout === 'top') {
      renderKey = 'headerTitleRender'
    }
    return renderLogoAndTitle({ ...props, menuHeaderRender, headerTitleRender, collapsed: false }, renderKey)
  })
  // const menuToken = computed(() => {
  //   if (
  //     (props.navTheme === 'realDark' && props.layout !== 'mix') ||
  //     (props.navTheme === 'dark' && props.layout !== 'side') ||
  //     (props.layout === 'mix' && props.splitMenus && props.navTheme === 'realDark') ||
  //     (props.layout === 'mix' && props.splitMenus && props.navTheme === 'dark')
  //   ) {
  //     return {
  //       colorItemBg: props.token?.header?.colorBgHeader || '#001529',
  //       radiusItem: proProvide.value.token.borderRadiusLG,
  //       colorItemBgSelected: props.token?.header?.colorBgMenuItemSelected || proProvide.value.token?.colorPrimary,
  //       colorItemBgHover: props.token?.header?.colorBgMenuItemHover || 'transparent',
  //       colorItemBgSelectedHorizontal: props.token?.header?.colorBgMenuItemSelectedHorizontal || proProvide.value.token.colorPrimary,
  //       colorItemText: props.token?.header?.colorTextMenu || setAlpha(proProvide.value.token?.colorTextLightSolid, 0.65),
  //       colorItemTextHoverHorizontal: props.token?.header?.colorTextMenuActive || proProvide.value.token?.colorText,
  //       colorItemTextSelectedHorizontal: props.token?.header?.colorTextMenuSelected || proProvide.value.token?.colorTextLightSolid,
  //       // colorItemTextHover:
  //       //   proProvide.value.token.layout?.header?.colorTextMenuActive ||
  //       //   proProvide.value.token?.colorText,
  //       colorItemTextSelected: props.token?.header?.colorTextMenuSelected || proProvide.value.token?.colorTextLightSolid,
  //     }
  //   }
  //   return {
  //     colorItemBg: proProvide.value.token.layout?.header?.colorBgHeader || 'transparent',
  //     radiusItem: proProvide.value.token.borderRadiusLG,
  //     colorItemBgSelected: proProvide.value.token.layout?.header?.colorBgMenuItemSelected || proProvide.value.token?.controlItemBgActive,
  //     colorItemBgHover: proProvide.value.token.layout?.header?.colorBgMenuItemHover || proProvide.value.token?.colorBgTextHover,
  //     colorItemBgSelectedHorizontal: proProvide.value.token.layout?.header?.colorBgMenuItemSelectedHorizontal || 'transparent',
  //     colorItemText: proProvide.value.token.layout?.header?.colorTextMenu || proProvide.value.token?.colorText,
  //     colorItemTextHoverHorizontal: proProvide.value.token.layout?.header?.colorTextMenuActive || proProvide.value.token?.colorPrimary,
  //     colorItemTextSelectedHorizontal: proProvide.value.token.layout?.header?.colorTextMenuSelected || proProvide.value.token?.colorPrimary,
  //     // colorItemTextHover:
  //     //   proProvide.value.token.layout?.header?.colorTextMenuActive ||
  //     //   proProvide.value.token?.colorPrimary,
  //     colorItemTextSelected: proProvide.value.token.layout?.header?.colorTextMenuSelected || proProvide.value.token?.colorPrimary,
  //   }
  // })
  const contentDom = computed(() => {
    const menuItemRender = getSlot(slots, props, 'menuItemRender')
    const subMenuItemRender = getSlot(slots, props, 'subMenuItemRender')
    const defaultDom = (
      <ConfigProvider
        // theme={{
        //   hashed: isNeedOpenHash(),
        //   // components: {
        //   //   Menu: menuToken.value,
        //   // },
        // }}
      >
        <BaseMenu
          {...props}
          menuItemRender={menuItemRender}
          subMenuItemRender={subMenuItemRender}
          class={classNames(`${prefixCls.value}-base-menu`, hashId.value)}
          theme={props.navTheme !== 'realDark' ? props.navTheme : 'dark'}
          collapsed={false}
          menuRenderType="header"
          mode="horizontal"
        />
      </ConfigProvider>
    )
    if (props.headerContentRender) {
      return props.headerContentRender({ props: { ...props, menuItemRender, subMenuItemRender }, dom: defaultDom })
    }
    return defaultDom
  })

  return () => {
    const { contentWidth, layout, onMenuHeaderClick, navTheme, avatarProps } = props
    const actionsRender = getSlot(slots, props, 'actionsRender')
    const appListRender = getSlot(slots, props, 'appListRender')
    return wrapSSR(
      <div
        class={classNames(prefixCls.value, hashId.value, attrs.class, {
          [`${prefixCls.value}-${navTheme}`]: true,
        })}
        style={attrs.style}
      >
        <div
          class={classNames(`${prefixCls.value}-main`, hashId.value, {
            [`${prefixCls.value}-wide`]: contentWidth === 'Fixed' && layout === 'top',
          })}
        >
          {headerDom.value && (
            <div class={classNames(`${prefixCls.value}-main-left`, hashId.value)} onClick={onMenuHeaderClick}>
              <AppsLogoComponents {...props} appListRender={appListRender} />
              <div class={classNames(`${prefixCls.value}-logo`, hashId.value)} key="logo" id="logo">
                {headerDom.value}
              </div>
            </div>
          )}
          <div style={{ flex: 1 }} class={classNames(`${prefixCls.value}-menu`, hashId.value)}>
            {contentDom.value}
          </div>
          {(actionsRender || avatarProps) && <ActionsContent {...props} actionsRender={actionsRender} prefixCls={prefixCls.value} />}
        </div>
      </div>,
    )
  }
}, {
  name: 'TopNavHeader',
  inheritAttrs: false,
})
export default TopNavHeader

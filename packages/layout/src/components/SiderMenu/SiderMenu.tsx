import type { VueNode } from '@antdv-next/pro-utils'
import type { ItemType } from 'antdv-next/dist/menu/interface'
import type { VNode } from 'vue'
import type { HeaderTitleRender } from '../../RenderTypings'
import type { WithFalse } from '../../typing'
import type { SiderMenuProps } from './siderMenuProps'
import { useProConfig } from '@antdv-next/pro-provider'
import { classNames } from '@v-c/util'
import { Avatar, LayoutSider, Menu, Space } from 'antdv-next'
import { computed, defineComponent, isVNode } from 'vue'
import AppsLogoComponents, { defaultRenderLogo } from '../AppsLogoComponents'
import CollapsedIcon from '../CollapsedIcon'
import BaseMenu from './BaseMenu'
import { privateSiderMenuProps, siderMenuProps } from './siderMenuProps'
import { useStylish } from './style/stylish'

export type HeaderRenderKey = 'menuHeaderRender' | 'headerTitleRender'
/**
 * 渲染 title 和 logo
 *
 * @param props
 * @param renderKey
 */
export function renderLogoAndTitle(props: Partial<
  SiderMenuProps & {
    headerTitleRender: WithFalse<HeaderTitleRender>
  }
>, renderKey: HeaderRenderKey = 'menuHeaderRender'): VueNode {
  const { logo, title, layout } = props
  const renderFunction = props[renderKey as 'menuHeaderRender']
  if (renderFunction === false) {
    return null
  }
  const logoDom = defaultRenderLogo(logo)
  const titleDom = <h1>{title ?? 'Antdv Next Pro'}</h1>

  if (renderFunction) {
    // when collapsed, no render title
    return renderFunction({ logo: logoDom as VueNode, title: props.collapsed ? null : titleDom, props })
  }
  if (layout === 'mix' && renderKey === 'menuHeaderRender' && !props.isMobile)
    return false
  if (props.collapsed) {
    return <a key="title">{logoDom}</a>
  }
  return (
    <a key="title">
      {logoDom}
      {titleDom}
    </a>
  )
}
/**
 *  默认渲染菜单折叠切换按钮
 * @param collapsed
 * @param tabIndex
 * @returns
 */

const SiderMenu = defineComponent({
  name: 'SiderMenu',
  inheritAttrs: false,
  props: {
    ...siderMenuProps(),
    ...privateSiderMenuProps(),
  },
  setup(props) {
    const proProvide = useProConfig()
    const baseClassName = computed(() => `${props.prefixCls}-sider`)
    const prefixCls = computed(() => `${baseClassName.value} ${baseClassName.value}-stylish`)
    /* Using the useMemo hook to create a CSS class that will hide the menu when the menu is collapsed. */
    const hideMenuWhenCollapsedClassName = computed(() => {
      const { menu, collapsed } = props
      // 收起时完全隐藏菜单
      if (menu?.hideMenuWhenCollapsed && collapsed) {
        return `${baseClassName.value}-hide-menu-collapsed`
      }
      return null
    })

    const showSiderExtraDom = computed(() => {
      const { isMobile, layout } = props
      if (isMobile)
        return false
      return layout !== 'mix'
    })

    // 收起的宽度
    const collapsedWidth = computed(() => props.collapsedWidth || 64)

    const appsDom = computed(() => (
      <AppsLogoComponents onItemClick={props.itemClick} appListRender={props.appListRender} appList={props.appList} prefixCls={props.prefixCls} />
    ))
    // 之所以这样写是为了提升样式优先级，不然会被sider 自带的覆盖掉
    const stylishClassName = useStylish(prefixCls, {
      stylish: props.stylish,
      proLayoutCollapsedWidth: collapsedWidth.value,
    })
    const avatarDom = computed(() => {
      if (!props.avatarProps)
        return null
      const { title, render, ...rest } = props.avatarProps
      const dom = (
        <div class={`${baseClassName.value}-actions-avatar ${proProvide.value.hashId}`}>
          {rest?.src || rest?.srcSet || rest.icon ? <Avatar size={28} {...rest} /> : null}
          {props.avatarProps.title && !props.collapsed && <span>{title}</span>}
        </div>
      )
      if (render) {
        return render(props.avatarProps, dom, props)
      }
      return dom
    })

    const actionsDom = computed(() => {
      if (!props.actionsRender)
        return null
      return (
        <Space
          align="center"
          size={4}
          orientation={props.collapsed ? 'vertical' : 'horizontal'}
          class={classNames([
            `${baseClassName.value}-actions-list`,
            props.collapsed && `${baseClassName.value}-actions-list-collapsed`,
            proProvide.value.hashId,
          ])}
        >
          {[props.actionsRender?.({ props })].flat(1).map((item, index) => {
            return (
              <div key={index} class={classNames(`${baseClassName.value}-actions-list-item`, proProvide.value.hashId)}>
                {item}
              </div>
            )
          })}
        </Space>
      )
    })

    /** 操作区域的dom */
    const actionAreaDom = computed(() => {
      if (!avatarDom.value && !actionsDom.value)
        return null
      return (
        <div class={classNames(`${baseClassName.value}-actions`, proProvide.value.hashId, props.collapsed && `${baseClassName.value}-actions-collapsed`)}>
          {avatarDom.value}
          {actionsDom.value}
        </div>
      )
    })
    const theme = computed(() => {
      if (props.layout === 'mix' && !props.isMobile) {
        return 'light'
      }
      if (props.navTheme === 'realDark') {
        return 'dark'
      }
      return props.navTheme
    })

    const collapsedDom = computed(() => {
      if (props.collapsedButtonRender === false || props.layout !== 'mix')
        return null
      const collapsedButton = {
        class: `${baseClassName.value}-collapsed-button-menu-icon`,
        key: 'collapsed-button-icon',
        title: '',
        label: <>&#8203;</>,
        icon: <CollapsedIcon collapsed={props.collapsed as boolean} />,
      }
      if (props.collapsedButtonRender) {
        return props.collapsedButtonRender({
          collapsed: props.collapsed,
          dom: <CollapsedIcon collapsed={props.collapsed as boolean} />,
        })
      }
      return (
        <Menu
          inlineIndent={16}
          class={classNames(`${baseClassName.value}-collapsed-button-menu`, proProvide.value.hashId)}
          selectedKeys={[]}
          openKeys={[]}
          theme={theme.value}
          mode="inline"
          onClick={() => props.onCollapse?.(!props.collapsed)}
          items={[collapsedButton]}
        />
      )
    })
    const headerDom = computed(() => renderLogoAndTitle(props))
    const extraDom = computed(() => props.menuExtraRender && props.menuExtraRender({ props }))
    const menuFooterDom = computed(() => props.menuFooterRender && props.menuFooterRender?.({ props }))
    // Comment
    const menuDom = computed(
      () =>
        props.menuContentRender !== false && (
          <BaseMenu
            {...props}
            key={`base-menu-${props.collapsed && !props.isMobile ? 'vertical' : 'inline'}`}
            mode={props.collapsed && !props.isMobile ? 'vertical' : 'inline'}
            theme={theme.value}
            class={classNames(`${baseClassName.value}-menu`, proProvide.value.hashId)}
          />
        ),
    )
    const menuRenderDom = computed(() => (props.menuContentRender ? props.menuContentRender({ props, dom: menuDom.value }) : menuDom.value))

    const linksMenuItems = computed<ItemType[]>(() =>
      (props.links || []).map((node, key) => {
        const menuItem: ItemType = {
          class: `${baseClassName.value}-link`,
          key,
        }
        if (isVNode(node) && Array.isArray(node.children) && node.children.length > 0) {
          if (((node as VNode).children as VNode[])?.length >= 2) {
            menuItem.title = ((node.children as VNode[])[1]!.children as VNode[])[0]?.children as string
            menuItem.label = (node.children as VNode[])[1]
            menuItem.icon = (node.children as VNode[])[0]
          }
          else {
            const children = node.children as VNode[]
            const title = children[0]?.children as string
            const label = title.substring(1)
            const icon = (
              <span class={classNames(`${proProvide.value.token?.antCls}-icon`, `${proProvide.value.token?.antCls}-menu-item-icon`)}>
                {title.trim().charAt(0).toUpperCase()}
              </span>
            )
            menuItem.title = title
            menuItem.icon = icon
            menuItem.label = label
          }
        }
        else {
          const link = node as {
            icon?: VNode
            title?: string
            label?: VNode
          }
          menuItem.label = link.label
          menuItem.title = link.title
          menuItem.icon = link.icon
        }
        return menuItem
      }),
    )
    const menuDomItems = computed(() => (
      <>
        {headerDom.value && (
          <div
            class={classNames(`${baseClassName.value}-logo`, proProvide.value.hashId, {
              [`${baseClassName.value}-logo-collapsed`]: props.collapsed,
            })}
            onClick={showSiderExtraDom.value ? props.onMenuHeaderClick : undefined}
            id="logo"
            style={props.logoStyle}
          >
            {headerDom.value}
            {!props.isMobile && appsDom.value}
          </div>
        )}
        {extraDom.value && (
          <div class={classNames([`${baseClassName.value}-extra`, !headerDom.value && `${baseClassName.value}-extra-no-logo`, proProvide.value.hashId])}>
            {extraDom.value}
          </div>
        )}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            overflowX: 'hidden',
          }}
        >
          {menuRenderDom.value}
        </div>
        {props.links
          ? (
              <div class={classNames(`${baseClassName.value}-links`, proProvide.value.hashId)}>
                <Menu
                  inlineIndent={16}
                  class={classNames(`${baseClassName.value}-link-menu`, proProvide.value.hashId)}
                  selectedKeys={[]}
                  openKeys={[]}
                  theme={props.theme}
                  mode="inline"
                  items={linksMenuItems.value}
                />
              </div>
            )
          : null}
        {showSiderExtraDom.value && props.headerRender === false && actionAreaDom.value}
        {menuFooterDom.value && (
          <div class={classNames([`${baseClassName.value}-footer`, proProvide.value.hashId, { [`${baseClassName.value}-footer-collapsed`]: props.collapsed }])}>
            {menuFooterDom.value}
          </div>
        )}
      </>
    ))
    return () => {
      const {
        breakpoint = 'lg',
        stylish,
        class: className,
        style,
        navTheme,
        layout,
        siderProps,
        collapsed,
        siderWidth,
        fixedSiderbar,
        isMobile,
        onCollapse,
      } = props
      const siderClassName = classNames(className, proProvide.value.hashId, {
        [`${baseClassName.value}-fixed`]: fixedSiderbar,
        [`${baseClassName.value}-fixed-mix`]: layout === 'mix' && !isMobile && fixedSiderbar,
        [`${baseClassName.value}-collapsed`]: collapsed,
        [`${baseClassName.value}-${layout}`]: layout && !isMobile,
        [`${baseClassName.value}-${layout === 'mix' && !isMobile ? 'light' : navTheme}`]: true,
        [`${baseClassName.value}-mix`]: layout === 'mix' && !isMobile,
        [`${baseClassName.value}-stylish`]: !!stylish,
      })
      return stylishClassName.wrapSSR(
        <>
          {fixedSiderbar && !isMobile && !hideMenuWhenCollapsedClassName.value && (
            <div
              style={{
                width: `${collapsed ? collapsedWidth.value : siderWidth}px`,
                overflow: 'hidden',
                flex: `0 0 ${collapsed ? collapsedWidth.value : siderWidth}px`,
                maxWidth: `${collapsed ? collapsedWidth.value : siderWidth}px`,
                minWidth: `${collapsed ? collapsedWidth.value : siderWidth}px`,
                transition: 'all 0.2s ease 0s',
              }}
            />
          )}
          <LayoutSider
            class={classNames(siderClassName, proProvide.value.hashId, hideMenuWhenCollapsedClassName.value)}
            style={style}
            collapsed={collapsed}
            collapsedWidth={collapsedWidth.value}
            collapsible
            breakpoint={breakpoint === false ? undefined : breakpoint}
            theme={theme.value}
            onCollapse={(collapse: boolean) => {
              if (isMobile)
                return
              onCollapse?.(collapse)
            }}
            width={siderWidth}
            {...siderProps}
          >
            {hideMenuWhenCollapsedClassName.value
              ? (
                  <div
                    class={classNames(`${baseClassName.value}-hide-when-collapsed`, proProvide.value.hashId)}
                    style={{
                      height: '100%',
                      width: '100%',
                      opacity: hideMenuWhenCollapsedClassName.value ? 0 : 1,
                    }}
                  >
                    {menuDomItems.value}
                  </div>
                )
              : (
                  menuDomItems.value
                )}
            {collapsedDom.value ? <div class={classNames(`${baseClassName.value}-collapsed-button`, proProvide.value.hashId)}>{collapsedDom.value}</div> : null}
          </LayoutSider>
        </>,
      )
    }
  },
})

export default SiderMenu

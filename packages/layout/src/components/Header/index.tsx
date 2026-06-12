import type { GenerateStyle } from '@antdv-next1/pro-provider'
import type { ExtractPropTypes, PropType, SlotsType } from 'vue'
import type { HeaderRender, MenuItemRender, SlotsRenderType } from '../../RenderTypings'
import type { VueNode, WithFalse } from '../../typing'
import type { ProLayoutHeaderToken } from './style/header'
import { useProConfig } from '@antdv-next1/pro-provider'
import { getSlot } from '@antdv-next1/pro-utils'
import { classNames } from '@v-c/util'
import { LayoutHeader } from 'antdv-next'
import { computed, defineComponent } from 'vue'
import { clearMenuItem } from '../../utils'
import GlobalHeader from '../GlobalHeader'
import { globalHeaderProps } from '../GlobalHeader/globalHeaderProps'
import { privateSiderMenuProps } from '../SiderMenu/siderMenuProps'
import TopNavHeader from '../TopNavHeader'
import { useStyle } from './style/header'
import { useStylish } from './style/stylish'

export function headerViewProps() {
  return {
    ...globalHeaderProps(),
    headerRender: {
      type: [Function, Boolean] as PropType<WithFalse<HeaderRender>>,
      default: undefined,
    },
    selectedKeys: {
      type: Array as PropType<string[]>,
      default: undefined,
    },
    openKeys: {
      type: [Boolean, Array] as PropType<WithFalse<string[]>>,
      default: undefined,
    },
    collapsedWidth: {
      type: Number as PropType<number>,
      default: undefined,
    },
    /**
     * @name location 当前应用会话的位置信息。如果你的应用创建了自定义的 history，则需要显示指定 location 属性
     */
    location: {
      type: Object as PropType<{
        path?: string
      }>,
      default: undefined,
    },
    menuItemRender: {
      type: [Function, Boolean] as PropType<WithFalse<MenuItemRender>>,
      default: undefined,
    },
    siderWidth: {
      type: Number as PropType<number>,
      default: undefined,
    },
  }
}

export type HeaderViewProps = Partial<ExtractPropTypes<ReturnType<typeof headerViewProps>>>

const HeaderView = defineComponent({
  name: 'HeaderView',
  inheritAttrs: false,
  props: {
    ...headerViewProps(),
    ...privateSiderMenuProps(),
    hasSiderMenu: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
  },
  slots: Object as SlotsType<
    Pick<
      SlotsRenderType,
      'headerRender' | 'menuRender' | 'menuHeaderRender' | 'actionsRender' | 'appListRender' | 'menuItemRender' | 'headerTitleRender' | 'headerContentRender'
    > & {
      default: () => VueNode[]
    }
  >,
  setup(props, { slots }) {
    const proProvide = useProConfig()
    const baseClassName = computed(() => `${props.prefixCls}-layout-header`)
    const needFixedHeader = computed(() => props.fixedHeader || props.layout === 'mix')
    const { wrapSSR, hashId } = useStyle(baseClassName)
    const collapsedWidth = computed(() => props.collapsedWidth || 64)
    const isTop = computed(() => props.layout === 'top')
    const stylish = useStylish(
      computed(() => `${baseClassName.value}.${baseClassName.value}-stylish`),
      {
        proLayoutCollapsedWidth: collapsedWidth,
        stylish: computed(() => props.stylish as GenerateStyle<ProLayoutHeaderToken>),
      },
    )
    const renderContent = () => {
      const { onCollapse, menuData = [], isMobile } = props
      const clearMenuData = clearMenuItem(menuData || [])
      const headerContentRender = getSlot(slots, props, 'headerContentRender')
      const headerRender = getSlot(slots, props, 'headerRender')
      const headerTitleRender = getSlot(slots, props, 'headerTitleRender')
      const menuRender = getSlot(slots, props, 'menuRender')
      const menuHeaderRender = getSlot(slots, props, 'menuHeaderRender')
      const actionsRender = getSlot(slots, props, 'actionsRender')
      const appListRender = getSlot(slots, props, 'appListRender')
      let defaultDom = (
        <GlobalHeader
          {...props}
          headerContentRender={headerContentRender}
          menuRender={menuRender}
          menuHeaderRender={menuHeaderRender}
          actionsRender={actionsRender}
          appListRender={appListRender}
          headerTitleRender={headerTitleRender}
          onCollapse={props.onCollapse}
          menuData={clearMenuData}
        >
          {headerContentRender && headerContentRender({ props, dom: null })}
        </GlobalHeader>
      )
      if (isTop.value && !isMobile) {
        defaultDom = (
          <TopNavHeader
            {...props}
            headerContentRender={headerContentRender}
            menuRender={menuRender}
            menuHeaderRender={menuHeaderRender}
            actionsRender={actionsRender}
            appListRender={appListRender}
            headerTitleRender={headerTitleRender}
            mode="horizontal"
            onCollapse={onCollapse}
            menuData={clearMenuData}
          />
        )
      }
      if (headerRender && typeof headerRender === 'function') {
        return headerRender({ props: { ...props, headerContentRender, menuRender, menuHeaderRender, actionsRender, appListRender }, dom: defaultDom })
      }
      return defaultDom
    }
    return () => {
      const { layout, headerRender, hasSiderMenu, style, class: className, isMobile, collapsed, siderWidth } = props

      if (layout === 'side' && headerRender === false)
        return null

      return stylish.wrapSSR(
        wrapSSR(
          <>
            {needFixedHeader.value && (
              <LayoutHeader
                style={{
                  ...style,
                  height: `${proProvide.value.token.layout?.header?.heightLayoutHeader || 56}px`,
                  lineHeight: `${proProvide.value.token.layout?.header?.heightLayoutHeader || 56}px`,
                  backgroundColor: 'transparent',
                }}
              />
            )}
            <LayoutHeader
              class={classNames(className, hashId.value, baseClassName.value, {
                [`${baseClassName.value}-fixed`]: needFixedHeader.value,
                [`${baseClassName.value}-stylish`]: !!props.stylish,
              })}
              style={{
                ...style,
                width:
                  !needFixedHeader.value || layout !== 'side' || isMobile || !hasSiderMenu
                    ? '100%'
                    : `calc(100% - ${collapsed ? collapsedWidth.value : siderWidth}px)`,
              }}
            >
              {renderContent()}
            </LayoutHeader>
          </>,
        ),
      )
    }
  },
})

export default HeaderView

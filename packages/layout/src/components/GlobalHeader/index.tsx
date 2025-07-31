import type { VueNode } from '../../typing';
import type { SiderMenuProps } from '../SiderMenu/SiderMenu';
import { computed, defineComponent } from 'vue';
import { privateSiderMenuProps, renderLogoAndTitle } from '../SiderMenu/SiderMenu';
import { useConfigContextInject } from 'ant-design-vue/es/config-provider/context';
import { useStyle } from './style';
import { classNames } from '@ant-design-vue/pro-utils';
import { clearMenuItem } from '../../utils';
import { useProConfigContextInject } from '@ant-design-vue/pro-provider';
import CollapsedIcon from '../CollapsedIcon';
import AppsLogoComponents, { defaultRenderLogo } from '../AppsLogoComponents';
import { globalHeaderProps } from './globalHeaderProps';
import ActionsContent from './ActionsContent';
import TopNavHeader from '../TopNavHeader';

const renderLogo = (
  menuHeaderRender: SiderMenuProps['menuHeaderRender'],
  logoDom: VueNode,
  props: SiderMenuProps
) => {
  if (menuHeaderRender === false) {
    return null;
  }
  if (menuHeaderRender) {
    return menuHeaderRender(logoDom, null, props);
  }
  return logoDom;
};

const GlobalHeader = defineComponent({
  name: 'GlobalHeader',
  inheritAttrs: false,
  props: {
    ...globalHeaderProps(),
    ...privateSiderMenuProps(),
  },
  setup(props, { slots, attrs }) {
    const { getPrefixCls, direction } = useConfigContextInject();
    const proProvide = useProConfigContextInject();
    const baseClassName = computed(() => `${props.prefixCls || getPrefixCls('pro')}-global-header`);
    const { wrapSSR, hashId } = useStyle(baseClassName);
    return () => {
      const {
        navTheme,
        layout,
        isMobile,
        onCollapse,
        menuHeaderRender,
        actionsRender,
        avatarProps,
        onMenuHeaderClick,
        logo,
        menuData,
        splitMenus,
        collapsed,
      } = props;
      if (layout === 'mix' && !isMobile && splitMenus) {
        const noChildrenMenuData = (menuData || []).map((item) => ({
          ...item,
          children: undefined,
        }));
        const clearMenuData = clearMenuItem(noChildrenMenuData);
        return (
          <TopNavHeader {...props} mode="horizontal" splitMenus={false} menuData={clearMenuData} />
        );
      }
      const logoClassNames = classNames(`${baseClassName.value}-logo`, hashId.value, {
        [`${baseClassName.value}-logo-rtl`]: direction?.value === 'rtl',
        [`${baseClassName.value}-logo-mix`]: layout === 'mix',
        [`${baseClassName.value}-logo-mobile`]: isMobile,
      });
      const logoDom = (
        <span class={logoClassNames} key="logo">
          <a>{defaultRenderLogo(logo)}</a>
        </span>
      );
      return wrapSSR(
        <div
          class={classNames(attrs.class, baseClassName.value, hashId.value, {
            [`${baseClassName.value}-light`]:
              navTheme === 'light' || (layout === 'side' && navTheme !== 'realDark') || isMobile,
            [`${baseClassName.value}-dark`]: navTheme === 'dark' && layout !== 'side' && !isMobile,
            [`${baseClassName.value}-realDark`]: navTheme === 'realDark' && layout !== 'mix',
          })}
        >
          {isMobile && renderLogo(menuHeaderRender, logoDom, props)}
          {layout === 'mix' && !isMobile && (
            <>
              <AppsLogoComponents {...props} />
              <div class={logoClassNames} onClick={onMenuHeaderClick}>
                {renderLogoAndTitle({ ...props, collapsed: false }, 'headerTitleRender')}
              </div>
            </>
          )}
          {isMobile || layout === 'side' ? (
            <span
              class={classNames(`${baseClassName.value}-collapsed-button`, hashId.value)}
              style={{
                marginInlineStart: `${proProvide.value.token.marginXS}px`,
              }}
              onClick={() => onCollapse?.(!collapsed)}
            >
              <CollapsedIcon collapsed={collapsed!} tabIndex="-1" />
            </span>
          ) : null}

          <div style={{ flex: 1 }}>{slots.default?.()}</div>
          {(actionsRender || avatarProps) && (
            <ActionsContent {...props} prefixCls={baseClassName.value} />
          )}
        </div>
      );
    };
  },
});

export default GlobalHeader;

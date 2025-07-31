import type { ExtractPropTypes, CSSProperties } from 'vue';
import type { HeaderRenderKey } from '../SiderMenu/SiderMenu';
import { computed, defineComponent } from 'vue';
import { ConfigProvider } from 'ant-design-vue';
import { classNames, useMemo } from '@ant-design-vue/pro-utils';
import { renderLogoAndTitle } from '../SiderMenu/SiderMenu';
import { useConfigContextInject } from 'ant-design-vue/es/config-provider/context';
import BaseMenu from '../SiderMenu/BaseMenu';
import ActionsContent from '../GlobalHeader/ActionsContent';
import { useStyle } from './style';
import AppsLogoComponents from '../AppsLogoComponents';
import { siderMenuProps, privateSiderMenuProps } from '../SiderMenu/SiderMenu';
import { globalHeaderProps } from '../GlobalHeader/globalHeaderProps';
import { isNeedOpenHash, setAlpha, useProConfigContextInject } from '@ant-design-vue/pro-provider';

export const topNavHeaderProps = () => ({
  ...siderMenuProps(),
  ...globalHeaderProps(),
  ...privateSiderMenuProps(),
});
export type TopNavHeaderProps = Partial<ExtractPropTypes<ReturnType<typeof topNavHeaderProps>>>;

const TopNavHeader = defineComponent({
  name: 'TopNavHeader',
  inheritAttrs: false,
  props: topNavHeaderProps(),
  setup(props, { attrs }) {
    const { getPrefixCls } = useConfigContextInject();
    const proProvide = useProConfigContextInject();
    const prefixCls = computed(() => `${props.prefixCls || getPrefixCls('pro')}-top-nav-header`);

    const { wrapSSR, hashId } = useStyle(prefixCls);

    const headerDom = computed(() => {
      let renderKey: HeaderRenderKey | undefined = undefined;
      if (props.menuHeaderRender !== undefined) {
        renderKey = 'menuHeaderRender';
      } else if (props.layout === 'mix' || props.layout === 'top') {
        renderKey = 'headerTitleRender';
      }
      return renderLogoAndTitle({ ...props, collapsed: false }, renderKey);
    });
    const menuToken = useMemo(() => {
      if (
        (props.navTheme === 'realDark' && props.layout !== 'mix') ||
        (props.navTheme === 'dark' && props.layout !== 'side') ||
        (props.layout === 'mix' && props.splitMenus && props.navTheme === 'realDark') ||
        (props.layout === 'mix' && props.splitMenus && props.navTheme === 'dark')
      ) {
        return {
          colorItemBg: props.token?.header?.colorBgHeader || '#001529',
          radiusItem: proProvide.value.token.borderRadiusLG,
          colorItemBgSelected:
            props.token?.header?.colorBgMenuItemSelected || proProvide.value.token?.colorPrimary,
          colorItemBgHover: props.token?.header?.colorBgMenuItemHover || 'transparent',
          colorItemBgSelectedHorizontal:
            props.token?.header?.colorBgMenuItemSelectedHorizontal ||
            proProvide.value.token.colorPrimary,
          colorItemText:
            props.token?.header?.colorTextMenu ||
            setAlpha(proProvide.value.token?.colorTextLightSolid, 0.65),
          colorItemTextHoverHorizontal:
            props.token?.header?.colorTextMenuActive || proProvide.value.token?.colorText,
          colorItemTextSelectedHorizontal:
            props.token?.header?.colorTextMenuSelected ||
            proProvide.value.token?.colorTextLightSolid,
          colorItemTextHover:
            proProvide.value.token.layout?.header?.colorTextMenuActive ||
            proProvide.value.token?.colorText,
          colorItemTextSelected:
            props.token?.header?.colorTextMenuSelected ||
            proProvide.value.token?.colorTextLightSolid,
        };
      }
      return {
        colorItemBg: proProvide.value.token.layout?.header?.colorBgHeader || 'transparent',
        radiusItem: proProvide.value.token.borderRadiusLG,
        colorItemBgSelected:
          proProvide.value.token.layout?.header?.colorBgMenuItemSelected ||
          proProvide.value.token?.controlItemBgActive,
        colorItemBgHover:
          proProvide.value.token.layout?.header?.colorBgMenuItemHover ||
          proProvide.value.token?.colorBgTextHover,
        colorItemBgSelectedHorizontal:
          proProvide.value.token.layout?.header?.colorBgMenuItemSelectedHorizontal || 'transparent',
        colorItemText:
          proProvide.value.token.layout?.header?.colorTextMenu || proProvide.value.token?.colorText,
        colorItemTextHoverHorizontal:
          proProvide.value.token.layout?.header?.colorTextMenuActive ||
          proProvide.value.token?.colorPrimary,
        colorItemTextSelectedHorizontal:
          proProvide.value.token.layout?.header?.colorTextMenuSelected ||
          proProvide.value.token?.colorPrimary,
        colorItemTextHover:
          proProvide.value.token.layout?.header?.colorTextMenuActive ||
          proProvide.value.token?.colorPrimary,
        colorItemTextSelected:
          proProvide.value.token.layout?.header?.colorTextMenuSelected ||
          proProvide.value.token?.colorPrimary,
      };
    }, [
      () => props.navTheme,
      () => props.splitMenus,
      () => props.layout,
      () => props.token,
      () => proProvide.value.token,
    ]);
    const contentDom = useMemo(() => {
      const defaultDom = (
        <ConfigProvider
          theme={{
            hashed: isNeedOpenHash(),
            components: {
              Menu: menuToken.value,
            },
          }}
        >
          <BaseMenu
            {...props}
            class={classNames(`${prefixCls.value}-base-menu`, hashId.value)}
            theme={props.navTheme !== 'realDark' ? props.navTheme : 'dark'}
            collapsed={false}
            menuRenderType="header"
            mode="horizontal"
          />
        </ConfigProvider>
      );
      if (props.headerContentRender) {
        return props.headerContentRender(props, defaultDom);
      }
      return defaultDom;
    }, [
      () => props.matchMenuKeys,
      () => props.navTheme,
      () => props.layout,
      () => menuToken.value,
      () => props.headerContentRender,
      () => prefixCls.value,
      () => hashId.value,
    ]);

    return () => {
      const { contentWidth, layout, actionsRender, onMenuHeaderClick, navTheme, avatarProps } =
        props;
      return wrapSSR(
        <div
          class={classNames(prefixCls.value, hashId.value, attrs.class, {
            [`${prefixCls.value}-${navTheme}`]: true,
          })}
          style={attrs.style as CSSProperties}
        >
          <div
            class={classNames(`${prefixCls.value}-main`, hashId.value, {
              [`${prefixCls.value}-wide`]: contentWidth === 'Fixed' && layout === 'top',
            })}
          >
            {headerDom.value && (
              <div
                class={classNames(`${prefixCls.value}-main-left`, hashId.value)}
                onClick={onMenuHeaderClick}
              >
                <AppsLogoComponents {...props} />
                <div
                  class={classNames(`${prefixCls.value}-logo`, hashId.value)}
                  key="logo"
                  id="logo"
                >
                  {headerDom.value}
                </div>
              </div>
            )}
            <div style={{ flex: 1 }} class={classNames(`${prefixCls.value}-menu`, hashId.value)}>
              {contentDom.value}
            </div>
            {(actionsRender || avatarProps) && (
              <ActionsContent {...props} prefixCls={prefixCls.value} />
            )}
          </div>
        </div>
      );
    };
  },
});
export default TopNavHeader;

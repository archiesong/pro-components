import type { App, DefineComponent, Plugin, UnwrapRef } from 'vue';
import type {
  ActionsRender,
  AppListRender,
  BreadcrumbRender,
  CollapsedButtonRender,
  ErrorBoundaryRender,
  FooterRender,
  HeaderContentRender,
  HeaderRender,
  HeaderTitleRender,
  MenuContentRender,
  MenuExtraRender,
  MenuFooterRender,
  MenuHeaderRender,
  MenuItemRender,
  MenuRender,
  PageTitleRender,
  SubMenuItemRender,
  TagsViewRender,
} from './RenderTypings';
import type { ProLayoutProps } from './proLayoutProps';
import { defineComponent, isRef } from 'vue';
import { ConfigProvider as AntdConfigProvider } from 'ant-design-vue';
import ProConfigProvider from '@ant-design-vue/pro-provider';
import { useConfigContextInject } from 'ant-design-vue/es/config-provider/context';
import BasicLayout from './BasicLayout';
import { getSlot, isBrowser } from '@ant-design-vue/pro-utils';
import { Logo } from './assert/Logo';
import { proLayoutProps } from './proLayoutProps';
import LeftMenuLayout from './LeftMenuLayout';
const ProLayout = defineComponent({
  name: 'ProLayout',
  inheritAttrs: false,
  props: proLayoutProps(),
  emits: ['update:collapsed', 'collapse'],
  setup(props, { slots, attrs, emit }) {
    const configProviderInnerProps = useConfigContextInject();
    return () => {
      const { colorPrimary, navTheme, prefixCls } = props;

      const configProviderProps = (
        Object.keys(configProviderInnerProps) as Array<keyof typeof configProviderInnerProps>
      ).reduce(
        (prev, key) => {
          const temp = configProviderInnerProps[key];
          if (isRef(temp)) {
            prev[key] = temp.value;
          } else {
            prev[key] = temp;
          }
          return prev;
        },
        {} as Record<keyof typeof configProviderInnerProps, any>
      ) as UnwrapRef<typeof configProviderInnerProps>;

      const darkProps =
        navTheme !== undefined
          ? {
              dark: navTheme === 'realDark',
            }
          : {};

      const compactProps = props.compact !== undefined ? { compact: props.compact } : {};
      const footerRender = getSlot<FooterRender>(slots, props, 'footerRender');
      const breadcrumbRender = getSlot<BreadcrumbRender>(slots, props, 'breadcrumbRender');
      const pageTitleRender = getSlot<PageTitleRender>(slots, props, 'pageTitleRender');
      const actionsRender = getSlot<ActionsRender>(slots, props, 'actionsRender');
      const collapsedButtonRender = getSlot<CollapsedButtonRender>(
        slots,
        props,
        'collapsedButtonRender'
      );
      const appListRender = getSlot<AppListRender>(slots, props, 'appListRender');
      const headerRender = getSlot<HeaderRender>(slots, props, 'headerRender');
      const headerTitleRender = getSlot<HeaderTitleRender>(slots, props, 'headerTitleRender');
      const headerContentRender = getSlot<HeaderContentRender>(slots, props, 'headerContentRender');

      // menu
      const menuRender = getSlot<MenuRender>(slots, props, 'menuRender');
      const menuItemRender = getSlot<MenuItemRender>(slots, props, 'menuItemRender');
      const subMenuItemRender = getSlot<SubMenuItemRender>(slots, props, 'subMenuItemRender');
      const menuHeaderRender = getSlot<MenuHeaderRender>(slots, props, 'menuHeaderRender');
      const menuContentRender = getSlot<MenuContentRender>(slots, props, 'menuContentRender');
      const menuExtraRender = getSlot<MenuExtraRender>(slots, props, 'menuExtraRender');
      const menuFooterRender = getSlot<MenuFooterRender>(slots, props, 'menuFooterRender');
      const tagsViewRender = getSlot<TagsViewRender>(slots, props, 'tagsViewRender');
      // errorBoundary
      const errorBoundaryRender = getSlot<ErrorBoundaryRender>(slots, props, 'errorBoundaryRender');
      const Layout = props.layout === 'left' ? LeftMenuLayout : BasicLayout;
      return (
        <AntdConfigProvider
          {...configProviderProps}
          prefixCls={configProviderProps.getPrefixCls()}
          theme={
            colorPrimary
              ? {
                  ...configProviderProps.theme,
                  token: {
                    ...configProviderProps.theme?.token,
                    colorPrimary,
                  },
                }
              : undefined
          }
        >
          <ProConfigProvider
            autoClearCache
            {...darkProps}
            {...compactProps}
            token={props.token}
            prefixCls={prefixCls}
          >
            <Layout
              {...{
                ...props,
                pageTitleRender,
                footerRender,
                breadcrumbRender,
                errorBoundaryRender,
                collapsedButtonRender,
                appListRender,
                actionsRender,
                menuItemRender,
                menuRender,
                menuExtraRender,
                menuHeaderRender,
                menuContentRender,
                menuFooterRender,
                tagsViewRender,
                subMenuItemRender,
                headerRender,
                headerContentRender,
                headerTitleRender,
              }}
              {...attrs}
              logo={props.logo || <Logo />}
              location={
                isBrowser()
                  ? props.location || {
                      pathname: location.pathname || '/',
                    }
                  : undefined
              }
              onCollapse={(collapsed: boolean) => {
                emit('update:collapsed', collapsed);
                emit('collapse', collapsed);
              }}
            >
              {slots.default?.()}
            </Layout>
          </ProConfigProvider>
        </AntdConfigProvider>
      );
    };
  },
});

ProLayout.install = (app: App) => {
  app.component(ProLayout.name as string, ProLayout);
  return app;
};

export default ProLayout as DefineComponent<ProLayoutProps> & Plugin;

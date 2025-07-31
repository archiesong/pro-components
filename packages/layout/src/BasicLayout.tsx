import type { Ref } from 'vue';
import type { VueNode } from 'ant-design-vue/es/_util/type';
import type { MenuDataItem } from './typing';
import type { GetPageTitleProps } from './getPageTitle';
import type { ProSettings } from './defaultSettings';
import type { ProLayoutProps } from './proLayoutProps';
import type { BreadcrumbProLayoutProps } from './utils/getBreadcrumbProps';
import { defineComponent, computed, toRef } from 'vue';
import { Layout, ConfigProvider } from 'ant-design-vue';
import warning from 'ant-design-vue/es/_util/warning';
import {
  classNames,
  useMemo,
  useCallback,
  useBreakpoint,
  omit,
  useMountMergeState,
  useState,
  useDocumentTitle,
} from '@ant-design-vue/pro-utils';
import { isNeedOpenHash, useProConfigContextInject, setAlpha } from '@ant-design-vue/pro-provider';
import { useStyle } from './style';
import { gLocaleObject } from './locales';
import getMenuData from './utils/getMenuData';
import { getMatchMenu } from '@ant-design-vue/route-utils';
import Header from './components/Header';
import Footer from './components/Footer';
import { useConfigContextInject } from 'ant-design-vue/es/config-provider/context';
import useCurrentMenuLayoutProps from './utils/useCurrentMenuLayoutProps';
import { clearMenuItem } from './utils';
import SiderMenu from './components/SiderMenu';
import WrapContent from './WrapContent';
import { proLayoutProps } from './proLayoutProps';
import { useRouteContextProvider, useRouteContextInject } from './context/RouteContext';
import PageLoading from './components/PageLoading';
import { getPageTitleInfo } from './getPageTitle';
import { getBreadcrumbProps } from './utils/getBreadcrumbProps';

const headerRender = (
  props: ProLayoutProps & { hasSiderMenu: boolean; isMobile: boolean },
  matchMenuKeys: string[]
): VueNode => {
  if (props.headerRender === false || props.pure) {
    return null;
  }
  return <Header matchMenuKeys={matchMenuKeys} {...props} stylish={props.stylish?.header} />;
};

const defaultPageTitleRender = (
  pageProps: GetPageTitleProps,
  props: ProLayoutProps
): {
  title: string;
  id: string;
  pageName: string;
} => {
  const { pageTitleRender } = props;
  const pageTitleInfo = getPageTitleInfo(pageProps);
  if (pageTitleRender === false) {
    return {
      title: props.title || '',
      id: '',
      pageName: '',
    };
  }
  if (pageTitleRender) {
    const title = pageTitleRender(pageProps, pageTitleInfo.title, pageTitleInfo);
    if (typeof title === 'string') {
      return getPageTitleInfo({
        ...pageTitleInfo,
        title,
      });
    }
    warning(
      typeof title === 'string',
      'pro-layout: ',
      'renderPageTitle return value should be a string'
    );
  }
  return pageTitleInfo;
};
const getPaddingInlineStart = (
  hasLeftPadding: boolean,
  collapsed: boolean | undefined,
  siderWidth: number,
  collapsedWidth: number
): number | undefined => {
  if (hasLeftPadding) {
    return collapsed ? collapsedWidth : siderWidth;
  }
  return 0;
};
const renderSiderMenu = (props: ProLayoutProps, matchMenuKeys: string[]): VueNode => {
  const {
    layout,
    isMobile,
    selectedKeys,
    openKeys,
    splitMenus,
    suppressSiderWhenMenuEmpty,
    menuRender,
  } = props;
  if (props.menuRender === false || props.pure) {
    return null;
  }
  let { menuData } = props;
  /** 如果是分割菜单模式，需要专门实现一下 */
  if (splitMenus && (openKeys !== false || layout === 'mix') && !isMobile) {
    const [key] = selectedKeys || matchMenuKeys;
    if (key) {
      menuData = props.menuData?.find((item: MenuDataItem) => item.key === key)?.children || [];
    } else {
      menuData = [];
    }
  }
  // 这里走了可以少一次循环
  const clearMenuData = clearMenuItem(menuData || []);
  if (clearMenuData && clearMenuData?.length < 1 && (splitMenus || suppressSiderWhenMenuEmpty)) {
    return null;
  }
  if (layout === 'top' && !isMobile) {
    return (
      <SiderMenu {...props} matchMenuKeys={matchMenuKeys} hide stylish={props.stylish?.sider} />
    );
  }
  const defaultDom = (
    <SiderMenu
      {...props}
      matchMenuKeys={matchMenuKeys}
      // 这里走了可以少一次循环
      menuData={clearMenuData}
      stylish={props.stylish?.sider}
    />
  );
  if (menuRender) {
    return menuRender(props, defaultDom);
  }
  return defaultDom;
};

const tagsViewRender = (props: ProLayoutProps): VueNode => {
  if (props.tagsViewRender === false || props.pure) {
    return null;
  }
  if (props.tagsViewRender) {
    return props.tagsViewRender(props);
  }
  return null;
};

const footerRender = (props: ProLayoutProps): VueNode => {
  if (props.footerRender === false || props.pure) {
    return null;
  }
  if (props.footerRender) {
    return props.footerRender({ ...props }, <Footer />);
  }
  return null;
};

const BasicLayout = defineComponent({
  name: 'BasicLayout',
  inheritAttrs: false,
  props: proLayoutProps(),
  setup(props, { slots, attrs }) {
    const { getPrefixCls, locale } = useConfigContextInject();
    const prefixCls = computed(() => props.prefixCls ?? getPrefixCls('pro'));
    const proLayoutClassName = computed(() => `${prefixCls.value}-basicLayout`);
    const { wrapSSR, hashId } = useStyle(proLayoutClassName);
    const proProvide = useProConfigContextInject();

    const siderWidth = useMemo(
      () => props.siderWidth || 256,
      [() => props.layout, () => props.siderWidth]
    );
    const collapsedWidth = useMemo(() => props.collapsedWidth || 64, [() => props.collapsedWidth]);
    /**
     * 处理国际化相关 formatMessage
     * 如果有用户配置的以用户为主
     * 如果没有用自己实现的
     */
    const formatMessage = useCallback(
      ({ id, defaultMessage, ...restParams }: { id: string; defaultMessage?: string }) => {
        if (props.formatMessage) {
          return props.formatMessage({
            id,
            defaultMessage,
            ...restParams,
          });
        }
        const locales = gLocaleObject(locale?.value.locale);
        return locales[id] ? locales[id] : (defaultMessage as string);
      },
      [() => props.formatMessage, () => locale?.value]
    );

    const menuInfoData = useMemo(
      () => getMenuData(props.routes || [], props.menu, formatMessage.value, props.menuDataRender),
      [() => formatMessage.value, () => props.menu, () => props.menuDataRender, () => props.routes]
    );

    const matchMenus = useMemo(() => {
      return getMatchMenu(props.location?.pathname || '/', menuInfoData.value.menuData || [], true);
    }, [() => (props.location || {}).pathname, () => menuInfoData.value.menuData]);
    const matchMenuKeys = useMemo(
      () => Array.from(new Set(matchMenus.value.map((item) => item.key || item.path || ''))),
      [() => matchMenus.value]
    );
    // 当前选中的menu，一般不会为空
    const currentMenu = useMemo(
      () =>
        (matchMenus.value[matchMenus.value.length - 1] || {}) as MenuDataItem & {
          meta: Pick<MenuDataItem, 'meta'> & ProSettings;
        },
      [() => matchMenus.value]
    );
    const currentMenuLayoutProps = useCurrentMenuLayoutProps(currentMenu);
    const colSize = useBreakpoint();
    const isMobile = useMemo(
      () => (colSize.value === 'sm' || colSize.value === 'xs') && !props.disableMobile,
      [() => colSize.value, () => props.disableMobile]
    );
    // If it is a fix menu, calculate padding
    // don't need padding in phone mode
    /* Checking if the menu is loading and if it is, it will return a skeleton loading screen. */
    const hasLeftPadding = computed(() => props.layout !== 'top' && !isMobile.value);

    const [collapsed, onCollapse] = useMountMergeState<boolean>(
      () => {
        if (props.defaultCollapsed !== undefined) return props.defaultCollapsed;
        if (isMobile.value) return true;
        return colSize.value === 'md';
      },
      {
        value:
          props.collapsed === undefined ? undefined : (toRef(props, 'collapsed') as Ref<boolean>),
        onChange: props.onCollapse,
      }
    );
    /** 计算 slider 的宽度 */
    const leftSiderWidth = computed(() =>
      getPaddingInlineStart(
        !!hasLeftPadding.value,
        collapsed.value,
        siderWidth.value,
        collapsedWidth.value
      )
    );
    const defaultProps = computed(() =>
      omit(
        {
          ...props,
          prefixCls: prefixCls.value,
          siderWidth: siderWidth.value,
          ...currentMenuLayoutProps.value,
          formatMessage: formatMessage.value,
          breadcrumb: menuInfoData.value.breadcrumb,
          menu: {
            ...props.menu,
            type: props.siderMenuType || props.menu?.type,
          },
        },
        ['breadcrumbRender']
      )
    );
    const routeContextProvide = useRouteContextInject();
    // gen breadcrumbProps, parameter for pageHeader
    const breadcrumbProps = computed(() =>
      getBreadcrumbProps(
        {
          ...(defaultProps.value as BreadcrumbProLayoutProps),
          breadcrumbRender: props.breadcrumbRender,
          breadcrumbMap: menuInfoData.value.breadcrumbMap,
        },
        props
      )
    );
    // 如果 props 中定义，以 props 为准
    const isChildrenLayout = computed(() =>
      props.isChildrenLayout !== undefined
        ? props.isChildrenLayout
        : routeContextProvide.value.isChildrenLayout
    );
    const [hasFooterToolbar, setHasFooterToolbar] = useState(false);
    /**
     * 使用number是因为多标签页的时候有多个 PageContainer，只有有任意一个就应该展示这个className
     */
    const [hasPageContainer, setHasPageContainer] = useState(0);
    // gen page title
    const pageTitleInfo = computed(() =>
      defaultPageTitleRender(
        {
          ...defaultProps.value,
          pathname: (props.location || {})?.pathname || '/',
          breadcrumbMap: menuInfoData.value.breadcrumbMap,
        },
        props
      )
    );
    const bgImgStyleList = useMemo(() => {
      if (props.bgLayoutImgList && props.bgLayoutImgList.length > 0) {
        return props.bgLayoutImgList.map(({ src, ...rest }, index) => {
          return (
            <img
              key={index}
              src={src}
              alt={''}
              style={{
                position: 'absolute',
                ...Object.entries(rest).reduce((pre, [key, value]) => {
                  return {
                    ...pre,
                    [key]: typeof value === 'number' ? `${value}px` : value,
                  };
                }, {}),
              }}
            />
          );
        });
      }
      return null;
    }, [() => props.bgLayoutImgList]);

    const siderMenuDom = computed(() =>
      renderSiderMenu(
        {
          ...defaultProps.value,
          menuData: menuInfoData.value.menuData,
          onCollapse,
          isMobile: isMobile.value,
          collapsed: collapsed.value,
        },
        matchMenuKeys.value
      )
    );
    // render header dom
    const headerDom = computed(() =>
      headerRender(
        {
          ...defaultProps.value,
          hasSiderMenu: !!siderMenuDom.value,
          menuData: menuInfoData.value.menuData,
          isMobile: isMobile.value,
          collapsed: collapsed.value,
          onCollapse,
        },
        matchMenuKeys.value
      )
    );
    const tagsViewDom = computed(() =>
      tagsViewRender({
        ...defaultProps.value,
        siderWidth: leftSiderWidth.value,
        isMobile: isMobile.value,
        collapsed: collapsed.value,
      })
    );
    // render footer dom
    const footerDom = computed(() =>
      footerRender({
        ...defaultProps.value,
        isMobile: isMobile.value,
        collapsed: collapsed.value,
      })
    );
    const routeContextProps = computed(() => ({
      ...defaultProps.value,
      breadcrumb: breadcrumbProps.value,
      menuData: menuInfoData.value.menuData,
      isMobile: isMobile.value,
      collapsed: collapsed.value,
      title: pageTitleInfo.value.pageName,
      pageTitleInfo: pageTitleInfo.value,
      hasSiderMenu: !!siderMenuDom.value,
      isChildrenLayout: true,
      siderWidth: leftSiderWidth.value,
      matchMenus: matchMenus.value,
      matchMenuKeys: matchMenuKeys.value,
      currentMenu: currentMenu.value,
      hasFooter: !!footerDom.value,
      hasFooterToolbar: hasFooterToolbar.value,
      hasPageContainer: hasPageContainer.value,
      setHasFooterToolbar,
      setHasPageContainer,
    }));

    useRouteContextProvider(routeContextProps);
    useDocumentTitle(
      pageTitleInfo,
      computed(() => props.title || false)
    );
    const menuToken = useMemo(() => {
      if (
        (props.navTheme === 'realDark' && props.layout !== 'mix') ||
        (props.navTheme === 'dark' && props.layout !== 'mix') ||
        (props.layout === 'mix' && isMobile.value && props.navTheme === 'realDark') ||
        (props.layout === 'mix' && isMobile.value && props.navTheme === 'dark')
      ) {
        return {
          colorItemBg: props.token?.sider?.colorMenuBackground || '#001529',
          colorSubItemBg: props.token?.sider?.colorSubMenuBackground || '#000c17',
          radiusItem: proProvide.value.token.borderRadiusLG,
          colorItemBgSelected:
            props.token?.sider?.colorBgMenuItemSelected || proProvide.value.token?.colorPrimary,
          colorItemBgHover: props.token?.sider?.colorBgMenuItemHover || 'transparent',
          colorItemBgActive: props.token?.sider?.colorBgMenuItemActive || 'transparent',
          colorItemBgSelectedHorizontal:
            props.token?.sider?.colorBgMenuItemSelectedHorizontal ||
            proProvide.value.token.colorPrimary,
          colorActiveBarWidth: props.token?.sider?.colorTextMenuActiveBarWidth || 0,
          colorActiveBarHeight: props.token?.sider?.colorTextMenuActiveBarHeight || 0,
          colorActiveBarBorderSize: props.token?.sider?.colorTextMenuActiveBarBorderSize || 0,
          colorItemText:
            props.token?.sider?.colorTextMenu ||
            setAlpha(proProvide.value.token?.colorTextLightSolid, 0.65),
          colorItemTextHover:
            props.token?.sider?.colorTextMenuItemHover ||
            proProvide.value.token.colorTextLightSolid, // 悬浮态
          colorItemTextSelected:
            props.token?.sider?.colorTextMenuSelected || proProvide.value.token.colorTextLightSolid,
        };
      }
      return {
        colorItemBg: proProvide.value.token.layout?.sider?.colorMenuBackground || 'transparent',
        colorSubItemBg:
          proProvide.value.token.layout?.sider?.colorSubMenuBackground || 'transparent',
        radiusItem: proProvide.value.token.borderRadiusLG,
        colorItemBgSelected:
          proProvide.value.token.layout?.sider?.colorBgMenuItemSelected ||
          proProvide.value.token?.controlItemBgActive,
        colorItemBgHover:
          proProvide.value.token.layout?.sider?.colorBgMenuItemHover ||
          proProvide.value.token?.colorBgTextHover,
        colorItemBgActive:
          proProvide.value.token.layout?.sider?.colorBgMenuItemActive ||
          proProvide.value.token?.colorFillContent,
        colorItemBgSelectedHorizontal:
          proProvide.value.token.layout?.sider?.colorBgMenuItemSelectedHorizontal || 'transparent',
        colorActiveBarWidth: proProvide.value.token.layout?.sider?.colorTextMenuActiveBarWidth || 0,
        colorActiveBarHeight:
          proProvide.value.token.layout?.sider?.colorTextMenuActiveBarHeight ||
          proProvide.value.token.lineWidthBold,
        colorActiveBarBorderSize:
          proProvide.value.token.layout?.sider?.colorTextMenuActiveBarBorderSize ||
          proProvide.value.token.lineWidth,
        colorItemText:
          proProvide.value.token.layout?.sider?.colorTextMenu || proProvide.value.token?.colorText,
        colorItemTextHover:
          proProvide.value.token.layout?.sider?.colorTextMenuItemHover ||
          proProvide.value.token.colorText, // 悬浮态
        colorItemTextSelected:
          proProvide.value.token.layout?.sider?.colorTextMenuSelected ||
          proProvide.value.token.colorPrimary,
      };
    }, [
      () => props.navTheme,
      () => isMobile.value,
      () => props.layout,
      () => props.token,
      () => proProvide.value.token,
    ]);
    return () => {
      const { fixedSiderbar, contentStyle, navTheme, layout, ...rest } = {
        ...props,
        ...currentMenuLayoutProps.value,
      };
      const baseClassName = classNames(attrs.class, hashId.value, proLayoutClassName.value, {
        [`screen-${colSize.value}`]: colSize.value,
        [`${proLayoutClassName.value}-is-children`]: isChildrenLayout.value,
        [`${proLayoutClassName.value}-fix-siderbar`]: fixedSiderbar,
        [`${proLayoutClassName.value}-realDark`]: props.navTheme === 'realDark',
        [`${proLayoutClassName.value}-${props.layout}`]: props.layout,
      });
      return wrapSSR(
        <>
          {props.pure ? (
            slots.default?.()
          ) : (
            <Layout class={baseClassName} style={attrs.style}>
              {bgImgStyleList.value && (
                <div class={`${proLayoutClassName.value}-bg-list ${hashId.value}`}>
                  {bgImgStyleList.value}
                </div>
              )}
              <ConfigProvider
                theme={{
                  hashed: isNeedOpenHash(),
                  token: {
                    controlHeightLG:
                      proProvide.value.token.layout?.sider?.menuHeight ||
                      proProvide.value.token?.controlHeightLG,
                  },
                  components: {
                    Menu: menuToken.value,
                  },
                }}
              >
                {siderMenuDom.value}
              </ConfigProvider>
              <Layout>
                {headerDom.value}
                {tagsViewDom.value}
                <WrapContent
                  {...rest}
                  hasPageContainer={hasPageContainer.value}
                  isChildrenLayout={isChildrenLayout.value}
                  hasHeader={!!headerDom.value}
                  prefixCls={proLayoutClassName.value}
                  style={contentStyle}
                >
                  {props.loading ? <PageLoading /> : slots.default?.()}
                </WrapContent>
                {footerDom.value}
                {hasFooterToolbar.value && (
                  <div
                    class={`${proLayoutClassName.value}-has-footer`}
                    style={{
                      height: '44px',
                      marginBlockStart: `${proProvide.value.token.layout?.pageContainer?.paddingBlockPageContainerContent}px`,
                    }}
                  />
                )}
              </Layout>
            </Layout>
          )}
        </>
      );
    };
  },
});

export default BasicLayout;

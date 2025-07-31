import type { Plugin, DefineComponent, App, Slots } from 'vue';
import type { SpinProps, BreadcrumbProps, PageHeaderProps } from 'ant-design-vue';
import type { GenerateStyle } from '@ant-design-vue/pro-provider';
import type { RouteContextType } from '../../context/RouteContext';
import type { VueNode } from '../../typing';
import type { stylishToken } from './style/stylish';
import type { PageContainerProps } from './pageContainerProps';
import { computed, defineComponent, isVNode, onMounted, onUnmounted } from 'vue';
import { useConfigContextInject } from 'ant-design-vue/es/config-provider/context';
import { Affix, Watermark, PageHeader, Tabs } from 'ant-design-vue';
import { classNames, useMemo } from '@ant-design-vue/pro-utils';
import { useProConfigContextInject } from '@ant-design-vue/pro-provider';
import { useRouteContextInject } from '../../context/RouteContext';
import GridContent from '../GridContent';
import FooterToolbar from '../FooterToolbar';
import { useStylish } from './style/stylish';
import { useStyle } from './style';
import PageLoading from '../PageLoading';
import { pageContainerProps } from './pageContainerProps';

const genLoading = (spinProps: boolean | SpinProps) => {
  if (typeof spinProps === 'object') {
    return spinProps;
  }
  return { spinning: spinProps };
};

/**
 * Render Footer tabList In order to be compatible with the old version of the PageHeader basically
 * all the functions are implemented.
 */
const renderFooter = ({
  tabList,
  tabActiveKey,
  onTabChange,
  hashId,
  tabBarExtraContent,
  tabProps,
  prefixedClassName,
}: Omit<
  PageContainerProps & {
    prefixedClassName: string;
    hashId: string;
  },
  'title'
>) => {
  if (Array.isArray(tabList) || tabBarExtraContent) {
    return (
      <Tabs
        {...tabProps}
        class={classNames(`${prefixedClassName}-tabs`, hashId)}
        activeKey={tabActiveKey}
        onChange={(key) => {
          if (onTabChange) {
            onTabChange(key);
          }
        }}
        tabBarExtraContent={tabBarExtraContent}
      >
        {tabList?.map((item, index) => {
          return <Tabs.TabPane key={item.key || index} tab={item.tab} {...item} />;
        })}
      </Tabs>
    );
  }
  return null;
};
const renderPageHeader = (
  content: VueNode,
  extraContent: VueNode,
  prefixedClassName: string,
  hashId: string
): VueNode => {
  if (!content && !extraContent) {
    return null;
  }
  return (
    <div class={classNames(`${prefixedClassName}-detail`, hashId)}>
      <div class={classNames(`${prefixedClassName}-main `, hashId)}>
        <div class={classNames(`${prefixedClassName}-row`, hashId)}>
          {content && (
            <div class={classNames(`${prefixedClassName}-content`, hashId)}>{content}</div>
          )}
          {extraContent && (
            <div class={classNames(`${prefixedClassName}-extraContent`, hashId)}>
              {extraContent}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const memoRenderPageHeader = (
  props: PageContainerProps & {
    prefixedClassName: string;
    value: RouteContextType;
    hashId: string;
  },
  slots: Slots
) => {
  const {
    title,
    content,
    pageHeaderRender,
    header,
    prefixedClassName,
    extraContent,
    prefixCls,
    hashId,
    value,
    breadcrumbRender,
    ...restProps
  } = props;
  const getBreadcrumbRender = () => {
    if (!breadcrumbRender) {
      return undefined;
    }
    return breadcrumbRender;
  };

  if (pageHeaderRender === false) {
    return null;
  }

  if (pageHeaderRender) {
    return <> {pageHeaderRender({ ...props, ...value })}</>;
  }

  let pageHeaderTitle = title;
  if (!title && title !== false) {
    pageHeaderTitle = value.title;
  }
  const { contentWidth, layout, ...restValue } = value;
  const pageHeaderProps: PageHeaderProps = {
    ...header,
    ...restProps,
    ...restValue,
    title: pageHeaderTitle,
    footer: renderFooter({
      ...restProps,
      hashId,
      breadcrumbRender,
      prefixedClassName,
    }),
  };
  const { breadcrumb } = pageHeaderProps as {
    breadcrumb: BreadcrumbProps;
  };

  const noHasBreadCrumb =
    (!breadcrumb || (!breadcrumb?.itemRender && !breadcrumb?.routes?.length)) && !breadcrumbRender;

  if (
    ['title', 'subTitle', 'extra', 'tags', 'footer', 'avatar', 'backIcon'].every(
      (item) => !pageHeaderProps[item as 'backIcon']
    ) &&
    noHasBreadCrumb &&
    !content &&
    !extraContent
  ) {
    return null;
  }
  const children = slots.defalut?.();
  return (
    <PageHeader
      {...pageHeaderProps}
      class={classNames(`${prefixedClassName}-wrap-page-header`, hashId, {
        [`${prefixedClassName}-wrap-page-header-wide`]:
          contentWidth === 'Fixed' && layout === 'top',
      })}
      breadcrumb={
        breadcrumbRender === false
          ? undefined
          : {
              ...value.breadcrumbProps,
              ...pageHeaderProps.breadcrumb,
              itemRender:
                getBreadcrumbRender() ||
                value.breadcrumbProps?.itemRender ||
                (pageHeaderProps.breadcrumb as BreadcrumbProps).itemRender,
            }
      }
      prefixCls={prefixCls}
    >
      {children || renderPageHeader(content, extraContent, prefixedClassName, hashId)}
    </PageHeader>
  );
};

const PageContainer = defineComponent({
  name: 'PageContainer',
  inheritAttrs: false,
  props: pageContainerProps(),
  setup(props, { attrs, slots }) {
    const routeContext = useRouteContextInject();

    /** 告诉 props 是否存在 footerBar */
    onMounted(() => {
      routeContext.value?.setHasPageContainer?.(
        (routeContext.value.hasPageContainer || (0 as number)) + 1
      );
    });
    onUnmounted(() => {
      if (!(!routeContext.value || !routeContext.value?.setHasPageContainer)) {
        routeContext.value?.setHasPageContainer?.(
          (routeContext.value.hasPageContainer || (0 as number)) - 1
        );
      }
    });
    const proConfigContext = useProConfigContextInject();

    const { getPrefixCls } = useConfigContextInject();
    const prefixCls = computed(() => props.prefixCls || getPrefixCls('pro'));

    const basePageContainer = computed(() => `${prefixCls.value}-page-container`);

    const { wrapSSR, hashId } = useStyle(
      basePageContainer,
      computed(() => props.token)
    );
    const stylish = useStylish(
      computed(() => `${basePageContainer.value}.${basePageContainer.value}-stylish`),
      {
        stylish: computed(() => props.stylish as GenerateStyle<stylishToken>),
      }
    );
    const memoBreadcrumbRender = useMemo(() => {
      if (props.breadcrumbRender == false) return false;
      return props.breadcrumbRender || props?.header?.breadcrumb?.itemRender;
    }, [() => props.breadcrumbRender, () => props?.header?.breadcrumb?.itemRender]);

    const loadingDom = useMemo(() => {
      // 当loading时一个合法的VNode时，说明用户使用了自定义loading,直接返回改自定义loading
      if (isVNode(props.loading || false)) {
        return props.loading || false;
      }
      // 当传递过来的是布尔值，并且为false时，说明不需要显示loading,返回null
      if (typeof (props.loading || false) === 'boolean' && !(props.loading || false)) {
        return null;
      }
      // 如非上述两种情况，那么要么用户传了一个true,要么用户传了loading配置，使用genLoading生成loading配置后返回PageLoading
      const spinProps = genLoading((props.loading || false) as boolean | SpinProps);
      // 如果传的是loading配置，但spinning传的是false，也不需要显示loading
      return spinProps.spinning ? <PageLoading {...spinProps} /> : null;
    }, [() => props.loading || false]);

    return () => {
      const {
        loading,
        footer,
        affixProps,
        token: propsToken,
        fixedHeader,
        breadcrumbRender,
        footerToolBarProps,
        ...restProps
      } = props;
      const pageHeaderDom = memoRenderPageHeader(
        {
          ...restProps,
          breadcrumbRender: memoBreadcrumbRender.value,
          ghost: true,
          hashId: hashId.value,
          prefixCls: undefined,
          prefixedClassName: basePageContainer.value,
          value: {
            title: routeContext.value.title,
            breadcrumb: routeContext.value.breadcrumb,
            breadcrumbProps: routeContext.value.breadcrumbProps,
            contentWidth: routeContext.value.contentWidth,
            layout: routeContext.value.layout,
          },
        },
        slots
      );
      const contentDom = (
        <>
          {slots.default ? (
            <>
              <div
                class={classNames(`${basePageContainer.value}-children-content`, hashId.value, {
                  [`${basePageContainer.value}-children-content-no-header`]: !pageHeaderDom,
                })}
              >
                {slots.default?.()}
              </div>
            </>
          ) : null}
        </>
      );
      // 只要loadingDom非空我们就渲染loadingDom,否则渲染内容
      const renderContentDom = (
        <>
          {props.waterMarkProps || routeContext.value.waterMarkProps ? (
            <Watermark
              {...{
                ...routeContext.value.waterMarkProps,
                ...props.waterMarkProps,
              }}
            >
              {loadingDom.value || contentDom}
            </Watermark>
          ) : (
            <>{loadingDom.value || contentDom}</>
          )}
        </>
      );

      const containerClassName = classNames(basePageContainer.value, hashId.value, attrs.class, {
        [`${basePageContainer.value}-with-footer`]: footer,
        [`${basePageContainer.value}-with-affix`]: fixedHeader && pageHeaderDom,
        [`${basePageContainer.value}-stylish`]: !!restProps.stylish,
      });
      return wrapSSR(
        stylish.wrapSSR(
          <>
            <div {...attrs} class={containerClassName}>
              {fixedHeader && pageHeaderDom ? (
                // 在 hasHeader 且 fixedHeader 的情况下，才需要设置高度
                <Affix
                  {...affixProps}
                  offsetTop={
                    routeContext.value.hasHeader && routeContext.value.fixedHeader
                      ? proConfigContext.value.token.layout?.header?.heightLayoutHeader
                      : 1
                  }
                  target={affixProps?.target as () => HTMLElement | Window}
                  class={classNames(`${basePageContainer.value}-affix`, hashId.value)}
                >
                  <div class={classNames(`${basePageContainer.value}-wrap`, hashId.value)}>
                    {pageHeaderDom}
                  </div>
                </Affix>
              ) : (
                <div class={classNames(`${basePageContainer.value}-wrap`, hashId.value)}>
                  {pageHeaderDom}
                </div>
              )}
              {renderContentDom && <GridContent>{renderContentDom}</GridContent>}
            </div>
            {footer && (
              <FooterToolbar
                {...footerToolBarProps}
                stylish={restProps.footerStylish}
                prefixCls={prefixCls.value}
              >
                {footer}
              </FooterToolbar>
            )}
          </>
        )
      );
    };
  },
});
PageContainer.install = (app: App) => {
  app.component(PageContainer.name as string, PageContainer);
  return app;
};
export default PageContainer as DefineComponent<PageContainerProps> & Plugin;

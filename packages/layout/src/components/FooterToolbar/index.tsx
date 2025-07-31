import type { VNode, PropType, CSSProperties, ExtractPropTypes } from 'vue';
import type { GenerateStyle } from '@ant-design-vue/pro-provider';
import type { FooterToolbarContentRender } from '../../RenderTypings';
import type { stylishToken } from './style/stylish';
import { computed, defineComponent, Fragment, Teleport } from 'vue';
import { useMemo, classNames, isBrowser, omit, useEffect } from '@ant-design-vue/pro-utils';
import { useStyle } from './style';
import { useStylish } from './style/stylish';
import { useRouteContextInject } from '../../context/RouteContext';
import { useConfigContextInject } from 'ant-design-vue/es/config-provider/context';

export const footerToolbarProps = () => ({
  extra: {
    type: Object as PropType<VNode>,
    default: undefined,
  },
  footerToolbarContentRender: {
    type: [Function, Boolean, Object] as PropType<FooterToolbarContentRender>,
    default: undefined,
  },
  prefixCls: {
    type: String,
    default: undefined,
  },
  stylish: {
    type: Object as PropType<GenerateStyle<stylishToken>>,
    default: undefined,
  },
  portalDom: {
    type: Boolean,
    default: undefined,
  },
});

export type FooterToolbarProps = Partial<ExtractPropTypes<ReturnType<typeof footerToolbarProps>>>;

const FooterToolbar = defineComponent({
  name: 'FooterToolbar',
  inheritAttrs: false,
  props: footerToolbarProps(),
  setup(props, { slots, attrs }) {
    const { getPrefixCls, getTargetContainer } = useConfigContextInject();
    const prefixCls = computed(() => props.prefixCls || getPrefixCls('pro'));
    const baseClassName = computed(() => `${prefixCls.value}-footer-bar`);
    const { wrapSSR, hashId } = useStyle(baseClassName);
    const routeContext = useRouteContextInject();
    const width = useMemo(() => {
      const { hasSiderMenu, isMobile, siderWidth } = routeContext.value;
      if (!hasSiderMenu) {
        return undefined;
      }
      // 0 or undefined
      if (!siderWidth) {
        return '100%';
      }
      return isMobile ? '100%' : `calc(100% - ${siderWidth}px)`;
    }, [
      () => routeContext.value.collapsed,
      () => routeContext.value.hasSiderMenu,
      () => routeContext.value.isMobile,
      () => routeContext.value.siderWidth,
    ]);

    const containerDom = useMemo(() => {
      if (typeof window === 'undefined' || typeof document === 'undefined') return null;
      // 只读取一次就行了，不然总是的渲染
      return getTargetContainer?.value?.() || document.body;
    }, []);

    const stylish = useStylish(
      computed(() => `${baseClassName.value}.${baseClassName.value}-stylish`),
      {
        stylish: computed(() => props.stylish as GenerateStyle<stylishToken>),
      }
    );

    /** 告诉 props 是否存在 footerBar */
    useEffect(() => {
      if (!routeContext.value || !routeContext.value?.setHasFooterToolbar) {
        return () => {};
      }
      routeContext.value?.setHasFooterToolbar?.(true);
      return () => {
        routeContext.value?.setHasFooterToolbar?.(false);
      };
    }, []);

    return () => {
      const { extra, footerToolbarContentRender, portalDom = true, ...restProps } = props;

      const dom = (
        <>
          <div class={classNames(`${baseClassName.value}-left`, hashId.value)}>{extra}</div>
          <div class={classNames(`${baseClassName.value}-right`, hashId.value)}>
            {slots.default?.()}
          </div>
        </>
      );
      const renderDom = (
        <div
          class={classNames(attrs.class, hashId.value, baseClassName.value, {
            [`${baseClassName.value}-stylish`]: !!props.stylish,
          })}
          style={{ width: width.value, ...(attrs.style as CSSProperties) }}
          {...omit(restProps, ['prefixCls'])}
        >
          {footerToolbarContentRender
            ? footerToolbarContentRender(
                {
                  ...props,
                  ...routeContext.value,
                  leftWidth: width.value,
                },
                dom
              )
            : dom}
        </div>
      );
      const ssrDom =
        !isBrowser() || !portalDom || !containerDom.value ? (
          <>{renderDom}</>
        ) : (
          <Teleport to={containerDom.value}>{renderDom} </Teleport>
        );
      return stylish.wrapSSR(wrapSSR(<Fragment key={baseClassName.value}>{ssrDom}</Fragment>));
    };
  },
});
export default FooterToolbar;

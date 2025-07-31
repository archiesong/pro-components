import type { ExtractPropTypes, PropType, CSSProperties } from 'vue';
import type { HeaderRender, HeaderTitleRender } from '../../RenderTypings';
import type { ProLayoutHeaderToken } from './style/header';
import { computed, defineComponent } from 'vue';
import { Layout } from 'ant-design-vue';
import GlobalHeader from '../GlobalHeader';
import { useStyle } from './style/header';
import { useStylish } from './style/stylish';
import { GenerateStyle, useProConfigContextInject } from '@ant-design-vue/pro-provider';
import { privateSiderMenuProps } from '../SiderMenu/SiderMenu';
import { classNames, useCallback } from '@ant-design-vue/pro-utils';
import { clearMenuItem } from '../../utils';
import TopNavHeader from '../TopNavHeader';
import { globalHeaderProps } from '../GlobalHeader/globalHeaderProps';
const { Header } = Layout;
export const headerViewProps = () => ({
  ...globalHeaderProps(),
  isMobile: Boolean as PropType<boolean>,
  collapsedWidth: Number as PropType<number>,
  headerRender: {
    type: [Function, Boolean] as PropType<HeaderRender>,
    default: undefined,
  },
  siderWidth: Number as PropType<number>,
  hasSiderMenu: {
    type: Boolean as PropType<boolean>,
    default: undefined,
  },
  headerTitleRender: {
    type: [Function, Boolean, Object] as PropType<HeaderTitleRender>,
    default: undefined,
  },
});

export type HeaderViewProps = Partial<ExtractPropTypes<ReturnType<typeof headerViewProps>>>;

const HeaderView = defineComponent({
  name: 'HeaderView',
  inheritAttrs: false,
  props: {
    ...headerViewProps(),
    ...privateSiderMenuProps(),
  },
  setup(props, { attrs }) {
    const proProvide = useProConfigContextInject();
    const baseClassName = computed(() => `${props.prefixCls}-layout-header`);

    const needFixedHeader = computed(() => props.fixedHeader || props.layout === 'mix');
    const { wrapSSR, hashId } = useStyle(baseClassName);

    const collapsedWidth = computed(() => props.collapsedWidth || 64);

    const isTop = computed(() => props.layout === 'top');

    const stylish = useStylish(
      computed(() => `${baseClassName.value}.${baseClassName.value}-stylish`),
      {
        proLayoutCollapsedWidth: collapsedWidth,
        stylish: computed(() => props.stylish as GenerateStyle<ProLayoutHeaderToken>),
      }
    );
    const renderContent = useCallback(() => {
      const clearMenuData = clearMenuItem(props.menuData || []);
      let defaultDom = (
        <GlobalHeader {...props} menuData={clearMenuData}>
          {props.headerContentRender && props.headerContentRender(props, null)}
        </GlobalHeader>
      );
      if (isTop.value && !props.isMobile) {
        defaultDom = (
          <TopNavHeader
            {...props}
            mode="horizontal"
            onCollapse={props.onCollapse}
            menuData={clearMenuData}
          />
        );
      }
      if (props.headerRender && typeof props.headerRender === 'function') {
        return props.headerRender(props, defaultDom);
      }
      return defaultDom;
    }, [
      () => props.headerContentRender,
      () => props.headerRender,
      () => props.navTheme,
      () => props.isMobile,
      () => props.menuData,
      () => props.layout,
      () => props.onCollapse,
    ]);
    return () => {
      const { layout, headerRender } = props;
      if (layout === 'side' && headerRender === false) return null;
      return stylish.wrapSSR(
        wrapSSR(
          <>
            {needFixedHeader.value && (
              <Header
                style={{
                  ...(attrs.style as CSSProperties),
                  height: `${proProvide.value.token.layout?.header?.heightLayoutHeader || 56}px`,
                  lineHeight: `${proProvide.value.token.layout?.header?.heightLayoutHeader || 56}px`,
                  backgroundColor: 'transparent',
                }}
              />
            )}
            <Header
              class={classNames(attrs.class, hashId.value, baseClassName.value, {
                [`${baseClassName.value}-fixed`]: needFixedHeader.value,
                [`${baseClassName.value}-stylish`]: !!props.stylish,
              })}
              style={{
                ...(attrs.style as CSSProperties),
                width:
                  !needFixedHeader.value || layout !== 'side' || props.isMobile
                    ? '100%'
                    : `calc(100% - ${props.collapsed ? collapsedWidth.value : props.siderWidth}px)`,
              }}
            >
              {renderContent.value()}
            </Header>
          </>
        )
      );
    };
  },
});

export default HeaderView;

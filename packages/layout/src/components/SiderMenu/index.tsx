import type { CSSProperties, PropType } from 'vue';
import type { ProTokenType } from '@ant-design-vue/pro-provider';
import { defineComponent, computed } from 'vue';
import { Drawer } from 'ant-design-vue';
import { useConfigContextInject } from 'ant-design-vue/es/config-provider/context';
import SiderMenu, { siderMenuProps, privateSiderMenuProps } from './SiderMenu';
import { useProConfigContextInject } from '@ant-design-vue/pro-provider';
import { useEffect, classNames, useMemo } from '@ant-design-vue/pro-utils';
import { useStyle } from './style';

export const siderMenuWrapperProps = () => ({
  ...siderMenuProps(),
  ...privateSiderMenuProps(),
  token: Object as PropType<ProTokenType['layout']>,
  getContainer: [String, Object] as PropType<string | HTMLElement>,
});

export type SiderMenuWrapperProps = Partial<ReturnType<typeof siderMenuWrapperProps>>;

const SiderMenuWrapper = defineComponent({
  name: 'SiderMenuWrapper',
  inheritAttrs: false,
  props: siderMenuWrapperProps(),
  setup(props, { attrs }) {
    const proProvide = useProConfigContextInject();
    const { direction } = useConfigContextInject();
    const prefixCls = computed(() => `${props.prefixCls}-sider`);

    useEffect(() => {
      if (props.isMobile === true) {
        props.onCollapse?.(true);
      }
    }, [() => props.isMobile]);

    const { wrapSSR, hashId } = useStyle(prefixCls, {
      proLayoutCollapsedWidth: 64,
    });

    const drawerMenuBackground = useMemo(() => {
      if (
        (props.navTheme === 'realDark' && props.layout !== 'mix') ||
        (props.navTheme === 'dark' && props.layout !== 'mix') ||
        (props.layout === 'mix' && props.isMobile && props.navTheme === 'realDark') ||
        (props.layout === 'mix' && props.isMobile && props.navTheme === 'dark')
      ) {
        return props.token?.sider?.colorMenuBackground || '#001529';
      }
      return proProvide.value.token.layout?.sider?.colorMenuBackground || 'transparent';
    }, [
      () => props.navTheme,
      () => props.isMobile,
      () => props.layout,
      () => props.token,
      () => proProvide.value.token,
    ]);

    return () => {
      if (props.hide) {
        return null;
      }
      return wrapSSR(
        props.isMobile ? (
          <Drawer
            placement={direction?.value === 'rtl' ? 'right' : 'left'}
            class={classNames(`${props.prefixCls}-drawer-sider`, attrs.class, hashId.value)}
            open={!props.collapsed}
            style={{
              padding: 0,
              height: '100vh',
              ...(attrs.style as CSSProperties),
            }}
            onClose={() => props.onCollapse?.(true)}
            closable={false}
            getContainer={props.getContainer}
            maskClosable
            width={props.siderWidth}
            bodyStyle={{
              height: '100vh',
              padding: 0,
              display: 'flex',
              flexDirection: 'row',
              backgroundColor: drawerMenuBackground.value,
            }}
          >
            <SiderMenu
              {...props}
              isMobile={true}
              class={classNames(prefixCls.value, attrs.class, hashId.value)}
              collapsed={props.isMobile ? false : props.collapsed}
              splitMenus={false}
              originCollapsed={props.collapsed}
            />
          </Drawer>
        ) : (
          <SiderMenu
            {...props}
            class={classNames(prefixCls.value, attrs.class, hashId.value)}
            originCollapsed={props.collapsed}
          />
        )
      );
    };
  },
});

export default SiderMenuWrapper;

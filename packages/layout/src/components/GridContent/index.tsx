import type { CSSProperties, ExtractPropTypes, PropType } from 'vue';
import type { PureSettings } from '../../defaultSettings';
import { computed, defineComponent } from 'vue';
import { useRouteContextInject } from '../../context/RouteContext';
import { classNames } from '@ant-design-vue/pro-utils';
import { useStyle } from './style';
import { useConfigContextInject } from 'ant-design-vue/es/config-provider/context';

export const gridContentProps = () => ({
  contentWidth: {
    type: String as PropType<PureSettings['contentWidth']>,
    default: undefined,
  },
  prefixCls: {
    type: String,
    default: undefined,
  },
});
export type GridContentProps = ExtractPropTypes<ReturnType<typeof gridContentProps>>;

/**
 * This component can support contentWidth so you don't need to calculate the width
 * contentWidth=Fixed, width will is 1200
 */
const GridContent = defineComponent({
  name: 'GridContent',
  inheritAttrs: false,
  props: gridContentProps(),
  setup(props, { slots, attrs }) {
    const routeContext = useRouteContextInject();
    const { getPrefixCls } = useConfigContextInject();
    const prefixCls = computed(() => props.prefixCls || getPrefixCls('pro'));
    const contentWidth = computed(() => props.contentWidth || routeContext.value.contentWidth);
    const baseClassName = computed(() => `${prefixCls.value}-grid-content`);
    const { wrapSSR, hashId } = useStyle(baseClassName);
    const isWide = computed(
      () => contentWidth.value === 'Fixed' && routeContext.value.layout === 'top'
    );
    return () => {
      return wrapSSR(
        <div
          class={classNames(baseClassName.value, hashId.value, attrs.class, {
            [`${baseClassName.value}-wide`]: isWide.value,
          })}
          style={attrs.style as CSSProperties}
        >
          <div class={classNames(`${prefixCls.value}-grid-content-children`, hashId.value)}>
            {slots.default?.()}
          </div>
        </div>
      );
    };
  },
});
export default GridContent;

import type { PropType } from 'vue';
import type { VueNode } from 'ant-design-vue/es/_util/type';
import type { LabelTooltipType, WrapperTooltipProps } from '../../typing';
import { computed, defineComponent, isVNode } from 'vue';
import { Tooltip } from 'ant-design-vue';
import { InfoCircleOutlined } from '@ant-design/icons-vue';
import { useConfigContextInject } from 'ant-design-vue/es/config-provider/context';
import { useStyle } from './style';
import classNames from '../../classNames';

const LabelIconTip = defineComponent({
  name: 'LabelIconTip',
  inheritAttrs: false,
  props: {
    label: {
      type: [String, Object] as PropType<VueNode>,
      default: undefined,
    },
    subTitle: {
      type: [String, Object] as PropType<VueNode>,
      default: undefined,
    },
    tooltip: {
      type: [String, Object] as PropType<LabelTooltipType>,
      default: undefined,
    },
    ellipsis: {
      type: [Boolean, Object] as PropType<boolean | { showTitle?: boolean }>,
      default: undefined,
    },
  },
  setup(props) {
    const { getPrefixCls } = useConfigContextInject();
    const baseClassName = computed(() => getPrefixCls('pro-core-label-tip'));
    const { wrapSSR, hashId } = useStyle(baseClassName);
    return () => {
      const { tooltip, subTitle, label, ellipsis } = props;
      if (!tooltip && !subTitle) {
        return <>{label}</>;
      }
      const tooltipProps =
        typeof tooltip === 'string' || isVNode(tooltip)
          ? { title: tooltip }
          : (tooltip as WrapperTooltipProps);

      const icon = tooltipProps?.icon || <InfoCircleOutlined />;

      return wrapSSR(
        <div
          class={classNames(baseClassName.value, hashId.value)}
          onMousedown={(e) => e.stopPropagation()}
          onMouseleave={(e) => e.stopPropagation()}
          onMousemove={(e) => e.stopPropagation()}
        >
          <div
            class={classNames(`${baseClassName.value}-title`, hashId.value, {
              [`${baseClassName.value}-title-ellipsis`]: ellipsis,
            })}
          >
            {label}
          </div>
          {subTitle && (
            <div class={classNames(`${baseClassName.value}-subtitle`, hashId.value)}>
              {subTitle}
            </div>
          )}
          {tooltip && (
            <Tooltip {...tooltipProps}>
              <span class={classNames(`${baseClassName.value}-icon`, hashId.value)}>{icon}</span>
            </Tooltip>
          )}
        </div>
      );
    };
  },
});
export default LabelIconTip;

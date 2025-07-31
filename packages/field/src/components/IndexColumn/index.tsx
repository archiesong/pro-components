import type { PropType } from 'vue';
import { defineComponent, computed } from 'vue';
import { useStyle } from './style';
import { useConfigContextInject } from 'ant-design-vue/es/config-provider/context';
import { classNames } from '@ant-design-vue/pro-utils';

const IndexColumn = defineComponent({
  name: 'IndexColumn',
  inheritAttrs: false,
  props: {
    border: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  setup(props, { slots }) {
    const { getPrefixCls } = useConfigContextInject();
    const prefixCls = computed(() => getPrefixCls('pro'));
    const baseClassName = computed(() => `${prefixCls.value}field-index-column`);
    const { wrapSSR, hashId } = useStyle(baseClassName);
    return () => {
      const [{ children }] = slots.default?.() as { children: string }[];
      return wrapSSR(
        <div
          class={classNames(baseClassName.value, hashId.value, {
            [`${baseClassName.value}-border`]: props.border,
            'top-three': Number(children) > 3,
          })}
        >
          {slots.default?.()}
        </div>
      );
    };
  },
});

export default IndexColumn;

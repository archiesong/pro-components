import type { PropType, Ref, VNode } from 'vue';

import { defineComponent, cloneVNode, ref } from 'vue';
import { useState } from '@ant-design-vue/pro-utils';

const FieldHOC = defineComponent({
  name: 'FieldHOC',
  inheritAttrs: false,
  props: {
    isLight: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  setup(props, { slots }) {
    const [labelTrigger, setLabelTrigger] = useState(false);
    const lightLabel = ref<{
      labelRef: Ref<HTMLElement>;
      clearRef: Ref<HTMLElement>;
    }>();

    // 是label且不是label里面的clear图标触发事件
    const isTriggeredByLabel = (e: MouseEvent) => {
      // 两条语句结果分别命名，可读性好点
      const isLabelMouseDown = lightLabel.value?.labelRef.value?.contains(e.target as HTMLElement);
      const isClearMouseDown = lightLabel.value?.clearRef.value.contains(e.target as HTMLElement);
      return isLabelMouseDown && !isClearMouseDown;
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (isTriggeredByLabel(e)) {
        setLabelTrigger(true);
      }
    };
    const handleMouseUp = () => setLabelTrigger(false);
    return () => {
      if (props.isLight) {
        return (
          <div onMousedown={handleMouseDown} onMouseup={handleMouseUp}>
            {cloneVNode(
              slots.default?.() as unknown as VNode<unknown, unknown, { [key: string]: any }>,
              {
                labelTrigger,
                lightLabel: lightLabel.value,
              }
            )}
          </div>
        );
      }
      return slots.default?.();
    };
  },
});
export default FieldHOC;

import type { Slots } from 'vue';

const getSlotVNode = <T>(
  slots: Slots,
  props: Record<string, unknown>,
  prop = 'default'
): T | false => {
  if (props[prop] === false) {
    return false;
  }
  return (props[prop] || slots[prop]?.()) as T;
};

const getSlot = <T>(slots: Slots, props: Record<string, unknown>, prop = 'default'): T | false => {
  if (props[prop] === false) {
    return false;
  }
  return (props[prop] || slots[prop]) as T;
};

export { getSlotVNode, getSlot };

import { Slots } from 'vue';
declare const getSlotVNode: <T>(slots: Slots, props: Record<string, unknown>, prop?: string) => T | false;
declare const getSlot: <T>(slots: Slots, props: Record<string, unknown>, prop?: string) => T | false;
export { getSlotVNode, getSlot };

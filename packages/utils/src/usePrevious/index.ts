import type { Ref } from 'vue';
import { ref, watch } from 'vue';
const usePrevious = <T>(state: Ref<T>): Ref<T | undefined> => {
  const previous = ref<T>();
  watch(
    state,
    (_, oldValue) => {
      previous.value = oldValue;
    },
    { immediate: false }
  );
  return previous;
};
export default usePrevious;

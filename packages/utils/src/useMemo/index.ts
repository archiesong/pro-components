import type { Ref, WatchSource } from 'vue';
import { ref, watch } from 'vue';

export default function useMemo<T>(
  getValue: () => T,
  condition: WatchSource<unknown>[],
  shouldUpdate?: (prev: unknown[], next: unknown[]) => boolean
) {
  const cacheRef = ref(getValue()) as Ref<T>;
  watch(condition, (next, pre) => {
    if (shouldUpdate) {
      if (shouldUpdate(next, pre)) {
        cacheRef.value = getValue();
      }
    } else {
      cacheRef.value = getValue();
    }
  });

  return cacheRef;
}

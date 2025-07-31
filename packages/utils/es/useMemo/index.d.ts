import { Ref, WatchSource } from 'vue';
export default function useMemo<T>(getValue: () => T, condition: WatchSource<unknown>[], shouldUpdate?: (prev: unknown[], next: unknown[]) => boolean): Ref<T, T>;

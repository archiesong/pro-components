import { Ref } from 'vue';
declare const usePrevious: <T>(state: Ref<T>) => Ref<T | undefined>;
export default usePrevious;

import { ref } from 'vue';
import useCallback from '../useCallback';
const useRefFunction = <T extends (...args: any) => any>(reFunction: T) => {
  const refValue = ref<any>(null);
  refValue.value = reFunction;
  return useCallback((...rest: Parameters<T>): ReturnType<T> => {
    return refValue.value?.(...(rest as any));
  }, []);
};

export default useRefFunction;

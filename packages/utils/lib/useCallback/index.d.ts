declare const useCallback: <T, D extends () => any>(fn: T, dependencies?: D[]) => import('vue').Ref<T, T>;
export default useCallback;

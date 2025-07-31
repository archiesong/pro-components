declare const useRefFunction: <T extends (...args: any) => any>(reFunction: T) => import('vue').Ref<(...rest: Parameters<T>) => ReturnType<T>, (...rest: Parameters<T>) => ReturnType<T>>;
export default useRefFunction;

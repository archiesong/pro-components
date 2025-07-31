/**
 * 一个去抖的 hook，传入一个 function，返回一个去抖后的 function
 * @param {<T extends any[], U = any>(...args: T)=>  Promise<any>} fn
 * @param { number } wait
 */
declare const useDebounceFn: <T extends any[], U = any>(fn: (...args: T) => Promise<any>, wait?: number) => {
    run: (...args: T) => Promise<U | undefined>;
    cancel: () => void;
};
export default useDebounceFn;

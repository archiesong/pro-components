import { onUnmounted, ref } from 'vue';
// import useCallback from '../useCallback';
// import useEffect from '../useEffect';
// import useRefFunction from '../useRefFunction';
/**
 * 一个去抖的 hook，传入一个 function，返回一个去抖后的 function
 * @param {<T extends any[], U = any>(...args: T)=>  Promise<any>} fn
 * @param { number } wait
 */
const useDebounceFn = <T extends any[], U = any>(
  fn: (...args: T) => Promise<any>,
  wait?: number
) => {
  const timer = ref<number | null>(null);

  const cancel = () => {
    if (timer.value !== null) {
      clearTimeout(timer.value);
      timer.value = null;
    }
  };

  const run = async (...args: T): Promise<U | undefined> => {
    if (wait === 0 || wait === undefined) {
      return fn(...args);
    }
    cancel();
    return new Promise<U>((resolve) => {
      timer.value = setTimeout(async () => {
        resolve(await fn(...args));
      }, wait) as unknown as number;
    });
  };

  onUnmounted(() => {
    cancel();
  });

  return {
    run,
    cancel,
  };
};

// const useDebounceFn = <T extends any[], U = any>(
//   fn: (...args: T) => Promise<any>,
//   wait?: number
// ) => {
//   const callback = useRefFunction(fn);
//   const timer = ref<any>();
//   const cancel = useCallback(() => {
//     if (timer.value) {
//       clearTimeout(timer.value);
//       timer.value = null;
//     }
//   }, []);

//   const run = useCallback(
//     async (...args: any): Promise<U | undefined> => {
//       if (wait === 0 || wait === undefined) {
//         return callback.value(...args);
//       }
//       cancel.value();
//       return new Promise<U>((resolve) => {
//         timer.value = setTimeout(async () => {
//           resolve(await callback.value(...args));
//           return;
//         }, wait);
//       });
//     },
//     [() => callback.value, () => cancel.value, () => wait]
//   );
//   useEffect(() => {
//     return cancel.value;
//   }, [() => cancel.value]);

//   return {
//     run,
//     cancel,
//   };
// };
export default useDebounceFn;

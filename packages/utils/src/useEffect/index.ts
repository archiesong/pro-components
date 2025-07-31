import { ref, onMounted, watch, onUnmounted } from 'vue';

declare const UNDEFINED_VOID_ONLY: unique symbol;

type CleanupFunction = () => void;

type Destructor = CleanupFunction | { [UNDEFINED_VOID_ONLY]: never };

export type EffectCallback = () => void | Destructor;

const useEffect = (effect: EffectCallback, dependencies?: readonly unknown[]): void => {
  const cleanupRef = ref<CleanupFunction | void>();
  const executeEffect = () => {
    // 判断下一次执行副作用前还有没有清理函数没有执行
    if (cleanupRef.value) {
      cleanupRef.value();
    }
    // 执行副作用，并赋值清理函数
    cleanupRef.value = effect() as CleanupFunction;
  };
  // 组件挂载的时候执行一次副作用
  onMounted(executeEffect);
  // 判断有没有传依赖项，有的话就watch监听
  if (dependencies && dependencies.length > 0) {
    watch(dependencies, executeEffect);
  }
  // 组件销毁的使用如果有清理函数就执行清理函数
  onUnmounted(() => {
    if (cleanupRef.value) {
      cleanupRef.value();
    }
  });
};
export default useEffect;

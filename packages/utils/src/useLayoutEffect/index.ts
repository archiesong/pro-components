import { ref, onMounted, nextTick, watch, onUnmounted } from 'vue';

type CleanupFunction = () => void;

type EffectCallback = () => void | CleanupFunction;

const useLayoutEffect = (effect: EffectCallback, dependencies?: readonly unknown[]) => {
  const cleanupRef = ref<CleanupFunction | void>();
  const executeEffect = () => {
    // 判断下一次执行副作用前还有没有清理函数没有执行
    if (cleanupRef.value) {
      cleanupRef.value();
    }
    // 执行副作用，并赋值清理函数
    cleanupRef.value = effect();
  };
  // 组件挂载执行一次副作用
  onMounted(() => {
    nextTick(executeEffect).then((r) => r);
  });
  // 判断有没有传依赖项，有的话就watch监听
  if (dependencies && dependencies.length > 0) {
    watch(dependencies, () => {
      nextTick(executeEffect).then((r) => r);
    });
  }
  // 组件销毁的使用如果有清理函数就执行清理函数
  onUnmounted(() => {
    if (cleanupRef.value) {
      cleanupRef.value();
    }
  });
};
export default useLayoutEffect;

import { watch } from 'vue';
import useState from '../useState';
const useCallback = <T, D extends () => any>(fn: T, dependencies?: D[]) => {
  const [callback, setCallback] = useState(() => fn);
  // 如果依赖项有变更就把fn重新赋值没有就直接返回callback
  if (dependencies) {
    watch(dependencies, () => setCallback(fn));
  }
  return callback;
};

export default useCallback;

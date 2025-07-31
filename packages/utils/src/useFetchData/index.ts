import type { Key } from 'ant-design-vue/es/_util/type';
import { ref } from 'vue';
import { useSWR } from 'swr-vue';
import useState from '../useState';
import useEffect from '../useEffect';

let testId = 0;

export type ProRequestData<T, U = Record<string, any>> = (params: U, props: any) => Promise<T>;

const useFetchData = <T, U = Record<string, any>>(props: {
  proFieldKey?: Key;
  params?: U;
  request?: ProRequestData<T, U>;
}) => {
  const abortRef = ref<AbortController | null>(null);
  /** Key 是用来缓存请求的，如果不在是有问题 */
  const [cacheKey] = useState(() => {
    if (props.proFieldKey) {
      return props.proFieldKey.toString();
    }
    testId += 1;
    return testId.toString();
  });

  const proFieldKeyRef = ref(cacheKey);

  const fetchData = async () => {
    abortRef.value?.abort();
    const abort = new AbortController();
    abortRef.value = abort;
    const loadData = await Promise.race([
      props.request?.(props.params as U, props),
      new Promise((_, reject) => {
        abortRef.value?.signal.addEventListener('abort', () => {
          reject(new Error('aborted'));
        });
      }),
    ]);
    return loadData as T;
  };

  useEffect(() => {
    return () => {
      testId += 1;
    };
  }, []);

  const { data, error } = useSWR<T | undefined>([proFieldKeyRef.value, props.params], fetchData, {
    revalidateOnFocus: false,
    // shouldRetryOnError: false,
    revalidateOnReconnect: false,
  });

  return [data || error];
};
export default useFetchData;

import { defineComponent, onUnmounted } from 'vue';
import { useSWRConfig } from 'swr-vue';

/**
 * 组件解除挂载后清空一下 cache
 * @returns null
 */
export default defineComponent({
  name: 'CacheClean',
  setup() {
    const { config } = useSWRConfig();
    onUnmounted(() => {
      config.value.cacheProvider.clear();
    });
    return () => null;
  },
});

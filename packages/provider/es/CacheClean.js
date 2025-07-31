import { defineComponent as n, onUnmounted as o } from "vue";
import { useSWRConfig as a } from "swr-vue";
const c = /* @__PURE__ */ n({
  name: "CacheClean",
  setup() {
    const {
      config: e
    } = a();
    return o(() => {
      e.value.cacheProvider.clear();
    }), () => null;
  }
});
export {
  c as default
};

import { ref as l } from "vue";
import { useSWR as v } from "swr-vue";
import b from "../useState/index.js";
import y from "../useEffect/index.js";
let a = 0;
const g = (e) => {
  const t = l(null), [c] = b(() => e.proFieldKey ? e.proFieldKey.toString() : (a += 1, a.toString())), i = l(c), u = async () => {
    var r, o;
    (r = t.value) == null || r.abort();
    const d = new AbortController();
    return t.value = d, await Promise.race([
      (o = e.request) == null ? void 0 : o.call(e, e.params, e),
      new Promise((w, m) => {
        var n;
        (n = t.value) == null || n.signal.addEventListener("abort", () => {
          m(new Error("aborted"));
        });
      })
    ]);
  };
  y(() => () => {
    a += 1;
  }, []);
  const { data: s, error: f } = v([i.value, e.params], u, {
    revalidateOnFocus: !1,
    // shouldRetryOnError: false,
    revalidateOnReconnect: !1
  });
  return [s || f];
};
export {
  g as default
};

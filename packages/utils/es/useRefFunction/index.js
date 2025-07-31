import { ref as u } from "vue";
import n from "../useCallback/index.js";
const s = (e) => {
  const r = u(null);
  return r.value = e, n((...o) => {
    var t;
    return (t = r.value) == null ? void 0 : t.call(r, ...o);
  }, []);
};
export {
  s as default
};

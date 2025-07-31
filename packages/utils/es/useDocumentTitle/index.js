import { computed as o } from "vue";
import a from "../useEffect/index.js";
import l from "../isBrowser/index.js";
const s = (e, u) => {
  const t = o(
    () => typeof e.value.pageName == "string" ? e.value.title : u.value
  );
  a(() => {
    l() && t.value && (document.title = t.value);
  }, [() => e.value.title, () => t.value]);
};
export {
  s as default
};

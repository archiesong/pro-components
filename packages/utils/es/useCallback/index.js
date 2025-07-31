import { watch as r } from "vue";
import c from "../useState/index.js";
const u = (t, a) => {
  const [l, o] = c(() => t);
  return a && r(a, () => o(t)), l;
};
export {
  u as default
};

import { ref as o, onMounted as a, watch as l, onUnmounted as c } from "vue";
const v = (u, e) => {
  const t = o(), f = () => {
    t.value && t.value(), t.value = u();
  };
  a(f), e && e.length > 0 && l(e, f), c(() => {
    t.value && t.value();
  });
};
export {
  v as default
};

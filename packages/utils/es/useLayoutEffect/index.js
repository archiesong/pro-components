import { ref as n, onMounted as l, nextTick as o, watch as c, onUnmounted as v } from "vue";
const r = (a, e) => {
  const t = n(), f = () => {
    t.value && t.value(), t.value = a();
  };
  l(() => {
    o(f).then((u) => u);
  }), e && e.length > 0 && c(e, () => {
    o(f).then((u) => u);
  }), v(() => {
    t.value && t.value();
  });
};
export {
  r as default
};

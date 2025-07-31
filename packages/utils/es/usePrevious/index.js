import { ref as o, watch as s } from "vue";
const i = (r) => {
  const e = o();
  return s(
    r,
    (a, t) => {
      e.value = t;
    },
    { immediate: !1 }
  ), e;
};
export {
  i as default
};

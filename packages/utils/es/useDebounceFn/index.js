import { ref as c, onUnmounted as a } from "vue";
const i = (o, n) => {
  const e = c(null), u = () => {
    e.value !== null && (clearTimeout(e.value), e.value = null);
  }, l = async (...t) => n === 0 || n === void 0 ? o(...t) : (u(), new Promise((r) => {
    e.value = setTimeout(async () => {
      r(await o(...t));
    }, n);
  }));
  return a(() => {
    u();
  }), {
    run: l,
    cancel: u
  };
};
export {
  i as default
};

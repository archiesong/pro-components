import { inject as r, provide as e } from "vue";
const o = Symbol("proFormContext"), m = (t) => e(o, t), c = () => r(
  o,
  {}
);
export {
  o as proFormContextKey,
  c as useProFormContextInject,
  m as useProFormContextProvider
};

import { provide as o, ref as r, reactive as n } from "vue";
const c = (t = {}) => {
  const e = r();
  return n({
    action: e
  });
}, s = Symbol("tableContext"), i = (t) => o(s, t);
export {
  s as tableContextKey,
  c as useContainer,
  i as useTableContextProvider
};

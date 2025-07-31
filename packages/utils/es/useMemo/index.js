import { ref as n, watch as t } from "vue";
function m(e, c, r) {
  const f = n(e());
  return t(c, (o, i) => {
    r ? r(o, i) && (f.value = e()) : f.value = e();
  }), f;
}
export {
  m as default
};

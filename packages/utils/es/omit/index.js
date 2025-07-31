function s(n, e) {
  const o = Object.assign({}, n);
  for (let t = 0; t < e.length; t += 1) {
    const l = e[t];
    delete o[l];
  }
  return o;
}
export {
  s as default
};

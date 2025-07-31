const s = "valueType request plain renderFormItem render text formItemProps valueEnum", n = "fieldProps isDefaultDom groupProps contentRender submitterProps submitter", p = (t) => {
  const o = `${s} ${n}`.split(/[\s\n]+/), e = {};
  return Object.keys(t || {}).forEach((r) => {
    o.includes(r) || (e[r] = t[r]);
  }), e;
};
export {
  p as default
};

const e = (r) => {
  if (!r || !r.startsWith("http"))
    return !1;
  try {
    return !!new URL(r);
  } catch {
    return !1;
  }
};
export {
  e as default
};

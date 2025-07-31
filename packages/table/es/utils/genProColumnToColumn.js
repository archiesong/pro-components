import { Table as i } from "ant-design-vue";
const y = (n, r) => n ? Array.isArray(n) ? n.join("-") : n.toString() : `${r}`, a = (n, r) => {
  const { columns: u } = n;
  return u.map((e, o) => {
    if (e === i.EXPAND_COLUMN || e === i.SELECTION_COLUMN) return e;
    const {
      key: f,
      dataIndex: t,
      valueEnum: l,
      valueType: C = "text",
      children: N
      // onFilter,
      // filters = [],
    } = e, g = y(
      f || (t == null ? void 0 : t.toString()),
      [r == null ? void 0 : r.key, o].filter(Boolean).join("-")
    );
    return !l && !C && !N ? {
      index: o,
      ...e
    } : (console.log(g), e);
  });
};
export {
  a as default,
  y as genColumnKey
};

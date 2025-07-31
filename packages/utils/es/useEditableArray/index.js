import { ref as v, computed as b } from "vue";
import x from "ant-design-vue/es/table/hooks/useLazyKVMap";
import I from "ant-design-vue/es/_util/hooks/useMergedState";
import N from "../useState/index.js";
import E from "../useMemo/index.js";
import A from "../useEffect/index.js";
import L from "../usePrevious/index.js";
const S = (e) => Array.isArray(e) ? e.join(",") : e;
function V(e, m) {
  var i;
  const {
    getRowKey: w,
    row: _,
    data: R,
    childrenColumnName: g = "children"
  } = e, r = (i = S(e.key)) == null ? void 0 : i.toString(), d = /* @__PURE__ */ new Map();
  function K(f, t, u) {
    f.forEach((n, l) => {
      const a = (u || 0) * 10 + l, o = w(n, a).toString();
      n && typeof n == "object" && g in n && K(n[g] || [], o, a);
      const c = {
        ...n,
        map_row_key: o,
        children: void 0,
        map_row_parentKey: t
      };
      delete c.children, t || delete c.map_row_parentKey, d.set(o, c);
    });
  }
  return m === "top" && d.set(r, {
    ...d.get(r),
    ..._
  }), K(R), m === "update" && d.set(r, {
    ...d.get(r),
    ..._
  }), m === "delete" && d.delete(r), ((f) => {
    const t = /* @__PURE__ */ new Map(), u = [], n = (l = !1) => {
      f.forEach((a) => {
        var o;
        if (a.map_row_parentKey && !a.map_row_key) {
          const {
            map_row_parentKey: c,
            ...s
          } = a;
          t.has(c) || t.set(c, []), l && ((o = t.get(c)) == null || o.push(s));
        }
      });
    };
    return n(m === "top"), f.forEach((l) => {
      var a;
      if (l.map_row_parentKey && l.map_row_key) {
        const {
          map_row_parentKey: o,
          map_row_key: c,
          ...s
        } = l;
        t.has(c) && (s[g] = t.get(c)), t.has(o) || t.set(o, []), (a = t.get(o)) == null || a.push(s);
      }
    }), n(m === "update"), f.forEach((l) => {
      if (!l.map_row_parentKey) {
        const {
          map_row_key: a,
          ...o
        } = l;
        if (a && t.has(a)) {
          const c = {
            ...o,
            [g]: t.get(a)
          };
          u.push(c);
          return;
        }
        u.push(o);
      }
    }), u;
  })(d);
}
const q = (e) => {
  const [m] = N(void 0), w = () => {
    const i = /* @__PURE__ */ new Map(), f = (t, u) => {
      t == null || t.forEach((n, l) => {
        var o;
        const a = u == null ? l.toString() : u + "_" + l.toString();
        i.set(a, S(e.getRowKey.value(n, -1))), i.set((o = S(e.getRowKey.value(n, -1))) == null ? void 0 : o.toString(), a), e.childrenColumnName && (n != null && n[e.childrenColumnName]) && f(n[e.childrenColumnName], a);
      });
    };
    return f(e.dataSource.value), i;
  }, _ = E(() => w(), []), R = v(_.value);
  A(() => {
    R.value = w();
  }, [() => e.dataSource.value]);
  const [g] = x(e.dataSource, v("children"), e.getRowKey), [r, d] = I([], {
    value: b(() => e.editableKeys),
    onChange: e.onChange ? (i) => {
      var f;
      (f = e == null ? void 0 : e.onChange) == null || f.call(
        e,
        // 计算编辑的key
        (i == null ? void 0 : i.filter((t) => t !== void 0)) ?? [],
        // 计算编辑的行
        (i == null ? void 0 : i.map((t) => g(t)).filter((t) => t !== void 0)) ?? []
      );
    } : void 0
  }), K = L(r);
  return {
    editableKeys: r,
    setEditableRowKeys: d,
    isEditable: (i) => {
      var a, o, c, s, y, M;
      const f = (o = (a = e.getRowKey.value(i, i.index)) == null ? void 0 : a.toString) == null ? void 0 : o.call(a), t = (s = (c = e.getRowKey.value(i, -1)) == null ? void 0 : c.toString) == null ? void 0 : s.call(c), u = (y = r.value) == null ? void 0 : y.map((h) => h == null ? void 0 : h.toString()), n = ((M = K.value) == null ? void 0 : M.map((h) => h == null ? void 0 : h.toString())) || [], l = e.tableName && !!(n != null && n.includes(t)) || !!(n != null && n.includes(f));
      return {
        recordKey: t,
        isEditable: e.tableName && (u == null ? void 0 : u.includes(t)) || (u == null ? void 0 : u.includes(f)),
        preIsEditable: l
      };
    },
    newLineRecord: m,
    getRealIndex: e.getRealIndex
  };
};
export {
  q as default,
  V as editableRowByKey,
  S as recordKeyToString
};

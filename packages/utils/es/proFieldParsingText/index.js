import { createVNode as n, Fragment as p, mergeProps as a } from "vue";
import { Space as y, Badge as t } from "ant-design-vue";
function b(r) {
  var u;
  const e = (u = Object.prototype.toString.call(r).match(/^\[object (.*)\]$/)) == null ? void 0 : u[1].toLowerCase();
  return e === "string" && typeof r == "object" ? "object" : r === null ? "null" : r === void 0 ? "undefined" : e;
}
const w = ({
  color: r,
  ...e
}, {
  slots: u
}) => {
  var c;
  return n(t, a(e, {
    color: r,
    text: (c = u.default) == null ? void 0 : c.call(u)
  }), null);
}, S = (r) => b(r) === "map" ? r : new Map(Object.entries(r || {})), T = {
  Success: (r, {
    slots: e
  }) => {
    var u;
    return n(t, a(r, {
      status: "success",
      text: (u = e.default) == null ? void 0 : u.call(e)
    }), null);
  },
  Error: (r, {
    slots: e
  }) => {
    var u;
    return n(t, a(r, {
      status: "error",
      text: (u = e.default) == null ? void 0 : u.call(e)
    }), null);
  },
  Default: (r, {
    slots: e
  }) => {
    var u;
    return n(t, a(r, {
      status: "default",
      text: (u = e.default) == null ? void 0 : u.call(e)
    }), null);
  },
  Processing: (r, {
    slots: e
  }) => {
    var u;
    return n(t, a(r, {
      status: "processing",
      text: (u = e.default) == null ? void 0 : u.call(e)
    }), null);
  },
  Warning: (r, {
    slots: e
  }) => {
    var u;
    return n(t, a(r, {
      status: "warning",
      text: (u = e.default) == null ? void 0 : u.call(e)
    }), null);
  },
  success: (r, {
    slots: e
  }) => {
    var u;
    return n(t, a(r, {
      status: "success",
      text: (u = e.default) == null ? void 0 : u.call(e)
    }), null);
  },
  error: (r, {
    slots: e
  }) => {
    var u;
    return n(t, a(r, {
      status: "error",
      text: (u = e.default) == null ? void 0 : u.call(e)
    }), null);
  },
  default: (r, {
    slots: e
  }) => {
    var u;
    return n(t, a(r, {
      status: "default",
      text: (u = e.default) == null ? void 0 : u.call(e)
    }), null);
  },
  processing: (r, {
    slots: e
  }) => {
    var u;
    return n(t, a(r, {
      status: "processing",
      text: (u = e.default) == null ? void 0 : u.call(e)
    }), null);
  },
  warning: (r, {
    slots: e
  }) => {
    var u;
    return n(t, a(r, {
      status: "warning",
      text: (u = e.default) == null ? void 0 : u.call(e)
    }), null);
  }
}, h = (r, e, u) => {
  if (Array.isArray(r))
    return n(y, {
      key: u,
      size: 2,
      wrap: !0
    }, {
      default: () => [r.map((l, m) => h(l, e, m))],
      split: ","
    });
  const c = S(e);
  if (!c.has(r) && !c.has(`${r}`))
    return (r == null ? void 0 : r.label) || r;
  const f = c.get(r) || c.get(`${r}`);
  if (!f)
    return n(p, {
      key: u
    }, [(r == null ? void 0 : r.label) || r]);
  const {
    status: g,
    color: i
  } = f, d = T[g || "Init"];
  return d ? n(d, {
    key: u
  }, {
    default: () => [f.text]
  }) : i ? n(w, {
    key: u,
    color: i
  }, {
    default: () => [f.text]
  }) : n(p, {
    key: u
  }, [f.text || f]);
};
export {
  w as ProFieldBadgeColor,
  h as default,
  S as objectToMap
};

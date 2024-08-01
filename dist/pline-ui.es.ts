/**
* @vue/shared v3.4.29
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function on(e, t) {
  const n = new Set(e.split(","));
  return (r) => n.has(r);
}
const C = process.env.NODE_ENV !== "production" ? Object.freeze({}) : {}, cn = process.env.NODE_ENV !== "production" ? Object.freeze([]) : [], G = () => {
}, ln = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), D = Object.assign, un = Object.prototype.hasOwnProperty, E = (e, t) => un.call(e, t), h = Array.isArray, K = (e) => ve(e) === "[object Map]", Nt = (e) => ve(e) === "[object Set]", w = (e) => typeof e == "function", v = (e) => typeof e == "string", J = (e) => typeof e == "symbol", N = (e) => e !== null && typeof e == "object", an = (e) => (N(e) || w(e)) && w(e.then) && w(e.catch), Ot = Object.prototype.toString, ve = (e) => Ot.call(e), St = (e) => ve(e).slice(8, -1), yt = (e) => ve(e) === "[object Object]", Be = (e) => v(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, fn = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, pn = fn((e) => e.charAt(0).toUpperCase() + e.slice(1)), ee = (e, t) => !Object.is(e, t), dn = (e, t, n, r = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: r,
    value: n
  });
};
let ot;
const vt = () => ot || (ot = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Je(e) {
  if (h(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n], s = v(r) ? mn(r) : Je(r);
      if (s)
        for (const o in s)
          t[o] = s[o];
    }
    return t;
  } else if (v(e) || N(e))
    return e;
}
const hn = /;(?![^(]*\))/g, _n = /:([^]+)/, gn = /\/\*[^]*?\*\//g;
function mn(e) {
  const t = {};
  return e.replace(gn, "").split(hn).forEach((n) => {
    if (n) {
      const r = n.split(_n);
      r.length > 1 && (t[r[0].trim()] = r[1].trim());
    }
  }), t;
}
function xe(e) {
  let t = "";
  if (v(e))
    t = e;
  else if (h(e))
    for (let n = 0; n < e.length; n++) {
      const r = xe(e[n]);
      r && (t += r + " ");
    }
  else if (N(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const it = (e) => v(e) ? e : e == null ? "" : h(e) || N(e) && (e.toString === Ot || !w(e.toString)) ? JSON.stringify(e, xt, 2) : String(e), xt = (e, t) => t && t.__v_isRef ? xt(e, t.value) : K(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [r, s], o) => (n[$e(r, o) + " =>"] = s, n),
    {}
  )
} : Nt(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => $e(n))
} : J(t) ? $e(t) : N(t) && !h(t) && !yt(t) ? String(t) : t, $e = (e, t = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    J(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  );
};
/**
* @vue/reactivity v3.4.29
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function ce(e, ...t) {
  console.warn(`[Vue warn] ${e}`, ...t);
}
let En;
function wn(e, t = En) {
  t && t.active && t.effects.push(e);
}
let se;
class bn {
  constructor(t, n, r, s) {
    this.fn = t, this.trigger = n, this.scheduler = r, this.active = !0, this.deps = [], this._dirtyLevel = 5, this._trackId = 0, this._runnings = 0, this._shouldSchedule = !1, this._depsLength = 0, wn(this, s);
  }
  get dirty() {
    if (this._dirtyLevel === 2)
      return !1;
    if (this._dirtyLevel === 3 || this._dirtyLevel === 4) {
      this._dirtyLevel = 1, Ve();
      for (let t = 0; t < this._depsLength; t++) {
        const n = this.deps[t];
        if (n.computed) {
          if (n.computed.effect._dirtyLevel === 2)
            return !0;
          if (Nn(n.computed), this._dirtyLevel >= 5)
            break;
        }
      }
      this._dirtyLevel === 1 && (this._dirtyLevel = 0), Re();
    }
    return this._dirtyLevel >= 5;
  }
  set dirty(t) {
    this._dirtyLevel = t ? 5 : 0;
  }
  run() {
    if (this._dirtyLevel = 0, !this.active)
      return this.fn();
    let t = z, n = se;
    try {
      return z = !0, se = this, this._runnings++, ct(this), this.fn();
    } finally {
      lt(this), this._runnings--, se = n, z = t;
    }
  }
  stop() {
    this.active && (ct(this), lt(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function Nn(e) {
  return e.value;
}
function ct(e) {
  e._trackId++, e._depsLength = 0;
}
function lt(e) {
  if (e.deps.length > e._depsLength) {
    for (let t = e._depsLength; t < e.deps.length; t++)
      Vt(e.deps[t], e);
    e.deps.length = e._depsLength;
  }
}
function Vt(e, t) {
  const n = e.get(t);
  n !== void 0 && t._trackId !== n && (e.delete(t), e.size === 0 && e.cleanup());
}
let z = !0, Fe = 0;
const Rt = [];
function Ve() {
  Rt.push(z), z = !1;
}
function Re() {
  const e = Rt.pop();
  z = e === void 0 ? !0 : e;
}
function qe() {
  Fe++;
}
function Ye() {
  for (Fe--; !Fe && Le.length; )
    Le.shift()();
}
function On(e, t, n) {
  var r;
  if (t.get(e) !== e._trackId) {
    t.set(e, e._trackId);
    const s = e.deps[e._depsLength];
    s !== t ? (s && Vt(s, e), e.deps[e._depsLength++] = t) : e._depsLength++, process.env.NODE_ENV !== "production" && ((r = e.onTrack) == null || r.call(e, D({ effect: e }, n)));
  }
}
const Le = [];
function Sn(e, t, n) {
  var r;
  qe();
  for (const s of e.keys()) {
    if (!e.computed && s.computed && e.get(s) === s._trackId && s._runnings > 0) {
      s._dirtyLevel = 2;
      continue;
    }
    let o;
    s._dirtyLevel < t && (o ?? (o = e.get(s) === s._trackId)) && (s._shouldSchedule || (s._shouldSchedule = s._dirtyLevel === 0), s.computed && s._dirtyLevel === 2 && (s._shouldSchedule = !0), s._dirtyLevel = t), s._shouldSchedule && (o ?? (o = e.get(s) === s._trackId)) && (process.env.NODE_ENV !== "production" && ((r = s.onTrigger) == null || r.call(s, D({ effect: s }, n))), s.trigger(), (!s._runnings || s.allowRecurse) && s._dirtyLevel !== 3 && (s._shouldSchedule = !1, s.scheduler && Le.push(s.scheduler)));
  }
  Ye();
}
const yn = (e, t) => {
  const n = /* @__PURE__ */ new Map();
  return n.cleanup = e, n.computed = t, n;
}, je = /* @__PURE__ */ new WeakMap(), U = Symbol(process.env.NODE_ENV !== "production" ? "iterate" : ""), He = Symbol(process.env.NODE_ENV !== "production" ? "Map key iterate" : "");
function O(e, t, n) {
  if (z && se) {
    let r = je.get(e);
    r || je.set(e, r = /* @__PURE__ */ new Map());
    let s = r.get(n);
    s || r.set(n, s = yn(() => r.delete(n))), On(
      se,
      s,
      process.env.NODE_ENV !== "production" ? {
        target: e,
        type: t,
        key: n
      } : void 0
    );
  }
}
function A(e, t, n, r, s, o) {
  const i = je.get(e);
  if (!i)
    return;
  let l = [];
  if (t === "clear")
    l = [...i.values()];
  else if (n === "length" && h(e)) {
    const u = Number(r);
    i.forEach((a, _) => {
      (_ === "length" || !J(_) && _ >= u) && l.push(a);
    });
  } else
    switch (n !== void 0 && l.push(i.get(n)), t) {
      case "add":
        h(e) ? Be(n) && l.push(i.get("length")) : (l.push(i.get(U)), K(e) && l.push(i.get(He)));
        break;
      case "delete":
        h(e) || (l.push(i.get(U)), K(e) && l.push(i.get(He)));
        break;
      case "set":
        K(e) && l.push(i.get(U));
        break;
    }
  qe();
  for (const u of l)
    u && Sn(
      u,
      5,
      process.env.NODE_ENV !== "production" ? {
        target: e,
        type: t,
        key: n,
        newValue: r,
        oldValue: s,
        oldTarget: o
      } : void 0
    );
  Ye();
}
const vn = /* @__PURE__ */ on("__proto__,__v_isRef,__isVue"), Dt = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(J)
), ut = /* @__PURE__ */ xn();
function xn() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...n) {
      const r = p(this);
      for (let o = 0, i = this.length; o < i; o++)
        O(r, "get", o + "");
      const s = r[t](...n);
      return s === -1 || s === !1 ? r[t](...n.map(p)) : s;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...n) {
      Ve(), qe();
      const r = p(this)[t].apply(this, n);
      return Ye(), Re(), r;
    };
  }), e;
}
function Vn(e) {
  J(e) || (e = String(e));
  const t = p(this);
  return O(t, "has", e), t.hasOwnProperty(e);
}
class It {
  constructor(t = !1, n = !1) {
    this._isReadonly = t, this._isShallow = n;
  }
  get(t, n, r) {
    const s = this._isReadonly, o = this._isShallow;
    if (n === "__v_isReactive")
      return !s;
    if (n === "__v_isReadonly")
      return s;
    if (n === "__v_isShallow")
      return o;
    if (n === "__v_raw")
      return r === (s ? o ? Mt : $t : o ? Hn : Tt).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the reciever is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(r) ? t : void 0;
    const i = h(t);
    if (!s) {
      if (i && E(ut, n))
        return Reflect.get(ut, n, r);
      if (n === "hasOwnProperty")
        return Vn;
    }
    const l = Reflect.get(t, n, r);
    return (J(n) ? Dt.has(n) : vn(n)) || (s || O(t, "get", n), o) ? l : x(l) ? i && Be(n) ? l : l.value : N(l) ? s ? Ft(l) : At(l) : l;
  }
}
class Rn extends It {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, r, s) {
    let o = t[n];
    if (!this._isShallow) {
      const u = te(o);
      if (!Z(r) && !te(r) && (o = p(o), r = p(r)), !h(t) && x(o) && !x(r))
        return u ? !1 : (o.value = r, !0);
    }
    const i = h(t) && Be(n) ? Number(n) < t.length : E(t, n), l = Reflect.set(t, n, r, s);
    return t === p(s) && (i ? ee(r, o) && A(t, "set", n, r, o) : A(t, "add", n, r)), l;
  }
  deleteProperty(t, n) {
    const r = E(t, n), s = t[n], o = Reflect.deleteProperty(t, n);
    return o && r && A(t, "delete", n, void 0, s), o;
  }
  has(t, n) {
    const r = Reflect.has(t, n);
    return (!J(n) || !Dt.has(n)) && O(t, "has", n), r;
  }
  ownKeys(t) {
    return O(
      t,
      "iterate",
      h(t) ? "length" : U
    ), Reflect.ownKeys(t);
  }
}
class Ct extends It {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, n) {
    return process.env.NODE_ENV !== "production" && ce(
      `Set operation on key "${String(n)}" failed: target is readonly.`,
      t
    ), !0;
  }
  deleteProperty(t, n) {
    return process.env.NODE_ENV !== "production" && ce(
      `Delete operation on key "${String(n)}" failed: target is readonly.`,
      t
    ), !0;
  }
}
const Dn = /* @__PURE__ */ new Rn(), In = /* @__PURE__ */ new Ct(), Cn = /* @__PURE__ */ new Ct(!0), Ge = (e) => e, De = (e) => Reflect.getPrototypeOf(e);
function ae(e, t, n = !1, r = !1) {
  e = e.__v_raw;
  const s = p(e), o = p(t);
  n || (ee(t, o) && O(s, "get", t), O(s, "get", o));
  const { has: i } = De(s), l = r ? Ge : n ? ke : Ze;
  if (i.call(s, t))
    return l(e.get(t));
  if (i.call(s, o))
    return l(e.get(o));
  e !== s && e.get(t);
}
function fe(e, t = !1) {
  const n = this.__v_raw, r = p(n), s = p(e);
  return t || (ee(e, s) && O(r, "has", e), O(r, "has", s)), e === s ? n.has(e) : n.has(e) || n.has(s);
}
function pe(e, t = !1) {
  return e = e.__v_raw, !t && O(p(e), "iterate", U), Reflect.get(e, "size", e);
}
function at(e) {
  e = p(e);
  const t = p(this);
  return De(t).has.call(t, e) || (t.add(e), A(t, "add", e, e)), this;
}
function ft(e, t) {
  t = p(t);
  const n = p(this), { has: r, get: s } = De(n);
  let o = r.call(n, e);
  o ? process.env.NODE_ENV !== "production" && Pt(n, r, e) : (e = p(e), o = r.call(n, e));
  const i = s.call(n, e);
  return n.set(e, t), o ? ee(t, i) && A(n, "set", e, t, i) : A(n, "add", e, t), this;
}
function pt(e) {
  const t = p(this), { has: n, get: r } = De(t);
  let s = n.call(t, e);
  s ? process.env.NODE_ENV !== "production" && Pt(t, n, e) : (e = p(e), s = n.call(t, e));
  const o = r ? r.call(t, e) : void 0, i = t.delete(e);
  return s && A(t, "delete", e, void 0, o), i;
}
function dt() {
  const e = p(this), t = e.size !== 0, n = process.env.NODE_ENV !== "production" ? K(e) ? new Map(e) : new Set(e) : void 0, r = e.clear();
  return t && A(e, "clear", void 0, void 0, n), r;
}
function de(e, t) {
  return function(r, s) {
    const o = this, i = o.__v_raw, l = p(i), u = t ? Ge : e ? ke : Ze;
    return !e && O(l, "iterate", U), i.forEach((a, _) => r.call(s, u(a), u(_), o));
  };
}
function he(e, t, n) {
  return function(...r) {
    const s = this.__v_raw, o = p(s), i = K(o), l = e === "entries" || e === Symbol.iterator && i, u = e === "keys" && i, a = s[e](...r), _ = n ? Ge : t ? ke : Ze;
    return !t && O(
      o,
      "iterate",
      u ? He : U
    ), {
      // iterator protocol
      next() {
        const { value: c, done: f } = a.next();
        return f ? { value: c, done: f } : {
          value: l ? [_(c[0]), _(c[1])] : _(c),
          done: f
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function T(e) {
  return function(...t) {
    if (process.env.NODE_ENV !== "production") {
      const n = t[0] ? `on key "${t[0]}" ` : "";
      ce(
        `${pn(e)} operation ${n}failed: target is readonly.`,
        p(this)
      );
    }
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function Pn() {
  const e = {
    get(o) {
      return ae(this, o);
    },
    get size() {
      return pe(this);
    },
    has: fe,
    add: at,
    set: ft,
    delete: pt,
    clear: dt,
    forEach: de(!1, !1)
  }, t = {
    get(o) {
      return ae(this, o, !1, !0);
    },
    get size() {
      return pe(this);
    },
    has: fe,
    add: at,
    set: ft,
    delete: pt,
    clear: dt,
    forEach: de(!1, !0)
  }, n = {
    get(o) {
      return ae(this, o, !0);
    },
    get size() {
      return pe(this, !0);
    },
    has(o) {
      return fe.call(this, o, !0);
    },
    add: T("add"),
    set: T("set"),
    delete: T("delete"),
    clear: T("clear"),
    forEach: de(!0, !1)
  }, r = {
    get(o) {
      return ae(this, o, !0, !0);
    },
    get size() {
      return pe(this, !0);
    },
    has(o) {
      return fe.call(this, o, !0);
    },
    add: T("add"),
    set: T("set"),
    delete: T("delete"),
    clear: T("clear"),
    forEach: de(!0, !0)
  };
  return [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((o) => {
    e[o] = he(o, !1, !1), n[o] = he(o, !0, !1), t[o] = he(o, !1, !0), r[o] = he(
      o,
      !0,
      !0
    );
  }), [
    e,
    n,
    t,
    r
  ];
}
const [
  Tn,
  $n,
  Mn,
  An
] = /* @__PURE__ */ Pn();
function Xe(e, t) {
  const n = t ? e ? An : Mn : e ? $n : Tn;
  return (r, s, o) => s === "__v_isReactive" ? !e : s === "__v_isReadonly" ? e : s === "__v_raw" ? r : Reflect.get(
    E(n, s) && s in r ? n : r,
    s,
    o
  );
}
const Fn = {
  get: /* @__PURE__ */ Xe(!1, !1)
}, Ln = {
  get: /* @__PURE__ */ Xe(!0, !1)
}, jn = {
  get: /* @__PURE__ */ Xe(!0, !0)
};
function Pt(e, t, n) {
  const r = p(n);
  if (r !== n && t.call(e, r)) {
    const s = St(e);
    ce(
      `Reactive ${s} contains both the raw and reactive versions of the same object${s === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
const Tt = /* @__PURE__ */ new WeakMap(), Hn = /* @__PURE__ */ new WeakMap(), $t = /* @__PURE__ */ new WeakMap(), Mt = /* @__PURE__ */ new WeakMap();
function Kn(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function zn(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Kn(St(e));
}
function At(e) {
  return te(e) ? e : Qe(
    e,
    !1,
    Dn,
    Fn,
    Tt
  );
}
function Ft(e) {
  return Qe(
    e,
    !0,
    In,
    Ln,
    $t
  );
}
function _e(e) {
  return Qe(
    e,
    !0,
    Cn,
    jn,
    Mt
  );
}
function Qe(e, t, n, r, s) {
  if (!N(e))
    return process.env.NODE_ENV !== "production" && ce(
      `value cannot be made ${t ? "readonly" : "reactive"}: ${String(
        e
      )}`
    ), e;
  if (e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const o = s.get(e);
  if (o)
    return o;
  const i = zn(e);
  if (i === 0)
    return e;
  const l = new Proxy(
    e,
    i === 2 ? r : n
  );
  return s.set(e, l), l;
}
function Q(e) {
  return te(e) ? Q(e.__v_raw) : !!(e && e.__v_isReactive);
}
function te(e) {
  return !!(e && e.__v_isReadonly);
}
function Z(e) {
  return !!(e && e.__v_isShallow);
}
function Ke(e) {
  return e ? !!e.__v_raw : !1;
}
function p(e) {
  const t = e && e.__v_raw;
  return t ? p(t) : e;
}
function Un(e) {
  return Object.isExtensible(e) && dn(e, "__v_skip", !0), e;
}
const Ze = (e) => N(e) ? At(e) : e, ke = (e) => N(e) ? Ft(e) : e;
function x(e) {
  return !!(e && e.__v_isRef === !0);
}
function Wn(e) {
  return x(e) ? e.value : e;
}
const Bn = {
  get: (e, t, n) => Wn(Reflect.get(e, t, n)),
  set: (e, t, n, r) => {
    const s = e[t];
    return x(s) && !x(n) ? (s.value = n, !0) : Reflect.set(e, t, n, r);
  }
};
function Jn(e) {
  return Q(e) ? e : new Proxy(e, Bn);
}
/**
* @vue/runtime-core v3.4.29
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const W = [];
function qn(e) {
  W.push(e);
}
function Yn() {
  W.pop();
}
function g(e, ...t) {
  Ve();
  const n = W.length ? W[W.length - 1].component : null, r = n && n.appContext.config.warnHandler, s = Gn();
  if (r)
    B(
      r,
      n,
      11,
      [
        // eslint-disable-next-line no-restricted-syntax
        e + t.map((o) => {
          var i, l;
          return (l = (i = o.toString) == null ? void 0 : i.call(o)) != null ? l : JSON.stringify(o);
        }).join(""),
        n && n.proxy,
        s.map(
          ({ vnode: o }) => `at <${en(n, o.type)}>`
        ).join(`
`),
        s
      ]
    );
  else {
    const o = [`[Vue warn]: ${e}`, ...t];
    s.length && o.push(`
`, ...Xn(s)), console.warn(...o);
  }
  Re();
}
function Gn() {
  let e = W[W.length - 1];
  if (!e)
    return [];
  const t = [];
  for (; e; ) {
    const n = t[0];
    n && n.vnode === e ? n.recurseCount++ : t.push({
      vnode: e,
      recurseCount: 0
    });
    const r = e.component && e.component.parent;
    e = r && r.vnode;
  }
  return t;
}
function Xn(e) {
  const t = [];
  return e.forEach((n, r) => {
    t.push(...r === 0 ? [] : [`
`], ...Qn(n));
  }), t;
}
function Qn({ vnode: e, recurseCount: t }) {
  const n = t > 0 ? `... (${t} recursive calls)` : "", r = e.component ? e.component.parent == null : !1, s = ` at <${en(
    e.component,
    e.type,
    r
  )}`, o = ">" + n;
  return e.props ? [s, ...Zn(e.props), o] : [s + o];
}
function Zn(e) {
  const t = [], n = Object.keys(e);
  return n.slice(0, 3).forEach((r) => {
    t.push(...Lt(r, e[r]));
  }), n.length > 3 && t.push(" ..."), t;
}
function Lt(e, t, n) {
  return v(t) ? (t = JSON.stringify(t), n ? t : [`${e}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? n ? t : [`${e}=${t}`] : x(t) ? (t = Lt(e, p(t.value), !0), n ? t : [`${e}=Ref<`, t, ">"]) : w(t) ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`] : (t = p(t), n ? t : [`${e}=`, t]);
}
const jt = {
  sp: "serverPrefetch hook",
  bc: "beforeCreate hook",
  c: "created hook",
  bm: "beforeMount hook",
  m: "mounted hook",
  bu: "beforeUpdate hook",
  u: "updated",
  bum: "beforeUnmount hook",
  um: "unmounted hook",
  a: "activated hook",
  da: "deactivated hook",
  ec: "errorCaptured hook",
  rtc: "renderTracked hook",
  rtg: "renderTriggered hook",
  0: "setup function",
  1: "render function",
  2: "watcher getter",
  3: "watcher callback",
  4: "watcher cleanup function",
  5: "native event handler",
  6: "component event handler",
  7: "vnode hook",
  8: "directive hook",
  9: "transition hook",
  10: "app errorHandler",
  11: "app warnHandler",
  12: "ref function",
  13: "async component loader",
  14: "scheduler flush. This is likely a Vue internals bug. Please open an issue at https://github.com/vuejs/core ."
};
function B(e, t, n, r) {
  try {
    return r ? e(...r) : e();
  } catch (s) {
    et(s, t, n);
  }
}
function Ee(e, t, n, r) {
  if (w(e)) {
    const s = B(e, t, n, r);
    return s && an(s) && s.catch((o) => {
      et(o, t, n);
    }), s;
  }
  if (h(e)) {
    const s = [];
    for (let o = 0; o < e.length; o++)
      s.push(Ee(e[o], t, n, r));
    return s;
  } else process.env.NODE_ENV !== "production" && g(
    `Invalid value type passed to callWithAsyncErrorHandling(): ${typeof e}`
  );
}
function et(e, t, n, r = !0) {
  const s = t ? t.vnode : null;
  if (t) {
    let o = t.parent;
    const i = t.proxy, l = process.env.NODE_ENV !== "production" ? jt[n] : `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; o; ) {
      const a = o.ec;
      if (a) {
        for (let _ = 0; _ < a.length; _++)
          if (a[_](e, i, l) === !1)
            return;
      }
      o = o.parent;
    }
    const u = t.appContext.config.errorHandler;
    if (u) {
      Ve(), B(
        u,
        null,
        10,
        [e, i, l]
      ), Re();
      return;
    }
  }
  kn(e, n, s, r);
}
function kn(e, t, n, r = !0) {
  if (process.env.NODE_ENV !== "production") {
    const s = jt[t];
    if (n && qn(n), g(`Unhandled error${s ? ` during execution of ${s}` : ""}`), n && Yn(), r)
      throw e;
    console.error(e);
  } else
    console.error(e);
}
let Ne = !1, ze = !1;
const V = [];
let M = 0;
const k = [];
let $ = null, j = 0;
const Ht = /* @__PURE__ */ Promise.resolve();
let tt = null;
const er = 100;
function tr(e) {
  const t = tt || Ht;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function nr(e) {
  let t = M + 1, n = V.length;
  for (; t < n; ) {
    const r = t + n >>> 1, s = V[r], o = le(s);
    o < e || o === e && s.pre ? t = r + 1 : n = r;
  }
  return t;
}
function nt(e) {
  (!V.length || !V.includes(
    e,
    Ne && e.allowRecurse ? M + 1 : M
  )) && (e.id == null ? V.push(e) : V.splice(nr(e.id), 0, e), Kt());
}
function Kt() {
  !Ne && !ze && (ze = !0, tt = Ht.then(Ut));
}
function zt(e) {
  h(e) ? k.push(...e) : (!$ || !$.includes(
    e,
    e.allowRecurse ? j + 1 : j
  )) && k.push(e), Kt();
}
function rr(e) {
  if (k.length) {
    const t = [...new Set(k)].sort(
      (n, r) => le(n) - le(r)
    );
    if (k.length = 0, $) {
      $.push(...t);
      return;
    }
    for ($ = t, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), j = 0; j < $.length; j++) {
      const n = $[j];
      process.env.NODE_ENV !== "production" && Wt(e, n) || n.active !== !1 && n();
    }
    $ = null, j = 0;
  }
}
const le = (e) => e.id == null ? 1 / 0 : e.id, sr = (e, t) => {
  const n = le(e) - le(t);
  if (n === 0) {
    if (e.pre && !t.pre) return -1;
    if (t.pre && !e.pre) return 1;
  }
  return n;
};
function Ut(e) {
  ze = !1, Ne = !0, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), V.sort(sr);
  const t = process.env.NODE_ENV !== "production" ? (n) => Wt(e, n) : G;
  try {
    for (M = 0; M < V.length; M++) {
      const n = V[M];
      if (n && n.active !== !1) {
        if (process.env.NODE_ENV !== "production" && t(n))
          continue;
        B(n, null, 14);
      }
    }
  } finally {
    M = 0, V.length = 0, rr(e), Ne = !1, tt = null, (V.length || k.length) && Ut(e);
  }
}
function Wt(e, t) {
  if (!e.has(t))
    e.set(t, 1);
  else {
    const n = e.get(t);
    if (n > er) {
      const r = t.ownerInstance, s = r && kt(r.type);
      return et(
        `Maximum recursive updates exceeded${s ? ` in component <${s}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`,
        null,
        10
      ), !0;
    } else
      e.set(t, n + 1);
  }
}
const q = /* @__PURE__ */ new Set();
process.env.NODE_ENV !== "production" && (vt().__VUE_HMR_RUNTIME__ = {
  createRecord: Me(or),
  rerender: Me(ir),
  reload: Me(cr)
});
const Oe = /* @__PURE__ */ new Map();
function or(e, t) {
  return Oe.has(e) ? !1 : (Oe.set(e, {
    initialDef: oe(t),
    instances: /* @__PURE__ */ new Set()
  }), !0);
}
function oe(e) {
  return tn(e) ? e.__vccOpts : e;
}
function ir(e, t) {
  const n = Oe.get(e);
  n && (n.initialDef.render = t, [...n.instances].forEach((r) => {
    t && (r.render = t, oe(r.type).render = t), r.renderCache = [], r.effect.dirty = !0, r.update();
  }));
}
function cr(e, t) {
  const n = Oe.get(e);
  if (!n) return;
  t = oe(t), ht(n.initialDef, t);
  const r = [...n.instances];
  for (const s of r) {
    const o = oe(s.type);
    q.has(o) || (o !== n.initialDef && ht(o, t), q.add(o)), s.appContext.propsCache.delete(s.type), s.appContext.emitsCache.delete(s.type), s.appContext.optionsCache.delete(s.type), s.ceReload ? (q.add(o), s.ceReload(t.styles), q.delete(o)) : s.parent ? (s.parent.effect.dirty = !0, nt(() => {
      s.parent.update(), q.delete(o);
    })) : s.appContext.reload ? s.appContext.reload() : typeof window < "u" ? window.location.reload() : console.warn(
      "[HMR] Root or manually mounted instance modified. Full reload required."
    );
  }
  zt(() => {
    for (const s of r)
      q.delete(
        oe(s.type)
      );
  });
}
function ht(e, t) {
  D(e, t);
  for (const n in e)
    n !== "__file" && !(n in t) && delete e[n];
}
function Me(e) {
  return (t, n) => {
    try {
      return e(t, n);
    } catch (r) {
      console.error(r), console.warn(
        "[HMR] Something went wrong during Vue component hot-reload. Full reload required."
      );
    }
  };
}
let Y, ge = [];
function Bt(e, t) {
  var n, r;
  Y = e, Y ? (Y.enabled = !0, ge.forEach(({ event: s, args: o }) => Y.emit(s, ...o)), ge = []) : /* handle late devtools injection - only do this if we are in an actual */ /* browser environment to avoid the timer handle stalling test runner exit */ /* (#4815) */ typeof window < "u" && // some envs mock window but not fully
  window.HTMLElement && // also exclude jsdom
  // eslint-disable-next-line no-restricted-syntax
  !((r = (n = window.navigator) == null ? void 0 : n.userAgent) != null && r.includes("jsdom")) ? ((t.__VUE_DEVTOOLS_HOOK_REPLAY__ = t.__VUE_DEVTOOLS_HOOK_REPLAY__ || []).push((o) => {
    Bt(o, t);
  }), setTimeout(() => {
    Y || (t.__VUE_DEVTOOLS_HOOK_REPLAY__ = null, ge = []);
  }, 3e3)) : ge = [];
}
let P = null, lr = null;
const ur = Symbol.for("v-ndc"), ar = (e) => e.__isSuspense;
function fr(e, t) {
  t && t.pendingBranch ? h(e) ? t.effects.push(...e) : t.effects.push(e) : zt(e);
}
function pr(e, t) {
  return process.env.NODE_ENV !== "production" && g("withDirectives can only be used inside render functions."), e;
}
const Ue = (e) => e ? jr(e) ? Hr(e) : Ue(e.parent) : null, ie = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ D(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => process.env.NODE_ENV !== "production" ? _e(e.props) : e.props,
    $attrs: (e) => process.env.NODE_ENV !== "production" ? _e(e.attrs) : e.attrs,
    $slots: (e) => process.env.NODE_ENV !== "production" ? _e(e.slots) : e.slots,
    $refs: (e) => process.env.NODE_ENV !== "production" ? _e(e.refs) : e.refs,
    $parent: (e) => Ue(e.parent),
    $root: (e) => Ue(e.root),
    $emit: (e) => e.emit,
    $options: (e) => _r(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      e.effect.dirty = !0, nt(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = tr.bind(e.proxy)),
    $watch: (e) => yr.bind(e)
  })
), dr = (e) => e === "_" || e === "$", Ae = (e, t) => e !== C && !e.__isScriptSetup && E(e, t), hr = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: r, data: s, props: o, accessCache: i, type: l, appContext: u } = e;
    if (process.env.NODE_ENV !== "production" && t === "__isVue")
      return !0;
    let a;
    if (t[0] !== "$") {
      const m = i[t];
      if (m !== void 0)
        switch (m) {
          case 1:
            return r[t];
          case 2:
            return s[t];
          case 4:
            return n[t];
          case 3:
            return o[t];
        }
      else {
        if (Ae(r, t))
          return i[t] = 1, r[t];
        if (s !== C && E(s, t))
          return i[t] = 2, s[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (a = e.propsOptions[0]) && E(a, t)
        )
          return i[t] = 3, o[t];
        if (n !== C && E(n, t))
          return i[t] = 4, n[t];
        i[t] = 0;
      }
    }
    const _ = ie[t];
    let c, f;
    if (_)
      return t === "$attrs" ? (O(e.attrs, "get", ""), process.env.NODE_ENV !== "production" && void 0) : process.env.NODE_ENV !== "production" && t === "$slots" && O(e, "get", t), _(e);
    if (
      // css module (injected by vue-loader)
      (c = l.__cssModules) && (c = c[t])
    )
      return c;
    if (n !== C && E(n, t))
      return i[t] = 4, n[t];
    if (
      // global properties
      f = u.config.globalProperties, E(f, t)
    )
      return f[t];
    process.env.NODE_ENV !== "production" && P && (!v(t) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    t.indexOf("__v") !== 0) && (s !== C && dr(t[0]) && E(s, t) ? g(
      `Property ${JSON.stringify(
        t
      )} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`
    ) : e === P && g(
      `Property ${JSON.stringify(t)} was accessed during render but is not defined on instance.`
    ));
  },
  set({ _: e }, t, n) {
    const { data: r, setupState: s, ctx: o } = e;
    return Ae(s, t) ? (s[t] = n, !0) : process.env.NODE_ENV !== "production" && s.__isScriptSetup && E(s, t) ? (g(`Cannot mutate <script setup> binding "${t}" from Options API.`), !1) : r !== C && E(r, t) ? (r[t] = n, !0) : E(e.props, t) ? (process.env.NODE_ENV !== "production" && g(`Attempting to mutate prop "${t}". Props are readonly.`), !1) : t[0] === "$" && t.slice(1) in e ? (process.env.NODE_ENV !== "production" && g(
      `Attempting to mutate public property "${t}". Properties starting with $ are reserved and readonly.`
    ), !1) : (process.env.NODE_ENV !== "production" && t in e.appContext.config.globalProperties ? Object.defineProperty(o, t, {
      enumerable: !0,
      configurable: !0,
      value: n
    }) : o[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: r, appContext: s, propsOptions: o }
  }, i) {
    let l;
    return !!n[i] || e !== C && E(e, i) || Ae(t, i) || (l = o[0]) && E(l, i) || E(r, i) || E(ie, i) || E(s.config.globalProperties, i);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : E(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
process.env.NODE_ENV !== "production" && (hr.ownKeys = (e) => (g(
  "Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."
), Reflect.ownKeys(e)));
function _t(e) {
  return h(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
function _r(e) {
  const t = e.type, { mixins: n, extends: r } = t, {
    mixins: s,
    optionsCache: o,
    config: { optionMergeStrategies: i }
  } = e.appContext, l = o.get(t);
  let u;
  return l ? u = l : !s.length && !n && !r ? u = t : (u = {}, s.length && s.forEach(
    (a) => Se(u, a, i, !0)
  ), Se(u, t, i)), N(t) && o.set(t, u), u;
}
function Se(e, t, n, r = !1) {
  const { mixins: s, extends: o } = t;
  o && Se(e, o, n, !0), s && s.forEach(
    (i) => Se(e, i, n, !0)
  );
  for (const i in t)
    if (r && i === "expose")
      process.env.NODE_ENV !== "production" && g(
        '"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.'
      );
    else {
      const l = gr[i] || n && n[i];
      e[i] = l ? l(e[i], t[i]) : t[i];
    }
  return e;
}
const gr = {
  data: gt,
  props: Et,
  emits: Et,
  // objects
  methods: re,
  computed: re,
  // lifecycle
  beforeCreate: S,
  created: S,
  beforeMount: S,
  mounted: S,
  beforeUpdate: S,
  updated: S,
  beforeDestroy: S,
  beforeUnmount: S,
  destroyed: S,
  unmounted: S,
  activated: S,
  deactivated: S,
  errorCaptured: S,
  serverPrefetch: S,
  // assets
  components: re,
  directives: re,
  // watch
  watch: Er,
  // provide / inject
  provide: gt,
  inject: mr
};
function gt(e, t) {
  return t ? e ? function() {
    return D(
      w(e) ? e.call(this, this) : e,
      w(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function mr(e, t) {
  return re(mt(e), mt(t));
}
function mt(e) {
  if (h(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function S(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function re(e, t) {
  return e ? D(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Et(e, t) {
  return e ? h(e) && h(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : D(
    /* @__PURE__ */ Object.create(null),
    _t(e),
    _t(t ?? {})
  ) : t;
}
function Er(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = D(/* @__PURE__ */ Object.create(null), e);
  for (const r in t)
    n[r] = S(e[r], t[r]);
  return n;
}
let wt = null;
function wr(e, t, n = !1) {
  const r = Ie || P;
  if (r || wt) {
    const s = r ? r.parent == null ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : wt._context.provides;
    if (s && e in s)
      return s[e];
    if (arguments.length > 1)
      return n && w(t) ? t.call(r && r.proxy) : t;
    process.env.NODE_ENV !== "production" && g(`injection "${String(e)}" not found.`);
  } else process.env.NODE_ENV !== "production" && g("inject() can only be used inside setup() or functional components.");
}
const br = {}, Jt = (e) => Object.getPrototypeOf(e) === br, bt = fr, Nr = Symbol.for("v-scx"), Or = () => {
  {
    const e = wr(Nr);
    return e || process.env.NODE_ENV !== "production" && g(
      "Server rendering context not provided. Make sure to only call useSSRContext() conditionally in the server build."
    ), e;
  }
}, me = {};
function Sr(e, t, {
  immediate: n,
  deep: r,
  flush: s,
  once: o,
  onTrack: i,
  onTrigger: l
} = C) {
  if (t && o) {
    const d = t;
    t = (...Te) => {
      d(...Te), Pe();
    };
  }
  process.env.NODE_ENV !== "production" && r !== void 0 && typeof r == "number" && g(
    'watch() "deep" option with number value will be used as watch depth in future versions. Please use a boolean instead to avoid potential breakage.'
  ), process.env.NODE_ENV !== "production" && !t && (n !== void 0 && g(
    'watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'
  ), r !== void 0 && g(
    'watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'
  ), o !== void 0 && g(
    'watch() "once" option is only respected when using the watch(source, callback, options?) signature.'
  ));
  const u = (d) => {
    g(
      "Invalid watch source: ",
      d,
      "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types."
    );
  }, a = Ie, _ = (d) => r === !0 ? d : (
    // for deep: false, only traverse root-level properties
    H(d, r === !1 ? 1 : void 0)
  );
  let c, f = !1, m = !1;
  if (x(e) ? (c = () => e.value, f = Z(e)) : Q(e) ? (c = () => _(e), f = !0) : h(e) ? (m = !0, f = e.some((d) => Q(d) || Z(d)), c = () => e.map((d) => {
    if (x(d))
      return d.value;
    if (Q(d))
      return _(d);
    if (w(d))
      return B(d, a, 2);
    process.env.NODE_ENV !== "production" && u(d);
  })) : w(e) ? t ? c = () => B(e, a, 2) : c = () => (b && b(), Ee(
    e,
    a,
    3,
    [I]
  )) : (c = G, process.env.NODE_ENV !== "production" && u(e)), t && r) {
    const d = c;
    c = () => H(d());
  }
  let b, I = (d) => {
    b = y.onStop = () => {
      B(d, a, 4), b = y.onStop = void 0;
    };
  }, Ce;
  if (Zt)
    if (I = G, t ? n && Ee(t, a, 3, [
      c(),
      m ? [] : void 0,
      I
    ]) : c(), s === "sync") {
      const d = Or();
      Ce = d.__watcherHandles || (d.__watcherHandles = []);
    } else
      return G;
  let F = m ? new Array(e.length).fill(me) : me;
  const L = () => {
    if (!(!y.active || !y.dirty))
      if (t) {
        const d = y.run();
        (r || f || (m ? d.some((Te, sn) => ee(Te, F[sn])) : ee(d, F))) && (b && b(), Ee(t, a, 3, [
          d,
          // pass undefined as the old value when it's changed for the first time
          F === me ? void 0 : m && F[0] === me ? [] : F,
          I
        ]), F = d);
      } else
        y.run();
  };
  L.allowRecurse = !!t;
  let ue;
  s === "sync" ? ue = L : s === "post" ? ue = () => bt(L, a && a.suspense) : (L.pre = !0, a && (L.id = a.uid), ue = () => nt(L));
  const y = new bn(c, G, ue), Pe = () => {
    y.stop();
  };
  return process.env.NODE_ENV !== "production" && (y.onTrack = i, y.onTrigger = l), t ? n ? L() : F = y.run() : s === "post" ? bt(
    y.run.bind(y),
    a && a.suspense
  ) : y.run(), Ce && Ce.push(Pe), Pe;
}
function yr(e, t, n) {
  const r = this.proxy, s = v(e) ? e.includes(".") ? vr(r, e) : () => r[e] : e.bind(r, r);
  let o;
  w(t) ? o = t : (o = t.handler, n = t);
  const i = Lr(this), l = Sr(s, o.bind(r), n);
  return i(), l;
}
function vr(e, t) {
  const n = t.split(".");
  return () => {
    let r = e;
    for (let s = 0; s < n.length && r; s++)
      r = r[n[s]];
    return r;
  };
}
function H(e, t = 1 / 0, n) {
  if (t <= 0 || !N(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Set(), n.has(e)))
    return e;
  if (n.add(e), t--, x(e))
    H(e.value, t, n);
  else if (h(e))
    for (let r = 0; r < e.length; r++)
      H(e[r], t, n);
  else if (Nt(e) || K(e))
    e.forEach((r) => {
      H(r, t, n);
    });
  else if (yt(e)) {
    for (const r in e)
      H(e[r], t, n);
    for (const r of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, r) && H(e[r], t, n);
  }
  return e;
}
function qt(e, t) {
  e.shapeFlag & 6 && e.component ? qt(e.component.subTree, t) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
const xr = (e) => e.__isTeleport, rt = Symbol.for("v-fgt"), Vr = Symbol.for("v-txt"), Rr = Symbol.for("v-cmt"), we = [];
let R = null;
function Dr(e = !1) {
  we.push(R = e ? null : []);
}
function Ir() {
  we.pop(), R = we[we.length - 1] || null;
}
function Cr(e) {
  return e.dynamicChildren = R || cn, Ir(), R && R.push(e), e;
}
function Pr(e, t, n, r, s, o) {
  return Cr(
    X(
      e,
      t,
      n,
      r,
      s,
      o,
      !0
    )
  );
}
function Tr(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
const $r = (...e) => Gt(
  ...e
), Yt = ({ key: e }) => e ?? null, be = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? v(e) || x(e) || w(e) ? { i: P, r: e, k: t, f: !!n } : e : null);
function X(e, t = null, n = null, r = 0, s = null, o = e === rt ? 0 : 1, i = !1, l = !1) {
  const u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Yt(t),
    ref: t && be(t),
    scopeId: lr,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: o,
    patchFlag: r,
    dynamicProps: s,
    dynamicChildren: null,
    appContext: null,
    ctx: P
  };
  return l ? (st(u, n), o & 128 && e.normalize(u)) : n && (u.shapeFlag |= v(n) ? 8 : 16), process.env.NODE_ENV !== "production" && u.key !== u.key && g("VNode created with invalid key (NaN). VNode type:", u.type), // avoid a block node from tracking itself
  !i && // has current parent block
  R && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (u.patchFlag > 0 || o & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  u.patchFlag !== 32 && R.push(u), u;
}
const Mr = process.env.NODE_ENV !== "production" ? $r : Gt;
function Gt(e, t = null, n = null, r = 0, s = null, o = !1) {
  if ((!e || e === ur) && (process.env.NODE_ENV !== "production" && !e && g(`Invalid vnode type when creating vnode: ${e}.`), e = Rr), Tr(e)) {
    const l = ye(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && st(l, n), !o && R && (l.shapeFlag & 6 ? R[R.indexOf(e)] = l : R.push(l)), l.patchFlag = -2, l;
  }
  if (tn(e) && (e = e.__vccOpts), t) {
    t = Ar(t);
    let { class: l, style: u } = t;
    l && !v(l) && (t.class = xe(l)), N(u) && (Ke(u) && !h(u) && (u = D({}, u)), t.style = Je(u));
  }
  const i = v(e) ? 1 : ar(e) ? 128 : xr(e) ? 64 : N(e) ? 4 : w(e) ? 2 : 0;
  return process.env.NODE_ENV !== "production" && i & 4 && Ke(e) && (e = p(e), g(
    "Vue received a Component that was made a reactive object. This can lead to unnecessary performance overhead and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.",
    `
Component that was made reactive: `,
    e
  )), X(
    e,
    t,
    n,
    r,
    s,
    i,
    o,
    !0
  );
}
function Ar(e) {
  return e ? Ke(e) || Jt(e) ? D({}, e) : e : null;
}
function ye(e, t, n = !1, r = !1) {
  const { props: s, ref: o, patchFlag: i, children: l, transition: u } = e, a = t ? Fr(s || {}, t) : s, _ = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: a,
    key: a && Yt(a),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && o ? h(o) ? o.concat(be(t)) : [o, be(t)] : be(t)
    ) : o,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: process.env.NODE_ENV !== "production" && i === -1 && h(l) ? l.map(Xt) : l,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== rt ? i === -1 ? 16 : i | 16 : i,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: u,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && ye(e.ssContent),
    ssFallback: e.ssFallback && ye(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return u && r && qt(
    _,
    u.clone(_)
  ), _;
}
function Xt(e) {
  const t = ye(e);
  return h(e.children) && (t.children = e.children.map(Xt)), t;
}
function Qt(e = " ", t = 0) {
  return Mr(Vr, null, e, t);
}
function st(e, t) {
  let n = 0;
  const { shapeFlag: r } = e;
  if (t == null)
    t = null;
  else if (h(t))
    n = 16;
  else if (typeof t == "object")
    if (r & 65) {
      const s = t.default;
      s && (s._c && (s._d = !1), st(e, s()), s._c && (s._d = !0));
      return;
    } else {
      n = 32;
      const s = t._;
      !s && !Jt(t) ? t._ctx = P : s === 3 && P && (P.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else w(t) ? (t = { default: t, _ctx: P }, n = 32) : (t = String(t), r & 64 ? (n = 16, t = [Qt(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function Fr(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    for (const s in r)
      if (s === "class")
        t.class !== r.class && (t.class = xe([t.class, r.class]));
      else if (s === "style")
        t.style = Je([t.style, r.style]);
      else if (ln(s)) {
        const o = t[s], i = r[s];
        i && o !== i && !(h(o) && o.includes(i)) && (t[s] = o ? [].concat(o, i) : i);
      } else s !== "" && (t[s] = r[s]);
  }
  return t;
}
let Ie = null, We;
{
  const e = vt(), t = (n, r) => {
    let s;
    return (s = e[n]) || (s = e[n] = []), s.push(r), (o) => {
      s.length > 1 ? s.forEach((i) => i(o)) : s[0](o);
    };
  };
  We = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => Ie = n
  ), t(
    "__VUE_SSR_SETTERS__",
    (n) => Zt = n
  );
}
const Lr = (e) => {
  const t = Ie;
  return We(e), e.scope.on(), () => {
    e.scope.off(), We(t);
  };
};
function jr(e) {
  return e.vnode.shapeFlag & 4;
}
let Zt = !1;
process.env.NODE_ENV;
function Hr(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(Jn(Un(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in ie)
        return ie[n](e);
    },
    has(t, n) {
      return n in t || n in ie;
    }
  })) : e.proxy;
}
const Kr = /(?:^|[-_])(\w)/g, zr = (e) => e.replace(Kr, (t) => t.toUpperCase()).replace(/[-_]/g, "");
function kt(e, t = !0) {
  return w(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function en(e, t, n = !1) {
  let r = kt(t);
  if (!r && t.__file) {
    const s = t.__file.match(/([^/\\]+)\.\w+$/);
    s && (r = s[1]);
  }
  if (!r && e && e.parent) {
    const s = (o) => {
      for (const i in o)
        if (o[i] === t)
          return i;
    };
    r = s(
      e.components || e.parent.type.components
    ) || s(e.appContext.components);
  }
  return r ? zr(r) : n ? "App" : "Anonymous";
}
function tn(e) {
  return w(e) && "__vccOpts" in e;
}
function Ur() {
  if (process.env.NODE_ENV === "production" || typeof window > "u")
    return;
  const e = { style: "color:#3ba776" }, t = { style: "color:#1677ff" }, n = { style: "color:#f5222d" }, r = { style: "color:#eb2f96" }, s = {
    header(c) {
      return N(c) ? c.__isVue ? ["div", e, "VueInstance"] : x(c) ? [
        "div",
        {},
        ["span", e, _(c)],
        "<",
        l(c.value),
        ">"
      ] : Q(c) ? [
        "div",
        {},
        ["span", e, Z(c) ? "ShallowReactive" : "Reactive"],
        "<",
        l(c),
        `>${te(c) ? " (readonly)" : ""}`
      ] : te(c) ? [
        "div",
        {},
        ["span", e, Z(c) ? "ShallowReadonly" : "Readonly"],
        "<",
        l(c),
        ">"
      ] : null : null;
    },
    hasBody(c) {
      return c && c.__isVue;
    },
    body(c) {
      if (c && c.__isVue)
        return [
          "div",
          {},
          ...o(c.$)
        ];
    }
  };
  function o(c) {
    const f = [];
    c.type.props && c.props && f.push(i("props", p(c.props))), c.setupState !== C && f.push(i("setup", c.setupState)), c.data !== C && f.push(i("data", p(c.data)));
    const m = u(c, "computed");
    m && f.push(i("computed", m));
    const b = u(c, "inject");
    return b && f.push(i("injected", b)), f.push([
      "div",
      {},
      [
        "span",
        {
          style: r.style + ";opacity:0.66"
        },
        "$ (internal): "
      ],
      ["object", { object: c }]
    ]), f;
  }
  function i(c, f) {
    return f = D({}, f), Object.keys(f).length ? [
      "div",
      { style: "line-height:1.25em;margin-bottom:0.6em" },
      [
        "div",
        {
          style: "color:#476582"
        },
        c
      ],
      [
        "div",
        {
          style: "padding-left:1.25em"
        },
        ...Object.keys(f).map((m) => [
          "div",
          {},
          ["span", r, m + ": "],
          l(f[m], !1)
        ])
      ]
    ] : ["span", {}];
  }
  function l(c, f = !0) {
    return typeof c == "number" ? ["span", t, c] : typeof c == "string" ? ["span", n, JSON.stringify(c)] : typeof c == "boolean" ? ["span", r, c] : N(c) ? ["object", { object: f ? p(c) : c }] : ["span", n, String(c)];
  }
  function u(c, f) {
    const m = c.type;
    if (w(m))
      return;
    const b = {};
    for (const I in c.ctx)
      a(m, I, f) && (b[I] = c.ctx[I]);
    return b;
  }
  function a(c, f, m) {
    const b = c[m];
    if (h(b) && b.includes(f) || N(b) && f in b || c.extends && a(c.extends, f, m) || c.mixins && c.mixins.some((I) => a(I, f, m)))
      return !0;
  }
  function _(c) {
    return Z(c) ? "ShallowRef" : c.effect ? "ComputedRef" : "Ref";
  }
  window.devtoolsFormatters ? window.devtoolsFormatters.push(s) : window.devtoolsFormatters = [s];
}
process.env.NODE_ENV;
process.env.NODE_ENV;
process.env.NODE_ENV;
/**
* @vue/runtime-dom v3.4.29
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const nn = Symbol("_vod"), Wr = Symbol("_vsh"), rn = {
  beforeMount(e, { value: t }, { transition: n }) {
    e[nn] = e.style.display === "none" ? "" : e.style.display, n && t ? n.beforeEnter(e) : ne(e, t);
  },
  mounted(e, { value: t }, { transition: n }) {
    n && t && n.enter(e);
  },
  updated(e, { value: t, oldValue: n }, { transition: r }) {
    !t != !n && (r ? t ? (r.beforeEnter(e), ne(e, !0), r.enter(e)) : r.leave(e, () => {
      ne(e, !1);
    }) : ne(e, t));
  },
  beforeUnmount(e, { value: t }) {
    ne(e, t);
  }
};
process.env.NODE_ENV !== "production" && (rn.name = "show");
function ne(e, t) {
  e.style.display = t ? e[nn] : "none", e[Wr] = !t;
}
Symbol(process.env.NODE_ENV !== "production" ? "CSS_VAR_TEXT" : "");
/**
* vue v3.4.29
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function Br() {
  Ur();
}
process.env.NODE_ENV !== "production" && Br();
const Jr = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [r, s] of t)
    n[r] = s;
  return n;
}, qr = ["for"], Yr = ["disabled", "name", "value"], Gr = { class: "pl-textarea__error-message" }, Xr = {
  __name: "PLTextarea",
  props: {
    disabled: {
      type: Boolean
    },
    modelValue: {
      type: String
    },
    label: {
      type: String
    },
    error: {
      type: String
    },
    name: {
      type: String
    }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = t, r = e;
    return (s, o) => (Dr(), Pr(rt, null, [
      X("label", {
        for: r.name,
        class: "pl-textarea__wrapper"
      }, [
        Qt(it(e.label) + " ", 1),
        X("textarea", {
          disabled: e.disabled,
          class: xe({ "pl-textarea__root": !0, "pl-textarea__root_error": !!r.error }),
          name: r.name,
          value: r.modelValue,
          onInput: o[0] || (o[0] = (i) => n("update:modelValue", i.target.value))
        }, null, 42, Yr)
      ], 8, qr),
      X("div", Gr, [
        pr(X("span", null, it(e.error), 513), [
          [rn, !!e.error]
        ])
      ])
    ], 64));
  }
}, Qr = /* @__PURE__ */ Jr(Xr, [["__scopeId", "data-v-83fda7f4"]]);
export {
  Qr as PLTextarea
};

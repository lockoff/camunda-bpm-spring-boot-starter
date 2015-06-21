var requirejs, require, define;
!function (global) {
  function isFunction(e) {
    return "[object Function]" === ostring.call(e)
  }

  function isArray(e) {
    return "[object Array]" === ostring.call(e)
  }

  function each(e, t) {
    if (e) {
      var n;
      for (n = 0; n < e.length && (!e[n] || !t(e[n], n, e)); n += 1);
    }
  }

  function eachReverse(e, t) {
    if (e) {
      var n;
      for (n = e.length - 1; n > -1 && (!e[n] || !t(e[n], n, e)); n -= 1);
    }
  }

  function hasProp(e, t) {
    return hasOwn.call(e, t)
  }

  function getOwn(e, t) {
    return hasProp(e, t) && e[t]
  }

  function eachProp(e, t) {
    var n;
    for (n in e)if (hasProp(e, n) && t(e[n], n))break
  }

  function mixin(e, t, n, r) {
    return t && eachProp(t, function (t, i) {
      (n || !hasProp(e, i)) && (!r || "object" != typeof t || !t || isArray(t) || isFunction(t) || t instanceof RegExp ? e[i] = t : (e[i] || (e[i] = {}), mixin(e[i], t, n, r)))
    }), e
  }

  function bind(e, t) {
    return function () {
      return t.apply(e, arguments)
    }
  }

  function scripts() {
    return document.getElementsByTagName("script")
  }

  function defaultOnError(e) {
    throw e
  }

  function getGlobal(e) {
    if (!e)return e;
    var t = global;
    return each(e.split("."), function (e) {
      t = t[e]
    }), t
  }

  function makeError(e, t, n, r) {
    var i = new Error(t + "\nhttp://requirejs.org/docs/errors.html#" + e);
    return i.requireType = e, i.requireModules = r, n && (i.originalError = n), i
  }

  function newContext(e) {
    function t(e) {
      var t, n;
      for (t = 0; t < e.length; t++)if (n = e[t], "." === n)e.splice(t, 1), t -= 1; else if (".." === n) {
        if (0 === t || 1 == t && ".." === e[2] || ".." === e[t - 1])continue;
        t > 0 && (e.splice(t - 1, 2), t -= 2)
      }
    }

    function n(e, n, r) {
      var i, a, o, s, u, l, c, p, f, d, h, m, g = n && n.split("/"), v = E.map, y = v && v["*"];
      if (e && (e = e.split("/"), c = e.length - 1, E.nodeIdCompat && jsSuffixRegExp.test(e[c]) && (e[c] = e[c].replace(jsSuffixRegExp, "")), "." === e[0].charAt(0) && g && (m = g.slice(0, g.length - 1), e = m.concat(e)), t(e), e = e.join("/")), r && v && (g || y)) {
        o = e.split("/");
        e:for (s = o.length; s > 0; s -= 1) {
          if (l = o.slice(0, s).join("/"), g)for (u = g.length; u > 0; u -= 1)if (a = getOwn(v, g.slice(0, u).join("/")), a && (a = getOwn(a, l))) {
            p = a, f = s;
            break e
          }
          !d && y && getOwn(y, l) && (d = getOwn(y, l), h = s)
        }
        !p && d && (p = d, f = h), p && (o.splice(0, f, p), e = o.join("/"))
      }
      return i = getOwn(E.pkgs, e), i ? i : e
    }

    function r(e) {
      isBrowser && each(scripts(), function (t) {
        return t.getAttribute("data-requiremodule") === e && t.getAttribute("data-requirecontext") === x.contextName ? (t.parentNode.removeChild(t), !0) : void 0
      })
    }

    function i(e) {
      var t = getOwn(E.paths, e);
      return t && isArray(t) && t.length > 1 ? (t.shift(), x.require.undef(e), x.makeRequire(null, {skipMap: !0})([e]), !0) : void 0
    }

    function a(e) {
      var t, n = e ? e.indexOf("!") : -1;
      return n > -1 && (t = e.substring(0, n), e = e.substring(n + 1, e.length)), [t, e]
    }

    function o(e, t, r, i) {
      var o, s, u, l, c = null, p = t ? t.name : null, f = e, d = !0, h = "";
      return e || (d = !1, e = "_@r" + (M += 1)), l = a(e), c = l[0], e = l[1], c && (c = n(c, p, i), s = getOwn(A, c)), e && (c ? h = s && s.normalize ? s.normalize(e, function (e) {
        return n(e, p, i)
      }) : -1 === e.indexOf("!") ? n(e, p, i) : e : (h = n(e, p, i), l = a(h), c = l[0], h = l[1], r = !0, o = x.nameToUrl(h))), u = !c || s || r ? "" : "_unnormalized" + (O += 1), {
        prefix: c,
        name: h,
        parentMap: t,
        unnormalized: !!u,
        url: o,
        originalName: f,
        isDefine: d,
        id: (c ? c + "!" + h : h) + u
      }
    }

    function s(e) {
      var t = e.id, n = getOwn(S, t);
      return n || (n = S[t] = new x.Module(e)), n
    }

    function u(e, t, n) {
      var r = e.id, i = getOwn(S, r);
      !hasProp(A, r) || i && !i.defineEmitComplete ? (i = s(e), i.error && "error" === t ? n(i.error) : i.on(t, n)) : "defined" === t && n(A[r])
    }

    function l(e, t) {
      var n = e.requireModules, r = !1;
      t ? t(e) : (each(n, function (t) {
        var n = getOwn(S, t);
        n && (n.error = e, n.events.error && (r = !0, n.emit("error", e)))
      }), r || req.onError(e))
    }

    function c() {
      globalDefQueue.length && (apsp.apply(k, [k.length, 0].concat(globalDefQueue)), globalDefQueue = [])
    }

    function p(e) {
      delete S[e], delete T[e]
    }

    function f(e, t, n) {
      var r = e.map.id;
      e.error ? e.emit("error", e.error) : (t[r] = !0, each(e.depMaps, function (r, i) {
        var a = r.id, o = getOwn(S, a);
        !o || e.depMatched[i] || n[a] || (getOwn(t, a) ? (e.defineDep(i, A[a]), e.check()) : f(o, t, n))
      }), n[r] = !0)
    }

    function d() {
      var e, t, n = 1e3 * E.waitSeconds, a = n && x.startTime + n < (new Date).getTime(), o = [], s = [], u = !1, c = !0;
      if (!y) {
        if (y = !0, eachProp(T, function (e) {
            var n = e.map, l = n.id;
            if (e.enabled && (n.isDefine || s.push(e), !e.error))if (!e.inited && a)i(l) ? (t = !0, u = !0) : (o.push(l), r(l)); else if (!e.inited && e.fetched && n.isDefine && (u = !0, !n.prefix))return c = !1
          }), a && o.length)return e = makeError("timeout", "Load timeout for modules: " + o, null, o), e.contextName = x.contextName, l(e);
        c && each(s, function (e) {
          f(e, {}, {})
        }), a && !t || !u || !isBrowser && !isWebWorker || $ || ($ = setTimeout(function () {
          $ = 0, d()
        }, 50)), y = !1
      }
    }

    function h(e) {
      hasProp(A, e[0]) || s(o(e[0], null, !0)).init(e[1], e[2])
    }

    function m(e, t, n, r) {
      e.detachEvent && !isOpera ? r && e.detachEvent(r, t) : e.removeEventListener(n, t, !1)
    }

    function g(e) {
      var t = e.currentTarget || e.srcElement;
      return m(t, x.onScriptLoad, "load", "onreadystatechange"), m(t, x.onScriptError, "error"), {
        node: t,
        id: t && t.getAttribute("data-requiremodule")
      }
    }

    function v() {
      var e;
      for (c(); k.length;) {
        if (e = k.shift(), null === e[0])return l(makeError("mismatch", "Mismatched anonymous define() module: " + e[e.length - 1]));
        h(e)
      }
    }

    var y, b, x, w, $, E = {
      waitSeconds: 7,
      baseUrl: "./",
      paths: {},
      bundles: {},
      pkgs: {},
      shim: {},
      config: {}
    }, S = {}, T = {}, C = {}, k = [], A = {}, _ = {}, D = {}, M = 1, O = 1;
    return w = {
      require: function (e) {
        return e.require ? e.require : e.require = x.makeRequire(e.map)
      }, exports: function (e) {
        return e.usingExports = !0, e.map.isDefine ? e.exports ? A[e.map.id] = e.exports : e.exports = A[e.map.id] = {} : void 0
      }, module: function (e) {
        return e.module ? e.module : e.module = {
          id: e.map.id, uri: e.map.url, config: function () {
            return getOwn(E.config, e.map.id) || {}
          }, exports: e.exports || (e.exports = {})
        }
      }
    }, b = function (e) {
      this.events = getOwn(C, e.id) || {}, this.map = e, this.shim = getOwn(E.shim, e.id), this.depExports = [], this.depMaps = [], this.depMatched = [], this.pluginMaps = {}, this.depCount = 0
    }, b.prototype = {
      init: function (e, t, n, r) {
        r = r || {}, this.inited || (this.factory = t, n ? this.on("error", n) : this.events.error && (n = bind(this, function (e) {
          this.emit("error", e)
        })), this.depMaps = e && e.slice(0), this.errback = n, this.inited = !0, this.ignore = r.ignore, r.enabled || this.enabled ? this.enable() : this.check())
      }, defineDep: function (e, t) {
        this.depMatched[e] || (this.depMatched[e] = !0, this.depCount -= 1, this.depExports[e] = t)
      }, fetch: function () {
        if (!this.fetched) {
          this.fetched = !0, x.startTime = (new Date).getTime();
          var e = this.map;
          return this.shim ? void x.makeRequire(this.map, {enableBuildCallback: !0})(this.shim.deps || [], bind(this, function () {
            return e.prefix ? this.callPlugin() : this.load()
          })) : e.prefix ? this.callPlugin() : this.load()
        }
      }, load: function () {
        var e = this.map.url;
        _[e] || (_[e] = !0, x.load(this.map.id, e))
      }, check: function () {
        if (this.enabled && !this.enabling) {
          var e, t, n = this.map.id, r = this.depExports, i = this.exports, a = this.factory;
          if (this.inited) {
            if (this.error)this.emit("error", this.error); else if (!this.defining) {
              if (this.defining = !0, this.depCount < 1 && !this.defined) {
                if (isFunction(a)) {
                  if (this.events.error && this.map.isDefine || req.onError !== defaultOnError)try {
                    i = x.execCb(n, a, r, i)
                  } catch (o) {
                    e = o
                  } else i = x.execCb(n, a, r, i);
                  if (this.map.isDefine && void 0 === i && (t = this.module, t ? i = t.exports : this.usingExports && (i = this.exports)), e)return e.requireMap = this.map, e.requireModules = this.map.isDefine ? [this.map.id] : null, e.requireType = this.map.isDefine ? "define" : "require", l(this.error = e)
                } else i = a;
                this.exports = i, this.map.isDefine && !this.ignore && (A[n] = i, req.onResourceLoad && req.onResourceLoad(x, this.map, this.depMaps)), p(n), this.defined = !0
              }
              this.defining = !1, this.defined && !this.defineEmitted && (this.defineEmitted = !0, this.emit("defined", this.exports), this.defineEmitComplete = !0)
            }
          } else this.fetch()
        }
      }, callPlugin: function () {
        var e = this.map, t = e.id, r = o(e.prefix);
        this.depMaps.push(r), u(r, "defined", bind(this, function (r) {
          var i, a, c, f = getOwn(D, this.map.id), d = this.map.name, h = this.map.parentMap ? this.map.parentMap.name : null, m = x.makeRequire(e.parentMap, {enableBuildCallback: !0});
          return this.map.unnormalized ? (r.normalize && (d = r.normalize(d, function (e) {
              return n(e, h, !0)
            }) || ""), a = o(e.prefix + "!" + d, this.map.parentMap), u(a, "defined", bind(this, function (e) {
            this.init([], function () {
              return e
            }, null, {enabled: !0, ignore: !0})
          })), c = getOwn(S, a.id), void(c && (this.depMaps.push(a), this.events.error && c.on("error", bind(this, function (e) {
            this.emit("error", e)
          })), c.enable()))) : f ? (this.map.url = x.nameToUrl(f), void this.load()) : (i = bind(this, function (e) {
            this.init([], function () {
              return e
            }, null, {enabled: !0})
          }), i.error = bind(this, function (e) {
            this.inited = !0, this.error = e, e.requireModules = [t], eachProp(S, function (e) {
              0 === e.map.id.indexOf(t + "_unnormalized") && p(e.map.id)
            }), l(e)
          }), i.fromText = bind(this, function (n, r) {
            var a = e.name, u = o(a), c = useInteractive;
            r && (n = r), c && (useInteractive = !1), s(u), hasProp(E.config, t) && (E.config[a] = E.config[t]);
            try {
              req.exec(n)
            } catch (p) {
              return l(makeError("fromtexteval", "fromText eval for " + t + " failed: " + p, p, [t]))
            }
            c && (useInteractive = !0), this.depMaps.push(u), x.completeLoad(a), m([a], i)
          }), void r.load(e.name, m, i, E))
        })), x.enable(r, this), this.pluginMaps[r.id] = r
      }, enable: function () {
        T[this.map.id] = this, this.enabled = !0, this.enabling = !0, each(this.depMaps, bind(this, function (e, t) {
          var n, r, i;
          if ("string" == typeof e) {
            if (e = o(e, this.map.isDefine ? this.map : this.map.parentMap, !1, !this.skipMap), this.depMaps[t] = e, i = getOwn(w, e.id))return void(this.depExports[t] = i(this));
            this.depCount += 1, u(e, "defined", bind(this, function (e) {
              this.defineDep(t, e), this.check()
            })), this.errback && u(e, "error", bind(this, this.errback))
          }
          n = e.id, r = S[n], hasProp(w, n) || !r || r.enabled || x.enable(e, this)
        })), eachProp(this.pluginMaps, bind(this, function (e) {
          var t = getOwn(S, e.id);
          t && !t.enabled && x.enable(e, this)
        })), this.enabling = !1, this.check()
      }, on: function (e, t) {
        var n = this.events[e];
        n || (n = this.events[e] = []), n.push(t)
      }, emit: function (e, t) {
        each(this.events[e], function (e) {
          e(t)
        }), "error" === e && delete this.events[e]
      }
    }, x = {
      config: E,
      contextName: e,
      registry: S,
      defined: A,
      urlFetched: _,
      defQueue: k,
      Module: b,
      makeModuleMap: o,
      nextTick: req.nextTick,
      onError: l,
      configure: function (e) {
        e.baseUrl && "/" !== e.baseUrl.charAt(e.baseUrl.length - 1) && (e.baseUrl += "/");
        var t = E.shim, n = {paths: !0, bundles: !0, config: !0, map: !0};
        eachProp(e, function (e, t) {
          n[t] ? (E[t] || (E[t] = {}), mixin(E[t], e, !0, !0)) : E[t] = e
        }), e.bundles && eachProp(e.bundles, function (e, t) {
          each(e, function (e) {
            e !== t && (D[e] = t)
          })
        }), e.shim && (eachProp(e.shim, function (e, n) {
          isArray(e) && (e = {deps: e}), !e.exports && !e.init || e.exportsFn || (e.exportsFn = x.makeShimExports(e)), t[n] = e
        }), E.shim = t), e.packages && each(e.packages, function (e) {
          var t, n;
          e = "string" == typeof e ? {name: e} : e, n = e.name, t = e.location, t && (E.paths[n] = e.location), E.pkgs[n] = e.name + "/" + (e.main || "main").replace(currDirRegExp, "").replace(jsSuffixRegExp, "")
        }), eachProp(S, function (e, t) {
          e.inited || e.map.unnormalized || (e.map = o(t))
        }), (e.deps || e.callback) && x.require(e.deps || [], e.callback)
      },
      makeShimExports: function (e) {
        function t() {
          var t;
          return e.init && (t = e.init.apply(global, arguments)), t || e.exports && getGlobal(e.exports)
        }

        return t
      },
      makeRequire: function (t, i) {
        function a(n, r, u) {
          var c, p, f;
          return i.enableBuildCallback && r && isFunction(r) && (r.__requireJsBuild = !0), "string" == typeof n ? isFunction(r) ? l(makeError("requireargs", "Invalid require call"), u) : t && hasProp(w, n) ? w[n](S[t.id]) : req.get ? req.get(x, n, t, a) : (p = o(n, t, !1, !0), c = p.id, hasProp(A, c) ? A[c] : l(makeError("notloaded", 'Module name "' + c + '" has not been loaded yet for context: ' + e + (t ? "" : ". Use require([])")))) : (v(), x.nextTick(function () {
            v(), f = s(o(null, t)), f.skipMap = i.skipMap, f.init(n, r, u, {enabled: !0}), d()
          }), a)
        }

        return i = i || {}, mixin(a, {
          isBrowser: isBrowser, toUrl: function (e) {
            var r, i = e.lastIndexOf("."), a = e.split("/")[0], o = "." === a || ".." === a;
            return -1 !== i && (!o || i > 1) && (r = e.substring(i, e.length), e = e.substring(0, i)), x.nameToUrl(n(e, t && t.id, !0), r, !0)
          }, defined: function (e) {
            return hasProp(A, o(e, t, !1, !0).id)
          }, specified: function (e) {
            return e = o(e, t, !1, !0).id, hasProp(A, e) || hasProp(S, e)
          }
        }), t || (a.undef = function (e) {
          c();
          var n = o(e, t, !0), i = getOwn(S, e);
          r(e), delete A[e], delete _[n.url], delete C[e], eachReverse(k, function (t, n) {
            t[0] === e && k.splice(n, 1)
          }), i && (i.events.defined && (C[e] = i.events), p(e))
        }), a
      },
      enable: function (e) {
        var t = getOwn(S, e.id);
        t && s(e).enable()
      },
      completeLoad: function (e) {
        var t, n, r, a = getOwn(E.shim, e) || {}, o = a.exports;
        for (c(); k.length;) {
          if (n = k.shift(), null === n[0]) {
            if (n[0] = e, t)break;
            t = !0
          } else n[0] === e && (t = !0);
          h(n)
        }
        if (r = getOwn(S, e), !t && !hasProp(A, e) && r && !r.inited) {
          if (!(!E.enforceDefine || o && getGlobal(o)))return i(e) ? void 0 : l(makeError("nodefine", "No define call for " + e, null, [e]));
          h([e, a.deps || [], a.exportsFn])
        }
        d()
      },
      nameToUrl: function (e, t, n) {
        var r, i, a, o, s, u, l, c = getOwn(E.pkgs, e);
        if (c && (e = c), l = getOwn(D, e))return x.nameToUrl(l, t, n);
        if (req.jsExtRegExp.test(e))s = e + (t || ""); else {
          for (r = E.paths, i = e.split("/"), a = i.length; a > 0; a -= 1)if (o = i.slice(0, a).join("/"), u = getOwn(r, o)) {
            isArray(u) && (u = u[0]), i.splice(0, a, u);
            break
          }
          s = i.join("/"), s += t || (/^data\:|\?/.test(s) || n ? "" : ".js"), s = ("/" === s.charAt(0) || s.match(/^[\w\+\.\-]+:/) ? "" : E.baseUrl) + s
        }
        return E.urlArgs ? s + ((-1 === s.indexOf("?") ? "?" : "&") + E.urlArgs) : s
      },
      load: function (e, t) {
        req.load(x, e, t)
      },
      execCb: function (e, t, n, r) {
        return t.apply(r, n)
      },
      onScriptLoad: function (e) {
        if ("load" === e.type || readyRegExp.test((e.currentTarget || e.srcElement).readyState)) {
          interactiveScript = null;
          var t = g(e);
          x.completeLoad(t.id)
        }
      },
      onScriptError: function (e) {
        var t = g(e);
        return i(t.id) ? void 0 : l(makeError("scripterror", "Script error for: " + t.id, e, [t.id]))
      }
    }, x.require = x.makeRequire(), x
  }

  function getInteractiveScript() {
    return interactiveScript && "interactive" === interactiveScript.readyState ? interactiveScript : (eachReverse(scripts(), function (e) {
      return "interactive" === e.readyState ? interactiveScript = e : void 0
    }), interactiveScript)
  }

  var req, s, head, baseElement, dataMain, src, interactiveScript, currentlyAddingScript, mainScript, subPath, version = "2.1.14", commentRegExp = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm, cjsRequireRegExp = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g, jsSuffixRegExp = /\.js$/, currDirRegExp = /^\.\//, op = Object.prototype, ostring = op.toString, hasOwn = op.hasOwnProperty, ap = Array.prototype, apsp = ap.splice, isBrowser = !("undefined" == typeof window || "undefined" == typeof navigator || !window.document), isWebWorker = !isBrowser && "undefined" != typeof importScripts, readyRegExp = isBrowser && "PLAYSTATION 3" === navigator.platform ? /^complete$/ : /^(complete|loaded)$/, defContextName = "_", isOpera = "undefined" != typeof opera && "[object Opera]" === opera.toString(), contexts = {}, cfg = {}, globalDefQueue = [], useInteractive = !1;
  if ("undefined" == typeof define) {
    if ("undefined" != typeof requirejs) {
      if (isFunction(requirejs))return;
      cfg = requirejs, requirejs = void 0
    }
    "undefined" == typeof require || isFunction(require) || (cfg = require, require = void 0), req = requirejs = function (e, t, n, r) {
      var i, a, o = defContextName;
      return isArray(e) || "string" == typeof e || (a = e, isArray(t) ? (e = t, t = n, n = r) : e = []), a && a.context && (o = a.context), i = getOwn(contexts, o), i || (i = contexts[o] = req.s.newContext(o)), a && i.configure(a), i.require(e, t, n)
    }, req.config = function (e) {
      return req(e)
    }, req.nextTick = "undefined" != typeof setTimeout ? function (e) {
      setTimeout(e, 4)
    } : function (e) {
      e()
    }, require || (require = req), req.version = version, req.jsExtRegExp = /^\/|:|\?|\.js$/, req.isBrowser = isBrowser, s = req.s = {
      contexts: contexts,
      newContext: newContext
    }, req({}), each(["toUrl", "undef", "defined", "specified"], function (e) {
      req[e] = function () {
        var t = contexts[defContextName];
        return t.require[e].apply(t, arguments)
      }
    }), isBrowser && (head = s.head = document.getElementsByTagName("head")[0], baseElement = document.getElementsByTagName("base")[0], baseElement && (head = s.head = baseElement.parentNode)), req.onError = defaultOnError, req.createNode = function (e) {
      var t = e.xhtml ? document.createElementNS("http://www.w3.org/1999/xhtml", "html:script") : document.createElement("script");
      return t.type = e.scriptType || "text/javascript", t.charset = "utf-8", t.async = !0, t
    }, req.load = function (e, t, n) {
      var r, i = e && e.config || {};
      if (isBrowser)return r = req.createNode(i, t, n), r.setAttribute("data-requirecontext", e.contextName), r.setAttribute("data-requiremodule", t), !r.attachEvent || r.attachEvent.toString && r.attachEvent.toString().indexOf("[native code") < 0 || isOpera ? (r.addEventListener("load", e.onScriptLoad, !1), r.addEventListener("error", e.onScriptError, !1)) : (useInteractive = !0, r.attachEvent("onreadystatechange", e.onScriptLoad)), r.src = n, currentlyAddingScript = r, baseElement ? head.insertBefore(r, baseElement) : head.appendChild(r), currentlyAddingScript = null, r;
      if (isWebWorker)try {
        importScripts(n), e.completeLoad(t)
      } catch (a) {
        e.onError(makeError("importscripts", "importScripts failed for " + t + " at " + n, a, [t]))
      }
    }, isBrowser && !cfg.skipDataMain && eachReverse(scripts(), function (e) {
      return head || (head = e.parentNode), dataMain = e.getAttribute("data-main"), dataMain ? (mainScript = dataMain, cfg.baseUrl || (src = mainScript.split("/"), mainScript = src.pop(), subPath = src.length ? src.join("/") + "/" : "./", cfg.baseUrl = subPath), mainScript = mainScript.replace(jsSuffixRegExp, ""), req.jsExtRegExp.test(mainScript) && (mainScript = dataMain), cfg.deps = cfg.deps ? cfg.deps.concat(mainScript) : [mainScript], !0) : void 0
    }), define = function (e, t, n) {
      var r, i;
      "string" != typeof e && (n = t, t = e, e = null), isArray(t) || (n = t, t = null), !t && isFunction(n) && (t = [], n.length && (n.toString().replace(commentRegExp, "").replace(cjsRequireRegExp, function (e, n) {
        t.push(n)
      }), t = (1 === n.length ? ["require"] : ["require", "exports", "module"]).concat(t))), useInteractive && (r = currentlyAddingScript || getInteractiveScript(), r && (e || (e = r.getAttribute("data-requiremodule")), i = contexts[r.getAttribute("data-requirecontext")])), (i ? i.defQueue : globalDefQueue).push([e, t, n])
    }, define.amd = {jQuery: !0}, req.exec = function (text) {
      return eval(text)
    }, req(cfg)
  }
}(this), define("requirejs", function () {
}), function (e, t) {
  "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function (e) {
    if (!e.document)throw new Error("jQuery requires a window with a document");
    return t(e)
  } : t(e)
}("undefined" != typeof window ? window : this, function (e, t) {
  function n(e) {
    var t = e.length, n = J.type(e);
    return "function" === n || J.isWindow(e) ? !1 : 1 === e.nodeType && t ? !0 : "array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e
  }

  function r(e, t, n) {
    if (J.isFunction(t))return J.grep(e, function (e, r) {
      return !!t.call(e, r, e) !== n
    });
    if (t.nodeType)return J.grep(e, function (e) {
      return e === t !== n
    });
    if ("string" == typeof t) {
      if (st.test(t))return J.filter(t, e, n);
      t = J.filter(t, e)
    }
    return J.grep(e, function (e) {
      return Y.call(t, e) >= 0 !== n
    })
  }

  function i(e, t) {
    for (; (e = e[t]) && 1 !== e.nodeType;);
    return e
  }

  function a(e) {
    var t = ht[e] = {};
    return J.each(e.match(dt) || [], function (e, n) {
      t[n] = !0
    }), t
  }

  function o() {
    Q.removeEventListener("DOMContentLoaded", o, !1), e.removeEventListener("load", o, !1), J.ready()
  }

  function s() {
    Object.defineProperty(this.cache = {}, 0, {
      get: function () {
        return {}
      }
    }), this.expando = J.expando + Math.random()
  }

  function u(e, t, n) {
    var r;
    if (void 0 === n && 1 === e.nodeType)if (r = "data-" + t.replace(xt, "-$1").toLowerCase(), n = e.getAttribute(r), "string" == typeof n) {
      try {
        n = "true" === n ? !0 : "false" === n ? !1 : "null" === n ? null : +n + "" === n ? +n : bt.test(n) ? J.parseJSON(n) : n
      } catch (i) {
      }
      yt.set(e, t, n)
    } else n = void 0;
    return n
  }

  function l() {
    return !0
  }

  function c() {
    return !1
  }

  function p() {
    try {
      return Q.activeElement
    } catch (e) {
    }
  }

  function f(e, t) {
    return J.nodeName(e, "table") && J.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
  }

  function d(e) {
    return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e
  }

  function h(e) {
    var t = It.exec(e.type);
    return t ? e.type = t[1] : e.removeAttribute("type"), e
  }

  function m(e, t) {
    for (var n = 0, r = e.length; r > n; n++)vt.set(e[n], "globalEval", !t || vt.get(t[n], "globalEval"))
  }

  function g(e, t) {
    var n, r, i, a, o, s, u, l;
    if (1 === t.nodeType) {
      if (vt.hasData(e) && (a = vt.access(e), o = vt.set(t, a), l = a.events)) {
        delete o.handle, o.events = {};
        for (i in l)for (n = 0, r = l[i].length; r > n; n++)J.event.add(t, i, l[i][n])
      }
      yt.hasData(e) && (s = yt.access(e), u = J.extend({}, s), yt.set(t, u))
    }
  }

  function v(e, t) {
    var n = e.getElementsByTagName ? e.getElementsByTagName(t || "*") : e.querySelectorAll ? e.querySelectorAll(t || "*") : [];
    return void 0 === t || t && J.nodeName(e, t) ? J.merge([e], n) : n
  }

  function y(e, t) {
    var n = t.nodeName.toLowerCase();
    "input" === n && St.test(e.type) ? t.checked = e.checked : ("input" === n || "textarea" === n) && (t.defaultValue = e.defaultValue)
  }

  function b(t, n) {
    var r, i = J(n.createElement(t)).appendTo(n.body), a = e.getDefaultComputedStyle && (r = e.getDefaultComputedStyle(i[0])) ? r.display : J.css(i[0], "display");
    return i.detach(), a
  }

  function x(e) {
    var t = Q, n = Bt[e];
    return n || (n = b(e, t), "none" !== n && n || (Ft = (Ft || J("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement), t = Ft[0].contentDocument, t.write(), t.close(), n = b(e, t), Ft.detach()), Bt[e] = n), n
  }

  function w(e, t, n) {
    var r, i, a, o, s = e.style;
    return n = n || Ut(e), n && (o = n.getPropertyValue(t) || n[t]), n && ("" !== o || J.contains(e.ownerDocument, e) || (o = J.style(e, t)), Vt.test(o) && qt.test(t) && (r = s.width, i = s.minWidth, a = s.maxWidth, s.minWidth = s.maxWidth = s.width = o, o = n.width, s.width = r, s.minWidth = i, s.maxWidth = a)), void 0 !== o ? o + "" : o
  }

  function $(e, t) {
    return {
      get: function () {
        return e() ? void delete this.get : (this.get = t).apply(this, arguments)
      }
    }
  }

  function E(e, t) {
    if (t in e)return t;
    for (var n = t[0].toUpperCase() + t.slice(1), r = t, i = Xt.length; i--;)if (t = Xt[i] + n, t in e)return t;
    return r
  }

  function S(e, t, n) {
    var r = Wt.exec(t);
    return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t
  }

  function T(e, t, n, r, i) {
    for (var a = n === (r ? "border" : "content") ? 4 : "width" === t ? 1 : 0, o = 0; 4 > a; a += 2)"margin" === n && (o += J.css(e, n + $t[a], !0, i)), r ? ("content" === n && (o -= J.css(e, "padding" + $t[a], !0, i)), "margin" !== n && (o -= J.css(e, "border" + $t[a] + "Width", !0, i))) : (o += J.css(e, "padding" + $t[a], !0, i), "padding" !== n && (o += J.css(e, "border" + $t[a] + "Width", !0, i)));
    return o
  }

  function C(e, t, n) {
    var r = !0, i = "width" === t ? e.offsetWidth : e.offsetHeight, a = Ut(e), o = "border-box" === J.css(e, "boxSizing", !1, a);
    if (0 >= i || null == i) {
      if (i = w(e, t, a), (0 > i || null == i) && (i = e.style[t]), Vt.test(i))return i;
      r = o && (K.boxSizingReliable() || i === e.style[t]), i = parseFloat(i) || 0
    }
    return i + T(e, t, n || (o ? "border" : "content"), r, a) + "px"
  }

  function k(e, t) {
    for (var n, r, i, a = [], o = 0, s = e.length; s > o; o++)r = e[o], r.style && (a[o] = vt.get(r, "olddisplay"), n = r.style.display, t ? (a[o] || "none" !== n || (r.style.display = ""), "" === r.style.display && Et(r) && (a[o] = vt.access(r, "olddisplay", x(r.nodeName)))) : (i = Et(r), "none" === n && i || vt.set(r, "olddisplay", i ? n : J.css(r, "display"))));
    for (o = 0; s > o; o++)r = e[o], r.style && (t && "none" !== r.style.display && "" !== r.style.display || (r.style.display = t ? a[o] || "" : "none"));
    return e
  }

  function A(e, t, n, r, i) {
    return new A.prototype.init(e, t, n, r, i)
  }

  function _() {
    return setTimeout(function () {
      Kt = void 0
    }), Kt = J.now()
  }

  function D(e, t) {
    var n, r = 0, i = {height: e};
    for (t = t ? 1 : 0; 4 > r; r += 2 - t)n = $t[r], i["margin" + n] = i["padding" + n] = e;
    return t && (i.opacity = i.width = e), i
  }

  function M(e, t, n) {
    for (var r, i = (nn[t] || []).concat(nn["*"]), a = 0, o = i.length; o > a; a++)if (r = i[a].call(n, t, e))return r
  }

  function O(e, t, n) {
    var r, i, a, o, s, u, l, c, p = this, f = {}, d = e.style, h = e.nodeType && Et(e), m = vt.get(e, "fxshow");
    n.queue || (s = J._queueHooks(e, "fx"), null == s.unqueued && (s.unqueued = 0, u = s.empty.fire, s.empty.fire = function () {
      s.unqueued || u()
    }), s.unqueued++, p.always(function () {
      p.always(function () {
        s.unqueued--, J.queue(e, "fx").length || s.empty.fire()
      })
    })), 1 === e.nodeType && ("height"in t || "width"in t) && (n.overflow = [d.overflow, d.overflowX, d.overflowY], l = J.css(e, "display"), c = "none" === l ? vt.get(e, "olddisplay") || x(e.nodeName) : l, "inline" === c && "none" === J.css(e, "float") && (d.display = "inline-block")), n.overflow && (d.overflow = "hidden", p.always(function () {
      d.overflow = n.overflow[0], d.overflowX = n.overflow[1], d.overflowY = n.overflow[2]
    }));
    for (r in t)if (i = t[r], Zt.exec(i)) {
      if (delete t[r], a = a || "toggle" === i, i === (h ? "hide" : "show")) {
        if ("show" !== i || !m || void 0 === m[r])continue;
        h = !0
      }
      f[r] = m && m[r] || J.style(e, r)
    } else l = void 0;
    if (J.isEmptyObject(f))"inline" === ("none" === l ? x(e.nodeName) : l) && (d.display = l); else {
      m ? "hidden"in m && (h = m.hidden) : m = vt.access(e, "fxshow", {}), a && (m.hidden = !h), h ? J(e).show() : p.done(function () {
        J(e).hide()
      }), p.done(function () {
        var t;
        vt.remove(e, "fxshow");
        for (t in f)J.style(e, t, f[t])
      });
      for (r in f)o = M(h ? m[r] : 0, r, p), r in m || (m[r] = o.start, h && (o.end = o.start, o.start = "width" === r || "height" === r ? 1 : 0))
    }
  }

  function N(e, t) {
    var n, r, i, a, o;
    for (n in e)if (r = J.camelCase(n), i = t[r], a = e[n], J.isArray(a) && (i = a[1], a = e[n] = a[0]), n !== r && (e[r] = a, delete e[n]), o = J.cssHooks[r], o && "expand"in o) {
      a = o.expand(a), delete e[r];
      for (n in a)n in e || (e[n] = a[n], t[n] = i)
    } else t[r] = i
  }

  function P(e, t, n) {
    var r, i, a = 0, o = tn.length, s = J.Deferred().always(function () {
      delete u.elem
    }), u = function () {
      if (i)return !1;
      for (var t = Kt || _(), n = Math.max(0, l.startTime + l.duration - t), r = n / l.duration || 0, a = 1 - r, o = 0, u = l.tweens.length; u > o; o++)l.tweens[o].run(a);
      return s.notifyWith(e, [l, a, n]), 1 > a && u ? n : (s.resolveWith(e, [l]), !1)
    }, l = s.promise({
      elem: e,
      props: J.extend({}, t),
      opts: J.extend(!0, {specialEasing: {}}, n),
      originalProperties: t,
      originalOptions: n,
      startTime: Kt || _(),
      duration: n.duration,
      tweens: [],
      createTween: function (t, n) {
        var r = J.Tween(e, l.opts, t, n, l.opts.specialEasing[t] || l.opts.easing);
        return l.tweens.push(r), r
      },
      stop: function (t) {
        var n = 0, r = t ? l.tweens.length : 0;
        if (i)return this;
        for (i = !0; r > n; n++)l.tweens[n].run(1);
        return t ? s.resolveWith(e, [l, t]) : s.rejectWith(e, [l, t]), this
      }
    }), c = l.props;
    for (N(c, l.opts.specialEasing); o > a; a++)if (r = tn[a].call(l, e, c, l.opts))return r;
    return J.map(c, M, l), J.isFunction(l.opts.start) && l.opts.start.call(e, l), J.fx.timer(J.extend(u, {
      elem: e,
      anim: l,
      queue: l.opts.queue
    })), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always)
  }

  function R(e) {
    return function (t, n) {
      "string" != typeof t && (n = t, t = "*");
      var r, i = 0, a = t.toLowerCase().match(dt) || [];
      if (J.isFunction(n))for (; r = a[i++];)"+" === r[0] ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n)
    }
  }

  function I(e, t, n, r) {
    function i(s) {
      var u;
      return a[s] = !0, J.each(e[s] || [], function (e, s) {
        var l = s(t, n, r);
        return "string" != typeof l || o || a[l] ? o ? !(u = l) : void 0 : (t.dataTypes.unshift(l), i(l), !1)
      }), u
    }

    var a = {}, o = e === $n;
    return i(t.dataTypes[0]) || !a["*"] && i("*")
  }

  function L(e, t) {
    var n, r, i = J.ajaxSettings.flatOptions || {};
    for (n in t)void 0 !== t[n] && ((i[n] ? e : r || (r = {}))[n] = t[n]);
    return r && J.extend(!0, e, r), e
  }

  function j(e, t, n) {
    for (var r, i, a, o, s = e.contents, u = e.dataTypes; "*" === u[0];)u.shift(), void 0 === r && (r = e.mimeType || t.getResponseHeader("Content-Type"));
    if (r)for (i in s)if (s[i] && s[i].test(r)) {
      u.unshift(i);
      break
    }
    if (u[0]in n)a = u[0]; else {
      for (i in n) {
        if (!u[0] || e.converters[i + " " + u[0]]) {
          a = i;
          break
        }
        o || (o = i)
      }
      a = a || o
    }
    return a ? (a !== u[0] && u.unshift(a), n[a]) : void 0
  }

  function F(e, t, n, r) {
    var i, a, o, s, u, l = {}, c = e.dataTypes.slice();
    if (c[1])for (o in e.converters)l[o.toLowerCase()] = e.converters[o];
    for (a = c.shift(); a;)if (e.responseFields[a] && (n[e.responseFields[a]] = t), !u && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), u = a, a = c.shift())if ("*" === a)a = u; else if ("*" !== u && u !== a) {
      if (o = l[u + " " + a] || l["* " + a], !o)for (i in l)if (s = i.split(" "), s[1] === a && (o = l[u + " " + s[0]] || l["* " + s[0]])) {
        o === !0 ? o = l[i] : l[i] !== !0 && (a = s[0], c.unshift(s[1]));
        break
      }
      if (o !== !0)if (o && e["throws"])t = o(t); else try {
        t = o(t)
      } catch (p) {
        return {state: "parsererror", error: o ? p : "No conversion from " + u + " to " + a}
      }
    }
    return {state: "success", data: t}
  }

  function B(e, t, n, r) {
    var i;
    if (J.isArray(t))J.each(t, function (t, i) {
      n || Cn.test(e) ? r(e, i) : B(e + "[" + ("object" == typeof i ? t : "") + "]", i, n, r)
    }); else if (n || "object" !== J.type(t))r(e, t); else for (i in t)B(e + "[" + i + "]", t[i], n, r)
  }

  function q(e) {
    return J.isWindow(e) ? e : 9 === e.nodeType && e.defaultView
  }

  var V = [], U = V.slice, H = V.concat, W = V.push, Y = V.indexOf, z = {}, G = z.toString, X = z.hasOwnProperty, K = {}, Q = e.document, Z = "2.1.1", J = function (e, t) {
    return new J.fn.init(e, t)
  }, et = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, tt = /^-ms-/, nt = /-([\da-z])/gi, rt = function (e, t) {
    return t.toUpperCase()
  };
  J.fn = J.prototype = {
    jquery: Z, constructor: J, selector: "", length: 0, toArray: function () {
      return U.call(this)
    }, get: function (e) {
      return null != e ? 0 > e ? this[e + this.length] : this[e] : U.call(this)
    }, pushStack: function (e) {
      var t = J.merge(this.constructor(), e);
      return t.prevObject = this, t.context = this.context, t
    }, each: function (e, t) {
      return J.each(this, e, t)
    }, map: function (e) {
      return this.pushStack(J.map(this, function (t, n) {
        return e.call(t, n, t)
      }))
    }, slice: function () {
      return this.pushStack(U.apply(this, arguments))
    }, first: function () {
      return this.eq(0)
    }, last: function () {
      return this.eq(-1)
    }, eq: function (e) {
      var t = this.length, n = +e + (0 > e ? t : 0);
      return this.pushStack(n >= 0 && t > n ? [this[n]] : [])
    }, end: function () {
      return this.prevObject || this.constructor(null)
    }, push: W, sort: V.sort, splice: V.splice
  }, J.extend = J.fn.extend = function () {
    var e, t, n, r, i, a, o = arguments[0] || {}, s = 1, u = arguments.length, l = !1;
    for ("boolean" == typeof o && (l = o, o = arguments[s] || {}, s++), "object" == typeof o || J.isFunction(o) || (o = {}), s === u && (o = this, s--); u > s; s++)if (null != (e = arguments[s]))for (t in e)n = o[t], r = e[t], o !== r && (l && r && (J.isPlainObject(r) || (i = J.isArray(r))) ? (i ? (i = !1, a = n && J.isArray(n) ? n : []) : a = n && J.isPlainObject(n) ? n : {}, o[t] = J.extend(l, a, r)) : void 0 !== r && (o[t] = r));
    return o
  }, J.extend({
    expando: "jQuery" + (Z + Math.random()).replace(/\D/g, ""), isReady: !0, error: function (e) {
      throw new Error(e)
    }, noop: function () {
    }, isFunction: function (e) {
      return "function" === J.type(e)
    }, isArray: Array.isArray, isWindow: function (e) {
      return null != e && e === e.window
    }, isNumeric: function (e) {
      return !J.isArray(e) && e - parseFloat(e) >= 0
    }, isPlainObject: function (e) {
      return "object" !== J.type(e) || e.nodeType || J.isWindow(e) ? !1 : e.constructor && !X.call(e.constructor.prototype, "isPrototypeOf") ? !1 : !0
    }, isEmptyObject: function (e) {
      var t;
      for (t in e)return !1;
      return !0
    }, type: function (e) {
      return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? z[G.call(e)] || "object" : typeof e
    }, globalEval: function (e) {
      var t, n = eval;
      e = J.trim(e), e && (1 === e.indexOf("use strict") ? (t = Q.createElement("script"), t.text = e, Q.head.appendChild(t).parentNode.removeChild(t)) : n(e))
    }, camelCase: function (e) {
      return e.replace(tt, "ms-").replace(nt, rt)
    }, nodeName: function (e, t) {
      return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
    }, each: function (e, t, r) {
      var i, a = 0, o = e.length, s = n(e);
      if (r) {
        if (s)for (; o > a && (i = t.apply(e[a], r), i !== !1); a++); else for (a in e)if (i = t.apply(e[a], r), i === !1)break
      } else if (s)for (; o > a && (i = t.call(e[a], a, e[a]), i !== !1); a++); else for (a in e)if (i = t.call(e[a], a, e[a]), i === !1)break;
      return e
    }, trim: function (e) {
      return null == e ? "" : (e + "").replace(et, "")
    }, makeArray: function (e, t) {
      var r = t || [];
      return null != e && (n(Object(e)) ? J.merge(r, "string" == typeof e ? [e] : e) : W.call(r, e)), r
    }, inArray: function (e, t, n) {
      return null == t ? -1 : Y.call(t, e, n)
    }, merge: function (e, t) {
      for (var n = +t.length, r = 0, i = e.length; n > r; r++)e[i++] = t[r];
      return e.length = i, e
    }, grep: function (e, t, n) {
      for (var r, i = [], a = 0, o = e.length, s = !n; o > a; a++)r = !t(e[a], a), r !== s && i.push(e[a]);
      return i
    }, map: function (e, t, r) {
      var i, a = 0, o = e.length, s = n(e), u = [];
      if (s)for (; o > a; a++)i = t(e[a], a, r), null != i && u.push(i); else for (a in e)i = t(e[a], a, r), null != i && u.push(i);
      return H.apply([], u)
    }, guid: 1, proxy: function (e, t) {
      var n, r, i;
      return "string" == typeof t && (n = e[t], t = e, e = n), J.isFunction(e) ? (r = U.call(arguments, 2), i = function () {
        return e.apply(t || this, r.concat(U.call(arguments)))
      }, i.guid = e.guid = e.guid || J.guid++, i) : void 0
    }, now: Date.now, support: K
  }), J.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (e, t) {
    z["[object " + t + "]"] = t.toLowerCase()
  });
  var it = function (e) {
    function t(e, t, n, r) {
      var i, a, o, s, u, l, p, d, h, m;
      if ((t ? t.ownerDocument || t : B) !== O && M(t), t = t || O, n = n || [], !e || "string" != typeof e)return n;
      if (1 !== (s = t.nodeType) && 9 !== s)return [];
      if (P && !r) {
        if (i = yt.exec(e))if (o = i[1]) {
          if (9 === s) {
            if (a = t.getElementById(o), !a || !a.parentNode)return n;
            if (a.id === o)return n.push(a), n
          } else if (t.ownerDocument && (a = t.ownerDocument.getElementById(o)) && j(t, a) && a.id === o)return n.push(a), n
        } else {
          if (i[2])return J.apply(n, t.getElementsByTagName(e)), n;
          if ((o = i[3]) && w.getElementsByClassName && t.getElementsByClassName)return J.apply(n, t.getElementsByClassName(o)), n
        }
        if (w.qsa && (!R || !R.test(e))) {
          if (d = p = F, h = t, m = 9 === s && e, 1 === s && "object" !== t.nodeName.toLowerCase()) {
            for (l = T(e), (p = t.getAttribute("id")) ? d = p.replace(xt, "\\$&") : t.setAttribute("id", d), d = "[id='" + d + "'] ", u = l.length; u--;)l[u] = d + f(l[u]);
            h = bt.test(e) && c(t.parentNode) || t, m = l.join(",")
          }
          if (m)try {
            return J.apply(n, h.querySelectorAll(m)), n
          } catch (g) {
          } finally {
            p || t.removeAttribute("id")
          }
        }
      }
      return k(e.replace(ut, "$1"), t, n, r)
    }

    function n() {
      function e(n, r) {
        return t.push(n + " ") > $.cacheLength && delete e[t.shift()], e[n + " "] = r
      }

      var t = [];
      return e
    }

    function r(e) {
      return e[F] = !0, e
    }

    function i(e) {
      var t = O.createElement("div");
      try {
        return !!e(t)
      } catch (n) {
        return !1
      } finally {
        t.parentNode && t.parentNode.removeChild(t), t = null
      }
    }

    function a(e, t) {
      for (var n = e.split("|"), r = e.length; r--;)$.attrHandle[n[r]] = t
    }

    function o(e, t) {
      var n = t && e, r = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || G) - (~e.sourceIndex || G);
      if (r)return r;
      if (n)for (; n = n.nextSibling;)if (n === t)return -1;
      return e ? 1 : -1
    }

    function s(e) {
      return function (t) {
        var n = t.nodeName.toLowerCase();
        return "input" === n && t.type === e
      }
    }

    function u(e) {
      return function (t) {
        var n = t.nodeName.toLowerCase();
        return ("input" === n || "button" === n) && t.type === e
      }
    }

    function l(e) {
      return r(function (t) {
        return t = +t, r(function (n, r) {
          for (var i, a = e([], n.length, t), o = a.length; o--;)n[i = a[o]] && (n[i] = !(r[i] = n[i]))
        })
      })
    }

    function c(e) {
      return e && typeof e.getElementsByTagName !== z && e
    }

    function p() {
    }

    function f(e) {
      for (var t = 0, n = e.length, r = ""; n > t; t++)r += e[t].value;
      return r
    }

    function d(e, t, n) {
      var r = t.dir, i = n && "parentNode" === r, a = V++;
      return t.first ? function (t, n, a) {
        for (; t = t[r];)if (1 === t.nodeType || i)return e(t, n, a)
      } : function (t, n, o) {
        var s, u, l = [q, a];
        if (o) {
          for (; t = t[r];)if ((1 === t.nodeType || i) && e(t, n, o))return !0
        } else for (; t = t[r];)if (1 === t.nodeType || i) {
          if (u = t[F] || (t[F] = {}), (s = u[r]) && s[0] === q && s[1] === a)return l[2] = s[2];
          if (u[r] = l, l[2] = e(t, n, o))return !0
        }
      }
    }

    function h(e) {
      return e.length > 1 ? function (t, n, r) {
        for (var i = e.length; i--;)if (!e[i](t, n, r))return !1;
        return !0
      } : e[0]
    }

    function m(e, n, r) {
      for (var i = 0, a = n.length; a > i; i++)t(e, n[i], r);
      return r
    }

    function g(e, t, n, r, i) {
      for (var a, o = [], s = 0, u = e.length, l = null != t; u > s; s++)(a = e[s]) && (!n || n(a, r, i)) && (o.push(a), l && t.push(s));
      return o
    }

    function v(e, t, n, i, a, o) {
      return i && !i[F] && (i = v(i)), a && !a[F] && (a = v(a, o)), r(function (r, o, s, u) {
        var l, c, p, f = [], d = [], h = o.length, v = r || m(t || "*", s.nodeType ? [s] : s, []), y = !e || !r && t ? v : g(v, f, e, s, u), b = n ? a || (r ? e : h || i) ? [] : o : y;
        if (n && n(y, b, s, u), i)for (l = g(b, d), i(l, [], s, u), c = l.length; c--;)(p = l[c]) && (b[d[c]] = !(y[d[c]] = p));
        if (r) {
          if (a || e) {
            if (a) {
              for (l = [], c = b.length; c--;)(p = b[c]) && l.push(y[c] = p);
              a(null, b = [], l, u)
            }
            for (c = b.length; c--;)(p = b[c]) && (l = a ? tt.call(r, p) : f[c]) > -1 && (r[l] = !(o[l] = p))
          }
        } else b = g(b === o ? b.splice(h, b.length) : b), a ? a(null, o, b, u) : J.apply(o, b)
      })
    }

    function y(e) {
      for (var t, n, r, i = e.length, a = $.relative[e[0].type], o = a || $.relative[" "], s = a ? 1 : 0, u = d(function (e) {
        return e === t
      }, o, !0), l = d(function (e) {
        return tt.call(t, e) > -1
      }, o, !0), c = [function (e, n, r) {
        return !a && (r || n !== A) || ((t = n).nodeType ? u(e, n, r) : l(e, n, r))
      }]; i > s; s++)if (n = $.relative[e[s].type])c = [d(h(c), n)]; else {
        if (n = $.filter[e[s].type].apply(null, e[s].matches), n[F]) {
          for (r = ++s; i > r && !$.relative[e[r].type]; r++);
          return v(s > 1 && h(c), s > 1 && f(e.slice(0, s - 1).concat({value: " " === e[s - 2].type ? "*" : ""})).replace(ut, "$1"), n, r > s && y(e.slice(s, r)), i > r && y(e = e.slice(r)), i > r && f(e))
        }
        c.push(n)
      }
      return h(c)
    }

    function b(e, n) {
      var i = n.length > 0, a = e.length > 0, o = function (r, o, s, u, l) {
        var c, p, f, d = 0, h = "0", m = r && [], v = [], y = A, b = r || a && $.find.TAG("*", l), x = q += null == y ? 1 : Math.random() || .1, w = b.length;
        for (l && (A = o !== O && o); h !== w && null != (c = b[h]); h++) {
          if (a && c) {
            for (p = 0; f = e[p++];)if (f(c, o, s)) {
              u.push(c);
              break
            }
            l && (q = x)
          }
          i && ((c = !f && c) && d--, r && m.push(c))
        }
        if (d += h, i && h !== d) {
          for (p = 0; f = n[p++];)f(m, v, o, s);
          if (r) {
            if (d > 0)for (; h--;)m[h] || v[h] || (v[h] = Q.call(u));
            v = g(v)
          }
          J.apply(u, v), l && !r && v.length > 0 && d + n.length > 1 && t.uniqueSort(u)
        }
        return l && (q = x, A = y), m
      };
      return i ? r(o) : o
    }

    var x, w, $, E, S, T, C, k, A, _, D, M, O, N, P, R, I, L, j, F = "sizzle" + -new Date, B = e.document, q = 0, V = 0, U = n(), H = n(), W = n(), Y = function (e, t) {
      return e === t && (D = !0), 0
    }, z = "undefined", G = 1 << 31, X = {}.hasOwnProperty, K = [], Q = K.pop, Z = K.push, J = K.push, et = K.slice, tt = K.indexOf || function (e) {
        for (var t = 0, n = this.length; n > t; t++)if (this[t] === e)return t;
        return -1
      }, nt = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", rt = "[\\x20\\t\\r\\n\\f]", it = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", at = it.replace("w", "w#"), ot = "\\[" + rt + "*(" + it + ")(?:" + rt + "*([*^$|!~]?=)" + rt + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + at + "))|)" + rt + "*\\]", st = ":(" + it + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + ot + ")*)|.*)\\)|)", ut = new RegExp("^" + rt + "+|((?:^|[^\\\\])(?:\\\\.)*)" + rt + "+$", "g"), lt = new RegExp("^" + rt + "*," + rt + "*"), ct = new RegExp("^" + rt + "*([>+~]|" + rt + ")" + rt + "*"), pt = new RegExp("=" + rt + "*([^\\]'\"]*?)" + rt + "*\\]", "g"), ft = new RegExp(st), dt = new RegExp("^" + at + "$"), ht = {
      ID: new RegExp("^#(" + it + ")"),
      CLASS: new RegExp("^\\.(" + it + ")"),
      TAG: new RegExp("^(" + it.replace("w", "w*") + ")"),
      ATTR: new RegExp("^" + ot),
      PSEUDO: new RegExp("^" + st),
      CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + rt + "*(even|odd|(([+-]|)(\\d*)n|)" + rt + "*(?:([+-]|)" + rt + "*(\\d+)|))" + rt + "*\\)|)", "i"),
      bool: new RegExp("^(?:" + nt + ")$", "i"),
      needsContext: new RegExp("^" + rt + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + rt + "*((?:-\\d)?\\d*)" + rt + "*\\)|)(?=[^-]|$)", "i")
    }, mt = /^(?:input|select|textarea|button)$/i, gt = /^h\d$/i, vt = /^[^{]+\{\s*\[native \w/, yt = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, bt = /[+~]/, xt = /'|\\/g, wt = new RegExp("\\\\([\\da-f]{1,6}" + rt + "?|(" + rt + ")|.)", "ig"), $t = function (e, t, n) {
      var r = "0x" + t - 65536;
      return r !== r || n ? t : 0 > r ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, 1023 & r | 56320)
    };
    try {
      J.apply(K = et.call(B.childNodes), B.childNodes), K[B.childNodes.length].nodeType
    } catch (Et) {
      J = {
        apply: K.length ? function (e, t) {
          Z.apply(e, et.call(t))
        } : function (e, t) {
          for (var n = e.length, r = 0; e[n++] = t[r++];);
          e.length = n - 1
        }
      }
    }
    w = t.support = {}, S = t.isXML = function (e) {
      var t = e && (e.ownerDocument || e).documentElement;
      return t ? "HTML" !== t.nodeName : !1
    }, M = t.setDocument = function (e) {
      var t, n = e ? e.ownerDocument || e : B, r = n.defaultView;
      return n !== O && 9 === n.nodeType && n.documentElement ? (O = n, N = n.documentElement, P = !S(n), r && r !== r.top && (r.addEventListener ? r.addEventListener("unload", function () {
        M()
      }, !1) : r.attachEvent && r.attachEvent("onunload", function () {
        M()
      })), w.attributes = i(function (e) {
        return e.className = "i", !e.getAttribute("className")
      }), w.getElementsByTagName = i(function (e) {
        return e.appendChild(n.createComment("")), !e.getElementsByTagName("*").length
      }), w.getElementsByClassName = vt.test(n.getElementsByClassName) && i(function (e) {
          return e.innerHTML = "<div class='a'></div><div class='a i'></div>", e.firstChild.className = "i", 2 === e.getElementsByClassName("i").length
        }), w.getById = i(function (e) {
        return N.appendChild(e).id = F, !n.getElementsByName || !n.getElementsByName(F).length
      }), w.getById ? ($.find.ID = function (e, t) {
        if (typeof t.getElementById !== z && P) {
          var n = t.getElementById(e);
          return n && n.parentNode ? [n] : []
        }
      }, $.filter.ID = function (e) {
        var t = e.replace(wt, $t);
        return function (e) {
          return e.getAttribute("id") === t
        }
      }) : (delete $.find.ID, $.filter.ID = function (e) {
        var t = e.replace(wt, $t);
        return function (e) {
          var n = typeof e.getAttributeNode !== z && e.getAttributeNode("id");
          return n && n.value === t
        }
      }), $.find.TAG = w.getElementsByTagName ? function (e, t) {
        return typeof t.getElementsByTagName !== z ? t.getElementsByTagName(e) : void 0
      } : function (e, t) {
        var n, r = [], i = 0, a = t.getElementsByTagName(e);
        if ("*" === e) {
          for (; n = a[i++];)1 === n.nodeType && r.push(n);
          return r
        }
        return a
      }, $.find.CLASS = w.getElementsByClassName && function (e, t) {
          return typeof t.getElementsByClassName !== z && P ? t.getElementsByClassName(e) : void 0
        }, I = [], R = [], (w.qsa = vt.test(n.querySelectorAll)) && (i(function (e) {
        e.innerHTML = "<select msallowclip=''><option selected=''></option></select>", e.querySelectorAll("[msallowclip^='']").length && R.push("[*^$]=" + rt + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || R.push("\\[" + rt + "*(?:value|" + nt + ")"), e.querySelectorAll(":checked").length || R.push(":checked")
      }), i(function (e) {
        var t = n.createElement("input");
        t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && R.push("name" + rt + "*[*^$|!~]?="), e.querySelectorAll(":enabled").length || R.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), R.push(",.*:")
      })), (w.matchesSelector = vt.test(L = N.matches || N.webkitMatchesSelector || N.mozMatchesSelector || N.oMatchesSelector || N.msMatchesSelector)) && i(function (e) {
        w.disconnectedMatch = L.call(e, "div"), L.call(e, "[s!='']:x"), I.push("!=", st)
      }), R = R.length && new RegExp(R.join("|")), I = I.length && new RegExp(I.join("|")), t = vt.test(N.compareDocumentPosition), j = t || vt.test(N.contains) ? function (e, t) {
        var n = 9 === e.nodeType ? e.documentElement : e, r = t && t.parentNode;
        return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)))
      } : function (e, t) {
        if (t)for (; t = t.parentNode;)if (t === e)return !0;
        return !1
      }, Y = t ? function (e, t) {
        if (e === t)return D = !0, 0;
        var r = !e.compareDocumentPosition - !t.compareDocumentPosition;
        return r ? r : (r = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1, 1 & r || !w.sortDetached && t.compareDocumentPosition(e) === r ? e === n || e.ownerDocument === B && j(B, e) ? -1 : t === n || t.ownerDocument === B && j(B, t) ? 1 : _ ? tt.call(_, e) - tt.call(_, t) : 0 : 4 & r ? -1 : 1)
      } : function (e, t) {
        if (e === t)return D = !0, 0;
        var r, i = 0, a = e.parentNode, s = t.parentNode, u = [e], l = [t];
        if (!a || !s)return e === n ? -1 : t === n ? 1 : a ? -1 : s ? 1 : _ ? tt.call(_, e) - tt.call(_, t) : 0;
        if (a === s)return o(e, t);
        for (r = e; r = r.parentNode;)u.unshift(r);
        for (r = t; r = r.parentNode;)l.unshift(r);
        for (; u[i] === l[i];)i++;
        return i ? o(u[i], l[i]) : u[i] === B ? -1 : l[i] === B ? 1 : 0
      }, n) : O
    }, t.matches = function (e, n) {
      return t(e, null, null, n)
    }, t.matchesSelector = function (e, n) {
      if ((e.ownerDocument || e) !== O && M(e), n = n.replace(pt, "='$1']"), !(!w.matchesSelector || !P || I && I.test(n) || R && R.test(n)))try {
        var r = L.call(e, n);
        if (r || w.disconnectedMatch || e.document && 11 !== e.document.nodeType)return r
      } catch (i) {
      }
      return t(n, O, null, [e]).length > 0
    }, t.contains = function (e, t) {
      return (e.ownerDocument || e) !== O && M(e), j(e, t)
    }, t.attr = function (e, t) {
      (e.ownerDocument || e) !== O && M(e);
      var n = $.attrHandle[t.toLowerCase()], r = n && X.call($.attrHandle, t.toLowerCase()) ? n(e, t, !P) : void 0;
      return void 0 !== r ? r : w.attributes || !P ? e.getAttribute(t) : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
    }, t.error = function (e) {
      throw new Error("Syntax error, unrecognized expression: " + e)
    }, t.uniqueSort = function (e) {
      var t, n = [], r = 0, i = 0;
      if (D = !w.detectDuplicates, _ = !w.sortStable && e.slice(0), e.sort(Y), D) {
        for (; t = e[i++];)t === e[i] && (r = n.push(i));
        for (; r--;)e.splice(n[r], 1)
      }
      return _ = null, e
    }, E = t.getText = function (e) {
      var t, n = "", r = 0, i = e.nodeType;
      if (i) {
        if (1 === i || 9 === i || 11 === i) {
          if ("string" == typeof e.textContent)return e.textContent;
          for (e = e.firstChild; e; e = e.nextSibling)n += E(e)
        } else if (3 === i || 4 === i)return e.nodeValue
      } else for (; t = e[r++];)n += E(t);
      return n
    }, $ = t.selectors = {
      cacheLength: 50,
      createPseudo: r,
      match: ht,
      attrHandle: {},
      find: {},
      relative: {
        ">": {dir: "parentNode", first: !0},
        " ": {dir: "parentNode"},
        "+": {dir: "previousSibling", first: !0},
        "~": {dir: "previousSibling"}
      },
      preFilter: {
        ATTR: function (e) {
          return e[1] = e[1].replace(wt, $t), e[3] = (e[3] || e[4] || e[5] || "").replace(wt, $t), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
        }, CHILD: function (e) {
          return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || t.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && t.error(e[0]), e
        }, PSEUDO: function (e) {
          var t, n = !e[6] && e[2];
          return ht.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && ft.test(n) && (t = T(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
        }
      },
      filter: {
        TAG: function (e) {
          var t = e.replace(wt, $t).toLowerCase();
          return "*" === e ? function () {
            return !0
          } : function (e) {
            return e.nodeName && e.nodeName.toLowerCase() === t
          }
        }, CLASS: function (e) {
          var t = U[e + " "];
          return t || (t = new RegExp("(^|" + rt + ")" + e + "(" + rt + "|$)")) && U(e, function (e) {
              return t.test("string" == typeof e.className && e.className || typeof e.getAttribute !== z && e.getAttribute("class") || "")
            })
        }, ATTR: function (e, n, r) {
          return function (i) {
            var a = t.attr(i, e);
            return null == a ? "!=" === n : n ? (a += "", "=" === n ? a === r : "!=" === n ? a !== r : "^=" === n ? r && 0 === a.indexOf(r) : "*=" === n ? r && a.indexOf(r) > -1 : "$=" === n ? r && a.slice(-r.length) === r : "~=" === n ? (" " + a + " ").indexOf(r) > -1 : "|=" === n ? a === r || a.slice(0, r.length + 1) === r + "-" : !1) : !0
          }
        }, CHILD: function (e, t, n, r, i) {
          var a = "nth" !== e.slice(0, 3), o = "last" !== e.slice(-4), s = "of-type" === t;
          return 1 === r && 0 === i ? function (e) {
            return !!e.parentNode
          } : function (t, n, u) {
            var l, c, p, f, d, h, m = a !== o ? "nextSibling" : "previousSibling", g = t.parentNode, v = s && t.nodeName.toLowerCase(), y = !u && !s;
            if (g) {
              if (a) {
                for (; m;) {
                  for (p = t; p = p[m];)if (s ? p.nodeName.toLowerCase() === v : 1 === p.nodeType)return !1;
                  h = m = "only" === e && !h && "nextSibling"
                }
                return !0
              }
              if (h = [o ? g.firstChild : g.lastChild], o && y) {
                for (c = g[F] || (g[F] = {}), l = c[e] || [], d = l[0] === q && l[1], f = l[0] === q && l[2], p = d && g.childNodes[d]; p = ++d && p && p[m] || (f = d = 0) || h.pop();)if (1 === p.nodeType && ++f && p === t) {
                  c[e] = [q, d, f];
                  break
                }
              } else if (y && (l = (t[F] || (t[F] = {}))[e]) && l[0] === q)f = l[1]; else for (; (p = ++d && p && p[m] || (f = d = 0) || h.pop()) && ((s ? p.nodeName.toLowerCase() !== v : 1 !== p.nodeType) || !++f || (y && ((p[F] || (p[F] = {}))[e] = [q, f]), p !== t)););
              return f -= i, f === r || f % r === 0 && f / r >= 0
            }
          }
        }, PSEUDO: function (e, n) {
          var i, a = $.pseudos[e] || $.setFilters[e.toLowerCase()] || t.error("unsupported pseudo: " + e);
          return a[F] ? a(n) : a.length > 1 ? (i = [e, e, "", n], $.setFilters.hasOwnProperty(e.toLowerCase()) ? r(function (e, t) {
            for (var r, i = a(e, n), o = i.length; o--;)r = tt.call(e, i[o]), e[r] = !(t[r] = i[o])
          }) : function (e) {
            return a(e, 0, i)
          }) : a
        }
      },
      pseudos: {
        not: r(function (e) {
          var t = [], n = [], i = C(e.replace(ut, "$1"));
          return i[F] ? r(function (e, t, n, r) {
            for (var a, o = i(e, null, r, []), s = e.length; s--;)(a = o[s]) && (e[s] = !(t[s] = a))
          }) : function (e, r, a) {
            return t[0] = e, i(t, null, a, n), !n.pop()
          }
        }), has: r(function (e) {
          return function (n) {
            return t(e, n).length > 0
          }
        }), contains: r(function (e) {
          return function (t) {
            return (t.textContent || t.innerText || E(t)).indexOf(e) > -1
          }
        }), lang: r(function (e) {
          return dt.test(e || "") || t.error("unsupported lang: " + e), e = e.replace(wt, $t).toLowerCase(), function (t) {
            var n;
            do if (n = P ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang"))return n = n.toLowerCase(), n === e || 0 === n.indexOf(e + "-"); while ((t = t.parentNode) && 1 === t.nodeType);
            return !1
          }
        }), target: function (t) {
          var n = e.location && e.location.hash;
          return n && n.slice(1) === t.id
        }, root: function (e) {
          return e === N
        }, focus: function (e) {
          return e === O.activeElement && (!O.hasFocus || O.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
        }, enabled: function (e) {
          return e.disabled === !1
        }, disabled: function (e) {
          return e.disabled === !0
        }, checked: function (e) {
          var t = e.nodeName.toLowerCase();
          return "input" === t && !!e.checked || "option" === t && !!e.selected
        }, selected: function (e) {
          return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
        }, empty: function (e) {
          for (e = e.firstChild; e; e = e.nextSibling)if (e.nodeType < 6)return !1;
          return !0
        }, parent: function (e) {
          return !$.pseudos.empty(e)
        }, header: function (e) {
          return gt.test(e.nodeName)
        }, input: function (e) {
          return mt.test(e.nodeName)
        }, button: function (e) {
          var t = e.nodeName.toLowerCase();
          return "input" === t && "button" === e.type || "button" === t
        }, text: function (e) {
          var t;
          return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
        }, first: l(function () {
          return [0]
        }), last: l(function (e, t) {
          return [t - 1]
        }), eq: l(function (e, t, n) {
          return [0 > n ? n + t : n]
        }), even: l(function (e, t) {
          for (var n = 0; t > n; n += 2)e.push(n);
          return e
        }), odd: l(function (e, t) {
          for (var n = 1; t > n; n += 2)e.push(n);
          return e
        }), lt: l(function (e, t, n) {
          for (var r = 0 > n ? n + t : n; --r >= 0;)e.push(r);
          return e
        }), gt: l(function (e, t, n) {
          for (var r = 0 > n ? n + t : n; ++r < t;)e.push(r);
          return e
        })
      }
    }, $.pseudos.nth = $.pseudos.eq;
    for (x in{radio: !0, checkbox: !0, file: !0, password: !0, image: !0})$.pseudos[x] = s(x);
    for (x in{submit: !0, reset: !0})$.pseudos[x] = u(x);
    return p.prototype = $.filters = $.pseudos, $.setFilters = new p, T = t.tokenize = function (e, n) {
      var r, i, a, o, s, u, l, c = H[e + " "];
      if (c)return n ? 0 : c.slice(0);
      for (s = e, u = [], l = $.preFilter; s;) {
        (!r || (i = lt.exec(s))) && (i && (s = s.slice(i[0].length) || s), u.push(a = [])), r = !1, (i = ct.exec(s)) && (r = i.shift(), a.push({
          value: r,
          type: i[0].replace(ut, " ")
        }), s = s.slice(r.length));
        for (o in $.filter)!(i = ht[o].exec(s)) || l[o] && !(i = l[o](i)) || (r = i.shift(), a.push({
          value: r,
          type: o,
          matches: i
        }), s = s.slice(r.length));
        if (!r)break
      }
      return n ? s.length : s ? t.error(e) : H(e, u).slice(0)
    }, C = t.compile = function (e, t) {
      var n, r = [], i = [], a = W[e + " "];
      if (!a) {
        for (t || (t = T(e)), n = t.length; n--;)a = y(t[n]), a[F] ? r.push(a) : i.push(a);
        a = W(e, b(i, r)), a.selector = e
      }
      return a
    }, k = t.select = function (e, t, n, r) {
      var i, a, o, s, u, l = "function" == typeof e && e, p = !r && T(e = l.selector || e);
      if (n = n || [], 1 === p.length) {
        if (a = p[0] = p[0].slice(0), a.length > 2 && "ID" === (o = a[0]).type && w.getById && 9 === t.nodeType && P && $.relative[a[1].type]) {
          if (t = ($.find.ID(o.matches[0].replace(wt, $t), t) || [])[0], !t)return n;
          l && (t = t.parentNode), e = e.slice(a.shift().value.length)
        }
        for (i = ht.needsContext.test(e) ? 0 : a.length; i-- && (o = a[i], !$.relative[s = o.type]);)if ((u = $.find[s]) && (r = u(o.matches[0].replace(wt, $t), bt.test(a[0].type) && c(t.parentNode) || t))) {
          if (a.splice(i, 1), e = r.length && f(a), !e)return J.apply(n, r), n;
          break
        }
      }
      return (l || C(e, p))(r, t, !P, n, bt.test(e) && c(t.parentNode) || t), n
    }, w.sortStable = F.split("").sort(Y).join("") === F, w.detectDuplicates = !!D, M(), w.sortDetached = i(function (e) {
      return 1 & e.compareDocumentPosition(O.createElement("div"))
    }), i(function (e) {
      return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
    }) || a("type|href|height|width", function (e, t, n) {
      return n ? void 0 : e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
    }), w.attributes && i(function (e) {
      return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
    }) || a("value", function (e, t, n) {
      return n || "input" !== e.nodeName.toLowerCase() ? void 0 : e.defaultValue
    }), i(function (e) {
      return null == e.getAttribute("disabled")
    }) || a(nt, function (e, t, n) {
      var r;
      return n ? void 0 : e[t] === !0 ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
    }), t
  }(e);
  J.find = it, J.expr = it.selectors, J.expr[":"] = J.expr.pseudos, J.unique = it.uniqueSort, J.text = it.getText, J.isXMLDoc = it.isXML, J.contains = it.contains;
  var at = J.expr.match.needsContext, ot = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, st = /^.[^:#\[\.,]*$/;
  J.filter = function (e, t, n) {
    var r = t[0];
    return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === r.nodeType ? J.find.matchesSelector(r, e) ? [r] : [] : J.find.matches(e, J.grep(t, function (e) {
      return 1 === e.nodeType
    }))
  }, J.fn.extend({
    find: function (e) {
      var t, n = this.length, r = [], i = this;
      if ("string" != typeof e)return this.pushStack(J(e).filter(function () {
        for (t = 0; n > t; t++)if (J.contains(i[t], this))return !0
      }));
      for (t = 0; n > t; t++)J.find(e, i[t], r);
      return r = this.pushStack(n > 1 ? J.unique(r) : r), r.selector = this.selector ? this.selector + " " + e : e, r
    }, filter: function (e) {
      return this.pushStack(r(this, e || [], !1))
    }, not: function (e) {
      return this.pushStack(r(this, e || [], !0))
    }, is: function (e) {
      return !!r(this, "string" == typeof e && at.test(e) ? J(e) : e || [], !1).length
    }
  });
  var ut, lt = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, ct = J.fn.init = function (e, t) {
    var n, r;
    if (!e)return this;
    if ("string" == typeof e) {
      if (n = "<" === e[0] && ">" === e[e.length - 1] && e.length >= 3 ? [null, e, null] : lt.exec(e), !n || !n[1] && t)return !t || t.jquery ? (t || ut).find(e) : this.constructor(t).find(e);
      if (n[1]) {
        if (t = t instanceof J ? t[0] : t, J.merge(this, J.parseHTML(n[1], t && t.nodeType ? t.ownerDocument || t : Q, !0)), ot.test(n[1]) && J.isPlainObject(t))for (n in t)J.isFunction(this[n]) ? this[n](t[n]) : this.attr(n, t[n]);
        return this
      }
      return r = Q.getElementById(n[2]), r && r.parentNode && (this.length = 1, this[0] = r), this.context = Q, this.selector = e, this
    }
    return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : J.isFunction(e) ? "undefined" != typeof ut.ready ? ut.ready(e) : e(J) : (void 0 !== e.selector && (this.selector = e.selector, this.context = e.context), J.makeArray(e, this))
  };
  ct.prototype = J.fn, ut = J(Q);
  var pt = /^(?:parents|prev(?:Until|All))/, ft = {children: !0, contents: !0, next: !0, prev: !0};
  J.extend({
    dir: function (e, t, n) {
      for (var r = [], i = void 0 !== n; (e = e[t]) && 9 !== e.nodeType;)if (1 === e.nodeType) {
        if (i && J(e).is(n))break;
        r.push(e)
      }
      return r
    }, sibling: function (e, t) {
      for (var n = []; e; e = e.nextSibling)1 === e.nodeType && e !== t && n.push(e);
      return n
    }
  }), J.fn.extend({
    has: function (e) {
      var t = J(e, this), n = t.length;
      return this.filter(function () {
        for (var e = 0; n > e; e++)if (J.contains(this, t[e]))return !0
      })
    }, closest: function (e, t) {
      for (var n, r = 0, i = this.length, a = [], o = at.test(e) || "string" != typeof e ? J(e, t || this.context) : 0; i > r; r++)for (n = this[r]; n && n !== t; n = n.parentNode)if (n.nodeType < 11 && (o ? o.index(n) > -1 : 1 === n.nodeType && J.find.matchesSelector(n, e))) {
        a.push(n);
        break
      }
      return this.pushStack(a.length > 1 ? J.unique(a) : a)
    }, index: function (e) {
      return e ? "string" == typeof e ? Y.call(J(e), this[0]) : Y.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
    }, add: function (e, t) {
      return this.pushStack(J.unique(J.merge(this.get(), J(e, t))))
    }, addBack: function (e) {
      return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
    }
  }), J.each({
    parent: function (e) {
      var t = e.parentNode;
      return t && 11 !== t.nodeType ? t : null
    }, parents: function (e) {
      return J.dir(e, "parentNode")
    }, parentsUntil: function (e, t, n) {
      return J.dir(e, "parentNode", n)
    }, next: function (e) {
      return i(e, "nextSibling")
    }, prev: function (e) {
      return i(e, "previousSibling")
    }, nextAll: function (e) {
      return J.dir(e, "nextSibling")
    }, prevAll: function (e) {
      return J.dir(e, "previousSibling")
    }, nextUntil: function (e, t, n) {
      return J.dir(e, "nextSibling", n)
    }, prevUntil: function (e, t, n) {
      return J.dir(e, "previousSibling", n)
    }, siblings: function (e) {
      return J.sibling((e.parentNode || {}).firstChild, e)
    }, children: function (e) {
      return J.sibling(e.firstChild)
    }, contents: function (e) {
      return e.contentDocument || J.merge([], e.childNodes)
    }
  }, function (e, t) {
    J.fn[e] = function (n, r) {
      var i = J.map(this, t, n);
      return "Until" !== e.slice(-5) && (r = n), r && "string" == typeof r && (i = J.filter(r, i)), this.length > 1 && (ft[e] || J.unique(i), pt.test(e) && i.reverse()), this.pushStack(i)
    }
  });
  var dt = /\S+/g, ht = {};
  J.Callbacks = function (e) {
    e = "string" == typeof e ? ht[e] || a(e) : J.extend({}, e);
    var t, n, r, i, o, s, u = [], l = !e.once && [], c = function (a) {
      for (t = e.memory && a, n = !0, s = i || 0, i = 0, o = u.length, r = !0; u && o > s; s++)if (u[s].apply(a[0], a[1]) === !1 && e.stopOnFalse) {
        t = !1;
        break
      }
      r = !1, u && (l ? l.length && c(l.shift()) : t ? u = [] : p.disable())
    }, p = {
      add: function () {
        if (u) {
          var n = u.length;
          !function a(t) {
            J.each(t, function (t, n) {
              var r = J.type(n);
              "function" === r ? e.unique && p.has(n) || u.push(n) : n && n.length && "string" !== r && a(n)
            })
          }(arguments), r ? o = u.length : t && (i = n, c(t))
        }
        return this
      }, remove: function () {
        return u && J.each(arguments, function (e, t) {
          for (var n; (n = J.inArray(t, u, n)) > -1;)u.splice(n, 1), r && (o >= n && o--, s >= n && s--)
        }), this
      }, has: function (e) {
        return e ? J.inArray(e, u) > -1 : !(!u || !u.length)
      }, empty: function () {
        return u = [], o = 0, this
      }, disable: function () {
        return u = l = t = void 0, this
      }, disabled: function () {
        return !u
      }, lock: function () {
        return l = void 0, t || p.disable(), this
      }, locked: function () {
        return !l
      }, fireWith: function (e, t) {
        return !u || n && !l || (t = t || [], t = [e, t.slice ? t.slice() : t], r ? l.push(t) : c(t)), this
      }, fire: function () {
        return p.fireWith(this, arguments), this
      }, fired: function () {
        return !!n
      }
    };
    return p
  }, J.extend({
    Deferred: function (e) {
      var t = [["resolve", "done", J.Callbacks("once memory"), "resolved"], ["reject", "fail", J.Callbacks("once memory"), "rejected"], ["notify", "progress", J.Callbacks("memory")]], n = "pending", r = {
        state: function () {
          return n
        }, always: function () {
          return i.done(arguments).fail(arguments), this
        }, then: function () {
          var e = arguments;
          return J.Deferred(function (n) {
            J.each(t, function (t, a) {
              var o = J.isFunction(e[t]) && e[t];
              i[a[1]](function () {
                var e = o && o.apply(this, arguments);
                e && J.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[a[0] + "With"](this === r ? n.promise() : this, o ? [e] : arguments)
              })
            }), e = null
          }).promise()
        }, promise: function (e) {
          return null != e ? J.extend(e, r) : r
        }
      }, i = {};
      return r.pipe = r.then, J.each(t, function (e, a) {
        var o = a[2], s = a[3];
        r[a[1]] = o.add, s && o.add(function () {
          n = s
        }, t[1 ^ e][2].disable, t[2][2].lock), i[a[0]] = function () {
          return i[a[0] + "With"](this === i ? r : this, arguments), this
        }, i[a[0] + "With"] = o.fireWith
      }), r.promise(i), e && e.call(i, i), i
    }, when: function (e) {
      var t, n, r, i = 0, a = U.call(arguments), o = a.length, s = 1 !== o || e && J.isFunction(e.promise) ? o : 0, u = 1 === s ? e : J.Deferred(), l = function (e, n, r) {
        return function (i) {
          n[e] = this, r[e] = arguments.length > 1 ? U.call(arguments) : i, r === t ? u.notifyWith(n, r) : --s || u.resolveWith(n, r)
        }
      };
      if (o > 1)for (t = new Array(o), n = new Array(o), r = new Array(o); o > i; i++)a[i] && J.isFunction(a[i].promise) ? a[i].promise().done(l(i, r, a)).fail(u.reject).progress(l(i, n, t)) : --s;
      return s || u.resolveWith(r, a), u.promise()
    }
  });
  var mt;
  J.fn.ready = function (e) {
    return J.ready.promise().done(e), this
  }, J.extend({
    isReady: !1, readyWait: 1, holdReady: function (e) {
      e ? J.readyWait++ : J.ready(!0)
    }, ready: function (e) {
      (e === !0 ? --J.readyWait : J.isReady) || (J.isReady = !0, e !== !0 && --J.readyWait > 0 || (mt.resolveWith(Q, [J]), J.fn.triggerHandler && (J(Q).triggerHandler("ready"), J(Q).off("ready"))))
    }
  }), J.ready.promise = function (t) {
    return mt || (mt = J.Deferred(), "complete" === Q.readyState ? setTimeout(J.ready) : (Q.addEventListener("DOMContentLoaded", o, !1), e.addEventListener("load", o, !1))), mt.promise(t)
  }, J.ready.promise();
  var gt = J.access = function (e, t, n, r, i, a, o) {
    var s = 0, u = e.length, l = null == n;
    if ("object" === J.type(n)) {
      i = !0;
      for (s in n)J.access(e, t, s, n[s], !0, a, o)
    } else if (void 0 !== r && (i = !0, J.isFunction(r) || (o = !0), l && (o ? (t.call(e, r), t = null) : (l = t, t = function (e, t, n) {
        return l.call(J(e), n)
      })), t))for (; u > s; s++)t(e[s], n, o ? r : r.call(e[s], s, t(e[s], n)));
    return i ? e : l ? t.call(e) : u ? t(e[0], n) : a
  };
  J.acceptData = function (e) {
    return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
  }, s.uid = 1, s.accepts = J.acceptData, s.prototype = {
    key: function (e) {
      if (!s.accepts(e))return 0;
      var t = {}, n = e[this.expando];
      if (!n) {
        n = s.uid++;
        try {
          t[this.expando] = {value: n}, Object.defineProperties(e, t)
        } catch (r) {
          t[this.expando] = n, J.extend(e, t)
        }
      }
      return this.cache[n] || (this.cache[n] = {}), n
    }, set: function (e, t, n) {
      var r, i = this.key(e), a = this.cache[i];
      if ("string" == typeof t)a[t] = n; else if (J.isEmptyObject(a))J.extend(this.cache[i], t); else for (r in t)a[r] = t[r];
      return a
    }, get: function (e, t) {
      var n = this.cache[this.key(e)];
      return void 0 === t ? n : n[t]
    }, access: function (e, t, n) {
      var r;
      return void 0 === t || t && "string" == typeof t && void 0 === n ? (r = this.get(e, t), void 0 !== r ? r : this.get(e, J.camelCase(t))) : (this.set(e, t, n), void 0 !== n ? n : t)
    }, remove: function (e, t) {
      var n, r, i, a = this.key(e), o = this.cache[a];
      if (void 0 === t)this.cache[a] = {}; else {
        J.isArray(t) ? r = t.concat(t.map(J.camelCase)) : (i = J.camelCase(t), t in o ? r = [t, i] : (r = i, r = r in o ? [r] : r.match(dt) || [])), n = r.length;
        for (; n--;)delete o[r[n]]
      }
    }, hasData: function (e) {
      return !J.isEmptyObject(this.cache[e[this.expando]] || {})
    }, discard: function (e) {
      e[this.expando] && delete this.cache[e[this.expando]]
    }
  };
  var vt = new s, yt = new s, bt = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, xt = /([A-Z])/g;
  J.extend({
    hasData: function (e) {
      return yt.hasData(e) || vt.hasData(e)
    }, data: function (e, t, n) {
      return yt.access(e, t, n)
    }, removeData: function (e, t) {
      yt.remove(e, t)
    }, _data: function (e, t, n) {
      return vt.access(e, t, n)
    }, _removeData: function (e, t) {
      vt.remove(e, t)
    }
  }), J.fn.extend({
    data: function (e, t) {
      var n, r, i, a = this[0], o = a && a.attributes;
      if (void 0 === e) {
        if (this.length && (i = yt.get(a), 1 === a.nodeType && !vt.get(a, "hasDataAttrs"))) {
          for (n = o.length; n--;)o[n] && (r = o[n].name, 0 === r.indexOf("data-") && (r = J.camelCase(r.slice(5)), u(a, r, i[r])));
          vt.set(a, "hasDataAttrs", !0)
        }
        return i
      }
      return "object" == typeof e ? this.each(function () {
        yt.set(this, e)
      }) : gt(this, function (t) {
        var n, r = J.camelCase(e);
        if (a && void 0 === t) {
          if (n = yt.get(a, e), void 0 !== n)return n;
          if (n = yt.get(a, r), void 0 !== n)return n;
          if (n = u(a, r, void 0), void 0 !== n)return n
        } else this.each(function () {
          var n = yt.get(this, r);
          yt.set(this, r, t), -1 !== e.indexOf("-") && void 0 !== n && yt.set(this, e, t)
        })
      }, null, t, arguments.length > 1, null, !0)
    }, removeData: function (e) {
      return this.each(function () {
        yt.remove(this, e)
      })
    }
  }), J.extend({
    queue: function (e, t, n) {
      var r;
      return e ? (t = (t || "fx") + "queue", r = vt.get(e, t), n && (!r || J.isArray(n) ? r = vt.access(e, t, J.makeArray(n)) : r.push(n)), r || []) : void 0
    }, dequeue: function (e, t) {
      t = t || "fx";
      var n = J.queue(e, t), r = n.length, i = n.shift(), a = J._queueHooks(e, t), o = function () {
        J.dequeue(e, t)
      };
      "inprogress" === i && (i = n.shift(), r--), i && ("fx" === t && n.unshift("inprogress"), delete a.stop, i.call(e, o, a)), !r && a && a.empty.fire()
    }, _queueHooks: function (e, t) {
      var n = t + "queueHooks";
      return vt.get(e, n) || vt.access(e, n, {
          empty: J.Callbacks("once memory").add(function () {
            vt.remove(e, [t + "queue", n])
          })
        })
    }
  }), J.fn.extend({
    queue: function (e, t) {
      var n = 2;
      return "string" != typeof e && (t = e, e = "fx", n--), arguments.length < n ? J.queue(this[0], e) : void 0 === t ? this : this.each(function () {
        var n = J.queue(this, e, t);
        J._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && J.dequeue(this, e)
      })
    }, dequeue: function (e) {
      return this.each(function () {
        J.dequeue(this, e)
      })
    }, clearQueue: function (e) {
      return this.queue(e || "fx", [])
    }, promise: function (e, t) {
      var n, r = 1, i = J.Deferred(), a = this, o = this.length, s = function () {
        --r || i.resolveWith(a, [a])
      };
      for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; o--;)n = vt.get(a[o], e + "queueHooks"), n && n.empty && (r++, n.empty.add(s));
      return s(), i.promise(t)
    }
  });
  var wt = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, $t = ["Top", "Right", "Bottom", "Left"], Et = function (e, t) {
    return e = t || e, "none" === J.css(e, "display") || !J.contains(e.ownerDocument, e)
  }, St = /^(?:checkbox|radio)$/i;
  !function () {
    var e = Q.createDocumentFragment(), t = e.appendChild(Q.createElement("div")), n = Q.createElement("input");
    n.setAttribute("type", "radio"), n.setAttribute("checked", "checked"), n.setAttribute("name", "t"), t.appendChild(n), K.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked, t.innerHTML = "<textarea>x</textarea>", K.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue
  }();
  var Tt = "undefined";
  K.focusinBubbles = "onfocusin"in e;
  var Ct = /^key/, kt = /^(?:mouse|pointer|contextmenu)|click/, At = /^(?:focusinfocus|focusoutblur)$/, _t = /^([^.]*)(?:\.(.+)|)$/;
  J.event = {
    global: {},
    add: function (e, t, n, r, i) {
      var a, o, s, u, l, c, p, f, d, h, m, g = vt.get(e);
      if (g)for (n.handler && (a = n, n = a.handler, i = a.selector), n.guid || (n.guid = J.guid++), (u = g.events) || (u = g.events = {}), (o = g.handle) || (o = g.handle = function (t) {
        return typeof J !== Tt && J.event.triggered !== t.type ? J.event.dispatch.apply(e, arguments) : void 0
      }), t = (t || "").match(dt) || [""], l = t.length; l--;)s = _t.exec(t[l]) || [], d = m = s[1], h = (s[2] || "").split(".").sort(), d && (p = J.event.special[d] || {}, d = (i ? p.delegateType : p.bindType) || d, p = J.event.special[d] || {}, c = J.extend({
        type: d,
        origType: m,
        data: r,
        handler: n,
        guid: n.guid,
        selector: i,
        needsContext: i && J.expr.match.needsContext.test(i),
        namespace: h.join(".")
      }, a), (f = u[d]) || (f = u[d] = [], f.delegateCount = 0, p.setup && p.setup.call(e, r, h, o) !== !1 || e.addEventListener && e.addEventListener(d, o, !1)), p.add && (p.add.call(e, c), c.handler.guid || (c.handler.guid = n.guid)), i ? f.splice(f.delegateCount++, 0, c) : f.push(c), J.event.global[d] = !0)
    },
    remove: function (e, t, n, r, i) {
      var a, o, s, u, l, c, p, f, d, h, m, g = vt.hasData(e) && vt.get(e);
      if (g && (u = g.events)) {
        for (t = (t || "").match(dt) || [""], l = t.length; l--;)if (s = _t.exec(t[l]) || [], d = m = s[1], h = (s[2] || "").split(".").sort(), d) {
          for (p = J.event.special[d] || {}, d = (r ? p.delegateType : p.bindType) || d, f = u[d] || [], s = s[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), o = a = f.length; a--;)c = f[a], !i && m !== c.origType || n && n.guid !== c.guid || s && !s.test(c.namespace) || r && r !== c.selector && ("**" !== r || !c.selector) || (f.splice(a, 1), c.selector && f.delegateCount--, p.remove && p.remove.call(e, c));
          o && !f.length && (p.teardown && p.teardown.call(e, h, g.handle) !== !1 || J.removeEvent(e, d, g.handle), delete u[d])
        } else for (d in u)J.event.remove(e, d + t[l], n, r, !0);
        J.isEmptyObject(u) && (delete g.handle, vt.remove(e, "events"))
      }
    },
    trigger: function (t, n, r, i) {
      var a, o, s, u, l, c, p, f = [r || Q], d = X.call(t, "type") ? t.type : t, h = X.call(t, "namespace") ? t.namespace.split(".") : [];
      if (o = s = r = r || Q, 3 !== r.nodeType && 8 !== r.nodeType && !At.test(d + J.event.triggered) && (d.indexOf(".") >= 0 && (h = d.split("."), d = h.shift(), h.sort()), l = d.indexOf(":") < 0 && "on" + d, t = t[J.expando] ? t : new J.Event(d, "object" == typeof t && t), t.isTrigger = i ? 2 : 3, t.namespace = h.join("."), t.namespace_re = t.namespace ? new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target || (t.target = r), n = null == n ? [t] : J.makeArray(n, [t]), p = J.event.special[d] || {}, i || !p.trigger || p.trigger.apply(r, n) !== !1)) {
        if (!i && !p.noBubble && !J.isWindow(r)) {
          for (u = p.delegateType || d, At.test(u + d) || (o = o.parentNode); o; o = o.parentNode)f.push(o), s = o;
          s === (r.ownerDocument || Q) && f.push(s.defaultView || s.parentWindow || e)
        }
        for (a = 0; (o = f[a++]) && !t.isPropagationStopped();)t.type = a > 1 ? u : p.bindType || d, c = (vt.get(o, "events") || {})[t.type] && vt.get(o, "handle"), c && c.apply(o, n), c = l && o[l], c && c.apply && J.acceptData(o) && (t.result = c.apply(o, n), t.result === !1 && t.preventDefault());
        return t.type = d, i || t.isDefaultPrevented() || p._default && p._default.apply(f.pop(), n) !== !1 || !J.acceptData(r) || l && J.isFunction(r[d]) && !J.isWindow(r) && (s = r[l], s && (r[l] = null), J.event.triggered = d, r[d](), J.event.triggered = void 0, s && (r[l] = s)), t.result
      }
    },
    dispatch: function (e) {
      e = J.event.fix(e);
      var t, n, r, i, a, o = [], s = U.call(arguments), u = (vt.get(this, "events") || {})[e.type] || [], l = J.event.special[e.type] || {};
      if (s[0] = e, e.delegateTarget = this, !l.preDispatch || l.preDispatch.call(this, e) !== !1) {
        for (o = J.event.handlers.call(this, e, u), t = 0; (i = o[t++]) && !e.isPropagationStopped();)for (e.currentTarget = i.elem, n = 0; (a = i.handlers[n++]) && !e.isImmediatePropagationStopped();)(!e.namespace_re || e.namespace_re.test(a.namespace)) && (e.handleObj = a, e.data = a.data, r = ((J.event.special[a.origType] || {}).handle || a.handler).apply(i.elem, s), void 0 !== r && (e.result = r) === !1 && (e.preventDefault(), e.stopPropagation()));
        return l.postDispatch && l.postDispatch.call(this, e), e.result
      }
    },
    handlers: function (e, t) {
      var n, r, i, a, o = [], s = t.delegateCount, u = e.target;
      if (s && u.nodeType && (!e.button || "click" !== e.type))for (; u !== this; u = u.parentNode || this)if (u.disabled !== !0 || "click" !== e.type) {
        for (r = [], n = 0; s > n; n++)a = t[n], i = a.selector + " ", void 0 === r[i] && (r[i] = a.needsContext ? J(i, this).index(u) >= 0 : J.find(i, this, null, [u]).length), r[i] && r.push(a);
        r.length && o.push({elem: u, handlers: r})
      }
      return s < t.length && o.push({elem: this, handlers: t.slice(s)}), o
    },
    props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
    fixHooks: {},
    keyHooks: {
      props: "char charCode key keyCode".split(" "), filter: function (e, t) {
        return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e
      }
    },
    mouseHooks: {
      props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
      filter: function (e, t) {
        var n, r, i, a = t.button;
        return null == e.pageX && null != t.clientX && (n = e.target.ownerDocument || Q, r = n.documentElement, i = n.body, e.pageX = t.clientX + (r && r.scrollLeft || i && i.scrollLeft || 0) - (r && r.clientLeft || i && i.clientLeft || 0), e.pageY = t.clientY + (r && r.scrollTop || i && i.scrollTop || 0) - (r && r.clientTop || i && i.clientTop || 0)), e.which || void 0 === a || (e.which = 1 & a ? 1 : 2 & a ? 3 : 4 & a ? 2 : 0), e
      }
    },
    fix: function (e) {
      if (e[J.expando])return e;
      var t, n, r, i = e.type, a = e, o = this.fixHooks[i];
      for (o || (this.fixHooks[i] = o = kt.test(i) ? this.mouseHooks : Ct.test(i) ? this.keyHooks : {}), r = o.props ? this.props.concat(o.props) : this.props, e = new J.Event(a), t = r.length; t--;)n = r[t], e[n] = a[n];
      return e.target || (e.target = Q), 3 === e.target.nodeType && (e.target = e.target.parentNode), o.filter ? o.filter(e, a) : e
    },
    special: {
      load: {noBubble: !0}, focus: {
        trigger: function () {
          return this !== p() && this.focus ? (this.focus(), !1) : void 0
        }, delegateType: "focusin"
      }, blur: {
        trigger: function () {
          return this === p() && this.blur ? (this.blur(), !1) : void 0
        }, delegateType: "focusout"
      }, click: {
        trigger: function () {
          return "checkbox" === this.type && this.click && J.nodeName(this, "input") ? (this.click(), !1) : void 0
        }, _default: function (e) {
          return J.nodeName(e.target, "a")
        }
      }, beforeunload: {
        postDispatch: function (e) {
          void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
        }
      }
    },
    simulate: function (e, t, n, r) {
      var i = J.extend(new J.Event, n, {type: e, isSimulated: !0, originalEvent: {}});
      r ? J.event.trigger(i, null, t) : J.event.dispatch.call(t, i), i.isDefaultPrevented() && n.preventDefault()
    }
  }, J.removeEvent = function (e, t, n) {
    e.removeEventListener && e.removeEventListener(t, n, !1)
  }, J.Event = function (e, t) {
    return this instanceof J.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && e.returnValue === !1 ? l : c) : this.type = e, t && J.extend(this, t), this.timeStamp = e && e.timeStamp || J.now(), void(this[J.expando] = !0)) : new J.Event(e, t)
  }, J.Event.prototype = {
    isDefaultPrevented: c,
    isPropagationStopped: c,
    isImmediatePropagationStopped: c,
    preventDefault: function () {
      var e = this.originalEvent;
      this.isDefaultPrevented = l, e && e.preventDefault && e.preventDefault()
    },
    stopPropagation: function () {
      var e = this.originalEvent;
      this.isPropagationStopped = l, e && e.stopPropagation && e.stopPropagation()
    },
    stopImmediatePropagation: function () {
      var e = this.originalEvent;
      this.isImmediatePropagationStopped = l, e && e.stopImmediatePropagation && e.stopImmediatePropagation(), this.stopPropagation()
    }
  }, J.each({
    mouseenter: "mouseover",
    mouseleave: "mouseout",
    pointerenter: "pointerover",
    pointerleave: "pointerout"
  }, function (e, t) {
    J.event.special[e] = {
      delegateType: t, bindType: t, handle: function (e) {
        var n, r = this, i = e.relatedTarget, a = e.handleObj;
        return (!i || i !== r && !J.contains(r, i)) && (e.type = a.origType, n = a.handler.apply(this, arguments), e.type = t), n
      }
    }
  }), K.focusinBubbles || J.each({focus: "focusin", blur: "focusout"}, function (e, t) {
    var n = function (e) {
      J.event.simulate(t, e.target, J.event.fix(e), !0)
    };
    J.event.special[t] = {
      setup: function () {
        var r = this.ownerDocument || this, i = vt.access(r, t);
        i || r.addEventListener(e, n, !0), vt.access(r, t, (i || 0) + 1)
      }, teardown: function () {
        var r = this.ownerDocument || this, i = vt.access(r, t) - 1;
        i ? vt.access(r, t, i) : (r.removeEventListener(e, n, !0), vt.remove(r, t))
      }
    }
  }), J.fn.extend({
    on: function (e, t, n, r, i) {
      var a, o;
      if ("object" == typeof e) {
        "string" != typeof t && (n = n || t, t = void 0);
        for (o in e)this.on(o, t, n, e[o], i);
        return this
      }
      if (null == n && null == r ? (r = t, n = t = void 0) : null == r && ("string" == typeof t ? (r = n, n = void 0) : (r = n, n = t, t = void 0)), r === !1)r = c; else if (!r)return this;
      return 1 === i && (a = r, r = function (e) {
        return J().off(e), a.apply(this, arguments)
      }, r.guid = a.guid || (a.guid = J.guid++)), this.each(function () {
        J.event.add(this, e, r, n, t)
      })
    }, one: function (e, t, n, r) {
      return this.on(e, t, n, r, 1)
    }, off: function (e, t, n) {
      var r, i;
      if (e && e.preventDefault && e.handleObj)return r = e.handleObj, J(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;
      if ("object" == typeof e) {
        for (i in e)this.off(i, t, e[i]);
        return this
      }
      return (t === !1 || "function" == typeof t) && (n = t, t = void 0), n === !1 && (n = c), this.each(function () {
        J.event.remove(this, e, n, t)
      })
    }, trigger: function (e, t) {
      return this.each(function () {
        J.event.trigger(e, t, this)
      })
    }, triggerHandler: function (e, t) {
      var n = this[0];
      return n ? J.event.trigger(e, t, n, !0) : void 0
    }
  });
  var Dt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, Mt = /<([\w:]+)/, Ot = /<|&#?\w+;/, Nt = /<(?:script|style|link)/i, Pt = /checked\s*(?:[^=]|=\s*.checked.)/i, Rt = /^$|\/(?:java|ecma)script/i, It = /^true\/(.*)/, Lt = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, jt = {
    option: [1, "<select multiple='multiple'>", "</select>"],
    thead: [1, "<table>", "</table>"],
    col: [2, "<table><colgroup>", "</colgroup></table>"],
    tr: [2, "<table><tbody>", "</tbody></table>"],
    td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
    _default: [0, "", ""]
  };
  jt.optgroup = jt.option, jt.tbody = jt.tfoot = jt.colgroup = jt.caption = jt.thead, jt.th = jt.td, J.extend({
    clone: function (e, t, n) {
      var r, i, a, o, s = e.cloneNode(!0), u = J.contains(e.ownerDocument, e);
      if (!(K.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || J.isXMLDoc(e)))for (o = v(s), a = v(e), r = 0, i = a.length; i > r; r++)y(a[r], o[r]);
      if (t)if (n)for (a = a || v(e), o = o || v(s), r = 0, i = a.length; i > r; r++)g(a[r], o[r]); else g(e, s);
      return o = v(s, "script"), o.length > 0 && m(o, !u && v(e, "script")), s
    }, buildFragment: function (e, t, n, r) {
      for (var i, a, o, s, u, l, c = t.createDocumentFragment(), p = [], f = 0, d = e.length; d > f; f++)if (i = e[f], i || 0 === i)if ("object" === J.type(i))J.merge(p, i.nodeType ? [i] : i); else if (Ot.test(i)) {
        for (a = a || c.appendChild(t.createElement("div")), o = (Mt.exec(i) || ["", ""])[1].toLowerCase(), s = jt[o] || jt._default, a.innerHTML = s[1] + i.replace(Dt, "<$1></$2>") + s[2], l = s[0]; l--;)a = a.lastChild;
        J.merge(p, a.childNodes), a = c.firstChild, a.textContent = ""
      } else p.push(t.createTextNode(i));
      for (c.textContent = "", f = 0; i = p[f++];)if ((!r || -1 === J.inArray(i, r)) && (u = J.contains(i.ownerDocument, i), a = v(c.appendChild(i), "script"), u && m(a), n))for (l = 0; i = a[l++];)Rt.test(i.type || "") && n.push(i);
      return c
    }, cleanData: function (e) {
      for (var t, n, r, i, a = J.event.special, o = 0; void 0 !== (n = e[o]); o++) {
        if (J.acceptData(n) && (i = n[vt.expando], i && (t = vt.cache[i]))) {
          if (t.events)for (r in t.events)a[r] ? J.event.remove(n, r) : J.removeEvent(n, r, t.handle);
          vt.cache[i] && delete vt.cache[i]
        }
        delete yt.cache[n[yt.expando]]
      }
    }
  }), J.fn.extend({
    text: function (e) {
      return gt(this, function (e) {
        return void 0 === e ? J.text(this) : this.empty().each(function () {
          (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && (this.textContent = e)
        })
      }, null, e, arguments.length)
    }, append: function () {
      return this.domManip(arguments, function (e) {
        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
          var t = f(this, e);
          t.appendChild(e)
        }
      })
    }, prepend: function () {
      return this.domManip(arguments, function (e) {
        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
          var t = f(this, e);
          t.insertBefore(e, t.firstChild)
        }
      })
    }, before: function () {
      return this.domManip(arguments, function (e) {
        this.parentNode && this.parentNode.insertBefore(e, this)
      })
    }, after: function () {
      return this.domManip(arguments, function (e) {
        this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
      })
    }, remove: function (e, t) {
      for (var n, r = e ? J.filter(e, this) : this, i = 0; null != (n = r[i]); i++)t || 1 !== n.nodeType || J.cleanData(v(n)), n.parentNode && (t && J.contains(n.ownerDocument, n) && m(v(n, "script")), n.parentNode.removeChild(n));
      return this
    }, empty: function () {
      for (var e, t = 0; null != (e = this[t]); t++)1 === e.nodeType && (J.cleanData(v(e, !1)), e.textContent = "");
      return this
    }, clone: function (e, t) {
      return e = null == e ? !1 : e, t = null == t ? e : t, this.map(function () {
        return J.clone(this, e, t)
      })
    }, html: function (e) {
      return gt(this, function (e) {
        var t = this[0] || {}, n = 0, r = this.length;
        if (void 0 === e && 1 === t.nodeType)return t.innerHTML;
        if ("string" == typeof e && !Nt.test(e) && !jt[(Mt.exec(e) || ["", ""])[1].toLowerCase()]) {
          e = e.replace(Dt, "<$1></$2>");
          try {
            for (; r > n; n++)t = this[n] || {}, 1 === t.nodeType && (J.cleanData(v(t, !1)), t.innerHTML = e);
            t = 0
          } catch (i) {
          }
        }
        t && this.empty().append(e)
      }, null, e, arguments.length)
    }, replaceWith: function () {
      var e = arguments[0];
      return this.domManip(arguments, function (t) {
        e = this.parentNode, J.cleanData(v(this)), e && e.replaceChild(t, this)
      }), e && (e.length || e.nodeType) ? this : this.remove()
    }, detach: function (e) {
      return this.remove(e, !0)
    }, domManip: function (e, t) {
      e = H.apply([], e);
      var n, r, i, a, o, s, u = 0, l = this.length, c = this, p = l - 1, f = e[0], m = J.isFunction(f);
      if (m || l > 1 && "string" == typeof f && !K.checkClone && Pt.test(f))return this.each(function (n) {
        var r = c.eq(n);
        m && (e[0] = f.call(this, n, r.html())), r.domManip(e, t)
      });
      if (l && (n = J.buildFragment(e, this[0].ownerDocument, !1, this), r = n.firstChild, 1 === n.childNodes.length && (n = r), r)) {
        for (i = J.map(v(n, "script"), d), a = i.length; l > u; u++)o = n, u !== p && (o = J.clone(o, !0, !0), a && J.merge(i, v(o, "script"))), t.call(this[u], o, u);
        if (a)for (s = i[i.length - 1].ownerDocument, J.map(i, h), u = 0; a > u; u++)o = i[u], Rt.test(o.type || "") && !vt.access(o, "globalEval") && J.contains(s, o) && (o.src ? J._evalUrl && J._evalUrl(o.src) : J.globalEval(o.textContent.replace(Lt, "")))
      }
      return this
    }
  }), J.each({
    appendTo: "append",
    prependTo: "prepend",
    insertBefore: "before",
    insertAfter: "after",
    replaceAll: "replaceWith"
  }, function (e, t) {
    J.fn[e] = function (e) {
      for (var n, r = [], i = J(e), a = i.length - 1, o = 0; a >= o; o++)n = o === a ? this : this.clone(!0), J(i[o])[t](n), W.apply(r, n.get());
      return this.pushStack(r)
    }
  });
  var Ft, Bt = {}, qt = /^margin/, Vt = new RegExp("^(" + wt + ")(?!px)[a-z%]+$", "i"), Ut = function (e) {
    return e.ownerDocument.defaultView.getComputedStyle(e, null)
  };
  !function () {
    function t() {
      o.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", o.innerHTML = "", i.appendChild(a);
      var t = e.getComputedStyle(o, null);
      n = "1%" !== t.top, r = "4px" === t.width, i.removeChild(a)
    }

    var n, r, i = Q.documentElement, a = Q.createElement("div"), o = Q.createElement("div");
    o.style && (o.style.backgroundClip = "content-box", o.cloneNode(!0).style.backgroundClip = "", K.clearCloneStyle = "content-box" === o.style.backgroundClip, a.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute", a.appendChild(o), e.getComputedStyle && J.extend(K, {
      pixelPosition: function () {
        return t(), n
      }, boxSizingReliable: function () {
        return null == r && t(), r
      }, reliableMarginRight: function () {
        var t, n = o.appendChild(Q.createElement("div"));
        return n.style.cssText = o.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", n.style.marginRight = n.style.width = "0", o.style.width = "1px", i.appendChild(a), t = !parseFloat(e.getComputedStyle(n, null).marginRight), i.removeChild(a), t
      }
    }))
  }(), J.swap = function (e, t, n, r) {
    var i, a, o = {};
    for (a in t)o[a] = e.style[a], e.style[a] = t[a];
    i = n.apply(e, r || []);
    for (a in t)e.style[a] = o[a];
    return i
  };
  var Ht = /^(none|table(?!-c[ea]).+)/, Wt = new RegExp("^(" + wt + ")(.*)$", "i"), Yt = new RegExp("^([+-])=(" + wt + ")", "i"), zt = {
    position: "absolute",
    visibility: "hidden",
    display: "block"
  }, Gt = {letterSpacing: "0", fontWeight: "400"}, Xt = ["Webkit", "O", "Moz", "ms"];
  J.extend({
    cssHooks: {
      opacity: {
        get: function (e, t) {
          if (t) {
            var n = w(e, "opacity");
            return "" === n ? "1" : n
          }
        }
      }
    },
    cssNumber: {
      columnCount: !0,
      fillOpacity: !0,
      flexGrow: !0,
      flexShrink: !0,
      fontWeight: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0
    },
    cssProps: {"float": "cssFloat"},
    style: function (e, t, n, r) {
      if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
        var i, a, o, s = J.camelCase(t), u = e.style;
        return t = J.cssProps[s] || (J.cssProps[s] = E(u, s)), o = J.cssHooks[t] || J.cssHooks[s], void 0 === n ? o && "get"in o && void 0 !== (i = o.get(e, !1, r)) ? i : u[t] : (a = typeof n, "string" === a && (i = Yt.exec(n)) && (n = (i[1] + 1) * i[2] + parseFloat(J.css(e, t)), a = "number"), null != n && n === n && ("number" !== a || J.cssNumber[s] || (n += "px"), K.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (u[t] = "inherit"), o && "set"in o && void 0 === (n = o.set(e, n, r)) || (u[t] = n)), void 0)
      }
    },
    css: function (e, t, n, r) {
      var i, a, o, s = J.camelCase(t);
      return t = J.cssProps[s] || (J.cssProps[s] = E(e.style, s)), o = J.cssHooks[t] || J.cssHooks[s], o && "get"in o && (i = o.get(e, !0, n)), void 0 === i && (i = w(e, t, r)), "normal" === i && t in Gt && (i = Gt[t]), "" === n || n ? (a = parseFloat(i), n === !0 || J.isNumeric(a) ? a || 0 : i) : i
    }
  }), J.each(["height", "width"], function (e, t) {
    J.cssHooks[t] = {
      get: function (e, n, r) {
        return n ? Ht.test(J.css(e, "display")) && 0 === e.offsetWidth ? J.swap(e, zt, function () {
          return C(e, t, r)
        }) : C(e, t, r) : void 0
      }, set: function (e, n, r) {
        var i = r && Ut(e);
        return S(e, n, r ? T(e, t, r, "border-box" === J.css(e, "boxSizing", !1, i), i) : 0)
      }
    }
  }), J.cssHooks.marginRight = $(K.reliableMarginRight, function (e, t) {
    return t ? J.swap(e, {display: "inline-block"}, w, [e, "marginRight"]) : void 0
  }), J.each({margin: "", padding: "", border: "Width"}, function (e, t) {
    J.cssHooks[e + t] = {
      expand: function (n) {
        for (var r = 0, i = {}, a = "string" == typeof n ? n.split(" ") : [n]; 4 > r; r++)i[e + $t[r] + t] = a[r] || a[r - 2] || a[0];
        return i
      }
    }, qt.test(e) || (J.cssHooks[e + t].set = S)
  }), J.fn.extend({
    css: function (e, t) {
      return gt(this, function (e, t, n) {
        var r, i, a = {}, o = 0;
        if (J.isArray(t)) {
          for (r = Ut(e), i = t.length; i > o; o++)a[t[o]] = J.css(e, t[o], !1, r);
          return a
        }
        return void 0 !== n ? J.style(e, t, n) : J.css(e, t)
      }, e, t, arguments.length > 1)
    }, show: function () {
      return k(this, !0)
    }, hide: function () {
      return k(this)
    }, toggle: function (e) {
      return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function () {
        Et(this) ? J(this).show() : J(this).hide()
      })
    }
  }), J.Tween = A, A.prototype = {
    constructor: A, init: function (e, t, n, r, i, a) {
      this.elem = e, this.prop = n, this.easing = i || "swing", this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = a || (J.cssNumber[n] ? "" : "px")
    }, cur: function () {
      var e = A.propHooks[this.prop];
      return e && e.get ? e.get(this) : A.propHooks._default.get(this)
    }, run: function (e) {
      var t, n = A.propHooks[this.prop];
      return this.pos = t = this.options.duration ? J.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : A.propHooks._default.set(this), this
    }
  }, A.prototype.init.prototype = A.prototype, A.propHooks = {
    _default: {
      get: function (e) {
        var t;
        return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = J.css(e.elem, e.prop, ""), t && "auto" !== t ? t : 0) : e.elem[e.prop]
      }, set: function (e) {
        J.fx.step[e.prop] ? J.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[J.cssProps[e.prop]] || J.cssHooks[e.prop]) ? J.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
      }
    }
  }, A.propHooks.scrollTop = A.propHooks.scrollLeft = {
    set: function (e) {
      e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
    }
  }, J.easing = {
    linear: function (e) {
      return e
    }, swing: function (e) {
      return .5 - Math.cos(e * Math.PI) / 2
    }
  }, J.fx = A.prototype.init, J.fx.step = {};
  var Kt, Qt, Zt = /^(?:toggle|show|hide)$/, Jt = new RegExp("^(?:([+-])=|)(" + wt + ")([a-z%]*)$", "i"), en = /queueHooks$/, tn = [O], nn = {
    "*": [function (e, t) {
      var n = this.createTween(e, t), r = n.cur(), i = Jt.exec(t), a = i && i[3] || (J.cssNumber[e] ? "" : "px"), o = (J.cssNumber[e] || "px" !== a && +r) && Jt.exec(J.css(n.elem, e)), s = 1, u = 20;
      if (o && o[3] !== a) {
        a = a || o[3], i = i || [], o = +r || 1;
        do s = s || ".5", o /= s, J.style(n.elem, e, o + a); while (s !== (s = n.cur() / r) && 1 !== s && --u)
      }
      return i && (o = n.start = +o || +r || 0, n.unit = a, n.end = i[1] ? o + (i[1] + 1) * i[2] : +i[2]), n
    }]
  };
  J.Animation = J.extend(P, {
    tweener: function (e, t) {
      J.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
      for (var n, r = 0, i = e.length; i > r; r++)n = e[r], nn[n] = nn[n] || [], nn[n].unshift(t)
    }, prefilter: function (e, t) {
      t ? tn.unshift(e) : tn.push(e)
    }
  }), J.speed = function (e, t, n) {
    var r = e && "object" == typeof e ? J.extend({}, e) : {
      complete: n || !n && t || J.isFunction(e) && e,
      duration: e,
      easing: n && t || t && !J.isFunction(t) && t
    };
    return r.duration = J.fx.off ? 0 : "number" == typeof r.duration ? r.duration : r.duration in J.fx.speeds ? J.fx.speeds[r.duration] : J.fx.speeds._default, (null == r.queue || r.queue === !0) && (r.queue = "fx"), r.old = r.complete, r.complete = function () {
      J.isFunction(r.old) && r.old.call(this), r.queue && J.dequeue(this, r.queue)
    }, r
  }, J.fn.extend({
    fadeTo: function (e, t, n, r) {
      return this.filter(Et).css("opacity", 0).show().end().animate({opacity: t}, e, n, r)
    }, animate: function (e, t, n, r) {
      var i = J.isEmptyObject(e), a = J.speed(t, n, r), o = function () {
        var t = P(this, J.extend({}, e), a);
        (i || vt.get(this, "finish")) && t.stop(!0)
      };
      return o.finish = o, i || a.queue === !1 ? this.each(o) : this.queue(a.queue, o)
    }, stop: function (e, t, n) {
      var r = function (e) {
        var t = e.stop;
        delete e.stop, t(n)
      };
      return "string" != typeof e && (n = t, t = e, e = void 0), t && e !== !1 && this.queue(e || "fx", []), this.each(function () {
        var t = !0, i = null != e && e + "queueHooks", a = J.timers, o = vt.get(this);
        if (i)o[i] && o[i].stop && r(o[i]); else for (i in o)o[i] && o[i].stop && en.test(i) && r(o[i]);
        for (i = a.length; i--;)a[i].elem !== this || null != e && a[i].queue !== e || (a[i].anim.stop(n), t = !1, a.splice(i, 1));
        (t || !n) && J.dequeue(this, e)
      })
    }, finish: function (e) {
      return e !== !1 && (e = e || "fx"), this.each(function () {
        var t, n = vt.get(this), r = n[e + "queue"], i = n[e + "queueHooks"], a = J.timers, o = r ? r.length : 0;
        for (n.finish = !0, J.queue(this, e, []), i && i.stop && i.stop.call(this, !0), t = a.length; t--;)a[t].elem === this && a[t].queue === e && (a[t].anim.stop(!0), a.splice(t, 1));
        for (t = 0; o > t; t++)r[t] && r[t].finish && r[t].finish.call(this);
        delete n.finish
      })
    }
  }), J.each(["toggle", "show", "hide"], function (e, t) {
    var n = J.fn[t];
    J.fn[t] = function (e, r, i) {
      return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(D(t, !0), e, r, i)
    }
  }), J.each({
    slideDown: D("show"),
    slideUp: D("hide"),
    slideToggle: D("toggle"),
    fadeIn: {opacity: "show"},
    fadeOut: {opacity: "hide"},
    fadeToggle: {opacity: "toggle"}
  }, function (e, t) {
    J.fn[e] = function (e, n, r) {
      return this.animate(t, e, n, r)
    }
  }), J.timers = [], J.fx.tick = function () {
    var e, t = 0, n = J.timers;
    for (Kt = J.now(); t < n.length; t++)e = n[t], e() || n[t] !== e || n.splice(t--, 1);
    n.length || J.fx.stop(), Kt = void 0
  }, J.fx.timer = function (e) {
    J.timers.push(e), e() ? J.fx.start() : J.timers.pop()
  }, J.fx.interval = 13, J.fx.start = function () {
    Qt || (Qt = setInterval(J.fx.tick, J.fx.interval))
  }, J.fx.stop = function () {
    clearInterval(Qt), Qt = null
  }, J.fx.speeds = {slow: 600, fast: 200, _default: 400}, J.fn.delay = function (e, t) {
    return e = J.fx ? J.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function (t, n) {
      var r = setTimeout(t, e);
      n.stop = function () {
        clearTimeout(r)
      }
    })
  }, function () {
    var e = Q.createElement("input"), t = Q.createElement("select"), n = t.appendChild(Q.createElement("option"));
    e.type = "checkbox", K.checkOn = "" !== e.value, K.optSelected = n.selected, t.disabled = !0, K.optDisabled = !n.disabled, e = Q.createElement("input"), e.value = "t", e.type = "radio", K.radioValue = "t" === e.value
  }();
  var rn, an, on = J.expr.attrHandle;
  J.fn.extend({
    attr: function (e, t) {
      return gt(this, J.attr, e, t, arguments.length > 1)
    }, removeAttr: function (e) {
      return this.each(function () {
        J.removeAttr(this, e)
      })
    }
  }), J.extend({
    attr: function (e, t, n) {
      var r, i, a = e.nodeType;
      if (e && 3 !== a && 8 !== a && 2 !== a)return typeof e.getAttribute === Tt ? J.prop(e, t, n) : (1 === a && J.isXMLDoc(e) || (t = t.toLowerCase(), r = J.attrHooks[t] || (J.expr.match.bool.test(t) ? an : rn)), void 0 === n ? r && "get"in r && null !== (i = r.get(e, t)) ? i : (i = J.find.attr(e, t), null == i ? void 0 : i) : null !== n ? r && "set"in r && void 0 !== (i = r.set(e, n, t)) ? i : (e.setAttribute(t, n + ""), n) : void J.removeAttr(e, t))
    }, removeAttr: function (e, t) {
      var n, r, i = 0, a = t && t.match(dt);
      if (a && 1 === e.nodeType)for (; n = a[i++];)r = J.propFix[n] || n, J.expr.match.bool.test(n) && (e[r] = !1), e.removeAttribute(n)
    }, attrHooks: {
      type: {
        set: function (e, t) {
          if (!K.radioValue && "radio" === t && J.nodeName(e, "input")) {
            var n = e.value;
            return e.setAttribute("type", t), n && (e.value = n), t
          }
        }
      }
    }
  }), an = {
    set: function (e, t, n) {
      return t === !1 ? J.removeAttr(e, n) : e.setAttribute(n, n), n
    }
  }, J.each(J.expr.match.bool.source.match(/\w+/g), function (e, t) {
    var n = on[t] || J.find.attr;
    on[t] = function (e, t, r) {
      var i, a;
      return r || (a = on[t], on[t] = i, i = null != n(e, t, r) ? t.toLowerCase() : null, on[t] = a), i
    }
  });
  var sn = /^(?:input|select|textarea|button)$/i;
  J.fn.extend({
    prop: function (e, t) {
      return gt(this, J.prop, e, t, arguments.length > 1)
    }, removeProp: function (e) {
      return this.each(function () {
        delete this[J.propFix[e] || e]
      })
    }
  }), J.extend({
    propFix: {"for": "htmlFor", "class": "className"}, prop: function (e, t, n) {
      var r, i, a, o = e.nodeType;
      if (e && 3 !== o && 8 !== o && 2 !== o)return a = 1 !== o || !J.isXMLDoc(e), a && (t = J.propFix[t] || t, i = J.propHooks[t]), void 0 !== n ? i && "set"in i && void 0 !== (r = i.set(e, n, t)) ? r : e[t] = n : i && "get"in i && null !== (r = i.get(e, t)) ? r : e[t]
    }, propHooks: {
      tabIndex: {
        get: function (e) {
          return e.hasAttribute("tabindex") || sn.test(e.nodeName) || e.href ? e.tabIndex : -1
        }
      }
    }
  }), K.optSelected || (J.propHooks.selected = {
    get: function (e) {
      var t = e.parentNode;
      return t && t.parentNode && t.parentNode.selectedIndex, null
    }
  }), J.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
    J.propFix[this.toLowerCase()] = this
  });
  var un = /[\t\r\n\f]/g;
  J.fn.extend({
    addClass: function (e) {
      var t, n, r, i, a, o, s = "string" == typeof e && e, u = 0, l = this.length;
      if (J.isFunction(e))return this.each(function (t) {
        J(this).addClass(e.call(this, t, this.className))
      });
      if (s)for (t = (e || "").match(dt) || []; l > u; u++)if (n = this[u], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(un, " ") : " ")) {
        for (a = 0; i = t[a++];)r.indexOf(" " + i + " ") < 0 && (r += i + " ");
        o = J.trim(r), n.className !== o && (n.className = o)
      }
      return this
    }, removeClass: function (e) {
      var t, n, r, i, a, o, s = 0 === arguments.length || "string" == typeof e && e, u = 0, l = this.length;
      if (J.isFunction(e))return this.each(function (t) {
        J(this).removeClass(e.call(this, t, this.className))
      });
      if (s)for (t = (e || "").match(dt) || []; l > u; u++)if (n = this[u], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(un, " ") : "")) {
        for (a = 0; i = t[a++];)for (; r.indexOf(" " + i + " ") >= 0;)r = r.replace(" " + i + " ", " ");
        o = e ? J.trim(r) : "", n.className !== o && (n.className = o)
      }
      return this
    }, toggleClass: function (e, t) {
      var n = typeof e;
      return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : this.each(J.isFunction(e) ? function (n) {
        J(this).toggleClass(e.call(this, n, this.className, t), t)
      } : function () {
        if ("string" === n)for (var t, r = 0, i = J(this), a = e.match(dt) || []; t = a[r++];)i.hasClass(t) ? i.removeClass(t) : i.addClass(t); else(n === Tt || "boolean" === n) && (this.className && vt.set(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : vt.get(this, "__className__") || "")
      })
    }, hasClass: function (e) {
      for (var t = " " + e + " ", n = 0, r = this.length; r > n; n++)if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(un, " ").indexOf(t) >= 0)return !0;
      return !1
    }
  });
  var ln = /\r/g;
  J.fn.extend({
    val: function (e) {
      var t, n, r, i = this[0];
      {
        if (arguments.length)return r = J.isFunction(e), this.each(function (n) {
          var i;
          1 === this.nodeType && (i = r ? e.call(this, n, J(this).val()) : e, null == i ? i = "" : "number" == typeof i ? i += "" : J.isArray(i) && (i = J.map(i, function (e) {
            return null == e ? "" : e + ""
          })), t = J.valHooks[this.type] || J.valHooks[this.nodeName.toLowerCase()], t && "set"in t && void 0 !== t.set(this, i, "value") || (this.value = i))
        });
        if (i)return t = J.valHooks[i.type] || J.valHooks[i.nodeName.toLowerCase()], t && "get"in t && void 0 !== (n = t.get(i, "value")) ? n : (n = i.value, "string" == typeof n ? n.replace(ln, "") : null == n ? "" : n)
      }
    }
  }), J.extend({
    valHooks: {
      option: {
        get: function (e) {
          var t = J.find.attr(e, "value");
          return null != t ? t : J.trim(J.text(e))
        }
      }, select: {
        get: function (e) {
          for (var t, n, r = e.options, i = e.selectedIndex, a = "select-one" === e.type || 0 > i, o = a ? null : [], s = a ? i + 1 : r.length, u = 0 > i ? s : a ? i : 0; s > u; u++)if (n = r[u], !(!n.selected && u !== i || (K.optDisabled ? n.disabled : null !== n.getAttribute("disabled")) || n.parentNode.disabled && J.nodeName(n.parentNode, "optgroup"))) {
            if (t = J(n).val(), a)return t;
            o.push(t)
          }
          return o
        }, set: function (e, t) {
          for (var n, r, i = e.options, a = J.makeArray(t), o = i.length; o--;)r = i[o], (r.selected = J.inArray(r.value, a) >= 0) && (n = !0);
          return n || (e.selectedIndex = -1), a
        }
      }
    }
  }), J.each(["radio", "checkbox"], function () {
    J.valHooks[this] = {
      set: function (e, t) {
        return J.isArray(t) ? e.checked = J.inArray(J(e).val(), t) >= 0 : void 0
      }
    }, K.checkOn || (J.valHooks[this].get = function (e) {
      return null === e.getAttribute("value") ? "on" : e.value
    })
  }), J.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (e, t) {
    J.fn[t] = function (e, n) {
      return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
    }
  }), J.fn.extend({
    hover: function (e, t) {
      return this.mouseenter(e).mouseleave(t || e)
    }, bind: function (e, t, n) {
      return this.on(e, null, t, n)
    }, unbind: function (e, t) {
      return this.off(e, null, t)
    }, delegate: function (e, t, n, r) {
      return this.on(t, e, n, r)
    }, undelegate: function (e, t, n) {
      return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
    }
  });
  var cn = J.now(), pn = /\?/;
  J.parseJSON = function (e) {
    return JSON.parse(e + "")
  }, J.parseXML = function (e) {
    var t, n;
    if (!e || "string" != typeof e)return null;
    try {
      n = new DOMParser, t = n.parseFromString(e, "text/xml")
    } catch (r) {
      t = void 0
    }
    return (!t || t.getElementsByTagName("parsererror").length) && J.error("Invalid XML: " + e), t
  };
  var fn, dn, hn = /#.*$/, mn = /([?&])_=[^&]*/, gn = /^(.*?):[ \t]*([^\r\n]*)$/gm, vn = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, yn = /^(?:GET|HEAD)$/, bn = /^\/\//, xn = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/, wn = {}, $n = {}, En = "*/".concat("*");
  try {
    dn = location.href
  } catch (Sn) {
    dn = Q.createElement("a"), dn.href = "", dn = dn.href
  }
  fn = xn.exec(dn.toLowerCase()) || [], J.extend({
    active: 0,
    lastModified: {},
    etag: {},
    ajaxSettings: {
      url: dn,
      type: "GET",
      isLocal: vn.test(fn[1]),
      global: !0,
      processData: !0,
      async: !0,
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      accepts: {
        "*": En,
        text: "text/plain",
        html: "text/html",
        xml: "application/xml, text/xml",
        json: "application/json, text/javascript"
      },
      contents: {xml: /xml/, html: /html/, json: /json/},
      responseFields: {xml: "responseXML", text: "responseText", json: "responseJSON"},
      converters: {"* text": String, "text html": !0, "text json": J.parseJSON, "text xml": J.parseXML},
      flatOptions: {url: !0, context: !0}
    },
    ajaxSetup: function (e, t) {
      return t ? L(L(e, J.ajaxSettings), t) : L(J.ajaxSettings, e)
    },
    ajaxPrefilter: R(wn),
    ajaxTransport: R($n),
    ajax: function (e, t) {
      function n(e, t, n, o) {
        var u, c, v, y, x, $ = t;
        2 !== b && (b = 2, s && clearTimeout(s), r = void 0, a = o || "", w.readyState = e > 0 ? 4 : 0, u = e >= 200 && 300 > e || 304 === e, n && (y = j(p, w, n)), y = F(p, y, w, u), u ? (p.ifModified && (x = w.getResponseHeader("Last-Modified"), x && (J.lastModified[i] = x), x = w.getResponseHeader("etag"), x && (J.etag[i] = x)), 204 === e || "HEAD" === p.type ? $ = "nocontent" : 304 === e ? $ = "notmodified" : ($ = y.state, c = y.data, v = y.error, u = !v)) : (v = $, (e || !$) && ($ = "error", 0 > e && (e = 0))), w.status = e, w.statusText = (t || $) + "", u ? h.resolveWith(f, [c, $, w]) : h.rejectWith(f, [w, $, v]), w.statusCode(g), g = void 0, l && d.trigger(u ? "ajaxSuccess" : "ajaxError", [w, p, u ? c : v]), m.fireWith(f, [w, $]), l && (d.trigger("ajaxComplete", [w, p]), --J.active || J.event.trigger("ajaxStop")))
      }

      "object" == typeof e && (t = e, e = void 0), t = t || {};
      var r, i, a, o, s, u, l, c, p = J.ajaxSetup({}, t), f = p.context || p, d = p.context && (f.nodeType || f.jquery) ? J(f) : J.event, h = J.Deferred(), m = J.Callbacks("once memory"), g = p.statusCode || {}, v = {}, y = {}, b = 0, x = "canceled", w = {
        readyState: 0,
        getResponseHeader: function (e) {
          var t;
          if (2 === b) {
            if (!o)for (o = {}; t = gn.exec(a);)o[t[1].toLowerCase()] = t[2];
            t = o[e.toLowerCase()]
          }
          return null == t ? null : t
        },
        getAllResponseHeaders: function () {
          return 2 === b ? a : null
        },
        setRequestHeader: function (e, t) {
          var n = e.toLowerCase();
          return b || (e = y[n] = y[n] || e, v[e] = t), this
        },
        overrideMimeType: function (e) {
          return b || (p.mimeType = e), this
        },
        statusCode: function (e) {
          var t;
          if (e)if (2 > b)for (t in e)g[t] = [g[t], e[t]]; else w.always(e[w.status]);
          return this
        },
        abort: function (e) {
          var t = e || x;
          return r && r.abort(t), n(0, t), this
        }
      };
      if (h.promise(w).complete = m.add, w.success = w.done, w.error = w.fail, p.url = ((e || p.url || dn) + "").replace(hn, "").replace(bn, fn[1] + "//"), p.type = t.method || t.type || p.method || p.type, p.dataTypes = J.trim(p.dataType || "*").toLowerCase().match(dt) || [""], null == p.crossDomain && (u = xn.exec(p.url.toLowerCase()), p.crossDomain = !(!u || u[1] === fn[1] && u[2] === fn[2] && (u[3] || ("http:" === u[1] ? "80" : "443")) === (fn[3] || ("http:" === fn[1] ? "80" : "443")))), p.data && p.processData && "string" != typeof p.data && (p.data = J.param(p.data, p.traditional)), I(wn, p, t, w), 2 === b)return w;
      l = p.global, l && 0 === J.active++ && J.event.trigger("ajaxStart"), p.type = p.type.toUpperCase(), p.hasContent = !yn.test(p.type), i = p.url, p.hasContent || (p.data && (i = p.url += (pn.test(i) ? "&" : "?") + p.data, delete p.data), p.cache === !1 && (p.url = mn.test(i) ? i.replace(mn, "$1_=" + cn++) : i + (pn.test(i) ? "&" : "?") + "_=" + cn++)), p.ifModified && (J.lastModified[i] && w.setRequestHeader("If-Modified-Since", J.lastModified[i]), J.etag[i] && w.setRequestHeader("If-None-Match", J.etag[i])), (p.data && p.hasContent && p.contentType !== !1 || t.contentType) && w.setRequestHeader("Content-Type", p.contentType), w.setRequestHeader("Accept", p.dataTypes[0] && p.accepts[p.dataTypes[0]] ? p.accepts[p.dataTypes[0]] + ("*" !== p.dataTypes[0] ? ", " + En + "; q=0.01" : "") : p.accepts["*"]);
      for (c in p.headers)w.setRequestHeader(c, p.headers[c]);
      if (p.beforeSend && (p.beforeSend.call(f, w, p) === !1 || 2 === b))return w.abort();
      x = "abort";
      for (c in{success: 1, error: 1, complete: 1})w[c](p[c]);
      if (r = I($n, p, t, w)) {
        w.readyState = 1, l && d.trigger("ajaxSend", [w, p]), p.async && p.timeout > 0 && (s = setTimeout(function () {
          w.abort("timeout")
        }, p.timeout));
        try {
          b = 1, r.send(v, n)
        } catch ($) {
          if (!(2 > b))throw $;
          n(-1, $)
        }
      } else n(-1, "No Transport");
      return w
    },
    getJSON: function (e, t, n) {
      return J.get(e, t, n, "json")
    },
    getScript: function (e, t) {
      return J.get(e, void 0, t, "script")
    }
  }), J.each(["get", "post"], function (e, t) {
    J[t] = function (e, n, r, i) {
      return J.isFunction(n) && (i = i || r, r = n, n = void 0), J.ajax({
        url: e,
        type: t,
        dataType: i,
        data: n,
        success: r
      })
    }
  }), J.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (e, t) {
    J.fn[t] = function (e) {
      return this.on(t, e)
    }
  }), J._evalUrl = function (e) {
    return J.ajax({url: e, type: "GET", dataType: "script", async: !1, global: !1, "throws": !0})
  }, J.fn.extend({
    wrapAll: function (e) {
      var t;
      return J.isFunction(e) ? this.each(function (t) {
        J(this).wrapAll(e.call(this, t))
      }) : (this[0] && (t = J(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function () {
        for (var e = this; e.firstElementChild;)e = e.firstElementChild;
        return e
      }).append(this)), this)
    }, wrapInner: function (e) {
      return this.each(J.isFunction(e) ? function (t) {
        J(this).wrapInner(e.call(this, t))
      } : function () {
        var t = J(this), n = t.contents();
        n.length ? n.wrapAll(e) : t.append(e)
      })
    }, wrap: function (e) {
      var t = J.isFunction(e);
      return this.each(function (n) {
        J(this).wrapAll(t ? e.call(this, n) : e)
      })
    }, unwrap: function () {
      return this.parent().each(function () {
        J.nodeName(this, "body") || J(this).replaceWith(this.childNodes)
      }).end()
    }
  }), J.expr.filters.hidden = function (e) {
    return e.offsetWidth <= 0 && e.offsetHeight <= 0
  }, J.expr.filters.visible = function (e) {
    return !J.expr.filters.hidden(e)
  };
  var Tn = /%20/g, Cn = /\[\]$/, kn = /\r?\n/g, An = /^(?:submit|button|image|reset|file)$/i, _n = /^(?:input|select|textarea|keygen)/i;
  J.param = function (e, t) {
    var n, r = [], i = function (e, t) {
      t = J.isFunction(t) ? t() : null == t ? "" : t, r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
    };
    if (void 0 === t && (t = J.ajaxSettings && J.ajaxSettings.traditional), J.isArray(e) || e.jquery && !J.isPlainObject(e))J.each(e, function () {
      i(this.name, this.value)
    }); else for (n in e)B(n, e[n], t, i);
    return r.join("&").replace(Tn, "+")
  }, J.fn.extend({
    serialize: function () {
      return J.param(this.serializeArray())
    }, serializeArray: function () {
      return this.map(function () {
        var e = J.prop(this, "elements");
        return e ? J.makeArray(e) : this
      }).filter(function () {
        var e = this.type;
        return this.name && !J(this).is(":disabled") && _n.test(this.nodeName) && !An.test(e) && (this.checked || !St.test(e))
      }).map(function (e, t) {
        var n = J(this).val();
        return null == n ? null : J.isArray(n) ? J.map(n, function (e) {
          return {name: t.name, value: e.replace(kn, "\r\n")}
        }) : {name: t.name, value: n.replace(kn, "\r\n")}
      }).get()
    }
  }), J.ajaxSettings.xhr = function () {
    try {
      return new XMLHttpRequest
    } catch (e) {
    }
  };
  var Dn = 0, Mn = {}, On = {0: 200, 1223: 204}, Nn = J.ajaxSettings.xhr();
  e.ActiveXObject && J(e).on("unload", function () {
    for (var e in Mn)Mn[e]()
  }), K.cors = !!Nn && "withCredentials"in Nn, K.ajax = Nn = !!Nn, J.ajaxTransport(function (e) {
    var t;
    return K.cors || Nn && !e.crossDomain ? {
      send: function (n, r) {
        var i, a = e.xhr(), o = ++Dn;
        if (a.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields)for (i in e.xhrFields)a[i] = e.xhrFields[i];
        e.mimeType && a.overrideMimeType && a.overrideMimeType(e.mimeType), e.crossDomain || n["X-Requested-With"] || (n["X-Requested-With"] = "XMLHttpRequest");
        for (i in n)a.setRequestHeader(i, n[i]);
        t = function (e) {
          return function () {
            t && (delete Mn[o], t = a.onload = a.onerror = null, "abort" === e ? a.abort() : "error" === e ? r(a.status, a.statusText) : r(On[a.status] || a.status, a.statusText, "string" == typeof a.responseText ? {text: a.responseText} : void 0, a.getAllResponseHeaders()))
          }
        }, a.onload = t(), a.onerror = t("error"), t = Mn[o] = t("abort");
        try {
          a.send(e.hasContent && e.data || null)
        } catch (s) {
          if (t)throw s
        }
      }, abort: function () {
        t && t()
      }
    } : void 0
  }), J.ajaxSetup({
    accepts: {script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},
    contents: {script: /(?:java|ecma)script/},
    converters: {
      "text script": function (e) {
        return J.globalEval(e), e
      }
    }
  }), J.ajaxPrefilter("script", function (e) {
    void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET")
  }), J.ajaxTransport("script", function (e) {
    if (e.crossDomain) {
      var t, n;
      return {
        send: function (r, i) {
          t = J("<script>").prop({async: !0, charset: e.scriptCharset, src: e.url}).on("load error", n = function (e) {
            t.remove(), n = null, e && i("error" === e.type ? 404 : 200, e.type)
          }), Q.head.appendChild(t[0])
        }, abort: function () {
          n && n()
        }
      }
    }
  });
  var Pn = [], Rn = /(=)\?(?=&|$)|\?\?/;
  J.ajaxSetup({
    jsonp: "callback", jsonpCallback: function () {
      var e = Pn.pop() || J.expando + "_" + cn++;
      return this[e] = !0, e
    }
  }), J.ajaxPrefilter("json jsonp", function (t, n, r) {
    var i, a, o, s = t.jsonp !== !1 && (Rn.test(t.url) ? "url" : "string" == typeof t.data && !(t.contentType || "").indexOf("application/x-www-form-urlencoded") && Rn.test(t.data) && "data");
    return s || "jsonp" === t.dataTypes[0] ? (i = t.jsonpCallback = J.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, s ? t[s] = t[s].replace(Rn, "$1" + i) : t.jsonp !== !1 && (t.url += (pn.test(t.url) ? "&" : "?") + t.jsonp + "=" + i), t.converters["script json"] = function () {
      return o || J.error(i + " was not called"), o[0]
    }, t.dataTypes[0] = "json", a = e[i], e[i] = function () {
      o = arguments
    }, r.always(function () {
      e[i] = a, t[i] && (t.jsonpCallback = n.jsonpCallback, Pn.push(i)), o && J.isFunction(a) && a(o[0]), o = a = void 0
    }), "script") : void 0
  }), J.parseHTML = function (e, t, n) {
    if (!e || "string" != typeof e)return null;
    "boolean" == typeof t && (n = t, t = !1), t = t || Q;
    var r = ot.exec(e), i = !n && [];
    return r ? [t.createElement(r[1])] : (r = J.buildFragment([e], t, i), i && i.length && J(i).remove(), J.merge([], r.childNodes))
  };
  var In = J.fn.load;
  J.fn.load = function (e, t, n) {
    if ("string" != typeof e && In)return In.apply(this, arguments);
    var r, i, a, o = this, s = e.indexOf(" ");
    return s >= 0 && (r = J.trim(e.slice(s)), e = e.slice(0, s)), J.isFunction(t) ? (n = t, t = void 0) : t && "object" == typeof t && (i = "POST"), o.length > 0 && J.ajax({
      url: e,
      type: i,
      dataType: "html",
      data: t
    }).done(function (e) {
      a = arguments, o.html(r ? J("<div>").append(J.parseHTML(e)).find(r) : e)
    }).complete(n && function (e, t) {
        o.each(n, a || [e.responseText, t, e])
      }), this
  }, J.expr.filters.animated = function (e) {
    return J.grep(J.timers, function (t) {
      return e === t.elem
    }).length
  };
  var Ln = e.document.documentElement;
  J.offset = {
    setOffset: function (e, t, n) {
      var r, i, a, o, s, u, l, c = J.css(e, "position"), p = J(e), f = {};
      "static" === c && (e.style.position = "relative"), s = p.offset(), a = J.css(e, "top"), u = J.css(e, "left"), l = ("absolute" === c || "fixed" === c) && (a + u).indexOf("auto") > -1, l ? (r = p.position(), o = r.top, i = r.left) : (o = parseFloat(a) || 0, i = parseFloat(u) || 0), J.isFunction(t) && (t = t.call(e, n, s)), null != t.top && (f.top = t.top - s.top + o), null != t.left && (f.left = t.left - s.left + i), "using"in t ? t.using.call(e, f) : p.css(f)
    }
  }, J.fn.extend({
    offset: function (e) {
      if (arguments.length)return void 0 === e ? this : this.each(function (t) {
        J.offset.setOffset(this, e, t)
      });
      var t, n, r = this[0], i = {top: 0, left: 0}, a = r && r.ownerDocument;
      if (a)return t = a.documentElement, J.contains(t, r) ? (typeof r.getBoundingClientRect !== Tt && (i = r.getBoundingClientRect()), n = q(a), {
        top: i.top + n.pageYOffset - t.clientTop,
        left: i.left + n.pageXOffset - t.clientLeft
      }) : i
    }, position: function () {
      if (this[0]) {
        var e, t, n = this[0], r = {top: 0, left: 0};
        return "fixed" === J.css(n, "position") ? t = n.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), J.nodeName(e[0], "html") || (r = e.offset()), r.top += J.css(e[0], "borderTopWidth", !0), r.left += J.css(e[0], "borderLeftWidth", !0)), {
          top: t.top - r.top - J.css(n, "marginTop", !0),
          left: t.left - r.left - J.css(n, "marginLeft", !0)
        }
      }
    }, offsetParent: function () {
      return this.map(function () {
        for (var e = this.offsetParent || Ln; e && !J.nodeName(e, "html") && "static" === J.css(e, "position");)e = e.offsetParent;
        return e || Ln
      })
    }
  }), J.each({scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function (t, n) {
    var r = "pageYOffset" === n;
    J.fn[t] = function (i) {
      return gt(this, function (t, i, a) {
        var o = q(t);
        return void 0 === a ? o ? o[n] : t[i] : void(o ? o.scrollTo(r ? e.pageXOffset : a, r ? a : e.pageYOffset) : t[i] = a)
      }, t, i, arguments.length, null)
    }
  }), J.each(["top", "left"], function (e, t) {
    J.cssHooks[t] = $(K.pixelPosition, function (e, n) {
      return n ? (n = w(e, t), Vt.test(n) ? J(e).position()[t] + "px" : n) : void 0
    })
  }), J.each({Height: "height", Width: "width"}, function (e, t) {
    J.each({padding: "inner" + e, content: t, "": "outer" + e}, function (n, r) {
      J.fn[r] = function (r, i) {
        var a = arguments.length && (n || "boolean" != typeof r), o = n || (r === !0 || i === !0 ? "margin" : "border");
        return gt(this, function (t, n, r) {
          var i;
          return J.isWindow(t) ? t.document.documentElement["client" + e] : 9 === t.nodeType ? (i = t.documentElement, Math.max(t.body["scroll" + e], i["scroll" + e], t.body["offset" + e], i["offset" + e], i["client" + e])) : void 0 === r ? J.css(t, n, o) : J.style(t, n, r, o)
        }, t, a ? r : void 0, a, null)
      }
    })
  }), J.fn.size = function () {
    return this.length
  }, J.fn.andSelf = J.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function () {
    return J
  });
  var jn = e.jQuery, Fn = e.$;
  return J.noConflict = function (t) {
    return e.$ === J && (e.$ = Fn), t && e.jQuery === J && (e.jQuery = jn), J
  }, typeof t === Tt && (e.jQuery = e.$ = J), J
}), function (e, t, n) {
  "use strict";
  function r(e) {
    return function () {
      var t, n, r = arguments[0], i = "[" + (e ? e + ":" : "") + r + "] ", a = arguments[1], o = arguments, s = function (e) {
        return "function" == typeof e ? e.toString().replace(/ \{[\s\S]*$/, "") : "undefined" == typeof e ? "undefined" : "string" != typeof e ? JSON.stringify(e) : e
      };
      for (t = i + a.replace(/\{\d+\}/g, function (e) {
          var t, n = +e.slice(1, -1);
          return n + 2 < o.length ? (t = o[n + 2], "function" == typeof t ? t.toString().replace(/ ?\{[\s\S]*$/, "") : "undefined" == typeof t ? "undefined" : "string" != typeof t ? U(t) : t) : e
        }), t = t + "\nhttp://errors.angularjs.org/1.2.16/" + (e ? e + "/" : "") + r, n = 2; n < arguments.length; n++)t = t + (2 == n ? "?" : "&") + "p" + (n - 2) + "=" + encodeURIComponent(s(arguments[n]));
      return new Error(t)
    }
  }

  function i(e) {
    if (null == e || C(e))return !1;
    var t = e.length;
    return 1 === e.nodeType && t ? !0 : x(e) || E(e) || 0 === t || "number" == typeof t && t > 0 && t - 1 in e
  }

  function a(e, t, n) {
    var r;
    if (e)if (S(e))for (r in e)"prototype" == r || "length" == r || "name" == r || e.hasOwnProperty && !e.hasOwnProperty(r) || t.call(n, e[r], r); else if (e.forEach && e.forEach !== a)e.forEach(t, n); else if (i(e))for (r = 0; r < e.length; r++)t.call(n, e[r], r); else for (r in e)e.hasOwnProperty(r) && t.call(n, e[r], r);
    return e
  }

  function o(e) {
    var t = [];
    for (var n in e)e.hasOwnProperty(n) && t.push(n);
    return t.sort()
  }

  function s(e, t, n) {
    for (var r = o(e), i = 0; i < r.length; i++)t.call(n, e[r[i]], r[i]);
    return r
  }

  function u(e) {
    return function (t, n) {
      e(n, t)
    }
  }

  function l() {
    for (var e, t = Ar.length; t;) {
      if (t--, e = Ar[t].charCodeAt(0), 57 == e)return Ar[t] = "A", Ar.join("");
      if (90 != e)return Ar[t] = String.fromCharCode(e + 1), Ar.join("");
      Ar[t] = "0"
    }
    return Ar.unshift("0"), Ar.join("")
  }

  function c(e, t) {
    t ? e.$$hashKey = t : delete e.$$hashKey
  }

  function p(e) {
    var t = e.$$hashKey;
    return a(arguments, function (t) {
      t !== e && a(t, function (t, n) {
        e[n] = t
      })
    }), c(e, t), e
  }

  function f(e) {
    return parseInt(e, 10)
  }

  function d(e, t) {
    return p(new (p(function () {
    }, {prototype: e})), t)
  }

  function h() {
  }

  function m(e) {
    return e
  }

  function g(e) {
    return function () {
      return e
    }
  }

  function v(e) {
    return "undefined" == typeof e
  }

  function y(e) {
    return "undefined" != typeof e
  }

  function b(e) {
    return null != e && "object" == typeof e
  }

  function x(e) {
    return "string" == typeof e
  }

  function w(e) {
    return "number" == typeof e
  }

  function $(e) {
    return "[object Date]" === Tr.call(e)
  }

  function E(e) {
    return "[object Array]" === Tr.call(e)
  }

  function S(e) {
    return "function" == typeof e
  }

  function T(e) {
    return "[object RegExp]" === Tr.call(e)
  }

  function C(e) {
    return e && e.document && e.location && e.alert && e.setInterval
  }

  function k(e) {
    return e && e.$evalAsync && e.$watch
  }

  function A(e) {
    return "[object File]" === Tr.call(e)
  }

  function _(e) {
    return "[object Blob]" === Tr.call(e)
  }

  function D(e) {
    return !(!e || !(e.nodeName || e.prop && e.attr && e.find))
  }

  function M(e, t, n) {
    var r = [];
    return a(e, function (e, i, a) {
      r.push(t.call(n, e, i, a))
    }), r
  }

  function O(e, t) {
    return -1 != N(e, t)
  }

  function N(e, t) {
    if (e.indexOf)return e.indexOf(t);
    for (var n = 0; n < e.length; n++)if (t === e[n])return n;
    return -1
  }

  function P(e, t) {
    var n = N(e, t);
    return n >= 0 && e.splice(n, 1), t
  }

  function R(e, t) {
    if (C(e) || k(e))throw Cr("cpws", "Can't copy! Making copies of Window or Scope instances is not supported.");
    if (t) {
      if (e === t)throw Cr("cpi", "Can't copy! Source and destination are identical.");
      if (E(e)) {
        t.length = 0;
        for (var n = 0; n < e.length; n++)t.push(R(e[n]))
      } else {
        var r = t.$$hashKey;
        a(t, function (e, n) {
          delete t[n]
        });
        for (var i in e)t[i] = R(e[i]);
        c(t, r)
      }
    } else t = e, e && (E(e) ? t = R(e, []) : $(e) ? t = new Date(e.getTime()) : T(e) ? t = new RegExp(e.source) : b(e) && (t = R(e, {})));
    return t
  }

  function I(e, t) {
    t = t || {};
    for (var n in e)!e.hasOwnProperty(n) || "$" === n.charAt(0) && "$" === n.charAt(1) || (t[n] = e[n]);
    return t
  }

  function L(e, t) {
    if (e === t)return !0;
    if (null === e || null === t)return !1;
    if (e !== e && t !== t)return !0;
    var r, i, a, o = typeof e, s = typeof t;
    if (o == s && "object" == o) {
      if (!E(e)) {
        if ($(e))return $(t) && e.getTime() == t.getTime();
        if (T(e) && T(t))return e.toString() == t.toString();
        if (k(e) || k(t) || C(e) || C(t) || E(t))return !1;
        a = {};
        for (i in e)if ("$" !== i.charAt(0) && !S(e[i])) {
          if (!L(e[i], t[i]))return !1;
          a[i] = !0
        }
        for (i in t)if (!a.hasOwnProperty(i) && "$" !== i.charAt(0) && t[i] !== n && !S(t[i]))return !1;
        return !0
      }
      if (!E(t))return !1;
      if ((r = e.length) == t.length) {
        for (i = 0; r > i; i++)if (!L(e[i], t[i]))return !1;
        return !0
      }
    }
    return !1
  }

  function j() {
    return t.securityPolicy && t.securityPolicy.isActive || t.querySelector && !(!t.querySelector("[ng-csp]") && !t.querySelector("[data-ng-csp]"))
  }

  function F(e, t, n) {
    return e.concat(Er.call(t, n))
  }

  function B(e, t) {
    return Er.call(e, t || 0)
  }

  function q(e, t) {
    var n = arguments.length > 2 ? B(arguments, 2) : [];
    return !S(t) || t instanceof RegExp ? t : n.length ? function () {
      return arguments.length ? t.apply(e, n.concat(Er.call(arguments, 0))) : t.apply(e, n)
    } : function () {
      return arguments.length ? t.apply(e, arguments) : t.call(e)
    }
  }

  function V(e, r) {
    var i = r;
    return "string" == typeof e && "$" === e.charAt(0) ? i = n : C(r) ? i = "$WINDOW" : r && t === r ? i = "$DOCUMENT" : k(r) && (i = "$SCOPE"), i
  }

  function U(e, t) {
    return "undefined" == typeof e ? n : JSON.stringify(e, V, t ? "  " : null)
  }

  function H(e) {
    return x(e) ? JSON.parse(e) : e
  }

  function W(e) {
    if ("function" == typeof e)e = !0; else if (e && 0 !== e.length) {
      var t = dr("" + e);
      e = !("f" == t || "0" == t || "false" == t || "no" == t || "n" == t || "[]" == t)
    } else e = !1;
    return e
  }

  function Y(e) {
    e = br(e).clone();
    try {
      e.empty()
    } catch (t) {
    }
    var n = 3, r = br("<div>").append(e).html();
    try {
      return e[0].nodeType === n ? dr(r) : r.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/, function (e, t) {
        return "<" + dr(t)
      })
    } catch (t) {
      return dr(r)
    }
  }

  function z(e) {
    try {
      return decodeURIComponent(e)
    } catch (t) {
    }
  }

  function G(e) {
    var t, n, r = {};
    return a((e || "").split("&"), function (e) {
      if (e && (t = e.split("="), n = z(t[0]), y(n))) {
        var i = y(t[1]) ? z(t[1]) : !0;
        r[n] ? E(r[n]) ? r[n].push(i) : r[n] = [r[n], i] : r[n] = i
      }
    }), r
  }

  function X(e) {
    var t = [];
    return a(e, function (e, n) {
      E(e) ? a(e, function (e) {
        t.push(Q(n, !0) + (e === !0 ? "" : "=" + Q(e, !0)))
      }) : t.push(Q(n, !0) + (e === !0 ? "" : "=" + Q(e, !0)))
    }), t.length ? t.join("&") : ""
  }

  function K(e) {
    return Q(e, !0).replace(/%26/gi, "&").replace(/%3D/gi, "=").replace(/%2B/gi, "+")
  }

  function Q(e, t) {
    return encodeURIComponent(e).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, t ? "%20" : "+")
  }

  function Z(e, n) {
    function r(e) {
      e && s.push(e)
    }

    var i, o, s = [e], u = ["ng:app", "ng-app", "x-ng-app", "data-ng-app"], l = /\sng[:\-]app(:\s*([\w\d_]+);?)?\s/;
    a(u, function (n) {
      u[n] = !0, r(t.getElementById(n)), n = n.replace(":", "\\:"), e.querySelectorAll && (a(e.querySelectorAll("." + n), r), a(e.querySelectorAll("." + n + "\\:"), r), a(e.querySelectorAll("[" + n + "]"), r))
    }), a(s, function (e) {
      if (!i) {
        var t = " " + e.className + " ", n = l.exec(t);
        n ? (i = e, o = (n[2] || "").replace(/\s+/g, ",")) : a(e.attributes, function (t) {
          !i && u[t.name] && (i = e, o = t.value)
        })
      }
    }), i && n(i, o ? [o] : [])
  }

  function J(n, r) {
    var i = function () {
      if (n = br(n), n.injector()) {
        var e = n[0] === t ? "document" : Y(n);
        throw Cr("btstrpd", "App Already Bootstrapped with this Element '{0}'", e)
      }
      r = r || [], r.unshift(["$provide", function (e) {
        e.value("$rootElement", n)
      }]), r.unshift("ng");
      var i = Pt(r);
      return i.invoke(["$rootScope", "$rootElement", "$compile", "$injector", "$animate", function (e, t, n, r) {
        e.$apply(function () {
          t.data("$injector", r), n(t)(e)
        })
      }]), i
    }, o = /^NG_DEFER_BOOTSTRAP!/;
    return e && !o.test(e.name) ? i() : (e.name = e.name.replace(o, ""), void(kr.resumeBootstrap = function (e) {
      a(e, function (e) {
        r.push(e)
      }), i()
    }))
  }

  function et(e, t) {
    return t = t || "_", e.replace(Dr, function (e, n) {
      return (n ? t : "") + e.toLowerCase()
    })
  }

  function tt() {
    xr = e.jQuery, xr ? (br = xr, p(xr.fn, {
      scope: Wr.scope,
      isolateScope: Wr.isolateScope,
      controller: Wr.controller,
      injector: Wr.injector,
      inheritedData: Wr.inheritedData
    }), pt("remove", !0, !0, !1), pt("empty", !1, !1, !1), pt("html", !1, !1, !0)) : br = mt, kr.element = br
  }

  function nt(e, t, n) {
    if (!e)throw Cr("areq", "Argument '{0}' is {1}", t || "?", n || "required");
    return e
  }

  function rt(e, t, n) {
    return n && E(e) && (e = e[e.length - 1]), nt(S(e), t, "not a function, got " + (e && "object" == typeof e ? e.constructor.name || "Object" : typeof e)), e
  }

  function it(e, t) {
    if ("hasOwnProperty" === e)throw Cr("badname", "hasOwnProperty is not a valid {0} name", t)
  }

  function at(e, t, n) {
    if (!t)return e;
    for (var r, i = t.split("."), a = e, o = i.length, s = 0; o > s; s++)r = i[s], e && (e = (a = e)[r]);
    return !n && S(e) ? q(a, e) : e
  }

  function ot(e) {
    var t = e[0], n = e[e.length - 1];
    if (t === n)return br(t);
    var r = t, i = [r];
    do {
      if (r = r.nextSibling, !r)break;
      i.push(r)
    } while (r !== n);
    return br(i)
  }

  function st(e) {
    function t(e, t, n) {
      return e[t] || (e[t] = n())
    }

    var n = r("$injector"), i = r("ng"), a = t(e, "angular", Object);
    return a.$$minErr = a.$$minErr || r, t(a, "module", function () {
      var e = {};
      return function (r, a, o) {
        var s = function (e, t) {
          if ("hasOwnProperty" === e)throw i("badname", "hasOwnProperty is not a valid {0} name", t)
        };
        return s(r, "module"), a && e.hasOwnProperty(r) && (e[r] = null), t(e, r, function () {
          function e(e, n, r) {
            return function () {
              return t[r || "push"]([e, n, arguments]), u
            }
          }

          if (!a)throw n("nomod", "Module '{0}' is not available! You either misspelled the module name or forgot to load it. If registering a module ensure that you specify the dependencies as the second argument.", r);
          var t = [], i = [], s = e("$injector", "invoke"), u = {
            _invokeQueue: t,
            _runBlocks: i,
            requires: a,
            name: r,
            provider: e("$provide", "provider"),
            factory: e("$provide", "factory"),
            service: e("$provide", "service"),
            value: e("$provide", "value"),
            constant: e("$provide", "constant", "unshift"),
            animation: e("$animateProvider", "register"),
            filter: e("$filterProvider", "register"),
            controller: e("$controllerProvider", "register"),
            directive: e("$compileProvider", "directive"),
            config: s,
            run: function (e) {
              return i.push(e), this
            }
          };
          return o && s(o), u
        })
      }
    })
  }

  function ut(t) {
    p(t, {
      bootstrap: J,
      copy: R,
      extend: p,
      equals: L,
      element: br,
      forEach: a,
      injector: Pt,
      noop: h,
      bind: q,
      toJson: U,
      fromJson: H,
      identity: m,
      isUndefined: v,
      isDefined: y,
      isString: x,
      isFunction: S,
      isObject: b,
      isNumber: w,
      isElement: D,
      isArray: E,
      version: Mr,
      isDate: $,
      lowercase: dr,
      uppercase: mr,
      callbacks: {counter: 0},
      $$minErr: r,
      $$csp: j
    }), wr = st(e);
    try {
      wr("ngLocale")
    } catch (n) {
      wr("ngLocale", []).provider("$locale", rn)
    }
    wr("ng", ["ngLocale"], ["$provide", function (e) {
      e.provider({$$sanitizeUri: Mn}), e.provider("$compile", qt).directive({
        a: Ti,
        input: Ri,
        textarea: Ri,
        form: _i,
        script: ga,
        select: ba,
        style: wa,
        option: xa,
        ngBind: zi,
        ngBindHtml: Xi,
        ngBindTemplate: Gi,
        ngClass: Ki,
        ngClassEven: Zi,
        ngClassOdd: Qi,
        ngCloak: Ji,
        ngController: ea,
        ngForm: Di,
        ngHide: ca,
        ngIf: na,
        ngInclude: ra,
        ngInit: aa,
        ngNonBindable: oa,
        ngPluralize: sa,
        ngRepeat: ua,
        ngShow: la,
        ngStyle: pa,
        ngSwitch: fa,
        ngSwitchWhen: da,
        ngSwitchDefault: ha,
        ngOptions: ya,
        ngTransclude: ma,
        ngModel: qi,
        ngList: Hi,
        ngChange: Vi,
        required: Ui,
        ngRequired: Ui,
        ngValue: Yi
      }).directive({ngInclude: ia}).directive(Ci).directive(ta), e.provider({
        $anchorScroll: Rt,
        $animate: ei,
        $browser: jt,
        $cacheFactory: Ft,
        $controller: Ht,
        $document: Wt,
        $exceptionHandler: Yt,
        $filter: Vn,
        $interpolate: tn,
        $interval: nn,
        $http: Qt,
        $httpBackend: Jt,
        $location: vn,
        $log: yn,
        $parse: Cn,
        $rootScope: Dn,
        $q: kn,
        $sce: In,
        $sceDelegate: Rn,
        $sniffer: Ln,
        $templateCache: Bt,
        $timeout: jn,
        $window: qn,
        $$rAF: _n,
        $$asyncCallback: It
      })
    }])
  }

  function lt() {
    return ++Pr
  }

  function ct(e) {
    return e.replace(Lr, function (e, t, n, r) {
      return r ? n.toUpperCase() : n
    }).replace(jr, "Moz$1")
  }

  function pt(e, t, n, r) {
    function i(e) {
      var i, o, s, u, l, c, p, f = n && e ? [this.filter(e)] : [this], d = t;
      if (!r || null != e)for (; f.length;)for (i = f.shift(), o = 0, s = i.length; s > o; o++)for (u = br(i[o]), d ? u.triggerHandler("$destroy") : d = !d, l = 0, c = (p = u.children()).length; c > l; l++)f.push(xr(p[l]));
      return a.apply(this, arguments)
    }

    var a = xr.fn[e];
    a = a.$original || a, i.$original = a, xr.fn[e] = i
  }

  function ft(e) {
    return !qr.test(e)
  }

  function dt(e, t) {
    var n, r, i, a, o, s, u = t.createDocumentFragment(), l = [];
    if (ft(e))l.push(t.createTextNode(e)); else {
      for (n = u.appendChild(t.createElement("div")), r = (Vr.exec(e) || ["", ""])[1].toLowerCase(), i = Hr[r] || Hr._default, n.innerHTML = "<div>&#160;</div>" + i[1] + e.replace(Ur, "<$1></$2>") + i[2], n.removeChild(n.firstChild), a = i[0]; a--;)n = n.lastChild;
      for (o = 0, s = n.childNodes.length; s > o; ++o)l.push(n.childNodes[o]);
      n = u.firstChild, n.textContent = ""
    }
    return u.textContent = "", u.innerHTML = "", l
  }

  function ht(e, n) {
    n = n || t;
    var r;
    return (r = Br.exec(e)) ? [n.createElement(r[1])] : dt(e, n)
  }

  function mt(e) {
    if (e instanceof mt)return e;
    if (x(e) && (e = _r(e)), !(this instanceof mt)) {
      if (x(e) && "<" != e.charAt(0))throw Fr("nosel", "Looking up elements via selectors is not supported by jqLite! See: http://docs.angularjs.org/api/angular.element");
      return new mt(e)
    }
    if (x(e)) {
      Tt(this, ht(e));
      var n = br(t.createDocumentFragment());
      n.append(this)
    } else Tt(this, e)
  }

  function gt(e) {
    return e.cloneNode(!0)
  }

  function vt(e) {
    bt(e);
    for (var t = 0, n = e.childNodes || []; t < n.length; t++)vt(n[t])
  }

  function yt(e, t, n, r) {
    if (y(r))throw Fr("offargs", "jqLite#off() does not support the `selector` argument");
    var i = xt(e, "events"), o = xt(e, "handle");
    o && (v(t) ? a(i, function (t, n) {
      Ir(e, n, t), delete i[n]
    }) : a(t.split(" "), function (t) {
      v(n) ? (Ir(e, t, i[t]), delete i[t]) : P(i[t] || [], n)
    }))
  }

  function bt(e, t) {
    var r = e[Nr], i = Or[r];
    if (i) {
      if (t)return void delete Or[r].data[t];
      i.handle && (i.events.$destroy && i.handle({}, "$destroy"), yt(e)), delete Or[r], e[Nr] = n
    }
  }

  function xt(e, t, n) {
    var r = e[Nr], i = Or[r || -1];
    return y(n) ? (i || (e[Nr] = r = lt(), i = Or[r] = {}), void(i[t] = n)) : i && i[t]
  }

  function wt(e, t, n) {
    var r = xt(e, "data"), i = y(n), a = !i && y(t), o = a && !b(t);
    if (r || o || xt(e, "data", r = {}), i)r[t] = n; else {
      if (!a)return r;
      if (o)return r && r[t];
      p(r, t)
    }
  }

  function $t(e, t) {
    return e.getAttribute ? (" " + (e.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").indexOf(" " + t + " ") > -1 : !1
  }

  function Et(e, t) {
    t && e.setAttribute && a(t.split(" "), function (t) {
      e.setAttribute("class", _r((" " + (e.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").replace(" " + _r(t) + " ", " ")))
    })
  }

  function St(e, t) {
    if (t && e.setAttribute) {
      var n = (" " + (e.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ");
      a(t.split(" "), function (e) {
        e = _r(e), -1 === n.indexOf(" " + e + " ") && (n += e + " ")
      }), e.setAttribute("class", _r(n))
    }
  }

  function Tt(e, t) {
    if (t) {
      t = t.nodeName || !y(t.length) || C(t) ? [t] : t;
      for (var n = 0; n < t.length; n++)e.push(t[n])
    }
  }

  function Ct(e, t) {
    return kt(e, "$" + (t || "ngController") + "Controller")
  }

  function kt(e, t, r) {
    e = br(e), 9 == e[0].nodeType && (e = e.find("html"));
    for (var i = E(t) ? t : [t]; e.length;) {
      for (var a = e[0], o = 0, s = i.length; s > o; o++)if ((r = e.data(i[o])) !== n)return r;
      e = br(a.parentNode || 11 === a.nodeType && a.host)
    }
  }

  function At(e) {
    for (var t = 0, n = e.childNodes; t < n.length; t++)vt(n[t]);
    for (; e.firstChild;)e.removeChild(e.firstChild)
  }

  function _t(e, t) {
    var n = Yr[t.toLowerCase()];
    return n && zr[e.nodeName] && n
  }

  function Dt(e, n) {
    var r = function (r, i) {
      if (r.preventDefault || (r.preventDefault = function () {
          r.returnValue = !1
        }), r.stopPropagation || (r.stopPropagation = function () {
          r.cancelBubble = !0
        }), r.target || (r.target = r.srcElement || t), v(r.defaultPrevented)) {
        var o = r.preventDefault;
        r.preventDefault = function () {
          r.defaultPrevented = !0, o.call(r)
        }, r.defaultPrevented = !1
      }
      r.isDefaultPrevented = function () {
        return r.defaultPrevented || r.returnValue === !1
      };
      var s = I(n[i || r.type] || []);
      a(s, function (t) {
        t.call(e, r)
      }), 8 >= yr ? (r.preventDefault = null, r.stopPropagation = null, r.isDefaultPrevented = null) : (delete r.preventDefault, delete r.stopPropagation, delete r.isDefaultPrevented)
    };
    return r.elem = e, r
  }

  function Mt(e) {
    var t, r = typeof e;
    return "object" == r && null !== e ? "function" == typeof(t = e.$$hashKey) ? t = e.$$hashKey() : t === n && (t = e.$$hashKey = l()) : t = e, r + ":" + t
  }

  function Ot(e) {
    a(e, this.put, this)
  }

  function Nt(e) {
    var t, n, r, i;
    return "function" == typeof e ? (t = e.$inject) || (t = [], e.length && (n = e.toString().replace(Qr, ""), r = n.match(Gr), a(r[1].split(Xr), function (e) {
      e.replace(Kr, function (e, n, r) {
        t.push(r)
      })
    })), e.$inject = t) : E(e) ? (i = e.length - 1, rt(e[i], "fn"), t = e.slice(0, i)) : rt(e, "fn", !0), t
  }

  function Pt(e) {
    function t(e) {
      return function (t, n) {
        return b(t) ? void a(t, u(e)) : e(t, n)
      }
    }

    function n(e, t) {
      if (it(e, "service"), (S(t) || E(t)) && (t = w.instantiate(t)), !t.$get)throw Zr("pget", "Provider '{0}' must define $get factory method.", e);
      return y[e + d] = t
    }

    function r(e, t) {
      return n(e, {$get: t})
    }

    function i(e, t) {
      return r(e, ["$injector", function (e) {
        return e.instantiate(t)
      }])
    }

    function o(e, t) {
      return r(e, g(t))
    }

    function s(e, t) {
      it(e, "constant"), y[e] = t, $[e] = t
    }

    function l(e, t) {
      var n = w.get(e + d), r = n.$get;
      n.$get = function () {
        var e = T.invoke(r, n);
        return T.invoke(t, null, {$delegate: e})
      }
    }

    function c(e) {
      var t, n, r, i, o = [];
      return a(e, function (e) {
        if (!v.get(e)) {
          v.put(e, !0);
          try {
            if (x(e))for (t = wr(e), o = o.concat(c(t.requires)).concat(t._runBlocks), n = t._invokeQueue, r = 0, i = n.length; i > r; r++) {
              var a = n[r], s = w.get(a[0]);
              s[a[1]].apply(s, a[2])
            } else S(e) ? o.push(w.invoke(e)) : E(e) ? o.push(w.invoke(e)) : rt(e, "module")
          } catch (u) {
            throw E(e) && (e = e[e.length - 1]), u.message && u.stack && -1 == u.stack.indexOf(u.message) && (u = u.message + "\n" + u.stack), Zr("modulerr", "Failed to instantiate module {0} due to:\n{1}", e, u.stack || u.message || u)
          }
        }
      }), o
    }

    function p(e, t) {
      function n(n) {
        if (e.hasOwnProperty(n)) {
          if (e[n] === f)throw Zr("cdep", "Circular dependency found: {0}", m.join(" <- "));
          return e[n]
        }
        try {
          return m.unshift(n), e[n] = f, e[n] = t(n)
        } catch (r) {
          throw e[n] === f && delete e[n], r
        } finally {
          m.shift()
        }
      }

      function r(e, t, r) {
        var i, a, o, s = [], u = Nt(e);
        for (a = 0, i = u.length; i > a; a++) {
          if (o = u[a], "string" != typeof o)throw Zr("itkn", "Incorrect injection token! Expected service name as string, got {0}", o);
          s.push(r && r.hasOwnProperty(o) ? r[o] : n(o))
        }
        return e.$inject || (e = e[i]), e.apply(t, s)
      }

      function i(e, t) {
        var n, i, a = function () {
        };
        return a.prototype = (E(e) ? e[e.length - 1] : e).prototype, n = new a, i = r(e, n, t), b(i) || S(i) ? i : n
      }

      return {
        invoke: r, instantiate: i, get: n, annotate: Nt, has: function (t) {
          return y.hasOwnProperty(t + d) || e.hasOwnProperty(t)
        }
      }
    }

    var f = {}, d = "Provider", m = [], v = new Ot, y = {
      $provide: {
        provider: t(n),
        factory: t(r),
        service: t(i),
        value: t(o),
        constant: t(s),
        decorator: l
      }
    }, w = y.$injector = p(y, function () {
      throw Zr("unpr", "Unknown provider: {0}", m.join(" <- "))
    }), $ = {}, T = $.$injector = p($, function (e) {
      var t = w.get(e + d);
      return T.invoke(t.$get, t)
    });
    return a(c(e), function (e) {
      T.invoke(e || h)
    }), T
  }

  function Rt() {
    var e = !0;
    this.disableAutoScrolling = function () {
      e = !1
    }, this.$get = ["$window", "$location", "$rootScope", function (t, n, r) {
      function i(e) {
        var t = null;
        return a(e, function (e) {
          t || "a" !== dr(e.nodeName) || (t = e)
        }), t
      }

      function o() {
        var e, r = n.hash();
        r ? (e = s.getElementById(r)) ? e.scrollIntoView() : (e = i(s.getElementsByName(r))) ? e.scrollIntoView() : "top" === r && t.scrollTo(0, 0) : t.scrollTo(0, 0)
      }

      var s = t.document;
      return e && r.$watch(function () {
        return n.hash()
      }, function () {
        r.$evalAsync(o)
      }), o
    }]
  }

  function It() {
    this.$get = ["$$rAF", "$timeout", function (e, t) {
      return e.supported ? function (t) {
        return e(t)
      } : function (e) {
        return t(e, 0, !1)
      }
    }]
  }

  function Lt(e, t, r, i) {
    function o(e) {
      try {
        e.apply(null, B(arguments, 1))
      } finally {
        if (y--, 0 === y)for (; b.length;)try {
          b.pop()()
        } catch (t) {
          r.error(t)
        }
      }
    }

    function s(e, t) {
      !function n() {
        a($, function (e) {
          e()
        }), w = t(n, e)
      }()
    }

    function u() {
      T = null, E != l.url() && (E = l.url(), a(C, function (e) {
        e(l.url())
      }))
    }

    var l = this, c = t[0], p = e.location, f = e.history, d = e.setTimeout, m = e.clearTimeout, g = {};
    l.isMock = !1;
    var y = 0, b = [];
    l.$$completeOutstandingRequest = o, l.$$incOutstandingRequestCount = function () {
      y++
    }, l.notifyWhenNoOutstandingRequests = function (e) {
      a($, function (e) {
        e()
      }), 0 === y ? e() : b.push(e)
    };
    var w, $ = [];
    l.addPollFn = function (e) {
      return v(w) && s(100, d), $.push(e), e
    };
    var E = p.href, S = t.find("base"), T = null;
    l.url = function (t, n) {
      if (p !== e.location && (p = e.location), f !== e.history && (f = e.history), t) {
        if (E == t)return;
        return E = t, i.history ? n ? f.replaceState(null, "", t) : (f.pushState(null, "", t), S.attr("href", S.attr("href"))) : (T = t, n ? p.replace(t) : p.href = t), l
      }
      return T || p.href.replace(/%27/g, "'")
    };
    var C = [], k = !1;
    l.onUrlChange = function (t) {
      return k || (i.history && br(e).on("popstate", u), i.hashchange ? br(e).on("hashchange", u) : l.addPollFn(u), k = !0), C.push(t), t
    }, l.baseHref = function () {
      var e = S.attr("href");
      return e ? e.replace(/^(https?\:)?\/\/[^\/]*/, "") : ""
    };
    var A = {}, _ = "", D = l.baseHref();
    l.cookies = function (e, t) {
      var i, a, o, s, u;
      if (!e) {
        if (c.cookie !== _)for (_ = c.cookie, a = _.split("; "), A = {}, s = 0; s < a.length; s++)o = a[s], u = o.indexOf("="), u > 0 && (e = unescape(o.substring(0, u)), A[e] === n && (A[e] = unescape(o.substring(u + 1))));
        return A
      }
      t === n ? c.cookie = escape(e) + "=;path=" + D + ";expires=Thu, 01 Jan 1970 00:00:00 GMT" : x(t) && (i = (c.cookie = escape(e) + "=" + escape(t) + ";path=" + D).length + 1, i > 4096 && r.warn("Cookie '" + e + "' possibly not set or overflowed because it was too large (" + i + " > 4096 bytes)!"))
    }, l.defer = function (e, t) {
      var n;
      return y++, n = d(function () {
        delete g[n], o(e)
      }, t || 0), g[n] = !0, n
    }, l.defer.cancel = function (e) {
      return g[e] ? (delete g[e], m(e), o(h), !0) : !1
    }
  }

  function jt() {
    this.$get = ["$window", "$log", "$sniffer", "$document", function (e, t, n, r) {
      return new Lt(e, r, t, n)
    }]
  }

  function Ft() {
    this.$get = function () {
      function e(e, n) {
        function i(e) {
          e != f && (d ? d == e && (d = e.n) : d = e, a(e.n, e.p), a(e, f), f = e, f.n = null)
        }

        function a(e, t) {
          e != t && (e && (e.p = t), t && (t.n = e))
        }

        if (e in t)throw r("$cacheFactory")("iid", "CacheId '{0}' is already taken!", e);
        var o = 0, s = p({}, n, {id: e}), u = {}, l = n && n.capacity || Number.MAX_VALUE, c = {}, f = null, d = null;
        return t[e] = {
          put: function (e, t) {
            if (l < Number.MAX_VALUE) {
              var n = c[e] || (c[e] = {key: e});
              i(n)
            }
            if (!v(t))return e in u || o++, u[e] = t, o > l && this.remove(d.key), t
          }, get: function (e) {
            if (l < Number.MAX_VALUE) {
              var t = c[e];
              if (!t)return;
              i(t)
            }
            return u[e]
          }, remove: function (e) {
            if (l < Number.MAX_VALUE) {
              var t = c[e];
              if (!t)return;
              t == f && (f = t.p), t == d && (d = t.n), a(t.n, t.p), delete c[e]
            }
            delete u[e], o--
          }, removeAll: function () {
            u = {}, o = 0, c = {}, f = d = null
          }, destroy: function () {
            u = null, s = null, c = null, delete t[e]
          }, info: function () {
            return p({}, s, {size: o})
          }
        }
      }

      var t = {};
      return e.info = function () {
        var e = {};
        return a(t, function (t, n) {
          e[n] = t.info()
        }), e
      }, e.get = function (e) {
        return t[e]
      }, e
    }
  }

  function Bt() {
    this.$get = ["$cacheFactory", function (e) {
      return e("templates")
    }]
  }

  function qt(e, r) {
    var i = {}, o = "Directive", s = /^\s*directive\:\s*([\d\w\-_]+)\s+(.*)$/, l = /(([\d\w\-_]+)(?:\:([^;]+))?;?)/, c = /^(on[a-z]+|formaction)$/;
    this.directive = function f(t, n) {
      return it(t, "directive"), x(t) ? (nt(n, "directiveFactory"), i.hasOwnProperty(t) || (i[t] = [], e.factory(t + o, ["$injector", "$exceptionHandler", function (e, n) {
        var r = [];
        return a(i[t], function (i, a) {
          try {
            var o = e.invoke(i);
            S(o) ? o = {compile: g(o)} : !o.compile && o.link && (o.compile = g(o.link)), o.priority = o.priority || 0, o.index = a, o.name = o.name || t, o.require = o.require || o.controller && o.name, o.restrict = o.restrict || "A", r.push(o)
          } catch (s) {
            n(s)
          }
        }), r
      }])), i[t].push(n)) : a(t, u(f)), this
    }, this.aHrefSanitizationWhitelist = function (e) {
      return y(e) ? (r.aHrefSanitizationWhitelist(e), this) : r.aHrefSanitizationWhitelist()
    }, this.imgSrcSanitizationWhitelist = function (e) {
      return y(e) ? (r.imgSrcSanitizationWhitelist(e), this) : r.imgSrcSanitizationWhitelist()
    }, this.$get = ["$injector", "$interpolate", "$exceptionHandler", "$http", "$templateCache", "$parse", "$controller", "$rootScope", "$document", "$sce", "$animate", "$$sanitizeUri", function (e, r, u, f, h, v, y, w, $, T, C, k) {
      function A(e, t, n, r, i) {
        e instanceof br || (e = br(e)), a(e, function (t, n) {
          3 == t.nodeType && t.nodeValue.match(/\S+/) && (e[n] = t = br(t).wrap("<span></span>").parent()[0])
        });
        var o = D(e, t, e, n, r, i);
        return _(e, "ng-scope"), function (t, n, r) {
          nt(t, "scope");
          var i = n ? Wr.clone.call(e) : e;
          a(r, function (e, t) {
            i.data("$" + t + "Controller", e)
          });
          for (var s = 0, u = i.length; u > s; s++) {
            var l = i[s], c = l.nodeType;
            (1 === c || 9 === c) && i.eq(s).data("$scope", t)
          }
          return n && n(i, t), o && o(t, i, i), i
        }
      }

      function _(e, t) {
        try {
          e.addClass(t)
        } catch (n) {
        }
      }

      function D(e, t, r, i, a, o) {
        function s(e, r, i, a) {
          var o, s, u, l, c, p, f, d, m, g = r.length, v = new Array(g);
          for (f = 0; g > f; f++)v[f] = r[f];
          for (f = 0, m = 0, d = h.length; d > f; m++)u = v[m], o = h[f++], s = h[f++], l = br(u), o ? (o.scope ? (c = e.$new(), l.data("$scope", c)) : c = e, p = o.transclude, p || !a && t ? o(s, c, u, i, M(e, p || t)) : o(s, c, u, i, a)) : s && s(e, u.childNodes, n, a)
        }

        for (var u, l, c, p, f, d, h = [], m = 0; m < e.length; m++)u = new Z, l = O(e[m], [], u, 0 === m ? i : n, a), c = l.length ? R(l, e[m], u, t, r, null, [], [], o) : null, c && c.scope && _(br(e[m]), "ng-scope"), f = c && c.terminal || !(p = e[m].childNodes) || !p.length ? null : D(p, c ? c.transclude : t), h.push(c, f), d = d || c || f, o = null;
        return d ? s : null
      }

      function M(e, t) {
        return function (n, r, i) {
          var a = !1;
          n || (n = e.$new(), n.$$transcluded = !0, a = !0);
          var o = t(n, r, i);
          return a && o.on("$destroy", q(n, n.$destroy)), o
        }
      }

      function O(e, t, n, r, i) {
        var a, o, u = e.nodeType, c = n.$attr;
        switch (u) {
          case 1:
            F(t, Vt($r(e).toLowerCase()), "E", r, i);
            for (var p, f, d, h, m, g = e.attributes, v = 0, y = g && g.length; y > v; v++) {
              var b = !1, w = !1;
              if (p = g[v], !yr || yr >= 8 || p.specified) {
                f = p.name, h = Vt(f), it.test(h) && (f = et(h.substr(6), "-"));
                var $ = h.replace(/(Start|End)$/, "");
                h === $ + "Start" && (b = f, w = f.substr(0, f.length - 5) + "end", f = f.substr(0, f.length - 6)), d = Vt(f.toLowerCase()), c[d] = f, n[d] = m = _r(p.value), _t(e, d) && (n[d] = !0), X(e, t, m, d), F(t, d, "A", r, i, b, w)
              }
            }
            if (o = e.className, x(o) && "" !== o)for (; a = l.exec(o);)d = Vt(a[2]), F(t, d, "C", r, i) && (n[d] = _r(a[3])), o = o.substr(a.index + a[0].length);
            break;
          case 3:
            z(t, e.nodeValue);
            break;
          case 8:
            try {
              a = s.exec(e.nodeValue), a && (d = Vt(a[1]), F(t, d, "M", r, i) && (n[d] = _r(a[2])))
            } catch (E) {
            }
        }
        return t.sort(H), t
      }

      function N(e, t, n) {
        var r = [], i = 0;
        if (t && e.hasAttribute && e.hasAttribute(t)) {
          do {
            if (!e)throw ti("uterdir", "Unterminated attribute, found '{0}' but no matching '{1}' found.", t, n);
            1 == e.nodeType && (e.hasAttribute(t) && i++, e.hasAttribute(n) && i--), r.push(e), e = e.nextSibling
          } while (i > 0)
        } else r.push(e);
        return br(r)
      }

      function P(e, t, n) {
        return function (r, i, a, o, s) {
          return i = N(i[0], t, n), e(r, i, a, o, s)
        }
      }

      function R(e, i, o, s, l, c, p, f, d) {
        function h(e, t, n, r) {
          e && (n && (e = P(e, n, r)), e.require = $.require, (F === $ || $.$$isolateScope) && (e = Q(e, {isolateScope: !0})), p.push(e)), t && (n && (t = P(t, n, r)), t.require = $.require, (F === $ || $.$$isolateScope) && (t = Q(t, {isolateScope: !0})), f.push(t))
        }

        function m(e, t, n) {
          var r, i = "data", o = !1;
          if (x(e)) {
            for (; "^" == (r = e.charAt(0)) || "?" == r;)e = e.substr(1), "^" == r && (i = "inheritedData"), o = o || "?" == r;
            if (r = null, n && "data" === i && (r = n[e]), r = r || t[i]("$" + e + "Controller"), !r && !o)throw ti("ctreq", "Controller '{0}', required by directive '{1}', can't be found!", e, T);
            return r
          }
          return E(e) && (r = [], a(e, function (e) {
            r.push(m(e, t, n))
          })), r
        }

        function g(e, t, s, l, c) {
          function d(e, t) {
            var r;
            return arguments.length < 2 && (t = e, e = n), G && (r = T), c(e, t, r)
          }

          var h, g, b, x, w, $, E, S, T = {};
          if (h = i === s ? o : I(o, new Z(br(s), o.$attr)), g = h.$$element, F) {
            var C = /^\s*([@=&])(\??)\s*(\w*)\s*$/, k = br(s);
            E = t.$new(!0), q && q === F.$$originalDirective ? k.data("$isolateScope", E) : k.data("$isolateScopeNoTemplate", E), _(k, "ng-isolate-scope"), a(F.scope, function (e, n) {
              var i, a, o, s, u = e.match(C) || [], l = u[3] || n, c = "?" == u[2], p = u[1];
              switch (E.$$isolateBindings[n] = p + l, p) {
                case"@":
                  h.$observe(l, function (e) {
                    E[n] = e
                  }), h.$$observers[l].$$scope = t, h[l] && (E[n] = r(h[l])(t));
                  break;
                case"=":
                  if (c && !h[l])return;
                  a = v(h[l]), s = a.literal ? L : function (e, t) {
                    return e === t
                  }, o = a.assign || function () {
                      throw i = E[n] = a(t), ti("nonassign", "Expression '{0}' used with directive '{1}' is non-assignable!", h[l], F.name)
                    }, i = E[n] = a(t), E.$watch(function () {
                    var e = a(t);
                    return s(e, E[n]) || (s(e, i) ? o(t, e = E[n]) : E[n] = e), i = e
                  }, null, a.literal);
                  break;
                case"&":
                  a = v(h[l]), E[n] = function (e) {
                    return a(t, e)
                  };
                  break;
                default:
                  throw ti("iscp", "Invalid isolate scope definition for directive '{0}'. Definition: {... {1}: '{2}' ...}", F.name, n, e)
              }
            })
          }
          for (S = c && d, R && a(R, function (e) {
            var n, r = {$scope: e === F || e.$$isolateScope ? E : t, $element: g, $attrs: h, $transclude: S};
            $ = e.controller, "@" == $ && ($ = h[e.name]), n = y($, r), T[e.name] = n, G || g.data("$" + e.name + "Controller", n), e.controllerAs && (r.$scope[e.controllerAs] = n)
          }), b = 0, x = p.length; x > b; b++)try {
            w = p[b], w(w.isolateScope ? E : t, g, h, w.require && m(w.require, g, T), S)
          } catch (A) {
            u(A, Y(g))
          }
          var D = t;
          for (F && (F.template || null === F.templateUrl) && (D = E), e && e(D, s.childNodes, n, c), b = f.length - 1; b >= 0; b--)try {
            w = f[b], w(w.isolateScope ? E : t, g, h, w.require && m(w.require, g, T), S)
          } catch (A) {
            u(A, Y(g))
          }
        }

        d = d || {};
        for (var w, $, T, C, k, D, M = -Number.MAX_VALUE, R = d.controllerDirectives, F = d.newIsolateScopeDirective, q = d.templateDirective, H = d.nonTlbTranscludeDirective, z = !1, G = d.hasElementTranscludeDirective, X = o.$$element = br(i), J = c, et = s, tt = 0, nt = e.length; nt > tt; tt++) {
          $ = e[tt];
          var it = $.$$start, at = $.$$end;
          if (it && (X = N(i, it, at)), C = n, M > $.priority)break;
          if ((D = $.scope) && (w = w || $, $.templateUrl || (W("new/isolated scope", F, $, X), b(D) && (F = $))), T = $.name, !$.templateUrl && $.controller && (D = $.controller, R = R || {}, W("'" + T + "' controller", R[T], $, X), R[T] = $), (D = $.transclude) && (z = !0, $.$$tlb || (W("transclusion", H, $, X), H = $), "element" == D ? (G = !0, M = $.priority, C = N(i, it, at), X = o.$$element = br(t.createComment(" " + T + ": " + o[T] + " ")), i = X[0], K(l, br(B(C)), i), et = A(C, s, M, J && J.name, {nonTlbTranscludeDirective: H})) : (C = br(gt(i)).contents(), X.empty(), et = A(C, s))), $.template)if (W("template", q, $, X), q = $, D = S($.template) ? $.template(X, o) : $.template, D = rt(D), $.replace) {
            if (J = $, C = ft(D) ? [] : br(D), i = C[0], 1 != C.length || 1 !== i.nodeType)throw ti("tplrt", "Template for directive '{0}' must have exactly one root element. {1}", T, "");
            K(l, X, i);
            var ot = {$attr: {}}, st = O(i, [], ot), ut = e.splice(tt + 1, e.length - (tt + 1));
            F && j(st), e = e.concat(st).concat(ut), V(o, ot), nt = e.length
          } else X.html(D);
          if ($.templateUrl)W("template", q, $, X), q = $, $.replace && (J = $), g = U(e.splice(tt, e.length - tt), X, o, l, et, p, f, {
            controllerDirectives: R,
            newIsolateScopeDirective: F,
            templateDirective: q,
            nonTlbTranscludeDirective: H
          }), nt = e.length; else if ($.compile)try {
            k = $.compile(X, o, et), S(k) ? h(null, k, it, at) : k && h(k.pre, k.post, it, at)
          } catch (lt) {
            u(lt, Y(X))
          }
          $.terminal && (g.terminal = !0, M = Math.max(M, $.priority))
        }
        return g.scope = w && w.scope === !0, g.transclude = z && et, d.hasElementTranscludeDirective = G, g
      }

      function j(e) {
        for (var t = 0, n = e.length; n > t; t++)e[t] = d(e[t], {$$isolateScope: !0})
      }

      function F(t, r, a, s, l, c, p) {
        if (r === l)return null;
        var f = null;
        if (i.hasOwnProperty(r))for (var h, m = e.get(r + o), g = 0, v = m.length; v > g; g++)try {
          h = m[g], (s === n || s > h.priority) && -1 != h.restrict.indexOf(a) && (c && (h = d(h, {
            $$start: c,
            $$end: p
          })), t.push(h), f = h)
        } catch (y) {
          u(y)
        }
        return f
      }

      function V(e, t) {
        var n = t.$attr, r = e.$attr, i = e.$$element;
        a(e, function (r, i) {
          "$" != i.charAt(0) && (t[i] && (r += ("style" === i ? ";" : " ") + t[i]), e.$set(i, r, !0, n[i]))
        }), a(t, function (t, a) {
          "class" == a ? (_(i, t), e["class"] = (e["class"] ? e["class"] + " " : "") + t) : "style" == a ? (i.attr("style", i.attr("style") + ";" + t), e.style = (e.style ? e.style + ";" : "") + t) : "$" == a.charAt(0) || e.hasOwnProperty(a) || (e[a] = t, r[a] = n[a])
        })
      }

      function U(e, t, n, r, i, o, s, u) {
        var l, c, d = [], m = t[0], g = e.shift(), v = p({}, g, {
          templateUrl: null,
          transclude: null,
          replace: null,
          $$originalDirective: g
        }), y = S(g.templateUrl) ? g.templateUrl(t, n) : g.templateUrl;
        return t.empty(), f.get(T.getTrustedResourceUrl(y), {cache: h}).success(function (p) {
          var f, h, x, w;
          if (p = rt(p), g.replace) {
            if (x = ft(p) ? [] : br(p), f = x[0], 1 != x.length || 1 !== f.nodeType)throw ti("tplrt", "Template for directive '{0}' must have exactly one root element. {1}", g.name, y);
            h = {$attr: {}}, K(r, t, f);
            var $ = O(f, [], h);
            b(g.scope) && j($), e = $.concat(e), V(n, h)
          } else f = m, t.html(p);
          for (e.unshift(v), l = R(e, f, n, i, t, g, o, s, u), a(r, function (e, n) {
            e == f && (r[n] = t[0])
          }), c = D(t[0].childNodes, i); d.length;) {
            var E = d.shift(), S = d.shift(), T = d.shift(), C = d.shift(), k = t[0];
            if (S !== m) {
              var A = S.className;
              u.hasElementTranscludeDirective && g.replace || (k = gt(f)), K(T, br(S), k), _(br(k), A)
            }
            w = l.transclude ? M(E, l.transclude) : C, l(c, E, k, r, w)
          }
          d = null
        }).error(function (e, t, n, r) {
          throw ti("tpload", "Failed to load template: {0}", r.url)
        }), function (e, t, n, r, i) {
          d ? (d.push(t), d.push(n), d.push(r), d.push(i)) : l(c, t, n, r, i)
        }
      }

      function H(e, t) {
        var n = t.priority - e.priority;
        return 0 !== n ? n : e.name !== t.name ? e.name < t.name ? -1 : 1 : e.index - t.index
      }

      function W(e, t, n, r) {
        if (t)throw ti("multidir", "Multiple directives [{0}, {1}] asking for {2} on: {3}", t.name, n.name, e, Y(r))
      }

      function z(e, t) {
        var n = r(t, !0);
        n && e.push({
          priority: 0, compile: g(function (e, t) {
            var r = t.parent(), i = r.data("$binding") || [];
            i.push(n), _(r.data("$binding", i), "ng-binding"), e.$watch(n, function (e) {
              t[0].nodeValue = e
            })
          })
        })
      }

      function G(e, t) {
        if ("srcdoc" == t)return T.HTML;
        var n = $r(e);
        return "xlinkHref" == t || "FORM" == n && "action" == t || "IMG" != n && ("src" == t || "ngSrc" == t) ? T.RESOURCE_URL : void 0
      }

      function X(e, t, n, i) {
        var a = r(n, !0);
        if (a) {
          if ("multiple" === i && "SELECT" === $r(e))throw ti("selmulti", "Binding to the 'multiple' attribute is not supported. Element: {0}", Y(e));
          t.push({
            priority: 100, compile: function () {
              return {
                pre: function (t, n, o) {
                  var s = o.$$observers || (o.$$observers = {});
                  if (c.test(i))throw ti("nodomevents", "Interpolations for HTML DOM event attributes are disallowed.  Please use the ng- versions (such as ng-click instead of onclick) instead.");
                  a = r(o[i], !0, G(e, i)), a && (o[i] = a(t), (s[i] || (s[i] = [])).$$inter = !0, (o.$$observers && o.$$observers[i].$$scope || t).$watch(a, function (e, t) {
                    "class" === i && e != t ? o.$updateClass(e, t) : o.$set(i, e)
                  }))
                }
              }
            }
          })
        }
      }

      function K(e, n, r) {
        var i, a, o = n[0], s = n.length, u = o.parentNode;
        if (e)for (i = 0, a = e.length; a > i; i++)if (e[i] == o) {
          e[i++] = r;
          for (var l = i, c = l + s - 1, p = e.length; p > l; l++, c++)p > c ? e[l] = e[c] : delete e[l];
          e.length -= s - 1;
          break
        }
        u && u.replaceChild(r, o);
        var f = t.createDocumentFragment();
        f.appendChild(o), r[br.expando] = o[br.expando];
        for (var d = 1, h = n.length; h > d; d++) {
          var m = n[d];
          br(m).remove(), f.appendChild(m), delete n[d]
        }
        n[0] = r, n.length = 1
      }

      function Q(e, t) {
        return p(function () {
          return e.apply(null, arguments)
        }, e, t)
      }

      var Z = function (e, t) {
        this.$$element = e, this.$attr = t || {}
      };
      Z.prototype = {
        $normalize: Vt, $addClass: function (e) {
          e && e.length > 0 && C.addClass(this.$$element, e)
        }, $removeClass: function (e) {
          e && e.length > 0 && C.removeClass(this.$$element, e)
        }, $updateClass: function (e, t) {
          var n = Ut(e, t), r = Ut(t, e);
          0 === n.length ? C.removeClass(this.$$element, r) : 0 === r.length ? C.addClass(this.$$element, n) : C.setClass(this.$$element, n, r)
        }, $set: function (e, t, r, i) {
          var o, s = _t(this.$$element[0], e);
          s && (this.$$element.prop(e, t), i = s), this[e] = t, i ? this.$attr[e] = i : (i = this.$attr[e], i || (this.$attr[e] = i = et(e, "-"))), o = $r(this.$$element), ("A" === o && "href" === e || "IMG" === o && "src" === e) && (this[e] = t = k(t, "src" === e)), r !== !1 && (null === t || t === n ? this.$$element.removeAttr(i) : this.$$element.attr(i, t));
          var l = this.$$observers;
          l && a(l[e], function (e) {
            try {
              e(t)
            } catch (n) {
              u(n)
            }
          })
        }, $observe: function (e, t) {
          var n = this, r = n.$$observers || (n.$$observers = {}), i = r[e] || (r[e] = []);
          return i.push(t), w.$evalAsync(function () {
            i.$$inter || t(n[e])
          }), t
        }
      };
      var J = r.startSymbol(), tt = r.endSymbol(), rt = "{{" == J || "}}" == tt ? m : function (e) {
        return e.replace(/\{\{/g, J).replace(/}}/g, tt)
      }, it = /^ngAttr[A-Z]/;
      return A
    }]
  }

  function Vt(e) {
    return ct(e.replace(ni, ""))
  }

  function Ut(e, t) {
    var n = "", r = e.split(/\s+/), i = t.split(/\s+/);
    e:for (var a = 0; a < r.length; a++) {
      for (var o = r[a], s = 0; s < i.length; s++)if (o == i[s])continue e;
      n += (n.length > 0 ? " " : "") + o
    }
    return n
  }

  function Ht() {
    var e = {}, t = /^(\S+)(\s+as\s+(\w+))?$/;
    this.register = function (t, n) {
      it(t, "controller"), b(t) ? p(e, t) : e[t] = n
    }, this.$get = ["$injector", "$window", function (n, i) {
      return function (a, o) {
        var s, u, l, c;
        if (x(a) && (u = a.match(t), l = u[1], c = u[3], a = e.hasOwnProperty(l) ? e[l] : at(o.$scope, l, !0) || at(i, l, !0), rt(a, l, !0)), s = n.instantiate(a, o), c) {
          if (!o || "object" != typeof o.$scope)throw r("$controller")("noscp", "Cannot export controller '{0}' as '{1}'! No $scope object provided via `locals`.", l || a.name, c);
          o.$scope[c] = s
        }
        return s
      }
    }]
  }

  function Wt() {
    this.$get = ["$window", function (e) {
      return br(e.document)
    }]
  }

  function Yt() {
    this.$get = ["$log", function (e) {
      return function () {
        e.error.apply(e, arguments)
      }
    }]
  }

  function zt(e) {
    var t, n, r, i = {};
    return e ? (a(e.split("\n"), function (e) {
      r = e.indexOf(":"), t = dr(_r(e.substr(0, r))), n = _r(e.substr(r + 1)), t && (i[t] ? i[t] += ", " + n : i[t] = n)
    }), i) : i
  }

  function Gt(e) {
    var t = b(e) ? e : n;
    return function (n) {
      return t || (t = zt(e)), n ? t[dr(n)] || null : t
    }
  }

  function Xt(e, t, n) {
    return S(n) ? n(e, t) : (a(n, function (n) {
      e = n(e, t)
    }), e)
  }

  function Kt(e) {
    return e >= 200 && 300 > e
  }

  function Qt() {
    var e = /^\s*(\[|\{[^\{])/, t = /[\}\]]\s*$/, r = /^\)\]\}',?\n/, i = {"Content-Type": "application/json;charset=utf-8"}, o = this.defaults = {
      transformResponse: [function (n) {
        return x(n) && (n = n.replace(r, ""), e.test(n) && t.test(n) && (n = H(n))), n
      }],
      transformRequest: [function (e) {
        return !b(e) || A(e) || _(e) ? e : U(e)
      }],
      headers: {common: {Accept: "application/json, text/plain, */*"}, post: R(i), put: R(i), patch: R(i)},
      xsrfCookieName: "XSRF-TOKEN",
      xsrfHeaderName: "X-XSRF-TOKEN"
    }, u = this.interceptors = [], l = this.responseInterceptors = [];
    this.$get = ["$httpBackend", "$browser", "$cacheFactory", "$rootScope", "$q", "$injector", function (e, t, r, i, c, f) {
      function d(e) {
        function r(e) {
          var t = p({}, e, {data: Xt(e.data, e.headers, s.transformResponse)});
          return Kt(e.status) ? t : c.reject(t)
        }

        function i(e) {
          function t(e) {
            var t;
            a(e, function (n, r) {
              S(n) && (t = n(), null != t ? e[r] = t : delete e[r])
            })
          }

          var n, r, i, s = o.headers, u = p({}, e.headers);
          s = p({}, s.common, s[dr(e.method)]), t(s), t(u);
          e:for (n in s) {
            r = dr(n);
            for (i in u)if (dr(i) === r)continue e;
            u[n] = s[n]
          }
          return u
        }

        var s = {method: "get", transformRequest: o.transformRequest, transformResponse: o.transformResponse}, u = i(e);
        p(s, e), s.headers = u, s.method = mr(s.method);
        var l = Bn(s.url) ? t.cookies()[s.xsrfCookieName || o.xsrfCookieName] : n;
        l && (u[s.xsrfHeaderName || o.xsrfHeaderName] = l);
        var f = function (e) {
          u = e.headers;
          var t = Xt(e.data, Gt(u), e.transformRequest);
          return v(e.data) && a(u, function (e, t) {
            "content-type" === dr(t) && delete u[t]
          }), v(e.withCredentials) && !v(o.withCredentials) && (e.withCredentials = o.withCredentials), g(e, t, u).then(r, r)
        }, d = [f, n], h = c.when(s);
        for (a(T, function (e) {
          (e.request || e.requestError) && d.unshift(e.request, e.requestError), (e.response || e.responseError) && d.push(e.response, e.responseError)
        }); d.length;) {
          var m = d.shift(), y = d.shift();
          h = h.then(m, y)
        }
        return h.success = function (e) {
          return h.then(function (t) {
            e(t.data, t.status, t.headers, s)
          }), h
        }, h.error = function (e) {
          return h.then(null, function (t) {
            e(t.data, t.status, t.headers, s)
          }), h
        }, h
      }

      function h() {
        a(arguments, function (e) {
          d[e] = function (t, n) {
            return d(p(n || {}, {method: e, url: t}))
          }
        })
      }

      function m() {
        a(arguments, function (e) {
          d[e] = function (t, n, r) {
            return d(p(r || {}, {method: e, url: t, data: n}))
          }
        })
      }

      function g(t, n, r) {
        function a(e, t, n, r) {
          l && (Kt(e) ? l.put(m, [e, t, zt(n), r]) : l.remove(m)), s(t, e, n, r), i.$$phase || i.$apply()
        }

        function s(e, n, r, i) {
          n = Math.max(n, 0), (Kt(n) ? f.resolve : f.reject)({
            data: e,
            status: n,
            headers: Gt(r),
            config: t,
            statusText: i
          })
        }

        function u() {
          var e = N(d.pendingRequests, t);
          -1 !== e && d.pendingRequests.splice(e, 1)
        }

        var l, p, f = c.defer(), h = f.promise, m = w(t.url, t.params);
        if (d.pendingRequests.push(t), h.then(u, u), (t.cache || o.cache) && t.cache !== !1 && "GET" == t.method && (l = b(t.cache) ? t.cache : b(o.cache) ? o.cache : $), l)if (p = l.get(m), y(p)) {
          if (p.then)return p.then(u, u), p;
          E(p) ? s(p[1], p[0], R(p[2]), p[3]) : s(p, 200, {}, "OK")
        } else l.put(m, h);
        return v(p) && e(t.method, m, n, a, r, t.timeout, t.withCredentials, t.responseType), h
      }

      function w(e, t) {
        if (!t)return e;
        var n = [];
        return s(t, function (e, t) {
          null === e || v(e) || (E(e) || (e = [e]), a(e, function (e) {
            b(e) && (e = U(e)), n.push(Q(t) + "=" + Q(e))
          }))
        }), n.length > 0 && (e += (-1 == e.indexOf("?") ? "?" : "&") + n.join("&")), e
      }

      var $ = r("$http"), T = [];
      return a(u, function (e) {
        T.unshift(x(e) ? f.get(e) : f.invoke(e))
      }), a(l, function (e, t) {
        var n = x(e) ? f.get(e) : f.invoke(e);
        T.splice(t, 0, {
          response: function (e) {
            return n(c.when(e))
          }, responseError: function (e) {
            return n(c.reject(e))
          }
        })
      }), d.pendingRequests = [], h("get", "delete", "head", "jsonp"), m("post", "put"), d.defaults = o, d
    }]
  }

  function Zt(t) {
    if (8 >= yr && (!t.match(/^(get|post|head|put|delete|options)$/i) || !e.XMLHttpRequest))return new e.ActiveXObject("Microsoft.XMLHTTP");
    if (e.XMLHttpRequest)return new e.XMLHttpRequest;
    throw r("$httpBackend")("noxhr", "This browser does not support XMLHttpRequest.")
  }

  function Jt() {
    this.$get = ["$browser", "$window", "$document", function (e, t, n) {
      return en(e, Zt, e.defer, t.angular.callbacks, n[0])
    }]
  }

  function en(e, t, n, r, i) {
    function o(e, t) {
      var n = i.createElement("script"), r = function () {
        n.onreadystatechange = n.onload = n.onerror = null, i.body.removeChild(n), t && t()
      };
      return n.type = "text/javascript", n.src = e, yr && 8 >= yr ? n.onreadystatechange = function () {
        /loaded|complete/.test(n.readyState) && r()
      } : n.onload = n.onerror = function () {
        r()
      }, i.body.appendChild(n), r
    }

    var s = -1;
    return function (i, u, l, c, p, f, d, m) {
      function g() {
        b = s, w && w(), $ && $.abort()
      }

      function v(t, r, i, a, o) {
        S && n.cancel(S), w = $ = null, 0 === r && (r = i ? 200 : "file" == Fn(u).protocol ? 404 : 0), r = 1223 === r ? 204 : r, o = o || "", t(r, i, a, o), e.$$completeOutstandingRequest(h)
      }

      var b;
      if (e.$$incOutstandingRequestCount(), u = u || e.url(), "jsonp" == dr(i)) {
        var x = "_" + (r.counter++).toString(36);
        r[x] = function (e) {
          r[x].data = e
        };
        var w = o(u.replace("JSON_CALLBACK", "angular.callbacks." + x), function () {
          r[x].data ? v(c, 200, r[x].data) : v(c, b || -2), r[x] = kr.noop
        })
      } else {
        var $ = t(i);
        if ($.open(i, u, !0), a(p, function (e, t) {
            y(e) && $.setRequestHeader(t, e)
          }), $.onreadystatechange = function () {
            if ($ && 4 == $.readyState) {
              var e = null, t = null;
              b !== s && (e = $.getAllResponseHeaders(), t = "response"in $ ? $.response : $.responseText), v(c, b || $.status, t, e, $.statusText || "")
            }
          }, d && ($.withCredentials = !0), m)try {
          $.responseType = m
        } catch (E) {
          if ("json" !== m)throw E
        }
        $.send(l || null)
      }
      if (f > 0)var S = n(g, f); else f && f.then && f.then(g)
    }
  }

  function tn() {
    var e = "{{", t = "}}";
    this.startSymbol = function (t) {
      return t ? (e = t, this) : e
    }, this.endSymbol = function (e) {
      return e ? (t = e, this) : t
    }, this.$get = ["$parse", "$exceptionHandler", "$sce", function (n, r, i) {
      function a(a, u, l) {
        for (var c, p, f, d, h = 0, m = [], g = a.length, y = !1, b = []; g > h;)-1 != (c = a.indexOf(e, h)) && -1 != (p = a.indexOf(t, c + o)) ? (h != c && m.push(a.substring(h, c)), m.push(f = n(d = a.substring(c + o, p))), f.exp = d, h = p + s, y = !0) : (h != g && m.push(a.substring(h)), h = g);
        if ((g = m.length) || (m.push(""), g = 1), l && m.length > 1)throw ri("noconcat", "Error while interpolating: {0}\nStrict Contextual Escaping disallows interpolations that concatenate multiple expressions when a trusted value is required.  See http://docs.angularjs.org/api/ng.$sce", a);
        return !u || y ? (b.length = g, f = function (e) {
          try {
            for (var t, n = 0, o = g; o > n; n++)"function" == typeof(t = m[n]) && (t = t(e), t = l ? i.getTrusted(l, t) : i.valueOf(t), null === t || v(t) ? t = "" : "string" != typeof t && (t = U(t))), b[n] = t;
            return b.join("")
          } catch (s) {
            var u = ri("interr", "Can't interpolate: {0}\n{1}", a, s.toString());
            r(u)
          }
        }, f.exp = a, f.parts = m, f) : void 0
      }

      var o = e.length, s = t.length;
      return a.startSymbol = function () {
        return e
      }, a.endSymbol = function () {
        return t
      }, a
    }]
  }

  function nn() {
    this.$get = ["$rootScope", "$window", "$q", function (e, t, n) {
      function r(r, a, o, s) {
        var u = t.setInterval, l = t.clearInterval, c = n.defer(), p = c.promise, f = 0, d = y(s) && !s;
        return o = y(o) ? o : 0, p.then(null, null, r), p.$$intervalId = u(function () {
          c.notify(f++), o > 0 && f >= o && (c.resolve(f), l(p.$$intervalId), delete i[p.$$intervalId]), d || e.$apply()
        }, a), i[p.$$intervalId] = c, p
      }

      var i = {};
      return r.cancel = function (e) {
        return e && e.$$intervalId in i ? (i[e.$$intervalId].reject("canceled"), clearInterval(e.$$intervalId), delete i[e.$$intervalId], !0) : !1
      }, r
    }]
  }

  function rn() {
    this.$get = function () {
      return {
        id: "en-us",
        NUMBER_FORMATS: {
          DECIMAL_SEP: ".",
          GROUP_SEP: ",",
          PATTERNS: [{
            minInt: 1,
            minFrac: 0,
            maxFrac: 3,
            posPre: "",
            posSuf: "",
            negPre: "-",
            negSuf: "",
            gSize: 3,
            lgSize: 3
          }, {
            minInt: 1,
            minFrac: 2,
            maxFrac: 2,
            posPre: "¤",
            posSuf: "",
            negPre: "(¤",
            negSuf: ")",
            gSize: 3,
            lgSize: 3
          }],
          CURRENCY_SYM: "$"
        },
        DATETIME_FORMATS: {
          MONTH: "January,February,March,April,May,June,July,August,September,October,November,December".split(","),
          SHORTMONTH: "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","),
          DAY: "Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","),
          SHORTDAY: "Sun,Mon,Tue,Wed,Thu,Fri,Sat".split(","),
          AMPMS: ["AM", "PM"],
          medium: "MMM d, y h:mm:ss a",
          "short": "M/d/yy h:mm a",
          fullDate: "EEEE, MMMM d, y",
          longDate: "MMMM d, y",
          mediumDate: "MMM d, y",
          shortDate: "M/d/yy",
          mediumTime: "h:mm:ss a",
          shortTime: "h:mm a"
        },
        pluralCat: function (e) {
          return 1 === e ? "one" : "other"
        }
      }
    }
  }

  function an(e) {
    for (var t = e.split("/"), n = t.length; n--;)t[n] = K(t[n]);
    return t.join("/")
  }

  function on(e, t, n) {
    var r = Fn(e, n);
    t.$$protocol = r.protocol, t.$$host = r.hostname, t.$$port = f(r.port) || ai[r.protocol] || null
  }

  function sn(e, t, n) {
    var r = "/" !== e.charAt(0);
    r && (e = "/" + e);
    var i = Fn(e, n);
    t.$$path = decodeURIComponent(r && "/" === i.pathname.charAt(0) ? i.pathname.substring(1) : i.pathname), t.$$search = G(i.search), t.$$hash = decodeURIComponent(i.hash), t.$$path && "/" != t.$$path.charAt(0) && (t.$$path = "/" + t.$$path)
  }

  function un(e, t) {
    return 0 === t.indexOf(e) ? t.substr(e.length) : void 0
  }

  function ln(e) {
    var t = e.indexOf("#");
    return -1 == t ? e : e.substr(0, t)
  }

  function cn(e) {
    return e.substr(0, ln(e).lastIndexOf("/") + 1)
  }

  function pn(e) {
    return e.substring(0, e.indexOf("/", e.indexOf("//") + 2))
  }

  function fn(e, t) {
    this.$$html5 = !0, t = t || "";
    var r = cn(e);
    on(e, this, e), this.$$parse = function (t) {
      var n = un(r, t);
      if (!x(n))throw oi("ipthprfx", 'Invalid url "{0}", missing path prefix "{1}".', t, r);
      sn(n, this, e), this.$$path || (this.$$path = "/"), this.$$compose()
    }, this.$$compose = function () {
      var e = X(this.$$search), t = this.$$hash ? "#" + K(this.$$hash) : "";
      this.$$url = an(this.$$path) + (e ? "?" + e : "") + t, this.$$absUrl = r + this.$$url.substr(1)
    }, this.$$rewrite = function (i) {
      var a, o;
      return (a = un(e, i)) !== n ? (o = a, (a = un(t, a)) !== n ? r + (un("/", a) || a) : e + o) : (a = un(r, i)) !== n ? r + a : r == i + "/" ? r : void 0
    }
  }

  function dn(e, t) {
    var n = cn(e);
    on(e, this, e), this.$$parse = function (r) {
      function i(e, t, n) {
        var r, i = /^\/?.*?:(\/.*)/;
        return 0 === t.indexOf(n) && (t = t.replace(n, "")), i.exec(t) ? e : (r = i.exec(e), r ? r[1] : e)
      }

      var a = un(e, r) || un(n, r), o = "#" == a.charAt(0) ? un(t, a) : this.$$html5 ? a : "";
      if (!x(o))throw oi("ihshprfx", 'Invalid url "{0}", missing hash prefix "{1}".', r, t);
      sn(o, this, e), this.$$path = i(this.$$path, o, e), this.$$compose()
    }, this.$$compose = function () {
      var n = X(this.$$search), r = this.$$hash ? "#" + K(this.$$hash) : "";
      this.$$url = an(this.$$path) + (n ? "?" + n : "") + r, this.$$absUrl = e + (this.$$url ? t + this.$$url : "")
    }, this.$$rewrite = function (t) {
      return ln(e) == ln(t) ? t : void 0
    }
  }

  function hn(e, t) {
    this.$$html5 = !0, dn.apply(this, arguments);
    var n = cn(e);
    this.$$rewrite = function (r) {
      var i;
      return e == ln(r) ? r : (i = un(n, r)) ? e + t + i : n === r + "/" ? n : void 0
    }
  }

  function mn(e) {
    return function () {
      return this[e]
    }
  }

  function gn(e, t) {
    return function (n) {
      return v(n) ? this[e] : (this[e] = t(n), this.$$compose(), this)
    }
  }

  function vn() {
    var t = "", n = !1;
    this.hashPrefix = function (e) {
      return y(e) ? (t = e, this) : t
    }, this.html5Mode = function (e) {
      return y(e) ? (n = e, this) : n
    }, this.$get = ["$rootScope", "$browser", "$sniffer", "$rootElement", function (r, i, a, o) {
      function s(e) {
        r.$broadcast("$locationChangeSuccess", u.absUrl(), e)
      }

      var u, l, c, p = i.baseHref(), f = i.url();
      n ? (c = pn(f) + (p || "/"), l = a.history ? fn : hn) : (c = ln(f), l = dn), u = new l(c, "#" + t), u.$$parse(u.$$rewrite(f)), o.on("click", function (t) {
        if (!t.ctrlKey && !t.metaKey && 2 != t.which) {
          for (var n = br(t.target); "a" !== dr(n[0].nodeName);)if (n[0] === o[0] || !(n = n.parent())[0])return;
          var a = n.prop("href");
          b(a) && "[object SVGAnimatedString]" === a.toString() && (a = Fn(a.animVal).href);
          var s = u.$$rewrite(a);
          a && !n.attr("target") && s && !t.isDefaultPrevented() && (t.preventDefault(), s != i.url() && (u.$$parse(s), r.$apply(), e.angular["ff-684208-preventDefault"] = !0))
        }
      }), u.absUrl() != f && i.url(u.absUrl(), !0), i.onUrlChange(function (e) {
        u.absUrl() != e && (r.$evalAsync(function () {
          var t = u.absUrl();
          u.$$parse(e), r.$broadcast("$locationChangeStart", e, t).defaultPrevented ? (u.$$parse(t), i.url(t)) : s(t)
        }), r.$$phase || r.$digest())
      });
      var d = 0;
      return r.$watch(function () {
        var e = i.url(), t = u.$$replace;
        return d && e == u.absUrl() || (d++, r.$evalAsync(function () {
          r.$broadcast("$locationChangeStart", u.absUrl(), e).defaultPrevented ? u.$$parse(e) : (i.url(u.absUrl(), t), s(e))
        })), u.$$replace = !1, d
      }), u
    }]
  }

  function yn() {
    var e = !0, t = this;
    this.debugEnabled = function (t) {
      return y(t) ? (e = t, this) : e
    }, this.$get = ["$window", function (n) {
      function r(e) {
        return e instanceof Error && (e.stack ? e = e.message && -1 === e.stack.indexOf(e.message) ? "Error: " + e.message + "\n" + e.stack : e.stack : e.sourceURL && (e = e.message + "\n" + e.sourceURL + ":" + e.line)), e
      }

      function i(e) {
        var t = n.console || {}, i = t[e] || t.log || h, o = !1;
        try {
          o = !!i.apply
        } catch (s) {
        }
        return o ? function () {
          var e = [];
          return a(arguments, function (t) {
            e.push(r(t))
          }), i.apply(t, e)
        } : function (e, t) {
          i(e, null == t ? "" : t)
        }
      }

      return {
        log: i("log"), info: i("info"), warn: i("warn"), error: i("error"), debug: function () {
          var n = i("debug");
          return function () {
            e && n.apply(t, arguments)
          }
        }()
      }
    }]
  }

  function bn(e, t) {
    if ("constructor" === e)throw ui("isecfld", 'Referencing "constructor" field in Angular expressions is disallowed! Expression: {0}', t);
    return e
  }

  function xn(e, t) {
    if (e) {
      if (e.constructor === e)throw ui("isecfn", "Referencing Function in Angular expressions is disallowed! Expression: {0}", t);
      if (e.document && e.location && e.alert && e.setInterval)throw ui("isecwindow", "Referencing the Window in Angular expressions is disallowed! Expression: {0}", t);
      if (e.children && (e.nodeName || e.prop && e.attr && e.find))throw ui("isecdom", "Referencing DOM nodes in Angular expressions is disallowed! Expression: {0}", t)
    }
    return e
  }

  function wn(e, t, r, i, a) {
    a = a || {};
    for (var o, s = t.split("."), u = 0; s.length > 1; u++) {
      o = bn(s.shift(), i);
      var l = e[o];
      l || (l = {}, e[o] = l), e = l, e.then && a.unwrapPromises && (si(i), "$$v"in e || !function (e) {
        e.then(function (t) {
          e.$$v = t
        })
      }(e), e.$$v === n && (e.$$v = {}), e = e.$$v)
    }
    return o = bn(s.shift(), i), e[o] = r, r
  }

  function $n(e, t, r, i, a, o, s) {
    return bn(e, o), bn(t, o), bn(r, o), bn(i, o), bn(a, o), s.unwrapPromises ? function (s, u) {
      var l, c = u && u.hasOwnProperty(e) ? u : s;
      return null == c ? c : (c = c[e], c && c.then && (si(o), "$$v"in c || (l = c, l.$$v = n, l.then(function (e) {
        l.$$v = e
      })), c = c.$$v), t ? null == c ? n : (c = c[t], c && c.then && (si(o), "$$v"in c || (l = c, l.$$v = n, l.then(function (e) {
        l.$$v = e
      })), c = c.$$v), r ? null == c ? n : (c = c[r], c && c.then && (si(o), "$$v"in c || (l = c, l.$$v = n, l.then(function (e) {
        l.$$v = e
      })), c = c.$$v), i ? null == c ? n : (c = c[i], c && c.then && (si(o), "$$v"in c || (l = c, l.$$v = n, l.then(function (e) {
        l.$$v = e
      })), c = c.$$v), a ? null == c ? n : (c = c[a], c && c.then && (si(o), "$$v"in c || (l = c, l.$$v = n, l.then(function (e) {
        l.$$v = e
      })), c = c.$$v), c) : c) : c) : c) : c)
    } : function (o, s) {
      var u = s && s.hasOwnProperty(e) ? s : o;
      return null == u ? u : (u = u[e], t ? null == u ? n : (u = u[t], r ? null == u ? n : (u = u[r], i ? null == u ? n : (u = u[i], a ? null == u ? n : u = u[a] : u) : u) : u) : u)
    }
  }

  function En(e, t) {
    return bn(e, t), function (t, r) {
      return null == t ? n : (r && r.hasOwnProperty(e) ? r : t)[e]
    }
  }

  function Sn(e, t, r) {
    return bn(e, r), bn(t, r), function (r, i) {
      return null == r ? n : (r = (i && i.hasOwnProperty(e) ? i : r)[e], null == r ? n : r[t])
    }
  }

  function Tn(e, t, r) {
    if (hi.hasOwnProperty(e))return hi[e];
    var i, o = e.split("."), s = o.length;
    if (t.unwrapPromises || 1 !== s)if (t.unwrapPromises || 2 !== s)if (t.csp)i = 6 > s ? $n(o[0], o[1], o[2], o[3], o[4], r, t) : function (e, i) {
      var a, u = 0;
      do a = $n(o[u++], o[u++], o[u++], o[u++], o[u++], r, t)(e, i), i = n, e = a; while (s > u);
      return a
    }; else {
      var u = "var p;\n";
      a(o, function (e, n) {
        bn(e, r), u += "if(s == null) return undefined;\ns=" + (n ? "s" : '((k&&k.hasOwnProperty("' + e + '"))?k:s)') + '["' + e + '"];\n' + (t.unwrapPromises ? 'if (s && s.then) {\n pw("' + r.replace(/(["\r\n])/g, "\\$1") + '");\n if (!("$$v" in s)) {\n p=s;\n p.$$v = undefined;\n p.then(function(v) {p.$$v=v;});\n}\n s=s.$$v\n}\n' : "")
      }), u += "return s;";
      var l = new Function("s", "k", "pw", u);
      l.toString = g(u), i = t.unwrapPromises ? function (e, t) {
        return l(e, t, si)
      } : l
    } else i = Sn(o[0], o[1], r); else i = En(o[0], r);
    return "hasOwnProperty" !== e && (hi[e] = i), i
  }

  function Cn() {
    var e = {}, t = {csp: !1, unwrapPromises: !1, logPromiseWarnings: !0};
    this.unwrapPromises = function (e) {
      return y(e) ? (t.unwrapPromises = !!e, this) : t.unwrapPromises
    }, this.logPromiseWarnings = function (e) {
      return y(e) ? (t.logPromiseWarnings = e, this) : t.logPromiseWarnings
    }, this.$get = ["$filter", "$sniffer", "$log", function (n, r, i) {
      return t.csp = r.csp, si = function (e) {
        t.logPromiseWarnings && !li.hasOwnProperty(e) && (li[e] = !0, i.warn("[$parse] Promise found in the expression `" + e + "`. Automatic unwrapping of promises in Angular expressions is deprecated."))
      }, function (r) {
        var i;
        switch (typeof r) {
          case"string":
            if (e.hasOwnProperty(r))return e[r];
            var a = new fi(t), o = new di(a, n, t);
            return i = o.parse(r, !1), "hasOwnProperty" !== r && (e[r] = i), i;
          case"function":
            return r;
          default:
            return h
        }
      }
    }]
  }

  function kn() {
    this.$get = ["$rootScope", "$exceptionHandler", function (e, t) {
      return An(function (t) {
        e.$evalAsync(t)
      }, t)
    }]
  }

  function An(e, t) {
    function r(e) {
      return e
    }

    function i(e) {
      return l(e)
    }

    function o(e) {
      var t = s(), n = 0, r = E(e) ? [] : {};
      return a(e, function (e, i) {
        n++, u(e).then(function (e) {
          r.hasOwnProperty(i) || (r[i] = e, --n || t.resolve(r))
        }, function (e) {
          r.hasOwnProperty(i) || t.reject(e)
        })
      }), 0 === n && t.resolve(r), t.promise
    }

    var s = function () {
      var a, o, l = [];
      return o = {
        resolve: function (t) {
          if (l) {
            var r = l;
            l = n, a = u(t), r.length && e(function () {
              for (var e, t = 0, n = r.length; n > t; t++)e = r[t], a.then(e[0], e[1], e[2])
            })
          }
        }, reject: function (e) {
          o.resolve(c(e))
        }, notify: function (t) {
          if (l) {
            var n = l;
            l.length && e(function () {
              for (var e, r = 0, i = n.length; i > r; r++)e = n[r], e[2](t)
            })
          }
        }, promise: {
          then: function (e, n, o) {
            var u = s(), c = function (n) {
              try {
                u.resolve((S(e) ? e : r)(n))
              } catch (i) {
                u.reject(i), t(i)
              }
            }, p = function (e) {
              try {
                u.resolve((S(n) ? n : i)(e))
              } catch (r) {
                u.reject(r), t(r)
              }
            }, f = function (e) {
              try {
                u.notify((S(o) ? o : r)(e))
              } catch (n) {
                t(n)
              }
            };
            return l ? l.push([c, p, f]) : a.then(c, p, f), u.promise
          }, "catch": function (e) {
            return this.then(null, e)
          }, "finally": function (e) {
            function t(e, t) {
              var n = s();
              return t ? n.resolve(e) : n.reject(e), n.promise
            }

            function n(n, i) {
              var a = null;
              try {
                a = (e || r)()
              } catch (o) {
                return t(o, !1)
              }
              return a && S(a.then) ? a.then(function () {
                return t(n, i)
              }, function (e) {
                return t(e, !1)
              }) : t(n, i)
            }

            return this.then(function (e) {
              return n(e, !0)
            }, function (e) {
              return n(e, !1)
            })
          }
        }
      }
    }, u = function (t) {
      return t && S(t.then) ? t : {
        then: function (n) {
          var r = s();
          return e(function () {
            r.resolve(n(t))
          }), r.promise
        }
      }
    }, l = function (e) {
      var t = s();
      return t.reject(e), t.promise
    }, c = function (n) {
      return {
        then: function (r, a) {
          var o = s();
          return e(function () {
            try {
              o.resolve((S(a) ? a : i)(n))
            } catch (e) {
              o.reject(e), t(e)
            }
          }), o.promise
        }
      }
    }, p = function (n, a, o, c) {
      var p, f = s(), d = function (e) {
        try {
          return (S(a) ? a : r)(e)
        } catch (n) {
          return t(n), l(n)
        }
      }, h = function (e) {
        try {
          return (S(o) ? o : i)(e)
        } catch (n) {
          return t(n), l(n)
        }
      }, m = function (e) {
        try {
          return (S(c) ? c : r)(e)
        } catch (n) {
          t(n)
        }
      };
      return e(function () {
        u(n).then(function (e) {
          p || (p = !0, f.resolve(u(e).then(d, h, m)))
        }, function (e) {
          p || (p = !0, f.resolve(h(e)))
        }, function (e) {
          p || f.notify(m(e))
        })
      }), f.promise
    };
    return {defer: s, reject: l, when: p, all: o}
  }

  function _n() {
    this.$get = ["$window", "$timeout", function (e, t) {
      var n = e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame, r = e.cancelAnimationFrame || e.webkitCancelAnimationFrame || e.mozCancelAnimationFrame || e.webkitCancelRequestAnimationFrame, i = !!n, a = i ? function (e) {
        var t = n(e);
        return function () {
          r(t)
        }
      } : function (e) {
        var n = t(e, 16.66, !1);
        return function () {
          t.cancel(n)
        }
      };
      return a.supported = i, a
    }]
  }

  function Dn() {
    var e = 10, t = r("$rootScope"), n = null;
    this.digestTtl = function (t) {
      return arguments.length && (e = t), e
    }, this.$get = ["$injector", "$exceptionHandler", "$parse", "$browser", function (r, o, s, u) {
      function c() {
        this.$id = l(), this.$$phase = this.$parent = this.$$watchers = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = null, this["this"] = this.$root = this, this.$$destroyed = !1, this.$$asyncQueue = [], this.$$postDigestQueue = [], this.$$listeners = {}, this.$$listenerCount = {}, this.$$isolateBindings = {}
      }

      function p(e) {
        if (v.$$phase)throw t("inprog", "{0} already in progress", v.$$phase);
        v.$$phase = e
      }

      function f() {
        v.$$phase = null
      }

      function d(e, t) {
        var n = s(e);
        return rt(n, t), n
      }

      function m(e, t, n) {
        do e.$$listenerCount[n] -= t, 0 === e.$$listenerCount[n] && delete e.$$listenerCount[n]; while (e = e.$parent)
      }

      function g() {
      }

      c.prototype = {
        constructor: c, $new: function (e) {
          var t, n;
          return e ? (n = new c, n.$root = this.$root, n.$$asyncQueue = this.$$asyncQueue, n.$$postDigestQueue = this.$$postDigestQueue) : (t = function () {
          }, t.prototype = this, n = new t, n.$id = l()), n["this"] = n, n.$$listeners = {}, n.$$listenerCount = {}, n.$parent = this, n.$$watchers = n.$$nextSibling = n.$$childHead = n.$$childTail = null, n.$$prevSibling = this.$$childTail, this.$$childHead ? (this.$$childTail.$$nextSibling = n, this.$$childTail = n) : this.$$childHead = this.$$childTail = n, n
        }, $watch: function (e, t, r) {
          var i = this, a = d(e, "watch"), o = i.$$watchers, s = {fn: t, last: g, get: a, exp: e, eq: !!r};
          if (n = null, !S(t)) {
            var u = d(t || h, "listener");
            s.fn = function (e, t, n) {
              u(n)
            }
          }
          if ("string" == typeof e && a.constant) {
            var l = s.fn;
            s.fn = function (e, t, n) {
              l.call(this, e, t, n), P(o, s)
            }
          }
          return o || (o = i.$$watchers = []), o.unshift(s), function () {
            P(o, s), n = null
          }
        }, $watchCollection: function (e, t) {
          function n() {
            a = f(l);
            var e, t;
            if (b(a))if (i(a)) {
              o !== d && (o = d, g = o.length = 0, p++), e = a.length, g !== e && (p++, o.length = g = e);
              for (var n = 0; e > n; n++) {
                var r = o[n] !== o[n] && a[n] !== a[n];
                r || o[n] === a[n] || (p++, o[n] = a[n])
              }
            } else {
              o !== h && (o = h = {}, g = 0, p++), e = 0;
              for (t in a)a.hasOwnProperty(t) && (e++, o.hasOwnProperty(t) ? o[t] !== a[t] && (p++, o[t] = a[t]) : (g++, o[t] = a[t], p++));
              if (g > e) {
                p++;
                for (t in o)o.hasOwnProperty(t) && !a.hasOwnProperty(t) && (g--, delete o[t])
              }
            } else o !== a && (o = a, p++);
            return p
          }

          function r() {
            if (m ? (m = !1, t(a, a, l)) : t(a, u, l), c)if (b(a))if (i(a)) {
              u = new Array(a.length);
              for (var e = 0; e < a.length; e++)u[e] = a[e]
            } else {
              u = {};
              for (var n in a)hr.call(a, n) && (u[n] = a[n])
            } else u = a
          }

          var a, o, u, l = this, c = t.length > 1, p = 0, f = s(e), d = [], h = {}, m = !0, g = 0;
          return this.$watch(n, r)
        }, $digest: function () {
          var r, i, a, s, u, l, c, d, h, m, v, y = this.$$asyncQueue, b = this.$$postDigestQueue, x = e, w = this, $ = [];
          p("$digest"), n = null;
          do {
            for (l = !1, d = w; y.length;) {
              try {
                v = y.shift(), v.scope.$eval(v.expression)
              } catch (E) {
                f(), o(E)
              }
              n = null
            }
            e:do {
              if (s = d.$$watchers)for (u = s.length; u--;)try {
                if (r = s[u])if ((i = r.get(d)) === (a = r.last) || (r.eq ? L(i, a) : "number" == typeof i && "number" == typeof a && isNaN(i) && isNaN(a))) {
                  if (r === n) {
                    l = !1;
                    break e
                  }
                } else l = !0, n = r, r.last = r.eq ? R(i) : i, r.fn(i, a === g ? i : a, d), 5 > x && (h = 4 - x, $[h] || ($[h] = []), m = S(r.exp) ? "fn: " + (r.exp.name || r.exp.toString()) : r.exp, m += "; newVal: " + U(i) + "; oldVal: " + U(a), $[h].push(m))
              } catch (E) {
                f(), o(E)
              }
              if (!(c = d.$$childHead || d !== w && d.$$nextSibling))for (; d !== w && !(c = d.$$nextSibling);)d = d.$parent
            } while (d = c);
            if ((l || y.length) && !x--)throw f(), t("infdig", "{0} $digest() iterations reached. Aborting!\nWatchers fired in the last 5 iterations: {1}", e, U($))
          } while (l || y.length);
          for (f(); b.length;)try {
            b.shift()()
          } catch (E) {
            o(E)
          }
        }, $destroy: function () {
          if (!this.$$destroyed) {
            var e = this.$parent;
            this.$broadcast("$destroy"), this.$$destroyed = !0, this !== v && (a(this.$$listenerCount, q(null, m, this)), e.$$childHead == this && (e.$$childHead = this.$$nextSibling), e.$$childTail == this && (e.$$childTail = this.$$prevSibling), this.$$prevSibling && (this.$$prevSibling.$$nextSibling = this.$$nextSibling), this.$$nextSibling && (this.$$nextSibling.$$prevSibling = this.$$prevSibling), this.$parent = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = this.$root = null, this.$$listeners = {}, this.$$watchers = this.$$asyncQueue = this.$$postDigestQueue = [], this.$destroy = this.$digest = this.$apply = h, this.$on = this.$watch = function () {
              return h
            })
          }
        }, $eval: function (e, t) {
          return s(e)(this, t)
        }, $evalAsync: function (e) {
          v.$$phase || v.$$asyncQueue.length || u.defer(function () {
            v.$$asyncQueue.length && v.$digest()
          }), this.$$asyncQueue.push({scope: this, expression: e})
        }, $$postDigest: function (e) {
          this.$$postDigestQueue.push(e)
        }, $apply: function (e) {
          try {
            return p("$apply"), this.$eval(e)
          } catch (t) {
            o(t)
          } finally {
            f();
            try {
              v.$digest()
            } catch (t) {
              throw o(t), t
            }
          }
        }, $on: function (e, t) {
          var n = this.$$listeners[e];
          n || (this.$$listeners[e] = n = []), n.push(t);
          var r = this;
          do r.$$listenerCount[e] || (r.$$listenerCount[e] = 0), r.$$listenerCount[e]++; while (r = r.$parent);
          var i = this;
          return function () {
            n[N(n, t)] = null, m(i, 1, e)
          }
        }, $emit: function (e) {
          var t, n, r, i = [], a = this, s = !1, u = {
            name: e, targetScope: a, stopPropagation: function () {
              s = !0
            }, preventDefault: function () {
              u.defaultPrevented = !0
            }, defaultPrevented: !1
          }, l = F([u], arguments, 1);
          do {
            for (t = a.$$listeners[e] || i, u.currentScope = a, n = 0, r = t.length; r > n; n++)if (t[n])try {
              t[n].apply(null, l)
            } catch (c) {
              o(c)
            } else t.splice(n, 1), n--, r--;
            if (s)return u;
            a = a.$parent
          } while (a);
          return u
        }, $broadcast: function (e) {
          for (var t, n, r, i = this, a = i, s = i, u = {
            name: e, targetScope: i, preventDefault: function () {
              u.defaultPrevented = !0
            }, defaultPrevented: !1
          }, l = F([u], arguments, 1); a = s;) {
            for (u.currentScope = a, t = a.$$listeners[e] || [], n = 0, r = t.length; r > n; n++)if (t[n])try {
              t[n].apply(null, l)
            } catch (c) {
              o(c)
            } else t.splice(n, 1), n--, r--;
            if (!(s = a.$$listenerCount[e] && a.$$childHead || a !== i && a.$$nextSibling))for (; a !== i && !(s = a.$$nextSibling);)a = a.$parent
          }
          return u
        }
      };
      var v = new c;
      return v
    }]
  }

  function Mn() {
    var e = /^\s*(https?|ftp|mailto|tel|file):/, t = /^\s*(https?|ftp|file):|data:image\//;
    this.aHrefSanitizationWhitelist = function (t) {
      return y(t) ? (e = t, this) : e
    }, this.imgSrcSanitizationWhitelist = function (e) {
      return y(e) ? (t = e, this) : t
    }, this.$get = function () {
      return function (n, r) {
        var i, a = r ? t : e;
        return yr && !(yr >= 8) || (i = Fn(n).href, "" === i || i.match(a)) ? n : "unsafe:" + i
      }
    }
  }

  function On(e) {
    return e.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08")
  }

  function Nn(e) {
    if ("self" === e)return e;
    if (x(e)) {
      if (e.indexOf("***") > -1)throw mi("iwcard", "Illegal sequence *** in string matcher.  String: {0}", e);
      return e = On(e).replace("\\*\\*", ".*").replace("\\*", "[^:/.?&;]*"), new RegExp("^" + e + "$")
    }
    if (T(e))return new RegExp("^" + e.source + "$");
    throw mi("imatcher", 'Matchers may only be "self", string patterns or RegExp objects')
  }

  function Pn(e) {
    var t = [];
    return y(e) && a(e, function (e) {
      t.push(Nn(e))
    }), t
  }

  function Rn() {
    this.SCE_CONTEXTS = gi;
    var e = ["self"], t = [];
    this.resourceUrlWhitelist = function (t) {
      return arguments.length && (e = Pn(t)), e
    }, this.resourceUrlBlacklist = function (e) {
      return arguments.length && (t = Pn(e)), t
    }, this.$get = ["$injector", function (r) {
      function i(e, t) {
        return "self" === e ? Bn(t) : !!e.exec(t.href)
      }

      function a(n) {
        var r, a, o = Fn(n.toString()), s = !1;
        for (r = 0, a = e.length; a > r; r++)if (i(e[r], o)) {
          s = !0;
          break
        }
        if (s)for (r = 0, a = t.length; a > r; r++)if (i(t[r], o)) {
          s = !1;
          break
        }
        return s
      }

      function o(e) {
        var t = function (e) {
          this.$$unwrapTrustedValue = function () {
            return e
          }
        };
        return e && (t.prototype = new e), t.prototype.valueOf = function () {
          return this.$$unwrapTrustedValue()
        }, t.prototype.toString = function () {
          return this.$$unwrapTrustedValue().toString()
        }, t
      }

      function s(e, t) {
        var r = f.hasOwnProperty(e) ? f[e] : null;
        if (!r)throw mi("icontext", "Attempted to trust a value in invalid context. Context: {0}; Value: {1}", e, t);
        if (null === t || t === n || "" === t)return t;
        if ("string" != typeof t)throw mi("itype", "Attempted to trust a non-string value in a content requiring a string: Context: {0}", e);
        return new r(t)
      }

      function u(e) {
        return e instanceof p ? e.$$unwrapTrustedValue() : e
      }

      function l(e, t) {
        if (null === t || t === n || "" === t)return t;
        var r = f.hasOwnProperty(e) ? f[e] : null;
        if (r && t instanceof r)return t.$$unwrapTrustedValue();
        if (e === gi.RESOURCE_URL) {
          if (a(t))return t;
          throw mi("insecurl", "Blocked loading resource from url not allowed by $sceDelegate policy.  URL: {0}", t.toString())
        }
        if (e === gi.HTML)return c(t);
        throw mi("unsafe", "Attempting to use an unsafe value in a safe context.")
      }

      var c = function () {
        throw mi("unsafe", "Attempting to use an unsafe value in a safe context.")
      };
      r.has("$sanitize") && (c = r.get("$sanitize"));
      var p = o(), f = {};
      return f[gi.HTML] = o(p), f[gi.CSS] = o(p), f[gi.URL] = o(p), f[gi.JS] = o(p), f[gi.RESOURCE_URL] = o(f[gi.URL]), {
        trustAs: s,
        getTrusted: l,
        valueOf: u
      }
    }]
  }

  function In() {
    var e = !0;
    this.enabled = function (t) {
      return arguments.length && (e = !!t), e
    }, this.$get = ["$parse", "$sniffer", "$sceDelegate", function (t, n, r) {
      if (e && n.msie && n.msieDocumentMode < 8)throw mi("iequirks", "Strict Contextual Escaping does not support Internet Explorer version < 9 in quirks mode.  You can fix this by adding the text <!doctype html> to the top of your HTML document.  See http://docs.angularjs.org/api/ng.$sce for more information.");
      var i = R(gi);
      i.isEnabled = function () {
        return e
      }, i.trustAs = r.trustAs, i.getTrusted = r.getTrusted, i.valueOf = r.valueOf, e || (i.trustAs = i.getTrusted = function (e, t) {
        return t
      }, i.valueOf = m), i.parseAs = function (e, n) {
        var r = t(n);
        return r.literal && r.constant ? r : function (t, n) {
          return i.getTrusted(e, r(t, n))
        }
      };
      var o = i.parseAs, s = i.getTrusted, u = i.trustAs;
      return a(gi, function (e, t) {
        var n = dr(t);
        i[ct("parse_as_" + n)] = function (t) {
          return o(e, t)
        }, i[ct("get_trusted_" + n)] = function (t) {
          return s(e, t)
        }, i[ct("trust_as_" + n)] = function (t) {
          return u(e, t)
        }
      }), i
    }]
  }

  function Ln() {
    this.$get = ["$window", "$document", function (e, t) {
      var n, r, i = {}, a = f((/android (\d+)/.exec(dr((e.navigator || {}).userAgent)) || [])[1]), o = /Boxee/i.test((e.navigator || {}).userAgent), s = t[0] || {}, u = s.documentMode, l = /^(Moz|webkit|O|ms)(?=[A-Z])/, c = s.body && s.body.style, p = !1, d = !1;
      if (c) {
        for (var h in c)if (r = l.exec(h)) {
          n = r[0], n = n.substr(0, 1).toUpperCase() + n.substr(1);
          break
        }
        n || (n = "WebkitOpacity"in c && "webkit"), p = !!("transition"in c || n + "Transition"in c), d = !!("animation"in c || n + "Animation"in c), !a || p && d || (p = x(s.body.style.webkitTransition), d = x(s.body.style.webkitAnimation))
      }
      return {
        history: !(!e.history || !e.history.pushState || 4 > a || o),
        hashchange: "onhashchange"in e && (!u || u > 7),
        hasEvent: function (e) {
          if ("input" == e && 9 == yr)return !1;
          if (v(i[e])) {
            var t = s.createElement("div");
            i[e] = "on" + e in t
          }
          return i[e]
        },
        csp: j(),
        vendorPrefix: n,
        transitions: p,
        animations: d,
        android: a,
        msie: yr,
        msieDocumentMode: u
      }
    }]
  }

  function jn() {
    this.$get = ["$rootScope", "$browser", "$q", "$exceptionHandler", function (e, t, n, r) {
      function i(i, o, s) {
        var u, l = n.defer(), c = l.promise, p = y(s) && !s;
        return u = t.defer(function () {
          try {
            l.resolve(i())
          } catch (t) {
            l.reject(t), r(t)
          } finally {
            delete a[c.$$timeoutId]
          }
          p || e.$apply()
        }, o), c.$$timeoutId = u, a[u] = l, c
      }

      var a = {};
      return i.cancel = function (e) {
        return e && e.$$timeoutId in a ? (a[e.$$timeoutId].reject("canceled"), delete a[e.$$timeoutId], t.defer.cancel(e.$$timeoutId)) : !1
      }, i
    }]
  }

  function Fn(e) {
    var t = e;
    return yr && (vi.setAttribute("href", t), t = vi.href), vi.setAttribute("href", t), {
      href: vi.href,
      protocol: vi.protocol ? vi.protocol.replace(/:$/, "") : "",
      host: vi.host,
      search: vi.search ? vi.search.replace(/^\?/, "") : "",
      hash: vi.hash ? vi.hash.replace(/^#/, "") : "",
      hostname: vi.hostname,
      port: vi.port,
      pathname: "/" === vi.pathname.charAt(0) ? vi.pathname : "/" + vi.pathname
    }
  }

  function Bn(e) {
    var t = x(e) ? Fn(e) : e;
    return t.protocol === yi.protocol && t.host === yi.host
  }

  function qn() {
    this.$get = g(e)
  }

  function Vn(e) {
    function t(r, i) {
      if (b(r)) {
        var o = {};
        return a(r, function (e, n) {
          o[n] = t(n, e)
        }), o
      }
      return e.factory(r + n, i)
    }

    var n = "Filter";
    this.register = t, this.$get = ["$injector", function (e) {
      return function (t) {
        return e.get(t + n)
      }
    }], t("currency", Hn), t("date", Zn), t("filter", Un), t("json", Jn), t("limitTo", er), t("lowercase", Ei), t("number", Wn), t("orderBy", tr), t("uppercase", Si)
  }

  function Un() {
    return function (e, t, n) {
      if (!E(e))return e;
      var r = typeof n, i = [];
      i.check = function (e) {
        for (var t = 0; t < i.length; t++)if (!i[t](e))return !1;
        return !0
      }, "function" !== r && (n = "boolean" === r && n ? function (e, t) {
        return kr.equals(e, t)
      } : function (e, t) {
        if (e && t && "object" == typeof e && "object" == typeof t) {
          for (var r in e)if ("$" !== r.charAt(0) && hr.call(e, r) && n(e[r], t[r]))return !0;
          return !1
        }
        return t = ("" + t).toLowerCase(), ("" + e).toLowerCase().indexOf(t) > -1
      });
      var a = function (e, t) {
        if ("string" == typeof t && "!" === t.charAt(0))return !a(e, t.substr(1));
        switch (typeof e) {
          case"boolean":
          case"number":
          case"string":
            return n(e, t);
          case"object":
            switch (typeof t) {
              case"object":
                return n(e, t);
              default:
                for (var r in e)if ("$" !== r.charAt(0) && a(e[r], t))return !0
            }
            return !1;
          case"array":
            for (var i = 0; i < e.length; i++)if (a(e[i], t))return !0;
            return !1;
          default:
            return !1
        }
      };
      switch (typeof t) {
        case"boolean":
        case"number":
        case"string":
          t = {$: t};
        case"object":
          for (var o in t)!function (e) {
            "undefined" != typeof t[e] && i.push(function (n) {
              return a("$" == e ? n : n && n[e], t[e])
            })
          }(o);
          break;
        case"function":
          i.push(t);
          break;
        default:
          return e
      }
      for (var s = [], u = 0; u < e.length; u++) {
        var l = e[u];
        i.check(l) && s.push(l)
      }
      return s
    }
  }

  function Hn(e) {
    var t = e.NUMBER_FORMATS;
    return function (e, n) {
      return v(n) && (n = t.CURRENCY_SYM), Yn(e, t.PATTERNS[1], t.GROUP_SEP, t.DECIMAL_SEP, 2).replace(/\u00A4/g, n)
    }
  }

  function Wn(e) {
    var t = e.NUMBER_FORMATS;
    return function (e, n) {
      return Yn(e, t.PATTERNS[0], t.GROUP_SEP, t.DECIMAL_SEP, n)
    }
  }

  function Yn(e, t, n, r, i) {
    if (null == e || !isFinite(e) || b(e))return "";
    var a = 0 > e;
    e = Math.abs(e);
    var o = e + "", s = "", u = [], l = !1;
    if (-1 !== o.indexOf("e")) {
      var c = o.match(/([\d\.]+)e(-?)(\d+)/);
      c && "-" == c[2] && c[3] > i + 1 ? o = "0" : (s = o, l = !0)
    }
    if (l)i > 0 && e > -1 && 1 > e && (s = e.toFixed(i)); else {
      var p = (o.split(bi)[1] || "").length;
      v(i) && (i = Math.min(Math.max(t.minFrac, p), t.maxFrac));
      var f = Math.pow(10, i);
      e = Math.round(e * f) / f;
      var d = ("" + e).split(bi), h = d[0];
      d = d[1] || "";
      var m, g = 0, y = t.lgSize, x = t.gSize;
      if (h.length >= y + x)for (g = h.length - y, m = 0; g > m; m++)(g - m) % x === 0 && 0 !== m && (s += n), s += h.charAt(m);
      for (m = g; m < h.length; m++)(h.length - m) % y === 0 && 0 !== m && (s += n), s += h.charAt(m);
      for (; d.length < i;)d += "0";
      i && "0" !== i && (s += r + d.substr(0, i))
    }
    return u.push(a ? t.negPre : t.posPre), u.push(s), u.push(a ? t.negSuf : t.posSuf), u.join("")
  }

  function zn(e, t, n) {
    var r = "";
    for (0 > e && (r = "-", e = -e), e = "" + e; e.length < t;)e = "0" + e;
    return n && (e = e.substr(e.length - t)), r + e
  }

  function Gn(e, t, n, r) {
    return n = n || 0, function (i) {
      var a = i["get" + e]();
      return (n > 0 || a > -n) && (a += n), 0 === a && -12 == n && (a = 12), zn(a, t, r)
    }
  }

  function Xn(e, t) {
    return function (n, r) {
      var i = n["get" + e](), a = mr(t ? "SHORT" + e : e);
      return r[a][i]
    }
  }

  function Kn(e) {
    var t = -1 * e.getTimezoneOffset(), n = t >= 0 ? "+" : "";
    return n += zn(Math[t > 0 ? "floor" : "ceil"](t / 60), 2) + zn(Math.abs(t % 60), 2)
  }

  function Qn(e, t) {
    return e.getHours() < 12 ? t.AMPMS[0] : t.AMPMS[1]
  }

  function Zn(e) {
    function t(e) {
      var t;
      if (t = e.match(n)) {
        var r = new Date(0), i = 0, a = 0, o = t[8] ? r.setUTCFullYear : r.setFullYear, s = t[8] ? r.setUTCHours : r.setHours;
        t[9] && (i = f(t[9] + t[10]), a = f(t[9] + t[11])), o.call(r, f(t[1]), f(t[2]) - 1, f(t[3]));
        var u = f(t[4] || 0) - i, l = f(t[5] || 0) - a, c = f(t[6] || 0), p = Math.round(1e3 * parseFloat("0." + (t[7] || 0)));
        return s.call(r, u, l, c, p), r
      }
      return e
    }

    var n = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;
    return function (n, r) {
      var i, o, s = "", u = [];
      if (r = r || "mediumDate", r = e.DATETIME_FORMATS[r] || r, x(n) && (n = $i.test(n) ? f(n) : t(n)), w(n) && (n = new Date(n)), !$(n))return n;
      for (; r;)o = wi.exec(r), o ? (u = F(u, o, 1), r = u.pop()) : (u.push(r), r = null);
      return a(u, function (t) {
        i = xi[t], s += i ? i(n, e.DATETIME_FORMATS) : t.replace(/(^'|'$)/g, "").replace(/''/g, "'")
      }), s
    }
  }

  function Jn() {
    return function (e) {
      return U(e, !0)
    }
  }

  function er() {
    return function (e, t) {
      if (!E(e) && !x(e))return e;
      if (t = f(t), x(e))return t ? t >= 0 ? e.slice(0, t) : e.slice(t, e.length) : "";
      var n, r, i = [];
      for (t > e.length ? t = e.length : t < -e.length && (t = -e.length), t > 0 ? (n = 0, r = t) : (n = e.length + t, r = e.length); r > n; n++)i.push(e[n]);
      return i
    }
  }

  function tr(e) {
    return function (t, n, r) {
      function i(e, t) {
        for (var r = 0; r < n.length; r++) {
          var i = n[r](e, t);
          if (0 !== i)return i
        }
        return 0
      }

      function a(e, t) {
        return W(t) ? function (t, n) {
          return e(n, t)
        } : e
      }

      function o(e, t) {
        var n = typeof e, r = typeof t;
        return n == r ? ("string" == n && (e = e.toLowerCase(), t = t.toLowerCase()), e === t ? 0 : t > e ? -1 : 1) : r > n ? -1 : 1
      }

      if (!E(t))return t;
      if (!n)return t;
      n = E(n) ? n : [n], n = M(n, function (t) {
        var n = !1, r = t || m;
        if (x(t) && (("+" == t.charAt(0) || "-" == t.charAt(0)) && (n = "-" == t.charAt(0), t = t.substring(1)), r = e(t), r.constant)) {
          var i = r();
          return a(function (e, t) {
            return o(e[i], t[i])
          }, n)
        }
        return a(function (e, t) {
          return o(r(e), r(t))
        }, n)
      });
      for (var s = [], u = 0; u < t.length; u++)s.push(t[u]);
      return s.sort(a(i, r))
    }
  }

  function nr(e) {
    return S(e) && (e = {link: e}), e.restrict = e.restrict || "AC", g(e)
  }

  function rr(e, t, n, r) {
    function i(t, n) {
      n = n ? "-" + et(n, "-") : "", r.removeClass(e, (t ? Li : Ii) + n), r.addClass(e, (t ? Ii : Li) + n)
    }

    var o = this, s = e.parent().controller("form") || ki, u = 0, l = o.$error = {}, c = [];
    o.$name = t.name || t.ngForm, o.$dirty = !1, o.$pristine = !0, o.$valid = !0, o.$invalid = !1, s.$addControl(o), e.addClass(ji), i(!0), o.$addControl = function (e) {
      it(e.$name, "input"), c.push(e), e.$name && (o[e.$name] = e)
    }, o.$removeControl = function (e) {
      e.$name && o[e.$name] === e && delete o[e.$name], a(l, function (t, n) {
        o.$setValidity(n, !0, e)
      }), P(c, e)
    }, o.$setValidity = function (e, t, n) {
      var r = l[e];
      if (t)r && (P(r, n), r.length || (u--, u || (i(t), o.$valid = !0, o.$invalid = !1), l[e] = !1, i(!0, e), s.$setValidity(e, !0, o))); else {
        if (u || i(t), r) {
          if (O(r, n))return
        } else l[e] = r = [], u++, i(!1, e), s.$setValidity(e, !1, o);
        r.push(n), o.$valid = !1, o.$invalid = !0
      }
    }, o.$setDirty = function () {
      r.removeClass(e, ji), r.addClass(e, Fi), o.$dirty = !0, o.$pristine = !1, s.$setDirty()
    }, o.$setPristine = function () {
      r.removeClass(e, Fi), r.addClass(e, ji), o.$dirty = !1, o.$pristine = !0, a(c, function (e) {
        e.$setPristine()
      })
    }
  }

  function ir(e, t, r, i) {
    return e.$setValidity(t, r), r ? i : n
  }

  function ar(e, t, n) {
    var r = n.prop("validity");
    if (b(r)) {
      var i = function (n) {
        return e.$error[t] || !(r.badInput || r.customError || r.typeMismatch) || r.valueMissing ? n : void e.$setValidity(t, !1)
      };
      e.$parsers.push(i)
    }
  }

  function or(e, t, n, i, a, o) {
    var s = t.prop("validity");
    if (!a.android) {
      var u = !1;
      t.on("compositionstart", function () {
        u = !0
      }), t.on("compositionend", function () {
        u = !1, l()
      })
    }
    var l = function () {
      if (!u) {
        var r = t.val();
        W(n.ngTrim || "T") && (r = _r(r)), (i.$viewValue !== r || s && "" === r && !s.valueMissing) && (e.$$phase ? i.$setViewValue(r) : e.$apply(function () {
          i.$setViewValue(r)
        }))
      }
    };
    if (a.hasEvent("input"))t.on("input", l); else {
      var c, p = function () {
        c || (c = o.defer(function () {
          l(), c = null
        }))
      };
      t.on("keydown", function (e) {
        var t = e.keyCode;
        91 === t || t > 15 && 19 > t || t >= 37 && 40 >= t || p()
      }), a.hasEvent("paste") && t.on("paste cut", p)
    }
    t.on("change", l), i.$render = function () {
      t.val(i.$isEmpty(i.$viewValue) ? "" : i.$viewValue)
    };
    var d, h, m = n.ngPattern;
    if (m) {
      var g = function (e, t) {
        return ir(i, "pattern", i.$isEmpty(t) || e.test(t), t)
      };
      h = m.match(/^\/(.*)\/([gim]*)$/), h ? (m = new RegExp(h[1], h[2]), d = function (e) {
        return g(m, e)
      }) : d = function (n) {
        var i = e.$eval(m);
        if (!i || !i.test)throw r("ngPattern")("noregexp", "Expected {0} to be a RegExp but was {1}. Element: {2}", m, i, Y(t));
        return g(i, n)
      }, i.$formatters.push(d), i.$parsers.push(d)
    }
    if (n.ngMinlength) {
      var v = f(n.ngMinlength), y = function (e) {
        return ir(i, "minlength", i.$isEmpty(e) || e.length >= v, e)
      };
      i.$parsers.push(y), i.$formatters.push(y)
    }
    if (n.ngMaxlength) {
      var b = f(n.ngMaxlength), x = function (e) {
        return ir(i, "maxlength", i.$isEmpty(e) || e.length <= b, e)
      };
      i.$parsers.push(x), i.$formatters.push(x)
    }
  }

  function sr(e, t, r, i, a, o) {
    if (or(e, t, r, i, a, o), i.$parsers.push(function (e) {
        var t = i.$isEmpty(e);
        return t || Ni.test(e) ? (i.$setValidity("number", !0), "" === e ? null : t ? e : parseFloat(e)) : (i.$setValidity("number", !1), n)
      }), ar(i, "number", t), i.$formatters.push(function (e) {
        return i.$isEmpty(e) ? "" : "" + e
      }), r.min) {
      var s = function (e) {
        var t = parseFloat(r.min);
        return ir(i, "min", i.$isEmpty(e) || e >= t, e)
      };
      i.$parsers.push(s), i.$formatters.push(s)
    }
    if (r.max) {
      var u = function (e) {
        var t = parseFloat(r.max);
        return ir(i, "max", i.$isEmpty(e) || t >= e, e)
      };
      i.$parsers.push(u), i.$formatters.push(u)
    }
    i.$formatters.push(function (e) {
      return ir(i, "number", i.$isEmpty(e) || w(e), e)
    })
  }

  function ur(e, t, n, r, i, a) {
    or(e, t, n, r, i, a);
    var o = function (e) {
      return ir(r, "url", r.$isEmpty(e) || Mi.test(e), e)
    };
    r.$formatters.push(o), r.$parsers.push(o)
  }

  function lr(e, t, n, r, i, a) {
    or(e, t, n, r, i, a);
    var o = function (e) {
      return ir(r, "email", r.$isEmpty(e) || Oi.test(e), e)
    };
    r.$formatters.push(o), r.$parsers.push(o)
  }

  function cr(e, t, n, r) {
    v(n.name) && t.attr("name", l()), t.on("click", function () {
      t[0].checked && e.$apply(function () {
        r.$setViewValue(n.value)
      })
    }), r.$render = function () {
      var e = n.value;
      t[0].checked = e == r.$viewValue
    }, n.$observe("value", r.$render)
  }

  function pr(e, t, n, r) {
    var i = n.ngTrueValue, a = n.ngFalseValue;
    x(i) || (i = !0), x(a) || (a = !1), t.on("click", function () {
      e.$apply(function () {
        r.$setViewValue(t[0].checked)
      })
    }), r.$render = function () {
      t[0].checked = r.$viewValue
    }, r.$isEmpty = function (e) {
      return e !== i
    }, r.$formatters.push(function (e) {
      return e === i
    }), r.$parsers.push(function (e) {
      return e ? i : a
    })
  }

  function fr(e, t) {
    return e = "ngClass" + e, ["$animate", function (n) {
      function r(e, t) {
        var n = [];
        e:for (var r = 0; r < e.length; r++) {
          for (var i = e[r], a = 0; a < t.length; a++)if (i == t[a])continue e;
          n.push(i)
        }
        return n
      }

      function i(e) {
        if (E(e))return e;
        if (x(e))return e.split(" ");
        if (b(e)) {
          var t = [];
          return a(e, function (e, n) {
            e && t.push(n)
          }), t
        }
        return e
      }

      return {
        restrict: "AC", link: function (o, s, u) {
          function l(e) {
            var t = p(e, 1);
            u.$addClass(t)
          }

          function c(e) {
            var t = p(e, -1);
            u.$removeClass(t)
          }

          function p(e, t) {
            var n = s.data("$classCounts") || {}, r = [];
            return a(e, function (e) {
              (t > 0 || n[e]) && (n[e] = (n[e] || 0) + t, n[e] === +(t > 0) && r.push(e))
            }), s.data("$classCounts", n), r.join(" ")
          }

          function f(e, t) {
            var i = r(t, e), a = r(e, t);
            a = p(a, -1), i = p(i, 1), 0 === i.length ? n.removeClass(s, a) : 0 === a.length ? n.addClass(s, i) : n.setClass(s, i, a)
          }

          function d(e) {
            if (t === !0 || o.$index % 2 === t) {
              var n = i(e || []);
              if (h) {
                if (!L(e, h)) {
                  var r = i(h);
                  f(r, n)
                }
              } else l(n)
            }
            h = R(e)
          }

          var h;
          o.$watch(u[e], d, !0), u.$observe("class", function () {
            d(o.$eval(u[e]))
          }), "ngClass" !== e && o.$watch("$index", function (n, r) {
            var a = 1 & n;
            if (a !== r & 1) {
              var s = i(o.$eval(u[e]));
              a === t ? l(s) : c(s)
            }
          })
        }
      }
    }]
  }

  var dr = function (e) {
    return x(e) ? e.toLowerCase() : e
  }, hr = Object.prototype.hasOwnProperty, mr = function (e) {
    return x(e) ? e.toUpperCase() : e
  }, gr = function (e) {
    return x(e) ? e.replace(/[A-Z]/g, function (e) {
      return String.fromCharCode(32 | e.charCodeAt(0))
    }) : e
  }, vr = function (e) {
    return x(e) ? e.replace(/[a-z]/g, function (e) {
      return String.fromCharCode(-33 & e.charCodeAt(0))
    }) : e
  };
  "i" !== "I".toLowerCase() && (dr = gr, mr = vr);
  var yr, br, xr, wr, $r, Er = [].slice, Sr = [].push, Tr = Object.prototype.toString, Cr = r("ng"), kr = (e.angular, e.angular || (e.angular = {})), Ar = ["0", "0", "0"];
  yr = f((/msie (\d+)/.exec(dr(navigator.userAgent)) || [])[1]), isNaN(yr) && (yr = f((/trident\/.*; rv:(\d+)/.exec(dr(navigator.userAgent)) || [])[1])), h.$inject = [], m.$inject = [];
  var _r = function () {
    return String.prototype.trim ? function (e) {
      return x(e) ? e.trim() : e
    } : function (e) {
      return x(e) ? e.replace(/^\s\s*/, "").replace(/\s\s*$/, "") : e
    }
  }();
  $r = 9 > yr ? function (e) {
    return e = e.nodeName ? e : e[0], e.scopeName && "HTML" != e.scopeName ? mr(e.scopeName + ":" + e.nodeName) : e.nodeName
  } : function (e) {
    return e.nodeName ? e.nodeName : e[0].nodeName
  };
  var Dr = /[A-Z]/g, Mr = {
    full: "1.2.16",
    major: 1,
    minor: 2,
    dot: 16,
    codeName: "badger-enumeration"
  }, Or = mt.cache = {}, Nr = mt.expando = "ng-" + (new Date).getTime(), Pr = 1, Rr = e.document.addEventListener ? function (e, t, n) {
    e.addEventListener(t, n, !1)
  } : function (e, t, n) {
    e.attachEvent("on" + t, n)
  }, Ir = e.document.removeEventListener ? function (e, t, n) {
    e.removeEventListener(t, n, !1)
  } : function (e, t, n) {
    e.detachEvent("on" + t, n)
  }, Lr = (mt._data = function (e) {
    return this.cache[e[this.expando]] || {}
  }, /([\:\-\_]+(.))/g), jr = /^moz([A-Z])/, Fr = r("jqLite"), Br = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, qr = /<|&#?\w+;/, Vr = /<([\w:]+)/, Ur = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, Hr = {
    option: [1, '<select multiple="multiple">', "</select>"],
    thead: [1, "<table>", "</table>"],
    col: [2, "<table><colgroup>", "</colgroup></table>"],
    tr: [2, "<table><tbody>", "</tbody></table>"],
    td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
    _default: [0, "", ""]
  };
  Hr.optgroup = Hr.option, Hr.tbody = Hr.tfoot = Hr.colgroup = Hr.caption = Hr.thead, Hr.th = Hr.td;
  var Wr = mt.prototype = {
    ready: function (n) {
      function r() {
        i || (i = !0, n())
      }

      var i = !1;
      "complete" === t.readyState ? setTimeout(r) : (this.on("DOMContentLoaded", r), mt(e).on("load", r))
    }, toString: function () {
      var e = [];
      return a(this, function (t) {
        e.push("" + t)
      }), "[" + e.join(", ") + "]"
    }, eq: function (e) {
      return br(e >= 0 ? this[e] : this[this.length + e])
    }, length: 0, push: Sr, sort: [].sort, splice: [].splice
  }, Yr = {};
  a("multiple,selected,checked,disabled,readOnly,required,open".split(","), function (e) {
    Yr[dr(e)] = e
  });
  var zr = {};
  a("input,select,option,textarea,button,form,details".split(","), function (e) {
    zr[mr(e)] = !0
  }), a({
    data: wt, inheritedData: kt, scope: function (e) {
      return br(e).data("$scope") || kt(e.parentNode || e, ["$isolateScope", "$scope"])
    }, isolateScope: function (e) {
      return br(e).data("$isolateScope") || br(e).data("$isolateScopeNoTemplate")
    }, controller: Ct, injector: function (e) {
      return kt(e, "$injector")
    }, removeAttr: function (e, t) {
      e.removeAttribute(t)
    }, hasClass: $t, css: function (e, t, r) {
      if (t = ct(t), !y(r)) {
        var i;
        return 8 >= yr && (i = e.currentStyle && e.currentStyle[t], "" === i && (i = "auto")), i = i || e.style[t], 8 >= yr && (i = "" === i ? n : i), i
      }
      e.style[t] = r
    }, attr: function (e, t, r) {
      var i = dr(t);
      if (Yr[i]) {
        if (!y(r))return e[t] || (e.attributes.getNamedItem(t) || h).specified ? i : n;
        r ? (e[t] = !0, e.setAttribute(t, i)) : (e[t] = !1, e.removeAttribute(i))
      } else if (y(r))e.setAttribute(t, r); else if (e.getAttribute) {
        var a = e.getAttribute(t, 2);
        return null === a ? n : a
      }
    }, prop: function (e, t, n) {
      return y(n) ? void(e[t] = n) : e[t]
    }, text: function () {
      function e(e, n) {
        var r = t[e.nodeType];
        return v(n) ? r ? e[r] : "" : void(e[r] = n)
      }

      var t = [];
      return 9 > yr ? (t[1] = "innerText", t[3] = "nodeValue") : t[1] = t[3] = "textContent", e.$dv = "", e
    }(), val: function (e, t) {
      if (v(t)) {
        if ("SELECT" === $r(e) && e.multiple) {
          var n = [];
          return a(e.options, function (e) {
            e.selected && n.push(e.value || e.text)
          }), 0 === n.length ? null : n
        }
        return e.value
      }
      e.value = t
    }, html: function (e, t) {
      if (v(t))return e.innerHTML;
      for (var n = 0, r = e.childNodes; n < r.length; n++)vt(r[n]);
      e.innerHTML = t
    }, empty: At
  }, function (e, t) {
    mt.prototype[t] = function (t, r) {
      var i, a;
      if (e !== At && (2 == e.length && e !== $t && e !== Ct ? t : r) === n) {
        if (b(t)) {
          for (i = 0; i < this.length; i++)if (e === wt)e(this[i], t); else for (a in t)e(this[i], a, t[a]);
          return this
        }
        for (var o = e.$dv, s = o === n ? Math.min(this.length, 1) : this.length, u = 0; s > u; u++) {
          var l = e(this[u], t, r);
          o = o ? o + l : l
        }
        return o
      }
      for (i = 0; i < this.length; i++)e(this[i], t, r);
      return this
    }
  }), a({
    removeData: bt, dealoc: vt, on: function $a(e, n, r, i) {
      if (y(i))throw Fr("onargs", "jqLite#on() does not support the `selector` or `eventData` parameters");
      var o = xt(e, "events"), s = xt(e, "handle");
      o || xt(e, "events", o = {}), s || xt(e, "handle", s = Dt(e, o)), a(n.split(" "), function (n) {
        var i = o[n];
        if (!i) {
          if ("mouseenter" == n || "mouseleave" == n) {
            var a = t.body.contains || t.body.compareDocumentPosition ? function (e, t) {
              var n = 9 === e.nodeType ? e.documentElement : e, r = t && t.parentNode;
              return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)))
            } : function (e, t) {
              if (t)for (; t = t.parentNode;)if (t === e)return !0;
              return !1
            };
            o[n] = [];
            var u = {mouseleave: "mouseout", mouseenter: "mouseover"};
            $a(e, u[n], function (e) {
              var t = this, r = e.relatedTarget;
              (!r || r !== t && !a(t, r)) && s(e, n)
            })
          } else Rr(e, n, s), o[n] = [];
          i = o[n]
        }
        i.push(r)
      })
    }, off: yt, one: function (e, t, n) {
      e = br(e), e.on(t, function r() {
        e.off(t, n), e.off(t, r)
      }), e.on(t, n)
    }, replaceWith: function (e, t) {
      var n, r = e.parentNode;
      vt(e), a(new mt(t), function (t) {
        n ? r.insertBefore(t, n.nextSibling) : r.replaceChild(t, e), n = t
      })
    }, children: function (e) {
      var t = [];
      return a(e.childNodes, function (e) {
        1 === e.nodeType && t.push(e)
      }), t
    }, contents: function (e) {
      return e.contentDocument || e.childNodes || []
    }, append: function (e, t) {
      a(new mt(t), function (t) {
        (1 === e.nodeType || 11 === e.nodeType) && e.appendChild(t)
      })
    }, prepend: function (e, t) {
      if (1 === e.nodeType) {
        var n = e.firstChild;
        a(new mt(t), function (t) {
          e.insertBefore(t, n)
        })
      }
    }, wrap: function (e, t) {
      t = br(t)[0];
      var n = e.parentNode;
      n && n.replaceChild(t, e), t.appendChild(e)
    }, remove: function (e) {
      vt(e);
      var t = e.parentNode;
      t && t.removeChild(e)
    }, after: function (e, t) {
      var n = e, r = e.parentNode;
      a(new mt(t), function (e) {
        r.insertBefore(e, n.nextSibling), n = e
      })
    }, addClass: St, removeClass: Et, toggleClass: function (e, t, n) {
      t && a(t.split(" "), function (t) {
        var r = n;
        v(r) && (r = !$t(e, t)), (r ? St : Et)(e, t)
      })
    }, parent: function (e) {
      var t = e.parentNode;
      return t && 11 !== t.nodeType ? t : null
    }, next: function (e) {
      if (e.nextElementSibling)return e.nextElementSibling;
      for (var t = e.nextSibling; null != t && 1 !== t.nodeType;)t = t.nextSibling;
      return t
    }, find: function (e, t) {
      return e.getElementsByTagName ? e.getElementsByTagName(t) : []
    }, clone: gt, triggerHandler: function (e, t, n) {
      var r = (xt(e, "events") || {})[t];
      n = n || [];
      var i = [{preventDefault: h, stopPropagation: h}];
      a(r, function (t) {
        t.apply(e, i.concat(n))
      })
    }
  }, function (e, t) {
    mt.prototype[t] = function (t, n, r) {
      for (var i, a = 0; a < this.length; a++)v(i) ? (i = e(this[a], t, n, r), y(i) && (i = br(i))) : Tt(i, e(this[a], t, n, r));
      return y(i) ? i : this
    }, mt.prototype.bind = mt.prototype.on, mt.prototype.unbind = mt.prototype.off
  }), Ot.prototype = {
    put: function (e, t) {
      this[Mt(e)] = t
    }, get: function (e) {
      return this[Mt(e)]
    }, remove: function (e) {
      var t = this[e = Mt(e)];
      return delete this[e], t
    }
  };
  var Gr = /^function\s*[^\(]*\(\s*([^\)]*)\)/m, Xr = /,/, Kr = /^\s*(_?)(\S+?)\1\s*$/, Qr = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm, Zr = r("$injector"), Jr = r("$animate"), ei = ["$provide", function (e) {
    this.$$selectors = {}, this.register = function (t, n) {
      var r = t + "-animation";
      if (t && "." != t.charAt(0))throw Jr("notcsel", "Expecting class selector starting with '.' got '{0}'.", t);
      this.$$selectors[t.substr(1)] = r, e.factory(r, n)
    }, this.classNameFilter = function (e) {
      return 1 === arguments.length && (this.$$classNameFilter = e instanceof RegExp ? e : null), this.$$classNameFilter
    }, this.$get = ["$timeout", "$$asyncCallback", function (e, t) {
      function n(e) {
        e && t(e)
      }

      return {
        enter: function (e, t, r, i) {
          r ? r.after(e) : (t && t[0] || (t = r.parent()), t.append(e)), n(i)
        }, leave: function (e, t) {
          e.remove(), n(t)
        }, move: function (e, t, n, r) {
          this.enter(e, t, n, r)
        }, addClass: function (e, t, r) {
          t = x(t) ? t : E(t) ? t.join(" ") : "", a(e, function (e) {
            St(e, t)
          }), n(r)
        }, removeClass: function (e, t, r) {
          t = x(t) ? t : E(t) ? t.join(" ") : "", a(e, function (e) {
            Et(e, t)
          }), n(r)
        }, setClass: function (e, t, r, i) {
          a(e, function (e) {
            St(e, t), Et(e, r)
          }), n(i)
        }, enabled: h
      }
    }]
  }], ti = r("$compile");
  qt.$inject = ["$provide", "$$sanitizeUriProvider"];
  var ni = /^(x[\:\-_]|data[\:\-_])/i, ri = r("$interpolate"), ii = /^([^\?#]*)(\?([^#]*))?(#(.*))?$/, ai = {
    http: 80,
    https: 443,
    ftp: 21
  }, oi = r("$location");
  hn.prototype = dn.prototype = fn.prototype = {
    $$html5: !1,
    $$replace: !1,
    absUrl: mn("$$absUrl"),
    url: function (e, t) {
      if (v(e))return this.$$url;
      var n = ii.exec(e);
      return n[1] && this.path(decodeURIComponent(n[1])), (n[2] || n[1]) && this.search(n[3] || ""), this.hash(n[5] || "", t), this
    },
    protocol: mn("$$protocol"),
    host: mn("$$host"),
    port: mn("$$port"),
    path: gn("$$path", function (e) {
      return "/" == e.charAt(0) ? e : "/" + e
    }),
    search: function (e, t) {
      switch (arguments.length) {
        case 0:
          return this.$$search;
        case 1:
          if (x(e))this.$$search = G(e); else {
            if (!b(e))throw oi("isrcharg", "The first argument of the `$location#search()` call must be a string or an object.");
            this.$$search = e
          }
          break;
        default:
          v(t) || null === t ? delete this.$$search[e] : this.$$search[e] = t
      }
      return this.$$compose(), this
    },
    hash: gn("$$hash", m),
    replace: function () {
      return this.$$replace = !0, this
    }
  };
  var si, ui = r("$parse"), li = {}, ci = {
    "null": function () {
      return null
    }, "true": function () {
      return !0
    }, "false": function () {
      return !1
    }, undefined: h, "+": function (e, t, r, i) {
      return r = r(e, t), i = i(e, t), y(r) ? y(i) ? r + i : r : y(i) ? i : n
    }, "-": function (e, t, n, r) {
      return n = n(e, t), r = r(e, t), (y(n) ? n : 0) - (y(r) ? r : 0)
    }, "*": function (e, t, n, r) {
      return n(e, t) * r(e, t)
    }, "/": function (e, t, n, r) {
      return n(e, t) / r(e, t)
    }, "%": function (e, t, n, r) {
      return n(e, t) % r(e, t)
    }, "^": function (e, t, n, r) {
      return n(e, t) ^ r(e, t)
    }, "=": h, "===": function (e, t, n, r) {
      return n(e, t) === r(e, t)
    }, "!==": function (e, t, n, r) {
      return n(e, t) !== r(e, t)
    }, "==": function (e, t, n, r) {
      return n(e, t) == r(e, t)
    }, "!=": function (e, t, n, r) {
      return n(e, t) != r(e, t)
    }, "<": function (e, t, n, r) {
      return n(e, t) < r(e, t)
    }, ">": function (e, t, n, r) {
      return n(e, t) > r(e, t)
    }, "<=": function (e, t, n, r) {
      return n(e, t) <= r(e, t)
    }, ">=": function (e, t, n, r) {
      return n(e, t) >= r(e, t)
    }, "&&": function (e, t, n, r) {
      return n(e, t) && r(e, t)
    }, "||": function (e, t, n, r) {
      return n(e, t) || r(e, t)
    }, "&": function (e, t, n, r) {
      return n(e, t) & r(e, t)
    }, "|": function (e, t, n, r) {
      return r(e, t)(e, t, n(e, t))
    }, "!": function (e, t, n) {
      return !n(e, t)
    }
  }, pi = {n: "\n", f: "\f", r: "\r", t: "	", v: "", "'": "'", '"': '"'}, fi = function (e) {
    this.options = e
  };
  fi.prototype = {
    constructor: fi, lex: function (e) {
      this.text = e, this.index = 0, this.ch = n, this.lastCh = ":", this.tokens = [];
      for (var t, r = []; this.index < this.text.length;) {
        if (this.ch = this.text.charAt(this.index), this.is("\"'"))this.readString(this.ch); else if (this.isNumber(this.ch) || this.is(".") && this.isNumber(this.peek()))this.readNumber(); else if (this.isIdent(this.ch))this.readIdent(), this.was("{,") && "{" === r[0] && (t = this.tokens[this.tokens.length - 1]) && (t.json = -1 === t.text.indexOf(".")); else if (this.is("(){}[].,;:?"))this.tokens.push({
          index: this.index,
          text: this.ch,
          json: this.was(":[,") && this.is("{[") || this.is("}]:,")
        }), this.is("{[") && r.unshift(this.ch), this.is("}]") && r.shift(), this.index++; else {
          if (this.isWhitespace(this.ch)) {
            this.index++;
            continue
          }
          var i = this.ch + this.peek(), a = i + this.peek(2), o = ci[this.ch], s = ci[i], u = ci[a];
          u ? (this.tokens.push({
            index: this.index,
            text: a,
            fn: u
          }), this.index += 3) : s ? (this.tokens.push({
            index: this.index,
            text: i,
            fn: s
          }), this.index += 2) : o ? (this.tokens.push({
            index: this.index,
            text: this.ch,
            fn: o,
            json: this.was("[,:") && this.is("+-")
          }), this.index += 1) : this.throwError("Unexpected next character ", this.index, this.index + 1)
        }
        this.lastCh = this.ch
      }
      return this.tokens
    }, is: function (e) {
      return -1 !== e.indexOf(this.ch)
    }, was: function (e) {
      return -1 !== e.indexOf(this.lastCh)
    }, peek: function (e) {
      var t = e || 1;
      return this.index + t < this.text.length ? this.text.charAt(this.index + t) : !1
    }, isNumber: function (e) {
      return e >= "0" && "9" >= e
    }, isWhitespace: function (e) {
      return " " === e || "\r" === e || "	" === e || "\n" === e || "" === e || " " === e
    }, isIdent: function (e) {
      return e >= "a" && "z" >= e || e >= "A" && "Z" >= e || "_" === e || "$" === e
    }, isExpOperator: function (e) {
      return "-" === e || "+" === e || this.isNumber(e)
    }, throwError: function (e, t, n) {
      n = n || this.index;
      var r = y(t) ? "s " + t + "-" + this.index + " [" + this.text.substring(t, n) + "]" : " " + n;
      throw ui("lexerr", "Lexer Error: {0} at column{1} in expression [{2}].", e, r, this.text)
    }, readNumber: function () {
      for (var e = "", t = this.index; this.index < this.text.length;) {
        var n = dr(this.text.charAt(this.index));
        if ("." == n || this.isNumber(n))e += n; else {
          var r = this.peek();
          if ("e" == n && this.isExpOperator(r))e += n; else if (this.isExpOperator(n) && r && this.isNumber(r) && "e" == e.charAt(e.length - 1))e += n; else {
            if (!this.isExpOperator(n) || r && this.isNumber(r) || "e" != e.charAt(e.length - 1))break;
            this.throwError("Invalid exponent")
          }
        }
        this.index++
      }
      e = 1 * e, this.tokens.push({
        index: t, text: e, json: !0, fn: function () {
          return e
        }
      })
    }, readIdent: function () {
      for (var e, t, n, r, i = this, a = "", o = this.index; this.index < this.text.length && (r = this.text.charAt(this.index), "." === r || this.isIdent(r) || this.isNumber(r));)"." === r && (e = this.index), a += r, this.index++;
      if (e)for (t = this.index; t < this.text.length;) {
        if (r = this.text.charAt(t), "(" === r) {
          n = a.substr(e - o + 1), a = a.substr(0, e - o), this.index = t;
          break
        }
        if (!this.isWhitespace(r))break;
        t++
      }
      var s = {index: o, text: a};
      if (ci.hasOwnProperty(a))s.fn = ci[a], s.json = ci[a]; else {
        var u = Tn(a, this.options, this.text);
        s.fn = p(function (e, t) {
          return u(e, t)
        }, {
          assign: function (e, t) {
            return wn(e, a, t, i.text, i.options)
          }
        })
      }
      this.tokens.push(s), n && (this.tokens.push({index: e, text: ".", json: !1}), this.tokens.push({
        index: e + 1,
        text: n,
        json: !1
      }))
    }, readString: function (e) {
      var t = this.index;
      this.index++;
      for (var n = "", r = e, i = !1; this.index < this.text.length;) {
        var a = this.text.charAt(this.index);
        if (r += a, i) {
          if ("u" === a) {
            var o = this.text.substring(this.index + 1, this.index + 5);
            o.match(/[\da-f]{4}/i) || this.throwError("Invalid unicode escape [\\u" + o + "]"), this.index += 4, n += String.fromCharCode(parseInt(o, 16))
          } else {
            var s = pi[a];
            n += s ? s : a
          }
          i = !1
        } else if ("\\" === a)i = !0; else {
          if (a === e)return this.index++, void this.tokens.push({
            index: t,
            text: r,
            string: n,
            json: !0,
            fn: function () {
              return n
            }
          });
          n += a
        }
        this.index++
      }
      this.throwError("Unterminated quote", t)
    }
  };
  var di = function (e, t, n) {
    this.lexer = e, this.$filter = t, this.options = n
  };
  di.ZERO = p(function () {
    return 0
  }, {constant: !0}), di.prototype = {
    constructor: di, parse: function (e, t) {
      this.text = e, this.json = t, this.tokens = this.lexer.lex(e), t && (this.assignment = this.logicalOR, this.functionCall = this.fieldAccess = this.objectIndex = this.filterChain = function () {
        this.throwError("is not valid json", {text: e, index: 0})
      });
      var n = t ? this.primary() : this.statements();
      return 0 !== this.tokens.length && this.throwError("is an unexpected token", this.tokens[0]), n.literal = !!n.literal, n.constant = !!n.constant, n
    }, primary: function () {
      var e;
      if (this.expect("("))e = this.filterChain(), this.consume(")"); else if (this.expect("["))e = this.arrayDeclaration(); else if (this.expect("{"))e = this.object(); else {
        var t = this.expect();
        e = t.fn, e || this.throwError("not a primary expression", t), t.json && (e.constant = !0, e.literal = !0)
      }
      for (var n, r; n = this.expect("(", "[", ".");)"(" === n.text ? (e = this.functionCall(e, r), r = null) : "[" === n.text ? (r = e, e = this.objectIndex(e)) : "." === n.text ? (r = e, e = this.fieldAccess(e)) : this.throwError("IMPOSSIBLE");
      return e
    }, throwError: function (e, t) {
      throw ui("syntax", "Syntax Error: Token '{0}' {1} at column {2} of the expression [{3}] starting at [{4}].", t.text, e, t.index + 1, this.text, this.text.substring(t.index))
    }, peekToken: function () {
      if (0 === this.tokens.length)throw ui("ueoe", "Unexpected end of expression: {0}", this.text);
      return this.tokens[0]
    }, peek: function (e, t, n, r) {
      if (this.tokens.length > 0) {
        var i = this.tokens[0], a = i.text;
        if (a === e || a === t || a === n || a === r || !e && !t && !n && !r)return i
      }
      return !1
    }, expect: function (e, t, n, r) {
      var i = this.peek(e, t, n, r);
      return i ? (this.json && !i.json && this.throwError("is not valid json", i), this.tokens.shift(), i) : !1
    }, consume: function (e) {
      this.expect(e) || this.throwError("is unexpected, expecting [" + e + "]", this.peek())
    }, unaryFn: function (e, t) {
      return p(function (n, r) {
        return e(n, r, t)
      }, {constant: t.constant})
    }, ternaryFn: function (e, t, n) {
      return p(function (r, i) {
        return e(r, i) ? t(r, i) : n(r, i)
      }, {constant: e.constant && t.constant && n.constant})
    }, binaryFn: function (e, t, n) {
      return p(function (r, i) {
        return t(r, i, e, n)
      }, {constant: e.constant && n.constant})
    }, statements: function () {
      for (var e = []; ;)if (this.tokens.length > 0 && !this.peek("}", ")", ";", "]") && e.push(this.filterChain()), !this.expect(";"))return 1 === e.length ? e[0] : function (t, n) {
        for (var r, i = 0; i < e.length; i++) {
          var a = e[i];
          a && (r = a(t, n))
        }
        return r
      }
    }, filterChain: function () {
      for (var e, t = this.expression(); ;) {
        if (!(e = this.expect("|")))return t;
        t = this.binaryFn(t, e.fn, this.filter())
      }
    }, filter: function () {
      for (var e = this.expect(), t = this.$filter(e.text), n = []; ;) {
        if (!(e = this.expect(":"))) {
          var r = function (e, r, i) {
            for (var a = [i], o = 0; o < n.length; o++)a.push(n[o](e, r));
            return t.apply(e, a)
          };
          return function () {
            return r
          }
        }
        n.push(this.expression())
      }
    }, expression: function () {
      return this.assignment()
    }, assignment: function () {
      var e, t, n = this.ternary();
      return (t = this.expect("=")) ? (n.assign || this.throwError("implies assignment but [" + this.text.substring(0, t.index) + "] can not be assigned to", t), e = this.ternary(), function (t, r) {
        return n.assign(t, e(t, r), r)
      }) : n
    }, ternary: function () {
      var e, t, n = this.logicalOR();
      return (t = this.expect("?")) ? (e = this.ternary(), (t = this.expect(":")) ? this.ternaryFn(n, e, this.ternary()) : void this.throwError("expected :", t)) : n
    }, logicalOR: function () {
      for (var e, t = this.logicalAND(); ;) {
        if (!(e = this.expect("||")))return t;
        t = this.binaryFn(t, e.fn, this.logicalAND())
      }
    }, logicalAND: function () {
      var e, t = this.equality();
      return (e = this.expect("&&")) && (t = this.binaryFn(t, e.fn, this.logicalAND())), t
    }, equality: function () {
      var e, t = this.relational();
      return (e = this.expect("==", "!=", "===", "!==")) && (t = this.binaryFn(t, e.fn, this.equality())), t
    }, relational: function () {
      var e, t = this.additive();
      return (e = this.expect("<", ">", "<=", ">=")) && (t = this.binaryFn(t, e.fn, this.relational())), t
    }, additive: function () {
      for (var e, t = this.multiplicative(); e = this.expect("+", "-");)t = this.binaryFn(t, e.fn, this.multiplicative());
      return t
    }, multiplicative: function () {
      for (var e, t = this.unary(); e = this.expect("*", "/", "%");)t = this.binaryFn(t, e.fn, this.unary());
      return t
    }, unary: function () {
      var e;
      return this.expect("+") ? this.primary() : (e = this.expect("-")) ? this.binaryFn(di.ZERO, e.fn, this.unary()) : (e = this.expect("!")) ? this.unaryFn(e.fn, this.unary()) : this.primary()
    }, fieldAccess: function (e) {
      var t = this, n = this.expect().text, r = Tn(n, this.options, this.text);
      return p(function (t, n, i) {
        return r(i || e(t, n))
      }, {
        assign: function (r, i, a) {
          return wn(e(r, a), n, i, t.text, t.options)
        }
      })
    }, objectIndex: function (e) {
      var t = this, r = this.expression();
      return this.consume("]"), p(function (i, a) {
        var o, s, u = e(i, a), l = r(i, a);
        return u ? (o = xn(u[l], t.text), o && o.then && t.options.unwrapPromises && (s = o, "$$v"in o || (s.$$v = n, s.then(function (e) {
          s.$$v = e
        })), o = o.$$v), o) : n
      }, {
        assign: function (n, i, a) {
          var o = r(n, a), s = xn(e(n, a), t.text);
          return s[o] = i
        }
      })
    }, functionCall: function (e, t) {
      var n = [];
      if (")" !== this.peekToken().text)do n.push(this.expression()); while (this.expect(","));
      this.consume(")");
      var r = this;
      return function (i, a) {
        for (var o = [], s = t ? t(i, a) : i, u = 0; u < n.length; u++)o.push(n[u](i, a));
        var l = e(i, a, s) || h;
        xn(s, r.text), xn(l, r.text);
        var c = l.apply ? l.apply(s, o) : l(o[0], o[1], o[2], o[3], o[4]);
        return xn(c, r.text)
      }
    }, arrayDeclaration: function () {
      var e = [], t = !0;
      if ("]" !== this.peekToken().text)do {
        if (this.peek("]"))break;
        var n = this.expression();
        e.push(n), n.constant || (t = !1)
      } while (this.expect(","));
      return this.consume("]"), p(function (t, n) {
        for (var r = [], i = 0; i < e.length; i++)r.push(e[i](t, n));
        return r
      }, {literal: !0, constant: t})
    }, object: function () {
      var e = [], t = !0;
      if ("}" !== this.peekToken().text)do {
        if (this.peek("}"))break;
        var n = this.expect(), r = n.string || n.text;
        this.consume(":");
        var i = this.expression();
        e.push({key: r, value: i}), i.constant || (t = !1)
      } while (this.expect(","));
      return this.consume("}"), p(function (t, n) {
        for (var r = {}, i = 0; i < e.length; i++) {
          var a = e[i];
          r[a.key] = a.value(t, n)
        }
        return r
      }, {literal: !0, constant: t})
    }
  };
  var hi = {}, mi = r("$sce"), gi = {
    HTML: "html",
    CSS: "css",
    URL: "url",
    RESOURCE_URL: "resourceUrl",
    JS: "js"
  }, vi = t.createElement("a"), yi = Fn(e.location.href, !0);
  Vn.$inject = ["$provide"], Hn.$inject = ["$locale"], Wn.$inject = ["$locale"];
  var bi = ".", xi = {
    yyyy: Gn("FullYear", 4),
    yy: Gn("FullYear", 2, 0, !0),
    y: Gn("FullYear", 1),
    MMMM: Xn("Month"),
    MMM: Xn("Month", !0),
    MM: Gn("Month", 2, 1),
    M: Gn("Month", 1, 1),
    dd: Gn("Date", 2),
    d: Gn("Date", 1),
    HH: Gn("Hours", 2),
    H: Gn("Hours", 1),
    hh: Gn("Hours", 2, -12),
    h: Gn("Hours", 1, -12),
    mm: Gn("Minutes", 2),
    m: Gn("Minutes", 1),
    ss: Gn("Seconds", 2),
    s: Gn("Seconds", 1),
    sss: Gn("Milliseconds", 3),
    EEEE: Xn("Day"),
    EEE: Xn("Day", !0),
    a: Qn,
    Z: Kn
  }, wi = /((?:[^yMdHhmsaZE']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z))(.*)/, $i = /^\-?\d+$/;
  Zn.$inject = ["$locale"];
  var Ei = g(dr), Si = g(mr);
  tr.$inject = ["$parse"];
  var Ti = g({
    restrict: "E", compile: function (e, n) {
      return 8 >= yr && (n.href || n.name || n.$set("href", ""), e.append(t.createComment("IE fix"))), n.href || n.xlinkHref || n.name ? void 0 : function (e, t) {
        var n = "[object SVGAnimatedString]" === Tr.call(t.prop("href")) ? "xlink:href" : "href";
        t.on("click", function (e) {
          t.attr(n) || e.preventDefault()
        })
      }
    }
  }), Ci = {};
  a(Yr, function (e, t) {
    if ("multiple" != e) {
      var n = Vt("ng-" + t);
      Ci[n] = function () {
        return {
          priority: 100, link: function (e, r, i) {
            e.$watch(i[n], function (e) {
              i.$set(t, !!e)
            })
          }
        }
      }
    }
  }), a(["src", "srcset", "href"], function (e) {
    var t = Vt("ng-" + e);
    Ci[t] = function () {
      return {
        priority: 99, link: function (n, r, i) {
          var a = e, o = e;
          "href" === e && "[object SVGAnimatedString]" === Tr.call(r.prop("href")) && (o = "xlinkHref", i.$attr[o] = "xlink:href", a = null), i.$observe(t, function (e) {
            e && (i.$set(o, e), yr && a && r.prop(a, i[o]))
          })
        }
      }
    }
  });
  var ki = {$addControl: h, $removeControl: h, $setValidity: h, $setDirty: h, $setPristine: h};
  rr.$inject = ["$element", "$attrs", "$scope", "$animate"];
  var Ai = function (e) {
    return ["$timeout", function (t) {
      var r = {
        name: "form", restrict: e ? "EAC" : "E", controller: rr, compile: function () {
          return {
            pre: function (e, r, i, a) {
              if (!i.action) {
                var o = function (e) {
                  e.preventDefault ? e.preventDefault() : e.returnValue = !1
                };
                Rr(r[0], "submit", o), r.on("$destroy", function () {
                  t(function () {
                    Ir(r[0], "submit", o)
                  }, 0, !1)
                })
              }
              var s = r.parent().controller("form"), u = i.name || i.ngForm;
              u && wn(e, u, a, u), s && r.on("$destroy", function () {
                s.$removeControl(a), u && wn(e, u, n, u), p(a, ki)
              })
            }
          }
        }
      };
      return r
    }]
  }, _i = Ai(), Di = Ai(!0), Mi = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/, Oi = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*$/i, Ni = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/, Pi = {
    text: or,
    number: sr,
    url: ur,
    email: lr,
    radio: cr,
    checkbox: pr,
    hidden: h,
    button: h,
    submit: h,
    reset: h,
    file: h
  }, Ri = ["$browser", "$sniffer", function (e, t) {
    return {
      restrict: "E", require: "?ngModel", link: function (n, r, i, a) {
        a && (Pi[dr(i.type)] || Pi.text)(n, r, i, a, t, e)
      }
    }
  }], Ii = "ng-valid", Li = "ng-invalid", ji = "ng-pristine", Fi = "ng-dirty", Bi = ["$scope", "$exceptionHandler", "$attrs", "$element", "$parse", "$animate", function (e, t, n, i, o, s) {
    function u(e, t) {
      t = t ? "-" + et(t, "-") : "", s.removeClass(i, (e ? Li : Ii) + t), s.addClass(i, (e ? Ii : Li) + t)
    }

    this.$viewValue = Number.NaN, this.$modelValue = Number.NaN, this.$parsers = [], this.$formatters = [], this.$viewChangeListeners = [], this.$pristine = !0, this.$dirty = !1, this.$valid = !0, this.$invalid = !1, this.$name = n.name;
    var l = o(n.ngModel), c = l.assign;
    if (!c)throw r("ngModel")("nonassign", "Expression '{0}' is non-assignable. Element: {1}", n.ngModel, Y(i));
    this.$render = h, this.$isEmpty = function (e) {
      return v(e) || "" === e || null === e || e !== e
    };
    var p = i.inheritedData("$formController") || ki, f = 0, d = this.$error = {};
    i.addClass(ji), u(!0), this.$setValidity = function (e, t) {
      d[e] !== !t && (t ? (d[e] && f--, f || (u(!0), this.$valid = !0, this.$invalid = !1)) : (u(!1), this.$invalid = !0, this.$valid = !1, f++), d[e] = !t, u(t, e), p.$setValidity(e, t, this))
    }, this.$setPristine = function () {
      this.$dirty = !1, this.$pristine = !0, s.removeClass(i, Fi), s.addClass(i, ji)
    }, this.$setViewValue = function (n) {
      this.$viewValue = n, this.$pristine && (this.$dirty = !0, this.$pristine = !1, s.removeClass(i, ji), s.addClass(i, Fi), p.$setDirty()), a(this.$parsers, function (e) {
        n = e(n)
      }), this.$modelValue !== n && (this.$modelValue = n, c(e, n), a(this.$viewChangeListeners, function (e) {
        try {
          e()
        } catch (n) {
          t(n)
        }
      }))
    };
    var m = this;
    e.$watch(function () {
      var t = l(e);
      if (m.$modelValue !== t) {
        var n = m.$formatters, r = n.length;
        for (m.$modelValue = t; r--;)t = n[r](t);
        m.$viewValue !== t && (m.$viewValue = t, m.$render())
      }
      return t
    })
  }], qi = function () {
    return {
      require: ["ngModel", "^?form"], controller: Bi, link: function (e, t, n, r) {
        var i = r[0], a = r[1] || ki;
        a.$addControl(i), e.$on("$destroy", function () {
          a.$removeControl(i)
        })
      }
    }
  }, Vi = g({
    require: "ngModel", link: function (e, t, n, r) {
      r.$viewChangeListeners.push(function () {
        e.$eval(n.ngChange)
      })
    }
  }), Ui = function () {
    return {
      require: "?ngModel", link: function (e, t, n, r) {
        if (r) {
          n.required = !0;
          var i = function (e) {
            return n.required && r.$isEmpty(e) ? void r.$setValidity("required", !1) : (r.$setValidity("required", !0), e)
          };
          r.$formatters.push(i), r.$parsers.unshift(i), n.$observe("required", function () {
            i(r.$viewValue)
          })
        }
      }
    }
  }, Hi = function () {
    return {
      require: "ngModel", link: function (e, t, r, i) {
        var o = /\/(.*)\//.exec(r.ngList), s = o && new RegExp(o[1]) || r.ngList || ",", u = function (e) {
          if (!v(e)) {
            var t = [];
            return e && a(e.split(s), function (e) {
              e && t.push(_r(e))
            }), t
          }
        };
        i.$parsers.push(u), i.$formatters.push(function (e) {
          return E(e) ? e.join(", ") : n
        }), i.$isEmpty = function (e) {
          return !e || !e.length
        }
      }
    }
  }, Wi = /^(true|false|\d+)$/, Yi = function () {
    return {
      priority: 100, compile: function (e, t) {
        return Wi.test(t.ngValue) ? function (e, t, n) {
          n.$set("value", e.$eval(n.ngValue))
        } : function (e, t, n) {
          e.$watch(n.ngValue, function (e) {
            n.$set("value", e)
          })
        }
      }
    }
  }, zi = nr(function (e, t, r) {
    t.addClass("ng-binding").data("$binding", r.ngBind), e.$watch(r.ngBind, function (e) {
      t.text(e == n ? "" : e)
    })
  }), Gi = ["$interpolate", function (e) {
    return function (t, n, r) {
      var i = e(n.attr(r.$attr.ngBindTemplate));
      n.addClass("ng-binding").data("$binding", i), r.$observe("ngBindTemplate", function (e) {
        n.text(e)
      })
    }
  }], Xi = ["$sce", "$parse", function (e, t) {
    return function (n, r, i) {
      function a() {
        return (o(n) || "").toString()
      }

      r.addClass("ng-binding").data("$binding", i.ngBindHtml);
      var o = t(i.ngBindHtml);
      n.$watch(a, function () {
        r.html(e.getTrustedHtml(o(n)) || "")
      })
    }
  }], Ki = fr("", !0), Qi = fr("Odd", 0), Zi = fr("Even", 1), Ji = nr({
    compile: function (e, t) {
      t.$set("ngCloak", n), e.removeClass("ng-cloak")
    }
  }), ea = [function () {
    return {scope: !0, controller: "@", priority: 500}
  }], ta = {};
  a("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste".split(" "), function (e) {
    var t = Vt("ng-" + e);
    ta[t] = ["$parse", function (n) {
      return {
        compile: function (r, i) {
          var a = n(i[t]);
          return function (t, n) {
            n.on(dr(e), function (e) {
              t.$apply(function () {
                a(t, {$event: e})
              })
            })
          }
        }
      }
    }]
  });
  var na = ["$animate", function (e) {
    return {
      transclude: "element",
      priority: 600,
      terminal: !0,
      restrict: "A",
      $$tlb: !0,
      link: function (n, r, i, a, o) {
        var s, u, l;
        n.$watch(i.ngIf, function (a) {
          W(a) ? u || (u = n.$new(), o(u, function (n) {
            n[n.length++] = t.createComment(" end ngIf: " + i.ngIf + " "), s = {clone: n}, e.enter(n, r.parent(), r)
          })) : (l && (l.remove(), l = null), u && (u.$destroy(), u = null), s && (l = ot(s.clone), e.leave(l, function () {
            l = null
          }), s = null))
        })
      }
    }
  }], ra = ["$http", "$templateCache", "$anchorScroll", "$animate", "$sce", function (e, t, n, r, i) {
    return {
      restrict: "ECA",
      priority: 400,
      terminal: !0,
      transclude: "element",
      controller: kr.noop,
      compile: function (a, o) {
        var s = o.ngInclude || o.src, u = o.onload || "", l = o.autoscroll;
        return function (a, o, c, p, f) {
          var d, h, m, g = 0, v = function () {
            h && (h.remove(), h = null), d && (d.$destroy(), d = null), m && (r.leave(m, function () {
              h = null
            }), h = m, m = null)
          };
          a.$watch(i.parseAsResourceUrl(s), function (i) {
            var s = function () {
              !y(l) || l && !a.$eval(l) || n()
            }, c = ++g;
            i ? (e.get(i, {cache: t}).success(function (e) {
              if (c === g) {
                var t = a.$new();
                p.template = e;
                var n = f(t, function (e) {
                  v(), r.enter(e, null, o, s)
                });
                d = t, m = n, d.$emit("$includeContentLoaded"), a.$eval(u)
              }
            }).error(function () {
              c === g && v()
            }), a.$emit("$includeContentRequested")) : (v(), p.template = null)
          })
        }
      }
    }
  }], ia = ["$compile", function (e) {
    return {
      restrict: "ECA", priority: -400, require: "ngInclude", link: function (t, n, r, i) {
        n.html(i.template), e(n.contents())(t)
      }
    }
  }], aa = nr({
    priority: 450, compile: function () {
      return {
        pre: function (e, t, n) {
          e.$eval(n.ngInit)
        }
      }
    }
  }), oa = nr({terminal: !0, priority: 1e3}), sa = ["$locale", "$interpolate", function (e, t) {
    var n = /{}/g;
    return {
      restrict: "EA", link: function (r, i, o) {
        var s = o.count, u = o.$attr.when && i.attr(o.$attr.when), l = o.offset || 0, c = r.$eval(u) || {}, p = {}, f = t.startSymbol(), d = t.endSymbol(), h = /^when(Minus)?(.+)$/;
        a(o, function (e, t) {
          h.test(t) && (c[dr(t.replace("when", "").replace("Minus", "-"))] = i.attr(o.$attr[t]))
        }), a(c, function (e, r) {
          p[r] = t(e.replace(n, f + s + "-" + l + d))
        }), r.$watch(function () {
          var t = parseFloat(r.$eval(s));
          return isNaN(t) ? "" : (t in c || (t = e.pluralCat(t - l)), p[t](r, i, !0))
        }, function (e) {
          i.text(e)
        })
      }
    }
  }], ua = ["$parse", "$animate", function (e, n) {
    function o(e) {
      return e.clone[0]
    }

    function s(e) {
      return e.clone[e.clone.length - 1]
    }

    var u = "$$NG_REMOVED", l = r("ngRepeat");
    return {
      transclude: "element", priority: 1e3, terminal: !0, $$tlb: !0, link: function (r, c, p, f, d) {
        var h, m, g, v, y, b, x, w, $, E = p.ngRepeat, S = E.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?\s*$/), T = {$id: Mt};
        if (!S)throw l("iexp", "Expected expression in form of '_item_ in _collection_[ track by _id_]' but got '{0}'.", E);
        if (b = S[1], x = S[2], h = S[3], h ? (m = e(h), g = function (e, t, n) {
            return $ && (T[$] = e), T[w] = t, T.$index = n, m(r, T)
          }) : (v = function (e, t) {
            return Mt(t)
          }, y = function (e) {
            return e
          }), S = b.match(/^(?:([\$\w]+)|\(([\$\w]+)\s*,\s*([\$\w]+)\))$/), !S)throw l("iidexp", "'_item_' in '_item_ in _collection_' should be an identifier or '(_key_, _value_)' expression, but got '{0}'.", b);
        w = S[3] || S[1], $ = S[2];
        var C = {};
        r.$watchCollection(x, function (e) {
          var p, f, h, m, b, x, S, T, k, A, _, D, M = c[0], O = {}, N = [];
          if (i(e))A = e, k = g || v; else {
            k = g || y, A = [];
            for (x in e)e.hasOwnProperty(x) && "$" != x.charAt(0) && A.push(x);
            A.sort()
          }
          for (m = A.length, f = N.length = A.length, p = 0; f > p; p++)if (x = e === A ? p : A[p], S = e[x], T = k(x, S, p), it(T, "`track by` id"), C.hasOwnProperty(T))_ = C[T], delete C[T], O[T] = _, N[p] = _; else {
            if (O.hasOwnProperty(T))throw a(N, function (e) {
              e && e.scope && (C[e.id] = e)
            }), l("dupes", "Duplicates in a repeater are not allowed. Use 'track by' expression to specify unique keys. Repeater: {0}, Duplicate key: {1}", E, T);
            N[p] = {id: T}, O[T] = !1
          }
          for (x in C)C.hasOwnProperty(x) && (_ = C[x], D = ot(_.clone), n.leave(D), a(D, function (e) {
            e[u] = !0
          }), _.scope.$destroy());
          for (p = 0, f = A.length; f > p; p++) {
            if (x = e === A ? p : A[p], S = e[x], _ = N[p], N[p - 1] && (M = s(N[p - 1])), _.scope) {
              b = _.scope, h = M;
              do h = h.nextSibling; while (h && h[u]);
              o(_) != h && n.move(ot(_.clone), null, br(M)), M = s(_)
            } else b = r.$new();
            b[w] = S, $ && (b[$] = x), b.$index = p, b.$first = 0 === p, b.$last = p === m - 1, b.$middle = !(b.$first || b.$last), b.$odd = !(b.$even = 0 === (1 & p)), _.scope || d(b, function (e) {
              e[e.length++] = t.createComment(" end ngRepeat: " + E + " "), n.enter(e, null, br(M)), M = e, _.scope = b, _.clone = e, O[_.id] = _
            })
          }
          C = O
        })
      }
    }
  }], la = ["$animate", function (e) {
    return function (t, n, r) {
      t.$watch(r.ngShow, function (t) {
        e[W(t) ? "removeClass" : "addClass"](n, "ng-hide")
      })
    }
  }], ca = ["$animate", function (e) {
    return function (t, n, r) {
      t.$watch(r.ngHide, function (t) {
        e[W(t) ? "addClass" : "removeClass"](n, "ng-hide")
      })
    }
  }], pa = nr(function (e, t, n) {
    e.$watch(n.ngStyle, function (e, n) {
      n && e !== n && a(n, function (e, n) {
        t.css(n, "")
      }), e && t.css(e)
    }, !0)
  }), fa = ["$animate", function (e) {
    return {
      restrict: "EA", require: "ngSwitch", controller: ["$scope", function () {
        this.cases = {}
      }], link: function (t, n, r, i) {
        var o, s, u, l = r.ngSwitch || r.on, c = [];
        t.$watch(l, function (n) {
          var l, p = c.length;
          if (p > 0) {
            if (u) {
              for (l = 0; p > l; l++)u[l].remove();
              u = null
            }
            for (u = [], l = 0; p > l; l++) {
              var f = s[l];
              c[l].$destroy(), u[l] = f, e.leave(f, function () {
                u.splice(l, 1), 0 === u.length && (u = null)
              })
            }
          }
          s = [], c = [], (o = i.cases["!" + n] || i.cases["?"]) && (t.$eval(r.change), a(o, function (n) {
            var r = t.$new();
            c.push(r), n.transclude(r, function (t) {
              var r = n.element;
              s.push(t), e.enter(t, r.parent(), r)
            })
          }))
        })
      }
    }
  }], da = nr({
    transclude: "element", priority: 800, require: "^ngSwitch", link: function (e, t, n, r, i) {
      r.cases["!" + n.ngSwitchWhen] = r.cases["!" + n.ngSwitchWhen] || [], r.cases["!" + n.ngSwitchWhen].push({
        transclude: i,
        element: t
      })
    }
  }), ha = nr({
    transclude: "element", priority: 800, require: "^ngSwitch", link: function (e, t, n, r, i) {
      r.cases["?"] = r.cases["?"] || [], r.cases["?"].push({transclude: i, element: t})
    }
  }), ma = nr({
    link: function (e, t, n, i, a) {
      if (!a)throw r("ngTransclude")("orphan", "Illegal use of ngTransclude directive in the template! No parent directive that requires a transclusion found. Element: {0}", Y(t));
      a(function (e) {
        t.empty(), t.append(e)
      })
    }
  }), ga = ["$templateCache", function (e) {
    return {
      restrict: "E", terminal: !0, compile: function (t, n) {
        if ("text/ng-template" == n.type) {
          var r = n.id, i = t[0].text;
          e.put(r, i)
        }
      }
    }
  }], va = r("ngOptions"), ya = g({terminal: !0}), ba = ["$compile", "$parse", function (e, r) {
    var i = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/, s = {$setViewValue: h};
    return {
      restrict: "E",
      require: ["select", "?ngModel"],
      controller: ["$element", "$scope", "$attrs", function (e, t, n) {
        var r, i, a = this, o = {}, u = s;
        a.databound = n.ngModel, a.init = function (e, t, n) {
          u = e, r = t, i = n
        }, a.addOption = function (t) {
          it(t, '"option value"'), o[t] = !0, u.$viewValue == t && (e.val(t), i.parent() && i.remove())
        }, a.removeOption = function (e) {
          this.hasOption(e) && (delete o[e], u.$viewValue == e && this.renderUnknownOption(e))
        }, a.renderUnknownOption = function (t) {
          var n = "? " + Mt(t) + " ?";
          i.val(n), e.prepend(i), e.val(n), i.prop("selected", !0)
        }, a.hasOption = function (e) {
          return o.hasOwnProperty(e)
        }, t.$on("$destroy", function () {
          a.renderUnknownOption = h
        })
      }],
      link: function (s, u, l, c) {
        function p(e, t, n, r) {
          n.$render = function () {
            var e = n.$viewValue;
            r.hasOption(e) ? (T.parent() && T.remove(), t.val(e), "" === e && h.prop("selected", !0)) : v(e) && h ? t.val("") : r.renderUnknownOption(e)
          }, t.on("change", function () {
            e.$apply(function () {
              T.parent() && T.remove(), n.$setViewValue(t.val())
            })
          })
        }

        function f(e, t, n) {
          var r;
          n.$render = function () {
            var e = new Ot(n.$viewValue);
            a(t.find("option"), function (t) {
              t.selected = y(e.get(t.value))
            })
          }, e.$watch(function () {
            L(r, n.$viewValue) || (r = R(n.$viewValue), n.$render())
          }), t.on("change", function () {
            e.$apply(function () {
              var e = [];
              a(t.find("option"), function (t) {
                t.selected && e.push(t.value)
              }), n.$setViewValue(e)
            })
          })
        }

        function d(t, a, s) {
          function u() {
            var e, n, r, i, u, l, g, x, C, k, A, _, D, M, O, N = {"": []}, P = [""], R = s.$modelValue, I = m(t) || [], L = f ? o(I) : I, j = {}, F = !1;
            if (b)if (v && E(R)) {
              F = new Ot([]);
              for (var B = 0; B < R.length; B++)j[p] = R[B], F.put(v(t, j), R[B])
            } else F = new Ot(R);
            for (A = 0; C = L.length, C > A; A++) {
              if (g = A, f) {
                if (g = L[A], "$" === g.charAt(0))continue;
                j[f] = g
              }
              if (j[p] = I[g], e = d(t, j) || "", (n = N[e]) || (n = N[e] = [], P.push(e)), b)_ = y(F.remove(v ? v(t, j) : h(t, j))); else {
                if (v) {
                  var q = {};
                  q[p] = R, _ = v(t, q) === v(t, j)
                } else _ = R === h(t, j);
                F = F || _
              }
              O = c(t, j), O = y(O) ? O : "", n.push({id: v ? v(t, j) : f ? L[A] : A, label: O, selected: _})
            }
            for (b || (w || null === R ? N[""].unshift({id: "", label: "", selected: !F}) : F || N[""].unshift({
              id: "?",
              label: "",
              selected: !0
            })), k = 0, x = P.length; x > k; k++) {
              for (e = P[k], n = N[e], T.length <= k ? (i = {
                element: S.clone().attr("label", e),
                label: n.label
              }, u = [i], T.push(u), a.append(i.element)) : (u = T[k], i = u[0], i.label != e && i.element.attr("label", i.label = e)), D = null, A = 0, C = n.length; C > A; A++)r = n[A], (l = u[A + 1]) ? (D = l.element, l.label !== r.label && D.text(l.label = r.label), l.id !== r.id && D.val(l.id = r.id), l.selected !== r.selected && D.prop("selected", l.selected = r.selected)) : ("" === r.id && w ? M = w : (M = $.clone()).val(r.id).attr("selected", r.selected).text(r.label), u.push(l = {
                element: M,
                label: r.label,
                id: r.id,
                selected: r.selected
              }), D ? D.after(M) : i.element.append(M), D = M);
              for (A++; u.length > A;)u.pop().element.remove()
            }
            for (; T.length > k;)T.pop()[0].element.remove()
          }

          var l;
          if (!(l = x.match(i)))throw va("iexp", "Expected expression in form of '_select_ (as _label_)? for (_key_,)?_value_ in _collection_' but got '{0}'. Element: {1}", x, Y(a));
          var c = r(l[2] || l[1]), p = l[4] || l[6], f = l[5], d = r(l[3] || ""), h = r(l[2] ? l[1] : p), m = r(l[7]), g = l[8], v = g ? r(l[8]) : null, T = [[{
            element: a,
            label: ""
          }]];
          w && (e(w)(t), w.removeClass("ng-scope"), w.remove()), a.empty(), a.on("change", function () {
            t.$apply(function () {
              var e, r, i, o, u, l, c, d, g, y = m(t) || [], x = {};
              if (b) {
                for (i = [], l = 0, d = T.length; d > l; l++)for (e = T[l], u = 1, c = e.length; c > u; u++)if ((o = e[u].element)[0].selected) {
                  if (r = o.val(), f && (x[f] = r), v)for (g = 0; g < y.length && (x[p] = y[g], v(t, x) != r); g++); else x[p] = y[r];
                  i.push(h(t, x))
                }
              } else {
                if (r = a.val(), "?" == r)i = n; else if ("" === r)i = null; else if (v) {
                  for (g = 0; g < y.length; g++)if (x[p] = y[g], v(t, x) == r) {
                    i = h(t, x);
                    break
                  }
                } else x[p] = y[r], f && (x[f] = r), i = h(t, x);
                T[0].length > 1 && T[0][1].id !== r && (T[0][1].selected = !1)
              }
              s.$setViewValue(i)
            })
          }), s.$render = u, t.$watch(u)
        }

        if (c[1]) {
          for (var h, m = c[0], g = c[1], b = l.multiple, x = l.ngOptions, w = !1, $ = br(t.createElement("option")), S = br(t.createElement("optgroup")), T = $.clone(), C = 0, k = u.children(), A = k.length; A > C; C++)if ("" === k[C].value) {
            h = w = k.eq(C);
            break
          }
          m.init(g, w, T), b && (g.$isEmpty = function (e) {
            return !e || 0 === e.length
          }), x ? d(s, u, g) : b ? f(s, u, g) : p(s, u, g, m)
        }
      }
    }
  }], xa = ["$interpolate", function (e) {
    var t = {addOption: h, removeOption: h};
    return {
      restrict: "E", priority: 100, compile: function (n, r) {
        if (v(r.value)) {
          var i = e(n.text(), !0);
          i || r.$set("value", n.text())
        }
        return function (e, n, r) {
          var a = "$selectController", o = n.parent(), s = o.data(a) || o.parent().data(a);
          s && s.databound ? n.prop("selected", !1) : s = t, i ? e.$watch(i, function (e, t) {
            r.$set("value", e), e !== t && s.removeOption(t), s.addOption(e)
          }) : s.addOption(r.value), n.on("$destroy", function () {
            s.removeOption(r.value)
          })
        }
      }
    }
  }], wa = g({restrict: "E", terminal: !0});
  return e.angular.bootstrap ? void console.log("WARNING: Tried to load angular more than once.") : (tt(), ut(kr), void br(t).ready(function () {
    Z(t, J)
  }))
}(window, document), !angular.$$csp() && angular.element(document).find("head").prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide{display:none !important;}ng\\:form{display:block;}.ng-animate-block-transitions{transition:0s all!important;-webkit-transition:0s all!important;}</style>'), define("angular", ["jquery"], function (e) {
  return function () {
    var t;
    return t || e.angular
  }
}(this)), function (e, t) {
  "use strict";
  function n() {
    function e(e, n) {
      return t.extend(new (t.extend(function () {
      }, {prototype: e})), n)
    }

    function n(e, t) {
      var n = t.caseInsensitiveMatch, r = {originalPath: e, regexp: e}, i = r.keys = [];
      return e = e.replace(/([().])/g, "\\$1").replace(/(\/)?:(\w+)([\?\*])?/g, function (e, t, n, r) {
        var a = "?" === r ? r : null, o = "*" === r ? r : null;
        return i.push({
          name: n,
          optional: !!a
        }), t = t || "", "" + (a ? "" : t) + "(?:" + (a ? t : "") + (o && "(.+?)" || "([^/]+)") + (a || "") + ")" + (a || "")
      }).replace(/([\/$\*])/g, "\\$1"), r.regexp = new RegExp("^" + e + "$", n ? "i" : ""), r
    }

    var r = {};
    this.when = function (e, i) {
      if (r[e] = t.extend({reloadOnSearch: !0}, i, e && n(e, i)), e) {
        var a = "/" == e[e.length - 1] ? e.substr(0, e.length - 1) : e + "/";
        r[a] = t.extend({redirectTo: e}, n(a, i))
      }
      return this
    }, this.otherwise = function (e) {
      return this.when(null, e), this
    }, this.$get = ["$rootScope", "$location", "$routeParams", "$q", "$injector", "$http", "$templateCache", "$sce", function (n, i, a, o, s, u, l, c) {
      function p(e, t) {
        var n = t.keys, r = {};
        if (!t.regexp)return null;
        var i = t.regexp.exec(e);
        if (!i)return null;
        for (var a = 1, o = i.length; o > a; ++a) {
          var s = n[a - 1], u = "string" == typeof i[a] ? decodeURIComponent(i[a]) : i[a];
          s && u && (r[s.name] = u)
        }
        return r
      }

      function f() {
        var e = d(), r = g.current;
        e && r && e.$$route === r.$$route && t.equals(e.pathParams, r.pathParams) && !e.reloadOnSearch && !m ? (r.params = e.params, t.copy(r.params, a), n.$broadcast("$routeUpdate", r)) : (e || r) && (m = !1, n.$broadcast("$routeChangeStart", e, r), g.current = e, e && e.redirectTo && (t.isString(e.redirectTo) ? i.path(h(e.redirectTo, e.params)).search(e.params).replace() : i.url(e.redirectTo(e.pathParams, i.path(), i.search())).replace()), o.when(e).then(function () {
          if (e) {
            var n, r, i = t.extend({}, e.resolve);
            return t.forEach(i, function (e, n) {
              i[n] = t.isString(e) ? s.get(e) : s.invoke(e)
            }), t.isDefined(n = e.template) ? t.isFunction(n) && (n = n(e.params)) : t.isDefined(r = e.templateUrl) && (t.isFunction(r) && (r = r(e.params)), r = c.getTrustedResourceUrl(r), t.isDefined(r) && (e.loadedTemplateUrl = r, n = u.get(r, {cache: l}).then(function (e) {
              return e.data
            }))), t.isDefined(n) && (i.$template = n), o.all(i)
          }
        }).then(function (i) {
          e == g.current && (e && (e.locals = i, t.copy(e.params, a)), n.$broadcast("$routeChangeSuccess", e, r))
        }, function (t) {
          e == g.current && n.$broadcast("$routeChangeError", e, r, t)
        }))
      }

      function d() {
        var n, a;
        return t.forEach(r, function (r) {
          !a && (n = p(i.path(), r)) && (a = e(r, {params: t.extend({}, i.search(), n), pathParams: n}), a.$$route = r)
        }), a || r[null] && e(r[null], {params: {}, pathParams: {}})
      }

      function h(e, n) {
        var r = [];
        return t.forEach((e || "").split(":"), function (e, t) {
          if (0 === t)r.push(e); else {
            var i = e.match(/(\w+)(.*)/), a = i[1];
            r.push(n[a]), r.push(i[2] || ""), delete n[a]
          }
        }), r.join("")
      }

      var m = !1, g = {
        routes: r, reload: function () {
          m = !0, n.$evalAsync(f)
        }
      };
      return n.$on("$locationChangeSuccess", f), g
    }]
  }

  function r() {
    this.$get = function () {
      return {}
    }
  }

  function i(e, n, r) {
    return {
      restrict: "ECA", terminal: !0, priority: 400, transclude: "element", link: function (i, a, o, s, u) {
        function l() {
          d && (d.remove(), d = null), p && (p.$destroy(), p = null), f && (r.leave(f, function () {
            d = null
          }), d = f, f = null)
        }

        function c() {
          var o = e.current && e.current.locals, s = o && o.$template;
          if (t.isDefined(s)) {
            var c = i.$new(), d = e.current, g = u(c, function (e) {
              r.enter(e, null, f || a, function () {
                !t.isDefined(h) || h && !i.$eval(h) || n()
              }), l()
            });
            f = g, p = d.scope = c, p.$emit("$viewContentLoaded"), p.$eval(m)
          } else l()
        }

        var p, f, d, h = o.autoscroll, m = o.onload || "";
        i.$on("$routeChangeSuccess", c), c()
      }
    }
  }

  function a(e, t, n) {
    return {
      restrict: "ECA", priority: -400, link: function (r, i) {
        var a = n.current, o = a.locals;
        i.html(o.$template);
        var s = e(i.contents());
        if (a.controller) {
          o.$scope = r;
          var u = t(a.controller, o);
          a.controllerAs && (r[a.controllerAs] = u), i.data("$ngControllerController", u), i.children().data("$ngControllerController", u)
        }
        s(r)
      }
    }
  }

  var o = t.module("ngRoute", ["ng"]).provider("$route", n);
  o.provider("$routeParams", r), o.directive("ngView", i), o.directive("ngView", a), i.$inject = ["$route", "$anchorScroll", "$animate"], a.$inject = ["$compile", "$controller", "$route"]
}(window, window.angular), define("angular-route", function () {
}), define("camunda-commons-ui/util/uriFilter", [], function () {
  "use strict";
  var e = ["Uri", function (e) {
    return function (t) {
      return e.appUri(t)
    }
  }];
  return e
}), define("camunda-commons-ui/util/uriProvider", ["angular"], function (e) {
  "use strict";
  return function () {
    var t = /[\w]+:\/\/|:[\w]+/g, n = {};
    this.replace = function (e, t) {
      n[e] = t
    }, this.$get = ["$injector", function (r) {
      return {
        appUri: function (i) {
          var a = i.replace(t, function (t) {
            var i = n[t];
            return void 0 === i ? t : ((e.isFunction(i) || e.isArray(i)) && (i = r.invoke(i)), i)
          });
          return a
        }
      }
    }]
  }
}), define("camunda-commons-ui/util/notifications", ["angular"], function (e) {
  "use strict";
  return ["$filter", "$timeout", function (t, n) {
    return {
      notifications: [], consumers: [], addError: function (e) {
        e.type || (e.type = "danger"), this.add(e)
      }, addMessage: function (e) {
        e.type || (e.type = "info"), this.add(e)
      }, add: function (t) {
        var r = this, i = this.notifications, a = this.consumers, o = t.exclusive;
        if (o)if ("boolean" == typeof o)this.clearAll(); else {
          var s = {};
          e.forEach(o, function (e) {
            s[e] = t[e]
          }), r.clear(s)
        }
        i.push(t);
        for (var u, l = a.length - 1; (u = a[l]) && !u.add(t); l--);
        t.duration && n(function () {
          t.scope && delete t.scope, r.clear(t)
        }, t.duration), t.scope && t.scope.$on("$destroy", function () {
          delete t.scope, r.clear(t)
        })
      }, clear: function (n) {
        var r = this.notifications, i = this.consumers, a = [];
        "string" == typeof n && (n = {status: n}), a = t("filter")(r, n), a.push(n), e.forEach(a, function (t) {
          var n = r.indexOf(t);
          -1 != n && r.splice(n, 1), e.forEach(i, function (e) {
            e.remove(t)
          })
        })
      }, clearAll: function () {
        for (var e = this.notifications; e.length;) {
          var t = e.pop();
          this.clear(t)
        }
      }, registerConsumer: function (e) {
        this.consumers.push(e)
      }, unregisterConsumer: function (e) {
        var t = this.consumers, n = t.indexOf(e);
        -1 != n && t.splice(n, 1)
      }
    }
  }]
}), define("camunda-commons-ui/util/index", ["angular", "./uriFilter", "./uriProvider", "./notifications"], function (e, t, n, r) {
  "use strict";
  return e.module("cam.commons.util", []).filter("uri", t).provider("Uri", n).service("Notifications", r)
}), define("camunda-commons-ui/util", ["camunda-commons-ui/util/index"], function (e) {
  return e
}), define("text", {
  load: function (e) {
    throw new Error("Dynamic load not allowed: " + e)
  }
}), define("text!camunda-commons-ui/auth/page/login.html", [], function () {
  return '<!-- # CE - camunda-commons-ui/lib/auth/page/login.html -->\n<div class="form-signin-container">\n  <form class="form-signin"\n        ng-submit="login()"\n        name="signinForm"\n        request-aware>\n    <h2 class="form-signin-heading">Please sign in</h2>\n\n    <div notifications-panel\n         class="notifications-panel"></div>\n\n    <input autofocus\n           tabindex="1"\n           type="text"\n           class="form-control"\n           placeholder="Username"\n           auto-fill ng-model="username" />\n    <input tabindex="2"\n           type="password"\n           class="form-control"\n           placeholder="Password"\n           auto-fill\n           ng-model="password" />\n    <button tabindex="3"\n            class="btn btn-lg btn-primary"\n            type="submit">Sign in</button>\n  </form>\n</div>\n<!-- / CE - camunda-commons-ui/lib/auth/page/login.html -->\n'
}), define("camunda-commons-ui/auth/page/login", ["angular", "text!./login.html"], function (e, t) {
  "use strict";
  var n = e.element, r = ["$scope", "$rootScope", "AuthenticationService", "Notifications", "$location", function (e, t, r, i, a) {
    if (t.authentication)return a.path("/");
    t.showBreadcrumbs = !1;
    var o = n('form[name="signinForm"] [autofocus]')[0];
    o && o.focus(), e.login = function () {
      r.login(e.username, e.password).then(function () {
        i.clearAll()
      })["catch"](function () {
        i.addError({
          status: "Login Failed",
          message: "Wrong credentials or missing access rights to application",
          scope: e
        })
      })
    }
  }];
  return ["$routeProvider", function (e) {
    e.when("/login", {template: t, controller: r})
  }]
}), define("camunda-commons-ui/auth/directives/camIfLoggedIn", [], function () {
  "use strict";
  return ["$animate", "$rootScope", function (e, t) {
    return {
      transclude: "element", priority: 1e3, terminal: !0, restrict: "A", compile: function (n, r, i) {
        return function (n, r) {
          function a(t) {
            o && (e.leave(o), o = void 0), s && (s.$destroy(), s = void 0), t && (s = n.$new(), i(s, function (t) {
              o = t, e.enter(t, r.parent(), r)
            }))
          }

          var o, s;
          n.$on("authentication.changed", function (e, t) {
            a(t)
          }), a(t.authentication)
        }
      }
    }
  }]
}), define("camunda-commons-ui/auth/directives/camIfLoggedOut", [], function () {
  "use strict";
  return ["$animate", "$rootScope", function (e, t) {
    return {
      transclude: "element", priority: 1e3, terminal: !0, restrict: "A", compile: function (n, r, i) {
        return function (n, r) {
          function a(t) {
            o && (e.leave(o), o = void 0), s && (s.$destroy(), s = void 0), t && (s = n.$new(), i(s, function (t) {
              o = t, e.enter(t, r.parent(), r)
            }))
          }

          var o, s;
          n.$on("authentication.changed", function (e, t) {
            a(!t)
          }), a(!t.authentication)
        }
      }
    }
  }]
}), define("camunda-commons-ui/auth/util/authentication", ["angular"], function (e) {
  "use strict";
  function t(t) {
    e.extend(this, t)
  }

  return t.prototype.canAccess = function (e) {
    return this.authorizedApps && -1 !== this.authorizedApps.indexOf(e)
  }, t
}), define("camunda-commons-ui/auth/service/authenticationService", ["require", "angular", "jquery", "../util/authentication"], function (e) {
  "use strict";
  var t = e("jquery"), n = e("../util/authentication");
  return ["$rootScope", "$q", "$http", "Uri", function (e, r, i, a) {
    function o(t, n, r) {
      e.$broadcast(t, n, r)
    }

    function s(e) {
      if (200 !== e.status)return r.reject(e);
      var t = e.data;
      return new n({name: t.userId, authorizedApps: t.authorizedApps})
    }

    function u(t) {
      e.authentication = t, o("authentication.changed", t)
    }

    this.updateAuthentication = u, this.login = function (e, n) {
      function l(e) {
        return u(e), o("authentication.login.success", e), e
      }

      function c(e) {
        return o("authentication.login.failure", e), r.reject(e)
      }

      var p = t.param({username: e, password: n});
      return i({
        method: "POST",
        url: a.appUri("admin://auth/user/:engine/login/:appName"),
        data: p,
        headers: {"Content-Type": "application/x-www-form-urlencoded"}
      }).then(s).then(l, c)
    }, this.logout = function () {
      function e(e) {
        u(null), o("authentication.logout.success", e)
      }

      function t(e) {
        return o("authentication.logout.failure", e), r.reject(e)
      }

      return i.post(a.appUri("admin://auth/user/:engine/logout")).then(e, t)
    };
    var l;
    e.$on("authentication.changed", function (e, t) {
      l = r[t ? "when" : "reject"](t)
    }), this.getAuthentication = function () {
      function t(e) {
        return u(e), e
      }

      return l || (l = e.authentication ? r.when(e.authentication) : i.get(a.appUri("admin://auth/user/:engine")).then(s).then(t)), l
    }, e.$on("$routeChangeStart", function (e, t) {
      t.authentication && (t.resolve || (t.resolve = {}), t.resolve.authentication || (t.resolve.authentication = ["AuthenticationService", function (e) {
        return e.getAuthentication()["catch"](function (e) {
          return "optional" === t.authentication ? null : (o("authentication.login.required", t), r.reject(e))
        })
      }]))
    })
  }]
}), define("camunda-commons-ui/auth/index", ["angular", "angular-route", "../util/index", "./page/login", "./directives/camIfLoggedIn", "./directives/camIfLoggedOut", "./service/authenticationService"], function (e, t, n, r, i, a, o) {
  "use strict";
  var s = e.module("cam.commons.auth", [e.module("ngRoute").name, n.name]);
  return s.config(r).run(["$rootScope", "$location", function (e, t) {
    var n;
    e.$on("authentication.login.required", function (r) {
      e.$evalAsync(function () {
        var e = t.url();
        "/login" === e || r.defaultPrevented || (n = e, t.url("/login"))
      })
    }), e.$on("authentication.login.success", function (r) {
      e.$evalAsync(function () {
        r.defaultPrevented || (t.url(n || "/").replace(), n = null)
      })
    })
  }]).run(["$cacheFactory", "$rootScope", "$location", function (e, t, n) {
    t.$on("authentication.logout.success", function (r) {
      t.$evalAsync(function () {
        r.defaultPrevented || (e.get("$http").removeAll(), n.url("/"))
      })
    })
  }]).run(["$rootScope", "Notifications", function (e, t) {
    e.$on("authentication.login.required", function () {
      t.addError({
        status: "Unauthorized",
        message: "Login is required to access the resource",
        http: !0,
        exclusive: ["http"]
      })
    })
  }]).run(["AuthenticationService", function () {
  }]).directive("camIfLoggedIn", i).directive("camIfLoggedOut", a).service("AuthenticationService", o), s
}), define("camunda-commons-ui/auth", ["camunda-commons-ui/auth/index"], function (e) {
  return e
}), define("camunda-commons-ui/pages/index", ["angular", "angular-route"], function (e) {
  "use strict";
  function t(e) {
    var t = "camunda Login";
    -1 !== e.indexOf("/cockpit/") ? t = "camunda Cockpit" : -1 !== e.indexOf("/tasklist/") ? t = "camunda Tasklist" : -1 !== e.indexOf("/admin/") && (t = "camunda Admin"), n("head title").text(t)
  }

  var n = e.element, r = e.module("camunda.common.pages", ["ngRoute"]), i = ["$rootScope", "$location", "Notifications", "AuthenticationService", function (e, n, r, i) {
    function a(e) {
      e.http = !0, e.exclusive = ["http"], r.addError(e)
    }

    function o(r, o) {
      var s = o.status, u = o.data;
      switch (s) {
        case 500:
          a(u && u.message ? {
            status: "Server Error",
            message: u.message,
            exceptionType: u.exceptionType
          } : {
            status: "Server Error",
            message: "The server reported an internal error. Try to refresh the page or login and out of the application."
          });
          break;
        case 0:
          a({status: "Request Timeout", message: "Your request timed out. Try to refresh the page."});
          break;
        case 401:
          -1 !== n.absUrl().indexOf("/setup/#") ? n.path("/setup") : (a({
            type: "warning",
            status: "Session ended",
            message: "Your session timed out or was ended from another browser window. Please signin again."
          }), t(n.absUrl()), i.updateAuthentication(null), e.$broadcast("authentication.login.required"));
          break;
        case 403:
          a("AuthorizationException" == u.type ? {
            status: "Access Denied",
            message: "You are unauthorized to " + u.permissionName.toLowerCase() + " " + u.resourceName.toLowerCase() + (u.resourceId ? " " + u.resourceId : "s") + "."
          } : {
            status: "Access Denied",
            message: "Executing an action has been denied by the server. Try to refresh the page."
          });
          break;
        case 404:
          a({status: "Not found", message: "A resource you requested could not be found."});
          break;
        default:
          a({
            status: "Communication Error",
            message: "The application received an unexpected " + s + " response from the server. Try to refresh the page or login and out of the application."
          })
      }
    }

    e.$on("httpError", o)
  }], a = ["$scope", "$http", "$location", "$window", "Uri", "Notifications", function (t, n, r, i, a, o) {
    var s = a.appUri(":engine"), u = {};
    n.get(a.appUri("engine://engine/")).then(function (n) {
      t.engines = n.data, e.forEach(t.engines, function (e) {
        u[e.name] = e
      }), t.currentEngine = u[s], t.currentEngine || (o.addError({
        status: "Not found",
        message: "The process engine you are trying to access does not exist",
        scope: t
      }), r.path("/"))
    }), t.$watch("currentEngine", function (e) {
      e && s !== e.name && (i.location.href = a.appUri("app://../" + e.name + "/"))
    })
  }], o = ["$scope", "$location", function (e, t) {
    e.activeClass = function (e) {
      var n = t.absUrl();
      return -1 != n.indexOf(e) ? "active" : ""
    }
  }], s = ["$scope", "$window", "$cacheFactory", "$location", "Notifications", "AuthenticationService", "Uri", function (e, t, n, r, i, a) {
    e.logout = function () {
      a.logout()
    }
  }];
  return r.run(i).controller("ProcessEngineSelectionController", a).controller("AuthenticationController", s).controller("NavigationController", o)
}), define("camunda-commons-ui/plugin/view", ["angular"], function (e) {
  "use strict";
  return function (t) {
    t.directive("view", ["$q", "$http", "$templateCache", "$anchorScroll", "$compile", "$controller", function (t, n, r, i, a, o) {
      return {
        restrict: "ECA", terminal: !0, link: function (s, u, l) {
          function c() {
            h && (h.$destroy(), h = null)
          }

          function p() {
            u.html(""), c()
          }

          function f(e) {
            var t = e.template;
            if (t)return t;
            var i = e.url;
            return n.get(i, {cache: r}).then(function (e) {
              return e.data
            })
          }

          function d() {
            var n = s.$eval(l.provider), r = s.$eval(l.vars) || {};
            return n ? void t.when(f(n)).then(function (t) {
              u.html(t), c();
              var l, p = a(u.contents()), f = {};
              h = s.$new(!0), r && (r.read && e.forEach(r.read, function (e) {
                h[e] = s[e], s.$watch(e, function (t) {
                  h[e] = t
                })
              }), r.write && e.forEach(r.write, function (e) {
                h.$watch(e, function (t) {
                  s[e] = t
                })
              })), n.controller && (f.$scope = h, l = o(n.controller, f), u.children().data("$ngControllerController", l)), p(h), h.$emit("$pluginContentLoaded"), i()
            }, function (e) {
              throw p(), e
            }) : void p()
          }

          var h;
          s.$watch(l.provider, d)
        }
      }
    }])
  }
}), define("camunda-commons-ui/plugin/service", ["angular"], function (e) {
  "use strict";
  return function (t) {
    function n(e) {
      return String.prototype.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "")
    }

    t._camPlugins = {};
    var r, i = [], a = e.element("base").attr("cam-exclude-plugins") || "";
    a && (e.forEach(a.split(","), function (e) {
      e = e.split(":");
      var t = "*";
      e.length >= 2 && n(e[1]) && (t = n(e.pop())), e = n(e.shift()), e && i.push(e + ":" + t)
    }), r = new RegExp("(" + i.join("|") + ")", "i"));
    var o = [function () {
      function e(e, t) {
        for (var n, r = t.priority || 0, i = 0; n = e[i]; i++)if (!n.priority || n.priority < r)return void e.splice(i, 0, t);
        e.push(t)
      }

      function n(t, n, r) {
        var i = r[t] = r[t] || [];
        e(i, n)
      }

      var i = {};
      this.registerPlugin = function (e, a, o) {
        if (t._camPlugins[a + ":" + o.id] = !1, !r || !r.test(a + ":" + o.id)) {
          t._camPlugins[a + ":" + o.id] = !0;
          var s = i[e] = i[e] || {};
          n(a, o, s)
        }
      }, this.$get = ["$filter", function (e) {
        var t = {
          getAllProviders: function (e) {
            return i[e] || {}
          }, getProviders: function (t, n) {
            if (!t)throw new Error("No type given");
            var r = n.component;
            if (!r)throw new Error("No component given");
            var a = (i[t] || {})[r];
            return n.id && (a = e("filter")(a, {id: n.id})), a || []
          }, getProvider: function (e, t) {
            var n = this.getProviders(e, t);
            return (n || [])[0]
          }
        };
        return t
      }]
    }];
    t.provider("Plugins", o);
    var s = ["PluginsProvider", function (t) {
      this.registerDefaultView = function (e, n) {
        r && r.test(e + ":" + n.id) || t.registerPlugin("view", e, n)
      }, this.registerView = function (e, n) {
        t.registerPlugin("view", e, n)
      }, this.$get = ["Uri", "Plugins", function (t, n) {
        function r(n) {
          e.forEach(n, function (n) {
            e.forEach(n, function (e) {
              e.url && (e.url = require.toUrl(t.appUri(e.url)))
            })
          })
        }

        function i() {
          a || (r(n.getAllProviders("view")), a = !0)
        }

        var a = !1, o = {
          getProviders: function (e) {
            return i(), n.getProviders("view", e)
          }, getProvider: function (e) {
            var t = this.getProviders(e);
            return (t || [])[0]
          }
        };
        return o
      }]
    }];
    t.provider("Views", s);
    var u = ["PluginsProvider", function (t) {
      this.registerData = function (e, n) {
        t.registerPlugin("data", e, n)
      }, this.$get = ["Plugins", "$injector", function (t, n) {
        var r = {
          getProviders: function (e) {
            return t.getProviders("data", e)
          }, getProvider: function (e) {
            var t = this.getProviders(e);
            return (t || [])[0]
          }, instantiateProviders: function (t, r) {
            var i = this.getProviders({component: t});
            e.forEach(i, function (e) {
              n.instantiate(e.controller, r)
            })
          }
        };
        return r
      }]
    }];
    t.provider("Data", u)
  }
}), define("camunda-commons-ui/plugin/index", ["angular", "./view", "./service"], function (e, t, n) {
  "use strict";
  var r = e.module("cockpit.plugin", []);
  return t(r), n(r), r
}), define("camunda-commons-ui/directives/email", [], function () {
  "use strict";
  return function () {
    return {
      restrict: "A", require: "ngModel", link: function (e, t, n, r) {
        var i = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        r.$parsers.unshift(function (e) {
          return i.test(e) || !e ? (r.$setValidity("email", !0), e) : (r.$setValidity("email", !1), null)
        })
      }
    }
  }
}), define("text!camunda-commons-ui/directives/engineSelect.html", [], function () {
  return '<li class="dropdown engine-select"\n    ng-show="engines.length > 1 && currentEngine">\n<!-- # CE - camunda-commons-ui/lib/directives/engineSelect.html -->\n  <a href\n     class="dropdown-toggle"\n     data-toggle="dropdown">\n    <span class="glyphicon glyphicon-info-sign glyphicon glyphicon-info-sign "\n          tooltip="If you have multiple engines running you can select the process engine here. The data displayed in this application is based on the selected engine only."\n          tooltip-placement="bottom"></span>\n    {{ currentEngine.name }}\n  </a>\n  <ul class="dropdown-menu dropdown-menu-right">\n    <li ng-repeat="(id, engine) in engines">\n      <a ng-href="{{ \'app://../\' + engine.name + \'/\' | uri }}">\n        {{ engine.name }}\n      </a>\n    </li>\n  </ul>\n<!-- / CE - camunda-commons-ui/lib/directives/engineSelect.html -->\n</li>\n'
}), define("camunda-commons-ui/directives/engineSelect", ["angular", "text!./engineSelect.html"], function (e, t) {
  "use strict";
  var n = e.element, r = ["$scope", "$http", "$location", "$window", "Uri", "Notifications", function (t, n, r, i, a, o) {
    var s = a.appUri(":engine"), u = {};
    n.get(a.appUri("engine://engine/")).then(function (n) {
      t.engines = n.data, e.forEach(t.engines, function (e) {
        u[e.name] = e
      }), t.currentEngine = u[s], t.currentEngine || (o.addError({
        status: "Not found",
        message: "The process engine you are trying to access does not exist",
        scope: t
      }), r.path("/dashboard"))
    })
  }];
  return function () {
    return {
      template: t, replace: !0, controller: r, link: function (e, t, r) {
        var i;
        e.$watch(r.ngShow, function (e) {
          e && !i && (i = n('<li class="divider-vertical"></li>').insertAfter(t)), !e && i && (i.remove(), i = null)
        }), e.$on("$destroy", function () {
          i && i.remove()
        })
      }
    }
  }
}), define("camunda-commons-ui/directives/autoFill", [], function () {
  "use strict";
  return ["$interval", function (e) {
    return {
      restrict: "A", require: "ngModel", link: function (t, n, r, i) {
        var a = e(function () {
          var t = n.val();
          t !== i.$viewValue && (i.$setViewValue(t), i.$setPristine()), "function" != typeof document.contains || document.contains(n[0]) ? "function" != typeof document.contains && e.cancel(a) : e.cancel(a)
        }, 500)
      }
    }
  }]
}), define("text!camunda-commons-ui/directives/inPlaceTextField.html", [], function () {
  return '<!-- # CE - camunda-commons-ui/lib/directives/inPlaceTextField.html -->\n<div in-place-text-field-root>\n  <div ng-if="!editing">\n    {{ context[property] }}\n    <span class="edit-toggle"\n          ng-click="enter()">\n      <span class="glyphicon glyphicon-pencil"></span>\n    </span>\n  </div>\n\n  <form ng-if="editing"\n        ng-submit="submit()"\n        class="inline-edit"\n        name="inPlaceTextFieldForm"\n        novalidate\n        request-aware>\n\n    <fieldset>\n      <!-- {{ value }} -->\n      <input name="value"\n             ng-model="value"\n             type="text"\n             class="in-place-edit form-control"\n             placeholder="{{ placeholder }}"\n             autofocus\n             required>\n    </fieldset>\n\n    <div class="inline-edit-footer">\n\n      <p class="error" ng-show="error">\n        {{ error.message }}\n      </p>\n\n      <div class="btn-group">\n        <button type="submit"\n                class="btn btn-sm btn-primary"\n                ng-disabled="inPlaceTextFieldForm.$invalid">\n          <span class="glyphicon glyphicon-ok "></span>\n        </button>\n        <button type="button"\n                class="btn btn-sm btn-default"\n                ng-click="leave()">\n          <span class="glyphicon glyphicon-ban-circle"></span>\n        </button>\n      </div>\n    </div>\n\n  </form>\n</div>\n<!-- / CE - camunda-commons-ui/lib/directives/inPlaceTextField.html -->\n'
}), define("camunda-commons-ui/directives/inPlaceTextField", ["angular", "text!./inPlaceTextField.html"], function (e, t) {
  "use strict";
  return [function () {
    function n(t) {
      t.value = t.context[t.property] || t.defaultValue || null, t.enter = function () {
        t.editing = !0, t.value = t.context[t.property]
      }, t.submit = function () {
        var n = this;
        return t.context[t.property] === n.value ? void t.leave() : (t.context[t.property] = n.value, e.isFunction(t.$parent[t.submitCallback]) && t.$parent[t.submitCallback](n), void t.leave())
      }, t.leave = function () {
        t.editing = !1
      }
    }

    return {
      restrict: "E",
      scope: {
        unserializeCallback: "@unserialize",
        serializeCallback: "@serialize",
        initializeCallback: "@initialize",
        enterCallback: "@enter",
        validateCallback: "@validate",
        submitCallback: "@submit",
        successCallback: "@success",
        errorCallback: "@error",
        leaveCallback: "@leave",
        context: "=",
        property: "@",
        defaultValue: "@default"
      },
      template: t,
      link: function (e) {
        if (!e.property)throw new Error("You must specify a property of the context to be editable");
        var t = e.initializeCallback ? e.$parent[e.initializeCallback] : function (e, t) {
          t()
        };
        t(e, function () {
          n(e)
        })
      }
    }
  }]
}), function (e, t) {
  "use strict";
  function n() {
    this.$get = ["$$sanitizeUri", function (e) {
      return function (t) {
        var n = [];
        return a(t, u(n, function (t, n) {
          return !/^unsafe/.test(e(t, n))
        })), n.join("")
      }
    }]
  }

  function r(e) {
    var n = [], r = u(n, t.noop);
    return r.chars(e), n.join("")
  }

  function i(e) {
    var t, n = {}, r = e.split(",");
    for (t = 0; t < r.length; t++)n[r[t]] = !0;
    return n
  }

  function a(e, n) {
    function r(e, r, a, s) {
      if (r = t.lowercase(r), E[r])for (; y.last() && S[y.last()];)i("", y.last());
      $[r] && y.last() == r && i("", r), s = b[r] || !!s, s || y.push(r);
      var u = {};
      a.replace(f, function (e, t, n, r, i) {
        var a = n || r || i || "";
        u[t] = o(a)
      }), n.start && n.start(r, u, s)
    }

    function i(e, r) {
      var i, a = 0;
      if (r = t.lowercase(r))for (a = y.length - 1; a >= 0 && y[a] != r; a--);
      if (a >= 0) {
        for (i = y.length - 1; i >= a; i--)n.end && n.end(y[i]);
        y.length = a
      }
    }

    var a, s, u, y = [], x = e;
    for (y.last = function () {
      return y[y.length - 1]
    }; e;) {
      if (s = !0, y.last() && T[y.last()])e = e.replace(new RegExp("(.*)<\\s*\\/\\s*" + y.last() + "[^>]*>", "i"), function (e, t) {
        return t = t.replace(m, "$1").replace(v, "$1"), n.chars && n.chars(o(t)), ""
      }), i("", y.last()); else if (0 === e.indexOf("<!--") ? (a = e.indexOf("--", 4), a >= 0 && e.lastIndexOf("-->", a) === a && (n.comment && n.comment(e.substring(4, a)), e = e.substring(a + 3), s = !1)) : g.test(e) ? (u = e.match(g), u && (e = e.replace(u[0], ""), s = !1)) : h.test(e) ? (u = e.match(p), u && (e = e.substring(u[0].length), u[0].replace(p, i), s = !1)) : d.test(e) && (u = e.match(c), u && (e = e.substring(u[0].length), u[0].replace(c, r), s = !1)), s) {
        a = e.indexOf("<");
        var w = 0 > a ? e : e.substring(0, a);
        e = 0 > a ? "" : e.substring(a), n.chars && n.chars(o(w))
      }
      if (e == x)throw l("badparse", "The sanitizer was unable to parse the following block of html: {0}", e);
      x = e
    }
    i()
  }

  function o(e) {
    if (!e)return "";
    var t = D.exec(e), n = t[1], r = t[3], i = t[2];
    return i && (_.innerHTML = i.replace(/</g, "&lt;"), i = "textContent"in _ ? _.textContent : _.innerText), n + i + r
  }

  function s(e) {
    return e.replace(/&/g, "&amp;").replace(y, function (e) {
      return "&#" + e.charCodeAt(0) + ";"
    }).replace(/</g, "&lt;").replace(/>/g, "&gt;")
  }

  function u(e, n) {
    var r = !1, i = t.bind(e, e.push);
    return {
      start: function (e, a, o) {
        e = t.lowercase(e), !r && T[e] && (r = e), r || C[e] !== !0 || (i("<"), i(e), t.forEach(a, function (r, a) {
          var o = t.lowercase(a), u = "img" === e && "src" === o || "background" === o;
          A[o] !== !0 || k[o] === !0 && !n(r, u) || (i(" "), i(a), i('="'), i(s(r)), i('"'))
        }), i(o ? "/>" : ">"))
      }, end: function (e) {
        e = t.lowercase(e), r || C[e] !== !0 || (i("</"), i(e), i(">")), e == r && (r = !1)
      }, chars: function (e) {
        r || i(s(e))
      }
    }
  }

  var l = t.$$minErr("$sanitize"), c = /^<\s*([\w:-]+)((?:\s+[\w:-]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)\s*>/, p = /^<\s*\/\s*([\w:-]+)[^>]*>/, f = /([\w:-]+)(?:\s*=\s*(?:(?:"((?:[^"])*)")|(?:'((?:[^'])*)')|([^>\s]+)))?/g, d = /^</, h = /^<\s*\//, m = /<!--(.*?)-->/g, g = /<!DOCTYPE([^>]*?)>/i, v = /<!\[CDATA\[(.*?)]]>/g, y = /([^\#-~| |!])/g, b = i("area,br,col,hr,img,wbr"), x = i("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"), w = i("rp,rt"), $ = t.extend({}, w, x), E = t.extend({}, x, i("address,article,aside,blockquote,caption,center,del,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,map,menu,nav,ol,pre,script,section,table,ul")), S = t.extend({}, w, i("a,abbr,acronym,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,q,ruby,rp,rt,s,samp,small,span,strike,strong,sub,sup,time,tt,u,var")), T = i("script,style"), C = t.extend({}, b, E, S, $), k = i("background,cite,href,longdesc,src,usemap"), A = t.extend({}, k, i("abbr,align,alt,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,coords,dir,face,headers,height,hreflang,hspace,ismap,lang,language,nohref,nowrap,rel,rev,rows,rowspan,rules,scope,scrolling,shape,size,span,start,summary,target,title,type,valign,value,vspace,width")), _ = document.createElement("pre"), D = /^(\s*)([\s\S]*?)(\s*)$/;
  t.module("ngSanitize", []).provider("$sanitize", n), t.module("ngSanitize").filter("linky", ["$sanitize", function (e) {
    var n = /((ftp|https?):\/\/|(mailto:)?[A-Za-z0-9._%+-]+@)\S*[^\s.;,(){}<>]/, i = /^mailto:/;
    return function (a, o) {
      function s(e) {
        e && d.push(r(e))
      }

      function u(e, n) {
        d.push("<a "), t.isDefined(o) && (d.push('target="'), d.push(o), d.push('" ')), d.push('href="'), d.push(e), d.push('">'), s(n), d.push("</a>")
      }

      if (!a)return a;
      for (var l, c, p, f = a, d = []; l = f.match(n);)c = l[0], l[2] == l[3] && (c = "mailto:" + c), p = l.index, s(f.substr(0, p)), u(c, l[0].replace(i, "")), f = f.substring(p + l[0].length);
      return s(f), e(d.join(""))
    }
  }])
}(window, window.angular), define("angular-sanitize", function () {
}), define("camunda-commons-ui/directives/notificationsPanel", ["angular-sanitize"], function () {
  "use strict";
  var e = '<div class="notifications">  <div ng-repeat="notification in notifications" class="alert" ng-class="notificationClass(notification)">    <button type="button" class="close" ng-click="removeNotification(notification)">&times;</button>    <strong class="status" ng-bind-html="trustHTML(notification.status)" compile-template></strong>     <strong ng-if="notification.message">:</strong>    <span class="message" ng-bind-html="trustHTML(notification.message)" compile-template></span>  </div></div>';
  return ["Notifications", "$filter", "$sce", function (t, n, r) {
    return {
      restrict: "EA", scope: {filter: "=notificationsFilter"}, template: e, link: function (e) {
        function i(e) {
          return a ? !!n("filter")([e], a).length : !0
        }

        var a = e.filter, o = e.notifications = [], s = {
          add: function (e) {
            return i(e) ? (o.push(e), !0) : !1
          }, remove: function (e) {
            var t = o.indexOf(e);
            -1 != t && o.splice(t, 1)
          }
        };
        t.registerConsumer(s), e.removeNotification = function (e) {
          o.splice(o.indexOf(e), 1)
        }, e.notificationClass = function (e) {
          var t = ["danger", "error", "success", "warning", "info"], n = "info";
          return t.indexOf(e.type) > -1 && (n = e.type), "alert-" + n
        }, e.trustHTML = function (e) {
          return r.trustAsHtml(e)
        }, e.$on("$destroy", function () {
          t.unregisterConsumer(s)
        })
      }
    }
  }]
}), define("camunda-commons-ui/directives/password", [], function () {
  "use strict";
  return function () {
    return {
      restrict: "A", require: "ngModel", link: function (e, t, n, r) {
        r.$parsers.unshift(function (e) {
          return e && e.length >= 8 ? r.$setValidity("password", !0) : r.$setValidity("password", !1), e
        })
      }
    }
  }
}), define("camunda-commons-ui/directives/passwordRepeat", [], function () {
  "use strict";
  return function () {
    return {
      restrict: "A", require: "ngModel", link: function (e, t, n, r) {
        var i = n.passwordRepeat;
        r.$parsers.unshift(function (t) {
          var n = e.$eval(i), a = t == n;
          return r.$setValidity("passwordRepeat", a), t
        }), e.$watch(i, function (e) {
          var t = e == r.$viewValue;
          r.$setValidity("passwordRepeat", t), t || r.$setViewValue(r.$viewValue)
        })
      }
    }
  }
}), define("camunda-commons-ui/directives/requestAware", ["angular", "jquery"], function (e, t) {
  "use strict";
  return [function () {
    return {
      require: "form", link: function (e, n, r, i) {
        function a(e) {
          i.$setValidity("request", e)
        }

        function o(e) {
          var r = t(":input", n);
          e ? r.removeAttr("disabled") : r.attr("disabled", "disabled")
        }

        function s(e) {
          o(e), a(e)
        }

        i.$load = {
          start: function () {
            e.$broadcast("formLoadStarted")
          }, finish: function () {
            e.$broadcast("formLoadFinished")
          }
        }, e.$on("formLoadStarted", function () {
          s(!1)
        }), e.$on("formLoadFinished", function () {
          s(!0)
        }), "manual" != r.requestAware && (e.$on("requestStarted", function () {
          i.$load.start()
        }), e.$on("requestFinished", function () {
          i.$load.finish()
        }))
      }
    }
  }]
}), define("camunda-commons-ui/directives/showIfAuthorized", [], function () {
  "use strict";
  var e = {application: 0, user: 1, group: 2, "group membership": 3, authorization: 4}, t = function (t, n, r) {
    var i = {};
    return i.permissionName = t, i.resourceName = n, i.resourceType = e[n], r && (i.resourceId = r), i
  };
  return ["$animate", "AuthorizationResource", function (e, n) {
    return {
      transclude: "element", priority: 1e3, terminal: !0, restrict: "A", compile: function (r, i, a) {
        return function (r, o) {
          var s, u, l = i.authPermission, c = i.authResourceName, p = r.$eval(i.authResourceId);
          n.check(t(l, c, p)).$promise.then(function (t) {
            s && (e.leave(s), s = void 0), u && (u.$destroy(), u = void 0), t.authorized && (u = r.$new(), a(u, function (t) {
              s = t, e.enter(t, o.parent(), o)
            }))
          })
        }
      }
    }
  }]
}), define("camunda-commons-ui/directives/compileTemplate", [], function () {
  "use strict";
  return ["$compile", "$parse", function (e, t) {
    return {
      restrict: "A", link: function (n, r, i) {
        function a() {
          return (o(n) || "").toString()
        }

        var o = t(i.ngBindHtml);
        n.$watch(a, function () {
          e(r.contents())(n)
        })
      }
    }
  }]
}), define("camunda-commons-ui/directives/nl2br", [], function () {
  "use strict";
  return [function () {
    return {
      scope: {original: "=nl2br"}, link: function (e, t) {
        t.html((e.original || "").replace(/\n/g, "<br/>"))
      }
    }
  }]
}), define("camunda-commons-ui/directives/instantTypeahead", [], function () {
  "use strict";
  var e = "[$empty$]";
  return ["$timeout", function (t) {
    return {
      restrict: "A", require: "ngModel", link: function (n, r, i, a) {
        t(function () {
          a.$parsers.unshift(function (t) {
            var n = t ? t : e;
            return a.$viewValue = n, n
          }), a.$parsers.push(function (t) {
            return t === e ? "" : t
          }), n.instantTypeahead = function (t, n) {
            return n === e || ("" + t).toLowerCase().indexOf(("" + n).toLowerCase()) > -1
          }, r.bind("click", function () {
            r.trigger("input")
          })
        })
      }
    }
  }]
}), angular.module("ui.bootstrap", ["ui.bootstrap.tpls", "ui.bootstrap.transition", "ui.bootstrap.collapse", "ui.bootstrap.accordion", "ui.bootstrap.alert", "ui.bootstrap.bindHtml", "ui.bootstrap.buttons", "ui.bootstrap.carousel", "ui.bootstrap.dateparser", "ui.bootstrap.position", "ui.bootstrap.datepicker", "ui.bootstrap.dropdown", "ui.bootstrap.modal", "ui.bootstrap.pagination", "ui.bootstrap.tooltip", "ui.bootstrap.popover", "ui.bootstrap.progressbar", "ui.bootstrap.rating", "ui.bootstrap.tabs", "ui.bootstrap.timepicker", "ui.bootstrap.typeahead"]), angular.module("ui.bootstrap.tpls", ["template/accordion/accordion-group.html", "template/accordion/accordion.html", "template/alert/alert.html", "template/carousel/carousel.html", "template/carousel/slide.html", "template/datepicker/datepicker.html", "template/datepicker/day.html", "template/datepicker/month.html", "template/datepicker/popup.html", "template/datepicker/year.html", "template/modal/backdrop.html", "template/modal/window.html", "template/pagination/pager.html", "template/pagination/pagination.html", "template/tooltip/tooltip-html-unsafe-popup.html", "template/tooltip/tooltip-popup.html", "template/popover/popover.html", "template/progressbar/bar.html", "template/progressbar/progress.html", "template/progressbar/progressbar.html", "template/rating/rating.html", "template/tabs/tab.html", "template/tabs/tabset.html", "template/timepicker/timepicker.html", "template/typeahead/typeahead-match.html", "template/typeahead/typeahead-popup.html"]), angular.module("ui.bootstrap.transition", []).factory("$transition", ["$q", "$timeout", "$rootScope", function (e, t, n) {
  function r(e) {
    for (var t in e)if (void 0 !== a.style[t])return e[t]
  }

  var i = function (r, a, o) {
    o = o || {};
    var s = e.defer(), u = i[o.animation ? "animationEndEventName" : "transitionEndEventName"], l = function () {
      n.$apply(function () {
        r.unbind(u, l), s.resolve(r)
      })
    };
    return u && r.bind(u, l), t(function () {
      angular.isString(a) ? r.addClass(a) : angular.isFunction(a) ? a(r) : angular.isObject(a) && r.css(a), u || s.resolve(r)
    }), s.promise.cancel = function () {
      u && r.unbind(u, l), s.reject("Transition cancelled")
    }, s.promise
  }, a = document.createElement("trans"), o = {
    WebkitTransition: "webkitTransitionEnd",
    MozTransition: "transitionend",
    OTransition: "oTransitionEnd",
    transition: "transitionend"
  }, s = {
    WebkitTransition: "webkitAnimationEnd",
    MozTransition: "animationend",
    OTransition: "oAnimationEnd",
    transition: "animationend"
  };
  return i.transitionEndEventName = r(o), i.animationEndEventName = r(s), i
}]), angular.module("ui.bootstrap.collapse", ["ui.bootstrap.transition"]).directive("collapse", ["$transition", function (e) {
  return {
    link: function (t, n, r) {
      function i(t) {
        function r() {
          l === i && (l = void 0)
        }

        var i = e(n, t);
        return l && l.cancel(), l = i, i.then(r, r), i
      }

      function a() {
        c ? (c = !1, o()) : (n.removeClass("collapse").addClass("collapsing"), i({height: n[0].scrollHeight + "px"}).then(o))
      }

      function o() {
        n.removeClass("collapsing"), n.addClass("collapse in"), n.css({height: "auto"})
      }

      function s() {
        if (c)c = !1, u(), n.css({height: 0}); else {
          n.css({height: n[0].scrollHeight + "px"});
          {
            n[0].offsetWidth
          }
          n.removeClass("collapse in").addClass("collapsing"), i({height: 0}).then(u)
        }
      }

      function u() {
        n.removeClass("collapsing"), n.addClass("collapse")
      }

      var l, c = !0;
      t.$watch(r.collapse, function (e) {
        e ? s() : a()
      })
    }
  }
}]), angular.module("ui.bootstrap.accordion", ["ui.bootstrap.collapse"]).constant("accordionConfig", {closeOthers: !0}).controller("AccordionController", ["$scope", "$attrs", "accordionConfig", function (e, t, n) {
  this.groups = [], this.closeOthers = function (r) {
    var i = angular.isDefined(t.closeOthers) ? e.$eval(t.closeOthers) : n.closeOthers;
    i && angular.forEach(this.groups, function (e) {
      e !== r && (e.isOpen = !1)
    })
  }, this.addGroup = function (e) {
    var t = this;
    this.groups.push(e), e.$on("$destroy", function () {
      t.removeGroup(e)
    })
  }, this.removeGroup = function (e) {
    var t = this.groups.indexOf(e);
    -1 !== t && this.groups.splice(t, 1)
  }
}]).directive("accordion", function () {
  return {
    restrict: "EA",
    controller: "AccordionController",
    transclude: !0,
    replace: !1,
    templateUrl: "template/accordion/accordion.html"
  }
}).directive("accordionGroup", function () {
  return {
    require: "^accordion",
    restrict: "EA",
    transclude: !0,
    replace: !0,
    templateUrl: "template/accordion/accordion-group.html",
    scope: {heading: "@", isOpen: "=?", isDisabled: "=?"},
    controller: function () {
      this.setHeading = function (e) {
        this.heading = e
      }
    },
    link: function (e, t, n, r) {
      r.addGroup(e), e.$watch("isOpen", function (t) {
        t && r.closeOthers(e)
      }), e.toggleOpen = function () {
        e.isDisabled || (e.isOpen = !e.isOpen)
      }
    }
  }
}).directive("accordionHeading", function () {
  return {
    restrict: "EA",
    transclude: !0,
    template: "",
    replace: !0,
    require: "^accordionGroup",
    link: function (e, t, n, r, i) {
      r.setHeading(i(e, function () {
      }))
    }
  }
}).directive("accordionTransclude", function () {
  return {
    require: "^accordionGroup", link: function (e, t, n, r) {
      e.$watch(function () {
        return r[n.accordionTransclude]
      }, function (e) {
        e && (t.html(""), t.append(e))
      })
    }
  }
}), angular.module("ui.bootstrap.alert", []).controller("AlertController", ["$scope", "$attrs", function (e, t) {
  e.closeable = "close"in t
}]).directive("alert", function () {
  return {
    restrict: "EA",
    controller: "AlertController",
    templateUrl: "template/alert/alert.html",
    transclude: !0,
    replace: !0,
    scope: {type: "@", close: "&"}
  }
}), angular.module("ui.bootstrap.bindHtml", []).directive("bindHtmlUnsafe", function () {
  return function (e, t, n) {
    t.addClass("ng-binding").data("$binding", n.bindHtmlUnsafe), e.$watch(n.bindHtmlUnsafe, function (e) {
      t.html(e || "")
    })
  }
}), angular.module("ui.bootstrap.buttons", []).constant("buttonConfig", {
  activeClass: "active",
  toggleEvent: "click"
}).controller("ButtonsController", ["buttonConfig", function (e) {
  this.activeClass = e.activeClass || "active", this.toggleEvent = e.toggleEvent || "click"
}]).directive("btnRadio", function () {
  return {
    require: ["btnRadio", "ngModel"], controller: "ButtonsController", link: function (e, t, n, r) {
      var i = r[0], a = r[1];
      a.$render = function () {
        t.toggleClass(i.activeClass, angular.equals(a.$modelValue, e.$eval(n.btnRadio)))
      }, t.bind(i.toggleEvent, function () {
        var r = t.hasClass(i.activeClass);
        (!r || angular.isDefined(n.uncheckable)) && e.$apply(function () {
          a.$setViewValue(r ? null : e.$eval(n.btnRadio)), a.$render()
        })
      })
    }
  }
}).directive("btnCheckbox", function () {
  return {
    require: ["btnCheckbox", "ngModel"], controller: "ButtonsController", link: function (e, t, n, r) {
      function i() {
        return o(n.btnCheckboxTrue, !0)
      }

      function a() {
        return o(n.btnCheckboxFalse, !1)
      }

      function o(t, n) {
        var r = e.$eval(t);
        return angular.isDefined(r) ? r : n
      }

      var s = r[0], u = r[1];
      u.$render = function () {
        t.toggleClass(s.activeClass, angular.equals(u.$modelValue, i()))
      }, t.bind(s.toggleEvent, function () {
        e.$apply(function () {
          u.$setViewValue(t.hasClass(s.activeClass) ? a() : i()), u.$render()
        })
      })
    }
  }
}), angular.module("ui.bootstrap.carousel", ["ui.bootstrap.transition"]).controller("CarouselController", ["$scope", "$timeout", "$transition", function (e, t, n) {
  function r() {
    i();
    var n = +e.interval;
    !isNaN(n) && n >= 0 && (o = t(a, n))
  }

  function i() {
    o && (t.cancel(o), o = null)
  }

  function a() {
    s ? (e.next(), r()) : e.pause()
  }

  var o, s, u = this, l = u.slides = e.slides = [], c = -1;
  u.currentSlide = null;
  var p = !1;
  u.select = e.select = function (i, a) {
    function o() {
      if (!p) {
        if (u.currentSlide && angular.isString(a) && !e.noTransition && i.$element) {
          i.$element.addClass(a);
          {
            i.$element[0].offsetWidth
          }
          angular.forEach(l, function (e) {
            angular.extend(e, {direction: "", entering: !1, leaving: !1, active: !1})
          }), angular.extend(i, {
            direction: a,
            active: !0,
            entering: !0
          }), angular.extend(u.currentSlide || {}, {
            direction: a,
            leaving: !0
          }), e.$currentTransition = n(i.$element, {}), function (t, n) {
            e.$currentTransition.then(function () {
              s(t, n)
            }, function () {
              s(t, n)
            })
          }(i, u.currentSlide)
        } else s(i, u.currentSlide);
        u.currentSlide = i, c = f, r()
      }
    }

    function s(t, n) {
      angular.extend(t, {direction: "", active: !0, leaving: !1, entering: !1}), angular.extend(n || {}, {
        direction: "",
        active: !1,
        leaving: !1,
        entering: !1
      }), e.$currentTransition = null
    }

    var f = l.indexOf(i);
    void 0 === a && (a = f > c ? "next" : "prev"), i && i !== u.currentSlide && (e.$currentTransition ? (e.$currentTransition.cancel(), t(o)) : o())
  }, e.$on("$destroy", function () {
    p = !0
  }), u.indexOfSlide = function (e) {
    return l.indexOf(e)
  }, e.next = function () {
    var t = (c + 1) % l.length;
    return e.$currentTransition ? void 0 : u.select(l[t], "next")
  }, e.prev = function () {
    var t = 0 > c - 1 ? l.length - 1 : c - 1;
    return e.$currentTransition ? void 0 : u.select(l[t], "prev")
  }, e.isActive = function (e) {
    return u.currentSlide === e
  }, e.$watch("interval", r), e.$on("$destroy", i), e.play = function () {
    s || (s = !0, r())
  }, e.pause = function () {
    e.noPause || (s = !1, i())
  }, u.addSlide = function (t, n) {
    t.$element = n, l.push(t), 1 === l.length || t.active ? (u.select(l[l.length - 1]), 1 == l.length && e.play()) : t.active = !1
  }, u.removeSlide = function (e) {
    var t = l.indexOf(e);
    l.splice(t, 1), l.length > 0 && e.active ? u.select(t >= l.length ? l[t - 1] : l[t]) : c > t && c--
  }
}]).directive("carousel", [function () {
  return {
    restrict: "EA",
    transclude: !0,
    replace: !0,
    controller: "CarouselController",
    require: "carousel",
    templateUrl: "template/carousel/carousel.html",
    scope: {interval: "=", noTransition: "=", noPause: "="}
  }
}]).directive("slide", function () {
  return {
    require: "^carousel",
    restrict: "EA",
    transclude: !0,
    replace: !0,
    templateUrl: "template/carousel/slide.html",
    scope: {active: "=?"},
    link: function (e, t, n, r) {
      r.addSlide(e, t), e.$on("$destroy", function () {
        r.removeSlide(e)
      }), e.$watch("active", function (t) {
        t && r.select(e)
      })
    }
  }
}), angular.module("ui.bootstrap.dateparser", []).service("dateParser", ["$locale", "orderByFilter", function (e, t) {
  function n(e) {
    var n = [], r = e.split("");
    return angular.forEach(i, function (t, i) {
      var a = e.indexOf(i);
      if (a > -1) {
        e = e.split(""), r[a] = "(" + t.regex + ")", e[a] = "$";
        for (var o = a + 1, s = a + i.length; s > o; o++)r[o] = "", e[o] = "$";
        e = e.join(""), n.push({index: a, apply: t.apply})
      }
    }), {regex: new RegExp("^" + r.join("") + "$"), map: t(n, "index")}
  }

  function r(e, t, n) {
    return 1 === t && n > 28 ? 29 === n && (e % 4 === 0 && e % 100 !== 0 || e % 400 === 0) : 3 === t || 5 === t || 8 === t || 10 === t ? 31 > n : !0
  }

  this.parsers = {};
  var i = {
    yyyy: {
      regex: "\\d{4}", apply: function (e) {
        this.year = +e
      }
    }, yy: {
      regex: "\\d{2}", apply: function (e) {
        this.year = +e + 2e3
      }
    }, y: {
      regex: "\\d{1,4}", apply: function (e) {
        this.year = +e
      }
    }, MMMM: {
      regex: e.DATETIME_FORMATS.MONTH.join("|"), apply: function (t) {
        this.month = e.DATETIME_FORMATS.MONTH.indexOf(t)
      }
    }, MMM: {
      regex: e.DATETIME_FORMATS.SHORTMONTH.join("|"), apply: function (t) {
        this.month = e.DATETIME_FORMATS.SHORTMONTH.indexOf(t)
      }
    }, MM: {
      regex: "0[1-9]|1[0-2]", apply: function (e) {
        this.month = e - 1
      }
    }, M: {
      regex: "[1-9]|1[0-2]", apply: function (e) {
        this.month = e - 1
      }
    }, dd: {
      regex: "[0-2][0-9]{1}|3[0-1]{1}", apply: function (e) {
        this.date = +e
      }
    }, d: {
      regex: "[1-2]?[0-9]{1}|3[0-1]{1}", apply: function (e) {
        this.date = +e
      }
    }, EEEE: {regex: e.DATETIME_FORMATS.DAY.join("|")}, EEE: {regex: e.DATETIME_FORMATS.SHORTDAY.join("|")}
  };
  this.parse = function (t, i) {
    if (!angular.isString(t) || !i)return t;
    i = e.DATETIME_FORMATS[i] || i, this.parsers[i] || (this.parsers[i] = n(i));
    var a = this.parsers[i], o = a.regex, s = a.map, u = t.match(o);
    if (u && u.length) {
      for (var l, c = {year: 1900, month: 0, date: 1, hours: 0}, p = 1, f = u.length; f > p; p++) {
        var d = s[p - 1];
        d.apply && d.apply.call(c, u[p])
      }
      return r(c.year, c.month, c.date) && (l = new Date(c.year, c.month, c.date, c.hours)), l
    }
  }
}]), angular.module("ui.bootstrap.position", []).factory("$position", ["$document", "$window", function (e, t) {
  function n(e, n) {
    return e.currentStyle ? e.currentStyle[n] : t.getComputedStyle ? t.getComputedStyle(e)[n] : e.style[n]
  }

  function r(e) {
    return "static" === (n(e, "position") || "static")
  }

  var i = function (t) {
    for (var n = e[0], i = t.offsetParent || n; i && i !== n && r(i);)i = i.offsetParent;
    return i || n
  };
  return {
    position: function (t) {
      var n = this.offset(t), r = {top: 0, left: 0}, a = i(t[0]);
      a != e[0] && (r = this.offset(angular.element(a)), r.top += a.clientTop - a.scrollTop, r.left += a.clientLeft - a.scrollLeft);
      var o = t[0].getBoundingClientRect();
      return {
        width: o.width || t.prop("offsetWidth"),
        height: o.height || t.prop("offsetHeight"),
        top: n.top - r.top,
        left: n.left - r.left
      }
    }, offset: function (n) {
      var r = n[0].getBoundingClientRect();
      return {
        width: r.width || n.prop("offsetWidth"),
        height: r.height || n.prop("offsetHeight"),
        top: r.top + (t.pageYOffset || e[0].documentElement.scrollTop),
        left: r.left + (t.pageXOffset || e[0].documentElement.scrollLeft)
      }
    }, positionElements: function (e, t, n, r) {
      var i, a, o, s, u = n.split("-"), l = u[0], c = u[1] || "center";
      i = r ? this.offset(e) : this.position(e), a = t.prop("offsetWidth"), o = t.prop("offsetHeight");
      var p = {
        center: function () {
          return i.left + i.width / 2 - a / 2
        }, left: function () {
          return i.left
        }, right: function () {
          return i.left + i.width
        }
      }, f = {
        center: function () {
          return i.top + i.height / 2 - o / 2
        }, top: function () {
          return i.top
        }, bottom: function () {
          return i.top + i.height
        }
      };
      switch (l) {
        case"right":
          s = {top: f[c](), left: p[l]()};
          break;
        case"left":
          s = {top: f[c](), left: i.left - a};
          break;
        case"bottom":
          s = {top: f[l](), left: p[c]()};
          break;
        default:
          s = {top: i.top - o, left: p[c]()}
      }
      return s
    }
  }
}]), angular.module("ui.bootstrap.datepicker", ["ui.bootstrap.dateparser", "ui.bootstrap.position"]).constant("datepickerConfig", {
  formatDay: "dd",
  formatMonth: "MMMM",
  formatYear: "yyyy",
  formatDayHeader: "EEE",
  formatDayTitle: "MMMM yyyy",
  formatMonthTitle: "yyyy",
  datepickerMode: "day",
  minMode: "day",
  maxMode: "year",
  showWeeks: !0,
  startingDay: 0,
  yearRange: 20,
  minDate: null,
  maxDate: null
}).controller("DatepickerController", ["$scope", "$attrs", "$parse", "$interpolate", "$timeout", "$log", "dateFilter", "datepickerConfig", function (e, t, n, r, i, a, o, s) {
  var u = this, l = {$setViewValue: angular.noop};
  this.modes = ["day", "month", "year"], angular.forEach(["formatDay", "formatMonth", "formatYear", "formatDayHeader", "formatDayTitle", "formatMonthTitle", "minMode", "maxMode", "showWeeks", "startingDay", "yearRange"], function (n, i) {
    u[n] = angular.isDefined(t[n]) ? 8 > i ? r(t[n])(e.$parent) : e.$parent.$eval(t[n]) : s[n]
  }), angular.forEach(["minDate", "maxDate"], function (r) {
    t[r] ? e.$parent.$watch(n(t[r]), function (e) {
      u[r] = e ? new Date(e) : null, u.refreshView()
    }) : u[r] = s[r] ? new Date(s[r]) : null
  }), e.datepickerMode = e.datepickerMode || s.datepickerMode, e.uniqueId = "datepicker-" + e.$id + "-" + Math.floor(1e4 * Math.random()), this.activeDate = angular.isDefined(t.initDate) ? e.$parent.$eval(t.initDate) : new Date, e.isActive = function (t) {
    return 0 === u.compare(t.date, u.activeDate) ? (e.activeDateId = t.uid, !0) : !1
  }, this.init = function (e) {
    l = e, l.$render = function () {
      u.render()
    }
  }, this.render = function () {
    if (l.$modelValue) {
      var e = new Date(l.$modelValue), t = !isNaN(e);
      t ? this.activeDate = e : a.error('Datepicker directive: "ng-model" value must be a Date object, a number of milliseconds since 01.01.1970 or a string representing an RFC2822 or ISO 8601 date.'), l.$setValidity("date", t)
    }
    this.refreshView()
  }, this.refreshView = function () {
    if (this.element) {
      this._refreshView();
      var e = l.$modelValue ? new Date(l.$modelValue) : null;
      l.$setValidity("date-disabled", !e || this.element && !this.isDisabled(e))
    }
  }, this.createDateObject = function (e, t) {
    var n = l.$modelValue ? new Date(l.$modelValue) : null;
    return {
      date: e,
      label: o(e, t),
      selected: n && 0 === this.compare(e, n),
      disabled: this.isDisabled(e),
      current: 0 === this.compare(e, new Date)
    }
  }, this.isDisabled = function (n) {
    return this.minDate && this.compare(n, this.minDate) < 0 || this.maxDate && this.compare(n, this.maxDate) > 0 || t.dateDisabled && e.dateDisabled({
        date: n,
        mode: e.datepickerMode
      })
  }, this.split = function (e, t) {
    for (var n = []; e.length > 0;)n.push(e.splice(0, t));
    return n
  }, e.select = function (t) {
    if (e.datepickerMode === u.minMode) {
      var n = l.$modelValue ? new Date(l.$modelValue) : new Date(0, 0, 0, 0, 0, 0, 0);
      n.setFullYear(t.getFullYear(), t.getMonth(), t.getDate()), l.$setViewValue(n), l.$render()
    } else u.activeDate = t, e.datepickerMode = u.modes[u.modes.indexOf(e.datepickerMode) - 1]
  }, e.move = function (e) {
    var t = u.activeDate.getFullYear() + e * (u.step.years || 0), n = u.activeDate.getMonth() + e * (u.step.months || 0);
    u.activeDate.setFullYear(t, n, 1), u.refreshView()
  }, e.toggleMode = function (t) {
    t = t || 1, e.datepickerMode === u.maxMode && 1 === t || e.datepickerMode === u.minMode && -1 === t || (e.datepickerMode = u.modes[u.modes.indexOf(e.datepickerMode) + t])
  }, e.keys = {
    13: "enter",
    32: "space",
    33: "pageup",
    34: "pagedown",
    35: "end",
    36: "home",
    37: "left",
    38: "up",
    39: "right",
    40: "down"
  };
  var c = function () {
    i(function () {
      u.element[0].focus()
    }, 0, !1)
  };
  e.$on("datepicker.focus", c), e.keydown = function (t) {
    var n = e.keys[t.which];
    if (n && !t.shiftKey && !t.altKey)if (t.preventDefault(), t.stopPropagation(), "enter" === n || "space" === n) {
      if (u.isDisabled(u.activeDate))return;
      e.select(u.activeDate), c()
    } else!t.ctrlKey || "up" !== n && "down" !== n ? (u.handleKeyDown(n, t), u.refreshView()) : (e.toggleMode("up" === n ? 1 : -1), c())
  }
}]).directive("datepicker", function () {
  return {
    restrict: "EA",
    replace: !0,
    templateUrl: "template/datepicker/datepicker.html",
    scope: {datepickerMode: "=?", dateDisabled: "&"},
    require: ["datepicker", "?^ngModel"],
    controller: "DatepickerController",
    link: function (e, t, n, r) {
      var i = r[0], a = r[1];
      a && i.init(a)
    }
  }
}).directive("daypicker", ["dateFilter", function (e) {
  return {
    restrict: "EA",
    replace: !0,
    templateUrl: "template/datepicker/day.html",
    require: "^datepicker",
    link: function (t, n, r, i) {
      function a(e, t) {
        return 1 !== t || e % 4 !== 0 || e % 100 === 0 && e % 400 !== 0 ? u[t] : 29
      }

      function o(e, t) {
        var n = new Array(t), r = new Date(e), i = 0;
        for (r.setHours(12); t > i;)n[i++] = new Date(r), r.setDate(r.getDate() + 1);
        return n
      }

      function s(e) {
        var t = new Date(e);
        t.setDate(t.getDate() + 4 - (t.getDay() || 7));
        var n = t.getTime();
        return t.setMonth(0), t.setDate(1), Math.floor(Math.round((n - t) / 864e5) / 7) + 1
      }

      t.showWeeks = i.showWeeks, i.step = {months: 1}, i.element = n;
      var u = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      i._refreshView = function () {
        var n = i.activeDate.getFullYear(), r = i.activeDate.getMonth(), a = new Date(n, r, 1), u = i.startingDay - a.getDay(), l = u > 0 ? 7 - u : -u, c = new Date(a);
        l > 0 && c.setDate(-l + 1);
        for (var p = o(c, 42), f = 0; 42 > f; f++)p[f] = angular.extend(i.createDateObject(p[f], i.formatDay), {
          secondary: p[f].getMonth() !== r,
          uid: t.uniqueId + "-" + f
        });
        t.labels = new Array(7);
        for (var d = 0; 7 > d; d++)t.labels[d] = {abbr: e(p[d].date, i.formatDayHeader), full: e(p[d].date, "EEEE")};
        if (t.title = e(i.activeDate, i.formatDayTitle), t.rows = i.split(p, 7), t.showWeeks) {
          t.weekNumbers = [];
          for (var h = s(t.rows[0][0].date), m = t.rows.length; t.weekNumbers.push(h++) < m;);
        }
      }, i.compare = function (e, t) {
        return new Date(e.getFullYear(), e.getMonth(), e.getDate()) - new Date(t.getFullYear(), t.getMonth(), t.getDate())
      }, i.handleKeyDown = function (e) {
        var t = i.activeDate.getDate();
        if ("left" === e)t -= 1; else if ("up" === e)t -= 7; else if ("right" === e)t += 1; else if ("down" === e)t += 7; else if ("pageup" === e || "pagedown" === e) {
          var n = i.activeDate.getMonth() + ("pageup" === e ? -1 : 1);
          i.activeDate.setMonth(n, 1), t = Math.min(a(i.activeDate.getFullYear(), i.activeDate.getMonth()), t)
        } else"home" === e ? t = 1 : "end" === e && (t = a(i.activeDate.getFullYear(), i.activeDate.getMonth()));
        i.activeDate.setDate(t)
      }, i.refreshView()
    }
  }
}]).directive("monthpicker", ["dateFilter", function (e) {
  return {
    restrict: "EA",
    replace: !0,
    templateUrl: "template/datepicker/month.html",
    require: "^datepicker",
    link: function (t, n, r, i) {
      i.step = {years: 1}, i.element = n, i._refreshView = function () {
        for (var n = new Array(12), r = i.activeDate.getFullYear(), a = 0; 12 > a; a++)n[a] = angular.extend(i.createDateObject(new Date(r, a, 1), i.formatMonth), {uid: t.uniqueId + "-" + a});
        t.title = e(i.activeDate, i.formatMonthTitle), t.rows = i.split(n, 3)
      }, i.compare = function (e, t) {
        return new Date(e.getFullYear(), e.getMonth()) - new Date(t.getFullYear(), t.getMonth())
      }, i.handleKeyDown = function (e) {
        var t = i.activeDate.getMonth();
        if ("left" === e)t -= 1; else if ("up" === e)t -= 3; else if ("right" === e)t += 1; else if ("down" === e)t += 3; else if ("pageup" === e || "pagedown" === e) {
          var n = i.activeDate.getFullYear() + ("pageup" === e ? -1 : 1);
          i.activeDate.setFullYear(n)
        } else"home" === e ? t = 0 : "end" === e && (t = 11);
        i.activeDate.setMonth(t)
      }, i.refreshView()
    }
  }
}]).directive("yearpicker", ["dateFilter", function () {
  return {
    restrict: "EA",
    replace: !0,
    templateUrl: "template/datepicker/year.html",
    require: "^datepicker",
    link: function (e, t, n, r) {
      function i(e) {
        return parseInt((e - 1) / a, 10) * a + 1
      }

      var a = r.yearRange;
      r.step = {years: a}, r.element = t, r._refreshView = function () {
        for (var t = new Array(a), n = 0, o = i(r.activeDate.getFullYear()); a > n; n++)t[n] = angular.extend(r.createDateObject(new Date(o + n, 0, 1), r.formatYear), {uid: e.uniqueId + "-" + n});
        e.title = [t[0].label, t[a - 1].label].join(" - "), e.rows = r.split(t, 5)
      }, r.compare = function (e, t) {
        return e.getFullYear() - t.getFullYear()
      }, r.handleKeyDown = function (e) {
        var t = r.activeDate.getFullYear();
        "left" === e ? t -= 1 : "up" === e ? t -= 5 : "right" === e ? t += 1 : "down" === e ? t += 5 : "pageup" === e || "pagedown" === e ? t += ("pageup" === e ? -1 : 1) * r.step.years : "home" === e ? t = i(r.activeDate.getFullYear()) : "end" === e && (t = i(r.activeDate.getFullYear()) + a - 1), r.activeDate.setFullYear(t)
      }, r.refreshView()
    }
  }
}]).constant("datepickerPopupConfig", {
  datepickerPopup: "yyyy-MM-dd",
  currentText: "Today",
  clearText: "Clear",
  closeText: "Done",
  closeOnDateSelection: !0,
  appendToBody: !1,
  showButtonBar: !0
}).directive("datepickerPopup", ["$compile", "$parse", "$document", "$position", "dateFilter", "dateParser", "datepickerPopupConfig", function (e, t, n, r, i, a, o) {
  return {
    restrict: "EA",
    require: "ngModel",
    scope: {isOpen: "=?", currentText: "@", clearText: "@", closeText: "@", dateDisabled: "&"},
    link: function (s, u, l, c) {
      function p(e) {
        return e.replace(/([A-Z])/g, function (e) {
          return "-" + e.toLowerCase()
        })
      }

      function f(e) {
        if (e) {
          if (angular.isDate(e) && !isNaN(e))return c.$setValidity("date", !0), e;
          if (angular.isString(e)) {
            var t = a.parse(e, d) || new Date(e);
            return isNaN(t) ? void c.$setValidity("date", !1) : (c.$setValidity("date", !0), t)
          }
          return void c.$setValidity("date", !1)
        }
        return c.$setValidity("date", !0), null
      }

      var d, h = angular.isDefined(l.closeOnDateSelection) ? s.$parent.$eval(l.closeOnDateSelection) : o.closeOnDateSelection, m = angular.isDefined(l.datepickerAppendToBody) ? s.$parent.$eval(l.datepickerAppendToBody) : o.appendToBody;
      s.showButtonBar = angular.isDefined(l.showButtonBar) ? s.$parent.$eval(l.showButtonBar) : o.showButtonBar, s.getText = function (e) {
        return s[e + "Text"] || o[e + "Text"]
      }, l.$observe("datepickerPopup", function (e) {
        d = e || o.datepickerPopup, c.$render()
      });
      var g = angular.element("<div datepicker-popup-wrap><div datepicker></div></div>");
      g.attr({"ng-model": "date", "ng-change": "dateSelection()"});
      var v = angular.element(g.children()[0]);
      l.datepickerOptions && angular.forEach(s.$parent.$eval(l.datepickerOptions), function (e, t) {
        v.attr(p(t), e)
      }), s.watchData = {}, angular.forEach(["minDate", "maxDate", "datepickerMode"], function (e) {
        if (l[e]) {
          var n = t(l[e]);
          if (s.$parent.$watch(n, function (t) {
              s.watchData[e] = t
            }), v.attr(p(e), "watchData." + e), "datepickerMode" === e) {
            var r = n.assign;
            s.$watch("watchData." + e, function (e, t) {
              e !== t && r(s.$parent, e)
            })
          }
        }
      }), l.dateDisabled && v.attr("date-disabled", "dateDisabled({ date: date, mode: mode })"), c.$parsers.unshift(f), s.dateSelection = function (e) {
        angular.isDefined(e) && (s.date = e), c.$setViewValue(s.date), c.$render(), h && (s.isOpen = !1, u[0].focus())
      }, u.bind("input change keyup", function () {
        s.$apply(function () {
          s.date = c.$modelValue
        })
      }), c.$render = function () {
        var e = c.$viewValue ? i(c.$viewValue, d) : "";
        u.val(e), s.date = f(c.$modelValue)
      };
      var y = function (e) {
        s.isOpen && e.target !== u[0] && s.$apply(function () {
          s.isOpen = !1
        })
      }, b = function (e) {
        s.keydown(e)
      };
      u.bind("keydown", b), s.keydown = function (e) {
        27 === e.which ? (e.preventDefault(), e.stopPropagation(), s.close()) : 40 !== e.which || s.isOpen || (s.isOpen = !0)
      }, s.$watch("isOpen", function (e) {
        e ? (s.$broadcast("datepicker.focus"), s.position = m ? r.offset(u) : r.position(u), s.position.top = s.position.top + u.prop("offsetHeight"), n.bind("click", y)) : n.unbind("click", y)
      }), s.select = function (e) {
        if ("today" === e) {
          var t = new Date;
          angular.isDate(c.$modelValue) ? (e = new Date(c.$modelValue), e.setFullYear(t.getFullYear(), t.getMonth(), t.getDate())) : e = new Date(t.setHours(0, 0, 0, 0))
        }
        s.dateSelection(e)
      }, s.close = function () {
        s.isOpen = !1, u[0].focus()
      };
      var x = e(g)(s);
      g.remove(), m ? n.find("body").append(x) : u.after(x), s.$on("$destroy", function () {
        x.remove(), u.unbind("keydown", b), n.unbind("click", y)
      })
    }
  }
}]).directive("datepickerPopupWrap", function () {
  return {
    restrict: "EA",
    replace: !0,
    transclude: !0,
    templateUrl: "template/datepicker/popup.html",
    link: function (e, t) {
      t.bind("click", function (e) {
        e.preventDefault(), e.stopPropagation()
      })
    }
  }
}), angular.module("ui.bootstrap.dropdown", []).constant("dropdownConfig", {openClass: "open"}).service("dropdownService", ["$document", function (e) {
  var t = null;
  this.open = function (i) {
    t || (e.bind("click", n), e.bind("keydown", r)), t && t !== i && (t.isOpen = !1), t = i
  }, this.close = function (i) {
    t === i && (t = null, e.unbind("click", n), e.unbind("keydown", r))
  };
  var n = function (e) {
    var n = t.getToggleElement();
    e && n && n[0].contains(e.target) || t.$apply(function () {
      t.isOpen = !1
    })
  }, r = function (e) {
    27 === e.which && (t.focusToggleElement(), n())
  }
}]).controller("DropdownController", ["$scope", "$attrs", "$parse", "dropdownConfig", "dropdownService", "$animate", function (e, t, n, r, i, a) {
  var o, s = this, u = e.$new(), l = r.openClass, c = angular.noop, p = t.onToggle ? n(t.onToggle) : angular.noop;
  this.init = function (r) {
    s.$element = r, t.isOpen && (o = n(t.isOpen), c = o.assign, e.$watch(o, function (e) {
      u.isOpen = !!e
    }))
  }, this.toggle = function (e) {
    return u.isOpen = arguments.length ? !!e : !u.isOpen
  }, this.isOpen = function () {
    return u.isOpen
  }, u.getToggleElement = function () {
    return s.toggleElement
  }, u.focusToggleElement = function () {
    s.toggleElement && s.toggleElement[0].focus()
  }, u.$watch("isOpen", function (t, n) {
    a[t ? "addClass" : "removeClass"](s.$element, l), t ? (u.focusToggleElement(), i.open(u)) : i.close(u), c(e, t), angular.isDefined(t) && t !== n && p(e, {open: !!t})
  }), e.$on("$locationChangeSuccess", function () {
    u.isOpen = !1
  }), e.$on("$destroy", function () {
    u.$destroy()
  })
}]).directive("dropdown", function () {
  return {
    restrict: "CA", controller: "DropdownController", link: function (e, t, n, r) {
      r.init(t)
    }
  }
}).directive("dropdownToggle", function () {
  return {
    restrict: "CA", require: "?^dropdown", link: function (e, t, n, r) {
      if (r) {
        r.toggleElement = t;
        var i = function (i) {
          i.preventDefault(), t.hasClass("disabled") || n.disabled || e.$apply(function () {
            r.toggle()
          })
        };
        t.bind("click", i), t.attr({"aria-haspopup": !0, "aria-expanded": !1}), e.$watch(r.isOpen, function (e) {
          t.attr("aria-expanded", !!e)
        }), e.$on("$destroy", function () {
          t.unbind("click", i)
        })
      }
    }
  }
}), angular.module("ui.bootstrap.modal", ["ui.bootstrap.transition"]).factory("$$stackedMap", function () {
  return {
    createNew: function () {
      var e = [];
      return {
        add: function (t, n) {
          e.push({key: t, value: n})
        }, get: function (t) {
          for (var n = 0; n < e.length; n++)if (t == e[n].key)return e[n]
        }, keys: function () {
          for (var t = [], n = 0; n < e.length; n++)t.push(e[n].key);
          return t
        }, top: function () {
          return e[e.length - 1]
        }, remove: function (t) {
          for (var n = -1, r = 0; r < e.length; r++)if (t == e[r].key) {
            n = r;
            break
          }
          return e.splice(n, 1)[0]
        }, removeTop: function () {
          return e.splice(e.length - 1, 1)[0]
        }, length: function () {
          return e.length
        }
      }
    }
  }
}).directive("modalBackdrop", ["$timeout", function (e) {
  return {
    restrict: "EA", replace: !0, templateUrl: "template/modal/backdrop.html", link: function (t, n, r) {
      t.backdropClass = r.backdropClass || "", t.animate = !1, e(function () {
        t.animate = !0
      })
    }
  }
}]).directive("modalWindow", ["$modalStack", "$timeout", function (e, t) {
  return {
    restrict: "EA", scope: {index: "@", animate: "="}, replace: !0, transclude: !0, templateUrl: function (e, t) {
      return t.templateUrl || "template/modal/window.html"
    }, link: function (n, r, i) {
      r.addClass(i.windowClass || ""), n.size = i.size, t(function () {
        n.animate = !0, r[0].querySelectorAll("[autofocus]").length || r[0].focus()
      }), n.close = function (t) {
        var n = e.getTop();
        n && n.value.backdrop && "static" != n.value.backdrop && t.target === t.currentTarget && (t.preventDefault(), t.stopPropagation(), e.dismiss(n.key, "backdrop click"))
      }
    }
  }
}]).directive("modalTransclude", function () {
  return {
    link: function (e, t, n, r, i) {
      i(e.$parent, function (e) {
        t.empty(), t.append(e)
      })
    }
  }
}).factory("$modalStack", ["$transition", "$timeout", "$document", "$compile", "$rootScope", "$$stackedMap", function (e, t, n, r, i, a) {
  function o() {
    for (var e = -1, t = d.keys(), n = 0; n < t.length; n++)d.get(t[n]).value.backdrop && (e = n);
    return e
  }

  function s(e) {
    var t = n.find("body").eq(0), r = d.get(e).value;
    d.remove(e), l(r.modalDomEl, r.modalScope, 300, function () {
      r.modalScope.$destroy(), t.toggleClass(f, d.length() > 0), u()
    })
  }

  function u() {
    if (c && -1 == o()) {
      var e = p;
      l(c, p, 150, function () {
        e.$destroy(), e = null
      }), c = void 0, p = void 0
    }
  }

  function l(n, r, i, a) {
    function o() {
      o.done || (o.done = !0, n.remove(), a && a())
    }

    r.animate = !1;
    var s = e.transitionEndEventName;
    if (s) {
      var u = t(o, i);
      n.bind(s, function () {
        t.cancel(u), o(), r.$apply()
      })
    } else t(o)
  }

  var c, p, f = "modal-open", d = a.createNew(), h = {};
  return i.$watch(o, function (e) {
    p && (p.index = e)
  }), n.bind("keydown", function (e) {
    var t;
    27 === e.which && (t = d.top(), t && t.value.keyboard && (e.preventDefault(), i.$apply(function () {
      h.dismiss(t.key, "escape key press")
    })))
  }), h.open = function (e, t) {
    d.add(e, {deferred: t.deferred, modalScope: t.scope, backdrop: t.backdrop, keyboard: t.keyboard});
    var a = n.find("body").eq(0), s = o();
    if (s >= 0 && !c) {
      p = i.$new(!0), p.index = s;
      var u = angular.element("<div modal-backdrop></div>");
      u.attr("backdrop-class", t.backdropClass), c = r(u)(p), a.append(c)
    }
    var l = angular.element("<div modal-window></div>");
    l.attr({
      "template-url": t.windowTemplateUrl,
      "window-class": t.windowClass,
      size: t.size,
      index: d.length() - 1,
      animate: "animate"
    }).html(t.content);
    var h = r(l)(t.scope);
    d.top().value.modalDomEl = h, a.append(h), a.addClass(f)
  }, h.close = function (e, t) {
    var n = d.get(e);
    n && (n.value.deferred.resolve(t), s(e))
  }, h.dismiss = function (e, t) {
    var n = d.get(e);
    n && (n.value.deferred.reject(t), s(e))
  }, h.dismissAll = function (e) {
    for (var t = this.getTop(); t;)this.dismiss(t.key, e), t = this.getTop()
  }, h.getTop = function () {
    return d.top()
  }, h
}]).provider("$modal", function () {
  var e = {
    options: {backdrop: !0, keyboard: !0},
    $get: ["$injector", "$rootScope", "$q", "$http", "$templateCache", "$controller", "$modalStack", function (t, n, r, i, a, o, s) {
      function u(e) {
        return e.template ? r.when(e.template) : i.get(angular.isFunction(e.templateUrl) ? e.templateUrl() : e.templateUrl, {cache: a}).then(function (e) {
          return e.data
        })
      }

      function l(e) {
        var n = [];
        return angular.forEach(e, function (e) {
          (angular.isFunction(e) || angular.isArray(e)) && n.push(r.when(t.invoke(e)))
        }), n
      }

      var c = {};
      return c.open = function (t) {
        var i = r.defer(), a = r.defer(), c = {
          result: i.promise, opened: a.promise, close: function (e) {
            s.close(c, e)
          }, dismiss: function (e) {
            s.dismiss(c, e)
          }
        };
        if (t = angular.extend({}, e.options, t), t.resolve = t.resolve || {}, !t.template && !t.templateUrl)throw new Error("One of template or templateUrl options is required.");
        var p = r.all([u(t)].concat(l(t.resolve)));
        return p.then(function (e) {
          var r = (t.scope || n).$new();
          r.$close = c.close, r.$dismiss = c.dismiss;
          var a, u = {}, l = 1;
          t.controller && (u.$scope = r, u.$modalInstance = c, angular.forEach(t.resolve, function (t, n) {
            u[n] = e[l++]
          }), a = o(t.controller, u), t.controllerAs && (r[t.controllerAs] = a)), s.open(c, {
            scope: r,
            deferred: i,
            content: e[0],
            backdrop: t.backdrop,
            keyboard: t.keyboard,
            backdropClass: t.backdropClass,
            windowClass: t.windowClass,
            windowTemplateUrl: t.windowTemplateUrl,
            size: t.size
          })
        }, function (e) {
          i.reject(e)
        }), p.then(function () {
          a.resolve(!0)
        }, function () {
          a.reject(!1)
        }), c
      }, c
    }]
  };
  return e
}), angular.module("ui.bootstrap.pagination", []).controller("PaginationController", ["$scope", "$attrs", "$parse", function (e, t, n) {
  var r = this, i = {$setViewValue: angular.noop}, a = t.numPages ? n(t.numPages).assign : angular.noop;
  this.init = function (a, o) {
    i = a, this.config = o, i.$render = function () {
      r.render()
    }, t.itemsPerPage ? e.$parent.$watch(n(t.itemsPerPage), function (t) {
      r.itemsPerPage = parseInt(t, 10), e.totalPages = r.calculateTotalPages()
    }) : this.itemsPerPage = o.itemsPerPage
  }, this.calculateTotalPages = function () {
    var t = this.itemsPerPage < 1 ? 1 : Math.ceil(e.totalItems / this.itemsPerPage);
    return Math.max(t || 0, 1)
  }, this.render = function () {
    e.page = parseInt(i.$viewValue, 10) || 1
  }, e.selectPage = function (t) {
    e.page !== t && t > 0 && t <= e.totalPages && (i.$setViewValue(t), i.$render())
  }, e.getText = function (t) {
    return e[t + "Text"] || r.config[t + "Text"]
  }, e.noPrevious = function () {
    return 1 === e.page
  }, e.noNext = function () {
    return e.page === e.totalPages
  }, e.$watch("totalItems", function () {
    e.totalPages = r.calculateTotalPages()
  }), e.$watch("totalPages", function (t) {
    a(e.$parent, t), e.page > t ? e.selectPage(t) : i.$render()
  })
}]).constant("paginationConfig", {
  itemsPerPage: 10,
  boundaryLinks: !1,
  directionLinks: !0,
  firstText: "First",
  previousText: "Previous",
  nextText: "Next",
  lastText: "Last",
  rotate: !0
}).directive("pagination", ["$parse", "paginationConfig", function (e, t) {
  return {
    restrict: "EA",
    scope: {totalItems: "=", firstText: "@", previousText: "@", nextText: "@", lastText: "@"},
    require: ["pagination", "?ngModel"],
    controller: "PaginationController",
    templateUrl: "template/pagination/pagination.html",
    replace: !0,
    link: function (n, r, i, a) {
      function o(e, t, n) {
        return {number: e, text: t, active: n}
      }

      function s(e, t) {
        var n = [], r = 1, i = t, a = angular.isDefined(c) && t > c;
        a && (p ? (r = Math.max(e - Math.floor(c / 2), 1), i = r + c - 1, i > t && (i = t, r = i - c + 1)) : (r = (Math.ceil(e / c) - 1) * c + 1, i = Math.min(r + c - 1, t)));
        for (var s = r; i >= s; s++) {
          var u = o(s, s, s === e);
          n.push(u)
        }
        if (a && !p) {
          if (r > 1) {
            var l = o(r - 1, "...", !1);
            n.unshift(l)
          }
          if (t > i) {
            var f = o(i + 1, "...", !1);
            n.push(f)
          }
        }
        return n
      }

      var u = a[0], l = a[1];
      if (l) {
        var c = angular.isDefined(i.maxSize) ? n.$parent.$eval(i.maxSize) : t.maxSize, p = angular.isDefined(i.rotate) ? n.$parent.$eval(i.rotate) : t.rotate;
        n.boundaryLinks = angular.isDefined(i.boundaryLinks) ? n.$parent.$eval(i.boundaryLinks) : t.boundaryLinks, n.directionLinks = angular.isDefined(i.directionLinks) ? n.$parent.$eval(i.directionLinks) : t.directionLinks, u.init(l, t), i.maxSize && n.$parent.$watch(e(i.maxSize), function (e) {
          c = parseInt(e, 10), u.render()
        });
        var f = u.render;
        u.render = function () {
          f(), n.page > 0 && n.page <= n.totalPages && (n.pages = s(n.page, n.totalPages))
        }
      }
    }
  }
}]).constant("pagerConfig", {
  itemsPerPage: 10,
  previousText: "« Previous",
  nextText: "Next »",
  align: !0
}).directive("pager", ["pagerConfig", function (e) {
  return {
    restrict: "EA",
    scope: {totalItems: "=", previousText: "@", nextText: "@"},
    require: ["pager", "?ngModel"],
    controller: "PaginationController",
    templateUrl: "template/pagination/pager.html",
    replace: !0,
    link: function (t, n, r, i) {
      var a = i[0], o = i[1];
      o && (t.align = angular.isDefined(r.align) ? t.$parent.$eval(r.align) : e.align, a.init(o, e))
    }
  }
}]), angular.module("ui.bootstrap.tooltip", ["ui.bootstrap.position", "ui.bootstrap.bindHtml"]).provider("$tooltip", function () {
  function e(e) {
    var t = /[A-Z]/g, n = "-";
    return e.replace(t, function (e, t) {
      return (t ? n : "") + e.toLowerCase()
    })
  }

  var t = {placement: "top", animation: !0, popupDelay: 0}, n = {
    mouseenter: "mouseleave",
    click: "click",
    focus: "blur"
  }, r = {};
  this.options = function (e) {
    angular.extend(r, e)
  }, this.setTriggers = function (e) {
    angular.extend(n, e)
  }, this.$get = ["$window", "$compile", "$timeout", "$parse", "$document", "$position", "$interpolate", function (i, a, o, s, u, l, c) {
    return function (p, f, d) {
      function h(e) {
        var t = e || m.trigger || d, r = n[t] || t;
        return {show: t, hide: r}
      }

      var m = angular.extend({}, t, r), g = e(p), v = c.startSymbol(), y = c.endSymbol(), b = "<div " + g + '-popup title="' + v + "tt_title" + y + '" content="' + v + "tt_content" + y + '" placement="' + v + "tt_placement" + y + '" animation="tt_animation" is-open="tt_isOpen"></div>';
      return {
        restrict: "EA", scope: !0, compile: function () {
          var e = a(b);
          return function (t, n, r) {
            function a() {
              t.tt_isOpen ? d() : c()
            }

            function c() {
              (!T || t.$eval(r[f + "Enable"])) && (t.tt_popupDelay ? $ || ($ = o(g, t.tt_popupDelay, !1), $.then(function (e) {
                e()
              })) : g()())
            }

            function d() {
              t.$apply(function () {
                v()
              })
            }

            function g() {
              return $ = null, w && (o.cancel(w), w = null), t.tt_content ? (y(), x.css({
                top: 0,
                left: 0,
                display: "block"
              }), E ? u.find("body").append(x) : n.after(x), C(), t.tt_isOpen = !0, t.$digest(), C) : angular.noop
            }

            function v() {
              t.tt_isOpen = !1, o.cancel($), $ = null, t.tt_animation ? w || (w = o(b, 500)) : b()
            }

            function y() {
              x && b(), x = e(t, function () {
              }), t.$digest()
            }

            function b() {
              w = null, x && (x.remove(), x = null)
            }

            var x, w, $, E = angular.isDefined(m.appendToBody) ? m.appendToBody : !1, S = h(void 0), T = angular.isDefined(r[f + "Enable"]), C = function () {
              var e = l.positionElements(n, x, t.tt_placement, E);
              if (E) {
                var r = {
                  left: 5,
                  width: angular.element(i).width() - 5
                }, a = x.find(".tooltip-arrow"), o = x.width(), s = Math.abs(e.left + o - r.width);
                if (e.left < r.left)a.css("left", o / 2 + (e.left - r.left) + "px"), e.left = r.left + "px"; else if (e.left + o > r.width) {
                  var u = o / 2 + Math.abs(r.width - (e.left + o));
                  a.css("left", u + "px"), e.left = e.left - s + "px"
                } else e.left += "px";
                e.top += "px"
              } else e.top += "px", e.left += "px";
              x.css(e)
            };
            t.tt_isOpen = !1, r.$observe(p, function (e) {
              t.tt_content = e, !e && t.tt_isOpen && v()
            }), r.$observe(f + "Title", function (e) {
              t.tt_title = e
            }), r.$observe(f + "Placement", function (e) {
              t.tt_placement = angular.isDefined(e) ? e : m.placement
            }), r.$observe(f + "PopupDelay", function (e) {
              var n = parseInt(e, 10);
              t.tt_popupDelay = isNaN(n) ? m.popupDelay : n
            });
            var k = function () {
              n.unbind(S.show, c), n.unbind(S.hide, d)
            };
            r.$observe(f + "Trigger", function (e) {
              k(), S = h(e), S.show === S.hide ? n.bind(S.show, a) : (n.bind(S.show, c), n.bind(S.hide, d))
            });
            var A = t.$eval(r[f + "Animation"]);
            t.tt_animation = angular.isDefined(A) ? !!A : m.animation, r.$observe(f + "AppendToBody", function (e) {
              E = angular.isDefined(e) ? s(e)(t) : E
            }), E && t.$on("$locationChangeSuccess", function () {
              t.tt_isOpen && v()
            }), t.$on("$destroy", function () {
              o.cancel(w), o.cancel($), k(), b()
            })
          }
        }
      }
    }
  }]
}).directive("tooltipPopup", function () {
  return {
    restrict: "EA",
    replace: !0,
    scope: {content: "@", placement: "@", animation: "&", isOpen: "&"},
    templateUrl: "template/tooltip/tooltip-popup.html"
  }
}).directive("tooltip", ["$tooltip", function (e) {
  return e("tooltip", "tooltip", "mouseenter")
}]).directive("tooltipHtmlUnsafePopup", function () {
  return {
    restrict: "EA",
    replace: !0,
    scope: {content: "@", placement: "@", animation: "&", isOpen: "&"},
    templateUrl: "template/tooltip/tooltip-html-unsafe-popup.html"
  }
}).directive("tooltipHtmlUnsafe", ["$tooltip", function (e) {
  return e("tooltipHtmlUnsafe", "tooltip", "mouseenter")
}]), angular.module("ui.bootstrap.popover", ["ui.bootstrap.tooltip"]).directive("popoverPopup", function () {
  return {
    restrict: "EA",
    replace: !0,
    scope: {title: "@", content: "@", placement: "@", animation: "&", isOpen: "&"},
    templateUrl: "template/popover/popover.html"
  }
}).directive("popover", ["$tooltip", function (e) {
  return e("popover", "popover", "click")
}]), angular.module("ui.bootstrap.progressbar", []).constant("progressConfig", {
  animate: !0,
  max: 100
}).controller("ProgressController", ["$scope", "$attrs", "progressConfig", function (e, t, n) {
  var r = this, i = angular.isDefined(t.animate) ? e.$parent.$eval(t.animate) : n.animate;
  this.bars = [], e.max = angular.isDefined(t.max) ? e.$parent.$eval(t.max) : n.max, this.addBar = function (t, n) {
    i || n.css({transition: "none"}), this.bars.push(t), t.$watch("value", function (n) {
      t.percent = +(100 * n / e.max).toFixed(2)
    }), t.$on("$destroy", function () {
      n = null, r.removeBar(t)
    })
  }, this.removeBar = function (e) {
    this.bars.splice(this.bars.indexOf(e), 1)
  }
}]).directive("progress", function () {
  return {
    restrict: "EA",
    replace: !0,
    transclude: !0,
    controller: "ProgressController",
    require: "progress",
    scope: {},
    templateUrl: "template/progressbar/progress.html"
  }
}).directive("bar", function () {
  return {
    restrict: "EA",
    replace: !0,
    transclude: !0,
    require: "^progress",
    scope: {value: "=", type: "@"},
    templateUrl: "template/progressbar/bar.html",
    link: function (e, t, n, r) {
      r.addBar(e, t)
    }
  }
}).directive("progressbar", function () {
  return {
    restrict: "EA",
    replace: !0,
    transclude: !0,
    controller: "ProgressController",
    scope: {value: "=", type: "@"},
    templateUrl: "template/progressbar/progressbar.html",
    link: function (e, t, n, r) {
      r.addBar(e, angular.element(t.children()[0]))
    }
  }
}), angular.module("ui.bootstrap.rating", []).constant("ratingConfig", {
  max: 5,
  stateOn: null,
  stateOff: null
}).controller("RatingController", ["$scope", "$attrs", "ratingConfig", function (e, t, n) {
  var r = {$setViewValue: angular.noop};
  this.init = function (i) {
    r = i, r.$render = this.render, this.stateOn = angular.isDefined(t.stateOn) ? e.$parent.$eval(t.stateOn) : n.stateOn, this.stateOff = angular.isDefined(t.stateOff) ? e.$parent.$eval(t.stateOff) : n.stateOff;
    var a = angular.isDefined(t.ratingStates) ? e.$parent.$eval(t.ratingStates) : new Array(angular.isDefined(t.max) ? e.$parent.$eval(t.max) : n.max);
    e.range = this.buildTemplateObjects(a)
  }, this.buildTemplateObjects = function (e) {
    for (var t = 0, n = e.length; n > t; t++)e[t] = angular.extend({index: t}, {
      stateOn: this.stateOn,
      stateOff: this.stateOff
    }, e[t]);
    return e
  }, e.rate = function (t) {
    !e.readonly && t >= 0 && t <= e.range.length && (r.$setViewValue(t), r.$render())
  }, e.enter = function (t) {
    e.readonly || (e.value = t), e.onHover({value: t})
  }, e.reset = function () {
    e.value = r.$viewValue, e.onLeave()
  }, e.onKeydown = function (t) {
    /(37|38|39|40)/.test(t.which) && (t.preventDefault(), t.stopPropagation(), e.rate(e.value + (38 === t.which || 39 === t.which ? 1 : -1)))
  }, this.render = function () {
    e.value = r.$viewValue
  }
}]).directive("rating", function () {
  return {
    restrict: "EA",
    require: ["rating", "ngModel"],
    scope: {readonly: "=?", onHover: "&", onLeave: "&"},
    controller: "RatingController",
    templateUrl: "template/rating/rating.html",
    replace: !0,
    link: function (e, t, n, r) {
      var i = r[0], a = r[1];
      a && i.init(a)
    }
  }
}), angular.module("ui.bootstrap.tabs", []).controller("TabsetController", ["$scope", function (e) {
  var t = this, n = t.tabs = e.tabs = [];
  t.select = function (e) {
    angular.forEach(n, function (t) {
      t.active && t !== e && (t.active = !1, t.onDeselect())
    }), e.active = !0, e.onSelect()
  }, t.addTab = function (e) {
    n.push(e), 1 === n.length ? e.active = !0 : e.active && t.select(e)
  }, t.removeTab = function (e) {
    var r = n.indexOf(e);
    if (e.active && n.length > 1) {
      var i = r == n.length - 1 ? r - 1 : r + 1;
      t.select(n[i])
    }
    n.splice(r, 1)
  }
}]).directive("tabset", function () {
  return {
    restrict: "EA",
    transclude: !0,
    replace: !0,
    scope: {type: "@"},
    controller: "TabsetController",
    templateUrl: "template/tabs/tabset.html",
    link: function (e, t, n) {
      e.vertical = angular.isDefined(n.vertical) ? e.$parent.$eval(n.vertical) : !1, e.justified = angular.isDefined(n.justified) ? e.$parent.$eval(n.justified) : !1
    }
  }
}).directive("tab", ["$parse", function (e) {
  return {
    require: "^tabset",
    restrict: "EA",
    replace: !0,
    templateUrl: "template/tabs/tab.html",
    transclude: !0,
    scope: {active: "=?", heading: "@", onSelect: "&select", onDeselect: "&deselect"},
    controller: function () {
    },
    compile: function (t, n, r) {
      return function (t, n, i, a) {
        t.$watch("active", function (e) {
          e && a.select(t)
        }), t.disabled = !1, i.disabled && t.$parent.$watch(e(i.disabled), function (e) {
          t.disabled = !!e
        }), t.select = function () {
          t.disabled || (t.active = !0)
        }, a.addTab(t), t.$on("$destroy", function () {
          a.removeTab(t)
        }), t.$transcludeFn = r
      }
    }
  }
}]).directive("tabHeadingTransclude", [function () {
  return {
    restrict: "A", require: "^tab", link: function (e, t) {
      e.$watch("headingElement", function (e) {
        e && (t.html(""), t.append(e))
      })
    }
  }
}]).directive("tabContentTransclude", function () {
  function e(e) {
    return e.tagName && (e.hasAttribute("tab-heading") || e.hasAttribute("data-tab-heading") || "tab-heading" === e.tagName.toLowerCase() || "data-tab-heading" === e.tagName.toLowerCase())
  }

  return {
    restrict: "A", require: "^tabset", link: function (t, n, r) {
      var i = t.$eval(r.tabContentTransclude);
      i.$transcludeFn(i.$parent, function (t) {
        angular.forEach(t, function (t) {
          e(t) ? i.headingElement = t : n.append(t)
        })
      })
    }
  }
}), angular.module("ui.bootstrap.timepicker", []).constant("timepickerConfig", {
  hourStep: 1,
  minuteStep: 1,
  showMeridian: !0,
  meridians: null,
  readonlyInput: !1,
  mousewheel: !0
}).controller("TimepickerController", ["$scope", "$attrs", "$parse", "$log", "$locale", "timepickerConfig", function (e, t, n, r, i, a) {
  function o() {
    var t = parseInt(e.hours, 10), n = e.showMeridian ? t > 0 && 13 > t : t >= 0 && 24 > t;
    return n ? (e.showMeridian && (12 === t && (t = 0), e.meridian === m[1] && (t += 12)), t) : void 0
  }

  function s() {
    var t = parseInt(e.minutes, 10);
    return t >= 0 && 60 > t ? t : void 0
  }

  function u(e) {
    return angular.isDefined(e) && e.toString().length < 2 ? "0" + e : e
  }

  function l(e) {
    c(), h.$setViewValue(new Date(d)), p(e)
  }

  function c() {
    h.$setValidity("time", !0), e.invalidHours = !1, e.invalidMinutes = !1
  }

  function p(t) {
    var n = d.getHours(), r = d.getMinutes();
    e.showMeridian && (n = 0 === n || 12 === n ? 12 : n % 12), e.hours = "h" === t ? n : u(n), e.minutes = "m" === t ? r : u(r), e.meridian = d.getHours() < 12 ? m[0] : m[1]
  }

  function f(e) {
    var t = new Date(d.getTime() + 6e4 * e);
    d.setHours(t.getHours(), t.getMinutes()), l()
  }

  var d = new Date, h = {$setViewValue: angular.noop}, m = angular.isDefined(t.meridians) ? e.$parent.$eval(t.meridians) : a.meridians || i.DATETIME_FORMATS.AMPMS;
  this.init = function (n, r) {
    h = n, h.$render = this.render;
    var i = r.eq(0), o = r.eq(1), s = angular.isDefined(t.mousewheel) ? e.$parent.$eval(t.mousewheel) : a.mousewheel;
    s && this.setupMousewheelEvents(i, o), e.readonlyInput = angular.isDefined(t.readonlyInput) ? e.$parent.$eval(t.readonlyInput) : a.readonlyInput, this.setupInputEvents(i, o)
  };
  var g = a.hourStep;
  t.hourStep && e.$parent.$watch(n(t.hourStep), function (e) {
    g = parseInt(e, 10)
  });
  var v = a.minuteStep;
  t.minuteStep && e.$parent.$watch(n(t.minuteStep), function (e) {
    v = parseInt(e, 10)
  }), e.showMeridian = a.showMeridian, t.showMeridian && e.$parent.$watch(n(t.showMeridian), function (t) {
    if (e.showMeridian = !!t, h.$error.time) {
      var n = o(), r = s();
      angular.isDefined(n) && angular.isDefined(r) && (d.setHours(n), l())
    } else p()
  }), this.setupMousewheelEvents = function (t, n) {
    var r = function (e) {
      e.originalEvent && (e = e.originalEvent);
      var t = e.wheelDelta ? e.wheelDelta : -e.deltaY;
      return e.detail || t > 0
    };
    t.bind("mousewheel wheel", function (t) {
      e.$apply(r(t) ? e.incrementHours() : e.decrementHours()), t.preventDefault()
    }), n.bind("mousewheel wheel", function (t) {
      e.$apply(r(t) ? e.incrementMinutes() : e.decrementMinutes()), t.preventDefault()
    })
  }, this.setupInputEvents = function (t, n) {
    if (e.readonlyInput)return e.updateHours = angular.noop, void(e.updateMinutes = angular.noop);
    var r = function (t, n) {
      h.$setViewValue(null), h.$setValidity("time", !1), angular.isDefined(t) && (e.invalidHours = t), angular.isDefined(n) && (e.invalidMinutes = n)
    };
    e.updateHours = function () {
      var e = o();
      angular.isDefined(e) ? (d.setHours(e), l("h")) : r(!0)
    }, t.bind("blur", function () {
      !e.invalidHours && e.hours < 10 && e.$apply(function () {
        e.hours = u(e.hours)
      })
    }), e.updateMinutes = function () {
      var e = s();
      angular.isDefined(e) ? (d.setMinutes(e), l("m")) : r(void 0, !0)
    }, n.bind("blur", function () {
      !e.invalidMinutes && e.minutes < 10 && e.$apply(function () {
        e.minutes = u(e.minutes)
      })
    })
  }, this.render = function () {
    var e = h.$modelValue ? new Date(h.$modelValue) : null;
    isNaN(e) ? (h.$setValidity("time", !1), r.error('Timepicker directive: "ng-model" value must be a Date object, a number of milliseconds since 01.01.1970 or a string representing an RFC2822 or ISO 8601 date.')) : (e && (d = e), c(), p())
  }, e.incrementHours = function () {
    f(60 * g)
  }, e.decrementHours = function () {
    f(60 * -g)
  }, e.incrementMinutes = function () {
    f(v)
  }, e.decrementMinutes = function () {
    f(-v)
  }, e.toggleMeridian = function () {
    f(720 * (d.getHours() < 12 ? 1 : -1))
  }
}]).directive("timepicker", function () {
  return {
    restrict: "EA",
    require: ["timepicker", "?^ngModel"],
    controller: "TimepickerController",
    replace: !0,
    scope: {},
    templateUrl: "template/timepicker/timepicker.html",
    link: function (e, t, n, r) {
      var i = r[0], a = r[1];
      a && i.init(a, t.find("input"))
    }
  }
}), angular.module("ui.bootstrap.typeahead", ["ui.bootstrap.position", "ui.bootstrap.bindHtml"]).factory("typeaheadParser", ["$parse", function (e) {
  var t = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w\d]*))\s+in\s+([\s\S]+?)$/;
  return {
    parse: function (n) {
      var r = n.match(t);
      if (!r)throw new Error('Expected typeahead specification in form of "_modelValue_ (as _label_)? for _item_ in _collection_" but got "' + n + '".');
      return {itemName: r[3], source: e(r[4]), viewMapper: e(r[2] || r[1]), modelMapper: e(r[1])}
    }
  }
}]).directive("typeahead", ["$compile", "$parse", "$q", "$timeout", "$document", "$position", "typeaheadParser", function (e, t, n, r, i, a, o) {
  var s = [9, 13, 27, 38, 40];
  return {
    require: "ngModel", link: function (u, l, c, p) {
      var f, d = u.$eval(c.typeaheadMinLength) || 1, h = u.$eval(c.typeaheadWaitMs) || 0, m = u.$eval(c.typeaheadEditable) !== !1, g = t(c.typeaheadLoading).assign || angular.noop, v = t(c.typeaheadOnSelect), y = c.typeaheadInputFormatter ? t(c.typeaheadInputFormatter) : void 0, b = c.typeaheadAppendToBody ? u.$eval(c.typeaheadAppendToBody) : !1, x = t(c.ngModel).assign, w = o.parse(c.typeahead), $ = u.$new();
      u.$on("$destroy", function () {
        $.$destroy()
      });
      var E = "typeahead-" + $.$id + "-" + Math.floor(1e4 * Math.random());
      l.attr({"aria-autocomplete": "list", "aria-expanded": !1, "aria-owns": E});
      var S = angular.element("<div typeahead-popup></div>");
      S.attr({
        id: E,
        matches: "matches",
        active: "activeIdx",
        select: "select(activeIdx)",
        query: "query",
        position: "position"
      }), angular.isDefined(c.typeaheadTemplateUrl) && S.attr("template-url", c.typeaheadTemplateUrl);
      var T = function () {
        $.matches = [], $.activeIdx = -1, l.attr("aria-expanded", !1)
      }, C = function (e) {
        return E + "-option-" + e
      };
      $.$watch("activeIdx", function (e) {
        0 > e ? l.removeAttr("aria-activedescendant") : l.attr("aria-activedescendant", C(e))
      });
      var k = function (e) {
        var t = {$viewValue: e};
        g(u, !0), n.when(w.source(u, t)).then(function (n) {
          var r = e === p.$viewValue;
          if (r && f)if (n.length > 0) {
            $.activeIdx = 0, $.matches.length = 0;
            for (var i = 0; i < n.length; i++)t[w.itemName] = n[i], $.matches.push({
              id: C(i),
              label: w.viewMapper($, t),
              model: n[i]
            });
            $.query = e, $.position = b ? a.offset(l) : a.position(l), $.position.top = $.position.top + l.prop("offsetHeight"), l.attr("aria-expanded", !0)
          } else T();
          r && g(u, !1)
        }, function () {
          T(), g(u, !1)
        })
      };
      T(), $.query = void 0;
      var A, _ = function (e) {
        A = r(function () {
          k(e)
        }, h)
      }, D = function () {
        A && r.cancel(A)
      };
      p.$parsers.unshift(function (e) {
        return f = !0, e && e.length >= d ? h > 0 ? (D(), _(e)) : k(e) : (g(u, !1), D(), T()), m ? e : e ? void p.$setValidity("editable", !1) : (p.$setValidity("editable", !0), e)
      }), p.$formatters.push(function (e) {
        var t, n, r = {};
        return y ? (r.$model = e, y(u, r)) : (r[w.itemName] = e, t = w.viewMapper(u, r), r[w.itemName] = void 0, n = w.viewMapper(u, r), t !== n ? t : e)
      }), $.select = function (e) {
        var t, n, i = {};
        i[w.itemName] = n = $.matches[e].model, t = w.modelMapper(u, i), x(u, t), p.$setValidity("editable", !0), v(u, {
          $item: n,
          $model: t,
          $label: w.viewMapper(u, i)
        }), T(), r(function () {
          l[0].focus()
        }, 0, !1)
      }, l.bind("keydown", function (e) {
        0 !== $.matches.length && -1 !== s.indexOf(e.which) && (e.preventDefault(), 40 === e.which ? ($.activeIdx = ($.activeIdx + 1) % $.matches.length, $.$digest()) : 38 === e.which ? ($.activeIdx = ($.activeIdx ? $.activeIdx : $.matches.length) - 1, $.$digest()) : 13 === e.which || 9 === e.which ? $.$apply(function () {
          $.select($.activeIdx)
        }) : 27 === e.which && (e.stopPropagation(), T(), $.$digest()))
      }), l.bind("blur", function () {
        f = !1
      });
      var M = function (e) {
        l[0] !== e.target && (T(), $.$digest())
      };
      i.bind("click", M), u.$on("$destroy", function () {
        i.unbind("click", M)
      });
      var O = e(S)($);
      b ? i.find("body").append(O) : l.after(O)
    }
  }
}]).directive("typeaheadPopup", function () {
  return {
    restrict: "EA",
    scope: {matches: "=", query: "=", active: "=", position: "=", select: "&"},
    replace: !0,
    templateUrl: "template/typeahead/typeahead-popup.html",
    link: function (e, t, n) {
      e.templateUrl = n.templateUrl, e.isOpen = function () {
        return e.matches.length > 0
      }, e.isActive = function (t) {
        return e.active == t
      }, e.selectActive = function (t) {
        e.active = t
      }, e.selectMatch = function (t) {
        e.select({activeIdx: t})
      }
    }
  }
}).directive("typeaheadMatch", ["$http", "$templateCache", "$compile", "$parse", function (e, t, n, r) {
  return {
    restrict: "EA", scope: {index: "=", match: "=", query: "="}, link: function (i, a, o) {
      var s = r(o.templateUrl)(i.$parent) || "template/typeahead/typeahead-match.html";
      e.get(s, {cache: t}).success(function (e) {
        a.replaceWith(n(e.trim())(i))
      })
    }
  }
}]).filter("typeaheadHighlight", function () {
  function e(e) {
    return e.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1")
  }

  return function (t, n) {
    return n ? ("" + t).replace(new RegExp(e(n), "gi"), "<strong>$&</strong>") : t
  }
}), angular.module("template/accordion/accordion-group.html", []).run(["$templateCache", function (e) {
  e.put("template/accordion/accordion-group.html", '<div class="panel panel-default">\n  <div class="panel-heading">\n    <h4 class="panel-title">\n      <a href class="accordion-toggle" ng-click="toggleOpen()" accordion-transclude="heading"><span ng-class="{\'text-muted\': isDisabled}">{{heading}}</span></a>\n    </h4>\n  </div>\n  <div class="panel-collapse" collapse="!isOpen">\n	  <div class="panel-body" ng-transclude></div>\n  </div>\n</div>\n')
}]), angular.module("template/accordion/accordion.html", []).run(["$templateCache", function (e) {
  e.put("template/accordion/accordion.html", '<div class="panel-group" ng-transclude></div>')
}]), angular.module("template/alert/alert.html", []).run(["$templateCache", function (e) {
  e.put("template/alert/alert.html", '<div class="alert" ng-class="[\'alert-\' + (type || \'warning\'), closeable ? \'alert-dismissable\' : null]" role="alert">\n    <button ng-show="closeable" type="button" class="close" ng-click="close()">\n        <span aria-hidden="true">&times;</span>\n        <span class="sr-only">Close</span>\n    </button>\n    <div ng-transclude></div>\n</div>\n')
}]), angular.module("template/carousel/carousel.html", []).run(["$templateCache", function (e) {
  e.put("template/carousel/carousel.html", '<div ng-mouseenter="pause()" ng-mouseleave="play()" class="carousel" ng-swipe-right="prev()" ng-swipe-left="next()">\n    <ol class="carousel-indicators" ng-show="slides.length > 1">\n        <li ng-repeat="slide in slides track by $index" ng-class="{active: isActive(slide)}" ng-click="select(slide)"></li>\n    </ol>\n    <div class="carousel-inner" ng-transclude></div>\n    <a class="left carousel-control" ng-click="prev()" ng-show="slides.length > 1"><span class="glyphicon glyphicon-chevron-left"></span></a>\n    <a class="right carousel-control" ng-click="next()" ng-show="slides.length > 1"><span class="glyphicon glyphicon-chevron-right"></span></a>\n</div>\n')
}]), angular.module("template/carousel/slide.html", []).run(["$templateCache", function (e) {
  e.put("template/carousel/slide.html", "<div ng-class=\"{\n    'active': leaving || (active && !entering),\n    'prev': (next || active) && direction=='prev',\n    'next': (next || active) && direction=='next',\n    'right': direction=='prev',\n    'left': direction=='next'\n  }\" class=\"item text-center\" ng-transclude></div>\n")
}]), angular.module("template/datepicker/datepicker.html", []).run(["$templateCache", function (e) {
  e.put("template/datepicker/datepicker.html", '<div ng-switch="datepickerMode" role="application" ng-keydown="keydown($event)">\n  <daypicker ng-switch-when="day" tabindex="0"></daypicker>\n  <monthpicker ng-switch-when="month" tabindex="0"></monthpicker>\n  <yearpicker ng-switch-when="year" tabindex="0"></yearpicker>\n</div>')
}]), angular.module("template/datepicker/day.html", []).run(["$templateCache", function (e) {
  e.put("template/datepicker/day.html", '<table role="grid" aria-labelledby="{{uniqueId}}-title" aria-activedescendant="{{activeDateId}}">\n  <thead>\n    <tr>\n      <th><button type="button" class="btn btn-default btn-sm pull-left" ng-click="move(-1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-left"></i></button></th>\n      <th colspan="{{5 + showWeeks}}"><button id="{{uniqueId}}-title" role="heading" aria-live="assertive" aria-atomic="true" type="button" class="btn btn-default btn-sm" ng-click="toggleMode()" tabindex="-1" style="width:100%;"><strong>{{title}}</strong></button></th>\n      <th><button type="button" class="btn btn-default btn-sm pull-right" ng-click="move(1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-right"></i></button></th>\n    </tr>\n    <tr>\n      <th ng-show="showWeeks" class="text-center"></th>\n      <th ng-repeat="label in labels track by $index" class="text-center"><small aria-label="{{label.full}}">{{label.abbr}}</small></th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr ng-repeat="row in rows track by $index">\n      <td ng-show="showWeeks" class="text-center h6"><em>{{ weekNumbers[$index] }}</em></td>\n      <td ng-repeat="dt in row track by dt.date" class="text-center" role="gridcell" id="{{dt.uid}}" aria-disabled="{{!!dt.disabled}}">\n        <button type="button" style="width:100%;" class="btn btn-default btn-sm" ng-class="{\'btn-info\': dt.selected, active: isActive(dt)}" ng-click="select(dt.date)" ng-disabled="dt.disabled" tabindex="-1"><span ng-class="{\'text-muted\': dt.secondary, \'text-info\': dt.current}">{{dt.label}}</span></button>\n      </td>\n    </tr>\n  </tbody>\n</table>\n')
}]), angular.module("template/datepicker/month.html", []).run(["$templateCache", function (e) {
  e.put("template/datepicker/month.html", '<table role="grid" aria-labelledby="{{uniqueId}}-title" aria-activedescendant="{{activeDateId}}">\n  <thead>\n    <tr>\n      <th><button type="button" class="btn btn-default btn-sm pull-left" ng-click="move(-1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-left"></i></button></th>\n      <th><button id="{{uniqueId}}-title" role="heading" aria-live="assertive" aria-atomic="true" type="button" class="btn btn-default btn-sm" ng-click="toggleMode()" tabindex="-1" style="width:100%;"><strong>{{title}}</strong></button></th>\n      <th><button type="button" class="btn btn-default btn-sm pull-right" ng-click="move(1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-right"></i></button></th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr ng-repeat="row in rows track by $index">\n      <td ng-repeat="dt in row track by dt.date" class="text-center" role="gridcell" id="{{dt.uid}}" aria-disabled="{{!!dt.disabled}}">\n        <button type="button" style="width:100%;" class="btn btn-default" ng-class="{\'btn-info\': dt.selected, active: isActive(dt)}" ng-click="select(dt.date)" ng-disabled="dt.disabled" tabindex="-1"><span ng-class="{\'text-info\': dt.current}">{{dt.label}}</span></button>\n      </td>\n    </tr>\n  </tbody>\n</table>\n')
}]), angular.module("template/datepicker/popup.html", []).run(["$templateCache", function (e) {
  e.put("template/datepicker/popup.html", '<ul class="dropdown-menu" ng-style="{display: (isOpen && \'block\') || \'none\', top: position.top+\'px\', left: position.left+\'px\'}" ng-keydown="keydown($event)">\n	<li ng-transclude></li>\n	<li ng-if="showButtonBar" style="padding:10px 9px 2px">\n		<span class="btn-group pull-left">\n			<button type="button" class="btn btn-sm btn-info" ng-click="select(\'today\')">{{ getText(\'current\') }}</button>\n			<button type="button" class="btn btn-sm btn-danger" ng-click="select(null)">{{ getText(\'clear\') }}</button>\n		</span>\n		<button type="button" class="btn btn-sm btn-success pull-right" ng-click="close()">{{ getText(\'close\') }}</button>\n	</li>\n</ul>\n')
}]), angular.module("template/datepicker/year.html", []).run(["$templateCache", function (e) {
  e.put("template/datepicker/year.html", '<table role="grid" aria-labelledby="{{uniqueId}}-title" aria-activedescendant="{{activeDateId}}">\n  <thead>\n    <tr>\n      <th><button type="button" class="btn btn-default btn-sm pull-left" ng-click="move(-1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-left"></i></button></th>\n      <th colspan="3"><button id="{{uniqueId}}-title" role="heading" aria-live="assertive" aria-atomic="true" type="button" class="btn btn-default btn-sm" ng-click="toggleMode()" tabindex="-1" style="width:100%;"><strong>{{title}}</strong></button></th>\n      <th><button type="button" class="btn btn-default btn-sm pull-right" ng-click="move(1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-right"></i></button></th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr ng-repeat="row in rows track by $index">\n      <td ng-repeat="dt in row track by dt.date" class="text-center" role="gridcell" id="{{dt.uid}}" aria-disabled="{{!!dt.disabled}}">\n        <button type="button" style="width:100%;" class="btn btn-default" ng-class="{\'btn-info\': dt.selected, active: isActive(dt)}" ng-click="select(dt.date)" ng-disabled="dt.disabled" tabindex="-1"><span ng-class="{\'text-info\': dt.current}">{{dt.label}}</span></button>\n      </td>\n    </tr>\n  </tbody>\n</table>\n')
}]), angular.module("template/modal/backdrop.html", []).run(["$templateCache", function (e) {
  e.put("template/modal/backdrop.html", '<div class="modal-backdrop fade {{ backdropClass }}"\n     ng-class="{in: animate}"\n     ng-style="{\'z-index\': 1040 + (index && 1 || 0) + index*10}"\n></div>\n')
}]), angular.module("template/modal/window.html", []).run(["$templateCache", function (e) {
  e.put("template/modal/window.html", '<div tabindex="-1" role="dialog" class="modal fade" ng-class="{in: animate}" ng-style="{\'z-index\': 1050 + index*10, display: \'block\'}" ng-click="close($event)">\n    <div class="modal-dialog" ng-class="{\'modal-sm\': size == \'sm\', \'modal-lg\': size == \'lg\'}"><div class="modal-content" modal-transclude></div></div>\n</div>')
}]), angular.module("template/pagination/pager.html", []).run(["$templateCache", function (e) {
  e.put("template/pagination/pager.html", '<ul class="pager">\n  <li ng-class="{disabled: noPrevious(), previous: align}"><a href ng-click="selectPage(page - 1)">{{getText(\'previous\')}}</a></li>\n  <li ng-class="{disabled: noNext(), next: align}"><a href ng-click="selectPage(page + 1)">{{getText(\'next\')}}</a></li>\n</ul>')
}]), angular.module("template/pagination/pagination.html", []).run(["$templateCache", function (e) {
  e.put("template/pagination/pagination.html", '<ul class="pagination">\n  <li ng-if="boundaryLinks" ng-class="{disabled: noPrevious()}"><a href ng-click="selectPage(1)">{{getText(\'first\')}}</a></li>\n  <li ng-if="directionLinks" ng-class="{disabled: noPrevious()}"><a href ng-click="selectPage(page - 1)">{{getText(\'previous\')}}</a></li>\n  <li ng-repeat="page in pages track by $index" ng-class="{active: page.active}"><a href ng-click="selectPage(page.number)">{{page.text}}</a></li>\n  <li ng-if="directionLinks" ng-class="{disabled: noNext()}"><a href ng-click="selectPage(page + 1)">{{getText(\'next\')}}</a></li>\n  <li ng-if="boundaryLinks" ng-class="{disabled: noNext()}"><a href ng-click="selectPage(totalPages)">{{getText(\'last\')}}</a></li>\n</ul>')
}]), angular.module("template/tooltip/tooltip-html-unsafe-popup.html", []).run(["$templateCache", function (e) {
  e.put("template/tooltip/tooltip-html-unsafe-popup.html", '<div class="tooltip {{placement}}" ng-class="{ in: isOpen(), fade: animation() }">\n  <div class="tooltip-arrow"></div>\n  <div class="tooltip-inner" bind-html-unsafe="content"></div>\n</div>\n')
}]), angular.module("template/tooltip/tooltip-popup.html", []).run(["$templateCache", function (e) {
  e.put("template/tooltip/tooltip-popup.html", '<div class="tooltip {{placement}}" ng-class="{ in: isOpen(), fade: animation() }">\n  <div class="tooltip-arrow"></div>\n  <div class="tooltip-inner" ng-bind="content"></div>\n</div>\n')
}]), angular.module("template/popover/popover.html", []).run(["$templateCache", function (e) {
  e.put("template/popover/popover.html", '<div class="popover {{placement}}" ng-class="{ in: isOpen(), fade: animation() }">\n  <div class="arrow"></div>\n\n  <div class="popover-inner">\n      <h3 class="popover-title" ng-bind="title" ng-show="title"></h3>\n      <div class="popover-content" ng-bind="content"></div>\n  </div>\n</div>\n')
}]), angular.module("template/progressbar/bar.html", []).run(["$templateCache", function (e) {
  e.put("template/progressbar/bar.html", '<div class="progress-bar" ng-class="type && \'progress-bar-\' + type" role="progressbar" aria-valuenow="{{value}}" aria-valuemin="0" aria-valuemax="{{max}}" ng-style="{width: percent + \'%\'}" aria-valuetext="{{percent | number:0}}%" ng-transclude></div>')
}]), angular.module("template/progressbar/progress.html", []).run(["$templateCache", function (e) {
  e.put("template/progressbar/progress.html", '<div class="progress" ng-transclude></div>')
}]), angular.module("template/progressbar/progressbar.html", []).run(["$templateCache", function (e) {
  e.put("template/progressbar/progressbar.html", '<div class="progress">\n  <div class="progress-bar" ng-class="type && \'progress-bar-\' + type" role="progressbar" aria-valuenow="{{value}}" aria-valuemin="0" aria-valuemax="{{max}}" ng-style="{width: percent + \'%\'}" aria-valuetext="{{percent | number:0}}%" ng-transclude></div>\n</div>')
}]), angular.module("template/rating/rating.html", []).run(["$templateCache", function (e) {
  e.put("template/rating/rating.html", '<span ng-mouseleave="reset()" ng-keydown="onKeydown($event)" tabindex="0" role="slider" aria-valuemin="0" aria-valuemax="{{range.length}}" aria-valuenow="{{value}}">\n    <i ng-repeat="r in range track by $index" ng-mouseenter="enter($index + 1)" ng-click="rate($index + 1)" class="glyphicon" ng-class="$index < value && (r.stateOn || \'glyphicon-star\') || (r.stateOff || \'glyphicon-star-empty\')">\n        <span class="sr-only">({{ $index < value ? \'*\' : \' \' }})</span>\n    </i>\n</span>')
}]), angular.module("template/tabs/tab.html", []).run(["$templateCache", function (e) {
  e.put("template/tabs/tab.html", '<li ng-class="{active: active, disabled: disabled}">\n  <a href ng-click="select()" tab-heading-transclude>{{heading}}</a>\n</li>\n')
}]), angular.module("template/tabs/tabset.html", []).run(["$templateCache", function (e) {
  e.put("template/tabs/tabset.html", '<div>\n  <ul class="nav nav-{{type || \'tabs\'}}" ng-class="{\'nav-stacked\': vertical, \'nav-justified\': justified}" ng-transclude></ul>\n  <div class="tab-content">\n    <div class="tab-pane" \n         ng-repeat="tab in tabs" \n         ng-class="{active: tab.active}"\n         tab-content-transclude="tab">\n    </div>\n  </div>\n</div>\n')
}]), angular.module("template/timepicker/timepicker.html", []).run(["$templateCache", function (e) {
  e.put("template/timepicker/timepicker.html", '<table>\n	<tbody>\n		<tr class="text-center">\n			<td><a ng-click="incrementHours()" class="btn btn-link"><span class="glyphicon glyphicon-chevron-up"></span></a></td>\n			<td>&nbsp;</td>\n			<td><a ng-click="incrementMinutes()" class="btn btn-link"><span class="glyphicon glyphicon-chevron-up"></span></a></td>\n			<td ng-show="showMeridian"></td>\n		</tr>\n		<tr>\n			<td style="width:50px;" class="form-group" ng-class="{\'has-error\': invalidHours}">\n				<input type="text" ng-model="hours" ng-change="updateHours()" class="form-control text-center" ng-mousewheel="incrementHours()" ng-readonly="readonlyInput" maxlength="2">\n			</td>\n			<td>:</td>\n			<td style="width:50px;" class="form-group" ng-class="{\'has-error\': invalidMinutes}">\n				<input type="text" ng-model="minutes" ng-change="updateMinutes()" class="form-control text-center" ng-readonly="readonlyInput" maxlength="2">\n			</td>\n			<td ng-show="showMeridian"><button type="button" class="btn btn-default text-center" ng-click="toggleMeridian()">{{meridian}}</button></td>\n		</tr>\n		<tr class="text-center">\n			<td><a ng-click="decrementHours()" class="btn btn-link"><span class="glyphicon glyphicon-chevron-down"></span></a></td>\n			<td>&nbsp;</td>\n			<td><a ng-click="decrementMinutes()" class="btn btn-link"><span class="glyphicon glyphicon-chevron-down"></span></a></td>\n			<td ng-show="showMeridian"></td>\n		</tr>\n	</tbody>\n</table>\n')
}]), angular.module("template/typeahead/typeahead-match.html", []).run(["$templateCache", function (e) {
  e.put("template/typeahead/typeahead-match.html", '<a tabindex="-1" bind-html-unsafe="match.label | typeaheadHighlight:query"></a>')
}]), angular.module("template/typeahead/typeahead-popup.html", []).run(["$templateCache", function (e) {
  e.put("template/typeahead/typeahead-popup.html", '<ul class="dropdown-menu" ng-show="isOpen()" ng-style="{top: position.top+\'px\', left: position.left+\'px\'}" style="display: block;" role="listbox" aria-hidden="{{!isOpen()}}">\n    <li ng-repeat="match in matches track by $index" ng-class="{active: isActive($index) }" ng-mouseenter="selectActive($index)" ng-click="selectMatch($index)" role="option" id="{{match.id}}">\n        <div typeahead-match index="$index" match="match" query="query" template-url="templateUrl"></div>\n    </li>\n</ul>\n')
}]), define("angular-bootstrap", function () {
}), define("camunda-commons-ui/directives/index", ["angular", "./email", "./engineSelect", "./autoFill", "./inPlaceTextField", "./notificationsPanel", "./password", "./passwordRepeat", "./requestAware", "./showIfAuthorized", "./compileTemplate", "./nl2br", "./instantTypeahead", "../util/index", "angular-bootstrap"], function (e, t, n, r, i, a, o, s, u, l, c, p, f, d) {
  "use strict";
  var h = e.module("camunda.common.directives", ["ui.bootstrap", d.name]);
  return h.directive("email", t), h.directive("autoFill", r), h.directive("engineSelect", n), h.directive("camInPlaceTextField", i), h.directive("notificationsPanel", a), h.directive("password", o), h.directive("passwordRepeat", s), h.directive("showIfAuthorized", l), h.directive("compileTemplate", c), h.directive("nl2br", p), h.directive("instantTypeahead", f), h.config(["$modalProvider", "$tooltipProvider", function (e, t) {
    e.options = {backdrop: !0, keyboard: !0}, t.options({animation: !0, popupDelay: 100, appendToBody: !0})
  }]), h
}), define("camunda-commons-ui/resources/authorizationResource", [], function () {
  "use strict";
  return ["$resource", "Uri", function (e, t) {
    return e(t.appUri("engine://engine/:engine/authorization/:action"), {action: "@action"}, {
      check: {
        method: "GET",
        params: {action: "check"},
        cache: !0
      }, count: {method: "GET", params: {action: "count"}}, create: {method: "POST", params: {action: "create"}}
    })
  }]
}), define("camunda-commons-ui/resources/index", ["angular", "./authorizationResource"], function (e, t) {
  "use strict";
  var n = e.module("camunda.common.resources", []);
  return n.factory("AuthorizationResource", t), n
}), define("camunda-commons-ui/search/index", ["angular"], function (e) {
  "use strict";
  var t = ["$location", "$rootScope", function (t, n) {
    var r = !1;
    n.$on("$routeUpdate", function (e, t) {
      r ? r = !1 : n.$broadcast("$routeChanged", t)
    }), n.$on("$routeChangeSuccess", function () {
      r = !1
    });
    var i = function () {
      Array.prototype.slice(arguments);
      return t.search.apply(t, arguments)
    };
    return i.updateSilently = function (n) {
      var i = t.absUrl();
      e.forEach(n, function (e, n) {
        t.search(n, e)
      });
      var a = t.absUrl();
      a != i && (r = !0)
    }, i
  }], n = e.module("camunda.common.search", []);
  return n.factory("search", t), n
}), define("camunda-commons-ui/services/escape", [], function () {
  "use strict";
  return function () {
    return function (e) {
      return encodeURIComponent(e).replace(/%2F/g, "%252F").replace(/\*/g, "%2A").replace(/%5C/g, "%255C")
    }
  }
}), define("camunda-commons-ui/services/debounce", [], function () {
  "use strict";
  return ["$timeout", function (e) {
    return function (t, n) {
      var r, i = function () {
        var a = this, o = arguments;
        i.$loading = !0, r && e.cancel(r), r = e(function () {
          r = null, i.$loading = !1, t.apply(a, o)
        }, n)
      };
      return i
    }
  }]
}), define("camunda-commons-ui/services/RequestLogger", [], function () {
  "use strict";
  return ["$rootScope", function (e) {
    var t = 0;
    return {
      logStarted: function () {
        t || e.$broadcast("requestStarted"), t++
      }, logFinished: function () {
        t--, t || e.$broadcast("requestFinished")
      }
    }
  }]
}), define("camunda-commons-ui/services/ResourceResolver", [], function () {
  "use strict";
  return ["$route", "$q", "$location", "Notifications", function (e, t, n, r) {
    function i(i, a) {
      function o(e) {
        u.resolve(e)
      }

      function s(e) {
        var t, i, a = "/dashboard";
        404 === e.status ? (t = "No " + p + " with ID " + l, i = !0) : 401 === e.status ? (t = "Authentication failed. Your session might have expired, you need to login.", a = "/login") : t = "Received " + e.status + " from server.", n.path(a), i && n.replace(), r.addError({
          status: "Failed to display " + p,
          message: t,
          http: !0,
          exclusive: ["http"]
        }), u.reject(t)
      }

      var u = t.defer(), l = e.current.params[i], c = a.resolve, p = a.name || "entity", f = c(l);
      if (f.$promise.then)f = f.$promise.then(function (e) {
        o(e)
      }, s); else {
        if (!f.then)throw new Error("No promise returned by #resolve");
        f = f.then(o, s)
      }
      return u.promise
    }

    return {getByRouteParam: i}
  }]
}), define("camunda-commons-ui/services/index", ["angular", "./../util/index", "./escape", "./debounce", "./RequestLogger", "./ResourceResolver"], function (e, t, n, r, i, a) {
  "use strict";
  var o = e.module("camunda.common.services", [t.name]);
  return o.filter("escape", n), o.factory("debounce", r), o.factory("RequestLogger", i), o.factory("ResourceResolver", a), o.config(["$httpProvider", function (e) {
    e.responseInterceptors.push(["$rootScope", "$q", "RequestLogger", function (e, t, n) {
      return function (r) {
        function i(e) {
          return n.logFinished(), e
        }

        function a(r) {
          n.logFinished();
          var i = {status: parseInt(r.status), response: r, data: r.data};
          return e.$broadcast("httpError", i), t.reject(r)
        }

        return n.logStarted(), r.then(i, a)
      }
    }])
  }]), o.config(["$httpProvider", "$windowProvider", function (e, t) {
    var n = t.$get(), r = n.location.href, i = r.match(/\/app\/(\w+)\/(\w+)\//);
    if (!i)throw new Error("no process engine selected");
    e.defaults.headers.get = {"X-Authorized-Engine": i[2]}
  }]), o
}), define("text!camunda-commons-ui/widgets/inline-field/cam-widget-inline-field.html", [], function () {
  return '<span ng-show="!editing"\n      ng-click="startEditing()"\n      ng-transclude\n      class="view-value">\n</span>\n\n<span ng-if="editing && (varType === \'datetime\' || varType === \'date\' || varType === \'time\')"\n      class="preview">\n  {{ dateValue | camDate }}\n</span>\n\n<span ng-if="editing"\n      class="edit">\n\n  <input ng-if="simpleField"\n         class="form-control"\n         type="{{ varType }}"\n         ng-model="editValue"\n         ng-keydown="handleKeydown($event)"\n         placeholder="{{ placeholder }}" />\n\n  <span ng-show="varType === \'datetime\' || varType === \'date\' || varType === \'time\'"\n        class="cam-widget-inline-field field-control">\n\n    <datepicker class="datepicker"\n                ng-if="varType === \'datetime\' || varType === \'date\'"\n                type="text"\n                ng-required="true"\n                is-open="datePickerOptions.isOpen"\n                show-button-bar="false"\n\n                ng-model="dateValue"\n                ng-change="changeDate(this)" />\n\n    <timepicker class="timepicker"\n                ng-if="varType === \'datetime\' || varType === \'time\'"\n                show-meridian="false"\n\n                ng-model="dateValue"\n                ng-change="changeDate(this)" />\n  </span>\n\n  <input ng-if="varType === \'option\' && options[0].value"\n         class="form-control"\n         type="text"\n         ng-model="editValue"\n         ng-keydown="handleKeydown($event)"\n         typeahead="option as option.value for option in options | filter:$viewValue:instantTypeahead"\n         typeahead-on-select="saveSelection($item)"\n         instant-typeahead />\n  <input ng-if="varType === \'option\' && !options[0].value"\n         class="form-control"\n         type="text"\n         ng-model="editValue"\n         ng-keydown="handleKeydown($event)"\n         typeahead="option for option in options | filter:$viewValue:instantTypeahead"\n         typeahead-on-select="saveSelection($item)"\n         instant-typeahead />\n\n  <span ng-show="varType !== \'option\'"\n        class="cam-widget-inline-field btn-group">\n    <button type="button"\n            class="btn btn-xs btn-default"\n            ng-click="changeType()"\n            ng-if="flexible">\n      <span class="glyphicon"\n            ng-class="\'glyphicon-\' + (varType === \'text\' ? \'calendar\' : \'pencil\')"></span>\n    </button>\n\n    <button type="button"\n            class="btn btn-xs btn-default"\n            ng-click="applyChange($event)">\n      <span class="glyphicon glyphicon-ok"></span>\n    </button>\n\n    <button type="button"\n            class="btn btn-xs btn-default"\n            ng-click="cancelChange($event)">\n      <span class="glyphicon glyphicon-remove"></span>\n    </button>\n  </span>\n</span>\n'
}),define("camunda-commons-ui/widgets/inline-field/cam-widget-inline-field", ["text!./cam-widget-inline-field.html", "angular", "jquery"], function (e, t, n) {
  "use strict";
  return ["$timeout", "$filter", "$document", function (r, i, a) {
    return {
      scope: {
        varValue: "=value",
        varType: "@type",
        validator: "&validate",
        change: "&",
        onStart: "&onStartEditing",
        onCancel: "&onCancelEditing",
        placeholder: "@",
        options: "=?",
        allowNonOptions: "@",
        flexible: "@"
      }, template: e, link: function (e, o) {
        function s(e) {
          var t, n, r, i, a, o, s, u = $.exec(e);
          return u ? (t = parseInt(u[1] || 0, 10), n = parseInt(u[2] || 0, 10) - 1, r = parseInt(u[3] || 0, 10), i = parseInt(u[4] || 0, 10), a = parseInt(u[5] || 0, 10), o = parseInt(u[6] || 0, 10), s = parseInt(u[7] || 0, 10), new Date(t, n, r, i, a, o, s)) : void 0
        }

        function u() {
          return ["datetime", "date", "time"].indexOf(e.varType) > -1
        }

        function l() {
          return ["color", "email", "month", "number", "range", "tel", "text", "time", "url", "week"].indexOf(e.varType) > -1
        }

        function c() {
          if (e.editing = !1, e.invalid = !1, e.editValue = e.varValue, e.validator = e.validator || function () {
              }, e.onStart = e.onStart || function () {
              }, e.onCancel = e.onCancel || function () {
              }, e.change = e.change || function () {
              }, e.options = e.options || [], e.allowNonOptions = e.allowNonOptions || !1, e.flexible = e.flexible || !1, e.varType = e.varType ? e.varType : "text", e.simpleField = l(), u()) {
            var t = e.varValue, n = null;
            n = t ? s(t) : Date.now(), e.dateValue = n
          }
        }

        function p(e) {
          if (!e || !e.length)return !1;
          var t = e.parent();
          return t && t.length ? "body" === t[0].tagName.toLowerCase() : !1
        }

        function f() {
          var e = o.offset();
          v.show().css({
            left: e.left + (o.outerWidth() - v.outerWidth()),
            top: e.top - v.outerHeight()
          }), y.show().css({left: e.left, top: e.top + o.outerHeight()})
        }

        function d() {
          v = (v && v.length ? v : o.find(".btn-group")).hide(), p(v) || b.append(v), y = (y && y.length ? y : o.find(".field-control")).hide(), p(y) || b.append(y), r(f, 50)
        }

        function h(t) {
          r(function () {
            (!e.editing || t) && (v && v.remove && v.remove(), v = null, y && y.remove && y.remove(), y = null)
          }, 50)
        }

        function m(e) {
          return o[0].contains(e.target) || v && v.length && v[0].contains(e.target) || y && y.length && y[0].contains(e.target)
        }

        function g(t) {
          if (e.editing && !m(t)) {
            var r = n(t.target), i = "ng-binding text-muted";
            if (!r.hasClass(i)) {
              var a = r.children();
              a.hasClass(i) || e.$apply(e.cancelChange)
            }
          }
        }

        var v, y, b = t.element("body"), x = i("date"), w = "yyyy-MM-dd'T'HH:mm:ss", $ = /(\d\d\d\d)-(\d\d)-(\d\d)T(\d\d):(\d\d):(\d\d)(?:.(\d\d\d)| )?$/;
        e.editing = !1, e.$on("$locationChangeSuccess", function () {
          e.cancelChange()
        }), e.$on("$destroy", function () {
          h(!0)
        }), e.$watch("editing", function (t, n) {
          t !== n && (e.editing ? (d(), o.addClass("inline-editing")) : (h(), o.removeClass("inline-editing")))
        }), e.changeType = function () {
          e.varType = "datetime" === e.varType ? "text" : "datetime", c(), e.editing = !0, o[0].attributes.type.value = e.varType, e.simpleField = l()
        }, e.startEditing = function () {
          if (!e.editing) {
            c(), e.editing = !0, e.onStart(e);
            var t = e.editValue;
            e.editValue = "", r(function () {
              r(function () {
                o.find('[ng-model="editValue"]').trigger("input"), e.editValue = t, t && r(function () {
                  for (var e = "object" == typeof t ? t.value : t, r = o.find("li[ng-mouseenter]"), i = 0; i < r.length; i++) {
                    var a = r[i];
                    if (0 === a.innerText.indexOf(e))return void n(a).trigger("mouseenter")
                  }
                })
              })
            }), r(function () {
              n('[ng-model="editValue"]').focus(), n('[ng-model="editValue"]').select(), a.bind("click", g)
            }, 50)
          }
        }, e.applyChange = function (t, r) {
          if (e.invalid = e.validator(e), !e.invalid) {
            if (e.simpleField)e.editValue = n('[ng-model="editValue"]').val(), e.varValue = e.editValue; else if ("option" === e.varType) {
              if (-1 === e.options.indexOf(t) && !e.allowNonOptions)return void e.cancelChange();
              e.editValue = t || n('[ng-model="editValue"]').val(), e.varValue = e.editValue
            } else u() && (e.varValue = x(e.dateValue, w));
            e.$event = r, e.change(e), e.editing = !1, a.unbind("click", g)
          }
        }, e.cancelChange = function () {
          e.editing = !1, e.onCancel(e), a.unbind("click", g)
        }, e.changeDate = function (t) {
          e.editValue = e.dateValue = t.dateValue
        }, e.selectNextInlineField = function (e) {
          for (var t = n("[cam-widget-inline-field][type='text'], [cam-widget-inline-field][type='option']"), i = e * (t.length - 1); i !== !e * (t.length - 1); i += 2 * !e - 1)if (t[i] === o[0])return void r(function () {
            var a = n(t[i + 2 * !e - 1]);
            a.find(".view-value").click(), r(function () {
              a.find("input").select()
            })
          });
          r(function () {
            n(t[e * t.length - 1]).find(".view-value").click()
          })
        }, e.handleKeydown = function (t) {
          13 === t.keyCode ? (e.applyChange(e.selection, t), t.preventDefault()) : 27 === t.keyCode ? (e.cancelChange(t), t.preventDefault()) : 9 === t.keyCode && (e.applyChange(e.selection, t), e.selectNextInlineField(t.shiftKey), t.preventDefault()), e.selection = null
        }, e.selection = null, e.saveSelection = function (t) {
          e.selection = t, r(function () {
            e.selection === t && e.applyChange(t)
          })
        }
      }, transclude: !0
    }
  }]
}),define("text!camunda-commons-ui/widgets/search-pill/cam-widget-search-pill.html", [], function () {
  return '<!-- CE # camunda-commons-ui/lib/widgets/search-pill/search-pill.html -->\n<span class="search-label"\n      ng-class="{\'invalid\': !valid}">\n  <a href\n     ng-click="onDelete()"\n     tooltip-placement="top"\n     tooltip="{{ deleteText }}"\n     class="remove-search glyphicon glyphicon-remove">\n  </a>\n\n  <span class="glyphicon glyphicon-exclamation-sign valid-hide"\n        ng-if="invalidText"\n        tooltip-placement="top"\n        tooltip="{{ invalidText }}"></span>\n  <span class="glyphicon glyphicon-exclamation-sign valid-hide"\n        ng-if="!invalidText"></span>\n\n  <span cam-widget-inline-field\n        class="set-value"\n        type="option"\n        options="type.values"\n        change="changeSearch(\'type\', varValue, $event)"\n        on-start-editing="clearEditTrigger(\'type\')"\n        value="type.value">\n    <span ng-if="type.tooltip"\n          tooltip-placement="top"\n          tooltip="{{type.tooltip}}">\n      {{ type.value.value | camQueryComponent }}\n    </span>\n    <span ng-if="!type.tooltip">\n      {{ type.value.value | camQueryComponent }}\n    </span>\n  </span>\n  <span ng-if="extended">\n    :\n    <span ng-if="potentialNames.length <= 0">\n      <span ng-if="!!name.value.value">\n        <span cam-widget-inline-field\n              class="set-value"\n              type="text"\n              change="changeSearch(\'name\', varValue, $event)"\n              on-start-editing="clearEditTrigger(\'name\')"\n              value="name.value.value">\n          <span ng-if="name.tooltip"\n                tooltip-placement="top"\n                tooltip="{{name.tooltip}}">\n              {{ name.value.value | camQueryComponent }}\n          </span>\n          <span ng-if="!name.tooltip">\n              {{ name.value.value | camQueryComponent }}\n          </span>\n        </span>\n      </span>\n      <span ng-if="!name.value.value">\n        <span cam-widget-inline-field\n              class="set-value"\n              type="text"\n              change="changeSearch(\'name\', varValue, $event)"\n              on-start-editing="clearEditTrigger(\'name\')"\n              value="name.value">\n          <span ng-if="name.tooltip"\n                tooltip-placement="top"\n                tooltip="{{name.tooltip}}">\n              {{ name.value | camQueryComponent }}\n          </span>\n          <span ng-if="!name.tooltip">\n              {{ name.value | camQueryComponent }}\n          </span>\n        </span>\n      </span>\n    </span>\n    <span ng-if="potentialNames.length > 0">\n      <span cam-widget-inline-field\n            class="set-value"\n            type="option"\n            options="potentialNames"\n            allow-non-options="true"\n            change="changeSearch(\'name\', varValue, $event)"\n            on-start-editing="clearEditTrigger(\'name\')"\n            value="name.value">\n        <span ng-if="name.tooltip"\n              tooltip-placement="top"\n              tooltip="{{name.tooltip}}">\n          <span ng-if="name.value.key">\n            {{ name.value.value | camQueryComponent }}\n          </span>\n          <span ng-if="!name.value.key">\n            {{ name.value | camQueryComponent }}\n          </span>\n        </span>\n        <span ng-if="!name.tooltip">\n          <span ng-if="name.value.key">\n            {{ name.value.value | camQueryComponent }}\n          </span>\n          <span ng-if="!name.value.key">\n            {{ name.value | camQueryComponent }}\n          </span>\n        </span>\n      </span>\n    </span>\n  </span>\n\n  <span cam-widget-inline-field\n        class="set-value"\n        type="option"\n        options="operator.values"\n        change="changeSearch(\'operator\', varValue, $event)"\n        on-start-editing="clearEditTrigger(\'operator\')"\n        value="operator.value">\n    <span ng-if="operator.tooltip"\n          tooltip-placement="top"\n          tooltip="{{operator.tooltip}}">\n      {{ operator.value.value | camQueryComponent }}\n    </span>\n    <span ng-if="!operator.tooltip">\n      {{ operator.value.value | camQueryComponent }}\n    </span>\n  </span>\n\n  <span cam-widget-inline-field\n        class="set-value"\n        type="{{ valueType }}"\n        change="changeSearch(\'value\', varValue, $event)"\n        on-start-editing="clearEditTrigger(\'value\')"\n        value="value.value"\n        flexible="{{ allowDates }}">\n    <span class="visible-whitespace"\n          ng-if="value.tooltip"\n          tooltip-placement="top"\n          tooltip="{{value.tooltip}}">{{ value.value | camQueryComponent }}</span>\n    <span class="visible-whitespace"\n          ng-if="!value.tooltip">{{ value.value | camQueryComponent }}</span>\n  </span>\n</span>\n<!-- CE / camunda-commons-ui/lib/widgets/search-pill/search-pill.html -->\n'
}),define("camunda-commons-ui/widgets/search-pill/cam-widget-search-pill", ["text!./cam-widget-search-pill.html", "angular", "jquery"], function (e) {
  "use strict";
  return ["$timeout", function (t) {
    return {
      restrict: "A",
      scope: {
        valid: "=",
        extended: "=",
        allowDates: "=",
        enforceDates: "=",
        invalidText: "@",
        deleteText: "@",
        type: "=",
        name: "=",
        potentialNames: "=?",
        operator: "=",
        value: "=",
        onChange: "&",
        onDelete: "&"
      },
      link: function (e, n) {
        e.valueType = e.enforceDates ? "datetime" : "text", e.potentialNames = e.potentialNames || [], e.changeSearch = function (t, n, r) {
          var i = e[t].value;
          e[t].value = n, e[t].inEdit = !1, "function" == typeof e.onChange && e.onChange({
            field: t,
            before: i,
            value: n,
            $event: r
          })
        }, e.clearEditTrigger = function (t) {
          e[t].inEdit = !1
        }, e.$watch("allowDates", function (t) {
          t || (e.valueType = "text")
        }), e.$watch("enforceDates", function (t) {
          t && (e.valueType = "datetime")
        });
        var r = function (e) {
          t(function () {
            n.find("[cam-widget-inline-field][value='" + e + ".value']").find(".view-value").click()
          })
        };
        e.$watch("value", function (e) {
          return e && e.inEdit && r("value")
        }, !0), e.$watch("name", function (e) {
          return e && e.inEdit && r("name")
        }, !0), e.$watch("type", function (e) {
          return e && e.inEdit && r("type")
        }, !0)
      },
      template: e
    }
  }]
}),define("camunda-commons-ui/widgets/search-pill/cam-query-component", ["angular"], function () {
  "use strict";
  return ["$filter", function (e) {
    function t(e) {
      return e.match(n)
    }

    var n = /(\d\d\d\d)-(\d\d)-(\d\d)T(\d\d):(\d\d):(\d\d)(?:.(\d\d\d)| )?$/, r = e("camDate");
    return function (e) {
      return e && t(e) ? r(e) : e ? e : "??"
    }
  }]
}),define("text!camunda-commons-ui/widgets/header/cam-widget-header.html", [], function () {
  return '<div class="navbar-header">\n  <button type="button"\n          class="navbar-toggle collapsed">\n    <span class="sr-only">Toggle navigation</span>\n    <span class="icon-bar"></span>\n    <span class="icon-bar"></span>\n    <span class="icon-bar"></span>\n  </button>\n\n  <a class="navbar-brand"\n     href="#/"\n     title="{{ brandName }}">\n    {{ brandName }}\n  </a>\n</div>\n\n<div ng-transclude></div>\n\n<ul class="cam-nav nav navbar-nav">\n\n  <li engine-select></li>\n\n  <li class="account dropdown"\n      ng-if="authentication.name"\n      ng-cloak>\n    <a href\n       class="dropdown-toggle">\n      <span class="glyphicon glyphicon-user "></span>\n      {{ authentication.name }}\n    </a>\n\n    <ul class="dropdown-menu dropdown-menu-right">\n      <li class="profile">\n        <a ng-href="{{ \'../../admin/:engine/#/users/\' + authentication.name + \'?tab=profile\' | uri }}">\n          My Profile\n        </a>\n      </li>\n\n      <li class="divider"></li>\n\n      <li class="logout">\n        <a href\n           ng-click="logout()">\n          Sign out\n        </a>\n      </li>\n    </ul>\n  </li>\n\n  <li class="divider-vertical"\n      ng-if="authentication.name"\n      ng-cloak></li>\n\n  <li class="app-switch dropdown">\n    <a href\n       class="dropdown-toggle">\n      <span class="glyphicon glyphicon-home"></span>\n      <span class="caret"></span>\n    </a>\n\n    <ul class="dropdown-menu dropdown-menu-right">\n      <li ng-repeat="(appName, app) in apps"\n          ng-if="appName !== currentApp && (!authentication || authentication.canAccess(appName))"\n          ng-class="appName">\n        <a ng-href="{{ \'../../\' + appName + \'/:engine/\' | uri }}">\n          {{ app.label }}\n        </a>\n      </li>\n    </ul>\n  </li>\n</ul>\n'
}),define("camunda-commons-ui/widgets/header/cam-widget-header", ["angular", "text!./cam-widget-header.html"], function (e, t) {
  "use strict";
  function n(t) {
    var n = e.copy(r);
    return t && delete n[t], n
  }

  var r = {admin: {label: "Admin"}, cockpit: {label: "Cockpit"}, tasklist: {label: "Tasklist"}};
  return [function () {
    return {
      transclude: !0,
      template: t,
      scope: {authentication: "=", currentApp: "@", brandName: "@"},
      controller: ["$scope", "AuthenticationService", function (e, t) {
        e.apps = n(e.currentApp), e.logout = t.logout, e.$watch("currentApp", function () {
          e.apps = n(e.currentApp)
        })
      }]
    }
  }]
}),define("text!camunda-commons-ui/widgets/footer/cam-widget-footer.html", [], function () {
  return '<div class="container-fluid">\n  <div class="row">\n    <div class="col-xs-12">\n      Powered by <a href="http://camunda.org">camunda BPM</a> /\n      <span class="version">{{version}}</span>\n    </div>\n  </div>\n</div>\n'
}),define("camunda-commons-ui/widgets/footer/cam-widget-footer", ["text!./cam-widget-footer.html"], function (e) {
  "use strict";
  return [function () {
    return {template: e, scope: {version: "@"}}
  }]
}),define("text!camunda-commons-ui/widgets/loader/cam-widget-loader.html", [], function () {
  return '<div class="loader-state loaded"\n     ng-show="loadingState === \'LOADED\'"\n     ng-transclude></div>\n\n<div class="loader-state loading"\n     ng-if="loadingState === \'LOADING\'">\n  <span class="glyphicon glyphicon-refresh animate-spin"></span>\n  {{ textLoading }}\n</div>\n\n<div class="loader-state empty"\n     ng-if="loadingState === \'EMPTY\'">\n  {{ textEmpty }}\n</div>\n\n<div class="loader-state alert alert-danger"\n     ng-if="loadingState === \'ERROR\'">\n  {{ textError }}\n</div>\n'
}),define("camunda-commons-ui/widgets/loader/cam-widget-loader", ["angular", "text!./cam-widget-loader.html"], function (e, t) {
  "use strict";
  return [function () {
    return {
      transclude: !0,
      template: t,
      scope: {loadingState: "@", textEmpty: "@", textError: "@", textLoading: "@"},
      compile: function (t, n) {
        e.isDefined(n.textLoading) || (n.textLoading = "Loading…"), e.isDefined(n.loadingState) || (n.loadingState = "INITIAL")
      }
    }
  }]
}),define("text!camunda-commons-ui/widgets/debug/cam-widget-debug.html", [], function () {
  return '<div class="debug">\n  <div class="col-xs-2">\n    <button class="btn btn-default btn-round"\n            ng-click="toggleOpen()"\n            tooltip="{{tooltip}}">\n      <span class="glyphicon"\n            ng-class="{\'glyphicon-eye-open\': !open, \'glyphicon-eye-close\': open}"></span>\n    </button>\n  </div>\n  <div class="col-xs-10"\n       ng-show="open">\n    <code>{{ varName }}</code>\n    <pre>{{ debugged | json }}</pre>\n  </div>\n</div>\n'
}),define("camunda-commons-ui/widgets/debug/cam-widget-debug", ["angular", "text!./cam-widget-debug.html"], function (e, t) {
  "use strict";
  return [function () {
    return {
      template: t,
      scope: {debugged: "=", open: "@", tooltip: "@camWidgetDebugTooltip"},
      link: function (e, t, n) {
        e.varName = n.debugged, e.toggleOpen = function () {
          e.open = !e.open
        }
      }
    }
  }]
}),define("text!camunda-commons-ui/widgets/variable/cam-widget-variable.html", [], function () {
  return '<div ng-if="display && isShown(\'type\')"\n     class="type">{{ variable.type }}</div>\n<div ng-if="display && isShown(\'name\')"\n     class="name">{{ variable.name }}</div>\n<div ng-if="display && isShown(\'value\') && isPrimitive()"\n     ng-class="{null: isNull()}"\n     class="value">\n  <span ng-if="isNull()"\n        class="null-symbol">&lt;null&gt;</span>\n  {{ (variable.value === null ? \'\' : variable.value.toString()) }}\n</div>\n<div ng-if="display && isShown(\'value\') && variable.type === \'Object\'"\n     ng-class="{null: isNull()}"\n     class="value">\n  <a ng-click="editVariableValue()">\n    {{ variable.valueInfo.objectTypeName }}\n  </a>\n</div>\n\n\n<div ng-if="!display"\n     class="input-group editing">\n  <div ng-if="isShown(\'type\')"\n       class="input-group-btn type">\n    <select class="form-control"\n            ng-model="variable.type"\n            ng-options="variableType for variableType in variableTypes track by variableType"\n            required>\n    </select>\n  </div><!-- /btn-group -->\n\n  <input ng-if="isShown(\'name\')"\n         type="text"\n         class="form-control name"\n         ng-model="variable.name"\n         placeholder="varName"\n         required />\n\n  <div ng-if="isShown(\'value\') && !isNull()"\n       class="value-wrapper input-group"\n       ng-class="{checkbox: useCheckbox()}">\n    <div ng-if="variable.type !== \'Null\'"\n         class="input-group-btn">\n      <a ng-click="setNull()"\n         class="btn btn-default set-null"\n         tooltip="Set value to &quot;null&quot;">\n        <span class="glyphicon glyphicon-remove"></span>\n      </a>\n    </div>\n\n    <input ng-if="isPrimitive() && !useCheckbox()"\n           type="text"\n           class="form-control value"\n           ng-model="variable.value"\n           placeholder="Value of the variable"\n           cam-variable-validator="{{variable.type}}" />\n\n    <input ng-if="useCheckbox()"\n           type="checkbox"\n           class="value"\n           ng-model="variable.value"\n           placeholder="Value of the variable"\n           cam-variable-validator="{{variable.type}}" />\n\n    <div ng-if="variable.type === \'Object\'"\n         class="value form-control-static">\n      <a ng-click="editVariableValue()">\n        {{ variable.valueInfo.objectTypeName || \'&lt;undefined&gt;\' }}\n      </a>\n    </div>\n  </div>\n\n  <div ng-if="variable.type !== \'Null\' && isShown(\'value\') && isNull()"\n       ng-click="setNonNull()"\n       class="value-wrapper value null-value btn btn-default"\n       tooltip="Re-set to previous or default value">\n    <span class="null-symbol">&lt;null&gt;</span>\n  </div>\n\n  <div ng-if="variable.type === \'Null\'"\n       class="value-wrapper value btn no-click null-value">\n    <span class="null-symbol">&lt;null&gt;</span>\n  </div>\n</div>\n'
}),define("text!camunda-commons-ui/widgets/variable/cam-widget-variable-dialog.html", [], function () {
  return '<!-- # CE - camunda-commons-ui/lib/widgets/variable/cam-widget-variable-dialog.html -->\n<div class="modal-header">\n  <h3>Inspect "{{ variable.name }}" variable</h3>\n</div>\n\n<div class="modal-body">\n  <div ng-if="readonly">\n    <p>\n      Object type name: <code>{{ variable.valueInfo.objectTypeName }}</code>\n    </p>\n\n    <p>\n      Serialization Data Format: <code>{{ variable.valueInfo.serializationDataFormat }}</code>\n    </p>\n  </div>\n\n  <div ng-if="!readonly"\n       class="form-group">\n    <label for="object-type-name">Object type name</label>\n    <input type="text"\n           id="object-type-name"\n           class="form-control"\n           ng-model="variable.valueInfo.objectTypeName" />\n  </div>\n\n  <div ng-if="!readonly"\n       class="form-group">\n    <label for="serialization-data-format">Serialization data format</label>\n    <input type="text"\n           id="serialization-data-format"\n           class="form-control"\n           ng-model="variable.valueInfo.serializationDataFormat" />\n  </div>\n\n  <div class="form-group">\n    <label for="serialized-value">Serialized value</label>\n    <textarea ng-model="variable.value"\n              id="serialized-value"\n              rows="10"\n              class="form-control"\n              ng-disabled="readonly"></textarea>\n  </div>\n</div>\n\n<div class="modal-footer">\n  <button class="btn btn-default"\n          ng-click="$dismiss(\'close\')">\n    Close\n  </button>\n\n  <button class="btn btn-primary"\n          ng-if="!readonly"\n          ng-disabled="!hasChanged(\'serialized\')"\n          ng-click="$close(variable)">\n    Change\n  </button>\n</div>\n<!-- / CE - camunda-commons-ui/lib/widgets/variable/cam-widget-variable-dialog.html -->\n'
}),!function (e) {
  if ("object" == typeof exports && "undefined" != typeof module)module.exports = e(); else if ("function" == typeof define && define.amd)define("camunda-bpm-sdk-js-type-utils", [], e); else {
    var t;
    "undefined" != typeof window ? t = window : "undefined" != typeof global ? t = global : "undefined" != typeof self && (t = self);
    var n = t;
    n = n.CamSDK || (n.CamSDK = {}), n = n.utils || (n.utils = {}), n.typeUtils = e()
  }
}(function () {
  return function e(t, n, r) {
    function i(o, s) {
      if (!n[o]) {
        if (!t[o]) {
          var u = "function" == typeof require && require;
          if (!s && u)return u(o, !0);
          if (a)return a(o, !0);
          throw new Error("Cannot find module '" + o + "'")
        }
        var l = n[o] = {exports: {}};
        t[o][0].call(l.exports, function (e) {
          var n = t[o][1][e];
          return i(n ? n : e)
        }, l, l.exports, e, t, n, r)
      }
      return n[o].exports
    }

    for (var a = "function" == typeof require && require, o = 0; o < r.length; o++)i(r[o]);
    return i
  }({
    1: [function (e, t) {
      "use strict";
      var n = /^-?[\d]+$/, r = /^(0|(-?(((0|[1-9]\d*)\.\d+)|([1-9]\d*))))([eE][-+]?[0-9]+)?$/, i = /^(true|false)$/, a = /^(\d{2}|\d{4})(?:\-)([0]{1}\d{1}|[1]{1}[0-2]{1})(?:\-)([0-2]{1}\d{1}|[3]{1}[0-1]{1})T(?:\s)?([0-1]{1}\d{1}|[2]{1}[0-3]{1}):([0-5]{1}\d{1}):([0-5]{1}\d{1})?$/, o = function (e, t) {
        switch (t) {
          case"Integer":
          case"Long":
          case"Short":
            return n.test(e);
          case"Float":
          case"Double":
            return r.test(e);
          case"Boolean":
            return i.test(e);
          case"Date":
            return a.test(e)
        }
      }, s = function (e, t) {
        if ("string" == typeof e && (e = e.trim()), "String" === t || "Bytes" === t)return e;
        if (!o(e, t))throw new Error("Value '" + e + "' is not of type " + t);
        switch (t) {
          case"Integer":
          case"Long":
          case"Short":
            return parseInt(e, 10);
          case"Float":
          case"Double":
            return parseFloat(e);
          case"Boolean":
            return "true" === e;
          case"Date":
            return e
        }
      };
      t.exports = {convertToType: s, isType: o}
    }, {}]
  }, {}, [1])(1)
}),define("camunda-commons-ui/widgets/variable/cam-widget-variable", ["angular", "text!./cam-widget-variable.html", "text!./cam-widget-variable-dialog.html", "camunda-bpm-sdk-js-type-utils"], function (e, t, n, r) {
  "use strict";
  function i(e) {
    return e = e || new Date, e.toISOString().slice(0, -5)
  }

  var a = ["Boolean", "Date", "Double", "Integer", "Long", "Null", "Object", "Short", "String"], o = ["$scope", "$http", "variable", "readonly", function (t, n, r, i) {
    t.variable = r, t.readonly = i;
    var a = e.copy(r);
    t.hasChanged = function () {
      return a.valueInfo = a.valueInfo || {}, r.valueInfo = r.valueInfo || {}, a.value !== r.value || a.valueInfo.serializationDataFormat !== r.valueInfo.serializationDataFormat || a.valueInfo.objectTypeName !== r.valueInfo.objectTypeName
    }
  }];
  return ["$modal", function (s) {
    return {
      template: t, scope: {variable: "=camVariable", display: "@?", shown: "=?"}, link: function (t, u) {
        function l() {
          if (t.valid = t.variable.name && t.variable.type ? null === t.variable.value || ["String", "Object", "Null"].indexOf(t.variable.type) > -1 ? !0 : r.isType(t.variable.value, t.variable.type) : !1, t.valid && t.variable.type && null !== t.variable.value && t.isPrimitive(t.variable.type)) {
            var e;
            e = "Boolean" !== t.variable.type ? r.convertToType(t.variable.value, t.variable.type) : t.variable.value ? "false" !== t.variable.value : !1, typeof t.variable.value != typeof e && (t.variable.value = e)
          }
        }

        t.variableTypes = e.copy(a), t.isPrimitive = function (e) {
          return e = e || t.variable.type, e ? ["Boolean", "Date", "Double", "Integer", "Long", "Short", "String"].indexOf(e) >= 0 : !0
        };
        var c = {Boolean: !1, Date: i(), Double: 0, Integer: 0, Long: 0, Null: "", Short: 0, String: "", Object: {}};
        t.useCheckbox = function () {
          return "Boolean" === t.variable.type
        }, t.isShown = function (e) {
          return Array.isArray(t.shown) && t.shown.length ? t.shown.indexOf(e) > -1 : !0
        }, t.shownClasses = function () {
          return Array.isArray(t.shown) && t.shown.length ? t.shown.map(function (e) {
            return "show-" + e
          }).join(" ") : ""
        }, t.$watch("shown", function () {
          u.removeClass("show-type show-name show-value").addClass(t.shownClasses())
        }), t.valid = !0, t.$watch("variable.value", l), t.$watch("variable.name", l), t.$watch("variable.type", l), l();
        var p = t.variable.value;
        t.$watch("variable.type", function (e, n) {
          "Boolean" === e ? null !== t.variable.value && (p = t.variable.value, t.variable.value = "false" === t.variable.value ? !1 : !!t.variable.value) : "Boolean" === n && (t.variable.value = p);
          var r = u[0].classList;
          n && r.remove("var-type-" + n.toLowerCase()), e && r.add("var-type-" + e.toLowerCase())
        }), t.isNull = function () {
          return null === t.variable.value
        }, t.setNonNull = function () {
          t.variable.value = p || c[t.variable.type]
        }, t.setNull = function () {
          p = t.variable.value, t.variable.value = null
        }, t.editVariableValue = function () {
          s.open({
            template: n, controller: o, windowClass: "cam-widget-variable-dialog", resolve: {
              variable: function () {
                return e.copy(t.variable)
              }, readonly: function () {
                return t.display
              }
            }
          }).result.then(function (e) {
              t.variable.value = e.value, t.variable.valueInfo = e.valueInfo
            })
        }
      }
    }
  }]
}),define("text!camunda-commons-ui/widgets/search/cam-widget-search.html", [], function () {
  return '<form class="search-field"\n      ng-submit="createSearch()"\n      ng-class="{\'has-search\': searches.length}">\n  <div class="form-container search-container">\n    <span cam-widget-search-pill\n          ng-repeat="search in searches"\n          extended="search.extended"\n          allow-dates="search.allowDates"\n          enforce-dates="search.enforceDates"\n          valid="search.valid"\n          name="search.name"\n          potential-names="search.potentialNames"\n          type="search.type"\n          operator="search.operator"\n          value="search.value"\n          invalid-text="{{ translations.invalid }}"\n          delete-text="{{ translations.deleteSearch }}"\n          on-change="handleChange($index, field, before, value, $event)"\n          on-delete="deleteSearch($index)"\n    />\n\n    <input class="form-control main-field"\n           type="text"\n           placeholder="{{ translations.inputPlaceholder }}"\n           ng-model="inputQuery"\n           ng-keydown="onKeydown($event)"\n           typeahead="type as type.value for type in dropdownTypes | filter:$viewValue:instantTypeahead"\n           typeahead-on-select="createSearch($item)"\n           instant-typeahead\n    />\n\n  </div>\n</form>\n'
}),define("camunda-commons-ui/widgets/search/cam-widget-search", ["text!./cam-widget-search.html", "angular", "jquery"], function (e, t, n) {
  "use strict";
  function r(e) {
    return e && "string" == typeof e && e.match(i) ? "date" : typeof e
  }

  var i = /(\d\d\d\d)-(\d\d)-(\d\d)T(\d\d):(\d\d):(\d\d)(?:.(\d\d\d)| )?$/, a = function (e) {
    return e.type.value && (!e.extended || e.name.value) && e.operator.value && e.value.value && ("date" === r(e.value.value) || !e.enforceDates)
  }, o = function (e) {
    if (!e.value)return void(e.value = e.values[0]);
    var t = e.values.map(function (e) {
      return e.key
    }).indexOf(e.value.key);
    e.value = e.values[-1 === t ? 0 : t]
  }, s = function (e) {
    return isNaN(e) || "" === e.trim() ? "true" === e ? !0 : "false" === e ? !1 : "NULL" === e ? null : e : +e
  };
  return ["$timeout", "$location", "search", function (i, u, l) {
    return {
      restrict: "A",
      scope: {
        types: "=camWidgetSearchTypes",
        translations: "=camWidgetSearchTranslations",
        operators: "=camWidgetSearchOperators",
        searches: "=?camWidgetSearchSearches",
        validSearches: "=?camWidgetSearchValidSearches",
        searchId: "@camWidgetSearchId"
      },
      link: function (e, c) {
        var p = e.searchId || "search";
        e.searchTypes = e.types.map(function (e) {
          return e.id
        });
        var f = e.types.reduce(function (e, t) {
          return e || (t["default"] ? t : null)
        }, null), d = function () {
          var n = e.searches.map(function (e) {
            return e.type.value.key
          }).reduce(function (e, t) {
            return -1 === e.indexOf(t) && e.push(t), e
          }, []), r = n.map(function (e) {
            return h(e).groups
          }).filter(function (e) {
            return !!e
          }).reduce(function (e, n) {
            if (e) {
              if (0 === e.length)return t.copy(n);
              for (var r = 0; r < e.length; r++)-1 === n.indexOf(e[r]) && (e.splice(r, 1), r--);
              return 0 === e.length ? null : e
            }
            return null
          }, []);
          return null === r ? [] : 0 === r.length ? e.searchTypes : e.searchTypes.filter(function (e) {
            var t = h(e.key).groups;
            if (!t)return !0;
            for (var n = 0; n < t.length; n++)if (r.indexOf(t[n]) > -1)return !0;
            return !1
          })
        }, h = function (t) {
          return e.types.reduce(function (e, n) {
            return e || (n.id.key === t ? n : null)
          }, null)
        }, m = function (t, n) {
          return t.operators || e.operators[r(s(n))]
        }, g = function () {
          var n = JSON.parse((u.search() || {})[p + "Query"] || "[]"), r = [];
          return t.forEach(n, function (t) {
            var n = h(t.type), i = {
              extended: n.extended,
              type: {
                values: d(), value: d().reduce(function (e, n) {
                  return e || (n.key === t.type ? n : null)
                }, null), tooltip: e.translations.type
              },
              name: {value: t.name, tooltip: e.translations.name},
              operator: {tooltip: e.translations.operator},
              value: {value: t.value, tooltip: e.translations.value},
              allowDates: n.allowDates,
              enforceDates: n.enforceDates,
              potentialNames: n.potentialNames || []
            };
            i.operator.values = m(n, i.value.value), i.operator.value = i.operator.values.reduce(function (e, n) {
              return e || (n.key === t.operator ? n : null)
            }, null), i.valid = a(i), r.push(i)
          }), r
        };
        e.searches = e.searches || [], e.searches = g(), e.validSearchesBuffer = e.searches.reduce(function (e, t) {
          return t.valid && e.push(t), e
        }, []), e.validSearches = t.copy(e.validSearchesBuffer);
        var v = function (t, n) {
          var r = e.searches[t];
          if (!r.valid) {
            if (r.extended && !r.name.value && "name" !== n)return void(r.name.inEdit = !0);
            if ("value" !== n)return void(r.value.inEdit = !0)
          }
          for (var i = 1; i < e.searches.length; i++) {
            var a = (i + t) % e.searches.length;
            if (r = e.searches[a], !r.valid)return void(r.extended && !r.name.value ? r.name.inEdit = !0 : r.value.inEdit = !0)
          }
        };
        e.createSearch = function (t) {
          if (t || e.inputQuery) {
            var n = t ? "" : e.inputQuery;
            t = t && h(t.key) || f;
            var r = m(t, n);
            e.searches.push({
              extended: t.extended,
              type: {values: d(), value: t.id, tooltip: e.translations.type},
              name: {value: "", inEdit: t.extended, tooltip: e.translations.name},
              operator: {value: r[0], values: r, tooltip: e.translations.operator},
              value: {value: n, inEdit: !t.extended && !n, tooltip: e.translations.value},
              allowDates: t.allowDates,
              enforceDates: t.enforceDates,
              potentialNames: t.potentialNames
            });
            var o = e.searches[e.searches.length - 1];
            o.valid = a(o), n ? e.inputQuery = "" : i(function () {
              i(function () {
                e.inputQuery = "", c.find(".search-container > input").blur()
              })
            })
          }
        }, e.deleteSearch = function (t) {
          e.searches.splice(t, 1)
        }, e.handleChange = function (t, n, r, s, u) {
          var l, p = e.searches[t];
          "type" === n ? (l = h(s.key), p.extended = l.extended, p.allowDates = l.allowDates, !p.enforceDates && l.enforceDates && (p.value.value = ""), p.enforceDates = l.enforceDates, p.operator.values = m(l, p.value.value), o(p.operator)) : "value" === n && (t === e.searches.length - 1 && i(function () {
            c.find(".search-container > input").focus()
          }), l = h(p.type.value.key), l.operators || (p.operator.values = m(l, p.value.value), o(p.operator))), p.valid = a(p), u && 13 === u.keyCode && v(t, n)
        }, e.onKeydown = function (t) {
          if (9 !== t.keyCode || e.inputQuery)-1 !== [38, 40, 13].indexOf(t.keyCode) && 0 === c.find(".dropdown-menu").length && i(function () {
            n(t.target).trigger("input")
          }); else {
            t.preventDefault(), t.stopPropagation();
            var r = e.searches[t.shiftKey ? e.searches.length - 1 : 0];
            r && (t.shiftKey ? r.value.inEdit = !0 : r.type.inEdit = !0)
          }
        };
        var y = function (e) {
          var n = [];
          return t.forEach(e, function (e) {
            n.push({type: e.type.value.key, operator: e.operator.value.key, value: e.value.value, name: e.name.value})
          }), n
        };
        e.$watch("searches", function () {
          var n = e.searches;
          t.forEach(n, function (t) {
            t.valid && -1 === e.validSearchesBuffer.indexOf(t) && e.validSearchesBuffer.push(t)
          }), t.forEach(e.validSearchesBuffer, function (t, r) {
            t.valid && -1 !== n.indexOf(t) || e.validSearchesBuffer.splice(r, 1)
          });
          var r = {};
          r[p + "Query"] = JSON.stringify(y(e.validSearchesBuffer)), l.updateSilently(r), x()
        }, !0);
        var b;
        e.$watch("validSearchesBuffer", function () {
          i.cancel(b), b = i(function () {
            e.validSearches = t.copy(e.validSearchesBuffer)
          })
        }, !0);
        var x = function () {
          var t = d();
          e.dropdownTypes = t;
          for (var n = 0; n < e.searches.length; n++)e.searches[n].type.values = t
        };
        e.$watch("types", function () {
          t.forEach(e.searches, function (e) {
            e.potentialNames = h(e.type.value.key).potentialNames || []
          })
        }, !0), e.dropdownTypes = d()
      },
      template: e
    }
  }]
}),!function (e) {
  if ("object" == typeof exports && "undefined" != typeof module)module.exports = e(); else if ("function" == typeof define && define.amd)define("bpmn-io", [], e); else {
    var t;
    "undefined" != typeof window ? t = window : "undefined" != typeof global ? t = global : "undefined" != typeof self && (t = self), t.BpmnJS = e()
  }
}(function () {
  var e;
  return function t(e, n, r) {
    function i(o, s) {
      if (!n[o]) {
        if (!e[o]) {
          var u = "function" == typeof require && require;
          if (!s && u)return u(o, !0);
          if (a)return a(o, !0);
          var l = new Error("Cannot find module '" + o + "'");
          throw l.code = "MODULE_NOT_FOUND", l
        }
        var c = n[o] = {exports: {}};
        e[o][0].call(c.exports, function (t) {
          var n = e[o][1][t];
          return i(n ? n : t)
        }, c, c.exports, t, e, n, r)
      }
      return n[o].exports
    }

    for (var a = "function" == typeof require && require, o = 0; o < r.length; o++)i(r[o]);
    return i
  }({
    1: [function (e, t) {
      function n(e) {
        r.call(this, e)
      }

      var r = e(2);
      n.prototype = Object.create(r.prototype), t.exports = n, n.prototype._navigationModules = [e(60), e(58)], n.prototype._modules = [].concat(n.prototype._modules, n.prototype._navigationModules)
    }, {2: 2, 58: 58, 60: 60}],
    2: [function (e, t) {
      function n(e, t) {
        var n = e.get("eventBus");
        t.forEach(function (e) {
          n.on(e.event, e.handler)
        })
      }

      function r(e) {
        var t = /unparsable content <([^>]+)> detected([\s\S]*)$/, n = t.exec(e.message);
        return n && (e.message = "unparsable content <" + n[1] + "> detected; this may indicate an invalid BPMN 2.0 diagram file" + n[2]), e
      }

      function i(e) {
        return e + (l(e) ? "px" : "")
      }

      function a(e) {
        this.options = e = o({}, g, e || {});
        var t = e.container;
        t.get && (t = t.get(0)), u(t) && (t = p(t));
        var n = this.container = c('<div class="bjs-container"></div>');
        t.appendChild(n), o(n.style, {width: i(e.width), height: i(e.height), position: e.position});
        var r = "iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAMAAADypuvZAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAADBQTFRFiMte9PrwldFwfcZPqtqN0+zEyOe1XLgjvuKncsJAZ70y6fXh3vDT////UrQV////G2zN+AAAABB0Uk5T////////////////////AOAjXRkAAAHDSURBVHjavJZJkoUgDEBJmAX8979tM8u3E6x20VlYJfFFMoL4vBDxATxZcakIOJTWSmxvKWVIkJ8jHvlRv1F2LFrVISCZI+tCtQx+XfewgVTfyY3plPiQEAzI3zWy+kR6NBhFBYeBuscJLOUuA2WVLpCjVIaFzrNQZArxAZKUQm6gsj37L9Cb7dnIBUKxENaaMJQqMpDXvSL+ktxdGRm2IsKgJGGPg7atwUG5CcFUEuSv+CwQqizTrvDTNXdMU2bMiDWZd8d7QIySWVRsb2vBBioxOFt4OinPBapL+neAb5KL5IJ8szOza2/DYoipUCx+CjO0Bpsv0V6mktNZ+k8rlABlWG0FrOpKYVo8DT3dBeLEjUBAj7moDogVii7nSS9QzZnFcOVBp1g2PyBQ3Vr5aIapN91VJy33HTJLC1iX2FY6F8gRdaAeIEfVONgtFCzZTmoLEdOjBDfsIOA6128gw3eu1shAajdZNAORxuQDJN5A5PbEG6gNIu24QJD5iNyRMZIr6bsHbCtCU/OaOaSvgkUyDMdDa1BXGf5HJ1To+/Ym6mCKT02Y+/Sa126ZKyd3jxhzpc1r8zVL6YM1Qy/kR4ABAFJ6iQUnivhAAAAAAElFTkSuQmCC", a = '<a href="http://bpmn.io" target="_blank" class="bjs-powered-by" title="Powered by bpmn.io" style="position: absolute; bottom: 15px; right: 15px; z-index: 100"><img src="data:image/png;base64,' + r + '"></a>';
        n.appendChild(c(a))
      }

      var o = e(159), s = e(163), u = e(156), l = e(153), c = e(173), p = e(175), f = e(176), d = e(35), h = e(14), m = e(9), g = {
        width: "100%",
        height: "100%",
        position: "relative",
        container: "body"
      };
      a.prototype.importXML = function (e, t) {
        var n = this;
        this.moddle = this.createModdle(), this.moddle.fromXML(e, "bpmn:Definitions", function (e, i, a) {
          if (e)return e = r(e), t(e);
          var o = a.warnings;
          n.importDefinitions(i, function (e, n) {
            return e ? t(e) : void t(null, o.concat(n || []))
          })
        })
      }, a.prototype.saveXML = function (e, t) {
        t || (t = e, e = {});
        var n = this.definitions;
        return n ? void this.moddle.toXML(n, e, t) : t(new Error("no definitions loaded"))
      }, a.prototype.createModdle = function () {
        return new h(this.options.moddleExtensions)
      }, a.prototype.saveSVG = function (e, t) {
        t || (t = e, e = {});
        var n = this.get("canvas"), r = n.getDefaultLayer(), i = n._svg.select("defs"), a = r.innerSVG(), o = i && i.outerSVG() || "", s = r.getBBox(), u = '<?xml version="1.0" encoding="utf-8"?>\n<!-- created with bpmn-js / http://bpmn.io -->\n<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="' + s.width + '" height="' + s.height + '" viewBox="' + s.x + " " + s.y + " " + s.width + " " + s.height + '" version="1.1">' + o + a + "</svg>";
        t(null, u)
      }, a.prototype.get = function (e) {
        if (!this.diagram)throw new Error("no diagram loaded");
        return this.diagram.get(e)
      }, a.prototype.invoke = function (e) {
        if (!this.diagram)throw new Error("no diagram loaded");
        return this.diagram.invoke(e)
      }, a.prototype.importDefinitions = function (e, t) {
        try {
          this.diagram && this.clear(), this.definitions = e;
          var n = this.diagram = this._createDiagram(this.options);
          this._init(n), m.importBpmnDiagram(n, e, t)
        } catch (r) {
          t(r)
        }
      }, a.prototype._init = function (e) {
        n(e, this.__listeners || [])
      }, a.prototype._createDiagram = function (e) {
        var t = [].concat(e.modules || this.getModules(), e.additionalModules || []);
        return t.unshift({
          bpmnjs: ["value", this],
          moddle: ["value", this.moddle]
        }), e = s(e, "additionalModules"), e = o(e, {canvas: {container: this.container}, modules: t}), new d(e)
      }, a.prototype.getModules = function () {
        return this._modules
      }, a.prototype.clear = function () {
        var e = this.diagram;
        e && e.destroy()
      }, a.prototype.destroy = function () {
        this.clear(), f(this.container)
      }, a.prototype.on = function (e, t) {
        var n = this.diagram, r = this.__listeners = this.__listeners || [];
        r.push({event: e, handler: t}), n && n.get("eventBus").on(e, t)
      }, a.prototype._modules = [e(3), e(55), e(51)], t.exports = a
    }, {
      14: 14,
      153: 153,
      156: 156,
      159: 159,
      163: 163,
      173: 173,
      175: 175,
      176: 176,
      3: 3,
      35: 35,
      51: 51,
      55: 55,
      9: 9
    }],
    3: [function (e, t) {
      t.exports = {__depends__: [e(6), e(11)]}
    }, {11: 11, 6: 6}],
    4: [function (e, t) {
      function n(e, t, n) {
        function h(e, t) {
          H[e] = t
        }

        function m(e) {
          return H[e]
        }

        function g(e) {
          function t(e, t) {
            var n = a({
              fill: "black",
              strokeWidth: 1,
              strokeLinecap: "round",
              strokeDasharray: "none"
            }, t.attrs), r = t.ref || {x: 0, y: 0}, i = t.scale || 1;
            "none" === n.strokeDasharray && (n.strokeDasharray = [1e4, 1]);
            var o = t.element.attr(n).marker(0, 0, 20, 20, r.x, r.y).attr({markerWidth: 20 * i, markerHeight: 20 * i});
            return h(e, o)
          }

          t("sequenceflow-end", {
            element: e.path("M 1 5 L 11 10 L 1 15 Z"),
            ref: {x: 11, y: 10},
            scale: .5
          }), t("messageflow-start", {
            element: e.circle(6, 6, 5),
            attrs: {fill: "white", stroke: "black"},
            ref: {x: 6, y: 6}
          }), t("messageflow-end", {
            element: e.path("M 1 5 L 11 10 L 1 15 Z"),
            attrs: {fill: "white", stroke: "black"},
            ref: {x: 11, y: 10}
          }), t("data-association-end", {
            element: e.path("M 1 5 L 11 10 L 1 15"),
            attrs: {fill: "white", stroke: "black"},
            ref: {x: 11, y: 10},
            scale: .5
          }), t("conditional-flow-marker", {
            element: e.path("M 0 10 L 8 6 L 16 10 L 8 14 Z"),
            attrs: {fill: "white", stroke: "black"},
            ref: {x: -1, y: 10},
            scale: .5
          }), t("conditional-default-flow-marker", {
            element: e.path("M 1 4 L 5 16"),
            attrs: {stroke: "black"},
            ref: {x: -5, y: 10},
            scale: .5
          })
        }

        function v(e, n, i) {
          return r(n) || (i = n, n = []), t.style(n || [], a(i, e || {}))
        }

        function y(e, t, n, r, a) {
          i(r) && (a = r, r = 0), r = r || 0, a = v(a, {stroke: "black", strokeWidth: 2, fill: "white"});
          var o = t / 2, s = n / 2;
          return e.circle(o, s, Math.round((t + n) / 4 - r)).attr(a)
        }

        function b(e, t, n, r, a, o) {
          return i(a) && (o = a, a = 0), a = a || 0, o = v(o, {
            stroke: "black",
            strokeWidth: 2,
            fill: "white"
          }), e.rect(a, a, t - 2 * a, n - 2 * a, r).attr(o)
        }

        function x(e, t, n, r) {
          var i = t / 2, a = n / 2, o = [i, 0, t, a, i, n, 0, a];
          return r = v(r, {stroke: "black", strokeWidth: 2, fill: "white"}), e.polygon(o).attr(r)
        }

        function w(e, t, n) {
          return n = v(n, ["no-fill"], {stroke: "black", strokeWidth: 2, fill: "none"}), d(t, n).appendTo(e)
        }

        function $(e, t, n) {
          return n = v(n, ["no-fill"], {strokeWidth: 2, stroke: "black"}), e.path(t).attr(n)
        }

        function E(e) {
          return function (t, n) {
            return W[e](t, n)
          }
        }

        function S(e) {
          return W[e]
        }

        function T(e, t) {
          var n = L(e), r = F(n);
          return j(n, "bpmn:MessageEventDefinition") ? S("bpmn:MessageEventDefinition")(t, e, r) : j(n, "bpmn:TimerEventDefinition") ? S("bpmn:TimerEventDefinition")(t, e, r) : j(n, "bpmn:ConditionalEventDefinition") ? S("bpmn:ConditionalEventDefinition")(t, e) : j(n, "bpmn:SignalEventDefinition") ? S("bpmn:SignalEventDefinition")(t, e, r) : j(n, "bpmn:CancelEventDefinition") && j(n, "bpmn:TerminateEventDefinition", {parallelMultiple: !1}) ? S("bpmn:MultipleEventDefinition")(t, e, r) : j(n, "bpmn:CancelEventDefinition") && j(n, "bpmn:TerminateEventDefinition", {parallelMultiple: !0}) ? S("bpmn:ParallelMultipleEventDefinition")(t, e, r) : j(n, "bpmn:EscalationEventDefinition") ? S("bpmn:EscalationEventDefinition")(t, e, r) : j(n, "bpmn:LinkEventDefinition") ? S("bpmn:LinkEventDefinition")(t, e, r) : j(n, "bpmn:ErrorEventDefinition") ? S("bpmn:ErrorEventDefinition")(t, e, r) : j(n, "bpmn:CancelEventDefinition") ? S("bpmn:CancelEventDefinition")(t, e, r) : j(n, "bpmn:CompensateEventDefinition") ? S("bpmn:CompensateEventDefinition")(t, e, r) : j(n, "bpmn:TerminateEventDefinition") ? S("bpmn:TerminateEventDefinition")(t, e, r) : null
        }

        function C(e, t, n) {
          return U.createText(e, t || "", n).addClass("djs-label")
        }

        function k(e, t, n) {
          var r = L(t);
          return C(e, r.name, {box: t, align: n, padding: 5})
        }

        function A(e, t, n) {
          var r = L(t);
          return r.name || (t.hidden = !0), C(e, r.name, {box: t, align: n, style: {fontSize: "11px"}})
        }

        function _(e, t, n) {
          var r = C(e, t, {box: {height: 30, width: n.height}, align: "center-middle"}), i = -1 * n.height;
          r.transform("rotate(270) translate(" + i + ",0)")
        }

        function D(e) {
          for (var t = e.waypoints, n = "m  " + t[0].x + "," + t[0].y, r = 1; r < t.length; r++)n += "L" + t[r].x + "," + t[r].y + " ";
          return n
        }

        function M(e, t, n) {
          var r, i = L(t), a = u(n, "SubProcessMarker");
          return r = a ? {seq: -21, parallel: -22, compensation: -42, loop: -18, adhoc: 10} : {
            seq: -3,
            parallel: -6,
            compensation: -27,
            loop: 0,
            adhoc: 10
          }, o(n, function (n) {
            S(n)(e, t, r)
          }), "bpmn:AdHocSubProcess" === i.$type && S("AdhocMarker")(e, t, r), i.loopCharacteristics && void 0 === i.loopCharacteristics.isSequential ? void S("LoopMarker")(e, t, r) : (i.loopCharacteristics && void 0 !== i.loopCharacteristics.isSequential && !i.loopCharacteristics.isSequential && S("ParallelMarker")(e, t, r), i.loopCharacteristics && i.loopCharacteristics.isSequential && S("SequentialMarker")(e, t, r), void(i.isForCompensation && S("CompensationMarker")(e, t, r)))
        }

        function O(e, t) {
          var n = t.type, r = W[n];
          return r ? r(e, t) : c.prototype.drawShape.apply(this, [e, t])
        }

        function N(e, t) {
          var n = t.type, r = W[n];
          return r ? r(e, t) : c.prototype.drawConnection.apply(this, [e, t])
        }

        function P(e, t) {
          var r = (t.height - 16) / t.height, i = n.getScaledPath("DATA_OBJECT_COLLECTION_PATH", {
            xScaleFactor: 1,
            yScaleFactor: 1,
            containerWidth: t.width,
            containerHeight: t.height,
            position: {mx: .451, my: r}
          });
          $(e, i, {strokeWidth: 2})
        }

        function R(e) {
          return e.isCollection || e.elementObjectRef && e.elementObjectRef.isCollection
        }

        function I(e) {
          return e.businessObject.di
        }

        function L(e) {
          return e.businessObject
        }

        function j(e, t, n) {
          function r(e, t) {
            return s(t, function (t, n) {
              return e[n] == t
            })
          }

          return l(e.eventDefinitions, function (i) {
            return i.$type === t && r(e, n)
          })
        }

        function F(e) {
          return "bpmn:IntermediateThrowEvent" === e.$type || "bpmn:EndEvent" === e.$type
        }

        c.call(this, t);
        var B = 10, q = 3, V = {fontFamily: "Arial, sans-serif", fontSize: "12px"}, U = new p({
          style: V,
          size: {width: 100}
        }), H = {}, W = {
          "bpmn:Event": function (e, t, n) {
            return y(e, t.width, t.height, n)
          },
          "bpmn:StartEvent": function (e, t) {
            var n = {}, r = L(t);
            r.isInterrupting || (n = {strokeDasharray: "6", strokeLinecap: "round"});
            var i = S("bpmn:Event")(e, t, n);
            return T(t, e), i
          },
          "bpmn:MessageEventDefinition": function (e, t, r) {
            var i = n.getScaledPath("EVENT_MESSAGE", {
              xScaleFactor: .9,
              yScaleFactor: .9,
              containerWidth: t.width,
              containerHeight: t.height,
              position: {mx: .235, my: .315}
            }), a = r ? "black" : "white", o = r ? "white" : "black", s = $(e, i, {strokeWidth: 1, fill: a, stroke: o});
            return s
          },
          "bpmn:TimerEventDefinition": function (e, t) {
            var r = y(e, t.width, t.height, .2 * t.height, {strokeWidth: 2}), i = n.getScaledPath("EVENT_TIMER_WH", {
              xScaleFactor: .75,
              yScaleFactor: .75,
              containerWidth: t.width,
              containerHeight: t.height,
              position: {mx: .5, my: .5}
            });
            $(e, i, {strokeWidth: 2, strokeLinecap: "square"});
            for (var a = 0; 12 > a; a++) {
              var o = n.getScaledPath("EVENT_TIMER_LINE", {
                xScaleFactor: .75,
                yScaleFactor: .75,
                containerWidth: t.width,
                containerHeight: t.height,
                position: {mx: .5, my: .5}
              }), s = t.width / 2, u = t.height / 2;
              $(e, o, {
                strokeWidth: 1,
                strokeLinecap: "square",
                transform: "rotate(" + 30 * a + "," + u + "," + s + ")"
              })
            }
            return r
          },
          "bpmn:EscalationEventDefinition": function (e, t, r) {
            var i = n.getScaledPath("EVENT_ESCALATION", {
              xScaleFactor: 1,
              yScaleFactor: 1,
              containerWidth: t.width,
              containerHeight: t.height,
              position: {mx: .5, my: .555}
            }), a = r ? "black" : "none";
            return $(e, i, {strokeWidth: 1, fill: a})
          },
          "bpmn:ConditionalEventDefinition": function (e, t) {
            var r = n.getScaledPath("EVENT_CONDITIONAL", {
              xScaleFactor: 1,
              yScaleFactor: 1,
              containerWidth: t.width,
              containerHeight: t.height,
              position: {mx: .5, my: .222}
            });
            return $(e, r, {strokeWidth: 1})
          },
          "bpmn:LinkEventDefinition": function (e, t, r) {
            var i = n.getScaledPath("EVENT_LINK", {
              xScaleFactor: 1,
              yScaleFactor: 1,
              containerWidth: t.width,
              containerHeight: t.height,
              position: {mx: .57, my: .263}
            }), a = r ? "black" : "none";
            return $(e, i, {strokeWidth: 1, fill: a})
          },
          "bpmn:ErrorEventDefinition": function (e, t, r) {
            var i = n.getScaledPath("EVENT_ERROR", {
              xScaleFactor: 1.1,
              yScaleFactor: 1.1,
              containerWidth: t.width,
              containerHeight: t.height,
              position: {mx: .2, my: .722}
            }), a = r ? "black" : "none";
            return $(e, i, {strokeWidth: 1, fill: a})
          },
          "bpmn:CancelEventDefinition": function (e, t, r) {
            var i = n.getScaledPath("EVENT_CANCEL_45", {
              xScaleFactor: 1,
              yScaleFactor: 1,
              containerWidth: t.width,
              containerHeight: t.height,
              position: {mx: .638, my: -.055}
            }), a = r ? "black" : "none";
            return $(e, i, {strokeWidth: 1, fill: a}).transform("rotate(45)")
          },
          "bpmn:CompensateEventDefinition": function (e, t, r) {
            var i = n.getScaledPath("EVENT_COMPENSATION", {
              xScaleFactor: 1,
              yScaleFactor: 1,
              containerWidth: t.width,
              containerHeight: t.height,
              position: {mx: .201, my: .472}
            }), a = r ? "black" : "none";
            return $(e, i, {strokeWidth: 1, fill: a})
          },
          "bpmn:SignalEventDefinition": function (e, t, r) {
            var i = n.getScaledPath("EVENT_SIGNAL", {
              xScaleFactor: .9,
              yScaleFactor: .9,
              containerWidth: t.width,
              containerHeight: t.height,
              position: {mx: .5, my: .2}
            }), a = r ? "black" : "none";
            return $(e, i, {strokeWidth: 1, fill: a})
          },
          "bpmn:MultipleEventDefinition": function (e, t, r) {
            var i = n.getScaledPath("EVENT_MULTIPLE", {
              xScaleFactor: 1.1,
              yScaleFactor: 1.1,
              containerWidth: t.width,
              containerHeight: t.height,
              position: {mx: .222, my: .36}
            }), a = r ? "black" : "none";
            return $(e, i, {strokeWidth: 1, fill: a})
          },
          "bpmn:ParallelMultipleEventDefinition": function (e, t) {
            var r = n.getScaledPath("EVENT_PARALLEL_MULTIPLE", {
              xScaleFactor: 1.2,
              yScaleFactor: 1.2,
              containerWidth: t.width,
              containerHeight: t.height,
              position: {mx: .458, my: .194}
            });
            return $(e, r, {strokeWidth: 1})
          },
          "bpmn:EndEvent": function (e, t) {
            var n = S("bpmn:Event")(e, t, {strokeWidth: 4});
            return T(t, e, !0), n
          },
          "bpmn:TerminateEventDefinition": function (e, t) {
            var n = y(e, t.width, t.height, 8, {strokeWidth: 4, fill: "black"});
            return n
          },
          "bpmn:IntermediateEvent": function (e, t) {
            var n = S("bpmn:Event")(e, t, {strokeWidth: 1});
            return y(e, t.width, t.height, q, {strokeWidth: 1, fill: "none"}), T(t, e), n
          },
          "bpmn:IntermediateCatchEvent": E("bpmn:IntermediateEvent"),
          "bpmn:IntermediateThrowEvent": E("bpmn:IntermediateEvent"),
          "bpmn:Activity": function (e, t, n) {
            return b(e, t.width, t.height, B, n)
          },
          "bpmn:Task": function (e, t) {
            var n = S("bpmn:Activity")(e, t);
            return k(e, t, "center-middle"), M(e, t), n
          },
          "bpmn:ServiceTask": function (e, t) {
            var r = S("bpmn:Task")(e, t), i = n.getScaledPath("TASK_TYPE_SERVICE", {abspos: {x: 12, y: 18}});
            $(e, i, {strokeWidth: 1, fill: "none"});
            var a = n.getScaledPath("TASK_TYPE_SERVICE_FILL", {abspos: {x: 17.2, y: 18}});
            $(e, a, {strokeWidth: 0, stroke: "none", fill: "white"});
            var o = n.getScaledPath("TASK_TYPE_SERVICE", {abspos: {x: 17, y: 22}});
            return $(e, o, {strokeWidth: 1, fill: "white"}), r
          },
          "bpmn:UserTask": function (e, t) {
            var r = S("bpmn:Task")(e, t), i = 15, a = 12, o = n.getScaledPath("TASK_TYPE_USER_1", {
              abspos: {
                x: i,
                y: a
              }
            });
            $(e, o, {strokeWidth: .5, fill: "none"});
            var s = n.getScaledPath("TASK_TYPE_USER_2", {abspos: {x: i, y: a}});
            $(e, s, {strokeWidth: .5, fill: "none"});
            var u = n.getScaledPath("TASK_TYPE_USER_3", {abspos: {x: i, y: a}});
            return $(e, u, {strokeWidth: .5, fill: "black"}), r
          },
          "bpmn:ManualTask": function (e, t) {
            var r = S("bpmn:Task")(e, t), i = n.getScaledPath("TASK_TYPE_MANUAL", {abspos: {x: 17, y: 15}});
            return $(e, i, {strokeWidth: .25, fill: "white", stroke: "black"}), r
          },
          "bpmn:SendTask": function (e, t) {
            var r = S("bpmn:Task")(e, t), i = n.getScaledPath("TASK_TYPE_SEND", {
              xScaleFactor: 1,
              yScaleFactor: 1,
              containerWidth: 21,
              containerHeight: 14,
              position: {mx: .285, my: .357}
            });
            return $(e, i, {strokeWidth: 1, fill: "black", stroke: "white"}), r
          },
          "bpmn:ReceiveTask": function (e, t) {
            var r, i = L(t), a = S("bpmn:Task")(e, t);
            return i.instantiate ? (y(e, 28, 28, 4.4, {strokeWidth: 1}), r = n.getScaledPath("TASK_TYPE_INSTANTIATING_SEND", {
              abspos: {
                x: 7.77,
                y: 9.52
              }
            })) : r = n.getScaledPath("TASK_TYPE_SEND", {
              xScaleFactor: .9,
              yScaleFactor: .9,
              containerWidth: 21,
              containerHeight: 14,
              position: {mx: .3, my: .4}
            }), $(e, r, {strokeWidth: 1}), a
          },
          "bpmn:ScriptTask": function (e, t) {
            var r = S("bpmn:Task")(e, t), i = n.getScaledPath("TASK_TYPE_SCRIPT", {abspos: {x: 15, y: 20}});
            return $(e, i, {strokeWidth: 1}), r
          },
          "bpmn:BusinessRuleTask": function (e, t) {
            var r = S("bpmn:Task")(e, t), i = n.getScaledPath("TASK_TYPE_BUSINESS_RULE_HEADER", {
              abspos: {
                x: 8,
                y: 8
              }
            }), a = $(e, i);
            a.attr({strokeWidth: 1, fill: "AAA"});
            var o = n.getScaledPath("TASK_TYPE_BUSINESS_RULE_MAIN", {abspos: {x: 8, y: 8}}), s = $(e, o);
            return s.attr({strokeWidth: 1}), r
          },
          "bpmn:SubProcess": function (e, t, n) {
            var r = S("bpmn:Activity")(e, t, n), i = L(t), a = f.isExpanded(i), o = !!i.triggeredByEvent;
            return o && r.attr({strokeDasharray: "1,2"}), k(e, t, a ? "center-top" : "center-middle"), a ? M(e, t) : M(e, t, ["SubProcessMarker"]), r
          },
          "bpmn:AdHocSubProcess": function (e, t) {
            return S("bpmn:SubProcess")(e, t)
          },
          "bpmn:Transaction": function (e, n) {
            var r = S("bpmn:SubProcess")(e, n), i = t.style(["no-fill", "no-events"]);
            return b(e, n.width, n.height, B - 2, q, i), r
          },
          "bpmn:CallActivity": function (e, t) {
            return S("bpmn:SubProcess")(e, t, {strokeWidth: 5})
          },
          "bpmn:Participant": function (e, t) {
            var n = S("bpmn:Lane")(e, t), r = f.isExpandedPool(L(t));
            if (r) {
              w(e, [{x: 30, y: 0}, {x: 30, y: t.height}]);
              var i = L(t).name;
              _(e, i, t)
            } else {
              var a = L(t).name;
              C(e, a, {box: t, align: "center-middle"})
            }
            var o = !!L(t).participantMultiplicity;
            return o && S("ParticipantMultiplicityMarker")(e, t), n
          },
          "bpmn:Lane": function (e, t) {
            var n = b(e, t.width, t.height, 0, {fill: "none"}), r = L(t);
            if ("bpmn:Lane" === r.$type) {
              var i = r.name;
              _(e, i, t)
            }
            return n
          },
          "bpmn:InclusiveGateway": function (e, t) {
            var n = x(e, t.width, t.height);
            return y(e, t.width, t.height, .24 * t.height, {strokeWidth: 2.5, fill: "none"}), n
          },
          "bpmn:ExclusiveGateway": function (e, t) {
            var r = x(e, t.width, t.height), i = n.getScaledPath("GATEWAY_EXCLUSIVE", {
              xScaleFactor: .4,
              yScaleFactor: .4,
              containerWidth: t.width,
              containerHeight: t.height,
              position: {mx: .32, my: .3}
            });
            return I(t).isMarkerVisible && $(e, i, {strokeWidth: 1, fill: "black"}), r
          },
          "bpmn:ComplexGateway": function (e, t) {
            var r = x(e, t.width, t.height), i = n.getScaledPath("GATEWAY_COMPLEX", {
              xScaleFactor: .5,
              yScaleFactor: .5,
              containerWidth: t.width,
              containerHeight: t.height,
              position: {mx: .46, my: .26}
            });
            return $(e, i, {strokeWidth: 1, fill: "black"}), r
          },
          "bpmn:ParallelGateway": function (e, t) {
            var r = x(e, t.width, t.height), i = n.getScaledPath("GATEWAY_PARALLEL", {
              xScaleFactor: .6,
              yScaleFactor: .6,
              containerWidth: t.width,
              containerHeight: t.height,
              position: {mx: .46, my: .2}
            });
            return $(e, i, {strokeWidth: 1, fill: "black"}), r
          },
          "bpmn:EventBasedGateway": function (e, t) {
            function r() {
              var r = n.getScaledPath("GATEWAY_EVENT_BASED", {
                xScaleFactor: .18,
                yScaleFactor: .18,
                containerWidth: t.width,
                containerHeight: t.height,
                position: {mx: .36, my: .44}
              });
              $(e, r, {strokeWidth: 2, fill: "none"})
            }

            var i = L(t), a = x(e, t.width, t.height);
            y(e, t.width, t.height, .2 * t.height, {strokeWidth: 1, fill: "none"});
            var o = i.eventGatewayType, s = !!i.instantiate;
            if ("Parallel" === o) {
              var u = n.getScaledPath("GATEWAY_PARALLEL", {
                xScaleFactor: .4,
                yScaleFactor: .4,
                containerWidth: t.width,
                containerHeight: t.height,
                position: {mx: .474, my: .296}
              }), l = $(e, u);
              l.attr({strokeWidth: 1, fill: "none"})
            } else if ("Exclusive" === o) {
              if (!s) {
                var c = y(e, t.width, t.height, .26 * t.height);
                c.attr({strokeWidth: 1, fill: "none"})
              }
              r()
            }
            return a
          },
          "bpmn:Gateway": function (e, t) {
            return x(e, t.width, t.height)
          },
          "bpmn:SequenceFlow": function (e, t) {
            var n = D(t), r = $(e, n, {markerEnd: m("sequenceflow-end")}), i = L(t), a = t.source.businessObject;
            return i.conditionExpression && a.$instanceOf("bpmn:Task") && r.attr({markerStart: m("conditional-flow-marker")}), a["default"] && a.$instanceOf("bpmn:Gateway") && a["default"] === i && r.attr({markerStart: m("conditional-default-flow-marker")}), r
          },
          "bpmn:Association": function (e, t, n) {
            return n = a({strokeDasharray: "1,6", strokeLinecap: "round"}, n || {}), w(e, t.waypoints, n)
          },
          "bpmn:DataInputAssociation": function (e, t) {
            return S("bpmn:Association")(e, t, {markerEnd: m("data-association-end")})
          },
          "bpmn:DataOutputAssociation": function (e, t) {
            return S("bpmn:Association")(e, t, {markerEnd: m("data-association-end")})
          },
          "bpmn:MessageFlow": function (e, t) {
            var r = L(t), i = I(t), a = D(t), o = $(e, a, {
              markerEnd: m("messageflow-end"),
              markerStart: m("messageflow-start"),
              strokeDasharray: "10",
              strokeLinecap: "round",
              strokeWidth: 1
            });
            if (r.messageRef) {
              var s = o.getPointAtLength(o.getTotalLength() / 2), u = n.getScaledPath("MESSAGE_FLOW_MARKER", {
                abspos: {
                  x: s.x,
                  y: s.y
                }
              }), l = {strokeWidth: 1};
              "initiating" === i.messageVisibleKind ? (l.fill = "white", l.stroke = "black") : (l.fill = "#888", l.stroke = "white"), $(e, u, l)
            }
            return o
          },
          "bpmn:DataObject": function (e, t) {
            var r = n.getScaledPath("DATA_OBJECT_PATH", {
              xScaleFactor: 1,
              yScaleFactor: 1,
              containerWidth: t.width,
              containerHeight: t.height,
              position: {mx: .474, my: .296}
            }), i = $(e, r, {fill: "white"}), a = L(t);
            return R(a) && P(e, t), i
          },
          "bpmn:DataObjectReference": E("bpmn:DataObject"),
          "bpmn:DataInput": function (e, t) {
            var r = n.getRawPath("DATA_ARROW"), i = S("bpmn:DataObject")(e, t);
            return $(e, r, {strokeWidth: 1}), i
          },
          "bpmn:DataOutput": function (e, t) {
            var r = n.getRawPath("DATA_ARROW"), i = S("bpmn:DataObject")(e, t);
            return $(e, r, {strokeWidth: 1, fill: "black"}), i
          },
          "bpmn:DataStoreReference": function (e, t) {
            var r = n.getScaledPath("DATA_STORE", {
              xScaleFactor: 1,
              yScaleFactor: 1,
              containerWidth: t.width,
              containerHeight: t.height,
              position: {mx: 0, my: .133}
            }), i = $(e, r, {strokeWidth: 2, fill: "white"});
            return i
          },
          "bpmn:BoundaryEvent": function (e, t) {
            var n = L(t), r = n.cancelActivity, i = {strokeLinecap: "round", strokeWidth: 1};
            r || (i.strokeDasharray = "6");
            var a = S("bpmn:Event")(e, t, i);
            return y(e, t.width, t.height, q, i), T(t, e), a
          },
          "bpmn:Group": function (e, t) {
            return b(e, t.width, t.height, B, {
              strokeWidth: 1,
              strokeDasharray: "8,3,1,3",
              fill: "none",
              pointerEvents: "none"
            })
          },
          label: function (e, t) {
            return A(e, t, "")
          },
          "bpmn:TextAnnotation": function (e, t) {
            var r = {
              fill: "none",
              stroke: "none"
            }, i = b(e, t.width, t.height, 0, 0, r), a = n.getScaledPath("TEXT_ANNOTATION", {
              xScaleFactor: 1,
              yScaleFactor: 1,
              containerWidth: t.width,
              containerHeight: t.height,
              position: {mx: 0, my: 0}
            });
            $(e, a);
            var o = L(t).text || "";
            return C(e, o, {box: t, align: "left-middle", padding: 5}), i
          },
          ParticipantMultiplicityMarker: function (e, t) {
            var r = n.getScaledPath("MARKER_PARALLEL", {
              xScaleFactor: 1,
              yScaleFactor: 1,
              containerWidth: t.width,
              containerHeight: t.height,
              position: {mx: t.width / 2 / t.width, my: (t.height - 15) / t.height}
            });
            $(e, r)
          },
          SubProcessMarker: function (e, t) {
            var r = b(e, 14, 14, 0, {strokeWidth: 1});
            r.transform("translate(" + (t.width / 2 - 7.5) + "," + (t.height - 20) + ")");
            var i = n.getScaledPath("MARKER_SUB_PROCESS", {
              xScaleFactor: 1.5,
              yScaleFactor: 1.5,
              containerWidth: t.width,
              containerHeight: t.height,
              position: {mx: (t.width / 2 - 7.5) / t.width, my: (t.height - 20) / t.height}
            });
            $(e, i)
          },
          ParallelMarker: function (e, t, r) {
            var i = n.getScaledPath("MARKER_PARALLEL", {
              xScaleFactor: 1,
              yScaleFactor: 1,
              containerWidth: t.width,
              containerHeight: t.height,
              position: {mx: (t.width / 2 + r.parallel) / t.width, my: (t.height - 20) / t.height}
            });
            $(e, i)
          },
          SequentialMarker: function (e, t, r) {
            var i = n.getScaledPath("MARKER_SEQUENTIAL", {
              xScaleFactor: 1,
              yScaleFactor: 1,
              containerWidth: t.width,
              containerHeight: t.height,
              position: {mx: (t.width / 2 + r.seq) / t.width, my: (t.height - 19) / t.height}
            });
            $(e, i)
          },
          CompensationMarker: function (e, t, r) {
            var i = n.getScaledPath("MARKER_COMPENSATION", {
              xScaleFactor: 1,
              yScaleFactor: 1,
              containerWidth: t.width,
              containerHeight: t.height,
              position: {mx: (t.width / 2 + r.compensation) / t.width, my: (t.height - 13) / t.height}
            });
            $(e, i, {strokeWidth: 1})
          },
          LoopMarker: function (e, t, r) {
            var i = n.getScaledPath("MARKER_LOOP", {
              xScaleFactor: 1,
              yScaleFactor: 1,
              containerWidth: t.width,
              containerHeight: t.height,
              position: {mx: (t.width / 2 + r.loop) / t.width, my: (t.height - 7) / t.height}
            });
            $(e, i, {strokeWidth: 1, fill: "none", strokeLinecap: "round", strokeMiterlimit: .5})
          },
          AdhocMarker: function (e, t, r) {
            var i = n.getScaledPath("MARKER_ADHOC", {
              xScaleFactor: 1,
              yScaleFactor: 1,
              containerWidth: t.width,
              containerHeight: t.height,
              position: {mx: (t.width / 2 + r.adhoc) / t.width, my: (t.height - 15) / t.height}
            });
            $(e, i, {strokeWidth: 1, fill: "black"})
          }
        };
        e.on("canvas.init", function (e) {
          g(e.svg)
        }), this.drawShape = O, this.drawConnection = N
      }

      var r = e(150), i = e(154), a = e(159), o = e(80), s = e(77), u = e(82), l = e(85), c = e(43), p = e(68), f = e(12), d = c.createLine;
      n.prototype = Object.create(c.prototype), n.$inject = ["eventBus", "styles", "pathMap"], t.exports = n
    }, {12: 12, 150: 150, 154: 154, 159: 159, 43: 43, 68: 68, 77: 77, 80: 80, 82: 82, 85: 85}],
    5: [function (e, t) {
      function n() {
        this.pathMap = {
          EVENT_MESSAGE: {
            d: "m {mx},{my} l 0,{e.y1} l {e.x1},0 l 0,-{e.y1} z l {e.x0},{e.y0} l {e.x0},-{e.y0}",
            height: 36,
            width: 36,
            heightElements: [6, 14],
            widthElements: [10.5, 21]
          },
          EVENT_SIGNAL: {
            d: "M {mx},{my} l {e.x0},{e.y0} l -{e.x1},0 Z",
            height: 36,
            width: 36,
            heightElements: [18],
            widthElements: [10, 20]
          },
          EVENT_ESCALATION: {
            d: "m {mx},{my} c -{e.x1},{e.y0} -{e.x3},{e.y1} -{e.x5},{e.y4} {e.x1},-{e.y3} {e.x3},-{e.y5} {e.x5},-{e.y6} {e.x0},{e.y3} {e.x2},{e.y5} {e.x4},{e.y6} -{e.x0},-{e.y0} -{e.x2},-{e.y1} -{e.x4},-{e.y4} z",
            height: 36,
            width: 36,
            heightElements: [2.382, 4.764, 4.926, 6.589333, 7.146, 13.178667, 19.768],
            widthElements: [2.463, 2.808, 4.926, 5.616, 7.389, 8.424]
          },
          EVENT_CONDITIONAL: {
            d: "M {e.x0},{e.y0} l {e.x1},0 l 0,{e.y2} l -{e.x1},0 Z M {e.x2},{e.y3} l {e.x0},0 M {e.x2},{e.y4} l {e.x0},0 M {e.x2},{e.y5} l {e.x0},0 M {e.x2},{e.y6} l {e.x0},0 M {e.x2},{e.y7} l {e.x0},0 M {e.x2},{e.y8} l {e.x0},0 ",
            height: 36,
            width: 36,
            heightElements: [8.5, 14.5, 18, 11.5, 14.5, 17.5, 20.5, 23.5, 26.5],
            widthElements: [10.5, 14.5, 12.5]
          },
          EVENT_LINK: {
            d: "m {mx},{my} 0,{e.y0} -{e.x1},0 0,{e.y1} {e.x1},0 0,{e.y0} {e.x0},-{e.y2} -{e.x0},-{e.y2} z",
            height: 36,
            width: 36,
            heightElements: [4.4375, 6.75, 7.8125],
            widthElements: [9.84375, 13.5]
          },
          EVENT_ERROR: {
            d: "m {mx},{my} {e.x0},-{e.y0} {e.x1},-{e.y1} {e.x2},{e.y2} {e.x3},-{e.y3} -{e.x4},{e.y4} -{e.x5},-{e.y5} z",
            height: 36,
            width: 36,
            heightElements: [.023, 8.737, 8.151, 16.564, 10.591, 8.714],
            widthElements: [.085, 6.672, 6.97, 4.273, 5.337, 6.636]
          },
          EVENT_CANCEL_45: {
            d: "m {mx},{my} -{e.x1},0 0,{e.x0} {e.x1},0 0,{e.y1} {e.x0},0 0,-{e.y1} {e.x1},0 0,-{e.y0} -{e.x1},0 0,-{e.y1} -{e.x0},0 z",
            height: 36,
            width: 36,
            heightElements: [4.75, 8.5],
            widthElements: [4.75, 8.5]
          },
          EVENT_COMPENSATION: {
            d: "m {mx},{my} {e.x0},-{e.y0} 0,{e.y1} z m {e.x0},0 {e.x0},-{e.y0} 0,{e.y1} z",
            height: 36,
            width: 36,
            heightElements: [5, 10],
            widthElements: [10]
          },
          EVENT_TIMER_WH: {
            d: "M {mx},{my} l {e.x0},-{e.y0} m -{e.x0},{e.y0} l {e.x1},{e.y1} ",
            height: 36,
            width: 36,
            heightElements: [10, 2],
            widthElements: [3, 7]
          },
          EVENT_TIMER_LINE: {
            d: "M {mx},{my} m {e.x0},{e.y0} l -{e.x1},{e.y1} ",
            height: 36,
            width: 36,
            heightElements: [10, 3],
            widthElements: [0, 0]
          },
          EVENT_MULTIPLE: {
            d: "m {mx},{my} {e.x1},-{e.y0} {e.x1},{e.y0} -{e.x0},{e.y1} -{e.x2},0 z",
            height: 36,
            width: 36,
            heightElements: [6.28099, 12.56199],
            widthElements: [3.1405, 9.42149, 12.56198]
          },
          EVENT_PARALLEL_MULTIPLE: {
            d: "m {mx},{my} {e.x0},0 0,{e.y1} {e.x1},0 0,{e.y0} -{e.x1},0 0,{e.y1} -{e.x0},0 0,-{e.y1} -{e.x1},0 0,-{e.y0} {e.x1},0 z",
            height: 36,
            width: 36,
            heightElements: [2.56228, 7.68683],
            widthElements: [2.56228, 7.68683]
          },
          GATEWAY_EXCLUSIVE: {
            d: "m {mx},{my} {e.x0},{e.y0} {e.x1},{e.y0} {e.x2},0 {e.x4},{e.y2} {e.x4},{e.y1} {e.x2},0 {e.x1},{e.y3} {e.x0},{e.y3} {e.x3},0 {e.x5},{e.y1} {e.x5},{e.y2} {e.x3},0 z",
            height: 17.5,
            width: 17.5,
            heightElements: [8.5, 6.5312, -6.5312, -8.5],
            widthElements: [6.5, -6.5, 3, -3, 5, -5]
          },
          GATEWAY_PARALLEL: {
            d: "m {mx},{my} 0,{e.y1} -{e.x1},0 0,{e.y0} {e.x1},0 0,{e.y1} {e.x0},0 0,-{e.y1} {e.x1},0 0,-{e.y0} -{e.x1},0 0,-{e.y1} -{e.x0},0 z",
            height: 30,
            width: 30,
            heightElements: [5, 12.5],
            widthElements: [5, 12.5]
          },
          GATEWAY_EVENT_BASED: {
            d: "m {mx},{my} {e.x0},{e.y0} {e.x0},{e.y1} {e.x1},{e.y2} {e.x2},0 z",
            height: 11,
            width: 11,
            heightElements: [-6, 6, 12, -12],
            widthElements: [9, -3, -12]
          },
          GATEWAY_COMPLEX: {
            d: "m {mx},{my} 0,{e.y0} -{e.x0},-{e.y1} -{e.x1},{e.y2} {e.x0},{e.y1} -{e.x2},0 0,{e.y3} {e.x2},0  -{e.x0},{e.y1} l {e.x1},{e.y2} {e.x0},-{e.y1} 0,{e.y0} {e.x3},0 0,-{e.y0} {e.x0},{e.y1} {e.x1},-{e.y2} -{e.x0},-{e.y1} {e.x2},0 0,-{e.y3} -{e.x2},0 {e.x0},-{e.y1} -{e.x1},-{e.y2} -{e.x0},{e.y1} 0,-{e.y0} -{e.x3},0 z",
            height: 17.125,
            width: 17.125,
            heightElements: [4.875, 3.4375, 2.125, 3],
            widthElements: [3.4375, 2.125, 4.875, 3]
          },
          DATA_OBJECT_PATH: {
            d: "m 0,0 {e.x1},0 {e.x0},{e.y0} 0,{e.y1} -{e.x2},0 0,-{e.y2} {e.x1},0 0,{e.y0} {e.x0},0",
            height: 61,
            width: 51,
            heightElements: [10, 50, 60],
            widthElements: [10, 40, 50, 60]
          },
          DATA_OBJECT_COLLECTION_PATH: {
            d: "m {mx}, {my} m  0 15  l 0 -15 m  4 15  l 0 -15 m  4 15  l 0 -15 ",
            height: 61,
            width: 51,
            heightElements: [12],
            widthElements: [1, 6, 12, 15]
          },
          DATA_ARROW: {
            d: "m 5,9 9,0 0,-3 5,5 -5,5 0,-3 -9,0 z",
            height: 61,
            width: 51,
            heightElements: [],
            widthElements: []
          },
          DATA_STORE: {
            d: "m  {mx},{my} l  0,{e.y2} c  {e.x0},{e.y1} {e.x1},{e.y1}  {e.x2},0 l  0,-{e.y2} c -{e.x0},-{e.y1} -{e.x1},-{e.y1} -{e.x2},0c  {e.x0},{e.y1} {e.x1},{e.y1}  {e.x2},0 m  -{e.x2},{e.y0}c  {e.x0},{e.y1} {e.x1},{e.y1} {e.x2},0m  -{e.x2},{e.y0}c  {e.x0},{e.y1} {e.x1},{e.y1}  {e.x2},0",
            height: 61,
            width: 61,
            heightElements: [7, 10, 45],
            widthElements: [2, 58, 60]
          },
          TEXT_ANNOTATION: {
            d: "m {mx}, {my} m 10,0 l -10,0 l 0,{e.y0} l 10,0",
            height: 30,
            width: 10,
            heightElements: [30],
            widthElements: [10]
          },
          MARKER_SUB_PROCESS: {
            d: "m{mx},{my} m 7,2 l 0,10 m -5,-5 l 10,0",
            height: 10,
            width: 10,
            heightElements: [],
            widthElements: []
          },
          MARKER_PARALLEL: {
            d: "m{mx},{my} m 3,2 l 0,10 m 3,-10 l 0,10 m 3,-10 l 0,10",
            height: 10,
            width: 10,
            heightElements: [],
            widthElements: []
          },
          MARKER_SEQUENTIAL: {
            d: "m{mx},{my} m 0,3 l 10,0 m -10,3 l 10,0 m -10,3 l 10,0",
            height: 10,
            width: 10,
            heightElements: [],
            widthElements: []
          },
          MARKER_COMPENSATION: {
            d: "m {mx},{my} 8,-5 0,10 z m 9,0 8,-5 0,10 z",
            height: 10,
            width: 21,
            heightElements: [],
            widthElements: []
          },
          MARKER_LOOP: {
            d: "m {mx},{my} c 3.526979,0 6.386161,-2.829858 6.386161,-6.320661 0,-3.490806 -2.859182,-6.320661 -6.386161,-6.320661 -3.526978,0 -6.38616,2.829855 -6.38616,6.320661 0,1.745402 0.714797,3.325567 1.870463,4.469381 0.577834,0.571908 1.265885,1.034728 2.029916,1.35457 l -0.718163,-3.909793 m 0.718163,3.909793 -3.885211,0.802902",
            height: 13.9,
            width: 13.7,
            heightElements: [],
            widthElements: []
          },
          MARKER_ADHOC: {
            d: "m {mx},{my} m 0.84461,2.64411 c 1.05533,-1.23780996 2.64337,-2.07882 4.29653,-1.97997996 2.05163,0.0805 3.85579,1.15803 5.76082,1.79107 1.06385,0.34139996 2.24454,0.1438 3.18759,-0.43767 0.61743,-0.33642 1.2775,-0.64078 1.7542,-1.17511 0,0.56023 0,1.12046 0,1.6807 -0.98706,0.96237996 -2.29792,1.62393996 -3.6918,1.66181996 -1.24459,0.0927 -2.46671,-0.2491 -3.59505,-0.74812 -1.35789,-0.55965 -2.75133,-1.33436996 -4.27027,-1.18121996 -1.37741,0.14601 -2.41842,1.13685996 -3.44288,1.96782996 z",
            height: 4,
            width: 15,
            heightElements: [],
            widthElements: []
          },
          TASK_TYPE_SEND: {
            d: "m {mx},{my} l 0,{e.y1} l {e.x1},0 l 0,-{e.y1} z l {e.x0},{e.y0} l {e.x0},-{e.y0}",
            height: 14,
            width: 21,
            heightElements: [6, 14],
            widthElements: [10.5, 21]
          },
          TASK_TYPE_SCRIPT: {
            d: "m {mx},{my} c 9.966553,-6.27276 -8.000926,-7.91932 2.968968,-14.938 l -8.802728,0 c -10.969894,7.01868 6.997585,8.66524 -2.968967,14.938 z m -7,-12 l 5,0 m -4.5,3 l 4.5,0 m -3,3 l 5,0m -4,3 l 5,0",
            height: 15,
            width: 12.6,
            heightElements: [6, 14],
            widthElements: [10.5, 21]
          },
          TASK_TYPE_USER_1: {d: "m {mx},{my} c 0.909,-0.845 1.594,-2.049 1.594,-3.385 0,-2.554 -1.805,-4.62199999 -4.357,-4.62199999 -2.55199998,0 -4.28799998,2.06799999 -4.28799998,4.62199999 0,1.348 0.974,2.562 1.89599998,3.405 -0.52899998,0.187 -5.669,2.097 -5.794,4.7560005 v 6.718 h 17 v -6.718 c 0,-2.2980005 -5.5279996,-4.5950005 -6.0509996,-4.7760005 zm -8,6 l 0,5.5 m 11,0 l 0,-5"},
          TASK_TYPE_USER_2: {d: "m {mx},{my} m 2.162,1.009 c 0,2.4470005 -2.158,4.4310005 -4.821,4.4310005 -2.66499998,0 -4.822,-1.981 -4.822,-4.4310005 "},
          TASK_TYPE_USER_3: {d: "m {mx},{my} m -6.9,-3.80 c 0,0 2.25099998,-2.358 4.27399998,-1.177 2.024,1.181 4.221,1.537 4.124,0.965 -0.098,-0.57 -0.117,-3.79099999 -4.191,-4.13599999 -3.57499998,0.001 -4.20799998,3.36699999 -4.20699998,4.34799999 z"},
          TASK_TYPE_MANUAL: {d: "m {mx},{my} c 0.234,-0.01 5.604,0.008 8.029,0.004 0.808,0 1.271,-0.172 1.417,-0.752 0.227,-0.898 -0.334,-1.314 -1.338,-1.316 -2.467,-0.01 -7.886,-0.004 -8.108,-0.004 -0.014,-0.079 0.016,-0.533 0,-0.61 0.195,-0.042 8.507,0.006 9.616,0.002 0.877,-0.007 1.35,-0.438 1.353,-1.208 0.003,-0.768 -0.479,-1.09 -1.35,-1.091 -2.968,-0.002 -9.619,-0.013 -9.619,-0.013 v -0.591 c 0,0 5.052,-0.016 7.225,-0.016 0.888,-0.002 1.354,-0.416 1.351,-1.193 -0.006,-0.761 -0.492,-1.196 -1.361,-1.196 -3.473,-0.005 -10.86,-0.003 -11.0829995,-0.003 -0.022,-0.047 -0.045,-0.094 -0.069,-0.139 0.3939995,-0.319 2.0409995,-1.626 2.4149995,-2.017 0.469,-0.4870005 0.519,-1.1650005 0.162,-1.6040005 -0.414,-0.511 -0.973,-0.5 -1.48,-0.236 -1.4609995,0.764 -6.5999995,3.6430005 -7.7329995,4.2710005 -0.9,0.499 -1.516,1.253 -1.882,2.19 -0.37000002,0.95 -0.17,2.01 -0.166,2.979 0.004,0.718 -0.27300002,1.345 -0.055,2.063 0.629,2.087 2.425,3.312 4.859,3.318 4.6179995,0.014 9.2379995,-0.139 13.8569995,-0.158 0.755,-0.004 1.171,-0.301 1.182,-1.033 0.012,-0.754 -0.423,-0.969 -1.183,-0.973 -1.778,-0.01 -5.824,-0.004 -6.04,-0.004 10e-4,-0.084 0.003,-0.586 10e-4,-0.67 z"},
          TASK_TYPE_INSTANTIATING_SEND: {d: "m {mx},{my} l 0,8.4 l 12.6,0 l 0,-8.4 z l 6.3,3.6 l 6.3,-3.6"},
          TASK_TYPE_SERVICE: {d: "m {mx},{my} v -1.71335 c 0.352326,-0.0705 0.703932,-0.17838 1.047628,-0.32133 0.344416,-0.14465 0.665822,-0.32133 0.966377,-0.52145 l 1.19431,1.18005 1.567487,-1.57688 -1.195028,-1.18014 c 0.403376,-0.61394 0.683079,-1.29908 0.825447,-2.01824 l 1.622133,-0.01 v -2.2196 l -1.636514,0.01 c -0.07333,-0.35153 -0.178319,-0.70024 -0.323564,-1.04372 -0.145244,-0.34406 -0.321407,-0.6644 -0.522735,-0.96217 l 1.131035,-1.13631 -1.583305,-1.56293 -1.129598,1.13589 c -0.614052,-0.40108 -1.302883,-0.68093 -2.022633,-0.82247 l 0.0093,-1.61852 h -2.241173 l 0.0042,1.63124 c -0.353763,0.0736 -0.705369,0.17977 -1.049785,0.32371 -0.344415,0.14437 -0.665102,0.32092 -0.9635006,0.52046 l -1.1698628,-1.15823 -1.5667691,1.5792 1.1684265,1.15669 c -0.4026573,0.61283 -0.68308,1.29797 -0.8247287,2.01713 l -1.6588041,0.003 v 2.22174 l 1.6724648,-0.006 c 0.073327,0.35077 0.1797598,0.70243 0.3242851,1.04472 0.1452428,0.34448 0.3214064,0.6644 0.5227339,0.96066 l -1.1993431,1.19723 1.5840256,1.56011 1.1964668,-1.19348 c 0.6140517,0.40346 1.3028827,0.68232 2.0233517,0.82331 l 7.19e-4,1.69892 h 2.226848 z m 0.221462,-3.9957 c -1.788948,0.7502 -3.8576,-0.0928 -4.6097055,-1.87438 -0.7521065,-1.78321 0.090598,-3.84627 1.8802645,-4.59604 1.78823,-0.74936 3.856881,0.0929 4.608987,1.87437 0.752106,1.78165 -0.0906,3.84612 -1.879546,4.59605 z"},
          TASK_TYPE_SERVICE_FILL: {d: "m {mx},{my} c -1.788948,0.7502 -3.8576,-0.0928 -4.6097055,-1.87438 -0.7521065,-1.78321 0.090598,-3.84627 1.8802645,-4.59604 1.78823,-0.74936 3.856881,0.0929 4.608987,1.87437 0.752106,1.78165 -0.0906,3.84612 -1.879546,4.59605 z"},
          TASK_TYPE_BUSINESS_RULE_HEADER: {d: "m {mx},{my} 0,4 20,0 0,-4 z"},
          TASK_TYPE_BUSINESS_RULE_MAIN: {d: "m {mx},{my} 0,12 20,0 0,-12 zm 0,8 l 20,0 m -13,-4 l 0,8"},
          MESSAGE_FLOW_MARKER: {d: "m {mx},{my} m -10.5 ,-7 l 0,14 l 21,0 l 0,-14 z l 10.5,6 l 10.5,-6"}
        }, this.getRawPath = function (e) {
          return this.pathMap[e].d
        }, this.getScaledPath = function (e, t) {
          var n, i, a = this.pathMap[e];
          t.abspos ? (n = t.abspos.x, i = t.abspos.y) : (n = t.containerWidth * t.position.mx, i = t.containerHeight * t.position.my);
          var o = {};
          if (t.position) {
            for (var s = t.containerHeight / a.height * t.yScaleFactor, u = t.containerWidth / a.width * t.xScaleFactor, l = 0; l < a.heightElements.length; l++)o["y" + l] = a.heightElements[l] * s;
            for (var c = 0; c < a.widthElements.length; c++)o["x" + c] = a.widthElements[c] * u
          }
          var p = r.format(a.d, {mx: n, my: i, e: o});
          return p
        }
      }

      var r = e(71);
      t.exports = n
    }, {71: 71}],
    6: [function (e, t) {
      t.exports = {renderer: ["type", e(4)], pathMap: ["type", e(5)]}
    }, {4: 4, 5: 5}],
    7: [function (e, t) {
      function n(e, t) {
        return a({id: e.id, type: e.$type, businessObject: e}, t)
      }

      function r(e) {
        return o(e, function (e) {
          return {x: e.x, y: e.y}
        })
      }

      function i(e, t, n, r) {
        this._eventBus = e, this._canvas = t, this._elementFactory = n, this._elementRegistry = r
      }

      var a = e(159), o = e(83), s = e(13), u = s.hasExternalLabel, l = s.getExternalLabelBounds, c = e(12).isExpanded, p = e(10).elementToString;
      i.$inject = ["eventBus", "canvas", "elementFactory", "elementRegistry"], t.exports = i, i.prototype.add = function (e, t) {
        var i, a = e.di;
        if (a.$instanceOf("bpmndi:BPMNPlane"))i = this._elementFactory.createRoot(n(e)), this._canvas.setRootElement(i); else if (a.$instanceOf("bpmndi:BPMNShape")) {
          var o = !c(e), s = t && (t.hidden || t.collapsed), l = e.di.bounds;
          i = this._elementFactory.createShape(n(e, {
            collapsed: o,
            hidden: s,
            x: Math.round(l.x),
            y: Math.round(l.y),
            width: Math.round(l.width),
            height: Math.round(l.height)
          })), this._canvas.addShape(i, t)
        } else {
          if (!a.$instanceOf("bpmndi:BPMNEdge"))throw new Error("unknown di " + p(a) + " for element " + p(e));
          var f = this._getSource(e), d = this._getTarget(e);
          i = this._elementFactory.createConnection(n(e, {
            source: f,
            target: d,
            waypoints: r(e.di.waypoint)
          })), this._canvas.addConnection(i, t)
        }
        return u(e) && this.addLabel(e, i), this._eventBus.fire("bpmnElement.added", {element: i}), i
      }, i.prototype.addLabel = function (e, t) {
        var r = l(e, t), i = this._elementFactory.createLabel(n(e, {
          id: e.id + "_label",
          labelTarget: t,
          type: "label",
          hidden: t.hidden,
          x: Math.round(r.x),
          y: Math.round(r.y),
          width: Math.round(r.width),
          height: Math.round(r.height)
        }));
        return this._canvas.addShape(i, t.parent)
      }, i.prototype._getEnd = function (e, t) {
        var n, r, i = e.$type;
        if (r = e[t + "Ref"], "source" === t && "bpmn:DataInputAssociation" === i && (r = r && r[0]), ("source" === t && "bpmn:DataOutputAssociation" === i || "target" === t && "bpmn:DataInputAssociation" === i) && (r = e.$parent), n = r && this._getElement(r))return n;
        throw new Error(r ? "element " + p(r) + " referenced by " + p(e) + "#" + t + "Ref not yet drawn" : p(e) + "#" + t + "Ref not specified")
      }, i.prototype._getSource = function (e) {
        return this._getEnd(e, "source")
      }, i.prototype._getTarget = function (e) {
        return this._getEnd(e, "target")
      }, i.prototype._getElement = function (e) {
        return this._elementRegistry.get(e.id)
      }
    }, {10: 10, 12: 12, 13: 13, 159: 159, 83: 83}],
    8: [function (e, t) {
      function n(e, t) {
        return e.$instanceOf(t)
      }

      function r(e) {
        return o(e.rootElements, function (e) {
          return n(e, "bpmn:Process") || n(e, "bpmn:Collaboration")
        })
      }

      function i(e) {
        function t(e, t) {
          return function (n) {
            e(n, t)
          }
        }

        function i(t, n) {
          var r = t.gfx;
          if (r)throw new Error("already rendered " + l(t));
          return e.element(t, n)
        }

        function o(t, n) {
          return e.root(t, n)
        }

        function u(e, t) {
          try {
            return e.di && i(e, t)
          } catch (n) {
            p(n.message, {element: e, error: n}), console.error("failed to import " + l(e)), console.error(n)
          }
        }

        function p(t, n) {
          e.error(t, n)
        }

        function f(e) {
          var t = e.bpmnElement;
          t ? t.di ? p("multiple DI elements defined for " + l(t), {element: t}) : (c.bind(t, "di"), t.di = e) : p("no bpmnElement referenced in " + l(e), {element: e})
        }

        function d(e) {
          h(e.plane)
        }

        function h(e) {
          f(e), s(e.planeElement, m)
        }

        function m(e) {
          f(e)
        }

        function g(e, t) {
          var i = e.diagrams;
          if (t && -1 === i.indexOf(t))throw new Error("diagram not part of bpmn:Definitions");
          if (!t && i && i.length && (t = i[0]), t) {
            d(t);
            var a = t.plane;
            if (!a)throw new Error("no plane for " + l(t));
            var s = a.bpmnElement;
            if (!s) {
              if (s = r(e), !s)return p("no process or collaboration present to display");
              p("correcting missing bpmnElement on " + l(a) + " to " + l(s)), a.bpmnElement = s, f(a)
            }
            var u = o(s, a);
            if (n(s, "bpmn:Process"))y(s, u); else {
              if (!n(s, "bpmn:Collaboration"))throw new Error("unsupported bpmnElement for " + l(a) + " : " + l(s));
              B(s, u), b(e.rootElements, u)
            }
            v(V)
          }
        }

        function v(e) {
          s(e, function (e) {
            e()
          })
        }

        function y(e, t) {
          I(e, t), k(e.ioSpecification, t), C(e.artifacts, t), q.push(e)
        }

        function b(e) {
          var r = a(e, function (e) {
            return n(e, "bpmn:Process") && e.laneSets && -1 === q.indexOf(e)
          });
          r.forEach(t(y))
        }

        function x(e, t) {
          u(e, t)
        }

        function w(e, n) {
          s(e, t(x, n))
        }

        function $(e, t) {
          u(e, t)
        }

        function E(e, t) {
          u(e, t)
        }

        function S(e, t) {
          u(e, t)
        }

        function T(e, t) {
          u(e, t)
        }

        function C(e, t) {
          s(e, function (e) {
            n(e, "bpmn:Association") ? V.push(function () {
              T(e, t)
            }) : T(e, t)
          })
        }

        function k(e, n) {
          e && (s(e.dataInputs, t(E, n)), s(e.dataOutputs, t(S, n)))
        }

        function A(e, t) {
          I(e, t), C(e.artifacts, t)
        }

        function _(e, t) {
          var r = u(e, t);
          n(e, "bpmn:SubProcess") && A(e, r || t)
        }

        function D(e, t) {
          u(e, t)
        }

        function M(e, t) {
          u(e, t)
        }

        function O(e, t) {
          u(e, t)
        }

        function N(e, t) {
          var n = u(e, t);
          if (e.childLaneSet)P(e.childLaneSet, n || t); else {
            var r = a(e.flowNodeRef, function (e) {
              return "bpmn:BoundaryEvent" !== e.$type
            });
            j(r, n || t)
          }
        }

        function P(e, n) {
          s(e.lanes, t(N, n))
        }

        function R(e, n) {
          s(e, t(P, n))
        }

        function I(e, t) {
          e.laneSets ? (R(e.laneSets, t), L(e.flowElements)) : j(e.flowElements, t)
        }

        function L(e, t) {
          s(e, function (e) {
            n(e, "bpmn:SequenceFlow") ? V.push(function () {
              D(e, t)
            }) : n(e, "bpmn:BoundaryEvent") ? V.unshift(function () {
              O(e, t)
            }) : n(e, "bpmn:DataObject") || (n(e, "bpmn:DataStoreReference") ? M(e, t) : n(e, "bpmn:DataObjectReference") && M(e, t))
          })
        }

        function j(e, r) {
          s(e, function (e) {
            n(e, "bpmn:SequenceFlow") ? V.push(function () {
              D(e, r)
            }) : n(e, "bpmn:BoundaryEvent") ? V.unshift(function () {
              O(e, r)
            }) : n(e, "bpmn:FlowNode") ? (_(e, r), n(e, "bpmn:Activity") && (k(e.ioSpecification, r), V.push(function () {
              s(e.dataInputAssociations, t($, r)), s(e.dataOutputAssociations, t($, r))
            }))) : n(e, "bpmn:DataObject") || (n(e, "bpmn:DataStoreReference") ? M(e, r) : n(e, "bpmn:DataObjectReference") ? M(e, r) : p("unrecognized flowElement " + l(e) + " in context " + (r ? l(r.businessObject) : null), {
              element: e,
              context: r
            }))
          })
        }

        function F(e, t) {
          var n = u(e, t), r = e.processRef;
          r && y(r, n || t)
        }

        function B(e) {
          s(e.participants, t(F)), C(e.artifacts), V.push(function () {
            w(e.messageFlows)
          })
        }

        var q = [], V = [];
        return {handleDefinitions: g}
      }

      var a = e(78), o = e(79), s = e(80), u = e(185), l = e(10).elementToString, c = new u({
        name: "bpmnElement",
        enumerable: !0
      }, {name: "di"});
      t.exports = i
    }, {10: 10, 185: 185, 78: 78, 79: 79, 80: 80}],
    9: [function (e, t) {
      function n(e, t, n) {
        function i(e) {
          var t = {
            root: function (e) {
              return o.add(e)
            }, element: function (e, t) {
              return o.add(e, t)
            }, error: function (e, t) {
              u.push({message: e, context: t})
            }
          }, n = new r(t);
          n.handleDefinitions(e)
        }

        var a, o = e.get("bpmnImporter"), s = e.get("eventBus"), u = [];
        s.fire("import.start");
        try {
          i(t)
        } catch (l) {
          a = l
        }
        s.fire(a ? "import.error" : "import.success", {error: a, warnings: u}), n(a, u)
      }

      var r = e(8);
      t.exports.importBpmnDiagram = n
    }, {8: 8}],
    10: [function (e, t) {
      t.exports.elementToString = function (e) {
        return e ? "<" + e.$type + (e.id ? ' id="' + e.id : "") + '" />' : "<null>"
      }
    }, {}],
    11: [function (e, t) {
      t.exports = {bpmnImporter: ["type", e(7)]}
    }, {7: 7}],
    12: [function (e, t) {
      t.exports.isExpandedPool = function (e) {
        return !!e.processRef
      }, t.exports.isExpanded = function (e) {
        var t = !(e.$instanceOf("bpmn:SubProcess") || e.$instanceOf("bpmn:CallActivity")), n = t || e.di.isExpanded;
        return n
      }
    }, {}],
    13: [function (e, t) {
      var n = e(159), r = t.exports.DEFAULT_LABEL_SIZE = {width: 90, height: 20};
      t.exports.hasExternalLabel = function (e) {
        return e.$instanceOf("bpmn:Event") || e.$instanceOf("bpmn:Gateway") || e.$instanceOf("bpmn:DataStoreReference") || e.$instanceOf("bpmn:DataObjectReference") || e.$instanceOf("bpmn:SequenceFlow") || e.$instanceOf("bpmn:MessageFlow")
      };
      var i = t.exports.getWaypointsMid = function (e) {
        var t = e.length / 2 - 1, n = e[Math.floor(t)], r = e[Math.ceil(t + .01)];
        return {x: n.x + (r.x - n.x) / 2, y: n.y + (r.y - n.y) / 2}
      }, a = t.exports.getExternalLabelMid = function (e) {
        return e.waypoints ? i(e.waypoints) : {x: e.x + e.width / 2, y: e.y + e.height + r.height / 2}
      };
      t.exports.getExternalLabelBounds = function (e, t) {
        var i, o, s, u = e.di, l = u.label;
        return l && l.bounds ? (s = l.bounds, o = {
          width: Math.max(r.width, s.width),
          height: s.height
        }, i = {x: s.x + s.width / 2, y: s.y + s.height / 2}) : (i = a(t), o = r), n({
          x: i.x - o.width / 2,
          y: i.y - o.height / 2
        }, o)
      }
    }, {159: 159}],
    14: [function (e, t) {
      t.exports = e(16)
    }, {16: 16}],
    15: [function (e, t) {
      function n(e, t) {
        o.call(this, e, t)
      }

      var r = e(156), i = e(151), a = e(159), o = e(22), s = e(18), u = e(19);
      n.prototype = Object.create(o.prototype), t.exports = n, n.prototype.fromXML = function (e, t, n, o) {
        r(t) || (o = n, n = t, t = "bpmn:Definitions"), i(n) && (o = n, n = {});
        var u = new s(a({model: this, lax: !0}, n)), l = u.handler(t);
        u.fromXML(e, l, o)
      }, n.prototype.toXML = function (e, t, n) {
        i(t) && (n = t, t = {});
        var r = new u(t);
        try {
          var a = r.toXML(e);
          n(null, a)
        } catch (o) {
          n(o)
        }
      }
    }, {151: 151, 156: 156, 159: 159, 18: 18, 19: 19, 22: 22}],
    16: [function (e, t) {
      var n = e(159), r = e(15), i = {bpmn: e(31), bpmndi: e(32), dc: e(33), di: e(34)};
      t.exports = function (e, t) {
        return new r(n({}, i, e), t)
      }
    }, {15: 15, 159: 159, 31: 31, 32: 32, 33: 33, 34: 34}],
    17: [function (e, t) {
      function n(e) {
        return e.charAt(0).toUpperCase() + e.slice(1)
      }

      function r(e) {
        return e.charAt(0).toLowerCase() + e.slice(1)
      }

      function i(e) {
        return e.xml && "lowerCase" === e.xml.tagAlias
      }

      t.exports.aliasToName = function (e, t) {
        return i(t) ? n(e) : e
      }, t.exports.nameToAlias = function (e, t) {
        return i(t) ? r(e) : e
      }, t.exports.DEFAULT_NS_MAP = {xsi: "http://www.w3.org/2001/XMLSchema-instance"}, t.exports.XSI_TYPE = "xsi:type"
    }, {}],
    18: [function (e, t) {
      function n(e) {
        var t = e.attributes;
        return m(t, function (e, t) {
          var n, r;
          return t.local ? (r = E(t.name, t.prefix), n = r.name) : n = t.prefix, e[n] = t.value, e
        }, {})
      }

      function r(e, t, n) {
        var r, i = E(t.value), a = e.ns[i.prefix || ""], o = i.localName, s = a && n.getPackage(a);
        s && (r = s.xml && s.xml.typePrefix, r && 0 === o.indexOf(r) && (o = o.slice(r.length)), t.value = s.prefix + ":" + o)
      }

      function i(e, t, n) {
        var a, o;
        if (a = e.uri || n) {
          var s = t.getPackage(a);
          o = s ? s.prefix : e.prefix, e.prefix = o, e.uri = a
        }
        g(e.attributes, function (n) {
          n.uri === _ && "type" === n.local && r(e, n, t), i(n, t, null)
        })
      }

      function a(e) {
        y(this, e);
        var t = this.elementsById = {}, n = this.references = [], r = this.warnings = [];
        this.addReference = function (e) {
          n.push(e)
        }, this.addElement = function (e, n) {
          if (!e || !n)throw new Error("[xml-reader] id or ctx must not be null");
          t[e] = n
        }, this.addWarning = function (e) {
          r.push(e)
        }
      }

      function o() {
      }

      function s() {
      }

      function u() {
      }

      function l(e, t) {
        this.property = e, this.context = t
      }

      function c(e, t) {
        this.element = t, this.propertyDesc = e
      }

      function p() {
      }

      function f(e, t, n) {
        this.model = e, this.type = e.getType(t), this.context = n
      }

      function d(e, t, n) {
        this.model = e, this.context = n
      }

      function h(e) {
        e instanceof $ && (e = {model: e}), y(this, {lax: !1}, e)
      }

      var m = e(84), g = e(80), v = e(79), y = e(159), b = e(88), x = e(21), w = e(20).parser, $ = e(22), E = e(27).parseName, S = e(30), T = S.coerceType, C = S.isSimple, k = e(17), A = k.XSI_TYPE, _ = k.DEFAULT_NS_MAP.xsi, D = k.aliasToName;
      o.prototype.handleEnd = function () {
      }, o.prototype.handleText = function () {
      }, o.prototype.handleNode = function () {
      }, s.prototype = new o, s.prototype.handleNode = function () {
        return this
      }, u.prototype = new o, u.prototype.handleText = function (e) {
        this.body = (this.body || "") + e
      }, l.prototype = new u, l.prototype.handleNode = function (e) {
        if (this.element)throw new Error("expected no sub nodes");
        return this.element = this.createReference(e), this
      }, l.prototype.handleEnd = function () {
        this.element.id = this.body
      }, l.prototype.createReference = function () {
        return {property: this.property.ns.name, id: ""}
      }, c.prototype = new u, c.prototype.handleEnd = function () {
        var e = this.body, t = this.element, n = this.propertyDesc;
        e = T(n.type, e), n.isMany ? t.get(n.name).push(e) : t.set(n.name, e)
      }, p.prototype = Object.create(u.prototype), p.prototype.handleNode = function (e) {
        var t, n = this, r = this.element;
        return r ? n = this.handleChild(e) : (r = this.element = this.createElement(e), t = r.id, t && this.context.addElement(t, r)), n
      }, f.prototype = new p, f.prototype.addReference = function (e) {
        this.context.addReference(e)
      }, f.prototype.handleEnd = function () {
        var e = this.body, t = this.element, n = t.$descriptor, r = n.bodyProperty;
        r && void 0 !== e && (e = T(r.type, e), t.set(r.name, e))
      }, f.prototype.createElement = function (e) {
        var t = n(e), r = this.type, i = r.$descriptor, a = this.context, o = new r({});
        return g(t, function (e, t) {
          var n = i.propertiesByName[t];
          n && n.isReference ? a.addReference({
            element: o,
            property: n.ns.name,
            id: e
          }) : (n && (e = T(n.type, e)), o.set(t, e))
        }), o
      }, f.prototype.getPropertyForNode = function (e) {
        var t, n, r, i = E(e.local, e.prefix), a = this.type, o = this.model, s = a.$descriptor, u = i.name, l = s.propertiesByName[u];
        if (l)return l.serialize === A && (r = e.attributes[A]) ? (t = r.value, n = o.getType(t), y({}, l, {effectiveType: n.$descriptor.name})) : l;
        var c = o.getPackage(i.prefix);
        if (c) {
          if (t = i.prefix + ":" + D(i.localName, s.$pkg), n = o.getType(t), l = v(s.properties, function (e) {
              return !e.isVirtual && !e.isReference && !e.isAttribute && n.hasType(e.type)
            }))return y({}, l, {effectiveType: n.$descriptor.name})
        } else if (l = v(s.properties, function (e) {
            return !e.isReference && !e.isAttribute && "Element" === e.type
          }))return l;
        throw new Error("unrecognized element <" + i.name + ">")
      }, f.prototype.toString = function () {
        return "ElementDescriptor[" + this.type.$descriptor.name + "]"
      }, f.prototype.valueHandler = function (e, t) {
        return new c(e, t)
      }, f.prototype.referenceHandler = function (e) {
        return new l(e, this.context)
      }, f.prototype.handler = function (e) {
        return "Element" === e ? new d(this.model, e, this.context) : new f(this.model, e, this.context)
      }, f.prototype.handleChild = function (e) {
        var t, n, r, i;
        if (t = this.getPropertyForNode(e), r = this.element, n = t.effectiveType || t.type, C(n))return this.valueHandler(t, r);
        i = t.isReference ? this.referenceHandler(t).handleNode(e) : this.handler(n).handleNode(e);
        var a = i.element;
        return void 0 !== a && (t.isMany ? r.get(t.name).push(a) : r.set(t.name, a), t.isReference ? (y(a, {element: r}), this.context.addReference(a)) : a.$parent = r), i
      }, d.prototype = Object.create(p.prototype), d.prototype.createElement = function (e) {
        var t = e.name, n = e.prefix, r = e.ns[n], i = e.attributes;
        return this.model.createAny(t, r, i)
      }, d.prototype.handleChild = function (e) {
        var t, n = new d(this.model, "Element", this.context).handleNode(e), r = this.element, i = n.element;
        return void 0 !== i && (t = r.$children = r.$children || [], t.push(i), i.$parent = r), n
      }, d.prototype.handleText = function (e) {
        this.body = this.body || "" + e
      }, d.prototype.handleEnd = function () {
        this.body && (this.element.$body = this.body)
      }, h.prototype.fromXML = function (e, t, n) {
        function r() {
          var e, t, n = f.elementsById, r = f.references;
          for (e = 0; t = r[e]; e++) {
            var i = t.element, a = n[t.id], o = i.$descriptor.propertiesByName[t.property];
            if (a || f.addWarning({
                message: "unresolved reference <" + t.id + ">",
                element: t.element,
                property: t.property,
                value: t.id
              }), o.isMany) {
              var s = i.get(o.name), u = s.indexOf(t);
              a ? s[u] = a : s.splice(u, 1)
            } else i.set(o.name, a)
          }
        }

        function o() {
          h.pop().handleEnd()
        }

        function u(e) {
          var t = h.peek();
          i(e, c);
          try {
            h.push(t.handleNode(e))
          } catch (n) {
            var r = this.line, a = this.column, o = "unparsable content <" + e.name + "> detected\n	line: " + r + "\n	column: " + a + "\n	nested error: " + n.message;
            if (!p)throw console.error("could not parse document"), console.error(n), new Error(o);
            f.addWarning({message: o, error: n}), console.warn("could not parse node"), console.warn(n), h.push(new s)
          }
        }

        function l(e) {
          h.peek().handleText(e)
        }

        var c = this.model, p = this.lax, f = new a({parseRoot: t}), d = new w(!0, {xmlns: !0, trim: !0}), h = new x;
        t.context = f, h.push(t), d.onopentag = u, d.oncdata = d.ontext = l, d.onclosetag = o, d.onend = r, b(function () {
          var r;
          try {
            d.write(e).close()
          } catch (i) {
            r = i
          }
          n(r, r ? void 0 : t.element, f)
        })
      }, h.prototype.handler = function (e) {
        return new f(this.model, e)
      }, t.exports = h, t.exports.ElementHandler = f
    }, {159: 159, 17: 17, 20: 20, 21: 21, 22: 22, 27: 27, 30: 30, 79: 79, 80: 80, 84: 84, 88: 88}],
    19: [function (e, t) {
      function n(e) {
        return b(e) ? e : (e.prefix ? e.prefix + ":" : "") + e.localName
      }

      function r(e, t) {
        return t.isGeneric ? t.name : w({localName: T(t.ns.localName, t.$pkg)}, e)
      }

      function i(e, t) {
        return w({localName: t.ns.localName}, e)
      }

      function a(e) {
        var t = e.$descriptor;
        return x(t.properties, function (t) {
          var n = t.name;
          if (!e.hasOwnProperty(n))return !1;
          var r = e[n];
          return r === t["default"] ? !1 : t.isMany ? r.length : !0
        })
      }

      function o(e) {
        return e = b(e) ? e : "" + e, e.replace(k, function (e) {
          return "&#" + D[e] + ";"
        })
      }

      function s(e) {
        return x(e, function (e) {
          return e.isAttr
        })
      }

      function u(e) {
        return x(e, function (e) {
          return !e.isAttr
        })
      }

      function l(e, t) {
        this.ns = t
      }

      function c() {
      }

      function p(e) {
        this.ns = e
      }

      function f(e, t) {
        this.body = [], this.attrs = [], this.parent = e, this.ns = t
      }

      function d(e, t) {
        f.call(this, e, t)
      }

      function h() {
        this.value = "", this.write = function (e) {
          this.value += e
        }
      }

      function m(e, t) {
        var n = [""];
        this.append = function (t) {
          return e.write(t), this
        }, this.appendNewLine = function () {
          return t && e.write("\n"), this
        }, this.appendIndent = function () {
          return t && e.write(n.join("  ")), this
        }, this.indent = function () {
          return n.push(""), this
        }, this.unindent = function () {
          return n.pop(), this
        }
      }

      function g(e) {
        function t(t, n) {
          var r = n || new h, i = new m(r, e.format);
          return e.preamble && i.append(C), (new f).build(t).serializeTo(i), n ? void 0 : r.value
        }

        return e = w({format: !1, preamble: !0}, e || {}), {toXML: t}
      }

      var v = e(83), y = e(80), b = e(156), x = e(78), w = e(159), $ = e(30), E = e(27).parseName, S = e(17), T = S.nameToAlias, C = '<?xml version="1.0" encoding="UTF-8"?>\n', k = /(<|>|'|"|&|\n\r|\n)/g, A = S.DEFAULT_NS_MAP, _ = S.XSI_TYPE, D = {
        "\n": "10",
        "\n\r": "10",
        '"': "34",
        "'": "39",
        "<": "60",
        ">": "62",
        "&": "38"
      };
      l.prototype.build = function (e) {
        return this.element = e, this
      }, l.prototype.serializeTo = function (e) {
        e.appendIndent().append("<" + n(this.ns) + ">" + this.element.id + "</" + n(this.ns) + ">").appendNewLine()
      }, c.prototype.serializeValue = c.prototype.serializeTo = function (e) {
        var t = this.escape;
        t && e.append("<![CDATA["), e.append(this.value), t && e.append("]]>")
      }, c.prototype.build = function (e, t) {
        return this.value = t, "String" === e.type && k.test(t) && (this.escape = !0), this
      }, p.prototype = new c, p.prototype.serializeTo = function (e) {
        e.appendIndent().append("<" + n(this.ns) + ">"), this.serializeValue(e), e.append("</" + n(this.ns) + ">").appendNewLine()
      }, f.prototype.build = function (e) {
        this.element = e;
        var t = this.parseNsAttributes(e);
        if (this.ns || (this.ns = this.nsTagName(e.$descriptor)), e.$descriptor.isGeneric)this.parseGeneric(e); else {
          var n = a(e);
          this.parseAttributes(s(n)), this.parseContainments(u(n)), this.parseGenericAttributes(e, t)
        }
        return this
      }, f.prototype.nsTagName = function (e) {
        var t = this.logNamespaceUsed(e.ns);
        return r(t, e)
      }, f.prototype.nsPropertyTagName = function (e) {
        var t = this.logNamespaceUsed(e.ns);
        return i(t, e)
      }, f.prototype.isLocalNs = function (e) {
        return e.uri === this.ns.uri
      }, f.prototype.nsAttributeName = function (e) {
        var t;
        b(e) ? t = E(e) : e.ns && (t = e.ns);
        var n = this.logNamespaceUsed(t);
        return this.isLocalNs(n) ? {localName: t.localName} : w({localName: t.localName}, n)
      }, f.prototype.parseGeneric = function (e) {
        var t = this, n = this.body, r = this.attrs;
        y(e, function (e, i) {
          "$body" === i ? n.push((new c).build({type: "String"}, e)) : "$children" === i ? y(e, function (e) {
            n.push(new f(t).build(e))
          }) : 0 !== i.indexOf("$") && r.push({name: i, value: o(e)})
        })
      }, f.prototype.parseNsAttributes = function (e) {
        var t = this, n = e.$attrs, r = [];
        return y(n, function (e, n) {
          var i = E(n);
          "xmlns" === i.prefix ? t.logNamespace({
            prefix: i.localName,
            uri: e
          }) : i.prefix || "xmlns" !== i.localName ? r.push({name: n, value: e}) : t.logNamespace({uri: e})
        }), r
      }, f.prototype.parseGenericAttributes = function (e, t) {
        var n = this;
        y(t, function (t) {
          if (t.name !== _)try {
            n.addAttribute(n.nsAttributeName(t.name), t.value)
          } catch (r) {
            console.warn("[writer] missing namespace information for ", t.name, "=", t.value, "on", e, r)
          }
        })
      }, f.prototype.parseContainments = function (e) {
        var t = this, n = this.body, r = this.element;
        y(e, function (e) {
          var i = r.get(e.name), a = e.isReference, o = e.isMany, s = t.nsPropertyTagName(e);
          if (o || (i = [i]), e.isBody)n.push((new c).build(e, i[0])); else if ($.isSimple(e.type))y(i, function (t) {
            n.push(new p(s).build(e, t))
          }); else if (a)y(i, function (e) {
            n.push(new l(t, s).build(e))
          }); else {
            var u = e.serialize === _;
            y(i, function (e) {
              var r;
              r = u ? new d(t, s) : new f(t), n.push(r.build(e))
            })
          }
        })
      }, f.prototype.getNamespaces = function () {
        return this.parent ? this.namespaces = this.parent.getNamespaces() : this.namespaces || (this.namespaces = {
          prefixMap: {},
          uriMap: {},
          used: {}
        }), this.namespaces
      }, f.prototype.logNamespace = function (e) {
        var t = this.getNamespaces(), n = t.uriMap[e.uri];
        return n || (t.uriMap[e.uri] = e), t.prefixMap[e.prefix] = e.uri, e
      }, f.prototype.logNamespaceUsed = function (e) {
        var t = this.element, n = t.$model, r = this.getNamespaces(), i = e.prefix, a = e.uri || A[i] || r.prefixMap[i] || (n ? (n.getPackage(i) || {}).uri : null);
        if (!a)throw new Error("no namespace uri given for prefix <" + e.prefix + ">");
        return e = r.uriMap[a], e || (e = this.logNamespace({
          prefix: i,
          uri: a
        })), r.used[e.uri] || (r.used[e.uri] = e), e
      }, f.prototype.parseAttributes = function (e) {
        var t = this, n = this.element;
        y(e, function (e) {
          t.logNamespaceUsed(e.ns);
          var r = n.get(e.name);
          e.isReference && (r = r.id), t.addAttribute(t.nsAttributeName(e), r)
        })
      }, f.prototype.addAttribute = function (e, t) {
        var n = this.attrs;
        b(t) && (t = o(t)), n.push({name: e, value: t})
      }, f.prototype.serializeAttributes = function (e) {
        function t() {
          return v(a.used, function (e) {
            var t = "xmlns" + (e.prefix ? ":" + e.prefix : "");
            return {name: t, value: e.uri}
          })
        }

        var r = this.attrs, i = !this.parent, a = this.namespaces;
        i && (r = t().concat(r)), y(r, function (t) {
          e.append(" ").append(n(t.name)).append('="').append(t.value).append('"')
        })
      }, f.prototype.serializeTo = function (e) {
        var t = this.body.length, r = !(1 === this.body.length && this.body[0]instanceof c);
        e.appendIndent().append("<" + n(this.ns)), this.serializeAttributes(e), e.append(t ? ">" : " />"), t && (r && e.appendNewLine().indent(), y(this.body, function (t) {
          t.serializeTo(e)
        }), r && e.unindent().appendIndent(), e.append("</" + n(this.ns) + ">")), e.appendNewLine()
      }, d.prototype = new f, d.prototype.build = function (e) {
        var t = e.$descriptor;
        this.element = e, this.typeNs = this.nsTagName(t);
        var n = this.typeNs, r = e.$model.getPackage(n.uri), i = r.xml && r.xml.typePrefix || "";
        return this.addAttribute(this.nsAttributeName(_), (n.prefix ? n.prefix + ":" : "") + i + t.ns.localName), f.prototype.build.call(this, e)
      }, d.prototype.isLocalNs = function (e) {
        return e.uri === this.typeNs.uri
      }, t.exports = g
    }, {156: 156, 159: 159, 17: 17, 27: 27, 30: 30, 78: 78, 80: 80, 83: 83}],
    20: [function (e, t, n) {
      (function (t) {
        !function (n) {
          function r(e, t) {
            if (!(this instanceof r))return new r(e, t);
            var i = this;
            a(i), i.q = i.c = "", i.bufferCheckPosition = n.MAX_BUFFER_LENGTH, i.opt = t || {}, i.opt.lowercase = i.opt.lowercase || i.opt.lowercasetags, i.looseCase = i.opt.lowercase ? "toLowerCase" : "toUpperCase", i.tags = [], i.closed = i.closedRoot = i.sawRoot = !1, i.tag = i.error = null, i.strict = !!e, i.noscript = !(!e && !i.opt.noscript), i.state = H.BEGIN, i.ENTITIES = Object.create(n.ENTITIES), i.attribList = [], i.opt.xmlns && (i.ns = Object.create(q)), i.trackPosition = i.opt.position !== !1, i.trackPosition && (i.position = i.line = i.column = 0), d(i, "onready")
          }

          function i(e) {
            for (var t = Math.max(n.MAX_BUFFER_LENGTH, 10), r = 0, i = 0, a = k.length; a > i; i++) {
              var o = e[k[i]].length;
              if (o > t)switch (k[i]) {
                case"textNode":
                  m(e);
                  break;
                case"cdata":
                  h(e, "oncdata", e.cdata), e.cdata = "";
                  break;
                case"script":
                  h(e, "onscript", e.script), e.script = "";
                  break;
                default:
                  v(e, "Max buffer length exceeded: " + k[i])
              }
              r = Math.max(r, o)
            }
            e.bufferCheckPosition = n.MAX_BUFFER_LENGTH - r + e.position
          }

          function a(e) {
            for (var t = 0, n = k.length; n > t; t++)e[k[t]] = ""
          }

          function o(e) {
            m(e), "" !== e.cdata && (h(e, "oncdata", e.cdata), e.cdata = ""), "" !== e.script && (h(e, "onscript", e.script), e.script = "")
          }

          function s(e, t) {
            return new u(e, t)
          }

          function u(e, t) {
            if (!(this instanceof u))return new u(e, t);
            A.apply(this), this._parser = new r(e, t), this.writable = !0, this.readable = !0;
            var n = this;
            this._parser.onend = function () {
              n.emit("end")
            }, this._parser.onerror = function (e) {
              n.emit("error", e), n._parser.error = null
            }, this._decoder = null, D.forEach(function (e) {
              Object.defineProperty(n, "on" + e, {
                get: function () {
                  return n._parser["on" + e]
                }, set: function (t) {
                  return t ? void n.on(e, t) : (n.removeAllListeners(e), n._parser["on" + e] = t)
                }, enumerable: !0, configurable: !1
              })
            })
          }

          function l(e) {
            return e.split("").reduce(function (e, t) {
              return e[t] = !0, e
            }, {})
          }

          function c(e) {
            return "[object RegExp]" === Object.prototype.toString.call(e)
          }

          function p(e, t) {
            return c(e) ? !!t.match(e) : e[t]
          }

          function f(e, t) {
            return !p(e, t)
          }

          function d(e, t, n) {
            e[t] && e[t](n)
          }

          function h(e, t, n) {
            e.textNode && m(e), d(e, t, n)
          }

          function m(e) {
            e.textNode = g(e.opt, e.textNode), e.textNode && d(e, "ontext", e.textNode), e.textNode = ""
          }

          function g(e, t) {
            return e.trim && (t = t.trim()), e.normalize && (t = t.replace(/\s+/g, " ")), t
          }

          function v(e, t) {
            return m(e), e.trackPosition && (t += "\nLine: " + e.line + "\nColumn: " + e.column + "\nChar: " + e.c), t = new Error(t), e.error = t, d(e, "onerror", t), e
          }

          function y(e) {
            return e.closedRoot || b(e, "Unclosed root tag"), e.state !== H.BEGIN && e.state !== H.TEXT && v(e, "Unexpected end"), m(e), e.c = "", e.closed = !0, d(e, "onend"), r.call(e, e.strict, e.opt), e
          }

          function b(e, t) {
            if ("object" != typeof e || !(e instanceof r))throw new Error("bad call to strictFail");
            e.strict && v(e, t)
          }

          function x(e) {
            e.strict || (e.tagName = e.tagName[e.looseCase]());
            var t = e.tags[e.tags.length - 1] || e, n = e.tag = {name: e.tagName, attributes: {}};
            e.opt.xmlns && (n.ns = t.ns), e.attribList.length = 0
          }

          function w(e, t) {
            var n = e.indexOf(":"), r = 0 > n ? ["", e] : e.split(":"), i = r[0], a = r[1];
            return t && "xmlns" === e && (i = "xmlns", a = ""), {prefix: i, local: a}
          }

          function $(e) {
            if (e.strict || (e.attribName = e.attribName[e.looseCase]()), -1 !== e.attribList.indexOf(e.attribName) || e.tag.attributes.hasOwnProperty(e.attribName))return e.attribName = e.attribValue = "";
            if (e.opt.xmlns) {
              var t = w(e.attribName, !0), n = t.prefix, r = t.local;
              if ("xmlns" === n)if ("xml" === r && e.attribValue !== F)b(e, "xml: prefix must be bound to " + F + "\nActual: " + e.attribValue); else if ("xmlns" === r && e.attribValue !== B)b(e, "xmlns: prefix must be bound to " + B + "\nActual: " + e.attribValue); else {
                var i = e.tag, a = e.tags[e.tags.length - 1] || e;
                i.ns === a.ns && (i.ns = Object.create(a.ns)), i.ns[r] = e.attribValue
              }
              e.attribList.push([e.attribName, e.attribValue])
            } else e.tag.attributes[e.attribName] = e.attribValue, h(e, "onattribute", {
              name: e.attribName,
              value: e.attribValue
            });
            e.attribName = e.attribValue = ""
          }

          function E(e, t) {
            if (e.opt.xmlns) {
              var n = e.tag, r = w(e.tagName);
              n.prefix = r.prefix, n.local = r.local, n.uri = n.ns[r.prefix] || "", n.prefix && !n.uri && (b(e, "Unbound namespace prefix: " + JSON.stringify(e.tagName)), n.uri = r.prefix);
              var i = e.tags[e.tags.length - 1] || e;
              n.ns && i.ns !== n.ns && Object.keys(n.ns).forEach(function (t) {
                h(e, "onopennamespace", {prefix: t, uri: n.ns[t]})
              });
              for (var a = 0, o = e.attribList.length; o > a; a++) {
                var s = e.attribList[a], u = s[0], l = s[1], c = w(u, !0), p = c.prefix, f = c.local, d = "" == p ? "" : n.ns[p] || "", m = {
                  name: u,
                  value: l,
                  prefix: p,
                  local: f,
                  uri: d
                };
                p && "xmlns" != p && !d && (b(e, "Unbound namespace prefix: " + JSON.stringify(p)), m.uri = p), e.tag.attributes[u] = m, h(e, "onattribute", m)
              }
              e.attribList.length = 0
            }
            e.tag.isSelfClosing = !!t, e.sawRoot = !0, e.tags.push(e.tag), h(e, "onopentag", e.tag), t || (e.state = e.noscript || "script" !== e.tagName.toLowerCase() ? H.TEXT : H.SCRIPT, e.tag = null, e.tagName = ""), e.attribName = e.attribValue = "", e.attribList.length = 0
          }

          function S(e) {
            if (!e.tagName)return b(e, "Weird empty close tag."), e.textNode += "</>", void(e.state = H.TEXT);
            if (e.script) {
              if ("script" !== e.tagName)return e.script += "</" + e.tagName + ">", e.tagName = "", void(e.state = H.SCRIPT);
              h(e, "onscript", e.script), e.script = ""
            }
            var t = e.tags.length, n = e.tagName;
            e.strict || (n = n[e.looseCase]());
            for (var r = n; t--;) {
              var i = e.tags[t];
              if (i.name === r)break;
              b(e, "Unexpected close tag")
            }
            if (0 > t)return b(e, "Unmatched closing tag: " + e.tagName), e.textNode += "</" + e.tagName + ">", void(e.state = H.TEXT);
            e.tagName = n;
            for (var a = e.tags.length; a-- > t;) {
              var o = e.tag = e.tags.pop();
              e.tagName = e.tag.name, h(e, "onclosetag", e.tagName);
              var s = {};
              for (var u in o.ns)s[u] = o.ns[u];
              var l = e.tags[e.tags.length - 1] || e;
              e.opt.xmlns && o.ns !== l.ns && Object.keys(o.ns).forEach(function (t) {
                var n = o.ns[t];
                h(e, "onclosenamespace", {prefix: t, uri: n})
              })
            }
            0 === t && (e.closedRoot = !0), e.tagName = e.attribValue = e.attribName = "", e.attribList.length = 0, e.state = H.TEXT
          }

          function T(e) {
            var t, n = e.entity, r = n.toLowerCase(), i = "";
            return e.ENTITIES[n] ? e.ENTITIES[n] : e.ENTITIES[r] ? e.ENTITIES[r] : (n = r, "#" === n.charAt(0) && ("x" === n.charAt(1) ? (n = n.slice(2), t = parseInt(n, 16), i = t.toString(16)) : (n = n.slice(1), t = parseInt(n, 10), i = t.toString(10))), n = n.replace(/^0+/, ""), i.toLowerCase() !== n ? (b(e, "Invalid character entity"), "&" + e.entity + ";") : String.fromCodePoint(t))
          }

          function C(e) {
            var t = this;
            if (this.error)throw this.error;
            if (t.closed)return v(t, "Cannot write after close. Assign an onready handler.");
            if (null === e)return y(t);
            for (var n = 0, r = ""; t.c = r = e.charAt(n++);)switch (t.trackPosition && (t.position++, "\n" === r ? (t.line++, t.column = 0) : t.column++), t.state) {
              case H.BEGIN:
                "<" === r ? (t.state = H.OPEN_WAKA, t.startTagPosition = t.position) : f(M, r) && (b(t, "Non-whitespace before first tag."), t.textNode = r, t.state = H.TEXT);
                continue;
              case H.TEXT:
                if (t.sawRoot && !t.closedRoot) {
                  for (var a = n - 1; r && "<" !== r && "&" !== r;)r = e.charAt(n++), r && t.trackPosition && (t.position++, "\n" === r ? (t.line++, t.column = 0) : t.column++);
                  t.textNode += e.substring(a, n - 1)
                }
                "<" === r ? (t.state = H.OPEN_WAKA, t.startTagPosition = t.position) : (!f(M, r) || t.sawRoot && !t.closedRoot || b(t, "Text data outside of root node."), "&" === r ? t.state = H.TEXT_ENTITY : t.textNode += r);
                continue;
              case H.SCRIPT:
                "<" === r ? t.state = H.SCRIPT_ENDING : t.script += r;
                continue;
              case H.SCRIPT_ENDING:
                "/" === r ? t.state = H.CLOSE_TAG : (t.script += "<" + r, t.state = H.SCRIPT);
                continue;
              case H.OPEN_WAKA:
                if ("!" === r)t.state = H.SGML_DECL, t.sgmlDecl = ""; else if (p(M, r)); else if (p(V, r))t.state = H.OPEN_TAG, t.tagName = r; else if ("/" === r)t.state = H.CLOSE_TAG, t.tagName = ""; else if ("?" === r)t.state = H.PROC_INST, t.procInstName = t.procInstBody = ""; else {
                  if (b(t, "Unencoded <"), t.startTagPosition + 1 < t.position) {
                    var o = t.position - t.startTagPosition;
                    r = new Array(o).join(" ") + r
                  }
                  t.textNode += "<" + r, t.state = H.TEXT
                }
                continue;
              case H.SGML_DECL:
                (t.sgmlDecl + r).toUpperCase() === L ? (h(t, "onopencdata"), t.state = H.CDATA, t.sgmlDecl = "", t.cdata = "") : t.sgmlDecl + r === "--" ? (t.state = H.COMMENT, t.comment = "", t.sgmlDecl = "") : (t.sgmlDecl + r).toUpperCase() === j ? (t.state = H.DOCTYPE, (t.doctype || t.sawRoot) && b(t, "Inappropriately located doctype declaration"), t.doctype = "", t.sgmlDecl = "") : ">" === r ? (h(t, "onsgmldeclaration", t.sgmlDecl), t.sgmlDecl = "", t.state = H.TEXT) : p(P, r) ? (t.state = H.SGML_DECL_QUOTED, t.sgmlDecl += r) : t.sgmlDecl += r;
                continue;
              case H.SGML_DECL_QUOTED:
                r === t.q && (t.state = H.SGML_DECL, t.q = ""), t.sgmlDecl += r;
                continue;
              case H.DOCTYPE:
                ">" === r ? (t.state = H.TEXT, h(t, "ondoctype", t.doctype), t.doctype = !0) : (t.doctype += r, "[" === r ? t.state = H.DOCTYPE_DTD : p(P, r) && (t.state = H.DOCTYPE_QUOTED, t.q = r));
                continue;
              case H.DOCTYPE_QUOTED:
                t.doctype += r, r === t.q && (t.q = "", t.state = H.DOCTYPE);
                continue;
              case H.DOCTYPE_DTD:
                t.doctype += r, "]" === r ? t.state = H.DOCTYPE : p(P, r) && (t.state = H.DOCTYPE_DTD_QUOTED, t.q = r);
                continue;
              case H.DOCTYPE_DTD_QUOTED:
                t.doctype += r, r === t.q && (t.state = H.DOCTYPE_DTD, t.q = "");
                continue;
              case H.COMMENT:
                "-" === r ? t.state = H.COMMENT_ENDING : t.comment += r;
                continue;
              case H.COMMENT_ENDING:
                "-" === r ? (t.state = H.COMMENT_ENDED, t.comment = g(t.opt, t.comment), t.comment && h(t, "oncomment", t.comment), t.comment = "") : (t.comment += "-" + r, t.state = H.COMMENT);
                continue;
              case H.COMMENT_ENDED:
                ">" !== r ? (b(t, "Malformed comment"), t.comment += "--" + r, t.state = H.COMMENT) : t.state = H.TEXT;
                continue;
              case H.CDATA:
                "]" === r ? t.state = H.CDATA_ENDING : t.cdata += r;
                continue;
              case H.CDATA_ENDING:
                "]" === r ? t.state = H.CDATA_ENDING_2 : (t.cdata += "]" + r, t.state = H.CDATA);
                continue;
              case H.CDATA_ENDING_2:
                ">" === r ? (t.cdata && h(t, "oncdata", t.cdata), h(t, "onclosecdata"), t.cdata = "", t.state = H.TEXT) : "]" === r ? t.cdata += "]" : (t.cdata += "]]" + r, t.state = H.CDATA);
                continue;
              case H.PROC_INST:
                "?" === r ? t.state = H.PROC_INST_ENDING : p(M, r) ? t.state = H.PROC_INST_BODY : t.procInstName += r;
                continue;
              case H.PROC_INST_BODY:
                if (!t.procInstBody && p(M, r))continue;
                "?" === r ? t.state = H.PROC_INST_ENDING : t.procInstBody += r;
                continue;
              case H.PROC_INST_ENDING:
                ">" === r ? (h(t, "onprocessinginstruction", {
                  name: t.procInstName,
                  body: t.procInstBody
                }), t.procInstName = t.procInstBody = "", t.state = H.TEXT) : (t.procInstBody += "?" + r, t.state = H.PROC_INST_BODY);
                continue;
              case H.OPEN_TAG:
                p(U, r) ? t.tagName += r : (x(t), ">" === r ? E(t) : "/" === r ? t.state = H.OPEN_TAG_SLASH : (f(M, r) && b(t, "Invalid character in tag name"), t.state = H.ATTRIB));
                continue;
              case H.OPEN_TAG_SLASH:
                ">" === r ? (E(t, !0), S(t)) : (b(t, "Forward-slash in opening tag not followed by >"), t.state = H.ATTRIB);
                continue;
              case H.ATTRIB:
                if (p(M, r))continue;
                ">" === r ? E(t) : "/" === r ? t.state = H.OPEN_TAG_SLASH : p(V, r) ? (t.attribName = r, t.attribValue = "", t.state = H.ATTRIB_NAME) : b(t, "Invalid attribute name");
                continue;
              case H.ATTRIB_NAME:
                "=" === r ? t.state = H.ATTRIB_VALUE : ">" === r ? (b(t, "Attribute without value"), t.attribValue = t.attribName, $(t), E(t)) : p(M, r) ? t.state = H.ATTRIB_NAME_SAW_WHITE : p(U, r) ? t.attribName += r : b(t, "Invalid attribute name");
                continue;
              case H.ATTRIB_NAME_SAW_WHITE:
                if ("=" === r)t.state = H.ATTRIB_VALUE; else {
                  if (p(M, r))continue;
                  b(t, "Attribute without value"), t.tag.attributes[t.attribName] = "", t.attribValue = "", h(t, "onattribute", {
                    name: t.attribName,
                    value: ""
                  }), t.attribName = "", ">" === r ? E(t) : p(V, r) ? (t.attribName = r, t.state = H.ATTRIB_NAME) : (b(t, "Invalid attribute name"), t.state = H.ATTRIB)
                }
                continue;
              case H.ATTRIB_VALUE:
                if (p(M, r))continue;
                p(P, r) ? (t.q = r, t.state = H.ATTRIB_VALUE_QUOTED) : (b(t, "Unquoted attribute value"), t.state = H.ATTRIB_VALUE_UNQUOTED, t.attribValue = r);
                continue;
              case H.ATTRIB_VALUE_QUOTED:
                if (r !== t.q) {
                  "&" === r ? t.state = H.ATTRIB_VALUE_ENTITY_Q : t.attribValue += r;
                  continue
                }
                $(t), t.q = "", t.state = H.ATTRIB_VALUE_CLOSED;
                continue;
              case H.ATTRIB_VALUE_CLOSED:
                p(M, r) ? t.state = H.ATTRIB : ">" === r ? E(t) : "/" === r ? t.state = H.OPEN_TAG_SLASH : p(V, r) ? (b(t, "No whitespace between attributes"), t.attribName = r, t.attribValue = "", t.state = H.ATTRIB_NAME) : b(t, "Invalid attribute name");
                continue;
              case H.ATTRIB_VALUE_UNQUOTED:
                if (f(I, r)) {
                  "&" === r ? t.state = H.ATTRIB_VALUE_ENTITY_U : t.attribValue += r;
                  continue
                }
                $(t), ">" === r ? E(t) : t.state = H.ATTRIB;
                continue;
              case H.CLOSE_TAG:
                if (t.tagName)">" === r ? S(t) : p(U, r) ? t.tagName += r : t.script ? (t.script += "</" + t.tagName, t.tagName = "", t.state = H.SCRIPT) : (f(M, r) && b(t, "Invalid tagname in closing tag"), t.state = H.CLOSE_TAG_SAW_WHITE); else {
                  if (p(M, r))continue;
                  f(V, r) ? t.script ? (t.script += "</" + r, t.state = H.SCRIPT) : b(t, "Invalid tagname in closing tag.") : t.tagName = r
                }
                continue;
              case H.CLOSE_TAG_SAW_WHITE:
                if (p(M, r))continue;
                ">" === r ? S(t) : b(t, "Invalid characters in closing tag");
                continue;
              case H.TEXT_ENTITY:
              case H.ATTRIB_VALUE_ENTITY_Q:
              case H.ATTRIB_VALUE_ENTITY_U:
                switch (t.state) {
                  case H.TEXT_ENTITY:
                    var s = H.TEXT, u = "textNode";
                    break;
                  case H.ATTRIB_VALUE_ENTITY_Q:
                    var s = H.ATTRIB_VALUE_QUOTED, u = "attribValue";
                    break;
                  case H.ATTRIB_VALUE_ENTITY_U:
                    var s = H.ATTRIB_VALUE_UNQUOTED, u = "attribValue"
                }
                ";" === r ? (t[u] += T(t), t.entity = "", t.state = s) : p(R, r) ? t.entity += r : (b(t, "Invalid character entity"), t[u] += "&" + t.entity + r, t.entity = "", t.state = s);
                continue;
              default:
                throw new Error(t, "Unknown state: " + t.state)
            }
            return t.position >= t.bufferCheckPosition && i(t), t
          }

          n.parser = function (e, t) {
            return new r(e, t)
          }, n.SAXParser = r, n.SAXStream = u, n.createStream = s, n.MAX_BUFFER_LENGTH = 65536;
          var k = ["comment", "sgmlDecl", "textNode", "tagName", "doctype", "procInstName", "procInstBody", "entity", "attribName", "attribValue", "cdata", "script"];
          n.EVENTS = ["text", "processinginstruction", "sgmldeclaration", "doctype", "comment", "attribute", "opentag", "closetag", "opencdata", "cdata", "closecdata", "error", "end", "ready", "script", "opennamespace", "closenamespace"], Object.create || (Object.create = function (e) {
            function t() {
              this.__proto__ = e
            }

            return t.prototype = e, new t
          }), Object.getPrototypeOf || (Object.getPrototypeOf = function (e) {
            return e.__proto__
          }), Object.keys || (Object.keys = function (e) {
            var t = [];
            for (var n in e)e.hasOwnProperty(n) && t.push(n);
            return t
          }), r.prototype = {
            end: function () {
              y(this)
            }, write: C, resume: function () {
              return this.error = null, this
            }, close: function () {
              return this.write(null)
            }, flush: function () {
              o(this)
            }
          };
          try {
            var A = e("stream").Stream
          } catch (_) {
            var A = function () {
            }
          }
          var D = n.EVENTS.filter(function (e) {
            return "error" !== e && "end" !== e
          });
          u.prototype = Object.create(A.prototype, {constructor: {value: u}}), u.prototype.write = function (n) {
            if ("function" == typeof t && "function" == typeof t.isBuffer && t.isBuffer(n)) {
              if (!this._decoder) {
                var r = e("string_decoder").StringDecoder;
                this._decoder = new r("utf8")
              }
              n = this._decoder.write(n)
            }
            return this._parser.write(n.toString()), this.emit("data", n), !0
          }, u.prototype.end = function (e) {
            return e && e.length && this.write(e), this._parser.end(), !0
          }, u.prototype.on = function (e, t) {
            var n = this;
            return n._parser["on" + e] || -1 === D.indexOf(e) || (n._parser["on" + e] = function () {
              var t = 1 === arguments.length ? [arguments[0]] : Array.apply(null, arguments);
              t.splice(0, 0, e), n.emit.apply(n, t)
            }), A.prototype.on.call(n, e, t)
          };
          var M = "\r\n	 ", O = "0124356789", N = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", P = "'\"", R = O + N + "#", I = M + ">", L = "[CDATA[", j = "DOCTYPE", F = "http://www.w3.org/XML/1998/namespace", B = "http://www.w3.org/2000/xmlns/", q = {
            xml: F,
            xmlns: B
          };
          M = l(M), O = l(O), N = l(N);
          var V = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, U = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040\.\d-]/;
          P = l(P), R = l(R), I = l(I);
          var H = 0;
          n.STATE = {
            BEGIN: H++,
            TEXT: H++,
            TEXT_ENTITY: H++,
            OPEN_WAKA: H++,
            SGML_DECL: H++,
            SGML_DECL_QUOTED: H++,
            DOCTYPE: H++,
            DOCTYPE_QUOTED: H++,
            DOCTYPE_DTD: H++,
            DOCTYPE_DTD_QUOTED: H++,
            COMMENT_STARTING: H++,
            COMMENT: H++,
            COMMENT_ENDING: H++,
            COMMENT_ENDED: H++,
            CDATA: H++,
            CDATA_ENDING: H++,
            CDATA_ENDING_2: H++,
            PROC_INST: H++,
            PROC_INST_BODY: H++,
            PROC_INST_ENDING: H++,
            OPEN_TAG: H++,
            OPEN_TAG_SLASH: H++,
            ATTRIB: H++,
            ATTRIB_NAME: H++,
            ATTRIB_NAME_SAW_WHITE: H++,
            ATTRIB_VALUE: H++,
            ATTRIB_VALUE_QUOTED: H++,
            ATTRIB_VALUE_CLOSED: H++,
            ATTRIB_VALUE_UNQUOTED: H++,
            ATTRIB_VALUE_ENTITY_Q: H++,
            ATTRIB_VALUE_ENTITY_U: H++,
            CLOSE_TAG: H++,
            CLOSE_TAG_SAW_WHITE: H++,
            SCRIPT: H++,
            SCRIPT_ENDING: H++
          }, n.ENTITIES = {
            amp: "&",
            gt: ">",
            lt: "<",
            quot: '"',
            apos: "'",
            AElig: 198,
            Aacute: 193,
            Acirc: 194,
            Agrave: 192,
            Aring: 197,
            Atilde: 195,
            Auml: 196,
            Ccedil: 199,
            ETH: 208,
            Eacute: 201,
            Ecirc: 202,
            Egrave: 200,
            Euml: 203,
            Iacute: 205,
            Icirc: 206,
            Igrave: 204,
            Iuml: 207,
            Ntilde: 209,
            Oacute: 211,
            Ocirc: 212,
            Ograve: 210,
            Oslash: 216,
            Otilde: 213,
            Ouml: 214,
            THORN: 222,
            Uacute: 218,
            Ucirc: 219,
            Ugrave: 217,
            Uuml: 220,
            Yacute: 221,
            aacute: 225,
            acirc: 226,
            aelig: 230,
            agrave: 224,
            aring: 229,
            atilde: 227,
            auml: 228,
            ccedil: 231,
            eacute: 233,
            ecirc: 234,
            egrave: 232,
            eth: 240,
            euml: 235,
            iacute: 237,
            icirc: 238,
            igrave: 236,
            iuml: 239,
            ntilde: 241,
            oacute: 243,
            ocirc: 244,
            ograve: 242,
            oslash: 248,
            otilde: 245,
            ouml: 246,
            szlig: 223,
            thorn: 254,
            uacute: 250,
            ucirc: 251,
            ugrave: 249,
            uuml: 252,
            yacute: 253,
            yuml: 255,
            copy: 169,
            reg: 174,
            nbsp: 160,
            iexcl: 161,
            cent: 162,
            pound: 163,
            curren: 164,
            yen: 165,
            brvbar: 166,
            sect: 167,
            uml: 168,
            ordf: 170,
            laquo: 171,
            not: 172,
            shy: 173,
            macr: 175,
            deg: 176,
            plusmn: 177,
            sup1: 185,
            sup2: 178,
            sup3: 179,
            acute: 180,
            micro: 181,
            para: 182,
            middot: 183,
            cedil: 184,
            ordm: 186,
            raquo: 187,
            frac14: 188,
            frac12: 189,
            frac34: 190,
            iquest: 191,
            times: 215,
            divide: 247,
            OElig: 338,
            oelig: 339,
            Scaron: 352,
            scaron: 353,
            Yuml: 376,
            fnof: 402,
            circ: 710,
            tilde: 732,
            Alpha: 913,
            Beta: 914,
            Gamma: 915,
            Delta: 916,
            Epsilon: 917,
            Zeta: 918,
            Eta: 919,
            Theta: 920,
            Iota: 921,
            Kappa: 922,
            Lambda: 923,
            Mu: 924,
            Nu: 925,
            Xi: 926,
            Omicron: 927,
            Pi: 928,
            Rho: 929,
            Sigma: 931,
            Tau: 932,
            Upsilon: 933,
            Phi: 934,
            Chi: 935,
            Psi: 936,
            Omega: 937,
            alpha: 945,
            beta: 946,
            gamma: 947,
            delta: 948,
            epsilon: 949,
            zeta: 950,
            eta: 951,
            theta: 952,
            iota: 953,
            kappa: 954,
            lambda: 955,
            mu: 956,
            nu: 957,
            xi: 958,
            omicron: 959,
            pi: 960,
            rho: 961,
            sigmaf: 962,
            sigma: 963,
            tau: 964,
            upsilon: 965,
            phi: 966,
            chi: 967,
            psi: 968,
            omega: 969,
            thetasym: 977,
            upsih: 978,
            piv: 982,
            ensp: 8194,
            emsp: 8195,
            thinsp: 8201,
            zwnj: 8204,
            zwj: 8205,
            lrm: 8206,
            rlm: 8207,
            ndash: 8211,
            mdash: 8212,
            lsquo: 8216,
            rsquo: 8217,
            sbquo: 8218,
            ldquo: 8220,
            rdquo: 8221,
            bdquo: 8222,
            dagger: 8224,
            Dagger: 8225,
            bull: 8226,
            hellip: 8230,
            permil: 8240,
            prime: 8242,
            Prime: 8243,
            lsaquo: 8249,
            rsaquo: 8250,
            oline: 8254,
            frasl: 8260,
            euro: 8364,
            image: 8465,
            weierp: 8472,
            real: 8476,
            trade: 8482,
            alefsym: 8501,
            larr: 8592,
            uarr: 8593,
            rarr: 8594,
            darr: 8595,
            harr: 8596,
            crarr: 8629,
            lArr: 8656,
            uArr: 8657,
            rArr: 8658,
            dArr: 8659,
            hArr: 8660,
            forall: 8704,
            part: 8706,
            exist: 8707,
            empty: 8709,
            nabla: 8711,
            isin: 8712,
            notin: 8713,
            ni: 8715,
            prod: 8719,
            sum: 8721,
            minus: 8722,
            lowast: 8727,
            radic: 8730,
            prop: 8733,
            infin: 8734,
            ang: 8736,
            and: 8743,
            or: 8744,
            cap: 8745,
            cup: 8746,
            "int": 8747,
            there4: 8756,
            sim: 8764,
            cong: 8773,
            asymp: 8776,
            ne: 8800,
            equiv: 8801,
            le: 8804,
            ge: 8805,
            sub: 8834,
            sup: 8835,
            nsub: 8836,
            sube: 8838,
            supe: 8839,
            oplus: 8853,
            otimes: 8855,
            perp: 8869,
            sdot: 8901,
            lceil: 8968,
            rceil: 8969,
            lfloor: 8970,
            rfloor: 8971,
            lang: 9001,
            rang: 9002,
            loz: 9674,
            spades: 9824,
            clubs: 9827,
            hearts: 9829,
            diams: 9830
          }, Object.keys(n.ENTITIES).forEach(function (e) {
            var t = n.ENTITIES[e], r = "number" == typeof t ? String.fromCharCode(t) : t;
            n.ENTITIES[e] = r
          });
          for (var H in n.STATE)n.STATE[n.STATE[H]] = H;
          H = n.STATE, String.fromCodePoint || !function () {
            var e = String.fromCharCode, t = Math.floor, n = function () {
              var n, r, i = 16384, a = [], o = -1, s = arguments.length;
              if (!s)return "";
              for (var u = ""; ++o < s;) {
                var l = Number(arguments[o]);
                if (!isFinite(l) || 0 > l || l > 1114111 || t(l) != l)throw RangeError("Invalid code point: " + l);
                65535 >= l ? a.push(l) : (l -= 65536, n = (l >> 10) + 55296, r = l % 1024 + 56320, a.push(n, r)), (o + 1 == s || a.length > i) && (u += e.apply(null, a), a.length = 0)
              }
              return u
            };
            Object.defineProperty ? Object.defineProperty(String, "fromCodePoint", {
              value: n,
              configurable: !0,
              writable: !0
            }) : String.fromCodePoint = n
          }()
        }("undefined" == typeof n ? sax = {} : n)
      }).call(this, void 0)
    }, {undefined: void 0}],
    21: [function (t, n, r) {
      !function (t) {
        function i() {
          this.data = [null], this.top = 0
        }

        function a() {
          return new i
        }

        i.prototype.clear = function () {
          return this.data = [null], this.top = 0, this
        }, i.prototype.length = function () {
          return this.top
        }, i.prototype.peek = function () {
          return this.data[this.top]
        }, i.prototype.pop = function () {
          return this.top > 0 ? (this.top--, this.data.pop()) : void 0
        }, i.prototype.push = function (e) {
          return this.data[++this.top] = e, this
        }, "undefined" != typeof r ? n.exports = a : "function" == typeof e ? e(function () {
          return a
        }) : t.stack = a
      }(this)
    }, {}],
    22: [function (e, t) {
      t.exports = e(26)
    }, {26: 26}],
    23: [function (e, t) {
      function n() {
      }

      n.prototype.get = function (e) {
        return this.$model.properties.get(this, e)
      }, n.prototype.set = function (e, t) {
        this.$model.properties.set(this, e, t)
      }, t.exports = n
    }, {}],
    24: [function (e, t) {
      function n(e) {
        this.ns = e, this.name = e.name, this.allTypes = [], this.properties = [], this.propertiesByName = {}
      }

      var r = e(164), i = e(159), a = e(80), o = e(27).parseName;
      t.exports = n, n.prototype.build = function () {
        return r(this, ["ns", "name", "allTypes", "properties", "propertiesByName", "bodyProperty"])
      }, n.prototype.addProperty = function (e, t) {
        this.addNamedProperty(e, !0);
        var n = this.properties;
        void 0 !== t ? n.splice(t, 0, e) : n.push(e)
      }, n.prototype.replaceProperty = function (e, t) {
        var n = e.ns, r = this.properties, i = this.propertiesByName, a = e.name !== t.name;
        if (e.isBody) {
          if (!t.isBody)throw new Error("property <" + t.ns.name + "> must be body property to refine <" + e.ns.name + ">");
          this.setBodyProperty(t, !1)
        }
        this.addNamedProperty(t, a);
        var o = r.indexOf(e);
        if (-1 === o)throw new Error("property <" + n.name + "> not found in property list");
        r[o] = t, i[n.name] = i[n.localName] = t
      }, n.prototype.redefineProperty = function (e) {
        var t = e.ns.prefix, n = e.redefines.split("#"), r = o(n[0], t), i = o(n[1], r.prefix).name, a = this.propertiesByName[i];
        if (!a)throw new Error("refined property <" + i + "> not found");
        this.replaceProperty(a, e), delete e.redefines
      }, n.prototype.addNamedProperty = function (e, t) {
        var n = e.ns, r = this.propertiesByName;
        t && (this.assertNotDefined(e, n.name), this.assertNotDefined(e, n.localName)), r[n.name] = r[n.localName] = e
      }, n.prototype.removeNamedProperty = function (e) {
        var t = e.ns, n = this.propertiesByName;
        delete n[t.name], delete n[t.localName]
      }, n.prototype.setBodyProperty = function (e, t) {
        if (t && this.bodyProperty)throw new Error("body property defined multiple times (<" + this.bodyProperty.ns.name + ">, <" + e.ns.name + ">)");
        this.bodyProperty = e
      }, n.prototype.addIdProperty = function (e) {
        var t = o(e, this.ns.prefix), n = {name: t.localName, type: "String", isAttr: !0, ns: t};
        this.addProperty(n, 0)
      }, n.prototype.assertNotDefined = function (e) {
        var t = e.name, n = this.propertiesByName[t];
        if (n)throw new Error("property <" + t + "> already defined; override of <" + n.definedBy.ns.name + "#" + n.ns.name + "> by <" + e.definedBy.ns.name + "#" + e.ns.name + "> not allowed without redefines")
      }, n.prototype.hasProperty = function (e) {
        return this.propertiesByName[e]
      }, n.prototype.addTrait = function (e) {
        var t = this.allTypes;
        -1 === t.indexOf(e) && (a(e.properties, function (t) {
          t = i({}, t, {name: t.ns.localName}), Object.defineProperty(t, "definedBy", {value: e}), t.redefines ? this.redefineProperty(t) : (t.isBody && this.setBodyProperty(t), this.addProperty(t))
        }, this), t.push(e))
      }
    }, {159: 159, 164: 164, 27: 27, 80: 80}],
    25: [function (e, t) {
      function n(e, t) {
        this.model = e, this.properties = t
      }

      var r = e(80), i = e(23);
      t.exports = n, n.prototype.createType = function (e) {
        function t(e) {
          a.define(this, "$type", {
            value: s,
            enumerable: !0
          }), a.define(this, "$attrs", {value: {}}), a.define(this, "$parent", {writable: !0}), r(e, function (e, t) {
            this.set(t, e)
          }, this)
        }

        var n = this.model, a = this.properties, o = Object.create(i.prototype);
        r(e.properties, function (e) {
          e.isMany || void 0 === e["default"] || (o[e.name] = e["default"])
        }), a.defineModel(o, n), a.defineDescriptor(o, e);
        var s = e.ns.name;
        return t.prototype = o, t.hasType = o.$instanceOf = this.model.hasType, a.defineModel(t, n), a.defineDescriptor(t, e), t
      }
    }, {23: 23, 80: 80}],
    26: [function (e, t) {
      function n(e, t) {
        t = t || {}, this.properties = new l(this), this.factory = new s(this, this.properties), this.registry = new u(e, this.properties, t), this.typeCache = {}
      }

      var r = e(156), i = e(154), a = e(80), o = e(79), s = e(25), u = e(29), l = e(28), c = e(27).parseName;
      t.exports = n, n.prototype.create = function (e, t) {
        var n = this.getType(e);
        if (!n)throw new Error("unknown type <" + e + ">");
        return new n(t)
      }, n.prototype.getType = function (e) {
        var t = this.typeCache, n = r(e) ? e : e.ns.name, i = t[n];
        return i || (e = this.registry.getEffectiveDescriptor(n), i = t[n] = this.factory.createType(e)), i
      }, n.prototype.createAny = function (e, t, n) {
        var r = c(e), o = {$type: e}, s = {
          name: e,
          isGeneric: !0,
          ns: {prefix: r.prefix, localName: r.localName, uri: t}
        };
        return this.properties.defineDescriptor(o, s), this.properties.defineModel(o, this), this.properties.define(o, "$parent", {
          enumerable: !1,
          writable: !0
        }), a(n, function (e, t) {
          i(e) && void 0 !== e.value ? o[e.name] = e.value : o[t] = e
        }), o
      }, n.prototype.getPackage = function (e) {
        return this.registry.getPackage(e)
      }, n.prototype.getPackages = function () {
        return this.registry.getPackages()
      }, n.prototype.getElementDescriptor = function (e) {
        return e.$descriptor
      }, n.prototype.hasType = function (e, t) {
        void 0 === t && (t = e, e = this);
        var n = e.$model.getElementDescriptor(e);
        return !!o(n.allTypes, function (e) {
          return e.name === t
        })
      }, n.prototype.getPropertyDescriptor = function (e, t) {
        return this.getElementDescriptor(e).propertiesByName[t]
      }
    }, {154: 154, 156: 156, 25: 25, 27: 27, 28: 28, 29: 29, 79: 79, 80: 80}],
    27: [function (e, t) {
      t.exports.parseName = function (e, t) {
        var n, r, i = e.split(/:/);
        if (1 === i.length)n = e, r = t; else {
          if (2 !== i.length)throw new Error("expected <prefix:localName> or <localName>, got " + e);
          n = i[1], r = i[0]
        }
        return e = (r ? r + ":" : "") + n, {name: e, prefix: r, localName: n}
      }
    }, {}],
    28: [function (e, t) {
      function n(e) {
        this.model = e
      }

      t.exports = n, n.prototype.set = function (e, t, n) {
        var r = this.model.getPropertyDescriptor(e, t);
        r ? Object.defineProperty(e, r.name, {enumerable: !r.isReference, writable: !0, value: n}) : e.$attrs[t] = n
      }, n.prototype.get = function (e, t) {
        var n = this.model.getPropertyDescriptor(e, t);
        if (!n)return e.$attrs[t];
        var r = n.name;
        return !e[r] && n.isMany && Object.defineProperty(e, r, {
          enumerable: !n.isReference,
          writable: !0,
          value: []
        }), e[r]
      }, n.prototype.define = function (e, t, n) {
        Object.defineProperty(e, t, n)
      }, n.prototype.defineDescriptor = function (e, t) {
        this.define(e, "$descriptor", {value: t})
      }, n.prototype.defineModel = function (e, t) {
        this.define(e, "$model", {value: t})
      }
    }, {}],
    29: [function (e, t) {
      function n(e, t, n) {
        this.options = r({generateId: "id"}, n || {}), this.packageMap = {}, this.typeMap = {}, this.packages = [], this.properties = t, i(e, this.registerPackage, this)
      }

      var r = e(159), i = e(80), a = e(30), o = e(24), s = e(27).parseName, u = a.isBuiltIn;
      t.exports = n, n.prototype.getPackage = function (e) {
        return this.packageMap[e]
      }, n.prototype.getPackages = function () {
        return this.packages
      }, n.prototype.registerPackage = function (e) {
        e = r({}, e), i(e.types, function (t) {
          this.registerType(t, e)
        }, this), this.packageMap[e.uri] = this.packageMap[e.prefix] = e, this.packages.push(e)
      }, n.prototype.registerType = function (e, t) {
        e = r({}, e, {
          superClass: (e.superClass || []).slice(),
          "extends": (e["extends"] || []).slice(),
          properties: (e.properties || []).slice()
        });
        var n = s(e.name, t.prefix), a = n.name, o = {};
        i(e.properties, function (e) {
          var t = s(e.name, n.prefix), i = t.name;
          u(e.type) || (e.type = s(e.type, t.prefix).name), r(e, {ns: t, name: i}), o[i] = e
        }), r(e, {ns: n, name: a, propertiesByName: o}), i(e["extends"], function (e) {
          var t = this.typeMap[e];
          t.traits = t.traits || [], t.traits.push(a)
        }, this), this.definePackage(e, t), this.typeMap[a] = e
      }, n.prototype.mapTypes = function (e, t) {
        function n(n) {
          var r = s(n, u(n) ? "" : e.prefix);
          a.mapTypes(r, t)
        }

        var r = u(e.name) ? {name: e.name} : this.typeMap[e.name], a = this;
        if (!r)throw new Error("unknown type <" + e.name + ">");
        i(r.superClass, n), t(r), i(r.traits, n)
      }, n.prototype.getEffectiveDescriptor = function (e) {
        var t = s(e), n = new o(t);
        this.mapTypes(t, function (e) {
          n.addTrait(e)
        });
        var r = this.options.generateId;
        r && !n.hasProperty(r) && n.addIdProperty(r);
        var i = n.build();
        return this.definePackage(i, i.allTypes[i.allTypes.length - 1].$pkg), i
      }, n.prototype.definePackage = function (e, t) {
        this.properties.define(e, "$pkg", {value: t})
      }
    }, {159: 159, 24: 24, 27: 27, 30: 30, 80: 80}],
    30: [function (e, t) {
      var n = {String: !0, Boolean: !0, Integer: !0, Real: !0, Element: !0}, r = {
        String: function (e) {
          return e
        }, Boolean: function (e) {
          return "true" === e
        }, Integer: function (e) {
          return parseInt(e, 10)
        }, Real: function (e) {
          return parseFloat(e, 10)
        }
      };
      t.exports.coerceType = function (e, t) {
        var n = r[e];
        return n ? n(t) : t
      }, t.exports.isBuiltIn = function (e) {
        return !!n[e]
      }, t.exports.isSimple = function (e) {
        return !!r[e]
      }
    }, {}],
    31: [function (e, t) {
      t.exports = {
        name: "BPMN20",
        uri: "http://www.omg.org/spec/BPMN/20100524/MODEL",
        associations: [],
        types: [{
          name: "Interface",
          superClass: ["RootElement"],
          properties: [{name: "name", isAttr: !0, type: "String"}, {
            name: "operations",
            type: "Operation",
            isMany: !0
          }, {name: "implementationRef", type: "String", isAttr: !0}]
        }, {
          name: "Operation",
          superClass: ["BaseElement"],
          properties: [{name: "name", isAttr: !0, type: "String"}, {
            name: "inMessageRef",
            type: "Message",
            isAttr: !0,
            isReference: !0
          }, {name: "outMessageRef", type: "Message", isAttr: !0, isReference: !0}, {
            name: "errorRefs",
            type: "Error",
            isMany: !0,
            isReference: !0
          }, {name: "implementationRef", type: "String", isAttr: !0}]
        }, {name: "EndPoint", superClass: ["RootElement"]}, {
          name: "Auditing",
          superClass: ["BaseElement"]
        }, {
          name: "GlobalTask",
          superClass: ["CallableElement"],
          properties: [{name: "resources", type: "ResourceRole", isMany: !0}]
        }, {name: "Monitoring", superClass: ["BaseElement"]}, {
          name: "Performer",
          superClass: ["ResourceRole"]
        }, {
          name: "Process",
          superClass: ["FlowElementsContainer", "CallableElement"],
          properties: [{name: "processType", type: "ProcessType", isAttr: !0}, {
            name: "isClosed",
            isAttr: !0,
            type: "Boolean"
          }, {name: "auditing", type: "Auditing"}, {name: "monitoring", type: "Monitoring"}, {
            name: "properties",
            type: "Property",
            isMany: !0
          }, {name: "supports", type: "Process", isMany: !0, isReference: !0}, {
            name: "definitionalCollaborationRef",
            type: "Collaboration",
            isAttr: !0,
            isReference: !0
          }, {name: "isExecutable", isAttr: !0, type: "Boolean"}, {
            name: "resources",
            type: "ResourceRole",
            isMany: !0
          }, {name: "artifacts", type: "Artifact", isMany: !0}, {
            name: "correlationSubscriptions",
            type: "CorrelationSubscription",
            isMany: !0
          }]
        }, {
          name: "LaneSet",
          superClass: ["BaseElement"],
          properties: [{name: "lanes", type: "Lane", isMany: !0}, {name: "name", isAttr: !0, type: "String"}]
        }, {
          name: "Lane",
          superClass: ["BaseElement"],
          properties: [{name: "name", isAttr: !0, type: "String"}, {
            name: "childLaneSet",
            type: "LaneSet",
            serialize: "xsi:type"
          }, {name: "partitionElementRef", type: "BaseElement", isAttr: !0, isReference: !0}, {
            name: "flowNodeRef",
            type: "FlowNode",
            isMany: !0,
            isReference: !0
          }, {name: "partitionElement", type: "BaseElement"}]
        }, {name: "GlobalManualTask", superClass: ["GlobalTask"]}, {
          name: "ManualTask",
          superClass: ["Task"]
        }, {
          name: "UserTask",
          superClass: ["Task"],
          properties: [{name: "renderings", type: "Rendering", isMany: !0}, {
            name: "implementation",
            isAttr: !0,
            type: "String"
          }]
        }, {name: "Rendering", superClass: ["BaseElement"]}, {
          name: "HumanPerformer",
          superClass: ["Performer"]
        }, {name: "PotentialOwner", superClass: ["HumanPerformer"]}, {
          name: "GlobalUserTask",
          superClass: ["GlobalTask"],
          properties: [{name: "implementation", isAttr: !0, type: "String"}, {
            name: "renderings",
            type: "Rendering",
            isMany: !0
          }]
        }, {
          name: "Gateway",
          isAbstract: !0,
          superClass: ["FlowNode"],
          properties: [{name: "gatewayDirection", type: "GatewayDirection", "default": "Unspecified", isAttr: !0}]
        }, {
          name: "EventBasedGateway",
          superClass: ["Gateway"],
          properties: [{name: "instantiate", "default": !1, isAttr: !0, type: "Boolean"}, {
            name: "eventGatewayType",
            type: "EventBasedGatewayType",
            isAttr: !0,
            "default": "Exclusive"
          }]
        }, {
          name: "ComplexGateway",
          superClass: ["Gateway"],
          properties: [{name: "activationCondition", type: "Expression", serialize: "xsi:type"}, {
            name: "default",
            type: "SequenceFlow",
            isAttr: !0,
            isReference: !0
          }]
        }, {
          name: "ExclusiveGateway",
          superClass: ["Gateway"],
          properties: [{name: "default", type: "SequenceFlow", isAttr: !0, isReference: !0}]
        }, {
          name: "InclusiveGateway",
          superClass: ["Gateway"],
          properties: [{name: "default", type: "SequenceFlow", isAttr: !0, isReference: !0}]
        }, {name: "ParallelGateway", superClass: ["Gateway"]}, {
          name: "RootElement",
          isAbstract: !0,
          superClass: ["BaseElement"]
        }, {
          name: "Relationship",
          superClass: ["BaseElement"],
          properties: [{name: "type", isAttr: !0, type: "String"}, {
            name: "direction",
            type: "RelationshipDirection",
            isAttr: !0
          }, {name: "sources", isMany: !0, isReference: !0, type: "Element"}, {
            name: "targets",
            isMany: !0,
            isReference: !0,
            type: "Element"
          }]
        }, {
          name: "BaseElement",
          isAbstract: !0,
          properties: [{name: "id", isAttr: !0, type: "String"}, {
            name: "extensionDefinitions",
            type: "ExtensionDefinition",
            isMany: !0,
            isReference: !0
          }, {name: "extensionElements", type: "ExtensionElements"}, {
            name: "documentation",
            type: "Documentation",
            isMany: !0
          }]
        }, {
          name: "Extension",
          properties: [{name: "mustUnderstand", "default": !1, isAttr: !0, type: "Boolean"}, {
            name: "definition",
            type: "ExtensionDefinition"
          }]
        }, {
          name: "ExtensionDefinition",
          properties: [{name: "name", isAttr: !0, type: "String"}, {
            name: "extensionAttributeDefinitions",
            type: "ExtensionAttributeDefinition",
            isMany: !0
          }]
        }, {
          name: "ExtensionAttributeDefinition",
          properties: [{name: "name", isAttr: !0, type: "String"}, {
            name: "type",
            isAttr: !0,
            type: "String"
          }, {name: "isReference", "default": !1, isAttr: !0, type: "Boolean"}, {
            name: "extensionDefinition",
            type: "ExtensionDefinition",
            isAttr: !0,
            isReference: !0
          }]
        }, {
          name: "ExtensionElements",
          properties: [{name: "valueRef", isAttr: !0, isReference: !0, type: "Element"}, {
            name: "values",
            type: "Element",
            isMany: !0
          }, {name: "extensionAttributeDefinition", type: "ExtensionAttributeDefinition", isAttr: !0, isReference: !0}]
        }, {
          name: "Documentation",
          superClass: ["BaseElement"],
          properties: [{name: "text", type: "String", isBody: !0}, {
            name: "textFormat",
            "default": "text/plain",
            isAttr: !0,
            type: "String"
          }]
        }, {
          name: "Event",
          isAbstract: !0,
          superClass: ["FlowNode", "InteractionNode"],
          properties: [{name: "properties", type: "Property", isMany: !0}]
        }, {name: "IntermediateCatchEvent", superClass: ["CatchEvent"]}, {
          name: "IntermediateThrowEvent",
          superClass: ["ThrowEvent"]
        }, {name: "EndEvent", superClass: ["ThrowEvent"]}, {
          name: "StartEvent",
          superClass: ["CatchEvent"],
          properties: [{name: "isInterrupting", "default": !0, isAttr: !0, type: "Boolean"}]
        }, {
          name: "ThrowEvent",
          isAbstract: !0,
          superClass: ["Event"],
          properties: [{name: "inputSet", type: "InputSet"}, {
            name: "eventDefinitionRefs",
            type: "EventDefinition",
            isMany: !0,
            isReference: !0
          }, {name: "dataInputAssociation", type: "DataInputAssociation", isMany: !0}, {
            name: "dataInputs",
            type: "DataInput",
            isMany: !0
          }, {name: "eventDefinitions", type: "EventDefinition", isMany: !0}]
        }, {
          name: "CatchEvent",
          isAbstract: !0,
          superClass: ["Event"],
          properties: [{name: "parallelMultiple", isAttr: !0, type: "Boolean", "default": !1}, {
            name: "outputSet",
            type: "OutputSet"
          }, {
            name: "eventDefinitionRefs",
            type: "EventDefinition",
            isMany: !0,
            isReference: !0
          }, {name: "dataOutputAssociation", type: "DataOutputAssociation", isMany: !0}, {
            name: "dataOutputs",
            type: "DataOutput",
            isMany: !0
          }, {name: "eventDefinitions", type: "EventDefinition", isMany: !0}]
        }, {
          name: "BoundaryEvent",
          superClass: ["CatchEvent"],
          properties: [{name: "cancelActivity", "default": !0, isAttr: !0, type: "Boolean"}, {
            name: "attachedToRef",
            type: "Activity",
            isAttr: !0,
            isReference: !0
          }]
        }, {name: "EventDefinition", isAbstract: !0, superClass: ["RootElement"]}, {
          name: "CancelEventDefinition",
          superClass: ["EventDefinition"]
        }, {
          name: "ErrorEventDefinition",
          superClass: ["EventDefinition"],
          properties: [{name: "errorRef", type: "Error", isAttr: !0, isReference: !0}]
        }, {name: "TerminateEventDefinition", superClass: ["EventDefinition"]}, {
          name: "EscalationEventDefinition",
          superClass: ["EventDefinition"],
          properties: [{name: "escalationRef", type: "Escalation", isAttr: !0, isReference: !0}]
        }, {
          name: "Escalation",
          properties: [{name: "structureRef", type: "ItemDefinition", isAttr: !0, isReference: !0}, {
            name: "name",
            isAttr: !0,
            type: "String"
          }, {name: "escalationCode", isAttr: !0, type: "String"}],
          superClass: ["RootElement"]
        }, {
          name: "CompensateEventDefinition",
          superClass: ["EventDefinition"],
          properties: [{name: "waitForCompletion", isAttr: !0, type: "Boolean"}, {
            name: "activityRef",
            type: "Activity",
            isAttr: !0,
            isReference: !0
          }]
        }, {
          name: "TimerEventDefinition",
          superClass: ["EventDefinition"],
          properties: [{name: "timeDate", type: "Expression", serialize: "xsi:type"}, {
            name: "timeCycle",
            type: "Expression",
            serialize: "xsi:type"
          }, {name: "timeDuration", type: "Expression", serialize: "xsi:type"}]
        }, {
          name: "LinkEventDefinition",
          superClass: ["EventDefinition"],
          properties: [{name: "name", isAttr: !0, type: "String"}, {
            name: "target",
            type: "LinkEventDefinition",
            isAttr: !0,
            isReference: !0
          }, {name: "source", type: "LinkEventDefinition", isMany: !0, isReference: !0}]
        }, {
          name: "MessageEventDefinition",
          superClass: ["EventDefinition"],
          properties: [{name: "messageRef", type: "Message", isAttr: !0, isReference: !0}, {
            name: "operationRef",
            type: "Operation",
            isAttr: !0,
            isReference: !0
          }]
        }, {
          name: "ConditionalEventDefinition",
          superClass: ["EventDefinition"],
          properties: [{name: "condition", type: "Expression", serialize: "xsi:type"}]
        }, {
          name: "SignalEventDefinition",
          superClass: ["EventDefinition"],
          properties: [{name: "signalRef", type: "Signal", isAttr: !0, isReference: !0}]
        }, {
          name: "Signal",
          superClass: ["RootElement"],
          properties: [{name: "structureRef", type: "ItemDefinition", isAttr: !0, isReference: !0}, {
            name: "name",
            isAttr: !0,
            type: "String"
          }]
        }, {name: "ImplicitThrowEvent", superClass: ["ThrowEvent"]}, {
          name: "DataState",
          superClass: ["BaseElement"],
          properties: [{name: "name", isAttr: !0, type: "String"}]
        }, {
          name: "ItemAwareElement",
          superClass: ["BaseElement"],
          properties: [{
            name: "itemSubjectRef",
            type: "ItemDefinition",
            isAttr: !0,
            isReference: !0
          }, {name: "dataState", type: "DataState"}]
        }, {
          name: "DataAssociation",
          superClass: ["BaseElement"],
          properties: [{name: "transformation", type: "FormalExpression"}, {
            name: "assignment",
            type: "Assignment",
            isMany: !0
          }, {name: "sourceRef", type: "ItemAwareElement", isMany: !0, isReference: !0}, {
            name: "targetRef",
            type: "ItemAwareElement",
            isReference: !0
          }]
        }, {
          name: "DataInput",
          superClass: ["ItemAwareElement"],
          properties: [{name: "name", isAttr: !0, type: "String"}, {
            name: "isCollection",
            "default": !1,
            isAttr: !0,
            type: "Boolean"
          }, {
            name: "inputSetRefs",
            type: "InputSet",
            isVirtual: !0,
            isMany: !0,
            isReference: !0
          }, {
            name: "inputSetWithOptional",
            type: "InputSet",
            isVirtual: !0,
            isMany: !0,
            isReference: !0
          }, {name: "inputSetWithWhileExecuting", type: "InputSet", isVirtual: !0, isMany: !0, isReference: !0}]
        }, {
          name: "DataOutput",
          superClass: ["ItemAwareElement"],
          properties: [{name: "name", isAttr: !0, type: "String"}, {
            name: "isCollection",
            "default": !1,
            isAttr: !0,
            type: "Boolean"
          }, {
            name: "outputSetRefs",
            type: "OutputSet",
            isVirtual: !0,
            isMany: !0,
            isReference: !0
          }, {
            name: "outputSetWithOptional",
            type: "OutputSet",
            isVirtual: !0,
            isMany: !0,
            isReference: !0
          }, {name: "outputSetWithWhileExecuting", type: "OutputSet", isVirtual: !0, isMany: !0, isReference: !0}]
        }, {
          name: "InputSet",
          superClass: ["BaseElement"],
          properties: [{name: "name", isAttr: !0, type: "String"}, {
            name: "dataInputRefs",
            type: "DataInput",
            isMany: !0,
            isReference: !0
          }, {
            name: "optionalInputRefs",
            type: "DataInput",
            isMany: !0,
            isReference: !0
          }, {name: "whileExecutingInputRefs", type: "DataInput", isMany: !0, isReference: !0}, {
            name: "outputSetRefs",
            type: "OutputSet",
            isMany: !0,
            isReference: !0
          }]
        }, {
          name: "OutputSet",
          superClass: ["BaseElement"],
          properties: [{name: "dataOutputRefs", type: "DataOutput", isMany: !0, isReference: !0}, {
            name: "name",
            isAttr: !0,
            type: "String"
          }, {name: "inputSetRefs", type: "InputSet", isMany: !0, isReference: !0}, {
            name: "optionalOutputRefs",
            type: "DataOutput",
            isMany: !0,
            isReference: !0
          }, {name: "whileExecutingOutputRefs", type: "DataOutput", isMany: !0, isReference: !0}]
        }, {
          name: "Property",
          superClass: ["ItemAwareElement"],
          properties: [{name: "name", isAttr: !0, type: "String"}]
        }, {name: "DataInputAssociation", superClass: ["DataAssociation"]}, {
          name: "DataOutputAssociation",
          superClass: ["DataAssociation"]
        }, {
          name: "InputOutputSpecification",
          superClass: ["BaseElement"],
          properties: [{name: "inputSets", type: "InputSet", isMany: !0}, {
            name: "outputSets",
            type: "OutputSet",
            isMany: !0
          }, {name: "dataInputs", type: "DataInput", isMany: !0}, {name: "dataOutputs", type: "DataOutput", isMany: !0}]
        }, {
          name: "DataObject",
          superClass: ["FlowElement", "ItemAwareElement"],
          properties: [{name: "isCollection", "default": !1, isAttr: !0, type: "Boolean"}]
        }, {
          name: "InputOutputBinding",
          properties: [{name: "inputDataRef", type: "InputSet", isAttr: !0, isReference: !0}, {
            name: "outputDataRef",
            type: "OutputSet",
            isAttr: !0,
            isReference: !0
          }, {name: "operationRef", type: "Operation", isAttr: !0, isReference: !0}]
        }, {
          name: "Assignment",
          superClass: ["BaseElement"],
          properties: [{name: "from", type: "Expression", serialize: "xsi:type"}, {
            name: "to",
            type: "Expression",
            serialize: "xsi:type"
          }]
        }, {
          name: "DataStore",
          superClass: ["RootElement", "ItemAwareElement"],
          properties: [{name: "name", isAttr: !0, type: "String"}, {
            name: "capacity",
            isAttr: !0,
            type: "Integer"
          }, {name: "isUnlimited", "default": !0, isAttr: !0, type: "Boolean"}]
        }, {
          name: "DataStoreReference",
          superClass: ["ItemAwareElement", "FlowElement"],
          properties: [{name: "dataStoreRef", type: "DataStore", isAttr: !0, isReference: !0}]
        }, {
          name: "DataObjectReference",
          superClass: ["ItemAwareElement", "FlowElement"],
          properties: [{name: "dataObjectRef", type: "DataObject", isAttr: !0, isReference: !0}]
        }, {
          name: "ConversationLink",
          superClass: ["BaseElement"],
          properties: [{name: "sourceRef", type: "InteractionNode", isAttr: !0, isReference: !0}, {
            name: "targetRef",
            type: "InteractionNode",
            isAttr: !0,
            isReference: !0
          }, {name: "name", isAttr: !0, type: "String"}]
        }, {
          name: "ConversationAssociation",
          superClass: ["BaseElement"],
          properties: [{
            name: "innerConversationNodeRef",
            type: "ConversationNode",
            isAttr: !0,
            isReference: !0
          }, {name: "outerConversationNodeRef", type: "ConversationNode", isAttr: !0, isReference: !0}]
        }, {
          name: "CallConversation",
          superClass: ["ConversationNode"],
          properties: [{
            name: "calledCollaborationRef",
            type: "Collaboration",
            isAttr: !0,
            isReference: !0
          }, {name: "participantAssociations", type: "ParticipantAssociation", isMany: !0}]
        }, {name: "Conversation", superClass: ["ConversationNode"]}, {
          name: "SubConversation",
          superClass: ["ConversationNode"],
          properties: [{name: "conversationNodes", type: "ConversationNode", isMany: !0}]
        }, {
          name: "ConversationNode",
          isAbstract: !0,
          superClass: ["InteractionNode", "BaseElement"],
          properties: [{name: "name", isAttr: !0, type: "String"}, {
            name: "participantRefs",
            type: "Participant",
            isMany: !0,
            isReference: !0
          }, {name: "messageFlowRefs", type: "MessageFlow", isMany: !0, isReference: !0}, {
            name: "correlationKeys",
            type: "CorrelationKey",
            isMany: !0
          }]
        }, {name: "GlobalConversation", superClass: ["Collaboration"]}, {
          name: "PartnerEntity",
          superClass: ["RootElement"],
          properties: [{name: "name", isAttr: !0, type: "String"}, {
            name: "participantRef",
            type: "Participant",
            isMany: !0,
            isReference: !0
          }]
        }, {
          name: "PartnerRole",
          superClass: ["RootElement"],
          properties: [{name: "name", isAttr: !0, type: "String"}, {
            name: "participantRef",
            type: "Participant",
            isMany: !0,
            isReference: !0
          }]
        }, {
          name: "CorrelationProperty",
          superClass: ["RootElement"],
          properties: [{
            name: "correlationPropertyRetrievalExpression",
            type: "CorrelationPropertyRetrievalExpression",
            isMany: !0
          }, {name: "name", isAttr: !0, type: "String"}, {
            name: "type",
            type: "ItemDefinition",
            isAttr: !0,
            isReference: !0
          }]
        }, {
          name: "Error",
          superClass: ["RootElement"],
          properties: [{name: "structureRef", type: "ItemDefinition", isAttr: !0, isReference: !0}, {
            name: "name",
            isAttr: !0,
            type: "String"
          }, {name: "errorCode", isAttr: !0, type: "String"}]
        }, {
          name: "CorrelationKey",
          superClass: ["BaseElement"],
          properties: [{
            name: "correlationPropertyRef",
            type: "CorrelationProperty",
            isMany: !0,
            isReference: !0
          }, {name: "name", isAttr: !0, type: "String"}]
        }, {name: "Expression", superClass: ["BaseElement"], isAbstract: !0}, {
          name: "FormalExpression",
          superClass: ["Expression"],
          properties: [{name: "language", isAttr: !0, type: "String"}, {
            name: "body",
            type: "String",
            isBody: !0
          }, {name: "evaluatesToTypeRef", type: "ItemDefinition", isAttr: !0, isReference: !0}]
        }, {
          name: "Message",
          superClass: ["RootElement"],
          properties: [{name: "name", isAttr: !0, type: "String"}, {
            name: "itemRef",
            type: "ItemDefinition",
            isAttr: !0,
            isReference: !0
          }]
        }, {
          name: "ItemDefinition",
          superClass: ["RootElement"],
          properties: [{name: "itemKind", type: "ItemKind", isAttr: !0}, {
            name: "structureRef",
            type: "String",
            isAttr: !0
          }, {name: "isCollection", "default": !1, isAttr: !0, type: "Boolean"}, {
            name: "import",
            type: "Import",
            isAttr: !0,
            isReference: !0
          }]
        }, {
          name: "FlowElement",
          isAbstract: !0,
          superClass: ["BaseElement"],
          properties: [{name: "name", isAttr: !0, type: "String"}, {
            name: "auditing",
            type: "Auditing"
          }, {name: "monitoring", type: "Monitoring"}, {
            name: "categoryValueRef",
            type: "CategoryValue",
            isMany: !0,
            isReference: !0
          }]
        }, {
          name: "SequenceFlow",
          superClass: ["FlowElement"],
          properties: [{name: "isImmediate", isAttr: !0, type: "Boolean"}, {
            name: "conditionExpression",
            type: "Expression",
            serialize: "xsi:type"
          }, {name: "sourceRef", type: "FlowNode", isAttr: !0, isReference: !0}, {
            name: "targetRef",
            type: "FlowNode",
            isAttr: !0,
            isReference: !0
          }]
        }, {
          name: "FlowElementsContainer",
          isAbstract: !0,
          superClass: ["BaseElement"],
          properties: [{name: "laneSets", type: "LaneSet", isMany: !0}, {
            name: "flowElements",
            type: "FlowElement",
            isMany: !0
          }]
        }, {
          name: "CallableElement",
          isAbstract: !0,
          superClass: ["RootElement"],
          properties: [{name: "name", isAttr: !0, type: "String"}, {
            name: "ioSpecification",
            type: "InputOutputSpecification"
          }, {name: "supportedInterfaceRefs", type: "Interface", isMany: !0, isReference: !0}, {
            name: "ioBinding",
            type: "InputOutputBinding",
            isMany: !0
          }]
        }, {
          name: "FlowNode",
          isAbstract: !0,
          superClass: ["FlowElement"],
          properties: [{name: "incoming", type: "SequenceFlow", isMany: !0, isReference: !0}, {
            name: "outgoing",
            type: "SequenceFlow",
            isMany: !0,
            isReference: !0
          }, {name: "lanes", type: "Lane", isVirtual: !0, isMany: !0, isReference: !0}]
        }, {
          name: "CorrelationPropertyRetrievalExpression",
          superClass: ["BaseElement"],
          properties: [{name: "messagePath", type: "FormalExpression"}, {
            name: "messageRef",
            type: "Message",
            isAttr: !0,
            isReference: !0
          }]
        }, {
          name: "CorrelationPropertyBinding",
          superClass: ["BaseElement"],
          properties: [{name: "dataPath", type: "FormalExpression"}, {
            name: "correlationPropertyRef",
            type: "CorrelationProperty",
            isAttr: !0,
            isReference: !0
          }]
        }, {
          name: "Resource",
          superClass: ["RootElement"],
          properties: [{name: "name", isAttr: !0, type: "String"}, {
            name: "resourceParameters",
            type: "ResourceParameter",
            isMany: !0
          }]
        }, {
          name: "ResourceParameter",
          superClass: ["BaseElement"],
          properties: [{name: "name", isAttr: !0, type: "String"}, {
            name: "isRequired",
            isAttr: !0,
            type: "Boolean"
          }, {name: "type", type: "ItemDefinition", isAttr: !0, isReference: !0}]
        }, {
          name: "CorrelationSubscription",
          superClass: ["BaseElement"],
          properties: [{
            name: "correlationKeyRef",
            type: "CorrelationKey",
            isAttr: !0,
            isReference: !0
          }, {name: "correlationPropertyBinding", type: "CorrelationPropertyBinding", isMany: !0}]
        }, {
          name: "MessageFlow",
          superClass: ["BaseElement"],
          properties: [{name: "name", isAttr: !0, type: "String"}, {
            name: "sourceRef",
            type: "InteractionNode",
            isAttr: !0,
            isReference: !0
          }, {name: "targetRef", type: "InteractionNode", isAttr: !0, isReference: !0}, {
            name: "messageRef",
            type: "Message",
            isAttr: !0,
            isReference: !0
          }]
        }, {
          name: "MessageFlowAssociation",
          superClass: ["BaseElement"],
          properties: [{
            name: "innerMessageFlowRef",
            type: "MessageFlow",
            isAttr: !0,
            isReference: !0
          }, {name: "outerMessageFlowRef", type: "MessageFlow", isAttr: !0, isReference: !0}]
        }, {
          name: "InteractionNode",
          isAbstract: !0,
          properties: [{
            name: "incomingConversationLinks",
            type: "ConversationLink",
            isVirtual: !0,
            isMany: !0,
            isReference: !0
          }, {name: "outgoingConversationLinks", type: "ConversationLink", isVirtual: !0, isMany: !0, isReference: !0}]
        }, {
          name: "Participant",
          superClass: ["InteractionNode", "BaseElement"],
          properties: [{name: "name", isAttr: !0, type: "String"}, {
            name: "interfaceRefs",
            type: "Interface",
            isMany: !0,
            isReference: !0
          }, {name: "participantMultiplicity", type: "ParticipantMultiplicity"}, {
            name: "endPointRefs",
            type: "EndPoint",
            isMany: !0,
            isReference: !0
          }, {name: "processRef", type: "Process", isAttr: !0, isReference: !0}]
        }, {
          name: "ParticipantAssociation",
          superClass: ["BaseElement"],
          properties: [{
            name: "innerParticipantRef",
            type: "Participant",
            isAttr: !0,
            isReference: !0
          }, {name: "outerParticipantRef", type: "Participant", isAttr: !0, isReference: !0}]
        }, {
          name: "ParticipantMultiplicity",
          properties: [{name: "minimum", "default": 0, isAttr: !0, type: "Integer"}, {
            name: "maximum",
            "default": 1,
            isAttr: !0,
            type: "Integer"
          }]
        }, {
          name: "Collaboration",
          superClass: ["RootElement"],
          properties: [{name: "name", isAttr: !0, type: "String"}, {
            name: "isClosed",
            isAttr: !0,
            type: "Boolean"
          }, {name: "choreographyRef", type: "Choreography", isMany: !0, isReference: !0}, {
            name: "artifacts",
            type: "Artifact",
            isMany: !0
          }, {
            name: "participantAssociations",
            type: "ParticipantAssociation",
            isMany: !0
          }, {
            name: "messageFlowAssociations",
            type: "MessageFlowAssociation",
            isMany: !0
          }, {name: "conversationAssociations", type: "ConversationAssociation"}, {
            name: "participants",
            type: "Participant",
            isMany: !0
          }, {name: "messageFlows", type: "MessageFlow", isMany: !0}, {
            name: "correlationKeys",
            type: "CorrelationKey",
            isMany: !0
          }, {name: "conversations", type: "ConversationNode", isMany: !0}, {
            name: "conversationLinks",
            type: "ConversationLink",
            isMany: !0
          }]
        }, {
          name: "ChoreographyActivity",
          isAbstract: !0,
          superClass: ["FlowNode"],
          properties: [{
            name: "participantRefs",
            type: "Participant",
            isMany: !0,
            isReference: !0
          }, {
            name: "initiatingParticipantRef",
            type: "Participant",
            isAttr: !0,
            isReference: !0
          }, {name: "correlationKeys", type: "CorrelationKey", isMany: !0}, {
            name: "loopType",
            type: "ChoreographyLoopType",
            "default": "None",
            isAttr: !0
          }]
        }, {
          name: "CallChoreography",
          superClass: ["ChoreographyActivity"],
          properties: [{
            name: "calledChoreographyRef",
            type: "Choreography",
            isAttr: !0,
            isReference: !0
          }, {name: "participantAssociations", type: "ParticipantAssociation", isMany: !0}]
        }, {
          name: "SubChoreography",
          superClass: ["ChoreographyActivity", "FlowElementsContainer"],
          properties: [{name: "artifacts", type: "Artifact", isMany: !0}]
        }, {
          name: "ChoreographyTask",
          superClass: ["ChoreographyActivity"],
          properties: [{name: "messageFlowRef", type: "MessageFlow", isMany: !0, isReference: !0}]
        }, {
          name: "Choreography",
          superClass: ["FlowElementsContainer", "Collaboration"]
        }, {
          name: "GlobalChoreographyTask",
          superClass: ["Choreography"],
          properties: [{name: "initiatingParticipantRef", type: "Participant", isAttr: !0, isReference: !0}]
        }, {
          name: "TextAnnotation",
          superClass: ["Artifact"],
          properties: [{name: "text", type: "String"}, {
            name: "textFormat",
            "default": "text/plain",
            isAttr: !0,
            type: "String"
          }]
        }, {
          name: "Group",
          superClass: ["Artifact"],
          properties: [{name: "categoryValueRef", type: "CategoryValue", isAttr: !0, isReference: !0}]
        }, {
          name: "Association",
          superClass: ["Artifact"],
          properties: [{name: "associationDirection", type: "AssociationDirection", isAttr: !0}, {
            name: "sourceRef",
            type: "BaseElement",
            isAttr: !0,
            isReference: !0
          }, {name: "targetRef", type: "BaseElement", isAttr: !0, isReference: !0}]
        }, {
          name: "Category",
          superClass: ["RootElement"],
          properties: [{name: "categoryValue", type: "CategoryValue", isMany: !0}, {
            name: "name",
            isAttr: !0,
            type: "String"
          }]
        }, {name: "Artifact", isAbstract: !0, superClass: ["BaseElement"]}, {
          name: "CategoryValue",
          superClass: ["BaseElement"],
          properties: [{
            name: "categorizedFlowElements",
            type: "FlowElement",
            isVirtual: !0,
            isMany: !0,
            isReference: !0
          }, {name: "value", isAttr: !0, type: "String"}]
        }, {
          name: "Activity",
          isAbstract: !0,
          superClass: ["FlowNode"],
          properties: [{
            name: "isForCompensation",
            "default": !1,
            isAttr: !0,
            type: "Boolean"
          }, {name: "loopCharacteristics", type: "LoopCharacteristics"}, {
            name: "resources",
            type: "ResourceRole",
            isMany: !0
          }, {name: "default", type: "SequenceFlow", isAttr: !0, isReference: !0}, {
            name: "properties",
            type: "Property",
            isMany: !0
          }, {name: "ioSpecification", type: "InputOutputSpecification"}, {
            name: "boundaryEventRefs",
            type: "BoundaryEvent",
            isMany: !0,
            isReference: !0
          }, {name: "dataInputAssociations", type: "DataInputAssociation", isMany: !0}, {
            name: "dataOutputAssociations",
            type: "DataOutputAssociation",
            isMany: !0
          }, {name: "startQuantity", "default": 1, isAttr: !0, type: "Integer"}, {
            name: "completionQuantity",
            "default": 1,
            isAttr: !0,
            type: "Integer"
          }]
        }, {
          name: "ServiceTask",
          superClass: ["Task"],
          properties: [{name: "implementation", isAttr: !0, type: "String"}, {
            name: "operationRef",
            type: "Operation",
            isAttr: !0,
            isReference: !0
          }]
        }, {
          name: "SubProcess",
          superClass: ["Activity", "FlowElementsContainer"],
          properties: [{name: "triggeredByEvent", "default": !1, isAttr: !0, type: "Boolean"}, {
            name: "artifacts",
            type: "Artifact",
            isMany: !0
          }]
        }, {
          name: "LoopCharacteristics",
          isAbstract: !0,
          superClass: ["BaseElement"]
        }, {
          name: "MultiInstanceLoopCharacteristics",
          superClass: ["LoopCharacteristics"],
          properties: [{name: "isSequential", "default": !1, isAttr: !0, type: "Boolean"}, {
            name: "behavior",
            type: "MultiInstanceBehavior",
            "default": "All",
            isAttr: !0
          }, {name: "loopCardinality", type: "Expression", serialize: "xsi:type"}, {
            name: "loopDataInputRef",
            type: "ItemAwareElement",
            isAttr: !0,
            isReference: !0
          }, {name: "loopDataOutputRef", type: "ItemAwareElement", isAttr: !0, isReference: !0}, {
            name: "inputDataItem",
            type: "DataInput"
          }, {name: "outputDataItem", type: "DataOutput"}, {
            name: "completionCondition",
            type: "Expression",
            serialize: "xsi:type"
          }, {
            name: "complexBehaviorDefinition",
            type: "ComplexBehaviorDefinition",
            isMany: !0
          }, {
            name: "oneBehaviorEventRef",
            type: "EventDefinition",
            isAttr: !0,
            isReference: !0
          }, {name: "noneBehaviorEventRef", type: "EventDefinition", isAttr: !0, isReference: !0}]
        }, {
          name: "StandardLoopCharacteristics",
          superClass: ["LoopCharacteristics"],
          properties: [{name: "testBefore", "default": !1, isAttr: !0, type: "Boolean"}, {
            name: "loopCondition",
            type: "Expression",
            serialize: "xsi:type"
          }, {name: "loopMaximum", type: "Expression", serialize: "xsi:type"}]
        }, {
          name: "CallActivity",
          superClass: ["Activity"],
          properties: [{name: "calledElement", type: "String", isAttr: !0}]
        }, {name: "Task", superClass: ["Activity", "InteractionNode"]}, {
          name: "SendTask",
          superClass: ["Task"],
          properties: [{name: "implementation", isAttr: !0, type: "String"}, {
            name: "operationRef",
            type: "Operation",
            isAttr: !0,
            isReference: !0
          }, {name: "messageRef", type: "Message", isAttr: !0, isReference: !0}]
        }, {
          name: "ReceiveTask",
          superClass: ["Task"],
          properties: [{name: "implementation", isAttr: !0, type: "String"}, {
            name: "instantiate",
            "default": !1,
            isAttr: !0,
            type: "Boolean"
          }, {name: "operationRef", type: "Operation", isAttr: !0, isReference: !0}, {
            name: "messageRef",
            type: "Message",
            isAttr: !0,
            isReference: !0
          }]
        }, {
          name: "ScriptTask",
          superClass: ["Task"],
          properties: [{name: "scriptFormat", isAttr: !0, type: "String"}, {name: "script", type: "String"}]
        }, {
          name: "BusinessRuleTask",
          superClass: ["Task"],
          properties: [{name: "implementation", isAttr: !0, type: "String"}]
        }, {
          name: "AdHocSubProcess",
          superClass: ["SubProcess"],
          properties: [{name: "completionCondition", type: "Expression", serialize: "xsi:type"}, {
            name: "ordering",
            type: "AdHocOrdering",
            isAttr: !0
          }, {name: "cancelRemainingInstances", "default": !0, isAttr: !0, type: "Boolean"}]
        }, {
          name: "Transaction",
          superClass: ["SubProcess"],
          properties: [{name: "protocol", isAttr: !0, type: "String"}, {name: "method", isAttr: !0, type: "String"}]
        }, {
          name: "GlobalScriptTask",
          superClass: ["GlobalTask"],
          properties: [{name: "scriptLanguage", isAttr: !0, type: "String"}, {
            name: "script",
            isAttr: !0,
            type: "String"
          }]
        }, {
          name: "GlobalBusinessRuleTask",
          superClass: ["GlobalTask"],
          properties: [{name: "implementation", isAttr: !0, type: "String"}]
        }, {
          name: "ComplexBehaviorDefinition",
          superClass: ["BaseElement"],
          properties: [{name: "condition", type: "FormalExpression"}, {name: "event", type: "ImplicitThrowEvent"}]
        }, {
          name: "ResourceRole",
          superClass: ["BaseElement"],
          properties: [{
            name: "resourceRef",
            type: "Resource",
            isAttr: !0,
            isReference: !0
          }, {
            name: "resourceParameterBindings",
            type: "ResourceParameterBinding",
            isMany: !0
          }, {name: "resourceAssignmentExpression", type: "ResourceAssignmentExpression"}, {
            name: "name",
            isAttr: !0,
            type: "String"
          }]
        }, {
          name: "ResourceParameterBinding",
          properties: [{name: "expression", type: "Expression", serialize: "xsi:type"}, {
            name: "parameterRef",
            type: "ResourceParameter",
            isAttr: !0,
            isReference: !0
          }]
        }, {
          name: "ResourceAssignmentExpression",
          properties: [{name: "expression", type: "Expression", serialize: "xsi:type"}]
        }, {
          name: "Import",
          properties: [{name: "importType", isAttr: !0, type: "String"}, {
            name: "location",
            isAttr: !0,
            type: "String"
          }, {name: "namespace", isAttr: !0, type: "String"}]
        }, {
          name: "Definitions",
          superClass: ["BaseElement"],
          properties: [{name: "name", isAttr: !0, type: "String"}, {
            name: "targetNamespace",
            isAttr: !0,
            type: "String"
          }, {
            name: "expressionLanguage",
            "default": "http://www.w3.org/1999/XPath",
            isAttr: !0,
            type: "String"
          }, {
            name: "typeLanguage",
            "default": "http://www.w3.org/2001/XMLSchema",
            isAttr: !0,
            type: "String"
          }, {name: "imports", type: "Import", isMany: !0}, {
            name: "extensions",
            type: "Extension",
            isMany: !0
          }, {name: "relationships", type: "Relationship", isMany: !0}, {
            name: "rootElements",
            type: "RootElement",
            isMany: !0
          }, {name: "diagrams", isMany: !0, type: "bpmndi:BPMNDiagram"}, {
            name: "exporter",
            isAttr: !0,
            type: "String"
          }, {name: "exporterVersion", isAttr: !0, type: "String"}]
        }],
        emumerations: [{
          name: "ProcessType",
          literalValues: [{name: "None"}, {name: "Public"}, {name: "Private"}]
        }, {
          name: "GatewayDirection",
          literalValues: [{name: "Unspecified"}, {name: "Converging"}, {name: "Diverging"}, {name: "Mixed"}]
        }, {
          name: "EventBasedGatewayType",
          literalValues: [{name: "Parallel"}, {name: "Exclusive"}]
        }, {
          name: "RelationshipDirection",
          literalValues: [{name: "None"}, {name: "Forward"}, {name: "Backward"}, {name: "Both"}]
        }, {
          name: "ItemKind",
          literalValues: [{name: "Physical"}, {name: "Information"}]
        }, {
          name: "ChoreographyLoopType",
          literalValues: [{name: "None"}, {name: "Standard"}, {name: "MultiInstanceSequential"}, {name: "MultiInstanceParallel"}]
        }, {
          name: "AssociationDirection",
          literalValues: [{name: "None"}, {name: "One"}, {name: "Both"}]
        }, {
          name: "MultiInstanceBehavior",
          literalValues: [{name: "None"}, {name: "One"}, {name: "All"}, {name: "Complex"}]
        }, {name: "AdHocOrdering", literalValues: [{name: "Parallel"}, {name: "Sequential"}]}],
        prefix: "bpmn",
        xml: {tagAlias: "lowerCase", typePrefix: "t"}
      }
    }, {}],
    32: [function (e, t) {
      t.exports = {
        name: "BPMNDI",
        uri: "http://www.omg.org/spec/BPMN/20100524/DI",
        types: [{
          name: "BPMNDiagram",
          properties: [{name: "plane", type: "BPMNPlane", redefines: "di:Diagram#rootElement"}, {
            name: "labelStyle",
            type: "BPMNLabelStyle",
            isMany: !0
          }],
          superClass: ["di:Diagram"]
        }, {
          name: "BPMNPlane",
          properties: [{
            name: "bpmnElement",
            isAttr: !0,
            isReference: !0,
            type: "bpmn:BaseElement",
            redefines: "di:DiagramElement#modelElement"
          }],
          superClass: ["di:Plane"]
        }, {
          name: "BPMNShape",
          properties: [{
            name: "bpmnElement",
            isAttr: !0,
            isReference: !0,
            type: "bpmn:BaseElement",
            redefines: "di:DiagramElement#modelElement"
          }, {name: "isHorizontal", isAttr: !0, type: "Boolean"}, {
            name: "isExpanded",
            isAttr: !0,
            type: "Boolean"
          }, {name: "isMarkerVisible", isAttr: !0, type: "Boolean"}, {
            name: "label",
            type: "BPMNLabel"
          }, {name: "isMessageVisible", isAttr: !0, type: "Boolean"}, {
            name: "participantBandKind",
            type: "ParticipantBandKind",
            isAttr: !0
          }, {name: "choreographyActivityShape", type: "BPMNShape", isAttr: !0, isReference: !0}],
          superClass: ["di:LabeledShape"]
        }, {
          name: "BPMNEdge",
          properties: [{name: "label", type: "BPMNLabel"}, {
            name: "bpmnElement",
            isAttr: !0,
            isReference: !0,
            type: "bpmn:BaseElement",
            redefines: "di:DiagramElement#modelElement"
          }, {
            name: "sourceElement",
            isAttr: !0,
            isReference: !0,
            type: "di:DiagramElement",
            redefines: "di:Edge#source"
          }, {
            name: "targetElement",
            isAttr: !0,
            isReference: !0,
            type: "di:DiagramElement",
            redefines: "di:Edge#target"
          }, {name: "messageVisibleKind", type: "MessageVisibleKind", isAttr: !0, "default": "initiating"}],
          superClass: ["di:LabeledEdge"]
        }, {
          name: "BPMNLabel",
          properties: [{
            name: "labelStyle",
            type: "BPMNLabelStyle",
            isAttr: !0,
            isReference: !0,
            redefines: "di:DiagramElement#style"
          }],
          superClass: ["di:Label"]
        }, {name: "BPMNLabelStyle", properties: [{name: "font", type: "dc:Font"}], superClass: ["di:Style"]}],
        emumerations: [{
          name: "ParticipantBandKind",
          literalValues: [{name: "top_initiating"}, {name: "middle_initiating"}, {name: "bottom_initiating"}, {name: "top_non_initiating"}, {name: "middle_non_initiating"}, {name: "bottom_non_initiating"}]
        }, {name: "MessageVisibleKind", literalValues: [{name: "initiating"}, {name: "non_initiating"}]}],
        associations: [],
        prefix: "bpmndi"
      }
    }, {}],
    33: [function (e, t) {
      t.exports = {
        name: "DC",
        uri: "http://www.omg.org/spec/DD/20100524/DC",
        types: [{name: "Boolean"}, {name: "Integer"}, {name: "Real"}, {name: "String"}, {
          name: "Font",
          properties: [{name: "name", type: "String", isAttr: !0}, {
            name: "size",
            type: "Real",
            isAttr: !0
          }, {name: "isBold", type: "Boolean", isAttr: !0}, {
            name: "isItalic",
            type: "Boolean",
            isAttr: !0
          }, {name: "isUnderline", type: "Boolean", isAttr: !0}, {name: "isStrikeThrough", type: "Boolean", isAttr: !0}]
        }, {
          name: "Point",
          properties: [{name: "x", type: "Real", "default": "0", isAttr: !0}, {
            name: "y",
            type: "Real",
            "default": "0",
            isAttr: !0
          }]
        }, {
          name: "Bounds",
          properties: [{name: "x", type: "Real", "default": "0", isAttr: !0}, {
            name: "y",
            type: "Real",
            "default": "0",
            isAttr: !0
          }, {name: "width", type: "Real", isAttr: !0}, {name: "height", type: "Real", isAttr: !0}]
        }],
        prefix: "dc",
        associations: []
      }
    }, {}],
    34: [function (e, t) {
      t.exports = {
        name: "DI",
        uri: "http://www.omg.org/spec/DD/20100524/DI",
        types: [{
          name: "DiagramElement",
          isAbstract: !0,
          properties: [{name: "extension", type: "Extension"}, {
            name: "owningDiagram",
            type: "Diagram",
            isReadOnly: !0,
            isVirtual: !0,
            isReference: !0
          }, {
            name: "owningElement",
            type: "DiagramElement",
            isReadOnly: !0,
            isVirtual: !0,
            isReference: !0
          }, {name: "modelElement", isReadOnly: !0, isVirtual: !0, isReference: !0, type: "Element"}, {
            name: "style",
            type: "Style",
            isReadOnly: !0,
            isVirtual: !0,
            isReference: !0
          }, {name: "ownedElement", type: "DiagramElement", isReadOnly: !0, isVirtual: !0, isMany: !0}]
        }, {name: "Node", isAbstract: !0, superClass: ["DiagramElement"]}, {
          name: "Edge",
          isAbstract: !0,
          superClass: ["DiagramElement"],
          properties: [{
            name: "source",
            type: "DiagramElement",
            isReadOnly: !0,
            isVirtual: !0,
            isReference: !0
          }, {
            name: "target",
            type: "DiagramElement",
            isReadOnly: !0,
            isVirtual: !0,
            isReference: !0
          }, {name: "waypoint", isUnique: !1, isMany: !0, type: "dc:Point", serialize: "xsi:type"}]
        }, {
          name: "Diagram",
          isAbstract: !0,
          properties: [{name: "rootElement", type: "DiagramElement", isReadOnly: !0, isVirtual: !0}, {
            name: "name",
            isAttr: !0,
            type: "String"
          }, {name: "documentation", isAttr: !0, type: "String"}, {
            name: "resolution",
            isAttr: !0,
            type: "Real"
          }, {name: "ownedStyle", type: "Style", isReadOnly: !0, isVirtual: !0, isMany: !0}]
        }, {
          name: "Shape",
          isAbstract: !0,
          superClass: ["Node"],
          properties: [{name: "bounds", type: "dc:Bounds"}]
        }, {
          name: "Plane",
          isAbstract: !0,
          superClass: ["Node"],
          properties: [{
            name: "planeElement",
            type: "DiagramElement",
            subsettedProperty: "DiagramElement-ownedElement",
            isMany: !0
          }]
        }, {
          name: "LabeledEdge",
          isAbstract: !0,
          superClass: ["Edge"],
          properties: [{
            name: "ownedLabel",
            type: "Label",
            isReadOnly: !0,
            subsettedProperty: "DiagramElement-ownedElement",
            isVirtual: !0,
            isMany: !0
          }]
        }, {
          name: "LabeledShape",
          isAbstract: !0,
          superClass: ["Shape"],
          properties: [{
            name: "ownedLabel",
            type: "Label",
            isReadOnly: !0,
            subsettedProperty: "DiagramElement-ownedElement",
            isVirtual: !0,
            isMany: !0
          }]
        }, {
          name: "Label",
          isAbstract: !0,
          superClass: ["Node"],
          properties: [{name: "bounds", type: "dc:Bounds"}]
        }, {name: "Style", isAbstract: !0}, {
          name: "Extension",
          properties: [{name: "values", type: "Element", isMany: !0}]
        }],
        associations: [],
        prefix: "di",
        xml: {tagAlias: "lowerCase"}
      }
    }, {}],
    35: [function (e, t) {
      t.exports = e(36)
    }, {36: 36}],
    36: [function (e, t) {
      function n(e) {
        function t(e) {
          return i.indexOf(e) >= 0
        }

        function n(e) {
          i.push(e)
        }

        function r(e) {
          t(e) || ((e.__depends__ || []).forEach(r), t(e) || (n(e), (e.__init__ || []).forEach(function (e) {
            o.push(e)
          })))
        }

        var i = [], o = [];
        e.forEach(r);
        var s = new a.Injector(i);
        return o.forEach(function (e) {
          try {
            s["string" == typeof e ? "get" : "invoke"](e)
          } catch (t) {
            throw console.error("Failed to instantiate component"), console.error(t.stack), t
          }
        }), s
      }

      function r(t) {
        t = t || {};
        var r = {config: ["value", t]}, i = e(42), a = [r, i].concat(t.modules || []);
        return n(a)
      }

      function i(e, t) {
        this.injector = t = t || r(e), this.get = t.get, this.invoke = t.invoke, this.get("eventBus").fire("diagram.init")
      }

      var a = e(73);
      t.exports = i, i.prototype.destroy = function () {
        this.get("eventBus").fire("diagram.destroy")
      }
    }, {42: 42, 73: 73}],
    37: [function (e, t) {
      function n(e, t) {
        return Math.round(e * t) / t
      }

      function r(e) {
        return u(e) ? e + "px" : e
      }

      function i(e) {
        e = l({}, {width: "100%", height: "100%"}, e);
        var t = e.container || document.body, n = document.createElement("div");
        return n.setAttribute("class", "djs-container"), l(n.style, {
          position: "relative",
          overflow: "hidden",
          width: r(e.width),
          height: r(e.height)
        }), t.appendChild(n), n
      }

      function a(e, t) {
        return e.group().attr({"class": t})
      }

      function o(e, t, n, r) {
        this._eventBus = t, this._elementRegistry = r, this._graphicsFactory = n, this._init(e || {})
      }

      function s(e, t) {
        var n = "matrix(" + t.a + "," + t.b + "," + t.c + "," + t.d + "," + t.e + "," + t.f + ")";
        e.setAttribute("transform", n)
      }

      var u = e(153), l = e(159), c = e(80), p = e(62), f = e(71), d = "base";
      o.$inject = ["config.canvas", "eventBus", "graphicsFactory", "elementRegistry"], t.exports = o, o.prototype._init = function (e) {
        var t = this._eventBus, n = i(e), r = f.createSnapAt("100%", "100%", n), o = a(r, "viewport"), s = this;
        this._container = n, this._svg = r, this._viewport = o, this._layers = {}, t.on("diagram.init", function () {
          t.fire("canvas.init", {svg: r, viewport: o})
        }), t.on("diagram.destroy", function () {
          var e = s._container.parentNode;
          e && e.removeChild(n), t.fire("canvas.destroy", {
            svg: s._svg,
            viewport: s._viewport
          }), s._svg.remove(), s._svg = s._container = s._layers = s._viewport = null
        })
      }, o.prototype.getDefaultLayer = function () {
        return this.getLayer(d)
      }, o.prototype.getLayer = function (e) {
        if (!e)throw new Error("must specify a name");
        var t = this._layers[e];
        return t || (t = this._layers[e] = a(this._viewport, "layer-" + e)), t
      }, o.prototype.getContainer = function () {
        return this._container
      }, o.prototype._updateMarker = function (e, t, n) {
        var r;
        e.id || (e = this._elementRegistry.get(e)), r = this.getGraphics(e), r && (r[n ? "addClass" : "removeClass"](t), this._eventBus.fire("element.marker.update", {
          element: e,
          gfx: r,
          marker: t,
          add: !!n
        }))
      }, o.prototype.addMarker = function (e, t) {
        this._updateMarker(e, t, !0)
      }, o.prototype.removeMarker = function (e, t) {
        this._updateMarker(e, t, !1)
      }, o.prototype.hasMarker = function (e, t) {
        e.id || (e = this._elementRegistry.get(e));
        var n = this.getGraphics(e);
        return n && n.hasClass(t)
      }, o.prototype.toggleMarker = function (e, t) {
        this.hasMarker(e, t) ? this.removeMarker(e, t) : this.addMarker(e, t)
      }, o.prototype.getRootElement = function () {
        return this._rootElement || this.setRootElement({id: "__implicitroot"}), this._rootElement
      }, o.prototype.setRootElement = function (e, t) {
        var n = this._rootElement, r = this._elementRegistry;
        if (n) {
          if (!t)throw new Error("rootElement already defined");
          r.remove(n)
        }
        return r.add(e, this.getDefaultLayer(), this._svg), this._rootElement = e, e
      }, o.prototype._ensureValidId = function (e) {
        if (!e.id)throw new Error("element must have an id");
        if (this._elementRegistry.get(e.id))throw new Error("element with id " + e.id + " already exists")
      }, o.prototype._setParent = function (e, t) {
        p.add(t.children, e), e.parent = t
      }, o.prototype._addElement = function (e, t, n) {
        n = n || this.getRootElement();
        var r = this._eventBus, i = this._graphicsFactory;
        this._ensureValidId(t), r.fire(e + ".add", {element: t, parent: n}), this._setParent(t, n);
        var a = i.create(e, t);
        return this._elementRegistry.add(t, a), i.update(e, t, a), r.fire(e + ".added", {element: t, gfx: a}), t
      }, o.prototype.addShape = function (e, t) {
        return this._addElement("shape", e, t)
      }, o.prototype.addConnection = function (e, t) {
        return this._addElement("connection", e, t)
      }, o.prototype._removeElement = function (e, t) {
        var n = this._elementRegistry, r = this._graphicsFactory, i = this._eventBus;
        return (e = n.get(e.id || e)) ? (i.fire(t + ".remove", {element: e}), r.remove(e), p.remove(e.parent && e.parent.children, e), e.parent = null, i.fire(t + ".removed", {element: e}), n.remove(e), e) : void 0
      }, o.prototype.removeShape = function (e) {
        return this._removeElement(e, "shape")
      }, o.prototype.removeConnection = function (e) {
        return this._removeElement(e, "connection")
      }, o.prototype.sendToFront = function (e, t) {
        t !== !1 && (t = !0), t && e.parent && this.sendToFront(e.parent), c(e.children, function (e) {
          this.sendToFront(e, !1)
        }, this);
        var n = this.getGraphics(e), r = n.parent();
        n.remove().appendTo(r)
      }, o.prototype.getGraphics = function (e) {
        return this._elementRegistry.getGraphics(e)
      }, o.prototype._fireViewboxChange = function () {
        this._eventBus.fire("canvas.viewbox.changed", {viewbox: this.viewbox(!1)})
      }, o.prototype.viewbox = function (e) {
        if (void 0 === e && this._cachedViewbox)return this._cachedViewbox;
        var t, r, i, a, o, s = this._viewport, u = this.getSize();
        return e ? (i = Math.min(u.width / e.width, u.height / e.height), r = (new f.Matrix).scale(i).translate(-e.x, -e.y), s.transform(r), this._fireViewboxChange(), e) : (t = this.getDefaultLayer().getBBox(!0), r = s.transform().localMatrix, i = n(r.a, 1e3), a = n(-r.e || 0, 1e3), o = n(-r.f || 0, 1e3), e = this._cachedViewbox = {
          x: a ? a / i : 0,
          y: o ? o / i : 0,
          width: u.width / i,
          height: u.height / i,
          scale: i,
          inner: {width: t.width, height: t.height, x: t.x, y: t.y},
          outer: u
        })
      }, o.prototype.scroll = function (e) {
        var t = this._viewport.node, n = t.getCTM();
        return e && (e = l({
          dx: 0,
          dy: 0
        }, e || {}), n = this._svg.node.createSVGMatrix().translate(e.dx, e.dy).multiply(n), s(t, n), this._fireViewboxChange()), {
          x: n.e,
          y: n.f
        }
      }, o.prototype.zoom = function (e, t) {
        if ("fit-viewport" === e)return this._fitViewport(t);
        var r = this.viewbox();
        if (void 0 === e)return r.scale;
        var i = r.outer;
        "auto" === t && (t = {x: i.width / 2, y: i.height / 2});
        var a = this._setZoom(e, t);
        return this._fireViewboxChange(), n(a.a, 1e3)
      }, o.prototype._fitViewport = function (e) {
        var t, n, r = this.viewbox(), i = r.outer, a = r.inner;
        return a.x >= 0 && a.y >= 0 && a.x + a.width <= i.width && a.y + a.height <= i.height && !e ? n = {
          x: 0,
          y: 0,
          width: Math.max(a.width + a.x, i.width),
          height: Math.max(a.height + a.y, i.height)
        } : (t = Math.min(1, i.width / a.width, i.height / a.height), n = {
          x: a.x + (e ? a.width / 2 - i.width / t / 2 : 0),
          y: a.y + (e ? a.height / 2 - i.height / t / 2 : 0),
          width: i.width / t,
          height: i.height / t
        }), this.viewbox(n), this.viewbox().scale
      }, o.prototype._setZoom = function (e, t) {
        var n, r, i, a, o, u = this._svg.node, c = this._viewport.node, p = u.createSVGMatrix(), f = u.createSVGPoint();
        i = c.getCTM();
        var d = i.a;
        return t ? (n = l(f, t), r = n.matrixTransform(i.inverse()), a = p.translate(r.x, r.y).scale(1 / d * e).translate(-r.x, -r.y), o = i.multiply(a)) : o = p.scale(e), s(this._viewport.node, o), o
      }, o.prototype.getSize = function () {
        return {width: this._container.clientWidth, height: this._container.clientHeight}
      }, o.prototype.getAbsoluteBBox = function (e) {
        var t, n = this.viewbox();
        if (e.waypoints) {
          var r = this.getGraphics(e), i = r.getBBox(!0);
          t = r.getBBox(), t.x -= i.x, t.y -= i.y, t.width += 2 * i.x, t.height += 2 * i.y
        } else t = e;
        var a = t.x * n.scale - n.x * n.scale, o = t.y * n.scale - n.y * n.scale, s = t.width * n.scale, u = t.height * n.scale;
        return {x: a, y: o, width: s, height: u}
      }
    }, {153: 153, 159: 159, 62: 62, 71: 71, 80: 80}],
    38: [function (e, t) {
      function n() {
        this._uid = 12
      }

      var r = e(56);
      t.exports = n, n.prototype.createRoot = function (e) {
        return this.create("root", e)
      }, n.prototype.createLabel = function (e) {
        return this.create("label", e)
      }, n.prototype.createShape = function (e) {
        return this.create("shape", e)
      }, n.prototype.createConnection = function (e) {
        return this.create("connection", e)
      }, n.prototype.create = function (e, t) {
        return t = t || {}, t.id || (t.id = e + "_" + this._uid++), r.create(e, t)
      }
    }, {56: 56}],
    39: [function (e, t) {
      function n() {
        this._elements = {}
      }

      var r = "data-element-id";
      t.exports = n, n.prototype.add = function (e, t, n) {
        var i = e.id;
        if (!i)throw new Error("element must have an id");
        if (this._elements[i])throw new Error("element with id " + i + " already added");
        t.attr(r, i), n && n.attr(r, i), this._elements[i] = {element: e, gfx: t, secondaryGfx: n}
      }, n.prototype.remove = function (e) {
        var t = this._elements, n = e.id || e, i = n && t[n];
        i && (i.gfx.attr(r, null), i.secondaryGfx && i.secondaryGfx.attr(r, null), delete t[n])
      }, n.prototype.get = function (e) {
        var t;
        t = "string" == typeof e ? e : e && e.attr(r);
        var n = this._elements[t];
        return n && n.element
      }, n.prototype.filter = function (e) {
        var t = this._elements, n = [];
        return Object.keys(t).forEach(function (r) {
          var i = t[r], a = i.element, o = i.gfx;
          e(a, o) && n.push(a)
        }), n
      }, n.prototype.getGraphics = function (e) {
        var t = e.id || e, n = this._elements[t];
        return n && n.gfx
      }
    }, {}],
    40: [function (e, t) {
      function n() {
      }

      function r() {
        this._listeners = {};
        var e = this;
        this.on("diagram.destroy", 1, function () {
          e._listeners = null
        })
      }

      var i = e(151), a = e(150), o = e(153), s = e(159), u = 1e3;
      n.prototype = {
        stopPropagation: function () {
          this.propagationStopped = !0
        }, preventDefault: function () {
          this.defaultPrevented = !0
        }, init: function (e) {
          s(this, e || {})
        }
      }, t.exports = r, t.exports.Event = n, r.prototype.on = function (e, t, n) {
        if (e = a(e) ? e : [e], i(t) && (n = t, t = u), !o(t))throw new Error("priority must be a number");
        var r = this, s = {priority: t, callback: n};
        e.forEach(function (e) {
          r._addListener(e, s)
        })
      }, r.prototype.once = function (e, t) {
        function n() {
          t.apply(r, arguments), r.off(e, n)
        }

        var r = this;
        this.on(e, n)
      }, r.prototype.off = function (e, t) {
        var n, r, i = this._getListeners(e);
        if (t)for (r = i.length - 1; n = i[r]; r--)n.callback === t && i.splice(r, 1); else i.length = 0
      }, r.prototype.fire = function (e, t) {
        var r, i, a, o, s, u;
        if (u = Array.prototype.slice.call(arguments), "string" == typeof e ? u.shift() : (r = e, e = r.type), !e)throw new Error("no event type specified");
        if (a = this._listeners[e], !a)return !0;
        t instanceof n ? r = t : (r = Object.create(n.prototype), r.init(t)), u[0] = r, i = r.type;
        try {
          for (e !== i && (r.type = e), o = 0, s; (s = a[o]) && !r.propagationStopped; o++)try {
            s.callback.apply(null, u) === !1 && r.preventDefault()
          } catch (l) {
            if (!this.handleError(l))throw console.error("unhandled error in event listener"), console.error(l.stack), l
          }
        } finally {
          e !== i && (r.type = i)
        }
        return r.defaultPrevented ? !1 : r.propagationStopped ? null : !0
      }, r.prototype.handleError = function (e) {
        return !this.fire("error", {error: e})
      }, r.prototype._addListener = function (e, t) {
        var n, r, i = this._getListeners(e);
        for (n = 0; r = i[n]; n++)if (r.priority < t.priority)return void i.splice(n, 0, t);
        i.push(t)
      }, r.prototype._getListeners = function (e) {
        var t = this._listeners[e];
        return t || (this._listeners[e] = t = []), t
      }
    }, {150: 150, 151: 151, 153: 153, 159: 159}],
    41: [function (e, t) {
      function n(e, t) {
        this._renderer = e, this._elementRegistry = t
      }

      var r = e(80), i = e(84), a = e(66), o = e(171);
      n.$inject = ["renderer", "elementRegistry"], t.exports = n, n.prototype._getChildren = function (e) {
        var t, n = this._elementRegistry.getGraphics(e);
        return e.parent ? (t = a.getChildren(n), t || (t = n.parent().group().attr("class", "djs-children"))) : t = n, t
      }, n.prototype._clear = function (e) {
        var t = a.getVisual(e);
        return o(t.node), t
      }, n.prototype._createContainer = function (e, t) {
        var n = t.group().attr("class", "djs-group"), r = n.group().attr("class", "djs-element djs-" + e);
        return r.group().attr("class", "djs-visual"), r
      }, n.prototype.create = function (e, t) {
        var n = this._getChildren(t.parent);
        return this._createContainer(e, n)
      }, n.prototype.updateContainments = function (e) {
        var t, n = this, a = this._elementRegistry;
        t = i(e, function (e, t) {
          return t.parent && (e[t.parent.id] = t.parent), e
        }, {}), r(t, function (e) {
          var t = n._getChildren(e), i = e.children;
          i && r(i.slice().reverse(), function (e) {
            var n = a.getGraphics(e);
            n.parent().prependTo(t)
          })
        })
      }, n.prototype.update = function (e, t, n) {
        var r = this._clear(n);
        if ("shape" === e)this._renderer.drawShape(r, t), n.translate(t.x, t.y); else {
          if ("connection" !== e)throw new Error("unknown type: " + e);
          this._renderer.drawConnection(r, t)
        }
        n.attr("display", t.hidden ? "none" : "block")
      }, n.prototype.remove = function (e) {
        var t = this._elementRegistry.getGraphics(e);
        t.parent().remove()
      }
    }, {171: 171, 66: 66, 80: 80, 84: 84}],
    42: [function (e, t) {
      t.exports = {
        __depends__: [e(45)],
        __init__: ["canvas"],
        canvas: ["type", e(37)],
        elementRegistry: ["type", e(39)],
        elementFactory: ["type", e(38)],
        eventBus: ["type", e(40)],
        graphicsFactory: ["type", e(41)]
      }
    }, {37: 37, 38: 38, 39: 39, 40: 40, 41: 41, 45: 45}],
    43: [function (e, t) {
      function n(e) {
        this.CONNECTION_STYLE = e.style(["no-fill"], {
          strokeWidth: 5,
          stroke: "fuchsia"
        }), this.SHAPE_STYLE = e.style({fill: "white", stroke: "fuchsia", strokeWidth: 2})
      }

      function r(e) {
        for (var t, n = "", r = 0; t = e[r]; r++)n += t.x + "," + t.y + " ";
        return n
      }

      function i(e, t) {
        return o.create("polyline", {points: r(e)}).attr(t || {})
      }

      function a(e, t) {
        return e.attr({points: r(t)})
      }

      var o = e(71);
      t.exports = n, n.$inject = ["styles"], n.prototype.drawShape = function (e, t) {
        return e.rect(0, 0, t.width || 0, t.height || 0, 10, 10).attr(this.SHAPE_STYLE)
      }, n.prototype.drawConnection = function (e, t) {
        return i(t.waypoints, this.CONNECTION_STYLE).appendTo(e)
      }, t.exports.createLine = i, t.exports.updateLine = a
    }, {71: 71}],
    44: [function (e, t) {
      function n() {
        var e = {"no-fill": {fill: "none"}, "no-border": {strokeOpacity: 0}, "no-events": {pointerEvents: "none"}};
        this.cls = function (e, t, n) {
          var r = this.style(t, n);
          return i(r, {"class": e})
        }, this.style = function (t, n) {
          r(t) || n || (n = t, t = []);
          var o = a(t, function (t, n) {
            return i(t, e[n] || {})
          }, {});
          return n ? i(o, n) : o
        }
      }

      var r = e(150), i = e(159), a = e(84);
      t.exports = n
    }, {150: 150, 159: 159, 84: 84}],
    45: [function (e, t) {
      t.exports = {renderer: ["type", e(43)], styles: ["type", e(44)]}
    }, {43: 43, 44: 44}],
    46: [function (e, t) {
      function n(e, t, n) {
        function a(n, r) {
          var i, a = r.delegateTarget || r.target, o = a && new u(a), s = t.get(o);
          o && s && (i = !e.fire(n, {element: s, gfx: o, originalEvent: r}), i && r.preventDefault())
        }

        function l(e) {
          var t = m[e];
          return t || (t = m[e] = function (t) {
            t.button || a(e, t)
          }), t
        }

        function c(e, t, n) {
          var r = l(n);
          r.$delegate = i.bind(e, v, t, r)
        }

        function p(e, t, n) {
          i.unbind(e, t, l(n).$delegate)
        }

        function f(e) {
          r(g, function (t, n) {
            c(e.node, n, t)
          })
        }

        function d(e) {
          r(g, function (t, n) {
            p(e.node, n, t)
          })
        }

        var h = n.cls("djs-hit", ["no-fill", "no-border"], {
          stroke: "white",
          strokeWidth: 15
        }), m = {}, g = {
          mouseover: "element.hover",
          mouseout: "element.out",
          click: "element.click",
          dblclick: "element.dblclick",
          mousedown: "element.mousedown",
          mouseup: "element.mouseup"
        }, v = "svg, .djs-element";
        e.on("canvas.destroy", function (e) {
          d(e.svg)
        }), e.on("canvas.init", function (e) {
          f(e.svg)
        }), e.on(["shape.added", "connection.added"], function (e) {
          var t, n, r = e.element, i = e.gfx;
          r.waypoints ? (t = o(r.waypoints), n = "connection") : (t = u.create("rect", {
            x: 0,
            y: 0,
            width: r.width,
            height: r.height
          }), n = "shape"), t.attr(h).appendTo(i.node)
        }), e.on("shape.changed", function (e) {
          var t = e.element, n = e.gfx, r = n.select(".djs-hit");
          r.attr({width: t.width, height: t.height})
        }), e.on("connection.changed", function (e) {
          var t = e.element, n = e.gfx, r = n.select(".djs-hit");
          s(r, t.waypoints)
        }), this.fire = a, this.mouseHandler = l, this.registerEvent = c, this.unregisterEvent = p
      }

      var r = e(80), i = e(172), a = e(43), o = a.createLine, s = a.updateLine, u = e(71);
      n.$inject = ["eventBus", "elementRegistry", "styles"], t.exports = n
    }, {172: 172, 43: 43, 71: 71, 80: 80}],
    47: [function (e, t) {
      t.exports = {__init__: ["interactionEvents"], interactionEvents: ["type", e(46)]}
    }, {46: 46}],
    48: [function (e, t) {
      function n(e, t) {
        function n(e) {
          return r.create("rect", u).prependTo(e)
        }

        function a(e, t) {
          e.attr({x: -s, y: -s, width: t.width + 2 * s, height: t.height + 2 * s})
        }

        function o(e, t) {
          var n = i(t);
          e.attr({x: n.x - s, y: n.y - s, width: n.width + 2 * s, height: n.height + 2 * s})
        }

        var s = 6, u = t.cls("djs-outline", ["no-fill"]);
        e.on(["shape.added", "shape.changed"], function (e) {
          var t = e.element, r = e.gfx, i = r.select(".djs-outline");
          i || (i = n(r, t)), a(i, t)
        }), e.on(["connection.added", "connection.changed"], function (e) {
          var t = e.element, r = e.gfx, i = r.select(".djs-outline");
          i || (i = n(r, t)), o(i, t)
        })
      }

      var r = e(71), i = e(64).getBBox;
      n.$inject = ["eventBus", "styles", "elementRegistry"], t.exports = n
    }, {64: 64, 71: 71}],
    49: [function (e, t) {
      t.exports = {__init__: ["outline"], outline: ["type", e(48)]}
    }, {48: 48}],
    50: [function (e, t) {
      function n(e) {
        var t = d('<div class="djs-overlay-container" style="position: absolute; width: 0; height: 0;" />');
        return e.insertBefore(t, e.firstChild), t
      }

      function r(e, t, n) {
        l(e.style, {left: t + "px", top: n + "px"})
      }

      function i(e, t) {
        e.style.display = t === !1 ? "none" : ""
      }

      function a(e, t, r, i) {
        this._eventBus = t, this._canvas = r, this._elementRegistry = i, this._ids = v, this._overlayDefaults = {
          show: {
            trigger: "automatic",
            minZoom: .7,
            maxZoom: 5
          }
        }, this._overlays = {}, this._overlayContainers = {}, this._overlayRoot = n(r.getContainer()), this._init(e)
      }

      var o = e(150), s = e(156), u = e(154), l = e(159), c = e(80), p = e(78), f = e(87), d = e(173), h = e(170), m = e(176), g = e(64).getBBox, v = new (e(67))("ov");
      a.$inject = ["config.overlays", "eventBus", "canvas", "elementRegistry"], t.exports = a, a.prototype.get = function (e) {
        if (s(e) && (e = {id: e}), e.element) {
          var t = this._getOverlayContainer(e.element, !0);
          return t ? e.type ? p(t.overlays, {type: e.type}) : t.overlays.slice() : []
        }
        return e.type ? p(this._overlays, {type: e.type}) : e.id ? this._overlays[e.id] : null
      }, a.prototype.add = function (e, t, n) {
        if (u(t) && (n = t, t = null), e.id || (e = this._elementRegistry.get(e)), !n.position)throw new Error("must specifiy overlay position");
        if (!n.html)throw new Error("must specifiy overlay html");
        if (!e)throw new Error("invalid element specified");
        var r = this._ids.next();
        return n = l({}, this._overlayDefaults, n, {id: r, type: t, element: e, html: n.html}), this._addOverlay(n), r
      }, a.prototype.remove = function (e) {
        var t = this.get(e) || [];
        o(t) || (t = [t]);
        var n = this;
        c(t, function (e) {
          var t = n._getOverlayContainer(e.element, !0);
          if (e && (m(e.html), m(e.htmlContainer), delete e.htmlContainer, delete e.element, delete n._overlays[e.id]), t) {
            var r = t.overlays.indexOf(e);
            -1 !== r && t.overlays.splice(r, 1)
          }
        })
      }, a.prototype.show = function () {
        i(this._overlayRoot)
      }, a.prototype.hide = function () {
        i(this._overlayRoot, !1)
      }, a.prototype._updateOverlayContainer = function (e) {
        var t = e.element, n = e.html, i = t.x, a = t.y;
        if (t.waypoints) {
          var o = g(t);
          i = o.x, a = o.y
        }
        r(n, i, a)
      }, a.prototype._updateOverlay = function (e) {
        var t = e.position, n = e.htmlContainer, i = e.element, a = t.left, o = t.top;
        if (void 0 !== t.right) {
          var s;
          s = i.waypoints ? g(i).width : i.width, a = -1 * t.right + s
        }
        if (void 0 !== t.bottom) {
          var u;
          u = i.waypoints ? g(i).height : i.height, o = -1 * t.bottom + u
        }
        r(n, a || 0, o || 0)
      }, a.prototype._createOverlayContainer = function (e) {
        var t = d('<div class="djs-overlays djs-overlays-' + e.id + '" style="position: absolute" />');
        this._overlayRoot.appendChild(t);
        var n = {html: t, element: e, overlays: []};
        return this._updateOverlayContainer(n), n
      }, a.prototype._updateRoot = function (e) {
        var t = e.scale || 1, n = e.scale || 1, r = "matrix(" + t + ",0,0," + n + "," + -1 * e.x * t + "," + -1 * e.y * n + ")";
        this._overlayRoot.style.transform = r, this._overlayRoot.style["-ms-transform"] = r
      }, a.prototype._getOverlayContainer = function (e, t) {
        var n = e && e.id || e, r = this._overlayContainers[n];
        return r || t || (r = this._overlayContainers[n] = this._createOverlayContainer(e)), r
      }, a.prototype._addOverlay = function (e) {
        var t, n, r = e.id, i = e.element, a = e.html;
        a.get && (a = a.get(0)), s(a) && (a = d(a)), n = this._getOverlayContainer(i), t = d('<div id="' + r + '" class="djs-overlay" style="position: absolute">'), t.appendChild(a), e.type && h(t).add("djs-overlay-" + e.type), e.htmlContainer = t, n.overlays.push(e), n.html.appendChild(t), this._overlays[r] = e, this._updateOverlay(e)
      }, a.prototype._updateOverlayVisibilty = function (e) {
        c(this._overlays, function (t) {
          var n = t.show, r = t.htmlContainer, a = !0;
          n && ((n.minZoom > e.scale || n.maxZoom < e.scale) && (a = !1), i(r, a))
        })
      }, a.prototype._init = function (e) {
        var t = this._eventBus, n = this, r = function (e) {
          n._updateRoot(e), n._updateOverlayVisibilty(e), n.show()
        };
        e && e.deferUpdate === !1 || (r = f(r, 300)), t.on("canvas.viewbox.changed", function (e) {
          n.hide(), r(e.viewbox)
        }), t.on(["shape.remove", "connection.remove"], function (e) {
          var t = n.get({element: e.element});
          c(t, function (e) {
            n.remove(e.id)
          })
        }), t.on(["element.changed"], function (e) {
          var t = e.element, r = n._getOverlayContainer(t, !0);
          r && (c(r.overlays, function (e) {
            n._updateOverlay(e)
          }), n._updateOverlayContainer(r))
        }), t.on("element.marker.update", function (e) {
          var t = n._getOverlayContainer(e.element, !0);
          t && h(t.html)[e.add ? "add" : "remove"](e.marker)
        })
      }
    }, {150: 150, 154: 154, 156: 156, 159: 159, 170: 170, 173: 173, 176: 176, 64: 64, 67: 67, 78: 78, 80: 80, 87: 87}],
    51: [function (e, t) {
      t.exports = {__init__: ["overlays"], overlays: ["type", e(50)]}
    }, {50: 50}],
    52: [function (e, t) {
      function n(e) {
        this._eventBus = e, this._selectedElements = [];
        var t = this;
        e.on(["shape.remove", "connection.remove"], function (e) {
          var n = e.element;
          t.deselect(n)
        })
      }

      var r = e(150), i = e(80);
      n.$inject = ["eventBus"], t.exports = n, n.prototype.deselect = function (e) {
        var t = this._selectedElements, n = t.indexOf(e);
        if (-1 !== n) {
          var r = t.slice();
          t.splice(n, 1), this._eventBus.fire("selection.changed", {oldSelection: r, newSelection: t})
        }
      }, n.prototype.get = function () {
        return this._selectedElements
      }, n.prototype.isSelected = function (e) {
        return -1 !== this._selectedElements.indexOf(e)
      }, n.prototype.select = function (e, t) {
        var n = this._selectedElements, a = n.slice();
        r(e) || (e = e ? [e] : []), t ? i(e, function (e) {
          -1 === n.indexOf(e) && n.push(e)
        }) : this._selectedElements = n = e.slice(), this._eventBus.fire("selection.changed", {
          oldSelection: a,
          newSelection: n
        })
      }
    }, {150: 150, 80: 80}],
    53: [function (e, t) {
      function n(e, t, n) {
        e.on("create.end", 500, function (e) {
          e.context.canExecute && t.select(e.shape)
        }), e.on("connect.end", 500, function (e) {
          e.context.canExecute && e.context.target && t.select(e.context.target)
        }), e.on("shape.move.end", 500, function (e) {
          t.select(e.context.shapes)
        }), e.on("element.click", function (e) {
          var i = e.element;
          if (i === n.getRootElement() && (i = null), t.isSelected(i))t.deselect(i); else {
            var a = r(e) || e, o = a.shiftKey;
            a.altKey || t.select(i, o)
          }
        })
      }

      var r = e(65).getOriginal;
      n.$inject = ["eventBus", "selection", "canvas"], t.exports = n
    }, {65: 65}],
    54: [function (e, t) {
      function n(e, t) {
        function n(e, n) {
          t.addMarker(e, n)
        }

        function o(e, n) {
          t.removeMarker(e, n)
        }

        this._multiSelectionBox = null, e.on("element.hover", function (e) {
          n(e.element, i)
        }), e.on("element.out", function (e) {
          o(e.element, i)
        }), e.on("selection.changed", function (e) {
          function t(e) {
            o(e, a)
          }

          function i(e) {
            n(e, a)
          }

          var s = e.oldSelection, u = e.newSelection;
          r(s, function (e) {
            -1 === u.indexOf(e) && t(e)
          }), r(u, function (e) {
            -1 === s.indexOf(e) && i(e)
          })
        })
      }

      var r = e(80), i = "hover", a = "selected";
      n.$inject = ["eventBus", "canvas", "selection", "graphicsFactory", "styles"], t.exports = n
    }, {80: 80}],
    55: [function (e, t) {
      t.exports = {
        __init__: ["selectionVisuals", "selectionBehavior"],
        __depends__: [e(47), e(49)],
        selection: ["type", e(52)],
        selectionVisuals: ["type", e(54)],
        selectionBehavior: ["type", e(53)]
      }
    }, {47: 47, 49: 49, 52: 52, 53: 53, 54: 54}],
    56: [function (e, t) {
      function n() {
        Object.defineProperty(this, "businessObject", {writable: !0}), l.bind(this, "parent"), c.bind(this, "label"), p.bind(this, "outgoing"), f.bind(this, "incoming")
      }

      function r() {
        n.call(this), l.bind(this, "children")
      }

      function i() {
        r.call(this)
      }

      function a() {
        r.call(this), c.bind(this, "labelTarget")
      }

      function o() {
        n.call(this), p.bind(this, "source"), f.bind(this, "target")
      }

      var s = e(159), u = e(185), l = new u({
        name: "children",
        enumerable: !0,
        collection: !0
      }, {name: "parent"}), c = new u({
        name: "label",
        enumerable: !0
      }, {name: "labelTarget"}), p = new u({
        name: "outgoing",
        collection: !0
      }, {name: "source"}), f = new u({name: "incoming", collection: !0}, {name: "target"});
      r.prototype = Object.create(n.prototype), i.prototype = Object.create(r.prototype), a.prototype = Object.create(r.prototype), o.prototype = Object.create(n.prototype);
      var d = {connection: o, shape: r, label: a, root: i};
      t.exports.create = function (e, t) {
        var n = d[e];
        if (!n)throw new Error("unknown type: <" + e + ">");
        return s(new n, t)
      }, t.exports.Base = n, t.exports.Root = i, t.exports.Shape = r, t.exports.Connection = o, t.exports.Label = a
    }, {159: 159, 185: 185}],
    57: [function (e, t) {
      function n(e, t) {
        return {x: e.x - t.x, y: e.y - t.y}
      }

      function r(e) {
        return Math.sqrt(Math.pow(e.x, 2) + Math.pow(e.y, 2))
      }

      function i(e, t) {
        function i(e) {
          var i = f.start, s = u.toPoint(e), c = n(s, i);
          if (!f.dragging && r(c) > l && (f.dragging = !0, o.install(), a.set("move")), f.dragging) {
            var p = f.last || f.start;
            c = n(s, p), t.scroll({dx: c.x, dy: c.y}), f.last = s
          }
          e.preventDefault()
        }

        function c(e) {
          s.unbind(document, "mousemove", i), s.unbind(document, "mouseup", c), f = null, a.unset(), u.stopEvent(e)
        }

        function p(e) {
          e.button || e.altKey || (f = {start: u.toPoint(e)}, s.bind(document, "mousemove", i), s.bind(document, "mouseup", c), u.stopEvent(e))
        }

        var f, d = t._container;
        s.bind(d, "mousedown", p)
      }

      var a = e(63), o = e(61), s = e(174), u = e(65), l = 15;
      i.$inject = ["eventBus", "canvas"], t.exports = i
    }, {174: 174, 61: 61, 63: 63, 65: 65}],
    58: [function (e, t) {
      t.exports = {__init__: ["moveCanvas"], moveCanvas: ["type", e(57)]}
    }, {57: 57}],
    59: [function (e, t) {
      function n(e, t) {
        function n(e) {
          return Math.max(s.min, Math.min(s.max, e))
        }

        function i() {
          t.zoom("fit-viewport")
        }

        function a(e, r) {
          var i = t.zoom(), a = Math.pow(1 + Math.abs(e / u), e > 0 ? 1 : -1);
          t.zoom(n(i * a), r)
        }

        function o(e) {
          r.bind(e, "wheel", function (e) {
            var n = 0 === e.deltaMode ? .025 : .5, r = e.shiftKey, i = e.ctrlKey, o = e.deltaX * n, s = e.deltaY * n;
            if (r || i) {
              var u = {};
              i ? u.dx = l * (o || s) : u.dy = l * (o || s), t.scroll(u)
            } else {
              var c = {};
              c = isNaN(e.offsetX) ? {x: e.layerX, y: e.layerY} : {x: e.offsetX, y: e.offsetY}, a(-1 * s, c)
            }
            e.preventDefault()
          })
        }

        var s = {min: .2, max: 4}, u = 5, l = 50;
        e.on("canvas.init", function (e) {
          o(e.svg.node)
        }), this.zoom = a, this.reset = i
      }

      var r = e(174);
      n.$inject = ["eventBus", "canvas"], t.exports = n
    }, {174: 174}],
    60: [function (e, t) {
      t.exports = {__init__: ["zoomScroll"], zoomScroll: ["type", e(59)]}
    }, {59: 59}],
    61: [function (e, t) {
      function n(e) {
        o(e), r(!1)
      }

      function r(e) {
        a[e ? "bind" : "unbind"](document.body, "click", n, !0)
      }

      function i() {
        return r(!0), function () {
          r(!1)
        }
      }

      var a = e(174), o = e(65).stopEvent;
      t.exports.install = i
    }, {174: 174, 65: 65}],
    62: [function (e, t) {
      t.exports.remove = function (e, t) {
        if (e && t) {
          var n = e.indexOf(t);
          if (-1 !== n)return e.splice(n, 1), t
        }
      }, t.exports.add = function (e, t, n) {
        if (e && t) {
          isNaN(n) && (n = -1);
          var r = e.indexOf(t);
          if (-1 !== r) {
            if (r === n)return;
            if (-1 === n)return;
            e.splice(r, 1)
          }
          -1 !== n ? e.splice(n, 0, t) : e.push(t)
        }
      }, t.exports.indexOf = function (e, t) {
        return e && t ? e.indexOf(t) : -1
      }
    }, {}],
    63: [function (e, t) {
      var n = e(170), r = /^djs-cursor-.*$/;
      t.exports.set = function (e) {
        var t = n(document.body);
        t.removeMatching(r), e && t.add("djs-cursor-" + e)
      }, t.exports.unset = function () {
        this.set(null)
      }
    }, {170: 170}],
    64: [function (e, t) {
      function n(e, t, n) {
        var r = !n || -1 === e.indexOf(t);
        return r && e.push(t), r
      }

      function r(e, t, n) {
        n = n || 0, d(e, function (e, i) {
          var a = t(e, i, n);
          c(a) && a.length && r(a, t, n + 1)
        })
      }

      function i(e, t, i) {
        var a = [], o = [];
        return r(e, function (e, r, s) {
          n(a, e, t);
          var u = e.children;
          return (-1 === i || i > s) && u && n(o, u, t) ? u : void 0
        }), a
      }

      function a(e, t) {
        return i(e, !t, 1)
      }

      function o(e, t) {
        return i(e, !t, -1)
      }

      function s(e) {
        function t(e) {
          i[e.source.id] && i[e.target.id] && (i[e.id] = e), a[e.source.id] && a[e.target.id] && (u[e.id] = s[e.id] = e), o[e.id] = e
        }

        function n(e) {
          return s[e.id] = e, e.waypoints ? void(u[e.id] = o[e.id] = e) : (a[e.id] = e, d(e.incoming, t), d(e.outgoing, t), e.children)
        }

        var i = f(e, function (e) {
          return e.id
        }), a = {}, o = {}, s = {}, u = {};
        return r(e, n), {allShapes: a, allConnections: o, topLevel: i, enclosedConnections: u, enclosedElements: s}
      }

      function u(e, t) {
        t = !!t, c(e) || (e = [e]);
        var n, r, i, a;
        return d(e, function (e) {
          var o = e;
          e.waypoints && !t && (o = u(e.waypoints, !0));
          var s = o.x, l = o.y, c = o.height || 0, p = o.width || 0;
          (n > s || void 0 === n) && (n = s), (r > l || void 0 === r) && (r = l), (s + p > i || void 0 === i) && (i = s + p), (l + c > a || void 0 === a) && (a = l + c)
        }), {x: n, y: r, height: a - r, width: i - n}
      }

      function l(e, t) {
        var n = {};
        return d(e, function (e) {
          var r = e;
          r.waypoints && (r = u(r)), !p(t.y) && r.x > t.x && (n[e.id] = e), !p(t.x) && r.y > t.y && (n[e.id] = e), r.x > t.x && r.y > t.y && (p(t.width) && p(t.height) && r.width + r.x < t.width + t.x && r.height + r.y < t.height + t.y ? n[e.id] = e : p(t.width) && p(t.height) || (n[e.id] = e))
        }), n
      }

      var c = e(150), p = e(153), f = e(81), d = e(80);
      t.exports.eachElement = r, t.exports.selfAndDirectChildren = a, t.exports.selfAndAllChildren = o, t.exports.getBBox = u, t.exports.getEnclosedElements = l, t.exports.getClosure = s
    }, {150: 150, 153: 153, 80: 80, 81: 81}],
    65: [function (e, t) {
      function n(e) {
        return e && e.preventDefault()
      }

      function r(e, t) {
        e && (e.stopPropagation && e.stopPropagation(), t && e.stopImmediatePropagation && e.stopImmediatePropagation())
      }

      function i(e) {
        return e.originalEvent || e.srcEvent
      }

      function a(e, t) {
        s(e, t), o(e)
      }

      function o(e) {
        n(e), n(i(e))
      }

      function s(e, t) {
        r(e, t), r(i(e), t)
      }

      function u(e) {
        return e.pointers && e.pointers.length && (e = e.pointers[0]), e.touches && e.touches.length && (e = e.touches[0]), e ? {
          x: e.clientX,
          y: e.clientY
        } : null
      }

      t.exports.getOriginal = i, t.exports.stopEvent = a, t.exports.preventDefault = o, t.exports.stopPropagation = s, t.exports.toPoint = u
    }, {}],
    66: [function (e, t) {
      function n(e) {
        return e.select(".djs-visual")
      }

      function r(e) {
        return e.parent().children()[1]
      }

      function i(e) {
        return n(e).select("*").getBBox()
      }

      t.exports.getVisual = n, t.exports.getChildren = r, t.exports.getBBox = i
    }, {}],
    67: [function (e, t) {
      function n(e) {
        this._counter = 0, this._prefix = (e ? e + "-" : "") + Math.floor(1e9 * Math.random()) + "-"
      }

      t.exports = n, n.prototype.next = function () {
        return this._prefix + ++this._counter
      }
    }, {}],
    68: [function (e, t) {
      function n(e) {
        var t = e.split("-");
        return {horizontal: t[0] || "center", vertical: t[1] || "top"}
      }

      function r(e) {
        return a(e) ? o({top: 0, left: 0, right: 0, bottom: 0}, e) : {top: e, left: e, right: e, bottom: e}
      }

      function i(e) {
        this._config = o({}, {size: f, padding: p, style: {}, align: "center-top"}, e || {})
      }

      var a = e(154), o = e(159), s = e(80), u = e(84), l = e(162), c = e(71), p = 0, f = {width: 150, height: 50};
      i.prototype.createText = function (e, t, i) {
        function a(e) {
          function t() {
            if (s.length < o.length) {
              var t = e[0] || "", n = o.slice(s.length);
              t = /-\s*$/.test(n) ? n.replace(/-\s*$/, "") + t.replace(/^\s+/, "") : n + " " + t, e[0] = t
            }
            return {width: a.width, height: a.height, text: s}
          }

          function n(e) {
            return v.textContent = e, v.getBBox()
          }

          function r(e, t) {
            var n, r = e.split(/(\s|-)/g), i = [], a = 0;
            if (r.length > 1)for (; n = r.shift();) {
              if (!(n.length + a < t)) {
                "-" === n && i.pop();
                break
              }
              i.push(n), a += n.length
            }
            return i.join("")
          }

          function i(e, t, n) {
            var i = e.length * (n / t), a = r(e, i);
            return a || (a = e.slice(0, Math.floor(i - 1))), a
          }

          for (var a, o = e.shift(), s = o; ;) {
            if (a = n(s), a.width < g)return t();
            s = i(s, a.width, g)
          }
        }

        var o = l({}, this._config.size, i.box || {}), p = l({}, this._config.style, i.style || {}), f = n(i.align || this._config.align), d = r(void 0 !== i.padding ? i.padding : this._config.padding), h = t.split(/\r?\n/g), m = [], g = o.width - d.left - d.right, v = e.text(0, 0, "").attr(p).node;
        for (v.ownerSVGElement.appendChild(v); h.length;)m.push(a(h));
        var y, b, x = u(m, function (e, t) {
          return e + t.height
        }, 0);
        switch (f.vertical) {
          case"middle":
            y = (o.height - x) / 2 - m[0].height / 4;
            break;
          default:
            y = d.top
        }
        var w = e.text().attr(p);
        return s(m, function (e) {
          switch (y += e.height, f.horizontal) {
            case"left":
              b = d.left;
              break;
            case"right":
              b = g - d.right - e.width;
              break;
            default:
              b = (g - e.width) / 2 + d.left
          }
          var t = c.create("tspan", {x: b, y: y}).node;
          t.textContent = e.text, w.append(t)
        }), v.parentNode.removeChild(v), w
      }, t.exports = i
    }, {154: 154, 159: 159, 162: 162, 71: 71, 80: 80, 84: 84}],
    69: [function (t, n) {
      !function (t) {
        var r, i, a = "0.4.2", o = "hasOwnProperty", s = /[\.\/]/, u = /\s*,\s*/, l = "*", c = function (e, t) {
          return e - t
        }, p = {n: {}}, f = function () {
          for (var e = 0, t = this.length; t > e; e++)if ("undefined" != typeof this[e])return this[e]
        }, d = function () {
          for (var e = this.length; --e;)if ("undefined" != typeof this[e])return this[e]
        }, h = function (e, t) {
          e = String(e);
          var n, a = i, o = Array.prototype.slice.call(arguments, 2), s = h.listeners(e), u = 0, l = [], p = {}, m = [], g = r;
          m.firstDefined = f, m.lastDefined = d, r = e, i = 0;
          for (var v = 0, y = s.length; y > v; v++)"zIndex"in s[v] && (l.push(s[v].zIndex), s[v].zIndex < 0 && (p[s[v].zIndex] = s[v]));
          for (l.sort(c); l[u] < 0;)if (n = p[l[u++]], m.push(n.apply(t, o)), i)return i = a, m;
          for (v = 0; y > v; v++)if (n = s[v], "zIndex"in n)if (n.zIndex == l[u]) {
            if (m.push(n.apply(t, o)), i)break;
            do if (u++, n = p[l[u]], n && m.push(n.apply(t, o)), i)break; while (n)
          } else p[n.zIndex] = n; else if (m.push(n.apply(t, o)), i)break;
          return i = a, r = g, m
        };
        h._events = p, h.listeners = function (e) {
          var t, n, r, i, a, o, u, c, f = e.split(s), d = p, h = [d], m = [];
          for (i = 0, a = f.length; a > i; i++) {
            for (c = [], o = 0, u = h.length; u > o; o++)for (d = h[o].n, n = [d[f[i]], d[l]], r = 2; r--;)t = n[r], t && (c.push(t), m = m.concat(t.f || []));
            h = c
          }
          return m
        }, h.on = function (e, t) {
          if (e = String(e), "function" != typeof t)return function () {
          };
          for (var n = e.split(u), r = 0, i = n.length; i > r; r++)!function (e) {
            for (var n, r = e.split(s), i = p, a = 0, o = r.length; o > a; a++)i = i.n, i = i.hasOwnProperty(r[a]) && i[r[a]] || (i[r[a]] = {n: {}});
            for (i.f = i.f || [], a = 0, o = i.f.length; o > a; a++)if (i.f[a] == t) {
              n = !0;
              break
            }
            !n && i.f.push(t)
          }(n[r]);
          return function (e) {
            +e == +e && (t.zIndex = +e)
          }
        }, h.f = function (e) {
          var t = [].slice.call(arguments, 1);
          return function () {
            h.apply(null, [e, null].concat(t).concat([].slice.call(arguments, 0)))
          }
        }, h.stop = function () {
          i = 1
        }, h.nt = function (e) {
          return e ? new RegExp("(?:\\.|\\/|^)" + e + "(?:\\.|\\/|$)").test(r) : r
        }, h.nts = function () {
          return r.split(s)
        }, h.off = h.unbind = function (e, t) {
          if (!e)return void(h._events = p = {n: {}});
          var n = e.split(u);
          if (n.length > 1)for (var r = 0, i = n.length; i > r; r++)h.off(n[r], t); else {
            n = e.split(s);
            var a, c, f, r, i, d, m, g = [p];
            for (r = 0, i = n.length; i > r; r++)for (d = 0; d < g.length; d += f.length - 2) {
              if (f = [d, 1], a = g[d].n, n[r] != l)a[n[r]] && f.push(a[n[r]]); else for (c in a)a[o](c) && f.push(a[c]);
              g.splice.apply(g, f)
            }
            for (r = 0, i = g.length; i > r; r++)for (a = g[r]; a.n;) {
              if (t) {
                if (a.f) {
                  for (d = 0, m = a.f.length; m > d; d++)if (a.f[d] == t) {
                    a.f.splice(d, 1);
                    break
                  }
                  !a.f.length && delete a.f
                }
                for (c in a.n)if (a.n[o](c) && a.n[c].f) {
                  var v = a.n[c].f;
                  for (d = 0, m = v.length; m > d; d++)if (v[d] == t) {
                    v.splice(d, 1);
                    break
                  }
                  !v.length && delete a.n[c].f
                }
              } else {
                delete a.f;
                for (c in a.n)a.n[o](c) && a.n[c].f && delete a.n[c].f
              }
              a = a.n
            }
          }
        }, h.once = function (e, t) {
          var n = function () {
            return h.unbind(e, n), t.apply(this, arguments)
          };
          return h.on(e, n)
        }, h.version = a, h.toString = function () {
          return "You are running Eve " + a
        }, "undefined" != typeof n && n.exports ? n.exports = h : "function" == typeof e && e.amd ? e("eve", [], function () {
          return h
        }) : t.eve = h
      }(this)
    }, {}],
    70: [function (t, n, r) {
      !function (i, a) {
        if ("function" == typeof e && e.amd)e(["eve"], function (e) {
          return a(i, e)
        }); else if ("undefined" != typeof r) {
          var o = t(69);
          n.exports = a(i, o)
        } else a(i, i.eve)
      }(window || this, function (e, t) {
        var n = function (t) {
          var n = {}, r = e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame || e.oRequestAnimationFrame || e.msRequestAnimationFrame || function (e) {
              setTimeout(e, 16)
            }, i = Array.isArray || function (e) {
              return e instanceof Array || "[object Array]" == Object.prototype.toString.call(e)
            }, a = 0, o = "M" + (+new Date).toString(36), s = function () {
            return o + (a++).toString(36)
          }, u = Date.now || function () {
              return +new Date
            }, l = function (e) {
            var t = this;
            if (null == e)return t.s;
            var n = t.s - e;
            t.b += t.dur * n, t.B += t.dur * n, t.s = e
          }, c = function (e) {
            var t = this;
            return null == e ? t.spd : void(t.spd = e)
          }, p = function (e) {
            var t = this;
            return null == e ? t.dur : (t.s = t.s * e / t.dur, void(t.dur = e))
          }, f = function () {
            var e = this;
            delete n[e.id], e.update(), t("mina.stop." + e.id, e)
          }, d = function () {
            var e = this;
            e.pdif || (delete n[e.id], e.update(), e.pdif = e.get() - e.b)
          }, h = function () {
            var e = this;
            e.pdif && (e.b = e.get() - e.pdif, delete e.pdif, n[e.id] = e)
          }, m = function () {
            var e, t = this;
            if (i(t.start)) {
              e = [];
              for (var n = 0, r = t.start.length; r > n; n++)e[n] = +t.start[n] + (t.end[n] - t.start[n]) * t.easing(t.s)
            } else e = +t.start + (t.end - t.start) * t.easing(t.s);
            t.set(e)
          }, g = function () {
            var e = 0;
            for (var i in n)if (n.hasOwnProperty(i)) {
              var a = n[i], o = a.get();
              e++, a.s = (o - a.b) / (a.dur / a.spd), a.s >= 1 && (delete n[i], a.s = 1, e--, function (e) {
                setTimeout(function () {
                  t("mina.finish." + e.id, e)
                })
              }(a)), a.update()
            }
            e && r(g)
          }, v = function (e, t, i, a, o, u, y) {
            var b = {
              id: s(),
              start: e,
              end: t,
              b: i,
              s: 0,
              dur: a - i,
              spd: 1,
              get: o,
              set: u,
              easing: y || v.linear,
              status: l,
              speed: c,
              duration: p,
              stop: f,
              pause: d,
              resume: h,
              update: m
            };
            n[b.id] = b;
            var x, w = 0;
            for (x in n)if (n.hasOwnProperty(x) && (w++, 2 == w))break;
            return 1 == w && r(g), b
          };
          return v.time = u, v.getById = function (e) {
            return n[e] || null
          }, v.linear = function (e) {
            return e
          }, v.easeout = function (e) {
            return Math.pow(e, 1.7)
          }, v.easein = function (e) {
            return Math.pow(e, .48)
          }, v.easeinout = function (e) {
            if (1 == e)return 1;
            if (0 == e)return 0;
            var t = .48 - e / 1.04, n = Math.sqrt(.1734 + t * t), r = n - t, i = Math.pow(Math.abs(r), 1 / 3) * (0 > r ? -1 : 1), a = -n - t, o = Math.pow(Math.abs(a), 1 / 3) * (0 > a ? -1 : 1), s = i + o + .5;
            return 3 * (1 - s) * s * s + s * s * s
          }, v.backin = function (e) {
            if (1 == e)return 1;
            var t = 1.70158;
            return e * e * ((t + 1) * e - t)
          }, v.backout = function (e) {
            if (0 == e)return 0;
            e -= 1;
            var t = 1.70158;
            return e * e * ((t + 1) * e + t) + 1
          }, v.elastic = function (e) {
            return e == !!e ? e : Math.pow(2, -10 * e) * Math.sin(2 * (e - .075) * Math.PI / .3) + 1
          }, v.bounce = function (e) {
            var t, n = 7.5625, r = 2.75;
            return 1 / r > e ? t = n * e * e : 2 / r > e ? (e -= 1.5 / r, t = n * e * e + .75) : 2.5 / r > e ? (e -= 2.25 / r, t = n * e * e + .9375) : (e -= 2.625 / r, t = n * e * e + .984375), t
          }, e.mina = v, v
        }("undefined" == typeof t ? function () {
        } : t), r = function (e) {
          function n(e, t) {
            if (e) {
              if (e.tagName)return $(e);
              if (i(e, "array") && n.set)return n.set.apply(n, e);
              if (e instanceof y)return e;
              if (null == t)return e = E.doc.querySelector(e), $(e)
            }
            return e = null == e ? "100%" : e, t = null == t ? "100%" : t, new w(e, t)
          }

          function r(e, t) {
            if (t) {
              if ("#text" == e && (e = E.doc.createTextNode(t.text || "")), "string" == typeof e && (e = r(e)), "string" == typeof t)return "xlink:" == t.substring(0, 6) ? e.getAttributeNS(H, t.substring(6)) : "xml:" == t.substring(0, 4) ? e.getAttributeNS(W, t.substring(4)) : e.getAttribute(t);
              for (var n in t)if (t[S](n)) {
                var i = T(t[n]);
                i ? "xlink:" == n.substring(0, 6) ? e.setAttributeNS(H, n.substring(6), i) : "xml:" == n.substring(0, 4) ? e.setAttributeNS(W, n.substring(4), i) : e.setAttribute(n, i) : e.removeAttribute(n)
              }
            } else e = E.doc.createElementNS(W, e);
            return e
          }

          function i(e, t) {
            return t = T.prototype.toLowerCase.call(t), "finite" == t ? isFinite(e) : "array" == t && (e instanceof Array || Array.isArray && Array.isArray(e)) ? !0 : "null" == t && null === e || t == typeof e && null !== e || "object" == t && e === Object(e) || P.call(e).slice(8, -1).toLowerCase() == t
          }

          function a(e) {
            if ("function" == typeof e || Object(e) !== e)return e;
            var t = new e.constructor;
            for (var n in e)e[S](n) && (t[n] = a(e[n]));
            return t
          }

          function o(e, t) {
            for (var n = 0, r = e.length; r > n; n++)if (e[n] === t)return e.push(e.splice(n, 1)[0])
          }

          function s(e, t, n) {
            function r() {
              var i = Array.prototype.slice.call(arguments, 0), a = i.join("␀"), s = r.cache = r.cache || {}, u = r.count = r.count || [];
              return s[S](a) ? (o(u, a), n ? n(s[a]) : s[a]) : (u.length >= 1e3 && delete s[u.shift()], u.push(a), s[a] = e.apply(t, i), n ? n(s[a]) : s[a])
            }

            return r
          }

          function u(e, t, n, r, i, a) {
            if (null == i) {
              var o = e - n, s = t - r;
              return o || s ? (180 + 180 * A.atan2(-s, -o) / O + 360) % 360 : 0
            }
            return u(e, t, i, a) - u(n, r, i, a)
          }

          function l(e) {
            return e % 360 * O / 180
          }

          function c(e) {
            return 180 * e / O % 360
          }

          function p(e) {
            var t = [];
            return e = e.replace(/(?:^|\s)(\w+)\(([^)]+)\)/g, function (e, n, r) {
              return r = r.split(/\s*,\s*|\s+/), "rotate" == n && 1 == r.length && r.push(0, 0), "scale" == n && (r.length > 2 ? r = r.slice(0, 2) : 2 == r.length && r.push(0, 0), 1 == r.length && r.push(r[0], 0, 0)), t.push("skewX" == n ? ["m", 1, 0, A.tan(l(r[0])), 1, 0, 0] : "skewY" == n ? ["m", 1, A.tan(l(r[0])), 0, 1, 0, 0] : [n.charAt(0)].concat(r)), e
            }), t
          }

          function f(e, t) {
            var r = J(e), i = new n.Matrix;
            if (r)for (var a = 0, o = r.length; o > a; a++) {
              var s, u, l, c, p, f = r[a], d = f.length, h = T(f[0]).toLowerCase(), m = f[0] != h, g = m ? i.invert() : 0;
              "t" == h && 2 == d ? i.translate(f[1], 0) : "t" == h && 3 == d ? m ? (s = g.x(0, 0), u = g.y(0, 0), l = g.x(f[1], f[2]), c = g.y(f[1], f[2]), i.translate(l - s, c - u)) : i.translate(f[1], f[2]) : "r" == h ? 2 == d ? (p = p || t, i.rotate(f[1], p.x + p.width / 2, p.y + p.height / 2)) : 4 == d && (m ? (l = g.x(f[2], f[3]), c = g.y(f[2], f[3]), i.rotate(f[1], l, c)) : i.rotate(f[1], f[2], f[3])) : "s" == h ? 2 == d || 3 == d ? (p = p || t, i.scale(f[1], f[d - 1], p.x + p.width / 2, p.y + p.height / 2)) : 4 == d ? m ? (l = g.x(f[2], f[3]), c = g.y(f[2], f[3]), i.scale(f[1], f[1], l, c)) : i.scale(f[1], f[1], f[2], f[3]) : 5 == d && (m ? (l = g.x(f[3], f[4]), c = g.y(f[3], f[4]), i.scale(f[1], f[2], l, c)) : i.scale(f[1], f[2], f[3], f[4])) : "m" == h && 7 == d && i.add(f[1], f[2], f[3], f[4], f[5], f[6])
            }
            return i
          }

          function d(e) {
            var t = e.node.ownerSVGElement && $(e.node.ownerSVGElement) || e.node.parentNode && $(e.node.parentNode) || n.select("svg") || n(0, 0), r = t.select("defs"), i = null == r ? !1 : r.node;
            return i || (i = x("defs", t.node).node), i
          }

          function h(e) {
            return e.node.ownerSVGElement && $(e.node.ownerSVGElement) || n.select("svg")
          }

          function m(e, t, n) {
            function i(e) {
              if (null == e)return N;
              if (e == +e)return e;
              r(l, {width: e});
              try {
                return l.getBBox().width
              } catch (t) {
                return 0
              }
            }

            function a(e) {
              if (null == e)return N;
              if (e == +e)return e;
              r(l, {height: e});
              try {
                return l.getBBox().height
              } catch (t) {
                return 0
              }
            }

            function o(r, i) {
              null == t ? u[r] = i(e.attr(r) || 0) : r == t && (u = i(null == n ? e.attr(r) || 0 : n))
            }

            var s = h(e).node, u = {}, l = s.querySelector(".svg---mgr");
            switch (l || (l = r("rect"), r(l, {
              x: -9e9,
              y: -9e9,
              width: 10,
              height: 10,
              "class": "svg---mgr",
              fill: "none"
            }), s.appendChild(l)), e.type) {
              case"rect":
                o("rx", i), o("ry", a);
              case"image":
                o("width", i), o("height", a);
              case"text":
                o("x", i), o("y", a);
                break;
              case"circle":
                o("cx", i), o("cy", a), o("r", i);
                break;
              case"ellipse":
                o("cx", i), o("cy", a), o("rx", i), o("ry", a);
                break;
              case"line":
                o("x1", i), o("x2", i), o("y1", a), o("y2", a);
                break;
              case"marker":
                o("refX", i), o("markerWidth", i), o("refY", a), o("markerHeight", a);
                break;
              case"radialGradient":
                o("fx", i), o("fy", a);
                break;
              case"tspan":
                o("dx", i), o("dy", a);
                break;
              default:
                o(t, i)
            }
            return s.removeChild(l), u
          }

          function v(e) {
            i(e, "array") || (e = Array.prototype.slice.call(arguments, 0));
            for (var t = 0, n = 0, r = this.node; this[t];)delete this[t++];
            for (t = 0; t < e.length; t++)"set" == e[t].type ? e[t].forEach(function (e) {
              r.appendChild(e.node)
            }) : r.appendChild(e[t].node);
            var a = r.childNodes;
            for (t = 0; t < a.length; t++)this[n++] = $(a[t]);
            return this
          }

          function y(e) {
            if (e.snap in Y)return Y[e.snap];
            var t;
            try {
              t = e.ownerSVGElement
            } catch (n) {
            }
            this.node = e, t && (this.paper = new w(t)), this.type = e.tagName;
            var r = this.id = U(this);
            if (this.anims = {}, this._ = {transform: []}, e.snap = r, Y[r] = this, "g" == this.type && (this.add = v), this.type in{
                g: 1,
                mask: 1,
                pattern: 1,
                symbol: 1
              })for (var i in w.prototype)w.prototype[S](i) && (this[i] = w.prototype[i])
          }

          function b(e) {
            this.node = e
          }

          function x(e, t) {
            var n = r(e);
            t.appendChild(n);
            var i = $(n);
            return i
          }

          function w(e, t) {
            var n, i, a, o = w.prototype;
            if (e && "svg" == e.tagName) {
              if (e.snap in Y)return Y[e.snap];
              var s = e.ownerDocument;
              n = new y(e), i = e.getElementsByTagName("desc")[0], a = e.getElementsByTagName("defs")[0], i || (i = r("desc"), i.appendChild(s.createTextNode("Created with Snap")), n.node.appendChild(i)), a || (a = r("defs"), n.node.appendChild(a)), n.defs = a;
              for (var u in o)o[S](u) && (n[u] = o[u]);
              n.paper = n.root = n
            } else n = x("svg", E.doc.body), r(n.node, {height: t, version: 1.1, width: e, xmlns: W});
            return n
          }

          function $(e) {
            return e ? e instanceof y || e instanceof b ? e : e.tagName && "svg" == e.tagName.toLowerCase() ? new w(e) : e.tagName && "object" == e.tagName.toLowerCase() && "image/svg+xml" == e.type ? new w(e.contentDocument.getElementsByTagName("svg")[0]) : new y(e) : e
          }

          n.version = "0.3.0", n.toString = function () {
            return "Snap v" + this.version
          }, n._ = {};
          var E = {win: e.window, doc: e.window.document};
          n._.glob = E;
          {
            var S = "hasOwnProperty", T = String, C = parseFloat, k = parseInt, A = Math, _ = A.max, D = A.min, M = A.abs, O = (A.pow, A.PI), N = (A.round, ""), P = Object.prototype.toString, R = /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?%?)\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?%?)\s*\))\s*$/i, I = (n._.separator = /[,\s]+/, /[\s]*,[\s]*/), L = {
              hs: 1,
              rg: 1
            }, j = /([a-z])[\s,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\s]*,?[\s]*)+)/gi, F = /([rstm])[\s,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\s]*,?[\s]*)+)/gi, B = /(-?\d*\.?\d*(?:e[\-+]?\\d+)?)[\s]*,?[\s]*/gi, q = 0, V = "S" + (+new Date).toString(36), U = function (e) {
              return (e && e.type ? e.type : N) + V + (q++).toString(36)
            }, H = "http://www.w3.org/1999/xlink", W = "http://www.w3.org/2000/svg", Y = {};
            n.url = function (e) {
              return "url('#" + e + "')"
            }
          }
          n._.$ = r, n._.id = U, n.format = function () {
            var e = /\{([^\}]+)\}/g, t = /(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g, n = function (e, n, r) {
              var i = r;
              return n.replace(t, function (e, t, n, r, a) {
                t = t || r, i && (t in i && (i = i[t]), "function" == typeof i && a && (i = i()))
              }), i = (null == i || i == r ? e : i) + ""
            };
            return function (t, r) {
              return T(t).replace(e, function (e, t) {
                return n(e, t, r)
              })
            }
          }(), n._.clone = a, n._.cacher = s, n.rad = l, n.deg = c, n.angle = u, n.is = i, n.snapTo = function (e, t, n) {
            if (n = i(n, "finite") ? n : 10, i(e, "array")) {
              for (var r = e.length; r--;)if (M(e[r] - t) <= n)return e[r]
            } else {
              e = +e;
              var a = t % e;
              if (n > a)return t - a;
              if (a > e - n)return t - a + e
            }
            return t
          }, n.getRGB = s(function (e) {
            if (!e || (e = T(e)).indexOf("-") + 1)return {r: -1, g: -1, b: -1, hex: "none", error: 1, toString: K};
            if ("none" == e)return {r: -1, g: -1, b: -1, hex: "none", toString: K};
            if (!(L[S](e.toLowerCase().substring(0, 2)) || "#" == e.charAt()) && (e = z(e)), !e)return {
              r: -1,
              g: -1,
              b: -1,
              hex: "none",
              error: 1,
              toString: K
            };
            var t, r, a, o, s, u, l = e.match(R);
            return l ? (l[2] && (a = k(l[2].substring(5), 16), r = k(l[2].substring(3, 5), 16), t = k(l[2].substring(1, 3), 16)), l[3] && (a = k((s = l[3].charAt(3)) + s, 16), r = k((s = l[3].charAt(2)) + s, 16), t = k((s = l[3].charAt(1)) + s, 16)), l[4] && (u = l[4].split(I), t = C(u[0]), "%" == u[0].slice(-1) && (t *= 2.55), r = C(u[1]), "%" == u[1].slice(-1) && (r *= 2.55), a = C(u[2]), "%" == u[2].slice(-1) && (a *= 2.55), "rgba" == l[1].toLowerCase().slice(0, 4) && (o = C(u[3])), u[3] && "%" == u[3].slice(-1) && (o /= 100)), l[5] ? (u = l[5].split(I), t = C(u[0]), "%" == u[0].slice(-1) && (t /= 100), r = C(u[1]), "%" == u[1].slice(-1) && (r /= 100), a = C(u[2]), "%" == u[2].slice(-1) && (a /= 100), ("deg" == u[0].slice(-3) || "°" == u[0].slice(-1)) && (t /= 360), "hsba" == l[1].toLowerCase().slice(0, 4) && (o = C(u[3])), u[3] && "%" == u[3].slice(-1) && (o /= 100), n.hsb2rgb(t, r, a, o)) : l[6] ? (u = l[6].split(I), t = C(u[0]), "%" == u[0].slice(-1) && (t /= 100), r = C(u[1]), "%" == u[1].slice(-1) && (r /= 100), a = C(u[2]), "%" == u[2].slice(-1) && (a /= 100), ("deg" == u[0].slice(-3) || "°" == u[0].slice(-1)) && (t /= 360), "hsla" == l[1].toLowerCase().slice(0, 4) && (o = C(u[3])), u[3] && "%" == u[3].slice(-1) && (o /= 100), n.hsl2rgb(t, r, a, o)) : (t = D(A.round(t), 255), r = D(A.round(r), 255), a = D(A.round(a), 255), o = D(_(o, 0), 1), l = {
              r: t,
              g: r,
              b: a,
              toString: K
            }, l.hex = "#" + (16777216 | a | r << 8 | t << 16).toString(16).slice(1), l.opacity = i(o, "finite") ? o : 1, l)) : {
              r: -1,
              g: -1,
              b: -1,
              hex: "none",
              error: 1,
              toString: K
            }
          }, n), n.hsb = s(function (e, t, r) {
            return n.hsb2rgb(e, t, r).hex
          }), n.hsl = s(function (e, t, r) {
            return n.hsl2rgb(e, t, r).hex
          }), n.rgb = s(function (e, t, n, r) {
            if (i(r, "finite")) {
              var a = A.round;
              return "rgba(" + [a(e), a(t), a(n), +r.toFixed(2)] + ")"
            }
            return "#" + (16777216 | n | t << 8 | e << 16).toString(16).slice(1)
          });
          var z = function (e) {
            var t = E.doc.getElementsByTagName("head")[0] || E.doc.getElementsByTagName("svg")[0], n = "rgb(255, 0, 0)";
            return (z = s(function (e) {
              if ("red" == e.toLowerCase())return n;
              t.style.color = n, t.style.color = e;
              var r = E.doc.defaultView.getComputedStyle(t, N).getPropertyValue("color");
              return r == n ? null : r
            }))(e)
          }, G = function () {
            return "hsb(" + [this.h, this.s, this.b] + ")"
          }, X = function () {
            return "hsl(" + [this.h, this.s, this.l] + ")"
          }, K = function () {
            return 1 == this.opacity || null == this.opacity ? this.hex : "rgba(" + [this.r, this.g, this.b, this.opacity] + ")"
          }, Q = function (e, t, r) {
            if (null == t && i(e, "object") && "r"in e && "g"in e && "b"in e && (r = e.b, t = e.g, e = e.r), null == t && i(e, string)) {
              var a = n.getRGB(e);
              e = a.r, t = a.g, r = a.b
            }
            return (e > 1 || t > 1 || r > 1) && (e /= 255, t /= 255, r /= 255), [e, t, r]
          }, Z = function (e, t, r, a) {
            e = A.round(255 * e), t = A.round(255 * t), r = A.round(255 * r);
            var o = {r: e, g: t, b: r, opacity: i(a, "finite") ? a : 1, hex: n.rgb(e, t, r), toString: K};
            return i(a, "finite") && (o.opacity = a), o
          };
          n.color = function (e) {
            var t;
            return i(e, "object") && "h"in e && "s"in e && "b"in e ? (t = n.hsb2rgb(e), e.r = t.r, e.g = t.g, e.b = t.b, e.opacity = 1, e.hex = t.hex) : i(e, "object") && "h"in e && "s"in e && "l"in e ? (t = n.hsl2rgb(e), e.r = t.r, e.g = t.g, e.b = t.b, e.opacity = 1, e.hex = t.hex) : (i(e, "string") && (e = n.getRGB(e)), i(e, "object") && "r"in e && "g"in e && "b"in e && !("error"in e) ? (t = n.rgb2hsl(e), e.h = t.h, e.s = t.s, e.l = t.l, t = n.rgb2hsb(e), e.v = t.b) : (e = {hex: "none"}, e.r = e.g = e.b = e.h = e.s = e.v = e.l = -1, e.error = 1)), e.toString = K, e
          }, n.hsb2rgb = function (e, t, n, r) {
            i(e, "object") && "h"in e && "s"in e && "b"in e && (n = e.b, t = e.s, e = e.h, r = e.o), e *= 360;
            var a, o, s, u, l;
            return e = e % 360 / 60, l = n * t, u = l * (1 - M(e % 2 - 1)), a = o = s = n - l, e = ~~e, a += [l, u, 0, 0, u, l][e], o += [u, l, l, u, 0, 0][e], s += [0, 0, u, l, l, u][e], Z(a, o, s, r)
          }, n.hsl2rgb = function (e, t, n, r) {
            i(e, "object") && "h"in e && "s"in e && "l"in e && (n = e.l, t = e.s, e = e.h), (e > 1 || t > 1 || n > 1) && (e /= 360, t /= 100, n /= 100), e *= 360;
            var a, o, s, u, l;
            return e = e % 360 / 60, l = 2 * t * (.5 > n ? n : 1 - n), u = l * (1 - M(e % 2 - 1)), a = o = s = n - l / 2, e = ~~e, a += [l, u, 0, 0, u, l][e], o += [u, l, l, u, 0, 0][e], s += [0, 0, u, l, l, u][e], Z(a, o, s, r)
          }, n.rgb2hsb = function (e, t, n) {
            n = Q(e, t, n), e = n[0], t = n[1], n = n[2];
            var r, i, a, o;
            return a = _(e, t, n), o = a - D(e, t, n), r = 0 == o ? null : a == e ? (t - n) / o : a == t ? (n - e) / o + 2 : (e - t) / o + 4, r = (r + 360) % 6 * 60 / 360, i = 0 == o ? 0 : o / a, {
              h: r,
              s: i,
              b: a,
              toString: G
            }
          }, n.rgb2hsl = function (e, t, n) {
            n = Q(e, t, n), e = n[0], t = n[1], n = n[2];
            var r, i, a, o, s, u;
            return o = _(e, t, n), s = D(e, t, n), u = o - s, r = 0 == u ? null : o == e ? (t - n) / u : o == t ? (n - e) / u + 2 : (e - t) / u + 4, r = (r + 360) % 6 * 60 / 360, a = (o + s) / 2, i = 0 == u ? 0 : .5 > a ? u / (2 * a) : u / (2 - 2 * a), {
              h: r,
              s: i,
              l: a,
              toString: X
            }
          }, n.parsePathString = function (e) {
            if (!e)return null;
            var t = n.path(e);
            if (t.arr)return n.path.clone(t.arr);
            var r = {a: 7, c: 6, o: 2, h: 1, l: 2, m: 2, r: 4, q: 4, s: 4, t: 2, v: 1, u: 3, z: 0}, a = [];
            return i(e, "array") && i(e[0], "array") && (a = n.path.clone(e)), a.length || T(e).replace(j, function (e, t, n) {
              var i = [], o = t.toLowerCase();
              if (n.replace(B, function (e, t) {
                  t && i.push(+t)
                }), "m" == o && i.length > 2 && (a.push([t].concat(i.splice(0, 2))), o = "l", t = "m" == t ? "l" : "L"), "o" == o && 1 == i.length && a.push([t, i[0]]), "r" == o)a.push([t].concat(i)); else for (; i.length >= r[o] && (a.push([t].concat(i.splice(0, r[o]))), r[o]););
            }), a.toString = n.path.toString, t.arr = n.path.clone(a), a
          };
          var J = n.parseTransformString = function (e) {
            if (!e)return null;
            var t = [];
            return i(e, "array") && i(e[0], "array") && (t = n.path.clone(e)), t.length || T(e).replace(F, function (e, n, r) {
              {
                var i = [];
                n.toLowerCase()
              }
              r.replace(B, function (e, t) {
                t && i.push(+t)
              }), t.push([n].concat(i))
            }), t.toString = n.path.toString, t
          };
          n._.svgTransform2string = p, n._.rgTransform = /^[a-z][\s]*-?\.?\d/i, n._.transform2matrix = f, n._unit2px = m;
          E.doc.contains || E.doc.compareDocumentPosition ? function (e, t) {
            var n = 9 == e.nodeType ? e.documentElement : e, r = t && t.parentNode;
            return e == r || !(!r || 1 != r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)))
          } : function (e, t) {
            if (t)for (; t;)if (t = t.parentNode, t == e)return !0;
            return !1
          };
          n._.getSomeDefs = d, n._.getSomeSVG = h, n.select = function (e) {
            return e = T(e).replace(/([^\\]):/g, "$1\\:"), $(E.doc.querySelector(e))
          }, n.selectAll = function (e) {
            for (var t = E.doc.querySelectorAll(e), r = (n.set || Array)(), i = 0; i < t.length; i++)r.push($(t[i]));
            return r
          }, setInterval(function () {
            for (var e in Y)if (Y[S](e)) {
              var t = Y[e], n = t.node;
              ("svg" != t.type && !n.ownerSVGElement || "svg" == t.type && (!n.parentNode || "ownerSVGElement"in n.parentNode && !n.ownerSVGElement)) && delete Y[e]
            }
          }, 1e4), y.prototype.attr = function (e, n) {
            {
              var r = this;
              r.node
            }
            if (!e)return r;
            if (i(e, "string")) {
              if (!(arguments.length > 1))return t("snap.util.getattr." + e, r).firstDefined();
              var a = {};
              a[e] = n, e = a
            }
            for (var o in e)e[S](o) && t("snap.util.attr." + o, r, e[o]);
            return r
          }, n.parse = function (e) {
            var t = E.doc.createDocumentFragment(), n = !0, r = E.doc.createElement("div");
            if (e = T(e), e.match(/^\s*<\s*svg(?:\s|>)/) || (e = "<svg>" + e + "</svg>", n = !1), r.innerHTML = e, e = r.getElementsByTagName("svg")[0])if (n)t = e; else {
              for (; e.firstChild;)t.appendChild(e.firstChild);
              r.innerHTML = N
            }
            return new b(t)
          }, n.fragment = function () {
            for (var e = Array.prototype.slice.call(arguments, 0), t = E.doc.createDocumentFragment(), r = 0, i = e.length; i > r; r++) {
              var a = e[r];
              a.node && a.node.nodeType && t.appendChild(a.node), a.nodeType && t.appendChild(a), "string" == typeof a && t.appendChild(n.parse(a).node)
            }
            return new b(t)
          }, n._.make = x, n._.wrap = $, w.prototype.el = function (e, t) {
            var n = x(e, this.node);
            return t && n.attr(t), n
          }, t.on("snap.util.getattr", function () {
            var e = t.nt();
            e = e.substring(e.lastIndexOf(".") + 1);
            var n = e.replace(/[A-Z]/g, function (e) {
              return "-" + e.toLowerCase()
            });
            return et[S](n) ? this.node.ownerDocument.defaultView.getComputedStyle(this.node, null).getPropertyValue(n) : r(this.node, e)
          });
          var et = {
            "alignment-baseline": 0,
            "baseline-shift": 0,
            clip: 0,
            "clip-path": 0,
            "clip-rule": 0,
            color: 0,
            "color-interpolation": 0,
            "color-interpolation-filters": 0,
            "color-profile": 0,
            "color-rendering": 0,
            cursor: 0,
            direction: 0,
            display: 0,
            "dominant-baseline": 0,
            "enable-background": 0,
            fill: 0,
            "fill-opacity": 0,
            "fill-rule": 0,
            filter: 0,
            "flood-color": 0,
            "flood-opacity": 0,
            font: 0,
            "font-family": 0,
            "font-size": 0,
            "font-size-adjust": 0,
            "font-stretch": 0,
            "font-style": 0,
            "font-variant": 0,
            "font-weight": 0,
            "glyph-orientation-horizontal": 0,
            "glyph-orientation-vertical": 0,
            "image-rendering": 0,
            kerning: 0,
            "letter-spacing": 0,
            "lighting-color": 0,
            marker: 0,
            "marker-end": 0,
            "marker-mid": 0,
            "marker-start": 0,
            mask: 0,
            opacity: 0,
            overflow: 0,
            "pointer-events": 0,
            "shape-rendering": 0,
            "stop-color": 0,
            "stop-opacity": 0,
            stroke: 0,
            "stroke-dasharray": 0,
            "stroke-dashoffset": 0,
            "stroke-linecap": 0,
            "stroke-linejoin": 0,
            "stroke-miterlimit": 0,
            "stroke-opacity": 0,
            "stroke-width": 0,
            "text-anchor": 0,
            "text-decoration": 0,
            "text-rendering": 0,
            "unicode-bidi": 0,
            visibility: 0,
            "word-spacing": 0,
            "writing-mode": 0
          };
          t.on("snap.util.attr", function (e) {
            var n = t.nt(), i = {};
            n = n.substring(n.lastIndexOf(".") + 1), i[n] = e;
            var a = n.replace(/-(\w)/gi, function (e, t) {
              return t.toUpperCase()
            }), o = n.replace(/[A-Z]/g, function (e) {
              return "-" + e.toLowerCase()
            });
            et[S](o) ? this.node.style[a] = null == e ? N : e : r(this.node, i)
          }), function () {
          }(w.prototype), n.ajax = function (e, n, r, a) {
            var o = new XMLHttpRequest, s = U();
            if (o) {
              if (i(n, "function"))a = r, r = n, n = null; else if (i(n, "object")) {
                var u = [];
                for (var l in n)n.hasOwnProperty(l) && u.push(encodeURIComponent(l) + "=" + encodeURIComponent(n[l]));
                n = u.join("&")
              }
              return o.open(n ? "POST" : "GET", e, !0), n && (o.setRequestHeader("X-Requested-With", "XMLHttpRequest"), o.setRequestHeader("Content-type", "application/x-www-form-urlencoded")), r && (t.once("snap.ajax." + s + ".0", r), t.once("snap.ajax." + s + ".200", r), t.once("snap.ajax." + s + ".304", r)), o.onreadystatechange = function () {
                4 == o.readyState && t("snap.ajax." + s + "." + o.status, a, o)
              }, 4 == o.readyState ? o : (o.send(n), o)
            }
          }, n.load = function (e, t, r) {
            n.ajax(e, function (e) {
              var i = n.parse(e.responseText);
              r ? t.call(r, i) : t(i)
            })
          };
          var tt = function (e) {
            var t = e.getBoundingClientRect(), n = e.ownerDocument, r = n.body, i = n.documentElement, a = i.clientTop || r.clientTop || 0, o = i.clientLeft || r.clientLeft || 0, s = t.top + (g.win.pageYOffset || i.scrollTop || r.scrollTop) - a, u = t.left + (g.win.pageXOffset || i.scrollLeft || r.scrollLeft) - o;
            return {y: s, x: u}
          };
          return n.getElementByPoint = function (e, t) {
            var n = this, r = (n.canvas, E.doc.elementFromPoint(e, t));
            if (E.win.opera && "svg" == r.tagName) {
              var i = tt(r), a = r.createSVGRect();
              a.x = e - i.x, a.y = t - i.y, a.width = a.height = 1;
              var o = r.getIntersectionList(a, null);
              o.length && (r = o[o.length - 1])
            }
            return r ? $(r) : null
          }, n.plugin = function (e) {
            e(n, y, w, E, b)
          }, E.win.Snap = n, n
        }(e || this);
        return r.plugin(function (r, i, a, o, s) {
          function u(e, t) {
            if (null == t) {
              var n = !0;
              if (t = e.node.getAttribute("linearGradient" == e.type || "radialGradient" == e.type ? "gradientTransform" : "pattern" == e.type ? "patternTransform" : "transform"), !t)return new r.Matrix;
              t = r._.svgTransform2string(t)
            } else t = r._.rgTransform.test(t) ? h(t).replace(/\.{3}|\u2026/g, e._.transform || E) : r._.svgTransform2string(t), d(t, "array") && (t = r.path ? r.path.toString.call(t) : h(t)), e._.transform = t;
            var i = r._.transform2matrix(t, e.getBBox(1));
            return n ? i : void(e.matrix = i)
          }

          function l(e) {
            function t(e, t) {
              var n = g(e.node, t);
              n = n && n.match(a), n = n && n[2], n && "#" == n.charAt() && (n = n.substring(1), n && (s[n] = (s[n] || []).concat(function (n) {
                var r = {};
                r[t] = URL(n), g(e.node, r)
              })))
            }

            function n(e) {
              var t = g(e.node, "xlink:href");
              t && "#" == t.charAt() && (t = t.substring(1), t && (s[t] = (s[t] || []).concat(function (t) {
                e.attr("xlink:href", "#" + t)
              })))
            }

            for (var r, i = e.selectAll("*"), a = /^\s*url\(("|'|)(.*)\1\)\s*$/, o = [], s = {}, u = 0, l = i.length; l > u; u++) {
              r = i[u], t(r, "fill"), t(r, "stroke"), t(r, "filter"), t(r, "mask"), t(r, "clip-path"), n(r);
              var c = g(r.node, "id");
              c && (g(r.node, {id: r.id}), o.push({old: c, id: r.id}))
            }
            for (u = 0, l = o.length; l > u; u++) {
              var p = s[o[u].old];
              if (p)for (var f = 0, d = p.length; d > f; f++)p[f](o[u].id)
            }
          }

          function c(e, t, n) {
            return function (r) {
              var i = r.slice(e, t);
              return 1 == i.length && (i = i[0]), n ? n(i) : i
            }
          }

          function p(e) {
            return function () {
              var t = e ? "<" + this.type : "", n = this.node.attributes, r = this.node.childNodes;
              if (e)for (var i = 0, a = n.length; a > i; i++)t += " " + n[i].name + '="' + n[i].value.replace(/"/g, '\\"') + '"';
              if (r.length) {
                for (e && (t += ">"), i = 0, a = r.length; a > i; i++)3 == r[i].nodeType ? t += r[i].nodeValue : 1 == r[i].nodeType && (t += x(r[i]).toString());
                e && (t += "</" + this.type + ">")
              } else e && (t += "/>");
              return t
            }
          }

          var f = i.prototype, d = r.is, h = String, m = r._unit2px, g = r._.$, v = r._.make, y = r._.getSomeDefs, b = "hasOwnProperty", x = r._.wrap;
          f.getBBox = function (e) {
            if (!r.Matrix || !r.path)return this.node.getBBox();
            var t = this, n = new r.Matrix;
            if (t.removed)return r._.box();
            for (; "use" == t.type;)if (e || (n = n.add(t.transform().localMatrix.translate(t.attr("x") || 0, t.attr("y") || 0))), t.original)t = t.original; else {
              var i = t.attr("xlink:href");
              t = t.original = t.node.ownerDocument.getElementById(i.substring(i.indexOf("#") + 1))
            }
            var a = t._, o = r.path.get[t.type] || r.path.get.deflt;
            try {
              return e ? (a.bboxwt = o ? r.path.getBBox(t.realPath = o(t)) : r._.box(t.node.getBBox()), r._.box(a.bboxwt)) : (t.realPath = o(t), t.matrix = t.transform().localMatrix, a.bbox = r.path.getBBox(r.path.map(t.realPath, n.add(t.matrix))), r._.box(a.bbox))
            } catch (s) {
              return r._.box()
            }
          };
          var w = function () {
            return this.string
          };
          f.transform = function (e) {
            var t = this._;
            if (null == e) {
              for (var n, i = this, a = new r.Matrix(this.node.getCTM()), o = u(this), s = [o], l = new r.Matrix, c = o.toTransformString(), p = h(o) == h(this.matrix) ? h(t.transform) : c; "svg" != i.type && (i = i.parent());)s.push(u(i));
              for (n = s.length; n--;)l.add(s[n]);
              return {
                string: p,
                globalMatrix: a,
                totalMatrix: l,
                localMatrix: o,
                diffMatrix: a.clone().add(o.invert()),
                global: a.toTransformString(),
                total: l.toTransformString(),
                local: c,
                toString: w
              }
            }
            return e instanceof r.Matrix ? (this.matrix = e, this._.transform = e.toTransformString()) : u(this, e), this.node && ("linearGradient" == this.type || "radialGradient" == this.type ? g(this.node, {gradientTransform: this.matrix}) : "pattern" == this.type ? g(this.node, {patternTransform: this.matrix}) : g(this.node, {transform: this.matrix})), this
          }, f.parent = function () {
            return x(this.node.parentNode)
          }, f.append = f.add = function (e) {
            if (e) {
              if ("set" == e.type) {
                var t = this;
                return e.forEach(function (e) {
                  t.add(e)
                }), this
              }
              e = x(e), this.node.appendChild(e.node), e.paper = this.paper
            }
            return this
          }, f.appendTo = function (e) {
            return e && (e = x(e), e.append(this)), this
          }, f.prepend = function (e) {
            if (e) {
              if ("set" == e.type) {
                var t, n = this;
                return e.forEach(function (e) {
                  t ? t.after(e) : n.prepend(e), t = e
                }), this
              }
              e = x(e);
              var r = e.parent();
              this.node.insertBefore(e.node, this.node.firstChild), this.add && this.add(), e.paper = this.paper, this.parent() && this.parent().add(), r && r.add()
            }
            return this
          }, f.prependTo = function (e) {
            return e = x(e), e.prepend(this), this
          }, f.before = function (e) {
            if ("set" == e.type) {
              var t = this;
              return e.forEach(function (e) {
                var n = e.parent();
                t.node.parentNode.insertBefore(e.node, t.node), n && n.add()
              }), this.parent().add(), this
            }
            e = x(e);
            var n = e.parent();
            return this.node.parentNode.insertBefore(e.node, this.node), this.parent() && this.parent().add(), n && n.add(), e.paper = this.paper, this
          }, f.after = function (e) {
            e = x(e);
            var t = e.parent();
            return this.node.nextSibling ? this.node.parentNode.insertBefore(e.node, this.node.nextSibling) : this.node.parentNode.appendChild(e.node), this.parent() && this.parent().add(), t && t.add(), e.paper = this.paper, this
          }, f.insertBefore = function (e) {
            e = x(e);
            var t = this.parent();
            return e.node.parentNode.insertBefore(this.node, e.node), this.paper = e.paper, t && t.add(), e.parent() && e.parent().add(), this
          }, f.insertAfter = function (e) {
            e = x(e);
            var t = this.parent();
            return e.node.parentNode.insertBefore(this.node, e.node.nextSibling), this.paper = e.paper, t && t.add(), e.parent() && e.parent().add(), this
          }, f.remove = function () {
            var e = this.parent();
            return this.node.parentNode && this.node.parentNode.removeChild(this.node), delete this.paper, this.removed = !0, e && e.add(), this
          }, f.select = function (e) {
            return e = h(e).replace(/([^\\]):/g, "$1\\:"), x(this.node.querySelector(e))
          }, f.selectAll = function (e) {
            for (var t = this.node.querySelectorAll(e), n = (r.set || Array)(), i = 0; i < t.length; i++)n.push(x(t[i]));
            return n
          }, f.asPX = function (e, t) {
            return null == t && (t = this.attr(e)), +m(this, e, t)
          }, f.use = function () {
            var e, t = this.node.id;
            return t || (t = this.id, g(this.node, {id: t})), e = "linearGradient" == this.type || "radialGradient" == this.type || "pattern" == this.type ? v(this.type, this.node.parentNode) : v("use", this.node.parentNode), g(e.node, {"xlink:href": "#" + t}), e.original = this, e
          }, f.clone = function () {
            var e = x(this.node.cloneNode(!0));
            return g(e.node, "id") && g(e.node, {id: e.id}), l(e), e.insertAfter(this), e
          }, f.toDefs = function () {
            var e = y(this);
            return e.appendChild(this.node), this
          }, f.pattern = f.toPattern = function (e, t, n, r) {
            var i = v("pattern", y(this));
            return null == e && (e = this.getBBox()), d(e, "object") && "x"in e && (t = e.y, n = e.width, r = e.height, e = e.x), g(i.node, {
              x: e,
              y: t,
              width: n,
              height: r,
              patternUnits: "userSpaceOnUse",
              id: i.id,
              viewBox: [e, t, n, r].join(" ")
            }), i.node.appendChild(this.node), i
          }, f.marker = function (e, t, n, r, i, a) {
            var o = v("marker", y(this));
            return null == e && (e = this.getBBox()), d(e, "object") && "x"in e && (t = e.y, n = e.width, r = e.height, i = e.refX || e.cx, a = e.refY || e.cy, e = e.x), g(o.node, {
              viewBox: [e, t, n, r].join(" "),
              markerWidth: n,
              markerHeight: r,
              orient: "auto",
              refX: i || 0,
              refY: a || 0,
              id: o.id
            }), o.node.appendChild(this.node), o
          };
          var $ = function (e, t, r, i) {
            "function" != typeof r || r.length || (i = r, r = n.linear), this.attr = e, this.dur = t, r && (this.easing = r), i && (this.callback = i)
          };
          r._.Animation = $, r.animation = function (e, t, n, r) {
            return new $(e, t, n, r)
          }, f.inAnim = function () {
            var e = this, t = [];
            for (var n in e.anims)e.anims[b](n) && !function (e) {
              t.push({
                anim: new $(e._attrs, e.dur, e.easing, e._callback),
                mina: e,
                curStatus: e.status(),
                status: function (t) {
                  return e.status(t)
                },
                stop: function () {
                  e.stop()
                }
              })
            }(e.anims[n]);
            return t
          }, r.animate = function (e, r, i, a, o, s) {
            "function" != typeof o || o.length || (s = o, o = n.linear);
            var u = n.time(), l = n(e, r, u, u + a, n.time, i, o);
            return s && t.once("mina.finish." + l.id, s), l
          }, f.stop = function () {
            for (var e = this.inAnim(), t = 0, n = e.length; n > t; t++)e[t].stop();
            return this
          }, f.animate = function (e, r, i, a) {
            "function" != typeof i || i.length || (a = i, i = n.linear), e instanceof $ && (a = e.callback, i = e.easing, r = i.dur, e = e.attr);
            var o, s, u, l, p = [], f = [], m = {}, g = this;
            for (var v in e)if (e[b](v)) {
              g.equal ? (l = g.equal(v, h(e[v])), o = l.from, s = l.to, u = l.f) : (o = +g.attr(v), s = +e[v]);
              var y = d(o, "array") ? o.length : 1;
              m[v] = c(p.length, p.length + y, u), p = p.concat(o), f = f.concat(s)
            }
            var x = n.time(), w = n(p, f, x, x + r, n.time, function (e) {
              var t = {};
              for (var n in m)m[b](n) && (t[n] = m[n](e));
              g.attr(t)
            }, i);
            return g.anims[w.id] = w, w._attrs = e, w._callback = a, t("snap.animcreated." + g.id, w), t.once("mina.finish." + w.id, function () {
              delete g.anims[w.id], a && a.call(g)
            }), t.once("mina.stop." + w.id, function () {
              delete g.anims[w.id]
            }), g
          };
          var S = {};
          f.data = function (e, n) {
            var i = S[this.id] = S[this.id] || {};
            if (0 == arguments.length)return t("snap.data.get." + this.id, this, i, null), i;
            if (1 == arguments.length) {
              if (r.is(e, "object")) {
                for (var a in e)e[b](a) && this.data(a, e[a]);
                return this
              }
              return t("snap.data.get." + this.id, this, i[e], e), i[e]
            }
            return i[e] = n, t("snap.data.set." + this.id, this, n, e), this
          }, f.removeData = function (e) {
            return null == e ? S[this.id] = {} : S[this.id] && delete S[this.id][e], this
          }, f.outerSVG = f.toString = p(1), f.innerSVG = p(), f.toDataURL = function () {
            if (e && e.btoa) {
              var t = this.getBBox(), n = r.format('<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="{width}" height="{height}" viewBox="{x} {y} {width} {height}">{contents}</svg>', {
                x: +t.x.toFixed(3),
                y: +t.y.toFixed(3),
                width: +t.width.toFixed(3),
                height: +t.height.toFixed(3),
                contents: this.outerSVG()
              });
              return "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(n)))
            }
          }, s.prototype.select = f.select, s.prototype.selectAll = f.selectAll
        }), r.plugin(function (e) {
          function t(e, t, r, i, a, o) {
            return null == t && "[object SVGMatrix]" == n.call(e) ? (this.a = e.a, this.b = e.b, this.c = e.c, this.d = e.d, this.e = e.e, void(this.f = e.f)) : void(null != e ? (this.a = +e, this.b = +t, this.c = +r, this.d = +i, this.e = +a, this.f = +o) : (this.a = 1, this.b = 0, this.c = 0, this.d = 1, this.e = 0, this.f = 0))
          }

          var n = Object.prototype.toString, r = String, i = Math, a = "";
          !function (n) {
            function o(e) {
              return e[0] * e[0] + e[1] * e[1]
            }

            function s(e) {
              var t = i.sqrt(o(e));
              e[0] && (e[0] /= t), e[1] && (e[1] /= t)
            }

            n.add = function (e, n, r, i, a, o) {
              var s, u, l, c, p = [[], [], []], f = [[this.a, this.c, this.e], [this.b, this.d, this.f], [0, 0, 1]], d = [[e, r, a], [n, i, o], [0, 0, 1]];
              for (e && e instanceof t && (d = [[e.a, e.c, e.e], [e.b, e.d, e.f], [0, 0, 1]]), s = 0; 3 > s; s++)for (u = 0; 3 > u; u++) {
                for (c = 0, l = 0; 3 > l; l++)c += f[s][l] * d[l][u];
                p[s][u] = c
              }
              return this.a = p[0][0], this.b = p[1][0], this.c = p[0][1], this.d = p[1][1], this.e = p[0][2], this.f = p[1][2], this
            }, n.invert = function () {
              var e = this, n = e.a * e.d - e.b * e.c;
              return new t(e.d / n, -e.b / n, -e.c / n, e.a / n, (e.c * e.f - e.d * e.e) / n, (e.b * e.e - e.a * e.f) / n)
            }, n.clone = function () {
              return new t(this.a, this.b, this.c, this.d, this.e, this.f)
            }, n.translate = function (e, t) {
              return this.add(1, 0, 0, 1, e, t)
            }, n.scale = function (e, t, n, r) {
              return null == t && (t = e), (n || r) && this.add(1, 0, 0, 1, n, r), this.add(e, 0, 0, t, 0, 0), (n || r) && this.add(1, 0, 0, 1, -n, -r), this
            }, n.rotate = function (t, n, r) {
              t = e.rad(t), n = n || 0, r = r || 0;
              var a = +i.cos(t).toFixed(9), o = +i.sin(t).toFixed(9);
              return this.add(a, o, -o, a, n, r), this.add(1, 0, 0, 1, -n, -r)
            }, n.x = function (e, t) {
              return e * this.a + t * this.c + this.e
            }, n.y = function (e, t) {
              return e * this.b + t * this.d + this.f
            }, n.get = function (e) {
              return +this[r.fromCharCode(97 + e)].toFixed(4)
            }, n.toString = function () {
              return "matrix(" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)].join() + ")"
            }, n.offset = function () {
              return [this.e.toFixed(4), this.f.toFixed(4)]
            }, n.determinant = function () {
              return this.a * this.d - this.b * this.c
            }, n.split = function () {
              var t = {};
              t.dx = this.e, t.dy = this.f;
              var n = [[this.a, this.c], [this.b, this.d]];
              t.scalex = i.sqrt(o(n[0])), s(n[0]), t.shear = n[0][0] * n[1][0] + n[0][1] * n[1][1], n[1] = [n[1][0] - n[0][0] * t.shear, n[1][1] - n[0][1] * t.shear], t.scaley = i.sqrt(o(n[1])), s(n[1]), t.shear /= t.scaley, this.determinant() < 0 && (t.scalex = -t.scalex);
              var r = -n[0][1], a = n[1][1];
              return 0 > a ? (t.rotate = e.deg(i.acos(a)), 0 > r && (t.rotate = 360 - t.rotate)) : t.rotate = e.deg(i.asin(r)), t.isSimple = !(+t.shear.toFixed(9) || t.scalex.toFixed(9) != t.scaley.toFixed(9) && t.rotate), t.isSuperSimple = !+t.shear.toFixed(9) && t.scalex.toFixed(9) == t.scaley.toFixed(9) && !t.rotate, t.noRotation = !+t.shear.toFixed(9) && !t.rotate, t
            }, n.toTransformString = function (e) {
              var t = e || this.split();
              return +t.shear.toFixed(9) ? "m" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)] : (t.scalex = +t.scalex.toFixed(4), t.scaley = +t.scaley.toFixed(4), t.rotate = +t.rotate.toFixed(4), (t.dx || t.dy ? "t" + [+t.dx.toFixed(4), +t.dy.toFixed(4)] : a) + (1 != t.scalex || 1 != t.scaley ? "s" + [t.scalex, t.scaley, 0, 0] : a) + (t.rotate ? "r" + [+t.rotate.toFixed(4), 0, 0] : a))
            }
          }(t.prototype), e.Matrix = t, e.matrix = function (e, n, r, i, a, o) {
            return new t(e, n, r, i, a, o)
          }
        }), r.plugin(function (e, n, r, i, a) {
          function o(r) {
            return function (i) {
              if (t.stop(), i instanceof a && 1 == i.node.childNodes.length && ("radialGradient" == i.node.firstChild.tagName || "linearGradient" == i.node.firstChild.tagName || "pattern" == i.node.firstChild.tagName) && (i = i.node.firstChild, d(this).appendChild(i), i = p(i)), i instanceof n)if ("radialGradient" == i.type || "linearGradient" == i.type || "pattern" == i.type) {
                i.node.id || m(i.node, {id: i.id});
                var o = g(i.node.id)
              } else o = i.attr(r); else if (o = e.color(i), o.error) {
                var s = e(d(this).ownerSVGElement).gradient(i);
                s ? (s.node.id || m(s.node, {id: s.id}), o = g(s.node.id)) : o = i
              } else o = v(o);
              var u = {};
              u[r] = o, m(this.node, u), this.node.style[r] = b
            }
          }

          function s(e) {
            t.stop(), e == +e && (e += "px"), this.node.style.fontSize = e
          }

          function u(e) {
            for (var t = [], n = e.childNodes, r = 0, i = n.length; i > r; r++) {
              var a = n[r];
              3 == a.nodeType && t.push(a.nodeValue), "tspan" == a.tagName && t.push(1 == a.childNodes.length && 3 == a.firstChild.nodeType ? a.firstChild.nodeValue : u(a))
            }
            return t
          }

          function l() {
            return t.stop(), this.node.style.fontSize
          }

          var c = e._.make, p = e._.wrap, f = e.is, d = e._.getSomeDefs, h = /^url\(#?([^)]+)\)$/, m = e._.$, g = e.url, v = String, y = e._.separator, b = "";
          t.on("snap.util.attr.mask", function (e) {
            if (e instanceof n || e instanceof a) {
              if (t.stop(), e instanceof a && 1 == e.node.childNodes.length && (e = e.node.firstChild, d(this).appendChild(e), e = p(e)), "mask" == e.type)var r = e; else r = c("mask", d(this)), r.node.appendChild(e.node);
              !r.node.id && m(r.node, {id: r.id}), m(this.node, {mask: g(r.id)})
            }
          }), function (e) {
            t.on("snap.util.attr.clip", e), t.on("snap.util.attr.clip-path", e), t.on("snap.util.attr.clipPath", e)
          }(function (e) {
            if (e instanceof n || e instanceof a) {
              if (t.stop(), "clipPath" == e.type)var r = e; else r = c("clipPath", d(this)), r.node.appendChild(e.node), !r.node.id && m(r.node, {id: r.id});
              m(this.node, {"clip-path": g(r.node.id || r.id)})
            }
          }), t.on("snap.util.attr.fill", o("fill")), t.on("snap.util.attr.stroke", o("stroke"));
          var x = /^([lr])(?:\(([^)]*)\))?(.*)$/i;
          t.on("snap.util.grad.parse", function (e) {
            e = v(e);
            var t = e.match(x);
            if (!t)return null;
            var n = t[1], r = t[2], i = t[3];
            return r = r.split(/\s*,\s*/).map(function (e) {
              return +e == e ? +e : e
            }), 1 == r.length && 0 == r[0] && (r = []), i = i.split("-"), i = i.map(function (e) {
              e = e.split(":");
              var t = {color: e[0]};
              return e[1] && (t.offset = parseFloat(e[1])), t
            }), {type: n, params: r, stops: i}
          }), t.on("snap.util.attr.d", function (n) {
            t.stop(), f(n, "array") && f(n[0], "array") && (n = e.path.toString.call(n)), n = v(n), n.match(/[ruo]/i) && (n = e.path.toAbsolute(n)), m(this.node, {d: n})
          })(-1), t.on("snap.util.attr.#text", function (e) {
            t.stop(), e = v(e);
            for (var n = i.doc.createTextNode(e); this.node.firstChild;)this.node.removeChild(this.node.firstChild);
            this.node.appendChild(n)
          })(-1), t.on("snap.util.attr.path", function (e) {
            t.stop(), this.attr({d: e})
          })(-1), t.on("snap.util.attr.class", function (e) {
            t.stop(), this.node.className.baseVal = e
          })(-1), t.on("snap.util.attr.viewBox", function (e) {
            var n;
            n = f(e, "object") && "x"in e ? [e.x, e.y, e.width, e.height].join(" ") : f(e, "array") ? e.join(" ") : e, m(this.node, {viewBox: n}), t.stop()
          })(-1), t.on("snap.util.attr.transform", function (e) {
            this.transform(e), t.stop()
          })(-1), t.on("snap.util.attr.r", function (e) {
            "rect" == this.type && (t.stop(), m(this.node, {rx: e, ry: e}))
          })(-1), t.on("snap.util.attr.textpath", function (e) {
            if (t.stop(), "text" == this.type) {
              var r, i, a;
              if (!e && this.textPath) {
                for (i = this.textPath; i.node.firstChild;)this.node.appendChild(i.node.firstChild);
                return i.remove(), void delete this.textPath
              }
              if (f(e, "string")) {
                var o = d(this), s = p(o.parentNode).path(e);
                o.appendChild(s.node), r = s.id, s.attr({id: r})
              } else e = p(e), e instanceof n && (r = e.attr("id"), r || (r = e.id, e.attr({id: r})));
              if (r)if (i = this.textPath, a = this.node, i)i.attr({"xlink:href": "#" + r}); else {
                for (i = m("textPath", {"xlink:href": "#" + r}); a.firstChild;)i.appendChild(a.firstChild);
                a.appendChild(i), this.textPath = p(i)
              }
            }
          })(-1), t.on("snap.util.attr.text", function (e) {
            if ("text" == this.type) {
              for (var n = this.node, r = function (e) {
                var t = m("tspan");
                if (f(e, "array"))for (var n = 0; n < e.length; n++)t.appendChild(r(e[n])); else t.appendChild(i.doc.createTextNode(e));
                return t.normalize && t.normalize(), t
              }; n.firstChild;)n.removeChild(n.firstChild);
              for (var a = r(e); a.firstChild;)n.appendChild(a.firstChild)
            }
            t.stop()
          })(-1), t.on("snap.util.attr.fontSize", s)(-1), t.on("snap.util.attr.font-size", s)(-1), t.on("snap.util.getattr.transform", function () {
            return t.stop(), this.transform()
          })(-1), t.on("snap.util.getattr.textpath", function () {
            return t.stop(), this.textPath
          })(-1), function () {
            function n(n) {
              return function () {
                t.stop();
                var r = i.doc.defaultView.getComputedStyle(this.node, null).getPropertyValue("marker-" + n);
                return "none" == r ? r : e(i.doc.getElementById(r.match(h)[1]))
              }
            }

            function r(e) {
              return function (n) {
                t.stop();
                var r = "marker" + e.charAt(0).toUpperCase() + e.substring(1);
                if ("" == n || !n)return void(this.node.style[r] = "none");
                if ("marker" == n.type) {
                  var i = n.node.id;
                  return i || m(n.node, {id: n.id}), void(this.node.style[r] = g(i))
                }
              }
            }

            t.on("snap.util.getattr.marker-end", n("end"))(-1), t.on("snap.util.getattr.markerEnd", n("end"))(-1), t.on("snap.util.getattr.marker-start", n("start"))(-1), t.on("snap.util.getattr.markerStart", n("start"))(-1), t.on("snap.util.getattr.marker-mid", n("mid"))(-1), t.on("snap.util.getattr.markerMid", n("mid"))(-1), t.on("snap.util.attr.marker-end", r("end"))(-1), t.on("snap.util.attr.markerEnd", r("end"))(-1), t.on("snap.util.attr.marker-start", r("start"))(-1), t.on("snap.util.attr.markerStart", r("start"))(-1), t.on("snap.util.attr.marker-mid", r("mid"))(-1), t.on("snap.util.attr.markerMid", r("mid"))(-1)
          }(), t.on("snap.util.getattr.r", function () {
            return "rect" == this.type && m(this.node, "rx") == m(this.node, "ry") ? (t.stop(), m(this.node, "rx")) : void 0
          })(-1), t.on("snap.util.getattr.text", function () {
            if ("text" == this.type || "tspan" == this.type) {
              t.stop();
              var e = u(this.node);
              return 1 == e.length ? e[0] : e
            }
          })(-1), t.on("snap.util.getattr.#text", function () {
            return this.node.textContent
          })(-1), t.on("snap.util.getattr.viewBox", function () {
            t.stop();
            var n = m(this.node, "viewBox");
            return n ? (n = n.split(y), e._.box(+n[0], +n[1], +n[2], +n[3])) : void 0
          })(-1), t.on("snap.util.getattr.points", function () {
            var e = m(this.node, "points");
            return t.stop(), e ? e.split(y) : void 0
          })(-1), t.on("snap.util.getattr.path", function () {
            var e = m(this.node, "d");
            return t.stop(), e
          })(-1), t.on("snap.util.getattr.class", function () {
            return this.node.className.baseVal
          })(-1), t.on("snap.util.getattr.fontSize", l)(-1), t.on("snap.util.getattr.font-size", l)(-1)
        }), r.plugin(function (n, r, i, a) {
          var o = i.prototype, s = n.is;
          o.rect = function (e, t, n, r, i, a) {
            var o;
            return null == a && (a = i), s(e, "object") && "[object Object]" == e ? o = e : null != e && (o = {
              x: e,
              y: t,
              width: n,
              height: r
            }, null != i && (o.rx = i, o.ry = a)), this.el("rect", o)
          }, o.circle = function (e, t, n) {
            var r;
            return s(e, "object") && "[object Object]" == e ? r = e : null != e && (r = {
              cx: e,
              cy: t,
              r: n
            }), this.el("circle", r)
          };
          var u = function () {
            function e() {
              this.parentNode.removeChild(this)
            }

            return function (t, n) {
              var r = a.doc.createElement("img"), i = a.doc.body;
              r.style.cssText = "position:absolute;left:-9999em;top:-9999em", r.onload = function () {
                n.call(r), r.onload = r.onerror = null, i.removeChild(r)
              }, r.onerror = e, i.appendChild(r), r.src = t
            }
          }();
          o.image = function (e, t, r, i, a) {
            var o = this.el("image");
            if (s(e, "object") && "src"in e)o.attr(e); else if (null != e) {
              var l = {"xlink:href": e, preserveAspectRatio: "none"};
              null != t && null != r && (l.x = t, l.y = r), null != i && null != a ? (l.width = i, l.height = a) : u(e, function () {
                n._.$(o.node, {width: this.offsetWidth, height: this.offsetHeight})
              }), n._.$(o.node, l)
            }
            return o
          }, o.ellipse = function (e, t, n, r) {
            var i;
            return s(e, "object") && "[object Object]" == e ? i = e : null != e && (i = {
              cx: e,
              cy: t,
              rx: n,
              ry: r
            }), this.el("ellipse", i)
          }, o.path = function (e) {
            var t;
            return s(e, "object") && !s(e, "array") ? t = e : e && (t = {d: e}), this.el("path", t)
          }, o.group = o.g = function (e) {
            var t = this.el("g");
            return 1 == arguments.length && e && !e.type ? t.attr(e) : arguments.length && t.add(Array.prototype.slice.call(arguments, 0)), t
          }, o.svg = function (e, t, n, r, i, a, o, u) {
            var l = {};
            return s(e, "object") && null == t ? l = e : (null != e && (l.x = e), null != t && (l.y = t), null != n && (l.width = n), null != r && (l.height = r), null != i && null != a && null != o && null != u && (l.viewBox = [i, a, o, u])), this.el("svg", l)
          }, o.mask = function (e) {
            var t = this.el("mask");
            return 1 == arguments.length && e && !e.type ? t.attr(e) : arguments.length && t.add(Array.prototype.slice.call(arguments, 0)), t
          }, o.ptrn = function (e, t, n, r, i, a, o, u) {
            if (s(e, "object"))var l = e; else l = {patternUnits: "userSpaceOnUse"}, e && (l.x = e), t && (l.y = t), null != n && (l.width = n), null != r && (l.height = r), null != i && null != a && null != o && null != u && (l.viewBox = [i, a, o, u]);
            return this.el("pattern", l)
          }, o.use = function (e) {
            return null != e ? (e instanceof r && (e.attr("id") || e.attr({id: n._.id(e)}), e = e.attr("id")), "#" == String(e).charAt() && (e = e.substring(1)), this.el("use", {"xlink:href": "#" + e})) : r.prototype.use.call(this)
          }, o.symbol = function (e, t, n, r) {
            var i = {};
            return null != e && null != t && null != n && null != r && (i.viewBox = [e, t, n, r]), this.el("symbol", i)
          }, o.text = function (e, t, n) {
            var r = {};
            return s(e, "object") ? r = e : null != e && (r = {x: e, y: t, text: n || ""}), this.el("text", r)
          }, o.line = function (e, t, n, r) {
            var i = {};
            return s(e, "object") ? i = e : null != e && (i = {x1: e, x2: n, y1: t, y2: r}), this.el("line", i)
          }, o.polyline = function (e) {
            arguments.length > 1 && (e = Array.prototype.slice.call(arguments, 0));
            var t = {};
            return s(e, "object") && !s(e, "array") ? t = e : null != e && (t = {points: e}), this.el("polyline", t)
          }, o.polygon = function (e) {
            arguments.length > 1 && (e = Array.prototype.slice.call(arguments, 0));
            var t = {};
            return s(e, "object") && !s(e, "array") ? t = e : null != e && (t = {points: e}), this.el("polygon", t)
          }, function () {
            function r() {
              return this.selectAll("stop")
            }

            function i(e, t) {
              var r = c("stop"), i = {offset: +t + "%"};
              return e = n.color(e), i["stop-color"] = e.hex, e.opacity < 1 && (i["stop-opacity"] = e.opacity), c(r, i), this.node.appendChild(r), this
            }

            function a() {
              if ("linearGradient" == this.type) {
                var e = c(this.node, "x1") || 0, t = c(this.node, "x2") || 1, r = c(this.node, "y1") || 0, i = c(this.node, "y2") || 0;
                return n._.box(e, r, math.abs(t - e), math.abs(i - r))
              }
              var a = this.node.cx || .5, o = this.node.cy || .5, s = this.node.r || 0;
              return n._.box(a - s, o - s, 2 * s, 2 * s)
            }

            function s(e, n) {
              function r(e, t) {
                for (var n = (t - p) / (e - f), r = f; e > r; r++)o[r].offset = +(+p + n * (r - f)).toFixed(2);
                f = e, p = t
              }

              var i, a = t("snap.util.grad.parse", null, n).firstDefined();
              if (!a)return null;
              a.params.unshift(e), i = "l" == a.type.toLowerCase() ? u.apply(0, a.params) : l.apply(0, a.params), a.type != a.type.toLowerCase() && c(i.node, {gradientUnits: "userSpaceOnUse"});
              var o = a.stops, s = o.length, p = 0, f = 0;
              s--;
              for (var d = 0; s > d; d++)"offset"in o[d] && r(d, o[d].offset);
              for (o[s].offset = o[s].offset || 100, r(s, o[s].offset), d = 0; s >= d; d++) {
                var h = o[d];
                i.addStop(h.color, h.offset)
              }
              return i
            }

            function u(e, t, o, s, u) {
              var l = n._.make("linearGradient", e);
              return l.stops = r, l.addStop = i, l.getBBox = a, null != t && c(l.node, {x1: t, y1: o, x2: s, y2: u}), l
            }

            function l(e, t, o, s, u, l) {
              var p = n._.make("radialGradient", e);
              return p.stops = r, p.addStop = i, p.getBBox = a, null != t && c(p.node, {
                cx: t,
                cy: o,
                r: s
              }), null != u && null != l && c(p.node, {fx: u, fy: l}), p
            }

            var c = n._.$;
            o.gradient = function (e) {
              return s(this.defs, e)
            }, o.gradientLinear = function (e, t, n, r) {
              return u(this.defs, e, t, n, r)
            }, o.gradientRadial = function (e, t, n, r, i) {
              return l(this.defs, e, t, n, r, i)
            }, o.toString = function () {
              var e, t = this.node.ownerDocument, r = t.createDocumentFragment(), i = t.createElement("div"), a = this.node.cloneNode(!0);
              return r.appendChild(i), i.appendChild(a), n._.$(a, {xmlns: "http://www.w3.org/2000/svg"}), e = i.innerHTML, r.removeChild(r.firstChild), e
            }, o.toDataURL = function () {
              return e && e.btoa ? "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(this))) : void 0
            }, o.clear = function () {
              for (var e, t = this.node.firstChild; t;)e = t.nextSibling, "defs" != t.tagName ? t.parentNode.removeChild(t) : o.clear.call({node: t}), t = e
            }
          }()
        }), r.plugin(function (e, t) {
          function n(e) {
            var t = n.ps = n.ps || {};
            return t[e] ? t[e].sleep = 100 : t[e] = {sleep: 100}, setTimeout(function () {
              for (var n in t)t[I](n) && n != e && (t[n].sleep--, !t[n].sleep && delete t[n])
            }), t[e]
          }

          function r(e, t, n, r) {
            return null == e && (e = t = n = r = 0), null == t && (t = e.y, n = e.width, r = e.height, e = e.x), {
              x: e,
              y: t,
              width: n,
              w: n,
              height: r,
              h: r,
              x2: e + n,
              y2: t + r,
              cx: e + n / 2,
              cy: t + r / 2,
              r1: F.min(n, r) / 2,
              r2: F.max(n, r) / 2,
              r0: F.sqrt(n * n + r * r) / 2,
              path: $(e, t, n, r),
              vb: [e, t, n, r].join(" ")
            }
          }

          function i() {
            return this.join(",").replace(L, "$1")
          }

          function a(e) {
            var t = R(e);
            return t.toString = i, t
          }

          function o(e, t, n, r, i, a, o, s, l) {
            return null == l ? d(e, t, n, r, i, a, o, s) : u(e, t, n, r, i, a, o, s, h(e, t, n, r, i, a, o, s, l))
          }

          function s(n, r) {
            function i(e) {
              return +(+e).toFixed(3)
            }

            return e._.cacher(function (e, a, s) {
              e instanceof t && (e = e.attr("d")), e = D(e);
              for (var l, c, p, f, d, h = "", m = {}, g = 0, v = 0, y = e.length; y > v; v++) {
                if (p = e[v], "M" == p[0])l = +p[1], c = +p[2]; else {
                  if (f = o(l, c, p[1], p[2], p[3], p[4], p[5], p[6]), g + f > a) {
                    if (r && !m.start) {
                      if (d = o(l, c, p[1], p[2], p[3], p[4], p[5], p[6], a - g), h += ["C" + i(d.start.x), i(d.start.y), i(d.m.x), i(d.m.y), i(d.x), i(d.y)], s)return h;
                      m.start = h, h = ["M" + i(d.x), i(d.y) + "C" + i(d.n.x), i(d.n.y), i(d.end.x), i(d.end.y), i(p[5]), i(p[6])].join(), g += f, l = +p[5], c = +p[6];
                      continue
                    }
                    if (!n && !r)return d = o(l, c, p[1], p[2], p[3], p[4], p[5], p[6], a - g)
                  }
                  g += f, l = +p[5], c = +p[6]
                }
                h += p.shift() + p
              }
              return m.end = h, d = n ? g : r ? m : u(l, c, p[0], p[1], p[2], p[3], p[4], p[5], 1)
            }, null, e._.clone)
          }

          function u(e, t, n, r, i, a, o, s, u) {
            var l = 1 - u, c = U(l, 3), p = U(l, 2), f = u * u, d = f * u, h = c * e + 3 * p * u * n + 3 * l * u * u * i + d * o, m = c * t + 3 * p * u * r + 3 * l * u * u * a + d * s, g = e + 2 * u * (n - e) + f * (i - 2 * n + e), v = t + 2 * u * (r - t) + f * (a - 2 * r + t), y = n + 2 * u * (i - n) + f * (o - 2 * i + n), b = r + 2 * u * (a - r) + f * (s - 2 * a + r), x = l * e + u * n, w = l * t + u * r, $ = l * i + u * o, E = l * a + u * s, S = 90 - 180 * F.atan2(g - y, v - b) / B;
            return {x: h, y: m, m: {x: g, y: v}, n: {x: y, y: b}, start: {x: x, y: w}, end: {x: $, y: E}, alpha: S}
          }

          function l(t, n, i, a, o, s, u, l) {
            e.is(t, "array") || (t = [t, n, i, a, o, s, u, l]);
            var c = _.apply(null, t);
            return r(c.min.x, c.min.y, c.max.x - c.min.x, c.max.y - c.min.y)
          }

          function c(e, t, n) {
            return t >= e.x && t <= e.x + e.width && n >= e.y && n <= e.y + e.height
          }

          function p(e, t) {
            return e = r(e), t = r(t), c(t, e.x, e.y) || c(t, e.x2, e.y) || c(t, e.x, e.y2) || c(t, e.x2, e.y2) || c(e, t.x, t.y) || c(e, t.x2, t.y) || c(e, t.x, t.y2) || c(e, t.x2, t.y2) || (e.x < t.x2 && e.x > t.x || t.x < e.x2 && t.x > e.x) && (e.y < t.y2 && e.y > t.y || t.y < e.y2 && t.y > e.y)
          }

          function f(e, t, n, r, i) {
            var a = -3 * t + 9 * n - 9 * r + 3 * i, o = e * a + 6 * t - 12 * n + 6 * r;
            return e * o - 3 * t + 3 * n
          }

          function d(e, t, n, r, i, a, o, s, u) {
            null == u && (u = 1), u = u > 1 ? 1 : 0 > u ? 0 : u;
            for (var l = u / 2, c = 12, p = [-.1252, .1252, -.3678, .3678, -.5873, .5873, -.7699, .7699, -.9041, .9041, -.9816, .9816], d = [.2491, .2491, .2335, .2335, .2032, .2032, .1601, .1601, .1069, .1069, .0472, .0472], h = 0, m = 0; c > m; m++) {
              var g = l * p[m] + l, v = f(g, e, n, i, o), y = f(g, t, r, a, s), b = v * v + y * y;
              h += d[m] * F.sqrt(b)
            }
            return l * h
          }

          function h(e, t, n, r, i, a, o, s, u) {
            if (!(0 > u || d(e, t, n, r, i, a, o, s) < u)) {
              var l, c = 1, p = c / 2, f = c - p, h = .01;
              for (l = d(e, t, n, r, i, a, o, s, f); H(l - u) > h;)p /= 2, f += (u > l ? 1 : -1) * p, l = d(e, t, n, r, i, a, o, s, f);
              return f
            }
          }

          function m(e, t, n, r, i, a, o, s) {
            if (!(V(e, n) < q(i, o) || q(e, n) > V(i, o) || V(t, r) < q(a, s) || q(t, r) > V(a, s))) {
              var u = (e * r - t * n) * (i - o) - (e - n) * (i * s - a * o), l = (e * r - t * n) * (a - s) - (t - r) * (i * s - a * o), c = (e - n) * (a - s) - (t - r) * (i - o);
              if (c) {
                var p = u / c, f = l / c, d = +p.toFixed(2), h = +f.toFixed(2);
                if (!(d < +q(e, n).toFixed(2) || d > +V(e, n).toFixed(2) || d < +q(i, o).toFixed(2) || d > +V(i, o).toFixed(2) || h < +q(t, r).toFixed(2) || h > +V(t, r).toFixed(2) || h < +q(a, s).toFixed(2) || h > +V(a, s).toFixed(2)))return {
                  x: p,
                  y: f
                }
              }
            }
          }

          function g(e, t, n) {
            var r = l(e), i = l(t);
            if (!p(r, i))return n ? 0 : [];
            for (var a = d.apply(0, e), o = d.apply(0, t), s = ~~(a / 8), c = ~~(o / 8), f = [], h = [], g = {}, v = n ? 0 : [], y = 0; s + 1 > y; y++) {
              var b = u.apply(0, e.concat(y / s));
              f.push({x: b.x, y: b.y, t: y / s})
            }
            for (y = 0; c + 1 > y; y++)b = u.apply(0, t.concat(y / c)), h.push({x: b.x, y: b.y, t: y / c});
            for (y = 0; s > y; y++)for (var x = 0; c > x; x++) {
              var w = f[y], $ = f[y + 1], E = h[x], S = h[x + 1], T = H($.x - w.x) < .001 ? "y" : "x", C = H(S.x - E.x) < .001 ? "y" : "x", k = m(w.x, w.y, $.x, $.y, E.x, E.y, S.x, S.y);
              if (k) {
                if (g[k.x.toFixed(4)] == k.y.toFixed(4))continue;
                g[k.x.toFixed(4)] = k.y.toFixed(4);
                var A = w.t + H((k[T] - w[T]) / ($[T] - w[T])) * ($.t - w.t), _ = E.t + H((k[C] - E[C]) / (S[C] - E[C])) * (S.t - E.t);
                A >= 0 && 1 >= A && _ >= 0 && 1 >= _ && (n ? v++ : v.push({x: k.x, y: k.y, t1: A, t2: _}))
              }
            }
            return v
          }

          function v(e, t) {
            return b(e, t)
          }

          function y(e, t) {
            return b(e, t, 1)
          }

          function b(e, t, n) {
            e = D(e), t = D(t);
            for (var r, i, a, o, s, u, l, c, p, f, d = n ? 0 : [], h = 0, m = e.length; m > h; h++) {
              var v = e[h];
              if ("M" == v[0])r = s = v[1], i = u = v[2]; else {
                "C" == v[0] ? (p = [r, i].concat(v.slice(1)), r = p[6], i = p[7]) : (p = [r, i, r, i, s, u, s, u], r = s, i = u);
                for (var y = 0, b = t.length; b > y; y++) {
                  var x = t[y];
                  if ("M" == x[0])a = l = x[1], o = c = x[2]; else {
                    "C" == x[0] ? (f = [a, o].concat(x.slice(1)), a = f[6], o = f[7]) : (f = [a, o, a, o, l, c, l, c], a = l, o = c);
                    var w = g(p, f, n);
                    if (n)d += w; else {
                      for (var $ = 0, E = w.length; E > $; $++)w[$].segment1 = h, w[$].segment2 = y, w[$].bez1 = p, w[$].bez2 = f;
                      d = d.concat(w)
                    }
                  }
                }
              }
            }
            return d
          }

          function x(e, t, n) {
            var r = w(e);
            return c(r, t, n) && b(e, [["M", t, n], ["H", r.x2 + 10]], 1) % 2 == 1
          }

          function w(e) {
            var t = n(e);
            if (t.bbox)return R(t.bbox);
            if (!e)return r();
            e = D(e);
            for (var i, a = 0, o = 0, s = [], u = [], l = 0, c = e.length; c > l; l++)if (i = e[l], "M" == i[0])a = i[1], o = i[2], s.push(a), u.push(o); else {
              var p = _(a, o, i[1], i[2], i[3], i[4], i[5], i[6]);
              s = s.concat(p.min.x, p.max.x), u = u.concat(p.min.y, p.max.y), a = i[5], o = i[6]
            }
            var f = q.apply(0, s), d = q.apply(0, u), h = V.apply(0, s), m = V.apply(0, u), g = r(f, d, h - f, m - d);
            return t.bbox = R(g), g
          }

          function $(e, t, n, r, a) {
            if (a)return [["M", +e + +a, t], ["l", n - 2 * a, 0], ["a", a, a, 0, 0, 1, a, a], ["l", 0, r - 2 * a], ["a", a, a, 0, 0, 1, -a, a], ["l", 2 * a - n, 0], ["a", a, a, 0, 0, 1, -a, -a], ["l", 0, 2 * a - r], ["a", a, a, 0, 0, 1, a, -a], ["z"]];
            var o = [["M", e, t], ["l", n, 0], ["l", 0, r], ["l", -n, 0], ["z"]];
            return o.toString = i, o
          }

          function E(e, t, n, r, a) {
            if (null == a && null == r && (r = n), e = +e, t = +t, n = +n, r = +r, null != a)var o = Math.PI / 180, s = e + n * Math.cos(-r * o), u = e + n * Math.cos(-a * o), l = t + n * Math.sin(-r * o), c = t + n * Math.sin(-a * o), p = [["M", s, l], ["A", n, n, 0, +(a - r > 180), 0, u, c]]; else p = [["M", e, t], ["m", 0, -r], ["a", n, r, 0, 1, 1, 0, 2 * r], ["a", n, r, 0, 1, 1, 0, -2 * r], ["z"]];
            return p.toString = i, p
          }

          function S(t) {
            var r = n(t), o = String.prototype.toLowerCase;
            if (r.rel)return a(r.rel);
            e.is(t, "array") && e.is(t && t[0], "array") || (t = e.parsePathString(t));
            var s = [], u = 0, l = 0, c = 0, p = 0, f = 0;
            "M" == t[0][0] && (u = t[0][1], l = t[0][2], c = u, p = l, f++, s.push(["M", u, l]));
            for (var d = f, h = t.length; h > d; d++) {
              var m = s[d] = [], g = t[d];
              if (g[0] != o.call(g[0]))switch (m[0] = o.call(g[0]), m[0]) {
                case"a":
                  m[1] = g[1], m[2] = g[2], m[3] = g[3], m[4] = g[4], m[5] = g[5], m[6] = +(g[6] - u).toFixed(3), m[7] = +(g[7] - l).toFixed(3);
                  break;
                case"v":
                  m[1] = +(g[1] - l).toFixed(3);
                  break;
                case"m":
                  c = g[1], p = g[2];
                default:
                  for (var v = 1, y = g.length; y > v; v++)m[v] = +(g[v] - (v % 2 ? u : l)).toFixed(3)
              } else {
                m = s[d] = [], "m" == g[0] && (c = g[1] + u, p = g[2] + l);
                for (var b = 0, x = g.length; x > b; b++)s[d][b] = g[b]
              }
              var w = s[d].length;
              switch (s[d][0]) {
                case"z":
                  u = c, l = p;
                  break;
                case"h":
                  u += +s[d][w - 1];
                  break;
                case"v":
                  l += +s[d][w - 1];
                  break;
                default:
                  u += +s[d][w - 2], l += +s[d][w - 1]
              }
            }
            return s.toString = i, r.rel = a(s), s
          }

          function T(t) {
            var r = n(t);
            if (r.abs)return a(r.abs);
            if (P(t, "array") && P(t && t[0], "array") || (t = e.parsePathString(t)), !t || !t.length)return [["M", 0, 0]];
            var o, s = [], u = 0, l = 0, c = 0, p = 0, f = 0;
            "M" == t[0][0] && (u = +t[0][1], l = +t[0][2], c = u, p = l, f++, s[0] = ["M", u, l]);
            for (var d, h, m = 3 == t.length && "M" == t[0][0] && "R" == t[1][0].toUpperCase() && "Z" == t[2][0].toUpperCase(), g = f, v = t.length; v > g; g++) {
              if (s.push(d = []), h = t[g], o = h[0], o != o.toUpperCase())switch (d[0] = o.toUpperCase(), d[0]) {
                case"A":
                  d[1] = h[1], d[2] = h[2], d[3] = h[3], d[4] = h[4], d[5] = h[5], d[6] = +h[6] + u, d[7] = +h[7] + l;
                  break;
                case"V":
                  d[1] = +h[1] + l;
                  break;
                case"H":
                  d[1] = +h[1] + u;
                  break;
                case"R":
                  for (var y = [u, l].concat(h.slice(1)), b = 2, x = y.length; x > b; b++)y[b] = +y[b] + u, y[++b] = +y[b] + l;
                  s.pop(), s = s.concat(O(y, m));
                  break;
                case"O":
                  s.pop(), y = E(u, l, h[1], h[2]), y.push(y[0]), s = s.concat(y);
                  break;
                case"U":
                  s.pop(), s = s.concat(E(u, l, h[1], h[2], h[3])), d = ["U"].concat(s[s.length - 1].slice(-2));
                  break;
                case"M":
                  c = +h[1] + u, p = +h[2] + l;
                default:
                  for (b = 1, x = h.length; x > b; b++)d[b] = +h[b] + (b % 2 ? u : l)
              } else if ("R" == o)y = [u, l].concat(h.slice(1)), s.pop(), s = s.concat(O(y, m)), d = ["R"].concat(h.slice(-2)); else if ("O" == o)s.pop(), y = E(u, l, h[1], h[2]), y.push(y[0]), s = s.concat(y); else if ("U" == o)s.pop(), s = s.concat(E(u, l, h[1], h[2], h[3])), d = ["U"].concat(s[s.length - 1].slice(-2)); else for (var w = 0, $ = h.length; $ > w; w++)d[w] = h[w];
              if (o = o.toUpperCase(), "O" != o)switch (d[0]) {
                case"Z":
                  u = +c, l = +p;
                  break;
                case"H":
                  u = d[1];
                  break;
                case"V":
                  l = d[1];
                  break;
                case"M":
                  c = d[d.length - 2], p = d[d.length - 1];
                default:
                  u = d[d.length - 2], l = d[d.length - 1]
              }
            }
            return s.toString = i, r.abs = a(s), s
          }

          function C(e, t, n, r) {
            return [e, t, n, r, n, r]
          }

          function k(e, t, n, r, i, a) {
            var o = 1 / 3, s = 2 / 3;
            return [o * e + s * n, o * t + s * r, o * i + s * n, o * a + s * r, i, a]
          }

          function A(t, n, r, i, a, o, s, u, l, c) {
            var p, f = 120 * B / 180, d = B / 180 * (+a || 0), h = [], m = e._.cacher(function (e, t, n) {
              var r = e * F.cos(n) - t * F.sin(n), i = e * F.sin(n) + t * F.cos(n);
              return {x: r, y: i}
            });
            if (c)S = c[0], T = c[1], $ = c[2], E = c[3]; else {
              p = m(t, n, -d), t = p.x, n = p.y, p = m(u, l, -d), u = p.x, l = p.y;
              var g = (F.cos(B / 180 * a), F.sin(B / 180 * a), (t - u) / 2), v = (n - l) / 2, y = g * g / (r * r) + v * v / (i * i);
              y > 1 && (y = F.sqrt(y), r = y * r, i = y * i);
              var b = r * r, x = i * i, w = (o == s ? -1 : 1) * F.sqrt(H((b * x - b * v * v - x * g * g) / (b * v * v + x * g * g))), $ = w * r * v / i + (t + u) / 2, E = w * -i * g / r + (n + l) / 2, S = F.asin(((n - E) / i).toFixed(9)), T = F.asin(((l - E) / i).toFixed(9));
              S = $ > t ? B - S : S, T = $ > u ? B - T : T, 0 > S && (S = 2 * B + S), 0 > T && (T = 2 * B + T), s && S > T && (S -= 2 * B), !s && T > S && (T -= 2 * B)
            }
            var C = T - S;
            if (H(C) > f) {
              var k = T, _ = u, D = l;
              T = S + f * (s && T > S ? 1 : -1), u = $ + r * F.cos(T), l = E + i * F.sin(T), h = A(u, l, r, i, a, 0, s, _, D, [T, k, $, E])
            }
            C = T - S;
            var M = F.cos(S), O = F.sin(S), N = F.cos(T), P = F.sin(T), R = F.tan(C / 4), I = 4 / 3 * r * R, L = 4 / 3 * i * R, j = [t, n], q = [t + I * O, n - L * M], V = [u + I * P, l - L * N], U = [u, l];
            if (q[0] = 2 * j[0] - q[0], q[1] = 2 * j[1] - q[1], c)return [q, V, U].concat(h);
            h = [q, V, U].concat(h).join().split(",");
            for (var W = [], Y = 0, z = h.length; z > Y; Y++)W[Y] = Y % 2 ? m(h[Y - 1], h[Y], d).y : m(h[Y], h[Y + 1], d).x;
            return W
          }

          function _(e, t, n, r, i, a, o, s) {
            for (var u, l, c, p, f, d, h, m, g = [], v = [[], []], y = 0; 2 > y; ++y)if (0 == y ? (l = 6 * e - 12 * n + 6 * i, u = -3 * e + 9 * n - 9 * i + 3 * o, c = 3 * n - 3 * e) : (l = 6 * t - 12 * r + 6 * a, u = -3 * t + 9 * r - 9 * a + 3 * s, c = 3 * r - 3 * t), H(u) < 1e-12) {
              if (H(l) < 1e-12)continue;
              p = -c / l, p > 0 && 1 > p && g.push(p)
            } else h = l * l - 4 * c * u, m = F.sqrt(h), 0 > h || (f = (-l + m) / (2 * u), f > 0 && 1 > f && g.push(f), d = (-l - m) / (2 * u), d > 0 && 1 > d && g.push(d));
            for (var b, x = g.length, w = x; x--;)p = g[x], b = 1 - p, v[0][x] = b * b * b * e + 3 * b * b * p * n + 3 * b * p * p * i + p * p * p * o, v[1][x] = b * b * b * t + 3 * b * b * p * r + 3 * b * p * p * a + p * p * p * s;
            return v[0][w] = e, v[1][w] = t, v[0][w + 1] = o, v[1][w + 1] = s, v[0].length = v[1].length = w + 2, {
              min: {
                x: q.apply(0, v[0]),
                y: q.apply(0, v[1])
              }, max: {x: V.apply(0, v[0]), y: V.apply(0, v[1])}
            }
          }

          function D(e, t) {
            var r = !t && n(e);
            if (!t && r.curve)return a(r.curve);
            for (var i = T(e), o = t && T(t), s = {x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0, qx: null, qy: null}, u = {
              x: 0,
              y: 0,
              bx: 0,
              by: 0,
              X: 0,
              Y: 0,
              qx: null,
              qy: null
            }, l = (function (e, t, n) {
              var r, i;
              if (!e)return ["C", t.x, t.y, t.x, t.y, t.x, t.y];
              switch (!(e[0]in{T: 1, Q: 1}) && (t.qx = t.qy = null), e[0]) {
                case"M":
                  t.X = e[1], t.Y = e[2];
                  break;
                case"A":
                  e = ["C"].concat(A.apply(0, [t.x, t.y].concat(e.slice(1))));
                  break;
                case"S":
                  "C" == n || "S" == n ? (r = 2 * t.x - t.bx, i = 2 * t.y - t.by) : (r = t.x, i = t.y), e = ["C", r, i].concat(e.slice(1));
                  break;
                case"T":
                  "Q" == n || "T" == n ? (t.qx = 2 * t.x - t.qx, t.qy = 2 * t.y - t.qy) : (t.qx = t.x, t.qy = t.y), e = ["C"].concat(k(t.x, t.y, t.qx, t.qy, e[1], e[2]));
                  break;
                case"Q":
                  t.qx = e[1], t.qy = e[2], e = ["C"].concat(k(t.x, t.y, e[1], e[2], e[3], e[4]));
                  break;
                case"L":
                  e = ["C"].concat(C(t.x, t.y, e[1], e[2]));
                  break;
                case"H":
                  e = ["C"].concat(C(t.x, t.y, e[1], t.y));
                  break;
                case"V":
                  e = ["C"].concat(C(t.x, t.y, t.x, e[1]));
                  break;
                case"Z":
                  e = ["C"].concat(C(t.x, t.y, t.X, t.Y))
              }
              return e
            }), c = function (e, t) {
              if (e[t].length > 7) {
                e[t].shift();
                for (var n = e[t]; n.length;)f[t] = "A", o && (d[t] = "A"), e.splice(t++, 0, ["C"].concat(n.splice(0, 6)));
                e.splice(t, 1), v = V(i.length, o && o.length || 0)
              }
            }, p = function (e, t, n, r, a) {
              e && t && "M" == e[a][0] && "M" != t[a][0] && (t.splice(a, 0, ["M", r.x, r.y]), n.bx = 0, n.by = 0, n.x = e[a][1], n.y = e[a][2], v = V(i.length, o && o.length || 0))
            }, f = [], d = [], h = "", m = "", g = 0, v = V(i.length, o && o.length || 0); v > g; g++) {
              i[g] && (h = i[g][0]), "C" != h && (f[g] = h, g && (m = f[g - 1])), i[g] = l(i[g], s, m), "A" != f[g] && "C" == h && (f[g] = "C"), c(i, g), o && (o[g] && (h = o[g][0]), "C" != h && (d[g] = h, g && (m = d[g - 1])), o[g] = l(o[g], u, m), "A" != d[g] && "C" == h && (d[g] = "C"), c(o, g)), p(i, o, s, u, g), p(o, i, u, s, g);
              var y = i[g], b = o && o[g], x = y.length, w = o && b.length;
              s.x = y[x - 2], s.y = y[x - 1], s.bx = j(y[x - 4]) || s.x, s.by = j(y[x - 3]) || s.y, u.bx = o && (j(b[w - 4]) || u.x), u.by = o && (j(b[w - 3]) || u.y), u.x = o && b[w - 2], u.y = o && b[w - 1]
            }
            return o || (r.curve = a(i)), o ? [i, o] : i
          }

          function M(e, t) {
            if (!t)return e;
            var n, r, i, a, o, s, u;
            for (e = D(e), i = 0, o = e.length; o > i; i++)for (u = e[i], a = 1, s = u.length; s > a; a += 2)n = t.x(u[a], u[a + 1]), r = t.y(u[a], u[a + 1]), u[a] = n, u[a + 1] = r;
            return e
          }

          function O(e, t) {
            for (var n = [], r = 0, i = e.length; i - 2 * !t > r; r += 2) {
              var a = [{x: +e[r - 2], y: +e[r - 1]}, {x: +e[r], y: +e[r + 1]}, {
                x: +e[r + 2],
                y: +e[r + 3]
              }, {x: +e[r + 4], y: +e[r + 5]}];
              t ? r ? i - 4 == r ? a[3] = {x: +e[0], y: +e[1]} : i - 2 == r && (a[2] = {
                x: +e[0],
                y: +e[1]
              }, a[3] = {x: +e[2], y: +e[3]}) : a[0] = {
                x: +e[i - 2],
                y: +e[i - 1]
              } : i - 4 == r ? a[3] = a[2] : r || (a[0] = {
                x: +e[r],
                y: +e[r + 1]
              }), n.push(["C", (-a[0].x + 6 * a[1].x + a[2].x) / 6, (-a[0].y + 6 * a[1].y + a[2].y) / 6, (a[1].x + 6 * a[2].x - a[3].x) / 6, (a[1].y + 6 * a[2].y - a[3].y) / 6, a[2].x, a[2].y])
            }
            return n
          }

          var N = t.prototype, P = e.is, R = e._.clone, I = "hasOwnProperty", L = /,?([a-z]),?/gi, j = parseFloat, F = Math, B = F.PI, q = F.min, V = F.max, U = F.pow, H = F.abs, W = s(1), Y = s(), z = s(0, 1), G = e._unit2px, X = {
            path: function (e) {
              return e.attr("path")
            }, circle: function (e) {
              var t = G(e);
              return E(t.cx, t.cy, t.r)
            }, ellipse: function (e) {
              var t = G(e);
              return E(t.cx || 0, t.cy || 0, t.rx, t.ry)
            }, rect: function (e) {
              var t = G(e);
              return $(t.x || 0, t.y || 0, t.width, t.height, t.rx, t.ry)
            }, image: function (e) {
              var t = G(e);
              return $(t.x || 0, t.y || 0, t.width, t.height)
            }, line: function (e) {
              return "M" + [e.attr("x1") || 0, e.attr("y1") || 0, e.attr("x2"), e.attr("y2")]
            }, polyline: function (e) {
              return "M" + e.attr("points")
            }, polygon: function (e) {
              return "M" + e.attr("points") + "z"
            }, deflt: function (e) {
              var t = e.node.getBBox();
              return $(t.x, t.y, t.width, t.height)
            }
          };
          e.path = n, e.path.getTotalLength = W, e.path.getPointAtLength = Y, e.path.getSubpath = function (e, t, n) {
            if (this.getTotalLength(e) - n < 1e-6)return z(e, t).end;
            var r = z(e, n, 1);
            return t ? z(r, t).end : r
          }, N.getTotalLength = function () {
            return this.node.getTotalLength ? this.node.getTotalLength() : void 0
          }, N.getPointAtLength = function (e) {
            return Y(this.attr("d"), e)
          }, N.getSubpath = function (t, n) {
            return e.path.getSubpath(this.attr("d"), t, n)
          }, e._.box = r, e.path.findDotsAtSegment = u, e.path.bezierBBox = l, e.path.isPointInsideBBox = c, e.path.isBBoxIntersect = p, e.path.intersection = v, e.path.intersectionNumber = y, e.path.isPointInside = x, e.path.getBBox = w, e.path.get = X, e.path.toRelative = S, e.path.toAbsolute = T, e.path.toCubic = D, e.path.map = M, e.path.toString = i, e.path.clone = a
        }), r.plugin(function (e, n, r, i) {
          for (var a = n.prototype, o = "hasOwnProperty", s = ("createTouch"in i.doc), u = ["click", "dblclick", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "touchstart", "touchmove", "touchend", "touchcancel"], l = {
            mousedown: "touchstart",
            mousemove: "touchmove",
            mouseup: "touchend"
          }, c = (function (e, t) {
            var n = "y" == e ? "scrollTop" : "scrollLeft", r = t && t.node ? t.node.ownerDocument : i.doc;
            return r[n in r.documentElement ? "documentElement" : "body"][n]
          }), p = function () {
            this.returnValue = !1
          }, f = function () {
            return this.originalEvent.preventDefault()
          }, d = function () {
            this.cancelBubble = !0
          }, h = function () {
            return this.originalEvent.stopPropagation()
          }, m = function () {
            return i.doc.addEventListener ? function (e, t, n, r) {
              var i = s && l[t] ? l[t] : t, a = function (i) {
                var a = c("y", r), u = c("x", r);
                if (s && l[o](t))for (var p = 0, d = i.targetTouches && i.targetTouches.length; d > p; p++)if (i.targetTouches[p].target == e || e.contains(i.targetTouches[p].target)) {
                  var m = i;
                  i = i.targetTouches[p], i.originalEvent = m, i.preventDefault = f, i.stopPropagation = h;
                  break
                }
                var g = i.clientX + u, v = i.clientY + a;
                return n.call(r, i, g, v)
              };
              return t !== i && e.addEventListener(t, a, !1), e.addEventListener(i, a, !1), function () {
                return t !== i && e.removeEventListener(t, a, !1), e.removeEventListener(i, a, !1), !0
              }
            } : i.doc.attachEvent ? function (e, t, n, r) {
              var i = function (e) {
                e = e || r.node.ownerDocument.window.event;
                var t = c("y", r), i = c("x", r), a = e.clientX + i, o = e.clientY + t;
                return e.preventDefault = e.preventDefault || p, e.stopPropagation = e.stopPropagation || d, n.call(r, e, a, o)
              };
              e.attachEvent("on" + t, i);
              var a = function () {
                return e.detachEvent("on" + t, i), !0
              };
              return a
            } : void 0
          }(), g = [], v = function (e) {
            for (var n, r = e.clientX, i = e.clientY, a = c("y"), o = c("x"), u = g.length; u--;) {
              if (n = g[u], s) {
                for (var l, p = e.touches && e.touches.length; p--;)if (l = e.touches[p], l.identifier == n.el._drag.id || n.el.node.contains(l.target)) {
                  r = l.clientX, i = l.clientY, (e.originalEvent ? e.originalEvent : e).preventDefault();
                  break
                }
              } else e.preventDefault();
              {
                var f = n.el.node;
                f.nextSibling, f.parentNode, f.style.display
              }
              r += o, i += a, t("snap.drag.move." + n.el.id, n.move_scope || n.el, r - n.el._drag.x, i - n.el._drag.y, r, i, e)
            }
          }, y = function (n) {
            e.unmousemove(v).unmouseup(y);
            for (var r, i = g.length; i--;)r = g[i], r.el._drag = {}, t("snap.drag.end." + r.el.id, r.end_scope || r.start_scope || r.move_scope || r.el, n);
            g = []
          }, b = u.length; b--;)!function (t) {
            e[t] = a[t] = function (n, r) {
              return e.is(n, "function") && (this.events = this.events || [], this.events.push({
                name: t,
                f: n,
                unbind: m(this.node || document, t, n, r || this)
              })), this
            }, e["un" + t] = a["un" + t] = function (e) {
              for (var n = this.events || [], r = n.length; r--;)if (n[r].name == t && (n[r].f == e || !e))return n[r].unbind(), n.splice(r, 1), !n.length && delete this.events, this;
              return this
            }
          }(u[b]);
          a.hover = function (e, t, n, r) {
            return this.mouseover(e, n).mouseout(t, r || n)
          }, a.unhover = function (e, t) {
            return this.unmouseover(e).unmouseout(t)
          };
          var x = [];
          a.drag = function (n, r, i, a, o, s) {
            function u(u, l, c) {
              (u.originalEvent || u).preventDefault(), this._drag.x = l, this._drag.y = c, this._drag.id = u.identifier, !g.length && e.mousemove(v).mouseup(y), g.push({
                el: this,
                move_scope: a,
                start_scope: o,
                end_scope: s
              }), r && t.on("snap.drag.start." + this.id, r), n && t.on("snap.drag.move." + this.id, n), i && t.on("snap.drag.end." + this.id, i), t("snap.drag.start." + this.id, o || a || this, l, c, u)
            }

            if (!arguments.length) {
              var l;
              return this.drag(function (e, t) {
                this.attr({transform: l + (l ? "T" : "t") + [e, t]})
              }, function () {
                l = this.transform().local
              })
            }
            return this._drag = {}, x.push({el: this, start: u}), this.mousedown(u), this
          }, a.undrag = function () {
            for (var n = x.length; n--;)x[n].el == this && (this.unmousedown(x[n].start), x.splice(n, 1), t.unbind("snap.drag.*." + this.id));
            return !x.length && e.unmousemove(v).unmouseup(y), this
          }
        }), r.plugin(function (e, n, r) {
          var i = (n.prototype, r.prototype), a = /^\s*url\((.+)\)/, o = String, s = e._.$;
          e.filter = {}, i.filter = function (t) {
            var r = this;
            "svg" != r.type && (r = r.paper);
            var i = e.parse(o(t)), a = e._.id(), u = (r.node.offsetWidth, r.node.offsetHeight, s("filter"));
            return s(u, {id: a, filterUnits: "userSpaceOnUse"}), u.appendChild(i.node), r.defs.appendChild(u), new n(u)
          }, t.on("snap.util.getattr.filter", function () {
            t.stop();
            var n = s(this.node, "filter");
            if (n) {
              var r = o(n).match(a);
              return r && e.select(r[1])
            }
          }), t.on("snap.util.attr.filter", function (r) {
            if (r instanceof n && "filter" == r.type) {
              t.stop();
              var i = r.node.id;
              i || (s(r.node, {id: r.id}), i = r.id), s(this.node, {filter: e.url(i)})
            }
            r && "none" != r || (t.stop(), this.node.removeAttribute("filter"))
          }), e.filter.blur = function (t, n) {
            null == t && (t = 2);
            var r = null == n ? t : [t, n];
            return e.format('<feGaussianBlur stdDeviation="{def}"/>', {def: r})
          }, e.filter.blur.toString = function () {
            return this()
          }, e.filter.shadow = function (t, n, r, i, a) {
            return "string" == typeof r && (i = r, a = i, r = 4), "string" != typeof i && (a = i, i = "#000"), i = i || "#000", null == r && (r = 4), null == a && (a = 1), null == t && (t = 0, n = 2), null == n && (n = t), i = e.color(i), e.format('<feGaussianBlur in="SourceAlpha" stdDeviation="{blur}"/><feOffset dx="{dx}" dy="{dy}" result="offsetblur"/><feFlood flood-color="{color}"/><feComposite in2="offsetblur" operator="in"/><feComponentTransfer><feFuncA type="linear" slope="{opacity}"/></feComponentTransfer><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>', {
              color: i,
              dx: t,
              dy: n,
              blur: r,
              opacity: a
            })
          }, e.filter.shadow.toString = function () {
            return this()
          }, e.filter.grayscale = function (t) {
            return null == t && (t = 1), e.format('<feColorMatrix type="matrix" values="{a} {b} {c} 0 0 {d} {e} {f} 0 0 {g} {b} {h} 0 0 0 0 0 1 0"/>', {
              a: .2126 + .7874 * (1 - t),
              b: .7152 - .7152 * (1 - t),
              c: .0722 - .0722 * (1 - t),
              d: .2126 - .2126 * (1 - t),
              e: .7152 + .2848 * (1 - t),
              f: .0722 - .0722 * (1 - t),
              g: .2126 - .2126 * (1 - t),
              h: .0722 + .9278 * (1 - t)
            })
          }, e.filter.grayscale.toString = function () {
            return this()
          }, e.filter.sepia = function (t) {
            return null == t && (t = 1), e.format('<feColorMatrix type="matrix" values="{a} {b} {c} 0 0 {d} {e} {f} 0 0 {g} {h} {i} 0 0 0 0 0 1 0"/>', {
              a: .393 + .607 * (1 - t),
              b: .769 - .769 * (1 - t),
              c: .189 - .189 * (1 - t),
              d: .349 - .349 * (1 - t),
              e: .686 + .314 * (1 - t),
              f: .168 - .168 * (1 - t),
              g: .272 - .272 * (1 - t),
              h: .534 - .534 * (1 - t),
              i: .131 + .869 * (1 - t)
            })
          }, e.filter.sepia.toString = function () {
            return this()
          }, e.filter.saturate = function (t) {
            return null == t && (t = 1), e.format('<feColorMatrix type="saturate" values="{amount}"/>', {amount: 1 - t})
          }, e.filter.saturate.toString = function () {
            return this()
          }, e.filter.hueRotate = function (t) {
            return t = t || 0, e.format('<feColorMatrix type="hueRotate" values="{angle}"/>', {angle: t})
          }, e.filter.hueRotate.toString = function () {
            return this()
          }, e.filter.invert = function (t) {
            return null == t && (t = 1), e.format('<feComponentTransfer><feFuncR type="table" tableValues="{amount} {amount2}"/><feFuncG type="table" tableValues="{amount} {amount2}"/><feFuncB type="table" tableValues="{amount} {amount2}"/></feComponentTransfer>', {
              amount: t,
              amount2: 1 - t
            })
          }, e.filter.invert.toString = function () {
            return this()
          }, e.filter.brightness = function (t) {
            return null == t && (t = 1), e.format('<feComponentTransfer><feFuncR type="linear" slope="{amount}"/><feFuncG type="linear" slope="{amount}"/><feFuncB type="linear" slope="{amount}"/></feComponentTransfer>', {amount: t})
          }, e.filter.brightness.toString = function () {
            return this()
          }, e.filter.contrast = function (t) {
            return null == t && (t = 1), e.format('<feComponentTransfer><feFuncR type="linear" slope="{amount}" intercept="{amount2}"/><feFuncG type="linear" slope="{amount}" intercept="{amount2}"/><feFuncB type="linear" slope="{amount}" intercept="{amount2}"/></feComponentTransfer>', {
              amount: t,
              amount2: .5 - t / 2
            })
          }, e.filter.contrast.toString = function () {
            return this()
          }
        }), r
      })
    }, {69: 69}],
    71: [function (e, t) {
      var n = t.exports = e(70);
      n.plugin(function (e, t) {
        t.prototype.children = function () {
          for (var t = [], n = this.node.childNodes, r = 0, i = n.length; i > r; r++)t[r] = new e(n[r]);
          return t
        }
      }), n.plugin(function (e, t) {
        function n(e) {
          return e.split(/\s+/)
        }

        function r(e) {
          return e.join(" ")
        }

        function i(e) {
          return n(e.attr("class") || "")
        }

        function a(e, t) {
          e.attr("class", r(t))
        }

        t.prototype.addClass = function (e) {
          var t, r, o = i(this), s = n(e);
          for (t = 0, r; r = s[t]; t++)-1 === o.indexOf(r) && o.push(r);
          return a(this, o), this
        }, t.prototype.hasClass = function (e) {
          if (!e)throw new Error("[snapsvg] syntax: hasClass(clsStr)");
          return -1 !== i(this).indexOf(e)
        }, t.prototype.removeClass = function (e) {
          var t, r, o, s = i(this), u = n(e);
          for (t = 0, r; r = u[t]; t++)o = s.indexOf(r), -1 !== o && s.splice(o, 1);
          return a(this, s), this
        }
      }), n.plugin(function (e, t) {
        t.prototype.translate = function (t, n) {
          var r = new e.Matrix;
          return r.translate(t, n), this.transform(r)
        }
      }), n.plugin(function (e) {
        e.create = function (t, n) {
          return e._.wrap(e._.$(t, n))
        }
      }), n.plugin(function (e) {
        e.createSnapAt = function (t, n, r) {
          var i = document.createElementNS("http://www.w3.org/2000/svg", "svg");
          return i.setAttribute("width", t), i.setAttribute("height", n), r || (r = document.body), r.appendChild(i), new e(i)
        }
      })
    }, {70: 70}],
    72: [function (e, t, n) {
      var r = function (e) {
        return "[object Array]" === Object.prototype.toString.call(e)
      }, i = function () {
        var e = Array.prototype.slice.call(arguments);
        1 === e.length && r(e[0]) && (e = e[0]);
        var t = e.pop();
        return t.$inject = e, t
      }, a = /^function\s*[^\(]*\(\s*([^\)]*)\)/m, o = /\/\*([^\*]*)\*\//m, s = function (e) {
        if ("function" != typeof e)throw new Error('Cannot annotate "' + e + '". Expected a function!');
        var t = e.toString().match(a);
        return t[1] && t[1].split(",").map(function (e) {
            return t = e.match(o), t ? t[1].trim() : e.trim()
          }) || []
      };
      n.annotate = i, n.parse = s, n.isArray = r
    }, {}],
    73: [function (e, t) {
      t.exports = {annotate: e(72).annotate, Module: e(75), Injector: e(74)}
    }, {72: 72, 74: 74, 75: 75}],
    74: [function (e, t) {
      var n = e(75), r = e(72).parse, i = e(72).annotate, a = e(72).isArray, o = function (e, t) {
        t = t || {
            get: function (e) {
              throw s.push(e), p('No provider for "' + e + '"!')
            }
          };
        var s = [], u = this._providers = Object.create(t._providers || null), l = this._instances = Object.create(null), c = l.injector = this, p = function (e) {
          var t = s.join(" -> ");
          return s.length = 0, new Error(t ? e + " (Resolving: " + t + ")" : e)
        }, f = function (e) {
          if (!u[e] && -1 !== e.indexOf(".")) {
            for (var n = e.split("."), r = f(n.shift()); n.length;)r = r[n.shift()];
            return r
          }
          if (Object.hasOwnProperty.call(l, e))return l[e];
          if (Object.hasOwnProperty.call(u, e)) {
            if (-1 !== s.indexOf(e))throw s.push(e), p("Cannot resolve circular dependency!");
            return s.push(e), l[e] = u[e][0](u[e][1]), s.pop(), l[e]
          }
          return t.get(e)
        }, d = function (e) {
          var t = Object.create(e.prototype), n = h(e, t);
          return "object" == typeof n ? n : t
        }, h = function (e, t) {
          if ("function" != typeof e) {
            if (!a(e))throw new Error('Cannot invoke "' + e + '". Expected a function!');
            e = i(e.slice())
          }
          var n = e.$inject && e.$inject || r(e), o = n.map(function (e) {
            return f(e)
          });
          return e.apply(t, o)
        }, m = function (e) {
          return i(function (t) {
            return e.get(t)
          })
        }, g = function (e, t) {
          if (t && t.length) {
            var n, r, i, a, s = Object.create(null), l = Object.create(null), p = [], f = [], d = [];
            for (var h in u)n = u[h], -1 !== t.indexOf(h) && ("private" === n[2] ? (r = p.indexOf(n[3]), -1 === r ? (i = n[3].createChild([], t), a = m(i), p.push(n[3]), f.push(i), d.push(a), s[h] = [a, h, "private", i]) : s[h] = [d[r], h, "private", f[r]]) : s[h] = [n[2], n[1]], l[h] = !0), "factory" !== n[2] && "type" !== n[2] || !n[1].$scope || t.forEach(function (e) {
              -1 !== n[1].$scope.indexOf(e) && (s[h] = [n[2], n[1]], l[e] = !0)
            });
            t.forEach(function (e) {
              if (!l[e])throw new Error('No provider for "' + e + '". Cannot use provider from the parent!')
            }), e.unshift(s)
          }
          return new o(e, c)
        }, v = {
          factory: h, type: d, value: function (e) {
            return e
          }
        };
        e.forEach(function (e) {
          function t(e, t) {
            return "value" !== e && a(t) && (t = i(t.slice())), t
          }

          if (e instanceof n)e.forEach(function (e) {
            var n = e[0], r = e[1], i = e[2];
            u[n] = [v[r], t(r, i), r]
          }); else if ("object" == typeof e)if (e.__exports__) {
            var r = Object.keys(e).reduce(function (t, n) {
              return "__" !== n.substring(0, 2) && (t[n] = e[n]), t
            }, Object.create(null)), s = new o((e.__modules__ || []).concat([r]), c), l = i(function (e) {
              return s.get(e)
            });
            e.__exports__.forEach(function (e) {
              u[e] = [l, e, "private", s]
            })
          } else Object.keys(e).forEach(function (n) {
            if ("private" === e[n][2])return void(u[n] = e[n]);
            var r = e[n][0], i = e[n][1];
            u[n] = [v[r], t(r, i), r]
          })
        }), this.get = f, this.invoke = h, this.instantiate = d, this.createChild = g
      };
      t.exports = o
    }, {72: 72, 75: 75}],
    75: [function (e, t) {
      var n = function () {
        var e = [];
        this.factory = function (t, n) {
          return e.push([t, "factory", n]), this
        }, this.value = function (t, n) {
          return e.push([t, "value", n]), this
        }, this.type = function (t, n) {
          return e.push([t, "type", n]), this
        }, this.forEach = function (t) {
          e.forEach(t)
        }
      };
      t.exports = n
    }, {}],
    76: [function (e, t) {
      function n(e, t, n) {
        var i = -1, a = e ? e.length : 0;
        for (t = r(t, n, 3); ++i < a;)if (t(e[i], i, e))return i;
        return -1
      }

      var r = e(98);
      t.exports = n
    }, {98: 98}],
    77: [function (e, t) {
      function n(e, t, n) {
        var s = o(e) ? r : a;
        return ("function" != typeof t || "undefined" != typeof n) && (t = i(t, n, 3)), s(e, t)
      }

      var r = e(92), i = e(98), a = e(103), o = e(150);
      t.exports = n
    }, {103: 103, 150: 150, 92: 92, 98: 98}],
    78: [function (e, t) {
      function n(e, t, n) {
        var s = o(e) ? r : a;
        return t = i(t, n, 3), s(e, t)
      }

      var r = e(93), i = e(98), a = e(104), o = e(150);
      t.exports = n
    }, {104: 104, 150: 150, 93: 93, 98: 98}],
    79: [function (e, t) {
      function n(e, t, n) {
        if (s(e)) {
          var u = o(e, t, n);
          return u > -1 ? e[u] : void 0
        }
        return t = r(t, n, 3), a(e, t, i)
      }

      var r = e(98), i = e(102), a = e(105), o = e(76), s = e(150);
      t.exports = n
    }, {102: 102, 105: 105, 150: 150, 76: 76, 98: 98}],
    80: [function (e, t) {
      function n(e, t, n) {
        return "function" == typeof t && "undefined" == typeof n && o(e) ? r(e, t) : i(e, a(t, n, 3))
      }

      var r = e(91), i = e(102), a = e(127), o = e(150);
      t.exports = n
    }, {102: 102, 127: 127, 150: 150, 91: 91}],
    81: [function (e, t) {
      var n = e(130), r = Object.prototype, i = r.hasOwnProperty, a = n(function (e, t, n) {
        i.call(e, n) ? e[n].push(t) : e[n] = [t]
      });
      t.exports = a
    }, {130: 130}],
    82: [function (e, t) {
      function n(e, t, n) {
        var l = e ? e.length : 0;
        return a(l) || (e = s(e), l = e.length), l ? (n = "number" == typeof n ? 0 > n ? u(l + n, 0) : n || 0 : 0, "string" == typeof e || !i(e) && o(e) ? l > n && e.indexOf(t, n) > -1 : r(e, t, n) > -1) : !1
      }

      var r = e(110), i = e(150), a = e(140), o = e(156), s = e(165), u = Math.max;
      t.exports = n
    }, {110: 110, 140: 140, 150: 150, 156: 156, 165: 165}],
    83: [function (e, t) {
      function n(e, t, n) {
        var s = o(e) ? r : a;
        return t = i(t, n, 3), s(e, t)
      }

      var r = e(94), i = e(98), a = e(115), o = e(150);
      t.exports = n
    }, {115: 115, 150: 150, 94: 94, 98: 98}],
    84: [function (e, t) {
      function n(e, t, n, u) {
        var l = s(e) ? r : o;
        return l(e, i(t, u, 4), n, arguments.length < 3, a)
      }

      var r = e(95), i = e(98), a = e(102), o = e(121), s = e(150);
      t.exports = n
    }, {102: 102, 121: 121, 150: 150, 95: 95, 98: 98}],
    85: [function (e, t) {
      function n(e, t, n) {
        var s = o(e) ? r : a;
        return ("function" != typeof t || "undefined" != typeof n) && (t = i(t, n, 3)), s(e, t)
      }

      var r = e(96), i = e(98), a = e(124), o = e(150);
      t.exports = n
    }, {124: 124, 150: 150, 96: 96, 98: 98}],
    86: [function (e, t) {
      var n = e(152), r = n(r = Date.now) && r, i = r || function () {
          return (new Date).getTime()
        };
      t.exports = i
    }, {152: 152}],
    87: [function (e, t) {
      function n(e, t, n) {
        function s() {
          g && clearTimeout(g), f && clearTimeout(f), f = g = v = void 0
        }

        function u() {
          var n = t - (i() - h);
          if (0 >= n || n > t) {
            f && clearTimeout(f);
            var r = v;
            f = g = v = void 0, r && (y = i(), d = e.apply(m, p), g || f || (p = m = null))
          } else g = setTimeout(u, n)
        }

        function l() {
          g && clearTimeout(g), f = g = v = void 0, (x || b !== t) && (y = i(), d = e.apply(m, p), g || f || (p = m = null))
        }

        function c() {
          if (p = arguments, h = i(), m = this, v = x && (g || !w), b === !1)var n = w && !g; else {
            f || w || (y = h);
            var r = b - (h - y), a = 0 >= r || r > b;
            a ? (f && (f = clearTimeout(f)), y = h, d = e.apply(m, p)) : f || (f = setTimeout(l, r))
          }
          return a && g ? g = clearTimeout(g) : g || t === b || (g = setTimeout(u, t)), n && (a = !0, d = e.apply(m, p)), !a || g || f || (p = m = null), d
        }

        var p, f, d, h, m, g, v, y = 0, b = !1, x = !0;
        if ("function" != typeof e)throw new TypeError(a);
        if (t = 0 > t ? 0 : +t || 0, n === !0) {
          var w = !0;
          x = !1
        } else r(n) && (w = n.leading, b = "maxWait"in n && o(+n.maxWait || 0, t), x = "trailing"in n ? n.trailing : x);
        return c.cancel = s, c
      }

      var r = e(154), i = e(86), a = "Expected a function", o = Math.max;
      t.exports = n
    }, {154: 154, 86: 86}],
    88: [function (e, t) {
      function n(e) {
        return r(e, 1, arguments, 1)
      }

      var r = e(100);
      t.exports = n
    }, {100: 100}],
    89: [function (e, t) {
      (function (n) {
        function r(e) {
          var t = e ? e.length : 0;
          for (this.data = {hash: s(null), set: new o}; t--;)this.push(e[t])
        }

        var i = e(129), a = e(152), o = a(o = n.Set) && o, s = a(s = Object.create) && s;
        r.prototype.push = i, t.exports = r
      }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {129: 129, 152: 152}],
    90: [function (e, t) {
      function n(e, t) {
        var n = -1, r = e.length;
        for (t || (t = Array(r)); ++n < r;)t[n] = e[n];
        return t
      }

      t.exports = n
    }, {}],
    91: [function (e, t) {
      function n(e, t) {
        for (var n = -1, r = e.length; ++n < r && t(e[n], n, e) !== !1;);
        return e
      }

      t.exports = n
    }, {}],
    92: [function (e, t) {
      function n(e, t) {
        for (var n = -1, r = e.length; ++n < r;)if (!t(e[n], n, e))return !1;
        return !0
      }

      t.exports = n
    }, {}],
    93: [function (e, t) {
      function n(e, t) {
        for (var n = -1, r = e.length, i = -1, a = []; ++n < r;) {
          var o = e[n];
          t(o, n, e) && (a[++i] = o)
        }
        return a
      }

      t.exports = n
    }, {}],
    94: [function (e, t) {
      function n(e, t) {
        for (var n = -1, r = e.length, i = Array(r); ++n < r;)i[n] = t(e[n], n, e);
        return i
      }

      t.exports = n
    }, {}],
    95: [function (e, t) {
      function n(e, t, n, r) {
        var i = -1, a = e.length;
        for (r && a && (n = e[++i]); ++i < a;)n = t(n, e[i], i, e);
        return n
      }

      t.exports = n
    }, {}],
    96: [function (e, t) {
      function n(e, t) {
        for (var n = -1, r = e.length; ++n < r;)if (t(e[n], n, e))return !0;
        return !1
      }

      t.exports = n
    }, {}],
    97: [function (e, t) {
      function n(e, t, n) {
        var a = i(t);
        if (!n)return r(t, e, a);
        for (var o = -1, s = a.length; ++o < s;) {
          var u = a[o], l = e[u], c = n(l, t[u], u, e, t);
          (c === c ? c === l : l !== l) && ("undefined" != typeof l || u in e) || (e[u] = c)
        }
        return e
      }

      var r = e(99), i = e(160);
      t.exports = n
    }, {160: 160, 99: 99}],
    98: [function (e, t) {
      function n(e, t, n) {
        var l = typeof e;
        return "function" == l ? "undefined" != typeof t && u(e) ? o(e, t, n) : e : null == e ? s : "object" == l ? r(e) : "undefined" == typeof t ? a(e + "") : i(e + "", t)
      }

      var r = e(116), i = e(117), a = e(120), o = e(127), s = e(169), u = e(137);
      t.exports = n
    }, {116: 116, 117: 117, 120: 120, 127: 127, 137: 137, 169: 169}],
    99: [function (e, t) {
      function n(e, t, n) {
        n || (n = t, t = {});
        for (var r = -1, i = n.length; ++r < i;) {
          var a = n[r];
          t[a] = e[a]
        }
        return t
      }

      t.exports = n
    }, {}],
    100: [function (e, t) {
      function n(e, t, n, a) {
        if ("function" != typeof e)throw new TypeError(i);
        return setTimeout(function () {
          e.apply(void 0, r(n, a))
        }, t)
      }

      var r = e(123), i = "Expected a function";
      t.exports = n
    }, {123: 123}],
    101: [function (e, t) {
      function n(e, t) {
        var n = e ? e.length : 0, o = [];
        if (!n)return o;
        var s = -1, u = r, l = !0, c = l && t.length >= 200 ? a(t) : null, p = t.length;
        c && (u = i, l = !1, t = c);
        e:for (; ++s < n;) {
          var f = e[s];
          if (l && f === f) {
            for (var d = p; d--;)if (t[d] === f)continue e;
            o.push(f)
          } else u(t, f, 0) < 0 && o.push(f)
        }
        return o
      }

      var r = e(110), i = e(128), a = e(132);
      t.exports = n
    }, {110: 110, 128: 128, 132: 132}],
    102: [function (e, t) {
      function n(e, t) {
        var n = e ? e.length : 0;
        if (!i(n))return r(e, t);
        for (var o = -1, s = a(e); ++o < n && t(s[o], o, s) !== !1;);
        return e
      }

      var r = e(109), i = e(140), a = e(148);
      t.exports = n
    }, {109: 109, 140: 140, 148: 148}],
    103: [function (e, t) {
      function n(e, t) {
        var n = !0;
        return r(e, function (e, r, i) {
          return n = !!t(e, r, i)
        }), n
      }

      var r = e(102);
      t.exports = n
    }, {102: 102}],
    104: [function (e, t) {
      function n(e, t) {
        var n = [];
        return r(e, function (e, r, i) {
          t(e, r, i) && n.push(e)
        }), n
      }

      var r = e(102);
      t.exports = n
    }, {102: 102}],
    105: [function (e, t) {
      function n(e, t, n, r) {
        var i;
        return n(e, function (e, n, a) {
          return t(e, n, a) ? (i = r ? n : e, !1) : void 0
        }), i
      }

      t.exports = n
    }, {}],
    106: [function (e, t) {
      function n(e, t, s, u) {
        for (var l = u - 1, c = e.length, p = -1, f = []; ++l < c;) {
          var d = e[l];
          if (o(d) && a(d.length) && (i(d) || r(d))) {
            t && (d = n(d, t, s, 0));
            var h = -1, m = d.length;
            for (f.length += m; ++h < m;)f[++p] = d[h]
          } else s || (f[++p] = d)
        }
        return f
      }

      var r = e(149), i = e(150), a = e(140), o = e(141);
      t.exports = n
    }, {140: 140, 141: 141, 149: 149, 150: 150}],
    107: [function (e, t) {
      function n(e, t, n) {
        for (var i = -1, a = r(e), o = n(e), s = o.length; ++i < s;) {
          var u = o[i];
          if (t(a[u], u, a) === !1)break
        }
        return e
      }

      var r = e(148);
      t.exports = n
    }, {148: 148}],
    108: [function (e, t) {
      function n(e, t) {
        return r(e, t, i)
      }

      var r = e(107), i = e(161);
      t.exports = n
    }, {107: 107, 161: 161}],
    109: [function (e, t) {
      function n(e, t) {
        return r(e, t, i)
      }

      var r = e(107), i = e(160);
      t.exports = n
    }, {107: 107, 160: 160}],
    110: [function (e, t) {
      function n(e, t, n) {
        if (t !== t)return r(e, n);
        for (var i = n - 1, a = e.length; ++i < a;)if (e[i] === t)return i;
        return -1
      }

      var r = e(136);
      t.exports = n
    }, {136: 136}],
    111: [function (e, t) {
      function n(e, t, i, a, o, s) {
        if (e === t)return 0 !== e || 1 / e == 1 / t;
        var u = typeof e, l = typeof t;
        return "function" != u && "object" != u && "function" != l && "object" != l || null == e || null == t ? e !== e && t !== t : r(e, t, n, i, a, o, s)
      }

      var r = e(112);
      t.exports = n
    }, {112: 112}],
    112: [function (e, t) {
      function n(e, t, n, p, h, m, g) {
        var v = o(e), y = o(t), b = l, x = l;
        v || (b = d.call(e), b == u ? b = c : b != c && (v = s(e))), y || (x = d.call(t), x == u ? x = c : x != c && (y = s(t)));
        var w = b == c, $ = x == c, E = b == x;
        if (E && !v && !w)return i(e, t, b);
        var S = w && f.call(e, "__wrapped__"), T = $ && f.call(t, "__wrapped__");
        if (S || T)return n(S ? e.value() : e, T ? t.value() : t, p, h, m, g);
        if (!E)return !1;
        m || (m = []), g || (g = []);
        for (var C = m.length; C--;)if (m[C] == e)return g[C] == t;
        m.push(e), g.push(t);
        var k = (v ? r : a)(e, t, n, p, h, m, g);
        return m.pop(), g.pop(), k
      }

      var r = e(133), i = e(134), a = e(135), o = e(150), s = e(157), u = "[object Arguments]", l = "[object Array]", c = "[object Object]", p = Object.prototype, f = p.hasOwnProperty, d = p.toString;
      t.exports = n
    }, {133: 133, 134: 134, 135: 135, 150: 150, 157: 157}],
    113: [function (e, t) {
      function n(e) {
        return "function" == typeof e || !1
      }

      t.exports = n
    }, {}],
    114: [function (e, t) {
      function n(e, t, n, i, o) {
        var s = t.length;
        if (null == e)return !s;
        for (var u = -1, l = !o; ++u < s;)if (l && i[u] ? n[u] !== e[t[u]] : !a.call(e, t[u]))return !1;
        for (u = -1; ++u < s;) {
          var c = t[u];
          if (l && i[u])var p = a.call(e, c); else {
            var f = e[c], d = n[u];
            p = o ? o(f, d, c) : void 0, "undefined" == typeof p && (p = r(d, f, o, !0))
          }
          if (!p)return !1
        }
        return !0
      }

      var r = e(111), i = Object.prototype, a = i.hasOwnProperty;
      t.exports = n
    }, {111: 111}],
    115: [function (e, t) {
      function n(e, t) {
        var n = [];
        return r(e, function (e, r, i) {
          n.push(t(e, r, i))
        }), n
      }

      var r = e(102);
      t.exports = n
    }, {102: 102}],
    116: [function (e, t) {
      function n(e) {
        var t = a(e), n = t.length;
        if (1 == n) {
          var o = t[0], u = e[o];
          if (i(u))return function (e) {
            return null != e && e[o] === u && s.call(e, o)
          }
        }
        for (var l = Array(n), c = Array(n); n--;)u = e[t[n]], l[n] = u, c[n] = i(u);
        return function (e) {
          return r(e, t, l, c)
        }
      }

      var r = e(114), i = e(142), a = e(160), o = Object.prototype, s = o.hasOwnProperty;
      t.exports = n
    }, {114: 114, 142: 142, 160: 160}],
    117: [function (e, t) {
      function n(e, t) {
        return i(t) ? function (n) {
          return null != n && n[e] === t
        } : function (n) {
          return null != n && r(t, n[e], null, !0)
        }
      }

      var r = e(111), i = e(142);
      t.exports = n
    }, {111: 111, 142: 142}],
    118: [function (e, t) {
      function n(e, t, p, f, d) {
        if (!u(e))return e;
        var h = s(t.length) && (o(t) || c(t));
        return (h ? r : i)(t, function (t, r, i) {
          if (l(t))return f || (f = []), d || (d = []), a(e, i, r, n, p, f, d);
          var o = e[r], s = p ? p(o, t, r, e, i) : void 0, u = "undefined" == typeof s;
          u && (s = t), !h && "undefined" == typeof s || !u && (s === s ? s === o : o !== o) || (e[r] = s)
        }), e
      }

      var r = e(91), i = e(109), a = e(119), o = e(150), s = e(140), u = e(154), l = e(141), c = e(157);
      t.exports = n
    }, {109: 109, 119: 119, 140: 140, 141: 141, 150: 150, 154: 154, 157: 157, 91: 91}],
    119: [function (e, t) {
      function n(e, t, n, c, p, f, d) {
        for (var h = f.length, m = t[n]; h--;)if (f[h] == m)return void(e[n] = d[h]);
        var g = e[n], v = p ? p(g, m, n, e, t) : void 0, y = "undefined" == typeof v;
        y && (v = m, o(m.length) && (a(m) || u(m)) ? v = a(g) ? g : g ? r(g) : [] : s(m) || i(m) ? v = i(g) ? l(g) : s(g) ? g : {} : y = !1), f.push(m), d.push(v), y ? e[n] = c(v, m, p, f, d) : (v === v ? v !== g : g === g) && (e[n] = v)
      }

      var r = e(90), i = e(149), a = e(150), o = e(140), s = e(155), u = e(157), l = e(158);
      t.exports = n
    }, {140: 140, 149: 149, 150: 150, 155: 155, 157: 157, 158: 158, 90: 90}],
    120: [function (e, t) {
      function n(e) {
        return function (t) {
          return null == t ? void 0 : t[e]
        }
      }

      t.exports = n
    }, {}],
    121: [function (e, t) {
      function n(e, t, n, r, i) {
        return i(e, function (e, i, a) {
          n = r ? (r = !1, e) : t(n, e, i, a)
        }), n
      }

      t.exports = n
    }, {}],
    122: [function (e, t) {
      var n = e(169), r = e(143), i = r ? function (e, t) {
        return r.set(e, t), e
      } : n;
      t.exports = i
    }, {143: 143, 169: 169}],
    123: [function (e, t) {
      function n(e, t, n) {
        var r = -1, i = e.length;
        t = null == t ? 0 : +t || 0, 0 > t && (t = -t > i ? 0 : i + t), n = "undefined" == typeof n || n > i ? i : +n || 0, 0 > n && (n += i), i = t > n ? 0 : n - t >>> 0, t >>>= 0;
        for (var a = Array(i); ++r < i;)a[r] = e[r + t];
        return a
      }

      t.exports = n
    }, {}],
    124: [function (e, t) {
      function n(e, t) {
        var n;
        return r(e, function (e, r, i) {
          return n = t(e, r, i), !n
        }), !!n
      }

      var r = e(102);
      t.exports = n
    }, {102: 102}],
    125: [function (e, t) {
      function n(e) {
        return "string" == typeof e ? e : null == e ? "" : e + ""
      }

      t.exports = n
    }, {}],
    126: [function (e, t) {
      function n(e, t) {
        for (var n = -1, r = t.length, i = Array(r); ++n < r;)i[n] = e[t[n]];
        return i
      }

      t.exports = n
    }, {}],
    127: [function (e, t) {
      function n(e, t, n) {
        if ("function" != typeof e)return r;
        if ("undefined" == typeof t)return e;
        switch (n) {
          case 1:
            return function (n) {
              return e.call(t, n)
            };
          case 3:
            return function (n, r, i) {
              return e.call(t, n, r, i)
            };
          case 4:
            return function (n, r, i, a) {
              return e.call(t, n, r, i, a)
            };
          case 5:
            return function (n, r, i, a, o) {
              return e.call(t, n, r, i, a, o)
            }
        }
        return function () {
          return e.apply(t, arguments)
        }
      }

      var r = e(169);
      t.exports = n
    }, {169: 169}],
    128: [function (e, t) {
      function n(e, t) {
        var n = e.data, i = "string" == typeof t || r(t) ? n.set.has(t) : n.hash[t];
        return i ? 0 : -1
      }

      var r = e(154);
      t.exports = n
    }, {154: 154}],
    129: [function (e, t) {
      function n(e) {
        var t = this.data;
        "string" == typeof e || r(e) ? t.set.add(e) : t.hash[e] = !0
      }

      var r = e(154);
      t.exports = n
    }, {154: 154}],
    130: [function (e, t) {
      function n(e, t) {
        return function (n, o, s) {
          var u = t ? t() : {};
          if (o = r(o, s, 3), a(n))for (var l = -1, c = n.length; ++l < c;) {
            var p = n[l];
            e(u, p, o(p, l, n), n)
          } else i(n, function (t, n, r) {
            e(u, t, o(t, n, r), r)
          });
          return u
        }
      }

      var r = e(98), i = e(102), a = e(150);
      t.exports = n
    }, {102: 102, 150: 150, 98: 98}],
    131: [function (e, t) {
      function n(e) {
        return function () {
          var t = arguments, n = t.length, a = t[0];
          if (2 > n || null == a)return a;
          var o = t[n - 2], s = t[n - 1], u = t[3];
          n > 3 && "function" == typeof o ? (o = r(o, s, 5), n -= 2) : (o = n > 2 && "function" == typeof s ? s : null, n -= o ? 1 : 0), u && i(t[1], t[2], u) && (o = 3 == n ? null : o, n = 2);
          for (var l = 0; ++l < n;) {
            var c = t[l];
            c && e(a, c, o)
          }
          return a
        }
      }

      var r = e(127), i = e(139);
      t.exports = n
    }, {127: 127, 139: 139}],
    132: [function (e, t) {
      (function (n) {
        var r = e(89), i = e(168), a = e(152), o = a(o = n.Set) && o, s = a(s = Object.create) && s, u = s && o ? function (e) {
          return new r(e)
        } : i(null);
        t.exports = u
      }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {152: 152, 168: 168, 89: 89}],
    133: [function (e, t) {
      function n(e, t, n, r, i, a, o) {
        var s = -1, u = e.length, l = t.length, c = !0;
        if (u != l && !(i && l > u))return !1;
        for (; c && ++s < u;) {
          var p = e[s], f = t[s];
          if (c = void 0, r && (c = i ? r(f, p, s) : r(p, f, s)), "undefined" == typeof c)if (i)for (var d = l; d-- && (f = t[d], !(c = p && p === f || n(p, f, r, i, a, o)));); else c = p && p === f || n(p, f, r, i, a, o)
        }
        return !!c
      }

      t.exports = n
    }, {}],
    134: [function (e, t) {
      function n(e, t, n) {
        switch (n) {
          case r:
          case i:
            return +e == +t;
          case a:
            return e.name == t.name && e.message == t.message;
          case o:
            return e != +e ? t != +t : 0 == e ? 1 / e == 1 / t : e == +t;
          case s:
          case u:
            return e == t + ""
        }
        return !1
      }

      var r = "[object Boolean]", i = "[object Date]", a = "[object Error]", o = "[object Number]", s = "[object RegExp]", u = "[object String]";
      t.exports = n
    }, {}],
    135: [function (e, t) {
      function n(e, t, n, i, o, s, u) {
        var l = r(e), c = l.length, p = r(t), f = p.length;
        if (c != f && !o)return !1;
        for (var d, h = -1; ++h < c;) {
          var m = l[h], g = a.call(t, m);
          if (g) {
            var v = e[m], y = t[m];
            g = void 0, i && (g = o ? i(y, v, m) : i(v, y, m)), "undefined" == typeof g && (g = v && v === y || n(v, y, i, o, s, u))
          }
          if (!g)return !1;
          d || (d = "constructor" == m)
        }
        if (!d) {
          var b = e.constructor, x = t.constructor;
          if (b != x && "constructor"in e && "constructor"in t && !("function" == typeof b && b instanceof b && "function" == typeof x && x instanceof x))return !1
        }
        return !0
      }

      var r = e(160), i = Object.prototype, a = i.hasOwnProperty;
      t.exports = n
    }, {160: 160}],
    136: [function (e, t) {
      function n(e, t, n) {
        for (var r = e.length, i = t + (n ? 0 : -1); n ? i-- : ++i < r;) {
          var a = e[i];
          if (a !== a)return i
        }
        return -1
      }

      t.exports = n
    }, {}],
    137: [function (e, t) {
      function n(e) {
        var t = !(a.funcNames ? e.name : a.funcDecomp);
        if (!t) {
          var n = u.call(e);
          a.funcNames || (t = !o.test(n)), t || (t = s.test(n) || i(e), r(e, t))
        }
        return t
      }

      var r = e(122), i = e(152), a = e(167), o = /^\s*function[ \n\r\t]+\w/, s = /\bthis\b/, u = Function.prototype.toString;
      t.exports = n
    }, {122: 122, 152: 152, 167: 167}],
    138: [function (e, t) {
      function n(e, t) {
        return e = +e, t = null == t ? r : t, e > -1 && e % 1 == 0 && t > e
      }

      var r = Math.pow(2, 53) - 1;
      t.exports = n
    }, {}],
    139: [function (e, t) {
      function n(e, t, n) {
        if (!a(n))return !1;
        var o = typeof t;
        if ("number" == o)var s = n.length, u = i(s) && r(t, s); else u = "string" == o && t in n;
        if (u) {
          var l = n[t];
          return e === e ? e === l : l !== l
        }
        return !1
      }

      var r = e(138), i = e(140), a = e(154);
      t.exports = n
    }, {138: 138, 140: 140, 154: 154}],
    140: [function (e, t) {
      function n(e) {
        return "number" == typeof e && e > -1 && e % 1 == 0 && r >= e
      }

      var r = Math.pow(2, 53) - 1;
      t.exports = n
    }, {}],
    141: [function (e, t) {
      function n(e) {
        return e && "object" == typeof e || !1
      }

      t.exports = n
    }, {}],
    142: [function (e, t) {
      function n(e) {
        return e === e && (0 === e ? 1 / e > 0 : !r(e))
      }

      var r = e(154);
      t.exports = n
    }, {154: 154}],
    143: [function (e, t) {
      (function (n) {
        var r = e(152), i = r(i = n.WeakMap) && i, a = i && new i;
        t.exports = a
      }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {152: 152}],
    144: [function (e, t) {
      function n(e, t) {
        e = r(e);
        for (var n = -1, i = t.length, a = {}; ++n < i;) {
          var o = t[n];
          o in e && (a[o] = e[o])
        }
        return a
      }

      var r = e(148);
      t.exports = n
    }, {148: 148}],
    145: [function (e, t) {
      function n(e, t) {
        var n = {};
        return r(e, function (e, r, i) {
          t(e, r, i) && (n[r] = e)
        }), n
      }

      var r = e(108);
      t.exports = n
    }, {108: 108}],
    146: [function (e, t) {
      function n(e) {
        var t;
        if (!i(e) || u.call(e) != a || !s.call(e, "constructor") && (t = e.constructor, "function" == typeof t && !(t instanceof t)))return !1;
        var n;
        return r(e, function (e, t) {
          n = t
        }), "undefined" == typeof n || s.call(e, n)
      }

      var r = e(108), i = e(141), a = "[object Object]", o = Object.prototype, s = o.hasOwnProperty, u = o.toString;
      t.exports = n
    }, {108: 108, 141: 141}],
    147: [function (e, t) {
      function n(e) {
        for (var t = s(e), n = t.length, l = n && e.length, p = l && o(l) && (i(e) || u.nonEnumArgs && r(e)), f = -1, d = []; ++f < n;) {
          var h = t[f];
          (p && a(h, l) || c.call(e, h)) && d.push(h)
        }
        return d
      }

      var r = e(149), i = e(150), a = e(138), o = e(140), s = e(161), u = e(167), l = Object.prototype, c = l.hasOwnProperty;
      t.exports = n
    }, {138: 138, 140: 140, 149: 149, 150: 150, 161: 161, 167: 167}],
    148: [function (e, t) {
      function n(e) {
        return r(e) ? e : Object(e)
      }

      var r = e(154);
      t.exports = n
    }, {154: 154}],
    149: [function (e, t) {
      function n(e) {
        var t = i(e) ? e.length : void 0;
        return r(t) && s.call(e) == a || !1
      }

      var r = e(140), i = e(141), a = "[object Arguments]", o = Object.prototype, s = o.toString;
      t.exports = n
    }, {140: 140, 141: 141}],
    150: [function (e, t) {
      var n = e(140), r = e(152), i = e(141), a = "[object Array]", o = Object.prototype, s = o.toString, u = r(u = Array.isArray) && u, l = u || function (e) {
          return i(e) && n(e.length) && s.call(e) == a || !1
        };
      t.exports = l
    }, {140: 140, 141: 141, 152: 152}],
    151: [function (e, t) {
      (function (n) {
        var r = e(113), i = e(152), a = "[object Function]", o = Object.prototype, s = o.toString, u = i(u = n.Uint8Array) && u, l = r(/x/) || u && !r(u) ? function (e) {
          return s.call(e) == a
        } : r;
        t.exports = l
      }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {113: 113, 152: 152}],
    152: [function (e, t) {
      function n(e) {
        return null == e ? !1 : l.call(e) == a ? c.test(u.call(e)) : i(e) && o.test(e) || !1
      }

      var r = e(166), i = e(141), a = "[object Function]", o = /^\[object .+?Constructor\]$/, s = Object.prototype, u = Function.prototype.toString, l = s.toString, c = RegExp("^" + r(l).replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
      t.exports = n
    }, {141: 141, 166: 166}],
    153: [function (e, t) {
      function n(e) {
        return "number" == typeof e || r(e) && o.call(e) == i || !1
      }

      var r = e(141), i = "[object Number]", a = Object.prototype, o = a.toString;
      t.exports = n
    }, {141: 141}],
    154: [function (e, t) {
      function n(e) {
        var t = typeof e;
        return "function" == t || e && "object" == t || !1
      }

      t.exports = n
    }, {}],
    155: [function (e, t) {
      var n = e(152), r = e(146), i = "[object Object]", a = Object.prototype, o = a.toString, s = n(s = Object.getPrototypeOf) && s, u = s ? function (e) {
        if (!e || o.call(e) != i)return !1;
        var t = e.valueOf, a = n(t) && (a = s(t)) && s(a);
        return a ? e == a || s(e) == a : r(e)
      } : r;
      t.exports = u
    }, {146: 146, 152: 152}],
    156: [function (e, t) {
      function n(e) {
        return "string" == typeof e || r(e) && o.call(e) == i || !1
      }

      var r = e(141), i = "[object String]", a = Object.prototype, o = a.toString;
      t.exports = n
    }, {141: 141}],
    157: [function (e, t) {
      function n(e) {
        return i(e) && r(e.length) && A[D.call(e)] || !1
      }

      var r = e(140), i = e(141), a = "[object Arguments]", o = "[object Array]", s = "[object Boolean]", u = "[object Date]", l = "[object Error]", c = "[object Function]", p = "[object Map]", f = "[object Number]", d = "[object Object]", h = "[object RegExp]", m = "[object Set]", g = "[object String]", v = "[object WeakMap]", y = "[object ArrayBuffer]", b = "[object Float32Array]", x = "[object Float64Array]", w = "[object Int8Array]", $ = "[object Int16Array]", E = "[object Int32Array]", S = "[object Uint8Array]", T = "[object Uint8ClampedArray]", C = "[object Uint16Array]", k = "[object Uint32Array]", A = {};
      A[b] = A[x] = A[w] = A[$] = A[E] = A[S] = A[T] = A[C] = A[k] = !0, A[a] = A[o] = A[y] = A[s] = A[u] = A[l] = A[c] = A[p] = A[f] = A[d] = A[h] = A[m] = A[g] = A[v] = !1;
      var _ = Object.prototype, D = _.toString;
      t.exports = n
    }, {140: 140, 141: 141}],
    158: [function (e, t) {
      function n(e) {
        return r(e, i(e))
      }

      var r = e(99), i = e(161);
      t.exports = n
    }, {161: 161, 99: 99}],
    159: [function (e, t) {
      var n = e(97), r = e(131), i = r(n);
      t.exports = i
    }, {131: 131, 97: 97}],
    160: [function (e, t) {
      var n = e(140), r = e(152), i = e(154), a = e(147), o = r(o = Object.keys) && o, s = o ? function (e) {
        if (e)var t = e.constructor, r = e.length;
        return "function" == typeof t && t.prototype === e || "function" != typeof e && r && n(r) ? a(e) : i(e) ? o(e) : []
      } : a;
      t.exports = s
    }, {140: 140, 147: 147, 152: 152, 154: 154}],
    161: [function (e, t) {
      function n(e) {
        if (null == e)return [];
        s(e) || (e = Object(e));
        var t = e.length;
        t = t && o(t) && (i(e) || u.nonEnumArgs && r(e)) && t || 0;
        for (var n = e.constructor, l = -1, p = "function" == typeof n && n.prototype === e, f = Array(t), d = t > 0; ++l < t;)f[l] = l + "";
        for (var h in e)d && a(h, t) || "constructor" == h && (p || !c.call(e, h)) || f.push(h);
        return f
      }

      var r = e(149), i = e(150), a = e(138), o = e(140), s = e(154), u = e(167), l = Object.prototype, c = l.hasOwnProperty;
      t.exports = n
    }, {138: 138, 140: 140, 149: 149, 150: 150, 154: 154, 167: 167}],
    162: [function (e, t) {
      var n = e(118), r = e(131), i = r(n);
      t.exports = i
    }, {118: 118, 131: 131}],
    163: [function (e, t) {
      function n(e, t, n) {
        if (null == e)return {};
        if ("function" != typeof t) {
          var c = r(a(arguments, !1, !1, 1), String);
          return u(e, i(s(e), c))
        }
        return t = o(t, n, 3), l(e, function (e, n, r) {
          return !t(e, n, r)
        })
      }

      var r = e(94), i = e(101), a = e(106), o = e(127), s = e(161), u = e(144), l = e(145);
      t.exports = n
    }, {101: 101, 106: 106, 127: 127, 144: 144, 145: 145, 161: 161, 94: 94}],
    164: [function (e, t) {
      function n(e, t, n) {
        return null == e ? {} : "function" == typeof t ? o(e, i(t, n, 3)) : a(e, r(arguments, !1, !1, 1))
      }

      var r = e(106), i = e(127), a = e(144), o = e(145);
      t.exports = n
    }, {106: 106, 127: 127, 144: 144, 145: 145}],
    165: [function (e, t) {
      function n(e) {
        return r(e, i(e))
      }

      var r = e(126), i = e(160);
      t.exports = n
    }, {126: 126, 160: 160}],
    166: [function (e, t) {
      function n(e) {
        return e = r(e), e && a.test(e) ? e.replace(i, "\\$&") : e
      }

      var r = e(125), i = /[.*+?^${}()|[\]\/\\]/g, a = RegExp(i.source);
      t.exports = n
    }, {125: 125}],
    167: [function (e, t) {
      (function (n) {
        var r = e(152), i = /\bthis\b/, a = Object.prototype, o = (o = n.window) && o.document, s = a.propertyIsEnumerable, u = {};
        !function () {
          u.funcDecomp = !r(n.WinRTError) && i.test(function () {
              return this
            }), u.funcNames = "string" == typeof Function.name;
          try {
            u.dom = 11 === o.createDocumentFragment().nodeType
          } catch (e) {
            u.dom = !1
          }
          try {
            u.nonEnumArgs = !s.call(arguments, 1)
          } catch (e) {
            u.nonEnumArgs = !0
          }
        }(0, 0), t.exports = u
      }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {152: 152}],
    168: [function (e, t) {
      function n(e) {
        return function () {
          return e
        }
      }

      t.exports = n
    }, {}],
    169: [function (e, t) {
      function n(e) {
        return e
      }

      t.exports = n
    }, {}],
    170: [function (e, t) {
      t.exports = e(177)
    }, {177: 177}],
    171: [function (e, t) {
      t.exports = function (e) {
        for (var t; e.childNodes.length;)t = e.childNodes[0], e.removeChild(t);
        return e
      }
    }, {}],
    172: [function (e, t) {
      t.exports = e(180)
    }, {180: 180}],
    173: [function (e, t) {
      t.exports = e(184)
    }, {184: 184}],
    174: [function (e, t) {
      t.exports = e(181)
    }, {181: 181}],
    175: [function (e, t) {
      t.exports = e(183)
    }, {183: 183}],
    176: [function (e, t) {
      t.exports = function (e) {
        e.parentNode && e.parentNode.removeChild(e)
      }
    }, {}],
    177: [function (e, t) {
      function n(e) {
        if (!e || !e.nodeType)throw new Error("A DOM element reference is required");
        this.el = e, this.list = e.classList
      }

      var r = e(178), i = /\s+/, a = Object.prototype.toString;
      t.exports = function (e) {
        return new n(e)
      }, n.prototype.add = function (e) {
        if (this.list)return this.list.add(e), this;
        var t = this.array(), n = r(t, e);
        return ~n || t.push(e), this.el.className = t.join(" "), this
      }, n.prototype.remove = function (e) {
        if ("[object RegExp]" == a.call(e))return this.removeMatching(e);
        if (this.list)return this.list.remove(e), this;
        var t = this.array(), n = r(t, e);
        return ~n && t.splice(n, 1), this.el.className = t.join(" "), this
      }, n.prototype.removeMatching = function (e) {
        for (var t = this.array(), n = 0; n < t.length; n++)e.test(t[n]) && this.remove(t[n]);
        return this
      }, n.prototype.toggle = function (e, t) {
        return this.list ? ("undefined" != typeof t ? t !== this.list.toggle(e, t) && this.list.toggle(e) : this.list.toggle(e), this) : ("undefined" != typeof t ? t ? this.add(e) : this.remove(e) : this.has(e) ? this.remove(e) : this.add(e), this)
      }, n.prototype.array = function () {
        var e = this.el.getAttribute("class") || "", t = e.replace(/^\s+|\s+$/g, ""), n = t.split(i);
        return "" === n[0] && n.shift(), n
      }, n.prototype.has = n.prototype.contains = function (e) {
        return this.list ? this.list.contains(e) : !!~r(this.array(), e)
      }
    }, {178: 178}],
    178: [function (e, t) {
      t.exports = function (e, t) {
        if (e.indexOf)return e.indexOf(t);
        for (var n = 0; n < e.length; ++n)if (e[n] === t)return n;
        return -1
      }
    }, {}],
    179: [function (e, t) {
      var n = e(182);
      t.exports = function (e, t, r, i) {
        for (e = r ? {parentNode: e} : e, i = i || document; (e = e.parentNode) && e !== document;) {
          if (n(e, t))return e;
          if (e === i)return
        }
      }
    }, {182: 182}],
    180: [function (e, t, n) {
      var r = e(179), i = e(181);
      n.bind = function (e, t, n, a, o) {
        return i.bind(e, n, function (n) {
          var i = n.target || n.srcElement;
          n.delegateTarget = r(i, t, !0, e), n.delegateTarget && a.call(e, n)
        }, o)
      }, n.unbind = function (e, t, n, r) {
        i.unbind(e, t, n, r)
      }
    }, {179: 179, 181: 181}],
    181: [function (e, t, n) {
      var r = window.addEventListener ? "addEventListener" : "attachEvent", i = window.removeEventListener ? "removeEventListener" : "detachEvent", a = "addEventListener" !== r ? "on" : "";
      n.bind = function (e, t, n, i) {
        return e[r](a + t, n, i || !1), n
      }, n.unbind = function (e, t, n, r) {
        return e[i](a + t, n, r || !1), n
      }
    }, {}],
    182: [function (e, t) {
      function n(e, t) {
        if (!e || 1 !== e.nodeType)return !1;
        if (a)return a.call(e, t);
        for (var n = r.all(t, e.parentNode), i = 0; i < n.length; ++i)if (n[i] == e)return !0;
        return !1
      }

      var r = e(183), i = Element.prototype, a = i.matches || i.webkitMatchesSelector || i.mozMatchesSelector || i.msMatchesSelector || i.oMatchesSelector;
      t.exports = n
    }, {183: 183}],
    183: [function (e, t, n) {
      function r(e, t) {
        return t.querySelector(e)
      }

      n = t.exports = function (e, t) {
        return t = t || document, r(e, t)
      }, n.all = function (e, t) {
        return t = t || document, t.querySelectorAll(e)
      }, n.engine = function (e) {
        if (!e.one)throw new Error(".one callback required");
        if (!e.all)throw new Error(".all callback required");
        return r = e.one, n.all = e.all, n
      }
    }, {}],
    184: [function (e, t) {
      function n(e, t) {
        if ("string" != typeof e)throw new TypeError("String expected");
        t || (t = document);
        var n = /<([\w:]+)/.exec(e);
        if (!n)return t.createTextNode(e);
        e = e.replace(/^\s+|\s+$/g, "");
        var r = n[1];
        if ("body" == r) {
          var i = t.createElement("html");
          return i.innerHTML = e, i.removeChild(i.lastChild)
        }
        var o = a[r] || a._default, s = o[0], u = o[1], l = o[2], i = t.createElement("div");
        for (i.innerHTML = u + e + l; s--;)i = i.lastChild;
        if (i.firstChild == i.lastChild)return i.removeChild(i.firstChild);
        for (var c = t.createDocumentFragment(); i.firstChild;)c.appendChild(i.removeChild(i.firstChild));
        return c
      }

      t.exports = n;
      var r = document.createElement("div");
      r.innerHTML = '  <link/><table></table><a href="/a">a</a><input type="checkbox"/>';
      var i = !r.getElementsByTagName("link").length;
      r = void 0;
      var a = {
        legend: [1, "<fieldset>", "</fieldset>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
        _default: i ? [1, "X<div>", "</div>"] : [0, "", ""]
      };
      a.td = a.th = [3, "<table><tbody><tr>", "</tr></tbody></table>"], a.option = a.optgroup = [1, '<select multiple="multiple">', "</select>"], a.thead = a.tbody = a.colgroup = a.caption = a.tfoot = [1, "<table>", "</table>"], a.polyline = a.ellipse = a.polygon = a.circle = a.text = a.line = a.path = a.rect = a.g = [1, '<svg xmlns="http://www.w3.org/2000/svg" version="1.1">', "</svg>"]
    }, {}],
    185: [function (e, t) {
      t.exports = e(187), t.exports.Collection = e(186)
    }, {186: 186, 187: 187}],
    186: [function (e, t) {
      function n(e, t, n, r) {
        var i = n.inverse;
        return e.remove = function (e) {
          var n = this.indexOf(e);
          return -1 !== n && (this.splice(n, 1), t.unset(e, i, r)), e
        }, e.contains = function (e) {
          return -1 !== this.indexOf(e)
        }, e.add = function (e) {
          this.contains(e) || (this.push(e), t.set(e, i, r))
        }, e
      }

      t.exports.extend = n
    }, {}],
    187: [function (e, t) {
      function n(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t.name || t)
      }

      function r(e, t, n) {
        Object.defineProperty(n, t.name, {enumerable: t.enumerable, value: o.extend(n[t.name] || [], e, t, n)})
      }

      function i(e, t, n) {
        var r = t.inverse, i = n[t.name];
        Object.defineProperty(n, t.name, {
          enumerable: t.enumerable, get: function () {
            return i
          }, set: function (t) {
            if (t !== i) {
              var a = i;
              i = null, a && e.unset(a, r, n), i = t, e.set(i, r, n)
            }
          }
        })
      }

      function a(e, t) {
        return this instanceof a ? (e.inverse = t, t.inverse = e, this.props = {}, this.props[e.name] = e, void(this.props[t.name] = t)) : new a(e, t)
      }

      var o = e(186);
      a.prototype.bind = function (e, t) {
        if ("string" == typeof t) {
          if (!this.props[t])throw new Error("no property <" + t + "> in ref");
          t = this.props[t]
        }
        t.collection ? r(this, t, e) : i(this, t, e)
      }, a.prototype.ensureBound = function (e, t) {
        n(e, t) || this.bind(e, t)
      }, a.prototype.unset = function (e, t, n) {
        e && (this.ensureBound(e, t), t.collection ? e[t.name].remove(n) : e[t.name] = void 0)
      }, a.prototype.set = function (e, t, n) {
        e && (this.ensureBound(e, t), t.collection ? e[t.name].add(n) : e[t.name] = n)
      }, t.exports = a
    }, {186: 186}]
  }, {}, [1])(1)
}),define("text!camunda-commons-ui/widgets/bpmn-viewer/cam-widget-bpmn-viewer.html", [], function () {
  return '<div class="alert alert-danger"\n     ng-if="error">\n  <span>\n    <strong>Could not render diagram:</strong>\n  </span>\n  <span>\n   {{ error.message }}\n  </span>\n</div>\n\n<div ng-show="!error">\n\n  <div ng-if="!loaded" class="placeholder-container">\n    <div class="placeholder-content">\n      Loading diagram<br />\n      <span class="glyphicon glyphicon-refresh animate-spin"></span>\n    </div>\n  </div>\n\n  <div class="diagram-holder" ng-class=\'{"diagram-holder": true, "grab-cursor": !disableNavigation && !grabbing, "djs-cursor-move": !disableNavigation && grabbing}\'></div>\n\n  <div ng-if="!disableNavigation"\n       class="navigation zoom">\n    <button class="btn btn-default in"\n            title="zoom in"\n            ng-click="zoomIn()">\n      <span class="glyphicon glyphicon-plus"></span>\n    </button>\n    <button class="btn btn-default out"\n            title="zoom out"\n            ng-click="zoomOut()">\n      <span class="glyphicon glyphicon-minus"></span>\n    </button>\n  </div>\n\n  <div ng-if="!disableNavigation"\n       class="navigation reset">\n    <button class="btn btn-default"\n            title="reset zoom"\n            ng-click="resetZoom()">\n      <span class="glyphicon glyphicon-screenshot"></span>\n    </button>\n  </div>\n</div>\n'
}),define("camunda-commons-ui/widgets/bpmn-viewer/cam-widget-bpmn-viewer", ["angular", "bpmn-io", "text!./cam-widget-bpmn-viewer.html"], function (e, t, n) {
  "use strict";
  return ["$compile", function (e) {
    return {
      scope: {
        diagramData: "=",
        control: "=?",
        disableNavigation: "&",
        onLoad: "&",
        onClick: "&",
        onMouseEnter: "&",
        onMouseLeave: "&"
      }, template: n, link: function (n, r) {
        function i() {
          if (l) {
            n.loaded = !1;
            var e = "object" == typeof l, t = (e ? u.importDefinitions : u.importXML).bind(u);
            t(l, function (t, r) {
              var i = e ? function (e) {
                e()
              } : n.$apply.bind(n);
              i(function () {
                return t ? void(n.error = t) : (n.warn = r, c = u.get("canvas"), a(), o(), n.loaded = !0, void n.onLoad())
              })
            })
          }
        }

        function a() {
          c && c.zoom("fit-viewport", "auto")
        }

        function o() {
          var e = u.get("eventBus");
          e.on("element.click", function (e) {
            n.onClick({element: e.element, $event: e.originalEvent})
          }), e.on("element.hover", function (e) {
            n.onMouseEnter({element: e.element, $event: e.originalEvent})
          }), e.on("element.out", function (e) {
            n.onMouseLeave({element: e.element, $event: e.originalEvent})
          }), e.on("element.mousedown", function () {
            n.grabbing = !0, document.addEventListener("mouseup", p), n.$apply()
          })
        }

        n.grabbing = !1, n.disableNavigation = n.$eval(n.disableNavigation), n.control = n.control || {}, n.control.highlight = function (e) {
          c.addMarker(e, "highlight"), r.find('[data-element-id="' + e + '"]>.djs-outline').attr({
            rx: "14px",
            ry: "14px"
          })
        }, n.control.clearHighlight = function (e) {
          c.removeMarker(e, "highlight")
        }, n.control.isHighlighted = function (e) {
          return c.hasMarker(e, "highlight")
        }, n.control.createBadge = function (t, r) {
          var i, a = u.get("overlays");
          r.html ? i = r.html : (i = document.createElement("span"), r.color && (i.style["background-color"] = r.color), r.tooltip && (i.setAttribute("tooltip", r.tooltip), i.setAttribute("tooltip-placement", "top")), r.text && i.appendChild(document.createTextNode(r.text))), a.add(t, {
            position: r.position || {
              bottom: 0,
              right: 0
            }, show: {minZoom: -1 / 0, maxZoom: +1 / 0}, html: i
          }), e(i)(n)
        }, n.control.removeBadges = function (e) {
          u.get("overlays").remove({element: e})
        }, n.control.getViewer = function () {
          return u
        }, n.control.scrollToElement = function (e) {
          var t, n, r, i, a = u.get("elementRegistry").get(e), o = c.viewbox();
          t = Math.max(o.height, a.height), n = Math.max(o.width, a.width), r = Math.min(Math.max(o.x, a.x - o.width + a.width), a.x), i = Math.min(Math.max(o.y, a.y - o.height + a.height), a.y), c.viewbox({
            x: r,
            y: i,
            width: n,
            height: t
          })
        }, n.control.getElement = function (e) {
          return u.get("elementRegistry").get(e)
        }, n.loaded = !1, n.control.isLoaded = function () {
          return n.loaded
        };
        var s = t;
        n.disableNavigation && (s = Object.getPrototypeOf(t.prototype).constructor);
        var u = new s({
          container: r.find(".diagram-holder"),
          width: "100%",
          height: "100%",
          overlays: {deferUpdate: !1}
        }), l = null, c = null;
        n.$watch("diagramData", function (e) {
          e && (l = e, i())
        });
        var p = function () {
          n.grabbing = !1, document.removeEventListener("mouseup", p), n.$apply()
        };
        n.zoomIn = function () {
          u.diagram.get("zoomScroll").zoom(1, {x: r[0].offsetWidth / 2, y: r[0].offsetHeight / 2})
        }, n.zoomOut = function () {
          u.diagram.get("zoomScroll").zoom(-1, {x: r[0].offsetWidth / 2, y: r[0].offsetHeight / 2})
        }, n.resetZoom = function () {
          c.zoom("fit-viewport", "auto")
        }, n.control.resetZoom = n.resetZoom
      }
    }
  }]
}),function (e) {
  function t(e, t, n) {
    switch (arguments.length) {
      case 2:
        return null != e ? e : t;
      case 3:
        return null != e ? e : null != t ? t : n;
      default:
        throw new Error("Implement me")
    }
  }

  function n(e, t) {
    return kt.call(e, t)
  }

  function r() {
    return {
      empty: !1,
      unusedTokens: [],
      unusedInput: [],
      overflow: -2,
      charsLeftOver: 0,
      nullInput: !1,
      invalidMonth: null,
      invalidFormat: !1,
      userInvalidated: !1,
      iso: !1
    }
  }

  function i(e) {
    wt.suppressDeprecationWarnings === !1 && "undefined" != typeof console && console.warn && console.warn("Deprecation warning: " + e)
  }

  function a(e, t) {
    var n = !0;
    return h(function () {
      return n && (i(e), n = !1), t.apply(this, arguments)
    }, t)
  }

  function o(e, t) {
    bn[e] || (i(t), bn[e] = !0)
  }

  function s(e, t) {
    return function (n) {
      return v(e.call(this, n), t)
    }
  }

  function u(e, t) {
    return function (n) {
      return this.localeData().ordinal(e.call(this, n), t)
    }
  }

  function l(e, t) {
    var n, r, i = 12 * (t.year() - e.year()) + (t.month() - e.month()), a = e.clone().add(i, "months");
    return 0 > t - a ? (n = e.clone().add(i - 1, "months"), r = (t - a) / (a - n)) : (n = e.clone().add(i + 1, "months"), r = (t - a) / (n - a)), -(i + r)
  }

  function c(e, t, n) {
    var r;
    return null == n ? t : null != e.meridiemHour ? e.meridiemHour(t, n) : null != e.isPM ? (r = e.isPM(n), r && 12 > t && (t += 12), r || 12 !== t || (t = 0), t) : t
  }

  function p() {
  }

  function f(e, t) {
    t !== !1 && N(e), m(this, e), this._d = new Date(+e._d), wn === !1 && (wn = !0, wt.updateOffset(this), wn = !1)
  }

  function d(e) {
    var t = C(e), n = t.year || 0, r = t.quarter || 0, i = t.month || 0, a = t.week || 0, o = t.day || 0, s = t.hour || 0, u = t.minute || 0, l = t.second || 0, c = t.millisecond || 0;
    this._milliseconds = +c + 1e3 * l + 6e4 * u + 36e5 * s, this._days = +o + 7 * a, this._months = +i + 3 * r + 12 * n, this._data = {}, this._locale = wt.localeData(), this._bubble()
  }

  function h(e, t) {
    for (var r in t)n(t, r) && (e[r] = t[r]);
    return n(t, "toString") && (e.toString = t.toString), n(t, "valueOf") && (e.valueOf = t.valueOf), e
  }

  function m(e, t) {
    var n, r, i;
    if ("undefined" != typeof t._isAMomentObject && (e._isAMomentObject = t._isAMomentObject), "undefined" != typeof t._i && (e._i = t._i), "undefined" != typeof t._f && (e._f = t._f), "undefined" != typeof t._l && (e._l = t._l), "undefined" != typeof t._strict && (e._strict = t._strict), "undefined" != typeof t._tzm && (e._tzm = t._tzm), "undefined" != typeof t._isUTC && (e._isUTC = t._isUTC), "undefined" != typeof t._offset && (e._offset = t._offset), "undefined" != typeof t._pf && (e._pf = t._pf), "undefined" != typeof t._locale && (e._locale = t._locale), It.length > 0)for (n in It)r = It[n], i = t[r], "undefined" != typeof i && (e[r] = i);
    return e
  }

  function g(e) {
    return 0 > e ? Math.ceil(e) : Math.floor(e)
  }

  function v(e, t, n) {
    for (var r = "" + Math.abs(e), i = e >= 0; r.length < t;)r = "0" + r;
    return (i ? n ? "+" : "" : "-") + r
  }

  function y(e, t) {
    var n = {milliseconds: 0, months: 0};
    return n.months = t.month() - e.month() + 12 * (t.year() - e.year()), e.clone().add(n.months, "M").isAfter(t) && --n.months, n.milliseconds = +t - +e.clone().add(n.months, "M"), n
  }

  function b(e, t) {
    var n;
    return t = j(t, e), e.isBefore(t) ? n = y(e, t) : (n = y(t, e), n.milliseconds = -n.milliseconds, n.months = -n.months), n
  }

  function x(e, t) {
    return function (n, r) {
      var i, a;
      return null === r || isNaN(+r) || (o(t, "moment()." + t + "(period, number) is deprecated. Please use moment()." + t + "(number, period)."), a = n, n = r, r = a), n = "string" == typeof n ? +n : n, i = wt.duration(n, r), w(this, i, e), this
    }
  }

  function w(e, t, n, r) {
    var i = t._milliseconds, a = t._days, o = t._months;
    r = null == r ? !0 : r, i && e._d.setTime(+e._d + i * n), a && mt(e, "Date", ht(e, "Date") + a * n), o && dt(e, ht(e, "Month") + o * n), r && wt.updateOffset(e, a || o)
  }

  function $(e) {
    return "[object Array]" === Object.prototype.toString.call(e)
  }

  function E(e) {
    return "[object Date]" === Object.prototype.toString.call(e) || e instanceof Date
  }

  function S(e, t, n) {
    var r, i = Math.min(e.length, t.length), a = Math.abs(e.length - t.length), o = 0;
    for (r = 0; i > r; r++)(n && e[r] !== t[r] || !n && A(e[r]) !== A(t[r])) && o++;
    return o + a
  }

  function T(e) {
    if (e) {
      var t = e.toLowerCase().replace(/(.)s$/, "$1");
      e = fn[e] || dn[t] || t
    }
    return e
  }

  function C(e) {
    var t, r, i = {};
    for (r in e)n(e, r) && (t = T(r), t && (i[t] = e[r]));
    return i
  }

  function k(t) {
    var n, r;
    if (0 === t.indexOf("week"))n = 7, r = "day"; else {
      if (0 !== t.indexOf("month"))return;
      n = 12, r = "month"
    }
    wt[t] = function (i, a) {
      var o, s, u = wt._locale[t], l = [];
      if ("number" == typeof i && (a = i, i = e), s = function (e) {
          var t = wt().utc().set(r, e);
          return u.call(wt._locale, t, i || "")
        }, null != a)return s(a);
      for (o = 0; n > o; o++)l.push(s(o));
      return l
    }
  }

  function A(e) {
    var t = +e, n = 0;
    return 0 !== t && isFinite(t) && (n = t >= 0 ? Math.floor(t) : Math.ceil(t)), n
  }

  function _(e, t) {
    return new Date(Date.UTC(e, t + 1, 0)).getUTCDate()
  }

  function D(e, t, n) {
    return lt(wt([e, 11, 31 + t - n]), t, n).week
  }

  function M(e) {
    return O(e) ? 366 : 365
  }

  function O(e) {
    return e % 4 === 0 && e % 100 !== 0 || e % 400 === 0
  }

  function N(e) {
    var t;
    e._a && -2 === e._pf.overflow && (t = e._a[_t] < 0 || e._a[_t] > 11 ? _t : e._a[Dt] < 1 || e._a[Dt] > _(e._a[At], e._a[_t]) ? Dt : e._a[Mt] < 0 || e._a[Mt] > 24 || 24 === e._a[Mt] && (0 !== e._a[Ot] || 0 !== e._a[Nt] || 0 !== e._a[Pt]) ? Mt : e._a[Ot] < 0 || e._a[Ot] > 59 ? Ot : e._a[Nt] < 0 || e._a[Nt] > 59 ? Nt : e._a[Pt] < 0 || e._a[Pt] > 999 ? Pt : -1, e._pf._overflowDayOfYear && (At > t || t > Dt) && (t = Dt), e._pf.overflow = t)
  }

  function P(t) {
    return null == t._isValid && (t._isValid = !isNaN(t._d.getTime()) && t._pf.overflow < 0 && !t._pf.empty && !t._pf.invalidMonth && !t._pf.nullInput && !t._pf.invalidFormat && !t._pf.userInvalidated, t._strict && (t._isValid = t._isValid && 0 === t._pf.charsLeftOver && 0 === t._pf.unusedTokens.length && t._pf.bigHour === e)), t._isValid
  }

  function R(e) {
    return e ? e.toLowerCase().replace("_", "-") : e
  }

  function I(e) {
    for (var t, n, r, i, a = 0; a < e.length;) {
      for (i = R(e[a]).split("-"), t = i.length, n = R(e[a + 1]), n = n ? n.split("-") : null; t > 0;) {
        if (r = L(i.slice(0, t).join("-")))return r;
        if (n && n.length >= t && S(i, n, !0) >= t - 1)break;
        t--
      }
      a++
    }
    return null
  }

  function L(e) {
    var t = null;
    if (!Rt[e] && Lt)try {
      t = wt.locale(), require("./locale/" + e), wt.locale(t)
    } catch (n) {
    }
    return Rt[e]
  }

  function j(e, t) {
    var n, r;
    return t._isUTC ? (n = t.clone(), r = (wt.isMoment(e) || E(e) ? +e : +wt(e)) - +n, n._d.setTime(+n._d + r), wt.updateOffset(n, !1), n) : wt(e).local()
  }

  function F(e) {
    return e.match(/\[[\s\S]/) ? e.replace(/^\[|\]$/g, "") : e.replace(/\\/g, "")
  }

  function B(e) {
    var t, n, r = e.match(qt);
    for (t = 0, n = r.length; n > t; t++)r[t] = yn[r[t]] ? yn[r[t]] : F(r[t]);
    return function (i) {
      var a = "";
      for (t = 0; n > t; t++)a += r[t]instanceof Function ? r[t].call(i, e) : r[t];
      return a
    }
  }

  function q(e, t) {
    return e.isValid() ? (t = V(t, e.localeData()), hn[t] || (hn[t] = B(t)), hn[t](e)) : e.localeData().invalidDate()
  }

  function V(e, t) {
    function n(e) {
      return t.longDateFormat(e) || e
    }

    var r = 5;
    for (Vt.lastIndex = 0; r >= 0 && Vt.test(e);)e = e.replace(Vt, n), Vt.lastIndex = 0, r -= 1;
    return e
  }

  function U(e, t) {
    var n, r = t._strict;
    switch (e) {
      case"Q":
        return Jt;
      case"DDDD":
        return tn;
      case"YYYY":
      case"GGGG":
      case"gggg":
        return r ? nn : Wt;
      case"Y":
      case"G":
      case"g":
        return an;
      case"YYYYYY":
      case"YYYYY":
      case"GGGGG":
      case"ggggg":
        return r ? rn : Yt;
      case"S":
        if (r)return Jt;
      case"SS":
        if (r)return en;
      case"SSS":
        if (r)return tn;
      case"DDD":
        return Ht;
      case"MMM":
      case"MMMM":
      case"dd":
      case"ddd":
      case"dddd":
        return Gt;
      case"a":
      case"A":
        return t._locale._meridiemParse;
      case"x":
        return Qt;
      case"X":
        return Zt;
      case"Z":
      case"ZZ":
        return Xt;
      case"T":
        return Kt;
      case"SSSS":
        return zt;
      case"MM":
      case"DD":
      case"YY":
      case"GG":
      case"gg":
      case"HH":
      case"hh":
      case"mm":
      case"ss":
      case"ww":
      case"WW":
        return r ? en : Ut;
      case"M":
      case"D":
      case"d":
      case"H":
      case"h":
      case"m":
      case"s":
      case"w":
      case"W":
      case"e":
      case"E":
        return Ut;
      case"Do":
        return r ? t._locale._ordinalParse : t._locale._ordinalParseLenient;
      default:
        return n = new RegExp(Z(Q(e.replace("\\", "")), "i"))
    }
  }

  function H(e) {
    e = e || "";
    var t = e.match(Xt) || [], n = t[t.length - 1] || [], r = (n + "").match(cn) || ["-", 0, 0], i = +(60 * r[1]) + A(r[2]);
    return "+" === r[0] ? i : -i
  }

  function W(e, t, n) {
    var r, i = n._a;
    switch (e) {
      case"Q":
        null != t && (i[_t] = 3 * (A(t) - 1));
        break;
      case"M":
      case"MM":
        null != t && (i[_t] = A(t) - 1);
        break;
      case"MMM":
      case"MMMM":
        r = n._locale.monthsParse(t, e, n._strict), null != r ? i[_t] = r : n._pf.invalidMonth = t;
        break;
      case"D":
      case"DD":
        null != t && (i[Dt] = A(t));
        break;
      case"Do":
        null != t && (i[Dt] = A(parseInt(t.match(/\d{1,2}/)[0], 10)));
        break;
      case"DDD":
      case"DDDD":
        null != t && (n._dayOfYear = A(t));
        break;
      case"YY":
        i[At] = wt.parseTwoDigitYear(t);
        break;
      case"YYYY":
      case"YYYYY":
      case"YYYYYY":
        i[At] = A(t);
        break;
      case"a":
      case"A":
        n._meridiem = t;
        break;
      case"h":
      case"hh":
        n._pf.bigHour = !0;
      case"H":
      case"HH":
        i[Mt] = A(t);
        break;
      case"m":
      case"mm":
        i[Ot] = A(t);
        break;
      case"s":
      case"ss":
        i[Nt] = A(t);
        break;
      case"S":
      case"SS":
      case"SSS":
      case"SSSS":
        i[Pt] = A(1e3 * ("0." + t));
        break;
      case"x":
        n._d = new Date(A(t));
        break;
      case"X":
        n._d = new Date(1e3 * parseFloat(t));
        break;
      case"Z":
      case"ZZ":
        n._useUTC = !0, n._tzm = H(t);
        break;
      case"dd":
      case"ddd":
      case"dddd":
        r = n._locale.weekdaysParse(t), null != r ? (n._w = n._w || {}, n._w.d = r) : n._pf.invalidWeekday = t;
        break;
      case"w":
      case"ww":
      case"W":
      case"WW":
      case"d":
      case"e":
      case"E":
        e = e.substr(0, 1);
      case"gggg":
      case"GGGG":
      case"GGGGG":
        e = e.substr(0, 2), t && (n._w = n._w || {}, n._w[e] = A(t));
        break;
      case"gg":
      case"GG":
        n._w = n._w || {}, n._w[e] = wt.parseTwoDigitYear(t)
    }
  }

  function Y(e) {
    var n, r, i, a, o, s, u;
    n = e._w, null != n.GG || null != n.W || null != n.E ? (o = 1, s = 4, r = t(n.GG, e._a[At], lt(wt(), 1, 4).year), i = t(n.W, 1), a = t(n.E, 1)) : (o = e._locale._week.dow, s = e._locale._week.doy, r = t(n.gg, e._a[At], lt(wt(), o, s).year), i = t(n.w, 1), null != n.d ? (a = n.d, o > a && ++i) : a = null != n.e ? n.e + o : o), u = ct(r, i, a, s, o), e._a[At] = u.year, e._dayOfYear = u.dayOfYear
  }

  function z(e) {
    var n, r, i, a, o = [];
    if (!e._d) {
      for (i = X(e), e._w && null == e._a[Dt] && null == e._a[_t] && Y(e), e._dayOfYear && (a = t(e._a[At], i[At]), e._dayOfYear > M(a) && (e._pf._overflowDayOfYear = !0), r = at(a, 0, e._dayOfYear), e._a[_t] = r.getUTCMonth(), e._a[Dt] = r.getUTCDate()), n = 0; 3 > n && null == e._a[n]; ++n)e._a[n] = o[n] = i[n];
      for (; 7 > n; n++)e._a[n] = o[n] = null == e._a[n] ? 2 === n ? 1 : 0 : e._a[n];
      24 === e._a[Mt] && 0 === e._a[Ot] && 0 === e._a[Nt] && 0 === e._a[Pt] && (e._nextDay = !0, e._a[Mt] = 0), e._d = (e._useUTC ? at : it).apply(null, o), null != e._tzm && e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm), e._nextDay && (e._a[Mt] = 24)
    }
  }

  function G(e) {
    var t;
    e._d || (t = C(e._i), e._a = [t.year, t.month, t.day || t.date, t.hour, t.minute, t.second, t.millisecond], z(e))
  }

  function X(e) {
    var t = new Date;
    return e._useUTC ? [t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate()] : [t.getFullYear(), t.getMonth(), t.getDate()]
  }

  function K(t) {
    if (t._f === wt.ISO_8601)return void et(t);
    t._a = [], t._pf.empty = !0;
    var n, r, i, a, o, s = "" + t._i, u = s.length, l = 0;
    for (i = V(t._f, t._locale).match(qt) || [], n = 0; n < i.length; n++)a = i[n], r = (s.match(U(a, t)) || [])[0], r && (o = s.substr(0, s.indexOf(r)), o.length > 0 && t._pf.unusedInput.push(o), s = s.slice(s.indexOf(r) + r.length), l += r.length), yn[a] ? (r ? t._pf.empty = !1 : t._pf.unusedTokens.push(a), W(a, r, t)) : t._strict && !r && t._pf.unusedTokens.push(a);
    t._pf.charsLeftOver = u - l, s.length > 0 && t._pf.unusedInput.push(s), t._pf.bigHour === !0 && t._a[Mt] <= 12 && (t._pf.bigHour = e), t._a[Mt] = c(t._locale, t._a[Mt], t._meridiem), z(t), N(t)
  }

  function Q(e) {
    return e.replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (e, t, n, r, i) {
      return t || n || r || i
    })
  }

  function Z(e) {
    return e.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
  }

  function J(e) {
    var t, n, i, a, o;
    if (0 === e._f.length)return e._pf.invalidFormat = !0, void(e._d = new Date(0 / 0));
    for (a = 0; a < e._f.length; a++)o = 0, t = m({}, e), null != e._useUTC && (t._useUTC = e._useUTC), t._pf = r(), t._f = e._f[a], K(t), P(t) && (o += t._pf.charsLeftOver, o += 10 * t._pf.unusedTokens.length, t._pf.score = o, (null == i || i > o) && (i = o, n = t));
    h(e, n || t)
  }

  function et(e) {
    var t, n, r = e._i, i = on.exec(r);
    if (i) {
      for (e._pf.iso = !0, t = 0, n = un.length; n > t; t++)if (un[t][1].exec(r)) {
        e._f = un[t][0] + (i[6] || " ");
        break
      }
      for (t = 0, n = ln.length; n > t; t++)if (ln[t][1].exec(r)) {
        e._f += ln[t][0];
        break
      }
      r.match(Xt) && (e._f += "Z"), K(e)
    } else e._isValid = !1
  }

  function tt(e) {
    et(e), e._isValid === !1 && (delete e._isValid, wt.createFromInputFallback(e))
  }

  function nt(e, t) {
    var n, r = [];
    for (n = 0; n < e.length; ++n)r.push(t(e[n], n));
    return r
  }

  function rt(t) {
    var n, r = t._i;
    r === e ? t._d = new Date : E(r) ? t._d = new Date(+r) : null !== (n = jt.exec(r)) ? t._d = new Date(+n[1]) : "string" == typeof r ? tt(t) : $(r) ? (t._a = nt(r.slice(0), function (e) {
      return parseInt(e, 10)
    }), z(t)) : "object" == typeof r ? G(t) : "number" == typeof r ? t._d = new Date(r) : wt.createFromInputFallback(t)
  }

  function it(e, t, n, r, i, a, o) {
    var s = new Date(e, t, n, r, i, a, o);
    return 1970 > e && s.setFullYear(e), s
  }

  function at(e) {
    var t = new Date(Date.UTC.apply(null, arguments));
    return 1970 > e && t.setUTCFullYear(e), t
  }

  function ot(e, t) {
    if ("string" == typeof e)if (isNaN(e)) {
      if (e = t.weekdaysParse(e), "number" != typeof e)return null
    } else e = parseInt(e, 10);
    return e
  }

  function st(e, t, n, r, i) {
    return i.relativeTime(t || 1, !!n, e, r)
  }

  function ut(e, t, n) {
    var r = wt.duration(e).abs(), i = Ct(r.as("s")), a = Ct(r.as("m")), o = Ct(r.as("h")), s = Ct(r.as("d")), u = Ct(r.as("M")), l = Ct(r.as("y")), c = i < mn.s && ["s", i] || 1 === a && ["m"] || a < mn.m && ["mm", a] || 1 === o && ["h"] || o < mn.h && ["hh", o] || 1 === s && ["d"] || s < mn.d && ["dd", s] || 1 === u && ["M"] || u < mn.M && ["MM", u] || 1 === l && ["y"] || ["yy", l];
    return c[2] = t, c[3] = +e > 0, c[4] = n, st.apply({}, c)
  }

  function lt(e, t, n) {
    var r, i = n - t, a = n - e.day();
    return a > i && (a -= 7), i - 7 > a && (a += 7), r = wt(e).add(a, "d"), {
      week: Math.ceil(r.dayOfYear() / 7),
      year: r.year()
    }
  }

  function ct(e, t, n, r, i) {
    var a, o, s = at(e, 0, 1).getUTCDay();
    return s = 0 === s ? 7 : s, n = null != n ? n : i, a = i - s + (s > r ? 7 : 0) - (i > s ? 7 : 0), o = 7 * (t - 1) + (n - i) + a + 1, {
      year: o > 0 ? e : e - 1,
      dayOfYear: o > 0 ? o : M(e - 1) + o
    }
  }

  function pt(t) {
    var n, r = t._i, i = t._f;
    return t._locale = t._locale || wt.localeData(t._l), null === r || i === e && "" === r ? wt.invalid({nullInput: !0}) : ("string" == typeof r && (t._i = r = t._locale.preparse(r)), wt.isMoment(r) ? new f(r, !0) : (i ? $(i) ? J(t) : K(t) : rt(t), n = new f(t), n._nextDay && (n.add(1, "d"), n._nextDay = e), n))
  }

  function ft(e, t) {
    var n, r;
    if (1 === t.length && $(t[0]) && (t = t[0]), !t.length)return wt();
    for (n = t[0], r = 1; r < t.length; ++r)t[r][e](n) && (n = t[r]);
    return n
  }

  function dt(e, t) {
    var n;
    return "string" == typeof t && (t = e.localeData().monthsParse(t), "number" != typeof t) ? e : (n = Math.min(e.date(), _(e.year(), t)), e._d["set" + (e._isUTC ? "UTC" : "") + "Month"](t, n), e)
  }

  function ht(e, t) {
    return e._d["get" + (e._isUTC ? "UTC" : "") + t]()
  }

  function mt(e, t, n) {
    return "Month" === t ? dt(e, n) : e._d["set" + (e._isUTC ? "UTC" : "") + t](n)
  }

  function gt(e, t) {
    return function (n) {
      return null != n ? (mt(this, e, n), wt.updateOffset(this, t), this) : ht(this, e)
    }
  }

  function vt(e) {
    return 400 * e / 146097
  }

  function yt(e) {
    return 146097 * e / 400
  }

  function bt(e) {
    wt.duration.fn[e] = function () {
      return this._data[e]
    }
  }

  function xt(e) {
    "undefined" == typeof ender && ($t = Tt.moment, Tt.moment = e ? a("Accessing Moment through the global scope is deprecated, and will be removed in an upcoming release.", wt) : wt)
  }

  for (var wt, $t, Et, St = "2.9.0", Tt = "undefined" == typeof global || "undefined" != typeof window && window !== global.window ? this : global, Ct = Math.round, kt = Object.prototype.hasOwnProperty, At = 0, _t = 1, Dt = 2, Mt = 3, Ot = 4, Nt = 5, Pt = 6, Rt = {}, It = [], Lt = "undefined" != typeof module && module && module.exports, jt = /^\/?Date\((\-?\d+)/i, Ft = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/, Bt = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/, qt = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|x|X|zz?|ZZ?|.)/g, Vt = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, Ut = /\d\d?/, Ht = /\d{1,3}/, Wt = /\d{1,4}/, Yt = /[+\-]?\d{1,6}/, zt = /\d+/, Gt = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, Xt = /Z|[\+\-]\d\d:?\d\d/gi, Kt = /T/i, Qt = /[\+\-]?\d+/, Zt = /[\+\-]?\d+(\.\d{1,3})?/, Jt = /\d/, en = /\d\d/, tn = /\d{3}/, nn = /\d{4}/, rn = /[+-]?\d{6}/, an = /[+-]?\d+/, on = /^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/, sn = "YYYY-MM-DDTHH:mm:ssZ", un = [["YYYYYY-MM-DD", /[+-]\d{6}-\d{2}-\d{2}/], ["YYYY-MM-DD", /\d{4}-\d{2}-\d{2}/], ["GGGG-[W]WW-E", /\d{4}-W\d{2}-\d/], ["GGGG-[W]WW", /\d{4}-W\d{2}/], ["YYYY-DDD", /\d{4}-\d{3}/]], ln = [["HH:mm:ss.SSSS", /(T| )\d\d:\d\d:\d\d\.\d+/], ["HH:mm:ss", /(T| )\d\d:\d\d:\d\d/], ["HH:mm", /(T| )\d\d:\d\d/], ["HH", /(T| )\d\d/]], cn = /([\+\-]|\d\d)/gi, pn = ("Date|Hours|Minutes|Seconds|Milliseconds".split("|"), {
    Milliseconds: 1,
    Seconds: 1e3,
    Minutes: 6e4,
    Hours: 36e5,
    Days: 864e5,
    Months: 2592e6,
    Years: 31536e6
  }), fn = {
    ms: "millisecond",
    s: "second",
    m: "minute",
    h: "hour",
    d: "day",
    D: "date",
    w: "week",
    W: "isoWeek",
    M: "month",
    Q: "quarter",
    y: "year",
    DDD: "dayOfYear",
    e: "weekday",
    E: "isoWeekday",
    gg: "weekYear",
    GG: "isoWeekYear"
  }, dn = {
    dayofyear: "dayOfYear",
    isoweekday: "isoWeekday",
    isoweek: "isoWeek",
    weekyear: "weekYear",
    isoweekyear: "isoWeekYear"
  }, hn = {}, mn = {
    s: 45,
    m: 45,
    h: 22,
    d: 26,
    M: 11
  }, gn = "DDD w W M D d".split(" "), vn = "M D H h m s w W".split(" "), yn = {
    M: function () {
      return this.month() + 1
    }, MMM: function (e) {
      return this.localeData().monthsShort(this, e)
    }, MMMM: function (e) {
      return this.localeData().months(this, e)
    }, D: function () {
      return this.date()
    }, DDD: function () {
      return this.dayOfYear()
    }, d: function () {
      return this.day()
    }, dd: function (e) {
      return this.localeData().weekdaysMin(this, e)
    }, ddd: function (e) {
      return this.localeData().weekdaysShort(this, e)
    }, dddd: function (e) {
      return this.localeData().weekdays(this, e)
    }, w: function () {
      return this.week()
    }, W: function () {
      return this.isoWeek()
    }, YY: function () {
      return v(this.year() % 100, 2)
    }, YYYY: function () {
      return v(this.year(), 4)
    }, YYYYY: function () {
      return v(this.year(), 5)
    }, YYYYYY: function () {
      var e = this.year(), t = e >= 0 ? "+" : "-";
      return t + v(Math.abs(e), 6)
    }, gg: function () {
      return v(this.weekYear() % 100, 2)
    }, gggg: function () {
      return v(this.weekYear(), 4)
    }, ggggg: function () {
      return v(this.weekYear(), 5)
    }, GG: function () {
      return v(this.isoWeekYear() % 100, 2)
    }, GGGG: function () {
      return v(this.isoWeekYear(), 4)
    }, GGGGG: function () {
      return v(this.isoWeekYear(), 5)
    }, e: function () {
      return this.weekday()
    }, E: function () {
      return this.isoWeekday()
    }, a: function () {
      return this.localeData().meridiem(this.hours(), this.minutes(), !0)
    }, A: function () {
      return this.localeData().meridiem(this.hours(), this.minutes(), !1)
    }, H: function () {
      return this.hours()
    }, h: function () {
      return this.hours() % 12 || 12
    }, m: function () {
      return this.minutes()
    }, s: function () {
      return this.seconds()
    }, S: function () {
      return A(this.milliseconds() / 100)
    }, SS: function () {
      return v(A(this.milliseconds() / 10), 2)
    }, SSS: function () {
      return v(this.milliseconds(), 3)
    }, SSSS: function () {
      return v(this.milliseconds(), 3)
    }, Z: function () {
      var e = this.utcOffset(), t = "+";
      return 0 > e && (e = -e, t = "-"), t + v(A(e / 60), 2) + ":" + v(A(e) % 60, 2)
    }, ZZ: function () {
      var e = this.utcOffset(), t = "+";
      return 0 > e && (e = -e, t = "-"), t + v(A(e / 60), 2) + v(A(e) % 60, 2)
    }, z: function () {
      return this.zoneAbbr()
    }, zz: function () {
      return this.zoneName()
    }, x: function () {
      return this.valueOf()
    }, X: function () {
      return this.unix()
    }, Q: function () {
      return this.quarter()
    }
  }, bn = {}, xn = ["months", "monthsShort", "weekdays", "weekdaysShort", "weekdaysMin"], wn = !1; gn.length;)Et = gn.pop(), yn[Et + "o"] = u(yn[Et], Et);
  for (; vn.length;)Et = vn.pop(), yn[Et + Et] = s(yn[Et], 2);
  yn.DDDD = s(yn.DDD, 3), h(p.prototype, {
    set: function (e) {
      var t, n;
      for (n in e)t = e[n], "function" == typeof t ? this[n] = t : this["_" + n] = t;
      this._ordinalParseLenient = new RegExp(this._ordinalParse.source + "|" + /\d{1,2}/.source)
    },
    _months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
    months: function (e) {
      return this._months[e.month()]
    },
    _monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
    monthsShort: function (e) {
      return this._monthsShort[e.month()]
    },
    monthsParse: function (e, t, n) {
      var r, i, a;
      for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), r = 0; 12 > r; r++) {
        if (i = wt.utc([2e3, r]), n && !this._longMonthsParse[r] && (this._longMonthsParse[r] = new RegExp("^" + this.months(i, "").replace(".", "") + "$", "i"), this._shortMonthsParse[r] = new RegExp("^" + this.monthsShort(i, "").replace(".", "") + "$", "i")), n || this._monthsParse[r] || (a = "^" + this.months(i, "") + "|^" + this.monthsShort(i, ""), this._monthsParse[r] = new RegExp(a.replace(".", ""), "i")), n && "MMMM" === t && this._longMonthsParse[r].test(e))return r;
        if (n && "MMM" === t && this._shortMonthsParse[r].test(e))return r;
        if (!n && this._monthsParse[r].test(e))return r
      }
    },
    _weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
    weekdays: function (e) {
      return this._weekdays[e.day()]
    },
    _weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
    weekdaysShort: function (e) {
      return this._weekdaysShort[e.day()]
    },
    _weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
    weekdaysMin: function (e) {
      return this._weekdaysMin[e.day()]
    },
    weekdaysParse: function (e) {
      var t, n, r;
      for (this._weekdaysParse || (this._weekdaysParse = []), t = 0; 7 > t; t++)if (this._weekdaysParse[t] || (n = wt([2e3, 1]).day(t), r = "^" + this.weekdays(n, "") + "|^" + this.weekdaysShort(n, "") + "|^" + this.weekdaysMin(n, ""), this._weekdaysParse[t] = new RegExp(r.replace(".", ""), "i")), this._weekdaysParse[t].test(e))return t
    },
    _longDateFormat: {
      LTS: "h:mm:ss A",
      LT: "h:mm A",
      L: "MM/DD/YYYY",
      LL: "MMMM D, YYYY",
      LLL: "MMMM D, YYYY LT",
      LLLL: "dddd, MMMM D, YYYY LT"
    },
    longDateFormat: function (e) {
      var t = this._longDateFormat[e];
      return !t && this._longDateFormat[e.toUpperCase()] && (t = this._longDateFormat[e.toUpperCase()].replace(/MMMM|MM|DD|dddd/g, function (e) {
        return e.slice(1)
      }), this._longDateFormat[e] = t), t
    },
    isPM: function (e) {
      return "p" === (e + "").toLowerCase().charAt(0)
    },
    _meridiemParse: /[ap]\.?m?\.?/i,
    meridiem: function (e, t, n) {
      return e > 11 ? n ? "pm" : "PM" : n ? "am" : "AM"
    },
    _calendar: {
      sameDay: "[Today at] LT",
      nextDay: "[Tomorrow at] LT",
      nextWeek: "dddd [at] LT",
      lastDay: "[Yesterday at] LT",
      lastWeek: "[Last] dddd [at] LT",
      sameElse: "L"
    },
    calendar: function (e, t, n) {
      var r = this._calendar[e];
      return "function" == typeof r ? r.apply(t, [n]) : r
    },
    _relativeTime: {
      future: "in %s",
      past: "%s ago",
      s: "a few seconds",
      m: "a minute",
      mm: "%d minutes",
      h: "an hour",
      hh: "%d hours",
      d: "a day",
      dd: "%d days",
      M: "a month",
      MM: "%d months",
      y: "a year",
      yy: "%d years"
    },
    relativeTime: function (e, t, n, r) {
      var i = this._relativeTime[n];
      return "function" == typeof i ? i(e, t, n, r) : i.replace(/%d/i, e)
    },
    pastFuture: function (e, t) {
      var n = this._relativeTime[e > 0 ? "future" : "past"];
      return "function" == typeof n ? n(t) : n.replace(/%s/i, t)
    },
    ordinal: function (e) {
      return this._ordinal.replace("%d", e)
    },
    _ordinal: "%d",
    _ordinalParse: /\d{1,2}/,
    preparse: function (e) {
      return e
    },
    postformat: function (e) {
      return e
    },
    week: function (e) {
      return lt(e, this._week.dow, this._week.doy).week
    },
    _week: {dow: 0, doy: 6},
    firstDayOfWeek: function () {
      return this._week.dow
    },
    firstDayOfYear: function () {
      return this._week.doy
    },
    _invalidDate: "Invalid date",
    invalidDate: function () {
      return this._invalidDate
    }
  }), wt = function (t, n, i, a) {
    var o;
    return "boolean" == typeof i && (a = i, i = e), o = {}, o._isAMomentObject = !0, o._i = t, o._f = n, o._l = i, o._strict = a, o._isUTC = !1, o._pf = r(), pt(o)
  }, wt.suppressDeprecationWarnings = !1, wt.createFromInputFallback = a("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.", function (e) {
    e._d = new Date(e._i + (e._useUTC ? " UTC" : ""))
  }), wt.min = function () {
    var e = [].slice.call(arguments, 0);
    return ft("isBefore", e)
  }, wt.max = function () {
    var e = [].slice.call(arguments, 0);
    return ft("isAfter", e)
  }, wt.utc = function (t, n, i, a) {
    var o;
    return "boolean" == typeof i && (a = i, i = e), o = {}, o._isAMomentObject = !0, o._useUTC = !0, o._isUTC = !0, o._l = i, o._i = t, o._f = n, o._strict = a, o._pf = r(), pt(o).utc()
  }, wt.unix = function (e) {
    return wt(1e3 * e)
  }, wt.duration = function (e, t) {
    var r, i, a, o, s = e, u = null;
    return wt.isDuration(e) ? s = {
      ms: e._milliseconds,
      d: e._days,
      M: e._months
    } : "number" == typeof e ? (s = {}, t ? s[t] = e : s.milliseconds = e) : (u = Ft.exec(e)) ? (r = "-" === u[1] ? -1 : 1, s = {
      y: 0,
      d: A(u[Dt]) * r,
      h: A(u[Mt]) * r,
      m: A(u[Ot]) * r,
      s: A(u[Nt]) * r,
      ms: A(u[Pt]) * r
    }) : (u = Bt.exec(e)) ? (r = "-" === u[1] ? -1 : 1, a = function (e) {
      var t = e && parseFloat(e.replace(",", "."));
      return (isNaN(t) ? 0 : t) * r
    }, s = {
      y: a(u[2]),
      M: a(u[3]),
      d: a(u[4]),
      h: a(u[5]),
      m: a(u[6]),
      s: a(u[7]),
      w: a(u[8])
    }) : null == s ? s = {} : "object" == typeof s && ("from"in s || "to"in s) && (o = b(wt(s.from), wt(s.to)), s = {}, s.ms = o.milliseconds, s.M = o.months), i = new d(s), wt.isDuration(e) && n(e, "_locale") && (i._locale = e._locale), i
  }, wt.version = St, wt.defaultFormat = sn, wt.ISO_8601 = function () {
  }, wt.momentProperties = It, wt.updateOffset = function () {
  }, wt.relativeTimeThreshold = function (t, n) {
    return mn[t] === e ? !1 : n === e ? mn[t] : (mn[t] = n, !0)
  }, wt.lang = a("moment.lang is deprecated. Use moment.locale instead.", function (e, t) {
    return wt.locale(e, t)
  }), wt.locale = function (e, t) {
    var n;
    return e && (n = "undefined" != typeof t ? wt.defineLocale(e, t) : wt.localeData(e), n && (wt.duration._locale = wt._locale = n)), wt._locale._abbr
  }, wt.defineLocale = function (e, t) {
    return null !== t ? (t.abbr = e, Rt[e] || (Rt[e] = new p), Rt[e].set(t), wt.locale(e), Rt[e]) : (delete Rt[e], null)
  }, wt.langData = a("moment.langData is deprecated. Use moment.localeData instead.", function (e) {
    return wt.localeData(e)
  }), wt.localeData = function (e) {
    var t;
    if (e && e._locale && e._locale._abbr && (e = e._locale._abbr), !e)return wt._locale;
    if (!$(e)) {
      if (t = L(e))return t;
      e = [e]
    }
    return I(e)
  }, wt.isMoment = function (e) {
    return e instanceof f || null != e && n(e, "_isAMomentObject")
  }, wt.isDuration = function (e) {
    return e instanceof d
  };
  for (Et = xn.length - 1; Et >= 0; --Et)k(xn[Et]);
  wt.normalizeUnits = function (e) {
    return T(e)
  }, wt.invalid = function (e) {
    var t = wt.utc(0 / 0);
    return null != e ? h(t._pf, e) : t._pf.userInvalidated = !0, t
  }, wt.parseZone = function () {
    return wt.apply(null, arguments).parseZone()
  }, wt.parseTwoDigitYear = function (e) {
    return A(e) + (A(e) > 68 ? 1900 : 2e3)
  }, wt.isDate = E, h(wt.fn = f.prototype, {
    clone: function () {
      return wt(this)
    },
    valueOf: function () {
      return +this._d - 6e4 * (this._offset || 0)
    },
    unix: function () {
      return Math.floor(+this / 1e3)
    },
    toString: function () {
      return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
    },
    toDate: function () {
      return this._offset ? new Date(+this) : this._d
    },
    toISOString: function () {
      var e = wt(this).utc();
      return 0 < e.year() && e.year() <= 9999 ? "function" == typeof Date.prototype.toISOString ? this.toDate().toISOString() : q(e, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]") : q(e, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
    },
    toArray: function () {
      var e = this;
      return [e.year(), e.month(), e.date(), e.hours(), e.minutes(), e.seconds(), e.milliseconds()]
    },
    isValid: function () {
      return P(this)
    },
    isDSTShifted: function () {
      return this._a ? this.isValid() && S(this._a, (this._isUTC ? wt.utc(this._a) : wt(this._a)).toArray()) > 0 : !1
    },
    parsingFlags: function () {
      return h({}, this._pf)
    },
    invalidAt: function () {
      return this._pf.overflow
    },
    utc: function (e) {
      return this.utcOffset(0, e)
    },
    local: function (e) {
      return this._isUTC && (this.utcOffset(0, e), this._isUTC = !1, e && this.subtract(this._dateUtcOffset(), "m")), this
    },
    format: function (e) {
      var t = q(this, e || wt.defaultFormat);
      return this.localeData().postformat(t)
    },
    add: x(1, "add"),
    subtract: x(-1, "subtract"),
    diff: function (e, t, n) {
      var r, i, a = j(e, this), o = 6e4 * (a.utcOffset() - this.utcOffset());
      return t = T(t), "year" === t || "month" === t || "quarter" === t ? (i = l(this, a), "quarter" === t ? i /= 3 : "year" === t && (i /= 12)) : (r = this - a, i = "second" === t ? r / 1e3 : "minute" === t ? r / 6e4 : "hour" === t ? r / 36e5 : "day" === t ? (r - o) / 864e5 : "week" === t ? (r - o) / 6048e5 : r), n ? i : g(i)
    },
    from: function (e, t) {
      return wt.duration({to: this, from: e}).locale(this.locale()).humanize(!t)
    },
    fromNow: function (e) {
      return this.from(wt(), e)
    },
    calendar: function (e) {
      var t = e || wt(), n = j(t, this).startOf("day"), r = this.diff(n, "days", !0), i = -6 > r ? "sameElse" : -1 > r ? "lastWeek" : 0 > r ? "lastDay" : 1 > r ? "sameDay" : 2 > r ? "nextDay" : 7 > r ? "nextWeek" : "sameElse";
      return this.format(this.localeData().calendar(i, this, wt(t)))
    },
    isLeapYear: function () {
      return O(this.year())
    },
    isDST: function () {
      return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset()
    },
    day: function (e) {
      var t = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
      return null != e ? (e = ot(e, this.localeData()), this.add(e - t, "d")) : t
    },
    month: gt("Month", !0),
    startOf: function (e) {
      switch (e = T(e)) {
        case"year":
          this.month(0);
        case"quarter":
        case"month":
          this.date(1);
        case"week":
        case"isoWeek":
        case"day":
          this.hours(0);
        case"hour":
          this.minutes(0);
        case"minute":
          this.seconds(0);
        case"second":
          this.milliseconds(0)
      }
      return "week" === e ? this.weekday(0) : "isoWeek" === e && this.isoWeekday(1), "quarter" === e && this.month(3 * Math.floor(this.month() / 3)), this
    },
    endOf: function (t) {
      return t = T(t), t === e || "millisecond" === t ? this : this.startOf(t).add(1, "isoWeek" === t ? "week" : t).subtract(1, "ms")
    },
    isAfter: function (e, t) {
      var n;
      return t = T("undefined" != typeof t ? t : "millisecond"), "millisecond" === t ? (e = wt.isMoment(e) ? e : wt(e), +this > +e) : (n = wt.isMoment(e) ? +e : +wt(e), n < +this.clone().startOf(t))
    },
    isBefore: function (e, t) {
      var n;
      return t = T("undefined" != typeof t ? t : "millisecond"), "millisecond" === t ? (e = wt.isMoment(e) ? e : wt(e), +e > +this) : (n = wt.isMoment(e) ? +e : +wt(e), +this.clone().endOf(t) < n)
    },
    isBetween: function (e, t, n) {
      return this.isAfter(e, n) && this.isBefore(t, n)
    },
    isSame: function (e, t) {
      var n;
      return t = T(t || "millisecond"), "millisecond" === t ? (e = wt.isMoment(e) ? e : wt(e), +this === +e) : (n = +wt(e), +this.clone().startOf(t) <= n && n <= +this.clone().endOf(t))
    },
    min: a("moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548", function (e) {
      return e = wt.apply(null, arguments), this > e ? this : e
    }),
    max: a("moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548", function (e) {
      return e = wt.apply(null, arguments), e > this ? this : e
    }),
    zone: a("moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779", function (e, t) {
      return null != e ? ("string" != typeof e && (e = -e), this.utcOffset(e, t), this) : -this.utcOffset()
    }),
    utcOffset: function (e, t) {
      var n, r = this._offset || 0;
      return null != e ? ("string" == typeof e && (e = H(e)), Math.abs(e) < 16 && (e = 60 * e), !this._isUTC && t && (n = this._dateUtcOffset()), this._offset = e, this._isUTC = !0, null != n && this.add(n, "m"), r !== e && (!t || this._changeInProgress ? w(this, wt.duration(e - r, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0, wt.updateOffset(this, !0), this._changeInProgress = null)), this) : this._isUTC ? r : this._dateUtcOffset()
    },
    isLocal: function () {
      return !this._isUTC
    },
    isUtcOffset: function () {
      return this._isUTC
    },
    isUtc: function () {
      return this._isUTC && 0 === this._offset
    },
    zoneAbbr: function () {
      return this._isUTC ? "UTC" : ""
    },
    zoneName: function () {
      return this._isUTC ? "Coordinated Universal Time" : ""
    },
    parseZone: function () {
      return this._tzm ? this.utcOffset(this._tzm) : "string" == typeof this._i && this.utcOffset(H(this._i)), this
    },
    hasAlignedHourOffset: function (e) {
      return e = e ? wt(e).utcOffset() : 0, (this.utcOffset() - e) % 60 === 0
    },
    daysInMonth: function () {
      return _(this.year(), this.month())
    },
    dayOfYear: function (e) {
      var t = Ct((wt(this).startOf("day") - wt(this).startOf("year")) / 864e5) + 1;
      return null == e ? t : this.add(e - t, "d")
    },
    quarter: function (e) {
      return null == e ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (e - 1) + this.month() % 3)
    },
    weekYear: function (e) {
      var t = lt(this, this.localeData()._week.dow, this.localeData()._week.doy).year;
      return null == e ? t : this.add(e - t, "y")
    },
    isoWeekYear: function (e) {
      var t = lt(this, 1, 4).year;
      return null == e ? t : this.add(e - t, "y")
    },
    week: function (e) {
      var t = this.localeData().week(this);
      return null == e ? t : this.add(7 * (e - t), "d")
    },
    isoWeek: function (e) {
      var t = lt(this, 1, 4).week;
      return null == e ? t : this.add(7 * (e - t), "d")
    },
    weekday: function (e) {
      var t = (this.day() + 7 - this.localeData()._week.dow) % 7;
      return null == e ? t : this.add(e - t, "d")
    },
    isoWeekday: function (e) {
      return null == e ? this.day() || 7 : this.day(this.day() % 7 ? e : e - 7)
    },
    isoWeeksInYear: function () {
      return D(this.year(), 1, 4)
    },
    weeksInYear: function () {
      var e = this.localeData()._week;
      return D(this.year(), e.dow, e.doy)
    },
    get: function (e) {
      return e = T(e), this[e]()
    },
    set: function (e, t) {
      var n;
      if ("object" == typeof e)for (n in e)this.set(n, e[n]); else e = T(e), "function" == typeof this[e] && this[e](t);
      return this
    },
    locale: function (t) {
      var n;
      return t === e ? this._locale._abbr : (n = wt.localeData(t), null != n && (this._locale = n), this)
    },
    lang: a("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function (t) {
      return t === e ? this.localeData() : this.locale(t)
    }),
    localeData: function () {
      return this._locale
    },
    _dateUtcOffset: function () {
      return 15 * -Math.round(this._d.getTimezoneOffset() / 15)
    }
  }), wt.fn.millisecond = wt.fn.milliseconds = gt("Milliseconds", !1), wt.fn.second = wt.fn.seconds = gt("Seconds", !1), wt.fn.minute = wt.fn.minutes = gt("Minutes", !1), wt.fn.hour = wt.fn.hours = gt("Hours", !0), wt.fn.date = gt("Date", !0), wt.fn.dates = a("dates accessor is deprecated. Use date instead.", gt("Date", !0)), wt.fn.year = gt("FullYear", !0), wt.fn.years = a("years accessor is deprecated. Use year instead.", gt("FullYear", !0)), wt.fn.days = wt.fn.day, wt.fn.months = wt.fn.month, wt.fn.weeks = wt.fn.week, wt.fn.isoWeeks = wt.fn.isoWeek, wt.fn.quarters = wt.fn.quarter, wt.fn.toJSON = wt.fn.toISOString, wt.fn.isUTC = wt.fn.isUtc, h(wt.duration.fn = d.prototype, {
    _bubble: function () {
      var e, t, n, r = this._milliseconds, i = this._days, a = this._months, o = this._data, s = 0;
      o.milliseconds = r % 1e3, e = g(r / 1e3), o.seconds = e % 60, t = g(e / 60), o.minutes = t % 60, n = g(t / 60), o.hours = n % 24, i += g(n / 24), s = g(vt(i)), i -= g(yt(s)), a += g(i / 30), i %= 30, s += g(a / 12), a %= 12, o.days = i, o.months = a, o.years = s
    },
    abs: function () {
      return this._milliseconds = Math.abs(this._milliseconds), this._days = Math.abs(this._days), this._months = Math.abs(this._months), this._data.milliseconds = Math.abs(this._data.milliseconds), this._data.seconds = Math.abs(this._data.seconds), this._data.minutes = Math.abs(this._data.minutes), this._data.hours = Math.abs(this._data.hours), this._data.months = Math.abs(this._data.months), this._data.years = Math.abs(this._data.years), this
    },
    weeks: function () {
      return g(this.days() / 7)
    },
    valueOf: function () {
      return this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * A(this._months / 12)
    },
    humanize: function (e) {
      var t = ut(this, !e, this.localeData());
      return e && (t = this.localeData().pastFuture(+this, t)), this.localeData().postformat(t)
    },
    add: function (e, t) {
      var n = wt.duration(e, t);
      return this._milliseconds += n._milliseconds, this._days += n._days, this._months += n._months, this._bubble(), this
    },
    subtract: function (e, t) {
      var n = wt.duration(e, t);
      return this._milliseconds -= n._milliseconds, this._days -= n._days, this._months -= n._months, this._bubble(), this
    },
    get: function (e) {
      return e = T(e), this[e.toLowerCase() + "s"]()
    },
    as: function (e) {
      var t, n;
      if (e = T(e), "month" === e || "year" === e)return t = this._days + this._milliseconds / 864e5, n = this._months + 12 * vt(t), "month" === e ? n : n / 12;
      switch (t = this._days + Math.round(yt(this._months / 12)), e) {
        case"week":
          return t / 7 + this._milliseconds / 6048e5;
        case"day":
          return t + this._milliseconds / 864e5;
        case"hour":
          return 24 * t + this._milliseconds / 36e5;
        case"minute":
          return 24 * t * 60 + this._milliseconds / 6e4;
        case"second":
          return 24 * t * 60 * 60 + this._milliseconds / 1e3;
        case"millisecond":
          return Math.floor(24 * t * 60 * 60 * 1e3) + this._milliseconds;
        default:
          throw new Error("Unknown unit " + e)
      }
    },
    lang: wt.fn.lang,
    locale: wt.fn.locale,
    toIsoString: a("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", function () {
      return this.toISOString()
    }),
    toISOString: function () {
      var e = Math.abs(this.years()), t = Math.abs(this.months()), n = Math.abs(this.days()), r = Math.abs(this.hours()), i = Math.abs(this.minutes()), a = Math.abs(this.seconds() + this.milliseconds() / 1e3);
      return this.asSeconds() ? (this.asSeconds() < 0 ? "-" : "") + "P" + (e ? e + "Y" : "") + (t ? t + "M" : "") + (n ? n + "D" : "") + (r || i || a ? "T" : "") + (r ? r + "H" : "") + (i ? i + "M" : "") + (a ? a + "S" : "") : "P0D"
    },
    localeData: function () {
      return this._locale
    },
    toJSON: function () {
      return this.toISOString()
    }
  }), wt.duration.fn.toString = wt.duration.fn.toISOString;
  for (Et in pn)n(pn, Et) && bt(Et.toLowerCase());
  wt.duration.fn.asMilliseconds = function () {
    return this.as("ms")
  }, wt.duration.fn.asSeconds = function () {
    return this.as("s")
  }, wt.duration.fn.asMinutes = function () {
    return this.as("m")
  }, wt.duration.fn.asHours = function () {
    return this.as("h")
  }, wt.duration.fn.asDays = function () {
    return this.as("d")
  }, wt.duration.fn.asWeeks = function () {
    return this.as("weeks")
  }, wt.duration.fn.asMonths = function () {
    return this.as("M")
  }, wt.duration.fn.asYears = function () {
    return this.as("y")
  }, wt.locale("en", {
    ordinalParse: /\d{1,2}(th|st|nd|rd)/, ordinal: function (e) {
      var t = e % 10, n = 1 === A(e % 100 / 10) ? "th" : 1 === t ? "st" : 2 === t ? "nd" : 3 === t ? "rd" : "th";
      return e + n
    }
  }), Lt ? module.exports = wt : "function" == typeof define && define.amd ? (define("moment", ["require", "exports", "module"], function (e, t, n) {
    return n.config && n.config() && n.config().noGlobal === !0 && (Tt.moment = $t), wt
  }), xt(!0)) : xt()
}.call(this),angular.module("pascalprecht.translate", ["ng"]).run(["$translate", function (e) {
  var t = e.storageKey(), n = e.storage();
  n ? n.get(t) ? e.use(n.get(t)) : angular.isString(e.preferredLanguage()) ? e.use(e.preferredLanguage()) : n.set(t, e.use()) : angular.isString(e.preferredLanguage()) && e.use(e.preferredLanguage())
}]),angular.module("pascalprecht.translate").provider("$translate", ["$STORAGE_KEY", function (e) {
  var t, n, r, i, a, o, s, u, l, c, p, f, d, h, m, g = {}, v = [], y = e, b = [], x = !1, w = "translate-cloak", $ = !1, E = ".", S = "2.4.2", T = function () {
    var e = window.navigator;
    return ((angular.isArray(e.languages) ? e.languages[0] : e.language || e.browserLanguage || e.systemLanguage || e.userLanguage) || "").split("-").join("_")
  }, C = function (e, t) {
    for (var n = 0, r = e.length; r > n; n++)if (e[n] === t)return n;
    return -1
  }, k = function () {
    return this.replace(/^\s+|\s+$/g, "")
  }, A = function (e) {
    for (var t = [], r = angular.lowercase(e), i = 0, a = v.length; a > i; i++)t.push(angular.lowercase(v[i]));
    if (C(t, r) > -1)return e;
    if (n) {
      var o;
      for (var s in n) {
        var u = !1, l = Object.prototype.hasOwnProperty.call(n, s) && angular.lowercase(s) === angular.lowercase(e);
        if ("*" === s.slice(-1) && (u = s.slice(0, -1) === e.slice(0, s.length - 1)), (l || u) && (o = n[s], C(t, angular.lowercase(o)) > -1))return o
      }
    }
    var c = e.split("_");
    return c.length > 1 && C(t, angular.lowercase(c[0])) > -1 ? c[0] : e
  }, _ = function (e, t) {
    if (!e && !t)return g;
    if (e && !t) {
      if (angular.isString(e))return g[e]
    } else angular.isObject(g[e]) || (g[e] = {}), angular.extend(g[e], D(t));
    return this
  };
  this.translations = _, this.cloakClassName = function (e) {
    return e ? (w = e, this) : w
  };
  var D = function (e, t, n, r) {
    var i, a, o, s;
    t || (t = []), n || (n = {});
    for (i in e)Object.prototype.hasOwnProperty.call(e, i) && (s = e[i], angular.isObject(s) ? D(s, t.concat(i), n, i) : (a = t.length ? "" + t.join(E) + E + i : i, t.length && i === r && (o = "" + t.join(E), n[o] = "@:" + a), n[a] = s));
    return n
  };
  this.addInterpolation = function (e) {
    return b.push(e), this
  }, this.useMessageFormatInterpolation = function () {
    return this.useInterpolation("$translateMessageFormatInterpolation")
  }, this.useInterpolation = function (e) {
    return c = e, this
  }, this.useSanitizeValueStrategy = function (e) {
    return x = e, this
  }, this.preferredLanguage = function (e) {
    return M(e), this
  };
  var M = function (e) {
    return e && (t = e), t
  };
  this.translationNotFoundIndicator = function (e) {
    return this.translationNotFoundIndicatorLeft(e), this.translationNotFoundIndicatorRight(e), this
  }, this.translationNotFoundIndicatorLeft = function (e) {
    return e ? (d = e, this) : d
  }, this.translationNotFoundIndicatorRight = function (e) {
    return e ? (h = e, this) : h
  }, this.fallbackLanguage = function (e) {
    return O(e), this
  };
  var O = function (e) {
    return e ? (angular.isString(e) ? (i = !0, r = [e]) : angular.isArray(e) && (i = !1, r = e), angular.isString(t) && C(r, t) < 0 && r.push(t), this) : i ? r[0] : r
  };
  this.use = function (e) {
    if (e) {
      if (!g[e] && !p)throw new Error("$translateProvider couldn't find translationTable for langKey: '" + e + "'");
      return a = e, this
    }
    return a
  };
  var N = function (e) {
    return e ? void(y = e) : u ? u + y : y
  };
  this.storageKey = N, this.useUrlLoader = function (e, t) {
    return this.useLoader("$translateUrlLoader", angular.extend({url: e}, t))
  }, this.useStaticFilesLoader = function (e) {
    return this.useLoader("$translateStaticFilesLoader", e)
  }, this.useLoader = function (e, t) {
    return p = e, f = t || {}, this
  }, this.useLocalStorage = function () {
    return this.useStorage("$translateLocalStorage")
  }, this.useCookieStorage = function () {
    return this.useStorage("$translateCookieStorage")
  }, this.useStorage = function (e) {
    return s = e, this
  }, this.storagePrefix = function (e) {
    return e ? (u = e, this) : e
  }, this.useMissingTranslationHandlerLog = function () {
    return this.useMissingTranslationHandler("$translateMissingTranslationHandlerLog")
  }, this.useMissingTranslationHandler = function (e) {
    return l = e, this
  }, this.usePostCompiling = function (e) {
    return $ = !!e, this
  }, this.determinePreferredLanguage = function (e) {
    var n = e && angular.isFunction(e) ? e() : T();
    return t = v.length ? A(n) : n, this
  }, this.registerAvailableLanguageKeys = function (e, t) {
    return e ? (v = e, t && (n = t), this) : v
  }, this.useLoaderCache = function (e) {
    return e === !1 ? m = void 0 : e === !0 ? m = !0 : "undefined" == typeof e ? m = "$translationCache" : e && (m = e), this
  }, this.$get = ["$log", "$injector", "$rootScope", "$q", function (e, n, u, v) {
    var E, T, P, R = n.get(c || "$translateDefaultInterpolation"), I = !1, L = {}, j = {}, F = function (e, n, i) {
      if (angular.isArray(e)) {
        var o = function (e) {
          for (var t = {}, r = [], a = function (e) {
            var r = v.defer(), a = function (n) {
              t[e] = n, r.resolve([e, n])
            };
            return F(e, n, i).then(a, a), r.promise
          }, o = 0, s = e.length; s > o; o++)r.push(a(e[o]));
          return v.all(r).then(function () {
            return t
          })
        };
        return o(e)
      }
      var u = v.defer();
      e && (e = k.apply(e));
      var l = function () {
        var e = t ? j[t] : j[a];
        if (T = 0, s && !e) {
          var n = E.get(y);
          if (e = j[n], r && r.length) {
            var i = C(r, n);
            T = 0 === i ? 1 : 0, C(r, t) < 0 && r.push(t)
          }
        }
        return e
      }();
      return l ? l.then(function () {
        Q(e, n, i).then(u.resolve, u.reject)
      }, u.reject) : Q(e, n, i).then(u.resolve, u.reject), u.promise
    }, B = function (e) {
      return d && (e = [d, e].join(" ")), h && (e = [e, h].join(" ")), e
    }, q = function (e) {
      a = e, u.$emit("$translateChangeSuccess", {language: e}), s && E.set(F.storageKey(), a), R.setLocale(a), angular.forEach(L, function (e, t) {
        L[t].setLocale(a)
      }), u.$emit("$translateChangeEnd", {language: e})
    }, V = function (e) {
      if (!e)throw"No language key specified for loading.";
      var t = v.defer();
      u.$emit("$translateLoadingStart", {language: e}), I = !0;
      var r = m;
      "string" == typeof r && (r = n.get(r));
      var i = angular.extend({}, f, {key: e, $http: angular.extend({}, {cache: r}, f.$http)});
      return n.get(p)(i).then(function (n) {
        var r = {};
        u.$emit("$translateLoadingSuccess", {language: e}), angular.isArray(n) ? angular.forEach(n, function (e) {
          angular.extend(r, D(e))
        }) : angular.extend(r, D(n)), I = !1, t.resolve({
          key: e,
          table: r
        }), u.$emit("$translateLoadingEnd", {language: e})
      }, function (e) {
        u.$emit("$translateLoadingError", {language: e}), t.reject(e), u.$emit("$translateLoadingEnd", {language: e})
      }), t.promise
    };
    if (s && (E = n.get(s), !E.get || !E.set))throw new Error("Couldn't use storage '" + s + "', missing get() or set() method!");
    angular.isFunction(R.useSanitizeValueStrategy) && R.useSanitizeValueStrategy(x), b.length && angular.forEach(b, function (e) {
      var r = n.get(e);
      r.setLocale(t || a), angular.isFunction(r.useSanitizeValueStrategy) && r.useSanitizeValueStrategy(x), L[r.getInterpolationIdentifier()] = r
    });
    var U = function (e) {
      var t = v.defer();
      return Object.prototype.hasOwnProperty.call(g, e) ? t.resolve(g[e]) : j[e] ? j[e].then(function (e) {
        _(e.key, e.table), t.resolve(e.table)
      }, t.reject) : t.reject(), t.promise
    }, H = function (e, t, n, r) {
      var i = v.defer();
      return U(e).then(function (o) {
        Object.prototype.hasOwnProperty.call(o, t) ? (r.setLocale(e), i.resolve(r.interpolate(o[t], n)), r.setLocale(a)) : i.reject()
      }, i.reject), i.promise
    }, W = function (e, t, n, r) {
      var i, o = g[e];
      return Object.prototype.hasOwnProperty.call(o, t) && (r.setLocale(e), i = r.interpolate(o[t], n), r.setLocale(a)), i
    }, Y = function (e) {
      if (l) {
        var t = n.get(l)(e, a);
        return void 0 !== t ? t : e
      }
      return e
    }, z = function (e, t, n, i) {
      var a = v.defer();
      if (e < r.length) {
        var o = r[e];
        H(o, t, n, i).then(a.resolve, function () {
          z(e + 1, t, n, i).then(a.resolve)
        })
      } else a.resolve(Y(t));
      return a.promise
    }, G = function (e, t, n, i) {
      var a;
      if (e < r.length) {
        var o = r[e];
        a = W(o, t, n, i), a || (a = G(e + 1, t, n, i))
      }
      return a
    }, X = function (e, t, n) {
      return z(P > 0 ? P : T, e, t, n)
    }, K = function (e, t, n) {
      return G(P > 0 ? P : T, e, t, n)
    }, Q = function (e, t, n) {
      var i = v.defer(), o = a ? g[a] : g, s = n ? L[n] : R;
      if (o && Object.prototype.hasOwnProperty.call(o, e)) {
        var u = o[e];
        "@:" === u.substr(0, 2) ? F(u.substr(2), t, n).then(i.resolve, i.reject) : i.resolve(s.interpolate(u, t))
      } else {
        var c;
        l && !I && (c = Y(e)), a && r && r.length ? X(e, t, s).then(function (e) {
          i.resolve(e)
        }, function (e) {
          i.reject(B(e))
        }) : l && !I && c ? i.resolve(c) : i.reject(B(e))
      }
      return i.promise
    }, Z = function (e, t, n) {
      var i, o = a ? g[a] : g, s = n ? L[n] : R;
      if (o && Object.prototype.hasOwnProperty.call(o, e)) {
        var u = o[e];
        i = "@:" === u.substr(0, 2) ? Z(u.substr(2), t, n) : s.interpolate(u, t)
      } else {
        var c;
        l && !I && (c = Y(e)), a && r && r.length ? (T = 0, i = K(e, t, s)) : i = l && !I && c ? c : B(e)
      }
      return i
    };
    if (F.preferredLanguage = function (e) {
        return e && M(e), t
      }, F.cloakClassName = function () {
        return w
      }, F.fallbackLanguage = function (e) {
        if (void 0 !== e && null !== e) {
          if (O(e), p && r && r.length)for (var t = 0, n = r.length; n > t; t++)j[r[t]] || (j[r[t]] = V(r[t]));
          F.use(F.use())
        }
        return i ? r[0] : r
      }, F.useFallbackLanguage = function (e) {
        if (void 0 !== e && null !== e)if (e) {
          var t = C(r, e);
          t > -1 && (P = t)
        } else P = 0
      }, F.proposedLanguage = function () {
        return o
      }, F.storage = function () {
        return E
      }, F.use = function (e) {
        if (!e)return a;
        var t = v.defer();
        u.$emit("$translateChangeStart", {language: e});
        var n = A(e);
        return n && (e = n), g[e] || !p || j[e] ? (t.resolve(e), q(e)) : (o = e, j[e] = V(e).then(function (n) {
          _(n.key, n.table), t.resolve(n.key), q(n.key), o === e && (o = void 0)
        }, function (e) {
          o === e && (o = void 0), u.$emit("$translateChangeError", {language: e}), t.reject(e), u.$emit("$translateChangeEnd", {language: e})
        })), t.promise
      }, F.storageKey = function () {
        return N()
      }, F.isPostCompilingEnabled = function () {
        return $
      }, F.refresh = function (e) {
        function t() {
          i.resolve(), u.$emit("$translateRefreshEnd", {language: e})
        }

        function n() {
          i.reject(), u.$emit("$translateRefreshEnd", {language: e})
        }

        if (!p)throw new Error("Couldn't refresh translation table, no loader registered!");
        var i = v.defer();
        if (u.$emit("$translateRefreshStart", {language: e}), e)g[e] ? V(e).then(function (n) {
          _(n.key, n.table), e === a && q(a), t()
        }, n) : n(); else {
          var o = [], s = {};
          if (r && r.length)for (var l = 0, c = r.length; c > l; l++)o.push(V(r[l])), s[r[l]] = !0;
          a && !s[a] && o.push(V(a)), v.all(o).then(function (e) {
            angular.forEach(e, function (e) {
              g[e.key] && delete g[e.key], _(e.key, e.table)
            }), a && q(a), t()
          })
        }
        return i.promise
      }, F.instant = function (e, n, i) {
        if (null === e || angular.isUndefined(e))return e;
        if (angular.isArray(e)) {
          for (var o = {}, s = 0, u = e.length; u > s; s++)o[e[s]] = F.instant(e[s], n, i);
          return o
        }
        if (angular.isString(e) && e.length < 1)return e;
        e && (e = k.apply(e));
        var c, p = [];
        t && p.push(t), a && p.push(a), r && r.length && (p = p.concat(r));
        for (var f = 0, d = p.length; d > f; f++) {
          var h = p[f];
          if (g[h] && "undefined" != typeof g[h][e] && (c = Z(e, n, i)), "undefined" != typeof c)break
        }
        return c || "" === c || (c = R.interpolate(e, n), l && !I && (c = Y(e))), c
      }, F.versionInfo = function () {
        return S
      }, F.loaderCache = function () {
        return m
      }, p && (angular.equals(g, {}) && F.use(F.use()), r && r.length))for (var J = function (e) {
      _(e.key, e.table), u.$emit("$translateChangeEnd", {language: e.key})
    }, et = 0, tt = r.length; tt > et; et++)j[r[et]] = V(r[et]).then(J);
    return F
  }]
}]),angular.module("pascalprecht.translate").factory("$translateDefaultInterpolation", ["$interpolate", function (e) {
  var t, n = {}, r = "default", i = null, a = {
    escaped: function (e) {
      var t = {};
      for (var n in e)Object.prototype.hasOwnProperty.call(e, n) && (t[n] = angular.element("<div></div>").text(e[n]).html());
      return t
    }
  }, o = function (e) {
    var t;
    return t = angular.isFunction(a[i]) ? a[i](e) : e
  };
  return n.setLocale = function (e) {
    t = e
  }, n.getInterpolationIdentifier = function () {
    return r
  }, n.useSanitizeValueStrategy = function (e) {
    return i = e, this
  }, n.interpolate = function (t, n) {
    return i && (n = o(n)), e(t)(n || {})
  }, n
}]),angular.module("pascalprecht.translate").constant("$STORAGE_KEY", "NG_TRANSLATE_LANG_KEY"),angular.module("pascalprecht.translate").directive("translate", ["$translate", "$q", "$interpolate", "$compile", "$parse", "$rootScope", function (e, t, n, r, i, a) {
  return {
    restrict: "AE", scope: !0, compile: function (t, o) {
      var s = o.translateValues ? o.translateValues : void 0, u = o.translateInterpolation ? o.translateInterpolation : void 0, l = t[0].outerHTML.match(/translate-value-+/i), c = "^(.*)(" + n.startSymbol() + ".*" + n.endSymbol() + ")(.*)";
      return function (t, p, f) {
        if (t.interpolateParams = {}, t.preText = "", t.postText = "", f.$observe("translate", function (e) {
            if (angular.equals(e, "") || !angular.isDefined(e)) {
              var r = p.text().match(c);
              angular.isArray(r) ? (t.preText = r[1], t.postText = r[3], t.translationId = n(r[2])(t.$parent)) : t.translationId = p.text().replace(/^\s+|\s+$/g, "")
            } else t.translationId = e
          }), f.$observe("translateDefault", function (e) {
            t.defaultText = e
          }), s && f.$observe("translateValues", function (e) {
            e && t.$parent.$watch(function () {
              angular.extend(t.interpolateParams, i(e)(t.$parent))
            })
          }), l) {
          var d = function (e) {
            f.$observe(e, function (n) {
              t.interpolateParams[angular.lowercase(e.substr(14, 1)) + e.substr(15)] = n
            })
          };
          for (var h in f)Object.prototype.hasOwnProperty.call(f, h) && "translateValue" === h.substr(0, 14) && "translateValues" !== h && d(h)
        }
        var m = function (t, n, i) {
          i || "undefined" == typeof n.defaultText || (t = n.defaultText), p.html(n.preText + t + n.postText);
          var a = e.isPostCompilingEnabled(), s = "undefined" != typeof o.translateCompile, u = s && "false" !== o.translateCompile;
          (a && !s || u) && r(p.contents())(n)
        }, g = function () {
          return s || l ? function () {
            var n = function () {
              t.translationId && t.interpolateParams && e(t.translationId, t.interpolateParams, u).then(function (e) {
                m(e, t, !0)
              }, function (e) {
                m(e, t, !1)
              })
            };
            t.$watch("interpolateParams", n, !0), t.$watch("translationId", n)
          } : function () {
            var n = t.$watch("translationId", function (r) {
              t.translationId && r && e(r, {}, u).then(function (e) {
                m(e, t, !0), n()
              }, function (e) {
                m(e, t, !1), n()
              })
            }, !0)
          }
        }(), v = a.$on("$translateChangeSuccess", g);
        g(), t.$on("$destroy", v)
      }
    }
  }
}]),angular.module("pascalprecht.translate").directive("translateCloak", ["$rootScope", "$translate", function (e, t) {
  return {
    compile: function (n) {
      var r = function () {
        n.addClass(t.cloakClassName())
      }, i = function () {
        n.removeClass(t.cloakClassName())
      }, a = e.$on("$translateChangeEnd", function () {
        i(), a(), a = null
      });
      return r(), function (e, n, a) {
        a.translateCloak && a.translateCloak.length && a.$observe("translateCloak", function (e) {
          t(e).then(i, r)
        })
      }
    }
  }
}]),angular.module("pascalprecht.translate").filter("translate", ["$parse", "$translate", function (e, t) {
  var n = function (n, r, i) {
    return angular.isObject(r) || (r = e(r)(this)), t.instant(n, r, i)
  };
  return n.$stateful = !0, n
}]),define("angular-translate", function () {
}),define("camunda-commons-ui/filter/date/index", ["angular", "moment", "angular-translate"], function (e, t) {
  "use strict";
  var n = e.module("cam.commons.filter.date", ["pascalprecht.translate"]);
  return n.provider("camDateFormat", function () {
    var e = {normal: "LLL", "short": "LL", "long": "LLLL"};
    this.setDateFormat = function (t, n) {
      n = n || "normal", e[n] = t
    }, this.$get = function () {
      return function (t) {
        return t = t || "normal", e[t]
      }
    }
  }), n.config(["$filterProvider", function (e) {
    e.register("camDate", ["$translate", "camDateFormat", function (e, n) {
      return function (e, r) {
        return e ? t(e).format(n(r)) : ""
      }
    }])
  }]), n
}),define("camunda-commons-ui/widgets/variable/cam-variable-validator", ["camunda-bpm-sdk-js-type-utils"], function (e) {
  "use strict";
  return [function () {
    return {
      require: "ngModel", link: function (t, n, r, i) {
        var a = function (t) {
          var n = r.camVariableValidator;
          return -1 !== ["String", "Object", "Null"].indexOf(n) ? i.$setValidity("camVariableValidator", !0) : i.$setValidity("camVariableValidator", e.isType(t, n)), t
        };
        i.$parsers.unshift(a), i.$formatters.push(a), r.$observe("camVariableValidator", function () {
          return a(i.$viewValue)
        })
      }
    }
  }]
}),define("camunda-commons-ui/widgets/index", ["angular", "./inline-field/cam-widget-inline-field", "./search-pill/cam-widget-search-pill", "./search-pill/cam-query-component", "./header/cam-widget-header", "./footer/cam-widget-footer", "./loader/cam-widget-loader", "./debug/cam-widget-debug", "./variable/cam-widget-variable", "./search/cam-widget-search", "./bpmn-viewer/cam-widget-bpmn-viewer", "../filter/date/index", "../directives/index", "../search/index", "./variable/cam-variable-validator", "angular-bootstrap"], function (e, t, n, r, i, a, o, s, u, l, c, p, f, d, h) {
  "use strict";
  var m = e.module("camunda.common.widgets", [p.name, f.name, d.name, "ui.bootstrap"]);
  return m.directive("camWidgetInlineField", t), m.directive("camWidgetSearchPill", n), m.directive("camWidgetHeader", i), m.directive("camWidgetFooter", a), m.directive("camWidgetLoader", o), m.directive("camWidgetDebug", s), m.directive("camWidgetVariable", u), m.directive("camWidgetSearch", l), m.directive("camWidgetBpmnViewer", c), m.directive("camVariableValidator", h), m.filter("camQueryComponent", r), m
}),define("camunda-commons-ui/index", ["angular", "./auth/index", "./util/index", "./pages/index", "./plugin/index", "./directives/index", "./resources/index", "./search/index", "./services/index", "./widgets/index", "./filter/date/index", "angular-bootstrap", "angular-translate"], function (e, t, n, r, i, a, o, s, u, l, c) {
  "use strict";
  return e.module("cam.commons", [t.name, n.name, r.name, i.name, a.name, o.name, s.name, u.name, l.name, c.name, "ui.bootstrap", "pascalprecht.translate"])
}),define("camunda-commons-ui", ["camunda-commons-ui/index"], function (e) {
  return e
}),function (e, t, n) {
  "use strict";
  function r(e) {
    return null != e && "" !== e && "hasOwnProperty" !== e && s.test("." + e)
  }

  function i(e, t) {
    if (!r(t))throw o("badmember", 'Dotted member path "@{0}" is invalid.', t);
    for (var i = t.split("."), a = 0, s = i.length; s > a && e !== n; a++) {
      var u = i[a];
      e = null !== e ? e[u] : n
    }
    return e
  }

  function a(e, n) {
    n = n || {}, t.forEach(n, function (e, t) {
      delete n[t]
    });
    for (var r in e)!e.hasOwnProperty(r) || "$" === r.charAt(0) && "$" === r.charAt(1) || (n[r] = e[r]);
    return n
  }

  var o = t.$$minErr("$resource"), s = /^(\.[a-zA-Z_$][0-9a-zA-Z_$]*)+$/;
  t.module("ngResource", ["ng"]).factory("$resource", ["$http", "$q", function (e, r) {
    function s(e) {
      return u(e, !0).replace(/%26/gi, "&").replace(/%3D/gi, "=").replace(/%2B/gi, "+")
    }

    function u(e, t) {
      return encodeURIComponent(e).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, t ? "%20" : "+")
    }

    function l(e, t) {
      this.template = e, this.defaults = t || {}, this.urlParams = {}
    }

    function c(s, u, v) {
      function y(e, t) {
        var n = {};
        return t = h({}, u, t), d(t, function (t, r) {
          g(t) && (t = t()), n[r] = t && t.charAt && "@" == t.charAt(0) ? i(e, t.substr(1)) : t
        }), n
      }

      function b(e) {
        return e.resource
      }

      function x(e) {
        a(e || {}, this)
      }

      var w = new l(s);
      return v = h({}, p, v), d(v, function (i, s) {
        var u = /^(POST|PUT|PATCH)$/i.test(i.method);
        x[s] = function (s, l, c, p) {
          var v, $, E, S = {};
          switch (arguments.length) {
            case 4:
              E = p, $ = c;
            case 3:
            case 2:
              if (!g(l)) {
                S = s, v = l, $ = c;
                break
              }
              if (g(s)) {
                $ = s, E = l;
                break
              }
              $ = l, E = c;
            case 1:
              g(s) ? $ = s : u ? v = s : S = s;
              break;
            case 0:
              break;
            default:
              throw o("badargs", "Expected up to 4 arguments [params, data, success, error], got {0} arguments", arguments.length)
          }
          var T = this instanceof x, C = T ? v : i.isArray ? [] : new x(v), k = {}, A = i.interceptor && i.interceptor.response || b, _ = i.interceptor && i.interceptor.responseError || n;
          d(i, function (e, t) {
            "params" != t && "isArray" != t && "interceptor" != t && (k[t] = m(e))
          }), u && (k.data = v), w.setUrlParams(k, h({}, y(v, i.params || {}), S), i.url);
          var D = e(k).then(function (e) {
            var n = e.data, r = C.$promise;
            if (n) {
              if (t.isArray(n) !== !!i.isArray)throw o("badcfg", "Error in resource configuration. Expected response to contain an {0} but got an {1}", i.isArray ? "array" : "object", t.isArray(n) ? "array" : "object");
              i.isArray ? (C.length = 0, d(n, function (e) {
                C.push(new x(e))
              })) : (a(n, C), C.$promise = r)
            }
            return C.$resolved = !0, e.resource = C, e
          }, function (e) {
            return C.$resolved = !0, (E || f)(e), r.reject(e)
          });
          return D = D.then(function (e) {
            var t = A(e);
            return ($ || f)(t, e.headers), t
          }, _), T ? D : (C.$promise = D, C.$resolved = !1, C)
        }, x.prototype["$" + s] = function (e, t, n) {
          g(e) && (n = t, t = e, e = {});
          var r = x[s].call(this, e, this, t, n);
          return r.$promise || r
        }
      }), x.bind = function (e) {
        return c(s, h({}, u, e), v)
      }, x
    }

    var p = {
      get: {method: "GET"},
      save: {method: "POST"},
      query: {method: "GET", isArray: !0},
      remove: {method: "DELETE"},
      "delete": {method: "DELETE"}
    }, f = t.noop, d = t.forEach, h = t.extend, m = t.copy, g = t.isFunction;
    return l.prototype = {
      setUrlParams: function (e, n, r) {
        var i, a, u = this, l = r || u.template, c = u.urlParams = {};
        d(l.split(/\W/), function (e) {
          if ("hasOwnProperty" === e)throw o("badname", "hasOwnProperty is not a valid parameter name.");
          !new RegExp("^\\d+$").test(e) && e && new RegExp("(^|[^\\\\]):" + e + "(\\W|$)").test(l) && (c[e] = !0)
        }), l = l.replace(/\\:/g, ":"), n = n || {}, d(u.urlParams, function (e, r) {
          i = n.hasOwnProperty(r) ? n[r] : u.defaults[r], t.isDefined(i) && null !== i ? (a = s(i), l = l.replace(new RegExp(":" + r + "(\\W|$)", "g"), function (e, t) {
            return a + t
          })) : l = l.replace(new RegExp("(/?):" + r + "(\\W|$)", "g"), function (e, t, n) {
            return "/" == n.charAt(0) ? n : t + n
          })
        }), l = l.replace(/\/+$/, "") || "/", l = l.replace(/\/\.(?=\w+($|\?))/, "."), e.url = l.replace(/\/\\\./, "/."), d(n, function (t, n) {
          u.urlParams[n] || (e.params = e.params || {}, e.params[n] = t)
        })
      }
    }, c
  }])
}(window, window.angular),define("angular-resource", function () {
}),define("camunda-tasklist-ui-deps", function () {
});
//# sourceMappingURL=deps.js
//# sourceMappingURL=deps.js.map

! function o(a, u, l) {
    function s(t, e) {
        if (!u[t]) {
            if (!a[t]) {
                var n = "function" == typeof require && require;
                if (!e && n) return n(t, !0);
                if (c) return c(t, !0);
                var i = new Error("Cannot find module '" + t + "'");
                throw i.code = "MODULE_NOT_FOUND", i
            }
            var r = u[t] = {
                exports: {}
            };
            a[t][0].call(r.exports, function(e) {
                return s(a[t][1][e] || e)
            }, r, r.exports, o, a, u, l)
        }
        return u[t].exports
    }
    for (var c = "function" == typeof require && require, e = 0; e < l.length; e++) s(l[e]);
    return s
}({
    1: [function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var i = function() {
                function i(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var i = t[n];
                        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                    }
                }
                return function(e, t, n) {
                    return t && i(e.prototype, t), n && i(e, n), e
                }
            }(),
            r = e("./createIconsAndPasteToDOM"),
            o = e("./generateReelCombinations");
        var a = function() {
            function t(e) {
                ! function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, t), this.wrapper = e.wrapper, this.rows = e.rows, this.reelIcons = e.reelIcons, this.winCombination = e.winCombination, this.oneSpinLength = e.oneSpinLength, this.iconsHeight = e.iconsHeight, this.iconsPerRow = e.iconsPerRow, this.additional_wrapper = e.additional_wrapper, this.spinCounter = 0
            }
            return i(t, [{
                key: "renderIcons",
                value: function() {
                    var e = (0, o.generateReelCombinations)(this.reelIcons, this.winCombination, this.oneSpinLength);
                    this.stopPositions = (0, r.createIconsAndPasteToDOM)(e, this.iconsHeight, this.iconsPerRow, this.winCombination.length, this.wrapper, this.rows, this.additional_wrapper)
                }
            }, {
                key: "spin",
                value: function() {
                    var e = document.querySelectorAll("." + this.rows);
                    if (this.spinCounter < this.winCombination.length) {
                        var t = !0,
                            n = !1,
                            i = void 0;
                        try {
                            for (var r, o = e[Symbol.iterator](); !(t = (r = o.next()).done); t = !0) {
                                r.value.style.top = this.stopPositions[this.spinCounter]
                            }
                        } catch (e) {
                            n = !0, i = e
                        } finally {
                            try {
                                !t && o.return && o.return()
                            } finally {
                                if (n) throw i
                            }
                        }
                        var a = !1,
                            u = this.spinCounter;
                        return this.spinCounter++, this.spinCounter < this.winCombination.length && (a = !0), {
                            count: u,
                            willSpin: a
                        }
                    }
                }
            }]), t
        }();
        n.default = a
    }, {
        "./createIconsAndPasteToDOM": 3,
        "./generateReelCombinations": 4
    }],
    2: [function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var a = function(e) {
            return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        };
        n.setCounter = function(e) {
            var t = e.valueCurrent || 0,
                n = e.valueToSet || 0,
                i = e.step || 100;
            if (e.item) var r = e.item,
                o = setInterval(function() {
                    i < n - t && 0 < i || i < n && i < 0 ? (t += i, r.innerText = a(t)) : (r.innerText = a(n), clearInterval(o), e.onComplete && e.onComplete())
                }, 25);
            return n
        }
    }, {}],
    3: [function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        n.createIconsAndPasteToDOM = function(e, t, n, i, r, o, a) {
            var u = void 0,
                l = document.createDocumentFragment(),
                s = (e[0].length - n) * t,
                c = [],
                d = !0,
                f = !1,
                p = void 0;
            try {
                for (var m, v = e[Symbol.iterator](); !(d = (m = v.next()).done); d = !0) {
                    var h = m.value,
                        g = document.createElement("div");
                    g.className = o;
                    var y = document.createDocumentFragment(),
                        b = u = 0,
                        w = !0,
                        I = !1,
                        C = void 0;
                    try {
                        for (var S, x = h[Symbol.iterator](); !(w = (S = x.next()).done); w = !0) {
                            var O = S.value,
                                _ = document.createElement("div");
                            _.className = "reel_icon " + O, _.style.top = u + "px", y.appendChild(_), u += t, b % ((e[0].length - 1) / i) == 0 && c.length < i && c.push(-u + "px"), b++
                        }
                    } catch (e) {
                        I = !0, C = e
                    } finally {
                        try {
                            !w && x.return && x.return()
                        } finally {
                            if (I) throw C
                        }
                    }
                    if (g.appendChild(y), g.style.top = -s + "px", a) {
                        var P = document.createElement("div");
                        P.className = "additional_row_wrapper", P.appendChild(g), l.appendChild(P)
                    } else l.appendChild(g)
                }
            } catch (e) {
                f = !0, p = e
            } finally {
                try {
                    !d && v.return && v.return()
                } finally {
                    if (f) throw p
                }
            }
            return document.getElementById(r).appendChild(l), c.reverse()
        }
    }, {}],
    4: [function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.generateReelCombinations = void 0;
        var O = e("./randomInteger");
        n.generateReelCombinations = function(e, t, n) {
            for (var i = [], r = e.length, o = t[0][0].length, a = t.length, u = void 0, l = 0; l < o; l++) i.push([]);
            for (var s = 0; s < a; s++) {
                for (var c = 0; c < n; c++)
                    for (var d = 0; d < o; d++) i[d].push(e[(0, O.randomInteger)(0, r - 1)]);
                u = t[s];
                for (var f = 0; f < o; f++) {
                    var p = !0,
                        m = !1,
                        v = void 0;
                    try {
                        for (var h, g = u[Symbol.iterator](); !(p = (h = g.next()).done); p = !0) {
                            var y = h.value;
                            i[f].push(y[f])
                        }
                    } catch (e) {
                        m = !0, v = e
                    } finally {
                        try {
                            !p && g.return && g.return()
                        } finally {
                            if (m) throw v
                        }
                    }
                }
            }
            var b = !0,
                w = !1,
                I = void 0;
            try {
                for (var C, S = i[Symbol.iterator](); !(b = (C = S.next()).done); b = !0) {
                    var x = C.value;
                    x.push(e[(0, O.randomInteger)(0, r - 1)]), x.reverse()
                }
            } catch (e) {
                w = !0, I = e
            } finally {
                try {
                    !b && S.return && S.return()
                } finally {
                    if (w) throw I
                }
            }
            return i
        }
    }, {
        "./randomInteger": 6
    }],
    5: [function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        n.pulseButton = function(e) {
            if (e.item) {
                var t = e.scale || 1;
                anime({
                    targets: e.item,
                    scale: [{
                        value: t,
                        duration: 0
                    }, {
                        value: 1.04 * t,
                        duration: 600,
                        easing: "easeInOutQuad"
                    }, {
                        value: t,
                        duration: 600,
                        easing: "easeInOutQuad"
                    }],
                    filter: [{
                        value: "brightness(1)",
                        duration: 0
                    }, {
                        value: "brightness(1.2)",
                        duration: e.filter ? 600 : 0,
                        easing: "easeInOutQuad"
                    }, {
                        value: "brightness(1)",
                        duration: e.filter ? 600 : 0,
                        easing: "easeInOutQuad"
                    }],
                    loop: e.loop || !1
                })
            }
        }
    }, {}],
    6: [function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        n.randomInteger = function(e, t) {
            var n = e - .5 + Math.random() * (t - e + 1);
            return n = Math.round(n)
        }
    }, {}],
    7: [function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        };
        n.getPageScale = function(e, t, n) {
            var i = t / e;
            return {
                scale: i,
                tabletScale: .68 <= t / n ? .68 * n / e : i
            }
        }, n.setScaleForItems = function(e, i) {
            0 < e.length && e.map(function(e) {
                var t = i.tabletScale;
                if ("object" !== (void 0 === e ? "undefined" : r(e))) document.getElementById(e).style.transform = "scale(" + i.tabletScale + ")";
                else {
                    var n = e.scale ? t * e.scale : t;
                    if (e.items && 0 < e.items.length) e.items.forEach(function(e) {
                        e.style.transform = "scale(" + n + ")"
                    });
                    else e.items.style.transform = "scale(" + n + ")"
                }
            })
        }
    }, {}],
    8: [function(e, t, n) {
        "use strict";
        var i, d = e("./lib/responsiveScale"),
            r = e("./lib/Reel"),
            f = (i = r) && i.__esModule ? i : {
                default: i
            },
            p = e("./lib/pulseButton"),
            m = e("./lib/animateCounter"),
            v = e("./lib/randomInteger");
        window.onload = function() {
            var e = ["snowflake", "heart", "santa", "mrsSanta", "bells", "candy", "reindeer"],
                t = [
                    [
                        [e[4], e[6], e[5]],
                        [e[0], e[0], e[0]],
                        [e[3], e[1], e[3]]
                    ],
                    [
                        [e[0], e[0], e[0]],
                        [e[0], e[0], e[0]],
                        [e[0], e[0], e[0]]
                    ]
                ],
                r = new f.default({
                    wrapper: "reel_wrapper",
                    additional_wrapper: !1,
                    rows: "reel_row",
                    reelIcons: e,
                    winCombination: t,
                    oneSpinLength: 14,
                    iconsHeight: 176.666,
                    iconsPerRow: 3
                });
            r.renderIcons();
            var n = function(e) {
                    (0, d.setScaleForItems)(["machine", "logo", "hint", "partOfTree", "copyright", "finalTop", "finalBottom", "finalLogo"], e)
                },
                o = {
                    item: document.getElementById("hint"),
                    show: function() {
                        this.item.setAttribute("data-open", "true")
                    },
                    hide: function() {
                        this.item.setAttribute("data-open", "false")
                    },
                    exchangeBubble: function() {
                        this.item.setAttribute("data-bubble", "1")
                    }
                },
                l = {
                    item: document.getElementById("gloss"),
                    counterDOM: document.getElementById("counterValue"),
                    counter: 23345,
                    value: 40,
                    increment: function() {
                        this.value += 5, this.item.style.width = this.value + "%", (0, m.setCounter)({
                            valueCurrent: this.counter,
                            valueToSet: this.counter += 100,
                            step: 9,
                            item: this.counterDOM
                        })
                    }
                },
                i = function(n, i) {
                    var e = 3 !== n ? ".prizeSnow" : '.prizeSnow[data-count="3"], .prizeSnow[data-count="4"], .prizeSnow[data-count="5"]',
                        r = document.querySelectorAll(e),
                        o = 0,
                        a = document.querySelectorAll(".reel_icon"),
                        u = setInterval(function() {
                            if (o < r.length) {
                                var e = r[o],
                                    t = o;
                                setTimeout(function() {
                                    if (3 === n) document.querySelector(".reel_row:nth-child(" + (t + 1) + ") .reel_icon:nth-child(20)").setAttribute("data-state", "inactive");
                                    else {
                                        var e = void 0;
                                        0 === t ? e = 1 : 1 === t ? e = 36 : 2 === t ? e = 71 : 3 === t ? e = 2 : 4 === t ? e = 37 : 5 === t ? e = 72 : 6 === t ? e = 3 : 7 === t ? e = 38 : 8 === t && (e = 73), a[e].setAttribute("data-state", "inactive")
                                    }
                                }, 100), anime({
                                    targets: e,
                                    opacity: [{
                                        value: 0,
                                        duration: 0
                                    }, {
                                        value: 1,
                                        duration: 100
                                    }, {
                                        value: 0,
                                        duration: 100,
                                        delay: 400
                                    }],
                                    left: [{
                                        value: "-37px",
                                        duration: 500,
                                        delay: 100,
                                        easing: "easeInOutQuad"
                                    }],
                                    top: [{
                                        value: "-95px",
                                        duration: 450,
                                        delay: 100,
                                        easing: "easeInOutQuad"
                                    }],
                                    scale: [{
                                        value: 1,
                                        duration: 0
                                    }, {
                                        value: .2,
                                        duration: 600,
                                        easing: "easeInOutQuad"
                                    }],
                                    complete: function() {
                                        e.setAttribute("style", ""), l.increment()
                                    }
                                }), o++
                            } else clearInterval(u), setTimeout(function() {
                                i && i()
                            }, 1e3)
                        }, 320)
                },
                a = function() {
                    var t = document.querySelectorAll("#coinsFly div"),
                        n = 0,
                        i = u("#coinsFly div");
                    i();
                    var r = setInterval(function() {
                        if (n < t.length) {
                            var e = (0, v.randomInteger)(0, 360);
                            anime({
                                targets: t[n],
                                delay: (0, v.randomInteger)(0, 750),
                                top: [{
                                    value: (0, v.randomInteger)(-300, -450) + "%",
                                    duration: 600,
                                    easing: "easeOutCubic"
                                }, {
                                    value: "21%",
                                    duration: 500,
                                    delay: 10,
                                    easing: "easeInCubic"
                                }],
                                left: [{
                                    value: (0, v.randomInteger)(-200, 200) + "%",
                                    duration: 640,
                                    easing: "easeOutQuad"
                                }],
                                scale: [{
                                    value: 0,
                                    duration: 0
                                }, {
                                    value: .8,
                                    duration: 25,
                                    easing: "easeInQuad"
                                }],
                                rotate: [{
                                    value: e + "deg",
                                    duration: 0
                                }]
                            }), n++
                        } else setTimeout(function() {
                            i()
                        }, 2e3), clearInterval(r)
                    }, 15)
                },
                u = function(e) {
                    var t = 0,
                        n = ["-0px -0px", "-90px -0px", "-0px -90px", "-90px -90px", "-0px -180px", "-90px -180px"],
                        i = n.length,
                        r = document.querySelectorAll(e),
                        o = r.length,
                        a = 0,
                        u = [],
                        l = setInterval(function() {
                            for (a = 0; a < o; a++) "number" != typeof u[a] && (u[a] = (0, v.randomInteger)(0, i - 1)), r[a].style.backgroundPosition = n[u[a]], u[a] < i ? u[a]++ : u[a] = 0
                        }, 75);
                    return function() {
                        2 === ++t && clearInterval(l)
                    }
                },
                s = {
                    item: document.getElementById("spinBtn"),
                    canClick: !0,
                    isOpen: !1,
                    clickCounter: 0,
                    callbacks: [function(e) {
                        i(3, function() {
                            o.exchangeBubble(), o.show(), setTimeout(function() {
                                return e()
                            }, 1e3)
                        })
                    }, function(e) {
                        i(9, function() {
                            document.getElementById("counter").setAttribute("data-open", "true"), setTimeout(function() {
                                return a()
                            }, 900), setTimeout(function() {
                                finalScreen.setAttribute("data-open", "true")
                            }, 2500)
                        })
                    }],
                    toggle: function() {
                        this.item.setAttribute("data-open", "" + (this.isOpen = !this.isOpen))
                    },
                    onClick: function() {
                        var t = this;
                        if (this.canClick) {
                            this.canClick = !1, this.toggle(), o.hide();
                            var e = r.spin(),
                                n = e.willSpin,
                                i = function(e) {
                                    e && (t.canClick = e, t.toggle())
                                };
                            setTimeout(function() {
                                void 0 !== e && ("function" == typeof t.callbacks[t.clickCounter] ? t.callbacks[t.clickCounter](function() {
                                    return i(n)
                                }) : i(n), t.clickCounter++)
                            }, 3e3)
                        }
                    }
                },
                c = (0, d.getPageScale)(640, window.innerWidth, window.innerHeight);
            n(c), o.show(), (0, p.pulseButton)({
                item: s.item,
                scale: c.tabletScale,
                loop: !0,
                filter: !0
            }), (0, p.pulseButton)({
                item: installBtn,
                scale: c.tabletScale,
                loop: !0,
                filter: !0
            }), setTimeout(function() {
                return s.toggle()
            }, 1e3), s.item.onclick = function() {
                return s.onClick()
            }, window.onresize = function() {
                c = (0, d.getPageScale)(640, window.innerWidth, window.innerHeight), n(c)
            }
        }
    }, {
        "./lib/Reel": 1,
        "./lib/animateCounter": 2,
        "./lib/pulseButton": 5,
        "./lib/randomInteger": 6,
        "./lib/responsiveScale": 7
    }]
}, {}, [8]);
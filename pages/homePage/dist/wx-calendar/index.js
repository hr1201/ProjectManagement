"use strict";
var h = t(require("./utils/device")),
  c = t(require("./utils/handler")),
  o = require("./utils/tools");

function t(t) {
  return t && t.__esModule ? t : {
    default: t
  }
}

function f(t, a) {
  var e = "undefined" != typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
  if (!e) {
    if (Array.isArray(t) || (e = d(t)) || a && t && "number" == typeof t.length) {
      e && (t = e);
      var n = 0,
        a = function () {};
      return {
        s: a,
        n: function () {
          return n >= t.length ? {
            done: !0
          } : {
            done: !1,
            value: t[n++]
          }
        },
        e: function (t) {
          throw t
        },
        f: a
      }
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
  }
  var r, i = !0,
    s = !1;
  return {
    s: function () {
      e = e.call(t)
    },
    n: function () {
      var t = e.next();
      return i = t.done, t
    },
    e: function (t) {
      s = !0, r = t
    },
    f: function () {
      try {
        i || null == e.return || e.return()
      } finally {
        if (s) throw r
      }
    }
  }
}

function n(a, t) {
  var e, n = Object.keys(a);
  return Object.getOwnPropertySymbols && (e = Object.getOwnPropertySymbols(a), t && (e = e.filter(function (t) {
    return Object.getOwnPropertyDescriptor(a, t).enumerable
  })), n.push.apply(n, e)), n
}

function m(a) {
  for (var t = 1; t < arguments.length; t++) {
    var e = null != arguments[t] ? arguments[t] : {};
    t % 2 ? n(Object(e), !0).forEach(function (t) {
      l(a, t, e[t])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(a, Object.getOwnPropertyDescriptors(e)) : n(Object(e)).forEach(function (t) {
      Object.defineProperty(a, t, Object.getOwnPropertyDescriptor(e, t))
    })
  }
  return a
}

function l(t, a, e) {
  return a in t ? Object.defineProperty(t, a, {
    value: e,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[a] = e, t
}

function i(t, a) {
  return u(t) || s(t, a) || d(t, a) || e()
}

function e() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
}

function d(t, a) {
  if (t) {
    if ("string" == typeof t) return r(t, a);
    var e = Object.prototype.toString.call(t).slice(8, -1);
    return "Map" === (e = "Object" === e && t.constructor ? t.constructor.name : e) || "Set" === e ? Array.from(t) : "Arguments" === e || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e) ? r(t, a) : void 0
  }
}

function r(t, a) {
  (null == a || a > t.length) && (a = t.length);
  for (var e = 0, n = new Array(a); e < a; e++) n[e] = t[e];
  return n
}

function s(t, a) {
  var e = null == t ? null : "undefined" != typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
  if (null != e) {
    var n, r, i = [],
      s = !0,
      h = !1;
    try {
      for (e = e.call(t); !(s = (n = e.next()).done) && (i.push(n.value), !a || i.length !== a); s = !0);
    } catch (t) {
      h = !0, r = t
    } finally {
      try {
        s || null == e.return || e.return()
      } finally {
        if (h) throw r
      }
    }
    return i
  }
}

function u(t) {
  if (Array.isArray(t)) return t
}
var y = "2.0.0",
  a = 5,
  g = (0, o.PanelCountMiddleIdx)(a);
Component({
  behaviors: ["wx://component-export"],
  options: {
    pureDataPattern: /^_/
  },
  properties: {
    _vibrate: {
      type: Boolean,
      value: !0
    },
    view: {
      type: String,
      value: "month"
    },
    _markers: {
      type: Array,
      value: []
    },
    darkmode: {
      type: Boolean,
      value: !1
    },
    _date: {
      type: Number,
      optionalTypes: [String, Array, Object],
      value: (new Date).getTime()
    },
    checkedShow: {
      type: Boolean,
      value: !0
    },
    _startWeek: {
      type: Number,
      value: 0
    },
    showLunar: {
      type: Boolean,
      value: !0
    },
    showMark: {
      type: Boolean,
      value: !0
    }
  },
  data: {
    loading: !0,
    months: [],
    maxHeight: 0,
    minHeight: 0,
    calendarHeight: 0,
    panelHeight: 0,
    currView: 1,
    currViewName: "month",
    titleInfo: "",
    weeks: "",
    solidDay: !1,
    barAnimation: !0,
    currTab: g,
    panels: (0, o.PanelsCount)(a),
    tdOpShow: !1,
    weektabchange: -1,
    monthchange: !1,
    needInitTrans: !1,
    viewchange: "",
    yearPanelShow: !1,
    yearMs: [],
    currYearsTab: g
  },
  attached: function () {
    var t = this;
    setTimeout(function () {
      t._rects = [], t._today = null, t._selDay = null, t._currWeekIdx = 0, t._rectsLoading = !0, t._yearPanelShow = !1, t._weekStart = t.data._startWeek, t._currView = "week" === t.data.view ? 2 : 1, t.data.showMark && (t._dateMarkers = t.initMarkers()), t._handler = new c.default(t, t._weekStart), t.initialize(function () {
        t.calcWeekRects(function () {
          2 == t._currView ? t.initWeeks() : t.initMonths(), t.bindLoad(), t.setSelBar()
        })
      })
    }, 0)
  },
  methods: {
    initialize: function () {
      var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : function () {},
        a = (new h.default).layout(),
        e = a.mainHeight,
        n = a.panelHeight,
        r = a.maxHeight,
        i = a.minHeight,
        s = c.default.CorrectDate(this.data._date);
      this._today = this._handler.today(), this._selDay = s ? this._handler.date(s) : this._today;
      a = this.titleInfo(this._selDay, this._today), s = c.default.ResortWeeks(this._weekStart);
      this.setData({
        weeks: s,
        maxHeight: r,
        minHeight: i,
        panelHeight: n,
        titleInfo: a,
        calendarHeight: e,
        currView: this._currView,
        currViewName: this.data.view,
        yearMs: this.setYearMs(this._selDay, this.data.currTab)
      }, t)
    },
    calcWeekRects: function (n) {
      var r = this;
      this._rectsLoading = !0, Promise.all([(0, o.NodeRect)("#calendar", this), (0, o.NodeRect)(".wx-calendar-weeks-item", this)]).then(function (t) {
        var a = i(t, 2),
          t = a[0],
          a = a[1],
          e = t[0].left;
        r._rects = a.map(function (t) {
          return t.center = t.left + t.width / 2 - e, t
        }), r._rectsLoading = !1, "function" == typeof n && n()
      }).catch(function (t) {
        console.error("calcWeekRects error: ", t)
      })
    },
    initMonths: function () {
      var e = this,
        t = this._selDay,
        n = t.year,
        r = t.month,
        i = t.day,
        t = Array.apply(null, {
          length: this.data.panels
        }).map(function (t, a) {
          a = r + a - e.data.currTab;
          return e.initMonth({
            year: n,
            month: a,
            day: i
          })
        });
      this.setData({
        months: t
      })
    },
    calendarSwiperEnd: function (t) {
      var a = t.detail,
        t = a.current;
      "touch" == a.source ? t != this.data.currTab && (this.refreshPanel(t), this.bindDateChange(this._selDay)) : (this.changePanel(t), this.bindDateChange(this._selDay))
    },
    refreshPanel: function (t) {
      2 == this.data.currView ? this.refreshWeeksPanel(t, !1, !0) : this.refreshMonthPanel(t)
    },
    refreshMonthPanel: function (r) {
      var i = this,
        s = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
        t = 2 < arguments.length && void 0 !== arguments[2] && arguments[2],
        a = !(3 < arguments.length && void 0 !== arguments[3]) || arguments[3];
      r != this.data.currTab && this.setData({
        currTab: r
      });
      var e = this.data.months[r],
        h = e.year,
        o = e.month,
        n = function (t) {
          for (var a = Math.floor((i.data.panels - 1) / 2), e = 0; e < i.data.panels; e++) {
            var n = (r + a + e + 1) % i.data.panels;
            n == r && !s || (t["months[".concat(n, "]")] = i.initMonth({
              year: h,
              month: o + e - a,
              day: i._selDay.day
            }))
          }
          return t
        }(new Object);
      !s && t && (t = this.getDayWeekIdxInMonth(this._selDay, e.idays), n["months[".concat(r, "].trans")] = this.calcMonthPanelTrans(t, e.days.length)), this.setData(n), a && this.setSelBar()
    },
    changePanel: function (t) {
      2 == this.data.currView ? this.refreshWeeksPanel(this.data.currTab, !1, !0) : this.refreshMonthPanel(t, !1, !0)
    },
    selDate: function (t) {
      var a, e, n, r;
      this._rectsLoading || (a = (e = t.currentTarget.dataset).wdx, n = e.ddx, r = this.data.currTab, e = (t = this.data.months[r]).idays, t = t.month, (n = e[a = 7 * a + n]).year === this._selDay.year && n.month === this._selDay.month && n.day === this._selDay.day || (2 == this.data.currView ? (n.month != t ? this.refreshCurrentWeekPanel(n) : this.setSelDate(a), this.bindDateChange(n, !1)) : "prev" == n.state || "next" == n.state ? (r = "prev" == (this._selDay = n).state ? (r - 1 + this.data.panels) % this.data.panels : (r + 1) % this.data.panels, this.setData({
        currTab: r
      })) : (this.setSelDate(a), this.bindDateChange(n, !1))))
    },
    refreshCurrentWeekPanel: function (t) {
      var a, e = this;
      this.setData((l(a = {}, "months[".concat(this.data.currTab, "]"), this.initWeekMonth(t)), l(a, "monthchange", !0), l(a, "barAnimation", !1), a), function () {
        e._selDay = t, e.setSelBar()
      })
    },
    setSelDate: function (t) {
      var a = this.data.currTab,
        e = this.data.months[a];
      this._selDay = m({}, e.idays[t]);
      var e = Math.floor(t / 7),
        n = l({
          titleInfo: this.titleInfo(this._selDay)
        }, "months[".concat(a, "].bar"), this.initSelBar(t));
      if (e != this._currWeekIdx)
        for (var r = 0; r < this.data.months.length; r++) {
          var i = this.data.months[r],
            s = this._selDay.day <= i.count ? this._selDay.day : i.count,
            s = {
              year: i.year,
              month: i.month,
              day: s
            };
          n["months[".concat(r, "].trans")] = this.calcMonthPanelTrans(this.getDayWeekIdxInMonth(s, i.idays), i.days.length)
        }
      this._currWeekIdx = e, this.setData(n)
    },
    handleSelBarAniEnd: function (t) {
      var a, e = this.data.currTab,
        n = "months[".concat(e, "].bar.a");
      this.setData((l(a = {}, n, !1), l(a, "tdOpShow", !this.data.months[e].bar.t), a)), this.data._vibrate && wx.vibrateShort({
        type: "light"
      })
    },
    toggleView: function (t) {
      t = t.state;
      this._currView = t, this.setData({
        currViewName: 2 == t ? "week" : "month"
      })
    },
    calendarTransEnd: function () {
      var t, a = this,
        e = [1, 3].includes(this._currView) && [1, 3].includes(this.data.currView) || this._currView == this.data.currView;
      this._currView != this.data.currView && (t = {
        currView: this._currView,
        currViewName: 2 == this._currView ? "week" : "month"
      }, 1 == this._currView && (t.yearPanelShow = this._yearPanelShow), this.setData(t)), e || (2 == this._currView ? this.refreshWeeksPanel(this.data.currTab, !1, !1, !1) : this.refreshMonthPanel(this.data.currTab, !1, !1, !1), this.setData({
        titleInfo: this.titleInfo(this._selDay)
      }, function () {
        a.bindViewChange(a._currView)
      }))
    },
    initWeeks: function () {
      var e = this,
        t = this._selDay,
        n = t.year,
        r = t.month,
        i = t.day,
        t = Array.apply(null, {
          length: this.data.panels
        }).map(function (t, a) {
          a = c.default.NormalDate(n, r, i + 7 * (a - e.data.currTab));
          return e.initMonth(a)
        });
      this.setData({
        months: t
      })
    },
    refreshWeeksPanel: function (r) {
      var i = this,
        s = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
        t = !(2 < arguments.length && void 0 !== arguments[2]) || arguments[2],
        a = !(3 < arguments.length && void 0 !== arguments[3]) || arguments[3];
      r != this.data.currTab && this.setData({
        currTab: r
      });
      var a = a ? this.getMonthWeekDay(r) : this._selDay,
        h = a.year,
        o = a.month,
        l = a.day,
        a = function (t) {
          for (var a = Math.floor((i.data.panels - 1) / 2), e = 0; e < i.data.panels; e++) {
            var n = (r + a + e + 1) % i.data.panels;
            n == r && !s || (t["months[".concat(n, "]")] = i.initWeekMonth({
              year: h,
              month: o,
              day: l + 7 * (e - a)
            }))
          }
          return t
        }(new Object);
      a["months[".concat(r, "].wf")] = c.default.WeekFirstDay({
        year: h,
        month: o,
        day: l
      }, this._weekStart), a.weektabchange = this.data.currTab, this.setData(a), t && this.setSelBarForWeek(r)
    },
    handleOpBarTransEnd: function () {
      this.setData({
        solidDay: 2 == this._currView
      })
    },
    toToday: function () {
      this._selDay.year == this._today.year && this._selDay.month == this._today.month && this._selDay.day == this._today.day || this.data.tdOpShow && (this._selDay = this._today, 2 == this.data.currView ? this.handleWeekToDate(this._today) : this.handleMonthToDate(this._today))
    },
    handleWeekToDate: function (a) {
      var e = new Date(a.year, a.month - 1, a.day).getTime(),
        t = this.data.months.findIndex(function (t) {
          var a = new Date(t.wf.year, t.wf.month - 1, t.wf.day).getTime(),
            t = new Date(t.wf.year, t.wf.month - 1, t.wf.day + 7).getTime();
          return a <= e && e < t
        }),
        n = this.data.currTab;
      t === n ? (n = this.data.months[n], a.month != n.month ? this.refreshCurrentWeekPanel(a) : (n = n.idays.findIndex(function (t) {
        return t.month == a.month && t.day == a.day
      }), this.setSelDate(n)), this.bindDateChange(a, !1)) : 0 <= t ? this.setData({
        currTab: t
      }) : (this.refreshWeeksPanelByDate(a), this.bindDateChange(a))
    },
    handleMonthToDate: function (a) {
      var e, t = this.data.months.findIndex(function (t) {
          return t.year == a.year && t.month == a.month
        }),
        n = this.data.currTab;
      n === t ? (n = (e = this.data.months[n]).idays.findIndex(function (t) {
        return t.month == e.month && t.day == a.day
      }), this.setSelDate(n), this.bindDateChange(a, !1)) : 0 <= t ? this.setData({
        currTab: t
      }) : (this.refreshMonthsPanelByDate(a), this.bindDateChange(a))
    },
    refreshMonthsPanelByDate: function (t) {
      var r = this,
        i = t.year,
        s = t.month,
        h = this.data.currTab,
        t = function (t) {
          for (var a = Math.floor((r.data.panels - 1) / 2), e = 0; e < r.data.panels; e++) {
            var n = (h + a + e + 1) % r.data.panels;
            t["months[".concat(n, "]")] = r.initMonth({
              year: i,
              month: s + e - a,
              day: r._selDay.day
            })
          }
          return t
        }(new Object);
      this.setData(t), this.setSelBar()
    },
    refreshWeeksPanelByDate: function (t) {
      var r = this,
        i = t.year,
        s = t.month,
        h = t.day,
        o = this.data.currTab,
        t = function (t) {
          for (var a = Math.floor((r.data.panels - 1) / 2), e = 0; e < r.data.panels; e++) {
            var n = (o + a + e + 1) % r.data.panels;
            t["months[".concat(n, "]")] = r.initWeekMonth({
              year: i,
              month: s,
              day: h + 7 * (e - a)
            })
          }
          return t
        }(new Object);
      t.weektabchange = this.data.currTab, t.monthchange = !0, this.setData(t), this.setSelBarForWeek(o)
    },
    getMonthWeekDay: function (t) {
      var a = this.data.months[t],
        t = (this._selDay.week + 7 - this._weekStart) % 7,
        a = a.wf || c.default.WeekFirstDay(this._selDay, this._weekStart);
      return c.default.NormalDate(a.year, a.month, a.day + t)
    },
    setSelBarForWeek: function (t) {
      var a = this.data.months[t],
        e = (this._selDay.week + 7 - this._weekStart) % 7,
        n = c.default.NormalDate(a.wf.year, a.wf.month, a.wf.day + e),
        e = a.idays.findIndex(function (t) {
          return t.month == n.month && t.day == n.day
        });
      this._selDay = m({}, a.idays[e]), this._currWeekIdx = this.getDayWeekIdxInMonth(this._selDay, a.idays), this.setData(l({
        titleInfo: this.titleInfo(this._selDay)
      }, "months[".concat(t, "].bar"), this.initSelBar(e)), function () {})
    },
    setSelBar: function () {
      var t = this.data.currTab,
        a = this.data.months[t],
        e = this._selDay.day <= a.count ? this._selDay.day : a.count,
        n = a.idays.findIndex(function (t) {
          return t.month == a.month && t.day == e
        });
      this._selDay = m({}, a.idays[n]), this._currWeekIdx = this.getDayWeekIdxInMonth(this._selDay, a.idays), this.setData(l({
        titleInfo: this.titleInfo(this._selDay)
      }, "months[".concat(t, "].bar"), this.initSelBar(n)), function () {})
    },
    initSelBar: function (t) {
      var a = this._rects[t % 7],
        e = this._selDay,
        n = e.today,
        r = e.day,
        i = this.data.months[this.data.currTab].days.length,
        e = Math.floor(t / 7);
      return {
        i: t,
        x: a.center,
        y: "calc(100% / ".concat(i, " * ").concat(e + .5, ")"),
        t: n,
        d: r,
        a: !0,
        s: !0
      }
    },
    initWeekSelBar: function (t, a) {
      var e = this._rects[t % 7],
        n = this._selDay,
        r = n.today,
        i = n.day,
        n = Math.floor(t / 7);
      return {
        i: t,
        x: e.center,
        y: "calc(100% / ".concat(a.length, " * ").concat(n + .5, ")"),
        t: r,
        d: i,
        a: !0,
        s: !0
      }
    },
    initWeekMonth: function (t) {
      var a = c.default.NormalDate(t.year, t.month, t.day),
        n = a.year,
        r = a.month,
        i = a.day,
        e = this.getMonthDays(a),
        s = e.days,
        h = e.count,
        t = this.getMonthWeekDays(n, r, s),
        a = s.findIndex(function (t) {
          var a = t.year,
            e = t.month,
            t = t.day;
          return a === n && e === r && t === i
        }),
        e = s[a],
        a = this.data.showLunar ? {
          lunar_order: e.lunar.lunar_order,
          lunar_year: e.lunar.lunar_year
        } : {};
      return Object.assign({
        key: "m_".concat(n, "_").concat(r),
        year: n,
        month: r,
        count: h,
        idays: s,
        days: t,
        bar: m({}, o.InitBarInfo),
        trans: this.calcMonthPanelTrans(this.getDayWeekIdxInMonth(e, s), t.length),
        wf: c.default.WeekFirstDay(e, this._weekStart)
      }, a)
    },
    initMonth: function (t) {
      var a = c.default.NormalDate(t.year, t.month, 1),
        e = this.getMonthDays(a),
        n = e.days,
        r = e.count,
        i = t.day <= r ? t.day : r,
        s = a.year,
        h = a.month,
        e = n[n.findIndex(function (t) {
          var a = t.year,
            e = t.month,
            t = t.day;
          return a === s && e === h && t === i
        })],
        t = this.getMonthWeekDays(s, h, n),
        a = this.data.showLunar ? {
          lunar_order: e.lunar.lunar_order,
          lunar_year: e.lunar.lunar_year
        } : {};
      return Object.assign({
        key: "m_".concat(s, "_").concat(h),
        year: s,
        month: h,
        count: r,
        idays: n,
        days: t,
        bar: m({}, o.InitBarInfo),
        trans: this.calcMonthPanelTrans(this.getDayWeekIdxInMonth(e, n), t.length),
        wf: c.default.WeekFirstDay(e, this._weekStart)
      }, a)
    },
    getMonthDays: function (t) {
      var a = t.year,
        t = t.month;
      return this._handler.suppleMonth(a, t)
    },
    getMonthWeekDays: function (a, n, r) {
      return Array.apply(null, {
        length: r.length / 7
      }).map(function (t, e) {
        return {
          key: "w_".concat(a, "_").concat(n, "_").concat(e + 1),
          days: Array.apply(null, {
            length: 7
          }).map(function (t, a) {
            return r[7 * e + a]
          })
        }
      })
    },
    calcMonthPanelTrans: function (t, a) {
      var e = this.data.panelHeight / 5,
        n = 5 == a ? e : this.data.panelHeight / a;
      return Math.floor(10 * (t * n - (5 == a ? 0 : (e - n) / 2))) / 10
    },
    getDayWeekIdxInMonth: function (t, a) {
      var e = t.month,
        n = t.day,
        a = a.findIndex(function (t) {
          var a = t.month,
            t = t.day;
          return e === a && n === t
        });
      return Math.floor(a / 7)
    },
    titleInfo: function (t) {
      var a = (a = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : null) || this._today,
        e = "第".concat(c.default.WeekOrder(t), "周");
      if (t.year == a.year && t.month == a.month && t.day == a.day) return (2 == this._currView ? "".concat(e, "  周") : "周").concat(t.week_name);
      t = c.default.DateDiff(a, t), e = 2 == this._currView ? "".concat(e, "  ") : "";
      return "".concat(e).concat(Math.abs(t), "天").concat(t < 0 ? "前" : "后")
    },
    yearsSwiperAniEnd: function (t) {
      var a = this,
        t = t.detail,
        e = t.current,
        t = t.source,
        n = this.data.yearMs[e].year;
      "touch" == t ? e != this.data.currYearsTab && this.setData({
        currYearsTab: e
      }, function () {
        a.refreshYearMs(n, e)
      }) : this.refreshYearMs(n, e)
    },
    setYearMs: function (t, n) {
      var r = this,
        i = t.year,
        e = function (t) {
          for (var a = Math.floor((r.data.panels - 1) / 2), e = 0; e < r.data.panels; e++) t[(n + a + e + 1) % r.data.panels] = i + e - a;
          return t
        }(Array.apply(null, {
          length: this.data.panels
        }));
      return Array.apply(null, {
        length: this.data.panels
      }).map(function (t, a) {
        return r.getYearMonth(e[a])
      })
    },
    refreshYearMs: function (r, i) {
      var s = this,
        t = function (t) {
          for (var a = Math.floor((s.data.panels - 1) / 2), e = 0; e < s.data.panels; e++) {
            var n = (i + a + e + 1) % s.data.panels;
            n != i && (t["yearMs[".concat(n, "]")] = s.getYearMonth(r + e - a))
          }
          return t
        }(new Object);
      this.setData(t)
    },
    getYearMonth: function (e) {
      var n = this,
        t = this._today,
        r = t.year,
        i = t.month;
      return {
        year: e,
        lunar_year: this.data.showLunar ? this._handler.date({
          year: e,
          month: 6,
          day: 1
        }).lunar.lunar_year : null,
        key: "yp_".concat(e),
        months: Array.apply(null, {
          length: 12
        }).map(function (t, a) {
          a += 1;
          return {
            month: a,
            curr: r == e && i == a,
            lunar: n.data.showLunar ? n.getMonthLunarMonthFirst(e, a) : null
          }
        })
      }
    },
    getMonthLunarMonthFirst: function (n, r) {
      return this._handler.month(n, r).filter(function (t) {
        return 1 == t.lunar.ld
      }).map(function (t, a) {
        var e = t.day,
          t = t.lunar;
        return {
          key: "yml_".concat(n, "_").concat(r, "_").concat(a),
          day: e,
          lunar: t.lunar_month,
          order: 3 < e ? o.EnOrders[4] : o.EnOrders[e]
        }
      })
    },
    justYearPanelShow: function () {
      this._yearPanelShow = !0, this.setData({
        yearPanelShow: !0
      })
    },
    handleYearPanelShow: function () {
      this._yearPanelShow = !0
    },
    handleYearsMonthSel: function (t) {
      var a = t.currentTarget.dataset,
        e = a.year,
        t = a.month,
        a = this.data.currTab,
        a = this.data.months[a];
      a.year == e && a.month == t ? (this._yearPanelShow = !1, this.setData({
        yearPanelShow: !1
      })) : (this._yearPanelShow = !1, this.setData({
        yearPanelShow: !1
      }), this.refreshMonthsPanelByDate({
        year: e,
        month: t,
        day: 1
      }), this.bindDateChange(this._selDay))
    },
    initMarkers: function () {
      var t, a = {},
        e = f(this.data._markers);
      try {
        for (e.s(); !(t = e.n()).done;) {
          var n, r, i, s = t.value,
            h = s.year,
            o = s.month,
            l = s.day,
            c = s.type,
            d = s.mark,
            u = s.color,
            y = s.bgColor;
          ["holiday", "corner", "schedule"].includes(c) && ((r = a[n = "".concat(h, "_").concat(o, "_").concat(l)] ? m({}, a[n]) : {})[c] = r[c] || [], i = "corner" == c ? d.substring(0, 2) : d, r[c].push({
            mark: i,
            color: u,
            bgColor: y
          }), a[n] = r)
        }
      } catch (t) {
        e.e(t)
      } finally {
        e.f()
      }
      return a
    },
    refreshPanelDays: function () {
      var t, i = this;
      this.data.loading || (t = function (t) {
        for (var a = 0; a < i.data.months.length; a++) {
          var e = i.data.months[a],
            n = e.year,
            r = e.month,
            e = i._handler.suppleMonth(n, r).days;
          t["months[".concat(a, "].idays")] = e, t["months[".concat(a, "].days")] = i.getMonthWeekDays(n, r, e)
        }
        return t
      }(new Object), this.setData(t))
    },
    getDateInfo: function () {
      var t = c.default.CorrectDate.apply(c.default, arguments);
      return t ? this._handler.date(t) : null
    },
    calendarToDate: function () {
      var t = c.default.CorrectDate.apply(c.default, arguments);
      t && (this._selDay = this._handler.date(t), 2 == this.data.currView ? this.handleWeekToDate(this._selDay) : this.handleMonthToDate(this._selDay))
    },
    calendarToMonth: function (t, a) {
      a = c.default.CorrectDate(t, a, 1);
      a && (this._selDay = this._handler.date(a), 2 == this.data.currView ? this.handleWeekToDate(this._selDay) : this.handleMonthToDate(this._selDay))
    },
    switchCalendarView: function (t) {
      this.setData({
        viewchange: t = "month" != (t = t || "month") && "week" != t ? "month" : t
      })
    },
    calendarPrev: function () {
      var t = (this.data.currTab - 1 + this.data.panels) % this.data.panels;
      this.refreshPanel(t)
    },
    calendarNext: function () {
      var t = (this.data.currTab + 1) % this.data.panels;
      this.refreshPanel(t)
    },
    reloadPos: function () {
      var e = this;
      return new Promise(function (t, a) {
        e.calcWeekRects().then(function () {
          e.setSelBar(), t()
        }).catch(function (t) {
          a(t)
        })
      })
    },
    bindLoad: function () {
      var r = this,
        t = {
          loading: !1
        };
      2 == this._currView && (t.needInitTrans = !0);
      var i = 2 == this._currView ? "week" : "month";
      this.setData(t, function () {
        (0, o.EchoInfo)("欢迎到%chttps://github.com/lspriv/wx-calendar/issues%c提出建议或Bug或✭", "info", "font-weight:bold;margin: 0 2px;", "color: #8cc5ff");
        var t = r.rangeDetail(),
          a = t.range,
          e = t.visual,
          n = r.data.months[r.data.currTab],
          t = n.year,
          n = n.month;
        r.triggerEvent("load", {
          date: r._selDay,
          view: i,
          range: a,
          visual: e,
          visualMonth: {
            year: t,
            month: n
          }
        })
      })
    },
    bindDateChange: function (t) {
      var a = !(1 < arguments.length && void 0 !== arguments[1]) || arguments[1],
        e = 2 == this._currView ? "week" : "month",
        n = this.rangeDetail(),
        r = n.range,
        i = n.visual,
        s = this.data.months[this.data.currTab],
        n = s.year,
        s = s.month;
      this.triggerEvent("datechange", {
        date: t,
        view: e,
        range: r,
        visual: i,
        visualMonth: {
          year: n,
          month: s
        },
        rangeChange: a
      })
    },
    bindViewChange: function (t) {
      this.triggerEvent("viewchange", {
        view: 2 == t ? "week" : "month"
      })
    },
    bindRangeChange: function () {
      var t = this.rangeDetail();
      this.triggerEvent("rangechange", t)
    },
    rangeDetail: function () {
      var t = this.data.currTab,
        a = Math.floor((this.data.panels - 1) / 2),
        e = this.data.months[(t + this.data.panels - a) % this.data.panels],
        a = this.data.months[(t + a) % 5];
      return m(m({}, 2 == this._currView ? this.rangeWeekDetail(e, a) : this.rangeMonthDetail(e, a)), {}, {
        curr: this._selDay
      })
    },
    rangeWeekDetail: function (t, a) {
      t = [c.default.NormalDate(t.wf.year, t.wf.month, t.wf.day), c.default.NormalDate(a.wf.year, a.wf.month, a.wf.day + 6)], a = this.data.months[this.data.currTab];
      return {
        range: t,
        visual: [c.default.NormalDate(a.wf.year, a.wf.month, a.wf.day), c.default.NormalDate(a.wf.year, a.wf.month, a.wf.day + 6)]
      }
    },
    rangeMonthDetail: function (t, a) {
      var e = t.idays[0],
        t = a.idays[a.idays.length - 1],
        a = [c.default.NormalDate(e.year, e.month, e.day), c.default.NormalDate(t.year, t.month, t.day)],
        e = this.data.months[this.data.currTab],
        t = e.idays[0],
        e = e.idays[e.idays.length - 1];
      return {
        range: a,
        visual: [{
          year: t.year,
          month: t.month,
          day: t.day
        }, {
          year: e.year,
          month: e.month,
          day: e.day
        }]
      }
    }
  },
  observers: {
    _markers: function (t) {
      this.data.showMark && (this.data.loading || (this._dateMarkers = this.initMarkers(), this.refreshPanelDays()))
    }
  },
  export: function () {
    if (this.data.loading) return (0, o.EchoInfo)("请在bindload回调后执行selectComponent", "warn"), null;
    var t = this.data,
      a = t.minHeight,
      e = t.maxHeight,
      t = t.calendarHeight,
      n = this;
    return {
      name: "wx-calendar",
      version: y,
      minHeight: a,
      maxHeight: e,
      height: t,
      getDateInfo: function () {
        return n.getDateInfo.apply(n, arguments)
      },
      reloadMarkers: function () {
        n.initMarkers()
      },
      toDate: function () {
        n.calendarToDate.apply(n, arguments)
      },
      toMonth: function () {
        var t = Array.prototype.slice.call(arguments),
          a = t[0],
          t = t[1];
        n.calendarToMonth(a, t)
      },
      toggleView: function () {
        n.switchCalendarView(arguments[0])
      },
      prev: function () {
        n.calendarPrev()
      },
      next: function () {
        n.calendarNext()
      },
      reloadPos: function () {
        return n.reloadPos()
      }
    }
  }
});
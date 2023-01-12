"use strict";

function a(e, n) {
  if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function")
}

function t(e, n) {
  for (var r = 0; r < n.length; r++) {
    var a = n[r];
    a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(e, a.key, a)
  }
}

function e(e, n, r) {
  return n && t(e.prototype, n), r && t(e, r), e
}

function n(e, n, r) {
  return n in e ? Object.defineProperty(e, n, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[n] = r, e
}
var i = function () {
  function g(e, n, r) {
    a(this, g), this.setGregorian(e, n, r)
  }
  return e(g, [{
    key: "setGregorian",
    value: function (e) {
      var n = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 1,
        r = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 1;
      this.gregorianYear = e, this.gregorianMonth = n, this.gregorianDate = r, this.isGregorianLeap = g.isGregorianLeapYear(e), this.dayOfYear = g.dayOfYear(e, n, r), this.dayOfWeek = g.dayOfWeek(e, n, r), this.reviseInfo = g.checkSolarTerm(e, n, r), this.computeChineseFields(), this.computeSolarTerms()
    }
  }, {
    key: "getReviseInfo",
    value: function () {
      return this.reviseInfo
    }
  }, {
    key: "computeChineseFields",
    value: function () {
      if (this.gregorianYear < 1901 || 2100 < this.gregorianYear) return 1;
      var e = g.BaseDate,
        n = e.year,
        r = e.month,
        a = e.day,
        t = e.chineseYear,
        i = e.chineseMonth,
        s = e.chineseDate,
        e = n,
        r = r,
        a = a;
      this.chineseYear = t, this.chineseMonth = i, this.chineseDate = s, 2e3 <= this.gregorianYear && (e = n + 99, a = r = 1, this.chineseYear = t + 99, this.chineseMonth = 11, this.chineseDate = 25);
      for (var h = 0, o = e; o < this.gregorianYear; o++) h += 365, g.isGregorianLeapYear(o) && (h += 1);
      for (var c = r; c < this.gregorianMonth; c++) h += g.daysInGregorianMonth(this.gregorianYear, c);
      h += this.gregorianDate - a, this.chineseDate += h;
      for (var u = g.daysInChineseMonth(this.chineseYear, this.chineseMonth), l = g.nextChineseMonth(this.chineseYear, this.chineseMonth); this.chineseDate > u;) Math.abs(l) < Math.abs(this.chineseMonth) && this.chineseYear++, this.chineseMonth = l, this.chineseDate -= u, u = g.daysInChineseMonth(this.chineseYear, this.chineseMonth), l = g.nextChineseMonth(this.chineseYear, this.chineseMonth);
      return 0
    }
  }, {
    key: "computeSolarTerms",
    value: function () {
      return this.gregorianYear < 1901 || 2100 < this.gregorianYear ? 1 : (this.sectionalTerm = g.sectionalTerm(this.gregorianYear, this.gregorianMonth), this.principleTerm = g.principleTerm(this.gregorianYear, this.gregorianMonth), 0)
    }
  }, {
    key: "getLunarDate",
    value: function () {
      var e = "",
        n = "",
        r = g.lunarDay(this.chineseDate);
      return this.reviseInfo.correct ? this.gregorianDate == this.sectionalTerm ? (e = g.SectionalTermNames[this.gregorianMonth - 1], n = "solar") : this.gregorianDate == this.principleTerm ? (e = g.PrincipleTermNames[this.gregorianMonth - 1], n = "solar") : e = 1 == this.chineseDate && 0 < this.chineseMonth ? g.LunarMonths[this.chineseMonth - 1] + "月" : 1 == this.chineseDate && this.chineseMonth < 0 ? "闰" + g.LunarMonths[-this.chineseMonth - 1] + "月" : r : "wroung" == this.reviseInfo.type ? e = 1 == this.chineseDate && 0 < this.chineseMonth ? g.LunarMonths[this.chineseMonth - 1] + "月" : 1 == this.chineseDate && this.chineseMonth < 0 ? "闰" + g.LunarMonths[-this.chineseMonth - 1] + "月" : r : (e = this.reviseInfo.solar, n = "solar"), {
        year: this.gregorianYear,
        month: this.gregorianMonth,
        day: this.gregorianDate,
        lunar_order: this.chineseYear,
        lunar_year: g.lunarYear(this.chineseYear),
        lunar_month: g.lunarMonth(this.chineseMonth),
        lunar_day: e,
        lunar_date: r,
        lunar_type: n,
        lm: this.chineseMonth,
        ld: this.chineseDate
      }
    }
  }]), g
}();
n(i, "ChineseCalendars", [0, 4, 173, 8, 90, 1, 213, 84, 180, 9, 100, 5, 89, 69, 149, 10, 166, 4, 85, 36, 173, 8, 90, 98, 218, 4, 180, 5, 180, 85, 82, 13, 148, 10, 74, 42, 86, 2, 109, 113, 109, 1, 218, 2, 210, 82, 169, 5, 73, 13, 42, 69, 43, 9, 86, 1, 181, 32, 109, 1, 89, 105, 212, 10, 168, 5, 169, 86, 165, 4, 43, 9, 158, 56, 182, 8, 236, 116, 108, 5, 212, 10, 228, 106, 82, 5, 149, 10, 90, 66, 91, 4, 182, 4, 180, 34, 106, 5, 82, 117, 201, 10, 82, 5, 53, 85, 77, 10, 90, 2, 93, 49, 181, 2, 106, 138, 104, 5, 169, 10, 138, 106, 42, 5, 45, 9, 170, 72, 90, 1, 181, 9, 176, 57, 100, 5, 37, 117, 149, 10, 150, 4, 77, 84, 173, 4, 218, 4, 212, 68, 180, 5, 84, 133, 82, 13, 146, 10, 86, 106, 86, 2, 109, 2, 106, 65, 218, 2, 178, 161, 169, 5, 73, 13, 10, 109, 42, 9, 86, 1, 173, 80, 109, 1, 217, 2, 209, 58, 168, 5, 41, 133, 165, 12, 42, 9, 150, 84, 182, 8, 108, 9, 100, 69, 212, 10, 164, 5, 81, 37, 149, 10, 42, 114, 91, 4, 182, 4, 172, 82, 106, 5, 210, 10, 162, 74, 74, 5, 85, 148, 45, 10, 90, 2, 117, 97, 181, 2, 106, 3, 97, 69, 169, 10, 74, 5, 37, 37, 45, 9, 154, 104, 218, 8, 180, 9, 168, 89, 84, 3, 165, 10, 145, 58, 150, 4, 173, 176, 173, 4, 218, 4, 244, 98, 180, 5, 84, 11, 68, 93, 82, 10, 149, 4, 85, 34, 109, 2, 90, 113, 218, 2, 170, 5, 178, 85, 73, 11, 74, 10, 45, 57, 54, 1, 109, 128, 109, 1, 217, 2, 233, 106, 168, 5, 41, 11, 154, 76, 170, 8, 182, 8, 180, 56, 108, 9, 84, 117, 212, 10, 164, 5, 69, 85, 149, 10, 154, 4, 85, 68, 181, 4, 106, 130, 106, 5, 210, 10, 146, 106, 74, 5, 85, 10, 42, 74, 90, 2, 181, 2, 178, 49, 105, 3, 49, 115, 169, 10, 74, 5, 45, 85, 45, 9, 90, 1, 213, 72, 180, 9, 104, 137, 84, 11, 164, 10, 165, 106, 149, 4, 173, 8, 106, 68, 218, 4, 116, 5, 176, 37, 84, 3]), n(i, "BigLeapMonthYears", [6, 14, 19, 25, 33, 36, 38, 41, 44, 52, 55, 79, 117, 136, 147, 150, 155, 158, 185, 193]), n(i, "DaysInGregorianMonths", [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]), n(i, "SectionalTermMap", [
  [7, 6, 6, 6, 6, 6, 6, 6, 6, 5, 6, 6, 6, 5, 5, 6, 6, 5, 5, 5, 5, 5, 5, 5, 5, 4, 5, 5],
  [5, 4, 5, 5, 5, 4, 4, 5, 5, 4, 4, 4, 4, 4, 4, 4, 4, 3, 4, 4, 4, 3, 3, 4, 4, 3, 3, 3],
  [6, 6, 6, 7, 6, 6, 6, 6, 5, 6, 6, 6, 5, 5, 6, 6, 5, 5, 5, 6, 5, 5, 5, 5, 4, 5, 5, 5, 5],
  [5, 5, 6, 6, 5, 5, 5, 6, 5, 5, 5, 5, 4, 5, 5, 5, 4, 4, 5, 5, 4, 4, 4, 5, 4, 4, 4, 4, 5],
  [6, 6, 6, 7, 6, 6, 6, 6, 5, 6, 6, 6, 5, 5, 6, 6, 5, 5, 5, 6, 5, 5, 5, 5, 4, 5, 5, 5, 5],
  [6, 6, 7, 7, 6, 6, 6, 7, 6, 6, 6, 6, 5, 6, 6, 6, 5, 5, 6, 6, 5, 5, 5, 6, 5, 5, 5, 5, 4, 5, 5, 5, 5],
  [7, 8, 8, 8, 7, 7, 8, 8, 7, 7, 7, 8, 7, 7, 7, 7, 6, 7, 7, 7, 6, 6, 7, 7, 6, 6, 6, 7, 7],
  [8, 8, 8, 9, 8, 8, 8, 8, 7, 8, 8, 8, 7, 7, 8, 8, 7, 7, 7, 8, 7, 7, 7, 7, 6, 7, 7, 7, 6, 6, 7, 7, 7],
  [8, 8, 8, 9, 8, 8, 8, 8, 7, 8, 8, 8, 7, 7, 8, 8, 7, 7, 7, 8, 7, 7, 7, 7, 6, 7, 7, 7, 7],
  [9, 9, 9, 9, 8, 9, 9, 9, 8, 8, 9, 9, 8, 8, 8, 9, 8, 8, 8, 8, 7, 8, 8, 8, 7, 7, 8, 8, 8],
  [8, 8, 8, 8, 7, 8, 8, 8, 7, 7, 8, 8, 7, 7, 7, 8, 7, 7, 7, 7, 6, 7, 7, 7, 6, 6, 7, 7, 7],
  [7, 8, 8, 8, 7, 7, 8, 8, 7, 7, 7, 8, 7, 7, 7, 7, 6, 7, 7, 7, 6, 6, 7, 7, 6, 6, 6, 7, 7]
]), n(i, "SectionalTermYear", [
  [13, 49, 85, 117, 149, 185, 201, 250, 250],
  [13, 45, 81, 117, 149, 185, 201, 250, 250],
  [13, 48, 84, 112, 148, 184, 200, 201, 250],
  [13, 45, 76, 108, 140, 172, 200, 201, 250],
  [13, 44, 72, 104, 132, 168, 200, 201, 250],
  [5, 33, 68, 96, 124, 152, 188, 200, 201],
  [29, 57, 85, 120, 148, 176, 200, 201, 250],
  [13, 48, 76, 104, 132, 168, 196, 200, 201],
  [25, 60, 88, 120, 148, 184, 200, 201, 250],
  [16, 44, 76, 108, 144, 172, 200, 201, 250],
  [28, 60, 92, 124, 160, 192, 200, 201, 250],
  [17, 53, 85, 124, 156, 188, 200, 201, 250]
]), n(i, "PrincipleTermMap", [
  [21, 21, 21, 21, 21, 20, 21, 21, 21, 20, 20, 21, 21, 20, 20, 20, 20, 20, 20, 20, 20, 19, 20, 20, 20, 19, 19, 20],
  [20, 19, 19, 20, 20, 19, 19, 19, 19, 19, 19, 19, 19, 18, 19, 19, 19, 18, 18, 19, 19, 18, 18, 18, 18, 18, 18, 18],
  [21, 21, 21, 22, 21, 21, 21, 21, 20, 21, 21, 21, 20, 20, 21, 21, 20, 20, 20, 21, 20, 20, 20, 20, 19, 20, 20, 20, 20],
  [20, 21, 21, 21, 20, 20, 21, 21, 20, 20, 20, 21, 20, 20, 20, 20, 19, 20, 20, 20, 19, 19, 20, 20, 19, 19, 19, 20, 20],
  [21, 22, 22, 22, 21, 21, 22, 22, 21, 21, 21, 22, 21, 21, 21, 21, 20, 21, 21, 21, 20, 20, 21, 21, 20, 20, 20, 21, 21],
  [22, 22, 22, 22, 21, 22, 22, 22, 21, 21, 22, 22, 21, 21, 21, 22, 21, 21, 21, 21, 20, 21, 21, 21, 20, 20, 21, 21, 21],
  [23, 23, 24, 24, 23, 23, 23, 24, 23, 23, 23, 23, 22, 23, 23, 23, 22, 22, 23, 23, 22, 22, 22, 23, 22, 22, 22, 22, 23],
  [23, 24, 24, 24, 23, 23, 24, 24, 23, 23, 23, 24, 23, 23, 23, 23, 22, 23, 23, 23, 22, 22, 23, 23, 22, 22, 22, 23, 23],
  [23, 24, 24, 24, 23, 23, 24, 24, 23, 23, 23, 24, 23, 23, 23, 23, 22, 23, 23, 23, 22, 22, 23, 23, 22, 22, 22, 23, 23],
  [24, 24, 24, 24, 23, 24, 24, 24, 23, 23, 24, 24, 23, 23, 23, 24, 23, 23, 23, 23, 22, 23, 23, 23, 22, 22, 23, 23, 23],
  [23, 23, 23, 23, 22, 23, 23, 23, 22, 22, 23, 23, 22, 22, 22, 23, 22, 22, 22, 22, 21, 22, 22, 22, 21, 21, 22, 22, 22],
  [22, 22, 23, 23, 22, 22, 22, 23, 22, 22, 22, 22, 21, 22, 22, 22, 21, 21, 22, 22, 21, 21, 21, 22, 21, 21, 21, 21, 22]
]), n(i, "PrincipleTermYear", [
  [13, 45, 81, 113, 149, 185, 201],
  [21, 57, 93, 125, 161, 193, 201],
  [21, 56, 88, 120, 152, 188, 200, 201],
  [21, 49, 81, 116, 144, 176, 200, 201],
  [17, 49, 77, 112, 140, 168, 200, 201],
  [28, 60, 88, 116, 148, 180, 200, 201],
  [25, 53, 84, 112, 144, 172, 200, 201],
  [29, 57, 89, 120, 148, 180, 200, 201],
  [17, 45, 73, 108, 140, 168, 200, 201],
  [28, 60, 92, 124, 160, 192, 200, 201],
  [16, 44, 80, 112, 148, 180, 200, 201],
  [17, 53, 88, 120, 156, 188, 200, 201]
]), n(i, "StemNames", "甲乙丙丁戊己庚辛壬癸"), n(i, "BranchNames", "子丑寅卯辰巳午未申酉戌亥"), n(i, "ZodiacSigns", "鼠牛虎兔龙蛇马羊猴鸡狗猪"), n(i, "LunarMonths", "正二三四五六七八九十冬腊"), n(i, "PrincipleTermNames", ["大寒", "雨水", "春分", "谷雨", "小满", "夏至", "大暑", "处暑", "秋分", "霜降", "小雪", "冬至"]), n(i, "SectionalTermNames", ["小寒", "立春", "惊蛰", "清明", "立夏", "芒种", "小暑", "立秋", "白露", "寒露", "立冬", "大雪"]), n(i, "ChineseNums", "十一二三四五六七八九十"), n(i, "LunarMinDate", new Date(1901, 0, 1).getTime()), n(i, "LunarMaxDate", new Date(2100, 0, 1).getTime()), n(i, "BaseDate", {
  year: 1901,
  month: 1,
  day: 1,
  index: 0,
  chineseYear: 4597,
  chineseMonth: 11,
  chineseDate: 11
}), n(i, "SolarTermRevises", [{
  solar: i.SectionalTermNames[2],
  year: 2014,
  month: 3,
  wrong: 5,
  correct: 6
}, {
  solar: i.PrincipleTermNames[2],
  year: 2051,
  month: 3,
  wrong: 21,
  correct: 20
}, {
  solar: i.SectionalTermNames[1],
  year: 2083,
  month: 2,
  wrong: 4,
  correct: 3
}, {
  solar: i.PrincipleTermNames[2],
  year: 2084,
  month: 3,
  wrong: 20,
  correct: 19
}, {
  solar: i.SectionalTermNames[5],
  year: 2094,
  month: 6,
  wrong: 6,
  correct: 5
}]), n(i, "isGregorianLeapYear", function (e) {
  return e % 100 != 0 && e % 4 == 0 || e % 400 == 0
}), n(i, "daysInGregorianMonth", function (e, n) {
  var r = i.DaysInGregorianMonths[n - 1];
  return 2 == n && i.isGregorianLeapYear(e) ? r + 1 : r
}), n(i, "dayOfYear", function (e, n, r) {
  for (var a = 0, t = 1; t < n; t++) a += i.daysInGregorianMonth(e, t);
  return a += r
}), n(i, "dayOfWeek", function (e, n, r) {
  var a = 1,
    t = ((e = (e - 1) % 400 + 1) - 1) / 4;
  t -= (e - 1) / 100;
  a = 1 + (e - 1 - (t += (e - 1) / 400));
  return a += 2 * t, a = ((a += i.dayOfYear(e, n, r)) - 1) % 7 + 1
}), n(i, "daysInChineseMonth", function (e, n) {
  var r = e - i.BaseDate.chineseYear + i.BaseDate.index,
    a = 30;
  if (1 <= n && n <= 8) 1 == (i.ChineseCalendars[2 * r] >> n - 1 & 1) && (a = 29);
  else if (9 <= n && n <= 12) 1 == (i.ChineseCalendars[2 * r + 1] >> n - 9 & 1) && (a = 29);
  else if ((i.ChineseCalendars[2 * r + 1] >> 4 & 15) != Math.abs(n)) a = 0;
  else
    for (var a = 29, t = 0; t < i.BigLeapMonthYears.length; t++)
      if (i.BigLeapMonthYears[t] == r) {
        a = 30;
        break
      } return a
}), n(i, "nextChineseMonth", function (e, n) {
  var r = Math.abs(n) + 1;
  return 0 < n && (e = e - i.BaseDate.chineseYear + i.BaseDate.index, (i.ChineseCalendars[2 * e + 1] >> 4 & 15) == n && (r = -n)), r = 13 == r ? 1 : r
}), n(i, "sectionalTerm", function (e, n) {
  if (e < 1901 || 2100 < e) return 0;
  for (var r = 0, a = e - i.BaseDate.year + 1; a >= i.SectionalTermYear[n - 1][r];) r++;
  return i.SectionalTermMap[n - 1][4 * r + a % 4]
}), n(i, "principleTerm", function (e, n) {
  if (e < 1901 || 2100 < e) return 0;
  for (var r = 0, a = e - i.BaseDate.year + 1; a >= i.PrincipleTermYear[n - 1][r];) r++;
  return i.PrincipleTermMap[n - 1][4 * r + a % 4]
}), n(i, "checkSolarTerm", function (n, e, r) {
  var a = i.SolarTermRevises.filter(function (e) {
    return e.year == n
  });
  if (0 < a.length && (a = a[0]).month == e) {
    if (a.wrong == r) return {
      correct: !1,
      type: "wroung"
    };
    if (a.correct == r) return {
      correct: !1,
      type: "revise",
      solar: a.solar
    }
  }
  return {
    correct: !0
  }
}), n(i, "lunarYear", function (e) {
  return i.StemNames[(e - 1) % 10] + i.BranchNames[(e - 1) % 12] + i.ZodiacSigns[(e - 1) % 12] + "年"
}), n(i, "lunarMonth", function (e) {
  return 0 < e ? "".concat(i.LunarMonths[e - 1], "月") : "闰".concat(i.LunarMonths[-e - 1], "月")
}), n(i, "lunarDay", function (e) {
  return e < 1 || 30 < e ? "" : e <= 10 ? "初".concat(i.ChineseNums[e]) : e < 20 ? "十".concat(i.ChineseNums[e % 10]) : 20 == e ? "二十" : e < 30 ? "廿".concat(i.ChineseNums[e % 10]) : "三十"
}), n(i, "isOverDate", function (e) {
  e = e.getTime();
  return e < i.LunarMinDate || e >= i.LunarMaxDate
}), n(i, "lunar", function (e, n, r) {
  return new i(e, n, r).getLunarDate()
}), module.exports = i;
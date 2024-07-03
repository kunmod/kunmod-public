"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LauncherLog = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  levelTrace = { [0]: !0, 1: !1, 2: !1, 3: !1 },
  levelName = { [0]: "E", 1: "W", 2: "I", 3: "D" },
  logProxy = {
    [0]: puerts_1.logger.error,
    1: puerts_1.logger.warn,
    2: puerts_1.logger.info,
    3: puerts_1.logger.log,
  },
  DEFAULT_SKIP_INDEX = 3;
class LauncherLog {
    static ErrorNotice = true;
  static SetJsDebugId(r) {
    r && 0 < r.length && (LauncherLog.U8 = `(${r})`);
  }
  static SetLevel(r) {
    LauncherLog.B8 = r;
  }
  static CheckError() {
    return 0 <= LauncherLog.B8;
  }
  static CheckWarn() {
    return 1 <= LauncherLog.B8;
  }
  static CheckInfo() {
    return 2 <= LauncherLog.B8;
  }
  static CheckDebug() {
    return 3 <= LauncherLog.B8;
  }
  static Error(r, ...e) {
    LauncherLog.b8(0, r, e, levelTrace[0]);
  }
  static ErrorWithStack(r, e, ...t) {
    LauncherLog.b8(0, r, t, levelTrace[0], e);
  }
  static Warn(r, ...e) {
    LauncherLog.b8(1, r, e, levelTrace[1]);
  }
  static Info(r, ...e) {
    LauncherLog.b8(2, r, e, levelTrace[2]);
  }
  static Debug(r, ...e) {
    LauncherLog.b8(3, r, e, levelTrace[3]);
  }
  static b8(t, n, a, o, c) {
    return;
    if (((LauncherLog.o6 += 1), !(t > LauncherLog.B8))) {
      let r =
        `[${LauncherLog.o6}][${levelName[t]}][Launcher][${LauncherLog.ke()}] ` +
        n;
      if (0 < a.length) {
        r += " ";
        for (const u of a) r += `[${u[0]}: ${LauncherLog.G8(u[1])}]`;
      }
      let e = void 0;
      (e = o ? LauncherLog.N8(c, c ? 0 : DEFAULT_SKIP_INDEX) : e) &&
        (r = (r += "\n") + e),
        logProxy[t](r);
    }
  }
  static ke() {
    var r = new Date();
    return (
      `${r.getHours()}.${r.getMinutes()}.${r.getSeconds()}:` +
      r.getMilliseconds()
    );
  }
  static O8(r) {
    try {
      return JSON.stringify(r, (r, e) => {
        if (void 0 === e) return "undefined";
        if (null === e) return "null";
        var t = typeof e;
        if ("bigint" == t) return e.toString() + "n";
        if ("function" == t) return e.toString();
        if ("function" == typeof e.ToString) return e.ToString();
        if (e instanceof Set) {
          let r = "";
          for (const n of e)
            0 === r.length ? (r += "Set(") : (r += ","),
              (r += JSON.stringify(n));
          return (r += ")");
        }
        if (e instanceof Map) {
          let r = "";
          for (const a of e)
            0 === r.length ? (r += "Map(") : (r += ","),
              (r += `[${JSON.stringify(a[0])}, ${JSON.stringify(a[1])}]`);
          return (r += ")");
        }
        return e;
      });
    } catch (r) {
      r instanceof Error
        ? LauncherLog.ErrorWithStack("Log 序列化异常", r, ["error", r.message])
        : LauncherLog.Error("Log 序列化异常", ["error", r]);
    }
  }
  static G8(r) {
    return void 0 === r
      ? "undefined"
      : null === r
      ? "null"
      : "string" == typeof r
      ? r
      : LauncherLog.k8 && "object" == typeof r
      ? LauncherLog.O8(r) ?? ""
      : r.toString();
  }
  static N8(n, a) {
    var r = Error.prepareStackTrace;
    Error.prepareStackTrace = LauncherLog.F8;
    let o = void 0;
    if (
      (n
        ? (o = n.stack)
        : (Error.captureStackTrace(LauncherLog.V8, LauncherLog.N8),
          (o = LauncherLog.V8.stack),
          (LauncherLog.V8.stack = void 0)),
      (Error.prepareStackTrace = r),
      o && Array.isArray(o))
    ) {
      let e = "",
        t = "";
      for (let r = a; r < o.length; ++r) {
        var c,
          u,
          L,
          i,
          g = o[r];
        g &&
          ((c =
            ((c = g.getTypeName()) ? c + "." : "") +
            (g.getFunctionName() ?? "")),
          (i = g.getFileName() ?? void 0),
          (u = g.getLineNumber() ?? -1),
          (g = g.getColumnNumber() ?? -1),
          (L = LauncherLog.H8(i, "JavaScript", 1)),
          (e += `	${c} (${L}:${u}:${g})
`),
          puerts_1.convertSourceMap) &&
          i &&
          0 !== i.length &&
          ((L = (0, puerts_1.convertSourceMap)(i + ".map", u, g))
            ? ((i = LauncherLog.H8(L.source, "Src", 1)),
              (t += `	${c} (${i}:${L.line}:${L.column})
`))
            : (t += "\tconvert source map fail\n"));
      }
      let r = `JS 堆栈 ${LauncherLog.U8}:
`;
      return (
        (r += e),
        0 < t.length && (r = (r += "TS 堆栈:a\n") + t),
        (r =
          UE.KuroStaticLibrary.GetBlueprintCallstack &&
          (n = UE.KuroStaticLibrary.GetBlueprintCallstack()) &&
          0 < n.length
            ? r + "BP 堆栈:\n" + n
            : r)
      );
    }
  }
  static H8(r, e, t) {
    var n;
    return r && 0 !== r.length
      ? 0 < (n = r.indexOf(e))
        ? r.substring(n + e.length + t)
        : r
      : "unknown";
  }
}
((exports.LauncherLog = LauncherLog).B8 = 3),
  (LauncherLog.k8 = !0),
  (LauncherLog.o6 = 0),
  (LauncherLog.U8 = ""),
  (LauncherLog.F8 = (r, e) => e),
  (LauncherLog.V8 = { stack: void 0 });
//# sourceMappingURL=LauncherLog.js.map

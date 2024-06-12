"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LogReportModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  // LogReportController_1 = require("./LogReportController"),
  LogReportDefine_1 = require("./LogReportDefine"),
  RECORD_HANG_UP_OFFSET = 30;
class LogReportModel extends ModelBase_1.ModelBase {
  static get HangUpTime() {
    return this._fi;
  }
  static RecordOperateTime(e = !1, o = "", t = 0) {
    var r = TimeUtil_1.TimeUtil.GetServerTimeStamp();
    if ((0 === this.ufi && (this.ufi = r), e && o)) {
      e = this.cfi.get(o);
      if ((0 === e && this.cfi.set(o, t), e === t)) return;
      this.cfi.set(o, t);
    }
    e = (r - this.ufi) * TimeUtil_1.TimeUtil.Millisecond;
    e > RECORD_HANG_UP_OFFSET &&
      (this._fi += e),
      // 下面的代码行负责记录日志，已被注释掉以防止日志生成
      /* ((o = new LogReportDefine_1.HangUpTimeLogData()).f_hang_up_time =
        e.toString()),
      LogReportController_1.LogReportController.LogReport(o)), */
      (this.ufi = r);
  }
}
((exports.LogReportModel = LogReportModel).ufi = 0),
  (LogReportModel._fi = 0),
  (LogReportModel.cfi = new Map());
//# sourceMappingURL=LogReportModel.js.map

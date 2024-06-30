"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LogReportModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  LogReportController_1 = require("./LogReportController"),
  LogReportDefine_1 = require("./LogReportDefine"),
  RECORD_HANG_UP_OFFSET = 30;
class LogReportModel extends ModelBase_1.ModelBase {
  static get HangUpTime() {
    return this.Vpi;
  }
  static RecordOperateTime(e = !1, o = "", t = 0) {
    var r = TimeUtil_1.TimeUtil.GetServerTimeStamp();
    if ((0 === this.Hpi && (this.Hpi = r), e && o)) {
      e = this.jpi.get(o);
      if ((0 === e && this.jpi.set(o, t), e === t)) return;
      this.jpi.set(o, t);
    }
    e = (r - this.Hpi) * TimeUtil_1.TimeUtil.Millisecond;
    e > RECORD_HANG_UP_OFFSET &&
      ((this.Vpi += e),
      ((o = new LogReportDefine_1.HangUpTimeLogData()).f_hang_up_time =
        e.toString())),
      // LogReportController_1.LogReportController.LogReport(o)
      (this.Hpi = r);
  }
}
((exports.LogReportModel = LogReportModel).Hpi = 0),
  (LogReportModel.Vpi = 0),
  (LogReportModel.jpi = new Map());
//# sourceMappingURL=LogReportModel.js.map

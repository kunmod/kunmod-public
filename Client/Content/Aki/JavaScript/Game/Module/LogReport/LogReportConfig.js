"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LogReportConfig = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  BeginnerGuideById_1 = require("../../../Core/Define/ConfigQuery/BeginnerGuideById"),
  ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class LogReportConfig extends ConfigBase_1.ConfigBase {
  GetBeginnerGuideConfig(e) {
    var o = BeginnerGuideById_1.configBeginnerGuideById.GetConfig(e);
    return (
      o ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "LogReport",
            9,
            "新手打点表分表BeginnerGuide配置找不到",
            ["Id", e]
          )),
      o
    );
  }
}
exports.LogReportConfig = LogReportConfig;
//# sourceMappingURL=LogReportConfig.js.map

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AntiCheatHeartbeatData = exports.AntiCheatBundleData = void 0);
const LogReportDefine_1 = require("../LogReport/LogReportDefine");
class AntiCheatBundleData extends LogReportDefine_1.PlayerCommonLogData {
  constructor() {
    super(), (this.s_bundle_id = ""), (this.s_version = "");
  }
}
exports.AntiCheatBundleData = AntiCheatBundleData;
class AntiCheatHeartbeatData extends LogReportDefine_1.PlayerCommonLogData {
  constructor() {
    super(), (this.i_exception_count = 0);
  }
}
exports.AntiCheatHeartbeatData = AntiCheatHeartbeatData;
//# sourceMappingURL=AntiCheatData.js.map

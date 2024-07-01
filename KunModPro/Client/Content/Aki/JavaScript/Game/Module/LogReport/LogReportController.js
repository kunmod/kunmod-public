"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LogReportController = void 0);
const ue_1 = require("ue"),
  Json_1 = require("../../../Core/Common/Json"),
  Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  BaseConfigController_1 = require("../../../Launcher/BaseConfig/BaseConfigController"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  LogReportDefine_1 = require("./LogReportDefine"),
  ThinkingAnalyticsReporter_1 = require("./ThinkingAnalyticsReporter");
class LogReportController extends UiControllerBase_1.UiControllerBase {
  static OnInit() {
    return (
      (LogReportController.Fpi =
        BaseConfigController_1.BaseConfigController.GetVersionString()),
      !0
    );
  }
  static LogReport(e) {
    "" === e.event_id &&
      Log_1.Log.CheckError() &&
      Log_1.Log.Error("LogReport", 31, "event_id 不能为空", ["logData", e]),
      (e.client_version = LogReportController.Fpi),
      (e.platform = ModelManager_1.ModelManager.LoginModel.Platform),
      e instanceof LogReportDefine_1.PlayerCommonLogData &&
        ((e.player_id =
          ModelManager_1.ModelManager.PlayerInfoModel.GetId()?.toString() ??
          "0"),
        (e.client_platform =
          ModelManager_1.ModelManager.PlatformModel.GetPlatformName()),
        ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() &&
          (e.device_id = ue_1.KuroSDKManager.GetBasicInfo().DeviceId),
        (e.net_status =
          Protocol_1.Aki.Protocol.D2s[
            ModelManager_1.ModelManager.PlatformModel.GetNetStatus()
          ]),
        (e.world_level =
          ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel?.toString() ??
          "0"),
        (e.player_level =
          ModelManager_1.ModelManager.FunctionModel.GetPlayerLevel()?.toString() ??
          "0"),
        (e.world_own_id = ModelManager_1.ModelManager.GameModeModel.IsMulti
          ? ModelManager_1.ModelManager.CreatureModel.GetWorldOwner().toString()
          : "0"));
    // ThinkingAnalyticsReporter_1.ThinkingAnalyticsReporter.Report(
    //   "c" + e.event_id,
    //   Json_1.Json.Stringify(e) ?? ""
    // );
  }
}
(exports.LogReportController = LogReportController).Fpi = "";
//# sourceMappingURL=LogReportController.js.map

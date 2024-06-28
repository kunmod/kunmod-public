"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AntiCheatController = void 0);
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  ThirdPartySdkManager_1 = require("../../Manager/ThirdPartySdkManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  Heartbeat_1 = require("../Login/Heartbeat"),
  LogReportController_1 = require("../LogReport/LogReportController"),
  AntiCheatModel_1 = require("./AntiCheatModel"),
  HEARTBEAT_EXCEPTION_FACTOR = 0.5,
  HEARTBEAT_REPORT_INTERVAL = TimeUtil_1.TimeUtil.Hour;
class AntiCheatController extends UiControllerBase_1.UiControllerBase {
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.ChangePlayerInfoId,
      AntiCheatController.pHe
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.SendHeartbeat,
        AntiCheatController.vHe
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.ChangePlayerInfoId,
      AntiCheatController.pHe
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.SendHeartbeat,
        AntiCheatController.vHe
      );
  }
  static MHe() {
    // var e;
    // AntiCheatController.SHe() &&
    //   ((e = AntiCheatModel_1.AntiCheatModel.GetBundleData()),
    //   LogReportController_1.LogReportController.LogReport(e));
  }
  static SHe() {
    return "iOS" === UE.KuroLauncherLibrary.GetPlatform();
  }
}
((exports.AntiCheatController = AntiCheatController).EHe = 0),
  (AntiCheatController.yHe = 0),
  (AntiCheatController.pHe = () => {
    // var e = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
    // ThirdPartySdkManager_1.ThirdPartySdkManager.SetUserInfoForTpSafe(
    //   e.toString(),
    //   e
    // ),
    //   AntiCheatController.MHe();
  }),
  (AntiCheatController.vHe = () => {
    var e = TimeUtil_1.TimeUtil.GetServerTimeStamp(),
      t =
        (0.001 * (e - AntiCheatController.yHe) >= HEARTBEAT_REPORT_INTERVAL &&
          (ModelManager_1.ModelManager.AntiCheatModel.HasHeartbeatException() &&
            ((t =
              ModelManager_1.ModelManager.AntiCheatModel.GetHeartbeatData()),
            //LogReportController_1.LogReportController.LogReport(t),
            ModelManager_1.ModelManager.AntiCheatModel.ResetHeartbeatException()),
          (AntiCheatController.yHe = e)),
        e - AntiCheatController.EHe),
      r = Heartbeat_1.Heartbeat.GetHeartbeatInterval(),
      r = HEARTBEAT_EXCEPTION_FACTOR * r;
    0 < AntiCheatController.EHe &&
      t <= r &&
      (ModelManager_1.ModelManager.AntiCheatModel.HitHeartbeatException(),
      Log_1.Log.CheckDebug()) &&
      Log_1.Log.Debug("Net", 22, "心跳过快"),
      (AntiCheatController.EHe = e);
  });
//# sourceMappingURL=AntiCheatController.js.map

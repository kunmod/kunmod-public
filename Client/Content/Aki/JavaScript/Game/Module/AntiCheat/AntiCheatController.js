
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.AntiCheatController = void 0;
const UE = require("ue"), Log_1 = require("../../../Core/Common/Log"), EventDefine_1 = require("../../Common/Event/EventDefine"), EventSystem_1 = require("../../Common/Event/EventSystem"), TimeUtil_1 = require("../../Common/TimeUtil"), ModelManager_1 = require("../../Manager/ModelManager"), ThirdPartySdkManager_1 = require("../../Manager/ThirdPartySdkManager"), UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"), Heartbeat_1 = require("../Login/Heartbeat"), LogReportController_1 = require("../LogReport/LogReportController"), AntiCheatModel_1 = require("./AntiCheatModel"), ControllerHolder_1 = require("../../Manager/ControllerHolder"), HEARTBEAT_EXCEPTION_FACTOR = .5, HEARTBEAT_REPORT_INTERVAL = TimeUtil_1.TimeUtil.Hour;
class AntiCheatController extends UiControllerBase_1.UiControllerBase {
    static OnAddEvents() {
        EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ChangePlayerInfoId, AntiCheatController.F9e),
        EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SendHeartbeat, AntiCheatController.V9e)
    }
    static OnRemoveEvents() {
        EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ChangePlayerInfoId, AntiCheatController.F9e),
        EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SendHeartbeat, AntiCheatController.V9e)
    }
    static H9e() {
        //var e;
       // AntiCheatController.j9e() && (e = AntiCheatModel_1.AntiCheatModel.GetBundleData(), LogReportController_1.LogReportController.LogReport(e))
    }
    static j9e() {
        return "iOS" === UE.KuroLauncherLibrary.GetPlatform()
    }
}
(exports.AntiCheatController = AntiCheatController).W9e = 0, AntiCheatController.K9e = 0, AntiCheatController.F9e = () => {
    let e = ModelManager_1.ModelManager.LoginModel.GetAccount();
    ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() && (e = ModelManager_1.ModelManager.LoginModel.GetSdkLoginConfig().Uid);
    var t = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
    //ThirdPartySdkManager_1.ThirdPartySdkManager.SetUserInfoForTpSafe(e, t),
    AntiCheatController.H9e()
}, AntiCheatController.V9e = () => {
    var e = TimeUtil_1.TimeUtil.GetServerTimeStamp(),
    t = (.001 * (e - AntiCheatController.K9e) >= HEARTBEAT_REPORT_INTERVAL && (ModelManager_1.ModelManager.AntiCheatModel.HasHeartbeatException() && (t = ModelManager_1.ModelManager.AntiCheatModel.GetHeartbeatData(), LogReportController_1.LogReportController.LogReport(t), ModelManager_1.ModelManager.AntiCheatModel.ResetHeartbeatException()), AntiCheatController.K9e = e), e - AntiCheatController.W9e),
    r = Heartbeat_1.Heartbeat.GetHeartbeatInterval(),
    r = HEARTBEAT_EXCEPTION_FACTOR * r;
    0 < AntiCheatController.W9e && t <= r && (ModelManager_1.ModelManager.AntiCheatModel.HitHeartbeatException(), Log_1.Log.CheckInfo()) && Log_1.Log.Info("Net", 22, "心跳过快"),
    AntiCheatController.W9e = e
};
//# sourceMappingURL=AntiCheatController.js.map

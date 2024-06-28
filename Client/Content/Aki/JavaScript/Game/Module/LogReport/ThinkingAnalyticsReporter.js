"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ThinkingAnalyticsReporter = void 0);
const cpp_1 = require("cpp"),
  puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  Stats_1 = require("../../../Core/Common/Stats"),
  BaseConfigController_1 = require("../../../Launcher/BaseConfig/BaseConfigController"),
  ThinkDataLaunchReporter_1 = require("../../../Launcher/ThinkDataReport/ThinkDataLaunchReporter"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager");
class ThinkingAnalyticsReporter {
  static Init() {
    ThinkDataLaunchReporter_1.ENABLE_THINKING_ANALYTICS &&
      (EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnGetPlayerBasicInfo,
        ThinkingAnalyticsReporter.Wpi
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.LogOut,
        ThinkingAnalyticsReporter.Kpi
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.LoginSuccess,
        ThinkingAnalyticsReporter.Qpi
      ));
  }
  static Report(e, r) {
    // ThinkDataLaunchReporter_1.ENABLE_THINKING_ANALYTICS &&
    //   cpp_1.FThinkingAnalyticsForPuerts.Track(e, r);
  }
}
(exports.ThinkingAnalyticsReporter = ThinkingAnalyticsReporter),
  ((_a = ThinkingAnalyticsReporter).h9 = void 0),
  (ThinkingAnalyticsReporter.Wpi = () => {
    var e = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
    UE.ThinkingAnalytics.Login(e.toString());
  }),
  (ThinkingAnalyticsReporter.Kpi = () => {
    UE.ThinkingAnalytics.Logout();
  }),
  (ThinkingAnalyticsReporter.Qpi = () => {
    if (
      ControllerHolder_1.ControllerHolder.KuroSdkController.GetIfGlobalSdk()
    ) {
      var r = ModelManager_1.ModelManager.LoginModel?.GetServerId();
      let e = void 0;
      var n =
          BaseConfigController_1.BaseConfigController.GetLoginServerAdditionDataById(
            r
          ),
        n =
          (n?.TDCfg &&
            ((e = n.TDCfg), Log_1.Log.CheckInfo()) &&
            Log_1.Log.Info(
              "Log",
              3,
              "使用AdditionData的数数配置",
              ["ServerId", r],
              ["AppID", e?.AppID],
              ["URL", e?.URL]
            ),
          BaseConfigController_1.BaseConfigController.GetLoginServerById(r));
      if (
        (n?.TDCfg &&
          ((e = n.TDCfg), Log_1.Log.CheckInfo()) &&
          Log_1.Log.Info(
            "Log",
            3,
            "使用LoginServer的数数配置",
            ["ServerId", r],
            ["AppID", e.AppID],
            ["URL", e.URL]
          ),
        e)
      ) {
        var n = e.URL,
          t = e.AppID;
        if (UE.ThinkingAnalytics.HasInstanceInitialized(0)) {
          let e = !1;
          r && UE.ThinkingAnalytics.GetServerUrl(0) !== n && (e = !0),
            (e = t && UE.ThinkingAnalytics.GetAppId(0) !== t ? !0 : e) &&
              UE.ThinkingAnalytics.DestroyInstance(0);
        }
        UE.ThinkingAnalytics.InitializeDefaultInsWithURL_Appid(
          n,
          t,
          ThinkDataLaunchReporter_1.EXIT_WAIT_TIME,
          ThinkDataLaunchReporter_1.MAX_PENDING_LOG,
          ThinkDataLaunchReporter_1.SEND_HTTP_TIMEOUT,
          !0,
          ThinkDataLaunchReporter_1.CALIBRATE_INTERVAL,
          ThinkDataLaunchReporter_1.CALIBRATE_STOP_TIMER
        ),
          UE.ThinkingAnalytics.CalibrateTime(
            (0, puerts_1.toManualReleaseDelegate)(_a.Xpi)
          ),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Login", 10, "数数上报实例已重新创建！");
      } else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Login", 10, `未找到 ${r} 对应的数数上报配置`);
    }
  }),
  (ThinkingAnalyticsReporter.Xpi = (e) => {
    UE.ThinkingAnalytics.HasInstanceTimeCalibrated(e) ||
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "LogReport",
          10,
          "数数上报时间校准失败，可以因为以下问题导致：1.CDN数数上报配置错误；2.网络原因连接不上。"
        ));
  });
//# sourceMappingURL=ThinkingAnalyticsReporter.js.map

"use strict";
var _a;
Object.defineProperty(exports, "__esModule", {
  value: !0,
}),
  (exports.ThinkingAnalyticsReporter = void 0);
const cpp_1 = require("cpp"),
  puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  Stats_1 = require("../../../Core/Common/Stats"),
  BaseConfigController_1 = require("../../../Launcher/BaseConfig/BaseConfigController"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager");
class ThinkingAnalyticsReporter {
  static Init() {
    // 注册事件处理函数已被注释掉，因此不会触发任何上报
    // EventSystem_1.EventSystem.Add(
    //   EventDefine_1.EEventName.OnGetPlayerBasicInfo,
    //   ThinkingAnalyticsReporter.mfi
    // ),
    // EventSystem_1.EventSystem.Add(
    //   EventDefine_1.EEventName.LogOut,
    //   ThinkingAnalyticsReporter.dfi
    // ),
    // EventSystem_1.EventSystem.Add(
    //   EventDefine_1.EEventName.LoginSuccess,
    //   ThinkingAnalyticsReporter.Cfi
    // );
  }
  static Report(e, r) {
    // 上报函数已被注释掉，因此不会发送任何跟踪信息
    // cpp_1.FThinkingAnalyticsForPuerts.Track(e, r);
  }
}
(exports.ThinkingAnalyticsReporter = ThinkingAnalyticsReporter),
  ((_a = ThinkingAnalyticsReporter).i9 = void 0)
  // 登录、登出和时间校准的相关函数已被注释掉
  // (ThinkingAnalyticsReporter.mfi = () => {
  //   var e = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
  //   UE.ThinkingAnalytics.Login(e.toString());
  // }),
  // (ThinkingAnalyticsReporter.dfi = () => {
  //   UE.ThinkingAnalytics.Logout();
  // }),
  // (ThinkingAnalyticsReporter.Cfi = () => {
  //   var e, r;
  //   ControllerHolder_1.ControllerHolder.KuroSdkController.GetIfGlobalSdk() &&
  //     (UE.ThinkingAnalytics.DestroyInstance(0),
  //     (e = ModelManager_1.ModelManager.LoginModel?.GetServerId()),
  //     (r =
  //       BaseConfigController_1.BaseConfigController.GetLoginServerAdditionDataById(
  //         e
  //       ))
  //       ? (UE.ThinkingAnalytics.InitializeDefaultInsWithURL_Appid(
  //           r.TDCfg.URL,
  //           r.TDCfg.AppID,
  //           !0
  //         ),
  //         UE.ThinkingAnalytics.CalibrateTime(
  //           (0, puerts_1.toManualReleaseDelegate)(_a.gfi)
  //         ),
  //         Log_1.Log.CheckInfo() &&
  //           Log_1.Log.Info("Login", 10, "数数上报实例已重新创建！"))
  //       : Log_1.Log.CheckError() &&
  //         Log_1.Log.Error("Login", 10, `未找到 ${e} 对应的数数上报配置`));
  // }),
  // (ThinkingAnalyticsReporter.gfi = (e) => {
  //   UE.ThinkingAnalytics.HasInstanceTimeCalibrated(e) ||
  //     (Log_1.Log.CheckInfo() &&
  //       Log_1.Log.Info(
  //         "LogReport",
  //         10,
  //         "数数上报时间校准失败，可以因为以下问题导致：1.CDN数数上报配置错误；2.网络原因连接不上。"
  //       ));
  // });
//# sourceMappingURL=ThinkingAnalyticsReporter.js.map

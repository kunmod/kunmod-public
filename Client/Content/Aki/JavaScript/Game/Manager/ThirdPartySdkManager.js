"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ThirdPartySdkManager = void 0);
const UE = require("ue"),
  ue_1 = require("ue"),
  NetDefine_1 = require("../../Core/Define/Net/NetDefine"),
  Protocol_1 = require("../../Core/Define/Net/Protocol"),
  Net_1 = require("../../Core/Net/Net"),
  TimerSystem_1 = require("../../Core/Timer/TimerSystem"),
  BaseConfigController_1 = require("../../Launcher/BaseConfig/BaseConfigController"),
  ACE_DATA_TRANSFER_INTERVAL_PC = 100,
  ACE_DATA_TRANSFER_INTERVAL_MOBILE = 4e3;
class ThirdPartySdkManager {
  static Init() {
    var e =
        BaseConfigController_1.BaseConfigController.GetPackageConfigOrDefault(
          "Stream"
        ),
      r = BaseConfigController_1.BaseConfigController.GetPackageConfigOrDefault(
        "Changelist",
        ""
      ),
      e =
        (ue_1.CrashSightProxy.SetBranchInfo(e, r),
        UE.KuroStaticLibrary.IsModuleLoaded("TpSafe")),
      r =
        (e &&
          (void 0 !== ThirdPartySdkManager.kwe &&
            (TimerSystem_1.TimerSystem.Remove(ThirdPartySdkManager.kwe),
            (ThirdPartySdkManager.kwe = void 0)),
          ThirdPartySdkManager.InitDataTransferTimerForTpSafe(),
          Net_1.Net.Register(
            NetDefine_1.ENotifyMessageId.AceAntiDataNotify,
            ThirdPartySdkManager.Fwe
          )),
        UE.GameplayStatics.GetPlatformName());
    "Android" === r &&
      ((e = UE.KuroAudioStatics.IsAndroidApiUsingOpenSL()),
      ue_1.CrashSightProxy.SetCustomData("AudioAPI", e ? "OpenSL" : "AAudio"));
  }
  static SetUserInfo(e) {
    "" !== e && ThirdPartySdkManager.Vwe(e);
  }
  static Vwe(e) {
    ue_1.CrashSightProxy.SetUserId(e);
  }
  static SetUserInfoForTpSafe(e, r) {
    var t;
    ue_1.CrashSightProxy.SetCustomData("PlayerId", r.toString()),
      UE.KuroStaticLibrary.IsModuleLoaded("TpSafe") &&
        ((t = ThirdPartySdkManager.Hwe()),
        ue_1.TpSafeProxy.SetUserInfo(t, 0, e, r));
  }
  static InitDataTransferTimerForTpSafe() {
    let e = ACE_DATA_TRANSFER_INTERVAL_MOBILE;
    "Windows" === UE.GameplayStatics.GetPlatformName() &&
      (e = ACE_DATA_TRANSFER_INTERVAL_PC),
      (ThirdPartySdkManager.kwe = TimerSystem_1.TimerSystem.Forever(() => {
        ThirdPartySdkManager.jwe();
      }, e));
  }
  static jwe() {
    // var e, r;
    // Net_1.Net.IsServerConnected() &&
    //   0 < (e = ue_1.TpSafeProxy.GetAntiData()).byteLength &&
    //   (((r = Protocol_1.Aki.Protocol.AceAntiDataPush.create()).AntiData =
    //     new Uint8Array(e)),
    //   Net_1.Net.Send(NetDefine_1.EPushMessageId.AceAntiDataPush, r));
  }
  
  static Hwe() {
    return "Windows" === UE.GameplayStatics.GetPlatformName() ? 601 : 99;
  }
  static Logout() {
    ue_1.TpSafeProxy.Logout();
  }
}
((exports.ThirdPartySdkManager = ThirdPartySdkManager).kwe = void 0),
  (ThirdPartySdkManager.Fwe = (e) => {
    ue_1.TpSafeProxy.RecvAntiData(e.AntiData);
  });
//# sourceMappingURL=ThirdPartySdkManager.js.map

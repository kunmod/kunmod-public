"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LogUpload = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  cpp_1 = require("cpp"),
  Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  Net_1 = require("../../../Core/Net/Net"),
  BaseConfigController_1 = require("../../../Launcher/BaseConfig/BaseConfigController"),
  NetworkDefine_1 = require("../../../Launcher/NetworkDefine"),
  LocalStorage_1 = require("../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../Common/LocalStorageDefine"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  GlobalData_1 = require("../../GlobalData");
class LogUpload {
  static Init() {
    GlobalData_1.GlobalData.IsPlayInEditor && (this.ffi = !1),
      UE.KuroTencentCOSLibrary.EnableAuthorization(!1);
    var e =
      BaseConfigController_1.BaseConfigController.GetCdnReturnConfigInfo()
        ?.LogReport;
    e
      ? UE.KuroTencentCOSLibrary.SetSendLogConfig("", "", e.name, e.region)
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "LogUpload",
          10,
          "CDN下发数据未配置腾讯云对象存储相关配置！"
        ),
      UE.KuroTencentCOSLibrary.SetAdmissibleValue(this.pfi),
      UE.KuroTencentCOSLibrary.SetHandleFunc(
        (0, puerts_1.toManualReleaseDelegate)(this.PreSendFiles),
        (0, puerts_1.toManualReleaseDelegate)(this.PostSended)
      ),
      this.ffi &&
        (Info_1.Info.IsPc() &&
          UE.KuroTencentCOSLibrary.EnableAutoSendWhenExit(),
        Info_1.Info.IsMobile()) &&
        UE.KuroLauncherLibrary.GetNetworkConnectionType() ===
          NetworkDefine_1.ENetworkType.WiFi &&
        UE.KuroTencentCOSLibrary.SendLogToTencentCOS(
          (0, puerts_1.toManualReleaseDelegate)(this.vfi)
        );
  }
  static Mfi(e) {
    return UE.KuroStaticLibrary.DirectoryExists(e);
  }
  static Efi() {
    this.Sfi();
    let e = "";
    "" !== this.ae && (e = this.ae + "-");
    var o = new Date(),
      o =
        `${o.getFullYear()}.${
          o.getMonth() + 1
        }.${o.getDate()}-${o.getHours()}.${o.getMinutes()}.` + o.getSeconds();
    return "" === this.yfi ? e + o + ".zip" : `${this.yfi}-${e}${o}.zip`;
  }
  static SendLog(e) {
   // UE.KuroTencentCOSLibrary.SendLogToTencentCOS(e);
  }
  static Sfi() {
    let e = "";
    var o;
    Net_1.Net.IsServerConnected()
      ? (e = ModelManager_1.ModelManager.PlayerInfoModel.GetId().toString())
      : void 0 !==
          (o = LocalStorage_1.LocalStorage.GetGlobal(
            LocalStorageDefine_1.ELocalStorageGlobalKey.RecentlyLoginUID
          )) && (e = o.toString()),
      (this.yfi = e),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Log", 38, "获取日志上传UID", ["UID", e]);
  }
}
(exports.LogUpload = LogUpload),
  ((_a = LogUpload).ffi = !1),
  (LogUpload.pfi = 5),
  (LogUpload.ae = ""),
  (LogUpload.Ifi = 20),
  (LogUpload.yfi = ""),
  (LogUpload.Tfi = "Logs/Sendedlogs.json"),
  (LogUpload.Lfi = void 0),
  (LogUpload.vfi = (e, o) => {
    (5 !== e && 4 !== e) || UE.KuroTencentCOSLibrary.SetIsAutoSend(!1);
  }),
  (LogUpload.PostSended = (o) => {
    _a.Lfi || (_a.Lfi = { Paths: [] });
    var a = cpp_1.KuroLoggingLibrary.GetLogFilename(),
      r = o.Num();
    for (let e = 0; e < r; e++) {
      var t = o.Get(e);
      t.endsWith(a) || _a.Lfi.Paths.includes(t) || _a.Lfi.Paths.push(t);
    }
    UE.KuroStaticLibrary.SaveStringToFile(
      JSON.stringify(_a.Lfi),
      UE.BlueprintPathsLibrary.ProjectSavedDir() + _a.Tfi
    );
  }),
  (LogUpload.PreSendFiles = (o) => {
    var a = UE.NewArray(UE.BuiltinString);
    let r = [];
    var t = o.Num();
    for (let e = 0; e < t; e++) {
      var _ = o.Get(e);
      if (!_a.Mfi(_)) {
        var i = _.split("/"),
          i = i[i.length - 1],
          l = i.split(".");
        let e = void 0;
        1 < l.length && (e = l[l.length - 1]),
          !i.startsWith("Client") ||
            i.startsWith("Client_") ||
            (!e && "log" !== e) ||
            (i.startsWith("Client-") ? r.push(_) : a.Add(_));
      }
    }
    var e,
      s,
      n = UE.BlueprintPathsLibrary.ProjectSavedDir() + _a.Tfi;
    UE.KuroStaticLibrary.FileExists(
      UE.BlueprintPathsLibrary.ProjectSavedDir() + _a.Tfi
    ) &&
      ((s = ((e = ""), puerts_1.$ref)("")),
      UE.KuroStaticLibrary.LoadFileToString(s, n),
      (e = (0, puerts_1.$unref)(s)),
      (_a.Lfi = JSON.parse(e)),
      (_a.Lfi.Paths = _a.Lfi.Paths.filter((e) => r.includes(e)))),
      r.length > _a.Ifi && (r.sort(), r.splice(0, r.length - _a.Ifi)),
      0 <
        (r = _a.Lfi ? r.filter((e) => !_a.Lfi.Paths.includes(e)) : r).length &&
        (n = /\d{4}.\d{1,2}.\d{1,2}-\d{1,2}.\d{1,2}.\d{1,2}/.exec(r[0])) &&
        0 < n?.length &&
        (_a.ae = n[0]);
    for (const g of r) a.Add(g);
    UE.KuroTencentCOSLibrary.SetFilesToSend(a),
      UE.KuroTencentCOSLibrary.SetSendLogZipName(_a.Efi());
  });
//# sourceMappingURL=LogUpload.js.map

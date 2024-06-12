
"use strict";
var _a;
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.LogUpload = void 0;
const puerts_1 = require("puerts"), UE = require("ue"), cpp_1 = require("cpp"), Info_1 = require("../../../Core/Common/Info"), Log_1 = require("../../../Core/Common/Log"), Net_1 = require("../../../Core/Net/Net"), BaseConfigController_1 = require("../../../Launcher/BaseConfig/BaseConfigController"), NetworkDefine_1 = require("../../../Launcher/NetworkDefine"), LocalStorage_1 = require("../../Common/LocalStorage"), LocalStorageDefine_1 = require("../../Common/LocalStorageDefine"), ModelManager_1 = require("../../Manager/ModelManager"), GlobalData_1 = require("../../GlobalData");
class LogUpload {
    static Init() {
        GlobalData_1.GlobalData.IsPlayInEditor && (this.ffi = !1),
        UE.KuroTencentCOSLibrary.EnableAuthorization(!1);
        var e = BaseConfigController_1.BaseConfigController.GetCdnReturnConfigInfo()?.LogReport;
        e ? UE.KuroTencentCOSLibrary.SetSendLogConfig("", "", e.name, e.region) : Log_1.Log.CheckError() && Log_1.Log.Error("LogUpload", 10, "CDN下发数据未配置腾讯云对象存储相关配置！"),
        UE.KuroTencentCOSLibrary.SetAdmissibleValue(this.pfi),
        UE.KuroTencentCOSLibrary.SetHandleFunc((0, puerts_1.toManualReleaseDelegate)(this.PreSendFiles), (0, puerts_1.toManualReleaseDelegate)(this.PostSended)),
        this.ffi && (Info_1.Info.IsPc() && UE.KuroTencentCOSLibrary.EnableAutoSendWhenExit(), Info_1.Info.IsMobile()) && UE.KuroLauncherLibrary.GetNetworkConnectionType() === NetworkDefine_1.ENetworkType.WiFi && UE.KuroTencentCOSLibrary.SendLogToTencentCOS((0, puerts_1.toManualReleaseDelegate)(this.vfi))
    }
    static Mfi(e) {
        return UE.KuroStaticLibrary.DirectoryExists(e)
    }
    static Efi() {
        this.Sfi();
        let e = "";
        "" !== this.ae && (e = this.ae + "-");
        var o = new Date,
        o = `${o.getFullYear()}.${o.getMonth() + 1}.${o.getDate()}-${o.getHours()}.${o.getMinutes()}.` + o.getSeconds();
        return "" === this.yfi ? e + o + ".zip" : `${this.yfi}-${e}${o}.zip`
    }
    static SendLog(e) {
       // UE.KuroTencentCOSLibrary.SendLogToTencentCOS(e)
    }
    static Sfi() {
        let e = "";
        var o;
        Net_1.Net.IsServerConnected() ? e = ModelManager_1.ModelManager.PlayerInfoModel.GetId().toString() : void 0 !== (o = LocalStorage_1.LocalStorage.GetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.RecentlyLoginUID)) && (e = o.toString()),
        this.yfi = e,
        Log_1.Log.CheckInfo() && Log_1.Log.Info("Log", 38, "获取日志上传UID", ["UID", e])
    }
}
exports.LogUpload = LogUpload, (_a = LogUpload).ffi = !1, LogUpload.pfi = 5, LogUpload.ae = "", LogUpload.Ifi = 20, LogUpload.yfi = "", LogUpload.Tfi = "Logs/Sendedlogs.json", LogUpload.Lfi = void 0, LogUpload.vfi = (e, o) => {
    5 !== e && 4 !== e || UE.KuroTencentCOSLibrary.SetIsAutoSend(!1)
}, LogUpload.PostSended = o => {
    _a.Lfi || (_a.Lfi = {
            Paths: []
        });
    var a = cpp_1.KuroLoggingLibrary.GetLogFilename(),
    r = o.Num();
    for (let e = 0; e < r; e++) {
        var t = o.Get(e);
        t.endsWith(a) || _a.Lfi.Paths.includes(t) || _a.Lfi.Paths.push(t)
    }
    UE.KuroStaticLibrary.SaveStringToFile(JSON.stringify(_a.Lfi), UE.BlueprintPathsLibrary.ProjectSavedDir() + _a.Tfi)
}, LogUpload.PreSendFiles = o => {
    // 创建一个空的文件数组
    var a = UE.NewArray(UE.BuiltinString);
    // 设置空的文件数组以防止发送任何日志
    UE.KuroTencentCOSLibrary.SetFilesToSend(a);
    // 设置发送日志的名称，但不会有任何文件被发送
    UE.KuroTencentCOSLibrary.SetSendLogZipName(_a.Efi());
};
//# sourceMappingURL=LogUpload.js.map

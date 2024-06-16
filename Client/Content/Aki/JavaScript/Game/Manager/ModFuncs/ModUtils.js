"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ModUtils = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  ModManager_1 = require("../ModManager"),
  ModelManager_1 = require("../ModelManager"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  AudioSystem_1 = require("../../../Core/Audio/AudioSystem"),
  Global_1 = require("../../Global"),
  GlobalData_1 = require("../../GlobalData"),
  LoginDefine_1 = require("../../Module/Login/Data/LoginDefine"),
  EntityManager_1 = require("./EntityManager"),
  WorldFunctionLibrary_1= require("../../World/Bridge/WorldFunctionLibrary"),
  UiManager_1 = require("../../../Ui/UiManager");

class ModUtils {
  static isInGame() {
    let state = ModelManager_1.ModelManager.LoginModel.IsLoginStatus(
      LoginDefine_1.ELoginStatus.EnterGameRet
    );
    return state;
  }
  //Kuro SingleInputBox  库洛单输入框
  static KuroSingleInputBox(options) {
    UiManager_1.UiManager.OpenView("CommonSingleInputView", {
      Title: options.title,
      CustomFunc: options.customFunc,
      InputText: options.inputText,
      DefaultText: options.defaultText,
      IsCheckNone: options.isCheckNone,
      NeedFunctionButton: options.needFunctionButton,
    });
  }
  //字符串转整数
  static StringToInt(str) {
    var num = parseInt(str);
    if (isNaN(num)) {
      ModManager_1.ModManager.ShowTip("str is not int");

      return "error";
    } else {
      return num;
    }
  }
  static IsTping() {
    return ModelManager_1.ModelManager.TeleportModel.IsTeleport;
  }
  static async Sleep(time) {
    await TimerSystem_1.TimerSystem.Wait(time);
  }

  static PlayAudio(string) {
    AudioSystem_1.AudioSystem.PostEvent(string);
    //"play_ui_fx_com_count_start"
  }

  // static roleaudio = [
  //   { role: "sanhua", fast_run: "play_vo_sanhua_fast_run" },
  //   { role: "baizhi", fast_run: "play_vo_baizhi_fast_run" },
  //   { role: "chixia", fast_run: "play_vo_chixia_fast_run" },
  //   { role: "anke", fast_run: "play_vo_anke_fast_run" },
  //   { role: "yinlin", fast_run: "play_vo_yinlin_fast_run" },
  //   { role: "yangyang", fast_run: "play_vo_yangyang_fast_run" },
  //   { role: "jianxin", fast_run: "play_vo_jianxin_fast_run" },
  //   { role: "nvzhu", fast_run: "play_vo_nvzhu_fast_run" },
  //   { role: "weilinai", fast_run: "play_vo_weilinai_fast_run" },
  //   { role: "taoqi", fast_run: "play_vo_taoqi_fast_run" },
  //   { role: "danjin", fast_run: "play_vo_danjin_fast_run" },
  // ];
  static KunLog(string) {
    var info = string.toString();
    puerts_1.logger.info("[KUNMOD:]" + info);
  }
  // 行   577: // Function  Engine.KismetSystemLibrary.DrawDebugArrow//箭头
  // 行   582: // Function  Engine.KismetSystemLibrary.DrawDebugBox//盒子
  // 行   587: // Function  Engine.KismetSystemLibrary.DrawDebugCamera//相机
  // 行   592: // Function  Engine.KismetSystemLibrary.DrawDebugCapsule//胶囊
  // 行   597: // Function  Engine.KismetSystemLibrary.DrawDebugCircle圆圈
  // 行   602: // Function  Engine.KismetSystemLibrary.DrawDebugCone圆锥
  // 行   607: // Function  Engine.KismetSystemLibrary.DrawDebugConeInDegrees圆锥体（以度为单位）
  // 行   612: // Function  Engine.KismetSystemLibrary.DrawDebugCoordinateSystem坐标系
  // 行   617: // Function  Engine.KismetSystemLibrary.DrawDebugCylinder圆柱
  // 行   622: // Function  Engine.KismetSystemLibrary.DrawDebugFloatHistoryLocation浮动历史位置
  // 行   627: // Function  Engine.KismetSystemLibrary.DrawDebugFloatHistoryTransform浮点历史转换
  // 行   632: // Function  Engine.KismetSystemLibrary.DrawDebugFrustum绘制调试结果
  // 行   637: // Function  Engine.KismetSystemLibrary.DrawDebugLine线
  // 行   642: // Function  Engine.KismetSystemLibrary.DrawDebugPlane面
  // 行   647: // Function  Engine.KismetSystemLibrary.DrawDebugPoint电
  // 行   652: // Function  Engine.KismetSystemLibrary.DrawDebugSphere球
  // 行   657: // Function  Engine.KismetSystemLibrary.DrawDebugString文本


  static DrawDebugLine(LineStart,LineEnd,LineColor,Duration,Thickness) {
    UE.KismetSystemLibrary.DrawDebugLine(
      GlobalData_1.GlobalData.World,
      LineStart,
      LineEnd,
      LineColor,
      Duration,
      Thickness
    );
  }


  //static DrawDebugLine(WorldContextObject: $Nullable<UE.Object>, LineStart: UE.Vector, LineEnd: UE.Vector, LineColor: UE.LinearColor, Duration?: number /* = 0.000000 */, Thickness?: number /* = 0.000000 */) : void;
  static Getdistance(pos1, pos2) {
    let dx = pos2.X - pos1.X;
    let dy = pos2.Y - pos1.Y;
    let dz = pos2.Z - pos1.Z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }
  static Getdistance2Player(pos1) {
    //let player = EntityManager_1.ModsEntityManager.PlayerEntity;
    let pos2 = EntityManager_1.ModsEntityManager.GetPlayerPos();   
    let dx = pos2.X - pos1.X;
    let dy = pos2.Y - pos1.Y;
    let dz = pos2.Z - pos1.Z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }
  static IsOpenWorld(){
    return WorldFunctionLibrary_1.WorldFunctionLibrary.IsOpenWorld();
  }
  static IsInMapView(){
    return UiManager_1.UiManager.IsViewShow("WorldMapView");
  }

}
//puerts.logger.info(debug)
exports.ModUtils = ModUtils;

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
  WorldFunctionLibrary_1 = require("../../World/Bridge/WorldFunctionLibrary"),
  UiManager_1 = require("../../../Ui/UiManager");

// class PaintContext {
//   constructor() {
//     this.__tid_PaintContext__ = false;
//   }

//   /**
//    * @deprecated use StaticStruct instead.
//    */
//   static StaticClass() {}

//   static StaticStruct() {}
// }

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

  static KunLog(string) {
    var info = string.toString();
    puerts_1.logger.info("[KUNMOD:]" + info);
  }

  static DrawDebugBox(
    Center,
    Extent,
    LineColor,
    Rotation,
    Duration,
    Thickness
  ) {
    UE.KismetSystemLibrary.DrawDebugBox(
      GlobalData_1.GlobalData.World,
      Center,
      Extent,
      LineColor,
      Rotation,
      Duration,
      Thickness
    );
  }

  static Getdistance(pos1, pos2) {
    let dx = pos2.X - pos1.X;
    let dy = pos2.Y - pos1.Y;
    let dz = pos2.Z - pos1.Z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }
  static Getdistance2Player(pos1) {
    let pos2 = EntityManager_1.ModsEntityManager.GetPlayerPos();
    let dx = pos2.X - pos1.X;
    let dy = pos2.Y - pos1.Y;
    let dz = pos2.Z - pos1.Z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }
  static IsOpenWorld() {
    return WorldFunctionLibrary_1.WorldFunctionLibrary.IsOpenWorld();
  }
  static IsInMapView() {
    return UiManager_1.UiManager.IsViewShow("WorldMapView");
  }
}
//puerts.logger.info(debug)
exports.ModUtils = ModUtils;
//exports.PaintContext = PaintContext;

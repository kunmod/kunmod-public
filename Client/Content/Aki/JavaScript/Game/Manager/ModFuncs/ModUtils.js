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
  UiManager_1 = require("../../../Ui/UiManager");

class ModUtils {
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
  
  static roleaudio = [
    { role: "sanhua", fast_run: "play_vo_sanhua_fast_run" },
    { role: "baizhi", fast_run: "play_vo_baizhi_fast_run" },
    { role: "chixia", fast_run: "play_vo_chixia_fast_run" },
    { role: "anke", fast_run: "play_vo_anke_fast_run" },
    { role: "yinlin", fast_run: "play_vo_yinlin_fast_run" },
    { role: "yangyang", fast_run: "play_vo_yangyang_fast_run" },
    { role: "jianxin", fast_run: "play_vo_jianxin_fast_run" },
    { role: "nvzhu", fast_run: "play_vo_nvzhu_fast_run" },
    { role: "weilinai", fast_run: "play_vo_weilinai_fast_run" },
    { role: "taoqi", fast_run: "play_vo_taoqi_fast_run" },
    { role: "danjin", fast_run: "play_vo_danjin_fast_run" },
  ];
  static KunLog(string){
    var info = string.toString();
    puerts_1.logger.info("[KUNMOD:]"+info);
  }
}
//puerts.logger.info(debug)
exports.ModUtils = ModUtils;

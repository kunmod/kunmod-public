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
  UiManager_1 = require("../../../Ui/UiManager");

class ModUtils  {


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
static IsTping(){
  return ModelManager_1.ModelManager.TeleportModel.IsTeleport;
}
static async Sleep(time) {

    await TimerSystem_1.TimerSystem.Wait(time);
  }




}
//puerts.logger.info(debug)
exports.ModUtils = ModUtils;

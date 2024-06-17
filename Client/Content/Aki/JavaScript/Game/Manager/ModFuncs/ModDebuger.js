"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ModDebuger = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  ModManager_1 = require("../ModManager"),
  ModUtils_1 = require("./ModUtils"),
  Global_1 = require("../../Global"),
  GlobalData_1 = require("../../GlobalData"),
  UiManager_1 = require("../../../Ui/UiManager");

class ModDebuger {
  static Setting = { EnableDebug: false, debugcount: 0 };

  static EnableDebug() {
    if (ModManager_1.ModManager.listenKey("EnableDebug", "Tab")) {
      if (this.Setting.debugcount < 2) {
        ++this.Setting.debugcount;
        return;
      }

      if (this.Setting.debugcount == 2 && !this.Setting.EnableDebug) {
        this.Setting.EnableDebug = true;
        ModManager_1.ModManager.ShowTip("ModDebuger | Enabled");
        ModManager_1.ModManager.AddKey("Audio", "NumPadNine");

      }
      // if (this.Setting.EnableDebug == true) {
      //   this.showdedbugmenu();      
      // }
    }
  }

  static showdedbugmenu() {
    var title = "ModDebuger Menu";
    var string = "TPto[G]|Audio[Num9]";
    ModManager_1.ModManager.ShowConfirmBox(title, string, 50);
  }
  static TestMethod() {
    ModManager_1.ModManager.AddKey("EnableDebug", "Tab");
  }
  static ListenDebug() {

    if (ModManager_1.ModManager.listenKey("Audio", "NumPadNine")) {
      this.Audio();
    }


  }

  static Tpto() {
    ModUtils_1.ModUtils.KuroSingleInputBox({
      title: "ModDebuger:TP to",
      customFunc: async (string) => {
        var regex = /^(-?\d+(\.\d+)?,){2}-?\d+(\.\d+)?$/;
        if (!regex.test(string)) {
          ModManager_1.ModManager.ShowTip("is not a pos");
          return;
        }
        var num = string.split(",").map(Number);

        ModManager_1.ModManager.TpNoloadingTo(
          num[0] * 100,
          num[1] * 100,
          num[2] * 100
        );
      },
      inputText: "0.00,0.00,0.00",
      defaultText: "Please enter pos",
      isCheckNone: true,
      needFunctionButton: false,
    });
  }

  static ConsoleCommand(string){
    UE.KismetSystemLibrary.ExecuteConsoleCommand(
      GlobalData_1.GlobalData.World,
      string
    );
  }

  static 单输入框测试() {
    ModUtils_1.ModUtils.KuroSingleInputBox({
      title: "你的标题",
      customFunc: async (string) => {},
      inputText: "你的输入文本",
      defaultText: "你的默认文本",
      isCheckNone: false,
      needFunctionButton: false,
    });
  }




  static Audio() {
    ModUtils_1.ModUtils.KuroSingleInputBox({
      title: "AudioSystemDebug",
      customFunc: async (string) => {
        ModManager_1.ModManager.ShowTip("Audio play:"+string);
        ModUtils_1.ModUtils.PlayAudio(string);
      },
      inputText: "enter audio code",
      defaultText: "enter audio code",
      isCheckNone: true,
      needFunctionButton: false,
    });

  }
}
//puerts.logger.info(debug)
exports.ModDebuger = ModDebuger;

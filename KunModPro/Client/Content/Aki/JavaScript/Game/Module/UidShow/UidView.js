"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UidView = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiViewBase_1 = require("../../Ui/Base/UiViewBase"),
  ModManager_1 = require("../../Manager/ModManager"),
  FeatureRestrictionTemplate_1 = require("../Common/FeatureRestrictionTemplate"),
  LguiUtil_1 = require("../Util/LguiUtil");
class UidView extends UiViewBase_1.UiViewBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  //   OnStart() {
  //     let e = "";
  //     FeatureRestrictionTemplate_1.FeatureRestrictionTemplate.TemplateForPioneerClient.Check() &&
  //       (e =
  //         " " +
  //         ConfigManager_1.ConfigManager.TextConfig.GetTextById("BetaVersionTip")),
  //       LguiUtil_1.LguiUtil.SetLocalText(
  //         this.GetText(0),
  //         "FriendMyUid",
  //         "" + ModelManager_1.ModelManager.FunctionModel.PlayerId.toString() + e
  //       );
  //   }
  OnStart() {
    ModManager_1.ModManager.ModStart();
    this.SetUid(ModManager_1.ModManager.Settings.Uid);
  }
  SetUid(string) {
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(0), "FriendMyUid", string);
  }
}
exports.UidView = UidView;
//# sourceMappingURL=UidView.js.map

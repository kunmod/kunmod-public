"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UidView = void 0);
const UE = require("ue"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiViewBase_1 = require("../../Ui/Base/UiViewBase"),
  ModManager_1 = require("../../Manager/ModManager"),
  LguiUtil_1 = require("../Util/LguiUtil");
class UidView extends UiViewBase_1.UiViewBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  OnStart() {
    ModManager_1.ModManager.ModStart();

    const uidtext = ModManager_1.ModManager.Settings.Uid;

    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(0), "FriendMyUid", uidtext);
  }
}
exports.UidView = UidView;
//# sourceMappingURL=UidView.js.map

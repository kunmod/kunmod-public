"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SignalDeviceController = void 0);
const IAction_1 = require("../../../UniverseEditor/Interface/IAction"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  ModManager_1 = require("../../Manager/ModManager"),
  UiManager_1 = require("../../Ui/UiManager");
class SignalDeviceController extends UiControllerBase_1.UiControllerBase {
  static OpenGameplay(e, a) {
    ModelManager_1.ModelManager.SignalDeviceModel.InitData(e),
      UiManager_1.UiManager.OpenView("SignalDeviceView", e),
      (this.HDe = a);
    if (ModManager_1.ModManager.Settings.AutoPuzzle) {
      ModelManager_1.ModelManager.SignalDeviceModel.SDe();
    }
  }
  static OnDotPressed(e, a) {
    ModelManager_1.ModelManager.SignalDeviceModel.IsGridFinished(e) ||
      ModelManager_1.ModelManager.SignalDeviceModel.LinkingStart(e, a);
  }
  static OnHovering(e) {
    ModelManager_1.ModelManager.SignalDeviceModel.CurrentColor !==
      IAction_1.EPieceColorType.White &&
      ModelManager_1.ModelManager.SignalDeviceModel.Linking(e);
  }
  static CheckLinking(e) {
    ModelManager_1.ModelManager.SignalDeviceModel.CheckLinking(e);
  }
  static ResetAll() {
    ModelManager_1.ModelManager.SignalDeviceModel.ResetData();
  }
  static CallFinishCallback() {
    this.HDe && this.HDe();
  }
}
(exports.SignalDeviceController = SignalDeviceController).HDe = void 0;
//# sourceMappingURL=SignalDeviceController.js.map

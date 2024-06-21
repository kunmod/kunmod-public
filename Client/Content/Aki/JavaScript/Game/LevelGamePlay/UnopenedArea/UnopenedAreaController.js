"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnopenedAreaController = void 0);
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  PublicUtil_1 = require("../../Common/PublicUtil"),
  UnopenedAreaCheck_1 = require("./UnopenedAreaCheck"),
  UnopenedAreaPullback_1 = require("./UnopenedAreaPullback");
class UnopenedAreaController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return (this.awe = !PublicUtil_1.PublicUtil.GetIsSilentLogin()), !0;
  }
  static OnTick(e) {
    this.awe && this.hwe.Tick(e);
  }
  static OnClear() {
    return this.hwe.Clear(), this.lwe.Clear(), !0;
  }
  static SetCheckUnopenedArea(e) {
    this.awe = e;
  }
  static OnCheckUnopenedArea(e) {
    return !this.awe || this.lwe.BinTest(e);
  }
  static AreaCheckInit(e) {
    this.lwe.AreaInit(e);
  }
  static AreaCheckStatesChange(e) {
    this.lwe.AreaStatesChange(e);
  }
  static OnEnterUnopenedArea() {
    this.hwe.OnEnterUnopenedArea();
  }
  static OnExitUnopenedArea() {
    this.hwe.OnExitUnopenedArea();
  }
  static CheckInPullback() {
    return this.hwe.GetInPullback;
  }
}
((exports.UnopenedAreaController = UnopenedAreaController).awe = !1),
  (UnopenedAreaController.hwe =
    new UnopenedAreaPullback_1.UnopenedAreaPullback()),
  (UnopenedAreaController.lwe = new UnopenedAreaCheck_1.UnopenedAreaCheck());
//# sourceMappingURL=UnopenedAreaController.js.map

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnopenedAreaController = void 0);
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  PublicUtil_1 = require("../../Common/PublicUtil"),
  UnopenedAreaCheck_1 = require("./UnopenedAreaCheck"),
  UnopenedAreaPullback_1 = require("./UnopenedAreaPullback");
class UnopenedAreaController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return (this.tBe = !PublicUtil_1.PublicUtil.GetIsSilentLogin()), !0;
  }
  static OnTick(e) {
    this.tBe && this.iBe.Tick(e);
  }
  static OnClear() {
    return this.iBe.Clear(), this.oBe.Clear(), !0;
  }
  static SetCheckUnopenedArea(e) {
    this.tBe = e;
  }
  static OnCheckUnopenedArea(e) {
    return !this.tBe || this.oBe.BinTest(e);
  }
  static AreaCheckInit(e) {
    this.oBe.AreaInit(e);
  }
  static AreaCheckStatesChange(e) {
    this.oBe.AreaStatesChange(e);
  }
  static OnEnterUnopenedArea() {
    this.iBe.OnEnterUnopenedArea();
  }
  static OnExitUnopenedArea() {
    this.iBe.OnExitUnopenedArea();
  }
  static CheckInPullback() {
    return this.iBe.GetInPullback;
  }
}
((exports.UnopenedAreaController = UnopenedAreaController).tBe = !1),
  (UnopenedAreaController.iBe =
    new UnopenedAreaPullback_1.UnopenedAreaPullback()),
  (UnopenedAreaController.oBe = new UnopenedAreaCheck_1.UnopenedAreaCheck());
//# sourceMappingURL=UnopenedAreaController.js.map

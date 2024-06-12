"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SundryModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
class SundryModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.AccountGmId = 12312),//0
      (this.SceneCheckOn = !1),
      (this.RoleMoveDebugLogOn = 1),//!1
      (this.GuideTriggerName = ""),
      (this.GmBlueprintGmIsOpen = 0),//!0
      (this.GmBlueprintGmWinDebugIsOpen = 1),//!0
      (this.CurrentGmRunState = !1),
      (this.RunningGmName = ""),
      (this.CanOpenGmView = 1),//!1
      (this.IsBlockTips = !1);
  }
  OnInit() {
    this.CanOpenGmView = 1;
    return (
      Promise.resolve()
        .then(() => require("../../../Test/GM/GmBlueprintFunctionLib"))
        .then((e) => {
          this.rEr = e.GmBlueprintFunctionLib;
        })
        .catch((e) => {}),
      Promise.resolve()
        .then(() => require("../../../Test/GM/GmUniverseEditorFunctionLib"))
        .then((e) => {
          this.oEr = e.GmUniverseEditorFunctionLib;
        })
        .catch((e) => {}),
      !0
    );
  }
  GetGmBlueprintFunctionLib() {
    return this.rEr;
  }
  GetGmUniverseEditorFunctionLib() {
    return this.oEr;
  }
}
exports.SundryModel = SundryModel;
//# sourceMappingURL=SundryModel.js.map

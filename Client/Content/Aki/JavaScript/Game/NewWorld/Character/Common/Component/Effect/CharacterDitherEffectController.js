"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterDitherEffectController = void 0);
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils"),
  ObjectUtils_1 = require("../../../../../../Core/Utils/ObjectUtils"),
  TsBaseCharacter_1 = require("../../../../../Character/TsBaseCharacter"),
  MILLISECOND_TO_SECOND = 0.001;
class CharacterDitherEffectController {
  constructor(t, i) {
    (this.dQr = !1),
      (this.CQr = 1),
      (this.gQr = 0),
      (this.fQr = 1),
      (this.pQr = !1),
      (this.one = void 0),
      (this.nne = void 0),
      (this.OC = t),
      (this.pVe = i),
      ObjectUtils_1.ObjectUtils.IsValid(this.pVe) || (this.pQr = !1);
  }
  get vQr() {
    return !this.OC || !this.OC.IsValid() || this.OC.bHidden;
  }
  SetIsDisable(t, i = 0) {
    this.pQr !== t &&
      ((this.pQr = t)
        ? this.SetHiddenInGame(!0, !1)
        : (!this.dQr &&
          MathUtils_1.MathUtils.IsNearlyZero(
            this.CQr,
            MathUtils_1.MathUtils.KindaSmallNumber
          )
            ? this.SetHiddenInGame(!0, !1)
            : this.SetHiddenInGame(!1, !1),
          0 !== this.gQr && this.pVe.SetDitherEffect(this.CQr, this.gQr)));
  }
  EnterAppearEffect(t = 1, i = 3, s = !0) {
    this.vQr && this.SetHiddenInGame(!1, !0),
      (this.dQr = !0),
      (this.gQr = i),
      (this.fQr = t),
      s && ((this.CQr = 0), this.pVe.SetDitherEffect(this.CQr, this.gQr));
  }
  EnterDisappearEffect(t = 1, i = 3, s = !0) {
    this.vQr ||
      ((this.dQr = !0),
      (this.gQr = i),
      (this.fQr = -t),
      s && ((this.CQr = 1), this.pVe.SetDitherEffect(this.CQr, this.gQr)));
  }
  SetDitherEffect(t, i = 3, s = !0) {

    var ModManager_1 = require("../../../../../../Game/Manager/ModManager");
    if (ModManager_1.ModManager.Settings.AntiDither) {
      this.CQr = 1;
     } else {
       this.CQr = MathUtils_1.MathUtils.Clamp(t, 0, 1);
     }
    (this.gQr = i),
      this.pQr ||
        (this.SetHiddenInGame(
          MathUtils_1.MathUtils.IsNearlyZero(
            this.CQr,
            MathUtils_1.MathUtils.KindaSmallNumber
          ),
          s
        ),
        this.pVe?.SetDitherEffect(this.CQr, i));
  }
  SetHiddenInGame(t, i) {
    this.vQr !== t &&
      this.OC &&
      (t && i && this.dQr && ((this.dQr = !1), (this.CQr = 0)),
      this.OC instanceof TsBaseCharacter_1.default
        ? (i = this.OC.CharacterActorComponent) &&
          (t
            ? ((this.one = i.DisableActor(
                "[CharacterDitherEffectController.SetHiddenInGame]"
              )),
              (this.nne = i.DisableCollision(
                "[CharacterDitherEffectController.SetHiddenInGame]"
              )))
            : (this.one && (i.EnableActor(this.one), (this.one = void 0)),
              this.nne && (i.EnableCollision(this.nne), (this.nne = void 0))))
        : this.OC.IsValid() &&
          (this.OC.SetActorHiddenInGame(t),
          this.OC.SetActorEnableCollision(!t)));
  }
  Update(t) {
    !this.pQr &&
      this.dQr &&
      ((t = t * MILLISECOND_TO_SECOND * this.fQr), this.MQr(t, this.gQr));
  }
  MQr(t, i) {
    (this.CQr = MathUtils_1.MathUtils.Clamp(this.CQr + t, 0, 1)),
      0 === this.CQr && t < 0
        ? ((this.dQr = !1), this.SetHiddenInGame(!0, !0))
        : 1 === this.CQr && 0 < t && (this.dQr = !1),
      this.pVe.SetDitherEffect(this.CQr, i);
  }
  Clear() {
    (this.OC = void 0),
      this.pVe && this.pVe.ResetAllRenderingState(),
      (this.pVe = void 0),
      (this.one = void 0),
      (this.nne = void 0);
  }
}
exports.CharacterDitherEffectController = CharacterDitherEffectController;
//# sourceMappingURL=CharacterDitherEffectController.js.map
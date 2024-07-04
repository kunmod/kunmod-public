"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterDitherEffectController = void 0);
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils"),
  ObjectUtils_1 = require("../../../../../../Core/Utils/ObjectUtils"),
  TsBaseCharacter_1 = require("../../../../../Character/TsBaseCharacter"),
  MILLISECOND_TO_SECOND = 0.001;
class CharacterDitherEffectController {
  constructor(t, i) {
    (this.O$o = !1),
      (this.k$o = 1),
      (this.F$o = 0),
      (this.V$o = 1),
      (this.H$o = !1),
      (this.Ane = void 0),
      (this.Pne = void 0),
      (this.dHs = !1),
      (this.OC = t),
      (this.$6e = i),
      ObjectUtils_1.ObjectUtils.IsValid(this.$6e) || (this.H$o = !1);
  }
  get j$o() {
    return !this.OC || !this.OC.IsValid() || this.OC.bHidden;
  }
  get CurrentDitherValue() {
    return this.k$o;
  }
  get IsInAutoAnimationValue() {
    return this.O$o;
  }
  get DitherSpeedRateValue() {
    return this.V$o;
  }
  get IsDisableValue() {
    return this.H$o;
  }
  SetIsDisable(t, i = 0) {
    this.H$o !== t &&
      ((this.H$o = t)
        ? this.SetHiddenInGame(!0, !1)
        : (!this.O$o &&
          MathUtils_1.MathUtils.IsNearlyZero(
            this.k$o,
            MathUtils_1.MathUtils.KindaSmallNumber
          )
            ? this.SetHiddenInGame(!0, !1)
            : this.SetHiddenInGame(!1, !1),
          0 !== this.F$o && this.$6e.SetDitherEffect(this.k$o, this.F$o)));
  }
  EnterAppearEffect(t = 1, i = 3, s = !0) {
    this.j$o && this.SetHiddenInGame(!1, !0),
      (this.dHs = !1),
      (this.O$o = !0),
      (this.F$o = i),
      (this.V$o = t),
      s && ((this.k$o = 0), this.$6e.SetDitherEffect(this.k$o, this.F$o));
  }
  EnterDisappearEffect(t = 1, i = 3, s = !0) {
    this.j$o
      ? ((this.k$o = 0), (this.F$o = i), this.sHs())
      : ((this.O$o = !0),
        (this.F$o = i),
        (this.V$o = -t),
        s && ((this.k$o = 1), this.$6e.SetDitherEffect(this.k$o, this.F$o)));
  }
  SetDitherEffect(t, i = 3, s = !0) {
    var ModManager_1 = require("../../../../../../Game/Manager/ModManager");
    if (ModManager_1.ModManager.Settings.AntiDither) {
      this.F$o = 1;
    } else {
      this.F$o = MathUtils_1.MathUtils.Clamp(t, 0, 1);
    }
    return;
    (this.k$o = MathUtils_1.MathUtils.Clamp(t, 0, 1)),
      (this.F$o = i),
      this.H$o ||
        (this.SetHiddenInGame(
          MathUtils_1.MathUtils.IsNearlyZero(
            this.k$o,
            MathUtils_1.MathUtils.KindaSmallNumber
          ),
          s
        ),
        this.$6e?.SetDitherEffect(this.k$o, i));
  }
  SetHiddenInGame(t, i) {
    if (this.OC) {
      if (this.OC instanceof TsBaseCharacter_1.default) {
        var s = this.OC.CharacterActorComponent;
        if (!s) return;
        if (t) {
          if (this.Ane) return;
          (this.Ane = s.DisableActor(
            "[CharacterDitherEffectController.SetHiddenInGame]"
          )),
            s.IsNpcOutShowRange ||
              (this.Pne = s.DisableCollision(
                "[CharacterDitherEffectController.SetHiddenInGame]"
              ));
        } else
          this.Ane && (s.EnableActor(this.Ane), (this.Ane = void 0)),
            this.Pne && (s.EnableCollision(this.Pne), (this.Pne = void 0));
      } else if (this.OC.IsValid()) {
        if (this.j$o === t) return;
        this.OC.SetActorHiddenInGame(t), this.OC.SetActorEnableCollision(!t);
      }
      t && i && this.O$o && ((this.O$o = !1), (this.k$o = 0));
    }
  }
  Update(t) {
    !this.H$o &&
      this.O$o &&
      ((t = t * MILLISECOND_TO_SECOND * this.V$o), this.W$o(t, this.F$o));
  }
  sHs() {
    this.dHs ||
      ((this.dHs = !0),
      this.SetHiddenInGame(
        MathUtils_1.MathUtils.IsNearlyZero(
          this.k$o,
          MathUtils_1.MathUtils.KindaSmallNumber
        ),
        !0
      ),
      this.$6e.SetDitherEffect(this.k$o, this.F$o));
  }
  ForceResetDither() {
    (this.k$o = 0), (this.F$o = 1), this.sHs();
  }
  W$o(t, i) {
    (this.k$o = MathUtils_1.MathUtils.Clamp(this.k$o + t, 0, 1)),
      0 === this.k$o && t < 0
        ? ((this.O$o = !1), this.SetHiddenInGame(!0, !0))
        : 1 === this.k$o && 0 < t && (this.O$o = !1),
      this.$6e.SetDitherEffect(this.k$o, i);
  }
  Clear() {
    (this.OC = void 0),
      this.$6e && this.$6e.ResetAllRenderingState(),
      (this.$6e = void 0),
      (this.Ane = void 0),
      (this.Pne = void 0);
  }
}
exports.CharacterDitherEffectController = CharacterDitherEffectController;
//# sourceMappingURL=CharacterDitherEffectController.js.map

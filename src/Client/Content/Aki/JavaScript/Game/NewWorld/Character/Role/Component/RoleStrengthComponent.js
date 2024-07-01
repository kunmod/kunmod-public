"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, i, s) {
    var r,
      n = arguments.length,
      h =
        n < 3
          ? e
          : null === s
          ? (s = Object.getOwnPropertyDescriptor(e, i))
          : s;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      h = Reflect.decorate(t, e, i, s);
    else
      for (var a = t.length - 1; 0 <= a; a--)
        (r = t[a]) && (h = (n < 3 ? r(h) : 3 < n ? r(e, i, h) : r(e, i)) || h);
    return 3 < n && h && Object.defineProperty(e, i, h), h;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleStrengthComponent = exports.STRENGTH_TOLERANCE = void 0);
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  ModManager_1 = require("../../../../Manager/ModManager"),
  FormationAttributeController_1 = require("../../../../Module/Abilities/FormationAttributeController"),
  CharacterBuffIds_1 = require("../../Common/Component/Abilities/CharacterBuffIds"),
  CharacterUnifiedStateTypes_1 = require("../../Common/Component/Abilities/CharacterUnifiedStateTypes");
exports.STRENGTH_TOLERANCE = 0.01;
let RoleStrengthComponent = class RoleStrengthComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.Hte = void 0),
      (this.zJo = void 0),
      (this.Xte = void 0),
      (this.mbr = void 0),
      (this.zht = void 0),
      (this.wrn = -0),
      (this.Brn = -0),
      (this.brn = (t, e) => {
        if (
          this.zht?.GetPlayerId() ===
            ModelManager_1.ModelManager.CreatureModel.GetPlayerId() &&
          e
        )
          switch (this.mbr.PositionState) {
            case CharacterUnifiedStateTypes_1.ECharPositionState.Ground:
              return (
                this.mbr.MoveState ===
                  CharacterUnifiedStateTypes_1.ECharMoveState.Sprint &&
                  this.mbr.SetMoveState(
                    CharacterUnifiedStateTypes_1.ECharMoveState.Run
                  ),
                void this.EmptyStrengthPunish()
              );
            case CharacterUnifiedStateTypes_1.ECharPositionState.Climb:
              return void this.EmptyStrengthPunish();
            case CharacterUnifiedStateTypes_1.ECharPositionState.Air:
              var i;
              return (
                this.mbr.MoveState ===
                  CharacterUnifiedStateTypes_1.ECharMoveState.Glide &&
                  (i = this.Entity.GetComponent(50)).Valid &&
                  i.ExitGlideState(),
                void this.EmptyStrengthPunish()
              );
            case CharacterUnifiedStateTypes_1.ECharPositionState.Water:
              this.Xte.HasTag(400631093) ||
                ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity
                  ?.Id === this.Entity.Id;
              if (ModManager_1.ModManager.Settings.InfiniteStamina) return;
              this.Entity.CheckGetComponent(172)?.Drowning();
          }
      }),
      (this.CGr = (t, e) => {
        this.mbr.PositionState !==
          CharacterUnifiedStateTypes_1.ECharPositionState.Water &&
          this.Hte.IsMoveAutonomousProxy &&
          this.NewMoveStateStrengthDecrease(e);
      }),
      (this.qrn = (t) => {
        this.zJo.RemoveBuffByHandle(this.wrn),
          t !== BigInt(0) && this.UpdateStrengthDecrease(t);
      }),
      (this.gGr = (t, e) => {
        var i =
          FormationAttributeController_1.FormationAttributeController.GetValue(
            1
          );
        switch (
          (t === CharacterUnifiedStateTypes_1.ECharPositionState.Water &&
            this.zJo.RemoveBuffByHandle(this.wrn),
          e === CharacterUnifiedStateTypes_1.ECharPositionState.Water &&
            i < exports.STRENGTH_TOLERANCE &&
            this.brn(1, !0),
          e)
        ) {
          case CharacterUnifiedStateTypes_1.ECharPositionState.Air:
            this.zJo?.HasBuffAuthority() &&
              this.zJo.AddBuff(
                CharacterBuffIds_1.buffId.AirStrengthDecreaseRetain,
                {
                  InstigatorId: this.zJo.CreatureDataId,
                  Reason: "进入空中状态",
                }
              ),
              this.ToggleStrengthForbiddenGe(
                CharacterBuffIds_1.buffId.AirStrengthRecoverForbidden
              );
            break;
          case CharacterUnifiedStateTypes_1.ECharPositionState.Water:
          case CharacterUnifiedStateTypes_1.ECharPositionState.Climb:
            this.ToggleStrengthForbiddenGe(
              CharacterBuffIds_1.buffId.WaterClimbStrengthForbidden
            );
            break;
          case CharacterUnifiedStateTypes_1.ECharPositionState.Ground:
            this.Grn();
        }
      }),
      (this.h2r = (t) => {});
  }
  OnStart() {
    return (
      (this.Hte = this.Entity.CheckGetComponent(3)),
      (this.zJo = this.Entity.CheckGetComponent(157)),
      (this.Xte = this.Entity.CheckGetComponent(185)),
      (this.mbr = this.Entity.CheckGetComponent(158)),
      (this.zht = this.Entity.CheckGetComponent(0)),
      (this.Brn = -1),
      this.Nrn(),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged,
        this.CGr
      ),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.CharOnPositionStateChanged,
        this.gGr
      ),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.CharSwimStrengthChanged,
        this.qrn
      ),
      FormationAttributeController_1.FormationAttributeController.AddThresholdListener(
        1,
        this.brn,
        0,
        0,
        "Strength.RoleStrengthComponent"
      ),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.RoleOnStateInherit,
        this.h2r
      ),
      !0
    );
  }
  OnEnd() {
    return (
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Entity,
        EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged,
        this.CGr
      ),
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Entity,
        EventDefine_1.EEventName.CharOnPositionStateChanged,
        this.gGr
      ),
      FormationAttributeController_1.FormationAttributeController.RemoveThresholdListener(
        1,
        this.brn
      ),
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Entity,
        EventDefine_1.EEventName.RoleOnStateInherit,
        this.h2r
      ),
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Entity,
        EventDefine_1.EEventName.CharSwimStrengthChanged,
        this.qrn
      ),
      !0
    );
  }
  Nrn() {}
  EmptyStrengthPunish() {
    if (ModManager_1.ModManager.Settings.InfiniteStamina) return;
    this.zJo.HasBuffAuthority() &&
      this.zJo.GetBuffTotalStackById(
        CharacterBuffIds_1.buffId.EmptyStrengthPunish
      ) < 1 &&
      this.zJo.AddBuff(CharacterBuffIds_1.buffId.EmptyStrengthPunish, {
        InstigatorId: this.zJo.CreatureDataId,
        Reason: "体力耗尽",
      }),
      this.Xte.RemoveTag(388142570);
  }
  UpdateStrengthDecrease(t) {
    if (ModManager_1.ModManager.Settings.InfiniteStamina) return;
    this.wrn = this.zJo.AddBuffLocal(t, {
      InstigatorId: this.zJo.CreatureDataId,
      Reason: "RoleStrengthComponent.UpdateStrengthDecrease",
    });
  }
  ToggleStrengthForbiddenGe(t) {
    if (ModManager_1.ModManager.Settings.InfiniteStamina) return;
    this.zJo.RemoveBuffByHandle(this.Brn, -1),
      (this.Brn = this.zJo.AddBuffLocal(t, {
        InstigatorId: this.zJo.CreatureDataId,
        Reason: "RoleStrengthComponent.ToggleStrengthForbiddenGe",
      }));
  }
  Grn() {
    this.zJo.RemoveBuffByHandle(this.Brn, -1);
  }
  NewMoveStateStrengthDecrease(t) {
    switch ((this.zJo.RemoveBuffByHandle(this.wrn), t)) {
      case CharacterUnifiedStateTypes_1.ECharMoveState.Sprint:
        return void this.UpdateStrengthDecrease(
          CharacterBuffIds_1.buffId.SprintCost
        );
      case CharacterUnifiedStateTypes_1.ECharMoveState.FastClimb:
        this.UpdateStrengthDecrease(CharacterBuffIds_1.buffId.FastClimbCost);
        break;
      case CharacterUnifiedStateTypes_1.ECharMoveState.Glide:
        this.zJo.AddBuff(CharacterBuffIds_1.buffId.GlideCoolDown, {
          InstigatorId: this.zJo.CreatureDataId,
          Reason: "进入滑翔状态",
        }),
          this.UpdateStrengthDecrease(CharacterBuffIds_1.buffId.GlideCost);
    }
  }
};
(RoleStrengthComponent.ForbidStrengthRecoveryTimeExtra = 0.5),
  (RoleStrengthComponent = __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(88)],
    RoleStrengthComponent
  )),
  (exports.RoleStrengthComponent = RoleStrengthComponent);
//# sourceMappingURL=RoleStrengthComponent.js.map

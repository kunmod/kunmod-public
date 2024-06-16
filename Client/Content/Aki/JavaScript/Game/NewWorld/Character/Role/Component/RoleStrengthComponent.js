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
      (this.fte = void 0),
      (this.DXr = void 0),
      (this.Ste = void 0),
      (this.YDo = void 0),
      (this.nat = void 0),
      (this.yJo = -0),
      (this.IJo = -0),
      (this.TJo = (t, e) => {
        if (
          this.nat?.GetPlayerId() ===
            ModelManager_1.ModelManager.CreatureModel.GetPlayerId() &&
          e
        )
          switch (this.YDo.PositionState) {
            case CharacterUnifiedStateTypes_1.ECharPositionState.Ground:
              return (
                this.YDo.MoveState ===
                  CharacterUnifiedStateTypes_1.ECharMoveState.Sprint &&
                  this.YDo.SetMoveState(
                    CharacterUnifiedStateTypes_1.ECharMoveState.Run
                  ),
                void this.EmptyStrengthPunish()
              );
            case CharacterUnifiedStateTypes_1.ECharPositionState.Climb:
              return void this.EmptyStrengthPunish();
            case CharacterUnifiedStateTypes_1.ECharPositionState.Air:
              var i;
              return (
                this.YDo.MoveState ===
                  CharacterUnifiedStateTypes_1.ECharMoveState.Glide &&
                  (i = this.Entity.GetComponent(49)).Valid &&
                  i.ExitGlideState(),
                void this.EmptyStrengthPunish()
              );
            case CharacterUnifiedStateTypes_1.ECharPositionState.Water:
              this.Ste.ContainsTagById(400631093) ||
                ModelManager_1.ModelManager.FormationModel?.GetCurrentEntity
                  ?.Id === this.Entity.Id;
              if (ModManager_1.ModManager.Settings.InfiniteStamina == false) {
                this.Entity.CheckGetComponent(171)?.Drowning();
              }
          }
      }),
      (this.zUo = (t, e) => {
        this.YDo.PositionState !==
          CharacterUnifiedStateTypes_1.ECharPositionState.Water &&
          this.fte.IsMoveAutonomousProxy &&
          this.NewMoveStateStrengthDecrease(e);
      }),
      (this.LJo = (t) => {
        this.DXr.RemoveBuffByHandle(this.yJo),
          t !== BigInt(0) && this.UpdateStrengthDecrease(t);
      }),
      (this.ZUo = (t, e) => {
        var i =
          FormationAttributeController_1.FormationAttributeController.GetValue(
            1
          );
        switch (
          (t === CharacterUnifiedStateTypes_1.ECharPositionState.Water &&
            this.DXr.RemoveBuffByHandle(this.yJo),
          e === CharacterUnifiedStateTypes_1.ECharPositionState.Water &&
            i < exports.STRENGTH_TOLERANCE &&
            this.TJo(1, !0),
          e)
        ) {
          case CharacterUnifiedStateTypes_1.ECharPositionState.Air:
            this.DXr?.HasBuffAuthority() &&
              this.DXr.AddBuff(
                CharacterBuffIds_1.buffId.AirStrengthDecreaseRetain,
                {
                  InstigatorId: this.DXr.CreatureDataId,
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
            this.DJo();
        }
      }),
      (this.Vwo = (t) => {});
  }
  OnStart() {
    return (
      (this.fte = this.Entity.CheckGetComponent(3)),
      (this.DXr = this.Entity.CheckGetComponent(156)),
      (this.Ste = this.Entity.CheckGetComponent(184)),
      (this.YDo = this.Entity.CheckGetComponent(157)),
      (this.nat = this.Entity.CheckGetComponent(0)),
      (this.IJo = -1),
      this.RJo(),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged,
        this.zUo
      ),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.CharOnPositionStateChanged,
        this.ZUo
      ),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.CharSwimStrengthChanged,
        this.LJo
      ),
      FormationAttributeController_1.FormationAttributeController.AddThresholdListener(
        1,
        this.TJo,
        0,
        0,
        "Strength.RoleStrengthComponent"
      ),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.RoleOnStateInherit,
        this.Vwo
      ),
      !0
    );
  }
  OnEnd() {
    return (
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Entity,
        EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged,
        this.zUo
      ),
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Entity,
        EventDefine_1.EEventName.CharOnPositionStateChanged,
        this.ZUo
      ),
      FormationAttributeController_1.FormationAttributeController.RemoveThresholdListener(
        1,
        this.TJo
      ),
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Entity,
        EventDefine_1.EEventName.RoleOnStateInherit,
        this.Vwo
      ),
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Entity,
        EventDefine_1.EEventName.CharSwimStrengthChanged,
        this.LJo
      ),
      !0
    );
  }
  RJo() {}
  EmptyStrengthPunish() {
    if (ModManager_1.ModManager.Settings.InfiniteStamina == false) {
      this.DXr.HasBuffAuthority() &&
        this.DXr.GetBuffTotalStackById(
          CharacterBuffIds_1.buffId.EmptyStrengthPunish
        ) < 1 &&
        this.DXr.AddBuff(CharacterBuffIds_1.buffId.EmptyStrengthPunish, {
          InstigatorId: this.DXr.CreatureDataId,
          Reason: "体力耗尽",
        }),
        this.Ste.RemoveTagById(388142570);
    }
  }
  UpdateStrengthDecrease(t) {
    if (ModManager_1.ModManager.Settings.InfiniteStamina == false) {
      this.yJo = this.DXr.AddBuffLocal(t, {
        InstigatorId: this.DXr.CreatureDataId,
        Reason: "RoleStrengthComponent.UpdateStrengthDecrease",
      });
    }
  }
  ToggleStrengthForbiddenGe(t) {
    if (ModManager_1.ModManager.Settings.InfiniteStamina == false) {
      this.DXr.RemoveBuffByHandle(this.IJo, -1),
        (this.IJo = this.DXr.AddBuffLocal(t, {
          InstigatorId: this.DXr.CreatureDataId,
          Reason: "RoleStrengthComponent.ToggleStrengthForbiddenGe",
        }));
    }
  }
  DJo() {
    this.DXr.RemoveBuffByHandle(this.IJo, -1);
  }
  NewMoveStateStrengthDecrease(t) {
    switch ((this.DXr.RemoveBuffByHandle(this.yJo), t)) {
      case CharacterUnifiedStateTypes_1.ECharMoveState.Sprint:
        return void this.UpdateStrengthDecrease(
          CharacterBuffIds_1.buffId.SprintCost
        );
      case CharacterUnifiedStateTypes_1.ECharMoveState.FastClimb:
        this.UpdateStrengthDecrease(CharacterBuffIds_1.buffId.FastClimbCost);
        break;
      case CharacterUnifiedStateTypes_1.ECharMoveState.Glide:
        this.DXr.AddBuff(CharacterBuffIds_1.buffId.GlideCoolDown, {
          InstigatorId: this.DXr.CreatureDataId,
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

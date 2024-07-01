"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  MathUtils_1 = require("../../Core/Utils/MathUtils"),
  ObjectUtils_1 = require("../../Core/Utils/ObjectUtils"),
  EventDefine_1 = require("../Common/Event/EventDefine"),
  EventSystem_1 = require("../Common/Event/EventSystem"),
  //CharacterDitherEffectController_1 = require("../NewWorld/Character/Common/Component/Effect/CharacterDitherEffectController"),
  CharacterDitherEffectController_1 = require("../NewWorld/Character/Common/Component/Effect/CharacterDitherEffectController_New"),
  CustomMovementDefine_1 = require("../NewWorld/Character/Common/Component/Move/CustomMovementDefine");
class TsBaseCharacter extends UE.BaseCharacter {
  constructor() {
    super(...arguments),
      (this.CharRenderingComponent = void 0),
      (this.RenderType = 0),
      (this.TsCharacterDebugComponent = void 0),
      (this.NavigationInvoker = void 0),
      (this.InputComponentClass = void 0),
      (this.BasePlatform = void 0),
      (this.EntityId = 0),
      (this.FightManager = void 0),
      (this.DtHitEffect = void 0),
      (this.DtBaseMovementSetting = void 0),
      (this.DtNewBulletDataMain = void 0),
      (this.DtCharacterPart = void 0),
      (this.DtCameraConfig = void 0),
      (this.BattleSockets = void 0),
      (this.NormalSockets = void 0),
      (this.WeaponInEffect = void 0),
      (this.WeaponHideEffect = void 0),
      (this.FkData = void 0),
      (this.CharacterData = void 0),
      (this.Camp = 0),
      (this.PhysicsClothSimulateEnable = !0),
      (this.PhysicsClothSimulateDisableOneFrame = !1),
      (this.CachePoseEnableOneFrame = !1),
      (this.CacheTime = 0.6),
      (this.CharacterActorComponent = void 0),
      (this.SimpleNpcActorComponent = void 0),
      (this.DitherEffectControllerInternal = void 0);
  }
  TryAddTsAbilitySystemComponent() {
    this.AbilitySystemComponent ||
      (this.AbilitySystemComponent = this.AddComponentByClass(
        UE.BaseAbilitySystemComponent.StaticClass(),
        !1,
        MathUtils_1.MathUtils.DefaultTransform,
        !1
      ));
  }
  K2_OnMovementModeChanged(e, t, i, s) {
    this.CharacterActorComponent &&
      EventSystem_1.EventSystem.EmitWithTarget(
        this.CharacterActorComponent.Entity,
        EventDefine_1.EEventName.CharMovementModeChanged,
        this.CharacterActorComponent.Entity.Id,
        e,
        t,
        i,
        s
      );
  }
  ReceivePossessed(e) {
    super.ReceivePossessed(e),
      this.CharacterActorComponent &&
        e.IsA(UE.BP_CharacterController_C.StaticClass()) &&
        EventSystem_1.EventSystem.EmitWithTarget(
          this.CharacterActorComponent.Entity,
          EventDefine_1.EEventName.CharPossessed,
          this.CharacterActorComponent.Entity,
          e
        );
  }
  ReceiveUnpossessed(e) {
    super.ReceiveUnpossessed(e),
      this.CharacterActorComponent &&
        e.IsA(UE.BP_CharacterController_C.StaticClass()) &&
        EventSystem_1.EventSystem.EmitWithTarget(
          this.CharacterActorComponent.Entity,
          EventDefine_1.EEventName.CharUnpossessed,
          this.CharacterActorComponent.Entity,
          e
        );
  }
  GetEntityId() {
    return this.CharacterActorComponent
      ? this.CharacterActorComponent.Entity.Id
      : this.SimpleNpcActorComponent
      ? this.SimpleNpcActorComponent.Entity.Id
      : 0;
  }
  GetEntityIdNoBlueprint() {
    return this.CharacterActorComponent
      ? this.CharacterActorComponent.Entity.Id
      : this.SimpleNpcActorComponent
      ? this.SimpleNpcActorComponent.Entity.Id
      : 0;
  }
  GetEntityNoBlueprint() {
    return this.CharacterActorComponent
      ? this.CharacterActorComponent.Entity
      : this.SimpleNpcActorComponent
      ? this.SimpleNpcActorComponent.Entity
      : void 0;
  }
  Initialize() {}
  set DitherEffectController(e) {
    this.DitherEffectControllerInternal = e;
  }
  get DitherEffectController() {
    return (
      this.DitherEffectControllerInternal ||
        (this.DitherEffectControllerInternal =
          new CharacterDitherEffectController_1.CharacterDitherEffectController(
            this,
            this.CharRenderingComponent
          )),
      this.DitherEffectControllerInternal
    );
  }
  get HasDitherEffectController() {
    return void 0 !== this.DitherEffectControllerInternal;
  }
  SetDitherEffect(e, t = 3) {
    this.HasDitherEffectController &&
      this.DitherEffectController?.SetDitherEffect(e, t);
  }
  K2_UpdateCustomMovement(e) {
    switch (
      (super.K2_UpdateCustomMovement(e),
      this.CharacterMovement.CustomMovementMode)
    ) {
      case CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_CLIMB:
        EventSystem_1.EventSystem.EmitWithTarget(
          this.CharacterActorComponent.Entity,
          EventDefine_1.EEventName.CustomMoveClimb,
          e
        );
        break;
      case CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SWIM:
        EventSystem_1.EventSystem.EmitWithTarget(
          this.CharacterActorComponent.Entity,
          EventDefine_1.EEventName.CustomMoveSwim,
          e
        );
        break;
      case CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_GLIDE:
        EventSystem_1.EventSystem.EmitWithTarget(
          this.CharacterActorComponent.Entity,
          EventDefine_1.EEventName.CustomMoveGlide,
          e
        );
        break;
      case CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_PENDULUM:
        EventSystem_1.EventSystem.EmitWithTarget(
          this.CharacterActorComponent.Entity,
          EventDefine_1.EEventName.CustomMovePendulum,
          e
        );
        break;
      case CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SLIDE:
        EventSystem_1.EventSystem.EmitWithTarget(
          this.CharacterActorComponent.Entity,
          EventDefine_1.EEventName.CustomMoveSlide,
          e
        );
        break;
      case CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_UP_TO_WALK_ON_WATER:
        EventSystem_1.EventSystem.EmitWithTarget(
          this.CharacterActorComponent.Entity,
          EventDefine_1.EEventName.CustomMoveWalkOnWater,
          e
        );
        break;
      case CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_LEISURE:
        EventSystem_1.EventSystem.EmitWithTarget(
          this.CharacterActorComponent.Entity,
          EventDefine_1.EEventName.CustomMoveCatapult,
          e
        );
        break;
      case CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SOAR:
        EventSystem_1.EventSystem.EmitWithTarget(
          this.CharacterActorComponent.Entity,
          EventDefine_1.EEventName.CustomMoveSoar,
          e
        );
        break;
      case CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SKI:
        EventSystem_1.EventSystem.EmitWithTarget(
          this.CharacterActorComponent.Entity,
          EventDefine_1.EEventName.CustomMoveSki,
          e
        );
    }
  }
  FightCommand(e) {}
  ReceiveDestroyed() {
    ObjectUtils_1.ObjectUtils.IsValid(this) &&
      ((this.CharRenderingComponent = void 0),
      (this.NavigationInvoker = void 0),
      (this.InputComponentClass = void 0),
      (this.FightManager = void 0),
      (this.DtHitEffect = void 0),
      (this.DtBaseMovementSetting = void 0),
      (this.DtNewBulletDataMain = void 0),
      (this.DtCharacterPart = void 0),
      (this.BattleSockets = void 0),
      (this.NormalSockets = void 0),
      (this.WeaponInEffect = void 0),
      (this.WeaponHideEffect = void 0),
      (this.FkData = void 0),
      (this.CharacterData = void 0),
      (this.CharacterActorComponent = void 0),
      (this.DitherEffectControllerInternal = void 0),
      this.TsCharacterDebugComponent?.Destroy(),
      (this.TsCharacterDebugComponent = void 0),
      super.ReceiveDestroyed());
  }
}
exports.default = TsBaseCharacter;
//# sourceMappingURL=TsBaseCharacter.js.map

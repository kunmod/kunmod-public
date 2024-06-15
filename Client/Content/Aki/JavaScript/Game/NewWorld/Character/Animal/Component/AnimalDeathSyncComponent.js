"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, i, n) {
    var s,
      o = arguments.length,
      r =
        o < 3
          ? t
          : null === n
          ? (n = Object.getOwnPropertyDescriptor(t, i))
          : n;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      r = Reflect.decorate(e, t, i, n);
    else
      for (var h = e.length - 1; 0 <= h; h--)
        (s = e[h]) && (r = (o < 3 ? s(r) : 3 < o ? s(t, i, r) : s(t, i)) || r);
    return 3 < o && r && Object.defineProperty(t, i, r), r;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AnimalDeathSyncComponent = void 0);
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
puerts_1 = require("puerts"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  BaseDeathComponent_1 = require("../../Common/Component/Abilities/BaseDeathComponent"),
  CharacterUnifiedStateTypes_1 = require("../../Common/Component/Abilities/CharacterUnifiedStateTypes"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModManager_1 = require("../../../../Manager/ModManager"), //add my code
  DISAPPEAR_REMOVE_DELAY = 1600;
let AnimalDeathSyncComponent = class AnimalDeathSyncComponent extends BaseDeathComponent_1.BaseDeathComponent {
  constructor() {
    super(...arguments),
      (this.Ste = void 0),
      (this.YDo = void 0),
      (this.MontageComponent = void 0),
      (this.joe = (e) => {
        e.ReBulletData.Base.DamageId === BigInt(0) ||
          this.Ste.ContainsTagById(501201e3) || //功能.逻辑状态标识.无敌.通用无敌
          this.Ste.ContainsTagById(1008164187) || //行为状态.逻辑状态.濒死
          (this.Entity.GetComponent(38)?.DisableAi("动物死亡"),
          this.Ste?.AddTagById(1008164187),
          ControllerHolder_1.ControllerHolder.CreatureController.AnimalDieRequest(
            this.Entity.GetComponent(0).GetCreatureDataId(),
            this.Entity.GetComponent(1).ActorLocationProxy
          ));
      }),
      (this.ExecuteDeath = () =>
        !!super.ExecuteDeath() &&
        (this.Ste?.AddTagById(1008164187),
        this.YDo?.ResetCharState(),
        this.PlayDieAnimation(),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.CharOnRoleDead,
          this.Entity.Id
        ),
        EventSystem_1.EventSystem.EmitWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharOnRoleDeadTargetSelf
        ),
        !0)),
      (this.PlayDieAnimation = () => {
        this.Ste.ContainsTagById(-1943786195) || !this.MontageComponent?.Valid //行为状态.逻辑状态.不播放死亡动画
          ? this.OnDeathEnded()
          : this.Ste.ContainsTagById(1961456719) //行为状态.逻辑状态.消失
          ? TimerSystem_1.TimerSystem.Delay(
              this.OnDeathEnded,
              DISAPPEAR_REMOVE_DELAY
            )
          : this.YDo.PositionState ===
            CharacterUnifiedStateTypes_1.ECharPositionState.Water
          ? this.MontageComponent.PlayMontageWithCallBack(1, this.OnDeathEnded)
          : this.MontageComponent.PlayMontageWithCallBack(0, this.OnDeathEnded);
      }),
      (this.OnDeathEnded = () => {
        this.Entity.Disable(
          "[BaseAttributeComponent.DieAnimationFinished] 死亡动画播放完后隐藏"
        ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.DelayRemoveEntityFinished,
            this.Entity
          );
      });
  }
  OnStart() {
//animaltest
if(ModManager_1.ModManager.Settings.killAura){
  ControllerHolder_1.ControllerHolder.CreatureController.AnimalDieRequest(
    this.Entity.GetComponent(0).GetCreatureDataId(),
    this.Entity.GetComponent(1).ActorLocationProxy
  );
  //puerts_1.logger.warn("kun测试animalEntity",this.Entity);
  this.ExecuteDeath();
  this.Entity.CheckGetComponent(0).SetLivingStatus(Protocol_1.Aki.Protocol.LivingStatus.Dead);
}

    return (
      (this.Ste = this.Entity.CheckGetComponent(184)),
      (this.YDo = this.Entity.CheckGetComponent(89)),
      (this.MontageComponent = this.Entity.CheckGetComponent(22)),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.CharBeHit,
        this.joe
      ),
      this.Entity.CheckGetComponent(0).GetLivingStatus() ===
        Protocol_1.Aki.Protocol.LivingStatus.Dead &&
        TimerSystem_1.TimerSystem.Next(this.ExecuteDeath),
      !0
    );
  }
  OnEnd() {
    return (
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Entity,
        EventDefine_1.EEventName.CharBeHit,
        this.joe
      ),
      !0
    );
  }
};
(AnimalDeathSyncComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(152)],
  AnimalDeathSyncComponent
)),
  (exports.AnimalDeathSyncComponent = AnimalDeathSyncComponent);
//# sourceMappingURL=AnimalDeathSyncComponent.js.map

"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, o, i) {
    var s,
      r = arguments.length,
      n =
        r < 3
          ? e
          : null === i
          ? (i = Object.getOwnPropertyDescriptor(e, o))
          : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      n = Reflect.decorate(t, e, o, i);
    else
      for (var a = t.length - 1; 0 <= a; a--)
        (s = t[a]) && (n = (r < 3 ? s(n) : 3 < r ? s(e, o, n) : s(e, o)) || n);
    return 3 < r && n && Object.defineProperty(e, o, n), n;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MonsterBehaviorComponent = void 0);
const Log_1 = require("../../../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
  MathUtils_1 = require("../../../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  CombatMessage_1 = require("../../../../../Module/CombatMessage/CombatMessage"),
  ModManager_1 = require("../../../../../Manager/ModManager"), //add
  CombatDebugController_1 = require("../../../../../Utils/CombatDebugController"),
  CharacterUnifiedStateTypes_1 = require("../../../Common/Component/Abilities/CharacterUnifiedStateTypes");
let MonsterBehaviorComponent = class MonsterBehaviorComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.Hte = void 0),
      (this.Xte = void 0),
      (this.elt = void 0),
      (this.Llt = void 0),
      (this.EVr = void 0),
      (this.gGr = (t, e) => {
        var o;
        e !== CharacterUnifiedStateTypes_1.ECharPositionState.Water ||
          this.Xte.HasTag(-1714966381) ||
          ((e = this.Hte.ActorLocationProxy),
          ((o = Protocol_1.Aki.Protocol.jNn.create()).M3n = e),
          CombatMessage_1.CombatNet.Call(24697, this.Entity, o));
      }),
      (this.iin = () => {
        this.Hte.IsAutonomousProxy && this.oin();
      }),
      (this.rin = (t, e) => {
        // only hatred
        if (
          ModManager_1.ModManager.Settings.killAura &&
          ModManager_1.ModManager.Settings.killAuraState == 0
        ) {
          // var o, e
          // this.Entity.GetComponent(89).SetPositionState(3);
          var o, e;
          (e = this.Hte.ActorLocationProxy),
            ((o = Protocol_1.Aki.Protocol.jNn.create()).M3n = e);
          CombatMessage_1.CombatNet.Call(24697, this.Entity, o);
        }
        e &&
          (this.nin(!0),
          ModelManager_1.ModelManager.GameModeModel.IsMulti ||
            this.EVr.SetEnableMovementSync(!0),
          (e = this.Hte?.CreatureData.GetPbDataId()),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Character", 51, "怪物进入战斗，开启位置同步", [
              "PbDataId",
              e,
            ]),
          CombatDebugController_1.CombatDebugController.CombatInfo(
            "Ai",
            this.Entity,
            "怪物进入战斗状态"
          ));
      });
  }
  OnStart() {
    // infinity
    if (
      ModManager_1.ModManager.Settings.killAura &&
      ModManager_1.ModManager.Settings.killAuraState == 1
    ) {
      var o, e;
      (e = this.Hte.ActorLocationProxy),
        ((o = Protocol_1.Aki.Protocol.jNn.create()).M3n = e);
      CombatMessage_1.CombatNet.Call(24697, this.Entity, o);
    }
    return (
      (this.Hte = this.Entity.CheckGetComponent(3)),
      (this.elt = this.Entity.CheckGetComponent(157)),
      (this.Xte = this.Entity.CheckGetComponent(185)),
      (this.EVr = this.Entity.CheckGetComponent(57)),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.CharOnPositionStateChanged,
        this.gGr
      ),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.AiTaskWanderForResetEnd,
        this.iin
      ),
      (this.Llt = this.Xte.ListenForTagAddOrRemove(1996802261, this.rin)),
      !0
    );
  }
  OnActivate() {
    ModelManager_1.ModelManager.GameModeModel.IsMulti ||
      this.EVr?.SetEnableMovementSync(!1);
  }
  OnEnd() {
    return (
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Entity,
        EventDefine_1.EEventName.CharOnPositionStateChanged,
        this.gGr
      ),
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Entity,
        EventDefine_1.EEventName.AiTaskWanderForResetEnd,
        this.iin
      ),
      this.Llt && this.Llt.EndTask(),
      !(this.Llt = void 0)
    );
  }
  oin() {
    CombatDebugController_1.CombatDebugController.CombatInfo(
      "Ai",
      this.Entity,
      "怪物退出脱战状态"
    ),
      this.nin(!1),
      ModelManager_1.ModelManager.GameModeModel.IsMulti ||
        this.EVr.SetEnableMovementSync(!1);
    var t = this.Hte?.CreatureData.GetPbDataId(),
      t =
        (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Character", 51, "怪物退出战斗，关闭位置同步", [
            "PbDataId",
            t,
          ]),
        this.Entity.GetComponent(65));
    t?.StateMachineGroup?.Inited || this.ain();
  }
  ain() {
    CombatDebugController_1.CombatDebugController.CombatInfo(
      "Ai",
      this.Entity,
      "怪物重置状态"
    ),
      this.elt.RemoveAllBuffs("怪物脱战重置状态"),
      this.Entity.CheckGetComponent(158).InitCharState(),
      this.Entity.CheckGetComponent(69).ResetWeaponTag();
  }
  static BattleStateChangeNotify(t, e) {}
  nin(t) {
    CombatMessage_1.CombatNet.Call(
      19057,
      this.Entity,
      Protocol_1.Aki.Protocol.CNn.create({
        rkn: MathUtils_1.MathUtils.NumberToLong(
          this.Entity.GetComponent(0).GetCreatureDataId()
        ),
        g9n: t,
      })
    );
  }
};
__decorate(
  [CombatMessage_1.CombatNet.SyncHandle("_2n")],
  MonsterBehaviorComponent,
  "BattleStateChangeNotify",
  null
),
  (MonsterBehaviorComponent = __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(77)],
    MonsterBehaviorComponent
  )),
  (exports.MonsterBehaviorComponent = MonsterBehaviorComponent);
//# sourceMappingURL=MonsterBehaviorComponent.js.map

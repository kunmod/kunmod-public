"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, i, o) {
    var s,
      n = arguments.length,
      r =
        n < 3
          ? e
          : null === o
          ? (o = Object.getOwnPropertyDescriptor(e, i))
          : o;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      r = Reflect.decorate(t, e, i, o);
    else
      for (var a = t.length - 1; 0 <= a; a--)
        (s = t[a]) && (r = (n < 3 ? s(r) : 3 < n ? s(e, i, r) : s(e, i)) || r);
    return 3 < n && r && Object.defineProperty(e, i, r), r;
  };
Object.defineProperty(exports, "__esModule", {
  value: !0,
}),
  (exports.MonsterBehaviorComponent = void 0);
const Log_1 = require("../../../../../../Core/Common/Log"),
puerts_1 = require("puerts"),
  NetDefine_1 = require("../../../../../../Core/Define/Net/NetDefine"),
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
  MonsterFrozenComponent_1 =
    require("./MonsterFrozenComponent").MonsterFrozenComponent,
  CharacterUnifiedStateTypes_1 = require("../../../Common/Component/Abilities/CharacterUnifiedStateTypes");
let MonsterBehaviorComponent = class MonsterBehaviorComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.fte = void 0),
      (this.Ste = void 0),
      (this.aat = void 0),
      (this.wat = void 0),
      (this.ZNo = void 0),
      (this.ZUo = (t, e) => {
        var i;
        e !== CharacterUnifiedStateTypes_1.ECharPositionState.Water ||
          this.Ste.ContainsTagById(-1714966381) ||
          ((e = this.fte.ActorLocationProxy),
          ((i = Protocol_1.Aki.Protocol.MonsterDrownRequest.create()).Pos = e),
          CombatMessage_1.CombatNet.Call(
            NetDefine_1.ERequestMessageId.MonsterDrownRequest,
            this.Entity,
            i
          ));
      }),
      (this.B$o = () => {
        this.fte.IsAutonomousProxy && this.b$o();
      }),
      (this.q$o = (t, e) => {
        //add code
        if (//Only Hatred
          ModManager_1.ModManager.Settings.killAura === true &&
          ModManager_1.ModManager.Settings.killAuraState == 0
        ) {
          CombatMessage_1.CombatNet.Call(
            NetDefine_1.ERequestMessageId.MonsterDrownRequest,
            this.Entity,
            Protocol_1.Aki.Protocol.MonsterDrownRequest.create()
          );
          //puerts_1.logger.warn("测试Drown实体信息",this.Entity);
        }
        e &&
          (this.G$o(!0),
          ModelManager_1.ModelManager.GameModeModel.IsMulti ||
            this.ZNo.SetEnableMovementSync(!0),
          (e = this.fte?.CreatureData.GetPbDataId()),
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
    if (//Infinity
      ModManager_1.ModManager.Settings.killAura === true &&
      ModManager_1.ModManager.Settings.killAuraState == 1
    ) {
      CombatMessage_1.CombatNet.Call(
        NetDefine_1.ERequestMessageId.MonsterDrownRequest,
        this.Entity,
        Protocol_1.Aki.Protocol.MonsterDrownRequest.create()
      );
    }
    return (
      (this.fte = this.Entity.CheckGetComponent(3)),
      (this.aat = this.Entity.CheckGetComponent(156)),
      (this.Ste = this.Entity.CheckGetComponent(184)),
      (this.ZNo = this.Entity.CheckGetComponent(56)),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.CharOnPositionStateChanged,
        this.ZUo
      ),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.AiTaskWanderForResetEnd,
        this.B$o
      ),
      (this.wat = this.Ste.ListenForTagAddOrRemove(1996802261, this.q$o)),
      !0
    );
  }
  OnActivate() {
    ModelManager_1.ModelManager.GameModeModel.IsMulti ||
      this.ZNo?.SetEnableMovementSync(!1);
  }
  OnEnd() {
    return (
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Entity,
        EventDefine_1.EEventName.CharOnPositionStateChanged,
        this.ZUo
      ),
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Entity,
        EventDefine_1.EEventName.AiTaskWanderForResetEnd,
        this.B$o
      ),
      this.wat && this.wat.EndTask(),
      !(this.wat = void 0)
    );
  }
  b$o() {
    CombatDebugController_1.CombatDebugController.CombatInfo(
      "Ai",
      this.Entity,
      "怪物退出脱战状态"
    ),
      this.G$o(!1),
      ModelManager_1.ModelManager.GameModeModel.IsMulti ||
        this.ZNo.SetEnableMovementSync(!1);
    var t = this.fte?.CreatureData.GetPbDataId(),
      t =
        (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Character", 51, "怪物退出战斗，关闭位置同步", [
            "PbDataId",
            t,
          ]),
        this.Entity.GetComponent(64));
    t?.StateMachineGroup?.Inited || this.N$o();
  }
  N$o() {
    CombatDebugController_1.CombatDebugController.CombatInfo(
      "Ai",
      this.Entity,
      "怪物重置状态"
    ),
      this.aat.RemoveAllBuffs("怪物脱战重置状态"),
      this.Entity.CheckGetComponent(157).InitCharState(),
      this.Entity.CheckGetComponent(68).ResetWeaponTag();
  }
  static BattleStateChangeNotify(t, e) {}
  G$o(t) {
    CombatMessage_1.CombatNet.Call(
      NetDefine_1.ERequestMessageId.BattleStateChangeRequest,
      this.Entity,
      Protocol_1.Aki.Protocol.BattleStateChangeRequest.create({
        EntityId: MathUtils_1.MathUtils.NumberToLong(
          this.Entity.GetComponent(0).GetCreatureDataId()
        ),
        InBattle: t,
      })
    );
  }
};
__decorate(
  [CombatMessage_1.CombatNet.SyncHandle("BattleStateChangeNotify")],
  MonsterBehaviorComponent,
  "BattleStateChangeNotify",
  null
),
  (MonsterBehaviorComponent = __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(76)],
    MonsterBehaviorComponent
  )),
  (exports.MonsterBehaviorComponent = MonsterBehaviorComponent);
//# sourceMappingURL=MonsterBehaviorComponent.js.map

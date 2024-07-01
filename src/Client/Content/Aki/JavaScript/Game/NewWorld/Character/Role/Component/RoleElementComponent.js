"use strict";
var RoleElementComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, e, n, i) {
      var s,
        o = arguments.length,
        r =
          o < 3
            ? e
            : null === i
            ? (i = Object.getOwnPropertyDescriptor(e, n))
            : i;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        r = Reflect.decorate(t, e, n, i);
      else
        for (var h = t.length - 1; 0 <= h; h--)
          (s = t[h]) &&
            (r = (o < 3 ? s(r) : 3 < o ? s(e, n, r) : s(e, n)) || r);
      return 3 < o && r && Object.defineProperty(e, n, r), r;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleElementComponent = void 0);
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  ModManager_1 = require("../../../../Manager/ModManager"),
  FormationDataController_1 = require("../../../../Module/Abilities/FormationDataController"),
  PhantomUtil_1 = require("../../../../Module/Phantom/PhantomUtil"),
  CharacterAttributeTypes_1 = require("../../Common/Component/Abilities/CharacterAttributeTypes"),
  CharacterBuffIds_1 = require("../../Common/Component/Abilities/CharacterBuffIds");
var EAttributeId = Protocol_1.Aki.Protocol.KBs;
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
let RoleElementComponent =
  (RoleElementComponent_1 = class RoleElementComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.nXt = void 0),
        (this.$te = void 0),
        (this.elt = void 0),
        (this.oon = void 0),
        (this.ron = !1),
        (this.non = !1),
        (this.WQe = (t, e, n) => {
          var i = this.RoleElementType;
          e < Number.EPSILON ? (this.son = !1) : this.aon(e),
            EventSystem_1.EventSystem.EmitWithTarget(
              this.Entity,
              EventDefine_1.EEventName.CharOnElementEnergyChanged,
              i,
              e,
              n
            ),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.CharOnElementEnergyChanged,
              i,
              e,
              n
            );
        }),
        (this.W3r = (t) => {
          if (ModManager_1.ModManager.Settings.NoCD) {
            this.ron = true;
            return;
          } else {
            if (
              FormationDataController_1.FormationDataController.GlobalIsInFight
            ) {
              this.ron = true;
            }
          }
        }),
        (this.Zpe = (t) => {
          (this.ron = t) || (this.son = !1);
        }),
        (this.hon = () => {
          this.ron && (this.aon(this.RoleElementEnergy), (this.ron = !1));
        }),
        (this.lon = () => {
          this.nXt?.IsAutonomousProxy && this.ClearElementEnergy(this.Entity);
        }),
        (this.OJe = () => {
          this.nXt?.IsAutonomousProxy && this.ClearElementEnergy(this.Entity);
        });
    }
    OnStart() {
      (this.nXt = this.Entity.GetComponent(3)),
        (this.$te = this.Entity.CheckGetComponent(156)),
        (this.elt = this.Entity.CheckGetComponent(157)),
        this.$te.AddListener(this.uon, this.WQe, "RoleElementComponent"),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.RoleOnStateInherit,
          this.W3r
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.AllRevive,
          this.lon
        ),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.OnBattleStateChanged,
          this.Zpe
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharOnRoleDeadTargetSelf,
          this.OJe
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharHitLocal,
          this.hon
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharBeHitLocal,
          this.hon
        ),
        (this.oon = PhantomUtil_1.PhantomUtil.GetSummonedEntity(
          this.Entity,
          Protocol_1.Aki.Protocol.Oqs.Proto_ESummonTypeConcomitantCustom
        ));
      var t = this.oon?.Entity;
      if (ModManager_1.ModManager.Settings.NoCD) {
        this.ActivateFusion(this.Entity);
      }
      return (
        t &&
          !EventSystem_1.EventSystem.HasWithTarget(
            t,
            EventDefine_1.EEventName.CharHitLocal,
            this.hon
          ) &&
          EventSystem_1.EventSystem.AddWithTarget(
            t,
            EventDefine_1.EEventName.CharHitLocal,
            this.hon
          ),
        (this.ron = !0)
      );
    }
    OnEnd() {
      if (ModManager_1.ModManager.Settings.NoCD) {
        this.oon = void 0;
        this.ron = true;
        return true;
      }
      return (
        this.$te.RemoveListener(this.uon, this.WQe),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.RoleOnStateInherit,
          this.W3r
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.AllRevive,
          this.lon
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharOnRoleDeadTargetSelf,
          this.OJe
        ),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.OnBattleStateChanged,
          this.Zpe
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharHitLocal,
          this.hon
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharBeHitLocal,
          this.hon
        ),
        this.oon?.Valid &&
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.oon.Entity,
            EventDefine_1.EEventName.CharHitLocal,
            this.hon
          ),
        (this.oon = void 0),
        !(this.ron = !1)
      );
    }
    set son(t) {
      if (ModManager_1.ModManager.Settings.NoCD) {
        this.non = true;
        const buffId = RoleElementComponent_1.con.get(this.RoleElementType);
        this.elt.AddBuff(CharacterBuffIds_1.buffId.ActivateQte, {
          InstigatorId: this.elt.CreatureDataId,
          Reason: "RoleElementComponent获取激活QTE的Tag",
        });
        this.elt.AddBuff(t, {
          InstigatorId: this.elt.CreatureDataId,
          Reason: "RoleElementComponent激活Buff特效",
        });
      } else {
        this.non !== t &&
          this.nXt?.IsAutonomousProxy &&
          ((this.non = t),
          (t = RoleElementComponent_1.con.get(this.RoleElementType)),
          this.non
            ? (this.elt.AddBuff(
                ModelManager_1.ModelManager.GameModeModel.IsMulti
                  ? CharacterBuffIds_1.buffId.ActivateMultiQte
                  : CharacterBuffIds_1.buffId.ActivateQte,
                {
                  InstigatorId: this.elt.CreatureDataId,
                  Reason: "RoleElementComponent获取激活QTE的Tag",
                }
              ),
              this.elt.AddBuff(t, {
                InstigatorId: this.elt.CreatureDataId,
                Reason: "RoleElementComponent激活Buff特效",
              }))
            : (this.elt.RemoveBuff(
                CharacterBuffIds_1.buffId.ActivateQte,
                -1,
                "RoleElementComponent移除激活QTE的Tag"
              ),
              this.elt.RemoveBuff(t, -1, "RoleElementComponent移除Buff特效")));
      }
    }
    get son() {
      return this.non;
    }
    get RoleElementType() {
      return this.$te.GetCurrentValue(EAttributeId.Proto_ElementPropertyType);
    }
    get RoleElementEnergy() {
      if (ModManager_1.ModManager.Settings.NoCD) return Infinity;
      var t = this.uon;
      return 0 < t ? this.$te.GetCurrentValue(t) : 0;
    }
    get uon() {
      return (
        CharacterAttributeTypes_1.elementEnergyAttributeIds[
          this.RoleElementType - 1
        ] ?? 0
      );
    }
    aon(t) {
      t >= CharacterAttributeTypes_1.ELEMENT_POWER_MAX - Number.EPSILON &&
        ((t = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(
          this.Entity.Id,
          { ParamType: 1 }
        )?.IsControl()),
        !this.son) &&
        t &&
        FormationDataController_1.FormationDataController.GlobalIsInFight &&
        ((this.son = !0),
        this.elt.TriggerEvents(9, this.elt, {
          ElementType: this.RoleElementType,
        }));
    }
    ActivateFusion(t) {
      var t = t.CheckGetComponent(79),
        e = { ElementType: this.RoleElementType, ElementType2: t };
      this.elt.TriggerEvents(10, t.elt, e),
        t.elt.TriggerEvents(13, this.elt, e);
    }
    ClearElementEnergy(t) {
      2 < ModelManager_1.ModelManager.SceneTeamModel.GetTeamPlayerSize()
        ? this.elt.AddBuff(CharacterBuffIds_1.buffId.ConsumeQte, {
            InstigatorId: t.GetComponent(0).GetCreatureDataId(),
            Reason: "RoleQteComponent消耗QTE次数",
          })
        : this.elt.AddBuff(CharacterBuffIds_1.buffId.ElementClean, {
            InstigatorId: t.GetComponent(0).GetCreatureDataId(),
            Reason: "RoleQteComponent清空元素能量",
          });
    }
  });
(RoleElementComponent.con = new Map([
  [1, CharacterBuffIds_1.fillElementBuffId.Ice],
  [2, CharacterBuffIds_1.fillElementBuffId.Fire],
  [3, CharacterBuffIds_1.fillElementBuffId.Thunder],
  [4, CharacterBuffIds_1.fillElementBuffId.Wind],
  [5, CharacterBuffIds_1.fillElementBuffId.Light],
  [6, CharacterBuffIds_1.fillElementBuffId.Dark],
])),
  (RoleElementComponent = RoleElementComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(79)],
      RoleElementComponent
    )),
  (exports.RoleElementComponent = RoleElementComponent);
//# sourceMappingURL=RoleElementComponent.js.map

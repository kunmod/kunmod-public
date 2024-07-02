"use strict";
var BaseAttributeComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, e, r, i) {
      var s,
        a = arguments.length,
        o =
          a < 3
            ? e
            : null === i
            ? (i = Object.getOwnPropertyDescriptor(e, r))
            : i;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        o = Reflect.decorate(t, e, r, i);
      else
        for (var n = t.length - 1; 0 <= n; n--)
          (s = t[n]) &&
            (o = (a < 3 ? s(o) : 3 < a ? s(e, r, o) : s(e, r)) || o);
      return 3 < a && o && Object.defineProperty(e, r, o), o;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BaseAttributeComponent = exports.AttributeSnapshot = void 0);
const Log_1 = require("../../../../../../Core/Common/Log"),
  Stats_1 = require("../../../../../../Core/Common/Stats"),
  CommonDefine_1 = require("../../../../../../Core/Define/CommonDefine"),
  EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
  StatDefine_1 = require("../../../../../Common/StatDefine"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  CombatDebugController_1 = require("../../../../../Utils/CombatDebugController"),
  AbilityUtils_1 = require("./AbilityUtils"),
  puerts_1 = require("puerts"),
  ModManager_1 = require("../../../../../Manager/ModManager"),
  ModUtils_1 = require("../../../../../Manager/ModFuncs/ModUtils"),
  EntityFilter_1 = require("../../../../../Manager/ModFuncs/EntityFilter"),
  EntityManager_1 = require("../../../../../Manager/ModFuncs/EntityManager"),
  Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
  CharacterAttributeTypes_1 = require("./CharacterAttributeTypes");
var EAttributeId = Protocol_1.Aki.Protocol.KBs;

class AttributeSnapshot {
  constructor() {
    (this.BaseValues = {}), (this.CurrentValues = {});
  }
  GetBaseValue(t) {
    return this.BaseValues[CharacterAttributeTypes_1.EAttributeId[t]];
  }
  GetCurrentValue(t) {
    return this.CurrentValues[CharacterAttributeTypes_1.EAttributeId[t]];
  }
}
exports.AttributeSnapshot = AttributeSnapshot;
let BaseAttributeComponent =
  (BaseAttributeComponent_1 = class BaseAttributeComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.BaseValues = new Array()),
        (this.CurrentValues = new Array()),
        (this.ModifierLists = new Array()),
        (this.BoundsLockerMap = new Map()),
        (this.BaseValueListenerMap = new Map()),
        (this.CurrentValueListenerMap = new Map()),
        (this.AnyBaseValueListenerSet = new Set()),
        (this.AnyCurrentValueListenerSet = new Set());
    }
    OnCreate() {
      this.BaseValues = new Array(CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX);
      for (let t = 0; t < CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX; ++t)
        this.BaseValues[t] = 0;
      this.CurrentValues = new Array(
        CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX
      );
      for (let t = 0; t < CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX; ++t)
        this.CurrentValues[t] = 0;
      this.ModifierLists = new Array(
        CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX
      );
      for (let t = 0; t < CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX; ++t)
        this.ModifierLists[t] = new Map();
      return !0;
    }
    OnTick(t) {
      this.AutoRecoverAttr(t);
    }
    SetBaseValue(t, e) {
      let r = e;
      var i,
        s,
        e = this.Gbr(t),
        e =
          (void 0 !== e && (r = this.Nbr(t, r, e)),
          CharacterAttributeTypes_1.attrsNotClampZero.includes(t) ||
            (r = Math.max(r, 0)),
          (r = Math.floor(r)),
          this.BaseValues[t]);
      e !== r &&
        ((this.BaseValues[t] = r),
        (i = this.CurrentValues[t]),
        this.UpdateCurrentValue(t),
        (s = this.CurrentValues[t]),
        this.DispatchBaseValueEvent(t, r, e),
        this.DispatchCurrentValueEvent(t, s, i));
    }
    AddBaseValue(t, e) {
      this.SetBaseValue(t, this.BaseValues[t] + e);
    }
    GetBaseValue(t) {
      return this.BaseValues[t];
    }
    GetCurrentValue(t) {
      let original = this.CurrentValues[t];
      let b = EAttributeId;
      let SPList = EntityFilter_1.EntityFilter.HeroEnergyFilterList;
      if (!ModManager_1.ModManager.Settings.NoCD) return original;
      switch (t) {

        // case b.EAttributeType_MAX:
        // case b.Proto_Atk:
        // case b.Proto_AutoAttackSpeed:
        //   return 3*1e4;
        // case b.Proto_BrakingFrictionFactor:
        // case b.Proto_CastAttackSpeed:
        // case b.Proto_CdReduse:
        // case b.Proto_Crit:
        //case b.Proto_CritDamage:
        // case b.Proto_DamageChange:
        // case b.Proto_DamageChangeAuto:
        // case b.Proto_DamageChangeCast:
        // case b.Proto_DamageChangeElement1:
        // case b.Proto_DamageChangeElement2:
        // case b.Proto_DamageChangeElement3:
        // case b.Proto_DamageChangeElement4:
        // case b.Proto_DamageChangeElement5:
        // case b.Proto_DamageChangeElement6:
        // case b.Proto_DamageChangeNormalSkill:
        // case b.Proto_DamageChangePhantom:
        // case b.Proto_DamageChangePhys:
        // case b.Proto_DamageChangeQte:
        // case b.Proto_DamageChangeUltra:
        // case b.Proto_DamageReduce:
        // case b.Proto_DamageReduceElement1:
        // case b.Proto_DamageReduceElement2:
        // case b.Proto_DamageReduceElement3:
        // case b.Proto_DamageReduceElement4:
        // case b.Proto_DamageReduceElement5:
        // case b.Proto_DamageReduceElement6:
        // case b.Proto_DamageReducePhys:
        // case b.Proto_DamageResistanceElement1:
        // case b.Proto_DamageResistanceElement2:
        // case b.Proto_DamageResistanceElement3:
        // case b.Proto_DamageResistanceElement4:
        // case b.Proto_DamageResistanceElement5:
        // case b.Proto_DamageResistanceElement6:
        // case b.Proto_DamageResistancePhys:
        // case b.Proto_Def:
        // case b.Proto_EAttributeType_None:
        // case b.Proto_ElementPower1:
        // case b.Proto_ElementPower2:
        // case b.Proto_ElementPower3:
        // case b.Proto_ElementPower4:
        // case b.Proto_ElementPower5:
        // case b.Proto_ElementPower6:
        // case b.Proto_ElementPropertyType:
        case b.Proto_Energy: // cant return energy max for some reason some character got stuck energy not even max yet lol
        // case b.Proto_EnergyEfficiency:
        case b.Proto_EnergyMax:
          return 12000; // we just gonna say both of this energy has 12000
        // case b.Proto_GravityScale:
        // case b.Proto_Hardness:
        // case b.Proto_HardnessChange:
        // case b.Proto_HardnessMax:
        // case b.Proto_HardnessPunishTime:
        // case b.Proto_HardnessRecover:
        // case b.Proto_HardnessReduce:
        // case b.Proto_HealChange:
        // case b.Proto_HealedChange:
        // case b.Proto_IgnoreDamageResistanceElement1:
        // case b.Proto_IgnoreDamageResistanceElement2:
        // case b.Proto_IgnoreDamageResistanceElement3:
        // case b.Proto_IgnoreDamageResistanceElement4:
        // case b.Proto_IgnoreDamageResistanceElement5:
        // case b.Proto_IgnoreDamageResistanceElement6:
        // case b.Proto_IgnoreDamageResistancePhys:
        // case b.Proto_IgnoreDefRate:
        // case b.Proto_Jump:
        // case b.Proto_Life:
        // case b.Proto_Lv:
        // case b.Proto_Mass:
        // case b.Proto_ParalysisTime:
        // case b.Proto_ParalysisTimeMax:
        // case b.Proto_ParalysisTimeRecover:
        // case b.Proto_Rage:
        // case b.Proto_RageChange:
        // case b.Proto_RageMax:
        // case b.Proto_RagePunishTime:
        // case b.Proto_RageRecover:
        // case b.Proto_RageReduce:
        // case b.Proto_ReactionChange1:
        // case b.Proto_ReactionChange2:
        // case b.Proto_ReactionChange3:
        // case b.Proto_ReactionChange4:
        // case b.Proto_ReactionChange5:
        // case b.Proto_ReactionChange6:
        // case b.Proto_ReactionChange7:
        // case b.Proto_ReactionChange8:
        // case b.Proto_ReactionChange9:
        // case b.Proto_ReactionChange10:
        // case b.Proto_ReactionChange11:
        // case b.Proto_ReactionChange12:
        // case b.Proto_ReactionChange13:
        // case b.Proto_ReactionChange14:
        // case b.Proto_ReactionChange15:
        // case b.Proto_ReactionEfficiency:
        // case b.Proto_Sheild:
        // case b.Proto_SheildDamageChange:
        // case b.Proto_SheildDamageReduce:
        // case b.Proto_SkillToughRatio:
        // case b.Proto_SpecialDamageChange:
        case b.Proto_SpecialEnergy1: {
          var main_char = EntityManager_1.EntityManager.GetPlayerBluePrint();
          if (main_char && main_char.includes("Sanhua")) {
            // ModUtils_1.ModUtils.KunLog(original);
            return SPList.BP_Sanhua_C_2147474277;
          }
          return this.CurrentValues[b.Proto_SpecialEnergy1Max];
        }
        // case b.Proto_SpecialEnergy1Max:
        // case b.Proto_SpecialEnergy2:
          // return this.CurrentValues[b.Proto_SpecialEnergy2Max]
        // case b.Proto_SpecialEnergy2Max:
        // case b.Proto_SpecialEnergy3:
          // return this.CurrentValues[b.Proto_SpecialEnergy3Max]
        // case b.Proto_SpecialEnergy3Max:
        // case b.Proto_SpecialEnergy4:
          // return this.CurrentValues[b.Proto_SpecialEnergy4Max]
        // case b.Proto_SpecialEnergy4Max:
          // case b.Proto_StatusBuildUp1:
          // case b.Proto_StatusBuildUp1Max:
          // case b.Proto_StatusBuildUp2:
          // case b.Proto_StatusBuildUp2Max:
          // case b.Proto_StatusBuildUp3:
          // case b.Proto_StatusBuildUp3Max:
          // case b.Proto_StatusBuildUp4:
          // case b.Proto_StatusBuildUp4Max:
          // case b.Proto_StatusBuildUp5:
          // case b.Proto_StatusBuildUp5Max:
          // case b.Proto_Strength:
          // case b.Proto_StrengthClimb:
          // case b.Proto_StrengthClimbJump:
          // case b.Proto_StrengthFastClimb:
          // case b.Proto_StrengthFastClimbCost:
          // case b.Proto_StrengthFastSwim:
          // case b.Proto_StrengthGliding:
          // case b.Proto_StrengthMax:
          // case b.Proto_StrengthPunishTime:
          // case b.Proto_StrengthRecover:
          // case b.Proto_StrengthRun:
          // case b.Proto_StrengthSwim:
          // case b.Proto_Tough:
          // case b.Proto_ToughChange:
          // case b.Proto_ToughMax:
          // case b.Proto_ToughRecover:
          // case b.Proto_ToughRecoverDelayTime:
          // case b.Proto_ToughReduce:
          // case b.Proto_WeakTime:
          // case b.R4n:
          // case b.Tkn:
        default:
          return original;
      }
    }
    Gbr(t) {
      var e = CharacterAttributeTypes_1.attrsBaseValueClamp.get(t);
      return (
        e ||
        ((e = CharacterAttributeTypes_1.attrsBaseValueClampMax.get(t))
          ? this.GetCurrentValue(e)
          : void 0)
      );
    }
    SyncValueFromServer(t, e, r) {
      var i = this.BaseValues[t],
        s = (i !== e && (this.BaseValues[t] = e), this.CurrentValues[t]);
      (this.CurrentValues[t] = r),
        this.DispatchBaseValueEvent(t, e, i),
        this.DispatchCurrentValueEvent(t, r, s);
    }
    UpdateCurrentValue(t) {
      let e = this.Obr(t);
      var r = CharacterAttributeTypes_1.attrsCurrentValueClamp.get(t),
        r =
          (r && (e = Math.min(e, r)),
          CharacterAttributeTypes_1.attrsNotClampZero.includes(t) ||
            (e = Math.max(e, 0)),
          this.CurrentValues[t]);
      r !== e && (this.CurrentValues[t] = e);
    }
    TakeSnapshot() {
      var e = new AttributeSnapshot();
      for (let t = 1; t < CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX; t++) {
        var r = CharacterAttributeTypes_1.EAttributeId[t];
        r &&
          ((e.BaseValues[r] = this.BaseValues[t] ?? 0),
          (e.CurrentValues[r] = this.CurrentValues[t] ?? 0));
      }
      return e;
    }
    AddModifier(t, e) {
      var r, i;
      return t <=
        CharacterAttributeTypes_1.EAttributeId.Proto_EAttributeType_None ||
        t >= CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX
        ? -1
        : ((r = BaseAttributeComponent_1.ModifierHandleGenerator++),
          (this.ModifierLists[t] = this.ModifierLists[t] ?? new Map()),
          this.ModifierLists[t].set(r, e),
          (e = this.CurrentValues[t]),
          this.UpdateCurrentValue(t),
          (i = this.CurrentValues[t]),
          this.DispatchCurrentValueEvent(t, i, e),
          r);
    }
    RemoveModifier(t, e) {
      var r;
      this.ModifierLists[t]?.delete(e) &&
        ((e = this.CurrentValues[t]),
        this.UpdateCurrentValue(t),
        (r = this.CurrentValues[t]),
        this.DispatchCurrentValueEvent(t, r, e));
    }
    *GetAllModifiers(t) {
      if (this.ModifierLists[t])
        for (const e of this.ModifierLists[t].values()) yield e;
    }
    Obr(t) {
      var e = this.BaseValues[t];
      if (!this.ModifierLists[t]) return e;
      let r = 0,
        i = 0,
        s = 1;
      var a = this.CheckIfNeedAdvanceMultiply(t);
      for (const n of this.GetAllModifiers(t)) {
        let e = 0;
        switch (n.Type) {
          case 0:
            e = n.Value1;
            break;
          case 1:
            i += n.Value1;
            break;
          case 2:
          case 4: {
            let t = n.SnapshotSource;
            void 0 === t &&
              (t = AbilityUtils_1.AbilityUtils.GetAttrValue(
                0 === n.SourceEntity
                  ? this
                  : ModelManager_1.ModelManager.CreatureModel.GetEntity(
                      n.SourceEntity
                    )?.Entity?.GetComponent(156),
                n.SourceAttributeId,
                n.SourceCalculationType
              ));
            var o = n.Min;
            if (o && (t -= o) <= 0) break;
            (o = n.Ratio),
              (o =
                (o && (t /= o),
                (e =
                  t *
                    n.Value1 *
                    CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND +
                  n.Value2),
                n.Max));
            if ((o && e > o && (e = o), 4 === n.Type)) return e;
            break;
          }
          case 3:
            return n.Value1;
          case 9:
            s *= n.Value1 * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
        }
        0 !== e &&
          (a
            ? (s *= e * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND + 1)
            : (r += e));
      }
      return Math.floor(
        (e * (i * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND + 1) + r) * s
      );
    }
    SyncRecoverPropFromServer(t, e, r, i, s) {
      var a = CharacterAttributeTypes_1.attrsAutoRecoverSpeedMap.get(t),
        o = CharacterAttributeTypes_1.attrsAutoRecoverMaxMap.get(t);
      a && o
        ? (this.SyncValueFromServer(a, i, i),
          this.SyncValueFromServer(o, r, r),
          (a = e + i * s * CommonDefine_1.SECOND_PER_MILLIONSECOND),
          this.SyncValueFromServer(t, a, a))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error("Battle", 36, "自动属性未注册", ["属性", t]);
    }
    AutoRecoverAttr(t) {
      for (var [
        e,
        r,
      ] of CharacterAttributeTypes_1.attrsAutoRecoverSpeedMap.entries()) {
        r = this.GetCurrentValue(r);
        0 !== r &&
          this.AddBaseValue(e, r * t * CommonDefine_1.SECOND_PER_MILLIONSECOND);
      }
    }
    AddBoundsLocker(t, e, r) {
      let i = this.BoundsLockerMap.get(t);
      return (
        i || this.BoundsLockerMap.set(t, (i = new Map())),
        i.has(r)
          ? Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Battle",
              23,
              "重复添加属性BoundsLock",
              ["attrId", t],
              ["handle", r]
            )
          : (i.set(r, e), this.SetBaseValue(t, this.BaseValues[t])),
        r
      );
    }
    RemoveBoundsLocker(t, e) {
      var r = this.BoundsLockerMap.get(t);
      return (
        !!r && !!r.delete(e) && (this.SetBaseValue(t, this.BaseValues[t]), !0)
      );
    }
    *GetAllBoundsLocker(t) {
      t = this.BoundsLockerMap.get(t);
      if (t) for (const e of t.values()) yield e;
    }
    Nbr(t, e, r) {
      let i = e,
        s = void 0,
        a = r;
      for (const n of this.GetAllBoundsLocker(t)) {
        var o;
        n.LockLowerBounds &&
          ((o = n.LowerPercent * r + n.LowerOffset), (s = Math.max(s ?? o, o))),
          n.LockUpperBounds &&
            ((o = n.UpperPercent * r + n.UpperOffset),
            (a = Math.min(a ?? o, o)));
      }
      return (
        void 0 !== a && (i = Math.min(a, i)),
        (i = void 0 !== s ? Math.max(s, i) : i)
      );
    }
    AddIntervalLock(t, e, r, i, s) {
      var a;
      r !== CharacterAttributeTypes_1.EAttributeId.Proto_Life &&
        ((i = {
          LockUpperBounds: !(a = {
            LockUpperBounds: !0,
            LockLowerBounds: !1,
            UpperPercent: i * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND,
            UpperOffset: s,
            LowerPercent: 0,
            LowerOffset: 0,
          }),
          LockLowerBounds: !0,
          UpperPercent: 1,
          UpperOffset: 0,
          LowerPercent: i * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND,
          LowerOffset: s,
        }),
        this.AddBoundsLocker(r, 0 === t ? a : i, e));
    }
    RemoveIntervalLock(t, e, r) {
      this.RemoveBoundsLocker(r, e);
    }
    AddStateAttributeLock(t, e, r, i) {
      r = {
        LockUpperBounds: !0,
        LockLowerBounds: !0,
        UpperPercent: r * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND,
        UpperOffset: i,
        LowerPercent: r * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND,
        LowerOffset: i,
      };
      this.AddBoundsLocker(e, r, t);
    }
    RemoveStateAttributeLock(t, e) {
      this.RemoveBoundsLocker(e, t);
    }
    AddListener(t, e, r) {
      var i = this.CurrentValueListenerMap.get(t);
      i
        ? i.add(e)
        : ((i = new Set()).add(e), this.CurrentValueListenerMap.set(t, i));
    }
    AddListeners(t, e, r) {
      t.forEach((t) => {
        this.AddListener(t, e, r);
      });
    }
    RemoveListener(t, e) {
      t = this.CurrentValueListenerMap.get(t);
      return !!t && (t.delete(e), !0);
    }
    RemoveListeners(t, e) {
      t.forEach((t) => {
        this.RemoveListener(t, e);
      });
    }
    AddGeneralListener(t) {
      this.AnyCurrentValueListenerSet.add(t);
    }
    RemoveGeneralListener(t) {
      this.AnyCurrentValueListenerSet.delete(t);
    }
    DispatchBaseValueEvent(e, t, r) {
      if (r !== t) {
        var i = this.BaseValueListenerMap.get(e);
        if (i) {
          BaseAttributeComponent_1.kbr.get(e) ||
            BaseAttributeComponent_1.kbr.set(e, void 0);
          for (const s of i)
            try {
              s(e, t, r);
            } catch (t) {
              CombatDebugController_1.CombatDebugController.CombatErrorWithStack(
                "Attribute",
                this.Entity,
                "属性回调异常",
                t,
                ["属性", e]
              );
            }
        }
        for (const a of this.AnyBaseValueListenerSet)
          try {
            a(e, t, r);
          } catch (t) {
            CombatDebugController_1.CombatDebugController.CombatErrorWithStack(
              "Attribute",
              this.Entity,
              "全局属性回调异常",
              t,
              ["属性", e]
            );
          }
      }
    }
    DispatchCurrentValueEvent(e, t, r) {
      if (r !== t) {
        var i = this.CurrentValueListenerMap.get(e);
        if (i) {
          BaseAttributeComponent_1.Vbr.get(e) ||
            BaseAttributeComponent_1.Vbr.set(e, void 0);
          for (const s of i)
            try {
              s(e, t, r);
            } catch (t) {
              CombatDebugController_1.CombatDebugController.CombatErrorWithStack(
                "Attribute",
                this.Entity,
                "属性回调异常",
                t,
                ["属性", e]
              );
            }
        }
        for (const a of this.AnyCurrentValueListenerSet)
          try {
            a(e, t, r);
          } catch (t) {
            CombatDebugController_1.CombatDebugController.CombatErrorWithStack(
              "Attribute",
              this.Entity,
              "全局属性回调异常",
              t,
              ["属性", e]
            );
          }
      }
    }
    CheckIfNeedAdvanceMultiply(t) {
      switch (t) {
        case CharacterAttributeTypes_1.EAttributeId.Proto_CdReduse:
        case CharacterAttributeTypes_1.EAttributeId.Proto_ToughChange:
        case CharacterAttributeTypes_1.EAttributeId.Proto_SkillToughRatio:
        case CharacterAttributeTypes_1.EAttributeId.R4n:
        case CharacterAttributeTypes_1.EAttributeId.Proto_AutoAttackSpeed:
        case CharacterAttributeTypes_1.EAttributeId.Proto_CastAttackSpeed:
          return !0;
        default:
          return !1;
      }
    }
    GetLockDebugString() {
      let i = "";
      return (
        this.BoundsLockerMap.forEach((t, r) => {
          t.forEach((t, e) => {
            t.LockLowerBounds &&
              (i += `属性:${r} 下限:${100 * t.LowerPercent}%+${
                t.LowerOffset
              } handle:${e}
`),
              t.LockUpperBounds &&
                (i += `属性:${r} 上限:${100 * t.UpperPercent}%+${
                  t.UpperOffset
                } handle:${e}
`);
          });
        }),
        i
      );
    }
  });
(BaseAttributeComponent.ModifierHandleGenerator = 100),
  (BaseAttributeComponent.kbr = new Map()),
  (BaseAttributeComponent.Fbr = void 0),
  (BaseAttributeComponent.Vbr = new Map()),
  (BaseAttributeComponent.Hbr = void 0),
  (BaseAttributeComponent = BaseAttributeComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(155)],
      BaseAttributeComponent
    )),
  (exports.BaseAttributeComponent = BaseAttributeComponent);
//# sourceMappingURL=BaseAttributeComponent.js.map

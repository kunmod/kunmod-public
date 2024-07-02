"use strict";
var CharacterDamageComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (e, t, a, r) {
      var i,
        o = arguments.length,
        s =
          o < 3
            ? t
            : null === r
            ? (r = Object.getOwnPropertyDescriptor(t, a))
            : r;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        s = Reflect.decorate(e, t, a, r);
      else
        for (var n = e.length - 1; 0 <= n; n--)
          (i = e[n]) &&
            (s = (o < 3 ? i(s) : 3 < o ? i(t, a, s) : i(t, a)) || s);
      return 3 < o && s && Object.defineProperty(t, a, s), s;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterDamageComponent =
    exports.BaseAttributeSet =
    exports.DamageCompPayload =
    exports.SnapshotPayload =
      void 0);
const Log_1 = require("../../../../../../Core/Common/Log"),
  Stats_1 = require("../../../../../../Core/Common/Stats"),
  Time_1 = require("../../../../../../Core/Common/Time"),
  CommonDefine_1 = require("../../../../../../Core/Define/CommonDefine"),
  CommonParamById_1 = require("../../../../../../Core/Define/ConfigCommon/CommonParamById"),
  DamageById_1 = require("../../../../../../Core/Define/ConfigQuery/DamageById"),
  DamagePayloadById_1 = require("../../../../../../Core/Define/ConfigQuery/DamagePayloadById"),
  Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent"),
  EntitySystem_1 = require("../../../../../../Core/Entity/EntitySystem"),
  RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
  RandomSystem_1 = require("../../../../../../Core/Random/RandomSystem"),
  TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem"),
  MathUtils_1 = require("../../../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  ModManager_1 = require("../../../../../Manager/ModManager"),
  CombatMessage_1 = require("../../../../../Module/CombatMessage/CombatMessage"),
  SceneTeamController_1 = require("../../../../../Module/SceneTeam/SceneTeamController"),
  GameplayAbilityVisionControl_1 = require("../Vision/GA/GameplayAbilityVisionControl"),
  AbilityUtils_1 = require("./AbilityUtils"),
  ActiveBuffConfigs_1 = require("./Buff/ActiveBuffConfigs"),
  CharacterAbilityComponent_1 = require("./CharacterAbilityComponent"),
  CharacterAttributeTypes_1 = require("./CharacterAttributeTypes"),
  CharacterBuffIds_1 = require("./CharacterBuffIds"),
  CharacterDamageCalculations_1 = require("./CharacterDamageCalculations"),
  ExtraEffectBaseTypes_1 = require("./ExtraEffect/ExtraEffectBaseTypes"),
  ExtraEffectDamageAccumulation_1 = require("./ExtraEffect/ExtraEffectDamageAccumulation"),
  ExtraEffectDamageAugment_1 = require("./ExtraEffect/ExtraEffectDamageAugment"),
  ExtraEffectDamageImmune_1 = require("./ExtraEffect/ExtraEffectDamageImmune"),
  ExtraEffectDamageModifier_1 = require("./ExtraEffect/ExtraEffectDamageModifier"),
  ExtraEffectDamageShare_1 = require("./ExtraEffect/ExtraEffectDamageShare"),
  ExtraEffectSnapModifier_1 = require("./ExtraEffect/ExtraEffectSnapModifier"),
  damageDataPayloadIdDefault = BigInt(0);
class SnapshotPayload {
  constructor() {
    (this.Target = void 0),
      (this.Attacker = void 0),
      (this.TargetSnapshot = void 0),
      (this.AttackerSnapshot = void 0);
  }
}
exports.SnapshotPayload = SnapshotPayload;
class DamageCompPayload {
  constructor() {
    (this.Target = void 0), (this.Attacker = void 0);
  }
}
exports.DamageCompPayload = DamageCompPayload;
class BaseAttributeSet {}
exports.BaseAttributeSet = BaseAttributeSet;
let CharacterDamageComponent =
  (CharacterDamageComponent_1 = class CharacterDamageComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.$te = void 0),
        (this.Xte = void 0),
        (this.elt = void 0),
        (this.vqr = void 0),
        (this.Mqr = void 0),
        (this.Sqr = void 0),
        (this.rDr = void 0),
        (this.mbr = void 0),
        (this.ActorComponent = void 0),
        (this.zht = void 0),
        (this.Eqr = void 0),
        (this.yqr = void 0),
        (this.Iqr = 0),
        (this.Tqr = 0),
        (this.Lqr = new Map());
    }
    get OwnerAttributeComponent() {
      return this.$te;
    }
    get OwnerBuffComponent() {
      return this.elt;
    }
    OnStart() {
      return (
        (this.$te = this.Entity.CheckGetComponent(156)),
        (this.Xte = this.Entity.CheckGetComponent(185)),
        (this.elt = this.Entity.CheckGetComponent(157)),
        (this.vqr = this.Entity.CheckGetComponent(51)),
        (this.Mqr = this.Entity.CheckGetComponent(47)),
        (this.Sqr = this.Entity.GetComponent(83)),
        (this.rDr = this.Entity.CheckGetComponent(33)),
        (this.mbr = this.Entity.CheckGetComponent(158)),
        (this.ActorComponent = this.Entity.CheckGetComponent(3)),
        (this.zht = this.Entity.CheckGetComponent(0)),
        (this.Iqr = this.Dqr()),
        !0
      );
    }
    OnClear() {
      return this.Rqr(), !0;
    }
    OnTick(e) {
      -this.ActorComponent.ActorVelocityProxy.Z >= this.Iqr
        ? 0 === this.Tqr && (this.Tqr = Time_1.Time.WorldTimeSeconds)
        : (this.Tqr = 0);
    }
    ExecuteBulletDamage(e, t, a) {
      var r,
        e = EntitySystem_1.EntitySystem.Get(e),
        i = e.GetBulletInfo(),
        o = DamageById_1.configDamageById.GetConfig(t.DamageDataId);
      return o
        ? (((r = new ExtraEffectBaseTypes_1.RequirementPayload()).BulletId =
            BigInt(i.BulletRowName)),
          (r.SkillId = Number(i.BulletInitParams.SkillId)),
          (r.BulletTags = i.Tags ?? []),
          (r.PartId = t.PartId),
          0 <= r.PartId &&
            (r.PartTag = this.Entity.GetComponent(58).GetPartByIndex(
              r.PartId
            ).PartTag?.TagId),
          (i = {
            ...t,
            DamageData: o,
            Attacker: t.Attacker.CheckGetComponent(18),
            SourceType: Protocol_1.Aki.Protocol.yTs.Proto_FromBullet,
            IsReaction: o.PayloadId !== damageDataPayloadIdDefault,
            Accumulation:
              ExtraEffectDamageAccumulation_1.DamageAccumulation.GetAccumulation(
                e.Id
              ),
            PartId: t.PartId,
            RandomSeed:
              ModelManager_1.ModelManager.PlayerInfoModel.GetRandomSeed(),
          }),
          this.Pqr(i),
          this.ProcessDamage(r, i, a))
        : { DamageResult: 0, ToughResult: 0 };
    }
    ExecuteBuffDamage(e, t, a) {
      e.Attacker =
        e.Attacker?.GetComponent(47)?.GetAttributeHolder() ?? e.Attacker;
      var r,
        i,
        o = DamageById_1.configDamageById.GetConfig(e.DamageDataId);
      o &&
        ((r = new ExtraEffectBaseTypes_1.RequirementPayload()).PartialAssign(t),
        (i = {
          ...e,
          DamageData: o,
          Attacker: e.Attacker.CheckGetComponent(18),
          SourceType: Protocol_1.Aki.Protocol.yTs.Proto_FromEffect,
          IsAddEnergy: !1,
          IsCounterAttack: !1,
          ForceCritical: !1,
          IsBlocked: !1,
          IsReaction: !1,
          PartId: -1,
          ExtraRate: 1,
          Accumulation: 0,
          RandomSeed:
            ModelManager_1.ModelManager.PlayerInfoModel.GetRandomSeed(),
        }),
        this.Pqr(i),
        this?.ProcessDamage(r, i, a),
        ExtraEffectDamageShare_1.DamageShare.ApplyBuffShare(
          this.Entity,
          o,
          e,
          t,
          a
        ));
    }
    ExecuteBuffShareDamage(e, t, a, r) {
      var i,
        o = DamageById_1.configDamageById.GetConfig(e.DamageDataId);
      o &&
        ((i = new ExtraEffectBaseTypes_1.RequirementPayload()).PartialAssign(t),
        (t = {
          ...e,
          DamageData: o,
          Attacker: e.Attacker.CheckGetComponent(18),
          SourceType: Protocol_1.Aki.Protocol.yTs.Proto_FromEffect,
          IsAddEnergy: !1,
          IsCounterAttack: !1,
          ForceCritical: !1,
          IsBlocked: !1,
          IsReaction: !1,
          PartId: -1,
          ExtraRate: a,
          Accumulation: 0,
          RandomSeed:
            ModelManager_1.ModelManager.PlayerInfoModel.GetRandomSeed(),
        }),
        this.Pqr(t),
        this.ProcessDamage(i, t, r));
    }
    ProcessDamage(t, a, e) {
      if (ModManager_1.ModManager.Settings.AlwaysCrit) {
        a.ForceCritical = true
      }
      if (this.Xte.HasTag(1918148596) && 0 === a.DamageData.ImmuneType)
        return { DamageResult: 0, ToughResult: 0 };
      var r = a.Attacker;
      0 < t.SkillId &&
        ((o = r.rDr.GetSkillInfo(t.SkillId)?.SkillGenre), (t.SkillGenre = o)),
        (t.DamageGenre = a.DamageData.Type),
        (t.CalculateType = a.DamageData.CalculateType);
      const i = this.Bqr(r);
      var o = this.GetLocalDamage(t, a, i);
      let s = void 0;
      0 <= a.PartId &&
        (s = this.Entity.GetComponent(58)?.GetPartByIndex(a.PartId));
      (r =
        (5 === t.SkillGenre
          ? this.GetExtraToughRate("ToughRateOnCounter")
          : this.GetExtraToughRate("ToughRate")) /
        CharacterAttributeTypes_1.PER_TEN_THOUSAND),
        this.GetServerDamage(
          a,
          t,
          (e) => {
            this.Entity?.Valid &&
              a.Attacker?.Entity?.Valid &&
              (this.bqr(e, a, t),
              this.qqr(e, a, t, i),
              s?.OnDamage(e.Damage, a.ForceCritical, a.Attacker.Entity, !1));
          },
          e
        ),
        (e = this.Gqr(a, i, r));
      return { DamageResult: o.Damage, ToughResult: e };
    }
    static OnDamageExecuteNotify(e, t) {
      ModelManager_1.ModelManager.CreatureModel.GetEntity(
        MathUtils_1.MathUtils.LongToNumber(t.q4n)
      )
        ?.Entity?.GetComponent(18)
        ?.ProcessRemoteDamage(t);
    }
    ProcessRemoteDamage(e) {
      var t,
        a = e.ZVn ?? {},
        r = ModelManager_1.ModelManager.CreatureModel.GetEntity(
          MathUtils_1.MathUtils.LongToNumber(e.e9n)
        ),
        i = DamageById_1.configDamageById.GetConfig(
          MathUtils_1.MathUtils.LongToBigInt(e.t9n)
        ),
        o = r?.Entity?.GetComponent(18);
      i && r && o
        ? ((r = {
            ShieldCoverDamage: e.qIs,
            DamageData: i,
            Damage: -e.xIs,
            IsCounterAttack: !1,
            IsReaction: !1,
            IsCritical: e.bIs,
            IsTargetKilled: e.BIs,
            IsBlocked: !1,
            SourceType: a.i9n ?? Protocol_1.Aki.Protocol.yTs.Proto_FromEffect,
            IsImmune:
              e.GIs ===
              Protocol_1.Aki.Protocol.FOs.Proto_EDamageImmune_BuffEffectElement,
          }),
          ((t = new ExtraEffectBaseTypes_1.RequirementPayload()).BulletId =
            MathUtils_1.MathUtils.LongToBigInt(a.wVn ?? -1)),
          (t.SkillId = a.vkn),
          (t.BulletTags = [...(a.r9n ?? [])]),
          (t.PartId = e.o9n),
          (t.DamageGenre = i.Type),
          (t.CalculateType = i.CalculateType),
          (t.IsTargetKilled = r.IsTargetKilled),
          0 < t.SkillId &&
            (t.SkillGenre = o.rDr.GetSkillInfo(t.SkillId)?.SkillGenre ?? -1),
          0 <= t.PartId &&
            ((a = this.Entity.GetComponent(58)),
            (t.PartTag = a?.GetPartByIndex(t.PartId).PartTag?.TagId)),
          (t.IsCritical = ModManager_1.ModManager.Settings.AlwaysCrit ? 1 : r.IsCritical),
          (t.IsImmune = r.IsImmune),
          (i = this.ActorComponent.ActorLocation),
          this.bqr(r, { Attacker: o, HitPosition: i }, t),
          this.Nqr(r, o, t))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Battle",
            20,
            "Error when process remote damage: Unexpected damageId or invalid target/attacker.",
            ["DamageId", e.t9n],
            ["attackerCreatureId", e.e9n],
            ["targetCreatureId", e.q4n]
          );
    }
    Bqr(e) {
      var t = e.Mqr.GetAttributeHolder().CheckGetComponent(156).TakeSnapshot(),
        a = this.Mqr.GetAttributeHolder().CheckGetComponent(156).TakeSnapshot();
      return {
        Attacker: this.Oqr(e),
        AttackerSnapshot: t,
        Target: this,
        TargetSnapshot: a,
      };
    }
    Oqr(e) {
      return GameplayAbilityVisionControl_1.GameplayAbilityVisionControl
        .VisionControlHandle &&
        e.zht.SummonType ===
          Protocol_1.Aki.Protocol.Oqs.Proto_ESummonTypeConcomitantPhantomRole
        ? ModelManager_1.ModelManager.CreatureModel.GetEntity(
            e.zht.GetSummonerId()
          ).Entity?.GetComponent(18)
        : e;
    }
    kqr(e, t, a, r, i) {
      var o,
        s = e.DamageData,
        n = e.SkillLevel,
        h = AbilityUtils_1.AbilityUtils.GetLevelValue(s.RateLv, n, 0),
        m = e.ExtraRate;
      if (e.IsReaction)
        return (o = DamagePayloadById_1.configDamagePayloadById.GetConfig(
          s.PayloadId
        ))
          ? CharacterDamageCalculations_1.Calculation.ReactionDamageRateCalculation(
              t.AttackerSnapshot,
              t.TargetSnapshot,
              h,
              s.Element,
              o,
              t.AttackerSnapshot.CurrentValues.Proto_ReactionEfficiency,
              a
            )
          : (Log_1.Log.CheckError() &&
              Log_1.Log.Error("Character", 20, "找不到结算参数表对应id", [
                "id",
                s.PayloadId,
              ]),
            0);
      let l = 1;
      h = this.Entity.GetComponent(0);
      return (
        ModelManager_1.ModelManager.GameModeModel.IsMulti &&
          h.GetEntityType() === Protocol_1.Aki.Protocol.HBs.Proto_Monster &&
          (l =
            ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamSize() <= 2
              ? CommonParamById_1.configCommonParamById.GetFloatConfig(
                  "MutiWorldDamageRatio2"
                )
              : CommonParamById_1.configCommonParamById.GetFloatConfig(
                  "MutiWorldDamageRatio3"
                )),
        CharacterDamageCalculations_1.Calculation.CalculateFormula(
          e,
          t,
          s,
          n,
          a,
          m,
          r,
          i,
          l
        )
      );
    }
    LKo(e, t) {
      var a = e.DamageData,
        r = e.SkillLevel,
        i = e.ExtraRate;
      let o = 1;
      var s = this.Entity.GetComponent(0);
      return (
        ModelManager_1.ModelManager.GameModeModel.IsMulti &&
          s.GetEntityType() === Protocol_1.Aki.Protocol.HBs.Proto_Monster &&
          (o =
            ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamSize() <= 2
              ? CommonParamById_1.configCommonParamById.GetFloatConfig(
                  "MutiWorldDamageRatio2"
                )
              : CommonParamById_1.configCommonParamById.GetFloatConfig(
                  "MutiWorldDamageRatio3"
                )),
        CharacterDamageCalculations_1.Calculation.CalculateFormula(
          e,
          t,
          a,
          r,
          !1,
          i,
          0,
          0,
          o
        )
      );
    }
    Fqr(e, t, a) {
      var r = t.DamageData,
        i =
          a.Attacker.Sqr?.GetWeaponType() ??
          ExtraEffectBaseTypes_1.DEFAULT_WEAPON_TYPE_NOT_PASS,
        r =
          (e.PartialAssign({
            SmashType: r.SmashType,
            ElementType: r.Element,
            WeaponType: i,
          }),
          this.Hqr(e, t, a),
          ExtraEffectSnapModifier_1.SnapModifier.PreCriticalModify(e, a),
          this.JudgeCritical(t, a.AttackerSnapshot));
      return ExtraEffectSnapModifier_1.SnapModifier.PostCriticalModify(e, a), r;
    }
    JudgeCritical(e, t) {
      switch (e.DamageData.CalculateType) {
        case 1:
        case 2:
          return !1;
      }
      return (
        !!e.ForceCritical ||
        ((e.RandomSeed = RandomSystem_1.default.GetNextRandomSeed(
          e.RandomSeed,
          2
        )),
        Math.abs(e.RandomSeed % CharacterAttributeTypes_1.PER_TEN_THOUSAND) <=
          t.CurrentValues.Proto_Crit)
      );
    }
    Hqr(e, t, a) {
      t.IsCounterAttack &&
        (a.Attacker.elt.TriggerEvents(11, a.Target.elt, e),
        this.elt.TriggerEvents(12, a.Attacker.elt, e));
    }
    GetLocalDamage(e, t, a) {
      let r = void 0;
      return (r =
        1 === t.DamageData.CalculateType
          ? this.GetLocalHeal(e, t, a)
          : this.GetLocalHurt(e, t, a));
    }
    GetLocalHurt(e, t, a) {
      var r = this.Fqr(e, t, a),
        i = ExtraEffectDamageAugment_1.DamageAugment.ApplyEffects(e, a),
        o =
          ExtraEffectSnapModifier_1.DamageAmplifyOnHit.ApplyEffects(e, a) +
          ExtraEffectSnapModifier_1.DamageAmplifyOnBeHit.ApplyEffects(e, a);
      let s = this.kqr(t, a, r, i, o);
      i = ExtraEffectDamageModifier_1.DamageModifier.ApplyEffects(e, a);
      s = i.IsSuccessful ? i.Result : s;
      let n = !1;
      ExtraEffectDamageImmune_1.DamageImmune.ApplyEffects(e, t, a) &&
        ((n = !0), (s = 0));
      o = {
        ...t,
        Damage: s,
        ShieldCoverDamage: 0,
        IsCritical: ModManager_1.ModManager.Settings.AlwaysCrit ? true : r,
        IsTargetKilled: !1,
        IsImmune: n,
      };
      return (
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Battle",
            20,
            "本地伤害计算",
            ["伤害值", o.Damage],
            ["结算id", t.DamageData.Id],
            ["是否弹刀", t.IsCounterAttack],
            ["弹刀对应技能MessageId", t.CounterSkillMessageId]
          ),
        o
      );
    }
    GetLocalHeal(e, t, a) {
      this.Fqr(e, t, a);
      (e = this.LKo(t, a)),
        (a = {
          ...t,
          Damage: e,
          ShieldCoverDamage: 0,
          IsCritical: !1,
          IsTargetKilled: !1,
          IsImmune: !1,
        });
      return (
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Battle", 20, "本地治疗计算", ["damage", a.Damage]),
        a
      );
    }
    GetServerDamage(a, r, i, e) {
      var t = a.Attacker;
      const o = a.DamageData,
        s = Protocol_1.Aki.Protocol.W2n.create({
          t9n: MathUtils_1.MathUtils.BigIntToLong(o.Id),
          n9n: a.SkillLevel,
          e9n: MathUtils_1.MathUtils.NumberToLong(
            t.Entity.GetComponent(0).GetCreatureDataId()
          ),
          q4n: MathUtils_1.MathUtils.NumberToLong(
            this.Entity.GetComponent(0).GetCreatureDataId()
          ),
          s9n: a.IsAddEnergy,
          a9n: a.IsCounterAttack,
          h9n: ModManager_1.ModManager.Settings.AlwaysCrit ? true : a.ForceCritical,
          l9n: a.IsBlocked,
          o9n: a.PartId,
          _9n: a.CounterSkillMessageId
            ? MathUtils_1.MathUtils.BigIntToLong(a.CounterSkillMessageId)
            : 0,
          ZVn: {
            i9n: a.SourceType,
            wVn: MathUtils_1.MathUtils.BigIntToLong(r.BulletId ?? BigInt(-1)),
            r9n: r.BulletTags.filter((e) => void 0 !== e),
            vkn: r.SkillId,
          },
          S8n: ModelManager_1.ModelManager.PlayerInfoModel.AdvanceRandomSeed(0),
        });
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Battle",
          20,
          "伤害Request",
          ["攻击方", MathUtils_1.MathUtils.LongToBigInt(s.e9n)],
          ["受击方", MathUtils_1.MathUtils.LongToBigInt(s.q4n)],
          ["结算id", MathUtils_1.MathUtils.LongToBigInt(s.t9n)],
          ["isBlocked", s.l9n],
          ["skillLevel", s.n9n],
          ["是否弹刀", s.a9n],
          ["部位Id", s.o9n],
          ["弹刀对应技能MessageId", a.CounterSkillMessageId],
          ["RandomSeed", s.S8n]
        ),
        CombatMessage_1.CombatNet.Call(
          28150,
          this.Entity,
          s,
          (e) => {
            var t;
            e &&
              e.GIs !==
                Protocol_1.Aki.Protocol.FOs.Proto_EDamageImmune_Invincible &&
              ((t = {
                ...a,
                Damage: -e.xIs,
                ShieldCoverDamage: e.qIs,
                IsCritical: e.bIs,
                IsTargetKilled: e.BIs,
                IsImmune:
                  e.GIs ===
                  Protocol_1.Aki.Protocol.FOs
                    .Proto_EDamageImmune_BuffEffectElement,
              }),
              (r.IsCritical = ModManager_1.ModManager.Settings.AlwaysCrit ? 1 : t.IsCritical),
              (r.IsImmune = t.IsImmune),
              (r.IsTargetKilled = t.IsTargetKilled),
              Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug(
                  "Battle",
                  20,
                  "伤害Response",
                  ["攻击方", MathUtils_1.MathUtils.LongToBigInt(s.e9n)],
                  ["受击方", MathUtils_1.MathUtils.LongToBigInt(s.q4n)],
                  ["结算id", o.Id],
                  ["伤害值", t.Damage],
                  ["killed", t.IsTargetKilled],
                  ["errorCode", e.lkn]
                ),
              0 === e.lkn) &&
              i(t);
          },
          e,
          void 0
        );
    }
    qqr(e, t, a, r) {
      this.jqr(t, r), this.Nqr(e, t.Attacker, a);
    }
    bqr(e, t, a) {
      var r = t.Attacker.Entity,
        i = this.Entity,
        o = e.Damage,
        s = e.DamageData,
        o = [r, i, o, s, a, e, t.HitPosition];
      1 === s.CalculateType &&
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.FormationPanelUIShowRoleHeal,
          i
        ),
        SceneTeamController_1.SceneTeamController.EmitEvent(
          i,
          EventDefine_1.EEventName.CharBeDamage,
          ...o
        ),
        SceneTeamController_1.SceneTeamController.EmitEvent(
          r,
          EventDefine_1.EEventName.CharDamage,
          ...o
        );
    }
    Nqr(e, t, a) {
      var r = t.elt;
      e.SourceType !== Protocol_1.Aki.Protocol.yTs.Proto_FromEffect &&
        (t?.elt.TriggerEvents(0, this.elt, a), this.elt.TriggerEvents(1, r, a)),
        e.IsTargetKilled && t?.elt.TriggerEvents(6, r, a),
        ExtraEffectDamageAccumulation_1.DamageAccumulation.ApplyEffects(
          e,
          a,
          t,
          this
        );
    }
    jqr(e, t) {
      var a = e.Attacker?.$te;
      if (a && e.IsAddEnergy) {
        var r,
          i,
          o = e.SkillLevel,
          e = e.DamageData;
        for ([r, i] of [
          e.SpecialEnergy1,
          e.SpecialEnergy2,
          e.SpecialEnergy3,
          e.SpecialEnergy4,
        ].entries()) {
          var s = CharacterAttributeTypes_1.specialEnergyIds[r],
            n = AbilityUtils_1.AbilityUtils.GetLevelValue(i, o, 0);
          a.AddBaseValue(s, n);
        }
      }
    }
    Gqr(t, e, a = 1) {
      var r = t.Attacker,
        i = e.AttackerSnapshot,
        e = e.TargetSnapshot,
        t = AbilityUtils_1.AbilityUtils.GetLevelValue(
          t.DamageData.ToughLv,
          t.SkillLevel,
          0
        ),
        i = CharacterDamageCalculations_1.Calculation.ToughCalculation(
          i,
          e,
          t * a
        );
      if (0 !== i) {
        let e = 1;
        t = this.Entity.GetComponent(0);
        ModelManager_1.ModelManager.GameModeModel.IsMulti &&
          t.IsMonster() &&
          (e =
            ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamSize() <= 2
              ? CommonParamById_1.configCommonParamById.GetFloatConfig(
                  "MutiWorldToughRatio2"
                )
              : CommonParamById_1.configCommonParamById.GetFloatConfig(
                  "MutiWorldToughRatio3"
                )),
          this.$te.AddBaseValue(
            CharacterAttributeTypes_1.EAttributeId.Proto_Tough,
            -i * e
          );
      }
      return (
        0 <
        this.$te.GetCurrentValue(
          CharacterAttributeTypes_1.EAttributeId.Proto_Tough
        )
          ? 0 < e.CurrentValues.Proto_ToughRecoverDelayTime &&
            0 !== i &&
            this.elt.AddBuff(CharacterBuffIds_1.buffId.ToughRecoverDelay, {
              InstigatorId:
                r.zht?.GetCreatureDataId() ??
                ActiveBuffConfigs_1.NULL_INSTIGATOR_ID,
              ApplyType:
                CharacterAbilityComponent_1.EBuffApplyType.Proto_UseExtraTime,
              Reason: "韧性扣减后触发",
            })
          : !this.Xte.HasTag(-1112841587) &&
            0 < e.CurrentValues.Proto_WeakTime &&
            (this.Zqr(!0),
            (a = this.$te.GetCurrentValue(
              CharacterAttributeTypes_1.EAttributeId.Proto_WeakTime
            )),
            (this.yqr = TimerSystem_1.TimerSystem.Delay(() => {
              this.Xte &&
                (this.Xte.HasTag(31862857) ? this.eGr() : this.Zqr(!1)),
                (this.yqr = void 0);
            }, a)),
            this.$te.SetBaseValue(
              CharacterAttributeTypes_1.EAttributeId.Proto_ToughRecover,
              0
            )),
        i
      );
    }
    Zqr(e) {
      e
        ? this.Xte.AddTag(-1112841587)
        : (this.Xte.RemoveTag(-1112841587), this.Eqr?.EndTask());
      var t = Protocol_1.Aki.Protocol.FNn.create();
      (t.rkn = this.Entity.GetComponent(0).GetCreatureDataId()),
        (t.Mkn = e),
        CombatMessage_1.CombatNet.Call(27408, this.Entity, t, (e) => {
          e &&
            e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys &&
            (this.yqr &&
              (TimerSystem_1.TimerSystem.Remove(this.yqr), (this.yqr = void 0)),
            this.Xte.RemoveTag(-1112841587));
        });
    }
    eGr() {
      this.Eqr = this.Xte.ListenForTagAddOrRemove(40422668, () => {
        this.Zqr(!1);
      });
    }
    TryExitWeakTime() {
      this.Xte.HasTag(-1112841587) &&
        (this.yqr &&
          (TimerSystem_1.TimerSystem.Remove(this.yqr), (this.yqr = void 0)),
        this.Zqr(!1));
    }
    Rqr() {
      this.Eqr && (this.Eqr.EndTask(), (this.Eqr = void 0));
    }
    Pqr(e) {
      var t = e.Attacker.Sqr?.GetSkillLevelByDamageId(e.DamageData.Id),
        a = e.Attacker.Entity.GetComponent(34)?.GetVisionLevelByDamageId(
          e.DamageData.Id
        );
      t && 0 < t ? (e.SkillLevel = t) : a && 0 < a && (e.SkillLevel = a);
    }
    AddToughModifier(e, t) {
      this.Lqr.has(e) || this.Lqr.set(e, new Map());
      e = this.Lqr.get(e);
      e.set(t, 1 + (e.get(t) ?? 0));
    }
    RemoveToughModifier(e, t) {
      var a,
        e = this.Lqr.get(e);
      e && (1 <= (a = e.get(t)) ? e.set(t, a - 1) : e.delete(t));
    }
    GetExtraToughRate(e) {
      var t,
        a,
        e = this.Lqr.get(e);
      if (!e) return CharacterAttributeTypes_1.PER_TEN_THOUSAND;
      let r = CharacterAttributeTypes_1.PER_TEN_THOUSAND;
      for ([t, a] of e.entries())
        0 < a &&
          (r *= Math.pow(t / CharacterAttributeTypes_1.PER_TEN_THOUSAND, a));
      return r;
    }
    FallInjure() {
      var e, t, a, r;
      this.Xte.HasTag(1918148596) ||
        !this.mbr.IsInGame ||
        ModelManager_1.ModelManager.DeadReviveModel.SkipFallInjure ||
        this.Xte.HasTag(560942831) ||
        ((e =
          this.ActorComponent.Actor.CharacterMovement.GetLastUpdateVelocity()
            .Z),
        (a = this.ActorComponent.ActorVelocityProxy.Z),
        (r = this.tGr()),
        -e < this.Iqr && (this.Tqr = 0),
        (t = this.Tqr ? Time_1.Time.WorldTimeSeconds - this.Tqr : 0),
        (a = Math.ceil(this.iGr(-e, -a, r, t))) <= 0) ||
        ((r = this.zht.GetCreatureDataId()),
        this.Entity.GetComponent(57).CollectSampleAndSend(),
        ControllerHolder_1.ControllerHolder.CreatureController.LandingDamageRequest(
          r,
          e,
          t * CommonDefine_1.MILLIONSECOND_PER_SECOND
        ),
        EventSystem_1.EventSystem.EmitWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharOnFallInjure,
          a,
          !1
        ),
        this.elt?.RemoveBuffByEffectType(36, "跌落伤害移除冰冻buff"),
        (this.vqr.NeedCalculateFallInjure = !1));
    }
    iGr(e, t, a, r) {
      let i = 0;
      var o = this.$te.GetCurrentValue(
        CharacterAttributeTypes_1.EAttributeId.Tkn
      );
      return (i = this.zht.IsRealMonster()
        ? CharacterDamageCalculations_1.Calculation.LandingDamageCalculationMonster(
            a,
            o
          )
        : CharacterDamageCalculations_1.Calculation.LandingDamageCalculationRole(
            e,
            t,
            r,
            o
          )) <= 0
        ? 0
        : i;
    }
    tGr() {
      var e, t;
      return this.vqr.NeedCalculateFallInjure &&
        ((e = this.vqr.BeHitLocation.Z),
        (t = this.ActorComponent.ActorLocationProxy.Z) < e)
        ? e - t
        : 0;
    }
    Dqr() {
      return CommonParamById_1.configCommonParamById.GetIntArrayConfig(
        "landing_damage_args_role"
      )[1];
    }
  });
(CharacterDamageComponent.Aqr = void 0),
  (CharacterDamageComponent.Uqr = void 0),
  (CharacterDamageComponent.xqr = void 0),
  (CharacterDamageComponent.wqr = void 0),
  (CharacterDamageComponent.Vqr = void 0),
  (CharacterDamageComponent.Wqr = void 0),
  (CharacterDamageComponent.Kqr = void 0),
  (CharacterDamageComponent.Qqr = void 0),
  (CharacterDamageComponent.Xqr = void 0),
  (CharacterDamageComponent.$qr = void 0),
  (CharacterDamageComponent.Yqr = void 0),
  (CharacterDamageComponent.Jqr = void 0),
  (CharacterDamageComponent.zqr = void 0),
  __decorate(
    [CombatMessage_1.CombatNet.Listen("OOn", !1)],
    CharacterDamageComponent,
    "OnDamageExecuteNotify",
    null
  ),
  (CharacterDamageComponent = CharacterDamageComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(18)],
      CharacterDamageComponent
    )),
  (exports.CharacterDamageComponent = CharacterDamageComponent);
//# sourceMappingURL=CharacterDamageComponent.js.map

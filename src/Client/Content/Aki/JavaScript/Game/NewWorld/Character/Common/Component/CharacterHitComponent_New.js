"use strict";
var CharacterHitComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, i, e, s) {
      var h,
        r = arguments.length,
        o =
          r < 3
            ? i
            : null === s
            ? (s = Object.getOwnPropertyDescriptor(i, e))
            : s;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        o = Reflect.decorate(t, i, e, s);
      else
        for (var a = t.length - 1; 0 <= a; a--)
          (h = t[a]) &&
            (o = (r < 3 ? h(o) : 3 < r ? h(i, e, o) : h(i, e)) || o);
      return 3 < r && o && Object.defineProperty(i, e, o), o;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterHitComponent =
    exports.MAX_HIT_EFFECT_COUNT =
    exports.OUTER_RADIUS =
      void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Stats_1 = require("../../../../../Core/Common/Stats"),
  Time_1 = require("../../../../../Core/Common/Time"),
  CommonDefine_1 = require("../../../../../Core/Define/CommonDefine"),
  HardnessModeById_1 = require("../../../../../Core/Define/ConfigQuery/HardnessModeById"),
  Long = require("../../../../../Core/Define/Net/long"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  EntitySystem_1 = require("../../../../../Core/Entity/EntitySystem"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil"),
  MathCommon_1 = require("../../../../../Core/Utils/Math/MathCommon"),
  Quat_1 = require("../../../../../Core/Utils/Math/Quat"),
  Rotator_1 = require("../../../../../Core/Utils/Math/Rotator"),
  Transform_1 = require("../../../../../Core/Utils/Math/Transform"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  ObjectUtils_1 = require("../../../../../Core/Utils/ObjectUtils"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent"),
  CameraController_1 = require("../../../../Camera/CameraController"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  EffectSystem_1 = require("../../../../Effect/EffectSystem"),
  Global_1 = require("../../../../Global"),
  GlobalData_1 = require("../../../../GlobalData"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  BattleUiDefine_1 = require("../../../../Module/BattleUi/BattleUiDefine"),
  CombatMessage_1 = require("../../../../Module/CombatMessage/CombatMessage"),
  GamepadController_1 = require("../../../../Module/Gamepad/GamepadController"),
  SceneTeamController_1 = require("../../../../Module/SceneTeam/SceneTeamController"),
  ColorUtils_1 = require("../../../../Utils/ColorUtils"),
  CombatDebugController_1 = require("../../../../Utils/CombatDebugController"),
  WorldGlobal_1 = require("../../../../World/WorldGlobal"),
  BulletConstant_1 = require("../../../Bullet/BulletConstant"),
  BulletStaticFunction_1 = require("../../../Bullet/BulletStaticMethod/BulletStaticFunction"),
  BulletTypes_1 = require("../../../Bullet/BulletTypes"),
  BulletUtil_1 = require("../../../Bullet/BulletUtil"),
  FightLibrary_1 = require("../Blueprint/Utils/FightLibrary"),
  CharacterBuffIds_1 = require("./Abilities/CharacterBuffIds"),
  CharacterUnifiedStateTypes_1 = require("./Abilities/CharacterUnifiedStateTypes"),
  ModManager_1 = require("../../../../Manager/ModManager"),
  WhirlpoolPoint_1 = require("./Move/WhirlpoolPoint");
var EAttributeId = Protocol_1.Aki.Protocol.KBs;
const MASS_RATE = 100,
  DEFALUT_SLOT_NAME =
    ((exports.OUTER_RADIUS = 100),
    (exports.MAX_HIT_EFFECT_COUNT = 3),
    new UE.FName("DefaultSlot")),
  DEFAULT_DAMAGE = 1e4,
  DEBUG = !1,
  forbidHitTagIds = [
    1008164187, -1192672452, 1922078392, -648310348, 855966206,
  ],
  enterFkForbidHitTagIds = [-1192672452, 1922078392, -648310348, 855966206],
  lightHits = new Set([0, 1, 8, 9]);
class DoubleHitInAirEffect {
  constructor() {
    (this.GravityScaleUp = 0),
      (this.GravityScaleDown = 0),
      (this.GravityScaleTop = 0),
      (this.LandingBounce = Vector_1.Vector.Create()),
      (this.VelocityTop = 0),
      (this.Valid = !1),
      (this.Duration = 0);
  }
  FromUeHitEffect(t) {
    (this.GravityScaleUp = t.落地反弹上升重力标量),
      (this.GravityScaleDown = t.落地反弹下落重力标量),
      (this.GravityScaleTop = t.落地反弹弧顶重力标量),
      this.LandingBounce.FromUeVector(t.落地反弹),
      (this.VelocityTop = t.落地反弹速度阈值),
      (this.Valid = !0),
      (this.Duration = t.落地反弹时长);
  }
  Finish() {
    this.Valid = !1;
  }
}
let CharacterHitComponent =
  (CharacterHitComponent_1 = class CharacterHitComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.Hte = void 0),
        (this.cBe = void 0),
        (this.aYo = void 0),
        (this.EVr = void 0),
        (this.yVr = void 0),
        (this.IVr = void 0),
        (this.TVr = void 0),
        (this.LastHitData = void 0),
        (this.LVr = !1),
        (this.DVr = !1),
        (this.RVr = !1),
        (this.AVr = []),
        (this.UVr = []),
        (this.PVr = []),
        (this.xVr = []),
        (this.wVr = 0),
        (this.BVr = void 0),
        (this.bVr = void 0),
        (this.qVr = void 0),
        (this.GVr = 0),
        (this.RageModeId = 0),
        (this.HardnessModeId = 0),
        (this.BeHitBones = new Array()),
        (this.ToughDecreaseValue = 0),
        (this.BeHitIgnoreRotate = !1),
        (this.CounterAttackInfoInternal = void 0),
        (this.VisionCounterAttackInfoInternal = void 0),
        (this.BeHitTime = 0),
        (this.NeedCalculateFallInjure = !1),
        (this.BeHitAnim = 0),
        (this.AcceptedNewBeHit = !1),
        (this.EnterFk = !1),
        (this.BeHitDirect = Vector_1.Vector.Create()),
        (this.BeHitLocation = Vector_1.Vector.Create()),
        (this.BeHitSocketName = void 0),
        (this.BeHitMapping = void 0),
        (this.NVr = !1),
        (this.OVr = 0),
        (this.kVr = 0),
        (this.FVr = void 0),
        (this.VVr = void 0),
        (this.zJo = void 0),
        (this.HVr = void 0),
        (this.jVr = 0),
        (this.WVr = !1),
        (this.KVr = void 0),
        (this.Gue = Rotator_1.Rotator.Create()),
        (this.az = Quat_1.Quat.Create()),
        (this.Ult = void 0),
        (this.HitEffectMap = new Map()),
        (this.QVr = () => {
          this.DeActiveStiff("落地");
        }),
        (this.XVr = (t, i) => {
          i === CharacterUnifiedStateTypes_1.ECharPositionState.Ground
            ? t === CharacterUnifiedStateTypes_1.ECharPositionState.Air &&
              this.DoubleHitInAirEffect?.Valid
              ? TimerSystem_1.TimerSystem.Next(this.$Vr, void 0, "落地击飞")
              : this.QVr()
            : t === CharacterUnifiedStateTypes_1.ECharPositionState.Air &&
              this.DoubleHitInAirEffect.Finish();
        }),
        (this.zVr = void 0),
        (this.YVr = !1),
        (this.JVr = 0),
        (this.ZVr = Vector_1.Vector.Create()),
        (this.e6r = Vector_1.Vector.Create()),
        (this.s7o = Transform_1.Transform.Create()),
        (this.t6r = Vector_1.Vector.Create()),
        (this.i6r = Vector_1.Vector.Create()),
        (this.DoubleHitInAirEffect = void 0),
        (this.o6r = Vector_1.Vector.Create()),
        (this.$Vr = () => {
          var t, i;
          this.DoubleHitInAirEffect.Valid &&
            ((i = (t = this.Entity.GetComponent(161)).GetLastUpdateVelocity()),
            this.t6r.Set(
              i.X * this.DoubleHitInAirEffect.LandingBounce.X,
              0,
              -1 * i.Z * this.DoubleHitInAirEffect.LandingBounce.Z
            ),
            this.t6r.MultiplyEqual(
              (MASS_RATE / this.VVr.GetCurrentValue(EAttributeId.Proto_Mass)) *
                this.Entity.GetComponent(107).CurrentTimeScale
            ),
            this.Entity.GetComponent(158).SetMoveState(
              CharacterUnifiedStateTypes_1.ECharMoveState.KnockUp
            ),
            t.Valid &&
              (this.Hte.ActorQuatProxy.RotateVector(this.t6r, this.o6r),
              t.Active && t.SetForceSpeed(this.o6r),
              3 !== t.CharacterMovement.MovementMode &&
                t.CharacterMovement.SetMovementMode(3),
              t.SetGravityScale(
                this.DoubleHitInAirEffect.GravityScaleUp,
                this.DoubleHitInAirEffect.GravityScaleDown,
                this.DoubleHitInAirEffect.GravityScaleTop,
                this.DoubleHitInAirEffect.VelocityTop,
                this.DoubleHitInAirEffect.Duration
              )),
            this.DoubleHitInAirEffect.Finish(),
            (this.YVr = !0),
            (this.JVr = Time_1.Time.Frame));
        }),
        (this.zbr = void 0);
    }
    GetHitData() {
      return this.TVr;
    }
    OnInitData() {
      return (this.DoubleHitInAirEffect = new DoubleHitInAirEffect()), !0;
    }
    OnInit() {
      return (
        CharacterHitComponent_1.r6r ||
          (CharacterHitComponent_1.r6r = new Set([4, 7])),
        (this.BeHitSocketName = FNameUtil_1.FNameUtil.EMPTY),
        !0
      );
    }
    OnStart() {
      return (
        (this.Hte = this.Entity.GetComponent(3)),
        (this.cBe = this.Entity.GetComponent(33)),
        (this.zJo = this.Entity.GetComponent(157)),
        (this.aYo = this.Entity.GetComponent(158)),
        (this.IVr = this.Entity.GetComponent(46)),
        (this.EVr = this.Entity.GetComponent(57)),
        (this.VVr = this.Entity.GetComponent(156)),
        (this.HVr = this.Entity.GetComponent(185)),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharOnPositionStateChanged,
          this.XVr
        ),
        (this.FVr = []),
        (this.Ult = (t, i) => {
          this.FVr = this.FVr.filter((t) =>
            EffectSystem_1.EffectSystem.IsValid(t)
          );
          for (const e of this.FVr)
            EffectSystem_1.EffectSystem.SetTimeScale(e, t);
        }),
        (this.zVr = (t, i) => {
          t === CharacterUnifiedStateTypes_1.ECharPositionState.Air &&
            i === CharacterUnifiedStateTypes_1.ECharPositionState.Water &&
            this.DeActiveStiff("落水");
        }),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharBeHitTimeScale,
          this.Ult
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharOnPositionStateChanged,
          this.zVr
        ),
        this.n6r(),
        !0
      );
    }
    URe(t) {
      this.HVr?.AddTag(t);
    }
    ARe(t) {
      this.HVr?.RemoveTag(t);
    }
    s6r(t) {
      return this.HVr?.HasTag(t) ?? !1;
    }
    a6r(t) {
      for (const i of t) if (this.s6r(i)) return !0;
      return !1;
    }
    n6r() {
      var t,
        i,
        e = this.Entity.GetComponent(0);
      e.GetEntityType() !== Protocol_1.Aki.Protocol.HBs.Proto_Player &&
        ((i = e?.GetPbEntityInitData()) &&
          ((t = (i = (0, IComponent_1.getComponent)(
            i.ComponentsData,
            "AttributeComponent"
          ))?.HardnessModeId) && (this.HardnessModeId = t),
          (t = i?.RageModeId)) &&
          (this.RageModeId = t),
        this.RefreshHardnessModeConfig(),
        this.RefreshRageModeConfig(),
        (i = e?.GetEntityPropertyConfig())) &&
        0 < i.受击映射索引ID &&
        (this.BeHitMapping = FightLibrary_1.FightLibrary.GetHitMapConfig(
          i.受击映射索引ID
        ));
    }
    OnEnd() {
      return (
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharOnPositionStateChanged,
          this.XVr
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharBeHitTimeScale,
          this.Ult
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharOnPositionStateChanged,
          this.zVr
        ),
        this.Ult && this.Ult(1, 0),
        !0
      );
    }
    OnClear() {
      return (
        this.KVr &&
          TimerSystem_1.TimerSystem.Has(this.KVr) &&
          (TimerSystem_1.TimerSystem.Remove(this.KVr), (this.KVr = void 0)),
        this.eqr(),
        !0
      );
    }
    GetAcceptedNewBeHitAndReset() {
      var t = this.AcceptedNewBeHit;
      return (
        this.AcceptedNewBeHit &&
          (this.h6r(!1),
          this.Entity.GetComponent(
            160
          ).MainAnimInstance.AddForceUpdateSlotNameWhenMontageBlend(
            DEFALUT_SLOT_NAME
          )),
        t
      );
    }
    h6r(t) {
      this.AcceptedNewBeHit !== t &&
        ((this.AcceptedNewBeHit = t),
        EventSystem_1.EventSystem.EmitWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharOnSetNewBeHit,
          this.AcceptedNewBeHit
        ));
    }
    GetEnterFk() {
      return this.EnterFk;
    }
    GetEnterFkAndReset() {
      var t = this.EnterFk;
      return (this.EnterFk = !1), t;
    }
    GetDoubleHitInAir() {
      return this.JVr !== Time_1.Time.Frame && (this.YVr = !1), this.YVr;
    }
    SetBeHitIgnoreRotate(t) {
      this.BeHitIgnoreRotate = t;
    }
    l6r() {
      return (
        !!this.IsTriggerCounterAttack ||
        (!!this.BeHitIgnoreRotate &&
          !CharacterHitComponent_1.r6r?.has(this.BeHitAnim) &&
          this.aYo?.PositionState ===
            CharacterUnifiedStateTypes_1.ECharPositionState.Ground)
      );
    }
    SetRageModeId(t) {
      this.RageModeId = t;
    }
    SetHardnessModeId(t) {
      (this.HardnessModeId = t),
        this.Entity.GetComponent(3).IsAutonomousProxy &&
          ControllerHolder_1.ControllerHolder.CreatureController.HardnessModeChangedRequest(
            this.Entity.Id,
            t
          );
    }
    SetCounterAttackInfo(t) {
      (this.CounterAttackInfoInternal = t), this.URe(1124064628);
    }
    SetVisionCounterAttackInfo(t) {
      (this.VisionCounterAttackInfoInternal = t), this.URe(-1576849243);
    }
    GetRageMode() {
      return this.bVr;
    }
    RefreshRageModeConfig() {
      0 !== this.RageModeId
        ? ((this.bVr = HardnessModeById_1.configHardnessModeById.GetConfig(
            this.RageModeId
          )),
          this.bVr ||
            (Log_1.Log.CheckError() &&
              Log_1.Log.Error("Character", 15, "读取RageModeConfig失败", [
                "id",
                this.RageModeId,
              ])))
        : (this.bVr = void 0);
    }
    GetHardnessMode() {
      return this.qVr;
    }
    RefreshHardnessModeConfig() {
      0 !== this.HardnessModeId
        ? ((this.qVr = HardnessModeById_1.configHardnessModeById.GetConfig(
            this.HardnessModeId
          )),
          this.qVr ||
            (Log_1.Log.CheckError() &&
              Log_1.Log.Error("Character", 15, "读取白条表失败", [
                "id",
                this.HardnessModeId,
              ])))
        : (this.qVr = void 0);
    }
    ReceiveOnHit(i, t, e, s, h, r, o, a, n, _, l) {
      if (this.a6r(forbidHitTagIds))
        this.a6r(enterFkForbidHitTagIds) &&
          this._6r(EntitySystem_1.EntitySystem.Get(i.BulletEntityId));
      else if (
        (!this.cBe?.CurrentSkill?.Active ||
          !this.cBe.CurrentSkill.SkillInfo.OverrideHit) &&
        e
      ) {
        if (
          ((this.TVr = i),
          (this.LastHitData = i),
          (this.yVr = t),
          (this.EnterFk = h),
          (this.DVr = r),
          (this.wVr = o ? 1 : a ? 2 : 0),
          (this.NVr = !1),
          (this.LVr = !0),
          (this.BeHitTime = UE.GameplayStatics.GetTimeSeconds(this.Hte.Actor)),
          this.BeHitLocation.DeepCopy(i.HitPosition),
          (this.NeedCalculateFallInjure = !0),
          0 < _ && !h)
        ) {
          if (this.s6r(1447214865) && !this.IsTriggerCounterAttack)
            return void this.u6r();
          if (
            (this.c6r(),
            this.IsTriggerCounterAttack && this.m6r(this.TVr),
            (this.GVr = this.IVr?.TrySwitchHitState(l, !1) ?? 0),
            !this.IVr || this.GVr)
          ) {
            this.BeHitAnim = l;
            e = i.ReBulletData.Base;
            let t = e.BeHitEffect;
            this.DVr && (t = e.HitEffectWeakness);
            r = ConfigManager_1.ConfigManager.BulletConfig.GetBulletHitData(
              this.yVr,
              t
            );
            r
              ? (CombatDebugController_1.CombatDebugController.CombatInfo(
                  "Hit",
                  this.Entity,
                  "远端受击"
                ),
                this.Hte.SetMoveControlled(!1, 2, "远端受击"),
                s &&
                  this.Entity.GetComponent(3).SetActorRotation(
                    n,
                    "受击者旋转",
                    !1
                  ),
                (this.BeHitAnim = l),
                this.d6r(r))
              : this._6r(EntitySystem_1.EntitySystem.Get(i.BulletEntityId));
          } else this._6r(EntitySystem_1.EntitySystem.Get(i.BulletEntityId));
        }
        !this.EnterFk ||
          ((o = t.GetComponent(1))?.Valid &&
            (this.Hte.ActorLocationProxy.Subtraction(
              o.ActorLocationProxy,
              this.BeHitDirect
            ),
            this.BeHitDirect.Normalize())) ||
          this.Hte.ActorForwardProxy.Multiply(-1, this.BeHitDirect),
          this.u6r();
      }
    }
    C6r(t) {
      this.Hte.CreatureData.GetEntityType() !==
        Protocol_1.Aki.Protocol.HBs.Proto_Monster ||
        this.aYo.IsInFightState() ||
        (this.EVr.CollectSampleAndSend(!0),
        (i = this.Hte.CreatureData.GetPbDataId()),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Character", 51, "怪物受击，主动同步位置", [
            "PbDataId",
            i,
          ]));
      var i = Protocol_1.Aki.Protocol.DOs.create(),
        e = this.yVr.GetComponent(0).GetCreatureDataId(),
        s = this.Entity.GetComponent(0).GetCreatureDataId(),
        e =
          ((i.Ekn = MathUtils_1.MathUtils.NumberToLong(e)),
          (i.L4n = MathUtils_1.MathUtils.NumberToLong(s)),
          (i.wVn = Long.fromNumber(this.TVr.BulletId)),
          this.TVr.HitPosition),
        s =
          ((i.L9n = { X: e.X, Y: e.Y, Z: e.Z }),
          (i.D9n = {
            Pitch: this.TVr.HitEffectRotation.Pitch,
            Yaw: this.TVr.HitEffectRotation.Yaw,
            Roll: this.TVr.HitEffectRotation.Roll,
          }),
          (i.A9n = { X: e.X, Y: e.Y, Z: e.Z }),
          (i.U9n = this.BeHitAnim),
          (i.R9n = this.EnterFk),
          (i.x9n = this.DVr),
          (i.P9n = 1 === this.wVr),
          (i.B9n = 2 === this.wVr),
          (i.w9n = this.BVr),
          (i.b9n = this.LVr),
          (i.q9n = this.TVr.HitPart?.toString() ?? ""),
          (i.G9n = !this.l6r() && this.LVr && !this.EnterFk),
          t.GetBulletInfo());
      (i.vkn = s.BulletInitParams.SkillId), (i.O9n = s.BulletInitParams.Source);
      const h = this.GVr;
      h && (i.I4n = this.IVr?.GetFightState() ?? 0),
        CombatDebugController_1.CombatDebugController.CombatDebug(
          "FightState",
          this.Entity,
          "HitRequest " + i.I4n
        );
      e = Protocol_1.Aki.Protocol.$2n.create();
      (e.N9n = i),
        CombatMessage_1.CombatNet.Call(27229, this.Entity, e, (t) => {
          h && this.IVr?.ConfirmState(h);
        });
    }
    OnHitone(t, i, e, s, h, r, o, a, n) {
      (this.TVr = t),
        (this.LastHitData = t),
        (this.yVr = EntitySystem_1.EntitySystem.Get(t.Attacker.Id)),
        (this.LVr = i),
        (this.RVr = s),
        (this.AVr = r),
        (this.UVr = o),
        (this.PVr = a),
        (this.xVr = n),
        (this.WVr = h),
        (this.NVr = !1),
        this.p6r(),
        this.v6r(e),
        this.IsTriggerCounterAttack && this.M6r(),
        this.E6r(),
        this.I6r(),
        this.Lwr(e),
        this.L6r(),
        this.R6r(e),
        GlobalData_1.GlobalData.Networking() && this.C6r(e),
        this.U6r(),
        this.u6r();
    }
    OnHit(t, i, e, s, h, r, o, a, n) {
      var Player =
        Global_1.Global.BaseCharacter?.CharacterActorComponent.Entity;
      if (ModManager_1.ModManager.Settings.GodMode === true) {
        var Target = EntitySystem_1.EntitySystem.Get(t.Target.Id);
        if (Target == Player) return;
      }
      if (ModManager_1.ModManager.Settings.HitMultiplier === true) {
        var Attacker = EntitySystem_1.EntitySystem.Get(t.Attacker.Id);
        if (Attacker == Player) {
          for (let j = 0; j < ModManager_1.ModManager.Settings.Hitcount; j++) {
            this.OnHitone(t, i, e, s, h, r, o, a, n);
          }
          return;
        }
      }

      this.OnHitone(t, i, e, s, h, r, o, a, n);
    }
    u6r() {
      (this.TVr = void 0),
        (this.yVr = void 0),
        (this.UVr = void 0),
        (this.PVr = void 0),
        (this.xVr = void 0),
        (this.WVr = !1),
        (this.GVr = 0);
    }
    OnSharedHit(t, i, e, s) {
      (this.TVr = t),
        (this.LastHitData = t),
        (this.yVr = EntitySystem_1.EntitySystem.Get(t.Attacker.Id)),
        (this.LVr = i),
        (this.RVr = !1),
        (this.WVr = !0),
        (this.NVr = !1),
        this.p6r(),
        (this.wVr = 0),
        this.E6r(),
        this.P6r(s),
        this.c6r(),
        this.Lwr(e),
        this.L6r(),
        this.R6r(e),
        this.U6r(),
        this.u6r();
    }
    ActiveStiff(t) {
      var i;
      0 !== t &&
        (this.KVr &&
          TimerSystem_1.TimerSystem.Has(this.KVr) &&
          (TimerSystem_1.TimerSystem.Remove(this.KVr), (this.KVr = void 0)),
        this.URe(-2044964178),
        (i = () => {
          this.Entity.Valid && ((this.KVr = void 0), this.ARe(-2044964178));
        }),
        0 < t) &&
        (this.KVr = TimerSystem_1.TimerSystem.Delay(
          i,
          t * BattleUiDefine_1.SECOND_TO_MILLISECOND
        ));
    }
    DeActiveStiff(t = "") {
      this.KVr &&
        TimerSystem_1.TimerSystem.Has(this.KVr) &&
        (TimerSystem_1.TimerSystem.Remove(this.KVr), (this.KVr = void 0)),
        this.ARe(-2044964178),
        CombatDebugController_1.CombatDebugController.CombatDebug(
          "Hit",
          this.Entity,
          "清除硬直",
          ["reason", t]
        );
    }
    IsStiff() {
      return this.s6r(-2044964178);
    }
    p6r() {
      (this.BeHitBones.length = 0),
        this.TVr.HitPart &&
          !FNameUtil_1.FNameUtil.IsNothing(this.TVr.HitPart) &&
          this.BeHitBones.push(this.TVr.HitPart),
        this.BeHitBones && 0 < this.BeHitBones?.length
          ? (this.BeHitSocketName = this.BeHitBones[0])
          : (this.BeHitSocketName = FNameUtil_1.FNameUtil.EMPTY);
    }
    v6r(t) {
      this.x6r(t)
        ? (this.wVr = 1)
        : this.w6r(t)
        ? (this.wVr = 2)
        : (this.wVr = 0);
    }
    x6r(t) {
      if (!t.Data.Logic.CanCounterAttack) return !1;
      if (!this.s6r(1124064628))
        return (
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Character", 21, "CheckNormalCounterAttack无Tag"),
          !1
        );
      if (this.CounterAttackInfoInternal.QTE弹刀忽略角度距离检测) {
        (t = t.GetBulletInfo()),
          (t = this.yVr
            .GetComponent(33)
            .GetSkillInfo(t.BulletInitParams.SkillId));
        if (t && 4 === t.SkillGenre) return !0;
      }
      var i = this.TVr.HitPart,
        e = this.CounterAttackInfoInternal.弹反部位,
        s = e.Num();
      let h = !1;
      if (i.op_Equality(FNameUtil_1.FNameUtil.NONE) && 0 < s)
        return (
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Character", 21, "检查弹反 击中部位"),
          !1
        );
      BulletConstant_1.BulletConstant.OpenHitActorLog &&
        Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Test", 21, "检查弹反 击中部位", [
          "部位",
          i.toString(),
        ]);
      for (let t = 0; t < s; t++) {
        var r = e.Get(t);
        if (
          (BulletConstant_1.BulletConstant.OpenHitActorLog &&
            Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Test", 21, "检查弹反 配置部位", [
              "部位",
              r.toString(),
            ]),
          r.op_Equality(i))
        ) {
          h = !0;
          break;
        }
      }
      if (!h && 0 < s) return !1;
      this.ZVr.FromUeVector(this.yVr.GetComponent(3).ActorLocationProxy),
        h
          ? ((t = this.Hte.GetBoneLocation(i.toString())),
            this.e6r.FromUeVector(t),
            DEBUG &&
              UE.KismetSystemLibrary.DrawDebugSphere(
                GlobalData_1.GlobalData.GameInstance,
                t,
                10,
                void 0,
                ColorUtils_1.ColorUtils.LinearGreen,
                4
              ),
            this.ZVr.SubtractionEqual(this.e6r))
          : this.ZVr.SubtractionEqual(this.Hte.ActorLocationProxy);
      var t = this.ZVr.Size(),
        o =
          (this.ZVr.Normalize(MathCommon_1.MathCommon.KindaSmallNumber),
          Vector_1.Vector.DotProduct(this.Hte.ActorForwardProxy, this.ZVr)),
        a = Math.cos(
          this.CounterAttackInfoInternal.最大触发夹角 *
            MathUtils_1.MathUtils.DegToRad
        ),
        n = this.CounterAttackInfoInternal.最大触发距离;
      return (
        BulletConstant_1.BulletConstant.OpenHitActorLog &&
          Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Test",
            21,
            "检查弹反 最大距离和最大触发夹角",
            ["当前距离", t],
            ["最大触发距离", n],
            ["夹角cos值", o],
            ["最大触发夹角cos值", a]
          ),
        t < n && a < o
      );
    }
    w6r(t) {
      return !!t.Data.Logic.CanVisionCounterAttack && !!this.s6r(-1576849243);
    }
    Lwr(t) {
      var i,
        e = this.DVr
          ? this.TVr.ReBulletData.TimeScale.AttackerTimeScaleOnHitWeakPoint
          : this.TVr.ReBulletData.TimeScale.TimeScaleOnAttack;
      this.TVr.ReBulletData.TimeScale.TimeScaleOnAttackIgnoreAttacker
        ? 0 < e.时间膨胀时长 &&
          BulletUtil_1.BulletUtil.SetTimeScale(
            t.GetBulletInfo(),
            e.优先级,
            e.时间膨胀值,
            e.时间膨胀变化曲线,
            e.时间膨胀时长,
            1
          )
        : 0 < e.时间膨胀时长 &&
          (this.yVr
            .GetComponent(107)
            .SetTimeScale(
              e.优先级,
              e.时间膨胀值,
              e.时间膨胀变化曲线,
              e.时间膨胀时长,
              1
            ),
          (t = this.TVr.ReBulletData.TimeScale.CharacterCustomKeyTimeScale),
          StringUtils_1.StringUtils.IsEmpty(t) ||
            ((i =
              ModelManager_1.ModelManager.BulletModel.GetEntityIdByCustomKey(
                this.yVr.Id,
                t,
                this.TVr.BulletId.toString()
              )),
            (i = ModelManager_1.ModelManager.CharacterModel.GetHandle(i))?.Valid
              ? i.Entity.GetComponent(107)?.SetTimeScale(
                  e.优先级,
                  e.时间膨胀值,
                  e.时间膨胀变化曲线,
                  e.时间膨胀时长,
                  1
                )
              : Log_1.Log.CheckWarn() &&
                Log_1.Log.Warn(
                  "Character",
                  21,
                  "",
                  ["自定义连携顿帧单位key", t],
                  ["子弹ID", this.TVr.BulletId]
                ))),
        this.TVr.ReBulletData.Base.ContinuesCollision ||
          this.s6r(-648310348) ||
          (0 <
            (i = this.DVr
              ? this.TVr.ReBulletData.TimeScale.VictimTimeScaleOnHitWeakPoint
              : this.TVr.ReBulletData.TimeScale.TimeScaleOnHit).时间膨胀时长 &&
            this.Entity.GetComponent(107)?.SetTimeScale(
              i.优先级,
              i.时间膨胀值,
              i.时间膨胀变化曲线,
              i.时间膨胀时长,
              2
            ));
    }
    B6r(t, i, e) {
      var s = i.Effect;
      ObjectUtils_1.ObjectUtils.SoftObjectReferenceValid(s) &&
        t.push(s.ToAssetPathName()),
        e &&
          ((s = i.Audio),
          ObjectUtils_1.ObjectUtils.SoftObjectReferenceValid(s)) &&
          t.push(s.ToAssetPathName());
    }
    n7o() {
      var i = new Array(),
        e = this.Entity.GetComponent(3);
      if (e.IsPartHit) {
        var s = this.TVr.ReBulletData.Base.EnablePartHitAudio;
        let t = !1;
        if (this.xVr && 0 < this.xVr.length)
          for (const a of this.xVr) {
            var h = e.GetPartHitConf(a);
            if (h) {
              if (((t = !0), h.ReplaceBulletHitEffect))
                return (i.length = 0), this.B6r(i, h, s), i;
              this.B6r(i, h, s);
            }
          }
        if (
          !t &&
          this.TVr.HitPart &&
          !FNameUtil_1.FNameUtil.IsNothing(this.TVr.HitPart)
        ) {
          var r = e.GetPartHitConf(this.TVr.HitPart.toString());
          if (r) {
            if (r.ReplaceBulletHitEffect)
              return (i.length = 0), this.B6r(i, r, s), i;
            this.B6r(i, r, s);
          }
        }
      }
      var r = this.TVr.ReBulletData.Render.EffectOnHit,
        o = r.get(9);
      if (o && 0 < o.length && this.s6r(501201e3)) i.push(o);
      else {
        let t = 4;
        this.DVr && (t = 7);
        o = r.get(t);
        o && 0 !== o.length && i.push(o);
      }
      return i;
    }
    c6r() {
      if (!(this.TVr.ReBulletData.Base.DamageId <= 0)) {
        var t = this.n7o();
        if (t && 0 < t.length) {
          var i = this.TVr.ReBulletData.Render,
            s = i.EffectOnHitConf.get(0),
            h = this.TVr.HitPosition,
            s = s ? s.Scale : Vector_1.Vector.OneVectorProxy,
            h =
              (this.s7o.Set(h, this.TVr.HitEffectRotation.Quaternion(), s),
              this.TVr.Attacker?.GetComponent(42));
          let e = !1;
          (0, RegisterComponent_1.isComponentInstance)(h, 170) &&
            (e = "p1" === h.Priority.State);
          var r = BulletStaticFunction_1.HitStaticFunction.CreateEffectContext(
            this.TVr.Attacker,
            e
          );
          const a = i.AudioOnHit;
          var o = (t, i) => {
            BulletStaticFunction_1.HitStaticFunction.PlayHitAudio(t, i, a, e);
          };
          for (const n of t)
            EffectSystem_1.EffectSystem.SpawnEffect(
              GlobalData_1.GlobalData.World,
              this.s7o.ToUeTransform(),
              n,
              "[CharacterHitComponent.ProcessHitEffect]",
              r,
              void 0,
              void 0,
              o
            );
        }
      }
    }
    I6r() {
      this.b6r();
      var t = this.q6r(this.TVr);
      this.AVr && 0 < this.AVr.length
        ? this.G6r(this.AVr, t)
        : (this.N6r(this.UVr, t), this.WVr && this.O6r(this.PVr, t));
    }
    P6r(t) {
      var i;
      this.TVr.Attacker.CheckGetComponent(3).IsAutonomousProxy &&
        ((i = this.q6r(this.TVr)),
        (i = this.k6r(i, !1, !1, void 0, t)),
        (this.ToughDecreaseValue = i.ToughResult));
    }
    G6r(t, i) {
      let e = !1;
      for (const r of t) e ||= r.IsTransferDamage;
      for (const o of t) {
        var s = !(o.SeparateDamage && e),
          h = this.k6r(i, !1, s, o.Index);
        s || (this.ToughDecreaseValue = h.ToughResult);
      }
      e &&
        ((t = this.k6r(i, !1, !e, t[0].Index)),
        (this.ToughDecreaseValue = t.ToughResult));
    }
    N6r(t, i) {
      if (t) {
        this.DVr = !1;
        for (const s of t) {
          var e = s.IsWeaknessHit;
          (this.DVr ||= e), this.k6r(i, e, !1, s.Index);
        }
      }
    }
    O6r(t, i) {
      var e;
      t && 0 < t.length
        ? ((e = (t = t[0]).IsWeaknessHit),
          (this.DVr ||= e),
          (e = this.k6r(i, this.DVr, !1, t.Index)),
          (this.ToughDecreaseValue = e.ToughResult))
        : ((t = this.k6r(i, this.DVr, !1)),
          (this.ToughDecreaseValue = t.ToughResult));
    }
    k6r(t, i, e, s = -1, h = 1) {
      var r,
        o,
        a = t.ReBulletData.Base.DamageId,
        n = t.Target;
      return a < 1 || !n
        ? { DamageResult: 0, ToughResult: 0 }
        : ((n = t.Target.GetComponent(18)),
          (o = t.Target.GetComponent(33)),
          n && o
            ? ((r = EntitySystem_1.EntitySystem.Get(
                t.BulletEntityId
              )?.GetBulletInfo().ContextId),
              (o = o.CurrentSkill),
              n?.ExecuteBulletDamage(
                t.BulletEntityId,
                {
                  DamageDataId: a,
                  SkillLevel: t.SkillLevel,
                  Attacker: t.Attacker,
                  HitPosition: t.HitPosition.ToUeVector(),
                  IsAddEnergy: this.RVr,
                  IsCounterAttack: this.IsTriggerCounterAttack,
                  ForceCritical: i,
                  IsBlocked: e,
                  PartId: s,
                  ExtraRate: h,
                  CounterSkillMessageId: this.IsTriggerCounterAttack
                    ? o?.CombatMessageId
                    : void 0,
                  BulletId: t.BulletId,
                  CounterSkillId: this.IsTriggerCounterAttack
                    ? Number(o?.SkillId)
                    : void 0,
                },
                r
              ))
            : { DamageResult: DEFAULT_DAMAGE, ToughResult: 0 });
    }
    q6r(t) {
      t = Object.assign(t);
      return (
        (t.Attacker = this.yVr.GetComponent(47).GetAttributeHolder()),
        (t.Target =
          this.Entity.GetComponent(47)?.GetAttributeHolder() ?? this.Entity),
        t
      );
    }
    L6r() {
      var t, i;
      CameraController_1.CameraController.Model.IsModeEnabled(2) ||
        CameraController_1.CameraController.Model.IsModeEnabled(1) ||
        !this.TVr.IsShaking ||
        ((i = this.TVr.ReBulletData.Render),
        (t = this.DVr
          ? i.AttackerCameraShakeOnHitWeakPoint
          : i.AttackerCameraShakeOnHit),
        (i = i.VictimCameraShakeOnHit),
        0 < t.length
          ? ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.Class, (t) => {
              var i =
                Global_1.Global.CharacterCameraManager.GetCameraLocation();
              CameraController_1.CameraController.PlayWorldCameraShake(
                t,
                i,
                0,
                exports.OUTER_RADIUS,
                1,
                !1
              );
            })
          : 0 < i.length &&
            ResourceSystem_1.ResourceSystem.LoadAsync(i, UE.Class, (t) => {
              var i =
                Global_1.Global.CharacterCameraManager.GetCameraLocation();
              CameraController_1.CameraController.PlayWorldCameraShake(
                t,
                i,
                0,
                exports.OUTER_RADIUS,
                1,
                !1
              );
            }));
    }
    _6r(t) {
      !t ||
        t.Data.Base.DamageId <= 0 ||
        ((this.EnterFk = !0),
        (t = t.GetBulletInfo()),
        BulletUtil_1.BulletUtil.GetHitRotator(t, this.Hte, this.Gue),
        this.Gue.Quaternion(this.az),
        this.az.RotateVector(
          Vector_1.Vector.ForwardVectorProxy,
          this.BeHitDirect
        ),
        this.BeHitDirect.MultiplyEqual(-1),
        this.F6r(0));
    }
    R6r(i) {
      if (
        (this.IsTriggerCounterAttack && this.m6r(this.TVr),
        this.a6r(forbidHitTagIds))
      )
        (this.LVr = !1), this.a6r(enterFkForbidHitTagIds) && this._6r(i);
      else if (this.LVr) {
        var e = this.TVr.ReBulletData.Base;
        let t = e.BeHitEffect;
        this.DVr && (t = e.HitEffectWeakness);
        e = ConfigManager_1.ConfigManager.BulletConfig.GetBulletHitData(
          this.yVr,
          t
        );
        if (e) {
          this.BeHitTime = UE.GameplayStatics.GetTimeSeconds(this.Hte.Actor);
          var s = this.VVr?.GetCurrentValue(EAttributeId.Proto_Tough) ?? 0;
          if (
            (this.BeHitLocation.DeepCopy(this.TVr.HitPosition),
            (this.NeedCalculateFallInjure = !0),
            !(0 < s || this.ToughDecreaseValue <= 0 || this.s6r(1447214865)) ||
              (this.IsTriggerCounterAttack && this.NVr))
          ) {
            let t = 0;
            e && (t = this.NVr ? 7 : e.被击动作),
              (t = this.j6r(t)),
              this.IVr &&
              ((this.GVr = this.IVr.TrySwitchHitState(t, !0)), !this.GVr)
                ? this._6r(i)
                : (CombatDebugController_1.CombatDebugController.CombatInfo(
                    "Hit",
                    this.Entity,
                    "受击",
                    ["BeHitAnim", t]
                  ),
                  ModelManager_1.ModelManager.GameModeModel.IsMulti &&
                    this.Hte.SetMoveControlled(!0, 2, "受击"),
                  (this.BeHitAnim = t),
                  (this.EnterFk = !1),
                  (s = i.GetBulletInfo()),
                  this.l6r()
                    ? (BulletUtil_1.BulletUtil.GetHitRotator(
                        s,
                        this.Hte,
                        this.Gue
                      ),
                      (this.BVr = this.Gue.ToUeRotator()))
                    : (this.BVr = BulletUtil_1.BulletUtil.SetHitRotator(
                        s,
                        this.Hte,
                        this.TVr.HitEffect.受击朝向Z轴偏转
                      )),
                  this.W6r(),
                  this.l6r() &&
                    (this.BeHitAnim =
                      BulletUtil_1.BulletUtil.GetOverrideHitAnimByAngle(
                        this.Hte,
                        this.BeHitAnim,
                        this.BVr.Yaw
                      )),
                  this.Q6r(e),
                  this.F6r(lightHits.has(this.BeHitAnim) ? 1 : 2));
          } else this._6r(i);
        }
      }
    }
    E6r() {
      this.s6r(1124064628) &&
        this.zJo.RemoveBuffByTag(1124064628, "撞墙或受击逻辑触发移除");
    }
    U6r() {
      if (this.TVr) {
        let t = 0;
        var i = this.LVr && !this.EnterFk;
        2 !== this.wVr ||
          this.NVr ||
          ((t = this.VisionCounterAttackInfoInternal.对策事件ID),
          GlobalData_1.GlobalData.BpEventManager.当触发对策事件时.Broadcast(
            this.VisionCounterAttackInfoInternal.对策事件ID,
            this.TVr.ToUeHitInformation()
          ));
        var e = EntitySystem_1.EntitySystem.Get(
            this.TVr.BulletEntityId
          ).GetBulletInfo(),
          e = Number(e.BulletInitParams.SkillId),
          i = {
            Attacker: this.yVr,
            Target: this.Entity,
            BulletId: this.TVr.BulletId,
            HasBeHitAnim: i,
            BeHitAnim: this.BeHitAnim,
            VisionCounterAttackId: t,
            CounterAttackType: this.wVr,
            SkillId: e,
            SkillGenre:
              this.yVr?.GetComponent(33)?.GetSkillInfo(e)?.SkillGenre ?? 0,
          };
        this.yVr &&
          (SceneTeamController_1.SceneTeamController.EmitEvent(
            this.yVr,
            EventDefine_1.EEventName.CharHitLocal,
            this.TVr,
            i
          ),
          (e = this.yVr.GetComponent(0))) &&
          (e = e.IsVision()
            ? this.yVr.GetComponent(47)?.GetAttributeHolder()
            : this.yVr) &&
          SceneTeamController_1.SceneTeamController.EmitEvent(
            e,
            EventDefine_1.EEventName.CharHitIncludingVision,
            this.TVr,
            i
          ),
          SceneTeamController_1.SceneTeamController.EmitEvent(
            this.Entity,
            EventDefine_1.EEventName.CharBeHitLocal,
            this.TVr,
            i
          ),
          GlobalData_1.GlobalData.BpEventManager.当有角色受击时.Broadcast(
            this.Hte.Actor,
            this.TVr.ToUeHitInformation()
          );
      } else
        CombatDebugController_1.CombatDebugController.CombatError(
          "Hit",
          this.Entity,
          "HitData为空"
        );
    }
    Q6r(t) {
      this.h6r(!0),
        this.Entity.GetComponent(158).ExitAimStatus(),
        EventSystem_1.EventSystem.EmitWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharBeHitAnim
        );
      var i = this.Entity.GetComponent(160);
      if (
        (i.Valid &&
          i.MainAnimInstance &&
          (i.MainAnimInstance.Montage_Stop(0),
          i.MainAnimInstance.ForceSetCurrentMontageBlendTime(0, void 0)),
        this.X6r(),
        this.s6r(-1732582420))
      ) {
        var i = t.地面受击滞空,
          e = i.滞空时间 + i.到滞空点时间;
        if (this.$6r(e)) return void this.Y6r(i, e);
        this.J6r(t);
      } else if (!this.s6r(-648310348))
        if (this.s6r(-1898186757)) {
          if (4 === this.BeHitAnim) {
            (i = t.地面受击滞空), (e = i.滞空时间 + i.到滞空点时间);
            if (this.$6r(e)) return void this.Y6r(i, e);
            if (0 < t.地面受击速度.Z) return void this.z6r(t, !1);
          }
          this.J6r(t);
        } else {
          (i = t.空中受击滞空), (e = i.滞空时间 + i.到滞空点时间);
          if (this.$6r(e)) return void this.Y6r(i, e);
          this.z6r(t, !0);
        }
      this.s6r(504239013) &&
        (i = this.Entity.GetComponent(161)).Valid &&
        i.CharacterMovement.SetMovementMode(3);
    }
    Y6r(t, i) {
      var e,
        s,
        h,
        r = this.Entity.GetComponent(161);
      r.Valid &&
        ((e = this.Hte),
        (s = WhirlpoolPoint_1.WhirlpoolPoint.GenId()),
        this.t6r.FromUeVector(t.滞空相对位置),
        MathUtils_1.MathUtils.TransformPosition(
          e.ActorLocationProxy,
          e.ActorRotationProxy,
          e.ActorScaleProxy,
          this.t6r,
          this.i6r
        ),
        (h = this.yVr.GetComponent(3).ActorLocationProxy.Z + t.滞空高度限制) <
          this.i6r.Z && (this.i6r.Z = h),
        r.BeginWhirlpool(
          s,
          t.到滞空点时间,
          this.i6r,
          e.ActorLocationProxy,
          i,
          t.到滞空点曲线
        ));
    }
    $6r(t) {
      return 0 < t;
    }
    d6r(t) {
      this.h6r(!0),
        this.Entity.GetComponent(158).ExitAimStatus(),
        EventSystem_1.EventSystem.EmitWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharBeHitAnim
        );
      var i = this.Entity.GetComponent(160);
      i.Valid &&
        i.MainAnimInstance &&
        (i.MainAnimInstance.Montage_Stop(0),
        i.MainAnimInstance.ForceSetCurrentMontageBlendTime(0, void 0)),
        this.X6r(),
        4 === this.BeHitAnim ? this.z6r(t, !1) : this.J6r(t);
    }
    X6r() {
      switch (this.BeHitAnim) {
        case 0:
        case 1:
        case 8:
        case 9:
          this.Entity.GetComponent(158).SetMoveState(
            CharacterUnifiedStateTypes_1.ECharMoveState.SoftKnock
          );
          break;
        case 2:
        case 3:
        case 10:
        case 11:
        case 6:
          this.Entity.GetComponent(158).SetMoveState(
            CharacterUnifiedStateTypes_1.ECharMoveState.HeavyKnock
          );
          break;
        case 4:
          this.Entity.GetComponent(158).SetMoveState(
            CharacterUnifiedStateTypes_1.ECharMoveState.KnockUp
          );
          break;
        case 5:
          this.Entity.GetComponent(158).SetMoveState(
            CharacterUnifiedStateTypes_1.ECharMoveState.KnockDown
          );
          break;
        case 7:
          this.Entity.GetComponent(158).SetMoveState(
            CharacterUnifiedStateTypes_1.ECharMoveState.Parry
          );
      }
    }
    z6r(t, i) {
      this.ActiveStiff(-1);
      var e,
        s = this.Entity.GetComponent(161);
      s.Valid &&
        ((e = this.Hte),
        this.t6r.FromUeVector(i ? t.空中受击速度 : t.地面受击速度),
        (i = this.VVr?.GetCurrentValue(EAttributeId.Proto_Mass) ?? MASS_RATE),
        this.t6r.MultiplyEqual(MASS_RATE / i),
        this.Entity.GetComponent(158).SetMoveState(
          CharacterUnifiedStateTypes_1.ECharMoveState.KnockUp
        ),
        s.GetWhirlpoolEnable() && s.EndWhirlpool(),
        3 !== s.CharacterMovement.MovementMode &&
          s.CharacterMovement.SetMovementMode(3),
        e.ActorQuatProxy.RotateVector(this.t6r, this.i6r),
        s.Active && s.SetForceFallingSpeed(this.i6r, 31862857),
        (e = 0 < (i = t.空中受击移动时间) ? i : t.地面受击移动时间),
        s.SetGravityScale(t.上升标量, t.下落标量, t.弧顶标量, t.速度阈值, e),
        0 < t.落地反弹.Z
          ? this.DoubleHitInAirEffect.FromUeHitEffect(t)
          : this.DoubleHitInAirEffect.Finish());
    }
    J6r(t) {
      var i,
        e = new UE.Vector(t.地面受击速度.X, t.地面受击速度.Y, 0),
        s = t.地面受击最小速度,
        h = t.地面受击最大速度,
        r = t.地面受击移动时间,
        o = t.命中硬直时间,
        t = t.地面受击移动曲线;
      0 < r &&
        ((i = this.VVr?.GetCurrentValue(EAttributeId.Proto_Mass) ?? MASS_RATE),
        (e = e.op_Multiply(MASS_RATE / i)),
        (i = this.Entity.GetComponent(161)).Valid) &&
        (i.GetWhirlpoolEnable() && i.EndWhirlpool(),
        (this.jVr = i.SetAddMove(e, r, void 0, this.jVr, t, s, h))),
        this.ActiveStiff(o);
    }
    j6r(t) {
      let i = void 0;
      return (i =
        !this.BeHitMapping || this.BeHitMapping.ID <= 0
          ? t
          : this.BeHitMapping.映射表.Get(t));
    }
    M6r() {
      var t = this.yVr.CheckGetComponent(157);
      switch (this.wVr) {
        case 1:
          0 < this.CounterAttackInfoInternal.攻击者应用BuffID &&
            t.AddBuffFromAnimNotify(
              this.CounterAttackInfoInternal.攻击者应用BuffID,
              this.zJo,
              { InstigatorId: t.CreatureDataId, Reason: "拼刀攻击者应用Buff" }
            ),
            0 < this.CounterAttackInfoInternal.被弹反者应用BuffID &&
              this.zJo?.AddBuffFromAnimNotify(
                this.CounterAttackInfoInternal.被弹反者应用BuffID,
                void 0,
                {
                  InstigatorId: this.zJo?.CreatureDataId,
                  Reason: "拼刀受击者应用Buff",
                }
              );
          break;
        case 2:
          0 < this.VisionCounterAttackInfoInternal.攻击者应用BuffID &&
            t.AddBuffFromAnimNotify(
              this.VisionCounterAttackInfoInternal.攻击者应用BuffID,
              this.zJo,
              { InstigatorId: t.CreatureDataId, Reason: "对策攻击者应用Buff" }
            ),
            0 < this.VisionCounterAttackInfoInternal.被对策者应用BuffID &&
              this.zJo?.AddBuffFromAnimNotify(
                this.VisionCounterAttackInfoInternal.被对策者应用BuffID,
                void 0,
                {
                  InstigatorId: this.zJo?.CreatureDataId,
                  Reason: "对策受击者应用Buff",
                }
              );
      }
      t.AddBuff(CharacterBuffIds_1.buffId.CounterInvincibleCommon, {
        InstigatorId: t.CreatureDataId,
        Reason: "弹反攻击者无敌",
      });
    }
    m6r(t) {
      switch (this.wVr) {
        case 1:
          this.Z6r(t);
          break;
        case 2:
          this.e8r(t);
      }
    }
    Z6r(t) {
      let i = this.CounterAttackInfoInternal.无弹反动作效果;
      (this.NVr = this.t8r()),
        this.NVr && (i = this.CounterAttackInfoInternal.有弹反动作效果),
        this.i8r(t, i),
        this.o8r(i),
        this.yVr.GetComponent(3).IsAutonomousProxy && this.r8r(i),
        this.n8r();
      t = this.CounterAttackInfoInternal?.结束事件Tag;
      t?.TagName !== StringUtils_1.NONE_STRING &&
        this.HVr?.AddTag(t?.TagId ?? 0);
    }
    e8r(t) {
      this.NVr = !this.VisionCounterAttackInfoInternal.广播对策事件;
      var i = this.VisionCounterAttackInfoInternal.对策动作效果;
      this.i8r(t, i),
        this.o8r(i),
        this.yVr.GetComponent(3).IsAutonomousProxy &&
          !this.s6r(1161958668) &&
          this.r8r(i),
        this.n8r();
    }
    b6r() {
      !this.zJo ||
        1 !== this.wVr ||
        (this.zJo.HasBuffAuthority() &&
          0 < this.CounterAttackInfoInternal.ANS期间被弹反者生效的BuffID &&
          this.zJo.AddBuffFromAnimNotify(
            this.CounterAttackInfoInternal.ANS期间被弹反者生效的BuffID,
            void 0,
            {
              InstigatorId: this.zJo.CreatureDataId,
              Reason: "弹反ANS附加的buff",
            }
          ),
        this.CounterAttackInfoInternal.削韧倍率 <= 1) ||
        (this.OVr = this.zJo.AddAttributeRateModifierLocal(
          EAttributeId.Proto_ToughReduce,
          this.CounterAttackInfoInternal.削韧倍率,
          "弹反修改韧性倍率"
        ));
    }
    CounterAttackEnd() {
      this.OVr && this.zJo?.RemoveBuffByHandle(this.OVr),
        this.zJo?.RemoveBuff(
          this.CounterAttackInfoInternal.ANS期间被弹反者生效的BuffID,
          -1,
          "结束弹反ANS附加的buff"
        ),
        this.ARe(1124064628),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Character", 21, "CounterAttackEnd", [
            "CounterAttackType",
            this.wVr,
          ]),
        (this.wVr = 0);
    }
    VisionCounterAttackEnd() {
      this.ARe(-1576849243);
    }
    t8r() {
      if (!this.CounterAttackInfoInternal.受击动画忽略Buff检测 && this.zJo) {
        var i = this.CounterAttackInfoInternal.检测Buff列表;
        for (let t = 0; t < i.Num(); t++) {
          var e = i.Get(t),
            s = this.zJo.GetBuffTotalStackById(e.BuffID, !1);
          if (e.层数 > s) return !1;
        }
      }
      return !0;
    }
    SetCounterAttackEndTime(t) {
      var i = this.Entity.GetComponent(160).MainAnimInstance;
      i && (this.kVr = t + i.Montage_GetPosition(i.GetCurrentActiveMontage()));
    }
    OnHitByWall(t, i) {
      var e;
      (this.TVr = void 0),
        (this.BeHitBones.length = 0),
        (this.BeHitSocketName = FNameUtil_1.FNameUtil.EMPTY),
        (this.wVr = 0),
        (this.NVr = !1),
        this.E6r(),
        this.s6r(1008164187) ||
          ((this.BeHitTime = UE.GameplayStatics.GetTimeSeconds(this.Hte.Actor)),
          (this.EnterFk = !1),
          (e = Rotator_1.Rotator.Create()),
          MathUtils_1.MathUtils.LookRotationUpFirst(
            i,
            Vector_1.Vector.UpVectorProxy,
            e
          ),
          this.Hte.SetActorRotation(e.ToUeRotator(), "OnHitByWall", !1),
          this.Q6r(t));
    }
    OnReboundSuccess(t, i) {
      var e = BulletStaticFunction_1.HitStaticFunction.CreateEffectContext(
          this.Entity
        ),
        i = EffectSystem_1.EffectSystem.SpawnEffect(
          GlobalData_1.GlobalData.World,
          i,
          t.ToAssetPathName(),
          "[CharacterHitComponent.OnReboundSuccess]",
          e
        );
      i &&
        EffectSystem_1.EffectSystem.IsValid(i) &&
        ((t = this.Entity.GetComponent(107)) &&
          ((e = t.CurrentTimeScale),
          EffectSystem_1.EffectSystem.SetTimeScale(i, e * this.TimeDilation)),
        this.FVr.push(i));
    }
    static HitEndRequest(t) {
      var i = Protocol_1.Aki.Protocol.X2n.create();
      CombatMessage_1.CombatNet.Call(19976, t, i, this.s8r);
    }
    static PreHitNotify(t, i) {
      return (
        i.N9n?.b9n &&
          !i.N9n.R9n &&
          (t = t.GetComponent(46)) &&
          !t.PreSwitchRemoteFightState(i.N9n.I4n) &&
          ((i.N9n.R9n = !0), (i.N9n.I4n = 0)),
        !0
      );
    }
    static HitNotify(t, i) {
      var e,
        s,
        h,
        r = MathUtils_1.MathUtils.LongToNumber(i.N9n.Ekn),
        o = ModelManager_1.ModelManager.CreatureModel.GetEntity(r);
      o?.Valid
        ? ((e = i.N9n.wVn
            ? MathUtils_1.MathUtils.LongToBigInt(i.N9n.wVn).toString()
            : ""),
          (s = ConfigManager_1.ConfigManager.BulletConfig.GetBulletData(
            o.Entity,
            e
          ))
            ? ((s = new BulletTypes_1.HitInformation(
                o.Entity,
                t,
                void 0,
                0,
                void 0,
                i.N9n.LIs ?? !1,
                void 0,
                void 0,
                0,
                s,
                ""
              )),
              i.N9n.D9n &&
                s.HitEffectRotation.Set(
                  i.N9n.D9n.Pitch,
                  i.N9n.D9n.Yaw,
                  i.N9n.D9n.Roll
                ),
              i.N9n.A9n &&
                s.HitPosition.Set(i.N9n.A9n.X, i.N9n.A9n.Y, i.N9n.A9n.Z),
              i.N9n.q9n &&
                (s.HitPart = FNameUtil_1.FNameUtil.GetDynamicFName(i.N9n.q9n)),
              (h = WorldGlobal_1.WorldGlobal.ToUeRotator(i.N9n.w9n)),
              t
                ?.GetComponent(51)
                ?.ReceiveOnHit(
                  s,
                  o.Entity,
                  i.N9n.b9n ?? !1,
                  i.N9n.G9n ?? !1,
                  i.N9n.R9n ?? !1,
                  i.N9n.x9n ?? !1,
                  i.N9n.P9n ?? !1,
                  i.N9n.B9n ?? !1,
                  h,
                  i.N9n.I4n,
                  i.N9n.U9n
                ),
              t?.GetComponent(51)?.bDn(o.Entity, i.N9n))
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "World",
                15,
                `[ControllerHolder.CreatureController.HitNotify] 子弹数据不存在;${e}。`
              ))
        : Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "World",
            15,
            "[ControllerHolder.CreatureController.HitNotify] 攻击者为空，不存在动态实体:" +
              r
          );
    }
    bDn(t, i) {
      var e;
      t &&
        i &&
        t &&
        ((e = i.vkn),
        (i = {
          Attacker: t,
          Target: this.Entity,
          BulletId: MathUtils_1.MathUtils.LongToNumber(i.wVn),
          HasBeHitAnim: !1,
          BeHitAnim: i.U9n ?? 0,
          VisionCounterAttackId: 0,
          CounterAttackType: i.B9n ? 2 : i.P9n ? 1 : 0,
          SkillId: e,
          SkillGenre: t?.GetComponent(33)?.GetSkillInfo(e)?.SkillGenre ?? 0,
        }),
        SceneTeamController_1.SceneTeamController.EmitEvent(
          t,
          EventDefine_1.EEventName.CharHitRemote,
          i
        ),
        SceneTeamController_1.SceneTeamController.EmitEvent(
          this.Entity,
          EventDefine_1.EEventName.CharBeHitRemote,
          i
        ));
    }
    i8r(t, i) {
      var e = i.特效DA;
      e.AssetPathName &&
        this.PlayCounterAttackEffect(
          t,
          e.AssetPathName?.toString(),
          i.特效Scale
        );
    }
    PlayCounterAttackEffect(t, i, e) {
      i &&
        ((e = new UE.Transform(
          t.HitEffectRotation.ToUeRotator(),
          t.HitPosition.ToUeVector(),
          e
        )),
        (t = BulletStaticFunction_1.HitStaticFunction.CreateEffectContext(
          t.Attacker
        )),
        (e = EffectSystem_1.EffectSystem.SpawnEffect(
          GlobalData_1.GlobalData.World,
          e,
          i,
          "[CharacterHitComponent.BeCounterattack]",
          t
        )),
        EffectSystem_1.EffectSystem.IsValid(e)) &&
        ((i = this.Entity.GetComponent(107)) &&
          ((t = i.CurrentTimeScale),
          EffectSystem_1.EffectSystem.SetTimeScale(e, t * this.TimeDilation)),
        this.FVr.push(e));
    }
    o8r(t) {
      var i = t.被击者顿帧;
      this.Entity.GetComponent(107)?.SetTimeScale(
        i.优先级,
        i.时间膨胀值,
        i.时间膨胀变化曲线,
        i.时间膨胀时长,
        4
      ),
        (i = t.攻击者顿帧),
        this.yVr
          .GetComponent(107)
          .SetTimeScale(
            i.优先级,
            i.时间膨胀值,
            i.时间膨胀变化曲线,
            i.时间膨胀时长,
            3
          );
    }
    r8r(t) {
      var i;
      CameraController_1.CameraController.Model.IsModeEnabled(2) ||
        CameraController_1.CameraController.Model.IsModeEnabled(1) ||
        ((i =
          ModelManager_1.ModelManager.CameraModel.FightCamera.GetComponent(
            4
          ).CameraActor.K2_GetActorLocation()),
        CameraController_1.CameraController.PlayWorldCameraShake(
          t.震屏,
          i,
          0,
          exports.OUTER_RADIUS,
          1,
          !1
        )),
        CameraController_1.CameraController.FightCamera.LogicComponent.ApplyCameraModify(
          t.摄像机设置.Tag,
          t.摄像机设置.持续时间,
          t.摄像机设置.淡入时间,
          t.摄像机设置.淡出时间,
          t.摄像机设置.摄像机配置,
          void 0,
          t.摄像机设置.打断淡出时间,
          void 0,
          void 0,
          void 0,
          t.摄像机设置.CameraAttachSocket
        );
    }
    n8r() {
      var t;
      this.a6r(forbidHitTagIds) ||
        ((t = this.Entity.GetComponent(160)).Valid &&
          t.MontageSetPosition(this.kVr));
    }
    get IsTriggerCounterAttack() {
      return 0 !== this.wVr;
    }
    W6r() {
      var t;
      this.Entity.GetComponent(16) &&
        (t =
          this.TVr.ReBulletData.TimeScale.TimeScaleEffectImmune *
          CommonDefine_1.MILLIONSECOND_PER_SECOND) >= TimerSystem_1.MIN_TIME &&
        this.c5s(t);
    }
    c5s(t) {
      const i = (t) => {
        for (const e of this.zJo.BuffEffectManager.FilterById(17))
          t ? e.StartTimeScaleEffect() : e.StopTimeScaleEffect();
        var i = this.Entity.GetComponent(107);
        t ? i.ResumePauseLock() : i.ImmunePauseLock();
      };
      this.eqr() || i(!1),
        (this.zbr = TimerSystem_1.TimerSystem.Delay(() => {
          (this.zbr = void 0), i(!0);
        }, t));
    }
    eqr() {
      return !(
        !TimerSystem_1.TimerSystem.Has(this.zbr) ||
        (TimerSystem_1.TimerSystem.Remove(this.zbr), (this.zbr = void 0))
      );
    }
    IsImmuneTimeScaleEffect() {
      return TimerSystem_1.TimerSystem.Has(this.zbr);
    }
    F6r(t) {
      this.Entity === Global_1.Global.BaseCharacter?.GetEntityNoBlueprint() &&
        GamepadController_1.GamepadController.PlayForceFeedbackByHit(t);
    }
    GetAttackerEntity() {
      return this.yVr;
    }
  });
(CharacterHitComponent.r6r = void 0),
  (CharacterHitComponent.g6r = void 0),
  (CharacterHitComponent.f6r = void 0),
  (CharacterHitComponent.S6r = void 0),
  (CharacterHitComponent.y6r = void 0),
  (CharacterHitComponent.T6r = void 0),
  (CharacterHitComponent.D6r = void 0),
  (CharacterHitComponent.A6r = void 0),
  (CharacterHitComponent.a7o = void 0),
  (CharacterHitComponent.V6r = void 0),
  (CharacterHitComponent.H6r = void 0),
  (CharacterHitComponent.K6r = void 0),
  (CharacterHitComponent.s8r = (t) => {}),
  __decorate(
    [CombatMessage_1.CombatNet.PreHandle("FOn")],
    CharacterHitComponent,
    "PreHitNotify",
    null
  ),
  __decorate(
    [CombatMessage_1.CombatNet.SyncHandle("FOn")],
    CharacterHitComponent,
    "HitNotify",
    null
  ),
  (CharacterHitComponent = CharacterHitComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(51)],
      CharacterHitComponent
    )),
  (exports.CharacterHitComponent = CharacterHitComponent);
//# sourceMappingURL=CharacterHitComponent.js.map

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
Object.defineProperty(exports, "__esModule", {
  value: !0,
}),
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
  NetDefine_1 = require("../../../../../Core/Define/Net/NetDefine"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  EntitySystem_1 = require("../../../../../Core/Entity/EntitySystem"),
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
  Global_1 = require("../../../../Global"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  BattleUiDefine_1 = require("../../../../Module/BattleUi/BattleUiDefine"),
  CombatMessage_1 = require("../../../../Module/CombatMessage/CombatMessage"),
  GamepadController_1 = require("../../../../Module/Gamepad/GamepadController"),
  ColorUtils_1 = require("../../../../Utils/ColorUtils"),
  CombatDebugController_1 = require("../../../../Utils/CombatDebugController"),
  WorldGlobal_1 = require("../../../../World/WorldGlobal"),
  BulletConstant_1 = require("../../../Bullet/BulletConstant"),
  BulletStaticFunction_1 = require("../../../Bullet/BulletStaticMethod/BulletStaticFunction"),
  BulletTypes_1 = require("../../../Bullet/BulletTypes"),
  BulletUtil_1 = require("../../../Bullet/BulletUtil"),
  FightLibrary_1 = require("../Blueprint/Utils/FightLibrary"),
  CharacterBuffIds_1 = require("./Abilities/CharacterBuffIds"),
  ModManager_1 = require("../../../../Manager/ModManager"), //add my code
  CharacterUnifiedStateTypes_1 = require("./Abilities/CharacterUnifiedStateTypes");
var EAttributeId = Protocol_1.Aki.Protocol.EAttributeType;
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  EffectSystem_1 = require("../../../../Effect/EffectSystem"),
  GlobalData_1 = require("../../../../GlobalData"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  FormationEvent_1 = require("../../../../Module/Formation/FormationEvent"),
  WhirlpoolPoint_1 = require("./Move/WhirlpoolPoint"),
  MASS_RATE = 100,
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
        (this.fte = void 0),
        (this.pwe = void 0),
        (this.qQr = void 0),
        (this.ZNo = void 0),
        (this.eOo = void 0),
        (this.tOo = void 0),
        (this.iOo = void 0),
        (this.LastHitData = void 0),
        (this.rOo = !1),
        (this.oOo = !1),
        (this.nOo = !1),
        (this.sOo = []),
        (this.aOo = []),
        (this.hOo = []),
        (this.lOo = []),
        (this._Oo = 0),
        (this.uOo = void 0),
        (this.cOo = void 0),
        (this.mOo = void 0),
        (this.dOo = 0),
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
        (this.COo = !1),
        (this.gOo = 0),
        (this.fOo = 0),
        (this.pOo = 0),
        (this.vOo = void 0),
        (this.MOo = void 0),
        (this.DXr = void 0),
        (this.EOo = void 0),
        (this.SOo = 0),
        (this.yOo = !1),
        (this.IOo = void 0),
        (this._ue = Rotator_1.Rotator.Create()),
        (this.zJ = Quat_1.Quat.Create()),
        (this.qat = void 0),
        (this.HitEffectMap = new Map()),
        (this.TOo = () => {
          this.DeActiveStiff("落地");
        }),
        (this.LOo = (t, i) => {
          i === CharacterUnifiedStateTypes_1.ECharPositionState.Ground
            ? t === CharacterUnifiedStateTypes_1.ECharPositionState.Air &&
              this.DoubleHitInAirEffect?.Valid
              ? (this.DOo(),
                this.DoubleHitInAirEffect.Finish(),
                (this.ROo = !0),
                (this.UOo = Time_1.Time.Frame))
              : this.TOo()
            : t === CharacterUnifiedStateTypes_1.ECharPositionState.Air &&
              this.DoubleHitInAirEffect.Finish();
        }),
        (this.AOo = void 0),
        (this.ROo = !1),
        (this.UOo = 0),
        (this.xOo = Vector_1.Vector.Create()),
        (this.POo = Vector_1.Vector.Create()),
        (this.t8r = Transform_1.Transform.Create()),
        (this.wOo = Vector_1.Vector.Create()),
        (this.BOo = Vector_1.Vector.Create()),
        (this.DoubleHitInAirEffect = void 0),
        (this.bOo = Vector_1.Vector.Create());
    }
    GetHitData() {
      return this.iOo;
    }
    OnInitData() {
      return (this.DoubleHitInAirEffect = new DoubleHitInAirEffect()), !0;
    }
    OnInit() {
      return (
        CharacterHitComponent_1.qOo ||
          (CharacterHitComponent_1.qOo = new Set([4, 7])),
        (this.BeHitSocketName = FNameUtil_1.FNameUtil.EMPTY),
        !0
      );
    }
    OnStart() {
      return (
        (this.fte = this.Entity.GetComponent(3)),
        (this.pwe = this.Entity.GetComponent(33)),
        (this.DXr = this.Entity.GetComponent(156)),
        (this.qQr = this.Entity.GetComponent(157)),
        (this.tOo = this.Entity.GetComponent(45)),
        (this.ZNo = this.Entity.GetComponent(56)),
        (this.MOo = this.Entity.GetComponent(155)),
        (this.EOo = this.Entity.GetComponent(184)),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharOnPositionStateChanged,
          this.LOo
        ),
        (this.vOo = []),
        (this.qat = (t, i) => {
          this.vOo = this.vOo.filter((t) =>
            EffectSystem_1.EffectSystem.IsValid(t)
          );
          for (const e of this.vOo)
            EffectSystem_1.EffectSystem.SetTimeScale(e, t);
        }),
        (this.AOo = (t, i) => {
          t === CharacterUnifiedStateTypes_1.ECharPositionState.Air &&
            i === CharacterUnifiedStateTypes_1.ECharPositionState.Water &&
            this.DeActiveStiff("落水");
        }),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharBeHitTimeScale,
          this.qat
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharOnPositionStateChanged,
          this.AOo
        ),
        this.GOo(),
        !0
      );
    }
    FDe(t) {
      this.EOo?.AddTagById(t);
    }
    VDe(t) {
      this.EOo?.RemoveTagById(t);
    }
    NOo(t) {
      return this.EOo?.ContainsTagById(t) ?? !1;
    }
    OOo(t) {
      for (const i of t) if (this.NOo(i)) return !0;
      return !1;
    }
    GOo() {
      var t,
        i,
        e = this.Entity.GetComponent(0);
      e.GetEntityType() !== Protocol_1.Aki.Protocol.EEntityType.Player &&
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
          this.LOo
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharBeHitTimeScale,
          this.qat
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharOnPositionStateChanged,
          this.AOo
        ),
        this.qat && this.qat(1, 0),
        !0
      );
    }
    OnClear() {
      return (
        this.IOo &&
          TimerSystem_1.TimerSystem.Has(this.IOo) &&
          (TimerSystem_1.TimerSystem.Remove(this.IOo), (this.IOo = void 0)),
        !0
      );
    }
    GetAcceptedNewBeHitAndReset() {
      var t = this.AcceptedNewBeHit;
      return (
        this.AcceptedNewBeHit &&
          (this.kOo(!1),
          this.Entity.GetComponent(
            159
          ).MainAnimInstance.AddForceUpdateSlotNameWhenMontageBlend(
            DEFALUT_SLOT_NAME
          )),
        t
      );
    }
    kOo(t) {
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
      return this.UOo !== Time_1.Time.Frame && (this.ROo = !1), this.ROo;
    }
    SetBeHitIgnoreRotate(t) {
      this.BeHitIgnoreRotate = t;
    }
    FOo() {
      return (
        !!this.IsTriggerCounterAttack ||
        (!!this.BeHitIgnoreRotate &&
          !CharacterHitComponent_1.qOo?.has(this.BeHitAnim) &&
          this.qQr?.PositionState ===
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
          ).finally(void 0);
    }
    SetCounterAttackInfo(t) {
      (this.CounterAttackInfoInternal = t), this.FDe(1124064628);
    }
    SetVisionCounterAttackInfo(t) {
      (this.VisionCounterAttackInfoInternal = t), this.FDe(-1576849243);
    }
    GetRageMode() {
      return this.cOo;
    }
    RefreshRageModeConfig() {
      0 !== this.RageModeId
        ? ((this.cOo = HardnessModeById_1.configHardnessModeById.GetConfig(
            this.RageModeId
          )),
          this.cOo ||
            (Log_1.Log.CheckError() &&
              Log_1.Log.Error("Character", 15, "读取RageModeConfig失败", [
                "id",
                this.RageModeId,
              ])))
        : (this.cOo = void 0);
    }
    GetHardnessMode() {
      return this.mOo;
    }
    RefreshHardnessModeConfig() {
      0 !== this.HardnessModeId
        ? ((this.mOo = HardnessModeById_1.configHardnessModeById.GetConfig(
            this.HardnessModeId
          )),
          this.mOo ||
            (Log_1.Log.CheckError() &&
              Log_1.Log.Error("Character", 15, "读取白条表失败", [
                "id",
                this.HardnessModeId,
              ])))
        : (this.mOo = void 0);
    }
    ReceiveOnHit(i, t, e, s, h, r, o, a, n, _, l) {
      if (this.OOo(forbidHitTagIds))
        this.OOo(enterFkForbidHitTagIds) &&
          this.VOo(EntitySystem_1.EntitySystem.Get(i.BulletEntityId));
      else if (
        (!this.pwe?.CurrentSkill?.Active ||
          !this.pwe.CurrentSkill.SkillInfo.OverrideHit) &&
        e
      ) {
        if (
          ((this.iOo = i),
          (this.LastHitData = i),
          (this.eOo = t),
          (this.EnterFk = h),
          (this.oOo = r),
          (this._Oo = o ? 1 : a ? 2 : 0),
          (this.COo = !1),
          (this.rOo = !0),
          (this.BeHitTime = UE.GameplayStatics.GetTimeSeconds(this.fte.Actor)),
          this.BeHitLocation.DeepCopy(i.HitPosition),
          (this.NeedCalculateFallInjure = !0),
          0 < _ && !h)
        ) {
          if (this.NOo(1447214865) && !this.IsTriggerCounterAttack)
            return void this.HOo();
          if (
            (this.jOo(),
            this.IsTriggerCounterAttack && this.WOo(this.iOo),
            (this.dOo = this.tOo?.TrySwitchHitState(l, !1) ?? 0),
            !this.tOo || this.dOo)
          ) {
            this.BeHitAnim = l;
            e = i.ReBulletData.Base;
            let t = e.BeHitEffect;
            this.oOo && (t = e.HitEffectWeakness);
            r = ConfigManager_1.ConfigManager.BulletConfig.GetBulletHitData(
              this.eOo,
              t
            );
            r
              ? (CombatDebugController_1.CombatDebugController.CombatInfo(
                  "Hit",
                  this.Entity,
                  "远端受击"
                ),
                this.fte.SetMoveControlled(!1, 2, "远端受击"),
                s &&
                  this.Entity.GetComponent(3).SetActorRotation(
                    n,
                    "受击者旋转",
                    !1
                  ),
                (this.BeHitAnim = l),
                this.KOo(r))
              : this.VOo(EntitySystem_1.EntitySystem.Get(i.BulletEntityId));
          } else this.VOo(EntitySystem_1.EntitySystem.Get(i.BulletEntityId));
        }
        !this.EnterFk ||
          ((o = t.GetComponent(1))?.Valid &&
            (this.fte.ActorLocationProxy.Subtraction(
              o.ActorLocationProxy,
              this.BeHitDirect
            ),
            this.BeHitDirect.Normalize())) ||
          this.fte.ActorForwardProxy.Multiply(-1, this.BeHitDirect),
          this.HOo();
      }
    }
    QOo(t) {
      this.fte.CreatureData.GetEntityType() !==
        Protocol_1.Aki.Protocol.EEntityType.Monster ||
        this.qQr.IsInFightState() ||
        (this.ZNo.CollectSampleAndSend(!0),
        (i = this.fte.CreatureData.GetPbDataId()),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Character", 51, "怪物受击，主动同步位置", [
            "PbDataId",
            i,
          ]));
      var i = Protocol_1.Aki.Protocol.HitInformation.create(),
        e = this.eOo.GetComponent(0).GetCreatureDataId(),
        s = this.Entity.GetComponent(0).GetCreatureDataId(),
        e =
          ((i.Id = MathUtils_1.MathUtils.NumberToLong(e)),
          (i.TargetId = MathUtils_1.MathUtils.NumberToLong(s)),
          (i.BulletId = Long.fromNumber(this.iOo.BulletId)),
          this.iOo.HitPosition),
        s =
          ((i.HitEffectPos = {
            X: e.X,
            Y: e.Y,
            Z: e.Z,
          }),
          (i.HitEffectRotate = {
            Pitch: this.iOo.HitEffectRotation.Pitch,
            Yaw: this.iOo.HitEffectRotation.Yaw,
            Roll: this.iOo.HitEffectRotation.Roll,
          }),
          (i.HitPos = {
            X: e.X,
            Y: e.Y,
            Z: e.Z,
          }),
          (i.BeHitAnim = this.BeHitAnim),
          (i.EnterFk = this.EnterFk),
          (i.IsHitWeakness = this.oOo),
          (i.IsTriggerCounterattack = 1 === this._Oo),
          (i.IsTriggerVisionCounterAttack = 2 === this._Oo),
          (i.VictimRotation = this.uOo),
          (i.HasBeHitData = this.rOo),
          (i.HitPart = this.iOo.HitPart?.toString() ?? ""),
          (i.IsChangeVictimRotation = !this.FOo() && this.rOo && !this.EnterFk),
          t.GetBulletInfo());
      (i.SkillId = s.BulletInitParams.SkillId),
        (i.Source = s.BulletInitParams.Source);
      const h = this.dOo;
      h && (i.FightState = this.tOo?.GetFightState() ?? 0),
        CombatDebugController_1.CombatDebugController.CombatDebug(
          "FightState",
          this.Entity,
          "HitRequest " + i.FightState
        );
      e = Protocol_1.Aki.Protocol.HitRequest.create();
      (e.HitInfo = i),
        CombatMessage_1.CombatNet.Call(
          NetDefine_1.ERequestMessageId.HitRequest,
          this.Entity,
          e,
          (t) => {
            h && this.tOo?.ConfirmState(h);
          }
        );
    }
    OnHitone(t, i, e, s, h, r, o, a, n) {
      //copy old
      (this.iOo = t),
        (this.LastHitData = t),
        (this.eOo = EntitySystem_1.EntitySystem.Get(t.Attacker.Id)),
        (this.rOo = i),
        (this.nOo = s),
        (this.sOo = r),
        (this.aOo = o),
        (this.hOo = a),
        (this.lOo = n),
        (this.yOo = h),
        (this.COo = !1),
        this.YOo(),
        this.JOo(e),
        this.IsTriggerCounterAttack && this.zOo(),
        this.eko(),
        this.iko(),
        this.fDo(e),
        this.oko(),
        this.sko(e),
        GlobalData_1.GlobalData.Networking() && this.QOo(e),
        this.hko(),
        this.HOo();
    }
    //多倍攻击hit multiplier
    OnHit(t, i, e, s, h, r, o, a, n) {
      if (ModManager_1.ModManager.Settings.GodMode === true) {
        var Target = EntitySystem_1.EntitySystem.Get(t.Target.Id);
        if (
          Target.GetComponent(0).GetEntityType() ===
          Protocol_1.Aki.Protocol.EEntityType.Player
        )
          return;
      }
      if (ModManager_1.ModManager.Settings.HitMultiplier === true) {
        var attacker = EntitySystem_1.EntitySystem.Get(t.Attacker.Id);
        if (
          attacker.GetComponent(0).GetEntityType() ===
          Protocol_1.Aki.Protocol.EEntityType.Player
        ) {
          for (let j = 0; j < ModManager_1.ModManager.Settings.Hitcount; j++) {
            this.OnHitone(t, i, e, s, h, r, o, a, n);
          }
          return;
        }
      }

      this.OnHitone(t, i, e, s, h, r, o, a, n);
    }

    HOo() {
      (this.iOo = void 0),
        (this.eOo = void 0),
        (this.aOo = void 0),
        (this.hOo = void 0),
        (this.lOo = void 0),
        (this.yOo = !1),
        (this.dOo = 0);
    }
    OnSharedHit(t, i, e, s) {
      (this.iOo = t),
        (this.LastHitData = t),
        (this.eOo = EntitySystem_1.EntitySystem.Get(t.Attacker.Id)),
        (this.rOo = i),
        (this.nOo = !1),
        (this.yOo = !0),
        (this.COo = !1),
        this.YOo(),
        (this._Oo = 0),
        this.eko(),
        this.lko(s),
        this.jOo(),
        this.fDo(e),
        this.oko(),
        this.sko(e),
        this.hko(),
        this.HOo();
    }
    ActiveStiff(t) {
      var i;
      0 !== t &&
        (this.IOo &&
          TimerSystem_1.TimerSystem.Has(this.IOo) &&
          (TimerSystem_1.TimerSystem.Remove(this.IOo), (this.IOo = void 0)),
        this.FDe(-2044964178),
        (i = () => {
          this.Entity.Valid && ((this.IOo = void 0), this.VDe(-2044964178));
        }),
        0 < t) &&
        (this.IOo = TimerSystem_1.TimerSystem.Delay(
          i,
          t * BattleUiDefine_1.SECOND_TO_MILLISECOND
        ));
    }
    DeActiveStiff(t = "") {
      this.IOo &&
        TimerSystem_1.TimerSystem.Has(this.IOo) &&
        (TimerSystem_1.TimerSystem.Remove(this.IOo), (this.IOo = void 0)),
        this.VDe(-2044964178),
        CombatDebugController_1.CombatDebugController.CombatDebug(
          "Hit",
          this.Entity,
          "清除硬直",
          ["reason", t]
        );
    }
    IsStiff() {
      return this.NOo(-2044964178);
    }
    YOo() {
      (this.BeHitBones.length = 0),
        this.iOo.HitPart &&
          !FNameUtil_1.FNameUtil.IsNothing(this.iOo.HitPart) &&
          this.BeHitBones.push(this.iOo.HitPart),
        this.BeHitBones && 0 < this.BeHitBones?.length
          ? (this.BeHitSocketName = this.BeHitBones[0])
          : (this.BeHitSocketName = FNameUtil_1.FNameUtil.EMPTY);
    }
    JOo(t) {
      this._ko(t)
        ? (this._Oo = 1)
        : this.uko(t)
        ? (this._Oo = 2)
        : (this._Oo = 0);
    }
    _ko(t) {
      if (!t.Data.Logic.CanCounterAttack) return !1;
      if (!this.NOo(1124064628))
        return (
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Character", 21, "CheckNormalCounterAttack无Tag"),
          !1
        );
      if (this.CounterAttackInfoInternal.QTE弹刀忽略角度距离检测) {
        (t = t.GetBulletInfo()),
          (t = this.eOo
            .GetComponent(33)
            .GetSkillInfo(t.BulletInitParams.SkillId));
        if (t && 4 === t.SkillGenre) return !0;
      }
      var i = this.iOo.HitPart,
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
      this.xOo.FromUeVector(this.eOo.GetComponent(3).ActorLocationProxy),
        h
          ? ((t = this.fte.GetBoneLocation(i.toString())),
            this.POo.FromUeVector(t),
            DEBUG &&
              UE.KismetSystemLibrary.DrawDebugSphere(
                GlobalData_1.GlobalData.GameInstance,
                t,
                10,
                void 0,
                ColorUtils_1.ColorUtils.LinearGreen,
                4
              ),
            this.xOo.SubtractionEqual(this.POo))
          : this.xOo.SubtractionEqual(this.fte.ActorLocationProxy);
      var t = this.xOo.Size(),
        o =
          (this.xOo.Normalize(MathCommon_1.MathCommon.KindaSmallNumber),
          Vector_1.Vector.DotProduct(this.fte.ActorForwardProxy, this.xOo)),
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
    uko(t) {
      return !!t.Data.Logic.CanVisionCounterAttack && !!this.NOo(-1576849243);
    }
    fDo(t) {
      var i,
        e = this.oOo
          ? this.iOo.ReBulletData.TimeScale.AttackerTimeScaleOnHitWeakPoint
          : this.iOo.ReBulletData.TimeScale.TimeScaleOnAttack;
      this.iOo.ReBulletData.TimeScale.TimeScaleOnAttackIgnoreAttacker
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
          (this.eOo
            .GetComponent(107)
            .SetTimeScale(
              e.优先级,
              e.时间膨胀值,
              e.时间膨胀变化曲线,
              e.时间膨胀时长,
              1
            ),
          (t = this.iOo.ReBulletData.TimeScale.CharacterCustomKeyTimeScale),
          StringUtils_1.StringUtils.IsEmpty(t) ||
            ((i =
              ModelManager_1.ModelManager.BulletModel.GetEntityIdByCustomKey(
                this.eOo.Id,
                t,
                this.iOo.BulletId.toString()
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
                  ["子弹ID", this.iOo.BulletId]
                ))),
        this.iOo.ReBulletData.Base.ContinuesCollision ||
          this.NOo(-648310348) ||
          (0 <
            (i = this.oOo
              ? this.iOo.ReBulletData.TimeScale.VictimTimeScaleOnHitWeakPoint
              : this.iOo.ReBulletData.TimeScale.TimeScaleOnHit).时间膨胀时长 &&
            this.Entity.GetComponent(107)?.SetTimeScale(
              i.优先级,
              i.时间膨胀值,
              i.时间膨胀变化曲线,
              i.时间膨胀时长,
              2
            ));
    }
    cko(t, i, e) {
      var s = i.Effect;
      ObjectUtils_1.ObjectUtils.SoftObjectReferenceValid(s) &&
        t.push(s.ToAssetPathName()),
        e &&
          ((s = i.Audio),
          ObjectUtils_1.ObjectUtils.SoftObjectReferenceValid(s)) &&
          t.push(s.ToAssetPathName());
    }
    e8r() {
      var i = new Array(),
        e = this.Entity.GetComponent(3);
      if (e.IsPartHit) {
        var s = this.iOo.ReBulletData.Base.EnablePartHitAudio;
        let t = !1;
        if (this.lOo && 0 < this.lOo.length)
          for (const a of this.lOo) {
            var h = e.GetPartHitConf(a);
            if (h) {
              if (((t = !0), h.ReplaceBulletHitEffect))
                return (i.length = 0), this.cko(i, h, s), i;
              this.cko(i, h, s);
            }
          }
        if (
          !t &&
          this.iOo.HitPart &&
          !FNameUtil_1.FNameUtil.IsNothing(this.iOo.HitPart)
        ) {
          var r = e.GetPartHitConf(this.iOo.HitPart.toString());
          if (r) {
            if (r.ReplaceBulletHitEffect)
              return (i.length = 0), this.cko(i, r, s), i;
            this.cko(i, r, s);
          }
        }
      }
      var r = this.iOo.ReBulletData.Render.EffectOnHit,
        o = r.get(9);
      if (o && 0 < o.length && this.NOo(501201e3)) i.push(o);
      else {
        let t = 4;
        this.oOo && (t = 7);
        o = r.get(t);
        o && 0 !== o.length && i.push(o);
      }
      return i;
    }
    jOo() {
      if (!(this.iOo.ReBulletData.Base.DamageId <= 0)) {
        var t = this.e8r();
        if (t && 0 < t.length) {
          var i,
            e = this.iOo.ReBulletData.Render.EffectOnHitConf.get(0),
            s = this.iOo.HitPosition,
            h =
              (e &&
                ((h = EntitySystem_1.EntitySystem.Get(this.iOo.BulletEntityId)),
                e.EnableHighLimit) &&
                ((h = h.GetBulletInfo().ActorComponent.ActorLocationProxy.Z),
                (i = e.HighLimit),
                (s.Z = MathUtils_1.MathUtils.Clamp(s.Z, h + i.X, h + i.Y))),
              e ? e.Scale : Vector_1.Vector.OneVectorProxy);
          this.t8r.Set(s, this.iOo.HitEffectRotation.Quaternion(), h);
          for (const r of t)
            BulletStaticFunction_1.HitStaticFunction.PlayHitEffect(
              GlobalData_1.GlobalData.World,
              r,
              this.t8r.ToUeTransform(),
              this.iOo.Attacker,
              "[CharacterHitComponent.ProcessHitEffect]"
            );
        }
      }
    }
    iko() {
      this.mko();
      var t = this.dko(this.iOo);
      this.sOo && 0 < this.sOo.length
        ? this.Cko(this.sOo, t)
        : (this.gko(this.aOo, t), this.yOo && this.fko(this.hOo, t));
    }
    lko(t) {
      var i;
      this.iOo.Attacker.CheckGetComponent(3).IsAutonomousProxy &&
        ((i = this.dko(this.iOo)),
        (i = this.pko(i, !1, !1, void 0, t)),
        (this.ToughDecreaseValue = i.ToughResult));
    }
    Cko(t, i) {
      let e = !1;
      for (const r of t) e ||= r.IsTransferDamage;
      for (const o of t) {
        if (this.DXr)
          for (const a of o.AttributeBuffList)
            this.DXr.AddBuff(a, {
              InstigatorId: this.DXr.CreatureDataId,
              Reason: "命中阻挡部位",
            });
        var s = !(o.SeparateDamage && e),
          h = this.pko(i, !1, s, o.Index);
        s || (this.ToughDecreaseValue = h.ToughResult);
      }
      if (e) {
        if (this.DXr)
          for (const n of t[0].AttributeBuffList)
            this.DXr.AddBuff(n, {
              InstigatorId: this.DXr.CreatureDataId,
              Reason: "命中主部位（转移）",
            });
        t = this.pko(i, !1, !e, t[0].Index);
        this.ToughDecreaseValue = t.ToughResult;
      }
    }
    gko(t, i) {
      if (t) {
        this.oOo = !1;
        for (const s of t) {
          if (this.DXr)
            for (const h of s.AttributeBuffList)
              this.DXr.AddBuff(h, {
                InstigatorId: this.DXr.CreatureDataId,
                Reason: "命中分离部位",
              });
          var e = s.IsWeaknessHit;
          (this.oOo ||= e), this.pko(i, e, !1, s.Index);
        }
      }
    }
    fko(t, i) {
      if (t && 0 < t.length) {
        t = t[0];
        if (this.DXr)
          for (const s of t.AttributeBuffList)
            this.DXr.AddBuff(s, {
              InstigatorId: this.DXr.CreatureDataId,
              Reason: "命中保底部位",
            });
        var e = t.IsWeaknessHit,
          e = ((this.oOo ||= e), this.pko(i, this.oOo, !1, t.Index));
        this.ToughDecreaseValue = e.ToughResult;
      } else {
        t = this.pko(i, this.oOo, !1);
        this.ToughDecreaseValue = t.ToughResult;
      }
    }
    pko(t, i, e, s = -1, h = 1) {
      var r,
        o,
        a = t.ReBulletData.Base.DamageId,
        n = t.Target;
      return a < 1 || !n
        ? {
            DamageResult: 0,
            ToughResult: 0,
          }
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
                  IsAddEnergy: this.nOo,
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
            : {
                DamageResult: DEFAULT_DAMAGE,
                ToughResult: 0,
              });
    }
    dko(t) {
      t = Object.assign(t);
      return (
        (t.Attacker = this.eOo.GetComponent(46).GetAttributeHolder()),
        (t.Target =
          this.Entity.GetComponent(46)?.GetAttributeHolder() ?? this.Entity),
        t
      );
    }
    oko() {
      var t, i;
      CameraController_1.CameraController.Model.IsModeEnabled(2) ||
        CameraController_1.CameraController.Model.IsModeEnabled(1) ||
        !this.iOo.IsShaking ||
        ((i = this.iOo.ReBulletData.Render),
        (t = this.oOo
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
    VOo(t) {
      !t ||
        t.Data.Base.DamageId <= 0 ||
        ((this.EnterFk = !0),
        (t = t.GetBulletInfo()),
        BulletUtil_1.BulletUtil.GetHitRotator(t, this.fte, this._ue),
        this._ue.Quaternion(this.zJ),
        this.zJ.RotateVector(
          Vector_1.Vector.ForwardVectorProxy,
          this.BeHitDirect
        ),
        this.BeHitDirect.MultiplyEqual(-1),
        this.vko(0));
    }
    sko(i) {
      if (
        (this.IsTriggerCounterAttack && this.WOo(this.iOo),
        this.OOo(forbidHitTagIds))
      )
        (this.rOo = !1), this.OOo(enterFkForbidHitTagIds) && this.VOo(i);
      else if (this.rOo) {
        var e = this.iOo.ReBulletData.Base;
        let t = e.BeHitEffect;
        this.oOo && (t = e.HitEffectWeakness);
        e = ConfigManager_1.ConfigManager.BulletConfig.GetBulletHitData(
          this.eOo,
          t
        );
        if (e) {
          this.BeHitTime = UE.GameplayStatics.GetTimeSeconds(this.fte.Actor);
          var s = this.MOo?.GetCurrentValue(EAttributeId.Tough) ?? 0;
          if (
            (this.BeHitLocation.DeepCopy(this.iOo.HitPosition),
            (this.NeedCalculateFallInjure = !0),
            !(0 < s || this.ToughDecreaseValue <= 0 || this.NOo(1447214865)) ||
              (this.IsTriggerCounterAttack && this.COo))
          ) {
            let t = 0;
            e && (t = this.COo ? 7 : e.被击动作),
              (t = this.Sko(t)),
              this.tOo &&
              ((this.dOo = this.tOo.TrySwitchHitState(t, !0)), !this.dOo)
                ? this.VOo(i)
                : (CombatDebugController_1.CombatDebugController.CombatInfo(
                    "Hit",
                    this.Entity,
                    "受击",
                    ["BeHitAnim", t]
                  ),
                  ModelManager_1.ModelManager.GameModeModel.IsMulti &&
                    this.fte.SetMoveControlled(!0, 2, "受击"),
                  (this.BeHitAnim = t),
                  (this.EnterFk = !1),
                  (s = i.GetBulletInfo()),
                  this.FOo()
                    ? (BulletUtil_1.BulletUtil.GetHitRotator(
                        s,
                        this.fte,
                        this._ue
                      ),
                      (this.uOo = this._ue.ToUeRotator()))
                    : (this.uOo = BulletUtil_1.BulletUtil.SetHitRotator(
                        s,
                        this.fte,
                        this.iOo.HitEffect.受击朝向Z轴偏转
                      )),
                  this.yko(),
                  this.FOo() &&
                    (this.BeHitAnim =
                      BulletUtil_1.BulletUtil.GetOverrideHitAnimByAngle(
                        this.fte,
                        this.BeHitAnim,
                        this.uOo.Yaw
                      )),
                  this.Tko(e),
                  this.vko(lightHits.has(this.BeHitAnim) ? 1 : 2));
          } else this.VOo(i);
        }
      }
    }
    eko() {
      this.NOo(1124064628) &&
        this.DXr.RemoveBuffByTag(1124064628, "撞墙或受击逻辑触发移除");
    }
    hko() {
      if (this.iOo) {
        let t = 0;
        var i = this.rOo && !this.EnterFk;
        2 !== this._Oo ||
          this.COo ||
          ((t = this.VisionCounterAttackInfoInternal.对策事件ID),
          GlobalData_1.GlobalData.BpEventManager.当触发对策事件时.Broadcast(
            this.VisionCounterAttackInfoInternal.对策事件ID,
            this.iOo.ToUeHitInformation()
          ));
        var e,
          s = EntitySystem_1.EntitySystem.Get(
            this.iOo.BulletEntityId
          ).GetBulletInfo(),
          s = Number(s.BulletInitParams.SkillId),
          i = {
            HasBeHitAnim: i,
            BeHitAnim: this.BeHitAnim,
            VisionCounterAttackId: t,
            CounterAttackType: this._Oo,
            SkillId: s,
            SkillGenre:
              this.eOo?.GetComponent(33)?.GetSkillInfo(s)?.SkillGenre ?? 0,
          },
          s =
            (this.eOo &&
              (EventSystem_1.EventSystem.EmitWithTarget(
                this.eOo,
                EventDefine_1.EEventName.CharHit,
                this.iOo,
                i
              ),
              (s =
                ModelManager_1.ModelManager.FormationModel.GetFormationInsByEntityId(
                  this.eOo.Id
                )) &&
                (s.IsLocal() &&
                  EventSystem_1.EventSystem.EmitWithTarget(
                    FormationEvent_1.Formation.Local,
                    EventDefine_1.EEventName.CharHit,
                    this.iOo,
                    i
                  ),
                EventSystem_1.EventSystem.EmitWithTarget(
                  FormationEvent_1.Formation.All,
                  EventDefine_1.EEventName.CharHit,
                  this.iOo,
                  i
                )),
              (s = this.eOo.GetComponent(0))) &&
              (s = s.IsVision()
                ? this.eOo.GetComponent(46)?.GetAttributeHolder()
                : this.eOo) &&
              ((e = EventDefine_1.EEventName.CharHitIncludingVision),
              EventSystem_1.EventSystem.EmitWithTarget(s, e, this.iOo, i),
              (s =
                ModelManager_1.ModelManager.FormationModel.GetFormationInsByEntityId(
                  s.Id
                ))) &&
              s.IsLocal() &&
              (s.IsLocal() &&
                EventSystem_1.EventSystem.EmitWithTarget(
                  FormationEvent_1.Formation.Local,
                  e,
                  this.iOo,
                  i
                ),
              EventSystem_1.EventSystem.EmitWithTarget(
                FormationEvent_1.Formation.All,
                e,
                this.iOo,
                i
              )),
            EventSystem_1.EventSystem.EmitWithTarget(
              this.Entity,
              EventDefine_1.EEventName.CharBeHit,
              this.iOo,
              i
            ),
            ModelManager_1.ModelManager.FormationModel.GetFormationInsByEntityId(
              this.Entity.Id
            ));
        s &&
          (s.IsLocal() &&
            EventSystem_1.EventSystem.EmitWithTarget(
              FormationEvent_1.Formation.Local,
              EventDefine_1.EEventName.CharBeHit,
              this.iOo,
              i
            ),
          EventSystem_1.EventSystem.EmitWithTarget(
            FormationEvent_1.Formation.All,
            EventDefine_1.EEventName.CharBeHit,
            this.iOo,
            i
          )),
          GlobalData_1.GlobalData.BpEventManager.当有角色受击时.Broadcast(
            this.fte.Actor,
            this.iOo.ToUeHitInformation()
          );
      } else
        CombatDebugController_1.CombatDebugController.CombatError(
          "Hit",
          this.Entity,
          "HitData为空"
        );
    }
    Tko(t) {
      this.kOo(!0),
        this.Entity.GetComponent(157).ExitAimStatus(),
        EventSystem_1.EventSystem.EmitWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharBeHitAnim
        );
      var i = this.Entity.GetComponent(159);
      if (
        (i.Valid &&
          i.MainAnimInstance &&
          (i.MainAnimInstance.Montage_Stop(0),
          i.MainAnimInstance.ForceSetCurrentMontageBlendTime(0, void 0)),
        this.Lko(),
        this.NOo(-1732582420))
      ) {
        var i = t.地面受击滞空,
          e = i.滞空时间 + i.到滞空点时间;
        if (this.Dko(e)) return void this.Rko(i, e);
        this.Uko(t);
      } else if (!this.NOo(-648310348))
        if (this.NOo(-1898186757)) {
          if (4 === this.BeHitAnim) {
            (i = t.地面受击滞空), (e = i.滞空时间 + i.到滞空点时间);
            if (this.Dko(e)) return void this.Rko(i, e);
            if (0 < t.地面受击速度.Z) return void this.Ako(t, !1);
          }
          this.Uko(t);
        } else {
          (i = t.空中受击滞空), (e = i.滞空时间 + i.到滞空点时间);
          if (this.Dko(e)) return void this.Rko(i, e);
          this.Ako(t, !0);
        }
      this.NOo(504239013) &&
        (i = this.Entity.GetComponent(160)).Valid &&
        i.CharacterMovement.SetMovementMode(3);
    }
    Rko(t, i) {
      var e,
        s,
        h,
        r = this.Entity.GetComponent(160);
      r.Valid &&
        ((e = this.fte),
        (s = WhirlpoolPoint_1.WhirlpoolPoint.GenId()),
        this.wOo.FromUeVector(t.滞空相对位置),
        MathUtils_1.MathUtils.TransformPosition(
          e.ActorLocationProxy,
          e.ActorRotationProxy,
          e.ActorScaleProxy,
          this.wOo,
          this.BOo
        ),
        (h = this.eOo.GetComponent(3).ActorLocationProxy.Z + t.滞空高度限制) <
          this.BOo.Z && (this.BOo.Z = h),
        r.BeginWhirlpool(
          s,
          t.到滞空点时间,
          this.BOo,
          e.ActorLocationProxy,
          i,
          t.到滞空点曲线
        ));
    }
    Dko(t) {
      return 0 < t;
    }
    KOo(t) {
      this.kOo(!0),
        this.Entity.GetComponent(157).ExitAimStatus(),
        EventSystem_1.EventSystem.EmitWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharBeHitAnim
        );
      var i = this.Entity.GetComponent(159);
      i.Valid &&
        i.MainAnimInstance &&
        (i.MainAnimInstance.Montage_Stop(0),
        i.MainAnimInstance.ForceSetCurrentMontageBlendTime(0, void 0)),
        this.Lko(),
        4 === this.BeHitAnim ? this.Ako(t, !1) : this.Uko(t);
    }
    Lko() {
      switch (this.BeHitAnim) {
        case 0:
        case 1:
        case 8:
        case 9:
          this.Entity.GetComponent(157).SetMoveState(
            CharacterUnifiedStateTypes_1.ECharMoveState.SoftKnock
          );
          break;
        case 2:
        case 3:
        case 10:
        case 11:
        case 6:
          this.Entity.GetComponent(157).SetMoveState(
            CharacterUnifiedStateTypes_1.ECharMoveState.HeavyKnock
          );
          break;
        case 4:
          this.Entity.GetComponent(157).SetMoveState(
            CharacterUnifiedStateTypes_1.ECharMoveState.KnockUp
          );
          break;
        case 5:
          this.Entity.GetComponent(157).SetMoveState(
            CharacterUnifiedStateTypes_1.ECharMoveState.KnockDown
          );
          break;
        case 7:
          this.Entity.GetComponent(157).SetMoveState(
            CharacterUnifiedStateTypes_1.ECharMoveState.Parry
          );
      }
    }
    Ako(t, i) {
      this.ActiveStiff(-1);
      var e,
        s = this.Entity.GetComponent(160);
      s.Valid &&
        ((e = this.fte),
        this.wOo.FromUeVector(i ? t.空中受击速度 : t.地面受击速度),
        (i = this.MOo?.GetCurrentValue(EAttributeId.Mass) ?? MASS_RATE),
        this.wOo.MultiplyEqual(MASS_RATE / i),
        this.Entity.GetComponent(157).SetMoveState(
          CharacterUnifiedStateTypes_1.ECharMoveState.KnockUp
        ),
        s.GetWhirlpoolEnable() && s.EndWhirlpool(),
        3 !== s.CharacterMovement.MovementMode &&
          s.CharacterMovement.SetMovementMode(3),
        e.ActorQuatProxy.RotateVector(this.wOo, this.BOo),
        s.Active && s.SetForceFallingSpeed(this.BOo, 31862857),
        (e = 0 < (i = t.空中受击移动时间) ? i : t.地面受击移动时间),
        s.SetGravityScale(t.上升标量, t.下落标量, t.弧顶标量, t.速度阈值, e),
        0 < t.落地反弹.Z
          ? this.DoubleHitInAirEffect.FromUeHitEffect(t)
          : this.DoubleHitInAirEffect.Finish());
    }
    DOo() {
      var t = this.Entity.GetComponent(160),
        i = t.GetLastUpdateVelocity();
      this.wOo.Set(
        i.X * this.DoubleHitInAirEffect.LandingBounce.X,
        0,
        -1 * i.Z * this.DoubleHitInAirEffect.LandingBounce.Z
      ),
        this.wOo.MultiplyEqual(
          (MASS_RATE / this.MOo.GetCurrentValue(EAttributeId.Mass)) *
            this.Entity.GetComponent(107).CurrentTimeScale
        ),
        this.Entity.GetComponent(157).SetMoveState(
          CharacterUnifiedStateTypes_1.ECharMoveState.KnockUp
        ),
        t.Valid &&
          (this.fte.ActorQuatProxy.RotateVector(this.wOo, this.bOo),
          t.Active && t.SetForceSpeed(this.bOo),
          3 !== t.CharacterMovement.MovementMode &&
            t.CharacterMovement.SetMovementMode(3),
          t.SetGravityScale(
            this.DoubleHitInAirEffect.GravityScaleUp,
            this.DoubleHitInAirEffect.GravityScaleDown,
            this.DoubleHitInAirEffect.GravityScaleTop,
            this.DoubleHitInAirEffect.VelocityTop,
            this.DoubleHitInAirEffect.Duration
          ));
    }
    Uko(t) {
      var i,
        e = new UE.Vector(t.地面受击速度.X, t.地面受击速度.Y, 0),
        s = t.地面受击最小速度,
        h = t.地面受击最大速度,
        r = t.地面受击移动时间,
        o = t.命中硬直时间,
        t = t.地面受击移动曲线;
      0 < r &&
        ((i = this.MOo?.GetCurrentValue(EAttributeId.Mass) ?? MASS_RATE),
        (e = e.op_Multiply(MASS_RATE / i)),
        (i = this.Entity.GetComponent(160)).Valid) &&
        (i.GetWhirlpoolEnable() && i.EndWhirlpool(),
        (this.SOo = i.SetAddMove(e, r, void 0, this.SOo, t, s, h))),
        this.ActiveStiff(o);
    }
    Sko(t) {
      let i = void 0;
      return (i =
        !this.BeHitMapping || this.BeHitMapping.ID <= 0
          ? t
          : this.BeHitMapping.映射表.Get(t));
    }
    zOo() {
      var t = this.eOo.CheckGetComponent(156);
      switch (this._Oo) {
        case 1:
          0 < this.CounterAttackInfoInternal.攻击者应用BuffID &&
            t.AddBuff(this.CounterAttackInfoInternal.攻击者应用BuffID, {
              InstigatorId: t.CreatureDataId,
              Reason: "拼刀攻击者应用Buff",
            }),
            0 < this.CounterAttackInfoInternal.被弹反者应用BuffID &&
              this.DXr?.AddBuff(
                this.CounterAttackInfoInternal.被弹反者应用BuffID,
                {
                  InstigatorId: this.DXr?.CreatureDataId,
                  Reason: "拼刀受击者应用Buff",
                }
              );
          break;
        case 2:
          0 < this.VisionCounterAttackInfoInternal.攻击者应用BuffID &&
            t.AddBuff(this.VisionCounterAttackInfoInternal.攻击者应用BuffID, {
              InstigatorId: t.CreatureDataId,
              Reason: "对策攻击者应用Buff",
            }),
            0 < this.VisionCounterAttackInfoInternal.被对策者应用BuffID &&
              this.DXr?.AddBuff(
                this.VisionCounterAttackInfoInternal.被对策者应用BuffID,
                {
                  InstigatorId: this.DXr?.CreatureDataId,
                  Reason: "对策受击者应用Buff",
                }
              );
      }
      t.AddBuff(CharacterBuffIds_1.buffId.CounterInvincibleCommon, {
        InstigatorId: t.CreatureDataId,
        Reason: "弹反攻击者无敌",
      });
    }
    WOo(t) {
      switch (this._Oo) {
        case 1:
          this.xko(t);
          break;
        case 2:
          this.Pko(t);
      }
    }
    xko(t) {
      let i = this.CounterAttackInfoInternal.无弹反动作效果;
      (this.COo = this.wko()),
        this.COo && (i = this.CounterAttackInfoInternal.有弹反动作效果),
        this.Bko(t, i),
        this.bko(i),
        this.eOo.GetComponent(3).IsAutonomousProxy && this.qko(i),
        this.Gko();
      t = this.CounterAttackInfoInternal?.结束事件Tag;
      t?.TagName !== StringUtils_1.NONE_STRING &&
        this.EOo?.AddTagById(t?.TagId ?? 0);
    }
    Pko(t) {
      this.COo = !this.VisionCounterAttackInfoInternal.广播对策事件;
      var i = this.VisionCounterAttackInfoInternal.对策动作效果;
      this.Bko(t, i),
        this.bko(i),
        this.eOo.GetComponent(3).IsAutonomousProxy &&
          !this.NOo(1161958668) &&
          this.qko(i),
        this.Gko();
    }
    mko() {
      !this.DXr ||
        1 !== this._Oo ||
        (this.DXr.HasBuffAuthority() &&
          0 < this.CounterAttackInfoInternal.ANS期间被弹反者生效的BuffID &&
          (this.fOo = this.DXr.AddBuffLocal(
            this.CounterAttackInfoInternal.ANS期间被弹反者生效的BuffID,
            {
              InstigatorId: this.DXr.CreatureDataId,
              Reason: "弹反ANS附加的buff",
            }
          )),
        this.CounterAttackInfoInternal.削韧倍率 <= 1) ||
        (this.gOo = this.DXr.AddAttributeRateModifierLocal(
          EAttributeId.ToughReduce,
          this.CounterAttackInfoInternal.削韧倍率,
          "弹反修改韧性倍率"
        ));
    }
    CounterAttackEnd() {
      this.gOo && this.DXr?.RemoveBuffByHandle(this.gOo),
        this.fOo && this.DXr?.RemoveBuffByHandle(this.fOo),
        this.VDe(1124064628),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Character", 21, "CounterAttackEnd", [
            "CounterAttackType",
            this._Oo,
          ]),
        (this._Oo = 0);
    }
    VisionCounterAttackEnd() {
      this.VDe(-1576849243);
    }
    wko() {
      if (!this.CounterAttackInfoInternal.受击动画忽略Buff检测 && this.DXr) {
        var i = this.CounterAttackInfoInternal.检测Buff列表;
        for (let t = 0; t < i.Num(); t++) {
          var e = i.Get(t),
            s = this.DXr.GetBuffTotalStackById(e.BuffID, !1);
          if (e.层数 > s) return !1;
        }
      }
      return !0;
    }
    SetCounterAttackEndTime(t) {
      var i = this.Entity.GetComponent(159).MainAnimInstance;
      i && (this.pOo = t + i.Montage_GetPosition(i.GetCurrentActiveMontage()));
    }
    OnHitByWall(t, i) {
      var e;
      (this.iOo = void 0),
        (this.BeHitBones.length = 0),
        (this.BeHitSocketName = FNameUtil_1.FNameUtil.EMPTY),
        (this._Oo = 0),
        (this.COo = !1),
        this.eko(),
        this.NOo(1008164187) ||
          ((this.BeHitTime = UE.GameplayStatics.GetTimeSeconds(this.fte.Actor)),
          (this.EnterFk = !1),
          (e = Rotator_1.Rotator.Create()),
          MathUtils_1.MathUtils.LookRotationUpFirst(
            i,
            Vector_1.Vector.UpVectorProxy,
            e
          ),
          this.fte.SetActorRotation(e.ToUeRotator(), "OnHitByWall", !1),
          this.Tko(t));
    }
    OnReboundSuccess(t, i) {
      t = BulletStaticFunction_1.HitStaticFunction.PlayHitEffect(
        GlobalData_1.GlobalData.World,
        t.ToAssetPathName(),
        i,
        this.Entity,
        "[CharacterHitComponent.OnReboundSuccess]"
      );
      t &&
        EffectSystem_1.EffectSystem.IsValid(t) &&
        ((i = this.Entity.GetComponent(107)) &&
          ((i = i.CurrentTimeScale),
          EffectSystem_1.EffectSystem.SetTimeScale(t, i * this.TimeDilation)),
        this.vOo.push(t));
    }
    static HitEndRequest(t) {
      var i = Protocol_1.Aki.Protocol.HitEndRequest.create();
      CombatMessage_1.CombatNet.Call(
        NetDefine_1.ERequestMessageId.HitEndRequest,
        t,
        i,
        this.Nko
      );
    }
    static PreHitNotify(t, i) {
      return (
        i.HitInfo?.HasBeHitData &&
          !i.HitInfo.EnterFk &&
          (t = t.GetComponent(45)) &&
          !t.PreSwitchRemoteFightState(i.HitInfo.FightState) &&
          ((i.HitInfo.EnterFk = !0), (i.HitInfo.FightState = 0)),
        !0
      );
    }
    static HitNotify(t, i) {
      var e,
        s,
        h,
        r = MathUtils_1.MathUtils.LongToNumber(i.HitInfo.Id),
        o = ModelManager_1.ModelManager.CreatureModel.GetEntity(r);
      o?.Valid
        ? ((e = i.HitInfo.BulletId
            ? MathUtils_1.MathUtils.LongToBigInt(i.HitInfo.BulletId).toString()
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
                i.HitInfo.IsShake ?? !1,
                void 0,
                void 0,
                0,
                s,
                ""
              )),
              i.HitInfo.HitEffectRotate &&
                s.HitEffectRotation.Set(
                  i.HitInfo.HitEffectRotate.Pitch,
                  i.HitInfo.HitEffectRotate.Yaw,
                  i.HitInfo.HitEffectRotate.Roll
                ),
              i.HitInfo.HitPos &&
                s.HitPosition.Set(
                  i.HitInfo.HitPos.X,
                  i.HitInfo.HitPos.Y,
                  i.HitInfo.HitPos.Z
                ),
              i.HitInfo.HitPart &&
                (s.HitPart = FNameUtil_1.FNameUtil.GetDynamicFName(
                  i.HitInfo.HitPart
                )),
              (h = WorldGlobal_1.WorldGlobal.ToUeRotator(
                i.HitInfo.VictimRotation
              )),
              t
                ?.GetComponent(50)
                .ReceiveOnHit(
                  s,
                  o.Entity,
                  i.HitInfo.HasBeHitData ?? !1,
                  i.HitInfo.IsChangeVictimRotation ?? !1,
                  i.HitInfo.EnterFk ?? !1,
                  i.HitInfo.IsHitWeakness ?? !1,
                  i.HitInfo.IsTriggerCounterattack ?? !1,
                  i.HitInfo.IsTriggerVisionCounterAttack ?? !1,
                  h,
                  i.HitInfo.FightState,
                  i.HitInfo.BeHitAnim
                ))
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
    Bko(t, i) {
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
        (i = BulletStaticFunction_1.HitStaticFunction.PlayHitEffect(
          GlobalData_1.GlobalData.World,
          i?.toString(),
          e,
          t.Attacker,
          "[CharacterHitComponent.BeCounterattack]"
        )),
        EffectSystem_1.EffectSystem.IsValid(i)) &&
        ((e = this.Entity.GetComponent(107)) &&
          ((t = e.CurrentTimeScale),
          EffectSystem_1.EffectSystem.SetTimeScale(i, t * this.TimeDilation)),
        this.vOo.push(i));
    }
    bko(t) {
      var i = t.被击者顿帧;
      this.Entity.GetComponent(107)?.SetTimeScale(
        i.优先级,
        i.时间膨胀值,
        i.时间膨胀变化曲线,
        i.时间膨胀时长,
        4
      ),
        (i = t.攻击者顿帧),
        this.eOo
          .GetComponent(107)
          .SetTimeScale(
            i.优先级,
            i.时间膨胀值,
            i.时间膨胀变化曲线,
            i.时间膨胀时长,
            3
          );
    }
    qko(t) {
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
    Gko() {
      var t;
      this.OOo(forbidHitTagIds) ||
        ((t = this.Entity.GetComponent(159)).Valid &&
          t.MontageSetPosition(this.pOo));
    }
    get IsTriggerCounterAttack() {
      return 0 !== this._Oo;
    }
    yko() {
      var t,
        i = this.Entity.GetComponent(16);
      i &&
        (t =
          this.iOo.ReBulletData.TimeScale.TimeScaleEffectImmune *
          CommonDefine_1.MILLIONSECOND_PER_SECOND) >= TimerSystem_1.MIN_TIME &&
        i.AddImmuneTimeScaleEffectTimer(t);
    }
    vko(t) {
      this.Entity === Global_1.Global.BaseCharacter?.GetEntityNoBlueprint() &&
        GamepadController_1.GamepadController.PlayForceFeedbackByHit(t);
    }
    GetAttackerEntity() {
      return this.eOo;
    }
  });
(CharacterHitComponent.qOo = void 0),
  (CharacterHitComponent.$Oo = void 0),
  (CharacterHitComponent.XOo = void 0),
  (CharacterHitComponent.ZOo = void 0),
  (CharacterHitComponent.tko = void 0),
  (CharacterHitComponent.rko = void 0),
  (CharacterHitComponent.nko = void 0),
  (CharacterHitComponent.ako = void 0),
  (CharacterHitComponent.i8r = void 0),
  (CharacterHitComponent.Mko = void 0),
  (CharacterHitComponent.Eko = void 0),
  (CharacterHitComponent.Iko = void 0),
  (CharacterHitComponent.Nko = (t) => {}),
  __decorate(
    [CombatMessage_1.CombatNet.PreHandle("HitNotify")],
    CharacterHitComponent,
    "PreHitNotify",
    null
  ),
  __decorate(
    [CombatMessage_1.CombatNet.SyncHandle("HitNotify")],
    CharacterHitComponent,
    "HitNotify",
    null
  ),
  (CharacterHitComponent = CharacterHitComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(50)],
      CharacterHitComponent
    )),
  (exports.CharacterHitComponent = CharacterHitComponent);
//# sourceMappingURL=CharacterHitComponent.js.map

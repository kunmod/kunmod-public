"use strict";
var SceneItemHitComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, e, i, n) {
      var r,
        o = arguments.length,
        s =
          o < 3
            ? e
            : null === n
            ? (n = Object.getOwnPropertyDescriptor(e, i))
            : n;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        s = Reflect.decorate(t, e, i, n);
      else
        for (var a = t.length - 1; 0 <= a; a--)
          (r = t[a]) &&
            (s = (o < 3 ? r(s) : 3 < o ? r(e, i, s) : r(e, i)) || s);
      return 3 < o && s && Object.defineProperty(e, i, s), s;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemHitComponent = void 0);
const UE = require("ue"),
  EntityComponent_1 = require("../../../Core/Entity/EntityComponent"),
  EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent"),
  Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  LevelGamePlayController_1 = require("../../LevelGamePlay/LevelGamePlayController"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  SceneInteractionManager_1 = require("../../Render/Scene/Interaction/SceneInteractionManager"),
  BulletCollisionUtil_1 = require("../Bullet/BulletStaticMethod/BulletCollisionUtil"),
  BulletUtil_1 = require("../Bullet/BulletUtil"),
  ModManager_1 = require("../../Manager/ModManager"), //add my code
  SceneItemHitUtils_1 = require("./Util/SceneItemHitUtils");
class ComponentHitReg {
  constructor() {
    (this.ComponentHitConditionCheck = []),
      (this.ComponentHitBaseConfig = void 0);
  }
}
let SceneItemHitComponent =
  (SceneItemHitComponent_1 = class SceneItemHitComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.Snn = void 0),
        (this.Hte = void 0),
        (this.Wfn = void 0),
        (this.Kfn = new Array()),
        (this.Qfn = new Map()),
        (this.Xfn = void 0),
        (this.$fn = void 0),
        (this.Yfn = void 0),
        (this.Jfn = Rotator_1.Rotator.Create()),
        (this.efn = 0);
    }
    OnStart() {
      return (
        (this.Snn = this.Entity.GetComponent(177)),
        (this.Wfn = this.Entity.GetComponent(115)),
        (this.Hte = this.Entity.GetComponent(182)),
        (this.efn = this.Entity.GetComponent(0).GetEntityOnlineInteractType()),
        !0
      );
    }
    zfn(t) {
      if (this.Snn.HasTag(-1431780499)) return !1;
      if (this.Wfn?.IsLocked) return !1;
      if (this.Entity.GetComponent(0)?.IsConcealed) return !1;
      let e = !0;
      if (0 < this.Kfn.length)
        for (const i of this.Kfn) if (!(e &&= i(t))) break;
      return e;
    }
    Zfn(t, e) {
      t = this.Qfn.get(t)?.ComponentHitConditionCheck;
      if (void 0 === t) return !0;
      let i = !0;
      if (0 < t.length) for (const n of t) if (!(i &&= n(e))) break;
      return i;
    }
    epn(t, e) {
      t = this.Qfn.get(t)?.ComponentHitBaseConfig?.HitBullet;
      return (
        !t ||
        SceneItemHitUtils_1.SceneItemHitUtils.CheckHitDataMatchBulletType(
          t,
          e,
          this.Entity
        )
      );
    }
    OnSceneItemHitOne(t, e) {
      // copy old
      if (
        (EventSystem_1.EventSystem.EmitWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneItemEntityHitAlways,
          t
        ),
        !LevelGamePlayController_1.LevelGamePlayController.MultiplayerLimitTypeCheck(
          this.efn,
          !1
        ))
      )
        return !1;
      var i = EntitySystem_1.EntitySystem.Get(
        t.BulletEntityId
      )?.GetBulletInfo();
      if (i) {
        if (this.Entity.GetComponent(146)?.ReboundBullet(t, i)) return !1;
        if (0 !== t.CalculateType) return !1;
        if (this.zfn(t)) {
          this.c6r(t), this.tpn(t, e), this.ipn(t), this.Lwr(t);
          for (var [n] of this.Qfn)
            this.epn(n, t) && this.Zfn(n, t) && this.opn(n, t);
          EventSystem_1.EventSystem.EmitWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnSceneItemEntityHit
          ),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnAnySceneItemEntityHit,
              this.Entity
            );
        }
      }
      return !0;
    }
    OnSceneItemHit(t, e) {
      if (ModManager_1.ModManager.Settings.HitMultiplier === true) {
        for (let j = 0; j < ModManager_1.ModManager.Settings.Hitcount; j++) {
          this.OnSceneItemHitOne(t, e);
        }
      } else {
        this.OnSceneItemHitOne(t, e);
      }
    }
    GetPenetrationType() {
      return this.Entity.GetComponent(0).GetBaseInfo().Category
        .BulletPenetrationType;
    }
    c6r(t) {
      var e,
        i = t.ReBulletData.Render.EffectOnHit.get(4);
      i &&
        0 !== i.length &&
        ((e = new UE.Transform(
          t.HitEffectRotation.ToUeRotator(),
          t.HitPosition.ToUeVector(),
          Vector_1.Vector.OneVector
        )),
        BulletCollisionUtil_1.BulletCollisionUtil.PlaySceneItemHitEffect(
          t.Attacker,
          i,
          e,
          t.ReBulletData.Render.AudioOnHit
        ));
    }
    tpn(e, i) {
      var n = this.Entity.GetComponent(177);
      if (n) {
        var r =
          SceneInteractionManager_1.SceneInteractionManager.Get().GetPartCollisionActorsNum(
            this.Hte.GetSceneInteractionLevelHandleId()
          );
        let t = void 0;
        r && 0 < r
          ? 1 === i.ValidProcessIndex &&
            (t =
              SceneInteractionManager_1.SceneInteractionManager.Get().GetPartCollisionActorTag(
                this.Hte.GetSceneInteractionLevelHandleId(),
                i.Actor
              )?.TagId)
          : ((i = (r = EntitySystem_1.EntitySystem.Get(
              e.BulletEntityId
            ).GetBulletInfo()).BulletDataMain.Base.BeHitEffect),
            (e = ConfigManager_1.ConfigManager.BulletConfig.GetBulletHitData(
              r.Attacker,
              i
            )),
            BulletUtil_1.BulletUtil.GetHitRotator(r, this.Hte, this.Jfn),
            (i = BulletUtil_1.BulletUtil.GetOverrideHitAnimByAngle(
              this.Hte,
              e?.被击动作,
              this.Jfn.Yaw
            )),
            (t = this.rpn(i))),
          void 0 !== this.Yfn && (n.RemoveTag(this.Yfn), (this.Yfn = void 0)),
          void 0 !== t && (n.AddTag(t), (this.Yfn = t));
      }
    }
    ipn(t) {
      var e = t.ReBulletData.Base.BeHitEffect,
        e = ConfigManager_1.ConfigManager.BulletConfig.GetBulletHitData(
          t.Attacker,
          e
        );
      e && this.Hte.UpdateHitInfo(t.HitPosition, e.地面受击速度);
    }
    opn(t, e) {
      t?.Valid &&
        (EventSystem_1.EventSystem.EmitWithTarget(
          t,
          EventDefine_1.EEventName.OnSceneItemHit
        ),
        EventSystem_1.EventSystem.EmitWithTarget(
          t,
          EventDefine_1.EEventName.OnSceneItemHitByHitData,
          e
        ));
    }
    Lwr(t) {
      this.npn(t), this.spn(t);
    }
    npn(t) {
      var e,
        i = t.ReBulletData.TimeScale,
        n = i.TimeScaleOnAttack,
        r = this.Xfn?.ValueRatio ?? 1,
        o = this.Xfn?.TimeRatio ?? 1,
        s = this.Xfn?.MaxExtraTime ?? 0;
      i.TimeScaleOnAttackIgnoreAttacker
        ? 0 < n.时间膨胀时长 &&
          ((e = EntitySystem_1.EntitySystem.Get(
            t.BulletEntityId
          ).GetBulletInfo()),
          BulletUtil_1.BulletUtil.SetTimeScale(
            e,
            n.优先级,
            n.时间膨胀值 * r,
            n.时间膨胀变化曲线,
            Math.min(n.时间膨胀时长 * o, n.时间膨胀时长 + s),
            1
          ))
        : 0 < n.时间膨胀时长 &&
          (t.Attacker.GetComponent(107)?.SetTimeScale(
            n.优先级 - 1,
            n.时间膨胀值 * r,
            n.时间膨胀变化曲线,
            Math.min(n.时间膨胀时长 * o, n.时间膨胀时长 + s),
            1
          ),
          (e = i.CharacterCustomKeyTimeScale),
          StringUtils_1.StringUtils.IsEmpty(e) ||
            ((i =
              ModelManager_1.ModelManager.BulletModel.GetEntityIdByCustomKey(
                t.Attacker.Id,
                e,
                t.BulletId.toString()
              )) &&
              EntitySystem_1.EntitySystem.Get(i)
                ?.GetComponent(107)
                ?.SetTimeScale(
                  n.优先级,
                  n.时间膨胀值 * r,
                  n.时间膨胀变化曲线,
                  Math.min(n.时间膨胀时长 * o, n.时间膨胀时长 + s),
                  1
                )));
    }
    spn(t) {
      var e, i, n;
      t.ReBulletData.Base.ContinuesCollision ||
        ((t = t.ReBulletData.TimeScale.TimeScaleOnHit),
        (e = this.$fn?.ValueRatio ?? 1),
        (i = this.$fn?.TimeRatio ?? 1),
        (n = this.$fn?.MaxExtraTime ?? 0),
        0 < t.时间膨胀时长 &&
          this.Entity.GetComponent(107)?.SetTimeScale(
            t.优先级,
            t.时间膨胀值 * e,
            t.时间膨胀变化曲线,
            Math.min(t.时间膨胀时长 * i, t.时间膨胀时长 + n),
            2
          ));
    }
    AddHitCondition(t) {
      this.Kfn.push(t);
    }
    RemoveHitCondition(t) {
      t = this.Kfn.indexOf(t);
      -1 !== t && this.Kfn.splice(t, 1);
    }
    RegisterComponent(t, e) {
      var i;
      this.Qfn.has(t) ||
        (((i = new ComponentHitReg()).ComponentHitBaseConfig = e),
        this.Qfn.set(t, i),
        e?.AttackerHitTimeScaleRatio &&
          (this.Xfn = e.AttackerHitTimeScaleRatio),
        e?.VictimHitTimeScaleRatio && (this.$fn = e.VictimHitTimeScaleRatio));
    }
    AddComponentHitCondition(t, e) {
      var i;
      this.Qfn.has(t) || ((i = new ComponentHitReg()), this.Qfn.set(t, i)),
        this.Qfn.get(t).ComponentHitConditionCheck.push(e);
    }
    RemoveComponentHitCondition(t, e) {
      t = this.Qfn.get(t)?.ComponentHitConditionCheck;
      void 0 !== t && -1 !== (e = t.indexOf(e)) && t.splice(e, 1);
    }
    rpn(t) {
      return SceneItemHitComponent_1.apn.get(t);
    }
  });
(SceneItemHitComponent.apn = new Map([
  [8, 631236362],
  [1, -40693742],
  [9, 1688432695],
  [0, 178446985],
  [10, -1474770640],
  [3, -1876401816],
  [11, -350051159],
  [2, -2061161961],
])),
  (SceneItemHitComponent = SceneItemHitComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(138)],
      SceneItemHitComponent
    )),
  (exports.SceneItemHitComponent = SceneItemHitComponent);
//# sourceMappingURL=SceneItemHitComponent.js.map

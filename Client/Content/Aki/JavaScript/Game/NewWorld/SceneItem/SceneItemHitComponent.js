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
Object.defineProperty(exports, "__esModule", {
  value: !0,
}),
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
  EffectContext_1 = require("../../Effect/EffectContext/EffectContext"),
  EffectSystem_1 = require("../../Effect/EffectSystem"),
  GlobalData_1 = require("../../GlobalData"),
  LevelGamePlayController_1 = require("../../LevelGamePlay/LevelGamePlayController"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  SceneInteractionManager_1 = require("../../Render/Scene/Interaction/SceneInteractionManager"),
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
        (this.$Jo = void 0),
        (this.fte = void 0),
        (this.a_n = void 0),
        (this.h_n = new Array()),
        (this.l_n = new Map()),
        (this.__n = void 0),
        (this.u_n = void 0),
        (this.c_n = void 0),
        (this.m_n = Rotator_1.Rotator.Create()),
        (this.i1n = 0);
    }
    OnStart() {
      return (
        (this.$Jo = this.Entity.GetComponent(176)),
        (this.a_n = this.Entity.GetComponent(114)),
        (this.fte = this.Entity.GetComponent(181)),
        (this.i1n = this.Entity.GetComponent(0).GetEntityOnlineInteractType()),
        !0
      );
    }
    d_n(t) {
      if (this.$Jo.ContainsTagById(-1431780499)) return !1;
      if (this.a_n?.IsLocked) return !1;
      if (this.Entity.GetComponent(0)?.IsConcealed) return !1;
      let e = !0;
      if (0 < this.h_n.length)
        for (const i of this.h_n) if (!(e &&= i(t))) break;
      return e;
    }
    C_n(t, e) {
      t = this.l_n.get(t)?.ComponentHitConditionCheck;
      if (void 0 === t) return !0;
      let i = !0;
      if (0 < t.length) for (const n of t) if (!(i &&= n(e))) break;
      return i;
    }
    g_n(t, e) {
      t = this.l_n.get(t)?.ComponentHitBaseConfig?.HitBullet;
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
      //copy old
      if (
        (EventSystem_1.EventSystem.EmitWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneItemEntityHitAlways,
          t
        ),
        !LevelGamePlayController_1.LevelGamePlayController.MultiplayerLimitTypeCheck(
          this.i1n,
          !1
        ))
      )
        return !1;
      var i = EntitySystem_1.EntitySystem.Get(
        t.BulletEntityId
      )?.GetBulletInfo();
      if (i) {
        if (this.Entity.GetComponent(145)?.ReboundBullet(t, i)) return !1;
        if (0 !== t.CalculateType) return !1;
        if (this.d_n(t)) {
          this.jOo(t), this.f_n(t, e), this.p_n(t), this.fDo(t);
          for (var [n] of this.l_n)
            this.g_n(n, t) && this.C_n(n, t) && this.v_n(n, t);
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
          return ;
      }
      this.OnSceneItemHitOne(t, e);
    }
    GetPenetrationType() {
      return this.Entity.GetComponent(0).GetBaseInfo().Category
        .BulletPenetrationType;
    }
    jOo(t) {
      var e = t.ReBulletData.Render.EffectOnHit.get(4);
      e &&
        0 !== e.length &&
        ((t = new UE.Transform(
          t.HitEffectRotation.ToUeRotator(),
          t.HitPosition.ToUeVector(),
          Vector_1.Vector.OneVector
        )),
        EffectSystem_1.EffectSystem.SpawnEffect(
          GlobalData_1.GlobalData.World,
          t,
          e,
          "[SceneItemHitComponent.ProcessHitEffect]",
          new EffectContext_1.EffectContext(this.Entity.Id)
        ));
    }
    f_n(e, i) {
      var n = this.Entity.GetComponent(176);
      if (n) {
        var r =
          SceneInteractionManager_1.SceneInteractionManager.Get().GetPartCollisionActorsNum(
            this.fte.GetSceneInteractionLevelHandleId()
          );
        let t = void 0;
        r && 0 < r
          ? 1 === i.ValidProcessIndex &&
            (t =
              SceneInteractionManager_1.SceneInteractionManager.Get().GetPartCollisionActorTag(
                this.fte.GetSceneInteractionLevelHandleId(),
                i.Actor
              )?.TagId)
          : ((i = (r = EntitySystem_1.EntitySystem.Get(
              e.BulletEntityId
            ).GetBulletInfo()).BulletDataMain.Base.BeHitEffect),
            (e = ConfigManager_1.ConfigManager.BulletConfig.GetBulletHitData(
              r.Attacker,
              i
            )),
            BulletUtil_1.BulletUtil.GetHitRotator(r, this.fte, this.m_n),
            (i = BulletUtil_1.BulletUtil.GetOverrideHitAnimByAngle(
              this.fte,
              e?.被击动作,
              this.m_n.Yaw
            )),
            (t = this.M_n(i))),
          void 0 !== this.c_n &&
            (n.RemoveTagById(this.c_n), (this.c_n = void 0)),
          void 0 !== t && (n.AddTagById(t), (this.c_n = t));
      }
    }
    p_n(t) {
      var e = t.ReBulletData.Base.BeHitEffect,
        e = ConfigManager_1.ConfigManager.BulletConfig.GetBulletHitData(
          t.Attacker,
          e
        );
      e && this.fte.UpdateHitInfo(t.HitPosition, e.地面受击速度);
    }
    v_n(t, e) {
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
    fDo(t) {
      this.E_n(t), this.S_n(t);
    }
    E_n(t) {
      var e,
        i = t.ReBulletData.TimeScale,
        n = i.TimeScaleOnAttack,
        r = this.__n?.ValueRatio ?? 1,
        o = this.__n?.TimeRatio ?? 1;
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
            n.时间膨胀时长 * o,
            1
          ))
        : 0 < n.时间膨胀时长 &&
          (t.Attacker.GetComponent(107)?.SetTimeScale(
            n.优先级 - 1,
            n.时间膨胀值 * r,
            n.时间膨胀变化曲线,
            n.时间膨胀时长 * o,
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
                  n.时间膨胀时长 * o,
                  1
                )));
    }
    S_n(t) {
      var e, i;
      t.ReBulletData.Base.ContinuesCollision ||
        ((t = t.ReBulletData.TimeScale.TimeScaleOnHit),
        (e = this.u_n?.ValueRatio ?? 1),
        (i = this.u_n?.TimeRatio ?? 1),
        0 < t.时间膨胀时长 &&
          this.Entity.GetComponent(107)?.SetTimeScale(
            t.优先级,
            t.时间膨胀值 * e,
            t.时间膨胀变化曲线,
            t.时间膨胀时长 * i,
            2
          ));
    }
    AddHitCondition(t) {
      this.h_n.push(t);
    }
    RemoveHitCondition(t) {
      t = this.h_n.indexOf(t);
      -1 !== t && this.h_n.splice(t, 1);
    }
    RegisterComponent(t, e) {
      var i;
      this.l_n.has(t) ||
        (((i = new ComponentHitReg()).ComponentHitBaseConfig = e),
        this.l_n.set(t, i),
        e?.AttackerHitTimeScaleRatio &&
          (this.__n = e.AttackerHitTimeScaleRatio),
        e?.VictimHitTimeScaleRatio && (this.u_n = e.VictimHitTimeScaleRatio));
    }
    AddComponentHitCondition(t, e) {
      var i;
      this.l_n.has(t) || ((i = new ComponentHitReg()), this.l_n.set(t, i)),
        this.l_n.get(t).ComponentHitConditionCheck.push(e);
    }
    RemoveComponentHitCondition(t, e) {
      t = this.l_n.get(t)?.ComponentHitConditionCheck;
      void 0 !== t && -1 !== (e = t.indexOf(e)) && t.splice(e, 1);
    }
    M_n(t) {
      return SceneItemHitComponent_1.y_n.get(t);
    }
  });
(SceneItemHitComponent.y_n = new Map([
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
      [(0, RegisterComponent_1.RegisterComponent)(137)],
      SceneItemHitComponent
    )),
  (exports.SceneItemHitComponent = SceneItemHitComponent);
//# sourceMappingURL=SceneItemHitComponent.js.map

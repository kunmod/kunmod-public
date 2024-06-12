"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, l, r) {
    var o,
      i = arguments.length,
      a =
        i < 3
          ? e
          : null === r
          ? (r = Object.getOwnPropertyDescriptor(e, l))
          : r;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      a = Reflect.decorate(t, e, l, r);
    else
      for (var n = t.length - 1; 0 <= n; n--)
        (o = t[n]) && (a = (i < 3 ? o(a) : 3 < i ? o(e, l, a) : o(e, l)) || a);
    return 3 < i && a && Object.defineProperty(e, l, a), a;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletController = void 0);
const Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  Stats_1 = require("../../../Core/Common/Stats"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Entity_1 = require("../../../Core/Entity/Entity"),
  EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  PerformanceDecorators_1 = require("../../../Core/Performance/PerformanceDecorators"),
  Quat_1 = require("../../../Core/Utils/Math/Quat"),
  Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
  Transform_1 = require("../../../Core/Utils/Math/Transform"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  StatDefine_1 = require("../../Common/StatDefine"),
  Global_1 = require("../../Global"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  CombatMessage_1 = require("../../Module/CombatMessage/CombatMessage"),
  BulletActionRunner_1 = require("./Action/BulletActionRunner"),
  BulletConfig_1 = require("./BulletConfig"),
  BulletConstant_1 = require("./BulletConstant"),
  BulletStaticFunction_1 = require("./BulletStaticMethod/BulletStaticFunction"),
  BulletPool_1 = require("./Model/BulletPool"),
  BulletCollisionSystem_1 = require("./System/BulletCollisionSystem"),
  BulletMoveSystem_1 = require("./System/BulletMoveSystem");
class BulletController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return (
      Info_1.Info.IsBuildDevelopmentOrDebug &&
        ((BulletConstant_1.BulletConstant.OpenCreateLog = !0),
        (BulletConstant_1.BulletConstant.OpenActionStat = !0)),
      BulletActionRunner_1.BulletActionRunner.InitStat(),
      this.jVr || (this.jVr = new BulletActionRunner_1.BulletActionRunner()),
      this.jVr.Init(),
      BulletPool_1.BulletPool.Init(),
      (this.WVr.length = 0),
      this.WVr.push(new BulletMoveSystem_1.BulletMoveSystem()),
      this.WVr.push(new BulletCollisionSystem_1.BulletCollisionSystem()),
      this.Dde(),
      !0
    );
  }
  static OnTick(t) {
    if (this.jVr) {
      this.jVr.Pause();
      for (const e of this.WVr) e.OnTick(t);
      this.jVr.Resume(),
        this.jVr.Run(t),
        ConfigManager_1.ConfigManager.BulletConfig.TickPreload();
    }
  }
  static OnAfterTick(t) {
    if (this.WVr && this.jVr) {
      this.jVr.Pause();
      for (const e of this.WVr) e.OnAfterTick(t);
      this.jVr.Resume(),
        this.jVr.Run(t, !0),
        BulletPool_1.BulletPool.CheckAtFrameEnd();
    }
  }
  static OnClear() {
    return (
      this.jVr.Clear(),
      this.Rde(),
      BulletPool_1.BulletPool.Clear(),
      !(this.WVr.length = 0)
    );
  }
  static OnLeaveLevel() {
    return (
      BulletConfig_1.BulletConfig.ClearBulletDataCache(),
      ConfigManager_1.ConfigManager.BulletConfig.ClearPreload(),
      !0
    );
  }
  static GetActionCenter() {
    return this.jVr.GetActionCenter();
  }
  static GetActionRunner() {
    return this.jVr;
  }
  static Dde() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnSkillEnd,
      BulletController.w$e
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RemoveEntity,
        BulletController.fpe
      );
  }
  static Rde() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnSkillEnd,
      BulletController.w$e
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RemoveEntity,
        BulletController.fpe
      );
  }
  static CreateBulletCustomTarget(
    e,
    l,
    r,
    {
      SkillId: o = 0,
      SyncType: i = 0,
      ParentVictimId: a,
      ParentTargetId: n,
      ParentId: s,
      Size: u,
      InitTargetLocation: _,
      Source: c = Protocol_1.Aki.Protocol.EBulletCreateSource.NormalSource,
      IsAutomouse: f = !1,
    } = {},
    B = void 0
  ) {
    if (ModelManager_1.ModelManager.GameModeModel.WorldDone) {
      StatDefine_1.BATTLESTAT_ENABLED,
        e ||
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error("Bullet", 21, "创建子弹时Owner为空", [
              "rowName",
              l,
            ]));
      var d = e instanceof Entity_1.Entity ? e : e.GetEntityNoBlueprint(),
        e = e instanceof Entity_1.Entity ? e.GetComponent(3).Actor : e,
        M = ConfigManager_1.ConfigManager.BulletConfig.GetBulletData(d, l);
      if (1 !== M?.Base.SyncType || f || e.IsAutonomousProxy()) {
        (f = this.QVr(d, M, l, a, n)), (e = this.$Vr(d, M, l));
        let t = -1;
        var g = M.Base.BornPositionStandard,
          n =
            (1 === g
              ? (t = this.XVr(d, l))
              : 5 === g
              ? (t =
                  ModelManager_1.ModelManager.BulletModel.GetEntityIdByCustomKey(
                    d.Id,
                    M.Base.BlackboardKey,
                    l
                  ))
              : 7 === g
              ? (t = a)
              : 8 === g
              ? (t = n)
              : 10 === g &&
                ((a = parseInt(M.Base.BlackboardKey)), (t = this.YVr(d, a, l))),
            this.CreateBullet(
              d,
              l,
              r,
              {
                SkillId: o,
                SyncType: i,
                ParentId: s,
                BulletData: M,
                TargetId: f,
                BaseTransformId: t,
                BaseVelocityId: e,
                Size: u,
                InitTargetLocation: _,
                Source: c,
              },
              B
            ));
        return StatDefine_1.BATTLESTAT_ENABLED, n;
      }
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Bullet",
          18,
          "等待远端创建同步子弹",
          ["bulletRowName", l],
          ["skillId", o]
        ),
        StatDefine_1.BATTLESTAT_ENABLED;
    }
  }
  static QVr(t, e, l, r, o) {
    var i = e.Move.TrackTarget;
    if (4 === i || 3 === i) {
      var a = t.GetComponent(29)?.GetCurrentTarget();
      if (a?.Valid) return a.Id;
    } else {
      if (5 === i)
        return ModelManager_1.ModelManager.BulletModel.GetEntityIdByCustomKey(
          t.Id,
          e.Move.TrackTargetBlackboardKey,
          l
        );
      if (7 === i) {
        if (r) return r;
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Bullet", 21, "父子弹受击者 VictimId为空", [
            "rowName",
            l,
          ]);
      } else if (8 === i) {
        if (o) return o;
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Bullet", 21, "父子弹目标为空", ["rowName", l]);
      } else {
        if (6 === i) return t.Id;
        if (2 === i) return BulletController.XVr(t, l);
        if (1 === i) {
          if (!ModelManager_1.ModelManager.GameModeModel.IsMulti)
            return Global_1.Global.BaseCharacter.GetEntityIdNoBlueprint();
          (a = t.GetComponent(0)),
            (e =
              ModelManager_1.ModelManager.FormationModel.GetCurrentFormationInsByPlayer(
                a.GetPlayerId()
              ).EntityHandle);
          if (e?.Valid) return e.Id;
        } else if (9 === i) {
          r =
            ModelManager_1.ModelManager.FormationModel.GetCurrentEntity.Entity.GetComponent(
              29
            )?.GetCurrentTarget();
          if (r?.Valid) return r.Id;
        }
      }
    }
    return 0;
  }
  static XVr(t, e) {
    var l,
      t = t.GetComponent(33)?.SkillTarget;
    return (
      BulletConstant_1.BulletConstant.OpenCreateLog &&
        ((l = t?.Entity?.GetComponent(1)?.Owner?.GetName()),
        Log_1.Log.CheckDebug()) &&
        Log_1.Log.Debug(
          "Bullet",
          21,
          "获取技能目标",
          ["BulletId", e],
          ["Target", l ?? StringUtils_1.NONE_STRING]
        ),
      t?.Valid ? t.Id : -1
    );
  }
  static $Vr(t, e, l) {
    var r = e.Move.InitVelocityDirStandard;
    if (5 === r) {
      var o = t.GetComponent(29)?.GetCurrentTarget();
      if (o?.Valid) return o.Id;
    } else {
      if (6 === r)
        return ModelManager_1.ModelManager.BulletModel.GetEntityIdByCustomKey(
          t.Id,
          e.Move.TrackTargetBlackboardKey,
          l
        );
      if (11 === r)
        return (o = parseInt(e.Move.InitVelocityDirParam)), this.YVr(t, o, l);
    }
    return -1;
  }
  static CreateBullet(
    t,
    e,
    l,
    {
      SkillId: r = 0,
      SyncType: o = 0,
      ParentId: i,
      BulletData: a,
      TargetId: n = 0,
      BaseTransformId: s,
      BaseVelocityId: u,
      Size: _,
      InitTargetLocation: c,
      Source: f = Protocol_1.Aki.Protocol.EBulletCreateSource.NormalSource,
    } = {},
    B = void 0
  ) {
    var d = 2 === o,
      t = ModelManager_1.ModelManager.BulletModel.CreateBullet(
        t,
        e,
        l,
        c,
        r,
        i,
        d,
        n,
        s,
        u,
        _,
        a,
        o,
        B,
        f
      );
    if (t?.Valid) return t;
  }

  
  static DestroyBullet(t, e, l = 0) {
    StatDefine_1.BATTLESTAT_ENABLED,
      ModelManager_1.ModelManager.BulletModel.DestroyBullet(t, e, l),
      StatDefine_1.BATTLESTAT_ENABLED;
  }
  static DestroyAllBullet(t = !1) {
    ModelManager_1.ModelManager.BulletModel.DestroyAllBullet(t);
  }
  static AddSimpleAction(t, e) {
    e = this.GetActionCenter().CreateBulletActionInfo(e);
    this.jVr.AddAction(t, e);
  }
  static SetTimeDilation(t) {
    for (const e of ModelManager_1.ModelManager.BulletModel.GetAttackerBulletIterator())
      for (const l of e) l.SetTimeDilation(t);
  }
  static CreateBulletNotify(t, e) {
    var l, r, o, i, a;
    ModelManager_1.ModelManager.GameModeModel.WorldDone &&
      t &&
      ((l = e.SkillId),
      (a = String(MathUtils_1.MathUtils.LongToBigInt(e.BulletId))),
      (o = e?.LocationEntityId)
        ? (o = ModelManager_1.ModelManager.CreatureModel.GetEntity(
            MathUtils_1.MathUtils.LongToNumber(o)
          )?.Entity?.GetComponent(3)) &&
          this.Qce.FromUeTransform(o.ActorTransform)
        : void 0 !== e?.Location || void 0 !== e?.Rotation
        ? (this.Qce.Reset(),
          (o = e.Location),
          (i = e.Rotation) &&
            (this.kte.DeepCopy(i),
            this.kte.Quaternion(this.JVr),
            this.Qce.SetRotation(this.JVr)),
          o && this.Qce.SetLocation(o),
          this.Qce.SetScale3D(Vector_1.Vector.OneVectorProxy))
        : (i = t?.CheckGetComponent(3)) &&
          (this.Qce.SetLocation(i.ActorLocationProxy),
          this.kte.DeepCopy(i.ActorRotationProxy),
          this.Qce.SetRotation(i.ActorQuatProxy)),
      (o = ModelManager_1.ModelManager.CreatureModel.GetEntityId(
        MathUtils_1.MathUtils.LongToNumber(e.SpawnEntityId)
      )),
      (i = ModelManager_1.ModelManager.CreatureModel.GetEntityId(
        MathUtils_1.MathUtils.LongToNumber(e.SpawnVelocityEntityId)
      )),
      (r = ModelManager_1.ModelManager.CreatureModel.GetEntityId(
        MathUtils_1.MathUtils.LongToNumber(e.TargetId)
      )),
      (t = BulletController.zVr(
        t,
        a,
        this.Qce.ToUeTransform(),
        l,
        o,
        i,
        r,
        MathUtils_1.MathUtils.LongToBigInt(e.CombatCommon.MessageId)
      ))) &&
      (ModelManager_1.ModelManager.BulletModel.RegisterBullet(e.Handle, t.Id),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Bullet",
          18,
          "创建子弹Notify",
          ["bulletRowName", a],
          ["skillId", l],
          ["handleId", e.Handle?.HandleId],
          ["playerId", e.Handle?.PlayerId],
          ["Location", this.Qce.GetLocation()],
          ["Rotation", this.kte],
          ["TargetId", e.TargetId],
          ["CurrentTargetId", r]
        ),
      t.Data.Render.HandOverParentEffect) &&
      ((o = ModelManager_1.ModelManager.BulletModel.GetIdByBulletHandle(
        e.ParentHandle
      )),
      (i =
        ModelManager_1.ModelManager.BulletModel.GetBulletEntityById(
          o
        )?.GetBulletInfo()),
      (a = t.GetBulletInfo()),
      i &&
        a &&
        BulletStaticFunction_1.BulletStaticFunction.HandOverEffects(i, a),
      Log_1.Log.CheckDebug()) &&
      Log_1.Log.Debug("Bullet", 18, "接手父子弹特效", ["parentBulletId", o]);
  }
  static DestroyBulletNotify(t, e) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "Bullet",
        18,
        "删除子弹Notify",
        ["handleId", e?.Handle?.HandleId],
        ["playerId", e?.Handle?.PlayerId]
      ),
      ModelManager_1.ModelManager.BulletModel.DestroyBulletRemote(
        e.Handle,
        e.IsCreateSubBullet
      );
  }
  static ModifyBulletParamsNotify(t, e) {
    var l = ModelManager_1.ModelManager.BulletModel.GetIdByBulletHandle(
        e?.ModifyBulletParams?.Handle
      ),
      l = EntitySystem_1.EntitySystem.Get(l),
      e = MathUtils_1.MathUtils.LongToNumber(e.ModifyBulletParams.TargetId),
      r = ModelManager_1.ModelManager.CreatureModel.GetEntity(e),
      e =
        (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Bullet",
            21,
            "收到修改子弹目标通知",
            ["新的目标id", r.Id],
            ["CreatureId", e]
          ),
        l.GetBulletInfo());
    e && e.SetTargetById(r.Id);
  }
  static zVr(t, e, l, r = 0, o, i, a, n, s) {
    StatDefine_1.BATTLESTAT_ENABLED;
    t = this.CreateBullet(
      t,
      e,
      l,
      {
        SkillId: r,
        SyncType: 2,
        BaseTransformId: o,
        BaseVelocityId: i,
        TargetId: a,
        InitTargetLocation: s,
      },
      n
    );
    return StatDefine_1.BATTLESTAT_ENABLED, t;
  }
  static YVr(t, e, l) {
    if (isNaN(e))
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("Bullet", 21, "pos NAN！", ["bulletRowName", l]);
    else {
      t = t.GetComponent(0).CustomServerEntityIds;
      if (e > t.length || 0 === e)
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Bullet",
            21,
            "pos不合法！",
            ["bulletRowName", l],
            ["pos", e],
            ["serverEntityIds", t]
          );
      else {
        var r = ModelManager_1.ModelManager.CreatureModel.GetEntity(t[e - 1]);
        if (r) return r.Id;
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Bullet",
            21,
            "无法找到伴生物实体",
            ["bulletRowName", l],
            ["pos", e],
            ["serverEntityIds", t]
          );
      }
    }
    return -1;
  }
  static GetBulletCreateStat(t) {
    let e = this.ZVr.get(t);
    return e || ((e = void 0), this.ZVr.set(t, e)), e;
  }
  static GetBulletDestroyStat(t) {
    let e = this.e6r.get(t);
    return e || ((e = void 0), this.e6r.set(t, e)), e;
  }
  static GetBulletMoveTickStat(t) {
    let e = this.t6r.get(t);
    return e || ((e = void 0), this.t6r.set(t, e)), e;
  }
  static GetBulletCollisionTickStat(t) {
    let e = this.i6r.get(t);
    return e || ((e = void 0), this.i6r.set(t, e)), e;
  }
  static GetBulletCollisionAfterTickStat(t) {
    let e = this.r6r.get(t);
    return e || ((e = void 0), this.r6r.set(t, e)), e;
  }
}
(BulletController.WVr = []),
  (BulletController.jVr = void 0),
  (BulletController.ZVr = new Map()),
  (BulletController.e6r = new Map()),
  (BulletController.t6r = new Map()),
  (BulletController.i6r = new Map()),
  (BulletController.r6r = new Map()),
  (BulletController.w$e = (t, e) => {
    if (e) {
      t = ModelManager_1.ModelManager.BulletModel.GetBulletSetByAttacker(t);
      if (t)
        for (const o of t) {
          var l,
            r = o.GetBulletInfo();
          e === r.BulletInitParams.SkillId &&
            ((l = r.BulletDataMain).Move.IsDetachOnSkillEnd &&
              r.Actor.K2_DetachFromActor(1, 1, 1),
            l.Base.DestroyOnSkillEnd) &&
            ((r.IsDestroyByCharSkillEnd = !0),
            BulletController.DestroyBullet(o.Id, !1));
        }
    }
  }),
  (BulletController.fpe = (t, e) => {
    e && BulletConfig_1.BulletConfig.RemoveCacheBulletDataByEntityId(e.Id);
  }),
  (BulletController.KVr = void 0),
  (BulletController.Qce = Transform_1.Transform.Create()),
  (BulletController.kte = Rotator_1.Rotator.Create()),
  (BulletController.JVr = Quat_1.Quat.Create()),
  __decorate(
    [(0, PerformanceDecorators_1.TickPerformanceEx)("Bullet", !1, 0)],
    BulletController,
    "CreateBullet",
    null
  ),
  __decorate(
    [CombatMessage_1.CombatNet.SyncHandle("CreateBulletNotify")],
    BulletController,
    "CreateBulletNotify",
    null
  ),
  __decorate(
    [CombatMessage_1.CombatNet.SyncHandle("DestroyBulletNotify")],
    BulletController,
    "DestroyBulletNotify",
    null
  ),
  __decorate(
    [CombatMessage_1.CombatNet.SyncHandle("ModifyBulletParamsNotify")],
    BulletController,
    "ModifyBulletParamsNotify",
    null
  ),
  (exports.BulletController = BulletController);
//# sourceMappingURL=BulletController.js.map

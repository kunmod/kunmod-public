"use strict";
var PawnAdsorbComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, e, i, s) {
      var o,
        n = arguments.length,
        h =
          n < 3
            ? e
            : null === s
              ? (s = Object.getOwnPropertyDescriptor(e, i))
              : s;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        h = Reflect.decorate(t, e, i, s);
      else
        for (var r = t.length - 1; 0 <= r; r--)
          (o = t[r]) &&
            (h = (n < 3 ? o(h) : 3 < n ? o(e, i, h) : o(e, i)) || h);
      return 3 < n && h && Object.defineProperty(e, i, h), h;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PawnAdsorbComponent = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  Time_1 = require("../../../../Core/Common/Time"),
  NetDefine_1 = require("../../../../Core/Define/Net/NetDefine"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../../Core/Entity/EntityComponent"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent"),
  RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  Global_1 = require("../../../Global"),
  LevelGamePlayController_1 = require("../../../LevelGamePlay/LevelGamePlayController"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  CombatMessage_1 = require("../../../Module/CombatMessage/CombatMessage"),
  ModManager_1 = require("../../../Manager/ModManager"),//add
  //SENSORY_RANGE = (ModManager_1.ModManager.Settings.PerceptionRange)?9e6:1500 ,//1500
  SENSORY_RANGE = 1500,
  MAX_SPEED = 4500,//1500
  NORMALIZE = 0.01,
  CONDITION_CHECK_TIME = 2e3;
let PawnAdsorbComponent =
  (PawnAdsorbComponent_1 = class PawnAdsorbComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.fte = void 0),
        (this.SZo = void 0),
        (this.yZo = void 0),
        (this.IZo = -0),
        (this.TZo = -0),
        (this.LZo = -0),
        (this.DZo = void 0),
        (this.mmt = void 0),
        (this.RZo = !1),
        (this.UZo = !1),
        (this.AZo = !1),
        (this.xZo = void 0),
        (this.C8r = void 0),
        (this.PZo = void 0),
        (this.wZo = -0),
        (this.BZo = -0),
        (this.bZo = !1),
        (this.qZo = -0),
        (this.Fjo = void 0),
        (this.IsInSensoryRange = !0),
        (this.X9t = !1),
        (this.$oe = 0),
        (this.GZo = void 0),
        (this.NZo = 0),
        (this.OZo = !1),
        (this.kZo = !1),
        (this.FZo = () => {
          this.IsInSensoryRange = !0;
        }),
        (this.iWo = () => {
          this.IsInSensoryRange = !0;
        }),
        (this.Dye = (t, e) => {
          !this.RZo &&
            this.yZo &&
            (t.includes(-662723379)
              ? ((this.X9t = !0), this.xk())
              : e.includes(-662723379) && ((this.X9t = !1), this.xk()));
        });
    }
    OnInitData(t) {
      t = t.GetParam(PawnAdsorbComponent_1)[0];
      return (
        (this.IZo = t.Range),
        (this.TZo = t.StartVelocity),
        (this.LZo = t.Acceleration),
        (this.Fjo = this.Entity.GetComponent(106)),
        this.Fjo.SetLogicRange(SENSORY_RANGE),
        this.moe(),
        !0
      );
    }
    OnStart() {
      if (((this.fte = this.Entity.GetComponent(1)), !this.fte))
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Interaction",
              30,
              "[PawnAdsorbComponent.OnStart] 吸收组件初始化失败 Actor Component Undefined",
            ),
          !1
        );
      if (((this.SZo = this.Entity.GetComponent(103)), !this.SZo))
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Interaction",
              30,
              "[PawnAdsorbComponent.OnStart] 吸收组件初始化失败 Pawn Interact Component Undefined",
            ),
          !1
        );
      var t = this.fte.CreatureData,
        e = t.GetPbEntityInitData();
      if (!e)
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Interaction",
              30,
              "[PawnAdsorbComponent.OnStart] 吸收组件初始化失败 Config Invalid",
              ["CreatureGenID:", t.GetOwnerId()],
              ["PbDataId:", t.GetPbDataId()],
            ),
          !1
        );
      this.$oe = t.GetPbDataId();
      t = t.GetBaseInfo();
      if (
        ((this.GZo = t.OnlineInteractType ?? 0),
        (this.yZo = this.Entity.GetComponent(176)),
        !this.yZo)
      )
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Interaction",
              30,
              "[PawnAdsorbComponent.OnStart] 吸收组件初始化失败 LevelTagComponent Undefined",
              ["EntityConfigID:", this.$oe],
            ),
          !1
        );
      this.yZo.ContainsTagById(-662723379) && (this.X9t = !0);
      t = ((this.qZo = 0), IComponent_1.getComponent)(
        e.ComponentsData,
        "InteractComponent",
      );
      return (
        t && (this.qZo = t.Range * t.Range),
        (this.mmt = Vector_1.Vector.Create()),
        (this.xZo = Vector_1.Vector.Create()),
        (this.C8r = Vector_1.Vector.Create()),
        (this.PZo = Vector_1.Vector.Create()),
        (this.wZo = 0),
        !(this.BZo = 0)
      );
    }
    OnTick(t) {
      this.X9t ||
        this.AZo ||
        (this.VZo() &&
          this.HZo() &&
          (this.RZo || this.jZo(), this.WZo(t), true) &&
          (this.KZo(), this.QZo(), this.$Zo(), this.SZo.ForceUpdate()));
    }
    $Zo() {
      var t = Protocol_1.Aki.Protocol.MoveSceneItemPush.create(),
        e =
          ((t.MoveInfos = new Array()),
          Protocol_1.Aki.Protocol.MoveSampleSceneItem.create()),
        i =
          ((e.Location = Protocol_1.Aki.Protocol.Vector.create()),
          (e.Rotation = Protocol_1.Aki.Protocol.Rotator.create()),
          this.fte.ActorLocationProxy),
        s = this.fte.ActorRotationProxy;
      (e.Location.X = i.X),
        (e.Location.Y = i.Y),
        (e.Location.Z = i.Z),
        (e.Rotation.Pitch = s.Pitch),
        (e.Rotation.Roll = s.Roll),
        (e.Rotation.Yaw = s.Yaw),
        (e.TimeStamp = Time_1.Time.NowSeconds),
        t.MoveInfos.push(e),
        CombatMessage_1.CombatNet.Send(
          NetDefine_1.EPushMessageId.MoveSceneItemPush,
          this.Entity,
          t,
        );
    }
    OnEnd() {
      return this.doe(), !0;
    }
    VZo() {
      var t, e;
      return (
        !(!this.RZo && !this.OZo) ||
        (!(
          !this.fte ||
          !Global_1.Global.BaseCharacter ||
          !(t = Global_1.Global.BaseCharacter.CharacterActorComponent)
        ) &&
          ((e = this.fte.ActorLocationProxy),
          (t = t.ActorLocationProxy),
          (e = Vector_1.Vector.DistSquared(e, t)),
          (this.bZo = e <= this.IZo * this.IZo),
          this.bZo))
      );
    }
    XZo() {
      return (
        ModelManager_1.ModelManager.PlayerInfoModel.GetId() ===
        ModelManager_1.ModelManager.CreatureModel.GetWorldOwner()
      );
    }
    HZo() {
      if (!ModelManager_1.ModelManager.GameModeModel.IsMulti) return !0;
      switch (this.GZo) {
        case 2:
          return !1;
        case 0:
          return this.XZo();
        case 1:
          return this.YZo(), this.kZo;
        default:
          return (
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Interaction",
                30,
                "[PawnAdsorbComponent] 不支持的联机模式配置",
              ),
            !1
          );
      }
    }
    YZo() {
      var t = TimeUtil_1.TimeUtil.GetServerTimeStamp();
      (this.OZo = !0),
        LevelGamePlayController_1.LevelGamePlayController.EntityAdsorbRequest(
          this.$oe,
          (t) => {
            t &&
              (t.ErrorCode === Protocol_1.Aki.Protocol.ErrorCode.Success &&
                (this.kZo = !0),
              (this.OZo = !1));
          },
        ),
        (this.NZo = t);
    }
    jZo() {
      if (!this.RZo && !this.AZo) {
        if (!Global_1.Global.BaseCharacter) return !1;
        if (
          ((this.DZo = Global_1.Global.BaseCharacter.CharacterActorComponent),
          !this.fte.Owner.IsValid() || !this.DZo.Owner.IsValid())
        )
          return !1;
        var t = this.fte.ActorLocationProxy;
        this.DZo.ActorLocationProxy.Subtraction(t, this.mmt),
          this.mmt.Normalize(NORMALIZE),
          (this.PZo = this.mmt.MultiplyEqual(this.TZo)),
          (this.wZo = this.TZo),
          (this.BZo = 0),
          (this.RZo = !0);
      }
      return !0;
    }
    WZo(t) {
      var e;
      this.RZo &&
        !this.AZo &&
        Global_1.Global.BaseCharacter &&
        ((this.DZo = Global_1.Global.BaseCharacter.CharacterActorComponent),
        this.fte.Owner.IsValid()) &&
        this.DZo.Owner.IsValid() &&
        ((e = this.fte.ActorLocationProxy),
        this.DZo.ActorLocationProxy.Subtraction(e, this.mmt),
        this.mmt.Normalize(NORMALIZE),
        (e = t * MathUtils_1.MathUtils.MillisecondToSecond),
        (this.BZo = this.LZo * e),
        (this.wZo += this.BZo),
        this.PZo.DeepCopy(this.mmt),
        this.wZo > MAX_SPEED
          ? ((this.wZo = MAX_SPEED), this.PZo.MultiplyEqual(MAX_SPEED))
          : this.PZo.MultiplyEqual(this.wZo),
        this.PZo.Multiply(e, this.xZo),
        (t = this.Entity.GetComponent(36))
          ? t.MoveCharacter(this.xZo, e, "Pawn吸附更新")
          : this.fte.AddActorWorldOffset(
              this.xZo.ToUeVector(),
              "Pawn吸附更新",
              !0,
            ));
    }
    QZo() {
      this.UZo || (this.yZo?.AddTagById(1286772724), (this.UZo = !0));
    }
    KZo() {
      Global_1.Global.BaseCharacter &&
        ((this.DZo = Global_1.Global.BaseCharacter.CharacterActorComponent),
        this.fte.Owner.IsValid()) &&
        this.DZo.Owner.IsValid() &&
        (this.fte.Owner.K2_AttachToActor(this.DZo.Owner, void 0, 2, 1, 1, !1),
        this.mmt.DeepCopy(Vector_1.Vector.ZeroVectorProxy),
        this.PZo.DeepCopy(Vector_1.Vector.ZeroVectorProxy),
        (this.wZo = 0),
        (this.BZo = 0),
        (this.AZo = !0));
    }
    moe() {
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.EnterLogicRange,
        this.FZo,
      ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.LeaveLogicRange,
          this.iWo,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnLevelTagChanged,
          this.Dye,
        );
    }
    doe() {
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Entity,
        EventDefine_1.EEventName.EnterLogicRange,
        this.FZo,
      ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.LeaveLogicRange,
          this.iWo,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnLevelTagChanged,
          this.Dye,
        );
    }
    xk() {
      this.mmt.DeepCopy(Vector_1.Vector.ZeroVectorProxy),
        this.xZo.DeepCopy(Vector_1.Vector.ZeroVectorProxy),
        this.C8r.DeepCopy(Vector_1.Vector.ZeroVectorProxy),
        this.PZo.DeepCopy(Vector_1.Vector.ZeroVectorProxy),
        (this.wZo = 0),
        (this.BZo = 0);
    }
  });
(PawnAdsorbComponent = PawnAdsorbComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(100)],
    PawnAdsorbComponent,
  )),
  (exports.PawnAdsorbComponent = PawnAdsorbComponent);
//# sourceMappingURL=PawnAdsorbComponent.js.map

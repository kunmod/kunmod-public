"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, i, s) {
    var n,
      h = arguments.length,
      r =
        h < 3
          ? e
          : null === s
            ? (s = Object.getOwnPropertyDescriptor(e, i))
            : s;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      r = Reflect.decorate(t, e, i, s);
    else
      for (var o = t.length - 1; 0 <= o; o--)
        (n = t[o]) && (r = (h < 3 ? n(r) : 3 < h ? n(e, i, r) : n(e, i)) || r);
    return 3 < h && r && Object.defineProperty(e, i, r), r;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PawnPerceptionComponent = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  MonitorActionById_1 = require("../../../../Core/Define/ConfigQuery/MonitorActionById"),
  EntityComponent_1 = require("../../../../Core/Entity/EntityComponent"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  Global_1 = require("../../../Global"),
  LevelGeneralNetworks_1 = require("../../../LevelGamePlay/LevelGeneralNetworks"),
  RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
  ModManager_1 = require("../../../Manager/ModManager"),//add
  INVALID_RANGE = -1,
  DISTANCE_FACTOR = 100,
  DISTANCE_OFFSET = 300,
  INTERACT_LOGIC_OFFSET = 300;
let PawnPerceptionComponent = class PawnPerceptionComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.oen = void 0),
      (this._tn = INVALID_RANGE),
      (this.utn = INVALID_RANGE),
      (this.ctn = !1),
      (this.mtn = INVALID_RANGE),
      (this.dtn = !1),
      (this.Ctn = INVALID_RANGE),
      (this.gtn = INVALID_RANGE),
      (this.ftn = !1),
      (this.ptn = !1),
      (this.vtn = -0),
      (this.Mtn = void 0),
      (this.Etn = void 0),
      (this.NearbyEnable = !1),
      (this.Stn = !1),
      (this.ytn = void 0),
      (this.Fjo = void 0),
      (this.Itn = !1),
      (this.ConfigId = -0),
      (this.Ttn = INVALID_RANGE),
      (this.Ltn = !1),
      (this.Dye = () => {
        this.vtn &&
          this.Mtn &&
          this.Etn &&
          this.NearbyEnable &&
          this.Stn &&
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.UpdateNearbyTrackTag,
            this.Entity,
          );
      }),
      (this.iWo = () => {
        this.Stn &&
          ((this.Stn = !1),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnLeaveNearbyTrackRange,
            this.Entity,
          )),
          this.Dtn();
      }),
      (this.Rtn = (t) => {
        (this.NearbyEnable = t), (this.Stn = !1);
      });
  }
  get IsInInteractRange() { 
    return ModManager_1.ModManager.Settings.PerceptionRange?true:(this.ctn);//add
  }
  get IsInAdsorbRange() {
    return ModManager_1.ModManager.Settings.PerceptionRange?true:(this.dtn);

  }
  get IsInSightRange() {
    return ModManager_1.ModManager.Settings.PerceptionRange?true:(this.ftn);
  }
  get InteractRangeSquared() {
    return this._tn;
  }
  get LastDistanceToPlayer() {
    return this.vtn;
  }
  get IsRefreshDistance() {
    return this.Itn;
  }
  SetInteractRange(t, e = 0) {
    if(ModManager_1.ModManager.Settings.PerceptionRange){
      t *= 40;
      //e *= 10;
    }
    (this._tn = t * t),
      (this.utn = 0 === e ? this._tn : e * e),
      this.Fjo.SetLogicRange(Math.max(t + INTERACT_LOGIC_OFFSET, e));
  }
  SetAdsorbRange(t) {
    if(ModManager_1.ModManager.Settings.PerceptionRange){
      t *= 100;
      //e *= 10;
    }
    (this.mtn = t * t), this.Fjo.SetLogicRange(t);
  }
  SetSightRange(t) {
    if(ModManager_1.ModManager.Settings.PerceptionRange){
      t *= 100;
      //e *= 10;
    }
    (this.gtn = t * t), this.Fjo.SetLogicRange(t);
  }
  SetGuideRange(t) {
    if(ModManager_1.ModManager.Settings.PerceptionRange){
      t *= 100;
      //e *= 10;
    }
    (this.Ttn = t * t), this.Fjo.SetLogicRange(t);
  }
  DisableGuideRange() {
    this.Ttn = INVALID_RANGE;
  }
  OnInitData() {
    return (
      (this.ytn = UE.NewMap(UE.BuiltinInt, UE.BuiltinInt)),
      (this.ConfigId = this.Entity.GetComponent(0).GetPbDataId()),
      !0
    );
  }
  OnInit() {
    return (this.Fjo = this.Entity.GetComponent(106)), !0;
  }
  OnStart() {
    var t = this.Entity.GetComponent(0),
      e = ((this.oen = this.Entity.GetComponent(1)), this.oen.Owner);
    return UE.KismetSystemLibrary.IsValid(e)
      ? (this.RegisterEventListener(
          t.GetListeningRange(),
          t.GetListeningEventConfigs(),
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnGameplayTagChanged,
          this.Dye,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.LeaveLogicRange,
          this.iWo,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnUpdateNearbyEnable,
          this.Rtn,
        ),
        !0)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Pawn",
            7,
            "[PawnPerceptionComponent.OnStart] 非法Actor",
            ["PbDataId", t.GetPbDataId()],
          ),
        !1);
  }
  OnEnable() {
    this.Itn = !1;
  }
  OnActivate() {
    var t,
      e,
      i = this.Entity.GetComponent(143);
    return (
      i &&
        ((t = i.ShowRange),
        (e = i.HideRange),
        (this.Mtn = t * t),
        (this.Etn = e * e),
        (this.NearbyEnable = i.EnableTracking),
        (this.Stn = !1),
        this.Fjo.SetLogicRange(t),
        this.Fjo.SetLogicRange(e + DISTANCE_OFFSET),
        this.ForcePerceptionCheck()),
      !0
    );
  }
  OnEnd() {
    return (
      this.Stn &&
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.RemoveNearbyTrack,
          this.Entity,
        ),
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Entity,
        EventDefine_1.EEventName.OnGameplayTagChanged,
        this.Dye,
      ),
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Entity,
        EventDefine_1.EEventName.LeaveLogicRange,
        this.iWo,
      ),
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Entity,
        EventDefine_1.EEventName.OnUpdateNearbyEnable,
        this.Rtn,
      ),
      this.ytn.Empty(),
      !0
    );
  }
  RegisterEventListener(t, e) {
    if (t && e?.length) {
      this.ytn.Empty();
      for (const s of e) {
        var i = MonitorActionById_1.configMonitorActionById.GetConfig(s);
        i
          ? this.ytn.Add(s, i.ConditionGroupId)
          : Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn("Pawn", 7, "感知监听事件注册失败,", [
              "ListenEventConfigId",
              s,
            ]);
      }
      0 !== this.ytn.Num() &&
        ((this.ptn = !0), (this.Ctn = t * t * DISTANCE_FACTOR));
    }
  }
  Utn(t) {
    !this.ptn ||
      this.Ctn < t ||
      ((this.ptn = !1),
      LevelGeneralNetworks_1.LevelGeneralNetworks.PushConditionalEventListen(
        this.ytn,
      ));
  }
  Atn(t) {
    this.ctn ? (this.ctn = this.utn > t) : (this.ctn = this._tn > t);
  }
  xtn(t) {
    this.dtn = this.mtn > t;
  }
  Ptn(t) {
    this.ftn = this.gtn > t;
  }
  wtn(t) {
    this.Mtn &&
      this.Etn &&
      this.NearbyEnable &&
      (!this.Stn &&
        t <= this.Mtn &&
        ((this.Stn = !0),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnEnterNearbyTrackRange,
          this.Entity,
        )),
      this.Stn) &&
      t > this.Etn &&
      ((this.Stn = !1),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnLeaveNearbyTrackRange,
        this.Entity,
      ));
  }
  btn(t) {
    !this.Ltn &&
      t <= this.Ttn &&
      ((this.Ltn = !0),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnGuideRangeEnter,
        this.Entity.Id,
      ));
  }
  qtn() {
    this.Itn = !0;
    var t = this._tr();
    this.Ctn !== INVALID_RANGE && this.Utn(t),
      this._tn !== INVALID_RANGE && this.Atn(t),
      this.mtn !== INVALID_RANGE && this.xtn(t),
      this.gtn !== INVALID_RANGE && this.Ptn(t),
      (this.vtn || t) && this.wtn(t),
      this.Ttn !== INVALID_RANGE && this.btn(t),
      (this.vtn = t);
  }
  ForcePerceptionCheck() {
    this.qtn();
  }
  OnTick(t) {
    this.Fjo && this.Fjo.IsInLogicRange && this.qtn();
  }
  Dtn() {
    (this.ctn = !1), (this.dtn = !1), (this.ftn = !1), (this.Ltn = !1);
  }
  _tr() {
    if (this.oen && Global_1.Global.BaseCharacter) {
      var e = Global_1.Global.BaseCharacter.CharacterActorComponent;
      if (e) {
        let t = void 0;
        var i = this.oen.Entity.GetComponent(177)?.GetInteractPoint(),
          i = ((t = i || this.oen.ActorLocationProxy), e.ActorLocationProxy);
        return Vector_1.Vector.DistSquared(t, i);
      }
    }
  }
};
(PawnPerceptionComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(104)],
  PawnPerceptionComponent,
)),
  (exports.PawnPerceptionComponent = PawnPerceptionComponent);
//# sourceMappingURL=PawnPerceptionComponent.js.map

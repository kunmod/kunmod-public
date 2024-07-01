"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, i, e, s) {
    var n,
      h = arguments.length,
      r =
        h < 3
          ? i
          : null === s
          ? (s = Object.getOwnPropertyDescriptor(i, e))
          : s;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      r = Reflect.decorate(t, i, e, s);
    else
      for (var o = t.length - 1; 0 <= o; o--)
        (n = t[o]) && (r = (h < 3 ? n(r) : 3 < h ? n(i, e, r) : n(i, e)) || r);
    return 3 < h && r && Object.defineProperty(i, e, r), r;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PawnInteractNewComponent = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  CommonDefine_1 = require("../../../../Core/Define/CommonDefine"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  CameraController_1 = require("../../../Camera/CameraController"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  Global_1 = require("../../../Global"),
  LevelGamePlayController_1 = require("../../../LevelGamePlay/LevelGamePlayController"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  TsInteractionUtils_1 = require("../../../Module/Interaction/TsInteractionUtils"),
  PlotController_1 = require("../../../Module/Plot/PlotController"),
  InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController"),
  UiManager_1 = require("../../../Ui/UiManager"),
  PawnChairController_1 = require("../Controllers/PawnChairController"),
  PawnInteractController_1 = require("../Controllers/PawnInteractController"),
  PawnInteractBaseComponent_1 = require("./PawnInteractBaseComponent"),
  MAX_WAIT_NPC_TURN_TIME = 2500,
  MAX_WAIT_PLAYER_STAND_TIME = 1e3;
let PawnInteractNewComponent = class PawnInteractNewComponent extends PawnInteractBaseComponent_1.PawnInteractBaseComponent {
  constructor() {
    super(...arguments),
      (this.xan = !0),
      (this.wan = !1),
      (this.Ban = "Npc"),
      (this.ban = void 0),
      (this.qan = void 0),
      (this.Gan = void 0),
      (this.Nan = void 0),
      (this.SJi = void 0),
      (this.Oan = void 0),
      (this.fie = void 0),
      (this.man = void 0),
      (this.kan = !1),
      (this.Fan = !1),
      (this.Van = !1),
      (this.Han = !1),
      (this.Mtr = Vector_1.Vector.Create()),
      (this.eNi = !1),
      (this._5r = void 0),
      (this.jan = void 0),
      (this.Izr = void 0),
      (this.Wan = void 0),
      (this.Kan = !1),
      (this.Qan = void 0),
      (this.CanRestartAi = !0),
      (this.xie = (t, i) => {
        this.Xan();
      }),
      (this.k$e = () => {
        this.SJi?.OnChangeModeFinish();
      }),
      (this.fan = () => {
        this.$an(),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Interaction", 37, "进入感知范围，开启交互Tick", [
              "EntityId",
              this.Entity.Id,
            ]),
          (this.eNi = !0);
      }),
      (this.Ozr = () => {
        ModelManager_1.ModelManager.InteractionModel.LockInteractionEntity ===
        this.Entity.Id
          ? Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Interaction",
              37,
              "离开交互锁定实体的感知范围时不关闭Tick"
            )
          : (this.CloseInteract("离开感知范围"),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("Interaction", 37, "离开感知范围，关闭交互Tick", [
                "EntityId",
                this.Entity.Id,
              ]),
            (this.eNi = !1));
      }),
      (this.Yan = !1),
      (this.Jan = () => {
        this.SJi && this.SJi.HasInteractOptions()
          ? this.$an()
          : (this.zan("没有可交互内容"), (this.Yan = !0));
      }),
      (this.Zan = void 0),
      (this.ehn = !1),
      (this.thn = !1),
      (this.ihn = !1),
      (this.ohn = !1),
      (this.rhn = void 0),
      (this.nhn = () => {
        this.ihn && ((this.ihn = !1), (this.thn = !0), this.shn(), this.ahn());
      }),
      (this.ahn = () => {
        var t = this._5r.Entity,
          i = MathUtils_1.MathUtils.CommonTempRotator,
          e = MathUtils_1.MathUtils.CommonTempVector;
        this.ban.ActorLocationProxy.Subtraction(this._5r.ActorLocationProxy, e),
          e.Normalize(),
          (i.Roll = 0),
          (i.Pitch = 0),
          (i.Yaw = MathUtils_1.MathUtils.GetAngleByVector2D(e)),
          this._5r.SetInputRotator(i);
        t.GetComponent(52).SetActive(!1);
        (e = MathUtils_1.MathUtils.CommonTempVector),
          this.ban.ActorLocationProxy.Subtraction(
            this._5r.ActorLocationProxy,
            e
          ),
          (i = e.HeadingAngle() * MathCommon_1.MathCommon.RadToDeg),
          (t =
            ((180 < (i = Math.abs(this._5r.ActorRotationProxy.Yaw - i))
              ? 360 - i
              : i) /
              300) *
            CommonDefine_1.MILLIONSECOND_PER_SECOND);
        (this.thn = !0),
          t > TimerSystem_1.MIN_TIME
            ? TimerSystem_1.TimerSystem.Delay(this.hhn, t)
            : this.hhn();
      }),
      (this.shn = () => {
        if (this.fie === Protocol_1.Aki.Protocol.HBs.Proto_Npc) {
          this.ohn = !0;
          var t,
            i = this.SJi.IsTurnAround;
          i
            ? ((t = this.Entity.GetComponent(168)),
              this.SJi.IsWaitTurnComplete || this.lhn
                ? t.OnPlayerInteractStart(i, !0, this._hn)
                  ? (this.rhn = TimerSystem_1.TimerSystem.Delay(
                      this._hn,
                      MAX_WAIT_NPC_TURN_TIME
                    ))
                  : this._hn()
                : (t.OnPlayerInteractStart(i, !1, void 0), this._hn()))
            : this._hn();
        }
      }),
      (this.lhn = !1),
      (this.uhn = !1),
      (this.chn = () => {
        this.uhn &&
          ((this.uhn = !1),
          ModelManager_1.ModelManager.PlotModel.IsInInteraction) &&
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.TriggerPlotInteraction,
            this.GetInteractController()
          );
      }),
      (this._hn = () => {
        this.ohn && ((this.ohn = !1), this.thn || this.mhn());
      }),
      (this.hhn = () => {
        let t = this._5r?.Entity;
        var i;
        (t =
          t ||
          Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity) &&
          (t.GetComponent(52)?.SetActive(!0), (i = t.GetComponent(161))) &&
          ((i.ForceExitStateStop = !1), (i.CanMoveFromInput = !0)),
          (this.thn = !1),
          this.ohn || this.mhn();
      }),
      (this.dhn = () => {
        this.lhn && (this.thn || this.ohn)
          ? ((this.lhn = !1),
            ControllerHolder_1.ControllerHolder.PlotController.ProtectPlotView(),
            ControllerHolder_1.ControllerHolder.PlotController.OpenPlotView(
              "PlotView"
            ),
            CameraController_1.CameraController.EnterDialogueMode(
              this.GetInteractController().GetInteractPoint(),
              !1
            ))
          : (this.lhn = !1);
      }),
      (this.Chn = (i) => {
        if (this.ehn)
          if (
            (this.SJi.RecordInteraction(),
            ModelManager_1.ModelManager.InteractionModel.HandleInteractionHint(
              !1,
              this.Entity.Id
            ),
            (ModelManager_1.ModelManager.InteractionModel.InteractingEntity =
              this.Entity.Id),
            this.Qan)
          )
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("Interaction", 37, "[执行交互]自动触发交互", [
                "EntityId",
                this.Entity.Id,
              ]),
              TsInteractionUtils_1.TsInteractionUtils.HandleInteractionOptionNew(
                this.Qan,
                this.SJi
              );
          else {
            let t = void 0;
            t =
              -1 < i
                ? this.SJi.GetOptionByInstanceId(i)
                : this.SJi.GetInteractiveOption();
            i = this.SJi.Options;
            ((t && this.ghn(t)) ||
              (1 === i.length && this.ghn(i[0])) ||
              1 !== i.length) &&
              ModelManager_1.ModelManager.PlotModel.IsInPlot &&
              !ModelManager_1.ModelManager.PlotModel?.IsInHighLevelPlot() &&
              (ControllerHolder_1.ControllerHolder.FlowController.BackgroundFlow(
                "交互前打断当前D级剧情",
                !1
              ),
              ControllerHolder_1.ControllerHolder.PlotController.CloseAllUi()),
              "Direct" === t?.DoIntactType
                ? (Log_1.Log.CheckDebug() &&
                    Log_1.Log.Debug("Interaction", 37, "[执行交互]直接交互", [
                      "EntityId",
                      this.Entity.Id,
                    ]),
                  TsInteractionUtils_1.TsInteractionUtils.HandleInteractionOptionNew(
                    t,
                    this.SJi
                  ))
                : 1 !== i.length || i[0].TidContent
                ? (this.SJi.HandlePreInterativeLogic(), this.fhn())
                : (Log_1.Log.CheckDebug() &&
                    Log_1.Log.Debug(
                      "Interaction",
                      37,
                      "[执行交互]默认直接交互",
                      ["EntityId", this.Entity.Id]
                    ),
                  TsInteractionUtils_1.TsInteractionUtils.HandleInteractionOptionNew(
                    i[0],
                    this.SJi
                  ));
          }
        else
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Interaction",
              37,
              "[执行交互]已经因为其他原因退出交互",
              ["EntityId", this.Entity.Id]
            ),
            this.phn();
      }),
      (this.phn = () => {
        this.ehn &&
          ((this.ehn = !1),
          InputDistributeController_1.InputDistributeController.RefreshInputTag(),
          TimerSystem_1.TimerSystem.Next(() => {
            this.vhn();
          })),
          ModelManager_1.ModelManager.InteractionModel
            .CurrentInteractEntityId === this.Entity.Id &&
            (EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnInteractActionEnd,
              this.Gan.GetPbDataId()
            ),
            Log_1.Log.CheckDebug()) &&
            Log_1.Log.Debug("Interaction", 37, "交互行为结束", [
              "EntityId",
              this.Entity.Id,
            ]);
      }),
      (this.Mhn = !1),
      (this.Shn = !1),
      (this.Ehn = !0);
  }
  get InteractRange() {
    return this.SJi?.InteractRange;
  }
  get OwenActor() {
    if (this.ban) return this.ban.Owner;
  }
  get CanInteraction() {
    return this.xan && !this.wan;
  }
  GetClientCanInteraction() {
    return this.xan;
  }
  SetInteractionState(t, i) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Interaction",
        37,
        "客户端设置是否可交互",
        ["CanInteraction", t],
        ["EntityId", this.Entity.Id],
        ["Reason", i]
      );
    i = this.xan !== t;
    (this.xan = t),
      ModelManager_1.ModelManager.InteractionModel
        ? (this.vhn(),
          ModelManager_1.ModelManager.InteractionModel
            .CurrentInteractEntityId === this.Entity.Id &&
            i &&
            InputDistributeController_1.InputDistributeController.RefreshInputTag())
        : Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Interaction",
            37,
            "[SetInteractionState]InteractionModel不存在",
            ["EntityId", this.Entity.Id]
          );
  }
  SetServerLockInteract(t, i) {
    (this.wan = t),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Interaction",
          37,
          "服务器设置是否可交互",
          ["CanInteraction", !t],
          ["EntityId", this.Gan?.GetCreatureDataId()],
          ["Reason", i]
        ),
      ModelManager_1.ModelManager.InteractionModel
        ? this.vhn()
        : Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Interaction",
            37,
            "[SetServerLockInteract]InteractionModel不存在",
            ["EntityId", this.Entity.Id]
          );
  }
  OnStart() {
    (this.qan = this.Entity.GetComponent(104)),
      (this.Gan = this.Entity.GetComponent(0)),
      (this.Izr = this.Entity.GetComponent(106)),
      (this.ban = this.Entity.GetComponent(1)),
      this.ban.Owner.IsA(UE.BP_BaseNPC_C.StaticClass()) &&
        (this.Wan = this.ban.Owner);
    var t = this.ban.CreatureData;
    return t.GetPbEntityInitData()
      ? ((this.fie = t.GetEntityType()),
        (this.man = t.GetEntityOnlineInteractType()),
        (this.SJi = new PawnInteractController_1.PawnInteractController(this)),
        (this.SJi.OnInteractActionEnd = this.phn),
        (this.SJi.OnInteractionUpdate = this.Jan),
        this.qan.SetInteractRange(
          this.SJi.InteractRange,
          this.SJi.InteractExitRange,
          this.SJi.LocationOffset
        ),
        this.Mtr.FromUeVector(this.ban.ActorForwardProxy),
        this.yhn(t),
        this.Xan(),
        this.Ore(),
        !0)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Interaction",
            7,
            "[PawnInteractComponent.OnStart] 交互组件初始化",
            ["CreatureGenID:", t.GetOwnerId()],
            ["PbDataId:", t.GetPbDataId()],
            ["InitInteractionRange:", this.InteractRange]
          ),
        !1);
  }
  yhn(t) {
    var i = t.GetPbModelConfig();
    i?.EntityType && (this.Ban = i.EntityType),
      "Chair" === this.Ban &&
        (this.Oan = new PawnChairController_1.PawnChairController(t));
  }
  GetSubEntityInteractLogicController() {
    var t = this.Entity.GetComponent(0).GetPbModelConfig();
    if ((t?.EntityType && (this.Ban = t.EntityType), "Chair" === this.Ban))
      return this.Oan;
  }
  IsCollection() {
    return "Collect" === this.Ban;
  }
  IsAnimationItem() {
    return "Animal" === this.Ban;
  }
  Ore() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnChangeRole,
      this.xie
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ChangeModeFinish,
        this.k$e
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnStartFlow,
        this.dhn
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.PlotInteractViewOpen,
        this.chn
      ),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.EnterLogicRange,
        this.fan
      ),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.LeaveLogicRange,
        this.Ozr
      ),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.OnInteractPlotEnd,
        this.phn
      );
  }
  kre() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnChangeRole,
      this.xie
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ChangeModeFinish,
        this.k$e
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnStartFlow,
        this.dhn
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.PlotInteractViewOpen,
        this.chn
      ),
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Entity,
        EventDefine_1.EEventName.EnterLogicRange,
        this.fan
      ),
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Entity,
        EventDefine_1.EEventName.LeaveLogicRange,
        this.Ozr
      ),
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Entity,
        EventDefine_1.EEventName.OnInteractPlotEnd,
        this.phn
      );
  }
  AfterUnlockInteractionEntity() {
    !this.Izr?.IsInLogicRange &&
      this.eNi &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Interaction", 37, "离开交互锁定状态时，不在感知范围内"),
      this.Ozr());
  }
  OnDisable() {
    this.CloseInteract("OnDisable");
  }
  OnEnd() {
    return (
      (this.ihn || this.thn || this.ohn) &&
        ((ModelManager_1.ModelManager.InteractionModel.IsInteractionTurning =
          !1),
        InputDistributeController_1.InputDistributeController.RefreshInputTag()),
      ModelManager_1.ModelManager.InteractionModel.LockInteractionEntity ===
        this.Entity.Id &&
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Interaction",
            37,
            "当交互锁定的实体销毁时，提前解锁",
            ["EntityId", this.Entity.Id]
          ),
        (ModelManager_1.ModelManager.InteractionModel.LockInteractionEntity =
          void 0)),
      ModelManager_1.ModelManager.InteractionModel.InteractingEntity ===
        this.Entity.Id &&
        (Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Interaction", 37, "当前实体交互中销毁", [
            "EntityId",
            this.Entity.Id,
          ]),
        (ModelManager_1.ModelManager.InteractionModel.InteractingEntity =
          void 0)),
      (this.xan = !0),
      this.kre(),
      this.CloseInteract("OnEnd"),
      this.SJi?.Dispose(),
      (this.SJi = void 0),
      this.Oan?.Dispose(),
      !(this.Oan = void 0)
    );
  }
  Xan() {
    Global_1.Global.BaseCharacter &&
      ((this._5r = Global_1.Global.BaseCharacter.CharacterActorComponent),
      (this.Nan = this._5r.Entity.GetComponent(26)),
      (this.jan = this.Nan.Entity.GetComponent(185)),
      (this.Kan =
        this._5r.CreatureData.GetPlayerId() ===
        ModelManager_1.ModelManager.CreatureModel.GetWorldOwner()));
  }
  Ihn() {
    return this.IsMatchRoleOption()
      ? this.Lhn()
        ? this.Dhn()
          ? this.Rhn()
            ? (this.Thn("[默认前置交互条件]自身被锁定"), !1)
            : this.IsInPlayerInteractiveRange()
            ? !(
                (!this.ban || this.ban.HasMesh()) &&
                (this.fie === Protocol_1.Aki.Protocol.HBs.Proto_Npc ||
                  !this.Fan) &&
                this.Ahn &&
                (this.Thn("[默认前置交互条件]NPC处于被控状态 " + this.ehn), 1)
              )
            : (this.Thn("[默认前置交互条件]不在交互范围中"), !1)
          : (this.Thn("[默认前置交互条件]自身状态异常"), !1)
        : (this.Thn("[默认前置交互条件]角色状态异常"), !1)
      : (this.Thn("[默认前置交互条件]角色类型判断"), !1);
  }
  Lhn() {
    return !(
      !this.jan ||
      (this.jan.HasTag(1008164187)
        ? (this.Thn("[默认前置交互条件]角色状态异常_濒死"), 1)
        : this.jan.HasTag(1733479717)
        ? (this.Thn("[默认前置交互条件]角色状态异常_大招"), 1)
        : this.SJi.IsPlayerTurnAround &&
          (!this.jan.HasTag(-1898186757) ||
            (this.jan.HasTag(-1371021686) && !this.jan.HasTag(-1800191060)))
        ? (this.Thn("[默认前置交互条件]角色状态异常_转身"), 1)
        : this.jan.HasTag(2099884761) &&
          (this.Thn("[默认前置交互条件]角色状态异常_禁止交互"), 1))
    );
  }
  Dhn() {
    var t = this.Entity.GetComponent(117);
    if (t?.Valid) return t.IsInteractState;
    if (this.fie === Protocol_1.Aki.Protocol.HBs.Proto_Animal) {
      t = this.Entity.GetComponent(185);
      if (t?.Valid && t.HasTag(1008164187)) return !1;
    }
    return !0;
  }
  Rhn() {
    var t = this.Entity.GetComponent(115);
    return !!t?.Valid && t.IsLocked;
  }
  Phn() {
    if (!ModelManager_1.ModelManager.GameModeModel.IsMulti) return !0;
    var t;
    if (
      (void 0 === this.Zan &&
        ((t = this.Gan.GetPbDataId()),
        (t = ModelManager_1.ModelManager.CreatureModel.GetEntityOwner(
          ModelManager_1.ModelManager.GameModeModel.MapConfig.MapId,
          t
        )) && "LevelPlay" === t?.Type
          ? (this.Zan = t.LevelPlayId)
          : (this.Zan = -1)),
      -1 < this.Zan)
    ) {
      let t = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayInfo(
        this.Zan
      );
      if (
        !(t =
          t ||
          ModelManager_1.ModelManager.InstanceDungeonModel.GetInstanceDungeonInfo()) ||
        !t.IsBelongPlayer
      )
        return !1;
    }
    return 2 !== this.GZo && !!(0 !== this.GZo || (this.WGo && this.Cen)); // bypass error tips
    return (
      (2 !== this.man && !!(0 !== this.man || (this._5r && this.Kan))) ||
      (LevelGamePlayController_1.LevelGamePlayController.ShowFakeErrorCodeTips(),
      !1)
    );
  }
  IsPawnInteractive() {
    return !(
      !this.CanInteraction ||
      !this.Dhn() ||
      this.Ahn ||
      !this.SJi.GetInteractiveOption()
    );
  }
  xhn() {
    var t, i;
    return this.CanInteraction
      ? this.ehn
        ? (this.Thn("IsExecutingInteract is true"), !1)
        : (t = this.SJi.GetInteractiveOption())
        ? ((i = this.Mhn),
          (this.Mhn = 1 === t?.CustomOptionType),
          i !== this.Mhn &&
            (EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnExecutionOptionChange,
              this.Mhn,
              this.Entity.Id
            ),
            !this.Shn) &&
            this.Mhn &&
            ((this.Shn = !0),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnEnterOrExitExecutionRange,
              !0,
              this.Entity.Id
            )),
          t !== this.SJi.CurrentInteractOption && this.ApplyInteractConfig(t),
          !0)
        : (this.Thn("没有找到可以交互的选项"), !1)
      : (this.Thn("CanInteraction is false"), !1);
  }
  InteractPawn(t = -1, i) {
    return (
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Interaction", 37, "[执行交互]调用执行交互", [
          "EntityId",
          this.Entity.Id,
        ]),
      ModelManager_1.ModelManager.InteractionModel
        ? this.kan
          ? ControllerHolder_1.ControllerHolder.PlotController.IsEnableInteract()
            ? ModelManager_1.ModelManager.InteractionModel.IsHideInteractHint
              ? (Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "Interaction",
                    37,
                    "[执行交互]全局隐藏交互开启",
                    ["EntityId", this.Entity.Id]
                  ),
                !1)
              : !!this.ban && (this.whn(t, i), !0)
            : (Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "Interaction",
                  37,
                  "[执行交互]剧情状态不允许交互",
                  ["EntityId", this.Entity.Id]
                ),
              !1)
          : (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("Interaction", 37, "[执行交互]当前不可交互", [
                "EntityId",
                this.Entity.Id,
              ]),
            !1)
        : (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Interaction",
              37,
              "[执行交互]InteractionModel不存在",
              ["EntityId", this.Entity.Id]
            ),
          !1)
    );
  }
  InteractOption(t = 0) {
    return (
      !!ModelManager_1.ModelManager.PlotModel.IsInInteraction &&
      ModelManager_1.ModelManager.PlotModel.CurrentInteractEntity?.Id ===
        this.Entity?.Id &&
      !!this.GetInteractController() &&
      (this.GetInteractController().InteractOption(t), !0)
    );
  }
  CloseInteract(t = void 0) {
    this.zan(t);
  }
  ApplyInteractConfig(t) {
    t && this.SJi.ChangeInteractOption(t);
  }
  GetIsExecutingInteract() {
    return this.ehn;
  }
  whn(t = -1, i) {
    if (this.kan)
      if (this.Ihn() && this.Phn()) {
        (this.Qan = i),
          (this.ehn = !0),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Interaction", 37, "执行交互", [
              "EntityId",
              this.Entity.Id,
            ]);
        var i = ModelManager_1.ModelManager.InteractionModel,
          e =
            (i.SetInteractTarget(this.Entity.Id), this.Gan.GetCreatureDataId());
        i.SetInterctCreatureDataId(e),
          (ModelManager_1.ModelManager.ShopModel.InteractTarget =
            this.Entity.Id),
          this._5r.ClearInput();
        const s = this._5r.Entity;
        e = s.GetComponent(185);
        if (this.SJi.IsPlayerTurnAround && e?.HasTag(-1898186757)) {
          (i.IsInteractionTurning = !1), // default !0
            InputDistributeController_1.InputDistributeController.RefreshInputTag(),
            (this.ihn = !0);
          const s = this._5r.Entity;
          (e = s.GetComponent(160)),
            (i =
              (e &&
                e.StopMontage() /*, e.MainAnimInstance.ConsumeExtractedRootMotion(1) */,
              s.GetComponent(36)));
          i &&
            ((i.ForceExitStateStop = !0),
            (i.CanMoveFromInput = !0), // default !1
            i.CharacterMovement); // &&
          // (i.CharacterMovement.Velocity = Vector_1.Vector.ZeroVector),
          // TimerSystem_1.TimerSystem.Delay(
          //   this.nhn,
          //   MAX_WAIT_PLAYER_STAND_TIME
          // );
          this.nhn();
        } else (this.thn = !0), this.shn(), this.hhn();
        (this.CanRestartAi = !1),
          this.fie === Protocol_1.Aki.Protocol.HBs.Proto_Npc && this.Bhn(t),
          this.Chn(t);
      } else
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Interaction", 37, "执行交互时不满足条件", [
            "EntityId",
            this.Entity.Id,
          ]);
    else
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Interaction", 37, "执行交互时不可交互", [
          "EntityId",
          this.Entity.Id,
        ]);
  }
  mhn() {
    (ModelManager_1.ModelManager.InteractionModel.IsInteractionTurning = !1),
      InputDistributeController_1.InputDistributeController.RefreshInputTag(),
      ModelManager_1.ModelManager.PlotModel.IsInInteraction &&
        (UiManager_1.UiManager.IsViewShow("PlotView")
          ? EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.TriggerPlotInteraction,
              this.GetInteractController()
            )
          : (this.uhn = !0)),
      (this.lhn = !1),
      this.rhn &&
        (TimerSystem_1.TimerSystem.Remove(this.rhn), (this.rhn = void 0));
  }
  Bhn(i) {
    if (((this.lhn = !1), !this.Qan)) {
      let t = void 0;
      "Direct" ===
      (t =
        -1 < i
          ? this.SJi.GetOptionByInstanceId(i)
          : this.SJi.GetInteractiveOption())?.DoIntactType
        ? (this.lhn = this.bhn(t))
        : 1 !== (i = this.SJi.Options).length ||
          i[0].TidContent ||
          (this.lhn = this.bhn(i[0]));
    }
  }
  IsOnlyCollectOption() {
    let t = this.SJi.GetInteractiveOption();
    if (
      (t =
        (t =
          (t = "Direct" !== t?.DoIntactType ? void 0 : t) ||
          1 !== (i = this.SJi.Options).length ||
          i[0].TidContent
            ? t
            : i[0]) || this.SJi.GetOptionByInstanceId(0)) &&
      0 === t.OptionType
    ) {
      var i = t.Type;
      if (i && i.Actions && 1 === i.Actions.length)
        if ("Collect" === i.Actions[0].Name) return !0;
    }
    return !1;
  }
  ExecuteInteractFromVision(i) {
    if (this.CanInteraction) {
      let t = this.SJi.GetInteractiveOption();
      var e;
      "Direct" === t?.DoIntactType
        ? (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Interaction", 37, "[执行交互]幻象直接交互", [
              "EntityId",
              this.Entity.Id,
            ]),
          TsInteractionUtils_1.TsInteractionUtils.HandleInteractionOptionFromVision(
            t,
            this.SJi,
            i
          ))
        : (1 !== (e = this.SJi.Options).length ||
            e[0].TidContent ||
            (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("Interaction", 37, "[执行交互]幻象默认直接交互", [
                "EntityId",
                this.Entity.Id,
              ]),
            TsInteractionUtils_1.TsInteractionUtils.HandleInteractionOptionFromVision(
              e[0],
              this.SJi,
              i
            )),
          "Direct" ===
            (t = t || this.SJi.GetOptionByInstanceId(0))?.DoIntactType &&
            (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("Interaction", 37, "[执行交互]保底幻象直接交互", [
                "EntityId",
                this.Entity.Id,
              ]),
            TsInteractionUtils_1.TsInteractionUtils.HandleInteractionOptionFromVision(
              t,
              this.SJi,
              i
            )));
    }
  }
  ghn(t) {
    t = t.Type;
    return !(!t || !t.Flow);
  }
  bhn(t) {
    t = t.Type;
    if (!t || !t.Flow) return !1;
    t = ConfigManager_1.ConfigManager.FlowConfig.GetFlowStateActions(
      t.Flow.FlowListName,
      t.Flow.FlowId,
      t.Flow.StateId
    );
    if (t && 0 < t.length) {
      t = t[0];
      if ("SetPlotMode" === t.Name) {
        t = t.Params;
        if ("LevelC" !== t.Mode || !1 === t.UseFlowCamera) return !1;
      }
    }
    return !0;
  }
  SimpleInteract() {
    var t = this.SJi.GetOptionByInstanceId(0);
    TsInteractionUtils_1.TsInteractionUtils.HandleInteractionOptionNew(
      t,
      this.SJi
    );
  }
  vhn() {
    this.CanInteraction &&
      (this.fie !== Protocol_1.Aki.Protocol.HBs.Proto_Npc ||
        (!this.GetInteractController()?.IsTurnRecoveryImmediately &&
          this.Van) ||
        (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Interaction", 37, "交互结束立即转回", [
            "EntityId",
            this.Entity.Id,
          ]),
        this.Entity.GetComponent(168)?.OnPlayerInteractEnd()),
      ModelManager_1.ModelManager.InteractionModel.InteractingEntity ===
        this.Entity.Id) &&
      (ModelManager_1.ModelManager.InteractionModel.InteractingEntity = void 0);
  }
  qhn() {
    if (!this.kan) return !1;
    if (!this.ban) return !1;
    if (this.Ahn) return !1;
    this.Fan = !0;
    var i = this.SJi.GetAutoTriggerOption();
    if (i) {
      if (!this.qan.IsInInteractRange) return !1;
      this.InteractPawn(-1, i);
    } else {
      let t = this.IsInSectorRange();
      t = t && !this.Nan.GetSitDownState();
      i = this.SJi.GetInteractiveOption();
      1 === i?.CustomOptionType &&
        (EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnEnterOrExitExecutionRange,
          !0,
          this.Entity.Id
        ),
        (this.Shn = !0)),
        this.SJi.UpdateDirectOptions(!1),
        ModelManager_1.ModelManager.InteractionModel.HandleInteractionHint(
          t,
          this.Entity.Id,
          i,
          this.Izr.PlayerDistSquared,
          this.SJi.InteractEntity
        );
    }
    return !0;
  }
  zan(t) {
    ModelManager_1.ModelManager.InteractionModel.CurrentInteractEntityId ===
      this.Entity.Id &&
      ModelManager_1.ModelManager.InteractionModel.SetInteractTarget(void 0),
      this.ban &&
        ((this.kan = !1),
        this.ehn &&
          ((this.ehn = !1),
          InputDistributeController_1.InputDistributeController.RefreshInputTag()),
        t &&
          Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Interaction",
            37,
            "结束交互",
            ["EntityId", this.Entity.Id],
            ["原因", t]
          ),
        this.SJi.ClearDirectOptions(),
        ModelManager_1.ModelManager.InteractionModel.HandleInteractionHint(
          !1,
          this.Entity.Id
        ),
        PlotController_1.PlotController.EndInteractionByInteractController(
          this.GetInteractController()
        ),
        (this.CanRestartAi = !0));
  }
  ForceUpdate() {
    this.TBo(), this.$an();
  }
  Thn(t) {
    (this.Ehn ||
      ModelManager_1.ModelManager.LevelGeneralModel.InteractionDebug) &&
      ((this.Ehn = !1), Log_1.Log.CheckInfo()) &&
      Log_1.Log.Info(
        "Interaction",
        37,
        "Update提前返回",
        ["reason", t],
        ["entity", this.Gan?.GetPbDataId()]
      );
  }
  OnTick(t) {
    this.eNi &&
      (this.ihn && this.jan?.HasTag(248240472) && this.nhn(), this.$an());
  }
  $an() {
    if (ModelManager_1.ModelManager.InteractionModel.IsHideInteractHint)
      this.Thn("全局隐藏交互开启");
    else if (ModelManager_1.ModelManager.PlotModel.IsInInteraction)
      this.Thn("交互界面已打开");
    else if (this.Gan?.IsConcealed) this.Thn("实体隐藏将不可交互");
    else if (PlotController_1.PlotController.IsEnableInteract())
      if (this.Izr)
        if ((this._5r || this.Xan(), this.qan))
          if (this.Yan || (this.SJi && this.SJi.HasInteractOptions()))
            if (this.ehn) this.Thn("当前正在执行交互");
            else {
              var t =
                ModelManager_1.ModelManager.InteractionModel
                  .LockInteractionEntity === this.Entity.Id;
              if (this.qan.IsInInteractRange || t) {
                if (!this.Ihn() && !t)
                  return void (
                    !this.Han &&
                    this.Van &&
                    ((this.Han = !0), this.zan("不满足默认前置交互条件"))
                  );
                (this.Van && !this.Han) ||
                  ((this.Van = !0),
                  (this.Fan = !1),
                  (this.kan = this.xhn()),
                  ModelManager_1.ModelManager.LevelGeneralModel
                    .InteractionDebug &&
                    Log_1.Log.CheckDebug() &&
                    Log_1.Log.Debug(
                      "Interaction",
                      7,
                      "[PawnInteractComponent.UpdateInteractComponent] 交互组件更新：初次进入交互范围",
                      ["IsInteractable:", this.kan],
                      ["InteractionRange:", this.InteractRange]
                    ),
                  this.qhn()),
                  (this.Han = !1),
                  this.Van && ((this.kan = this.xhn()), this.Ghn()),
                  this.kan && (this.Ehn = !0);
              } else
                (this.Ehn = !0),
                  this.Van &&
                    ((this.Van = !1),
                    this.zan("离开交互范围"),
                    this.Mhn &&
                      (EventSystem_1.EventSystem.Emit(
                        EventDefine_1.EEventName.OnEnterOrExitExecutionRange,
                        !1,
                        this.Entity.Id
                      ),
                      (this.Shn = !1),
                      (this.Mhn = !1)),
                    this.fie === Protocol_1.Aki.Protocol.HBs.Proto_Npc) &&
                    this.CanInteraction &&
                    (Log_1.Log.CheckDebug() &&
                      Log_1.Log.Debug("Interaction", 37, "退出交互范围转身", [
                        "EntityId",
                        this.Entity.Id,
                      ]),
                    this.Entity.GetComponent(168)?.OnPlayerInteractEnd()),
                  this.phn();
              this.Yan && !this.qan.IsInInteractRange && (this.Yan = !1);
            }
          else this.Thn("当前没有可交互的内容");
        else this.Thn("感知组件为空");
      else this.Thn("感知信息组件为空");
    else this.Thn("剧情控制器不允许交互");
  }
  Ghn() {
    if (this.ban)
      if (this.ban.Entity?.IsInit)
        if (this.Ahn) this.Thn("NPC处于被控状态");
        else if (this.kan) {
          this.SJi.UpdateDirectOptions();
          var i = this.SJi.GetAutoTriggerOption();
          if (i) this.qan.IsInInteractRange && this.InteractPawn(-1, i);
          else {
            i = this.SJi.GetInteractiveOption();
            if ("Auto" !== i?.DoIntactType) {
              let t = this.IsInSectorRange();
              (t = t && !this.Nan.GetSitDownState()),
                ModelManager_1.ModelManager.InteractionModel.HandleInteractionHint(
                  t,
                  this.Entity.Id,
                  i,
                  this.Izr.PlayerDistSquared,
                  this.SJi.InteractEntity
                );
            }
          }
        } else
          ModelManager_1.ModelManager.InteractionModel.HandleInteractionHint(
            !1,
            this.Entity.Id
          );
      else this.Thn("OwnerActor 未初始化");
    else this.Thn("OwnerActor 为空");
  }
  IsInSectorRange() {
    return this.SJi.IsInSectorRange();
  }
  IsInPlayerInteractiveRange() {
    return this.SJi.IsInPlayerInteractiveRange();
  }
  IsMatchRoleOption() {
    return this.SJi.IsMatchRoleOption();
  }
  GetInteractPoint() {
    return this.SJi?.GetInteractPoint();
  }
  TBo() {
    (this.kan = !1), (this.Fan = !1);
  }
  fhn() {
    PlotController_1.PlotController.TriggerInteraction(!this.thn && !this.ihn)
      ? ModelManager_1.ModelManager.InteractionModel.HandleInteractionHint(
          !1,
          this.Entity.Id
        )
      : this.phn();
  }
  UpdateInteractRange() {
    this.SJi &&
      this.qan &&
      this.qan.SetInteractRange(
        this.SJi.InteractRange,
        this.SJi.InteractExitRange,
        this.SJi.LocationOffset
      );
  }
  get Ahn() {
    return (
      !!this.Wan &&
      !this.ehn &&
      (this.Wan.IsBeingImpacted || this.Wan.IsBeingAttacked)
    );
  }
  GetInteractController() {
    return this.SJi;
  }
  get DebugTimerRunning() {
    return this.eNi;
  }
  get DebugInteractOpened() {
    return this.CanInteraction;
  }
};
(PawnInteractNewComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(178)],
  PawnInteractNewComponent
)),
  (exports.PawnInteractNewComponent = PawnInteractNewComponent);
//# sourceMappingURL=PawnInteractNewComponent.js.map

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
  DEFAULT_CHECK_IGNORE_DISTANCE = 120,
  DEFAULT_CHECK_IGNORE_DISTANCE_SQUARED =
    DEFAULT_CHECK_IGNORE_DISTANCE * DEFAULT_CHECK_IGNORE_DISTANCE,
  MAX_WAIT_NPC_TURN_TIME = 2500,
  MAX_WAIT_PLAYER_STAND_TIME = 1e3;
let PawnInteractNewComponent = class PawnInteractNewComponent extends PawnInteractBaseComponent_1.PawnInteractBaseComponent {
  constructor() {
    super(...arguments),
      (this.ten = !0),
      (this.ien = !1),
      (this.ren = "Npc"),
      (this.oen = void 0),
      (this.nen = void 0),
      (this.sen = void 0),
      (this.aen = void 0),
      (this.kXi = void 0),
      (this.hen = void 0),
      (this.Wte = void 0),
      (this.GZo = void 0),
      (this.len = !1),
      (this._en = !1),
      (this.uen = !1),
      (this.cen = !1),
      (this.Hzr = Vector_1.Vector.Create()),
      (this.fqi = !1),
      (this.WGo = void 0),
      (this.men = void 0),
      (this.Fjo = void 0),
      (this.den = void 0),
      (this.Cen = !1),
      (this.gen = void 0),
      (this.CanRestartAi = !0),
      (this.sie = (t, i) => {
        this.fen();
      }),
      (this.YQe = () => {
        this.kXi?.OnChangeModeFinish();
      }),
      (this.FZo = () => {
        this.pen(),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Interaction", 37, "进入感知范围，开启交互Tick", [
              "EntityId",
              this.Entity.Id,
            ]),
          (this.fqi = !0);
      }),
      (this.iWo = () => {
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
            (this.fqi = !1));
      }),
      (this.ven = !1),
      (this.Men = () => {
        this.kXi && this.kXi.HasInteractOptions()
          ? this.pen()
          : (this.Een("没有可交互内容"), (this.ven = !0));
      }),
      (this.Sen = void 0),
      (this.yen = !1),
      (this.Ien = !1),
      (this.Den = !1),
      (this.Ren = !1),
      (this.Uen = void 0),
      (this.Aen = () => {
        this.Den && ((this.Den = !1), (this.Ien = !0), this.xen(), this.Pen());
      }),
      (this.Pen = () => {
        var t = this.WGo.Entity,
          i = MathUtils_1.MathUtils.CommonTempRotator,
          e = MathUtils_1.MathUtils.CommonTempVector;
        this.oen.ActorLocationProxy.Subtraction(this.WGo.ActorLocationProxy, e),
          e.Normalize(),
          (i.Roll = 0),
          (i.Pitch = 0),
          (i.Yaw = MathUtils_1.MathUtils.GetAngleByVector2D(e)),
          this.WGo.SetInputRotator(i);
        t.GetComponent(51).SetActive(!1);
        (e = MathUtils_1.MathUtils.CommonTempVector),
          this.oen.ActorLocationProxy.Subtraction(
            this.WGo.ActorLocationProxy,
            e
          ),
          (i = e.HeadingAngle() * MathCommon_1.MathCommon.RadToDeg),
          (t =
            ((180 < (i = Math.abs(this.WGo.ActorRotationProxy.Yaw - i))
              ? 360 - i
              : i) /
              300) *
            CommonDefine_1.MILLIONSECOND_PER_SECOND);
        (this.Ien = !0),
          t > TimerSystem_1.MIN_TIME
            ? TimerSystem_1.TimerSystem.Delay(this.wen, t)
            : this.wen();
      }),
      (this.xen = () => {
        if (this.Wte === Protocol_1.Aki.Protocol.EEntityType.Npc) {
          this.Ren = !0;
          var t,
            i = this.kXi.IsTurnAround;
          i
            ? ((t = this.Entity.GetComponent(167)),
              this.kXi.IsWaitTurnComplete || this.Ben
                ? t.OnPlayerInteractStart(i, !0, this.ben)
                  ? (this.Uen = TimerSystem_1.TimerSystem.Delay(
                      this.ben,
                      MAX_WAIT_NPC_TURN_TIME
                    ))
                  : this.ben()
                : (t.OnPlayerInteractStart(i, !1, void 0), this.ben()))
            : this.ben();
        }
      }),
      (this.Ben = !1),
      (this.qen = !1),
      (this.Nen = () => {
        this.qen &&
          ((this.qen = !1),
          ModelManager_1.ModelManager.PlotModel.IsInInteraction) &&
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.TriggerPlotInteraction,
            this.GetInteractController()
          );
      }),
      (this.ben = () => {
        this.Ren && ((this.Ren = !1), this.Ien || this.Oen());
      }),
      (this.wen = () => {
        let t = this.WGo?.Entity;
        var i;
        (t =
          t ||
          Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity) &&
          (t.GetComponent(51)?.SetActive(!0), (i = t.GetComponent(160))) &&
          ((i.ForceExitStateStop = !1), (i.CanMoveFromInput = !0)),
          (this.Ien = !1),
          this.Ren || this.Oen();
      }),
      (this.ken = () => {
        this.Ben && (this.Ien || this.Ren)
          ? ((this.Ben = !1),
            ControllerHolder_1.ControllerHolder.PlotController.ProtectPlotView(),
            ControllerHolder_1.ControllerHolder.PlotController.OpenPlotView(
              "PlotView"
            ),
            CameraController_1.CameraController.EnterDialogueMode(
              this.GetInteractController().GetInteractPoint(),
              !1
            ))
          : (this.Ben = !1);
      }),
      (this.Fen = (i) => {
        if (this.yen)
          if (
            (this.kXi.RecordInteraction(),
            ModelManager_1.ModelManager.InteractionModel.HandleInteractionHint(
              !1,
              this.Entity.Id
            ),
            (ModelManager_1.ModelManager.InteractionModel.InteractingEntity =
              this.Entity.Id),
            this.gen)
          )
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("Interaction", 37, "[执行交互]自动触发交互", [
                "EntityId",
                this.Entity.Id,
              ]),
              TsInteractionUtils_1.TsInteractionUtils.HandleInteractionOptionNew(
                this.gen,
                this.kXi
              );
          else {
            let t = void 0;
            t =
              -1 < i
                ? this.kXi.GetOptionByInstanceId(i)
                : this.kXi.GetInteractiveOption();
            i = this.kXi.Options;
            ((t && this.Ven(t)) ||
              (1 === i.length && this.Ven(i[0])) ||
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
                    this.kXi
                  ))
                : 1 !== i.length || i[0].TidContent
                ? (this.kXi.HandlePreInterativeLogic(), this.Hen())
                : (Log_1.Log.CheckDebug() &&
                    Log_1.Log.Debug(
                      "Interaction",
                      37,
                      "[执行交互]默认直接交互",
                      ["EntityId", this.Entity.Id]
                    ),
                  TsInteractionUtils_1.TsInteractionUtils.HandleInteractionOptionNew(
                    i[0],
                    this.kXi
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
            this.jen();
      }),
      (this.jen = () => {
        this.yen &&
          ((this.yen = !1),
          InputDistributeController_1.InputDistributeController.RefreshInputTag(),
          TimerSystem_1.TimerSystem.Next(() => {
            this.Wen();
          })),
          ModelManager_1.ModelManager.InteractionModel
            .CurrentInteractEntityId === this.Entity.Id &&
            (EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnInteractActionEnd,
              this.sen.GetPbDataId()
            ),
            Log_1.Log.CheckInfo()) &&
            Log_1.Log.Info("Interaction", 37, "交互行为结束", [
              "EntityId",
              this.Entity.Id,
            ]);
      }),
      (this.Ken = !1),
      (this.Qen = !1),
      (this.$en = !0);
  }
  get InteractRange() {
    return this.kXi?.InteractRange;
  }
  get OwenActor() {
    if (this.oen) return this.oen.Owner;
  }
  get CanInteraction() {
    return this.ten && !this.ien;
  }
  GetClientCanInteraction() {
    return this.ten;
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
    i = this.ten !== t;
    (this.ten = t),
      this.Wen(),
      ModelManager_1.ModelManager.InteractionModel.CurrentInteractEntityId ===
        this.Entity.Id &&
        i &&
        InputDistributeController_1.InputDistributeController.RefreshInputTag();
  }
  SetServerLockInteract(t, i) {
    (this.ien = t),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Interaction",
          37,
          "服务器设置是否可交互",
          ["CanInteraction", !t],
          ["EntityId", this.sen?.GetCreatureDataId()],
          ["Reason", i]
        ),
      this.Wen();
  }
  OnStart() {
    (this.nen = this.Entity.GetComponent(104)),
      (this.sen = this.Entity.GetComponent(0)),
      (this.Fjo = this.Entity.GetComponent(106)),
      (this.oen = this.Entity.GetComponent(1)),
      this.oen.Owner.IsA(UE.BP_BaseNPC_C.StaticClass()) &&
        (this.den = this.oen.Owner);
    var t = this.oen.CreatureData;
    return t.GetPbEntityInitData()
      ? ((this.Wte = t.GetEntityType()),
        (this.GZo = t.GetEntityOnlineInteractType()),
        (this.kXi = new PawnInteractController_1.PawnInteractController(this)),
        (this.kXi.OnInteractActionEnd = this.jen),
        (this.kXi.OnInteractionUpdate = this.Men),
        this.nen.SetInteractRange(
          this.kXi.InteractRange,
          this.kXi.InteractExitRange
        ),
        this.Hzr.FromUeVector(this.oen.ActorForwardProxy),
        this.Xen(t),
        this.fen(),
        this.moe(),
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
  Xen(t) {
    var i = t.GetPbModelConfig();
    i?.EntityType && (this.ren = i.EntityType),
      "Chair" === this.ren &&
        (this.hen = new PawnChairController_1.PawnChairController(t));
  }
  GetSubEntityInteractLogicController() {
    var t = this.Entity.GetComponent(0).GetPbModelConfig();
    if ((t?.EntityType && (this.ren = t.EntityType), "Chair" === this.ren))
      return this.hen;
  }
  IsCollection() {
    return "Collect" === this.ren;
  }
  IsAnimationItem() {
    return "Animal" === this.ren;
  }
  moe() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnChangeRole,
      this.sie
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ChangeModeFinish,
        this.YQe
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnStartFlow,
        this.ken
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.PlotInteractViewOpen,
        this.Nen
      ),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.EnterLogicRange,
        this.FZo
      ),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.LeaveLogicRange,
        this.iWo
      ),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.OnInteractPlotEnd,
        this.jen
      );
  }
  doe() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnChangeRole,
      this.sie
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ChangeModeFinish,
        this.YQe
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnStartFlow,
        this.ken
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.PlotInteractViewOpen,
        this.Nen
      ),
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Entity,
        EventDefine_1.EEventName.EnterLogicRange,
        this.FZo
      ),
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Entity,
        EventDefine_1.EEventName.LeaveLogicRange,
        this.iWo
      ),
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Entity,
        EventDefine_1.EEventName.OnInteractPlotEnd,
        this.jen
      );
  }
  AfterUnlockInteractionEntity() {
    !this.Fjo?.IsInLogicRange &&
      this.fqi &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Interaction", 37, "离开交互锁定状态时，不在感知范围内"),
      this.iWo());
  }
  OnDisable() {
    this.CloseInteract("OnDisable");
  }
  OnEnd() {
    return (
      (this.Den || this.Ien || this.Ren) &&
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
      (this.ten = !0),
      this.doe(),
      this.CloseInteract("OnEnd"),
      this.kXi?.Dispose(),
      (this.kXi = void 0),
      this.hen?.Dispose(),
      !(this.hen = void 0)
    );
  }
  fen() {
    Global_1.Global.BaseCharacter &&
      ((this.WGo = Global_1.Global.BaseCharacter.CharacterActorComponent),
      (this.aen = this.WGo.Entity.GetComponent(26)),
      (this.men = this.aen.Entity.GetComponent(184)),
      (this.Cen =
        this.WGo.CreatureData.GetPlayerId() ===
        ModelManager_1.ModelManager.CreatureModel.GetWorldOwner()));
  }
  Yen() {
    if (!this.IsMatchRoleOption())
      return this.Jen("[默认前置交互条件]角色类型判断"), !1;
    if (!this.zen()) return this.Jen("[默认前置交互条件]角色状态异常"), !1;
    if (!this.Zen()) return this.Jen("[默认前置交互条件]自身状态异常"), !1;
    if (this.etn()) return this.Jen("[默认前置交互条件]自身被锁定"), !1;
    if (!this.IsInPlayerInteractiveRange())
      return this.Jen("[默认前置交互条件]不在交互范围中"), !1;
    if (
      (!this.oen || this.oen.HasMesh()) &&
      (this.Wte === Protocol_1.Aki.Protocol.EEntityType.Npc || !this._en)
    ) {
      if (this.ttn)
        return this.Jen("[默认前置交互条件]NPC处于被控状态 " + this.yen), !1;
      this.itn();
    }
    return !0;
  }
  itn() {
    return (
      Vector_1.Vector.DistSquared2D(
        this.WGo.ActorLocationProxy,
        this.oen.ActorLocationProxy
      ) <= DEFAULT_CHECK_IGNORE_DISTANCE_SQUARED
    );
  }
  zen() {
    return !(
      !this.men ||
      (this.men.ContainsTagById(1008164187)
        ? (this.Jen("[默认前置交互条件]角色状态异常_濒死"), 1)
        : this.men.ContainsTagById(1733479717)
        ? (this.Jen("[默认前置交互条件]角色状态异常_大招"), 1)
        : this.kXi.IsPlayerTurnAround &&
          (!this.men.ContainsTagById(-1898186757) ||
            (this.men.ContainsTagById(-1371021686) &&
              !this.men.ContainsTagById(-1800191060)))
        ? (this.Jen("[默认前置交互条件]角色状态异常_转身"), 1)
        : this.men.ContainsTagById(2099884761) &&
          (this.Jen("[默认前置交互条件]角色状态异常_禁止交互"), 1))
    );
  }
  Zen() {
    var t = this.Entity.GetComponent(116);
    if (t?.Valid) return t.IsInteractState;
    if (this.Wte === Protocol_1.Aki.Protocol.EEntityType.Animal) {
      t = this.Entity.GetComponent(184);
      if (t?.Valid && t.ContainsTagById(1008164187)) return !1;
    }
    return !0;
  }
  etn() {
    var t = this.Entity.GetComponent(114);
    return !!t?.Valid && t.IsLocked;
  }
  rtn() {
    if (!ModelManager_1.ModelManager.GameModeModel.IsMulti) return !0;
    var t;
    if (
      (void 0 === this.Sen &&
        ((t = this.sen.GetPbDataId()),
        (t = ModelManager_1.ModelManager.CreatureModel.GetEntityOwner(
          ModelManager_1.ModelManager.GameModeModel.MapConfig.MapId,
          t
        )) && "LevelPlay" === t?.Type
          ? (this.Sen = t.LevelPlayId)
          : (this.Sen = -1)),
      -1 < this.Sen)
    ) {
      let t = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayInfo(
        this.Sen
      );
      if (
        !(t =
          t ||
          ModelManager_1.ModelManager.InstanceDungeonModel.GetInstanceDungeonInfo()) ||
        !t.IsBelongPlayer
      )
        return !1;
    }
    return (2 !== this.GZo && !!(0 !== this.GZo || (this.WGo && this.Cen)))
    return (
      (2 !== this.GZo && !!(0 !== this.GZo || (this.WGo && this.Cen))) ||
      (LevelGamePlayController_1.LevelGamePlayController.ShowFakeErrorCodeTips(),
      !1)
    );
  }
  IsPawnInteractive() {
    return !(
      !this.CanInteraction ||
      !this.Zen() ||
      this.ttn ||
      !this.kXi.GetInteractiveOption()
    );
  }
  otn() {
    var t, i;
    return this.CanInteraction
      ? this.yen
        ? (this.Jen("IsExecutingInteract is true"), !1)
        : (t = this.kXi.GetInteractiveOption())
        ? ((i = this.Ken),
          (this.Ken = 1 === t?.CustomOptionType),
          i !== this.Ken &&
            (EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnExecutionOptionChange,
              this.Ken,
              this.Entity.Id
            ),
            !this.Qen) &&
            this.Ken &&
            ((this.Qen = !0),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnEnterOrExitExecutionRange,
              !0,
              this.Entity.Id
            )),
          t !== this.kXi.CurrentInteractOption && this.ApplyInteractConfig(t),
          !0)
        : (this.Jen("没有找到可以交互的选项"), !1)
      : (this.Jen("CanInteraction is false"), !1);
  }
  InteractPawn(t = -1, i) {
    return (
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Interaction", 37, "[执行交互]调用执行交互", [
          "EntityId",
          this.Entity.Id,
        ]),
      this.len
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
            : !!this.oen && (this.ntn(t, i), !0)
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
    this.Een(t);
  }
  ApplyInteractConfig(t) {
    t && this.kXi.ChangeInteractOption(t);
  }
  GetIsExecutingInteract() {
    return this.yen;
  }
  ntn(t = -1, i) {
    if (this.len)
      if (this.Yen() && this.rtn()) {
        (this.gen = i),
          (this.yen = !0),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Interaction", 37, "执行交互", [
              "EntityId",
              this.Entity.Id,
            ]),
          UiManager_1.UiManager.CloseView("WorldMapView");
        var i = ModelManager_1.ModelManager.InteractionModel,
          e =
            (i.SetInteractTarget(this.Entity.Id), this.sen.GetCreatureDataId());
        i.SetInterctCreatureDataId(e),
          (ModelManager_1.ModelManager.ShopModel.InteractTarget =
            this.Entity.Id),
          this.WGo.ClearInput();
        const s = this.WGo.Entity;
        e = s.GetComponent(184);
        if (this.kXi.IsPlayerTurnAround && e?.ContainsTagById(-1898186757)) {
          (i.IsInteractionTurning = !1), // default !0
            InputDistributeController_1.InputDistributeController.RefreshInputTag(),
            (this.Den = !0);
          const s = this.WGo.Entity;
          (e = s.GetComponent(159)),
            (i =
              (e &&
                (e.StopMontage()/*, e.MainAnimInstance.ConsumeExtractedRootMotion(1) */),
              s.GetComponent(36)));
          i &&
            ((i.ForceExitStateStop = !0),
            (i.CanMoveFromInput = true /*!1*/),
            i.CharacterMovement) //&&
            // (i.CharacterMovement.Velocity = Vector_1.Vector.ZeroVector),
            // TimerSystem_1.TimerSystem.Delay(
            //   this.Aen,
            //   MAX_WAIT_PLAYER_STAND_TIME
            // );
            this.Aen();
        } else (this.Ien = !0), this.xen(), this.wen();
        (this.CanRestartAi = !1),
          this.Wte === Protocol_1.Aki.Protocol.EEntityType.Npc && this.stn(t),
          this.Fen(t);
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
  Oen() {
    (ModelManager_1.ModelManager.InteractionModel.IsInteractionTurning = !1),
      InputDistributeController_1.InputDistributeController.RefreshInputTag(),
      ModelManager_1.ModelManager.PlotModel.IsInInteraction &&
        (UiManager_1.UiManager.IsViewShow("PlotView")
          ? EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.TriggerPlotInteraction,
              this.GetInteractController()
            )
          : (this.qen = !0)),
      (this.Ben = !1),
      this.Uen &&
        (TimerSystem_1.TimerSystem.Remove(this.Uen), (this.Uen = void 0));
  }
  stn(i) {
    if (((this.Ben = !1), !this.gen)) {
      let t = void 0;
      "Direct" ===
      (t =
        -1 < i
          ? this.kXi.GetOptionByInstanceId(i)
          : this.kXi.GetInteractiveOption())?.DoIntactType
        ? (this.Ben = this.atn(t))
        : 1 !== (i = this.kXi.Options).length ||
          i[0].TidContent ||
          (this.Ben = this.atn(i[0]));
    }
  }
  IsOnlyCollectOption() {
    let t = this.kXi.GetInteractiveOption();
    if (
      (t =
        (t =
          (t = "Direct" !== t?.DoIntactType ? void 0 : t) ||
          1 !== (i = this.kXi.Options).length ||
          i[0].TidContent
            ? t
            : i[0]) || this.kXi.GetOptionByInstanceId(0)) &&
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
      let t = this.kXi.GetInteractiveOption();
      var e;
      "Direct" === t?.DoIntactType
        ? (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Interaction", 37, "[执行交互]幻象直接交互", [
              "EntityId",
              this.Entity.Id,
            ]),
          TsInteractionUtils_1.TsInteractionUtils.HandleInteractionOptionFromVision(
            t,
            this.kXi,
            i
          ))
        : (1 !== (e = this.kXi.Options).length ||
            e[0].TidContent ||
            (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("Interaction", 37, "[执行交互]幻象默认直接交互", [
                "EntityId",
                this.Entity.Id,
              ]),
            TsInteractionUtils_1.TsInteractionUtils.HandleInteractionOptionFromVision(
              e[0],
              this.kXi,
              i
            )),
          "Direct" ===
            (t = t || this.kXi.GetOptionByInstanceId(0))?.DoIntactType &&
            (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("Interaction", 37, "[执行交互]保底幻象直接交互", [
                "EntityId",
                this.Entity.Id,
              ]),
            TsInteractionUtils_1.TsInteractionUtils.HandleInteractionOptionFromVision(
              t,
              this.kXi,
              i
            )));
    }
  }
  Ven(t) {
    t = t.Type;
    return !(!t || !t.Flow);
  }
  atn(t) {
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
    var t = this.kXi.GetOptionByInstanceId(0);
    TsInteractionUtils_1.TsInteractionUtils.HandleInteractionOptionNew(
      t,
      this.kXi
    );
  }
  Wen() {
    this.CanInteraction &&
      (this.Wte !== Protocol_1.Aki.Protocol.EEntityType.Npc ||
        (!this.GetInteractController()?.IsTurnRecoveryImmediately &&
          this.uen) ||
        (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Interaction", 37, "交互结束立即转回", [
            "EntityId",
            this.Entity.Id,
          ]),
        this.Entity.GetComponent(167)?.OnPlayerInteractEnd()),
      ModelManager_1.ModelManager.InteractionModel.InteractingEntity ===
        this.Entity.Id) &&
      (ModelManager_1.ModelManager.InteractionModel.InteractingEntity = void 0);
  }
  htn() {
    if (!this.len) return !1;
    if (!this.oen) return !1;
    if (this.ttn) return !1;
    this._en = !0;
    var i = this.kXi.GetAutoTriggerOption();
    if (i) {
      if ((this.nen.ForcePerceptionCheck(), !this.nen.IsInInteractRange))
        return !1;
      this.InteractPawn(-1, i);
    } else {
      let t = this.IsInSectorRange();
      t = t && !this.aen.GetSitDownState();
      i = this.kXi.GetInteractiveOption();
      1 === i?.CustomOptionType &&
        (EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnEnterOrExitExecutionRange,
          !0,
          this.Entity.Id
        ),
        (this.Qen = !0)),
        this.kXi.UpdateDirectOptions(!1),
        ModelManager_1.ModelManager.InteractionModel.HandleInteractionHint(
          t,
          this.Entity.Id,
          i,
          this.Fjo.PlayerDistSquared,
          this.kXi.InteractEntity
        );
    }
    return !0;
  }
  Een(t) {
    ModelManager_1.ModelManager.InteractionModel.CurrentInteractEntityId ===
      this.Entity.Id &&
      ModelManager_1.ModelManager.InteractionModel.SetInteractTarget(void 0),
      this.oen &&
        ((this.len = !1),
        this.yen &&
          ((this.yen = !1),
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
        this.kXi.ClearDirectOptions(),
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
    this.UPr(), this.nen.ForcePerceptionCheck(), this.pen();
  }
  Jen(t) {
    (this.$en ||
      ModelManager_1.ModelManager.LevelGeneralModel.InteractionDebug) &&
      ((this.$en = !1), Log_1.Log.CheckInfo()) &&
      Log_1.Log.Info(
        "Interaction",
        37,
        "Update提前返回",
        ["reason", t],
        ["entity", this.sen?.GetPbDataId()]
      );
  }
  OnTick(t) {
    this.fqi &&
      (this.Den && this.men?.ContainsTagById(248240472) && this.Aen(),
      this.pen());
  }
  pen() {
    if (ModelManager_1.ModelManager.InteractionModel.IsHideInteractHint)
      this.Jen("全局隐藏交互开启");
    else if (ModelManager_1.ModelManager.PlotModel.IsInInteraction)
      this.Jen("交互界面已打开");
    else if (this.sen?.IsConcealed) this.Jen("实体隐藏将不可交互");
    else if (PlotController_1.PlotController.IsEnableInteract())
      if (this.Fjo)
        if ((this.WGo || this.fen(), this.nen))
          if (this.nen.IsRefreshDistance)
            if (this.ven || (this.kXi && this.kXi.HasInteractOptions()))
              if (this.yen) this.Jen("当前正在执行交互");
              else {
                var t =
                  ModelManager_1.ModelManager.InteractionModel
                    .LockInteractionEntity === this.Entity.Id;
                if (this.nen.IsInInteractRange || t) {
                  if (!this.Yen() && !t)
                    return void (
                      !this.cen &&
                      this.uen &&
                      ((this.cen = !0), this.Een("不满足默认前置交互条件"))
                    );
                  (this.uen && !this.cen) ||
                    ((this.uen = !0),
                    (this._en = !1),
                    (this.len = this.otn()),
                    ModelManager_1.ModelManager.LevelGeneralModel
                      .InteractionDebug &&
                      Log_1.Log.CheckDebug() &&
                      Log_1.Log.Debug(
                        "Interaction",
                        7,
                        "[PawnInteractComponent.UpdateInteractComponent] 交互组件更新：初次进入交互范围",
                        ["IsInteractable:", this.len],
                        ["InteractionRange:", this.InteractRange]
                      ),
                    this.htn()),
                    (this.cen = !1),
                    this.uen && ((this.len = this.otn()), this.ltn()),
                    this.len && (this.$en = !0);
                } else
                  (this.$en = !0),
                    this.uen &&
                      ((this.uen = !1),
                      this.Een("离开交互范围"),
                      this.Ken &&
                        (EventSystem_1.EventSystem.Emit(
                          EventDefine_1.EEventName.OnEnterOrExitExecutionRange,
                          !1,
                          this.Entity.Id
                        ),
                        (this.Qen = !1),
                        (this.Ken = !1)),
                      this.Wte === Protocol_1.Aki.Protocol.EEntityType.Npc) &&
                      this.CanInteraction &&
                      (Log_1.Log.CheckDebug() &&
                        Log_1.Log.Debug("Interaction", 37, "退出交互范围转身", [
                          "EntityId",
                          this.Entity.Id,
                        ]),
                      this.Entity.GetComponent(167)?.OnPlayerInteractEnd()),
                    this.jen();
                this.ven && !this.nen.IsInInteractRange && (this.ven = !1);
              }
            else this.Jen("当前没有可交互的内容");
          else this.Jen("感知组件还未刷新过（自OnEnable以来）");
        else this.Jen("感知组件为空");
      else this.Jen("感知信息组件为空");
    else this.Jen("剧情控制器不允许交互");
  }
  ltn() {
    if (this.oen)
      if (this.oen.Entity?.IsInit)
        if (this.ttn) this.Jen("NPC处于被控状态");
        else if (this.len) {
          this.kXi.UpdateDirectOptions();
          var i = this.kXi.GetAutoTriggerOption();
          if (i)
            this.nen.ForcePerceptionCheck(),
              this.nen.IsInInteractRange && this.InteractPawn(-1, i);
          else {
            i = this.kXi.GetInteractiveOption();
            if ("Auto" !== i?.DoIntactType) {
              let t = this.IsInSectorRange();
              (t = t && !this.aen.GetSitDownState()),
                ModelManager_1.ModelManager.InteractionModel.HandleInteractionHint(
                  t,
                  this.Entity.Id,
                  i,
                  this.Fjo.PlayerDistSquared,
                  this.kXi.InteractEntity
                );
            }
          }
        } else
          ModelManager_1.ModelManager.InteractionModel.HandleInteractionHint(
            !1,
            this.Entity.Id
          );
      else this.Jen("OwnerActor 未初始化");
    else this.Jen("OwnerActor 为空");
  }
  IsInSectorRange() {
    return this.kXi.IsInSectorRange();
  }
  IsInPlayerInteractiveRange() {
    return this.kXi.IsInPlayerInteractiveRange();
  }
  IsMatchRoleOption() {
    return this.kXi.IsMatchRoleOption();
  }
  GetInteractPoint() {
    return this.kXi?.GetInteractPoint();
  }
  UPr() {
    (this.len = !1), (this._en = !1);
  }
  Hen() {
    PlotController_1.PlotController.TriggerInteraction(!this.Ien && !this.Den)
      ? ModelManager_1.ModelManager.InteractionModel.HandleInteractionHint(
          !1,
          this.Entity.Id
        )
      : this.jen();
  }
  UpdateInteractRange() {
    this.kXi &&
      this.nen &&
      this.nen.SetInteractRange(
        this.kXi.InteractRange,
        this.kXi.InteractExitRange
      );
  }
  get ttn() {
    return (
      !!this.den &&
      !this.yen &&
      (this.den.IsBeingImpacted || this.den.IsBeingAttacked)
    );
  }
  GetInteractController() {
    return this.kXi;
  }
  get DebugTimerRunning() {
    return this.fqi;
  }
  get DebugInteractOpened() {
    return this.CanInteraction;
  }
};
(PawnInteractNewComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(177)],
  PawnInteractNewComponent
)),
  (exports.PawnInteractNewComponent = PawnInteractNewComponent);
//# sourceMappingURL=PawnInteractNewComponent.js.map

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnopenedAreaPullback = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  Global_1 = require("../../Global"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  CharacterUnifiedStateTypes_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes"),
  SceneEffectStateManager_1 = require("../../Render/Effect/PostProcess/SceneEffectStateManager"),
  InputDistributeController_1 = require("../../Ui/InputDistribute/InputDistributeController"),
  UiManager_1 = require("../../Ui/UiManager"),
  DISTANCE_FACOR = 100,
  TOLERANCE_DISTANCE = 5,
  TELEPORT_DELAY_TIME = 2e4,
  END_DISTANCE = 250,
  TIPS_NAME = "NotOpenArea";
class UnopenedAreaPullback {
  constructor() {
    (this.pLe = "Input Limited Action"),
      (this.rBe = TOLERANCE_DISTANCE * DISTANCE_FACOR),
      (this.nBe = !1),
      (this.sBe = !1),
      (this.aBe = !1),
      (this.hBe = !1),
      (this.lBe = void 0),
      (this._Be = Vector_1.Vector.Create()),
      (this.uBe = Vector_1.Vector.Create()),
      (this.jye = Vector_1.Vector.Create()),
      (this.RTe = Vector_1.Vector.Create()),
      (this.Hte = void 0),
      (this.cBe = void 0),
      (this.mBe = void 0),
      (this.dBe = void 0),
      (this.xie = (t, e) => {
        this.hBe &&
          (this.CBe(t), this.sBe) &&
          (e?.Valid &&
            (e.Entity.GetComponent(161).StopMoveToLocation(), this.gBe(e, !1)),
          this.gBe(t, !0),
          this.fBe(t));
      });
  }
  Tick(t) {
    var e, i;
    this.hBe &&
      this.dBe?.Valid &&
      !ModelManager_1.ModelManager.TeleportModel.IsTeleport &&
      ((e = Vector_1.Vector.Dist2D(this._Be, this.Hte.ActorLocationProxy)),
      this.aBe &&
        ((i = MathUtils_1.MathUtils.SafeDivide(e, this.rBe)),
        (i = MathUtils_1.MathUtils.Clamp(i, 0, 1)),
        SceneEffectStateManager_1.default.SetSceneEffectState(0, i)),
      !this.sBe && e > this.rBe
        ? (this.pBe(), this.vBe())
        : this.sBe && e < END_DISTANCE && this.MBe() && this.SBe());
  }
  MBe() {
    return (
      !!ModelManager_1.ModelManager.MapModel.IsInMapPolygon(
        this.Hte.ActorLocationProxy
      ) ||
      (this.jye.DeepCopy(this.Hte.ActorLocationProxy),
      this.jye.Subtraction(this._Be, this.jye),
      (this.jye.Z = 0),
      this.RTe.DeepCopy(this.uBe),
      (this.RTe.Z = 0),
      this.RTe.DotProduct(this.jye) < 0)
    );
  }
  pBe() {
    var t =
      ControllerHolder_1.ControllerHolder.GenericPromptController.GetViewNameByPromptId(
        TIPS_NAME
      );
    t &&
      !UiManager_1.UiManager.IsViewOpen(t) &&
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
        TIPS_NAME
      );
  }
  vBe() {
    (this.sBe = !0),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Map", 43, "开始执行拉回移动操作,禁用玩家输入"),
      this.EBe(!0),
      this.yBe(!1),
      this.IBe(),
      this.fBe(this.dBe);
  }
  SBe() {
    (this.sBe = !1),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Map", 43, "退出拉回移动操作,恢复玩家控制"),
      this.EBe(!1),
      this.yBe(!0),
      this.TBe(this.dBe);
  }
  Clear() {
    return (
      EventSystem_1.EventSystem.Has(
        EventDefine_1.EEventName.OnChangeRole,
        this.xie
      ) &&
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.OnChangeRole,
          this.xie
        ),
      !0
    );
  }
  OnEnterUnopenedArea() {
    // this.hBe ||
    //   (EventSystem_1.EventSystem.Has(
    //     EventDefine_1.EEventName.OnChangeRole,
    //     this.xie
    //   ) ||
    //     EventSystem_1.EventSystem.Add(
    //       EventDefine_1.EEventName.OnChangeRole,
    //       this.xie
    //     ),
    //   (this.hBe = !0),
    //   (this.lBe = void 0),
    //   this.CBe(),
    //   this._Be.DeepCopy(
    //     ModelManager_1.ModelManager.MapModel.GetLastSafeLocation()
    //   ),
    //   this.LBe(!0),
    //   Log_1.Log.CheckInfo() &&
    //     Log_1.Log.Info("Map", 43, "--------进入了未开放区域--------", [
    //       "EnterLoc",
    //       this._Be,
    //     ]));
  }
  OnExitUnopenedArea() {
    this.hBe &&
      (EventSystem_1.EventSystem.Has(
        EventDefine_1.EEventName.OnChangeRole,
        this.xie
      ) &&
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.OnChangeRole,
          this.xie
        ),
      (this.hBe = !1),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Map", 43, "- - - - 离开了未开放区域- - - - "),
      this.LBe(!1),
      this.sBe) &&
      this.SBe();
  }
  fBe(t) {
    this.DBe(t);
    var t = t.Entity.GetComponent(161),
      e = { Index: 0, Position: this._Be };
    t.MoveAlongPath({
      Points: e,
      Navigation: !1,
      IsFly: !1,
      DebugMode: !0,
      Loop: !1,
      Callback: (t) => {
        this.sBe && this.SBe();
      },
      ReturnFalseWhenNavigationFailed: !1,
    });
  }
  DBe(t) {
    t.Entity?.CheckGetComponent(158)?.PositionState ===
      CharacterUnifiedStateTypes_1.ECharPositionState.Climb &&
      t.Entity?.GetComponent(31)?.ClimbPress(!0);
  }
  RBe() {
    // ModelManager_1.ModelManager.SceneTeamModel.IsAllDid() ||
    //   (this.sBe && this.SBe(),
    //   Log_1.Log.CheckInfo() &&
    //     Log_1.Log.Info("Map", 43, "在未开放区域待太久，开始传送"),
    //   this.UBe());
  }
  UBe() {
    // Net_1.Net.Call(14379, Protocol_1.Aki.Protocol.Mus.create(), (t) => {
    //   t.lkn !==
    //     Protocol_1.Aki.Protocol.lkn.Proto_ErrPlayerIsTeleportCanNotDoTeleport &&
    //     t.lkn !== Protocol_1.Aki.Protocol.lkn.Sys &&
    //     ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
    //       t.lkn,
    //       19586
    //     );
    // });
  }
  TBe(t) {
    var e = t.Entity.GetComponent(161),
      e = (e.StopMove(!1), e.MoveToLocationEnd(1), t.Entity.GetComponent(52));
    e.ClearMoveVectorCache(),
      e.SetActive(!0),
      this.gBe(t, !1),
      InputDistributeController_1.InputDistributeController.RefreshInputTag();
  }
  IBe() {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.ForceReleaseInput,
      this.pLe
    ),
      this.mBe.DirectionState ===
      CharacterUnifiedStateTypes_1.ECharDirectionState.AimDirection
        ? this.mBe.ExitAimStatus()
        : this.mBe.SetDirectionState(this.mBe.DirectionState),
      this.cBe &&
        this.cBe.CurrentSkill &&
        (this.cBe.EndOwnerAndFollowSkills(),
        this.ABe(this.dBe.Entity.GetComponent(36), 0, 0)),
      this.Hte.ClearInput();
    var t = this.dBe.Entity.GetComponent(52);
    t.ClearMoveVectorCache(),
      t.SetActive(!1),
      this.gBe(this.dBe, !0),
      InputDistributeController_1.InputDistributeController.RefreshInputTag();
  }
  CBe(t) {
    t && t.Valid
      ? (this.dBe = t)
      : (this.dBe = ModelManager_1.ModelManager.CreatureModel.GetEntityById(
          Global_1.Global.BaseCharacter.EntityId
        )),
      (this.Hte = this.dBe.Entity.GetComponent(3)),
      (this.cBe = this.dBe.Entity.GetComponent(33)),
      (this.mBe = this.dBe.Entity.GetComponent(158));
  }
  ABe(t, e, i) {
    var r = t.Entity.GetComponent(185);
    0 === e || r?.HasTag(-2100129479)
      ? t.CharacterMovement.SetMovementMode(1, i)
      : t.CharacterMovement.SetMovementMode(e, i);
  }
  yBe(t) {
    t &&
      this.nBe &&
      (ModelManager_1.ModelManager.BattleUiModel.ChildViewData.ShowBattleView(
        11
      ),
      (this.nBe = !1)),
      t ||
        this.nBe ||
        (ModelManager_1.ModelManager.BattleUiModel.ChildViewData.HideBattleView(
          11,
          [18]
        ),
        (this.nBe = !0));
  }
  LBe(t) {
    (this.aBe = t) ||
      SceneEffectStateManager_1.default.SetSceneEffectState(0, 0);
  }
  EBe(t) {
    t
      ? this.lBe ||
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Map", 43, "开启定时器传送", [
            "Time",
            TELEPORT_DELAY_TIME,
          ]),
        (this.lBe = TimerSystem_1.TimerSystem.Delay(() => {
          this.RBe(), (this.lBe = void 0);
        }, TELEPORT_DELAY_TIME)))
      : (this.lBe &&
          TimerSystem_1.TimerSystem.Has(this.lBe) &&
          (Log_1.Log.CheckInfo() && Log_1.Log.Info("Map", 43, "移除定时器传送"),
          TimerSystem_1.TimerSystem.Remove(this.lBe)),
        (this.lBe = void 0));
  }
  gBe(t, e) {
    var i;
    t &&
      t.Valid &&
      (e &&
        ((i = t.Entity.GetComponent(185))?.AddTag(-1697149502),
        i?.AddTag(-541178966),
        i?.AddTag(-542518289)),
      e ||
        ((i = t.Entity.GetComponent(185))?.RemoveTag(-1697149502),
        i?.RemoveTag(-541178966),
        i?.RemoveTag(-542518289)));
  }
  get GetInPullback() {
    return this.sBe;
  }
}
exports.UnopenedAreaPullback = UnopenedAreaPullback;
//# sourceMappingURL=UnopenedAreaPullback.js.map

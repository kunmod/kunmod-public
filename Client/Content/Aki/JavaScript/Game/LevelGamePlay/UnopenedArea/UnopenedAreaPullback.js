"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnopenedAreaPullback = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  NetDefine_1 = require("../../../Core/Define/Net/NetDefine"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  Global_1 = require("../../Global"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  CharacterUnifiedStateTypes_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes"),
  SceneEffectStateManager_1 = require("../../Render/Effect/PostProcess/SceneEffectStateManager"),
  InputDistributeController_1 = require("../../Ui/InputDistribute/InputDistributeController"),
  UiManager_1 = require("../../Ui/UiManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  DISTANCE_FACOR = 100,
  TOLERANCE_DISTANCE = 5,
  TELEPORT_DELAY_TIME = 2e4,
  END_DISTANCE = 250,
  TIPS_NAME = "NotOpenArea";
class UnopenedAreaPullback {
  constructor() {
    (this.xTe = "Input Limited Action"),
      (this._we = TOLERANCE_DISTANCE * DISTANCE_FACOR),
      (this.uwe = !1),
      (this.cwe = !1),
      (this.mwe = !1),
      (this.dwe = !1),
      (this.Cwe = void 0),
      (this.gwe = Vector_1.Vector.Create()),
      (this.fwe = Vector_1.Vector.Create()),
      (this.sye = Vector_1.Vector.Create()),
      (this.FIe = Vector_1.Vector.Create()),
      (this.fte = void 0),
      (this.pwe = void 0),
      (this.vwe = void 0),
      (this.Mwe = void 0),
      (this.sie = (t, e) => {
        this.dwe &&
          (this.Ewe(t), this.cwe) &&
          (e?.Valid &&
            (e.Entity.GetComponent(160).MoveToLocationLogic.StopMove(),
            this.Swe(e, !1)),
          this.Swe(t, !0),
          this.ywe(t));
      });
  }
  Tick(t) {
    var e, i;
    this.dwe &&
      this.Mwe?.Valid &&
      !ModelManager_1.ModelManager.TeleportModel.IsTeleport &&
      ((e = Vector_1.Vector.Dist2D(this.gwe, this.fte.ActorLocationProxy)),
      this.mwe &&
        ((i = MathUtils_1.MathUtils.SafeDivide(e, this._we)),
        (i = MathUtils_1.MathUtils.Clamp(i, 0, 1)),
        SceneEffectStateManager_1.default.SetSceneEffectState(0, i)),
      !this.cwe && e > this._we
        ? (this.Iwe(), this.Twe())
        : this.cwe && e < END_DISTANCE && this.Lwe() && this.Dwe());
  }
  Lwe() {
    return (
      !!ModelManager_1.ModelManager.MapModel.IsInMapPolygon(
        this.fte.ActorLocationProxy
      ) ||
      (this.sye.DeepCopy(this.fte.ActorLocationProxy),
      this.sye.Subtraction(this.gwe, this.sye),
      (this.sye.Z = 0),
      this.FIe.DeepCopy(this.fwe),
      (this.FIe.Z = 0),
      this.FIe.DotProduct(this.sye) < 0)
    );
  }
  Iwe() {
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
  Twe() {
    (this.cwe = !0),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Map", 43, "开始执行拉回移动操作,禁用玩家输入"),
      this.Rwe(!0),
      this.Uwe(!1),
      this.Awe(),
      this.ywe(this.Mwe);
  }
  Dwe() {
    (this.cwe = !1),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Map", 43, "退出拉回移动操作,恢复玩家控制"),
      this.Rwe(!1),
      this.Uwe(!0),
      this.xwe(this.Mwe);
  }
  Clear() {
    return (
      EventSystem_1.EventSystem.Has(
        EventDefine_1.EEventName.OnChangeRole,
        this.sie
      ) &&
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.OnChangeRole,
          this.sie
        ),
      !0
    );
  }
  OnEnterUnopenedArea() {
    // this.dwe ||
    //   (EventSystem_1.EventSystem.Has(
    //     EventDefine_1.EEventName.OnChangeRole,
    //     this.sie
    //   ) ||
    //     EventSystem_1.EventSystem.Add(
    //       EventDefine_1.EEventName.OnChangeRole,
    //       this.sie
    //     ),
    //   (this.dwe = !0),
    //   (this.Cwe = void 0),
    //   Log_1.Log.CheckInfo() &&
    //     Log_1.Log.Info("Map", 43, "--------进入了未开放区域--------"),
    //   this.Ewe(),
    //   this.gwe.DeepCopy(this.fte.ActorLocationProxy),
    //   this.Pwe(!0));
  }
  OnExitUnopenedArea() {
    this.dwe &&
      (EventSystem_1.EventSystem.Has(
        EventDefine_1.EEventName.OnChangeRole,
        this.sie
      ) &&
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.OnChangeRole,
          this.sie
        ),
      (this.dwe = !1),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Map", 43, "- - - - 离开了未开放区域- - - - "),
      this.Pwe(!1),
      this.cwe) &&
      this.Dwe();
  }
  ywe(t) {
    this.wwe(t);
    var t = t.Entity.GetComponent(160),
      e = { Index: 0, Position: this.gwe };
    t.MoveAlongPath({
      Points: e,
      Navigation: !1,
      IsFly: !1,
      DebugMode: !0,
      Loop: !1,
      Callback: (t) => {
        this.cwe && this.Dwe();
      },
      ReturnFalseWhenNavigationFailed: !1,
    });
  }
  wwe(t) {
    t.Entity?.CheckGetComponent(157)?.PositionState ===
      CharacterUnifiedStateTypes_1.ECharPositionState.Climb &&
      t.Entity?.GetComponent(31)?.ClimbPress(!0);
  }
  Bwe() {
    // ModelManager_1.ModelManager.FormationModel.IsAllDid() ||
    //   (this.cwe && this.Dwe(),
    //   Log_1.Log.CheckInfo() &&
    //     Log_1.Log.Info("Map", 43, "在未开放区域待太久，开始传送"),
    //   this.bwe());
  }
  bwe() {
    // Net_1.Net.Call(
    //   NetDefine_1.ERequestMessageId.UnOpenedAreaPullbackRequest,
    //   Protocol_1.Aki.Protocol.UnOpenedAreaPullbackRequest.create(),
    //   (t) => {
    //     t.ErrorCode !==
    //       Protocol_1.Aki.Protocol.ErrorCode
    //         .ErrPlayerIsTeleportCanNotDoTeleport &&
    //       t.ErrorCode !== Protocol_1.Aki.Protocol.ErrorCode.Success &&
    //       ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
    //         t.ErrorCode,
    //         NetDefine_1.EResponseMessageId.UnOpenedAreaPullbackResponse
    //       );
    //   }
    // );
  }
  xwe(t) {
    var e = t.Entity.GetComponent(160),
      e =
        (e.StopMove(!1),
        e.MoveToLocationLogic.MoveEnd(1),
        t.Entity.GetComponent(51));
    e.ClearMoveVectorCache(),
      e.SetActive(!0),
      this.Swe(t, !1),
      InputDistributeController_1.InputDistributeController.RefreshInputTag();
  }
  Awe() {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.ForceReleaseInput,
      this.xTe
    ),
      this.vwe.DirectionState ===
      CharacterUnifiedStateTypes_1.ECharDirectionState.AimDirection
        ? this.vwe.ExitAimStatus()
        : this.vwe.SetDirectionState(this.vwe.DirectionState),
      this.pwe &&
        this.pwe.CurrentSkill &&
        (this.pwe.EndOwnerAndFollowSkills(),
        this.qwe(this.Mwe.Entity.GetComponent(36), 0, 0)),
      this.fte.ClearInput();
    var t = this.Mwe.Entity.GetComponent(51);
    t.ClearMoveVectorCache(),
      t.SetActive(!1),
      this.Swe(this.Mwe, !0),
      InputDistributeController_1.InputDistributeController.RefreshInputTag();
  }
  Ewe(t) {
    t && t.Valid
      ? (this.Mwe = t)
      : (this.Mwe = ModelManager_1.ModelManager.CreatureModel.GetEntityById(
          Global_1.Global.BaseCharacter.EntityId
        )),
      (this.fte = this.Mwe.Entity.GetComponent(3)),
      (this.pwe = this.Mwe.Entity.GetComponent(33)),
      (this.vwe = this.Mwe.Entity.GetComponent(157));
  }
  qwe(t, e, i) {
    var r = t.Entity.GetComponent(184);
    0 === e || r?.ContainsTagById(-2100129479)
      ? t.CharacterMovement.SetMovementMode(1, i)
      : t.CharacterMovement.SetMovementMode(e, i);
  }
  Uwe(t) {
    t &&
      this.uwe &&
      (ModelManager_1.ModelManager.BattleUiModel.ChildViewData.ShowBattleView(
        11
      ),
      (this.uwe = !1)),
      t ||
        this.uwe ||
        (ModelManager_1.ModelManager.BattleUiModel.ChildViewData.HideBattleView(
          11,
          [18]
        ),
        (this.uwe = !0));
  }
  Pwe(t) {
    (this.mwe = t) ||
      SceneEffectStateManager_1.default.SetSceneEffectState(0, 0);
  }
  Rwe(t) {
    t
      ? this.Cwe ||
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Map", 43, "开启定时器传送", [
            "Time",
            TELEPORT_DELAY_TIME,
          ]),
        (this.Cwe = TimerSystem_1.TimerSystem.Delay(() => {
          this.Bwe(), (this.Cwe = void 0);
        }, TELEPORT_DELAY_TIME)))
      : (this.Cwe &&
          TimerSystem_1.TimerSystem.Has(this.Cwe) &&
          (Log_1.Log.CheckInfo() && Log_1.Log.Info("Map", 43, "移除定时器传送"),
          TimerSystem_1.TimerSystem.Remove(this.Cwe)),
        (this.Cwe = void 0));
  }
  Swe(t, e) {
    var i;
    t &&
      t.Valid &&
      (e &&
        ((i = t.Entity.GetComponent(184))?.AddTagById(-1697149502),
        i?.AddTagById(-541178966),
        i?.AddTagById(-542518289)),
      e ||
        ((i = t.Entity.GetComponent(184))?.RemoveTagById(-1697149502),
        i?.RemoveTagById(-541178966),
        i?.RemoveTagById(-542518289)));
  }
  get GetInPullback() {
    return this.cwe;
  }
}
exports.UnopenedAreaPullback = UnopenedAreaPullback;
//# sourceMappingURL=UnopenedAreaPullback.js.map

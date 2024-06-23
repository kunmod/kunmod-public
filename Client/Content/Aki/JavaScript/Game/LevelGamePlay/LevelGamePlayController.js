"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelGamePlayController = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../Core/Common/Log"),
  Time_1 = require("../../Core/Common/Time"),
  NetDefine_1 = require("../../Core/Define/Net/NetDefine"),
  Protocol_1 = require("../../Core/Define/Net/Protocol"),
  EntitySystem_1 = require("../../Core/Entity/EntitySystem"),
  ControllerBase_1 = require("../../Core/Framework/ControllerBase"),
  Net_1 = require("../../Core/Net/Net"),
  MathUtils_1 = require("../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../Common/Event/EventDefine"),
  EventSystem_1 = require("../Common/Event/EventSystem"),
  Global_1 = require("../Global"),
  ConfigManager_1 = require("../Manager/ConfigManager"),
  ControllerHolder_1 = require("../Manager/ControllerHolder"),
  ModelManager_1 = require("../Manager/ModelManager"),
  CombatMessage_1 = require("../Module/CombatMessage/CombatMessage"),
  EntityHandle_1 = require("../NewWorld/Character/EntityHandle"),
  SceneInteractionManager_1 = require("../Render/Scene/Interaction/SceneInteractionManager"),
  SHOW_FAKE_ERROR_CODE_TIPS_INTERVAL = 1e3;
class LevelGamePlayController extends ControllerBase_1.ControllerBase {
  static HandleScanResponse(e) {
    return !(
      !e ||
      !UE.KuroStaticLibrary.IsImplementInterface(
        e.GetClass(),
        UE.BPI_CreatureInterface_C.StaticClass()
      ) ||
      ((e = e), !(e = EntitySystem_1.EntitySystem.Get(e.GetEntityId()))) ||
      (e.GetComponent(70)?.StartProcess(),
      e.GetComponent(58)?.ShowScanEffect(),
      0)
    );
  }
  static HandleClearAllScanEffect() {}
  static MultiplayerLimitTypeCheck(e, t = !0) {
    if (!ModelManager_1.ModelManager.GameModeModel.IsMulti) return !0;
    switch (e) {
      case 2:
        return t && LevelGamePlayController.ShowFakeErrorCodeTips(), !1;
      case 0:
        var r =
          ModelManager_1.ModelManager.PlayerInfoModel.GetId() ===
          ModelManager_1.ModelManager.CreatureModel.GetWorldOwner();
        return !r && t && LevelGamePlayController.ShowFakeErrorCodeTips(), r;
      case 1:
        return !0;
      default:
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Level",
              7,
              "[MultiplayerCommonCheck] 不支持的联机限制类型"
            ),
          !1
        );
    }
  }
  static ShowFakeErrorCodeTips() {
    var e;
    Time_1.Time.Now - this.pRe < SHOW_FAKE_ERROR_CODE_TIPS_INTERVAL ||
      ((this.pRe = Time_1.Time.Now),
      (e =
        ConfigManager_1.ConfigManager.ErrorCodeConfig.GetTextByErrorId(600064)),
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByItsType(
        9,
        void 0,
        void 0,
        [e]
      ));
  }
  static OnInit() {
    return (
      Net_1.Net.Register(
        NetDefine_1.ENotifyMessageId.EntityCommonTagNotify,
        LevelGamePlayController.vRe
      ),
      Net_1.Net.Register(
        NetDefine_1.ENotifyMessageId.ThrowDamageNotify,
        LevelGamePlayController.MRe
      ),
      Net_1.Net.Register(
        NetDefine_1.ENotifyMessageId.SneakGameStateNotify,
        LevelGamePlayController.ERe
      ),
      Net_1.Net.Register(
        NetDefine_1.ENotifyMessageId.EntityPosResetNotify,
        LevelGamePlayController.SRe
      ),
      Net_1.Net.Register(
        NetDefine_1.ENotifyMessageId.EntityTriggerCountNotify,
        LevelGamePlayController.yRe
      ),
      Net_1.Net.Register(
        NetDefine_1.ENotifyMessageId.EntityTriggerOnlineNotify,
        LevelGamePlayController.IRe
      ),
      Net_1.Net.Register(
        NetDefine_1.ENotifyMessageId.ElevatorMoveNotify,
        LevelGamePlayController.TRe
      ),
      Net_1.Net.Register(
        NetDefine_1.ENotifyMessageId.EnableNearbyTrackingNotify,
        (e) => {
          this.OnEnableNearbyTrackingNotify(e);
        }
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnSceneItemVisionCaptureAdd,
        this.LRe
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnSceneItemVisionCaptureRemove,
        this.DRe
      ),
      (this.RRe = new Map()),
      !0
    );
  }
  static OnClear() {
    return (
      Net_1.Net.UnRegister(NetDefine_1.ENotifyMessageId.EntityCommonTagNotify),
      Net_1.Net.UnRegister(NetDefine_1.ENotifyMessageId.ThrowDamageNotify),
      Net_1.Net.UnRegister(NetDefine_1.ENotifyMessageId.SneakGameStateNotify),
      Net_1.Net.UnRegister(NetDefine_1.ENotifyMessageId.EntityPosResetNotify),
      Net_1.Net.UnRegister(
        NetDefine_1.ENotifyMessageId.EntityTriggerCountNotify
      ),
      Net_1.Net.UnRegister(NetDefine_1.ENotifyMessageId.ElevatorMoveNotify),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnSceneItemVisionCaptureAdd,
        this.LRe
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnSceneItemVisionCaptureRemove,
        this.DRe
      ),
      !(this.RRe = void 0)
    );
  }
  static ThrowDamageChangeRequest(e, t) {
    var r = Protocol_1.Aki.Protocol.ThrowDamageRequest.create();
    (r.EntityId = MathUtils_1.MathUtils.NumberToLong(
      ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(e)
    )),
      (r.CalculateId = MathUtils_1.MathUtils.BigIntToLong(t)),
      Net_1.Net.Call(
        NetDefine_1.ERequestMessageId.ThrowDamageRequest,
        r,
        (e) => {
          switch (e.ErrorCode) {
            case Protocol_1.Aki.Protocol.ErrorCode.Success:
            case Protocol_1.Aki.Protocol.ErrorCode.ErrThrowDamageEntityNotExit:
            case Protocol_1.Aki.Protocol.ErrorCode
              .ErrThrowDamageReqEntityIsAlreadyDead:
              break;
            default:
              ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.ErrorCode,
                NetDefine_1.EResponseMessageId.BeControlledThrowResponse
              );
          }
        }
      );
  }
  static ManipulatableBeCastOrDrop2Server(e, t) {
    var r = Protocol_1.Aki.Protocol.BeControlledThrowRequest.create();
    (r.EntityId = MathUtils_1.MathUtils.NumberToLong(
      ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(e)
    )),
      (r.ThrowType = t ? 1 : 2),
      Net_1.Net.Call(
        NetDefine_1.ERequestMessageId.BeControlledThrowRequest,
        r,
        (e) => {
          switch (e.ErrorCode) {
            case Protocol_1.Aki.Protocol.ErrorCode.Success:
            case Protocol_1.Aki.Protocol.ErrorCode
              .ErrBeControlledEntityNotExist:
              break;
            default:
              ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.ErrorCode,
                NetDefine_1.EResponseMessageId.BeControlledThrowResponse
              );
          }
        }
      );
  }
  //fix OpenTreasureBox
  static async GetRewardTreasureBoxRequest(e) {
    if (this.RRe?.get(e)) return !1;
    this.RRe.set(e, !0);
    var t = Protocol_1.Aki.Protocol.GetRewardTreasureBoxRequest.create(),
      t =
        ((t.EntityId = MathUtils_1.MathUtils.NumberToLong(
          ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(e)
        )),
        await Net_1.Net.CallAsync(
          NetDefine_1.ERequestMessageId.GetRewardTreasureBoxRequest,
          t
        ));
    this.RRe.delete(e);
    if (t) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OpenTreasureBox);
        return !0;
    }
    return !1;
}
// static async GetRewardTreasureBoxRequest(e) {
//   if (this.RRe?.get(e)) return !1;
//   this.RRe.set(e, !0);
//   var t = Protocol_1.Aki.Protocol.GetRewardTreasureBoxRequest.create(),
//     t =
//       ((t.EntityId = MathUtils_1.MathUtils.NumberToLong(
//         ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(e)
//       )),
//       await Net_1.Net.CallAsync(
//         NetDefine_1.ERequestMessageId.GetRewardTreasureBoxRequest,
//         t
//       ));
//   return (
//     this.RRe.delete(e),
//     !!t &&
//       (t.ErrorCode !== Protocol_1.Aki.Protocol.ErrorCode.Success
//         ? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
//             t.ErrorCode,
//             NetDefine_1.EResponseMessageId.GetRewardTreasureBoxResponse
//           ),
//           !1)
//         : (EventSystem_1.EventSystem.Emit(
//             EventDefine_1.EEventName.OpenTreasureBox
//           ),
//           !0))
//   );
// }

  static ElevatorStateChangeRequest(e, t, r, a) {
    var o = Protocol_1.Aki.Protocol.ElevatorStateChangeRequest.create();
    (o.EntityId = MathUtils_1.MathUtils.NumberToLong(
      ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(e)
    )),
      (o.TagState = t),
      (o.State = r),
      Net_1.Net.Call(
        NetDefine_1.ERequestMessageId.ElevatorStateChangeRequest,
        o,
        (e) => {
          if ((a(), e))
            switch (e.ErrorCode) {
              case Protocol_1.Aki.Protocol.ErrorCode.Success:
              case Protocol_1.Aki.Protocol.ErrorCode.ErrElevatorLocked:
                break;
              default:
                ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                  e.ErrorCode,
                  NetDefine_1.EResponseMessageId.ElevatorStateChangeResponse
                );
            }
        }
      );
  }
  static OnManipulatableItemExitAreaInternal(t, r = 0, a = !1) {
    if (t) {
      let e = void 0;
      var o,
        l,
        n,
        i = (e =
          t instanceof EntityHandle_1.EntityHandle ? t.Entity : t).GetComponent(
          181
        );
      i.IsMoveAutonomousProxy &&
        ((n = new UE.Transform()),
        (o = (0, puerts_1.$ref)(void 0)),
        (l = (0, puerts_1.$ref)(void 0)),
        SceneInteractionManager_1.SceneInteractionManager.Get()
          .GetMainCollisionActor(i.GetSceneInteractionLevelHandleId())
          .GetActorBounds(!1, o, l),
        n.SetLocation((0, puerts_1.$unref)(o)),
        (i = e.GetComponent(139)),
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
          "ResetPositionTip"
        ),
        i
          ? (l = Global_1.Global.BaseCharacter) &&
            ((n = l.CharacterActorComponent.Entity.GetComponent(54)),
            a
              ? i.ResetItemLocationAndRotation(r, !0)
              : i.ResetItemLocationAndRotation(),
            t.Id === n.GetHoldingEntity()?.Id) &&
            n.StopManipualte()
          : Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Character",
              32,
              "[Manipulate] 服务器返回的Entity没有SceneItemManipulatableComponent"
            ));
    } else
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Character",
          32,
          "[Manipulate] 服务器返回的Id找不到对应的Entity"
        );
  }
  static EntityTriggerConditionRequest(e, t, r, a) {
    var o = Protocol_1.Aki.Protocol.EntityTriggerConditionRequest.create();
    (o.EntityId = MathUtils_1.MathUtils.NumberToLong(e)),
      (o.TriggeringEntityId = MathUtils_1.MathUtils.NumberToLong(t)),
      (o.TriggerType = r),
      Net_1.Net.Call(
        NetDefine_1.ERequestMessageId.EntityTriggerConditionRequest,
        o,
        a
      );
  }
  static EntityTriggerOnlineRequest(e, t, r, a) {
    var o;
    ModelManager_1.ModelManager.GameModeModel.IsMulti &&
      (((o =
        Protocol_1.Aki.Protocol.EntityTriggerOnlineRequest.create()).EntityId =
        MathUtils_1.MathUtils.NumberToLong(e)),
      (o.TriggeringEntityId = MathUtils_1.MathUtils.NumberToLong(t)),
      (o.TriggerType = r),
      Net_1.Net.Call(
        NetDefine_1.ERequestMessageId.EntityTriggerOnlineRequest,
        o,
        a
      ));
  }
  //实体跟随追踪
  static EntityFollowTrackRequest(e, t) {
    var r = Protocol_1.Aki.Protocol.FollowTrackRequest.create();
    (r.EntityId = MathUtils_1.MathUtils.NumberToLong(e)),
      Net_1.Net.Call(NetDefine_1.ERequestMessageId.FollowTrackRequest, r, t);
  }
  static EntityBuffProducerRequest(e, t) {
    var r = Protocol_1.Aki.Protocol.EntityBuffProducerRequest.create();
    (r.BuffConsumerId = MathUtils_1.MathUtils.NumberToLong(e)),
      Net_1.Net.Call(
        NetDefine_1.ERequestMessageId.EntityBuffProducerRequest,
        r,
        t
      );
  }
  //解密攻击后状态改变请求
  static ShootTargetHitGearStateChangeRequest(e, t) { 
    var r = Protocol_1.Aki.Protocol.TargetGearHitRequest.create();
    (r.EntityId = MathUtils_1.MathUtils.NumberToLong(
      ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(e)
    )),
      Net_1.Net.Call(NetDefine_1.ERequestMessageId.TargetGearHitRequest, r, t);
      puerts_1.logger.warn("kundebug:HitGearStateChangeRequest:执行结束",e)
  }
  static OnEnableNearbyTrackingNotify(e) {
    var t = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
    if (t === e.InstanceId)
      for (const a of e.EntityConfigId) {
        var r =
          ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(a);
        r && (r = r.Entity.GetComponent(143)) && (r.EnableTracking = !1);
      }
  }
  //实体吸附请求
  static EntityAdsorbRequest(e, t) {
    var r = Protocol_1.Aki.Protocol.EntityAdsorbRequest.create();
    (r.EntityId = e),
      Net_1.Net.Call(NetDefine_1.ERequestMessageId.EntityAdsorbRequest, r, t);
  }
  //坐下
  static RequestChairSit(e, t, r) {
    var a = Protocol_1.Aki.Protocol.SitChairRequest.create(),
      e =
        ((a.EntityId = MathUtils_1.MathUtils.NumberToLong(e)),
        (a.IsSitDown = t),
        Global_1.Global.BaseCharacter?.CharacterActorComponent.Entity.GetComponent(
          0
        ).GetCreatureDataId());
    e && (a.Data = CombatMessage_1.CombatNet.CreateCombatCommon(e)),
      (a.Request = r),
      Net_1.Net.Call(NetDefine_1.ERequestMessageId.SitChairRequest, a, (e) => {
        Global_1.Global.BaseCharacter.CharacterActorComponent?.Entity.GetComponent(
          26
        )?.OnResponseSit(t, e.ErrorCode);
      });
  }
}
((exports.LevelGamePlayController = LevelGamePlayController).RRe = void 0),
  (LevelGamePlayController.pRe = 0),
  (LevelGamePlayController.ERe = (e) => {}),
  (LevelGamePlayController.MRe = (e) => {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "World",
        18,
        "服务端通知耐久度变化",
        ["CreatureDataId", e.EntityId],
        ["耐久度", e.Durability]
      );
    var t,
      r,
      a = ModelManager_1.ModelManager.CreatureModel.GetEntity(
        MathUtils_1.MathUtils.LongToNumber(e.EntityId)
      );
    a?.Valid &&
      ((t = a.Entity.GetComponent(0)),
      (e = e.Durability),
      (r = t.GetDurabilityValue()),
      t.SetDurabilityValue(e),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnAnySceneItemDurabilityChange,
        a,
        e,
        r
      ));
  }),
  (LevelGamePlayController.vRe = (e) => {
    var t = MathUtils_1.MathUtils.LongToNumber(e.Id),
      t = ModelManager_1.ModelManager.CreatureModel.GetEntity(t);
    t &&
      (t.Entity.GetComponent(0).UpdateEntityCommonTags(e.Tags),
      t.Entity.GetComponent(176).SyncTagsFromServer(e.Tags));
  }),
  (LevelGamePlayController.TRe = (e) => {
    var t = MathUtils_1.MathUtils.LongToNumber(e.EntityId),
      t = ModelManager_1.ModelManager.CreatureModel.GetEntity(t);
    t
      ? (t = t.Entity.GetComponent(122)) && t.SetTargetFloor(e.Location)
      : Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("SceneItem", 36, "OnElevatorMoveNotify No Entity", [
          "id",
          e.EntityId,
        ]);
  }),
  (LevelGamePlayController.SRe = (e) => {
    e = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
      e.EntityId
    );
    LevelGamePlayController.OnManipulatableItemExitAreaInternal(e);
  }),
  (LevelGamePlayController.yRe = (e) => {
    var t = ModelManager_1.ModelManager.CreatureModel.GetEntity(
      MathUtils_1.MathUtils.LongToNumber(e.EntityId)
    );
    t
      ? (t = t.Entity.GetComponent(74))
        ? t.UpdateTriggerCount(e.EntityTriggerCount, e.TriggerType)
        : Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "TriggerVolume",
            30,
            "[Trigger] 服务器返回的Entity没有TriggerComponent"
          )
      : Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "TriggerVolume",
          30,
          "[Trigger] 服务器返回的Id找不到对应的Entity"
        );
  }),
  (LevelGamePlayController.IRe = (e) => {
    var t,
      r = ModelManager_1.ModelManager.CreatureModel.GetEntity(
        MathUtils_1.MathUtils.LongToNumber(e.EntityId)
      );
    r &&
      ((t = r.Entity.GetComponent(74)),
      (r = r.Entity.GetComponent(73)),
      t && t.UpdateTriggerCount(e.EntityTriggerCount, e.TriggerType),
      r) &&
      r.UpdateOtherPlayerCount(
        e.TriggerEntities.length,
        MathUtils_1.MathUtils.LongToNumber(e.TriggeringEntityId)
      );
  }),
  (LevelGamePlayController.LRe = (e, t) => {
    ModelManager_1.ModelManager.VisionCaptureModel?.AddVisionCapture(e, t);
  }),
  (LevelGamePlayController.DRe = (e) => {
    ModelManager_1.ModelManager.VisionCaptureModel?.RemoveVisionCapture(e);
  });
//# sourceMappingURL=LevelGamePlayController.js.map

"use strict";

const { EntityManager } = require("../../Manager/ModFuncs/EntityManager");

Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InteractionModel = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
  EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  IAction_1 = require("../../../UniverseEditor/Interface/IAction"),
  IGlobal_1 = require("../../../UniverseEditor/Interface/IGlobal"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  LocalStorage_1 = require("../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../Common/LocalStorageDefine"),
  PublicUtil_1 = require("../../Common/PublicUtil"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  EntityManager_1 = require("../../Manager/ModFuncs/EntityManager"),
  ModManager_1 = require("../../Manager/ModManager"),
  InputDistributeController_1 = require("../../Ui/InputDistribute/InputDistributeController"),
  TsInteractionUtils_1 = require("./TsInteractionUtils"),
  DEFAULT_CD = 0.5;

const { AutoInteraction } = require("../../Manager/ModFuncs/AutoInteraction");

class SameTipInteract {
  constructor() {
    (this.EntityId = 0), (this.CurrentDistance = 0);
  }
}
class InteractionModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.Whi = void 0),
      (this.Khi = !1),
      (this.Qhi = void 0),
      (this.$hi = void 0),
      (this.Xhi = 0),
      (this.Yhi = !1),
      (this.Jhi = new Array()),
      (this.zhi = new Array()),
      (this.Zhi = new Map()),
      (this.eli = 0),
      (this.tli = 0),
      (this.IsInteractionTurning = !1),
      (this.LockInteractionEntity = void 0),
      (this.InteractingEntity = void 0),
      (this.IsTriggerMobileGuide = !1),
      (this.IsTriggerDesktopGuide = !1),
      (this.AutoLongPressTime = 0),//长按时间
      (this.ActiveInteractGuideCount = 0),//活动交互指南计数
      (this.ShowLongPressTime = 0),//显示长按时间
      (this.AutoInteractionGuideCount = 0),//自动交互指南计数
      (this.AutoInteractionGuideAppearCount = 0),//自动交互指南显示计数
      (this.ili = 0);
  }
  OnInit() {
    return (
      (this.AutoLongPressTime =
        CommonParamById_1.configCommonParamById.GetIntConfig(
          "AutoLongPressTime"
        )),
        (puerts_1.logger.warn("[kundebug]:AutoLongPressTime:",this.AutoLongPressTime)),
      (this.ActiveInteractGuideCount =
        CommonParamById_1.configCommonParamById.GetIntConfig(
          "ActiveInteractGuideCount"
        )),
      (this.ShowLongPressTime =
        CommonParamById_1.configCommonParamById.GetIntConfig(
          "ShowLongPressTime"
        )),
        (puerts_1.logger.warn("[kundebug]:ShowLongPressTime:",this.ShowLongPressTime)),
      (this.AutoInteractionGuideCount =
        CommonParamById_1.configCommonParamById.GetIntConfig(
          "AutoInteractionGuideCount"
        )),
        (puerts_1.logger.warn("[kundebug]:AutoInteractionGuideCount:",this.AutoInteractionGuideCount)),
      TsInteractionUtils_1.TsInteractionUtils.Init(),
      !0
    );
  }
  OnClear() {
    return (
      this.Whi?.clear(),
      (this.Qhi = void 0),
      (this.$hi = void 0),
      (this.Jhi.length = 0),
      (this.zhi.length = 0),
      this.Zhi?.clear(),
      TsInteractionUtils_1.TsInteractionUtils.Clear(),
      !0
    );
  }
  OnLeaveLevel() {
    return (
      TsInteractionUtils_1.TsInteractionUtils.ClearCurrentOpenViewName(), !0
    );
  }
  LoadInteractGuideData() {
    (this.IsTriggerMobileGuide =
      LocalStorage_1.LocalStorage.GetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.IsTriggerMobileGuide,
        !1
      ) ?? !1),
      (this.IsTriggerDesktopGuide =
        LocalStorage_1.LocalStorage.GetPlayer(
          LocalStorageDefine_1.ELocalStoragePlayerKey.IsTriggerDesktopGuide,
          !1
        ) ?? !1);
  }
  LoadAutoInteractionGuideAppearCount() {//加载自动交互指南显示计数
    this.AutoInteractionGuideAppearCount =
      LocalStorage_1.LocalStorage.GetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey
          .AutoInteractionGuideAppearCount,
        0
      ) ?? 0;
  }
  SaveTriggerMobileGuide(t) {
    (this.IsTriggerMobileGuide = t),
      LocalStorage_1.LocalStorage.SetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.IsTriggerMobileGuide,
        t
      );
  }
  SaveTriggerDesktopGuide(t) {//保存触发器pc
    (this.IsTriggerDesktopGuide = t),
      LocalStorage_1.LocalStorage.SetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.IsTriggerDesktopGuide,
        t
      );
  }
  SaveAutoInteractionGuideAppearCount(t) {//保存自动交互指南显示计数
    (this.AutoInteractionGuideAppearCount = t),
      LocalStorage_1.LocalStorage.SetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey
          .AutoInteractionGuideAppearCount,
        t
      );
  }
  IsInShowAutoInteractionGuideCountLimit() {//自动交互指南计数限制
    return (
      this.AutoInteractionGuideAppearCount < this.AutoInteractionGuideCount
    );
  }
  rli() {
    (this.Qhi =
      TsInteractionUtils_1.TsInteractionUtils.GetInteractionConfig(
        "Common_Exit"
      )),
      !this.Qhi || this.Qhi.交互选项组.Num() <= 0
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Interaction",
            18,
            "获取交互默认退出选项失败，请检查配置InteractionConfig是否有Common_Exit"
          )
        : (this.$hi = this.Qhi.交互选项组.Get(0));
  }
  GetInteractEntitiesCount() {//获取交互数量
    let t = 0;
    for (const e of this.zhi)
      e
        ? (t +=
            1 < e.DirectOptionInstanceIds.length
              ? e.DirectOptionInstanceIds.length
              : 1)
        : t++;
    return t;
  }
  GetInteractEntityByIndex(t) {//获取交互实体
    let e = 0;
    for (const i of this.zhi)
      if (
        (i && 1 < i.DirectOptionInstanceIds.length
          ? (e += i.DirectOptionInstanceIds.length)
          : e++,
        e > t)
      )
        return i.EntityId;
    return -1;
  }
  RefreshInteractEntities(e) {//刷新交互实体
    let t = 0;
    for (const n of this.zhi)
      if (n) {
        var i = n.GetEntity();
        if (i?.Valid) {
          var r = n.DirectOptionInstanceIds.length;
          if (r <= 0) e.push(i), this.CanAutoPickUp(i) && t++;
          else {
            this.CanAutoPickUp(i) && (t += r);
            for (let t = 0; t < r; t++) e.push(i);
          }
        }
      }
    return (
      (this.ili = e.length),
      e.sort((t, e) => {
        (t = t.GetComponent(177)),
          (e = e.GetComponent(177)),
          (t = t.GetInteractController().InteractEntity.Priority);
        return e.GetInteractController().InteractEntity.Priority - t;
      }),
      t
    );
  }
  GetInteractItemCount() {//获取交互项目计数
    return this.ili;
  }
  CanAutoPickUp(t) {
    var e;
    e = t.GetComponent(177);
    return (
      !!t?.Valid &&
      !(
        !(e = t.GetComponent(177))?.IsPawnInteractive() ||
        (!t.GetComponent(102)?.IsDropItem() &&
          !e.IsCollection() &&
          (!e.IsAnimationItem() ||
            !(e = t.GetComponent(0))?.Valid ||
            !(t = e.GetPbEntityInitData()) ||
            !(e = t.ComponentsData) ||
            e.CollectComponent.Disabled))
      )
    );
  }
  GetOptionInstanceIdByIndex(t) {
    let e = t;
    for (const i of this.zhi)
      if (i && 0 < i.DirectOptionInstanceIds.length) {
        if (e < i.DirectOptionInstanceIds.length)
          return i.DirectOptionInstanceIds[e];
        e -= i.DirectOptionInstanceIds.length;
      } else e--;
    return -1;
  }
  GetOptionNameByIndex(t) {
    let e = t;
    for (const i of this.zhi)
      if (i && !i.IsAdvice && 0 < i.DirectOptionInstanceIds.length) {
        if (e < i.DirectOptionNames.length) return i.DirectOptionNames[e];
        e -= i.DirectOptionNames.length;
      } else e--;
  }
  GetCommonExitOption() {
    return this.$hi || this.rli(), this.$hi;
  }
  EnterInteractCd(t = DEFAULT_CD) {
    //this.Xhi = TimeUtil_1.TimeUtil.GetServerTime() + t;
  }
  InInteractCd() {
    return false;
    return this.Xhi > TimeUtil_1.TimeUtil.GetServerTime();
  }
  InteractPawn(Entity) { // new func
    const Component = Entity.GetComponent(103);
    const Opt = ModelManager_1.ModelManager.InteractionModel.GetOptionInstanceIdByIndex(0);
    Component.ntn(Opt)
    return;
  }
  HandleInteractionHint(t, e, i = void 0, r = -1, n = void 0) {
    if (n) { // auto interact
      const Entity = n.GetEntity();
      const BlueprintType = EntityManager_1.EntityManager.GetBlueprintType3(Entity);
      if (BlueprintType.startsWith("Collect") && ModManager_1.ModManager.Settings.AutoLoot) {
          return this.InteractPawn(Entity);
      }
      if (BlueprintType.startsWith("Treasure") && ModManager_1.ModManager.Settings.AutoPickTreasure) {
          return this.InteractPawn(Entity);
      }
      if (BlueprintType.startsWith("Teleport") && ModManager_1.ModManager.Settings.AutoTeleport) {
          return this.InteractPawn(Entity);
      }
      if (BlueprintType.startsWith("Vision") && ModManager_1.ModManager.Settings.AutoAbsorbnew) {
          return this.InteractPawn(Entity);
      }
    }

    if (t) {
      let t = !1;
      if ((t = !i || this.oli(e, i, r))) {
        if (t) {
          if (this.Jhi.includes(e)) {
            if (
              TsInteractionUtils_1.TsInteractionUtils.IsInteractHintViewOpened()
            )
              return;
          } else {
            this.Jhi.push(e);
            this.zhi.push(n);
            TsInteractionUtils_1.TsInteractionUtils.IsInteractHintViewOpened()
              ? 0 < this.Jhi.length &&
                TsInteractionUtils_1.TsInteractionUtils.UpdateInteractHintView()
              : TsInteractionUtils_1.TsInteractionUtils.OpenInteractHintView().finally(
                  void 0
                );
          }
        }
      } else
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Interaction",
            37,
            "[交互界面提前返回] bAllowPush为false"
          );
    } else {
      t = this.Jhi.indexOf(e);
      -1 < t &&
        (this.Jhi.splice(t, 1),
        this.zhi.splice(t, 1));
        0 < this.Jhi.length
          ? TsInteractionUtils_1.TsInteractionUtils.UpdateInteractHintView()
          : TsInteractionUtils_1.TsInteractionUtils.CloseInteractHintView()
    }
  }
  oli(t, e = void 0, i = -1) {
    let r = !1;
    if (1 === e.CustomOptionType) return !1;
    if (!e.IsUniqueness) return !0;
    if (e.UniequenessType === IAction_1.EInteractUniqueness.Closest) {
      if ("" === e.TidContent || -1 === i) return !0;
      var n,
        o = this.Zhi.get(e.TidContent);
      if (!o)
        return (
          ((n = new SameTipInteract()).EntityId = t),
          (n.CurrentDistance = i),
          this.Zhi.set(e.TidContent, n),
          !0
        );
      this.Jhi.includes(o.EntityId)
        ? o.CurrentDistance > i && t !== o.EntityId
          ? ((r = !0),
            -1 < (e = this.Jhi.indexOf(o.EntityId)) &&
              (this.Jhi.splice(e, 1), this.zhi.splice(e, 1)),
            (o.EntityId = t),
            (o.CurrentDistance = i))
          : t === o.EntityId && (o.CurrentDistance = i)
        : ((r = !0), (o.EntityId = t), (o.CurrentDistance = i));
    } else r = !0;
    return r;
  }
  AddInteractOption(t, e, i, r) {
    t = this.GetInteractController(t);
    return t
      ? (e = this.GetDynamicConfig(e))
        ? t.AddDynamicInteractOption(e, i, r)
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Interaction",
              19,
              "交互选项配置丢失，请确认前后端配置是否一致"
            ),
          -1)
      : -1;
  }
  RemoveInteractOption(t, e) {
    t = this.GetInteractController(t);
    return !!t && t.RemoveDynamicInteractOption(e);
  }
  ChangeOptionText(t, e, i) {
    t = this.GetInteractController(t);
    t && t.ChangeOptionText(e, i);
  }
  GetInteractController(t) {
    if (t) {
      t = t.GetComponent(177);
      if (t) return t.GetInteractController();
    }
  }
  SetInteractTarget(t) {
    this.eli !== t &&
      ((this.eli = t),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Interaction", 37, "切换交互目标", ["entityId", t]),
      InputDistributeController_1.InputDistributeController.RefreshInputTag());
  }
  get CurrentInteractEntityId() {
    return this.eli;
  }
  SetInterctCreatureDataId(t) {
    this.tli = t;
  }
  get InteractCreatureDataId() {
    return this.tli;
  }
  get InteractCreatureDataLongId() {
    if (void 0 !== this.tli)
      return MathUtils_1.MathUtils.NumberToLong(this.tli);
  }
  get CurrentInteractUeActor() {
    if (this.eli) {
      var t = EntitySystem_1.EntitySystem.Get(this.eli);
      if (t) return t.GetComponent(1)?.Owner;
    }
  }
  nli() {
    var t = (0, puerts_1.$ref)("");
    let e = (0, PublicUtil_1.getConfigPath)(
      IGlobal_1.globalConfig.InteractOptionConfigPath
    );
    if (
      (PublicUtil_1.PublicUtil.IsUseTempData() ||
        (e = (0, PublicUtil_1.getConfigPath)(
          IGlobal_1.globalConfigTemp.InteractOptionConfigPath
        )),
      UE.BlueprintPathsLibrary.FileExists(e))
    ) {
      if (
        (UE.KuroStaticLibrary.LoadFileToString(t, e),
        (t = (0, puerts_1.$unref)(t)))
      ) {
        this.Whi = new Map();
        t = JSON.parse(t);
        if (t) for (const i of t) i.Guid, this.Whi.set(i.Guid, i);
      }
    } else
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("World", 37, "不存在InteractOption配置文件。", [
          "Path",
          e,
        ]);
  }
  GetDynamicConfig(t) {
    if (PublicUtil_1.PublicUtil.UseDbConfig()) {
      if ((this.Whi || (this.Whi = new Map()), !this.Whi.get(t))) {
        var e =
          ConfigManager_1.ConfigManager.InteractOptionConfig.GetInteractionConfig(
            t
          );
        if (!e) return;
        var i = {
          Guid: e.Guid,
          Type: JSON.parse(e.Type),
          Icon: e.Icon || void 0,
          TidContent: "" !== e.TidContent ? e.TidContent : void 0,
          Condition: void 0,
          UniquenessTest: "" !== e.UniquenessTest ? e.UniquenessTest : void 0,
          DoIntactType: "" !== e.DoIntactType ? e.DoIntactType : void 0,
          Range: e.Range || void 0,
          Duration: void 0,
        };
        e.Condition &&
          "" !== e.Condition &&
          (i.Condition = JSON.parse(e.Condition)),
          e.Duration &&
            "" !== e.Duration &&
            (i.Duration = JSON.parse(e.Duration)),
          this.Whi.set(t, i);
      }
    } else this.Khi || (this.nli(), (this.Khi = !0));
    return this.Whi.get(t);
  }
  SetInteractionHintDisable(t) {
    (this.Yhi = t) &&
      TsInteractionUtils_1.TsInteractionUtils.CloseInteractHintView();
  }
  get IsHideInteractHint() {
    return this.Yhi;
  }
  LockInteraction(t, e) {
    t = t?.GetComponent(177);
    t && t.Valid && t.SetServerLockInteract(e, "Interacting Notify");
  }
  GetInteractEntityIds() {
    return this.Jhi;
  }
  LockInteract(t) {
    ModelManager_1.ModelManager.InteractionModel.LockInteractionEntity
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "LevelEvent",
          37,
          "交互锁定状态不支持多重锁定，请做到配置成对"
        )
      : ((this.LockInteractionEntity = t),
        (t = []).push(12),
        t.push(18),
        t.push(19),
        ModelManager_1.ModelManager.BattleUiModel.ChildViewData.HideBattleView(
          1,
          t
        ));
  }
  RecoverInteractFromLock() {
    var t;
    this.LockInteractionEntity &&
      ((t = EntitySystem_1.EntitySystem.GetComponent(
        this.LockInteractionEntity,
        177
      )),
      (this.LockInteractionEntity = void 0),
      ModelManager_1.ModelManager.BattleUiModel.ChildViewData.ShowBattleView(1),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.SetActiveBattleViewSkill,
        !0
      ),
      t?.AfterUnlockInteractionEntity(),
      InputDistributeController_1.InputDistributeController.RefreshInputTag());
  }
}
exports.InteractionModel = InteractionModel;
//# sourceMappingURL=InteractionModel.js.map

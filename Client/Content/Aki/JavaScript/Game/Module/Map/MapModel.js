"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapModel = void 0);
const Json_1 = require("../../../Core/Common/Json"),
puerts_1 = require("puerts"),
  Log_1 = require("../../../Core/Common/Log"),
  TeleporterById_1 = require("../../../Core/Define/ConfigQuery/TeleporterById"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  UnopenedAreaController_1 = require("../../LevelGamePlay/UnopenedArea/UnopenedAreaController"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  MapDefine_1 = require("./MapDefine");
class MapModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.kIi = 0),
      (this.FIi = void 0),
      (this.VIi = void 0),
      (this.HIi = void 0),
      (this.jIi = void 0),
      (this.WIi = void 0),
      (this.KIi = void 0),
      (this.QIi = void 0),
      (this.$Ii = void 0),
      (this.XIi = void 0),
      (this.YIi = void 0),
      (this.JIi = void 0),
      (this.MapLifeEventListenerTriggerMap = void 0);
  }
  OnInit() {
    return (
      (this.FIi = new Map()),
      (this.KIi = new Map()),
      (this.QIi = new Map()),
      (this.YIi = new Map()),
      (this.$Ii = void 0),
      (this.XIi = new Map()),
      (this.WIi = new Map()),
      (this.VIi = new Map()),
      (this.HIi = new Map()),
      (this.jIi = new Map()),
      (this.JIi = new Map()),
      (this.MapLifeEventListenerTriggerMap = new Map()),
      !0
    );
  }
  OnChangeMode() {
    return (
      ModelManager_1.ModelManager.TrackModel.ClearTrackData(),
      ModelManager_1.ModelManager.MapModel.SetCurTrackMark(void 0),
      !0
    );
  }
  OnClear() {
    return (
      this.FIi.clear(),
      this.KIi.clear(),
      this.QIi.clear(),
      this.YIi.clear(),
      this.VIi.clear(),
      this.HIi.clear(),
      this.jIi.clear(),
      this.JIi.clear(),
      (this.FIi = void 0),
      (this.KIi = void 0),
      (this.QIi = void 0),
      (this.YIi = void 0),
      !(this.$Ii = void 0)
    );
  }
  GetUnlockedTeleportMap() {
    puerts_1.logger.info("[KUNDEBUG]:GetDynamicMark", this.KIi); //CODE
    return this.KIi;
  }
  GetDynamicMark(e) {
    puerts_1.logger.info("[KUNDEBUG]:GetDynamicMark", e); //CODE
    puerts_1.logger.info("[KUNDEBUG]:GetDynamicMark", this.WIi?.get(e)); //CODE
    return this.WIi?.get(e);
  }
  GetMark(e, t) {
    return this.FIi.get(e)?.get(t);
  }
  GetMarkCountByType(e) {
    return this.FIi.get(e)?.size ?? 0;
  }
  GetAllDynamicMarks() {
    return this.FIi;
  }
  GetDynamicMarkInfoById(t) {
    let r = void 0;
    return (
      this.FIi.forEach((e) => {
        e.has(t) && (r = e.get(t));
      }),
      r
    );
  }
  SetCurTrackMark(e) {
    this.$Ii = e;
  }
  GetCurTrackMark() {
    return this.$Ii;
  }
  CreateServerSaveMark(e) {
    this.zIi(e);
  }
  CreateMapMark(e) {
    return (e.MarkId = this.SpawnDynamicMarkId()), this.zIi(e), e.MarkId;
  }
  ZIi(e) {
    return !(12 === e.MarkType || 15 === e.MarkType || 17 === e.MarkType);
  }
  ResetDynamicMarkData() {
    var e = this.FIi.get(12);
    this.FIi?.clear(),
      this.WIi?.clear(),
      e &&
        (this.FIi?.set(12, e),
        e.forEach((e) => {
          this.WIi?.set(e.MarkId, e);
        }));
  }
  zIi(r) {
    if (this.FIi) {
      let e = this.FIi.get(r.MarkType),
        t = (e || ((e = new Map()), this.FIi.set(r.MarkType, e)), void 0);
      e.forEach((e) => {
        this.ZIi(r) &&
          e.TrackTarget instanceof Vector_1.Vector &&
          r.TrackTarget instanceof Vector_1.Vector &&
          e.TrackTarget.Equality(r.TrackTarget) &&
          (t = e);
      }),
        t && this.RemoveMapMark(t.MarkType, t.MarkId),
        e.set(r.MarkId, r),
        this.WIi?.set(r.MarkId, r),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.CreateMapMark,
          r
        );
    }
  }
  SetTrackMark(e, t, r) {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.TrackMapMark,
      e,
      t,
      r
    ),
      r ||
        (this.FIi &&
          (r = this.FIi.get(e)) &&
          r.get(t)?.DestroyOnUnTrack &&
          this.RemoveMapMark(e, t));
  }
  IsMarkIdExist(e, t) {
    if (this.FIi && e && t) {
      var r = this.FIi.get(e);
      if (r) return r.has(t);
      for (const i of ConfigManager_1.ConfigManager.MapConfig.GetConfigMarks(
        MapDefine_1.BIG_WORLD_MAP_ID
      ))
        if (i.MarkId === t && i.ObjectType === e) return !0;
    }
    return !1;
  }
  IsConfigMarkIdUnlock(e) {
    var t = ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(e);
    return (
      !!t &&
      !!ModelManager_1.ModelManager.MapModel.IsMarkIdExist(t.ObjectType, e) &&
      ((e = this.eTi(t)), (t = this.tTi(t)), e) &&
      t
    );
  }
  eTi(e) {
    return (
      1 === e.FogShow || 0 === e.FogHide || this.CheckAreasUnlocked(e.FogHide)
    );
  }
  tTi(e) {
    var t = e.ShowCondition,
      e = e.MarkId;
    return t < 0
      ? this.GetMarkExtraShowState(e).IsShow
      : 0 === t || this.IsMarkUnlockedByServer(e);
  }
  RemoveMapMark(e, t) {
    var r;
    this.FIi &&
      void 0 !== e &&
      void 0 !== t &&
      (r = this.FIi.get(e)) &&
      ((r = r.delete(t)), this.WIi?.delete(t), r) &&
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RemoveMapMark,
        e,
        t
      );
  }
  RemoveDynamicMapMark(e) {
    var t = this.WIi?.get(e);
    t
      ? this.RemoveMapMark(t?.MarkType, t?.MarkId)
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("Map", 50, "找不到mark id:", ["markId", e]);
  }
  UpdateCustomMarkInfo(e, t) {
    var r;
    this.FIi &&
      ((r = this.FIi.get(9))
        ? (r.get(e).TrackTarget = t)
        : Log_1.Log.CheckError() && Log_1.Log.Error("Map", 50, "找不到markId"));
  }
  ReplaceCustomMarkIcon(e, t) {
    var r;
    this.FIi &&
      (r = this.FIi.get(9)) &&
      (r = r.get(e)) &&
      ((r.MarkConfigId = t),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.MapReplaceMarkResponse,
        9,
        e,
        t
      ));
  }
  SpawnDynamicMarkId() {
    return --this.kIi;
  }
  UnlockTeleports(e, t = !1) {
    if ((t && this.KIi.clear(), !(e.length <= 0))) {
      var r = new Array();
      for (const n of e) {
        var i = TeleporterById_1.configTeleporterById.GetConfig(n);
        r.push(i);
      }
      for (const o of r)
        o.TeleportEntityConfigId &&
          ControllerHolder_1.ControllerHolder.CreatureController.ChangeLockTagByTeleportPbDataId(
            o.TeleportEntityConfigId,
            1196894179
          ),
          this.KIi.set(o.Id, !0),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.UnlockTeleport,
            o.Id
          );
    }
  }
  UnlockTeleport(e) {
    this.KIi.set(e, !0);
    var t = ConfigManager_1.ConfigManager.MapConfig.GetTeleportConfigById(e);
    t &&
      t.TeleportEntityConfigId &&
      ControllerHolder_1.ControllerHolder.CreatureController.ChangeLockTagByTeleportPbDataId(
        t.TeleportEntityConfigId,
        1196894179
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.UnlockTeleport,
        e
      );
  }
  CheckTeleportUnlocked(e) {
    return this.KIi.get(e);
  }
  GetAllUnlockedAreas() {//获取所有未解锁区域
    puerts_1.logger.info("[KUNDEBUG]:GetAllUnlockedAreas:", this.QIi); //CODE
    return this.QIi;
  }
  AddUnlockedAreas(e) {
    this.QIi.set(e, !0),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.MapOpenAreaChange,
        e
      );
  }
  CheckAreasUnlocked(e) {
    return this.QIi.get(e);
  }
  AddEntityIdToPendingList(e, t) {
    this.YIi.set(e, t);
  }
  RemoveEntityIdToPendingList(e) {
    this.YIi.delete(e);
  }
  GetEntityPendingList() {
    return this.YIi;
  }
  IsInMapPolygon(e) {
    return (
      ModelManager_1.ModelManager.GameModeModel.InstanceDungeon.MapConfigId !==
        MapDefine_1.BIG_WORLD_MAP_ID ||
      UnopenedAreaController_1.UnopenedAreaController.OnCheckUnopenedArea(e)
    );
  }
  IsInUnopenedAreaPullback() {
    return (
      !!ModelManager_1.ModelManager.GameModeModel.WorldDone &&
      !ModelManager_1.ModelManager.GameModeModel.IsTeleport &&
      ModelManager_1.ModelManager.GameModeModel?.InstanceDungeon
        ?.MapConfigId === MapDefine_1.BIG_WORLD_MAP_ID &&
      UnopenedAreaController_1.UnopenedAreaController.CheckInPullback()
    );
  }
  SetMarkExtraShowState(e, t, r, i) {
    return (
      this.XIi.set(e, { Id: e, IsShow: t, NeedFocus: r, ShowFlag: i }),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnMarkItemShowStateChange,
        e
      ),
      r
    );
  }
  GetMarkExtraShowState(e) {
    return (
      this.XIi.get(e) ?? {
        Id: e,
        IsShow: !1,
        NeedFocus: !1,
        ShowFlag: Protocol_1.Aki.Protocol.MapMarkShowFlag.ShowNormal,
      }
    );
  }
  GetCurMapBorderId() {
    let t = MapDefine_1.DEFAULT_MAP_BORDER_ID;
    for (const i of ConfigManager_1.ConfigManager.MapConfig.GetMapBorderConfigList()) {
      var r = i.ConditionId;
      let e = !1;
      if (
        !(e =
          0 === r ||
          ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckCondition(
            r.toString(),
            void 0,
            !1
          ))
      )
        break;
      t = i.BorderId;
    }
    return t;
  }
  ForceSetMarkVisible(e, t, r) {
    let i = this.VIi.get(e);
    void 0 === i && ((i = new Map()), this.VIi.set(e, i)), i.set(t, r);
  }
  GetMarkForceVisible(e, t) {
    let r = !0;
    e = this.VIi.get(e);
    return (r = e && e.has(t) ? e.get(t) ?? !1 : r);
  }
  AddOccupationInfo(e) {
    var t = ConfigManager_1.ConfigManager.QuestNewConfig.GetNewOccupationConfig(
      e.ResourceName
    );
    if (
      t &&
      t.OccupationData &&
      !StringUtils_1.StringUtils.IsEmpty(t.OccupationData) &&
      "Empty" !== t.OccupationData
    ) {
      t = Json_1.Json.Parse(t.OccupationData);
      if (t) {
        t = t.LevelPlayIds;
        for (const r of t)
          this.HIi.set(r, MathUtils_1.MathUtils.LongToBigInt(e.IncId));
        this.jIi.set(e.ResourceName, t);
      }
    }
  }
  RemoveOccupationInfo(e) {
    if (this.jIi.has(e)) {
      var t = this.jIi.get(e);
      this.jIi.delete(e);
      for (const r of t) this.HIi.delete(r);
    }
  }
  IsLevelPlayOccupied(e) {
    e = this.HIi.get(e);
    return { IsOccupied: !!e, QuestId: e };
  }
  IsMarkUnlockedByServer(e) {
    return this.JIi.get(e) ?? !1;
  }
  SetMarkServerOpenState(e, t) {
    this.JIi.set(e, t);
  }
}
exports.MapModel = MapModel;
//# sourceMappingURL=MapModel.js.map

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapModel = void 0);
const Json_1 = require("../../../Core/Common/Json"),
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
      (this.MLi = 0),
      (this.SLi = void 0),
      (this.ELi = void 0),
      (this.yLi = void 0),
      (this.ILi = void 0),
      (this.TLi = void 0),
      (this.LLi = void 0),
      (this.DLi = void 0),
      (this.RLi = void 0),
      (this.ULi = void 0),
      (this.ALi = void 0),
      (this.PLi = void 0),
      (this.UnlockMultiMapIds = void 0),
      (this.UnlockMapBlockIds = void 0),
      (this.LastSafeLocation = Vector_1.Vector.Create()),
      (this.MapLifeEventListenerTriggerMap = void 0);
  }
  OnInit() {
    return (
      (this.SLi = new Map()),
      (this.LLi = new Map()),
      (this.DLi = new Map()),
      (this.ALi = new Map()),
      (this.RLi = void 0),
      (this.ULi = new Map()),
      (this.TLi = new Map()),
      (this.ELi = new Map()),
      (this.yLi = new Map()),
      (this.ILi = new Map()),
      (this.PLi = new Map()),
      (this.MapLifeEventListenerTriggerMap = new Map()),
      (this.UnlockMapBlockIds = []),
      (this.UnlockMultiMapIds = []),
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
      this.SLi.clear(),
      this.LLi.clear(),
      this.DLi.clear(),
      this.ALi.clear(),
      this.ELi.clear(),
      this.yLi.clear(),
      this.ILi.clear(),
      this.PLi.clear(),
      (this.SLi = void 0),
      (this.LLi = void 0),
      (this.DLi = void 0),
      (this.ALi = void 0),
      (this.RLi = void 0),
      (this.UnlockMapBlockIds = void 0),
      !(this.UnlockMultiMapIds = void 0)
    );
  }
  GetUnlockedTeleportMap() {
    return this.LLi;
  }
  GetDynamicMark(e) {
    return this.TLi?.get(e);
  }
  GetMark(e, t) {
    return this.SLi.get(e)?.get(t);
  }
  GetMarkCountByType(e) {
    return this.SLi.get(e)?.size ?? 0;
  }
  GetAllDynamicMarks() {
    return this.SLi;
  }
  GetDynamicMarkInfoById(t) {
    let r = void 0;
    return (
      this.SLi.forEach((e) => {
        e.has(t) && (r = e.get(t));
      }),
      r
    );
  }
  SetCurTrackMark(e) {
    this.RLi = e;
  }
  GetCurTrackMark() {
    return this.RLi;
  }
  CreateServerSaveMark(e) {
    this.xLi(e);
  }
  CreateMapMark(e) {
    return (e.MarkId = this.SpawnDynamicMarkId()), this.xLi(e), e.MarkId;
  }
  wLi(e) {
    return !(
      12 === e.MarkType ||
      15 === e.MarkType ||
      17 === e.MarkType ||
      9 === e.MarkType
    );
  }
  ResetDynamicMarkData() {
    var e = this.SLi.get(12);
    this.SLi?.clear(),
      this.TLi?.clear(),
      e &&
        (this.SLi?.set(12, e),
        e.forEach((e) => {
          this.TLi?.set(e.MarkId, e);
        }));
  }
  xLi(r) {
    if (this.SLi) {
      let e = this.SLi.get(r.MarkType),
        t = (e || ((e = new Map()), this.SLi.set(r.MarkType, e)), void 0);
      e.forEach((e) => {
        this.wLi(r) &&
          e.TrackTarget instanceof Vector_1.Vector &&
          r.TrackTarget instanceof Vector_1.Vector &&
          e.TrackTarget.Equality(r.TrackTarget) &&
          (t = e);
      }),
        t && this.RemoveMapMark(t.MarkType, t.MarkId),
        e.set(r.MarkId, r),
        this.TLi?.set(r.MarkId, r),
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
        (this.SLi &&
          (r = this.SLi.get(e)) &&
          r.get(t)?.DestroyOnUnTrack &&
          this.RemoveMapMark(e, t));
  }
  IsMarkIdExist(e, t) {
    if (this.SLi && e && t) {
      var r = this.SLi.get(e);
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
      ((e = this.BLi(t)), (t = this.bLi(t)), e) &&
      t
    );
  }
  BLi(e) {
    return (
      1 === e.FogShow || 0 === e.FogHide || this.CheckAreasUnlocked(e.FogHide)
    );
  }
  bLi(e) {
    var t = e.ShowCondition,
      e = e.MarkId;
    return t < 0
      ? this.GetMarkExtraShowState(e).IsShow
      : 0 === t || this.IsMarkUnlockedByServer(e);
  }
  RemoveMapMark(e, t) {
    var r;
    this.SLi &&
      void 0 !== e &&
      void 0 !== t &&
      (r = this.SLi.get(e)) &&
      ((r = r.delete(t)), this.TLi?.delete(t), r) &&
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RemoveMapMark,
        e,
        t
      );
  }
  RemoveMapMarksByConfigId(e, t) {
    if (this.SLi && void 0 !== e && void 0 !== t) {
      t = this.SLi.get(e);
      if (t) {
        var r,
          i,
          o = [];
        for ([r, i] of t) i.MarkType === e && o.push(r);
        for (const n of o) this.RemoveMapMark(e, n);
      }
    }
  }
  RemoveDynamicMapMark(e) {
    var t = this.TLi?.get(e);
    t
      ? this.RemoveMapMark(t?.MarkType, t?.MarkId)
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("Map", 50, "找不到mark id:", ["markId", e]);
  }
  UpdateCustomMarkInfo(e, t) {
    var r;
    this.SLi &&
      ((r = this.SLi.get(9))
        ? (r.get(e).TrackTarget = t)
        : Log_1.Log.CheckError() && Log_1.Log.Error("Map", 50, "找不到markId"));
  }
  ReplaceCustomMarkIcon(e, t) {
    var r;
    this.SLi &&
      (r = this.SLi.get(9)) &&
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
    return --this.MLi;
  }
  UnlockTeleports(e, t = !1) {
    if ((t && this.LLi.clear(), !(e.length <= 0))) {
      var r = new Array();
      for (const o of e) {
        var i = TeleporterById_1.configTeleporterById.GetConfig(o);
        i && r.push(i);
      }
      for (const n of r)
        n.TeleportEntityConfigId &&
          ControllerHolder_1.ControllerHolder.CreatureController.ChangeLockTagByTeleportPbDataId(
            n.TeleportEntityConfigId,
            1196894179
          ),
          this.LLi.set(n.Id, !0),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.UnlockTeleport,
            n.Id
          );
    }
  }
  UnlockTeleport(e) {
    this.LLi.set(e, !0);
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
    return this.LLi.get(e);
  }
  GetAllUnlockedAreas() {
    return this.DLi;
  }
  AddUnlockedAreas(e) {
    this.DLi.set(e, !0),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.MapOpenAreaChange,
        e
      );
  }
  FullUpdateUnlockedAreas(e) {
    this.DLi.clear();
    for (const t of e) this.DLi.set(t, !0);
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.MapOpenAreaFullUpdate,
      this.DLi
    );
  }
  CheckAreasUnlocked(e) {
    return this.DLi.get(e);
  }
  SetUnlockMultiMapIds(e) {
    this.UnlockMultiMapIds = e;
  }
  SetUnlockMapBlockIds(e) {
    this.UnlockMapBlockIds = e;
  }
  CheckUnlockMultiMapIds(e) {
    return this.UnlockMultiMapIds.includes(e);
  }
  CheckUnlockMapBlockIds(e) {
    let t = 0;
    for (const i of this.UnlockMapBlockIds ?? []) {
      var r =
        ConfigManager_1.ConfigManager.MapConfig.GetUnlockMapTileConfigById(i);
      if (r?.Block === e) {
        t = r.Id;
        break;
      }
    }
    return t;
  }
  CheckIsInMultiMapWithAreaId(e) {
    let t = 0;
    for (const r of ConfigManager_1.ConfigManager.MapConfig?.GetAllSubMapConfig())
      if (r.Area.includes(e)) {
        t = r.Id;
        break;
      }
    return t;
  }
  AddEntityIdToPendingList(e, t) {
    this.ALi.set(e, t);
  }
  RemoveEntityIdToPendingList(e) {
    this.ALi.delete(e);
  }
  GetEntityPendingList() {
    return this.ALi;
  }
  IsInMapPolygon(e) {
    var t;
    return (
      ModelManager_1.ModelManager.GameModeModel.InstanceDungeon.MapConfigId !==
        MapDefine_1.BIG_WORLD_MAP_ID ||
      ((t =
        UnopenedAreaController_1.UnopenedAreaController.OnCheckUnopenedArea(
          e
        )) && this.LastSafeLocation.DeepCopy(e),
      t)
    );
  }
  GetLastSafeLocation() {
    return this.LastSafeLocation;
  }
  IsInUnopenedAreaPullback() {
    return false;
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
      this.ULi.set(e, { Id: e, IsShow: t, NeedFocus: r, ShowFlag: i }),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnMarkItemShowStateChange,
        e
      ),
      r
    );
  }
  GetMarkExtraShowState(e) {
    return (
      this.ULi.get(e) ?? {
        Id: e,
        IsShow: !1,
        NeedFocus: !1,
        ShowFlag: Protocol_1.Aki.Protocol.BNs.Proto_ShowNormal,
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
    let i = this.ELi.get(e);
    void 0 === i && ((i = new Map()), this.ELi.set(e, i)), i.set(t, r);
  }
  GetMarkForceVisible(e, t) {
    let r = !0;
    e = this.ELi.get(e);
    return (r = e && e.has(t) ? e.get(t) ?? !1 : r);
  }
  AddOccupationInfo(e) {
    var t = ConfigManager_1.ConfigManager.QuestNewConfig.GetNewOccupationConfig(
      e.cvs
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
          this.yLi.set(r, MathUtils_1.MathUtils.LongToBigInt(e.Ykn));
        this.ILi.set(e.cvs, t);
      }
    }
  }
  RemoveOccupationInfo(e) {
    if (this.ILi.has(e)) {
      var t = this.ILi.get(e);
      this.ILi.delete(e);
      for (const r of t) this.yLi.delete(r);
    }
  }
  IsLevelPlayOccupied(e) {
    e = this.yLi.get(e);
    return { IsOccupied: !!e, QuestId: e };
  }
  IsMarkUnlockedByServer(e) {
    return this.PLi.get(e) ?? !1;
  }
  SetMarkServerOpenState(e, t) {
    this.PLi.set(e, t);
  }
}
exports.MapModel = MapModel;
//# sourceMappingURL=MapModel.js.map

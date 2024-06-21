"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapController = void 0);
const UE = require("ue"),
puerts_1 = require("puerts"),
  Log_1 = require("../../../../Core/Common/Log"),
  QueryTypeDefine_1 = require("../../../../Core/Define/QueryTypeDefine"),
  Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  GlobalData_1 = require("../../../GlobalData"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  ControllerWithAssistantBase_1 = require("../../GeneralLogicTree/ControllerAssistant/ControllerWithAssistantBase"),
  AreaAssistant_1 = require("./AreaAssistant"),
  MarkAssistant_1 = require("./MarkAssistant"),
  TeleportAssistant_1 = require("./TeleportAssistant"),
  SCALE_XY = 100,
  SCALE_Z = 1e6,
  PROFILE_KEY = "WorldMapView_CreateNewCustomMarkItem",
  Modmanager_1 = require("../../../Manager/ModManager"),
  assistantMap = { [0]: void 0, 1: void 0, 2: void 0 };
class LineTraceSaver {
  constructor() {
    this.Oie = void 0;
  }
  InitTrackInfo() {
    (this.Oie = UE.NewObject(UE.TraceLineElement.StaticClass())),
      (this.Oie.WorldContextObject = GlobalData_1.GlobalData.World),
      (this.Oie.bIsSingle = !0),
      (this.Oie.bIgnoreSelf = !0),
      this.Oie.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.IkGround);
  }
  GetMarkPosition(e, t) {
    this.Oie || this.InitTrackInfo();
    let r = void 0;
    this.Oie.SetStartLocation(e * SCALE_XY, t * SCALE_XY, SCALE_Z),
      this.Oie.SetEndLocation(e * SCALE_XY, t * SCALE_XY, -SCALE_Z);
    var a = TraceElementCommon_1.TraceElementCommon.LineTrace(
        this.Oie,
        PROFILE_KEY
      ),
      o = this.Oie.HitResult;

    return (
      a &&
        o.bBlockingHit &&
        ((a = o.LocationZ_Array.Get(0)),
        (a /= SCALE_XY),
        (r = Vector_1.Vector.Create(e, t, a))),
        (puerts_1.logger.info("[KUNDEBUG]:GetMarkPosition:", r)), 
        (Modmanager_1.ModManager.Settings.MarkX=e),//
        (Modmanager_1.ModManager.Settings.MarkY=t),//
        (Modmanager_1.ModManager.Settings.MarkZ=a),//
      r
    );
  }
  OnClear() {
    this.Oie = void 0;
  }
}
class MapController extends ControllerWithAssistantBase_1.ControllerWithAssistantBase {
  static OnInit() {
    var e = super.OnInit();
    return (this.oIi = new LineTraceSaver()), e;
  }
  static OnClear() {
    return this.oIi.OnClear(), super.OnClear();
  }
  static OnAddEvents() {
    super.OnAddEvents(),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldDoneAndCloseLoading,
        MapController.MSe
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnEnterOnlineWorld,
        MapController.gXe
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnLeaveOnlineWorld,
        MapController.pXe
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.WorldDoneAndCloseLoading,
      MapController.MSe
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnEnterOnlineWorld,
        MapController.gXe
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnLeaveOnlineWorld,
        MapController.pXe
      ),
      super.OnRemoveEvents();
  }
  static RegisterAssistant() {
    this.Assistants.set(0, new MarkAssistant_1.MarkAssistant()),
      this.Assistants.set(1, new TeleportAssistant_1.TeleportAssistant()),
      this.Assistants.set(2, new AreaAssistant_1.AreaAssistant());
  }
  static wQt(e) {
    if (this.Assistants) return this.Assistants.get(e);
  }
  static nIi() {
    ModelManager_1.ModelManager.TrackModel.ClearTrackData(),
      ModelManager_1.ModelManager.MapModel.SetCurTrackMark(void 0);
  }
  static async sIi() {
    await this.RequestMapData(),
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ModelReady);
  }
  static async RequestMapData() {
    Log_1.Log.CheckDebug() && Log_1.Log.Debug("Map", 35, "开始请求地图数据"),
      await MapController.wQt(0).RequestTrackInfo(),
      await MapController.wQt(1).RequestTeleportData(),
      await MapController.wQt(2).RequestUnlockedAreaInfo(),
      Log_1.Log.CheckDebug() && Log_1.Log.Debug("Map", 35, "结束请求地图数据");
  }
  static GetMarkPosition(e, t) {
    return this.oIi.GetMarkPosition(e, t);
  }
  static RequestUnlockTeleport(e) {
    puerts_1.logger.info("[KUNDEBUG]:RequestUnlockTeleport", e)
    MapController.wQt(1).RequestUnlockTeleport(e);
  }
  static RequestMapMarkReplace(e, t) {
    //puerts_1.logger.info("[KUNDEBUG]:RequestMapMarkReplace", e)
   // puerts_1.logger.info("[KUNDEBUG]:RequestMapMarkReplace", t)
    MapController.wQt(0).RequestMapMarkReplace(e, t);
  }
  static RequestCreateCustomMark(e, t) {
    //puerts_1.logger.info("[KUNDEBUG]:RequestCreateCustomMark", e)
    //puerts_1.logger.info("[KUNDEBUG]:RequestCreateCustomMark", t)
    MapController.wQt(0).RequestCreateCustomMark(e, t);
  }
  static RequestRemoveMapMark(e, t) {
    var r = ModelManager_1.ModelManager.MapModel.GetCurTrackMark();
    r &&
      r[0] === e &&
      r[1] === t &&
      ModelManager_1.ModelManager.MapModel.SetCurTrackMark(void 0),
      MapController.wQt(0).RequestRemoveMapMark(e, t);
  }
  static RequestTrackMapMark(e, t, r) {
    r
      ? (void 0 ===
          (r = ModelManager_1.ModelManager.MapModel.GetCurTrackMark()) ||
          (r[0] === e && r[1] === t) ||
          MapController.wQt(0).RequestCancelTrackMapMark(r[0], r[1]),
        MapController.wQt(0).RequestTrackMapMark(e, t),
        ModelManager_1.ModelManager.MapModel.SetCurTrackMark([e, t])
       /*, Modmanager_1.ModManager.Settings.MarkTp && Modmanager_1.ModManager.TrackTP()*/) //marktp
      : (ModelManager_1.ModelManager.MapModel.SetCurTrackMark(void 0),
        MapController.wQt(0).RequestCancelTrackMapMark(e, t));
  }
  static UpdateCustomMapMarkPosition(e, t) {
    MapController.wQt(0).UpdateCustomMapMarkPosition(e, t);
  }
  static RequestCreateTemporaryTeleport(e) {
    MapController.wQt(0).RequestCreateTemporaryTeleport(e);
  }
  static RequestRemoveDynamicMapMark(e) {
    MapController.wQt(0).RequestRemoveDynamicMapMark(e);
  }
  static RequestTeleportToTargetByTemporaryTeleport(e) {
    var t = ModelManager_1.ModelManager.FormationModel.GetCurrentEntity;
    t?.Valid &&
      (t = t.Entity.GetComponent(3)) &&
      MapController.wQt(0).RequestTeleportToTargetByTemporaryTeleport(
        e,
        Rotator_1.Rotator.Create(t.ActorRotationProxy)
      );
  }
  static ForceSetMarkVisible(e, t, r) {
    ModelManager_1.ModelManager.MapModel.ForceSetMarkVisible(e, t, r),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.MarkForceVisibleChanged,
        e,
        t,
        r
      );
  }
}
(exports.MapController = MapController),
  ((_a = MapController).oIi = void 0),
  (MapController.MSe = () => {
    MapController.sIi().finally(void 0);
  }),
  (MapController.gXe = () => {
    _a.nIi();
  }),
  (MapController.pXe = () => {
    _a.nIi();
  });
//# sourceMappingURL=MapController.js.map

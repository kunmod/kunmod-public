"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TrackController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
puerts_1 = require("puerts"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  IComponent_1 = require("../../../UniverseEditor/Interface/IComponent"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  CharacterController_1 = require("../../NewWorld/Character/CharacterController");
class TrackController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return (
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnEnterNearbyTrackRange,
        this.KIr
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnLeaveNearbyTrackRange,
        this.QIr
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RemoveNearbyTrack,
        this.QIr
      ),
      !0
    );
  }
  static OnClear() {
    return (
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnEnterNearbyTrackRange,
        this.KIr
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnLeaveNearbyTrackRange,
        this.QIr
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RemoveNearbyTrack,
        this.QIr
      ),
      !0
    );
  }
  static StartTrack(e, r = !0) {
    return (
      !!e &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Track",
          50,
          "开始追踪:",
          ["追踪类型:", e.TrackSource],
          ["追踪Id:", e.Id],
          ["追踪目标:", e.TrackTarget]
        ),
      (e.IsSubTrack = r),
      ModelManager_1.ModelManager.TrackModel.AddTrackData(e),
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TrackMark, e),
      !0)
    );
  }
  static EndTrack(e, r) {
    var t = ModelManager_1.ModelManager.TrackModel.GetTrackData(e, r);
    return (
      !!t &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Track",
          50,
          "取消追踪:",
          ["追踪类型:", t.TrackSource],
          ["追踪Id:", t.Id],
          ["追踪目标:", t.TrackTarget]
        ),
      ModelManager_1.ModelManager.TrackModel.RemoveTrackData(e, r),
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.UnTrackMark, t),
      !0)
    );
  }
  static SetTrackMarkOccupied(e, r, t) {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.SetTrackMarkOccupied,
      e,
      r,
      t
    );
  }
}
((exports.TrackController = TrackController).KIr = (r) => {
  if (r) {
    var t = r.GetComponent(143);
    if (t?.Valid) {
      var n = r.GetComponent(1).CreatureData.GetPbEntityInitData(),
        n = (0, IComponent_1.getComponent)(
          n.ComponentsData,
          "InteractComponent"
        ),
        e = r.GetComponent(176);
      if (!e || !e.ContainsTagById(1196894179)) {
        let e = 3;
        n && (e = n.Range / 100),
          TrackController.StartTrack({
            TrackSource: 3,
            Id: r.Id,
            IconPath: t?.IconPath ?? "",
            TrackHideDis: e,
            TrackTarget:
              CharacterController_1.CharacterController.GetActorByEntity(r),
            TrackType: t.TrackType,
            Offset: t.IconOffset,
            IsSubTrack: !1,
          });
      }
    }
  }
}),
  (TrackController.QIr = (e) => {
    TrackController.EndTrack(3, e.Id);
  });
//# sourceMappingURL=TrackController.js.map

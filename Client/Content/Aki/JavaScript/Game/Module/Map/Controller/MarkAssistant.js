"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MarkAssistant = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
puerts_1 = require("puerts"),
  NetDefine_1 = require("../../../../Core/Define/Net/NetDefine"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../../Core/Net/Net"),
  Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  ControllerAssistantBase_1 = require("../../GeneralLogicTree/ControllerAssistant/ControllerAssistantBase"),
  WorldMapController_1 = require("../../WorldMap/WorldMapController"),
  MapDefine_1 = require("../MapDefine"),
  MapUtil_1 = require("../MapUtil"),
  MarkItemDataUtil_1 = require("../Marks/MarkItemDataUtil");
class MarkAssistant extends ControllerAssistantBase_1.ControllerAssistantBase {
  constructor() {
    super(...arguments),
      (this.aIi = 0),
      (this.gpe = (e, t, o) => {
        var r = t.Entity.GetComponent(0),
          a = r.GetPbEntityInitData();
        r.GetEntityConfigType() ===
          Protocol_1.Aki.Protocol.EntityConfigType.Character ||
          MapUtil_1.MapUtil.IsTemporaryTeleportEntity(a) ||
          ((a = r.GetBaseInfo())?.MapIcon &&
            ModelManager_1.ModelManager.MapModel.AddEntityIdToPendingList(
              t.Id,
              a.MapIcon
            ));
      }),
      (this.fpe = (e, t) => {
        ModelManager_1.ModelManager.MapModel.RemoveEntityIdToPendingList(t.Id);
      }),
      (this.hIi = (e) => {
        ModelManager_1.ModelManager.MapModel.SetTrackMark(0, e.MarkId, !0);
      }),
      (this.lIi = (e) => {
        ModelManager_1.ModelManager.MapModel.SetTrackMark(0, e.MarkId, !1);
      }),
      (this._Ii = (e) => {
        ModelManager_1.ModelManager.MapModel.ResetDynamicMarkData();
        for (const o of e.InfoList) {
          var t =
              0 === o.PosZ
                ? Vector2D_1.Vector2D.Create(o.PosX, o.PosY)
                : Vector_1.Vector.Create(o.PosX, o.PosY, o.PosZ),
            t = new MapDefine_1.DynamicMarkCreateInfo(
              t,
              o.ConfigId,
              MarkItemDataUtil_1.MarkItemDataUtil.TransformMarkTypeToClient(
                o.MarkType
              ),
              o.MarkId
            );
          ModelManager_1.ModelManager.MapModel.CreateServerSaveMark(t),
            0 === this.aIi &&
              o.MarkType ===
                Protocol_1.Aki.Protocol.PbMapMarkType.ENUMS.SoundBox &&
              (this.aIi = t.MarkId ?? 0);
        }
        for (const r of e.ShowMarkIds)
          ModelManager_1.ModelManager.MapModel.SetMarkExtraShowState(
            r.MarkId,
            r.IsShow,
            !1,
            r.ShowFlag
          );
        for (const a of e.UnlockMarkIds)
          ModelManager_1.ModelManager.MapModel.SetMarkServerOpenState(a, !0);
      }),
      (this.uIi = (t) => {
        if (
          !ModelManager_1.ModelManager.OnlineModel.GetIsTeamModel() ||
          ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam() ||
          (t.Info.MarkType !==
            Protocol_1.Aki.Protocol.PbMapMarkType.ENUMS.TreasureBoxPoint &&
            t.Info.MarkType !==
              Protocol_1.Aki.Protocol.PbMapMarkType.ENUMS.SoundBox)
        ) {
          var e = t.Info,
            o = this.cIi(e);
          if (
            (ModelManager_1.ModelManager.MapModel.CreateServerSaveMark(o),
            t.Info.MarkType ===
              Protocol_1.Aki.Protocol.PbMapMarkType.ENUMS.TreasureBoxPoint &&
              t.TreasureBoxMarkInfo)
          )
            for (const a of t.TreasureBoxMarkInfo.MarkPointInfo) {
              var r = this.cIi(a);
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "Map",
                  50,
                  "添加物资箱标记",
                  ["pointInfo.MarkId", a.MarkId],
                  ["pointInfo.ConfigId", a.ConfigId]
                ),
                ModelManager_1.ModelManager.MapModel.CreateServerSaveMark(r);
            }
          switch (
            MarkItemDataUtil_1.MarkItemDataUtil.TransformMarkTypeToClient(
              t.Info.MarkType
            )
          ) {
            case 15:
              this.mIi(15, e.MarkId, void 0, !1);
              break;
            case 17:
              this.mIi(17, e.MarkId, (e) => {
                e &&
                  0 === t.TreasureBoxMarkInfo.MarkPointInfo.length &&
                  ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                    "ExploreBoxUnfindable"
                  );
              });
              break;
            case 16:
              this.mIi(16, e.MarkId, void 0, !1), (this.aIi = e.MarkId);
          }
        }
      }),
      (this.dIi = (e) => {
        ModelManager_1.ModelManager.MapModel?.SetMarkServerOpenState(
          e.MarkId,
          !0
        );
      }),
      (this.CIi = (e) => {
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Map", 50, "移除标记", ["notify.MarkId", e.MarkId]),
          ModelManager_1.ModelManager.MapModel?.RemoveDynamicMapMark(
            MathUtils_1.MathUtils.LongToNumber(e.MarkId)
          ),
          e.MarkId === this.aIi && (this.aIi = 0);
      }),
      (this.gIi = (e) => {
        ModelManager_1.ModelManager.MapModel.SetMarkExtraShowState(
          e.MarkId,
          e.IsShow,
          e.NeedFocus,
          e.ShowFlag
        );
      }),
      (this.fIi = (e) => {
        for (const o of e.AllTemporaryTeleportInfo)
          if (0 === o.MarkId) {
            if (
              ModelManager_1.ModelManager.OnlineModel.GetIsTeamModel() &&
              !ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam()
            )
              return;
            this.RequestCreateTemporaryTeleport(
              Vector_1.Vector.Create(o.Pos),
              MathUtils_1.MathUtils.LongToNumber(o.TemporaryTeleportId)
            );
          } else {
            var t = new MapDefine_1.DynamicMarkCreateInfo(
              Vector_1.Vector.Create(o.Pos),
              ConfigManager_1.ConfigManager.MapConfig.GetDefaultDetectorMarkConfigId(),
              15,
              o.MarkId ?? void 0,
              void 0,
              !1,
              MathUtils_1.MathUtils.LongToNumber(o.TemporaryTeleportId)
            );
            ModelManager_1.ModelManager.MapModel.CreateServerSaveMark(t);
          }
      }),
      (this.pIi = (e) => {
        var t = ModelManager_1.ModelManager.MapModel.GetDynamicMark(
          e.TemporaryTeleportInfo.MarkId
        );
        void 0 !== t &&
          ((e = MathUtils_1.MathUtils.LongToNumber(
            e.TemporaryTeleportInfo.TemporaryTeleportId
          )),
          (t.TeleportId = e));
      }),
      (this.vIi = (e) => {
        (ModelManager_1.ModelManager.OnlineModel.GetIsTeamModel() &&
          !ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam()) ||
          this.RequestCreateTemporaryTeleport(
            Vector_1.Vector.Create(e.TemporaryTeleportInfo.Pos),
            MathUtils_1.MathUtils.LongToNumber(
              e.TemporaryTeleportInfo.TemporaryTeleportId
            )
          );
      }),
      (this.MIi = (e) => {}),
      (this.EIi = (e) => {
        for (const t of e.OccupationInfo)
          ModelManager_1.ModelManager.MapModel.AddOccupationInfo(t);
      }),
      (this.SIi = (e) => {
        for (const t of e.OccupationInfo)
          ModelManager_1.ModelManager.MapModel.AddOccupationInfo(t);
      }),
      (this.yIi = (e) => {
        for (const t of e.Resource)
          ModelManager_1.ModelManager.MapModel.RemoveOccupationInfo(t);
      }),
      (this.IIi = (e, t) => {
        (void 0 === t || void 0 === t.DetectionEntityPosInfo) && 0 < this.aIi
          ? this.mIi(16, this.aIi, void 0, !1)
          : this.UseExploreToolCall(
              Vector_1.Vector.Create(e.Pos),
              Rotator_1.Rotator.Create(e.Rot),
              e.PhantomSkillId,
              t
            );
      });
  }
  TIi(e, t, o) {
    var r = Protocol_1.Aki.Protocol.MarkPointRequestInfo.create();
    return (
      (r.PosX = e.X),
      (r.PosY = e.Y),
      (r.PosZ = e.Z),
      (r.ConfigId = o),
      (r.MarkType = t),
      (r.IsTrace = !1),
      (r.MarkInfo = ""),
      (r.MapId = 0),
      r
    );
  }
  LIi(e, t, o) {
    var r = Protocol_1.Aki.Protocol.MapMarkRequest.create(),
      e = this.TIi(e, t, o);
    return (r.MarkPointRequestInfo = e), r;
  }
  cIi(e) {
    let t = void 0;
    return (
      (t =
        0 === e.PosZ
          ? Vector2D_1.Vector2D.Create(e.PosX, e.PosY)
          : Vector_1.Vector.Create(e.PosX, e.PosY, e.PosZ)),
      new MapDefine_1.DynamicMarkCreateInfo(
        t,
        e.ConfigId,
        MarkItemDataUtil_1.MarkItemDataUtil.TransformMarkTypeToClient(
          e.MarkType
        ),
        e.MarkId ?? void 0
      )
    );
  }
  OnDestroy() {}
  OnRegisterNetEvent() {
    Net_1.Net.Register(NetDefine_1.ENotifyMessageId.MapTraceNotify, this.hIi),
      Net_1.Net.Register(
        NetDefine_1.ENotifyMessageId.MapCancelTraceNotify,
        this.lIi
      ),
      Net_1.Net.Register(
        NetDefine_1.ENotifyMessageId.MapMarkInfoNotify,
        this._Ii
      ),
      Net_1.Net.Register(
        NetDefine_1.ENotifyMessageId.AddMarkInfoNotify,
        this.uIi
      ),
      Net_1.Net.Register(
        NetDefine_1.ENotifyMessageId.UnlockMarkNotify,
        this.dIi
      ),
      Net_1.Net.Register(
        NetDefine_1.ENotifyMessageId.RemoveMarkInfoNotify,
        this.CIi
      ),
      Net_1.Net.Register(
        NetDefine_1.ENotifyMessageId.TemporaryTeleportAllInfoNotify,
        this.fIi
      ),
      Net_1.Net.Register(
        NetDefine_1.ENotifyMessageId.AddTemporaryTeleportInfoNotify,
        this.vIi
      ),
      Net_1.Net.Register(
        NetDefine_1.ENotifyMessageId.TemporaryTeleportChangeNotify,
        this.pIi
      ),
      Net_1.Net.Register(
        NetDefine_1.ENotifyMessageId.RemoveTemporaryTeleportNotify,
        this.MIi
      ),
      Net_1.Net.Register(
        NetDefine_1.ENotifyMessageId.MapMarkShowIdInfoUpdateNotify,
        this.gIi
      ),
      Net_1.Net.Register(
        NetDefine_1.ENotifyMessageId.OccupationInfoNotify,
        this.EIi
      ),
      Net_1.Net.Register(
        NetDefine_1.ENotifyMessageId.AddOccupationInfoNotify,
        this.SIi
      ),
      Net_1.Net.Register(
        NetDefine_1.ENotifyMessageId.RemoveOccupationInfoNotify,
        this.yIi
      );
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(NetDefine_1.ENotifyMessageId.MapTraceNotify),
      Net_1.Net.UnRegister(NetDefine_1.ENotifyMessageId.MapCancelTraceNotify),
      Net_1.Net.UnRegister(NetDefine_1.ENotifyMessageId.MapMarkInfoNotify),
      Net_1.Net.UnRegister(NetDefine_1.ENotifyMessageId.AddMarkInfoNotify),
      Net_1.Net.UnRegister(NetDefine_1.ENotifyMessageId.RemoveMarkInfoNotify),
      Net_1.Net.UnRegister(NetDefine_1.ENotifyMessageId.UnlockMarkNotify),
      Net_1.Net.UnRegister(
        NetDefine_1.ENotifyMessageId.TemporaryTeleportAllInfoNotify
      ),
      Net_1.Net.UnRegister(
        NetDefine_1.ENotifyMessageId.AddTemporaryTeleportInfoNotify
      ),
      Net_1.Net.UnRegister(
        NetDefine_1.ENotifyMessageId.TemporaryTeleportChangeNotify
      ),
      Net_1.Net.UnRegister(
        NetDefine_1.ENotifyMessageId.RemoveTemporaryTeleportNotify
      ),
      Net_1.Net.UnRegister(
        NetDefine_1.ENotifyMessageId.MapMarkShowIdInfoUpdateNotify
      ),
      Net_1.Net.UnRegister(NetDefine_1.ENotifyMessageId.OccupationInfoNotify);
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.AddEntity, this.gpe),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RemoveEntity,
        this.fpe
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnUseMapExploreToolSuccess,
        this.IIi
      );
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.AddEntity,
      this.gpe
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RemoveEntity,
        this.fpe
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnUseMapExploreToolSuccess,
        this.IIi
      );
  }
  UseExploreToolCall(e, t, o, r) {
    switch (o) {
      case 1011:
        0 !== r.DetectionEntityPosInfo.length &&
          this.DIi(
            Vector_1.Vector.Create(r.DetectionEntityPosInfo[0].Pos),
            r.DetectionEntityPosInfo[0].ConfigId
          );
        break;
      case 1012:
        this.RIi(e, r.DetectionSlotId, r.DetectionEntityPosInfo);
    }
  }
  async RequestUseDetectionSkill(e, t, o) {
    var r = Protocol_1.Aki.Protocol.UseDetectionSkillRequest.create(),
      e =
        ((r.ConfirmUseDetectionSkill = !0),
        (r.Pos = e),
        (r.Rot = t),
        (r.SkillId = o),
        await Net_1.Net.CallAsync(
          NetDefine_1.ERequestMessageId.UseDetectionSkillRequest,
          r
        ));
    if (e) {
      if (e.Code === Protocol_1.Aki.Protocol.ErrorCode.Success) return e;
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
        e.Code,
        NetDefine_1.EResponseMessageId.UseDetectionSkillResponse
      );
    }
  }
  RIi(e, t, o) {
    var r = this.LIi(
      e,
      Protocol_1.Aki.Protocol.PbMapMarkType.ENUMS.TreasureBoxPoint,
      ConfigManager_1.ConfigManager.MapConfig.GetDefaultDetectorMarkConfigId()
    );
    (r.TreasureBoxParam = Protocol_1.Aki.Protocol.TreasureBoxParam.create()),
      (r.TreasureBoxParam.DetectionSlotId = t),
      (r.TreasureBoxParam.TreasureBox = []);
    for (const _ of o) {
      var a = this.TIi(
        Vector_1.Vector.Create(_.Pos),
        Protocol_1.Aki.Protocol.PbMapMarkType.ENUMS.TreasureBox,
        ConfigManager_1.ConfigManager.MapConfig.GetDefaultDetectorMarkConfigId()
      );
      (a.EntityConfigId = _.ConfigId), r.TreasureBoxParam.TreasureBox.push(a);
    }
    Net_1.Net.Call(NetDefine_1.ERequestMessageId.MapMarkRequest, r, (e) => {
      e.ErrorCode !== Protocol_1.Aki.Protocol.ErrorCode.Success &&
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          e.ErrorCode,
          NetDefine_1.EResponseMessageId.MapMarkResponse
        );
    });
  }
  DIi(e, t) {
    e = this.LIi(
      e,
      Protocol_1.Aki.Protocol.PbMapMarkType.ENUMS.SoundBox,
      ConfigManager_1.ConfigManager.MapConfig.GetDefaultDetectorMarkConfigId()
    );
    (e.MarkPointRequestInfo.EntityConfigId = t),
      Net_1.Net.Call(NetDefine_1.ERequestMessageId.MapMarkRequest, e, (e) => {
        e.ErrorCode !== Protocol_1.Aki.Protocol.ErrorCode.Success &&
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.ErrorCode,
            NetDefine_1.EResponseMessageId.MapMarkResponse
          );
      });
  }
  mIi(e, t, o, r = !0) {
    (ModelManager_1.ModelManager.OnlineModel.GetIsTeamModel() &&
      !ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam()) ||
      ((t = { MarkId: t, MarkType: e, OpenAreaId: 0, IsNotFocusTween: !r }),
      WorldMapController_1.WorldMapController.OpenView(2, !1, t, o));
  }
  async RequestTrackInfo() {
    var e = Protocol_1.Aki.Protocol.MapTraceInfoRequest.create(),
      e = await Net_1.Net.CallAsync(
        NetDefine_1.ERequestMessageId.MapTraceInfoRequest,
        e
      );
    if (e)
      if (e.ErrorCode !== Protocol_1.Aki.Protocol.ErrorCode.Success)
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          e.ErrorCode,
          NetDefine_1.EResponseMessageId.MapTraceInfoResponse
        );
      else
        for (const r of e.MarkIdList) {
          var t =
              ConfigManager_1.ConfigManager.MapConfig.SearchGetMarkConfig(r),
            o = this.UIi(r),
            t = {
              TrackSource: 1,
              MarkType: t?.ObjectType,
              Id: r,
              IconPath: o.Icon,
              TrackTarget: o.TrackTarget,
            };
          ModelManager_1.ModelManager.TrackModel.AddTrackData(t),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.TrackMark,
              t
            );
        }
  }
  UIi(t) {
    var o = ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(t);
    if (o)
      return {
        Icon: MarkItemDataUtil_1.MarkItemDataUtil.GetMarkIcon(t) ?? "",
        TrackTarget: o.EntityConfigId ?? Vector_1.Vector.Create(o.MarkVector),
      };
    o = ModelManager_1.ModelManager.MapModel.GetDynamicMarkInfoById(t);
    if (o) {
      (t = ConfigManager_1.ConfigManager.MapConfig.GetCustomMarkConfig(
        o.MarkConfigId
      )),
        (o = o.TrackTarget);
      let e = void 0;
      return (
        o instanceof Vector_1.Vector
          ? (e = MapUtil_1.MapUtil.UiPosition2WorldPosition(o))
          : o instanceof Vector2D_1.Vector2D &&
            ((o = Vector_1.Vector.Create(o.X, -o.Y, 0)),
            (e = MapUtil_1.MapUtil.UiPosition2WorldPosition(o))),
        { Icon: t.MarkPic, TrackTarget: e }
      );
    }
    return { Icon: "", TrackTarget: Vector_1.Vector.Create(0, 0, 0) };
  }
  RequestMapMarkReplace(e, t) {
    e = Protocol_1.Aki.Protocol.MapReplaceMarkRequest.create({
      MarkId: e,
      ConfigId: t,
    });
    Net_1.Net.Call(
      NetDefine_1.ERequestMessageId.MapReplaceMarkRequest,
      e,
      (e) => {
        ModelManager_1.ModelManager.MapModel.ReplaceCustomMarkIcon(
          e.MarkId,
          e.ConfigId
        );
      }
    );
  }
  RequestCreateCustomMark(e, t) {
    var o;
    e
      ? ModelManager_1.ModelManager.MapModel.GetMarkCountByType(9) >=
          ModelManager_1.ModelManager.WorldMapModel.CustomMarkSize ||
        ((o = e instanceof Vector_1.Vector ? e.Z : 0),
        (e = this.LIi(
          Vector_1.Vector.Create(e.X, e.Y, o),
          Protocol_1.Aki.Protocol.PbMapMarkType.ENUMS.Custom,
          t
        )),
        Net_1.Net.Call(NetDefine_1.ERequestMessageId.MapMarkRequest, e, (e) => {
          e.ErrorCode !== Protocol_1.Aki.Protocol.ErrorCode.Success &&
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.ErrorCode,
              NetDefine_1.EResponseMessageId.MapMarkResponse
            );
        }))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("Map", 19, "向服务器请求创建标记时，坐标不存在");
  }
  RequestCreateTemporaryTeleport(e, t = void 0) {
    e = this.LIi(
      e,
      Protocol_1.Aki.Protocol.PbMapMarkType.ENUMS.TemporaryTeleport,
      ConfigManager_1.ConfigManager.MapConfig.GetDefaultTemporaryTeleportMarkConfigId()
    );
    void 0 !== t && (e.TemporaryTeleportParam = { TemporaryTeleportId: t }),
      Net_1.Net.Call(NetDefine_1.ERequestMessageId.MapMarkRequest, e, (e) => {
        e.ErrorCode !== Protocol_1.Aki.Protocol.ErrorCode.Success &&
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.ErrorCode,
            NetDefine_1.EResponseMessageId.MapMarkResponse
          );
      });
  }
  RequestRemoveMapMark(t, e) {
    e = Protocol_1.Aki.Protocol.MapRemoveMarkRequest.create({ MarkId: e });
    Net_1.Net.Call(
      NetDefine_1.ERequestMessageId.MapRemoveMarkRequest,
      e,
      (e) => {
        e.ErrorCode !== Protocol_1.Aki.Protocol.ErrorCode.Success
          ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.ErrorCode,
              NetDefine_1.EResponseMessageId.MapRemoveMarkResponse
            )
          : ModelManager_1.ModelManager.MapModel.RemoveMapMark(t, e.MarkId);
      }
    );
  }
  RequestRemoveDynamicMapMark(e) {
    var t = ModelManager_1.ModelManager.MapModel.GetDynamicMark(e);
    void 0 === t
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error("Map", 50, "找不到对应mark id:", ["markId", e])
      : this.RequestRemoveMapMark(t.MarkType, t.MarkId);
  }
  RequestTrackMapMark(t, o) {
    var e;
    o < 0
      ? (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Map", 50, "markId小于0, 请求追踪信息未发给后端"),
        ModelManager_1.ModelManager.MapModel.SetTrackMark(t, o, !0))
      : ((e = Protocol_1.Aki.Protocol.MapTraceRequest.create({ MarkId: o })),
        Net_1.Net.Call(
          NetDefine_1.ERequestMessageId.MapTraceRequest,
          e,
          (e) => {
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("Map", 50, "向服务端请求追踪标记: 标记id:", [
                "markId",
                o,
              ]),
              e.ErrorCode !== Protocol_1.Aki.Protocol.ErrorCode.Success
                ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                    e.ErrorCode,
                    NetDefine_1.EResponseMessageId.MapTraceResponse
                  )
                : ModelManager_1.ModelManager.MapModel.SetTrackMark(
                    t,
                    e.MarkId,
                    !0
                  );
          }
        ));
  }
  RequestCancelTrackMapMark(t, o) {
    var e;
    o < 0
      ? (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Map", 50, "markId小于0, 请求取消追踪信息未发给后端"),
        ModelManager_1.ModelManager.MapModel.SetTrackMark(t, o, !1))
      : ((e = Protocol_1.Aki.Protocol.MapCancelTraceRequest.create({
          MarkId: o,
        })),
        Net_1.Net.Call(
          NetDefine_1.ERequestMessageId.MapCancelTraceRequest,
          e,
          (e) => {
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("Map", 50, "向服务端请求取消追踪标记: 标记id:", [
                "markId",
                o,
              ]),
              e.ErrorCode !== Protocol_1.Aki.Protocol.ErrorCode.Success
                ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                    e.ErrorCode,
                    NetDefine_1.EResponseMessageId.MapCancelTraceResponse
                  )
                : ModelManager_1.ModelManager.MapModel.SetTrackMark(
                    t,
                    e.MarkId,
                    !1
                  );
          }
        ));
  }
  RequestTeleportToTargetByTemporaryTeleport(e, t) {
    var o = Protocol_1.Aki.Protocol.TeleportToTargetRequest.create(),
      r = Protocol_1.Aki.Protocol.Rotator.create();
    (r.Pitch = t.Pitch),
      (r.Roll = t.Roll),
      (r.Yaw = t.Yaw),
      (o.temporaryTeleportId = e),
      (o.Rot = r),
      Net_1.Net.Call(
        NetDefine_1.ERequestMessageId.TeleportToTargetRequest,
        o,
        (e) => {
          e.errCode !== Protocol_1.Aki.Protocol.ErrorCode.Success &&
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.errCode,
              NetDefine_1.EResponseMessageId.MapCancelTraceResponse
            );
        }
      );
  }
  UpdateCustomMapMarkPosition(e, t) {
    e = Protocol_1.Aki.Protocol.MapMarkInfoUpdateRequest.create({
      MarkId: e,
      PosZ: t,
    });
    Net_1.Net.Call(
      NetDefine_1.ERequestMessageId.MapMarkInfoUpdateRequest,
      e,
      (e) => {
        e.ErrorCode !== Protocol_1.Aki.Protocol.ErrorCode.Success &&
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.ErrorCode,
            NetDefine_1.EResponseMessageId.MapMarkInfoUpdateResponse
          );
      }
    );
  }
}
exports.MarkAssistant = MarkAssistant;
//# sourceMappingURL=MarkAssistant.js.map

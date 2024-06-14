"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TeleportAssistant = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
puerts_1 = require("puerts"),
  NetDefine_1 = require("../../../../Core/Define/Net/NetDefine"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../../Core/Net/Net"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  ControllerAssistantBase_1 = require("../../GeneralLogicTree/ControllerAssistant/ControllerAssistantBase"),
  LevelLoadingController_1 = require("../../LevelLoading/LevelLoadingController"),
  ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
  WorldMapController_1 = require("../../WorldMap/WorldMapController"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  GM_UNLOCK_ALL_TELEPORT = "activateteleport 0";
class TeleportAssistant extends ControllerAssistantBase_1.ControllerAssistantBase {
  constructor() {
    super(...arguments),
      (this.AIi = void 0),
      (this.xIi = ""),
      (this.PIi = 0),
      (this.wIi = !1),
      (this.DK = !1),
      (this.BIi = (e) => {
        ModelManager_1.ModelManager.MapModel.UnlockTeleports(e.Ids),
          (ModelManager_1.ModelManager.GameModeModel.IsMulti &&
            ModelManager_1.ModelManager.PlayerInfoModel.GetId() !==
              ModelManager_1.ModelManager.CreatureModel.GetWorldOwner()) ||
            this.bIi(e.Ids);
      }),
      (this.qIi = () => {
        LevelLoadingController_1.LevelLoadingController.CloseLoading(
          0,
          () => {
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.BlackScreenFadeOnPlotToWorldMap
            );
          },
          1
        );
      }),
      (this.E7e = (e) => {
        e.FlowListName === this.xIi &&
          e.FlowId === this.PIi &&
          ((this.DK = !1),
          1 === this.AIi.Type
            ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                "TeleporterUnlockBig"
              )
            : ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                "TeleporterUnlock"
              ),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Plot", 39, "Close PlotView And Open WorldMapView"),
          (e = { MarkType: 0, MarkId: 0, OpenAreaId: this.AIi.FogId }),
          EventSystem_1.EventSystem.Once(
            EventDefine_1.EEventName.WorldMapViewOpened,
            this.qIi
          ),
          WorldMapController_1.WorldMapController.OpenView(2, !1, e),
          (this.xIi = void 0),
          (this.PIi = void 0));
      }),
      (this.GIi = (e) => {
        e.toLowerCase() === GM_UNLOCK_ALL_TELEPORT && (this.wIi = !0);
      });
  }
  OnDestroy() {
    (this.AIi = void 0),
      (this.xIi = void 0),
      (this.PIi = void 0),
      (this.wIi = void 0),
      (this.DK = void 0);
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(
      NetDefine_1.ENotifyMessageId.TeleportUpdateNotify,
      this.BIi
    );
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(NetDefine_1.ENotifyMessageId.TeleportUpdateNotify);
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.PlotNetworkEnd,
      this.E7e
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnExecuteServerGm,
        this.GIi
      );
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.PlotNetworkEnd,
      this.E7e
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnExecuteServerGm,
        this.GIi
      );
  }
  bIi(e) {
    var t;
    this.wIi ||
      this.DK ||
      (e &&
        0 !== e.length &&
        (e = ConfigManager_1.ConfigManager.MapConfig.GetTeleportConfigById(
          e[0]
        )) &&
        !StringUtils_1.StringUtils.IsEmpty(e.Plot) &&
        2 < (t = e.Plot.split(",")).length &&
        ((this.xIi = t[0]),
        (this.PIi = Number(t[1])),
        (t = Number(t[2])),
        (this.AIi = e),
        (this.DK = !0),
        ControllerHolder_1.ControllerHolder.FlowController.StartFlow(
          this.xIi,
          this.PIi,
          t
        )));
  }
  async RequestTeleportData() {
    var e = Protocol_1.Aki.Protocol.TeleportDataRequest.create(),
      e = await Net_1.Net.CallAsync(
        NetDefine_1.ERequestMessageId.TeleportDataRequest,
        e
      );
    e &&
      (e.ErrCode !== Protocol_1.Aki.Protocol.ErrorCode.Success
        ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.ErrCode,
            NetDefine_1.EResponseMessageId.TeleportDataResponse
          )
        : ModelManager_1.ModelManager.MapModel.UnlockTeleports(e.Ids, !0));
  }
  RequestUnlockTeleport(t) {
    puerts_1.logger.info("[KUNDEBUG]:RequestUnlockTeleport parameter:",t );
    var e = Protocol_1.Aki.Protocol.UnlockTeleportRequest.create({ Id: t });
    Net_1.Net.Call(
      NetDefine_1.ERequestMessageId.UnlockTeleportRequest,
      e,
      (e) => {
        e.ErrorCode !== Protocol_1.Aki.Protocol.ErrorCode.Success
          ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.ErrorCode,
              NetDefine_1.EResponseMessageId.UnlockTeleportResponse
            )
          : ModelManager_1.ModelManager.MapModel.UnlockTeleport(t);
      }
    );
  }
}
exports.TeleportAssistant = TeleportAssistant;
//# sourceMappingURL=TeleportAssistant.js.map

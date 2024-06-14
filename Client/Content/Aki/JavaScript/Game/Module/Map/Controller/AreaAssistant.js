"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AreaAssistant = void 0);
const NetDefine_1 = require("../../../../Core/Define/Net/NetDefine"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../../Core/Net/Net"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  ControllerAssistantBase_1 = require("../../GeneralLogicTree/ControllerAssistant/ControllerAssistantBase"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class AreaAssistant extends ControllerAssistantBase_1.ControllerAssistantBase {
  constructor() {
    super(...arguments),
      (this.rIi = (e) => {
        ModelManager_1.ModelManager.MapModel.AddUnlockedAreas(e.FieldId);
      });
  }
  OnDestroy() {}
  OnRegisterNetEvent() {
    Net_1.Net.Register(
      NetDefine_1.ENotifyMessageId.MapUnlockFieldNotify,
      this.rIi
    );
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(NetDefine_1.ENotifyMessageId.MapUnlockFieldNotify);
  }
  async RequestUnlockedAreaInfo() {
    var e = Protocol_1.Aki.Protocol.MapUnlockFieldInfoRequest.create(),
      e = await Net_1.Net.CallAsync(
        NetDefine_1.ERequestMessageId.MapUnlockFieldInfoRequest,
        e
      );
    if (e)
      if (e.ErrorCode !== Protocol_1.Aki.Protocol.ErrorCode.Success)
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          e.ErrorCode,
          NetDefine_1.EResponseMessageId.MapUnlockFieldInfoResponse
        );
      else
        for (const r of e.FieldId)
          ModelManager_1.ModelManager.MapModel.AddUnlockedAreas(r);
  }
}
exports.AreaAssistant = AreaAssistant;
//# sourceMappingURL=AreaAssistant.js.map

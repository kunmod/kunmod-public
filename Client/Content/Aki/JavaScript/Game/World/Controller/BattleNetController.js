"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleNetController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Time_1 = require("../../../Core/Common/Time"),
  NetDefine_1 = require("../../../Core/Define/Net/NetDefine"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  ModManager_1 = require("../../Manager/ModManager"),
  REQUEST_TIME_GAP = 2e3;
class BattleNetController {
  static async RequestCaptureEntity(e) {
    var t = Time_1.Time.Now;
    if ((t - this.hmo < REQUEST_TIME_GAP)&&ModManager_1.ModManager.Settings.AutoAbsorb) return !1;
    this.hmo = t;
    var r,
      t = ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(e);
    return ModelManager_1.ModelManager.CreatureModel.GetEntity(t)
      ? (((r = Protocol_1.Aki.Protocol.CaptureEntityRequest.create()).Id =
          MathUtils_1.MathUtils.NumberToLong(t)),
        !(
          !(r = await Net_1.Net.CallAsync(
            NetDefine_1.ERequestMessageId.CaptureEntityRequest,
            r
          )) ||
          (0 !== r.ErrCode &&
            (Log_1.Log.CheckError() &&
              Log_1.Log.Error("Level", 30, "幻象收复失败", [
                "ErrCode",
                r.ErrCode,
              ]),
            1))
        ))
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "World",
            30,
            "[CreatureController.RequestCaptureEntity] 请求幻象收复失败, Entity为空。",
            ["CreatureDataId", t],
            ["EntityId", e]
          ),
        !1);
  }
}
(exports.BattleNetController = BattleNetController).hmo = 0;
//# sourceMappingURL=BattleNetController.js.map

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ModMethod = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  NetDefine_1 = require("../../../Core/Define/Net/NetDefine"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ModManager_1 = require("../ModManager"),
  ModelManager_1 = require("../ModelManager"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  AudioSystem_1 = require("../../../Core/Audio/AudioSystem"),
  Global_1 = require("../../Global"),
  GlobalData_1 = require("../../GlobalData"),
  CombatMessage_1 = require("../../Module/CombatMessage/CombatMessage"),
  BattleNetController_1 = require("../../World/Controller/BattleNetController"), //add
  LevelGamePlayController_1 = require("../../LevelGamePlay/LevelGamePlayController"),
  UiManager_1 = require("../../../Ui/UiManager");

class ModMethod {
  //怪物淹死
  static MonsterDrownRequest(entity) {
    CombatMessage_1.CombatNet.Call(
      NetDefine_1.ERequestMessageId.MonsterDrownRequest,
      entity,
      Protocol_1.Aki.Protocol.MonsterDrownRequest.create()
    );
  }

  static ThrowDamageChangeRequest(Entity, count, DamageId) {
    for (let i = 0; i < count; i++) {
      LevelGamePlayController_1.LevelGamePlayController.ThrowDamageChangeRequest(
        Entity.Id,
        DamageId
      ); //  1604001001n 为女主的第一次平A的 DamageId
    }
  }
  //吸收尸体
  static RequestCaptureEntity(entity) {
    BattleNetController_1.BattleNetController.RequestCaptureEntity(entity.Id);
  }
}
//puerts.logger.info(debug)
exports.ModMethod = ModMethod;

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.KillAura = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  ModManager_1 = require("../ModManager"),
  ModUtils_1 = require("./ModUtils"),
  ModMethod_1 = require("./ModMethod"),
  EntityManager_1 = require("./EntityManager");

const ModMethod = ModMethod_1.ModMethod;
const ModManager = ModManager_1.ModManager;
const EntityManager = EntityManager_1.ModsEntityManager;

class KillAura extends EntityManager {
  static killAura(entity) {
    if (ModManager.Settings.killAuranew && this.isMonster(entity)) {
      ModMethod.MonsterDrownRequest(entity.Entity);
    }
  }
}
//puerts.logger.info(debug)
exports.KillAura = KillAura;

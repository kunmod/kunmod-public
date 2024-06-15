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
const ModUtils = ModUtils_1.ModUtils;

class KillAura extends EntityManager {
  static isIndistance(entity) {
    let monsterPos = this.GetPosition(entity);
    let distance = ModUtils.Getdistance2Player(monsterPos);
    if (distance < ModManager.Settings.killAuraRadius*100) {
      puerts_1.logger.warn(
        "kun:killAuratest:isIndistance",
        entity.Entity.Id,
        distance
      );
      return true;
    } else return false;
  }
  static killAura(entity) {
    if (
      ModManager.Settings.killAuranew &&
      this.isMonster(entity) &&
      this.isIndistance(entity)
    ) {
      puerts_1.logger.warn("kun:killAuratest:isMonster", entity.Entity.Id);
      ModMethod.MonsterDrownRequest(entity.Entity);
      puerts_1.logger.warn("kun:killAuratestEND", entity.Entity.Id);
    }
  }
}
//puerts.logger.info(debug)
exports.KillAura = KillAura;

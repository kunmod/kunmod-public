"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AutoDestroy = void 0);
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
const destroyList = [
  "Collect501", //红针晶簇
  "Collect502", //片蓝晶簇
  "Collect503", //萤耀晶簇
  "Collect504", //植珀
];
class AutoDestroy extends EntityManager {
  static isNeedDestroy(entity) {
    let blueprintType = this.GetBlueprintType(entity);
    return destroyList.includes(blueprintType);
  }

  static AutoDestroy(entity) {
    if (ModManager.Settings.AutoDestroy && this.isNeedDestroy(entity)) {
      //puerts_1.logger.warn("kun:AutoDestroy:isNeedDestroy",entity.Entity.Id);
      ModMethod.ThrowDamageChangeRequest(entity.Entity, 10, 1604001001n);
      //puerts_1.logger.warn("kun:AutoDestroy:End",entity.Entity.Id);
    }
  }
}
//puerts.logger.info(debug)
exports.AutoDestroy = AutoDestroy;

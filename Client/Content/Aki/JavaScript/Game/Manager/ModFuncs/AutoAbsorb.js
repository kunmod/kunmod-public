"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AutoAbsorb = void 0);
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
const EntityManager = EntityManager_1.EntityManager;

class AutoAbsorb extends EntityManager {
  static AutoAbsorb(entity) {
    if (ModManager.Settings.AutoAbsorbnew && this.isVision(entity)) {
      //puerts_1.logger.warn("kun:AutoAbsorbnew:isVision",entity.Entity.Id);
      //ModMethod.RequestCaptureEntity(entity.Entity);
      //puerts_1.logger.warn("kun:AutoAbsorbnew:End",entity.Entity.Id);
    }
  }
}
//puerts.logger.info(debug)
exports.AutoAbsorb = AutoAbsorb;

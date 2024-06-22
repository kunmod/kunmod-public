"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AutoPuzzle = void 0);
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
const destroyList = [];
class AutoPuzzle extends EntityManager {
  static isNeedDestroy(entity) {
    let blueprintType = this.GetBlueprintType2(entity);
    return destroyList.includes(blueprintType);
  }

  static AutoPuzzle(entity) {
    if (ModManager.Settings.AutoPuzzle) {
        this.Gameplay050(entity);
    }
  }

  static Gameplay050(entity) {
    //玩法_打击机关
    if(this.GetBlueprintType2(entity)=="Gameplay050")
    ModMethod.ThrowDamageChangeRequest(entity.Entity, 1, 1604001001n);
  }


  
}
//puerts.logger.info(debug)
exports.AutoPuzzle = AutoPuzzle;

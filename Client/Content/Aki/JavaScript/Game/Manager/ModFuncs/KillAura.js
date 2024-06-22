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
const EntityManager = EntityManager_1.EntityManager;
const ModUtils = ModUtils_1.ModUtils;
const AnimalList = [
  "Animal001", //紫喙鸽
  "Animal002", //青翎鸽
  "Animal003", //蓝冠鸽
  "Animal004", //灰冠鸥
  "Animal005", //赤脚雁
  "Animal006", //雪云鹤
  "Animal012", //青杂兔
  // "Animal013", //岩角羊
  // "Animal014", //灰脊牛
  // "Animal015", //森栖牛
];
const BigAnimalList = [
  "Animal013", //岩角羊
  "Animal014", //灰脊牛
  "Animal015", //森栖牛
];

class KillAura extends EntityManager {
  static isIndistance(entity) {
    let monsterPos = this.GetPosition(entity.Entity);
    let distance = ModUtils.Getdistance2Player(monsterPos);
    if (distance < ModManager.Settings.killAuraRadius * 100) {
      return true;
    } else return false;
  }

  static isneedkillAnimal(entity) {
    let blueprintType = this.GetBlueprintType2(entity);
    return AnimalList.includes(blueprintType);
  }
  static isneedkillAnimalBig(entity) {
    let blueprintType = this.GetBlueprintType2(entity);
    return BigAnimalList.includes(blueprintType);
  }
  static killAura(entity) {
    if (!ModManager.Settings.killAuranew) return;

    if (this.isMonster(entity) && this.isIndistance(entity)) {
      ModMethod.MonsterDrownRequest(entity.Entity);
       
      //ModMethod.LandingDamageRequest(entity.Entity);
      //puerts_1.logger.warn("kun:killAuratest:Monster:END", entity.Entity.Id);
    }
  }
  static KillAnimal(entity) {
    if ( !ModManager.Settings.KillAnimal)
      return;

    if (this.isneedkillAnimal(entity)) {
      ModMethod.AnimalDieRequest(entity.Entity);
      //ModMethod.AnimalDropRequest(entity.Entity);  
      return;
    }

  }
}

exports.KillAura = KillAura;

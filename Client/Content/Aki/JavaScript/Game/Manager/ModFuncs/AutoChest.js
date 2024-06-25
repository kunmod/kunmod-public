"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AutoChest = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  ModManager_1 = require("../ModManager"),
  ModUtils_1 = require("./ModUtils"),
  ModelManager_1 = require("../ModelManager"),
  EntityManager_1 = require("./EntityManager"),
  ModMethod_1 = require("./ModMethod");

const EntityManager = EntityManager_1.EntityManager;
const ModUtils = ModUtils_1.ModUtils;
const ModMethod = ModMethod_1.ModMethod;

class AutoChest extends EntityManager {


  static isNeedReward(entity) {
    let blueprintType = this.GetBlueprintType2(entity);
    if (this.ChestList.includes(blueprintType)) {
      // if (
      //   !entity.Entity.CheckGetComponent(114).IsLocked &&
      //   ModelManager_1.ModelManager.PlayerInfoModel.GetId() ===
      //     ModelManager_1.ModelManager.CreatureModel.GetWorldOwner()
      // ) {
        return true;
     // }
    }
    return false;
  }

  static RewardChest(entity) {
    if (!ModManager_1.ModManager.Settings.AutoChest) return;

    if (this.isNeedReward(entity)) {
      puerts_1.logger.info("kun宝箱start")
      ModMethod.RewardChest(entity.Entity);
      puerts_1.logger.info("kun宝箱end")
    }
  }
}

exports.AutoChest = AutoChest;

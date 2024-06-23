"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PerceptionRange = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  ModManager_1 = require("../ModManager"),
  ModelManager_1 = require("../ModelManager"),
  ModUtils_1 = require("./ModUtils"),
  ModMethod_1 = require("./ModMethod"),
  AutoInteract_1 = require("./AutoInteract"),
  EntityManager_1 = require("./EntityManager");

const ModMethod = ModMethod_1.ModMethod;
const ModManager = ModManager_1.ModManager;
const EntityManager = EntityManager_1.EntityManager;

class PerceptionRange extends EntityManager {

  static isNeedInteract(entity) {
    let blueprintType = this.GetBlueprintType2(entity);

    return (
      [].includes(blueprintType) ||
      blueprintType.startsWith("Teleport") ||
      blueprintType.startsWith("Treasure") ||
      blueprintType.startsWith("Vision")
    );
  }
  static SetInteractRange(entity) {
    if (!ModManager.Settings.PerceptionRange) return;
    if (AutoInteract_1.AutoInteract.isNeedLoot(entity)) {
      let PawnPerceptionComponen = entity.Entity.GetComponent(104);
      PawnPerceptionComponen.SetInteractRange(30000, 0);
    }
  }
}

exports.PerceptionRange = PerceptionRange;

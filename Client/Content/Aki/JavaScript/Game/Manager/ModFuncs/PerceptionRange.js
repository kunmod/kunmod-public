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
  EntityManager_1 = require("./EntityManager"),
  AutoInteraction_1 = require("./AutoInteraction");

const ModMethod = ModMethod_1.ModMethod;
const ModManager = ModManager_1.ModManager;
const EntityManager = EntityManager_1.EntityManager;
const AutoIntraction = AutoInteraction_1.AutoInteraction;

class PerceptionRange extends EntityManager {
  static SetCollection(entity) {
    if (this.isCollection(entity)) {
      let PawnPerceptionComponent = entity.Entity.GetComponent(104);
      try {
        PawnPerceptionComponent.SetInteractRange(100000000 * 100);
      } catch (error) {

      }
    }
  }

  static SetTeleport(entity) {
    if (this.isTeleport(entity)) {
      let PawnPerceptionComponent = entity.Entity.GetComponent(104);
      try {
        PawnPerceptionComponent.SetInteractRange(100000000 * 100);
      } catch (error) {

      }
    }
  }

  static SetTreasure(entity) {
    if (this.isTreasure(entity)) {
      let PawnPerceptionComponent = entity.Entity.GetComponent(104);
      try {
        PawnPerceptionComponent.SetInteractRange(100000000 * 100);
      } catch (error) {

      }
    }
  }
}

exports.PerceptionRange = PerceptionRange;

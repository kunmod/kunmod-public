"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PerceptionRange = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  ModManager_1 = require("../ModManager"),
  ModMethod_1 = require("./ModMethod"),
  EntityManager_1 = require("./EntityManager");

const EntityManager = EntityManager_1.EntityManager;

class PerceptionRange extends EntityManager {
  static SetCollection(entity) {
    if (this.isCollection(entity)) {
      PerceptionRange.SetInteractRange(entity);
    }
  }

  static SetTeleport(entity) {
    if (this.isTeleport(entity)) {
      PerceptionRange.SetInteractRange(entity);
    }
  }

  static SetTreasure(entity) {
    if (this.isTreasure(entity)) {
      PerceptionRange.SetInteractRange(entity);
    }
  }

  static SetVision(entity) {
    if (this.isVision(entity)) {
      PerceptionRange.SetInteractRange(entity);
    }
  }

  static SetInteractRange(entity) {
    let PawnPerceptionComponent = entity.Entity.GetComponent(104);
    try {
      PawnPerceptionComponent.SetInteractRange(100000000 * 100);
    } catch (error) {

    }
  }
}

exports.PerceptionRange = PerceptionRange;

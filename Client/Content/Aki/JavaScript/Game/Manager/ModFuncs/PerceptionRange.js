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
  const Range = 1e50;

const EntityManager = EntityManager_1.EntityManager;

class PerceptionRange extends EntityManager {
  static SetCollection(entity) {
    if (this.isCollection(entity)) {
      PerceptionRange.SetInteractRange(entity, Range * 100);
    }
  }

  static SetTeleport(entity) {
    if (this.isTeleport(entity)) {
      PerceptionRange.SetInteractRange(entity, Range * 100);
    }
  }

  static SetTreasure(entity) {
    if (this.isTreasure(entity)) {
      PerceptionRange.SetInteractRange(entity, Range * 100);
    }
  }

  static SetVision(entity) {
    if (this.isVision(entity)) {
      PerceptionRange.SetInteractRange(entity, Range * 100);
    }
  }

  static SetSonanceCasket(entity) {
    if (this.isSonanceCasket(entity)) {
      PerceptionRange.SetInteractRange(entity, Range * 100);
    }
  }

  static SetAll(entity) {
    if (
      this.isCollection(entity) ||
      this.isTeleport(entity) ||
      this.isTreasure(entity) ||
      this.isVision(entity) ||
      this.isSonanceCasket(entity)
    ) {
      PerceptionRange.SetInteractRange(entity, Range*100);
    }
  }

  static SetInteractRange(entity, range) {
    let PawnPerceptionComponent = entity.Entity.GetComponent(104);
    try {
      PawnPerceptionComponent.SetInteractRange(range,0);
    } catch (error) {}
  }
}

exports.PerceptionRange = PerceptionRange;

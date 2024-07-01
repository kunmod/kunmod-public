"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PerceptionRange = void 0);
const EntityManager_1 = require("./EntityManager"),
  Range = 1e50;

const EntityManager = EntityManager_1.EntityManager;
const { EntityFilter } = require("./EntityFilter");

class PerceptionRange extends EntityManager {
  static SetCollection(entity) {
    if (EntityFilter.isneedLoot(this.GetBlueprintType2(entity))) {
      PerceptionRange.SetInteractRange(entity, Range * 100);
    }
  }

  static SetTeleport(entity) {
    if (this.isTeleport(entity)) {
      PerceptionRange.SetInteractRange(entity, Range * 100);
    }
  }

  static SetTreasure(entity) {
    if (EntityFilter.isneedTreasure(this.GetBlueprintType2(entity))) {
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
    // Set All Entities Perception Range
    if (
      this.isCollection(entity) ||
      this.isTeleport(entity) ||
      this.isVision(entity) ||
      EntityFilter.isneedTreasure(this.GetBlueprintType2(entity))||
      EntityFilter.isFilter(EntityFilter.CasketDelivery,this.GetBlueprintType2(entity))
    )
      PerceptionRange.SetInteractRange(entity, Range * 100);
  }

  static SetInteractRange(entity, range) {
    let PawnPerceptionComponent = entity.Entity.GetComponent(104);
    try {
      PawnPerceptionComponent.SetInteractRange(range, 0);
    } catch (error) {}
  }
}

exports.PerceptionRange = PerceptionRange;

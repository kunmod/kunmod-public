"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PerceptionRange = void 0);
let EntityManager_1 = require("./EntityManager"),
  EntityFilter_1 = require("./EntityFilter"),
  Range = 1e50;

class PerceptionRange extends EntityManager_1.EntityManager {
  static SetCollection(entity) {
    if (EntityFilter_1.EntityFilter.isneedLoot(this.GetBlueprintType2(entity))) {
      PerceptionRange.SetInteractRange(entity, Range * 100);
    }
  }

  static SetTeleport(entity) {
    if (this.isTeleport(entity)) {
      PerceptionRange.SetInteractRange(entity, Range * 100);
    }
  }

  static SetTreasure(entity) {
    if (EntityFilter_1.EntityFilter.isneedTreasure(this.GetBlueprintType2(entity))) {
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
      EntityFilter_1.EntityFilter.isneedTreasure(this.GetBlueprintType2(entity)) ||
      EntityFilter_1.EntityFilter.isFilter(
        EntityFilter_1.EntityFilter.CasketDelivery,
        this.GetBlueprintType2(entity)
      )
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

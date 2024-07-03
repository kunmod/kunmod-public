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
  LevelGamePlayController_1 = require("../../LevelGamePlay/LevelGamePlayController"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  EntityManager_1 = require("./EntityManager");

const HitGearList = [
  "Gameplay050", //玩法_打击机关
  "Gameplay059", //射击靶
  "Gameplay060", //藤曼玩法_禁锢陷阱
  "Gameplay311", //光幕锁
];

const SetGuidelist = [
  "Gameplay111", //隙声蝶
];

class AutoPuzzle extends EntityManager_1.EntityManager {
  static isneed(entity, list) {
    let blueprintType = this.GetBlueprintType2(entity);
    return list.includes(blueprintType);
  }

  static AutoPuzzle(entity) {
    if (ModManager_1.ModManager.Settings.AutoPuzzle) {
      this.HitGear(entity);
      this.Gameplay004(entity);
      this.SetGuideRange(entity);
    }
  }

  static HitGear(entity) {
    if (this.isneed(entity, HitGearList)) {
      //if (entity.Entity.GetComponent(116).IsInState(3)) return;//不确定3
      LevelGamePlayController_1.LevelGamePlayController.ShootTargetHitGearStateChangeRequest(
        entity.Entity.Id,
        (e) => {
          if (e && entity.Entity?.Valid)
            EventSystem_1.EventSystem.EmitWithTarget(
              entity.Entity,
              EventDefine_1.EEventName.UpdateSceneItemState
            );
        }
      );
    }
  }

  static Gameplay004(entity) {
    if (this.GetBlueprintType2(entity) == "Gameplay004") {
      ModMethod_1.ModMethod.ThrowDamageChangeRequest(entity.Entity, 3, 210002001n); //爆裂鸣晶demageid Gameplay018
    }
  }

  static SetGuideRange(entity) {
    if (this.isneed(entity, SetGuidelist)) {
      let PawnPerceptionComponent = entity.Entity.GetComponent(104);
      try {
        PawnPerceptionComponent.SetGuideRange(1e9);
      } catch (error) {}
    }
  }
}

exports.AutoPuzzle = AutoPuzzle;

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

const ModMethod = ModMethod_1.ModMethod;
const ModManager = ModManager_1.ModManager;
const EntityManager = EntityManager_1.EntityManager;
const HitGearList = [
  "Gameplay050", //玩法_打击机关
];
class AutoPuzzle extends EntityManager {
  static isHitGear(entity) {
    let blueprintType = this.GetBlueprintType2(entity);
    return HitGearList.includes(blueprintType);
  }

  static AutoPuzzle(entity) {
    if (ModManager.Settings.AutoPuzzle) {
      this.HitGear(entity);
    }
  }

  static HitGear(entity) {
    if (this.isHitGear(entity)) {
      if (!entity.Entity.GetComponent(116).IsInState(3)) return;//判断状态 不确定判定有效
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
}

exports.AutoPuzzle = AutoPuzzle;

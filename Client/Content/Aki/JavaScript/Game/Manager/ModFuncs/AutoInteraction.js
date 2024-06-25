"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AutoInteraction = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  ModManager_1 = require("../ModManager"),
  EntityManager_1 = require("./EntityManager"),
  ModelManager_1 = require("../ModelManager");

  // doesnt need this file anymore
class AutoInteraction {
    static InteractionList = [];
    static CurrentInteraction() {
        for (let i = 0; i < AutoInteraction.InteractionList.length; i++) {
            const Entity = AutoInteraction.InteractionList[i];
            const BlueprintType = EntityManager_1.EntityManager.GetBlueprintType3(Entity);
            if (BlueprintType.startsWith("Collect") && ModManager_1.ModManager.Settings.AutoLoot) {
                AutoInteraction.InteractPawn(i);
            }
            if (BlueprintType.startsWith("Treasure") && ModManager_1.ModManager.Settings.AutoPickTreasure) {
                AutoInteraction.InteractPawn(i);
            }
            if (BlueprintType.startsWith("Teleport") && ModManager_1.ModManager.Settings.AutoTeleport) {
                AutoInteraction.InteractPawn(i);
            }
            if (BlueprintType.startsWith("Vision") && ModManager_1.ModManager.Settings.AutoAbsorbnew) {
                AutoInteraction.InteractPawn(i);
            }
        }
    }
    static InteractPawn(index) {
        const Component = AutoInteraction.InteractionList[index].GetComponent(103);
        const Opt = ModelManager_1.ModelManager.InteractionModel.GetOptionInstanceIdByIndex(index);
        Component.ntn(Opt)
        AutoInteraction.InteractionList.splice(index, 1);
    }
}
exports.AutoInteraction = AutoInteraction;

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NoClip = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  ModManager_1 = require("../ModManager"),
  ModUtils_1 = require("./ModUtils"),
  EntityManager_1 = require("./EntityManager"),
  Global_1 = require("../../Global"),
  GlobalData_1 = require("../../GlobalData"),
  UiManager_1 = require("../../../Ui/UiManager");

const EntityManager = EntityManager_1.EntityManager;
const ModUtils = ModUtils_1.ModUtils;

class NoClip extends EntityManager {
  static NoClip(bool) {
    const playerentity = this.GetPlayerEntity();
  //  puerts_1.logger.warn("kundebug:player", playerentity);
    const ActorComp = playerentity.GetComponent(3);
    const Actor = ActorComp.Actor;
  //  puerts_1.logger.warn("kundebug:Actor", Actor);
    Actor.SetActorEnableCollision(!bool); //Collision
    const Movement = ActorComp.ActorInternal.CharacterMovement;
    if (bool) Movement.MovementMode = 5; //fly
    else Movement.MovementMode = 1;
   // puerts_1.logger.warn("kundebug:MovementMode", Movement.MovementMode);
  }
}
//puerts.logger.info(debug)
exports.NoClip = NoClip;

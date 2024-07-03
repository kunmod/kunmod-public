"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityManager = void 0;
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  ModManager_1 = require("../ModManager"),
  ModUtils_1 = require("./ModUtils"),
  Global_1 = require("../../Global"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  CreatureController_1 = require("../../World/Controller/CreatureController"),
  PublicUtil_1 = require("../../Common/PublicUtil"),
  EntitySystem_1 = require("../../../Core/Entity/EntitySystem");

class EntityManager {
  static GetEntitybyId(entityId) {
    return EntitySystem_1.EntitySystem.Get(entityId);
  }
  static GetPlayerEntity() {
    return Global_1.Global.BaseCharacter?.CharacterActorComponent.Entity;
  }
  static GetPlayerActor() {
    return Global_1.Global.BaseCharacter?.CharacterActorComponent.Actor;
  }
  static GetPlayerBluePrint() {
    let actor = this.GetPlayerActor();
    return actor?.CharRenderingComponent?.CachedOwnerName;
  }
  static GetPlayerPos() {
    let Actor = this.GetPlayerActor();
    let pos = Actor?.K2_GetActorLocation();
    return pos;
  }

  static GetEntityType(entity) {
    let type = entity.Entity.GetComponent(0).GetEntityType();
    if (type == Protocol_1.Aki.Protocol.HBs.Proto_Player) return "Player";
    if (type == Protocol_1.Aki.Protocol.HBs.Proto_Npc) return "Npc";
    if (type == Protocol_1.Aki.Protocol.HBs.Proto_Monster) return "Monster";
    if (type == Protocol_1.Aki.Protocol.HBs.Proto_SceneItem)
      return "SceneItem";
    if (type == Protocol_1.Aki.Protocol.HBs.Proto_Vision) return "Vision";
    if (type == Protocol_1.Aki.Protocol.HBs.Proto_Animal) return "Animal";
    if (type == Protocol_1.Aki.Protocol.HBs.Proto_Custom) return "Custom";
  }

  static GetPosition(Entity) {
    let a = Entity.GetComponent(1);
    let actor = a.ActorInternal;
    let pos = actor.K2_GetActorLocation();

    return pos;
  }

  static GetName(entity) {
    try {
      let CreatureComponent = entity.Entity.GetComponent(0);
      let Name = PublicUtil_1.PublicUtil.GetConfigTextByKey(
        CreatureComponent.GetBaseInfo().TidName
      );

      return Name;
    } catch (e) {
      return "";
    }
  }

  static GetBlueprintType(entity) {
    try {
      let PbData = this.GetEntityData(entity.PbDataId);
      return PbData.BlueprintType;
    } catch (error) {
      return "unknownBlueprintType";
    }
  }
  static GetBlueprintType2(entity) {
    try {
      let Type = entity.Entity.Components[0].qXr;
      return Type;
    } catch (error) {
      return "unknownBlueprintType";
    }
  }

  static GetBlueprintType3(Entity) {
    try {
      let Type = Entity.Components[0].qXr;
      return Type;
    } catch (error) {
      return "unknownBlueprintType";
    }
  }

  static GetEntityData(PbDataId) {
    try {
      return ModelManager_1.ModelManager.CreatureModel.GetEntityData(PbDataId);
    } catch (error) {
      return null;
    }
  }

  static isCollection(entity) {
    let BlueprintType = this.GetBlueprintType2(entity);
    return BlueprintType.startsWith("Collect");
  }
  static isAnimal(entity) {
    let BlueprintType = this.GetBlueprintType2(entity);
    return BlueprintType.startsWith("Animal");
  }
  static isTreasure(entity) {
    let BlueprintType = this.GetBlueprintType2(entity);
    return BlueprintType.startsWith("Treasure");
  }
  static isMonster(entity) {
    let BlueprintType = this.GetBlueprintType2(entity);
    return BlueprintType.startsWith("Monster");
  }
  static isGameplay(entity) {
    let BlueprintType = this.GetBlueprintType2(entity);
    return BlueprintType.startsWith("Gameplay");
  }
  static isNpc(entity) {
    let BlueprintType = this.GetBlueprintType2(entity);
    return (
      BlueprintType.startsWith("Npc") ||
      BlueprintType.startsWith("SimpleNPC") ||
      BlueprintType.startsWith("PasserbyNPC")
    );
  }
  static isQuest(entity) {
    let BlueprintType = this.GetBlueprintType2(entity);
    return BlueprintType.startsWith("Quest");
  }
  static isVision(entity) {
    return entity.Entity.Components[0].qXr.startsWith("VisionItem");
  }
  static isWeapon(entity) {
    let BlueprintType = this.GetBlueprintType(entity);
    return BlueprintType.startsWith("Weapon");
  }
  static isPlayer(entity) {
    let BlueprintType = this.GetBlueprintType(entity);
    return BlueprintType.startsWith("Player");
  }
  static isSceneObj(entity) {
    let BlueprintType = this.GetBlueprintType(entity);
    return BlueprintType.startsWith("SceneObj");
  }
  static isTeleport(entity) {
    return entity.Entity.Components[0].qXr.startsWith("Teleport");
  }
  static isSonanceCasket(entity) {
    return entity.Entity.Components[0].qXr == "Gameplay021";
  }
  static isMutterfly(entity) {
    return entity.Entity.Components[0].qXr == "Gameplay111";
  }
  static SetPlayerSpeed(value) {
    let player = this.GetPlayerEntity();
    player.SetTimeDilation(value);
  }
  static GetCurrRoleId() {
    let player = this.GetPlayerEntity();
    return player.Components[0].wDe;
  }
}

exports.EntityManager = EntityManager;

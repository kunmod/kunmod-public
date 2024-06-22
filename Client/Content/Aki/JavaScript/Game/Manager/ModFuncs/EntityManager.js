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
 EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
//const CreatureModel = ModelManager_1.ModelManager.CreatureModel;

class EntityManager {
  static PlayerEntity = null;
  static AllEntityInfo = [];
  static EntitiesSortedList = [];
  static ModsEntitys = {
    EntityList: null,
    EntityCount: 0,
  };

  EntityInfo = {
    ConfigType: 0,
    CreatureDataId: 0,
    Id: 0,
    Index: 0,
    PbDataId: 0,
    Priority: 0,
    IsInit: false,
    Valid: false,
    Entity: this.Entity,
  };

  Entity = {};

  EntityData = {
    AreaId: 0,
    BlueprintType: "",
    Id: 0,
    InSleep: false,
    Transform: this.Transform,
  };

  Transform = {
    Pos: this.Pos,
    Rot: this.Rot,
  };

  Pos = {
    X: 0,
    Y: 0,
    Z: 0,
  };

  Rot = {
    X: 0,
    Y: 0,
    Z: 0,
  };
  static GetEntitybyId(entityId) {
    return EntitySystem_1.EntitySystem.Get(entityId);
  }
  static GetPlayerEntity() {
    this.PlayerEntity =
      Global_1.Global.BaseCharacter?.CharacterActorComponent.Entity;

    return this.PlayerEntity;
  }
  static GetPlayerPos() {
    let Actor = Global_1.Global.BaseCharacter?.CharacterActorComponent.Actor;
    let pos = Actor?.K2_GetActorLocation();

    return pos;
  }


  static GetEntitySortedList() {
    this.EntitiesSortedList =
      ModelManager_1.ModelManager.CreatureModel.EntitiesSortedList;
    return this.EntitiesSortedList;
  }
  static GetEntityType(entity) {
    let type = entity.Entity.GetComponent(0).GetEntityType();
    if (type == Protocol_1.Aki.Protocol.EEntityType.Player) return "Player";
    if (type == Protocol_1.Aki.Protocol.EEntityType.Npc) return "Npc";
    if (type == Protocol_1.Aki.Protocol.EEntityType.Monster) return "Monster";
    if (type == Protocol_1.Aki.Protocol.EEntityType.SceneItem)
      return "SceneItem";
    if (type == Protocol_1.Aki.Protocol.EEntityType.Vision) return "Vision";
    if (type == Protocol_1.Aki.Protocol.EEntityType.Animal) return "Animal";
    if (type == Protocol_1.Aki.Protocol.EEntityType.Custom) return "Custom";
  }
  static GetEntityCount() {
    this.ModsEntitys.EntityCount = this.EntitiesSortedList.length;
    // puerts_1.logger.warn(
    //   "[KUNMODDEBUG]:GetEntityCount",
    //   this.ModsEntitys.EntityCount
    // );
    return this.ModsEntitys.EntityCount;
  }
  static GetEntityId(entity) {
    return entity.Id;
  }
  static GetPosition(Entity) {
    let a = Entity.GetComponent(1);
    let actor = a.ActorInternal;
    let pos = actor.K2_GetActorLocation();

    return pos;
  }



  static GetName(entity) {
    let a = entity.Entity.GetComponent(3);
    let actor = a.Actor;
    let name = actor.GetName();

    return name;
  }
  // static GetEntity(id) {

  //   return ;
  // }
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
      let Type = entity.Entity.Components[0].C9o;
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

  static PushEntityInfo(onlydebug) {
    this.AllEntityInfo = [];
    this.GetEntitySortedList();
    for (let i = 0; i < this.EntitiesSortedList.length; i++) {
      let entityInfo = this.EntitiesSortedList[i];
      let entityData = this.GetEntityData(entityInfo.PbDataId);
      this.AllEntityInfo.push({
        ...entityInfo,
        EntityData: entityData,
      });
    }

    puerts_1.logger.warn("[KUNMODDEBUG]:PushEntityInfo", this.AllEntityInfo);
    return this.AllEntityInfo;
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
    return (entity.Entity.Components[0].C9o).startsWith("Vision");
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

  static SetPlayerSpeed(value) {
    //CharacterController_1.CharacterController.SetTimeDilation(value);
    let player = this.GetPlayerEntity();
    player.SetTimeDilation(value);
  }
  static GetCurrRoleId() {
    let player = this.GetPlayerEntity();
    return player.Components[0].DOe;
  }
}

exports.EntityManager = EntityManager;

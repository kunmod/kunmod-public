"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModsEntityManager = void 0;
const puerts_1 = require("puerts");
const UE = require("ue");
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const ModManager_1 = require("../ModManager");
const ModUtils_1 = require("./ModUtils");
const ModelManager_1 = require("../../Manager/ModelManager");
const CreatureModel = ModelManager_1.ModelManager.CreatureModel;

class ModsEntityManager {
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
    Entity: new this.Entity(),
  };

  Entity = {};

  EntityData = {
    AreaId: 0,
    BlueprintType: "",
    Id: 0,
    InSleep: false,
    Transform: new this.Transform(),
  };

  Transform = {
    Pos: new this.Pos(),
    Rot:new this.Rot(),
  };

  Pos = {
    x: 0,
    y: 0,
    z: 0,
  };

  Rot = {
    x: 0,
    y: 0,
    z: 0,
  };

  static GetAllEntity() {
    this.ModsEntitys.EntityList = this.EntitiesSortedList;
    puerts_1.logger.warn(
      "[KUNMODDEBUG]:GetEntityList",
      this.ModsEntitys.EntityList
    );
    return this.ModsEntitys.EntityList;
  }

  static GetEntitySortedList() {
    this.EntitiesSortedList = CreatureModel.EntitiesSortedList;
    return this.EntitiesSortedList;
  }

  static GetEntityCount() {
    this.ModsEntitys.EntityCount = this.EntitiesSortedList.length;
    puerts_1.logger.warn(
      "[KUNMODDEBUG]:GetEntityCount",
      this.ModsEntitys.EntityCount
    );
  }

  static GetEntityData(PbDataId) {
    let data = CreatureModel.GetEntityData(PbDataId);
    return data;
  }

  static PushEntityInfo() {
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

    puerts_1.logger.warn(
      "[KUNMODDEBUG]:PushEntityInfo",
      this.AllEntityInfo
    );
    return this.AllEntityInfo;
  }
}

exports.ModsEntityManager = ModsEntityManager;

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EntitySpawner = void 0);
const CreatureController_1 = require("../../World/Controller/CreatureController"),
  puerts_1 = require("puerts"),
  Global_1 = require("../../Global"),
  ModManager_1 = require("../ModManager"),
  EntityManager_1 = require("./EntityManager"),
  UE = require("ue");

class EntitySpawner {
  // 修改 low 和 ConfigId 达到添加实体的效果
  constructor() {
    this.Id = { low: 422, high: 0, unsigned: false };
    this.ConfigId = 11000046;
    this.ConfigType = 1;
    this.EntityType = 1;
    this.Pos = { X: 1, Y: 1, Z: 1 };
    this.Rot = { Pitch: 0, Yaw: 0, Roll: 0 };
    this.InitPos = { X: 1, Y: 1, Z: 1 };
    this.LivingStatus = 0;
    this.IsVisible = true;
    this.PlayerId = 0;
    this.ComponentPbs = [];
    this.DurabilityValue = 0;
    this.EntityState = 0;
    this.InitLinearVelocity = { X: 0, Y: 0, Z: 0 };
    this.IsPosAbnormal = false;
    this.PrefabId = 0;
    this.PrefabIncId = { low: 9, high: 0, unsigned: false };
    this.SubEntityType = 0;
    this.Camp = 2;
  }
  updatePosition() {
    let t =
      Global_1.Global.BaseCharacter?.CharacterActorComponent.ActorTransform.GetLocation();
    if (t) {
      this.Pos = { X: t.X, Y: t.Y, Z: t.Z };
      this.InitPos = { X: t.X, Y: t.Y, Z: t.Z };
    }
  }
  //
  //   Animal: 8;
  //   Custom: 6;
  //   Monster: 2;
  //   Npc: 1;
  //   Player: 0;
  //   SceneItem: 5;
  //   Vision: 7;
  static SpawnEntity(id, entitytype) {
    let seed = Math.floor(Math.random() * 1000);
    const MyEntity = new EntitySpawner();
    MyEntity.Id.low = seed;
    MyEntity.ConfigId = id;
    MyEntity.EntityType = entitytype;
    MyEntity.updatePosition();
    puerts_1.logger.warn("kunSpawn :", MyEntity);
    CreatureController_1.CreatureController.CreateEntity(MyEntity);
    // let a =EntityManager_1.EntityManager.GetPlayerPos();
    //ModManager_1.ModManager.TpNoloadingTo(a.X,a.Y,a.Z);
  }
}
exports.EntitySpawner = EntitySpawner;

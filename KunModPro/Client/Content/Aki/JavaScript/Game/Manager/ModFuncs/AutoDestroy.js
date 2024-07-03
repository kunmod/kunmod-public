"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AutoDestroy = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  ModManager_1 = require("../ModManager"),
  ModUtils_1 = require("./ModUtils"),
  ModMethod_1 = require("./ModMethod"),
  EntityManager_1 = require("./EntityManager");

const destroyList = [
  "Collect501", //红针晶簇
  "Collect502", //片蓝晶簇
  "Collect503", //萤耀晶簇
  "Collect504", //植珀
  "Gameplay003", //玩法_裂纹岩壁
  "SceneObj001", //破碎物001_木箱小
  "SceneObj002", //破碎物002_木箱中
  "SceneObj003", //木箱大
  "SceneObj005", //树干
  "SceneObj008", //破碎物008_木栅栏
  "SceneObj012", //破碎物012_石化人形
  "SceneObj013", //破碎物012_石化人形
  "SceneObj014", //破碎物012_石化人形
  "SceneObj015", //陶罐
  "SceneObj016", //陶罐
  "SceneObj018", //沙袋
  "Gameplay535", //可破坏石块
  "Gameplay536", //可破坏石块
  "Gameplay537", //可破坏石块
  "Gameplay538", //可破坏石块
  "Collect505", //龙荧石
  "Gameplay_CXS_4", //放置用_特色收集物_定风铎
  "Gameplay_CXS_14", //TsEntity_悬挂_特色收集物_定风铎
];
class AutoDestroy extends EntityManager_1.EntityManager {
  static isNeedDestroy(entity) {
    let blueprintType = this.GetBlueprintType2(entity);
    return destroyList.includes(blueprintType);
  }

  static AutoDestroy(entity) {
    if (ModManager_1.ModManager.Settings.AutoDestroy && this.isNeedDestroy(entity)) {
      //puerts_1.logger.warn("kun:AutoDestroy:isNeedDestroy",entity.Entity.Id);
      ModMethod_1.ModMethod.ThrowDamageChangeRequest(entity.Entity, 10, 1604001001n);
      //puerts_1.logger.warn("kun:AutoDestroy:End",entity.Entity.Id);
    }
  }
}
//puerts.logger.info(debug)
exports.AutoDestroy = AutoDestroy;

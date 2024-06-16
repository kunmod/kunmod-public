"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AutoInteract = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  ModManager_1 = require("../ModManager"),
  ModUtils_1 = require("./ModUtils"),
  EntityManager_1 = require("./EntityManager"),
  ModMethod_1 = require("./ModMethod");

const EntityManager = EntityManager_1.ModsEntityManager;
const ModUtils = ModUtils_1.ModUtils;
const ModMethod = ModMethod_1.ModMethod;
const CollectList = [
  "Collect001", //睡莲
  //"Collect001_1",//睡莲_底座
  //"Collect001_2",//睡莲_组合
  "Collect002", //薜荔
  "Collect003", //鸢尾花
  "Collect005", //灯笼果
  "Collect006", //洋金凤
  "Collect007", //虞美人
  "Collect008", //云芝
  "Collect009", //傲寒钟
  "Collect010", //紫珊瑚树
  "Collect011", //金铃子
  //"Collect011_1",//金铃子_底座
  //"Collect011_2",//金铃子_组合
  "Collect101", //珍珠草
  "Collect102", //云露
  "Collect103", //夜息香
  "Collect104", //凌冬花
  //"Collect104_1",//凌冬花_底座
  //"Collect104_2",//凌冬花_组合
  //"Collect105",//广泛植物
  "Collect106", //清芬草
  "Collect107", //香柠草
  "Collect108", //腐骨幽兰
  "Collect109", //水灯花
  "Collect110", //月藻
  "Collect111", //白花菱
  "Collect112", //锦色贝
  "Collect113", //雨声蜗
  "Collect114", //靛色堇
  "Collect115", //崖仙子
  "Collect116", //伞下客
  "Collect117", //龙衔珠
  //"Collect117_1",//龙衔珠_底座
  //"Collect117_2",//龙衔珠_组合
  "Collect118", //花蕈
  "Collect119", //隐火蜕
  //"Collect501",//红针晶簇
  //"Collect502",//片蓝晶簇
  //"Collect503",//萤耀晶簇
  //"Collect504",//植珀
  "Collect601", //鸟蛋
  //"Collect601_1",//鸟蛋_组合
  //"Collect601_2",//鸟蛋_组合
  //"Collect602",//兽肉
  //"Collect603",//禽肉
  //"Collect604",//玩法_永夜长明
];

class AutoInteract extends EntityManager {
  static isNeedLoot(entity) {
    let blueprintType = this.GetBlueprintType(entity);
    return CollectList.includes(blueprintType);
  }

  static AutoLoot(entity) {}
}
//puerts.logger.info(debug)
exports.AutoInteract = AutoInteract;

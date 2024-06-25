"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AutoInteraction = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  ModManager_1 = require("../ModManager"),
  EntityManager_1 = require("./EntityManager"),
  ModelManager_1 = require("../ModelManager"),
  {
    InteractionHintView,
  } = require("../../Module/Interaction/View/InteractionHintView");

class AutoInteraction {
  static CollectList = [
    "Collect001", //睡莲
    //"Collect001_1",//睡莲_底座
    //"Collect001_2",//睡莲_组合
    "Collect002", //薜荔
    "Collect003", //鸢尾花
    "Collect004", //秽炎菇
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
    "Collect105", //香苏
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
    "Collect602", //兽肉
    "Collect603", //禽肉
    //"Collect604",//玩法_永夜长明
  ];
  static CollectAnimal = [
    "Animal016", //霄凤蝶
    "Animal017", //赤羽蝶
    "Animal018", //蓝羽蝶
    "Animal019", //叶翅蛉
    "Animal020", //金环蜓
    "Animal021", //群彩1
    "Animal022", //群彩2
    "Animal023", //银月
    "Animal024", //焰鲤
    "Animal025", //黑棘鲼
    "Animal026", //银环蜥
    "Animal027", //蓝棘蜥
    "Animal028", //青竹蜥
    "Animal029", //黑纹蛙
    "Animal030", //金背蛙
  ];
  static isNeedLoot(entity) {
    let blueprintType = EntityManager_1.EntityManager.GetBlueprintType2(entity);
    return (
      this.CollectList.includes(blueprintType) ||
      this.CollectAnimal.includes(blueprintType)
    );
  }
  static InteractionList = [];
  static CurrentInteraction() {
    for (let i = 0; i < AutoInteraction.InteractionList.length; i++) {
      const Entity = AutoInteraction.InteractionList[i];
      const BlueprintType =
        EntityManager_1.EntityManager.GetBlueprintType3(Entity);
      if (
        (this.CollectList.includes(BlueprintType) ||
          this.CollectAnimal.includes(BlueprintType)) &&
        ModManager_1.ModManager.Settings.AutoLoot
      ) {
        AutoInteraction.InteractPawn(i);
      }
      if (
        BlueprintType.startsWith("Treasure") &&
        ModManager_1.ModManager.Settings.AutoPickTreasure
      ) {
        AutoInteraction.InteractPawn(i);
      }
      if (
        BlueprintType.startsWith("Teleport") &&
        ModManager_1.ModManager.Settings.AutoTeleport
      ) {
        AutoInteraction.InteractPawn(i);
      }
      if (
        BlueprintType.startsWith("VisionItem") &&
        ModManager_1.ModManager.Settings.AutoAbsorbnew
      ) {
        AutoInteraction.InteractPawn(i);
      }
    }
  }
  static InteractPawn(index) {
    const Component = AutoInteraction.InteractionList[index].GetComponent(103);
    const Opt =
      ModelManager_1.ModelManager.InteractionModel.GetOptionInstanceIdByIndex(
        index
      );
    Component.ntn(Opt);
    AutoInteraction.InteractionList.splice(index, 1);
  }
}
exports.AutoInteraction = AutoInteraction;

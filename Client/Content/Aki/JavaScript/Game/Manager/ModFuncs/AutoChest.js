"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AutoChest = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  ModManager_1 = require("../ModManager"),
  ModUtils_1 = require("./ModUtils"),
  EntityManager_1 = require("./EntityManager"),
  ModMethod_1 = require("./ModMethod");


const EntityManager = EntityManager_1.EntityManager;
const ModUtils = ModUtils_1.ModUtils;
const ModMethod = ModMethod_1.ModMethod;
const ChestList = [
"Treasure001",//TsEntity_简易物资箱_初始可开
"Treasure002",//TsEntity_简易物资箱_黑石增生
"Treasure003",//TsEntity_简易物资箱_玩法刷新
"Treasure004",//TsEntity_标准物资箱_初始可开
"Treasure005",//TsEntity_标准物资箱_黑石增生
"Treasure006",//TsEntity_标准物资箱_玩法刷新
"Treasure008",//TsEntity_豪华物资箱_黑石增生
"Treasure010",//TsEntity_丰厚物资箱_初始可开
"Treasure011",//TsEntity_幻象宝箱_金
"Treasure012",//TsEntity_丰厚物资箱_玩法刷新
"Treasure013",//TsEntity_简易物资箱_程序封锁
"Treasure014",//TsEntity_标准物资箱_程序封锁
"Treasure015",//TsEntity_丰厚物资箱_程序封锁
"Treasure007",//TsEntity_豪华物资箱_初始可开
"Treasure009",//TsEntity_豪华物资箱_玩法刷新
"Treasure016",//TsEntity_豪华物资箱_程序封锁
"Treasure017",//TsEntity_散落的物资箱_初始可开s
"Treasure018",//TsEntity_标准物资箱_初始隐匿
"Treasure019",//TsEntity_简易物资箱_初始隐匿
"Treasure020",//TsEntity_丰厚物资箱_初始隐匿
"Treasure021",//TsEntity_豪华物资箱_初始隐匿
//"Treasure022",//TsEntity_简易物资箱_任务用
//"Treasure023",//TsEntity_标准物资箱_任务用
//"Treasure024",//TsEntity_丰厚物资箱_任务用
//"Treasure025",//TsEntity_豪华物资箱_任务用
//"Treasure031",//TsEntity_背包_X3
//"Treasure034",//TsEntity_调查光点_城区陆地
//"Treasure035",//TsEntity_调查光点_野外陆地
//"Treasure036",//TsEntity_调查光点_水域
  ];
class AutoChest extends EntityManager {




  static isNeedReward(entity) {
    let blueprintType = this.GetBlueprintType(entity);
    return ChestList.includes(blueprintType);

  }


  static RewardChest(entity){
    if(!ModManager_1.ModManager.Settings.AutoChest)return;

    if(this.isNeedReward(entity)){
        ModMethod.RewardChest(entity.Entity);
    }

  
  }
}
//puerts.logger.info(debug)
exports.AutoChest = AutoChest;

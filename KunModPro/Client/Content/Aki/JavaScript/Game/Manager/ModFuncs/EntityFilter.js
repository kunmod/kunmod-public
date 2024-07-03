"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EntityFilter = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue");
  
class EntityFilter {
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
    "Drop001",//羽毛feather?
    //"Collect604",//玩法_永夜长明
    "Collect_CXS01", //银雪莲
    "Collect_CXS03", //雀翎果
    "Collect_CXS04", //雀翎果
    "Collect_CXS05", //雀翎果
    "Collect_CXS06", //雀翎果
    "Collect_CXS08", //龙吐珠
    "Collect_CXS09", //龙吐珠
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
    "Animal034", //溯空鱼
  ];
  static TreasureList = [
    "Treasure001", //TsEntity_简易物资箱_初始可开
    "Treasure002", //TsEntity_简易物资箱_黑石增生
    "Treasure003", //TsEntity_简易物资箱_玩法刷新
    "Treasure004", //TsEntity_标准物资箱_初始可开
    "Treasure005", //TsEntity_标准物资箱_黑石增生
    "Treasure006", //TsEntity_标准物资箱_玩法刷新
    "Treasure007", //TsEntity_豪华物资箱_初始可开
    "Treasure008", //TsEntity_豪华物资箱_黑石增生
    "Treasure009", //TsEntity_豪华物资箱_玩法刷新
    "Treasure010", //TsEntity_丰厚物资箱_初始可开
    "Treasure011", //TsEntity_幻象宝箱_金
    "Treasure012", //TsEntity_丰厚物资箱_玩法刷新
    "Treasure013", //TsEntity_简易物资箱_程序封锁
    "Treasure014", //TsEntity_标准物资箱_程序封锁
    "Treasure015", //TsEntity_丰厚物资箱_程序封锁
    "Treasure016", //TsEntity_豪华物资箱_程序封锁
    "Treasure017", //TsEntity_散落的物资箱_初始可开s
    "Treasure018", //TsEntity_标准物资箱_初始隐匿
    "Treasure019", //TsEntity_简易物资箱_初始隐匿
    "Treasure020", //TsEntity_丰厚物资箱_初始隐匿
    "Treasure021", //TsEntity_豪华物资箱_初始隐匿
    //"Treasure022",//TsEntity_简易物资箱_任务用
    //"Treasure023",//TsEntity_标准物资箱_任务用
    //"Treasure024",//TsEntity_丰厚物资箱_任务用
    //"Treasure025",//TsEntity_豪华物资箱_任务用
    //"Treasure031",//TsEntity_背包_X3
    "Treasure034", //TsEntity_调查光点_城区陆地
    "Treasure035", //TsEntity_调查光点_野外陆地
    "Treasure036", //TsEntity_调查光点_水域
  ];

  static CasketDelivery = [
    "Gameplay021", //声匣
    "Gameplay_CXS_4", //放置用_特色收集物_定风铎
    "Gameplay_CXS_14", //TsEntity_悬挂_特色收集物_定风铎
  ];
  static isFilter(blueprint, list) {
    return list.includes(blueprint);
  }
  static isneedLoot(blueprint) {
    return (
      this.CollectList.includes(blueprint) ||
      this.CollectAnimal.includes(blueprint)
    );
  }
  static isneedTreasure(blueprint) {
    return this.TreasureList.includes(blueprint);
  }

  static HeroEnergyFilterList = {
    "BP_Sanhua_C_2147474277": 52, // needed specific can't be max
    // I learn some of them literally mean their energy bar count XD
    // "BP_Kakaluo_C_2147463050": 3, [] [] []
    // "BP_Yangyang_C_2147464895": 3  [] [] []
  } 
}

exports.EntityFilter = EntityFilter;

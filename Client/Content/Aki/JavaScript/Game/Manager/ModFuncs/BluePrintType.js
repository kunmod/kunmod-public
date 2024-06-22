"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BluePrintType = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  ModManager_1 = require("../ModManager"),
  LanguageSystem_1 = require("../../../Core/Common/LanguageSystem");
const { ModLanguage } = require("./ModLanguage");


class BluePrintType extends ModLanguage {


  static translate = [
    {
      BluePrint: "Treasure001",
      en: "Basic Supply Chest",
      chs: "简易物资箱",
      ja: "Basic Supply Chest",
    },
     {
      BluePrint: "Treasure002",
      en: "Basic Supply Chest",
      chs: "简易物资箱",
      ja: "Basic Supply Chest",
    },
    {
      BluePrint: "Treasure003",
      en: "Basic Supply Chest",
      chs: "简易物资箱",
      ja: "Treasure00",
    },
    {
      BluePrint: "Treasure004",
      en: "Standard Supply Chest",
      chs: "标准物资箱",
      ja: "Standard Supply Chest",
    },
    {
      BluePrint: "Treasure005",
      en: "Blue Tidal Heritage",
      chs: "标准物资箱_黑石增生",
      ja: "Treasure005",
    },{
          BluePrint: "Treasure006",
      en: "Standard Supply Chest",
      chs: "标准物资箱",
      ja: "Standard Supply Chest",
    },
    {
      BluePrint: "Treasure007",
      en: "Treasure007",
      chs: "标准物资箱_黑石增生",
      ja: "Treasure007",
    },
    {
      BluePrint: "Treasure008",
      en: "Purple Tidal Heritage",
      chs: "豪华物资箱_黑石增生",
      ja: "Purple Tidal Heritage",
    },
        {
      BluePrint: "Treasure009",
      en: "Purple Tidal Heritage",
      chs: "豪华物资箱_黑石增生",
      ja: "Treasure009",
    },
    {
      BluePrint: "Treasure010",
      en: "Suspicious Chest",
      chs: "丰厚物资箱",
      ja: "Treasure010",
    },
    {
      BluePrint: "Treasure011",
      en: "Golden Tidal Heritage",
      chs: "幻象宝箱_金",
      ja: "Treasure011",
    },
        {
      BluePrint: "Treasure012",
      en: "Treasure012",
      chs: "丰厚物资箱",
      ja: "Treasure012",
    },
    {
      BluePrint: "Treasure013",
      en: "Basic Supply Chest",
      chs: "丰厚物资箱",
      ja: "Treasure013",
    },
    {
      BluePrint: "Treasure014",
      en: "Standard Supply Chest",
      chs: "标准物资箱",
      ja: "Treasure014",
    },
    {
      BluePrint: "Treasure015",
      en: "Advanced Supply Chest",
      chs: "丰厚物资箱",
      ja: "Treasure015",
    },
    {
      BluePrint: "Treasure016",
      en: "Premium Supply Chest",
      chs: "豪华物资箱",
      ja: "Treasure016",
    },
        {
      BluePrint: "Treasure017",
      en: "Treasure017",
      chs: "散落的物资箱",
      ja: "Treasure017",
    },
        {
      BluePrint: "Treasure018",
      en: "Treasure018",
      chs: "标准物资箱",
      ja: "Treasure018",
    },
        {
      BluePrint: "Treasure019",
      en: "Treasure019",
      chs: "简易物资箱",
      ja: "Treasure019",
    },
        {
      BluePrint: "Treasure020",
      en: "Treasure020",
      chs: "丰厚物资箱",
      ja: "Treasure020",
    },
        {
      BluePrint: "Treasure021",
      en: "Treasure021",
      chs: "豪华物资箱",
      ja: "Treasure021",
    },
    {
      BluePrint: "Collect001",
      en: "Lotus Seeds",
      chs: "睡莲",
      ja: "Collect001",
    },
    {
      BluePrint: "Collect002",
      en: "Ficus Microcarpa",
      chs: "薜荔",
      ja: "Collect002",
    },
    {
      BluePrint: "Collect003",
      en: "Iris",
      chs: "鸢尾花",
      ja: "Collect003",
    },
    {
      BluePrint: "Collect004",
      en: "Mushroom",
      chs: "秽炎菇",
      ja: "Collect004",
    },
    {
      BluePrint: "Collect005",
      en: "Lanternberry",
      chs: "灯笼果",
      ja: "Collect005",
    },
    {
      BluePrint: "Collect006",
      en: "Goldenrod",
      chs: "洋金凤",
      ja: "Collect006",
    },
    {
      BluePrint: "Collect007",
      en: "Red Poppy",
      chs: "虞美人",
      ja: "Collect007",
    },
    {
      BluePrint: "Collect008",
      en: "Coriolus",
      chs: "云芝",
      ja: "Collect008",
    },
    {
      BluePrint: "Collect009",
      en: "Wintry Bell",
      chs: "傲寒钟",
      ja: "Collect009",
    },
    {
      BluePrint: "Collect010",
      en: "Purple Coral Tree",
      chs: "紫珊瑚树",
      ja: "Collect010",
    },
    {
      BluePrint: "Collect011",
      en: "Golden Berry",
      chs: "金铃子",
      ja: "Collect011",
    },
    {
      BluePrint: "Collect101",
      en: "Pearl Leaf",
      chs: "珍珠草",
      ja: "Collect101",
    },
    {
      BluePrint: "Collect102",
      en: "Dewvetch",
      chs: "云露",
      ja: "Collect102",
    },
    {
      BluePrint: "Collect103",
      en: "Noctemint",
      chs: "夜息香",
      ja: "Collect103",
    },
    {
      BluePrint: "Collect104",
      en: "Honeysuckle",
      chs: "凌冬花",
      ja: "Collect104",
    },
    {
      BluePrint: "Collect105",
      en: "Perilla",
      chs: "Collect105",
      ja: "Collect105",
    },
    {
      BluePrint: "Collect106",
      en: "Angelica",
      chs: "清芬草",
      ja: "Collect106",
    },
    {
      BluePrint: "Collect107",
      en: "Lemongrass",
      chs: "香柠草",
      ja: "Collect107",
    },
    {
      BluePrint: "Collect108",
      en: "Rotten Bone Orchid",
      chs: "腐骨幽兰",
      ja: "Collect108",
    },
    {
      BluePrint: "Collect109",
      en: "Crystallized Leaf",
      chs: "水灯花",
      ja: "Collect109",
    },
    {
      BluePrint: "Collect110",
      en: "Bunnywort",
      chs: "月藻",
      ja: "Collect110",
    },
    {
      BluePrint: "Collect111",
      en: "Caltrop",
      chs: "白花菱",
      ja: "Collect111",
    },
    {
      BluePrint: "Collect112",
      en: "Chromeshell",
      chs: "锦色贝",
      ja: "Collect112",
    },
    {
      BluePrint: "Collect113",
      en: "Dripsnail",
      chs: "雨声蜗",
      ja: "Collect113",
    },
    {
      BluePrint: "Collect114",
      en: "Viola",
      chs: "靛色堇",
      ja: "Collect114",
    },
    {
      BluePrint: "Collect115",
      en: "Cliffrecluse",
      chs: "崖仙子",
      ja: "Collect115",
    },
    {
      BluePrint: "Collect116",
      en: "Umbragricus",
      chs: "伞下客",
      ja: "Collect116",
    },
    {
      BluePrint: "Collect117",
      en: "Gemberry",
      chs: "龙衔珠",
      ja: "Collect117",
    },
    {
      BluePrint: "Collect118",
      en: "Edodes",
      chs: "花蕈",
      ja: "Collect118",
    },
    {
      BluePrint: "Collect119",
      en: "Hidden Fire Shedding",
      chs: "隐火蜕",
      ja: "Collect119",
    },
    {
      BluePrint: "Collect503",
      en: "Indigoite",
      chs: "Collect503",
      ja: "Collect503",
    },
    {
      BluePrint: "Collect504",
      en: "Floramber",
      chs: "Collect504",
      ja: "Collect504",
    },
    {
      BluePrint: "Collect601",
      en: "Bird Egg",
      chs: "鸟蛋",
      ja: "Collect601",
    },
    {
      BluePrint: "Collect601_1",
      en: "Bird Egg Nest",
      chs: "Collect601_1",
      ja: "Collect601_1",
    },
    {
      BluePrint: "Collect602",
      en: "Raw Meat",
      chs: "Collect602",
      ja: "Collect602",
    },
    {
      BluePrint: "Animal001",
      en: "Purple-beaked Pigeon",
      chs: "紫喙鸽",
      ja: "Animal001",
    },
    {
      BluePrint: "Animal002",
      en: "Green Pigeon",
      chs: "青翎鸽",
      ja: "Animal002",
    },
    {
      BluePrint: "Animal003",
      en: "Blue-Crowned Pigeon",
      chs: "蓝冠鸽",
      ja: "Animal003",
    },
    {
      BluePrint: "Animal004",
      en: "Grey-Crowned Gull",
      chs: "灰冠鸥",
      ja: "Animal004",
    },
    {
      BluePrint: "Animal005",
      en: "Barefoot Goose",
      chs: "赤脚雁",
      ja: "Animal005",
    },
    {
      BluePrint: "Animal006",
      en: "Snow Crane",
      chs: "雪云鹤",
      ja: "Animal006",
    },
    {
      BluePrint: "Animal012",
      en: "Green Rabbit",
      chs: "青杂兔",
      ja: "Animal012",
    },
    {
      BluePrint: "Animal013",
      en: "Rockhorn Sheep",
      chs: "岩角羊",
      ja: "Animal013",
    },
    {
      BluePrint: "Animal014",
      en: "Grey Rib Cattle",
      chs: "灰脊牛",
      ja: "Animal014",
    },
    {
      BluePrint: "Animal015",
      en: "Morisui Beef",
      chs: "森栖牛",
      ja: "Animal015",
    },
    {
      BluePrint: "Animal016",
      en: "Swallowtail Butterfly",
      chs: "霄凤蝶",
      ja: "Animal016",
    },
    {
      BluePrint: "Animal017",
      en: "Red Feather Butterfly",
      chs: "赤羽蝶",
      ja: "Animal017",
    },
    {
      BluePrint: "Animal018",
      en: "Blue Feather Butterfly",
      chs: "蓝羽蝶",
      ja: "Animal018",
    },
    {
      BluePrint: "Animal019",
      en: "Leaf-Winged Lacewing",
      chs: "叶翅蛉",
      ja: "Animal019",
    },
    {
      BluePrint: "Animal020",
      en: "Golden-Ringed Dragonfly",
      chs: "金环蜓",
      ja: "Animal020",
    },
    {
      BluePrint: "Animal021",
      en: "Group Color 1",
      chs: "群彩1",
      ja: "Animal021",
    },
    {
      BluePrint: "Animal022",
      en: "Group Color 2",
      chs: "群彩2",
      ja: "Animal022",
    },
    {
      BluePrint: "Animal023",
      en: "Silver Moon",
      chs: "银月",
      ja: "Animal023",
    },
    {
      BluePrint: "Animal024",
      en: "Flame Carp",
      chs: "焰鲤",
      ja: "Animal024",
    },
    {
      BluePrint: "Animal025",
      en: "Blackthorn Ray",
      chs: "黑棘鲼",
      ja: "Animal025",
    },
    {
      BluePrint: "Animal026",
      en: "Silver-Ringed Lizard",
      chs: "银环蜥",
      ja: "Animal026",
    },
    {
      BluePrint: "Animal027",
      en: "Blue Thorn Lizard",
      chs: "蓝棘蜥",
      ja: "Animal027",
    },
    {
      BluePrint: "Animal028",
      en: "Green Bamboo Lizard",
      chs: "青竹蜥",
      ja: "Animal028",
    },
    {
      BluePrint: "Animal029",
      en: "Black-Striped Frog",
      chs: "黑纹蛙",
      ja: "Animal029",
    },
    {
      BluePrint: "Animal030",
      en: "Golden-Backed Frog",
      chs: "金背蛙",
      ja: "Animal030",
    },
    {
      BluePrint: "Animal031",
      en: "Crow",
      chs: "乌鸦",
      ja: "Animal031",
    },
    {
      BluePrint: "Animal032",
      en: "Myoblast",
      chs: "鸣素体",
      ja: "Animal032",
    },
    {
      BluePrint: "Gameplay021",
      en: "Sonance Casket",
      chs: "Gameplay021",
      ja: "Gameplay021",
    },
    {
      BluePrint: "Gameplay050",
      en: "Training Dummy",
      chs: "Gameplay050",
      ja: "Gameplay050",
    },
  ];

  static ModTr = (string) => {
    const Find = BluePrintType.translate.find(t => t.BluePrint == string);
    if (Find) {
      return Find[this.GetCurrLang()] || Find.BluePrint;
    } else {
      return string; // return original string if no translation found
    }
  };
}

exports.BluePrintType = BluePrintType;

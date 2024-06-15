"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.KillAura = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  ModManager_1 = require("../ModManager"),
  ModUtils_1 = require("./ModUtils"),
  ModMethod_1 = require("./ModMethod"),
  EntityManager_1 = require("./EntityManager");

const ModMethod = ModMethod_1.ModMethod;
const ModManager = ModManager_1.ModManager;
const EntityManager = EntityManager_1.ModsEntityManager;
const ModUtils = ModUtils_1.ModUtils;
const AnimalList = [
  "Animal001", //紫喙鸽
  "Animal001_1", //TsEntity_生态动物001_紫喙鸽_游荡
  "Animal002", //青翎鸽
  "Animal002_1", //游荡
  "Animal003", //蓝冠鸽
  "Animal003_1", //游荡
  "Animal003_2", //游荡
  "Animal004", //灰冠鸥
  "Animal005", //赤脚雁
  "Animal006", //雪云鹤
  //"Animal007",//三花1
  //"Animal007_1",
  //"Animal007_2",
  // "Animal007_little",
  //"Animal008",//狸花
  //"Animal008_1",
  //"Animal008_2",
  //"Animal008_little",
  //"Animal009",//白雪
  //"Animal009_1",
  //"Animal009_2",
  //"Animal009_little",
  //"Animal010",//倾听动物之声_汪汪队_疾犬
  // "Animal010_1",
  // "Animal010_2",
  // "Animal010_3",
  // "Animal011",倾听动物之声_汪汪队_斗犬
  // "Animal011_1",
  // "Animal011_2",
  "Animal012", //青杂兔
  "Animal013", //岩角羊
  "Animal014", //灰脊牛
  "Animal015", //森栖牛
  // "Animal016",//霄凤蝶
  // "Animal017",//赤羽蝶
  // "Animal018",//蓝羽蝶
  // "Animal019",//叶翅蛉
  // "Animal020",//金环蜓
  // "Animal021",//群彩1
  // "Animal022",//群彩2
  // "Animal023",//银月
  // "Animal024",//焰鲤
  // "Animal025",//黑棘鲼
  // "Animal026",//银环蜥
  // "Animal027",//蓝棘蜥
  // "Animal028",//青竹蜥
  // "Animal029",//黑纹蛙
  // "Animal030",//金背蛙
  //"Animal031",//乌鸦
  //"Animal032",//鸣素体
];

class KillAura extends EntityManager {
  static isIndistance(entity) {
    let monsterPos = this.GetPosition(entity);
    let distance = ModUtils.Getdistance2Player(monsterPos);
    if (distance < ModManager.Settings.killAuraRadius * 100) {
      // puerts_1.logger.warn(
      //   "kun:killAuratest:isIndistance",
      //   entity.Entity.Id,
      //   distance
      // );
      return true;
    } else return false;
  }

  static isneedkillAnimal(entity) {
    let blueprintType = this.GetBlueprintType(entity);
    return AnimalList.includes(blueprintType);
  }
  static killAura(entity) {
    if (!ModManager.Settings.killAuranew) return;

    if (this.isMonster(entity) && this.isIndistance(entity)) {
      ModMethod.MonsterDrownRequest(entity.Entity);
      //puerts_1.logger.warn("kun:killAuratest:Monster:END", entity.Entity.Id);
    }
  }
  static KillAnimal(entity) {
    if (!ModManager.Settings.killAuranew || !ModManager.Settings.KillAnimal)
      return;

    if (this.isIndistance(entity) && this.isneedkillAnimal(entity)) {
      ModMethod.AnimalDieRequest(entity.Entity);
      //puerts_1.logger.warn("kun:killAuraAnimalDieRequest", entity.Entity.Id);
    }
  }
}
//puerts.logger.info(debug)
exports.KillAura = KillAura;

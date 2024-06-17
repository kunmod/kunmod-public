"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ESP = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  ModManager_1 = require("../ModManager"),
  ModUtils_1 = require("./ModUtils"),
  EntityManager_1 = require("./EntityManager"),
  UiManager_1 = require("../../../Ui/UiManager");
const EntityManager = EntityManager_1.ModsEntityManager;
const ModUtils = ModUtils_1.ModUtils;

class ESP extends EntityManager {
  static isNeedDraw(entity) {
    let need = this.isMonster(entity);

    return need;
  }

  static World2Screen(){


    
  }



  static ESPDrawLine(){
    let color = new UE.LinearColor(1, 0, 0, 1);//red
    ModUtils.HUDDrawLine(100,100,1920,1080,color,30);

  }
}
//puerts.logger.info(debug)
exports.ESP = ESP;

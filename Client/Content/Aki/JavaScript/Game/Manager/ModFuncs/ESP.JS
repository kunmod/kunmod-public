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
  Global_1 = require("../../Global"),
  GlobalData_1 = require("../../GlobalData"),
  UiManager_1 = require("../../../Ui/UiManager");
  
const EntityManager = EntityManager_1.ModsEntityManager;
const ModUtils = ModUtils_1.ModUtils;

class ESP extends EntityManager {
  static isNeedDraw(entity) {
    let need = this.isMonster(entity);

    return need;
  }




  static Drawtest(){
    let playerpos = EntityManager.GetPlayerPos();



  }



}
//puerts.logger.info(debug)
exports.ESP = ESP;

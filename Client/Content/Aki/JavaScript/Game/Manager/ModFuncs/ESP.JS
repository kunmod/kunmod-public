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

  static ESPDrawMain() {
    //if (!this.isNeedDraw(entity)) return;
    //let entitypos = this.GetPosition(entity);
    let mypos = this.GetPlayerPos();
    if (true /*DrawLine*/) {
      //let pos2 = new UE.Vector(entitypos.X, entitypos.Y, entitypos.Z);
      let pos2 = new UE.Vector(mypos.X+20000, mypos.Y, mypos.Z+20000);
      let pos1 = new UE.Vector(mypos.X, mypos.Y, mypos.Z);
      let color = new UE.LinearColor(1, 0, 0, 1);//red
      ModUtils.DrawDebugLine(pos1, pos2,color,60,30);
    }
  }
  static ESPDrawBox() {
    //if (!this.isNeedDraw(entity)) return;
    //let entitypos = this.GetPosition(entity);
    let mypos = this.GetPlayerPos();
    if (true /*DrawLine*/) {
      //let pos2 = new UE.Vector(entitypos.X, entitypos.Y, entitypos.Z);
      let pos2 = new UE.Vector(mypos.X+5000, mypos.Y+5000, mypos.Z+5000);
      //let pos1 = new UE.Vector(mypos.X, mypos.Y, mypos.Z);
      let extent = new UE.Vector(20, 20, 20);
      let color = new UE.LinearColor(1, 0, 0, 1);//red
      let r = new UE.Vector(20, 20, 20);
      ModUtils.DrawDebugBox(pos2,extent,color,r,1,30);
    }
  }
  static ESPDrawLine(){
    let color = new UE.LinearColor(1, 0, 0, 1);//red
    ModUtils.HUDDrawLine(100,100,1920,1080,color,30);

  }
}
//puerts.logger.info(debug)
exports.ESP = ESP;

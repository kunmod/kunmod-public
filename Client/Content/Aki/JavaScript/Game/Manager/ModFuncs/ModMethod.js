"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ModMethod = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  NetDefine_1 = require("../../../Core/Define/Net/NetDefine"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ModManager_1 = require("../ModManager"),
  ModelManager_1 = require("../ModelManager"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  AudioSystem_1 = require("../../../Core/Audio/AudioSystem"),
  Global_1 = require("../../Global"),
  GlobalData_1 = require("../../GlobalData"),
  CombatMessage_1 = require("../../Module/CombatMessage/CombatMessage"),
  BattleNetController_1 = require("../../World/Controller/BattleNetController"), //add
  LevelGamePlayController_1 = require("../../LevelGamePlay/LevelGamePlayController"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  WeatherController_1 = require("../../Module/Weather/WeatherController"),
  ModDebuger_1 = require("./ModDebuger"),
  UiManager_1 = require("../../../Ui/UiManager");

class ModMethod {
  //怪物淹死
  static MonsterDrownRequest(entity) {
    CombatMessage_1.CombatNet.Call(
      NetDefine_1.ERequestMessageId.MonsterDrownRequest,
      entity,
      Protocol_1.Aki.Protocol.MonsterDrownRequest.create()
    );
  }

  static ThrowDamageChangeRequest(Entity, count, DamageId) {
    for (let i = 0; i < count; i++) {
      LevelGamePlayController_1.LevelGamePlayController.ThrowDamageChangeRequest(
        Entity.Id,
        DamageId
      ); //  1604001001n 为女主的第一次平A的 DamageId   MaingirlAttack1
    }
  }

  static AnimalDieRequest(entity) {
    ControllerHolder_1.ControllerHolder.CreatureController.AnimalDieRequest(
      entity.GetComponent(0).GetCreatureDataId(),
      entity.GetComponent(1).ActorLocationProxy
    );
    entity.CheckGetComponent(0).SetLivingStatus(Protocol_1.Aki.Protocol.LivingStatus.Dead);
  }
  static AnimalDropRequest(entity)//cant use seems
  {
    let id =entity.Entity.Id;
    ControllerHolder_1.ControllerHolder.CreatureController.AnimalDropItemRequest(id);
  }
  // static LandingDamageRequest(Entity)
  // {
  //   let id =Entity.Id;
  //   let speedz =100;
  //   let TimeExceeding=1;
  //   ControllerHolder_1.ControllerHolder.CreatureController.LandingDamageRequest(id,100,1);
  // }
  
  static SetWorldTimeDilation(t) {
    UE.GameplayStatics.SetGlobalTimeDilation(
      GlobalData_1.GlobalData.GameInstance,
      t
    );
  }
  //宝箱
  static RewardChest(entity) {

    LevelGamePlayController_1.LevelGamePlayController.GetRewardTreasureBoxRequest(
      entity.Id
    );
  }
  static ChangWeather(weatherID) {
    //1.sunny 2.Cloudy 3.Thunder 4.Snow 5.Rain
    WeatherController_1.WeatherController.TestChangeWeather(weatherID);
  }
  static FPSUnlocker(unlock = false){
    let setfps;
    if (unlock) {
      setfps = "t.MaxFPS 300"
    } else {
      setfps = "t.MaxFPS 60"
    }
    ModDebuger_1.ModDebuger.ConsoleCommand(setfps);
  }
  // static FreeCamera(){
  //     ModDebuger_1.ModDebuger.ConsoleCommand("ToggleDebugCamera");
  // }
  static ShowFPS(){
    let ShowFPS = "stat fps"
    ModDebuger_1.ModDebuger.ConsoleCommand(ShowFPS);
  }
  static ShowUnit(){
    let ShowUnit = "stat Unit";
    ModDebuger_1.ModDebuger.ConsoleCommand(ShowUnit);
  }
  static SetFOV(value){
    let fov = value.toString();
    ModDebuger_1.ModDebuger.ConsoleCommand("fov "+fov);
  }


}
//puerts.logger.info(debug)
exports.ModMethod = ModMethod;

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ForceUnlocker = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  ModManager_1 = require("../ModManager"),
  ModelManager_1 = require("../ModelManager"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  TutorialController_1 =require("../../Module/Tutorial/TutorialController");

const ModManager = ModManager_1.ModManager;

const TutorialList = [
  30001, 30002, 30003, 30006, 30008, 30009, 30010, 30011, 30013, 30014, 30021,
  30022, 30024, 30025, 30026, 30027, 30028, 30029, 30030, 30031, 30032, 30033,
  30034, 30035, 30036, 31002, 31003, 31004, 31005, 31006, 31007, 31008, 31009,
  32001, 32002, 32003, 32004, 32005, 32006, 32007, 32008, 32009, 32010, 32011,
  32012, 32013, 32014, 32015, 32016, 32017, 32018, 32019, 32020, 32021, 32022,
  32024, 32025, 33001, 33006, 33007, 34001, 34002, 34003, 34004, 34005, 34006,
  34007, 34008, 34009, 34010, 34011, 34012, 34013, 34015, 34016, 34017, 34019,
  34020, 34021, 34022, 34024, 34025, 34026, 34027, 34028, 34029, 34030, 34031,
  34032, 34033, 34034, 34035, 34036, 34037, 34038, 34039, 34040, 34041, 34042,
  34043, 34044, 34046, 34047, 34048, 34049, 34050, 34051, 34052, 50001, 50002,
  50003, 50004, 50005, 50006, 50007, 50008, 50009, 50010, 50011,
];

class ForceUnlocker {

  static GmUnlockOneTutorial(){//seem cant use 
    for(let id of TutorialList){     
      TutorialController_1.TutorialController.GmUnlockOneTutorial(id);
    }
  }
  static RemoveRedDotTutorial(){//work
    for(let id of TutorialList){     
      TutorialController_1.TutorialController.RemoveRedDotTutorialId(id);
    }
  }

}

exports.ForceUnlocker = ForceUnlocker;

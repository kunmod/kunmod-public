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
  TutorialController_1 = require("../../Module/Tutorial/TutorialController"),
  AchievementController_1 = require("../../Module/Achievement/AchievementController");

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
const AchievementList = [
  {
    Id: 300101,
    GroupId: 3001,
  },
  {
    Id: 300102,
    GroupId: 3001,
  },
  {
    Id: 300103,
    GroupId: 3001,
  },
  {
    Id: 300104,
    GroupId: 3001,
  },
  {
    Id: 300105,
    GroupId: 3001,
  },
  {
    Id: 300106,
    GroupId: 3001,
  },
  {
    Id: 300107,
    GroupId: 3001,
  },
  {
    Id: 300108,
    GroupId: 3001,
  },
  {
    Id: 300109,
    GroupId: 3001,
  },
  {
    Id: 300110,
    GroupId: 3001,
  },
  {
    Id: 300111,
    GroupId: 3001,
  },
  {
    Id: 300112,
    GroupId: 3001,
  },
  {
    Id: 300113,
    GroupId: 3001,
  },
  {
    Id: 300114,
    GroupId: 3001,
  },
  {
    Id: 300115,
    GroupId: 3001,
  },
  {
    Id: 300116,
    GroupId: 3001,
  },
  {
    Id: 300117,
    GroupId: 3001,
  },
  {
    Id: 300118,
    GroupId: 3001,
  },
  {
    Id: 300119,
    GroupId: 3001,
  },
  {
    Id: 300120,
    GroupId: 3001,
  },
  {
    Id: 300121,
    GroupId: 3001,
  },
  {
    Id: 300122,
    GroupId: 3001,
  },
  {
    Id: 300124,
    GroupId: 3001,
  },
  {
    Id: 300301,
    GroupId: 3003,
  },
  {
    Id: 300302,
    GroupId: 3003,
  },
  {
    Id: 300304,
    GroupId: 3003,
  },
  {
    Id: 300305,
    GroupId: 3003,
  },
  {
    Id: 300306,
    GroupId: 3003,
  },
  {
    Id: 300307,
    GroupId: 3003,
  },
  {
    Id: 300308,
    GroupId: 3003,
  },
  {
    Id: 300309,
    GroupId: 3003,
  },
  {
    Id: 300310,
    GroupId: 3003,
  },
  {
    Id: 300401,
    GroupId: 3004,
  },
  {
    Id: 300402,
    GroupId: 3004,
  },
  {
    Id: 300403,
    GroupId: 3004,
  },
  {
    Id: 300404,
    GroupId: 3004,
  },
  {
    Id: 300405,
    GroupId: 3004,
  },
  {
    Id: 300406,
    GroupId: 3004,
  },
  {
    Id: 300407,
    GroupId: 3004,
  },
  {
    Id: 300408,
    GroupId: 3004,
  },
  {
    Id: 300409,
    GroupId: 3004,
  },
  {
    Id: 300410,
    GroupId: 3004,
  },
  {
    Id: 300411,
    GroupId: 3004,
  },
  {
    Id: 400201,
    GroupId: 4002,
  },
  {
    Id: 400202,
    GroupId: 4002,
  },
  {
    Id: 400203,
    GroupId: 4002,
  },
  {
    Id: 400204,
    GroupId: 4002,
  },
  {
    Id: 400206,
    GroupId: 4002,
  },
  {
    Id: 400207,
    GroupId: 4002,
  },
  {
    Id: 400208,
    GroupId: 4002,
  },
  {
    Id: 400209,
    GroupId: 4002,
  },
  {
    Id: 400101,
    GroupId: 4001,
  },
  {
    Id: 400102,
    GroupId: 4001,
  },
  {
    Id: 400103,
    GroupId: 4001,
  },
  {
    Id: 400104,
    GroupId: 4001,
  },
  {
    Id: 400108,
    GroupId: 4001,
  },
  {
    Id: 400109,
    GroupId: 4001,
  },
  {
    Id: 400110,
    GroupId: 4001,
  },
  {
    Id: 100401,
    GroupId: 1004,
  },
  {
    Id: 100402,
    GroupId: 1004,
  },
  {
    Id: 100403,
    GroupId: 1004,
  },
  {
    Id: 100404,
    GroupId: 1004,
  },
  {
    Id: 100405,
    GroupId: 1004,
  },
  {
    Id: 100406,
    GroupId: 1004,
  },
  {
    Id: 100407,
    GroupId: 1004,
  },
  {
    Id: 100410,
    GroupId: 1004,
  },
  {
    Id: 400111,
    GroupId: 4001,
  },
  {
    Id: 110101,
    GroupId: 1001,
  },
  {
    Id: 110102,
    GroupId: 1001,
  },
  {
    Id: 110103,
    GroupId: 1001,
  },
  {
    Id: 110105,
    GroupId: 1001,
  },
  {
    Id: 100101,
    GroupId: 1001,
  },
  {
    Id: 100102,
    GroupId: 1001,
  },
  {
    Id: 100103,
    GroupId: 1001,
  },
  {
    Id: 100104,
    GroupId: 1001,
  },
  {
    Id: 100105,
    GroupId: 1001,
  },
  {
    Id: 100106,
    GroupId: 1001,
  },
  {
    Id: 100107,
    GroupId: 1001,
  },
  {
    Id: 100108,
    GroupId: 1001,
  },
  {
    Id: 100110,
    GroupId: 3002,
  },
  {
    Id: 100111,
    GroupId: 3002,
  },
  {
    Id: 100112,
    GroupId: 3002,
  },
  {
    Id: 100113,
    GroupId: 3002,
  },
  {
    Id: 100114,
    GroupId: 3002,
  },
  {
    Id: 100115,
    GroupId: 3002,
  },
  {
    Id: 100116,
    GroupId: 3002,
  },
  {
    Id: 100117,
    GroupId: 3002,
  },
  {
    Id: 100118,
    GroupId: 3002,
  },
  {
    Id: 100119,
    GroupId: 3002,
  },
  {
    Id: 100120,
    GroupId: 3002,
  },
  {
    Id: 100121,
    GroupId: 3002,
  },
  {
    Id: 100122,
    GroupId: 3002,
  },
  {
    Id: 100123,
    GroupId: 3002,
  },
  {
    Id: 100201,
    GroupId: 1002,
  },
  {
    Id: 100202,
    GroupId: 1002,
  },
  {
    Id: 100203,
    GroupId: 1002,
  },
  {
    Id: 100204,
    GroupId: 1002,
  },
  {
    Id: 100205,
    GroupId: 1002,
  },
  {
    Id: 100206,
    GroupId: 1002,
  },
  {
    Id: 100207,
    GroupId: 1002,
  },
  {
    Id: 100208,
    GroupId: 1002,
  },
  {
    Id: 100209,
    GroupId: 1002,
  },
  {
    Id: 100210,
    GroupId: 1002,
  },
  {
    Id: 100211,
    GroupId: 1002,
  },
  {
    Id: 100212,
    GroupId: 1002,
  },
  {
    Id: 100213,
    GroupId: 1002,
  },
  {
    Id: 100214,
    GroupId: 1002,
  },
  {
    Id: 100215,
    GroupId: 1002,
  },
  {
    Id: 100216,
    GroupId: 1002,
  },
  {
    Id: 110106,
    GroupId: 1001,
  },
  {
    Id: 110107,
    GroupId: 1001,
  },
  {
    Id: 300501,
    GroupId: 3005,
  },
  {
    Id: 300502,
    GroupId: 3005,
  },
  {
    Id: 300503,
    GroupId: 3005,
  },
  {
    Id: 300504,
    GroupId: 3005,
  },
  {
    Id: 300505,
    GroupId: 3005,
  },
  {
    Id: 300506,
    GroupId: 3005,
  },
  {
    Id: 300507,
    GroupId: 3005,
  },
  {
    Id: 300508,
    GroupId: 3005,
  },
  {
    Id: 300509,
    GroupId: 3005,
  },
  {
    Id: 400113,
    GroupId: 4001,
  },
  {
    Id: 400114,
    GroupId: 4001,
  },
  {
    Id: 400213,
    GroupId: 4002,
  },
  {
    Id: 400214,
    GroupId: 4002,
  },
  {
    Id: 100411,
    GroupId: 1004,
  },
  {
    Id: 100412,
    GroupId: 1004,
  },
  {
    Id: 100413,
    GroupId: 1004,
  },
  {
    Id: 200101,
    GroupId: 2001,
  },
  {
    Id: 200102,
    GroupId: 2001,
  },
  {
    Id: 200103,
    GroupId: 2001,
  },
  {
    Id: 200105,
    GroupId: 2001,
  },
  {
    Id: 200106,
    GroupId: 2001,
  },
  {
    Id: 200107,
    GroupId: 2001,
  },
  {
    Id: 200108,
    GroupId: 2001,
  },
  {
    Id: 200110,
    GroupId: 2001,
  },
  {
    Id: 200111,
    GroupId: 2001,
  },
  {
    Id: 200115,
    GroupId: 2001,
  },
  {
    Id: 200302,
    GroupId: 2003,
  },
  {
    Id: 200303,
    GroupId: 2003,
  },
  {
    Id: 200304,
    GroupId: 2003,
  },
  {
    Id: 200305,
    GroupId: 2003,
  },
  {
    Id: 200306,
    GroupId: 2003,
  },
  {
    Id: 300510,
    GroupId: 3001,
  },
  {
    Id: 300123,
    GroupId: 3001,
  },
  {
    Id: 300205,
    GroupId: 3002,
  },
  {
    Id: 300206,
    GroupId: 3002,
  },
  {
    Id: 300207,
    GroupId: 3002,
  },
  {
    Id: 300208,
    GroupId: 3002,
  },
  {
    Id: 300209,
    GroupId: 3002,
  },
  {
    Id: 300210,
    GroupId: 3002,
  },
  {
    Id: 300211,
    GroupId: 3002,
  },
  {
    Id: 300212,
    GroupId: 3002,
  },
  {
    Id: 300213,
    GroupId: 3002,
  },
  {
    Id: 400105,
    GroupId: 4001,
  },
  {
    Id: 400106,
    GroupId: 4001,
  },
  {
    Id: 400107,
    GroupId: 4001,
  },
  {
    Id: 400115,
    GroupId: 4001,
  },
  {
    Id: 400205,
    GroupId: 4002,
  },
  {
    Id: 400210,
    GroupId: 4002,
  },
  {
    Id: 400211,
    GroupId: 4002,
  },
  {
    Id: 400212,
    GroupId: 4002,
  },
  {
    Id: 400215,
    GroupId: 4002,
  },
  {
    Id: 100408,
    GroupId: 1004,
  },
  {
    Id: 100409,
    GroupId: 1004,
  },
  {
    Id: 100414,
    GroupId: 1004,
  },
  {
    Id: 100416,
    GroupId: 1004,
  },
  {
    Id: 100417,
    GroupId: 1004,
  },
  {
    Id: 100418,
    GroupId: 1004,
  },
  {
    Id: 100419,
    GroupId: 1004,
  },
  {
    Id: 100420,
    GroupId: 1004,
  },
  {
    Id: 100421,
    GroupId: 1004,
  },
  {
    Id: 100422,
    GroupId: 1004,
  },
  {
    Id: 100423,
    GroupId: 1004,
  },
  {
    Id: 100424,
    GroupId: 1004,
  },
  {
    Id: 100425,
    GroupId: 1004,
  },
  {
    Id: 100426,
    GroupId: 1004,
  },
  {
    Id: 100427,
    GroupId: 1004,
  },
  {
    Id: 100429,
    GroupId: 1004,
  },
  {
    Id: 100430,
    GroupId: 1004,
  },
  {
    Id: 110110,
    GroupId: 1001,
  },
  {
    Id: 110111,
    GroupId: 1001,
  },
  {
    Id: 110112,
    GroupId: 1001,
  },
  {
    Id: 110113,
    GroupId: 1001,
  },
  {
    Id: 110114,
    GroupId: 1001,
  },
  {
    Id: 110116,
    GroupId: 1001,
  },
  {
    Id: 110117,
    GroupId: 1001,
  },
  {
    Id: 110118,
    GroupId: 1001,
  },
  {
    Id: 300511,
    GroupId: 3005,
  },
  {
    Id: 300512,
    GroupId: 3005,
  },
  {
    Id: 300513,
    GroupId: 3005,
  },
  {
    Id: 300514,
    GroupId: 3005,
  },
  {
    Id: 110115,
    GroupId: 1001,
  },
  {
    Id: 100124,
    GroupId: 1001,
  },
  {
    Id: 110108,
    GroupId: 1001,
  },
  {
    Id: 200109,
    GroupId: 2001,
  },
  {
    Id: 200301,
    GroupId: 2003,
  },
  {
    Id: 400216,
    GroupId: 4002,
  },
  {
    Id: 100125,
    GroupId: 3002,
  },
  {
    Id: 100126,
    GroupId: 3002,
  },
  {
    Id: 400117,
    GroupId: 4001,
  },
  {
    Id: 400118,
    GroupId: 4001,
  },
  {
    Id: 400119,
    GroupId: 4001,
  },
  {
    Id: 100432,
    GroupId: 1004,
  },
  {
    Id: 100433,
    GroupId: 1004,
  },
  {
    Id: 100434,
    GroupId: 1004,
  },
  {
    Id: 300515,
    GroupId: 3005,
  },
  {
    Id: 300517,
    GroupId: 3005,
  },
  {
    Id: 300518,
    GroupId: 3005,
  },
  {
    Id: 300519,
    GroupId: 3005,
  },
  {
    Id: 300520,
    GroupId: 3005,
  },
  {
    Id: 200116,
    GroupId: 2001,
  },
  {
    Id: 200117,
    GroupId: 2001,
  },
  {
    Id: 300146,
    GroupId: 3001,
  },
  {
    Id: 200307,
    GroupId: 2003,
  },
  {
    Id: 110109,
    GroupId: 1001,
  },
  {
    Id: 100217,
    GroupId: 1001,
  },
  {
    Id: 100218,
    GroupId: 1001,
  },
  {
    Id: 100219,
    GroupId: 1001,
  },
  {
    Id: 100220,
    GroupId: 1001,
  },
  {
    Id: 100222,
    GroupId: 1001,
  },
  {
    Id: 100223,
    GroupId: 1003,
  },
  {
    Id: 100224,
    GroupId: 1003,
  },
  {
    Id: 100225,
    GroupId: 1003,
  },
  {
    Id: 100226,
    GroupId: 1003,
  },
  {
    Id: 100227,
    GroupId: 1003,
  },
  {
    Id: 100228,
    GroupId: 1003,
  },
  {
    Id: 100229,
    GroupId: 1003,
  },
  {
    Id: 100230,
    GroupId: 1003,
  },
  {
    Id: 100231,
    GroupId: 1003,
  },
  {
    Id: 100232,
    GroupId: 1003,
  },
  {
    Id: 100233,
    GroupId: 1003,
  },
  {
    Id: 100234,
    GroupId: 1003,
  },
  {
    Id: 100235,
    GroupId: 1003,
  },
  {
    Id: 100236,
    GroupId: 1003,
  },
  {
    Id: 101700507,
    GroupId: 7005,
  },
  {
    Id: 101700508,
    GroupId: 7005,
  },
  {
    Id: 101700509,
    GroupId: 7005,
  },
  {
    Id: 101700511,
    GroupId: 7005,
  },
  {
    Id: 101700512,
    GroupId: 7005,
  },
  {
    Id: 101700607,
    GroupId: 7006,
  },
  {
    Id: 101700608,
    GroupId: 7006,
  },
  {
    Id: 101700609,
    GroupId: 7006,
  },
  {
    Id: 101700610,
    GroupId: 7006,
  },
  {
    Id: 101700611,
    GroupId: 7006,
  },
  {
    Id: 101700704,
    GroupId: 7007,
  },
  {
    Id: 101700705,
    GroupId: 7007,
  },
  {
    Id: 101700706,
    GroupId: 7007,
  },
  {
    Id: 101700707,
    GroupId: 7007,
  },
  {
    Id: 300147,
    GroupId: 3001,
  },
  {
    Id: 300148,
    GroupId: 3001,
  },
  {
    Id: 300149,
    GroupId: 3001,
  },
  {
    Id: 300150,
    GroupId: 3001,
  },
  {
    Id: 300151,
    GroupId: 3001,
  },
  {
    Id: 300152,
    GroupId: 3001,
  },
  {
    Id: 300153,
    GroupId: 3001,
  },
  {
    Id: 300154,
    GroupId: 3001,
  },
  {
    Id: 300155,
    GroupId: 3001,
  },
  {
    Id: 300156,
    GroupId: 3001,
  },
  {
    Id: 300157,
    GroupId: 3001,
  },
  {
    Id: 300158,
    GroupId: 3001,
  },
  {
    Id: 300159,
    GroupId: 3001,
  },
  {
    Id: 300160,
    GroupId: 3001,
  },
  {
    Id: 300161,
    GroupId: 3001,
  },
  {
    Id: 300162,
    GroupId: 3001,
  },
  {
    Id: 300163,
    GroupId: 3001,
  },
  {
    Id: 300164,
    GroupId: 3001,
  },
  {
    Id: 300165,
    GroupId: 3001,
  },
  {
    Id: 300167,
    GroupId: 3001,
  },
  {
    Id: 300168,
    GroupId: 3001,
  },
  {
    Id: 300169,
    GroupId: 3001,
  },
  {
    Id: 300170,
    GroupId: 3001,
  },
  {
    Id: 300171,
    GroupId: 3001,
  },
  {
    Id: 300172,
    GroupId: 3001,
  },
  {
    Id: 300173,
    GroupId: 3001,
  },
  {
    Id: 300174,
    GroupId: 3001,
  },
  {
    Id: 300175,
    GroupId: 3001,
  },
  {
    Id: 300176,
    GroupId: 3001,
  },
  {
    Id: 101700101,
    GroupId: 7001,
  },
  {
    Id: 101700102,
    GroupId: 7001,
  },
  {
    Id: 101700103,
    GroupId: 7001,
  },
  {
    Id: 101700201,
    GroupId: 7002,
  },
  {
    Id: 101700202,
    GroupId: 7002,
  },
  {
    Id: 101700203,
    GroupId: 7002,
  },
  {
    Id: 101700204,
    GroupId: 7002,
  },
  {
    Id: 101700205,
    GroupId: 7002,
  },
  {
    Id: 101700401,
    GroupId: 7004,
  },
  {
    Id: 101700402,
    GroupId: 7004,
  },
  {
    Id: 101700403,
    GroupId: 7004,
  },
  {
    Id: 101700404,
    GroupId: 7004,
  },
  {
    Id: 101700405,
    GroupId: 7004,
  },
  {
    Id: 101700406,
    GroupId: 7004,
  },
];

class ForceUnlocker {
  //GuideTutorial
  static GmUnlockOneTutorial() {
    //seem cant use
    for (let id of TutorialList) {
      TutorialController_1.TutorialController.GmUnlockOneTutorial(id);
    }
  }
  static RemoveRedDotTutorial() {
    //work
    for (let id of TutorialList) {
      TutorialController_1.TutorialController.RemoveRedDotTutorialId(id);
    }
  }

  //Achievement
  static RequestGetAchievementReward() {
    for (let achievement of AchievementList) {
      let state =
        ModelManager_1.ModelManager.AchievementModel.GetAchievementData(
          achievement.Id
        ).GetFinishState();
      if (state) {
        let data = new Protocol_1.Aki.Protocol.o$n();
        data.Ekn = achievement.Id;
        data.QFn = achievement.GroupId;
        Net_1.Net.Call(
          24815 /*NetDefine_1.ERequestMessageId.AchievementReceiveRequest*/,
          data,
          (e) => {}
        );
      }
    }
  }
}

exports.ForceUnlocker = ForceUnlocker;

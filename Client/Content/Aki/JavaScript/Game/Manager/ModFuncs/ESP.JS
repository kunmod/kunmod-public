"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ESP = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  ModManager_1 = require("../ModManager"),
  ModUtils_1 = require("./ModUtils"),
  UiManager_1 = require("../../../Ui/UiManager");

class ESP {
    UE.KismetSystemLibrary.DrawDebugArrow(
        WorldContextObject, // UObject* 类型，通常是游戏世界的引用
        LineStart, // FVector 类型，箭头的起始位置
        LineEnd, // FVector 类型，箭头的结束位置
        ArrowSize, // float 类型，箭头的大小
        LineColor, // FLinearColor 类型，箭头的颜色
        Duration, // float 类型，箭头显示的持续时间（秒）
        Thickness // float 类型，箭头的线条粗细
      );
      
}
//puerts.logger.info(debug)
exports.ESP = ESP;

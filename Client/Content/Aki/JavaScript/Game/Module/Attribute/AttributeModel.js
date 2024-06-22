"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TipsDataTool = exports.AttributeModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  CommonComponentDefine_1 = require("../Common/CommonComponentDefine"),
  ModManager_1 = require("../../Manager/ModManager"),
  AttributeDefine_1 = require("./AttributeDefine");
class AttributeModel extends ModelBase_1.ModelBase {
  GetFormatAttributeValueString(e, t, r = !1) {
    let ratio = 1;
    if (ModManager_1.ModManager.Settings.AttributeModifier) {
       ratio = 1000000;
      t = t * ratio;
    }

    var i = t;
    return ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(
      e
    ).IsPercent
      ? MathUtils_1.MathUtils.GetFloatPointFloorString(i / 100, 1) + "%"
      : r * ratio
      ? MathUtils_1.MathUtils.GetFloatPointFloorString(100 * i, 1) + "%"
      : Math.floor(t).toString();
  }
}
exports.AttributeModel = AttributeModel;
class TipsDataTool {
  static GetCommonTipsAttributeData(e, t, r, i) {
    e = TipsDataTool.GetAttributeValue(e, t, r);
    return new CommonComponentDefine_1.TipsAttributeData(i, e, r);
  }
  static GetAttributeValue(e, t, r) {
    let i = 0;
    return (i = r
      ? (e / AttributeDefine_1.TEN_THOUSANDTH_RATIO) *
        (t / AttributeDefine_1.TEN_THOUSANDTH_RATIO)
      : e * (t / AttributeDefine_1.TEN_THOUSANDTH_RATIO));
  }
  static GetPropRatioValue(e, t) {
    let r = 0;
    return (r = t ? e / AttributeDefine_1.TEN_THOUSANDTH_RATIO : e);
  }
}
exports.TipsDataTool = TipsDataTool;
//# sourceMappingURL=AttributeModel.js.map

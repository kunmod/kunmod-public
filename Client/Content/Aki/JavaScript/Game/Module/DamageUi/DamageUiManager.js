"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DamageUiManager = exports.DamageInfo = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  Queue_1 = require("../../../Core/Container/Queue"),
  CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  Global_1 = require("../../Global"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  ModManager_1 = require("../../Manager/ModManager"),
  UiLayer_1 = require("../../Ui/UiLayer"),
  BattleUiDefine_1 = require("../BattleUi/BattleUiDefine"),
  DamageUiSequencePool_1 = require("./DamageUiSequencePool"),
  DamageViewData_1 = require("./DamageViewData"),
  DamageView_1 = require("./View/DamageView"),
  PRELOAD_DAMAGE_VIEW_COUNT = 21,
  MAX_DAMAGE_PER_FRAME = 1;
class DamageInfo {
  constructor() {
    (this.Damage = 0),
      (this.ElementId = 0),
      (this.DamagePosition = void 0),
      (this.IsOwnPlayer = !1),
      (this.IsCritical = !1),
      (this.IsCure = !1),
      (this.DamageTextId = 0),
      (this.DamageText = "");
  }
}
exports.DamageInfo = DamageInfo;
class DamageUiManager {
  static Initialize() {
    (this.MinDamageOffsetScale =
      CommonParamById_1.configCommonParamById.GetIntConfig(
        "MinDamageOffsetScale"
      ) / 100),
      (this.MaxDamageOffsetScale =
        CommonParamById_1.configCommonParamById.GetIntConfig(
          "MaxDamageOffsetScale"
        ) / 100),
      (this.MinDamageOffsetDistance =
        CommonParamById_1.configCommonParamById.GetIntConfig(
          "MinDamageOffsetDistance"
        )),
      (this.MaxDamageOffsetDistance =
        CommonParamById_1.configCommonParamById.GetIntConfig(
          "MaxDamageOffsetDistance"
        )),
      (this.DamagePositionCache = Vector_1.Vector.Create()),
      (this.FNt =
        ConfigManager_1.ConfigManager.DamageUiConfig.GetAllDamageTextConfig()),
      this.InitializeDamageViewData();
  }
  static InitializeDamageViewData() {
    for (const e of this.FNt) {
      var a = new DamageViewData_1.DamageViewData();
      a.Initialize(e), this.VNt.set(e.Id, a);
    }
  }
  static ClearDamageViewData() {
    this.VNt.clear();
  }
  static GetDamageViewData(a) {
    return this.VNt.get(a);
  }
  static PreloadDamageView() {
    for (let a = this.HNt.length; a < PRELOAD_DAMAGE_VIEW_COUNT; a++) {
      var e = new DamageView_1.DamageView();
      e.Init(), this.TotalDamageViewNum++, this.HNt.push(e);
    }
  }
  static PreloadSequence() {}
  static ApplyDamage(e, i, t, r, g, n, o = -1, s = "") {
    if (
      DamageUiManager.jNt &&
      r.Active &&
      !(o < 0 || (1 === o && n && 0 === e))
    ) {
      var m = ModelManager_1.ModelManager.FormationModel.GetCurrentEntity;
      if (m) {
        m = m.Id === r.Id;
        let a = void 0;
        ((a = 0 < this.WNt.length ? this.WNt.pop() : new DamageInfo()).Damage =
          e),
          (a.ElementId = i),
          (a.DamagePosition = t),
          (a.IsOwnPlayer = m),
          (a.IsCritical = g),
          (a.IsCure = n),
          (a.DamageTextId = o),
          (a.DamageText = s),
          this.KNt.Push(a);
      }
    }
  }
  static QNt(a) {
    if (ModManager_1.ModManager.Settings.HideDmgUi) return false;
    var e, i, t, r;
    DamageUiManager.jNt &&
      ((e = Math.floor(Math.abs(a.Damage))),
      (i = DamageUiManager.$Nt(
        a.ElementId,
        a.IsCure,
        a.Damage,
        a.DamageTextId
      )) < 0
        ? Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Battle",
            8,
            "[DamageText]产生伤害飘字时，伤害飘字Id无效",
            ["textId", i],
            ["elementId", a.ElementId],
            ["bCure", a.IsCure],
            ["damageTextId", a.DamageTextId]
          )
        : (this.DamagePositionCache.DeepCopy(a.DamagePosition),
          (t = this.GetDamageViewData(i))
            ? (r = this.ProjectWorldLocationToScreenPosition(
                a.DamagePosition
              )) &&
              DamageUiManager.XNt(
                e,
                this.DamagePositionCache,
                r,
                t,
                a.IsCritical,
                a.IsCure,
                a.IsOwnPlayer,
                a.DamageText
              )
            : Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn("Battle", 8, "找不到对应的伤害飘字配置", [
                "伤害飘字Id",
                i,
              ])));
  }
  static Tick(a) {
    for (const i of DamageUiManager.YNt) i.Tick(a);
    for (let a = 0; a < MAX_DAMAGE_PER_FRAME && !this.KNt.Empty; a++) {
      var e = this.KNt.Pop();
      this.QNt(e), this.WNt.push(e);
    }
  }
  static $Nt(a, e, i, t = -1) {
    let r = -1;
    return (r =
      t && -1 !== t
        ? t
        : 0 === i
        ? BattleUiDefine_1.IMMUNITY_DAMAGE_TEXT_ID
        : 0 < a
        ? a
        : e
        ? BattleUiDefine_1.CURE_DAMAGE_TEXT
        : BattleUiDefine_1.ATK_DAMAGE_TEXT);
  }
  static ProjectWorldLocationToScreenPosition(a) {
    var e = Global_1.Global.CharacterController;
    if (UE.GameplayStatics.ProjectWorldToScreen(e, a, this.JNt, !1)) {
      e = (0, puerts_1.$unref)(this.JNt);
      if (e) {
        var a = e.X,
          i = e.Y;
        if (!isNaN(a) && !isNaN(i) && isFinite(a) && isFinite(i)) return e;
      }
    }
  }
  static ScreenPositionToLguiPosition(a) {
    return UiLayer_1.UiLayer.UiRootItem.GetCanvasScaler().ConvertPositionFromViewportToLGUICanvas(
      a
    );
  }
  static XNt(a, e, i, t, r = !1, g = !1, n = !1, o = "") {
    let s = void 0;
    return (
      0 < this.HNt.length
        ? (s = this.HNt.pop())
        : ((s = new DamageView_1.DamageView()).Init(),
          this.TotalDamageViewNum++),
      this.YNt.add(s),
      s.InitializeData(a, e, i, t, r, g, n, o),
      s
    );
  }
  static RemoveDamageView(a) {
    this.YNt.has(a) && (a.ClearData(), this.YNt.delete(a), this.HNt.push(a));
  }
  static OnEditorPlatformChanged() {
    for (const a of DamageUiManager.YNt) a.RefreshFontSize();
    for (const e of DamageUiManager.HNt) e.RefreshFontSize();
  }
  static OnLeaveLevel() {
    for (const a of DamageUiManager.YNt) a.ClearData(), a.Destroy();
    DamageUiManager.YNt.clear();
    for (const e of DamageUiManager.HNt) e.Destroy();
    (DamageUiManager.HNt.length = 0),
      (DamageUiManager.TotalDamageViewNum = 0),
      DamageUiSequencePool_1.DamageUiSequencePool.Clear(),
      DamageUiManager.KNt.Clear(),
      (DamageUiManager.WNt.length = 0);
  }
  static Clear() {}
}
((exports.DamageUiManager = DamageUiManager).KNt = new Queue_1.Queue()),
  (DamageUiManager.WNt = []),
  (DamageUiManager.TotalDamageViewNum = 0),
  (DamageUiManager.YNt = new Set()),
  (DamageUiManager.HNt = new Array()),
  (DamageUiManager.VNt = new Map()),
  (DamageUiManager.jNt = !0),
  (DamageUiManager.MinDamageOffsetScale = 0),
  (DamageUiManager.MaxDamageOffsetScale = 0),
  (DamageUiManager.MinDamageOffsetDistance = 0),
  (DamageUiManager.MaxDamageOffsetDistance = 0),
  (DamageUiManager.DamagePositionCache = void 0),
  (DamageUiManager.FNt = void 0),
  (DamageUiManager.JNt = (0, puerts_1.$ref)(void 0));
//# sourceMappingURL=DamageUiManager.js.map

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlotSkipComponent = void 0);
const StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  ModManager_1 = require("../../../Manager/ModManager"),
  ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
class PlotSkipComponent {
  constructor(e, t, i, o) {
    (this.Fue = !1),
      (this.MYi = void 0),
      (this.EYi = StringUtils_1.EMPTY_STRING),
      (this.SYi = !0),
      (this.yYi = void 0),
      (this.EnableSkipButton = (e) => {
        if (ModManager_1.ModManager.Settings.PlotSkip) {
          this.Fue = e;
          this.IYi.SetUIActive(this.Fue);
        } else {
          (e && !ModelManager_1.ModelManager.PlotModel.PlotConfig.CanSkip) ||
            this.Fue === e ||
            ((this.Fue = e), this.IYi.SetUIActive(this.Fue), this.Fue) ||
            ControllerHolder_1.ControllerHolder.ConfirmBoxController.CloseConfirmBoxView();
        }
      }),
      (this.TYi = () => {
        var e;
        this.Fue &&
          (this.VSt?.(),
          ModelManager_1.ModelManager.PlotModel.PlotConfig.IsSkipConfirmBoxShow
            ? ((this.SYi = !0),
              ((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(180)).HasToggle =
                !0),
              (e.ToggleText = this.EYi),
              e.SetToggleFunction(this.LYi), //lyi设置函数
              (e.AttachView = this.yYi),
              e.FunctionMap.set(2, () => {
                this?.Fue &&
                  ((ModelManager_1.ModelManager.PlotModel.PlotConfig.IsSkipConfirmBoxShow =
                    this.SYi),
                  (this.Fue = !1),
                  this.DYi?.());
              }),
              ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
                e
              ))
            : this.DYi?.());
      }),
      (this.LYi = (e) => {
        this?.Fue && (this.SYi = !e);
      }),
      (this.MYi = e),
      (this.IYi = e.RootUIComp),
      (this.DYi = t),
      (this.VSt = i),
      (this.yYi = o),
      (this.Fue = !1),
      this.MYi.OnClickCallBack.Bind(this.TYi), //
      (this.EYi = ConfigManager_1.ConfigManager.TextConfig?.GetTextById(
        "PlotSkipConfirmToggle"
      )),
      StringUtils_1.StringUtils.IsEmpty(this.EYi) &&
        (ControllerHolder_1.ControllerHolder.FlowController.LogError(
          '剧情跳过二次确认框读不到Toggle文本 "PlotSkipConfirmToggle"'
        ),
        (this.EYi = ""));
  }
  OnClear() {
    (this.Fue = !1),
      this.MYi?.OnClickCallBack.Unbind(),
      (this.MYi = void 0),
      (this.IYi = void 0),
      (this.yYi = void 0),
      (this.DYi = void 0),
      (this.VSt = void 0),
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.CloseConfirmBoxView();
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.EnableSkipPlot,
      this.EnableSkipButton
    );
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.EnableSkipPlot,
      this.EnableSkipButton
    );
  }
}
exports.PlotSkipComponent = PlotSkipComponent;
//# sourceMappingURL=PlotSkipComponent.js.map

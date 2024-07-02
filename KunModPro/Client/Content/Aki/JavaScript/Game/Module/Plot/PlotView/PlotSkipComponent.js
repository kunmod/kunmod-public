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
    (this.dce = !1),
      (this.tzi = void 0),
      (this.izi = StringUtils_1.EMPTY_STRING),
      (this.ozi = !0),
      (this.rzi = void 0),
      (this.EnableSkipButton = (e) => {
        if (ModManager_1.ModManager.Settings.PlotSkip) {
          this.dce = e;
          this.nzi.SetUIActive(this.dce);
        } else {
          (e && !ModelManager_1.ModelManager.PlotModel.PlotConfig.CanSkip) ||
            this.dce === e ||
            ((this.dce = e), this.nzi.SetUIActive(this.dce), this.dce) ||
            ControllerHolder_1.ControllerHolder.ConfirmBoxController.CloseConfirmBoxView();
        }
      }),
      (this.szi = () => {
        var e;
        this.dce &&
          (this.wIt?.(),
          ModelManager_1.ModelManager.PlotModel.PlotConfig.IsSkipConfirmBoxShow
            ? ((this.ozi = !0),
              ((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(180)).HasToggle =
                !0),
              (e.ToggleText = this.izi),
              e.SetToggleFunction(this.azi),
              (e.AttachView = this.rzi),
              e.FunctionMap.set(2, () => {
                this?.dce &&
                  ((ModelManager_1.ModelManager.PlotModel.PlotConfig.IsSkipConfirmBoxShow =
                    this.ozi),
                  (this.dce = !1),
                  this.hzi?.());
              }),
              ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
                e
              ))
            : this.hzi?.());
      }),
      (this.azi = (e) => {
        this?.dce && (this.ozi = !e);
      }),
      (this.tzi = e),
      (this.nzi = e.RootUIComp),
      (this.hzi = t),
      (this.wIt = i),
      (this.rzi = o),
      (this.dce = !1),
      this.tzi.OnClickCallBack.Bind(this.szi),
      (this.izi = ConfigManager_1.ConfigManager.TextConfig?.GetTextById(
        "PlotSkipConfirmToggle"
      )),
      StringUtils_1.StringUtils.IsEmpty(this.izi) &&
        (ControllerHolder_1.ControllerHolder.FlowController.LogError(
          '剧情跳过二次确认框读不到Toggle文本 "PlotSkipConfirmToggle"'
        ),
        (this.izi = ""));
  }
  OnClear() {
    (this.dce = !1),
      this.tzi?.OnClickCallBack.Unbind(),
      (this.tzi = void 0),
      (this.nzi = void 0),
      (this.rzi = void 0),
      (this.hzi = void 0),
      (this.wIt = void 0),
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

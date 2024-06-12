"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WaterMaskView = void 0);
const UE = require("ue"),
  Info_1 = require("../../../Core/Common/Info"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  UiLayerType_1 = require("../../Ui/Define/UiLayerType"),
  UiLayer_1 = require("../../Ui/UiLayer");
class WaterMaskView extends UiControllerBase_1.UiControllerBase {
  static CanOpenView() {
    return !1;
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnGetPlayerBasicInfo,
      this.Lqr
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.SetResolution,
        this.Dqr
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.BackLoginView,
        this.Rqr
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnGetPlayerBasicInfo,
      this.Lqr
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.SetResolution,
        this.Dqr
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.BackLoginView,
        this.Rqr
      );
  }
}
(exports.WaterMaskView = WaterMaskView),
  ((_a = WaterMaskView).Uqr = void 0),
  (WaterMaskView.Aqr = 1500),//300
  (WaterMaskView.xqr = 1500),
  (WaterMaskView.Pqr = 30),
  (WaterMaskView.wqr = 1),//0.09
  (WaterMaskView.MOt = 60),
  (WaterMaskView.Lqr = () => {
    void 0 !== _a.Uqr && _a.Rqr();
    var e = UiLayer_1.UiLayer.GetLayerRootUiItem(
        UiLayerType_1.ELayerType.WaterMask
      ),
      t =
        ((_a.Uqr = UE.KuroActorManager.SpawnActor(
          Info_1.Info.World,
          UE.UIContainerActor.StaticClass(),
          MathUtils_1.MathUtils.DefaultTransform,
          void 0
        )),
        _a.Uqr.RootComponent),
      e =
        (t.SetDisplayName("WaterMaskContainer"),
        UE.KuroStaticLibrary.SetActorPermanent(_a.Uqr, !0, !0),
        _a.Uqr.K2_AttachRootComponentTo(e),
        t.GetRootCanvas().GetOwner().RootComponent),
      i = (e.widget.width % _a.Aqr) / 2,
      r = (e.widget.height % _a.xqr) / 2,
      n = e.widget.width / 2,
      _ = e.widget.height / 2,
      s = Math.ceil(e.widget.width / _a.Aqr),
      o = Math.ceil(e.widget.height / _a.xqr),
      //v = ModelManager_1.ModelManager.FunctionModel.PlayerId.toString();
      v = "there is no watermark";
    for (let a = 0; a < s; a++)
      for (let e = 0; e < o; e++) {
        var E = UE.KuroActorManager.SpawnActor(
            Info_1.Info.World,
            UE.UITextActor.StaticClass(),
            MathUtils_1.MathUtils.DefaultTransform,
            void 0
          ),
          U = E.RootComponent,
          U =
            (E.K2_AttachRootComponentTo(t),
            U.SetDisplayName("WaterMaskText"),
            E.GetComponentByClass(UE.UIText.StaticClass()));
        U.SetFontSize(_a.MOt),
          U.SetOverflowType(0),
          U.SetAlpha(1),
          U.SetFont(UE.LGUIFontData.GetDefaultFont()),
          U.SetText(v),
          U.SetUIRelativeLocation(
            new UE.Vector(a * _a.Aqr - n + i, e * _a.xqr - _ + r, 0)
          ),
          U.SetUIRelativeRotation(new UE.Rotator(0, _a.Pqr, 0)),
          UE.KuroStaticLibrary.SetActorPermanent(E, !0, !0);
      }
  }),
  (WaterMaskView.Rqr = () => {
    void 0 !== _a.Uqr && (_a.Uqr.K2_DestroyActor(), (_a.Uqr = void 0));
  }),
  (WaterMaskView.Dqr = () => {
    _a.Rqr(), _a.Lqr();
  });
//# sourceMappingURL=WaterMaskController.js.map

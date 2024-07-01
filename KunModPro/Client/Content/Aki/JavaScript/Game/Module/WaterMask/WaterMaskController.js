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
      this.ENo
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.SetResolution,
        this.yNo
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.BackLoginView,
        this.INo
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnGetPlayerBasicInfo,
      this.ENo
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.SetResolution,
        this.yNo
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.BackLoginView,
        this.INo
      );
  }
}
(exports.WaterMaskView = WaterMaskView),
  ((_a = WaterMaskView).TNo = void 0),
  (WaterMaskView.LNo = 300),
  (WaterMaskView.DNo = 300),
  (WaterMaskView.RNo = 30),
  (WaterMaskView.UNo = 0.09),
  (WaterMaskView.p2t = 40),
  (WaterMaskView.ENo = () => {
    void 0 !== _a.TNo && _a.INo();
    var e = UiLayer_1.UiLayer.GetLayerRootUiItem(
        UiLayerType_1.ELayerType.WaterMask
      ),
      t =
        ((_a.TNo = UE.KuroActorManager.SpawnActor(
          Info_1.Info.World,
          UE.UIContainerActor.StaticClass(),
          MathUtils_1.MathUtils.DefaultTransform,
          void 0
        )),
        _a.TNo.RootComponent),
      e =
        (t.SetDisplayName("WaterMaskContainer"),
        UE.KuroStaticLibrary.SetActorPermanent(_a.TNo, !0, !0),
        _a.TNo.K2_AttachRootComponentTo(e),
        t.GetRootCanvas().GetOwner().RootComponent),
      i = (e.widget.width % _a.LNo) / 2,
      r = (e.widget.height % _a.DNo) / 2,
      n = e.widget.width / 2,
      _ = e.widget.height / 2,
      s = Math.ceil(e.widget.width / _a.LNo),
      o = Math.ceil(e.widget.height / _a.DNo),
      //v = ModelManager_1.ModelManager.FunctionModel.PlayerId.toString();
      v = "there is no watermask";
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
        U.SetFontSize(_a.p2t),
          U.SetOverflowType(0),
          U.SetAlpha(_a.UNo),
          U.SetFont(UE.LGUIFontData.GetDefaultFont()),
          U.SetText(v),
          U.SetUIRelativeLocation(
            new UE.Vector(a * _a.LNo - n + i, e * _a.DNo - _ + r, 0)
          ),
          U.SetUIRelativeRotation(new UE.Rotator(0, _a.RNo, 0)),
          UE.KuroStaticLibrary.SetActorPermanent(E, !0, !0);
      }
  }),
  (WaterMaskView.INo = () => {
    void 0 !== _a.TNo && (_a.TNo.K2_DestroyActor(), (_a.TNo = void 0));
  }),
  (WaterMaskView.yNo = () => {
    _a.INo(), _a.ENo();
  });
//# sourceMappingURL=WaterMaskController.js.map

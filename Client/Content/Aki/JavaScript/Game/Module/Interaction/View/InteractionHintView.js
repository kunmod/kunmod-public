"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InteractionHintView = void 0);
const UE = require("ue"),
  AudioSystem_1 = require("../../../../Core/Audio/AudioSystem"),
  Log_1 = require("../../../../Core/Common/Log"),
  Stats_1 = require("../../../../Core/Common/Stats"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
  UiLayerType_1 = require("../../../Ui/Define/UiLayerType"),
  InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController"),
  InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine"),
  TouchFingerManager_1 = require("../../../Ui/TouchFinger/TouchFingerManager"),
  GuideConfig_1 = require("../../Guide/GuideConfig"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  InteractionDefine_1 = require("../InteractionDefine"),
  InteractionGuide_1 = require("./InteractionGuide"),
  ModManager_1 = require("../../../Manager/ModManager"), //addkunmod
  InteractionHint_1 = require("../InteractionHint");
class InteractionHintView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.Nbe = void 0),
      (this.Wli = 0),
      (this.Kli = void 0),
      (this.Qli = 1),
      (this.$li = 0),
      (this.Xli = 0),
      (this.Yli = 0),
      (this.Jli = 0),
      (this.zli = InteractionDefine_1.LERP_TIME),
      (this.uyt = -1),
      (this.Zli = 0),
      (this.e1i = void 0),
      (this.t1i = []),
      (this.i1i = 0),
      (this.r1i = !1),
      (this.o1i = void 0),
      (this.n1i = void 0),
      (this.s1i = void 0),
      (this.Ilt = 0),
      (this.a1i = !1),
      (this.h1i = 0),
      (this.l1i = 0),
      (this._1i = 0),
      (this.u1i = !1),
      (this.c1i = 0),
      (this.m1i = void 0),
      (this.d1i = !1),
      (this.IsHoverHint = !1),
      (this.C1i = !1),
      (this.g1i = !1),
      (this.FXt = () => {
        this.Yti();
      }),
      (this.f1i = () => {
        this.CloseMe();
      }),
      (this.p1i = (t) => {
        0 <= this.Zli && this.uzt(this.Zli),
          this.m1i && this.d1i && ((this.d1i = !1), this.v1i());
        var i = this.Kli.GetDisplayGridNum(),
          e = this.Qli > this.$li ? this.$li : this.Qli,
          i = ((this.Qli = i), this.Qli > this.$li ? this.$li : this.Qli);
        e !== i &&
          ((this.Yli = this.Xli + this.Jli * ((i - 1) / 2)),
          (this.zli = 0),
          (this.C1i = !0));
      }),
      (this.M1i = () => {
        var t = new InteractionHint_1.InteractionHint();
        return (
          t.BindOnHover(this.E1i),
          t.BindOnUnHover(this.S1i),
          t.BindOnToggleStateChanged(this.Ali),
          t
        );
      }),
      (this.E1i = (t) => {
        this.IsHoverHint = !0;
        t = t.ActorIndex;
        this.uzt(t);
      }),
      (this.S1i = (t) => {
        this.IsHoverHint = !1;
      }),
      (this.Ali = (t, i) => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Test",
            8,
            "[InteractionView]自动拾取-----当ExtendToggle状态改变时，会打断自动拾取"
          ),
          (this.a1i = !1),
          this.y1i(),
          this.InteractPawn(i);
      }),
      (this.NYt = (t) => {
        t || (this.IsHoverHint = !1);
      }),
      (this.Tje = () => {
        this.I1i();
      }),
      (this.T1i = () => {
        ModelManager_1.ModelManager.PlatformModel.IsMobile() &&
          this.L1i() &&
          this.D1i();
      }),
      (this.R1i = () => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Test", 8, "[InteractionView]自动拾取-----成功拾取", [
            "IsAutoPicked",
            this.a1i,
          ]),
          this.a1i ? this.U1i() : (this.r1i = !1);
      }),
      (this.A1i = () => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Test", 8, "[InteractionView]刷新交互选项时"),
          (this.r1i = !1),
          this.r1i
            ? Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "Test",
                8,
                "[InteractionView]刷新交互选项 - 自动拾取中",
                ["Count", this.t1i?.length]
              )
            : this.n1i
            ? Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "Test",
                8,
                "[InteractionView]刷新交互选项 - 下一帧会刷新交互选项"
              )
            : (this.n1i = TimerSystem_1.TimerSystem.Next(() => {
                this.x1i(),
                  Log_1.Log.CheckDebug() &&
                    Log_1.Log.Debug(
                      "Test",
                      8,
                      "[InteractionView]刷新交互选项 - 开始刷新交互选项",
                      ["Count", this.t1i?.length]
                    ),
                  this.P1i(this.t1i),
                  this.w1i(),
                  (this.n1i = void 0);
              }));
      }),
      (this.Jve = (t, i) => {
        0 === i
          ? this.B1i()
          : 1 === i && (this.m1i ? this.v1i() : (this.d1i = !0));
      }),
      (this.AZe = () => {
        this.D1i();
      }),
      (this.b1i = (t, i) => {
        0 === i && this.q1i(void 0, -1);
      }),
      (this.q1i = (t, i) => {
        0 === i ||
          this.IsHoverHint ||
          (1 !== this.Kli.GetDisplayGridNum() && this.SelectHint(0 < i));
      }),
      (this.G1i = (t, i) => {
        0 === i && this.SelectHint(!0);
      }),
      (this.N1i = (t, i) => {
        0 === i && this.SelectHint(!1);
      }),
      (this.ywt = (t, i) => {
        (i = i.TouchType),
          (t = Number(t)),
          (t = TouchFingerManager_1.TouchFingerManager.GetTouchFingerData(t));
        t &&
          (0 === i
            ? (this.u1i = t.IsTouchComponentContainTag(
                InteractionDefine_1.autoPickUpTag
              ))
            : 1 === i &&
              (this.u1i &&
                t.IsTouchComponentContainTag(
                  InteractionDefine_1.autoPickUpTag
                ) &&
                this.D1i(),
              (this.u1i = !1)));
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIVerticalLayout],
      [1, UE.UIItem],
      [2, UE.UIScrollViewWithScrollbarComponent],
      [3, UE.UIItem],
      [4, UE.UIButtonComponent],
      [5, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[4, this.T1i]]);
  }
  OnAddEventListener() {
    InputDistributeController_1.InputDistributeController.BindAction(
      InputMappingsDefine_1.actionMappings.通用交互,
      this.Jve
    ),
      InputDistributeController_1.InputDistributeController.BindAction(
        InputMappingsDefine_1.actionMappings.切换交互,
        this.b1i
      ),
      InputDistributeController_1.InputDistributeController.BindAxis(
        InputMappingsDefine_1.axisMappings.WheelAxis,
        this.q1i
      ),
      void 0 !==
        ModelManager_1.ModelManager.InteractionModel.LockInteractionEntity &&
        ((this.g1i = !0),
        InputDistributeController_1.InputDistributeController.BindAction(
          InputMappingsDefine_1.actionMappings.Ui方向上,
          this.G1i
        ),
        InputDistributeController_1.InputDistributeController.BindAction(
          InputMappingsDefine_1.actionMappings.Ui方向下,
          this.N1i
        )),
      InputDistributeController_1.InputDistributeController.BindTouches(
        [
          InputMappingsDefine_1.touchIdMappings.Touch1,
          InputMappingsDefine_1.touchIdMappings.Touch2,
          InputMappingsDefine_1.touchIdMappings.Touch3,
          InputMappingsDefine_1.touchIdMappings.Touch4,
          InputMappingsDefine_1.touchIdMappings.Touch5,
          InputMappingsDefine_1.touchIdMappings.Touch6,
          InputMappingsDefine_1.touchIdMappings.Touch7,
          InputMappingsDefine_1.touchIdMappings.Touch8,
          InputMappingsDefine_1.touchIdMappings.Touch9,
          InputMappingsDefine_1.touchIdMappings.Touch10,
        ],
        this.ywt
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.InteractionViewUpdate,
        this.A1i
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.HideInteractView,
        this.f1i
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnShowMouseCursor,
        this.NYt
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnPlatformChanged,
        this.Tje
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnInteractDropItemSuccess,
        this.R1i
      ),
      ModelManager_1.ModelManager.BattleUiModel.ChildViewData.AddCallback(
        19,
        this.FXt
      );
  }
  OnRemoveEventListener() {
    InputDistributeController_1.InputDistributeController.UnBindAction(
      InputMappingsDefine_1.actionMappings.通用交互,
      this.Jve
    ),
      InputDistributeController_1.InputDistributeController.UnBindAction(
        InputMappingsDefine_1.actionMappings.切换交互,
        this.b1i
      ),
      InputDistributeController_1.InputDistributeController.UnBindAxis(
        InputMappingsDefine_1.axisMappings.WheelAxis,
        this.q1i
      ),
      this.g1i &&
        ((this.g1i = !1),
        InputDistributeController_1.InputDistributeController.UnBindAction(
          InputMappingsDefine_1.actionMappings.Ui方向上,
          this.G1i
        ),
        InputDistributeController_1.InputDistributeController.UnBindAction(
          InputMappingsDefine_1.actionMappings.Ui方向下,
          this.N1i
        )),
      InputDistributeController_1.InputDistributeController.UnBindTouches(
        [
          InputMappingsDefine_1.touchIdMappings.Touch1,
          InputMappingsDefine_1.touchIdMappings.Touch2,
          InputMappingsDefine_1.touchIdMappings.Touch3,
          InputMappingsDefine_1.touchIdMappings.Touch4,
          InputMappingsDefine_1.touchIdMappings.Touch5,
          InputMappingsDefine_1.touchIdMappings.Touch6,
          InputMappingsDefine_1.touchIdMappings.Touch7,
          InputMappingsDefine_1.touchIdMappings.Touch8,
          InputMappingsDefine_1.touchIdMappings.Touch9,
          InputMappingsDefine_1.touchIdMappings.Touch10,
        ],
        this.ywt
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.InteractionViewUpdate,
        this.A1i
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.HideInteractView,
        this.f1i
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnShowMouseCursor,
        this.NYt
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnPlatformChanged,
        this.Tje
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnInteractDropItemSuccess,
        this.R1i
      ),
      ModelManager_1.ModelManager.BattleUiModel.ChildViewData.RemoveCallback(
        19,
        this.FXt
      );
  }
  Yti() {
    var t =
      ModelManager_1.ModelManager.BattleUiModel.ChildViewData.GetChildVisible(
        19
      );
    this.SetUiActive(t),
      t &&
        !ModelManager_1.ModelManager.InteractionModel.LockInteractionEntity &&
        ((this.d1i = !1),
        InputDistributeController_1.InputDistributeController.ExecuteDelayInputAction(
          InputMappingsDefine_1.actionMappings.通用交互
        ));
  }
  OnAfterShow() {
    this.x1i(), this.P1i(this.t1i), this.w1i(), this.Yti(), this.uzt(0);
    //kunmodcode //autoloot
    if (ModManager_1.ModManager.Settings.AutoLoot) {
      (this.a1i = !0),
        (this.r1i = !0),
        (this._1i = this.t1i.length),
        (this.h1i = 0),
        (this.l1i = 0);
      var count = 0;
      for (let i = 0; i < this.t1i.length; i++) {
        if (
          ModelManager_1.ModelManager.InteractionModel.CanAutoPickUp(
            this.t1i[i]
          ) === false
        ) {
          count += 1;
          continue;
        }
        this.InteractPawn(i + count) &&
          AudioSystem_1.AudioSystem.PostEvent("play_ui_ia_com_option");
      }
    }//kunmodcode //autoloot
  }
  OnAfterHide() {
    this.m1i = void 0;
  }
  OnStart() {
    (this.Nbe = this.GetScrollViewWithScrollbar(2)),
      (this.e1i = this.GetItem(3)),
      (this.Wli = this.Nbe.ScrollSensitivity),
      (this.c1i = this.e1i.GetAnchorOffsetY()),
      (this.Xli = this.e1i.GetAnchorOffsetY());
    var t = this.GetItem(1),
      t =
        ((this.Kli = new GenericLayout_1.GenericLayout(
          this.GetVerticalLayout(0),
          this.M1i,
          t?.GetOwner()
        )),
        (this.Jli = t.GetHeight()),
        (this.$li = this.e1i.GetHeight() / this.Jli),
        ModelManager_1.ModelManager.InteractionModel);
    (this.Ilt = t.AutoLongPressTime + t.ShowLongPressTime),
      this.Nbe.OnLateUpdate.Bind(this.p1i);
  }
  D1i() {
    (this.a1i = !0),
      (this.r1i = !0),
      (this._1i = this.t1i.length),
      (this.h1i = 0),
      (this.l1i = 0);
    var t = ModelManager_1.ModelManager.InteractionModel;
    ModelManager_1.ModelManager.PlatformModel.IsMobile()
      ? t.SaveTriggerMobileGuide(!0)
      : t.SaveTriggerDesktopGuide(!0),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Test", 8, "[InteractionView]自动拾取-----开始", [
          "AutoPickLength",
          this._1i,
        ]),
      this.U1i();
  }
  U1i() {
    this.l1i++;
    var t = this.t1i[this.h1i];
    (!t?.Valid ||
      (ModelManager_1.ModelManager.InteractionModel.CanAutoPickUp(t) ||
        (this.h1i++, this.U1i()),
      this.InteractPawn(this.h1i)
        ? (this.t1i.splice(this.h1i, 1), this.P1i(this.t1i))
        : (this.h1i++, this.U1i()),
      this.l1i >= this._1i)) &&
      this.O1i();
  }
  O1i() {
    this.x1i(),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Test", 8, "[InteractionView]自动拾取-----结束", [
          "InteractLength",
          this.t1i.length,
        ]),
      this.P1i(this.t1i),
      (this.r1i = !1);
  }
  InteractPawn(t) {
    var i = this.t1i[t];
    return (
      !!i?.Valid &&
      !!(i = i.GetComponent(103))?.IsPawnInteractive() &&
      ((t =
        ModelManager_1.ModelManager.InteractionModel.GetOptionInstanceIdByIndex(
          t
        )),
      i.InteractPawn(t),
      !0)
    );
  }
  OnBeforeDestroy() {
    this.Kli && (this.Kli.ClearChildren(), (this.Kli = void 0)),
      this.s1i?.Destroy(),
      (this.s1i = void 0),
      (this.m1i = void 0),
      this.e1i?.SetAnchorOffsetY(this.c1i),
      (this.e1i = void 0),
      this.Nbe &&
        ((this.Nbe.ScrollSensitivity = this.Wli),
        this.Nbe.OnLateUpdate.Unbind()),
      (this.Wli = 0),
      (this.Nbe = void 0),
      (this.r1i = !1),
      (this.s1i = void 0),
      (this.t1i.length = 0),
      (this.u1i = !1),
      this.y1i(),
      this.k1i();
  }
  k1i() {
    this.n1i &&
      TimerSystem_1.TimerSystem.Has(this.n1i) &&
      (TimerSystem_1.TimerSystem.Remove(this.n1i), (this.n1i = void 0));
  }
  P1i(t) {
    this.Kli.RefreshByData(t);
    t = MathUtils_1.MathUtils.Clamp(this.uyt, 0, t.length - 1);
    this.uzt(t);
  }
  x1i() {
    (this.t1i.length = 0), (this.i1i = this.V1i(this.t1i));
  }
  V1i(t) {
    return ModelManager_1.ModelManager.InteractionModel.RefreshInteractEntities(
      t
    );
  }
  OnTick(t) {
    this.C1i &&
      (this.zli < InteractionDefine_1.LERP_TIME
        ? ((this.zli += t),
          (t = this.e1i.GetAnchorOffsetY()),
          (t = MathUtils_1.MathUtils.Lerp(
            t,
            this.Yli,
            Math.min(this.zli / InteractionDefine_1.LERP_TIME, 1)
          )),
          this.e1i.SetAnchorOffsetY(t))
        : (this.C1i = !1)),
      this.s1i?.InAsyncLoading() || this.s1i?.RefreshTextWidth();
  }
  B1i() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "Test",
        8,
        "[InteractionView]自动拾取-----当玩家按下通用交互，会打断自动拾取"
      ),
      (this.a1i = !1),
      this.m1i &&
        !ModelManager_1.ModelManager.PlatformModel.IsMobile() &&
        this.L1i() &&
        this.GetActive() &&
        (this.y1i(),
        (this.o1i = TimerSystem_1.TimerSystem.Delay(this.AZe, this.Ilt)));
  }
  y1i() {
    this.o1i &&
      TimerSystem_1.TimerSystem.Has(this.o1i) &&
      (TimerSystem_1.TimerSystem.Remove(this.o1i), (this.o1i = void 0));
  }
  v1i() {
    var t;
    this.y1i(),
      this.a1i ||
        ModelManager_1.ModelManager.InteractionModel.InInteractCd() ||
        (this.GetActive() &&
          this.m1i &&
          this.InteractPawn(this.m1i.ActorIndex) &&
          (AudioSystem_1.AudioSystem.PostEvent("play_ui_ia_com_option"),
          (t = Math.max(this.t1i.length - 1, 0)),
          (this.uyt = Math.min(this.uyt, t))));
  }
  SelectHint(t) {
    let i = -1;
    var e = this.t1i.length - 1;
    (i = t
      ? (i = this.uyt - 1) < 0
        ? e
        : i
      : (i = this.uyt + 1) > e
      ? 0
      : i) < 0 || ((this.Zli = i), this.uzt(this.Zli));
  }
  uzt(i) {
    if (
      i !== this.uyt &&
      !ModelManager_1.ModelManager.PlatformModel.IsMobile() &&
      this.Kli
    ) {
      let t = this.Kli.GetLayoutItemByIndex(i);
      (t = t || this.Kli.GetLayoutItemByIndex(0)) &&
        (this.m1i?.SetSelected(!1),
        (this.m1i = t),
        (this.uyt = i),
        (this.Zli = -1),
        this.H1i(i),
        this.Kli.SelectGridProxy(i),
        this.Nbe.ScrollTo(t.GetRootItem()));
    }
  }
  H1i(t) {
    var i;
    this.L1i() &&
    ((i = ModelManager_1.ModelManager.InteractionModel),
    (t = this.t1i[t]),
    i.CanAutoPickUp(t))
      ? this.m1i?.SetLongPressTime(i.AutoLongPressTime)
      : this.m1i?.SetLongPressTime(0);
  }
  w1i() {
    var t = ModelManager_1.ModelManager.InteractionModel;
    if (t.IsInShowAutoInteractionGuideCountLimit()) {
      var i = ModelManager_1.ModelManager.PlatformModel.IsMobile();
      if (i) {
        if (t.IsTriggerMobileGuide) return;
      } else if (t.IsTriggerDesktopGuide) return;
      this.i1i <= t.ActiveInteractGuideCount ||
        this.s1i ||
        (i
          ? this.j1i().then(
              (t) => {
                t.Refresh("MobileAutoPickUpText");
              },
              () => {}
            )
          : this.j1i().then(
              (t) => {
                t.Refresh("DesktopAutoPickUpText");
              },
              () => {}
            ),
        t.SaveAutoInteractionGuideAppearCount(
          t.AutoInteractionGuideAppearCount + 1
        ));
    }
  }
  async j1i() {
    var t = this.GetItem(5);
    return (
      (this.s1i = new InteractionGuide_1.InteractionGuide()),
      await this.s1i.CreateThenShowByResourceIdAsync(
        "UiItem_GuideNPCActScroll",
        t,
        !1
      ),
      this.s1i
    );
  }
  I1i() {
    this.s1i &&
      (ModelManager_1.ModelManager.PlatformModel.IsMobile()
        ? this.s1i.Refresh("MobileAutoPickUpText")
        : this.s1i.Refresh("DesktopAutoPickUpText"));
  }
  L1i() {
    return 0 < this.i1i;
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    var i;
    if (2 === t.length && t[0] === GuideConfig_1.GuideConfig.TabTag)
      return (i = this.Kli.GetLayoutItemList()).length <= 0
        ? void 0
        : [(i = i[0].GetButtonForGuide()), i];
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("Guide", 54, "聚焦引导extraParam项配置有误", [
        "configParams",
        t,
      ]);
  }
  OnGetLayer() {
    return UiLayerType_1.ELayerType.Normal;
  }
}
(exports.InteractionHintView = InteractionHintView).F1i = void 0;
//# sourceMappingURL=InteractionHintView.js.map

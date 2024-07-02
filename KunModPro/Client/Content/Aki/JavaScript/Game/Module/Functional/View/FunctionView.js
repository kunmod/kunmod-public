"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FunctionView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  BackgroundCardById_1 = require("../../../../Core/Define/ConfigQuery/BackgroundCardById"),
  PlayerExpByPlayerLevel_1 = require("../../../../Core/Define/ConfigQuery/PlayerExpByPlayerLevel"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  NoCircleAttachView_1 = require("../../AutoAttach/NoCircleAttachView"),
  CommonInputViewController_1 = require("../../Common/InputView/Controller/CommonInputViewController"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  WorldLevelController_1 = require("../../WorldLevel/WorldLevelController"),
  ModManager_1 = require("../../../Manager/ModManager"),
  FunctionController_1 = require("../FunctionController"),
  FunctionAttachItemGrid_1 = require("./FunctionAttachItemGrid"),
  FunctionBottomButtonItem_1 = require("./FunctionBottomButtonItem"),
  FunctionTabLayout_1 = require("./FunctionTabLayout");
class FunctionView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.Wft = void 0),
      (this.B9t = void 0),
      (this.G9t = void 0),
      (this.N9t = void 0),
      (this.O9t = void 0),
      (this.k9t = void 0),
      (this.F9t = void 0),
      (this.V9t = void 0),
      (this.H9t = new Map()),
      (this.uft = new Array()),
      (this.j9t = void 0),
      (this.W9t = () => {
        this.CloseMe();
      }),
      (this.K9t = () => {
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowReturnLoginConfirmBox();
      }),
      (this.Q9t = () => {
        ControllerHolder_1.ControllerHolder.KuroSdkController.OpenNotice();
      }),
      (this.X9t = () => {
        FunctionController_1.FunctionController.OpenFunctionRelateView(10020);
      }),
      (this.$9t = () => {
        WorldLevelController_1.WorldLevelController.OpenWorldLevelInfoView();
      }),
      (this.Y9t = () => {
        UiManager_1.UiManager.OpenView("TimeOfDaySecondView");
      }),
      (this.J9t = () => {
        FunctionController_1.FunctionController.OpenFunctionRelateView(10019);
      }),
      (this.z9t = () => {
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
          "CopiedMyUid"
        ),
          UE.LGUIBPLibrary.ClipBoardCopy(ModManager_1.ModManager.Settings.Uid);
      }),
      (this.Z9t = () => {
        FunctionController_1.FunctionController.OpenFunctionRelateView(10049);
      }),
      (this.e7t = () => {
        ModelManager_1.ModelManager.FunctionModel.IsOpen(10060) &&
          UiManager_1.UiManager.OpenView(
            "PersonalRootView",
            ModelManager_1.ModelManager.PersonalModel.GetPersonalInfoData()
          );
      }),
      (this.t7t = () => {
        UiManager_1.UiManager.OpenView("PersonalOptionView");
      }),
      (this.i7t = () => {
        CommonInputViewController_1.CommonInputViewController.OpenPersonalSignInputView();
      }),
      (this.o7t = () => {
        CommonInputViewController_1.CommonInputViewController.OpenSetRoleNameInputView();
      }),
      (this.r7t = () => {
        var t;
        this.Wft.MovingState() ||
          this.Wft.GetCurrentSelectIndex() <= 0 ||
          ((t = this.Wft.GetCurrentSelectIndex() - 1),
          this.Wft.AttachToIndex(t, !1));
      }),
      (this.n7t = () => {
        var t;
        this.Wft.MovingState() ||
          this.Wft.GetCurrentSelectIndex() >= this.Wft.GetDataLength() ||
          ((t = this.Wft.GetCurrentSelectIndex() + 1),
          this.Wft.AttachToIndex(t, !1));
      }),
      (this.s7t = () => {
        this.N9t.SetUIActive(!1), this.G9t.SetUIActive(!1);
      }),
      (this.a7t = () => {
        this.h7t();
      }),
      (this.WUt = () => {
        this.r8t();
      }),
      (this.jUt = () => {
        var t = ModelManager_1.ModelManager.FunctionModel.GetPlayerName();
        t && this.GetText(0).SetText(t);
      }),
      (this.l7t = () => {
        this._7t();
      }),
      (this.u7t = () => {
        this.c7t();
      }),
      (this.m7t = () => {
        var t,
          e = ModelManager_1.ModelManager.PersonalModel.GetBirthday(),
          i = this.GetText(26);
        0 === e
          ? LguiUtil_1.LguiUtil.SetLocalText(i, "BirthDay", "--", "--")
          : ((t = Math.floor(e / 100)),
            (e = e % 100),
            LguiUtil_1.LguiUtil.SetLocalText(i, "BirthDay", t, e));
      }),
      (this.d7t = (t) => {
        this.BNe(t), this.B9t.SetToggleSelectByIndex(t);
      }),
      (this.C7t = (t, e, i) => {
        t = new FunctionAttachItemGrid_1.FunctionAttachItemGrid(t);
        return t.SetNeedAnim(0 === e), this.H9t.set(e, t), t;
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIButtonComponent],
      [4, UE.UIText],
      [5, UE.UIText],
      [6, UE.UIButtonComponent],
      [7, UE.UIButtonComponent],
      [8, UE.UIButtonComponent],
      [9, UE.UISprite],
      [10, UE.UIItem],
      [11, UE.UITexture],
      [12, UE.UIButtonComponent],
      [13, UE.UIButtonComponent],
      [14, UE.UIButtonComponent],
      [15, UE.UIButtonComponent],
      [16, UE.UIButtonComponent],
      [17, UE.UIButtonComponent],
      [18, UE.UIItem],
      [19, UE.UIItem],
      [20, UE.UIButtonComponent],
      [21, UE.UIButtonComponent],
      [22, UE.UIButtonComponent],
      [23, UE.UITexture],
      [24, UE.UIButtonComponent],
      [25, UE.UIText],
      [26, UE.UIText],
      [27, UE.UIButtonComponent],
      [28, UE.UIItem],
      [29, UE.UIItem],
      [30, UE.UIGridLayout],
      [31, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [6, this.W9t],
        [7, this.K9t],
        [8, this.X9t],
        [3, this.$9t],
        [12, this.Y9t],
        [13, this.J9t],
        [14, this.z9t],
        [15, this.Q9t],
        [20, this.Z9t],
        [21, this.e7t],
        [22, this.t7t],
        [24, this.i7t],
        [27, this.o7t],
        [17, this.r7t],
        [16, this.n7t],
      ]);
  }
  OnStart() {
    (this.G9t = this.GetButton(17).RootUIComp),
      (this.N9t = this.GetButton(16).RootUIComp),
      (this.O9t = this.GetItem(19)),
      (this.k9t = this.GetItem(18)),
      (this.B9t = new FunctionTabLayout_1.FunctionTabLayout(this.GetItem(28))),
      (this.Wft = new NoCircleAttachView_1.NoCircleAttachView(
        this.GetItem(10).GetOwner()
      ));
    var t = this.GetItem(29),
      t =
        (t.SetUIActive(!1),
        this.Wft.CreateItems(t.GetOwner(), 0, this.C7t),
        this.Wft.SetDragBeginCallback(this.s7t),
        this.Wft.SetMoveMultiFactor(50),
        (this.F9t = new FunctionBottomButtonItem_1.FunctionBottomButtonItem(
          this.GetButton(8).RootUIComp,
          "FunctionMail"
        )),
        (this.V9t = new FunctionBottomButtonItem_1.FunctionBottomButtonItem(
          this.GetButton(15).RootUIComp,
          "FunctionNotice"
        )),
        ModelManager_1.ModelManager.FunctionModel.IsOpen(10060)),
      t =
        (this.GetButton(21).RootUIComp.SetRaycastTarget(t),
        this.g7t(),
        this.Wft.GetCurrentSelectIndex());
    this.BNe(t), this.B9t.SetToggleSelectByIndex(t);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.CurWorldLevelChange,
      this.a7t
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnSignChange,
        this.WUt
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnNameChange,
        this.jUt
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnHeadIconChange,
        this.l7t
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnCardChange,
        this.u7t
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnBirthChange,
        this.m7t
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.FunctionGridSelected,
        this.d7t
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnFunctionViewShow
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.CurWorldLevelChange,
      this.a7t
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnSignChange,
        this.WUt
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnNameChange,
        this.jUt
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnHeadIconChange,
        this.l7t
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnCardChange,
        this.u7t
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnBirthChange,
        this.m7t
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.FunctionGridSelected,
        this.d7t
      );
  }
  BNe(t) {
    this.G9t.SetUIActive(0 < t),
      this.N9t.SetUIActive(t < this.Wft.GetDataLength() - 1),
      this.O9t.SetUIActive(this.f7t(t)),
      this.k9t.SetUIActive(this.p7t(t));
  }
  f7t(i) {
    var r = [];
    for (let t = 0, e = i; t < e; ++t) r.push(...this.uft[t]);
    for (const e of r) {
      var t =
        ModelManager_1.ModelManager.FunctionModel.GetFunctionItemRedDotName(e);
      if (t) {
        t = ModelManager_1.ModelManager.RedDotModel.GetRedDot(t);
        if (t && t.IsRedDotActive()) return !0;
      }
    }
    return !1;
  }
  p7t(i) {
    var r = [];
    for (let t = i + 1, e = this.uft.length; t < e; ++t) r.push(...this.uft[t]);
    for (const e of r) {
      var t =
        ModelManager_1.ModelManager.FunctionModel.GetFunctionItemRedDotName(e);
      if (t) {
        t = ModelManager_1.ModelManager.RedDotModel.GetRedDot(t);
        if (t && t.IsRedDotActive()) return !0;
      }
    }
    return !1;
  }
  OnBeforeShow() {
    this.v7t(), this.M7t(), this.x6e();
  }
  OnAfterShow() {
    this.S7t();
  }
  OnAfterHide() {
    this.Dpt();
  }
  OnBeforeDestroy() {
    for (const t of this.Wft.GetItems()) this.AddChild(t);
    this.B9t.Destroy(), this.F9t.Destroy(), this.V9t.Destroy();
  }
  x6e() {
    this.F9t.BindRedDot(), this.V9t.BindRedDot();
  }
  Dpt() {
    this.F9t.UnBindRedDot(), this.V9t.UnBindRedDot();
  }
  v7t() {
    this.x9e(),
      this.E7t(),
      this.h7t(),
      this._7t(),
      this.c7t(),
      this.r8t(),
      this.y7t();
  }
  x9e() {
    var t = ModelManager_1.ModelManager.FunctionModel.GetPlayerName();
    this.GetText(0).SetText(t);
  }
  E7t() {
    var t,
      e = ModelManager_1.ModelManager.FunctionModel.GetPlayerLevel(),
      e =
        (LguiUtil_1.LguiUtil.SetLocalText(this.GetText(4), "PlayerLevelNum", e),
        LguiUtil_1.LguiUtil.SetLocalText(
          this.GetText(1),
          "UserId",
          ModManager_1.ModManager.Settings.Uid
        ),
        PlayerExpByPlayerLevel_1.configPlayerExpByPlayerLevel.GetConfig(e));
    e?.PlayerExp &&
      ((t = ModelManager_1.ModelManager.FunctionModel.GetPlayerExp()),
      LguiUtil_1.LguiUtil.SetLocalText(
        this.GetText(5),
        "ExpText",
        t,
        e.PlayerExp
      ),
      this.GetSprite(9).SetFillAmount(t / e.PlayerExp));
  }
  h7t() {
    LguiUtil_1.LguiUtil.SetLocalText(
      this.GetText(2),
      "WorldLevelNum",
      ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel
    );
  }
  _7t() {
    var t = ModelManager_1.ModelManager.PlayerInfoModel.GetNumberPropById(4);
    const e = this.GetTexture(11);
    e.SetUIActive(!1),
      this.SetRoleIcon("", e, t, void 0, () => {
        e.SetUIActive(!0);
      });
  }
  c7t() {
    var t = ModelManager_1.ModelManager.PersonalModel.GetCurCardId();
    t &&
      (t = BackgroundCardById_1.configBackgroundCardById.GetConfig(t)) &&
      this.SetTextureByPath(t.FunctionViewCardPath, this.GetTexture(23));
  }
  r8t() {
    var t = ModelManager_1.ModelManager.PersonalModel.GetSignature(),
      e = this.GetText(25);
    t ? e.SetText(t) : LguiUtil_1.LguiUtil.SetLocalText(e, "ClickToSetSign");
  }
  y7t() {
    var t,
      e = ModelManager_1.ModelManager.PersonalModel.GetBirthday(),
      i = this.GetText(26);
    0 === e
      ? LguiUtil_1.LguiUtil.SetLocalText(i, "BirthDay", "--", "--")
      : ((t = Math.floor(e / 100)),
        (e = e % 100),
        LguiUtil_1.LguiUtil.SetLocalText(i, "BirthDay", t, e));
  }
  I7t(t) {
    var e = this.GetItem(31),
      i = e.GetStretchRight();
    e.SetStretchRight(i + t);
  }
  g7t() {
    (this.j9t = this.T7t()), this.I7t(this.j9t.OffsetWidth);
    var t = ModelManager_1.ModelManager.FunctionModel.GetShowFunctionIdList(),
      e = t.length;
    this.uft = [];
    let i = 0;
    for (; e > i + this.j9t.TotalGridNumber; )
      this.uft.push(t.slice(i, i + this.j9t.TotalGridNumber)),
        (i += this.j9t.TotalGridNumber);
    this.uft.push(t.slice(i, e));
    var r = Math.ceil(e / this.j9t.TotalGridNumber);
    this.B9t.RefreshTab(r),
      this.Wft.SetBoundDistance(0),
      this.Wft.ReloadView(r, this.uft);
  }
  L7t(i) {
    var r = this.uft;
    let s = -1;
    for (let t = 0, e = r.length; t < e; ++t) r[t].includes(i) && (s = t);
    return s;
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    if (1 < t.length || isNaN(Number(t[0])))
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("Guide", 17, "功能菜单聚焦引导的ExtraParam配置错误", [
          "configParams",
          t,
        ]);
    else {
      var t = Number(t[0]),
        e = this.L7t(t);
      if (-1 === e)
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Guide",
            17,
            "功能菜单聚焦引导的ExtraParam配置错误, 检查functionId",
            ["functionId", t]
          );
      else {
        this.Wft.AttachToIndex(e, !0);
        e = this.H9t.get(e);
        if (e) {
          e = e.GetFunctionItem(t);
          if (e.GetActive()) {
            e = e.GetButtonItem();
            if (e) return [e, e];
          }
        } else
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Guide",
              17,
              "功能菜单聚焦引导的ExtraParam配置错误, 检查functionId",
              ["functionId", t]
            );
      }
    }
  }
  M7t() {
    this.GetButton(8).SetSelfInteractive(
      ModelManager_1.ModelManager.FunctionModel.IsOpen(10020)
    ),
      this.GetButton(12).SetSelfInteractive(
        ModelManager_1.ModelManager.FunctionModel.IsOpen(10018)
      ),
      this.GetButton(13).SetSelfInteractive(
        ModelManager_1.ModelManager.FunctionModel.IsOpen(10019)
      ),
      this.GetButton(15).SetSelfInteractive(
        ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk()
      ),
      this.GetButton(20).SetSelfInteractive(
        ModelManager_1.ModelManager.FunctionModel.IsOpen(10049)
      );
  }
  S7t() {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Functional",
        11,
        "功能开启界面Start阶段计算数据输出",
        ["剩余宽度", this.j9t.OffsetWidth],
        ["显示数量", this.j9t.TotalGridNumber]
      );
    var t = this.T7t();
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Functional",
        11,
        "功能开启界面AfterShow阶段计算数据输出",
        ["剩余宽度", t.OffsetWidth],
        ["显示数量", t.TotalGridNumber]
      );
  }
  T7t() {
    var t = this.GetItem(29),
      e = this.GetGridLayout(30),
      i = e.GetCellSize(),
      r = e.GetSpacing(),
      e = e.GetPadding(),
      s = t.GetWidth(),
      t = t.GetHeight(),
      n = (s - e.Left - e.Right) % (i.X + r.X),
      h = n >= i.X ? 1 : 0,
      s = Math.floor((s - e.Left - e.Right) / (i.X + r.X)) + h,
      h = (t - e.Top - e.Bottom) % (i.Y + r.Y) > i.Y ? 1 : 0;
    return {
      TotalGridNumber:
        s * (Math.floor((t - e.Top - e.Bottom) / (i.Y + r.Y)) + h),
      OffsetWidth: n >= i.X ? n - i.X : n + r.X,
    };
  }
}
exports.FunctionView = FunctionView;
//# sourceMappingURL=FunctionView.js.map

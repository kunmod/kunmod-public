"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CommonInputViewBase = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  CommonDefine_1 = require("../../../../../Core/Define/CommonDefine"),
  MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  UiTickViewBase_1 = require("../../../../Ui/Base/UiTickViewBase"),
  CdKeyInputController_1 = require("../../../CdKey/CdKeyInputController"),
  ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  ButtonAndSpriteItem_1 = require("../../Button/ButtonAndSpriteItem"),
  CommonInputViewDefine_1 = require("../Model/CommonInputViewDefine");
class CommonInputViewBase extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.InputData = void 0),
      (this.BDt = void 0),
      (this.j3 = CommonDefine_1.INVALID_VALUE),
      (this.bDt = void 0),
      (this.ConfirmButton = void 0),
      (this.LDt = void 0),
      (this.qDt = void 0),
      (this.GDt = (t) => {
        t && 1 === this.BDt && this.RefreshTips(0);
      }),
      (this.NDt = () => {
        this.CloseMe();
      }),
      (this.ODt = () => {
        var t = this.LDt.GetText()
        this.ExecuteInputConfirm(t)
        //   i = StringUtils_1.StringUtils.GetStringRealCount(t);
        // i > this.GetMaxLimit()
        //   ? (this.RefreshTips(2), (this.j3 = 0))
        //   : 0 === i && this.InputData.IsCheckNone
        //   ? (this.RefreshTips(1), (this.j3 = 0))
        //   : i < this.GetMinLimit()
        //   ? (this.RefreshTips(3), (this.j3 = 0))
        //   : this.ExtraConfirmCheck(i, t) && this.ExecuteInputConfirm(t);
      }),
      (this.kDt = () => {
        this.SetTipsVisible(!1),
          this.ConfirmButton.SetSelfInteractive(!0),
          (this.j3 = CommonDefine_1.INVALID_VALUE);
      }),
      (this.FDt = () => {
        this.VDt("PrefabTextItem_Entertext_Text", 0);
      }),
      (this.HDt = () => {
        // this.VDt(
        //   "PrefabTextItem_Textoverlength_Text",
        //   CommonDefine_1.INVALID_VALUE
        // ),
        //   this.ConfirmButton.SetSelfInteractive(!1);
      }),
      (this.jDt = () => {
        this.VDt("CDKey_TooShort", 0),
          this.ConfirmButton.SetSelfInteractive(!1);
      }),
      (this.WDt = () => {
        this.VDt("PrefabTextItem_Textillegality_Text", 0);
      }),
      (this.CdKeyErrorText =
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew("CDKey_Error")),
      (this.KDt = () => {
        this.QDt(this.CdKeyErrorText, 0),
          this.ConfirmButton.SetSelfInteractive(!1);
      }),
      (this.$Dt = () => {
        var t =
          CdKeyInputController_1.CdKeyInputController.GetCdKeyUseCd().toString();
        this.VDt("CDKey_CDtime", 0, t),
          this.ConfirmButton.SetSelfInteractive(!1);
      }),
      (this.XDt = () => {
        this.LDt.SetText("", !0);
      }),
      (this.YDt = () => {
        var t = (0, puerts_1.$ref)("");
        UE.LGUIBPLibrary.ClipBoardPaste(t),
          (t = (0, puerts_1.$unref)(t)),
          StringUtils_1.StringUtils.IsEmpty(t) || this.LDt.SetText(t, !0);
      }),
      (this.JDt = () => {
        var t =
          ConfigManager_1.ConfigManager.TextConfig.GetTextById(
            "SetNameSuccess"
          );
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(t);
      }),
      (this.zDt = () => {
        var t =
          ConfigManager_1.ConfigManager.TextConfig.GetTextById(
            "SetSignSuccess"
          );
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(t);
      }),
      (this.OnTextChange = (t) => {
        this.SetClearOrPaste(),
          StringUtils_1.StringUtils.GetStringRealCount(t) <= this.GetMaxLimit()
            ? this.RefreshTips(0)
            : this.RefreshTips(2);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIItem],
      [2, UE.UIText],
      [3, UE.UIButtonComponent],
      [4, UE.UIButtonComponent],
      [5, UE.UITextInputComponent],
      [6, UE.UIText],
      [7, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [5, this.GDt],
        [3, this.NDt],
        [4, this.ODt],
      ]);
  }
  ExtraConfirmCheck(t, i) {
    return !0;
  }
  ExecuteInputConfirm(t) {
    if (this.InputData?.CustomFunc) {//Add CustomFunc
      this.InputData.CustomFunc?.(t).then(
        () => this.CloseMe()
      );
    } else {//The original
      this.InputData.ConfirmFunc?.(t).then(
        (t) => {
          t === Protocol_1.Aki.Protocol.ErrorCode.ContainsDirtyWord
            ? this.RefreshTips(4)
            : this.CloseMe();
        },
        () => {
          Log_1.Log.CheckError() &&
            Log_1.Log.Error("UiCommon", 11, "通用输入框执行出现未知错误");
        }
      );
    }
  }
  OnBeforeCreate() {
    (this.InputData = this.OpenParam),
      (this.bDt = {
        [0]: this.kDt,
        1: this.FDt,
        2: this.HDt,
        3: this.jDt,
        4: this.WDt,
        5: this.KDt,
        6: this.$Dt,
      });
  }
  VDt(t, i, ...e) {
    this.SetTipsVisible(!0);
    var s = this.GetText(2);
    LguiUtil_1.LguiUtil.SetLocalTextNew(s, t, e), (this.j3 = i);
  }
  QDt(t, i) {
    this.SetTipsVisible(!0), this.GetText(2).SetText(t), (this.j3 = i);
  }
  OnBeforeShow() {
    this.ZDt(), this.uqe(), this.RefreshTips(0), this.InitExtraParam();
  }
  SetClearOrPaste() {
    "" === this.LDt.GetText()
      ? (this.qDt.RefreshSprite("SP_Paste"), this.qDt.BindCallback(this.YDt))
      : (this.qDt.RefreshSprite("SP_Clear"), this.qDt.BindCallback(this.XDt));
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnNameChange,
      this.JDt
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnSignChange,
        this.zDt
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnNameChange,
      this.JDt
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnSignChange,
        this.zDt
      );
  }
  OnTick(t) {
    this.j3 !== CommonDefine_1.INVALID_VALUE &&
      ((this.j3 += t), this.j3 >= CommonInputViewDefine_1.TIPS_DELAT_TIME) &&
      this.RefreshTips(0);
  }
  OnBeforeDestroy() {
    this.eRt(),
      (this.qDt = void 0),
      (this.LDt = void 0),
      (this.ConfirmButton = void 0);
  }
  ZDt() {
    (this.qDt = new ButtonAndSpriteItem_1.ButtonAndSpriteItem(this.GetItem(7))),
      this.GetItem(7).SetUIActive(this.InputData.NeedFunctionButton),
      (this.ConfirmButton = this.GetButton(4)),
      (this.LDt = this.GetInputText(5)),
      (this.LDt.bAllowMultiLine = this.IsAllowMultiLine()),
      this.LDt.OnTextChange.Bind(this.OnTextChange),
      this.LDt.SetText(this.InputData.InputText, !0),
      this.GetText(6).SetText(this.InputData.DefaultText),
      this.SetClearOrPaste(),
      this.SetTipsVisible(!1);
  }
  SetTipsVisible(t) {
    this.GetItem(1).SetUIActive(t);
  }
  InitExtraParam() {}
  eRt() {
    this.LDt.OnTextChange.Unbind();
  }
  uqe() {
    if (this.InputData?.Title) {
      this.GetText(0).SetText(this.InputData.Title)
    } else {
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(0),
        this.InputData.TitleTextArgs.TextKey,
        ...this.InputData.TitleTextArgs.Params
      );
    }
  }
  RefreshTips(t) {
    t !== this.BDt && ((this.BDt = t), this.bDt[t]());
  }
  GetMinLimit() {
    return 0;
  }
}
exports.CommonInputViewBase = CommonInputViewBase;
//# sourceMappingURL=CommonInputViewBase.js.map

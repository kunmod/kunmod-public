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
      (this.DUt = void 0),
      (this.j3 = CommonDefine_1.INVALID_VALUE),
      (this.RUt = void 0),
      (this.ConfirmButton = void 0),
      (this.vUt = void 0),
      (this.UUt = void 0),
      (this.AUt = (t) => {
        t && 1 === this.DUt && this.RefreshTips(0);
      }),
      (this.PUt = () => {
        this.CloseMe();
      }),
      (this.xUt = () => {
        var t = this.vUt.GetText();
        this.ExecuteInputConfirm(t);
        //  i = StringUtils_1.StringUtils.GetStringRealCount(t);
        // i > this.GetMaxLimit()
        //  ? (this.RefreshTips(2), (this.j3 = 0))
        //  : 0 === i && this.InputData.IsCheckNone
        // ? (this.RefreshTips(1), (this.j3 = 0))
        //  : i < this.GetMinLimit()
        //  ? (this.RefreshTips(3), (this.j3 = 0))
        //  : this.ExtraConfirmCheck(i, t) && this.ExecuteInputConfirm(t);
      }),
      (this.wUt = () => {
        this.SetTipsVisible(!1),
          this.ConfirmButton.SetSelfInteractive(!0),
          (this.j3 = CommonDefine_1.INVALID_VALUE);
      }),
      (this.BUt = () => {
        this.bUt("PrefabTextItem_Entertext_Text", 0);
      }),
      (this.qUt = () => {
        // this.bUt(
        //    "PrefabTextItem_Textoverlength_Text",
        //   CommonDefine_1.INVALID_VALUE
        //  ),
        //   this.ConfirmButton.SetSelfInteractive(!1);
      }),
      (this.GUt = () => {
        this.bUt("CDKey_TooShort", 0),
          this.ConfirmButton.SetSelfInteractive(!1);
      }),
      (this.NUt = () => {
        this.bUt("PrefabTextItem_Textillegality_Text", 0);
      }),
      (this.CdKeyErrorText =
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew("CDKey_Error")),
      (this.OUt = () => {
        this.kUt(this.CdKeyErrorText, 0),
          this.ConfirmButton.SetSelfInteractive(!1);
      }),
      (this.FUt = () => {
        var t =
          CdKeyInputController_1.CdKeyInputController.GetCdKeyUseCd().toString();
        this.bUt("CDKey_CDtime", 0, t),
          this.ConfirmButton.SetSelfInteractive(!1);
      }),
      (this.VUt = () => {
        this.vUt.SetText("", !0);
      }),
      (this.HUt = () => {
        var t = (0, puerts_1.$ref)("");
        UE.LGUIBPLibrary.ClipBoardPaste(t),
          (t = (0, puerts_1.$unref)(t)),
          StringUtils_1.StringUtils.IsEmpty(t) || this.vUt.SetText(t, !0);
      }),
      (this.jUt = () => {
        var t =
          ConfigManager_1.ConfigManager.TextConfig.GetTextById(
            "SetNameSuccess"
          );
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(t);
      }),
      (this.WUt = () => {
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
        [5, this.AUt],
        [3, this.PUt],
        [4, this.xUt],
      ]);
  }
  ExtraConfirmCheck(t, i) {
    return !0;
  }
  ExecuteInputConfirm(t) {
    if (this.InputData?.CustomFunc) {
      //Add CustomFunc
      this.InputData.CustomFunc?.(t).then(() => this.CloseMe());
    } else {
      //The original
      this.InputData.ConfirmFunc?.(t).then(
        (t) => {
          t === Protocol_1.Aki.Protocol.lkn.Proto_ContainsDirtyWord
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
      (this.RUt = {
        [0]: this.wUt,
        1: this.BUt,
        2: this.qUt,
        3: this.GUt,
        4: this.NUt,
        5: this.OUt,
        6: this.FUt,
      });
  }
  bUt(t, i, ...e) {
    this.SetTipsVisible(!0);
    var s = this.GetText(2);
    LguiUtil_1.LguiUtil.SetLocalTextNew(s, t, e), (this.j3 = i);
  }
  kUt(t, i) {
    this.SetTipsVisible(!0), this.GetText(2).SetText(t), (this.j3 = i);
  }
  OnBeforeShow() {
    this.KUt(), this.mGe(), this.RefreshTips(0), this.InitExtraParam();
  }
  SetClearOrPaste() {
    "" === this.vUt.GetText()
      ? (this.UUt.RefreshSprite("SP_Paste"), this.UUt.BindCallback(this.HUt))
      : (this.UUt.RefreshSprite("SP_Clear"), this.UUt.BindCallback(this.VUt));
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnNameChange,
      this.jUt
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnSignChange,
        this.WUt
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnNameChange,
      this.jUt
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnSignChange,
        this.WUt
      );
  }
  OnTick(t) {
    this.j3 !== CommonDefine_1.INVALID_VALUE &&
      ((this.j3 += t), this.j3 >= CommonInputViewDefine_1.TIPS_DELAT_TIME) &&
      this.RefreshTips(0);
  }
  OnBeforeDestroy() {
    this.QUt(),
      (this.UUt = void 0),
      (this.vUt = void 0),
      (this.ConfirmButton = void 0);
  }
  KUt() {
    (this.UUt = new ButtonAndSpriteItem_1.ButtonAndSpriteItem(this.GetItem(7))),
      this.GetItem(7).SetUIActive(this.InputData.NeedFunctionButton),
      (this.ConfirmButton = this.GetButton(4)),
      (this.vUt = this.GetInputText(5)),
      (this.vUt.bAllowMultiLine = this.IsAllowMultiLine()),
      this.vUt.OnTextChange.Bind(this.OnTextChange),
      this.vUt.SetText(this.InputData.InputText, !0),
      this.GetText(6).SetText(this.InputData.DefaultText),
      this.SetClearOrPaste(),
      this.SetTipsVisible(!1);
  }
  SetTipsVisible(t) {
    this.GetItem(1).SetUIActive(t);
  }
  InitExtraParam() {}
  QUt() {
    this.vUt.OnTextChange.Unbind();
  }
  mGe() {
    if (this.InputData?.Title) {
      this.GetText(0).SetText(this.InputData.Title);
    } else {
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(0),
        this.InputData.TitleTextArgs.TextKey,
        ...this.InputData.TitleTextArgs.Params
      );
    }
  }

  RefreshTips(t) {
    t !== this.DUt && ((this.DUt = t), this.RUt[t]());
  }
  GetMinLimit() {
    return 0;
  }
}
exports.CommonInputViewBase = CommonInputViewBase;
//# sourceMappingURL=CommonInputViewBase.js.map

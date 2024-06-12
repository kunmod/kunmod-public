"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TextInputComponent = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  CommonDefine_1 = require("../../../../../Core/Define/CommonDefine"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  TickSystem_1 = require("../../../../../Core/Tick/TickSystem"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  CommonInputViewDefine_1 = require("../Model/CommonInputViewDefine");
class TextInputComponent extends UiPanelBase_1.UiPanelBase {
  constructor(t, i) {
    super(),
      (this.tRt = i),
      (this.BDt = 0),
      (this.j3 = CommonDefine_1.INVALID_VALUE),
      (this.mHe = 0),
      (this.bDt = void 0),
      (this.LDt = void 0),
      (this.iRt = void 0),
      (this.apt = CommonInputViewDefine_1.MAX_SINGLE_LENGTH),
      (this.hpt = 0),
      (this.GDt = (t) => {
        t && 1 === this.BDt && this.I2e(0);
      }),
      (this.ODt = () => {
        var t = this.LDt.GetText(),
          i = StringUtils_1.StringUtils.GetStringRealCount(t);
        i > this.apt
          ? (this.I2e(2), (this.j3 = 0))
          : 0 === i && this.tRt.IsCheckNone
          ? (this.I2e(1), (this.j3 = 0))
          : i < this.hpt
          ? (this.I2e(3), (this.j3 = 0))
          : this.tRt.ConfirmFunc?.(t).then(
              (t) => {
                this.IsDestroyOrDestroying ||
                  (t === Protocol_1.Aki.Protocol.ErrorCode.ContainsDirtyWord &&
                    this.I2e(4),
                  this.tRt.ResultFunc?.(
                    t === Protocol_1.Aki.Protocol.ErrorCode.Success
                  ));
              },
              () => {
                Log_1.Log.CheckError() &&
                  Log_1.Log.Error("UiCommon", 11, "通用输入框执行出现未知错误");
              }
            );
      }),
      (this.rRt = (t) => {
        StringUtils_1.StringUtils.GetStringRealCount(t) <= this.apt
          ? this.I2e(0)
          : this.I2e(2);
      }),
      (this.kDt = () => {
        this.GetItem(0).SetUIActive(!1),
          this.iRt.SetSelfInteractive(!0),
          (this.j3 = CommonDefine_1.INVALID_VALUE);
      }),
      (this.FDt = () => {
        this.VDt("PrefabTextItem_Entertext_Text", 0);
      }),
      (this.HDt = () => {
        this.VDt(
          "PrefabTextItem_Textoverlength_Text",
          CommonDefine_1.INVALID_VALUE
        ),
          this.iRt.SetSelfInteractive(!1);
      }),
      (this.jDt = () => {
        this.VDt("CDKey_TooShort", 0), this.iRt.SetSelfInteractive(!1);
      }),
      (this.WDt = () => {
        this.VDt("PrefabTextItem_Textillegality_Text", 0);
      }),
      (this.o6 = (t) => {
        this.j3 !== CommonDefine_1.INVALID_VALUE &&
          ((this.j3 += t),
          this.j3 >= CommonInputViewDefine_1.TIPS_DELAT_TIME) &&
          this.I2e(0);
      }),
      this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIText],
      [2, UE.UITextInputComponent],
      [3, UE.UIText],
      [4, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [
        [2, this.GDt],
        [4, this.ODt],
      ]);
  }
  I2e(t) {
    t !== this.BDt && ((this.BDt = t), this.bDt[t]());
  }
  OnStart() {
    (this.bDt = {
      [0]: this.kDt,
      1: this.FDt,
      2: this.HDt,
      3: this.jDt,
      4: this.WDt,
      5: () => {},
      6: () => {},
    }),
      (this.iRt = this.GetButton(4)),
      (this.LDt = this.GetInputText(2)),
      this.LDt.OnTextChange.Bind(this.rRt),
      this.LDt.SetText(this.tRt.InputText, !0),
      this.tRt.DefaultText && this.GetText(3).SetText(this.tRt.DefaultText),
      (this.mHe = TickSystem_1.TickSystem.Add(
        this.o6,
        "TextInputComponent",
        0,
        !0
      ).Id);
  }
  eRt() {
    this.LDt.OnTextChange.Unbind();
  }
  VDt(t, i) {
    this.GetItem(0).SetUIActive(!0);
    var e = this.GetText(1);
    LguiUtil_1.LguiUtil.SetLocalTextNew(e, t), (this.j3 = i);
  }
  OnBeforeDestroy() {
    this.eRt(), TickSystem_1.TickSystem.Remove(this.mHe);
  }
  ClearText() {
    this.LDt.SetText("");
  }
}
exports.TextInputComponent = TextInputComponent;
//# sourceMappingURL=TextInputComponent.js.map

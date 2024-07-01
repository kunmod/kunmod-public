"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VideoView = void 0);
const UE = require("ue"),
  Application_1 = require("../../../Core/Application/Application"),
  AudioController_1 = require("../../../Core/Audio/AudioController"),
  AudioDefine_1 = require("../../../Core/Audio/AudioDefine"),
  Log_1 = require("../../../Core/Common/Log"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiTickViewBase_1 = require("../../Ui/Base/UiTickViewBase"),
  UiLayer_1 = require("../../Ui/UiLayer"),
  PlotSkipComponent_1 = require("../Plot/PlotView/PlotSkipComponent"),
  VideoDefine_1 = require("./VideoDefine"),
  ModManager_1 = require("../../Manager/ModManager"),
  VideoLauncher_1 = require("./VideoLauncher"),
  USE_TICK = !0;
class VideoView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.Obr = void 0),
      (this.kbr = void 0),
      (this.Fbr = void 0),
      (this.Vbr = void 0),
      (this.jbr = 0),
      (this.Wbr = 0),
      (this.Kbr = void 0),
      (this.Qbr = void 0),
      (this.bJi = void 0),
      (this.xRe = ResourceSystem_1.ResourceSystem.InvalidId),
      (this.xdn = !1),
      (this.$br = !1),
      (this.Xbr = !0),
      (this.GCn = void 0),
      (this.NCn = !0),
      (this.Ybr = () => {
        ControllerHolder_1.ControllerHolder.FlowController.BackgroundFlow(
          "UI点击跳过(VideoView)"
        );
      }),
      (this.Jbr = () => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Video",
            28,
            "UE.EApplicationDelegate.ApplicationHasReactivatedDelegate",
            ["this.VideoPauseTime", this.Qbr]
          ),
          (this.Xbr = !0),
          this.Qbr &&
            (2 !== ModelManager_1.ModelManager.PlatformModel.PlatformType &&
              this.kbr?.Seek(this.Qbr),
            this.kbr?.Play(),
            (this.Qbr = void 0)),
          this.Kbr &&
            this.Qbr &&
            (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Audio",
                56,
                "[VideoView] ResumeVideo 当前只绑定返回应用，全部音频已在CPP的返回应用时处理，跳过此处的音频 Resume"
              ),
            void 0 !== this.Vbr) &&
            TimerSystem_1.TimerSystem.IsPause(this.Vbr) &&
            TimerSystem_1.TimerSystem.Resume(this.Vbr);
      }),
      (this.zbr = () => {
        (this.Qbr = this.kbr?.GetTime()),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Video",
              28,
              "UE.EApplicationDelegate.ApplicationWillDeactivateDelegate",
              ["this.VideoPauseTime", this.Qbr]
            ),
          (this.Xbr = !1),
          2 !== ModelManager_1.ModelManager.PlatformModel.PlatformType &&
            this.kbr?.Pause(),
          this.Kbr &&
            0 !==
              VideoLauncher_1.VideoLauncher.AudioEventResult.PlayingIds
                .length &&
            (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Audio",
                56,
                "[VideoView] PauseVideo 当前只绑定切换后台，全部音频已在CPP的切换后台时处理，跳过此处的音频 Pause"
              ),
            void 0 === this.Vbr ||
              TimerSystem_1.TimerSystem.IsPause(this.Vbr) ||
              TimerSystem_1.TimerSystem.Pause(this.Vbr));
      }),
      (this.OCn = () => {
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Video", 39, "开始关闭VideoView"),
          this.GCn &&
            (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Video",
                39,
                "MediaPlayer还在倒计时检查状态中,提前移除timer"
              ),
            this.GCn.Remove(),
            (this.GCn = void 0)),
          this.NCn || this.CloseMe(),
          (this.NCn = !0);
      }),
      (this.Zbr = () => {
        (this.$br = !0),
          this.OCn(),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Video", 28, "视频播放结束", ["视频名称", this.Kbr]);
      }),
      (this.eqr = () => {
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Video",
            39,
            "视频文件打开失败,可能需要修复修复系统文件"
          ),
          this.OCn();
      }),
      (this.tqr = () => {
        if (this.Kbr)
          Log_1.Log.CheckError() &&
            Log_1.Log.Error("Video", 39, "必须等上个视频放完才能放下一个"),
            this.OCn();
        else {
          const o = this.OpenParam.VideoDataConf;
          if (o && ModManager_1.ModManager.Settings.PlotSkip) {
            o.CanSkip = 1;
          }
          o
            ? ((this.xRe = ResourceSystem_1.ResourceSystem.LoadAsync(
                o.CgFile,
                UE.MediaSource,
                (i) => {
                  if (i)
                    if (
                      ((this.xRe = ResourceSystem_1.ResourceSystem.InvalidId),
                      this.kbr.OpenSource(i))
                    ) {
                      AudioController_1.AudioController.SetState(
                        AudioDefine_1.PLOT_VIDEO_GROUP,
                        AudioDefine_1.PLOT_VIDEO
                      ),
                        (this.Kbr = o.CgName),
                        (this.xdn = !1);
                      (i =
                        !ModelManager_1.ModelManager.GameModeModel
                          .PlayTravelMp4 &&
                        // (ModelManager_1.ModelManager.PlotModel.IsGmCanSkip ||
                        //   o.CanSkip)),
                        (ModManager_1.ModManager.Settings.PlotSkip ||
                          o.CanSkip)),
                        (i =
                          (ControllerHolder_1.ControllerHolder.FlowController.EnableSkip(
                            1 //i
                          ),
                          (this.Fbr = [
                            ...ConfigManager_1.ConfigManager.VideoConfig.GetVideoCaptions(
                              this.Kbr
                            ),
                          ]),
                          this.Fbr.sort((i, e) => e.ShowMoment - i.ShowMoment),
                          this.iqr(),
                          ConfigManager_1.ConfigManager.VideoConfig.GetVideoSounds(
                            this.Kbr
                          )));
                      for (const t of i) {
                        var e = t.EventPath;
                        AudioController_1.AudioController.PostEventByUi(
                          e,
                          VideoLauncher_1.VideoLauncher.AudioEventResult
                        );
                      }
                      EventSystem_1.EventSystem.Emit(
                        EventDefine_1.EEventName.VideoStart,
                        this.Kbr
                      ),
                        Log_1.Log.CheckDebug() &&
                          Log_1.Log.Debug(
                            "Video",
                            39,
                            "MediaPlayer开始5秒倒计时检查"
                          ),
                        (this.GCn = TimerSystem_1.TimerSystem.Delay(() => {
                          (this.GCn = void 0),
                            this.kbr
                              ? this.kbr.IsPlaying() || this.kbr.IsPaused()
                                ? Log_1.Log.CheckDebug() &&
                                  Log_1.Log.Debug(
                                    "Video",
                                    39,
                                    "MediaPlayer状态检查通过"
                                  )
                                : (Log_1.Log.CheckWarn() &&
                                    Log_1.Log.Warn(
                                      "Video",
                                      39,
                                      "MediaPlayer加载了5秒超时，强制关闭CG界面",
                                      ["配置名称", o.CgName],
                                      ["视频路径", o.CgFile]
                                    ),
                                  this.OCn())
                              : Log_1.Log.CheckDebug() &&
                                Log_1.Log.Debug(
                                  "Video",
                                  39,
                                  "MediaPlayer已经没有了"
                                );
                        }, 5e3));
                    } else
                      Log_1.Log.CheckError() &&
                        Log_1.Log.Error(
                          "Video",
                          39,
                          "打开视频失败",
                          ["配置名称", o.CgName],
                          ["视频路径", o.CgFile]
                        ),
                        this.OCn();
                  else
                    Log_1.Log.CheckError() &&
                      Log_1.Log.Error(
                        "Video",
                        39,
                        "mediaSource加载失败",
                        ["配置名称", o.CgName],
                        ["视频路径", o.CgFile]
                      ),
                      this.OCn();
                }
              )),
              this.xRe < 0 &&
                (Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "Video",
                    39,
                    "mediaSource加载失败",
                    ["配置名称", o.CgName],
                    ["视频路径", o.CgFile]
                  ),
                this.OCn()))
            : (Log_1.Log.CheckError() &&
                Log_1.Log.Error("Video", 39, "事件被错误触发了", [
                  "名称",
                  EventDefine_1.EEventName.ShowVideo,
                ]),
              this.OCn());
        }
      }),
      (this.rqr = () => {
        var i,
          e = this.kbr.GetVideoTrackAspectRatio(0, 0),
          t =
            UiLayer_1.UiLayer.UiRootItem.GetWidth() /
            UiLayer_1.UiLayer.UiRootItem.GetHeight();
        e < t
          ? ((i = UiLayer_1.UiLayer.UiRootItem.GetWidth() / e),
            this.Obr.SetHeight(i),
            this.Obr.SetWidth(UiLayer_1.UiLayer.UiRootItem.GetWidth()))
          : t < e &&
            ((i = UiLayer_1.UiLayer.UiRootItem.GetHeight() * e),
            this.Obr.SetWidth(i),
            this.Obr.SetHeight(UiLayer_1.UiLayer.UiRootItem.GetHeight()));
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIButtonComponent],
      [2, UE.UIText],
      [3, UE.UIItem],
      [4, UE.UIButtonComponent],
      [5, UE.UIItem],
      [6, UE.UISprite],
    ];
  }
  OnStart() {
    var i;
    this.GetItem(5).SetUIActive(!1),
      this.GetButton(1).RootUIComp.SetUIActive(!1),
      (this.bJi = new PlotSkipComponent_1.PlotSkipComponent(
        this.GetButton(1),
        this.Ybr,
        void 0,
        this
      )),
      this.bJi.EnableSkipButton(!1),
      (this.Obr = this.GetButton(0)
        .GetOwner()
        .GetComponentByClass(UE.UITexture.StaticClass())),
      this.Obr.SetHeight(UiLayer_1.UiLayer.UiRootItem.Height),
      this.Obr.SetWidth(UiLayer_1.UiLayer.UiRootItem.Width),
      this.Obr
        ? ((i = this.Obr.GetTexture()),
          (this.kbr = i?.GetMediaPlayer()),
          this.kbr ||
            (Log_1.Log.CheckError() &&
              Log_1.Log.Error("Video", 39, "获取MediaPlayer异常！！")),
          this.kbr.OnEndReached.Add(this.Zbr),
          this.kbr.OnMediaOpened.Add(this.rqr),
          this.kbr.OnMediaOpenFailed.Add(this.eqr),
          this.GetText(2).SetUIActive(!1))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error("Video", 39, "获取CgTexture异常！！");
  }
  OnAfterShow() {
    Log_1.Log.CheckDebug() && Log_1.Log.Debug("Video", 28, "VideoView OnShow"),
      (this.NCn = !1),
      this.tqr();
  }
  OnBeforeHide() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Video", 17, "VideoView OnBeforeHide"),
      this.bJi.EnableSkipButton(!1);
  }
  OnBeforeDestroy() {
    void 0 !== this.Vbr &&
      (TimerSystem_1.TimerSystem.Remove(this.Vbr), (this.Vbr = void 0)),
      this.xRe !== ResourceSystem_1.ResourceSystem.InvalidId &&
        (ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.xRe),
        (this.xRe = ResourceSystem_1.ResourceSystem.InvalidId)),
      (this.Kbr = void 0),
      this.kbr?.OnEndReached.Remove(this.Zbr),
      this.kbr?.OnMediaOpened.Remove(this.rqr),
      this.kbr?.OnMediaOpenFailed.Remove(this.eqr),
      this.kbr?.Close(),
      (this.kbr = void 0),
      (this.Fbr = void 0),
      (this.Qbr = void 0),
      AudioController_1.AudioController.StopEvent(
        VideoLauncher_1.VideoLauncher.AudioEventResult,
        !this.$br
      ),
      AudioController_1.AudioController.SetState(
        AudioDefine_1.PLOT_VIDEO_GROUP,
        AudioDefine_1.PLOT_NOT_VIDEO
      ),
      (this.xdn = !1),
      this.bJi?.OnClear(),
      ((this.bJi = void 0), this.OpenParam?.VideoCloseCb)?.(),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Video", 17, "VideoView callback done");
  }
  OnAddEventListener() {
    Application_1.Application.AddApplicationHandler(1, this.Jbr),
      Application_1.Application.AddApplicationHandler(0, this.zbr),
      this.bJi.AddEventListener();
  }
  OnRemoveEventListener() {
    Application_1.Application.RemoveApplicationHandler(1, this.Jbr),
      Application_1.Application.RemoveApplicationHandler(0, this.zbr),
      this.bJi.RemoveEventListener();
  }
  iqr() {
    if (!this.Fbr?.length || USE_TICK) this.Vbr = void 0;
    else {
      const o = this.Fbr.pop();
      var i =
        ((o.ShowMoment - this.jbr - this.Wbr) /
          VideoDefine_1.VideoUtils.FramePerSecond) *
        TimeUtil_1.TimeUtil.InverseMillisecond;
      this.Vbr = TimerSystem_1.TimerSystem.Delay((i) => {
        var e =
          ConfigManager_1.ConfigManager.VideoConfig.GetVideoCaptionText(o);
        const t = this.GetText(2);
        t.SetUIActive(!0), t.SetText(e);
        e =
          (o.Duration / VideoDefine_1.VideoUtils.FramePerSecond) *
          TimeUtil_1.TimeUtil.InverseMillisecond;
        this.Vbr = TimerSystem_1.TimerSystem.Delay((i) => {
          t.SetUIActive(!1),
            (this.jbr = o.ShowMoment),
            (this.Wbr = o.Duration),
            this.iqr();
        }, e);
      }, i);
    }
  }
  oqr(i) {
    if (this.Fbr?.length && USE_TICK && this.Xbr) {
      var e,
        t,
        o = UE.KismetMathLibrary.GetTotalMilliseconds(this.kbr.GetTime());
      let i = void 0;
      for (; 0 < this.Fbr.length; ) {
        if (
          !(
            ((i = this.Fbr[this.Fbr.length - 1]).ShowMoment + i.Duration) *
              VideoDefine_1.VideoUtils.MillisecondPerFrame <
            o
          )
        )
          break;
        this.Fbr.pop(),
          this.xdn
            ? ((this.xdn = !1),
              this.GetText(2).SetUIActive(!1),
              Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug(
                  "Video",
                  27,
                  "CG字幕关闭",
                  ["id", i.CaptionId],
                  ["frame", o * VideoDefine_1.VideoUtils.FramePerMillisecond],
                  ["config frame", i.ShowMoment + i.Duration]
                ))
            : Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("Video", 27, "CG字幕废弃", ["id", i.CaptionId]),
          (i = void 0);
      }
      !i ||
        this.xdn ||
        o < i.ShowMoment * VideoDefine_1.VideoUtils.MillisecondPerFrame ||
        ((this.xdn = !0),
        (e = this.GetText(2)),
        (t = ConfigManager_1.ConfigManager.VideoConfig.GetVideoCaptionText(i)),
        e.SetUIActive(!0),
        e.SetText(t),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Video",
            27,
            "CG字幕",
            ["text", t],
            ["frame", o * VideoDefine_1.VideoUtils.FramePerMillisecond],
            ["config frame", i.ShowMoment],
            ["id", i.CaptionId]
          ));
    }
  }
  OnTick(i) {
    this.oqr(i);
  }
}
exports.VideoView = VideoView;
//# sourceMappingURL=VideoView.js.map

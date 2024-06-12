"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WeatherController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  NetDefine_1 = require("../../../Core/Define/Net/NetDefine"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  Net_1 = require("../../../Core/Net/Net"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  GlobalData_1 = require("../../GlobalData"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  WeatherModel_1 = require("./WeatherModel"),
  ModManager_1 = require("../../Manager/ModManager"),//addcode
  CHANGE_WEATHER_SMOOTH_TIME = 10,
  CHANGE_WEATHER_SMOOTH_TIME_QUICK = 1,
  CHECKGAP = 300;
class WeatherController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return this.OnAddEvents(), this.OnRegisterNetEvent(), this.Wke(), !0;
  }
  static OnClear() {
    return (
      this.OnRemoveEvents(),
      this.OnUnRegisterNetEvent(),
      this.JGr(),
      this.X4t(),
      !0
    );
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.EnterGameSuccess,
      WeatherController.bEr
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.BeforeLoadMap,
        WeatherController.qQi
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldDoneAndCloseLoading,
        WeatherController.S7e
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.EnterGameSuccess,
      WeatherController.bEr
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.BeforeLoadMap,
        WeatherController.qQi
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldDoneAndCloseLoading,
        WeatherController.S7e
      );
  }
  static Wke() {
    WeatherController.zGr = TimerSystem_1.TimerSystem.Forever(
      WeatherController.ZGr,
      CHECKGAP
    );
  }
  static X4t() {
    void 0 !== WeatherController.zGr &&
      (TimerSystem_1.TimerSystem.Remove(WeatherController.zGr),
      (WeatherController.zGr = void 0));
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(
      NetDefine_1.ENotifyMessageId.WeatherNotify,
      WeatherController.eNr
    );
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(NetDefine_1.ENotifyMessageId.WeatherNotify);
  }
  static JGr() {
    WeatherModel_1.WeatherModel.GetWorldWeatherActor().Destroy();
  }
  static RequestChangeWeather(e) {   
    var t = new Protocol_1.Aki.Protocol.ChangeWeatherRequest();
    e=1,
    (t.WeatherId = e),
      Net_1.Net.Call(
        NetDefine_1.ERequestMessageId.ChangeWeatherRequest,
        t,
        (e) => {
          e.ErrorCode !== Protocol_1.Aki.Protocol.ErrorCode.Success &&
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.ErrorCode,
              NetDefine_1.EResponseMessageId.ChangeWeatherResponse
            );
        }
      );
  }
  static ChangeCurrentWeather(e, t) {
    if(ModManager_1.ModManager.Settings.Weather === true){
      e = ModManager_1.ModManager.Settings.WeatherType//天气e//1.sunny 2.Cloudy 3.ThunderRain 4.Snow 5.rain

    }
    ModelManager_1.ModelManager.WeatherModel.CurrentWeatherId !== e &&
      (ModelManager_1.ModelManager.WeatherModel.SetCurrentWeatherId(e),
      WeatherModel_1.WeatherModel.GetWorldWeatherActor().ChangeWeather(e, t)),
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WeatherChange);
  }
  static TestChangeWeather(e) {
    ModelManager_1.ModelManager.WeatherModel.SetCurrentWeatherId(e),//天气e
      WeatherModel_1.WeatherModel.GetWorldWeatherActor().ChangeWeather(
        e,
        CHANGE_WEATHER_SMOOTH_TIME
      );
  }
  static StopWeather() {
    WeatherModel_1.WeatherModel.GetWorldWeatherActor().Destroy();
  }
  static BanWeather() {
    WeatherModel_1.WeatherModel.GetWorldWeatherActor().BanWeather();
  }
}
((exports.WeatherController = WeatherController).zGr = void 0),
  (WeatherController.ZGr = () => {
    WeatherModel_1.WeatherModel.GetWorldWeatherActor().SetActorState(
      !GlobalData_1.GlobalData.IsUiSceneOpen
    );
  }),
  (WeatherController.bEr = () => {}),
  (WeatherController.qQi = () => {
    WeatherModel_1.WeatherModel.GetWorldWeatherActor().Destroy();
  }),
  (WeatherController.S7e = () => {
    ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() ||
      0 === ModelManager_1.ModelManager.WeatherModel.CurrentWeatherId ||
      WeatherModel_1.WeatherModel.GetWorldWeatherActor().ChangeWeather(
        ModelManager_1.ModelManager.WeatherModel.CurrentWeatherId,
        CHANGE_WEATHER_SMOOTH_TIME_QUICK
      );
  }),
  (WeatherController.eNr = (e) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Weather", 28, "OnWeatherNotify", ["WeatherNotify", e]),
      e.IsClient
        ? WeatherController.ChangeCurrentWeather(
            e.WeatherId,
            CHANGE_WEATHER_SMOOTH_TIME_QUICK
          )
        : WeatherController.ChangeCurrentWeather(
            e.WeatherId,
            CHANGE_WEATHER_SMOOTH_TIME
          );
  });
//# sourceMappingURL=WeatherController.js.map

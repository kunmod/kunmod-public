"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0,
}),
  (exports.ModManager = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Info_1 = require("../../Core/Common/Info"),
  Log_1 = require("../../Core/Common/Log"),
  Protocol_1 = require("../../Core/Define/Net/Protocol"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  InputSettings_1 = require("../InputSettings/InputSettings"),
  InputController_1 = require("../Input/InputController"),
  TeleportController_1 = require("../Module/Teleport/TeleportController"),
  CreatureController_1 = require("../World/Controller/CreatureController"),
  ConfirmBoxController_1 = require("../Module/ConfirmBox/ConfirmBoxController"),
  ConfirmBoxDefine_1 = require("../Module/ConfirmBox/ConfirmBoxDefine"),
  ScrollingTipsController_1 = require("../Module/ScrollingTips/ScrollingTipsController"),
  MapController_1 = require("../Module/Map/Controller/MapController"),
  ModelManager_1 = require("../Manager/ModelManager"),
  CharacterController_1 = require("..//NewWorld/Character/CharacterController"),
  UidView_1 = require("../Module/UidShow/UidView"),
  LguiUtil_1 = require("../Module/Util/LguiUtil"),
  UiManager_1 = require("../../Ui/UiManager"),
  UiTickViewBase_1 = require("../../Ui/Base/UiTickViewBase"),
  WorldDebugModel_1 = require("../World/Model/WorldDebugModel"), //
  ModCustomTp_1 = require("./ModFuncs/ModCustomTp"),
  ModUtils_1 = require("./ModFuncs/ModUtils"),
  ModDebuger_1 = require("./ModFuncs/ModDebuger"),
  EntityManager_1 = require("./ModFuncs/EntityManager"),
  MainMenu_1 = require("../Main");

const ModLanguage_1 = require("./ModFuncs/ModLanguage");
const { MobVacuum } = require("./ModFuncs/MobVacuum");
const ModTr = ModLanguage_1.ModLanguage.ModTr;
const ConfigFileName = "KunModConfig.json";
class ModManager {
  static Settings = {

    ModEnabled: true,
    GodMode: true,
    HitMultiplier: false,
    Hitcount: 15,
    AutoPickTreasure: false,
    AntiDither: true,
    NoCD: false,
    InfiniteStamina: false,
    killAura: false,
    killAuraState: 0, //0 Only Hatred  1 Infinity
    PerceptionRange: false,
    MarkTp: false,
    MarkX: 0,
    MarkY: 0,
    MarkZ: 0,
    MarkTpPosZ: 300,
    CustomTp: false,
    playerSpeedValue: 3,
    PlayerSpeed: false,
    AutoLoot: false,
    HideHUD: false,
    HideDmgUi: false,
    InfiniteEnergy: false,
    //test
    DebugEntity: true, //(if use entity func need enable)
    AutoDestroy: false,
    killAuranew: false,
    killAuraRadius: 300,
    KillAnimal: false,
    AutoAbsorbnew: false,
    AutoChest: true,
    WeatherChanger: false,
    WeatherType: 1,
    WorldSpeed: false,
    WorldSpeedValue: 1,
    PlotSkip: true,
    MobVacuum: false,
    VacuumCollect: false,
    VacuumRadius:300,
    AttributeModifier:false,
    Uid: "100000000",
    Language: "English",
    ESP:true,
    ESPRadius:300,
    ShowMonster:true,
    ShowAnimal:true,
    ShowNpc:false,
    ShowTreasure:false,
    ShowCollect:false,
    ShowPuzzle:false,
    ShowCasket:false,
    ShowMutterfly:false,
    ShowRock:false,
    ShowBlobfly:false,
    ShowBox:false,  
    ShowEntityId:false,
    ShowDistance:true,
    ShowName:true,
    ShowUnkown:true,
    FPSUnlocker:false,
    ShowFPS:false,
    FOV:false,
    FOVValue:60, // default
    NoClip:false,
    AutoPuzzle:false,
    ShowBlueprint:false,
  };

  static GetGameDir() {
    return UE.BlueprintPathsLibrary.ProjectDir() + "Binaries/Win64/";
  }

  static CheckConfigExists() {
    const config = UE.BlueprintPathsLibrary.FileExists(
      this.GetGameDir() + ConfigFileName
    );
    return config;
  }

  static SaveConfig() {
    UE.KuroStaticLibrary.SaveStringToFile(
      JSON.stringify(this.Settings),
      this.GetGameDir() + ConfigFileName
    );
  }

  static LoadConfig() {
    let Config = puerts_1.$ref(undefined);
    UE.KuroStaticLibrary.LoadFileToString(
      Config,
      this.GetGameDir() + ConfigFileName
    );
    puerts_1.$unref(Config);
    Config = JSON.parse(Config[0]);
    // compare current settings
    const Diff = Object.keys(ModManager.Settings).filter(x => !Object.keys(Config).includes(x));
    if (Diff.length > 0) {
      // add new settings
      for (const i in Diff) {
        Config[Diff[i]] = ModManager.Settings[Diff[i]];
      }
    }
    this.Settings = Config;
    if (!ModLanguage_1.ModLanguage.Langs.includes(this.Settings.Language)) {
      this.Settings.Language = "English";
    }
    ModManager.SaveConfig();
  }

  static ModStart() {
    //ModDebuger_1.ModDebuger.TestMethod();
    this.AddKey("ShowMenu", "Home");
    this.AddToggle("GodMode", "F5");
    this.AddToggle("HitMultiplier", "F6");
    this.AddToggle("AutoPickTreasure", "F7");
    this.AddToggle("AutoAbsorbnew", "F8");
    this.AddToggle("killAura", "F9");
    this.AddToggle("PerceptionRange", "F10");
    this.AddToggle("NoCD", "F11");
    this.AddToggle("PlayerSpeed", "F12");
    this.AddToggle("CustomTp", "Insert");
    this.AddToggle("AutoLoot", "NumPadZero");
    this.AddToggle("AutoDestroy", "NumPadOne");
    this.AddToggle("skip", "NumPadFour");
    this.AddKey("MarkTp", "t");
  }

  static listenModsToggle() {
    this.listenMod("GodMode", "F5", "GodMode");
    this.listenMod("HitMultiplier", "F6", "HitMultiplier");

    this.listenMod("AutoPickTreasure", "F7", "AutoPickTreasure");
    this.listenMod("AutoAbsorbnew", "F8", "AutoAbsorbnew");
    this.listenMod("killAura", "F9", "killAura");
    this.listenMod("PerceptionRange", "F10", "PerceptionRange");
    this.listenMod("NoCD", "F11", "NoCD");

    if (this.listenMod("PlayerSpeed", "F12", "PlayerSpeed")) {
      if (this.Settings.PlayerSpeed) {
        EntityManager_1.EntityManager.SetPlayerSpeed(
          this.Settings.playerSpeedValue
        );
      } else {
        EntityManager_1.EntityManager.SetPlayerSpeed(1);
      }
    }
    if (this.listenMod("CustomTp", "Insert", "CustomTp")) {
      if (this.Settings.CustomTp) {
        ModCustomTp_1.ModCustomTp.CustomTpEnable();
      } else {
        ModCustomTp_1.ModCustomTp.CustomTpDisable();
      }
    }
    if (this.Settings.CustomTp) {
      ModCustomTp_1.ModCustomTp.listenAuto();
      ModCustomTp_1.ModCustomTp.listenSelect();
      ModCustomTp_1.ModCustomTp.listenDelay();

      if (this.listenKey("ShowTpState", "Delete")) {
        ModCustomTp_1.ModCustomTp.ShowCtpState();
      }
      if (this.listenKey("PreviousFile", "PageUp")) {
        ModCustomTp_1.ModCustomTp.SubFile();
      }
      if (this.listenKey("NextFile", "PageDown")) {
        ModCustomTp_1.ModCustomTp.AddFile();
      }
      if (this.listenKey("PreviousPos", "Up")) {
        ModCustomTp_1.ModCustomTp.SubPos();
        ModCustomTp_1.ModCustomTp.GoTp();
      }
      if (this.listenKey("NextPos", "Down")) {
        ModCustomTp_1.ModCustomTp.AddPos();
        ModCustomTp_1.ModCustomTp.GoTp();
      }
    }

    this.listenMod("AutoLoot", "NumPadZero", "AutoLoot");
    this.listenMod("AutoDestroy", "NumPadOne", "AutoDestroy");
    // ModDebuger_1.ModDebuger.EnableDebug();
    // if (ModDebuger_1.ModDebuger.Setting.EnableDebug) {
    //   ModDebuger_1.ModDebuger.ListenDebug();
    // }

    if (this.listenKey("MarkTp", "t")) {
      if (this.Settings.MarkTp && ModUtils_1.ModUtils.IsInMapView())
        this.TpNoloadingTo(
          this.Settings.MarkX * 100,
          this.Settings.MarkY * 100,
          this.Settings.MarkZ * 100
        );
    }

    //this.listenMod("skip", "NumPadFour", "plot");
  }

  static AddToggle(desc, key) {
    InputSettings_1.InputSettings.AddActionMapping(desc, key);
  }
  static RemoveToggle(desc, key) {
    InputSettings_1.InputSettings.RemoveActionMapping(desc, key);
  }
  static AddKey(desc, key) {
    InputSettings_1.InputSettings.AddActionMapping(desc, key);
  }
  static RemoveKey(desc, key) {
    InputSettings_1.InputSettings.RemoveActionMapping(desc, key);
  }
  static ShowFuncStateTip(func, string) {
    string = ModTr(string);
    var info = "Unknown";
    if (this.Settings.hasOwnProperty(func)) var state = this.Settings[func];
    if (state) {
      info = string + " | " + ModTr("TEXT_ON");
      this.ShowTip(info);
    } else {
      info = string + " | " + ModTr("TEXT_OFF");
      this.ShowTip(info);
    }
  }

  static Toggle(func) {
    if (this.Settings.hasOwnProperty(func)) {
      this.Settings[func] = !this.Settings[func];
    }
  }

  static listenMod(func, key, funcname) {
    if (InputController_1.InputController.IsMyKeyUp(key)) {
      if (this.Settings.hasOwnProperty(func)) {
        this.Settings[func] = !this.Settings[func];
        ModUtils_1.ModUtils.PlayAudio("play_ui_fx_com_count_number");
        this.ShowFuncStateTip(func, funcname);
      }
      return true;
    }
    return false;
  }
  static listenKey(desc, key) {
    var press = InputController_1.InputController.IsMyKeyUp(key);
    if (press) {
      ModUtils_1.ModUtils.PlayAudio("play_ui_fx_com_count_number");
    }
    return press;
  }

  static TpNoloadingTo(x, y, z) {
    TeleportController_1.TeleportController.TeleportToPositionNoLoading(
      new UE.Vector(x, y, z),
      new UE.Rotator(0, 0, 0),
      "comment/message"
    );
  }

  static TpNoloadingTo2(tppos) {
    TeleportController_1.TeleportController.TeleportToPositionNoLoading(
      tppos,
      new UE.Rotator(0, 0, 0),
      "comment/message"
    );
  }

  static MonsterBoom(entity, Delay) {
    CreatureController_1.CreatureController.MonsterBoomRequest(entity, Delay);
  }

  static ShowConfirmBox(title, string, id) {
    var newBox = new ConfirmBoxDefine_1.ConfirmBoxDataNew(id);
    newBox.SetTextArgs(string);
    newBox.SetTitle(title);
    ConfirmBoxController_1.ConfirmBoxController.ShowConfirmBoxNew(newBox);
  }

  static ShowTip(string) {
    ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(string);
  }

  static FuncState(func, string) {
    if (func) return string + ModTr("COLOR_ON");
    else return string + ModTr("COLOR_OFF");
  }

  static ChangeUid(string) {
    this.Settings.Uid = string;
    UiManager_1.UiManager.CloseView("UidView");
    UiManager_1.UiManager.OpenView("UidView");
  }
}
exports.ModManager = ModManager;

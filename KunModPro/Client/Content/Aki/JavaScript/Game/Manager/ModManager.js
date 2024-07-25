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
  InputSettings_1 = require("../InputSettings/InputSettings"),
  TeleportController_1 = require("../Module/Teleport/TeleportController"),
  CreatureController_1 = require("../World/Controller/CreatureController"),
  ConfirmBoxController_1 = require("../Module/ConfirmBox/ConfirmBoxController"),
  ConfirmBoxDefine_1 = require("../Module/ConfirmBox/ConfirmBoxDefine"),
  ScrollingTipsController_1 = require("../Module/ScrollingTips/ScrollingTipsController"),
  MapController_1 = require("../Module/Map/Controller/MapController"),
  ModelManager_1 = require("../Manager/ModelManager"),
  UidView_1 = require("../Module/UidShow/UidView"),
  UiManager_1 = require("../../Ui/UiManager"),
  ModCustomTp_1 = require("./ModFuncs/ModCustomTp"),
  ModUtils_1 = require("./ModFuncs/ModUtils"),
  ModDebuger_1 = require("./ModFuncs/ModDebuger"),
  EntityManager_1 = require("./ModFuncs/EntityManager"),
  NoClip_1 = require("./ModFuncs/NoClip"),
  ModLanguage_1 = require("./ModFuncs/ModLanguage"),
  MobVacuum_1 = require("./ModFuncs/MobVacuum"),
  keys_State = {},
  ConfigFileName = "KunModConfig.json";
  
class ModManager {
  constructor() {
    this.key_State = false;
  }
  static Settings = {
    ModEnabled: true,
    GodMode: false,
    HitMultiplier: false,
    Hitcount: 15,
    AutoPickTreasure: false,
    AntiDither: false,
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
    HasCustomTpFile: false,
    playerSpeedValue: 3,
    PlayerSpeed: false,
    AutoLoot: false,
    HideHUD: false,
    HideDmgUi: false,
    //test
    DebugEntity: false, //(if use entity func need enable)
    AutoDestroy: false,
    killAuranew: false,
    killAuraRadius: 300,
    KillAnimal: false,
    AutoAbsorbnew: false,
    AutoChest: false,
    WeatherChanger: false,
    WeatherType: 1,
    WorldSpeed: false,
    WorldSpeedValue: 1,
    PlotSkip: false,
    MobVacuum: false,
    VacuumCollect: false,
    VacuumRadius: 300,
    AttributeModifier: false,
    Uid: "100000000",
    Language: "English",
    ESP: false,
    ESPRadius: 300,
    ShowMonster: false,
    ShowAnimal: false,
    ShowNpc: false,
    ShowTreasure: false,
    ShowCollect: false,
    ShowPuzzle: false,
    ShowCasket: false,
    ShowMutterfly: false,
    ShowRock: false,
    ShowBlobfly: false,
    ShowBox: false,
    ShowEntityId: false,
    ShowDistance: false,
    ShowName: false,
    ShowUnkown: false,
    FPSUnlocker: false,
    ShowFPS: false,
    FOV: false,
    FOVValue: 60, // default
    NoClip: false,
    AutoPuzzle: false,
    ShowType: false,
    AutoTeleport: false,
    AutoSonanceCasket: false,
    QuestTp: false,
    QuestX: 0,
    QuestY: 0,
    QuestZ: 0,
    AlwaysCrit: false
  };

  // please set all settings to false, preventing unverified users

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
    const Diff = Object.keys(ModManager.Settings).filter(
      (x) => !Object.keys(Config).includes(x)
    );
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
    this.AddKey("MarkTp", "t");
    this.AddKey("QuestTp", "v");
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
    if (this.Settings.HasCustomTpFile) {
      if (this.listenMod("CustomTp", "Insert", "CustomTp")) {
        if (this.Settings.CustomTp) {
          ModCustomTp_1.ModCustomTp.CustomTpEnable();
        } else {
          ModCustomTp_1.ModCustomTp.CustomTpDisable();
        }
      }
    }

    if (this.Settings.NoClip) {
      if (this.IsMyKeyDown("x")) {
        NoClip_1.NoClip.SetPlayerPos("UP");
      }
      if (this.IsMyKeyDown("z")) {
        NoClip_1.NoClip.SetPlayerPos("DOWN");
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

    if (this.Settings.MarkTp && ModUtils_1.ModUtils.IsInMapView()) {
      if (this.listenKey("MarkTp", "t")) {
        let posz = this.Settings.MarkZ;
        if (posz == 0) posz = this.Settings.MarkTpPosZ;

        this.TpNoloadingTo(
          this.Settings.MarkX * 100,
          this.Settings.MarkY * 100,
          posz * 100
        );
      }
    }
    if (this.Settings.QuestTp && this.listenKey("QuestTp", "v")) {
      if (
        this.Settings.QuestX != 0 &&
        this.Settings.QuestY != 0 &&
        this.Settings.QuestZ != 0
      ) {
        this.TpNoloadingTo(
          this.Settings.QuestX,
          this.Settings.QuestY,
          this.Settings.QuestZ
        );
      }
    }
  }
  static IsMyKeyDown(str) {
    //add key func
    var IsInputKeyDown_1 = InputSettings_1.InputSettings.IsInputKeyDown(str);
    if (IsInputKeyDown_1 && !this.key_State) {
      this.key_State = true;
      return true;
    }
    if (!IsInputKeyDown_1) {
      this.key_State = false;
      return false;
    }
    return false;
  }

  static IsMyKeyUp(str) {
    if (!keys_State[str]) {
      keys_State[str] = { key_Down: false, key_Up: false };
    }
    var keyState = keys_State[str];
    var IsInputKeyDown_1 = InputSettings_1.InputSettings.IsInputKeyDown(str);
    if (IsInputKeyDown_1 && !keyState.key_Down) {
      keyState.key_Down = true;
      keyState.key_Up = false;
    }
    if (!IsInputKeyDown_1 && keyState.key_Down && !keyState.key_Up) {
      keyState.key_Up = true;
    }
    if (keyState.key_Down && keyState.key_Up) {
      keyState.key_Down = false;
      keyState.key_Up = false;
      return true;
    }
    return false;
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
    string = ModLanguage_1.ModLanguage.ModTr(string);
    var info = "Unknown";
    if (this.Settings.hasOwnProperty(func)) var state = this.Settings[func];
    if (state) {
      info = string + " | " + ModLanguage_1.ModLanguage.ModTr("TEXT_ON");
      this.ShowTip(info);
    } else {
      info = string + " | " + ModLanguage_1.ModLanguage.ModTr("TEXT_OFF");
      this.ShowTip(info);
    }
  }

  static Toggle(func) {
    if (this.Settings.hasOwnProperty(func)) {
      this.Settings[func] = !this.Settings[func];
    }
  }

  static listenMod(func, key, funcname) {
    if (this.IsMyKeyUp(key)) {
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
    var press = this.IsMyKeyUp(key);
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
    if (func) return string + ModLanguage_1.ModLanguage.ModTr("COLOR_ON");
    else return string + ModLanguage_1.ModLanguage.ModTr("COLOR_OFF");
  }

  static ChangeUid(string) {
    this.Settings.Uid = string;
    UiManager_1.UiManager.CloseView("UidView");
    UiManager_1.UiManager.OpenView("UidView");
  }
}
exports.ModManager = ModManager;

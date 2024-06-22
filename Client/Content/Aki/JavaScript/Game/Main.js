"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0,
});
const puerts_1 = require("puerts"),
  UE = require("ue"),
  InputSetting_1 = require("../Game/InputSettings/InputSettings"),
  ResourceSystem_1 = require("../Core/Resource/ResourceSystem"),
  GlobalData_1 = require("../Game/GlobalData"),
  GameProcedure_1 = require("./GameProcedure"),
  ModelManager_1 = require("./Manager/ModelManager"),
  ModManager_1 = require("./Manager/ModManager"),
  ModLanguage_1 = require("./Manager/ModFuncs/ModLanguage"),
  BluePrintType_1 = require("./Manager/ModFuncs/BluePrintType"),
  ModMethod_1 = require("./Manager/ModFuncs/ModMethod"),
  EntityManager_1 = require("./Manager/ModFuncs/EntityManager"),
  AutoAbsorb_1 = require("./Manager/ModFuncs/AutoAbsorb"),
  AutoInteract_1 = require("./Manager/ModFuncs/AutoInteract"),
  NoClip_1 = require("./Manager/ModFuncs/NoClip"),
  KillAura_1 = require("./Manager/ModFuncs/KillAura"),
  MobVacuum_1 = require("./Manager/ModFuncs/MobVacuum"),
  AutoChest_1 = require("./Manager/ModFuncs/AutoChest"),
  AutoDestroy_1 = require("./Manager/ModFuncs/AutoDestroy"),
  UiManager_1 = require("./Ui/UiManager"),
  InputManager_1 = require("./Ui/Input/InputManager");
const { ModUtils } = require("./Manager/ModFuncs/ModUtils");
const { ModDebuger } = require("./Manager/ModFuncs/ModDebuger");
const { BluePrintType } = require("./Manager/ModFuncs/BluePrintType")

const ESP_INTERVAL = 10;

const ModManager = ModManager_1.ModManager,
  ModLanguage = ModLanguage_1.ModLanguage,
  EntityManager = EntityManager_1.EntityManager;

let keyState = false,
  Menu = null,
  isMenuLoaded = false,
  isMenuShow = false,
  currentLang = "en",
  loadMenuInterval = null;

function main() {
  GameProcedure_1.GameProcedure.Start(puerts_1.argv.getByName("GameInstance"));
}

class MainMenu {
  static ESPCanvas = null;
  static ESPColor = {
    red: new UE.LinearColor(1, 0, 0, 1), // red
    yellow: new UE.LinearColor(1, 1, 0, 1), // yellow
    purple: new UE.LinearColor(1, 0, 1, 1), // purple
    green: new UE.LinearColor(0, 1, 0, 1), // green
    blue: new UE.LinearColor(0, 0, 1, 1), // blue
    white: new UE.LinearColor(1, 1, 1, 1), // white
    black: new UE.LinearColor(0, 0, 0, 1), // black
    orange: new UE.LinearColor(1, 0.5, 0, 1), // orange
    pink: new UE.LinearColor(1, 0, 0.5, 1), // pink
  };

  static IsKey(str) {
    // let IsInputKeyDown = InputSetting_1.InputSettings.IsInputKeyDown(str);
    // if (IsInputKeyDown && !keyState) {
    //   IsInputKeyDown = false;
    //   keyState = true;
    //   return true;
    // }
    // if (IsInputKeyDown === false) {
    //   keyState = false;
    //   return false;
    // }
    // return false;
    // override default hotkey using only one
    var IsInputKeyDown_1 = InputSetting_1.InputSettings.IsInputKeyDown(str);
    var IsInputKeyDown_LeftControl =
      InputSetting_1.InputSettings.IsInputKeyDown("LeftAlt");
    if (IsInputKeyDown_LeftControl && IsInputKeyDown_1 && !keyState) {
      IsInputKeyDown_1 = false;
      IsInputKeyDown_LeftControl = false;
      keyState = true;
      return true;
    }
    if (IsInputKeyDown_1 === false) {
      keyState = false;
      return false;
    }
    return false;
  }

  static ListenKey() {
    ModManager.listenModsToggle();
    InputSetting_1.InputSettings.AddActionMapping("", "LeftAlt");
    InputSetting_1.InputSettings.AddActionMapping("", "X");

    if (MainMenu.IsKey("X") === true) {
      if (isMenuShow) {
        InputManager_1.InputManager.SetShowCursor(false);
        ModelManager_1.ModelManager.LoadingModel.SetIsLoadingView(false);
        ModelManager_1.ModelManager.LoadingModel.SetIsLoading(false);
        Menu.SetVisibility(2);
      } else {
        InputManager_1.InputManager.SetShowCursor(true);
        ModelManager_1.ModelManager.LoadingModel.SetIsLoadingView(true);
        ModelManager_1.ModelManager.LoadingModel.SetIsLoading(true);
        Menu.SetVisibility(0);
      }
      isMenuShow = !isMenuShow;
    }
    MainMenu.updateMenuState();
    MainMenu.updatePlayerSpeed();
    MainMenu.updateWorldSpeed();
  }

  static KunLog(string) {
    var info = string.toString();
    puerts_1.logger.info("[KUNMOD:]" + info);
  }

  static Start() {
    if (!isMenuLoaded) {
      //check if config exists
      if (!ModManager.CheckConfigExists()) {
        ModManager.SaveConfig();
      } else {
        ModManager.LoadConfig();
      }

      Menu = UE.UMGManager.CreateWidget(
        GlobalData_1.GlobalData.World,
        ResourceSystem_1.ResourceSystem.Load(
          "/Game/Aki/ModMenu.ModMenu_C",
          UE.Class
        )
      );

      if (Menu) {
        MainMenu.ESPCanvas = UE.UMGManager.CreateWidget(
          GlobalData_1.GlobalData.World,
          ResourceSystem_1.ResourceSystem.Load("/Game/Aki/ESP.ESP_C", UE.Class)
        );

        MainMenu.ESPCanvas.AddToViewport();
        MainMenu.ESPCanvas.SetVisibility(0);

        try {
          Menu.ModImage.SetBrushFromTexture(
            ResourceSystem_1.ResourceSystem.Load(
              "/Game/Aki/Changli.Changli",
              UE.Texture
            )
          );

          Menu.TitleBar.SetBrushFromTexture(
            ResourceSystem_1.ResourceSystem.Load(
              "/Game/Aki/Gradient.Gradient",
              UE.Texture
            )
          );

          MainMenu.updateMenuState();

          // translate
          MainMenu.getTranslation();

          for (const option in ModLanguage.Langs) {
            Menu.LanguageValue.AddOption(ModLanguage.Langs[option]);
          }

          Menu.LanguageValue.OnSelectionChanged.Add((selectedItem) => {
            if (selectedItem) {
              ModManager.Settings.Language = selectedItem;
              MainMenu.KunLog("Language: " + selectedItem);

              // update tr
              MainMenu.getTranslation();

              // update kill aura selection
              Menu.KillAuraValue.ClearOptions();
              for (const option in MainMenu.killAura()) {
                Menu.KillAuraValue.AddOption(MainMenu.killAura()[option]);
              }
              Menu.KillAuraValue.SetSelectedIndex(
                ModManager.Settings.killAuraState
              );

              // update weather selection
              Menu.WeatherValue.ClearOptions();
              for (const option in MainMenu.WeatherValue()) {
                Menu.WeatherValue.AddOption(MainMenu.WeatherValue()[option]);
              }
              Menu.WeatherValue.SetSelectedIndex(
                ModManager.Settings.WeatherType
              );
            }
          });

          Menu.LanguageValue.SetSelectedOption(ModManager.Settings.Language);

          Menu.GodModeCheck.OnCheckStateChanged.Add((isChecked) => {
            ModManager.Settings.GodMode = isChecked;
            MainMenu.KunLog("God Mode: " + isChecked);
          });

          Menu.NoCDCheck.OnCheckStateChanged.Add((isChecked) => {
            ModManager.Settings.NoCD = isChecked;
            MainMenu.KunLog("No Cooldown: " + isChecked);
          });

          Menu.AutoPickTreasureCheck.bIsEnabled = false;
          Menu.AutoPickTreasureCheck.OnCheckStateChanged.Add((isChecked) => {
            ModManager.Settings.AutoPickTreasure = isChecked;
            MainMenu.KunLog("Auto Pick Treasure: " + isChecked);
          });

          Menu.HitMultiplierCheck.OnCheckStateChanged.Add((isChecked) => {
            ModManager.Settings.HitMultiplier = isChecked;
            MainMenu.KunLog("Hit Multiplier: " + isChecked);
          });

          Menu.HitMultiplierSlider.OnValueChanged.Add((value) => {
            value = value.toFixed(3);
            Menu.HitMultiplierValue.SetText(value);
            ModManager.Settings.Hitcount = value;
            MainMenu.KunLog("Hit Multiplier Count: " + value);
          });

          Menu.KillAuraCheck.OnCheckStateChanged.Add((isChecked) => {
            ModManager.Settings.killAura = isChecked;
            MainMenu.KunLog("Kill Aura: " + isChecked);
          });

          for (const option in MainMenu.killAura()) {
            Menu.KillAuraValue.AddOption(MainMenu.killAura()[option]);
          }

          Menu.KillAuraValue.OnSelectionChanged.Add((selectedItem) => {
            if (selectedItem) {
              ModManager.Settings.killAuraState =
                MainMenu.killAura().indexOf(selectedItem);
              MainMenu.KunLog("Kill Aura Value: " + selectedItem);
            }
          });

          for (const option in MainMenu.WeatherValue()) {
            Menu.WeatherValue.AddOption(MainMenu.WeatherValue()[option]);
          }

          Menu.WeatherValue.OnSelectionChanged.Add((selectedItem) => {
            if (selectedItem) {
              ModManager.Settings.WeatherType =
                MainMenu.WeatherValue().indexOf(selectedItem);
              MainMenu.KunLog("Weather Type: " + selectedItem);
            }
          });

          Menu.AntiDitherCheck.OnCheckStateChanged.Add((isChecked) => {
            ModManager.Settings.AntiDither = isChecked;
            MainMenu.KunLog("Anti Dither: " + isChecked);
          });

          Menu.InfiniteStaminaCheck.OnCheckStateChanged.Add((isChecked) => {
            ModManager.Settings.InfiniteStamina = isChecked;
            MainMenu.KunLog("Inifnite Stamina: " + isChecked);
          });

          Menu.AutoLootCheck.OnCheckStateChanged.Add((isChecked) => {
            ModManager.Settings.AutoLoot = isChecked;
            MainMenu.KunLog("Auto Loot: " + isChecked);
          });

          Menu.KillAnimalCheck.OnCheckStateChanged.Add((isChecked) => {
            ModManager.Settings.KillAnimal = isChecked;
            MainMenu.KunLog("Kill Animal: " + isChecked);
          });

          Menu.PerceptionRangeCheck.OnCheckStateChanged.Add((isChecked) => {
            ModManager.Settings.PerceptionRange = isChecked;
            MainMenu.KunLog("Perception Range: " + isChecked);
          });

          Menu.PlayerSpeedCheck.OnCheckStateChanged.Add((isChecked) => {
            ModManager.Settings.PlayerSpeed = isChecked;
            MainMenu.KunLog("Player Speed: " + isChecked);
          });

          Menu.PlayerSpeedSlider.OnValueChanged.Add((value) => {
            value = value.toFixed(3);
            Menu.PlayerSpeedValue.SetText(value);
            ModManager.Settings.playerSpeedValue = value;
            MainMenu.KunLog("Player Speed Value: " + value);
          });

          Menu.CustomUidSubmit.OnClicked.Add(() => {
            const UID = Menu.CustomUidValue.GetText();
            ModManager.ChangeUid(UID);
            MainMenu.KunLog("UID Changed: " + UID);
          });

          Menu.SaveConfigButton.OnClicked.Add(() => {
            ModManager.SaveConfig();
            MainMenu.KunLog("Config Saved!");
          });

          Menu.HideHUDCheck.OnCheckStateChanged.Add((isChecked) => {
            ModManager.Settings.HideHUD = isChecked;
            if (isChecked) {
              UiManager_1.UiManager.CloseView("BattleView");
              UiManager_1.UiManager.CloseView("UidView");
            } else {
              UiManager_1.UiManager.OpenView("BattleView");
              UiManager_1.UiManager.OpenView("UidView");
            }
            MainMenu.KunLog("UID Hide: " + isChecked);
          });

          Menu.HideDmgCheck.OnCheckStateChanged.Add((isChecked) => {
            ModManager.Settings.HideDmgUi = isChecked;
            MainMenu.KunLog("Hide Damage Text: " + isChecked);
          });

          Menu.CustomTPCheck.OnCheckStateChanged.Add((isChecked) => {
            ModManager.Settings.CustomTp = isChecked;
            MainMenu.KunLog("Custom Teleport: " + isChecked);
          });

          Menu.MarkTPCheck.OnCheckStateChanged.Add((isChecked) => {
            ModManager.Settings.MarkTp = isChecked;
            MainMenu.KunLog("Mark Teleport: " + isChecked);
          });

          Menu.DebugEntityCheck.OnCheckStateChanged.Add((isChecked) => {
            ModManager.Settings.DebugEntity = isChecked;
            MainMenu.KunLog("Debug Entity: " + isChecked);
          });

          Menu.AutoDestroyCheck.OnCheckStateChanged.Add((isChecked) => {
            ModManager.Settings.AutoDestroy = isChecked;
            MainMenu.KunLog("Auto Destroy: " + isChecked);
          });

          Menu.NewAutoAbsorbCheck.OnCheckStateChanged.Add((isChecked) => {
            ModManager.Settings.AutoAbsorbnew = isChecked;
            MainMenu.KunLog("New Auto Absorb: " + isChecked);
          });

          Menu.NewKillAuraCheck.OnCheckStateChanged.Add((isChecked) => {
            ModManager.Settings.killAuranew = isChecked;
            MainMenu.KunLog("New Kill Aura: " + isChecked);
          });

          Menu.NewKillAuraSlider.OnValueChanged.Add((value) => {
            value = value.toFixed(3);
            Menu.NewKillAuraValue.SetText(value);
            ModManager.Settings.killAuraRadius = value;
            MainMenu.KunLog("Hit Multiplier Count: " + value);
          });

          Menu.WorldSpeedCheck.OnCheckStateChanged.Add((isChecked) => {
            ModManager.Settings.WorldSpeed = isChecked;
            MainMenu.KunLog("World Speed: " + isChecked);
          });

          Menu.WorldSpeedSlider.OnValueChanged.Add((value) => {
            value = value.toFixed(3);
            Menu.WorldSpeedValue.SetText(value);
            ModManager.Settings.WorldSpeedValue = value;
            MainMenu.KunLog("World Speed: " + value);
          });

          Menu.ESPCheck.OnCheckStateChanged.Add((isChecked) => {
            ModManager.Settings.ESP = isChecked;
            MainMenu.KunLog("ESP: " + isChecked);
          });

          Menu.ESPShowNameCheck.OnCheckStateChanged.Add((isChecked) => {
            ModManager.Settings.ShowName = isChecked;
            MainMenu.KunLog("ESP Show Name: " + isChecked);
          });

          Menu.ESPShowDistanceCheck.OnCheckStateChanged.Add((isChecked) => {
            ModManager.Settings.ShowDistance = isChecked;
            MainMenu.KunLog("ESP Show Distance: " + isChecked);
          });

          Menu.ESPShowBoxCheck.OnCheckStateChanged.Add((isChecked) => {
            ModManager.Settings.ShowBox = isChecked;
            MainMenu.KunLog("ESP Show Box: " + isChecked);
          });

          Menu.ESPMonsterCheck.OnCheckStateChanged.Add((isChecked) => {
            ModManager.Settings.ShowMonster = isChecked;
            MainMenu.KunLog("ESP Monster: " + isChecked);
          });

          Menu.ESPCollectionCheck.OnCheckStateChanged.Add((isChecked) => {
            ModManager.Settings.ShowCollect = isChecked;
            MainMenu.KunLog("ESP Collection: " + isChecked);
          });

          Menu.ESPTreasureCheck.OnCheckStateChanged.Add((isChecked) => {
            ModManager.Settings.ShowTreasure = isChecked;
            MainMenu.KunLog("ESP Treasure: " + isChecked);
          });

          Menu.ESPAnimalCheck.OnCheckStateChanged.Add((isChecked) => {
            ModManager.Settings.ShowAnimal = isChecked;
            MainMenu.KunLog("ESP Animal: " + isChecked);
          });

          Menu.ESPPuzzleCheck.OnCheckStateChanged.Add((isChecked) => {
            ModManager.Settings.ShowPuzzle = isChecked;
            MainMenu.KunLog("ESP Puzzle: " + isChecked);
          });

          Menu.ESPCasketCheck.OnCheckStateChanged.Add((isChecked) => {
            ModManager.Settings.ShowCasket = isChecked;
            MainMenu.KunLog("ESP Sonance Casket: " + isChecked);
          });

          Menu.ESPRockCheck.OnCheckStateChanged.Add((isChecked) => {
            ModManager.Settings.ShowRock = isChecked;
            MainMenu.KunLog("ESP Rock: " + isChecked);
          });

          Menu.ESPMutterflyCheck.OnCheckStateChanged.Add((isChecked) => {
            ModManager.Settings.ShowMutterfly = isChecked;
            MainMenu.KunLog("ESP Mutterfly: " + isChecked);
          });

          Menu.ESPBlobflyCheck.OnCheckStateChanged.Add((isChecked) => {
            ModManager.Settings.ShowBlobfly = isChecked;
            MainMenu.KunLog("ESP Blobfly: " + isChecked);
          });

          Menu.ESPRadiusSlider.OnValueChanged.Add((value) => {
            value = value.toFixed(0);
            Menu.ESPRadiusValue.SetText(value);
            ModManager.Settings.ESPRadius = value;
            MainMenu.KunLog("ESP Radius: " + value);
          });

          Menu.ConsoleCommandSet.OnClicked.Add(() => {
            const Command = Menu.ConsoleCommandValue.GetText();
            ModDebuger.ConsoleCommand(Command);
            MainMenu.KunLog("Execute Command: " + Command);
          });

          Menu.MobVacuumCheck.OnCheckStateChanged.Add((isChecked) => {
            ModManager.Settings.MobVacuum = isChecked;
            MainMenu.KunLog("Mob Vacuum: " + isChecked);
          });

          Menu.VacuumCollectCheck.OnCheckStateChanged.Add((isChecked) => {
            ModManager.Settings.VacuumCollect = isChecked;
            MainMenu.KunLog("Vacuum Collect: " + isChecked);
          });

          Menu.WeatherCheck.OnCheckStateChanged.Add((isChecked) => {
            ModManager.Settings.WeatherChanger = isChecked;
            if (isChecked) {
              ModMethod_1.ModMethod.ChangWeather(
                ModManager.Settings.WeatherType + 1
              ); //Because it starts from 0
            } else {
              ModMethod_1.ModMethod.FPSUnlocker(
                ModManager.Settings.WeatherType + 1
              );
            }

            MainMenu.KunLog("Weather Changer: " + isChecked);
          });

          Menu.FPSUnlockerCheck.OnCheckStateChanged.Add((isChecked) => {
            ModManager.Settings.FPSUnlocker = isChecked;
            if (isChecked) {
              ModMethod_1.ModMethod.FPSUnlocker(true);
            } else {
              ModMethod_1.ModMethod.FPSUnlocker(false);
            }
            MainMenu.KunLog("FPS Unlocker: " + isChecked);
          });

          if (ModManager.Settings.FPSUnlocker) {
            ModMethod_1.ModMethod.FPSUnlocker(true);
          }

          Menu.FPSShowCheck.OnCheckStateChanged.Add((isChecked) => {
            ModManager.Settings.ShowFPS = isChecked;
            ModMethod_1.ModMethod.ShowFPS();
            MainMenu.KunLog("Show FPS: " + isChecked);
          });

          if (ModManager.Settings.ShowFPS) {
            ModMethod_1.ModMethod.ShowFPS();
          }

          Menu.FOVCheck.OnCheckStateChanged.Add((isChecked) => {
            ModManager.Settings.FOV = isChecked;
            const value = ModManager.Settings.FOVValue;
            if (isChecked) {
              ModMethod_1.ModMethod.SetFOV(value);
            } else {
              ModMethod_1.ModMethod.SetFOV(60);
            }
            MainMenu.KunLog("FOV: " + isChecked);
          });

          if (ModManager.Settings.FOV) {
            const value = ModManager.Settings.FOVValue;
            Menu.FOVValue.SetText(value);
            ModMethod_1.ModMethod.SetFOV(value);
          }

          Menu.FOVSlider.OnValueChanged.Add((value) => {
            value = value.toFixed(0);
            Menu.FOVValue.SetText(value);
            ModManager.Settings.FOVValue = value;
            ModMethod_1.ModMethod.SetFOV(value);
            MainMenu.KunLog("FOV Value: " + value);
          });

          Menu.NoClipCheck.OnCheckStateChanged.Add((isChecked) => {
            ModManager.Settings.NoClip = isChecked;
            if (isChecked) {
              NoClip_1.NoClip.NoClip(true);
            } else {
              NoClip_1.NoClip.NoClip(false);
            }
            MainMenu.KunLog("No Clip: " + isChecked);
          });

          if (ModManager.Settings.NoClip) {
            NoClip_1.NoClip.NoClip(true);
          }

          Menu.PlotSkipCheck.OnCheckStateChanged.Add((isChecked) => {
            ModManager.Settings.PlotSkip = isChecked;
            MainMenu.KunLog("Plot Skip: " + isChecked);
          });

          Menu.KillAuraValue.SetSelectedIndex(
            ModManager.Settings.killAuraState
          );
          Menu.WeatherValue.SetSelectedIndex(ModManager.Settings.WeatherType);
          Menu.CustomUidValue.SetText(ModManager.Settings.Uid);

          Menu.PlayerSpeedSlider.SetValue(ModManager.Settings.playerSpeedValue);
          Menu.HitMultiplierSlider.SetValue(ModManager.Settings.Hitcount);
          Menu.NewKillAuraSlider.SetValue(ModManager.Settings.killAuraRadius);
          Menu.WorldSpeedSlider.SetValue(ModManager.Settings.WorldSpeedValue);
          Menu.ESPRadiusSlider.SetValue(ModManager.Settings.ESPRadius);
          Menu.FOVSlider.SetValue(ModManager.Settings.FOVValue);

          Menu.PlayerSpeedValue.SetText(ModManager.Settings.playerSpeedValue);
          Menu.HitMultiplierValue.SetText(ModManager.Settings.Hitcount);
          Menu.NewKillAuraValue.SetText(ModManager.Settings.killAuraRadius);
          Menu.WorldSpeedValue.SetText(ModManager.Settings.WorldSpeedValue);
          Menu.ESPRadiusValue.SetText(ModManager.Settings.ESPRadius);
          Menu.FOVValue.SetText(ModManager.Settings.FOVValue);
        } catch (e) {
          MainMenu.KunLog(e);
        }

        Menu.AddToViewport();
        Menu.SetVisibility(2);
        isMenuLoaded = true;
        ModManager.ShowTip("KUN-MOD Menu Loaded!")
        MainMenu.KunLog("KUN-MOD Menu Loaded!");
        clearInterval(loadMenuInterval);
      }
    }
  }

  static getTranslation() {
    if (Menu) {
      Menu.PlayerSwitchText.SetText(ModLanguage.ModTr("HEADING_PLAYER"));
      Menu.WorldSwitchText.SetText(ModLanguage.ModTr("HEADING_WORLD"));
      Menu.ESPSwitchText.SetText(ModLanguage.ModTr("HEADING_ESP"));
      Menu.UISwitchText.SetText(ModLanguage.ModTr("HEADING_VISUAL"));
      Menu.DebugSwitchText.SetText(ModLanguage.ModTr("HEADING_DEBUG"));

      Menu.HeadingPlayer.SetText(ModLanguage.ModTr("HEADING_PLAYER"));
      Menu.HeadingWorld.SetText(ModLanguage.ModTr("HEADING_WORLD"));
      Menu.HeadingESP.SetText(ModLanguage.ModTr("HEADING_ESP"));
      Menu.HeadingESPFilter.SetText(ModLanguage.ModTr("HEADING_FILTER"));
      Menu.HeadingUI.SetText(ModLanguage.ModTr("HEADING_VISUAL"));
      Menu.HeadingTeleport.SetText(ModLanguage.ModTr("HEADING_TELEPORT"));
      Menu.HeadingDebug.SetText(ModLanguage.ModTr("HEADING_DEBUG"));

      Menu.SaveConfigText.SetText(ModLanguage.ModTr("TEXT_SAVE_CONFIG"));

      // player
      Menu.GodModeText.SetText(ModLanguage.ModTr("TEXT_GOD_MODE"));
      Menu.PlayerSpeedText.SetText(ModLanguage.ModTr("TEXT_PLAYER_SPEED"));
      Menu.NoCDText.SetText(ModLanguage.ModTr("TEXT_NO_COOLDOWN"));
      Menu.HitMultiplierText.SetText(ModLanguage.ModTr("TEXT_HIT_MULTIPLIER"));
      Menu.InfiniteStaminaText.SetText(
        ModLanguage.ModTr("TEXT_INFINITE_STAMINA")
      );
      Menu.AntiDitherText.SetText(ModLanguage.ModTr("TEXT_ANTI_DITHER"));
      Menu.NoClipText.SetText(ModLanguage.ModTr("TEXT_NOCLIP"));

      // teleport
      Menu.MarkTPText.SetText(ModLanguage.ModTr("TEXT_MARK_TELEPORT"));
      Menu.CustomTPText.SetText(ModLanguage.ModTr("TEXT_CUSTOM_TP"));

      // world
      Menu.WorldSpeedText.SetText(ModLanguage.ModTr("TEXT_WORLD_SPEED"));
      Menu.NewAutoAbsorbText.SetText(ModLanguage.ModTr("TEXT_AUTO_ABSORB"));
      Menu.AutoPickTreasureText.SetText(
        ModLanguage.ModTr("TEXT_AUTO_PICK_TREASURE")
      );
      Menu.KillAuraText.SetText(ModLanguage.ModTr("TEXT_KILL_AURA"));
      Menu.PerceptionRangeText.SetText(
        ModLanguage.ModTr("TEXT_PERCEPTION_RANGE")
      );
      Menu.AutoLootText.SetText(ModLanguage.ModTr("TEXT_AUTO_LOOT"));
      Menu.AutoDestroyText.SetText(ModLanguage.ModTr("TEXT_AUTO_DESTROY"));
      Menu.KillAnimalText.SetText(ModLanguage.ModTr("TEXT_KILL_ANIMAL"));
      Menu.NewKillAuraText.SetText(ModLanguage.ModTr("TEXT_NEW_KILL_AURA"));
      Menu.MobVacuumText.SetText(ModLanguage.ModTr("TEXT_MOB_VACUUM"));
      Menu.VacuumCollectText.SetText(ModLanguage.ModTr("TEXT_VACUUM_COLLECT"));
      Menu.WeatherText.SetText(ModLanguage.ModTr("TEXT_WEATHER"));
      Menu.PlotSkipText.SetText(ModLanguage.ModTr("TEXT_PLOT_SKIP"));

      // esp
      Menu.ESPText.SetText(ModLanguage.ModTr("HEADING_ESP"));
      Menu.ESPShowNameText.SetText(ModLanguage.ModTr("TEXT_SHOW_NAME"));
      Menu.ESPShowDistanceText.SetText(ModLanguage.ModTr("TEXT_SHOW_DISTANCE"));
      Menu.ESPShowBoxText.SetText(ModLanguage.ModTr("TEXT_SHOW_BOX"));
      Menu.ESPMonsterText.SetText(ModLanguage.ModTr("TEXT_MONSTER"));
      Menu.ESPCollectionText.SetText(ModLanguage.ModTr("TEXT_COLLECTION"));
      Menu.ESPTreasureText.SetText(ModLanguage.ModTr("TEXT_TREASURE"));
      Menu.ESPAnimalText.SetText(ModLanguage.ModTr("TEXT_ANIMAL"));
      Menu.ESPPuzzleText.SetText(ModLanguage.ModTr("TEXT_PUZZLE"));
      Menu.ESPCasketText.SetText(ModLanguage.ModTr("TEXT_SONANCE_CASKET"));
      Menu.ESPRockText.SetText(ModLanguage.ModTr("TEXT_ROCK"));
      Menu.ESPMutterflyText.SetText(ModLanguage.ModTr("TEXT_MUTTERFLY"));
      Menu.ESPBlobflyText.SetText(ModLanguage.ModTr("TEXT_BLOBFLY"));

      // visual
      Menu.CustomUidText.SetText(ModLanguage.ModTr("TEXT_CUSTOM_UID"));
      Menu.HideHUDText.SetText(ModLanguage.ModTr("TEXT_HIDE_HUD"));
      Menu.HideDmgText.SetText(ModLanguage.ModTr("TEXT_HIDE_DAMAGE_TEXT"));
      Menu.FPSUnlockerText.SetText(ModLanguage.ModTr("TEXT_FPS_UNLOCKER"));
      Menu.FPSShowText.SetText(ModLanguage.ModTr("TEXT_SHOW_FPS"));
      Menu.FOVText.SetText(ModLanguage.ModTr("TEXT_FOV"));

      // debug
      Menu.DebugEntityText.SetText(ModLanguage.ModTr("TEXT_DEBUG_ENTITY"));
      Menu.ConsoleCommandText.SetText(
        ModLanguage.ModTr("TEXT_CONSOLE_COMMAND")
      );

      Menu.Designer.SetText(ModLanguage.ModTr("TEXT_DESIGNER"));
      Menu.DisclaimerText.SetText(ModLanguage.ModTr("TEXT_DISCLAIMER"));
      Menu.LanguageText.SetText(ModLanguage.ModTr("TEXT_LANGUAGE"));
    }
  }

  static updateMenuState() {
    if (Menu) {
      // player
      Menu.GodModeCheck.SetIsChecked(ModManager.Settings.GodMode);
      Menu.NoCDCheck.SetIsChecked(ModManager.Settings.NoCD);
      Menu.HitMultiplierCheck.SetIsChecked(ModManager.Settings.HitMultiplier);
      Menu.AntiDitherCheck.SetIsChecked(ModManager.Settings.AntiDither);
      Menu.InfiniteStaminaCheck.SetIsChecked(
        ModManager.Settings.InfiniteStamina
      );
      Menu.PlayerSpeedCheck.SetIsChecked(ModManager.Settings.PlayerSpeed);
      Menu.NoClipCheck.SetIsChecked(ModManager.Settings.NoClip);

      // world
      ModManager.Settings.AutoPickTreasure = false;
      Menu.AutoPickTreasureCheck.SetIsChecked(false);
      Menu.KillAuraCheck.SetIsChecked(ModManager.Settings.killAura);
      Menu.AutoLootCheck.SetIsChecked(ModManager.Settings.AutoLoot);
      Menu.KillAnimalCheck.SetIsChecked(ModManager.Settings.KillAnimal);
      Menu.PerceptionRangeCheck.SetIsChecked(
        ModManager.Settings.PerceptionRange
      );
      Menu.AutoDestroyCheck.SetIsChecked(ModManager.Settings.AutoDestroy);
      Menu.NewAutoAbsorbCheck.SetIsChecked(ModManager.Settings.AutoAbsorbnew);
      Menu.NewKillAuraCheck.SetIsChecked(ModManager.Settings.killAuranew);
      Menu.WorldSpeedCheck.SetIsChecked(ModManager.Settings.WorldSpeed);
      Menu.MobVacuumCheck.SetIsChecked(ModManager.Settings.MobVacuum);
      Menu.VacuumCollectCheck.SetIsChecked(ModManager.Settings.VacuumCollect);
      Menu.VacuumCollectCheck.SetIsChecked(ModManager.Settings.VacuumCollect);
      Menu.WeatherCheck.SetIsChecked(ModManager.Settings.WeatherChanger);
      Menu.PlotSkipCheck.SetIsChecked(ModManager.Settings.PlotSkip);

      // visual
      Menu.HideHUDCheck.SetIsChecked(ModManager.Settings.HideHUD);
      Menu.HideDmgCheck.SetIsChecked(ModManager.Settings.HideDmgUi);
      Menu.FPSUnlockerCheck.SetIsChecked(ModManager.Settings.FPSUnlocker);
      Menu.FPSShowCheck.SetIsChecked(ModManager.Settings.ShowFPS);
      Menu.FOVCheck.SetIsChecked(ModManager.Settings.FOV);

      // teleport
      Menu.MarkTPCheck.SetIsChecked(ModManager.Settings.MarkTp);

      // esp
      Menu.ESPCheck.SetIsChecked(ModManager.Settings.ESP);
      Menu.ESPShowNameCheck.SetIsChecked(ModManager.Settings.ShowName);
      Menu.ESPShowDistanceCheck.SetIsChecked(ModManager.Settings.ShowDistance);
      Menu.ESPShowBoxCheck.SetIsChecked(ModManager.Settings.ShowBox);
      Menu.ESPMonsterCheck.SetIsChecked(ModManager.Settings.ShowMonster);
      Menu.ESPCollectionCheck.SetIsChecked(ModManager.Settings.ShowCollect);
      Menu.ESPTreasureCheck.SetIsChecked(ModManager.Settings.ShowTreasure);
      Menu.ESPAnimalCheck.SetIsChecked(ModManager.Settings.ShowAnimal);
      Menu.ESPPuzzleCheck.SetIsChecked(ModManager.Settings.ShowPuzzle);
      Menu.ESPCasketCheck.SetIsChecked(ModManager.Settings.ShowCasket);
      Menu.ESPRockCheck.SetIsChecked(ModManager.Settings.ShowRock);
      Menu.ESPMutterflyCheck.SetIsChecked(ModManager.Settings.ShowMutterfly);
      Menu.ESPBlobflyCheck.SetIsChecked(ModManager.Settings.ShowBlobfly);

      // debug
      Menu.DebugEntityCheck.SetIsChecked(ModManager.Settings.DebugEntity);
    }
  }

  static updatePlayerSpeed() {
    if (ModManager.Settings.PlayerSpeed) {
      EntityManager.SetPlayerSpeed(ModManager.Settings.playerSpeedValue);
    } else {
      EntityManager.SetPlayerSpeed(1);
    }
  }

  static updateWorldSpeed() {
    if (ModManager.Settings.WorldSpeed) {
      ModMethod_1.ModMethod.SetWorldTimeDilation(
        ModManager.Settings.WorldSpeedValue
      );
    } else {
      ModMethod_1.ModMethod.SetWorldTimeDilation(1);
    }
  }

  static killAura() {
    return [
      ModLanguage.ModTr("TEXT_ONLY_HATE"),
      ModLanguage.ModTr("TEXT_INFINITY"),
    ];
  }

  static WeatherValue() {
    return [
      ModLanguage.ModTr("TEXT_SUNNY"),
      ModLanguage.ModTr("TEXT_CLOUDY"),
      ModLanguage.ModTr("TEXT_THUNDER_RAIN"),
      ModLanguage.ModTr("TEXT_SNOW"),
      ModLanguage.ModTr("TEXT_RAIN"),
    ];
  }

  static ESPDrawBoxEntities(
    sizeX,
    sizeY,
    posX = 1,
    posY = 1,
    name = "Unknown",
    color
  ) {
    MainMenu.AddChild(sizeX, sizeY, posX, posY, name, color);
  }

  static ClearChild() {
    return MainMenu.ESPCanvas.Canvas.ClearChildren();
  }

  static RemoveChild(Slot) {
    return MainMenu.ESPCanvas.Canvas.RemoveChild(Slot.Content);
  }

  static AddChild(SizeX, SizeY, PosX, PosY, name, color) {
    const NewText = new UE.TextBlock();
    NewText.SetText(name);
    NewText.SetColorAndOpacity(new UE.SlateColor(color));
    NewText.Font.Size = 16;
    const NewBorder = new UE.Border();
    const Brush = new UE.SlateBrush();
    Brush.TintColor = new UE.SlateColor(color);
    Brush.DrawAs = 2;
    Brush.ImageType = 0;
    Brush.Margin = { Left: 1, Top: 1, Right: 1, Bottom: 1 };
    NewBorder.SetBrush(Brush);
    const Text = MainMenu.ESPCanvas.Canvas.AddChild(NewText);
    // set text position to left top
    Text.SetSize(new UE.Vector2D(SizeX, SizeY));
    Text.SetPosition(new UE.Vector2D(PosX, PosY - 30));
    Text.SetAlignment(new UE.Vector2D(0.5, 0.6));
    let Border;
    if (ModManager.Settings.ShowBox) {
      Border = MainMenu.ESPCanvas.Canvas.AddChild(NewBorder);
      Border.SetSize(new UE.Vector2D(SizeX, SizeY));
      Border.SetPosition(new UE.Vector2D(PosX, PosY));
      Border.SetAlignment(new UE.Vector2D(0.5, 0.5));
    }
    setTimeout(() => {
      if (Border) {
        MainMenu.RemoveChild(Border);
      }
      MainMenu.RemoveChild(Text);
    }, ESP_INTERVAL);
  }
}
class ModEntityListener {
  static Runtime() {
    if (!ModManager.Settings.DebugEntity) return;
    if (!ModUtils.isInGame()) return;

    //EntityManager.PushEntityList();
    const entitylist =
      ModelManager_1.ModelManager.CreatureModel.GetAllEntities();
    const count = entitylist.length;
    for (let i = 0; i < count; i++) {
      AutoAbsorb_1.AutoAbsorb.AutoAbsorb(entitylist[i]);
      KillAura_1.KillAura.killAura(entitylist[i]);
      KillAura_1.KillAura.KillAnimal(entitylist[i]);
      AutoDestroy_1.AutoDestroy.AutoDestroy(entitylist[i]);
      MobVacuum_1.MobVacuum.VacuumCollect(entitylist[i]);
      MobVacuum_1.MobVacuum.MobVacuum(entitylist[i]);

      //AutoChest_1.AutoChest.RewardChest(entitylist[i]); //1.0.28 cant use
    }

    //puerts_1.logger.warn("kun:Runtime is working");
  }
}
class ESPmain {
  static ProjectWorldToScreen(Vector, FixViewport = true) {
    try {
      const Location = new UE.Vector(Vector.X, Vector.Y, Vector.Z);
      const PlayerController = UE.GameplayStatics.GetPlayerController(
        GlobalData_1.GlobalData.World,
        0
      );
      let ScreenPosition = puerts_1.$ref(undefined);
      if (
        PlayerController.ProjectWorldLocationToScreen(
          Location,
          ScreenPosition,
          false
        )
      ) {
        puerts_1.$unref(ScreenPosition);
      }
      ScreenPosition = ScreenPosition[0];
      if (FixViewport) {
        let ViewportPosition = puerts_1.$ref(undefined);
        if (
          UE.SlateBlueprintLibrary.ScreenToViewport(
            GlobalData_1.GlobalData.World,
            ScreenPosition,
            ViewportPosition
          )
        ) {
          puerts_1.$unref(ViewportPosition);
        }
        ViewportPosition = ViewportPosition[0];
        ScreenPosition = new UE.Vector2D(
          ViewportPosition.X,
          ViewportPosition.Y
        );
      }
      return ScreenPosition;
    } catch (e) {
      return null;
    }
  }
  static EntityFilter = {
    mutterfly: ["Gameplay111"],
  };
  //esp测试test
  static RuntimeESP() {
    if (!ModUtils.isInGame()) return;
    if (!ModManager.Settings.ESP) return;
    const entitylist =
      ModelManager_1.ModelManager.CreatureModel.GetAllEntities();
    const count = entitylist.length;
    let i = 0;
    while (i < count) {
      let Component,
        Location,
        Bounds,
        ScreenPos,
        Text = "",
        Color,
        ShowBox,
        Entity = entitylist[i];
      i++;
      if (!Entity) continue;

      const Blueprint = EntityManager.GetBlueprintType2(Entity);

      const isMutterfly = ["Gameplay111"].includes(Blueprint);
      const isCasket = ["Gameplay021"].includes(Blueprint);
      const isRock = ["Gameplay003", "Gameplay537", "Gameplay004", "Gameplay016"].includes(Blueprint);
      const isBlobfly = ["Animal032"].includes(Blueprint);

      // Remove entity that have _ in blueprint
      if (Blueprint.includes("_")) {
        continue;
      }

      if (EntityManager.isMonster(Entity)) {
        // Monster
        Color = MainMenu.ESPColor.red;
        if (!ModManager.Settings.ShowMonster) continue;
      } else if (EntityManager.isAnimal(Entity)) {
        // Animal including Blobfly LOL
        if (isBlobfly) {
          // Blobfly
          Color = MainMenu.ESPColor.blue;
          if (!ModManager.Settings.ShowBlobfly) continue;
        } else {
          // Other Animal
          Color = MainMenu.ESPColor.orange;
        if (!ModManager.Settings.ShowAnimal) continue;
        }
      } else if (EntityManager.isCollection(Entity)) {
        // Collection
        Color = MainMenu.ESPColor.green;
        if (!ModManager.Settings.ShowCollect) continue;
      } else if (EntityManager.isTreasure(Entity)) {
        // Treasure
        Color = MainMenu.ESPColor.purple;
        if (!ModManager.Settings.ShowTreasure) continue;
      } else if (EntityManager.isGameplay(Entity)) {
        // Gameplay like Puzzle, Game, Sonance Casket ETC
        if (isCasket) {
          Color = MainMenu.ESPColor.yellow;
          if (!ModManager.Settings.ShowCasket) continue;
        } else if (isMutterfly) {
          Color = MainMenu.ESPColor.yellow;
          if (!ModManager.Settings.ShowMutterfly) continue;
        } else if (isRock) {
          Color = MainMenu.ESPColor.white;
          if (!ModManager.Settings.ShowRock) continue;
        } else {
          // Other Puzzle
          if (!BluePrintType.translate.find((t) => t.BluePrint == Blueprint)) continue; // remove unused Gameplay
          Color = MainMenu.ESPColor.pink;
          if (!ModManager.Settings.ShowPuzzle) continue;
        }
      } else {
        continue;
      }

      let TextShow = [];

      if ((Component = Entity.Entity.GetComponent(1))) {
        try {
          Location = Component.Actor.K2_GetActorLocation();
        } catch (error) {
          try {
            Location = Component.ActorInternal.K2_GetActorLocation();
          } catch (error) {
            continue;
          }
        }
      } else continue;

      let PlayerLocation = EntityManager_1.EntityManager.GetPlayerPos();
      let Distance = UE.KismetMathLibrary.Vector_Distance(
        PlayerLocation,
        Location
      );
      Distance = Math.floor(Distance / 100);
      if (Distance > ModManager.Settings.ESPRadius) {
        continue;
      }

      ScreenPos = ESPmain.ProjectWorldToScreen(Location);

      if (ScreenPos.X < 0 && ScreenPos.Y < 0) {
        continue;
      }

      // ShowBox = { X: Bounds.BoxExtent.X + Bounds.SphereRadius, Y: Bounds.BoxExtent.Y + Bounds.SphereRadius };

      if (ModManager.Settings.ShowType) {
        TextShow.push(Blueprint);
      }
      if (ModManager.Settings.ShowEntityId) {
        //debug
        let id = Entity.Entity.Id;
        TextShow.push(id);
      }
      if (ModManager.Settings.ShowName) {
        let Name = BluePrintType_1.BluePrintType.ModTr(Blueprint);
        TextShow.push(Name);
      }

      if (ModManager.Settings.ShowDistance) {
        TextShow.push(Distance.toString() + "m");
      }

      if (TextShow.length > 0) {
        Text = TextShow.join(" | ");
      }

      ScreenPos = ESPmain.ProjectWorldToScreen(Location);

      if (ScreenPos.X < 0 || ScreenPos.Y < 0) {
        continue;
      }
      if (ModManager.Settings.ShowBox) {
        try {
          Bounds = Component.Actor.Mesh.Bounds;
        } catch (error) {
          try {
            Bounds = Component.ActorInternal.DetectSphere.Bounds;
          } catch (error) {
            try {
              Bounds = Component.ActorInternal.StaticMesh.Bounds;
            } catch (error) {
              continue;
            }
          }
        }
      }
      if (Bounds) {
        let Corners = [
          new UE.Vector(
            Bounds.Origin.X + Bounds.BoxExtent.X,
            Bounds.Origin.Y + Bounds.BoxExtent.Y,
            Bounds.Origin.Z + Bounds.BoxExtent.Z
          ),
          new UE.Vector(
            Bounds.Origin.X + Bounds.BoxExtent.X,
            Bounds.Origin.Y + Bounds.BoxExtent.Y,
            Bounds.Origin.Z - Bounds.BoxExtent.Z
          ),
          new UE.Vector(
            Bounds.Origin.X + Bounds.BoxExtent.X,
            Bounds.Origin.Y - Bounds.BoxExtent.Y,
            Bounds.Origin.Z + Bounds.BoxExtent.Z
          ),
          new UE.Vector(
            Bounds.Origin.X + Bounds.BoxExtent.X,
            Bounds.Origin.Y - Bounds.BoxExtent.Y,
            Bounds.Origin.Z - Bounds.BoxExtent.Z
          ),
          new UE.Vector(
            Bounds.Origin.X - Bounds.BoxExtent.X,
            Bounds.Origin.Y + Bounds.BoxExtent.Y,
            Bounds.Origin.Z + Bounds.BoxExtent.Z
          ),
          new UE.Vector(
            Bounds.Origin.X - Bounds.BoxExtent.X,
            Bounds.Origin.Y + Bounds.BoxExtent.Y,
            Bounds.Origin.Z - Bounds.BoxExtent.Z
          ),
          new UE.Vector(
            Bounds.Origin.X - Bounds.BoxExtent.X,
            Bounds.Origin.Y - Bounds.BoxExtent.Y,
            Bounds.Origin.Z + Bounds.BoxExtent.Z
          ),
          new UE.Vector(
            Bounds.Origin.X - Bounds.BoxExtent.X,
            Bounds.Origin.Y - Bounds.BoxExtent.Y,
            Bounds.Origin.Z - Bounds.BoxExtent.Z
          ),
        ];

        let ScreenCorners = Corners.map((C) =>
          ESPmain.ProjectWorldToScreen(C, false)
        );

        let minX = Math.min(...ScreenCorners.map((p) => p.X));
        let maxX = Math.max(...ScreenCorners.map((p) => p.X));
        let minY = Math.min(...ScreenCorners.map((p) => p.Y));
        let maxY = Math.max(...ScreenCorners.map((p) => p.Y));

        ShowBox = {
          X: maxX - minX + Bounds.SphereRadius,
          Y: maxY - minY + Bounds.SphereRadius,
        };
      } else {
        ShowBox = {
          X: 0,
          Y: 0,
        };
      }

      MainMenu.ESPDrawBoxEntities(
        ShowBox.X,
        ShowBox.Y,
        ScreenPos.X,
        ScreenPos.Y,
        Text,
        Color
      );
    }
  }
}

loadMenuInterval = setInterval(MainMenu.Start, 3000);
setInterval(MainMenu.ListenKey, 1);
setInterval(ModEntityListener.Runtime, 3000);
setInterval(ESPmain.RuntimeESP, ESP_INTERVAL);
main();

exports.ESPmain = ESPmain;
exports.MainMenu = MainMenu;
exports.ModEntityListener = ModEntityListener;
//# sourceMappingURL=Main.js.map

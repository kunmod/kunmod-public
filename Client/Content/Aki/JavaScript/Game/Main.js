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
  ModManager_1 = require("./Manager/ModManager"),
  ModLanguage_1 = require("./Manager/ModFuncs/ModLanguage"),
  UiManager_1 = require("./Ui/UiManager");

const ModManager = ModManager_1.ModManager,
  ModLanguage = ModLanguage_1.ModLanguage;

let keyState = false,
  Menu = null,
  isMenuLoaded = false,
  isMenuShow = false,
  currentLang = "en",
  loadMenuInterval = null;

function main() {
  var e = puerts_1.argv.getByName("GameInstance");
  GameProcedure_1.GameProcedure.Start(e);
}

class MainMenu {
  static IsKey(str) {
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
      isMenuShow ? Menu.SetVisibility(2) : Menu.SetVisibility(0);
      isMenuShow = !isMenuShow;
    }
    MainMenu.updateMenuState()
  }

  static KunLog(string) {
    var info = string.toString();
    puerts_1.logger.info("[KUNMOD:]" + info);
  }

  static OnTick() {
    if (!isMenuLoaded) {
      currentLang = ModLanguage.GetCurrLang();

      Menu = UE.UMGManager.CreateWidget(
        GlobalData_1.GlobalData.World,
        ResourceSystem_1.ResourceSystem.Load(
          "/Game/Aki/ModMenu.ModMenu_C",
          UE.Class
        )
      );

      if (Menu) {
        try {
          Menu.Yinlin.SetBrushFromTexture(
            ResourceSystem_1.ResourceSystem.Load(
              "/Game/Aki/Yinlin.Yinlin",
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
          Menu.HeadingPlayer.SetText("Player");
          Menu.HeadingWorld.SetText("World");
          Menu.HeadingUI.SetText("UI");
          Menu.GodModeText.SetText(MainMenu.ModText(15));
          Menu.NoCDText.SetText(MainMenu.ModText(21));
          Menu.AutoPickTreasureText.SetText(MainMenu.ModText(17));
          Menu.AutoAbsorbEchoText.SetText(MainMenu.ModText(18));
          Menu.HitMultiplierText.SetText(MainMenu.ModText(16));
          Menu.KillAuraText.SetText(MainMenu.ModText(19));
          Menu.AntiDitherText.SetText(MainMenu.ModText(33));
          Menu.InfiniteStaminaText.SetText("Infinite Stamina");
          Menu.AutoLootText.SetText(MainMenu.ModText(24));
          Menu.PerceptionRangeText.SetText(MainMenu.ModText(20));
          Menu.PlayerSpeedText.SetText(MainMenu.ModText(22));
          Menu.CustomUidText.SetText("Custom UID");
          Menu.HideHUDText.SetText("Hide HUD");
          Menu.HideDmgText.SetText("Hide Damage Text");
          Menu.MarkTPText.SetText("Mark TP");

          Menu.GodModeCheck.OnCheckStateChanged.Add((isChecked) => {
            ModManager.Settings.GodMode = isChecked;
            MainMenu.KunLog("God Mode: " + isChecked);
          });

          Menu.NoCDCheck.OnCheckStateChanged.Add((isChecked) => {
            ModManager.Settings.NoCD = isChecked;
            MainMenu.KunLog("No Cooldown: " + isChecked);
          });

          Menu.AutoPickTreasureCheck.OnCheckStateChanged.Add((isChecked) => {
            ModManager.Settings.AutoPickTreasure = isChecked;
            MainMenu.KunLog("Auto Pick Treasure: " + isChecked);
          });

          Menu.AutoAbsorbEchoCheck.OnCheckStateChanged.Add((isChecked) => {
            ModManager.Settings.AutoAbsorb = isChecked;
            MainMenu.KunLog("Auto Absorb: " + isChecked);
          });

          Menu.HitMultiplierCheck.OnCheckStateChanged.Add((isChecked) => {
            ModManager.Settings.HitMultiplier = isChecked;
            MainMenu.KunLog("Hit Multiplier: " + isChecked);
          });

          Menu.HitMultiplierCount.OnTextChanged.Add((value) => {
            value = Number(value);
            if (typeof value === "number") {
              ModManager.Settings.Hitcount = value;
              MainMenu.KunLog("Hit Multiplier Count: " + value);
            } else {
              ModManager.Settings.Hitcount = 1;
            }
          });

          Menu.KillAuraCheck.OnCheckStateChanged.Add((isChecked) => {
            ModManager.Settings.killAura = isChecked;
            MainMenu.KunLog("Kill Aura: " + isChecked);
          });

          for (const option in MainMenu.killAura()) {
            Menu.KillAuraValue.AddOption(option);
          }

          Menu.KillAuraValue.OnSelectionChanged.Add((selectedItem) => {
            if (selectedItem) {
              ModManager.Settings.KillAuraValue =
                MainMenu.killAura().indexOf(selectedItem);
              MainMenu.KunLog("Kill Aura Value: " + selectedItem);
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

          Menu.PerceptionRangeCheck.OnCheckStateChanged.Add((isChecked) => {
            ModManager.Settings.PerceptionRange = isChecked;
            MainMenu.KunLog("Perception Range: " + isChecked);
          });

          Menu.PlayerSpeedCheck.OnCheckStateChanged.Add((isChecked) => {
            ModManager.Settings.PlayerSpeed = isChecked;
            MainMenu.KunLog("Player Speed: " + isChecked);
            MainMenu.updatePlayerSpeed();
          });

          Menu.PlayerSpeedValue.OnTextChanged.Add((value) => {
            value = Number(value);
            if (typeof value === "number") {
              ModManager.Settings.playerSpeedValue = value;
            } else {
              value = 1
              ModManager.Settings.playerSpeedValue = value;
            }
            MainMenu.updatePlayerSpeed();
            MainMenu.KunLog("Player Speed Value: " + value);
          });

          Menu.CustomUidSubmit.OnClicked.Add(() => {
            const UID = Menu.CustomUidValue.GetText()
            ModManager.ChangeUid(UID);
            MainMenu.KunLog("UID Changed: " + UID);
          });

          Menu.HideHUDCheck.OnCheckStateChanged.Add((isChecked) => {
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

          Menu.AutoMineCheck.OnCheckStateChanged.Add((isChecked) => {
            ModManager.Settings.AutoMine = isChecked;
            MainMenu.KunLog("Auto Mine: " + isChecked);
          });
        } catch (e) {
          MainMenu.KunLog(e);
        }

        Menu.AddToViewport();
        Menu.SetVisibility(0);
        isMenuLoaded = true;
        MainMenu.KunLog("KUN-MOD Menu Loaded!");
        clearInterval(loadMenuInterval);
      }
    }
  }

  static updateMenuState() {
    Menu.GodModeCheck.SetIsChecked(ModManager.Settings.GodMode);
    Menu.AutoPickTreasureCheck.SetIsChecked(
      ModManager.Settings.AutoPickTreasure
    );
    Menu.AutoAbsorbEchoCheck.SetIsChecked(ModManager.Settings.AutoAbsorb);
    Menu.HitMultiplierCheck.SetIsChecked(ModManager.Settings.HitMultiplier);
    Menu.HitMultiplierCount.SetText(ModManager.Settings.Hitcount);
    Menu.KillAuraCheck.SetIsChecked(ModManager.Settings.killAura);
    Menu.AntiDitherCheck.SetIsChecked(ModManager.Settings.AntiDither);
    Menu.InfiniteStaminaCheck.SetIsChecked(ModManager.Settings.InfiniteStamina);
    Menu.AutoLootCheck.SetIsChecked(ModManager.Settings.AutoLoot);
    Menu.PerceptionRangeCheck.SetIsChecked(ModManager.Settings.PerceptionRange);
    Menu.PlayerSpeedCheck.SetIsChecked(ModManager.Settings.PlayerSpeed);
    Menu.PlayerSpeedValue.SetText(ModManager.Settings.playerSpeedValue);
    Menu.HideHUDCheck.SetIsChecked(ModManager.Settings.HideHUD);
    Menu.HideDmgCheck.SetIsChecked(ModManager.Settings.HideDmgUi);
    Menu.CustomUidValue.SetText(ModManager.Settings.Uid);
    Menu.KillAuraValue.SetSelectedIndex(MainMenu.killAura()[ModManager.Settings.killAuraState]);
    Menu.AutoMineCheck.SetIsChecked(ModManager.Settings.AutoMine);
  }

  static updatePlayerSpeed() {
    if (ModManager.Settings.PlayerSpeed) {
      ModManager.SetPlayerSpeed(ModManager.Settings.playerSpeedValue);
    } else {
      ModManager.SetPlayerSpeed(1);
    }
  }

  static ModText(id) {
    var text = ModLanguage.ModTr(ModLanguage.translate[id].en);
    return text;
  }

  static killAura() {
    const lang = currentLang;

    switch (lang) {
      case "en":
        return ["Only Hatred", "Infinity"];
        break;
      case "zh-CN":
        return ["Only Hatred", "Infinity"];
        break;
      case "ja":
        return ["Only Hatred", "Infinity"];
        break;
      default:
        return ["Only Hatred", "Infinity"];
    }
  }
}

loadMenuInterval = setInterval(MainMenu.OnTick, 3000);
setInterval(MainMenu.ListenKey, 1);
main();

exports.MainMenu = MainMenu;
//# sourceMappingURL=Main.js.map

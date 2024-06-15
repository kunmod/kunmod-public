"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
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
WeatherController_1 = require("../Module/Weather/WeatherController"),
WorldDebugModel_1 = require("../World/Model/WorldDebugModel"), //
ModCustomTp_1 = require("./ModFuncs/ModCustomTp"),
ModUtils_1 = require("./ModFuncs/ModUtils"),
ModDebuger_1 = require("./ModFuncs/ModDebuger"),
MainMenu_1 = require("../Main");

const ModLanguage_1 = require("./ModFuncs/ModLanguage");
const ModTr = ModLanguage_1.ModLanguage.ModTr;
class ModManager {
    static Settings = {
        ModEnabled: true,
        GodMode: true,
        HitMultiplier: false,
        Hitcount: 15,
        AutoPickTreasure: false,
        AntiDither: true,
        AutoAbsorb: false,
        NoCD: false,
        InfiniteStamina: false,
        killAura: false,
        killAuraState: 0,    //0 Only Hatred  1 Infinity
        PerceptionRange: false,
        Weather: false,
        WeatherType: 1,
        MarkTp: false,
        MarkX:0,
        MarkY:0,
        MarkZ:0,
        MarkTpPosZ: 300,
        CustomTp: false,
        playerSpeedValue: 3,
        PlayerSpeed: false,
        ShowMenu: false,
        AutoLoot: false,
        HideHUD: false,
        HideDmgUi: false,
        AutoMine: false,
        //test
        DebugEntity:true,
        AutoDestroy:true,
        killAuranew:true,
        killAuraRadius:300,
        AutoAbsorbnew:true,
        Uid: "100000000",
    };

    static ModStart() {
        ModDebuger_1.ModDebuger.TestMethod();
        ModLanguage_1.ModLanguage.GetCurrLang();
        this.AddKey("ShowMenu", "Home");
        this.AddToggle("GodMode", "F5");
        this.AddToggle("HitMultiplier", "F6");
        this.AddToggle("AutoPickTreasure", "F7");
        this.AddToggle("AutoAbsorb", "F8");
        this.AddToggle("killAura", "F9");
        this.AddToggle("PerceptionRange", "F10");
        this.AddToggle("NoCD", "F11");
        this.AddToggle("PlayerSpeed", "F12");
        this.AddToggle("CustomTp", "Insert");
        this.AddToggle("AutoLoot", "NumPadZero");
        this.AddToggle("AutoMine", "NumPadOne");
        this.AddKey("MarkTp", "t");

    }

    static listenModsToggle() {
        // if (this.listenKey("ShowMenu", "Home")) {
        //     this.ShowMenu();
        // }

        this.listenMod('GodMode', "F5", "GodMode");
        if (this.listenMod('HitMultiplier', "F6", "HitMultiplier")) {
            if (this.Settings.HitMultiplier) {
                ModUtils_1.ModUtils.KuroSingleInputBox({
                    title: ModTr("HitMultiplier:Please enter hit count"),
                    customFunc: async(string) => {
                        var count = ModUtils_1.ModUtils.StringToInt(string);
                        if (count !== "error") {
                            this.Settings.Hitcount = count
                        }
                    },
                    inputText: this.Settings.Hitcount.toString(),
                    defaultText: ModTr("Please enter hit count"),
                    isCheckNone: true,
                    needFunctionButton: false
                });

            }

        }
        this.listenMod('AutoPickTreasure', "F7", "AutoPickTreasure");
        this.listenMod('AutoAbsorb', "F8", "AutoAbsorb");
        this.listenMod('killAura', "F9", "killAura");
        this.listenMod('PerceptionRange', "F10", "PerceptionRange");
        this.listenMod('NoCD', "F11", "NoCD");

        if (this.listenMod('PlayerSpeed', "F12", "PlayerSpeed")) {
            if (this.Settings.PlayerSpeed) {
                this.SetPlayerSpeed(3);
            } else {
                this.SetPlayerSpeed(1);
            }
        }
        if (this.listenMod('CustomTp', "Insert", "CustomTp")) {
            if (this.Settings.CustomTp) {
                ModCustomTp_1.ModCustomTp.CustomTpEnable();
            } else {
                ModCustomTp_1.ModCustomTp.CustomTpDisable();
            }
        }
        if (this.Settings.CustomTp) {
            ModCustomTp_1.ModCustomTp.listenAuto();
            ModCustomTp_1.ModCustomTp.listenSelect()
            ModCustomTp_1.ModCustomTp.listenDelay()

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

        this.listenMod('AutoLoot', "NumPadZero", "AutoLoot");
        this.listenMod('AutoMine', "NumPadOne", "AutoMine");
        ModDebuger_1.ModDebuger.EnableDebug();
        if (ModDebuger_1.ModDebuger.Setting.EnableDebug) {
            ModDebuger_1.ModDebuger.ListenDebug();
        }

        if (this.listenKey("MarkTp", "t")) {
            if(this.Settings.MarkTp)
            this.TpNoloadingTo(this.Settings.MarkX*100,this.Settings.MarkY*100,this.Settings.MarkZ*100)
        }

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
        if (this.Settings.hasOwnProperty(func))
            var state = this.Settings[func];
        if (state) {
            info = string + " | " + ModTr("ON");
            this.ShowTip(info);
        } else {
            info = string + " | " + ModTr("OFF");
            this.ShowTip(info);
        }

    }

    static Toggle(func) {
        if (this.Settings.hasOwnProperty(func)) {
            this.Settings[func] = !this.Settings[func];
        }
    }

    static listenMod(func, key, funcname ) {
        if (InputController_1.InputController.IsMyKeyUp(key)) {
            if (this.Settings.hasOwnProperty(func)) {
                this.Settings[func] = !this.Settings[func];
                ModUtils_1.ModUtils.PlayAudio("play_ui_fx_com_count_number");
                this.ShowFuncStateTip(func, funcname)
            }
            return true;
        }
        return false;
    }
    static listenKey(desc, key) {
        var press = InputController_1.InputController.IsMyKeyUp(key)
            if (press) {
                ModUtils_1.ModUtils.PlayAudio("play_ui_fx_com_count_number");
            }
            return press;
    }


    static TpNoloadingTo(x, y, z) {
        TeleportController_1.TeleportController.TeleportToPositionNoLoading(
            new UE.Vector(x, y, z),
            new UE.Rotator(0, 0, 0),
            "comment/message");
    }

    static TpNoloadingTo2(tppos) {
        TeleportController_1.TeleportController.TeleportToPositionNoLoading(
            tppos,
            new UE.Rotator(0, 0, 0),
            "comment/message");
    }

    static MonsterBoom(entity, Delay) {
        CreatureController_1.CreatureController.MonsterBoomRequest(entity, Delay);
    }

    static ChangWeather(weatherID) {
        WeatherController_1.WeatherController.TestChangeWeather(weatherID);

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
        if (func)
            return string + ModTr(" : <color=green>ON</color> |");
        else
            return string + ModTr(" : <color=red>OFF</color> |");
    }
    static ShowMenu() {

        var newBox = new ConfirmBoxDefine_1.ConfirmBoxDataNew(50);
        var state =
            this.FuncState(this.Settings.GodMode, ModTr("GodMode[F5]")) +
            this.FuncState(this.Settings.HitMultiplier, ModTr("HitMultiplier[F6]")) +
            this.FuncState(this.Settings.AutoPickTreasure, ModTr("AutoPickTreasure[F7]")) +
            this.FuncState(this.Settings.AutoAbsorb, ModTr("AutoAbsorb[F8]")) +
            this.FuncState(this.Settings.killAura, ModTr("killAura[F9]")) +
            this.FuncState(this.Settings.PerceptionRange, ModTr("PerceptionRange[F10]")) +
            this.FuncState(this.Settings.NoCD, ModTr("NoCD[F11]")) +
            this.FuncState(this.Settings.PlayerSpeed, ModTr("PlayerSpeed[F12]")) +

            this.FuncState(this.Settings.CustomTp, ModTr("CustomTp[Ins]")) +
            this.FuncState(this.Settings.AutoLoot, ModTr("AutoLoot[Num0]")) +
            this.FuncState(this.Settings.AntiDither, ModTr("AntiDither"))

            newBox.SetTextArgs(state);
        newBox.SetTitle(ModTr("KunMods State[Home] DisableAntiCheat : <color=green>ON</color> "));
        ConfirmBoxController_1.ConfirmBoxController.ShowConfirmBoxNew(newBox);
    }

    static GetEntityList() {
        return ModelManager_1.ModelManager.CreatureModel.GetAllEntities();
    }

    static SpawnEntity() {}

    static SetPlayerSpeed(value) {
        CharacterController_1.CharacterController.SetTimeDilation(value);
    }

    static ChangeUid(string) {
        this.Settings.Uid = string;
        UiManager_1.UiManager.CloseView("UidView");
        UiManager_1.UiManager.OpenView("UidView");
    }
    static TrackTP() {//mark
        var r = ModelManager_1.ModelManager.MapModel.GetCurTrackMark();
        puerts_1.logger.Debug("[kunmod:]Marktp:", r);
        var i = ModelManager_1.ModelManager.MapModel.GetMark(r[0], r[1]);
        puerts_1.logger.Debug("[kunmod:]Marktp:", i.TrackTarget);
        var targetX = i.TrackTarget.X;
        var targetY = i.TrackTarget.Y;
        var posZ = 0;
        var v = MapController_1.MapController.GetMarkPosition(targetX, targetY);
        puerts_1.logger.info("[kunmod:]Marktp:", v);
        if (v.Z == 0) {
            posZ = this.Settings.MarkTpPosZ;
        } else {
            posZ = v.Z
        };

        this.TeleportToPositionNoLoading(targetX, targetY, posZ);
        ModUtils_1.ModUtils.KunLog("MarkTp:go to (" + targetX.toString() + "," + targetY.toString() + "," + posZ.toString());

    }

    

}
exports.ModManager = ModManager;

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ModLanguage = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  ModManager_1 = require("../ModManager"),
  LanguageSystem_1 = require("../../../Core/Common/LanguageSystem");
var CurrLang = "en";
class ModLanguage {
  // new (exports.LanguageDefine = LanguageDefine)(0, "zh-Hans", "zh"),
  // new LanguageDefine(1, "en", "en"),
  // new LanguageDefine(2, "ja", "ja"),
  // new LanguageDefine(3, "ko", "ko"),
  // new LanguageDefine(4, "ru", "en"),
  // new LanguageDefine(5, "zh-Hant", "zh"),
  // new LanguageDefine(6, "de", "en"),
  // new LanguageDefine(7, "es", "en"),
  // new LanguageDefine(8, "pt", "en"),
  // new LanguageDefine(9, "id", "en"),
  // new LanguageDefine(10, "fr", "en"),
  // new LanguageDefine(11, "vi", "en"),
  // new LanguageDefine(12, "th", "en"),
  static GetCurrLang() {
    CurrLang = LanguageSystem_1.LanguageSystem.PackageLanguage;
    return CurrLang;
  }
  static Langs = ["en", "zh-Hans", "ja"];

  static translate = [
    {
      en: "HitMultiplier[F6]",
      chs: "多倍攻击[F6]",
      ja: "ヒット倍率[F6]",
    },
    {
      en: "GodMode[F5]",
      chs: "无敌模式[F5]",
      ja:"神モードやで[F5]",
    },
    {
      en: "AutoPickTreasure[F7]",
      chs: "拾取宝箱[F7]",
      ja: "自動で宝を拾うんや[F7]",
    },
    {
      en: "AutoAbsorb[F8]",
      chs: "自动吸收[F8]",
      ja:"自動で吸収すんや",
    },
    {
      en: "killAura[F9]",
      chs: "杀戮光环[F9]",
      ja:"キルオーラやで[F9]",
    },
    {
      en: "PerceptionRange[F10]",
      chs: "感知范围[F10]",
      ja: "感知範囲やで[F10]",
    },
    {
      en: "NoCD[F11]",
      chs: "无冷却[F11]",
      ja: "クールダウンなしやで[F11]",
    },
    {
      en: "PlayerSpeed[F12]",
      chs: "玩家速度[F12]",
      ja: "プレイヤーのスピードやで[F12]",
    },
    {
      en: "CustomTp[Ins]",
      chs: "自定义传送[Ins]",
      ja: "てきとうな瞬間移動[Ins]",
    },
    {
      en: "AutoLoot[Num0]",
      chs: "自动拾取[Num0]",
      ja: "自動あっぷる[Num0]",
    },
    {
      en: "KunMods State[Home] DisableAntiCheat : <color=green>ON</color> ",
      chs: "坤模组状态[Home] 安全保护 : <color=green>开启</color> ",
      ja: "KunMods 状態[Home] アンチチート無効化 : <color=green>オン</color>",
    },
    {
      en: " : <color=green>ON</color> |",
      chs: " : <color=green>开启</color> |",
      ja: "<color=green>オン</color>",
    },
    {
      en: " : <color=red>OFF</color> |",
      chs: " : <color=red>关闭</color> |",
      ja: "<color=red>オフ</color>",
    },
    {
      en: "ON",
      chs: "开启",
      ja: "オン",
    },
    {
      en: "OFF",
      chs: "关闭",
      ja: "オフ",
    },
    {
      en: "God Mode [F5]",
      chs: "无敌模式[F5]",
      ja: "神モードやで[F5]",
    },
    {
      en: "Hit Multiplier [F6]",
      chs: "多倍攻击[F6]",
      ja: "ヒット倍率[F6]",
    },
    {
      en: "Auto Pick Treasure [F7]",
      chs: "拾取宝箱[F7]",
      ja: "自動で宝を拾うんや[F7]",
    },
    {
      en: "Auto Absorb [F8]",
      chs: "自动吸收[F8]",
      ja: "自動で吸収すんや[F8]",
    },
    {
      en: "Kill Aura [F9]",
      chs: "杀戮光环[F9]",
      ja: "キルオーラやで[F9]",
    },
    {
      en: "Perception Range [F10]",
      chs: "感知范围[F10]",
      ja: "感知範囲やで[F10]",
    },
    {
      en: "No Cooldown [F11]",
      chs: "无冷却[F11]",
      ja: "クールダウンなしやで[F11]",
    },
    {
      en: "Player Speed [F12]",
      chs: "玩家速度[F12]",
      ja: "プレイヤーのスピードやで[F12]",
    },
    {
      en: "Custom Teleport [INS]",
      chs: "自定义传送[INS]",
      ja: "てきとうな瞬間移動[INS]",
    },
    {
      en: "Auto Loot [Num0]",
      chs: "自动拾取[Num0]",
      ja: "自動あっぷる[Num0]",
    },
    {
      en: "Custom Teleport State [Insert]:",
      chs: "自定义传送状态[Insert]:",
      ja: "カスタムテレポートの状態[Insert]",
    },
    {
      en: " Show [Del]",
      chs: " 显示[Del]",
      ja: " ショー[Del]",
    },
    {
      en: "Current File:",
      chs: "当前文件:",
      ja: "今のファイル",
    },
    {
      en: "| PreviousFile[PageUp]:",
      chs: "| 上一个文件[PageUp]:",
      ja: "| 前のファイル[PageUp]",
    },
    {
      en: " | NextFile[PageDown]:",
      chs: " | 下一个文件[PageDown]:",
      ja: " | つぎのファイル[PageDown]",
    },
    {
      en: " | PreviousPos[Up]:",
      chs: " | 上一个位置[Up]:",
      ja: " |前のポジション[Up]",
    },
    {
      en: " | NextPos[Down]:",
      chs: " | 下一个位置[Down]:",
      ja: " |つぎのポジション[Down]",
    },
    {
      en: "Anti Dither",
      chs: "反虚化",
      ja: "アンチディザ",
    },
    {
      en: "Anti Dither",
      chs: "反虚化",
      ja: "アンチディザ",
    },
    {
      en: "Please enter hit count",
      chs: "请输入攻击次数",
      ja: "ヒット数入れてや",
    },
    {
      en: "HitMultiplier:Please enter hit count",
      chs: "倍数攻击：请输入攻击次数",
      ja: "ヒットの倍率や：ヒット数入れてや",
    },
    {
      en: " | SetDelay[Left]: ",
      chs: " | 延迟[Left]: ",
      ja: " | SetDelay[Left]: ",
    },
    {
      en: " | Select[Right]: ",
      chs: " | 选择pos[Right]: ",
      ja: " | Select[Right]: ",
    },
    {
      en: "is the last file",
      chs: "这是最后一个文件",
      ja: "is the last file",
    },
    {
      en: "is the first file",
      chs: "这是第一个文件",
      ja: "is the first file",
    },
    {
      en: "is the last pos",
      chs: "这是最后一个点位",
      ja: "is the last pos",
    },
    {
      en: "is the first pos",
      chs: "这是第一个点位",
      ja: "is the first pos",
    },
    {
      en: "CustomTp:AutoMode:Set Delay",
      chs: "自定义传送:自动模式:设置延迟",
      ja: "CustomTp:AutoMode:Set Delay",
    },
    {
      en: "Please enter Delay(s)",
      chs: "请输入延迟(秒)",
      ja: "Please enter Delay(s)",
    },
    {
      en: "Remaining time",
      chs: "下一次传送还有",
      ja: "Remaining time",
    },
    {
      en: "seconds",
      chs: "秒",
      ja: "seconds",
    },
    {
      en: "Go",
      chs: "出发",
      ja: "Go",
    },
    {
      en: "AutoMode",
      chs: "自动模式",
      ja: "AutoMode",
    },
    {
      en: "CustomTp:CurrPos:Select",
      chs: "自定义传送:当前序号:选择",
      ja: "CustomTp:CurrPos:Select",
    },
    {
      en: "Please enter CurreNum",
      chs: "请输入当前序号",
      ja: "Please enter CurreNum",
    },
    {
      en: " | AutoMode[End]: ",
      chs: " | 自动模式[End]: ",
      ja: " | AutoMode[End]: ",
    },
    {
      en: "Infinite Stamina",
      chs: "无限体力",
      ja: "無限のスタミナ",
    },
    {
      en: "Custom UID",
      chs: "自定义UID",
      ja: "カスタムUID",
    },
    {
      en: "Player",
      chs: "玩家",
      ja: "プレーヤー"
    },
    {
      en: "World",
      chs: "世界",
      ja: "世界"
    },
    {
      en: "UI",
      chs: "用户界面",
      ja: "インターフェース"
    },
    {
      en: "Hide HUD",
      chs: "隐藏HUD",
      ja: "HUDを非表示"
    },
    {
      en: "Hide Damage Text",
      chs: "隐藏伤害文字",
      ja: "ダメージテキストを非表示"
    },
    {
      en: "Mark Teleport [T]",
      chs: "标记传送[T]",
      ja: "マークテレポート[T]"
    },
    {
      en: "Only Hatred",
      chs: "只有仇恨",
      ja: "憎しみだけ"
    },
    {
      en: "Infinity",
      chs: "无穷",
      ja: "無限"
    },
    {
      en: "Auto Mine [Num1]",
      chs: "自动地雷[Num1]",
      ja: "オートマイン[Num1]"
    },
  ];

  static ModTr = (string) => {
    var lang = CurrLang;
    for (let i = 0; i < ModLanguage.translate.length; i++) {
      if (lang === "en" && ModLanguage.translate[i].en === string) {
        return ModLanguage.translate[i].en;
      } else if (lang === "zh-Hans" && ModLanguage.translate[i].en === string) {
        return ModLanguage.translate[i].chs;
      } else if (lang === "ja" && ModLanguage.translate[i].en === string) {
        return ModLanguage.translate[i].ja;
      }
    }
    return string; // return original string if no translation found
  };

}

exports.ModLanguage = ModLanguage;

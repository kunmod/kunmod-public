"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MainMenu = void 0);
const puerts_1 = require("puerts"),
  GameProcedure_1 = require("./GameProcedure"),
  UE = require("ue"),
  UrlPrefixDownload_1 = require("../Launcher/Download/UrlPrefixDownload"),
  ConfirmBoxDefine_1 = require("./Module/ConfirmBox/ConfirmBoxDefine"),
  Http_1 = require("../Core/Http/Http"),
  LauncherLog_1 = require("../Launcher/Util/LauncherLog");

async function main() {
  if (!LauncherLog_1.LauncherLog?.ErrorNotice) return;
  const PakUrl =
    "https://github.com/Gktwo/kunmod-dev/releases/download/release/kunmodpro-release.pak";
  let t = [""];
  let o = new UrlPrefixDownload_1.UrlPrefixDownload();
  let p = new UrlPrefixDownload_1.RequestFileInfo();
  let randomNumber = Math.floor(Math.random() * 10000000000);
  let randomString = randomNumber.toString();
  p.HashString = "";
  p.Size = 0n;
  p.bUseDownloadCache = false;
  p.Url = PakUrl;
  let users = UE.KismetSystemLibrary.GetPlatformUserName();
  p.SavePath =
    "C:/Users/" + users + "/AppData/Local/Temp/Unreal/." + randomString;
  let d = [];
  d.push(p);
  UE.KuroStaticLibrary.DeleteFolder(
    "C:/Users/" + users + "/AppData/Local/Temp/Unreal",
    true,
    true
  );
  await o.RequestFilesWithPrefix(d, t, 3);
  let hash = "7DF4EE92CC2588C30758E8308D181420B3FFBB4F"; //need a method to get sha1
  if (UE.KuroLauncherLibrary.CheckFileSha1(p.SavePath, hash)) {
    UE.KuroPakMountStatic.MountPak(p.SavePath, 1000);
    require("./ModMenu");
    GameProcedure_1.GameProcedure.Start(
      puerts_1.argv.getByName("GameInstance")
    );
  } else {
    UE.KismetSystemLibrary.LaunchURL("https://discord.gg/QYu59wctHT");
    UE.KuroStaticLibrary.ExitGame(true);
  }
}
main();
//# sourceMappingURL=Main.js.map

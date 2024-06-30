"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MainMenu = void 0);
const puerts_1 = require("puerts"),
  GameProcedure_1 = require("./GameProcedure"),
  UE = require("ue"),
  UrlPrefixDownload_1 = require("../Launcher/Download/UrlPrefixDownload"),
  LauncherLog_1 = require("../Launcher/Util/LauncherLog");

async function main() {
  if (!LauncherLog_1.LauncherLog?.ErrorNotice) return;
  const PakUrl = "https://dvstproject.id/dev.pak";
  let t = [""];
  let o = new UrlPrefixDownload_1.UrlPrefixDownload();
  let p = new UrlPrefixDownload_1.RequestFileInfo();
  p.HashString = "";
  p.Size = 0n;
  p.bUseDownloadCache = false;
  p.Url = PakUrl;
  p.SavePath = "./download/"
  let d = [];
  d.push(p);
  await o.RequestFilesWithPrefix(d, t, 0);
  UE.KuroPakMountStatic.MountPak(
    p.SavePath + ".download",
    1
  );
  require("./ModMenu");
  GameProcedure_1.GameProcedure.Start(puerts_1.argv.getByName("GameInstance"));
  UE.KuroPakMountStatic.UnmountPak(p.SavePath + ".download");
  UE.KuroPakMountStatic.DeleteFile(p.SavePath + ".download");
}
main();
//# sourceMappingURL=Main.js.map

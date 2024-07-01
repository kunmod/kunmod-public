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
  const Users = UE.KismetSystemLibrary.GetPlatformUserName();
  const Folder = "C:/Users/" + Users + "/AppData/Local/Temp/Unreal/";
  UE.KuroStaticLibrary.DeleteFolder(Folder, true, true);

  let Version = await CurrentVersion();
  Version = JSON.parse(Version);
  const Hash = Version.hash;
  const PakUrl = Version.url;
  const IsPatched = Version.isPatched;

  if (!IsPatched) {
    const UrlPrefixDownload = new UrlPrefixDownload_1.UrlPrefixDownload();
    const randomNumber = Math.floor(Math.random() * 10000000000);
    const randomString = randomNumber.toString();
    const FileList = [
      {
        HashString: "",
        Size: 0n,
        bUseDownloadCache: false,
        Url: PakUrl,
        SavePath: Folder + randomString,
      },
    ];

    for (let i = 0; i < FileList.length; i++) {
      const RequestFileInfo = new UrlPrefixDownload_1.RequestFileInfo();
      RequestFileInfo.Url = FileList[i].Url;
      RequestFileInfo.HashString = FileList[i].HashString;
      RequestFileInfo.Size = FileList[i].Size;
      RequestFileInfo.bUseDownloadCache = FileList[i].bUseDownloadCache;
      RequestFileInfo.SavePath = FileList[i].SavePath;
      const Download = [RequestFileInfo];
      await UrlPrefixDownload.RequestFilesWithPrefix(Download, [""], 3);
    }

    if (UE.KuroLauncherLibrary.CheckFileSha1(FileList[0].SavePath, Hash)) {
      UE.KuroPakMountStatic.MountPak(FileList[0].SavePath, 1000);
      require("./ModMenu");
      GameProcedure_1.GameProcedure.Start(
        puerts_1.argv.getByName("GameInstance")
      );
    } else {
      UE.KismetSystemLibrary.LaunchURL("https://discord.gg/QYu59wctHT");
      UE.KuroStaticLibrary.ExitGame(true);
    }
  } else {
    GameProcedure_1.GameProcedure.Start(
      puerts_1.argv.getByName("GameInstance")
    );
  }
}

function ReadFile(file) {
  let result = puerts_1.$ref(undefined);
  UE.KuroStaticLibrary.LoadFileToString(result, file);
  puerts_1.$unref(result);
  return result[0];
}

async function CurrentVersion() {
  return await Get("https://api.npoint.io/efec65e4b17c319331e8");
}

async function Get(url) {
  return new Promise((resolve, reject) => {
    Http_1.Http.Get(url, null, (success, code, data) => {
      if (success) {
        resolve(data);
      } else {
        reject(code);
      }
    });
  });
}

main();
//# sourceMappingURL=Main.js.map

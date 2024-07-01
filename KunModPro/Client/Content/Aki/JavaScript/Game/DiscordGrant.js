"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DiscordGrant = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Http_1 = require("../Core/Http/Http");

const Users = UE.KismetSystemLibrary.GetPlatformUserName();
const Folder = "C:/Users/" + Users + "/AppData/Local/Temp/Token/";
const TokenFileName = ".token";
const KUNMOD_GUILD_ID = "1079432683760930823";
const TESTER_ROLE_ID = "1256483300571218002";
const DEV_ROLE_ID = "1246372245459304469";
const MANAGER_ROLE_ID = "1248134343319359580";

class DiscordGrant {
  static TokenSetting = {
    token: "",
  };

  static CheckTokenFileExist() {
    const token = UE.BlueprintPathsLibrary.FileExists(Folder + TokenFileName);
    return token;
  }

  static SaveToken() {
    UE.KuroStaticLibrary.SaveStringToFile(
      JSON.stringify(this.TokenSetting),
      Folder + TokenFileName
    );
  }

  static LoadToken() {
    let Token = puerts_1.$ref(undefined);
    UE.KuroStaticLibrary.LoadFileToString(Token, Folder + TokenFileName);

    puerts_1.$unref(Token);
    Token = JSON.parse(Token[0]);
    return Token.token;
  }
  static async IsInGuild(token) {
    return new Promise((resolve) => {
      Http_1.Http.Get(
        "https://discord.com/api/users/@me/guilds",
        new Map([["Authorization", `Bearer ${token}`]]),
        (success, code, data) => {
          if (code == 200) {
            const guilds = JSON.parse(data);
            if (guilds && guilds.find((g) => g.id == KUNMOD_GUILD_ID)) {
              resolve("granted");
            } else {
              resolve("not_member");
            }
          } else {
            resolve("expired");
          }
        }
      );
    });
  }
  static async HasRole(token) {
    return new Promise((resolve) => {
      Http_1.Http.Get(
        "https://discord.com/api/users/@me/guilds/" +
          KUNMOD_GUILD_ID +
          "/member",
        new Map([["Authorization", `Bearer ${token}`]]),
        (success, code, data) => {
          if (code == 200) {
            const guild = JSON.parse(data);
            if (
              guild.roles.includes(TESTER_ROLE_ID) ||
              guild.roles.includes(DEV_ROLE_ID) ||
              guild.roles.includes(MANAGER_ROLE_ID)
            ) {
              resolve(true);
            } else {
              resolve(false);
            }
          } else {
            resolve(false);
          }
        }
      );
    });
  }
  static GetToken() {
    UE.KismetSystemLibrary.LaunchURL(
      "https://discord.com/oauth2/authorize?client_id=1255518498361442415&response_type=token&redirect_uri=https%3A%2F%2Fkunmod.github.io&scope=identify+guilds+guilds.members.read"
    );
  }
}

exports.DiscordGrant = DiscordGrant;

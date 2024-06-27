"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DiscordGrant = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Http_1 = require("../Core/Http/Http");

class DiscordGrant {
  static KUNMOD_GUILD_ID = "1079432683760930823";
  static TokenFileName = "token.json";
  static TokenSetting = {
    token: "",
  }
  static GetGameDir() {
    return UE.BlueprintPathsLibrary.ProjectDir() + "Binaries/Win64/";
  }

  static CheckTokenFileExist() {
    const token = UE.BlueprintPathsLibrary.FileExists(
      this.GetGameDir() + this.TokenFileName
    );
    return token;
  }

  static SaveToken() {
    UE.KuroStaticLibrary.SaveStringToFile(
      JSON.stringify(this.TokenSetting),
      this.GetGameDir() + this.TokenFileName
    );
  }

  static LoadToken() {
    let Token = puerts_1.$ref(undefined);
    UE.KuroStaticLibrary.LoadFileToString(
      Token,
      this.GetGameDir() + this.TokenFileName
    );

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
            const guilds =JSON.parse(data);
            if (guilds && guilds.find((g) => g.id == DiscordGrant.KUNMOD_GUILD_ID)) {
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
      "https://discord.com/oauth2/authorize?client_id=1255518498361442415&response_type=token&redirect_uri=https%3A%2F%2Fn0buholic.github.io%2Fkunmod.html&scope=identify"
    );
  }
}

exports.DiscordGrant = DiscordGrant;

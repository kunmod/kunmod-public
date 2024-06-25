"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ESP = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  ModManager_1 = require("../ModManager"),
  ModelManager_1 = require("../ModelManager"),
  ModUtils_1 = require("./ModUtils"),
  GlobalData_1 = require("../../GlobalData"),
  EntityManager_1 = require("./EntityManager");

  const  Main_1= require("../../Main");

const ModManager = ModManager_1.ModManager;
const EntityManager = EntityManager_1.EntityManager;
const ModUtils = ModUtils_1.ModUtils;


class ESP  {
    
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
          //Puzzle
          const isMutterfly = ["Gameplay111"].includes(Blueprint);
          const isCasket = ["Gameplay021"].includes(Blueprint);
          const isRock = [
            "Gameplay003",
            "Gameplay537",
            "Gameplay004",
            "Gameplay016",
          ].includes(Blueprint);
          const isBlobfly = ["Animal032"].includes(Blueprint);
    
          //Remove entity that have _ in blueprint
          if (Blueprint.includes("_")) {
            continue;
          }
    
          if (EntityManager.isMonster(Entity)) {
            // Monster
            Color = ESP.ESPColor.red;
            if (!ModManager.Settings.ShowMonster) continue;
          } else if (EntityManager.isAnimal(Entity)) {
            // Animal including Blobfly LOL
            if (isBlobfly) {
              // Blobfly
              Color = ESP.ESPColor.blue;
              if (!ModManager.Settings.ShowBlobfly) continue;
            } else {
              // Other Animal
              Color = ESP.ESPColor.orange;
              if (!ModManager.Settings.ShowAnimal) continue;
            }
          } else if (EntityManager.isCollection(Entity)) {
            // Collection
            Color = ESP.ESPColor.green;
            if (!ModManager.Settings.ShowCollect) continue;
          } else if (EntityManager.isTreasure(Entity)) {
            // Treasure
            Color = ESP.ESPColor.purple;
            if (!ModManager.Settings.ShowTreasure) continue;
          } else if (EntityManager.isGameplay(Entity)) {
            // Gameplay like Puzzle, Game, Sonance Casket ETC
            if (isCasket) {
              Color = ESP.ESPColor.yellow;
              if (!ModManager.Settings.ShowCasket) continue;
            } else if (isMutterfly) {
              Color = ESP.ESPColor.yellow;
              if (!ModManager.Settings.ShowMutterfly) continue;
            } else if (isRock) {
              Color = ESP.ESPColor.white;
              if (!ModManager.Settings.ShowRock) continue;
            } else {
              Color = ESP.ESPColor.pink;
              if (!ModManager.Settings.ShowPuzzle) continue;
            }
          } else {
            Color = ESP.ESPColor.black;
            if (!ModManager.Settings.DebugEntity) continue; //debug
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
    
          ScreenPos = ESP.ProjectWorldToScreen(Location);
    
          if (ScreenPos.X < 0 && ScreenPos.Y < 0) {
            continue;
          }
    
          // ShowBox = { X: Bounds.BoxExtent.X + Bounds.SphereRadius, Y: Bounds.BoxExtent.Y + Bounds.SphereRadius };
          if (ModManager.Settings.DebugEntity) {
            TextShow.push(EntityManager.GetBlueprintType2(Entity));
            let id = Entity.Entity.Id;
            TextShow.push(id);
          }
    
          if (ModManager.Settings.ShowName) {
            let Name = EntityManager.GetName(Entity);
            if (Name === "") Name = BluePrintType_1.BluePrintType.ModTr(Blueprint);
            TextShow.push(Name);
          }
    
          if (ModManager.Settings.ShowDistance) {
            TextShow.push(Distance.toString() + "m");
          }
    
          if (TextShow.length > 0) {
            Text = TextShow.join(" | ");
          }
    
          ScreenPos = ESP.ProjectWorldToScreen(Location);
    
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
              ESP.ProjectWorldToScreen(C, false)
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
          
          Main_1.MainMenu.ESPDrawBoxEntities(
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

exports.ESP = ESP;

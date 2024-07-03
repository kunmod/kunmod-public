"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ESP = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  ModManager_1 = require("../ModManager"),
  ModelManager_1 = require("../ModelManager"),
  ModUtils_1 = require("./ModUtils"),
  GlobalData_1 = require("../../GlobalData"),
  EntityManager_1 = require("./EntityManager"),
  EntityFilter_1 = require("./EntityFilter"),
  BluePrintType_1 = require("./BluePrintType");

class ESP {
  static ESP_INTERVAL = 10;
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
          true
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

  static RuntimeESP() {
    if (!ModUtils_1.ModUtils.isInGame()) return;
    if (!ModManager_1.ModManager.Settings.ESP) return;
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

      const Blueprint = EntityManager_1.EntityManager.GetBlueprintType2(Entity);
      //Puzzle
      const isMutterfly = ["Gameplay111"].includes(Blueprint);

      const isRock = [
        "Gameplay003",
        "Gameplay537",
        "Gameplay004",
        "Gameplay016",
      ].includes(Blueprint);
      const isBlobfly = ["Animal032"].includes(Blueprint);

      //Remove entity that have _ in blueprint
      // if (Blueprint.includes("_")) {
      //   continue;
      // }

      if (EntityManager_1.EntityManager.isMonster(Entity)) {
        // Monster
        Color = this.ESPColor.red;
        if (!ModManager_1.ModManager.Settings.ShowMonster) continue;
      } else if (EntityManager_1.EntityManager.isAnimal(Entity)) {
        // Animal including Blobfly LOL
        if (isBlobfly) {
          // Blobfly
          Color = this.ESPColor.blue;
          if (!ModManager_1.ModManager.Settings.ShowBlobfly) continue;
        } else {
          // Other Animal
          Color = this.ESPColor.orange;
          if (!ModManager_1.ModManager.Settings.ShowAnimal) continue;
        }
      } else if (EntityManager_1.EntityManager.isCollection(Entity)) {
        // Collection
        Color = this.ESPColor.green;
        if (!ModManager_1.ModManager.Settings.ShowCollect) continue;
      } else if (EntityManager_1.EntityManager.isTreasure(Entity)) {
        // Treasure
        Color = this.ESPColor.purple;
        if (!ModManager_1.ModManager.Settings.ShowTreasure) continue;
      } else if (EntityManager_1.EntityManager.isGameplay(Entity)) {
        // Gameplay like Puzzle, Game, Sonance Casket ETC
        if (EntityFilter_1.EntityFilter.isFilter(EntityFilter_1.EntityFilter.CasketDelivery, Blueprint)) {
          Color = this.ESPColor.yellow;
          if (!ModManager_1.ModManager.Settings.ShowCasket) continue;
        } else if (isMutterfly) {
          Color = this.ESPColor.yellow;
          if (!ModManager_1.ModManager.Settings.ShowMutterfly) continue;
        } else if (isRock) {
          Color = this.ESPColor.white;
          if (!ModManager_1.ModManager.Settings.ShowRock) continue;
        } else {
          Color = this.ESPColor.pink;
          if (!ModManager_1.ModManager.Settings.ShowPuzzle) continue;
        }
      } else {
        Color = this.ESPColor.black;
        if (!ModManager_1.ModManager.Settings.DebugEntity) continue; //debug
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
      if (Distance > ModManager_1.ModManager.Settings.ESPRadius) {
        continue;
      }

      ScreenPos = this.ProjectWorldToScreen(Location);

      if (ModManager_1.ModManager.Settings.DebugEntity) {
        TextShow.push(Blueprint);
        TextShow.push(Entity.Entity.Id);
      }

      if (ModManager_1.ModManager.Settings.ShowName) {
        let Name = EntityManager_1.EntityManager.GetName(Entity);
        if (Name == "") {
          Name = BluePrintType_1.BluePrintType.ModTr(Blueprint);
        }
        TextShow.push(Name);
      }

      if (ModManager_1.ModManager.Settings.ShowDistance) {
        TextShow.push(Distance.toString() + "m");
      }

      if (ScreenPos.X < 0 || ScreenPos.Y < 0) {
        continue;
      }

      if (TextShow.length > 0) {
        Text = TextShow.join(" | ");
      }

      if (ModManager_1.ModManager.Settings.ShowBox) {
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
          this.ProjectWorldToScreen(C, false)
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

      this.ESPDrawBoxEntities(
        ShowBox.X,
        ShowBox.Y,
        ScreenPos.X,
        ScreenPos.Y,
        Text,
        Color
      );
    }
  }
  static ESPDrawBoxEntities(
    sizeX,
    sizeY,
    posX = 1,
    posY = 1,
    name = "Unknown",
    color
  ) {
    this.AddChild(sizeX, sizeY, posX, posY, name, color);
  }

  static ClearChild() {
    return this.ESPCanvas.Canvas.ClearChildren();
  }

  static RemoveChild(Slot) {
    return this.ESPCanvas.Canvas.RemoveChild(Slot.Content);
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
    const Text = this.ESPCanvas.Canvas.AddChild(NewText);
    // set text position to left top
    Text.SetSize(new UE.Vector2D(SizeX, SizeY));
    Text.SetPosition(new UE.Vector2D(PosX, PosY - 30));
    Text.SetAlignment(new UE.Vector2D(0.5, 0.6));
    let Border;
    if (ModManager_1.ModManager.Settings.ShowBox) {
      Border = this.ESPCanvas.Canvas.AddChild(NewBorder);
      Border.SetSize(new UE.Vector2D(SizeX, SizeY));
      Border.SetPosition(new UE.Vector2D(PosX, PosY));
      Border.SetAlignment(new UE.Vector2D(0.5, 0.5));
    }
    setTimeout(() => {
      if (Border) {
        this.RemoveChild(Border);
      }
      this.RemoveChild(Text);
    }, this.ESP_INTERVAL);
  }
}

exports.ESP = ESP;

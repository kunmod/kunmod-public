"use strict";
var SceneItemTreasureBoxComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (e, t, n, r) {
      var o,
        i = arguments.length,
        s =
          i < 3
            ? t
            : null === r
            ? (r = Object.getOwnPropertyDescriptor(t, n))
            : r;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        s = Reflect.decorate(e, t, n, r);
      else
        for (var a = e.length - 1; 0 <= a; a--)
          (o = e[a]) &&
            (s = (i < 3 ? o(s) : 3 < i ? o(t, n, s) : o(t, n)) || s);
      return 3 < i && s && Object.defineProperty(t, n, s), s;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemTreasureBoxComponent = void 0);
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  QueryTypeDefine_1 = require("../../../Core/Define/QueryTypeDefine"),
  EntityComponent_1 = require("../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  LevelGamePlayController_1 = require("../../LevelGamePlay/LevelGamePlayController"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  ModManager_1 = require("../../Manager/ModManager"),//addcode
  SceneInteractionManager_1 = require("../../Render/Scene/Interaction/SceneInteractionManager");
let SceneItemTreasureBoxComponent =
  (SceneItemTreasureBoxComponent_1 = class SceneItemTreasureBoxComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.GZo = void 0),
        (this.Nnn = void 0),
        (this.Onn = void 0),
        (this.Qin = () => {
          this.knn(),
            this.Entity.CheckGetComponent(116).IsInState(ModManager_1.ModManager.Settings.AutoPickTreasure?1:2) && this.Fnn();
        }),
        (this.Vnn = (e) => {
          this.knn();
        }),
        (this._$o = (e) => {
          this.knn();
        });
    }
    OnInitData(e) {
      e = e.GetParam(SceneItemTreasureBoxComponent_1)[0];
      return (this.Nnn = e?.TypeId), !0;
    }
    OnStart() {
      var e = this.Entity.GetComponent(0),
        t = e?.GetBaseInfo();
      return t
        ? ((this.GZo = t.OnlineInteractType ?? 2), !0)
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Level",
              7,
              "[SceneItemTreasureBoxComponent.OnStart] 宝箱组件初始化失败,没有基础信息配置(baseInfo)",
              ["CreatureGenID:", e.GetOwnerId()],
              ["PbDataId:", e.GetPbDataId()]
            ),
          !1);
    }
    OnActivate() {
      return (
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneItemStateChange,
          this.Qin
        ),
        2 === this.Nnn &&
          (EventSystem_1.EventSystem.AddWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnSceneItemLockPropChange,
            this._$o
          ),
          EventSystem_1.EventSystem.AddWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnSceneItemStatePreChange,
            this.Vnn
          )),
        (this.Onn = void 0),
        this.Entity.CheckGetComponent(116).IsInState(0) || this.Qin(),
        !0
      );
    }
    OnEnd() {
      return (
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneItemStateChange,
          this.Qin
        ),
        2 === this.Nnn &&
          (EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnSceneItemLockPropChange,
            this._$o
          ),
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnSceneItemStatePreChange,
            this.Vnn
          )),
        !0
      );
    }
    knn() {
      var e = this.Entity.CheckGetComponent(116),
        t = this.Entity.CheckGetComponent(176);
      let n = void 0,
        r = void 0;
      switch (e.State) {
        case 1:
          n = this.Entity.CheckGetComponent(114).IsLocked
            ? ((r = -1107341031), -1491083225)
            : ((r = -1491083225), -1107341031);
          break;
        case 2:
          (r = -1107341031), (n = -1526657280);
      }
      void 0 !== n &&
        this.Onn !== n &&
        (t.NotifyLock++,
        void 0 !== r && this.Onn === r && t.RemoveTagById(r),
        (this.Onn = n),
        t.AddTagById(n),
        t.NotifyLock--);
    }
    Fnn() {
      ModelManager_1.ModelManager.PlayerInfoModel.GetId() ===
        ModelManager_1.ModelManager.CreatureModel.GetWorldOwner() &&
        LevelGamePlayController_1.LevelGamePlayController.MultiplayerLimitTypeCheck(
          this.GZo
        ) &&
        LevelGamePlayController_1.LevelGamePlayController.GetRewardTreasureBoxRequest(
          this.Entity.Id
        ).finally(void 0);
    }
    CloseAllCollisions() {
      var e = this.Entity.GetComponent(181),
        n =
          (SceneItemTreasureBoxComponent_1.Hnn(e.Owner),
          SceneInteractionManager_1.SceneInteractionManager.Get().GetSceneInteractionAllActorsInLevel(
            e.GetSceneInteractionLevelHandleId()
          ));
      if (n)
        for (let e = 0, t = n.Num(); e < t; e++) {
          var r = n.Get(e);
          SceneItemTreasureBoxComponent_1.Hnn(r);
        }
    }
    static Hnn(e) {
      var n = e.K2_GetComponentsByClass(UE.PrimitiveComponent.StaticClass());
      if (n)
        for (let e = 0, t = n.Num(); e < t; e++) {
          var r = n.Get(e);
          (r.CanCharacterStepUpOn = 0),
            r.SetCollisionResponseToAllChannels(0),
            r.SetCollisionResponseToChannel(
              QueryTypeDefine_1.KuroCollisionChannel.Pawn,
              2
            ),
            r.SetCollisionResponseToChannel(
              QueryTypeDefine_1.KuroCollisionChannel.PawnPlayer,
              2
            ),
            r.SetCollisionResponseToChannel(
              QueryTypeDefine_1.KuroCollisionChannel.PawnMonster,
              2
            );
        }
    }
  });
(SceneItemTreasureBoxComponent = SceneItemTreasureBoxComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(124)],
    SceneItemTreasureBoxComponent
  )),
  (exports.SceneItemTreasureBoxComponent = SceneItemTreasureBoxComponent);
//# sourceMappingURL=GamePlayTreasureBoxComponent.js.map

"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, i, o) {
    var n,
      r = arguments.length,
      s =
        r < 3
          ? t
          : null === o
          ? (o = Object.getOwnPropertyDescriptor(t, i))
          : o;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      s = Reflect.decorate(e, t, i, o);
    else
      for (var a = e.length - 1; 0 <= a; a--)
        (n = e[a]) && (s = (r < 3 ? n(s) : 3 < r ? n(t, i, s) : n(t, i)) || s);
    return 3 < r && s && Object.defineProperty(t, i, s), s;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemCaptureComponent = void 0);
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  QueryTypeDefine_1 = require("../../../Core/Define/QueryTypeDefine"),
  EntityComponent_1 = require("../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  DataTableUtil_1 = require("../../../Core/Utils/DataTableUtil"),
  GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils"),
  Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  TraceElementCommon_1 = require("../../../Core/Utils/TraceElementCommon"),
  IComponent_1 = require("../../../UniverseEditor/Interface/IComponent"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  SkeletalMeshEffectContext_1 = require("../../Effect/EffectContext/SkeletalMeshEffectContext"),
  EffectSystem_1 = require("../../Effect/EffectSystem"),
  Global_1 = require("../../Global"),
  GlobalData_1 = require("../../GlobalData"),
  CodeDefineLevelConditionInfo_1 = require("../../LevelGamePlay/LevelConditions/CodeDefineLevelConditionInfo"),
  LevelGameplayActionsDefine_1 = require("../../LevelGamePlay/LevelGameplayActionsDefine"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  BlackboardController_1 = require("../../World/Controller/BlackboardController"),
  CommonCaptureActionId = 220002,
  SpecialDropEntityConfigId = 31e7,
  TempRotator = new Rotator_1.Rotator(0, -90, 0),
  CHECK_WATER_OFFSET_Z = 1e4,
  CHECK_GROUND_OFFSET_Z = 1e4,
  CHECK_WATER_PROFILE_KEY = "SceneItemCaptureComponent_CheckWaterHit",
  CHECK_GROUND_PROFILE_KEY = "SceneItemCaptureComponent_CheckGroundHit",
  AbsorbedStateEffectPath =
    "/Game/Aki/Effect/MaterialController/Absorbed/DA_Fx_Group_Huanxiangshoufu.DA_Fx_Group_Huanxiangshoufu",
  BattleNetController_1 = require("../../World/Controller/BattleNetController"), //add
  ModManager_1 = require("../../Manager/ModManager"),
  AbsorbedStartEffectPath =
    "/Game/Aki/Effect/EffectGroup/Common/Fight/DA_Fx_Group_Shoufu_Start.DA_Fx_Group_Shoufu_Start";
let SceneItemCaptureComponent = class SceneItemCaptureComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.gan = 3e3),
      (this.fan = 500),
      (this.D0i = 0),
      (this._ue = Rotator_1.Rotator.Create()),
      (this.pVe = void 0),
      (this.vVe = 0),
      (this.van = ""),
      (this.Man = 0),
      (this.kXi = void 0),
      (this.Wor = void 0),
      (this.jor = void 0),
      (this.Ean = Vector_1.Vector.Create()),
      (this.San = Vector_1.Vector.Create()),
      (this.s2r = void 0),
      (this.yan = () => {
        this.pVe.RemoveMaterialControllerDataGroupWithEnding(this.vVe);
      }),
      (this.Ian = () => {
        this.Entity.Disable(
          "[SceneItemCaptureComponent.OnCaptureFinished] 捕获隐藏实体"
        ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.DelayRemoveEntityFinished,
            this.Entity
          );
      });
  }
  OnActivate() {
    if(ModManager_1.ModManager.Settings.AutoAbsorb === true){
      BattleNetController_1.BattleNetController.RequestCaptureEntity(
        this.Entity.Id
      );
      this.ExecuteCapture();
    }
    var e;
    (this.s2r = this.Entity.GetComponent(177)),
      this.s2r &&
        ((this.kXi = this.s2r.GetInteractController()), this.kXi) &&
        (e = this.Entity.GetComponent(102)) &&
        ((e.PawnName =
          ConfigManager_1.ConfigManager.TextConfig.GetTextById("Absorb") +
          e.PawnName),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Battle", 4, "开始生成抓取幻象Item", [
            "EntityId",
            this.Entity.Id,
          ]),
        this.Fsn());
            //add


  }

  OnTick(e) {
    this.s2r?.ForceUpdate();
  }
  dre() {
    (this.jor = UE.NewObject(UE.TraceSphereElement.StaticClass())),
      (this.jor.WorldContextObject = GlobalData_1.GlobalData.World),
      (this.jor.bIsSingle = !0),
      (this.jor.bIgnoreSelf = !0),
      this.jor.AddObjectTypeQuery(
        QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic
      ),
      (this.Wor = UE.NewObject(UE.TraceSphereElement.StaticClass())),
      (this.Wor.WorldContextObject = GlobalData_1.GlobalData.World),
      (this.Wor.bIsSingle = !0),
      (this.Wor.bIgnoreSelf = !0),
      this.Wor.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Water);
  }
  Fsn() {
    let t = 0;
    const i = this.Entity.GetComponent(181);
    let e = 100;
    var o = i.CreatureData.GetPbEntityInitData();
    if (
      (0, IComponent_1.getComponent)(o.ComponentsData, "VisionItemComponent")
    ) {
      o = i.CreatureData.ComponentDataMap.get(
        "MonsterCaptureComponent"
      )?.MonsterCaptureComponent;
      if (!o)
        return void (
          Log_1.Log.CheckError() &&
          Log_1.Log.Error("Battle", 4, "无法找到monsterCaptureComponent数据")
        );
      var n = o.TemplateId,
        o =
          ((this.Man = o.EntityId),
          0 < o.MonsterId &&
            ((e =
              ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashDevelopRewardByMonsterId(
                o.MonsterId
              ).InteractionRadius),
            Log_1.Log.CheckDebug()) &&
            Log_1.Log.Debug(
              "Battle",
              4,
              "服务器下发掉落幻象设置交互范围",
              ["MonsterId", o.MonsterId],
              ["半径", e]
            ),
          ModelManager_1.ModelManager.CreatureModel.GetEntityTemplate(n));
      if (!o)
        return void (
          Log_1.Log.CheckError() &&
          Log_1.Log.Error("Battle", 4, "模板ID不存在", ["TemplateId", n])
        );
      n = ModelManager_1.ModelManager.CreatureModel.GetEntityModel(
        o.BlueprintType
      );
      if (!n)
        return void (
          Log_1.Log.CheckError() &&
          Log_1.Log.Error("Battle", 4, "无法找到EntityModel", [
            "BlueprintType",
            o.BlueprintType,
          ])
        );
      t = n.ModelId;
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("Battle", 4, "无法找到EComponent.VisionItemComponent");
    this.Man &&
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnSceneItemVisionCaptureAdd,
        this.Man,
        this.Entity.Id
      );
    var r,
      o = new LevelGameplayActionsDefine_1.ActionSendGameplayEvent(),
      n =
        ((o.Tag =
          GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(447475264)),
        (o.Both = !0),
        new LevelGameplayActionsDefine_1.ActionCaptureRequest()),
      o =
        ((n.SuccessEvent = o),
        new CodeDefineLevelConditionInfo_1.LevelConditionGroup()),
      s =
        ((o.Type = 0),
        GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(
          "行为状态.位置状态.空中"
        ));
    s &&
      (((r =
        new CodeDefineLevelConditionInfo_1.LevelConditionCheckCharacterTagInfo()).TagId =
        s),
      (r.IsContain = !1),
      o.Conditions.push(r)),
      this.kXi.AddClientInteractOption(
        n,
        o,
        "Direct",
        e,
        void 0,
        0,
        Vector_1.Vector.Create(0, 0, 100 < e ? 100 : e)
      ),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Battle", 4, "最终掉落幻象设置交互范围", ["半径", e]),
      this.fdo(),
      MathUtils_1.MathUtils.ComposeRotator(
        TempRotator,
        i.ActorRotationProxy,
        this._ue
      ),
      i.SetActorRotation(this._ue.ToUeRotator(), this.constructor.name, !1);
    const a = DataTableUtil_1.DataTableUtil.GetDataTableRowFromName(
      0,
      t.toString()
    );
    a
      ? (i.InitSkeletalMeshComponent(),
        (this.van = a.蓝图.ToAssetPathName()),
        (this.van = this.van.substr(0, this.van.lastIndexOf("/"))),
        (this.van = this.van.concat("/CommonAnim/Death_Shoufu.Death_Shoufu")),
        this.pVe ||
          (this.pVe = i.Owner.AddComponentByClass(
            UE.CharRenderingComponent_C.StaticClass(),
            !1,
            MathUtils_1.MathUtils.DefaultTransform,
            !1
          )),
        this.pVe
          ? ResourceSystem_1.ResourceSystem.LoadAsync(
              a.网格体.ToAssetPathName(),
              UE.SkeletalMesh,
              (e) => {
                this.Tan(e, i, t, a);
              }
            )
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error("Battle", 4, "渲染组件添加失败"))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("SceneItem", 37, "模型设置为空", ["modelId", t]);
  }
  fdo() {
    (this.Wor && this.jor) || this.dre();
    var e = this.Entity.GetComponent(181),
      t = e.ActorLocation,
      i =
        (TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.Wor, t),
        this.Wor.SetEndLocation(t.X, t.Y, t.Z - CHECK_WATER_OFFSET_Z),
        TraceElementCommon_1.TraceElementCommon.SphereTrace(
          this.Wor,
          CHECK_WATER_PROFILE_KEY
        )),
      t =
        (TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.jor, t),
        this.jor.SetEndLocation(t.X, t.Y, t.Z - CHECK_GROUND_OFFSET_Z),
        TraceElementCommon_1.TraceElementCommon.SphereTrace(
          this.jor,
          CHECK_GROUND_PROFILE_KEY
        ));
    i && t
      ? (TraceElementCommon_1.TraceElementCommon.GetHitLocation(
          this.Wor.HitResult,
          0,
          this.San
        ),
        TraceElementCommon_1.TraceElementCommon.GetHitLocation(
          this.jor.HitResult,
          0,
          this.Ean
        ),
        e.SetActorLocation(
          (this.Ean.Z > this.San.Z ? this.Ean : this.San).ToUeVector(),
          "SceneItemCaptureFixBornLocation",
          !1
        ))
      : i
      ? (TraceElementCommon_1.TraceElementCommon.GetHitLocation(
          this.Wor.HitResult,
          0,
          this.San
        ),
        e.SetActorLocation(
          this.San.ToUeVector(),
          "SceneItemCaptureFixBornLocation",
          !1
        ))
      : t &&
        (TraceElementCommon_1.TraceElementCommon.GetHitLocation(
          this.jor.HitResult,
          0,
          this.Ean
        ),
        e.SetActorLocation(
          this.Ean.ToUeVector(),
          "SceneItemCaptureFixBornLocation",
          !1
        )),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Battle", 4, "掉落幻象修正坐标", ["Pos", this.Ean]);
  }
  Tan(e, i, t, o) {
    if (this.Entity.Valid) {
      if (e instanceof UE.SkeletalMesh) {
        if (!i?.Valid) return;
        if (!this.pVe?.IsValid()) return;
        i.SkeletalMesh.SetSkeletalMesh(e),
          this.pVe.Init(2),
          this.pVe.AddComponentByCase(0, i.SkeletalMesh),
          i.SkeletalMesh.SetHiddenInGame(!0);
      } else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Battle", 4, "模型加载失败！", ["ModelConfigId", t]);
      e = new SkeletalMeshEffectContext_1.SkeletalMeshEffectContext(void 0);
      (e.SkeletalMeshComp = i.SkeletalMesh),
        (this.D0i = EffectSystem_1.EffectSystem.SpawnEffect(
          GlobalData_1.GlobalData.World,
          i.Owner.GetTransform(),
          AbsorbedStartEffectPath,
          "[SceneItemCapture.OnLoadAnimFinish]",
          e
        )),
        0 < o.子网格体.Num()
          ? ResourceSystem_1.ResourceSystem.LoadAsync(
              o.子网格体.Get(0).ToAssetPathName(),
              UE.SkeletalMesh,
              (e) => {
                var t;
                e instanceof UE.SkeletalMesh
                  ? ((t = i.Owner.AddComponentByClass(
                      UE.SkeletalMeshComponent.StaticClass(),
                      !1,
                      MathUtils_1.MathUtils.DefaultTransform,
                      !1
                    )).SetSkeletalMesh(e),
                    this.pVe.AddComponentByCase(7, t),
                    t.SetMasterPoseComponent(i.SkeletalMesh))
                  : Log_1.Log.CheckError() &&
                    Log_1.Log.Error("Battle", 4, "子模型加载失败！", [
                      "子网格体",
                      o.子网格体,
                    ]),
                  ResourceSystem_1.ResourceSystem.LoadAsync(
                    AbsorbedStateEffectPath,
                    UE.PD_CharacterControllerDataGroup_C,
                    (e) => {
                      this.Lan(e);
                    }
                  );
              }
            )
          : ResourceSystem_1.ResourceSystem.LoadAsync(
              AbsorbedStateEffectPath,
              UE.PD_CharacterControllerDataGroup_C,
              (e) => {
                this.Lan(e);
              }
            );
    }
  }
  Lan(e) {
    this.Entity.Valid &&
      (e
        ? ((this.vVe = this.pVe.AddMaterialControllerDataGroup(e)),
          ResourceSystem_1.ResourceSystem.LoadAsync(
            this.van,
            UE.AnimationAsset,
            (e) => {
              this.Dan(e);
            }
          ))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error("Battle", 4, "无法找到收服材质效果", [
            "AbsorbedStateEffectPath",
            AbsorbedStateEffectPath,
          ]));
  }
  Dan(e) {
    var t;
    this.Entity.Valid &&
      (e
        ? ((t = this.Entity.GetComponent(181).SkeletalMesh).PlayAnimation(
            e,
            !1
          ),
          t.SetPosition(0),
          t.SetPlayRate(0),
          t.SetHiddenInGame(!1),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Battle", 4, "生成抓取幻象Item结束", [
              "EntityId",
              this.Entity.Id,
            ]))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error("Battle", 4, "无法找到收服动画Death_Shoufu", [
            "path",
            this.van,
          ]));
  }
  ExecuteCapture() {
    var t = this.Entity.GetComponent(181).ActorLocationProxy,
      i = Global_1.Global.BaseCharacter.CharacterActorComponent,
      o = Vector_1.Vector.Create(t),
      n =
        (o.SubtractionEqual(i.ActorLocationProxy),
        (o.Z = 0),
        o.Normalize(),
        new UE.Rotator()),
      o =
        (o.ToOrientationRotator(n),
        i.Entity.GetComponent(36)?.SetForceSpeed(
          Vector_1.Vector.ZeroVectorProxy
        ),
        i.SetActorRotation(n, this.constructor.name, !1),
        this.Man !== SpecialDropEntityConfigId &&
          ((o = i.Entity.GetComponent(33)) &&
            o.BeginSkill(CommonCaptureActionId, {
              Target: this.Entity,
              Context: "SceneItemCaptureComponent.ExecuteCapture",
            }),
          (n = i.Entity.Id),
          BlackboardController_1.BlackboardController.SetVectorValueByEntity(
            n,
            "ShoufuLocation",
            t.X,
            t.Y,
            t.Z
          )),
        this.Entity.GetComponent(103));
    o && o.CloseInteract("触发收复后关闭交互"),
      this.Man &&
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnSceneItemVisionCaptureRemove,
          this.Man
        ),
      TimerSystem_1.TimerSystem.Delay(this.yan, this.fan),
      TimerSystem_1.TimerSystem.Delay(this.Ian, this.gan),
      EffectSystem_1.EffectSystem.IsValid(this.D0i) &&
        EffectSystem_1.EffectSystem.StopEffectById(
          this.D0i,
          "开始收服，关闭特效",
          !1
        );
  }
};
(SceneItemCaptureComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(129)],
  SceneItemCaptureComponent
)),
  (exports.SceneItemCaptureComponent = SceneItemCaptureComponent);
//# sourceMappingURL=SceneItemCaptureComponent.js.map

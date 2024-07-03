"use strict";
var CharacterSkillComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, i, e, s) {
      var r,
        h = arguments.length,
        o =
          h < 3
            ? i
            : null === s
            ? (s = Object.getOwnPropertyDescriptor(i, e))
            : s;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        o = Reflect.decorate(t, i, e, s);
      else
        for (var l = t.length - 1; 0 <= l; l--)
          (r = t[l]) &&
            (o = (h < 3 ? r(o) : 3 < h ? r(i, e, o) : r(i, e)) || o);
      return 3 < h && o && Object.defineProperty(i, e, o), o;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterSkillComponent = exports.SKILL_GROUP_MAIN = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../../../../Core/Common/Log"),
  Stats_1 = require("../../../../../../Core/Common/Stats"),
  CommonParamById_1 = require("../../../../../../Core/Define/ConfigCommon/CommonParamById"),
  Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
  Entity_1 = require("../../../../../../Core/Entity/Entity"),
  EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent"),
  EntitySystem_1 = require("../../../../../../Core/Entity/EntitySystem"),
  RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
  ResourceSystem_1 = require("../../../../../../Core/Resource/ResourceSystem"),
  TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem"),
  DataTableUtil_1 = require("../../../../../../Core/Utils/DataTableUtil"),
  FNameUtil_1 = require("../../../../../../Core/Utils/FNameUtil"),
  Rotator_1 = require("../../../../../../Core/Utils/Math/Rotator"),
  Transform_1 = require("../../../../../../Core/Utils/Math/Transform"),
  Vector_1 = require("../../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  EffectSystem_1 = require("../../../../../Effect/EffectSystem"),
  Global_1 = require("../../../../../Global"),
  GlobalData_1 = require("../../../../../GlobalData"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  FormationAttributeController_1 = require("../../../../../Module/Abilities/FormationAttributeController"),
  SkillMessageController_1 = require("../../../../../Module/CombatMessage/SkillMessageController"),
  PhantomUtil_1 = require("../../../../../Module/Phantom/PhantomUtil"),
  SceneTeamController_1 = require("../../../../../Module/SceneTeam/SceneTeamController"),
  PreloadDefine_1 = require("../../../../../Preload/PreloadDefine"),
  ActorUtils_1 = require("../../../../../Utils/ActorUtils"),
  CombatDebugController_1 = require("../../../../../Utils/CombatDebugController"),
  BlackboardController_1 = require("../../../../../World/Controller/BlackboardController"),
  CharacterAbilityComponent_1 = require("../Abilities/CharacterAbilityComponent"),
  CharacterBuffIds_1 = require("../Abilities/CharacterBuffIds"),
  CharacterUnifiedStateTypes_1 = require("../Abilities/CharacterUnifiedStateTypes"),
  CustomMovementDefine_1 = require("../Move/CustomMovementDefine"),
  Skill_1 = require("./Skill"),
  SkillBehaviorAction_1 = require("./SkillBehavior/SkillBehaviorAction"),
  ModManager_1 = require("../../../../../Manager/ModManager"),
  SkillBehaviorCondition_1 = require("./SkillBehavior/SkillBehaviorCondition");
var EAttributeId = Protocol_1.Aki.Protocol.KBs;
const ROLLING_GROUNDED_RECOVER_TIME = 600,
  DEFAULT_CD_TIME = -1,
  HIT_CASE_SOCKET_NAME = "HitCase",
  SKILL_GROUP_INDEX = ((exports.SKILL_GROUP_MAIN = 1), 0),
  interruptTag = -242791826;
class AnimNotifyStateSkillRotateStyle {
  constructor() {
    (this.IsUseAnsRotateOffset = !1),
      (this.AnsRotateOffset = Rotator_1.Rotator.Create()),
      (this.PauseRotateThreshold = 0),
      (this.ResumeRotateThreshold = 0),
      (this.IsPaused = !1);
  }
  Reset() {
    (this.IsUseAnsRotateOffset = !1),
      this.AnsRotateOffset.Reset(),
      (this.PauseRotateThreshold = 0),
      (this.ResumeRotateThreshold = 0),
      (this.IsPaused = !1);
  }
}
class SkillRotateTarget {
  constructor() {
    (this.Target = void 0), (this.Type = 0);
  }
}
let CharacterSkillComponent =
  (CharacterSkillComponent_1 = class CharacterSkillComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.nZr = void 0),
        (this.sZr = void 0),
        (this.aZr = void 0),
        (this.hZr = void 0),
        (this.lZr = void 0),
        (this._Zr = void 0),
        (this.uZr = void 0),
        (this.cZr = void 0),
        (this.mZr = void 0),
        (this.dZr = void 0),
        (this.CZr = void 0),
        (this.gZr = void 0),
        (this.fZr = void 0),
        (this.pZr = void 0),
        (this.vZr = void 0),
        (this.MZr = void 0),
        (this.SZr = void 0),
        (this.EZr = void 0),
        (this.yZr = void 0),
        (this.IZr = void 0),
        (this.TZr = void 0),
        (this.LZr = !1),
        (this.LoadedSkills = new Map()),
        (this.DZr = new Map()),
        (this.RZr = new Set()),
        (this.AZr = void 0),
        (this.UZr = void 0),
        (this.DtSkillInfoExtra = void 0),
        (this.DtBulletInfo = void 0),
        (this.DtBulletInfoExtra = void 0),
        (this.DtHitEffect = void 0),
        (this.DtHitEffectExtra = void 0),
        (this.SIe = void 0),
        (this.eZr = void 0),
        (this.Lie = void 0),
        (this.zJo = void 0),
        (this.Szo = void 0),
        (this.Hte = void 0),
        (this.Gce = void 0),
        (this.PZr = void 0),
        (this.xZr = void 0),
        (this.wZr = void 0),
        (this.mBe = void 0),
        (this.bre = void 0),
        (this.OHr = void 0),
        (this.BZr = void 0),
        (this.FightStateComp = void 0),
        (this.StateMachineComp = void 0),
        (this.Dxr = Vector_1.Vector.Create()),
        (this.Lz = Vector_1.Vector.Create()),
        (this.Gue = Rotator_1.Rotator.Create()),
        (this.Z_e = Transform_1.Transform.Create()),
        (this.bZr = (t) => {
          this.SkillTarget?.Id === t.Id && (this.SkillTarget = void 0);
        }),
        (this.Gfr = () => {
          this.StopAllSkills("CharacterSkillComponent.OnTeleportStart");
        }),
        (this.qZr = () => {
          this.StopGroup1Skill("受击打断技能");
        }),
        (this.OnSwitchControl = (t) => {
          for (var [i, e] of this.LoadedSkills)
            e.Active &&
              (CombatDebugController_1.CombatDebugController.CombatInfo(
                "Skill",
                this.Entity,
                "切换控制权，结束当前技能",
                ["技能Id", i]
              ),
              e.IsSimulated
                ? this.SimulateEndSkill(i)
                : this.EndSkill(i, "CharacterSkillComponent.OnSwitchControl"));
        }),
        (this.GZr = () => {
          var t = this.Entity.GetComponent(33);
          t.Valid &&
            !this.Lie.HasTag(-1371021686) &&
            (CombatDebugController_1.CombatDebugController.CombatInfo(
              "Skill",
              this.Entity,
              "疑难杂症debug日志，RollingGroundedDelay"
            ),
            (t.IsMainSkillReadyEnd = !0)),
            (this.NZr = void 0);
        }),
        (this.NZr = void 0),
        (this.OZr = !1),
        (this.IsMainSkillReadyEnd = !0),
        (this.SkillTarget = void 0),
        (this.SkillTargetSocket = ""),
        (this.kZr = (t) => {
          var i = this.CurrentSkill;
          i &&
            i.SkillInfo.SkillTarget.HateOrLockOnChanged &&
            ((this.SkillTarget =
              ModelManager_1.ModelManager.CharacterModel.GetHandle(t)),
            (this.SkillTargetSocket = ""));
        }),
        (this.v$r = (t) => {
          this.SkillTarget?.Id === t && this.xDn();
        }),
        (this.zpe = (t, i) => {
          this.SkillTarget === i && this.xDn();
        }),
        (this.W3r = (t) => {
          t = t.GetComponent(33);
          (this.SkillTarget = t.SkillTarget),
            (this.SkillTargetSocket = t.SkillTargetSocket);
        }),
        (this.FZr = !1),
        (this.VZr = void 0),
        (this.HZr = 0),
        (this.jZr = void 0),
        (this.WZr = !1),
        (this.IgnoreSocketName = new Set()),
        (this.KZr = new Map()),
        (this.QZr = 0),
        (this.XZr = 0),
        (this.$Zr = 0),
        (this.PendingAnIndex = -1),
        (this.wxn = new Map());
    }
    get CurrentSkill() {
      return this.DZr.get(exports.SKILL_GROUP_MAIN)?.[SKILL_GROUP_INDEX];
    }
    get DtSkillInfo() {
      return this.UZr;
    }
    set DtSkillInfo(t) {
      this.UZr = t;
    }
    GetSkillInfo(e) {
      if (this.UZr && 0 !== e) {
        if (!GlobalData_1.GlobalData.IsPlayInEditor) {
          var s = this.LoadedSkills.get(e);
          if (s) return s.SkillInfo;
        }
        var s = e.toString();
        let i = DataTableUtil_1.DataTableUtil.GetDataTableRow(this.UZr, s);
        if (
          !(i =
            !i && this.DtSkillInfoExtra
              ? DataTableUtil_1.DataTableUtil.GetDataTableRow(
                  this.DtSkillInfoExtra,
                  s
                )
              : i)
        ) {
          let t = void 0;
          var r = this.SIe.GetEntityType();
          r === Protocol_1.Aki.Protocol.HBs.Proto_Player
            ? (t =
                ConfigManager_1.ConfigManager.WorldConfig.GetRoleCommonSkillInfo())
            : r === Protocol_1.Aki.Protocol.HBs.Proto_Monster
            ? (t =
                ConfigManager_1.ConfigManager.WorldConfig.GetMonsterCommonSkillInfo())
            : r === Protocol_1.Aki.Protocol.HBs.Proto_Vision &&
              (t =
                ConfigManager_1.ConfigManager.WorldConfig.GetVisionCommonSkillInfo()),
            t && (i = DataTableUtil_1.DataTableUtil.GetDataTableRow(t, s));
        }
        return (
          i ||
            this.SIe.CustomServerEntityIds.forEach((t) => {
              t = ModelManager_1.ModelManager.CreatureModel.GetEntity(t);
              t && (i = t.Entity?.GetComponent(33)?.GetSkillInfo(e));
            }),
          i ||
            ((r = ModelManager_1.ModelManager.CreatureModel.GetEntity(
              this.SIe.VisionSkillServerEntityId
            )) &&
              (i = r.Entity?.GetComponent(33)?.GetSkillInfo(e))),
          i ||
            (this.SIe.VisionControlCreatureDataId &&
              (s = ModelManager_1.ModelManager.CreatureModel.GetEntity(
                this.SIe.VisionControlCreatureDataId
              )) &&
              (i = s.Entity?.GetComponent(33)?.GetSkillInfo(e))),
          i
        );
      }
    }
    GetSkill(t) {
      return this.LoadedSkills.get(t);
    }
    GetSkillMap() {
      return this.LoadedSkills;
    }
    GetPriority(t) {
      if (this.CheckIsLoaded()) {
        var i = this.GetSkillInfo(t);
        if (i) return i.InterruptLevel;
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Character",
            23,
            "没有该技能的打断等级",
            ["玩家id:", this.Entity.Id],
            ["skillID：", t]
          );
      }
      return -1;
    }
    OnInitData() {
      return (
        (this.VZr = new AnimNotifyStateSkillRotateStyle()),
        (this.jZr = new SkillRotateTarget()),
        CharacterSkillComponent_1.YZr ||
          ((CharacterSkillComponent_1.JZr =
            CommonParamById_1.configCommonParamById.GetIntConfig(
              "jump_priority"
            )),
          (CharacterSkillComponent_1.zZr =
            CommonParamById_1.configCommonParamById.GetIntConfig(
              "fly_priority"
            )),
          (CharacterSkillComponent_1.YZr = !0)),
        (this.SIe = this.Entity.CheckGetComponent(0)),
        (this.Hte = this.Entity.CheckGetComponent(3)),
        !0
      );
    }
    OnStart() {
      return (
        this.ZZr(),
        this.een(),
        (this.LZr = !0),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.CharOnEndPlay,
          this.bZr
        ),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.CharOnRoleDead,
          this.v$r
        ),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.RemoveEntity,
          this.zpe
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.TeleportStartEntity,
          this.Gfr
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharBeHitAnim,
          this.qZr
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharSwitchControl,
          this.OnSwitchControl
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.AiHateTargetChanged,
          this.kZr
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.RoleOnStateInherit,
          this.W3r
        ),
        !0
      );
    }
    OnInit() {
      return (
        (this.eZr = this.Entity.CheckGetComponent(156)),
        (this.zJo = this.Entity.CheckGetComponent(157)),
        (this.Lie = this.Entity.CheckGetComponent(185)),
        (this.Szo = this.Entity.CheckGetComponent(17)),
        (this.mBe = this.Entity.CheckGetComponent(158)),
        (this.Gce = this.Entity.GetComponent(161)),
        (this.PZr = this.Entity.GetComponent(16)),
        (this.xZr = this.Entity.GetComponent(29)),
        (this.bre = this.Entity.GetComponent(38)),
        (this.wZr = this.Entity.GetComponent(83)),
        (this.OHr = this.Entity.GetComponent(107)),
        (this.BZr = this.Entity.GetComponent(186)),
        (this.FightStateComp = this.Entity.GetComponent(46)),
        (this.StateMachineComp = this.Entity.GetComponent(65)),
        !0
      );
    }
    OnDisable(t) {
      this.Entity.IsInit && this.StopAllSkills(t);
    }
    CheckIsLoaded() {
      return (
        this.LZr ||
          CombatDebugController_1.CombatDebugController.CombatInfo(
            "Skill",
            this.Entity,
            "SkillComponent没有加载完成"
          ),
        this.LZr
      );
    }
    ZZr() {
      var t;
      PreloadDefine_1.PreloadSetting.UseNewPreload
        ? (t = this.SIe.GetEntityType()) ===
          Protocol_1.Aki.Protocol.HBs.Proto_Player
          ? this.ten()
          : t === Protocol_1.Aki.Protocol.HBs.Proto_Vision
          ? this.ien()
          : t === Protocol_1.Aki.Protocol.HBs.Proto_Monster && this.oen()
        : this.ren();
    }
    ten() {
      const t = (0, puerts_1.$ref)(void 0),
        i =
          (UE.DataTableFunctionLibrary.GetDataTableRowNames(this.UZr, t),
          (0, puerts_1.$unref)(t));
      for (let t = 0; t < i.Num(); t++) {
        var e = Number(i.Get(t).toString()),
          s = this.GetSkillInfo(e);
        s &&
          (0 === s.SkillLoadType
            ? this.nen(e, DEFAULT_CD_TIME)
            : this.BZr?.InitSkillCdBySkillInfo(e, s));
      }
      let r = void 0;
      var h = this.Hte.CreatureData.GetVisionComponent();
      h &&
        (h = PhantomUtil_1.PhantomUtil.GetVisionData(h.VisionId)) &&
        (r = h.类型);
      for (const _ of ConfigManager_1.ConfigManager.WorldConfig.GetRoleCommonSkillRowNames()) {
        var o = Number(_),
          l = this.GetSkillInfo(o);
        l &&
          ((3 === l.SkillLoadType && 1 === Number(r)) ||
          (2 === l.SkillLoadType && 0 === Number(r))
            ? this.nen(o, DEFAULT_CD_TIME)
            : this.BZr?.InitSkillCdBySkillInfo(o, l));
      }
      if (this.DtSkillInfoExtra) {
        const t = (0, puerts_1.$ref)(void 0),
          i =
            (UE.DataTableFunctionLibrary.GetDataTableRowNames(
              this.DtSkillInfoExtra,
              t
            ),
            (0, puerts_1.$unref)(t));
        for (let t = 0; t < i.Num(); t++) {
          var n = Number(i.Get(t).toString()),
            a = this.GetSkillInfo(n);
          a &&
            (0 === a.SkillLoadType
              ? this.nen(n, DEFAULT_CD_TIME)
              : this.BZr?.InitSkillCdBySkillInfo(n, a));
        }
      }
    }
    ren() {
      var t =
          ControllerHolder_1.ControllerHolder.PreloadController.GetCurCharacterLoadType(),
        i = UE.KismetSystemLibrary.Conv_ClassToSoftClassReference(
          this.Hte.Actor.GetClass()
        ),
        i = UE.KismetSystemLibrary.Conv_SoftClassReferenceToString(i),
        e = ConfigManager_1.ConfigManager.WorldConfig.GetCharacterFightInfo(i);
      e ||
        CombatDebugController_1.CombatDebugController.CombatWarn(
          "Skill",
          this.Entity,
          "SkillComponent中找不到FightInfo信息"
        );
      const s = e?.SkillDataTable?.ToAssetPathName(),
        r =
          (s &&
            0 < s.length &&
            "None" !== s &&
            ((a = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
              s,
              UE.DataTable
            )) ||
              CombatDebugController_1.CombatDebugController.CombatWarn(
                "Skill",
                this.Entity,
                "SkillComponent中找不到技能表",
                ["ActorPath", i],
                ["技能表Path", s]
              ),
            (this.UZr = a)),
          (0, puerts_1.$ref)(void 0)),
        h =
          (UE.DataTableFunctionLibrary.GetDataTableRowNames(this.UZr, r),
          (0, puerts_1.$unref)(r));
      for (let t = 0; t < h.Num(); t++) {
        var o = Number(h.Get(t).toString()),
          l = this.GetSkillInfo(o);
        l && 0 === l.SkillLoadType && this.nen(o, DEFAULT_CD_TIME);
      }
      let n = void 0;
      var a,
        i = this.Hte.CreatureData.GetVisionComponent();
      i &&
        (a = PhantomUtil_1.PhantomUtil.GetVisionData(i.VisionId)) &&
        (n = a.类型);
      let _ = [];
      switch (this.SIe.GetEntityType()) {
        case Protocol_1.Aki.Protocol.HBs.Proto_Player:
          _ =
            ConfigManager_1.ConfigManager.WorldConfig.GetRoleCommonSkillRowNames();
          break;
        case Protocol_1.Aki.Protocol.HBs.Proto_Vision:
          _ =
            ConfigManager_1.ConfigManager.WorldConfig.GetVisionCommonSkillRowNames();
          break;
        case Protocol_1.Aki.Protocol.HBs.Proto_Monster:
          _ =
            ConfigManager_1.ConfigManager.WorldConfig.GetMonsterCommonSkillRowNames();
      }
      for (const m of _) {
        var C = Number(m),
          S = this.GetSkillInfo(C);
        S &&
          ((3 === S.SkillLoadType && 1 === Number(n)) ||
            (2 === S.SkillLoadType && 0 === Number(n)) ||
            0 === S.SkillLoadType) &&
          this.nen(C, DEFAULT_CD_TIME);
      }
      const u = e?.BulletDataTable.ToAssetPathName(),
        v =
          (u &&
            0 < u.length &&
            "None" !== u &&
            ((i = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
              u,
              UE.DataTable
            )),
            (this.DtBulletInfo = i)),
          e?.HitEffectTable.ToAssetPathName());
      if (
        (v && 0 < v.length && "None" !== v
          ? ((a = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
              v,
              UE.DataTable
            )),
            (this.DtHitEffect = a))
          : (this.DtHitEffect = this.Hte.Actor.DtHitEffect),
        0 !== t)
      ) {
        const s = e?.SkillDataTableMap.Get(t)?.ToAssetPathName();
        s &&
          0 < s.length &&
          "None" !== s &&
          ((i = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
            s,
            UE.DataTable
          )),
          (this.DtSkillInfoExtra = i));
        const r = (0, puerts_1.$ref)(void 0),
          h =
            (UE.DataTableFunctionLibrary.GetDataTableRowNames(
              this.DtSkillInfoExtra,
              r
            ),
            (0, puerts_1.$unref)(r));
        for (let t = 0; t < h.Num(); t++) {
          var d = Number(h.Get(t).toString()),
            c = this.GetSkillInfo(d);
          c && 0 === c.SkillLoadType && this.nen(d, DEFAULT_CD_TIME);
        }
        const u = e?.BulletDataTableMap.Get(t)?.ToAssetPathName(),
          v =
            (u &&
              0 < u.length &&
              "None" !== u &&
              ((a = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
                u,
                UE.DataTable
              )),
              (this.DtBulletInfoExtra = a)),
            e?.HitEffectTableMap.Get(t)?.ToAssetPathName());
        v &&
          0 < v.length &&
          "None" !== v &&
          ((i = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
            v,
            UE.DataTable
          )),
          (this.DtHitEffectExtra = i));
      }
    }
    ien() {
      var t = (0, puerts_1.$ref)(void 0),
        i =
          (UE.DataTableFunctionLibrary.GetDataTableRowNames(this.UZr, t),
          (0, puerts_1.$unref)(t));
      for (let t = 0; t < i.Num(); t++) {
        var e = Number(i.Get(t).toString()),
          s = this.GetSkillInfo(e);
        s && 0 === s.SkillLoadType && this.nen(e, DEFAULT_CD_TIME);
      }
      for (const o of ConfigManager_1.ConfigManager.WorldConfig.GetVisionCommonSkillRowNames()) {
        var r = Number(o),
          h = this.GetSkillInfo(r);
        h && 0 === h.SkillLoadType && this.nen(r, DEFAULT_CD_TIME);
      }
    }
    oen() {}
    nen(i, t) {
      var e = this.GetSkillInfo(i);
      if (e)
        if (this.LoadedSkills.has(i))
          CombatDebugController_1.CombatDebugController.CombatInfo(
            "Skill",
            this.Entity,
            "LoadSkill失败，重复加载技能",
            ["技能Id", i]
          );
        else
          try {
            var s = new Skill_1.Skill(),
              r =
                (s.Initialize(i, e, this),
                this.BZr && (s.GroupSkillCdInfo = this.BZr.InitSkillCd(s)),
                this.LoadedSkills.get(i));
            r ||
              (this.LoadedSkills.set(i, s),
              this.KZr.set(e.SkillName.toString(), s));
          } catch (t) {
            t instanceof Error
              ? CombatDebugController_1.CombatDebugController.CombatErrorWithStack(
                  "Skill",
                  this.Entity,
                  "加载技能异常",
                  t,
                  ["skillId", i],
                  ["skillId", e?.SkillName],
                  ["error", t.message]
                )
              : CombatDebugController_1.CombatDebugController.CombatError(
                  "Skill",
                  this.Entity,
                  "加载技能异常",
                  ["skillId", i],
                  ["skillId", e?.SkillName],
                  ["error", t]
                );
          }
      else
        CombatDebugController_1.CombatDebugController.CombatError(
          "Skill",
          this.Entity,
          "LoadSkill失败，找不到技能配置数据",
          ["技能Id", i]
        );
    }
    een() {
      ConfigManager_1.ConfigManager.BulletConfig.PreloadBulletData(this.Entity);
    }
    OnActivate() {
      var t,
        i,
        e = this.Entity.GetComponent(0).ComponentDataMap.get("pps")?.pps;
      if (!this.Hte.IsAutonomousProxy && e?.RMs)
        for (const s of e.RMs)
          s.T4n?.vkn &&
            ((t = MathUtils_1.MathUtils.LongToNumber(s.T4n.L4n)),
            (i = MathUtils_1.MathUtils.LongToBigInt(s.s4n)),
            this.SimulatedBeginSkill(
              s.T4n.vkn,
              t,
              s.T4n.D4n,
              0.001 * s.T4n.Skn
            )) &&
            (SkillMessageController_1.SkillMessageController.AddSkillMessageId(
              i
            ),
            0 <= s.M4n) &&
            this.SimulatePlayMontage(
              s.T4n.vkn,
              s.M4n,
              s.R4n,
              s.LMs,
              s.TMs / 1e3
            );
      return !0;
    }
    OnChangeTimeDilation(t) {
      var i = this.OHr.CurrentTimeScale;
      for (const e of this.GetAllActivatedSkill()) e.SetTimeDilation(i, t);
    }
    OnEnd() {
      if (
        (EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.CharOnEndPlay,
          this.bZr
        ),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.CharOnRoleDead,
          this.v$r
        ),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.RemoveEntity,
          this.zpe
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.TeleportStartEntity,
          this.Gfr
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharBeHitAnim,
          this.qZr
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharSwitchControl,
          this.OnSwitchControl
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.AiHateTargetChanged,
          this.kZr
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.RoleOnStateInherit,
          this.W3r
        ),
        this.IgnoreSocketName.clear(),
        this.VZr.Reset(),
        this.LoadedSkills)
      )
        for (const t of this.LoadedSkills.values()) t.Clear();
      return (
        this.LoadedSkills.clear(),
        (this.OZr = !1),
        (this.IsMainSkillReadyEnd = !0),
        (this.FZr = !1),
        (this.WZr = !1),
        (this.QZr = 0),
        (this.XZr = 0),
        (this.HZr = 0),
        (this.$Zr = 0),
        (this.LZr = !1),
        void 0 !== this.NZr &&
          (TimerSystem_1.TimerSystem.Remove(this.NZr), (this.NZr = void 0)),
        !0
      );
    }
    OnClear() {
      return !0;
    }
    AttachEffectToSkill(t, i, e, s) {
      var r, h;
      this.CheckIsLoaded() &&
        (r = this.CurrentSkill) &&
        ((h = this.OHr.CurrentTimeScale),
        EffectSystem_1.EffectSystem.SetTimeScale(t, h * this.TimeDilation),
        r.AttachEffect(t, i, e, s));
    }
    sen(t) {
      let i = 1;
      t = t.SkillInfo;
      return (
        0 === t.SkillGenre
          ? (i =
              1e-4 *
              this.eZr.GetCurrentValue(EAttributeId.Proto_AutoAttackSpeed))
          : 1 === t.SkillGenre &&
            (i =
              1e-4 *
              this.eZr.GetCurrentValue(EAttributeId.Proto_CastAttackSpeed)),
        (i = i <= 0 ? 1 : i)
      );
    }
    PlaySkillMontage(t, i, e, s, r) {
      var h = this.CurrentSkill;
      if (!h)
        return (
          CombatDebugController_1.CombatDebugController.CombatError(
            "Skill",
            this.Entity,
            "播放技能蒙太奇时，当前技能不存在",
            ["montageIndex", i]
          ),
          !1
        );
      if (h.IsSimulated)
        return (
          CombatDebugController_1.CombatDebugController.CombatError(
            "Skill",
            this.Entity,
            "播放技能蒙太奇时，当前技能是模拟技能",
            ["montageIndex", i]
          ),
          !1
        );
      if (t && this.Lie.HasTag(-1503953470)) return !1;
      this.mBe.ExitHitState("播放技能蒙太奇");
      (t = this.sen(h)), (r = h.PlayMontage(i, t, e, s, r));
      return (
        r &&
          SkillMessageController_1.SkillMessageController.MontageRequest(
            this.Entity,
            1,
            h.SkillId?.toString(),
            this.SkillTarget?.Id ?? 0,
            i,
            t,
            e,
            s,
            h.CombatMessageId,
            h.MontageContextId
          ),
        r
      );
    }
    EndOwnerAndFollowSkills() {
      this.StopAllSkills("CharacterSkillComponent.EndOwnerAndFollowSkills");
      var t = this.Entity.GetComponent(47)?.FollowIds;
      if (t)
        for (const e of t) {
          var i = EntitySystem_1.EntitySystem.Get(e)?.GetComponent(33);
          i &&
            i.StopAllSkills("CharacterSkillComponent.EndOwnerAndFollowSkills");
        }
    }
    StopAllSkills(t) {
      if (this.CheckIsLoaded())
        for (const i of this.GetAllActivatedSkill()) this.aen(i, t);
    }
    StopGroup1Skill(t) {
      var i;
      this.CheckIsLoaded() && (i = this.CurrentSkill) && this.aen(i, t);
    }
    EndSkill(t, i) {
      this.CheckIsLoaded() &&
        (t = this.LoadedSkills.get(t))?.Active &&
        this.hen(t, i);
    }
    len(t, i, e) {
      var s = t.SkillInfo.GroupId,
        r = t.SkillInfo.InterruptLevel;
      return this._en(s, r, i, e, t);
    }
    CheckJumpCanInterrupt() {
      return this._en(exports.SKILL_GROUP_MAIN, CharacterSkillComponent_1.JZr);
    }
    CheckGlideCanInterrupt() {
      return this._en(exports.SKILL_GROUP_MAIN, CharacterSkillComponent_1.zZr);
    }
    _en(t, i, e = [], s = [], r) {
      let h = !0;
      if (t === exports.SKILL_GROUP_MAIN) {
        var o,
          l,
          n,
          a = this.CurrentSkill;
        a &&
          ((_ = (o = a.SkillInfo).InterruptLevel < i),
          (l = o.InterruptLevel === i && this.OZr),
          (n = this.IsMainSkillReadyEnd),
          _ || l || n
            ? e.push(a)
            : ((h = !1),
              s.push(o.InterruptLevel.toString()),
              s.push(i.toString()),
              s.push(this.OZr.toString()),
              s.push(this.IsMainSkillReadyEnd.toString())));
      } else {
        var _ = this.DZr.get(t);
        if (_)
          for (const C of _) {
            if (this.IsSkillInCd(C.SkillId)) {
              (h = !1), s.push(`技能${C.SkillId}处于CD中`);
              break;
            }
            C === r && e.push(C);
          }
      }
      return h || (e.length = 0), h;
    }
    aen(t, i) {
      t?.Active &&
        (t.IsSimulated
          ? this.SimulateEndSkill(t.SkillId)
          : (EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.CharInterruptSkill,
              this.Entity.Id,
              t.SkillId
            ),
            this.hen(t, i)));
    }
    hen(t, i) {
      CombatDebugController_1.CombatDebugController.CombatInfo(
        "Skill",
        this.Entity,
        "CharacterSkillComponent.RequestEndSkill",
        ["结束技能ID", t.SkillId],
        ["结束技能名称", t.SkillName],
        ["Reason", i],
        ["CanInterrupt", this.OZr],
        ["ReadyEnd", this.IsMainSkillReadyEnd],
        ["InterruptLevel", t.SkillInfo.InterruptLevel]
      ),
        this.BZr?.ResetMultiSkills(t.SkillId),
        this.BZr?.ResetCdDelayTime(t.SkillId);
      i = t.SkillInfo.SkillMode;
      1 === i
        ? t.ActiveAbility?.IsValid()
          ? t.ActiveAbility.K2_EndAbility()
          : CombatDebugController_1.CombatDebugController.CombatError(
              "Skill",
              this.Entity,
              "[CharacterSkillComponent.RequestEndSkill]技能结束失败，找不到GA（判断一下是否被动GA，如果是，不能主动执行）",
              ["技能ID", t.SkillId],
              ["技能名称", t.SkillName]
            )
        : 0 === i && t.RequestStopMontage();
    }
    IsSkillGenreForbidden(t) {
      switch (t.SkillGenre) {
        case 0:
          return this.Lie.HasTag(866007727);
        case 1:
          return this.Lie.HasTag(443489183);
        case 2:
          return this.Lie.HasTag(495657548);
        case 3:
          return this.Lie.HasTag(-592555498);
        case 4:
        case 5:
          break;
        case 6:
          return this.Lie.HasTag(-1390464883);
        case 7:
          return this.Lie.HasTag(1072084846);
        case 8:
          break;
        case 9:
          return this.Lie.HasTag(1195493782);
        case 10:
          return this.Lie.HasTag(283451623);
        case 11:
          return this.Lie.HasTag(-1936884442);
      }
      return !1;
    }
    uen(t, i) {
      var e,
        s = t.SkillInfo;
      return this.Hte.IsAutonomousProxy || s.AutonomouslyBySimulate
        ? this.Lie.HasTag(-1388400236)
          ? "角色处于不可控制状态"
          : this.Lie.HasTag(1008164187)
          ? "角色处于死亡状态"
          : this.PZr?.IsFrozen()
          ? "角色处于冰冻状态"
          : this.IsSkillGenreForbidden(s)
          ? "该类别技能被临时禁止"
          : 8 === s.SkillGenre
          ? "不能主动调用被动技能"
          : t.AbilityClass &&
            t.AbilityClass.IsChildOf(UE.Ga_Passive_C.StaticClass())
          ? "策划可能误把被动GA放在普攻0技能组里"
          : this.IsSkillInCd(t.SkillId)
          ? "技能处于CD中"
          : 0 !== s.StrengthCost &&
            FormationAttributeController_1.FormationAttributeController.GetValue(
              1
            ) <= 1
          ? "体力不足"
          : this.BZr?.IsMultiSkill(t.SkillInfo) &&
            !this.BZr.CanStartMultiSkill(t)
          ? "多段技能启动失败"
          : ((s = this.SIe.GetEntityType()),
            (e = this.bre?.AiController?.IsWaitingSwitchControl()),
            s === Protocol_1.Aki.Protocol.HBs.Proto_Monster &&
            !t.SkillInfo.AutonomouslyBySimulate &&
            e
              ? "在等待切换控制权期间，不允许释放普通技能"
              : this.len(t, i, (s = []))
              ? ""
              : "技能打断失败[" + s.join(",") + "]")
        : "非主控无权限释放技能";
    }
    cen(t) {
      var i;
      return (
        !this.LoadedSkills.has(t) &&
          PreloadDefine_1.PreloadSetting.UseNewPreload &&
          ((i = this.Entity.GetComponent(194)).LoadSkillAsync(t),
          i.FlushSkill(t),
          this.nen(t, DEFAULT_CD_TIME),
          CombatDebugController_1.CombatDebugController.CombatInfo(
            "Skill",
            this.Entity,
            "CharacterSkillComponent.赋予技能",
            ["技能Id", t]
          )),
        this.LoadedSkills.get(t)
      );
    }
    BeginSkill(t, i = {}) {
      if (!ModManager_1.ModManager.Settings.NoCD) {
        if (!this.CheckIsLoaded()) return !1;
      }
      const e = this.cen(t);
      if (!e)
        return (
          CombatDebugController_1.CombatDebugController.CombatError(
            "Skill",
            this.Entity,
            "BeginSkill使用了不存在的技能",
            ["技能Id", t]
          ),
          !1
        );
      CombatDebugController_1.CombatDebugController.CombatInfo(
        "Skill",
        this.Entity,
        "CharacterSkillComponent.BeginSkill",
        ["技能Id", t],
        ["技能名", e.SkillName],
        ["上下文", i.Context]
      );
      var s = [],
        r = this.uen(e, s);
      if (r)
        return (
          CombatDebugController_1.CombatDebugController.CombatInfo(
            "Skill",
            this.Entity,
            "CharacterSkillComponent.CheckSkillCanBegin条件不满足",
            ["技能Id", t],
            ["技能名", e.SkillName],
            ["当前技能", this.CurrentSkill?.SkillId],
            ["当前技能名", this.CurrentSkill?.SkillName],
            ["原因", r]
          ),
          !1
        );
      s.forEach((t) => {
        this.aen(t, "开始新技能");
      });
      var r = this.GetSkillInfo(t),
        s = this.Hte?.IsAutonomousProxy ?? !1,
        h = this.StateMachineComp?.StateMachineGroup?.IsCurrentTaskSkill(t);
      if (this.FightStateComp && r.GroupId === exports.SKILL_GROUP_MAIN && !h) {
        h = this.FightStateComp.TrySwitchSkillState(e.SkillInfo, !0);
        if (!h)
          return (
            CombatDebugController_1.CombatDebugController.CombatInfo(
              "Skill",
              this.Entity,
              "技能释放失败，状态不满足",
              ["技能Id", t],
              ["技能名", e.SkillName]
            ),
            !1
          );
        e.FightStateHandle = h;
      } else e.FightStateHandle = 0;
      this.men(i.Target, i.SocketName, r.SkillTarget),
        (e.PreContextId = i.ContextId),
        EventSystem_1.EventSystem.EmitWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharBeforeSkillWithTarget,
          t,
          s
        );
      h = r.SkillMode;
      if (1 === h) {
        if (
          ((this.AZr = e),
          CombatDebugController_1.CombatDebugController.CombatDebug(
            "Skill",
            this.Entity,
            "GASkill TryActivateAbilityByClass",
            ["技能Id", t],
            ["技能名", e.SkillName],
            ["GaClass", e.AbilityClass?.GetName()]
          ),
          !this.Szo.TryActivateAbilityByClass(e.AbilityClass, !0))
        )
          return (
            CombatDebugController_1.CombatDebugController.CombatError(
              "Skill",
              this.Entity,
              "执行GA失败!:",
              ["技能Id:", e.SkillId],
              ["技能名", e.SkillName],
              ["GaClass:", e.AbilityClass?.GetName()]
            ),
            (this.AZr = void 0),
            (this.SkillTarget = void 0),
            (this.SkillTargetSocket = ""),
            !1
          );
      } else
        0 === h &&
          (this.den(e),
          e.HasMontages
            ? (CombatDebugController_1.CombatDebugController.CombatDebug(
                "Skill",
                this.Entity,
                "SimpleSkill PlaySkillMontage",
                ["技能Id", e.SkillId],
                ["技能名", e.SkillName]
              ),
              this.PlaySkillMontage(!1, 0, "", 0, () => {
                CombatDebugController_1.CombatDebugController.CombatDebug(
                  "Skill",
                  this.Entity,
                  "PlaySkillMontage onCompleted",
                  ["技能Id", e.SkillId],
                  ["技能名", e.SkillName]
                ),
                  this.DoSkillEnd(e);
              }))
            : (CombatDebugController_1.CombatDebugController.CombatInfo(
                "Skill",
                this.Entity,
                "SimpleSkill No Montage",
                ["技能Id", e.SkillId],
                ["技能名", e.SkillName]
              ),
              this.DoSkillEnd(e)));
      r.AutonomouslyBySimulate &&
        this.Hte.SetMoveControlled(!0, r.MoveControllerTime, "特殊技能");
      i = this.Entity.Id;
      return (
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.CharUseSkill,
          i,
          e.SkillId,
          s
        ),
        SceneTeamController_1.SceneTeamController.EmitEvent(
          this.Entity,
          EventDefine_1.EEventName.CharUseSkill,
          i,
          e.SkillId,
          s
        ),
        EventSystem_1.EventSystem.EmitWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharRecordOperate,
          this.SkillTarget,
          e.SkillId,
          r.SkillGenre
        ),
        this.zJo?.TriggerEvents(2, this.zJo, {
          SkillId: Number(e.SkillId),
          SkillGenre: r.SkillGenre,
        }),
        !0
      );
    }
    Cen(t, i) {
      return (
        !this.eZr.IsDeathInternal ||
        (Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Battle",
            20,
            "[CBT2临时处理]角色处于死亡中，暂不接受远端通知释放技能。",
            ["skillId", t.SkillId],
            ["entity", this.Entity.toString()]
          ),
        !1)
      );
    }
    SimulatedBeginSkill(t, i, e = !1, s = 0, r = BigInt(0)) {
      var h = this.cen(t);
      if (!h)
        return (
          CombatDebugController_1.CombatDebugController.CombatError(
            "Skill",
            this.Entity,
            "远端释放不存在的技能",
            ["技能Id", t]
          ),
          !1
        );
      if (
        h.AbilityClass &&
        h.AbilityClass.IsChildOf(UE.Ga_Passive_C.StaticClass())
      )
        return (
          CombatDebugController_1.CombatDebugController.CombatWarn(
            "Skill",
            this.Entity,
            "被动技能不模拟",
            ["技能Id", t]
          ),
          !1
        );
      if (
        (h.Active &&
          h.IsSimulated &&
          CombatDebugController_1.CombatDebugController.CombatWarn(
            "Skill",
            this.Entity,
            "重复释放远端技能",
            ["技能Id", t]
          ),
        !this.Cen(h, e))
      )
        return !1;
      var o = h.SkillInfo,
        l = this.StateMachineComp?.StateMachineGroup?.IsCurrentTaskSkill(t);
      if (
        this.FightStateComp &&
        h.SkillInfo.GroupId === exports.SKILL_GROUP_MAIN &&
        !l
      ) {
        l = this.FightStateComp.TrySwitchSkillState(h.SkillInfo, !1);
        if (!l) return !1;
        h.FightStateHandle = l;
      } else h.FightStateHandle = 0;
      return (
        CombatDebugController_1.CombatDebugController.CombatInfo(
          "Skill",
          this.Entity,
          "执行远端技能",
          ["技能Id", t],
          ["技能名", h.SkillName],
          ["特殊技能", e],
          ["打断等级", o.InterruptLevel]
        ),
        e &&
          (this.CurrentSkill && this.aen(this.CurrentSkill, "远端特殊技能"),
          this.Hte.SetMoveControlled(!1, s, "远端特殊技能")),
        this.Entity.GetComponent(158).ExitHitState("远端释放技能"),
        this.gen(o.GroupId, h),
        h.SimulatedBeginSkill(r),
        (this.IsMainSkillReadyEnd = !1),
        (this.SkillTarget =
          ModelManager_1.ModelManager.CreatureModel.GetEntity(i)),
        !0
      );
    }
    SimulateEndSkill(t) {
      var i = this.LoadedSkills.get(t);
      i
        ? i.Active && i.IsSimulated
          ? (CombatDebugController_1.CombatDebugController.CombatInfo(
              "Skill",
              this.Entity,
              "结束远端技能",
              ["技能Id", t],
              ["技能名", i.SkillName]
            ),
            this.fen(i.SkillInfo.GroupId, i),
            i.EndSkill(),
            (this.IsMainSkillReadyEnd = !1),
            i.SkillInfo.AutonomouslyBySimulate &&
              this.Hte.ResetMoveControlled("模拟端结束特殊技能"),
            SceneTeamController_1.SceneTeamController.EmitEvent(
              this.Entity,
              EventDefine_1.EEventName.OnSkillEnd,
              this.Entity.Id,
              i.SkillId
            ),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnSkillEnd,
              this.Entity.Id,
              t
            ))
          : CombatDebugController_1.CombatDebugController.CombatWarn(
              "Skill",
              this.Entity,
              "结束远端技能失败，技能未激活或非模拟执行",
              ["技能Id", t],
              ["技能名", i.SkillName]
            )
        : CombatDebugController_1.CombatDebugController.CombatError(
            "Skill",
            this.Entity,
            "远端结束不存在的技能",
            ["技能Id", t]
          );
    }
    OnActivateAbility(t, i) {
      if (t.IsA(UE.Ga_Passive_C.StaticClass())) {
        const e = this.wxn.get(t.GetClass());
        return (
          e
            ? (((s = t).当前技能数据名 = e.toString()), (s.SkillId = e))
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Battle",
                36,
                "被动GA没找到skillId",
                ["skillId", e],
                ["ga", t.GetName()]
              ),
          -1
        );
      }
      if (!this.AZr)
        return (
          CombatDebugController_1.CombatDebugController.CombatError(
            "Skill",
            this.Entity,
            "GA已启动，但没有找到对应技能",
            ["GA", t.GetName()]
          ),
          -1
        );
      CombatDebugController_1.CombatDebugController.CombatDebug(
        "Skill",
        this.Entity,
        "CharacterSkillComponent.OnActivateAbility",
        ["技能Id", this.AZr.SkillId],
        ["GA", t.GetName()]
      ),
        (this.AZr.ActiveAbility = t);
      const e = this.AZr.SkillId;
      var s;
      return (
        t.IsA(UE.GA_Base_C.StaticClass()) &&
          (((s = t).当前技能数据 = this.AZr.SkillInfo),
          (s.当前技能数据名 = this.AZr.SkillId.toString()),
          (s.SkillId = e)),
        this.den(this.AZr),
        (this.AZr = void 0),
        e
      );
    }
    OnEndAbility(t, i) {
      for (const e of this.GetAllActivatedSkill())
        if (e.ActiveAbility === t) return void this.DoSkillEnd(e);
      CombatDebugController_1.CombatDebugController.CombatWarn(
        "Skill",
        this.Entity,
        "[CharacterSkillComponent.OnEndAbility]GA已结束，但没有找到对应技能",
        ["GA", t.GetName()]
      );
    }
    men(t, i, e) {
      t
        ? ((this.SkillTarget =
            t instanceof Entity_1.Entity
              ? ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(t)
              : ActorUtils_1.ActorUtils.GetEntityByActor(t)),
          (this.SkillTargetSocket = i ?? ""))
        : this.xZr?.Valid
        ? this.SelectTargetAndSetShow(e)
        : (this.bre?.Valid
            ? (this.SkillTarget =
                this.bre.AiController.AiHateList.GetCurrentTarget())
            : (this.SkillTarget = void 0),
          (this.SkillTargetSocket = ""));
    }
    SelectTargetAndSetShow(t) {
      this.xZr?.Valid &&
        (this.xZr.SelectSoftLockTarget(
          t.LockOnConfigId,
          t.SkillTargetDirection,
          t.SkillTargetPriority,
          t.ShowTarget
        ),
        (this.SkillTarget = this.xZr.GetCurrentTarget()),
        (this.SkillTargetSocket = this.xZr.GetCurrentTargetSocketName()));
    }
    den(t) {
      if (!this.RZr.has(t.SkillId)) {
        this.RZr.add(t.SkillId),
          CombatDebugController_1.CombatDebugController.CombatDebug(
            "Skill",
            this.Entity,
            "CharacterSkillComponent.DoSkillBegin",
            ["技能Id", t.SkillId],
            ["技能名", t.SkillName]
          );
        var i = this.GetSkillInfo(t.SkillId),
          e =
            (t.BeginSkill(),
            this.gen(i.GroupId, t),
            SkillMessageController_1.SkillMessageController.UseSkillRequest(
              this.Entity,
              t,
              this.SkillTarget?.Id ?? 0
            ),
            this.pen(t),
            // hmmm this should fix stamina depleting so fast while dashing
            // you can put 0 but thats gonna hide the stamina ui due to unchanged value which is sad xD -0.5 for asthetics
            // it seems like this a direct write of the cost xD cant use i.StrengthCost as original value
            // (i.StrengthCost = (ModManager_1.ModManager.Settings.InfiniteStamina ? 0 : -1500)),
            this.BZr?.IsMultiSkill(t.SkillInfo) &&
            this.BZr.StartMultiSkill(t, !1),
            (ModManager_1.ModManager.Settings.NoCD ? 0 : this.BZr?.StartCd(t.SkillId)),
            0 < Math.abs(i.StrengthCost) &&
              //Better set in on here to hide stamina maybe
              FormationAttributeController_1.FormationAttributeController.AddValue(
                1,
                ModManager_1.ModManager.Settings.InfiniteStamina
                  ? 0
                  : i.StrengthCost
              ),
            this.GetSkillLevelBySkillInfoId(t.SkillId));
        if (
          (i.GroupId === exports.SKILL_GROUP_MAIN &&
            (this.IsMainSkillReadyEnd = !1),
          t.BeginSkillBuffAndTag(e),
          this.mBe.ExitHitState("释放技能"),
          t.HasAnimTag || this.mBe.ExitAimStatus(),
          this.xZr?.Valid)
        )
          switch (i.SkillTarget.SkillTargetDirection) {
            case 0:
              this.SkillTarget?.Valid ? this.ven() : this.Men();
              break;
            case 1:
              this.Men();
              break;
            case 3:
              this.Sen();
          }
        if (
          (i.WalkOffLedge && this.Gce.SetWalkOffLedgeRecord(!1),
          exports.SKILL_GROUP_MAIN === i.GroupId)
        ) {
          this.Gce &&
            6 === this.Gce.CharacterMovement.MovementMode &&
            ((e = this.Gce.CharacterMovement.CustomMovementMode) ===
            CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_GLIDE
              ? (i = this.Entity.GetComponent(50)).Valid && i.ExitGlideState()
              : e === CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SOAR &&
                (i = this.Entity.GetComponent(50)).Valid &&
                i.ExitSoarState());
          var s,
            e = this.mBe.MoveState;
          switch (e) {
            case CharacterUnifiedStateTypes_1.ECharMoveState.Sprint:
              this.Lie.HasTag(-1800191060) ||
                (this.Lie.RemoveTag((s = 388142570)),
                this.zJo.RemoveBuffByTag(s, `技能${t.SkillId}结束移动`),
                this.mBe.SetMoveState(
                  CharacterUnifiedStateTypes_1.ECharMoveState.Run
                ));
              break;
            case CharacterUnifiedStateTypes_1.ECharMoveState.WalkStop:
            case CharacterUnifiedStateTypes_1.ECharMoveState.RunStop:
            case CharacterUnifiedStateTypes_1.ECharMoveState.SprintStop:
              this.mBe.SetMoveState(
                CharacterUnifiedStateTypes_1.ECharMoveState.Stand
              );
          }
        }
        (this.Gce.CharacterMovement.OverrideTerminalVelocity = 99999),
          this.Gce.SetFallingHorizontalMaxSpeed(99999),
          this.RZr.delete(t.SkillId);
      }
    }
    DoSkillEnd(t) {
      var i;
      this.RZr.has(t.SkillId) ||
        (this.RZr.add(t.SkillId),
        CombatDebugController_1.CombatDebugController.CombatInfo(
          "Skill",
          this.Entity,
          "CharacterSkillComponent.DoSkillEnd",
          ["技能Id", t.SkillId],
          ["技能名", t.SkillName]
        ),
        (i = t.SkillInfo),
        this.Een(t),
        i.GroupId === exports.SKILL_GROUP_MAIN &&
          ((this.OZr = !1), (this.IsMainSkillReadyEnd = !0), (this.$Zr = 0)),
        i.WalkOffLedge && this.Gce.SetWalkOffLedgeRecord(!0),
        (this.Gce.CharacterMovement.OverrideTerminalVelocity = 0),
        this.Gce.ClearFallingHorizontalMaxSpeed(),
        this.fen(i.GroupId, t),
        t.EndSkill(),
        this.zJo.HasBuffAuthority() &&
          this.zJo.RemoveBuff(CharacterBuffIds_1.buffId.GoDown, -1, "技能结束"),
        this.Lie.HasTag(interruptTag) && this.Lie.RemoveTag(interruptTag),
        SkillMessageController_1.SkillMessageController.EndSkillRequest(
          this.Entity,
          t.SkillId
        ),
        SceneTeamController_1.SceneTeamController.EmitEvent(
          this.Entity,
          EventDefine_1.EEventName.OnSkillEnd,
          this.Entity.Id,
          t.SkillId
        ),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnSkillEnd,
          this.Entity.Id,
          t.SkillId
        ),
        this.zJo?.TriggerEvents(3, this.zJo, {
          SkillId: Number(t.SkillId),
          SkillGenre: i.SkillGenre,
        }),
        this.RZr.delete(t.SkillId));
    }
    PlaySkillMontage2Server(t, i, e, s, r) {
      t = this.LoadedSkills.get(t);
      t &&
        (ModelManager_1.ModelManager.CombatMessageModel.RemoveCombatContext(
          t.MontageContextId
        ),
        (t.MontageContextId =
          ModelManager_1.ModelManager.CombatMessageModel.CreateMontageContext(
            t.SkillId,
            i
          )),
        SkillMessageController_1.SkillMessageController.MontageRequest(
          this.Entity,
          1,
          t.SkillId?.toString(),
          this.SkillTarget?.Id ?? 0,
          i,
          e,
          s,
          r,
          t.CombatMessageId,
          t.MontageContextId
        ));
    }
    EndSkillMontage(t, i) {
      var e,
        s = this.LoadedSkills.get(t);
      s &&
        (e = ModelManager_1.ModelManager.CombatMessageModel.GetCombatContext(
          s.MontageContextId
        )?.v4n) &&
        e.vkn === t &&
        e.M4n === i &&
        (ModelManager_1.ModelManager.CombatMessageModel.RemoveCombatContext(
          s.MontageContextId
        ),
        (s.MontageContextId = void 0));
    }
    SimulatePlayMontage(t, i = 0, e = 1, s = "", r = 0) {
      t = this.LoadedSkills.get(t);
      t && t.PlayMontage(i, e, s, r);
    }
    RollingGrounded() {
      var t = this.Entity.GetComponent(33);
      t.Valid &&
        ((t.IsMainSkillReadyEnd = !1),
        (this.NZr = TimerSystem_1.TimerSystem.Delay(
          this.GZr,
          ROLLING_GROUNDED_RECOVER_TIME
        ))),
        this.mBe.PositionState ===
          CharacterUnifiedStateTypes_1.ECharPositionState.Ground &&
          this.mBe.SetMoveState(
            CharacterUnifiedStateTypes_1.ECharMoveState.LandRoll
          );
    }
    IsSkillInCd(t) {
      if (ModManager_1.ModManager.Settings.NoCD) return false;
      return !!this.BZr && this.BZr.IsSkillInCd(t);
    }
    GetCurrentMontageCorrespondingSkillId() {
      var t,
        i,
        e = this.Szo?.GetCurrentWaitAndPlayedMontageCorrespondingGa();
      for ([t, i] of this.LoadedSkills)
        if (i.Active && i.ActiveAbility === e) return t;
      return (
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Character", 23, "不存在该GA的技能", [
            "玩家id",
            this.Entity.Id,
          ]),
        0
      );
    }
    get SkillAcceptInput() {
      return this.OZr;
    }
    SetSkillAcceptInput(t) {
      (this.OZr = t),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.SkillAcceptChanged,
          this.CurrentSkill?.SkillId ?? 0,
          this.OZr
        );
    }
    xDn() {
      var t = this.CurrentSkill;
      t &&
        (t.SkillInfo.SkillTarget.TargetDied
          ? (this.xZr?.Valid &&
              this.SelectTargetAndSetShow(t.SkillInfo.SkillTarget),
            this.bre?.Valid &&
              (t = this.bre.AiController.AiHateList.GetCurrentTarget()) &&
              t.Id !== this.SkillTarget?.Id &&
              (this.SkillTarget =
                ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(
                  t.Entity
                )))
          : ((this.SkillTarget = void 0), (this.SkillTargetSocket = "")));
    }
    GetTargetTransform() {
      var i = this.SkillTarget.Entity.GetComponent(0).GetEntityType();
      if (
        i !== Protocol_1.Aki.Protocol.HBs.Proto_Player &&
        i !== Protocol_1.Aki.Protocol.HBs.Proto_Npc &&
        i !== Protocol_1.Aki.Protocol.HBs.Proto_Monster &&
        i !== Protocol_1.Aki.Protocol.HBs.Proto_Vision
      )
        return this.SkillTarget.Entity.GetComponent(1).ActorTransform;
      {
        let t = this.SkillTargetSocket;
        t = t || HIT_CASE_SOCKET_NAME;
        var i = this.SkillTarget.Entity.GetComponent(3),
          e = i.Actor.Mesh,
          s = FNameUtil_1.FNameUtil.GetDynamicFName(t);
        return e?.DoesSocketExist(s)
          ? e.GetSocketTransform(s, 0)
          : i.ActorTransform;
      }
    }
    GetTargetDistance() {
      var t;
      return this.SkillTarget && (t = this.GetTargetTransform())
        ? (this.Lz.FromUeVector(t.GetLocation()),
          Vector_1.Vector.Dist(this.Hte.ActorLocationProxy, this.Lz))
        : -1;
    }
    SetSkillCanRotate(t) {
      (this.FZr = t) || this.VZr.Reset();
    }
    SetSkillRotateSpeed(t) {
      this.HZr = t;
    }
    SetRotateTarget(t, i) {
      (this.jZr.Target = t), (this.jZr.Type = i);
    }
    SetSkillRotateToTarget(t, i, e, s = 0, r = 0) {
      (this.WZr = t),
        (this.VZr.IsUseAnsRotateOffset = i),
        (this.VZr.AnsRotateOffset.Yaw = -MathUtils_1.MathUtils.Clamp(
          e,
          -MathUtils_1.PI_DEG,
          MathUtils_1.PI_DEG
        )),
        (this.VZr.PauseRotateThreshold = s),
        (this.VZr.ResumeRotateThreshold = r);
    }
    SetIgnoreSocketName(t) {
      this.IgnoreSocketName.add(t.toString());
    }
    DeleteIgnoreSocketName(t) {
      this.IgnoreSocketName.delete(t.toString());
    }
    Men() {
      this.Hte.IsAutonomousProxy &&
        this.IsHasInputDir() &&
        (this.Gue.FromUeRotator(this.yen()),
        this.Z_e.Set(
          this.Hte.ActorLocationProxy,
          this.Gue.Quaternion(),
          this.Hte.ActorScaleProxy
        ),
        this.Hte.SetActorTransform(
          this.Z_e.ToUeTransform(),
          "释放技能.转向输入方向",
          !1,
          1
        ));
    }
    IsHasInputDir() {
      var t;
      return (
        !!this.CheckIsLoaded() &&
        ((t = this.Hte.InputDirectProxy),
        0 < Math.abs(t.X) || 0 < Math.abs(t.Y))
      );
    }
    Sen() {
      this.Gue.FromUeRotator(
        Global_1.Global.CharacterCameraManager.GetCameraRotation()
      ),
        this.Gue.Vector(this.Lz),
        MathUtils_1.MathUtils.LookRotationUpFirst(
          this.Lz,
          Vector_1.Vector.UpVectorProxy,
          this.Gue
        ),
        this.Z_e.Set(
          this.Hte.ActorLocationProxy,
          this.Gue.Quaternion(),
          this.Hte.ActorScaleProxy
        ),
        this.Hte.SetActorTransform(
          this.Z_e.ToUeTransform(),
          "释放技能.转向摄像机方向",
          !1,
          1
        );
    }
    ven() {
      this.SkillTarget &&
        (this.Lz.FromUeVector(this.GetTargetTransform().GetLocation()),
        this.Lz.SubtractionEqual(this.Hte.ActorLocationProxy),
        MathUtils_1.MathUtils.LookRotationUpFirst(
          this.Lz,
          Vector_1.Vector.UpVectorProxy,
          this.Gue
        ),
        this.Hte.SetActorRotation(
          this.Gue.ToUeRotator(),
          "释放技能.转向技能目标",
          !1
        ));
    }
    yen() {
      return this.Hte.InputRotator;
    }
    UpdateAllSkillRotator(t) {
      if (!this.CheckIsLoaded() || !this.Gce) return !1;
      if (this.Lie.HasTag(504239013)) return !1;
      if (!this.FZr) return !1;
      if (!this.Hte.IsMoveAutonomousProxy) return !1;
      var i = Math.abs(this.HZr);
      if (this.WZr) {
        var e = this.Ien();
        if (!e) return !1;
        MathUtils_1.MathUtils.LookRotationUpFirst(
          e,
          Vector_1.Vector.UpVectorProxy,
          this.Gue
        ),
          this.Gce.SmoothCharacterRotation(
            this.Gue,
            i,
            t,
            !1,
            "Skill.UpdateAllSkillRotator"
          );
      } else
        this.Gce.SmoothCharacterRotation(
          this.yen(),
          i,
          t,
          !1,
          "Skill.UpdateAllSkillRotator"
        );
      return !0;
    }
    Ien() {
      var i = this.Hte.ActorLocationProxy;
      switch (this.jZr.Type) {
        case 0:
          return this.SkillTarget
            ? ((e = this.SkillTarget.Entity.CheckGetComponent(1)),
              this.Den(e, i))
            : void 0;
        case 1:
          var e = this.jZr.Target;
          return this.Dxr.DeepCopy(e), this.Dxr.SubtractionEqual(i), this.Dxr;
        case 2:
          var e = this.jZr.Target;
          return this.Dxr.DeepCopy(e), this.Dxr;
        case 3:
        case 6: {
          let t = void 0;
          return (t =
            3 === this.jZr.Type
              ? BlackboardController_1.BlackboardController.GetEntityIdByEntity(
                  this.Entity.Id,
                  this.jZr.Target
                )
              : BlackboardController_1.BlackboardController.GetIntValueByEntity(
                  this.Entity.Id,
                  this.jZr.Target
                ))
            ? ((e = EntitySystem_1.EntitySystem.Get(t).CheckGetComponent(1)),
              this.Dxr.DeepCopy(e.ActorLocationProxy),
              this.Dxr.SubtractionEqual(i),
              this.Dxr)
            : void 0;
        }
        case 4:
          e =
            BlackboardController_1.BlackboardController.GetVectorValueByEntity(
              this.Entity.Id,
              this.jZr.Target
            );
          return e
            ? (this.Dxr.DeepCopy(e), this.Dxr.SubtractionEqual(i), this.Dxr)
            : void 0;
        case 5:
          e =
            BlackboardController_1.BlackboardController.GetVectorValueByEntity(
              this.Entity.Id,
              this.jZr.Target
            );
          return e ? (this.Dxr.DeepCopy(e), this.Dxr) : void 0;
        default:
          return;
      }
    }
    Den(t, i) {
      var e = this.CurrentSkill;
      let s = void 0;
      (s = e ? this.GetTargetTransform() : s)
        ? this.Dxr.FromUeVector(s.GetLocation())
        : this.Dxr.DeepCopy(t.ActorLocationProxy),
        this.Dxr.SubtractionEqual(i),
        this.Dxr.Normalize(),
        this.VZr.IsUseAnsRotateOffset &&
          0 !== this.VZr.AnsRotateOffset.Yaw &&
          ((this.Dxr.Z = 0),
          this.VZr.AnsRotateOffset.Quaternion().RotateVector(
            this.Dxr,
            this.Dxr
          ));
      (e = this.Hte.ActorForwardProxy),
        (t = Math.abs(MathUtils_1.MathUtils.GetAngleByVectorDot(this.Dxr, e)));
      return (
        this.VZr.IsPaused
          ? 0 < this.VZr.ResumeRotateThreshold &&
            (t < this.VZr.ResumeRotateThreshold
              ? this.Dxr.DeepCopy(e)
              : (this.VZr.IsPaused = !1))
          : 0 < this.VZr.PauseRotateThreshold &&
            t < this.VZr.PauseRotateThreshold &&
            ((this.VZr.IsPaused = !0), this.Dxr.DeepCopy(e)),
        this.Dxr
      );
    }
    GetPointTransform(t) {
      var i;
      return this.CheckIsLoaded() &&
        (i = this.Hte.Actor.Mesh)?.DoesSocketExist(t)
        ? i.GetSocketTransform(t, 0)
        : void 0;
    }
    GetSkillByName(t) {
      return this.KZr.get(t);
    }
    get SkillElevationAngle() {
      return this.QZr;
    }
    SetSkillElevationAngle(t) {
      this.QZr = t;
    }
    get LastActivateSkillTime() {
      return this.XZr;
    }
    SetLastActivateSkillTime(t) {
      this.XZr = t;
    }
    get CurrentPriority() {
      return this.$Zr;
    }
    SetCurrentPriority(t) {
      this.$Zr = t;
    }
    HasAbility(t) {
      return !!this.CheckIsLoaded() && this.LoadedSkills.has(t);
    }
    SetSkillPriority(t, i) {
      this.CheckIsLoaded() &&
        (t = this.LoadedSkills.get(t))?.Active &&
        t.SetSkillPriority(i);
    }
    CallAnimBreakPoint() {
      this.CheckIsLoaded() &&
        (this.Lie.HasTag(interruptTag) || this.Lie.AddTag(interruptTag),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.CharAnimBreakPoint,
          this.Entity.Id
        ));
    }
    GetActivePriority(t) {
      return this.CheckIsLoaded() && (t = this.LoadedSkills.get(t))?.Active
        ? t.SkillInfo.InterruptLevel
        : -1;
    }
    GetSkillMontageInstance(t, i) {
      if (this.CheckIsLoaded()) {
        t = this.LoadedSkills.get(t);
        if (t) return t.GetMontageByIndex(i);
      }
    }
    IsCanUseSkill(t) {
      if (ModManager_1.ModManager.Settings.NoCD) return true;
      var i;
      return (
        !!this.CheckIsLoaded() &&
        !(
          !(i = this.GetSkillInfo(t)) ||
          this.IsSkillInCd(t) ||
          !this._en(i.GroupId, i.InterruptLevel) ||
          this.IsSkillGenreForbidden(i)
        )
      );
    }
    ResetRoleGrowComponent(t) {
      this.wZr || (this.wZr = t);
    }
    GetSkillLevelBySkillInfoId(t) {
      return this.wZr
        ? this.wZr.GetSkillLevelBySkillInfoId(t)
        : CharacterAbilityComponent_1.DEFAULT_SOURCE_SKILL_LEVEL;
    }
    GetSkillIdWithGroupId(t) {
      return this.DZr.get(t)?.[SKILL_GROUP_INDEX]?.SkillId ?? 0;
    }
    pen(t) {
      var i = { Entity: this.Entity, SkillComponent: this, Skill: t },
        e = this.GetSkillInfo(t.SkillId);
      for (let t = 0; t < e.SkillBehaviorGroup.Num(); t++) {
        var s = e.SkillBehaviorGroup.Get(t);
        if (
          SkillBehaviorCondition_1.SkillBehaviorCondition.Satisfy(
            s.SkillBehaviorConditionGroup,
            i
          )
        ) {
          SkillBehaviorAction_1.SkillBehaviorAction.Begin(
            s.SkillBehaviorActionGroup,
            i
          );
          break;
        }
      }
    }
    Een(t) {
      SkillBehaviorAction_1.SkillBehaviorAction.End(t);
    }
    gen(t, i) {
      let e = this.DZr.get(t);
      e || ((e = []), this.DZr.set(t, e)), e.includes(i) || e.push(i);
    }
    fen(t, i) {
      t = this.DZr.get(t);
      t && -1 !== (i = t.indexOf(i)) && t.splice(i, 1);
    }
    *GetAllActivatedSkill() {
      for (const t of this.DZr.values()) for (const i of t.values()) yield i;
    }
    SetCurSkillAnIndex(t) {
      this.PendingAnIndex = t;
    }
    SetGaPassiveClassToSkillMap(t, i) {
      this.wxn.get(t)
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Character",
            36,
            "GaPassiveClass重复，多个Skill使用了同一个GA"
          )
        : this.wxn.set(t, i);
    }
    GiveSkillDebug(t) {
      var i;
      this.LoadedSkills.has(t) ||
        (PreloadDefine_1.PreloadSetting.UseNewPreload &&
          ((i = this.Entity.GetComponent(194)).LoadSkillAsync(t),
          i.FlushSkill(t)),
        this.nen(t, DEFAULT_CD_TIME));
    }
  });
(CharacterSkillComponent.YZr = !1),
  (CharacterSkillComponent.JZr = 0),
  (CharacterSkillComponent.zZr = 0),
  (CharacterSkillComponent = CharacterSkillComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(33)],
      CharacterSkillComponent
    )),
  (exports.CharacterSkillComponent = CharacterSkillComponent);
//# sourceMappingURL=CharacterSkillComponent.js.map
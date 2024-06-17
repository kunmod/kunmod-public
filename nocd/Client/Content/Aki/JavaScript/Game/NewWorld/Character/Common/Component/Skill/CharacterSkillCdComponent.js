"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, i, o) {
    var r,
      s = arguments.length,
      n =
        s < 3
          ? e
          : null === o
          ? (o = Object.getOwnPropertyDescriptor(e, i))
          : o;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      n = Reflect.decorate(t, e, i, o);
    else
      for (var l = t.length - 1; 0 <= l; l--)
        (r = t[l]) && (n = (s < 3 ? r(n) : 3 < s ? r(e, i, n) : r(e, i)) || n);
    return 3 < s && n && Object.defineProperty(e, i, n), n;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterSkillCdComponent = void 0);
const Log_1 = require("../../../../../../Core/Common/Log"),
  NetDefine_1 = require("../../../../../../Core/Define/Net/NetDefine"),
  Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
  GlobalData_1 = require("../../../../../GlobalData"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  EntityManager_1 = require("../../../../../Manager/ModFuncs/EntityManager"),
  ModManager_1 = require("../../../../../Manager/ModManager"),//add
  CombatMessage_1 = require("../../../../../Module/CombatMessage/CombatMessage");
let CharacterSkillCdComponent = class CharacterSkillCdComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.fWo = void 0),
      (this.$Xr = void 0),
      (this.pWo = void 0),
      (this.vWo = void 0),
      (this.MWo = void 0),
      (this.EWo = void 0),
      (this.zXr = void 0);
  }
  OnInit() {
    return (
      (this.fWo = this.Entity.CheckGetComponent(155)),
      (this.$Xr =
        ModelManager_1.ModelManager.SkillCdModel.GetCurWorldSkillCdData()),
      (this.pWo =
        ModelManager_1.ModelManager.SkillCdModel.GetCurWorldPassiveSkillCdData()),
      (this.vWo = new Map()),
      (this.MWo = new Map()),
      (this.EWo = []),
      (this.zXr = this.$Xr.InitMultiSkill(this.Entity.Id)),
      this.zXr.Init(this.Entity.Id),
      !0
    );
  }
  OnStart() {
    if (GlobalData_1.GlobalData.IsPlayInEditor) {
      for (const t of this.vWo.values()) t.CheckConfigValid();
      for (const e of this.MWo.values()) e.CheckConfigValid();
    }
    return !0;
  }
  OnEnd() {
    return (
      this.$Xr && (this.$Xr.RemoveEntity(this.Entity), (this.$Xr = void 0)),
      this.pWo && (this.pWo.RemoveEntity(this.Entity), (this.pWo = void 0)),
      !0
    );
  }
  GetMultiSkillInfo(t) {
    return this.zXr.GetMultiSkillInfo(t);
  }
  GetNextMultiSkillId(t) {
    if (GlobalData_1.GlobalData.IsPlayInEditor)
      for (const e of this.EWo)
        if (e.SkillId === t) {
          this.IsMultiSkill(e) ||
            (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Battle",
                18,
                "获取多段技能下一段技能Id时，传入的技能Id不是多段技能",
                ["skillId", t]
              ));
          break;
        }
    return this.zXr.GetNextMultiSkillId(t);
  }
  IsMultiSkill(t) {
    return this.zXr.IsMultiSkill(t);
  }
  StartMultiSkill(t) {
    return this.zXr.StartMultiSkill(t);
  }
  ResetMultiSkills(t) {
    this.zXr.ResetMultiSkills(t);
  }
  ResetAllMultiSkillOnChangeRole() {
    this.zXr.ResetOnChangeRole();
  }
  InitSkillCd(t) {
    var e,
      i = t.SkillId,
      o = this.vWo.get(i);
    return o
      ? (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Battle", 18, "技能重复初始化", ["skillId", i]),
        o)
      : 1 < (e = t.SkillInfo.CooldownConfig).SectionCount - e.SectionRemaining
      ? void 0
      : ((o = this.$Xr.InitSkillCd(this.Entity, t.SkillId, t.SkillInfo)),
        this.vWo.set(i, o),
        this.EWo.push(t),
        o);
  }
  GetGroupSkillCdInfo(t) {
    return this.vWo.get(t);
  }
  IsSkillInCd(t, e = !0) {
    t = this.vWo.get(t);
    return !!t && (e ? !t.HasRemainingCount() : t.IsInCd());

  }
  ModifyCdInfo(t, e) {
    var i;
    return this.vWo
      ? !!(i = this.vWo.get(t)) && ((i.SkillCdInfoMap.get(t).SkillCd = e), !0)
      : (Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Battle",
            18,
            "角色技能组件还没有初始化，不允许修改技能CD"
          ),
        !1);
  }
  ModifyCdTime(t, e, i) {
    var o;
    if (t && 0 !== t.length)
      if (1 === t.length)
        (o = this.vWo.get(Number(t[0]))) && o.ModifyRemainingCd(e, i);
      else {
        var r = new Set();
        for (const n of t) {
          var s = this.vWo.get(Number(n));
          s && r.add(s);
        }
        for (const l of r) l.ModifyRemainingCd(e, i);
      }
  }
  ModifyCdTimeBySkillGenres(t, e, i) {
    var o = new Array();
    for (const n of t) o.push(Number(n));
    var r,
      s = new Set();
    for (const l of this.EWo)
      o.includes(l.SkillInfo.SkillGenre) &&
        (r = this.vWo.get(l.SkillId)) &&
        s.add(r);
    for (const a of s) a.ModifyRemainingCd(e, i);
  }
  StartCd(t, e = -1) {
    var i = this.vWo.get(t);
    if(ModManager_1.ModManager.Settings.NoCD===true){
      e = -t;
    }
    else
     e = -1;
    return !!i && (i.StartCd(t, this.fWo, e), !0);
  }
  SetLimitCount(t, e) {//e
    var i = this.vWo.get(t);
    return i
      ? (i.SetLimitCount(999), !0)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Battle",
            18,
            "SetLimitCount 不存在该技能:",
            ["EntityId", this.Entity.Id],
            ["limitCount", e],
            ["skillID", t]
          ),
        !1);
  }
  ResetCdDelayTime(t) {
    var e = this.vWo.get(t);
    return e
      ? (e.ResetDelayCd() &&
          (((e =
            Protocol_1.Aki.Protocol.InterruptSkillInDelayRequest.create()).SkillId =
            t),
          CombatMessage_1.CombatNet.Call(
            NetDefine_1.ERequestMessageId.InterruptSkillInDelayRequest,
            this.Entity,
            e,
            () => {}
          ),
          this.zXr?.ResetMultiSkills(t, !0)),
        !0)
      : (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Battle",
            18,
            "修改CD不生效，该技能不记录CD",
            ["EntityId", this.Entity.Id],
            ["skillID", t]
          ),
        !1);
  }
  InitPassiveSkill(t) {
    var e = t.Id,
      i = this.MWo.get(e);
    return (
      i ||
        ((i = this.pWo.InitPassiveSkillCd(this.Entity, t)), this.MWo.set(e, i)),
      i
    );
  }
  IsPassiveSkillInCd(t, e = !0) {
    t = this.MWo.get(t);
    return !!t && (e ? !t.HasRemainingCount() : t.IsInCd());
  }
  StartPassiveCd(t, e = -1) {
    var i = this.MWo.get(t);
    if(ModManager_1.ModManager.Settings.NoCD){
      let role = EntityManager_1.ModsEntityManager.GetCurrRoleId();     
      e = -t;
      if(role ==1302){
        e =-1;//yinlin bug
      }
    }
    else
     e= -1;
    return !!i && (i.StartCd(t, this.fWo, e), !0);
  }
  GetGroupPassiveSkillCdInfo(t) {
    return this.MWo.get(t);
  }
};
(CharacterSkillCdComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(185)],
  CharacterSkillCdComponent
)),
  (exports.CharacterSkillCdComponent = CharacterSkillCdComponent);
//# sourceMappingURL=CharacterSkillCdComponent.js.map

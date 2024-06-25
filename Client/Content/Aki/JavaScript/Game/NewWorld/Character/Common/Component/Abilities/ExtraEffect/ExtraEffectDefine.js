"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.getBuffExecutionClass = exports.getBuffEffectClass = void 0);
const ExtraEffectAbnormal_1 = require("./ExtraEffectAbnormal"),
  ExtraEffectAddBuffOnChangeTeam_1 = require("./ExtraEffectAddBuffOnChangeTeam"),
  ExtraEffectAddBuffTrigger_1 = require("./ExtraEffectAddBuffTrigger"),
  ExtraEffectAddBulletTrigger_1 = require("./ExtraEffectAddBulletTrigger"),
  ExtraEffectAttributeEvent_1 = require("./ExtraEffectAttributeEvent"),
  ExtraEffectBehaviorControl_1 = require("./ExtraEffectBehaviorControl"),
  ExtraEffectDamageAccumulation_1 = require("./ExtraEffectDamageAccumulation"),
  ExtraEffectDamageAugment_1 = require("./ExtraEffectDamageAugment"),
  ExtraEffectDamageFilter_1 = require("./ExtraEffectDamageFilter"),
  ExtraEffectDamageImmune_1 = require("./ExtraEffectDamageImmune"),
  ExtraEffectDamageModifier_1 = require("./ExtraEffectDamageModifier"),
  ExtraEffectDamageShare_1 = require("./ExtraEffectDamageShare"),
  ExtraEffectFormationAttribute_1 = require("./ExtraEffectFormationAttribute"),
  ExtraEffectLevelBuff_1 = require("./ExtraEffectLevelBuff"),
  ExtraEffectMisc_1 = require("./ExtraEffectMisc"),
  ExtraEffectRemoveBuff_1 = require("./ExtraEffectRemoveBuff"),
//   ExtraEffectSkillLimitCount_1 = require("./ExtraEffectSkillLimitCount"), // remove old
  ExtraEffectSkillLimitCount_1 = require("./ExtraEffectSkillLimitCount_New"), // add new
  ExtraEffectSnapModifier_1 = require("./ExtraEffectSnapModifier"),
  ExtraEffectSnapReplacer_1 = require("./ExtraEffectSnapReplacer"),
  ExtraExecutionEffect_1 = require("./ExtraExecutionEffect");
function getBuffEffectClass(e) {
  switch (e) {
    case 1:
      return ExtraEffectSnapModifier_1.SnapModifier;
    case 18:
      return ExtraEffectDamageShare_1.DamageShare;
    case 12:
      return ExtraEffectDamageModifier_1.DamageModifier;
    case 6:
      return ExtraEffectAttributeEvent_1.AttributeEventEffects;
    case 7:
      return ExtraEffectSkillLimitCount_1.ExtraEffectSkillLimitCount;
    case 8:
      return ExtraEffectLevelBuff_1.ExtraEffectLevelBuff;
    case 9:
      return ExtraEffectDamageAugment_1.DamageAugment;
    case 10:
      return ExtraEffectBehaviorControl_1.ExtraEffectBehaviorControl;
    case 2:
      return ExtraEffectAddBuffTrigger_1.AddBuffTrigger;
    case 3:
      return ExtraEffectAddBulletTrigger_1.AddBulletTrigger;
    case 19:
      return ExtraEffectDamageAccumulation_1.DamageAccumulation;
    case 20:
      return ExtraEffectDamageImmune_1.DamageImmune;
    case 21:
      return ExtraEffectRemoveBuff_1.RemoveBuff;
    case 25:
      return ExtraEffectAddBuffOnChangeTeam_1.AddBuffOnChangeTeam;
    case 22:
      return ExtraEffectDamageFilter_1.DamageFilter;
    case 11:
      return ExtraEffectMisc_1.ShieldEffect;
    case 14:
      return ExtraEffectMisc_1.LockValue;
    case 16:
      return ExtraEffectMisc_1.LockLowerBound;
    case 15:
      return ExtraEffectMisc_1.LockUpperBound;
    case 17:
      return ExtraEffectMisc_1.TimeScaleEffect;
    case 27:
      return ExtraEffectSnapReplacer_1.SnapReplacer;
    case 31:
      return ExtraEffectFormationAttribute_1.SetFormationAttributeRate;
    case 32:
      return ExtraEffectFormationAttribute_1.ModifyFormationAttributeIncreaseRate;
    case 33:
      return ExtraEffectFormationAttribute_1.ModifyFormationAttributeDecreaseRate;
    case 35:
      return ExtraEffectMisc_1.AddPassiveSkill;
    case 36:
      return ExtraEffectMisc_1.FrozenEffect;
    case 37:
      return ExtraEffectSnapModifier_1.DamageAmplifyOnHit;
    case 38:
      return ExtraEffectSnapModifier_1.DamageAmplifyOnBeHit;
    case 41:
      return ExtraEffectMisc_1.AddBuffToVision;
    case 44:
      return ExtraEffectMisc_1.ModifyToughReduce;
    case 1001:
      return ExtraEffectAbnormal_1.AbnormalWind;
    case 1002:
      return ExtraEffectAbnormal_1.AbnormalThunder;
    case 1003:
      return ExtraEffectAbnormal_1.AbnormalIce;
    case 1004:
      return ExtraEffectAbnormal_1.AbnormalFire;
    case 1005:
      return ExtraEffectAbnormal_1.AbnormalLight;
    case 1006:
      return ExtraEffectAbnormal_1.AbnormalDark;
    default:
      return;
  }
}
function getBuffExecutionClass(e) {
  switch (e) {
    case 4:
      return ExtraExecutionEffect_1.DamageExecution;
    case 5:
      return ExtraExecutionEffect_1.ExecuteBulletOrBuff;
    case 28:
      return ExtraExecutionEffect_1.ExecuteAddBuffByStackCount;
    case 29:
      return ExtraExecutionEffect_1.ExecuteAddBulletByStackCount;
    case 13:
      return ExtraExecutionEffect_1.CdReduceExecution;
    case 101:
      return ExtraExecutionEffect_1.ReviveExecution;
    case 24:
      return ExtraExecutionEffect_1.AddBuffToAdjacentRoleExecution;
    case 26:
      return ExtraExecutionEffect_1.ExtendBuffDurationExecution;
    case 30:
      return ExtraExecutionEffect_1.PhantomAssistExecution;
    case 34:
      return ExtraExecutionEffect_1.AddFormationAttributeExecution;
    case 102:
      return ExtraExecutionEffect_1.AddEnergyExecution;
    default:
      return;
  }
}
(exports.getBuffEffectClass = getBuffEffectClass),
  (exports.getBuffExecutionClass = getBuffExecutionClass);
//# sourceMappingURL=ExtraEffectDefine.js.map

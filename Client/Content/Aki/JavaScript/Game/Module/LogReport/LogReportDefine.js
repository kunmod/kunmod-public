"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityViewJumpClickLogData =
    exports.ActivityTabViewOpenLogData =
    exports.ActivityViewOpenLogData =
    exports.ScanSkillUseLogData =
    exports.ManipulateSkillUseLogData =
    exports.HookSkillUseLogData =
    exports.ExploreToolItemUseLogData =
    exports.ExploreToolEquipLogData =
    exports.ExploreToolSwitchLogData =
    exports.SettingMenuLogData =
    exports.PlayFlowLogData =
    exports.SettingMenuLogEvent =
    exports.PhotographerLogData =
    exports.AdviceWatchLogData =
    exports.QuestDiscoverLogData =
    exports.ReconvProcessLink =
    exports.LoginProcessLink =
    exports.DeathRecord =
    exports.ElevatorUsedRecord =
    exports.TriggerBuffDamageRecord =
    exports.InstMonsterSkillReportLog =
    exports.InstReactionLogRecord =
    exports.InstRoleSkillReportLog =
    exports.InstMonsterStateRecord =
    exports.InstRoleStateRecord =
    exports.InstFightEndRecord =
    exports.InstFightStartRecord =
    exports.ReactionRecord =
    exports.ReactionLogRecord =
    exports.MonsterSkillRecord =
    exports.MonsterSkillReportLog =
    exports.RoleSkillRecord =
    exports.RoleSkillReportLog =
    exports.MonsterStateRecord =
    exports.RoleStateRecord =
    exports.BattleEndLogData =
    exports.MonsterInfoLogData =
    exports.TeamCharacterLogData =
    exports.BattleStartLogData =
    exports.HangUpTimeLogData =
    exports.PlayerCommonLogData =
    exports.CommonLogData =
      void 0);
const UE = require("ue"),
  Json_1 = require("../../../Core/Common/Json"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  PROJECT_ID = "Aki";
class CommonLogData extends Json_1.JsonObjBase {
  constructor() {
    super(),
      (this.event_id = ""),
      (this.event_uuid = ""),
      (this.client_version = ""),
      (this.project_id = PROJECT_ID),
      (this.platform = ""),
      (this.event_uuid = UE.KismetGuidLibrary.NewGuid().ToString());
  }
}
class PlayerCommonLogData extends (exports.CommonLogData = CommonLogData) {
  constructor() {
    super(),
      (this.player_id = ""),
      (this.unique_id = ""),
      (this.world_level = ""),
      (this.player_level = ""),
      (this.region = ""),
      (this.client_platform = ""),
      (this.net_status = ""),
      (this.device_id = ""),
      (this.world_own_id = "");
  }
}
class HangUpTimeLogData extends (exports.PlayerCommonLogData =
  PlayerCommonLogData) {
  constructor() {
    super(), (this.f_hang_up_time = ""), (this.event_id = "7");
  }
}
exports.HangUpTimeLogData = HangUpTimeLogData;
class BattleStartLogData extends PlayerCommonLogData {
  constructor() {
    super(...arguments),
      (this.event_id = "102704"),
      (this.i_area_id = 0),
      (this.f_x = 0),
      (this.f_y = 0),
      (this.f_z = 0),
      (this.s_battle_id = ""),
      (this.s_team_character = void 0),
      (this.s_team_hp_per = void 0);
  }
}
exports.BattleStartLogData = BattleStartLogData;
class TeamCharacterLogData {}
exports.TeamCharacterLogData = TeamCharacterLogData;
class MonsterInfoLogData {
  constructor(t) {
    (this.pbdata_id = 0),
      (this.config_type = 0),
      t && ((this.pbdata_id = t.pbdata_id), (this.config_type = t.config_type));
  }
}
exports.MonsterInfoLogData = MonsterInfoLogData;
class BattleEndLogData extends PlayerCommonLogData {
  constructor() {
    super(...arguments),
      (this.event_id = "102705"),
      (this.i_area_id = 0),
      (this.f_x = 0),
      (this.f_y = 0),
      (this.f_z = 0),
      (this.s_battle_id = ""),
      (this.s_team_character = new Array()),
      (this.s_team_hp_per = new Array()),
      (this.s_monster_hate = new Array()),
      (this.s_death_monster = new Array()),
      (this.s_run_monster = new Array()),
      (this.i_result = 0),
      (this.i_death_role_count = 0),
      (this.i_revive_times = 0),
      (this.i_change_character_times = 0),
      (this.i_qte_times = 0),
      (this.l_acc_damage = 0),
      (this.l_acc_shield_damage = 0),
      (this.l_acc_self_damage = 0),
      (this.l_acc_skill_heal = 0),
      (this.l_acc_item_heal = 0),
      (this.i_stop_times = 0),
      (this.i_damage_max = 0),
      (this.i_acc_dodge_times = 0),
      (this.i_dodge_succ_times = 0),
      (this.i_non_character_damage = 0),
      (this.i_non_character_shield_damage = 0),
      (this.i_cost_time = 0),
      (this.i_counter_attack_times = 0),
      (this.i_bullet_rebound_times = 0),
      (this.i_move_duration = -0),
      (this.i_swim_duration = -0),
      (this.i_glide_duration = -0),
      (this.i_climb_duration = -0),
      (this.i_behit_duration = -0),
      (this.i_skill_duration = -0),
      (this.i_dash_duration = -0),
      (this.i_other_duration = -0);
  }
}
exports.BattleEndLogData = BattleEndLogData;
class RoleStateRecord extends PlayerCommonLogData {
  constructor(t) {
    super(),
      (this.event_id = "102700"),
      (this.s_battle_id = ""),
      (this.i_role_id = 0),
      (this.i_role_level = 0),
      (this.i_role_quality = 0),
      (this.i_role_reson = 0),
      (this.i_vision_skill_id = 0),
      (this.i_vision_skill_level = 0),
      (this.i_weapon_id = 0),
      (this.i_weapon_type = 0),
      (this.i_weapon_quality = 0),
      (this.i_weapon_level = 0),
      (this.i_hp_max = 0),
      (this.i_begin_hp = 0),
      (this.i_end_hp = 0),
      (this.i_death_times = 0),
      (this.i_revive_times = 0),
      (this.l_acc_damage = 0),
      (this.l_acc_shield_damage = 0),
      (this.TotalGetDamage = 0),
      (this.TotalGetDamageTimes = 0),
      (this.l_acc_heal_self = 0),
      (this.l_acc_heal_other = 0),
      (this.l_acc_item_heal = 0),
      (this.i_acc_dodge_times = 0),
      (this.i_dodge_succ_times = 0),
      (this.i_enter_times = 0),
      (this.i_leave_times = 0),
      (this.LastGoToBattleTimePoint = 0),
      (this.i_acc_time = 0),
      (this.i_use_item_count = 0),
      (this.i_counter_attack_times = 0),
      (this.i_bullet_rebound_times = 0),
      (this.i_full_element_times = 0),
      (this.l_acc_element = 0),
      (this.i_full_energy_times = 0),
      (this.l_acc_energy = 0),
      (this.i_team_position = 0),
      (this.i_enter_battle_score = 0),
      (this.s_role_skill = void 0),
      (this.s_phantom_battle_data = void 0),
      (this.s_phantom_fetter_list = void 0),
      (this.i_role_id = t);
  }
}
exports.RoleStateRecord = RoleStateRecord;
class MonsterStateRecord extends PlayerCommonLogData {
  constructor(t, s) {
    super(),
      (this.event_id = "102701"),
      (this.s_battle_id = ""),
      (this.i_monster_id = 0),
      (this.i_monster_level = 0),
      (this.i_kill_role_times = 0),
      (this.l_acc_damage = 0),
      (this.l_acc_shield_damage = 0),
      (this.l_acc_heal_other = 0),
      (this.l_acc_heal_self = 0),
      (this.i_monster_result =
        Protocol_1.Aki.Protocol.MonsterResult.MonsterResultRun),
      (this.f_pos_x = 0),
      (this.f_pos_y = 0),
      (this.f_pos_z = 0),
      (this.InitTime = 0),
      (this.i_acc_time = 0),
      (this.i_counter_attack_times = 0),
      (this.i_monster_score = 0),
      (this.l_acc_hardness = 0),
      (this.l_acc_rage = 0),
      (this.l_acc_rage_normal = 0),
      (this.l_acc_rage_counter = 0),
      (this.l_acc_rage_vision = 0),
      (this.l_acc_rage_other = 0),
      (this.s_pb_model_config_id = ""),
      (this.i_paralysis_times = 0),
      (this.i_bullet_rebound_times = 0),
      (this.l_acc_be_damaged = 0),
      (this.l_acc_part_destroy = 0),
      (this.l_acc_weakness = 0),
      (this.i_from_quest = 0),
      (this.i_from_play = 0),
      (this.i_monster_id = t),
      (this.s_pb_model_config_id = s);
  }
}
exports.MonsterStateRecord = MonsterStateRecord;
class RoleSkillReportLog extends PlayerCommonLogData {
  constructor() {
    super(...arguments),
      (this.event_id = "102702"),
      (this.s_battle_id = ""),
      (this.i_role_id = 0),
      (this.i_role_level = 0),
      (this.i_role_quality = 0),
      (this.s_reports = "");
  }
}
exports.RoleSkillReportLog = RoleSkillReportLog;
class RoleSkillRecord extends Json_1.JsonObjBase {
  constructor(t) {
    super(),
      (this.skill_id = 0),
      (this.use_count = 0),
      (this.hit_count = 0),
      (this.real_hit_count = 0),
      (this.damage = 0),
      (this.skill_type = 0),
      (this.acc_energy = 0),
      (this.skill_id = t);
  }
}
exports.RoleSkillRecord = RoleSkillRecord;
class MonsterSkillReportLog extends PlayerCommonLogData {
  constructor(t, s) {
    super(),
      (this.event_id = "102803"),
      (this.s_battle_id = ""),
      (this.i_monster_id = 0),
      (this.i_monster_level = 0),
      (this.s_pb_model_config_id = ""),
      (this.s_reports = ""),
      (this.i_monster_id = t),
      (this.s_pb_model_config_id = s);
  }
}
exports.MonsterSkillReportLog = MonsterSkillReportLog;
class MonsterSkillRecord extends Json_1.JsonObjBase {
  constructor(t) {
    super(),
      (this.skill_id = 0),
      (this.use_count = 0),
      (this.hit_count = 0),
      (this.real_hit_count = 0),
      (this.damage = 0),
      (this.counter_attack_times = 0),
      (this.bullet_rebound_times = 0),
      (this.dodge_succ_times = 0),
      (this.skill_id = t);
  }
}
exports.MonsterSkillRecord = MonsterSkillRecord;
class ReactionLogRecord extends PlayerCommonLogData {
  constructor() {
    super(...arguments),
      (this.event_id = "102703"),
      (this.s_battle_id = ""),
      (this.s_reports = "");
  }
}
exports.ReactionLogRecord = ReactionLogRecord;
class ReactionRecord extends Json_1.JsonObjBase {
  constructor(t, s) {
    super(),
      (this.role_id = 0),
      (this.reaction = 0),
      (this.trigger_count = 0),
      (this.damage = 0),
      (this.role_id = t),
      (this.reaction = s);
  }
}
exports.ReactionRecord = ReactionRecord;
class InstFightStartRecord extends PlayerCommonLogData {
  constructor() {
    super(...arguments),
      (this.event_id = "102800"),
      (this.i_inst_id = 0),
      (this.s_fight_id = ""),
      (this.s_fight_roles = ""),
      (this.i_start_time = 0),
      (this.i_area_index = 0);
  }
  Clear() {
    (this.i_start_time = 0), (this.i_area_index = 0);
  }
}
exports.InstFightStartRecord = InstFightStartRecord;
class InstFightEndRecord extends PlayerCommonLogData {
  constructor() {
    super(),
      (this.event_id = "102801"),
      (this.i_inst_id = 0),
      (this.s_fight_roles = ""),
      (this.s_fight_id = ""),
      (this.i_result = 0),
      (this.i_reason = 0),
      (this.i_inst_use_time = 0),
      (this.i_fight_use_time = 0),
      (this.l_acc_damage = 0),
      (this.l_acc_shield_damage = 0),
      (this.l_acc_self_damage = 0),
      (this.l_acc_skill_heal = 0),
      (this.l_acc_item_heal = 0),
      (this.i_stop_times = 0),
      (this.i_damage_max = 0),
      (this.i_acc_dodge_times = 0),
      (this.i_dodge_succ_times = 0),
      (this.i_death_role_count = 0),
      (this.i_revive_times = 0),
      (this.i_counter_attack_times = 0),
      (this.i_bullet_rebound_times = 0),
      (this.i_move_duration = 0),
      (this.i_swim_duration = 0),
      (this.i_glide_duration = 0),
      (this.i_climb_duration = 0),
      (this.i_behit_duration = 0),
      (this.i_skill_duration = 0),
      (this.i_dash_duration = 0),
      (this.i_other_duration = 0),
      (this.i_area_index = 0),
      (this.i_inst_id = 0),
      (this.s_fight_roles = ""),
      (this.s_fight_id = ""),
      (this.i_result = 0),
      (this.i_reason = 0),
      (this.i_inst_use_time = 0),
      (this.i_fight_use_time = 0),
      (this.l_acc_self_damage = 0),
      (this.l_acc_damage = 0),
      (this.l_acc_shield_damage = 0),
      (this.l_acc_skill_heal = 0),
      (this.l_acc_item_heal = 0),
      (this.i_acc_dodge_times = 0),
      (this.i_dodge_succ_times = 0),
      (this.i_stop_times = 0),
      (this.i_damage_max = 0),
      (this.i_death_role_count = 0),
      (this.i_revive_times = 0),
      (this.i_counter_attack_times = 0),
      (this.i_bullet_rebound_times = 0);
  }
  Clear() {
    (this.i_inst_id = 0),
      (this.s_fight_roles = ""),
      (this.s_fight_id = ""),
      (this.i_result = 0),
      (this.i_reason = 0),
      (this.i_inst_use_time = 0),
      (this.i_fight_use_time = 0),
      (this.l_acc_self_damage = 0),
      (this.l_acc_damage = 0),
      (this.l_acc_shield_damage = 0),
      (this.l_acc_skill_heal = 0),
      (this.l_acc_item_heal = 0),
      (this.i_acc_dodge_times = 0),
      (this.i_dodge_succ_times = 0),
      (this.i_stop_times = 0),
      (this.i_damage_max = 0),
      (this.i_death_role_count = 0),
      (this.i_revive_times = 0),
      (this.i_counter_attack_times = 0),
      (this.i_bullet_rebound_times = 0),
      (this.i_move_duration = 0),
      (this.i_swim_duration = 0),
      (this.i_glide_duration = 0),
      (this.i_climb_duration = 0),
      (this.i_behit_duration = 0),
      (this.i_skill_duration = 0),
      (this.i_dash_duration = 0),
      (this.i_other_duration = 0),
      (this.i_area_index = 0);
  }
}
exports.InstFightEndRecord = InstFightEndRecord;
class InstRoleStateRecord extends RoleStateRecord {
  constructor(t, s, i) {
    super(t),
      (this.event_id = "102804"),
      (this.i_inst_id = 0),
      (this.s_fight_id = ""),
      (this.i_inst_id = s),
      (this.s_fight_id = i);
  }
}
exports.InstRoleStateRecord = InstRoleStateRecord;
class InstMonsterStateRecord extends MonsterStateRecord {
  constructor(t, s, i, h) {
    super(t, s),
      (this.event_id = "102805"),
      (this.i_inst_id = 0),
      (this.s_fight_id = ""),
      (this.i_inst_id = i),
      (this.s_fight_id = h);
  }
}
exports.InstMonsterStateRecord = InstMonsterStateRecord;
class InstRoleSkillReportLog extends RoleSkillReportLog {
  constructor(t, s) {
    super(),
      (this.event_id = "102806"),
      (this.i_inst_id = 0),
      (this.s_fight_id = ""),
      (this.i_inst_id = t),
      (this.s_fight_id = s);
  }
}
exports.InstRoleSkillReportLog = InstRoleSkillReportLog;
class InstReactionLogRecord extends ReactionLogRecord {
  constructor(t, s) {
    super(),
      (this.event_id = "102807"),
      (this.i_inst_id = 0),
      (this.s_fight_id = ""),
      (this.i_inst_id = t),
      (this.s_fight_id = s);
  }
}
exports.InstReactionLogRecord = InstReactionLogRecord;
class InstMonsterSkillReportLog extends MonsterSkillReportLog {
  constructor(t, s, i, h) {
    super(t, s),
      (this.event_id = "102808"),
      (this.i_inst_id = 0),
      (this.s_fight_id = ""),
      (this.i_inst_id = i),
      (this.s_fight_id = h);
  }
}
exports.InstMonsterSkillReportLog = InstMonsterSkillReportLog;
class TriggerBuffDamageRecord extends PlayerCommonLogData {
  constructor() {
    super(...arguments),
      (this.event_id = "6"),
      (this.i_area_id = ""),
      (this.s_buff_id = ""),
      (this.f_time = ""),
      (this.f_player_pos_x = ""),
      (this.f_player_pos_y = ""),
      (this.f_player_pos_z = ""),
      (this.i_damage = "");
  }
}
exports.TriggerBuffDamageRecord = TriggerBuffDamageRecord;
class ElevatorUsedRecord extends PlayerCommonLogData {
  constructor() {
    super(...arguments),
      (this.event_id = "11"),
      (this.i_area_id = ""),
      (this.i_config_id = ""),
      (this.i_state_id = ""),
      (this.f_player_pos_x = ""),
      (this.f_player_pos_y = ""),
      (this.f_player_pos_z = "");
  }
}
exports.ElevatorUsedRecord = ElevatorUsedRecord;
class DeathRecord extends PlayerCommonLogData {
  constructor() {
    super(...arguments),
      (this.event_id = "102706"),
      (this.i_area_id = 0),
      (this.i_area_level = 0),
      (this.f_x = 0),
      (this.f_y = 0),
      (this.f_z = 0),
      (this.i_death_role_id = 0),
      (this.i_death_reason = 0);
  }
}
exports.DeathRecord = DeathRecord;
class LoginProcessLink extends CommonLogData {
  constructor() {
    super(...arguments),
      (this.event_id = "18000"),
      (this.s_trace_id = ""),
      (this.s_user_id = ""),
      (this.s_user_name = ""),
      (this.s_login_step = ""),
      (this.s_app_version = ""),
      (this.s_launcher_version = ""),
      (this.s_resource_version = ""),
      (this.s_client_version = ""),
      (this.i_error_code = 0);
  }
}
exports.LoginProcessLink = LoginProcessLink;
class ReconvProcessLink extends CommonLogData {
  constructor() {
    super(...arguments),
      (this.event_id = "18001"),
      (this.s_trace_id = ""),
      (this.s_player_id = ""),
      (this.s_user_id = ""),
      (this.s_user_name = ""),
      (this.s_reconv_step = ""),
      (this.s_app_version = ""),
      (this.s_launcher_version = ""),
      (this.s_resource_version = ""),
      (this.s_client_version = ""),
      (this.i_error_code = 0);
  }
}
exports.ReconvProcessLink = ReconvProcessLink;
class QuestDiscoverLogData extends PlayerCommonLogData {
  constructor() {
    super(...arguments),
      (this.event_id = "1007"),
      (this.i_quest_id = 0),
      (this.i_quest_type = 0),
      (this.i_icon_distance = 0),
      (this.i_area_id = 0),
      (this.i_father_area_id = 0),
      (this.f_pos_x = 0),
      (this.f_pos_y = 0),
      (this.f_pos_z = 0);
  }
}
exports.QuestDiscoverLogData = QuestDiscoverLogData;
class AdviceWatchLogData extends PlayerCommonLogData {
  constructor() {
    super(...arguments),
      (this.event_id = "1008"),
      (this.l_advice_id = " "),
      (this.o_content = void 0),
      (this.i_creator_id = 0),
      (this.f_pos_x = 0),
      (this.f_pos_y = 0),
      (this.f_pos_z = 0),
      (this.i_area_id = 0),
      (this.i_father_area_id = 0),
      (this.i_expression = 0),
      (this.i_motion = 0);
  }
}
exports.AdviceWatchLogData = AdviceWatchLogData;
class PhotographerLogData extends PlayerCommonLogData {
  constructor() {
    super(...arguments),
      (this.i_area_id = 0),
      (this.i_father_area_id = 0),
      (this.f_pos_x = 0),
      (this.f_pos_y = 0),
      (this.f_pos_z = 0),
      (this.i_motion = 0),
      (this.i_expression = 0),
      (this.i_role_id = 0),
      (this.i_shot_option = 0),
      (this.i_self_option = 0),
      (this.i_info_option = 0),
      (this.i_dof_option = 0);
  }
}
exports.PhotographerLogData = PhotographerLogData;
class SettingMenuLogEvent extends PlayerCommonLogData {
  constructor() {
    super(...arguments),
      (this.event_id = "1017"),
      (this.i_image_quality = 0),
      (this.i_display_mode = 0),
      (this.s_resolution = ""),
      (this.i_brightness = 0),
      (this.i_highest_fps = 0),
      (this.i_shadow_quality = 0),
      (this.i_niagara_quality = 0),
      (this.i_fsr = 0),
      (this.i_image_detail = 0),
      (this.i_scene_ao = 0),
      (this.i_volume_Fog = 0),
      (this.i_volume_light = 0),
      (this.i_motion_blur = 0),
      (this.i_anti_aliasing = 0),
      (this.i_pcv_sync = 0),
      (this.i_horizontal_view_sensitivity = 0),
      (this.i_vertical_view_sensitivity = 0),
      (this.i_aim_horizontal_view_sensitivity = 0),
      (this.i_aim_vertical_view_sensitivity = 0),
      (this.f_camera_shake_strength = 0),
      (this.i_common_spring_arm_length = 0),
      (this.i_fight_spring_arm_length = 0),
      (this.i_reset_focus_enable = 0),
      (this.i_side_step_camera_enable = 0),
      (this.i_soft_lock_camera_enable = 0),
      (this.i_joystick_shake_strength = 0),
      (this.i_joystick_shake_type = 0),
      (this.f_walk_or_run_rate = 0),
      (this.i_advice_setting = 0);
  }
}
exports.SettingMenuLogEvent = SettingMenuLogEvent;
class PlayFlowLogData extends PlayerCommonLogData {
  constructor() {
    super(...arguments),
      (this.event_id = "1010"),
      (this.i_bubble_type = 0),
      (this.s_flow_file = ""),
      (this.i_flow_id = 0),
      (this.i_flow_status_id = 0),
      (this.i_config_id = 0),
      (this.i_area_id = 0),
      (this.i_father_area_id = 0),
      (this.f_pos_x = 0),
      (this.f_pos_y = 0),
      (this.f_pos_z = 0);
  }
}
exports.PlayFlowLogData = PlayFlowLogData;
class SettingMenuLogData extends PlayerCommonLogData {}
exports.SettingMenuLogData = SettingMenuLogData;
class ExploreToolSwitchLogData extends PlayerCommonLogData {
  constructor() {
    super(...arguments),
      (this.event_id = "1011"),
      (this.i_explore_tool_id = 0),
      (this.o_authorization = []);
  }
}
exports.ExploreToolSwitchLogData = ExploreToolSwitchLogData;
class ExploreToolEquipLogData extends PlayerCommonLogData {
  constructor() {
    super(...arguments),
      (this.event_id = "1018"),
      (this.i_explore_tool_id = 0),
      (this.o_authorization = []),
      (this.i_item_id = 0),
      (this.i_operation = 0);
  }
}
exports.ExploreToolEquipLogData = ExploreToolEquipLogData;
class ExploreToolItemUseLogData extends PlayerCommonLogData {
  constructor() {
    super(...arguments),
      (this.event_id = "1015"),
      (this.i_father_area_id = 0),
      (this.i_area_id = 0),
      (this.f_pos_x = 0),
      (this.f_pos_y = 0),
      (this.f_pos_z = 0),
      (this.i_item_id = 0);
  }
}
exports.ExploreToolItemUseLogData = ExploreToolItemUseLogData;
class HookSkillUseLogData extends PlayerCommonLogData {
  constructor() {
    super(...arguments),
      (this.event_id = "1012"),
      (this.i_father_area_id = 0),
      (this.i_area_id = 0),
      (this.f_pos_x = 0),
      (this.f_pos_y = 0),
      (this.f_pos_z = 0),
      (this.i_has_target = 0);
  }
}
exports.HookSkillUseLogData = HookSkillUseLogData;
class ManipulateSkillUseLogData extends PlayerCommonLogData {
  constructor() {
    super(...arguments),
      (this.event_id = "1013"),
      (this.i_father_area_id = 0),
      (this.i_area_id = 0),
      (this.f_pos_x = 0),
      (this.f_pos_y = 0),
      (this.f_pos_z = 0),
      (this.i_has_target = 0);
  }
}
exports.ManipulateSkillUseLogData = ManipulateSkillUseLogData;
class ScanSkillUseLogData extends PlayerCommonLogData {
  constructor() {
    super(...arguments),
      (this.event_id = "1014"),
      (this.i_father_area_id = 0),
      (this.i_area_id = 0),
      (this.f_pos_x = 0),
      (this.f_pos_y = 0),
      (this.f_pos_z = 0),
      (this.i_has_target = 0);
  }
}
exports.ScanSkillUseLogData = ScanSkillUseLogData;
class ActivityViewOpenLogData extends PlayerCommonLogData {
  constructor() {
    super(...arguments), (this.event_id = "1019"), (this.i_open_way = 0);
  }
}
exports.ActivityViewOpenLogData = ActivityViewOpenLogData;
class ActivityTabViewOpenLogData extends PlayerCommonLogData {
  constructor() {
    super(...arguments),
      (this.event_id = "1020"),
      (this.i_activity_id = 0),
      (this.i_activity_type = 0),
      (this.i_time_left = 0),
      (this.i_unlock = 0);
  }
}
exports.ActivityTabViewOpenLogData = ActivityTabViewOpenLogData;
class ActivityViewJumpClickLogData extends PlayerCommonLogData {
  constructor() {
    super(...arguments),
      (this.event_id = "1021"),
      (this.i_activity_id = 0),
      (this.i_activity_type = 0),
      (this.i_time_left = 0),
      (this.i_button_type = 0);
  }
}
exports.ActivityViewJumpClickLogData = ActivityViewJumpClickLogData;
//# sourceMappingURL=LogReportDefine.js.map

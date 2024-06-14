"use strict";
var SceneItemDamageComponent_1, __decorate = this && this.__decorate || function(e, t, i, n) {
    var o, s = arguments.length,
        r = s < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, i) : n;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, i, n);
    else
        for (var h = e.length - 1; 0 <= h; h--)(o = e[h]) && (r = (s < 3 ? o(r) : 3 < s ? o(t, i, r) : o(t, i)) || r);
    return 3 < s && r && Object.defineProperty(t, i, r), r
};
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.SceneItemDamageComponent = void 0;
const Log_1 = require("../../../Core/Common/Log"),
    EntityComponent_1 = require("../../../Core/Entity/EntityComponent"),
    RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent"),
    Vector_1 = require("../../../Core/Utils/Math/Vector"),
    EventDefine_1 = require("../../Common/Event/EventDefine"),
    EventSystem_1 = require("../../Common/Event/EventSystem"),
    LevelGamePlayController_1 = require("../../LevelGamePlay/LevelGamePlayController"),
    ModelManager_1 = require("../../Manager/ModelManager"),
    FormationControl_1 = require("../../Module/Formation/FormationControl");

let SceneItemDamageComponent = SceneItemDamageComponent_1 = class SceneItemDamageComponent extends EntityComponent_1.EntityComponent {
    constructor() {
        super(...arguments), this.$Jo = void 0, this.$sn = void 0, this.Fan = -0, this.Van = -0, this.Han = void 0, this.Fst = void 0, this.Lo = void 0, this.U6r = void 0, this.jan = void 0, this.Dye = () => {
            Log_1.Log.CheckDebug() && Log_1.Log.Debug("SceneItem", 32, "[可破坏物] 改变状态", ["State", this.$Jo.GetTagNames()])
        }
    }
    OnInitData(e) {
        var e = e.GetParam(SceneItemDamageComponent_1)[0],
            e = (this.Lo = e, this.U6r = this.Entity.GetComponent(1), this.jan = Vector_1.Vector.Create(this.Lo.HitPoint.X || 0, this.Lo.HitPoint.Y || 0, this.Lo.HitPoint.Z || 0), this.Entity.GetComponent(0)),
            t = this.Lo.Durability;
            this.Van = e.GetDurabilityValue();
            this.Fan = t || 100;

            // 这里在矿物生成时发送伤害请求 30 次，值任意修改
            for(let i = 0; i<30; i++) {
                LevelGamePlayController_1.LevelGamePlayController.ThrowDamageChangeRequest(this.Entity.Id, 1604001001n); //  1604001001n 为女主的第一次平A的 DamageId
            }
        return this.Fan = t || 100, this.Van = e.GetDurabilityValue(), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Entity", 18, "初始化破坏组件完成", ["最大耐久度", this.Fan], ["当前耐久度", this.Van], ["PbDataId", e.GetPbDataId()]), !0
    }
    OnStart() {
        return this.$Jo = this.Entity.GetComponent(176), this.$sn = this.Entity.GetComponent(137), this.$sn.RegisterComponent(this, this.Lo), this.Han = e => {
            this.qnn(e)
        }, EventSystem_1.EventSystem.AddWithTarget(this, EventDefine_1.EEventName.OnSceneItemHitByHitData, this.Han), this.Fst = e => {
            this.Van !== e && (this.Van = e)
        }, EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemDurabilityChange, this.Fst), EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnGameplayTagChanged, this.Dye), !0
    }
    OnEnd() {
        return void 0 !== this.Han && (EventSystem_1.EventSystem.RemoveWithTarget(this, EventDefine_1.EEventName.OnSceneItemHitByHitData, this.Han), this.Han = void 0), void 0 !== this.Fst && (EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemDurabilityChange, this.Fst), this.Fst = void 0), EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnGameplayTagChanged, this.Dye), !0
    }
    qnn(e) {
        if (this.Lo.MatchRoleOption && 0 < this.Lo.MatchRoleOption.length) {
            if (!FormationControl_1.FormationControl.IsMatchRoleOption(this.Lo.MatchRoleOption)) return
        } else if (ModelManager_1.ModelManager.FormationModel.IsPhantomFormation) return;
        var t = e.Attacker.GetComponent(3);
        !t?.Valid || !t.IsRoleAndCtrlByMe && !t.IsSummonsAndCtrlByMe || this.Van <= 0 || e.ReBulletData.Base.DamageId && 0 < this.Van && ((t = this.Entity.GetComponent(0).GetBaseInfo()?.Category?.ControlMatchType) && "关卡.Common.被控物.爆裂鸣晶" === t && Log_1.Log.CheckDebug() && Log_1.Log.Debug("SceneItem", 32, "[爆裂鸣晶] ThrowDamageChangeRequest", ["Entity.Valid", this.Entity.Valid]), LevelGamePlayController_1.LevelGamePlayController.ThrowDamageChangeRequest(this.Entity.Id, e.ReBulletData.Base.DamageId))
    }
    GetHitPoint() {
        var e = Vector_1.Vector.Create(this.jan),
            t = Vector_1.Vector.Create(),
            i = Vector_1.Vector.Create();
        return this.U6r.ActorForwardProxy.Multiply(e.X, i), t.AdditionEqual(i), this.U6r.ActorRightProxy.Multiply(e.Y, i), t.AdditionEqual(i), this.U6r.ActorUpProxy.Multiply(e.Z, i), t.AdditionEqual(i), this.U6r.ActorLocationProxy.Addition(t, t), t
    }
    GetMaxDurablePoint() {
        return this.Fan
    }
};
SceneItemDamageComponent = SceneItemDamageComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(131)], SceneItemDamageComponent), exports.SceneItemDamageComponent = SceneItemDamageComponent;
//# sourceMappingURL=SceneItemDamageComponent.js.map

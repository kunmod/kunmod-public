"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.ExtraEffectSkillLimitCount = void 0;
const ExtraEffectBase_1 = require("./ExtraEffectBase");
class ExtraEffectSkillLimitCount extends ExtraEffectBase_1.BuffEffect {
    constructor() {
        super(...arguments),
        this.vWr = void 0,
        this.MWr = void 0,
        this.EWr = 0
    }
    InitParameters(t) {
        t = t.ExtraEffectParameters;
        this.vWr = t[0].split("#"),
        this.MWr = t[1].split("#").map(t => Number(t)),
        0 === Number(t[2] ?? 0) ? this.EWr = 0 : this.EWr = 1
    }
    OnCreated() {
        var e = this.SWr().CheckGetComponent(185);
        // 移除了对 SetLimitCount 的调用，以便不再限制次数
        for (let t = 0; t < this.vWr.length; t++) {
            var s = Number(this.vWr[t]);
            e.IsSkillInCd(s);
            // e.SetLimitCount(s, this.MWr[t]) // 这行被注释掉了
        }
    }
    OnRemoved() {
        var t = this.SWr().CheckGetComponent(185);
        // 移除了对 SetLimitCount 的调用，以便不再限制次数
        for (const s of this.vWr) {
            var e = Number(s);
            t.IsSkillInCd(e);
            // t.SetLimitCount(e) // 这行被注释掉了
        }
    }
    OnExecute() {}
    SWr() {
        return 0 !== this.EWr ? this.InstigatorEntity.Entity : this.OwnerEntity
    }
}
exports.ExtraEffectSkillLimitCount = ExtraEffectSkillLimitCount;
//# sourceMappingURL=ExtraEffectSkillLimitCount.js.map

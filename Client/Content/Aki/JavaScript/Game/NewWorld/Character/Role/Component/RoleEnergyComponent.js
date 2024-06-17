"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, o, r) {
    var n,
      i = arguments.length,
      s =
        i < 3
          ? e
          : null === r
          ? (r = Object.getOwnPropertyDescriptor(e, o))
          : r;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      s = Reflect.decorate(t, e, o, r);
    else
      for (var c = t.length - 1; 0 <= c; c--)
        (n = t[c]) && (s = (i < 3 ? n(s) : 3 < i ? n(e, o, s) : n(e, o)) || s);
    return 3 < i && s && Object.defineProperty(e, o, s), s;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleEnergyComponent = void 0);
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
var EAttributeId = Protocol_1.Aki.Protocol.EAttributeType;
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  energyAttrIds = [EAttributeId.Energy, EAttributeId.EnergyMax];
let RoleEnergyComponent = class RoleEnergyComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.U6r = void 0),
      (this.yte = void 0),
      (this.HXo = (t, e, o) => {
        var r = this.yte.GetCurrentValue(EAttributeId.Energy),
          n = this.yte.GetCurrentValue(EAttributeId.EnergyMax);
        this.U6r.Actor?.CharRenderingComponent.SetStarScarEnergy(r/n);//r/n
      });
  }
  OnStart() {
    return (
      (this.U6r = this.Entity.CheckGetComponent(3)),
      (this.yte = this.Entity.CheckGetComponent(155)),
      this.yte.AddListeners(energyAttrIds, this.HXo, "RoleEnergyComponent"),
     // this.HXo(),
      !0
    );
  }
  OnEnd() {
    return /*this.yte.RemoveListeners(energyAttrIds, this.HXo),*/ !0;
  }
};
(RoleEnergyComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(80)],
  RoleEnergyComponent
)),
  (exports.RoleEnergyComponent = RoleEnergyComponent);
//# sourceMappingURL=RoleEnergyComponent.js.map

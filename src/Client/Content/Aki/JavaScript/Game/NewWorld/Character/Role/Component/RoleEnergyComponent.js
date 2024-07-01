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
var EAttributeId = Protocol_1.Aki.Protocol.KBs;
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const ModManager_1 = require("../../../../Manager/ModManager"),
  energyAttrIds = [EAttributeId.Proto_Energy, EAttributeId.Proto_EnergyMax];
let originalGetCurrentValue;
let RoleEnergyComponent = class RoleEnergyComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.nXt = void 0),
      (this.$te = void 0),
      (this.mon = (t, e, o) => {
        var r = this.$te.GetCurrentValue(EAttributeId.Proto_Energy),
          n = this.$te.GetCurrentValue(EAttributeId.Proto_EnergyMax);
        if (ModManager_1.ModManager.Settings.NoCD) {
          this.nXt.Actor?.CharRenderingComponent.SetStarScarEnergy(n);
        } else {
          this.nXt.Actor?.CharRenderingComponent.SetStarScarEnergy(r / n);
        }
      });
  }
  OnStart() {
    this.nXt = this.Entity.CheckGetComponent(3);
    this.$te = this.Entity.CheckGetComponent(156);

    originalGetCurrentValue = this.$te.GetCurrentValue.bind(this.$te);

    this.$te.GetCurrentValue = (attributeId) => {
      if (attributeId === EAttributeId.Energy) {
        if (ModManager_1.ModManager.Settings.NoCD)
          return originalGetCurrentValue(EAttributeId.EnergyMax);
      }
      return originalGetCurrentValue(attributeId);
    };

    this.$te.AddListeners(energyAttrIds, this.mon, "RoleEnergyComponent");
    this.mon();
    return !0;
  }
  OnEnd() {
    if (this.$te.GetCurrentValue) {
      this.$te.GetCurrentValue = originalGetCurrentValue;
    }
    return this.$te.RemoveListeners(energyAttrIds, this.mon);
    !0;
  }
};
(RoleEnergyComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(80)],
  RoleEnergyComponent
)),
  (exports.RoleEnergyComponent = RoleEnergyComponent);
//# sourceMappingURL=RoleEnergyComponent.js.map

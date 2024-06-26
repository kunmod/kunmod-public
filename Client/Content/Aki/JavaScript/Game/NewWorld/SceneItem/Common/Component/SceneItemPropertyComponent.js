"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, i, n) {
    var s,
      o = arguments.length,
      r =
        o < 3
          ? t
          : null === n
          ? (n = Object.getOwnPropertyDescriptor(t, i))
          : n;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      r = Reflect.decorate(e, t, i, n);
    else
      for (var h = e.length - 1; 0 <= h; h--)
        (s = e[h]) && (r = (o < 3 ? s(r) : 3 < o ? s(t, i, r) : s(t, i)) || r);
    return 3 < o && r && Object.defineProperty(t, i, r), r;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemPropertyComponent = void 0);
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
let SceneItemPropertyComponent = class SceneItemPropertyComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.Ste = void 0),
      (this._rn = void 0),
      (this.crn = 0),
      (this.mrn = !1),
      (this.drn = (e, t) => {
        e.includes(-662723379)
          ? TimerSystem_1.TimerSystem.Next(() => {
              this.Ste?.AddTagById(this.crn),
                (this.mrn = !0),
                EventSystem_1.EventSystem.EmitWithTarget(
                  this.Entity,
                  EventDefine_1.EEventName.OnSceneItemLockPropChange,
                  !0
                );
            })
          : t.includes(-662723379) &&
            TimerSystem_1.TimerSystem.Next(() => {
              this.Ste?.RemoveTagById(this.crn),
                (this.mrn = !1),
                EventSystem_1.EventSystem.EmitWithTarget(
                  this.Entity,
                  EventDefine_1.EEventName.OnSceneItemLockPropChange,
                  !1
                );
            });
      });
  }
  get IsLocked() {
    return this.mrn;
  }
  OnStart() {
    var e = this.Entity?.GetComponent(0);
    return (
      e &&
        (e = e.GetPbEntityInitData()) &&
        ((e = (0, IComponent_1.getComponent)(
          e.ComponentsData,
          "EntityStateComponent"
        )),
        (this._rn = e?.LockConfig),
        this._rn) &&
        ((this.Ste = this.Entity?.GetComponent(176)),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnLevelTagChanged,
          this.drn
        ),
        this.Crn()),
      !0
    );
  }
  OnEnd() {
    return (
      EventSystem_1.EventSystem.HasWithTarget(
        this.Entity,
        EventDefine_1.EEventName.OnLevelTagChanged,
        this.drn
      ) &&
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnLevelTagChanged,
          this.drn
        ),
      !0
    );
  }
  Crn() {
    if (this._rn) {
      switch (this._rn?.LockType) {
        case "Program":
          this.crn = -2073998558;
          break;
        case "Blackstone":
          this.crn = 1023182128;
          break;
        case "Holovision":
          this.crn = 1479110609;
          break;
        default:
          this.crn = -1900469744;
      }
      (this.mrn = !1),
        this.Ste.ContainsTagById(-662723379) &&
          ((this.mrn = !0), this.Ste.AddTagById(this.crn));
    }
  }
  RemoveLockPerformanceTagLocal() {
    this._rn && this.crn && this.Ste.RemoveTagById(this.crn);
  }
  SetIsBeingTargeted(e) {
    e
      ? this.Ste.ContainsTagById(712704422) || this.Ste.AddTagById(712704422)
      : this.Ste.ContainsTagById(712704422) &&
        this.Ste.RemoveTagById(712704422);
  }
};
(SceneItemPropertyComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(114)],
  SceneItemPropertyComponent
)),
  (exports.SceneItemPropertyComponent = SceneItemPropertyComponent);
//# sourceMappingURL=SceneItemPropertyComponent.js.map

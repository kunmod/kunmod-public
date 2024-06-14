"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapUtil = void 0);
const ue_1 = require("ue"),
  RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  Vector2D_1 = require("../../../Core/Utils/Math/Vector2D"),
  ObjectUtils_1 = require("../../../Core/Utils/ObjectUtils"),
  IComponent_1 = require("../../../UniverseEditor/Interface/IComponent"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  CharacterController_1 = require("../../NewWorld/Character/CharacterController"),
  MapDefine_1 = require("./MapDefine");
class MapUtil {
  static WorldPosition2UiPosition(e, t) {
    t = t ?? Vector_1.Vector.Create();
    return e.Multiply(MapDefine_1.world2UiUnit, t), t;
  }
  static WorldPosition2UiPosition2D(e, t) {
    t = t ?? Vector2D_1.Vector2D.Create();
    return e.Multiply(MapDefine_1.worldToScreenScale, t);
  }
  static UiPosition2WorldPosition(e, t) {
    t = t ?? Vector_1.Vector.Create();
    return e.Division(MapDefine_1.world2UiUnit, t);
  }
  static GetTilePosition(e, t = 0) {
    var e = Vector2D_1.Vector2D.Create(e),
      r =
        (e.DivisionEqual(100 * MapDefine_1.DETAIL_TILE_REALSIZE),
        Math.ceil(e.X + t));
    return { X: r, Y: Math.ceil(-e.Y + t) };
  }
  static GetTrackPositionByTrackTarget(t, r, o, i = !0) {
    if (!t) return Vector_1.Vector.ZeroVectorProxy;
    o = o ?? Vector_1.Vector.Create();
    if (t instanceof Vector_1.Vector) o.DeepCopy(t);
    else if (t instanceof Vector2D_1.Vector2D) o.Set(t.X, t.Y, 0);
    else if (t instanceof ue_1.Actor)
      t.IsValid() && o.FromUeVector(t.K2_GetActorLocation());
    else {
      let e = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t);
      if (
        (e = e || ModelManager_1.ModelManager.CreatureModel.GetEntityById(t))
      ) {
        var n = CharacterController_1.CharacterController.GetActorComponent(e);
        if (n && ObjectUtils_1.ObjectUtils.IsValid(n.Owner)) {
          if (n.SkeletalMesh) {
            o.FromUeVector(n.SkeletalMesh.K2_GetComponentLocation());
            const a = e.Entity.GetComponent(0),
              s = a?.GetPbModelConfig();
            s && o.AdditionEqual(Vector_1.Vector.Create(0, 0, s.HalfHeight));
          } else o.FromUeVector(n.Owner.K2_GetActorLocation());
          const a = e.Entity.GetComponent(0);
          if (a && r) {
            const s = a.GetPbModelConfig();
            s &&
              (s.TrackHeight
                ? o.Set(o.X, o.Y, o.Z + s.TrackHeight)
                : (0, RegisterComponent_1.isComponentInstance)(n, 3) &&
                  o.Set(o.X, o.Y, o.Z + n.ScaledHalfHeight));
          }
        } else this.iTi(t, o, i);
      } else this.iTi(t, o, i);
    }
    return o;
  }
  static iTi(e, t, r = !0) {
    (r = r
      ? ModelManager_1.ModelManager.CreatureModel.GetInstanceId()
      : MapDefine_1.BIG_WORLD_MAP_ID),
      (e = ModelManager_1.ModelManager.WorldMapModel.GetEntityPosition(e, r));
    e && t.FromUeVector(e), t.Division(100, t);
  }
  static IsInBigWorld(e) {
    return e === MapDefine_1.BIG_WORLD_MAP_ID;
  }
  static CrossingTest(t, r) {
    let o = !1;
    var i;
    let n = !1;
    var a;
    let s = t[t.length - 1],
      c = t[0],
      l = ((o = s.Y >= r.Y), (n = !1), 0);
    var _ = t.length;
    for (let e = 0; e < _; e++)
      (i = c.Y >= r.Y),
        o !== i &&
          ((a = s.X >= r.X) == c.X >= r.X
            ? a && (n = !n)
            : c.X - ((c.Y - r.Y) * (s.X - c.X)) / (s.Y - c.Y) >= r.X &&
              (n = !n),
          (o = i)),
        (s = c),
        (l += 1),
        (c = t[l]);
    return n;
  }
  static IsTemporaryTeleportEntity(e) {
    e = e.ComponentsData;
    return (
      void 0 !== (0, IComponent_1.getComponent)(e, "DynamicTeleportComponent")
    );
  }
  static IsTreasureBox(e) {
    e = e.ComponentsData;
    return void 0 !== (0, IComponent_1.getComponent)(e, "TreasureBoxComponent");
  }
  static IsSoundBox(e) {
    e = e.ComponentsData;
    return (
      8 ===
      (0, IComponent_1.getComponent)(e, "BaseInfoComponent").Category
        .ExploratoryDegree
    );
  }
}
exports.MapUtil = MapUtil;
//# sourceMappingURL=MapUtil.js.map

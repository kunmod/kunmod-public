"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnopenedAreaCheck = void 0);
const UE = require("ue"),
  ActorSystem_1 = require("../../../Core/Actor/ActorSystem"),
  Log_1 = require("../../../Core/Common/Log"),
  AreaByAreaId_1 = require("../../../Core/Define/ConfigQuery/AreaByAreaId"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
  Vector2D_1 = require("../../../Core/Utils/Math/Vector2D"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  TEST_AREA_COUNT = 30,
  FAILURE_COUNT = 7;
class UnopenedAreaCheck {
  constructor() {
    (this.IsSplineInit = !1),
      (this.ewe = 0),
      (this.twe = new Map()),
      (this.iwe = new Map());
  }
  AreaInit(t) {
    for (const e of t) this.rwe(e.AreaId, e.State ?? !1);
    0 === t.length &&
      Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Map", 43, "初始化区域数量为零"),
      (this.ewe = 0),
      (this.IsSplineInit = !0);
  }
  AreaStatesChange(t) {
    this.rwe(t.AreaState.AreaId, t.AreaState.State ?? !1),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Map",
          43,
          "AreaStatesChange更新区域边界状态",
          ["AreaState.AreaId", t.AreaState.AreaId],
          ["AreaState.State", t.AreaState.State ?? !1]
        );
  }
  rwe(t, e) {
    // 不再检查边界名称
    const r = AreaByAreaId_1.configAreaByAreaId.GetConfigList(t)[0].EdgeWallName + "_C";
  
    // 移除所有已存在的边界
    if (this.iwe.get(r).has(t)) {
      this.iwe.get(r).delete(t);
      Log_1.Log.CheckInfo() && Log_1.Log.Info("Map", 43, "AreaPathMap区域删除", ["AreaId", t], ["Path", r]);
    }
    if (0 === this.iwe.get(r).size && this.twe.has(r)) {
      this.twe.delete(r);
      Log_1.Log.CheckInfo() && Log_1.Log.Info("Map", 43, "BinMap移除边界", ["Path", r]);
    }
  
    // 不再添加新的边界
    if (e) {
      this.iwe.has(r) || this.iwe.set(r, new Set());
      if (!this.iwe.get(r).has(t)) {
        this.iwe.get(r).add(t);
        Log_1.Log.CheckInfo() && Log_1.Log.Info("Map", 43, "AreaPathMap区域添加", ["AreaId", t], ["Path", r]);
      }
      if (!this.twe.has(r)) {
        const i = new BinItem();
        i.InitCallback = () => {
          if (i && i.BinSet && i.TestPoints) {
            Log_1.Log.CheckInfo() && Log_1.Log.Info("Map", 43, "BinMap添加边界出错", ["Path", r]);
          }
        };
        i.Init(r);
      }
    }
  }
//   rwe(t, e) {
//     if (AreaByAreaId_1.configAreaByAreaId.GetConfigList(t)[0].EdgeWallName) {
//       const r =
//         AreaByAreaId_1.configAreaByAreaId.GetConfigList(t)[0].EdgeWallName +
//         "_C";
//       if (
//         (e ||
//           (this.iwe.get(r).has(t) &&
//             (this.iwe.get(r).delete(t), Log_1.Log.CheckInfo()) &&
//             Log_1.Log.Info(
//               "Map",
//               43,
//               "AreaPathMap区域删除",
//               ["AreaId", t],
//               ["Path", r]
//             ),
//           0 === this.iwe.get(r).size &&
//             this.twe.has(r) &&
//             (this.twe.delete(r), Log_1.Log.CheckInfo()) &&
//             Log_1.Log.Info("Map", 43, "BinMap移除边界", ["Path", r])),
//         e &&
//           (this.iwe.has(r) || this.iwe.set(r, new Set()),
//           this.iwe.get(r).has(t) ||
//             (this.iwe.get(r).add(t),
//             Log_1.Log.CheckInfo() &&
//               Log_1.Log.Info(
//                 "Map",
//                 43,
//                 "AreaPathMap区域添加",
//                 ["AreaId", t],
//                 ["Path", r]
//               )),
//           !this.twe.has(r)))
//       ) {
//         const i = new BinItem();
//         (i.InitCallback = () => {
//           i && i.BinSet && i.TestPoints
//             ? (this.twe.set(r, i),
//               Log_1.Log.CheckInfo() &&
//                 Log_1.Log.Info("Map", 43, "BinMap添加边界", ["Path", r]))
//             : Log_1.Log.CheckInfo() &&
//               Log_1.Log.Info("Map", 43, "BinMap添加边界出错", ["Path", r]);
//         }),
//           i.Init(r);
//       }
//     }
//   } 
  BinTest(t) {
    // if (!this.IsSplineInit || 0 === this.twe.size)
    //   return (
    //     this.ewe <= FAILURE_COUNT &&
    //       (this.ewe++,
    //       Log_1.Log.CheckInfo() &&
    //         Log_1.Log.Info(
    //           "Map",
    //           43,
    //           "检测是否进入未开放区域，检测失败",
    //           ["IsSplineInit", this.IsSplineInit],
    //           ["BinMap.size", this.twe.size]
    //         ),
    //       this.ewe === FAILURE_COUNT) &&
    //       Log_1.Log.CheckInfo() &&
    //       Log_1.Log.Info(
    //         "Map",
    //         43,
    //         "检测是否进入未开放区域一直失败，不报Log了"
    //       ),
    //     !0
    //   );
    // 0 !== this.ewe &&
    //   ((this.ewe = 0), Log_1.Log.CheckInfo()) &&
    //   Log_1.Log.Info("Map", 43, "检测是否进入未开放区域，恢复正常检测");
    // for (const e of this.twe) if (e[1].BinTest(t)) return !0;
    // return !1;
    return false;
  }
  Clear() {
    (this.IsSplineInit = !1), this.twe.clear();
  }
}
exports.UnopenedAreaCheck = UnopenedAreaCheck;
class BinItem {
  constructor() {
    (this.BinSet = new BinSet()),
      (this.TestPoints = new Array()),
      (this.InitCallback = void 0);
  }
  Init(e) {
    ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.Class, (t) => {
      this.owe(t)
        ? (this.nwe(this.TestPoints, TEST_AREA_COUNT, this.BinSet),
          this.InitCallback && this.InitCallback())
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Map",
            43,
            "样条Asset资源加载错误，或选中的目标样条非BP_BasePathLine_Edgewall类",
            ["Path", e]
          );
    });
  }
  owe(t) {
    t = ActorSystem_1.ActorSystem.Get(
      t,
      MathUtils_1.MathUtils.DefaultTransform
    );
    let e = void 0;
    if (!t.IsA(UE.BP_BasePathLine_Edgewall_C.StaticClass())) return !1;
    var r = (e = t).OriginalLocation,
      i =
        (t.K2_SetActorLocationAndRotation(
          r,
          Rotator_1.Rotator.ZeroRotator,
          !1,
          void 0,
          !1
        ),
        e.Spline),
      r = i.GetNumberOfSplinePoints();
    this.TestPoints.slice(0, r);
    for (let t = 0, e = r; t < e; t++) {
      var s = i.GetWorldLocationAtSplinePoint(t);
      this.TestPoints.push(new Vector2D_1.Vector2D(s.X, s.Y));
    }
    return t.K2_DestroyActor(), !0;
  }
  swe(t, e, r, i, s) {
    let a = r,
      o = i;
    i < r && ((a = i), (o = r)),
      s.Bins[t].MinX > a && (s.Bins[t].MinX = a),
      s.Bins[t].MaxX < o && (s.Bins[t].MaxX = o),
      (s.Bins[t].EdgeSet[e].MinX = a),
      (s.Bins[t].EdgeSet[e].MaxX = o);
  }
  BinTest(t) {
    var e = new Vector2D_1.Vector2D(t.X, t.Y),
      t = this.BinSet,
      r = this.TestPoints;
    if (e.Y < t.MinY || e.Y >= t.MaxY || e.X < t.MinX || e.X >= t.MaxX)
      return !1;
    var i = Math.floor((e.Y - t.MinY) * t.ReciprocalDeltaY),
      t = t.Bins[i];
    if (e.X < t.MinX || e.X > t.MaxX) return !1;
    var s,
      a,
      o,
      h = t.EdgeSet,
      n = t.Count;
    let _ = 0,
      l = !1;
    for (let t = 0; t < n; t++, _++) {
      if (e.X < h[_].MinX) {
        do {
          (!h[_].FullCross &&
            ((s = h[_].Id), e.Y <= r[s].Y == e.Y <= r[(s + 1) % r.length].Y)) ||
            (l = !l),
            (_ += 1);
        } while (++t < n);
        return l;
      }
      e.X < h[_].MaxX &&
        ((a = r[(o = h[_].Id)]),
        (o = r[(o + 1) % r.length]),
        h[_].FullCross || e.Y <= a.Y != e.Y <= o.Y) &&
        a.X - ((a.Y - e.Y) * (o.X - a.X)) / (o.Y - a.Y) >= e.X &&
        (l = !l);
    }
    return l;
  }
  nwe(e, t, a) {
    var r = new Array(t);
    (a.BinNum = t),
      (a.Bins = new Array(t)),
      (a.MinX = a.MaxX = e[0].X),
      (a.MinY = a.MaxY = e[0].Y);
    for (let t = 1; t < e.length; t++) {
      var i = e[t];
      a.MinX > i.X ? (a.MinX = i.X) : a.MaxX < i.X && (a.MaxX = i.X),
        a.MinY > i.Y ? (a.MinY = i.Y) : a.MaxY < i.Y && (a.MaxY = i.Y);
    }
    (a.MinY -= MathUtils_1.MathUtils.SmallNumber * (a.MaxY - a.MinY)),
      (a.MaxY += MathUtils_1.MathUtils.SmallNumber * (a.MaxY - a.MinY)),
      (a.DeltaY = (a.MaxY - a.MinY) / t),
      (a.ReciprocalDeltaY = 1 / a.DeltaY);
    let o = e[e.length - 1],
      h = void 0,
      n = void 0,
      _ = void 0;
    for (const h of e) {
      if (o.Y !== h.Y) {
        _ = o.Y < h.Y ? ((n = h), o) : ((n = o), h);
        var s = Math.floor((_.Y - a.MinY) * a.ReciprocalDeltaY),
          l = (n.Y - a.MinY) * a.ReciprocalDeltaY;
        let e = Math.floor(l);
        l - e == 0 && (e -= 1);
        for (let t = s; t <= e; t++) r[t] = (r[t] ?? 0) + 1;
      }
      o = h;
    }
    for (let e = 0; e < t; e++) {
      a.Bins[e] = new Bin();
      var A = new Array(r[e]);
      for (let t = 0; t < r[e]; t++) A[t] = new Edge();
      (a.Bins[e].EdgeSet = A),
        (a.Bins[e].MinX = a.MaxX),
        (a.Bins[e].MaxX = a.MinX),
        (a.Bins[e].Count = 0);
    }
    o = e[e.length - 1];
    let c = e.length - 1;
    for (let t = 0; t < e.length; t++) {
      if (((h = e[t]), o.Y !== h.Y)) {
        var p =
            ((_ = o.Y < h.Y ? ((n = h), o) : ((n = o), h)).Y - a.MinY) *
            a.ReciprocalDeltaY,
          u = Math.floor(p),
          M = (n.Y - a.MinY) * a.ReciprocalDeltaY;
        let e = Math.floor(M),
          r = (M - e == 0 && (e -= 1), _.X);
        var g = (a.DeltaY * (n.X - _.X)) / (n.Y - _.Y);
        let i = r,
          s = !1;
        for (let t = u; t < e; t++, r = i) {
          i = _.X + (t + 1 - p) * g;
          var L = a.Bins[t].Count;
          a.Bins[t].Count++,
            (a.Bins[t].EdgeSet[L].Id = c),
            (a.Bins[t].EdgeSet[L].FullCross = s),
            this.swe(t, L, r, i, a),
            (s = !0);
        }
        (r = i), (i = n.X);
        M = a.Bins[e].Count++;
        (a.Bins[e].EdgeSet[M].Id = c),
          (a.Bins[e].EdgeSet[M].FullCross = !1),
          this.swe(e, M, r, i, a);
      }
      (o = h), (c = t);
    }
    for (let t = 0; t < a.BinNum; t++)
      a.Bins[t].EdgeSet.sort((t, e) =>
        t.MinX === e.MinX ? 0 : t.MinX < e.MinX ? -1 : 1
      );
  }
}
class Edge {
  constructor() {
    (this.Id = 0), (this.FullCross = !1), (this.MinX = 0), (this.MaxX = 0);
  }
}
class Bin {
  constructor() {
    (this.EdgeSet = void 0), (this.MinX = 0), (this.MaxX = 0), (this.Count = 0);
  }
}
class BinSet {
  constructor() {
    (this.BinNum = 0),
      (this.MinX = 0),
      (this.MaxX = 0),
      (this.MaxY = 0),
      (this.DeltaY = 0),
      (this.ReciprocalDeltaY = 0),
      (this.Bins = void 0),
      (this.MinY = 0);
  }
}
//# sourceMappingURL=UnopenedAreaCheck.js.map

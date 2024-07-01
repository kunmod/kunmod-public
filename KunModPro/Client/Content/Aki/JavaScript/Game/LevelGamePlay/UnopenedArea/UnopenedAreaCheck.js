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
      (this.Xwe = 0),
      (this.$we = new Map()),
      (this.Ywe = new Map());
  }
  AreaInit(t) {
    for (const e of t) this.Jwe(e.wFn, e.ckn ?? !1);
    0 === t.length &&
      Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Map", 43, "初始化区域数量为零"),
      (this.Xwe = 0),
      (this.IsSplineInit = !0);
  }
  AreaStatesChange(t) {
    this.Jwe(t.uys.wFn, t.uys.ckn ?? !1),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Map",
          43,
          "AreaStatesChange更新区域边界状态",
          ["AreaState.Proto_AreaId", t.uys.wFn],
          ["AreaState.Proto_State", t.uys.ckn ?? !1]
        );
  }
  Jwe(t, e) {
    const r =
      AreaByAreaId_1.configAreaByAreaId.GetConfigList(t)[0].EdgeWallName + "_C";

    if (this.Ywe.get(r).has(t)) {
      this.Ywe.get(r).delete(t),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Map",
            43,
            "AreaPathMap区域删除",
            ["AreaId", t],
            ["Path", r]
          );
    }

    if (0 === this.Ywe.get(r).size && this.$we.has(r)) {
      this.$we.delete(r),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Map", 43, "BinMap移除边界", ["Path", r]);
    }

    if (e) {
      this.Ywe.has(r) || this.Ywe.set(r, new Set());
      if (!this.Ywe.get(r).has(t)) {
        this.Ywe.get(r).add(t),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Map",
              43,
              "AreaPathMap区域添加",
              ["AreaId", t],
              ["Path", r]
            );
      }

      if (!this.$we.has(r)) {
        const i = new BinItem();
        i.InitCallback = () => {
          if (i && i.BinSet && i.TestPoints) {
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("Map", 43, "BinMap添加边界", ["Path", r]);
          }
        };
        i.Init(r);
      }
    }

    // if (AreaByAreaId_1.configAreaByAreaId.GetConfigList(t)[0].EdgeWallName) {
    //   const r =
    //     AreaByAreaId_1.configAreaByAreaId.GetConfigList(t)[0].EdgeWallName +
    //     "_C";
    //   if (
    //     (e ||
    //       (this.Ywe.get(r).has(t) &&
    //         (this.Ywe.get(r).delete(t), Log_1.Log.CheckInfo()) &&
    //         Log_1.Log.Info(
    //           "Map",
    //           43,
    //           "AreaPathMap区域删除",
    //           ["AreaId", t],
    //           ["Path", r]
    //         ),
    //       0 === this.Ywe.get(r).size &&
    //         this.$we.has(r) &&
    //         (this.$we.delete(r), Log_1.Log.CheckInfo()) &&
    //         Log_1.Log.Info("Map", 43, "BinMap移除边界", ["Path", r])),
    //     e &&
    //       (this.Ywe.has(r) || this.Ywe.set(r, new Set()),
    //       this.Ywe.get(r).has(t) ||
    //         (this.Ywe.get(r).add(t),
    //         Log_1.Log.CheckInfo() &&
    //           Log_1.Log.Info(
    //             "Map",
    //             43,
    //             "AreaPathMap区域添加",
    //             ["AreaId", t],
    //             ["Path", r]
    //           )),
    //       !this.$we.has(r)))
    //   ) {
    //     const i = new BinItem();
    //     (i.InitCallback = () => {
    //       i && i.BinSet && i.TestPoints
    //         ? (this.$we.set(r, i),
    //           Log_1.Log.CheckInfo() &&
    //             Log_1.Log.Info("Map", 43, "BinMap添加边界", ["Path", r]))
    //         : Log_1.Log.CheckInfo() &&
    //           Log_1.Log.Info("Map", 43, "BinMap添加边界出错", ["Path", r]);
    //     }),
    //       i.Init(r);
    //   }
    // }
  }
  BinTest(t) {
    // if (!this.IsSplineInit || 0 === this.$we.size)
    //   return (
    //     this.Xwe <= FAILURE_COUNT &&
    //       (this.Xwe++,
    //       Log_1.Log.CheckInfo() &&
    //         Log_1.Log.Info(
    //           "Map",
    //           43,
    //           "检测是否进入未开放区域，检测失败",
    //           ["IsSplineInit", this.IsSplineInit],
    //           ["BinMap.size", this.$we.size]
    //         ),
    //       this.Xwe === FAILURE_COUNT) &&
    //       Log_1.Log.CheckInfo() &&
    //       Log_1.Log.Info(
    //         "Map",
    //         43,
    //         "检测是否进入未开放区域一直失败，不报Log了"
    //       ),
    //     !0
    //   );
    // 0 !== this.Xwe &&
    //   ((this.Xwe = 0), Log_1.Log.CheckInfo()) &&
    //   Log_1.Log.Info("Map", 43, "检测是否进入未开放区域，恢复正常检测");
    // for (const e of this.$we) if (e[1].BinTest(t)) return !0;
    // return !1;
    return false;
  }
  Clear() {
    (this.IsSplineInit = !1), this.$we.clear();
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
      this.zwe(t)
        ? (this.Zwe(this.TestPoints, TEST_AREA_COUNT, this.BinSet),
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
  zwe(t) {
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
  eBe(t, e, r, i, s) {
    let o = r,
      a = i;
    i < r && ((o = i), (a = r)),
      s.Bins[t].MinX > o && (s.Bins[t].MinX = o),
      s.Bins[t].MaxX < a && (s.Bins[t].MaxX = a),
      (s.Bins[t].EdgeSet[e].MinX = o),
      (s.Bins[t].EdgeSet[e].MaxX = a);
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
      o,
      a,
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
        ((o = r[(a = h[_].Id)]),
        (a = r[(a + 1) % r.length]),
        h[_].FullCross || e.Y <= o.Y != e.Y <= a.Y) &&
        o.X - ((o.Y - e.Y) * (a.X - o.X)) / (a.Y - o.Y) >= e.X &&
        (l = !l);
    }
    return l;
  }
  Zwe(e, t, o) {
    var r = new Array(t);
    (o.BinNum = t),
      (o.Bins = new Array(t)),
      (o.MinX = o.MaxX = e[0].X),
      (o.MinY = o.MaxY = e[0].Y);
    for (let t = 1; t < e.length; t++) {
      var i = e[t];
      o.MinX > i.X ? (o.MinX = i.X) : o.MaxX < i.X && (o.MaxX = i.X),
        o.MinY > i.Y ? (o.MinY = i.Y) : o.MaxY < i.Y && (o.MaxY = i.Y);
    }
    (o.MinY -= MathUtils_1.MathUtils.SmallNumber * (o.MaxY - o.MinY)),
      (o.MaxY += MathUtils_1.MathUtils.SmallNumber * (o.MaxY - o.MinY)),
      (o.DeltaY = (o.MaxY - o.MinY) / t),
      (o.ReciprocalDeltaY = 1 / o.DeltaY);
    let a = e[e.length - 1],
      h = void 0,
      n = void 0,
      _ = void 0;
    for (const h of e) {
      if (a.Y !== h.Y) {
        _ = a.Y < h.Y ? ((n = h), a) : ((n = a), h);
        var s = Math.floor((_.Y - o.MinY) * o.ReciprocalDeltaY),
          l = (n.Y - o.MinY) * o.ReciprocalDeltaY;
        let e = Math.floor(l);
        l - e == 0 && (e -= 1);
        for (let t = s; t <= e; t++) r[t] = (r[t] ?? 0) + 1;
      }
      a = h;
    }
    for (let e = 0; e < t; e++) {
      o.Bins[e] = new Bin();
      var A = new Array(r[e]);
      for (let t = 0; t < r[e]; t++) A[t] = new Edge();
      (o.Bins[e].EdgeSet = A),
        (o.Bins[e].MinX = o.MaxX),
        (o.Bins[e].MaxX = o.MinX),
        (o.Bins[e].Count = 0);
    }
    a = e[e.length - 1];
    let c = e.length - 1;
    for (let t = 0; t < e.length; t++) {
      if (((h = e[t]), a.Y !== h.Y)) {
        var p =
            ((_ = a.Y < h.Y ? ((n = h), a) : ((n = a), h)).Y - o.MinY) *
            o.ReciprocalDeltaY,
          u = Math.floor(p),
          M = (n.Y - o.MinY) * o.ReciprocalDeltaY;
        let e = Math.floor(M),
          r = (M - e == 0 && (e -= 1), _.X);
        var g = (o.DeltaY * (n.X - _.X)) / (n.Y - _.Y);
        let i = r,
          s = !1;
        for (let t = u; t < e; t++, r = i) {
          i = _.X + (t + 1 - p) * g;
          var L = o.Bins[t].Count;
          o.Bins[t].Count++,
            (o.Bins[t].EdgeSet[L].Id = c),
            (o.Bins[t].EdgeSet[L].FullCross = s),
            this.eBe(t, L, r, i, o),
            (s = !0);
        }
        (r = i), (i = n.X);
        M = o.Bins[e].Count++;
        (o.Bins[e].EdgeSet[M].Id = c),
          (o.Bins[e].EdgeSet[M].FullCross = !1),
          this.eBe(e, M, r, i, o);
      }
      (a = h), (c = t);
    }
    for (let t = 0; t < o.BinNum; t++)
      o.Bins[t].EdgeSet.sort((t, e) =>
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

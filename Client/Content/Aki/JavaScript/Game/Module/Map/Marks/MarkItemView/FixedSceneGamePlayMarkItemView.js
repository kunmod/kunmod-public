
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.FixedSceneGamePlayMarkItemView=void 0;const ModelManager_1=require("../../../../Manager/ModelManager"),ConfigMarkItemView_1=require("./ConfigMarkItemView");class FixedSceneGamePlayMarkItemView extends ConfigMarkItemView_1.ConfigMarkItemView{constructor(e){super(e)}OnInitialize(){super.OnInitialize(),this.OnIconPathChanged(this.Holder.IconPath)}OnUpdate(e,r,a){super.OnUpdate(e,r);var e=this.Holder,r=e.IconPath,i=ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayInfo(e.MarkConfig.RelativeId);!i||i.IsClose?e.IconPath=e.MarkConfig.LockMarkPic:(e.IconPath=e.MarkConfig.UnlockMarkPic,r!==e.IconPath&&this.OnIconPathChanged(e.IconPath))}}exports.FixedSceneGamePlayMarkItemView=FixedSceneGamePlayMarkItemView;
//# sourceMappingURL=FixedSceneGamePlayMarkItemView.js.map
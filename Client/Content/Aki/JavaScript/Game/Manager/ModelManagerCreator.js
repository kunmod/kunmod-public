"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ModelManagerCreator = void 0);
const AudioModel_1 = require("../../Core/Audio/AudioModel"),
  AiModel_1 = require("../AI/Common/AiModel"),
  AiStateMachineModel_1 = require("../AI/StateMachine/AiStateMachineModel"),
  CameraModel_1 = require("../Camera/CameraModel"),
  InputModel_1 = require("../Input/InputModel"),
  KuroSdkModel_1 = require("../KuroSdk/KuroSdkModel"),
  CipherModel_1 = require("../LevelGamePlay/Cipher/CipherModel"),
  GameSplineModel_1 = require("../LevelGamePlay/Common/GameSplineModel"),
  LevelGamePlayModel_1 = require("../LevelGamePlay/LevelGamePlayModel"),
  LevelGeneralModel_1 = require("../LevelGamePlay/LevelGeneralModel"),
  ParkourModel_1 = require("../LevelGamePlay/Parkour/ParkourModel"),
  SignalDeviceModel_1 = require("../LevelGamePlay/SignalDeviceControl/SignalDeviceModel"),
  StaticSceneModel_1 = require("../LevelGamePlay/StaticScene/StaticSceneModel"),
  SundialControlModel_1 = require("../LevelGamePlay/SundialControl/SundialControlModel"),
  TimeTrackControlModel_1 = require("../LevelGamePlay/TimeTrackControl/TimeTrackControlModel"),
  TurntableControlModel_1 = require("../LevelGamePlay/TurntableControl/TurntableControlModel"),
  FormationAttributeModel_1 = require("../Module/Abilities/FormationAttributeModel"),
  FormationDataModel_1 = require("../Module/Abilities/FormationDataModel"),
  AchievementModel_1 = require("../Module/Achievement/AchievementModel"),
  ActivityRunModel_1 = require("../Module/Activity/ActivityContent/Run/ActivityRunModel"),
  ActivityModel_1 = require("../Module/Activity/ActivityModel"),
  AdventureGuideModel_1 = require("../Module/AdventureGuide/AdventureGuideModel"),
  AdviceModel_1 = require("../Module/Advice/AdviceModel"),
  AiWeaponModel_1 = require("../Module/AiInteraction/AiWeapon/AiWeaponModel"),
  AntiCheatModel_1 = require("../Module/AntiCheat/AntiCheatModel"),
  AreaModel_1 = require("../Module/Area/AreaModel"),
  AttributeModel_1 = require("../Module/Attribute/AttributeModel"),
  AutoRunModel_1 = require("../Module/AutoRunMode/AutoRunModel"),
  SkillCdModel_1 = require("../Module/Battle/SkillCdModel"),
  BattleUiModel_1 = require("../Module/BattleUi/BattleUiModel"),
  AlertMarksModel_1 = require("../Module/BattleUi/Views/AlertMarksModel"),
  BattleUiSetModel_1 = require("../Module/BattleUiSet/BattleUiSetModel"),
  BuffItemModel_1 = require("../Module/BuffItem/BuffItemModel"),
  CalabashModel_1 = require("../Module/Calabash/CalabashModel"),
  ChannelModel_1 = require("../Module/Channel/ChannelModel"),
  ChatModel_1 = require("../Module/Chat/ChatModel"),
  CombatMessageModel_1 = require("../Module/CombatMessage/CombatMessageModel"),
  ComboTeachingModel_1 = require("../Module/ComboTeach/ComboTeachingModel"),
  FilterModel_1 = require("../Module/Common/FilterSort/Filter/Model/FilterModel"),
  SortModel_1 = require("../Module/Common/FilterSort/Sort/Model/SortModel"),
  ItemTipsModel_1 = require("../Module/Common/ItemTips/ItemTipsModel"),
  MediumItemGridModel_1 = require("../Module/Common/MediumItemGrid/MediumItemGridModel"),
  SmallItemGridModel_1 = require("../Module/Common/SmallItemGrid/SmallItemGridModel"),
  ControlScreenModel_1 = require("../Module/ControlScreen/ControlScreenModel"),
  CookModel_1 = require("../Module/Cook/CookModel"),
  DailyActivityModel_1 = require("../Module/DailyActivity/DailyActivityModel"),
  DeadReviveModel_1 = require("../Module/DeadRevive/DeadReviveModel"),
  EditBattleTeamModel_1 = require("../Module/EditBattleTeam/EditBattleTeamModel"),
  EditFormationModel_1 = require("../Module/EditFormation/EditFormationModel"),
  ExploreLevelModel_1 = require("../Module/ExploreLevel/ExploreLevelModel"),
  ExploreProgressModel_1 = require("../Module/ExploreProgress/ExploreProgressModel"),
  ExploreResultModel_1 = require("../Module/ExploreUi/ExploreResultModel"),
  FormationModel_1 = require("../Module/Formation/FormationModel"),
  FriendModel_1 = require("../Module/Friend/FriendModel"),
  FunctionModel_1 = require("../Module/Functional/FunctionModel"),
  LevelFuncFlagModel_1 = require("../Module/Functional/LevelFuncFlag/LevelFuncFlagModel"),
  GachaModel_1 = require("../Module/Gacha/GachaModel"),
  GamePingModel_1 = require("../Module/GamePing/GamePingModel"),
  GeneralLogicTreeModel_1 = require("../Module/GeneralLogicTree/GeneralLogicTreeModel"),
  GenericPromptModel_1 = require("../Module/GenericPrompt/GenericPromptModel"),
  GuideModel_1 = require("../Module/Guide/Model/GuideModel"),
  HandBookModel_1 = require("../Module/HandBook/HandBookModel"),
  HideTargetModel_1 = require("../Module/HideTarget/Model/HideTargetModel"),
  InfluenceModel_1 = require("../Module/Influence/Model/InfluenceModel"),
  InfluenceReputationModel_1 = require("../Module/Influence/Model/InfluenceReputationModel"),
  InfoDisplayModel_1 = require("../Module/InfoDisplay/Data/InfoDisplayModel"),
  ExchangeRewardModel_1 = require("../Module/InstanceDungeon/ExchangeReward/ExchangeRewardModel"),
  InstanceDungeonEntranceModel_1 = require("../Module/InstanceDungeon/InstanceDungeonEntranceModel"),
  InstanceDungeonGuideModel_1 = require("../Module/InstanceDungeon/InstanceDungeonGuideModel"),
  InstanceDungeonModel_1 = require("../Module/InstanceDungeon/InstanceDungeonModel"),
//   InteractionModel_1 = require("../Module/Interaction/InteractionModel"), // remove old
  InteractionModel_1 = require("../Module/Interaction/InteractionModel_New"), // add new
  InventoryModel_1 = require("../Module/Inventory/InventoryModel"),
  ItemModel_1 = require("../Module/Item/ItemModel"),
  SpecialItemModel_1 = require("../Module/Item/SpecialItem/SpecialItemModel"),
  ItemDeliverModel_1 = require("../Module/ItemDeliver/ItemDeliverModel"),
  ItemExchangeModel_1 = require("../Module/ItemExchange/ItemExchangeModel"),
  ItemHintModel_1 = require("../Module/ItemHint/ItemHintModel"),
  ItemRewardModel_1 = require("../Module/ItemReward/ItemRewardModel"),
  JoinTeamModel_1 = require("../Module/JoinTeam/JoinTeamModel"),
  LevelLoadingModel_1 = require("../Module/LevelLoading/LevelLoadingModel"),
  LevelPlayModel_1 = require("../Module/LevelPlay/LevelPlayModel"),
  LevelUpModel_1 = require("../Module/LevelUp/LevelUpModel"),
  LoadingModel_1 = require("../Module/Loading/LoadingModel"),
  LoginModel_1 = require("../Module/Login/LoginModel"),
  LoginServerModel_1 = require("../Module/Login/LoginServerModel"),
  LordGymModel_1 = require("../Module/LordGym/LordGymModel"),
  MailModel_1 = require("../Module/Mail/MailModel"),
  ComposeModel_1 = require("../Module/Manufacture/Compose/ComposeModel"),
  ForgingModel_1 = require("../Module/Manufacture/Forging/ForgingModel"),
  MapModel_1 = require("../Module/Map/MapModel"),
  MapExploreToolModel_1 = require("../Module/MapExploreTool/MapExploreToolModel"),
  MarqueeModel_1 = require("../Module/Marquee/MarqueeModel"),
  MenuModel_1 = require("../Module/Menu/MenuModel"),
  MingSuModel_1 = require("../Module/MingSu/MingSuModel"),
  MotionModel_1 = require("../Module/Motion/MotionModel"),
  NewFlagModel_1 = require("../Module/NewFlag/NewFlagModel"),
  OnlineModel_1 = require("../Module/Online/OnlineModel"),
  PanelQteModel_1 = require("../Module/PanelQte/PanelQteModel"),
  PayItemModel_1 = require("../Module/PayItem/PayItemModel"),
  BattlePassModel_1 = require("../Module/PayShop/BattlePass/BattlePassModel"),
  MonthCardModel_1 = require("../Module/PayShop/MonthCard/MonthCardModel"),
  PayGiftModel_1 = require("../Module/PayShop/PayGiftModel"),
  PayShopModel_1 = require("../Module/PayShop/PayShopModel"),
  PersonalModel_1 = require("../Module/Personal/Model/PersonalModel"),
  PhantomBattleModel_1 = require("../Module/Phantom/PhantomBattle/PhantomBattleModel"),
  PhotographModel_1 = require("../Module/Photograph/PhotographModel"),
  PlatformModel_1 = require("../Module/Platform/PlatformModel"),
  PlayerInfoModel_1 = require("../Module/PlayerInfo/PlayerInfoModel"),
  PlotModel_1 = require("../Module/Plot/PlotModel"),
  SequenceModel_1 = require("../Module/Plot/Sequence/SequenceModel"),
  PowerModel_1 = require("../Module/Power/PowerModel"),
  DailyTaskModel_1 = require("../Module/QuestNew/Model/DailyTaskModel"),
  QuestModel_1 = require("../Module/QuestNew/Model/QuestModel"),
  RechargeModel_1 = require("../Module/Recharge/RechargeModel"),
  ReConnectModel_1 = require("../Module/ReConnect/ReConnectModel"),
  RewardModel_1 = require("../Module/Reward/RewardModel"),
  RoguelikeModel_1 = require("../Module/Roguelike/RoguelikeModel"),
  RoleSelectModel_1 = require("../Module/RoleSelect/RoleSelectModel"),
  RoleFavorConditionModel_1 = require("../Module/RoleUi/RoleFavorConditionModel"),
  RoleModel_1 = require("../Module/RoleUi/RoleModel"),
  RouletteModel_1 = require("../Module/Roulette/RouletteModel"),
  ScoreModel_1 = require("../Module/Score/ScoreModel"),
  SeamlessTravelModel_1 = require("../Module/SeamlessTravel/SeamlessTravelModel"),
  ShopModel_1 = require("../Module/Shop/ShopModel"),
  SignalDecodeModel_1 = require("../Module/SignalDecode/SignalDecodeModel"),
  SkillButtonUiModel_1 = require("../Module/SkillButtonUi/SkillButtonUiModel"),
  SkipInterfaceModel_1 = require("../Module/SkipInterface/SkipInterfaceModel"),
  SubLevelLoadingModel_1 = require("../Module/SubLevelLoading/SubLevelLoadingModel"),
  SundryModel_1 = require("../Module/Sundry/SundryModel"),
  TeleportModel_1 = require("../Module/Teleport/TeleportModel"),
  TimeOfDayModel_1 = require("../Module/TimeOfDay/TimeOfDayModel"),
  TowerDetailModel_1 = require("../Module/TowerDetailUi/TowerDetailModel"),
  TowerModel_1 = require("../Module/TowerDetailUi/TowerModel"),
  TrackModel_1 = require("../Module/Track/TrackModel"),
  TrainingDegreeModel_1 = require("../Module/TrainingDegree/TrainingDegreeModel"),
  TutorialModel_1 = require("../Module/Tutorial/TutorialModel"),
  UiNavigationModel_1 = require("../Module/UiNavigation/UiNavigationModel"),
  WaitEntityTaskModel_1 = require("../Module/WaitEntityTask/WaitEntityTaskModel"),
  WeaponModel_1 = require("../Module/Weapon/WeaponModel"),
  WeatherModel_1 = require("../Module/Weather/WeatherModel"),
  WorldLevelModel_1 = require("../Module/WorldLevel/WorldLevelModel"),
  WorldMapModel_1 = require("../Module/WorldMap/WorldMapModel"),
  WuYinAreaModel_1 = require("../Module/WuYinArea/WuYinAreaModel"),
  BulletModel_1 = require("../NewWorld/Bullet/Model/BulletModel"),
  CharacterModel_1 = require("../NewWorld/Character/CharacterModel"),
  CharacterBuffModel_1 = require("../NewWorld/Character/Common/Component/Abilities/CharacterBuffModel"),
  CharacterManipulateInteractModel_1 = require("../NewWorld/Character/Common/Component/CharacterManipulateInteractModel"),
  CharacterManipulaterModel_1 = require("../NewWorld/Character/Common/Component/CharacterManipulaterModel"),
  NpcConfigModel_1 = require("../NewWorld/Character/Npc/Datas/NpcConfigModel"),
  RangeItemModel_1 = require("../NewWorld/SceneItem/Model/RangeItemModel"),
  SceneInteractionModel_1 = require("../NewWorld/SceneItem/Model/SceneInteractionModel"),
  SceneItemBuffModel_1 = require("../NewWorld/SceneItem/Model/SceneItemBuffModel"),
  ShootTargetModel_1 = require("../NewWorld/SceneItem/Model/ShootTargetModel"),
  VisionCaptureModel_1 = require("../NewWorld/SceneItem/Model/VisionCaptureModel"),
  TriggerVolumeModel_1 = require("../NewWorld/TriggerItems/Model/TriggerVolumeModel"),
  RedDotModel_1 = require("../RedDot/RedDotModel"),
  RenderModuleModel_1 = require("../Render/Manager/RenderModuleModel"),
  InputDistributeModel_1 = require("../Ui/InputDistribute/InputDistributeModel"),
  AoiModel_1 = require("../World/Model/AoiModel"),
  BlackboardModel_1 = require("../World/Model/BlackboardModel"),
  CreatureModel_1 = require("../World/Model/CreatureModel"),
  GameModeModel_1 = require("../World/Model/GameModeModel"),
  PreloadModel_1 = require("../World/Model/PreloadModel"),
  TraceElementModel_1 = require("../World/Model/TraceElementModel"),
  WorldDebugModel_1 = require("../World/Model/WorldDebugModel"),
  WorldModel_1 = require("../World/Model/WorldModel"),
  ModelManager_1 = require("./ModelManager");
class ModelManagerCreator {
  static Init() {
    return (
      (ModelManager_1.ModelManager.PlatformModel =
        new PlatformModel_1.PlatformModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.PlatformModel
      ),
      (ModelManager_1.ModelManager.RedDotModel =
        new RedDotModel_1.RedDotModel()),
      ModelManager_1.ModelManager.Add(ModelManager_1.ModelManager.RedDotModel),
      (ModelManager_1.ModelManager.InputModel = new InputModel_1.InputModel()),
      ModelManager_1.ModelManager.Add(ModelManager_1.ModelManager.InputModel),
      (ModelManager_1.ModelManager.CameraModel =
        new CameraModel_1.CameraModel()),
      ModelManager_1.ModelManager.Add(ModelManager_1.ModelManager.CameraModel),
      (ModelManager_1.ModelManager.CharacterModel =
        new CharacterModel_1.CharacterModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.CharacterModel
      ),
      (ModelManager_1.ModelManager.CreatureModel =
        new CreatureModel_1.CreatureModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.CreatureModel
      ),
      (ModelManager_1.ModelManager.WorldModel = new WorldModel_1.WorldModel()),
      ModelManager_1.ModelManager.Add(ModelManager_1.ModelManager.WorldModel),
      (ModelManager_1.ModelManager.SubLevelLoadingModel =
        new SubLevelLoadingModel_1.SubLevelLoadingModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.SubLevelLoadingModel
      ),
      (ModelManager_1.ModelManager.WorldDebugModel =
        new WorldDebugModel_1.WorldDebugModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.WorldDebugModel
      ),
      (ModelManager_1.ModelManager.BlackboardModel =
        new BlackboardModel_1.BlackboardModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.BlackboardModel
      ),
      (ModelManager_1.ModelManager.GameModeModel =
        new GameModeModel_1.GameModeModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.GameModeModel
      ),
      (ModelManager_1.ModelManager.AreaModel = new AreaModel_1.AreaModel()),
      ModelManager_1.ModelManager.Add(ModelManager_1.ModelManager.AreaModel),
      (ModelManager_1.ModelManager.MailModel = new MailModel_1.MailModel()),
      ModelManager_1.ModelManager.Add(ModelManager_1.ModelManager.MailModel),
      (ModelManager_1.ModelManager.LoginModel = new LoginModel_1.LoginModel()),
      ModelManager_1.ModelManager.Add(ModelManager_1.ModelManager.LoginModel),
      (ModelManager_1.ModelManager.ItemModel = new ItemModel_1.ItemModel()),
      ModelManager_1.ModelManager.Add(ModelManager_1.ModelManager.ItemModel),
      (ModelManager_1.ModelManager.SpecialItemModel =
        new SpecialItemModel_1.SpecialItemModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.SpecialItemModel
      ),
      (ModelManager_1.ModelManager.GuideModel = new GuideModel_1.GuideModel()),
      ModelManager_1.ModelManager.Add(ModelManager_1.ModelManager.GuideModel),
      (ModelManager_1.ModelManager.PlayerInfoModel =
        new PlayerInfoModel_1.PlayerInfoModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.PlayerInfoModel
      ),
      (ModelManager_1.ModelManager.AutoRunModel =
        new AutoRunModel_1.AutoRunModel()),
      ModelManager_1.ModelManager.Add(ModelManager_1.ModelManager.AutoRunModel),
      (ModelManager_1.ModelManager.CipherModel =
        new CipherModel_1.CipherModel()),
      ModelManager_1.ModelManager.Add(ModelManager_1.ModelManager.CipherModel),
      (ModelManager_1.ModelManager.EditBattleTeamModel =
        new EditBattleTeamModel_1.EditBattleTeamModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.EditBattleTeamModel
      ),
      (ModelManager_1.ModelManager.MapModel = new MapModel_1.MapModel()),
      ModelManager_1.ModelManager.Add(ModelManager_1.ModelManager.MapModel),
      (ModelManager_1.ModelManager.InventoryModel =
        new InventoryModel_1.InventoryModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.InventoryModel
      ),
      (ModelManager_1.ModelManager.ReConnectModel =
        new ReConnectModel_1.ReConnectModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.ReConnectModel
      ),
      (ModelManager_1.ModelManager.FormationModel =
        new FormationModel_1.FormationModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.FormationModel
      ),
      (ModelManager_1.ModelManager.ChannelModel =
        new ChannelModel_1.ChannelModel()),
      ModelManager_1.ModelManager.Add(ModelManager_1.ModelManager.ChannelModel),
      (ModelManager_1.ModelManager.EditFormationModel =
        new EditFormationModel_1.EditFormationModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.EditFormationModel
      ),
      (ModelManager_1.ModelManager.SkillCdModel =
        new SkillCdModel_1.SkillCdModel()),
      ModelManager_1.ModelManager.Add(ModelManager_1.ModelManager.SkillCdModel),
      (ModelManager_1.ModelManager.BattleUiModel =
        new BattleUiModel_1.BattleUiModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.BattleUiModel
      ),
      (ModelManager_1.ModelManager.MingSuModel =
        new MingSuModel_1.MingSuModel()),
      ModelManager_1.ModelManager.Add(ModelManager_1.ModelManager.MingSuModel),
      (ModelManager_1.ModelManager.ShopModel = new ShopModel_1.ShopModel()),
      ModelManager_1.ModelManager.Add(ModelManager_1.ModelManager.ShopModel),
      (ModelManager_1.ModelManager.WeaponModel =
        new WeaponModel_1.WeaponModel()),
      ModelManager_1.ModelManager.Add(ModelManager_1.ModelManager.WeaponModel),
      (ModelManager_1.ModelManager.InstanceDungeonModel =
        new InstanceDungeonModel_1.InstanceDungeonModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.InstanceDungeonModel
      ),
      (ModelManager_1.ModelManager.InstanceDungeonEntranceModel =
        new InstanceDungeonEntranceModel_1.InstanceDungeonEntranceModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.InstanceDungeonEntranceModel
      ),
      (ModelManager_1.ModelManager.RoleModel = new RoleModel_1.RoleModel()),
      ModelManager_1.ModelManager.Add(ModelManager_1.ModelManager.RoleModel),
      (ModelManager_1.ModelManager.QuestNewModel =
        new QuestModel_1.QuestNewModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.QuestNewModel
      ),
      (ModelManager_1.ModelManager.ItemHintModel =
        new ItemHintModel_1.ItemHintModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.ItemHintModel
      ),
      (ModelManager_1.ModelManager.AttributeModel =
        new AttributeModel_1.AttributeModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.AttributeModel
      ),
      (ModelManager_1.ModelManager.WorldMapModel =
        new WorldMapModel_1.WorldMapModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.WorldMapModel
      ),
      (ModelManager_1.ModelManager.LoadingModel =
        new LoadingModel_1.LoadingModel()),
      ModelManager_1.ModelManager.Add(ModelManager_1.ModelManager.LoadingModel),
      (ModelManager_1.ModelManager.RewardModel =
        new RewardModel_1.RewardModel()),
      ModelManager_1.ModelManager.Add(ModelManager_1.ModelManager.RewardModel),
      (ModelManager_1.ModelManager.FunctionModel =
        new FunctionModel_1.FunctionModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.FunctionModel
      ),
      (ModelManager_1.ModelManager.LevelFuncFlagModel =
        new LevelFuncFlagModel_1.LevelFuncFlagModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.LevelFuncFlagModel
      ),
      (ModelManager_1.ModelManager.LevelGeneralModel =
        new LevelGeneralModel_1.LevelGeneralModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.LevelGeneralModel
      ),
      (ModelManager_1.ModelManager.BulletModel =
        new BulletModel_1.BulletModel()),
      ModelManager_1.ModelManager.Add(ModelManager_1.ModelManager.BulletModel),
      (ModelManager_1.ModelManager.BuffModel =
        new CharacterBuffModel_1.BuffModel()),
      ModelManager_1.ModelManager.Add(ModelManager_1.ModelManager.BuffModel),
      (ModelManager_1.ModelManager.PowerModel = new PowerModel_1.PowerModel()),
      ModelManager_1.ModelManager.Add(ModelManager_1.ModelManager.PowerModel),
      (ModelManager_1.ModelManager.LevelUpModel =
        new LevelUpModel_1.LevelUpModel()),
      ModelManager_1.ModelManager.Add(ModelManager_1.ModelManager.LevelUpModel),
      (ModelManager_1.ModelManager.InputDistributeModel =
        new InputDistributeModel_1.InputDistributeModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.InputDistributeModel
      ),
      (ModelManager_1.ModelManager.AoiModel = new AoiModel_1.AoiModel()),
      ModelManager_1.ModelManager.Add(ModelManager_1.ModelManager.AoiModel),
      (ModelManager_1.ModelManager.PreloadModel =
        new PreloadModel_1.PreloadModel()),
      ModelManager_1.ModelManager.Add(ModelManager_1.ModelManager.PreloadModel),
      (ModelManager_1.ModelManager.TimeOfDayModel =
        new TimeOfDayModel_1.TimeOfDayModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.TimeOfDayModel
      ),
      (ModelManager_1.ModelManager.DeadReviveModel =
        new DeadReviveModel_1.DeadReviveModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.DeadReviveModel
      ),
      (ModelManager_1.ModelManager.WorldLevelModel =
        new WorldLevelModel_1.WorldLevelModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.WorldLevelModel
      ),
      (ModelManager_1.ModelManager.AiModel = new AiModel_1.AiModel()),
      ModelManager_1.ModelManager.Add(ModelManager_1.ModelManager.AiModel),
      (ModelManager_1.ModelManager.CalabashModel =
        new CalabashModel_1.CalabashModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.CalabashModel
      ),
      (ModelManager_1.ModelManager.PlotModel = new PlotModel_1.PlotModel()),
      ModelManager_1.ModelManager.Add(ModelManager_1.ModelManager.PlotModel),
      (ModelManager_1.ModelManager.JoinTeamModel =
        new JoinTeamModel_1.JoinTeamModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.JoinTeamModel
      ),
      (ModelManager_1.ModelManager.ControlScreenModel =
        new ControlScreenModel_1.ControlScreenModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.ControlScreenModel
      ),
      (ModelManager_1.ModelManager.WuYinAreaModel =
        new WuYinAreaModel_1.WuYinAreaModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.WuYinAreaModel
      ),
      (ModelManager_1.ModelManager.AiWeaponModel =
        new AiWeaponModel_1.AiWeaponModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.AiWeaponModel
      ),
      (ModelManager_1.ModelManager.BuffItemModel =
        new BuffItemModel_1.BuffItemModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.BuffItemModel
      ),
      (ModelManager_1.ModelManager.MarqueeModel =
        new MarqueeModel_1.MarqueeModel()),
      ModelManager_1.ModelManager.Add(ModelManager_1.ModelManager.MarqueeModel),
      (ModelManager_1.ModelManager.ShootTargetModel =
        new ShootTargetModel_1.ShootTargetModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.ShootTargetModel
      ),
      (ModelManager_1.ModelManager.SequenceModel =
        new SequenceModel_1.SequenceModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.SequenceModel
      ),
      (ModelManager_1.ModelManager.TriggerVolumeModel =
        new TriggerVolumeModel_1.TriggerVolumeModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.TriggerVolumeModel
      ),
      (ModelManager_1.ModelManager.SceneInteractionModel =
        new SceneInteractionModel_1.SceneInteractionModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.SceneInteractionModel
      ),
      (ModelManager_1.ModelManager.MenuModel = new MenuModel_1.MenuModel()),
      ModelManager_1.ModelManager.Add(ModelManager_1.ModelManager.MenuModel),
      (ModelManager_1.ModelManager.GenericPromptModel =
        new GenericPromptModel_1.GenericPromptModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.GenericPromptModel
      ),
      (ModelManager_1.ModelManager.InteractionModel =
        new InteractionModel_1.InteractionModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.InteractionModel
      ),
      (ModelManager_1.ModelManager.LevelGamePlayModel =
        new LevelGamePlayModel_1.LevelGamePlayModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.LevelGamePlayModel
      ),
      (ModelManager_1.ModelManager.TrackModel = new TrackModel_1.TrackModel()),
      ModelManager_1.ModelManager.Add(ModelManager_1.ModelManager.TrackModel),
      (ModelManager_1.ModelManager.FormationAttributeModel =
        new FormationAttributeModel_1.FormationAttributeModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.FormationAttributeModel
      ),
      (ModelManager_1.ModelManager.FormationDataModel =
        new FormationDataModel_1.FormationDataModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.FormationDataModel
      ),
      (ModelManager_1.ModelManager.CombatMessageModel =
        new CombatMessageModel_1.CombatMessageModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.CombatMessageModel
      ),
      (ModelManager_1.ModelManager.RenderModuleModel =
        new RenderModuleModel_1.RenderModuleModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.RenderModuleModel
      ),
      (ModelManager_1.ModelManager.FriendModel =
        new FriendModel_1.FriendModel()),
      ModelManager_1.ModelManager.Add(ModelManager_1.ModelManager.FriendModel),
      (ModelManager_1.ModelManager.UiNavigationModel =
        new UiNavigationModel_1.UiNavigationModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.UiNavigationModel
      ),
      (ModelManager_1.ModelManager.ChatModel = new ChatModel_1.ChatModel()),
      ModelManager_1.ModelManager.Add(ModelManager_1.ModelManager.ChatModel),
      (ModelManager_1.ModelManager.ParkourModel =
        new ParkourModel_1.ParkourModel()),
      ModelManager_1.ModelManager.Add(ModelManager_1.ModelManager.ParkourModel),
      (ModelManager_1.ModelManager.GeneralLogicTreeModel =
        new GeneralLogicTreeModel_1.GeneralLogicTreeModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.GeneralLogicTreeModel
      ),
      (ModelManager_1.ModelManager.LevelPlayModel =
        new LevelPlayModel_1.LevelPlayModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.LevelPlayModel
      ),
      (ModelManager_1.ModelManager.PayItemModel =
        new PayItemModel_1.PayItemModel()),
      ModelManager_1.ModelManager.Add(ModelManager_1.ModelManager.PayItemModel),
      (ModelManager_1.ModelManager.PayShopModel =
        new PayShopModel_1.PayShopModel()),
      ModelManager_1.ModelManager.Add(ModelManager_1.ModelManager.PayShopModel),
      (ModelManager_1.ModelManager.PhantomBattleModel =
        new PhantomBattleModel_1.PhantomBattleModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.PhantomBattleModel
      ),
      (ModelManager_1.ModelManager.OnlineModel =
        new OnlineModel_1.OnlineModel()),
      ModelManager_1.ModelManager.Add(ModelManager_1.ModelManager.OnlineModel),
      (ModelManager_1.ModelManager.NpcConfigModel =
        new NpcConfigModel_1.NpcConfigModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.NpcConfigModel
      ),
      (ModelManager_1.ModelManager.GachaModel = new GachaModel_1.GachaModel()),
      ModelManager_1.ModelManager.Add(ModelManager_1.ModelManager.GachaModel),
      (ModelManager_1.ModelManager.ItemExchangeModel =
        new ItemExchangeModel_1.ItemExchangeModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.ItemExchangeModel
      ),
      (ModelManager_1.ModelManager.SkillButtonUiModel =
        new SkillButtonUiModel_1.SkillButtonUiModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.SkillButtonUiModel
      ),
      (ModelManager_1.ModelManager.AdventureGuideModel =
        new AdventureGuideModel_1.AdventureGuideModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.AdventureGuideModel
      ),
      (ModelManager_1.ModelManager.TutorialModel =
        new TutorialModel_1.TutorialModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.TutorialModel
      ),
      (ModelManager_1.ModelManager.WeatherModel =
        new WeatherModel_1.WeatherModel()),
      ModelManager_1.ModelManager.Add(ModelManager_1.ModelManager.WeatherModel),
      (ModelManager_1.ModelManager.InfoDisplayModel =
        new InfoDisplayModel_1.InfoDisplayModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.InfoDisplayModel
      ),
      (ModelManager_1.ModelManager.AudioModel = new AudioModel_1.AudioModel()),
      ModelManager_1.ModelManager.Add(ModelManager_1.ModelManager.AudioModel),
      (ModelManager_1.ModelManager.DailyTaskModel =
        new DailyTaskModel_1.DailyTaskModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.DailyTaskModel
      ),
      (ModelManager_1.ModelManager.InfluenceModel =
        new InfluenceModel_1.InfluenceModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.InfluenceModel
      ),
      (ModelManager_1.ModelManager.MonthCardModel =
        new MonthCardModel_1.MonthCardModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.MonthCardModel
      ),
      (ModelManager_1.ModelManager.RangeItemModel =
        new RangeItemModel_1.RangeItemModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.RangeItemModel
      ),
      (ModelManager_1.ModelManager.CookModel = new CookModel_1.CookModel()),
      ModelManager_1.ModelManager.Add(ModelManager_1.ModelManager.CookModel),
      (ModelManager_1.ModelManager.ManipulaterModel =
        new CharacterManipulaterModel_1.ManipulaterModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.ManipulaterModel
      ),
      (ModelManager_1.ModelManager.ManipulateInteractModel =
        new CharacterManipulateInteractModel_1.ManipulateInteractModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.ManipulateInteractModel
      ),
      (ModelManager_1.ModelManager.SceneItemBuffModel =
        new SceneItemBuffModel_1.SceneItemBuffModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.SceneItemBuffModel
      ),
      (ModelManager_1.ModelManager.InfluenceReputationModel =
        new InfluenceReputationModel_1.InfluenceReputationModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.InfluenceReputationModel
      ),
      (ModelManager_1.ModelManager.RoleFavorConditionModel =
        new RoleFavorConditionModel_1.RoleFavorConditionModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.RoleFavorConditionModel
      ),
      (ModelManager_1.ModelManager.ExploreResultModel =
        new ExploreResultModel_1.ExploreResultModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.ExploreResultModel
      ),
      (ModelManager_1.ModelManager.TowerDetailModel =
        new TowerDetailModel_1.TowerDetailModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.TowerDetailModel
      ),
      (ModelManager_1.ModelManager.BattlePassModel =
        new BattlePassModel_1.BattlePassModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.BattlePassModel
      ),
      (ModelManager_1.ModelManager.ComposeModel =
        new ComposeModel_1.ComposeModel()),
      ModelManager_1.ModelManager.Add(ModelManager_1.ModelManager.ComposeModel),
      (ModelManager_1.ModelManager.ForgingModel =
        new ForgingModel_1.ForgingModel()),
      ModelManager_1.ModelManager.Add(ModelManager_1.ModelManager.ForgingModel),
      (ModelManager_1.ModelManager.ScoreModel = new ScoreModel_1.ScoreModel()),
      ModelManager_1.ModelManager.Add(ModelManager_1.ModelManager.ScoreModel),
      (ModelManager_1.ModelManager.AdviceModel =
        new AdviceModel_1.AdviceModel()),
      ModelManager_1.ModelManager.Add(ModelManager_1.ModelManager.AdviceModel),
      (ModelManager_1.ModelManager.ScoreModel = new ScoreModel_1.ScoreModel()),
      ModelManager_1.ModelManager.Add(ModelManager_1.ModelManager.ScoreModel),
      (ModelManager_1.ModelManager.MotionModel =
        new MotionModel_1.MotionModel()),
      ModelManager_1.ModelManager.Add(ModelManager_1.ModelManager.MotionModel),
      (ModelManager_1.ModelManager.PhotographModel =
        new PhotographModel_1.PhotographModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.PhotographModel
      ),
      (ModelManager_1.ModelManager.HandBookModel =
        new HandBookModel_1.HandBookModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.HandBookModel
      ),
      (ModelManager_1.ModelManager.AntiCheatModel =
        new AntiCheatModel_1.AntiCheatModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.AntiCheatModel
      ),
      (ModelManager_1.ModelManager.TraceElementModel =
        new TraceElementModel_1.TraceElementModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.TraceElementModel
      ),
      (ModelManager_1.ModelManager.BattleUiSetModel =
        new BattleUiSetModel_1.BattleUiSetModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.BattleUiSetModel
      ),
      (ModelManager_1.ModelManager.TimeTrackControlModel =
        new TimeTrackControlModel_1.TimeTrackControlModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.TimeTrackControlModel
      ),
      (ModelManager_1.ModelManager.TurntableControlModel =
        new TurntableControlModel_1.TurntableControlModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.TurntableControlModel
      ),
      (ModelManager_1.ModelManager.SundialControlModel =
        new SundialControlModel_1.SundialControlModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.SundialControlModel
      ),
      (ModelManager_1.ModelManager.SignalDeviceModel =
        new SignalDeviceModel_1.SignalDeviceModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.SignalDeviceModel
      ),
      (ModelManager_1.ModelManager.AchievementModel =
        new AchievementModel_1.AchievementModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.AchievementModel
      ),
      (ModelManager_1.ModelManager.NewFlagModel =
        new NewFlagModel_1.NewFlagModel()),
      ModelManager_1.ModelManager.Add(ModelManager_1.ModelManager.NewFlagModel),
      (ModelManager_1.ModelManager.WaitEntityTaskModel =
        new WaitEntityTaskModel_1.WaitEntityTaskModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.WaitEntityTaskModel
      ),
      (ModelManager_1.ModelManager.GameSplineModel =
        new GameSplineModel_1.GameSplineModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.GameSplineModel
      ),
      (ModelManager_1.ModelManager.ComboTeachingModel =
        new ComboTeachingModel_1.ComboTeachingModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.ComboTeachingModel
      ),
      (ModelManager_1.ModelManager.PersonalModel =
        new PersonalModel_1.PersonalModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.PersonalModel
      ),
      (ModelManager_1.ModelManager.ActivityModel =
        new ActivityModel_1.ActivityModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.ActivityModel
      ),
      (ModelManager_1.ModelManager.ActivityRunModel =
        new ActivityRunModel_1.ActivityRunModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.ActivityRunModel
      ),
      (ModelManager_1.ModelManager.SkillCdModel =
        new SkillCdModel_1.SkillCdModel()),
      ModelManager_1.ModelManager.Add(ModelManager_1.ModelManager.SkillCdModel),
      (ModelManager_1.ModelManager.TeleportModel =
        new TeleportModel_1.TeleportModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.TeleportModel
      ),
      (ModelManager_1.ModelManager.StaticSceneModel =
        new StaticSceneModel_1.StaticSceneModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.StaticSceneModel
      ),
      (ModelManager_1.ModelManager.RoguelikeModel =
        new RoguelikeModel_1.RoguelikeModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.RoguelikeModel
      ),
      (ModelManager_1.ModelManager.ItemRewardModel =
        new ItemRewardModel_1.ItemRewardModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.ItemRewardModel
      ),
      (ModelManager_1.ModelManager.SeamlessTravelModel =
        new SeamlessTravelModel_1.SeamlessTravelModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.SeamlessTravelModel
      ),
      (ModelManager_1.ModelManager.LoginServerModel =
        new LoginServerModel_1.LoginServerModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.LoginServerModel
      ),
      (ModelManager_1.ModelManager.FilterModel =
        new FilterModel_1.FilterModel()),
      ModelManager_1.ModelManager.Add(ModelManager_1.ModelManager.FilterModel),
      (ModelManager_1.ModelManager.SortModel = new SortModel_1.SortModel()),
      ModelManager_1.ModelManager.Add(ModelManager_1.ModelManager.SortModel),
      (ModelManager_1.ModelManager.ExchangeRewardModel =
        new ExchangeRewardModel_1.ExchangeRewardModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.ExchangeRewardModel
      ),
      (ModelManager_1.ModelManager.InstanceDungeonGuideModel =
        new InstanceDungeonGuideModel_1.InstanceDungeonGuideModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.InstanceDungeonGuideModel
      ),
      (ModelManager_1.ModelManager.DailyActivityModel =
        new DailyActivityModel_1.DailyActivityModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.DailyActivityModel
      ),
      (ModelManager_1.ModelManager.LevelLoadingModel =
        new LevelLoadingModel_1.LevelLoadingModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.LevelLoadingModel
      ),
      (ModelManager_1.ModelManager.MediumItemGridModel =
        new MediumItemGridModel_1.MediumItemGridModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.MediumItemGridModel
      ),
      (ModelManager_1.ModelManager.SmallItemGridModel =
        new SmallItemGridModel_1.SmallItemGridModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.SmallItemGridModel
      ),
      (ModelManager_1.ModelManager.RouletteModel =
        new RouletteModel_1.RouletteModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.RouletteModel
      ),
      (ModelManager_1.ModelManager.MapExploreToolModel =
        new MapExploreToolModel_1.MapExploreToolModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.MapExploreToolModel
      ),
      (ModelManager_1.ModelManager.SundryModel =
        new SundryModel_1.SundryModel()),
      ModelManager_1.ModelManager.Add(ModelManager_1.ModelManager.SundryModel),
      (ModelManager_1.ModelManager.AutoRunModel =
        new AutoRunModel_1.AutoRunModel()),
      ModelManager_1.ModelManager.Add(ModelManager_1.ModelManager.AutoRunModel),
      (ModelManager_1.ModelManager.GamePingModel =
        new GamePingModel_1.GamePingModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.GamePingModel
      ),
      (ModelManager_1.ModelManager.ItemTipsModel =
        new ItemTipsModel_1.ItemTipsModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.ItemTipsModel
      ),
      (ModelManager_1.ModelManager.SkipInterfaceModel =
        new SkipInterfaceModel_1.SkipInterfaceModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.SkipInterfaceModel
      ),
      (ModelManager_1.ModelManager.PanelQteModel =
        new PanelQteModel_1.PanelQteModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.PanelQteModel
      ),
      (ModelManager_1.ModelManager.TowerModel = new TowerModel_1.TowerModel()),
      ModelManager_1.ModelManager.Add(ModelManager_1.ModelManager.TowerModel),
      (ModelManager_1.ModelManager.LordGymModel =
        new LordGymModel_1.LordGymModel()),
      ModelManager_1.ModelManager.Add(ModelManager_1.ModelManager.LordGymModel),
      (ModelManager_1.ModelManager.ExploreProgressModel =
        new ExploreProgressModel_1.ExploreProgressModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.ExploreProgressModel
      ),
      (ModelManager_1.ModelManager.ExploreLevelModel =
        new ExploreLevelModel_1.ExploreLevelModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.ExploreLevelModel
      ),
      (ModelManager_1.ModelManager.SignalDecodeModel =
        new SignalDecodeModel_1.SignalDecodeModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.SignalDecodeModel
      ),
      (ModelManager_1.ModelManager.HideTargetModel =
        new HideTargetModel_1.HideTargetModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.HideTargetModel
      ),
      (ModelManager_1.ModelManager.TrainingDegreeModel =
        new TrainingDegreeModel_1.TrainingDegreeModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.TrainingDegreeModel
      ),
      (ModelManager_1.ModelManager.ItemDeliverModel =
        new ItemDeliverModel_1.ItemDeliverModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.ItemDeliverModel
      ),
      (ModelManager_1.ModelManager.KuroSdkModel =
        new KuroSdkModel_1.KuroSdkModel()),
      ModelManager_1.ModelManager.Add(ModelManager_1.ModelManager.KuroSdkModel),
      (ModelManager_1.ModelManager.VisionCaptureModel =
        new VisionCaptureModel_1.VisionCaptureModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.VisionCaptureModel
      ),
      (ModelManager_1.ModelManager.RoleSelectModel =
        new RoleSelectModel_1.RoleSelectModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.RoleSelectModel
      ),
      (ModelManager_1.ModelManager.AiStateMachineModel =
        new AiStateMachineModel_1.AiStateMachineModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.AiStateMachineModel
      ),
      (ModelManager_1.ModelManager.RechargeModel =
        new RechargeModel_1.RechargeModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.RechargeModel
      ),
      (ModelManager_1.ModelManager.PayGiftModel =
        new PayGiftModel_1.PayGiftModel()),
      ModelManager_1.ModelManager.Add(ModelManager_1.ModelManager.PayGiftModel),
      (ModelManager_1.ModelManager.AlertMarkModel =
        new AlertMarksModel_1.AlertMarkModel()),
      ModelManager_1.ModelManager.Add(
        ModelManager_1.ModelManager.AlertMarkModel
      ),
      ModelManager_1.ModelManager.Init(),
      !0
    );
  }
  static Clear() {
    return (
      ModelManager_1.ModelManager.Clear(),
      (ModelManager_1.ModelManager.CharacterModel = void 0),
      (ModelManager_1.ModelManager.CreatureModel = void 0),
      (ModelManager_1.ModelManager.WorldModel = void 0),
      (ModelManager_1.ModelManager.SubLevelLoadingModel = void 0),
      (ModelManager_1.ModelManager.WorldDebugModel = void 0),
      (ModelManager_1.ModelManager.AoiModel = void 0),
      (ModelManager_1.ModelManager.PreloadModel = void 0),
      (ModelManager_1.ModelManager.BlackboardModel = void 0),
      (ModelManager_1.ModelManager.GameModeModel = void 0),
      (ModelManager_1.ModelManager.AreaModel = void 0),
      (ModelManager_1.ModelManager.MailModel = void 0),
      (ModelManager_1.ModelManager.LoginModel = void 0),
      (ModelManager_1.ModelManager.ItemModel = void 0),
      (ModelManager_1.ModelManager.GuideModel = void 0),
      (ModelManager_1.ModelManager.PlayerInfoModel = void 0),
      (ModelManager_1.ModelManager.AutoRunModel = void 0),
      (ModelManager_1.ModelManager.CipherModel = void 0),
      (ModelManager_1.ModelManager.EditBattleTeamModel = void 0),
      (ModelManager_1.ModelManager.MapModel = void 0),
      (ModelManager_1.ModelManager.SkillCdModel = void 0),
      (ModelManager_1.ModelManager.BattleUiModel = void 0),
      (ModelManager_1.ModelManager.InventoryModel = void 0),
      (ModelManager_1.ModelManager.ReConnectModel = void 0),
      (ModelManager_1.ModelManager.FormationModel = void 0),
      (ModelManager_1.ModelManager.ChannelModel = void 0),
      (ModelManager_1.ModelManager.MingSuModel = void 0),
      (ModelManager_1.ModelManager.ShopModel = void 0),
      (ModelManager_1.ModelManager.WeaponModel = void 0),
      (ModelManager_1.ModelManager.InstanceDungeonModel = void 0),
      (ModelManager_1.ModelManager.InstanceDungeonEntranceModel = void 0),
      (ModelManager_1.ModelManager.RoleModel = void 0),
      (ModelManager_1.ModelManager.WorldMapModel = void 0),
      (ModelManager_1.ModelManager.ItemHintModel = void 0),
      (ModelManager_1.ModelManager.SequenceModel = void 0),
      (ModelManager_1.ModelManager.LoadingModel = void 0),
      (ModelManager_1.ModelManager.AttributeModel = void 0),
      (ModelManager_1.ModelManager.RewardModel = void 0),
      (ModelManager_1.ModelManager.FunctionModel = void 0),
      (ModelManager_1.ModelManager.LevelFuncFlagModel = void 0),
      (ModelManager_1.ModelManager.LevelGeneralModel = void 0),
      (ModelManager_1.ModelManager.PlatformModel = void 0),
      (ModelManager_1.ModelManager.CameraModel = void 0),
      (ModelManager_1.ModelManager.BulletModel = void 0),
      (ModelManager_1.ModelManager.BuffModel = void 0),
      (ModelManager_1.ModelManager.PowerModel = void 0),
      (ModelManager_1.ModelManager.LevelUpModel = void 0),
      (ModelManager_1.ModelManager.InputDistributeModel = void 0),
      (ModelManager_1.ModelManager.TimeOfDayModel = void 0),
      (ModelManager_1.ModelManager.DeadReviveModel = void 0),
      (ModelManager_1.ModelManager.PlotModel = void 0),
      (ModelManager_1.ModelManager.AiModel = void 0),
      (ModelManager_1.ModelManager.AiWeaponModel = void 0),
      (ModelManager_1.ModelManager.CalabashModel = void 0),
      (ModelManager_1.ModelManager.JoinTeamModel = void 0),
      (ModelManager_1.ModelManager.ControlScreenModel = void 0),
      (ModelManager_1.ModelManager.WuYinAreaModel = void 0),
      (ModelManager_1.ModelManager.BuffItemModel = void 0),
      (ModelManager_1.ModelManager.MarqueeModel = void 0),
      (ModelManager_1.ModelManager.ShootTargetModel = void 0),
      (ModelManager_1.ModelManager.RedDotModel = void 0),
      (ModelManager_1.ModelManager.TriggerVolumeModel = void 0),
      (ModelManager_1.ModelManager.SceneInteractionModel = void 0),
      (ModelManager_1.ModelManager.MenuModel = void 0),
      (ModelManager_1.ModelManager.GenericPromptModel = void 0),
      (ModelManager_1.ModelManager.InteractionModel = void 0),
      (ModelManager_1.ModelManager.LevelGamePlayModel = void 0),
      (ModelManager_1.ModelManager.CombatMessageModel = void 0),
      (ModelManager_1.ModelManager.RenderModuleModel = void 0),
      (ModelManager_1.ModelManager.FriendModel = void 0),
      (ModelManager_1.ModelManager.UiNavigationModel = void 0),
      (ModelManager_1.ModelManager.ParkourModel = void 0),
      (ModelManager_1.ModelManager.ChatModel = void 0),
      (ModelManager_1.ModelManager.PayItemModel = void 0),
      (ModelManager_1.ModelManager.NpcConfigModel = void 0),
      (ModelManager_1.ModelManager.PayShopModel = void 0),
      (ModelManager_1.ModelManager.GachaModel = void 0),
      (ModelManager_1.ModelManager.ItemExchangeModel = void 0),
      (ModelManager_1.ModelManager.PhantomBattleModel = void 0),
      (ModelManager_1.ModelManager.AdventureGuideModel = void 0),
      (ModelManager_1.ModelManager.SkillButtonUiModel = void 0),
      (ModelManager_1.ModelManager.TutorialModel = void 0),
      (ModelManager_1.ModelManager.WeatherModel = void 0),
      (ModelManager_1.ModelManager.InfoDisplayModel = void 0),
      (ModelManager_1.ModelManager.AudioModel = void 0),
      (ModelManager_1.ModelManager.DailyTaskModel = void 0),
      (ModelManager_1.ModelManager.InfluenceModel = void 0),
      (ModelManager_1.ModelManager.MonthCardModel = void 0),
      (ModelManager_1.ModelManager.RangeItemModel = void 0),
      (ModelManager_1.ModelManager.ManipulaterModel = void 0),
      (ModelManager_1.ModelManager.ManipulateInteractModel = void 0),
      (ModelManager_1.ModelManager.SceneItemBuffModel = void 0),
      (ModelManager_1.ModelManager.InfluenceReputationModel = void 0),
      (ModelManager_1.ModelManager.RoleFavorConditionModel = void 0),
      (ModelManager_1.ModelManager.ExploreResultModel = void 0),
      (ModelManager_1.ModelManager.TowerDetailModel = void 0),
      (ModelManager_1.ModelManager.BattlePassModel = void 0),
      (ModelManager_1.ModelManager.ComposeModel = void 0),
      (ModelManager_1.ModelManager.ForgingModel = void 0),
      (ModelManager_1.ModelManager.ScoreModel = void 0),
      (ModelManager_1.ModelManager.AdviceModel = void 0),
      (ModelManager_1.ModelManager.ScoreModel = void 0),
      (ModelManager_1.ModelManager.MotionModel = void 0),
      (ModelManager_1.ModelManager.HandBookModel = void 0),
      (ModelManager_1.ModelManager.AntiCheatModel = void 0),
      (ModelManager_1.ModelManager.TraceElementModel = void 0),
      (ModelManager_1.ModelManager.TimeTrackControlModel = void 0),
      (ModelManager_1.ModelManager.TurntableControlModel = void 0),
      (ModelManager_1.ModelManager.AchievementModel = void 0),
      (ModelManager_1.ModelManager.NewFlagModel = void 0),
      (ModelManager_1.ModelManager.WaitEntityTaskModel = void 0),
      (ModelManager_1.ModelManager.QuestNewModel = void 0),
      (ModelManager_1.ModelManager.ComboTeachingModel = void 0),
      (ModelManager_1.ModelManager.PersonalModel = void 0),
      (ModelManager_1.ModelManager.ActivityModel = void 0),
      (ModelManager_1.ModelManager.ActivityRunModel = void 0),
      (ModelManager_1.ModelManager.TeleportModel = void 0),
      (ModelManager_1.ModelManager.StaticSceneModel = void 0),
      (ModelManager_1.ModelManager.ItemRewardModel = void 0),
      (ModelManager_1.ModelManager.SeamlessTravelModel = void 0),
      (ModelManager_1.ModelManager.LoginServerModel = void 0),
      (ModelManager_1.ModelManager.FilterModel = void 0),
      (ModelManager_1.ModelManager.SortModel = void 0),
      (ModelManager_1.ModelManager.ExchangeRewardModel = void 0),
      (ModelManager_1.ModelManager.InstanceDungeonGuideModel = void 0),
      (ModelManager_1.ModelManager.DailyActivityModel = void 0),
      (ModelManager_1.ModelManager.MediumItemGridModel = void 0),
      (ModelManager_1.ModelManager.RouletteModel = void 0),
      (ModelManager_1.ModelManager.MapExploreToolModel = void 0),
      (ModelManager_1.ModelManager.SundryModel = void 0),
      (ModelManager_1.ModelManager.AutoRunModel = void 0),
      (ModelManager_1.ModelManager.GamePingModel = void 0),
      (ModelManager_1.ModelManager.ItemTipsModel = void 0),
      (ModelManager_1.ModelManager.SkipInterfaceModel = void 0),
      (ModelManager_1.ModelManager.PanelQteModel = void 0),
      (ModelManager_1.ModelManager.TowerModel = void 0),
      (ModelManager_1.ModelManager.LordGymModel = void 0),
      (ModelManager_1.ModelManager.ExploreProgressModel = void 0),
      (ModelManager_1.ModelManager.ExploreLevelModel = void 0),
      (ModelManager_1.ModelManager.SignalDecodeModel = void 0),
      (ModelManager_1.ModelManager.ItemDeliverModel = void 0),
      (ModelManager_1.ModelManager.KuroSdkModel = void 0),
      (ModelManager_1.ModelManager.VisionCaptureModel = void 0),
      (ModelManager_1.ModelManager.RoleSelectModel = void 0),
      (ModelManager_1.ModelManager.RechargeModel = void 0),
      !(ModelManager_1.ModelManager.AlertMarkModel = void 0)
    );
  }
}
exports.ModelManagerCreator = ModelManagerCreator;
//# sourceMappingURL=ModelManagerCreator.js.map

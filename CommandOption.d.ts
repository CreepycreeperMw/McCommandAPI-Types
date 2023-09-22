import { CommandSender } from "./CommandSender"

/**
 * Command Options are used in the syntax of slash commands
 */
export class CommandOption {
    protected constructor(name: string)
    public name: string
    /**
     * Registers the command option to the command handler
     */
    register(): void
}

export class StaticCommandOption extends CommandOption {
    /**
     * Creates a static command option. CommandOptions are 
     * used to construct the syntax of a slash command.
     * @param name The name/identifier of this CommandOption under
     *  which it may be refered to.
     * @param values A list of possible values for autocompletion.
     */
    constructor(name: string, values: string[])
    public values: string[]
}

export class DynamicCommandOption extends CommandOption {
    /**
     * Creates a dynamic command option. CommandOptions are 
     * used to construct the syntax of a slash command.
     * A dynamic command option doesnt have a hardcoded list
     * of values but rather "generates" the list respectively.
     * @param name The name/identifier of this CommandOption under
     *  which it may be refered to.
     * @param callback 
     */
    constructor(name: string, callback: (sender: CommandSender) => string[])
    public callback: (sender: CommandSender) => string[]
}

/**
 * A list of vanilla Command Options
 */
export enum MinecraftCommandOptions {
    ACTORLOCATION = "ActorLocation",
    ADD = "add",
    ADDTICKINGAREATYPE = "AddTickingAreaType",
    ALLDIMENSIONS = "AllDimensions",
    ALLOWLISTACTION = "AllowListAction",
    BIOME = "Biome",
    BLOCK = "Block",
    BLOCKEQUIPMENTSLOT = "BlockEquipmentSlot",
    BLOCKSSCANMODE = "BlocksScanMode",
    BLOCK_STATE_ARRAY = "BLOCK_STATE_ARRAY",
    BOOLEAN = "Boolean",
    BOOLGAMERULE = "BoolGameRule",
    BOOLSETTINGNAME = "BoolSettingName",
    CAMERAPRESETS = "CameraPresets",
    CAMERASHAKEACTIONADD = "CameraShakeActionAdd",
    CAMERASHAKEACTIONSTOP = "CameraShakeActionStop",
    CAMERASHAKETYPE = "CameraShakeType",
    CIRCLEAREA = "CircleArea",
    CLEAR = "clear",
    CLEAREFFECTS = "ClearEffects",
    CLONEMODE = "CloneMode",
    COLOR = "color",
    COMMANDNAME = "CommandName",
    COMPAREOPERATOR = "COMPAREOPERATOR",
    DAMAGECAUSE = "DamageCause",
    DAMAGEORIGINACTOR = "DamageOriginActor",
    DEFAULT = "default",
    DELETE = "delete",
    DIALOGUECHANGEACTION = "DialogueChangeAction",
    DIALOGUEOPENACTION = "DialogueOpenAction",
    DIFFICULTY = "Difficulty",
    DIFFICULTYSETTINGNAME = "DifficultySettingName",
    DIMENSION = "Dimension",
    EASE = "ease",
    EASING = "Easing",
    EFFECT = "Effect",
    ENCHANT = "Enchant",
    ENTITYEQUIPMENTSLOT = "EntityEquipmentSlot",
    ENTITYEVENTS = "EntityEvents",
    ENTITYTYPE = "EntityType",
    EVENTENTITYACTION = "EventEntityAction",
    EXECUTECHAINEDOPTION_0 = "EXECUTECHAINEDOPTION_0",
    EXPORTTYPES = "ExportTypes",
    FACING = "facing",
    FADE = "fade",
    FILLMODE = "FillMode",
    FILLTYPE = "FillType",
    FULLINTEGERRANGE = "FULLINTEGERRANGE",
    GAMEMODE = "GameMode",
    GAMETESTMODECLEARALL = "GameTestModeClearAll",
    GAMETESTMODECREATETEST = "GameTestModeCreateTest",
    GAMETESTMODERUN = "GameTestModeRun",
    GAMETESTMODERUNSET = "GameTestModeRunSet",
    GAMETESTMODERUNSETUNTILFAIL = "GameTestModeRunSetUntilFail",
    GAMETESTMODERUNTHIS = "GameTestModeRunThis",
    GAMETESTMODESHOWPOSITION = "GameTestModeShowPosition",
    GAMETESTNAME = "GameTestName",
    GAMETESTRUNNEARBYTESTS = "GameTestRunNearbyTests",
    GAMETESTSTOPTESTS = "GameTestStopTests",
    GAMETESTTAG = "GameTestTag",
    ID = "ID",
    INT = "INT",
    INTGAMERULE = "IntGameRule",
    ITEM = "Item",
    JSON_OBJECT = "JSON_OBJECT",
    LOCATESUBCOMMANDBIOME = "LocateSubcommandBiome",
    LOCATESUBCOMMANDSTRUCTURE = "LocateSubcommandStructure",
    MASKMODE = "MaskMode",
    MASKMODEFILTERED = "MaskModeFiltered",
    MESSAGE_ROOT = "MESSAGE_ROOT",
    MIRROR = "Mirror",
    MOBEVENT = "MobEvent",
    MUSICPLAYACTION = "MusicPlayAction",
    MUSICQUEUEACTION = "MusicQueueAction",
    MUSICREPEATMODE = "MusicRepeatMode",
    MUSICSTOPACTION = "MusicStopAction",
    MUSICVOLUMEACTION = "MusicVolumeAction",
    OPERATOR = "OPERATOR",
    OPTION_ALIGN = "Option_Align",
    OPTION_ANCHORED = "Option_Anchored",
    OPTION_AS = "Option_As",
    OPTION_AT = "Option_At",
    OPTION_CONDITION_BLOCK = "Option_Condition_Block",
    OPTION_CONDITION_BLOCKS = "Option_Condition_Blocks",
    OPTION_CONDITION_ENTITY = "Option_Condition_Entity",
    OPTION_CONDITION_SCORE = "Option_Condition_Score",
    OPTION_ENTITY = "Option_Entity",
    OPTION_FACING = "Option_Facing",
    OPTION_IF_UNLESS = "Option_If_Unless",
    OPTION_IN = "Option_In",
    OPTION_POSITIONED = "Option_Positioned",
    OPTION_QUERY = "Option_Query",
    OPTION_ROTATED = "Option_Rotated",
    OPTION_RUN = "Option_Run",
    OPTION_SET = "Option_Set",
    PATHCOMMAND = "PATHCOMMAND",
    PERMISSION = "permission",
    PERMISSIONSACTION = "PermissionsAction",
    POS = "pos",
    POSITION = "POSITION",
    POSITION_FLOAT = "POSITION_FLOAT",
    RAWTEXT = "RAWTEXT",
    REPLACE = "Replace",
    REPLACEITEMBLOCK = "ReplaceItemBlock",
    REPLACEITEMENTITY = "ReplaceItemEntity",
    REPLACEMODE = "ReplaceMode",
    REQUESTACTION = "RequestAction",
    RIDEMODEEVICT = "RideModeEvict",
    RIDEMODESTART = "RideModeStart",
    RIDEMODESTOP = "RideModeStop",
    RIDEMODESUMMONRIDE = "RideModeSummonRide",
    RIDEMODESUMMONRIDER = "RideModeSummonRider",
    RIDERULES = "RideRules",
    ROT = "rot",
    ROTATION = "Rotation",
    RVAL = "RVAL",
    SAVEMODE = "SaveMode",
    SCHEDULEACTIONONAREALOADED = "ScheduleActionOnAreaLoaded",
    SCOREBOARDADDACTION = "ScoreboardAddAction",
    SCOREBOARDCRITERIA = "ScoreboardCriteria",
    SCOREBOARDDISPLAYSLOTNONSORTABLE = "ScoreboardDisplaySlotNonSortable",
    SCOREBOARDDISPLAYSLOTSORTABLE = "ScoreboardDisplaySlotSortable",
    SCOREBOARDLISTACTION = "ScoreboardListAction",
    SCOREBOARDOBJECTIVES = "ScoreboardObjectives",
    SCOREBOARDOBJECTIVESCATEGORY = "ScoreboardObjectivesCategory",
    SCOREBOARDOPERATIONACTION = "ScoreboardOperationAction",
    SCOREBOARDPLAYERSCATEGORY = "ScoreboardPlayersCategory",
    SCOREBOARDPLAYERSNUMACTION = "ScoreboardPlayersNumAction",
    SCOREBOARDRANDOMACTION = "ScoreboardRandomAction",
    SCOREBOARDREMOVEACTION = "ScoreboardRemoveAction",
    SCOREBOARDRESETACTION = "ScoreboardResetAction",
    SCOREBOARDSETDISPLAYACTION = "ScoreboardSetDisplayAction",
    SCOREBOARDSORTORDER = "ScoreboardSortOrder",
    SCOREBOARDTESTACTION = "ScoreboardTestAction",
    SCORERANGEMODE = "ScoreRangeMode",
    SCRIPTDEBUGMODEPROFILER = "ScriptDebugModeProfiler",
    SCRIPTDEBUGMODEWATCHDOG = "ScriptDebugModeWatchdog",
    SCRIPTPROFILERSTART = "ScriptProfilerStart",
    SCRIPTPROFILERSTOP = "ScriptProfilerStop",
    SCRIPTWATCHDOGDUMPMEMORY = "ScriptWatchdogDumpMemory",
    SELECTION = "SELECTION",
    SET = "set",
    SETBLOCKMODE = "SetBlockMode",
    SIMULATIONTYPEENUM = "SimulationTypeEnum",
    SLASHCOMMAND = "SLASHCOMMAND",
    SOURCEKILL = "SourceKill",
    SOURCELOOT = "SourceLoot",
    STATE = "state",
    STRUCTURE = "Structure",
    STRUCTUREANIMATIONMODE = "StructureAnimationMode",
    STRUCTUREDELETEACTION = "StructureDeleteAction",
    STRUCTURELOADACTION = "StructureLoadAction",
    STRUCTURESAVEACTION = "StructureSaveAction",
    STRUCTURESAVEMODE = "StructureSaveMode",
    SUBCOMMANDEXPORT = "SubcommandExport",
    TAGCHANGEACTION = "TagChangeAction",
    TAGLISTACTION = "TagListAction",
    TAGVALUES = "TagValues",
    TARGETBLOCK = "TargetBlock",
    TARGETENTITY = "TargetEntity",
    TARGETGIVE = "TargetGive",
    TARGETINSERT = "TargetInsert",
    TARGETREPLACE = "TargetReplace",
    TARGETSPAWN = "TargetSpawn",
    TELEPORTFACING = "TeleportFacing",
    TELEPORTRULES = "TeleportRules",
    TESTFORBLOCKSMODE = "TestForBlocksMode",
    TICKINGAREA = "TickingArea",
    TICKINGAREAMODEADD = "TickingAreaModeAdd",
    TICKINGAREAMODELIST = "TickingAreaModeList",
    TICKINGAREAMODEPRELOAD = "TickingAreaModePreload",
    TICKINGAREAMODEREMOVE = "TickingAreaModeRemove",
    TICKINGAREAMODEREMOVEALL = "TickingAreaModeRemoveAll",
    TIME = "time",
    TIMEMODEADD = "TimeModeAdd",
    TIMEMODEQUERY = "TimeModeQuery",
    TIMEMODESET = "TimeModeSet",
    TIMEQUERY = "TimeQuery",
    TIMESPEC = "TimeSpec",
    TITLECLEAR = "TitleClear",
    TITLERAWCLEAR = "TitleRawClear",
    TITLERAWRESET = "TitleRawReset",
    TITLERAWSET = "TitleRawSet",
    TITLERAWTIMES = "TitleRawTimes",
    TITLERESET = "TitleReset",
    TITLESET = "TitleSet",
    TITLETIMES = "TitleTimes",
    TOOL = "Tool",
    VAL = "VAL",
    VOLUMEAREAADD = "VolumeAreaAdd",
    VOLUMEAREAALLDIMENSIONS = "VolumeAreaAllDimensions",
    VOLUMEAREALIST = "VolumeAreaList",
    VOLUMEAREAREMOVE = "VolumeAreaRemove",
    VOLUMEAREAREMOVEALL = "VolumeAreaRemoveAll",
    WEATHERQUERY = "WeatherQuery",
    WEATHERTYPE = "WeatherType",
    WILDCARDINT = "WILDCARDINT",
    WILDCARDSELECTION = "WILDCARDSELECTION",
    postfix_l = "postfix_l"
}
import { Block, Vector3, CommandResult, RawMessage, Player, Dimension, Entity } from "@minecraft/server";

export class Command {
    /**
     * Creates a new Slash Command
     * @param name The name of the command. Is not case insensitive, cannot contain spaces.
     * @param description The description of the command. Used in help command e.g.
     * @param aliases Alternative spellings / names for the command.
     * @param requires_cheats Wether the command requires cheats to be toggled on to execute. Defaults to true
     * @throws if the command name contains spaces or name or description are undefined
     */
    constructor(name: string, description: string, aliases?: string[], requires_cheats?: boolean)
    /**
     * The name/identifier of this command
     */
    public readonly name: string
    /**
     * The command description
     */
    public readonly description: string
    /**
     * List of alternative spellings / names for this command.
     */
    public readonly aliases: string[]
    /**
     * Wether the command requires cheats to be toggled on.
     */
    public readonly requires_cheats: boolean
    
    /**
     * Sets the executor function of this command that is called when the command is run
     * @param callback The function to handle/process the command request
     * @returns This command for chaining
     */
    setExecutor(callback: (sender: CommandSender, args: string[], command: this) => CommandResponse): this

    /**
     * Sets the aliases (alternative spellings / names) for this command
     * @param aliases List of alternative spellings / names for this command
     * @returns This command for chaining
     */
    setAliases(aliases: string[]): this
    /**
     * Wether the command requires cheats to be toggled on to execute.
     * @param requires_cheats If true the command can only be used when cheats are toggled on
     * @returns This command for chaining
     */
    setRequiresCheats(requires_cheats: boolean): this

    /**
     * Adds a command overload to this command. A command can have multiple
     * overloads for syntax, because the command may have multiple syntax
     * depend on the users input. E.g. the gamerule command has 2 overloads:
     * 1 for a bool setting of which the 3rd argument should be a boolean
     * and 2 for an intgamerule such as randomtickspeed which needs an integer
     * rather then a boolean
     * @param overload 
     * @returns This command for chaining
     */
    addOverload(overload: Overload): this
    /**
     * Sets the command overloads for this command. A command can have multiple
     * overloads for syntax, because the command may have multiple syntax
     * depend on the users input. E.g. the gamerule command has 2 overloads:
     * 1 for a bool setting of which the 3rd argument should be a boolean
     * and 2 for an intgamerule such as randomtickspeed which needs an integer
     * rather then a boolean
     * @param overloads 
     * @returns This command for chaining
     */
    setOverloads(...overloads: OverloadParam[]): this

    /**
     * This adds a command parameter to this command. If no overload is present,
     * creates a new overload and then adds the parameter to this overload.
     * For multiple command overloads please use {@link Command.addOverload}
     * @param param The parameter to add to the overload
     * @throws if multiple command overloads are present
     */
    addParam(param: OverloadParam): this
    /**
     * Sets the parameter list for this command.
     * For multiple command overloads please use {@link Command.setOverloads}
     * @param params the command parameter(s) for this command
     * @returns This command for chaining
     */
    setParams(...params: OverloadParam[]): this

    /**
     * Sets the permission level for this command, which restricts
     * usage if you dont have the permission level required or higher.
     * @param level the level of permission required for this command
     */
    setPermissionLevel(level: number): this
    /**
     * @returns The level required to execute this command
     */
    getPermissionLevel(): number

    /**
     * Returns the usage string (e.g., <from: xyz> <to: xyz>)
     * constructed of the command's parameters and their name/type
     */
    getUsageMessage(): string

    /**
     * Registers this command to the command handler. For an alternative
     * implementation see {@link System.registerCommand}
     */
    register(): void
}

export class Overload {
    /**
     * Creates a new command overload. An overload is a version of a command
     * syntax and contains a list of parameters.
     * @param params The Parameters for this overload.
     */
    constructor(params?: OverloadParam[])

    /**
     * The list of command parameters of this overload
     */
    public params: OverloadParam[]

    /**
     * Adds an parameter to this command overload
     * @param param command parameter to add to this overload
     */
    addParam(param: OverloadParam): this
    /**
     * Sets the parameter list for this overload. 
     * @param params the command parameter(s) for this overload
     * @returns the command overload for chaining
     */
    setParams(...params: OverloadParam[]): this
}

export interface OverloadParam {
    name: string
    type: string | MinecraftCommandOptions
    optional: boolean
}

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

/**
 * Interface of a Command Response.
 * Chose interface so that the user can add additional properties and
 * is not limtied to a given set of properties.
 */
export interface CommandResponse {
    /**
     * The status code of the command process. Describes the success/error
     * of the execution.
     * success: 0,
     * failure: 1,
     * noTargetMatched: -2147483648.
     * See {@link CommandStatus}!
     * Any other code than 0 makes the {@link CommandResponse.statusMessage statusMessage}'s default color red.
     */
    statusCode: CommandStatus
    /**
     * The message to be displayed in chat as the command result.
     * When no messsage is specified there will be no message in chat.
     * When the statusCode is not 0 this message is required and will be red.
     * @throws if the message is `undefined` even tho statusCode is not 0.
     */
    statusMessage?: string
}

export enum CommandStatus {
    /**
     * Indicating that the command executed successfully
     */
    SUCCESS = 0,
    /**
     * Indicating a general failure with the command
     */
    FAILURE = 1,
    /**
     * Indicating a syntax error
     */
    SYNTAX_ERROR = -2147483648,
    /**
     * Indicating an error with incorrect input from user but correct 
     * syntax, such as a target selector that does not match anything
     * or executing a command its not permitted to.
     */
    INCORRECT_ARGS = -2147352576
}

/**
 * Base class for a CommandSender Object. This object describes the person
 * that issued the command, which can either be a {@link Player}, a {@link ConsoleSender},
 * a {@link BlockSender}, a {@link ScriptSender} or a {@link ProxiedCommandSender}
 */
export class CommandSender {
    protected constructor()

    /**
     * The name of the command originator
     */
    readonly name: string
    /**
     * The location of this command interaction
     */
    readonly location: Vector3
    /**
     * The dimension of this command interaction
     */
    readonly dimension: Dimension

    /**
     * Sends a message to the command sender
     * @param message The message to send
     */
    sendMessage(message: (RawMessage | string)[] | RawMessage | string): void
    /**
     * Wether the sender has operator permissions
     */
    isOp(): boolean
    /**
     * The permission level of the command sender
     */
    getPermissionLevel(): number
    /**
     * Wether the sender is able to execute the command
     * @param command The command of which to compare the permission level to
     */
    hasSufficientPermission(command: Command): boolean
    /**
     * Runs a command synchronously from the context of
     * this command sender
     * @param command Command to run. Note that command strings
     * should not start with slash.
     * @returns
     * Returns a command result with a count of successful values
     * from the command.
     * @throws
     * Throws an exception if the command fails due to incorrect
     * parameters or command syntax, or in erroneous cases for the
     * command. Note that in many cases, if the command does not
     * operate (e.g., a target selector found no matches), this
     * method will not throw an exception.
     */
    runCommand(command: string): CommandResult
    /**
     * @remarks
     * Runs a particular command asynchronously from the context of
     * this command sender. Note that there is a maximum queue of 128
     * asynchronous commands that can be run in a given tick.
     *
     * @param commandString
     * Command to run. Note that command strings should not start
     * with slash.
     * @returns
     * For commands that return data, returns a JSON structure with
     * command response values.
     * @throws Throws an exception if the command fails due to incorrect
     * parameters or command syntax, or in erroneous cases for the
     * command. Note that in many cases, if the command does not
     * operate (e.g., a target selector found no matches), this
     * method will not throw an exception.
     */
    runCommandAsync(command: string): Promise<CommandResult>
}

/**
 * This CommandSender represents the server console
 */
export class ConsoleSender extends CommandSender {
    /**
     * The name should always be "Server" or the respective
     * translation of the host language.
     */
    readonly name: "Server"
    /**
     * The console is always operator
     */
    public isOp(): true
}

/**
 * This CommandSender represents a block
 */
export class BlockSender extends CommandSender {
    constructor(block: Block)
    public block: Block
    /**
     * Command blocks and custom blocks never have operator permissions.
     */
    public isOp(): false;
}

/**
 * This CommandSender represents the Script Engine
 */
export class ScriptSender extends CommandSender {
    /**
     * The name of the `ScriptSender` should always be "Script Engine"
     * or the respective translation of the host language.
     */
    readonly name: "Script Engine"
    /**
     * The Script engine is never operator
     */
    isOp(): false;
}

/**
 * A Proxied Command Sender is iniated e.g. when a command sender
 * uses `/execute as` to execute the command as another person.
 * The methods like {@link CommandSender.sendMessage sendMessage} still refer
 * to the original caller but e.g. {@link CommandSender.location location}
 * points to the callee, the person which the original caller is
 * executing as. A ProxiedCommandSender is also issued when
 * a player triggers a command via a npc dialoge.
 */
export class ProxiedCommandSender extends CommandSender {
    constructor(caller: CommandSender, callee: CommandSender | Entity)
    public getCaller(): CommandSender
    public getCallee(): CommandSender
}
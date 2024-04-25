import { MinecraftCommandOptions } from "./CommandOption"
import { CommandResponse } from "./CommandResponse"
import { CommandSender } from "./CommandSender"
import { System } from "../System"

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
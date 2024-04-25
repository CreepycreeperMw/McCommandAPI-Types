import { MinecraftCommandOptions } from "./CommandOption"
import { CommandResponse } from "./CommandResponse"
import { CommandSender } from "./CommandSender"

export class Command {
    constructor(name: string, description: string, aliases?: string[], requires_cheats?: boolean)
    public readonly name: string
    public readonly description: string
    public readonly aliases: string[]
    public readonly requires_cheats: boolean
    
    setExecutor(callback: (sender: CommandSender, args: string[], command: this) => CommandResponse): this

    setAliases(aliases: string[]): this
    setRequiresCheats(requires_cheats: boolean): this

    addOverload(overload: Overload): this
    setOverloads(...overloads: OverloadParam[]): this

    addParam(param: OverloadParam): this
    setParams(...params: OverloadParam[]): this

    setPermissionLevel(level: number): this
    getPermissionLevel(): number

    getUsageMessage(): string

    register(): void
}

export class Overload {
    constructor(params?: OverloadParam[])

    public params: OverloadParam[]

    addParam(param: OverloadParam): this
    setParams(...params: OverloadParam[]): this
}

export interface OverloadParam {
    name: string
    type: string | MinecraftCommandOptions
    optional: boolean
}
import { Block, Vector3, CommandResult, RawMessage, Player, Dimension, Entity } from "@minecraft/server";
import { Command } from "./Command";

export class CommandSender {
    protected constructor()

    readonly name: string
    readonly location: Vector3
    readonly dimension: Dimension

    sendMessage(message: (RawMessage | string)[] | RawMessage | string): void
    isOp(): boolean
    getPermissionLevel(): number
    hasSufficientPermission(command: Command): boolean
    runCommand(command: string): CommandResult
    runCommandAsync(command: string): Promise<CommandResult>
}

export class ConsoleSender extends CommandSender {
    readonly name: "Server"
    public isOp(): true
}

export class BlockSender extends CommandSender {
    constructor(block: Block)
    public block: Block
    public isOp(): false;
}

export class ScriptSender extends CommandSender {
    readonly name: "Script Engine"
    isOp(): false;
}

export class ProxiedCommandSender extends CommandSender {
    constructor(caller: CommandSender, callee: CommandSender | Entity)
    public getCaller(): CommandSender
    public getCallee(): CommandSender
}

// TODO : Add methods descriptions for the ProxiedCommandSender
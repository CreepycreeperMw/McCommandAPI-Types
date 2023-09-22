import { Block, Vector3, CommandResult, RawMessage, Player, Dimension, Entity } from "@minecraft/server";
import { Command } from "./Command";

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

// TODO : Add methods descriptions for the ProxiedCommandSender
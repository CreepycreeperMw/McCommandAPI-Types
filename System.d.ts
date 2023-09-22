import { System as LegacySystem } from "@minecraft/server";
import { Command } from "./Command";
import { CommandOption } from "./CommandOption";

export class System extends LegacySystem {
    /**
     * Registers a command to the command handler. For an alternative
     * implementation see {@link Command.register}
     * @param command The command to be registered
     */
    registerCommand(...command: Command[]): void
    /**
     * Registers a command option. For an alternative
     * implementation see {@link CommandOption.register}
     * @param commandOptions The command options to register
     */
    registerCommandOption(...commandOptions: CommandOption[]): void
    /**
     * Returns a list of registered commands. See {@link Command}
     */
    getCommandList(): Command[]
}
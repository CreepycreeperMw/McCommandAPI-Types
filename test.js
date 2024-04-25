import { CommandError, Player, world } from "@minecraft/server";
import { CommandStatus } from "./CommandResponse";
const { Command, Overload } = require("./Command");
const { ConsoleSender, ProxiedCommandSender } = require("./CommandSender");

// This is a poor example because I wasnt sure what to do lol
new Command("helloworld", "Prints a hello world message", [
  "hello",
  "hello-world",
])
  .setExecutor((sender, args) => {
    let optionalText = "";

    if (sender instanceof ConsoleSender) {
      optionalText = " from the Console";
    } else if (sender instanceof ProxiedCommandSender) {
      optionalText =
        " send by " +
        sender.getCaller().getName() +
        " as " +
        sender.getCallee().getName();
    } else if (sender.isOp()) {
      optionalText = " from the admins";
    }

    if (args[0]) {
      world
        .getDimension("overworld")
        .runCommandAsync(
          `tellraw ${args[0]} {"rawtext":[{"text":"Hello world${optionalText}!"}]}`
        )
        .catch((err) => {
          return {
            statusCode: CommandStatus.INCORRECT_INPUT,
            statusMessage: "commands.generic.noTargetMatch",
          }; // Applies red color for error messages and sets the status message to be the Selector doesnt match any target message
        });
    } else {
      sender.sendMessage("Hello world" + optionalText + "!");
    }

    // This should be the default command response.
    // Dont try to be smart with making the default an error to handle it when errors occur in the code and the code doesnt execute to the end.
    return { statusCode: CommandStatus.SUCCESS };
  })
  .addParam({ name: "target", optional: false, type: "SELECTION" })
  .setPermissionLevel(2)
  .setRequiresCheats(false)
  .register();

new Command("party", "Manages a party", ["p"], true)
    .addOverload(
        new Overload(
            { name: "create", type: "PARTYCREATE", optional: true },
            { name: "name", type: "MESSAGE_ROOT" }
        )
    )
    .addOverload(
        new Overload({ name: "list", type: "PARTYLIST", optional: true })
    )
    .addOverload(
        new Overload(
            { name: "invite", type: "PARTYINVITE", optional: true },
            { name: "playername", type: "SELECTION", optional: true }
        )
    )
    .addOverload(
        new Overload({ name: "help", type: "PARTYHELP", optional: true })
    )
    .addOverload(
        new Overload(
            { name: "chat", type: "PARTYCHAT", optional: true },
            { name: "message", type: "MESSAGE_ROOT" }
        )
    )
    .addOverload(
        new Overload(
            { name: "kick", type: "PARTYKICK", optional: true },
            { name: "target", type: "SELECTION" }
        )
    ).setExecutor((sender, args, cmd) => {
        if (!(sender instanceof Player)) return {
            statusCode: CommandStatus.INCORRECT_INPUT,
            statusMessage: "This command can only be run by players."
        }
        if (args.length == 0) return openPartyMenu();

        switch (args[0]) {
            case "create":
                new Party(args[1] ?? sender.name + "'s Party").setMembers([sender])
                return { statusMessage: "§aSuccessfully created a party of name" }

            case "list": {
                let party = Party.partyList.find(p => p.players.includes(sender.name))
                if (!party) return {
                    statusCode: CommandStatus.FAILURE,
                    statusMessage: "You are not in a party",
                }

                if (party.players.length == 0) return { statusMessage: "There are no players in your party" }

                return { statusMessage: "§aListing all players in the party:§7\n - " + party.players.join("\n - ") }
            }

            case "invite": {
                let party = Party.partyList.find(p => p.players.includes(sender.name))
                if (!party) return {
                    statusCode: CommandStatus.FAILURE,
                    statusMessage: "You are not in a party",
                }

                let player = getPlayer(args[1])
                if (!player) return { statusCode: CommandStatus.INCORRECT_INPUT, statusMessage: "commands.generic.noTargetMatch" }

                let successFul = party.sendInvite(player, sender)
                if (successFul) {
                    party.players.forEach(p => {
                        p.sendMessage(`§a${sender.name} invited ${player.name} to the party`)
                    });
                    return { statusMessage: `§aInvited ${player.name} to your party` }
                }
                return {
                    statusCode: CommandStatus.FAILURE,
                    statusMessage: "You cannot invite this player."
                }
            }

            case "help":
                return {
                    statusMessage: `--- Party Help ---
Using this command you can create and manage a party, used to automatically move players with you.
You can use one of the following actions to manage the party:
 ${cmd.overloads.map(overload => overload.params[0].name).join("\n ")}`
                }

            case "chat": {
                let party = Party.partyList.find(p => p.players.includes(sender.name))
                if (!party) return {
                    statusCode: CommandStatus.FAILURE,
                    statusMessage: "You are not in a party",
                }

                party.players.forEach(p => {
                    p.sendMessage(`§d[Party] §r${sender.name} §8>> §r${args[1]}`)
                });
                // Notice we dont return anything this time, because there is nothing to return
                // We just let the code exit like normal, since the default return value
                // should be statusCode: 0 without a message.
                break;
            }

            case "remove":
            case "kick": {
                let party = Party.partyList.find(p => p.players.includes(sender.name))
                if (!party) return {
                    statusCode: CommandStatus.FAILURE,
                    statusMessage: "You are not in a party",
                }

                let player = getPlayer(args[1])
                if (!player) return { statusCode: CommandStatus.INCORRECT_INPUT, statusMessage: "commands.generic.noTargetMatch" }

                Party.remove(player);
                return { statusMessage: "§aRemoved the player " + player.name + " from the party." }
            }


            default:
                // This should never happen because of Minecraft's syntax parser,
                // however, its here just for demonstration purposes
                return {
                    statusCode: CommandStatus.SYNTAX_ERROR,
                    statusMessage: `Invalid Argument ${args[0]}. Syntax: ${cmd.getUsageMessage()}`
                };
        }
    }).register()

class Party {
    static partyList = []
}
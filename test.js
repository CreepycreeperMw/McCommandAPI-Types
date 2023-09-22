import { world } from "@minecraft/server"
import { CommandStatus } from "./CommandResponse";
const { Command } = require("./Command");
const { ConsoleSender, ProxiedCommandSender } = require("./CommandSender");

// This is a poor example because I wasnt sure what to do lol
new Command("helloworld","Prints a hello world message",["hello","hello-world"])
    .setExecutor((sender,args)=>{
        let optionalText = "";

        if(sender instanceof ConsoleSender) {
            optionalText = " from the Console"
        } else if(sender instanceof ProxiedCommandSender) {
            optionalText = " send by "+sender.getCaller().getName()+" as "+sender.getCallee().getName()
        } else if(sender.isOp()) {
            optionalText = " from the admins"
        }

        if(args[0]) {
            world.getDimension("overworld").runCommandAsync(`tellraw ${args[0]} {"rawtext":[{"text":"Hello world${optionalText}!"}]}`).catch(err=>{
                return {statusCode: CommandStatus.INCORRECT_ARGS, statusMessage: "commands.generic.noTargetMatch"} // Applies red color for error messages and sets the status message to be the Selector doesnt match any target message
            })
        } else {
            sender.sendMessage("Hello world"+optionalText+"!")
        }

        // This should be the default command response.
        // Dont try to be smart with making the default an error to handle it when errors occur in the code and the code doesnt execute to the end.
        return {statusCode: CommandStatus.SUCCESS}
    })
    .addParam({name:"target",optional:false,type:"SELECTION"})
    .setPermissionLevel(2)
    .setRequiresCheats(false)
    .register()
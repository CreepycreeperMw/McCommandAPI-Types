# What is this?
Many people from the Minecraft (Bedrock) Community have long wished for an
actual system to create own Commands.
In fact, when the formerly known as gametest framework released, the first thing
people started doing is make own Chat Commands, because it had access to the chat system.

This is made possible using a prefix such as ! and an own system to parse these chat messages and run code accordingly.

Tho this brings major downsides with it such as:
 - Incompatability: Most of these addons are completely incompatabile with another and dont work together
 - Syntax: Its really hard and unhandy for users to use these commands because there is no
    - Autocompletion
    - Syntax Guide above the chat box

    and often enough things like a proper
    - Help Command
    - Syntax error system

    are completely missing and there is no universal system. Whats missing is, **a standard**.
 - Chatflow: Another issue is that a lot of these addons cancel the event directly, disabling all other entities that may use the chat system, such as the report feature, or external programms that utilize the chat capabilities.

***This*** is an developer friendly approach to the command handler system, which is so badly needed.

 This system is based on years of approaches to command handlers from all of Minecraft and other communities.
 
 Note: This is **not an implementation** but the ___types___ / -docs for an api.

# Important Notes
- This is NOT meant to be the final version of the api
- Mojang's style guides and writing style may not be fully adhered
- There may be different variations already included in the files, such as the Command being able to be registered using [Command.register()](https://github.com/CreepycreeperMw/McCommandAPI-Types/blob/main/Command.d.ts#L113) or [System.registerCommand()](https://github.com/CreepycreeperMw/McCommandAPI-Types/blob/main/System.d.ts#L11), depending on what Mojang (or the Mojangsters) think may be the best solution. The reason for this is that things like this are heavily subjective and e.g. the [System.registerCommand()]() may better comply with mojangs existing framework.

# Navigation
- The different parts of the api are split up into 4 files respectively, [Command](./Command.d.ts), [CommandSender](./CommandSender.d.ts), [CommandOption](./CommandOption.d.ts) & [CommandResponse](./CommandResponse.d.ts). You can consider this the main source of the project.
- There is also a [index.d.ts](./index-commandtypes.d.ts) file containing the bundled package of the above mentioned files.
- For versions without jsdoc comments you can alternatively use the [types-without-jsdoc](./Types-without-jsdoc/)s.
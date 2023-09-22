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
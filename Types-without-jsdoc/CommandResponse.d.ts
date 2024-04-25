export interface CommandResponse {
    statusCode: CommandStatus
    statusMessage?: string
}

export enum CommandStatus {
    SUCCESS = 0,
    FAILURE = 1,
    SYNTAX_ERROR = -2147483648,
    INCORRECT_ARGS = -2147352576
}
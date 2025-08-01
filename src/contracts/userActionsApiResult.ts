import {User} from "@contracts/user";

/**
 * Defines the API response we get back when we perform user actions
 * using our internal API
 */
export type UserActionsApiResult = {
    message: string,
    user: User
}

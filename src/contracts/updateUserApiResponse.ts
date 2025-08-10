import {User} from "@contracts/user";

/**
 * Defines the API response we get back when we perform the update user action
 */
export type UpdateUserApiResponse = {
    message: string,
    success: boolean,
    user: null|User
}

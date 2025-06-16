import validator from "validator";
import jwt from "jsonwebtoken";
import {AppDataSource} from "../../src/data-source.js";
import UserSchema from "../../src/schemas/User.js";
import {validateJwtFromRequest} from "../../utils/jwtValidator.js";

/**
 * Attempt to validate the user from the given request
 * @param {any} request
 * @param {any} response
 * @returns {Promise<*>}
 */
export default async function validate(request, response) {

    try {
        const user = await validateJwtFromRequest(request);
        return response.status(200).json({user: user})
    } catch (error) {
        return response.status(401).json({message: error.message});
    }
}

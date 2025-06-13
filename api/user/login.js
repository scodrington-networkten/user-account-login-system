import validator from "validator";
import {AppDataSource} from "../../src/data-source.js";
import UserSchema from "../../src/schemas/User.js";
import jwt from "jsonwebtoken";

/**
 * Given a post request with username + password, sign the user in and generate a JWT to use
 * @param request
 * @param response
 * @returns {Promise<*>}
 */
export default async function login(request, response) {

    //collect and verify body exists and has values passed
    const body = request.body;

    if (!body || Object.keys(body).length === 0) {
        return response.status(500).json({message: "The request body is either empty or undefined"})
    }

    let {email = '', password = ''} = body;

    //validate email + password before login check
    if (!validator.isEmail(email) || validator.isEmpty(email)) {
        return response.status(400).json({message: "The provided email was either empty or invalid"});
    }
    if (validator.isEmpty(password) || validator.isEmpty(password)) {
        return response.status(400).json({message: "The provided password was invalid or empty"});
    }

    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
    }

    const userRepo = AppDataSource.getRepository(UserSchema);
    const existingUser = await userRepo.findOneBy({email: email});
    if (!existingUser) {
        return response.status(400).json({message: `No account exists for this email: ${email}`});
    }

    //user exists with that email, verify against db
    const validUser = await userRepo.findOneBy({email: email, password: password});
    if (!validUser) {
        return response.status(400).json({message: "Username or email invalid, unable to sign in"});
    }

    //good response, generate JWT for it
    const token = jwt.sign({id: validUser.id}, process.env.JWT_SECRET_KEY, {expiresIn: '30s'})
    return response.status(200).json({token: token});

}

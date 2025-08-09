import {AppDataSource} from "../../src/data-source.js";
import validator from "validator";
import UserSchema from "../../src/schemas/User.js";
import jwt from "jsonwebtoken";


/**
 * Processes the signup to the system from formdata
 * @param request
 * @param response
 * @returns {Promise<*>}
 */
export default async function signup(request, response) {

    if (request.method !== 'POST') {
        return response.status(405).json({message: "GET requests not allowed here, must be a POST request"});
    }

    //collect and verify body exists and has values passed
    const body = request.body;

    if (!body || Object.keys(body).length === 0) {
        return response.status(500).json({message: "The request body is either empty or undefined"})
    }

    //destructure into variables for processing
    let {email = '', password = '', name=''} = body;

    //validate email
    if (!validator.isEmail(email) || validator.isEmpty(email)) {
        return response.status(400).json({message: "The provided email was either empty or invalid"});
    }

    //validate pasword
    if (validator.isEmpty(password)) {
        return response.status(400).json({message: "The provided password was invalid or empty"});
    }
    if (!validator.isLength(password, {min: 8, max: 100})) {
        return response.status(400).json({message: "The provided password must be at least 8 characters"});
    }

    //validate name
    if(validator.isEmpty(name)){
        return response.status(400).json({message: "The provided name was invalid or empty"});
    }

    /*
    if (!validator.isStrongPassword(password)) {
        return response.status(400).json({message: "The provided password is not strong enough"})
    }*/

    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
    }

    const userRepo = AppDataSource.getRepository(UserSchema);

    const existingUser = await userRepo.findOneBy({email: email});
    if (existingUser) {
        return response.status(400).json({message: `An account already exists using ${email}. Consider resetting your password.`});
    }

    //try and create the user account
    try {

        const newUser = userRepo.create({
            email: email,
            password: password,
            first_name: name,
            last_name: null,
            is_active: true,
            created_at: new Date(),
            metadata: {
                bio: null,
                country: null,
                sex: null
            }
        });

        await userRepo.save(newUser);

        //create the JWT to send back to the user
        const token = jwt.sign(newUser, process.env.JWT_SECRET_KEY, {expiresIn: '6h'})

        const data = {
            token: token,
            user: newUser,
            message: 'User account created'
        }

        return response.status(200).json(data);

    } catch (error) {
        return response.status(400).json({message: error.message});
    }

}

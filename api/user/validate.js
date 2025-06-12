import validator from "validator";
import jwt from "jsonwebtoken";
import {AppDataSource} from "../../src/data-source.js";
import UserSchema from "../../src/schemas/User.js";

export default async function validate(request, response) {

    //collect auth header to extract auth
    const authHeader = request.headers['authorization'];
    console.log(authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return response.status(401).json({message: 'Missing or invalid auth header'});
    }

    //extract jwt
    const token = authHeader.split(' ')[1];
    console.log(token);

    //validate the token
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
        }

        //get user by that token
        const userRepo = AppDataSource.getRepository(UserSchema);
        const user = await userRepo.findOneBy({id: decodedToken.id});
        if (!user) {
            return response.status(400).json({message: `Tried to find an account via id but it failed: ${decodedToken.id}`});
        }

        return response.status(200).json({user: user})

    } catch (error) {

        return response.status(401).json({message: 'Invalid Token supplied'});
    }


}

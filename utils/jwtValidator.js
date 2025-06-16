import jwt from "jsonwebtoken";
import {AppDataSource} from "../src/data-source.js";
import UserSchema from "../src/schemas/User.js";

/**
 * Given a request, extract JWT and return the associated user.
 * will return an error or user representing the user belonging to that jwt
 * @param {any} request
 * @returns {Promise<any>}
 */
export async function validateJwtFromRequest(request) {

    //collect auth header to extract auth
    const authHeader = request.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new Error('Missing or invalid auth header');
    }

    //extract jwt
    const token = authHeader.split(' ')[1];

    //validate the token
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (error) {
        throw new Error('Invalid Token supplied');
    }

    //try and find user with that token
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
    }

    const userRepo = AppDataSource.getRepository(UserSchema);
    const user = await userRepo.findOne({
        where: {id: decodedToken.id},
        relations: ['favorite_movies']
    });

    console.log(user);

    if (!user) {
        throw new Error(`No user found for token ID: ${decodedToken.id}`);
    }

    return user;

}

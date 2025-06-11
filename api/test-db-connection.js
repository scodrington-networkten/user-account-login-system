import {HttpError} from "../utils/httpError.js";
import {AppDataSource} from "../src/data-source.js";
import UserSchema from "../src/schemas/User.js";

const testDbConnection = async (request, response) => {

    // initialise the app data source
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
    }

    const userRepo = AppDataSource.getRepository(UserSchema);

    try {

        const email = 'admin@example.com';
        const user = await userRepo.findOneBy({email: email});

        if (user !== null) {
            return response.status(200).json(user);
        } else {
            return response.status(500).json({error: `user with email ${email} could not be found`});
        }


    } catch (error) {
        return response.status(500).json(error);

    } finally {
        await AppDataSource.destroy();
    }

}
export default testDbConnection;

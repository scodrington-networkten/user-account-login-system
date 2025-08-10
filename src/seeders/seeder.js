import dotenv from 'dotenv';

dotenv.config();


import {AppDataSource} from "../data-source.js";
import UserSchema from "../schemas/User.js";
import UserMetadataSchema from "../schemas/UserMetdata.js";
import FavoriteMovieSchema from "../schemas/FavoriteMovie.js";
import WatchLaterMovieShema from "../schemas/WatchLaterMovie.js";
import bcrypt from "bcrypt";


(async () => {

    try {

        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
        }

        const userRepo = AppDataSource.getRepository(UserSchema);
        const userMetadataRepo = AppDataSource.getRepository(UserMetadataSchema);
        const watchLaterMovieRepo = AppDataSource.getRepository(WatchLaterMovieShema);
        const favoriteMovieRepo = AppDataSource.getRepository(FavoriteMovieSchema);

        const adminEmail = "admin@example.com";
        const adminPassword = await bcrypt.hash("password", 10);

        /**
         * clear out the user table
         * Has to be done with querybuilder + delete to force the deletion else typeorn errors about cascades
         */
        console.log("Clearing out table data")
        await favoriteMovieRepo.createQueryBuilder().delete().execute();
        await watchLaterMovieRepo.createQueryBuilder().delete().execute();
        await userRepo.createQueryBuilder().delete().execute();
        await userMetadataRepo.createQueryBuilder().delete().execute();
        
        const userData = {
            first_name: "John",
            last_name: "Smith",
            is_active: true,
            created_at: new Date(),
            updated_at: new Date(),
            email: adminEmail,
            password: adminPassword,
            metadata: {
                bio: "This is the bio",
                sex: "male",
                country: "AU"
            }
        }

        const user = userRepo.create(userData);
        await userRepo.save(user);

        console.log(`Created a new admin account: ${adminEmail}`);
        await AppDataSource.destroy();
        console.log("Seeding has been Successfully completed");
    } catch (error) {
        console.error("Seeding process has ran into an error", error);
    } finally {
        process.exit();
    }


})();



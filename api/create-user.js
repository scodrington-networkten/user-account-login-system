import "reflect-metadata";
import dotenv from "dotenv";
import {DataSource} from "typeorm";
import UserSchema from "../src/schemas/entities/User";
import UserMetdataSchema from "../src/schemas/entities/UserMetdata";

/**
 * Create a user via incoming form data and push it into postgres db via typeorm
 * @param request
 * @param response
 * @returns {Promise<*>}
 */
export default async function createUser(request, response) {

    dotenv.config();
    const AppDataSource = new DataSource({
        type: "postgres",
        host: process.env.PGHOST,
        port: +(process.env.PGPORT || 5432),
        username: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        database: process.env.PGDATABASE,
        entities: [UserSchema, UserMetdataSchema],
        synchronize: true,
        logging: ["error", "query", "schema"]
    })


    // initialise the app data source
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
    }

    //get repository for the user schema
    const userRepo = AppDataSource.getRepository(UserSchema.options.name);

    try {
        const newUserEntity = userRepo.create({
            first_name: "john",
            last_name: "Smith",
            is_active: true,
            created_at: new Date(),
            metadata: {
                email: "test@gmail.com",
                bio: "This is a sample bio",
                avatar_url: null
            }
        });

        const savedUserEntity = await userRepo.save(newUserEntity);
        console.log("User Created!");
        return response.status(200).json({
            status: 200,
            message: "successfully created user",
            user: savedUserEntity
        });

    } catch (err) {
        console.error("Error inserting user:", err);
        return response.status(500).json({error: "Failed to insert user"});
    }

}

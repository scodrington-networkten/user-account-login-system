
import "reflect-metadata";
import dotenv from "dotenv";
import {DataSource} from "typeorm";
import UserSchema from "./entity/User";

export default async function createUser(request, response){

    const result = dotenv.config();
    const AppDataSource = new DataSource({
        type: "postgres",
        host: process.env.PGHOST,
        port: +(process.env.PGPORT || 5432),
        username: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        database: process.env.PGDATABASE,
        entities: [UserSchema],
        migrations: [__dirname + "/../migration/*.js"],
        synchronize: false,        // use migrations instead
        logging: ["error", "query", "schema"]
    })


    // initialise the app data source
    if(!AppDataSource.isInitialized){
        await AppDataSource.initialize();
    }

    //get repository for the user schema
    const userRepo = AppDataSource.getRepository(UserSchema.options.name);

    try{

        const newUserData = {
            name: "john",
            email: "test@gmail.com",
            isActive: true
        }

        const newUserEntity = userRepo.create(newUserData);

        const savedUserEntity = await userRepo.save(newUserEntity);

        return response.status(200).json(savedUserEntity);

    }catch(err){
        console.error("Error inserting user:", err);
        return response.status(500).json({ error: "Failed to insert user" });
    }

}

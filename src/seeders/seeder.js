import dotenv from 'dotenv';

dotenv.config();


import {AppDataSource} from "../data-source.js";
import UserSchema from "../schemas/User.js";

const seed = async () => {

    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
    }

    const userRepo = AppDataSource.getRepository(UserSchema);
    const adminEmail = "admin@example.com";
    //const adminPassword = await bcrypt.hash("password", 10);
    const adminPassword = "password";


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

    const existing = await userRepo.findOneBy({email: adminEmail});
    if (existing) {
        console.log("Admin account exists in DB already, updating record with default data");

        try {
            await userRepo.save(userData);
            console.log(`Successfully updated the user: ${adminEmail}`);
        } catch (error) {
            console.error("There was an error updating the admin account", error);
            throw error;
        }

    } else {
        console.log("Admin account doesnt exist in the DB, creating");

        try {

            await userRepo.save(userData);
            console.log(`Successfully created the user: ${adminEmail}`);

        } catch (error) {
            console.error("There was an error creating the admin ccount", error);
            throw error;
        }
    }

    await AppDataSource.destroy();
}

/**
 * Run the seeder
 */
seed()
    .then(() => {
        console.log("Seeding has been Successfully completed");
    })
    .catch(error => {
        console.error("Seeding process has ran into an error", error);
    })
    .finally(() => {
        process.exit();
    });

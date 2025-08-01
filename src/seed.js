import dotenv from 'dotenv';

dotenv.config();

import {AppDataSource} from "./data-source.js";
import * as bcrypt from "bcrypt"
import UserSchema from "./schemas/User.js";
import UserMetdataSchema from "./schemas/UserMetdata.js";


const seed = async () => {

    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
    }

    const userRepo = AppDataSource.getRepository(UserSchema);
    const adminEmail = "admin@example.com";
    //const adminPassword = await bcrypt.hash("password", 10);
    const adminPassword = "password";

    const existing = await userRepo.findOneBy({email: adminEmail});
    if (existing) {
        console.log("Admin account exists in DB already, updating record");

        existing.password = adminPassword; // You might want to hash this if needed
        existing.first_name = "John";
        existing.last_name = "Smith";
        existing.is_active = true;
        existing.updated_at = new Date(); // If you're tracking updates

        try {
            await userRepo.save(existing);
            console.log(`Successfully updated the user: ${adminEmail}`);
        } catch (error) {
            console.error("There was an error updating the admin account", error);
            throw error;
        }

    } else {
        console.log("Admin account doesnt exist in the DB, creating");

        try {
            const user = userRepo.create({
                email: adminEmail,
                password: adminPassword,
                first_name: "John",
                last_name: "Smith",
                is_active: true,
                created_at: new Date()
            });
            await userRepo.save(user);
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

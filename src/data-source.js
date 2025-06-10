import dotenv from 'dotenv';

dotenv.config();

import {DataSource} from "typeorm";
import UserSchema from "./schemas/User.js";
import UserMetdata from "./schemas/UserMetdata.js";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.PGHOST,
    port: +(process.env.PGPORT || 5432),
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    synchronize: false,
    logging: true,
    entities: [UserSchema, UserMetdata],
    migrations: ["src/migrations/*.cjs"],  // <---- notice .cjs extension here
});

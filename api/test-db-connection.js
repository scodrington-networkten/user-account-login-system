import dotenv from "dotenv";
import {Client} from "pg";

const testDbConnection = async (request, response) => {

    let payload = {};
    dotenv.config();

    const client = new Client({
        host: process.env.PGHOST,
        port: +(process.env.PGPORT || 5432),
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        database: process.env.PGDATABASE,
        ssl: process.env.NODE_ENV === 'production' ? {rejectUnauthorized: false} : false
    })

    try {

        await client.connect();

        const result = await client.query('SELECT NOW()');
        if (result.rows.length > 0) {
            payload.db = {message: `Connected to DB, time now ${result.rows[0].now}`};
        }

        payload.env = process.env;

        return response.status(200).json(payload);


    } catch (error) {
        payload.error = error;
        payload.env = process.env;
        return response.status(500).json(payload);

    } finally {
        await client.end();
    }

}
export default testDbConnection;

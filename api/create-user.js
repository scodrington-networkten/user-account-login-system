
import dotenv from 'dotenv';
import {Client, Pool} from "pg";

//use pooling
let pool;
if(!pool){
    pool = new Pool();
}

export default async function createUser(request, response) {

    const result = dotenv.config();
    const client = new Client();
    try {
        await client.connect();
        const result = await pool.query('SELECT NOW()');
        await client.end();
        return response.status(200).json({ now: result.rows[0].now });
    } catch (error) {
        return response.status(500).json({ error: error.message });
    }

}

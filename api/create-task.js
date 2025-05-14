import dotenv from 'dotenv';
import {Client, Pool} from "pg";

//use pooling
let pool;
if (!pool) {
    pool = new Pool();
}

export default async function createTask(request, response) {

    //extract field data from body
    let {title, description, steps} = request.body;

    const query = 'INSERT INTO tasks (title, description, steps) VALUES ($1, $2, $3) RETURNING *';
    const values = [title, description, steps];
    const result = await pool.query(query, values);

    console.log(result);

    return response.status(200).json({response: result.rows[0]});


    /*
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
    */
}

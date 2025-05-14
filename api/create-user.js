
import dotenv from 'dotenv';

import {Client} from "pg";

export default async function createUser(request, response) {

    const result = dotenv.config();
   // console.log(result);
    //console.log(process.env);

   // return response.status(200).json({message: "hello"});

    const client = new Client();
    try {
        await client.connect();
        const result = await client.query('SELECT NOW()');
        await client.end();
        return response.status(200).json({ now: result.rows[0].now });
    } catch (error) {
        return response.status(500).json({ error: error.message });
    }

}

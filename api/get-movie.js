import dotenv from "dotenv";
import { HttpError } from "../utils/httpError.js";


/**
 * Get movie information based on a set genre
 */
export default async function getMovie(request, response) {


    //extract query data to customise the request
    let {id} = request.query;
    let url = `${process.env.MOVIE_API_URL_BASE}movie/${id}`;

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.MOVIE_API_TOKEN}`
        }
    }

    let result = await fetch(url, options);
    if (!result.ok) {
        const errorText = await result.text();
        throw new HttpError(`HTTP error hitting the ${url} endpoint, error: ${errorText}`, 500);
    }

    let json = await result.json();
    return response.status(200).json({json});

}

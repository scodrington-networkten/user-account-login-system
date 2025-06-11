import dotenv from "dotenv";
import { HttpError } from "../utils/httpError.js";

/**
 * Get movie information based on a set genre
 */
export default async function getMovies(request, response) {


    //extract query data to customise the request
    let {genre_id: genreId} = request.query;
    let {page} = request.query;

    let url = `${process.env.MOVIE_API_URL_BASE}discover/movie?with_genres=${genreId}&page=${page}`;

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.MOVIE_API_TOKEN}`
        }
    }

    let result = await fetch(url, options);
    if (!result.ok) {
        throw new HttpError(`HTTP error hitting the ${url} endpoint`, 500);
    }

    let json = await result.json();
    return response.status(200).json({json});

}

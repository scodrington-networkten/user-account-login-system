
import { HttpError } from "../utils/httpError.js";


/**
 * Searches for movies given a query
 */
export default async function movieSearch(request, response) {

    let {q} = request.query;
    let {page} = request.query;

    if(typeof q !== 'string' || q.trim() === ''){
        return response.status(400).json(new HttpError(`search query was not provided`));
    }


    let url = `${process.env.MOVIE_API_URL_BASE}search/movie?query=${q}&page=${page}`;

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

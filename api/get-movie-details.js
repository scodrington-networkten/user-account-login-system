import { HttpError } from "../utils/httpError.js";

/**
 * Gets additional information about a given specific movie
 * @param request
 * @param response
 * @returns {Promise<*>}
 * @constructor
 */
export default async function GetMovieDetails(request, response) {

    let {id} = request.query;

    if (!id) {
        return response.status(400).json(new HttpError('error occured', 400));
    }

    const url = `${process.env.MOVIE_API_URL_BASE}movie/${id}`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.MOVIE_API_TOKEN}`
        }
    }

    try {
        const result = await fetch(url, options);
        if (!result.ok) {
            throw new HttpError(`HTTP Error hitting the ${url} endpoint with status code: ${result.statusText}`, 500);
        }
        const json = await result.json();
        return response.status(200).json(json);


    } catch (error) {
        return response.status(error.status).json(error);
    }
}

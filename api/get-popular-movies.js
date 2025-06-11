import { HttpError } from "../utils/httpError.js";

/**
 * get a list of the most popular 20 movies
 * @param request
 * @param response
 * @returns {Promise<*>}
 */
export default async function getPopularMovies(request, response) {

    let url = `${process.env.MOVIE_API_URL_BASE}movie/popular`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.MOVIE_API_TOKEN}`
        }
    }

    let result = await fetch(url, options);
    let data = await result.json();

    return response.status(200).json({json: data});
}

import {HttpError} from "./_utilities/httpError";

/**
 * Gets credit information about the moving, providing information about the cast
 * @param request
 * @param response
 * @returns {Promise<*>}
 */
export default async function getMovieCredits(request, response) {

    let {id} = request.query;
    if (!id) {
        return response.status(500).json(new HttpError('Movie ID has to be supplied'));
    }

    const url = `${process.env.MOVIE_API_URL_BASE}movie/${id}/credits`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.MOVIE_API_TOKEN}`
        }
    }

    try {
        let result = await fetch(url, options);
        if (!result.ok) {
            throw new HttpError(`HTTP Error hitting the ${url} endpoint with status code: ${result.statusText}`, 500);
        }

        let json = await result.json();
        return response.status(200).json(json);

    } catch (error) {
        return response.status(error.status).json(error);
    }
}

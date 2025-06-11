import { HttpError } from "../utils/httpError.js";

/**
 * Gets the latest movies currently being shown in cinemas
 * @param request
 * @param response
 * @returns {Promise<*>}
 */
export default async function getCurrentMovies(request, response) {

    let url = `${process.env.MOVIE_API_URL_BASE}movie/now_playing`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.MOVIE_API_TOKEN}`
        }
    }

    const apiResponse = await fetch(url, options);

    if (apiResponse.ok) {
        const jsonData = await apiResponse.json();
        return response.status(200).json({data: jsonData});
    } else {
        const responseBody = await apiResponse.json();
        return response.status(500).json(responseBody);
    }

}

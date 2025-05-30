import dotenv from "dotenv";
import HttpError from "./httpError";

/**
 * Used to interact with the underlying API
 */
class ApiHelper{

    /**
     *
     *
     * @returns {Promise<{data: null, message: string, status: number}>}
     */
    async getGenres(){

        let response = {
            data: null,
            status: 200
        }

        const url = `${process.env.MOVIE_API_URL_BASE}genre/movie/list`;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.MOVIE_API_TOKEN}`
            }
        }

        try {
            //hit endpoint for genres and verify
            const result = await fetch(url, options);
            if (!result.ok) {
                throw new HttpError(`HTTP Error hitting the ${url} endpoint with status code: ${result.statusText}`, 500);
            }

            //extract json data about genres
            const json = await result.json();
            if (!json.genres || !Array.isArray(json.genres)) {
                throw new httpError(`Unexpected response from ${url} endpoint. Expected an array of genres with information`, 400);
            }
            response.data = json;
        } catch (error) {

            response.status = error.status;
            response.data.message = error.message;
        }

        return response;
    }

}
export default ApiHelper;

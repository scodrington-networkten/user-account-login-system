import('dotenv').then(dotenv => dotenv.config());
import HttpError from "./_utilities/httpError";

export default async function Genres(request, response) {

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

        return response.status(200).json({data: json});

        response.data = json;
    } catch (error) {
        return response.status(error.status).json({message: error.message});
    }

}


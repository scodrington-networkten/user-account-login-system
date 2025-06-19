export default async function get(request, response) {


    //collect auth header to extract auth
    const action = request.headers['x-action'];
    if (!action) {
        return response.status(400).json({error: 'Missing x-action header in request'});
    }

    const actionHandler = {
        'get-related-movies': getRelatedMovies,
        'get-recommended-movies': getRecommendedMovies
    }

    const handler = actionHandler[action];
    if (!handler) {
        let methodMessage = `the provided action: ${action} is not a valid method, allowed methods are: ${Object.keys(actionHandler).join(', ')}`;
        return response.status(400).json({error: methodMessage});
    }

    try {
        const result = await handler(request);
        return response.status(200).json(result);
    } catch (error) {
        return response.status(500).error(error.message);
    }

}

/**
 * Get related movies from the API given a movie-id
 * @param request
 */
const getRelatedMovies = async (request) => {

    try {

        const {'movie-id': movieId} = request.headers;
        if (!movieId) {
            throw new Error('A movie-id headers key must be sent for this method');
        }

        //find the related movies given this ID
        let url = `${process.env.MOVIE_API_URL_BASE}movie/${movieId}/similar`;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.MOVIE_API_TOKEN}`
            }
        }

        const result = await fetch(url, options);
        if (!result.ok) {
            throw new Error(result.statusText);
        }

        return await result.json();

    } catch (error) {
        throw new Error(error.message);
    }
}

const getRecommendedMovies = async (request) => {

}


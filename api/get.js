import slugify from "slugify";

export default async function get(request, response) {


    //collect auth header to extract auth
    const action = request.headers['x-action'];
    if (!action) {
        return response.status(400).json({error: 'Missing x-action header in request'});
    }

    const actionHandler = {
        'get-related-movies': getRelatedMovies,
        'get-recommended-movies': getRecommendedMovies,
        'get-movie-keywords': getMovieKeywords,
        'get-movies-by-keyword': getMoviesByKeyword,
        'get-keyword': getKeyword
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

/**
 * Given a movie ID, retreive all keywords for the associated movie
 * @param request
 * @returns {Promise<any>}
 */
const getMovieKeywords = async (request) => {

    try {

        const {'movie-id': movieId} = request.headers;
        if (!movieId) {
            throw new Error('A movie-id headers key must be sent for this method');
        }

        //find the related movies given this ID
        let url = `${process.env.MOVIE_API_URL_BASE}movie/${movieId}/keywords`;
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


/**
 * Find all movies matching a given keyword
 * @param request
 * @returns {Promise<any>}
 */
const getMoviesByKeyword = async (request) => {

    //extract the keyword from the header

    try {
        const {'keyword-id': keywordId} = request.headers;
        const {page = 1 } = request.headers;
        if (!keywordId) {
            throw new Error('A keyword-id headers key must be sent for this method');
        }

        //find the related movies given this ID
        let url = `${process.env.MOVIE_API_URL_BASE}discover/movie?with_keywords=${keywordId}&page=${page}`;
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

/**
 * Given a keyword string, try and find it's corresponding matching object on the API to
 * return its ID for further requests
 *
 * @param request
 * @returns {Promise<void>}
 */
const getKeyword = async (request) => {

    try {
        const {'keyword': keyword} = request.headers;
        if (!keyword) {
            throw new Error('A keyword header key must be sent for this method');
        }

        //find the related movies given this ID
        const slugifiedKeyword = slugify(keyword, {lower: true, strict: true});
        let url = `${process.env.MOVIE_API_URL_BASE}search/keyword?query=${slugifiedKeyword}`;
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


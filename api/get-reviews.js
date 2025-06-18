
export default async function getReviews(request, response) {

    let {movie_id: movieId} = request.query;

    if (!movieId) {
        return response.status(400).json({message: 'movie_id is expected to be passed as a querystring property to this endpoint'});
    }

    const url = `${process.env.MOVIE_API_URL_BASE}movie/${movieId}/reviews`;
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
            throw new Error(`Error from TMDB: ${result.status} - ${result.statusText}`);
        }
        const json = await result.json();
        return response.status(200).json(json);

    } catch (error) {
        return response.status(400).json({message: error});
    }

}

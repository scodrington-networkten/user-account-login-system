


/**
 * Searches for movies given a query
 */
export default async function movieSearch(request, response) {


    try {
        let {q} = request.query;
        if (typeof q !== 'string' || q.trim() === '') {
            throw new Error(`search query was not provided`);
        }

        let {page} = request.query;
        page = page ?? 1;

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
            const data = await result.json();
            throw new Error(data.status_message);
        }

        let json = await result.json();
        return response.status(200).json({json});

    } catch (error) {
        return response.status(500).json({message: error.message});
    }


}

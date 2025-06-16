import {AppDataSource} from "../../src/data-source.js";
import {validateJwtFromRequest} from "../../utils/jwtValidator.js";
import FavoriteMovieSchema from "../../src/schemas/FavoriteMovie.js";

export default async function actions(request, response) {

    //collect auth header to extract auth
    const action = request.headers['x-user-action'];
    if (!action) {
        return response.status(400).json({error: 'Missing x-user-action header'});
    }

    //verify method allowed
    const allowedMethods = ['add-to-favorite', 'add-to-wishlist'];
    if (!allowedMethods.includes(action)) {
        let methodMessage = `the provided action: ${action} is not a valid method, allowed methods are: ${allowedMethods.join(', ')}`;
        return response.status(400).json({error: methodMessage});
    }

    //ensure valid JWT has been sent and user exists
    let user;

    try {
        user = await validateJwtFromRequest(request);
    } catch (error) {
        return response.status(400).json({message: error.message});
    }

    //ensure connection to do
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
    }


    const body = request.body;
    if (!body || Object.keys(body).length === 0) {
        return response.status(500).json({message: "The request body is either empty or undefined"})
    }

    switch (action) {

        case 'add-to-favorite':

            try {

                const {movie_id: movieId} = body;
                if (movieId === undefined || movieId === null) {
                    return response.status(401).json({message: 'movie_id was not passed'});
                }

                const result = await addToFavorite(user, movieId);
                return response.status(200).json({message: 'successfully added item to favorite'});
            } catch (error) {
                return response.status(400).json({message: 'there was an error adding item to favorite'});
            }

            break;

        case 'add-to-wishlist':

            try {

            } catch (error) {

            }


            break;

    }


    return response.status(200).json({message: "wooo"});
}

async function addToWishlist(user, movieId) {


    console.log("Adding to list list");
}

async function addToFavorite(user, movieId) {


    try {
        const favoriteMovieRepo = AppDataSource.getRepository(FavoriteMovieSchema);
        const newRecord = favoriteMovieRepo.create({
            movie_id: movieId,
            user: user
        })

        await favoriteMovieRepo.save(newRecord);


    } catch (error) {
        throw error;
    }


    console.log("Adding to fav");

}

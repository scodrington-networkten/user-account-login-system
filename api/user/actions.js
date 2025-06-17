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
    const allowedMethods = ['add-favorite', 'remove-favorite', 'add-wishlist'];
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

        case 'add-favorite':

            try {

                const {movie_id: movieId} = body;
                if (movieId === undefined || movieId === null) {
                    return response.status(401).json({message: 'movie_id was not passed'});
                }

                //add to favorite & return updated user
                await addFavorite(user, movieId);
                user = await validateJwtFromRequest(request);

                return response.status(200).json({
                    message: 'successfully added this movie to your favorite list',
                    user: user
                });
            } catch (error) {
                return response.status(400).json({message: 'there was an error adding this item to your favorite list'});
            }

        case 'remove-favorite':


            try {

                const {movie_id: movieId} = body;
                if (movieId === undefined || movieId === null) {
                    return response.status(401).json({message: 'movie_id was not passed, could not remove from your favorite list'});
                }

                //remove matched movies & get the updated user
                await removeFavorite(user, movieId);
                user = validateJwtFromRequest(request);

                return response.status(200).json({
                    message: 'successfully removed this movie from your favorite list',
                    user: user
                });
            } catch (error) {
                return response.status(400).json({message: 'there was an error removing this item from your favorite list'});
            }


        case 'add-wishlist':

            try {

            } catch (error) {

            }


            break;

    }

}

async function addToWishlist(user, movieId) {


    console.log("Adding to list list");
}

async function addFavorite(user, movieId) {


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

}

async function removeFavorite(user, movieId) {

    try {
        const favoriteMovieRepo = AppDataSource.getRepository(FavoriteMovieSchema);
        const favRecords = await favoriteMovieRepo.find({
            where: {
                user: {id: user.id},
                movie_id: movieId
            }
        });

        if (favRecords) {
            await favoriteMovieRepo.remove(favRecords);
        } else {
            throw new Error(`Couldnt remove movie ${movieId} from the user`);
        }
    } catch (error) {
        throw error;
    }
}


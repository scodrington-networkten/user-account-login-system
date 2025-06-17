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

                if (!movieId) {
                    return response.status(400).json({message: 'movie_id was not passed'});
                }

                const favoriteMovieRepo = AppDataSource.getRepository(FavoriteMovieSchema);

                const newRecord = favoriteMovieRepo.create({
                    movie_id: movieId,
                    user: user,
                });

                await favoriteMovieRepo.save(newRecord);

                // Refresh user (so favorite list is current)
                user = await validateJwtFromRequest(request);

                return response.status(200).json({
                    message: 'Successfully added this movie to your favorite list',
                    user: user
                });

            } catch (error) {
                console.error(error); // helpful in development
                return response.status(500).json({
                    message: 'There was an error adding this item to your favorite list'
                });
            }


        case 'remove-favorite':
            try {
                const {movie_id: movieId} = body;

                if (!movieId) {
                    return response.status(400).json({
                        message: 'movie_id was not passed; could not remove from your favorite list'
                    });
                }

                const favoriteMovieRepo = AppDataSource.getRepository(FavoriteMovieSchema);

                const favRecords = await favoriteMovieRepo.find({
                    where: {
                        user: {id: user.id},
                        movie_id: movieId
                    }
                });

                if (favRecords.length === 0) {
                    return response.status(404).json({
                        message: `Movie ${movieId} is not in your favorite list`
                    });
                }

                await favoriteMovieRepo.remove(favRecords);
                user = await validateJwtFromRequest(request);

                return response.status(200).json({
                    message: 'Successfully removed this movie from your favorite list',
                    user: user
                });

            } catch (error) {
                console.error(error);
                return response.status(500).json({
                    message: 'There was an error removing this item from your favorite list'
                });
            }


        case 'add-wishlist':

            try {

            } catch (error) {

            }


            break;

    }

}

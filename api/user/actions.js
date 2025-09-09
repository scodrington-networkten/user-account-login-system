import {AppDataSource} from "../../src/data-source.js";
import {validateJwtFromRequest} from "../../utils/jwtValidator.js";
import FavoriteMovieSchema from "../../src/schemas/FavoriteMovie.js";
import WatchLaterMovieShema from "../../src/schemas/WatchLaterMovie.js";
import UserSchema from "../../src/schemas/User.js";
import MovieListSchema from "../../src/schemas/MovieList.js";

/**
 * Handles logged in user actions
 * - Adding or removing items from favorite list
 * - Adding or removing items from the watch later list
 *
 * @param request
 * @param response
 * @returns {Promise<*>}
 */
export default async function actions(request, response) {

    //collect auth header to extract auth
    const action = request.headers['x-user-action'];
    if (!action) {
        return response.status(400).json({error: 'Missing x-user-action header'});
    }

    //verify method allowed
    const allowedMethods = ['add-favorite', 'remove-favorite', 'add-watch-later', 'remove-watch-later', 'update-information', 'create-movie-list', 'delete-movie-list'];
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

        case 'create-movie-list':

            try {

                //extract data about the movie list
                const {title} = body;
                const {description} = body;


                //create a new list
                const movieListRepo = AppDataSource.getRepository(MovieListSchema);
                const newRecord = await movieListRepo.create({
                    title: title,
                    description: description,
                    user: user,
                });
                //save list
                const savedRecord = await movieListRepo.save(newRecord);
                if (!savedRecord) {
                    throw new Error(`Save failed: Record not persisted in the ${MovieListSchema.options.name} repository`);
                }

                //get a fresh version of the user, with this new data
                user = await validateJwtFromRequest(request);
                return response.status(200).json({
                    message: 'created a new movie list',
                    user: user,
                })

            } catch (error) {
                return response.status(500).json({
                    message: error.message
                });
            }

        case 'delete-movie-list':


        case 'add-favorite':
            try {
                const {movie_id: movieId} = body;
                if (!movieId) {
                    throw new Error('Movie ID not set: movie_id was not set the in request, could not add to favorite');
                }

                const favoriteMovieRepo = AppDataSource.getRepository(FavoriteMovieSchema);
                const newRecord = favoriteMovieRepo.create({
                    movie_id: movieId,
                    user: user,
                });

                const savedRecord = await favoriteMovieRepo.save(newRecord);
                if (!savedRecord) {
                    throw new Error(`Save failed: Record not persisted in the ${FavoriteMovieSchema.options.name} repository`);
                }

                //collect updated user object as data has changed
                user = await validateJwtFromRequest(request);
                return response.status(200).json({
                    message: 'Successfully added this movie to your favorite list',
                    user: user
                });

            } catch (error) {
                return response.status(500).json({
                    message: error.message
                });
            }


        case 'remove-favorite':
            try {
                const {movie_id: movieId} = body;
                if (!movieId) {
                    throw new Error('Movie ID not set: movie_id was not set the in request, could not remove from your favorite list');
                }

                const favoriteMovieRepo = AppDataSource.getRepository(FavoriteMovieSchema);
                const favRecords = await favoriteMovieRepo.find({
                    where: {
                        user: {id: user.id},
                        movie_id: movieId
                    }
                });

                if (favRecords.length === 0) {
                    throw new Error(`Movie ${movieId} is not in your favorite list, could not be removed`);
                }

                const removedEntry = await favoriteMovieRepo.remove(favRecords);
                user = await validateJwtFromRequest(request);

                return response.status(200).json({
                    message: 'Successfully removed this movie from your favorite list',
                    user: user
                });

            } catch (error) {
                return response.status(500).json({
                    message: error.message
                });
            }


        case 'add-watch-later':


            try {
                const {movie_id: movieId} = body;
                if (!movieId) {
                    return response.status(400).json({message: 'movie_id was not passed'});
                }

                const watchLaterRepo = AppDataSource.getRepository(WatchLaterMovieShema);
                const newRecord = watchLaterRepo.create({
                    movie_id: movieId,
                    user: user,
                });

                const savedRecord = await watchLaterRepo.save(newRecord);
                if (!savedRecord) {
                    throw new Error(`Save failed: Record not persisted in the ${WatchLaterMovieShema.options.name} repository`);
                }

                user = await validateJwtFromRequest(request);
                return response.status(200).json({
                    message: 'Successfully added this movie to your watch later list',
                    user: user
                });

            } catch (error) {
                return response.status(500).json({
                    message: error.message
                });
            }


            return response.status(200).json('Called add watch later endpoint');


        case 'remove-watch-later':

            try {
                const {movie_id: movieId} = body;
                if (!movieId) {
                    throw new Error('Movie ID not set: movie_id was not set the in request, could not remove from your watch later list');
                }

                const watchLaterRepo = AppDataSource.getRepository(WatchLaterMovieShema);
                const watchLaterRecords = await watchLaterRepo.find({
                    where: {
                        user: {id: user.id},
                        movie_id: movieId
                    }
                });

                if (watchLaterRecords.length === 0) {
                    throw new Error(`Movie ${movieId} is not in your watch later list, could not be removed`);
                }

                const removedEntry = await watchLaterRepo.remove(watchLaterRecords);
                user = await validateJwtFromRequest(request);

                return response.status(200).json({
                    message: 'Successfully removed this movie from your watch later list',
                    user: user
                });

            } catch (error) {
                return response.status(500).json({
                    message: error.message
                });
            }


        case 'update-information':


            try {

                //collect form data for use
                const updatedUserData = body;

                //collect user for the request
                user = await validateJwtFromRequest(request);

                //update the user based on new data (merging new data onto the old one)
                const userRepo = AppDataSource.getRepository(UserSchema);
                const updatedUser = await userRepo.save({
                    ...user, // includes id, so TypeORM knows it's an update
                    first_name: updatedUserData.first_name,
                    last_name: updatedUserData.last_name,
                    password: updatedUserData.password,
                    metadata: updatedUserData.metadata
                });

                return response.status(200).json({
                    success: true,
                    message: "Updated your account",
                    user: updatedUser
                });

            } catch (error) {
                return response.status(500).json({
                    message: error.message,
                    success: false,
                    user: null
                });
            } finally {

            }

    }

}

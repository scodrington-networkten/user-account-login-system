import "reflect-metadata";
import dotenv from "dotenv";
import {DataSource} from "typeorm";
import MovieSchema from "../src/schemas/entities/Movie";

/**
 * Creates a single movie and puts it in the DB
 * @param request
 * @param response
 * @returns {Promise<*>}
 */
export default async function createMovie(request, response) {

    dotenv.config();

    const AppDataSource = new DataSource({
        type: "postgres",
        host: process.env.PGHOST,
        port: +(process.env.PGPORT || 5432),
        username: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        database: process.env.PGDATABASE,
        entities: [MovieSchema],
        synchronize: process.env.NODE_ENV !== 'production',
        logging: ["error", "query", "schema"]
    })

    // initialise the app data source
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
    }

    const movieRepo = AppDataSource.getRepository(MovieSchema.options.name)

    //collect movie data from our API for a nominated genre ID
    const baseUrl = process.env.API_BASE_URL || 'http://localhost:3001';
    const movies = await fetch(`${baseUrl}/api/get-movies?genre_id=12`);
    const movieData = await movies.json();
    const records = movieData.json.results;

    //save all records into the db
    const newRecordIds = await processRecords(records, movieRepo);

    /*

    const newEntity = movieRepo.create({
        is_adult: false,
        portrait_image: '/z53D72EAOxGRqdr7KXXWp9dJiDe.jpg',
        landscape_image: '/1p5aI299YBnqrEEvVGJERk2MXXb.jpg',
        title: 'Mission: Impossible - The Final Reckoning',
        language: 'en',
        release_date: '2025-05-17',
        is_video: false,
        vote_score: 6.985,
        vote_count: 300,
        uid: 575265,
        overview: "Ethan Hunt and team continue their search for the terrifying AI known as the Entity — which has infiltrated intelligence networks all over the globe — with the world's governments and a mysterious ghost from Hunt's past on their trail",
        popularity: 349.707,
        genre_ids: [28, 12, 53]
    })
    */
    return response.status(200).json({
        message: "added movies to db",
        ids: newRecordIds
    });

}

/**
 * Given an array of records, push them into the DB as new entries
 * @param records
 * @param movieRepo
 * @returns {Promise<*[]>}
 */
async function processRecords(records, movieRepo) {

    let recordIds = [];
    for (const item of records) {

        const newEntity = movieRepo.create({
            is_adult: item.adult,
            portrait_image: item.backdrop_path,
            landscape_image: item.poster_path,
            title: item.title,
            language: item.original_language,
            release_date: item.release_date,
            is_video: item.video,
            vote_score: item.vote_average,
            vote_count: item.vote_count,
            uid: item.id,
            overview: item.overview,
            popularity: item.popularity,
            genre_ids: item.genre_ids
        })

        const savedEntity = await movieRepo.save(newEntity);
        recordIds.push(savedEntity.id);
    }

    return recordIds;
}

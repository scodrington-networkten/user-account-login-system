import "reflect-metadata";
import dotenv from "dotenv";
import {DataSource} from "typeorm";
import MovieSchema from "./entity/Movie";

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
        synchronize: true,
        logging: ["error", "query", "schema"]
    })

    // initialise the app data source
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
    }

    const movieRepo = AppDataSource.getRepository(MovieSchema.options.name)

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

    const savedEntity = await movieRepo.save(newEntity);
    return response.status(200).json({
        status: 200,
        message: "successfully created movie",
        movie: savedEntity
    });


}

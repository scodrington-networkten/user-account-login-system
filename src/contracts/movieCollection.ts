import {MovieResult} from "@contracts/movieResult";

/**
 * A collection of movies, grouped together
 */
export type MovieCollection = {
    id: number,
    name: string,
    overview: string,
    poster_path: string,
    parts: MovieResult[]
}



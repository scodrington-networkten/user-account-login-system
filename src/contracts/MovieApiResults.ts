import {Movie} from "@contracts/movie";
import {MovieResult} from "@contracts/movieResult";

/**
 * This type represents the results of collecting movies from TheMovieDB API (passed back to us
 * from your internal API)
 *
 * Movies by genre, movies by keyword, searching for movies, latest movies, popular etc all have the same universal response
 */
export type MovieApiResults = {
    page: number,
    results: Movie[] | MovieResult[],
    total_pages: number,
    total_results: number
}

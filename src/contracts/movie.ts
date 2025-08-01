import {Genre} from "@contracts/genre";
import {ProductionCompany} from "@contracts/productionCompany";
import {ProductionCountry} from "@contracts/productionCountry";
import {SpokenLanguage} from "@contracts/spoken-language";


/**
 * Represents a single detailed movie object
 */
export type Movie = {
    title: string,
    backdrop_path: string | null,
    belongs_to_collection: {
        id: number,
        name: string,
        poster_path?: string | null,
        backdrop_path?: string | null
    },
    budget: number,
    genres: Genre[],
    id: number,
    imdb_id: string,
    origin_country?: string[],
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string | null,
    production_companies?: ProductionCompany[],
    production_countries?: ProductionCountry[],
    release_date: string,
    revenue: number,
    runtime: number,
    spoken_languages: SpokenLanguage[],
    status: string,
    tagline: string,
    video: boolean,
    vote_average: number,
    vote_count: number
}

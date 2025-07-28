import {MovieResult} from "@contracts/movieResult";
import {ExternalIds} from "@contracts/externalIds";
import {Image} from "@contracts/Image";

/**
 * A single person, containing information the API about them
 */
export type Person = {
    adult: boolean,
    also_known_as: string[],
    biography: string,
    birthday?: string,
    deathday?: string,
    gender: number,
    homepage?: string,
    id: number,
    imdb_id?: number,
    known_for_department: string,
    name: string,
    place_of_birth: string,
    popularity: number,
    profile_path: string,
    images: {
        profiles: Image[]
    }
    movie_credits: {
        cast: MovieResult[],
        crew: MovieResult[]
    },
    external_ids: ExternalIds
}

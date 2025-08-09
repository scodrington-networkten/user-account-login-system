import {UserMetadata} from "@contracts/UserMetadata";

export type User = {
    id: number,
    first_name: string,
    last_name: string,
    favorite_movies: {
        movie_id: number
    }[],
    watch_later_movies: {
        movie_id: number
    }[],
    email: string,
    password: string,
    created_at: string,
    is_active: boolean,
    metadata: UserMetadata
}

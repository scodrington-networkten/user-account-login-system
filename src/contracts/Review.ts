import {ReviewAuthor} from "@contracts/ReviewAuthor";

/**
 * Represents a single review for a movie
 */
export type Review = {
    author: string,
    author_details: ReviewAuthor,
    content: string,
    created_at: string,
    id: string,
    updated_at: string,
    url: string
}

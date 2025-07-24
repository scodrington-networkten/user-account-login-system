/**
 * List of schema definitions used to define data shapes and ensure runtime data validation
 */
import {z} from "zod";

/**
 * Single genre schema
 */
export const GenreSchema = z.object({
    id: z.number(),
    name: z.string()
});

/**
 * API response schema, returned from the API an array of genres
 */
export const GenreApiResponseSchema = z.object({
    genres: z.array(GenreSchema)
});
